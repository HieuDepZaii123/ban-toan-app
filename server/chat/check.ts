/**
 * Chấm bài làm: học sinh gửi đề và các bước tự làm, máy tìm bước sai đầu tiên.
 * Marking: the student sends the problem and their own lines of working; we find the first wrong step.
 *
 * Free learners get a few markings a week so the checker can prove itself before anyone pays;
 * Premium gets a daily allowance. In parent mode the reply never carries the corrected step, only a hint,
 * and that is enforced here, not left to the model.
 */
import { createHash } from "node:crypto";
import { clientIp, type ChatEnv } from "./handlers.ts";
import { firstWrongStep } from "../../src/check/arith.ts";

const DAY_MS = 86_400_000;
export const WEEK_MS = 7 * DAY_MS;
const MAX_PROBLEM = 600;
const MAX_STEP = 300;
export const MAX_STEPS = 20;
const DEVICE_ID = /^[A-Za-z0-9-]{8,64}$/;

export type CheckEnv = ChatEnv & {
  /** Free markings per learner per 7 days. */
  freeChecksWeekly: number;
  /** Premium markings per licence per day. */
  premiumChecksDaily: number;
};

export type CheckVerdict = "ok" | "wrong" | "unclear";

export type CheckJson = {
  verdict?: CheckVerdict;
  /** 1-based index of the first wrong step, when verdict is "wrong". */
  step?: number | null;
  why?: string;
  hint?: string;
  /** The corrected step. Never sent in parent mode. */
  fix?: string;
  mode?: "live" | "demo";
  remaining?: number;
  limit?: number;
  period?: "week" | "day";
  premium?: boolean;
  error?: string;
  message?: string;
};

function reply(status: number, body: CheckJson): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

export const CHECK_INSTRUCTIONS = `Bạn là người chấm bài toán của app Bàn Toán. You mark a school student's maths working.
You get the problem and the student's numbered steps. Find the FIRST step that is mathematically wrong: a calculation error, a wrong rule, a lost sign, a wrong transformation, or a conclusion that does not follow. Judge each step from the previous ones, not from the final answer. A step that is correct but different from your own method is correct.
Reply with ONE JSON object and nothing else, no code fence:
{"verdict":"ok"|"wrong"|"unclear","step":<number of the first wrong step, or null>,"why":"<one or two short sentences: what is wrong in that step>","hint":"<one question or hint that lets the student find the fix themselves, without giving it>","fix":"<the corrected version of that one step only>"}
Use "unclear" only when the steps cannot be read or do not belong to the problem.
Write why, hint and fix in the language of the problem (Vietnamese or English). Formulas inside $...$ on one line. Never solve the rest of the problem. Never give the final answer unless the student already reached it.`;

function readSteps(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim().slice(0, MAX_STEP))
    .filter((item) => item !== "")
    .slice(0, MAX_STEPS);
}

/** Pull the first JSON object out of a model reply and keep only well-formed fields. */
export function parseVerdict(text: string, steps: number): CheckJson | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  let raw: unknown;
  try {
    raw = JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const verdict = row.verdict === "ok" || row.verdict === "wrong" || row.verdict === "unclear" ? row.verdict : null;
  if (!verdict) return null;
  const str = (value: unknown) => (typeof value === "string" ? value.trim().slice(0, 600) : "");
  const step = typeof row.step === "number" && Number.isInteger(row.step) && row.step >= 1 && row.step <= steps ? row.step : null;
  if (verdict === "wrong" && step === null) return { verdict: "unclear", step: null, why: str(row.why), hint: str(row.hint) };
  return { verdict, step: verdict === "wrong" ? step : null, why: str(row.why), hint: str(row.hint), fix: verdict === "wrong" ? str(row.fix) : "" };
}

/** Offline marking: checks arithmetic and algebraic identities line by line (see src/check/arith.ts). */
export function demoVerdict(steps: string[], lang: "vi" | "en"): CheckJson {
  const found = firstWrongStep(steps);
  if (found.kind === "wrong") {
    return {
      verdict: "wrong",
      step: found.step,
      why: lang === "en"
        ? `The two sides of step ${found.step} are not equal: ${found.left} ≠ ${found.right}.`
        : `Hai vế của bước ${found.step} không bằng nhau: ${found.left} ≠ ${found.right}.`,
      hint: lang === "en" ? "Redo that one calculation slowly, term by term." : "Tính lại riêng bước đó, từng số hạng một.",
      fix: "",
    };
  }
  if (found.kind === "ok") {
    return {
      verdict: "ok",
      step: null,
      why: lang === "en" ? "Every step checks out." : "Các bước đều đúng.",
      hint: "",
    };
  }
  return {
    verdict: "unclear",
    step: null,
    why: lang === "en"
      ? "Offline marking can only check calculations and identities. Ask again when the tutor is online."
      : "Chấm ngoại tuyến chỉ kiểm được phép tính và hằng đẳng thức. Hãy thử lại khi trợ lý có mạng.",
    hint: "",
  };
}

export async function handleCheck(request: Request, env: CheckEnv): Promise<Response> {
  const url = new URL(request.url);
  if (url.pathname.replace(/\/$/, "") !== "/api/check" || request.method !== "POST") {
    return reply(404, { error: "not_found", message: "Không có đường này." });
  }
  let body: Record<string, unknown> = {};
  try {
    const parsed: unknown = await request.json();
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) body = parsed as Record<string, unknown>;
  } catch {
    return reply(400, { error: "body", message: "Mình chưa đọc được bài làm." });
  }
  const problem = typeof body.problem === "string" ? body.problem.trim() : "";
  const steps = readSteps(body.steps);
  if (!problem) return reply(400, { error: "problem", message: "Hãy ghi đề bài." });
  if (problem.length > MAX_PROBLEM) return reply(400, { error: "problem", message: "Đề dài quá. Hãy rút còn một bài." });
  if (steps.length === 0) return reply(400, { error: "steps", message: "Hãy ghi ít nhất một bước bạn đã làm." });
  const parent = body.parent === true;
  const lang: "vi" | "en" = /[ăâêôơưđáàảãạấầẩẫậắằẳẵặéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/i.test(problem + steps.join(" ")) ? "vi" : /[A-Za-z]/.test(problem) ? "en" : "vi";

  const ip = clientIp(request);
  const license = typeof body.license === "string" ? body.license.trim() : "";
  const premium = license ? await env.premium(license) : false;
  const device = typeof body.device === "string" && DEVICE_ID.test(body.device) ? body.device : "";
  const who = premium
    ? `lic:${createHash("sha256").update(license).digest("hex").slice(0, 32)}`
    : device ? `dev:${device}` : `ip:${ip}`;
  const limit = premium ? env.premiumChecksDaily : env.freeChecksWeekly;
  const windowMs = premium ? DAY_MS : WEEK_MS;
  const period = premium ? "day" : "week";

  if ((await env.quota.used(`win:${who}`, env.now(), env.windowMs)) >= env.windowLimit) {
    return reply(429, { error: "rate", message: "Bạn gửi hơi nhanh. Đợi một lát rồi thử lại.", premium, limit, period, remaining: 0 });
  }
  const used = await env.quota.used(`chk:${who}`, env.now(), windowMs);
  // Device ids are made by the client, so free marking also has a looser cap per network.
  const networkFull = !premium && who !== `ip:${ip}` && (await env.quota.used(`chkn:${ip}`, env.now(), WEEK_MS)) >= env.freeChecksWeekly * 20;
  if (used >= limit || networkFull) {
    return reply(429, {
      error: "quota",
      message: premium
        ? "Hết lượt chấm Premium hôm nay. Mai chấm tiếp."
        : `Bạn đã dùng ${limit} lượt chấm miễn phí của tuần này. Premium chấm không giới hạn trong ngày.`,
      premium,
      limit,
      period,
      remaining: 0,
    });
  }

  let verdict: CheckJson | null;
  try {
    if (env.mode === "demo") {
      verdict = demoVerdict(steps, lang);
    } else {
      const numbered = steps.map((step, index) => `${index + 1}. ${step}`).join("\n");
      const text = await env.complete(CHECK_INSTRUCTIONS, [{ role: "user", content: `Đề / Problem:\n${problem}\n\nBài làm / Working:\n${numbered}` }]);
      verdict = parseVerdict(text, steps.length);
    }
  } catch {
    verdict = null;
  }
  // A failed marking does not cost the learner a turn.
  if (!verdict) return reply(502, { error: "model", message: "Chưa chấm được. Thử lại sau.", premium, limit, period, remaining: limit - used });

  await env.quota.add(`win:${who}`, env.now());
  await env.quota.add(`chk:${who}`, env.now());
  if (!premium && who !== `ip:${ip}`) await env.quota.add(`chkn:${ip}`, env.now());
  const out: CheckJson = { ...verdict, mode: env.mode, premium, limit, period, remaining: limit - used - 1 };
  if (parent) delete out.fix;
  return reply(200, out);
}

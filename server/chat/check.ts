/**
 * Chấm bài làm: học sinh gửi đề và các bước tự làm, máy tìm bước sai đầu tiên.
 * Marking (/api/chat?do=check): the student sends the problem and their own lines of working; we find the first wrong step.
 *
 * Free learners get a few markings a week so the checker can prove itself before anyone pays;
 * Premium gets a daily allowance. In parent mode the reply never carries the corrected step, only a hint.
 * The `fix` field is dropped here rather than left to the model, and `why` and `hint` are checked for the
 * corrected text (see withholdFix) and told not to give it away.
 *
 * What this does NOT do: the `parent` flag is sent by the browser, and there are no accounts, so the server
 * cannot tell whether the person sending it is a parent. Parent mode is a household setting on the child's
 * device (src/parent/parentMode.ts), a guardrail against casually reading answers, not a security boundary
 * against a child who sends the request by hand. docs/TRO-LY.md says the same.
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

/** Added to the instructions in parent mode: the reply may name the wrong step and the kind of mistake, nothing more. */
export const PARENT_CHECK_NOTE = `
Parent mode is on. In why and hint say only WHICH step is wrong and what KIND of mistake it is (for example a sign, a dropped factor, a wrong rule). Never write the corrected expression, the correct value, or the final answer anywhere in the reply.`;

const GENERIC_WHY = { vi: (step: number) => `Bước ${step} có một lỗi.`, en: (step: number) => `Step ${step} has a mistake.` };
const GENERIC_HINT = { vi: "Tính lại riêng bước đó, từng số hạng một.", en: "Redo that one step slowly, term by term." };

/** Compare ignoring spaces, `$` and TeX braces, so `x = -3` and `$x=-3$` count as the same text. */
const squash = (text: string): string => text.toLowerCase().replace(/[\s$\\{}]/g, "");

/**
 * Parent mode: drop the corrected step, and if the model wrote it into `why` or `hint` anyway, replace that
 * text with a generic one. A model can still paraphrase the answer; PARENT_CHECK_NOTE asks it not to, and
 * this catches the common case where it repeats the fix word for word.
 */
export function withholdFix(verdict: CheckJson, lang: "vi" | "en"): CheckJson {
  const out: CheckJson = { ...verdict };
  const key = squash(out.fix ?? "");
  delete out.fix;
  const leaks = (text: string | undefined): boolean => key.length >= 3 && !!text && squash(text).includes(key);
  if (out.verdict === "wrong" && typeof out.step === "number") {
    if (leaks(out.why)) out.why = GENERIC_WHY[lang](out.step);
    if (leaks(out.hint)) out.hint = GENERIC_HINT[lang];
  }
  return out;
}

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
export function demoVerdict(steps: string[], lang: "vi" | "en", parent = false): CheckJson {
  const found = firstWrongStep(steps);
  if (found.kind === "wrong") {
    return {
      verdict: "wrong",
      step: found.step,
      // The two evaluated sides show the correct value, so parent mode only says which step is wrong.
      why: parent
        ? GENERIC_WHY[lang](found.step)
        : lang === "en"
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
  // Served by the chat function as /api/chat?do=check (see nodeAdapter.ts).
  if (url.pathname.replace(/\/$/, "") !== "/api/chat" || url.searchParams.get("do") !== "check" || request.method !== "POST") {
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

  const limits = [
    { key: `win:${who}`, windowMs: env.windowMs, max: env.windowLimit },
    { key: `chk:${who}`, windowMs, max: limit },
  ];
  // Device ids are made by the client, so free marking also has a looser cap per network.
  if (!premium && who !== `ip:${ip}`) limits.push({ key: `chkn:${ip}`, windowMs: WEEK_MS, max: env.freeChecksWeekly * 20 });
  // The turn is taken before marking starts, so parallel requests cannot all slip under the cap
  // while the model is still working; a failed marking gives it back below.
  const claimedAt = env.now();
  const claim = await env.quota.claim(limits, claimedAt);
  if (!claim.ok && claim.full === 0) {
    return reply(429, { error: "rate", message: "Bạn gửi hơi nhanh. Đợi một lát rồi thử lại.", premium, limit, period, remaining: 0 });
  }
  const used = claim.used[1] ?? 0;
  if (!claim.ok) {
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
      verdict = demoVerdict(steps, lang, parent);
    } else {
      const numbered = steps.map((step, index) => `${index + 1}. ${step}`).join("\n");
      const instructions = parent ? CHECK_INSTRUCTIONS + PARENT_CHECK_NOTE : CHECK_INSTRUCTIONS;
      const text = await env.complete(instructions, [{ role: "user", content: `Đề / Problem:\n${problem}\n\nBài làm / Working:\n${numbered}` }]);
      verdict = parseVerdict(text, steps.length);
    }
  } catch {
    verdict = null;
  }
  // A failed marking does not cost the learner a turn.
  if (!verdict) {
    // Giving the turn back must not turn a 502 into a 500: if the store is down the learner still gets the
    // plain "try again" reply, and the failed release is logged so the lost turn can be found.
    try {
      await env.quota.release(limits.map((item) => item.key), claimedAt);
    } catch (error) {
      console.error("check: could not give back a marking turn", error instanceof Error ? error.message : error);
    }
    return reply(502, { error: "model", message: "Chưa chấm được. Thử lại sau.", premium, limit, period, remaining: limit - used });
  }

  const marked: CheckJson = parent ? withholdFix(verdict, lang) : verdict;
  return reply(200, { ...marked, mode: env.mode, premium, limit, period, remaining: limit - used - 1 });
}

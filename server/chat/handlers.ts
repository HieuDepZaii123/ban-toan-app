import { demoReply, MODE_INSTRUCTIONS, TUTOR_INSTRUCTIONS, type TutorMode } from "./policy.ts";
import { tutorTopics } from "./topics.ts";
import { createHash } from "node:crypto";
import { normalizeMath } from "./format.ts";
import { verifiedNote } from "./facts.ts";
import type { Quota } from "./limit.ts";
import type { ChatImage } from "./model.ts";

const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_TURNS = 8;
const MAX_CHARS = 1500;

export const PARENT_NOTE = "Chế độ phụ huynh đang bật. Parent mode is on: never write a full worked solution or a final answer. Ask for the student's own attempt first, then point to their first wrong step with a hint only.";

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type ChatEnv = {
  now: () => number;
  mode: "live" | "demo";
  complete: (instructions: string, messages: ChatTurn[], image?: ChatImage) => Promise<string>;
  premium: (license: string) => Promise<boolean>;
  quota: Quota;
  freeDaily: number;
  premiumDaily: number;
  windowLimit: number;
  windowMs: number;
  /** Free questions per network per day, so one shared school Wi-Fi is not capped at a single student's allowance. */
  networkDaily?: number;
};

const DEVICE_ID = /^[A-Za-z0-9-]{8,64}$/;
const MODES: readonly TutorMode[] = ["hint", "solve", "check"];
/** Base64 length of a photo after the client shrinks it (~1600 px JPEG is 200–600 KB). */
const MAX_IMAGE_CHARS = 2_000_000;
const IMAGE_URL = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/]+={0,2})$/;

/** A `data:image/...;base64,` URL from the client, or null when missing or not an accepted image. */
export function readImage(value: unknown): ChatImage | null | "bad" {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string" || value.length > MAX_IMAGE_CHARS) return "bad";
  const m = IMAGE_URL.exec(value);
  if (!m) return "bad";
  return { mediaType: m[1] as ChatImage["mediaType"], data: new Uint8Array(Buffer.from(m[2]!, "base64")) };
}

export type ChatJson = {
  reply?: string;
  mode?: "live" | "demo";
  remaining?: number;
  limit?: number;
  premium?: boolean;
  error?: string;
  message?: string;
};

export function json(status: number, body: ChatJson): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

export async function handleChat(request: Request, env: ChatEnv): Promise<Response> {
  const url = new URL(request.url);
  if (url.pathname.replace(/\/$/, "") !== "/api/chat" || request.method !== "POST") {
    return json(404, { error: "not_found", message: "Không có đường này." });
  }
  let body: Record<string, unknown> = {};
  try {
    const parsed: unknown = await request.json();
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) body = parsed as Record<string, unknown>;
  } catch {
    return json(400, { error: "body", message: "Mình chưa đọc được tin nhắn." });
  }
  const messages = readMessages(body.messages);
  const last = messages.at(-1);
  if (!last || last.role !== "user") return json(400, { error: "message", message: "Hãy gửi một câu hỏi." });
  if (last.content.length > MAX_CHARS) return json(400, { error: "message", message: "Câu hỏi dài quá. Hãy rút còn một bài." });

  const askedMode = typeof body.mode === "string" ? body.mode : "hint";
  const mode: TutorMode = MODES.includes(askedMode as TutorMode) ? (askedMode as TutorMode) : "hint";
  const image = readImage(body.image);
  if (image === "bad") return json(400, { error: "image", message: "Ảnh chưa đọc được. Dùng ảnh JPG/PNG nhỏ hơn." });

  const ip = clientIp(request);
  const license = typeof body.license === "string" ? body.license.trim() : "";
  const askedTopic = typeof body.topic === "string" ? body.topic : "";
  const topicId = tutorTopics.some((item) => item.id === askedTopic) ? askedTopic : "";
  const premium = license ? await env.premium(license) : false;
  if ((mode !== "hint" || image) && !premium) {
    return json(403, {
      error: "premium",
      message: image
        ? "Gửi ảnh đề bài là tính năng Premium."
        : mode === "solve"
          ? "Lời giải đầy đủ là tính năng Premium. Bản miễn phí gợi ý từng bước."
          : "Kiểm tra bài làm là tính năng Premium.",
      premium,
    });
  }
  if (mode === "solve" && body.parent === true) {
    return json(403, {
      error: "parent",
      message: "Chế độ phụ huynh đang bật: lời giải đầy đủ bị khóa. Hãy gửi bài làm để được chấm. Parent mode is on: full solutions are locked; send your working to be marked.",
      premium,
    });
  }
  const dailyLimit = premium ? env.premiumDaily : env.freeDaily;
  const device = typeof body.device === "string" && DEVICE_ID.test(body.device) ? body.device : "";
  // Count per learner, not per IP: a paid license has its own allowance, a free learner is counted per device.
  const who = premium
    ? `lic:${createHash("sha256").update(license).digest("hex").slice(0, 32)}`
    : device ? `dev:${device}` : `ip:${ip}`;
  const networkDaily = env.networkDaily ?? env.freeDaily * 20;
  if ((await env.quota.used(`win:${who}`, env.now(), env.windowMs)) >= env.windowLimit) {
    return json(429, {
      error: "rate",
      message: "Bạn hỏi hơi nhanh. Đợi một lát rồi thử lại.",
      premium,
      limit: env.windowLimit,
      remaining: 0,
    });
  }
  const usedToday = await env.quota.used(`day:${who}`, env.now(), DAY_MS);
  // Device ids are client-made, so free use also has a looser cap per network.
  const networkFull = !premium && who !== `ip:${ip}` && (await env.quota.used(`net:${ip}`, env.now(), DAY_MS)) >= networkDaily;
  if (usedToday >= dailyLimit || networkFull) {
    return json(429, {
      error: "quota",
      message: premium
        ? "Hết lượt Premium trong hôm nay. Mai mình học tiếp."
        : "Hết lượt miễn phí hôm nay. Premium được hỏi nhiều hơn.",
      premium,
      limit: dailyLimit,
      remaining: 0,
    });
  }
  await env.quota.add(`win:${who}`, env.now());
  await env.quota.add(`day:${who}`, env.now());
  if (!premium && who !== `ip:${ip}`) await env.quota.add(`net:${ip}`, env.now());
  const remaining = dailyLimit - usedToday - 1;
  try {
    const sheet = topicId ? `\nHọc sinh đang mở tờ /t/${topicId}.` : "";
    // Parent mode on this device: no full worked solution until the student has shown their own attempt.
    const note = body.parent === true ? `${sheet}\n${PARENT_NOTE}` : sheet;
    const photo = image ? "\nHọc sinh gửi kèm ảnh đề bài / The student attached a photo of the problem: đọc đề trong ảnh trước, chép lại đề bằng $...$ trong một dòng, rồi mới giải." : "";
    const reply = env.mode === "demo"
      ? demoReply(last.content, topicId)
      : await env.complete(TUTOR_INSTRUCTIONS + MODE_INSTRUCTIONS[mode] + note + photo + verifiedNote(last.content), messages, image ?? undefined);
    const text = normalizeMath(reply).trim();
    if (!text) return json(502, { error: "model", message: "Trợ lý chưa trả lời được. Thử lại sau.", premium, remaining, limit: dailyLimit });
    return json(200, { reply: text, mode: env.mode, remaining, limit: dailyLimit, premium });
  } catch {
    return json(502, { error: "model", message: "Trợ lý chưa trả lời được. Thử lại sau.", premium, remaining, limit: dailyLimit });
  }
}

function readMessages(value: unknown): ChatTurn[] {
  if (!Array.isArray(value)) return [];
  const turns: ChatTurn[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const role = row.role === "assistant" ? "assistant" : row.role === "user" ? "user" : null;
    const content = typeof row.content === "string" ? row.content.trim() : "";
    if (!role || !content) continue;
    turns.push({ role, content: content.slice(0, MAX_CHARS) });
  }
  return turns.slice(-MAX_TURNS);
}

/** Prefer headers the platform sets itself (Vercel overwrites these), then the first forwarded hop. */
export function clientIp(request: Request): string {
  const platform = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip")?.trim();
  if (platform) return platform;
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  return forwarded.split(",")[0]?.trim() || "local";
}

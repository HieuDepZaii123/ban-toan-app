import { demoReply, isOffTopic, REFUSAL, TUTOR_INSTRUCTIONS } from "./policy.ts";
import type { Quota } from "./limit.ts";

const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_TURNS = 8;
const MAX_CHARS = 1500;

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type ChatEnv = {
  now: () => number;
  mode: "live" | "demo";
  complete: (instructions: string, messages: ChatTurn[]) => Promise<string>;
  premium: (license: string) => boolean;
  quota: Quota;
  freeDaily: number;
  premiumDaily: number;
  windowLimit: number;
  windowMs: number;
};

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

  const ip = clientIp(request);
  const license = typeof body.license === "string" ? body.license.trim() : "";
  const premium = license ? env.premium(license) : false;
  const dailyLimit = premium ? env.premiumDaily : env.freeDaily;
  if (env.quota.used(`win:${ip}`, env.now(), env.windowMs) >= env.windowLimit) {
    return json(429, {
      error: "rate",
      message: "Bạn hỏi hơi nhanh. Đợi một lát rồi thử lại.",
      premium,
      limit: env.windowLimit,
      remaining: 0,
    });
  }
  const usedToday = env.quota.used(`day:${ip}`, env.now(), DAY_MS);
  if (usedToday >= dailyLimit) {
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
  env.quota.add(`win:${ip}`, env.now());
  env.quota.add(`day:${ip}`, env.now());
  const remaining = dailyLimit - usedToday - 1;
  if (isOffTopic(last.content)) {
    return json(200, { reply: REFUSAL, mode: env.mode, remaining, limit: dailyLimit, premium });
  }
  try {
    const reply = env.mode === "demo"
      ? demoReply(last.content)
      : await env.complete(TUTOR_INSTRUCTIONS, messages);
    const text = reply.trim();
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

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const first = forwarded.split(",")[0]?.trim();
  return first || request.headers.get("x-real-ip")?.trim() || "local";
}

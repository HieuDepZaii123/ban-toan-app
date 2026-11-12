import { hasFreeKey } from "../chat/free.ts";
import { isSelling, payEnv } from "../pay/env.ts";
import { nodeHandler } from "./bridge.ts";

/**
 * GET /api/health: tình trạng máy chủ cho người vận hành và công cụ giám sát.
 * Chỉ trả trạng thái bật/tắt, không trả khóa, địa chỉ hay cấu hình nào khác.
 */
export async function handleHealth(request: Request, source: NodeJS.ProcessEnv = process.env): Promise<Response> {
  const headers = { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" };
  if (request.method !== "GET") return new Response(JSON.stringify({ error: "method" }), { status: 405, headers });
  const env = payEnv(source);
  const paidKey = Boolean(source.AI_GATEWAY_API_KEY?.trim() || source.VERCEL_OIDC_TOKEN?.trim() || source.OPENAI_API_KEY?.trim());
  const shared = env.databaseUrl !== "";
  const body = {
    ok: true,
    time: new Date().toISOString(),
    pay: { selling: isSelling(env), live: env.live, store: shared ? "postgres" : "sqlite", crypto: env.cryptoEnabled },
    chat: { mode: paidKey || hasFreeKey(source) ? "live" : "demo", counters: shared ? "postgres" : "memory" },
    // Trên serverless, SQLite và bộ đếm trong bộ nhớ không dùng chung giữa các instance.
    warnings: env.live && !shared ? ["DATABASE_URL is not set: orders use local SQLite and tutor counters are per instance"] : [],
  };
  return new Response(JSON.stringify(body), { status: 200, headers });
}

export const HEALTH_MAX_BYTES = 1024;

export const adaptHealth = nodeHandler((request) => handleHealth(request), { name: "health", maxBytes: HEALTH_MAX_BYTES });

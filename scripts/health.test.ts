/**
 * /api/health và bảng header bảo mật: không lộ bí mật, và vercel.json khớp server/http/headers.ts.
 * Run with: tsx scripts/health.test.ts
 */
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { handleChat, type ChatEnv } from "../server/chat/handlers.ts";
import { publicApiPath } from "../server/http/foldedRoutes.ts";
import { CONTENT_SECURITY_POLICY, SECURITY_HEADERS } from "../server/http/headers.ts";
import { handleHealth } from "../server/http/health.ts";
import { routeFor } from "../server/pay/vitePlugin.ts";

const secret = "sk-test-do-not-leak-0123456789";
const quiet = await handleHealth(new Request("http://x.local/api/health"), {});
assert.equal(quiet.status, 200);
const idle = await quiet.json() as { ok: boolean; pay: { selling: boolean; store: string; crypto: boolean }; chat: { mode: string } };
assert.equal(idle.ok, true);
assert.deepEqual(idle.pay, { selling: false, live: false, store: "sqlite", crypto: false });
assert.equal(idle.chat.mode, "demo");

const busy = await handleHealth(new Request("http://x.local/api/health"), {
  VERCEL_ENV: "production",
  OPENAI_API_KEY: secret,
  ADMIN_TOKEN: secret,
  BANK_ACCOUNT_NO: "123456789",
  BANK_ACCOUNT_NAME: "CONG TY A",
});
const text = await busy.text();
assert.equal(text.includes(secret), false, "health never echoes a secret");
assert.equal(text.includes("123456789"), false, "health never echoes the bank account");
const live = JSON.parse(text) as { pay: { selling: boolean }; chat: { mode: string }; warnings: string[] };
assert.equal(live.pay.selling, true);
assert.equal(live.chat.mode, "live");
assert.equal(live.warnings.length, 1, "warns when production has no shared database");

assert.equal((await handleHealth(new Request("http://x.local/api/health", { method: "POST" }), {})).status, 405);
assert.equal(routeFor("/api/health")?.prefix, "/api/health");

// Gói Hobby: tối đa 12 hàm. health và recover đi nhờ hàm có sẵn, đường công khai không đổi.
function apiFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return apiFiles(path);
    return name.endsWith(".ts") || name.endsWith(".js") || name.endsWith(".mjs") ? [path] : [];
  });
}
const functions = apiFiles("api");
assert.ok(functions.length <= 12, `Hobby allows 12 functions, found ${functions.length}: ${functions.join(", ")}`);
assert.equal(functions.includes(join("api", "health.ts")), false);
assert.equal(functions.includes(join("api", "premium", "recover.ts")), false);

assert.equal(publicApiPath(new URL("http://x.local/api/chat?route=health")), "/api/health");
assert.equal(publicApiPath(new URL("http://x.local/api/health")), "/api/health");
assert.equal(publicApiPath(new URL("http://x.local/api/chat")), "/api/chat");
assert.equal(publicApiPath(new URL("http://x.local/api/premium/status?route=recover")), "/api/premium/recover");
assert.equal(publicApiPath(new URL("http://x.local/api/premium/status?orderId=BT1")), "/api/premium/status");

const untouched = {
  now: () => 0,
  mode: "demo",
  complete: async () => { throw new Error("health must not call the model"); },
  premium: async () => false,
  quota: { used: async () => 0, add: async () => undefined },
  freeDaily: 8,
  premiumDaily: 40,
  windowLimit: 10,
  windowMs: 1,
} as ChatEnv;
const viaChat = await handleChat(new Request("http://x.local/api/chat?route=health"), untouched);
assert.equal(viaChat.status, 200);
assert.equal(((await viaChat.json()) as { ok: boolean }).ok, true, "GET /api/chat?route=health is the health check");
const chatGet = await handleChat(new Request("http://x.local/api/chat"), untouched);
assert.equal(chatGet.status, 404, "a plain GET /api/chat is not the health check");
const chatPost = await handleChat(new Request("http://x.local/api/chat?route=health", { method: "POST", body: "{}" }), untouched);
assert.equal(chatPost.status, 405, "POST with the health flag stays on the health handler");

// vercel.json phải gửi đúng bảng header trong server/http/headers.ts, và cache dài cho tệp có mã băm.
const vercel = JSON.parse(readFileSync("vercel.json", "utf8")) as {
  rewrites?: { source: string; destination: string }[];
  headers: { source: string; headers: { key: string; value: string }[] }[];
};
const rewrites = vercel.rewrites ?? [];
const healthRewrite = rewrites.find((rule) => rule.source === "/api/health");
const recoverRewrite = rewrites.find((rule) => rule.source === "/api/premium/recover");
assert.equal(healthRewrite?.destination, "/api/chat?route=health");
assert.equal(recoverRewrite?.destination, "/api/premium/status?route=recover");
assert.ok(existsSync("api/chat.ts"), "health rewrite target exists");
assert.ok(existsSync("api/premium/status.ts"), "recover rewrite target exists");
const spaAt = rewrites.findIndex((rule) => rule.destination === "/index.html");
assert.ok(spaAt > rewrites.indexOf(healthRewrite!), "health rewrite is before the SPA fallback");
assert.ok(spaAt > rewrites.indexOf(recoverRewrite!), "recover rewrite is before the SPA fallback");
const all = vercel.headers.find((rule) => rule.source === "/(.*)");
assert.ok(all, "vercel.json has a rule for every path");
assert.deepEqual(Object.fromEntries(all.headers.map((item) => [item.key, item.value])), SECURITY_HEADERS);
const assets = vercel.headers.find((rule) => rule.source === "/assets/(.*)");
assert.match(assets?.headers[0]?.value ?? "", /immutable/);
assert.equal(/unsafe-eval|script-src[^;]*unsafe-inline/.test(CONTENT_SECURITY_POLICY), false, "no eval and no inline script");
assert.equal(/<script>/.test(readFileSync("index.html", "utf8")), false, "index.html has no inline script");

console.log("health ok");

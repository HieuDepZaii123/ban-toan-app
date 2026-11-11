/**
 * /api/health và bảng header bảo mật: không lộ bí mật, và vercel.json khớp server/http/headers.ts.
 * Run with: tsx scripts/health.test.ts
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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

// vercel.json phải gửi đúng bảng header trong server/http/headers.ts, và cache dài cho tệp có mã băm.
const vercel = JSON.parse(readFileSync("vercel.json", "utf8")) as { headers: { source: string; headers: { key: string; value: string }[] }[] };
const all = vercel.headers.find((rule) => rule.source === "/(.*)");
assert.ok(all, "vercel.json has a rule for every path");
assert.deepEqual(Object.fromEntries(all.headers.map((item) => [item.key, item.value])), SECURITY_HEADERS);
const assets = vercel.headers.find((rule) => rule.source === "/assets/(.*)");
assert.match(assets?.headers[0]?.value ?? "", /immutable/);
assert.equal(/unsafe-eval|script-src[^;]*unsafe-inline/.test(CONTENT_SECURITY_POLICY), false, "no eval and no inline script");
assert.equal(/<script>/.test(readFileSync("index.html", "utf8")), false, "index.html has no inline script");

console.log("health ok");

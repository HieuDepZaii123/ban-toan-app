/**
 * Cầu nối Node ↔ Fetch cho API, nạp .env cho server khi chạy local, và định tuyến /api.
 * Run with: tsx scripts/bridge.test.ts
 */
import assert from "node:assert/strict";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import type { AddressInfo } from "node:net";
import { Readable } from "node:stream";
import { CHAT_MAX_BYTES } from "../server/chat/nodeAdapter.ts";
import { nodeHandler } from "../server/http/bridge.ts";
import { PAY_MAX_BYTES } from "../server/pay/nodeAdapter.ts";
import { mergeServerEnv, routeFor } from "../server/pay/vitePlugin.ts";

const logged: string[] = [];
const echo = nodeHandler(
  async (request) => {
    const url = new URL(request.url);
    if (url.pathname === "/boom") throw new Error("secret detail");
    const body = request.method === "GET" ? "" : await request.text();
    return Response.json({ method: request.method, origin: url.origin, path: url.pathname, body, auth: request.headers.get("authorization") }, { status: 201, headers: { "x-extra": "1" } });
  },
  { name: "test", maxBytes: 1024, log: (line) => logged.push(line) },
);

const server = createServer((req, res) => void echo(req, res));
await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;

try {
  const posted = await fetch(`${base}/api/x?y=1`, { method: "POST", body: '{"a":1}', headers: { authorization: "Bearer t", "x-request-id": "abc" } });
  assert.equal(posted.status, 201);
  assert.equal(posted.headers.get("x-extra"), "1");
  assert.equal(posted.headers.get("x-request-id"), "abc", "giữ mã request của proxy");
  assert.deepEqual(await posted.json(), { method: "POST", origin: base, path: "/api/x", body: '{"a":1}', auth: "Bearer t" });

  const forwarded = await fetch(`${base}/api/x`, { headers: { "x-forwarded-host": "bantoan.vn", "x-forwarded-proto": "https" } });
  assert.equal(((await forwarded.json()) as { origin: string }).origin, "https://bantoan.vn");
  assert.match(forwarded.headers.get("x-request-id") ?? "", /^[0-9a-f-]{36}$/, "tự sinh mã request");

  const big = await fetch(`${base}/api/x`, { method: "POST", body: "x".repeat(4096) });
  assert.equal(big.status, 413);
  assert.equal(((await big.json()) as { error: string }).error, "too_large");

  const chunked = await fetch(`${base}/api/x`, {
    method: "POST",
    body: Readable.toWeb(Readable.from([Buffer.alloc(600), Buffer.alloc(600)])) as ReadableStream,
    duplex: "half",
  } as RequestInit);
  assert.equal(chunked.status, 413, "thân không khai độ dài vẫn bị chặn");

  const boom = await fetch(`${base}/boom`, { method: "POST", body: "{}" });
  assert.equal(boom.status, 500);
  const boomBody = await boom.text();
  assert.ok(!boomBody.includes("secret detail"), "không lộ chi tiết lỗi");
  assert.equal(JSON.parse(boomBody).error, "server");
  assert.equal(boom.headers.get("content-type"), "application/json; charset=utf-8");
  assert.ok(logged.some((line) => line.startsWith("[test] POST /boom")), "lỗi được ghi log kèm đường");
} finally {
  await new Promise<void>((resolve) => server.close(() => resolve()));
}

/* Vercel đã đọc sẵn thân vào req.body: stream rỗng nhưng body có giá trị. */
async function preParsed(body: unknown): Promise<{ status: number; text: string }> {
  const req = Object.assign(Readable.from([]), { method: "POST", url: "/api/x", headers: { host: "h" }, body }) as unknown as IncomingMessage;
  let status = 0;
  let text = "";
  const res = {
    statusCode: 0,
    setHeader() {},
    end(chunk: Buffer | string) {
      status = res.statusCode;
      text = String(chunk);
    },
  } as unknown as ServerResponse;
  await echo(req, res);
  return { status, text };
}
assert.equal(JSON.parse((await preParsed({ a: 2 })).text).body, '{"a":2}');
assert.equal(JSON.parse((await preParsed("raw")).text).body, "raw");
assert.equal((await preParsed({ big: "x".repeat(2000) })).status, 413);

/* Giới hạn thật của hai API. */
assert.ok(CHAT_MAX_BYTES >= 8 * 1500 * 4, "chat đủ chỗ cho 8 lượt UTF-8");
assert.ok(PAY_MAX_BYTES > CHAT_MAX_BYTES);

/* .env cho server khi chạy local. */
const target: NodeJS.ProcessEnv = { ADMIN_TOKEN: "from-shell" };
const added = mergeServerEnv(target, { ADMIN_TOKEN: "from-file", GROQ_API_KEY: "k", VITE_X: "1" });
assert.equal(target.ADMIN_TOKEN, "from-shell", "biến shell thắng .env");
assert.equal(target.GROQ_API_KEY, "k");
assert.deepEqual(added.sort(), ["GROQ_API_KEY", "VITE_X"]);

/* Định tuyến middleware. */
assert.equal(routeFor("/api/chat")?.prefix, "/api/chat");
assert.equal(routeFor("/api/premium/create")?.prefix, "/api/premium");
assert.equal(routeFor("/api/chatty"), null);
assert.equal(routeFor("/luyen-thpt"), null);

console.log("bridge ok");

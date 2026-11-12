/**
 * Premium tutor modes: full solution, check my work, photo of a problem.
 * Run with: tsx scripts/tutor-modes.test.ts
 */
import assert from "node:assert/strict";
import { FREE_CATALOG } from "../server/chat/freeCatalog.ts";
import { FREE_PROVIDERS, freeCandidates } from "../server/chat/free.ts";
import { handleChat, readImage, type ChatEnv } from "../server/chat/handlers.ts";
import { createQuota } from "../server/chat/limit.ts";
import { completeLive, liveCandidates, type ChatImage } from "../server/chat/model.ts";
import { MODE_INSTRUCTIONS } from "../server/chat/policy.ts";

type Call = { instructions: string; image?: ChatImage };
const calls: Call[] = [];

function env(over: Partial<ChatEnv> = {}): ChatEnv {
  return {
    now: () => 1_700_000_000_000,
    mode: "live",
    complete: async (instructions, _messages, image) => {
      calls.push({ instructions, image });
      return "Đáp số: x = 2";
    },
    premium: async (license) => license === "bt_premium_key_123456",
    quota: createQuota(),
    freeDaily: 8,
    premiumDaily: 40,
    windowLimit: 10,
    windowMs: 600_000,
    ...over,
  };
}

async function post(target: ChatEnv, body: Record<string, unknown>): Promise<{ status: number; json: Record<string, unknown> }> {
  const res = await handleChat(new Request("http://x/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.20" },
    body: JSON.stringify({ messages: [{ role: "user", content: "Giải 3x - 6 = 0" }], device: "device-abc-123", ...body }),
  }), target);
  return { status: res.status, json: (await res.json()) as Record<string, unknown> };
}

const PREMIUM = { license: "bt_premium_key_123456" };
// 1×1 white JPEG.
const JPEG = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";

// Free users: modes and photos are refused before any model call or quota use.
const free = env();
for (const body of [{ mode: "solve" }, { mode: "check" }, { image: JPEG }]) {
  const res = await post(free, body);
  assert.equal(res.status, 403, JSON.stringify(body));
  assert.equal(res.json.error, "premium");
}
assert.equal(calls.length, 0, "no model call for refused requests");
assert.equal((await post(free, {})).status, 200, "free hint still works and its quota is untouched");
assert.equal(calls.at(-1)?.instructions.includes("Mode:"), false, "hint adds no mode block");

// Premium: each mode adds its instructions; unknown modes fall back to hints.
const paid = env();
await post(paid, { ...PREMIUM, mode: "solve" });
assert.ok(calls.at(-1)?.instructions.includes(MODE_INSTRUCTIONS.solve.trim()), "solve instructions");
assert.ok(calls.at(-1)?.instructions.includes("Verified numbers"), "verified numbers still apply");
await post(paid, { ...PREMIUM, mode: "check" });
assert.ok(calls.at(-1)?.instructions.includes("FIRST wrong step"), "check instructions");
await post(paid, { ...PREMIUM, mode: "teacher-override" });
assert.ok(!calls.at(-1)?.instructions.includes("Mode:"), "unknown mode → hints");

// Premium photo: decoded and passed on with its media type.
const photo = await post(paid, { ...PREMIUM, image: JPEG });
assert.equal(photo.status, 200);
assert.equal(calls.at(-1)?.image?.mediaType, "image/jpeg");
assert.equal(calls.at(-1)?.image?.data[0], 0xff, "JPEG bytes decoded");
assert.ok(calls.at(-1)?.instructions.includes("attached a photo"));

// Bad images are refused, even for Premium.
for (const bad of ["data:image/gif;base64,R0lGOD", "data:text/html;base64,PGgxPg==", "https://example.com/a.jpg", `data:image/png;base64,${"A".repeat(2_000_001)}`, 42]) {
  assert.equal(readImage(bad), "bad", String(bad).slice(0, 30));
  assert.equal((await post(paid, { ...PREMIUM, image: bad })).status, 400);
}
assert.equal(readImage(undefined), null);
assert.equal(readImage(""), null);

// Image models: every one is in the catalog; photos only go to providers that read images.
for (const provider of FREE_PROVIDERS) {
  if (!provider.visionModel) continue;
  const entry = FREE_CATALOG.find((item) => item.name === provider.catalogName);
  assert.ok(entry?.models.some((model) => model.id === provider.visionModel), `${provider.id} vision model ${provider.visionModel} listed`);
}
const keys = { GROQ_API_KEY: "gsk_x", GROQ_VISION_MODEL: "" };
assert.deepEqual(freeCandidates(keys, undefined, true).map((c) => c.model), ["qwen/qwen3.8-27b"]);
assert.deepEqual(freeCandidates({ GROQ_API_KEY: "g", GROQ_VISION_MODEL: "custom/vl" }, undefined, true).map((c) => c.model), ["custom/vl"]);
assert.equal(liveCandidates(keys, true).length, 1);

// completeLive puts the image on the latest user turn only.
let shaped: unknown;
await completeLive("rules", [{ role: "user", content: "a" }, { role: "assistant", content: "b" }, { role: "user", content: "c" }], keys, async (options) => {
  shaped = options.messages;
  return { text: "ok" };
}, Date.now, { data: new Uint8Array([1, 2]), mediaType: "image/png" });
const turns = shaped as { content: unknown }[];
assert.equal(turns[0]?.content, "a");
assert.equal(turns[1]?.content, "b");
assert.deepEqual(turns[2]?.content, [{ type: "text", text: "c" }, { type: "image", image: new Uint8Array([1, 2]), mediaType: "image/png" }]);

console.log("tutor modes ok");

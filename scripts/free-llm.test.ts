/**
 * Free LLM providers imported from mnfst/awesome-free-llm-apis: catalog freshness, key detection,
 * order, and fallback when a provider fails.
 * Run with: tsx scripts/free-llm.test.ts
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { FREE_CATALOG } from "../server/chat/freeCatalog.ts";
import { FREE_PROVIDERS, freeBaseUrl, freeCandidates, freeOrder, hasFreeKey } from "../server/chat/free.ts";
import { completeLive, hasLiveKey, liveCandidates } from "../server/chat/model.ts";
import { renderCatalog } from "./sync-free-llm.ts";

const data = JSON.parse(readFileSync(new URL("../vendor/awesome-free-llm-apis/data.json", import.meta.url), "utf8"));
assert.equal(
  readFileSync(new URL("../server/chat/freeCatalog.ts", import.meta.url), "utf8"),
  renderCatalog(data),
  "freeCatalog.ts is stale: run npm run free-llm:sync",
);

for (const provider of FREE_PROVIDERS) {
  const entry = FREE_CATALOG.find((item) => item.name === provider.catalogName);
  assert.ok(entry, `${provider.id} is in the catalog`);
  assert.ok(entry.models.some((model) => model.id === provider.defaultModel), `${provider.id} default model ${provider.defaultModel} is still listed`);
  assert.match(freeBaseUrl(provider) ?? "", /^https:\/\//, `${provider.id} base URL`);
}
assert.equal(new Set(FREE_PROVIDERS.map((provider) => provider.id)).size, FREE_PROVIDERS.length);
assert.equal(freeBaseUrl(FREE_PROVIDERS.find((p) => p.id === "gemini")!), "https://generativelanguage.googleapis.com/v1beta/openai");

assert.equal(hasFreeKey({}), false);
assert.equal(hasLiveKey({}), false);
assert.equal(hasFreeKey({ GROQ_API_KEY: "  " }), false, "blank key ignored");
assert.equal(hasLiveKey({ GROQ_API_KEY: "gsk_x" }), true);

assert.deepEqual(freeOrder({ FREE_LLM_ORDER: "mistral, nope,groq,mistral" }).map((p) => p.id).slice(0, 3), ["mistral", "groq", "gemini"]);
assert.equal(freeOrder({}).length, FREE_PROVIDERS.length);

const keys = { GROQ_API_KEY: "gsk_x", OPENROUTER_API_KEY: "or_x", OPENROUTER_MODEL: "liquid/lfm-2.5-2.6b:free" };
assert.deepEqual(freeCandidates(keys).map((c) => [c.id, c.model]), [
  ["groq", "openai/gpt-oss-120b"],
  ["openrouter", "liquid/lfm-2.5-2.6b:free"],
]);
assert.deepEqual(liveCandidates(keys).map((c) => c.id), ["groq", "openrouter"]);
assert.deepEqual(liveCandidates({ ...keys, OPENAI_API_KEY: "sk_x" }).map((c) => c.id), ["primary", "groq", "openrouter"], "paid key first");

const tried: string[] = [];
const reply = await completeLive("rules", [{ role: "user", content: "1+1?" }], keys, async ({ model }) => {
  const id = (model as { provider: string }).provider;
  tried.push(id);
  if (id.startsWith("groq")) throw new Error("429 rate limited");
  return { text: "Bằng 2." };
});
assert.equal(reply, "Bằng 2.");
assert.equal(tried.length, 2, "falls back to the next provider");
assert.ok(tried[0]?.startsWith("groq") && tried[1]?.startsWith("openrouter"), tried.join(","));

await assert.rejects(
  completeLive("rules", [{ role: "user", content: "hi" }], keys, async () => ({ text: "  " })),
  /empty reply/,
  "all empty → error",
);

let clock = 0;
let calls = 0;
await assert.rejects(
  completeLive("rules", [{ role: "user", content: "hi" }], keys, async () => {
    calls += 1;
    clock += 30_000;
    throw new Error("timeout");
  }, () => clock),
);
assert.equal(calls, 1, "stops once the total budget is spent");

console.log("free-llm ok");

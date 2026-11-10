/**
 * Tutor replies: model math syntax rewritten to the single-line $...$ the chat renders,
 * and a reply cut off by the token limit ends with an ellipsis.
 * Run with: tsx scripts/chat-format.test.ts
 */
import assert from "node:assert/strict";
import { normalizeMath } from "../server/chat/format.ts";
import { completeLive } from "../server/chat/model.ts";
import { TUTOR_INSTRUCTIONS } from "../server/chat/policy.ts";

assert.equal(normalizeMath("Ta có \\(x^2-5x+6=0\\)."), "Ta có $x^2-5x+6=0$.");
assert.equal(normalizeMath("Giải\n\n\\[\nx^{2}-5x+6=0 .\n\\]\n\nxong"), "Giải\n\n$x^{2}-5x+6=0 .$\n\nxong");
assert.equal(normalizeMath("$$\n\\Delta = 25 - 24\n$$"), "$\\Delta = 25 - 24$");
assert.equal(normalizeMath("đã đúng $a+b$ rồi"), "đã đúng $a+b$ rồi", "plain $...$ untouched");
assert.equal(normalizeMath("[Hàm số bậc hai](/t/ham-bac-hai)"), "[Hàm số bậc hai](/t/ham-bac-hai)", "links untouched");
const fence = "```text\n\\[ not math \\]\n```";
assert.equal(normalizeMath(`trước \\(a\\)\n${fence}\nsau \\(b\\)`), `trước $a$\n${fence}\nsau $b$`, "diagram fences untouched");
assert.equal(normalizeMath("không có công thức"), "không có công thức");

assert.ok(TUTOR_INSTRUCTIONS.includes("never \\( \\), \\[ \\] or $$"), "instructions name the forbidden math syntax");
assert.ok(TUTOR_INSTRUCTIONS.includes("never repeat them word for word"));

const keys = { GROQ_API_KEY: "gsk_x" };
const cut = await completeLive("rules", [{ role: "user", content: "hi" }], keys, async () => ({ text: "Bước 1: tính  ", finishReason: "length" }));
assert.equal(cut, "Bước 1: tính …");
const whole = await completeLive("rules", [{ role: "user", content: "hi" }], keys, async () => ({ text: "Xong.", finishReason: "stop" }));
assert.equal(whole, "Xong.");

console.log("chat format ok");

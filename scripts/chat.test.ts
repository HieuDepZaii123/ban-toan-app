/**
 * Math tutor: bilingual demo replies, open chat, and rate / daily limits.
 * Run with: tsx scripts/chat.test.ts
 */
import { cards } from "../src/content/cards.ts";
import { isYoutubeId, lectures } from "../src/content/lectures.ts";
import { handleChat, type ChatEnv, type ChatTurn } from "../server/chat/handlers.ts";
import { createQuota } from "../server/chat/limit.ts";
import { sanitizeSvg } from "../src/chat/diagram.ts";
import { demoReply, replyLanguage, TUTOR_INSTRUCTIONS } from "../server/chat/policy.ts";
import { tutorTopics } from "../server/chat/topics.ts";

const fails: string[] = [];
function assert(cond: boolean, message: string): void {
  if (!cond) fails.push(message);
}

let clock = 1_700_000_000_000;
let calls = 0;

function env(over: Partial<ChatEnv> = {}): ChatEnv {
  return {
    now: () => clock,
    mode: "demo",
    complete: async () => {
      calls += 1;
      return "bước 1 rồi kiểm chứng";
    },
    premium: async (license) => license === "bt_premium",
    quota: createQuota(),
    freeDaily: 8,
    premiumDaily: 40,
    windowLimit: 10,
    windowMs: 10 * 60 * 1000,
    ...over,
  };
}

async function post(target: ChatEnv, body: unknown, ip = "203.0.113.5"): Promise<{ status: number; json: Record<string, unknown> }> {
  const res = await handleChat(new Request("http://pay.local/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  }), target);
  return { status: res.status, json: await res.json() as Record<string, unknown> };
}

function ask(text: string): { messages: ChatTurn[] } {
  return { messages: [{ role: "user", content: text }] };
}

let seen = "";
const off = await post(env({
  mode: "live",
  complete: async (instructions) => {
    calls += 1;
    seen = instructions;
    return "A calm note about the weather, then one question.";
  },
}), ask("What is the weather in Hanoi?"));
assert(off.status === 200, `open chat ${off.status}`);
assert(calls === 1, "free chat still calls the model");
assert(seen.includes("Tư duy giải") && seen.includes("Solution thinking"), "bilingual instructions");
assert(!/dí dỏm/.test(seen), "no crude tease label");
assert(!/từ chối|I refuse|out of scope/i.test(String(off.json.reply)), "model reply is not a refusal");

const cook = await post(env(), ask("Cho tôi công thức nấu phở bò"));
assert(calls === 1, "demo cook does not call the model");
assert(!/từ chối|chỉ hỗ trợ|ngoài phạm vi|I refuse/i.test(String(cook.json.reply)), "recipe is answered");
assert(/phở/i.test(String(cook.json.reply)), "recipe mentions pho");
assert(replyLanguage("Hello") === "en" && replyLanguage("Xin chào") === "vi", "language detect");
const helloEn = demoReply("Hello");
assert(/solution thinking/i.test(helloEn), "english greeting");
assert(TUTOR_INSTRUCTIONS.includes("mermaid") && TUTOR_INSTRUCTIONS.includes("Phép chia này đang đùa anh đấy"), "prompt tone");
const dirty = `<svg onload="alert(1)"><script>alert(1)</script><circle /></svg>`;
const clean = sanitizeSvg(dirty);
assert(!/script|onload/i.test(clean) && clean.includes("<circle"), "svg sanitized");

const hello = await post(env(), ask("Xin chào"));
assert(String(hello.json.reply).includes("từng bước"), "greeting stays a tutor");
assert(hello.json.mode === "demo", "no key means demo mode");

for (const topic of tutorTopics) {
  const sample = await post(env(), ask(`${topic.keys[0]} ví dụ số`));
  const text = String(sample.json.reply);
  assert(text.includes(`/t/${topic.id}`), `${topic.id} link ${text}`);
  assert(text.includes("$"), `${topic.id} katex`);
  assert(/\n1\)/.test(text), `${topic.id} numbered step`);
}

const math = await post(env(), ask("Giải thích đỉnh của parabol bậc hai"));
const reply = String(math.json.reply);
assert(reply.includes("/t/quadratic"), `topic link ${reply}`);
assert(reply.includes("Tư duy giải"), "solution thinking");
assert(reply.includes("không chốt đáp án"), "steps, not a bare answer");
assert(reply.toLowerCase().includes("kiểm"), "asks the student to verify");

const shared = env({ windowLimit: 2, freeDaily: 8 });
assert((await post(shared, ask("đạo hàm tại một điểm"))).status === 200, "first in window");
assert((await post(shared, ask("đạo hàm tại một điểm"))).status === 200, "second in window");
const fast = await post(shared, ask("đạo hàm tại một điểm"));
assert(fast.status === 429 && fast.json.error === "rate", `rate ${fast.status} ${fast.json.error}`);

const daily = env({ windowLimit: 10, freeDaily: 2 });
assert((await post(daily, ask("tích phân là gì"), "198.51.100.8")).status === 200, "day 1");
assert((await post(daily, ask("tích phân là gì"), "198.51.100.8")).status === 200, "day 2");
const stopped = await post(daily, ask("tích phân là gì"), "198.51.100.8");
assert(stopped.status === 429 && stopped.json.error === "quota" && stopped.json.premium === false, `quota ${JSON.stringify(stopped.json)}`);
const raised = await post(daily, { ...ask("tích phân là gì"), license: "bt_premium" }, "198.51.100.8");
assert(raised.status === 200 && raised.json.premium === true && raised.json.limit === 40, `premium ${JSON.stringify(raised.json)}`);

const broken = env({
  mode: "live",
  complete: () => Promise.reject(new Error("secret-key-should-not-leak")),
});
const down = await post(broken, ask("giới hạn của hàm số"));
assert(down.status === 502 && down.json.error === "model", `model error ${down.status}`);
assert(!JSON.stringify(down.json).includes("secret-key"), "error hides provider details");

const empty = await post(env(), { messages: [] });
assert(empty.status === 400, "empty message");

for (const card of cards) {
  const pair = lectures[card.id];
  assert(pair.length === 2, `${card.id} lectures`);
  assert(pair[0]?.level === "basic" && pair[1]?.level === "exam", `${card.id} levels`);
  assert(
    pair.every((video) => video.title.length > 8 && (video.youtubeId === "" || isYoutubeId(video.youtubeId))),
    `${card.id} lecture id`,
  );
}

if (fails.length > 0) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log("chat ok");

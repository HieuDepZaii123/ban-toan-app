/**
 * Math tutor: demo replies, off-topic refusal, and rate / daily limits.
 * Run with: tsx scripts/chat.test.ts
 */
import { cards } from "../src/content/cards.ts";
import { isYoutubeId, lectures } from "../src/content/lectures.ts";
import { handleChat, type ChatEnv, type ChatTurn } from "../server/chat/handlers.ts";
import { createQuota } from "../server/chat/limit.ts";
import { REFUSAL } from "../server/chat/policy.ts";

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
    premium: (license) => license === "bt_premium",
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

const off = await post(env({ mode: "live" }), ask("Thời tiết Hà Nội hôm nay thế nào?"));
assert(off.status === 200 && off.json.reply === REFUSAL, `off-topic ${JSON.stringify(off.json)}`);
assert(calls === 0, "off-topic must not call the model");

const cook = await post(env(), ask("Cho tôi công thức nấu phở bò"));
assert(cook.json.reply === REFUSAL, "recipe refused");

const hello = await post(env(), ask("Xin chào"));
assert(String(hello.json.reply).includes("từng bước"), "greeting stays a tutor");
assert(hello.json.mode === "demo", "no key means demo mode");

const math = await post(env(), ask("Giải thích đỉnh của parabol bậc hai"));
const reply = String(math.json.reply);
assert(reply.includes("/t/quadratic"), `topic link ${reply}`);
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
  assert(pair.every((video) => video.title.length > 8 && !isYoutubeId(video.youtubeId)), `${card.id} placeholder id`);
}

if (fails.length > 0) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log("chat ok");

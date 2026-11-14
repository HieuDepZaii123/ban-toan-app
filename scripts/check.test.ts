/**
 * Marking own working (/api/check), parent mode and the weekly parent report.
 * Run with: tsx scripts/check.test.ts
 */
import { firstWrongStep } from "../src/check/arith.ts";
import { demoVerdict, handleCheck, parseVerdict, WEEK_MS, type CheckEnv } from "../server/chat/check.ts";
import { handleChat, PARENT_NOTE, type ChatEnv } from "../server/chat/handlers.ts";
import { createQuota } from "../server/chat/limit.ts";
import { appendCheck, buildReport, decodeReport, encodeReport, problemKey, readCheckRows, readExamRows } from "../src/parent/report.ts";
import { hashPin, PIN_RULE } from "../src/parent/parentMode.ts";

const fails: string[] = [];
function assert(cond: boolean, message: string): void {
  if (!cond) fails.push(message);
}

// --- offline step checker
{
  const ok = firstWrongStep(["3·4 + 2 = 14", "14 : 2 = 7"]);
  assert(ok.kind === "ok", "plain arithmetic chain is ok");
  const wrong = firstWrongStep(["3 × 4 + 2 = 14", "14 − 5 = 8", "8 + 1 = 9"]);
  assert(wrong.kind === "wrong" && wrong.step === 2, "finds the first wrong arithmetic step");
  const identity = firstWrongStep(["(x+1)^2 = x^2 + 2x + 1 = x² + 2x + 1"]);
  assert(identity.kind === "ok", "a true identity chain is ok");
  const badId = firstWrongStep(["(x+1)^2", "= x^2 + 1"]);
  assert(badId.kind === "wrong" && badId.step === 2, "a continuation that breaks the identity is wrong");
  const implicit = firstWrongStep(["2(x+3)", "= 2x + 6", "= 2(x + 3)"]);
  assert(implicit.kind === "ok", "implicit multiplication parses");
  const decimal = firstWrongStep(["1,5 + 2,5 = 4"]);
  assert(decimal.kind === "ok", "decimal comma is read as a decimal point");
  const equation = firstWrongStep(["2x + 6 = 0", "2x = -6", "x = -3"]);
  assert(equation.kind === "unknown", "equation solving is left to the live marker, not called ok or wrong");
  const words = firstWrongStep(["sin x = 1"]);
  assert(words.kind === "unknown", "functions are beyond the offline checker");
  assert(firstWrongStep([]).kind === "unknown", "no steps is not ok");
}

// --- model reply parsing
{
  const good = parseVerdict('Sure. {"verdict":"wrong","step":2,"why":"Sai dấu.","hint":"Xem lại dấu trừ.","fix":"2x = -6"}', 3);
  assert(good?.verdict === "wrong" && good.step === 2 && good.fix === "2x = -6", "parses a wrong verdict inside prose");
  const outOfRange = parseVerdict('{"verdict":"wrong","step":9,"why":"x"}', 3);
  assert(outOfRange?.verdict === "unclear" && outOfRange.step === null, "a step number past the end becomes unclear");
  assert(parseVerdict("no json here", 3) === null, "no JSON is a failed marking");
  assert(parseVerdict('{"verdict":"maybe"}', 3) === null, "an unknown verdict is a failed marking");
  const okFix = parseVerdict('{"verdict":"ok","step":null,"why":"Đúng.","hint":"","fix":"leak"}', 2);
  assert(okFix?.fix === "", "an ok verdict carries no fix");
  const demo = demoVerdict(["2 + 2 = 5"], "en");
  assert(demo.verdict === "wrong" && demo.step === 1 && /not equal/.test(demo.why ?? ""), "demo verdict explains the wrong step");
}

// --- endpoint: quota, parent mode, premium
let clock = 1_700_000_000_000;
let completes = 0;
let lastReply = '{"verdict":"wrong","step":1,"why":"Sai.","hint":"Gợi ý.","fix":"2x = -6"}';

function env(over: Partial<CheckEnv> = {}): CheckEnv {
  return {
    now: () => clock,
    mode: "live",
    complete: async () => {
      completes += 1;
      return lastReply;
    },
    premium: async (license) => license === "bt_premium",
    quota: createQuota(),
    freeDaily: 8,
    premiumDaily: 40,
    windowLimit: 100,
    windowMs: 10 * 60 * 1000,
    freeChecksWeekly: 3,
    premiumChecksDaily: 40,
    ...over,
  };
}

async function post(target: CheckEnv, body: unknown, ip = "203.0.113.9"): Promise<{ status: number; json: Record<string, unknown> }> {
  const res = await handleCheck(new Request("http://pay.local/api/check", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  }), target);
  return { status: res.status, json: await res.json() as Record<string, unknown> };
}

const work = { problem: "Giải 2x + 6 = 0", steps: ["2x = 6", "x = 3"], device: "device-aaaa-1111" };
{
  const target = env();
  for (let i = 0; i < 3; i += 1) {
    const res = await post(target, work);
    assert(res.status === 200, `free marking ${i + 1} is allowed`);
    assert(res.json.remaining === 2 - i && res.json.period === "week", `free marking ${i + 1} reports the weekly allowance`);
  }
  const fourth = await post(target, work);
  assert(fourth.status === 429 && fourth.json.error === "quota", "the 4th free marking in a week is refused");
  clock += WEEK_MS + 1;
  const nextWeek = await post(target, work);
  assert(nextWeek.status === 200, "the free allowance comes back after a week");
  clock += 1;

  const other = await post(target, { ...work, device: "device-bbbb-2222" });
  assert(other.status === 200, "another device has its own allowance");

  const premium = await post(target, { ...work, license: "bt_premium" });
  assert(premium.status === 200 && premium.json.premium === true && premium.json.period === "day" && premium.json.remaining === 39, "Premium marks against a daily allowance");
}
{
  const target = env();
  const full = await post(target, work);
  assert(full.json.fix === "2x = -6", "without parent mode the corrected step is returned");
  const parent = await post(target, { ...work, parent: true });
  assert(parent.status === 200 && !("fix" in parent.json) && parent.json.hint === "Gợi ý.", "parent mode never returns the corrected step");
}
{
  const target = env();
  lastReply = "garbled";
  const before = completes;
  const bad = await post(target, work);
  assert(bad.status === 502 && bad.json.remaining === 3, "a failed marking costs no turn");
  assert(completes === before + 1, "the model was asked once");
  lastReply = '{"verdict":"ok","step":null,"why":"Đúng.","hint":""}';
  const good = await post(target, work);
  assert(good.status === 200 && good.json.remaining === 2, "the next marking uses the first turn");
}
{
  const demo = await post(env({ mode: "demo" }), { problem: "Tính", steps: ["2 + 3 = 6"], device: "device-cccc-3333" });
  assert(demo.status === 200 && demo.json.verdict === "wrong" && demo.json.step === 1 && demo.json.mode === "demo", "demo mode marks arithmetic offline");
  const empty = await post(env(), { problem: "Tính", steps: [] });
  assert(empty.status === 400, "no steps is a 400");
  const noProblem = await post(env(), { problem: " ", steps: ["1 = 1"] });
  assert(noProblem.status === 400, "no problem is a 400");
  const notFound = await handleCheck(new Request("http://pay.local/api/check", { method: "GET" }), env());
  assert(notFound.status === 404, "GET is not a route");
}

// --- chat honours parent mode
{
  let seen = "";
  const chat: ChatEnv = {
    now: () => clock,
    mode: "live",
    complete: async (instructions) => {
      seen = instructions;
      return "Gửi bài làm của bạn trước nhé.";
    },
    premium: async () => false,
    quota: createQuota(),
    freeDaily: 8,
    premiumDaily: 40,
    windowLimit: 10,
    windowMs: 600_000,
  };
  const ask = (parent: boolean) => handleChat(new Request("http://pay.local/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: "Giải giúp mình 2x + 6 = 0" }], parent }),
  }), chat);
  await ask(true);
  assert(seen.includes(PARENT_NOTE), "parent mode adds the attempt-first note to the tutor");
  await ask(false);
  assert(!seen.includes(PARENT_NOTE), "without parent mode the note is absent");
  const chatPremium: ChatEnv = { ...chat, premium: async (license) => license === "bt_premium" };
  const solve = (parent: boolean) => handleChat(new Request("http://pay.local/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: "Giải 2x + 6 = 0" }], mode: "solve", license: "bt_premium", parent }),
  }), chatPremium);
  const locked = await solve(true);
  assert(locked.status === 403 && (await locked.json() as { error?: string }).error === "parent", "parent mode locks full solutions even for Premium");
  assert((await solve(false)).status === 200, "Premium full solutions work without parent mode");
}

// --- parent PIN
{
  assert(PIN_RULE.test("1234") && PIN_RULE.test("12345678") && !PIN_RULE.test("123") && !PIN_RULE.test("12ab"), "PIN rule is 4-8 digits");
  const a = await hashPin("2468", "salt-1");
  assert(a === (await hashPin("2468", "salt-1")) && a !== (await hashPin("2468", "salt-2")) && a.length === 64, "PIN hash is salted SHA-256");
}

// --- weekly report
{
  const now = 1_800_000_000_000;
  const day = 86_400_000;
  const exams = readExamRows(JSON.stringify({ history: [
    { at: now - 1 * day, total: 7.25, mcq: 2, tf: 3, short: 2.25 },
    { at: now - 5 * day, total: 6, mcq: 2, tf: 2, short: 2 },
    { at: now - 10 * day, total: 4, mcq: 1, tf: 1, short: 2 },
    { bad: true },
  ] }));
  assert(exams.length === 3, "exam rows are read and junk dropped");
  const key = problemKey("Giải  2x + 6 = 0");
  assert(key === problemKey("giải 2x + 6 = 0 "), "problem key ignores case and spacing");
  let checks = readCheckRows("not json");
  assert(checks.length === 0, "bad check log reads as empty");
  checks = appendCheck(checks, { at: now - 4 * day, key, verdict: "wrong", step: 1 });
  checks = appendCheck(checks, { at: now - 3 * day, key, verdict: "ok", step: null });
  checks = appendCheck(checks, { at: now - 2 * day, key: "other", verdict: "wrong", step: 2 });
  checks = appendCheck(checks, { at: now - 9 * day, key: "old", verdict: "wrong", step: 1 });
  const report = buildReport({ now, exams, checks, parentSince: now - 8 * day });
  assert(report.papers.length === 2 && report.papers[0]?.total === 6 && report.papers[1]?.total === 7.25, "only this week's papers, oldest first");
  assert(report.checks === 3 && report.wrong === 2 && report.fixed === 1, "markings, wrong steps and fixes are counted for the week");
  assert(report.parent, "parent mode on since before the week counts as on all week");
  assert(!buildReport({ now, exams, checks, parentSince: now - day }).parent, "parent mode turned on mid-week is not 'all week'");
  assert(!buildReport({ now, exams, checks, parentSince: null }).parent, "parent mode off is reported as off");

  const code = encodeReport(report);
  assert(/^[A-Za-z0-9_-]+$/.test(code), "report code is URL-safe");
  const back = decodeReport(code);
  assert(JSON.stringify(back) === JSON.stringify(report), "report survives the round trip");
  assert(decodeReport("!!!") === null, "garbage is not a report");
  const forged = encodeReport({ ...report, papers: [{ at: now, total: 42 }] });
  assert(decodeReport(forged) === null, "a score above 10 is rejected");
}

if (fails.length > 0) {
  console.error(`check: ${fails.length} failed\n- ${fails.join("\n- ")}`);
  process.exit(1);
}
console.log("check: all passed");

/**
 * Kế hoạch ôn lỗi sai: câu sai vào kế hoạch, lịch giãn cách 1-3-7-14 ngày, sai thì về hộp đầu,
 * đúng ở hộp cuối thì rời kế hoạch, dữ liệu hỏng trong localStorage không làm vỡ trang.
 * Run with: tsx scripts/review.test.ts
 */
import assert from "node:assert/strict";
import { thptById } from "../src/thpt/bank.ts";
import { buildPaper, emptyAnswers, scorePaper, shortValue, type Answers } from "../src/thpt/exam2025.ts";
import {
  addPaper,
  answerCard,
  DAY_MS,
  dueCards,
  emptyReview,
  INTERVAL_DAYS,
  loadReview,
  missedQuestions,
  readReview,
  REVIEW_KEY,
  saveReview,
  schedule,
  weakTopics,
} from "../src/thpt/review.ts";

const name = (id: string) => ({ vi: id, en: id });
const NOON = new Date(2026, 10, 10, 12, 0, 0).getTime();

const paper = buildPaper(20251110);

/** Every question right except the first `mcqWrong` multiple choice and first `shortWrong` short answers. */
function sheet(mcqWrong: number, shortWrong: number): Answers {
  const answers = emptyAnswers();
  paper.mcq.forEach((id, index) => {
    const question = thptById.get(id)!;
    answers.mcq[id] = index < mcqWrong ? (question.answer + 1) % 4 : question.answer;
  });
  paper.tf.forEach((question, qi) => question.statements.forEach((statement, si) => { answers.tf[`${qi}:${si}`] = statement.truth; }));
  paper.short.forEach((id, index) => {
    const value = shortValue(thptById.get(id)!)!;
    answers.short[id] = index < shortWrong ? String(value + 1) : String(value).replace(".", ",");
  });
  return answers;
}

// A perfect paper adds nothing.
assert.deepEqual(missedQuestions(paper, sheet(0, 0)), []);
const clean = addPaper(emptyReview(), paper, sheet(0, 0), scorePaper(paper, sheet(0, 0), name).losses, NOON);
assert.equal(clean.cards.length, 0);
assert.equal(clean.papers, 1);
assert.deepEqual(clean.lost, {});

// Three wrong multiple choice, two wrong short answers, and blanks count as wrong.
const answers = sheet(3, 2);
const missed = missedQuestions(paper, answers);
assert.deepEqual(missed.map((item) => item.kind), ["mcq", "mcq", "mcq", "short", "short"]);
assert.deepEqual(missed.map((item) => item.id), [...paper.mcq.slice(0, 3), ...paper.short.slice(0, 2)]);
assert.equal(missedQuestions(paper, emptyAnswers()).length, paper.mcq.length + paper.short.length, "blank paper: everything is missed");

const score = scorePaper(paper, answers, name);
let state = addPaper(emptyReview(), paper, answers, score.losses, NOON);
assert.equal(state.cards.length, 5);
assert.ok(state.cards.every((card) => card.box === 0 && card.due === NOON && card.lapses === 0));
assert.equal(dueCards(state, NOON).length, 5, "missed questions can be redone straight away");
assert.equal(Object.values(state.lost).reduce((sum, points) => sum + points, 0).toFixed(2), (3 * 0.25 + 2 * 0.5).toFixed(2), "lost points recorded per topic");
assert.deepEqual(schedule(state, NOON), { today: 5, tomorrow: 0, week: 0, later: 0, total: 5 });

// Right answers walk the boxes: 1, 3, 7, 14 days, then the card leaves the plan.
const first = state.cards[0]!.id;
let at = NOON;
for (const [box, days] of INTERVAL_DAYS.entries()) {
  const card = state.cards.find((item) => item.id === first)!;
  assert.equal(card.box, box);
  state = answerCard(state, first, true, at);
  if (box < INTERVAL_DAYS.length - 1) {
    const moved = state.cards.find((item) => item.id === first)!;
    assert.equal(moved.box, box + 1);
    assert.equal(moved.due, at + days * DAY_MS, `box ${box} → due in ${days} days`);
    assert.ok(!dueCards(state, at + days * DAY_MS - 1).some((item) => item.id === first), "not due a moment before");
    assert.ok(dueCards(state, at + days * DAY_MS).some((item) => item.id === first), "due on the day");
    at += days * DAY_MS;
  }
}
assert.ok(!state.cards.some((item) => item.id === first), "mastered card leaves the plan");
assert.equal(state.mastered, 1);
assert.equal(state.cards.length, 4);

// A wrong answer sends a card back to the first box, due tomorrow.
const second = state.cards[0]!.id;
state = answerCard(state, second, true, NOON);
state = answerCard(state, second, true, NOON + DAY_MS);
assert.equal(state.cards.find((item) => item.id === second)!.box, 2);
state = answerCard(state, second, false, NOON + 4 * DAY_MS);
const lapsed = state.cards.find((item) => item.id === second)!;
assert.deepEqual([lapsed.box, lapsed.due, lapsed.lapses], [0, NOON + 5 * DAY_MS, 1]);
assert.equal(answerCard(state, "no-such-question", true, NOON), state, "unknown id changes nothing");

// Missing the same question on a later paper resets it instead of duplicating it.
const before = state.cards.length;
const repeat = addPaper(state, paper, answers, score.losses, NOON + 9 * DAY_MS);
assert.equal(new Set(repeat.cards.map((card) => card.id)).size, repeat.cards.length, "no duplicate cards");
assert.equal(repeat.cards.length, before + 1, "the mastered question comes back, the others are reset");
const reset = repeat.cards.find((item) => item.id === second)!;
assert.deepEqual([reset.box, reset.due, reset.lapses], [0, NOON + 9 * DAY_MS, 2]);
assert.equal(repeat.papers, 2);

// Schedule buckets by calendar day; overdue counts as today.
const spread = {
  ...emptyReview(),
  cards: [
    { id: paper.mcq[0]!, kind: "mcq" as const, topic: "a", box: 0, due: NOON - 3 * DAY_MS, added: 1, lapses: 0 },
    { id: paper.mcq[1]!, kind: "mcq" as const, topic: "a", box: 0, due: NOON + 6 * 3_600_000, added: 2, lapses: 0 },
    { id: paper.mcq[2]!, kind: "mcq" as const, topic: "b", box: 1, due: NOON + DAY_MS, added: 3, lapses: 0 },
    { id: paper.mcq[3]!, kind: "mcq" as const, topic: "b", box: 2, due: NOON + 5 * DAY_MS, added: 4, lapses: 0 },
    { id: paper.mcq[4]!, kind: "mcq" as const, topic: "c", box: 3, due: NOON + 12 * DAY_MS, added: 5, lapses: 0 },
  ],
  lost: { a: 0.5, b: 1.25, c: 0.25 },
};
assert.deepEqual(schedule(spread, NOON), { today: 2, tomorrow: 1, week: 1, later: 1, total: 5 });
assert.deepEqual(dueCards(spread, NOON).map((card) => card.id), [paper.mcq[0]], "only what is due now, most overdue first");
assert.deepEqual(weakTopics(spread).map((item) => [item.topic, item.lost, item.waiting]), [["b", 1.25, 2], ["a", 0.5, 2], ["c", 0.25, 1]]);
assert.equal(weakTopics(spread, 1).length, 1);

// Storage round trip, and damaged data is cleaned instead of crashing.
const memory = new Map<string, string>();
const storage = { getItem: (key: string) => memory.get(key) ?? null, setItem: (key: string, value: string) => void memory.set(key, value) };
saveReview(spread, storage);
assert.deepEqual(loadReview(storage), spread);
memory.set(REVIEW_KEY, "{not json");
assert.deepEqual(loadReview(storage), emptyReview());
const dirty = readReview({
  cards: [
    spread.cards[0],
    spread.cards[0],
    { id: "gone-from-bank", kind: "mcq", box: 0, due: 1, added: 1 },
    { id: paper.mcq[1], kind: "essay", box: 0, due: 1, added: 1 },
    { id: paper.mcq[2], kind: "mcq", box: 99, due: 5, added: 1, lapses: -4 },
    "junk",
  ],
  mastered: -3,
  lost: { a: 1, b: "x", c: -2 },
  papers: 2.7,
});
assert.deepEqual(dirty.cards.map((card) => [card.id, card.box, card.lapses]), [[paper.mcq[0], 0, 0], [paper.mcq[2], INTERVAL_DAYS.length - 1, 0]]);
assert.deepEqual([dirty.mastered, dirty.lost, dirty.papers], [0, { a: 1 }, 2]);
assert.deepEqual(readReview(null), emptyReview());
assert.deepEqual(readReview([1, 2]), emptyReview());

console.log("review ok");

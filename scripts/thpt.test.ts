/**
 * Luyện THPT lớp 10–12: ngân hàng 150 câu mỗi lớp theo chủ đề, đáp số sympy, và logic lưu tiến độ / thi thử.
 * Run with: tsx scripts/thpt.test.ts
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { gradePractice } from "../src/grades/practiceBank.ts";
import { THPT_GRADES, inScope, thptBank, thptById, thptTopics } from "../src/thpt/bank.ts";
import {
  answerExam,
  answerPractice,
  cancelExam,
  emptyThptBag,
  finishExam,
  freshIds,
  parseThptBag,
  pickExam,
  resetProgress,
  scoreOf10,
  secondsLeft,
  setScope,
  startExam,
  tally,
  tallyBy,
  wrongIds,
} from "../src/thpt/store.ts";
import { checkMarked, checkShape, sympyRows } from "./questionCheck.ts";

/* ---------- ngân hàng ---------- */

assert.equal(thptBank.length, 450);
assert.equal(new Set(thptBank.map((item) => item.id)).size, 450);
const quickIds = new Set(gradePractice.map((item) => item.id));
assert.ok(thptBank.every((item) => !quickIds.has(item.id)), "luyện THPT phải tách khỏi luyện nhanh");
for (const grade of THPT_GRADES) {
  const rows = thptBank.filter((item) => item.grade === grade);
  assert.equal(rows.length, 150, `lớp ${grade} cần 150 câu`);
  checkShape(rows, `THPT lớp ${grade}`);
  const topics = thptTopics.filter((topic) => topic.grade === grade);
  assert.ok(topics.length >= 5, `lớp ${grade} cần ít nhất 5 chủ đề`);
  for (const topic of topics) {
    const count = rows.filter((item) => item.topic === topic.id).length;
    assert.equal(count, topic.keys.length * 10, `${topic.id} có ${count} câu`);
    assert.ok(/[à-ỹđ]/i.test(topic.vi), `${topic.id} thiếu tên tiếng Việt`);
  }
}
assert.equal(new Set(thptTopics.map((topic) => topic.id)).size, thptTopics.length);
assert.ok(checkMarked(thptBank) >= 300, "so được quá ít đáp án THPT");
assert.equal(inScope([10], []).length, 150);
assert.equal(inScope([10, 11, 12], ["g11-gioi-han"]).length, 40);
assert.equal(inScope([10], ["g11-gioi-han"]).length, 0);

/* ---------- lưu tiến độ ---------- */

const first = thptBank[0]!;
const second = thptBank[1]!;
let bag = answerPractice(emptyThptBag(), first.id, first.answer);
bag = answerPractice(bag, second.id, (second.answer + 1) % 4);
assert.equal(bag.at, second.id);
assert.deepEqual(tally([first, second], bag.picks), { total: 2, done: 2, right: 1 });
assert.deepEqual(wrongIds(thptBank, bag.picks), [second.id]);
assert.equal(freshIds(thptBank, bag.picks).length, 448);
const byTopic = tallyBy(thptBank, bag.picks, (item) => item.topic);
assert.equal([...byTopic.values()].reduce((sum, item) => sum + item.total, 0), 450);

bag = setScope(bag, [11, 12], ["g12-tich-phan"]);
const restored = parseThptBag(JSON.stringify(bag));
assert.deepEqual(restored.grades, [11, 12]);
assert.deepEqual(restored.topics, ["g12-tich-phan"]);
assert.equal(restored.picks[second.id], (second.answer + 1) % 4);
assert.deepEqual(parseThptBag("không phải json"), emptyThptBag());
assert.deepEqual(parseThptBag(JSON.stringify({ picks: { a: 7, b: 2 }, grades: [9, 10], exams: [{ at: 1 }] })).picks, { b: 2 });
assert.deepEqual(parseThptBag(JSON.stringify({ grades: [3] })).grades, [10, 11, 12]);

/* ---------- thi thử ---------- */

const pool = inScope([10, 11, 12], []);
const ids = pickExam(pool, 40, 1234);
assert.equal(ids.length, 40);
assert.equal(new Set(ids).size, 40);
assert.deepEqual(pickExam(pool, 40, 1234), ids, "cùng hạt giống thì cùng đề");
assert.notDeepEqual(pickExam(pool, 40, 99), ids);
const covered = new Set(ids.map((id) => thptById.get(id)!.topic));
assert.equal(covered.size, thptTopics.length, "đề 40 câu phủ mọi chủ đề");
assert.equal(pickExam(inScope([10], ["g10-tap-hop"]), 40, 1).length, 10, "không đủ câu thì lấy hết");

const now = Date.UTC(2026, 10, 7, 8, 0, 0);
bag = startExam(emptyThptBag(), ids.slice(0, 4), 15, [10, 11, 12], now);
assert.equal(secondsLeft(bag.active!, now + 60_000), 14 * 60);
assert.equal(secondsLeft(bag.active!, now + 3_600_000), 0);
assert.equal(secondsLeft({ ...bag.active!, limit: 0 }, now), null);
const [q1, q2, q3] = ids.slice(0, 3).map((id) => thptById.get(id)!);
bag = answerExam(bag, q1!.id, q1!.answer);
bag = answerExam(bag, q2!.id, (q2!.answer + 2) % 4);
bag = answerExam(bag, q3!.id, q3!.answer);
bag = answerExam(bag, "khong-co", 0);
assert.equal(Object.keys(bag.active!.answers).length, 3);
const reloaded = parseThptBag(JSON.stringify(bag));
assert.deepEqual(reloaded.active, bag.active, "bài thi đang làm sống sót khi tải lại");
bag = finishExam(bag, (id) => thptById.get(id)?.answer, now + 20 * 60_000);
assert.equal(bag.active, null);
assert.deepEqual({ ...bag.exams[0]!, at: "" }, { at: "", grades: [10, 11, 12], total: 4, right: 2, seconds: 15 * 60, limit: 15 });
assert.equal(bag.last?.record.right, 2);
assert.equal(bag.picks[q2!.id], (q2!.answer + 2) % 4, "câu thi ghi vào tiến độ");
assert.equal(parseThptBag(JSON.stringify(bag)).last?.ids.length, 4);
assert.equal(cancelExam(startExam(bag, ids, 0, [10], now)).active, null);
assert.equal(scoreOf10(2, 4), 5);
assert.equal(scoreOf10(31, 40), 7.75);
assert.equal(scoreOf10(0, 0), 0);
const cleared = resetProgress(setScope(bag, [12], []));
assert.deepEqual(cleared.picks, {});
assert.deepEqual(cleared.exams, []);
assert.deepEqual(cleared.grades, [12]);

execFileSync("python3", ["scripts/practice_sympy.py"], { input: JSON.stringify(sympyRows(thptBank)), stdio: ["pipe", "inherit", "inherit"] });
console.log("thpt ok");

import assert from "node:assert/strict";
import { buildPaper, emptyAnswers, parseShort, scorePaper, shortValue, tfPoints, TF_TOPIC_NAMES, type Answers } from "../src/thpt/exam2025.ts";
import { thptById, topicById } from "../src/thpt/bank.ts";

const name = (id: string) => {
  const topic = topicById(id);
  return topic ? { vi: topic.vi, en: topic.en } : TF_TOPIC_NAMES.get(id) ?? { vi: id, en: id };
};

assert.deepEqual([0, 1, 2, 3, 4].map(tfPoints), [0, 0.1, 0.25, 0.5, 1], "official true/false partial credit");
assert.equal(parseShort("-1,5"), -1.5);
assert.equal(parseShort(" 12 "), 12);
assert.equal(parseShort("1/2"), null);

for (let seed = 1; seed <= 300; seed += 1) {
  const paper = buildPaper(seed);
  assert.equal(paper.mcq.length, 12, `seed ${seed} part I`);
  assert.equal(paper.tf.length, 4, `seed ${seed} part II`);
  assert.equal(paper.short.length, 6, `seed ${seed} part III`);
  assert.equal(new Set([...paper.mcq, ...paper.short]).size, 18, `seed ${seed} repeats a question`);
  assert.equal(new Set(paper.tf.map((q) => q.topic)).size, 4, `seed ${seed} true/false topics repeat`);
  for (const id of paper.short) assert.notEqual(shortValue(thptById.get(id)!), null, `${id} is not a short-answer number`);
  for (const q of paper.tf) {
    assert.ok(!/Chưa đủ|not enough/i.test(q.contextVi + q.contextEn), `${q.id} keeps the in-app instruction`);
    for (const s of q.statements) assert.ok(s.vi && s.en && s.whyVi && s.whyEn, `${q.id} statement incomplete`);
  }
  assert.deepEqual(buildPaper(seed), paper, "same seed, same paper");

  // Every answer right scores 10; nothing answered scores 0.
  const perfect: Answers = emptyAnswers();
  for (const id of paper.mcq) perfect.mcq[id] = thptById.get(id)!.answer;
  paper.tf.forEach((q, qi) => q.statements.forEach((s, si) => { perfect.tf[`${qi}:${si}`] = s.truth; }));
  for (const id of paper.short) perfect.short[id] = String(shortValue(thptById.get(id)!)).replace(".", ",");
  const top = scorePaper(paper, perfect, name);
  assert.equal(top.total, 10, `seed ${seed} perfect = ${top.total}`);
  assert.equal(top.losses.length, 0);
  assert.equal(scorePaper(paper, emptyAnswers(), name).total, 0);

  // Three of four statements right on the first true/false question costs exactly 0.5.
  const three = structuredClone(perfect);
  three.tf["0:0"] = !paper.tf[0]!.statements[0]!.truth;
  assert.equal(scorePaper(paper, three, name).total, 9.5);
}
console.log("exam 2025 ok (300 papers)");

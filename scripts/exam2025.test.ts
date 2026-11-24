import assert from "node:assert/strict";
import katex from "katex";
import { buildPaper, declared, emptyAnswers, parseShort, scorePaper, shortValue, tfPoints, TF_TOPIC_NAMES, type Answers } from "../src/thpt/exam2025.ts";
import { thptById, topicById } from "../src/thpt/bank.ts";
import { HARD_KEYS, templateKeyOf } from "../src/grades/practiceGen.ts";

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
  const kinds = [...paper.mcq, ...paper.short].map((id) => templateKeyOf(id));
  assert.equal(new Set(kinds).size, kinds.length, `seed ${seed} has two questions of the same kind`);
  assert.equal(paper.mcq.filter((id) => HARD_KEYS.has(templateKeyOf(id))).length, 4, `seed ${seed} part I needs 4 application questions`);
  assert.equal(paper.short.filter((id) => HARD_KEYS.has(templateKeyOf(id))).length, 2, `seed ${seed} part III needs 2 application questions`);
  assert.ok(paper.mcq.filter((id) => thptById.get(id)!.grade === 12).length >= 8, `seed ${seed} part I is not mostly grade 12`);
  for (const id of paper.short) assert.notEqual(shortValue(thptById.get(id)!), null, `${id} is not a short-answer number`);
  for (const q of paper.tf) {
    for (const text of [q.contextVi, q.contextEn, ...q.statements.flatMap((x) => [x.vi, x.en, x.whyVi, x.whyEn])]) {
      for (const tex of text.match(/\$[^$]+\$/g) ?? []) katex.renderToString(tex.slice(1, -1), { throwOnError: true, strict: "error" });
    }
    assert.ok(!/Chưa đủ|not enough/i.test(q.contextVi + q.contextEn), `${q.id} keeps the in-app instruction`);
    for (const s of q.statements) assert.ok(s.vi && s.en && s.whyVi && s.whyEn, `${q.id} statement incomplete`);
    for (const s of q.statements) {
      for (const text of [q.contextVi, s.vi, s.whyVi]) {
        assert.ok(!/(^|[^0-9A-Za-z.{,^_\\])1[a-z](?![a-z])/.test((text.match(/\$[^$]*\$/g) ?? []).join(" ")), `${q.id} writes a coefficient 1: ${text}`);
        assert.ok(!/\+\s*-|-\s*-/.test((text.match(/\$[^$]*\$/g) ?? []).join(" ")), `${q.id} has a doubled sign: ${text}`);
      }
      assert.ok(declared(q.contextVi, s.vi), `${q.id} uses a name the question never defines: ${s.vi}`);
      assert.ok(declared(q.contextEn, s.en), `${q.id} (en) uses a name the question never defines: ${s.en}`);
    }
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

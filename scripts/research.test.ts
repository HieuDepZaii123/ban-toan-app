/**
 * Every revealed formula matches an independent measurement on sample points.
 * Run with: tsx scripts/research.test.ts
 */
import katex from "katex";
import { cards } from "../src/content/cards.ts";
import { geomPartial, medianOf } from "../src/lib/math.ts";
import { studyBriefs } from "../src/research/briefs.ts";
import { allStudies } from "../src/research/index.ts";

const fails: string[] = [];
const MARK = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const BARE = /\b(khong|duoc|dinh|nghiem|phuong trinh|ham so)\b/i;

function assert(cond: boolean, message: string): void {
  if (!cond) fails.push(message);
}

function texOf(text: string): string[] {
  const out: string[] = [];
  const re = /\$([^$]+)\$/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) out.push(match[1] ?? "");
  return out;
}

assert(allStudies.length === 28, `expected 28 investigations, found ${allStudies.length}`);
assert(studyBriefs.length === 28, "the notebook lists 28 investigations");

for (const card of cards) {
  const found = allStudies.filter((study) => study.topic === card.id);
  assert(found.length === 2, `${card.id} has ${found.length} investigations`);
}

const ids = new Set<string>();
for (const study of allStudies) {
  assert(!ids.has(study.id), `${study.id} is duplicated`);
  ids.add(study.id);
  const brief = studyBriefs.find((item) => item.id === study.id);
  assert(brief?.topic === study.topic && brief.title === study.title, `${study.id} brief does not match`);
  assert(study.guesses.length === 3, `${study.id} needs three hypotheses`);
  assert(study.guesses.some((guess) => guess.id === study.answerId), `${study.id} answer is not one of the hypotheses`);
  assert(new Set(study.guesses.map((guess) => guess.id)).size === 3, `${study.id} hypothesis ids repeat`);
  assert(study.samples.length >= 5, `${study.id} needs at least 5 sample points`);
  assert(study.columns.some((column) => column.key === study.plotX), `${study.id} plot x is not a column`);
  assert(study.columns.some((column) => column.key === study.plotY), `${study.id} plot y is not a column`);
  const vi = [
    study.title,
    study.question,
    study.hint,
    study.block,
    study.result,
    study.follow,
    ...study.guesses.map((guess) => guess.vi),
  ].join(" ");
  assert(MARK.test(vi), `${study.id} Vietnamese copy has no diacritics`);
  assert(!BARE.test(vi), `${study.id} has an undiacritised Vietnamese word`);
  const blobs = [
    study.title, study.titleEn, study.question, study.questionEn, study.hint, study.hintEn,
    study.block, study.blockEn, study.result, study.resultEn, study.follow, study.followEn,
    ...study.guesses.flatMap((guess) => [guess.vi, guess.en]),
    ...study.columns.flatMap((column) => [column.vi, column.en]),
  ];
  for (const blob of blobs) {
    for (const tex of texOf(blob)) {
      assert(!MARK.test(tex), `${study.id} has Vietnamese inside math: ${tex}`);
      try {
        katex.renderToString(tex, { throwOnError: true });
      } catch (error) {
        fails.push(`${study.id} KaTeX: ${tex} (${error instanceof Error ? error.message : "fail"})`);
      }
    }
  }
  for (const sample of study.samples) {
    const params = { ...study.preset, ...sample };
    const row = study.measure(params);
    assert(row !== null, `${study.id} sample ${JSON.stringify(sample)} did not measure`);
    if (!row) continue;
    for (const column of study.columns) {
      const value = row[column.key];
      assert(typeof value === "number" && Number.isFinite(value), `${study.id} column ${column.key} is missing`);
    }
    const x = row[study.plotX];
    const y = row[study.plotY];
    if (typeof x !== "number" || typeof y !== "number") continue;
    const predicted = study.formula(x, params);
    const gap = Math.abs(y - predicted);
    assert(Number.isFinite(predicted) && gap <= study.tol, `${study.id} at x=${x}: measured ${y}, formula ${predicted}, gap ${gap}`);
    if (study.id === "vec-r-cross" && typeof row.gap === "number") {
      assert(Math.abs(row.gap) < 1e-8, `${study.id} identity gap ${row.gap}`);
    }
    if (study.id === "cmb-r-mean" && typeof row.m === "number" && typeof row.med === "number") {
      assert(row.med === medianOf([2, 3, 4, 5, row.m]), `${study.id} median ${row.med} at m=${row.m}`);
    }
  }
}

const cone = allStudies.find((study) => study.id === "shp-r-cone");
if (cone) {
  const volume = (h: number) => cone.formula(h, cone.preset);
  assert(volume(8) > volume(6) && volume(8) > volume(10), "the inscribed cone is tallest at h=8");
}
const cubic = allStudies.find((study) => study.id === "surv-r-cubic");
if (cubic) assert(Math.abs(cubic.formula(-1, cubic.preset) - 2) < 1e-12, "the cubic maximum is 2");
const bayes = allStudies.find((study) => study.id === "prob-r-bayes");
if (bayes) assert(Math.abs(bayes.formula(1, bayes.preset) - 1 / 6) < 1e-9, "the 1% test posterior is 1/6");
const power = allStudies.find((study) => study.id === "ana-r-power");
if (power) {
  assert(Math.abs(power.formula(5, { cx: 3, cy: 4 })) < 1e-12, "the point (3,4) sits on the circle of radius 5");
  assert(power.formula(3, { cx: 3, cy: 4 }) > 0 && power.formula(8, { cx: 3, cy: 4 }) < 0, "inside and outside switch at radius 5");
}
const tail = geomPartial(8, 0.5, 8);
assert(Math.abs(16 - tail) < 0.07, "eight geometric terms are within 0.07 of 16");

if (fails.length > 0) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log(`research ok (${allStudies.length} investigations)`);

/**
 * 500 seeds per generator: independent answer, distinct finite choices, KaTeX.
 * The correct slot never repeats, and over a long run it stays near uniform.
 * Run with: tsx scripts/vary.test.ts
 */
import katex from "katex";
import { analyticQuestions } from "../src/content/analytic.ts";
import { comboQuestions } from "../src/content/combo.ts";
import { derivativeQuestions } from "../src/content/derivative.ts";
import { expQuestions } from "../src/content/exp.ts";
import { ineqQuestions } from "../src/content/ineq.ts";
import { integralQuestions } from "../src/content/integral.ts";
import { limitQuestions } from "../src/content/limit.ts";
import { probabilityQuestions } from "../src/content/probability.ts";
import { quadraticQuestions } from "../src/content/quadratic.ts";
import { sequenceQuestions } from "../src/content/sequence.ts";
import { surveyQuestions } from "../src/content/survey.ts";
import { triangleQuestions } from "../src/content/triangle.ts";
import { trigQuestions } from "../src/content/trig.ts";
import type { Question } from "../src/content/types.ts";
import { vectorQuestions } from "../src/content/vector.ts";
import { analyticVary } from "../src/content/vary/analytic.ts";
import { comboVary } from "../src/content/vary/combo.ts";
import { derivativeVary } from "../src/content/vary/derivative.ts";
import { expVary } from "../src/content/vary/exp.ts";
import { ineqVary } from "../src/content/vary/ineq.ts";
import { integralVary } from "../src/content/vary/integral.ts";
import { limitVary } from "../src/content/vary/limit.ts";
import { probabilityVary } from "../src/content/vary/probability.ts";
import { quadraticVary } from "../src/content/vary/quadratic.ts";
import { sequenceVary } from "../src/content/vary/sequence.ts";
import { surveyVary } from "../src/content/vary/survey.ts";
import { triangleVary } from "../src/content/vary/triangle.ts";
import { trigVary } from "../src/content/vary/trig.ts";
import type { Vary } from "../src/content/vary/types.ts";
import { vectorVary } from "../src/content/vary/vector.ts";
import { analyticConceptQuestions, analyticConceptVary } from "../src/content/vary/concept/analytic.ts";
import { comboConceptQuestions, comboConceptVary } from "../src/content/vary/concept/combo.ts";
import { derivativeConceptQuestions, derivativeConceptVary } from "../src/content/vary/concept/derivative.ts";
import { expConceptQuestions, expConceptVary } from "../src/content/vary/concept/exp.ts";
import { ineqConceptQuestions, ineqConceptVary } from "../src/content/vary/concept/ineq.ts";
import { integralConceptQuestions, integralConceptVary } from "../src/content/vary/concept/integral.ts";
import { limitConceptQuestions, limitConceptVary } from "../src/content/vary/concept/limit.ts";
import { probabilityConceptQuestions, probabilityConceptVary } from "../src/content/vary/concept/probability.ts";
import { quadraticConceptQuestions, quadraticConceptVary } from "../src/content/vary/concept/quadratic.ts";
import { sequenceConceptQuestions, sequenceConceptVary } from "../src/content/vary/concept/sequence.ts";
import { surveyConceptQuestions, surveyConceptVary } from "../src/content/vary/concept/survey.ts";
import { triangleConceptQuestions, triangleConceptVary } from "../src/content/vary/concept/triangle.ts";
import { trigConceptQuestions, trigConceptVary } from "../src/content/vary/concept/trig.ts";
import { vectorConceptQuestions, vectorConceptVary } from "../src/content/vary/concept/vector.ts";
import { mulberry32, nextPos } from "../src/lib/prng.ts";
import { sessionQuestions } from "../src/topic/show.ts";
import { expectCorrect } from "./oracle.ts";

const MARK = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const SEEDS = 500;
const fails: string[] = [];

function assert(cond: boolean, message: string): void {
  if (!cond && fails.length < 40) fails.push(message);
}

function texOf(text: string): string[] {
  const out: string[] = [];
  const re = /\$([^$]+)\$/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) out.push(match[1] ?? "");
  return out;
}

function checkTex(label: string, text: string): boolean {
  let bad = false;
  for (const tex of texOf(text)) {
    try {
      katex.renderToString(tex, { throwOnError: true, strict: "ignore" });
    } catch (error) {
      assert(false, `${label} KaTeX: ${tex} (${error instanceof Error ? error.message : "fail"})`);
      bad = true;
    }
    if (MARK.test(tex)) {
      assert(false, `${label} unicode in math: ${tex.slice(0, 160)}`);
      bad = true;
    }
  }
  return bad;
}

const banks: { questions: Question[]; vary: Vary[] }[] = [
  { questions: [...quadraticQuestions, ...quadraticConceptQuestions], vary: [...quadraticVary(quadraticQuestions), ...quadraticConceptVary] },
  { questions: [...ineqQuestions, ...ineqConceptQuestions], vary: [...ineqVary(ineqQuestions), ...ineqConceptVary] },
  { questions: [...expQuestions, ...expConceptQuestions], vary: [...expVary(expQuestions), ...expConceptVary] },
  { questions: [...sequenceQuestions, ...sequenceConceptQuestions], vary: [...sequenceVary(sequenceQuestions), ...sequenceConceptVary] },
  { questions: [...trigQuestions, ...trigConceptQuestions], vary: [...trigVary(trigQuestions), ...trigConceptVary] },
  { questions: [...limitQuestions, ...limitConceptQuestions], vary: [...limitVary(limitQuestions), ...limitConceptVary] },
  { questions: [...derivativeQuestions, ...derivativeConceptQuestions], vary: [...derivativeVary(derivativeQuestions), ...derivativeConceptVary] },
  { questions: [...surveyQuestions, ...surveyConceptQuestions], vary: [...surveyVary(surveyQuestions), ...surveyConceptVary] },
  { questions: [...integralQuestions, ...integralConceptQuestions], vary: [...integralVary(integralQuestions), ...integralConceptVary] },
  { questions: [...vectorQuestions, ...vectorConceptQuestions], vary: [...vectorVary(vectorQuestions), ...vectorConceptVary] },
  { questions: [...analyticQuestions, ...analyticConceptQuestions], vary: [...analyticVary(analyticQuestions), ...analyticConceptVary] },
  { questions: [...triangleQuestions, ...triangleConceptQuestions], vary: [...triangleVary(triangleQuestions), ...triangleConceptVary] },
  { questions: [...comboQuestions, ...comboConceptQuestions], vary: [...comboVary(comboQuestions), ...comboConceptVary] },
  { questions: [...probabilityQuestions, ...probabilityConceptQuestions], vary: [...probabilityVary(probabilityQuestions), ...probabilityConceptVary] },
];

let generators = 0;
for (const bank of banks) {
  const ids = new Set(bank.questions.map((question) => question.id));
  assert(bank.vary.length === bank.questions.length, `vary count ${bank.vary.length} != ${bank.questions.length}`);
  assert(new Set(bank.vary.map((item) => item.id)).size === bank.vary.length, "duplicate vary ids");
  for (const spec of bank.vary) {
    generators += 1;
    const published = bank.questions.find((question) => question.id === spec.id);
    assert(published !== undefined && ids.has(spec.id), `${spec.id} is not on the sheet`);
    if (!published) continue;
    const concept = spec.kind === "concept";
    assert(concept === (published.kind === "concept"), `${spec.id} kind mismatch`);
    const canonical = spec.draw(() => 0);
    assert(canonical.stem.prompt === published.prompt, `${spec.id} canonical prompt drifted`);
    assert(canonical.stem.promptEn === published.promptEn, `${spec.id} canonical English prompt drifted`);
    assert(canonical.stem.choices.join("\n") === published.choices.join("\n"), `${spec.id} canonical choices drifted`);
    assert(canonical.stem.choicesEn.join("\n") === published.choicesEn.join("\n"), `${spec.id} canonical English choices drifted`);
    if (!concept) {
      const canonicalAnswer = expectCorrect(spec.id, canonical.params);
      assert(canonicalAnswer.vi === published.choices[0], `${spec.id} oracle vi ${canonicalAnswer.vi} != ${published.choices[0]}`);
      assert(canonicalAnswer.en === published.choicesEn[0], `${spec.id} oracle en ${canonicalAnswer.en} != ${published.choicesEn[0]}`);
    }

    const prompts = new Set<string>();
    const answers = new Set<string>();
    let bad = 0;
    for (let seed = 1; seed <= SEEDS; seed += 1) {
      const draw = spec.draw(mulberry32(seed));
      const stem = draw.stem;
      prompts.add(stem.prompt);
      const label = `${spec.id}#${seed}`;
      if (concept) {
        answers.add(stem.choices[0]);
        if (stem.kind !== "concept") {
          assert(false, `${label} lost kind`);
          bad += 1;
        }
      } else {
        const expected = expectCorrect(spec.id, draw.params);
        if (stem.choices[0] !== expected.vi || stem.choicesEn[0] !== expected.en) {
          assert(false, `${label} answer ${stem.choices[0]} / ${stem.choicesEn[0]} != ${expected.vi} / ${expected.en}`);
          bad += 1;
        }
      }
      if (new Set(stem.choices).size !== 4 || new Set(stem.choicesEn).size !== 4) {
        assert(false, `${label} choices are not distinct: ${stem.choices.join(" | ")} || ${stem.choicesEn.join(" | ")}`);
        bad += 1;
      }
      const blobs = [stem.prompt, stem.promptEn, stem.hint, stem.hintEn, ...stem.choices, ...stem.choicesEn, ...stem.steps, ...stem.stepsEn];
      if (blobs.some((text) => text.length === 0 || /(?:^|[^a-zA-Z])(?:NaN|Infinity)(?:[^a-zA-Z]|$)/.test(text))) {
        assert(false, `${label} has an empty or non-finite value`);
        bad += 1;
      }
      if (Object.values(draw.params).some((value) => !Number.isFinite(value))) {
        assert(false, `${label} param is not finite`);
        bad += 1;
      }
      if (stem.steps.length !== 3 || stem.stepsEn.length !== 3) {
        assert(false, `${label} needs 3 steps`);
        bad += 1;
      }
      const vi = [stem.prompt, stem.hint, ...stem.steps].join(" ");
      if (!MARK.test(vi)) {
        assert(false, `${label} Vietnamese copy has no diacritics`);
        bad += 1;
      }
      if (blobs.some((blob) => checkTex(label, blob))) bad += 1;
      if (bad >= 3) break;
    }
    if (concept) {
      assert(prompts.size === 1, `${spec.id} concept prompt changed`);
      assert(answers.size > 1, `${spec.id} never changed the true statement`);
    } else if (spec.fixed) {
      assert(prompts.size === 1, `${spec.id} fixed question changed its prompt`);
    } else {
      assert(prompts.size > 1, `${spec.id} never changed its numbers`);
    }
  }
}

const posRng = mulberry32(20260323);
let prev: number | undefined;
const counts = [0, 0, 0, 0];
const STEPS = 8000;
for (let i = 0; i < STEPS; i += 1) {
  const pos = nextPos(prev, posRng);
  if (prev !== undefined && pos === prev) assert(false, `position repeated ${pos}`);
  const bin = counts[pos];
  if (bin === undefined) assert(false, `position ${pos} is outside 0–3`);
  else counts[pos] = bin + 1;
  prev = pos;
}
for (const count of counts) {
  const freq = count / STEPS;
  assert(Math.abs(freq - 0.25) <= 0.04, `position frequency ${freq} is outside 0.25 ± 0.04`);
}

const memory = new Map<string, string>();
Object.assign(globalThis, {
  sessionStorage: {
    getItem: (key: string) => memory.get(key) ?? null,
    setItem: (key: string, value: string) => {
      memory.set(key, value);
    },
    removeItem: (key: string) => {
      memory.delete(key);
    },
    clear: () => memory.clear(),
    key: () => null,
    get length() {
      return memory.size;
    },
  },
});
const sheet = [
  { id: "a" },
  { id: "b" },
  { id: "c" },
  { id: "d" },
  { id: "e" },
  { id: "f" },
];
const firstOrder = sessionQuestions("ineq", sheet).map((item) => item.id);
const secondOrder = sessionQuestions("ineq", sheet).map((item) => item.id);
assert(firstOrder.join() === secondOrder.join(), "a session keeps the question order");
assert([...firstOrder].sort().join() === "a,b,c,d,e,f", "the session order is a permutation");
let moved = false;
for (let i = 0; i < 8 && !moved; i += 1) {
  memory.delete("ban-toan-qorder:ineq");
  const again = sessionQuestions("ineq", sheet).map((item) => item.id);
  moved = again.join() !== firstOrder.join();
}
assert(moved, "a new session reshuffles the questions");

assert(generators === 141, `expected 141 generators, saw ${generators}`);

if (fails.length > 0) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log(`vary ok (${generators} generators, ${SEEDS} seeds)`);

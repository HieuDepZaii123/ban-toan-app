/**
 * Pins the numbers the three desks teach. Run with:
 *   node --experimental-strip-types scripts/check-math.ts
 */
import katex from "katex";
import { QUESTION_TOTAL, topics } from "../src/content/catalog.ts";
import { derivativeQuestions } from "../src/content/derivative.ts";
import { integralQuestions } from "../src/content/integral.ts";
import { limitQuestions } from "../src/content/limit.ts";
import { probabilityQuestions } from "../src/content/probability.ts";
import { quadraticQuestions } from "../src/content/quadratic.ts";
import { topicSummary } from "../src/content/summary.ts";
import { trigQuestions } from "../src/content/trig.ts";
import { quadText, vertexText } from "../src/lib/format.ts";
import {
  apex,
  archIntegral,
  archRiemann,
  archVolumeCoeff,
  bayes,
  betweenIntegral,
  binom,
  binomAtLeastOne,
  boysBothGivenOne,
  brakeMotion,
  brakeTimeFromDistance,
  comb,
  coneVolume,
  coolingTemp,
  cost,
  cubic,
  cubicSlope,
  diceCondition,
  fence,
  holeY,
  jumpStudy,
  projectile,
  quadStudy,
  rootsText,
  secantSlope,
  showSinCos,
  sinDeg,
  cosDeg,
  treeHeight,
} from "../src/lib/math.ts";
import { fold } from "../src/lib/text.ts";
import type { Question } from "../src/content/types.ts";

const fails: string[] = [];

function assert(cond: boolean, message: string): void {
  if (!cond) fails.push(message);
}

function near(actual: number, expected: number, message: string, eps = 1e-9): void {
  if (!Number.isFinite(actual) || Math.abs(actual - expected) > eps) {
    fails.push(`${message}: got ${actual}, want ${expected}`);
  }
}

const MARK = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const BARE = /\b(khong|duoc|dinh|nghiem|phuong trinh|ham so)\b/i;

function texOf(text: string): string[] {
  const out: string[] = [];
  const re = /\$([^$]+)\$/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) out.push(match[1] ?? "");
  return out;
}

function checkQuestion(q: Question, correct: string): void {
  const choices = [...q.choices];
  assert(new Set(choices).size === 4, `${q.id} choices are not unique`);
  assert(q.choices[q.answer] === correct, `${q.id} marked choice is ${q.choices[q.answer]}`);
  assert(q.steps.length === 3 && q.stepsEn.length === 3, `${q.id} needs 3 steps`);
  const vi = [q.prompt, q.hint, ...q.steps].join(" ");
  assert(MARK.test(vi), `${q.id} Vietnamese copy has no diacritics`);
  assert(!BARE.test(vi), `${q.id} has an undiacritised Vietnamese word`);
  for (const blob of [q.prompt, q.promptEn, q.hint, q.hintEn, ...q.choices, ...q.choicesEn, ...q.steps, ...q.stepsEn]) {
    for (const tex of texOf(blob)) {
      try {
        katex.renderToString(tex, { throwOnError: true });
      } catch (error) {
        fails.push(`${q.id} KaTeX: ${tex} (${error instanceof Error ? error.message : "fail"})`);
      }
    }
  }
}

const expected: Record<string, string> = {
  "quad-vertex": String.raw`$(1; -4)$`,
  "quad-roots": String.raw`$x = -1$ và $x = 3$`,
  "quad-range": String.raw`$(-\infty; 8]$`,
  "quad-fence": String.raw`$200\text{ m}^2$`,
  "quad-delta": "Parabol tiếp xúc trục Ox tại đúng một điểm",
  "quad-cost": String.raw`$3$ tại $x = 2$`,
  "trig-sin": String.raw`$\dfrac{1}{2}$`,
  "trig-cos": String.raw`$-\dfrac{\sqrt{3}}{2}$`,
  "trig-max": String.raw`$\sqrt{2}$`,
  "trig-tree": String.raw`$\dfrac{20\sqrt{3}}{3} + 1{,}5\text{ m}$`,
  "trig-id": String.raw`$1$`,
  "trig-point": String.raw`$(0;\ 1)$`,
  "deriv-slope": String.raw`$4$`,
  "deriv-secant": String.raw`$2 + h$`,
  "deriv-time": String.raw`$t = 2\text{ s}$`,
  "deriv-height": String.raw`$20\text{ m}$`,
  "deriv-cubic": String.raw`$x = -1$ và $x = 1$`,
  "deriv-interval": String.raw`$3$ tại $x = 3$`,
  "deriv-brake": String.raw`$50\text{ m}$`,
  "lim-hole": String.raw`$2$`,
  "lim-assign": String.raw`$2$`,
  "lim-jump": "Không tồn tại",
  "lim-cont": "Có, vì giới hạn bằng giá trị tại 1",
  "lim-tea": String.raw`$25^\circ\text{C}$`,
  "lim-sinc": String.raw`$1$`,
  "int-area": String.raw`$\dfrac{4}{3}$`,
  "int-sign": String.raw`$-\dfrac{4}{3}$`,
  "int-gap": String.raw`$\dfrac{1}{6}$`,
  "int-volume": String.raw`$\dfrac{16\pi}{15}$`,
  "int-riemann": String.raw`$2$`,
  "int-cone": String.raw`$18\pi\text{ cm}^3$`,
  "prob-dice": String.raw`$\dfrac{1}{11}$`,
  "prob-count": String.raw`$11$`,
  "prob-boys": String.raw`$\dfrac{1}{3}$`,
  "prob-bayes": String.raw`$\dfrac{1}{6}$`,
  "prob-binom": String.raw`$\dfrac{3}{8}$`,
  "prob-least": String.raw`$\dfrac{7}{8}$`,
};

assert(topics.length === 14, `topic count ${topics.length}`);
assert(topics.filter((topic) => topic.status === "ready").length === 6, "ready count");
assert(QUESTION_TOTAL === 37, `QUESTION_TOTAL ${QUESTION_TOTAL}`);

const banks = [
  ["quadratic", quadraticQuestions],
  ["trig", trigQuestions],
  ["limit", limitQuestions],
  ["derivative", derivativeQuestions],
  ["integral", integralQuestions],
  ["probability", probabilityQuestions],
] as const;

let counted = 0;
for (const [id, list] of banks) {
  const meta = topics.find((topic) => topic.id === id);
  assert(meta?.questions === list.length, `${id} catalog count ${meta?.questions} vs ${list.length}`);
  counted += list.length;
  for (const question of list) {
    const correct = expected[question.id];
    assert(correct !== undefined, `missing expected answer for ${question.id}`);
    if (correct) checkQuestion(question, correct);
  }
}
assert(counted === 37, `bank size ${counted}`);

const study = quadStudy(1, -2, -3);
near(study.delta, 16, "delta");
near(study.vertex?.x ?? NaN, 1, "vertex x");
near(study.vertex?.y ?? NaN, -4, "vertex y");
assert(study.roots.length === 2, "two roots");
near(study.roots[0] ?? NaN, -1, "root lo");
near(study.roots[1] ?? NaN, 3, "root hi");

const pen = fence(10);
near(pen.area, 200, "fence area");
near(pen.slope, 0, "fence slope");
near(pen.second, -4, "fence second");
near(fence(8).area, 192, "fence 8");
near(fence(8).slope, 8, "fence 8 slope");
near(cost(2), 3, "cost 2");
near(cost(4), 11, "cost 4");
near(cost(0), 11, "cost 0");

near(sinDeg(150), 0.5, "sin 150");
near(cosDeg(150), -Math.sqrt(3) / 2, "cos 150");
near(Math.sin(Math.PI / 4) + Math.cos(Math.PI / 4), Math.SQRT2, "sin+cos 45");
assert(showSinCos(45) === "√2", "show sin+cos");
near(treeHeight(20, 30), (20 * Math.sqrt(3)) / 3 + 1.5, "tree");

for (const h of [0, 0.5, 1, -0.25]) near(secantSlope(1, h), 2 + h, `secant ${h}`);

const top = apex(20);
near(top.t, 2, "apex t");
near(top.h, 20, "apex h");
const atOne = projectile(20, 1);
near(atOne.h, 15, "h(1) trap");
near(atOne.v, 10, "v(1) trap");

const stop = brakeMotion(5);
near(stop.s, 50, "brake s");
near(stop.v, 0, "brake v");
near(brakeTimeFromDistance(brakeMotion(2.5).s), 2.5, "brake roundtrip", 1e-9);
near(brakeTimeFromDistance(0), 0, "brake start");
near(brakeTimeFromDistance(50), 5, "brake end");

near(cubicSlope(-1), 0, "cubic slope -1");
near(cubicSlope(1), 0, "cubic slope 1");
near(cubic(-1), 2, "cubic max");
near(cubic(1), -2, "cubic min");
near(3 * 3 - 2 * 3, 3, "interval max y(3)");
near(1 - 2, -1, "interval min y(1)");
near(0, 0, "interval y(0)");

assert(quadText(1, -2, -3) === "y = x² − 2x − 3", `quadText ${quadText(1, -2, -3)}`);
assert(vertexText(1, 1, -4) === "y = (x − 1)² − 4", `vertex ${vertexText(1, 1, -4)}`);
assert(vertexText(-1, -2, 3) === "y = −(x + 2)² + 3", `vertex neg ${vertexText(-1, -2, 3)}`);
assert(rootsText(1, -2, -3, "vi") === "x = −1 và x = 3", `roots ${rootsText(1, -2, -3, "vi")}`);
assert(fold("Hàm số") === "ham so", "fold ham");
assert(fold("Đạo hàm") === "dao ham", "fold dao");

const height = derivativeQuestions.find((q) => q.id === "deriv-height");
assert(height?.choices[height.answer] === String.raw`$20\text{ m}$`, "apex is 20 m");
assert(!height?.choices[height.answer ?? 0]?.includes("15"), "apex choice is not 15");
const when = derivativeQuestions.find((q) => q.id === "deriv-time");
assert(when?.choices[when.answer]?.includes("2"), "apex time is 2");

const home = topicSummary("quadratic", undefined, "vi");
assert(home.includes("−4") || home.includes("-4"), `summary ${home}`);

near(holeY(1), 2, "hole limit");
near(holeY(0.5), 1.5, "hole nearby");
const jumped = jumpStudy(-1, 1, 0);
assert(!jumped.exists && !jumped.continuous, "jump has no limit");
const joined = jumpStudy(2, 2, 2);
assert(joined.exists && joined.continuous && joined.limit === 2, "matched jump is continuous");
near(coolingTemp(0), 85, "tea start");
near(coolingTemp(4), 25 + 60 / Math.E, "tea at 4");
assert(coolingTemp(80) < 25.1 && coolingTemp(80) > 25, "tea approaches 25");
near(Math.sin(1e-6) / 1e-6, 1, "sinc", 1e-8);

near(archIntegral(2), 4 / 3, "arch area");
near(archRiemann(1, 2), 2, "one strip");
near(archRiemann(24, 2), 4 / 3, "many strips", 0.01);
near(betweenIntegral(1), 1 / 6, "between curves");
near(archVolumeCoeff(2), 16 / 15, "volume coeff");
near(coneVolume(3, 6) / Math.PI, 18, "cone");
near(archIntegral(2) + archIntegral(-0) , 4 / 3, "signed companion");
near(-(archIntegral(2)), -4 / 3, "signed integral");

const dice = diceCondition(6);
assert(dice.remain === 11 && dice.both === 1, `dice ${dice.remain}`);
assert(diceCondition(1).remain === 11, "any face leaves 11");
const boys = boysBothGivenOne();
assert(boys.remain === 3 && boys.both === 1, "boys 1/3");
const test = bayes(1, 99, 5);
near(test.tp, 99, "true positives");
near(test.fp, 495, "false positives");
near(test.posterior, 1 / 6, "bayes posterior");
assert(comb(3, 2) === 3, "comb");
near(binom(3, 2, 0.5), 3 / 8, "binom");
near(binomAtLeastOne(3, 0.5), 7 / 8, "at least one");
near(binom(3, 2, 0.5) - 1 / 8, 2 / 8, "one sequence is not the event");

const limitSummary = topicSummary("limit", undefined, "vi");
assert(limitSummary.includes("2"), `limit summary ${limitSummary}`);
const chanceSummary = topicSummary("probability", undefined, "vi");
assert(chanceSummary.includes("11"), `chance summary ${chanceSummary}`);

const volume = integralQuestions.find((q) => q.id === "int-volume");
assert(volume?.choices[0]?.includes("16"), "volume choice keeps 16π/15");
assert(!volume?.choices[volume.answer]?.includes("4\\pi}{3}"), "volume answer is not the area times π");
const bayesQ = probabilityQuestions.find((q) => q.id === "prob-bayes");
assert(bayesQ?.choices[bayesQ.answer] === String.raw`$\dfrac{1}{6}$`, "bayes answer is 1/6");
assert(bayesQ?.choices.some((choice) => choice.includes("99")), "bayes keeps the sensitivity distractor");

if (fails.length) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log("math ok:", counted, "questions,", topics.length, "topics");

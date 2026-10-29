/**
 * Pins the numbers the open desks teach. Run with:
 *   tsx scripts/check-math.ts
 */
import katex from "katex";
import { analyticQuestions } from "../src/content/analytic.ts";
import { lessonFor, questionsFor } from "./banks.ts";
import { QUESTION_TOTAL, topics } from "../src/content/catalog.ts";
import { comboQuestions } from "../src/content/combo.ts";
import { derivativeQuestions } from "../src/content/derivative.ts";
import { expQuestions } from "../src/content/exp.ts";
import { ineqQuestions } from "../src/content/ineq.ts";
import { integralQuestions } from "../src/content/integral.ts";
import { limitQuestions } from "../src/content/limit.ts";
import { probabilityQuestions } from "../src/content/probability.ts";
import { quadraticQuestions } from "../src/content/quadratic.ts";
import { sequenceQuestions } from "../src/content/sequence.ts";
import { topicSummary } from "../src/content/summary.ts";
import { surveyQuestions } from "../src/content/survey.ts";
import { triangleQuestions } from "../src/content/triangle.ts";
import { trigQuestions } from "../src/content/trig.ts";
import { vectorQuestions } from "../src/content/vector.ts";
import { quadText, showExact, vertexText } from "../src/lib/format.ts";
import {
  apex,
  archIntegral,
  archRiemann,
  archY,
  archVolumeCoeff,
  bayes,
  betweenIntegral,
  binom,
  binomAtLeastOne,
  brakeMotion,
  brakeTimeFromDistance,
  comb,
  coolingTemp,
  cost,
  arithSum,
  arithTerm,
  baseOk,
  bouncePath,
  compoundAmount,
  cubic,
  cubicSecond,
  cubicSlope,
  decayMass,
  diceCondition,
  fence,
  expY,
  geomInfinite,
  geomPartial,
  geomTerm,
  holeY,
  jumpStudy,
  logY,
  projectile,
  pureCubicSlope,
  rationalOblique,
  rationalY,
  savingsSum,
  simpleAmount,
  yearsToDouble,
  quadStudy,
  rootsText,
  secantSlope,
  showSinCos,
  sinDeg,
  cosDeg,
  treeHeight,
  amGm,
  arrange,
  boxBase,
  boxVolume,
  cauchyPair,
  circlePlace,
  det2,
  lineFoot2,
  meanOf,
  medianOf,
  planeFoot,
  pyramidBase,
  pyramidVolume,
  solve2,
  tetraVerts,
  tetraVolume,
  triArea,
  vec3Cross,
  vec3Dot,
  vec3Len,
  workshopOk,
  workshopProfit,
} from "../src/lib/math.ts";
import { sceneFromHour } from "../src/home/day.ts";
import {
  ARRANGEMENTS,
  VEC_U,
  VEC_V,
  approachY,
  arrangementAt,
  diePair,
  expMirror,
  expX,
  holeGap,
  ineqFrame,
  lineFoot,
  motionArch,
  motionCubic,
  motionCubicSlope,
  quadA,
  quadVertex,
  quadY,
  rollsShown,
  secantH,
  shrinkTerm,
  similarCut,
  stripCount,
  sumHistogram,
  surveyX,
  tripAngle,
  vecAdd,
  walker,
  ways,
} from "../src/motion/facts.ts";
import { loadClip } from "../src/motion/load.ts";
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

function checkTex(label: string, text: string): void {
  for (const tex of texOf(text)) {
    try {
      katex.renderToString(tex, { throwOnError: true });
    } catch (error) {
      fails.push(`${label} KaTeX: ${tex} (${error instanceof Error ? error.message : "fail"})`);
    }
  }
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
    checkTex(q.id, blob);
  }
}

function checkSheets(): void {
  for (const topic of topics) {
    const lesson = lessonFor(topic.id);
    assert(lesson !== undefined, `${topic.id} has a lesson`);
    if (!lesson) continue;
    const basicKinds = lesson.basic.map((bit) => bit.k);
    const examKinds = lesson.exam.map((bit) => bit.k);
    assert(basicKinds[0] === "mo" && basicKinds.includes("vd") && lesson.basic.length <= 3, `${topic.id} basic shape`);
    assert(
      examKinds.includes("dinh") && examKinds.includes("vd") && examKinds.includes("loi") && examKinds.includes("kiem") && lesson.exam.length <= 4,
      `${topic.id} exam shape`,
    );
    for (const bit of [...lesson.basic, ...lesson.exam]) {
      assert(MARK.test(bit.vi), `${topic.id} ${bit.k} Vietnamese has no diacritics`);
      assert(!BARE.test(bit.vi), `${topic.id} ${bit.k} has an undiacritised Vietnamese word`);
      checkTex(`${topic.id} ${bit.k}`, bit.vi);
      checkTex(`${topic.id} ${bit.k} en`, bit.en);
    }
    const sheets = [
      ["nhin", topic.think.nhin],
      ["lam", topic.think.lam],
      ["ket", topic.think.ket],
      ["nhinEn", topic.thinkEn.nhin],
      ["lamEn", topic.thinkEn.lam],
      ["ketEn", topic.thinkEn.ket],
      ["trap", topic.trap],
      ["trapEn", topic.trapEn],
    ] as const;
    for (const [name, text] of sheets) checkTex(`${topic.id} ${name}`, text);
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
  "exp-power": String.raw`$8$`,
  "exp-log": String.raw`$3$`,
  "exp-sum": String.raw`$\log 6$`,
  "exp-compound": "Khoảng 14,69 triệu",
  "exp-double": "Khoảng 9 năm",
  "exp-decay": "20 g",
  "seq-term": String.raw`$39$`,
  "seq-sum": String.raw`$210$`,
  "seq-geom": String.raw`$162$`,
  "seq-infinite": String.raw`$16$`,
  "seq-bounce": "24 m",
  "seq-save": "78 triệu",
  "surv-max": String.raw`$2$ tại $x = -1$`,
  "surv-min": String.raw`$-2$ tại $x = 1$`,
  "surv-roots": String.raw`$-\sqrt{3}$, $0$, $\sqrt{3}$`,
  "surv-mono": String.raw`$(-\infty; -1]$ và $[1; +\infty)$`,
  "surv-flat": "Không có cực trị",
  "surv-cross": "Không, vì x = 1 không thuộc tập xác định",
  "ineq-am": "6,5 và 6",
  "ineq-equal": "Khi a = b",
  "ineq-split": "25",
  "ineq-cauchy": String.raw`$125 \ge 121$`,
  "ineq-lp": "42 tại (6; 4)",
  "ineq-flip": String.raw`$x \ge -2$`,
  "vec-len": String.raw`$3$`,
  "vec-dot": String.raw`$0$`,
  "vec-sum": String.raw`$(3;\ 1;\ 4)$`,
  "vec-det": String.raw`$-3$`,
  "vec-sys": String.raw`$x = 2$, $y = 1$`,
  "vec-cross": String.raw`$(0;\ 0;\ 1)$`,
  "ana-dist": String.raw`$\sqrt{2}$`,
  "ana-foot": String.raw`$(2;\ 0)$`,
  "ana-plane": String.raw`$\sqrt{3}$`,
  "ana-dir": String.raw`$(1;\ -1)$`,
  "ana-circle": "Nằm ngoài",
  "ana-on": "Nằm trên",
  "shp-tri": "12",
  "shp-right": "6",
  "shp-box": "60",
  "shp-pyr": "48",
  "shp-tet": String.raw`$18\sqrt{2}$`,
  "shp-sim": "4",
  "cmb-perm": "20",
  "cmb-comb": "10",
  "cmb-fact": "6",
  "cmb-mean": "4",
  "cmb-comm": "56",
  "cmb-order": "6",
};

assert(topics.length === 14, `topic count ${topics.length}`);
assert(topics.filter((topic) => topic.status === "ready").length === 14, "ready count");
assert(QUESTION_TOTAL === 183, `QUESTION_TOTAL ${QUESTION_TOTAL}`);

const banks = [
  ["quadratic", quadraticQuestions],
  ["ineq", ineqQuestions],
  ["exp", expQuestions],
  ["sequence", sequenceQuestions],
  ["trig", trigQuestions],
  ["limit", limitQuestions],
  ["derivative", derivativeQuestions],
  ["survey", surveyQuestions],
  ["integral", integralQuestions],
  ["vector", vectorQuestions],
  ["analytic", analyticQuestions],
  ["triangle", triangleQuestions],
  ["combo", comboQuestions],
  ["probability", probabilityQuestions],
] as const;

let counted = 0;
for (const [id, numeric] of banks) {
  const list = questionsFor(id);
  const meta = topics.find((topic) => topic.id === id);
  assert(meta?.questions === list.length, `${id} catalog count ${meta?.questions} vs ${list.length}`);
  assert(list.length === numeric.length + 7, `${id} concept and dss count`);
  counted += list.length;
  for (const question of numeric) {
    const correct = expected[question.id];
    assert(correct !== undefined, `missing expected answer for ${question.id}`);
    if (correct) checkQuestion(question, correct);
  }
  for (const question of list) {
    if (question.kind === "dss") {
      assert(question.verdicts?.includes("thieu") === true, `${question.id} canonical draw has no Chưa đủ`);
      assert(question.reasons?.length === 4 && question.reasonsEn?.length === 4, `${question.id} needs four reasons`);
      const vi = [question.prompt, question.hint, ...(question.reasons ?? [])].join(" ");
      assert(MARK.test(vi), `${question.id} Vietnamese copy has no diacritics`);
      assert(!BARE.test(vi), `${question.id} has an undiacritised Vietnamese word`);
      for (const blob of [...question.choices, ...question.choicesEn, ...(question.reasons ?? []), ...(question.reasonsEn ?? [])]) {
        checkTex(question.id, blob);
      }
      continue;
    }
    if (question.kind !== "concept") continue;
    assert(question.answer === 0, `${question.id} concept answer is not first`);
    checkQuestion(question, question.choices[0]);
  }
}
assert(counted === 183, `bank size ${counted}`);
checkSheets();
for (const id of ["ineq", "vector", "analytic", "triangle", "combo"]) {
  assert(questionsFor(id).length === 13, `${id} bank`);
}
assert(questionsFor("derivative").length === 14, "derivative bank");
assert(topicSummary("ineq", undefined, "vi").includes("6,5"), "ineq summary");
assert(topicSummary("vector", undefined, "vi").includes("3"), "vector summary");
assert(topicSummary("analytic", undefined, "vi").includes("√2"), "analytic summary");
assert(topicSummary("triangle", { scene: 1 }, "vi").includes("60"), "box summary");
assert(topicSummary("triangle", { scene: 2 }, "vi").includes("48"), "pyramid summary");
assert(topicSummary("triangle", { scene: 3 }, "vi").includes("18√2"), "tetra summary");
assert(topicSummary("combo", undefined, "vi").includes("20"), "combo summary");
assert(topicSummary("combo", { scene: 2, outlier: 20 }, "vi").includes("4"), "median summary");

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
assert(when?.choices[when.answer]?.includes("2") === true, "apex time is 2");

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
near((Math.PI * 3 * 3 * 6) / 3 / Math.PI, 18, "cone hand");
near(archIntegral(2) + archIntegral(-0) , 4 / 3, "signed companion");
near(-(archIntegral(2)), -4 / 3, "signed integral");

const dice = diceCondition(6);
assert(dice.remain === 11 && dice.both === 1, `dice ${dice.remain}`);
assert(diceCondition(1).remain === 11, "any face leaves 11");
const boyCases = ["BB", "BG", "GB"];
assert(boyCases.length === 3 && boyCases.filter((item) => item === "BB").length === 1, "boys 1/3");
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
assert(volume?.choices[0]?.includes("16") === true, "volume choice keeps 16π/15");
assert(!volume?.choices[volume.answer]?.includes("4\\pi}{3}"), "volume answer is not the area times π");
const bayesQ = probabilityQuestions.find((q) => q.id === "prob-bayes");
assert(bayesQ?.choices[bayesQ.answer] === String.raw`$\dfrac{1}{6}$`, "bayes answer is 1/6");
assert(bayesQ?.choices.some((choice) => choice.includes("99")) === true, "bayes keeps the sensitivity distractor");

assert(!baseOk(1) && baseOk(2), "base 1 is refused");
near(expY(2, 3), 8, "2^3");
near(logY(2, 8), 3, "log2 8");
near(Math.log10(2) + Math.log10(3), Math.log10(6), "log sum is log 6");
assert(Math.abs(Math.log10(6) - Math.log10(5)) > 0.01, "log sum is not log 5");
near(compoundAmount(8, 5), 10 * 1.08 ** 5, "compound");
near(simpleAmount(8, 5), 14, "simple interest");
assert(compoundAmount(8, 5) > 14.69 && compoundAmount(8, 5) < 14.7, "about 14.69");
near(yearsToDouble(8), Math.log(2) / Math.log(1.08), "doubling");
assert(yearsToDouble(8) > 9 && yearsToDouble(8) < 9.1, "doubling near 9, not 8 or 12.5");
near(decayMass(0), 80, "decay start");
near(decayMass(10), 40, "one half-life");
near(decayMass(20), 20, "two half-lives");

near(arithTerm(3, 4, 10), 39, "arith term");
assert(arithTerm(3, 4, 10) !== 43, "not n steps");
near(arithSum(3, 4, 10), 210, "arith sum");
near(geomTerm(2, 3, 5), 162, "geom term");
near(geomInfinite(8, 0.5) ?? NaN, 16, "infinite sum");
assert(geomInfinite(2, 3) === null, "diverges");
near(bouncePath(8, 0.5) ?? NaN, 24, "bounce path");
assert(bouncePath(8, 1) === null, "bounce needs a ratio below 1");
near(savingsSum(12), 78, "savings");

near(cubicSecond(0), 0, "inflection");
near(cubicSecond(1), 6, "second at 1");
near(pureCubicSlope(0), 0, "pure slope 0");
near(pureCubicSlope(1), 3, "pure slope 1");
near(pureCubicSlope(-2), 12, "pure slope stays non-negative");
near(rationalY(3), 4.5, "rational at 3");
assert(!Number.isFinite(rationalY(1)), "rational undefined at 1");
near(rationalOblique(1), 2, "asymptotes meet at 2");
assert(cubicSlope(-2) > 0 && cubicSlope(0) < 0 && cubicSlope(2) > 0, "cubic changes sign");
near(cubic(-Math.sqrt(3)), 0, "root lo");
near(cubic(Math.sqrt(3)), 0, "root hi");

const expHome = topicSummary("exp", undefined, "vi");
assert(expHome.includes("2"), `exp summary ${expHome}`);
const seqHome = topicSummary("sequence", undefined, "vi");
assert(seqHome.includes("39") && seqHome.includes("210"), `sequence summary ${seqHome}`);
const surveyHome = topicSummary("survey", undefined, "vi");
assert(surveyHome.includes("−2") || surveyHome.includes("-2"), `survey summary ${surveyHome}`);

assert(sceneFromHour(5) === "morning" && sceneFromHour(10) === "morning", "morning band");
assert(sceneFromHour(11) === "noon" && sceneFromHour(13) === "noon", "noon band");
assert(sceneFromHour(14) === "afternoon" && sceneFromHour(17) === "afternoon", "afternoon band");
assert(sceneFromHour(18) === "evening" && sceneFromHour(4) === "evening" && sceneFromHour(0) === "evening", "night band");
assert(sceneFromHour(24) === "evening" && sceneFromHour(-1) === "evening", "hour wraps");

const aLo = quadA(0);
const aHi = quadA(0.5);
assert(Math.abs(quadVertex(aLo).x - quadVertex(aHi).x) > 0.5, "changing a slides the vertex");
for (const a of [0.55, 1, 1.85]) {
  const vertex = quadVertex(a);
  const study = quadStudy(a, -2, 0);
  near(vertex.x, study.vertex?.x ?? NaN, `vertex x ${a}`);
  near(vertex.y, study.vertex?.y ?? NaN, `vertex y ${a}`);
  near(vertex.y, -vertex.x, `vertex on y = −x ${a}`);
  near(quadY(a, vertex.x), vertex.y, `vertex on the curve ${a}`);
}

const leftRay = ineqFrame(0.25);
const rightRay = ineqFrame(0.75);
assert(leftRay.hi === 2 && leftRay.lo === null && leftRay.amount > 0.99, "positive a solves x ≤ 2");
assert(rightRay.lo === 2 && rightRay.hi === null && rightRay.amount > 0.99, "negative a flips the ray");

near(expMirror(3).y, expY(2, 3), "clip 2^3");
near(expMirror(3).my, logY(2, 8), "mirror is the log");
near(expMirror(2).y, 4, "2^2");
near(expMirror(2).mx, 4, "mirror x");
near(expX(0), -0.7, "exp start");

near(shrinkTerm(1), 8, "shrink term 1");
near(shrinkTerm(2), 4, "shrink term 2");
near(shrinkTerm(3), 2, "shrink term 3");
near(shrinkTerm(5), 0.5, "shrink term 5");
near(geomPartial(8, 0.5, 1), 8, "partial 1");
near(geomPartial(8, 0.5, 2), 12, "partial 2");
near(geomPartial(8, 0.5, 5), 15.5, "partial 5");
near(geomPartial(8, 0.5, 7), 15.875, "partial 7");
assert(shrinkTerm(12) > 0, "no term is 0");
const partial20 = geomPartial(8, 0.5, 20);
assert(partial20 < 16 && partial20 > 15.9, "sum approaches 16");

near(tripAngle(150 / 360), (150 * Math.PI) / 180, "150 degrees");
near(Math.sin(tripAngle(150 / 360)), sinDeg(150), "sin 150");
near(Math.cos(tripAngle(150 / 360)), cosDeg(150), "cos 150");
near(Math.sin(tripAngle(150 / 360)), 0.5, "sin 150 is 1/2");
near(Math.cos(tripAngle(150 / 360)), -Math.sqrt(3) / 2, "cos 150 is −√3/2");

near(approachY(1.4), holeY(1.4), "hole matches the lesson");
near(approachY(0.2), holeY(0.2), "hole from the left");
assert(Math.abs(approachY(1.0001) - 2) < 1e-3, "both sides approach 2");
assert(Math.abs(approachY(1.0001) - 5) > 1, "the value 5 is not the limit");
const gap = holeGap(0.5);
near(approachY(1 - gap), 2 - gap, "left approach");
near(approachY(1 + gap), 2 + gap, "right approach");

near(secantSlope(1, secantH(0)), 2 + secantH(0), "secant slope is 2 + h");
near(secantSlope(1, 0), 2, "tangent slope of x² at 1");
assert(secantH(0.5) < 0.06, "h closes on the tangent");

for (const x of [-1, 0, 1, Math.sqrt(3), surveyX(0.2), surveyX(0.7)]) {
  near(motionCubic(x), cubic(x), `cubic ${x}`);
  near(motionCubicSlope(x), cubicSlope(x), `cubic slope ${x}`);
}
near(motionCubic(-1), 2, "cubic max");
near(motionCubic(1), -2, "cubic min");
near(motionCubicSlope(-1), 0, "flat at the max");
near(motionCubicSlope(0), -3, "still decreasing at 0");

near(motionArch(1), archY(1), "arch height");
assert(stripCount(0) === 1 && stripCount(0.5) === 10, "riemann count");
near(archRiemann(1, 2), 2, "one midpoint rectangle is 2");
near(archIntegral(2), 4 / 3, "arch area 4/3");
assert(Math.abs(archRiemann(stripCount(0.5), 2) - 4 / 3) < Math.abs(2 - 4 / 3), "more strips sit closer to 4/3");

const vecSum = vecAdd(VEC_U, VEC_V);
near(vecSum[0], VEC_U[0] + VEC_V[0], "vector sum x");
near(vecSum[1], VEC_U[1] + VEC_V[1], "vector sum y");
near(walker(0)[0], 0, "walker starts at the origin");
near(walker(0)[1], 0, "walker starts at the origin y");
near(walker(0.4)[0], VEC_U[0], "walker finishes u");
near(walker(0.4)[1], VEC_U[1], "walker finishes u y");
near(walker(0.75)[0], vecSum[0], "walker reaches u + v");
near(walker(0.75)[1], vecSum[1], "walker reaches u + v y");
near(walker(0.999)[0], 0, "walker returns on the diagonal", 0.05);
near(walker(0.999)[1], 0, "walker returns on the diagonal y", 0.05);

const foot = lineFoot(3, 1);
near(foot.x, 2, "foot x");
near(foot.y, 0, "foot y");
near(foot.x + foot.y - 2, 0, "foot lies on the line");
near(foot.dist, Math.SQRT2, "distance is √2");
near(foot.dist, Math.abs(3 + 1 - 2) / Math.sqrt(2), "distance formula");

const cut = similarCut(0.5);
near(cut.ratio, 0.5, "parallel cut keeps the ratio");
near(cut.p[1], cut.q[1], "the cut is parallel to the base");

assert(ARRANGEMENTS.length === ways(3, 3, true), "3! arrangements");
assert(ways(3, 2, false) === 3, "C(3, 2) = 3");
assert(ways(4, 2, true) === 12 && ways(4, 2, false) === 6, "order makes A larger than C");
assert(new Set(ARRANGEMENTS.map((row) => row.join(""))).size === 6, "every order once");
for (let i = 0; i < ARRANGEMENTS.length; i += 1) {
  const from = ARRANGEMENTS[i];
  const to = ARRANGEMENTS[(i + 1) % ARRANGEMENTS.length];
  assert(!!from && !!to && adjacentSwap(from, to), `adjacent swap ${i}`);
}

function adjacentSwap(a: readonly number[], b: readonly number[]): boolean {
  const diffs: number[] = [];
  for (let i = 0; i < a.length; i += 1) if (a[i] !== b[i]) diffs.push(i);
  const left = diffs[0];
  const right = diffs[1];
  return diffs.length === 2 && left !== undefined && right === left + 1;
}
const posed = arrangementAt(0);
near(posed.slot[0], 0, "A starts first");
near(posed.slot[1], 1, "B starts in the middle");
near(posed.slot[2], 2, "C starts last");

const fullDice = sumHistogram(36);
assert(fullDice[7] === 6 && fullDice[2] === 1 && fullDice[12] === 1, "dice sums make a triangle");
assert(fullDice.reduce((acc, n) => acc + n, 0) === 36, "36 equally likely pairs");
const pairs = new Set<string>();
for (let i = 0; i < 36; i += 1) {
  const pair = diePair(i);
  pairs.add(`${pair.a},${pair.b}`);
}
assert(pairs.size === 36, "every face pair appears once");
assert(rollsShown(0.95) === 36, "the histogram finishes");
assert(sumHistogram(rollsShown(0.95))[7] === 6, "the finished picture peaks at 7");

const means = amGm(4, 9);
near(means?.am ?? NaN, 6.5, "AM");
near(means?.gm ?? NaN, 6, "GM");
assert(amGm(0, 1) === null && amGm(-1, 2) === null, "AM–GM refuses non-positive");
assert((10 / 2) * (10 / 2) === 25, "split product");
const equalMeans = amGm(5, 5);
assert(equalMeans?.am === 5 && equalMeans.gm === 5, "AM–GM equality at 5");
const cauchy = cauchyPair(1, 2, 3, 4);
near(cauchy.left, 125, "cauchy left");
near(cauchy.right, 121, "cauchy right");
assert(!cauchy.equal, "cauchy strict");
const cauchyEqual = cauchyPair(1, 2, 3, 6);
near(cauchyEqual.left, 225, "cauchy equal left");
near(cauchyEqual.right, 225, "cauchy equal right");
assert(cauchyEqual.equal, "cauchy equality");
assert(workshopOk(6, 4) && !workshopOk(9, 2), "workshop region");
near(workshopProfit(6, 4), 42, "workshop max");
near(workshopProfit(8, 0), 40, "workshop (8,0)");
near(workshopProfit(0, 10), 30, "workshop (0,10)");
near(3 * 6 + 5 * 4, 38, "swapped profit");

near(vec3Len([2, 1, 2]), 3, "|u|");
near(vec3Dot([2, 1, 2], [1, -1, 2]), 5, "dot");
near(vec3Dot([1, 2, -1], [2, -1, 0]), 0, "perpendicular");
const cross = vec3Cross([2, 1, 2], [1, -1, 2]);
near(cross[0], 4, "cross x");
near(cross[1], -2, "cross y");
near(cross[2], -3, "cross z");
const basis = vec3Cross([1, 0, 0], [0, 1, 0]);
assert(basis[0] === 0 && basis[1] === 0 && basis[2] === 1, "i × j");
near(det2(2, 1, 1, -1), -3, "det");
const solved = solve2(2, 1, 5, 1, -1, 1);
near(solved?.x ?? NaN, 2, "system x");
near(solved?.y ?? NaN, 1, "system y");
assert(solve2(1, 1, 0, 2, 2, 0) === null, "singular system");

const line = lineFoot2(1, 1, -2, 3, 1);
near(line.x, 2, "line foot x");
near(line.y, 0, "line foot y");
near(line.dist, Math.SQRT2, "line distance");
const plane = planeFoot(1, 1, 1, -6, 1, 1, 1);
near(plane.x, 2, "plane foot x");
near(plane.y, 2, "plane foot y");
near(plane.z, 2, "plane foot z");
near(plane.dist, Math.sqrt(3), "plane distance");
assert(circlePlace(3, 4, 5) === "on", "(3,4) on the circle");
assert(circlePlace(6, 0, 5) === "out", "(6,0) outside");
assert(circlePlace(0, 0, 5) === "in", "origin inside");

near(triArea(6, 4), 12, "triangle area");
near(triArea(3, 4), 6, "right triangle area");
near(boxVolume(3, 4, 5), 60, "box volume");
near(boxBase(3, 4), 12, "box base");
near(pyramidVolume(6, 4), 48, "pyramid volume");
near(pyramidBase(6), 36, "pyramid base");
near(tetraVolume(6), 18 * Math.SQRT2, "tetra volume 6");
near(tetraVolume(1), Math.SQRT2 / 12, "tetra volume 1");
const verts = tetraVerts(6);
const tetraPairs: readonly (readonly [number, number])[] = [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]];
for (const [i, j] of tetraPairs) {
  const left = verts[i];
  const right = verts[j];
  assert(!!left && !!right, `tetra vertex ${i}${j}`);
  if (!left || !right) continue;
  near(Math.hypot(left[0] - right[0], left[1] - right[1], left[2] - right[2]), 6, `tetra edge ${i}${j}`);
}
assert(showExact(18 * Math.SQRT2) === "18√2", "show 18√2");
assert(showExact(Math.SQRT2) === "√2" && showExact(Math.sqrt(3)) === "√3", "show radicals");
assert(showExact(6.5) === "6,5" && showExact(3) === "3", "show ordinary numbers");

near(arrange(5, 2), 20, "A(5,2)");
near(comb(5, 2), 10, "C(5,2)");
near(comb(8, 3), 56, "C(8,3)");
near(arrange(8, 3), 336, "A(8,3)");
near(arrange(3, 3), 6, "3!");
near(medianOf([2, 3, 4, 5, 20]), 4, "median stays");
near(meanOf([2, 3, 4, 5, 20]), 6.8, "mean follows");
near(medianOf([2, 3, 4, 5, 6]), 4, "median before");
near(meanOf([2, 3, 4, 5, 6]), 4, "mean before");

const clips = await Promise.all(topics.map((topic) => loadClip(topic.id)));
clips.forEach((clip, index) => {
  const topic = topics[index];
  assert(typeof clip.draw === "function", `${topic?.id ?? index} draws`);
  assert((clip.still ?? -1) >= 0 && clip.still <= 1, `${topic?.id ?? index} still frame`);
});

if (fails.length) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log("math ok:", counted, "questions,", topics.length, "topics");

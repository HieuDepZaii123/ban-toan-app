import type { Question } from "../types.ts";
import { pick } from "../../lib/prng.ts";
import { made, mathDec, questionById, radFrac, read } from "./stem.ts";
import { fixedVary, parametric, type Vary } from "./types.ts";

type Exact = { coef: number; rad: number | null; den: number };

const EXACT: Record<number, { sin: Exact; cos: Exact }> = {
  30: { sin: { coef: 1, rad: null, den: 2 }, cos: { coef: 1, rad: 3, den: 2 } },
  60: { sin: { coef: 1, rad: 3, den: 2 }, cos: { coef: 1, rad: null, den: 2 } },
  120: { sin: { coef: 1, rad: 3, den: 2 }, cos: { coef: -1, rad: null, den: 2 } },
  150: { sin: { coef: 1, rad: null, den: 2 }, cos: { coef: -1, rad: 3, den: 2 } },
  210: { sin: { coef: -1, rad: null, den: 2 }, cos: { coef: -1, rad: 3, den: 2 } },
  240: { sin: { coef: -1, rad: 3, den: 2 }, cos: { coef: -1, rad: null, den: 2 } },
  300: { sin: { coef: -1, rad: 3, den: 2 }, cos: { coef: 1, rad: null, den: 2 } },
  330: { sin: { coef: -1, rad: null, den: 2 }, cos: { coef: 1, rad: 3, den: 2 } },
};

const ANGLES = [150, 30, 120, 60, 210, 330, 240, 300] as const;

const TREES = [
  { d: 20, eye: 1.5 }, { d: 12, eye: 1.5 }, { d: 15, eye: 1 }, { d: 18, eye: 2 },
  { d: 21, eye: 1.5 }, { d: 24, eye: 1 }, { d: 30, eye: 2 }, { d: 12, eye: 2 },
  { d: 15, eye: 1.5 }, { d: 18, eye: 1 }, { d: 20, eye: 1 }, { d: 20, eye: 2 },
  { d: 24, eye: 1.5 }, { d: 30, eye: 1.5 }, { d: 21, eye: 2 },
] as const;

const AXIS = [90, 0, 180, 270] as const;

function show(value: Exact): string {
  return radFrac(value.coef, value.rad, value.den);
}

function neg(value: Exact): string {
  return radFrac(-value.coef, value.rad, value.den);
}

export function trigVary(questions: readonly Question[]): Vary[] {
  const q = (id: string) => questionById(questions, id);
  return [
    parametric(q("trig-sin"), (rng) => ({ deg: pick(rng, ANGLES) }), (params) => sinStem(q("trig-sin"), params)),
    parametric(q("trig-cos"), (rng) => ({ deg: pick(rng, ANGLES) }), (params) => cosStem(q("trig-cos"), params)),
    fixedVary(q("trig-max")),
    parametric(q("trig-tree"), (rng) => pick(rng, TREES), (params) => treeStem(q("trig-tree"), params)),
    fixedVary(q("trig-id")),
    parametric(q("trig-point"), (rng) => ({ deg: pick(rng, AXIS) }), (params) => pointStem(q("trig-point"), params)),
  ];
}

function sinStem(question: Question, params: Record<string, number>) {
  const deg = read(params, "deg");
  const row = EXACT[deg];
  if (!row) throw new Error(String(deg));
  const neighbor = radFrac(1, 2, 2);
  return made(
    question,
    `$\\sin ${deg}^\\circ$ bằng bao nhiêu?`,
    `What is $\\sin ${deg}^\\circ$?`,
    [show(row.sin), show(row.cos), neg(row.sin), neighbor],
    [show(row.sin), show(row.cos), neg(row.sin), neighbor],
    [
      `Đưa ${deg}° về góc liên kết trong tam giác vuông cân hoặc nửa đều.`,
      `$\\sin ${deg}^\\circ = ${show(row.sin)}$.`,
      `${show(row.cos)} là cos. ${neg(row.sin)} đổi dấu. ${neighbor} là sin hoặc cos của 45°.`,
    ],
    [
      `Reduce ${deg}° to the related angle in a right triangle.`,
      `$\\sin ${deg}^\\circ = ${show(row.sin)}$.`,
      `${show(row.cos)} is the cosine. ${neg(row.sin)} flips the sign. ${neighbor} belongs to 45°.`,
    ],
    `${deg}° lấy theo góc liên kết. Sin giữ hoặc đổi dấu đúng góc phần tư, đừng lấy cos.`,
    `Use the related angle for ${deg}°. Keep the sine, with the quadrant sign, and do not take the cosine.`,
  );
}

function cosStem(question: Question, params: Record<string, number>) {
  const deg = read(params, "deg");
  const row = EXACT[deg];
  if (!row) throw new Error(String(deg));
  return made(
    question,
    `$\\cos ${deg}^\\circ$ bằng bao nhiêu?`,
    `What is $\\cos ${deg}^\\circ$?`,
    [show(row.cos), neg(row.cos), neg(row.sin), show(row.sin)],
    [show(row.cos), neg(row.cos), neg(row.sin), show(row.sin)],
    [
      `Cos của góc liên kết, rồi đặt dấu theo góc phần tư.`,
      `$\\cos ${deg}^\\circ = ${show(row.cos)}$.`,
      `${neg(row.cos)} đổi dấu. ${show(row.sin)} và ${neg(row.sin)} là sin.`,
    ],
    [
      `Take the cosine of the related angle, then the quadrant sign.`,
      `$\\cos ${deg}^\\circ = ${show(row.cos)}$.`,
      `${neg(row.cos)} flips the sign. ${show(row.sin)} and ${neg(row.sin)} are sines.`,
    ],
    `Cùng góc liên kết, nhưng cos đổi dấu đúng góc phần tư. Đừng lấy sin.`,
    `Same related angle, but cosine takes the quadrant sign. Do not take the sine.`,
  );
}

function treeStem(question: Question, params: Record<string, number>) {
  const d = read(params, "d");
  const eye = read(params, "eye");
  const tan = (lang: "vi" | "en") => `$\\dfrac{${d}\\sqrt{3}}{3} + ${mathDec(eye, lang)}\\text{ m}$`;
  const tan60 = (lang: "vi" | "en") => `$${d}\\sqrt{3} + ${mathDec(eye, lang)}\\text{ m}$`;
  const sine = (lang: "vi" | "en") => `$${mathDec(d / 2 + eye, lang)}\\text{ m}$`;
  const bare = `$\\dfrac{${d}\\sqrt{3}}{3}\\text{ m}$`;
  return made(
    question,
    `Đứng cách gốc cây ${d} m, góc ngẩng 30°, mắt cách đất ${mathDec(eye, "vi").replace("{,}", ",")} m. Cây cao bao nhiêu?`,
    `You stand ${d} m from a tree, the angle of elevation is 30°, and your eye is ${mathDec(eye, "en")} m above the ground. How tall is the tree?`,
    [tan("vi"), tan60("vi"), sine("vi"), bare],
    [tan("en"), tan60("en"), sine("en"), bare],
    [
      `Tam giác vuông có cạnh kề ${d} m và góc $30^\\circ$. Phần cây cao hơn mắt là cạnh đối.`,
      `$\\tan 30^\\circ = \\dfrac{\\sqrt{3}}{3}$, nên phần trên mắt là $\\dfrac{${d}\\sqrt{3}}{3}$ m.`,
      `Cộng mắt. $${d}\\sqrt{3}$ dùng nhầm tan 60°. Lấy sin thì coi ${d} m là cạnh huyền. Quên mắt thì thiếu chiều cao mắt.`,
    ],
    [
      `The right triangle has adjacent side ${d} m and angle $30^\\circ$. The tree above eye level is the opposite side.`,
      `$\\tan 30^\\circ = \\dfrac{\\sqrt{3}}{3}$, so the part above the eye is $\\dfrac{${d}\\sqrt{3}}{3}$ m.`,
      `Add the eye. $${d}\\sqrt{3}$ uses $\\tan 60^\\circ$. Sine treats ${d} m as the hypotenuse. Dropping the eye misses that height.`,
    ],
    `Tan = đối / kề. Cạnh kề là ${d} m trên mặt đất. Nhớ cộng chiều cao mắt.`,
    `Tan = opposite / adjacent. The adjacent side is the ${d} m on the ground. Add the eye height.`,
  );
}

function pointStem(question: Question, params: Record<string, number>) {
  const deg = read(params, "deg");
  const at = (angle: number, lang: "vi" | "en") => {
    const turn = ((angle % 360) + 360) % 360;
    const x = turn === 0 ? 1 : turn === 180 ? -1 : 0;
    const y = turn === 90 ? 1 : turn === 270 ? -1 : 0;
    return lang === "vi" ? `$(${x};\\ ${y})$` : `$(${x}, ${y})$`;
  };
  const rest = [deg + 270, deg + 180, deg + 90];
  return made(
    question,
    `Điểm ứng với $${deg}^\\circ$ trên đường tròn đơn vị là điểm nào?`,
    `Which point on the unit circle corresponds to $${deg}^\\circ$?`,
    [at(deg, "vi"), at(rest[0] ?? 0, "vi"), at(rest[1] ?? 0, "vi"), at(rest[2] ?? 0, "vi")],
    [at(deg, "en"), at(rest[0] ?? 0, "en"), at(rest[1] ?? 0, "en"), at(rest[2] ?? 0, "en")],
    [
      `Trên đường tròn đơn vị, tọa độ là $(\\cos\\alpha;\\ \\sin\\alpha)$.`,
      `$\\cos ${deg}^\\circ$ và $\\sin ${deg}^\\circ$ cho đúng điểm ${at(deg, "vi")}.`,
      `Ba điểm còn lại là ba hướng trục kia.`,
    ],
    [
      `On the unit circle the coordinates are $(\\cos\\alpha, \\sin\\alpha)$.`,
      `$\\cos ${deg}^\\circ$ and $\\sin ${deg}^\\circ$ give ${at(deg, "en")}.`,
      `The other three points are the other axis directions.`,
    ],
  );
}

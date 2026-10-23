import type { Question } from "../types.ts";
import { pick } from "../../lib/prng.ts";
import { made, pointSemi, questionById, radFrac, read } from "./stem.ts";
import { parametric, type Vary } from "./types.ts";

const LINES = [
  { p: 3, q: 1, s: 2 }, { p: 4, q: 2, s: 2 }, { p: 5, q: 1, s: 2 }, { p: 3, q: 3, s: 2 },
  { p: 4, q: 1, s: 1 }, { p: 6, q: 2, s: 2 }, { p: 5, q: 3, s: 2 }, { p: 4, q: 4, s: 2 },
  { p: 7, q: 1, s: 2 }, { p: 5, q: 5, s: 2 }, { p: 6, q: 4, s: 2 }, { p: 8, q: 2, s: 2 },
  { p: 3, q: 5, s: 2 }, { p: 7, q: 3, s: 2 }, { p: 4, q: 2, s: 4 }, { p: 5, q: 3, s: 6 },
  { p: 1, q: 5, s: 2 }, { p: 2, q: 6, s: 2 }, { p: 8, q: 1, s: 3 }, { p: 6, q: 6, s: 2 },
] as const;

const PLANES = [
  { x: 1, y: 1, z: 1, s: 6 }, { x: 1, y: 1, z: 1, s: 9 }, { x: 1, y: 1, z: 1, s: 12 },
  { x: 1, y: 1, z: 1, s: 15 }, { x: 2, y: 1, z: 1, s: 10 }, { x: 2, y: 2, z: 1, s: 11 },
  { x: 1, y: 1, z: 2, s: 10 }, { x: 2, y: 2, z: 2, s: 12 }, { x: 1, y: 2, z: 3, s: 12 },
  { x: 1, y: 1, z: 1, s: 18 }, { x: 2, y: 2, z: 2, s: 15 }, { x: 3, y: 1, z: 1, s: 14 },
  { x: 1, y: 1, z: 4, s: 15 }, { x: 2, y: 3, z: 1, s: 15 }, { x: 4, y: 1, z: 1, s: 15 },
] as const;

const DIRS = [
  { a: 1, b: 1, c: 2 }, { a: 2, b: 1, c: 3 }, { a: 1, b: 2, c: 3 }, { a: 2, b: 3, c: 4 },
  { a: 3, b: 1, c: 2 }, { a: 1, b: 3, c: 4 }, { a: 3, b: 2, c: 4 }, { a: 2, b: 2, c: 3 },
  { a: 4, b: 1, c: 5 }, { a: 1, b: 4, c: 2 }, { a: 3, b: 4, c: 5 }, { a: 5, b: 2, c: 3 },
  { a: 2, b: 5, c: 1 }, { a: 4, b: 3, c: 2 }, { a: 3, b: 5, c: 4 },
] as const;

const CIRCLES = [
  { x: 6, y: 0, r: 5 }, { x: 3, y: 4, r: 5 }, { x: 0, y: 0, r: 5 }, { x: 2, y: 2, r: 5 },
  { x: 0, y: 6, r: 5 }, { x: 5, y: 12, r: 13 }, { x: 8, y: 15, r: 17 }, { x: 9, y: 12, r: 15 },
  { x: 7, y: 0, r: 5 }, { x: 1, y: 2, r: 5 }, { x: 0, y: 3, r: 5 }, { x: 6, y: 8, r: 10 },
  { x: 9, y: 0, r: 5 }, { x: 0, y: 0, r: 13 }, { x: 4, y: 4, r: 10 }, { x: 11, y: 0, r: 10 },
  { x: 7, y: 24, r: 25 }, { x: 1, y: 1, r: 5 },
] as const;

const ON_CIRCLES = [
  { x: 3, y: 4, r: 5 }, { x: 6, y: 0, r: 5 }, { x: 2, y: 2, r: 5 }, { x: 0, y: 0, r: 5 },
  { x: 5, y: 12, r: 13 }, { x: 8, y: 15, r: 17 }, { x: 6, y: 8, r: 10 }, { x: 9, y: 12, r: 15 },
  { x: 7, y: 24, r: 25 }, { x: 1, y: 0, r: 5 }, { x: 0, y: 3, r: 5 }, { x: 10, y: 0, r: 6 },
  { x: 0, y: 0, r: 10 }, { x: 4, y: 3, r: 5 }, { x: 20, y: 21, r: 29 },
] as const;

const VI = ["Nằm ngoài", "Nằm trên", "Nằm trong", "Là tâm"] as const;
const EN = ["Outside", "On the circle", "Inside", "It is the centre"] as const;

export function analyticVary(questions: readonly Question[]): Vary[] {
  const q = (id: string) => questionById(questions, id);
  return [
    parametric(q("ana-dist"), (rng) => pick(rng, LINES), (params) => distStem(q("ana-dist"), params)),
    parametric(q("ana-foot"), (rng) => pick(rng, LINES.filter((row) => row.p !== row.q)), (params) => footStem(q("ana-foot"), params)),
    parametric(q("ana-plane"), (rng) => pick(rng, PLANES), (params) => planeStem(q("ana-plane"), params)),
    parametric(q("ana-dir"), (rng) => pick(rng, DIRS), (params) => dirStem(q("ana-dir"), params)),
    parametric(q("ana-circle"), (rng) => pick(rng, CIRCLES), (params) => circleStem(q("ana-circle"), params, false)),
    parametric(q("ana-on"), (rng) => pick(rng, ON_CIRCLES), (params) => circleStem(q("ana-on"), params, true)),
  ];
}

function root2(multiple: number): string {
  return multiple === 1 ? radFrac(1, 2, 1) : radFrac(multiple, 2, 1);
}

function root3(multiple: number): string {
  return multiple === 1 ? radFrac(1, 3, 1) : radFrac(multiple, 3, 1);
}

function distStem(question: Question, params: Record<string, number>) {
  const p = read(params, "p");
  const q = read(params, "q");
  const s = read(params, "s");
  const gap = Math.abs(p + q - s);
  return made(
    question,
    `Khoảng cách $(${p};\\ ${q})$ tới $x+y-${s}=0$?`,
    `Distance from $(${p};\\ ${q})$ to $x+y-${s}=0$?`,
    [root2(gap / 2), `$${gap}$`, `$0$`, `$1$`],
    [root2(gap / 2), `$${gap}$`, `$0$`, `$1$`],
    [
      `$\\dfrac{|${p}+${q}-${s}|}{\\sqrt{2}}$.`,
      `Bằng ${root2(gap / 2)}.`,
      `${gap} dừng ở tử. $0$ coi điểm nằm trên đường. $1$ là một hệ số.`,
    ],
    [
      `$\\dfrac{|${p}+${q}-${s}|}{\\sqrt{2}}$.`,
      `That is ${root2(gap / 2)}.`,
      `${gap} stops at the numerator. $0$ pretends the point is on the line. $1$ is one coefficient.`,
    ],
  );
}

function footStem(question: Question, params: Record<string, number>) {
  const p = read(params, "p");
  const q = read(params, "q");
  const s = read(params, "s");
  const t = (p + q - s) / 2;
  const fx = p - t;
  const fy = q - t;
  return made(
    question,
    `Chân từ $(${p};\\ ${q})$ xuống $x+y-${s}=0$?`,
    `Foot from $(${p};\\ ${q})$ onto $x+y-${s}=0$?`,
    [pointSemi(fx, fy), pointSemi(fx - 1, fy + 1), pointSemi(fx, fx), pointSemi(p, q)],
    [pointSemi(fx, fy), pointSemi(fx - 1, fy + 1), pointSemi(fx, fx), pointSemi(p, q)],
    [
      `$t=\\dfrac{${p}+${q}-${s}}{2}=${t}$.`,
      `$(${p};\\ ${q})-t(1;\\ 1)=${pointSemi(fx, fy)}$.`,
      `${pointSemi(fx - 1, fy + 1)} và ${pointSemi(fx, fx)} nằm trên đường nhưng không phải chân. ${pointSemi(p, q)} là điểm ban đầu.`,
    ],
    [
      `$t=\\dfrac{${p}+${q}-${s}}{2}=${t}$.`,
      `$(${p};\\ ${q})-t(1;\\ 1)=${pointSemi(fx, fy)}$.`,
      `${pointSemi(fx - 1, fy + 1)} and ${pointSemi(fx, fx)} lie on the line but are not the foot. ${pointSemi(p, q)} is the original point.`,
    ],
  );
}

function planeStem(question: Question, params: Record<string, number>) {
  const x = read(params, "x");
  const y = read(params, "y");
  const z = read(params, "z");
  const s = read(params, "s");
  const gap = Math.abs(x + y + z - s);
  const multiple = gap / 3;
  return made(
    question,
    `Khoảng cách $(${x};\\ ${y};\\ ${z})$ tới $x+y+z-${s}=0$?`,
    `Distance from $(${x};\\ ${y};\\ ${z})$ to $x+y+z-${s}=0$?`,
    [root3(multiple), `$${gap}$`, `$1$`, root3(2 * multiple)],
    [root3(multiple), `$${gap}$`, `$1$`, root3(2 * multiple)],
    [
      `$\\dfrac{|${x}+${y}+${z}-${s}|}{\\sqrt{3}}$.`,
      `Bằng ${root3(multiple)}.`,
      `${gap} là tử. $1$ là một hệ số. ${root3(2 * multiple)} nhân thêm 2.`,
    ],
    [
      `$\\dfrac{|${x}+${y}+${z}-${s}|}{\\sqrt{3}}$.`,
      `That is ${root3(multiple)}.`,
      `${gap} is the numerator. $1$ is one coefficient. ${root3(2 * multiple)} has an extra factor 2.`,
    ],
  );
}

function dirStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const b = read(params, "b");
  const c = read(params, "c");
  return made(
    question,
    `Chỉ phương của $${a === 1 ? "" : a}x+${b === 1 ? "" : b}y-${c}=0$?`,
    `A direction of $${a === 1 ? "" : a}x+${b === 1 ? "" : b}y-${c}=0$?`,
    [pointSemi(b, -a), pointSemi(a, b), pointSemi(c, 0), pointSemi(0, c)],
    [pointSemi(b, -a), pointSemi(a, b), pointSemi(c, 0), pointSemi(0, c)],
    [
      `$ax+by+c=0\\Rightarrow\\vec d=(b;\\ -a)$.`,
      `${pointSemi(b, -a)} vuông góc với pháp tuyến ${pointSemi(a, b)}.`,
      `${pointSemi(a, b)} là pháp tuyến. ${pointSemi(c, 0)} và ${pointSemi(0, c)} không vuông góc với pháp tuyến.`,
    ],
    [
      `$ax+by+c=0\\Rightarrow\\vec d=(b;\\ -a)$.`,
      `${pointSemi(b, -a)} is perpendicular to the normal ${pointSemi(a, b)}.`,
      `${pointSemi(a, b)} is the normal. ${pointSemi(c, 0)} and ${pointSemi(0, c)} are not perpendicular to it.`,
    ],
  );
}

function circleStem(question: Question, params: Record<string, number>, onQuestion: boolean) {
  const x = read(params, "x");
  const y = read(params, "y");
  const r = read(params, "r");
  const kind = x === 0 && y === 0 ? 3 : x * x + y * y === r * r ? 1 : x * x + y * y > r * r ? 0 : 2;
  const order = [0, 1, 2, 3].filter((item) => item !== kind);
  const vi = [VI[kind] ?? "", VI[order[0] ?? 0] ?? "", VI[order[1] ?? 0] ?? "", VI[order[2] ?? 0] ?? ""] as [string, string, string, string];
  const en = [EN[kind] ?? "", EN[order[0] ?? 0] ?? "", EN[order[1] ?? 0] ?? "", EN[order[2] ?? 0] ?? ""] as [string, string, string, string];
  return made(
    question,
    `$(${x};\\ ${y})$ và $x^2+y^2=${r * r}$?`,
    `$(${x};\\ ${y})$ and $x^2+y^2=${r * r}$?`,
    vi,
    en,
    [
      `$|(${x};\\ ${y})|^2=${x * x + y * y}$, bán kính bình phương ${r * r}.`,
      kind === 1 ? `Bằng nhau, nên điểm nằm trên đường tròn.` : kind === 0 ? `Lớn hơn, nên điểm nằm ngoài.` : kind === 2 ? `Nhỏ hơn, nên điểm nằm trong.` : `Điểm là tâm.`,
      `Bốn câu là bốn vị trí. So ${x * x + y * y} với ${r * r} trước khi chọn.`,
    ],
    [
      `$|(${x};\\ ${y})|^2=${x * x + y * y}$, and the squared radius is ${r * r}.`,
      kind === 1 ? `They are equal, so the point is on the circle.` : kind === 0 ? `The point is farther out, so it is outside.` : kind === 2 ? `The point is closer, so it is inside.` : `The point is the centre.`,
      `The four sentences are the four places. Compare ${x * x + y * y} with ${r * r} before choosing.`,
    ],
    onQuestion
      ? `So $${x}^2+${y}^2$ với $${r * r}$. Bằng thì nằm trên.`
      : `So $${x}^2+${y}^2$ với $${r * r}$. Lớn hơn thì ngoài, bằng thì trên, nhỏ hơn thì trong.`,
    onQuestion
      ? `Compare $${x}^2+${y}^2$ with $${r * r}$. Equal means on the circle.`
      : `Compare $${x}^2+${y}^2$ with $${r * r}$. Greater is outside, equal is on the circle, smaller is inside.`,
  );
}

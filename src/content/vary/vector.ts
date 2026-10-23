import type { Question } from "../types.ts";
import { pick } from "../../lib/prng.ts";
import { made, point3, questionById, read, texInt } from "./stem.ts";
import { fixedVary, parametric, type Vary } from "./types.ts";

const LENGTHS = [
  { x: 2, y: 1, z: 2 }, { x: 1, y: 2, z: 2 }, { x: 2, y: 2, z: 1 }, { x: 4, y: 2, z: 4 },
  { x: 2, y: 4, z: 4 }, { x: 4, y: 4, z: 2 }, { x: 6, y: 3, z: 6 }, { x: 1, y: 4, z: 8 },
  { x: 8, y: 4, z: 1 }, { x: 4, y: 4, z: 7 }, { x: 2, y: 3, z: 6 }, { x: 6, y: 6, z: 3 },
  { x: 8, y: 1, z: 4 }, { x: 3, y: 6, z: 6 }, { x: 12, y: 4, z: 3 },
] as const;

const DOTS = [
  { x1: 1, y1: 2, z1: -1, x2: 2, y2: -1, z2: 0 },
  { x1: 1, y1: 2, z1: 1, x2: 2, y2: -1, z2: 1 },
  { x1: 1, y1: 1, z1: 1, x2: 1, y2: 1, z2: -1 },
  { x1: 3, y1: 1, z1: 2, x2: 1, y2: -1, z2: 1 },
  { x1: 1, y1: -2, z1: 2, x2: 2, y2: 1, z2: 1 },
  { x1: 4, y1: 1, z1: -1, x2: 1, y2: 2, z2: 2 },
  { x1: 2, y1: 2, z1: 1, x2: 1, y2: -2, z2: 3 },
  { x1: 3, y1: -1, z1: 1, x2: 1, y2: 1, z2: 2 },
  { x1: 2, y1: -1, z1: 3, x2: 1, y2: 2, z2: 1 },
  { x1: 1, y1: 1, z1: 2, x2: 3, y2: 1, z2: -1 },
  { x1: 5, y1: 1, z1: 2, x2: 1, y2: -1, z2: 1 },
] as const;

const SUMS = [
  { x1: 1, y1: 2, z1: 3, x2: 2, y2: -1, z2: 1 },
  { x1: 2, y1: 1, z1: 4, x2: 1, y2: 3, z2: 2 },
  { x1: 3, y1: -1, z1: 2, x2: 1, y2: 2, z2: 4 },
  { x1: 2, y1: 4, z1: 1, x2: 3, y2: -2, z2: 2 },
  { x1: 4, y1: 1, z1: 2, x2: -1, y2: 3, z2: 1 },
  { x1: 1, y1: -2, z1: 3, x2: 2, y2: 1, z2: -1 },
  { x1: 5, y1: 2, z1: 1, x2: 1, y2: -3, z2: 2 },
  { x1: 2, y1: 3, z1: -1, x2: 1, y2: 1, z2: 4 },
  { x1: 3, y1: 2, z1: 2, x2: 2, y2: -1, z2: 3 },
  { x1: 1, y1: 4, z1: 2, x2: 3, y2: -2, z2: 1 },
] as const;

const DETS = [
  { a: 2, b: 1, c: 1, d: -1 }, { a: 3, b: 1, c: 2, d: -1 }, { a: 3, b: 1, c: 4, d: -1 },
  { a: 4, b: 1, c: 1, d: -2 }, { a: 3, b: 2, c: 1, d: -1 }, { a: 2, b: 1, c: 3, d: -2 },
  { a: 5, b: 1, c: 2, d: -1 }, { a: 3, b: 1, c: 1, d: -2 }, { a: 4, b: 2, c: 1, d: -1 },
  { a: 2, b: 3, c: 1, d: -2 }, { a: 5, b: 2, c: 1, d: -1 }, { a: 4, b: 1, c: 2, d: -3 },
] as const;

const SYSTEMS = [
  { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 4, y: 1 }, { x: 4, y: 2 },
  { x: 4, y: 3 }, { x: 5, y: 1 }, { x: 5, y: 2 }, { x: 1, y: 3 }, { x: 2, y: 3 },
  { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: -1 }, { x: 2, y: -1 }, { x: 5, y: 3 },
] as const;

export function vectorVary(questions: readonly Question[]): Vary[] {
  const q = (id: string) => questionById(questions, id);
  return [
    parametric(q("vec-len"), (rng) => pick(rng, LENGTHS), (params) => lenStem(q("vec-len"), params)),
    parametric(q("vec-dot"), (rng) => pick(rng, DOTS), (params) => dotStem(q("vec-dot"), params)),
    parametric(q("vec-sum"), (rng) => pick(rng, SUMS), (params) => sumStem(q("vec-sum"), params)),
    parametric(q("vec-det"), (rng) => pick(rng, DETS), (params) => detStem(q("vec-det"), params)),
    parametric(q("vec-sys"), (rng) => pick(rng, SYSTEMS), (params) => sysStem(q("vec-sys"), params)),
    fixedVary(q("vec-cross")),
  ];
}

function lenStem(question: Question, params: Record<string, number>) {
  const x = read(params, "x");
  const y = read(params, "y");
  const z = read(params, "z");
  const square = x * x + y * y + z * z;
  const len = Math.round(Math.sqrt(square));
  const sum = x + y + z;
  return made(
    question,
    `$|(${x};\\ ${y};\\ ${z})|=?$`,
    `$|(${x};\\ ${y};\\ ${z})|=?$`,
    [texInt(len), texInt(sum), `$\\sqrt{${x * x + y * y}}$`, texInt(square)],
    [texInt(len), texInt(sum), `$\\sqrt{${x * x + y * y}}$`, texInt(square)],
    [
      `$\\sqrt{${x}^2+${y}^2+${z}^2} = \\sqrt{${square}}$.`,
      `Bằng ${len}.`,
      `${sum} cộng các thành phần. $\\sqrt{${x * x + y * y}}$ bỏ $z$. ${square} quên căn.`,
    ],
    [
      `$\\sqrt{${x}^2+${y}^2+${z}^2} = \\sqrt{${square}}$.`,
      `That is ${len}.`,
      `${sum} adds the components. $\\sqrt{${x * x + y * y}}$ drops $z$. ${square} forgets the root.`,
    ],
    `Lấy căn của tổng bình phương. Đừng cộng, đừng bỏ $z$.`,
    `Take the root of the sum of squares. Do not add, and do not drop $z$.`,
  );
}

function dotStem(question: Question, params: Record<string, number>) {
  const x1 = read(params, "x1");
  const y1 = read(params, "y1");
  const z1 = read(params, "z1");
  const x2 = read(params, "x2");
  const y2 = read(params, "y2");
  const z2 = read(params, "z2");
  const dot = x1 * x2 + y1 * y2 + z1 * z2;
  const dropped = x1 * x2 + y1 * y2;
  const abs = Math.abs(x1 * x2) + Math.abs(y1 * y2) + Math.abs(z1 * z2);
  return made(
    question,
    `$(${x1};\\ ${y1};\\ ${z1})\\cdot(${x2};\\ ${y2};\\ ${z2})=?$`,
    `$(${x1};\\ ${y1};\\ ${z1})\\cdot(${x2};\\ ${y2};\\ ${z2})=?$`,
    [texInt(dot), texInt(dropped), texInt(abs), texInt(-dot)],
    [texInt(dot), texInt(dropped), texInt(abs), texInt(-dot)],
    [
      `$${x1}\\cdot${x2} + ${y1}\\cdot${y2} + ${z1}\\cdot${z2}$.`,
      `Bằng ${dot}.`,
      `${dropped} bỏ hạng cuối. ${abs} lấy trị tuyệt đối từng tích. ${-dot} đổi dấu cả tích.`,
    ],
    [
      `$${x1}\\cdot${x2} + ${y1}\\cdot${y2} + ${z1}\\cdot${z2}$.`,
      `That is ${dot}.`,
      `${dropped} drops the last term. ${abs} takes each product's absolute value. ${-dot} flips the whole sign.`,
    ],
  );
}

function sumStem(question: Question, params: Record<string, number>) {
  const x1 = read(params, "x1");
  const y1 = read(params, "y1");
  const z1 = read(params, "z1");
  const x2 = read(params, "x2");
  const y2 = read(params, "y2");
  const z2 = read(params, "z2");
  return made(
    question,
    `$(${x1};\\ ${y1};\\ ${z1})+(${x2};\\ ${y2};\\ ${z2})=?$`,
    `$(${x1};\\ ${y1};\\ ${z1})+(${x2};\\ ${y2};\\ ${z2})=?$`,
    [
      point3(x1 + x2, y1 + y2, z1 + z2),
      point3(x1 + x2, y1 + y2, z1 - z2),
      point3(x1 + x2, y1 - y2, z1 + z2),
      point3(x2 - x1, y2, z2),
    ],
    [
      point3(x1 + x2, y1 + y2, z1 + z2),
      point3(x1 + x2, y1 + y2, z1 - z2),
      point3(x1 + x2, y1 - y2, z1 + z2),
      point3(x2 - x1, y2, z2),
    ],
    [
      `Cộng từng tọa độ: $(${x1}+${x2};\\ ${y1}+(${y2});\\ ${z1}+${z2})$.`,
      point3(x1 + x2, y1 + y2, z1 + z2) + `.`,
      `Sai $z$, đổi dấu tung độ, hoặc lấy một hiệu, ra các vectơ còn lại.`,
    ],
    [
      `Add coordinate by coordinate: $(${x1}+${x2};\\ ${y1}+(${y2});\\ ${z1}+${z2})$.`,
      point3(x1 + x2, y1 + y2, z1 + z2) + `.`,
      `A wrong $z$, a flipped middle sign, or a difference, produces the other vectors.`,
    ],
  );
}

function detStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const b = read(params, "b");
  const c = read(params, "c");
  const d = read(params, "d");
  const det = a * d - b * c;
  const plus = a * d + b * c;
  const flipped = a * -d - b * c;
  const swapped = b * c - a * d;
  return made(
    question,
    `$\\det=ad-bc$, $a=${a}$, $b=${b}$, $c=${c}$, $d=${d}$. $\\det=?$`,
    `$\\det=ad-bc$, $a=${a}$, $b=${b}$, $c=${c}$, $d=${d}$. $\\det=?$`,
    [texInt(det), texInt(plus), texInt(flipped), texInt(swapped)],
    [texInt(det), texInt(plus), texInt(flipped), texInt(swapped)],
    [
      `$${a}\\cdot(${d})-${b}\\cdot${c}$.`,
      `Bằng ${det}.`,
      `${plus} quên dấu trừ. ${flipped} đổi dấu của $d$. ${swapped} là $bc-ad$.`,
    ],
    [
      `$${a}\\cdot(${d})-${b}\\cdot${c}$.`,
      `That is ${det}.`,
      `${plus} forgets the minus. ${flipped} flips the sign of $d$. ${swapped} is $bc-ad$.`,
    ],
  );
}

function sysStem(question: Question, params: Record<string, number>) {
  const x = read(params, "x");
  const y = read(params, "y");
  const c1 = 2 * x + y;
  const c2 = x - y;
  const pair = (p: number, q: number) => `$x = ${p}$, $y = ${q}$`;
  return made(
    question,
    `$2x+y=${c1}$, $x-y=${c2}$. $(x;\\ y)=?$`,
    `$2x+y=${c1}$, $x-y=${c2}$. $(x;\\ y)=?$`,
    [pair(x, y), pair(y, x), pair(x + y, y - x), "Vô số nghiệm"],
    [pair(x, y), pair(y, x), pair(x + y, y - x), "Infinitely many solutions"],
    [
      `Cộng hai phương trình: $3x=${c1 + c2}$, nên $x=${x}$.`,
      `Thế vào phương trình thứ hai: $y=${y}$.`,
      `Đảo hai ẩn, hoặc lấy $(${x + y};\\ ${y - x})$, không nghiệm hệ. Vô số nghiệm chỉ khi định thức bằng 0.`,
    ],
    [
      `Add the equations: $3x=${c1 + c2}$, so $x=${x}$.`,
      `Substitute into the second equation: $y=${y}$.`,
      `Swapping the unknowns, or taking $(${x + y};\\ ${y - x})$, does not solve the system. Infinitely many solutions need a zero determinant.`,
    ],
  );
}

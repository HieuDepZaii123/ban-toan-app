import type { Question } from "../types.ts";
import { pick } from "../../lib/prng.ts";
import { made, questionById, radFrac, read } from "./stem.ts";
import { parametric, type Vary } from "./types.ts";

const TRIS = [
  { b: 6, h: 4 }, { b: 8, h: 5 }, { b: 10, h: 4 }, { b: 6, h: 6 }, { b: 8, h: 6 },
  { b: 10, h: 6 }, { b: 12, h: 5 }, { b: 5, h: 4 }, { b: 9, h: 4 }, { b: 7, h: 6 },
  { b: 8, h: 3 }, { b: 10, h: 8 }, { b: 12, h: 8 }, { b: 14, h: 6 }, { b: 9, h: 6 },
] as const;

const RIGHTS = [
  { a: 3, b: 4, c: 5 }, { a: 5, b: 12, c: 13 }, { a: 6, b: 8, c: 10 }, { a: 7, b: 24, c: 25 },
  { a: 8, b: 15, c: 17 }, { a: 9, b: 12, c: 15 }, { a: 9, b: 40, c: 41 }, { a: 20, b: 21, c: 29 },
  { a: 12, b: 16, c: 20 }, { a: 12, b: 35, c: 37 }, { a: 15, b: 20, c: 25 }, { a: 15, b: 36, c: 39 },
  { a: 18, b: 24, c: 30 }, { a: 4, b: 3, c: 5 },
] as const;

const BOXES = [
  { l: 3, w: 4, h: 5 }, { l: 2, w: 3, h: 5 }, { l: 2, w: 5, h: 3 }, { l: 3, w: 5, h: 4 },
  { l: 4, w: 5, h: 3 }, { l: 2, w: 4, h: 5 }, { l: 3, w: 4, h: 6 }, { l: 4, w: 3, h: 5 },
  { l: 3, w: 6, h: 5 }, { l: 4, w: 6, h: 5 }, { l: 5, w: 4, h: 6 }, { l: 2, w: 3, h: 7 },
  { l: 3, w: 5, h: 7 }, { l: 4, w: 5, h: 7 },
] as const;

const PYRS = [
  { s: 6, h: 4 }, { s: 6, h: 2 }, { s: 6, h: 5 }, { s: 6, h: 8 }, { s: 9, h: 4 },
  { s: 9, h: 2 }, { s: 9, h: 5 }, { s: 12, h: 4 }, { s: 12, h: 5 }, { s: 15, h: 4 },
  { s: 6, h: 10 }, { s: 9, h: 8 }, { s: 12, h: 2 }, { s: 15, h: 2 }, { s: 12, h: 8 },
] as const;

export function triangleVary(questions: readonly Question[]): Vary[] {
  const q = (id: string) => questionById(questions, id);
  return [
    parametric(q("shp-tri"), (rng) => pick(rng, TRIS), (params) => triStem(q("shp-tri"), params)),
    parametric(q("shp-right"), (rng) => pick(rng, RIGHTS), (params) => rightStem(q("shp-right"), params)),
    parametric(q("shp-box"), (rng) => pick(rng, BOXES), (params) => boxStem(q("shp-box"), params)),
    parametric(q("shp-pyr"), (rng) => pick(rng, PYRS), (params) => pyrStem(q("shp-pyr"), params)),
    parametric(q("shp-tet"), (rng) => ({ a: pick(rng, [6, 12, 18, 24]) }), (params) => tetStem(q("shp-tet"), params)),
    parametric(q("shp-sim"), (rng) => ({ k: pick(rng, [2, 3, 4, 5, 6, 7, 8]) }), (params) => simStem(q("shp-sim"), params)),
  ];
}

function triStem(question: Question, params: Record<string, number>) {
  const b = read(params, "b");
  const h = read(params, "h");
  const area = (b * h) / 2;
  return made(
    question,
    `Đáy $${b}$, cao $${h}$. $S=?$`,
    `Base $${b}$, height $${h}$. $S=?$`,
    [String(area), String(b * h), String(b + h), String(b + h - 2)],
    [String(area), String(b * h), String(b + h), String(b + h - 2)],
    [
      `$S=\\dfrac{1}{2}\\cdot${b}\\cdot${h}$.`,
      `Bằng ${area}.`,
      `${b * h} quên $\\dfrac{1}{2}$. ${b + h} cộng hai cạnh. ${b + h - 2} vẫn là tổng, chỉ bớt 2.`,
    ],
    [
      `$S=\\dfrac{1}{2}\\cdot${b}\\cdot${h}$.`,
      `That is ${area}.`,
      `${b * h} forgets $\\dfrac{1}{2}$. ${b + h} adds the two lengths. ${b + h - 2} is still a sum, just 2 less.`,
    ],
  );
}

function rightStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const b = read(params, "b");
  const c = read(params, "c");
  const area = (a * b) / 2;
  return made(
    question,
    `Vuông, cạnh $${a}$ và $${b}$. $S=?$`,
    `Right triangle, legs $${a}$ and $${b}$. $S=?$`,
    [String(area), String(a * b), String(c), String(a + b)],
    [String(area), String(a * b), String(c), String(a + b)],
    [
      `Diện tích là nửa tích hai cạnh góc vuông, không phải cạnh huyền.`,
      `$S=\\dfrac{${a}\\cdot${b}}{2}=${area}$.`,
      `${a * b} quên $\\dfrac{1}{2}$. ${c} là cạnh huyền. ${a + b} là chu vi thiếu một cạnh.`,
    ],
    [
      `The area is half the product of the legs, not the hypotenuse.`,
      `$S=\\dfrac{${a}\\cdot${b}}{2}=${area}$.`,
      `${a * b} forgets $\\dfrac{1}{2}$. ${c} is the hypotenuse. ${a + b} adds the legs.`,
    ],
  );
}

function boxStem(question: Question, params: Record<string, number>) {
  const l = read(params, "l");
  const w = read(params, "w");
  const h = read(params, "h");
  return made(
    question,
    `Hộp $${l},${w},${h}$. $V=?$`,
    `Box $${l},${w},${h}$. $V=?$`,
    [String(l * w * h), String(l * w), String(2 * l * w), String(l * h)],
    [String(l * w * h), String(l * w), String(2 * l * w), String(l * h)],
    [
      `$V=${l}\\cdot${w}\\cdot${h}=${l * w * h}$.`,
      `Nhân cả ba kích thước.`,
      `${l * w} chỉ là đáy. ${2 * l * w} gấp đôi đáy. ${l * h} bỏ một cạnh.`,
    ],
    [
      `$V=${l}\\cdot${w}\\cdot${h}=${l * w * h}$.`,
      `Multiply all three dimensions.`,
      `${l * w} is only the base. ${2 * l * w} doubles the base. ${l * h} drops one edge.`,
    ],
  );
}

function pyrStem(question: Question, params: Record<string, number>) {
  const s = read(params, "s");
  const h = read(params, "h");
  const volume = (s * s * h) / 3;
  return made(
    question,
    `Chóp, đáy vuông $${s}$, cao $${h}$. $V=?$`,
    `Pyramid, square base $${s}$, height $${h}$. $V=?$`,
    [String(volume), String(s * s), String(s * s * h), String(s * h)],
    [String(volume), String(s * s), String(s * s * h), String(s * h)],
    [
      `$V=\\dfrac{1}{3}\\cdot${s * s}\\cdot${h}=${volume}$.`,
      `Đáy là $${s}^2$, rồi lấy một phần ba.`,
      `${s * s} là diện tích đáy. ${s * s * h} quên $\\dfrac{1}{3}$. ${s * h} không phải thể tích.`,
    ],
    [
      `$V=\\dfrac{1}{3}\\cdot${s * s}\\cdot${h}=${volume}$.`,
      `The base is $${s}^2$, then take one third.`,
      `${s * s} is the base area. ${s * s * h} forgets $\\dfrac{1}{3}$. ${s * h} is not the volume.`,
    ],
  );
}

function tetStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const coef = (a * a * a) / 12;
  const face = (a * a) / 4;
  return made(
    question,
    `Tứ diện đều, $a=${a}$. $V=?$`,
    `Regular tetrahedron, $a=${a}$. $V=?$`,
    [radFrac(coef, 2, 1), radFrac(face, 3, 1), `$${a ** 3}$`, `$${a * a}$`],
    [radFrac(coef, 2, 1), radFrac(face, 3, 1), `$${a ** 3}$`, `$${a * a}$`],
    [
      `$V=\\dfrac{a^3\\sqrt{2}}{12}=\\dfrac{${a ** 3}\\sqrt{2}}{12}$.`,
      `Bằng ${radFrac(coef, 2, 1)}.`,
      `${radFrac(face, 3, 1)} là diện tích một mặt. ${a ** 3} là $a^3$. ${a * a} là $a^2$.`,
    ],
    [
      `$V=\\dfrac{a^3\\sqrt{2}}{12}=\\dfrac{${a ** 3}\\sqrt{2}}{12}$.`,
      `That is ${radFrac(coef, 2, 1)}.`,
      `${radFrac(face, 3, 1)} is one face. ${a ** 3} is $a^3$. ${a * a} is $a^2$.`,
    ],
  );
}

function simStem(question: Question, params: Record<string, number>) {
  const k = read(params, "k");
  return made(
    question,
    `Đồng dạng, $k=${k}$. $\\dfrac{S'}{S}=?$`,
    `Similar figures, $k=${k}$. $\\dfrac{S'}{S}=?$`,
    [String(k * k), String(k), String(k * k * k), "1"],
    [String(k * k), String(k), String(k * k * k), "1"],
    [
      `Tỷ số diện tích là bình phương tỷ số độ dài.`,
      `$\\dfrac{S'}{S}=${k}^2=${k * k}$.`,
      `${k} là tỷ số cạnh. ${k * k * k} là tỷ số thể tích. 1 là khi hai hình bằng nhau.`,
    ],
    [
      `The area ratio is the square of the length ratio.`,
      `$\\dfrac{S'}{S}=${k}^2=${k * k}$.`,
      `${k} is the length ratio. ${k * k * k} is the volume ratio. 1 is when the figures are congruent.`,
    ],
  );
}

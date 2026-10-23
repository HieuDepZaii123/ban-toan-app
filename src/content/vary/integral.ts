import type { Question } from "../types.ts";
import { pick } from "../../lib/prng.ts";
import { cm3, frac, made, piFrac, questionById, read } from "./stem.ts";
import { parametric, type Vary } from "./types.ts";

const ARCH = [2, 3, 4, 5] as const;
const GAPS = [2, 4, 5, 6, 7, 8, 9] as const;
const WIDTHS = [2, 3, 4, 5, 6] as const;
const MIDPOINTS = [2, 3, 5, 7] as const;
const CONES = [
  { r: 3, h: 6 }, { r: 2, h: 6 }, { r: 2, h: 8 }, { r: 3, h: 4 }, { r: 3, h: 8 },
  { r: 3, h: 10 }, { r: 4, h: 6 }, { r: 4, h: 8 }, { r: 4, h: 10 }, { r: 5, h: 4 },
  { r: 5, h: 6 }, { r: 5, h: 8 }, { r: 5, h: 10 }, { r: 4, h: 2 }, { r: 5, h: 2 },
] as const;

export function integralVary(questions: readonly Question[]): Vary[] {
  const q = (id: string) => questionById(questions, id);
  return [
    parametric(q("int-area"), (rng) => ({ a: pick(rng, ARCH) }), (params) => areaStem(q("int-area"), params)),
    parametric(q("int-sign"), (rng) => ({ a: pick(rng, ARCH) }), (params) => signStem(q("int-sign"), params)),
    parametric(q("int-gap"), (rng) => ({ n: pick(rng, GAPS) }), (params) => gapStem(q("int-gap"), params)),
    parametric(q("int-volume"), (rng) => ({ b: pick(rng, WIDTHS) }), (params) => volumeStem(q("int-volume"), params)),
    parametric(q("int-riemann"), (rng) => ({ b: pick(rng, MIDPOINTS) }), (params) => riemannStem(q("int-riemann"), params)),
    parametric(q("int-cone"), (rng) => pick(rng, CONES), (params) => coneStem(q("int-cone"), params)),
  ];
}

function archTerm(a: number): string {
  return a === 2 ? "2x" : `${a}x`;
}

function areaStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const term = archTerm(a);
  return made(
    question,
    `$\\int_0^2 (${term} - x^2)\\,dx$ bằng bao nhiêu?`,
    `What is $\\int_0^2 (${term} - x^2)\\,dx$?`,
    [frac(6 * a - 8, 3), frac(2 * (a - 1), 1), frac(2 * a, 1), frac(6 * a - 4, 3)],
    [frac(6 * a - 8, 3), frac(2 * (a - 1), 1), frac(2 * a, 1), frac(6 * a - 4, 3)],
    [
      `Nguyên hàm của $${term}$ là $\\dfrac{${a}}{2}x^2$, của $x^2$ là $\\dfrac{x^3}{3}$.`,
      `Lấy $F(2) - F(0) = ${frac(6 * a - 8, 3)}$.`,
      `${frac(2 * (a - 1), 1)} là hình chữ nhật. ${frac(2 * a, 1)} quên trừ $x^2$. ${frac(6 * a - 4, 3)} sai số của hạng bậc ba.`,
    ],
    [
      `An antiderivative of $${term}$ is $\\dfrac{${a}}{2}x^2$, and of $x^2$ is $\\dfrac{x^3}{3}$.`,
      `$F(2) - F(0) = ${frac(6 * a - 8, 3)}$.`,
      `${frac(2 * (a - 1), 1)} is a rectangle. ${frac(2 * a, 1)} forgets to subtract $x^2$. ${frac(6 * a - 4, 3)} uses the wrong cubic term.`,
    ],
    `Nguyên hàm của ${term} là hệ số nhân x²/2, của x² là x³/3. Rồi lấy F(2) − F(0).`,
    `The antiderivative of ${term} uses x²/2, and of x² is x³/3. Then take F(2) − F(0).`,
  );
}

function signStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const term = archTerm(a);
  const value = frac(-(6 * a - 8), 3);
  return made(
    question,
    `$\\int_0^2 (x^2 - ${term})\\,dx$ bằng bao nhiêu?`,
    `What is $\\int_0^2 (x^2 - ${term})\\,dx$?`,
    [value, frac(6 * a - 8, 3), frac(0, 1), frac(-2 * a, 1)],
    [value, frac(6 * a - 8, 3), frac(0, 1), frac(-2 * a, 1)],
    [
      `Đây là đúng miền vừa rồi, nhưng đường nằm dưới Ox.`,
      `Tích phân giữ dấu, nên bằng ${value}.`,
      `Bỏ dấu âm thì ra giá trị dương. $0$ coi như diện tích triệt tiêu. ${frac(-2 * a, 1)} chỉ lấy hạng bậc nhất.`,
    ],
    [
      `This is the same region, but the curve lies under the x-axis.`,
      `The integral keeps the sign, so it equals ${value}.`,
      `Dropping the minus gives the positive value. $0$ pretends the areas cancel. ${frac(-2 * a, 1)} keeps only the linear term.`,
    ],
  );
}

function gapStem(question: Question, params: Record<string, number>) {
  const n = read(params, "n");
  const power = n === 2 ? "x^2" : `x^${n}`;
  return made(
    question,
    `Diện tích hình học giữa $y = x$ và $y = ${power}$ trên $[0; 1]$ bằng bao nhiêu?`,
    `What is the geometric area between $y = x$ and $y = ${power}$ on $[0; 1]$?`,
    [frac(n - 1, 2 * (n + 1)), frac(1, 2), frac(1, n + 1), frac(-(n - 1), 2 * (n + 1))],
    [frac(n - 1, 2 * (n + 1)), frac(1, 2), frac(1, n + 1), frac(-(n - 1), 2 * (n + 1))],
    [
      `Trên $[0; 1]$, $y = x$ nằm trên $y = ${power}$.`,
      `$\\int_0^1 (x - ${power})\\,dx = \\dfrac{1}{2} - \\dfrac{1}{${n + 1}} = ${frac(n - 1, 2 * (n + 1))}$.`,
      `${frac(1, 2)} chỉ lấy $y = x$. ${frac(1, n + 1)} chỉ lấy đường dưới. Dấu âm là hiệu ngược.`,
    ],
    [
      `On $[0; 1]$, $y = x$ lies above $y = ${power}$.`,
      `$\\int_0^1 (x - ${power})\\,dx = \\dfrac{1}{2} - \\dfrac{1}{${n + 1}} = ${frac(n - 1, 2 * (n + 1))}$.`,
      `${frac(1, 2)} keeps only $y = x$. ${frac(1, n + 1)} keeps only the lower curve. The minus sign reverses the difference.`,
    ],
  );
}

function volumeStem(question: Question, params: Record<string, number>) {
  const b = read(params, "b");
  const term = b === 2 ? "2x" : `${b}x`;
  return made(
    question,
    `Quay miền dưới $y = ${term} - x^2$, từ $0$ đến $${b}$, quanh Ox. Thể tích bằng bao nhiêu?`,
    `The region under $y = ${term} - x^2$, from $0$ to $${b}$, is rotated about the x-axis. What is the volume?`,
    [piFrac(b ** 5, 30), piFrac(b ** 3, 6), piFrac(b ** 5, 6), frac(b ** 3, 6)],
    [piFrac(b ** 5, 30), piFrac(b ** 3, 6), piFrac(b ** 5, 6), frac(b ** 3, 6)],
    [
      `Bán kính lát là $y$. Thể tích là $\\pi \\int_0^{${b}} y^2\\,dx$.`,
      `$\\int_0^{${b}} (${term} - x^2)^2\\,dx = \\dfrac{${b ** 5}}{30}$, nên thể tích bằng ${piFrac(b ** 5, 30)}.`,
      `${piFrac(b ** 3, 6)} nhân $\\pi$ với diện tích phẳng. ${piFrac(b ** 5, 6)} sai hệ số. ${frac(b ** 3, 6)} quên $\\pi$.`,
    ],
    [
      `The slice radius is $y$. The volume is $\\pi \\int_0^{${b}} y^2\\,dx$.`,
      `$\\int_0^{${b}} (${term} - x^2)^2\\,dx = \\dfrac{${b ** 5}}{30}$, so the volume is ${piFrac(b ** 5, 30)}.`,
      `${piFrac(b ** 3, 6)} multiplies the flat area by $\\pi$. ${piFrac(b ** 5, 6)} uses the wrong coefficient. ${frac(b ** 3, 6)} forgets $\\pi$.`,
    ],
  );
}

function riemannStem(question: Question, params: Record<string, number>) {
  const b = read(params, "b");
  const term = b === 2 ? "2x" : `${b}x`;
  const mid = b / 2;
  return made(
    question,
    `Trên $[0;\\ ${b}]$, một hình chữ nhật lấy cao tại trung điểm của $y = ${term} - x^2$. Diện tích hình đó bằng bao nhiêu?`,
    `On $[0,\\ ${b}]$, one rectangle takes its height at the midpoint of $y = ${term} - x^2$. What is that area?`,
    [frac(b ** 3, 4), frac(b ** 3, 6), frac(b * b, 4), frac(b * b, 1)],
    [frac(b ** 3, 4), frac(b ** 3, 6), frac(b * b, 4), frac(b * b, 1)],
    [
      `Trung điểm là $x = ${mid}$. Cao bằng $y(${mid}) = \\dfrac{${b * b}}{4}$.`,
      `Rộng bằng cả đoạn $${b}$, nên diện tích bằng ${frac(b ** 3, 4)}.`,
      `${frac(b ** 3, 6)} là tích phân đúng, không phải một hình chữ nhật. ${frac(b * b, 4)} quên nhân chiều rộng. ${b * b} lấy nhầm bình phương của độ rộng.`,
    ],
    [
      `The midpoint is $x = ${mid}$. The height is $y(${mid}) = \\dfrac{${b * b}}{4}$.`,
      `The width is the whole interval $${b}$, so the area is ${frac(b ** 3, 4)}.`,
      `${frac(b ** 3, 6)} is the exact integral, not one rectangle. ${frac(b * b, 4)} forgets the width. ${b * b} squares the width by mistake.`,
    ],
    `Trung điểm là x = ${mid}. Cao bằng y(${mid}). Rộng bằng cả đoạn.`,
    `The midpoint is x = ${mid}. The height is y(${mid}). The width is the whole interval.`,
  );
}

function coneStem(question: Question, params: Record<string, number>) {
  const r = read(params, "r");
  const h = read(params, "h");
  const body = (num: number, den: number) => piFrac(num, den).slice(1, -1);
  const cup = (num: number, den: number) => cm3(body(num, den));
  return made(
    question,
    `Một ly nón, miệng bán kính $${r}$ cm, cao $${h}$ cm, đầy nước. Thể tích nước bằng bao nhiêu?`,
    `A conical cup has rim radius $${r}$ cm and height $${h}$ cm, and it is full of water. What is the volume of water?`,
    [cup(r * r * h, 3), cup(r * r * h, 1), cup(r * r * r, 3), cup(r * h, 3)],
    [cup(r * r * h, 3), cup(r * r * h, 1), cup(r * r * r, 3), cup(r * h, 3)],
    [
      `$V = \\dfrac{1}{3}\\pi r^2 h = \\dfrac{1}{3}\\pi \\cdot ${r * r} \\cdot ${h}$.`,
      `Bằng ${cup(r * r * h, 3)}.`,
      `${cup(r * r * h, 1)} là hình trụ cùng đáy và cùng cao. ${cup(r * r * r, 3)} lấy chiều cao làm bán kính. ${cup(r * h, 3)} quên bình phương bán kính.`,
    ],
    [
      `$V = \\dfrac{1}{3}\\pi r^2 h = \\dfrac{1}{3}\\pi \\cdot ${r * r} \\cdot ${h}$.`,
      `That is ${cup(r * r * h, 3)}.`,
      `${cup(r * r * h, 1)} is the cylinder with the same base and height. ${cup(r * r * r, 3)} uses the height as the radius. ${cup(r * h, 3)} forgets to square the radius.`,
    ],
  );
}

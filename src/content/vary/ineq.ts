import type { Question } from "../types.ts";
import { pick } from "../../lib/prng.ts";
import { dec1, joinAnd, made, questionById, read, texInt } from "./stem.ts";
import { fixedVary, parametric, type Vary } from "./types.ts";

const PAIRS = [
  { a: 4, b: 9 }, { a: 1, b: 4 }, { a: 4, b: 16 }, { a: 9, b: 16 }, { a: 1, b: 9 },
  { a: 16, b: 25 }, { a: 4, b: 25 }, { a: 9, b: 25 }, { a: 1, b: 16 }, { a: 36, b: 4 },
  { a: 9, b: 4 }, { a: 16, b: 9 }, { a: 25, b: 4 }, { a: 25, b: 16 }, { a: 36, b: 9 },
  { a: 49, b: 4 }, { a: 49, b: 16 }, { a: 64, b: 9 }, { a: 1, b: 25 }, { a: 9, b: 36 },
] as const;

const CAUCHY = [
  { a: 1, b: 2, c: 3, d: 4 }, { a: 2, b: 1, c: 3, d: 4 }, { a: 1, b: 2, c: 4, d: 3 },
  { a: 2, b: 3, c: 3, d: 4 }, { a: 1, b: 4, c: 3, d: 4 }, { a: 2, b: 5, c: 3, d: 4 },
  { a: 1, b: 3, c: 6, d: 8 }, { a: 3, b: 1, c: 3, d: 4 }, { a: 4, b: 1, c: 3, d: 4 },
  { a: 1, b: 2, c: 5, d: 12 }, { a: 2, b: 1, c: 5, d: 12 }, { a: 3, b: 2, c: 5, d: 12 },
  { a: 1, b: 6, c: 8, d: 15 }, { a: 2, b: 3, c: 8, d: 15 }, { a: 4, b: 2, c: 6, d: 8 },
] as const;

const LP = [
  { p: 5, q: 3 }, { p: 4, q: 3 }, { p: 7, q: 4 }, { p: 6, q: 5 }, { p: 7, q: 5 },
  { p: 8, q: 5 }, { p: 9, q: 5 }, { p: 7, q: 6 }, { p: 8, q: 6 }, { p: 11, q: 6 },
  { p: 8, q: 7 }, { p: 9, q: 7 }, { p: 10, q: 7 }, { p: 11, q: 7 }, { p: 12, q: 7 },
  { p: 13, q: 7 },
] as const;

export function ineqVary(questions: readonly Question[]): Vary[] {
  const q = (id: string) => questionById(questions, id);
  return [
    parametric(q("ineq-am"), (rng) => pick(rng, PAIRS), (params) => amStem(q("ineq-am"), params)),
    fixedVary(q("ineq-equal")),
    parametric(q("ineq-split"), (rng) => ({ s: pick(rng, [10, 6, 8, 12, 14, 16]) }), (params) => splitStem(q("ineq-split"), params)),
    parametric(q("ineq-cauchy"), (rng) => pick(rng, CAUCHY), (params) => cauchyStem(q("ineq-cauchy"), params)),
    parametric(q("ineq-lp"), (rng) => pick(rng, LP), (params) => lpStem(q("ineq-lp"), params)),
    parametric(q("ineq-flip"), (rng) => ({
      a: pick(rng, [2, 1, 3, 4, 5]),
      k: pick(rng, [2, 1, 3, 4, 5]),
    }), (params) => flipStem(q("ineq-flip"), params)),
  ];
}

function amStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const b = read(params, "b");
  const am = (a + b) / 2;
  const gm = Math.round(Math.sqrt(a * b));
  const show = (left: number, right: number, lang: "vi" | "en") => joinAnd(dec1(left, lang), dec1(right, lang), lang);
  return made(
    question,
    `$a=${a}$, $b=${b}$: $\\dfrac{a+b}{2}$ và $\\sqrt{ab}$?`,
    `$a=${a}$, $b=${b}$: $\\dfrac{a+b}{2}$ and $\\sqrt{ab}$?`,
    [show(am, gm, "vi"), show(gm, am, "vi"), show(a + b, a * b, "vi"), show(am, a * b, "vi")],
    [show(am, gm, "en"), show(gm, am, "en"), show(a + b, a * b, "en"), show(am, a * b, "en")],
    [
      `$\\dfrac{${a}+${b}}{2}=${dec1(am, "vi").replace(",", "{,}")}$.`,
      `$\\sqrt{${a}\\cdot${b}}=\\sqrt{${a * b}}=${gm}$.`,
      `Đảo thứ tự thì ra ${show(gm, am, "vi")}. ${a + b}=${a}+${b}, ${a * b}=${a}\\cdot${b}.`,
    ],
    [
      `$\\dfrac{${a}+${b}}{2}=${dec1(am, "en")}$.`,
      `$\\sqrt{${a}\\cdot${b}}=\\sqrt{${a * b}}=${gm}$.`,
      `Swapping the order gives ${show(gm, am, "en")}. ${a + b}=${a}+${b}, ${a * b}=${a}\\cdot${b}.`,
    ],
  );
}

function splitStem(question: Question, params: Record<string, number>) {
  const s = read(params, "s");
  const half = s / 2;
  const best = half * half;
  const near = (half - 1) * (half - 1);
  return made(
    question,
    `$a,b>0$, $a+b=${s}$. $\\max ab=?$`,
    `$a,b>0$, $a+b=${s}$. $\\max ab=?$`,
    [String(best), String(best - 1), String(near), String(s - 1)],
    [String(best), String(best - 1), String(near), String(s - 1)],
    [
      `$t(${s}-t)$, $0<t<${s}$.`,
      `$t=${half}\\Rightarrow ${best}$.`,
      `$${best - 1}$ lệch một đơn vị. $${near}=${half - 1}^2$, tổng không còn $${s}$. $${s - 1}$ không phải tích lớn nhất.`,
    ],
    [
      `$t(${s}-t)$, $0<t<${s}$.`,
      `$t=${half}\\Rightarrow ${best}$.`,
      `$${best - 1}$ is one unit off. $${near}=${half - 1}^2$, and that pair does not sum to $${s}$. $${s - 1}$ is not the greatest product.`,
    ],
    `$\\max$ khi $a=b=\\dfrac{${s}}{2}$.`,
    `$\\max$ when $a=b=\\dfrac{${s}}{2}$.`,
  );
}

function cauchyStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const b = read(params, "b");
  const c = read(params, "c");
  const d = read(params, "d");
  const left = (a * a + b * b) * (c * c + d * d);
  const right = (a * c + b * d) * (a * c + b * d);
  const sums = c * c + d * d;
  const dot = a * c + b * d;
  const root = Math.round(Math.sqrt(sums));
  const ends = c + d;
  const line = (p: number, t: number, op: "\\ge" | "\\le") => `$${p} ${op} ${t}$`;
  return made(
    question,
    `$(${a};${b}),\\ (${c};${d})$: $(a^2+b^2)(c^2+d^2)$ và $(ac+bd)^2$?`,
    `$(${a};${b}),\\ (${c};${d})$: $(a^2+b^2)(c^2+d^2)$ and $(ac+bd)^2$?`,
    [line(left, right, "\\ge"), line(left, right, "\\le"), line(sums, dot, "\\ge"), line(root, ends, "\\ge")],
    [line(left, right, "\\ge"), line(left, right, "\\le"), line(sums, dot, "\\ge"), line(root, ends, "\\ge")],
    [
      `$(${a}^2+${b}^2)(${c}^2+${d}^2)=${left}$.`,
      `$(${a}\\cdot${c}+${b}\\cdot${d})^2=${dot}^2=${right}$, nên $${left}\\ge ${right}$.`,
      `$\\le$ đảo chiều. ${sums} và ${dot} bỏ bình phương. ${root} và ${ends} lấy căn.`,
    ],
    [
      `$(${a}^2+${b}^2)(${c}^2+${d}^2)=${left}$.`,
      `$(${a}\\cdot${c}+${b}\\cdot${d})^2=${dot}^2=${right}$, so $${left}\\ge ${right}$.`,
      `$\\le$ flips the inequality. ${sums} and ${dot} drop the square. ${root} and ${ends} take square roots.`,
    ],
  );
}

function lpStem(question: Question, params: Record<string, number>) {
  const p = read(params, "p");
  const q = read(params, "q");
  const at64 = 6 * p + 4 * q;
  const at80 = 8 * p;
  const at10 = 10 * q;
  const swapped = 6 * q + 4 * p;
  const vi = (value: number, x: number, y: number) => `${value} tại (${x}; ${y})`;
  const en = (value: number, x: number, y: number) => `${value} at (${x}; ${y})`;
  return made(
    question,
    `$x,y\\ge0$, $x+y\\le10$, $2x+y\\le16$, $P=${p}x+${q}y$. $\\max P=?$`,
    `$x,y\\ge0$, $x+y\\le10$, $2x+y\\le16$, $P=${p}x+${q}y$. $\\max P=?$`,
    [vi(at64, 6, 4), vi(at80, 8, 0), vi(at10, 0, 10), vi(swapped, 6, 4)],
    [en(at64, 6, 4), en(at80, 8, 0), en(at10, 0, 10), en(swapped, 6, 4)],
    [
      `Đỉnh: $(0;0),\\ (8;0),\\ (6;4),\\ (0;10)$.`,
      `$P=0,${at80},${at64},${at10}$. $\\max=${at64}$ tại $(6;4)$.`,
      `${at80} và ${at10} là đỉnh kia. ${swapped}=${q}\\cdot6+${p}\\cdot4$: đảo hệ số.`,
    ],
    [
      `Vertices: $(0;0),\\ (8;0),\\ (6;4),\\ (0;10)$.`,
      `$P=0,${at80},${at64},${at10}$. $\\max=${at64}$ at $(6;4)$.`,
      `${at80} and ${at10} are the other vertices. ${swapped}=${q}\\cdot6+${p}\\cdot4$: swapped coefficients.`,
    ],
  );
}

function flipStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const k = read(params, "k");
  const bound = a * k;
  const ineq = (op: string, value: number) => `$x ${op} ${value}$`;
  return made(
    question,
    `Bất đẳng thức $-${a === 1 ? "" : a}x \\le ${bound}$ có nghiệm nào?`,
    `Which set solves $-${a === 1 ? "" : a}x \\le ${bound}$?`,
    [ineq("\\ge", -k), ineq("\\le", -k), ineq("\\ge", k), ineq("\\le", k)],
    [ineq("\\ge", -k), ineq("\\le", -k), ineq("\\ge", k), ineq("\\le", k)],
    [
      `Chia $-${a}$ thì đảo $\\le$.`,
      `$x\\ge ${-k}$.`,
      `${texInt(-k)} với $\\le$: quên đảo. ${texInt(k)}: bỏ dấu, hoặc vừa bỏ dấu vừa quên đảo.`,
    ],
    [
      `Dividing by $-${a}$ flips $\\le$.`,
      `$x\\ge ${-k}$.`,
      `${texInt(-k)} with $\\le$: the inequality was not flipped. ${texInt(k)}: the sign was dropped, or both mistakes were made.`,
    ],
    `Chia $-${a}$ $\\Rightarrow$ đảo $\\le$. Đừng chỉ bỏ dấu.`,
    `Divide by $-${a}$ $\\Rightarrow$ flip $\\le$. Do not only drop the sign.`,
  );
}

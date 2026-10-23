import type { Question } from "../types.ts";
import { pick } from "../../lib/prng.ts";
import { dec1, made, questionById, read } from "./stem.ts";
import { parametric, type Vary } from "./types.ts";

const MEANS = [
  { a: 2, d: 1, m: 20 }, { a: 1, d: 2, m: 15 }, { a: 3, d: 1, m: 15 }, { a: 2, d: 1, m: 10 },
  { a: 4, d: 1, m: 20 }, { a: 1, d: 1, m: 20 }, { a: 3, d: 2, m: 25 }, { a: 5, d: 1, m: 25 },
  { a: 2, d: 3, m: 30 }, { a: 4, d: 2, m: 30 }, { a: 1, d: 3, m: 20 }, { a: 6, d: 1, m: 30 },
  { a: 3, d: 1, m: 20 }, { a: 5, d: 2, m: 30 }, { a: 2, d: 2, m: 16 },
] as const;

export function comboVary(questions: readonly Question[]): Vary[] {
  const q = (id: string) => questionById(questions, id);
  return [
    parametric(q("cmb-perm"), (rng) => ({ n: pick(rng, [5, 6, 7, 8, 4, 9, 10]) }), (params) => permStem(q("cmb-perm"), params)),
    parametric(q("cmb-comb"), (rng) => ({ n: pick(rng, [5, 6, 7, 3, 8, 9, 10]) }), (params) => combStem(q("cmb-comb"), params)),
    parametric(q("cmb-fact"), (rng) => ({ n: pick(rng, [3, 5, 6, 7]) }), (params) => factStem(q("cmb-fact"), params)),
    parametric(q("cmb-mean"), (rng) => pick(rng, MEANS), (params) => meanStem(q("cmb-mean"), params)),
    parametric(q("cmb-comm"), (rng) => ({ n: pick(rng, [8, 6, 7, 5, 9, 10, 11, 12]) }), (params) => commStem(q("cmb-comm"), params)),
    parametric(q("cmb-order"), (rng) => ({ n: pick(rng, [3, 4, 5, 6]) }), (params) => orderStem(q("cmb-order"), params)),
  ];
}

function permStem(question: Question, params: Record<string, number>) {
  const n = read(params, "n");
  const value = n * (n - 1);
  return made(
    question,
    `Chỉnh hợp $A(${n},2)=?$`,
    `Permutation $A(${n},2)=?$`,
    [String(value), String(value / 2), String(n * n), String(n)],
    [String(value), String(value / 2), String(n * n), String(n)],
    [
      `Thứ tự tính, nên nhân $${n}\\cdot${n - 1}$.`,
      `$A(${n},2)=${value}$.`,
      `${value / 2} là tổ hợp. ${n * n} là bình phương. ${n} chỉ là số phần tử.`,
    ],
    [
      `Order counts, so multiply $${n}\\cdot${n - 1}$.`,
      `$A(${n},2)=${value}$.`,
      `${value / 2} is the combination. ${n * n} is the square. ${n} is only the number of items.`,
    ],
    `Thứ tự tính. $${n}\\cdot${n - 1}$.`,
    `Order counts. $${n}\\cdot${n - 1}$.`,
  );
}

function combStem(question: Question, params: Record<string, number>) {
  const n = read(params, "n");
  const value = (n * (n - 1)) / 2;
  return made(
    question,
    `Tổ hợp $C(${n},2)=?$`,
    `Combination $C(${n},2)=?$`,
    [String(value), String(n * (n - 1)), String(n * n), String(2 ** n)],
    [String(value), String(n * (n - 1)), String(n * n), String(2 ** n)],
    [
      `$C(${n},2)=\\dfrac{${n}\\cdot${n - 1}}{2}$.`,
      `Bằng ${value}.`,
      `${n * (n - 1)} là chỉnh hợp. ${n * n} là bình phương. ${2 ** n} là số tập con.`,
    ],
    [
      `$C(${n},2)=\\dfrac{${n}\\cdot${n - 1}}{2}$.`,
      `That is ${value}.`,
      `${n * (n - 1)} is the permutation. ${n * n} is the square. ${2 ** n} is the number of subsets.`,
    ],
  );
}

function factStem(question: Question, params: Record<string, number>) {
  const n = read(params, "n");
  let fact = 1;
  for (let i = 2; i <= n; i += 1) fact *= i;
  return made(
    question,
    `Giai thừa $${n}!=?$`,
    `Factorial $${n}!=?$`,
    [String(fact), String(n * n), String(n), String(2 ** n)],
    [String(fact), String(n * n), String(n), String(2 ** n)],
    [
      `$${n}! = 1\\cdot 2\\cdots ${n}$.`,
      `Bằng ${fact}.`,
      `${n * n} là bình phương. ${n} chưa nhân. ${2 ** n} là lũy thừa.`,
    ],
    [
      `$${n}! = 1\\cdot 2\\cdots ${n}$.`,
      `That is ${fact}.`,
      `${n * n} is the square. ${n} has not been multiplied out. ${2 ** n} is a power.`,
    ],
  );
}

function meanStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const d = read(params, "d");
  const outlier = read(params, "m");
  const terms = [a, a + d, a + 2 * d, a + 3 * d, a + 4 * d];
  const last = terms[4] ?? a;
  const median = a + 2 * d;
  const neighbor = a + 3 * d;
  const mean = (4 * a + 6 * d + outlier) / 5;
  const list = terms.join(",");
  const meanText = (lang: "vi" | "en") => dec1(mean, lang);
  return made(
    question,
    `$${list}$, đổi $${last}\\to${outlier}$. Trung vị?`,
    `$${list}$, change $${last}\\to${outlier}$. Median?`,
    [String(median), meanText("vi"), String(outlier), String(neighbor)],
    [String(median), meanText("en"), String(outlier), String(neighbor)],
    [
      `Dãy mới: $${terms[0]},${terms[1]},${terms[2]},${terms[3]},${outlier}$.`,
      `Giữa $= ${median}$.`,
      `${meanText("vi")} là trung bình. ${outlier} là số lệch. ${neighbor} kề giữa.`,
    ],
    [
      `The new list: $${terms[0]},${terms[1]},${terms[2]},${terms[3]},${outlier}$.`,
      `The middle is ${median}.`,
      `${meanText("en")} is the mean. ${outlier} is the outlier. ${neighbor} sits beside the middle.`,
    ],
  );
}

function commStem(question: Question, params: Record<string, number>) {
  const n = read(params, "n");
  const value = (n * (n - 1) * (n - 2)) / 6;
  const arranged = n * (n - 1) * (n - 2);
  return made(
    question,
    `Chọn $3$ trong $${n}$, không vai. Số cách?`,
    `Choose $3$ of $${n}$, no roles. How many?`,
    [String(value), String(arranged), String(3 * n), String(n)],
    [String(value), String(arranged), String(3 * n), String(n)],
    [
      `$C(${n},3)=\\dfrac{${n}\\cdot${n - 1}\\cdot${n - 2}}{6}$.`,
      `Bằng ${value}.`,
      `${arranged} là $A(${n},3)$. ${3 * n} nhân 3. ${n} là số phần tử.`,
    ],
    [
      `$C(${n},3)=\\dfrac{${n}\\cdot${n - 1}\\cdot${n - 2}}{6}$.`,
      `That is ${value}.`,
      `${arranged} is $A(${n},3)$. ${3 * n} multiplies by 3. ${n} is the number of items.`,
    ],
  );
}

function orderStem(question: Question, params: Record<string, number>) {
  const n = read(params, "n");
  let fact = 1;
  for (let i = 2; i <= n; i += 1) fact *= i;
  return made(
    question,
    `$${n}$ người, $${n}$ ghế. Số cách?`,
    `$${n}$ people, $${n}$ chairs. How many?`,
    [String(fact), String(n), String(n * n), "1"],
    [String(fact), String(n), String(n * n), "1"],
    [
      `Ghế khác nhau, nên lấy giai thừa.`,
      `$${n}! = ${fact}$.`,
      `${n} chưa xếp. ${n * n} là bình phương. 1 là khi không phân biệt ghế.`,
    ],
    [
      `The chairs are distinct, so take the factorial.`,
      `$${n}! = ${fact}$.`,
      `${n} does not arrange them. ${n * n} is the square. 1 is when the chairs are identical.`,
    ],
    `Ghế khác nhau $\\Rightarrow ${n}!$.`,
    `Distinct chairs $\\Rightarrow ${n}!$.`,
  );
}

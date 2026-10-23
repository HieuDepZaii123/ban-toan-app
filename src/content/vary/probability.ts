import type { Question } from "../types.ts";
import { pick } from "../../lib/prng.ts";
import { frac, made, questionById, read, texInt } from "./stem.ts";
import { parametric, type Vary } from "./types.ts";

const FACES = [6, 4, 8, 10, 12, 5, 7, 20] as const;
const BOYS = [2, 3, 4, 5] as const;
const BINOM = [
  { n: 3, k: 2 }, { n: 5, k: 2 }, { n: 5, k: 3 }, { n: 3, k: 1 }, { n: 4, k: 1 },
  { n: 4, k: 3 }, { n: 6, k: 1 }, { n: 6, k: 2 }, { n: 5, k: 1 }, { n: 7, k: 1 },
  { n: 7, k: 2 }, { n: 6, k: 5 },
] as const;
const LEAST = [3, 4, 5, 6, 7] as const;
const BAYES = [
  { pop: 10000, prev: 1, sens: 99, fp: 5 },
  { pop: 10000, prev: 2, sens: 90, fp: 5 },
  { pop: 10000, prev: 1, sens: 80, fp: 4 },
  { pop: 10000, prev: 4, sens: 80, fp: 10 },
  { pop: 10000, prev: 1, sens: 90, fp: 9 },
  { pop: 8000, prev: 5, sens: 75, fp: 10 },
  { pop: 10000, prev: 5, sens: 96, fp: 8 },
  { pop: 10000, prev: 2, sens: 80, fp: 10 },
  { pop: 5000, prev: 4, sens: 90, fp: 8 },
] as const;

const WORD_VI = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy"] as const;

export function probabilityVary(questions: readonly Question[]): Vary[] {
  const q = (id: string) => questionById(questions, id);
  return [
    parametric(q("prob-dice"), (rng) => ({ n: pick(rng, FACES) }), (params) => diceStem(q("prob-dice"), params)),
    parametric(q("prob-count"), (rng) => ({ n: pick(rng, FACES) }), (params) => countStem(q("prob-count"), params)),
    parametric(q("prob-boys"), (rng) => ({ n: pick(rng, BOYS) }), (params) => boysStem(q("prob-boys"), params)),
    parametric(q("prob-bayes"), (rng) => pick(rng, BAYES), (params) => bayesStem(q("prob-bayes"), params)),
    parametric(q("prob-binom"), (rng) => pick(rng, BINOM), (params) => binomStem(q("prob-binom"), params)),
    parametric(q("prob-least"), (rng) => ({ n: pick(rng, LEAST) }), (params) => leastStem(q("prob-least"), params)),
  ];
}

function diceStem(question: Question, params: Record<string, number>) {
  const n = read(params, "n");
  return made(
    question,
    `Tung hai xúc xắc ${n} mặt. Biết có ít nhất một mặt ${n}. Xác suất cả hai đều là ${n} bằng bao nhiêu?`,
    `Two ${n}-sided dice are rolled. Given that at least one face is ${n}, what is the probability that both are ${n}?`,
    [frac(1, 2 * n - 1), frac(1, n), frac(1, n * n), frac(1, 2)],
    [frac(1, 2 * n - 1), frac(1, n), frac(1, n * n), frac(1, 2)],
    [
      `Mẫu gốc có $${n * n}$ cặp.`,
      `Còn $${2 * n - 1}$ cặp có ít nhất một mặt ${n}. Chỉ một cặp là cả hai mặt ${n}.`,
      `Xác suất ${frac(1, 2 * n - 1)}. ${frac(1, n)} coi như đã biết đúng một viên. ${frac(1, n * n)} quên điều kiện. ${frac(1, 2)} là đoán.`,
    ],
    [
      `The original sample has $${n * n}$ pairs.`,
      `$${2 * n - 1}$ pairs have at least one face ${n}. Only one pair is a double ${n}.`,
      `The probability is ${frac(1, 2 * n - 1)}. ${frac(1, n)} pretends a particular die is known. ${frac(1, n * n)} forgets the condition. ${frac(1, 2)} is a guess.`,
    ],
    `Liệt kê các cặp còn lại. Đừng chia cho ${n} hoặc cho ${n * n}.`,
    `List the pairs that remain. Do not divide by ${n} or by ${n * n}.`,
  );
}

function countStem(question: Question, params: Record<string, number>) {
  const n = read(params, "n");
  return made(
    question,
    `Khi biết có ít nhất một mặt ${n} trên hai xúc xắc ${n} mặt, còn lại bao nhiêu cặp?`,
    `Given at least one face ${n} on two ${n}-sided dice, how many pairs remain?`,
    [texInt(2 * n - 1), texInt(2 * n), texInt(n), texInt(n * n)],
    [texInt(2 * n - 1), texInt(2 * n), texInt(n), texInt(n * n)],
    [
      `Mỗi viên có ${n} mặt mang số ${n}, nhưng cặp hai mặt ${n} bị đếm hai lần.`,
      `Còn ${2 * n - 1} cặp.`,
      `${2 * n} quên trừ lần đếm đôi. ${n} chỉ một viên. ${n * n} là mẫu gốc, chưa có điều kiện.`,
    ],
    [
      `Each die has ${n} faces showing ${n}, but the double is counted twice.`,
      `${2 * n - 1} pairs remain.`,
      `${2 * n} forgets to subtract the double count. ${n} is one die. ${n * n} is the original sample, before the condition.`,
    ],
  );
}

function boysStem(question: Question, params: Record<string, number>) {
  const n = read(params, "n");
  const word = WORD_VI[n] ?? String(n);
  const all = n === 2 ? "cả hai" : `cả ${word}`;
  const enCount = ["", "one", "two", "three", "four", "five"][n] ?? String(n);
  const enAll = n === 2 ? "both" : `all ${enCount}`;
  return made(
    question,
    `Một nhà có ${word} con. Biết có ít nhất một bé trai. Xác suất ${all} là trai bằng bao nhiêu?`,
    `A family has ${enCount} children. Given that at least one is a boy, what is the probability that ${enAll} are boys?`,
    [frac(1, 2 ** n - 1), frac(1, 2), frac(1, 2 ** n), frac(2 ** n - 2, 2 ** n - 1)],
    [frac(1, 2 ** n - 1), frac(1, 2), frac(1, 2 ** n), frac(2 ** n - 2, 2 ** n - 1)],
    [
      `Có $${2 ** n}$ khả năng cùng khả năng. Bỏ trường hợp toàn gái.`,
      `Còn $${2 ** n - 1}$ trường hợp, chỉ một trường hợp toàn trai. Xác suất ${frac(1, 2 ** n - 1)}.`,
      `${frac(1, 2)} quên điều kiện. ${frac(1, 2 ** n)} chia cho mẫu gốc. ${frac(2 ** n - 2, 2 ** n - 1)} là xác suất không toàn trai.`,
    ],
    [
      `There are $${2 ** n}$ equally likely outcomes. Drop the all-girls outcome.`,
      `$${2 ** n - 1}$ outcomes remain, and only one is all boys. The probability is ${frac(1, 2 ** n - 1)}.`,
      `${frac(1, 2)} forgets the condition. ${frac(1, 2 ** n)} divides by the original sample. ${frac(2 ** n - 2, 2 ** n - 1)} is the probability they are not all boys.`,
    ],
    n === 2
      ? question.hint
      : `Có ${2 ** n} khả năng cùng khả năng. Bỏ trường hợp toàn gái, còn ${2 ** n - 1}.`,
    n === 2
      ? question.hintEn
      : `There are ${2 ** n} equally likely outcomes. Drop the all-girls outcome, leaving ${2 ** n - 1}.`,
  );
}

function bayesStem(question: Question, params: Record<string, number>) {
  const pop = read(params, "pop");
  const prev = read(params, "prev");
  const sens = read(params, "sens");
  const fp = read(params, "fp");
  const spec = 100 - fp;
  const sick = Math.round((pop * prev) / 100);
  const tp = Math.round((sick * sens) / 100);
  const well = pop - sick;
  const falsePos = Math.round((well * fp) / 100);
  const posterior = frac(tp, tp + falsePos);
  const percent = (n: number) => `$${n}\\%$`;
  return made(
    question,
    `Trong $${pop}$ người có $${prev}\\%$ bệnh. Xét nghiệm phát hiện $${sens}\\%$ người bệnh và báo dương nhầm $${fp}\\%$ người khỏe. Biết kết quả dương, xác suất người đó bệnh là bao nhiêu?`,
    `Of $${pop}$ people, $${prev}\\%$ are ill. A test detects $${sens}\\%$ of ill people and gives a false positive for $${fp}\\%$ of healthy people. Given a positive result, what is the probability the person is ill?`,
    [posterior, percent(sens), percent(prev), percent(spec)],
    [posterior, percent(sens), percent(prev), percent(spec)],
    [
      `Người bệnh thật dương: ${tp}. Người khỏe dương nhầm: ${falsePos}.`,
      `Xác suất hậu nghiệm $\\dfrac{${tp}}{${tp}+${falsePos}} = ${posterior}$.`,
      `$${sens}\\%$ là độ nhạy. $${prev}\\%$ là tỷ lệ bệnh ban đầu. $${spec}\\%$ là độ đặc hiệu, không phải xác suất hậu nghiệm.`,
    ],
    [
      `True positives: ${tp}. False positives: ${falsePos}.`,
      `The posterior probability is $\\dfrac{${tp}}{${tp}+${falsePos}} = ${posterior}$.`,
      `$${sens}\\%$ is the sensitivity. $${prev}\\%$ is the base rate. $${spec}\\%$ is the specificity, not the posterior probability.`,
    ],
    `Đếm số người dương thật và số người dương giả. Mẫu số là tổng hai số đó.`,
    `Count the true positives and the false positives. The denominator is their sum.`,
  );
}

function binomStem(question: Question, params: Record<string, number>) {
  const n = read(params, "n");
  const k = read(params, "k");
  const ways = comb(n, k);
  const word = WORD_VI[k] ?? String(k);
  return made(
    question,
    `Tung một đồng xu cân đối ${n} lần. Xác suất đúng ${word} mặt ngửa bằng bao nhiêu?`,
    `A fair coin is tossed ${n} times. What is the probability of exactly ${k} heads?`,
    [frac(ways, 2 ** n), frac(1, 2), frac(1, 2 ** n), frac(2, 3)],
    [frac(ways, 2 ** n), frac(1, 2), frac(1, 2 ** n), frac(2, 3)],
    [
      `Có $C(${n}, ${k}) = ${ways}$ dãy.`,
      `Mỗi dãy có xác suất $\\dfrac{1}{${2 ** n}}$. Nhân lại: ${frac(ways, 2 ** n)}.`,
      `${frac(1, 2)} là một lần tung. ${frac(1, 2 ** n)} quên số dãy. ${frac(2, 3)} không ra từ đồng xu cân đối.`,
    ],
    [
      `There are $C(${n}, ${k}) = ${ways}$ sequences.`,
      `Each sequence has probability $\\dfrac{1}{${2 ** n}}$. The product is ${frac(ways, 2 ** n)}.`,
      `${frac(1, 2)} is one toss. ${frac(1, 2 ** n)} forgets the number of sequences. ${frac(2, 3)} does not come from a fair coin.`,
    ],
    `Có $C(${n}, ${k})$ dãy. Mỗi dãy có xác suất $1/${2 ** n}$.`,
    `There are $C(${n}, ${k})$ sequences. Each has probability $1/${2 ** n}$.`,
  );
}

function leastStem(question: Question, params: Record<string, number>) {
  const n = read(params, "n");
  return made(
    question,
    `Cùng ${n} lần tung đồng xu cân đối. Xác suất có ít nhất một mặt ngửa bằng bao nhiêu?`,
    `Same ${n} tosses of a fair coin. What is the probability of at least one head?`,
    [frac(2 ** n - 1, 2 ** n), frac(1, 2), frac(n, 2 ** n), frac(1, 2 ** n)],
    [frac(2 ** n - 1, 2 ** n), frac(1, 2), frac(n, 2 ** n), frac(1, 2 ** n)],
    [
      `Phần bù: không có mặt ngửa nào, xác suất $\\dfrac{1}{${2 ** n}}$.`,
      `$1 - \\dfrac{1}{${2 ** n}} = ${frac(2 ** n - 1, 2 ** n)}$.`,
      `${frac(1, 2)} là một lần tung. ${frac(n, 2 ** n)} là đúng một mặt ngửa. ${frac(1, 2 ** n)} là toàn sấp.`,
    ],
    [
      `The complement, no heads at all, has probability $\\dfrac{1}{${2 ** n}}$.`,
      `$1 - \\dfrac{1}{${2 ** n}} = ${frac(2 ** n - 1, 2 ** n)}$.`,
      `${frac(1, 2)} is one toss. ${frac(n, 2 ** n)} is exactly one head. ${frac(1, 2 ** n)} is all tails.`,
    ],
  );
}

function comb(n: number, k: number): number {
  let c = 1;
  for (let i = 0; i < k; i += 1) c = (c * (n - i)) / (i + 1);
  return Math.round(c);
}

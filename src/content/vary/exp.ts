import type { Question } from "../types.ts";
import { pick } from "../../lib/prng.ts";
import { aboutMoney, amount, dec1, made, questionById, read, texInt } from "./stem.ts";
import { parametric, type Vary } from "./types.ts";

const POWERS = [
  { a: 2, b: 3 }, { a: 2, b: 5 }, { a: 3, b: 2 }, { a: 3, b: 4 }, { a: 4, b: 3 },
  { a: 5, b: 2 }, { a: 5, b: 3 }, { a: 6, b: 2 }, { a: 2, b: 6 }, { a: 3, b: 5 },
  { a: 4, b: 5 }, { a: 5, b: 4 },
] as const;

const LOGS = [
  { a: 2, k: 3 }, { a: 2, k: 4 }, { a: 2, k: 5 }, { a: 3, k: 4 }, { a: 3, k: 5 },
  { a: 4, k: 3 }, { a: 5, k: 3 }, { a: 6, k: 3 }, { a: 2, k: 6 }, { a: 3, k: 6 },
  { a: 4, k: 5 }, { a: 5, k: 4 }, { a: 7, k: 3 },
] as const;

const SUMS = [
  { m: 2, n: 3 }, { m: 2, n: 4 }, { m: 2, n: 5 }, { m: 3, n: 4 }, { m: 3, n: 5 },
  { m: 4, n: 5 }, { m: 2, n: 6 }, { m: 3, n: 6 }, { m: 4, n: 6 }, { m: 5, n: 6 },
  { m: 2, n: 7 }, { m: 3, n: 7 }, { m: 5, n: 7 }, { m: 2, n: 8 }, { m: 4, n: 7 },
] as const;

const COMPOUND = [
  { p: 10, r: 8, t: 5 }, { p: 10, r: 5, t: 4 }, { p: 10, r: 6, t: 5 }, { p: 10, r: 10, t: 4 },
  { p: 20, r: 5, t: 4 }, { p: 10, r: 4, t: 5 }, { p: 8, r: 5, t: 5 }, { p: 5, r: 8, t: 5 },
  { p: 10, r: 5, t: 5 }, { p: 10, r: 8, t: 3 }, { p: 10, r: 6, t: 4 }, { p: 15, r: 8, t: 5 },
  { p: 10, r: 8, t: 6 },
] as const;

const DOUBLES = [8, 4, 5, 20, 25] as const;

const DECAYS = [
  { m: 80, h: 10, k: 2 }, { m: 40, h: 5, k: 2 }, { m: 80, h: 5, k: 2 }, { m: 160, h: 10, k: 2 },
  { m: 160, h: 10, k: 3 }, { m: 80, h: 10, k: 3 }, { m: 40, h: 10, k: 3 }, { m: 160, h: 20, k: 2 },
  { m: 80, h: 20, k: 3 }, { m: 40, h: 5, k: 3 }, { m: 160, h: 5, k: 2 }, { m: 80, h: 5, k: 3 },
  { m: 120, h: 10, k: 2 }, { m: 100, h: 10, k: 2 },
] as const;

export function expVary(questions: readonly Question[]): Vary[] {
  const q = (id: string) => questionById(questions, id);
  return [
    parametric(q("exp-power"), (rng) => pick(rng, POWERS), (params) => powerStem(q("exp-power"), params)),
    parametric(q("exp-log"), (rng) => pick(rng, LOGS), (params) => logStem(q("exp-log"), params)),
    parametric(q("exp-sum"), (rng) => pick(rng, SUMS), (params) => sumStem(q("exp-sum"), params)),
    parametric(q("exp-compound"), (rng) => pick(rng, COMPOUND), (params) => compoundStem(q("exp-compound"), params)),
    parametric(q("exp-double"), (rng) => ({ r: pick(rng, DOUBLES) }), (params) => doubleStem(q("exp-double"), params)),
    parametric(q("exp-decay"), (rng) => pick(rng, DECAYS), (params) => decayStem(q("exp-decay"), params)),
  ];
}

function powerStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const b = read(params, "b");
  const value = a ** b;
  return made(
    question,
    `$${a}^{${b}}$ bằng bao nhiêu?`,
    `What is $${a}^{${b}}$?`,
    [texInt(value), texInt(a * b), texInt(b ** a), texInt(a + b)],
    [texInt(value), texInt(a * b), texInt(b ** a), texInt(a + b)],
    [
      `Mũ là nhân ${a} với chính nó, ${b} lần.`,
      `$${a}^{${b}} = ${value}$.`,
      `${a * b} là tích. ${b ** a} đổi chỗ hai số. ${a + b} là tổng.`,
    ],
    [
      `The exponent multiplies ${a} by itself, ${b} times.`,
      `$${a}^{${b}} = ${value}$.`,
      `${a * b} is the product. ${b ** a} swaps the two numbers. ${a + b} is the sum.`,
    ],
  );
}

function logStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const k = read(params, "k");
  const arg = a ** k;
  const prev = a ** (k - 1);
  return made(
    question,
    `$\\log_${a} ${arg}$ bằng bao nhiêu?`,
    `What is $\\log_${a} ${arg}$?`,
    [texInt(k), texInt(arg), texInt(a), texInt(prev)],
    [texInt(k), texInt(arg), texInt(a), texInt(prev)],
    [
      `Hỏi mũ: $${a}$ mũ mấy thì ra ${arg}.`,
      `$${a}^{${k}} = ${arg}$, nên logarit bằng ${k}.`,
      `${arg} là chính đối số. ${a} là cơ số. ${prev} = $${a}^{${k - 1}}$, thiếu một lần nhân.`,
    ],
    [
      `Ask for the exponent: which power of $${a}$ equals ${arg}.`,
      `$${a}^{${k}} = ${arg}$, so the logarithm is ${k}.`,
      `${arg} is the argument itself. ${a} is the base. ${prev} = $${a}^{${k - 1}}$, one factor short.`,
    ],
    `Hỏi mũ: ${a} mũ mấy thì ra ${arg}.`,
    `Ask for the exponent: which power of ${a} equals ${arg}.`,
  );
}

function sumStem(question: Question, params: Record<string, number>) {
  const m = read(params, "m");
  const n = read(params, "n");
  return made(
    question,
    `$\\log ${m} + \\log ${n}$ bằng bao nhiêu?`,
    `What is $\\log ${m} + \\log ${n}$?`,
    [`$\\log ${m * n}$`, `$\\log ${m + n}$`, `$\\log ${m} \\cdot \\log ${n}$`, texInt(m + n)],
    [`$\\log ${m * n}$`, `$\\log ${m + n}$`, `$\\log ${m} \\cdot \\log ${n}$`, texInt(m + n)],
    [
      `Hai log cùng cơ số: cộng thành log của tích.`,
      `$\\log ${m} + \\log ${n} = \\log(${m}\\cdot${n}) = \\log ${m * n}$.`,
      `$\\log ${m + n}$ cộng trong log. Tích hai log không gộp được. ${m + n} bỏ cả log.`,
    ],
    [
      `Same base: a sum of logs is the log of the product.`,
      `$\\log ${m} + \\log ${n} = \\log(${m}\\cdot${n}) = \\log ${m * n}$.`,
      `$\\log ${m + n}$ adds inside the log. The product of the logs does not combine. ${m + n} drops the log.`,
    ],
  );
}

function compoundStem(question: Question, params: Record<string, number>) {
  const p = read(params, "p");
  const r = read(params, "r");
  const t = read(params, "t");
  const grown = p * (1 + r / 100) ** t;
  const simple = p * (1 + (r / 100) * t);
  const rate = (r / 100).toFixed(2).replace(".", "{,}");
  const rateEn = (r / 100).toFixed(2);
  return made(
    question,
    `Gửi ${p} triệu, lãi kép ${r}% mỗi năm. Sau ${t} năm có khoảng bao nhiêu?`,
    `${p} triệu is invested at ${r}% compound interest per year. About how much is there after ${t} years?`,
    [aboutMoney(grown, "vi"), amount(simple, "vi"), amount(p + r, "vi"), amount(r * t, "vi")],
    [aboutMoney(grown, "en"), amount(simple, "en"), amount(p + r, "en"), amount(r * t, "en")],
    [
      `Lãi kép: $${p} \\times (1{,}${String(r).padStart(2, "0")})^{${t}}$.`,
      `Kết quả khoảng ${moneyPlain(grown)} triệu.`,
      `${amount(simple, "vi")} là lãi đơn. ${amount(p + r, "vi")} là $${p} + ${r}$. ${amount(r * t, "vi")} là $${r} \\times ${t}$.`,
    ],
    [
      `Compound interest: $${p} \\times (1.${String(r).padStart(2, "0")})^{${t}}$.`,
      `The result is about ${moneyPlain(grown, "en")} triệu.`,
      `${amount(simple, "en")} is simple interest. ${amount(p + r, "en")} is $${p} + ${r}$. ${amount(r * t, "en")} is $${r} \\times ${t}$.`,
    ],
    `Nhân (1${rate.slice(1)}) đúng ${t} lần. Đừng cộng ${r}% của vốn gốc mỗi năm.`,
    `Multiply by (1${rateEn.slice(1)}), ${t} times. Do not add ${r}% of the original principal each year.`,
  );
}

function moneyPlain(n: number, lang: "vi" | "en" = "vi"): string {
  return (Math.round(n * 100) / 100).toFixed(2).replace(".", lang === "vi" ? "{,}" : ".");
}

function doubleStem(question: Question, params: Record<string, number>) {
  const r = read(params, "r");
  const years = Math.round(Math.log(2) / Math.log(1 + r / 100));
  const rule = 100 / r;
  const about = (n: number, lang: "vi" | "en") => (lang === "vi" ? `Khoảng ${n} năm` : `About ${n} years`);
  const plain = (n: number, lang: "vi" | "en") => {
    const text = dec1(n, lang);
    return lang === "vi" ? `${text} năm` : `${text} years`;
  };
  return made(
    question,
    `Lãi kép ${r}% mỗi năm. Khoảng bao lâu thì một khoản gấp đôi?`,
    `Compound interest is ${r}% per year. About how long until an amount doubles?`,
    [about(years, "vi"), plain(r, "vi"), plain(rule, "vi"), plain(10, "vi")],
    [about(years, "en"), plain(r, "en"), plain(rule, "en"), plain(10, "en")],
    [
      `$(1 + ${r}/100)^t = 2$, nên $t = \\ln 2 / \\ln(1 + ${r}/100)$.`,
      `Giá trị đó khoảng ${years} năm.`,
      `${r} năm lấy nhầm số phần trăm. ${dec1(rule, "vi")} là $100/${r}$. 10 năm không phải nghiệm.`,
    ],
    [
      `$(1 + ${r}/100)^t = 2$, so $t = \\ln 2 / \\ln(1 + ${r}/100)$.`,
      `That value is about ${years} years.`,
      `${r} years copies the percent. ${dec1(rule, "en")} is $100/${r}$. 10 years is not the solution.`,
    ],
    `Giải $(1 + ${r}/100)^t = 2$. Lấy logarit, đừng lấy 100 chia cho ${r}.`,
    `Solve $(1 + ${r}/100)^t = 2$. Take a logarithm. Do not divide 100 by ${r}.`,
  );
}

function decayStem(question: Question, params: Record<string, number>) {
  const m = read(params, "m");
  const h = read(params, "h");
  const k = read(params, "k");
  const left = m / 2 ** k;
  const once = m / 2;
  const linear = m - k * h;
  const elapsed = k * h;
  const gram = (n: number) => `${n} g`;
  return made(
    question,
    `Một mẫu ${m} g có chu kỳ bán rã ${h} năm. Sau ${elapsed} năm còn bao nhiêu?`,
    `A sample of ${m} g has a half-life of ${h} years. How much is left after ${elapsed} years?`,
    [gram(left), gram(once), gram(0), gram(linear)],
    [gram(left), gram(once), gram(0), gram(linear)],
    [
      `${elapsed} năm là ${k} lần bán rã. Mỗi lần còn một nửa.`,
      `Còn $${m} \\times (1/2)^{${k}} = ${left}$ g.`,
      `${once} g mới qua một chu kỳ. 0 g là trừ hết. ${linear} g giảm đều, không phải phân rã.`,
    ],
    [
      `${elapsed} years is ${k} half-lives. Each one leaves a half.`,
      `$${m} \\times (1/2)^{${k}} = ${left}$ g remain.`,
      `${once} g is only one half-life. 0 g subtracts the sample away. ${linear} g is a steady drop, which is not decay.`,
    ],
    `${elapsed} năm là ${k} lần bán rã. Mỗi lần còn một nửa.`,
    `${elapsed} years is ${k} half-lives. Each one leaves a half.`,
  );
}

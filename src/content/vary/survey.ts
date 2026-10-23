import type { Question } from "../types.ts";
import { pick } from "../../lib/prng.ts";
import { atX, made, questionById, radFrac, read } from "./stem.ts";
import { fixedVary, parametric, type Vary } from "./types.ts";

const CUBICS = [1, 4, 9, 16, 25] as const;

export function surveyVary(questions: readonly Question[]): Vary[] {
  const q = (id: string) => questionById(questions, id);
  return [
    parametric(q("surv-max"), (rng) => ({ p: pick(rng, CUBICS) }), (params) => maxStem(q("surv-max"), params)),
    parametric(q("surv-min"), (rng) => ({ p: pick(rng, CUBICS) }), (params) => minStem(q("surv-min"), params)),
    parametric(q("surv-roots"), (rng) => ({ p: pick(rng, CUBICS) }), (params) => rootsStem(q("surv-roots"), params)),
    parametric(q("surv-mono"), (rng) => ({ p: pick(rng, CUBICS) }), (params) => monoStem(q("surv-mono"), params)),
    fixedVary(q("surv-flat")),
    parametric(q("surv-cross"), (rng) => ({ a: pick(rng, [1, 2, 3, 4, 5]) }), (params) => crossStem(q("surv-cross"), params)),
  ];
}

function scale(params: Record<string, number>): { p: number; s: number; value: number; coef: string } {
  const p = read(params, "p");
  const s = Math.round(Math.sqrt(p));
  const coef = 3 * p === 3 ? "3" : String(3 * p);
  return { p, s, value: 2 * p * s, coef };
}

function maxStem(question: Question, params: Record<string, number>) {
  const { s, value, coef } = scale(params);
  return made(
    question,
    `Hàm $y = x^3 - ${coef}x$ đạt cực đại tại đâu, và giá trị ấy bằng bao nhiêu?`,
    `Where does $y = x^3 - ${coef}x$ reach its maximum, and what is that value?`,
    [atX(value, -s, "vi"), atX(-value, -s, "vi"), atX(0, 0, "vi"), atX(value, s, "vi")],
    [atX(value, -s, "en"), atX(-value, -s, "en"), atX(0, 0, "en"), atX(value, s, "en")],
    [
      `$y' = 3x^2 - ${coef}$ bằng 0 tại $x = ${-s}$ và $x = ${s}$.`,
      `Tại $x = ${-s}$, $y'$ đổi từ dương sang âm. $y(${-s}) = ${value}$.`,
      `Đổi dấu giá trị, hoặc lấy $x = 0$, hoặc đặt cực đại sang $x = ${s}$, ra các đáp án còn lại.`,
    ],
    [
      `$y' = 3x^2 - ${coef}$ is 0 at $x = ${-s}$ and $x = ${s}$.`,
      `At $x = ${-s}$, $y'$ changes from positive to negative. $y(${-s}) = ${value}$.`,
      `Flipping the sign of the value, using $x = 0$, or moving the maximum to $x = ${s}$, produces the other answers.`,
    ],
  );
}

function minStem(question: Question, params: Record<string, number>) {
  const { s, value, coef } = scale(params);
  return made(
    question,
    `Cùng hàm $y = x^3 - ${coef}x$. Cực tiểu bằng bao nhiêu, và tại đâu?`,
    `Same function $y = x^3 - ${coef}x$. What is the minimum, and where?`,
    [atX(-value, s, "vi"), atX(value, s, "vi"), atX(-value, -s, "vi"), atX(0, 0, "vi")],
    [atX(-value, s, "en"), atX(value, s, "en"), atX(-value, -s, "en"), atX(0, 0, "en")],
    [
      `$y'$ đổi từ âm sang dương tại $x = ${s}$.`,
      `$y(${s}) = ${-value}$.`,
      `Đổi dấu, hoặc lấy điểm cực đại $x = ${-s}$, hoặc $x = 0$, ra các đáp án còn lại.`,
    ],
    [
      `$y'$ changes from negative to positive at $x = ${s}$.`,
      `$y(${s}) = ${-value}$.`,
      `Flipping the sign, taking the maximum at $x = ${-s}$, or using $x = 0$, produces the other answers.`,
    ],
  );
}

function rootsStem(question: Question, params: Record<string, number>) {
  const { s, coef } = scale(params);
  const list = `${radFrac(-s, 3, 1)}, $0$, ${radFrac(s, 3, 1)}`;
  const critical = `$${ -s }$, $0$, $${s}$`;
  return made(
    question,
    `Nghiệm của $y = x^3 - ${coef}x$ là những số nào?`,
    `What are the roots of $y = x^3 - ${coef}x$?`,
    [list, critical, `$\\pm ${s}$`, "Không có nghiệm"],
    [list, critical, `$\\pm ${s}$`, "No solution"],
    [
      `$y = x(x^2 - ${3 * read(params, "p")})$.`,
      `Nghiệm $x = 0$ và $x = \\pm ${radFrac(s, 3, 1).slice(1, -1)}$.`,
      `${critical} là điểm dừng của đạo hàm. $\\pm ${s}$ chỉ hai trong ba nghiệm nếu bỏ căn, hoặc chỉ các điểm dừng.`,
    ],
    [
      `$y = x(x^2 - ${3 * read(params, "p")})$.`,
      `The roots are $x = 0$ and $x = \\pm ${radFrac(s, 3, 1).slice(1, -1)}$.`,
      `${critical} is where the derivative stops. $\\pm ${s}$ keeps the stationary points, or drops the square root.`,
    ],
    `Đặt y = 0 và phân tích $x(x^2 - ${3 * read(params, "p")})$. Đừng lấy nghiệm của đạo hàm.`,
    `Set y = 0 and factor $x(x^2 - ${3 * read(params, "p")})$. Do not take the roots of the derivative.`,
  );
}

function monoStem(question: Question, params: Record<string, number>) {
  const { s, coef } = scale(params);
  const outer = (lang: "vi" | "en") =>
    lang === "vi"
      ? `$(-\\infty; -${s}]$ và $[${s}; +\\infty)$`
      : `$(-\\infty; -${s}]$ and $[${s}; +\\infty)$`;
  return made(
    question,
    `$y = x^3 - ${coef}x$ đồng biến trên tập nào?`,
    `On which set is $y = x^3 - ${coef}x$ increasing?`,
    [outer("vi"), `$[-${s}; ${s}]$`, `$\\mathbb{R}$`, `$(-${s}; ${s})$`],
    [outer("en"), `$[-${s}; ${s}]$`, `$\\mathbb{R}$`, `$(-${s}; ${s})$`],
    [
      `$y' = 3(x-${s})(x+${s})$ dương khi $x < ${-s}$ hoặc $x > ${s}$.`,
      `Kể cả hai điểm dừng, tập đồng biến là ${outer("vi")}.`,
      `$[-${s}; ${s}]$ là nơi nghịch biến. Cả $\\mathbb{R}$ là đồng biến của $y = x^3$. $(-${s}; ${s})$ nằm trong miền giảm.`,
    ],
    [
      `$y' = 3(x-${s})(x+${s})$ is positive when $x < ${-s}$ or $x > ${s}$.`,
      `Including the stationary points, the increasing set is ${outer("en")}.`,
      `$[-${s}; ${s}]$ is where it decreases. All of $\\mathbb{R}$ is the increasing set of $y = x^3$. $(-${s}; ${s})$ sits inside the decreasing part.`,
    ],
  );
}

function crossStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const height = 2 * a;
  return made(
    question,
    `Điểm $(${a}; ${height})$ có thuộc đồ thị $y = \\dfrac{x^2}{x-${a}}$ không?`,
    `Does the point $(${a}; ${height})$ lie on the graph of $y = \\dfrac{x^2}{x-${a}}$?`,
    [
      `Không, vì x = ${a} không thuộc tập xác định`,
      "Có, vì đó là giao của hai tiệm cận",
      `Có, y(${a}) = ${height}`,
      `Có, y(${a}) = 0`,
    ],
    [
      `No, because x = ${a} is not in the domain`,
      "Yes, because the asymptotes cross there",
      `Yes, y(${a}) = ${height}`,
      `Yes, y(${a}) = 0`,
    ],
    [
      `Mẫu $x - ${a}$ bằng 0 khi $x = ${a}$, nên hàm không xác định tại đó.`,
      `Tiệm cận đứng $x = ${a}$ và tiệm cận xiên $y = x + ${a}$ cắt nhau tại $(${a}; ${height})$. Điểm cắt không tự động nằm trên đồ thị.`,
      `Cả hai câu gán giá trị đều giả định hàm có nghĩa tại ${a}.`,
    ],
    [
      `The denominator $x - ${a}$ is 0 at $x = ${a}$, so the function is undefined there.`,
      `The vertical asymptote $x = ${a}$ and the oblique asymptote $y = x + ${a}$ meet at $(${a}; ${height})$. That crossing is not automatically on the graph.`,
      `Both assigned values assume the function has a value at ${a}.`,
    ],
    `Xem mẫu số tại $x = ${a}$ trước khi thế vào tử.`,
    `Look at the denominator at $x = ${a}$ before substituting into the numerator.`,
  );
}

import type { Question } from "../types.ts";
import type { Stem } from "./types.ts";

const R = String.raw;

export function questionById(questions: readonly Question[], id: string): Question {
  const found = questions.find((item) => item.id === id);
  if (!found) throw new Error(id);
  return found;
}

export function read(params: Record<string, number>, key: string): number {
  const value = params[key];
  if (value === undefined || !Number.isFinite(value)) throw new Error(key);
  return value;
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const next = x % y;
    x = y;
    y = next;
  }
  return x || 1;
}

export function texInt(n: number): string {
  return `$${n}$`;
}

/** Reduced fraction. The sign sits outside `\dfrac`. */
export function frac(num: number, den: number): string {
  if (den < 0) {
    num = -num;
    den = -den;
  }
  const g = gcd(num, den);
  const n = num / g;
  const d = den / g;
  if (d === 1) return texInt(n);
  const sign = n < 0 ? "-" : "";
  return `$${sign}\\dfrac{${Math.abs(n)}}{${d}}$`;
}

/** `coef * sqrt(rad) / den`. `rad === null` is an ordinary integer. */
export function radFrac(coef: number, rad: number | null, den: number): string {
  const sign = coef < 0 ? "-" : "";
  const mag = Math.abs(coef);
  const top = rad === null ? String(mag) : mag === 1 ? `\\sqrt{${rad}}` : `${mag}\\sqrt{${rad}}`;
  if (den === 1) return `$${sign}${top}$`;
  return `$${sign}\\dfrac{${top}}{${den}}$`;
}

/** Reduced `num/den * π`, π kept in the numerator. */
export function piFrac(num: number, den: number): string {
  if (den < 0) {
    num = -num;
    den = -den;
  }
  const g = gcd(num, den);
  const n = num / g;
  const d = den / g;
  const sign = n < 0 ? "-" : "";
  const mag = Math.abs(n);
  const body = mag === 1 ? "\\pi" : `${mag}\\pi`;
  if (d === 1) return `$${sign}${body}$`;
  return `$${sign}\\dfrac{${body}}{${d}}$`;
}

export function dec1(n: number, lang: "vi" | "en"): string {
  if (Number.isInteger(n)) return String(n);
  const text = (Math.round(n * 10) / 10).toFixed(1);
  return lang === "vi" ? text.replace(".", ",") : text;
}

/** A decimal written inside math: Vietnamese `{,}`, English dot. */
export function mathDec(n: number, lang: "vi" | "en"): string {
  if (Number.isInteger(n)) return String(n);
  const text = (Math.round(n * 10) / 10).toFixed(1);
  return lang === "vi" ? text.replace(".", "{,}") : text;
}

export function money2(n: number, lang: "vi" | "en"): string {
  return (Math.round(n * 100) / 100).toFixed(2).replace(".", lang === "vi" ? "," : ".");
}

export function amount(n: number, lang: "vi" | "en"): string {
  const rounded = Math.round(n * 100) / 100;
  let text: string;
  if (Math.abs(rounded - Math.round(rounded)) < 1e-9) text = String(Math.round(rounded));
  else if (Math.abs(rounded * 10 - Math.round(rounded * 10)) < 1e-9) text = (Math.round(rounded * 10) / 10).toFixed(1);
  else text = rounded.toFixed(2);
  if (lang === "vi") text = text.replace(".", ",");
  return `${text} triệu`;
}

export function aboutMoney(n: number, lang: "vi" | "en"): string {
  const shown = money2(n, lang);
  return lang === "vi" ? `Khoảng ${shown} triệu` : `About ${shown} triệu`;
}

export function joinAnd(left: string, right: string, lang: "vi" | "en"): string {
  return lang === "vi" ? `${left} và ${right}` : `${left} and ${right}`;
}

export function point(x: number, y: number, lang: "vi" | "en"): string {
  return lang === "vi" ? `$(${x}; ${y})$` : `$(${x}, ${y})$`;
}

export function pointSemi(x: number, y: number): string {
  return R`$(${x};\ ${y})$`;
}

export function point3(x: number, y: number, z: number): string {
  return R`$(${x};\ ${y};\ ${z})$`;
}

export function atX(value: number, x: number, lang: "vi" | "en"): string {
  return lang === "vi" ? `${texInt(value)} tại $x = ${x}$` : `${texInt(value)} at $x = ${x}$`;
}

export function metres2(n: number): string {
  return `$${n}\\text{ m}^2$`;
}

export function metres(n: number): string {
  return `$${n}\\text{ m}$`;
}

export function seconds(n: number): string {
  return `$t = ${n}\\text{ s}$`;
}

export function celsius(n: number): string {
  return `$${n}^\\circ\\text{C}$`;
}

export function cm3(inner: string): string {
  return `$${inner}\\text{ cm}^3$`;
}

/** Monic quadratic x² + bx + c. */
export function quadPoly(b: number, c: number): string {
  return `x^2${lin(b, "x")}${lin(c, "")}`;
}

/** a x² + b x + c with a > 0. */
export function generalQuad(a: number, b: number, c: number): string {
  const head = a === 1 ? "x^2" : `${a}x^2`;
  return `${head}${lin(b, "x")}${lin(c, "")}`;
}

function lin(coef: number, unit: string): string {
  if (coef === 0) return "";
  const abs = Math.abs(coef);
  const body = unit === "" ? String(abs) : abs === 1 ? unit : `${abs}${unit}`;
  return coef < 0 ? ` - ${body}` : ` + ${body}`;
}

export function vertexForm(a: number, h: number, k: number): string {
  const aText = a === -1 ? "-" : String(a);
  const inner = h === 0 ? "x" : h > 0 ? `(x - ${h})` : `(x + ${-h})`;
  return `${aText}${inner}^2${lin(k, "")}`;
}

export function made(
  question: Question,
  prompt: string,
  promptEn: string,
  choices: [string, string, string, string],
  choicesEn: [string, string, string, string],
  steps: [string, string, string],
  stepsEn: [string, string, string],
  hint = question.hint,
  hintEn = question.hintEn,
): Stem {
  return {
    id: question.id,
    prompt,
    promptEn,
    choices,
    choicesEn,
    hint,
    hintEn,
    steps,
    stepsEn,
  };
}

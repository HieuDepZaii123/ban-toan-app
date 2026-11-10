/**
 * Exact numbers for the tutor. Language models slip on arithmetic (a live reply hinted "Δ = 9"
 * for x² − 5x + 6 = 0, where Δ = 1). When the student's message holds a linear or quadratic
 * equation in x, the server computes Δ, Δ' and the roots exactly and hands them to the model.
 */

type Frac = { n: number; d: number };

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

function frac(n: number, d = 1): Frac {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}

const add = (x: Frac, y: Frac): Frac => frac(x.n * y.d + y.n * x.d, x.d * y.d);
const mul = (x: Frac, y: Frac): Frac => frac(x.n * y.n, x.d * y.d);
const neg = (x: Frac): Frac => frac(-x.n, x.d);
const isZero = (x: Frac): boolean => x.n === 0;

function tex(x: Frac): string {
  if (x.d === 1) return String(x.n);
  return `${x.n < 0 ? "-" : ""}\\frac{${Math.abs(x.n)}}{${x.d}}`;
}

function parseNumber(raw: string): Frac | null {
  if (/^\d+\/\d+$/.test(raw)) {
    const [n, d] = raw.split("/").map(Number);
    return d ? frac(n!, d!) : null;
  }
  if (/^\d+(\.\d+)?$/.test(raw)) {
    const [whole, part = ""] = raw.split(".");
    const d = 10 ** part.length;
    return frac(Number(whole) * d + Number(part || 0), d);
  }
  return null;
}

/** Coefficients [c, b, a] of one side, or null when the side is not a polynomial of degree ≤ 2 in x. */
function parseSide(side: string): Frac[] | null {
  if (!side) return null;
  const coeffs = [frac(0), frac(0), frac(0)];
  const terms = side.replace(/-/g, "+-").split("+").filter((part) => part !== "");
  for (const term of terms) {
    const m = /^(-?)(\d+(?:\.\d+)?(?:\/\d+)?)?\*?(x(?:\^([12]))?)?$/.exec(term);
    if (!m || (!m[2] && !m[3])) return null;
    let value = m[2] ? parseNumber(m[2]) : frac(1);
    if (!value) return null;
    if (m[1]) value = neg(value);
    const power = m[3] ? Number(m[4] ?? 1) : 0;
    coeffs[power] = add(coeffs[power]!, value);
  }
  return coeffs;
}

function normalize(text: string): string {
  return text
    .replace(/\$/g, " ")
    .replace(/\\cdot|×|·/g, "*")
    .replace(/[−–—]/g, "-")
    .replace(/²/g, "^2")
    .replace(/\^\{(\d)\}/g, "^$1")
    .replace(/(\d),(\d)/g, "$1.$2")
    .replace(/X/g, "x");
}

export type Equation = { a: Frac; b: Frac; c: Frac };

/** The first linear or quadratic equation in x found in the text. */
export function findEquation(text: string): Equation | null {
  const flat = normalize(text).replace(/\s+/g, "");
  for (const match of flat.matchAll(/[-+*/^.\dx]+=[-+*/^.\dx]+/g)) {
    const [left, right] = match[0].split("=");
    if (!left?.includes("x") && !right?.includes("x")) continue;
    const l = parseSide(left ?? "");
    const r = parseSide(right ?? "");
    if (!l || !r) continue;
    const [c, b, a] = [0, 1, 2].map((i) => add(l[i]!, neg(r[i]!)));
    if (isZero(a!) && isZero(b!)) continue;
    return { a: a!, b: b!, c: c! };
  }
  return null;
}

/** √(p/q) with q a perfect square after scaling: returns k·√m over den, all integers, m square-free. */
function sqrtParts(x: Frac): { k: number; m: number; den: number } {
  // √(n/d) = √(n·d) / d
  let m = x.n * x.d;
  let k = 1;
  for (let f = 2; f * f <= m; f += 1) {
    while (m % (f * f) === 0) {
      m /= f * f;
      k *= f;
    }
  }
  return { k, m, den: x.d };
}

function equationTex({ a, b, c }: Equation): string {
  const parts: string[] = [];
  const term = (coef: Frac, body: string) => {
    if (isZero(coef)) return;
    const sign = coef.n < 0 ? "-" : parts.length ? "+" : "";
    const abs = frac(Math.abs(coef.n), coef.d);
    const shown = body && abs.n === 1 && abs.d === 1 ? "" : tex(abs);
    parts.push(`${sign}${shown}${body}`);
  };
  term(a, "x^2");
  term(b, "x");
  term(c, "");
  return `${parts.join(" ") || "0"} = 0`;
}

export function equationFacts(eq: Equation): string {
  const { a, b, c } = eq;
  const lines = [`Phương trình đưa về dạng $${equationTex(eq)}$.`];
  if (isZero(a)) {
    lines.push(`Phương trình bậc nhất: $x = ${tex(mul(neg(c), frac(b.d, b.n)))}$.`);
    return lines.join("\n");
  }
  lines.push(`$a = ${tex(a)}$, $b = ${tex(b)}$, $c = ${tex(c)}$.`);
  const delta = add(mul(b, b), neg(mul(frac(4), mul(a, c))));
  lines.push(`$\\Delta = b^2 - 4ac = ${tex(delta)}$.`);
  const half = mul(b, frac(1, 2));
  if (half.d === 1) lines.push(`$b' = ${tex(half)}$, $\\Delta' = b'^2 - ac = ${tex(add(mul(half, half), neg(mul(a, c))))}$.`);
  const twoA = mul(frac(2), a);
  if (delta.n < 0) {
    lines.push("$\\Delta < 0$: phương trình vô nghiệm (trong tập số thực).");
  } else if (delta.n === 0) {
    lines.push(`$\\Delta = 0$: nghiệm kép $x = ${tex(mul(neg(b), frac(twoA.d, twoA.n)))}$.`);
  } else {
    const { k, m, den } = sqrtParts(delta);
    if (m === 1) {
      const root = frac(k, den);
      const x1 = mul(add(neg(b), neg(root)), frac(twoA.d, twoA.n));
      const x2 = mul(add(neg(b), root), frac(twoA.d, twoA.n));
      const [lo, hi] = x1.n / x1.d <= x2.n / x2.d ? [x1, x2] : [x2, x1];
      lines.push(`$\\Delta > 0$, $\\sqrt{\\Delta} = ${tex(root)}$: hai nghiệm $x_1 = ${tex(lo)}$, $x_2 = ${tex(hi)}$.`);
    } else {
      // x = (-b ± √Δ) / 2a with √Δ = (k/den)√m, rewritten as (P ± Q√m) / R in integers.
      const L = (b.d * den) / gcd(b.d, den);
      let P = ((-b.n * L) / b.d) * a.d;
      let Q = ((k * L) / den) * a.d;
      let R = L * 2 * a.n;
      const g = gcd(gcd(P, Q), R);
      [P, Q, R] = [P / g, Q / g, R / g];
      if (R < 0) [P, R] = [-P, -R];
      Q = Math.abs(Q);
      const top = `${P === 0 ? "" : P} \\pm ${Q === 1 ? "" : Q}\\sqrt{${m}}`.trim();
      const shown = R === 1 ? top : `\\frac{${top}}{${R}}`;
      lines.push(`$\\Delta > 0$, $\\sqrt{\\Delta}$ không nguyên: hai nghiệm $x = ${shown}$.`);
    }
  }
  if (delta.n >= 0) lines.push(`Vi-ét: $x_1 + x_2 = ${tex(mul(neg(b), frac(a.d, a.n)))}$, $x_1 x_2 = ${tex(mul(c, frac(a.d, a.n)))}$.`);
  return lines.join("\n");
}

/** Block appended to the instructions, or "" when no equation was found. */
export function verifiedNote(text: string): string {
  const eq = findEquation(text);
  if (!eq) return "";
  return `\n\nSố liệu đã kiểm / Verified numbers (server tính chính xác). Mọi con số bạn nêu phải khớp các số này; không tự tính ra số khác. Vẫn gợi ý từng bước, không chốt đáp án nếu học sinh chưa hỏi:\n${equationFacts(eq)}`;
}

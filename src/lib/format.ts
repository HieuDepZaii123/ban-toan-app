/** Plain-text numbers for the desk: Vietnamese comma, true minus, trimmed zeros. */

export function fmt(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  const p = 10 ** digits;
  let rounded = Math.round((n + Number.EPSILON) * p) / p;
  if (Object.is(rounded, -0)) rounded = 0;
  let text = rounded.toFixed(digits);
  if (digits > 0) text = text.replace(/0+$/, "").replace(/\.$/, "");
  if (text === "-0") text = "0";
  return text.replace(".", ",").replace("-", "−");
}

/** Textbook radicals when the value really is one: √2, √3, 18√2. Otherwise the usual comma. */
export function showExact(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const sign = n < 0 ? "−" : "";
  const value = Math.abs(n);
  if (value < 1e-9) return "0";
  for (const rad of [2, 3, 5, 6, 7, 10, 29]) {
    const coeff = value / Math.sqrt(rad);
    const nearest = Math.round(coeff);
    if (nearest >= 1 && nearest <= 40 && Math.abs(coeff - nearest) < 1e-6) {
      return sign + (nearest === 1 ? `√${rad}` : `${nearest}√${rad}`);
    }
  }
  return fmt(n);
}

export function snap(value: number, step: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  const n = Math.round(value / step) * step;
  const clamped = Math.min(max, Math.max(min, n));
  return Math.round(clamped * 1e6) / 1e6;
}

/** ax² + bx + c, omitting zero terms and a coefficient of 1. */
export function quadText(a: number, b: number, c: number): string {
  if (Math.abs(a) < 1e-9) {
    if (Math.abs(b) < 1e-9) return `y = ${fmt(c)}`;
    return `y = ${signed(b, "x", true)}${c === 0 ? "" : signed(c, "", false)}`;
  }
  return `y = ${signed(a, "x²", true)}${signed(b, "x", false)}${c === 0 ? "" : signed(c, "", false)}`;
}

/** a(x − h)² + k. Changing a does not move the vertex. */
export function vertexText(a: number, h: number, k: number): string {
  const absA = Math.abs(a);
  const aPart = absA < 1e-9 ? "0·" : fmt(absA) === "1" ? (a < 0 ? "−" : "") : fmt(a);
  let inner = "x";
  if (fmt(h) !== "0") inner = h > 0 ? `(x − ${fmt(h)})` : `(x + ${fmt(Math.abs(h))})`;
  const body = `${aPart}${inner}²`;
  if (fmt(k) === "0") return `y = ${body}`;
  return `y = ${body}${k > 0 ? ` + ${fmt(k)}` : ` − ${fmt(Math.abs(k))}`}`;
}

function signed(n: number, unit: string, first: boolean): string {
  if (Math.abs(n) < 1e-9) return "";
  const neg = n < 0;
  const abs = fmt(Math.abs(n));
  const showCoef = unit === "" || abs !== "1";
  const body = `${showCoef ? abs : ""}${unit}`;
  if (first) return `${neg ? "−" : ""}${body}`;
  return `${neg ? " − " : " + "}${body}`;
}

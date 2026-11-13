/** Dạng đúng của một kết quả: phân số, căn, bội của π. Dùng cho phím đổi S⇔D. */
import { gcd } from "./evaluate.ts";

export type Fraction = { n: number; d: number };

/** Phân số gần nhất bằng liên phân số; chỉ nhận khi sai khác không đáng kể. */
export function toFraction(value: number, maxDen = 10000): Fraction | null {
  if (!Number.isFinite(value) || Math.abs(value) > 1e9) return null;
  const sign = value < 0 ? -1 : 1;
  let x = Math.abs(value);
  let [h0, h1, k0, k1] = [0, 1, 1, 0];
  for (let i = 0; i < 40; i += 1) {
    const a = Math.floor(x);
    const h2 = a * h1 + h0;
    const k2 = a * k1 + k0;
    if (k2 > maxDen) break;
    [h0, h1, k0, k1] = [h1, h2, k1, k2];
    const rest = x - a;
    if (rest < 1e-12) break;
    x = 1 / rest;
  }
  if (k1 === 0) return null;
  const close = Math.abs(Math.abs(value) - h1 / k1) <= 1e-11 * Math.max(1, Math.abs(value));
  return close ? { n: sign * h1, d: k1 } : null;
}

function squareFree(n: number): [number, number] {
  let outside = 1;
  let inside = n;
  for (let p = 2; p * p <= inside; p += 1) {
    while (inside % (p * p) === 0) {
      outside *= p;
      inside /= p * p;
    }
  }
  return [outside, inside];
}

function fracTex(n: number, d: number): string {
  if (d === 1) return String(n);
  return `${n < 0 ? "-" : ""}\\dfrac{${Math.abs(n)}}{${d}}`;
}

/**
 * Trả về công thức TeX của dạng đúng, hoặc null nếu số không có dạng gọn.
 * Thử lần lượt: phân số, bội hữu tỉ của π, và căn bậc hai của một số hữu tỉ.
 */
export function exactTex(value: number): string | null {
  if (!Number.isFinite(value) || value === 0) return null;
  const frac = toFraction(value, 9999);
  if (frac) return frac.d === 1 ? null : fracTex(frac.n, frac.d);

  const overPi = toFraction(value / Math.PI, 360);
  if (overPi) {
    const top = Math.abs(overPi.n) === 1 ? (overPi.n < 0 ? "-\\pi" : "\\pi") : `${overPi.n}\\pi`;
    return overPi.d === 1 ? top : `${overPi.n < 0 ? "-" : ""}\\dfrac{${Math.abs(overPi.n) === 1 ? "" : Math.abs(overPi.n)}\\pi}{${overPi.d}}`;
  }

  const square = toFraction(value * value, 9999);
  if (square && square.n > 0) {
    // √(n/d) = √(n·d)/d, rồi đưa thừa số chính phương ra ngoài.
    const [outside, inside] = squareFree(square.n * square.d);
    if (inside === 1) return null;
    const common = gcd(outside, square.d);
    const top = outside / common;
    const bottom = square.d / common;
    const surd = `${top === 1 ? "" : top}\\sqrt{${inside}}`;
    const sign = value < 0 ? "-" : "";
    return bottom === 1 ? `${sign}${surd}` : `${sign}\\dfrac{${surd}}{${bottom}}`;
  }
  return null;
}

/** Số thập phân theo cách viết Việt Nam, dùng trong công thức KaTeX. */
export function numberTex(value: number, digits = 10): string {
  if (!Number.isFinite(value)) return "";
  const rounded = Number(value.toPrecision(digits));
  if (rounded === 0) return "0";
  const size = Math.abs(rounded);
  // Số rất lớn hoặc rất nhỏ viết theo dạng a·10^n cho dễ đọc.
  if (size >= 1e12 || size < 1e-6) {
    const [mantissa = "", power = "0"] = rounded.toExponential(digits - 1).split("e");
    const trimmed = mantissa.includes(".") ? mantissa.replace(/0+$/, "").replace(/\.$/, "") : mantissa;
    return `${trimmed.replace(".", "{,}")}\\cdot 10^{${Number(power)}}`;
  }
  return rounded.toString().replace(".", "{,}");
}

/** Số có dạng đúng thì hiện dạng đúng, không thì hiện số thập phân. */
export function niceTex(value: number): string {
  return exactTex(value) ?? numberTex(value);
}

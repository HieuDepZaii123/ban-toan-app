/** Số học: phân tích thừa số nguyên tố, ước, đổi cơ số. */

export const FACTOR_LIMIT = 1e12;

/** Phân tích n thành các cặp [số nguyên tố, số mũ]. Trả về null nếu n không phải số nguyên từ 2 đến 10¹². */
export function factorize(n: number): [number, number][] | null {
  if (!Number.isInteger(n) || n < 2 || n > FACTOR_LIMIT) return null;
  const out: [number, number][] = [];
  let rest = n;
  for (let p = 2; p * p <= rest; p += p === 2 ? 1 : 2) {
    if (rest % p !== 0) continue;
    let power = 0;
    while (rest % p === 0) {
      rest /= p;
      power += 1;
    }
    out.push([p, power]);
  }
  if (rest > 1) out.push([rest, 1]);
  return out;
}

export function isPrime(n: number): boolean {
  const factors = factorize(n);
  return factors !== null && factors.length === 1 && factors[0]?.[1] === 1;
}

export function divisorCount(factors: [number, number][]): number {
  return factors.reduce((count, [, power]) => count * (power + 1), 1);
}

/** Mọi ước dương, tăng dần. Chỉ liệt kê khi không quá 200 ước. */
export function divisors(n: number): number[] | null {
  const factors = factorize(n);
  if (n === 1) return [1];
  if (!factors || divisorCount(factors) > 200) return null;
  let list = [1];
  for (const [p, power] of factors) {
    const next: number[] = [];
    let scale = 1;
    for (let k = 0; k <= power; k += 1) {
      for (const d of list) next.push(d * scale);
      scale *= p;
    }
    list = next;
  }
  return list.sort((a, b) => a - b);
}

export function factorTex(factors: [number, number][]): string {
  return factors.map(([p, power]) => (power === 1 ? String(p) : `${p}^{${power}}`)).join("\\cdot ");
}

const DIGITS = "0123456789ABCDEF";

/** Đổi một số nguyên không âm viết ở cơ số `from` sang cơ số `to` (2, 8, 10 hoặc 16). */
export function convertBase(text: string, from: number, to: number): string | null {
  const clean = text.trim().toUpperCase();
  if (!clean) return null;
  let value = 0n;
  for (const ch of clean) {
    const digit = DIGITS.indexOf(ch);
    if (digit < 0 || digit >= from) return null;
    value = value * BigInt(from) + BigInt(digit);
  }
  if (value === 0n) return "0";
  let out = "";
  const base = BigInt(to);
  while (value > 0n) {
    out = DIGITS[Number(value % base)] + out;
    value /= base;
  }
  return out;
}

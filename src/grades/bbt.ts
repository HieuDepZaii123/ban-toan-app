/**
 * Bảng biến thiên của hàm bậc ba y = x³ − 3sx² + 3abx + c với a < b và a + b = 2s (hệ số nguyên),
 * có y' = 3(x − a)(x − b): đồng biến trên (−∞; a), nghịch biến trên (a; b), đồng biến trên (b; +∞).
 * Dùng chung cho câu trắc nghiệm và câu Đúng/Sai của đề thi thử, nên bảng và đáp số luôn khớp nhau.
 */
export type Bbt = { a: number; b: number; c: number; M: number; m: number; poly: string; table: string; plot: string };

const value = (a: number, b: number, c: number, x: number): number => x ** 3 - (3 * (a + b) * x * x) / 2 + 3 * a * b * x + c;

/** Dấu cộng, trừ trong hệ số: 3x² + 5x − 2 viết thành "+5x", "-2". */
const signed = (n: number): string => (n < 0 ? `-${-n}` : `+${n}`);

export function bbt(a: number, b: number, c: number): Bbt {
  if ((a + b) % 2 !== 0 || a >= b) throw new Error("cần a < b và a + b chẵn");
  const s = (a + b) / 2;
  const q = 3 * a * b;
  const M = value(a, b, c, a);
  const m = value(a, b, c, b);
  const quad = s === 0 ? "" : `${signed(-3 * s)}x^2`;
  const lin = q === 0 ? "" : `${signed(q)}x`;
  const con = c === 0 ? "" : signed(c);
  const poly = `x^3${quad}${lin}${con}`;
  const table = String.raw`\begin{array}{c|ccccccc} x & -\infty & & ${a} & & ${b} & & +\infty \\ \hline f'(x) & & + & 0 & - & 0 & + & \\ \hline f(x) & & \nearrow & ${M} & \searrow & ${m} & \nearrow & \end{array}`;
  const plot = `{{plot:1,${-3 * s},${q},${c}|${a - 2}|${b + 2}|${Math.floor(m) - 4}|${Math.ceil(M) + 4}}}`;
  return { a, b, c, M, m, poly, table, plot };
}

/** Biểu thức sympy của hàm số, để đối chiếu độc lập. */
export function bbtSympy(a: number, b: number, c: number): string {
  return `(x**3-Rational(3*(${a}+${b}),2)*x**2+3*${a}*${b}*x+(${c}))`;
}

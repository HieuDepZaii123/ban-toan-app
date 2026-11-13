/** Thống kê một biến và hồi quy tuyến tính, theo cách tính của chương trình phổ thông Việt Nam. */

export type Summary = {
  n: number;
  sum: number;
  mean: number;
  min: number;
  max: number;
  range: number;
  median: number;
  q1: number;
  q3: number;
  modes: number[];
  variance: number;
  sd: number;
  sampleVariance: number | null;
  sampleSd: number | null;
};

/** Đọc dãy số ngăn bằng chấm phẩy, dấu cách hoặc xuống dòng. Dấu phẩy là dấu thập phân. */
export function parseNumbers(text: string): { values: number[]; bad: string[] } {
  const values: number[] = [];
  const bad: string[] = [];
  for (const raw of text.split(/[;\s]+/)) {
    const item = raw.trim();
    if (!item) continue;
    const value = Number(item.replace(",", ".").replace("−", "-"));
    if (Number.isFinite(value) && /^[-+]?(\d+([.,]\d*)?|[.,]\d+)$/.test(item.replace("−", "-"))) values.push(value);
    else bad.push(item);
  }
  return { values, bad };
}

function medianOf(sorted: number[]): number {
  const n = sorted.length;
  if (n === 0) return Number.NaN;
  const mid = Math.floor(n / 2);
  return n % 2 === 1 ? (sorted[mid] as number) : ((sorted[mid - 1] as number) + (sorted[mid] as number)) / 2;
}

export function summarize(values: number[]): Summary | null {
  const n = values.length;
  if (n === 0) return null;
  const sorted = values.slice().sort((a, b) => a - b);
  const sum = values.reduce((s, x) => s + x, 0);
  const mean = sum / n;
  const squares = values.reduce((s, x) => s + (x - mean) ** 2, 0);
  // Tứ phân vị theo sách giáo khoa: trung vị của nửa dưới và nửa trên, bỏ số chính giữa khi n lẻ.
  const half = Math.floor(n / 2);
  const lower = sorted.slice(0, half);
  const upper = sorted.slice(n % 2 === 1 ? half + 1 : half);
  const counts = new Map<number, number>();
  for (const x of values) counts.set(x, (counts.get(x) ?? 0) + 1);
  const top = Math.max(...counts.values());
  const modes = top > 1 ? [...counts].filter(([, c]) => c === top).map(([x]) => x).sort((a, b) => a - b) : [];
  return {
    n, sum, mean,
    min: sorted[0] as number,
    max: sorted[n - 1] as number,
    range: (sorted[n - 1] as number) - (sorted[0] as number),
    median: medianOf(sorted),
    q1: n >= 2 ? medianOf(lower) : (sorted[0] as number),
    q3: n >= 2 ? medianOf(upper) : (sorted[0] as number),
    modes,
    variance: squares / n,
    sd: Math.sqrt(squares / n),
    sampleVariance: n > 1 ? squares / (n - 1) : null,
    sampleSd: n > 1 ? Math.sqrt(squares / (n - 1)) : null,
  };
}

export type Regression = { a: number; b: number; r: number; n: number };

/** Đường thẳng y = ax + b khớp nhất theo bình phương tối thiểu, và hệ số tương quan r. */
export function linearRegression(xs: number[], ys: number[]): Regression | null {
  const n = Math.min(xs.length, ys.length);
  if (n < 2) return null;
  const mx = xs.slice(0, n).reduce((s, v) => s + v, 0) / n;
  const my = ys.slice(0, n).reduce((s, v) => s + v, 0) / n;
  let sxx = 0, syy = 0, sxy = 0;
  for (let i = 0; i < n; i += 1) {
    const dx = (xs[i] as number) - mx;
    const dy = (ys[i] as number) - my;
    sxx += dx * dx;
    syy += dy * dy;
    sxy += dx * dy;
  }
  if (sxx === 0) return null;
  const a = sxy / sxx;
  return { a, b: my - a * mx, r: syy === 0 ? 0 : sxy / Math.sqrt(sxx * syy), n };
}

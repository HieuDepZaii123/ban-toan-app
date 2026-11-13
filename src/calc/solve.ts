/** Giải phương trình, hệ phương trình và các phép tính giải tích số của máy tính. */

export type Complex = { re: number; im: number };

const clean = (value: number): number => (Math.abs(value) < 1e-12 ? 0 : value);

export type QuadraticResult =
  | { kind: "not-quadratic" }
  | { kind: "two"; delta: number; roots: [number, number] }
  | { kind: "double"; delta: number; root: number }
  | { kind: "complex"; delta: number; roots: [Complex, Complex] };

/** ax² + bx + c = 0 với a ≠ 0. Tính theo cách tránh mất chữ số khi b² rất lớn so với 4ac. */
export function solveQuadratic(a: number, b: number, c: number): QuadraticResult {
  if (a === 0) return { kind: "not-quadratic" };
  const delta = b * b - 4 * a * c;
  if (Math.abs(delta) < 1e-12 * Math.max(1, b * b)) return { kind: "double", delta: 0, root: clean(-b / (2 * a)) };
  if (delta < 0) {
    const re = clean(-b / (2 * a));
    const im = Math.sqrt(-delta) / (2 * Math.abs(a));
    return { kind: "complex", delta, roots: [{ re, im }, { re, im: -im }] };
  }
  const q = -0.5 * (b + (b >= 0 ? 1 : -1) * Math.sqrt(delta));
  const x1 = clean(q / a);
  const x2 = clean(q === 0 ? 0 : c / q);
  return { kind: "two", delta, roots: x1 <= x2 ? [x1, x2] : [x2, x1] };
}

/** ax³ + bx² + cx + d = 0 với a ≠ 0: trả về các nghiệm thực phân biệt, tăng dần. */
export function solveCubic(a: number, b: number, c: number, d: number): number[] | null {
  if (a === 0) return null;
  const p = b / a;
  const q = c / a;
  const r = d / a;
  // x = t − p/3 đưa về t³ + At + B = 0
  const A = q - (p * p) / 3;
  const B = (2 * p * p * p) / 27 - (p * q) / 3 + r;
  const disc = (B * B) / 4 + (A * A * A) / 27;
  const shift = -p / 3;
  let roots: number[];
  if (Math.abs(disc) < 1e-12) {
    roots = Math.abs(B) < 1e-12 ? [shift] : [Math.cbrt(-B / 2) * 2 + shift, -Math.cbrt(-B / 2) + shift];
  } else if (disc > 0) {
    const s = Math.sqrt(disc);
    roots = [Math.cbrt(-B / 2 + s) + Math.cbrt(-B / 2 - s) + shift];
  } else {
    const radius = 2 * Math.sqrt(-A / 3);
    const angle = Math.acos(Math.max(-1, Math.min(1, (3 * B) / (A * radius)))) / 3;
    roots = [0, 1, 2].map((k) => radius * Math.cos(angle - (2 * Math.PI * k) / 3) + shift);
  }
  // Một bước Newton cho từng nghiệm để gọn sai số làm tròn.
  const polished = roots.map((x) => {
    const f = ((a * x + b) * x + c) * x + d;
    const slope = (3 * a * x + 2 * b) * x + c;
    return clean(slope === 0 ? x : x - f / slope);
  });
  const unique: number[] = [];
  for (const x of polished.sort((m, n) => m - n)) {
    if (!unique.some((seen) => Math.abs(seen - x) < 1e-8 * Math.max(1, Math.abs(x)))) unique.push(x);
  }
  return unique;
}

export type SystemResult = { kind: "unique"; values: number[] } | { kind: "none" } | { kind: "infinite" };

/** Hệ phương trình bậc nhất n ẩn bằng khử Gauss có chọn trụ. Mỗi hàng là [hệ số…, vế phải]. */
export function solveSystem(rows: number[][]): SystemResult {
  const n = rows.length;
  const m = rows.map((row) => row.slice());
  const scale = Math.max(1, ...m.flat().map(Math.abs));
  const tiny = 1e-11 * scale;
  let rank = 0;
  for (let col = 0; col < n && rank < n; col += 1) {
    let pivot = rank;
    for (let r = rank + 1; r < n; r += 1) if (Math.abs(m[r]?.[col] ?? 0) > Math.abs(m[pivot]?.[col] ?? 0)) pivot = r;
    if (Math.abs(m[pivot]?.[col] ?? 0) < tiny) continue;
    [m[rank], m[pivot]] = [m[pivot] as number[], m[rank] as number[]];
    const lead = m[rank] as number[];
    for (let r = 0; r < n; r += 1) {
      if (r === rank) continue;
      const row = m[r] as number[];
      const factor = (row[col] ?? 0) / (lead[col] ?? 1);
      if (factor === 0) continue;
      for (let k = col; k <= n; k += 1) row[k] = (row[k] ?? 0) - factor * (lead[k] ?? 0);
    }
    rank += 1;
  }
  if (rank < n) {
    const contradiction = m.some((row) => row.slice(0, n).every((v) => Math.abs(v) < tiny) && Math.abs(row[n] ?? 0) > tiny);
    return contradiction ? { kind: "none" } : { kind: "infinite" };
  }
  const values = new Array<number>(n).fill(0);
  for (const row of m) {
    const col = row.findIndex((v, k) => k < n && Math.abs(v) >= tiny);
    if (col >= 0) values[col] = clean((row[n] ?? 0) / (row[col] ?? 1));
  }
  return { kind: "unique", values };
}

type Fn = (x: number) => number | null;

/** Đạo hàm tại một điểm bằng sai phân trung tâm kèm ngoại suy Richardson. */
export function derivativeAt(f: Fn, x: number): number | null {
  const h = 1e-3 * Math.max(1, Math.abs(x));
  const at = (t: number) => f(t);
  const a = at(x + h), b = at(x - h), c = at(x + h / 2), d = at(x - h / 2);
  if (a === null || b === null || c === null || d === null) return null;
  const coarse = (a - b) / (2 * h);
  const fine = (c - d) / h;
  return clean((4 * fine - coarse) / 3);
}

/** Tích phân xác định bằng quy tắc Simpson thích nghi. */
export function integrate(f: Fn, from: number, to: number): number | null {
  if (from === to) return 0;
  let failed = false;
  const g = (x: number): number => {
    const y = f(x);
    if (y === null) failed = true;
    return y ?? 0;
  };
  const simpson = (a: number, fa: number, b: number, fb: number): [number, number, number] => {
    const mid = (a + b) / 2;
    const fm = g(mid);
    return [mid, fm, ((b - a) / 6) * (fa + 4 * fm + fb)];
  };
  const walk = (a: number, fa: number, b: number, fb: number, mid: number, fm: number, whole: number, eps: number, depth: number): number => {
    const [lm, flm, left] = simpson(a, fa, mid, fm);
    const [rm, frm, right] = simpson(mid, fm, b, fb);
    const delta = left + right - whole;
    if (depth <= 0 || Math.abs(delta) <= 15 * eps) return left + right + delta / 15;
    return walk(a, fa, mid, fm, lm, flm, left, eps / 2, depth - 1) + walk(mid, fm, b, fb, rm, frm, right, eps / 2, depth - 1);
  };
  const fa = g(from);
  const fb = g(to);
  const [mid, fm, whole] = simpson(from, fa, to, fb);
  const value = walk(from, fa, to, fb, mid, fm, whole, 1e-10, 22);
  return failed || !Number.isFinite(value) ? null : clean(value);
}

/** Tìm một nghiệm của f(x) = 0 gần x0: nới khoảng cho tới khi đổi dấu, rồi chia đôi. */
export function findRoot(f: Fn, x0: number): number | null {
  const y0 = f(x0);
  if (y0 === 0) return x0;
  let step = 0.1 * Math.max(1, Math.abs(x0));
  for (let i = 0; i < 60; i += 1) {
    for (const [lo, hi] of [[x0 - step, x0], [x0, x0 + step]] as const) {
      const a = f(lo);
      const b = f(hi);
      if (a === null || b === null) continue;
      if (a === 0) return clean(lo);
      if (b === 0) return clean(hi);
      if (a * b < 0) {
        let left = lo, right = hi, fl = a;
        for (let k = 0; k < 200; k += 1) {
          const mid = (left + right) / 2;
          const fm = f(mid);
          if (fm === null) return null;
          if (fm === 0 || right - left < 1e-13 * Math.max(1, Math.abs(mid))) return clean(mid);
          if (fl * fm < 0) right = mid;
          else { left = mid; fl = fm; }
        }
        return clean((left + right) / 2);
      }
    }
    step *= 1.6;
  }
  return null;
}

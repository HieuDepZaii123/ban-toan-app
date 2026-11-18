/**
 * Thuật toán thật cho phần «Suy từ số 0». Mọi hàm ở đây là hàm thuần (không đụng DOM), được
 * scripts/algo.test.ts đối chiếu với công thức. Hình trong trang chạy đúng các hàm này, không có số nào
 * được gõ sẵn: đổi tham số là kết quả tính lại.
 */

export type Fn = (x: number) => number;

/* ---------- Đạo hàm bằng cát tuyến: định nghĩa viết thành mã ---------- */

/** Độ dốc cát tuyến qua (x; f(x)) và (x+h; f(x+h)). Thu h dần về 0 thì ra đạo hàm. */
export function secantSlope(f: Fn, x: number, h: number): number {
  return (f(x + h) - f(x)) / h;
}

/** Dãy độ dốc khi bước h giảm một nửa mỗi lần: ta nhìn thấy nó dồn về đạo hàm. */
export function slopeSequence(f: Fn, x: number, h0: number, rounds: number): { h: number; slope: number }[] {
  const rows: { h: number; slope: number }[] = [];
  let h = h0;
  for (let i = 0; i < rounds; i++) {
    rows.push({ h, slope: secantSlope(f, x, h) });
    h /= 2;
  }
  return rows;
}

/* ---------- Hạ gradient: bóng lăn xuống đáy thung lũng ---------- */

export type DescentStep = { x: number; y: number; slope: number };

/** Mỗi bước: đo độ dốc tại chỗ rồi bước ngược chiều dốc một đoạn lr·dốc. Dừng sớm khi dốc gần 0. */
export function gradientDescent(f: Fn, x0: number, lr: number, steps: number, h = 1e-5): DescentStep[] {
  const path: DescentStep[] = [];
  let x = x0;
  for (let i = 0; i <= steps; i++) {
    const slope = (f(x + h) - f(x - h)) / (2 * h);
    path.push({ x, y: f(x), slope });
    if (!Number.isFinite(x) || Math.abs(slope) < 1e-9) break;
    x -= lr * slope;
  }
  return path;
}

/** Hạ gradient trên hàm bậc hai y = ax²+bx+c cho thấy nó rơi đúng vào đỉnh −b/(2a) khi a > 0. */
export function descendQuadratic(a: number, b: number, c: number, x0: number, lr: number, steps: number): DescentStep[] {
  return gradientDescent((x) => a * x * x + b * x + c, x0, lr, steps);
}

/* ---------- Chia đôi: tìm nghiệm mà không giải ---------- */

export type BisectStep = { lo: number; hi: number; mid: number; fmid: number };

export function bisection(f: Fn, lo: number, hi: number, rounds: number): BisectStep[] {
  if (f(lo) * f(hi) > 0) return [];
  const rows: BisectStep[] = [];
  let a = lo;
  let b = hi;
  for (let i = 0; i < rounds; i++) {
    const mid = (a + b) / 2;
    const fmid = f(mid);
    rows.push({ lo: a, hi: b, mid, fmid });
    if (fmid === 0) break;
    if (f(a) * fmid < 0) b = mid;
    else a = mid;
  }
  return rows;
}

/* ---------- Tích phân: cộng các dải mỏng ---------- */

export function riemann(f: Fn, a: number, b: number, n: number, rule: "left" | "right" | "mid" = "mid"): number {
  const dx = (b - a) / n;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const x = rule === "left" ? a + i * dx : rule === "right" ? a + (i + 1) * dx : a + (i + 0.5) * dx;
    sum += f(x) * dx;
  }
  return sum;
}

/* ---------- Monte Carlo: ném phi tiêu ---------- */

export function monteCarloArea(f: Fn, a: number, b: number, top: number, throws: number, rng: () => number): { hits: number; area: number } {
  let hits = 0;
  for (let i = 0; i < throws; i++) {
    const x = a + rng() * (b - a);
    const y = rng() * top;
    if (y <= f(x)) hits++;
  }
  return { hits, area: (hits / throws) * (b - a) * top };
}

/** Ném phi tiêu vào hình vuông cạnh 2, đếm phần rơi vào đường tròn bán kính 1: tỉ lệ ≈ π/4. */
export function estimatePi(throws: number, rng: () => number): number {
  let inside = 0;
  for (let i = 0; i < throws; i++) {
    const x = rng() * 2 - 1;
    const y = rng() * 2 - 1;
    if (x * x + y * y <= 1) inside++;
  }
  return (4 * inside) / throws;
}

/** Ném điểm vào hộp lập phương cạnh 2, đếm phần rơi vào quả cầu bán kính 1: thể tích ≈ 8·(tỉ lệ). */
export function estimateBallVolume(throws: number, rng: () => number): number {
  let inside = 0;
  for (let i = 0; i < throws; i++) {
    const x = rng() * 2 - 1;
    const y = rng() * 2 - 1;
    const z = rng() * 2 - 1;
    if (x * x + y * y + z * z <= 1) inside++;
  }
  return (8 * inside) / throws;
}

/** Tổng hai xúc xắc: đếm chính xác 36 cặp, và mô phỏng. */
export function twoDiceExact(): number[] {
  const counts = Array<number>(13).fill(0);
  for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) counts[a + b] = (counts[a + b] ?? 0) + 1;
  return counts;
}

export function twoDiceSimulate(throws: number, rng: () => number): number[] {
  const counts = Array<number>(13).fill(0);
  for (let i = 0; i < throws; i++) {
    const s = 2 + Math.floor(rng() * 6) + Math.floor(rng() * 6);
    counts[s] = (counts[s] ?? 0) + 1;
  }
  return counts;
}

/** Xác suất có ít nhất một lần thành công trong n lần, đo bằng mô phỏng. */
export function atLeastOneSimulate(p: number, n: number, trials: number, rng: () => number): number {
  let ok = 0;
  for (let t = 0; t < trials; t++) {
    let any = false;
    for (let i = 0; i < n && !any; i++) if (rng() < p) any = true;
    if (any) ok++;
  }
  return ok / trials;
}

/* ---------- Đếm: máy liệt kê ---------- */

/** Thuật toán Heap: sinh mọi hoán vị, mỗi bước đổi chỗ đúng hai phần tử. */
export function permutations<T>(items: readonly T[]): T[][] {
  const arr = [...items];
  const out: T[][] = [];
  const n = arr.length;
  const c = Array<number>(n).fill(0);
  out.push([...arr]);
  let i = 1;
  while (i < n) {
    if ((c[i] ?? 0) < i) {
      const k = i % 2 === 0 ? 0 : (c[i] ?? 0);
      [arr[k], arr[i]] = [arr[i] as T, arr[k] as T];
      out.push([...arr]);
      c[i] = (c[i] ?? 0) + 1;
      i = 1;
    } else {
      c[i] = 0;
      i++;
    }
  }
  return out;
}

/** Mọi cách chọn k phần tử không kể thứ tự, theo thứ tự từ điển. */
export function combinations<T>(items: readonly T[], k: number): T[][] {
  const out: T[][] = [];
  const pick = (start: number, chosen: T[]) => {
    if (chosen.length === k) {
      out.push([...chosen]);
      return;
    }
    for (let i = start; i < items.length; i++) {
      chosen.push(items[i] as T);
      pick(i + 1, chosen);
      chosen.pop();
    }
  };
  pick(0, []);
  return out;
}

/** Hàng thứ n của tam giác Pascal bằng quy hoạch động: mỗi số là tổng hai số phía trên. */
export function pascalRows(n: number): number[][] {
  const rows: number[][] = [[1]];
  for (let r = 1; r <= n; r++) {
    const prev = rows[r - 1] as number[];
    const row = [1];
    for (let k = 1; k < r; k++) row.push((prev[k - 1] as number) + (prev[k] as number));
    row.push(1);
    rows.push(row);
  }
  return rows;
}

export function factorial(n: number): number {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

/* ---------- Dãy số ---------- */

/** Tổng riêng của cấp số nhân a, aq, aq², … */
export function geometricPartialSums(a: number, q: number, n: number): number[] {
  const sums: number[] = [];
  let term = a;
  let s = 0;
  for (let i = 0; i < n; i++) {
    s += term;
    sums.push(s);
    term *= q;
  }
  return sums;
}

/** Số N đầu tiên mà từ đó |u_n − L| < eps (kiểm trên n_max số hạng): thử thách «sai số nhỏ tùy ý». */
export function firstIndexWithin(u: (n: number) => number, limit: number, eps: number, nMax: number): number | null {
  let last = -1;
  for (let n = 1; n <= nMax; n++) if (Math.abs(u(n) - limit) >= eps) last = n;
  return last + 1 <= nMax ? last + 1 : null;
}

/** Gửi 1 đồng, lãi 100%/năm chia thành m kì: (1+1/m)^m tiến về e. */
export function compoundOne(periods: number): number {
  return (1 + 1 / periods) ** periods;
}

/* ---------- Bất đẳng thức: leo đồi tìm cực trị ---------- */

/** Leo đồi: thử nhích sang trái/phải, giữ nếu tốt hơn, thu bước khi hết tốt hơn. Dùng để «nhìn» dấu bằng. */
export function hillClimbMin(f: Fn, x0: number, lo: number, hi: number, step0: number): { x: number; y: number }[] {
  const path: { x: number; y: number }[] = [{ x: x0, y: f(x0) }];
  let x = x0;
  let step = step0;
  for (let i = 0; i < 200 && step > 1e-7; i++) {
    const cand = [x - step, x + step].filter((v) => v >= lo && v <= hi);
    let best = x;
    for (const v of cand) if (f(v) < f(best)) best = v;
    if (best === x) step /= 2;
    else x = best;
    path.push({ x, y: f(x) });
  }
  return path;
}

/* ---------- Mạng nơ-ron nhỏ: 1 đầu vào, H nơ-ron ẩn tanh, 1 đầu ra ---------- */

export type Net = { w1: number[]; b1: number[]; w2: number[]; b2: number; m: number[]; v: number[]; t: number };

export function makeNet(hidden: number, rng: () => number): Net {
  const w1 = Array.from({ length: hidden }, () => (rng() * 2 - 1) * 2);
  const b1 = Array.from({ length: hidden }, () => (rng() * 2 - 1) * 2);
  const w2 = Array.from({ length: hidden }, () => (rng() * 2 - 1) * 0.5);
  const size = hidden * 3 + 1;
  return { w1, b1, w2, b2: 0, m: Array<number>(size).fill(0), v: Array<number>(size).fill(0), t: 0 };
}

export function netForward(net: Net, x: number): number {
  let y = net.b2;
  for (let i = 0; i < net.w1.length; i++) y += (net.w2[i] as number) * Math.tanh((net.w1[i] as number) * x + (net.b1[i] as number));
  return y;
}

/** Một vòng huấn luyện trên toàn bộ điểm: lan truyền tiến, lan truyền ngược (đạo hàm riêng bằng quy tắc hàm hợp), cập nhật Adam. Trả về sai số bình phương trung bình trước khi cập nhật. */
export function netTrainEpoch(net: Net, xs: readonly number[], ys: readonly number[], lr: number): number {
  const H = net.w1.length;
  const g = Array<number>(H * 3 + 1).fill(0);
  let loss = 0;
  for (let k = 0; k < xs.length; k++) {
    const x = xs[k] as number;
    const target = ys[k] as number;
    const a = net.w1.map((w, i) => Math.tanh(w * x + (net.b1[i] as number)));
    const out = net.b2 + a.reduce((s, ai, i) => s + (net.w2[i] as number) * ai, 0);
    const err = out - target;
    loss += err * err;
    const dOut = (2 * err) / xs.length;
    g[H * 3] = (g[H * 3] as number) + dOut;
    for (let i = 0; i < H; i++) {
      const ai = a[i] as number;
      const dPre = dOut * (net.w2[i] as number) * (1 - ai * ai);
      g[i] = (g[i] as number) + dPre * x;
      g[H + i] = (g[H + i] as number) + dPre;
      g[2 * H + i] = (g[2 * H + i] as number) + dOut * ai;
    }
  }
  net.t += 1;
  const b1c = 1 - 0.9 ** net.t;
  const b2c = 1 - 0.999 ** net.t;
  const params = [...net.w1, ...net.b1, ...net.w2, net.b2];
  for (let j = 0; j < params.length; j++) {
    net.m[j] = 0.9 * (net.m[j] as number) + 0.1 * (g[j] as number);
    net.v[j] = 0.999 * (net.v[j] as number) + 0.001 * (g[j] as number) ** 2;
    params[j] = (params[j] as number) - (lr * ((net.m[j] as number) / b1c)) / (Math.sqrt((net.v[j] as number) / b2c) + 1e-8);
  }
  net.w1 = params.slice(0, H);
  net.b1 = params.slice(H, 2 * H);
  net.w2 = params.slice(2 * H, 3 * H);
  net.b2 = params[3 * H] as number;
  return loss / xs.length;
}

/* ---------- Nơ-ron = tích vô hướng + ngưỡng (perceptron) ---------- */

export type Pt = { x: number; y: number; label: 1 | -1 };

/** Một nơ-ron: kích hoạt = dấu của (w·p + b). Học: sai thì kéo vectơ trọng số về phía điểm. Trả về mọi bước. */
export function perceptronTrain(points: readonly Pt[], epochs: number): { w: [number, number]; b: number; errors: number }[] {
  let w: [number, number] = [0, 0];
  let b = 0;
  const history: { w: [number, number]; b: number; errors: number }[] = [];
  for (let e = 0; e < epochs; e++) {
    let errors = 0;
    for (const p of points) {
      const pred = w[0] * p.x + w[1] * p.y + b >= 0 ? 1 : -1;
      if (pred !== p.label) {
        w = [w[0] + p.label * p.x, w[1] + p.label * p.y];
        b += p.label;
        errors++;
      }
    }
    history.push({ w, b, errors });
    if (errors === 0) break;
  }
  return history;
}

/** Khoảng cách có dấu từ điểm tới đường w·p + b = 0 — chính là công thức khoảng cách từ điểm đến đường thẳng. */
export function signedDistance(w: [number, number], b: number, p: { x: number; y: number }): number {
  return (w[0] * p.x + w[1] * p.y + b) / Math.hypot(w[0], w[1]);
}

/* ---------- Giải hệ hai phương trình bằng định thức ---------- */

export function cramer(a: number, b: number, c: number, d: number, e: number, f: number): { x: number; y: number } | null {
  const D = a * d - b * c;
  if (Math.abs(D) < 1e-12) return null;
  return { x: (e * d - b * f) / D, y: (a * f - e * c) / D };
}

/* ---------- Lượng giác từ đường tròn: cộng dồn bước nhỏ ---------- */

/** Đi dọc đường tròn bán kính 1 bằng những bước thẳng nhỏ, mỗi bước quay đều một góc: không gọi sin/cos. */
export function walkCircle(angle: number, steps: number): { x: number; y: number } {
  const d = angle / steps;
  // Quay vectơ (x;y) một góc d bằng xấp xỉ bậc hai của cos d, sin d: dùng hai lần "nửa bước" để giữ độ dài gần 1.
  let x = 1;
  let y = 0;
  const c = 1 - (d * d) / 2;
  const s = d - (d * d * d) / 6;
  for (let i = 0; i < steps; i++) {
    const nx = x * c - y * s;
    const ny = x * s + y * c;
    x = nx;
    y = ny;
  }
  return { x, y };
}

/* ---------- Lượng giác: các thuật toán bổ sung ---------- */

/** Tìm mọi nghiệm của f trên [a;b]: quét tìm chỗ đổi dấu rồi chia đôi. Bỏ chỗ nhảy (như tang) bằng cách kiểm lại |f| nhỏ. */
export function findRoots(f: Fn, a: number, b: number, scan = 4000): number[] {
  const roots: number[] = [];
  let x0 = a;
  let y0 = f(x0);
  for (let i = 1; i <= scan; i++) {
    const x1 = a + ((b - a) * i) / scan;
    const y1 = f(x1);
    if (Number.isFinite(y0) && Number.isFinite(y1) && y0 * y1 <= 0) {
      let lo = x0;
      let hi = x1;
      for (let k = 0; k < 60; k++) {
        const mid = (lo + hi) / 2;
        if (f(lo) * f(mid) <= 0) hi = mid;
        else lo = mid;
      }
      const r = (lo + hi) / 2;
      if (Math.abs(f(r)) < 1e-6 && (roots.length === 0 || Math.abs(r - (roots[roots.length - 1] as number)) > 1e-6)) roots.push(r);
    }
    x0 = x1;
    y0 = y1;
  }
  return roots;
}

/** Đo biên độ, mức giữa và chu kì của một sóng chỉ bằng cách lấy mẫu: không dùng công thức. */
export function measureWave(f: Fn, x0: number, x1: number, n = 6000): { amplitude: number; centre: number; period: number | null } {
  let max = -Infinity;
  let min = Infinity;
  for (let i = 0; i <= n; i++) {
    const y = f(x0 + ((x1 - x0) * i) / n);
    if (y > max) max = y;
    if (y < min) min = y;
  }
  const centre = (max + min) / 2;
  const ups: number[] = [];
  let prev = f(x0) - centre;
  for (let i = 1; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    const cur = f(x) - centre;
    if (prev < 0 && cur >= 0) ups.push(x - ((x1 - x0) / n) * (cur / (cur - prev)));
    prev = cur;
  }
  const period = ups.length >= 2 ? ((ups[ups.length - 1] as number) - (ups[0] as number)) / (ups.length - 1) : null;
  return { amplitude: (max - min) / 2, centre, period };
}

/** Quay điểm quanh gốc một góc bằng phép nhân ma trận [[c, -s], [s, c]] với c, s lấy từ chính hai số cho trước. */
export function rotateBy(p: { x: number; y: number }, c: number, s: number): { x: number; y: number } {
  return { x: p.x * c - p.y * s, y: p.x * s + p.y * c };
}

export type Tri = {
  A: { x: number; y: number }; B: { x: number; y: number }; C: { x: number; y: number };
  a: number; b: number; c: number;
  angA: number; angB: number; angC: number;
  area: number; R: number; O: { x: number; y: number };
};

/** Dựng tam giác từ hai cạnh b, c và góc A xen giữa bằng toạ độ, rồi đo mọi thứ còn lại bằng khoảng cách và tích vô hướng. */
export function triangleSAS(b: number, c: number, angleA: number): Tri {
  const A = { x: 0, y: 0 };
  const B = { x: c, y: 0 };
  const C = { x: b * Math.cos(angleA), y: b * Math.sin(angleA) };
  const a = Math.hypot(B.x - C.x, B.y - C.y);
  const ang = (P: { x: number; y: number }, Q: { x: number; y: number }, S: { x: number; y: number }) => {
    const ux = Q.x - P.x; const uy = Q.y - P.y; const vx = S.x - P.x; const vy = S.y - P.y;
    return Math.acos((ux * vx + uy * vy) / (Math.hypot(ux, uy) * Math.hypot(vx, vy)));
  };
  const area = Math.abs(B.x * C.y - B.y * C.x) / 2;
  // Tâm ngoại tiếp: giao của hai đường trung trực, giải bằng định thức (Cramer).
  const d = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
  const ux = ((A.x ** 2 + A.y ** 2) * (B.y - C.y) + (B.x ** 2 + B.y ** 2) * (C.y - A.y) + (C.x ** 2 + C.y ** 2) * (A.y - B.y)) / d;
  const uy = ((A.x ** 2 + A.y ** 2) * (C.x - B.x) + (B.x ** 2 + B.y ** 2) * (A.x - C.x) + (C.x ** 2 + C.y ** 2) * (B.x - A.x)) / d;
  return { A, B, C, a, b, c, angA: ang(A, B, C), angB: ang(B, A, C), angC: ang(C, A, B), area, R: Math.hypot(ux - A.x, uy - A.y), O: { x: ux, y: uy } };
}

/* ---------- Đạo hàm: các thuật toán bổ sung ---------- */

/** Đạo hàm số bằng cát tuyến hai phía: độ dốc đường nối (x−h) với (x+h). */
export function diff(f: Fn, x: number, h = 1e-5): number {
  return (f(x + h) - f(x - h)) / (2 * h);
}

/** Độ dốc cát tuyến từ bên trái và từ bên phải: có đạo hàm khi hai số này dồn về cùng một số. */
export function oneSided(f: Fn, x: number, h: number): { left: number; right: number } {
  return { left: (f(x) - f(x - h)) / h, right: (f(x + h) - f(x)) / h };
}

/** Điểm tới hạn: nghiệm của f' = 0, phân loại bằng dấu của f'' (đạo hàm của đạo hàm). */
export function criticalPoints(f: Fn, a: number, b: number): { x: number; y: number; kind: "min" | "max" | "flat" }[] {
  return findRoots((x) => diff(f, x, 1e-4), a, b, 3000).map((x) => {
    const second = (diff(f, x + 1e-3, 1e-4) - diff(f, x - 1e-3, 1e-4)) / 2e-3;
    return { x, y: f(x), kind: second > 1e-3 ? "min" : second < -1e-3 ? "max" : "flat" };
  });
}

/** Các tiếp điểm mà tiếp tuyến tại đó đi qua điểm P: nghiệm của f(x0) + f'(x0)(px − x0) = py. */
export function tangentsThrough(f: Fn, px: number, py: number, a: number, b: number): number[] {
  return findRoots((x0) => f(x0) + diff(f, x0, 1e-4) * (px - x0) - py, a, b, 3000);
}

/** Tích phân số của gia tốc: v += a·dt, s += v·dt. Từ gia tốc dựng lại vận tốc và vị trí. */
export function eulerMotion(accel: (t: number, v: number) => number, s0: number, v0: number, dt: number, steps: number): { t: number; s: number; v: number }[] {
  const out = [{ t: 0, s: s0, v: v0 }];
  let s = s0;
  let v = v0;
  for (let i = 1; i <= steps; i++) {
    const t = (i - 1) * dt;
    v += accel(t, v) * dt;
    s += v * dt;
    out.push({ t: i * dt, s, v });
  }
  return out;
}

/** Hộp không nắp: cắt bốn góc vuông cạnh x từ tấm vuông cạnh side rồi gấp lại. */
export function boxVolume(x: number, side: number): number {
  return x * (side - 2 * x) ** 2;
}

/** Lan truyền ngược trên chuỗi y = w2·tanh(w1·x): đạo hàm là tích các đạo hàm cục bộ dọc chuỗi. */
export function chainBackprop(x: number, w1: number, w2: number): { z: number; a: number; y: number; dz: number; da: number; dy_dx: number; dy_dw1: number; dy_dw2: number } {
  const z = w1 * x;
  const a = Math.tanh(z);
  const y = w2 * a;
  const da = 1 - a * a; // đạo hàm của tanh tại z
  return { z, a, y, dz: w1, da, dy_dx: w2 * da * w1, dy_dw1: w2 * da * x, dy_dw2: a };
}

/**
 * Có đạo hàm tại x không? Có khi độ dốc cát tuyến từ cả hai phía dồn về cùng một số hữu hạn:
 * hai bên gần nhau, và các độ dốc ở ba bước nhỏ nhất gần nhau (không còn trôi đi hay rung).
 */
export function hasDerivativeAt(f: Fn, x: number): boolean {
  const rows = [3, 4, 5, 6].map((k) => oneSided(f, x, 10 ** -(k * 0.9)));
  const last = rows[rows.length - 1] as { left: number; right: number };
  if (![last.left, last.right].every(Number.isFinite)) return false;
  const close = (a: number, b: number) => Math.abs(a - b) <= 0.02 * (1 + Math.abs(b));
  return close(last.left, last.right) && rows.every((r) => close(r.left, last.left) && close(r.right, last.right));
}

/* ---------- Tích phân: các thuật toán bổ sung ---------- */

/** Simpson: thay từng cặp dải bằng một parabol, chính xác hơn nhiều so với hình chữ nhật. n được làm chẵn. */
export function simpson(f: Fn, a: number, b: number, n = 2000): number {
  const m = n % 2 === 0 ? n : n + 1;
  const h = (b - a) / m;
  let s = f(a) + f(b);
  for (let i = 1; i < m; i++) s += f(a + i * h) * (i % 2 === 0 ? 2 : 4);
  return (s * h) / 3;
}

/** Hàm diện tích A(x) = ∫ từ a đến x của f, cộng dồn từng dải hình thang. Trả về cả đường (x; A). */
export function cumulativeIntegral(f: Fn, a: number, b: number, n: number, start = 0): { x: number; y: number }[] {
  const out = [{ x: a, y: start }];
  const h = (b - a) / n;
  let acc = start;
  for (let i = 1; i <= n; i++) {
    const x0 = a + (i - 1) * h;
    acc += ((f(x0) + f(x0 + h)) / 2) * h;
    out.push({ x: a + i * h, y: acc });
  }
  return out;
}

/** Diện tích hình giới hạn bởi hai đồ thị trên [a;b]: chia tại các giao điểm rồi cộng |f − g| từng đoạn. */
export function areaBetween(f: Fn, g: Fn, a: number, b: number): { area: number; cuts: number[] } {
  const cuts = [a, ...findRoots((x) => f(x) - g(x), a, b, 4000).filter((r) => r > a + 1e-9 && r < b - 1e-9), b];
  let area = 0;
  for (let i = 0; i + 1 < cuts.length; i++) area += Math.abs(simpson((x) => f(x) - g(x), cuts[i] as number, cuts[i + 1] as number, 400));
  return { area, cuts };
}

/** Thể tích khối tròn xoay quanh trục hoành bằng n đĩa mỏng: Σ π·f(x)²·Δx (lấy chiều cao ở giữa dải). */
export function diskVolume(f: Fn, a: number, b: number, n: number): number {
  const h = (b - a) / n;
  let v = 0;
  for (let i = 0; i < n; i++) v += Math.PI * f(a + (i + 0.5) * h) ** 2 * h;
  return v;
}

/** Đổi biến: ∫ f(u(x))·u'(x) dx trên [a;b] bằng ∫ f(u) du trên [u(a);u(b)]. Trả về hai vế. */
export function substitutionBoth(f: Fn, u: Fn, du: Fn, a: number, b: number): { inX: number; inU: number } {
  return { inX: simpson((x) => f(u(x)) * du(x), a, b), inU: simpson(f, u(a), u(b)) };
}

/** Từng phần: ∫ u dv = [uv] − ∫ v du, tính cả hai vế bằng số. u, v, du, dv là các hàm của x. */
export function partsBoth(u: Fn, v: Fn, du: Fn, dv: Fn, a: number, b: number): { left: number; right: number } {
  return { left: simpson((x) => u(x) * dv(x), a, b), right: u(b) * v(b) - u(a) * v(a) - simpson((x) => v(x) * du(x), a, b) };
}

/** Độ dời và quãng đường từ vận tốc: ∫v và ∫|v| (chia tại các lần đổi chiều). */
export function displacementAndDistance(v: Fn, a: number, b: number): { displacement: number; distance: number; turns: number[] } {
  const turns = findRoots(v, a, b, 4000).filter((r) => r > a + 1e-9 && r < b - 1e-9);
  const cuts = [a, ...turns, b];
  let distance = 0;
  for (let i = 0; i + 1 < cuts.length; i++) distance += Math.abs(simpson(v, cuts[i] as number, cuts[i + 1] as number, 400));
  return { displacement: simpson(v, a, b), distance, turns };
}

/* ---------- Hàm bậc hai: các thuật toán bổ sung ---------- */

/** Hoàn thiện bình phương: ax²+bx+c = a(x−h)²+k. */
export function completeSquare(a: number, b: number, c: number): { h: number; k: number } {
  return { h: -b / (2 * a), k: c - (b * b) / (4 * a) };
}

/** Phương pháp Newton: từ x, dựng tiếp tuyến rồi nhảy tới chỗ tiếp tuyến cắt trục hoành. Trả về mọi bước. */
export function newtonPath(f: Fn, x0: number, steps: number): { x: number; fx: number; slope: number }[] {
  const out: { x: number; fx: number; slope: number }[] = [];
  let x = x0;
  for (let i = 0; i <= steps; i++) {
    const slope = diff(f, x, 1e-6);
    out.push({ x, fx: f(x), slope });
    if (Math.abs(slope) < 1e-12 || !Number.isFinite(x)) break;
    x -= f(x) / slope;
  }
  return out;
}

/**
 * Một nơ-ron học hệ số a, b, c từ các điểm đo (có nhiễu): dự đoán ŷ = A·s² + B·s + C với s = x/xs,
 * sai số bình phương trung bình, hạ gradient. Trả về hệ số (đã đổi về theo x) sau mỗi vòng.
 */
export function fitQuadratic(points: readonly { x: number; y: number }[], epochs: number, lr: number): { a: number; b: number; c: number; loss: number }[] {
  const xs = Math.max(1e-9, ...points.map((p) => Math.abs(p.x)));
  let A = 0;
  let B = 0;
  let C = 0;
  const out: { a: number; b: number; c: number; loss: number }[] = [];
  for (let e = 0; e < epochs; e++) {
    let gA = 0; let gB = 0; let gC = 0; let loss = 0;
    for (const p of points) {
      const s = p.x / xs;
      const err = A * s * s + B * s + C - p.y;
      loss += err * err;
      gA += (2 * err * s * s) / points.length;
      gB += (2 * err * s) / points.length;
      gC += (2 * err) / points.length;
    }
    out.push({ a: A / (xs * xs), b: B / xs, c: C, loss: loss / points.length });
    A -= lr * gA; B -= lr * gB; C -= lr * gC;
  }
  return out;
}

/** Tập nghiệm của ax²+bx+c ⋛ 0 dưới dạng các khoảng, tìm bằng nghiệm + thử điểm giữa (không dùng quy tắc «trong trái ngoài cùng»). */
export function solveInequality(f: Fn, rel: ">" | "<" | ">=" | "<=", bound = 1000): { lo: number; hi: number }[] {
  const roots = findRoots(f, -bound, bound, 20000);
  const cuts = [-Infinity, ...roots, Infinity];
  const ok = (y: number) => (rel === ">" ? y > 0 : rel === "<" ? y < 0 : rel === ">=" ? y >= 0 : y <= 0);
  const out: { lo: number; hi: number }[] = [];
  for (let i = 0; i + 1 < cuts.length; i++) {
    const lo = cuts[i] as number;
    const hi = cuts[i + 1] as number;
    const mid = Number.isFinite(lo) && Number.isFinite(hi) ? (lo + hi) / 2 : Number.isFinite(lo) ? lo + 1 : Number.isFinite(hi) ? hi - 1 : 0;
    if (ok(f(mid))) out.push({ lo, hi });
  }
  if (rel === ">=" || rel === "<=") for (const r of roots) if (!out.some((o) => r >= o.lo - 1e-9 && r <= o.hi + 1e-9)) out.push({ lo: r, hi: r });
  out.sort((p, q) => p.lo - q.lo);
  // Gộp các khoảng kề nhau (khi lấy cả nghiệm).
  const merged: { lo: number; hi: number }[] = [];
  for (const o of out) {
    const last = merged[merged.length - 1];
    if (last && o.lo <= last.hi + 1e-9) last.hi = Math.max(last.hi, o.hi);
    else merged.push({ ...o });
  }
  return merged;
}

/* ---------- Bất đẳng thức, giới hạn, hình giải tích, hình học: thuật toán bổ sung ---------- */

/** Tìm phản ví dụ: thử n điểm ngẫu nhiên, báo giá trị nhỏ nhất của «vế trái − vế phải» và điểm làm sai (nếu có). */
export function counterexampleSearch(diffFn: (p: number[]) => number, dims: number, lo: number, hi: number, n: number, rng: () => number): { min: number; at: number[]; counter: number[] | null; tried: number } {
  let min = Infinity;
  let at: number[] = [];
  let counter: number[] | null = null;
  for (let i = 0; i < n; i++) {
    const p = Array.from({ length: dims }, () => lo + rng() * (hi - lo));
    const v = diffFn(p);
    if (v < min) { min = v; at = p; }
    if (v < -1e-12 && counter === null) counter = p;
  }
  return { min, at, counter, tried: n };
}

/** Bốn trung bình của a, b > 0: điều hòa, nhân, cộng, bình phương. */
export function meanChain(a: number, b: number): { hm: number; gm: number; am: number; qm: number } {
  return { hm: (2 * a * b) / (a + b), gm: Math.sqrt(a * b), am: (a + b) / 2, qm: Math.sqrt((a * a + b * b) / 2) };
}

/** Nửa đường tròn đường kính a+b: độ cao dây vuông góc dựng tại điểm chia đường kính thành a và b (đo bằng phương trình đường tròn). */
export function semicircleHeight(a: number, b: number): number {
  const r = (a + b) / 2;
  return Math.sqrt(Math.max(0, r * r - (a - r) ** 2));
}

/** Ước lượng giới hạn của f khi x → x0 từ một phía bằng dãy bước h = 10^−k; trả về từng bước và nhận xét có dồn lại không. */
export function limitEstimate(f: Fn, x0: number, side: "left" | "right", kMax = 9): { h: number; value: number }[] {
  const rows: { h: number; value: number }[] = [];
  for (let k = 1; k <= kMax; k++) {
    const h = 10 ** -k;
    rows.push({ h, value: f(side === "left" ? x0 - h : x0 + h) });
  }
  return rows;
}

/** Giao của đường thẳng ax+by+c=0 và đường tròn tâm (cx;cy) bán kính R: khoảng cách d, chân đường vuông góc và các giao điểm. */
export function lineCircle(a: number, b: number, c: number, cx: number, cy: number, R: number): { d: number; foot: { x: number; y: number }; points: { x: number; y: number }[] } {
  const n = Math.hypot(a, b);
  const s = (a * cx + b * cy + c) / (n * n);
  const foot = { x: cx - a * s, y: cy - b * s };
  const d = Math.abs(a * cx + b * cy + c) / n;
  if (d > R + 1e-9) return { d, foot, points: [] };
  const half = Math.sqrt(Math.max(0, R * R - d * d));
  const ux = -b / n;
  const uy = a / n;
  const pts = half < 1e-9 ? [foot] : [{ x: foot.x - ux * half, y: foot.y - uy * half }, { x: foot.x + ux * half, y: foot.y + uy * half }];
  return { d, foot, points: pts };
}

export type V3 = [number, number, number];
export const dot3 = (p: V3, q: V3): number => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
export const cross3 = (p: V3, q: V3): V3 => [p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0]];
export const sub3 = (p: V3, q: V3): V3 => [p[0] - q[0], p[1] - q[1], p[2] - q[2]];

/** Mặt phẳng qua ba điểm: pháp tuyến = tích có hướng của hai cạnh, phương trình Ax+By+Cz+D=0. */
export function planeThrough(P: V3, Q: V3, R: V3): { n: V3; D: number } {
  const n = cross3(sub3(Q, P), sub3(R, P));
  return { n, D: -dot3(n, P) };
}

export function distToPlane(plane: { n: V3; D: number }, p: V3): number {
  return Math.abs(dot3(plane.n, p) + plane.D) / Math.hypot(...plane.n);
}

type P2 = { x: number; y: number };

/** Bốn tâm của tam giác bằng toạ độ: trọng tâm, ngoại tiếp (giao hai trung trực), nội tiếp (trung bình có trọng số theo cạnh), trực tâm (giao hai đường cao, giải bằng Cramer). */
export function triCenters(A: P2, B: P2, C: P2): { G: P2; O: P2; I: P2; H: P2; R: number; r: number; area: number } {
  const a = Math.hypot(B.x - C.x, B.y - C.y);
  const b = Math.hypot(A.x - C.x, A.y - C.y);
  const c = Math.hypot(A.x - B.x, A.y - B.y);
  const G = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
  const d = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
  const sq = (P: P2) => P.x * P.x + P.y * P.y;
  const O = { x: (sq(A) * (B.y - C.y) + sq(B) * (C.y - A.y) + sq(C) * (A.y - B.y)) / d, y: (sq(A) * (C.x - B.x) + sq(B) * (A.x - C.x) + sq(C) * (B.x - A.x)) / d };
  const I = { x: (a * A.x + b * B.x + c * C.x) / (a + b + c), y: (a * A.y + b * B.y + c * C.y) / (a + b + c) };
  // Đường cao từ A vuông góc BC: (P−A)·(C−B)=0; từ B vuông góc CA: (P−B)·(A−C)=0.
  const h = cramer(C.x - B.x, C.y - B.y, A.x - C.x, A.y - C.y, A.x * (C.x - B.x) + A.y * (C.y - B.y), B.x * (A.x - C.x) + B.y * (A.y - C.y));
  const area = Math.abs((B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x)) / 2;
  return { G, O, I, H: h ? { x: h.x, y: h.y } : G, R: Math.hypot(O.x - A.x, O.y - A.y), r: (2 * area) / (a + b + c), area };
}

/** Điểm có nằm trong đa giác không (bắn tia sang phải, đếm số lần cắt cạnh). */
export function insidePolygon(p: P2, poly: readonly P2[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i] as P2;
    const b = poly[j] as P2;
    if (a.y > p.y !== b.y > p.y && p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

/** Đếm ô vuông cạnh cell có tâm nằm trong đa giác: diện tích ≈ số ô × cell². */
export function latticeArea(poly: readonly P2[], cell: number, extent: number): { cells: number; area: number } {
  let cells = 0;
  const n = Math.ceil(extent / cell);
  for (let i = -n; i < n; i++) for (let j = -n; j < n; j++) if (insidePolygon({ x: (i + 0.5) * cell, y: (j + 0.5) * cell }, poly)) cells++;
  return { cells, area: cells * cell * cell };
}

/** Lấy mẫu đều trong tứ diện S.ABC rồi đếm phần rơi vào tứ diện con S.A'B'C' (SA'/SA=ra, …): tỉ lệ → ra·rb·rc. */
export function tetraRatioMC(ra: number, rb: number, rc: number, n: number, rng: () => number): { inside: number; fraction: number } {
  let inside = 0;
  for (let i = 0; i < n; i++) {
    // Lấy mẫu đều trong tứ diện: bốn số mũ ngẫu nhiên rồi chuẩn hoá (phân phối Dirichlet(1,1,1,1)).
    const e = [-Math.log(1 - rng()), -Math.log(1 - rng()), -Math.log(1 - rng()), -Math.log(1 - rng())];
    const s = e[0]! + e[1]! + e[2]! + e[3]!;
    const a = e[1]! / s;
    const b = e[2]! / s;
    const c = e[3]! / s;
    if (a / ra + b / rb + c / rc <= 1) inside++;
  }
  return { inside, fraction: inside / n };
}

/** Diện tích hình quạt bán kính r, góc α, tính bằng cách cộng các tam giác nhỏ (toạ độ cực): Σ ½ r² dθ. */
export function sectorAreaNumeric(r: number, alpha: number, n = 20000): number {
  const dth = alpha / n;
  let s = 0;
  for (let i = 0; i < n; i++) s += 0.5 * r * r * dth;
  return s;
}

/* ---------- Thống kê, xác suất, ma trận, dãy lặp: thuật toán bổ sung ---------- */

export const mean = (xs: readonly number[]): number => xs.reduce((s, v) => s + v, 0) / xs.length;

function medianSorted(s: readonly number[]): number {
  const n = s.length;
  return n % 2 === 1 ? (s[(n - 1) / 2] as number) : ((s[n / 2 - 1] as number) + (s[n / 2] as number)) / 2;
}

/** Trung vị và tứ phân vị theo cách làm trong sách: Q2 là trung vị, Q1 và Q3 là trung vị của nửa dưới và nửa trên (bỏ số ở giữa nếu n lẻ). */
export function quartiles(xs: readonly number[]): { min: number; q1: number; q2: number; q3: number; max: number } {
  const s = [...xs].sort((a, b) => a - b);
  const n = s.length;
  const half = Math.floor(n / 2);
  return { min: s[0] as number, q1: medianSorted(s.slice(0, half)), q2: medianSorted(s), q3: medianSorted(s.slice(n - half)), max: s[n - 1] as number };
}

/** Phương sai theo định nghĩa: trung bình của bình phương độ lệch. */
export function variance(xs: readonly number[]): number {
  const m = mean(xs);
  return mean(xs.map((v) => (v - m) ** 2));
}

/** Chia dữ liệu vào các nhóm [lo + i·w; lo + (i+1)·w). */
export function histogram(xs: readonly number[], lo: number, w: number, bins: number): number[] {
  const c = Array<number>(bins).fill(0);
  for (const v of xs) {
    const i = Math.floor((v - lo) / w);
    if (i >= 0 && i < bins) c[i] = (c[i] as number) + 1;
  }
  return c;
}

/** Số trung bình của mẫu ghép nhóm: mỗi nhóm đại diện bằng điểm giữa. */
export function groupedMean(counts: readonly number[], lo: number, w: number): number {
  const n = counts.reduce((s, v) => s + v, 0);
  return counts.reduce((s, v, i) => s + v * (lo + (i + 0.5) * w), 0) / n;
}

/** Tứ phân vị Q_j của mẫu ghép nhóm bằng công thức nội suy: u_m + (jn/4 − C)/n_m · w. */
export function groupedQuartile(counts: readonly number[], lo: number, w: number, j: 1 | 2 | 3): number {
  const n = counts.reduce((s, v) => s + v, 0);
  let acc = 0;
  for (let i = 0; i < counts.length; i++) {
    const c = counts[i] as number;
    if (acc + c >= (j * n) / 4) return lo + i * w + (((j * n) / 4 - acc) / c) * w;
    acc += c;
  }
  return lo + counts.length * w;
}

/** Phân phối nhị thức: P(X = k) = C(n,k) p^k (1−p)^(n−k), tính bằng truy hồi để không tràn số. */
export function binomialPmf(n: number, p: number): number[] {
  const out = Array<number>(n + 1).fill(0);
  out[0] = (1 - p) ** n;
  for (let k = 1; k <= n; k++) out[k] = p === 1 ? (k === n ? 1 : 0) : ((out[k - 1] as number) * ((n - k + 1) / k) * p) / (1 - p);
  return out;
}

/** Nghịch lí ngày sinh: xác suất có ít nhất hai người trùng ngày sinh trong n người (365 ngày). */
export function birthdayExact(n: number): number {
  let none = 1;
  for (let i = 0; i < n; i++) none *= (365 - i) / 365;
  return 1 - none;
}

export function birthdaySim(n: number, trials: number, rng: () => number): number {
  let hit = 0;
  for (let t = 0; t < trials; t++) {
    const seen = new Set<number>();
    for (let i = 0; i < n; i++) {
      const d = Math.floor(rng() * 365);
      if (seen.has(d)) { hit++; break; }
      seen.add(d);
    }
  }
  return hit / trials;
}

/** Công thức Bayes cho hai nguyên nhân B và không-B: trả về P(A) và P(B|A). */
export function bayes(pB: number, pAgB: number, pAgNotB: number): { pA: number; pBgA: number } {
  const pA = pB * pAgB + (1 - pB) * pAgNotB;
  return { pA, pBgA: pA === 0 ? 0 : (pB * pAgB) / pA };
}

/** Tỉ lệ ngửa chạy theo số lần tung: luật số lớn. */
export function runningProportion(n: number, rng: () => number): number[] {
  const out: number[] = [];
  let heads = 0;
  for (let i = 1; i <= n; i++) { if (rng() < 0.5) heads++; out.push(heads / i); }
  return out;
}

/** Tổng của k xúc xắc, tung rolls lần: histogram của các tổng (tiến về hình chuông). */
export function diceSumHistogram(k: number, rolls: number, rng: () => number): number[] {
  const c = Array<number>(6 * k + 1).fill(0);
  for (let r = 0; r < rolls; r++) {
    let s = 0;
    for (let i = 0; i < k; i++) s += 1 + Math.floor(rng() * 6);
    c[s] = (c[s] as number) + 1;
  }
  return c;
}

/** Phân rã phóng xạ mô phỏng: mỗi bước mỗi nguyên tử còn lại phân rã với xác suất p. Trả về số nguyên tử còn lại sau mỗi bước. */
export function simulateDecay(n0: number, p: number, steps: number, rng: () => number): number[] {
  const out = [n0];
  let n = n0;
  for (let s = 0; s < steps; s++) {
    let left = 0;
    for (let i = 0; i < n; i++) if (rng() >= p) left++;
    n = left;
    out.push(n);
  }
  return out;
}

/** Lặp x ← f(x): dãy truy hồi u_{n+1} = f(u_n). */
export function iterate(f: Fn, x0: number, n: number): number[] {
  const out = [x0];
  for (let i = 0; i < n; i++) out.push(f(out[i] as number));
  return out;
}

/** Nhân hai đa thức (hệ số từ bậc thấp đến cao): cách khai triển nhị thức bằng máy. */
export function polyMul(a: readonly number[], b: readonly number[]): number[] {
  const out = Array<number>(a.length + b.length - 1).fill(0);
  a.forEach((x, i) => b.forEach((y, j) => { out[i + j] = (out[i + j] as number) + x * y; }));
  return out;
}

/** Diện tích đa giác bằng công thức dây giày. */
export function polyArea(pts: readonly { x: number; y: number }[]): number {
  return Math.abs(pts.reduce((acc, p, i) => { const q = pts[(i + 1) % pts.length] as { x: number; y: number }; return acc + (p.x * q.y - q.x * p.y); }, 0)) / 2;
}

export type M2 = [number, number, number, number];
export const matApply = (m: M2, p: { x: number; y: number }): { x: number; y: number } => ({ x: m[0] * p.x + m[1] * p.y, y: m[2] * p.x + m[3] * p.y });
export const matMul = (m: M2, n: M2): M2 => [m[0] * n[0] + m[1] * n[2], m[0] * n[1] + m[1] * n[3], m[2] * n[0] + m[3] * n[2], m[2] * n[1] + m[3] * n[3]];
export const matDet = (m: M2): number => m[0] * m[3] - m[1] * m[2];

/** Bảng biến thiên: các điểm tới hạn trong (a;b) và dấu của f' ở từng khoảng, tìm bằng nghiệm rồi thử điểm giữa. */
export function variationTable(f: Fn, a: number, b: number): { cuts: number[]; signs: (1 | -1)[]; values: number[] } {
  const crit = findRoots((x) => diff(f, x, 1e-5), a, b, 4000);
  const cuts = [a, ...crit, b];
  const signs: (1 | -1)[] = [];
  for (let i = 0; i + 1 < cuts.length; i++) signs.push(diff(f, ((cuts[i] as number) + (cuts[i + 1] as number)) / 2, 1e-5) >= 0 ? 1 : -1);
  return { cuts, signs, values: cuts.map((x) => f(x)) };
}

/** Số nghiệm của f(x) = m trên [a;b]. */
export function countSolutions(f: Fn, m: number, a: number, b: number): number {
  return findRoots((x) => f(x) - m, a, b, 6000).length;
}

/** Chỉ số n đầu tiên mà dãy h vượt dãy g và từ đó ở lại trên: so tăng mũ với tăng tuyến tính. Trả về null nếu chưa vượt trong nMax số hạng. */
export function crossoverIndex(g: (n: number) => number, h: (n: number) => number, nMax: number): number | null {
  let last = 0;
  for (let n = 1; n <= nMax; n++) if (h(n) <= g(n)) last = n;
  return last < nMax ? last + 1 : null;
}

/** Hai hình vuông cạnh a, b và hai hình chữ nhật a×b: tổng diện tích hai hình vuông trừ hai lần hình chữ nhật là (a−b)². */
export function squaresVsRectangles(a: number, b: number): { squares: number; rectangles: number; excess: number } {
  return { squares: a * a + b * b, rectangles: 2 * a * b, excess: a * a + b * b - 2 * a * b };
}

/** Chuỗi bốn trung bình của m+d và m−d (m là trung bình cộng, d là nửa hiệu): cả bốn nhập làm một khi d → 0. */
export function meanChainAround(m: number, d: number): { hm: number; gm: number; am: number; qm: number } {
  return meanChain(m + d, m - d);
}

/** Tam thức g(t) = (at−x)² + (bt−y)² của bất đẳng thức Cauchy: cực tiểu (ay−bx)²/(a²+b²) tại t = (ax+by)/(a²+b²). */
export function cauchyQuadratic(a: number, b: number, x: number, y: number): { g: (t: number) => number; tMin: number; minValue: number; discriminant: number } {
  const s = a * a + b * b;
  const g = (t: number) => (a * t - x) ** 2 + (b * t - y) ** 2;
  // Biệt thức thu gọn của g(t) = s·t² − 2(ax+by)t + (x²+y²): (ax+by)² − s(x²+y²) = −(ay−bx)².
  return { g, tMin: (a * x + b * y) / s, minValue: (a * y - b * x) ** 2 / s, discriminant: (a * x + b * y) ** 2 - s * (x * x + y * y) };
}

/** Hạ gradient trên g(t): trả về từng giá trị t, để thấy máy tự tìm đáy của tam thức mà không dùng công thức. */
export function cauchyDescent(a: number, b: number, x: number, y: number, steps = 60, rate = 0.1, t0 = 0): number[] {
  const path = [t0];
  let t = t0;
  for (let i = 0; i < steps; i++) {
    const grad = 2 * a * (a * t - x) + 2 * b * (b * t - y);
    t -= rate * grad;
    path.push(t);
  }
  return path;
}

/** Hai vectơ độ dài la, lb hợp góc theta: độ dài tổng và khoảng cách tới la+lb (bất đẳng thức tam giác). */
export function vectorSumLength(la: number, lb: number, theta: number): { sum: number; bound: number; gap: number } {
  const sum = Math.sqrt(Math.max(0, la * la + lb * lb + 2 * la * lb * Math.cos(theta)));
  return { sum, bound: la + lb, gap: la + lb - sum };
}

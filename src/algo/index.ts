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

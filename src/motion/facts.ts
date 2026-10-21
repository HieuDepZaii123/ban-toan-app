/** Numbers the topic loops draw. Tests pin these against src/lib/math.ts. */

export function wrap01(u: number): number {
  return ((u % 1) + 1) % 1;
}

export function ping(u: number): number {
  return 0.5 - 0.5 * Math.cos(wrap01(u) * Math.PI * 2);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function smooth(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

const QUAD_B = -2;

export function quadA(u: number): number {
  return lerp(0.55, 1.85, ping(u));
}

/** y = a x² − 2x. Vertex x = 1/a, so changing a slides it along y = −x. */
export function quadVertex(a: number): { x: number; y: number } {
  const x = -QUAD_B / (2 * a);
  return { x, y: a * x * x + QUAD_B * x };
}

export function quadY(a: number, x: number): number {
  return a * x * x + QUAD_B * x;
}

/** a(x − 2) ≤ 0. Positive a gives x ≤ 2; negative a flips the ray to x ≥ 2. */
export function ineqFrame(u: number): { lo: number | null; hi: number | null; amount: number } {
  const t = wrap01(u);
  const span = t < 0.5 ? t / 0.5 : (t - 0.5) / 0.5;
  const amount = Math.sin(Math.PI * span);
  if (t < 0.5) return { lo: null, hi: 2, amount };
  return { lo: 2, hi: null, amount };
}

export function expX(u: number): number {
  return lerp(-0.7, 2.55, ping(u));
}

/** Point (x, 2ˣ) and its mirror (2ˣ, x) on y = log₂ x. */
export function expMirror(x: number): { y: number; mx: number; my: number } {
  const y = 2 ** x;
  return { y, mx: y, my: x };
}

export function shrinkTerm(n: number): number {
  return 8 * 0.5 ** (n - 1);
}

/** Partial sum of 8 + 4 + 2 + … approaches 16 and never lands on a zero term. */
export function shrinkPartial(n: number): number {
  return 16 * (1 - 0.5 ** n);
}

export function termsShown(u: number): number {
  return lerp(1, 7, ping(u));
}

export function tripAngle(u: number): number {
  return wrap01(u) * Math.PI * 2;
}

/** (x² − 1)/(x − 1) for x ≠ 1. Both sides approach 2. */
export function approachY(x: number): number {
  return (x * x - 1) / (x - 1);
}

export function holeGap(u: number): number {
  return lerp(1.2, 0.14, ping(u));
}

/** Secant of y = x² through x = 1 and x = 1 + h. Slope is 2 + h. */
export function secantH(u: number): number {
  return lerp(1.55, 0.05, ping(u));
}

export function surveyX(u: number): number {
  return lerp(-2.15, 2.15, ping(u));
}

export function motionCubic(x: number): number {
  return x * x * x - 3 * x;
}

export function motionCubicSlope(x: number): number {
  return 3 * x * x - 3;
}

export function stripCount(u: number): number {
  return Math.max(1, Math.round(lerp(1, 10, ping(u))));
}

export function motionArch(x: number): number {
  return 2 * x - x * x;
}

export const VEC_U = [2.2, 0.55] as const;
export const VEC_V = [0.75, 1.85] as const;

export function vecAdd(u: readonly [number, number], v: readonly [number, number]): [number, number] {
  return [u[0] + v[0], u[1] + v[1]];
}

/** Walk along u, then along v, then return on the diagonal u + v. */
export function walker(u: number): [number, number] {
  const t = wrap01(u);
  if (t < 0.4) {
    const s = smooth(t / 0.4);
    return [VEC_U[0] * s, VEC_U[1] * s];
  }
  if (t < 0.75) {
    const s = smooth((t - 0.4) / 0.35);
    return [VEC_U[0] + VEC_V[0] * s, VEC_U[1] + VEC_V[1] * s];
  }
  const s = smooth((t - 0.75) / 0.25);
  const sum = vecAdd(VEC_U, VEC_V);
  return [sum[0] * (1 - s), sum[1] * (1 - s)];
}

export function pointHeight(u: number): { x: number; y: number } {
  return { x: 3, y: lerp(0.35, 3.15, ping(u)) };
}

/** Foot of the perpendicular from (x, y) onto x + y − 2 = 0. */
export function lineFoot(x: number, y: number): { x: number; y: number; dist: number } {
  const t = (x + y - 2) / 2;
  const fx = x - t;
  const fy = y - t;
  return { x: fx, y: fy, dist: Math.hypot(x - fx, y - fy) };
}

export const TRI_A = [0, 3.2] as const;
export const TRI_B = [-2.6, 0] as const;
export const TRI_C = [2.6, 0] as const;

export function cutK(u: number): number {
  return lerp(0.32, 0.78, ping(u));
}

/** Line parallel to the base, at scale k from the apex. PQ / BC = k. */
export function similarCut(k: number): { p: [number, number]; q: [number, number]; ratio: number } {
  const p: [number, number] = [TRI_A[0] + k * (TRI_B[0] - TRI_A[0]), TRI_A[1] + k * (TRI_B[1] - TRI_A[1])];
  const q: [number, number] = [TRI_A[0] + k * (TRI_C[0] - TRI_A[0]), TRI_A[1] + k * (TRI_C[1] - TRI_A[1])];
  const base = Math.hypot(TRI_C[0] - TRI_B[0], TRI_C[1] - TRI_B[1]);
  const small = Math.hypot(q[0] - p[0], q[1] - p[1]);
  return { p, q, ratio: small / base };
}

/** Adjacent transpositions visiting every order of three objects once. */
export const ARRANGEMENTS: readonly (readonly [number, number, number])[] = [
  [0, 1, 2],
  [0, 2, 1],
  [2, 0, 1],
  [2, 1, 0],
  [1, 2, 0],
  [1, 0, 2],
];

export function adjacentSwap(a: readonly number[], b: readonly number[]): boolean {
  const diffs: number[] = [];
  for (let i = 0; i < a.length; i += 1) if (a[i] !== b[i]) diffs.push(i);
  return diffs.length === 2 && diffs[1] === diffs[0] + 1;
}

export function arrangementAt(u: number): { slot: [number, number, number]; index: number } {
  const scaled = wrap01(u) * ARRANGEMENTS.length;
  const index = Math.floor(scaled) % ARRANGEMENTS.length;
  const frac = smooth(scaled - Math.floor(scaled));
  const curr = ARRANGEMENTS[index] ?? ARRANGEMENTS[0];
  const next = ARRANGEMENTS[(index + 1) % ARRANGEMENTS.length] ?? ARRANGEMENTS[0];
  const slot: [number, number, number] = [0, 0, 0];
  for (let token = 0; token < 3; token += 1) {
    slot[token] = lerp(curr.indexOf(token), next.indexOf(token), frac);
  }
  return { slot, index };
}

/** P(n, k) when order is kept, C(n, k) when it is not. */
export function ways(n: number, k: number, order: boolean): number {
  let p = 1;
  for (let i = 0; i < k; i += 1) p *= n - i;
  if (order) return p;
  let d = 1;
  for (let i = 1; i <= k; i += 1) d *= i;
  return p / d;
}

export function diePair(i: number): { a: number; b: number } {
  const k = ((i % 36) + 36) % 36;
  return { a: 1 + Math.floor(k / 6), b: 1 + (k % 6) };
}

/** Counts of dice sums after the first `rolls` of the 36 equally likely pairs. */
export function sumHistogram(rolls: number): number[] {
  const bins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const n = Math.max(0, Math.min(36, Math.round(rolls)));
  for (let i = 0; i < n; i += 1) {
    const pair = diePair(i);
    const sum = pair.a + pair.b;
    bins[sum] = (bins[sum] ?? 0) + 1;
  }
  return bins;
}

export function rollsShown(u: number): number {
  const t = wrap01(u);
  if (t >= 0.9) return 36;
  return Math.floor((t / 0.9) * 36);
}

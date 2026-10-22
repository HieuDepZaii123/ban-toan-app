import { fmt } from "./format.ts";

export type Lang = "vi" | "en";

export function delta(a: number, b: number, c: number): number {
  return b * b - 4 * a * c;
}

export function quadStudy(a: number, b: number, c: number): {
  linear: boolean;
  delta: number;
  vertex: { x: number; y: number } | null;
  roots: number[];
} {
  const d = delta(a, b, c);
  if (Math.abs(a) < 1e-9) {
    return { linear: true, delta: d, vertex: null, roots: [] };
  }
  const x = -b / (2 * a);
  const y = a * x * x + b * x + c;
  let roots: number[] = [];
  if (d > 1e-8) {
    const s = Math.sqrt(d);
    roots = [(-b - s) / (2 * a), (-b + s) / (2 * a)].sort((p, q) => p - q);
  } else if (d >= -1e-8) {
    roots = [x];
  }
  return { linear: false, delta: d, vertex: { x, y }, roots };
}

export function opening(a: number, lang: Lang): string {
  if (Math.abs(a) < 1e-9) {
    return lang === "en" ? "Not a parabola" : "Không còn parabol";
  }
  if (a > 0) {
    return lang === "en" ? "Opens upward — vertex is the minimum" : "Bề lõm hướng lên — đỉnh là giá trị nhỏ nhất";
  }
  return lang === "en" ? "Opens downward — vertex is the maximum" : "Bề lõm hướng xuống — đỉnh là giá trị lớn nhất";
}

export function rootsText(a: number, b: number, c: number, lang: Lang): string {
  const study = quadStudy(a, b, c);
  if (study.linear) return lang === "en" ? "Line, not a parabola" : "Đường thẳng, không phải parabol";
  if (study.roots.length === 0) return lang === "en" ? "Does not meet Ox" : "Không cắt Ox";
  if (study.roots.length === 1) {
    const x = fmt(study.roots[0] ?? 0);
    return lang === "en" ? `Touches Ox at x = ${x}` : `Tiếp xúc Ox tại x = ${x}`;
  }
  const lo = fmt(study.roots[0] ?? 0);
  const hi = fmt(study.roots[1] ?? 0);
  return lang === "en" ? `x = ${lo} and x = ${hi}` : `x = ${lo} và x = ${hi}`;
}

/** Fence of 40 m against a wall. x is each side perpendicular to the wall, in metres. */
export function fence(x: number): { length: number; area: number; slope: number; second: number } {
  const length = 40 - 2 * x;
  return { length, area: x * length, slope: 40 - 4 * x, second: -4 };
}

export function cost(x: number): number {
  return 2 * x * x - 8 * x + 11;
}

export function wrapDeg(deg: number): number {
  const a = deg % 360;
  return a < 0 ? a + 360 : a;
}

export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function sinDeg(deg: number): number {
  return Math.sin(degToRad(deg));
}

export function cosDeg(deg: number): number {
  return Math.cos(degToRad(deg));
}

const SIN: Record<number, string> = {
  0: "0", 30: "1/2", 45: "√2/2", 90: "1", 120: "√3/2", 150: "1/2",
  180: "0", 210: "−1/2", 225: "−√2/2", 270: "−1", 300: "−√3/2", 330: "−1/2", 360: "0",
};

const COS: Record<number, string> = {
  0: "1", 30: "√3/2", 45: "√2/2", 90: "0", 120: "−1/2", 150: "−√3/2",
  180: "−1", 210: "−√3/2", 225: "−√2/2", 270: "0", 300: "1/2", 330: "√3/2", 360: "1",
};

export function exactSin(deg: number): string | null {
  return SIN[wrapDeg(Math.round(deg))] ?? null;
}

export function exactCos(deg: number): string | null {
  return COS[wrapDeg(Math.round(deg))] ?? null;
}

export function showSin(deg: number): string {
  return exactSin(deg) ?? fmt(sinDeg(deg));
}

export function showCos(deg: number): string {
  return exactCos(deg) ?? fmt(cosDeg(deg));
}

export function showTan(deg: number): string {
  if (Math.abs(cosDeg(deg)) < 1e-8) return "—";
  const a = wrapDeg(Math.round(deg));
  if (a === 45 || a === 225) return a === 45 ? "1" : "1";
  if (a === 135 || a === 315) return "−1";
  if (a === 30 || a === 210) return "√3/3";
  if (a === 150 || a === 330) return "−√3/3";
  if (a === 60 || a === 240) return "√3";
  if (a === 120 || a === 300) return "−√3";
  return fmt(sinDeg(deg) / cosDeg(deg));
}

export function showSinCos(deg: number): string {
  const a = wrapDeg(Math.round(deg));
  if (a === 45) return "√2";
  if (a === 225) return "−√2";
  return fmt(sinDeg(deg) + cosDeg(deg));
}

export function quadrant(deg: number, lang: Lang): string {
  const a = wrapDeg(deg);
  const axis = a === 0 || a === 90 || a === 180 || a === 270 || a === 360;
  if (axis) return lang === "en" ? "On an axis" : "Nằm trên trục";
  if (a < 90) return lang === "en" ? "Quadrant I" : "Góc phần tư I";
  if (a < 180) return lang === "en" ? "Quadrant II" : "Góc phần tư II";
  if (a < 270) return lang === "en" ? "Quadrant III" : "Góc phần tư III";
  return lang === "en" ? "Quadrant IV" : "Góc phần tư IV";
}

/** Height of a tree: eye height plus distance × tan(angle). Angle in degrees. */
export function treeHeight(distance: number, angleDeg: number, eye = 1.5): number {
  return distance * Math.tan(degToRad(angleDeg)) + eye;
}

/** Difference quotient of f(x) = x² between a and a + h. Equals 2a + h. */
export function secantSlope(a: number, h: number): number {
  if (h === 0) return 2 * a;
  return ((a + h) ** 2 - a ** 2) / h;
}

/**
 * Vertical throw with g = 10 m/s², so h(t) = v0 t − 5 t².
 * Apex when h′(t) = v0 − 10t = 0, i.e. t = v0/10, height v0²/20.
 * h(1) = 15 when v0 = 20 is not the apex: velocity there is still 10 m/s.
 */
export function projectile(v0: number, t: number): { h: number; v: number } {
  return { h: v0 * t - 5 * t * t, v: v0 - 10 * t };
}

export function flightTime(v0: number): number {
  return v0 / 5;
}

export function apex(v0: number): { t: number; h: number } {
  return { t: v0 / 10, h: (v0 * v0) / 20 };
}

/** Braking from 20 m/s at 4 m/s². Stops at t = 5, distance 50 m. */
export function brakeMotion(t: number): { t: number; v: number; s: number } {
  const clamped = Math.min(5, Math.max(0, t));
  return { t: clamped, v: 20 - 4 * clamped, s: 20 * clamped - 2 * clamped * clamped };
}

export function brakeTimeFromDistance(s: number): number {
  const dist = Math.min(50, Math.max(0, s));
  const disc = 400 - 8 * dist;
  return (20 - Math.sqrt(Math.max(0, disc))) / 4;
}

export function cubic(x: number): number {
  return x ** 3 - 3 * x;
}

export function cubicSlope(x: number): number {
  return 3 * x * x - 3;
}

/** (x² − 1)/(x − 1) = x + 1 for x ≠ 1. The limit at 1 is 2. */
export function holeY(x: number): number {
  return x + 1;
}

export function jumpStudy(left: number, right: number, at: number): {
  exists: boolean;
  limit: number | null;
  continuous: boolean;
} {
  const exists = Math.abs(left - right) < 1e-9;
  return { exists, limit: exists ? left : null, continuous: exists && Math.abs(left - at) < 1e-9 };
}

/** Tea cooling toward room temperature 25°C. T(0) = 85. The limit is 25, not T(0). */
export function coolingTemp(t: number): number {
  return 25 + 60 * Math.exp(-t / 4);
}

/** Arch y = 2x − x². Integral from 0 to b is b² − b³/3. At b = 2 this is 4/3. */
export function archY(x: number): number {
  return 2 * x - x * x;
}

export function archIntegral(b: number): number {
  return b * b - (b * b * b) / 3;
}

/** One midpoint rectangle on [0, 2] has height y(1) = 1 and area 2, not 4/3. */
export function archRiemann(n: number, b: number): number {
  const strips = Math.max(1, Math.round(n));
  const width = b / strips;
  let sum = 0;
  for (let i = 0; i < strips; i += 1) sum += archY((i + 0.5) * width) * width;
  return sum;
}

/** Area between y = x and y = x² from 0 to b, with x on top for b in [0, 1]. At b = 1 this is 1/6. */
export function betweenIntegral(b: number): number {
  return (b * b) / 2 - (b * b * b) / 3;
}

/**
 * ∫_0^b (2x − x²)² dx = 4b³/3 − b⁴ + b⁵/5.
 * At b = 2 this is 16/15, so the volume of revolution is 16π/15.
 */
export function archVolumeCoeff(b: number): number {
  return (4 * b * b * b) / 3 - b ** 4 + (b ** 5) / 5;
}

/** Pairs of dice with at least one face equal to `face`. For any face: 11 pairs, one of them a double. */
export function diceCondition(face: number): { remain: number; both: number } {
  const f = Math.round(face);
  let remain = 0;
  let both = 0;
  for (let a = 1; a <= 6; a += 1) {
    for (let b = 1; b <= 6; b += 1) {
      if (a !== f && b !== f) continue;
      remain += 1;
      if (a === f && b === f) both += 1;
    }
  }
  return { remain, both };
}

export const BAYES_POP = 10000;

/**
 * Counts for a test on a town of `pop` people.
 * Default 1% prevalence, 99% sensitivity, 5% false positives:
 * 99 true positives, 495 false positives, posterior 99/594 = 1/6.
 */
export function bayes(
  prevalencePct: number,
  sensitivityPct: number,
  falsePositivePct: number,
  pop = BAYES_POP,
): { sick: number; well: number; tp: number; fp: number; positive: number; posterior: number } {
  const sick = (pop * prevalencePct) / 100;
  const well = pop - sick;
  const tp = (sick * sensitivityPct) / 100;
  const fp = (well * falsePositivePct) / 100;
  const positive = tp + fp;
  return { sick, well, tp, fp, positive, posterior: positive === 0 ? 0 : tp / positive };
}

export function comb(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let c = 1;
  for (let i = 0; i < k; i += 1) c = (c * (n - i)) / (i + 1);
  return Math.round(c);
}

export function binom(n: number, k: number, p: number): number {
  const nn = Math.round(n);
  const kk = Math.round(k);
  if (kk < 0 || kk > nn) return 0;
  return comb(nn, kk) * p ** kk * (1 - p) ** (nn - kk);
}

export function binomAtLeastOne(n: number, p: number): number {
  return 1 - (1 - p) ** Math.round(n);
}

/** A base is usable when it is positive and stays away from 1. 1ˣ is constantly 1, and log base 1 is undefined. */
export function baseOk(base: number): boolean {
  return base > 0 && Math.abs(base - 1) >= 0.05;
}

export function expY(base: number, x: number): number {
  if (!baseOk(base)) return Number.NaN;
  return base ** x;
}

export function logY(base: number, x: number): number {
  if (!baseOk(base) || x <= 0) return Number.NaN;
  return Math.log(x) / Math.log(base);
}

/** Compound growth of 10 triệu at `ratePct` percent per year. 8% for 5 years is about 14.69, not the simple 14. */
export function compoundAmount(ratePct: number, years: number, principal = 10): number {
  return principal * (1 + ratePct / 100) ** years;
}

export function simpleAmount(ratePct: number, years: number, principal = 10): number {
  return principal * (1 + (ratePct / 100) * years);
}

/** Years to double: ln 2 / ln(1 + r). At 8% this is about 9.01, not 8 and not 100/8 = 12.5. */
export function yearsToDouble(ratePct: number): number {
  if (ratePct <= 0) return Number.NaN;
  return Math.log(2) / Math.log(1 + ratePct / 100);
}

/** Half-life decay. 80 g with a 10-year half-life is 20 g after 20 years. */
export function decayMass(t: number, m0 = 80, half = 10): number {
  return m0 * 0.5 ** (t / half);
}

export function arithTerm(u1: number, d: number, n: number): number {
  return u1 + (Math.round(n) - 1) * d;
}

export function arithSum(u1: number, d: number, n: number): number {
  const count = Math.round(n);
  return (count / 2) * (u1 + arithTerm(u1, d, count));
}

export function geomTerm(u1: number, q: number, n: number): number {
  return u1 * q ** (Math.round(n) - 1);
}

export function geomPartial(u1: number, q: number, n: number): number {
  const count = Math.round(n);
  if (Math.abs(q - 1) < 1e-12) return u1 * count;
  return (u1 * (1 - q ** count)) / (1 - q);
}

/** Infinite geometric sum. Null when |q| ≥ 1. For 8 + 4 + 2 + … the sum is 16; the terms tend to 0 but no term is 0. */
export function geomInfinite(u1: number, q: number): number | null {
  if (!(Math.abs(q) < 1)) return null;
  return u1 / (1 - q);
}

/**
 * Path of a ball dropped from `height` that rebounds with ratio `ratio`.
 * The drop is counted once; every later bounce is up and down.
 * Height 8 m and ratio 1/2 give 8 + 2·(4 / (1 − 1/2)) = 24 m.
 */
export function bouncePath(height: number, ratio: number): number | null {
  if (!(ratio > 0 && ratio < 1)) return null;
  return height + (2 * height * ratio) / (1 - ratio);
}

/** Deposits 1 + 2 + … + n. Twelve months total 78, not 12×12 and not n(n−1)/2. */
export function savingsSum(months: number): number {
  const n = Math.round(months);
  return (n * (n + 1)) / 2;
}

export function cubicSecond(x: number): number {
  return 6 * x;
}

export function pureCubic(x: number): number {
  return x * x * x;
}

export function pureCubicSlope(x: number): number {
  return 3 * x * x;
}

/** y = x² / (x − 1), undefined at x = 1. Equals x + 1 + 1/(x − 1). */
export function rationalY(x: number): number {
  if (Math.abs(x - 1) < 1e-9) return Number.NaN;
  return (x * x) / (x - 1);
}

/** Oblique asymptote of x²/(x−1). It crosses the vertical asymptote at (1; 2), which is not on the graph. */
export function rationalOblique(x: number): number {
  return x + 1;
}

/** AM–GM for two positive numbers. Equality only when a = b. Null if either is not positive. */
export function amGm(a: number, b: number): { am: number; gm: number } | null {
  if (!(a > 0) || !(b > 0)) return null;
  return { am: (a + b) / 2, gm: Math.sqrt(a * b) };
}

/** (a²+b²)(c²+d²) ≥ (ac+bd)². Equality when (a,b) and (c,d) are proportional. */
export function cauchyPair(a: number, b: number, c: number, d: number): { left: number; right: number; equal: boolean } {
  const left = (a * a + b * b) * (c * c + d * d);
  const right = (a * c + b * d) ** 2;
  return { left, right, equal: Math.abs(a * d - b * c) <= 1e-8 * (1 + Math.abs(left)) };
}

/** Desks x and chairs y. Wood x+y ≤ 10, labour 2x+y ≤ 16, profit 5x+3y. Maximum 42 at (6, 4). */
export function workshopOk(x: number, y: number): boolean {
  return x >= -1e-9 && y >= -1e-9 && x + y <= 10 + 1e-9 && 2 * x + y <= 16 + 1e-9;
}

export function workshopProfit(x: number, y: number): number {
  return 5 * x + 3 * y;
}

export function vec3Add(u: readonly [number, number, number], v: readonly [number, number, number]): [number, number, number] {
  return [u[0] + v[0], u[1] + v[1], u[2] + v[2]];
}

export function vec3Dot(u: readonly [number, number, number], v: readonly [number, number, number]): number {
  return u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
}

export function vec3Len(u: readonly [number, number, number]): number {
  return Math.hypot(u[0], u[1], u[2]);
}

export function vec3Cross(u: readonly [number, number, number], v: readonly [number, number, number]): [number, number, number] {
  return [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
}

/** 2×2 determinant ad − bc. */
export function det2(a: number, b: number, c: number, d: number): number {
  return a * d - b * c;
}

/** Unique solution of a1 x + b1 y = c1, a2 x + b2 y = c2. Null when the determinant is 0. */
export function solve2(a1: number, b1: number, c1: number, a2: number, b2: number, c2: number): { x: number; y: number } | null {
  const d = det2(a1, b1, a2, b2);
  if (Math.abs(d) < 1e-9) return null;
  return { x: det2(c1, b1, c2, b2) / d, y: det2(a1, c1, a2, c2) / d };
}

/** Distance from (x, y) to ax + by + c = 0. */
export function lineDist(a: number, b: number, c: number, x: number, y: number): number {
  const norm = Math.hypot(a, b);
  if (norm < 1e-9) return Number.NaN;
  return Math.abs(a * x + b * y + c) / norm;
}

/** Foot of the perpendicular from (x, y) onto ax + by + c = 0. */
export function lineFoot2(a: number, b: number, c: number, x: number, y: number): { x: number; y: number; dist: number } {
  const norm = a * a + b * b;
  if (norm < 1e-12) return { x, y, dist: Number.NaN };
  const t = (a * x + b * y + c) / norm;
  const fx = x - a * t;
  const fy = y - b * t;
  return { x: fx, y: fy, dist: Math.hypot(x - fx, y - fy) };
}

/** Distance from (x, y, z) to ax + by + cz + d = 0. */
export function planeDist(a: number, b: number, c: number, d: number, x: number, y: number, z: number): number {
  const norm = Math.hypot(a, b, c);
  if (norm < 1e-9) return Number.NaN;
  return Math.abs(a * x + b * y + c * z + d) / norm;
}

export function planeFoot(a: number, b: number, c: number, d: number, x: number, y: number, z: number): { x: number; y: number; z: number; dist: number } {
  const norm = a * a + b * b + c * c;
  if (norm < 1e-12) return { x, y, z, dist: Number.NaN };
  const t = (a * x + b * y + c * z + d) / norm;
  const fx = x - a * t;
  const fy = y - b * t;
  const fz = z - c * t;
  return { x: fx, y: fy, z: fz, dist: Math.hypot(x - fx, y - fy, z - fz) };
}

/** Origin-centred circle. (3, 4) lies on the circle of radius 5. (6, 0) lies outside it. */
export function circlePlace(x: number, y: number, radius: number): "in" | "on" | "out" {
  const gap = x * x + y * y - radius * radius;
  if (Math.abs(gap) <= 1e-6) return "on";
  return gap < 0 ? "in" : "out";
}

export function triArea(base: number, height: number): number {
  return (base * height) / 2;
}

export function boxVolume(length: number, width: number, height: number): number {
  return length * width * height;
}

export function boxBase(length: number, width: number): number {
  return length * width;
}

/** Square pyramid. Volume is one third of base area times height, not the base area itself. */
export function pyramidVolume(side: number, height: number): number {
  return (side * side * height) / 3;
}

export function pyramidBase(side: number): number {
  return side * side;
}

/** Regular tetrahedron of edge a. Volume a³√2 / 12. All six edges equal a. */
export function tetraVolume(edge: number): number {
  return (edge * edge * edge * Math.sqrt(2)) / 12;
}

export function tetraVerts(edge: number): [number, number, number][] {
  const a = edge;
  return [
    [0, 0, 0],
    [a, 0, 0],
    [a / 2, (a * Math.sqrt(3)) / 2, 0],
    [a / 2, (a * Math.sqrt(3)) / 6, (a * Math.sqrt(6)) / 3],
  ];
}

/** P(n, k) = n! / (n−k)!. Order counts. */
export function arrange(n: number, k: number): number {
  const nn = Math.round(n);
  const kk = Math.round(k);
  if (kk < 0 || kk > nn) return 0;
  let p = 1;
  for (let i = 0; i < kk; i += 1) p *= nn - i;
  return p;
}

export function meanOf(values: readonly number[]): number {
  if (values.length === 0) return Number.NaN;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/** Middle value after sorting. For 2, 3, 4, 5, 20 the median stays 4. */
export function medianOf(values: readonly number[]): number {
  if (values.length === 0) return Number.NaN;
  const sorted = [...values].sort((p, q) => p - q);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) return sorted[mid] ?? Number.NaN;
  return ((sorted[mid - 1] ?? 0) + (sorted[mid] ?? 0)) / 2;
}

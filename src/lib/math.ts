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

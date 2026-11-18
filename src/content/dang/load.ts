import type { TopicDang } from "./types.ts";

/**
 * Dạng bài của một tờ, tải khi cần. index.ts giữ bản gom đủ mười bốn tờ cho test;
 * trang chỉ dùng tệp này để không phải mang dạng bài của cả mười bốn tờ (~290 KB).
 */
const loaders: Record<string, () => Promise<TopicDang>> = {
  quadratic: () => import("./quadratic.ts").then((mod) => mod.quadraticDang),
  ineq: () => import("./ineq.ts").then((mod) => mod.ineqDang),
  exp: () => import("./exp.ts").then((mod) => mod.expDang),
  sequence: () => import("./sequence.ts").then((mod) => mod.sequenceDang),
  trig: () => import("./trig.ts").then((mod) => mod.trigDang),
  limit: () => import("./limit.ts").then((mod) => mod.limitDang),
  derivative: () => import("./derivative.ts").then((mod) => mod.derivativeDang),
  survey: () => import("./survey.ts").then((mod) => mod.surveyDang),
  integral: () => import("./integral.ts").then((mod) => mod.integralDang),
  vector: () => import("./vector.ts").then((mod) => mod.vectorDang),
  analytic: () => import("./analytic.ts").then((mod) => mod.analyticDang),
  triangle: () => import("./triangle.ts").then((mod) => mod.triangleDang),
  combo: () => import("./combo.ts").then((mod) => mod.comboDang),
  probability: () => import("./probability.ts").then((mod) => mod.probabilityDang),
};

export const DANG_IDS: readonly string[] = Object.keys(loaders);

export function hasDang(id: string): boolean {
  return Object.prototype.hasOwnProperty.call(loaders, id);
}

export function loadDang(id: string): Promise<TopicDang | null> {
  return hasDang(id) ? loaders[id]!() : Promise.resolve(null);
}

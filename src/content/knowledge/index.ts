import type { TopicKnowledge } from "./types.ts";

/** Mỗi chuyên đề một tệp, tải khi cần: trang một tờ không phải mang cả mười bốn bộ. */
const loaders: Record<string, () => Promise<TopicKnowledge>> = {
  quadratic: () => import("./quadratic.ts").then((mod) => mod.quadraticKnowledge),
  ineq: () => import("./ineq.ts").then((mod) => mod.ineqKnowledge),
  exp: () => import("./exp.ts").then((mod) => mod.expKnowledge),
  sequence: () => import("./sequence.ts").then((mod) => mod.sequenceKnowledge),
  trig: () => import("./trig.ts").then((mod) => mod.trigKnowledge),
  limit: () => import("./limit.ts").then((mod) => mod.limitKnowledge),
  derivative: () => import("./derivative.ts").then((mod) => mod.derivativeKnowledge),
  survey: () => import("./survey.ts").then((mod) => mod.surveyKnowledge),
  integral: () => import("./integral.ts").then((mod) => mod.integralKnowledge),
  vector: () => import("./vector.ts").then((mod) => mod.vectorKnowledge),
  analytic: () => import("./analytic.ts").then((mod) => mod.analyticKnowledge),
  triangle: () => import("./triangle.ts").then((mod) => mod.triangleKnowledge),
  combo: () => import("./combo.ts").then((mod) => mod.comboKnowledge),
  probability: () => import("./probability.ts").then((mod) => mod.probabilityKnowledge),
};

export const KNOWLEDGE_IDS: readonly string[] = Object.keys(loaders);

export function hasKnowledge(id: string): boolean {
  return Object.prototype.hasOwnProperty.call(loaders, id);
}

export function loadKnowledge(id: string): Promise<TopicKnowledge | null> {
  return hasKnowledge(id) ? loaders[id]!() : Promise.resolve(null);
}

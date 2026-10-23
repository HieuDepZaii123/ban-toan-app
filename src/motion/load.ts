import type { CardId } from "../content/cards.ts";
import type { Clip } from "./types.ts";

const loaders = {
  quadratic: () => import("./clips/quadratic.ts"),
  ineq: () => import("./clips/ineq.ts"),
  exp: () => import("./clips/exp.ts"),
  sequence: () => import("./clips/sequence.ts"),
  trig: () => import("./clips/trig.ts"),
  limit: () => import("./clips/limit.ts"),
  derivative: () => import("./clips/derivative.ts"),
  survey: () => import("./clips/survey.ts"),
  integral: () => import("./clips/integral.ts"),
  vector: () => import("./clips/vector.ts"),
  analytic: () => import("./clips/analytic.ts"),
  triangle: () => import("./clips/triangle.ts"),
  combo: () => import("./clips/combo.ts"),
  probability: () => import("./clips/probability.ts"),
} satisfies Record<CardId, () => Promise<Clip>>;

function isCardId(id: string): id is CardId {
  return Object.prototype.hasOwnProperty.call(loaders, id);
}

export function loadClip(id: string): Promise<Clip> {
  if (!isCardId(id)) return Promise.reject(new Error("missing clip"));
  return loaders[id]();
}

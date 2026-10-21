import type { Clip } from "./types.ts";

export function loadClip(id: string): Promise<Clip> {
  switch (id) {
    case "quadratic":
      return import("./clips/quadratic.ts");
    case "ineq":
      return import("./clips/ineq.ts");
    case "exp":
      return import("./clips/exp.ts");
    case "sequence":
      return import("./clips/sequence.ts");
    case "trig":
      return import("./clips/trig.ts");
    case "limit":
      return import("./clips/limit.ts");
    case "derivative":
      return import("./clips/derivative.ts");
    case "survey":
      return import("./clips/survey.ts");
    case "integral":
      return import("./clips/integral.ts");
    case "vector":
      return import("./clips/vector.ts");
    case "analytic":
      return import("./clips/analytic.ts");
    case "triangle":
      return import("./clips/triangle.ts");
    case "combo":
      return import("./clips/combo.ts");
    case "probability":
      return import("./clips/probability.ts");
    default:
      return Promise.reject(new Error("missing clip"));
  }
}

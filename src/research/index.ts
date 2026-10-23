import { algebraStudies } from "./algebra.ts";
import { calcStudies } from "./calc.ts";
import { spaceStudies } from "./space.ts";
import type { Study } from "./types.ts";

export const allStudies: Study[] = [...algebraStudies, ...calcStudies, ...spaceStudies];

export function studiesFor(topic: string): Study[] {
  return allStudies.filter((study) => study.topic === topic);
}

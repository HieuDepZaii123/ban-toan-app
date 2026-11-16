import { labSpecs as base, type LabSpec } from "./challenges.ts";
import { extra } from "./labExtra.ts";

/** Base challenges followed by the harder and open-ended ones, per lab. */
export const allLabSpecs: Record<string, LabSpec> = Object.fromEntries(
  Object.entries(base).map(([id, spec]) => [id, { ...spec, challenges: [...spec.challenges, ...(extra[id] ?? [])] }]),
);

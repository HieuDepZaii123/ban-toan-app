import type { Question } from "../../types.ts";
import type { Draw, Stem, Vary } from "../types.ts";
import { holds, worldFits, type Claim, type Params, type Pred, type World } from "./expr.ts";

export type Verdict = "dung" | "sai" | "thieu";

export const VERDICT_CODE: Record<Verdict, 0 | 1 | 2> = { dung: 0, sai: 1, thieu: 2 };

export type Axis = { name: string; values: readonly number[] };

export function fact(
  id: string,
  verdict: Verdict,
  vi: string,
  en: string,
  reasonVi: (params: Params) => string,
  reasonEn: (params: Params) => string,
  claim: Claim,
  extra?: { counter?: (params: Params) => World; yes?: (params: Params) => World; no?: (params: Params) => World },
): Fact {
  return { id, verdict, vi, en, reasonVi, reasonEn, claim, ...extra };
}

export type Fact = {
  id: string;
  verdict: Verdict;
  vi: string;
  en: string;
  reasonVi: (params: Params) => string;
  reasonEn: (params: Params) => string;
  claim: Claim;
  /** A world inside the given data where a Sai statement fails. */
  counter?: (params: Params) => World;
  /** Two worlds inside the given data that disagree. */
  yes?: (params: Params) => World;
  no?: (params: Params) => World;
};

export type DssItem = {
  id: string;
  context: (params: Params) => string;
  contextEn: (params: Params) => string;
  hint: string;
  hintEn: string;
  /** `rng() === 0` uses the first row. Verdicts must not change across rows. */
  rows: readonly Params[];
  fixed: (params: Params) => World;
  free: readonly Axis[];
  fits: (params: Params) => Pred[];
  facts: readonly Fact[];
};

export function grid(item: DssItem, params: Params): World[] {
  const out: World[] = [];
  const walk = (index: number, world: World): void => {
    if (index >= item.free.length) {
      if (worldFits(item.fits(params), params, world)) out.push(world);
      return;
    }
    const axis = item.free[index];
    if (!axis) return;
    for (const value of axis.values) walk(index + 1, { ...world, [axis.name]: value });
  };
  walk(0, { ...item.fixed(params) });
  return out;
}

/** What the grid says, independent of the label on the fact. */
export function classify(claim: Claim, params: Params, worlds: readonly World[]): Verdict | "empty" {
  let yes = false;
  let no = false;
  for (const world of worlds) {
    if (holds(claim, params, world)) yes = true;
    else no = true;
  }
  if (!yes && !no) return "empty";
  if (yes && no) return "thieu";
  return yes ? "dung" : "sai";
}

function shuffle<T>(items: readonly T[], rng: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const left = out[i];
    const right = out[j];
    if (left === undefined || right === undefined) continue;
    out[i] = right;
    out[j] = left;
  }
  return out;
}

function quad<T>(items: readonly T[]): [T, T, T, T] {
  const a = items[0];
  const b = items[1];
  const c = items[2];
  const d = items[3];
  if (a === undefined || b === undefined || c === undefined || d === undefined) throw new Error("need 4 statements");
  return [a, b, c, d];
}

/** One Chưa đủ is always in the four. `rng() === 0` keeps the first row and a stable set. */
export function drawFacts(item: DssItem, rng: () => number): { params: Params; facts: [Fact, Fact, Fact, Fact] } {
  const row = item.rows[Math.floor(rng() * item.rows.length)] ?? item.rows[0];
  if (!row) throw new Error(`${item.id} has no rows`);
  const open = item.facts.filter((fact) => fact.verdict === "thieu");
  const must = open[Math.floor(rng() * open.length)] ?? open[0];
  if (!must) throw new Error(`${item.id} has no Chưa đủ statement`);
  const rest = shuffle(item.facts.filter((fact) => fact !== must), rng).slice(0, 3);
  return { params: row, facts: quad(shuffle([must, ...rest], rng)) };
}

function stemFrom(item: DssItem, params: Params, facts: readonly [Fact, Fact, Fact, Fact]): Stem {
  const reasons = facts.map((fact) => fact.reasonVi(params));
  const reasonsEn = facts.map((fact) => fact.reasonEn(params));
  const [r0, r1, r2, r3] = reasons;
  const [e0, e1, e2, e3] = reasonsEn;
  if (r0 === undefined || r1 === undefined || r2 === undefined || r3 === undefined) throw new Error(item.id);
  if (e0 === undefined || e1 === undefined || e2 === undefined || e3 === undefined) throw new Error(item.id);
  return {
    id: item.id,
    kind: "dss",
    prompt: item.context(params),
    promptEn: item.contextEn(params),
    choices: [facts[0].vi, facts[1].vi, facts[2].vi, facts[3].vi],
    choicesEn: [facts[0].en, facts[1].en, facts[2].en, facts[3].en],
    hint: item.hint,
    hintEn: item.hintEn,
    steps: [
      item.hint,
      "Đúng cần một lý do, Sai cần một phản ví dụ, Chưa đủ cần hai trường hợp trái nhau.",
      "Mỗi mệnh đề đúng được một điểm.",
    ],
    stepsEn: [
      item.hintEn,
      "True needs a reason, false needs a counterexample, and not-enough needs two cases that disagree.",
      "Each true statement is worth one point.",
    ],
    verdicts: [facts[0].verdict, facts[1].verdict, facts[2].verdict, facts[3].verdict],
    reasons: [r0, r1, r2, r3],
    reasonsEn: [e0, e1, e2, e3],
  };
}

export function publishItem(item: DssItem): Question {
  const drawn = drawFacts(item, () => 0);
  const stem = stemFrom(item, drawn.params, drawn.facts);
  return {
    id: stem.id,
    kind: "dss",
    prompt: stem.prompt,
    promptEn: stem.promptEn,
    choices: stem.choices,
    choicesEn: stem.choicesEn,
    answer: 0,
    hint: stem.hint,
    hintEn: stem.hintEn,
    steps: stem.steps,
    stepsEn: stem.stepsEn,
    verdicts: stem.verdicts,
    reasons: stem.reasons,
    reasonsEn: stem.reasonsEn,
  };
}

export function varyItem(item: DssItem): Vary {
  return {
    id: item.id,
    fixed: false,
    kind: "dss",
    draw: (rng): Draw => {
      const drawn = drawFacts(item, rng);
      return { params: drawn.params, stem: stemFrom(item, drawn.params, drawn.facts) };
    },
  };
}

export function publishAll(items: readonly DssItem[]): Question[] {
  return items.map(publishItem);
}

export function varyAll(items: readonly DssItem[]): Vary[] {
  return items.map(varyItem);
}

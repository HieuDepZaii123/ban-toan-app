import type { Question } from "../types.ts";
import type { Draw, Stem, Vary } from "./types.ts";

/** One statement in a discrimination pool. `ok` is whether the statement is true. */
export type Claim = {
  id: string;
  vi: string;
  en: string;
  ok: boolean;
  /** One formula line. A true claim says why it holds; a false claim names the misconception. */
  noteVi: string;
  noteEn: string;
};

export type Pool = {
  id: string;
  prompt: string;
  promptEn: string;
  hint: string;
  hintEn: string;
  /** Nhìn: the distinction, the same on every draw. */
  lookVi: string;
  lookEn: string;
  claims: readonly Claim[];
};

export function claim(
  id: string,
  ok: boolean,
  vi: string,
  en: string,
  noteVi: string,
  noteEn: string,
): Claim {
  return { id, ok, vi, en, noteVi, noteEn };
}

function parts(pool: Pool): { trues: Claim[]; falses: Claim[] } {
  const trues = pool.claims.filter((item) => item.ok);
  const falses = pool.claims.filter((item) => !item.ok);
  if (trues.length < 2 || falses.length !== 4 || pool.claims.length < 6) {
    throw new Error(`${pool.id} needs at least 2 true claims and exactly 4 false ones`);
  }
  const ids = new Set(pool.claims.map((item) => item.id));
  const vi = new Set(pool.claims.map((item) => item.vi));
  const en = new Set(pool.claims.map((item) => item.en));
  if (ids.size !== pool.claims.length || vi.size !== pool.claims.length || en.size !== pool.claims.length) {
    throw new Error(`${pool.id} has a repeated id or statement`);
  }
  return { trues, falses };
}

function three<T>(items: readonly T[], skip: number): readonly [T, T, T] {
  const picked: T[] = [];
  for (let i = 0; i < items.length; i += 1) {
    if (i === skip) continue;
    const item = items[i];
    if (item !== undefined) picked.push(item);
  }
  const a = picked[0];
  const b = picked[1];
  const c = picked[2];
  if (picked.length !== 3 || a === undefined || b === undefined || c === undefined) {
    throw new Error("a pool draw must leave exactly 3 false claims");
  }
  return [a, b, c];
}

function stemFrom(pool: Pool, correct: Claim, wrong: readonly [Claim, Claim, Claim]): Stem {
  const [first, second, third] = wrong;
  return {
    id: pool.id,
    kind: "concept",
    prompt: pool.prompt,
    promptEn: pool.promptEn,
    choices: [correct.vi, first.vi, second.vi, third.vi],
    choicesEn: [correct.en, first.en, second.en, third.en],
    hint: pool.hint,
    hintEn: pool.hintEn,
    steps: [pool.lookVi, correct.noteVi, `${first.noteVi} ${second.noteVi} ${third.noteVi}`],
    stepsEn: [pool.lookEn, correct.noteEn, `${first.noteEn} ${second.noteEn} ${third.noteEn}`],
  };
}

/** `rng() === 0` picks the first true claim and drops the first false claim. */
export function drawPool(pool: Pool, rng: () => number): Draw {
  const { trues, falses } = parts(pool);
  const ti = Math.floor(rng() * trues.length);
  const skip = Math.floor(rng() * falses.length);
  const correct = trues[ti];
  if (!correct) throw new Error(pool.id);
  return { params: { t: ti, skip }, stem: stemFrom(pool, correct, three(falses, skip)) };
}

export type Combo = { correct: Claim; wrong: readonly [Claim, Claim, Claim] };

/** Every shown set: one true claim and one 3-subset of the false claims. */
export function combinations(pool: Pool): Combo[] {
  const { trues, falses } = parts(pool);
  const out: Combo[] = [];
  for (const correct of trues) {
    for (let skip = 0; skip < falses.length; skip += 1) {
      out.push({ correct, wrong: three(falses, skip) });
    }
  }
  return out;
}

export function publish(pool: Pool): Question {
  const stem = drawPool(pool, () => 0).stem;
  return {
    id: stem.id,
    kind: "concept",
    prompt: stem.prompt,
    promptEn: stem.promptEn,
    choices: stem.choices,
    choicesEn: stem.choicesEn,
    answer: 0,
    hint: stem.hint,
    hintEn: stem.hintEn,
    steps: stem.steps,
    stepsEn: stem.stepsEn,
  };
}

export function varyFrom(pool: Pool): Vary {
  return { id: pool.id, fixed: false, kind: "concept", draw: (rng) => drawPool(pool, rng) };
}

import type { Stem } from "../content/vary/types.ts";
import type { Question } from "../content/types.ts";
import { freshSeed, mulberry32, shuffleIds } from "../lib/prng.ts";

/** Put the correct choice (stem index 0) at `pos`. Distractor order comes from the seed. */
export function arrange(stem: Stem, pos: number, seed: number): Question {
  const rng = mulberry32(Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b) >>> 0);
  const slots = [1, 2, 3];
  for (let i = slots.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const left = slots[i];
    const right = slots[j];
    if (left === undefined || right === undefined) continue;
    slots[i] = right;
    slots[j] = left;
  }
  const choices: string[] = [];
  const choicesEn: string[] = [];
  let distractor = 0;
  for (let i = 0; i < 4; i += 1) {
    const src = i === pos ? 0 : slots[distractor++];
    choices.push(stem.choices[src ?? 0] ?? "");
    choicesEn.push(stem.choicesEn[src ?? 0] ?? "");
  }
  const answer = pos as 0 | 1 | 2 | 3;
  return {
    id: stem.id,
    prompt: stem.prompt,
    promptEn: stem.promptEn,
    choices: [choices[0] ?? "", choices[1] ?? "", choices[2] ?? "", choices[3] ?? ""],
    choicesEn: [choicesEn[0] ?? "", choicesEn[1] ?? "", choicesEn[2] ?? "", choicesEn[3] ?? ""],
    answer,
    hint: stem.hint,
    hintEn: stem.hintEn,
    steps: stem.steps,
    stepsEn: stem.stepsEn,
  };
}

/** Question order for this tab session. A new session shuffles again. */
export function sessionQuestions<T extends { id: string }>(topicId: string, questions: readonly T[]): T[] {
  const ids = questions.map((question) => question.id);
  const key = `ban-toan-qorder:${topicId}`;
  const byId = new Map(questions.map((question) => [question.id, question]));
  try {
    const saved = sessionStorage.getItem(key);
    if (saved) {
      const parsed: unknown = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length === ids.length && parsed.every((id) => typeof id === "string" && byId.has(id))) {
        return parsed.map((id) => byId.get(id as string)!);
      }
    }
  } catch {
    /* a broken session value is replaced below */
  }
  const next = shuffleIds(ids, freshSeed());
  try {
    sessionStorage.setItem(key, JSON.stringify(next));
  } catch {
    /* private mode: this visit still has an order, it just will not survive reload */
  }
  return next.map((id) => byId.get(id)!);
}

import type { Question } from "../types.ts";

/** Choices are stored with the correct text first. Display order is applied later. */
export type Stem = {
  id: string;
  prompt: string;
  promptEn: string;
  choices: [string, string, string, string];
  choicesEn: [string, string, string, string];
  hint: string;
  hintEn: string;
  steps: [string, string, string];
  stepsEn: [string, string, string];
};

export type Draw = {
  params: Record<string, number>;
  stem: Stem;
};

export type Vary = {
  id: string;
  /** A pure concept question. The text does not change from attempt to attempt. */
  fixed: boolean;
  draw: (rng: () => number) => Draw;
};

export function stemOf(question: Question): Stem {
  return {
    id: question.id,
    prompt: question.prompt,
    promptEn: question.promptEn,
    choices: question.choices,
    choicesEn: question.choicesEn,
    hint: question.hint,
    hintEn: question.hintEn,
    steps: question.steps,
    stepsEn: question.stepsEn,
  };
}

export function fixedVary(question: Question): Vary {
  const stem = stemOf(question);
  return { id: question.id, fixed: true, draw: () => ({ params: {}, stem }) };
}

function sameParams(a: Record<string, number>, b: Record<string, number>): boolean {
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every((key) => a[key] === b[key]);
}

/** `sample(() => 0)` is the published question. Other draws keep its wording and change the numbers. */
export function parametric(
  question: Question,
  sample: (rng: () => number) => Record<string, number>,
  build: (params: Record<string, number>) => Stem,
): Vary {
  const canonical = sample(() => 0);
  return {
    id: question.id,
    fixed: false,
    draw: (rng) => {
      const params = sample(rng);
      if (sameParams(params, canonical)) return { params, stem: stemOf(question) };
      return { params, stem: build(params) };
    },
  };
}

export function quad(
  correct: string,
  wrong: [string, string, string],
  correctEn: string,
  wrongEn: [string, string, string],
): { choices: Stem["choices"]; choicesEn: Stem["choicesEn"] } {
  return {
    choices: [correct, wrong[0], wrong[1], wrong[2]],
    choicesEn: [correctEn, wrongEn[0], wrongEn[1], wrongEn[2]],
  };
}

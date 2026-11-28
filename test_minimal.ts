import type { Question } from "./src/content/types.ts";

const R = String.raw;

const q: Question = {
  id: "test",
  prompt: R`Test prompt $x$`,
  promptEn: R`Test prompt $x$`,
  choices: [R`choice1`, R`choice2`],
  choicesEn: [R`choice1`, R`choice2`],
  answer: 0,
  hint: R`Hint $x$`,
  hintEn: R`Hint $x$`,
  steps: [R`Step $x$`],
  stepsEn: [R`Step $x$`],
};
export { q };
/**
 * Static join of every sheet for scripts/check-math.ts only.
 * The app loads one sheet at a time through src/content/loadTopic.ts.
 */
import { analyticLesson, analyticQuestions } from "../src/content/analytic.ts";
import type { CardId } from "../src/content/cards.ts";
import { comboLesson, comboQuestions } from "../src/content/combo.ts";
import { derivativeLesson, derivativeQuestions } from "../src/content/derivative.ts";
import { expLesson, expQuestions } from "../src/content/exp.ts";
import { ineqLesson, ineqQuestions } from "../src/content/ineq.ts";
import { integralLesson, integralQuestions } from "../src/content/integral.ts";
import { limitLesson, limitQuestions } from "../src/content/limit.ts";
import { probabilityLesson, probabilityQuestions } from "../src/content/probability.ts";
import { quadraticLesson, quadraticQuestions } from "../src/content/quadratic.ts";
import { sequenceLesson, sequenceQuestions } from "../src/content/sequence.ts";
import { surveyLesson, surveyQuestions } from "../src/content/survey.ts";
import { triangleLesson, triangleQuestions } from "../src/content/triangle.ts";
import { trigLesson, trigQuestions } from "../src/content/trig.ts";
import type { Lesson, Question } from "../src/content/types.ts";
import { vectorLesson, vectorQuestions } from "../src/content/vector.ts";

const banks = {
  quadratic: { lesson: quadraticLesson, questions: quadraticQuestions },
  ineq: { lesson: ineqLesson, questions: ineqQuestions },
  exp: { lesson: expLesson, questions: expQuestions },
  sequence: { lesson: sequenceLesson, questions: sequenceQuestions },
  trig: { lesson: trigLesson, questions: trigQuestions },
  limit: { lesson: limitLesson, questions: limitQuestions },
  derivative: { lesson: derivativeLesson, questions: derivativeQuestions },
  survey: { lesson: surveyLesson, questions: surveyQuestions },
  integral: { lesson: integralLesson, questions: integralQuestions },
  vector: { lesson: vectorLesson, questions: vectorQuestions },
  analytic: { lesson: analyticLesson, questions: analyticQuestions },
  triangle: { lesson: triangleLesson, questions: triangleQuestions },
  combo: { lesson: comboLesson, questions: comboQuestions },
  probability: { lesson: probabilityLesson, questions: probabilityQuestions },
} satisfies Record<CardId, { lesson: Lesson; questions: Question[] }>;

function isSheet(id: string): id is CardId {
  return Object.prototype.hasOwnProperty.call(banks, id);
}

export function questionsFor(id: string): Question[] {
  if (!isSheet(id)) return [];
  return banks[id].questions;
}

export function lessonFor(id: string): Lesson | undefined {
  if (!isSheet(id)) return undefined;
  return banks[id].lesson;
}

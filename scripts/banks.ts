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
import { analyticConceptQuestions } from "../src/content/vary/concept/analytic.ts";
import { comboConceptQuestions } from "../src/content/vary/concept/combo.ts";
import { derivativeConceptQuestions } from "../src/content/vary/concept/derivative.ts";
import { expConceptQuestions } from "../src/content/vary/concept/exp.ts";
import { ineqConceptQuestions } from "../src/content/vary/concept/ineq.ts";
import { integralConceptQuestions } from "../src/content/vary/concept/integral.ts";
import { limitConceptQuestions } from "../src/content/vary/concept/limit.ts";
import { probabilityConceptQuestions } from "../src/content/vary/concept/probability.ts";
import { quadraticConceptQuestions } from "../src/content/vary/concept/quadratic.ts";
import { sequenceConceptQuestions } from "../src/content/vary/concept/sequence.ts";
import { surveyConceptQuestions } from "../src/content/vary/concept/survey.ts";
import { triangleConceptQuestions } from "../src/content/vary/concept/triangle.ts";
import { trigConceptQuestions } from "../src/content/vary/concept/trig.ts";
import { vectorConceptQuestions } from "../src/content/vary/concept/vector.ts";

const banks = {
  quadratic: { lesson: quadraticLesson, questions: [...quadraticQuestions, ...quadraticConceptQuestions] },
  ineq: { lesson: ineqLesson, questions: [...ineqQuestions, ...ineqConceptQuestions] },
  exp: { lesson: expLesson, questions: [...expQuestions, ...expConceptQuestions] },
  sequence: { lesson: sequenceLesson, questions: [...sequenceQuestions, ...sequenceConceptQuestions] },
  trig: { lesson: trigLesson, questions: [...trigQuestions, ...trigConceptQuestions] },
  limit: { lesson: limitLesson, questions: [...limitQuestions, ...limitConceptQuestions] },
  derivative: { lesson: derivativeLesson, questions: [...derivativeQuestions, ...derivativeConceptQuestions] },
  survey: { lesson: surveyLesson, questions: [...surveyQuestions, ...surveyConceptQuestions] },
  integral: { lesson: integralLesson, questions: [...integralQuestions, ...integralConceptQuestions] },
  vector: { lesson: vectorLesson, questions: [...vectorQuestions, ...vectorConceptQuestions] },
  analytic: { lesson: analyticLesson, questions: [...analyticQuestions, ...analyticConceptQuestions] },
  triangle: { lesson: triangleLesson, questions: [...triangleQuestions, ...triangleConceptQuestions] },
  combo: { lesson: comboLesson, questions: [...comboQuestions, ...comboConceptQuestions] },
  probability: { lesson: probabilityLesson, questions: [...probabilityQuestions, ...probabilityConceptQuestions] },
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

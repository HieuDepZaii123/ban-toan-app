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
import { analyticDssQuestions } from "../src/content/vary/dss/analytic.ts";
import { comboDssQuestions } from "../src/content/vary/dss/combo.ts";
import { derivativeDssQuestions } from "../src/content/vary/dss/derivative.ts";
import { expDssQuestions } from "../src/content/vary/dss/exp.ts";
import { ineqDssQuestions } from "../src/content/vary/dss/ineq.ts";
import { integralDssQuestions } from "../src/content/vary/dss/integral.ts";
import { limitDssQuestions } from "../src/content/vary/dss/limit.ts";
import { probabilityDssQuestions } from "../src/content/vary/dss/probability.ts";
import { quadraticDssQuestions } from "../src/content/vary/dss/quadratic.ts";
import { sequenceDssQuestions } from "../src/content/vary/dss/sequence.ts";
import { surveyDssQuestions } from "../src/content/vary/dss/survey.ts";
import { triangleDssQuestions } from "../src/content/vary/dss/triangle.ts";
import { trigDssQuestions } from "../src/content/vary/dss/trig.ts";
import { vectorDssQuestions } from "../src/content/vary/dss/vector.ts";

const banks = {
  quadratic: { lesson: quadraticLesson, questions: [...quadraticQuestions, ...quadraticConceptQuestions, ...quadraticDssQuestions] },
  ineq: { lesson: ineqLesson, questions: [...ineqQuestions, ...ineqConceptQuestions, ...ineqDssQuestions] },
  exp: { lesson: expLesson, questions: [...expQuestions, ...expConceptQuestions, ...expDssQuestions] },
  sequence: { lesson: sequenceLesson, questions: [...sequenceQuestions, ...sequenceConceptQuestions, ...sequenceDssQuestions] },
  trig: { lesson: trigLesson, questions: [...trigQuestions, ...trigConceptQuestions, ...trigDssQuestions] },
  limit: { lesson: limitLesson, questions: [...limitQuestions, ...limitConceptQuestions, ...limitDssQuestions] },
  derivative: { lesson: derivativeLesson, questions: [...derivativeQuestions, ...derivativeConceptQuestions, ...derivativeDssQuestions] },
  survey: { lesson: surveyLesson, questions: [...surveyQuestions, ...surveyConceptQuestions, ...surveyDssQuestions] },
  integral: { lesson: integralLesson, questions: [...integralQuestions, ...integralConceptQuestions, ...integralDssQuestions] },
  vector: { lesson: vectorLesson, questions: [...vectorQuestions, ...vectorConceptQuestions, ...vectorDssQuestions] },
  analytic: { lesson: analyticLesson, questions: [...analyticQuestions, ...analyticConceptQuestions, ...analyticDssQuestions] },
  triangle: { lesson: triangleLesson, questions: [...triangleQuestions, ...triangleConceptQuestions, ...triangleDssQuestions] },
  combo: { lesson: comboLesson, questions: [...comboQuestions, ...comboConceptQuestions, ...comboDssQuestions] },
  probability: { lesson: probabilityLesson, questions: [...probabilityQuestions, ...probabilityConceptQuestions, ...probabilityDssQuestions] },
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

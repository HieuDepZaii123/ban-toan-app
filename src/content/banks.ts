import { analyticLesson, analyticQuestions } from "./analytic.ts";
import { comboLesson, comboQuestions } from "./combo.ts";
import { derivativeLesson, derivativeQuestions } from "./derivative.ts";
import { expLesson, expQuestions } from "./exp.ts";
import { ineqLesson, ineqQuestions } from "./ineq.ts";
import { integralLesson, integralQuestions } from "./integral.ts";
import { limitLesson, limitQuestions } from "./limit.ts";
import { probabilityLesson, probabilityQuestions } from "./probability.ts";
import { quadraticLesson, quadraticQuestions } from "./quadratic.ts";
import { sequenceLesson, sequenceQuestions } from "./sequence.ts";
import { surveyLesson, surveyQuestions } from "./survey.ts";
import { triangleLesson, triangleQuestions } from "./triangle.ts";
import { trigLesson, trigQuestions } from "./trig.ts";
import { vectorLesson, vectorQuestions } from "./vector.ts";
import type { Lesson, Question } from "./types.ts";

const questions: Record<string, Question[]> = {
  quadratic: quadraticQuestions,
  ineq: ineqQuestions,
  exp: expQuestions,
  sequence: sequenceQuestions,
  trig: trigQuestions,
  limit: limitQuestions,
  derivative: derivativeQuestions,
  survey: surveyQuestions,
  integral: integralQuestions,
  vector: vectorQuestions,
  analytic: analyticQuestions,
  triangle: triangleQuestions,
  combo: comboQuestions,
  probability: probabilityQuestions,
};

const lessons: Record<string, Lesson> = {
  quadratic: quadraticLesson,
  ineq: ineqLesson,
  exp: expLesson,
  sequence: sequenceLesson,
  trig: trigLesson,
  limit: limitLesson,
  derivative: derivativeLesson,
  survey: surveyLesson,
  integral: integralLesson,
  vector: vectorLesson,
  analytic: analyticLesson,
  triangle: triangleLesson,
  combo: comboLesson,
  probability: probabilityLesson,
};

export function questionsFor(id: string): Question[] {
  return questions[id] ?? [];
}

export function lessonFor(id: string): Lesson | undefined {
  return lessons[id];
}

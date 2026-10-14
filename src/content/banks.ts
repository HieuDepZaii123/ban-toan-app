import { derivativeLesson, derivativeQuestions } from "./derivative.ts";
import { expLesson, expQuestions } from "./exp.ts";
import { integralLesson, integralQuestions } from "./integral.ts";
import { limitLesson, limitQuestions } from "./limit.ts";
import { probabilityLesson, probabilityQuestions } from "./probability.ts";
import { quadraticLesson, quadraticQuestions } from "./quadratic.ts";
import { sequenceLesson, sequenceQuestions } from "./sequence.ts";
import { surveyLesson, surveyQuestions } from "./survey.ts";
import { trigLesson, trigQuestions } from "./trig.ts";
import type { Lesson, Question } from "./types.ts";

const questions: Record<string, Question[]> = {
  quadratic: quadraticQuestions,
  exp: expQuestions,
  sequence: sequenceQuestions,
  trig: trigQuestions,
  limit: limitQuestions,
  derivative: derivativeQuestions,
  survey: surveyQuestions,
  integral: integralQuestions,
  probability: probabilityQuestions,
};

const lessons: Record<string, Lesson> = {
  quadratic: quadraticLesson,
  exp: expLesson,
  sequence: sequenceLesson,
  trig: trigLesson,
  limit: limitLesson,
  derivative: derivativeLesson,
  survey: surveyLesson,
  integral: integralLesson,
  probability: probabilityLesson,
};

export function questionsFor(id: string): Question[] {
  return questions[id] ?? [];
}

export function lessonFor(id: string): Lesson | undefined {
  return lessons[id];
}

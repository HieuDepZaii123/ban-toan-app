import { derivativeLesson, derivativeQuestions } from "./derivative.ts";
import { integralLesson, integralQuestions } from "./integral.ts";
import { limitLesson, limitQuestions } from "./limit.ts";
import { probabilityLesson, probabilityQuestions } from "./probability.ts";
import { quadraticLesson, quadraticQuestions } from "./quadratic.ts";
import { trigLesson, trigQuestions } from "./trig.ts";
import type { Lesson, Question } from "./types.ts";

const questions: Record<string, Question[]> = {
  quadratic: quadraticQuestions,
  trig: trigQuestions,
  limit: limitQuestions,
  derivative: derivativeQuestions,
  integral: integralQuestions,
  probability: probabilityQuestions,
};

const lessons: Record<string, Lesson> = {
  quadratic: quadraticLesson,
  trig: trigLesson,
  limit: limitLesson,
  derivative: derivativeLesson,
  integral: integralLesson,
  probability: probabilityLesson,
};

export function questionsFor(id: string): Question[] {
  return questions[id] ?? [];
}

export function lessonFor(id: string): Lesson | undefined {
  return lessons[id];
}

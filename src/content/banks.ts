import { derivativeLesson, derivativeQuestions } from "./derivative.ts";
import { quadraticLesson, quadraticQuestions } from "./quadratic.ts";
import { trigLesson, trigQuestions } from "./trig.ts";
import type { Lesson, Question } from "./types.ts";

const questions: Record<string, Question[]> = {
  quadratic: quadraticQuestions,
  trig: trigQuestions,
  derivative: derivativeQuestions,
};

const lessons: Record<string, Lesson> = {
  quadratic: quadraticLesson,
  trig: trigLesson,
  derivative: derivativeLesson,
};

export function questionsFor(id: string): Question[] {
  return questions[id] ?? [];
}

export function lessonFor(id: string): Lesson | undefined {
  return lessons[id];
}

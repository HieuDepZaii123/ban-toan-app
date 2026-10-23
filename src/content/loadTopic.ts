import type { CardId } from "./cards.ts";
import type { Lesson, Question } from "./types.ts";

export type TopicPack = { lesson: Lesson; questions: Question[] };

const loaders = {
  quadratic: () => import("./quadratic.ts").then((mod) => ({ lesson: mod.quadraticLesson, questions: mod.quadraticQuestions })),
  ineq: () => import("./ineq.ts").then((mod) => ({ lesson: mod.ineqLesson, questions: mod.ineqQuestions })),
  exp: () => import("./exp.ts").then((mod) => ({ lesson: mod.expLesson, questions: mod.expQuestions })),
  sequence: () => import("./sequence.ts").then((mod) => ({ lesson: mod.sequenceLesson, questions: mod.sequenceQuestions })),
  trig: () => import("./trig.ts").then((mod) => ({ lesson: mod.trigLesson, questions: mod.trigQuestions })),
  limit: () => import("./limit.ts").then((mod) => ({ lesson: mod.limitLesson, questions: mod.limitQuestions })),
  derivative: () => import("./derivative.ts").then((mod) => ({ lesson: mod.derivativeLesson, questions: mod.derivativeQuestions })),
  survey: () => import("./survey.ts").then((mod) => ({ lesson: mod.surveyLesson, questions: mod.surveyQuestions })),
  integral: () => import("./integral.ts").then((mod) => ({ lesson: mod.integralLesson, questions: mod.integralQuestions })),
  vector: () => import("./vector.ts").then((mod) => ({ lesson: mod.vectorLesson, questions: mod.vectorQuestions })),
  analytic: () => import("./analytic.ts").then((mod) => ({ lesson: mod.analyticLesson, questions: mod.analyticQuestions })),
  triangle: () => import("./triangle.ts").then((mod) => ({ lesson: mod.triangleLesson, questions: mod.triangleQuestions })),
  combo: () => import("./combo.ts").then((mod) => ({ lesson: mod.comboLesson, questions: mod.comboQuestions })),
  probability: () => import("./probability.ts").then((mod) => ({ lesson: mod.probabilityLesson, questions: mod.probabilityQuestions })),
} satisfies Record<CardId, () => Promise<TopicPack>>;

function isCardId(id: string): id is CardId {
  return Object.prototype.hasOwnProperty.call(loaders, id);
}

/** Lesson and questions for one sheet. Each id is its own chunk. */
export function loadTopic(id: string): Promise<TopicPack> {
  if (!isCardId(id)) return Promise.reject(new Error(id));
  return loaders[id]();
}

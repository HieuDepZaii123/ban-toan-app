import type { Lesson, Question } from "./types.ts";

export type TopicPack = { lesson: Lesson; questions: Question[] };

/** Lesson and questions for one sheet. Each id is its own chunk. */
export function loadTopic(id: string): Promise<TopicPack> {
  switch (id) {
    case "quadratic":
      return import("./quadratic.ts").then((mod) => ({ lesson: mod.quadraticLesson, questions: mod.quadraticQuestions }));
    case "ineq":
      return import("./ineq.ts").then((mod) => ({ lesson: mod.ineqLesson, questions: mod.ineqQuestions }));
    case "exp":
      return import("./exp.ts").then((mod) => ({ lesson: mod.expLesson, questions: mod.expQuestions }));
    case "sequence":
      return import("./sequence.ts").then((mod) => ({ lesson: mod.sequenceLesson, questions: mod.sequenceQuestions }));
    case "trig":
      return import("./trig.ts").then((mod) => ({ lesson: mod.trigLesson, questions: mod.trigQuestions }));
    case "limit":
      return import("./limit.ts").then((mod) => ({ lesson: mod.limitLesson, questions: mod.limitQuestions }));
    case "derivative":
      return import("./derivative.ts").then((mod) => ({ lesson: mod.derivativeLesson, questions: mod.derivativeQuestions }));
    case "survey":
      return import("./survey.ts").then((mod) => ({ lesson: mod.surveyLesson, questions: mod.surveyQuestions }));
    case "integral":
      return import("./integral.ts").then((mod) => ({ lesson: mod.integralLesson, questions: mod.integralQuestions }));
    case "vector":
      return import("./vector.ts").then((mod) => ({ lesson: mod.vectorLesson, questions: mod.vectorQuestions }));
    case "analytic":
      return import("./analytic.ts").then((mod) => ({ lesson: mod.analyticLesson, questions: mod.analyticQuestions }));
    case "triangle":
      return import("./triangle.ts").then((mod) => ({ lesson: mod.triangleLesson, questions: mod.triangleQuestions }));
    case "combo":
      return import("./combo.ts").then((mod) => ({ lesson: mod.comboLesson, questions: mod.comboQuestions }));
    case "probability":
      return import("./probability.ts").then((mod) => ({ lesson: mod.probabilityLesson, questions: mod.probabilityQuestions }));
    default:
      return Promise.reject(new Error(id));
  }
}

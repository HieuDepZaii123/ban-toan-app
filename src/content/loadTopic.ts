import type { CardId } from "./cards.ts";
import type { Lesson, Question } from "./types.ts";
import type { Vary } from "./vary/types.ts";

export type TopicPack = { lesson: Lesson; questions: Question[]; vary: Vary[] };

const loaders = {
  quadratic: () => Promise.all([import("./quadratic.ts"), import("./vary/quadratic.ts"), import("./vary/concept/quadratic.ts")]).then(([sheet, vary, concept]) => ({
    lesson: sheet.quadraticLesson,
    questions: [...sheet.quadraticQuestions, ...concept.quadraticConceptQuestions],
    vary: [...vary.quadraticVary(sheet.quadraticQuestions), ...concept.quadraticConceptVary],
  })),
  ineq: () => Promise.all([import("./ineq.ts"), import("./vary/ineq.ts"), import("./vary/concept/ineq.ts")]).then(([sheet, vary, concept]) => ({
    lesson: sheet.ineqLesson,
    questions: [...sheet.ineqQuestions, ...concept.ineqConceptQuestions],
    vary: [...vary.ineqVary(sheet.ineqQuestions), ...concept.ineqConceptVary],
  })),
  exp: () => Promise.all([import("./exp.ts"), import("./vary/exp.ts"), import("./vary/concept/exp.ts")]).then(([sheet, vary, concept]) => ({
    lesson: sheet.expLesson,
    questions: [...sheet.expQuestions, ...concept.expConceptQuestions],
    vary: [...vary.expVary(sheet.expQuestions), ...concept.expConceptVary],
  })),
  sequence: () => Promise.all([import("./sequence.ts"), import("./vary/sequence.ts"), import("./vary/concept/sequence.ts")]).then(([sheet, vary, concept]) => ({
    lesson: sheet.sequenceLesson,
    questions: [...sheet.sequenceQuestions, ...concept.sequenceConceptQuestions],
    vary: [...vary.sequenceVary(sheet.sequenceQuestions), ...concept.sequenceConceptVary],
  })),
  trig: () => Promise.all([import("./trig.ts"), import("./vary/trig.ts"), import("./vary/concept/trig.ts")]).then(([sheet, vary, concept]) => ({
    lesson: sheet.trigLesson,
    questions: [...sheet.trigQuestions, ...concept.trigConceptQuestions],
    vary: [...vary.trigVary(sheet.trigQuestions), ...concept.trigConceptVary],
  })),
  limit: () => Promise.all([import("./limit.ts"), import("./vary/limit.ts"), import("./vary/concept/limit.ts")]).then(([sheet, vary, concept]) => ({
    lesson: sheet.limitLesson,
    questions: [...sheet.limitQuestions, ...concept.limitConceptQuestions],
    vary: [...vary.limitVary(sheet.limitQuestions), ...concept.limitConceptVary],
  })),
  derivative: () => Promise.all([import("./derivative.ts"), import("./vary/derivative.ts"), import("./vary/concept/derivative.ts")]).then(([sheet, vary, concept]) => ({
    lesson: sheet.derivativeLesson,
    questions: [...sheet.derivativeQuestions, ...concept.derivativeConceptQuestions],
    vary: [...vary.derivativeVary(sheet.derivativeQuestions), ...concept.derivativeConceptVary],
  })),
  survey: () => Promise.all([import("./survey.ts"), import("./vary/survey.ts"), import("./vary/concept/survey.ts")]).then(([sheet, vary, concept]) => ({
    lesson: sheet.surveyLesson,
    questions: [...sheet.surveyQuestions, ...concept.surveyConceptQuestions],
    vary: [...vary.surveyVary(sheet.surveyQuestions), ...concept.surveyConceptVary],
  })),
  integral: () => Promise.all([import("./integral.ts"), import("./vary/integral.ts"), import("./vary/concept/integral.ts")]).then(([sheet, vary, concept]) => ({
    lesson: sheet.integralLesson,
    questions: [...sheet.integralQuestions, ...concept.integralConceptQuestions],
    vary: [...vary.integralVary(sheet.integralQuestions), ...concept.integralConceptVary],
  })),
  vector: () => Promise.all([import("./vector.ts"), import("./vary/vector.ts"), import("./vary/concept/vector.ts")]).then(([sheet, vary, concept]) => ({
    lesson: sheet.vectorLesson,
    questions: [...sheet.vectorQuestions, ...concept.vectorConceptQuestions],
    vary: [...vary.vectorVary(sheet.vectorQuestions), ...concept.vectorConceptVary],
  })),
  analytic: () => Promise.all([import("./analytic.ts"), import("./vary/analytic.ts"), import("./vary/concept/analytic.ts")]).then(([sheet, vary, concept]) => ({
    lesson: sheet.analyticLesson,
    questions: [...sheet.analyticQuestions, ...concept.analyticConceptQuestions],
    vary: [...vary.analyticVary(sheet.analyticQuestions), ...concept.analyticConceptVary],
  })),
  triangle: () => Promise.all([import("./triangle.ts"), import("./vary/triangle.ts"), import("./vary/concept/triangle.ts")]).then(([sheet, vary, concept]) => ({
    lesson: sheet.triangleLesson,
    questions: [...sheet.triangleQuestions, ...concept.triangleConceptQuestions],
    vary: [...vary.triangleVary(sheet.triangleQuestions), ...concept.triangleConceptVary],
  })),
  combo: () => Promise.all([import("./combo.ts"), import("./vary/combo.ts"), import("./vary/concept/combo.ts")]).then(([sheet, vary, concept]) => ({
    lesson: sheet.comboLesson,
    questions: [...sheet.comboQuestions, ...concept.comboConceptQuestions],
    vary: [...vary.comboVary(sheet.comboQuestions), ...concept.comboConceptVary],
  })),
  probability: () => Promise.all([import("./probability.ts"), import("./vary/probability.ts"), import("./vary/concept/probability.ts")]).then(([sheet, vary, concept]) => ({
    lesson: sheet.probabilityLesson,
    questions: [...sheet.probabilityQuestions, ...concept.probabilityConceptQuestions],
    vary: [...vary.probabilityVary(sheet.probabilityQuestions), ...concept.probabilityConceptVary],
  })),
} satisfies Record<CardId, () => Promise<TopicPack>>;

function isCardId(id: string): id is CardId {
  return Object.prototype.hasOwnProperty.call(loaders, id);
}

/** Lesson, questions, and number generators for one sheet. Each id is its own chunk. */
export function loadTopic(id: string): Promise<TopicPack> {
  if (!isCardId(id)) return Promise.reject(new Error(id));
  return loaders[id]();
}

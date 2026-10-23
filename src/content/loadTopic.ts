import type { CardId } from "./cards.ts";
import type { Lesson, Question } from "./types.ts";
import type { Vary } from "./vary/types.ts";

export type TopicPack = { lesson: Lesson; questions: Question[]; vary: Vary[] };

const loaders = {
  quadratic: () => Promise.all([import("./quadratic.ts"), import("./vary/quadratic.ts"), import("./vary/concept/quadratic.ts"), import("./vary/dss/quadratic.ts")]).then(([sheet, vary, concept, dss]) => ({
    lesson: sheet.quadraticLesson,
    questions: [...sheet.quadraticQuestions, ...concept.quadraticConceptQuestions, ...dss.quadraticDssQuestions],
    vary: [...vary.quadraticVary(sheet.quadraticQuestions), ...concept.quadraticConceptVary, ...dss.quadraticDssVary],
  })),
  ineq: () => Promise.all([import("./ineq.ts"), import("./vary/ineq.ts"), import("./vary/concept/ineq.ts"), import("./vary/dss/ineq.ts")]).then(([sheet, vary, concept, dss]) => ({
    lesson: sheet.ineqLesson,
    questions: [...sheet.ineqQuestions, ...concept.ineqConceptQuestions, ...dss.ineqDssQuestions],
    vary: [...vary.ineqVary(sheet.ineqQuestions), ...concept.ineqConceptVary, ...dss.ineqDssVary],
  })),
  exp: () => Promise.all([import("./exp.ts"), import("./vary/exp.ts"), import("./vary/concept/exp.ts"), import("./vary/dss/exp.ts")]).then(([sheet, vary, concept, dss]) => ({
    lesson: sheet.expLesson,
    questions: [...sheet.expQuestions, ...concept.expConceptQuestions, ...dss.expDssQuestions],
    vary: [...vary.expVary(sheet.expQuestions), ...concept.expConceptVary, ...dss.expDssVary],
  })),
  sequence: () => Promise.all([import("./sequence.ts"), import("./vary/sequence.ts"), import("./vary/concept/sequence.ts"), import("./vary/dss/sequence.ts")]).then(([sheet, vary, concept, dss]) => ({
    lesson: sheet.sequenceLesson,
    questions: [...sheet.sequenceQuestions, ...concept.sequenceConceptQuestions, ...dss.sequenceDssQuestions],
    vary: [...vary.sequenceVary(sheet.sequenceQuestions), ...concept.sequenceConceptVary, ...dss.sequenceDssVary],
  })),
  trig: () => Promise.all([import("./trig.ts"), import("./vary/trig.ts"), import("./vary/concept/trig.ts"), import("./vary/dss/trig.ts")]).then(([sheet, vary, concept, dss]) => ({
    lesson: sheet.trigLesson,
    questions: [...sheet.trigQuestions, ...concept.trigConceptQuestions, ...dss.trigDssQuestions],
    vary: [...vary.trigVary(sheet.trigQuestions), ...concept.trigConceptVary, ...dss.trigDssVary],
  })),
  limit: () => Promise.all([import("./limit.ts"), import("./vary/limit.ts"), import("./vary/concept/limit.ts"), import("./vary/dss/limit.ts")]).then(([sheet, vary, concept, dss]) => ({
    lesson: sheet.limitLesson,
    questions: [...sheet.limitQuestions, ...concept.limitConceptQuestions, ...dss.limitDssQuestions],
    vary: [...vary.limitVary(sheet.limitQuestions), ...concept.limitConceptVary, ...dss.limitDssVary],
  })),
  derivative: () => Promise.all([import("./derivative.ts"), import("./vary/derivative.ts"), import("./vary/concept/derivative.ts"), import("./vary/dss/derivative.ts")]).then(([sheet, vary, concept, dss]) => ({
    lesson: sheet.derivativeLesson,
    questions: [...sheet.derivativeQuestions, ...concept.derivativeConceptQuestions, ...dss.derivativeDssQuestions],
    vary: [...vary.derivativeVary(sheet.derivativeQuestions), ...concept.derivativeConceptVary, ...dss.derivativeDssVary],
  })),
  survey: () => Promise.all([import("./survey.ts"), import("./vary/survey.ts"), import("./vary/concept/survey.ts"), import("./vary/dss/survey.ts")]).then(([sheet, vary, concept, dss]) => ({
    lesson: sheet.surveyLesson,
    questions: [...sheet.surveyQuestions, ...concept.surveyConceptQuestions, ...dss.surveyDssQuestions],
    vary: [...vary.surveyVary(sheet.surveyQuestions), ...concept.surveyConceptVary, ...dss.surveyDssVary],
  })),
  integral: () => Promise.all([import("./integral.ts"), import("./vary/integral.ts"), import("./vary/concept/integral.ts"), import("./vary/dss/integral.ts")]).then(([sheet, vary, concept, dss]) => ({
    lesson: sheet.integralLesson,
    questions: [...sheet.integralQuestions, ...concept.integralConceptQuestions, ...dss.integralDssQuestions],
    vary: [...vary.integralVary(sheet.integralQuestions), ...concept.integralConceptVary, ...dss.integralDssVary],
  })),
  vector: () => Promise.all([import("./vector.ts"), import("./vary/vector.ts"), import("./vary/concept/vector.ts"), import("./vary/dss/vector.ts")]).then(([sheet, vary, concept, dss]) => ({
    lesson: sheet.vectorLesson,
    questions: [...sheet.vectorQuestions, ...concept.vectorConceptQuestions, ...dss.vectorDssQuestions],
    vary: [...vary.vectorVary(sheet.vectorQuestions), ...concept.vectorConceptVary, ...dss.vectorDssVary],
  })),
  analytic: () => Promise.all([import("./analytic.ts"), import("./vary/analytic.ts"), import("./vary/concept/analytic.ts"), import("./vary/dss/analytic.ts")]).then(([sheet, vary, concept, dss]) => ({
    lesson: sheet.analyticLesson,
    questions: [...sheet.analyticQuestions, ...concept.analyticConceptQuestions, ...dss.analyticDssQuestions],
    vary: [...vary.analyticVary(sheet.analyticQuestions), ...concept.analyticConceptVary, ...dss.analyticDssVary],
  })),
  triangle: () => Promise.all([import("./triangle.ts"), import("./vary/triangle.ts"), import("./vary/concept/triangle.ts"), import("./vary/dss/triangle.ts")]).then(([sheet, vary, concept, dss]) => ({
    lesson: sheet.triangleLesson,
    questions: [...sheet.triangleQuestions, ...concept.triangleConceptQuestions, ...dss.triangleDssQuestions],
    vary: [...vary.triangleVary(sheet.triangleQuestions), ...concept.triangleConceptVary, ...dss.triangleDssVary],
  })),
  combo: () => Promise.all([import("./combo.ts"), import("./vary/combo.ts"), import("./vary/concept/combo.ts"), import("./vary/dss/combo.ts")]).then(([sheet, vary, concept, dss]) => ({
    lesson: sheet.comboLesson,
    questions: [...sheet.comboQuestions, ...concept.comboConceptQuestions, ...dss.comboDssQuestions],
    vary: [...vary.comboVary(sheet.comboQuestions), ...concept.comboConceptVary, ...dss.comboDssVary],
  })),
  probability: () => Promise.all([import("./probability.ts"), import("./vary/probability.ts"), import("./vary/concept/probability.ts"), import("./vary/dss/probability.ts")]).then(([sheet, vary, concept, dss]) => ({
    lesson: sheet.probabilityLesson,
    questions: [...sheet.probabilityQuestions, ...concept.probabilityConceptQuestions, ...dss.probabilityDssQuestions],
    vary: [...vary.probabilityVary(sheet.probabilityQuestions), ...concept.probabilityConceptVary, ...dss.probabilityDssVary],
  })),
} satisfies Record<CardId, () => Promise<TopicPack>>;

function isCardId(id: string): id is CardId {
  return Object.prototype.hasOwnProperty.call(loaders, id);
}

export function loadTopic(id: string): Promise<TopicPack> {
  if (!isCardId(id)) return Promise.reject(new Error(id));
  return loaders[id]();
}

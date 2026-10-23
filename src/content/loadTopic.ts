import type { CardId } from "./cards.ts";
import type { Lesson, Question } from "./types.ts";
import type { Vary } from "./vary/types.ts";

export type TopicPack = { lesson: Lesson; questions: Question[]; vary: Vary[] };

const loaders = {
  quadratic: () => Promise.all([import("./quadratic.ts"), import("./vary/quadratic.ts")]).then(([sheet, vary]) => ({
    lesson: sheet.quadraticLesson,
    questions: sheet.quadraticQuestions,
    vary: vary.quadraticVary(sheet.quadraticQuestions),
  })),
  ineq: () => Promise.all([import("./ineq.ts"), import("./vary/ineq.ts")]).then(([sheet, vary]) => ({
    lesson: sheet.ineqLesson,
    questions: sheet.ineqQuestions,
    vary: vary.ineqVary(sheet.ineqQuestions),
  })),
  exp: () => Promise.all([import("./exp.ts"), import("./vary/exp.ts")]).then(([sheet, vary]) => ({
    lesson: sheet.expLesson,
    questions: sheet.expQuestions,
    vary: vary.expVary(sheet.expQuestions),
  })),
  sequence: () => Promise.all([import("./sequence.ts"), import("./vary/sequence.ts")]).then(([sheet, vary]) => ({
    lesson: sheet.sequenceLesson,
    questions: sheet.sequenceQuestions,
    vary: vary.sequenceVary(sheet.sequenceQuestions),
  })),
  trig: () => Promise.all([import("./trig.ts"), import("./vary/trig.ts")]).then(([sheet, vary]) => ({
    lesson: sheet.trigLesson,
    questions: sheet.trigQuestions,
    vary: vary.trigVary(sheet.trigQuestions),
  })),
  limit: () => Promise.all([import("./limit.ts"), import("./vary/limit.ts")]).then(([sheet, vary]) => ({
    lesson: sheet.limitLesson,
    questions: sheet.limitQuestions,
    vary: vary.limitVary(sheet.limitQuestions),
  })),
  derivative: () => Promise.all([import("./derivative.ts"), import("./vary/derivative.ts")]).then(([sheet, vary]) => ({
    lesson: sheet.derivativeLesson,
    questions: sheet.derivativeQuestions,
    vary: vary.derivativeVary(sheet.derivativeQuestions),
  })),
  survey: () => Promise.all([import("./survey.ts"), import("./vary/survey.ts")]).then(([sheet, vary]) => ({
    lesson: sheet.surveyLesson,
    questions: sheet.surveyQuestions,
    vary: vary.surveyVary(sheet.surveyQuestions),
  })),
  integral: () => Promise.all([import("./integral.ts"), import("./vary/integral.ts")]).then(([sheet, vary]) => ({
    lesson: sheet.integralLesson,
    questions: sheet.integralQuestions,
    vary: vary.integralVary(sheet.integralQuestions),
  })),
  vector: () => Promise.all([import("./vector.ts"), import("./vary/vector.ts")]).then(([sheet, vary]) => ({
    lesson: sheet.vectorLesson,
    questions: sheet.vectorQuestions,
    vary: vary.vectorVary(sheet.vectorQuestions),
  })),
  analytic: () => Promise.all([import("./analytic.ts"), import("./vary/analytic.ts")]).then(([sheet, vary]) => ({
    lesson: sheet.analyticLesson,
    questions: sheet.analyticQuestions,
    vary: vary.analyticVary(sheet.analyticQuestions),
  })),
  triangle: () => Promise.all([import("./triangle.ts"), import("./vary/triangle.ts")]).then(([sheet, vary]) => ({
    lesson: sheet.triangleLesson,
    questions: sheet.triangleQuestions,
    vary: vary.triangleVary(sheet.triangleQuestions),
  })),
  combo: () => Promise.all([import("./combo.ts"), import("./vary/combo.ts")]).then(([sheet, vary]) => ({
    lesson: sheet.comboLesson,
    questions: sheet.comboQuestions,
    vary: vary.comboVary(sheet.comboQuestions),
  })),
  probability: () => Promise.all([import("./probability.ts"), import("./vary/probability.ts")]).then(([sheet, vary]) => ({
    lesson: sheet.probabilityLesson,
    questions: sheet.probabilityQuestions,
    vary: vary.probabilityVary(sheet.probabilityQuestions),
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

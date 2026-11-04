import { analyticDang } from "./analytic.ts";
import { comboDang } from "./combo.ts";
import { derivativeDang } from "./derivative.ts";
import { expDang } from "./exp.ts";
import { ineqDang } from "./ineq.ts";
import { integralDang } from "./integral.ts";
import { limitDang } from "./limit.ts";
import { probabilityDang } from "./probability.ts";
import { quadraticDang } from "./quadratic.ts";
import { sequenceDang } from "./sequence.ts";
import { surveyDang } from "./survey.ts";
import { triangleDang } from "./triangle.ts";
import { trigDang } from "./trig.ts";
import type { Check, TopicDang } from "./types.ts";
import { vectorDang } from "./vector.ts";

export const allDang: TopicDang[] = [
  derivativeDang,
  surveyDang,
  integralDang,
  expDang,
  analyticDang,
  probabilityDang,
  comboDang,
  trigDang,
  sequenceDang,
  limitDang,
  vectorDang,
  triangleDang,
  quadraticDang,
  ineqDang,
];

const byId = new Map(allDang.map((topic) => [topic.id, topic]));

export function dangFor(id: string): TopicDang | undefined {
  return byId.get(id);
}

export function collectChecks(topic: TopicDang): Check[] {
  const found: Check[] = [];
  for (const dang of topic.dang) {
    if (dang.viDu.check) found.push(dang.viDu.check);
    if (dang.luyen.check) found.push(dang.luyen.check);
  }
  for (const item of topic.sangTao) {
    if (item.check) found.push(item.check);
  }
  return found;
}

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

function take(found: Check[], item: { check?: Check; checks?: Check[] }): void {
  if (item.check) found.push(item.check);
  if (item.checks) found.push(...item.checks);
}

export function collectChecks(topic: TopicDang): Check[] {
  const found: Check[] = [];
  for (const dang of topic.dang) {
    take(found, dang.viDu);
    take(found, dang.luyen);
  }
  for (const item of topic.sangTao) take(found, item);
  return found;
}

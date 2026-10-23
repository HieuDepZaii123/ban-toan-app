import { fmt, quadText, showExact, vertexText } from "../lib/format.ts";
import {
  apex,
  archIntegral,
  archVolumeCoeff,
  arithSum,
  arithTerm,
  bayes,
  betweenIntegral,
  binom,
  bouncePath,
  brakeMotion,
  compoundAmount,
  coolingTemp,
  cubic,
  decayMass,
  diceCondition,
  fence,
  geomInfinite,
  geomTerm,
  holeY,
  jumpStudy,
  opening,
  quadStudy,
  rationalY,
  savingsSum,
  secantSlope,
  showCos,
  showSin,
  simpleAmount,
  yearsToDouble,
  amGm,
  arrange,
  boxVolume,
  cauchyPair,
  circlePlace,
  comb,
  det2,
  lineDist,
  meanOf,
  medianOf,
  planeDist,
  pyramidVolume,
  solve2,
  tetraVolume,
  triArea,
  vec3Len,
  workshopOk,
  workshopProfit,
} from "../lib/math.ts";
import type { Lang } from "../lib/math.ts";
import type { CardId } from "./cards.ts";
import { analyticInit, chanceInit, comboInit, derivInit, expInit, ineqInit, integralInit, limitInit, quadInit, seqInit, shapeInit, surveyInit, trigInit, vectorInit } from "./params.ts";

type SummaryFn = (params: Record<string, number> | undefined, lang: Lang) => string;

const summaries = {
  quadratic: quadraticSummary,
  ineq: ineqSummary,
  exp: expSummary,
  sequence: sequenceSummary,
  trig: trigSummary,
  limit: limitSummary,
  derivative: derivSummary,
  survey: surveySummary,
  integral: integralSummary,
  vector: vectorSummary,
  analytic: analyticSummary,
  triangle: shapeSummary,
  combo: comboSummary,
  probability: chanceSummary,
} satisfies Record<CardId, SummaryFn>;

export function topicSummary(id: string, params: Record<string, number> | undefined, lang: Lang): string {
  if (!Object.prototype.hasOwnProperty.call(summaries, id)) return "";
  return summaries[id as CardId](params, lang);
}

function quadraticSummary(params: Record<string, number> | undefined, lang: Lang): string {
  const scene = params?.scene ?? quadInit.scene;
  if (scene === 2) {
    const x = params?.fence ?? quadInit.fence;
    const pen = fence(x);
    return lang === "en"
      ? `Fence x = ${trim(x)} m, area ${trim(pen.area)} m²`
      : `Rào x = ${trim(x)} m, diện tích ${trim(pen.area)} m²`;
  }
  if (scene === 1) {
    const a = params?.va ?? quadInit.va;
    const h = params?.vh ?? quadInit.vh;
    const k = params?.vk ?? quadInit.vk;
    const place = `(${trim(h)}; ${trim(k)})`;
    return lang === "en"
      ? `${vertexText(a, h, k)}. Vertex stays at ${place} when a changes.`
      : `${vertexText(a, h, k)}. Đổi a thì đỉnh ${place} đứng yên.`;
  }
  const a = params?.a ?? quadInit.a;
  const b = params?.b ?? quadInit.b;
  const c = params?.c ?? quadInit.c;
  const study = quadStudy(a, b, c);
  if (!study.vertex) {
    return `${quadText(a, b, c)}. ${opening(a, lang)}.`;
  }
  const vertex = `(${trim(study.vertex.x)}; ${trim(study.vertex.y)})`;
  return lang === "en"
    ? `${quadText(a, b, c)}. Δ = ${trim(study.delta)}, vertex ${vertex}.`
    : `${quadText(a, b, c)}. Δ = ${trim(study.delta)}, đỉnh ${vertex}.`;
}

function trigSummary(params: Record<string, number> | undefined, lang: Lang): string {
  const scene = params?.scene ?? trigInit.scene;
  if (scene === 1) {
    const distance = params?.distance ?? trigInit.distance;
    const tilt = params?.tilt ?? trigInit.tilt;
    return lang === "en"
      ? `Tree ${trim(distance)} m away, angle ${trim(tilt)}°.`
      : `Cây cách ${trim(distance)} m, góc ${trim(tilt)}°.`;
  }
  const angle = params?.angle ?? trigInit.angle;
  return lang === "en"
    ? `Angle ${trim(angle)}°, sin = ${showSin(angle)}, cos = ${showCos(angle)}.`
    : `Góc ${trim(angle)}°, sin = ${showSin(angle)}, cos = ${showCos(angle)}.`;
}

function derivSummary(params: Record<string, number> | undefined, lang: Lang): string {
  const scene = params?.scene ?? derivInit.scene;
  if (scene === 1) {
    const v0 = params?.v0 ?? derivInit.v0;
    const top = apex(v0);
    return lang === "en"
      ? `Throw v₀ = ${trim(v0)} m/s, top ${trim(top.h)} m at t = ${trim(top.t)} s.`
      : `Ném v₀ = ${trim(v0)} m/s, cao nhất ${trim(top.h)} m lúc t = ${trim(top.t)} s.`;
  }
  if (scene === 2) {
    const t = params?.brake ?? derivInit.brake;
    const motion = brakeMotion(t);
    return lang === "en"
      ? `Brake t = ${trim(motion.t)} s, distance ${trim(motion.s)} m.`
      : `Phanh t = ${trim(motion.t)} s, quãng ${trim(motion.s)} m.`;
  }
  const h = params?.h ?? derivInit.h;
  return lang === "en"
    ? `Secant slope ${trim(secantSlope(1, h))} = 2 + h. Tangent slope 2.`
    : `Cát tuyến ${trim(secantSlope(1, h))} = 2 + h. Tiếp tuyến có hệ số góc 2.`;
}

function limitSummary(params: Record<string, number> | undefined, lang: Lang): string {
  const scene = params?.scene ?? limitInit.scene;
  if (scene === 2) {
    const time = params?.time ?? limitInit.time;
    return lang === "en"
      ? `Tea t = ${trim(time)} min, ${trim(coolingTemp(time))}°C, approaching 25°C.`
      : `Nước t = ${trim(time)} phút, ${trim(coolingTemp(time))}°C, tiến về 25°C.`;
  }
  if (scene === 1) {
    const study = jumpStudy(params?.left ?? limitInit.left, params?.right ?? limitInit.right, params?.at ?? limitInit.at);
    return lang === "en"
      ? study.exists
        ? `Both sides approach ${trim(study.limit ?? 0)}.`
        : `Left ${trim(params?.left ?? limitInit.left)}, right ${trim(params?.right ?? limitInit.right)}. No limit.`
      : study.exists
        ? `Hai phía cùng tiến về ${trim(study.limit ?? 0)}.`
        : `Trái ${trim(params?.left ?? limitInit.left)}, phải ${trim(params?.right ?? limitInit.right)}. Không có giới hạn.`;
  }
  const h = params?.h ?? limitInit.h;
  if (Math.abs(h) < 1e-9) {
    return lang === "en"
      ? "At the hole x = 1 the expression is undefined. The limit is 2."
      : "Đúng lỗ x = 1, biểu thức không xác định. Giới hạn là 2.";
  }
  const x = 1 + h;
  return lang === "en"
    ? `Around x = 1, the hole sits at 2. Now x = ${trim(x)}, y = ${trim(holeY(x))}.`
    : `Quanh x = 1, lỗ nằm tại 2. Đang ở x = ${trim(x)}, y = ${trim(holeY(x))}.`;
}

function integralSummary(params: Record<string, number> | undefined, lang: Lang): string {
  const scene = params?.scene ?? integralInit.scene;
  if (scene === 2) {
    const span = params?.span ?? integralInit.span;
    return lang === "en"
      ? `Revolve to x = ${trim(span)}, coefficient ${trim(archVolumeCoeff(span))}.`
      : `Quay đến x = ${trim(span)}, hệ số ${trim(archVolumeCoeff(span))}.`;
  }
  if (scene === 1) {
    const gap = params?.gap ?? integralInit.gap;
    return lang === "en"
      ? `Between the curves up to ${trim(gap)}: ${trim(betweenIntegral(gap))}.`
      : `Giữa hai đường đến ${trim(gap)}: ${trim(betweenIntegral(gap))}.`;
  }
  const upper = params?.upper ?? integralInit.upper;
  return lang === "en"
    ? `Area to x = ${trim(upper)} is ${trim(archIntegral(upper))}.`
    : `Diện tích đến x = ${trim(upper)} là ${trim(archIntegral(upper))}.`;
}

function chanceSummary(params: Record<string, number> | undefined, lang: Lang): string {
  const scene = params?.scene ?? chanceInit.scene;
  if (scene === 2) {
    const n = params?.n ?? chanceInit.n;
    const k = Math.min(params?.k ?? chanceInit.k, n);
    const p = params?.p ?? chanceInit.p;
    return lang === "en"
      ? `Binomial n = ${trim(n)}, k = ${trim(k)}, P = ${trim(binom(n, k, p))}.`
      : `Nhị thức n = ${trim(n)}, k = ${trim(k)}, P = ${trim(binom(n, k, p))}.`;
  }
  if (scene === 1) {
    const test = bayes(params?.prev ?? chanceInit.prev, params?.sens ?? chanceInit.sens, params?.fpr ?? chanceInit.fpr);
    return lang === "en"
      ? `After a positive test, ${trim(test.posterior)}. True ${trim(test.tp)}, false ${trim(test.fp)}.`
      : `Khi đã dương, ${trim(test.posterior)}. Thật ${trim(test.tp)}, giả ${trim(test.fp)}.`;
  }
  const dice = diceCondition(params?.face ?? chanceInit.face);
  return lang === "en"
    ? `At least one ${trim(params?.face ?? chanceInit.face)}: ${dice.remain} pairs left.`
    : `Ít nhất một mặt ${trim(params?.face ?? chanceInit.face)}: còn ${dice.remain} cặp.`;
}

function expSummary(params: Record<string, number> | undefined, lang: Lang): string {
  const scene = params?.scene ?? expInit.scene;
  if (scene === 2) {
    const time = params?.massTime ?? expInit.massTime;
    return lang === "en"
      ? `After ${trim(time)} years, ${trim(decayMass(time))} g remain.`
      : `Sau ${trim(time)} năm còn ${trim(decayMass(time))} g.`;
  }
  if (scene === 1) {
    const rate = params?.rate ?? expInit.rate;
    const years = params?.years ?? expInit.years;
    return lang === "en"
      ? `Compound ${trim(compoundAmount(rate, years))} triệu, simple ${trim(simpleAmount(rate, years))} triệu. Doubles in ${trim(yearsToDouble(rate))} years.`
      : `Kép ${trim(compoundAmount(rate, years))} triệu, đơn ${trim(simpleAmount(rate, years))} triệu. Gấp đôi sau ${trim(yearsToDouble(rate))} năm.`;
  }
  const base = params?.base ?? expInit.base;
  const x = params?.x ?? expInit.x;
  return lang === "en"
    ? `Base ${trim(base)}, at x = ${trim(x)}.`
    : `Cơ số ${trim(base)}, tại x = ${trim(x)}.`;
}

function sequenceSummary(params: Record<string, number> | undefined, lang: Lang): string {
  const scene = params?.scene ?? seqInit.scene;
  if (scene === 2) {
    const drop = params?.drop ?? seqInit.drop;
    const ratio = params?.ratio ?? seqInit.ratio;
    const months = params?.months ?? seqInit.months;
    return lang === "en"
      ? `Path ${trim(bouncePath(drop, ratio) ?? 0)} m. Deposited ${trim(savingsSum(months))} triệu.`
      : `Quãng ${trim(bouncePath(drop, ratio) ?? 0)} m. Đã gửi ${trim(savingsSum(months))} triệu.`;
  }
  if (scene === 1) {
    const g1 = params?.g1 ?? seqInit.g1;
    const q = params?.q ?? seqInit.q;
    const infinite = geomInfinite(g1, q);
    return lang === "en"
      ? `Term ${trim(params?.gn ?? seqInit.gn)} is ${trim(geomTerm(g1, q, params?.gn ?? seqInit.gn))}. ${infinite === null ? "No infinite sum." : `Infinite sum ${trim(infinite)}.`}`
      : `Số hạng ${trim(params?.gn ?? seqInit.gn)} là ${trim(geomTerm(g1, q, params?.gn ?? seqInit.gn))}. ${infinite === null ? "Không có tổng vô hạn." : `Tổng vô hạn ${trim(infinite)}.`}`;
  }
  const u1 = params?.u1 ?? seqInit.u1;
  const d = params?.d ?? seqInit.d;
  const n = params?.n ?? seqInit.n;
  return lang === "en"
    ? `Term ${trim(n)} is ${trim(arithTerm(u1, d, n))}. Sum ${trim(arithSum(u1, d, n))}.`
    : `Số hạng ${trim(n)} là ${trim(arithTerm(u1, d, n))}. Tổng ${trim(arithSum(u1, d, n))}.`;
}

function surveySummary(params: Record<string, number> | undefined, lang: Lang): string {
  const scene = params?.scene ?? surveyInit.scene;
  if (scene === 2) {
    return lang === "en"
      ? "y = x³ has a horizontal tangent at 0 and no extremum."
      : "y = x³ có tiếp tuyến ngang tại 0 và không có cực trị.";
  }
  if (scene === 1) {
    const x = params?.rx ?? surveyInit.rx;
    return lang === "en"
      ? `At x = ${trim(x)}, y = ${trim(rationalY(x))}. (1; 2) is not on the graph.`
      : `Tại x = ${trim(x)}, y = ${trim(rationalY(x))}. (1; 2) không thuộc đồ thị.`;
  }
  const x = params?.x ?? surveyInit.x;
  return lang === "en"
    ? `y = ${trim(cubic(x))} at x = ${trim(x)}. Maximum 2, minimum −2.`
    : `y = ${trim(cubic(x))} tại x = ${trim(x)}. Cực đại 2, cực tiểu −2.`;
}

function ineqSummary(params: Record<string, number> | undefined, lang: Lang): string {
  const scene = params?.scene ?? ineqInit.scene;
  if (scene === 2) {
    const x = params?.x ?? ineqInit.x;
    const y = params?.y ?? ineqInit.y;
    const where = workshopOk(x, y) ? "" : lang === "en" ? " Outside." : " Ngoài miền.";
    return lang === "en"
      ? `P = ${trim(workshopProfit(x, y))} at (${trim(x)}; ${trim(y)}).${where}`
      : `P = ${trim(workshopProfit(x, y))} tại (${trim(x)}; ${trim(y)}).${where}`;
  }
  if (scene === 1) {
    const pair = cauchyPair(params?.p ?? ineqInit.p, params?.q ?? ineqInit.q, params?.c ?? ineqInit.c, params?.d ?? ineqInit.d);
    return `${trim(pair.left)} ≥ ${trim(pair.right)}`;
  }
  const pair = amGm(params?.a ?? ineqInit.a, params?.b ?? ineqInit.b);
  if (!pair) return lang === "en" ? "AM–GM needs two positive numbers." : "AM–GM cần hai số dương.";
  return `AM ${trim(pair.am)} · GM ${trim(pair.gm)}`;
}

function vectorSummary(params: Record<string, number> | undefined, lang: Lang): string {
  const scene = params?.scene ?? vectorInit.scene;
  if (scene === 2) {
    const solved = solve2(
      params?.s11 ?? vectorInit.s11,
      params?.s12 ?? vectorInit.s12,
      params?.t1 ?? vectorInit.t1,
      params?.s21 ?? vectorInit.s21,
      params?.s22 ?? vectorInit.s22,
      params?.t2 ?? vectorInit.t2,
    );
    if (!solved) return lang === "en" ? "No unique solution." : "Không có nghiệm duy nhất.";
    return lang === "en" ? `x = ${trim(solved.x)}, y = ${trim(solved.y)}.` : `x = ${trim(solved.x)}, y = ${trim(solved.y)}.`;
  }
  if (scene === 1) {
    const det = det2(params?.m11 ?? vectorInit.m11, params?.m12 ?? vectorInit.m12, params?.m21 ?? vectorInit.m21, params?.m22 ?? vectorInit.m22);
    return `det = ${trim(det)}`;
  }
  const length = vec3Len([params?.ux ?? vectorInit.ux, params?.uy ?? vectorInit.uy, params?.uz ?? vectorInit.uz]);
  return `|u| = ${showExact(length)}`;
}

function analyticSummary(params: Record<string, number> | undefined, lang: Lang): string {
  const scene = params?.scene ?? analyticInit.scene;
  if (scene === 2) {
    const place = circlePlace(params?.cx ?? analyticInit.cx, params?.cy ?? analyticInit.cy, params?.radius ?? analyticInit.radius);
    const word = place === "on" ? (lang === "en" ? "on" : "trên") : place === "in" ? (lang === "en" ? "inside" : "trong") : lang === "en" ? "outside" : "ngoài";
    return lang === "en" ? `Point is ${word}.` : `Điểm nằm ${word}.`;
  }
  if (scene === 1) {
    const dist = planeDist(
      params?.pa ?? analyticInit.pa,
      params?.pb ?? analyticInit.pb,
      params?.pc ?? analyticInit.pc,
      params?.pd ?? analyticInit.pd,
      params?.qx ?? analyticInit.qx,
      params?.qy ?? analyticInit.qy,
      params?.qz ?? analyticInit.qz,
    );
    return `d = ${showExact(dist)}`;
  }
  const dist = lineDist(params?.a ?? analyticInit.a, params?.b ?? analyticInit.b, params?.c ?? analyticInit.c, params?.px ?? analyticInit.px, params?.py ?? analyticInit.py);
  return `d = ${showExact(dist)}`;
}

function shapeSummary(params: Record<string, number> | undefined, lang: Lang): string {
  const scene = params?.scene ?? shapeInit.scene;
  if (scene === 3) return `V = ${showExact(tetraVolume(params?.edge ?? shapeInit.edge))}`;
  if (scene === 2) return `V = ${trim(pyramidVolume(params?.side ?? shapeInit.side, params?.ph ?? shapeInit.ph))}`;
  if (scene === 1) {
    const volume = boxVolume(params?.len ?? shapeInit.len, params?.wid ?? shapeInit.wid, params?.ht ?? shapeInit.ht);
    return `V = ${trim(volume)}`;
  }
  const area = triArea(params?.base ?? shapeInit.base, params?.tall ?? shapeInit.tall);
  return lang === "en" ? `Area ${trim(area)}.` : `Diện tích ${trim(area)}.`;
}

function comboSummary(params: Record<string, number> | undefined, lang: Lang): string {
  const scene = params?.scene ?? comboInit.scene;
  if (scene === 2) {
    const scores = [2, 3, 4, 5, params?.outlier ?? comboInit.outlier];
    return lang === "en"
      ? `Median ${trim(medianOf(scores))}, mean ${trim(meanOf(scores))}.`
      : `Trung vị ${trim(medianOf(scores))}, trung bình ${trim(meanOf(scores))}.`;
  }
  if (scene === 1) return lang === "en" ? "3! = 6 seatings." : "3! = 6 cách xếp.";
  const n = params?.n ?? comboInit.n;
  const k = Math.min(params?.k ?? comboInit.k, n);
  return `A = ${trim(arrange(n, k))} · C = ${trim(comb(n, k))}`;
}

function trim(n: number): string {
  return fmt(n);
}

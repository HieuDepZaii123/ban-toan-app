import { fmt, quadText, vertexText } from "../lib/format.ts";
import {
  apex,
  archIntegral,
  archVolumeCoeff,
  bayes,
  betweenIntegral,
  binom,
  brakeMotion,
  coolingTemp,
  diceCondition,
  fence,
  holeY,
  jumpStudy,
  opening,
  quadStudy,
  secantSlope,
  showCos,
  showSin,
} from "../lib/math.ts";
import type { Lang } from "../lib/math.ts";
import { chanceInit, derivInit, integralInit, limitInit, quadInit, trigInit } from "./params.ts";

export function topicSummary(id: string, params: Record<string, number> | undefined, lang: Lang): string {
  if (id === "quadratic") return quadraticSummary(params, lang);
  if (id === "trig") return trigSummary(params, lang);
  if (id === "limit") return limitSummary(params, lang);
  if (id === "derivative") return derivSummary(params, lang);
  if (id === "integral") return integralSummary(params, lang);
  if (id === "probability") return chanceSummary(params, lang);
  return "";
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

function trim(n: number): string {
  return fmt(n);
}

import { fmt, quadText, vertexText } from "../lib/format.ts";
import { apex, brakeMotion, fence, opening, quadStudy, secantSlope, showCos, showSin } from "../lib/math.ts";
import type { Lang } from "../lib/math.ts";
import { derivInit, quadInit, trigInit } from "./params.ts";

export function topicSummary(id: string, params: Record<string, number> | undefined, lang: Lang): string {
  if (id === "quadratic") return quadraticSummary(params, lang);
  if (id === "trig") return trigSummary(params, lang);
  if (id === "derivative") return derivSummary(params, lang);
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

function trim(n: number): string {
  return fmt(n);
}

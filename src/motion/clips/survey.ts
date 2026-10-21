import { motionCubic, motionCubicSlope, surveyX } from "../facts.ts";
import { axisH, axisV, disc, fit, frame, plot, seg, weight, type Ink } from "../pen.ts";

export const still = 0.18;

export function draw(ctx: CanvasRenderingContext2D, w: number, h: number, u: number, ink: Ink): void {
  const x = surveyX(u);
  const y = motionCubic(x);
  const m = motionCubicSlope(x);
  const pad = w < 140 ? 5 : 14;
  const map = fit(w, h, pad, -2.6, 2.6, -4, 4);
  const lw = weight(w);
  const tone = m > 0.35 ? ink.curve : m < -0.35 ? ink.alt : ink.ink;
  const dx = 0.55;
  frame(ctx, w, h, ink, () => {
    axisH(ctx, map, 0, w, ink.axis, 1);
    axisV(ctx, map, 0, h, ink.axis, 1);
    plot(ctx, map, -2.3, 2.3, motionCubic, ink.curve, lw, w < 140 ? 40 : 72);
    for (const root of [-Math.sqrt(3), 0, Math.sqrt(3)]) {
      disc(ctx, map.x(root), map.y(0), w < 140 ? 1.5 : 2.4, ink.soft);
    }
    disc(ctx, map.x(-1), map.y(2), w < 140 ? 1.8 : 3, ink.bg, ink.ink);
    disc(ctx, map.x(1), map.y(-2), w < 140 ? 1.8 : 3, ink.bg, ink.ink);
    seg(ctx, map.x(x - dx), map.y(y - m * dx), map.x(x + dx), map.y(y + m * dx), tone, lw);
    disc(ctx, map.x(x), map.y(y), w < 140 ? 2.4 : 4.2, tone, ink.bg);
  });
}

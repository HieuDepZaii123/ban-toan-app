import { expMirror, expX } from "../facts.ts";
import { axisH, axisV, disc, fit, frame, plot, seg, weight, type Ink } from "../pen.ts";

export const still = 0.37;

export function draw(ctx: CanvasRenderingContext2D, w: number, h: number, u: number, ink: Ink): void {
  const x = expX(u);
  const point = expMirror(x);
  const pad = w < 140 ? 5 : 14;
  const map = fit(w, h, pad, -1.4, 7.2, -1.4, 7.2);
  const lw = weight(w);
  const steps = w < 140 ? 40 : 80;
  frame(ctx, w, h, ink, () => {
    axisH(ctx, map, 0, w, ink.axis, 1);
    axisV(ctx, map, 0, h, ink.axis, 1);
    seg(ctx, map.x(-1), map.y(-1), map.x(6.6), map.y(6.6), ink.soft, 1, [3, 4]);
    plot(ctx, map, -1.2, 2.9, (t) => 2 ** t, ink.curve, lw, steps);
    plot(ctx, map, 0.18, 7, (t) => Math.log2(t), ink.alt, lw, steps);
    seg(ctx, map.x(x), map.y(point.y), map.x(point.mx), map.y(point.my), ink.soft, 1);
    disc(ctx, map.x(x), map.y(point.y), w < 140 ? 2.4 : 4, ink.curve, ink.bg);
    disc(ctx, map.x(point.mx), map.y(point.my), w < 140 ? 2.4 : 4, ink.alt, ink.bg);
  });
}

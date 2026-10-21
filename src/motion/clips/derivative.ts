import { secantH } from "../facts.ts";
import { axisH, axisV, disc, fit, frame, plot, seg, weight, type Ink } from "../pen.ts";

export const still = 0.38;

export function draw(ctx: CanvasRenderingContext2D, w: number, h: number, u: number, ink: Ink): void {
  const step = secantH(u);
  const slope = ((1 + step) ** 2 - 1) / step;
  const pad = w < 140 ? 5 : 14;
  const map = fit(w, h, pad, -0.4, 3.3, -0.6, 8);
  const lw = weight(w);
  const tangent = (x: number) => 1 + 2 * (x - 1);
  const secant = (x: number) => 1 + slope * (x - 1);
  frame(ctx, w, h, ink, () => {
    axisH(ctx, map, 0, w, ink.axis, 1);
    axisV(ctx, map, 0, h, ink.axis, 1);
    plot(ctx, map, -0.2, 3.1, (x) => x * x, ink.curve, lw, w < 140 ? 36 : 64);
    seg(ctx, map.x(0.2), map.y(tangent(0.2)), map.x(2.8), map.y(tangent(2.8)), ink.soft, Math.max(1, lw * 0.85), [4, 3]);
    const x0 = 0.35;
    const x1 = 1 + step + 0.35;
    seg(ctx, map.x(x0), map.y(secant(x0)), map.x(x1), map.y(secant(x1)), ink.alt, lw);
    disc(ctx, map.x(1), map.y(1), w < 140 ? 2.3 : 4, ink.ink, ink.bg);
    disc(ctx, map.x(1 + step), map.y((1 + step) ** 2), w < 140 ? 2.3 : 4, ink.alt, ink.bg);
  });
}

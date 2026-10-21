import { approachY, holeGap } from "../facts.ts";
import { axisH, axisV, disc, fit, frame, hole, plot, weight, type Ink } from "../pen.ts";

export const still = 0.45;

export function draw(ctx: CanvasRenderingContext2D, w: number, h: number, u: number, ink: Ink): void {
  const gap = holeGap(u);
  const pad = w < 140 ? 5 : 16;
  const map = fit(w, h, pad, -0.5, 2.7, 0.2, 4.1);
  const lw = weight(w);
  const steps = w < 140 ? 28 : 48;
  frame(ctx, w, h, ink, () => {
    axisH(ctx, map, 0, w, ink.axis, 1);
    axisV(ctx, map, 0, h, ink.axis, 1);
    plot(ctx, map, -0.4, 1 - 0.16, (x) => approachY(x), ink.curve, lw, steps);
    plot(ctx, map, 1 + 0.16, 2.6, (x) => approachY(x), ink.curve, lw, steps);
    const open = { x: map.x(1), y: map.y(2) };
    hole(ctx, open.x, open.y, w < 140 ? 2.8 : 5, ink.curve, ink.bg);
    const left = 1 - gap;
    const right = 1 + gap;
    disc(ctx, map.x(left), map.y(approachY(left)), w < 140 ? 2.2 : 3.6, ink.alt, ink.bg);
    disc(ctx, map.x(right), map.y(approachY(right)), w < 140 ? 2.2 : 3.6, ink.alt, ink.bg);
  });
}

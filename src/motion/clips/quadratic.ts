import { quadA, quadVertex, quadY } from "../facts.ts";
import { axisH, axisV, disc, fit, frame, plot, seg, weight, type Ink } from "../pen.ts";

export const still = 0.3;

export function draw(ctx: CanvasRenderingContext2D, w: number, h: number, u: number, ink: Ink): void {
  const a = quadA(u);
  const vertex = quadVertex(a);
  const from = quadVertex(0.55);
  const to = quadVertex(1.85);
  const pad = w < 140 ? 5 : 16;
  const map = fit(w, h, pad, -0.7, 3.2, -2.6, 1.5);
  const lw = weight(w);
  frame(ctx, w, h, ink, () => {
    axisH(ctx, map, 0, w, ink.axis, 1);
    axisV(ctx, map, 0, h, ink.axis, 1);
    seg(ctx, map.x(from.x), map.y(from.y), map.x(to.x), map.y(to.y), ink.soft, Math.max(1, lw * 0.7), [3, 3]);
    plot(ctx, map, -0.7, 3.2, (x) => quadY(a, x), ink.curve, lw, w < 140 ? 36 : 72);
    disc(ctx, map.x(vertex.x), map.y(vertex.y), w < 140 ? 2.6 : 4.5, ink.alt, ink.bg);
  });
}

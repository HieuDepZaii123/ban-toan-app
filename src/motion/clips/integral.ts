import { motionArch, stripCount } from "../facts.ts";
import { alpha, axisH, axisV, fit, frame, plot, weight, type Ink } from "../pen.ts";

export const still = 0.5;

export function draw(ctx: CanvasRenderingContext2D, w: number, h: number, u: number, ink: Ink): void {
  const n = stripCount(u);
  const width = 2 / n;
  const pad = w < 140 ? 5 : 16;
  const map = fit(w, h, pad, -0.15, 2.2, -0.2, 1.35);
  const lw = weight(w);
  frame(ctx, w, h, ink, () => {
    axisH(ctx, map, 0, w, ink.axis, 1);
    axisV(ctx, map, 0, h, ink.axis, 1);
    alpha(ctx, 0.38, () => {
      ctx.fillStyle = ink.curve;
      for (let i = 0; i < n; i += 1) {
        const mid = (i + 0.5) * width;
        const height = motionArch(mid);
        const x0 = map.x(mid - width / 2);
        const x1 = map.x(mid + width / 2);
        const y0 = map.y(0);
        const y1 = map.y(height);
        ctx.fillRect(x0, y1, x1 - x0 - 0.5, y0 - y1);
      }
    });
    plot(ctx, map, 0, 2, motionArch, ink.curve, lw, w < 140 ? 32 : 56);
  });
}

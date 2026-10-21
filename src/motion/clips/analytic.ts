import { lineFoot, pointHeight } from "../facts.ts";
import { disc, fit, frame, seg, weight, type Ink } from "../pen.ts";

export const still = 0.4;

export function draw(ctx: CanvasRenderingContext2D, w: number, h: number, u: number, ink: Ink): void {
  const p = pointHeight(u);
  const foot = lineFoot(p.x, p.y);
  const pad = w < 140 ? 5 : 14;
  const map = fit(w, h, pad, -0.3, 4.3, -0.5, 3.7);
  const lw = weight(w);
  frame(ctx, w, h, ink, () => {
    seg(ctx, map.x(-0.2), map.y(2.2), map.x(4), map.y(-2), ink.axis, Math.max(1.2, lw * 0.8));
    const fx = map.x(foot.x);
    const fy = map.y(foot.y);
    const px = map.x(p.x);
    const py = map.y(p.y);
    seg(ctx, px, py, fx, fy, ink.alt, lw, [4, 3]);
    const sx = map.x(foot.x + 0.7) - fx;
    const sy = map.y(foot.y - 0.7) - fy;
    const vx = px - fx;
    const vy = py - fy;
    const sl = Math.hypot(sx, sy) || 1;
    const vl = Math.hypot(vx, vy) || 1;
    const size = w < 140 ? 5 : 8;
    ctx.beginPath();
    ctx.strokeStyle = ink.soft;
    ctx.lineWidth = 1;
    ctx.moveTo(fx + (sx / sl) * size, fy + (sy / sl) * size);
    ctx.lineTo(fx + (sx / sl) * size + (vx / vl) * size, fy + (sy / sl) * size + (vy / vl) * size);
    ctx.lineTo(fx + (vx / vl) * size, fy + (vy / vl) * size);
    ctx.stroke();
    disc(ctx, fx, fy, w < 140 ? 2 : 3, ink.curve, ink.bg);
    disc(ctx, px, py, w < 140 ? 2.5 : 4.2, ink.alt, ink.bg);
  });
}

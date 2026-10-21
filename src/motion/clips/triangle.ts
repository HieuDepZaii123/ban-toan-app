import { TRI_A, TRI_B, TRI_C, cutK, similarCut } from "../facts.ts";
import { alpha, fit, frame, weight, type Ink } from "../pen.ts";

export const still = 0.35;

export function draw(ctx: CanvasRenderingContext2D, w: number, h: number, u: number, ink: Ink): void {
  const cut = similarCut(cutK(u));
  const pad = w < 140 ? 6 : 16;
  const map = fit(w, h, pad, -3, 3, -0.35, 3.6);
  const lw = weight(w);
  const pt = (v: readonly [number, number]) => ({ x: map.x(v[0]), y: map.y(v[1]) });
  const a = pt(TRI_A);
  const b = pt(TRI_B);
  const c = pt(TRI_C);
  const p = pt(cut.p);
  const q = pt(cut.q);
  frame(ctx, w, h, ink, () => {
    ctx.beginPath();
    ctx.strokeStyle = ink.ink;
    ctx.lineWidth = lw;
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineTo(c.x, c.y);
    ctx.closePath();
    ctx.stroke();
    alpha(ctx, 0.22, () => {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(p.x, p.y);
      ctx.lineTo(q.x, q.y);
      ctx.closePath();
      ctx.fillStyle = ink.curve;
      ctx.fill();
    });
    ctx.beginPath();
    ctx.strokeStyle = ink.alt;
    ctx.lineWidth = lw;
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(q.x, q.y);
    ctx.stroke();
  });
}

import { VEC_U, VEC_V, vecAdd, walker } from "../facts.ts";
import { alpha, arrow, disc, fit, frame, weight, type Ink } from "../pen.ts";

export const still = 0.55;

export function draw(ctx: CanvasRenderingContext2D, w: number, h: number, u: number, ink: Ink): void {
  const sum = vecAdd(VEC_U, VEC_V);
  const at = walker(u);
  const pad = w < 140 ? 6 : 18;
  const map = fit(w, h, pad, -0.35, 3.5, -0.4, 2.9);
  const lw = weight(w);
  const p = (v: readonly [number, number]) => ({ x: map.x(v[0]), y: map.y(v[1]) });
  const o = p([0, 0]);
  const pu = p(VEC_U);
  const pv = p(VEC_V);
  const ps = p(sum);
  const tip = p([VEC_U[0] + VEC_V[0], VEC_U[1] + VEC_V[1]]);
  frame(ctx, w, h, ink, () => {
    alpha(ctx, 0.14, () => {
      ctx.beginPath();
      ctx.moveTo(o.x, o.y);
      ctx.lineTo(pu.x, pu.y);
      ctx.lineTo(ps.x, ps.y);
      ctx.lineTo(pv.x, pv.y);
      ctx.closePath();
      ctx.fillStyle = ink.curve;
      ctx.fill();
    });
    arrow(ctx, o.x, o.y, pu.x, pu.y, ink.curve, lw);
    arrow(ctx, pu.x, pu.y, tip.x, tip.y, ink.curve, lw);
    arrow(ctx, o.x, o.y, ps.x, ps.y, ink.alt, lw);
    const walk = p(at);
    disc(ctx, walk.x, walk.y, w < 140 ? 2.4 : 4, ink.ink, ink.bg);
  });
}

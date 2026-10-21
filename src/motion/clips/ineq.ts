import { ineqFrame } from "../facts.ts";
import { disc, frame, weight, type Ink } from "../pen.ts";

export const still = 0.25;

export function draw(ctx: CanvasRenderingContext2D, w: number, h: number, u: number, ink: Ink): void {
  const frameState = ineqFrame(u);
  const left = frameState.lo === null;
  const pad = w < 140 ? 8 : 28;
  const y = h * 0.66;
  const xOf = (value: number) => pad + ((value + 3) / 9) * (w - pad * 2);
  const bound = xOf(2);
  const end = left ? xOf(2 - 5 * frameState.amount) : xOf(2 + 5 * frameState.amount);
  const lw = weight(w);
  const radius = w < 140 ? 3.2 : 6;
  frame(ctx, w, h, ink, () => {
    ctx.beginPath();
    ctx.strokeStyle = ink.axis;
    ctx.lineWidth = 1.1;
    ctx.moveTo(xOf(-3), y);
    ctx.lineTo(xOf(6), y);
    ctx.stroke();
    for (let tick = -2; tick <= 5; tick += 1) {
      const x = xOf(tick);
      ctx.beginPath();
      ctx.moveTo(x, y - (tick === 2 ? 6 : 3));
      ctx.lineTo(x, y + (tick === 2 ? 6 : 3));
      ctx.stroke();
    }
    const glyph = w < 140 ? 14 : 26;
    ctx.beginPath();
    ctx.strokeStyle = ink.curve;
    ctx.lineWidth = lw;
    if (left) {
      ctx.moveTo(pad, 8 + glyph);
      ctx.lineTo(pad + glyph, 8);
    } else {
      ctx.moveTo(pad, 8);
      ctx.lineTo(pad + glyph, 8 + glyph);
    }
    ctx.stroke();
    const x1 = Math.min(bound, end);
    const width = Math.max(Math.abs(end - bound), radius);
    ctx.beginPath();
    ctx.fillStyle = ink.curve;
    ctx.roundRect(x1, y - radius, width, radius * 2, radius);
    ctx.fill();
    disc(ctx, bound, y, w < 140 ? 3.1 : 5, ink.bg, ink.curve);
  });
}

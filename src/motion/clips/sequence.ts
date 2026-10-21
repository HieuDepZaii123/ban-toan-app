import { shrinkTerm, termsShown } from "../facts.ts";
import { frame, weight, type Ink } from "../pen.ts";

export const still = 0.5;

export function draw(ctx: CanvasRenderingContext2D, w: number, h: number, u: number, ink: Ink): void {
  const shown = termsShown(u);
  const wide = w >= 220;
  const lw = weight(w);
  const left = wide ? 14 : 8;
  const right = wide ? w * 0.72 : w - 8;
  const base = h - (wide ? 18 : 8);
  const top = wide ? 16 : 6;
  const span = base - top;
  frame(ctx, w, h, ink, () => {
    ctx.beginPath();
    ctx.strokeStyle = ink.axis;
    ctx.lineWidth = 1.1;
    ctx.moveTo(left, base);
    ctx.lineTo(right, base);
    ctx.stroke();
    const gap = (right - left) / 7;
    const barW = Math.max(3, gap * 0.55);
    let partial = 0;
    for (let n = 1; n <= 7; n += 1) {
      const term = shrinkTerm(n);
      const grow = Math.min(1, Math.max(0, shown - (n - 1)));
      partial += term * grow;
      const bh = (term / 8) * span * grow;
      const x = left + (n - 0.5) * gap - barW / 2;
      ctx.fillStyle = ink.curve;
      ctx.fillRect(x, base - bh, barW, Math.max(0, bh));
    }
    if (wide) {
      const railX = w * 0.84;
      const railTop = 16;
      const railBase = h - 18;
      ctx.beginPath();
      ctx.strokeStyle = ink.soft;
      ctx.lineWidth = 1;
      ctx.moveTo(railX, railTop);
      ctx.lineTo(railX, railBase);
      ctx.stroke();
      const yFull = railTop;
      const yNow = railBase - (Math.min(16, partial) / 16) * (railBase - railTop);
      ctx.beginPath();
      ctx.strokeStyle = ink.soft;
      ctx.setLineDash([3, 3]);
      ctx.moveTo(railX - 8, yFull);
      ctx.lineTo(railX + 8, yFull);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.strokeStyle = ink.alt;
      ctx.lineWidth = lw;
      ctx.moveTo(railX - 7, yNow);
      ctx.lineTo(railX + 7, yNow);
      ctx.stroke();
    }
  });
}

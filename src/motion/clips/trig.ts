import { tripAngle } from "../facts.ts";
import { disc, frame, seg, weight, type Ink } from "../pen.ts";

export const still = 150 / 360;

export function draw(ctx: CanvasRenderingContext2D, w: number, h: number, u: number, ink: Ink): void {
  const angle = tripAngle(u);
  const wide = w >= 200;
  const cx = wide ? w * 0.28 : w * 0.5;
  const cy = h * 0.52;
  const r = Math.max(10, Math.min(wide ? h * 0.36 : Math.min(w, h) * 0.34, wide ? w * 0.2 : w * 0.36));
  const px = cx + r * Math.cos(angle);
  const py = cy - r * Math.sin(angle);
  const lw = weight(w);
  frame(ctx, w, h, ink, () => {
    ctx.beginPath();
    ctx.strokeStyle = ink.axis;
    ctx.lineWidth = 1.1;
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = ink.soft;
    ctx.lineWidth = 1;
    ctx.moveTo(cx - r - 4, cy);
    ctx.lineTo(cx + r + 4, cy);
    ctx.moveTo(cx, cy - r - 4);
    ctx.lineTo(cx, cy + r + 4);
    ctx.stroke();
    if (angle > 0.02) {
      ctx.beginPath();
      ctx.strokeStyle = ink.soft;
      ctx.arc(cx, cy, Math.max(6, r * 0.28), 0, -angle, true);
      ctx.stroke();
    }
    seg(ctx, cx, cy, px, cy, ink.curve, lw);
    seg(ctx, px, cy, px, py, ink.alt, lw);
    disc(ctx, px, py, w < 140 ? 2.5 : 4, ink.ink, ink.bg);
    if (!wide) return;
    const x0 = w * 0.56;
    const x1 = w - 12;
    ctx.beginPath();
    ctx.strokeStyle = ink.axis;
    ctx.lineWidth = 1;
    ctx.moveTo(x0, cy);
    ctx.lineTo(x1, cy);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = ink.alt;
    ctx.lineWidth = lw;
    for (let i = 0; i <= 72; i += 1) {
      const t = (i / 72) * Math.PI * 2;
      const x = x0 + ((x1 - x0) * t) / (Math.PI * 2);
      const y = cy - r * Math.sin(t);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    const waveX = x0 + ((x1 - x0) * angle) / (Math.PI * 2);
    seg(ctx, px, py, waveX, py, ink.soft, 1, [3, 3]);
    disc(ctx, waveX, py, 3.2, ink.alt, ink.bg);
  });
}

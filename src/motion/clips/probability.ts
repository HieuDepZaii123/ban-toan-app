import { diePair, rollsShown, sumHistogram } from "../facts.ts";
import { frame, type Ink } from "../pen.ts";

export const still = 0.95;

const PIPS: Record<number, readonly (readonly [number, number])[]> = {
  1: [[0.5, 0.5]],
  2: [[0.28, 0.28], [0.72, 0.72]],
  3: [[0.28, 0.28], [0.5, 0.5], [0.72, 0.72]],
  4: [[0.28, 0.28], [0.72, 0.28], [0.28, 0.72], [0.72, 0.72]],
  5: [[0.28, 0.28], [0.72, 0.28], [0.5, 0.5], [0.28, 0.72], [0.72, 0.72]],
  6: [[0.28, 0.25], [0.72, 0.25], [0.28, 0.5], [0.72, 0.5], [0.28, 0.75], [0.72, 0.75]],
};

function die(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, face: number, ink: Ink): void {
  ctx.beginPath();
  ctx.fillStyle = ink.bg;
  ctx.strokeStyle = ink.ink;
  ctx.lineWidth = Math.max(1, size * 0.07);
  ctx.roundRect(x, y, size, size, size * 0.18);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = ink.ink;
  const pips = PIPS[face] ?? PIPS[1] ?? [];
  for (const pip of pips) {
    const px = pip[0];
    const py = pip[1];
    if (px === undefined || py === undefined) continue;
    ctx.beginPath();
    ctx.arc(x + px * size, y + py * size, size * 0.085, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function draw(ctx: CanvasRenderingContext2D, w: number, h: number, u: number, ink: Ink): void {
  const rolls = rollsShown(u);
  const bins = sumHistogram(rolls);
  const ghost = sumHistogram(36);
  const pair = diePair(Math.max(0, rolls - 1));
  const wide = w >= 200;
  const size = wide ? Math.min(42, h * 0.34) : 13;
  frame(ctx, w, h, ink, () => {
    const diceX = wide ? 16 : 4;
    const gap = wide ? 10 : 3;
    const diceY = (h - size) / 2;
    die(ctx, diceX, diceY, size, rolls === 0 ? 1 : pair.a, ink);
    die(ctx, diceX + size + gap, diceY, size, rolls === 0 ? 1 : pair.b, ink);
    const plotX = diceX + size * 2 + gap + (wide ? 16 : 5);
    const plotW = w - plotX - (wide ? 14 : 6);
    const base = h - (wide ? 16 : 8);
    const top = wide ? 14 : 6;
    const slot = plotW / 11;
    const barW = Math.max(2, slot * 0.62);
    ctx.beginPath();
    ctx.strokeStyle = ink.axis;
    ctx.lineWidth = 1;
    ctx.moveTo(plotX, base);
    ctx.lineTo(plotX + plotW, base);
    ctx.stroke();
    for (let sum = 2; sum <= 12; sum += 1) {
      const x = plotX + (sum - 2) * slot + (slot - barW) / 2;
      const gh = ((ghost[sum] ?? 0) / 6) * (base - top);
      const bh = ((bins[sum] ?? 0) / 6) * (base - top);
      ctx.globalAlpha = 0.28;
      ctx.fillStyle = ink.soft;
      ctx.fillRect(x, base - gh, barW, gh);
      ctx.globalAlpha = 1;
      ctx.fillStyle = sum === pair.a + pair.b && rolls > 0 ? ink.alt : ink.curve;
      ctx.fillRect(x, base - bh, barW, bh);
    }
  });
}

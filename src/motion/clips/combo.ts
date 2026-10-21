import { arrangementAt } from "../facts.ts";
import { disc, frame, type Ink } from "../pen.ts";

export const still = 0;

const LETTERS = ["A", "B", "C"];

export function draw(ctx: CanvasRenderingContext2D, w: number, h: number, u: number, ink: Ink): void {
  const { slot, index } = arrangementAt(u);
  const colors = [ink.curve, ink.alt, ink.ink];
  const wide = w >= 180;
  const gap = wide ? Math.min(72, w * 0.16) : 24;
  const cy = h * (wide ? 0.46 : 0.54);
  const r = wide ? 16 : 8;
  frame(ctx, w, h, ink, () => {
    for (let token = 0; token < 3; token += 1) {
      const x = w / 2 + ((slot[token] ?? 0) - 1) * gap;
      const fill = colors[token] ?? ink.ink;
      disc(ctx, x, cy, r, fill);
      ctx.fillStyle = ink.bg;
      ctx.font = `600 ${Math.round(r * 1.05)}px "Be Vietnam Pro", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(LETTERS[token] ?? "", x, cy + 0.5);
    }
    if (!wide) return;
    const pipY = h * 0.78;
    for (let i = 0; i < 6; i += 1) {
      const x = w / 2 + (i - 2.5) * 14;
      disc(ctx, x, pipY, 3.2, i === index ? ink.curve : ink.grid, i === index ? ink.curve : ink.soft);
    }
  });
}

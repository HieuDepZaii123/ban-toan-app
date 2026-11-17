import { useEffect, useRef } from "react";
import { drawAxes, drawGrid, makeMap, paintBase, readColors } from "../../labs/draw.ts";

export const at = <T,>(list: readonly T[], i: number): T => list[Math.max(0, Math.min(list.length - 1, i))] as T;

/** Gọi tick đều đặn khi running; dọn khi tắt hoặc gỡ. */
export function useTicker(running: boolean, ms: number, tick: () => void): void {
  const ref = useRef(tick);
  useEffect(() => { ref.current = tick; });
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => ref.current(), ms);
    return () => window.clearInterval(id);
  }, [running, ms]);
}

/** Dựng nền đồ thị: lưới, trục, trả về bản đồ tọa độ. */
export function frame(ctx: CanvasRenderingContext2D, w: number, h: number, x0: number, x1: number, y0: number, y1: number, xl = "x", yl = "y") {
  const colors = readColors();
  const pad = 28;
  paintBase(ctx, w, h, colors);
  const map = makeMap(w, h, pad, x0, x1, y0, y1);
  drawGrid(ctx, map, x0, x1, y0, y1, colors);
  drawAxes(ctx, map, x0, x1, y0, y1, colors, xl, yl, w, pad);
  return { colors, map, pad };
}

export function line(ctx: CanvasRenderingContext2D, ax: number, ay: number, bx: number, by: number, color: string, lw = 1.6) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.moveTo(ax, ay);
  ctx.lineTo(bx, by);
  ctx.stroke();
}

export function label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string) {
  ctx.fillStyle = color;
  ctx.font = "12px system-ui, sans-serif";
  ctx.fillText(text, x, y);
}

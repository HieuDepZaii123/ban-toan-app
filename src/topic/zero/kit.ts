import { useEffect, useRef } from "react";
import { drawAxes, drawGrid, makeMap, paintBase, readColors } from "../../labs/draw.ts";
import { useLang } from "../../ui/useLang.ts";

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
export function frame(ctx: CanvasRenderingContext2D, w: number, h: number, x0: number, x1: number, y0: number, y1: number, xl = "x", yl = "y", equal = false) {
  const colors = readColors();
  const pad = 28;
  paintBase(ctx, w, h, colors);
  if (equal) {
    // Cùng tỉ lệ hai trục: đường tròn phải tròn, góc vuông phải vuông. Mở rộng khoảng ngắn hơn quanh tâm của nó.
    const innerW = Math.max(1, w - pad * 2);
    const innerH = Math.max(1, h - pad * 2);
    const s = Math.min(innerW / (x1 - x0), innerH / (y1 - y0));
    const cx = (x0 + x1) / 2;
    const cy = (y0 + y1) / 2;
    x0 = cx - innerW / s / 2;
    x1 = cx + innerW / s / 2;
    y0 = cy - innerH / s / 2;
    y1 = cy + innerH / s / 2;
  }
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

/** Chọn chuỗi theo ngôn ngữ đang bật: tt(tiếng Việt, tiếng Anh). */
export function useTx(): (vi: string, en: string) => string {
  const lang = useLang();
  return (vi, en) => (lang === "en" ? en : vi);
}

/** Tên ví dụ, mô tả và thẻ dùng trong các hình: tiếng Việt → tiếng Anh. Chuỗi không có trong bảng giữ nguyên. */
const EN_NAMES: Record<string, string> = {
  "x²  từ 0 đến 2": "x²  from 0 to 2",
  "sin x  từ 0 đến π": "sin x  from 0 to π",
  "√x  từ 0 đến 4": "√x  from 0 to 4",
  "góc đối  −α": "opposite angle  −α",
  "góc bù  π − α": "supplementary angle  π − α",
  "góc phụ  π/2 − α": "complementary angle  π/2 − α",
  "hơn kém nửa vòng  α + π": "half a turn apart  α + π",
  "lật qua trục hoành": "flip across the horizontal axis",
  "lật qua trục tung": "flip across the vertical axis",
  "lật qua đường chéo y = x (đổi chỗ hai toạ độ)": "flip across the diagonal y = x (swap the two coordinates)",
  "lật qua gốc toạ độ (đổi dấu cả hai toạ độ)": "flip through the origin (change the sign of both coordinates)",
  "tích  u·v": "product  u·v",
  "thương  u/v": "quotient  u/v",
  "hàm hợp  sin(x²)": "composite function  sin(x²)",
  "|x| tại 0 (góc nhọn)": "|x| at 0 (a corner)",
  "∛x tại 0 (tiếp tuyến đứng)": "∛x at 0 (vertical tangent)",
  "x·sin(1/x) tại 0 (rung vô hạn)": "x·sin(1/x) at 0 (infinite wiggling)",
  "x² tại 0 (trơn, đối chứng)": "x² at 0 (smooth, for comparison)",
  "hai bên cho hai độ dốc khác nhau": "the two sides give different slopes",
  "độ dốc lớn tùy ý, không dừng ở số nào": "the slope grows without bound and settles at no number",
  "độ dốc cứ nhảy qua lại, không dồn về số nào": "the slope keeps jumping back and forth and settles at no number",
  "hai bên dồn về cùng một số": "both sides settle at the same number",
  "đầu mút trái": "left endpoint",
  "đầu mút phải": "right endpoint",
  "cực đại": "maximum",
  "cực tiểu": "minimum",
  "đỉnh": "vertex",
  "hình nón: y = x, 0 ≤ x ≤ 3": "cone: y = x, 0 ≤ x ≤ 3",
  "hình cầu: y = √(4 − x²)": "sphere: y = √(4 − x²)",
  "parabol xoay: y = √x, 0 ≤ x ≤ 4": "paraboloid: y = √x, 0 ≤ x ≤ 4",
  "y = x và y = x²": "y = x and y = x²",
  "y = 4 − x² và y = x + 2": "y = 4 − x² and y = x + 2",
  "y = sin x và y = cos x": "y = sin x and y = cos x",
  "∫ x·eˣ dx   (u = x, dv = eˣdx)": "∫ x·eˣ dx   (u = x, dv = eˣdx)",
  "∫ x·cos x dx   (u = x, dv = cos x dx)": "∫ x·cos x dx   (u = x, dv = cos x dx)",
  "∫ ln x dx   (u = ln x, dv = dx)": "∫ ln x dx   (u = ln x, dv = dx)",
  "parabol": "parabola",
  "bậc ba": "cubic"
};

export function en(vi: string): string {
  return EN_NAMES[vi] ?? vi;
}

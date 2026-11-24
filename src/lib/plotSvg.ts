/**
 * Đồ thị đa thức vẽ bằng SVG cho câu hỏi đọc đồ thị trong đề thi thử.
 * Ký hiệu trong văn bản: {{plot:hệ số từ bậc cao|xmin|xmax|ymin|ymax}}, ví dụ {{plot:1,-3,0,2|-2|4|-4|4}}.
 * Có lưới và nhãn số nguyên trên hai trục, không ghi sẵn tọa độ các điểm cực trị.
 */
const W = 360;
const H = 260;
const PAD = 26;

function evalPoly(coef: number[], x: number): number {
  return coef.reduce((acc, c) => acc * x + c, 0);
}

function stepFor(span: number): number {
  return span <= 8 ? 1 : span <= 16 ? 2 : 5;
}

export function plotSvg(coef: number[], xmin: number, xmax: number, ymin: number, ymax: number): string {
  const sx = (x: number) => PAD + ((x - xmin) / (xmax - xmin)) * (W - 2 * PAD);
  const sy = (y: number) => H - PAD - ((y - ymin) / (ymax - ymin)) * (H - 2 * PAD);
  const stepX = stepFor(xmax - xmin);
  const stepY = stepFor(ymax - ymin);
  const parts: string[] = [];
  for (let x = Math.ceil(xmin / stepX) * stepX; x <= xmax; x += stepX) {
    parts.push(`<line x1="${sx(x).toFixed(1)}" y1="${PAD / 2}" x2="${sx(x).toFixed(1)}" y2="${H - PAD / 2}" class="plot-grid"/>`);
  }
  for (let y = Math.ceil(ymin / stepY) * stepY; y <= ymax; y += stepY) {
    parts.push(`<line x1="${PAD / 2}" y1="${sy(y).toFixed(1)}" x2="${W - PAD / 2}" y2="${sy(y).toFixed(1)}" class="plot-grid"/>`);
  }
  const ax = ymin <= 0 && ymax >= 0 ? sy(0) : H - PAD;
  const ay = xmin <= 0 && xmax >= 0 ? sx(0) : PAD;
  parts.push(`<line x1="${PAD / 2}" y1="${ax.toFixed(1)}" x2="${W - PAD / 2}" y2="${ax.toFixed(1)}" class="plot-axis"/>`);
  parts.push(`<line x1="${ay.toFixed(1)}" y1="${PAD / 2}" x2="${ay.toFixed(1)}" y2="${H - PAD / 2}" class="plot-axis"/>`);
  for (let x = Math.ceil(xmin / stepX) * stepX; x <= xmax; x += stepX) {
    if (x !== 0) parts.push(`<text x="${sx(x).toFixed(1)}" y="${(ax + 12).toFixed(1)}" class="plot-tick" text-anchor="middle">${x}</text>`);
  }
  for (let y = Math.ceil(ymin / stepY) * stepY; y <= ymax; y += stepY) {
    if (y !== 0) parts.push(`<text x="${(ay - 4).toFixed(1)}" y="${(sy(y) + 3.5).toFixed(1)}" class="plot-tick" text-anchor="end">${y}</text>`);
  }
  parts.push(`<text x="${(ay - 4).toFixed(1)}" y="${(ax + 12).toFixed(1)}" class="plot-tick" text-anchor="end">O</text>`);
  const points: string[] = [];
  const steps = 160;
  for (let i = 0; i <= steps; i += 1) {
    const x = xmin + ((xmax - xmin) * i) / steps;
    const y = evalPoly(coef, x);
    if (y >= ymin - 1 && y <= ymax + 1) points.push(`${sx(x).toFixed(1)},${sy(Math.max(ymin - 1, Math.min(ymax + 1, y))).toFixed(1)}`);
  }
  parts.push(`<polyline points="${points.join(" ")}" class="plot-curve"/>`);
  return `<svg class="plot-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Đồ thị hàm số y = f(x)">${parts.join("")}</svg>`;
}

/** Thay mọi {{plot:…}} trong một đoạn văn bản bằng SVG; phần còn lại giữ nguyên. */
export const PLOT_TOKEN = /\{\{plot:([^}]+)\}\}/g;

export function plotFromToken(body: string): string | null {
  const [coefText, x0, x1, y0, y1] = body.split("|");
  const coef = (coefText ?? "").split(",").map(Number);
  const nums = [x0, x1, y0, y1].map(Number);
  if (coef.length < 2 || coef.some((n) => !Number.isFinite(n)) || nums.some((n) => !Number.isFinite(n))) return null;
  return plotSvg(coef, nums[0]!, nums[1]!, nums[2]!, nums[3]!);
}

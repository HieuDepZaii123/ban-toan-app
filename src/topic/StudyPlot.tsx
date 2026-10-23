import { Graph } from "../labs/Graph.tsx";

type Point = { x: number; y: number };

function paintColors(): { bg: string; grid: string; axis: string; curve: string; alt: string; ink: string } {
  const style = getComputedStyle(document.documentElement);
  const pick = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback;
  return {
    bg: pick("--plot-bg", "#fbf8f2"),
    grid: pick("--plot-grid", "rgba(28, 25, 21, 0.08)"),
    axis: pick("--plot-axis", "#1c1915"),
    curve: pick("--plot-curve", "#0e6b5e"),
    alt: pick("--plot-alt", "#c4552a"),
    ink: pick("--ink", "#1c1915"),
  };
}

function finite(value: number | undefined): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function StudyPlot({
  rows,
  xKey,
  yKey,
  formula,
  showCurve,
  label,
}: {
  rows: readonly Record<string, number>[];
  xKey: string;
  yKey: string;
  formula: (x: number) => number;
  showCurve: boolean;
  label: string;
}) {
  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const color = paintColors();
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color.bg;
    ctx.fillRect(0, 0, width, height);
    const points: Point[] = [];
    for (const row of rows) {
      const x = row[xKey];
      const y = row[yKey];
      if (finite(x) && finite(y)) points.push({ x, y });
    }
    if (points.length === 0) return;
    let x0 = Math.min(...points.map((point) => point.x));
    let x1 = Math.max(...points.map((point) => point.x));
    if (x1 - x0 < 1e-6) {
      x0 -= 1;
      x1 += 1;
    } else {
      const pad = (x1 - x0) * 0.08;
      x0 -= pad;
      x1 += pad;
    }
    const curve: Point[] = [];
    if (showCurve) {
      for (let i = 0; i <= 80; i += 1) {
        const x = x0 + ((x1 - x0) * i) / 80;
        const y = formula(x);
        if (finite(y)) curve.push({ x, y });
      }
    }
    const ys = [...points.map((point) => point.y), ...curve.map((point) => point.y)];
    let y0 = Math.min(...ys);
    let y1 = Math.max(...ys);
    const mid = (y0 + y1) / 2;
    const floor = Math.max(0.25, Math.abs(mid) * 0.15);
    if (y1 - y0 < floor) {
      y0 = mid - floor / 2;
      y1 = mid + floor / 2;
    }
    const yPad = (y1 - y0) * 0.1;
    y0 -= yPad;
    y1 += yPad;
    const left = 46;
    const right = 14;
    const top = 14;
    const bottom = 28;
    const X = (x: number) => left + ((x - x0) / (x1 - x0)) * (width - left - right);
    const Y = (y: number) => top + ((y1 - y) / (y1 - y0)) * (height - top - bottom);
    ctx.strokeStyle = color.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= 4; i += 1) {
      const y = y0 + ((y1 - y0) * i) / 4;
      ctx.moveTo(left, Y(y));
      ctx.lineTo(width - right, Y(y));
    }
    ctx.stroke();
    ctx.strokeStyle = color.axis;
    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.lineTo(left, height - bottom);
    ctx.lineTo(width - right, height - bottom);
    ctx.stroke();
    const tick = (value: number) => {
      const abs = Math.abs(value);
      const digits = abs >= 100 ? 1 : abs >= 1 ? 2 : 3;
      return value.toFixed(digits);
    };
    ctx.fillStyle = color.ink;
    ctx.font = "12px 'Be Vietnam Pro', sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(tick(y1), left - 6, top + 10);
    ctx.fillText(tick(y0), left - 6, height - bottom);
    ctx.textAlign = "left";
    ctx.fillText(tick(x0), left, height - 8);
    ctx.textAlign = "right";
    ctx.fillText(tick(x1), width - right, height - 8);
    if (curve.length > 1) {
      ctx.strokeStyle = color.curve;
      ctx.lineWidth = 2;
      ctx.beginPath();
      const first = curve[0];
      if (first) ctx.moveTo(X(first.x), Y(first.y));
      for (const point of curve.slice(1)) ctx.lineTo(X(point.x), Y(point.y));
      ctx.stroke();
    }
    const joined = [...points].sort((a, b) => a.x - b.x);
    ctx.strokeStyle = color.alt;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const start = joined[0];
    if (start) ctx.moveTo(X(start.x), Y(start.y));
    for (const point of joined.slice(1)) ctx.lineTo(X(point.x), Y(point.y));
    ctx.stroke();
    for (const point of points) {
      ctx.beginPath();
      ctx.fillStyle = color.alt;
      ctx.arc(X(point.x), Y(point.y), 4.5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return (
    <div className="study-plot">
      <Graph draw={draw} label={label} />
    </div>
  );
}

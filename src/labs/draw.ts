export type PlotColors = {
  bg: string;
  grid: string;
  axis: string;
  curve: string;
  alt: string;
  ink: string;
  soft: string;
};

export type Map2 = {
  x: (value: number) => number;
  y: (value: number) => number;
  toX: (px: number) => number;
  toY: (py: number) => number;
};

export function readColors(): PlotColors {
  const style = getComputedStyle(document.documentElement);
  const pick = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback;
  return {
    bg: pick("--plot-bg", "#fbf8f2"),
    grid: pick("--plot-grid", "rgba(28,25,21,.08)"),
    axis: pick("--plot-axis", "#1c1915"),
    curve: pick("--plot-curve", "#0e6b5e"),
    alt: pick("--plot-alt", "#c4552a"),
    ink: pick("--ink", "#1c1915"),
    soft: pick("--ink-soft", "#5c564c"),
  };
}

export function makeMap(width: number, height: number, pad: number, x0: number, x1: number, y0: number, y1: number): Map2 {
  const innerW = Math.max(1, width - pad * 2);
  const innerH = Math.max(1, height - pad * 2);
  return {
    x: (value) => pad + ((value - x0) / (x1 - x0)) * innerW,
    y: (value) => pad + ((y1 - value) / (y1 - y0)) * innerH,
    toX: (px) => x0 + ((px - pad) / innerW) * (x1 - x0),
    toY: (py) => y1 - ((py - pad) / innerH) * (y1 - y0),
  };
}

export function paintBase(ctx: CanvasRenderingContext2D, width: number, height: number, colors: PlotColors): void {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, width, height);
}

export function drawGrid(
  ctx: CanvasRenderingContext2D,
  map: Map2,
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  colors: PlotColors,
): void {
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = colors.grid;
  ctx.lineWidth = 1;
  for (let i = Math.ceil(x0); i <= Math.floor(x1); i += 1) {
    ctx.moveTo(map.x(i), map.y(y0));
    ctx.lineTo(map.x(i), map.y(y1));
  }
  for (let j = Math.ceil(y0); j <= Math.floor(y1); j += 1) {
    ctx.moveTo(map.x(x0), map.y(j));
    ctx.lineTo(map.x(x1), map.y(j));
  }
  ctx.stroke();
  ctx.restore();
}

export function drawAxes(
  ctx: CanvasRenderingContext2D,
  map: Map2,
  x0: number,
  x1: number,
  y0: number,
  y1: number,
  colors: PlotColors,
  xLabel: string,
  yLabel: string,
  width: number,
  pad: number,
): void {
  ctx.save();
  ctx.strokeStyle = colors.axis;
  ctx.fillStyle = colors.soft;
  ctx.lineWidth = 1.4;
  ctx.font = "12px 'Be Vietnam Pro', sans-serif";
  ctx.beginPath();
  if (y0 < 0 && y1 > 0) {
    ctx.moveTo(map.x(x0), map.y(0));
    ctx.lineTo(map.x(x1), map.y(0));
  }
  if (x0 < 0 && x1 > 0) {
    ctx.moveTo(map.x(0), map.y(y0));
    ctx.lineTo(map.x(0), map.y(y1));
  }
  ctx.stroke();
  if (y0 < 0 && y1 > 0) {
    ctx.textAlign = "right";
    ctx.fillText(xLabel, width - 8, map.y(0) - 6);
  } else {
    ctx.textAlign = "right";
    ctx.fillText(xLabel, width - 8, heightSafe(pad));
  }
  ctx.textAlign = "left";
  ctx.fillText(yLabel, pad + 4, pad + 12);
  ctx.restore();
}

function heightSafe(pad: number): number {
  return pad + 14;
}

export function strokeFn(
  ctx: CanvasRenderingContext2D,
  map: Map2,
  width: number,
  height: number,
  pad: number,
  x0: number,
  x1: number,
  fn: (x: number) => number,
  color: string,
  lineWidth = 2.4,
  clip?: { x: number; y: number; w: number; h: number },
): void {
  ctx.save();
  ctx.beginPath();
  if (clip) ctx.rect(clip.x, clip.y, clip.w, clip.h);
  else ctx.rect(pad, pad, width - pad * 2, height - pad * 2);
  ctx.clip();
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  const steps = 200;
  let pen = false;
  for (let i = 0; i <= steps; i += 1) {
    const x = x0 + ((x1 - x0) * i) / steps;
    const y = fn(x);
    if (!Number.isFinite(y)) {
      pen = false;
      continue;
    }
    const px = map.x(x);
    const py = map.y(y);
    if (!pen) {
      ctx.moveTo(px, py);
      pen = true;
    } else ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.restore();
}

export function dashed(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
): void {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

export function dot(ctx: CanvasRenderingContext2D, x: number, y: number, fill: string, ring: string, radius = 5): void {
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.strokeStyle = ring;
  ctx.lineWidth = 2;
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

export function halo(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fill: string,
  bg: string,
  align: CanvasTextAlign = "center",
): void {
  ctx.save();
  ctx.font = "12px 'Be Vietnam Pro', sans-serif";
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.lineWidth = 4;
  ctx.strokeStyle = bg;
  ctx.strokeText(text, x, y);
  ctx.fillStyle = fill;
  ctx.fillText(text, x, y);
  ctx.restore();
}

export function clipLine(
  ctx: CanvasRenderingContext2D,
  map: Map2,
  width: number,
  height: number,
  pad: number,
  xAt: number,
  yAt: number,
  slope: number,
  color: string,
  widthPx: number,
): void {
  const x0 = map.toX(pad);
  const x1 = map.toX(width - pad);
  const y0 = yAt + slope * (x0 - xAt);
  const y1 = yAt + slope * (x1 - xAt);
  ctx.save();
  ctx.beginPath();
  ctx.rect(pad, pad, width - pad * 2, height - pad * 2);
  ctx.clip();
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = widthPx;
  ctx.moveTo(map.x(x0), map.y(y0));
  ctx.lineTo(map.x(x1), map.y(y1));
  ctx.stroke();
  ctx.restore();
}

/** +z is up. x runs up-right, y runs up-left. */
export function projectIso(x: number, y: number, z: number): { x: number; y: number } {
  return { x: (x - y) * Math.cos(Math.PI / 6), y: -z - (x + y) * 0.5 };
}

export function fitIso(
  samples: readonly (readonly [number, number, number])[],
  width: number,
  height: number,
  pad: number,
): (x: number, y: number, z: number) => { x: number; y: number } {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const [x, y, z] of samples) {
    const point = projectIso(x, y, z);
    minX = Math.min(minX, point.x);
    maxX = Math.max(maxX, point.x);
    minY = Math.min(minY, point.y);
    maxY = Math.max(maxY, point.y);
  }
  if (!Number.isFinite(minX)) {
    minX = 0;
    maxX = 1;
    minY = 0;
    maxY = 1;
  }
  const growX = (maxX - minX) * 0.08 || 0.2;
  const growY = (maxY - minY) * 0.08 || 0.2;
  minX -= growX;
  maxX += growX;
  minY -= growY;
  maxY += growY;
  const spanX = Math.max(1e-6, maxX - minX);
  const spanY = Math.max(1e-6, maxY - minY);
  const scale = Math.min((width - pad * 2) / spanX, (height - pad * 2) / spanY);
  const ox = pad + (width - pad * 2 - spanX * scale) / 2 - minX * scale;
  const oy = pad + (height - pad * 2 - spanY * scale) / 2 - minY * scale;
  return (x, y, z) => {
    const point = projectIso(x, y, z);
    return { x: ox + point.x * scale, y: oy + point.y * scale };
  };
}

export function arrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
): void {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const head = 9;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - head * Math.cos(angle - 0.4), y2 - head * Math.sin(angle - 0.4));
  ctx.lineTo(x2 - head * Math.cos(angle + 0.4), y2 - head * Math.sin(angle + 0.4));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function nearestHandle(
  handles: readonly { id: string; x: number; y: number }[],
  px: number,
  py: number,
  limit = 28,
): string | null {
  let best: string | null = null;
  let dist = limit * limit;
  for (const handle of handles) {
    const gap = (handle.x - px) ** 2 + (handle.y - py) ** 2;
    if (gap <= dist) {
      dist = gap;
      best = handle.id;
    }
  }
  return best;
}

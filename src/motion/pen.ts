export type Ink = {
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
};

export function weight(w: number): number {
  return w < 140 ? 1.35 : 2.05;
}

export function frame(ctx: CanvasRenderingContext2D, w: number, h: number, ink: Ink, draw: () => void): void {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = ink.bg;
  ctx.fillRect(0, 0, w, h);
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, w, h);
  ctx.clip();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  draw();
  ctx.restore();
}

/** Fit a math window into the canvas without stretching circles into ellipses. */
export function fit(w: number, h: number, pad: number, x0: number, x1: number, y0: number, y1: number): Map2 {
  const iw = Math.max(1, w - pad * 2);
  const ih = Math.max(1, h - pad * 2);
  const s = Math.min(iw / (x1 - x0), ih / (y1 - y0));
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const X0 = cx - iw / s / 2;
  const Y1 = cy + ih / s / 2;
  return {
    x: (value) => pad + (value - X0) * s,
    y: (value) => pad + (Y1 - value) * s,
  };
}

export function axisH(ctx: CanvasRenderingContext2D, map: Map2, y: number, w: number, color: string, lw: number): void {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.moveTo(0, map.y(y));
  ctx.lineTo(w, map.y(y));
  ctx.stroke();
}

export function axisV(ctx: CanvasRenderingContext2D, map: Map2, x: number, h: number, color: string, lw: number): void {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.moveTo(map.x(x), 0);
  ctx.lineTo(map.x(x), h);
  ctx.stroke();
}

export function plot(
  ctx: CanvasRenderingContext2D,
  map: Map2,
  x0: number,
  x1: number,
  fn: (x: number) => number,
  color: string,
  lw: number,
  steps = 48,
): void {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  let penDown = false;
  for (let i = 0; i <= steps; i += 1) {
    const x = x0 + ((x1 - x0) * i) / steps;
    const y = fn(x);
    if (!Number.isFinite(y)) {
      penDown = false;
      continue;
    }
    const px = map.x(x);
    const py = map.y(y);
    if (!penDown) {
      ctx.moveTo(px, py);
      penDown = true;
    } else ctx.lineTo(px, py);
  }
  ctx.stroke();
}

export function seg(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  lw: number,
  dash?: number[],
): void {
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  if (dash) ctx.setLineDash(dash);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

export function disc(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, fill: string, ring?: string): void {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  if (ring) {
    ctx.lineWidth = Math.max(1, r * 0.28);
    ctx.strokeStyle = ring;
    ctx.stroke();
  }
}

export function hole(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, bg: string): void {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.lineWidth = Math.max(1.2, r * 0.34);
  ctx.strokeStyle = color;
  ctx.stroke();
}

export function arrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  lw: number,
): void {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const head = Math.max(5, lw * 3.4);
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lw;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - head * Math.cos(ang - 0.42), y2 - head * Math.sin(ang - 0.42));
  ctx.lineTo(x2 - head * Math.cos(ang + 0.42), y2 - head * Math.sin(ang + 0.42));
  ctx.closePath();
  ctx.fill();
}

export function alpha(ctx: CanvasRenderingContext2D, a: number, draw: () => void): void {
  ctx.save();
  ctx.globalAlpha *= a;
  draw();
  ctx.restore();
}

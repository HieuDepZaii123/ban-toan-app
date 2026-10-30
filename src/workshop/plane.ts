export type Pt = { x: number; y: number };

export function midpoint(a: Pt, b: Pt): Pt {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/** Chân đường vuông góc từ C xuống đường thẳng AB. */
export function foot(a: Pt, b: Pt, c: Pt): Pt {
  const vx = b.x - a.x;
  const vy = b.y - a.y;
  const den = vx * vx + vy * vy;
  const t = den === 0 ? 0 : ((c.x - a.x) * vx + (c.y - a.y) * vy) / den;
  return { x: a.x + t * vx, y: a.y + t * vy };
}

export function nearIndex(points: Pt[], x: number, y: number, radius: number): number {
  let best = -1;
  let dist = radius;
  points.forEach((point, index) => {
    const d = Math.hypot(point.x - x, point.y - y);
    if (d < dist) {
      dist = d;
      best = index;
    }
  });
  return best;
}

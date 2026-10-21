export type Range = Record<string, readonly [number, number, number]>;

export const quadInit = { scene: 0, a: 1, b: -2, c: -3, va: 1, vh: 1, vk: -4, fence: 10 };
export const quadRange: Range = {
  scene: [0, 2, 1],
  a: [-3, 3, 0.1],
  b: [-6, 6, 0.1],
  c: [-6, 6, 0.1],
  va: [-3, 3, 0.1],
  vh: [-4, 4, 0.1],
  vk: [-6, 6, 0.1],
  fence: [0.5, 19.5, 0.1],
};

export const trigInit = { scene: 0, angle: 150, distance: 20, tilt: 30 };
export const trigRange: Range = {
  scene: [0, 1, 1],
  angle: [0, 360, 1],
  distance: [8, 40, 1],
  tilt: [5, 75, 1],
};

export const limitInit = { scene: 0, h: 1, assigned: 5, left: -1, right: 1, at: 0, probe: -1.5, time: 0 };
export const limitRange: Range = {
  scene: [0, 2, 1],
  h: [-2, 2, 0.05],
  assigned: [-1, 5, 0.5],
  left: [-2, 3, 0.5],
  right: [-2, 3, 0.5],
  at: [-2, 3, 0.5],
  probe: [-2.5, 2.5, 0.05],
  time: [0, 20, 0.1],
};

export const integralInit = { scene: 0, upper: 2, strips: 8, gap: 1, span: 2 };
export const integralRange: Range = {
  scene: [0, 2, 1],
  upper: [0.2, 2, 0.1],
  strips: [1, 24, 1],
  gap: [0.2, 1, 0.05],
  span: [0.2, 2, 0.05],
};

export const chanceInit = { scene: 0, face: 6, prev: 1, sens: 99, fpr: 5, n: 3, k: 2, p: 0.5 };
export const chanceRange: Range = {
  scene: [0, 2, 1],
  face: [1, 6, 1],
  prev: [1, 20, 1],
  sens: [50, 100, 1],
  fpr: [1, 30, 1],
  n: [1, 8, 1],
  k: [0, 8, 1],
  p: [0.1, 0.9, 0.1],
};

export const expInit = { scene: 0, base: 2, x: 2, rate: 8, years: 5, massTime: 20 };
export const expRange: Range = {
  scene: [0, 2, 1],
  base: [0.2, 4, 0.1],
  x: [-2, 3, 0.1],
  rate: [1, 20, 1],
  years: [0, 15, 1],
  massTime: [0, 40, 1],
};

export const seqInit = { scene: 0, u1: 3, d: 4, n: 10, g1: 8, q: 0.5, gn: 6, drop: 8, ratio: 0.5, months: 12 };
export const seqRange: Range = {
  scene: [0, 2, 1],
  u1: [-4, 8, 1],
  d: [-5, 6, 1],
  n: [1, 12, 1],
  g1: [1, 8, 1],
  q: [-1.5, 3, 0.1],
  gn: [1, 8, 1],
  drop: [2, 16, 1],
  ratio: [0.2, 0.8, 0.1],
  months: [1, 12, 1],
};

export const surveyInit = { scene: 0, x: 0, rx: 3, px: 0 };
export const surveyRange: Range = {
  scene: [0, 2, 1],
  x: [-2.4, 2.4, 0.05],
  rx: [-1.5, 4, 0.05],
  px: [-2, 2, 0.05],
};

export const derivInit = { scene: 0, h: 1, v0: 20, time: 2, brake: 0 };
export const derivRange: Range = {
  scene: [0, 2, 1],
  h: [-1.5, 1.5, 0.05],
  v0: [8, 30, 1],
  time: [0, 10, 0.05],
  brake: [0, 5, 0.1],
};

export const ineqInit = { scene: 0, a: 4, b: 9, p: 1, q: 2, c: 3, d: 4, x: 6, y: 4 };
export const ineqRange: Range = {
  scene: [0, 2, 1],
  a: [0, 12, 0.5],
  b: [0, 12, 0.5],
  p: [-6, 6, 0.5],
  q: [-6, 6, 0.5],
  c: [-6, 6, 0.5],
  d: [-6, 6, 0.5],
  x: [0, 10, 0.5],
  y: [0, 10, 0.5],
};

export const vectorInit = {
  scene: 0,
  ux: 2, uy: 1, uz: 2,
  vx: 1, vy: -1, vz: 2,
  m11: 2, m12: 1, m21: 1, m22: -1,
  s11: 2, s12: 1, t1: 5,
  s21: 1, s22: -1, t2: 1,
};
export const vectorRange: Range = {
  scene: [0, 2, 1],
  ux: [-4, 4, 0.5], uy: [-4, 4, 0.5], uz: [-4, 4, 0.5],
  vx: [-4, 4, 0.5], vy: [-4, 4, 0.5], vz: [-4, 4, 0.5],
  m11: [-4, 4, 0.5], m12: [-4, 4, 0.5], m21: [-4, 4, 0.5], m22: [-4, 4, 0.5],
  s11: [-4, 4, 0.5], s12: [-4, 4, 0.5], t1: [-6, 8, 0.5],
  s21: [-4, 4, 0.5], s22: [-4, 4, 0.5], t2: [-6, 8, 0.5],
};

export const analyticInit = {
  scene: 0,
  a: 1, b: 1, c: -2, px: 3, py: 1,
  pa: 1, pb: 1, pc: 1, pd: -6, qx: 1, qy: 1, qz: 1,
  radius: 5, cx: 3, cy: 4,
};
export const analyticRange: Range = {
  scene: [0, 2, 1],
  a: [-3, 3, 0.5], b: [-3, 3, 0.5], c: [-6, 6, 0.5],
  px: [-2, 6, 0.5], py: [-2, 6, 0.5],
  pa: [0.5, 2, 0.5], pb: [0.5, 2, 0.5], pc: [0.5, 2, 0.5], pd: [-12, -1, 0.5],
  qx: [-2, 8, 0.5], qy: [-2, 8, 0.5], qz: [-2, 8, 0.5],
  radius: [1, 8, 0.5], cx: [-8, 8, 0.5], cy: [-8, 8, 0.5],
};

export const shapeInit = { scene: 0, base: 6, tall: 4, len: 3, wid: 4, ht: 5, side: 6, ph: 4, edge: 6 };
export const shapeRange: Range = {
  scene: [0, 3, 1],
  base: [1, 12, 0.5],
  tall: [1, 12, 0.5],
  len: [1, 8, 0.5],
  wid: [1, 8, 0.5],
  ht: [1, 8, 0.5],
  side: [2, 10, 0.5],
  ph: [1, 10, 0.5],
  edge: [2, 10, 0.5],
};

export const comboInit = { scene: 0, n: 5, k: 2, seat: 0, outlier: 6 };
export const comboRange: Range = {
  scene: [0, 2, 1],
  n: [2, 8, 1],
  k: [0, 8, 1],
  seat: [0, 5, 1],
  outlier: [0, 20, 1],
};

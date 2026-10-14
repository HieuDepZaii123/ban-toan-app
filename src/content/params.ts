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

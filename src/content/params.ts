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

export const derivInit = { scene: 0, h: 1, v0: 20, time: 2, brake: 0 };
export const derivRange: Range = {
  scene: [0, 2, 1],
  h: [-1.5, 1.5, 0.05],
  v0: [8, 30, 1],
  time: [0, 10, 0.05],
  brake: [0, 5, 0.1],
};

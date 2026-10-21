import type { Ink } from "./pen.ts";

export type Clip = {
  still: number;
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, u: number, ink: Ink) => void;
};

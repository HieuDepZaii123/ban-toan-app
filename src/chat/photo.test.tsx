import { describe, expect, test } from "vitest";
import { clampCrop, dragCrop, enhancePixels, MIN_CROP } from "./photo.ts";

describe("crop", () => {
  test("dragging a corner keeps the opposite corner fixed", () => {
    const start = { x: 0.2, y: 0.2, w: 0.5, h: 0.5 };
    const out = dragCrop(start, "nw", 0.1, 0.05);
    expect(out.x).toBeCloseTo(0.3);
    expect(out.y).toBeCloseTo(0.25);
    expect(out.x + out.w).toBeCloseTo(0.7);
    expect(out.y + out.h).toBeCloseTo(0.7);
  });

  test("a corner cannot pass the opposite one or leave the image", () => {
    const start = { x: 0.2, y: 0.2, w: 0.5, h: 0.5 };
    const squashed = dragCrop(start, "se", -0.9, -0.9);
    expect(squashed.w).toBeCloseTo(MIN_CROP);
    expect(squashed.h).toBeCloseTo(MIN_CROP);
    const out = dragCrop(start, "se", 5, 5);
    expect(out.x + out.w).toBeCloseTo(1);
    expect(out.y + out.h).toBeCloseTo(1);
  });

  test("moving the box keeps its size and stays inside", () => {
    const out = dragCrop({ x: 0.1, y: 0.1, w: 0.4, h: 0.3 }, "move", 2, -2);
    expect(out).toEqual({ x: 0.6, y: 0, w: 0.4, h: 0.3 });
    expect(clampCrop({ x: -1, y: 0.5, w: 3, h: 0.01 })).toEqual({ x: 0, y: 0.5, w: 1, h: MIN_CROP });
  });
});

describe("Làm rõ chữ", () => {
  /** A width × height RGBA image from a grey level per pixel. */
  function image(width: number, height: number, level: (x: number, y: number) => number): Uint8ClampedArray {
    const data = new Uint8ClampedArray(width * height * 4);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const v = level(x, y);
        data.set([v, v, Math.max(0, v - 15), 255], (y * width + x) * 4);
      }
    }
    return data;
  }
  const at = (data: Uint8ClampedArray, width: number, x: number, y: number) => data.slice((y * width + x) * 4, (y * width + x) * 4 + 4);

  test("paper goes white and ink black on both the lit and the shaded half of a page", () => {
    // 160 × 80: left half lit paper (210), right half in shadow (95); a thin ink stroke on each half.
    const width = 160;
    const height = 80;
    const ink = (x: number, y: number) => y === 40 && (x % 80 > 20 && x % 80 < 60);
    const data = image(width, height, (x, y) => {
      const lit = x < 80;
      if (ink(x, y)) return lit ? 70 : 30;
      return lit ? 210 : 95;
    });
    enhancePixels(data, width, height);
    expect(at(data, width, 10, 10)[0]).toBe(255);   // lit paper
    expect(at(data, width, 150, 10)[0]).toBe(255);  // shaded paper
    expect(at(data, width, 40, 40)[0]).toBe(0);     // ink on lit paper
    expect(at(data, width, 120, 40)[0]).toBe(0);    // ink in the shadow
    const pixel = at(data, width, 10, 10);
    expect([pixel[1], pixel[2], pixel[3]]).toEqual([255, 255, 255]);
  });

  test("a pencil stroke stays visible as grey", () => {
    const width = 64;
    const height = 64;
    const data = image(width, height, (x, y) => (y === 32 && x > 10 && x < 50 ? 150 : 205));
    enhancePixels(data, width, height);
    const pencil = at(data, width, 30, 32)[0] ?? 0;
    expect(pencil).toBeGreaterThan(0);
    expect(pencil).toBeLessThan(200);
  });

  test("an empty image is left alone", () => {
    const data = new Uint8ClampedArray(0);
    enhancePixels(data, 0, 0);
    expect(data.length).toBe(0);
  });
});

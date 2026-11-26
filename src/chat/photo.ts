/** Longest side and JPEG quality steps for a photo of a problem; the server accepts about 1.5 MB. */
const STEPS: readonly { side: number; quality: number }[] = [
  { side: 1600, quality: 0.82 },
  { side: 1280, quality: 0.72 },
  { side: 1024, quality: 0.62 },
];
const MAX_CHARS = 1_900_000;
/** Working copies are capped so cropping, rotating and enhancing stay quick on phones. */
const WORK_SIDE = 2400;

/** A crop as fractions of the image: 0..1 from the top-left corner. */
export type Crop = { x: number; y: number; w: number; h: number };
export const FULL: Crop = { x: 0, y: 0, w: 1, h: 1 };
/** Smallest crop side, as a fraction of the image. */
export const MIN_CROP = 0.08;

/** True when this browser can show a live camera view (needs a secure context: https or localhost). */
export function canUseCamera(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.mediaDevices?.getUserMedia === "function";
}

/** Keep a crop inside the image and no smaller than MIN_CROP on either side. */
export function clampCrop(crop: Crop): Crop {
  const w = Math.min(1, Math.max(MIN_CROP, crop.w));
  const h = Math.min(1, Math.max(MIN_CROP, crop.h));
  const x = Math.min(1 - w, Math.max(0, crop.x));
  const y = Math.min(1 - h, Math.max(0, crop.y));
  return { x, y, w, h };
}

/** Which corner of the crop is being dragged, or the whole box. */
export type Grip = "nw" | "ne" | "sw" | "se" | "move";

/** The crop after dragging `grip` by (dx, dy), both fractions of the image. The opposite corner stays put. */
export function dragCrop(start: Crop, grip: Grip, dx: number, dy: number): Crop {
  if (grip === "move") return clampCrop({ ...start, x: start.x + dx, y: start.y + dy });
  let left = start.x;
  let top = start.y;
  let right = start.x + start.w;
  let bottom = start.y + start.h;
  if (grip === "nw" || grip === "sw") left = Math.min(right - MIN_CROP, Math.max(0, left + dx));
  if (grip === "ne" || grip === "se") right = Math.max(left + MIN_CROP, Math.min(1, right + dx));
  if (grip === "nw" || grip === "ne") top = Math.min(bottom - MIN_CROP, Math.max(0, top + dy));
  if (grip === "sw" || grip === "se") bottom = Math.max(top + MIN_CROP, Math.min(1, bottom + dy));
  return { x: left, y: top, w: right - left, h: bottom - top };
}

/** Brightness at a share (0..1) of a 256-bin histogram holding `count` pixels. */
function percentile(hist: Uint32Array, count: number, share: number): number {
  const target = count * share;
  let seen = 0;
  for (let v = 0; v < 256; v++) {
    seen += hist[v] ?? 0;
    if (seen >= target) return v;
  }
  return 255;
}

/**
 * "Làm rõ chữ": turn a photo of paper into a clean black-on-white scan, in place (RGBA pixels).
 * Shadows from a hand or phone make one global threshold fail, so the paper's brightness is estimated per
 * block (a bright percentile, so ink doesn't count), smoothed between blocks, and each pixel is judged
 * against the paper around it: paper goes white wherever it is, ink goes black, pencil stays a visible grey.
 */
export function enhancePixels(data: Uint8ClampedArray, width: number, height: number): void {
  const count = width * height;
  if (count === 0 || data.length < count * 4) return;
  const grey = new Uint8Array(count);
  for (let i = 0; i < count; i++) {
    const p = i * 4;
    grey[i] = Math.round(0.299 * (data[p] ?? 0) + 0.587 * (data[p + 1] ?? 0) + 0.114 * (data[p + 2] ?? 0));
  }

  // Paper brightness per block: the 90th percentile of the block.
  const size = Math.max(8, Math.round(Math.max(width, height) / 20));
  const cols = Math.ceil(width / size);
  const rows = Math.ceil(height / size);
  const paper = new Float32Array(cols * rows);
  const hist = new Uint32Array(256);
  for (let by = 0; by < rows; by++) {
    for (let bx = 0; bx < cols; bx++) {
      hist.fill(0);
      const x1 = Math.min(width, (bx + 1) * size);
      const y1 = Math.min(height, (by + 1) * size);
      let n = 0;
      for (let y = by * size; y < y1; y++) {
        for (let x = bx * size; x < x1; x++) {
          const v = grey[y * width + x] ?? 0;
          hist[v] = (hist[v] ?? 0) + 1;
          n++;
        }
      }
      paper[by * cols + bx] = Math.max(16, percentile(hist, n, 0.9));
    }
  }

  // Smooth between block centres, then map "how much darker than the paper here" to ink.
  const at = (bx: number, by: number): number =>
    paper[Math.min(rows - 1, Math.max(0, by)) * cols + Math.min(cols - 1, Math.max(0, bx))] ?? 255;
  const INK = 0.55;
  const PAPER = 0.9;
  for (let y = 0; y < height; y++) {
    const gy = (y + 0.5) / size - 0.5;
    const y0 = Math.floor(gy);
    const fy = gy - y0;
    for (let x = 0; x < width; x++) {
      const gx = (x + 0.5) / size - 0.5;
      const x0 = Math.floor(gx);
      const fx = gx - x0;
      const top = at(x0, y0) * (1 - fx) + at(x0 + 1, y0) * fx;
      const bottom = at(x0, y0 + 1) * (1 - fx) + at(x0 + 1, y0 + 1) * fx;
      const background = top * (1 - fy) + bottom * fy;
      const i = y * width + x;
      const ratio = (grey[i] ?? 0) / background;
      const level = Math.min(1, Math.max(0, (ratio - INK) / (PAPER - INK)));
      // A gentle curve keeps thin pencil strokes visible while the paper goes white.
      const out = Math.round(255 * Math.pow(level, 1.4));
      const p = i * 4;
      data[p] = out;
      data[p + 1] = out;
      data[p + 2] = out;
    }
  }
}

function canvasOf(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  return canvas;
}

/** Draw any image source onto a new canvas no larger than `side` on its longest edge, on white. */
export function toCanvas(source: CanvasImageSource, width: number, height: number, side = WORK_SIDE): HTMLCanvasElement | null {
  const scale = Math.min(1, side / Math.max(width, height));
  const canvas = canvasOf(width * scale, height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas;
}

/** A chosen, pasted or dropped picture as a working canvas, or null if it is not a readable image. */
export async function fileToCanvas(file: Blob): Promise<HTMLCanvasElement | null> {
  if (!file.type.startsWith("image/")) return null;
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return null;
  }
  try {
    return toCanvas(bitmap, bitmap.width, bitmap.height);
  } finally {
    bitmap.close();
  }
}

/** The canvas turned a quarter turn clockwise (1) or anticlockwise (-1). */
export function rotateCanvas(source: HTMLCanvasElement, turn: 1 | -1): HTMLCanvasElement {
  const canvas = canvasOf(source.height, source.width);
  const ctx = canvas.getContext("2d");
  if (!ctx) return source;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((turn * Math.PI) / 2);
  ctx.drawImage(source, -source.width / 2, -source.height / 2);
  return canvas;
}

/** The cropped part of `source`, at most `side` px on its longest edge, enhanced if asked. */
export function renderCrop(source: HTMLCanvasElement, crop: Crop, enhance: boolean, side: number): HTMLCanvasElement | null {
  const sx = crop.x * source.width;
  const sy = crop.y * source.height;
  const sw = Math.max(1, crop.w * source.width);
  const sh = Math.max(1, crop.h * source.height);
  const scale = Math.min(1, side / Math.max(sw, sh));
  const canvas = canvasOf(sw * scale, sh * scale);
  const ctx = canvas.getContext("2d", { willReadFrequently: enhance });
  if (!ctx) return null;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(source, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  if (enhance) {
    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
    enhancePixels(image.data, canvas.width, canvas.height);
    ctx.putImageData(image, 0, 0);
  }
  return canvas;
}

/** The crop as a JPEG data URL small enough for the server, or null if it can't be made small enough. */
export function exportPhoto(source: HTMLCanvasElement, crop: Crop, enhance: boolean): string | null {
  for (const step of STEPS) {
    const canvas = renderCrop(source, crop, enhance, step.side);
    if (!canvas) return null;
    const url = canvas.toDataURL("image/jpeg", step.quality);
    if (url.length <= MAX_CHARS) return url;
  }
  return null;
}

/** A small JPEG of a sent photo, for the chat log. */
export function thumbnail(dataUrl: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = toCanvas(img, img.naturalWidth, img.naturalHeight, 360);
      resolve(canvas ? canvas.toDataURL("image/jpeg", 0.7) : null);
    };
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
}

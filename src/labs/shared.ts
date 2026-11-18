import type { Range } from "../content/params.ts";
import { snap } from "../lib/format.ts";
import type { Params } from "./history.ts";

/** `scene:1,a:-2,b:0.5`: the whole lab state in a share link. */
export function encodeParams(p: Params): string {
  return Object.keys(p).sort().map((k) => `${k}:${Math.round((p[k] ?? 0) * 1e6) / 1e6}`).join(",");
}

/** The one gate for lab settings from outside (share link, saved setups): known keys, finite numbers, snapped into range. Null when nothing is usable. */
export function sanitizeParams(raw: unknown, init: Params, range: Range): Params | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const out: Params = { ...init };
  let used = 0;
  for (const key of Object.keys(init)) {
    const value = (raw as Record<string, unknown>)[key];
    const r = range[key];
    if (typeof value !== "number" || !Number.isFinite(value) || !r) continue;
    out[key] = snap(value, r[2], r[0], r[1]);
    used += 1;
  }
  return used > 0 ? out : null;
}

/** Only known keys with finite numbers survive; values are snapped into the slider range. Null when nothing is usable. */
export function decodeParams(text: string, init: Params, range: Range): Params | null {
  const raw: Record<string, number> = {};
  for (const part of text.slice(0, 600).split(",")) {
    const [key, value] = part.split(":");
    if (!key || value === undefined || !Object.prototype.hasOwnProperty.call(init, key)) continue;
    raw[key] = Number(value);
  }
  return sanitizeParams(raw, init, range);
}

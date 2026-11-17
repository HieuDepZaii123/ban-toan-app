import type { Range } from "../content/params.ts";
import { snap } from "../lib/format.ts";
import type { Params } from "./history.ts";

/** `scene:1,a:-2,b:0.5`: the whole lab state in a share link. */
export function encodeParams(p: Params): string {
  return Object.keys(p).sort().map((k) => `${k}:${Math.round((p[k] ?? 0) * 1e6) / 1e6}`).join(",");
}

/** Only known keys with finite numbers survive; values are snapped into the slider range. Null when nothing is usable. */
export function decodeParams(text: string, init: Params, range: Range): Params | null {
  const out: Params = { ...init };
  let used = 0;
  for (const part of text.slice(0, 600).split(",")) {
    const [key, raw] = part.split(":");
    if (!key || raw === undefined || !Object.prototype.hasOwnProperty.call(init, key)) continue;
    const value = Number(raw);
    const r = range[key];
    if (!Number.isFinite(value) || !r) continue;
    out[key] = snap(value, r[2], r[0], r[1]);
    used += 1;
  }
  return used > 0 ? out : null;
}

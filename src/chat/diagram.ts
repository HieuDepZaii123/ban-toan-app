/** Keep a drawing fence, and drop script or event handlers from SVG. */

const BLOCK = /```(mermaid|svg|text)\s*\n([\s\S]*?)```/gi;

export type DiagramBlock =
  | { kind: "prose"; text: string }
  | { kind: "mermaid" | "svg" | "ascii"; text: string };

export function diagramBlocks(text: string): DiagramBlock[] {
  const out: DiagramBlock[] = [];
  let cursor = 0;
  for (const match of text.matchAll(BLOCK)) {
    const start = match.index ?? 0;
    if (start > cursor) out.push({ kind: "prose", text: text.slice(cursor, start) });
    const lang = (match[1] ?? "").toLowerCase();
    const body = (match[2] ?? "").replace(/\s+$/, "");
    const kind = lang === "mermaid" ? "mermaid" : lang === "svg" ? "svg" : "ascii";
    out.push({ kind, text: body });
    cursor = start + match[0].length;
  }
  if (cursor < text.length) out.push({ kind: "prose", text: text.slice(cursor) });
  return out;
}

/*
 * Allowlist sanitizer: only known SVG drawing elements and attributes survive.
 * Everything else is dropped (with its content for script-like elements), text is
 * re-escaped, and attribute values that could load or run anything are refused.
 */
const KEEP = new Set([
  "svg", "g", "path", "rect", "circle", "ellipse", "line", "polyline", "polygon",
  "text", "tspan", "defs", "marker", "title", "desc", "lineargradient", "radialgradient",
  "stop", "clippath", "style",
]);
// Dropped together with everything inside them.
const SKIP = new Set(["script", "foreignobject", "iframe", "object", "embed", "animate", "animatemotion", "animatetransform", "set", "image", "use", "a", "form", "input", "button", "textarea", "video", "audio", "math"]);
const ATTRS = new Set([
  "x", "y", "x1", "y1", "x2", "y2", "cx", "cy", "r", "rx", "ry", "dx", "dy", "width", "height", "d", "points",
  "viewbox", "preserveaspectratio", "xmlns", "fill", "fill-opacity", "fill-rule", "stroke", "stroke-width",
  "stroke-dasharray", "stroke-linecap", "stroke-linejoin", "stroke-opacity", "opacity", "transform",
  "font-size", "font-family", "font-weight", "font-style", "text-anchor", "dominant-baseline", "alignment-baseline",
  "id", "class", "style", "marker-start", "marker-mid", "marker-end", "refx", "refy", "markerwidth", "markerheight",
  "markerunits", "orient", "offset", "stop-color", "stop-opacity", "gradientunits", "gradienttransform",
  "clip-path", "clippathunits", "role", "aria-label", "aria-hidden", "aria-roledescription", "visibility",
]);
const TAG = /<(\/?)([a-zA-Z][\w:-]*)((?:\s+[^\s=>/"']+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>"']+))?)*)\s*(\/?)>/y;
const ATTR = /([^\s=>/"']+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s>"']+))?/g;

function decode(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);?/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);?/g, (_, dec: string) => String.fromCodePoint(Number(dec)))
    .replace(/&(colon|lpar|rpar|tab|newline);/gi, (_, n: string) => ({ colon: ":", lpar: "(", rpar: ")", tab: "\t", newline: "\n" })[n.toLowerCase()] ?? "")
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}

const escapeText = (text: string) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeAttr = (text: string) => escapeText(text).replace(/"/g, "&quot;");

/** CSS may only reference same-document ids; no imports, no external urls, no script hooks. */
function unsafeCss(css: string): boolean {
  const flat = css.replace(/\\/g, "").replace(/\/\*[\s\S]*?\*\//g, "").toLowerCase();
  if (/@import|expression\s*\(|behavior\s*:|-moz-binding|javascript:/.test(flat)) return true;
  for (const m of flat.matchAll(/url\s*\(\s*(['"]?)\s*([^'")]*)/g)) if (!(m[2] ?? "").startsWith("#")) return true;
  return false;
}

function cleanAttrs(raw: string): string {
  let out = "";
  for (const m of raw.matchAll(ATTR)) {
    const name = (m[1] ?? "").toLowerCase();
    if (!ATTRS.has(name)) continue;
    let value = m[2] ?? "";
    if (/^["']/.test(value)) value = value.slice(1, -1);
    value = decode(value);
    const flat = value.replace(/[\s\u0000-\u001f]/g, "").toLowerCase();
    if (/javascript:|vbscript:|data:/.test(flat)) continue;
    if (unsafeCss(value)) continue;
    out += ` ${name === "viewbox" ? "viewBox" : name === "preserveaspectratio" ? "preserveAspectRatio" : name}="${escapeAttr(value)}"`;
  }
  return out;
}

export function sanitizeSvg(raw: string): string {
  const start = raw.search(/<svg\b/i);
  const end = raw.toLowerCase().lastIndexOf("</svg>");
  if (start < 0 || end < start) return "";
  const src = raw.slice(start, end + "</svg>".length);
  let out = "";
  let skipping: string | null = null;
  let skipDepth = 0;
  let i = 0;
  while (i < src.length) {
    const lt = src.indexOf("<", i);
    const textEnd = lt < 0 ? src.length : lt;
    if (textEnd > i && !skipping) out += escapeText(decode(src.slice(i, textEnd)));
    if (lt < 0) break;
    // Comments, CDATA, doctype and processing instructions are dropped.
    const special = /^<!--[\s\S]*?-->|^<!\[CDATA\[[\s\S]*?\]\]>|^<![^>]*>|^<\?[\s\S]*?\?>/.exec(src.slice(lt));
    if (special) { i = lt + special[0].length; continue; }
    TAG.lastIndex = lt;
    const tag = TAG.exec(src);
    if (!tag) {
      if (!skipping) out += "&lt;";
      i = lt + 1;
      continue;
    }
    i = TAG.lastIndex;
    const closing = tag[1] === "/";
    const name = (tag[2] ?? "").toLowerCase();
    const selfClosing = tag[4] === "/";
    if (skipping) {
      if (name === skipping) {
        if (closing) skipDepth -= 1;
        else if (!selfClosing) skipDepth += 1;
        if (skipDepth === 0) skipping = null;
      }
      continue;
    }
    if (SKIP.has(name) || name.includes(":")) {
      if (!closing && !selfClosing) { skipping = name; skipDepth = 1; }
      continue;
    }
    if (!KEEP.has(name)) continue;
    const element = name === "lineargradient" ? "linearGradient" : name === "radialgradient" ? "radialGradient" : name === "clippath" ? "clipPath" : name;
    if (closing) out += `</${element}>`;
    else out += `<${element}${cleanAttrs(tag[3] ?? "")}${selfClosing ? "/>" : ">"}`;
  }
  if (name0(out) !== "svg") return "";
  // A <style> body is text: drop it entirely if the CSS is unsafe.
  out = out.replace(/<style[^>]*>([\s\S]*?)<\/style>/g, (block, css: string) => (unsafeCss(decode(css)) ? "" : block));
  return out;
}

function name0(svg: string): string {
  return /^<([a-zA-Z]+)/.exec(svg)?.[1]?.toLowerCase() ?? "";
}

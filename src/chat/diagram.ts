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

const DROPPED = /<\s*(script|iframe|object|embed)\b[\s\S]*?<\s*\/\s*\1\s*>|<\s*(script|iframe|object|embed)\b[^>]*\/?\s*>/gi;

export function sanitizeSvg(raw: string): string {
  const start = raw.search(/<svg\b/i);
  const end = raw.toLowerCase().lastIndexOf("</svg>");
  if (start < 0 || end < start) return "";
  let svg = raw.slice(start, end + "</svg>".length);
  svg = svg.replace(DROPPED, "");
  svg = svg.replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  svg = svg.replace(/\s(?:href|xlink:href)\s*=\s*(['"])\s*javascript:[^'"]*\1/gi, "");
  return /^<svg\b/i.test(svg) ? svg : "";
}

/**
 * The chat renders one line at a time and only `$...$` as math (src/chat/ChatText.tsx).
 * Models often write `\(...\)`, `\[...\]` or `$$...$$` across several lines instead.
 * Rewrite those to single-line `$...$`, leaving fenced diagram blocks untouched.
 */
const DISPLAY = /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)/g;

function inline(tex: string): string {
  return `$${tex.replace(/\s+/g, " ").trim()}$`;
}

export function normalizeMath(text: string): string {
  return text
    .split(/(```[\s\S]*?```)/g)
    .map((part) => (part.startsWith("```") ? part : part.replace(DISPLAY, (_all, a?: string, b?: string, c?: string) => inline(a ?? b ?? c ?? ""))))
    .join("");
}

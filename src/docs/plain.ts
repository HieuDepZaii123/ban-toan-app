import { parseDoc, type Inline } from "./model.ts";

const SYMBOLS: Record<string, string> = {
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  theta: "θ",
  lambda: "λ",
  mu: "μ",
  pi: "π",
  sigma: "σ",
  omega: "ω",
  Delta: "Δ",
  Omega: "Ω",
  times: "×",
  cdot: "·",
  pm: "±",
  mp: "∓",
  le: "≤",
  ge: "≥",
  leq: "≤",
  geq: "≥",
  neq: "≠",
  ne: "≠",
  approx: "≈",
  infty: "∞",
  sum: "∑",
  int: "∫",
  to: "→",
  rightarrow: "→",
  leftarrow: "←",
  ldots: "…",
  dots: "…",
  cdots: "⋯",
  quad: " ",
  qquad: " ",
};

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const SUB = "₀₁₂₃₄₅₆₇₈₉";

function scriptChar(ch: string, table: string, extras: Record<string, string>): { ok: boolean; ch: string } {
  const digit = "0123456789".indexOf(ch);
  if (digit >= 0) return { ok: true, ch: table[digit] ?? ch };
  const extra = extras[ch];
  if (extra) return { ok: true, ch: extra };
  return { ok: false, ch };
}

function applyScript(source: string, mark: "^" | "_"): string {
  const table = mark === "^" ? SUP : SUB;
  const superscripts: Record<string, string> = { "+": "⁺", "-": "⁻", n: "ⁿ", i: "ⁱ" };
  const subscripts: Record<string, string> = { "+": "₊", "-": "₋" };
  const extras = mark === "^" ? superscripts : subscripts;
  const pattern = mark === "^" ? /\^\{([^{}]+)\}|\^([0-9A-Za-z])/ : /_\{([^{}]+)\}|_([0-9A-Za-z])/;
  let current = source;
  while (true) {
    const next = current.replace(pattern, (_full, braced: string | undefined, single: string | undefined) => {
      const value = braced ?? single ?? "";
      const mapped = [...value].map((ch) => scriptChar(ch, table, extras));
      if (mapped.every((item) => item.ok)) return mapped.map((item) => item.ch).join("");
      return mark === "^" ? `^(${value})` : `_(${value})`;
    });
    if (next === current) return current;
    current = next;
  }
}

/** Công thức TeX viết lại thành chữ đọc được khi có ký tự tương ứng. */
export function texToPlain(tex: string): string {
  let current = tex.trim();
  while (true) {
    const next = current
      .replace(/\\d?frac\{([^{}]*)\}\{([^{}]*)\}/, "($1)/($2)")
      .replace(/\\sqrt\{([^{}]*)\}/, "√($1)");
    if (next === current) break;
    current = next;
  }
  current = current.replace(/\\(left|right|mathrm|text|displaystyle|bigl|bigr|bigl|bigr)/g, "");
  current = current.replace(/\\([A-Za-z]+)/g, (_full, name: string) => SYMBOLS[name] ?? name);
  current = applyScript(current, "^");
  current = applyScript(current, "_");
  current = current.replace(/[{}]/g, "");
  return current.replace(/[ \t]+/g, " ").trim();
}

export function inlinesToPlain(inlines: readonly Inline[]): string {
  return inlines.map((part) => part.kind === "math" ? texToPlain(part.tex) : part.text).join("");
}

/** Bản chữ thường UTF-8 của tài liệu, giữ tiêu đề, danh sách và công thức. */
export function docToPlain(source: string): string {
  const chunks: string[] = [];
  for (const block of parseDoc(source)) {
    if (block.kind === "h" || block.kind === "p") {
      const lines = block.kind === "h" ? [block.inlines] : block.lines;
      chunks.push(lines.map((line) => inlinesToPlain(line)).join("\n"));
    } else if (block.kind === "ul") {
      chunks.push(block.items.map((item) => `• ${inlinesToPlain(item)}`).join("\n"));
    } else {
      chunks.push(block.items.map((item, index) => `${index + 1}. ${inlinesToPlain(item)}`).join("\n"));
    }
  }
  return chunks.join("\n\n");
}

export function docToTxt(source: string): Uint8Array {
  return new TextEncoder().encode(docToPlain(source));
}

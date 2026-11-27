import katex from "katex";
import { useMemo } from "react";
import "katex/dist/katex.min.css";

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Punctuation that must stay on the same line as the formula before it ("$x > 0$, ..."). */
const STICKY = /^[,.;:)!?…]/;

function renderMixed(text: string): string {
  const parts = text.split(/(\$[^$]+\$)/g);
  let html = "";
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i] ?? "";
    if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
      const math = katex.renderToString(part.slice(1, -1), { throwOnError: false, output: "htmlAndMathml" });
      const next = parts[i + 1] ?? "";
      // A word joiner (U+2060) forbids only the break between the formula and its punctuation;
      // the formula keeps its own break points, so long formulas still wrap on phones.
      html += STICKY.test(next) ? `${math}\u2060` : math;
    } else {
      html += escapeHtml(part);
    }
  }
  return html;
}

export function MathText({ text }: { text: string }) {
  const html = useMemo(() => renderMixed(text), [text]);
  return <span className="mathline" dangerouslySetInnerHTML={{ __html: html }} />;
}

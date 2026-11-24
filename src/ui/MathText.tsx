import katex from "katex";
import { useMemo } from "react";
import "katex/dist/katex.min.css";
import { plotFromToken } from "../lib/plotSvg.ts";

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderMixed(text: string): string {
  return text
    .split(/(\{\{plotr?:[^}]+\}\}|\$[^$]+\$)/g)
    .map((part) => {
      const plot = part.match(/^\{\{(plotr?):([^}]+)\}\}$/);
      if (plot) return plotFromToken(plot[1] as "plot" | "plotr", plot[2] ?? "") ?? "";
      if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
        return katex.renderToString(part.slice(1, -1), { throwOnError: false, output: "htmlAndMathml" });
      }
      return escapeHtml(part);
    })
    .join("");
}

export function MathText({ text }: { text: string }) {
  const html = useMemo(() => renderMixed(text), [text]);
  return <span className="mathline" dangerouslySetInnerHTML={{ __html: html }} />;
}

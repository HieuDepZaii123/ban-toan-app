import katex from "katex";
import { parseDoc, type Inline } from "./model.ts";

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderInlines(inlines: readonly Inline[]): string {
  return inlines.map((part) => {
    if (part.kind === "math") return katex.renderToString(part.tex, { throwOnError: false, displayMode: part.display, output: "htmlAndMathml" });
    const text = escapeHtml(part.text);
    if (part.kind === "bold") return `<strong>${text}</strong>`;
    if (part.kind === "italic") return `<em>${text}</em>`;
    return text;
  }).join("");
}

/** Xem trước bản soạn: tiêu đề, danh sách, đậm, nghiêng, và KaTeX. */
export function renderDoc(source: string): string {
  return parseDoc(source).map((block) => {
    if (block.kind === "h") return `<h${block.level}>${renderInlines(block.inlines)}</h${block.level}>`;
    if (block.kind === "ul") return `<ul>${block.items.map((item) => `<li>${renderInlines(item)}</li>`).join("")}</ul>`;
    if (block.kind === "ol") return `<ol>${block.items.map((item) => `<li>${renderInlines(item)}</li>`).join("")}</ol>`;
    return `<p>${block.lines.map((line) => renderInlines(line)).join("<br>")}</p>`;
  }).join("");
}

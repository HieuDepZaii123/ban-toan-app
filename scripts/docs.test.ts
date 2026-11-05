/**
 * Mẫu soạn tài liệu: đúng khối lớp, công thức KaTeX đọc được.
 * Run with: tsx scripts/docs.test.ts
 */
import assert from "node:assert/strict";
import katex from "katex";
import { docSamples } from "../src/docs/samples.ts";
import { renderDoc } from "../src/docs/render.ts";
import { MENU_LINKS } from "../src/ui/navLinks.ts";

const MARK = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;

assert.ok(docSamples.length >= 10, "ít nhất 10 mẫu");
assert.ok(docSamples.some((item) => item.band === "tieu-hoc"));
assert.ok(docSamples.some((item) => item.band === "thcs"));
assert.ok(docSamples.some((item) => item.band === "thpt"));
assert.equal(new Set(docSamples.map((item) => item.id)).size, docSamples.length);
assert.ok(MENU_LINKS.some((item) => item.href === "/soan-tai-lieu" && item.label === "Soạn tài liệu"));

for (const sample of docSamples) {
  assert.match(sample.title, MARK, sample.id);
  assert.ok(sample.body.includes("$"), `${sample.id} có công thức`);
  for (const tex of sample.body.match(/\$\$[\s\S]+?\$\$|\$[^$\n]+\$/g) ?? []) {
    const inner = tex.startsWith("$$") ? tex.slice(2, -2) : tex.slice(1, -1);
    katex.renderToString(inner, { throwOnError: true, displayMode: tex.startsWith("$$") });
  }
}

const html = renderDoc("# Tiêu đề\n\nMột câu **đậm** và *nghiêng*.\n\n$$\\frac{1}{2}+\\frac{1}{4}=\\frac{3}{4}$$");
assert.match(html, /<h1>Tiêu đề<\/h1>/);
assert.match(html, /<strong>đậm<\/strong>/);
assert.match(html, /<em>nghiêng<\/em>/);
assert.match(html, /katex/);

const quad = docSamples.find((item) => item.id === "de-ham-bac-hai");
assert.ok(quad?.body.includes("x=2") && quad.body.includes("169") === false);
assert.ok(docSamples.find((item) => item.id === "giao-an-hang-dang-thuc-lop8")?.body.includes("169"));
assert.ok(docSamples.find((item) => item.id === "phieu-nhan-lop3")?.body.includes("92"));
assert.ok(docSamples.find((item) => item.id === "phieu-xac-suat")?.body.includes("11"));

console.log(`docs ok (${docSamples.length} mẫu)`);

/**
 * Xuất PDF, TXT, DOCX và bản nháp chỉ xóa đúng một khóa.
 * Run with: tsx scripts/docs-export.test.ts
 */
import assert from "node:assert/strict";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";

GlobalWorkerOptions.workerSrc = new URL("../node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs", import.meta.url).href;
import { PDFDocument } from "pdf-lib";
import { clearDocDraft, DOC_DRAFT_KEY, readDocDraft, writeDocDraft, type DraftStore } from "../src/docs/draft.ts";
import { docToDocx } from "../src/docs/docx.ts";
import { buildPdf, type PdfFaces } from "../src/docs/pdf.ts";
import { docToPlain, docToTxt, texToPlain } from "../src/docs/plain.ts";
import { readStoredZip } from "../src/docs/zip.ts";

const SENTENCE = "Học sinh lớp mười giải phương trình bậc hai và diện tích hình tròn.";
const source = `# Phiếu ôn tập

${SENTENCE}

## Việc cần làm

Một câu **đậm** và *nghiêng*.

- Đọc kỹ đề bài có dấu: ắ ề ỗ ự ỹ.
- Giữ công thức $a^2+b^2=c^2$.

1. Tính $\\frac{1}{2}+\\frac{1}{4}$.
2. Kết quả là $\\frac{3}{4}$.

$$\\frac{1}{2}+\\frac{1}{4}=\\frac{3}{4}$$

${Array.from({ length: 36 }, () => SENTENCE).join("\n\n")}
`;

assert.equal(texToPlain("a^2+b^2=c^2"), "a²+b²=c²");
assert.equal(texToPlain(String.raw`\frac{1}{2}+\frac{1}{4}`), "(1)/(2)+(1)/(4)");
const plain = docToPlain(source);
assert.match(plain, /Học sinh lớp mười/);
assert.match(plain, /a²\+b²=c²/);
assert.match(plain, /• Đọc kỹ đề bài có dấu: ắ ề ỗ ự ỹ\./);
assert.match(plain, /\(1\)\/\(2\)\+\(1\)\/\(4\)=\(3\)\/\(4\)/);

const txt = docToTxt(source);
assert.equal(new TextDecoder("utf-8", { fatal: true }).decode(txt), plain);
assert.equal(docToTxt("").byteLength, 0);

const docx = docToDocx(source);
assert.equal(String.fromCharCode(docx[0] ?? 0, docx[1] ?? 0), "PK");
const packed = readStoredZip(docx);
for (const name of ["[Content_Types].xml", "_rels/.rels", "word/document.xml", "word/styles.xml", "word/numbering.xml"]) {
  assert.ok(packed.has(name), name);
}
const types = new TextDecoder().decode(packed.get("[Content_Types].xml"));
assert.match(types, /application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document\.main\+xml/);
const xml = new TextDecoder("utf-8", { fatal: true }).decode(packed.get("word/document.xml"));
assert.match(xml, /<w:document/);
assert.match(xml, /Học sinh lớp mười giải phương trình bậc hai/);
assert.match(xml, /<w:pStyle w:val="Heading1"\/>/);
assert.match(xml, /<w:b\/>/);
assert.match(xml, /<w:i\/>/);
assert.match(xml, /<w:numId w:val="1"\/>/);
assert.match(xml, /<w:numId w:val="2"\/>/);
assert.match(xml, /a²\+b²=c²/);
const emptyXml = new TextDecoder().decode(readStoredZip(docToDocx("")).get("word/document.xml"));
assert.match(emptyXml, /<w:document/);
assert.equal(emptyXml.includes(SENTENCE), false);

function bytes(name: string): Uint8Array {
  const file = readFileSync(new URL(`../src/docs/fonts/${name}`, import.meta.url));
  return new Uint8Array(file.buffer, file.byteOffset, file.byteLength);
}

const faces: PdfFaces = {
  regular: bytes("Sans-Regular.ttf"),
  bold: bytes("Sans-Bold.ttf"),
  italic: bytes("Sans-Italic.ttf"),
};
const pdfBytes = await buildPdf(source, faces);
const pdfCopy = new Uint8Array(pdfBytes);
const emptyPdf = await buildPdf("", faces);
const emptyCopy = new Uint8Array(emptyPdf);
assert.match(new TextDecoder().decode(pdfCopy.subarray(0, 8)), /^%PDF-/);
const opened = await PDFDocument.load(pdfCopy);
assert.ok(opened.getPageCount() >= 2, `pages ${opened.getPageCount()}`);
assert.equal((await PDFDocument.load(emptyCopy)).getPageCount(), 1);

const artifacts = "/opt/cursor/artifacts";
mkdirSync(artifacts, { recursive: true });
writeFileSync(`${artifacts}/soan-vi-du.txt`, txt);
writeFileSync(`${artifacts}/soan-vi-du.docx`, docx);
writeFileSync(`${artifacts}/soan-vi-du.pdf`, pdfCopy);
writeFileSync(`${artifacts}/soan-trong.txt`, docToTxt(""));
writeFileSync(`${artifacts}/soan-trong.docx`, docToDocx(""));
writeFileSync(`${artifacts}/soan-trong.pdf`, emptyCopy);

const task = getDocument({ data: new Uint8Array(pdfCopy) });
const parsed = await task.promise;
let extracted = "";
for (let page = 1; page <= parsed.numPages; page += 1) {
  const content = await (await parsed.getPage(page)).getTextContent();
  extracted += content.items.map((item) => "str" in item ? item.str : "").join(" ");
  extracted += "\n";
}
assert.match(extracted, /Học sinh lớp mười/);
assert.match(extracted, /a²\+b²=c²|a2\+b2=c2/);
assert.match(extracted, /ắ|ề|ỗ/);
const emptyTask = getDocument({ data: new Uint8Array(emptyCopy) });
const emptyParsed = await emptyTask.promise;
const emptyText = (await (await emptyParsed.getPage(1)).getTextContent()).items.map((item) => "str" in item ? item.str : "").join("");
assert.equal(emptyText.trim(), "");

const memory = new Map<string, string>();
const store: DraftStore = {
  getItem: (key) => memory.get(key) ?? null,
  setItem: (key, value) => { memory.set(key, value); },
  removeItem: (key) => { memory.delete(key); },
};
writeDocDraft("Xin chào các bạn học sinh.", store);
store.setItem("bt-study-player", "volume-30");
store.setItem("ban-toan-lop-practice-v1", "keep-practice");
assert.equal(readDocDraft(store), "Xin chào các bạn học sinh.");
assert.equal(JSON.parse(store.getItem(DOC_DRAFT_KEY) || "{}").text, "Xin chào các bạn học sinh.");
clearDocDraft(store);
assert.equal(readDocDraft(store), "");
assert.equal(store.getItem(DOC_DRAFT_KEY), null);
assert.equal(store.getItem("bt-study-player"), "volume-30");
assert.equal(store.getItem("ban-toan-lop-practice-v1"), "keep-practice");
store.setItem(DOC_DRAFT_KEY, "{");
assert.equal(readDocDraft(store), "");

console.log(`docs export ok (${opened.getPageCount()} pdf pages)`);

/**
 * Phương pháp giải: cấu trúc, KaTeX, và đáp số qua sympy.
 * Run with: tsx scripts/methods.test.ts
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import katex from "katex";
import { cards } from "../src/content/cards.ts";
import { methodsData } from "../src/methods/catalog.ts";

const MARK = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const IDS = new Set<string>(cards.map((card) => card.id));
const methodIds = new Set(methodsData.methods.map((item) => item.id));

assert.ok(methodsData.methods.length >= 22);
for (let grade = 1; grade <= 8; grade += 1) {
  assert.ok(methodsData.methods.some((item) => item.grade === grade), `thiếu phương pháp cho lớp ${grade}`);
}
assert.equal(methodIds.size, methodsData.methods.length);
assert.ok(methodsData.guide.length >= methodsData.methods.length);

for (const row of methodsData.guide) {
  assert.ok(methodIds.has(row.methodId), row.methodId);
  const topic = row.topicHref.match(/^\/t\/([^/]+)$/);
  const gradePage = row.topicHref.match(/^\/kien-thuc\/(\d{1,2})\/dang$/);
  assert.ok((topic && IDS.has(topic[1] ?? "")) || (gradePage && Number(gradePage[1]) >= 1 && Number(gradePage[1]) <= 12), row.topicHref);
}

for (const method of methodsData.methods) {
  assert.ok(method.examples.length >= 2, method.id);
  assert.ok(method.practice.length >= 2, method.id);
  assert.ok(method.spot.length >= 2 && method.thinking.length >= 2 && method.care.length >= 2, method.id);
  assert.match([method.title, ...method.spot, ...method.thinking].join(" "), MARK, method.id);
  const blob = [
    method.title,
    ...method.spot,
    ...method.thinking,
    ...method.care,
    ...method.formulas,
    ...method.examples.flatMap((item) => [item.prompt, item.result, ...item.steps]),
    ...method.practice.flatMap((item) => [item.prompt, item.answer, ...item.steps]),
    ...method.mistakes,
  ].join(" ");
  for (const tex of blob.match(/\$[^$]+\$/g) ?? []) {
    katex.renderToString(tex.slice(1, -1), { throwOnError: true });
  }
  for (const link of method.links) {
    const topic = link.href.match(/^\/t\/([^/]+)$/);
    const self = link.href.match(/^\/phuong-phap\/([^/]+)$/);
    const grade = link.href.match(/^\/kien-thuc\/(\d{1,2})(\/dang)?$/);
    assert.ok((topic && IDS.has(topic[1] ?? "")) || (self && methodIds.has(self[1] ?? "")) || grade, link.href);
  }
  assert.ok(method.verify.length >= method.examples.length, method.id);
}

assert.ok(methodsData.methods.some((item) => item.id === "luong-giac" && item.care.some((line) => line.includes("\\cos\\theta\\ge 0"))));
assert.ok(methodsData.methods.some((item) => item.id === "doi-bien" && item.formulas.some((line) => line.includes("g(a)"))));
assert.ok(methodsData.methods.some((item) => item.id === "tung-phan" && item.formulas.some((line) => line.includes("uv"))));

execFileSync("python3", ["scripts/methods_sympy.py", "src/methods/methods.json"], { stdio: "inherit" });
console.log("methods ok");

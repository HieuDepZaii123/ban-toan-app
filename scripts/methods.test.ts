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

assert.equal(methodsData.methods.length, 4);
assert.equal(methodIds.size, 4);
assert.ok(methodsData.guide.length >= 4);

for (const row of methodsData.guide) {
  assert.ok(methodIds.has(row.methodId), row.methodId);
  const topic = row.topicHref.match(/^\/t\/([^/]+)$/);
  assert.ok(topic && IDS.has(topic[1] ?? ""), row.topicHref);
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
    assert.ok((topic && IDS.has(topic[1] ?? "")) || (self && methodIds.has(self[1] ?? "")), link.href);
  }
  assert.ok(method.verify.length >= method.examples.length, method.id);
}

assert.ok(methodsData.methods.some((item) => item.id === "luong-giac" && item.care.some((line) => line.includes("\\cos\\theta\\ge 0"))));
assert.ok(methodsData.methods.some((item) => item.id === "doi-bien" && item.formulas.some((line) => line.includes("g(a)"))));
assert.ok(methodsData.methods.some((item) => item.id === "tung-phan" && item.formulas.some((line) => line.includes("uv"))));

execFileSync("python3", ["scripts/methods_sympy.py", "src/methods/methods.json"], { stdio: "inherit" });
console.log("methods ok");

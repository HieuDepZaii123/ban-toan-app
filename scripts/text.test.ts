/**
 * Every string a learner can see must render cleanly: no control characters
 * (a lost backslash such as "\times" -> TAB + "imes"), no doubled "$$",
 * no "{,}" outside math, and no sign glitches like "-+" or "x--1".
 * Static banks are walked directly; generators are sampled with many seeds.
 */
import { loadTopic } from "../src/content/loadTopic.ts";
import { topics } from "../src/content/catalog.ts";
import { gradeBooks } from "../src/content/grades/index.ts";
import { thptBank } from "../src/thpt/bank.ts";
import { generatePractice } from "../src/grades/practiceGen.ts";
import { mulberry32 } from "../src/lib/prng.ts";
import * as dang from "../src/content/dang/index.ts";

const problems: string[] = [];
const seen = new Set<string>();

function inMath(text: string): string[] {
  return [...text.matchAll(/\$([^$]*)\$/g)].map((m) => m[1] ?? "");
}

export function textProblems(text: string): string[] {
  const out: string[] = [];
  for (const math of inMath(text)) {
    if (/[\u0000-\u001f]/.test(math) || /\n/.test(math)) out.push("control character inside $…$ (lost backslash?)");
  }
  if (text.includes("$$")) out.push('doubled "$$"');
  if ((text.match(/\$/g) ?? []).length % 2 === 1) out.push("unbalanced $");
  const outside = text.replace(/\$[^$]*\$/g, " ");
  if (outside.includes("{,}")) out.push('"{,}" outside math');
  if (/\\(?:frac|dfrac|sqrt|times|cdot|neq|infty|le|ge)\b/.test(outside)) out.push("TeX command outside $…$");
  for (const math of inMath(text)) {
    if (/(^|[^\\a-z])(?:-\s*\+|\+\s*-|-\s*-)(?!\s*>)/.test(math.replace(/\\[a-zA-Z]+/g, "a"))) out.push(`sign glitch in "${math.slice(0, 40)}"`);
  }
  return out;
}

function walk(value: unknown, where: string): void {
  if (typeof value === "string") {
    if (seen.has(value)) return;
    seen.add(value);
    for (const p of textProblems(value)) problems.push(`${where}: ${p}: ${JSON.stringify(value.slice(0, 90))}`);
    return;
  }
  if (Array.isArray(value)) { value.forEach((v, i) => walk(v, `${where}[${i}]`)); return; }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) if (typeof v !== "function") walk(v, `${where}.${k}`);
  }
}

for (const topic of topics) {
  const pack = await loadTopic(topic.id);
  walk(pack.lesson, `${topic.id}.lesson`);
  walk(pack.questions, `${topic.id}.questions`);
  for (const vary of pack.vary) {
    for (let seed = 1; seed <= 120; seed += 1) walk(vary.draw(mulberry32(seed)).stem, `${topic.id}.vary.${vary.id}#${seed}`);
  }
}
walk(dang, "dang");
walk(gradeBooks, "grades");
walk(thptBank, "thpt");
walk(generatePractice([], [1, 2, 3, 4, 5, 6, 7, 8, 9]), "practice");

if (problems.length) {
  console.error(problems.slice(0, 400).join("\n"));
  console.error(`${problems.length} text problems`);
  process.exit(1);
}
console.log(`text ok (${seen.size} strings)`);

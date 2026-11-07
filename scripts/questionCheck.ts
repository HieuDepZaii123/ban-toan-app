/** Kiểm tra chung cho ngân hàng câu trắc nghiệm sinh từ mẫu (luyện lớp 1–9 và luyện THPT). */
import assert from "node:assert/strict";
import katex from "katex";
import type { GradeQuestion } from "../src/grades/practiceBank.ts";

const VOCATIVE = /(^|[^\p{L}\p{N}_])em(?=[^\p{L}\p{N}_]|$)/iu;

/** Cấu trúc, văn bản và KaTeX của từng câu; đáp án đúng rải đủ A–D. */
export function checkShape(rows: readonly GradeQuestion[], label: string): void {
  assert.equal(new Set(rows.map((item) => item.prompt)).size, rows.length, `${label} trùng đề`);
  const spots = new Set<number>();
  for (const item of rows) {
    assert.equal(new Set(item.choices).size, 4, item.id);
    assert.equal(item.steps.length, 3, item.id);
    assert.ok(item.answer >= 0 && item.answer <= 3, item.id);
    spots.add(item.answer);
    const blob = [item.prompt, ...item.choices, ...item.steps].join(" ");
    assert.ok(!VOCATIVE.test(blob) && !/undefined|NaN|Infinity/.test(blob), `${item.id}: ${blob}`);
    assert.equal((blob.match(/\$/g) ?? []).length % 2, 0, `${item.id} lệch dấu $`);
    for (const tex of blob.match(/\$[^$]+\$/g) ?? []) katex.renderToString(tex.slice(1, -1), { throwOnError: true, strict: "error" });
  }
  assert.equal(spots.size, 4, `${label}: đáp án đúng nên rải đủ A–D`);
}

function valueOfTex(text: string): [number, number] | null {
  const tex = /\$([^$]+)\$/.exec(text)?.[1]?.replace(/(\^\\circ|\\%)$/, "").trim();
  if (!tex) return null;
  let found = /^(-?)\\dfrac\{(\d+)\}\{(\d+)\}$/.exec(tex);
  if (found) return [(found[1] ? -1 : 1) * Number(found[2]), Number(found[3])];
  found = /^(-?\d+)\{,\}(\d+)$/.exec(tex);
  if (found) {
    const scale = 10 ** found[2]!.length;
    return [Number(found[1]) * scale + (tex.startsWith("-") ? -1 : 1) * Number(found[2]), scale];
  }
  return /^-?\d+$/.test(tex) ? [Number(tex), 1] : null;
}

function valueOfSym(text: string): [number, number] | null {
  const found = /^Rational\((-?\d+),(\d+)\)$/.exec(text);
  if (found) return [Number(found[1]), Number(found[2])];
  return /^-?\d+$/.test(text) ? [Number(text), 1] : null;
}

/** Đáp án được đánh dấu phải hiện đúng `expect` khi đáp số là số nguyên, phân số hoặc số thập phân. Trả về số câu so được. */
export function checkMarked(rows: readonly GradeQuestion[]): number {
  let compared = 0;
  for (const item of rows) {
    const shown = valueOfTex(item.choices[item.answer]);
    const want = valueOfSym(item.expect);
    if (!shown || !want) continue;
    compared += 1;
    assert.equal(shown[0] * want[1], want[0] * shown[1], `${item.id}: đáp án ${item.choices[item.answer]} khác ${item.expect}`);
  }
  return compared;
}

export type SympyRow = { where: string; lhs: string; rhs: string };

export function sympyRows(rows: readonly GradeQuestion[]): SympyRow[] {
  return rows.map((item) => ({ where: item.id, lhs: item.check, rhs: item.expect }));
}

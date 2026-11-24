/**
 * Dạng bài và phương pháp giải của từng lớp (src/content/grades/dang): đủ 10 dạng mỗi lớp,
 * hai ngôn ngữ khớp công thức, văn phong đúng, đáp số qua sympy.
 * Chạy: tsx scripts/gradeDang.test.ts
 */
import { execFileSync } from "node:child_process";
import { collectDangChecks, dangByGrade } from "../src/content/grades/dang/index.ts";
import type { Bi } from "../src/content/grades/dang/types.ts";

const fails: string[] = [];
const fail = (where: string, what: string): void => {
  fails.push(`${where}: ${what}`);
};
const VI = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
const formulas = (text: string): string =>
  (text.match(/\$[^$]+\$/g) ?? []).map((m) => m.replace(/\{,\}/g, ".").replace(/;/g, ",").replace(/\\ |\s+/g, "")).sort().join(" ");

function bi(where: string, text: Bi, min = 12): void {
  if (!text.vi || !text.en) return fail(where, "thiếu một ngôn ngữ");
  if (text.vi.length < min || text.en.length < min) fail(where, "quá ngắn");
  const proseVi = text.vi.replace(/\$[^$]+\$/g, "");
  const proseEn = text.en.replace(/\$[^$]+\$/g, "");
  if (/[A-Za-z]{3}/.test(proseVi) && !VI.test(proseVi)) fail(where, `bản Việt thiếu dấu: ${text.vi}`);
  if (VI.test(proseEn)) fail(where, `bản Anh còn chữ Việt: ${text.en}`);
  if (/\{,\}/.test(text.en)) fail(where, "bản Anh còn dấu phẩy thập phân");
  if (/^\$/.test(text.vi.trim()) || /^\$/.test(text.en.trim())) fail(where, "câu mở đầu bằng ký hiệu");
  if (/\\dfrac/.test(text.vi)) fail(where, "dùng \\dfrac");
  const a = formulas(text.vi);
  const b = formulas(text.en);
  if (a !== b) fail(where, `công thức khác nhau\n    vi: ${a}\n    en: ${b}`);
}

let total = 0;
for (let grade = 1; grade <= 12; grade += 1) {
  const list = dangByGrade[grade] ?? [];
  if (list.length < 10 || list.length > 14) fail(`lớp ${grade}`, `có ${list.length} dạng, cần từ 10 đến 14`);
  const names = new Set<string>();
  list.forEach((d, i) => {
    total += 1;
    const at = `lớp ${grade} dạng ${i + 1}`;
    if (names.has(d.name.vi)) fail(at, `trùng tên ${d.name.vi}`);
    names.add(d.name.vi);
    bi(`${at} tên`, d.name, 6);
    bi(`${at} nhận dạng`, d.spot);
    if (d.method.length < 2 || d.method.length > 4) fail(at, `cần 2–4 bước phương pháp, có ${d.method.length}`);
    d.method.forEach((m, k) => bi(`${at} bước ${k + 1}`, m));
    bi(`${at} ví dụ đề`, d.example.prompt);
    if (d.example.steps.length < 2 || d.example.steps.length > 4) fail(at, `ví dụ cần 2–4 bước, có ${d.example.steps.length}`);
    d.example.steps.forEach((s, k) => bi(`${at} ví dụ bước ${k + 1}`, s));
    bi(`${at} ví dụ kết`, d.example.ket, 6);
    bi(`${at} lỗi`, d.mistake);
    bi(`${at} luyện đề`, d.drill.prompt);
    bi(`${at} luyện đáp`, d.drill.answer, 4);
    if (!d.example.checks.length || !d.drill.checks.length) fail(at, "thiếu phép kiểm sympy");
  });
}

if (fails.length) {
  console.error(fails.slice(0, 40).join("\n"));
  console.error(`gradeDang: ${fails.length} lỗi`);
  process.exit(1);
}
const checks = collectDangChecks();
execFileSync("python3", ["scripts/dang_sympy.py"], { input: JSON.stringify(checks), stdio: ["pipe", "inherit", "inherit"] });
console.log(`gradeDang ok: ${total} dạng, ${checks.length} phép kiểm`);

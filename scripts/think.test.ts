/**
 * Bài tập tư duy và sáng tạo (src/content/think): đủ số lượng, hai ngôn ngữ khớp công thức,
 * văn phong đúng, số liệu qua sympy. Chạy: tsx scripts/think.test.ts
 */
import { execFileSync } from "node:child_process";
import { allLabSpecs } from "../src/content/labSpecs.ts";
import { collectThinkChecks, KIND_LABEL, thinkByGrade, thinkByTopic, type Bi, type Think } from "../src/content/think/index.ts";

const fails: string[] = [];
const fail = (where: string, what: string): void => {
  fails.push(`${where}: ${what}`);
};
const VI = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
const formulas = (text: string): string =>
  (text.match(/\$[^$]+\$/g) ?? []).map((m) => m.replace(/\{,\}/g, ".").replace(/;/g, ",").replace(/\\ |\s+/g, "")).sort().join(" ");

function bi(where: string, text: Bi, min = 8, lead = false): void {
  if (!text.vi || !text.en) return fail(where, "thiếu một ngôn ngữ");
  if (text.vi.length < min || text.en.length < min) fail(where, "quá ngắn");
  const proseVi = text.vi.replace(/\$[^$]+\$/g, "").replace(/\\text\{[^}]*\}/g, "");
  const proseEn = text.en.replace(/\$[^$]+\$/g, "");
  if (/[A-Za-z]{3}/.test(proseVi) && !VI.test(proseVi)) fail(where, `bản Việt thiếu dấu: ${text.vi}`);
  if (VI.test(proseEn)) fail(where, `bản Anh còn chữ Việt: ${text.en}`);
  if (/\{,\}/.test(text.en)) fail(where, "bản Anh còn dấu phẩy thập phân");
  if (lead && (/^\$/.test(text.vi.trim()) || /^\$/.test(text.en.trim()))) fail(where, `câu mở đầu bằng ký hiệu: ${text.vi}`);
  if (/\\dfrac/.test(text.vi)) fail(where, "dùng \\dfrac");
  const a = formulas(text.vi);
  const c = formulas(text.en);
  if (a !== c) fail(where, `công thức khác nhau\n    vi: ${a}\n    en: ${c}`);
}

function item(where: string, t: Think): void {
  if (!(t.kind in KIND_LABEL)) fail(where, `loại lạ ${t.kind}`);
  bi(`${where} tên`, t.title, 4);
  bi(`${where} đề`, t.prompt, 20, true);
  bi(`${where} gợi ý`, t.hint, 10);
  if (t.steps.length < 2 || t.steps.length > 4) fail(where, `cần 2–4 bước, có ${t.steps.length}`);
  t.steps.forEach((s, i) => bi(`${where} bước ${i + 1}`, s, 10));
  bi(`${where} đáp`, t.answer, 6);
}

let total = 0;
for (const id of Object.keys(allLabSpecs)) {
  const list = thinkByTopic[id] ?? [];
  if (list.length !== 4) fail(`chuyên đề ${id}`, `có ${list.length} bài, cần đúng 4`);
  const titles = new Set<string>();
  list.forEach((t, i) => {
    total += 1;
    if (titles.has(t.title.vi)) fail(`${id}#${i + 1}`, "trùng tên");
    titles.add(t.title.vi);
    item(`chuyên đề ${id} #${i + 1}`, t);
  });
  if (new Set(list.map((t) => t.kind)).size < 3) fail(`chuyên đề ${id}`, "cần ít nhất 3 loại bài khác nhau");
}
for (const id of Object.keys(thinkByTopic)) if (!allLabSpecs[id]) fail(`chuyên đề ${id}`, "không có lab tương ứng");
for (let g = 1; g <= 12; g += 1) {
  const list = thinkByGrade[g] ?? [];
  if (list.length !== 5) fail(`lớp ${g}`, `có ${list.length} bài, cần đúng 5`);
  list.forEach((t, i) => {
    total += 1;
    item(`lớp ${g} #${i + 1}`, t);
  });
  if (new Set(list.map((t) => t.kind)).size < 4) fail(`lớp ${g}`, "cần ít nhất 4 loại bài khác nhau");
}

if (fails.length) {
  console.error(fails.slice(0, 40).join("\n"));
  console.error(`think: ${fails.length} lỗi`);
  process.exit(1);
}
const checks = collectThinkChecks();
execFileSync("python3", ["scripts/dang_sympy.py"], { input: JSON.stringify(checks), stdio: ["pipe", "inherit", "inherit"] });
console.log(`think ok: ${total} bài, ${checks.length} phép kiểm`);

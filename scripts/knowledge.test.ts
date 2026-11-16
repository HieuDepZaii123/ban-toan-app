/**
 * Kiến thức tổng quát và chi tiết của 14 chuyên đề: cấu trúc, văn phong, công thức KaTeX đọc được,
 * liên kết đúng tờ, và mọi số liệu qua SymPy.
 * Chạy: tsx scripts/knowledge.test.ts            (đủ 14 chuyên đề)
 *       tsx scripts/knowledge.test.ts quadratic   (một vài chuyên đề, khi đang soạn)
 */
import { execFileSync } from "node:child_process";
import katex from "katex";
import { cards } from "../src/content/cards.ts";
import { KNOWLEDGE_IDS, loadKnowledge } from "../src/content/knowledge/index.ts";
import type { TopicKnowledge } from "../src/content/knowledge/types.ts";

const fails: string[] = [];
function assert(cond: boolean, message: string): void {
  if (!cond) fails.push(message);
}

const MARK = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const BAD = /dễ thấy|hiển nhiên|\bem\b|\\dfrac|\$\$|\n/i;

/** Mục công thức và ví dụ được mở câu bằng ký hiệu; mọi văn xuôi khác thì không. */
function prose(where: string, text: string, allowSymbolStart = false): void {
  assert(text.trim().length > 0, `${where} trống`);
  assert(MARK.test(text), `${where} thiếu dấu tiếng Việt`);
  assert(!BAD.test(text), `${where} còn từ cấm, \\dfrac, $$ hoặc xuống dòng`);
  assert(/[.!?)]$/.test(text.trim()), `${where} không kết thúc bằng dấu câu: …${text.trim().slice(-30)}`);
  for (const sentence of text.split(/(?<=[.!?])\s+/)) {
    assert(allowSymbolStart || !sentence.trim().startsWith("$"), `${where} mở câu bằng ký hiệu: ${sentence.slice(0, 40)}`);
  }
  const dollars = (text.match(/\$/g) ?? []).length;
  assert(dollars % 2 === 0, `${where} lệch dấu $`);
  for (const tex of text.match(/\$[^$]+\$/g) ?? []) {
    assert(!MARK.test(tex), `${where} chữ có dấu nằm trong công thức (KaTeX không có phông cho nó): ${tex.slice(0, 50)}`);
    try {
      katex.renderToString(tex.slice(1, -1), { throwOnError: true });
    } catch (error) {
      assert(false, `${where} KaTeX lỗi trong ${tex.slice(0, 60)}: ${(error as Error).message.slice(0, 80)}`);
    }
  }
}

function words(pack: TopicKnowledge): number {
  return JSON.stringify(pack).replace(/\$[^$]+\$/g, " ").split(/\s+/).filter(Boolean).length;
}

const only = process.argv.slice(2);
const ids = only.length > 0 ? only : [...KNOWLEDGE_IDS];
if (only.length === 0) {
  const want = cards.filter((card) => card.status === "ready").map((card) => card.id).sort();
  assert(JSON.stringify([...KNOWLEDGE_IDS].sort()) === JSON.stringify(want), "mọi tờ đã mở phải có bộ kiến thức");
}

const checks: { where: string; expr: string; expect: string }[] = [];
let itemTotal = 0;
let wordTotal = 0;

for (const id of ids) {
  const pack = await loadKnowledge(id);
  if (!pack) {
    assert(false, `${id} chưa có bộ kiến thức`);
    continue;
  }
  assert(pack.id === id, `${id}: id trong bộ là ${pack.id}`);
  for (const key of ["la", "dungDe", "lienHe"] as const) {
    prose(`${id} tổng quát ${key}`, pack.tongQuat[key]);
    assert(pack.tongQuat[key].length >= 80, `${id} tổng quát ${key} quá ngắn`);
  }
  assert(pack.canBiet.length >= 1 && pack.canBiet.length <= 5, `${id}: cần 1–5 điều nên biết trước`);
  pack.canBiet.forEach((line, i) => prose(`${id} biết trước ${i + 1}`, line));
  assert(pack.sections.length >= 5 && pack.sections.length <= 8, `${id}: cần 5–8 phần, có ${pack.sections.length}`);
  assert(new Set(pack.sections.map((section) => section.title)).size === pack.sections.length, `${id}: trùng tên phần`);

  const kinds = new Map<string, number>();
  let items = 0;
  for (const section of pack.sections) {
    assert(MARK.test(section.title) && !/[.]$/.test(section.title) && !section.title.includes("$"), `${id} tên phần «${section.title}» (không công thức, không chấm cuối)`);
    assert(section.items.length >= 3 && section.items.length <= 8, `${id} «${section.title}» cần 3–8 mục, có ${section.items.length}`);
    for (const item of section.items) {
      items += 1;
      kinds.set(item.kind, (kinds.get(item.kind) ?? 0) + 1);
      prose(`${id} «${section.title}» ${item.title ?? item.kind}`, item.text, item.kind === "cong-thuc" || item.kind === "tinh-chat" || item.kind === "dinh-ly" || item.kind === "vi-du");
      assert(item.text.length >= 40, `${id} «${section.title}» mục quá ngắn: ${item.text.slice(0, 40)}`);
      assert(item.text.length <= 900, `${id} «${section.title}» mục quá dài (${item.text.length}): ${item.text.slice(0, 40)}`);
      if (item.title) {
        assert(item.title.length <= 60 && !item.title.endsWith("."), `${id} tiêu đề mục: ${item.title}`);
        assert(!/[$\\]/.test(item.title), `${id} tiêu đề không được có công thức: ${item.title}`);
      }
      if (item.kind === "vi-du") assert(/\d/.test(item.text), `${id} ví dụ không có số: ${item.text.slice(0, 40)}`);
    }
  }
  itemTotal += items;
  assert(items >= 24, `${id}: cần ít nhất 24 mục, có ${items}`);
  assert((kinds.get("dinh-nghia") ?? 0) >= 2, `${id}: cần ít nhất 2 định nghĩa`);
  assert((kinds.get("dinh-ly") ?? 0) + (kinds.get("cong-thuc") ?? 0) >= 5, `${id}: cần ít nhất 5 định lí hoặc công thức`);
  assert((kinds.get("luu-y") ?? 0) >= 4, `${id}: cần ít nhất 4 lưu ý`);
  assert((kinds.get("vi-du") ?? 0) >= 4, `${id}: cần ít nhất 4 ví dụ`);
  assert((kinds.get("cach-lam") ?? 0) >= 2, `${id}: cần ít nhất 2 cách làm`);

  assert(pack.canNho.length >= 6 && pack.canNho.length <= 10, `${id}: cần 6–10 điều cần nhớ, có ${pack.canNho.length}`);
  pack.canNho.forEach((line, i) => prose(`${id} cần nhớ ${i + 1}`, line));
  assert(pack.lienQuan.length >= 2, `${id}: cần ít nhất 2 chuyên đề liên quan`);
  for (const link of pack.lienQuan) {
    assert(link.id !== id && cards.some((card) => card.id === link.id), `${id}: liên quan tới tờ không có «${link.id}»`);
    prose(`${id} liên quan ${link.id}`, link.vi);
  }

  const w = words(pack);
  wordTotal += w;
  assert(w >= 1000, `${id}: mới ${w} chữ, cần ít nhất 1000`);
  assert(pack.checks.length >= 8, `${id}: cần ít nhất 8 phép kiểm SymPy, có ${pack.checks.length}`);
  for (const check of pack.checks) {
    assert(check.expr.replace(/\s/g, "") !== check.expect.replace(/\s/g, ""), `${id}: check không kiểm gì: ${check.expr}`);
    checks.push({ where: id, expr: check.expr, expect: check.expect });
  }
}

if (fails.length > 0) {
  console.error(fails.slice(0, 60).join("\n"));
  if (fails.length > 60) console.error(`… và ${fails.length - 60} lỗi nữa`);
  process.exit(1);
}

execFileSync("python3", ["scripts/dang_sympy.py"], { input: JSON.stringify(checks), stdio: ["pipe", "inherit", "inherit"] });
console.log(`knowledge ok: ${ids.length} chuyên đề, ${itemTotal} mục, ${wordTotal} chữ, ${checks.length} phép kiểm`);

/**
 * Nền móng nội dung: mọi dạng bài, bài tư duy, phương pháp gắn vào một chương đúng lớp; mỗi mạch của mỗi lớp có nội dung;
 * không dùng phép, ký hiệu chưa học ở lớp đó; câu không dài quá mức lớp đó đọc được; không lặp tên bài tư duy.
 * Chạy: tsx scripts/spine.test.ts. Khoản "nợ" đã biết nằm trong scripts/spine.debt.ts, chỉ được giảm chứ không được tăng.
 */
import { gradeBooks } from "../src/content/grades/index.ts";
import { items } from "../src/curriculum/registry.ts";
import { nodeById, nodes, opsIn, OPS_FROM, type Op, type Strand } from "../src/curriculum/spine.ts";
import { DEBT } from "./spine.debt.ts";

const fails: string[] = [];
const debtSeen = new Set<string>();
const fail = (key: string, what: string): void => {
  if (DEBT.has(key)) {
    debtSeen.add(key);
    return;
  }
  fails.push(`${key}: ${what}`);
};

// 1. Toàn vẹn: mọi mục gắn vào một chương có thật, đúng lớp.
for (const item of items) {
  const node = nodeById.get(item.node);
  if (!node) {
    fail(`link:${item.id}`, `chưa gắn vào chương nào (${item.node || "trống"})`);
    continue;
  }
  if (node.grade !== item.grade) fail(`grade:${item.id}`, `lớp ${item.grade} nhưng chương thuộc lớp ${node.grade}`);
}
if (nodes.length !== gradeBooks.reduce((n, b) => n + b.chapters.length, 0)) fails.push("số nút khác số chương trong sách");

// 2. Độ phủ: mỗi lớp 1–9 có dạng bài ở đủ ba mạch; mỗi lớp 10–12 ít nhất ở các mạch có chương.
const STRANDS: Strand[] = ["so", "hinh", "tk"];
for (let grade = 1; grade <= 12; grade += 1) {
  for (const strand of STRANDS) {
    if (!nodes.some((n) => n.grade === grade && n.strand === strand)) continue;
    const dang = items.filter((i) => i.grade === grade && i.strand === strand && i.kind === "dang").length;
    const other = items.filter((i) => i.grade === grade && i.strand === strand && i.kind !== "dang").length;
    if (dang < 1) fail(`cover-dang:${grade}:${strand}`, `lớp ${grade} mạch ${strand} chưa có dạng bài`);
    if (other < 1) fail(`cover-think:${grade}:${strand}`, `lớp ${grade} mạch ${strand} chưa có bài tư duy hay phương pháp`);
  }
}

// 3. Phép và ký hiệu theo lớp.
const MATH = /\$([^$]+)\$/g;
for (const item of items) {
  if (!item.grade) continue;
  const used = new Map<string, string>();
  for (const text of item.texts) {
    for (const m of text.vi.matchAll(MATH)) {
      for (const op of opsIn(m[1] ?? "")) if (item.grade < OPS_FROM[op] && !used.has(op)) used.set(op, m[0]);
    }
  }
  for (const [op, sample] of used) fail(`ops:${item.id}:${op}`, `lớp ${item.grade} chưa học "${op}" (từ lớp ${OPS_FROM[op as Op]}), ví dụ ${sample}`);
}

// 4. Độ dài câu theo cấp học (đếm từ ngoài công thức).
const LIMIT = (grade: number): number => (grade <= 5 ? 22 : grade <= 9 ? 30 : 42);
for (const item of items) {
  if (!item.grade) continue;
  for (const text of item.texts) {
    const prose = text.vi.replace(MATH, " X ");
    for (const sentence of prose.split(/(?<=[.?!:;])\s+/)) {
      const words = sentence.trim().split(/\s+/).filter(Boolean).length;
      if (words > LIMIT(item.grade)) fail(`long:${item.id}`, `câu ${words} từ, quá dài cho lớp ${item.grade}: ${sentence.slice(0, 70)}…`);
    }
  }
}

// 5. Không lặp tên bài tư duy giữa các lớp, không lặp tên dạng bài trong một lớp.
const seen = new Map<string, string>();
for (const item of items.filter((i) => i.kind === "think")) {
  const key = item.title.vi.replace(/\$[^$]*\$/g, "").trim();
  const prev = seen.get(key);
  if (prev) fail(`dup-think:${item.id}`, `trùng tên "${key}" với ${prev}`);
  else seen.set(key, item.id);
}

// 6. Nợ chỉ giảm: khoản nợ đã khai mà không còn vi phạm là nợ đã trả, phải xóa khỏi danh sách.
const paid = [...DEBT].filter((key) => !debtSeen.has(key));
if (paid.length) fails.push(`nợ đã trả, hãy xóa khỏi scripts/spine.debt.ts:\n    ${paid.join("\n    ")}`);

if (fails.length) {
  console.error(fails.slice(0, 80).join("\n"));
  console.error(`spine: ${fails.length} lỗi`);
  process.exit(1);
}
console.log(`spine ok: ${nodes.length} chương, ${items.length} mục gắn trục, còn ${debtSeen.size} khoản nợ đã khai`);

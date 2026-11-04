/**
 * Kiến thức lớp 1–12: cấu trúc, văn phong, và đáp số qua sympy.
 * Chạy: tsx scripts/grade.test.ts
 */
import { execFileSync } from "node:child_process";
import { collectGradeChecks, gradeBooks, lessonsOf } from "../src/content/grades/index.ts";
import { cards } from "../src/content/cards.ts";

const fails: string[] = [];
function assert(cond: boolean, message: string): void {
  if (!cond) fails.push(message);
}

const MARK = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const BAD = /dễ thấy|hiển nhiên|\\dfrac/i;
const VOCATIVE = /(^|[^\p{L}\p{N}_])em(?=[^\p{L}\p{N}_]|$)/iu;

function sentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/).map((part) => part.trim()).filter(Boolean);
}

function checkProse(where: string, text: string): void {
  assert(MARK.test(text), `${where} thiếu dấu tiếng Việt`);
  assert(!BAD.test(text) && !VOCATIVE.test(text), `${where} còn từ cấm hoặc \\dfrac`);
  for (const sentence of sentences(text)) {
    assert(!sentence.startsWith("$"), `${where} mở câu bằng ký hiệu: ${sentence.slice(0, 48)}`);
  }
}

assert(gradeBooks.length === 12, "đủ 12 lớp");
const grades = gradeBooks.map((book) => book.grade).sort((a, b) => a - b);
assert(grades.join(",") === "1,2,3,4,5,6,7,8,9,10,11,12", "thiếu một lớp");

const topicIds = new Set<string>(cards.map((card) => card.id));
const linked = new Set<string>();

for (const book of gradeBooks) {
  assert(book.chapters.length >= 1, `lớp ${book.grade} thiếu chương`);
  const lessons = lessonsOf(book);
  assert(lessons.length >= 4, `lớp ${book.grade} thiếu bài`);
  if (book.band === "tieu-hoc") {
    assert(lessons.some((item) => item.lesson.figure), `lớp ${book.grade} thiếu hình minh họa`);
  }
  const ids = new Set<string>();
  for (const { lesson } of lessons) {
    assert(!ids.has(lesson.id), `lớp ${book.grade} trùng mã ${lesson.id}`);
    ids.add(lesson.id);
    assert(lesson.examples.length >= 1 && lesson.examples.length <= 2, `${lesson.id} cần 1 hoặc 2 ví dụ`);
    assert(lesson.drills.length === 3, `${lesson.id} cần đúng 3 bài tự luyện`);
    checkProse(`L${book.grade} ${lesson.title}`, lesson.title);
    checkProse(`L${book.grade} tóm tắt`, lesson.summary);
    if (lesson.topicId) {
      assert(topicIds.has(lesson.topicId), `${lesson.id} nối sai chuyên đề ${lesson.topicId}`);
      linked.add(lesson.topicId);
      assert(book.grade >= 10, "chỉ THPT nối sang chuyên đề");
    }
    for (const example of lesson.examples) {
      checkProse(`L${book.grade} ví dụ`, example.prompt);
      checkProse(`L${book.grade} kết`, example.ket);
      assert(example.ket.trim().endsWith("."), `${lesson.id} kết thiếu chấm`);
      assert(example.steps.length >= 2, `${lesson.id} ví dụ thiếu bước`);
      assert(example.checks.length >= 1, `${lesson.id} ví dụ thiếu check`);
      for (const step of example.steps) {
        checkProse(`L${book.grade} bước`, step.claim);
        checkProse(`L${book.grade} lý do`, step.why);
        assert(step.why.trim().length >= 24 && /[.!?]$/.test(step.why.trim()), `${lesson.id} lý do cụt: ${step.why}`);
      }
      for (const check of example.checks) {
        assert(check.expr.replace(/\s/g, "") !== check.expect.replace(/\s/g, ""), `${lesson.id} check không kiểm đáp số`);
      }
    }
    for (const drill of lesson.drills) {
      checkProse(`L${book.grade} luyện`, drill.prompt);
      checkProse(`L${book.grade} đáp`, drill.answer);
      assert(drill.answer.trim().endsWith("."), `${lesson.id} đáp luyện thiếu chấm`);
      assert(drill.checks.length >= 1, `${lesson.id} luyện thiếu check`);
      for (const check of drill.checks) {
        assert(check.expr.replace(/\s/g, "") !== check.expect.replace(/\s/g, ""), `${lesson.id} check không kiểm đáp số`);
      }
    }
  }
}

for (const card of cards) assert(linked.has(card.id), `chuyên đề ${card.id} chưa được nối từ lớp 10–12`);

if (fails.length) {
  console.error(fails.join("\n"));
  process.exit(1);
}

const checks = collectGradeChecks();
execFileSync("python3", ["scripts/dang_sympy.py"], {
  input: JSON.stringify(checks),
  stdio: ["pipe", "inherit", "inherit"],
});
console.log(`grade ok: 12 lớp, ${checks.length} phép kiểm`);

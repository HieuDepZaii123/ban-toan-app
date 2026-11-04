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
  if (book.grade >= 10) {
    for (const chapter of book.chapters) {
      assert(chapter.lessons.length >= 2 && chapter.lessons.length <= 4, `lớp ${book.grade} chương ${chapter.title} cần 2 đến 4 bài`);
    }
    const blob = JSON.stringify(book);
    assert(!blob.includes("góc phần sáu"), `lớp ${book.grade} còn góc phần sáu`);
    assert(!blob.includes("Hệ số hằng"), `lớp ${book.grade} còn hệ số hằng`);
    assert(!blob.includes("tập nghiệm chặt"), `lớp ${book.grade} còn tập nghiệm chặt`);
    assert(!blob.includes("đơn vị dài"), `lớp ${book.grade} còn đơn vị dài`);
    assert(!blob.includes("sin(x)/x") && !blob.includes("sin x/x"), `lớp ${book.grade} còn giới hạn sin x/x`);
  }
  if (book.grade === 10) {
    const blob = JSON.stringify(book);
    assert(blob.includes("hai ẩn"), "lớp 10 thiếu bất phương trình hai ẩn");
    assert(blob.includes("nhị thức") || blob.includes("Nhị thức"), "lớp 10 thiếu nhị thức Newton");
    assert(!blob.includes("một ẩn"), "lớp 10 còn bài bậc nhất một ẩn");
  }
  if (book.grade === 11) {
    const blob = JSON.stringify(book);
    assert(blob.includes("logarit"), "lớp 11 thiếu mũ và logarit");
  }
  if (book.grade === 12) {
    const blob = JSON.stringify(book);
    assert(!blob.includes("Số phức") && !blob.includes("số phức"), "lớp 12 còn số phức");
    assert(!blob.includes("logarit"), "lớp 12 còn chương mũ logarit");
  }
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
      if (book.grade >= 10) {
        assert(!!drill.why, `${lesson.id} luyện thiếu một câu lý do`);
        if (drill.why) {
          checkProse(`L${book.grade} lý do luyện`, drill.why);
          assert(drill.why.trim().length >= 24 && /[.!?]$/.test(drill.why.trim()), `${lesson.id} lý do luyện cụt`);
        }
      }
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

/**
 * Kiến thức lớp 1–12: cấu trúc, văn phong, và đáp số qua sympy.
 * Chạy: tsx scripts/grade.test.ts
 */
import { execFileSync } from "node:child_process";
import { collectGradeChecks, gradeBooks, lessonsOf } from "../src/content/grades/index.ts";
import { cards } from "../src/content/cards.ts";
import { noteKeys } from "../src/content/grades/notes/index.ts";
import { kidSummaries } from "../src/content/grades/notes/kidVoice.ts";
import { pictures } from "../src/content/grades/pictures.ts";
import { secondExamples } from "../src/content/grades/notes/secondExamples.ts";

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
  for (const chapter of book.chapters) {
    assert(chapter.lessons.length >= 2 && chapter.lessons.length <= 4, `lớp ${book.grade} chương ${chapter.title} cần 2 đến 4 bài`);
  }
  if (book.grade >= 10) {
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
    assert(lesson.drills.length >= 3 && lesson.drills.length <= 4, `${lesson.id} cần 3 hoặc 4 bài tự luyện`);
    assert(!!lesson.whyTrue && !!lesson.pitfalls, `${lesson.id} thiếu vì sao đúng hoặc lỗi hay gặp`);
    if (lesson.whyTrue) checkProse(`L${book.grade} vì sao`, lesson.whyTrue);
    if (lesson.pitfalls) checkProse(`L${book.grade} lỗi`, lesson.pitfalls);
    assert(lesson.drills.some((drill) => (drill.stars ?? 0) >= 2), `${lesson.id} thiếu bài nâng cao`);
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
      assert(!!drill.why, `${lesson.id} luyện thiếu một câu lý do`);
      if (drill.why) {
        checkProse(`L${book.grade} lý do luyện`, drill.why);
        assert(drill.why.trim().length >= 24 && /[.!?]$/.test(drill.why.trim()), `${lesson.id} lý do luyện cụt`);
      }
      assert(drill.checks.length >= 1, `${lesson.id} luyện thiếu check`);
      for (const hint of drill.hints ?? []) {
        checkProse(`L${book.grade} gợi ý`, hint);
        assert(hint.trim().length >= 24 && /[.!?]$/.test(hint.trim()), `${lesson.id} gợi ý cụt`);
      }
      for (const check of drill.checks) {
        assert(check.expr.replace(/\s/g, "") !== check.expect.replace(/\s/g, ""), `${lesson.id} check không kiểm đáp số`);
      }
    }
  }
}

const lessonKeys = new Set(gradeBooks.flatMap((book) => lessonsOf(book).map((item) => `${book.grade}/${item.lesson.id}`)));
for (const key of noteKeys()) assert(lessonKeys.has(key), `lời giải thích ${key} không ứng với bài nào`);
for (const key of Object.keys(secondExamples)) assert(lessonKeys.has(key), `ví dụ thứ hai ${key} không ứng với bài nào`);
for (const key of Object.keys(pictures)) assert(lessonKeys.has(key), `hình minh họa ${key} không ứng với bài nào`);
for (const key of Object.keys(kidSummaries)) assert(pictures[key] !== undefined, `bài ${key} chưa có hình minh họa riêng`);
for (const key of Object.keys(kidSummaries)) assert(lessonKeys.has(key), `tóm tắt cho trẻ ${key} không ứng với bài nào`);
for (const book of gradeBooks.filter((item) => item.grade <= 3)) {
  for (const { lesson } of lessonsOf(book)) assert(kidSummaries[`${book.grade}/${lesson.id}`] !== undefined, `lớp ${book.grade} bài ${lesson.id} chưa có tóm tắt cho trẻ`);
}
const whys = gradeBooks.flatMap((book) => lessonsOf(book).map((item) => item.lesson.whyTrue ?? ""));
assert(new Set(whys).size === whys.length, "có hai bài dùng chung một câu vì sao đúng");

for (const card of cards) assert(linked.has(card.id), `chuyên đề ${card.id} chưa được nối từ lớp 10–12`);

const allBlob = JSON.stringify(gradeBooks);
assert(!allBlob.includes("BPT"), "còn viết tắt BPT");
assert(!allBlob.includes("góc nhọn phụ"), "còn cụm góc nhọn phụ");
const checksEarly = collectGradeChecks();
for (const check of checksEarly) {
  const expr = check.expr.replace(/\s/g, "");
  const expect = check.expect.replace(/\s/g, "");
  assert(expr !== "2+2" && expect !== "2+2", `${check.where} còn check 2+2`);
  assert(expr !== "5-2" && expr !== "2-1+1", `${check.where} còn check không kiểm đáp số`);
  if (expr.includes("solve_univariate_inequality")) {
    assert(expr.includes("relational=False"), `${check.where} thiếu relational=False`);
  }
}
const g6 = JSON.stringify(gradeBooks.find((book) => book.grade === 6));
const g7 = JSON.stringify(gradeBooks.find((book) => book.grade === 7));
const g8 = JSON.stringify(gradeBooks.find((book) => book.grade === 8));
const g9 = JSON.stringify(gradeBooks.find((book) => book.grade === 9));
const g10 = JSON.stringify(gradeBooks.find((book) => book.grade === 10));
const g11 = JSON.stringify(gradeBooks.find((book) => book.grade === 11));
const g12 = JSON.stringify(gradeBooks.find((book) => book.grade === 12));
assert(g6.includes("nguyên tố") && g6.includes("hỗn số") && g6.includes("ước lượng") && g6.includes("đối xứng"), "lớp 6 thiếu số nguyên tố, hỗn số, ước lượng hoặc đối xứng");
assert(g6.includes("xác suất thực nghiệm") && g6.includes("đoạn thẳng") && g6.includes("tia"), "lớp 6 thiếu xác suất thực nghiệm hoặc bài điểm, đường, tia");
assert(JSON.stringify(gradeBooks.find((book) => book.grade === 3)).includes("chắc chắn") && JSON.stringify(gradeBooks.find((book) => book.grade === 3)).includes("không thể"), "lớp 3 thiếu khả năng xảy ra");
assert(g7.includes("biểu đồ quạt") && g7.includes("xác suất"), "lớp 7 thiếu thống kê hoặc xác suất");
assert(!JSON.stringify(gradeBooks.find((book) => book.grade === 3)).includes("tử") && !JSON.stringify(gradeBooks.find((book) => book.grade === 3)).includes("mẫu"), "lớp 3 còn từ tử hoặc mẫu");
assert(!g6.includes("Tổng các góc"), "lớp 6 còn tổng các góc của tam giác");
assert(g7.includes("bằng nhau") && g7.includes("đa thức") && g7.includes("tỉ lệ thuận"), "lớp 7 thiếu tam giác bằng nhau, đa thức hoặc đại lượng tỉ lệ");
assert(!g7.includes("tần suất"), "lớp 7 còn tần suất");
assert(g8.includes("Đồ thị của hàm số") && g8.includes("Pythagore") && g8.includes("phân thức") && g8.includes("chóp đều"), "lớp 8 thiếu hàm bậc nhất, Pythagore, phân thức hoặc chóp đều");
assert(!g8.includes("bất phương trình") && !g8.includes("đường tròn"), "lớp 8 còn bất phương trình hoặc đường tròn");
assert(g9.includes("bất phương trình") && g9.includes("tần số tương đối") && g9.includes("Vi-ét") && g9.includes("đường tròn"), "lớp 9 thiếu bất phương trình, tần số tương đối, Vi-ét hoặc đường tròn");
assert(g9.includes("\\Delta=0") && g9.includes("\\Delta<0"), "lớp 9 thiếu trường hợp Delta bằng 0 hoặc Delta âm");
assert(g9.includes("y=ax^2"), "lớp 9 thiếu hàm số y=ax^2");
assert(g10.includes("vectơ pháp tuyến") && g10.includes("2px"), "lớp 10 thiếu pháp tuyến hoặc parabol y^2=2px");
assert(g11.includes("nghiệm tổng quát") && g11.includes("ba đường vuông góc") && g11.includes("đáy đa giác"), "lớp 11 thiếu nghiệm tổng quát hoặc hình không gian tổng hợp");
assert(!g11.includes("Oxyz") && !g11.includes("(1;0;0)"), "lớp 11 còn tọa độ Oxyz");
assert(g12.includes("giá trị đại diện") && g12.includes("nội suy") && g12.includes("tiệm cận đứng"), "lớp 12 thiếu mẫu ghép nhóm hoặc hai tiệm cận đứng");

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

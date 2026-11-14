/**
 * Bản dịch tiếng Anh của bài học (src/content/grades/en): đúng cấu trúc bản tiếng Việt và giữ
 * nguyên mọi công thức. Hai bản chỉ được khác nhau ở dấu thập phân ({,} và .) và dấu ngăn
 * trong tọa độ, danh sách (; và ,).
 * Chạy: tsx scripts/en.test.ts
 */
import { gradeBooks } from "../src/content/grades/index.ts";
import { lessonInEnglish, lessonsEn } from "../src/content/grades/en/index.ts";

const fails: string[] = [];
const fail = (where: string, what: string): void => {
  fails.push(`${where}: ${what}`);
};

function formulas(text: string): string[] {
  return (text.match(/\$[^$]+\$/g) ?? [])
    .map((item) => item.replace(/\{,\}/g, ".").replace(/;/g, ",").replace(/\\ |\s+/g, ""))
    .sort();
}

const VI_LETTERS = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

function pair(where: string, vi: string | undefined, en: string | undefined): void {
  if (!vi && !en) return;
  if (!vi || !en) return fail(where, vi ? "thiếu bản tiếng Anh" : "thừa bản tiếng Anh");
  const a = formulas(vi).join(" ");
  const b = formulas(en).join(" ");
  if (a !== b) fail(where, `công thức khác nhau\n    vi: ${a}\n    en: ${b}`);
  const words = en.replace(/\$[^$]+\$/g, "");
  if (VI_LETTERS.test(words)) fail(where, `còn chữ tiếng Việt: ${en}`);
  if (/\{,\}/.test(en)) fail(where, "còn dấu phẩy thập phân");
  if (!/[.?!:]["”]?$/.test(en.trim()) && !/\$$/.test(en.trim())) fail(where, `chưa kết câu: ${en}`);
}

let lessons = 0;
let total = 0;
const seen = new Set<string>();
for (const book of gradeBooks) {
  for (const chapter of book.chapters) {
    for (const lesson of chapter.lessons) {
      total += 1;
      const key = `${book.grade}/${lesson.id}`;
      const raw = lessonsEn[key];
      if (!raw) continue;
      seen.add(key);
      lessons += 1;
      if (raw.ex.length !== lesson.examples.length) { fail(key, `có ${raw.ex.length} ví dụ, bản gốc có ${lesson.examples.length}`); continue; }
      if (raw.dr.length !== lesson.drills.length) { fail(key, `có ${raw.dr.length} bài luyện, bản gốc có ${lesson.drills.length}`); continue; }
      const en = lessonInEnglish(book.grade, lesson)!;
      pair(`${key} tóm tắt`, lesson.summary, en.summary);
      pair(`${key} vì sao`, lesson.whyTrue, en.whyTrue);
      pair(`${key} lỗi`, lesson.pitfalls, en.pitfalls);
      lesson.examples.forEach((example, i) => {
        const other = en.examples[i]!;
        const at = `${key} ví dụ ${i + 1}`;
        if (other.steps.length !== example.steps.length) return fail(at, `có ${other.steps.length} bước, bản gốc có ${example.steps.length}`);
        pair(`${at} đề`, example.prompt, other.prompt);
        pair(`${at} kết`, example.ket, other.ket);
        example.steps.forEach((step, j) => {
          pair(`${at} bước ${j + 1}`, step.claim, other.steps[j]!.claim);
          pair(`${at} lý do ${j + 1}`, step.why, other.steps[j]!.why);
        });
      });
      lesson.drills.forEach((drill, i) => {
        const other = en.drills[i]!;
        const at = `${key} bài ${i + 1}`;
        pair(`${at} đề`, drill.prompt, other.prompt);
        pair(`${at} đáp`, drill.answer, other.answer);
        pair(`${at} lý do`, drill.why, other.why);
        if ((drill.hints?.length ?? 0) !== (other.hints?.length ?? 0)) fail(at, "số gợi ý khác bản gốc");
        drill.hints?.forEach((hint, j) => pair(`${at} gợi ý ${j + 1}`, hint, other.hints?.[j]));
        if (drill.ask?.kind === "choice") {
          const options = other.ask?.kind === "choice" ? other.ask.options : [];
          if (options === drill.ask.options || options.length !== drill.ask.options.length) fail(at, "thiếu phương án trắc nghiệm tiếng Anh");
          else drill.ask.options.forEach((option, j) => pair(`${at} phương án ${j + 1}`, option, options[j]));
        }
      });
    }
  }
}
for (const key of Object.keys(lessonsEn)) if (!seen.has(key)) fail(key, "không ứng với bài nào");

if (fails.length) {
  console.error(fails.slice(0, 40).join("\n"));
  console.error(`en: ${fails.length} lỗi`);
  process.exit(1);
}
console.log(`en ok: ${lessons}/${total} bài đã dịch`);

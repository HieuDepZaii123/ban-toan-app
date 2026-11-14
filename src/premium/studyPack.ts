/**
 * Tài liệu ôn tập (Premium): một bản ghi bài giảng cho mỗi tờ, ghép từ nội dung đã kiểm của tờ đó
 * (ý chính, bài giảng viết, lỗi hay gặp, ví dụ có lời giải, đề tự luyện kèm đáp án). Không có nội
 * dung mới ở đây, nên số trong tài liệu luôn khớp với tờ. Kết quả là văn bản theo cú pháp của
 * src/docs/model.ts, xem trước bằng renderDoc và tải về PDF / DOCX bằng bộ xuất sẵn có.
 */
import type { Lesson, LessonKind, Question, TopicMeta } from "../content/types.ts";

export type Lang = "vi" | "en";
export type PackSource = { meta: TopicMeta; lesson: Lesson; questions: readonly Question[] };

/** Worked examples shown with full steps; the remaining plain questions go to the self-test. */
export const PACK_EXAMPLES = 3;

const KIND: Record<LessonKind, { vi: string; en: string }> = {
  mo: { vi: "Mở bài", en: "Start" },
  dinh: { vi: "Định nghĩa", en: "Definition" },
  vd: { vi: "Ví dụ", en: "Example" },
  loi: { vi: "Lỗi hay gặp", en: "Common mistake" },
  kiem: { vi: "Tự kiểm", en: "Check" },
};

const pick = (lang: Lang, vi: string, en: string) => (lang === "en" ? en : vi);
/** One source line per item: the doc format is line based. */
const oneLine = (text: string) => text.replace(/\s*\n\s*/g, " ").trim();

function parts(source: PackSource): { examples: Question[]; selfTest: Question[] } {
  const plain = source.questions.filter((question) => !question.kind);
  const concept = source.questions.filter((question) => question.kind === "concept");
  return { examples: plain.slice(0, PACK_EXAMPLES), selfTest: [...plain.slice(PACK_EXAMPLES), ...concept] };
}

/** What the full pack holds, for the page header and the locked card. */
export function packContents(source: PackSource): { notes: number; examples: number; selfTest: number } {
  const { examples, selfTest } = parts(source);
  return { notes: source.lesson.basic.length + source.lesson.exam.length, examples: examples.length, selfTest: selfTest.length };
}

function head(source: PackSource, lang: Lang): string[] {
  const { meta } = source;
  const think = lang === "en" ? meta.thinkEn : meta.think;
  return [
    `# ${pick(lang, `${meta.title}: tài liệu ôn tập`, `${meta.titleEn}: study notes`)}`,
    "",
    oneLine(pick(lang, meta.blurb, meta.blurbEn)),
    "",
    `## ${pick(lang, "1. Ý chính", "1. Key ideas")}`,
    "",
    `- **${pick(lang, "Nhìn", "Look")}:** ${oneLine(think.nhin)}`,
    `- **${pick(lang, "Làm", "Do")}:** ${oneLine(think.lam)}`,
    `- **${pick(lang, "Kết", "Conclude")}:** ${oneLine(think.ket)}`,
    "",
  ];
}

/** The free part of a pack: title, summary and the three key ideas. */
export function packTeaser(source: PackSource, lang: Lang): string {
  return head(source, lang).join("\n").trim();
}

/** The whole pack as doc source. */
export function buildStudyPack(source: PackSource, lang: Lang): string {
  const { meta, lesson } = source;
  const { examples, selfTest } = parts(source);
  const out = head(source, lang);

  out.push(`## ${pick(lang, "2. Bài giảng", "2. Lecture notes")}`, "");
  for (const [title, bits] of [[pick(lang, "Cơ bản", "Basics"), lesson.basic], [pick(lang, "Chuẩn thi", "Exam level"), lesson.exam]] as const) {
    out.push(`### ${title}`, "");
    for (const bit of bits) out.push(`**${pick(lang, KIND[bit.k].vi, KIND[bit.k].en)}.** ${oneLine(pick(lang, bit.vi, bit.en))}`, "");
  }

  out.push(`## ${pick(lang, "3. Bẫy cần tránh", "3. The trap to avoid")}`, "", oneLine(pick(lang, meta.trap, meta.trapEn)), "");

  out.push(`## ${pick(lang, "4. Ví dụ có lời giải", "4. Worked examples")}`, "");
  examples.forEach((question, index) => {
    const choices = lang === "en" ? question.choicesEn : question.choices;
    const steps = lang === "en" ? question.stepsEn : question.steps;
    out.push(`### ${pick(lang, `Ví dụ ${index + 1}`, `Example ${index + 1}`)}`, "", oneLine(pick(lang, question.prompt, question.promptEn)), "");
    steps.forEach((step, at) => out.push(`${at + 1}. ${oneLine(step)}`));
    out.push("", `**${pick(lang, "Đáp án", "Answer")}:** ${oneLine(choices[question.answer])}`, "");
  });

  out.push(`## ${pick(lang, "5. Tự luyện", "5. Self-test")}`, "", pick(lang, "Làm hết rồi mới xem đáp án ở mục 6.", "Finish all of them before reading the answers in section 6."), "");
  selfTest.forEach((question, index) => {
    const choices = lang === "en" ? question.choicesEn : question.choices;
    out.push(`### ${pick(lang, `Câu ${index + 1}`, `Question ${index + 1}`)}`, "", oneLine(pick(lang, question.prompt, question.promptEn)), "");
    choices.forEach((choice, at) => out.push(`- **${"ABCD"[at]}.** ${oneLine(choice)}`));
    out.push("");
  });

  out.push(`## ${pick(lang, "6. Đáp án và gợi ý", "6. Answers and hints")}`, "");
  selfTest.forEach((question, index) => {
    out.push(`${index + 1}. **${"ABCD"[question.answer]}.** ${oneLine(pick(lang, question.hint, question.hintEn))}`);
  });
  out.push("");
  return out.join("\n").trim();
}

import { thinkByGrade } from "../content/think/index.ts";
import type { GradeBook } from "../content/grades/types.ts";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { PageFrame } from "../ui/PageFrame.tsx";
import { ThinkCard } from "../ui/ThinkCard.tsx";
import { useLang } from "../ui/useLang.ts";

/** Five thinking and creative problems for one grade. */
export function ThinkView({ book }: { book: GradeBook }) {
  const lang = useLang();
  const list = thinkByGrade[book.grade] ?? [];
  return (
    <PageFrame
      kicker={t(lang, `Lớp ${book.grade}`, `Grade ${book.grade}`)}
      title={t(lang, "Bài tập tư duy và sáng tạo", "Thinking and creative problems")}
      lead={t(lang, "Các bài để nghĩ kỹ chứ không chỉ tính: đố mẹo, tìm lỗi sai, tìm phản ví dụ, tự ra đề và thử nhiều cách giải.", "Problems to think about, not just compute: puzzles, spotting errors, counterexamples, posing your own problem and trying several methods.")}
    >
      <p><A href={`/kien-thuc/${book.grade}`}>{t(lang, `Về các bài lớp ${book.grade}`, `Back to grade ${book.grade} lessons`)}</A></p>
      {list.map((item, i) => <ThinkCard key={item.title.vi} item={item} index={i + 1} />)}
    </PageFrame>
  );
}

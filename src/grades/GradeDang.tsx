import { dangByGrade } from "../content/grades/dang/index.ts";
import type { Bi } from "../content/grades/dang/types.ts";
import type { GradeBook } from "../content/grades/types.ts";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

/** Dạng bài và phương pháp giải của một lớp: mười dạng, mỗi dạng nhận dạng, cách giải, ví dụ, lỗi hay gặp và bài luyện. */
export function DangView({ book }: { book: GradeBook }) {
  const lang = useLang();
  const list = dangByGrade[book.grade] ?? [];
  const say = (text: Bi) => (lang === "en" ? text.en : text.vi);
  return (
    <PageFrame
      kicker={t(lang, `Lớp ${book.grade}`, `Grade ${book.grade}`)}
      title={t(lang, "Dạng bài và phương pháp giải", "Problem types and solving methods")}
      lead={t(lang, "Các dạng bài thường gặp của lớp này. Nhận ra dạng trước, làm theo các bước, rồi tự luyện một bài.", "Ten common problem types for this grade. Recognise the type first, follow the steps, then try one yourself.")}
    >
      <p><A href={`/kien-thuc/${book.grade}`}>{t(lang, `Về các bài lớp ${book.grade}`, `Back to grade ${book.grade} lessons`)}</A></p>
      {list.map((dang, index) => (
        <details key={dang.name.vi} className="tool-card dang-card">
          <summary><b>{index + 1}.</b> <MathText text={say(dang.name)} /></summary>
          <h3>{t(lang, "Nhận dạng", "How to recognise it")}</h3>
          <p><MathText text={say(dang.spot)} /></p>
          <h3>{t(lang, "Cách giải", "How to solve it")}</h3>
          <ol className="steps">{dang.method.map((step) => <li key={step.vi}><MathText text={say(step)} /></li>)}</ol>
          <h3>{t(lang, "Ví dụ", "Worked example")}</h3>
          <p><MathText text={say(dang.example.prompt)} /></p>
          <ol className="steps">{dang.example.steps.map((step) => <li key={step.vi}><MathText text={say(step)} /></li>)}</ol>
          <p><b>{t(lang, "Kết luận.", "Conclusion.")}</b> <MathText text={say(dang.example.ket)} /></p>
          <h3>{t(lang, "Lỗi hay gặp", "Common mistake")}</h3>
          <p><MathText text={say(dang.mistake)} /></p>
          <h3>{t(lang, "Tự luyện", "Try it")}</h3>
          <p><MathText text={say(dang.drill.prompt)} /></p>
          <details>
            <summary>{t(lang, "Xem đáp án", "Show answer")}</summary>
            <p><MathText text={say(dang.drill.answer)} /></p>
          </details>
        </details>
      ))}
    </PageFrame>
  );
}

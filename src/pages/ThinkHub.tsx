import { cards } from "../content/cards.ts";
import { KIND_LABEL, thinkByGrade, thinkByTopic, type ThinkKind } from "../content/think/index.ts";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

const KIND_NOTE: Record<ThinkKind, { vi: string; en: string }> = {
  puzzle: { vi: "Bài cần một ý hay chứ không cần công thức nặng.", en: "Needs a good idea rather than a heavy formula." },
  error: { vi: "Một lời giải có lỗi; bạn tìm ra chỗ sai.", en: "A solution with a slip; you find it." },
  counter: { vi: "Một câu nói nghe đúng; bạn tìm ví dụ chứng tỏ nó sai.", en: "A claim that sounds right; you find an example that breaks it." },
  design: { vi: "Bạn tự đặt đề rồi tự giải, ví dụ mẫu chỉ là một cách.", en: "You write your own problem and solve it; the model is only one way." },
  multi: { vi: "Cùng một bài, hai cách giải khác nhau.", en: "One problem, two different methods." },
  estimate: { vi: "Đoán trước bằng số tròn, rồi tính để kiểm.", en: "Guess with round numbers first, then compute to check." },
};

/** Cửa vào mọi bài tư duy và sáng tạo: theo lớp và theo chuyên đề. */
export function ThinkHub() {
  const lang = useLang();
  const en = lang === "en";
  const kinds = Object.keys(KIND_LABEL) as ThinkKind[];
  const topics = cards.filter((card) => thinkByTopic[card.id]);
  return (
    <PageFrame
      kicker={t(lang, "Khám phá", "Explore")}
      title={t(lang, "Tư duy và sáng tạo", "Thinking and creating")}
      lead={t(lang, "Những bài không chỉ để tính: tìm lỗi sai, tìm phản ví dụ, tự ra đề, thử nhiều cách, ước lượng. Hãy tự nghĩ trước khi mở gợi ý.", "Problems that are not only for computing: spot the error, find a counterexample, pose your own problem, try more than one way, estimate. Think for yourself before opening the hint.")}
    >
      <section className="tool-card">
        <h2>{t(lang, "Sáu loại bài", "Six kinds of problem")}</h2>
        <ul className="method-guide">
          {kinds.map((kind) => (
            <li key={kind}>
              <b>{en ? KIND_LABEL[kind].en : KIND_LABEL[kind].vi}</b>
              <span>{en ? KIND_NOTE[kind].en : KIND_NOTE[kind].vi}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="stream">
        <h2>{t(lang, "Theo lớp", "By grade")}</h2>
        <div className="study-list">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
            <A key={grade} className="study-card" href={`/kien-thuc/${grade}/tu-duy`}>
              <span>
                <strong>{t(lang, `Lớp ${grade}`, `Grade ${grade}`)}</strong>
                <small className="lecture-note">{t(lang, `${thinkByGrade[grade]?.length ?? 0} bài`, `${thinkByGrade[grade]?.length ?? 0} problems`)}</small>
              </span>
              <span aria-hidden="true">→</span>
            </A>
          ))}
        </div>
      </section>
      <section className="stream">
        <h2>{t(lang, "Theo chuyên đề lớp 10–12", "By topic, grades 10–12")}</h2>
        <div className="study-list">
          {topics.map((card) => (
            <A key={card.id} className="study-card" href={`/t/${card.id}?tab=lam`}>
              <span>
                <strong><MathText text={en ? card.titleEn : card.title} /></strong>
                <small className="lecture-note">{t(lang, `${thinkByTopic[card.id]?.length ?? 0} bài, nằm dưới phần luyện tập`, `${thinkByTopic[card.id]?.length ?? 0} problems, below the practice questions`)}</small>
              </span>
              <span aria-hidden="true">→</span>
            </A>
          ))}
        </div>
      </section>
    </PageFrame>
  );
}

import { useState } from "react";
import { dangFor } from "../content/dang/index.ts";
import type { Drill, ReasonStep, Worked } from "../content/dang/types.ts";
import type { Lang } from "../lib/math.ts";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/useLang.ts";

const KIND_LABEL: Record<Drill["kind"], [string, string]> = {
  luyen: ["Tự luyện", "Practice"],
  "thuc-te": ["Thực tế", "Real life"],
  "tu-ra-de": ["Tự ra đề", "Write your own"],
  mo: ["Mở", "Open question"],
  "phan-bien": ["Phản biện", "Find the flaw"],
  doc: ["Đọc bảng hoặc đồ thị", "Read a table or graph"],
  "uoc-luong": ["Ước lượng", "Estimate"],
};

/** Phần Dạng bài của một chuyên đề. Nội dung viết bằng tiếng Việt; ở bản tiếng Anh chỉ các nhãn được dịch. */
export function DangHoc({ topicId }: { topicId: string }) {
  const lang = useLang();
  const pack = dangFor(topicId);
  if (!pack) return null;
  return (
    <section className="dang-hoc" aria-label={t(lang, "Dạng bài", "Problem types")}>
      <h2>{t(lang, "Dạng bài", "Problem types")}</h2>
      <p className="lecture-note">{t(lang, "Mỗi bước có một lý do. Nếu điều kiện chỉ là cần, hãy thử lại vào đề.", "Every step has a reason. If a condition is only necessary, check the result against the problem.")}</p>
      {lang === "en" ? <p className="lecture-note vi-only-note">This section is written in Vietnamese. The topic lesson, questions and solutions above are available in English.</p> : null}
      <div lang="vi">
        {pack.dang.map((dang) => (
          <article key={dang.name} className="tool-card">
            <h3>{dang.name}</h3>
            <p><b>{t(lang, "Nhận dạng.", "Recognise it.")}</b> <MathText text={dang.nhanDang} /></p>
            <p><b>{t(lang, "Phương pháp.", "Method.")}</b> <MathText text={dang.phuongPhap} /></p>
            <WorkedBlock item={dang.viDu} lang={lang} />
            <p><b>{t(lang, "Lỗi hay gặp.", "Common mistake.")}</b> <MathText text={dang.loi} /></p>
            <DrillBlock item={dang.luyen} lang={lang} />
          </article>
        ))}
        <article className="tool-card">
          <h3>{t(lang, "Câu sáng tạo và thực tế", "Creative and real-life questions")}</h3>
          {pack.sangTao.map((item) => (
            <DrillBlock key={item.prompt} item={item} lang={lang} />
          ))}
        </article>
      </div>
    </section>
  );
}

function WorkedBlock({ item, lang }: { item: Worked; lang: Lang }) {
  return (
    <div>
      <p><b>{t(lang, "Ví dụ mẫu.", "Worked example.")}</b> <MathText text={item.prompt} /></p>
      <Steps steps={item.steps} lang={lang} />
      <p><b>{t(lang, "Kết luận.", "Conclusion.")}</b> <MathText text={item.ket} /></p>
    </div>
  );
}

function DrillBlock({ item, lang }: { item: Drill; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const label = KIND_LABEL[item.kind];
  return (
    <div className="fitem">
      <p><b>{t(lang, label[0], label[1])}.</b> <MathText text={item.prompt} /></p>
      {item.sao ? (
        <p className="lecture-note">
          {t(lang, `Độ khó: ${item.sao} trên 5 `, `Difficulty: ${item.sao} of 5 `)}
          <span aria-hidden="true">{"★".repeat(item.sao)}{"☆".repeat(5 - item.sao)}</span>
        </p>
      ) : null}
      <p><b>{t(lang, "Nghĩ thế nào.", "How to think.")}</b> <MathText text={item.think} /></p>
      <button type="button" className="text-btn" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? t(lang, "Ẩn lời giải", "Hide solution") : t(lang, "Xem lời giải", "Show solution")}
      </button>
      {open ? (
        <>
          <Steps steps={item.steps} lang={lang} />
          <p><b>{t(lang, "Đáp số.", "Answer.")}</b> <MathText text={item.answer} /></p>
        </>
      ) : null}
    </div>
  );
}

function Steps({ steps, lang }: { steps: ReasonStep[]; lang: Lang }) {
  return (
    <ol className="steps">
      {steps.map((step) => (
        <li key={step.claim}>
          <MathText text={step.claim} />
          <span className="lecture-note step-why">{t(lang, "Lý do: ", "Why: ")}<MathText text={step.why} /></span>
        </li>
      ))}
    </ol>
  );
}

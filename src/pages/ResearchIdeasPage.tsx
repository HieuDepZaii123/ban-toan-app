import { useEffect } from "react";
import { researchIdeas, type ResearchIdea } from "../research/ideas.ts";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

export function ResearchIdeasPage() {
  const lang = useLang();
  useEffect(() => {
    document.title = lang === "en" ? "Research · Bàn Toán" : "Nghiên cứu · Bàn Toán";
  }, [lang]);

  const sparks = researchIdeas.filter((item) => item.kind === "y-tuong");
  const themes = researchIdeas.filter((item) => item.kind === "chu-de");

  return (
    <PageFrame
      kicker={t(lang, "Nghiên cứu", "Research")}
      title={t(lang, "Ý tưởng và chủ đề", "Ideas and themes")}
      lead={t(lang, "Các câu hỏi để tự tìm tòi, từ một buổi làm ngắn đến một báo cáo nhỏ. Mỗi mục nêu câu hỏi, gợi ý cách làm và vài bước tính mẫu để bắt đầu. Nhiều mục có hình kéo được hoặc dùng được máy tính khoa học để thử nhiều số.", "Each item has a question, a method, and a few calculated steps. To drag the numbers, open the Research tab on that sheet.")}
    >
      <IdeaGroup id="y-tuong" title={t(lang, "Ý tưởng", "Ideas")} note={t(lang, "Một câu hỏi cho một buổi làm.", "One question for one sitting.")} items={sparks} />
      <IdeaGroup id="chu-de" title={t(lang, "Chủ đề nghiên cứu", "Research themes")} note={t(lang, "Một báo cáo ngắn: câu hỏi, cách làm, rồi một con số.", "A short report: question, method, then one number.")} items={themes} />
    </PageFrame>
  );
}

function IdeaGroup({ id, title, note, items }: { id: string; title: string; note: string; items: ResearchIdea[] }) {
  const lang = useLang();
  return (
    <section className="stream" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      <p className="lecture-note">{note}</p>
      <div className="panel">
        {items.map((item) => (
          <article key={item.id} className="tool-card">
            <p className="kicker">{item.field}</p>
            <h3><MathText text={item.title} /></h3>
            <p><b>{t(lang, "Câu hỏi. ", "Question. ")}</b><MathText text={item.question} /></p>
            <p><b>{t(lang, "Cách làm. ", "Method. ")}</b><MathText text={item.method} /></p>
            <ol className="steps">
              {item.steps.map((step) => (
                <li key={step}><MathText text={step} /></li>
              ))}
            </ol>
            {item.href ? <A href={item.href}>Làm trên tờ</A> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

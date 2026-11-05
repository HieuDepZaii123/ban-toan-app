import { useEffect } from "react";
import { researchIdeas, type ResearchIdea } from "../research/ideas.ts";
import { A } from "../lib/route.tsx";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";

export function ResearchIdeasPage() {
  useEffect(() => {
    document.title = "Nghiên cứu · Bàn Toán";
  }, []);

  const sparks = researchIdeas.filter((item) => item.kind === "y-tuong");
  const themes = researchIdeas.filter((item) => item.kind === "chu-de");

  return (
    <PageFrame
      kicker="Nghiên cứu"
      title="Ý tưởng và chủ đề"
      lead="Mỗi mục có một câu hỏi, một cách làm, và vài bước tính. Muốn kéo số thì mở tab Nghiên cứu trên tờ đó."
    >
      <IdeaGroup id="y-tuong" title="Ý tưởng" note="Một câu hỏi cho một buổi làm." items={sparks} />
      <IdeaGroup id="chu-de" title="Chủ đề nghiên cứu" note="Một báo cáo ngắn: câu hỏi, cách làm, rồi một con số." items={themes} />
    </PageFrame>
  );
}

function IdeaGroup({ id, title, note, items }: { id: string; title: string; note: string; items: ResearchIdea[] }) {
  return (
    <section className="stream" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      <p className="lecture-note">{note}</p>
      <div className="panel">
        {items.map((item) => (
          <article key={item.id} className="tool-card">
            <p className="kicker">{item.field}</p>
            <h3><MathText text={item.title} /></h3>
            <p><b>Câu hỏi. </b><MathText text={item.question} /></p>
            <p><b>Cách làm. </b><MathText text={item.method} /></p>
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

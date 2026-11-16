import { useEffect, useState } from "react";
import { topicById } from "../content/catalog.ts";
import { hasKnowledge, loadKnowledge } from "../content/knowledge/index.ts";
import type { KnowKind, TopicKnowledge } from "../content/knowledge/types.ts";
import { A } from "../lib/route.tsx";
import { MathText } from "../ui/MathText.tsx";

const KIND_LABEL: Record<KnowKind, string> = {
  "dinh-nghia": "Định nghĩa",
  "dinh-ly": "Định lí",
  "cong-thuc": "Công thức",
  "tinh-chat": "Tính chất",
  "cach-lam": "Cách làm",
  "luu-y": "Lưu ý",
  "vi-du": "Ví dụ",
};

/** Kiến thức tổng quát và chi tiết của một chuyên đề, đặt giữa bài giảng ngắn và phần Dạng bài. */
export function KnowledgeRead({ topicId }: { topicId: string }) {
  const [loaded, setLoaded] = useState<{ id: string; data: TopicKnowledge | null } | null>(null);

  useEffect(() => {
    if (!hasKnowledge(topicId)) return;
    let live = true;
    loadKnowledge(topicId).then(
      (data) => { if (live) setLoaded({ id: topicId, data }); },
      () => { if (live) setLoaded({ id: topicId, data: null }); },
    );
    return () => { live = false; };
  }, [topicId]);

  if (!hasKnowledge(topicId)) return null;
  const pack = loaded?.id === topicId ? loaded.data : null;
  if (!pack) {
    return loaded?.id === topicId
      ? null
      : <p className="lecture-note">Đang mở phần kiến thức…</p>;
  }

  return (
    <section className="knowledge" aria-labelledby="knowledge-title">
      <h2 id="knowledge-title">Kiến thức tổng quát và chi tiết</h2>
      <div className="kn-general">
        <p><b>Là gì.</b> <MathText text={pack.tongQuat.la} /></p>
        <p><b>Dùng để làm gì.</b> <MathText text={pack.tongQuat.dungDe} /></p>
        <p><b>Nối với đâu.</b> <MathText text={pack.tongQuat.lienHe} /></p>
        {pack.canBiet.length > 0 ? (
          <>
            <p className="lecture-note">Nên biết trước:</p>
            <ul className="kn-list">
              {pack.canBiet.map((line) => <li key={line}><MathText text={line} /></li>)}
            </ul>
          </>
        ) : null}
      </div>
      {pack.sections.map((section, index) => (
        <details key={section.title} className="kn-section" open={index === 0}>
          <summary>{section.title}</summary>
          {section.items.map((item, at) => (
            <div key={`${at}-${item.title ?? item.kind}`} className={`kn-item kn-${item.kind}`}>
              <p>
                <span className="kn-tag">{KIND_LABEL[item.kind]}</span>
                {item.title ? <b> <MathText text={item.title} />.</b> : null}{" "}
                <MathText text={item.text} />
              </p>
            </div>
          ))}
        </details>
      ))}
      <div className="kn-recap">
        <h3>Cần nhớ</h3>
        <ol className="kn-list">
          {pack.canNho.map((line) => <li key={line}><MathText text={line} /></li>)}
        </ol>
      </div>
      {pack.lienQuan.length > 0 ? (
        <div className="kn-related">
          <h3>Chuyên đề liên quan</h3>
          <ul className="kn-list">
            {pack.lienQuan.map((item) => (
              <li key={item.id}>
                <A href={`/t/${item.id}`}>{topicById(item.id)?.title ?? item.id}</A>: <MathText text={item.vi} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

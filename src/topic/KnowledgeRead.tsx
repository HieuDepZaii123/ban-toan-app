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

/** Tên phần suy luận theo loại mục: định lí thì chứng minh, công thức thì suy ra, còn lại là giải thích. */
const WHY_LABEL: Partial<Record<KnowKind, string>> = {
  "dinh-ly": "Chứng minh từng bước",
  "cong-thuc": "Công thức này từ đâu ra",
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
        {pack.tuDau.length > 0 ? (
          <div className="kn-start">
            <h3>Bắt đầu từ con số không</h3>
            {pack.tuDau.map((line) => <p key={line}><MathText text={line} /></p>)}
          </div>
        ) : null}
        <p><b>Là gì.</b> <MathText text={pack.tongQuat.la} /></p>
        <p><b>Dùng để làm gì.</b> <MathText text={pack.tongQuat.dungDe} /></p>
        <p><b>Nối với đâu.</b> <MathText text={pack.tongQuat.lienHe} /></p>
        {pack.kyHieu.length > 0 ? (
          <details className="kn-symbols">
            <summary>Cách đọc các ký hiệu trong chuyên đề</summary>
            <dl>
              {pack.kyHieu.map((row) => (
                <div key={row.kh}>
                  <dt><MathText text={row.kh} /></dt>
                  <dd><MathText text={row.doc} /></dd>
                </div>
              ))}
            </dl>
          </details>
        ) : null}
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
              {item.de ? <p className="kn-plain"><b>Nói dễ hiểu.</b> <MathText text={item.de} /></p> : null}
              {item.suy && item.suy.length > 0 ? (
                <details className="kn-why">
                  <summary>{WHY_LABEL[item.kind] ?? "Vì sao đúng"}</summary>
                  <ol>
                    {item.suy.map((step) => <li key={step}><MathText text={step} /></li>)}
                  </ol>
                </details>
              ) : null}
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

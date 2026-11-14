import { useState } from "react";
import { cards } from "../content/cards.ts";
import { loadMisses, withoutMiss, writeMisses, type MissRow } from "../lib/missBook.ts";
import { A } from "../lib/route.tsx";
import { useSlice } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

export function MissPage() {
  const lang = useLang();
  const [rows, setRows] = useState<MissRow[]>(loadMisses);
  const wrong = useSlice((data) => data.wrong);
  const byTopic = new Map<string, number>();
  for (const key of Object.keys(wrong)) {
    const topic = key.split(":")[0] ?? "";
    if (!topic) continue;
    byTopic.set(topic, (byTopic.get(topic) ?? 0) + 1);
  }
  const total = rows.length + [...byTopic.values()].reduce((sum, count) => sum + count, 0);

  const clear = (id: string) => {
    const next = withoutMiss(rows, id);
    setRows(next);
    writeMisses(next);
  };

  return (
    <PageFrame
      kicker={t(lang, "Sổ lỗi", "Miss book")}
      title={t(lang, "Những câu còn sai", "Questions still wrong")}
      lead={t(lang, "Mọi câu bạn từng làm sai trong Đề tổng hợp, và số câu sai trong từng chuyên đề. Làm lại một câu cho đến khi đúng thì câu đó rời khỏi sổ.", "Misses from the mixed drill, and the count of misses on each topic sheet.")}
    >
      {total === 0 ? (
        <div className="miss-empty">
          <p>{t(lang, "Chưa có câu sai nào. Làm vài câu rồi quay lại đây.", "No misses yet. Answer a few questions, then come back here.")}</p>
          <A className="practice-link" href="/luyen">{t(lang, "Mở Đề tổng hợp", "Open the mixed drill")}</A>
        </div>
      ) : null}
      {rows.length > 0 ? (
        <section className="stream">
          <h2>{t(lang, `Đề luyện (${rows.length})`, `Mixed drill (${rows.length})`)}</h2>
          <ul className="misses">
            {rows.map((row) => (
              <li key={row.id} className="mistake">
                <p><b>{row.topic}.</b> {row.prompt}</p>
                <p className="miss-line">{t(lang, "Đã chọn:", "You chose:")} {row.chosen}</p>
                <p className="miss-line">{t(lang, "Đáp án:", "Answer:")} {row.answer}</p>
                <ol className="steps">{row.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                <div className="miss-actions">
                  <A href={row.href}>{t(lang, "Ôn trong tờ", "Review on the sheet")}</A>
                  <button type="button" className="text-btn" onClick={() => clear(row.id)}>{t(lang, "Đã hiểu", "Got it")}</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {byTopic.size > 0 ? (
        <section className="stream">
          <h2>{t(lang, "Theo từng tờ", "By topic sheet")}</h2>
          <ul className="misses">
            {[...byTopic.entries()].map(([id, count]) => {
              const card = cards.find((item) => item.id === id);
              return (
                <li key={id} className="mistake miss-topic">
                  <p>{(lang === "en" ? card?.titleEn : card?.title) ?? id}: {t(lang, `${count} câu`, `${count} questions`)}</p>
                  <A href={`/t/${id}?tab=so`}>{t(lang, "Mở sổ tờ này", "Open this sheet's notebook")}</A>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </PageFrame>
  );
}

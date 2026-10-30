import { useState } from "react";
import { cards } from "../content/cards.ts";
import { loadMisses, withoutMiss, writeMisses, type MissRow } from "../lib/missBook.ts";
import { A } from "../lib/route.tsx";
import { useSlice } from "../lib/store.ts";
import { PageFrame } from "../ui/PageFrame.tsx";

export function MissPage() {
  const [rows, setRows] = useState<MissRow[]>(loadMisses);
  const wrong = useSlice((data) => data.wrong);
  const byTopic = new Map<string, number>();
  for (const key of Object.keys(wrong)) {
    const topic = key.split(":")[0] ?? "";
    if (!topic) continue;
    byTopic.set(topic, (byTopic.get(topic) ?? 0) + 1);
  }

  const clear = (id: string) => {
    const next = withoutMiss(rows, id);
    setRows(next);
    writeMisses(next);
  };

  return (
    <PageFrame
      kicker="Sổ lỗi"
      title="Những câu còn sai"
      lead="Đề 14 câu ghi ở đây. Câu sai trong từng tờ vẫn nằm trong Sổ của tờ đó."
    >
      <h2>Đề dùng chung</h2>
      {rows.length === 0 ? <p className="empty">Chưa có câu sai trong đề 14 câu.</p> : (
        <ul className="misses">
          {rows.map((row) => (
            <li key={row.id} className="mistake">
              <p><b>{row.topic}.</b> {row.prompt}</p>
              <p className="miss-line">Đã chọn: {row.chosen}</p>
              <p className="miss-line">Đáp án: {row.answer}</p>
              <ol className="steps">{row.steps.map((step) => <li key={step}>{step}</li>)}</ol>
              <A href={row.href}>Ôn trong tờ</A>{" "}
              <button type="button" className="text-btn" onClick={() => clear(row.id)}>Đã hiểu</button>
            </li>
          ))}
        </ul>
      )}
      <h2>Theo từng tờ</h2>
      {byTopic.size === 0 ? <p className="empty">Chưa có câu sai trong các tờ.</p> : (
        <ul className="misses">
          {[...byTopic.entries()].map(([id, count]) => {
            const card = cards.find((item) => item.id === id);
            return (
              <li key={id} className="mistake">
                <p>{card?.title ?? id}: {count} câu</p>
                <A href={`/t/${id}?tab=so`}>Mở sổ tờ này</A>
              </li>
            );
          })}
        </ul>
      )}
    </PageFrame>
  );
}

import { thinkByTopic } from "../content/think/index.ts";
import { t } from "../lib/text.ts";
import { ThinkCard } from "../ui/ThinkCard.tsx";
import { useLang } from "../ui/useLang.ts";

/** Four thinking and creative problems for a topic, under the practice questions. */
export function ThinkSet({ topicId }: { topicId: string }) {
  const lang = useLang();
  const list = thinkByTopic[topicId];
  if (!list || list.length === 0) return null;
  return (
    <section className="think-set" aria-labelledby="think-title">
      <h2 id="think-title">{t(lang, "Tư duy và sáng tạo", "Thinking and creating")}</h2>
      <p className="note">{t(lang, "Bốn bài không chỉ tính toán: tìm lỗi sai, tìm phản ví dụ, tự ra đề, thử nhiều cách.", "Four problems beyond computing: spot the error, find a counterexample, pose your own problem, try more than one way.")}</p>
      {list.map((item, i) => <ThinkCard key={item.title.vi} item={item} index={i + 1} />)}
    </section>
  );
}

import { useState } from "react";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/useLang.ts";
import { advanced } from "./levels.ts";

export function SangTao({ topicId }: { topicId: string }) {
  const lang = useLang();
  const item = advanced[topicId];
  const [open, setOpen] = useState(0);
  if (!item) return null;
  return (
    <section className="sang-tao">
      <h2>{t(lang, "Sáng tạo", "Create")} <small className="lecture-note">· {t(lang, "Nâng cao", "Further")}</small></h2>
      {item.lines.map((line) => (
        <p key={line}><MathText text={line} /></p>
      ))}
      <p><b>{t(lang, "Bài tự giải.", "Try this.")}</b> <MathText text={item.drill} /></p>
      <div className="read-switch">
        <button type="button" onClick={() => setOpen(open >= 1 ? 0 : 1)}>{t(lang, "Gợi ý nhẹ", "Light hint")}</button>
        <button type="button" onClick={() => setOpen(open >= item.steps.length ? 0 : item.steps.length)}>
          {t(lang, "Lời giải", "Solution")}
        </button>
      </div>
      {open > 0 ? (
        <ol className="steps">
          {item.steps.slice(0, open).map((step) => (
            <li key={step}><MathText text={step} /></li>
          ))}
        </ol>
      ) : null}
      {open > 0 && open < item.steps.length ? (
        <button type="button" className="text-btn" onClick={() => setOpen(open + 1)}>{t(lang, "Bước tiếp", "Next step")}</button>
      ) : null}
      {open >= item.steps.length ? <p><b>{t(lang, "Đáp số:", "Answer:")}</b> <MathText text={item.answer} /></p> : null}
    </section>
  );
}

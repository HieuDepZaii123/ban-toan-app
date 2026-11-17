import { useState } from "react";
import { KIND_LABEL, type Think } from "../content/think/index.ts";
import { t } from "../lib/text.ts";
import { MathText } from "./MathText.tsx";
import { useLang } from "./useLang.ts";

/** One thinking or creative problem: try first, then a light hint, then the steps one by one, then the answer. */
export function ThinkCard({ item, index }: { item: Think; index: number }) {
  const lang = useLang();
  const en = lang === "en";
  const say = (text: { vi: string; en: string }) => (en ? text.en : text.vi);
  const [hint, setHint] = useState(false);
  const [shown, setShown] = useState(0);
  const last = item.steps.length;
  return (
    <section className="think-card tool-card">
      <h3>
        <span className={`think-kind kind-${item.kind}`}>{say(KIND_LABEL[item.kind])}</span>
        <b>{index}.</b> <MathText text={say(item.title)} />
      </h3>
      <p className="think-prompt"><MathText text={say(item.prompt)} /></p>
      <p className="note">{t(lang, "Hãy tự nghĩ trước khi mở gợi ý.", "Think for yourself before opening the hint.")}</p>
      <div className="read-switch">
        <button type="button" aria-expanded={hint} onClick={() => setHint(!hint)}>{t(lang, "Gợi ý nhẹ", "Light hint")}</button>
        <button type="button" onClick={() => setShown(shown === 0 ? 1 : shown > last ? 0 : shown + 1)}>
          {shown === 0 ? t(lang, "Xem lời giải", "Show the solution") : shown <= last ? t(lang, "Bước tiếp", "Next step") : t(lang, "Ẩn lời giải", "Hide solution")}
        </button>
      </div>
      {hint ? <p className="note think-hint"><MathText text={say(item.hint)} /></p> : null}
      {shown > 0 ? (
        <ol className="steps">
          {item.steps.slice(0, Math.min(shown, last)).map((step) => (
            <li key={step.vi}><MathText text={say(step)} /></li>
          ))}
        </ol>
      ) : null}
      {shown > last ? <p><b>{t(lang, "Đáp số.", "Answer.")}</b> <MathText text={say(item.answer)} /></p> : null}
    </section>
  );
}

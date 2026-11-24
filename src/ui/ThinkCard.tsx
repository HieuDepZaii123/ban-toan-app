import { useId, useState } from "react";
import { KIND_LABEL, type Think } from "../content/think/index.ts";
import { t } from "../lib/text.ts";
import { MathText } from "./MathText.tsx";
import { useLang } from "./useLang.ts";

/** One thinking or creative problem: try first, then a light hint, then the steps one by one, then the answer. */
export function ThinkCard({ item, index }: { item: Think; index: number }) {
  const lang = useLang();
  const en = lang === "en";
  const say = (text: { vi: string; en: string }) => (en ? text.en : text.vi);
  const uid = useId();
  const [hint, setHint] = useState(false);
  const [shown, setShown] = useState(0);
  const [draft, setDraft] = useState("");
  const last = item.steps.length;
  /** Estimating and posing your own problem ask for a commitment in writing before the model solution opens. */
  const needsDraft = item.kind === "estimate" || item.kind === "design";
  const locked = needsDraft && shown === 0 && draft.trim().length < 3;
  const draftLabel =
    item.kind === "design"
      ? t(lang, "Đề của bạn và lời giải của bạn", "Your own problem and your solution")
      : item.kind === "estimate"
        ? t(lang, "Ước lượng của bạn, viết trước khi xem", "Your estimate, written before you look")
        : t(lang, "Ô nháp", "Scratch space");
  return (
    <section className="think-card tool-card">
      <h3>
        <span className={`think-kind kind-${item.kind}`}>{say(KIND_LABEL[item.kind])}</span>
        <b>{index}.</b> <MathText text={say(item.title)} />
      </h3>
      <p className="think-prompt"><MathText text={say(item.prompt)} /></p>
      {item.kind === "design" ? (
        <p className="note">{t(lang, "Đổi các số trong đề thành số của riêng bạn rồi tự giải. Lời giải mẫu bên dưới chỉ là một trong nhiều đáp án đúng.", "Change the numbers in the problem to numbers of your own and solve it. The model solution below is only one of many right answers.")}</p>
      ) : (
        <p className="note">{t(lang, "Hãy tự nghĩ trước khi mở gợi ý.", "Think for yourself before opening the hint.")}</p>
      )}
      <label className="think-draft">
        <span>{draftLabel}</span>
        <textarea value={draft} rows={needsDraft ? 3 : 2} maxLength={600} onChange={(event) => setDraft(event.target.value)} />
      </label>
      {locked ? <p className="note">{t(lang, "Viết vài chữ vào ô trên rồi mới xem lời giải.", "Write a few words in the box above before the solution opens.")}</p> : null}
      <div className="read-switch">
        <button type="button" aria-expanded={hint} aria-controls={`${uid}-hint`} onClick={() => setHint(!hint)}>{t(lang, "Gợi ý nhẹ", "Light hint")}</button>
        <button type="button" disabled={locked} aria-expanded={shown > 0} aria-controls={`${uid}-steps`} onClick={() => setShown(shown === 0 ? 1 : shown > last ? 0 : shown + 1)}>
          {shown === 0 ? t(lang, "Xem lời giải", "Show the solution") : shown <= last ? t(lang, "Bước tiếp", "Next step") : t(lang, "Ẩn lời giải", "Hide solution")}
        </button>
      </div>
      {/* One short announcement instead of a live region around the whole list, which would read every step again. */}
      <p className="sr-only" role="status">
        {shown > last
          ? t(lang, "Đã hiện đáp số.", "The answer is shown.")
          : shown > 0
            ? t(lang, `Đã hiện bước ${shown} trên ${last}.`, `Step ${shown} of ${last} shown.`)
            : hint
              ? t(lang, "Đã mở gợi ý.", "Hint opened.")
              : ""}
      </p>
      <div id={`${uid}-hint`}>
        {hint ? <p className="note think-hint"><MathText text={say(item.hint)} /></p> : null}
      </div>
      <div id={`${uid}-steps`}>
      {shown > 0 ? (
        <ol className="steps">
          {item.steps.slice(0, Math.min(shown, last)).map((step) => (
            <li key={step.vi}><MathText text={say(step)} /></li>
          ))}
        </ol>
      ) : null}
      {shown > last ? <p><b>{t(lang, "Đáp số.", "Answer.")}</b> <MathText text={say(item.answer)} /></p> : null}
      </div>
    </section>
  );
}

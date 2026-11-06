import { useEffect, useRef, useState } from "react";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/useLang.ts";
import { GEO_QUIZ, gradeGeo, type GeoItem } from "./geoQuiz.ts";

const KEY = "ban-toan-geo-quiz";

function load(): { index: number; ok: Record<string, boolean> } {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) || "{}");
    if (!parsed || typeof parsed !== "object") return { index: 0, ok: {} };
    const row = parsed as { index?: unknown; ok?: unknown };
    const index = typeof row.index === "number" && row.index >= 0 && row.index < GEO_QUIZ.length ? row.index : 0;
    const ok: Record<string, boolean> = {};
    if (row.ok && typeof row.ok === "object") {
      for (const [id, value] of Object.entries(row.ok)) {
        if (value === true) ok[id] = true;
      }
    }
    return { index, ok };
  } catch {
    return { index: 0, ok: {} };
  }
}

export function GeoQuiz({ onShow }: { onShow: (item: GeoItem) => void }) {
  const saved = useState(load)[0];
  const [index, setIndex] = useState(saved.index);
  const [ok, setOk] = useState(saved.ok);
  const [note, setNote] = useState("");
  const [draft, setDraft] = useState("");
  const lang = useLang();
  const show = useRef(onShow);
  show.current = onShow;
  const item = GEO_QUIZ[index]!;
  const score = GEO_QUIZ.filter((row) => ok[row.id]).length;

  useEffect(() => {
    show.current(GEO_QUIZ[index]!);
    try { localStorage.setItem(KEY, JSON.stringify({ index, ok })); } catch { /* ignore */ }
  }, [index, ok]);

  const mark = (right: boolean) => {
    setOk((prev) => (prev[item.id] ? prev : { ...prev, [item.id]: right }));
    setNote(right ? "Đúng." : "Chưa đúng.");
  };

  return (
    <section className="tool-card" aria-label="Luyện đề hình">
      <p className="kicker">{t(lang, "Luyện đề hình", "Geometry set")}</p>
      <p className="lecture-note">{t(lang, `Bài ${index + 1}/${GEO_QUIZ.length} · Điểm ${score}/${GEO_QUIZ.length}. Hình phía trên lấy đúng kích thước của đề.`, `Item ${index + 1}/${GEO_QUIZ.length} · Score ${score}/${GEO_QUIZ.length}. The figure above uses this item's sizes.`)}</p>
      <h2><MathText text={item.prompt} /></h2>
      {item.choices ? (
        <div className="choices" role="group" aria-label="Các lựa chọn">
          {item.choices.map((choice, choiceIndex) => (
            <button key={choice} type="button" className="choice" onClick={() => mark(gradeGeo(item, { choice: choiceIndex }))}>
              <span className="key">{String.fromCharCode(65 + choiceIndex)}</span>
              <span className="choice-body"><MathText text={choice} /></span>
            </button>
          ))}
        </div>
      ) : (
        <div className="read-switch">
          <label>{t(lang, "Đáp số", "Answer")}
            <input value={draft} inputMode="decimal" aria-label={t(lang, "Đáp số của bạn", "Your answer")} onChange={(event) => setDraft(event.target.value)} />
          </label>
          <button type="button" onClick={() => mark(gradeGeo(item, { value: Number(draft.replace(",", ".")) }))}>{t(lang, "Chấm", "Mark")}</button>
        </div>
      )}
      {note ? (
        <div className="solution">
          <p><b>{note === "Đúng." ? t(lang, "Đúng.", "Right.") : t(lang, "Chưa đúng.", "Not yet.")}</b> {t(lang, "Điểm", "Score")} {score}/{GEO_QUIZ.length}</p>
          <ol className="steps">{item.steps.map((step) => <li key={step}><MathText text={step} /></li>)}</ol>
        </div>
      ) : null}
      <div className="read-switch">
        <button type="button" onClick={() => { setNote(""); setDraft(""); setIndex((index + GEO_QUIZ.length - 1) % GEO_QUIZ.length); }}>{t(lang, "Bài trước", "Previous")}</button>
        <button type="button" onClick={() => { setNote(""); setDraft(""); setIndex((index + 1) % GEO_QUIZ.length); }}>{t(lang, "Bài sau", "Next")}</button>
      </div>
    </section>
  );
}

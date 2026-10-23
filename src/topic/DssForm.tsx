import { useState } from "react";
import type { Question, Verdict } from "../content/types.ts";
import { questionKey, recordDss, useSlice } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/useLang.ts";

const CODE: Record<Verdict, 0 | 1 | 2> = { dung: 0, sai: 1, thieu: 2 };

const LABELS = [
  ["Đúng", "True"],
  ["Sai", "False"],
  ["Chưa đủ", "Not enough"],
] as const;

function asPicks(picks: readonly (number | null)[]): [number, number, number, number] | null {
  const a = picks[0];
  const b = picks[1];
  const c = picks[2];
  const d = picks[3];
  if (typeof a !== "number" || typeof b !== "number" || typeof c !== "number" || typeof d !== "number") return null;
  return [a, b, c, d];
}

export function DssForm({ topicId, question }: { topicId: string; question: Question }) {
  const lang = useLang();
  const verdicts = question.verdicts;
  const saved = useSlice((data) => data.scores[questionKey(topicId, question.id)]);
  const [draft, setDraft] = useState<(number | null)[]>([null, null, null, null]);
  const locked = saved !== undefined;
  const picks = locked ? saved.picks : draft;
  const choices = lang === "en" ? question.choicesEn : question.choices;
  const reasons = lang === "en" ? question.reasonsEn : question.reasons;

  function choose(index: number, code: number): void {
    if (locked || !verdicts) return;
    const next = draft.map((pick, place) => (place === index ? code : pick));
    setDraft(next);
    const done = asPicks(next);
    if (done) recordDss(topicId, question.id, done, verdicts);
  }

  const score = saved?.score;
  const status = score === undefined
    ? ""
    : t(lang, `Điểm ${score}/4`, `Score ${score}/4`);

  return (
    <div className="dss-list">
      {choices.map((choice, index) => {
        const verdict = verdicts?.[index];
        const pick = picks[index];
        return (
          <div key={choice} className="dss-item">
            <p className="dss-stmt" id={`dss-stmt-${question.id}-${index}`}><MathText text={choice} /></p>
            <div
              role="radiogroup"
              aria-labelledby={`dss-stmt-${question.id}-${index}`}
              className="dss-options"
              onKeyDown={(event) => {
                if (event.key < "1" || event.key > "3") return;
                event.preventDefault();
                choose(index, Number(event.key) - 1);
              }}
            >
              {LABELS.map(([vi, en], code) => {
                const mark = !locked || verdict === undefined
                  ? ""
                  : code === CODE[verdict]
                    ? " is-right"
                    : pick === code
                      ? " is-wrong"
                      : "";
                return (
                  <label key={vi} className={`dss-opt${mark}`}>
                    <input
                      type="radio"
                      name={`dss-${question.id}-${index}`}
                      value={code}
                      checked={pick === code}
                      disabled={locked}
                      onChange={() => choose(index, code)}
                    />
                    <span className="key">{code + 1}</span>
                    {t(lang, vi, en)}
                  </label>
                );
              })}
            </div>
            {locked && reasons?.[index] ? (
              <p className="dss-reason"><MathText text={reasons[index] ?? ""} /></p>
            ) : null}
          </div>
        );
      })}
      <p className="status" role="status" aria-live="polite">{status}</p>
      {locked ? null : (
        <p className="note">{t(
          lang,
          "Mỗi mệnh đề chọn một trong ba: Đúng, Sai, hoặc Chưa đủ. Phím 1–3 khi đang ở nhóm đó. Đủ bốn mệnh đề thì hiện lý do và điểm x/4.",
          "Mark each statement true, false, or not enough. Keys 1–3 work inside that group. After all four, the reason and the score x/4 appear.",
        )}</p>
      )}
    </div>
  );
}

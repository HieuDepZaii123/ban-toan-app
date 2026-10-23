import { useEffect, useState } from "react";
import type { Question } from "../content/types.ts";
import type { Vary } from "../content/vary/types.ts";
import { mulberry32 } from "../lib/prng.ts";
import { useRoute } from "../lib/useRoute.ts";
import { ensureAttempt, questionKey, recordAnswer, resetAttempt, useSlice } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/useLang.ts";
import { DssForm } from "./DssForm.tsx";
import { arrange, sessionQuestions } from "./show.ts";

export function Practice({ topicId, questions, vary }: { topicId: string; questions: Question[]; vary: Vary[] }) {
  const lang = useLang();
  const { search, go } = useRoute();
  const qid = new URLSearchParams(search).get("q");
  const [ordered] = useState(() => sessionQuestions(topicId, questions));
  const found = ordered.findIndex((item) => item.id === qid);
  const index = found >= 0 ? found : 0;
  const question = ordered[index];
  const spec = question ? vary.find((item) => item.id === question.id) : undefined;
  const key = question ? questionKey(topicId, question.id) : "";
  const attempt = useSlice((data) => (key === "" ? undefined : data.attempts[key]));
  const picked = useSlice((data) => {
    if (key === "") return -1;
    if (data.right[key]) return data.attempts[key]?.pos ?? -1;
    const wrong = data.wrong[key];
    return typeof wrong === "number" ? wrong : -1;
  });
  const [hintFor, setHintFor] = useState<string | null>(null);

  useEffect(() => {
    if (!question) return;
    ensureAttempt(questionKey(topicId, question.id));
  }, [topicId, question]);

  useEffect(() => {
    if (!question || !attempt || !spec || question.kind === "dss") return;
    const shown = arrange(spec.draw(mulberry32(attempt.seed)).stem, attempt.pos, attempt.seed);
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
      if (event.key < "1" || event.key > "4") return;
      const display = Number(event.key) - 1;
      if (display < 0 || display > 3) return;
      event.preventDefault();
      recordAnswer(topicId, question.id, display, display === shown.answer);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [question, topicId, attempt, spec]);

  if (!question) {
    return <p className="empty">{t(lang, "Tờ này chưa có câu.", "This sheet has no questions yet.")}</p>;
  }
  if (!spec) {
    return <p className="empty">{t(lang, "Không dựng được câu này.", "This question could not be built.")}</p>;
  }
  if (!attempt) {
    return <p className="loading">{t(lang, "Đang mở câu…", "Opening this question…")}</p>;
  }

  const shown = arrange(spec.draw(mulberry32(attempt.seed)).stem, attempt.pos, attempt.seed);
  const prompt = lang === "en" ? shown.promptEn : shown.prompt;
  const choices = lang === "en" ? shown.choicesEn : shown.choices;
  const steps = lang === "en" ? shown.stepsEn : shown.steps;
  const hint = lang === "en" ? shown.hintEn : shown.hint;
  const hintOpen = hintFor === question.id;
  const dss = shown.kind === "dss" && shown.verdicts !== undefined;
  const answered = !dss && picked >= 0;
  const choiceNo = picked + 1;
  const statusText = !answered
    ? ""
    : picked === shown.answer
      ? t(lang, `Đúng. Đã chọn ${choiceNo}.`, `Correct. Chose ${choiceNo}.`)
      : t(lang, `Chưa đúng. Đã chọn ${choiceNo}.`, `Not yet. Chose ${choiceNo}.`);

  return (
    <section className="practice" aria-labelledby="practice-title">
      <p className="kicker">
        {shown.kind === "concept" ? <span className="theory-tag">{t(lang, "Lý thuyết", "Concept")}</span> : null}
        {shown.kind === "dss" ? <span className="theory-tag">{t(lang, "Đúng/Sai/Chưa đủ", "True/False/Not enough")}</span> : null}
        {t(lang, `Câu ${index + 1} / ${ordered.length}`, `Question ${index + 1} / ${ordered.length}`)}
      </p>
      <h2 id="practice-title"><MathText text={prompt} /></h2>
      {dss ? <DssForm key={`${question.id}:${attempt.seed}`} topicId={topicId} question={shown} /> : <div className="choices" role="group" aria-label={t(lang, "Đáp án", "Choices")}>
        {choices.map((choice, displayIndex) => {
          const state = !answered ? "" : displayIndex === shown.answer ? " is-right" : displayIndex === picked ? " is-wrong" : "";
          return (
            <button
              key={displayIndex}
              type="button"
              className={`choice${state}`}
              data-choice={displayIndex}
              aria-pressed={answered && displayIndex === picked}
              onClick={() => recordAnswer(topicId, question.id, displayIndex, displayIndex === shown.answer)}
            >
              <span className="key">{displayIndex + 1}</span>
              <span className="choice-body"><MathText text={choice} /></span>
            </button>
          );
        })}
      </div>}
      <div className="practice-nav">
        <button type="button" className="text-btn" aria-expanded={hintOpen} onClick={() => setHintFor(hintOpen ? null : question.id)}>
          {hintOpen ? t(lang, "Giấu gợi ý", "Hide hint") : t(lang, "Gợi ý", "Hint")}
        </button>
        <button type="button" className="text-btn" onClick={() => resetAttempt(key)}>
          {t(lang, "Đề mới", shown.kind === "concept" || shown.kind === "dss" ? "New draw" : "New numbers")}
        </button>
        <button
          type="button"
          className="text-btn"
          onClick={() => {
            const next = ordered[(index + 1) % ordered.length];
            if (!next) return;
            go(`/t/${topicId}?tab=lam&q=${next.id}`, "replace");
          }}
        >
          {t(lang, "Câu sau", "Next")}
        </button>
      </div>
      {hintOpen ? <p className="hint"><MathText text={hint} /></p> : null}
      {dss ? null : <p className="status" role="status" aria-live="polite">{statusText}</p>}
      {dss ? null : answered ? (
        <div className="solution">
          <ol>
            {steps.map((step) => (
              <li key={step}><MathText text={step} /></li>
            ))}
          </ol>
        </div>
      ) : (
        <p className="note">{shown.kind === "concept"
          ? t(lang, "Phím 1–4 chọn đáp án. Đề mới rút mệnh đề khác. Câu chọn nhầm được giữ trong Sổ cho đến khi làm đúng.", "Keys 1–4 pick an answer. New draw changes the statements. A miss stays in the notebook until you get it right.")
          : t(lang, "Phím 1–4 chọn đáp án. Đề mới đổi các số. Câu chọn nhầm được giữ trong Sổ cho đến khi làm đúng.", "Keys 1–4 pick an answer. New numbers draws again. A miss stays in the notebook until you get it right.")}</p>
      )}
    </section>
  );
}

import { useEffect, useState } from "react";
import type { Question } from "../content/types.ts";
import { useRoute } from "../lib/route.tsx";
import { questionKey, recordAnswer, useSlice } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/Prefs.tsx";

export function Practice({ topicId, questions }: { topicId: string; questions: Question[] }) {
  const lang = useLang();
  const { search, go } = useRoute();
  const qid = new URLSearchParams(search).get("q");
  const found = questions.findIndex((item) => item.id === qid);
  const index = found >= 0 ? found : 0;
  const question = questions[index];
  const [hintOpen, setHintOpen] = useState(false);

  useEffect(() => {
    setHintOpen(false);
  }, [question?.id]);

  const picked = useSlice((data) => {
    if (!question) return -1;
    const key = questionKey(topicId, question.id);
    if (data.right[key]) return question.answer;
    const wrong = data.wrong[key];
    return typeof wrong === "number" ? wrong : -1;
  });

  useEffect(() => {
    if (!question) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
      if (event.key < "1" || event.key > "4") return;
      event.preventDefault();
      const choice = Number(event.key) - 1;
      recordAnswer(topicId, question.id, choice, choice === question.answer);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [question, topicId]);

  if (!question) {
    return <p className="empty">{t(lang, "Tờ này chưa có câu.", "This sheet has no questions yet.")}</p>;
  }

  const prompt = lang === "en" ? question.promptEn : question.prompt;
  const choices = lang === "en" ? question.choicesEn : question.choices;
  const steps = lang === "en" ? question.stepsEn : question.steps;
  const hint = lang === "en" ? question.hintEn : question.hint;
  const answered = picked >= 0;

  return (
    <section className="practice" aria-labelledby="practice-title">
      <p className="kicker">{t(lang, `Câu ${index + 1} / ${questions.length}`, `Question ${index + 1} / ${questions.length}`)}</p>
      <h2 id="practice-title"><MathText text={prompt} /></h2>
      <div className="choices" role="group" aria-label={t(lang, "Đáp án", "Choices")}>
        {choices.map((choice, choiceIndex) => {
          const state = !answered ? "" : choiceIndex === question.answer ? " is-right" : choiceIndex === picked ? " is-wrong" : "";
          return (
            <button
              key={choiceIndex}
              type="button"
              className={`choice${state}`}
              data-choice={choiceIndex}
              onClick={() => recordAnswer(topicId, question.id, choiceIndex, choiceIndex === question.answer)}
            >
              <span className="key">{choiceIndex + 1}</span>
              <span className="choice-body"><MathText text={choice} /></span>
            </button>
          );
        })}
      </div>
      <div className="practice-nav">
        <button type="button" className="text-btn" aria-expanded={hintOpen} onClick={() => setHintOpen((open) => !open)}>
          {hintOpen ? t(lang, "Giấu gợi ý", "Hide hint") : t(lang, "Gợi ý", "Hint")}
        </button>
        <button
          type="button"
          className="text-btn"
          onClick={() => {
            const next = questions[(index + 1) % questions.length];
            if (!next) return;
            go(`/t/${topicId}?tab=lam&q=${next.id}`, "replace");
          }}
        >
          {t(lang, "Câu sau", "Next")}
        </button>
      </div>
      {hintOpen ? <p className="hint"><MathText text={hint} /></p> : null}
      {answered ? (
        <div className="solution">
          <p className="status" role="status" aria-live="polite">{picked === question.answer ? t(lang, "Đúng", "Correct") : t(lang, "Chưa đúng", "Not yet")}</p>
          <ol>
            {steps.map((step) => (
              <li key={step}><MathText text={step} /></li>
            ))}
          </ol>
        </div>
      ) : (
        <p className="note">{t(lang, "Phím 1–4 chọn đáp án. Câu chọn nhầm được giữ trong Sổ cho đến khi làm đúng.", "Keys 1–4 pick an answer. A miss stays in the notebook until you get it right.")}</p>
      )}
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import type { Question } from "../content/types.ts";
import type { Vary } from "../content/vary/types.ts";
import { mulberry32 } from "../lib/prng.ts";
import { useRoute } from "../lib/useRoute.ts";
import { answeredNow, countRight, ensureAttempt, getData, questionKey, recordAnswer, resetAttempt, useSlice } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { openChat } from "../ui/events.ts";
import { MathText } from "../ui/MathText.tsx";
import { readPref } from "../ui/prefs.ts";
import { useLang } from "../ui/useLang.ts";
import { DssForm } from "./DssForm.tsx";
import { arrange, sessionQuestions } from "./show.ts";

/** Lần chọn sai đầu tiên của lượt đang hiện. Chưa ghi vào sổ: người học được thử thêm một lần có gợi ý. */
type Miss = { at: string; choice: number; second?: number };

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
    if (key === "" || !answeredNow(data, key)) return -1;
    if (data.right[key]) return data.attempts[key]?.pos ?? -1;
    const wrong = data.wrong[key];
    return typeof wrong === "number" ? wrong : -1;
  });
  const [hintFor, setHintFor] = useState<string | null>(null);
  const [miss, setMiss] = useState<Miss | null>(null);
  const saved = useSlice((data) => countRight(data.right, topicId));
  const heading = useRef<HTMLHeadingElement>(null);
  const status = useRef<HTMLParagraphElement>(null);
  const moved = useRef(false);
  const acted = useRef(false);

  const shown = question && spec && attempt ? arrange(spec.draw(mulberry32(attempt.seed)).stem, attempt.pos, attempt.seed) : null;
  const dss = shown !== null && shown.kind === "dss" && shown.verdicts !== undefined;
  const turn = question && attempt ? `${question.id}:${attempt.seed}` : "";
  const firstMiss = miss && miss.at === turn ? miss : null;
  const answered = shown !== null && !dss && picked >= 0;

  /** Chọn đáp án. Đúng ngay thì ghi đúng; sai lần đầu thì mở gợi ý và cho thử lại; lần hai mới ghi và hiện lời giải. */
  const pick = (display: number): boolean => {
    if (!question || !shown || dss || key === "" || display < 0 || display > 3) return false;
    if (answeredNow(getData(), key)) return false;
    acted.current = true;
    if (!firstMiss) {
      if (display === shown.answer) recordAnswer(topicId, question.id, display, true);
      else {
        setMiss({ at: turn, choice: display });
        setHintFor(question.id);
      }
      return true;
    }
    if (display === firstMiss.choice) return true;
    setMiss({ ...firstMiss, second: display });
    recordAnswer(topicId, question.id, firstMiss.choice, false);
    return true;
  };
  const pickRef = useRef(pick);
  useEffect(() => {
    pickRef.current = pick;
  });

  useEffect(() => {
    if (!question) return;
    ensureAttempt(questionKey(topicId, question.id));
  }, [topicId, question]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return;
      if (event.key < "1" || event.key > "4") return;
      // Phím tắt một ký tự tắt được trong Tùy chọn, và không chạy khi một hộp thoại đang mở.
      if (readPref("bt-keys") === "off" || document.querySelector('[role="dialog"]')) return;
      if (pickRef.current(Number(event.key) - 1)) event.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Sang câu khác hoặc đổi đề: đưa tiêu điểm về đề bài để trình đọc màn hình đọc câu mới.
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    heading.current?.focus();
  }, [turn]);

  // Vừa trả lời xong: đưa tiêu điểm tới dòng kết quả, ngay trên lời giải.
  useEffect(() => {
    if (!answered || !acted.current) return;
    acted.current = false;
    status.current?.focus();
  }, [answered]);

  if (!question) {
    return <p className="empty">{t(lang, "Tờ này chưa có câu.", "This sheet has no questions yet.")}</p>;
  }
  if (!spec) {
    return <p className="empty">{t(lang, "Không dựng được câu này.", "This question could not be built.")}</p>;
  }
  if (!attempt || !shown) {
    return <p className="loading">{t(lang, "Đang mở câu…", "Opening this question…")}</p>;
  }

  const prompt = lang === "en" ? shown.promptEn : shown.prompt;
  const choices = lang === "en" ? shown.choicesEn : shown.choices;
  const steps = lang === "en" ? shown.stepsEn : shown.steps;
  const hint = lang === "en" ? shown.hintEn : shown.hint;
  const hintOpen = hintFor === question.id;
  const retry = !answered && firstMiss !== null;
  const last = firstMiss?.second ?? picked;
  const right = shown.answer + 1;
  const statusText = retry
    ? t(lang, "Chưa đúng. Đọc gợi ý bên dưới rồi thử thêm một lần.", "Not yet. Read the hint below and try once more.")
    : !answered
      ? ""
      : firstMiss?.second === undefined && picked === shown.answer
        ? t(lang, `Đúng. Bạn chọn ${right}.`, `Correct. You chose ${right}.`)
        : firstMiss?.second === shown.answer
          ? t(lang, `Đúng ở lần thứ hai: đáp án ${right}. Câu này được giữ trong Sổ để ôn lại.`, `Right on the second try: answer ${right}. This question stays in the notebook for review.`)
          : t(lang, `Chưa đúng, không sao. Bạn chọn ${last + 1}, đáp án đúng là ${right}. Xem từng bước bên dưới, rồi bấm Đề mới để thử lại với số khác.`, `Not this time, and that is fine. You chose ${last + 1}; the answer is ${right}. Read the steps below, then press New numbers to try again.`);

  return (
    <section className="practice" aria-labelledby="practice-title">
      <p className="kicker">
        {shown.kind === "concept" ? <span className="theory-tag">{t(lang, "Lý thuyết", "Concept")}</span> : null}
        {shown.kind === "dss" ? <span className="theory-tag">{t(lang, "Đúng/Sai/Chưa đủ", "True/False/Not enough")}</span> : null}
        {t(lang, `Câu ${index + 1} / ${ordered.length} · Điểm ${Math.min(saved, ordered.length)}/${ordered.length}`, `Question ${index + 1} / ${ordered.length} · Score ${Math.min(saved, ordered.length)}/${ordered.length}`)}
      </p>
      <h2 id="practice-title" ref={heading} tabIndex={-1}><MathText text={prompt} /></h2>
      {dss ? <DssForm key={`${question.id}:${attempt.seed}`} topicId={topicId} question={shown} /> : <div className="choices" role="group" aria-label={t(lang, "Đáp án", "Choices")}>
        {choices.map((choice, displayIndex) => {
          const missed = displayIndex === firstMiss?.choice || (answered && (displayIndex === picked || displayIndex === firstMiss?.second) && displayIndex !== shown.answer);
          const state = answered && displayIndex === shown.answer ? " is-right" : missed ? " is-wrong" : "";
          const locked = answered || displayIndex === firstMiss?.choice;
          return (
            <button
              key={displayIndex}
              type="button"
              className={`choice${state}`}
              data-choice={displayIndex}
              aria-pressed={answered && displayIndex === last}
              aria-disabled={locked}
              onClick={() => {
                if (!locked) pick(displayIndex);
              }}
            >
              <span className="key">{displayIndex + 1}</span>
              <span className="choice-body"><MathText text={choice} /></span>
              {state ? <span className="sr">{state === " is-right" ? t(lang, " (đáp án đúng)", " (correct answer)") : t(lang, " (chưa đúng)", " (not correct)")}</span> : null}
            </button>
          );
        })}
      </div>}
      {dss ? null : <p className="status" role="status" aria-live="polite" ref={status} tabIndex={-1}>{statusText}</p>}
      <div className="practice-nav">
        <button type="button" className="text-btn" aria-expanded={hintOpen} onClick={() => setHintFor(hintOpen ? null : question.id)}>
          {hintOpen ? t(lang, "Giấu gợi ý", "Hide hint") : t(lang, "Gợi ý", "Hint")}
        </button>
        <button
          type="button"
          className="text-btn"
          onClick={() => {
            moved.current = true;
            setHintFor(null);
            resetAttempt(key);
          }}
        >
          {t(lang, "Đề mới", shown.kind === "concept" || shown.kind === "dss" ? "New draw" : "New numbers")}
        </button>
        <button
          type="button"
          className="text-btn"
          onClick={() => {
            const next = ordered[(index + 1) % ordered.length];
            if (!next) return;
            moved.current = true;
            go(`/t/${topicId}?tab=lam&q=${next.id}`, "replace");
          }}
        >
          {t(lang, "Câu sau", "Next")}
        </button>
        <button type="button" className="text-btn" onClick={openChat}>
          {t(lang, "Hỏi trợ lý", "Ask the tutor")}
        </button>
      </div>
      {hintOpen ? <p className="hint"><b>{t(lang, "Gợi ý. ", "Hint. ")}</b><MathText text={hint} /></p> : null}
      {dss ? null : answered ? (
        <div className="solution">
          <b>{t(lang, "Lời giải", "Solution")}</b>
          <ol>
            {steps.map((step) => (
              <li key={step}><MathText text={step} /></li>
            ))}
          </ol>
        </div>
      ) : (
        <p className="note">
          <span className="kbd-only">{t(lang, "Phím 1–4 chọn đáp án. ", "Keys 1–4 pick an answer. ")}</span>
          {shown.kind === "concept"
            ? t(lang, "Chọn sai lần đầu thì được gợi ý và thử thêm một lần. Đề mới rút mệnh đề khác. Câu chọn nhầm được giữ trong Sổ cho đến khi làm đúng.", "A first miss opens the hint and gives one more try. New draw changes the statements. A miss stays in the notebook until you get it right.")
            : t(lang, "Chọn sai lần đầu thì được gợi ý và thử thêm một lần. Đề mới đổi các số. Câu chọn nhầm được giữ trong Sổ cho đến khi làm đúng.", "A first miss opens the hint and gives one more try. New numbers draws again. A miss stays in the notebook until you get it right.")}
        </p>
      )}
    </section>
  );
}

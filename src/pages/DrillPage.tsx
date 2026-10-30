import { useState } from "react";
import { isSharedCorrect, sharedDrill } from "../content/sharedDrill.ts";
import { loadMisses, loadPicks, savePicks, withPick, writeMisses } from "../lib/missBook.ts";
import { A } from "../lib/route.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";

export function DrillPage() {
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState(loadPicks);
  const question = sharedDrill[index]!;
  const picked = picks[question.id];
  const right = Object.entries(picks).filter(([id, choice]) => {
    const at = sharedDrill.findIndex((item) => item.id === id);
    return isSharedCorrect(at, choice);
  }).length;

  const choose = (choice: number) => {
    const next = { ...picks, [question.id]: choice };
    setPicks(next);
    savePicks(next);
    writeMisses(withPick(loadMisses(), question, choice));
  };

  return (
    <PageFrame
      kicker="Luyện tập"
      title="Đề 14 câu"
      lead="Một đề dùng chung, phủ nhiều chuyên đề. Câu chọn nhầm vào Sổ lỗi trên máy này. Sổ từng tờ vẫn giữ riêng."
    >
      <p className="lecture-note">Điểm {right}/{sharedDrill.length} · Câu {index + 1}/{sharedDrill.length}</p>
      <article className="tool-card">
        <p className="kicker">{question.topic}</p>
        <h2>{question.prompt}</h2>
        <div className="choices" role="group" aria-label="Các lựa chọn">
          {question.choices.map((choice, choiceIndex) => {
            const state = picked === undefined ? "" : choiceIndex === question.answer ? " is-right" : picked === choiceIndex ? " is-wrong" : "";
            return (
              <button key={choice} type="button" className={`choice${state}`} disabled={picked !== undefined} onClick={() => choose(choiceIndex)}>
                <span className="key">{String.fromCharCode(65 + choiceIndex)}</span>
                <span className="choice-body">{choice}</span>
              </button>
            );
          })}
        </div>
        {picked !== undefined ? (
          <div className="solution">
            <p><b>{picked === question.answer ? "Đúng." : "Chưa đúng."}</b> Đáp án: {question.choices[question.answer]}</p>
            <ol className="steps">{question.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
        ) : null}
        <div className="read-switch">
          <button type="button" onClick={() => setIndex((index - 1 + sharedDrill.length) % sharedDrill.length)}>Câu trước</button>
          <button type="button" onClick={() => setIndex((index + 1) % sharedDrill.length)}>Câu sau</button>
        </div>
      </article>
      <p><A href="/so-loi">Mở sổ lỗi gộp</A></p>
    </PageFrame>
  );
}

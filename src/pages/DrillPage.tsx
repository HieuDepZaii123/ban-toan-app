import { useEffect, useState } from "react";
import { isSharedCorrect, sharedDrill } from "../content/sharedDrill.ts";
import { DRILL_AT, DRILL_ID, resolveDrillIndex } from "../lib/drillPlace.ts";
import { loadMisses, loadPicks, savePicks, withPick, writeMisses } from "../lib/missBook.ts";
import { mirrorDrill } from "../lib/supabase.ts";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

export function DrillPage() {
  const ids = sharedDrill.map((item) => item.id);
  const [index, setIndex] = useState(() => resolveDrillIndex(ids, localStorage.getItem(DRILL_AT), localStorage.getItem(DRILL_ID)));
  useEffect(() => {
    try {
      localStorage.setItem(DRILL_AT, String(index));
      localStorage.setItem(DRILL_ID, sharedDrill[index]?.id ?? "");
    } catch { /* ignore */ }
  }, [index]);
  const [picks, setPicks] = useState(loadPicks);
  const [onlyWrong, setOnlyWrong] = useState(false);
  const lang = useLang();
  const question = sharedDrill[index]!;
  const picked = picks[question.id];
  const right = sharedDrill.filter((item, at) => isSharedCorrect(at, picks[item.id] ?? -1)).length;
  const answered = sharedDrill.filter((item) => picks[item.id] !== undefined).length;
  const wrongAt = sharedDrill.flatMap((item, at) => (picks[item.id] !== undefined && !isSharedCorrect(at, picks[item.id] ?? -1) ? [at] : []));

  const choose = (choice: number) => {
    const next = { ...picks, [question.id]: choice };
    setPicks(next);
    savePicks(next);
    writeMisses(withPick(loadMisses(), question, choice));
    mirrorDrill(next, index);
  };

  const reset = () => {
    setPicks({});
    savePicks({});
    setIndex(0);
    setOnlyWrong(false);
    mirrorDrill({}, 0);
  };

  const move = (delta: number) => {
    const pool = onlyWrong && wrongAt.length > 0 ? wrongAt : sharedDrill.map((_, at) => at);
    const place = pool.indexOf(index);
    const next = pool[(place + delta + pool.length) % pool.length] ?? pool[0] ?? 0;
    setIndex(next);
  };

  return (
    <PageFrame
      kicker={t(lang, "Luyện tập", "Practice")}
      title={t(lang, `Đề ${sharedDrill.length} câu`, `${sharedDrill.length} questions`)}
      lead={t(lang, "Câu THPT, lời giải nhiều bước. Điểm và chỗ đang làm được giữ trên máy này. Câu sai vào Sổ lỗi.", "Upper-secondary questions with multi-step solutions. Score and place are kept on this device. Missed items go to the miss book.")}
    >
      <p className="lecture-note">{t(lang, `Điểm ${right}/${sharedDrill.length} · Đúng ${right} · Sai ${wrongAt.length} · Chưa làm ${sharedDrill.length - answered} · Tỉ lệ ${answered ? `${Math.round((100 * right) / answered)}%` : "—"} · Câu ${index + 1}/${sharedDrill.length}`, `Score ${right}/${sharedDrill.length} · Right ${right} · Wrong ${wrongAt.length} · Left ${sharedDrill.length - answered} · Rate ${answered ? `${Math.round((100 * right) / answered)}%` : "—"} · Item ${index + 1}/${sharedDrill.length}`)}</p>
      <div className="read-switch">
        <button type="button" aria-pressed={onlyWrong} disabled={wrongAt.length === 0} onClick={() => { setOnlyWrong((value) => !value); if (!onlyWrong && wrongAt[0] !== undefined) setIndex(wrongAt[0]); }}>
          {t(lang, `Ôn câu sai (${wrongAt.length})`, `Review misses (${wrongAt.length})`)}
        </button>
        <button type="button" onClick={reset}>{t(lang, "Xóa tiến độ", "Clear progress")}</button>
      </div>
      <article className="tool-card">
        <p className="kicker">{question.topic}</p>
        <h2><MathText text={question.prompt} /></h2>
        <div className="choices" role="group" aria-label="Các lựa chọn">
          {question.choices.map((choice, choiceIndex) => {
            const state = picked === undefined ? "" : choiceIndex === question.answer ? " is-right" : picked === choiceIndex ? " is-wrong" : "";
            return (
              <button key={choice} type="button" className={`choice${state}`} disabled={picked !== undefined} onClick={() => choose(choiceIndex)}>
                <span className="key">{String.fromCharCode(65 + choiceIndex)}</span>
                <span className="choice-body"><MathText text={choice} /></span>
              </button>
            );
          })}
        </div>
        {picked !== undefined ? (
          <div className="solution">
            <p><b>{picked === question.answer ? t(lang, "Đúng.", "Right.") : t(lang, "Chưa đúng.", "Not yet.")}</b> {t(lang, "Đáp án:", "Answer:")} <MathText text={question.choices[question.answer] ?? ""} /></p>
            <ol className="steps">{question.steps.map((step) => <li key={step}><MathText text={step} /></li>)}</ol>
          </div>
        ) : null}
        <div className="read-switch">
          <button type="button" onClick={() => move(-1)}>{t(lang, "Câu trước", "Previous")}</button>
          <button type="button" onClick={() => move(1)}>{t(lang, "Câu sau", "Next")}</button>
        </div>
      </article>
      <p><A href="/so-loi">{t(lang, "Mở sổ lỗi gộp", "Open the miss book")}</A>{" · "}<A href="/luyen-lop">{t(lang, "Luyện lớp 1–12", "Grades 1–12 practice")}</A></p>
    </PageFrame>
  );
}

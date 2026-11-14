import { useState } from "react";
import { assessBanks, gradeNumber, shownLetter, type AssessQuestion } from "../content/assessBank.ts";
import { displayOrder } from "../lib/prng.ts";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { CardNav, PracticeBar } from "../ui/PracticeBar.tsx";
import { useLang } from "../ui/useLang.ts";

const KEY = "banToan.danhGia.v1";

type Saved = { bank: string; pos: Record<string, number>; ans: Record<string, Record<string, { ok: boolean; v: string }>> };

function load(): Saved {
  const empty: Saved = { bank: "tuduy", pos: {}, ans: {} };
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "null") as Saved | null;
    if (!parsed || typeof parsed !== "object") return empty;
    return {
      bank: assessBanks.some((item) => item.id === parsed.bank) ? parsed.bank : "tuduy",
      pos: parsed.pos && typeof parsed.pos === "object" ? parsed.pos : {},
      ans: parsed.ans && typeof parsed.ans === "object" ? parsed.ans : {},
    };
  } catch {
    return empty;
  }
}

export function AssessPage() {
  const lang = useLang();
  const [state, setState] = useState<Saved>(load);
  const bank = assessBanks.find((item) => item.id === state.bank) ?? assessBanks[0]!;
  const index = clamp(state.pos[bank.id] ?? 0, bank.questions.length);
  const question = bank.questions[index]!;
  const record = state.ans[bank.id]?.[String(index)];
  const marked = Object.values(state.ans[bank.id] ?? {});
  const score = marked.filter((item) => item.ok).length;
  const go = (delta: 1 | -1) => save({ ...state, pos: { ...state.pos, [bank.id]: (index + delta + bank.questions.length) % bank.questions.length } });

  const save = (next: Saved) => {
    setState(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const mark = (ok: boolean, value: string) => {
    const ans = { ...state.ans, [bank.id]: { ...(state.ans[bank.id] ?? {}), [String(index)]: { ok, v: value } } };
    save({ ...state, ans });
  };

  return (
    <PageFrame
      kicker={t(lang, "Đánh giá năng lực", "Self-assessment")}
      title={t(lang, "Ba bộ tự chấm", "Three self-marked sets")}
      lead={t(lang, "Ba bộ câu hỏi để tự đánh giá: tư duy toán, vận dụng vào vật lý, hóa và đời sống, và mức đội tuyển học sinh giỏi. Lời giải hiện ra sau khi bạn trả lời. Điểm ở đây chỉ để tự ước lượng, không phải điểm chuẩn hóa.", "Reasoning, mixed, and olympiad sets. Solutions open after marking.")}
    >
      <div className="read-switch" role="tablist" aria-label={t(lang, "Bộ đánh giá", "Assessment set")}>
        {assessBanks.map((item) => {
          const got = Object.values(state.ans[item.id] ?? {}).filter((row) => row.ok).length;
          return (
            <button key={item.id} type="button" role="tab" aria-selected={item.id === bank.id} onClick={() => save({ ...state, bank: item.id })}>
              {item.name} ({got}/{item.questions.length})
            </button>
          );
        })}
      </div>
      <PracticeBar
        total={bank.questions.length}
        right={score}
        wrong={marked.length - score}
        index={index}
        actions={<button type="button" onClick={() => save({ ...state, pos: { ...state.pos, [bank.id]: 0 }, ans: { ...state.ans, [bank.id]: {} } })}>{t(lang, "Làm lại bộ này", "Restart this set")}</button>}
      />
      <article className="tool-card">
        <p className="kicker">{bank.desc}</p>
        <h2><MathText text={question.t} /></h2>
        <Choices key={`${bank.id}-${index}`} question={question} record={record} onPick={mark} />
        {record ? <Explain question={question} ok={record.ok} /> : null}
        <CardNav onMove={go} />
      </article>
    </PageFrame>
  );
}

function Choices({ question, record, onPick }: { question: AssessQuestion; record?: { ok: boolean; v: string }; onPick: (ok: boolean, value: string) => void }) {
  const lang = useLang();
  const [draft, setDraft] = useState("");
  if (question.choices && question.answer !== undefined) {
    return (
      <div className="choices" role="group">
        {displayOrder(question.t, question.choices.length).map((index, shownAt) => {
          const choice = question.choices?.[index] ?? "";
          const state = !record ? "" : index === question.answer ? " is-right" : record.v === String(index) ? " is-wrong" : "";
          return (
            <button key={choice} type="button" className={`choice${state}`} disabled={!!record} onClick={() => onPick(index === question.answer, String(index))}>
              <span className="key">{String.fromCharCode(65 + shownAt)}</span>
              <span className="choice-body"><MathText text={choice} /></span>
            </button>
          );
        })}
      </div>
    );
  }
  return (
    <form className="pay-row" onSubmit={(event) => {
      event.preventDefault();
      const value = Number(draft.trim().replace(",", "."));
      if (!Number.isFinite(value) || question.numeric === undefined) return;
      onPick(gradeNumber(value, question.numeric, question.tol ?? 1e-9), draft.trim());
    }}>
      <input value={record?.v ?? draft} disabled={!!record} inputMode="decimal" aria-label={t(lang, "Đáp số", "Answer")} placeholder={t(lang, "Nhập số", "Enter a number")} onChange={(event) => setDraft(event.target.value)} />
      <button className="pay-btn" type="submit" disabled={!!record}>{t(lang, "Chấm", "Mark")}</button>
    </form>
  );
}

function Explain({ question, ok }: { question: AssessQuestion; ok: boolean }) {
  const lang = useLang();
  const right = question.choices && question.answer !== undefined
    ? `${shownLetter(question)}. ${question.choices[question.answer]}`
    : "$" + String(question.numeric).replace(".", "{,}") + "$";
  return (
    <div className="solution">
      <p><b>{ok ? t(lang, "Chính xác.", "Correct.") : t(lang, "Chưa đúng.", "Not yet.")}</b> {t(lang, "Đáp án:", "Answer:")} <MathText text={right} /></p>
      <ol className="steps">{question.steps.map((step) => <li key={step}><MathText text={step} /></li>)}</ol>
    </div>
  );
}

function clamp(index: number, length: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= length) return 0;
  return index;
}

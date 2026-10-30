import { useState } from "react";
import { assessBanks, gradeNumber, type AssessQuestion } from "../content/assessBank.ts";
import { PageFrame } from "../ui/PageFrame.tsx";

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
  const [state, setState] = useState<Saved>(load);
  const bank = assessBanks.find((item) => item.id === state.bank) ?? assessBanks[0]!;
  const index = clamp(state.pos[bank.id] ?? 0, bank.questions.length);
  const question = bank.questions[index]!;
  const record = state.ans[bank.id]?.[String(index)];
  const score = Object.values(state.ans[bank.id] ?? {}).filter((item) => item.ok).length;

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
      kicker="Đánh giá năng lực"
      title="Ba bộ tự chấm"
      lead="Tư duy, tổng hợp, và mức đội tuyển. Lời giải mở sau khi bạn chấm. Tiến độ nằm trên máy này."
    >
      <div className="read-switch" role="tablist" aria-label="Bộ đánh giá">
        {assessBanks.map((item) => {
          const got = Object.values(state.ans[item.id] ?? {}).filter((row) => row.ok).length;
          return (
            <button key={item.id} type="button" role="tab" aria-selected={item.id === bank.id} onClick={() => save({ ...state, bank: item.id })}>
              {item.name} ({got}/{item.questions.length})
            </button>
          );
        })}
      </div>
      <article className="tool-card">
        <p className="lecture-note">{bank.desc} · Câu {index + 1}/{bank.questions.length} · Điểm {score}/{bank.questions.length}</p>
        <h2>{question.t}</h2>
        <Choices key={`${bank.id}-${index}`} question={question} record={record} onPick={mark} />
        {record ? <Explain question={question} ok={record.ok} /> : null}
        <div className="read-switch">
          <button type="button" onClick={() => save({ ...state, pos: { ...state.pos, [bank.id]: (index - 1 + bank.questions.length) % bank.questions.length } })}>Câu trước</button>
          <button type="button" onClick={() => save({ ...state, pos: { ...state.pos, [bank.id]: (index + 1) % bank.questions.length } })}>Câu sau</button>
          <button type="button" onClick={() => save({ ...state, pos: { ...state.pos, [bank.id]: 0 }, ans: { ...state.ans, [bank.id]: {} } })}>Làm lại bộ này</button>
        </div>
      </article>
    </PageFrame>
  );
}

function Choices({ question, record, onPick }: { question: AssessQuestion; record?: { ok: boolean; v: string }; onPick: (ok: boolean, value: string) => void }) {
  const [draft, setDraft] = useState("");
  if (question.choices && question.answer !== undefined) {
    return (
      <div className="choices" role="group">
        {question.choices.map((choice, index) => {
          const state = !record ? "" : index === question.answer ? " is-right" : record.v === String(index) ? " is-wrong" : "";
          return (
            <button key={choice} type="button" className={`choice${state}`} disabled={!!record} onClick={() => onPick(index === question.answer, String(index))}>
              <span className="key">{String.fromCharCode(65 + index)}</span>
              <span className="choice-body">{choice}</span>
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
      <input value={record?.v ?? draft} disabled={!!record} inputMode="decimal" aria-label="Đáp số" placeholder="Nhập số" onChange={(event) => setDraft(event.target.value)} />
      <button className="pay-btn" type="submit" disabled={!!record}>Chấm</button>
    </form>
  );
}

function Explain({ question, ok }: { question: AssessQuestion; ok: boolean }) {
  const right = question.choices && question.answer !== undefined
    ? `${String.fromCharCode(65 + question.answer)}. ${question.choices[question.answer]}`
    : String(question.numeric).replace(".", ",");
  return (
    <div className="solution">
      <p><b>{ok ? "Chính xác." : "Chưa đúng."}</b> Đáp án: {right}</p>
      <ol className="steps">{question.steps.map((step) => <li key={step}>{step}</li>)}</ol>
    </div>
  );
}

function clamp(index: number, length: number): number {
  if (!Number.isInteger(index) || index < 0 || index >= length) return 0;
  return index;
}

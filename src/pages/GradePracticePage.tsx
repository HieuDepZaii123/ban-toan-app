import { useEffect, useState } from "react";
import { gradePractice, questionsForGrade, type GradeQuestion } from "../grades/practiceBank.ts";
import {
  GRADE_PRACTICE_KEY,
  answerGrade,
  gradeIndex,
  gradePickKey,
  parseGradeBag,
  rememberGrade,
  type GradePracticeBag,
} from "../grades/practiceStore.ts";
import { A } from "../lib/route.tsx";
import { displayOrder } from "../lib/prng.ts";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

const PRIMARY = [1, 2, 3, 4, 5];
const LOWER = [6, 7, 8, 9];

function loadBag(): GradePracticeBag {
  try { return parseGradeBag(localStorage.getItem(GRADE_PRACTICE_KEY)); } catch { return parseGradeBag(null); }
}

function saveBag(bag: GradePracticeBag) {
  try { localStorage.setItem(GRADE_PRACTICE_KEY, JSON.stringify(bag)); } catch { /* ignore */ }
}

export function GradePracticePage({ path }: { path: string }) {
  const grade = Number(path.slice("/luyen-lop/".length));
  if (path === "/luyen-lop") return <Picker />;
  if (!Number.isInteger(grade) || grade < 1 || grade > 9) {
    return <Picker missing />;
  }
  return <GradeRun grade={grade} />;
}

function Picker({ missing = false }: { missing?: boolean }) {
  const lang = useLang();
  return (
    <PageFrame
      kicker={t(lang, "Luyện theo lớp", "Practice by grade")}
      title={missing ? t(lang, "Không thấy lớp này", "This grade is missing") : t(lang, "Luyện lớp 1–9", "Practice, grades 1–9")}
      lead={t(lang, "Tiểu học và THCS, mỗi lớp hơn một trăm câu trắc nghiệm có lời giải. Lớp 10–12 có phần Luyện THPT riêng.", "Primary and lower secondary, over a hundred worked multiple-choice questions per grade. Grades 10–12 have their own upper-secondary practice.")}
    >
      <Band title={t(lang, "Tiểu học 1–5", "Primary 1–5")} grades={PRIMARY} />
      <Band title={t(lang, "THCS 6–9", "Lower secondary 6–9")} grades={LOWER} />
      <p><A href="/luyen-thpt">{t(lang, "Luyện THPT lớp 10–12", "Upper-secondary practice, grades 10–12")}</A>{" · "}<A href="/kien-thuc">{t(lang, "Mở bài học lớp 1–12", "Open the grade lessons")}</A></p>
    </PageFrame>
  );
}

function Band({ title, grades }: { title: string; grades: number[] }) {
  const lang = useLang();
  return (
    <section className="stream">
      <h2>{title}</h2>
      <div className="read-switch">
        {grades.map((grade) => (
          <A key={grade} href={`/luyen-lop/${grade}`}>{t(lang, `Lớp ${grade}`, `Grade ${grade}`)}</A>
        ))}
      </div>
    </section>
  );
}

function GradeRun({ grade }: { grade: number }) {
  const lang = useLang();
  const items = questionsForGrade(grade);
  const ids = items.map((item) => item.id);
  const [bag, setBag] = useState(loadBag);
  const [index, setIndex] = useState(() => gradeIndex(ids, loadBag(), grade));
  const [onlyWrong, setOnlyWrong] = useState(false);
  useEffect(() => {
    const next = rememberGrade(bag, grade, items[index]?.id ?? ids[0] ?? "");
    saveBag(next);
    if (next.at[String(grade)] !== bag.at[String(grade)]) setBag(next);
  }, [grade, index]);
  const question = items[index] ?? items[0];
  if (!question) return <Picker missing />;
  const picked = bag.picks[gradePickKey(grade, question.id)];
  const wrongAt = items.flatMap((item, at) => {
    const choice = bag.picks[gradePickKey(grade, item.id)];
    return choice !== undefined && choice !== item.answer ? [at] : [];
  });
  const right = items.filter((item) => bag.picks[gradePickKey(grade, item.id)] === item.answer).length;
  const answered = items.filter((item) => bag.picks[gradePickKey(grade, item.id)] !== undefined).length;

  const choose = (choice: number) => {
    const next = answerGrade(bag, grade, question.id, choice);
    setBag(next);
    saveBag(next);
  };
  const move = (delta: number) => {
    const pool = onlyWrong && wrongAt.length > 0 ? wrongAt : items.map((_, at) => at);
    const place = pool.indexOf(index);
    setIndex(pool[(place + delta + pool.length) % pool.length] ?? 0);
  };

  return (
    <PageFrame
      kicker={t(lang, grade <= 5 ? "Tiểu học" : "THCS", grade <= 5 ? "Primary" : "Lower secondary")}
      title={t(lang, `Luyện lớp ${grade}`, `Grade ${grade} practice`)}
      lead={t(lang, `${items.length} câu của riêng lớp này. Điểm được giữ trên máy, tách khỏi đề luyện chung.`, `${items.length} questions for this grade. The score stays on this device, apart from the shared drill.`)}
    >
      <p><A href="/luyen-lop">{t(lang, "Chọn lớp khác", "Choose another grade")}</A>{" · "}<A href={`/kien-thuc/${grade}`}>{t(lang, "Bài học lớp này", "This grade's lessons")}</A></p>
      <p className="lecture-note">{t(lang, `Đúng ${right}/${items.length} · Sai ${wrongAt.length} · Chưa làm ${items.length - answered} · Câu ${index + 1}/${items.length}`, `Right ${right}/${items.length} · Wrong ${wrongAt.length} · Left ${items.length - answered} · Item ${index + 1}/${items.length}`)}</p>
      <div className="read-switch">
        <button type="button" aria-pressed={onlyWrong} disabled={wrongAt.length === 0} onClick={() => { setOnlyWrong((value) => !value); if (!onlyWrong && wrongAt[0] !== undefined) setIndex(wrongAt[0]); }}>
          {t(lang, `Ôn câu sai (${wrongAt.length})`, `Review misses (${wrongAt.length})`)}
        </button>
      </div>
      <QuestionCard question={question} picked={picked} onChoose={choose} />
      <div className="read-switch">
        <button type="button" onClick={() => move(-1)}>{t(lang, "Câu trước", "Previous")}</button>
        <button type="button" onClick={() => move(1)}>{t(lang, "Câu sau", "Next")}</button>
      </div>
    </PageFrame>
  );
}

function QuestionCard({ question, picked, onChoose }: { question: GradeQuestion; picked: number | undefined; onChoose: (choice: number) => void }) {
  const lang = useLang();
  return (
    <article className="tool-card">
      <h2><MathText text={question.prompt} /></h2>
      <div className="choices" role="group" aria-label={t(lang, "Các lựa chọn", "Choices")}>
        {displayOrder(question.id, question.choices.length).map((choiceIndex, shownAt) => {
          const choice = question.choices[choiceIndex] ?? "";
          const state = picked === undefined ? "" : choiceIndex === question.answer ? " is-right" : picked === choiceIndex ? " is-wrong" : "";
          return (
            <button key={choice} type="button" className={`choice${state}`} disabled={picked !== undefined} onClick={() => onChoose(choiceIndex)}>
              <span className="key">{String.fromCharCode(65 + shownAt)}</span>
              <span className="choice-body"><MathText text={choice} /></span>
            </button>
          );
        })}
      </div>
      {picked !== undefined ? (
        <div className="solution">
          <p><b>{picked === question.answer ? t(lang, "Đúng.", "Right.") : t(lang, "Chưa đúng.", "Not yet.")}</b></p>
          <ol className="method-steps">{question.steps.map((step) => <li key={step}><MathText text={step} /></li>)}</ol>
        </div>
      ) : null}
    </article>
  );
}

export const gradePracticeCount = gradePractice.length;

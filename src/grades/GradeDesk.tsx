import { useEffect, useState } from "react";
import { cards } from "../content/cards.ts";
import { gradeBooks, lessonAt, lessonsOf } from "../content/grades/index.ts";
import type { GradeAsk, GradeBook, GradeDrill, GradeExample } from "../content/grades/types.ts";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { useRoute } from "../lib/useRoute.ts";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";
import { GradeFigure } from "./GradeFigure.tsx";
import { GradeWidgetView } from "./GradeWidgets.tsx";
import { doneCount, markDone, readDone } from "./progress.ts";

export function GradeDesk() {
  const lang = useLang();
  const { path } = useRoute();
  const parsed = parseGradePath(path);
  useEffect(() => {
    const book = parsed.grade ? gradeBooks.find((item) => item.grade === parsed.grade) : undefined;
    const found = parsed.grade && parsed.lesson ? lessonAt(parsed.grade, parsed.lesson) : undefined;
    const gradeWord = lang === "en" ? "Grade" : "Lớp";
    document.title = found ? `${found.lesson.title} · ${gradeWord} ${parsed.grade}` : book ? `${gradeWord} ${book.grade}` : (lang === "en" ? "Grades 1–12" : "Kiến thức lớp 1–12");
  }, [parsed.grade, parsed.lesson, lang]);

  if (!parsed.grade) return <GradeHome />;
  const book = gradeBooks.find((item) => item.grade === parsed.grade);
  if (!book) {
    return (
      <PageFrame kicker={t(lang, "Chương trình 2018", "2018 curriculum")} title={t(lang, "Không thấy lớp này", "This grade is missing")} lead={t(lang, "Chọn một lớp từ 1 đến 12.", "Choose a grade from 1 to 12.")}>
        <A href="/kien-thuc">{t(lang, "Về danh sách lớp", "Back to grades")}</A>
      </PageFrame>
    );
  }
  if (!parsed.lesson) return <GradeIndex book={book} />;
  const found = lessonAt(book.grade, parsed.lesson);
  if (!found) {
    return (
      <PageFrame kicker={t(lang, `Lớp ${book.grade}`, `Grade ${book.grade}`)} title={t(lang, "Không thấy bài này", "This lesson is missing")} lead={t(lang, "Bài không nằm trong danh sách của lớp.", "This lesson is not in the grade list.")}>
        <A href={`/kien-thuc/${book.grade}`}>{t(lang, `Về các bài lớp ${book.grade}`, `Back to grade ${book.grade}`)}</A>
      </PageFrame>
    );
  }
  return <LessonView book={book} chapterTitle={found.chapter.title} lesson={found.lesson} />;
}

function useDone(): string[] {
  const [done, setDone] = useState<string[]>(() => readDone());
  useEffect(() => {
    const sync = () => setDone(readDone());
    window.addEventListener("grade-progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("grade-progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return done;
}

function ProgressBar({ done, total, label }: { done: number; total: number; label: string }) {
  const lang = useLang();
  const ratio = total === 0 ? 0 : done / total;
  return (
    <div className="grade-progress-wrap">
      <div className="grade-progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={total} aria-valuenow={done}>
        <span style={{ width: `${Math.round(ratio * 100)}%` }} />
      </div>
      <p className="lecture-note">{t(lang, `${done}/${total} bài đã xong`, `${done}/${total} lessons done`)}</p>
    </div>
  );
}

function GradeHome() {
  const lang = useLang();
  const done = useDone();
  const bands = [
    { id: "tieu-hoc", title: t(lang, "Tiểu học 1–5", "Primary 1–5") },
    { id: "thcs", title: t(lang, "THCS 6–9", "Lower secondary 6–9") },
    { id: "thpt", title: t(lang, "THPT 10–12", "Upper secondary 10–12") },
  ] as const;
  return (
    <PageFrame
      kicker={t(lang, "Chương trình GDPT 2018", "2018 curriculum")}
      title={t(lang, "Kiến thức lớp 1–12", "Grades 1–12")}
      lead={t(lang, "Tiểu học lớp 1–5, THCS lớp 6–9, THPT lớp 10–12. Mỗi bài có ví dụ tính được và bài luyện.", "Primary grades 1–5, lower secondary 6–9, upper secondary 10–12. Each lesson has a worked example and practice.")}
    >
      <p><A href="/luyen-lop">{t(lang, "Luyện nhanh lớp 1–9", "Quick practice, grades 1–9")}</A></p>
      {bands.map((band) => (
        <section key={band.id} className="stream">
          <h2>{band.title}</h2>
          <div className="grade-grid">
            {gradeBooks.filter((book) => book.band === band.id).map((book) => {
              const ids = lessonsOf(book).map((item) => item.lesson.id);
              const count = doneCount(book.grade, ids, done);
              return (
                <A key={book.grade} className="study-card" href={`/kien-thuc/${book.grade}`}>
                  <span>
                    <strong>{t(lang, `Lớp ${book.grade}`, `Grade ${book.grade}`)}</strong>
                    <small className="lecture-note">{book.title}</small>
                    <ProgressBar done={count} total={ids.length} label={t(lang, `Tiến độ lớp ${book.grade}`, `Grade ${book.grade} progress`)} />
                  </span>
                </A>
              );
            })}
          </div>
        </section>
      ))}
    </PageFrame>
  );
}

function GradeIndex({ book }: { book: GradeBook }) {
  const lang = useLang();
  const done = useDone();
  const ids = lessonsOf(book).map((item) => item.lesson.id);
  return (
    <PageFrame kicker={t(lang, "Kiến thức lớp 1–12", "Grades 1–12")} title={t(lang, `Lớp ${book.grade}`, `Grade ${book.grade}`)} lead={book.title}>
      <p><A href="/kien-thuc">{t(lang, "Tất cả các lớp", "All grades")}</A>{" · "}{book.grade <= 9 ? <A href={`/luyen-lop/${book.grade}`}>{t(lang, "Luyện nhanh lớp này", "Quick practice")}</A> : null}</p>
      <ProgressBar done={doneCount(book.grade, ids, done)} total={ids.length} label={t(lang, `Tiến độ lớp ${book.grade}`, `Grade ${book.grade} progress`)} />
      {book.chapters.map((chapter) => (
        <section key={chapter.id} className="stream">
          <h2>{chapter.title}</h2>
          <div className="study-list">
            {chapter.lessons.map((lesson) => {
              const ready = done.includes(`${book.grade}/${lesson.id}`);
              return (
                <A key={lesson.id} className="study-card" href={`/kien-thuc/${book.grade}/${lesson.id}`}>
                  <span>
                    <strong>{lesson.title}</strong>
                    {lesson.topicId ? <small className="lecture-note">{t(lang, "Nối sang chuyên đề đã có", "Links to an existing topic")}</small> : null}
                  </span>
                  {ready ? <span aria-label={t(lang, "Đã xong", "Done")}>✓</span> : null}
                </A>
              );
            })}
          </div>
        </section>
      ))}
    </PageFrame>
  );
}

function LessonView({ book, chapterTitle, lesson }: { book: GradeBook; chapterTitle: string; lesson: GradeBook["chapters"][number]["lessons"][number] }) {
  const topic = lesson.topicId ? cards.find((card) => card.id === lesson.topicId) : undefined;
  const [correct, setCorrect] = useState<boolean[]>(() => lesson.drills.map(() => false));
  useEffect(() => {
    if (correct.length === lesson.drills.length && correct.every(Boolean)) markDone(book.grade, lesson.id);
  }, [book.grade, correct, lesson.drills.length, lesson.id]);
  return (
    <PageFrame kicker={`Lớp ${book.grade} · ${chapterTitle}`} title={lesson.title}>
      <p><A href={`/kien-thuc/${book.grade}`}>Về các bài lớp {book.grade}</A></p>
      <article className="tool-card">
        <h2>Tóm tắt</h2>
        {lesson.dataNote ? <p className="lecture-note">{lesson.dataNote}</p> : null}
        <p><MathText text={lesson.summary} /></p>
        {lesson.whyTrue ? (
          <>
            <h3>Vì sao đúng</h3>
            <p><MathText text={lesson.whyTrue} /></p>
          </>
        ) : null}
        {lesson.pitfalls ? (
          <>
            <h3>Lỗi hay gặp</h3>
            <p><MathText text={lesson.pitfalls} /></p>
          </>
        ) : null}
        {lesson.figure ? <GradeFigure kind={lesson.figure} /> : null}
        {lesson.widget ? <GradeWidgetView kind={lesson.widget} /> : null}
        {topic ? <p><A href={`/t/${topic.id}`}>Mở chuyên đề {topic.title}</A></p> : null}
      </article>
      {lesson.examples.map((example, index) => (
        <ExampleBlock key={example.prompt} example={example} index={index} />
      ))}
      <article className="tool-card">
        <h2>Tự luyện</h2>
        <p className="lecture-note">Điểm {correct.filter(Boolean).length}/{lesson.drills.length}</p>
        {lesson.drills.map((drill, index) => (
          <DrillBlock
            key={drill.prompt}
            drill={drill}
            index={index}
            correct={correct[index] ?? false}
            onCorrect={() => setCorrect((prev) => prev.map((item, itemIndex) => itemIndex === index ? true : item))}
          />
        ))}
      </article>
    </PageFrame>
  );
}

function ExampleBlock({ example, index }: { example: GradeExample; index: number }) {
  const [shown, setShown] = useState(0);
  const done = shown >= example.steps.length;
  return (
    <article className="tool-card">
      <h2>Ví dụ {index + 1}</h2>
      <p><MathText text={example.prompt} /></p>
      <ol className="steps">
        {example.steps.slice(0, shown).map((step) => (
          <li key={step.claim}>
            <MathText text={step.claim} />
            <span className="lecture-note"> Lý do: <MathText text={step.why} /></span>
          </li>
        ))}
      </ol>
      {done ? <p><b>Kết luận.</b> <MathText text={example.ket} /></p> : (
        <button type="button" className="text-btn" aria-expanded={false} onClick={() => setShown((value) => value + 1)}>
          Hiện bước {shown + 1}
        </button>
      )}
    </article>
  );
}

function DrillBlock({ drill, index, correct, onCorrect }: { drill: GradeDrill; index: number; correct: boolean; onCorrect: () => void }) {
  const [open, setOpen] = useState(false);
  const [hints, setHints] = useState(0);
  const [note, setNote] = useState("");
  return (
    <div className="fitem">
      <p>
        <b>Bài {index + 1}.</b> {drill.stars ? <span aria-label={`Độ khó ${drill.stars} trên 3`}>{"★".repeat(drill.stars)} </span> : null}
        <MathText text={drill.prompt} />
      </p>
      {drill.ask ? <AskForm ask={drill.ask} index={index} correct={correct} onCorrect={onCorrect} onNote={setNote} /> : null}
      {note ? <p role="status">{note}</p> : null}
      {drill.hints && hints < drill.hints.length ? (
        <button type="button" className="text-btn" aria-expanded={hints > 0} onClick={() => setHints((value) => value + 1)}>
          Gợi ý {hints + 1}
        </button>
      ) : null}
      {drill.hints?.slice(0, hints).map((hint) => <p key={hint} className="lecture-note">Gợi ý: <MathText text={hint} /></p>)}
      <button type="button" className="text-btn" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? "Ẩn đáp án" : "Xem đáp án"}
      </button>
      {open ? (
        <>
          <p><b>Đáp án.</b> <MathText text={drill.answer} /></p>
          {drill.why ? <p className="lecture-note">Lý do: <MathText text={drill.why} /></p> : null}
        </>
      ) : null}
    </div>
  );
}

function AskForm({ ask, index, correct, onCorrect, onNote }: { ask: GradeAsk; index: number; correct: boolean; onCorrect: () => void; onNote: (text: string) => void }) {
  const [text, setText] = useState("");
  const [choice, setChoice] = useState(-1);
  function check() {
    const ok = ask.kind === "number" ? near(text, ask.value, ask.tolerance ?? 0.001) : choice === ask.correct;
    onNote(ok ? "Đúng." : "Chưa đúng. Hãy xem gợi ý rồi thử lại.");
    if (ok) onCorrect();
  }
  if (ask.kind === "choice") {
    return (
      <fieldset className="grade-ask">
        <legend>Chọn một kết luận cho bài {index + 1}</legend>
        {ask.options.map((option, optionIndex) => (
          <label key={option}>
            <input type="radio" name={`ask-${index}`} checked={choice === optionIndex} onChange={() => setChoice(optionIndex)} />
            <MathText text={option} />
          </label>
        ))}
        <button type="button" className="text-btn" onClick={check} disabled={correct}>Kiểm tra</button>
      </fieldset>
    );
  }
  return (
    <form className="grade-ask" onSubmit={(event) => { event.preventDefault(); check(); }}>
      <label>
        Nhập đáp số cho bài {index + 1}
        <input inputMode="decimal" aria-label={`Đáp số bài ${index + 1}`} value={text} onChange={(event) => setText(event.target.value)} />
      </label>
      <button type="submit" className="text-btn" disabled={correct}>Kiểm tra</button>
    </form>
  );
}

function near(raw: string, value: number, tolerance: number): boolean {
  const text = raw.trim().replace(",", ".");
  const slash = text.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  const got = slash ? Number(slash[1]) / Number(slash[2]) : Number(text);
  return Number.isFinite(got) && Math.abs(got - value) <= tolerance;
}

function parseGradePath(path: string): { grade?: number; lesson?: string } {
  if (path === "/kien-thuc") return {};
  if (!path.startsWith("/kien-thuc/")) return {};
  const [gradeText, lesson] = path.slice("/kien-thuc/".length).split("/");
  const grade = Number(gradeText);
  if (!Number.isInteger(grade)) return {};
  return { grade, lesson };
}

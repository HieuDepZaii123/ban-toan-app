import { useEffect, useState } from "react";
import { cards } from "../content/cards.ts";
import { gradeBooks, lessonAt } from "../content/grades/index.ts";
import type { GradeBook, GradeDrill, GradeExample } from "../content/grades/types.ts";
import { A } from "../lib/route.tsx";
import { useRoute } from "../lib/useRoute.ts";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { GradeFigure } from "./GradeFigure.tsx";

const BAND = [
  { id: "tieu-hoc", title: "Tiểu học" },
  { id: "thcs", title: "Trung học cơ sở" },
  { id: "thpt", title: "Trung học phổ thông" },
] as const;

export function GradeDesk() {
  const { path } = useRoute();
  const parsed = parseGradePath(path);
  useEffect(() => {
    const book = parsed.grade ? gradeBooks.find((item) => item.grade === parsed.grade) : undefined;
    const found = parsed.grade && parsed.lesson ? lessonAt(parsed.grade, parsed.lesson) : undefined;
    document.title = found ? `${found.lesson.title} · Lớp ${parsed.grade}` : book ? `Lớp ${book.grade}` : "Kiến thức lớp 1–12";
  }, [parsed.grade, parsed.lesson]);

  if (!parsed.grade) return <GradeHome />;
  const book = gradeBooks.find((item) => item.grade === parsed.grade);
  if (!book) {
    return (
      <PageFrame kicker="Chương trình 2018" title="Không thấy lớp này" lead="Chọn một lớp từ 1 đến 12.">
        <A href="/kien-thuc">Về danh sách lớp</A>
      </PageFrame>
    );
  }
  if (!parsed.lesson) return <GradeIndex book={book} />;
  const found = lessonAt(book.grade, parsed.lesson);
  if (!found) {
    return (
      <PageFrame kicker={`Lớp ${book.grade}`} title="Không thấy bài này" lead="Bài không nằm trong danh sách của lớp.">
        <A href={`/kien-thuc/${book.grade}`}>Về các bài lớp {book.grade}</A>
      </PageFrame>
    );
  }
  return <LessonView book={book} chapterTitle={found.chapter.title} lesson={found.lesson} />;
}

function GradeHome() {
  return (
    <PageFrame
      kicker="Chương trình GDPT 2018"
      title="Kiến thức lớp 1–12"
      lead="Chọn lớp để xem chương và bài. Mỗi bài có phần tóm tắt, ví dụ có lý do từng bước, và ba bài tự luyện kèm đáp án."
    >
      {BAND.map((band) => (
        <section key={band.id} className="stream">
          <h2>{band.title}</h2>
          <div className="grade-grid">
            {gradeBooks.filter((book) => book.band === band.id).map((book) => (
              <A key={book.grade} className="study-card" href={`/kien-thuc/${book.grade}`}>
                <span>
                  <strong>Lớp {book.grade}</strong>
                  <small className="lecture-note">{book.title}</small>
                </span>
              </A>
            ))}
          </div>
        </section>
      ))}
    </PageFrame>
  );
}

function GradeIndex({ book }: { book: GradeBook }) {
  return (
    <PageFrame kicker="Kiến thức lớp 1–12" title={`Lớp ${book.grade}`} lead={book.title}>
      <p><A href="/kien-thuc">Tất cả các lớp</A></p>
      {book.chapters.map((chapter) => (
        <section key={chapter.id} className="stream">
          <h2>{chapter.title}</h2>
          <div className="study-list">
            {chapter.lessons.map((lesson) => (
              <A key={lesson.id} className="study-card" href={`/kien-thuc/${book.grade}/${lesson.id}`}>
                <span>
                  <strong>{lesson.title}</strong>
                  {lesson.topicId ? <small className="lecture-note">Nối sang chuyên đề đã có</small> : null}
                </span>
              </A>
            ))}
          </div>
        </section>
      ))}
    </PageFrame>
  );
}

function LessonView({ book, chapterTitle, lesson }: { book: GradeBook; chapterTitle: string; lesson: GradeBook["chapters"][number]["lessons"][number] }) {
  const topic = lesson.topicId ? cards.find((card) => card.id === lesson.topicId) : undefined;
  return (
    <PageFrame kicker={`Lớp ${book.grade} · ${chapterTitle}`} title={lesson.title}>
      <p><A href={`/kien-thuc/${book.grade}`}>Về các bài lớp {book.grade}</A></p>
      <article className="tool-card">
        <h2>Tóm tắt</h2>
        <p><MathText text={lesson.summary} /></p>
        {lesson.figure ? <GradeFigure kind={lesson.figure} /> : null}
        {topic ? <p><A href={`/t/${topic.id}`}>Mở chuyên đề {topic.title}</A></p> : null}
      </article>
      {lesson.examples.map((example, index) => (
        <ExampleBlock key={example.prompt} example={example} index={index} />
      ))}
      <article className="tool-card">
        <h2>Tự luyện</h2>
        {lesson.drills.map((drill, index) => (
          <DrillBlock key={drill.prompt} drill={drill} index={index} />
        ))}
      </article>
    </PageFrame>
  );
}

function ExampleBlock({ example, index }: { example: GradeExample; index: number }) {
  return (
    <article className="tool-card">
      <h2>Ví dụ {index + 1}</h2>
      <p><MathText text={example.prompt} /></p>
      <ol className="steps">
        {example.steps.map((step) => (
          <li key={step.claim}>
            <MathText text={step.claim} />
            <span className="lecture-note"> Lý do: <MathText text={step.why} /></span>
          </li>
        ))}
      </ol>
      <p><b>Kết luận.</b> <MathText text={example.ket} /></p>
    </article>
  );
}

function DrillBlock({ drill, index }: { drill: GradeDrill; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="fitem">
      <p><b>Bài {index + 1}.</b> <MathText text={drill.prompt} /></p>
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

function parseGradePath(path: string): { grade?: number; lesson?: string } {
  if (path === "/kien-thuc") return {};
  if (!path.startsWith("/kien-thuc/")) return {};
  const [gradeText, lesson] = path.slice("/kien-thuc/".length).split("/");
  const grade = Number(gradeText);
  if (!Number.isInteger(grade)) return {};
  return { grade, lesson };
}

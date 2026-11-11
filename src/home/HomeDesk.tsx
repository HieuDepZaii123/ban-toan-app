import { useEffect, useMemo, useRef, useState } from "react";
import { cards, QUESTION_TOTAL, streamName, streams } from "../content/cards.ts";
import { A } from "../lib/route.tsx";
import { sciences } from "../science/catalog.ts";
import { countRight, useSlice } from "../lib/store.ts";
import { fold, t } from "../lib/text.ts";
import { parseGrade, usePref, writePref, type Grade } from "../ui/prefs.ts";
import { SiteHeader } from "../ui/SiteHeader.tsx";
import { SiteFooter } from "../ui/SiteFooter.tsx";
import { useLang } from "../ui/useLang.ts";
import { Motion } from "../motion/Motion.tsx";
import { Room } from "./Room.tsx";
import { DeskTools } from "./Welcome.tsx";

/**
 * Trang chủ. Lần đầu hỏi "Bạn học lớp mấy?"; sau đó mở đúng bài của lớp đó.
 * Lớp 1–9 thấy bài của lớp mình trước, mười bốn chuyên đề THPT gập lại bên dưới.
 * Lớp 10–12, phụ huynh và người chưa chọn lớp thấy chuyên đề ngay.
 */
export function HomeDesk() {
  const lang = useLang();
  const grade = parseGrade(usePref("bt-grade"));
  const [picking, setPicking] = useState(false);

  useEffect(() => {
    document.title = "Bàn Toán";
  }, []);

  const young = typeof grade === "number" && grade <= 9;
  const more = (
    <>
      <Topics grade={grade} />
      <Sciences />
    </>
  );

  return (
    <div className="desk">
      <a className="skip" href="#content">{t(lang, "Vào nội dung", "Skip to content")}</a>
      <SiteHeader />
      <main id="content">
        {grade === null || picking ? (
          <GradePicker
            current={grade}
            onPick={(next) => {
              writePref("bt-grade", String(next));
              setPicking(false);
              window.scrollTo(0, 0);
            }}
            onCancel={grade === null ? undefined : () => setPicking(false)}
          />
        ) : grade === "adult" ? (
          <AdultHero onChange={() => setPicking(true)} />
        ) : (
          <GradeHero grade={grade} onChange={() => setPicking(true)} />
        )}
        {young ? (
          <details className="home-more">
            <summary>{t(lang, "Chuyên đề THPT (lớp 10–12) và Khoa học", "Upper-secondary topics (grades 10–12) and Science")}</summary>
            {more}
          </details>
        ) : more}
        <DeskCorner />
      </main>
      <SiteFooter />
    </div>
  );
}

function GradePicker({ current, onPick, onCancel }: { current: Grade; onPick: (grade: number | "adult") => void; onCancel?: () => void }) {
  const lang = useLang();
  const bands = [
    { id: "th", label: t(lang, "Tiểu học", "Primary"), grades: [1, 2, 3, 4, 5] },
    { id: "thcs", label: t(lang, "THCS", "Lower secondary"), grades: [6, 7, 8, 9] },
    { id: "thpt", label: t(lang, "THPT", "Upper secondary"), grades: [10, 11, 12] },
  ];
  return (
    <section className="grade-pick" aria-labelledby="grade-q">
      <h1 id="grade-q">{t(lang, "Bạn học lớp mấy?", "Which grade are you in?")}</h1>
      <p className="lead">
        {t(lang, "Chọn lớp để bàn mở đúng bài của bạn. Muốn đổi lúc nào cũng được.", "Pick a grade and the desk opens the right lessons. You can change it any time.")}
      </p>
      {bands.map((band) => (
        <div key={band.id} className="grade-band" role="group" aria-label={band.label}>
          <b>{band.label}</b>
          <div className="grade-btns">
            {band.grades.map((grade) => (
              <button key={grade} type="button" className="grade-btn" aria-pressed={current === grade} onClick={() => onPick(grade)}>
                <span className="sr">{t(lang, "Lớp", "Grade")} </span>{grade}
              </button>
            ))}
          </div>
        </div>
      ))}
      <p className="grade-other">
        <button type="button" className="text-btn" aria-pressed={current === "adult"} onClick={() => onPick("adult")}>
          {t(lang, "Tôi là phụ huynh hoặc người lớn tự học", "I am a parent or an adult learner")}
        </button>
        {onCancel ? <button type="button" className="text-btn" onClick={onCancel}>{t(lang, "Giữ như cũ", "Keep as it is")}</button> : null}
      </p>
    </section>
  );
}

type NextLesson = { grade: number; href: string; title: string; done: number; total: number };

/** Bài kế tiếp chưa xong của lớp. Dữ liệu các lớp nặng, nên chỉ tải khi trang đã hiện. */
function useNextLesson(grade: number): NextLesson | null {
  const [found, setFound] = useState<NextLesson | null>(null);
  useEffect(() => {
    let live = true;
    const run = () => {
      void Promise.all([import("../content/grades/index.ts"), import("../grades/progress.ts")]).then(([books, progress]) => {
        if (!live) return;
        const book = books.bookByGrade(grade);
        if (!book) return;
        const lessons = books.lessonsOf(book).map((item) => item.lesson);
        const done = progress.readDone();
        const next = lessons.find((lesson) => !done.includes(`${grade}/${lesson.id}`)) ?? lessons[0];
        if (!next) return;
        setFound({
          grade,
          href: `/kien-thuc/${grade}/${next.id}`,
          title: next.title,
          done: progress.doneCount(grade, lessons.map((lesson) => lesson.id), done),
          total: lessons.length,
        });
      }).catch(() => undefined);
    };
    const timer = window.setTimeout(run, 200);
    return () => {
      live = false;
      window.clearTimeout(timer);
    };
  }, [grade]);
  return found && found.grade === grade ? found : null;
}

function GradeHero({ grade, onChange }: { grade: number; onChange: () => void }) {
  const lang = useLang();
  const next = useNextLesson(grade);
  const practice = grade <= 9 ? `/luyen-lop/${grade}` : "/luyen-thpt";
  const start = next
    ? next.done > 0
      ? t(lang, `Học tiếp: ${next.title}`, `Continue: ${next.title}`)
      : t(lang, `Bắt đầu: ${next.title}`, `Start: ${next.title}`)
    : t(lang, `Mở bài lớp ${grade}`, `Open grade ${grade} lessons`);
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <p className="kicker">{t(lang, "Bàn của bạn", "Your desk")}</p>
      <h1 id="home-title">{t(lang, `Toán lớp ${grade}`, `Grade ${grade} maths`)}</h1>
      <p className="lead">
        {grade >= 10
          ? t(lang, "Bài của lớp có ví dụ từng bước và bài tự luyện có chấm. Bên dưới là các chuyên đề: kéo một tham số, xem hình đổi, rồi làm câu có gợi ý và lời giải.", "Lessons have step-by-step examples and checked practice. Below are the topics: drag a parameter, watch the figure change, then work questions with hints and solutions.")
          : t(lang, "Mỗi bài có tóm tắt ngắn, ví dụ đi từng bước và bài tự luyện có chấm ngay.", "Each lesson has a short summary, a step-by-step example and practice that is checked at once.")}
      </p>
      <div className="home-cta">
        <A className="pay-btn" href={next?.href ?? `/kien-thuc/${grade}`}>{start}</A>
        <A className="text-btn" href={practice}>{t(lang, "Luyện nhanh", "Quick practice")}</A>
        <A className="text-btn" href={`/kien-thuc/${grade}`}>{t(lang, `Tất cả bài lớp ${grade}`, `All grade ${grade} lessons`)}</A>
        <button type="button" className="text-btn" onClick={onChange}>{t(lang, "Đổi lớp", "Change grade")}</button>
      </div>
      {next ? (
        <p className="progress-line">
          {t(lang, `Đã xong ${next.done}/${next.total} bài lớp ${grade}. Tiến độ lưu trên máy này.`, `${next.done}/${next.total} grade ${grade} lessons done. Progress is saved on this device.`)}
        </p>
      ) : null}
    </section>
  );
}

function AdultHero({ onChange }: { onChange: () => void }) {
  const lang = useLang();
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <p className="kicker">{t(lang, "Phụ huynh và người tự học", "Parents and adult learners")}</p>
      <h1 id="home-title">{t(lang, "Bắt đầu từ đâu?", "Where to start?")}</h1>
      <p className="lead">
        {t(lang, "Kèm con thì chọn lớp của con để mở đúng bài. Tự ôn thì đi từ lớp có phần mình còn nhớ, mỗi bài có ví dụ từng bước và lời giải.", "Helping a child? Pick their grade to open the right lessons. Studying for yourself? Start at the grade you still remember; every lesson has a worked example and solutions.")}
      </p>
      <div className="home-cta">
        <button type="button" className="pay-btn" onClick={onChange}>{t(lang, "Chọn lớp của con", "Pick your child's grade")}</button>
        <A className="text-btn" href="/kien-thuc">{t(lang, "Kiến thức lớp 1–12", "Lessons for grades 1–12")}</A>
        <A className="text-btn" href="/so-cong-thuc">{t(lang, "Sổ công thức", "Formula book")}</A>
        <A className="text-btn" href="/phu-huynh">{t(lang, "Báo cáo, nhắc nghỉ, giới hạn giờ học", "Reports, breaks and time limits")}</A>
        <A className="text-btn" href="/chinh-sach">{t(lang, "Dữ liệu và quyền riêng tư", "Data and privacy")}</A>
      </div>
    </section>
  );
}

function Topics({ grade }: { grade: Grade }) {
  const lang = useLang();
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const folded = fold(query.trim());

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
      if (!searchRef.current || searchRef.current.offsetParent === null) return;
      event.preventDefault();
      searchRef.current.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const visible = useMemo(
    () =>
      cards.filter((topic) => {
        if (!folded) return true;
        const hay = fold(`${topic.title} ${topic.titleEn} ${topic.blurb} ${topic.blurbEn} ${streamName(topic.stream, "vi")} ${streamName(topic.stream, "en")}`);
        return hay.includes(folded);
      }),
    [folded],
  );
  const mine = typeof grade === "number" && grade >= 10 ? String(grade) : "";
  const first = mine ? visible.filter((topic) => inGrade(topic.grade, mine)) : [];
  const rest = mine ? visible.filter((topic) => !inGrade(topic.grade, mine)) : visible;

  return (
    <>
      <p className="kicker home-kicker">{t(lang, "Chuyên đề THPT · lớp 10–12", "Upper-secondary topics · grades 10–12")}</p>
      <section className={`home-start${folded ? " is-searching" : ""}`} aria-label={t(lang, "Chuyên đề", "Topics")}>
        {folded ? null : <Continue />}
        <div className="home-find">
          <form className="search home-search" role="search" onSubmit={(event) => event.preventDefault()}>
            <input
              id="search"
              ref={searchRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t(lang, "Tìm chuyên đề, ví dụ đạo hàm", "Find a topic, for example derivative")}
              aria-label={t(lang, "Tìm chuyên đề", "Search topics")}
              autoComplete="off"
            />
          </form>
          <ProgressLine />
        </div>
      </section>
      {visible.length === 0 ? (
        <p className="empty">{t(lang, `Không thấy chuyên đề nào với “${query.trim()}”.`, `No topic matches “${query.trim()}”.`)}</p>
      ) : (
        <>
          {first.length > 0 ? (
            <section className="stream" aria-labelledby="stream-mine">
              <h2 id="stream-mine">{t(lang, `Chuyên đề lớp ${mine}`, `Grade ${mine} topics`)}</h2>
              <div className="topic-list">
                {first.map((topic) => <TopicRow key={topic.id} id={topic.id} />)}
              </div>
            </section>
          ) : null}
          {streams.map((stream) => {
            const rows = rest.filter((topic) => topic.stream === stream.id);
            if (rows.length === 0) return null;
            return (
              <section className="stream" key={stream.id} aria-labelledby={`stream-${stream.id}`}>
                <h2 id={`stream-${stream.id}`}>{lang === "en" ? stream.en : stream.vi}{mine ? t(lang, " · lớp khác", " · other grades") : ""}</h2>
                <div className="topic-list">
                  {rows.map((topic) => <TopicRow key={topic.id} id={topic.id} />)}
                </div>
              </section>
            );
          })}
        </>
      )}
    </>
  );
}

/** Nhãn lớp của chuyên đề là một lớp ("11") hoặc một khoảng ("10–12"). */
function inGrade(label: string, grade: string): boolean {
  const [from, to] = label.split("–").map(Number);
  const value = Number(grade);
  return from !== undefined && value >= from && value <= (to ?? from);
}

function Sciences() {
  const lang = useLang();
  return (
    <section className="stream" aria-labelledby="science-home">
      <h2 id="science-home">{t(lang, "Khoa học", "Science")}</h2>
      <p className="lecture-note">
        {t(lang, "Năm mảng gần với toán, nằm ngoài chương trình môn Toán: lập trình, số liệu, đề chuyên, vật lý và hóa.", "Five areas beside the maths course: programming, data, specialised papers, physics and chemistry.")}
      </p>
      <div className="science-list">
        {sciences.map((item) => (
          <A key={item.id} className="study-card" href={`/khoa-hoc/${item.id}`}>
            <span>
              <strong>{item.title}</strong>
              <small className="lecture-note">{item.blurb}</small>
            </span>
          </A>
        ))}
      </div>
    </section>
  );
}

const CORNER_KEY = "bt-desk-corner";

/**
 * Góc bàn: đèn, cửa sổ, đồng hồ và các tiện ích nhỏ, gập lại mặc định để trang chủ bắt đầu bằng việc học.
 * Vẫn được dựng khi gập (thẻ details), nên đèn bàn vẫn chiếu sáng trang như trước.
 */
function DeskCorner() {
  const lang = useLang();
  const [open, setOpen] = useState(() => {
    try { return localStorage.getItem(CORNER_KEY) === "1"; } catch { return false; }
  });
  return (
    <details
      className="desk-corner"
      open={open}
      onToggle={(event) => {
        const next = event.currentTarget.open;
        setOpen(next);
        try { localStorage.setItem(CORNER_KEY, next ? "1" : "0"); } catch { /* ignore */ }
      }}
    >
      <summary>
        <b>{t(lang, "Góc bàn", "Desk corner")}</b>
        <span>{t(lang, "Đèn, cửa sổ, đồng hồ, sổ tay và đường tiến độ.", "Lamp, window, clocks, notepad and your progress curve.")}</span>
      </summary>
      <DeskTools />
      <Room />
    </details>
  );
}

function ProgressLine() {
  const lang = useLang();
  const done = Math.min(useSlice((data) => countRight(data.right)), QUESTION_TOTAL);
  return (
    <p className="progress-line">
      {done === 0
        ? t(lang, "Chưa ghi câu nào trên máy này.", "No answers saved on this device yet.")
        : t(lang, `Đúng ${done}/${QUESTION_TOTAL} câu, lưu trên máy này.`, `${done}/${QUESTION_TOTAL} correct, saved on this device.`)}
    </p>
  );
}

function Continue() {
  const lang = useLang();
  const lastId = useSlice((data) => data.lastId);
  const topic = cards.find((item) => item.id === (lastId ?? "quadratic")) ?? cards[0];
  const params = useSlice((data) => (topic ? data.params[topic.id] : undefined));
  const paramsKey = JSON.stringify(params ?? null);
  const [summary, setSummary] = useState<{ id: string; lang: string; paramsKey: string; text: string } | null>(null);

  useEffect(() => {
    if (!topic) return;
    let live = true;
    const topicId = topic.id;
    const run = () => {
      void import("../content/summary.ts").then((mod) => {
        if (!live) return;
        setSummary({ id: topicId, lang, paramsKey, text: mod.topicSummary(topicId, params, lang) });
      });
    };
    let idle = 0;
    let timer = 0;
    const host = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const start = () => {
      if (host.requestIdleCallback) idle = host.requestIdleCallback(run, { timeout: 4000 });
      else timer = window.setTimeout(run, 1500);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      live = false;
      window.removeEventListener("load", start);
      host.cancelIdleCallback?.(idle);
      window.clearTimeout(timer);
    };
  }, [topic, params, paramsKey, lang]);

  if (!topic) return null;
  const line = summary && summary.id === topic.id && summary.lang === lang && summary.paramsKey === paramsKey
    ? summary.text
    : lang === "en" ? topic.blurbEn : topic.blurb;
  return (
    <A className="continue" href={`/t/${topic.id}`}>
      <span>{lastId ? t(lang, "Chuyên đề đang mở", "Open topic") : t(lang, "Chuyên đề đầu tiên", "First topic")}</span>
      <strong>{lang === "en" ? topic.titleEn : topic.title}</strong>
      <em>{line}</em>
    </A>
  );
}

function TopicRow({ id }: { id: string }) {
  const lang = useLang();
  const topic = cards.find((item) => item.id === id);
  const done = useSlice((data) => countRight(data.right, id));
  const last = useSlice((data) => data.lastId === id);
  if (!topic) return null;
  const ready = topic.status === "ready";
  return (
    <A className={`topic${last ? " is-last" : ""}${ready ? "" : " is-stub"}`} href={`/t/${topic.id}`} data-topic={topic.id}>
      <span className="num">{topic.n}</span>
      <Motion id={topic.id} variant="card" />
      <span className="topic-copy">
        <strong>{lang === "en" ? topic.titleEn : topic.title}</strong>
        <small>
          {t(lang, "Lớp", "Grade")} {topic.grade}
          {" · "}
          {streamName(topic.stream, lang)}
        </small>
      </span>
      <span className="topic-meta">
        {ready
          ? <><span className="sr">{t(lang, "Đã đúng ", "Correct ")}</span>{`${Math.min(done, topic.questions)}/${topic.questions}`}<span className="sr">{t(lang, " câu", " questions")}</span></>
          : t(lang, "Đang soạn", "In draft")}
      </span>
    </A>
  );
}

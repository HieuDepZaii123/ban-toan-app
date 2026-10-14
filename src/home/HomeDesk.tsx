import { useEffect, useMemo, useRef, useState } from "react";
import { QUESTION_TOTAL, streamName, streams, topics } from "../content/catalog.ts";
import { topicSummary } from "../content/summary.ts";
import { A } from "../lib/route.tsx";
import { countRight, useSlice } from "../lib/store.ts";
import { fold, t } from "../lib/text.ts";
import { Prefs, useLang } from "../ui/Prefs.tsx";
import { Spark } from "./Spark.tsx";

export function HomeDesk() {
  const lang = useLang();
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const folded = fold(query.trim());

  useEffect(() => {
    document.title = "Bàn Toán";
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
      event.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const visible = useMemo(
    () =>
      topics.filter((topic) => {
        if (!folded) return true;
        const hay = fold(`${topic.title} ${topic.titleEn} ${topic.blurb} ${topic.blurbEn} ${streamName(topic.stream, "vi")} ${streamName(topic.stream, "en")}`);
        return hay.includes(folded);
      }),
    [folded],
  );

  return (
    <div className="desk">
      <a className="skip" href="#content">{t(lang, "Vào nội dung", "Skip to content")}</a>
      <header className="bar">
        <A className="brand" href="/">Bàn Toán</A>
        <form className="search" role="search" onSubmit={(event) => event.preventDefault()}>
          <input
            id="search"
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t(lang, "Tìm tờ, ví dụ đạo hàm", "Find a sheet, for example derivative")}
            aria-label={t(lang, "Tìm chuyên đề", "Search topics")}
            autoComplete="off"
          />
        </form>
        <Prefs />
      </header>
      <main id="content">
        <p className="kicker">{t(lang, "Lớp 10 – 12", "Grades 10–12")}</p>
        <h1>{t(lang, "Bàn làm việc cho toán THPT.", "A workbench for high-school maths.")}</h1>
        <p className="lead">
          {t(
            lang,
            "Kéo tham số, đọc số vừa tính, rồi làm câu có lời giải. Sáu tờ đã mở. Tám tờ kia giữ chỗ, hình và đề đang soạn.",
            "Drag a parameter, read the number you just computed, then answer a question with a worked solution. Six sheets are open. Eight others keep their place while the figures and questions are written.",
          )}
        </p>
        <ProgressLine />
        {folded ? null : <Continue />}
        {visible.length === 0 ? (
          <p className="empty">{t(lang, `Không thấy tờ nào với “${query.trim()}”.`, `No sheet matches “${query.trim()}”.`)}</p>
        ) : (
          streams.map((stream) => {
            const rows = visible.filter((topic) => topic.stream === stream.id);
            if (rows.length === 0) return null;
            return (
              <section className="stream" key={stream.id} aria-labelledby={`stream-${stream.id}`}>
                <h2 id={`stream-${stream.id}`}>{lang === "en" ? stream.en : stream.vi}</h2>
                <div className="topic-list">
                  {rows.map((topic) => (
                    <TopicRow key={topic.id} id={topic.id} />
                  ))}
                </div>
              </section>
            );
          })
        )}
        <p className="foot">{t(lang, "Số liệu nằm trên máy này. Sau lần mở đầu, bàn vẫn dùng được khi mất mạng.", "Numbers stay on this device. After the first load, the desk works offline.")}</p>
      </main>
    </div>
  );
}

function ProgressLine() {
  const lang = useLang();
  const done = useSlice((data) => countRight(data.right));
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
  const params = useSlice((data) => (lastId ? data.params[lastId] : data.params.quadratic));
  const topic = topics.find((item) => item.id === (lastId ?? "quadratic")) ?? topics[0];
  if (!topic) return null;
  const summary = topic.status === "ready" ? topicSummary(topic.id, params, lang) : "";
  return (
    <A className="continue" href={`/t/${topic.id}`}>
      <span>{lastId ? t(lang, "Tờ đang mở", "Open sheet") : t(lang, "Bắt đầu", "Start")}</span>
      <strong>{lang === "en" ? topic.titleEn : topic.title}</strong>
      {summary ? <em>{summary}</em> : <em>{lang === "en" ? topic.blurbEn : topic.blurb}</em>}
    </A>
  );
}

function TopicRow({ id }: { id: string }) {
  const lang = useLang();
  const topic = topics.find((item) => item.id === id);
  const done = useSlice((data) => countRight(data.right, id));
  const last = useSlice((data) => data.lastId === id);
  if (!topic) return null;
  const ready = topic.status === "ready";
  return (
    <A className={`topic${last ? " is-last" : ""}${ready ? "" : " is-stub"}`} href={`/t/${topic.id}`} data-topic={topic.id}>
      <span className="num">{topic.n}</span>
      <Spark id={topic.id} />
      <span className="topic-copy">
        <strong>{lang === "en" ? topic.titleEn : topic.title}</strong>
        <small>
          {t(lang, "Lớp", "Grade")} {topic.grade}
          {" · "}
          {streamName(topic.stream, lang)}
        </small>
      </span>
      <span className="topic-meta">{ready ? `${Math.min(done, topic.questions)}/${topic.questions}` : t(lang, "Đang soạn", "In draft")}</span>
    </A>
  );
}

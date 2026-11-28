import { useEffect, useMemo, useRef, useState } from "react";
import { cards, QUESTION_TOTAL, streamName, streams } from "../content/cards.ts";
import { A } from "../lib/route.tsx";
import { sciences } from "../science/catalog.ts";
import { countRight, useSlice } from "../lib/store.ts";
import { toggleBookmark, isBookmarked } from "../lib/store.ts";
import { fold, t } from "../lib/text.ts";
import { SiteHeader } from "../ui/SiteHeader.tsx";
import { SiteFooter } from "../ui/SiteFooter.tsx";
import { useLang } from "../ui/useLang.ts";
import { Motion } from "../motion/Motion.tsx";
import { Room } from "./Room.tsx";
import { DeskTools, Welcome } from "./Welcome.tsx";
import { WhyDifferent } from "./WhyDifferent.tsx";

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
      cards.filter((topic) => {
        if (!folded) return true;
        const hay = fold(`${topic.title} ${topic.titleEn} ${topic.blurb} ${topic.blurbEn} ${streamName(topic.stream, "vi")} ${streamName(topic.stream, "en")}`);
        return hay.includes(folded);
      }),
    [folded],
  );

  return (
    <div className="desk">
      <a className="skip" href="#content">{t(lang, "Vào nội dung", "Skip to content")}</a>
      <SiteHeader />
      <main id="content">
        <Welcome
          searching={folded !== ""}
          start={
            <section className={`home-start${folded ? " is-searching" : ""}`} aria-label={t(lang, "Bắt đầu", "Start")}>
              {folded ? null : <Continue />}
              <div className="home-find">
                <form className="search home-search" role="search" onSubmit={(event) => event.preventDefault()}>
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
                <ProgressLine />
              </div>
            </section>
          }
        />
        <div id="chuyen-de" className="topic-anchor" />
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
        <section className="stream" aria-labelledby="science-home">
          <h2 id="science-home">{t(lang, "Khoa học", "Science")}</h2>
          <p className="lecture-note">
            {t(lang, "Năm mảng này nằm ngoài mười bốn chuyên đề Toán. Mỗi mảng có video.", "These five areas sit outside the fourteen maths topics. Each one has a video.")}
          </p>
          <div className="science-list">
            {sciences.map((item) => (
              <A key={item.id} className="study-card" href={`/khoa-hoc/${item.id}`}>
                <span>
                  <strong>{t(lang, item.title, item.titleEn)}</strong>
                  <small className="lecture-note">{t(lang, item.blurb, item.blurbEn)}</small>
                </span>
              </A>
            ))}
          </div>
        </section>
        <WhyDifferent />
        <DeskCorner />
      </main>
      <SiteFooter />
    </div>
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
  const streaks = useSlice((data) => data.streaks);
  return (
    <p className="progress-line">
      {done === 0 && streaks === 0
        ? t(lang, "Chưa ghi câu nào trên máy này.", "No answers saved on this device yet.")
        : t(lang, `${done}/${QUESTION_TOTAL} câu đúng, ${streaks} ngày liên tiếp.`, `${done}/${QUESTION_TOTAL} correct, ${streaks}-day streak.`)}
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
      <span>{lastId ? t(lang, "Tờ đang mở", "Open sheet") : t(lang, "Bắt đầu", "Start")}</span>
      <strong>{lang === "en" ? topic.titleEn : topic.title}</strong>
      <em>{line}</em>
      <b className="continue-go" aria-hidden="true">{lastId ? t(lang, "Học tiếp", "Continue") : t(lang, "Bắt đầu học", "Start")} →</b>
    </A>
  );
}

function TopicRow({ id }: { id: string }) {
  const lang = useLang();
  const topic = cards.find((item) => item.id === id);
  const done = useSlice((data) => countRight(data.right, id));
  const last = useSlice((data) => data.lastId === id);
  const bookmarked = useSlice((data) => isBookmarked(id));
  if (!topic) return null;
  const ready = topic.status === "ready";
  return (
    <A className={`topic${last ? " is-last" : ""}${ready ? "" : " is-stub"}${bookmarked ? " is-bookmarked" : ""}`} href={`/t/${topic.id}`} data-topic={topic.id}>
      <span className="num">{topic.n}</span>
      {bookmarked ? (<span className="topic-bookmark" aria-label={t(lang, "Đã lưu", "Bookmarked")}>★</span>) : null}
      <Motion id={topic.id} variant="card" />
      <span className="topic-copy">
        <strong>{lang === "en" ? topic.titleEn : topic.title}</strong>
        <small>
          {t(lang, "Lớp", "Grade")} {topic.grade}
          {" · "}
          {streamName(topic.stream, lang)}
        </small>
      </span>
      <span className="topic-meta">{ready ? `${Math.min(done, topic.questions)}/${topic.questions}` : t(lang, "Đang soạn", "In draft")}</span>
      <button type="button" className="topic-bookmark-btn" aria-pressed={bookmarked} onClick={(event) => { event.preventDefault(); toggleBookmark(id); }}>
        {bookmarked ? t(lang, "Bỏ lưu", "Unbookmark") : t(lang, "Lưu", "Bookmark")}
      </button>
    </A>
  );
}

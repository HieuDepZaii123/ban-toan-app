import { useEffect } from "react";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { LectureVideos } from "../topic/LectureVideos.tsx";
import { AreaNav } from "../ui/AreaNav.tsx";
import { Prefs } from "../ui/Prefs.tsx";
import { useLang } from "../ui/useLang.ts";
import { scienceById, sciences } from "./catalog.ts";

export function ScienceDesk({ path }: { path: string }) {
  const lang = useLang();
  const id = path.startsWith("/khoa-hoc/") ? decodeURIComponent(path.slice("/khoa-hoc/".length)) : "";
  const topic = id ? scienceById(id) : undefined;

  useEffect(() => {
    document.title = topic ? `${topic.title} · Bàn Toán` : "Khoa học · Bàn Toán";
  }, [topic]);

  return (
    <div className="desk">
      <a className="skip" href="#content">{t(lang, "Vào nội dung", "Skip to content")}</a>
      <header className="bar">
        <A className="brand" href="/">Bàn Toán</A>
        <AreaNav />
        <Prefs />
      </header>
      <main id="content">
        {!id ? <ScienceHome /> : topic ? (
          <ScienceTopic id={topic.id} title={topic.title} blurb={topic.blurb} />
        ) : (
          <p className="empty">
            {t(lang, "Không có mảng này.", "This area is not on the desk.")}{" "}
            <A href="/khoa-hoc">{t(lang, "Về Khoa học", "Back to Science")}</A>
          </p>
        )}
      </main>
    </div>
  );
}

function ScienceHome() {
  const lang = useLang();
  return (
    <>
      <p className="kicker">{t(lang, "Khoa học", "Science")}</p>
      <h1>{t(lang, "Năm mảng sát bên toán.", "Five areas beside the maths.")}</h1>
      <p className="lead">
        {t(
          lang,
          "Lập trình, số liệu, đề chuyên, vật lý và hóa tính toán. Mỗi mảng có video bài giảng riêng, tách khỏi mười bốn chuyên đề Toán.",
          "Programming, data, specialised papers, physics and calculation chemistry. Each area has its own lecture videos, apart from the fourteen maths topics.",
        )}
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
    </>
  );
}

function ScienceTopic({ id, title, blurb }: { id: string; title: string; blurb: string }) {
  const lang = useLang();
  return (
    <>
      <p className="kicker">{t(lang, "Khoa học", "Science")}</p>
      <h1>{title}</h1>
      <p className="lead">{blurb}</p>
      <p>
        <A href="/khoa-hoc">{t(lang, "← Các mảng Khoa học", "← Science areas")}</A>
      </p>
      <LectureVideos topicId={id} />
    </>
  );
}


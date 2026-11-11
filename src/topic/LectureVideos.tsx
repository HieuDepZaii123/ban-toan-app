import { useState } from "react";
import { embedUrl, lecturesFor, SAMPLE_YOUTUBE_ID, type LectureLevel } from "../content/lectures.ts";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { usePremium } from "../premium/license.ts";
import { useLang } from "../ui/useLang.ts";

export function LectureVideos({ topicId }: { topicId: string }) {
  const lang = useLang();
  const [level, setLevel] = useState<LectureLevel>("basic");
  const [playing, setPlaying] = useState<string | null>(null);
  const premium = usePremium();
  const all = lecturesFor(topicId);
  if (all.length === 0) return null;
  // Only real lectures are shown to students; empty and sample slots stay in the data until filled.
  const ready = all.filter((video) => embedUrl(video.youtubeId) !== null && video.youtubeId !== SAMPLE_YOUTUBE_ID);
  if (ready.length === 0) return null;
  const list = ready.filter((video) => video.level === level);
  // Basics lectures are free; exam-level lectures are part of Premium.
  const locked = level === "exam" && premium.kind !== "active";
  return (
    <section className="lectures" aria-labelledby="lecture-title">
      <h2 id="lecture-title">{t(lang, "Video bài giảng", "Lecture videos")}</h2>
      <p className="lecture-note">
        {t(lang, "Bấm để mở. Video không tự phát.", "Press to open. Videos do not autoplay.")}
      </p>
      <div className="read-switch" role="tablist" aria-label={t(lang, "Mức video", "Video level")}>
        <button type="button" role="tab" aria-selected={level === "basic"} onClick={() => { setLevel("basic"); setPlaying(null); }}>
          {t(lang, "Cơ bản", "Basics")}
        </button>
        <button type="button" role="tab" aria-selected={level === "exam"} onClick={() => { setLevel("exam"); setPlaying(null); }}>
          {t(lang, "Chuẩn thi", "Exam")}
        </button>
      </div>
      {locked && list.length > 0 ? (
        <p className="pay-card">
          <b>{t(lang, `${list.length} video chuẩn thi là Premium.`, `${list.length} exam-level videos are Premium.`)}</b>
          <span>{premium.kind === "checking" ? t(lang, " Đang kiểm mã Premium…", " Checking your Premium key…") : t(lang, " Video cơ bản xem miễn phí.", " Basics videos are free to watch.")}</span>{" "}
          <A href="/nang-cap">{t(lang, "Xem Premium", "See Premium")}</A>
        </p>
      ) : null}
      {(locked ? [] : list).map((video) => {
        const src = embedUrl(video.youtubeId);
        const open = playing === video.slot && src !== null;
        return (
          <article key={video.slot} className="lecture">
            <h3>{video.title}</h3>
            {open && src ? (
              <iframe
                className="lecture-frame"
                title={video.title}
                src={src}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <button type="button" className="lecture-poster" disabled={src === null} onClick={() => setPlaying(video.slot)}>
                <span>{src ? t(lang, "Xem video", "Play") : t(lang, "Sắp có", "Coming soon")}</span>
                <small>
                  {t(lang, "YouTube", "YouTube")}
                </small>
              </button>
            )}
          </article>
        );
      })}
    </section>
  );
}

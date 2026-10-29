import { useState } from "react";
import { isYoutubeId, lecturesFor, type LectureLevel } from "../content/lectures.ts";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";

export function LectureVideos({ topicId }: { topicId: string }) {
  const lang = useLang();
  const [level, setLevel] = useState<LectureLevel>("basic");
  const [playing, setPlaying] = useState<string | null>(null);
  const all = lecturesFor(topicId);
  if (all.length === 0) return null;
  const list = all.filter((video) => video.level === level);
  return (
    <section className="lectures" aria-labelledby="lecture-title">
      <h2 id="lecture-title">{t(lang, "Video bài giảng", "Lecture videos")}</h2>
      <div className="read-switch" role="tablist" aria-label={t(lang, "Mức video", "Video level")}>
        <button type="button" role="tab" aria-selected={level === "basic"} onClick={() => { setLevel("basic"); setPlaying(null); }}>
          {t(lang, "Cơ bản", "Basics")}
        </button>
        <button type="button" role="tab" aria-selected={level === "exam"} onClick={() => { setLevel("exam"); setPlaying(null); }}>
          {t(lang, "Chuẩn thi", "Exam")}
        </button>
      </div>
      {list.map((video) => {
        const ready = isYoutubeId(video.youtubeId);
        const open = playing === video.slot && ready;
        return (
          <article key={video.slot} className="lecture">
            <h3>{video.title}</h3>
            {open ? (
              <iframe
                className="lecture-frame"
                title={video.title}
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0`}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <button type="button" className="lecture-poster" disabled={!ready} onClick={() => setPlaying(video.slot)}>
                <span>{ready ? t(lang, "Xem video", "Play") : t(lang, "Chưa gắn video", "No video yet")}</span>
                <small>{ready ? video.youtubeId : t(lang, "Thay youtubeId trong dữ liệu chủ đề", "Replace youtubeId in the topic data")}</small>
              </button>
            )}
          </article>
        );
      })}
    </section>
  );
}

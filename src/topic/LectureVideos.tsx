import { useState } from "react";
import { embedUrl, lecturesFor, SAMPLE_YOUTUBE_ID, type LectureLevel } from "../content/lectures.ts";
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
      <p className="lecture-note">
        {t(lang, "Bấm để mở. Video không tự phát. Id YouTube sửa trong dữ liệu bài giảng.", "Press to open. Videos do not autoplay. Edit the YouTube id in the lecture data.")}
      </p>
      <div className="read-switch" role="tablist" aria-label={t(lang, "Mức video", "Video level")}>
        <button type="button" role="tab" aria-selected={level === "basic"} onClick={() => { setLevel("basic"); setPlaying(null); }}>
          {t(lang, "Cơ bản", "Basics")}
        </button>
        <button type="button" role="tab" aria-selected={level === "exam"} onClick={() => { setLevel("exam"); setPlaying(null); }}>
          {t(lang, "Chuẩn thi", "Exam")}
        </button>
      </div>
      {list.map((video) => {
        const src = embedUrl(video.youtubeId);
        const open = playing === video.slot && src !== null;
        const sample = video.youtubeId === SAMPLE_YOUTUBE_ID;
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
                  {src
                    ? sample
                      ? t(lang, "Video mẫu — thay youtubeId khi có bài giảng", "Sample video — replace youtubeId when the lecture is ready")
                      : t(lang, "YouTube", "YouTube")
                    : t(lang, "Chưa có đường dẫn. Điền youtubeId trong dữ liệu.", "No link yet. Fill youtubeId in the data.")}
                </small>
              </button>
            )}
          </article>
        );
      })}
    </section>
  );
}

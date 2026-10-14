import { t } from "../lib/text.ts";
import type { Lang } from "../lib/math.ts";

export function SceneBar({
  lang,
  scenes,
  scene,
  calm,
  playing,
  onScene,
  onPlay,
}: {
  lang: Lang;
  scenes: { id: number; vi: string; en: string }[];
  scene: number;
  calm: boolean;
  playing: boolean;
  onScene: (id: number) => void;
  onPlay: () => void;
}) {
  return (
    <div className="stage-bar">
      <div className="chips" role="group" aria-label={t(lang, "Hình", "Figure")}>
        {scenes.map((item) => (
          <button key={item.id} type="button" aria-pressed={scene === item.id} onClick={() => onScene(item.id)}>
            {lang === "en" ? item.en : item.vi}
          </button>
        ))}
      </div>
      <button type="button" className="play" aria-pressed={playing} disabled={calm} onClick={onPlay}>
        {calm ? t(lang, "Tắt chuyển động", "Motion off") : playing ? t(lang, "Dừng", "Stop") : t(lang, "Chạy", "Play")}
      </button>
    </div>
  );
}

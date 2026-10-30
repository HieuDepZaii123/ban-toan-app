import { useState } from "react";
import { setLang, setTheme, useSlice } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { effectiveTheme, readThemeMode, writeThemeMode, type ThemeMode } from "./themeMode.ts";

export function Prefs() {
  const theme = useSlice((data) => data.theme);
  const lang = useSlice((data) => data.lang);
  const [mode, setMode] = useState<ThemeMode>(() => readThemeMode(theme));
  const [rain, setRain] = useState(() => {
    try { return localStorage.getItem("bt-rain") === "on"; } catch { return false; }
  });
  const [volume, setVolume] = useState(() => {
    try { return localStorage.getItem("bt-rain-vol") || "40"; } catch { return "40"; }
  });

  const choose = (next: ThemeMode) => {
    setMode(next);
    writeThemeMode(next);
    setTheme(effectiveTheme(next));
  };

  return (
    <div className="prefs">
      <label className="theme-pick">
        <span className="sr">{t(lang, "Giao diện", "Appearance")}</span>
        <select aria-label={t(lang, "Giao diện", "Appearance")} value={mode} onChange={(event) => choose(event.target.value as ThemeMode)}>
          <option value="day">{t(lang, "Ngày", "Day")}</option>
          <option value="night">{t(lang, "Đêm ấm", "Warm night")}</option>
          <option value="auto">{t(lang, "Tự động sau 21h", "Auto after 21:00")}</option>
        </select>
      </label>
      <label className="rain-pick">
        <input
          type="checkbox"
          checked={rain}
          onChange={(event) => {
            setRain(event.target.checked);
            try { localStorage.setItem("bt-rain", event.target.checked ? "on" : "off"); } catch { /* ignore */ }
            window.dispatchEvent(new Event("bt-rain"));
          }}
        />
        {t(lang, "Tiếng mưa", "Rain")}
      </label>
      <input
        className="rain-vol"
        type="range"
        min={0}
        max={100}
        value={volume}
        aria-label={t(lang, "Âm lượng tiếng mưa", "Rain volume")}
        onChange={(event) => {
          setVolume(event.target.value);
          try { localStorage.setItem("bt-rain-vol", event.target.value); } catch { /* ignore */ }
          window.dispatchEvent(new Event("bt-rain"));
        }}
      />
      <div className="seg" role="group" aria-label={t(lang, "Ngôn ngữ", "Language")}>
        <button type="button" aria-pressed={lang === "vi"} onClick={() => setLang("vi")}>VI</button>
        <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
      </div>
    </div>
  );
}

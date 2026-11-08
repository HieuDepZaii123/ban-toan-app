import { useEffect, useId, useRef, useState } from "react";
import { setLang, setTheme, useSlice } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { OPEN_MENU_EVENT } from "./events.ts";
import { effectiveTheme, readThemeMode, writeThemeMode, type ThemeMode } from "./themeMode.ts";


/** Nút Tùy chọn (giao diện, tiếng mưa, ngôn ngữ) và nút Mục lục ở góc phải thanh đầu trang. */
export function Prefs() {
  const theme = useSlice((data) => data.theme);
  const lang = useSlice((data) => data.lang);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ThemeMode>(() => readThemeMode(theme));
  const [rain, setRain] = useState(() => {
    try { return localStorage.getItem("bt-rain") === "on"; } catch { return false; }
  });
  const [volume, setVolume] = useState(() => {
    try { return localStorage.getItem("bt-rain-vol") || "40"; } catch { return "40"; }
  });
  const box = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (box.current && !box.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      opener.current?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (next: ThemeMode) => {
    setMode(next);
    writeThemeMode(next);
    setTheme(effectiveTheme(next));
  };

  return (
    <div className="prefs" ref={box}>
      <button
        ref={opener}
        type="button"
        className="head-btn"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {t(lang, "Tùy chọn", "Settings")}
      </button>
      <button type="button" className="head-btn" onClick={() => window.dispatchEvent(new Event(OPEN_MENU_EVENT))}>
        {t(lang, "Mục lục", "Menu")}
      </button>
      {open ? (
        <div className="prefs-panel" id={panelId} role="group" aria-label={t(lang, "Tùy chọn", "Settings")}>
          <label className="prefs-row">
            <span>{t(lang, "Giao diện", "Appearance")}</span>
            <select value={mode} onChange={(event) => choose(event.target.value as ThemeMode)}>
              <option value="day">{t(lang, "Ngày", "Day")}</option>
              <option value="night">{t(lang, "Đêm ấm", "Warm night")}</option>
              <option value="auto">{t(lang, "Tự động sau 21h", "Auto after 21:00")}</option>
            </select>
          </label>
          <label className="prefs-row">
            <span>{t(lang, "Tiếng mưa", "Rain sound")}</span>
            <input
              type="checkbox"
              checked={rain}
              onChange={(event) => {
                setRain(event.target.checked);
                try { localStorage.setItem("bt-rain", event.target.checked ? "on" : "off"); } catch { /* ignore */ }
                window.dispatchEvent(new Event("bt-rain"));
              }}
            />
          </label>
          <label className="prefs-row">
            <span>{t(lang, "Âm lượng mưa", "Rain volume")}</span>
            <input
              className="rain-vol"
              type="range"
              min={0}
              max={100}
              value={volume}
              disabled={!rain}
              onChange={(event) => {
                setVolume(event.target.value);
                try { localStorage.setItem("bt-rain-vol", event.target.value); } catch { /* ignore */ }
                window.dispatchEvent(new Event("bt-rain"));
              }}
            />
          </label>
          <div className="prefs-row">
            <span>{t(lang, "Ngôn ngữ", "Language")}</span>
            <div className="seg" role="group" aria-label={t(lang, "Ngôn ngữ", "Language")}>
              <button type="button" aria-pressed={lang === "vi"} onClick={() => setLang("vi")}>Tiếng Việt</button>
              <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>English</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

import { useEffect, useId, useRef, useState } from "react";
import { A } from "../lib/route.tsx";
import { setLang, setTheme, useSlice } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { openChat, openMenu, openMusic } from "./events.ts";
import { usePref, writePref } from "./prefs.ts";
import { effectiveTheme, readThemeMode, writeThemeMode, type ThemeMode } from "./themeMode.ts";

/**
 * Góc phải thanh đầu trang: Hỏi toán, đổi ngôn ngữ, Tùy chọn và Mục lục.
 * Tùy chọn gồm giao diện, cỡ chữ, chữ dễ đọc, tương phản, hiệu ứng, phím tắt, ngôn ngữ và âm thanh.
 */
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
  const font = usePref("bt-font") || "m";
  const easyRead = usePref("bt-read") === "on";
  const contrast = usePref("bt-contrast") === "on";
  const lessMotion = usePref("bt-motion") === "less";
  const keys = usePref("bt-keys") !== "off";
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

  const close = () => {
    setOpen(false);
    opener.current?.focus();
  };

  return (
    <div className="prefs" ref={box}>
      <button type="button" className="head-btn wide-only" onClick={openChat}>
        {t(lang, "Hỏi toán", "Ask maths")}
      </button>
      <button
        type="button"
        className="head-btn lang-btn"
        lang={lang === "en" ? "vi" : "en"}
        aria-label={lang === "en" ? "Chuyển sang tiếng Việt" : "Switch to English"}
        onClick={() => setLang(lang === "en" ? "vi" : "en")}
      >
        {lang === "en" ? "VI" : "EN"}
      </button>
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
      <button type="button" className="head-btn wide-only" onClick={openMenu}>
        {t(lang, "Mục lục", "Menu")}
      </button>
      {open ? (
        <div className="prefs-panel" id={panelId} role="group" aria-label={t(lang, "Tùy chọn", "Settings")}>
          <div className="prefs-head">
            <b>{t(lang, "Tùy chọn", "Settings")}</b>
            <button type="button" className="text-btn" onClick={close}>{t(lang, "Đóng", "Close")}</button>
          </div>
          <label className="prefs-row">
            <span>{t(lang, "Giao diện", "Appearance")}</span>
            <select value={mode} onChange={(event) => choose(event.target.value as ThemeMode)}>
              <option value="system">{t(lang, "Theo máy", "Match device")}</option>
              <option value="day">{t(lang, "Ngày", "Day")}</option>
              <option value="night">{t(lang, "Đêm ấm", "Warm night")}</option>
              <option value="auto">{t(lang, "Tự động sau 21h", "Auto after 21:00")}</option>
            </select>
          </label>
          <label className="prefs-row">
            <span>{t(lang, "Cỡ chữ", "Text size")}</span>
            <select value={font} onChange={(event) => writePref("bt-font", event.target.value === "m" ? "" : event.target.value)}>
              <option value="s">{t(lang, "Nhỏ", "Small")}</option>
              <option value="m">{t(lang, "Vừa", "Medium")}</option>
              <option value="l">{t(lang, "Lớn", "Large")}</option>
              <option value="xl">{t(lang, "Rất lớn", "Extra large")}</option>
            </select>
          </label>
          <label className="prefs-row">
            <span>
              {t(lang, "Chữ dễ đọc", "Easy reading")}
              <small>{t(lang, "Phông không chân, giãn chữ và giãn dòng", "Plain letters, wider spacing")}</small>
            </span>
            <input type="checkbox" checked={easyRead} onChange={(event) => writePref("bt-read", event.target.checked ? "on" : "")} />
          </label>
          <label className="prefs-row">
            <span>{t(lang, "Tương phản cao", "High contrast")}</span>
            <input type="checkbox" checked={contrast} onChange={(event) => writePref("bt-contrast", event.target.checked ? "on" : "")} />
          </label>
          <label className="prefs-row">
            <span>
              {t(lang, "Giảm hiệu ứng", "Fewer effects")}
              <small>{t(lang, "Tắt nền chuyển động và hoạt ảnh, đỡ tốn pin", "No moving backdrop or animation; saves battery")}</small>
            </span>
            <input type="checkbox" checked={lessMotion} onChange={(event) => writePref("bt-motion", event.target.checked ? "less" : "")} />
          </label>
          <label className="prefs-row">
            <span>
              {t(lang, "Phím tắt số", "Number shortcuts")}
              <small>{t(lang, "Phím 1–4 chọn đáp án khi làm bài", "Keys 1–4 pick an answer in practice")}</small>
            </span>
            <input type="checkbox" checked={keys} onChange={(event) => writePref("bt-keys", event.target.checked ? "" : "off")} />
          </label>
          <div className="prefs-row">
            <span>{t(lang, "Ngôn ngữ", "Language")}</span>
            <div className="seg" role="group" aria-label={t(lang, "Ngôn ngữ", "Language")}>
              <button type="button" aria-pressed={lang === "vi"} onClick={() => setLang("vi")}>Tiếng Việt</button>
              <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>English</button>
            </div>
          </div>
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
            <span>{t(lang, "Hồ sơ, sao lưu, xóa dữ liệu", "Profiles, backup, delete data")}</span>
            <A className="text-btn" href="/du-lieu" onClick={() => setOpen(false)}>{t(lang, "Mở", "Open")}</A>
          </div>
          <div className="prefs-row">
            <span>{t(lang, "Nhạc học", "Study music")}</span>
            <button
              type="button"
              className="text-btn"
              onClick={() => {
                setOpen(false);
                openMusic();
                window.setTimeout(() => document.getElementById("nhac-phat")?.focus(), 0);
              }}
            >
              {t(lang, "Mở", "Open")}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

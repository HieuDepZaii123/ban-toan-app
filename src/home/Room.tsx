import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";
import { isSceneMode, sceneFromHour, SCENES, ZONES, type SceneId, type SceneMode } from "./day.ts";

const ROOM_KEY = "ban-toan-room";

const art = {
  morning: lazy(() => import("./art/morning.tsx").then((mod) => ({ default: mod.Morning }))),
  noon: lazy(() => import("./art/noon.tsx").then((mod) => ({ default: mod.Noon }))),
  afternoon: lazy(() => import("./art/afternoon.tsx").then((mod) => ({ default: mod.Afternoon }))),
  evening: lazy(() => import("./art/evening.tsx").then((mod) => ({ default: mod.Evening }))),
};

function readRoom(): { lamp: boolean; mode: SceneMode } {
  try {
    const raw = JSON.parse(localStorage.getItem(ROOM_KEY) || "null") as { lamp?: unknown; scene?: unknown };
    return { lamp: raw?.lamp !== false, mode: isSceneMode(raw?.scene) ? raw.scene : "auto" };
  } catch {
    return { lamp: true, mode: "auto" };
  }
}

export function Room() {
  const lang = useLang();
  const [lamp, setLamp] = useState(() => readRoom().lamp);
  const [mode, setMode] = useState<SceneMode>(() => readRoom().mode);

  useEffect(() => {
    document.documentElement.dataset.lamp = lamp ? "on" : "off";
    try {
      localStorage.setItem(ROOM_KEY, JSON.stringify({ lamp, scene: mode }));
    } catch {
      /* the desk still works for this visit */
    }
  }, [lamp, mode]);

  useEffect(() => () => {
    delete document.documentElement.dataset.lamp;
  }, []);

  return (
    <section className={`room${lamp ? " is-lit" : ""}`} aria-label={t(lang, "Góc bàn", "Desk corner")}>
      <Lamp on={lamp} onToggle={() => setLamp((value) => !value)} />
      <Window mode={mode} onMode={setMode} />
      <Clocks />
    </section>
  );
}

function Lamp({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  const lang = useLang();
  return (
    <button type="button" className={`lamp${on ? " on" : ""}`} aria-pressed={on} onClick={onToggle}>
      <span className="shade" />
      <span className="neck" />
      <span className="lamp-base" />
      <span className="lamp-name">{t(lang, "Đèn", "Lamp")}</span>
      <small>{on ? t(lang, "Đang sáng", "Lit") : t(lang, "Đang tắt", "Off")}</small>
    </button>
  );
}

function Window({ mode, onMode }: { mode: SceneMode; onMode: (mode: SceneMode) => void }) {
  const lang = useLang();
  const [hour, setHour] = useState(() => new Date().getHours());
  const scene: SceneId = mode === "auto" ? sceneFromHour(hour) : mode;
  const Art = art[scene];
  const name = SCENES.find((item) => item.id === scene);

  useEffect(() => {
    const tick = () => setHour(new Date().getHours());
    const id = window.setInterval(tick, 60_000);
    const onVis = () => {
      if (!document.hidden) tick();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="window">
      <div className="frame">
        <div
          className="pane"
          data-scene={scene}
          role="img"
          aria-label={t(
            lang,
            `Cửa sổ, cảnh ${name?.vi ?? ""}.`,
            `Window, ${name?.en ?? ""} outside.`,
          )}
        >
          <ArtBoundary key={scene}>
            <Suspense fallback={null}>
              <Art />
            </Suspense>
          </ArtBoundary>
          <span className="day-glow" aria-hidden="true" />
          <span className="clouds" aria-hidden="true">
            <i /><i /><i />
          </span>
          <span className="mullion" aria-hidden="true" />
        </div>
      </div>
      <div className="chips scene-switch" role="group" aria-label={t(lang, "Cảnh ngoài cửa sổ", "View outside")}>
        <button type="button" aria-pressed={mode === "auto"} title={t(lang, "Theo giờ trên máy này", "Follow this device's clock")} onClick={() => onMode("auto")}>
          {t(lang, "Theo giờ", "Local time")}
        </button>
        {SCENES.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={mode === item.id}
            className={mode === "auto" && scene === item.id ? "is-now" : undefined}
            onClick={() => onMode(item.id)}
          >
            {lang === "en" ? item.en : item.vi}
          </button>
        ))}
      </div>
    </div>
  );
}

function Clocks() {
  const lang = useLang();
  const [calm, setCalm] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setCalm(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const tick = () => {
      if (!document.hidden) setNow(new Date());
    };
    const id = window.setInterval(tick, calm ? 60_000 : 1000);
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [calm]);

  const hanoi = clockParts(now, ZONES[0].id);
  const hourAngle = ((hanoi.hour % 12) + hanoi.minute / 60) * 30;
  const minuteAngle = (hanoi.minute + (calm ? 0 : hanoi.second / 60)) * 6;

  return (
    <div className="clocks">
      <svg className="face" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="28" fill="var(--sheet)" stroke="var(--accent)" strokeWidth="2" />
        <line x1="32" y1="32" x2="32" y2="16" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" transform={`rotate(${hourAngle} 32 32)`} />
        <line x1="32" y1="32" x2="32" y2="11" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" transform={`rotate(${minuteAngle} 32 32)`} />
        {calm ? null : (
          <line x1="32" y1="34" x2="32" y2="10" stroke="var(--plot-alt)" strokeWidth="1" strokeLinecap="round" transform={`rotate(${hanoi.second * 6} 32 32)`} />
        )}
        <circle cx="32" cy="32" r="1.8" fill="var(--ink)" />
      </svg>
      <ul>
        {ZONES.map((zone) => {
          const parts = zone.id === ZONES[0].id ? hanoi : clockParts(now, zone.id);
          return (
            <li key={zone.id} className={zone.id === ZONES[0].id ? "is-home" : undefined}>
              <span>{lang === "en" ? zone.en : zone.vi}</span>
              <b>{parts.hm}</b>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const formats = new Map<string, Intl.DateTimeFormat>();

function clockParts(date: Date, zone: string): { hour: number; minute: number; second: number; hm: string } {
  let format = formats.get(zone);
  if (!format) {
    format = new Intl.DateTimeFormat("en-GB", {
      timeZone: zone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });
    formats.set(zone, format);
  }
  const bag = format.formatToParts(date);
  const pick = (type: string) => Number(bag.find((part) => part.type === type)?.value ?? 0) % 60;
  const hour = Number(bag.find((part) => part.type === "hour")?.value ?? 0) % 24;
  const minute = pick("minute");
  const second = pick("second");
  return { hour, minute, second, hm: `${pad(hour)}:${pad(minute)}` };
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

class ArtBoundary extends Component<{ children: ReactNode }, { bad: boolean }> {
  state = { bad: false };
  static getDerivedStateFromError(): { bad: boolean } {
    return { bad: true };
  }
  render(): ReactNode {
    return this.state.bad ? null : this.props.children;
  }
}

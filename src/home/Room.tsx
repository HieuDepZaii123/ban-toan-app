import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";
import { isSceneMode, sceneFromHour, SCENES, ZONES, type SceneId, type SceneMode } from "./day.ts";

const ROOM_KEY = "ban-toan-room";

const art = {
  morning: lazy(() => import("./art/morning.tsx").then((mod) => ({ default: mod.Morning }))),
  noon: lazy(() => import("./art/noon.tsx").then((mod) => ({ default: mod.Noon }))),
  afternoon: lazy(() => import("./art/afternoon.tsx").then((mod) => ({ default: mod.Afternoon }))),
  evening: lazy(() => import("./art/evening.tsx").then((mod) => ({ default: mod.Evening }))),
  sunset: lazy(() => import("./art/more.tsx").then((mod) => ({ default: mod.Sunset }))),
  rain: lazy(() => import("./art/more.tsx").then((mod) => ({ default: mod.Rainy }))),
  snow: lazy(() => import("./art/more.tsx").then((mod) => ({ default: mod.Snowy }))),
  stars: lazy(() => import("./art/more.tsx").then((mod) => ({ default: mod.Starry }))),
};

function readRoom(): { lamp: boolean; mode: SceneMode; img: string } {
  try {
    const raw = JSON.parse(localStorage.getItem(ROOM_KEY) || "null") as { lamp?: unknown; scene?: unknown; img?: unknown };
    const img = typeof raw?.img === "string" && raw.img.startsWith("data:image/") ? raw.img : "";
    return { lamp: raw?.lamp !== false, mode: isSceneMode(raw?.scene) ? raw.scene : "auto", img };
  } catch {
    return { lamp: true, mode: "auto", img: "" };
  }
}

export function Room() {
  const lang = useLang();
  const [lamp, setLamp] = useState(() => readRoom().lamp);
  const [mode, setMode] = useState<SceneMode>(() => readRoom().mode);
  const [img, setImg] = useState(() => readRoom().img);

  useEffect(() => {
    document.documentElement.dataset.lamp = lamp ? "on" : "off";
    try {
      localStorage.setItem(ROOM_KEY, JSON.stringify({ lamp, scene: mode, img }));
    } catch {
      /* a large photo may not fit; the desk still works */
    }
  }, [lamp, mode, img]);

  useEffect(() => () => {
    delete document.documentElement.dataset.lamp;
  }, []);

  return (
    <section className={`room${lamp ? " is-lit" : ""}`} aria-label={t(lang, "Góc bàn", "Desk corner")}>
      <Lamp on={lamp} onToggle={() => setLamp((value) => !value)} />
      <Window mode={mode} onMode={setMode} img={img} onImg={setImg} />
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

function shrinkImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, 720 / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      let data = canvas.toDataURL("image/jpeg", 0.72);
      if (data.length > 350_000) data = canvas.toDataURL("image/jpeg", 0.5);
      resolve(data);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image"));
    };
    image.src = url;
  });
}

function Window({ mode, onMode, img, onImg }: { mode: SceneMode; onMode: (mode: SceneMode) => void; img: string; onImg: (value: string) => void }) {
  const lang = useLang();
  const frame = useRef<HTMLDivElement>(null);
  const [hour, setHour] = useState(() => new Date().getHours());
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(() => {
    try { return localStorage.getItem("bt-win-open") === "1"; } catch { return false; }
  });
  const photo = mode === "custom" && img.startsWith("data:image/");
  const scene: SceneId = mode === "auto" || mode === "custom" ? sceneFromHour(hour) : mode;
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

  useEffect(() => {
    const node = frame.current;
    const host = node?.parentElement;
    if (!node || !host) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const max = calm ? 0 : 8;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      node.style.setProperty("--rx", `${cx.toFixed(2)}deg`);
      node.style.setProperty("--ry", `${cy.toFixed(2)}deg`);
      raf = Math.abs(tx - cx) > 0.04 || Math.abs(ty - cy) > 0.04 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
    const move = (event: PointerEvent) => {
      if (!max) return;
      const box = node.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, (event.clientX - (box.left + box.width / 2)) / (box.width * 0.9)));
      const ny = Math.max(-1, Math.min(1, (event.clientY - (box.top + box.height / 2)) / (box.height * 1.4)));
      ty = nx * max;
      tx = -ny * max * 0.65;
      kick();
    };
    const reset = () => { tx = 0; ty = 0; kick(); };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", reset);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(raf);
    };
  }, []);

  const toggle = () => {
    setOpen((value) => {
      const next = !value;
      try { localStorage.setItem("bt-win-open", next ? "1" : "0"); } catch { /* ignore */ }
      return next;
    });
  };

  return (
    <div className="window">
      <div className={`win3d${open ? " is-open" : ""}`}>
        <div className="wframe" ref={frame}>
          <div
            className="pane"
            data-scene={scene}
            role="img"
            aria-label={t(lang, `Cửa sổ, cảnh ${name?.vi ?? ""}.`, `Window, ${name?.en ?? ""} outside.`)}
          >
            {photo ? <img className="window-photo" src={img} alt="" /> : (
              <ArtBoundary key={scene}>
                <Suspense fallback={null}>
                  <Art />
                </Suspense>
              </ArtBoundary>
            )}
            <span className="day-glow" aria-hidden="true" />
            <span className="clouds" aria-hidden="true"><i /><i /><i /></span>
            <span className="mullion" aria-hidden="true" />
          </div>
          <button type="button" className="wsash" aria-pressed={open} aria-label={open ? t(lang, "Đóng cửa sổ", "Close the window") : t(lang, "Mở cửa sổ", "Open the window")} onClick={toggle} />
        </div>
        <div className="wbar">
          <button type="button" className="text-btn" aria-pressed={open} onClick={toggle}>
            {open ? t(lang, "Đóng cửa sổ", "Close the window") : t(lang, "Mở cửa sổ", "Open the window")}
          </button>
          <small>{t(lang, "Rê chuột để nghiêng", "Move the pointer to tilt")}</small>
        </div>
      </div>
      <div className="chips scene-switch" role="group" aria-label={t(lang, "Cảnh ngoài cửa sổ", "View outside")}>
        <button type="button" aria-pressed={mode === "auto"} title={t(lang, "Theo giờ trên máy này", "Follow this device's clock")} onClick={() => onMode("auto")}>
          {t(lang, "Theo giờ", "Local time")}
        </button>
        <button type="button" aria-pressed={mode === "custom"} onClick={() => onMode("custom")}>
          {t(lang, "Ảnh của bạn", "Your photo")}
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
      <details className="wcustom">
        <summary>{t(lang, "Ảnh nền cửa sổ", "Window photo")}</summary>
        <label className="lecture-note">
          {t(lang, "Chọn ảnh trên máy này", "Choose a photo on this device")}
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = "";
              if (!file) return;
              if (!file.type.startsWith("image/")) {
                setNote(t(lang, "Tệp này không phải ảnh.", "That file is not an image."));
                return;
              }
              void shrinkImage(file).then((data) => {
                if (data.length > 400_000) {
                  setNote(t(lang, "Ảnh hơi lớn, chọn ảnh nhỏ hơn.", "That photo is too large."));
                  return;
                }
                onImg(data);
                onMode("custom");
                setNote(t(lang, "Đã đặt ảnh nền.", "Photo set."));
              }).catch(() => setNote(t(lang, "Không đọc được ảnh.", "The photo could not be read.")));
            }}
          />
        </label>
        <button type="button" className="text-btn" disabled={!img} onClick={() => { onImg(""); onMode("auto"); setNote(t(lang, "Đã xóa ảnh nền.", "Photo removed.")); }}>
          {t(lang, "Xóa ảnh", "Remove photo")}
        </button>
        <p className="lecture-note" role="status">{note}</p>
      </details>
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

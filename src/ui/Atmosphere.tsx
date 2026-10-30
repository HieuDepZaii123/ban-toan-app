import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; r: number; p: number; s: number; v: number; o: number };

function reduced(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function nightNow(): boolean {
  return document.documentElement.dataset.theme === "night";
}

export function Atmosphere() {
  const sky = useRef<HTMLCanvasElement>(null);
  const rain = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const skyCanvas = sky.current;
    const rainCanvas = rain.current;
    if (!skyCanvas || !rainCanvas) return;
    const sx = skyCanvas.getContext("2d");
    const rx = rainCanvas.getContext("2d");
    if (!sx || !rx) return;
    let stars: Dot[] = [];
    let drops: Dot[] = [];
    let dust: Dot[] = [];
    let raf = 0;
    let last = 0;
    let meteor = { x: 0, y: 0, life: 0 };

    const size = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      skyCanvas.width = w;
      skyCanvas.height = h;
      rainCanvas.width = w;
      rainCanvas.height = h;
      const count = Math.min(180, Math.round((w * h) / 14000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h * 0.82, r: Math.random() * 1.2 + 0.3,
        p: Math.random() * 6.28, s: 0.4 + Math.random() * 1.1, v: 0, o: 0.7,
      }));
      drops = Array.from({ length: Math.min(140, count) }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: 0, p: 0, s: 0,
        v: 5 + Math.random() * 6, o: 0.15 + Math.random() * 0.28,
      }));
      dust = Array.from({ length: 36 }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: 0.6 + Math.random() * 1.4,
        p: Math.random() * 6, s: 0.15 + Math.random() * 0.35, v: 0.15 + Math.random() * 0.35, o: 0.25,
      }));
    };

    const draw = (time: number) => {
      const night = nightNow();
      const calm = reduced();
      sx.clearRect(0, 0, skyCanvas.width, skyCanvas.height);
      rx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
      if (night) {
        for (const star of stars) {
          const alpha = calm ? 0.75 : 0.4 + 0.5 * Math.sin(star.p + time / 1000 * star.s);
          sx.globalAlpha = alpha;
          sx.fillStyle = "#ffe7b8";
          sx.beginPath();
          sx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          sx.fill();
        }
        sx.globalAlpha = 1;
        if (!calm && meteor.life > 0) {
          sx.strokeStyle = "rgba(255,236,196,0.8)";
          sx.lineWidth = 1.4;
          sx.beginPath();
          sx.moveTo(meteor.x, meteor.y);
          sx.lineTo(meteor.x - 42, meteor.y + 14);
          sx.stroke();
          meteor.x += 7;
          meteor.y += 2.4;
          meteor.life -= 1;
        } else if (!calm && Math.random() < 0.004) {
          meteor = { x: Math.random() * skyCanvas.width * 0.7, y: Math.random() * 80, life: 28 };
        }
        rx.lineWidth = 1.1;
        rx.lineCap = "round";
        for (const drop of drops) {
          if (!calm) {
            drop.y += drop.v;
            drop.x -= drop.v * 0.15;
            if (drop.y > rainCanvas.height) {
              drop.y = -12;
              drop.x = Math.random() * rainCanvas.width;
            }
          }
          rx.strokeStyle = `rgba(230,215,190,${drop.o})`;
          rx.beginPath();
          rx.moveTo(drop.x, drop.y);
          rx.lineTo(drop.x - 4, drop.y + 12);
          rx.stroke();
        }
      } else if (!calm) {
        for (const mote of dust) {
          mote.y -= mote.v;
          mote.x += Math.sin(time / 1000 + mote.p) * 0.15;
          if (mote.y < -4) mote.y = skyCanvas.height + 4;
          sx.globalAlpha = 0.28;
          sx.fillStyle = "#c4a36a";
          sx.beginPath();
          sx.arc(mote.x, mote.y, mote.r, 0, Math.PI * 2);
          sx.fill();
        }
        sx.globalAlpha = 1;
      }
    };

    const loop = (time: number) => {
      if (time - last > 40) {
        draw(time);
        last = time;
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      size();
      if (reduced()) draw(0);
      else raf = requestAnimationFrame(loop);
    };

    start();
    window.addEventListener("resize", start);
    window.addEventListener("ban-toan-theme", start);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", start);
      window.removeEventListener("ban-toan-theme", start);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const shift = Math.min(window.scrollY, 280) * 0.08;
      document.documentElement.style.setProperty("--shift", `${shift.toFixed(1)}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let audio: AudioContext | null = null;
    let gain: GainNode | null = null;
    const want = () => {
      let on = false;
      try { on = localStorage.getItem("bt-rain") === "on"; } catch { /* ignore */ }
      return on && nightNow();
    };
    const volume = () => {
      const raw = Number(localStorage.getItem("bt-rain-vol") || "40");
      return (Number.isFinite(raw) ? raw : 40) / 100 * 0.55;
    };
    const ensure = () => {
      if (!audio) {
        const Ctx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctx) return;
        audio = new Ctx();
        const length = audio.sampleRate * 2;
        const buffer = audio.createBuffer(1, length, audio.sampleRate);
        const data = buffer.getChannelData(0);
        let last = 0;
        for (let i = 0; i < length; i += 1) {
          const white = Math.random() * 2 - 1;
          last = (last + 0.02 * white) / 1.02;
          data[i] = last * 3.2 + white * 0.08;
        }
        const source = audio.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        const filter = audio.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 1600;
        gain = audio.createGain();
        gain.gain.value = 0;
        source.connect(filter).connect(gain).connect(audio.destination);
        source.start();
      }
    };
    const sync = () => {
      if (!want()) {
        if (audio && gain) gain.gain.setTargetAtTime(0, audio.currentTime, 0.2);
        return;
      }
      ensure();
      if (!audio || !gain) return;
      if (audio.state !== "running") void audio.resume().catch(() => undefined);
      gain.gain.setTargetAtTime(volume(), audio.currentTime, 0.25);
    };
    const unlock = () => sync();
    window.addEventListener("ban-toan-theme", sync);
    window.addEventListener("bt-rain", sync);
    window.addEventListener("pointerdown", unlock);
    sync();
    return () => {
      window.removeEventListener("ban-toan-theme", sync);
      window.removeEventListener("bt-rain", sync);
      window.removeEventListener("pointerdown", unlock);
      void audio?.close();
    };
  }, []);

  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="day-orb" />
      <div className="night-fog" />
      <canvas ref={sky} className="sky-layer" />
      <canvas ref={rain} className="rain-layer" />
    </div>
  );
}

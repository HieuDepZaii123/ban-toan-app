import { useState } from "react";
import { useTicker } from "./kit.ts";
import { Buttons } from "./widgets.tsx";

/** Chuyển động tự chạy: pha đi từ 0 tới 1 rồi lặp lại. Tắt sẵn khi người dùng chọn giảm chuyển động (và trong jsdom). */
export function useLoop(ms = 50, speed = 0.012) {
  const calm = typeof window !== "undefined" && (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true || /jsdom/i.test(navigator.userAgent));
  const [phase, setPhase] = useState(0.1);
  const [running, setRunning] = useState(!calm);
  useTicker(running, ms, () => setPhase((p) => (p + speed) % 1));
  return { phase, setPhase, running, setRunning };
}

export function PlayButtons({ running, setRunning, tt }: { running: boolean; setRunning: (v: boolean) => void; tt: (vi: string, en: string) => string }) {
  return (
    <Buttons>
      <button type="button" className="text-btn" onClick={() => setRunning(!running)}>{running ? tt("Dừng", "Pause") : tt("Chạy", "Play")}</button>
    </Buttons>
  );
}

/** Dao động mượt giữa 0 và 1 theo pha. */
export const wave = (phase: number) => 0.5 - 0.5 * Math.cos(2 * Math.PI * phase);

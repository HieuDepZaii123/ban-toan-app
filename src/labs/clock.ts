import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const SPEED_KEY = "ban-toan:lab-speed";
let labSpeed = 1;
try {
  const saved = Number(window.localStorage.getItem(SPEED_KEY));
  if (saved === 0.5 || saved === 1 || saved === 2) labSpeed = saved;
} catch {
  /* private window: speed stays 1 */
}

export function getLabSpeed(): number {
  return labSpeed;
}

/** Play speed shared by every lab: 0.5, 1 or 2 times. */
export function setLabSpeed(next: number): void {
  labSpeed = next;
  try {
    window.localStorage.setItem(SPEED_KEY, String(next));
  } catch {
    /* ignore */
  }
}

export function useClock(
  running: boolean,
  ms: number,
  loop: boolean,
  onFrame: (u: number) => void,
  onDone?: () => void,
): void {
  const frameRef = useRef(onFrame);
  const doneRef = useRef(onDone);
  useLayoutEffect(() => {
    frameRef.current = onFrame;
    doneRef.current = onDone;
  });

  useEffect(() => {
    if (!running) return;
    if (reducedMotion()) {
      if (!loop) {
        frameRef.current(1);
        doneRef.current?.();
      }
      return;
    }
    let raf = 0;
    let last = 0;
    let elapsed = 0;
    const tick = (now: number) => {
      if (document.hidden) {
        last = 0;
        raf = 0;
        return;
      }
      if (last) elapsed += (now - last) * labSpeed;
      last = now;
      const raw = elapsed / ms;
      if (!loop && raw >= 1) {
        frameRef.current(1);
        doneRef.current?.();
        return;
      }
      frameRef.current(loop ? raw % 1 : Math.min(1, raw));
      raf = requestAnimationFrame(tick);
    };
    const onVis = () => {
      if (document.hidden) {
        last = 0;
        cancelAnimationFrame(raf);
        raf = 0;
        return;
      }
      last = 0;
      if (raf === 0) raf = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [running, ms, loop]);
}

export function useCalm(): boolean {
  const [calm, setCalm] = useState(reducedMotion);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setCalm(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return calm;
}

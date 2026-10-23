import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function reducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    let start = 0;
    let hiddenAt = 0;
    const tick = (now: number) => {
      if (document.hidden) {
        hiddenAt = now;
        raf = 0;
        return;
      }
      if (!start) start = now;
      const raw = (now - start) / ms;
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
        hiddenAt = performance.now();
        cancelAnimationFrame(raf);
        raf = 0;
        return;
      }
      if (hiddenAt) {
        if (start) start += performance.now() - hiddenAt;
        hiddenAt = 0;
      }
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

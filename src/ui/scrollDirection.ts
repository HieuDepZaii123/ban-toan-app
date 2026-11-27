import { useEffect } from "react";

/** Pixels of movement before the direction flips, so small jitters don't toggle it. */
const SLACK = 8;
/** Near the top of the page the floating buttons always show. */
const TOP = 120;

/**
 * Marks `<html data-scroll="down">` while the reader scrolls down, and "up" when they scroll up or are
 * near the top. CSS uses it to slide the floating buttons (Hỏi toán, nhạc) out of the way while reading,
 * so they never sit on top of lesson text or the "Câu sau" button.
 */
export function useScrollDirection(): void {
  useEffect(() => {
    const root = document.documentElement;
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (y < TOP) root.dataset.scroll = "up";
      else if (y > last + SLACK) root.dataset.scroll = "down";
      else if (y < last - SLACK) root.dataset.scroll = "up";
      else return;
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    root.dataset.scroll = "up";
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      delete root.dataset.scroll;
    };
  }, []);
}

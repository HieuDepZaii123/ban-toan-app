import { useEffect, useLayoutEffect, useRef } from "react";

type Draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => void;

export function Graph({ draw, label }: { draw: Draw; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;

  const paint = () => {
    const canvas = ref.current;
    if (!canvas) return;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width < 2 || height < 2) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const bitmapW = Math.round(width * dpr);
    const bitmapH = Math.round(height * dpr);
    if (canvas.width !== bitmapW || canvas.height !== bitmapH) {
      canvas.width = bitmapW;
      canvas.height = bitmapH;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawRef.current(ctx, width, height);
  };

  useLayoutEffect(() => {
    paint();
  });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => paint());
    observer.observe(canvas);
    const onTheme = () => paint();
    window.addEventListener("ban-toan-theme", onTheme);
    document.fonts?.ready.then(() => paint()).catch(() => undefined);
    return () => {
      observer.disconnect();
      window.removeEventListener("ban-toan-theme", onTheme);
    };
  }, []);

  return <canvas ref={ref} className="graph" role="img" aria-label={label} />;
}

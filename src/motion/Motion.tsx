import { useEffect, useRef } from "react";
import { Spark } from "../home/Spark.tsx";
import { loadClip } from "./load.ts";
import { play } from "./ticker.ts";
import type { Clip } from "./types.ts";
import type { Ink } from "./pen.ts";

function readInk(): Ink {
  const style = getComputedStyle(document.documentElement);
  const pick = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback;
  return {
    bg: pick("--plot-bg", "#fbf8f2"),
    grid: pick("--plot-grid", "rgba(28,25,21,.08)"),
    axis: pick("--plot-axis", "#1c1915"),
    curve: pick("--plot-curve", "#0e6b5e"),
    alt: pick("--plot-alt", "#c4552a"),
    ink: pick("--ink", "#1c1915"),
    soft: pick("--ink-soft", "#4e493f"),
  };
}

export function Motion({ id, variant, label }: { id: string; variant: "card" | "stage"; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = ref.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    let dead = false;
    let clip: Clip | null = null;
    let ink = readInk();
    let visible = false;
    let hovered = false;
    let calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let release = () => {};
    let loading = false;
    let lastU = 0;
    let context: CanvasRenderingContext2D | null = null;

    const live = () => !calm && visible && (variant === "stage" || !canHover || hovered);

    const paint = (u: number) => {
      if (!clip) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width < 2 || height < 2) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const bitmapW = Math.round(width * dpr);
      const bitmapH = Math.round(height * dpr);
      if (canvas.width !== bitmapW || canvas.height !== bitmapH) {
        canvas.width = bitmapW;
        canvas.height = bitmapH;
        context = null;
      }
      if (!context) context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastU = u;
      clip.draw(context, width, height, u, ink);
      if (host.dataset.ready !== "1") {
        host.dataset.ready = "1";
        host.classList.add("is-ready");
      }
    };

    const sync = () => {
      release();
      release = () => {};
      const moving = live();
      host.dataset.play = moving ? "1" : "0";
      if (!clip) return;
      if (moving) release = play((u) => paint(u));
      else if (visible || hovered) paint(clip.still);
    };

    const ensure = () => {
      if (clip || loading) return;
      loading = true;
      loadClip(id).then(
        (mod) => {
          loading = false;
          if (dead) return;
          clip = mod;
          sync();
        },
        () => {
          loading = false;
        },
      );
    };

    const onEnter = () => {
      hovered = true;
      ensure();
      sync();
    };
    const onLeave = () => {
      hovered = false;
      sync();
    };
    const hoverTarget = variant === "card" ? (host.closest(".topic") ?? host) : host;
    hoverTarget.addEventListener("pointerenter", onEnter);
    hoverTarget.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        if (visible) ensure();
        sync();
      },
      { threshold: 0.25 },
    );
    io.observe(host);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => {
      calm = motionQuery.matches;
      host.dataset.calm = calm ? "1" : "0";
      sync();
    };
    onMotion();
    motionQuery.addEventListener("change", onMotion);

    const onTheme = () => {
      ink = readInk();
      context = null;
      if (clip) paint(live() ? lastU : clip.still);
    };
    window.addEventListener("ban-toan-theme", onTheme);

    const resize = new ResizeObserver(() => {
      if (clip) paint(live() ? lastU : clip.still);
    });
    resize.observe(host);

    return () => {
      dead = true;
      release();
      io.disconnect();
      resize.disconnect();
      motionQuery.removeEventListener("change", onMotion);
      window.removeEventListener("ban-toan-theme", onTheme);
      hoverTarget.removeEventListener("pointerenter", onEnter);
      hoverTarget.removeEventListener("pointerleave", onLeave);
    };
  }, [id, variant]);

  return (
    <div ref={ref} className={`motion motion-${variant}`} data-motion={id} data-ready="0">
      <canvas
        ref={canvasRef}
        className="motion-canvas"
        role={variant === "stage" ? "img" : undefined}
        aria-label={variant === "stage" ? label : undefined}
        aria-hidden={variant === "card" ? true : undefined}
      />
      {variant === "card" ? <Spark id={id} /> : null}
    </div>
  );
}

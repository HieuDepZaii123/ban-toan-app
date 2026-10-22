import { useRef, useState, type PointerEvent } from "react";
import { limitInit, limitRange } from "../content/params.ts";
import { fmt, snap } from "../lib/format.ts";
import { coolingTemp, holeY, jumpStudy } from "../lib/math.ts";
import { writeParams } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { Live } from "../ui/Live.tsx";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/Prefs.tsx";
import { Slider } from "../ui/Slider.tsx";
import { useCalm, useClock } from "./clock.ts";
import { dashed, dot, drawAxes, drawGrid, halo, makeMap, paintBase, readColors, strokeFn, type PlotColors } from "./draw.ts";
import { Graph } from "./Graph.tsx";
import { useLessonState } from "./lessonState.ts";
import { SceneBar } from "./SceneBar.tsx";

type Hit = { hx: number; hy: number; to: (px: number, py: number) => number };

export function LimitLab() {
  const lang = useLang();
  const calm = useCalm();
  const { values, ref, patch, play, halt, isPlaying } = useLessonState("limit", limitInit, limitRange);
  const [on, setOn] = useState(false);
  const hit = useRef<Hit | null>(null);
  const dragging = useRef(false);
  const scene = values.scene ?? 0;
  const h = values.h ?? 1;
  const assigned = values.assigned ?? 5;
  const left = values.left ?? -1;
  const right = values.right ?? 1;
  const at = values.at ?? 0;
  const probe = values.probe ?? -1.5;
  const time = values.time ?? 0;
  const study = jumpStudy(left, right, at);

  const stop = () => {
    halt();
    setOn(false);
    writeParams("limit", ref.current);
  };

  useClock(on && scene === 0 && !calm, 2800, false, (u) => patch({ h: snap(1.5 * (1 - u), 0.05, -2, 2) }, true), stop);
  useClock(on && scene === 1 && !calm, 3200, false, (u) => patch({ probe: snap(-2.2 + 4.4 * u, 0.05, -2.5, 2.5) }, true), stop);
  useClock(on && scene === 2 && !calm, 3600, false, (u) => patch({ time: snap(16 * u, 0.1, 0, 20) }, true), stop);

  const toggle = () => {
    if (calm) return;
    if (isPlaying()) {
      stop();
      return;
    }
    play();
    setOn(true);
    if (scene === 0) patch({ h: 1.5 }, true);
    if (scene === 1) patch({ probe: -2.2 }, true);
    if (scene === 2) patch({ time: 0 }, true);
  };

  const choose = (next: number) => {
    stop();
    patch({ scene: next });
  };

  const live = scene === 0
    ? t(
        lang,
        Math.abs(h) < 0.001
          ? `Đúng x = 1, biểu thức không viết được. Giới hạn vẫn là 2. Giá trị gán là ${fmt(assigned)}.`
          : `x = ${fmt(1 + h)}, y = ${fmt(holeY(1 + h))}. Lỗ tại (1; 2). Giá trị gán f(1) = ${fmt(assigned)}.`,
        Math.abs(h) < 0.001
          ? `At x = 1 the expression is undefined. The limit is still 2. The assigned value is ${fmt(assigned)}.`
          : `x = ${fmt(1 + h)}, y = ${fmt(holeY(1 + h))}. The hole is at (1, 2). Assigned f(1) = ${fmt(assigned)}.`,
      )
    : scene === 1
      ? t(
          lang,
          study.exists
            ? `Hai phía cùng là ${fmt(left)}. ${study.continuous ? "Liên tục tại 0." : `f(0) = ${fmt(at)}, chưa bằng giới hạn.`}`
            : `Trái ${fmt(left)}, phải ${fmt(right)}. Không có giới hạn. f(0) = ${fmt(at)} không vá được.`,
          study.exists
            ? `Both sides are ${fmt(left)}. ${study.continuous ? "Continuous at 0." : `f(0) = ${fmt(at)}, not equal to the limit.`}`
            : `Left ${fmt(left)}, right ${fmt(right)}. No limit. f(0) = ${fmt(at)} cannot repair it.`,
        )
      : t(
          lang,
          `t = ${fmt(time)} phút, T = ${fmt(coolingTemp(time))}°C. Tiến về 25°C, không phải ${fmt(coolingTemp(0))}°C lúc rót.`,
          `t = ${fmt(time)} min, T = ${fmt(coolingTemp(time))}°C. Approaches 25°C, not the ${fmt(coolingTemp(0))}°C at pouring.`,
        );

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const colors = readColors();
    if (scene === 0) hit.current = drawHole(ctx, width, height, h, assigned, colors);
    else if (scene === 1) hit.current = drawJump(ctx, width, height, left, right, at, probe, colors);
    else hit.current = drawCooling(ctx, width, height, time, colors);
  };

  const point = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const onDown = (event: PointerEvent<HTMLDivElement>) => {
    const g = hit.current;
    if (!g) return;
    const p = point(event);
    if ((p.x - g.hx) ** 2 + (p.y - g.hy) ** 2 > 48 ** 2) return;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    stop();
    apply(p.x, p.y);
  };

  const apply = (px: number, py: number) => {
    const g = hit.current;
    if (!g) return;
    const next = g.to(px, py);
    if (scene === 0) patch({ h: next });
    else if (scene === 1) patch({ probe: next });
    else patch({ time: next });
  };

  return (
    <div className="stage" data-scene={scene}>
      <SceneBar
        lang={lang}
        scene={scene}
        calm={calm}
        playing={on}
        onScene={choose}
        onPlay={toggle}
        scenes={[
          { id: 0, vi: "Lỗ", en: "Hole" },
          { id: 1, vi: "Nhảy", en: "Jump" },
          { id: 2, vi: "Nguội", en: "Cooling" },
        ]}
      />
      <div
        className="graph-wrap"
        onPointerDown={onDown}
        onPointerMove={(event) => {
          if (!dragging.current) return;
          const p = point(event);
          apply(p.x, p.y);
        }}
        onPointerUp={() => {
          dragging.current = false;
        }}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <Graph draw={draw} label={live} />
      </div>
      <Live text={live} />
      {scene === 0 ? (
        <dl className="readout">
          <div className="wide"><dt>{t(lang, "Đang đứng", "Standing at")}</dt><dd>x = {fmt(1 + h)}</dd></div>
          <div><dt>y</dt><dd>{Math.abs(h) < 0.001 ? "—" : fmt(holeY(1 + h))}</dd></div>
          <div><dt>{t(lang, "Giới hạn", "Limit")}</dt><dd>2</dd></div>
          <div><dt>f(1)</dt><dd>{fmt(assigned)}</dd></div>
          <div><dt>{t(lang, "Liên tục", "Continuous")}</dt><dd>{Math.abs(assigned - 2) < 0.001 ? t(lang, "Có", "Yes") : t(lang, "Không", "No")}</dd></div>
        </dl>
      ) : null}
      {scene === 1 ? (
        <dl className="readout">
          <div><dt>{t(lang, "Trái", "Left")}</dt><dd>{fmt(left)}</dd></div>
          <div><dt>{t(lang, "Phải", "Right")}</dt><dd>{fmt(right)}</dd></div>
          <div><dt>f(0)</dt><dd>{fmt(at)}</dd></div>
          <div><dt>{t(lang, "Giới hạn", "Limit")}</dt><dd>{study.exists ? fmt(study.limit ?? 0) : t(lang, "Không có", "None")}</dd></div>
        </dl>
      ) : null}
      {scene === 2 ? (
        <dl className="readout">
          <div><dt>t</dt><dd>{fmt(time)} {t(lang, "phút", "min")}</dd></div>
          <div><dt>T</dt><dd>{fmt(coolingTemp(time))}°C</dd></div>
          <div><dt>T(0)</dt><dd>85°C</dd></div>
          <div><dt>{t(lang, "Tiến về", "Approaches")}</dt><dd>25°C</dd></div>
        </dl>
      ) : null}
      {scene === 0 ? (
        <>
          <Slider label="h" min={-2} max={2} step={0.05} value={h} onChange={(next) => { stop(); patch({ h: next }); }} />
          <Slider label="f(1)" min={-1} max={5} step={0.5} value={assigned} onChange={(next) => { stop(); patch({ assigned: next }); }} />
        </>
      ) : null}
      {scene === 1 ? (
        <>
          <Slider label={t(lang, "Trái", "Left")} min={-2} max={3} step={0.5} value={left} onChange={(next) => { stop(); patch({ left: next }); }} />
          <Slider label={t(lang, "Phải", "Right")} min={-2} max={3} step={0.5} value={right} onChange={(next) => { stop(); patch({ right: next }); }} />
          <Slider label="f(0)" min={-2} max={3} step={0.5} value={at} onChange={(next) => { stop(); patch({ at: next }); }} />
        </>
      ) : null}
      {scene === 2 ? (
        <Slider label="t" min={0} max={20} step={0.1} suffix={t(lang, " phút", " min")} value={time} onChange={(next) => { stop(); patch({ time: next }); }} />
      ) : null}
      <p className="note">
        <MathText
          text={
            scene === 0
              ? t(lang, "$\\frac{x^2-1}{x-1}=x+1$ khi $x\\neq1$. $\\lim_{x\\to1}=2$. $f(1)$ không kéo $\\lim$.", "$\\frac{x^2-1}{x-1}=x+1$ for $x\\neq1$. $\\lim_{x\\to1}=2$. $f(1)$ does not move $\\lim$.")
              : scene === 1
                ? t(lang, "Trái $\\neq$ phải $\\Rightarrow$ không có $\\lim$. Liên tục còn cần $f(0)=\\lim$.", "Left $\\neq$ right $\\Rightarrow$ no $\\lim$. Continuity still needs $f(0)=\\lim$.")
                : t(lang, "$T(0)=85$. $\\lim=25$.", "$T(0)=85$. $\\lim=25$.")
          }
        />
      </p>
    </div>
  );
}

function drawHole(ctx: CanvasRenderingContext2D, width: number, height: number, h: number, assigned: number, colors: PlotColors): Hit {
  const pad = 32;
  const x0 = -1;
  const x1 = 3;
  const y0 = -1;
  const y1 = 6;
  const map = makeMap(width, height, pad, x0, x1, y0, y1);
  paintBase(ctx, width, height, colors);
  drawGrid(ctx, map, x0, x1, y0, y1, colors);
  drawAxes(ctx, map, x0, x1, y0, y1, colors, "x", "y", width, pad);
  strokeFn(ctx, map, width, height, pad, x0, x1, (x) => (Math.abs(x - 1) < 0.02 ? Number.NaN : holeY(x)), colors.curve);
  const hx = map.x(1);
  const hy = map.y(2);
  openDot(ctx, hx, hy, colors.bg, colors.alt);
  halo(ctx, "(1; 2)", hx, hy - 16, colors.alt, colors.bg);
  if (Math.abs(assigned - 2) > 0.05) {
    dot(ctx, map.x(1), map.y(assigned), colors.ink, colors.bg, 4.5);
    halo(ctx, `f(1) = ${fmt(assigned)}`, map.x(1) + 10, map.y(assigned), colors.ink, colors.bg, "left");
  }
  const x = 1 + h;
  const y = Math.abs(h) < 0.001 ? 2 : holeY(x);
  const px = map.x(Math.min(x1, Math.max(x0, x)));
  const py = map.y(y);
  if (Math.abs(h) >= 0.001) {
    dashed(ctx, px, py, px, map.y(0), colors.soft);
    dot(ctx, px, py, colors.curve, colors.bg, 6);
  }
  return {
    hx: px,
    hy: py,
    to: (clientX) => snap(map.toX(clientX) - 1, 0.05, -2, 2),
  };
}

function drawJump(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  left: number,
  right: number,
  at: number,
  probe: number,
  colors: PlotColors,
): Hit {
  const pad = 32;
  const x0 = -3;
  const x1 = 3;
  const y0 = -2.5;
  const y1 = 3.5;
  const map = makeMap(width, height, pad, x0, x1, y0, y1);
  paintBase(ctx, width, height, colors);
  drawGrid(ctx, map, x0, x1, y0, y1, colors);
  drawAxes(ctx, map, x0, x1, y0, y1, colors, "x", "y", width, pad);
  strokeFn(ctx, map, width, height, pad, x0, -0.04, () => left, colors.curve);
  strokeFn(ctx, map, width, height, pad, 0.04, x1, () => right, colors.alt);
  openDot(ctx, map.x(0), map.y(left), colors.bg, colors.curve);
  openDot(ctx, map.x(0), map.y(right), colors.bg, colors.alt);
  dot(ctx, map.x(0), map.y(at), colors.ink, colors.bg, 4.5);
  const y = probe < 0 ? left : probe > 0 ? right : at;
  const px = map.x(probe);
  const py = map.y(y);
  dot(ctx, px, py, colors.curve, colors.bg, 6);
  halo(ctx, fmt(y), px, py - 14, colors.ink, colors.bg);
  return { hx: px, hy: py, to: (clientX) => snap(map.toX(clientX), 0.05, -2.5, 2.5) };
}

function drawCooling(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, colors: PlotColors): Hit {
  const pad = 36;
  const x0 = 0;
  const x1 = 20;
  const y0 = 0;
  const y1 = 100;
  const map = makeMap(width, height, pad, x0, x1, y0, y1);
  paintBase(ctx, width, height, colors);
  drawGrid(ctx, map, x0, x1, y0, y1, colors);
  drawAxes(ctx, map, x0, x1, y0, y1, colors, "t", "T", width, pad);
  dashed(ctx, map.x(0), map.y(25), map.x(20), map.y(25), colors.alt);
  halo(ctx, "25°C", width - 36, map.y(25) - 12, colors.alt, colors.bg, "right");
  strokeFn(ctx, map, width, height, pad, 0, 20, coolingTemp, colors.curve);
  const px = map.x(time);
  const py = map.y(coolingTemp(time));
  dot(ctx, px, py, colors.curve, colors.bg, 6);
  halo(ctx, `${fmt(coolingTemp(time))}°C`, px, py - 16, colors.ink, colors.bg);
  return { hx: px, hy: py, to: (clientX) => snap(map.toX(clientX), 0.1, 0, 20) };
}

function openDot(ctx: CanvasRenderingContext2D, x: number, y: number, fill: string, ring: string) {
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.strokeStyle = ring;
  ctx.lineWidth = 2;
  ctx.arc(x, y, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

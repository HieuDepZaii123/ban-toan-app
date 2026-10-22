import { useRef, type PointerEvent } from "react";
import { surveyInit, surveyRange } from "../content/params.ts";
import { fmt, snap } from "../lib/format.ts";
import { cubic, cubicSecond, cubicSlope, pureCubic, pureCubicSlope, rationalOblique, rationalY } from "../lib/math.ts";
import { writeParams } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { Live } from "../ui/Live.tsx";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/Prefs.tsx";
import { Slider } from "../ui/Slider.tsx";
import { useCalm, useClock } from "./clock.ts";
import { clipLine, dashed, dot, drawAxes, drawGrid, halo, makeMap, paintBase, readColors, strokeFn, type PlotColors } from "./draw.ts";
import { Graph } from "./Graph.tsx";
import { useLessonState } from "./lessonState.ts";
import { SceneBar } from "./SceneBar.tsx";

type Hit = { hx: number; hy: number; to: (px: number) => number };

export function SurveyLab() {
  const lang = useLang();
  const calm = useCalm();
  const { values, ref, patch, play, halt, playing } = useLessonState("survey", surveyInit, surveyRange);
  const hit = useRef<Hit>({ hx: 0, hy: 0, to: () => 0 });
  const dragging = useRef(false);
  const scene = values.scene ?? 0;
  const x = values.x ?? 0;
  const rx = values.rx ?? 3;
  const px = values.px ?? 0;
  const slope = cubicSlope(x);
  const pureSlope = pureCubicSlope(px);

  const stop = () => {
    halt();
    writeParams("survey", ref.current);
  };

  useClock(playing && scene === 0 && !calm, 3600, false, (u) => patch({ x: snap(-2.2 + 4.4 * u, 0.05, -2.4, 2.4) }, true), stop);
  useClock(playing && scene === 1 && !calm, 3200, false, (u) => patch({ rx: snap(1.8 + 2 * u, 0.05, -1.5, 4) }, true), stop);
  useClock(playing && scene === 2 && !calm, 3200, false, (u) => patch({ px: snap(-1.8 + 3.6 * u, 0.05, -2, 2) }, true), stop);

  const toggle = () => {
    if (calm) return;
    if (playing) {
      stop();
      return;
    }
    play();
    if (scene === 0) patch({ x: -2.2 }, true);
    if (scene === 1) patch({ rx: 1.8 }, true);
    if (scene === 2) patch({ px: -1.8 }, true);
  };

  const choose = (next: number) => {
    stop();
    patch({ scene: next });
  };

  const trend = Math.abs(slope) < 0.02
    ? t(lang, "dừng", "stationary")
    : slope > 0
      ? t(lang, "đang tăng", "increasing")
      : t(lang, "đang giảm", "decreasing");

  const live = scene === 0
    ? t(
        lang,
        `x = ${fmt(x)}, y = ${fmt(cubic(x))}, y′ = ${fmt(slope)}, ${trend}. Cực đại 2 tại x = −1, cực tiểu −2 tại x = 1.`,
        `x = ${fmt(x)}, y = ${fmt(cubic(x))}, y′ = ${fmt(slope)}, ${trend}. Maximum 2 at x = −1, minimum −2 at x = 1.`,
      )
    : scene === 1
      ? t(
          lang,
          `x = ${fmt(rx)}, y = ${fmt(rationalY(rx))}. Tiệm cận đứng x = 1, tiệm cận xiên y = x + 1. Điểm (1; 2) không thuộc đồ thị.`,
          `x = ${fmt(rx)}, y = ${fmt(rationalY(rx))}. Vertical asymptote x = 1, oblique asymptote y = x + 1. The point (1, 2) is not on the graph.`,
        )
      : t(
          lang,
          `x = ${fmt(px)}, y = ${fmt(pureCubic(px))}, y′ = ${fmt(pureSlope)}. ${Math.abs(px) < 0.03 ? "y′ bằng 0 nhưng không đổi dấu, nên không có cực trị." : "y′ không âm, hàm vẫn đồng biến."}`,
          `x = ${fmt(px)}, y = ${fmt(pureCubic(px))}, y′ = ${fmt(pureSlope)}. ${Math.abs(px) < 0.03 ? "y′ is 0 but does not change sign, so there is no extremum." : "y′ is non-negative, so the function is still increasing."}`,
        );

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const colors = readColors();
    if (scene === 0) hit.current = drawCubic(ctx, width, height, x, colors);
    else if (scene === 1) hit.current = drawRational(ctx, width, height, rx, colors);
    else hit.current = drawPure(ctx, width, height, px, colors);
  };

  const point = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const onDown = (event: PointerEvent<HTMLDivElement>) => {
    const g = hit.current;
    const p = point(event);
    if ((p.x - g.hx) ** 2 + (p.y - g.hy) ** 2 > 48 ** 2) return;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    stop();
    apply(p.x);
  };

  const apply = (clientX: number) => {
    const next = hit.current.to(clientX);
    if (scene === 0) patch({ x: next });
    else if (scene === 1) patch({ rx: avoidPole(next) });
    else patch({ px: next });
  };

  return (
    <div className="stage" data-scene={scene}>
      <SceneBar
        lang={lang}
        scene={scene}
        calm={calm}
        playing={playing}
        onScene={choose}
        onPlay={toggle}
        scenes={[
          { id: 0, vi: "Bậc ba", en: "Cubic" },
          { id: 1, vi: "Tiệm cận", en: "Asymptotes" },
          { id: 2, vi: "y = x³", en: "y = x³" },
        ]}
      />
      <div
        className="graph-wrap"
        onPointerDown={onDown}
        onPointerMove={(event) => {
          if (!dragging.current) return;
          apply(point(event).x);
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
        <>
          <dl className="readout">
            <div><dt>y</dt><dd>{fmt(cubic(x))}</dd></div>
            <div><dt>y′</dt><dd>{fmt(slope)}</dd></div>
            <div><dt>y″</dt><dd>{fmt(cubicSecond(x))}</dd></div>
            <div><dt>{t(lang, "Xu hướng", "Trend")}</dt><dd>{trend}</dd></div>
          </dl>
          <div className="chips" role="group" aria-label={t(lang, "Điểm đặc biệt", "Marked points")}>
            {[
              [-1, "x = −1"],
              [0, "x = 0"],
              [1, "x = 1"],
            ].map(([value, label]) => (
              <button key={label} type="button" aria-pressed={Math.abs(x - Number(value)) < 0.02} onClick={() => { stop(); patch({ x: Number(value) }); }}>
                {label}
              </button>
            ))}
          </div>
        </>
      ) : null}
      {scene === 1 ? (
        <dl className="readout">
          <div><dt>x</dt><dd>{fmt(rx)}</dd></div>
          <div><dt>y</dt><dd>{fmt(rationalY(rx))}</dd></div>
          <div><dt>{t(lang, "Đứng", "Vertical")}</dt><dd>x = 1</dd></div>
          <div><dt>{t(lang, "Xiên", "Oblique")}</dt><dd>y = x + 1</dd></div>
        </dl>
      ) : null}
      {scene === 2 ? (
        <dl className="readout">
          <div><dt>y</dt><dd>{fmt(pureCubic(px))}</dd></div>
          <div><dt>y′</dt><dd>{fmt(pureSlope)}</dd></div>
          <div className="wide"><dt>{t(lang, "Tại 0", "At 0")}</dt><dd>{t(lang, "Tiếp tuyến ngang, vẫn đồng biến", "Horizontal tangent, still increasing")}</dd></div>
        </dl>
      ) : null}
      {scene === 0 ? <Slider label="x" min={-2.4} max={2.4} step={0.05} value={x} onChange={(next) => { stop(); patch({ x: next }); }} /> : null}
      {scene === 1 ? <Slider label="x" min={-1.5} max={4} step={0.05} value={rx} onChange={(next) => { stop(); patch({ rx: avoidPole(next) }); }} /> : null}
      {scene === 2 ? <Slider label="x" min={-2} max={2} step={0.05} value={px} onChange={(next) => { stop(); patch({ px: next }); }} /> : null}
      <p className="note">
        <MathText
          text={
            scene === 0
              ? t(lang, "$y'=0$ tại $\\pm1$: cực đại $2$, cực tiểu $-2$. Nghiệm $0,\\pm\\sqrt3\\neq\\pm1$.", "$y'=0$ at $\\pm1$: maximum $2$, minimum $-2$. Roots $0,\\pm\\sqrt3\\neq\\pm1$.")
              : scene === 1
                ? t(lang, "Tiệm cận $x=1$, $y=x+1$. Giao $(1;2)$ không trên đồ thị.", "Asymptotes $x=1$, $y=x+1$. Crossing $(1;2)$ is not on the graph.")
                : t(lang, "$y=x^3$: $y'(0)=0$, không đổi dấu, không cực trị.", "$y=x^3$: $y'(0)=0$, no sign change, no extremum.")
          }
        />
      </p>
    </div>
  );
}

function drawCubic(ctx: CanvasRenderingContext2D, width: number, height: number, x: number, colors: PlotColors): Hit {
  const pad = 32;
  const x0 = -2.6;
  const x1 = 2.6;
  const y0 = -4;
  const y1 = 4;
  const map = makeMap(width, height, pad, x0, x1, y0, y1);
  paintBase(ctx, width, height, colors);
  drawGrid(ctx, map, x0, x1, y0, y1, colors);
  drawAxes(ctx, map, x0, x1, y0, y1, colors, "x", "y", width, pad);
  strokeFn(ctx, map, width, height, pad, x0, x1, cubic, colors.curve);
  mark(ctx, map.x(-1), map.y(2), colors.alt, colors.bg, "2", true);
  mark(ctx, map.x(1), map.y(-2), colors.alt, colors.bg, "−2", false);
  for (const root of [-Math.sqrt(3), 0, Math.sqrt(3)]) dot(ctx, map.x(root), map.y(0), colors.ink, colors.bg, 3.5);
  const y = cubic(x);
  clipLine(ctx, map, width, height, pad, x, y, cubicSlope(x), colors.alt, 1.4);
  const px = map.x(x);
  const py = map.y(y);
  dot(ctx, px, py, colors.curve, colors.bg, 6);
  return { hx: px, hy: py, to: (clientX) => snap(map.toX(clientX), 0.05, -2.4, 2.4) };
}

function drawRational(ctx: CanvasRenderingContext2D, width: number, height: number, x: number, colors: PlotColors): Hit {
  const pad = 32;
  const x0 = -1.6;
  const x1 = 4.4;
  const y0 = -6;
  const y1 = 10;
  const map = makeMap(width, height, pad, x0, x1, y0, y1);
  paintBase(ctx, width, height, colors);
  drawGrid(ctx, map, x0, x1, y0, y1, colors);
  drawAxes(ctx, map, x0, x1, y0, y1, colors, "x", "y", width, pad);
  dashed(ctx, map.x(1), map.y(y0), map.x(1), map.y(y1), colors.alt);
  dashed(ctx, map.x(x0), map.y(rationalOblique(x0)), map.x(x1), map.y(rationalOblique(x1)), colors.soft);
  strokeFn(ctx, map, width, height, pad, x0, x1, (value) => (Math.abs(value - 1) < 0.12 ? Number.NaN : rationalY(value)), colors.curve);
  cross(ctx, map.x(1), map.y(2), colors.alt);
  halo(ctx, "không thuộc", map.x(1) + 8, map.y(2) - 14, colors.alt, colors.bg, "left");
  const y = rationalY(x);
  const px = map.x(x);
  const py = map.y(Math.min(y1, Math.max(y0, y)));
  if (Number.isFinite(y)) dot(ctx, px, py, colors.curve, colors.bg, 6);
  return { hx: px, hy: py, to: (clientX) => snap(map.toX(clientX), 0.05, -1.5, 4) };
}

function drawPure(ctx: CanvasRenderingContext2D, width: number, height: number, x: number, colors: PlotColors): Hit {
  const pad = 32;
  const x0 = -2.2;
  const x1 = 2.2;
  const y0 = -8;
  const y1 = 8;
  const map = makeMap(width, height, pad, x0, x1, y0, y1);
  paintBase(ctx, width, height, colors);
  drawGrid(ctx, map, x0, x1, y0, y1, colors);
  drawAxes(ctx, map, x0, x1, y0, y1, colors, "x", "y", width, pad);
  strokeFn(ctx, map, width, height, pad, x0, x1, pureCubic, colors.curve);
  const y = pureCubic(x);
  clipLine(ctx, map, width, height, pad, x, y, pureCubicSlope(x), colors.alt, 1.4);
  const px = map.x(x);
  const py = map.y(y);
  dot(ctx, px, py, colors.curve, colors.bg, 6);
  if (Math.abs(x) < 0.08) halo(ctx, "không đổi dấu", px + 10, py - 18, colors.alt, colors.bg, "left");
  return { hx: px, hy: py, to: (clientX) => snap(map.toX(clientX), 0.05, -2, 2) };
}

function mark(ctx: CanvasRenderingContext2D, x: number, y: number, fill: string, bg: string, text: string, above: boolean) {
  dot(ctx, x, y, fill, bg, 4.5);
  halo(ctx, text, x, above ? y - 14 : y + 14, fill, bg);
}

function cross(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(x - 6, y - 6);
  ctx.lineTo(x + 6, y + 6);
  ctx.moveTo(x - 6, y + 6);
  ctx.lineTo(x + 6, y - 6);
  ctx.stroke();
  ctx.restore();
}

function avoidPole(x: number): number {
  if (Math.abs(x - 1) < 0.15) return x < 1 ? 0.85 : 1.15;
  return x;
}

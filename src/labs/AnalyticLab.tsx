import { useRef, type PointerEvent } from "react";
import { analyticInit, analyticRange } from "../content/params.ts";
import { fmt, showExact, snap } from "../lib/format.ts";
import { circlePlace, lineFoot2, planeFoot } from "../lib/math.ts";
import { writeParams } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { Live } from "../ui/Live.tsx";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/Prefs.tsx";
import { Slider } from "../ui/Slider.tsx";
import { useCalm, useClock } from "./clock.ts";
import {
  arrow,
  clipLine,
  dashed,
  dot,
  drawAxes,
  drawGrid,
  fitIso,
  halo,
  makeMap,
  nearestHandle,
  paintBase,
  readColors,
  type Map2,
  type PlotColors,
} from "./draw.ts";
import { Graph } from "./Graph.tsx";
import { useLessonState } from "./lessonState.ts";
import { SceneBar } from "./SceneBar.tsx";

type Hit = { map: Map2 | null; handles: { id: string; x: number; y: number }[] } | null;

export function AnalyticLab() {
  const lang = useLang();
  const calm = useCalm();
  const { values, ref, patch, play, halt, playing } = useLessonState("analytic", analyticInit, analyticRange);
  const hit = useRef<Hit>(null);
  const drag = useRef(false);
  const scene = values.scene ?? 0;
  const a = values.a ?? 1;
  const b = values.b ?? 1;
  const c = values.c ?? -2;
  const px = values.px ?? 3;
  const py = values.py ?? 1;
  const pa = values.pa ?? 1;
  const pb = values.pb ?? 1;
  const pc = values.pc ?? 1;
  const pd = values.pd ?? -6;
  const qx = values.qx ?? 1;
  const qy = values.qy ?? 1;
  const qz = values.qz ?? 1;
  const radius = values.radius ?? 5;
  const cx = values.cx ?? 3;
  const cy = values.cy ?? 4;
  const foot = lineFoot2(a, b, c, px, py);
  const plane = planeFoot(pa, pb, pc, pd, qx, qy, qz);
  const place = circlePlace(cx, cy, radius);
  const guest = circlePlace(6, 0, radius);

  const stop = () => {
    halt();
    writeParams("analytic", ref.current);
  };

  useClock(playing && scene === 0 && !calm, 2400, false, (u) => patch({ px: snap(1 + 2 * u, 0.5, -2, 6) }, true), stop);
  useClock(playing && scene === 1 && !calm, 2400, false, (u) => patch({ qz: snap(4 + (1 - 4) * u, 0.5, -2, 8) }, true), stop);
  useClock(
    playing && scene === 2 && !calm,
    2800,
    false,
    (u) => patch({ cx: snap(3 + 3 * u, 0.5, -8, 8), cy: snap(4 - 4 * u, 0.5, -8, 8) }, true),
    stop,
  );

  const toggle = () => {
    if (calm) return;
    if (playing) {
      stop();
      return;
    }
    play();
    if (scene === 0) patch({ px: 1, py: 1 }, true);
    if (scene === 1) patch({ qz: 4 }, true);
    if (scene === 2) patch({ cx: 3, cy: 4 }, true);
  };

  const choose = (next: number) => {
    stop();
    patch({ scene: next });
  };

  const placeWord = (kind: "in" | "on" | "out", english: boolean) => {
    if (kind === "on") return english ? "On" : "Trên";
    if (kind === "in") return english ? "Inside" : "Trong";
    return english ? "Outside" : "Ngoài";
  };

  const live = scene === 0
    ? t(
        lang,
        `Khoảng cách ${showExact(foot.dist)}. Chân (${fmt(foot.x)}; ${fmt(foot.y)}). Chỉ phương (${fmt(b)}; ${fmt(-a)}).`,
        `Distance ${showExact(foot.dist)}. Foot (${fmt(foot.x)}; ${fmt(foot.y)}). Direction (${fmt(b)}; ${fmt(-a)}).`,
      )
    : scene === 1
      ? t(
          lang,
          `Khoảng cách ${showExact(plane.dist)}. Chân (${fmt(plane.x)}; ${fmt(plane.y)}; ${fmt(plane.z)}).`,
          `Distance ${showExact(plane.dist)}. Foot (${fmt(plane.x)}; ${fmt(plane.y)}; ${fmt(plane.z)}).`,
        )
      : t(
          lang,
          `Điểm đang chọn: ${placeWord(place, false)}. Điểm (6; 0): ${placeWord(guest, false)}.`,
          `Chosen point: ${placeWord(place, true)}. Point (6; 0): ${placeWord(guest, true)}.`,
        );

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const colors = readColors();
    if (scene === 0) hit.current = drawLine(ctx, width, height, a, b, c, px, py, foot, colors);
    else if (scene === 1) hit.current = drawPlane(ctx, width, height, pa, pb, pc, pd, qx, qy, qz, plane, colors);
    else hit.current = drawCircle(ctx, width, height, radius, cx, cy, place, guest, colors, lang === "en");
  };

  const pointOf = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const apply = (pxy: { x: number; y: number }) => {
    const map = hit.current?.map;
    if (!map || scene === 1) {
      if (scene === 1) {
        const scale = 0.03;
        const dx = pxy.x - (originDrag.current?.x ?? pxy.x);
        const dy = pxy.y - (originDrag.current?.y ?? pxy.y);
        const base = originDrag.current;
        if (!base) return;
        patch({
          qx: snap(base.qx + dx * scale, 0.5, -2, 8),
          qy: snap(base.qy - dy * scale, 0.5, -2, 8),
        });
      }
      return;
    }
    if (scene === 0) {
      patch({ px: snap(map.toX(pxy.x), 0.5, -2, 6), py: snap(map.toY(pxy.y), 0.5, -2, 6) });
    } else {
      patch({ cx: snap(map.toX(pxy.x), 0.5, -8, 8), cy: snap(map.toY(pxy.y), 0.5, -8, 8) });
    }
  };

  const originDrag = useRef<{ x: number; y: number; qx: number; qy: number } | null>(null);

  const onDown = (event: PointerEvent<HTMLDivElement>) => {
    const g = hit.current;
    if (!g) return;
    const at = pointOf(event);
    if (!nearestHandle(g.handles, at.x, at.y, scene === 1 ? 36 : 1000)) return;
    drag.current = true;
    originDrag.current = { x: at.x, y: at.y, qx, qy };
    event.currentTarget.setPointerCapture(event.pointerId);
    stop();
    if (scene !== 1) apply(at);
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
          { id: 0, vi: "Đường thẳng", en: "Line" },
          { id: 1, vi: "Mặt phẳng", en: "Plane" },
          { id: 2, vi: "Đường tròn", en: "Circle" },
        ]}
      />
      <div
        className="graph-wrap"
        onPointerDown={onDown}
        onPointerMove={(event) => {
          if (!drag.current) return;
          apply(pointOf(event));
        }}
        onPointerUp={() => {
          drag.current = false;
        }}
        onPointerCancel={() => {
          drag.current = false;
        }}
      >
        <Graph draw={draw} label={live} />
      </div>
      <Live text={live} />
      {scene === 0 ? (
        <dl className="readout">
          <div><dt>{t(lang, "Khoảng cách", "Distance")}</dt><dd>{showExact(foot.dist)}</dd></div>
          <div><dt>{t(lang, "Chân", "Foot")}</dt><dd>({fmt(foot.x)}; {fmt(foot.y)})</dd></div>
          <div><dt>{t(lang, "Chỉ phương", "Direction")}</dt><dd>({fmt(b)}; {fmt(-a)})</dd></div>
          <div><dt>{t(lang, "Pháp tuyến", "Normal")}</dt><dd>({fmt(a)}; {fmt(b)})</dd></div>
        </dl>
      ) : null}
      {scene === 1 ? (
        <dl className="readout">
          <div><dt>{t(lang, "Khoảng cách", "Distance")}</dt><dd>{showExact(plane.dist)}</dd></div>
          <div className="wide"><dt>{t(lang, "Chân", "Foot")}</dt><dd>({fmt(plane.x)}; {fmt(plane.y)}; {fmt(plane.z)})</dd></div>
        </dl>
      ) : null}
      {scene === 2 ? (
        <dl className="readout">
          <div><dt>r</dt><dd>{fmt(radius)}</dd></div>
          <div><dt>{t(lang, "Điểm", "Point")}</dt><dd>{placeWord(place, lang === "en")}</dd></div>
          <div className="wide"><dt>(6; 0)</dt><dd>{placeWord(guest, lang === "en")}</dd></div>
        </dl>
      ) : null}
      {scene === 0 ? (
        <>
          <Slider label="a" min={-3} max={3} step={0.5} value={a} onChange={(next) => { stop(); patch({ a: next }); }} />
          <Slider label="b" min={-3} max={3} step={0.5} value={b} onChange={(next) => { stop(); patch({ b: next }); }} />
          <Slider label="c" min={-6} max={6} step={0.5} value={c} onChange={(next) => { stop(); patch({ c: next }); }} />
        </>
      ) : null}
      {scene === 1 ? (
        <>
          <Slider label="a" min={0.5} max={2} step={0.5} value={pa} onChange={(next) => { stop(); patch({ pa: next }); }} />
          <Slider label="b" min={0.5} max={2} step={0.5} value={pb} onChange={(next) => { stop(); patch({ pb: next }); }} />
          <Slider label="c" min={0.5} max={2} step={0.5} value={pc} onChange={(next) => { stop(); patch({ pc: next }); }} />
          <Slider label="d" min={-12} max={-1} step={0.5} value={pd} onChange={(next) => { stop(); patch({ pd: next }); }} />
        </>
      ) : null}
      {scene === 2 ? (
        <Slider label={t(lang, "Bán kính", "Radius")} min={1} max={8} step={0.5} value={radius} onChange={(next) => { stop(); patch({ radius: next }); }} />
      ) : null}
      <p className="note">
        <MathText
          text={
            scene === 0
              ? t(lang, "$\\dfrac{|3+1-2|}{\\sqrt{2}}=\\sqrt{2}$. Chân $(2;0)$. $\\vec d=(1;-1)\\neq\\vec n=(1;1)$.", "$\\dfrac{|3+1-2|}{\\sqrt{2}}=\\sqrt{2}$. Foot $(2;0)$. $\\vec d=(1;-1)\\neq\\vec n=(1;1)$.")
              : scene === 1
                ? t(lang, "$\\dfrac{|1+1+1-6|}{\\sqrt{3}}=\\sqrt{3}$. Chân $(2;2;2)$.", "$\\dfrac{|1+1+1-6|}{\\sqrt{3}}=\\sqrt{3}$. Foot $(2;2;2)$.")
                : t(lang, "$3^2+4^2=25$ trên. $(6;0)$: $6>5$ ngoài.", "$3^2+4^2=25$ on. $(6;0)$: $6>5$ outside.")
          }
        />
      </p>
    </div>
  );
}

function drawLine(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  a: number,
  b: number,
  c: number,
  px: number,
  py: number,
  foot: { x: number; y: number; dist: number },
  colors: PlotColors,
): Hit {
  paintBase(ctx, width, height, colors);
  const map = makeMap(width, height, 28, -2, 6, -2, 6);
  drawGrid(ctx, map, -2, 6, -2, 6, colors);
  drawAxes(ctx, map, -2, 6, -2, 6, colors, "x", "y", width, 28);
  if (Math.abs(b) < 1e-9) {
    if (Math.abs(a) > 1e-9) {
      const x = -c / a;
      ctx.strokeStyle = colors.curve;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(map.x(x), map.y(-2));
      ctx.lineTo(map.x(x), map.y(6));
      ctx.stroke();
    }
  } else {
    clipLine(ctx, map, width, height, 28, 0, -c / b, -a / b, colors.curve, 2.2);
  }
  if (Number.isFinite(foot.dist)) {
    dashed(ctx, map.x(px), map.y(py), map.x(foot.x), map.y(foot.y), colors.alt);
    dot(ctx, map.x(foot.x), map.y(foot.y), colors.curve, colors.bg, 4);
    const dir = unit(map.x(foot.x + b) - map.x(foot.x), map.y(foot.y - a) - map.y(foot.y));
    const nor = unit(map.x(px) - map.x(foot.x), map.y(py) - map.y(foot.y));
    rightAngle(ctx, map.x(foot.x), map.y(foot.y), dir, nor, colors.ink);
    halo(ctx, showExact(foot.dist), (map.x(px) + map.x(foot.x)) / 2, (map.y(py) + map.y(foot.y)) / 2 - 12, colors.ink, colors.bg);
  }
  dot(ctx, map.x(px), map.y(py), colors.alt, colors.bg, 6);
  halo(ctx, `P (${fmt(px)}; ${fmt(py)})`, map.x(px) + 8, map.y(py) + 14, colors.ink, colors.bg, "left");
  return { map, handles: [{ id: "p", x: map.x(px), y: map.y(py) }] };
}

function drawPlane(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  a: number,
  b: number,
  c: number,
  d: number,
  qx: number,
  qy: number,
  qz: number,
  foot: { x: number; y: number; z: number; dist: number },
  colors: PlotColors,
): Hit {
  paintBase(ctx, width, height, colors);
  const ix = Math.abs(a) < 1e-9 ? 0 : -d / a;
  const iy = Math.abs(b) < 1e-9 ? 0 : -d / b;
  const iz = Math.abs(c) < 1e-9 ? 0 : -d / c;
  const samples: (readonly [number, number, number])[] = [
    [ix, 0, 0], [0, iy, 0], [0, 0, iz], [qx, qy, qz], [foot.x, foot.y, foot.z], [0, 0, 0],
  ];
  const at = fitIso(samples, width, height, 36);
  const A = at(ix, 0, 0);
  const B = at(0, iy, 0);
  const C = at(0, 0, iz);
  ctx.beginPath();
  ctx.moveTo(A.x, A.y);
  ctx.lineTo(B.x, B.y);
  ctx.lineTo(C.x, C.y);
  ctx.closePath();
  ctx.fillStyle = colors.curve;
  ctx.globalAlpha = 0.18;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = colors.curve;
  ctx.lineWidth = 2;
  ctx.stroke();
  const Q = at(qx, qy, qz);
  const F = at(foot.x, foot.y, foot.z);
  dashed(ctx, Q.x, Q.y, F.x, F.y, colors.alt);
  dot(ctx, F.x, F.y, colors.curve, colors.bg, 4);
  dot(ctx, Q.x, Q.y, colors.alt, colors.bg, 6);
  halo(ctx, showExact(foot.dist), (Q.x + F.x) / 2, (Q.y + F.y) / 2 - 12, colors.ink, colors.bg);
  halo(ctx, `d = ${showExact(foot.dist)}`, 14, 16, colors.ink, colors.bg, "left");
  return { map: null, handles: [{ id: "q", x: Q.x, y: Q.y }] };
}

function drawCircle(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  radius: number,
  cx: number,
  cy: number,
  place: "in" | "on" | "out",
  guest: "in" | "on" | "out",
  colors: PlotColors,
  english: boolean,
): Hit {
  paintBase(ctx, width, height, colors);
  const map = makeMap(width, height, 28, -8, 8, -8, 8);
  drawGrid(ctx, map, -8, 8, -8, 8, colors);
  drawAxes(ctx, map, -8, 8, -8, 8, colors, "x", "y", width, 28);
  ctx.beginPath();
  ctx.strokeStyle = colors.curve;
  ctx.lineWidth = 2;
  ctx.arc(map.x(0), map.y(0), Math.abs(map.x(radius) - map.x(0)), 0, Math.PI * 2);
  ctx.stroke();
  const word = (kind: "in" | "on" | "out") => (kind === "on" ? (english ? "on" : "trên") : kind === "in" ? (english ? "in" : "trong") : english ? "out" : "ngoài");
  dot(ctx, map.x(6), map.y(0), colors.soft, colors.bg, 4);
  halo(ctx, `(6; 0) ${word(guest)}`, map.x(6), map.y(0) - 14, colors.soft, colors.bg);
  dot(ctx, map.x(cx), map.y(cy), place === "on" ? colors.curve : colors.alt, colors.bg, 6);
  halo(ctx, word(place), map.x(cx), map.y(cy) - 16, colors.ink, colors.bg);
  arrow(ctx, map.x(0), map.y(0), map.x(radius), map.y(0), colors.curve);
  return { map, handles: [{ id: "c", x: map.x(cx), y: map.y(cy) }] };
}

function unit(x: number, y: number): { x: number; y: number } {
  const len = Math.hypot(x, y) || 1;
  return { x: x / len, y: y / len };
}

function rightAngle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  dir: { x: number; y: number },
  nor: { x: number; y: number },
  color: string,
) {
  if (!Number.isFinite(dir.x + nor.x)) return;
  const s = 9;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(x + dir.x * s, y + dir.y * s);
  ctx.lineTo(x + dir.x * s + nor.x * s, y + dir.y * s + nor.y * s);
  ctx.lineTo(x + nor.x * s, y + nor.y * s);
  ctx.stroke();
  ctx.restore();
}

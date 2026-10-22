import { useRef, type PointerEvent } from "react";
import { trigInit, trigRange } from "../content/params.ts";
import { fmt, snap } from "../lib/format.ts";
import { cosDeg, quadrant, showCos, showSin, showSinCos, showTan, sinDeg, treeHeight } from "../lib/math.ts";
import { writeParams } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { Live } from "../ui/Live.tsx";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/Prefs.tsx";
import { Slider } from "../ui/Slider.tsx";
import { useCalm, useClock } from "./clock.ts";
import { dashed, dot, halo, paintBase, readColors, type PlotColors } from "./draw.ts";
import { Graph } from "./Graph.tsx";
import { useLessonState } from "./lessonState.ts";
import { SceneBar } from "./SceneBar.tsx";

type Hit =
  | { kind: "circle"; cx: number; cy: number; r: number }
  | { kind: "tree"; treeX: number; topY: number; ground: number; scale: number; distance: number };

export function TrigLab() {
  const lang = useLang();
  const calm = useCalm();
  const { values, ref, patch, play, halt, playing } = useLessonState("trig", trigInit, trigRange);
  const hit = useRef<Hit | null>(null);
  const dragging = useRef(false);
  const scene = values.scene ?? 0;
  const angle = values.angle ?? 150;
  const distance = values.distance ?? 20;
  const tilt = values.tilt ?? 30;

  const stop = () => {
    halt();
    writeParams("trig", ref.current);
  };

  useClock(
    playing && scene === 0 && !calm,
    8000,
    true,
    (u) => patch({ angle: snap(u * 360, 1, 0, 360) }, true),
  );
  useClock(
    playing && scene === 1 && !calm,
    3600,
    false,
    (u) => patch({ tilt: snap(8 + u * 64, 1, 5, 75) }, true),
    stop,
  );

  const toggle = () => {
    if (calm) return;
    if (playing) {
      stop();
      return;
    }
    play();
    if (scene === 0) patch({ angle: 0 }, true);
    if (scene === 1) patch({ tilt: 8 }, true);
  };

  const choose = (next: number) => {
    stop();
    patch({ scene: next });
  };

  const above = distance * Math.tan((tilt * Math.PI) / 180);
  const total = treeHeight(distance, tilt);
  const live = scene === 0
    ? t(lang, `Góc ${fmt(angle)}°. sin = ${showSin(angle)}, cos = ${showCos(angle)}, tan = ${showTan(angle)}.`, `Angle ${fmt(angle)}°. sin = ${showSin(angle)}, cos = ${showCos(angle)}, tan = ${showTan(angle)}.`)
    : t(lang, `Cây cách ${fmt(distance)} m, góc ${fmt(tilt)}°, cao khoảng ${fmt(total)} m.`, `Tree ${fmt(distance)} m away, angle ${fmt(tilt)}°, height about ${fmt(total)} m.`);

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const colors = readColors();
    hit.current = scene === 0
      ? drawCircle(ctx, width, height, angle, colors)
      : drawTree(ctx, width, height, distance, tilt, colors);
  };

  const point = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const apply = (p: { x: number; y: number }) => {
    const g = hit.current;
    if (!g) return;
    if (g.kind === "circle") {
      const math = Math.atan2(-(p.y - g.cy), p.x - g.cx);
      let deg = (math * 180) / Math.PI;
      if (deg < 0) deg += 360;
      patch({ angle: snap(deg, 1, 0, 360) });
      return;
    }
    const aboveM = (g.ground - p.y) / g.scale - 1.5;
    const deg = (Math.atan2(aboveM, g.distance) * 180) / Math.PI;
    patch({ tilt: snap(deg, 1, 5, 75) });
  };

  const onDown = (event: PointerEvent<HTMLDivElement>) => {
    const g = hit.current;
    const p = point(event);
    if (!g) return;
    if (g.kind === "circle") {
      const dx = p.x - g.cx;
      const dy = p.y - g.cy;
      if (dx * dx + dy * dy > (g.r + 36) ** 2) return;
    } else if ((p.x - g.treeX) ** 2 + (p.y - g.topY) ** 2 > 48 ** 2) {
      return;
    }
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    stop();
    apply(p);
  };

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    apply(point(event));
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
          { id: 0, vi: "Đường tròn", en: "Circle" },
          { id: 1, vi: "Đo cây", en: "Tree" },
        ]}
      />
      <div className="graph-wrap" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={() => { dragging.current = false; }} onPointerCancel={() => { dragging.current = false; }}>
        <Graph draw={draw} label={live} />
      </div>
      <Live text={live} />
      {scene === 0 ? (
        <dl className="readout">
          <div><dt>{t(lang, "Góc", "Angle")}</dt><dd>{fmt(angle)}°</dd></div>
          <div><dt>{t(lang, "Vị trí", "Place")}</dt><dd>{quadrant(angle, lang)}</dd></div>
          <div><dt>sin</dt><dd>{showSin(angle)}</dd></div>
          <div><dt>cos</dt><dd>{showCos(angle)}</dd></div>
          <div><dt>tan</dt><dd>{showTan(angle)}</dd></div>
          <div><dt>sin + cos</dt><dd>{showSinCos(angle)}</dd></div>
        </dl>
      ) : (
        <dl className="readout">
          <div><dt>{t(lang, "Khoảng cách", "Distance")}</dt><dd>{fmt(distance)} m</dd></div>
          <div><dt>{t(lang, "Góc ngẩng", "Angle")}</dt><dd>{fmt(tilt)}°</dd></div>
          <div><dt>{t(lang, "Trên mắt", "Above eye")}</dt><dd>{fmt(above)} m</dd></div>
          <div><dt>{t(lang, "Cả cây", "Whole tree")}</dt><dd>{fmt(total)} m</dd></div>
        </dl>
      )}
      {scene === 0 ? (
        <Slider label={t(lang, "Góc", "Angle")} min={0} max={360} step={1} suffix="°" value={angle} onChange={(next) => { stop(); patch({ angle: next }); }} />
      ) : (
        <>
          <Slider label={t(lang, "Khoảng cách", "Distance")} min={8} max={40} step={1} suffix=" m" value={distance} onChange={(next) => { stop(); patch({ distance: next }); }} />
          <Slider label={t(lang, "Góc ngẩng", "Angle")} min={5} max={75} step={1} suffix="°" value={tilt} onChange={(next) => { stop(); patch({ tilt: next }); }} />
        </>
      )}
      <p className="note">
        <MathText
          text={
            scene === 0
              ? t(lang, "$\\sin150^\\circ=\\frac12$, $\\cos150^\\circ=-\\frac{\\sqrt3}{2}$. $\\max(\\sin+\\cos)=\\sqrt2$.", "$\\sin150^\\circ=\\frac12$, $\\cos150^\\circ=-\\frac{\\sqrt3}{2}$. $\\max(\\sin+\\cos)=\\sqrt2$.")
              : t(lang, "$20\\tan30^\\circ+1{,}5$.", "$20\\tan30^\\circ+1{,}5$.")
          }
        />
      </p>
    </div>
  );
}

function drawCircle(ctx: CanvasRenderingContext2D, width: number, height: number, angle: number, colors: PlotColors): Hit {
  paintBase(ctx, width, height, colors);
  const narrow = width < 560;
  const rad = (angle * Math.PI) / 180;
  const r = narrow ? Math.min(width * 0.28, height * 0.2) : Math.min(height * 0.36, width * 0.2);
  const cx = narrow ? width / 2 : 24 + r;
  const cy = narrow ? 18 + r : height / 2;
  ctx.strokeStyle = colors.soft;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = colors.grid;
  ctx.beginPath();
  ctx.moveTo(cx - r - 8, cy);
  ctx.lineTo(cx + r + 8, cy);
  ctx.moveTo(cx, cy - r - 8);
  ctx.lineTo(cx, cy + r + 8);
  ctx.stroke();
  ctx.fillStyle = colors.curve;
  ctx.globalAlpha = 0.18;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, Math.min(26, r * 0.34), 0, -rad, true);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;

  const px = cx + r * Math.cos(rad);
  const py = cy - r * Math.sin(rad);
  ctx.strokeStyle = colors.ink;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(px, py);
  ctx.stroke();
  ctx.strokeStyle = colors.alt;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(px, cy);
  ctx.stroke();
  ctx.strokeStyle = colors.curve;
  ctx.beginPath();
  ctx.moveTo(px, cy);
  ctx.lineTo(px, py);
  ctx.stroke();
  dot(ctx, px, py, colors.curve, colors.bg, 6);
  halo(ctx, "cos", (cx + px) / 2, cy + 14, colors.alt, colors.bg);
  halo(ctx, "sin", px + 16, (cy + py) / 2, colors.curve, colors.bg, "left");

  const waveTop = narrow ? cy + r + 28 : padless(cy);
  const waveLeft = narrow ? 28 : cx + r + 36;
  const waveRight = width - 18;
  const waveBottom = height - 22;
  const amp = narrow ? Math.min(waveBottom - waveTop, r) / 2 : r;
  const baseY = narrow ? (waveTop + waveBottom) / 2 : cy;
  const waveX = (deg: number) => waveLeft + (deg / 360) * Math.max(10, waveRight - waveLeft);
  const waveY = (value: number) => baseY - value * (narrow ? amp : r);

  ctx.strokeStyle = colors.grid;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(waveLeft, baseY);
  ctx.lineTo(waveRight, baseY);
  ctx.stroke();
  trace(ctx, waveX, waveY, (deg) => cosDeg(deg), colors.alt, 1.4);
  trace(ctx, waveX, waveY, (deg) => sinDeg(deg), colors.curve, 2.2);
  const markerX = waveX(angle);
  const markerY = waveY(sinDeg(angle));
  if (!narrow) dashed(ctx, px, py, markerX, py, colors.soft);
  dot(ctx, markerX, markerY, colors.curve, colors.bg, 4);
  halo(ctx, "sin", waveRight - 4, waveY(1) - 8, colors.curve, colors.bg, "right");
  return { kind: "circle", cx, cy, r };
}

function padless(cy: number): number {
  return cy;
}

function trace(
  ctx: CanvasRenderingContext2D,
  waveX: (deg: number) => number,
  waveY: (value: number) => number,
  fn: (deg: number) => number,
  color: string,
  width: number,
) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineJoin = "round";
  for (let deg = 0; deg <= 360; deg += 3) {
    const x = waveX(deg);
    const y = waveY(fn(deg));
    if (deg === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawTree(ctx: CanvasRenderingContext2D, width: number, height: number, distance: number, tilt: number, colors: PlotColors): Hit {
  paintBase(ctx, width, height, colors);
  const eye = 1.5;
  const above = distance * Math.tan((tilt * Math.PI) / 180);
  const total = above + eye;
  const pad = 26;
  const scale = Math.min((width - pad * 2) / (distance + 2.2), (height - pad * 2) / (total + 1.4));
  const ground = height - pad;
  const personX = pad + 0.8 * scale;
  const treeX = personX + distance * scale;
  const eyeY = ground - eye * scale;
  const topY = ground - total * scale;

  ctx.strokeStyle = colors.axis;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(pad, ground);
  ctx.lineTo(width - pad, ground);
  ctx.stroke();

  ctx.fillStyle = colors.curve;
  ctx.globalAlpha = 0.12;
  ctx.beginPath();
  ctx.moveTo(personX, eyeY);
  ctx.lineTo(treeX, eyeY);
  ctx.lineTo(treeX, topY);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.strokeStyle = colors.alt;
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.moveTo(personX, eyeY);
  ctx.lineTo(treeX, topY);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = colors.curve;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(treeX - 6, eyeY, 12, 8);
  ctx.strokeStyle = colors.ink;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(treeX, ground);
  ctx.lineTo(treeX, topY + Math.max(10, 1.2 * scale));
  ctx.stroke();
  const canopy = Math.max(10, 1.15 * scale);
  ctx.fillStyle = colors.curve;
  ctx.beginPath();
  ctx.arc(treeX, topY + canopy * 0.15, canopy, 0, Math.PI * 2);
  ctx.fill();
  dot(ctx, treeX, topY, colors.bg, colors.alt, 5);

  ctx.strokeStyle = colors.ink;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(personX, ground);
  ctx.lineTo(personX, eyeY + 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(personX, eyeY - Math.max(5, 0.28 * scale), Math.max(4, 0.22 * scale), 0, Math.PI * 2);
  ctx.stroke();

  const arc = Math.min(18, scale * 1.4);
  ctx.strokeStyle = colors.alt;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.arc(personX, eyeY, arc, 0, -((tilt * Math.PI) / 180), true);
  ctx.stroke();

  halo(ctx, `${fmt(distance)} m`, (personX + treeX) / 2, ground + 14, colors.ink, colors.bg);
  halo(ctx, `${fmt(total)} m`, treeX + 16, (ground + topY) / 2, colors.curve, colors.bg, "left");
  halo(ctx, `${fmt(tilt)}°`, personX + arc + 8, eyeY - 10, colors.alt, colors.bg, "left");
  return { kind: "tree", treeX, topY, ground, scale, distance };
}

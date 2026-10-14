import { useRef, useState, type PointerEvent } from "react";
import { integralInit, integralRange } from "../content/params.ts";
import { fmt, snap } from "../lib/format.ts";
import { archIntegral, archRiemann, archVolumeCoeff, archY, betweenIntegral } from "../lib/math.ts";
import { writeParams } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { Live } from "../ui/Live.tsx";
import { useLang } from "../ui/Prefs.tsx";
import { Slider } from "../ui/Slider.tsx";
import { useCalm, useClock } from "./clock.ts";
import { dot, drawAxes, drawGrid, halo, makeMap, paintBase, readColors, strokeFn, type Map2, type PlotColors } from "./draw.ts";
import { Graph } from "./Graph.tsx";
import { useLessonState } from "./lessonState.ts";
import { SceneBar } from "./SceneBar.tsx";

type Hit = { hx: number; hy: number; to: (px: number) => number };

export function IntegralLab() {
  const lang = useLang();
  const calm = useCalm();
  const { values, ref, playing, patch } = useLessonState("integral", integralInit, integralRange);
  const [on, setOn] = useState(false);
  const hit = useRef<Hit | null>(null);
  const dragging = useRef(false);
  const scene = values.scene ?? 0;
  const upper = values.upper ?? 2;
  const strips = values.strips ?? 8;
  const gap = values.gap ?? 1;
  const span = values.span ?? 2;
  const area = archIntegral(upper);
  const approx = archRiemann(strips, upper);
  const band = betweenIntegral(gap);
  const coeff = archVolumeCoeff(span);

  const stop = () => {
    playing.current = false;
    setOn(false);
    writeParams("integral", ref.current);
  };

  useClock(on && scene === 0 && !calm, 3200, false, (u) => patch({ strips: snap(1 + 23 * u, 1, 1, 24) }, true), stop);
  useClock(on && scene === 1 && !calm, 2600, false, (u) => patch({ gap: snap(0.2 + 0.8 * u, 0.05, 0.2, 1) }, true), stop);
  useClock(on && scene === 2 && !calm, 2800, false, (u) => patch({ span: snap(0.2 + 1.8 * u, 0.05, 0.2, 2) }, true), stop);

  const toggle = () => {
    if (calm) return;
    if (playing.current) {
      stop();
      return;
    }
    playing.current = true;
    setOn(true);
    if (scene === 0) patch({ strips: 1 }, true);
    if (scene === 1) patch({ gap: 0.2 }, true);
    if (scene === 2) patch({ span: 0.2 }, true);
  };

  const choose = (next: number) => {
    stop();
    patch({ scene: next });
  };

  const areaText = Math.abs(upper - 2) < 1e-9 ? "4/3" : fmt(area);
  const bandText = Math.abs(gap - 1) < 1e-9 ? "1/6" : fmt(band);
  const volText = Math.abs(span - 2) < 1e-9 ? "16π/15" : `${fmt(coeff)} π`;

  const live = scene === 0
    ? t(lang, `Đến x = ${fmt(upper)}, tích phân ${areaText}. ${fmt(strips)} dải trung điểm cho ${fmt(approx)}.`, `Up to x = ${fmt(upper)}, the integral is ${areaText}. ${fmt(strips)} midpoint strips give ${fmt(approx)}.`)
    : scene === 1
      ? t(lang, `Trên [0; ${fmt(gap)}], y = x nằm trên y = x². Diện tích ${bandText}.`, `On [0, ${fmt(gap)}], y = x is above y = x². Area ${bandText}.`)
      : t(lang, `Quay đến x = ${fmt(span)}. Hệ số tích phân ${fmt(coeff)}, thể tích ${volText}.`, `Revolve up to x = ${fmt(span)}. The integral coefficient is ${fmt(coeff)}, volume ${volText}.`);

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const colors = readColors();
    if (scene === 0) hit.current = drawArea(ctx, width, height, upper, strips, colors);
    else if (scene === 1) hit.current = drawGap(ctx, width, height, gap, colors);
    else hit.current = drawSolid(ctx, width, height, span, colors);
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
    apply(p.x);
  };

  const apply = (px: number) => {
    const g = hit.current;
    if (!g) return;
    const next = g.to(px);
    if (scene === 0) patch({ upper: next });
    else if (scene === 1) patch({ gap: next });
    else patch({ span: next });
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
          { id: 0, vi: "Dưới đường", en: "Under the curve" },
          { id: 1, vi: "Hai đường", en: "Two curves" },
          { id: 2, vi: "Quay", en: "Revolve" },
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
        <dl className="readout">
          <div><dt>{t(lang, "Cận", "End")}</dt><dd>{fmt(upper)}</dd></div>
          <div><dt>{t(lang, "Tích phân", "Integral")}</dt><dd>{areaText}</dd></div>
          <div><dt>{t(lang, "Dải", "Strips")}</dt><dd>{fmt(strips)}</dd></div>
          <div><dt>{t(lang, "Xấp xỉ", "Approximation")}</dt><dd>{fmt(approx)}</dd></div>
        </dl>
      ) : null}
      {scene === 1 ? (
        <dl className="readout">
          <div><dt>{t(lang, "Cận", "End")}</dt><dd>{fmt(gap)}</dd></div>
          <div><dt>∫x</dt><dd>{fmt((gap * gap) / 2)}</dd></div>
          <div><dt>∫x²</dt><dd>{fmt((gap ** 3) / 3)}</dd></div>
          <div><dt>{t(lang, "Hiệu", "Difference")}</dt><dd>{bandText}</dd></div>
        </dl>
      ) : null}
      {scene === 2 ? (
        <dl className="readout">
          <div><dt>x</dt><dd>{fmt(span)}</dd></div>
          <div><dt>y</dt><dd>{fmt(archY(span))}</dd></div>
          <div><dt>∫ y²</dt><dd>{fmt(coeff)}</dd></div>
          <div><dt>V</dt><dd>{volText}</dd></div>
        </dl>
      ) : null}
      {scene === 0 ? (
        <>
          <Slider label="b" min={0.2} max={2} step={0.1} value={upper} onChange={(next) => { stop(); patch({ upper: next }); }} />
          <Slider label="n" min={1} max={24} step={1} value={strips} onChange={(next) => { stop(); patch({ strips: next }); }} />
        </>
      ) : null}
      {scene === 1 ? (
        <Slider label="b" min={0.2} max={1} step={0.05} value={gap} onChange={(next) => { stop(); patch({ gap: next }); }} />
      ) : null}
      {scene === 2 ? (
        <Slider label="b" min={0.2} max={2} step={0.05} value={span} onChange={(next) => { stop(); patch({ span: next }); }} />
      ) : null}
      <p className="note">
        {scene === 0 ? t(lang, "Kéo cận phải, hoặc tăng n. Tại b = 2 tích phân là 4/3. Một dải trung điểm cho 2: rộng 2, cao y(1) = 1. Đường x² − 2x nằm dưới Ox và cho −4/3.", "Drag the right end, or raise n. At b = 2 the integral is 4/3. One midpoint strip gives 2: width 2, height y(1) = 1. The curve x² − 2x lies below the x-axis and gives −4/3.") : null}
        {scene === 1 ? t(lang, "Kéo cận. Trên [0; 1] đường thẳng nằm trên parabol. Diện tích là 1/2 − 1/3 = 1/6. Đảo hai đường thì ra −1/6, đó là tích phân có dấu chứ không phải diện tích.", "Drag the end. On [0, 1] the line is above the parabola. The area is 1/2 − 1/3 = 1/6. Swapping the curves gives −1/6, a signed integral rather than an area.") : null}
        {scene === 2 ? t(lang, "Kéo mép khối. Bán kính lát là y, nên nhân π với tích phân y². Tại b = 2 thì V = 16π/15. Một ly nón bán kính 3 cao 6 là (1/3)πr²h = 18π, không phải 54π của hình trụ.", "Drag the end of the solid. The slice radius is y, so multiply π by the integral of y². At b = 2, V = 16π/15. A conical glass of radius 3 and height 6 is (1/3)πr²h = 18π, not the 54π of the cylinder.") : null}
      </p>
    </div>
  );
}

function drawArea(ctx: CanvasRenderingContext2D, width: number, height: number, upper: number, strips: number, colors: PlotColors): Hit {
  const pad = 32;
  const map = makeMap(width, height, pad, -0.4, 2.4, -0.4, 1.4);
  paintBase(ctx, width, height, colors);
  drawGrid(ctx, map, -0.4, 2.4, -0.4, 1.4, colors);
  drawAxes(ctx, map, -0.4, 2.4, -0.4, 1.4, colors, "x", "y", width, pad);
  const n = Math.max(1, Math.round(strips));
  const w = upper / n;
  ctx.save();
  ctx.fillStyle = colors.alt;
  ctx.globalAlpha = 0.18;
  for (let i = 0; i < n; i += 1) {
    const mid = (i + 0.5) * w;
    const y = Math.max(0, archY(mid));
    ctx.fillRect(map.x(i * w), map.y(y), map.x((i + 1) * w) - map.x(i * w), map.y(0) - map.y(y));
  }
  ctx.restore();
  fillCurve(ctx, map, 0, upper, archY, colors.curve, 0.2);
  strokeFn(ctx, map, width, height, pad, -0.2, 2.2, archY, colors.curve);
  const px = map.x(upper);
  const py = map.y(archY(upper));
  dot(ctx, px, py, colors.alt, colors.bg, 6);
  halo(ctx, `b = ${fmt(upper)}`, px, py - 16, colors.ink, colors.bg);
  return { hx: px, hy: py, to: (clientX) => snap(map.toX(clientX), 0.1, 0.2, 2) };
}

function drawGap(ctx: CanvasRenderingContext2D, width: number, height: number, gap: number, colors: PlotColors): Hit {
  const pad = 32;
  const map = makeMap(width, height, pad, -0.2, 1.3, -0.2, 1.2);
  paintBase(ctx, width, height, colors);
  drawGrid(ctx, map, -0.2, 1.3, -0.2, 1.2, colors);
  drawAxes(ctx, map, -0.2, 1.3, -0.2, 1.2, colors, "x", "y", width, pad);
  ctx.save();
  ctx.beginPath();
  ctx.rect(pad, pad, width - pad * 2, height - pad * 2);
  ctx.clip();
  ctx.beginPath();
  const steps = 40;
  ctx.moveTo(map.x(0), map.y(0));
  for (let i = 0; i <= steps; i += 1) {
    const x = (gap * i) / steps;
    ctx.lineTo(map.x(x), map.y(x));
  }
  for (let i = steps; i >= 0; i -= 1) {
    const x = (gap * i) / steps;
    ctx.lineTo(map.x(x), map.y(x * x));
  }
  ctx.closePath();
  ctx.fillStyle = colors.curve;
  ctx.globalAlpha = 0.2;
  ctx.fill();
  ctx.restore();
  strokeFn(ctx, map, width, height, pad, 0, 1.2, (x) => x, colors.alt, 2);
  strokeFn(ctx, map, width, height, pad, 0, 1.2, (x) => x * x, colors.curve, 2.2);
  const px = map.x(gap);
  const py = map.y(gap);
  dot(ctx, px, py, colors.alt, colors.bg, 6);
  halo(ctx, fmt(gap), px + 8, py - 12, colors.ink, colors.bg, "left");
  return { hx: px, hy: py, to: (clientX) => snap(map.toX(clientX), 0.05, 0.2, 1) };
}

function drawSolid(ctx: CanvasRenderingContext2D, width: number, height: number, span: number, colors: PlotColors): Hit {
  const pad = 32;
  const map = makeMap(width, height, pad, -0.3, 2.4, -1.3, 1.3);
  paintBase(ctx, width, height, colors);
  drawGrid(ctx, map, -0.3, 2.4, -1.3, 1.3, colors);
  drawAxes(ctx, map, -0.3, 2.4, -1.3, 1.3, colors, "x", "y", width, pad);
  ctx.save();
  ctx.beginPath();
  ctx.rect(pad, pad, width - pad * 2, height - pad * 2);
  ctx.clip();
  ctx.beginPath();
  const steps = 48;
  for (let i = 0; i <= steps; i += 1) {
    const x = (span * i) / steps;
    const y = Math.max(0, archY(x));
    if (i === 0) ctx.moveTo(map.x(x), map.y(y));
    else ctx.lineTo(map.x(x), map.y(y));
  }
  for (let i = steps; i >= 0; i -= 1) {
    const x = (span * i) / steps;
    ctx.lineTo(map.x(x), map.y(-Math.max(0, archY(x))));
  }
  ctx.closePath();
  ctx.fillStyle = colors.curve;
  ctx.globalAlpha = 0.2;
  ctx.fill();
  ctx.restore();
  strokeFn(ctx, map, width, height, pad, 0, 2, (x) => Math.max(0, archY(x)), colors.curve);
  strokeFn(ctx, map, width, height, pad, 0, 2, (x) => -Math.max(0, archY(x)), colors.curve);
  const radius = Math.max(0, archY(span));
  const px = map.x(span);
  ctx.save();
  ctx.strokeStyle = colors.alt;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(px, map.y(-radius));
  ctx.lineTo(px, map.y(radius));
  ctx.stroke();
  ctx.restore();
  const py = map.y(radius);
  dot(ctx, px, py, colors.alt, colors.bg, 6);
  halo(ctx, `r = ${fmt(radius)}`, px + 8, map.y(0), colors.ink, colors.bg, "left");
  return { hx: px, hy: py, to: (clientX) => snap(map.toX(clientX), 0.05, 0.2, 2) };
}

function fillCurve(ctx: CanvasRenderingContext2D, map: Map2, a: number, b: number, fn: (x: number) => number, color: string, alpha: number) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(map.x(a), map.y(0));
  const steps = 48;
  for (let i = 0; i <= steps; i += 1) {
    const x = a + ((b - a) * i) / steps;
    ctx.lineTo(map.x(x), map.y(fn(x)));
  }
  ctx.lineTo(map.x(b), map.y(0));
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;
  ctx.fill();
  ctx.restore();
}

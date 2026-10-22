import { useRef, useState, type PointerEvent } from "react";
import { quadRange, quadInit } from "../content/params.ts";
import { fmt, quadText, snap, vertexText } from "../lib/format.ts";
import { fence, opening, quadStudy, rootsText } from "../lib/math.ts";
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

type FenceHit = { hx: number; hy: number; origin: number; scale: number };

export function QuadraticLab() {
  const lang = useLang();
  const calm = useCalm();
  const { values, ref, patch, play, halt, playing } = useLessonState("quadratic", quadInit, quadRange);
  const [mark, setMark] = useState<number | null>(null);
  const hit = useRef<FenceHit | null>(null);
  const dragging = useRef(false);
  const scene = values.scene ?? 0;

  const stop = () => {
    halt();
    writeParams("quadratic", ref.current);
  };

  useClock(playing && scene === 0 && !calm, 8000, true, (u) => setMark(-5 + 10 * u));
  useClock(
    playing && scene === 1 && !calm,
    3200,
    false,
    (u) => patch({ va: snap(-2 + 4 * u, 0.1, -3, 3) }, true),
    stop,
  );
  useClock(
    playing && scene === 2 && !calm,
    4200,
    false,
    (u) => patch({ fence: snap(0.5 + 19 * u, 0.1, 0.5, 19.5) }, true),
    stop,
  );

  const toggle = () => {
    if (calm) return;
    if (playing) {
      stop();
      return;
    }
    play();
    if (scene === 0) setMark(-5);
    if (scene === 1) patch({ va: -2 }, true);
    if (scene === 2) patch({ fence: 0.5 }, true);
  };

  const choose = (next: number) => {
    stop();
    setMark(null);
    patch({ scene: next });
  };

  const study = scene === 1
    ? quadStudy(values.va ?? 1, -2 * (values.va ?? 1) * (values.vh ?? 1), (values.va ?? 1) * (values.vh ?? 1) ** 2 + (values.vk ?? -4))
    : quadStudy(values.a ?? 1, values.b ?? -2, values.c ?? -3);
  const pen = fence(values.fence ?? 10);
  const formula = scene === 1
    ? vertexText(values.va ?? 1, values.vh ?? 1, values.vk ?? -4)
    : scene === 2
      ? `S = x(40 − 2x)`
      : quadText(values.a ?? 1, values.b ?? -2, values.c ?? -3);
  const live = scene === 2
    ? t(lang, `Chuồng x = ${fmt(values.fence ?? 10)} m, diện tích ${fmt(pen.area)} m².`, `Pen x = ${fmt(values.fence ?? 10)} m, area ${fmt(pen.area)} square metres.`)
    : t(
        lang,
        `${formula}. ${study.vertex ? `Đỉnh (${fmt(study.vertex.x)}; ${fmt(study.vertex.y)}).` : "Không có đỉnh."} ${rootsText(study.linear ? 0 : (scene === 1 ? values.va ?? 1 : values.a ?? 1), scene === 1 ? -2 * (values.va ?? 1) * (values.vh ?? 1) : values.b ?? -2, scene === 1 ? (values.va ?? 1) * (values.vh ?? 1) ** 2 + (values.vk ?? -4) : values.c ?? -3, lang)}.`,
        `${formula}. ${study.vertex ? `Vertex (${fmt(study.vertex.x)}, ${fmt(study.vertex.y)}).` : "No vertex."}`,
      );

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const colors = readColors();
    if (scene === 2) {
      hit.current = drawFence(ctx, width, height, values.fence ?? 10, colors);
      return;
    }
    hit.current = null;
    const a = scene === 1 ? values.va ?? 1 : values.a ?? 1;
    const b = scene === 1 ? -2 * a * (values.vh ?? 1) : values.b ?? -2;
    const c = scene === 1 ? a * (values.vh ?? 1) ** 2 + (values.vk ?? -4) : values.c ?? -3;
    drawParabola(ctx, width, height, a, b, c, scene === 0 ? mark : null, colors);
  };

  const pointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const onDown = (event: PointerEvent<HTMLDivElement>) => {
    const g = hit.current;
    if (!g) return;
    const p = pointer(event);
    if ((p.x - g.hx) ** 2 + (p.y - g.hy) ** 2 > 44 ** 2) return;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    stop();
    patch({ fence: meters(p.x, g) });
  };

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !hit.current) return;
    patch({ fence: meters(pointer(event).x, hit.current) });
  };

  const onUp = () => {
    dragging.current = false;
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
          { id: 0, vi: "Tổng quát", en: "General" },
          { id: 1, vi: "Đỉnh", en: "Vertex" },
          { id: 2, vi: "Rào 40 m", en: "40 m fence" },
        ]}
      />
      <div className="graph-wrap" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        <Graph draw={draw} label={live} />
      </div>
      <Live text={live} />
      {scene === 2 ? (
        <dl className="readout">
          <div className="wide"><dt>{t(lang, "Công thức", "Formula")}</dt><dd>S = x(40 − 2x)</dd></div>
          <div><dt>x</dt><dd>{fmt(values.fence ?? 10)} m</dd></div>
          <div><dt>{t(lang, "Song song tường", "Parallel side")}</dt><dd>{fmt(pen.length)} m</dd></div>
          <div><dt>S</dt><dd>{fmt(pen.area)} m²</dd></div>
          <div><dt>S′</dt><dd>{fmt(pen.slope)}{Math.abs(pen.slope) < 0.05 ? t(lang, " · lớn nhất", " · maximum") : ""}</dd></div>
        </dl>
      ) : (
        <dl className="readout">
          <div className="wide"><dt>{t(lang, "Đang vẽ", "Drawing")}</dt><dd>{formula}</dd></div>
          <div><dt>{t(lang, "Đỉnh", "Vertex")}</dt><dd>{study.vertex ? `(${fmt(study.vertex.x)}; ${fmt(study.vertex.y)})` : "—"}</dd></div>
          <div><dt>Δ</dt><dd>{study.linear ? "—" : fmt(study.delta)}</dd></div>
          <div className="wide"><dt>Ox</dt><dd>{rootsText(scene === 1 ? values.va ?? 1 : values.a ?? 1, scene === 1 ? -2 * (values.va ?? 1) * (values.vh ?? 1) : values.b ?? -2, scene === 1 ? (values.va ?? 1) * (values.vh ?? 1) ** 2 + (values.vk ?? -4) : values.c ?? -3, lang)}</dd></div>
          <div className="wide"><dt>{t(lang, "Bề lõm", "Opening")}</dt><dd>{opening(scene === 1 ? values.va ?? 1 : values.a ?? 1, lang)}</dd></div>
        </dl>
      )}
      {scene === 0 ? (
        <>
          <Slider label="a" min={-3} max={3} step={0.1} value={values.a ?? 1} onChange={(a) => { stop(); patch({ a }); }} />
          <Slider label="b" min={-6} max={6} step={0.1} value={values.b ?? -2} onChange={(b) => { stop(); patch({ b }); }} />
          <Slider label="c" min={-6} max={6} step={0.1} value={values.c ?? -3} onChange={(c) => { stop(); patch({ c }); }} />
        </>
      ) : null}
      {scene === 1 ? (
        <>
          <Slider label="a" min={-3} max={3} step={0.1} value={values.va ?? 1} onChange={(va) => { stop(); patch({ va }); }} />
          <Slider label="h" min={-4} max={4} step={0.1} value={values.vh ?? 1} onChange={(vh) => { stop(); patch({ vh }); }} />
          <Slider label="k" min={-6} max={6} step={0.1} value={values.vk ?? -4} onChange={(vk) => { stop(); patch({ vk }); }} />
        </>
      ) : null}
      {scene === 2 ? (
        <Slider label="x" min={0.5} max={19.5} step={0.1} suffix=" m" value={values.fence ?? 10} onChange={(fenceX) => { stop(); patch({ fence: fenceX }); }} />
      ) : null}
      <p className="note">
        <MathText
          text={
            scene === 0
              ? t(lang, "Đỉnh $x=-\\frac{b}{2a}$. Đổi $a$ thì đỉnh chạy.", "Vertex $x=-\\frac{b}{2a}$. Changing $a$ moves it.")
              : scene === 1
                ? t(lang, "$a(x-h)^2+k$: đỉnh đứng yên. Đổi dấu $a$: đổi vai.", "$a(x-h)^2+k$: the vertex stays. Sign of $a$: min or max.")
                : t(lang, "$S=x(40-2x)$. $S'=0$ tại $x=10$, $\\max=200$.", "$S=x(40-2x)$. $S'=0$ at $x=10$, $\\max=200$.")
          }
        />
      </p>
    </div>
  );
}

function meters(px: number, g: FenceHit): number {
  return snap((px - g.origin) / g.scale, 0.1, 0.5, 19.5);
}

function drawParabola(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  a: number,
  b: number,
  c: number,
  mark: number | null,
  colors: PlotColors,
) {
  const pad = 32;
  const x0 = -6;
  const x1 = 6;
  const y0 = -8;
  const y1 = 8;
  const map = makeMap(width, height, pad, x0, x1, y0, y1);
  paintBase(ctx, width, height, colors);
  drawGrid(ctx, map, x0, x1, y0, y1, colors);
  drawAxes(ctx, map, x0, x1, y0, y1, colors, "x", "y", width, pad);
  const f = (x: number) => a * x * x + b * x + c;
  strokeFn(ctx, map, width, height, pad, x0, x1, f, colors.curve);
  if (Math.abs(a) < 1e-9) {
    halo(ctx, "a = 0", width / 2, pad + 28, colors.alt, colors.bg);
    return;
  }
  const vx = -b / (2 * a);
  const vy = f(vx);
  if (vx > x0 && vx < x1) dashed(ctx, map.x(vx), map.y(y0), map.x(vx), map.y(y1), colors.soft);
  const study = quadStudy(a, b, c);
  for (const root of study.roots) {
    if (root < x0 || root > x1) continue;
    dot(ctx, map.x(root), map.y(0), colors.bg, colors.ink, 4);
    halo(ctx, fmt(root), map.x(root), map.y(0) + 14, colors.ink, colors.bg);
  }
  if (vx > x0 && vx < x1 && vy > y0 && vy < y1) {
    const px = map.x(vx);
    const py = map.y(vy);
    dot(ctx, px, py, colors.alt, colors.bg, 5.5);
    halo(ctx, `(${fmt(vx)}; ${fmt(vy)})`, px, a > 0 ? py - 16 : py + 16, colors.alt, colors.bg);
  }
  if (mark !== null && mark > x0 && mark < x1) {
    const py = f(mark);
    if (py > y0 && py < y1) {
      dot(ctx, map.x(mark), map.y(py), colors.ink, colors.bg, 6);
      halo(ctx, "M", map.x(mark) + 12, map.y(py) - 12, colors.ink, colors.bg, "left");
    }
  }
}

function drawFence(ctx: CanvasRenderingContext2D, width: number, height: number, xMeters: number, colors: PlotColors): FenceHit {
  paintBase(ctx, width, height, colors);
  const pad = 28;
  const wall = 14;
  const availW = width - pad * 2 - wall;
  const availH = height - pad * 2;
  const scale = Math.min(availW / 20, availH / 40);
  const depth = xMeters * scale;
  const lengthM = 40 - 2 * xMeters;
  const length = Math.max(0, lengthM) * scale;
  const penX = pad + wall;
  const top = pad + Math.max(0, (availH - length) / 2);
  ctx.fillStyle = colors.axis;
  ctx.fillRect(pad, pad, wall, availH);
  ctx.save();
  ctx.strokeStyle = colors.bg;
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let y = pad - 8; y < pad + availH; y += 8) {
    ctx.moveTo(pad, y);
    ctx.lineTo(pad + wall, y + 10);
  }
  ctx.stroke();
  ctx.restore();
  ctx.save();
  ctx.fillStyle = colors.curve;
  ctx.globalAlpha = 0.16;
  ctx.fillRect(penX, top, Math.max(depth, 1), Math.max(length, 1));
  ctx.restore();
  ctx.strokeStyle = colors.curve;
  ctx.lineWidth = 2;
  ctx.strokeRect(penX + 0.5, top + 0.5, Math.max(depth, 1), Math.max(length, 1));
  const hx = penX + depth;
  const hy = top + Math.max(length, 1) / 2;
  dot(ctx, hx, hy, colors.alt, colors.bg, 7);
  halo(ctx, "tường", pad + wall / 2, pad - 10, colors.soft, colors.bg);
  const xLabelY = top + length + 18 < height - 8 ? top + length + 16 : top - 14;
  halo(ctx, `x = ${fmt(xMeters)}`, penX + Math.max(depth, 8) / 2, xLabelY, colors.ink, colors.bg);
  halo(ctx, `${fmt(lengthM)} m`, Math.min(width - 8, hx + 28), hy, colors.ink, colors.bg, "left");
  if (depth > 48 && length > 28) halo(ctx, `${fmt(xMeters * lengthM)} m²`, penX + depth / 2, top + length / 2, colors.curve, colors.bg);
  return { hx, hy, origin: penX, scale };
}

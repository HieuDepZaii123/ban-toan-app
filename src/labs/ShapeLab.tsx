import { useRef, useState, type PointerEvent } from "react";
import { shapeInit, shapeRange } from "../content/params.ts";
import { fmt, showExact, snap } from "../lib/format.ts";
import { boxBase, boxVolume, pyramidBase, pyramidVolume, tetraVerts, tetraVolume, triArea } from "../lib/math.ts";
import { writeParams } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { Live } from "../ui/Live.tsx";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/Prefs.tsx";
import { Slider } from "../ui/Slider.tsx";
import { useCalm, useClock } from "./clock.ts";
import { dashed, dot, fitIso, halo, makeMap, nearestHandle, paintBase, readColors, type PlotColors } from "./draw.ts";
import { Graph } from "./Graph.tsx";
import { useLessonState } from "./lessonState.ts";
import { SceneBar } from "./SceneBar.tsx";

type Drag = {
  id: string;
  x: number;
  y: number;
  base: number;
  tall: number;
  len: number;
  wid: number;
  ht: number;
  side: number;
  ph: number;
  edge: number;
};

const TETRA_PAIRS: readonly (readonly [number, number])[] = [
  [0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3],
];

export function ShapeLab() {
  const lang = useLang();
  const calm = useCalm();
  const { values, ref, patch, play, halt, isPlaying } = useLessonState("triangle", shapeInit, shapeRange);
  const [on, setOn] = useState(false);
  const hit = useRef<{ handles: { id: string; x: number; y: number }[] } | null>(null);
  const drag = useRef<Drag | null>(null);
  const scene = values.scene ?? 0;
  const base = values.base ?? 6;
  const tall = values.tall ?? 4;
  const len = values.len ?? 3;
  const wid = values.wid ?? 4;
  const ht = values.ht ?? 5;
  const side = values.side ?? 6;
  const ph = values.ph ?? 4;
  const edge = values.edge ?? 6;
  const area = triArea(base, tall);
  const volume = boxVolume(len, wid, ht);
  const baseArea = boxBase(len, wid);
  const pyr = pyramidVolume(side, ph);
  const pyrBase = pyramidBase(side);
  const tet = tetraVolume(edge);
  const verts = tetraVerts(edge);
  const origin = verts[0] ?? ([0, 0, 0] as const);
  const edgeLens = TETRA_PAIRS.map(([i, j]) => dist3(verts[i] ?? origin, verts[j] ?? origin));
  const edgeShown = edgeLens[0] ?? edge;
  const edgesEqual = edgeLens.every((length) => Math.abs(length - edgeShown) < 1e-6);

  const stop = () => {
    halt();
    setOn(false);
    writeParams("triangle", ref.current);
  };

  useClock(on && scene === 0 && !calm, 2200, false, (u) => patch({ tall: snap(2 + 2 * u, 0.5, 1, 12) }, true), stop);
  useClock(on && scene === 1 && !calm, 2200, false, (u) => patch({ ht: snap(2 + 3 * u, 0.5, 1, 8) }, true), stop);
  useClock(on && scene === 2 && !calm, 2200, false, (u) => patch({ ph: snap(3 + u, 0.5, 1, 10) }, true), stop);
  useClock(on && scene === 3 && !calm, 2200, false, (u) => patch({ edge: snap(4 + 2 * u, 0.5, 2, 10) }, true), stop);

  const toggle = () => {
    if (calm) return;
    if (isPlaying()) {
      stop();
      return;
    }
    play();
    setOn(true);
    if (scene === 0) patch({ tall: 2 }, true);
    if (scene === 1) patch({ ht: 2 }, true);
    if (scene === 2) patch({ ph: 3 }, true);
    if (scene === 3) patch({ edge: 4 }, true);
  };

  const choose = (next: number) => {
    stop();
    patch({ scene: next });
  };

  const live = scene === 0
    ? t(lang, `Diện tích ${fmt(area)}. Đáy ${fmt(base)}, cao ${fmt(tall)}.`, `Area ${fmt(area)}. Base ${fmt(base)}, height ${fmt(tall)}.`)
    : scene === 1
      ? t(lang, `Thể tích ${fmt(volume)}. Đáy ${fmt(baseArea)}. Cạnh ${fmt(len)}, ${fmt(wid)}, ${fmt(ht)}.`, `Volume ${fmt(volume)}. Base ${fmt(baseArea)}. Edges ${fmt(len)}, ${fmt(wid)}, ${fmt(ht)}.`)
      : scene === 2
        ? t(lang, `Thể tích ${fmt(pyr)}. Đáy ${fmt(pyrBase)}, cao ${fmt(ph)}.`, `Volume ${fmt(pyr)}. Base ${fmt(pyrBase)}, height ${fmt(ph)}.`)
        : t(
            lang,
            edgesEqual
              ? `Sáu cạnh bằng ${fmt(edgeShown)}. Thể tích ${showExact(tet)}.`
              : "Các cạnh chưa bằng nhau.",
            edgesEqual
              ? `All six edges equal ${fmt(edgeShown)}. Volume ${showExact(tet)}.`
              : "The edges are not equal.",
          );

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const colors = readColors();
    if (scene === 0) hit.current = drawTriangle(ctx, width, height, base, tall, area, colors);
    else if (scene === 1) hit.current = drawBox(ctx, width, height, len, wid, ht, volume, baseArea, colors);
    else if (scene === 2) hit.current = drawPyramid(ctx, width, height, side, ph, pyr, pyrBase, colors);
    else hit.current = drawTetra(ctx, width, height, verts, edgeLens, tet, edgesEqual, colors);
  };

  const pointOf = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const onDown = (event: PointerEvent<HTMLDivElement>) => {
    const g = hit.current;
    if (!g) return;
    const at = pointOf(event);
    const id = nearestHandle(g.handles, at.x, at.y, 32);
    if (!id) return;
    drag.current = { id, x: at.x, y: at.y, base, tall, len, wid, ht, side, ph, edge };
    event.currentTarget.setPointerCapture(event.pointerId);
    stop();
  };

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current) return;
    const at = pointOf(event);
    const dx = at.x - current.x;
    const dy = at.y - current.y;
    if (current.id === "tall") patch({ tall: snap(current.tall - dy / 18, 0.5, 1, 12) });
    if (current.id === "base") patch({ base: snap(current.base + dx / 18, 0.5, 1, 12) });
    if (current.id === "len") patch({ len: snap(current.len + dx / 22, 0.5, 1, 8) });
    if (current.id === "wid") patch({ wid: snap(current.wid + dx / 22, 0.5, 1, 8) });
    if (current.id === "ht") patch({ ht: snap(current.ht - dy / 18, 0.5, 1, 8) });
    if (current.id === "side") patch({ side: snap(current.side + dx / 16, 0.5, 2, 10) });
    if (current.id === "ph") patch({ ph: snap(current.ph - dy / 16, 0.5, 1, 10) });
    if (current.id === "edge") patch({ edge: snap(current.edge + dx / 18, 0.5, 2, 10) });
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
          { id: 0, vi: "Tam giác", en: "Triangle" },
          { id: 1, vi: "Hộp", en: "Box" },
          { id: 2, vi: "Chóp", en: "Pyramid" },
          { id: 3, vi: "Tứ diện", en: "Tetrahedron" },
        ]}
      />
      <div
        className="graph-wrap"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        <Graph draw={draw} label={live} />
      </div>
      <Live text={live} />
      {scene === 0 ? (
        <dl className="readout">
          <div><dt>{t(lang, "Diện tích", "Area")}</dt><dd>{fmt(area)}</dd></div>
          <div><dt>{t(lang, "Đáy", "Base")}</dt><dd>{fmt(base)}</dd></div>
          <div><dt>{t(lang, "Cao", "Height")}</dt><dd>{fmt(tall)}</dd></div>
        </dl>
      ) : null}
      {scene === 1 ? (
        <dl className="readout">
          <div><dt>{t(lang, "Thể tích", "Volume")}</dt><dd>{fmt(volume)}</dd></div>
          <div><dt>{t(lang, "Đáy", "Base")}</dt><dd>{fmt(baseArea)}</dd></div>
          <div className="wide"><dt>{t(lang, "Ba cạnh", "Three edges")}</dt><dd>{fmt(len)} × {fmt(wid)} × {fmt(ht)}</dd></div>
        </dl>
      ) : null}
      {scene === 2 ? (
        <dl className="readout">
          <div><dt>{t(lang, "Thể tích", "Volume")}</dt><dd>{fmt(pyr)}</dd></div>
          <div><dt>{t(lang, "Đáy", "Base")}</dt><dd>{fmt(pyrBase)}</dd></div>
          <div><dt>{t(lang, "Cao", "Height")}</dt><dd>{fmt(ph)}</dd></div>
        </dl>
      ) : null}
      {scene === 3 ? (
        <dl className="readout">
          <div><dt>{t(lang, "Thể tích", "Volume")}</dt><dd>{showExact(tet)}</dd></div>
          <div><dt>{t(lang, "Cạnh", "Edge")}</dt><dd>{edgesEqual ? fmt(edgeShown) : t(lang, "lệch", "unequal")}</dd></div>
        </dl>
      ) : null}
      {scene === 0 ? (
        <>
          <Slider label={t(lang, "Đáy", "Base")} min={1} max={12} step={0.5} value={base} onChange={(next) => { stop(); patch({ base: next }); }} />
          <Slider label={t(lang, "Chiều cao", "Height")} min={1} max={12} step={0.5} value={tall} onChange={(next) => { stop(); patch({ tall: next }); }} />
        </>
      ) : null}
      {scene === 1 ? (
        <>
          <Slider label={t(lang, "Cạnh dài", "Length")} min={1} max={8} step={0.5} value={len} onChange={(next) => { stop(); patch({ len: next }); }} />
          <Slider label={t(lang, "Cạnh ngang", "Width")} min={1} max={8} step={0.5} value={wid} onChange={(next) => { stop(); patch({ wid: next }); }} />
          <Slider label={t(lang, "Chiều cao", "Height")} min={1} max={8} step={0.5} value={ht} onChange={(next) => { stop(); patch({ ht: next }); }} />
        </>
      ) : null}
      {scene === 2 ? (
        <>
          <Slider label={t(lang, "Cạnh đáy", "Base edge")} min={2} max={10} step={0.5} value={side} onChange={(next) => { stop(); patch({ side: next }); }} />
          <Slider label={t(lang, "Chiều cao", "Height")} min={1} max={10} step={0.5} value={ph} onChange={(next) => { stop(); patch({ ph: next }); }} />
        </>
      ) : null}
      {scene === 3 ? (
        <Slider label={t(lang, "Cạnh a", "Edge a")} min={2} max={10} step={0.5} value={edge} onChange={(next) => { stop(); patch({ edge: next }); }} />
      ) : null}
      <p className="note">
        <MathText
          text={
            scene === 0
              ? t(lang, "$\\frac{6\\cdot4}{2}=12\\neq24$. Vuông $\\frac{3\\cdot4}{2}=6\\neq5$. $k=2\\Rightarrow k^2=4$.", "$\\frac{6\\cdot4}{2}=12\\neq24$. Right $\\frac{3\\cdot4}{2}=6\\neq5$. $k=2\\Rightarrow k^2=4$.")
              : scene === 1
                ? t(lang, "$3\\cdot4\\cdot5=60\\neq12$.", "$3\\cdot4\\cdot5=60\\neq12$.")
                : scene === 2
                  ? t(lang, "$\\frac13\\cdot6^2\\cdot4=48\\neq36$.", "$\\frac13\\cdot6^2\\cdot4=48\\neq36$.")
                  : t(lang, "$V=\\frac{a^3\\sqrt{2}}{12}$. $a=6\\Rightarrow18\\sqrt{2}\\neq9\\sqrt{3}$. Sáu cạnh $=a$.", "$V=\\frac{a^3\\sqrt{2}}{12}$. $a=6\\Rightarrow18\\sqrt{2}\\neq9\\sqrt{3}$. Six edges $=a$.")
          }
        />
      </p>
    </div>
  );
}

function stamp(ctx: CanvasRenderingContext2D, title: string, sub: string, colors: PlotColors) {
  ctx.save();
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.font = "600 22px 'Be Vietnam Pro', sans-serif";
  ctx.fillStyle = colors.ink;
  ctx.fillText(title, 12, 10);
  ctx.font = "13px 'Be Vietnam Pro', sans-serif";
  ctx.fillStyle = colors.soft;
  ctx.fillText(sub, 12, 36);
  ctx.restore();
}

function drawTriangle(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  base: number,
  tall: number,
  area: number,
  colors: PlotColors,
): { handles: { id: string; x: number; y: number }[] } {
  paintBase(ctx, width, height, colors);
  const map = makeMap(width, height, 36, -0.8, base + 1.2, -1.2, tall + 1.4);
  ctx.beginPath();
  ctx.moveTo(map.x(0), map.y(0));
  ctx.lineTo(map.x(base), map.y(0));
  ctx.lineTo(map.x(base / 2), map.y(tall));
  ctx.closePath();
  ctx.fillStyle = colors.curve;
  ctx.globalAlpha = 0.16;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = colors.curve;
  ctx.lineWidth = 2;
  ctx.stroke();
  dashed(ctx, map.x(base / 2), map.y(tall), map.x(base / 2), map.y(0), colors.alt);
  halo(ctx, fmt(base), map.x(base / 2), map.y(0) + 16, colors.ink, colors.bg);
  halo(ctx, fmt(tall), map.x(base / 2) + 14, map.y(tall / 2), colors.alt, colors.bg, "left");
  const apex = { id: "tall", x: map.x(base / 2), y: map.y(tall) };
  const right = { id: "base", x: map.x(base), y: map.y(0) };
  dot(ctx, apex.x, apex.y, colors.alt, colors.bg);
  dot(ctx, right.x, right.y, colors.curve, colors.bg);
  stamp(ctx, `S = ${fmt(area)}`, `đáy ${fmt(base)}, cao ${fmt(tall)}`, colors);
  return { handles: [apex, right] };
}

function drawBox(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  len: number,
  wid: number,
  ht: number,
  volume: number,
  baseArea: number,
  colors: PlotColors,
): { handles: { id: string; x: number; y: number }[] } {
  paintBase(ctx, width, height, colors);
  const corners: (readonly [number, number, number])[] = [
    [0, 0, 0], [len, 0, 0], [len, wid, 0], [0, wid, 0],
    [0, 0, ht], [len, 0, ht], [len, wid, ht], [0, wid, ht],
  ];
  const at = fitIso(corners, width, height, 46);
  const edges: readonly (readonly [number, number])[] = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];
  ctx.strokeStyle = colors.curve;
  ctx.lineWidth = 2;
  for (const [i, j] of edges) {
    const from = corners[i];
    const to = corners[j];
    if (!from || !to) continue;
    const a = at(...from);
    const b = at(...to);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  const mid = (p: readonly [number, number, number], q: readonly [number, number, number]) => at((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, (p[2] + q[2]) / 2);
  const lengthAt = mid([0, 0, 0], [len, 0, 0]);
  const widthAt = mid([0, 0, 0], [0, wid, 0]);
  const heightAt = mid([0, 0, 0], [0, 0, ht]);
  halo(ctx, fmt(len), lengthAt.x, lengthAt.y + 12, colors.ink, colors.bg);
  halo(ctx, fmt(wid), widthAt.x - 8, widthAt.y + 12, colors.ink, colors.bg);
  halo(ctx, fmt(ht), heightAt.x - 16, heightAt.y, colors.alt, colors.bg);
  const lenTip = at(len, 0, 0);
  const widTip = at(0, wid, 0);
  const htTip = at(0, 0, ht);
  dot(ctx, lenTip.x, lenTip.y, colors.curve, colors.bg);
  dot(ctx, widTip.x, widTip.y, colors.curve, colors.bg);
  dot(ctx, htTip.x, htTip.y, colors.alt, colors.bg);
  stamp(ctx, `V = ${fmt(volume)}`, `đáy ${fmt(baseArea)}`, colors);
  return {
    handles: [
      { id: "len", x: lenTip.x, y: lenTip.y },
      { id: "wid", x: widTip.x, y: widTip.y },
      { id: "ht", x: htTip.x, y: htTip.y },
    ],
  };
}

function drawPyramid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  side: number,
  ph: number,
  volume: number,
  baseArea: number,
  colors: PlotColors,
): { handles: { id: string; x: number; y: number }[] } {
  paintBase(ctx, width, height, colors);
  const apex: readonly [number, number, number] = [side / 2, side / 2, ph];
  const corners: (readonly [number, number, number])[] = [
    [0, 0, 0], [side, 0, 0], [side, side, 0], [0, side, 0], apex,
  ];
  const at = fitIso(corners, width, height, 48);
  ctx.beginPath();
  const floor = [0, 1, 2, 3, 0];
  floor.forEach((index, order) => {
    const corner = corners[index];
    if (!corner) return;
    const point = at(...corner);
    if (order === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.closePath();
  ctx.fillStyle = colors.curve;
  ctx.globalAlpha = 0.16;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = colors.curve;
  ctx.lineWidth = 2;
  ctx.stroke();
  const top = at(...apex);
  for (let index = 0; index < 4; index += 1) {
    const corner = corners[index];
    if (!corner) continue;
    const point = at(...corner);
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.lineTo(top.x, top.y);
    ctx.stroke();
  }
  const foot = at(side / 2, side / 2, 0);
  dashed(ctx, foot.x, foot.y, top.x, top.y, colors.alt);
  halo(ctx, fmt(ph), (foot.x + top.x) / 2 + 10, (foot.y + top.y) / 2, colors.alt, colors.bg, "left");
  const baseMid = at(side / 2, 0, 0);
  halo(ctx, fmt(side), baseMid.x, baseMid.y + 14, colors.ink, colors.bg);
  const sideTip = at(side, 0, 0);
  dot(ctx, top.x, top.y, colors.alt, colors.bg);
  dot(ctx, sideTip.x, sideTip.y, colors.curve, colors.bg);
  stamp(ctx, `V = ${fmt(volume)}`, `đáy ${fmt(baseArea)}`, colors);
  return {
    handles: [
      { id: "ph", x: top.x, y: top.y },
      { id: "side", x: sideTip.x, y: sideTip.y },
    ],
  };
}

function drawTetra(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  verts: readonly (readonly [number, number, number])[],
  lengths: readonly number[],
  volume: number,
  equal: boolean,
  colors: PlotColors,
): { handles: { id: string; x: number; y: number }[] } {
  paintBase(ctx, width, height, colors);
  const at = fitIso(verts, width, height, 48);
  ctx.strokeStyle = colors.curve;
  ctx.lineWidth = 2;
  TETRA_PAIRS.forEach(([i, j]) => {
    const from = verts[i];
    const to = verts[j];
    if (!from || !to) return;
    const a = at(...from);
    const b = at(...to);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  });
  const labelPair = (index: number) => {
    const pair = TETRA_PAIRS[index];
    const from = pair ? verts[pair[0]] : undefined;
    const to = pair ? verts[pair[1]] : undefined;
    if (!from || !to) return;
    const a = at(...from);
    const b = at(...to);
    const shown = lengths[index] ?? 0;
    halo(ctx, equal ? fmt(shown) : "lệch", (a.x + b.x) / 2, (a.y + b.y) / 2 - 10, colors.ink, colors.bg);
  };
  labelPair(0);
  labelPair(2);
  labelPair(5);
  const tip = verts[1] ? at(...verts[1]) : { x: width / 2, y: height / 2 };
  dot(ctx, tip.x, tip.y, colors.alt, colors.bg);
  stamp(ctx, `V = ${showExact(volume)}`, equal ? `cạnh ${fmt(lengths[0] ?? 0)}` : "cạnh lệch", colors);
  return { handles: [{ id: "edge", x: tip.x, y: tip.y }] };
}

function dist3(a: readonly [number, number, number], b: readonly [number, number, number]): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

import { useRef, useState, type PointerEvent } from "react";
import { comboInit, comboRange } from "../content/params.ts";
import { fmt, snap } from "../lib/format.ts";
import { arrange, comb, meanOf, medianOf } from "../lib/math.ts";
import { writeParams } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { Live } from "../ui/Live.tsx";
import { useLang } from "../ui/Prefs.tsx";
import { Slider } from "../ui/Slider.tsx";
import { useCalm, useClock } from "./clock.ts";
import { dot, drawAxes, drawGrid, halo, makeMap, nearestHandle, paintBase, readColors, type PlotColors } from "./draw.ts";
import { Graph } from "./Graph.tsx";
import { useLessonState } from "./lessonState.ts";
import { SceneBar } from "./SceneBar.tsx";

const ORDERS = [
  [0, 1, 2],
  [0, 2, 1],
  [1, 0, 2],
  [1, 2, 0],
  [2, 0, 1],
  [2, 1, 0],
] as const;

const NAMES = ["A", "B", "C"] as const;

type Hit = { handles: { id: string; x: number; y: number }[]; toValue: (px: number, py: number) => number } | null;

export function ComboLab() {
  const lang = useLang();
  const calm = useCalm();
  const { values, ref, playing, patch } = useLessonState("combo", comboInit, comboRange);
  const [on, setOn] = useState(false);
  const hit = useRef<Hit>(null);
  const drag = useRef(false);
  const scene = values.scene ?? 0;
  const n = Math.round(values.n ?? 5);
  const k = Math.min(Math.round(values.k ?? 2), n);
  const seat = Math.round(values.seat ?? 0);
  const outlier = values.outlier ?? 6;
  const scores = [2, 3, 4, 5, outlier];
  const mean = meanOf(scores);
  const median = medianOf(scores);
  const waysA = arrange(n, k);
  const waysC = comb(n, k);

  const stop = () => {
    playing.current = false;
    setOn(false);
    writeParams("combo", ref.current);
  };

  useClock(on && scene === 0 && !calm, 2200, false, (u) => patch({ k: snap(Math.round(1 + u), 1, 0, ref.current.n ?? 5) }, true), stop);
  useClock(on && scene === 1 && !calm, 3200, false, (u) => patch({ seat: snap(Math.round(u * 5), 1, 0, 5) }, true), stop);
  useClock(on && scene === 2 && !calm, 2600, false, (u) => patch({ outlier: snap(6 + 14 * u, 1, 0, 20) }, true), stop);

  const toggle = () => {
    if (calm) return;
    if (playing.current) {
      stop();
      return;
    }
    playing.current = true;
    setOn(true);
    if (scene === 0) patch({ k: 1 }, true);
    if (scene === 1) patch({ seat: 0 }, true);
    if (scene === 2) patch({ outlier: 6 }, true);
  };

  const choose = (next: number) => {
    stop();
    patch({ scene: next });
  };

  const live = scene === 0
    ? t(lang, `A(${fmt(n)}, ${fmt(k)}) = ${fmt(waysA)}. C(${fmt(n)}, ${fmt(k)}) = ${fmt(waysC)}.`, `A(${fmt(n)}, ${fmt(k)}) = ${fmt(waysA)}. C(${fmt(n)}, ${fmt(k)}) = ${fmt(waysC)}.`)
    : scene === 1
      ? t(lang, `Ba ghế khác nhau: 6 cách. Đang xem cách ${fmt(seat + 1)}.`, `Three distinct chairs: 6 ways. Showing way ${fmt(seat + 1)}.`)
      : t(lang, `Trung vị ${fmt(median)}. Trung bình ${fmt(mean)}.`, `Median ${fmt(median)}. Mean ${fmt(mean)}.`);

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const colors = readColors();
    if (scene === 0) hit.current = drawWays(ctx, width, height, n, k, waysA, waysC, colors);
    else if (scene === 1) hit.current = drawSeats(ctx, width, height, seat, colors);
    else hit.current = drawScores(ctx, width, height, scores, mean, median, colors);
  };

  const pointOf = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const apply = (pxy: { x: number; y: number }) => {
    const g = hit.current;
    if (!g) return;
    const next = g.toValue(pxy.x, pxy.y);
    if (scene === 0) patch({ k: Math.min(n, next) });
    if (scene === 1) patch({ seat: next });
    if (scene === 2) patch({ outlier: next });
  };

  const onDown = (event: PointerEvent<HTMLDivElement>) => {
    const g = hit.current;
    if (!g) return;
    const at = pointOf(event);
    if (!nearestHandle(g.handles, at.x, at.y, scene === 2 ? 48 : 1000)) return;
    drag.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    stop();
    apply(at);
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
          { id: 0, vi: "A và C", en: "A and C" },
          { id: 1, vi: "Ba ghế", en: "Three chairs" },
          { id: 2, vi: "Điểm số", en: "Scores" },
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
          <div><dt>A</dt><dd>{fmt(waysA)}</dd></div>
          <div><dt>C</dt><dd>{fmt(waysC)}</dd></div>
          <div><dt>n</dt><dd>{fmt(n)}</dd></div>
          <div><dt>k</dt><dd>{fmt(k)}</dd></div>
        </dl>
      ) : null}
      {scene === 1 ? (
        <dl className="readout">
          <div><dt>3!</dt><dd>6</dd></div>
          <div><dt>{t(lang, "Cách", "Way")}</dt><dd>{fmt(seat + 1)} / 6</dd></div>
        </dl>
      ) : null}
      {scene === 2 ? (
        <dl className="readout">
          <div><dt>{t(lang, "Trung vị", "Median")}</dt><dd>{fmt(median)}</dd></div>
          <div><dt>{t(lang, "Trung bình", "Mean")}</dt><dd>{fmt(mean)}</dd></div>
        </dl>
      ) : null}
      {scene === 0 ? (
        <>
          <Slider label="n" min={2} max={8} step={1} value={n} onChange={(next) => { stop(); patch({ n: next, k: Math.min(k, next) }); }} />
          <Slider label="k" min={0} max={n} step={1} value={k} onChange={(next) => { stop(); patch({ k: next }); }} />
        </>
      ) : null}
      {scene === 2 ? (
        <Slider label={t(lang, "Điểm lệch", "Outlier")} min={0} max={20} step={1} value={outlier} onChange={(next) => { stop(); patch({ outlier: next }); }} />
      ) : null}
      <p className="note">
        {scene === 0
          ? t(lang, "Kéo để đổi k. A(5, 2) = 20 vì thứ tự có tính. C(5, 2) = 10 vì không kể thứ tự. Chọn ban 3 người trong 8 người, không phân vai, là C(8, 3) = 56, không phải A(8, 3) = 336.", "Drag to change k. A(5, 2) = 20 because order counts. C(5, 2) = 10 because order does not. A committee of 3 from 8, with no roles, is C(8, 3) = 56, not A(8, 3) = 336.")
          : null}
        {scene === 1
          ? t(lang, "Chạm để xem cách xếp tiếp theo. Ba người vào ba ghế khác nhau có 3! = 6 cách.", "Tap to see the next seating. Three people in three distinct chairs can sit in 3! = 6 ways.")
          : null}
        {scene === 2
          ? t(lang, "Kéo cột cuối. Các điểm 2, 3, 4, 5, 6 có trung bình 4 và trung vị 4. Đổi 6 thành 20 thì trung bình thành 6,8, trung vị vẫn là 4.", "Drag the last bar. The scores 2, 3, 4, 5, 6 have mean 4 and median 4. Changing 6 to 20 makes the mean 6.8, while the median stays 4.")
          : null}
      </p>
    </div>
  );
}

function drawWays(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  n: number,
  k: number,
  waysA: number,
  waysC: number,
  colors: PlotColors,
): Hit {
  paintBase(ctx, width, height, colors);
  const left = 28;
  const top = 48;
  const gap = Math.min(36, (width - 56) / Math.max(1, n));
  for (let i = 0; i < n; i += 1) {
    const chosen = i < k;
    ctx.beginPath();
    ctx.fillStyle = chosen ? colors.curve : colors.bg;
    ctx.strokeStyle = colors.curve;
    ctx.lineWidth = 2;
    ctx.arc(left + i * gap, top + 28, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (chosen) {
      ctx.fillStyle = colors.bg;
      ctx.font = "12px 'Be Vietnam Pro', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(String(i + 1), left + i * gap, top + 28);
    }
  }
  halo(ctx, `A = ${fmt(waysA)}`, width * 0.28, height * 0.62, colors.ink, colors.bg);
  halo(ctx, `C = ${fmt(waysC)}`, width * 0.72, height * 0.62, colors.alt, colors.bg);
  const slot = (width - 56) / Math.max(1, n);
  return {
    handles: [{ id: "k", x: left + Math.max(0, k - 1) * gap, y: top + 28 }],
    toValue: (px) => snap((px - left) / slot + 0.5, 1, 0, n),
  };
}

function drawSeats(ctx: CanvasRenderingContext2D, width: number, height: number, seat: number, colors: PlotColors): Hit {
  paintBase(ctx, width, height, colors);
  const order = ORDERS[Math.min(5, Math.max(0, seat))] ?? ORDERS[0];
  const gap = Math.min(92, (width - 40) / 3);
  const left = (width - gap * 3) / 2 + gap / 2;
  const base = height * 0.62;
  order.forEach((person, index) => {
    const x = left + index * gap;
    ctx.fillStyle = colors.curve;
    ctx.globalAlpha = 0.16;
    ctx.fillRect(x - 28, base, 56, 28);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = colors.curve;
    ctx.strokeRect(x - 28, base, 56, 28);
    ctx.fillStyle = colors.ink;
    ctx.font = "600 22px 'Be Vietnam Pro', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(NAMES[person] ?? "", x, base - 16);
  });
  halo(ctx, "3! = 6", width / 2, 22, colors.ink, colors.bg);
  return {
    handles: [{ id: "seat", x: width / 2, y: base }],
    toValue: (px) => snap(px / Math.max(1, width) * 5, 1, 0, 5),
  };
}

function drawScores(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  scores: number[],
  mean: number,
  median: number,
  colors: PlotColors,
): Hit {
  paintBase(ctx, width, height, colors);
  const map = makeMap(width, height, 36, -0.6, 4.8, -1, 22);
  drawGrid(ctx, map, -0.6, 4.8, -1, 22, colors);
  drawAxes(ctx, map, -0.6, 4.8, -1, 22, colors, "", "", width, 36);
  const slot = map.x(1) - map.x(0);
  scores.forEach((score, index) => {
    const x = map.x(index) - slot * 0.28;
    const y = map.y(score);
    ctx.fillStyle = index === scores.length - 1 ? colors.alt : colors.curve;
    ctx.globalAlpha = 0.85;
    ctx.fillRect(x, y, slot * 0.56, map.y(0) - y);
    ctx.globalAlpha = 1;
  });
  ctx.strokeStyle = colors.ink;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(map.x(-0.4), map.y(mean));
  ctx.lineTo(map.x(4.6), map.y(mean));
  ctx.stroke();
  dot(ctx, map.x(2), map.y(median), colors.alt, colors.bg, 5);
  halo(ctx, `TB ${fmt(mean)}`, map.x(4.5), map.y(mean) - 12, colors.ink, colors.bg, "right");
  halo(ctx, `TV ${fmt(median)}`, map.x(-0.2), map.y(median), colors.alt, colors.bg, "left");
  const last = scores.length - 1;
  return {
    handles: [{ id: "out", x: map.x(last), y: map.y(scores[last] ?? 0) }],
    toValue: (_px, py) => snap(map.toY(py), 1, 0, 20),
  };
}

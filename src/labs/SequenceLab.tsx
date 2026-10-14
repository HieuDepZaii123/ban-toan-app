import { useRef, useState, type PointerEvent } from "react";
import { seqInit, seqRange } from "../content/params.ts";
import { fmt, snap } from "../lib/format.ts";
import { arithSum, arithTerm, bouncePath, geomInfinite, geomPartial, geomTerm, savingsSum } from "../lib/math.ts";
import { writeParams } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { Live } from "../ui/Live.tsx";
import { useLang } from "../ui/Prefs.tsx";
import { Slider } from "../ui/Slider.tsx";
import { useCalm, useClock } from "./clock.ts";
import { dot, drawAxes, halo, makeMap, paintBase, readColors, type Map2, type PlotColors } from "./draw.ts";
import { Graph } from "./Graph.tsx";
import { useLessonState } from "./lessonState.ts";
import { SceneBar } from "./SceneBar.tsx";

type Hit = { hx: number; hy: number; hx2: number; hy2: number; to: (px: number, py: number) => number; to2: (px: number, py: number) => number };

const NONE: Hit = { hx: -999, hy: -999, hx2: -999, hy2: -999, to: () => 0, to2: () => 0 };

export function SequenceLab() {
  const lang = useLang();
  const calm = useCalm();
  const { values, ref, playing, patch } = useLessonState("sequence", seqInit, seqRange);
  const [on, setOn] = useState(false);
  const hit = useRef<Hit>(NONE);
  const which = useRef<1 | 2>(1);
  const dragging = useRef(false);
  const scene = values.scene ?? 0;
  const u1 = values.u1 ?? 3;
  const d = values.d ?? 4;
  const n = values.n ?? 10;
  const g1 = values.g1 ?? 8;
  const q = values.q ?? 0.5;
  const gn = values.gn ?? 6;
  const drop = values.drop ?? 8;
  const ratio = values.ratio ?? 0.5;
  const months = values.months ?? 12;
  const last = arithTerm(u1, d, n);
  const total = arithSum(u1, d, n);
  const gLast = geomTerm(g1, q, gn);
  const gSum = geomPartial(g1, q, gn);
  const infinite = geomInfinite(g1, q);
  const path = bouncePath(drop, ratio);
  const saved = savingsSum(months);

  const stop = () => {
    playing.current = false;
    setOn(false);
    writeParams("sequence", ref.current);
  };

  useClock(on && scene === 0 && !calm, 2800, false, (u) => patch({ n: snap(1 + 9 * u, 1, 1, 12) }, true), stop);
  useClock(on && scene === 1 && !calm, 2800, false, (u) => patch({ gn: snap(1 + 7 * u, 1, 1, 8) }, true), stop);
  useClock(on && scene === 2 && !calm, 3000, false, (u) => patch({ months: snap(1 + 11 * u, 1, 1, 12) }, true), stop);

  const toggle = () => {
    if (calm) return;
    if (playing.current) {
      stop();
      return;
    }
    playing.current = true;
    setOn(true);
    if (scene === 0) patch({ n: 1 }, true);
    if (scene === 1) patch({ gn: 1 }, true);
    if (scene === 2) patch({ months: 1 }, true);
  };

  const choose = (next: number) => {
    stop();
    patch({ scene: next });
  };

  const live = scene === 0
    ? t(
        lang,
        `u₁ = ${fmt(u1)}, d = ${fmt(d)}. Số hạng thứ ${fmt(n)} là ${fmt(last)}, không phải ${fmt(u1 + n * d)}. Tổng ${fmt(total)}.`,
        `u₁ = ${fmt(u1)}, d = ${fmt(d)}. Term ${fmt(n)} is ${fmt(last)}, not ${fmt(u1 + n * d)}. Sum ${fmt(total)}.`,
      )
    : scene === 1
      ? t(
          lang,
          `u₁ = ${fmt(g1)}, q = ${fmt(q)}. Số hạng thứ ${fmt(gn)} là ${fmt(gLast)}. ${infinite === null ? "Tổng vô hạn không có, vì |q| ≥ 1." : `Tổng vô hạn ${fmt(infinite)}. Số hạng tiến về 0, không số hạng nào bằng 0.`}`,
          `u₁ = ${fmt(g1)}, q = ${fmt(q)}. Term ${fmt(gn)} is ${fmt(gLast)}. ${infinite === null ? "No infinite sum, because |q| ≥ 1." : `Infinite sum ${fmt(infinite)}. Terms tend to 0; no term is 0.`}`,
        )
      : t(
          lang,
          `Bóng rơi ${fmt(drop)} m, tỉ số ${fmt(ratio)}: quãng đường ${fmt(path ?? 0)} m. Gửi 1 + … + ${fmt(months)} triệu thì được ${fmt(saved)} triệu.`,
          `Drop ${fmt(drop)} m, ratio ${fmt(ratio)}: path ${fmt(path ?? 0)} m. Deposits 1 + … + ${fmt(months)} triệu total ${fmt(saved)} triệu.`,
        );

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const colors = readColors();
    if (scene === 0) hit.current = drawArith(ctx, width, height, u1, d, n, colors);
    else if (scene === 1) hit.current = drawGeom(ctx, width, height, g1, q, gn, colors);
    else hit.current = drawSave(ctx, width, height, drop, ratio, months, colors);
  };

  const point = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const onDown = (event: PointerEvent<HTMLDivElement>) => {
    const g = hit.current;
    const p = point(event);
    const d1 = (p.x - g.hx) ** 2 + (p.y - g.hy) ** 2;
    const d2 = (p.x - g.hx2) ** 2 + (p.y - g.hy2) ** 2;
    if (d1 > 48 ** 2 && d2 > 48 ** 2) return;
    which.current = d2 < d1 ? 2 : 1;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    stop();
    apply(p.x, p.y);
  };

  const apply = (px: number, py: number) => {
    const g = hit.current;
    const next = which.current === 2 ? g.to2(px, py) : g.to(px, py);
    if (scene === 0) patch({ n: next });
    else if (scene === 1) patch({ gn: next });
    else if (which.current === 2) patch({ months: next });
    else patch({ drop: next });
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
          { id: 0, vi: "Cộng", en: "Arithmetic" },
          { id: 1, vi: "Nhân", en: "Geometric" },
          { id: 2, vi: "Tiết kiệm", en: "Savings" },
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
          <div><dt>uₙ</dt><dd>{fmt(last)}</dd></div>
          <div><dt>Sₙ</dt><dd>{fmt(total)}</dd></div>
          <div><dt>{t(lang, "Đếm thừa", "One step over")}</dt><dd>{fmt(u1 + n * d)}</dd></div>
          <div><dt>n</dt><dd>{fmt(n)}</dd></div>
        </dl>
      ) : null}
      {scene === 1 ? (
        <dl className="readout">
          <div><dt>uₙ</dt><dd>{fmt(gLast)}</dd></div>
          <div><dt>Sₙ</dt><dd>{fmt(gSum)}</dd></div>
          <div className="wide"><dt>{t(lang, "Tổng vô hạn", "Infinite sum")}</dt><dd>{infinite === null ? t(lang, "Không có", "None") : fmt(infinite)}</dd></div>
        </dl>
      ) : null}
      {scene === 2 ? (
        <dl className="readout">
          <div><dt>{t(lang, "Quãng đường", "Path")}</dt><dd>{fmt(path ?? 0)} m</dd></div>
          <div><dt>{t(lang, "Đã gửi", "Deposited")}</dt><dd>{fmt(saved)} {t(lang, "triệu", "triệu")}</dd></div>
        </dl>
      ) : null}
      {scene === 0 ? (
        <>
          <Slider label="u₁" min={-4} max={8} step={1} value={u1} onChange={(next) => { stop(); patch({ u1: next }); }} />
          <Slider label="d" min={-5} max={6} step={1} value={d} onChange={(next) => { stop(); patch({ d: next }); }} />
          <Slider label="n" min={1} max={12} step={1} value={n} onChange={(next) => { stop(); patch({ n: next }); }} />
        </>
      ) : null}
      {scene === 1 ? (
        <>
          <Slider label="u₁" min={1} max={8} step={1} value={g1} onChange={(next) => { stop(); patch({ g1: next }); }} />
          <Slider label="q" min={-1.5} max={3} step={0.1} value={q} onChange={(next) => { stop(); patch({ q: next }); }} />
          <Slider label="n" min={1} max={8} step={1} value={gn} onChange={(next) => { stop(); patch({ gn: next }); }} />
        </>
      ) : null}
      {scene === 2 ? (
        <>
          <Slider label={t(lang, "Độ cao thả", "Drop")} min={2} max={16} step={1} suffix=" m" value={drop} onChange={(next) => { stop(); patch({ drop: next }); }} />
          <Slider label={t(lang, "Tỉ số nảy", "Bounce ratio")} min={0.2} max={0.8} step={0.1} value={ratio} onChange={(next) => { stop(); patch({ ratio: next }); }} />
          <Slider label={t(lang, "Số tháng", "Months")} min={1} max={12} step={1} value={months} onChange={(next) => { stop(); patch({ months: next }); }} />
        </>
      ) : null}
      <p className="note">
        {scene === 0
          ? t(
              lang,
              "Kéo cột cuối để đổi số số hạng. Với u₁ = 3 và d = 4, số hạng thứ 10 là 39, tổng mười số là 210. Cột «n bước» là phép đếm thừa một bước.",
              "Drag the last bar to change how many terms are shown. With u₁ = 3 and d = 4, the 10th term is 39 and the sum of ten terms is 210. The “n steps” figure counts one step too many.",
            )
          : null}
        {scene === 1
          ? t(
              lang,
              "Mặc định 8, 4, 2, … hội tụ. Tổng vô hạn là 16. Số hạng tiến về 0 nhưng không số hạng nào bằng 0. Đặt u₁ = 2, q = 3, n = 5 thì số hạng là 162, không phải 81.",
              "The default 8, 4, 2, … converges. The infinite sum is 16. Terms tend to 0, but no term is 0. Set u₁ = 2, q = 3, n = 5 and the term is 162, not 81.",
            )
          : null}
        {scene === 2
          ? t(
              lang,
              "Kéo quả bóng để đổi độ cao, kéo cột cuối để đổi số tháng. Rơi 8 m, nảy một nửa: quãng đường 24 m, không phải 16 m. Gửi 1 đến 12 triệu thì được 78 triệu, không phải 144.",
              "Drag the ball to change the drop, and the last bar to change the months. An 8 m drop rebounding by half travels 24 m, not 16 m. Deposits from 1 through 12 triệu total 78 triệu, not 144.",
            )
          : null}
      </p>
    </div>
  );
}

function drawArith(ctx: CanvasRenderingContext2D, width: number, height: number, u1: number, d: number, n: number, colors: PlotColors): Hit {
  const pad = 32;
  const x0 = 0;
  const x1 = 13;
  const y0 = -16;
  const y1 = 48;
  const map = makeMap(width, height, pad, x0, x1, y0, y1);
  paintBase(ctx, width, height, colors);
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = colors.grid;
  ctx.lineWidth = 1;
  for (let mark = -16; mark <= 48; mark += 8) {
    ctx.moveTo(map.x(x0), map.y(mark));
    ctx.lineTo(map.x(x1), map.y(mark));
  }
  ctx.stroke();
  ctx.restore();
  drawAxes(ctx, map, x0, x1, y0, y1, colors, "n", "u", width, pad);
  const count = Math.round(n);
  const terms = Array.from({ length: count }, (_, index) => arithTerm(u1, d, index + 1));
  ctx.save();
  ctx.beginPath();
  ctx.rect(pad, pad, width - pad * 2, height - pad * 2);
  ctx.clip();
  const handle = paintBars(ctx, map, terms, colors, pad, height);
  ctx.restore();
  const last = terms[count - 1] ?? u1;
  halo(ctx, `S = ${fmt(arithSum(u1, d, count))}`, width - 12, pad + 16, colors.ink, colors.bg, "right");
  halo(ctx, fmt(last), handle.x, labelY(handle.y, last >= 0, pad, height), colors.ink, colors.bg);
  return {
    hx: handle.x,
    hy: handle.y,
    hx2: -999,
    hy2: -999,
    to: (px) => snap(map.toX(px), 1, 1, 12),
    to2: () => 0,
  };
}

function drawGeom(ctx: CanvasRenderingContext2D, width: number, height: number, u1: number, q: number, n: number, colors: PlotColors): Hit {
  const pad = 32;
  const count = Math.round(n);
  const terms = Array.from({ length: count }, (_, index) => geomTerm(u1, q, index + 1));
  const peak = Math.max(16, ...terms.map((term) => Math.abs(term)));
  const map = makeMap(width, height, pad, 0, 9, -peak * 0.35, peak * 1.25);
  paintBase(ctx, width, height, colors);
  drawAxes(ctx, map, 0, 9, -peak * 0.35, peak * 1.25, colors, "n", "u", width, pad);
  const handle = paintBars(ctx, map, terms, colors, pad, height);
  const infinite = geomInfinite(u1, q);
  halo(ctx, infinite === null ? "|q| ≥ 1" : `S = ${fmt(infinite)}`, width - 12, pad + 16, colors.ink, colors.bg, "right");
  const last = terms[count - 1] ?? u1;
  halo(ctx, fmt(last), handle.x, labelY(handle.y, last >= 0, pad, height), colors.ink, colors.bg);
  return {
    hx: handle.x,
    hy: handle.y,
    hx2: -999,
    hy2: -999,
    to: (px) => snap(map.toX(px), 1, 1, 8),
    to2: () => 0,
  };
}

function drawSave(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  drop: number,
  ratio: number,
  months: number,
  colors: PlotColors,
): Hit {
  const wide = width >= 560;
  paintBase(ctx, width, height, colors);
  const ball = wide
    ? { x: 16, y: 16, w: width * 0.56 - 24, h: height - 32 }
    : { x: 16, y: 8, w: width - 32, h: height * 0.52 };
  const bars = wide
    ? { x: ball.x + ball.w + 12, y: 16, w: width - (ball.x + ball.w + 28), h: height - 32 }
    : { x: 16, y: ball.y + ball.h + 8, w: width - 32, h: height - (ball.y + ball.h + 16) };
  const ballHit = paintBounce(ctx, ball, drop, ratio, colors);
  const barMap = rectMap(bars, 0, 13, 0, 16);
  ctx.save();
  ctx.strokeStyle = colors.grid;
  ctx.strokeRect(bars.x, bars.y, bars.w, bars.h);
  ctx.restore();
  const count = Math.round(months);
  const terms = Array.from({ length: count }, (_, index) => index + 1);
  const handle = paintBars(ctx, barMap, terms, colors, 8, height);
  halo(ctx, `${fmt(savingsSum(count))} triệu`, bars.x + bars.w - 8, bars.y + 14, colors.ink, colors.bg, "right");
  return {
    hx: ballHit.x,
    hy: ballHit.y,
    hx2: handle.x,
    hy2: handle.y,
    to: (_px, py) => snap(dropFromY(ball, py, drop), 1, 2, 16),
    to2: (px) => snap(barMap.toX(px), 1, 1, 12),
  };
}

function paintBars(ctx: CanvasRenderingContext2D, map: Map2, terms: number[], colors: PlotColors, pad: number, height: number): { x: number; y: number } {
  const slot = Math.abs(map.x(2) - map.x(1));
  const barW = Math.max(3, Math.min(28, slot * 0.62));
  let hx = map.x(1);
  let hy = map.y(0);
  terms.forEach((value, index) => {
    const cx = map.x(index + 1);
    const top = map.y(value);
    const base = map.y(0);
    const yRect = Math.min(top, base);
    const hRect = Math.abs(top - base);
    ctx.fillStyle = index === terms.length - 1 ? colors.curve : colors.ink;
    ctx.globalAlpha = index === terms.length - 1 ? 1 : 0.28;
    ctx.fillRect(cx - barW / 2, yRect, barW, Math.max(1, hRect));
    ctx.globalAlpha = 1;
    if (index === terms.length - 1) {
      hx = cx;
      hy = value >= 0 ? top : base + hRect;
      hy = Math.min(height - pad, Math.max(pad, hy));
    }
  });
  return { x: hx, y: hy };
}

function paintBounce(
  ctx: CanvasRenderingContext2D,
  panel: { x: number; y: number; w: number; h: number },
  drop: number,
  ratio: number,
  colors: PlotColors,
): { x: number; y: number } {
  const ground = panel.y + panel.h - 18;
  const rise = (panel.h - 36) / 16;
  const startX = panel.x + 28;
  const top = ground - drop * rise;
  ctx.save();
  ctx.strokeStyle = colors.axis;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(panel.x + 8, ground);
  ctx.lineTo(panel.x + panel.w - 8, ground);
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = colors.curve;
  ctx.lineWidth = 2.2;
  ctx.moveTo(startX, top);
  ctx.lineTo(startX, ground);
  let cursor = startX;
  const span = Math.max(18, (panel.w - 56) / 7);
  for (let i = 1; i <= 6; i += 1) {
    const bh = drop * ratio ** i * rise;
    for (let s = 0; s <= 12; s += 1) {
      const u = s / 12;
      const px = cursor + u * span;
      const py = ground - Math.sin(Math.PI * u) * bh;
      if (s === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    cursor += span;
  }
  ctx.stroke();
  ctx.restore();
  dot(ctx, startX, top, colors.curve, colors.bg, 6);
  const path = bouncePath(drop, ratio);
  halo(ctx, `${fmt(path ?? 0)} m`, panel.x + panel.w - 10, panel.y + 14, colors.ink, colors.bg, "right");
  return { x: startX, y: top };
}

function dropFromY(panel: { y: number; h: number }, py: number, current: number): number {
  const ground = panel.y + panel.h - 18;
  const rise = (panel.h - 36) / 16;
  if (rise <= 0) return current;
  return (ground - py) / rise;
}

function rectMap(panel: { x: number; y: number; w: number; h: number }, x0: number, x1: number, y0: number, y1: number): Map2 {
  return {
    x: (value) => panel.x + ((value - x0) / (x1 - x0)) * panel.w,
    y: (value) => panel.y + ((y1 - value) / (y1 - y0)) * panel.h,
    toX: (px) => x0 + ((px - panel.x) / Math.max(1, panel.w)) * (x1 - x0),
    toY: (py) => y1 - ((py - panel.y) / Math.max(1, panel.h)) * (y1 - y0),
  };
}

function labelY(py: number, above: boolean, pad: number, height: number): number {
  const y = above ? py - 14 : py + 14;
  return Math.min(height - pad, Math.max(pad + 8, y));
}

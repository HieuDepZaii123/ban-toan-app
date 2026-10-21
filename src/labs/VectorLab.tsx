import { useRef, useState, type PointerEvent } from "react";
import { vectorInit, vectorRange } from "../content/params.ts";
import { fmt, showExact, snap } from "../lib/format.ts";
import { det2, solve2, vec3Add, vec3Cross, vec3Dot, vec3Len } from "../lib/math.ts";
import { writeParams } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { Live } from "../ui/Live.tsx";
import { useLang } from "../ui/Prefs.tsx";
import { Slider } from "../ui/Slider.tsx";
import { useCalm, useClock } from "./clock.ts";
import {
  arrow,
  clipLine,
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

export function VectorLab() {
  const lang = useLang();
  const calm = useCalm();
  const { values, ref, playing, patch } = useLessonState("vector", vectorInit, vectorRange);
  const [on, setOn] = useState(false);
  const hit = useRef<Hit>(null);
  const drag = useRef<string | null>(null);
  const scene = values.scene ?? 0;
  const u: [number, number, number] = [values.ux ?? 2, values.uy ?? 1, values.uz ?? 2];
  const v: [number, number, number] = [values.vx ?? 1, values.vy ?? -1, values.vz ?? 2];
  const sum = vec3Add(u, v);
  const cross = vec3Cross(u, v);
  const det = det2(values.m11 ?? 2, values.m12 ?? 1, values.m21 ?? 1, values.m22 ?? -1);
  const solved = solve2(values.s11 ?? 2, values.s12 ?? 1, values.t1 ?? 5, values.s21 ?? 1, values.s22 ?? -1, values.t2 ?? 1);

  const stop = () => {
    playing.current = false;
    setOn(false);
    writeParams("vector", ref.current);
  };

  useClock(on && scene === 0 && !calm, 2600, false, (uNow) => patch({ uz: snap(2 * uNow, 0.5, -4, 4) }, true), stop);
  useClock(on && scene === 1 && !calm, 2600, false, (uNow) => patch({ m22: snap(0.5 + (-1 - 0.5) * uNow, 0.5, -4, 4) }, true), stop);
  useClock(on && scene === 2 && !calm, 2600, false, (uNow) => patch({ t2: snap(4 + (1 - 4) * uNow, 0.5, -6, 8) }, true), stop);

  const toggle = () => {
    if (calm) return;
    if (playing.current) {
      stop();
      return;
    }
    playing.current = true;
    setOn(true);
    if (scene === 0) patch({ uz: 0 }, true);
    if (scene === 1) patch({ m22: 0.5 }, true);
    if (scene === 2) patch({ t2: 4 }, true);
  };

  const choose = (next: number) => {
    stop();
    patch({ scene: next });
  };

  const live = scene === 0
    ? t(
        lang,
        `Độ dài của u là ${showExact(vec3Len(u))}. Tích vô hướng ${fmt(vec3Dot(u, v))}. Tích có hướng (${fmt(cross[0])}; ${fmt(cross[1])}; ${fmt(cross[2])}).`,
        `Length of u is ${showExact(vec3Len(u))}. Dot product ${fmt(vec3Dot(u, v))}. Cross product (${fmt(cross[0])}; ${fmt(cross[1])}; ${fmt(cross[2])}).`,
      )
    : scene === 1
      ? t(lang, `Định thức ${fmt(det)}. Diện tích hình bình hành ${fmt(Math.abs(det))}.`, `Determinant ${fmt(det)}. Parallelogram area ${fmt(Math.abs(det))}.`)
      : solved
        ? t(lang, `Nghiệm duy nhất x = ${fmt(solved.x)}, y = ${fmt(solved.y)}.`, `Unique solution x = ${fmt(solved.x)}, y = ${fmt(solved.y)}.`)
        : t(lang, "Không có nghiệm duy nhất.", "There is no unique solution.");

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const colors = readColors();
    if (scene === 0) hit.current = drawSpace(ctx, width, height, u, v, sum, colors);
    else if (scene === 1) {
      hit.current = drawDet(ctx, width, height, values.m11 ?? 2, values.m12 ?? 1, values.m21 ?? 1, values.m22 ?? -1, det, colors);
    } else {
      hit.current = drawSystem(
        ctx,
        width,
        height,
        values.s11 ?? 2,
        values.s12 ?? 1,
        values.t1 ?? 5,
        values.s21 ?? 1,
        values.s22 ?? -1,
        values.t2 ?? 1,
        solved,
        colors,
      );
    }
  };

  const point = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const apply = (pxy: { x: number; y: number }, id: string) => {
    const map = hit.current?.map;
    if (scene === 0) {
      const scale = 0.04;
      const dx = pxy.x - (dragStart.current?.x ?? pxy.x);
      const dy = pxy.y - (dragStart.current?.y ?? pxy.y);
      const base = dragStart.current?.values;
      if (!base) return;
      if (id === "v") {
        patch({
          vx: snap(base.vx + dx * scale, 0.5, -4, 4),
          vy: snap(base.vy - dy * scale, 0.5, -4, 4),
        });
      } else {
        patch({
          ux: snap(base.ux + dx * scale, 0.5, -4, 4),
          uy: snap(base.uy - dy * scale, 0.5, -4, 4),
        });
      }
      return;
    }
    if (!map) return;
    const nx = snap(map.toX(pxy.x), 0.5, -4, 4);
    const ny = snap(map.toY(pxy.y), 0.5, -4, 4);
    if (scene === 1) patch({ m12: nx, m22: ny });
    else patch(id === "s2" ? { s21: nx, s22: ny } : { s11: nx, s12: ny });
  };

  const dragStart = useRef<{ x: number; y: number; values: { ux: number; uy: number; vx: number; vy: number } } | null>(null);

  const onDown = (event: PointerEvent<HTMLDivElement>) => {
    const g = hit.current;
    if (!g) return;
    const at = point(event);
    const id = nearestHandle(g.handles, at.x, at.y, 32);
    if (!id) return;
    drag.current = id;
    dragStart.current = {
      x: at.x,
      y: at.y,
      values: { ux: u[0], uy: u[1], vx: v[0], vy: v[1] },
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    stop();
  };

  const m11 = values.m11 ?? 2;
  const m12 = values.m12 ?? 1;
  const m21 = values.m21 ?? 1;
  const m22 = values.m22 ?? -1;

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
          { id: 0, vi: "Vectơ", en: "Vectors" },
          { id: 1, vi: "Định thức", en: "Determinant" },
          { id: 2, vi: "Hệ", en: "System" },
        ]}
      />
      <div
        className="graph-wrap"
        onPointerDown={onDown}
        onPointerMove={(event) => {
          if (!drag.current) return;
          apply(point(event), drag.current);
        }}
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
          <div><dt>|u|</dt><dd>{showExact(vec3Len(u))}</dd></div>
          <div><dt>u · v</dt><dd>{fmt(vec3Dot(u, v))}</dd></div>
          <div><dt>|u × v|</dt><dd>{showExact(vec3Len(cross))}</dd></div>
          <div><dt>u + v</dt><dd>({fmt(sum[0])}; {fmt(sum[1])}; {fmt(sum[2])})</dd></div>
        </dl>
      ) : null}
      {scene === 1 ? (
        <dl className="readout">
          <div><dt>det</dt><dd>{fmt(det)}</dd></div>
          <div><dt>{t(lang, "Diện tích", "Area")}</dt><dd>{fmt(Math.abs(det))}</dd></div>
        </dl>
      ) : null}
      {scene === 2 ? (
        <dl className="readout">
          <div><dt>x</dt><dd>{solved ? fmt(solved.x) : "—"}</dd></div>
          <div><dt>y</dt><dd>{solved ? fmt(solved.y) : "—"}</dd></div>
          <div className="wide"><dt>{t(lang, "Kết luận", "Conclusion")}</dt><dd>{solved ? t(lang, "Một nghiệm", "One solution") : t(lang, "Không có nghiệm duy nhất", "No unique solution")}</dd></div>
        </dl>
      ) : null}
      {scene === 0 ? (
        <>
          <Slider label="ux" min={-4} max={4} step={0.5} value={u[0]} onChange={(next) => { stop(); patch({ ux: next }); }} />
          <Slider label="uy" min={-4} max={4} step={0.5} value={u[1]} onChange={(next) => { stop(); patch({ uy: next }); }} />
          <Slider label="uz" min={-4} max={4} step={0.5} value={u[2]} onChange={(next) => { stop(); patch({ uz: next }); }} />
          <Slider label="vx" min={-4} max={4} step={0.5} value={v[0]} onChange={(next) => { stop(); patch({ vx: next }); }} />
          <Slider label="vy" min={-4} max={4} step={0.5} value={v[1]} onChange={(next) => { stop(); patch({ vy: next }); }} />
          <Slider label="vz" min={-4} max={4} step={0.5} value={v[2]} onChange={(next) => { stop(); patch({ vz: next }); }} />
        </>
      ) : null}
      {scene === 1 ? (
        <>
          <Slider label="a" min={-4} max={4} step={0.5} value={m11} onChange={(next) => { stop(); patch({ m11: next }); }} />
          <Slider label="b" min={-4} max={4} step={0.5} value={m12} onChange={(next) => { stop(); patch({ m12: next }); }} />
          <Slider label="c" min={-4} max={4} step={0.5} value={m21} onChange={(next) => { stop(); patch({ m21: next }); }} />
          <Slider label="d" min={-4} max={4} step={0.5} value={m22} onChange={(next) => { stop(); patch({ m22: next }); }} />
        </>
      ) : null}
      {scene === 2 ? (
        <>
          <Slider label={t(lang, "Hệ số x, phương trình 1", "x coefficient, equation 1")} min={-4} max={4} step={0.5} value={values.s11 ?? 2} onChange={(next) => { stop(); patch({ s11: next }); }} />
          <Slider label={t(lang, "Hệ số y, phương trình 1", "y coefficient, equation 1")} min={-4} max={4} step={0.5} value={values.s12 ?? 1} onChange={(next) => { stop(); patch({ s12: next }); }} />
          <Slider label={t(lang, "Vế phải 1", "Right side 1")} min={-6} max={8} step={0.5} value={values.t1 ?? 5} onChange={(next) => { stop(); patch({ t1: next }); }} />
          <Slider label={t(lang, "Hệ số x, phương trình 2", "x coefficient, equation 2")} min={-4} max={4} step={0.5} value={values.s21 ?? 1} onChange={(next) => { stop(); patch({ s21: next }); }} />
          <Slider label={t(lang, "Hệ số y, phương trình 2", "y coefficient, equation 2")} min={-4} max={4} step={0.5} value={values.s22 ?? -1} onChange={(next) => { stop(); patch({ s22: next }); }} />
          <Slider label={t(lang, "Vế phải 2", "Right side 2")} min={-6} max={8} step={0.5} value={values.t2 ?? 1} onChange={(next) => { stop(); patch({ t2: next }); }} />
        </>
      ) : null}
      <p className="note">
        {scene === 0
          ? t(lang, "Kéo mũi tên, hoặc kéo uz. Với u = (2; 1; 2), độ dài là 3. Khi uz = 0 thì chỉ còn √5, vì đã bỏ tọa độ thứ ba. v = (1; −1; 2) cho tích vô hướng 5 và tích có hướng (4; −2; −3). (1; 2; −1) · (2; −1; 0) = 0: lực vuông góc với quãng đường thì công bằng 0.", "Drag an arrow, or drag uz. For u = (2; 1; 2) the length is 3. At uz = 0 only √5 remains, because the third coordinate was dropped. v = (1; −1; 2) gives dot product 5 and cross product (4; −2; −3). (1; 2; −1) · (2; −1; 0) = 0: a force perpendicular to the displacement does no work.")
          : null}
        {scene === 1
          ? t(lang, "Kéo đầu cột thứ hai. Hai cột (2; 1) và (1; −1) có định thức 2·(−1) − 1·1 = −3. Diện tích hình bình hành là trị tuyệt đối, bằng 3.", "Drag the tip of the second column. The columns (2; 1) and (1; −1) have determinant 2·(−1) − 1·1 = −3. The parallelogram area is the absolute value, 3.")
          : null}
        {scene === 2
          ? t(lang, "Hai đường cắt nhau tại nghiệm. Hệ 2x + y = 5, x − y = 1 có x = 2, y = 1. Định thức hệ số là −3, khác 0, nên không có vô số nghiệm.", "The lines meet at the solution. The system 2x + y = 5, x − y = 1 has x = 2, y = 1. The coefficient determinant is −3, not 0, so there are not infinitely many solutions.")
          : null}
      </p>
    </div>
  );
}

function drawSpace(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  u: [number, number, number],
  v: [number, number, number],
  sum: [number, number, number],
  colors: PlotColors,
): Hit {
  paintBase(ctx, width, height, colors);
  const samples: (readonly [number, number, number])[] = [
    [0, 0, 0], u, v, sum, [3, 0, 0], [0, 3, 0], [0, 0, 3],
  ];
  const at = fitIso(samples, width, height, 28);
  const origin = at(0, 0, 0);
  const axis = (x: number, y: number, z: number, label: string) => {
    const tip = at(x, y, z);
    arrow(ctx, origin.x, origin.y, tip.x, tip.y, colors.soft);
    halo(ctx, label, tip.x, tip.y - 10, colors.soft, colors.bg);
  };
  axis(3, 0, 0, "x");
  axis(0, 3, 0, "y");
  axis(0, 0, 3, "z");
  const uu = at(...u);
  const vv = at(...v);
  const ss = at(...sum);
  ctx.save();
  ctx.strokeStyle = colors.soft;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(uu.x, uu.y);
  ctx.lineTo(ss.x, ss.y);
  ctx.lineTo(vv.x, vv.y);
  ctx.stroke();
  ctx.restore();
  arrow(ctx, origin.x, origin.y, uu.x, uu.y, colors.curve);
  arrow(ctx, origin.x, origin.y, vv.x, vv.y, colors.alt);
  dot(ctx, uu.x, uu.y, colors.curve, colors.bg);
  dot(ctx, vv.x, vv.y, colors.alt, colors.bg);
  halo(ctx, `|u| = ${showExact(vec3Len(u))}`, 16, 16, colors.ink, colors.bg, "left");
  return { map: null, handles: [{ id: "u", x: uu.x, y: uu.y }, { id: "v", x: vv.x, y: vv.y }] };
}

function drawDet(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  a: number,
  b: number,
  c: number,
  d: number,
  det: number,
  colors: PlotColors,
): Hit {
  paintBase(ctx, width, height, colors);
  const map = makeMap(width, height, 32, -5, 6, -5, 6);
  drawGrid(ctx, map, -5, 6, -5, 6, colors);
  drawAxes(ctx, map, -5, 6, -5, 6, colors, "", "", width, 32);
  ctx.beginPath();
  ctx.moveTo(map.x(0), map.y(0));
  ctx.lineTo(map.x(a), map.y(c));
  ctx.lineTo(map.x(a + b), map.y(c + d));
  ctx.lineTo(map.x(b), map.y(d));
  ctx.closePath();
  ctx.fillStyle = colors.curve;
  ctx.globalAlpha = 0.2;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = colors.curve;
  ctx.lineWidth = 2;
  ctx.stroke();
  dot(ctx, map.x(b), map.y(d), colors.alt, colors.bg);
  halo(ctx, `det = ${fmt(det)}`, width / 2, 18, colors.ink, colors.bg);
  return { map, handles: [{ id: "col", x: map.x(b), y: map.y(d) }] };
}

function drawSystem(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  a1: number,
  b1: number,
  c1: number,
  a2: number,
  b2: number,
  c2: number,
  solved: { x: number; y: number } | null,
  colors: PlotColors,
): Hit {
  paintBase(ctx, width, height, colors);
  const map = makeMap(width, height, 28, -2, 6, -2, 6);
  drawGrid(ctx, map, -2, 6, -2, 6, colors);
  drawAxes(ctx, map, -2, 6, -2, 6, colors, "x", "y", width, 28);
  drawBound(ctx, map, width, height, a1, b1, c1, colors.curve);
  drawBound(ctx, map, width, height, a2, b2, c2, colors.alt);
  if (solved) {
    dot(ctx, map.x(solved.x), map.y(solved.y), colors.ink, colors.bg, 6);
    halo(ctx, `(${fmt(solved.x)}; ${fmt(solved.y)})`, map.x(solved.x), map.y(solved.y) - 16, colors.ink, colors.bg);
  } else {
    halo(ctx, "không có nghiệm duy nhất", width / 2, 18, colors.alt, colors.bg);
  }
  return { map, handles: [] };
}

function drawBound(
  ctx: CanvasRenderingContext2D,
  map: Map2,
  width: number,
  height: number,
  a: number,
  b: number,
  c: number,
  color: string,
) {
  if (Math.abs(b) < 1e-9) {
    if (Math.abs(a) < 1e-9) return;
    const x = c / a;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(map.x(x), map.y(-2));
    ctx.lineTo(map.x(x), map.y(6));
    ctx.stroke();
    ctx.restore();
    return;
  }
  const xAt = 0;
  const yAt = c / b;
  clipLine(ctx, map, width, height, 28, xAt, yAt, -a / b, color, 2);
}

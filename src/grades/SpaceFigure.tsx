import { useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import type { EdgeStyle, P3, SpaceFigure as Spec } from "../content/grades/space.ts";
import { clampPitch, rotate, startViewFor } from "../lib/rotate3d.ts";

const W = 300;
const H = 220;
const PAD = 30;
const DEPTH = 0.45;

type P2 = [number, number];
type View = { yaw: number; pitch: number };

/** Phép chiếu xiên: x sang phải, z lên trên, y lùi vào trong theo hướng chéo lên bên phải. */
export function project(p: P3, view: { dx: number; dz: number } = { dx: DEPTH, dz: DEPTH }): P2 {
  return [p[0] + view.dx * p[1], p[2] + view.dz * p[1]];
}

function fit(points: Record<string, P3>, view?: { dx: number; dz: number }) {
  const all = Object.values(points).map((p) => project(p, view));
  const xs = all.map((p) => p[0]);
  const ys = all.map((p) => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const scale = Math.min((W - 2 * PAD) / (maxX - minX || 1), (H - 2 * PAD) / (maxY - minY || 1));
  const offX = (W - scale * (maxX - minX)) / 2 - scale * minX;
  const offY = (H - scale * (maxY - minY)) / 2 + scale * maxY;
  const map = (p: P3): P2 => {
    const q = project(p, view);
    return [offX + scale * q[0], offY - scale * q[1]];
  };
  return Object.assign(map, { scale });
}

const CLASS: Record<EdgeStyle, string> = { solid: "sp-edge", hidden: "sp-edge sp-hidden", hl: "sp-edge sp-hl", hl2: "sp-edge sp-hl2", arrow: "sp-edge sp-vec", arrowhl: "sp-edge sp-vec sp-hl" };

function norm(v: P2): P2 {
  const l = Math.hypot(v[0], v[1]) || 1;
  return [v[0] / l, v[1] / l];
}

const TEXT = {
  vi: { rotate: "Xoay hình", still: "Hình đứng yên", reset: "Đặt lại góc nhìn", hint: "Kéo trên hình hoặc dùng phím mũi tên để xoay; phím Esc đặt lại." },
  en: { rotate: "Rotate figure", still: "Fixed figure", reset: "Reset view", hint: "Drag on the figure or use the arrow keys to rotate; Esc resets." },
};

export function SpaceFigure({ spec, english = false }: { spec: Spec; english?: boolean }) {
  const [view, setView] = useState<View | null>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const text = english ? TEXT.en : TEXT.vi;
  const planeNormals: P3[] = (spec.planes ?? []).map((pl) => {
    const [a, b, c] = pl.pts.slice(0, 3).map((n) => spec.points[n]!) as [P3, P3, P3];
    const u: P3 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], v: P3 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    return [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  });
  const start = (): View => startViewFor(planeNormals);

  const points: Record<string, P3> = { ...spec.points };
  if (spec.axes) {
    if (!points.O) points.O = [0, 0, 0];
    points.x = [spec.axes[0], 0, 0];
    points.y = [0, spec.axes[1], 0];
    points.z = [0, 0, spec.axes[2]];
  }
  const names = Object.keys(points);
  const centre: P3 = [0, 1, 2].map((i) => names.reduce((s, n) => s + points[n]![i]!, 0) / names.length) as P3;
  const radius = Math.max(
    1e-6,
    ...names.map((n) => Math.hypot(points[n]![0] - centre[0], points[n]![1] - centre[1], points[n]![2] - centre[2])),
    ...(spec.spheres ?? []).map((sp) => Math.hypot(points[sp.c]![0] - centre[0], points[sp.c]![1] - centre[1], points[sp.c]![2] - centre[2]) + sp.r),
  );
  const rotScale = (Math.min(W, H) / 2 - PAD) / radius;

  const still = fit(points, spec.view);
  const turned = (p: P3, v: View): { xy: P2; depth: number } => {
    const q = rotate([p[0] - centre[0], p[1] - centre[1], p[2] - centre[2]], v.yaw, v.pitch);
    return { xy: [W / 2 + rotScale * q[0], H / 2 - rotScale * q[2]], depth: q[1] };
  };
  const pt = (n: string): P2 => (view ? turned(points[n]!, view).xy : still(points[n]!));
  const depthOf = (n: string): number => (view ? turned(points[n]!, view).depth : 0);
  const depths = view ? names.map(depthOf) : [0];
  const dMin = Math.min(...depths), dMax = Math.max(...depths);
  const fade = (d: number): number => (view && dMax > dMin ? 1 - 0.6 * ((d - dMin) / (dMax - dMin)) : 1);
  const scale = view ? rotScale : still.scale;

  const all = Object.keys(spec.points).map(pt);
  const cx = all.reduce((s, p) => s + p[0], 0) / all.length;
  const cy = all.reduce((s, p) => s + p[1], 0) / all.length;
  const alt = english ? spec.alt.en : spec.alt.vi;
  const labelled = names.filter((n) => !(spec.hide ?? []).includes(n));

  const edges = [...spec.edges];
  if (view) edges.sort((a, b) => (depthOf(b.a) + depthOf(b.b)) - (depthOf(a.a) + depthOf(a.b)));

  const turn = (dyaw: number, dpitch: number) => setView((v) => (v ? { yaw: v.yaw + dyaw, pitch: clampPitch(v.pitch + dpitch) } : v));
  const onDown = (e: PointerEvent<SVGSVGElement>) => {
    if (!view) return;
    drag.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    if (!view || !drag.current) return;
    const dx = e.clientX - drag.current.x, dy = e.clientY - drag.current.y;
    drag.current = { x: e.clientX, y: e.clientY };
    turn(dx * 0.012, dy * 0.012);
  };
  const onUp = () => { drag.current = null; };
  const onKey = (e: KeyboardEvent<SVGSVGElement>) => {
    if (!view) return;
    const step = 0.12;
    if (e.key === "ArrowLeft") turn(-step, 0);
    else if (e.key === "ArrowRight") turn(step, 0);
    else if (e.key === "ArrowUp") turn(0, -step);
    else if (e.key === "ArrowDown") turn(0, step);
    else if (e.key === "Escape") setView(start());
    else return;
    e.preventDefault();
  };

  return (
    <div className="space-wrap">
      <svg
        className={`space-figure${view ? " space-turnable" : ""}`}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={view ? `${alt} ${text.hint}` : alt}
        tabIndex={view ? 0 : undefined}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={onKey}
      >
        <defs>
          <marker id="sp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" className="sp-arrowhead" /></marker>
        </defs>
        {spec.axes ? ["x", "y", "z"].map((n) => {
          const o = view ? turned([0, 0, 0], view).xy : still([0, 0, 0]);
          return <line key={`ax-${n}`} x1={o[0]} y1={o[1]} x2={pt(n)[0]} y2={pt(n)[1]} className="sp-edge sp-axis" markerEnd="url(#sp-arrow)" />;
        }) : null}
        {(spec.spheres ?? []).map((sp, i) => <circle key={`sph-${i}`} cx={pt(sp.c)[0]} cy={pt(sp.c)[1]} r={sp.r * scale} className="sp-sphere" />)}
        {(spec.planes ?? []).map((pl, i) => <polygon key={i} points={pl.pts.map((n) => pt(n).join(",")).join(" ")} className={pl.tone === "b" ? "sp-plane sp-plane-b" : "sp-plane"} />)}
        {edges.map((e, i) => {
          const a = pt(e.a), b = pt(e.b);
          const s = e.s ?? "solid";
          const vec = s === "arrow" || s === "arrowhl";
          const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
          const d = norm([b[0] - a[0], b[1] - a[1]]);
          const cls = view && s === "hidden" ? CLASS.solid : CLASS[s];
          const op = fade((depthOf(e.a) + depthOf(e.b)) / 2);
          return (
            <g key={i} opacity={op}>
              <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={cls} markerEnd={vec ? "url(#sp-arrow)" : undefined} />
              {e.label ? <text x={mx - d[1] * 9} y={my + d[0] * 9 + 3} className="sp-edge-label" textAnchor="middle">{e.label}</text> : null}
            </g>
          );
        })}
        {(spec.right ?? []).map((r, i) => {
          const o = pt(r.at), p = norm([pt(r.p)[0] - o[0], pt(r.p)[1] - o[1]]), q = norm([pt(r.q)[0] - o[0], pt(r.q)[1] - o[1]]);
          const k = 9;
          return <polyline key={i} points={`${o[0] + p[0] * k},${o[1] + p[1] * k} ${o[0] + (p[0] + q[0]) * k},${o[1] + (p[1] + q[1]) * k} ${o[0] + q[0] * k},${o[1] + q[1] * k}`} className="sp-right" fill="none" />;
        })}
        {(spec.angles ?? []).map((g, i) => {
          const o = pt(g.at), p = norm([pt(g.p)[0] - o[0], pt(g.p)[1] - o[1]]), q = norm([pt(g.q)[0] - o[0], pt(g.q)[1] - o[1]]);
          const r = 20;
          const mid = norm([p[0] + q[0], p[1] + q[1]]);
          const sweep = p[0] * q[1] - p[1] * q[0] > 0 ? 1 : 0;
          return (
            <g key={i}>
              <path d={`M${o[0] + p[0] * r},${o[1] + p[1] * r} A${r},${r} 0 0 ${sweep} ${o[0] + q[0] * r},${o[1] + q[1] * r}`} className="sp-angle" fill="none" />
              {g.label ? <text x={o[0] + mid[0] * (r + 11)} y={o[1] + mid[1] * (r + 11) + 4} className="sp-edge-label" textAnchor="middle">{g.label}</text> : null}
            </g>
          );
        })}
        {(spec.dots ?? []).map((n) => <circle key={n} cx={pt(n)[0]} cy={pt(n)[1]} r={3} className="sp-dot" opacity={fade(depthOf(n))} />)}
        {labelled.map((n) => {
          const p = pt(n);
          const d = norm([p[0] - cx, p[1] - cy]);
          return <text key={n} x={p[0] + d[0] * 12} y={p[1] + d[1] * 12 + 4} className="sp-label" textAnchor="middle" opacity={fade(depthOf(n))}>{n}</text>;
        })}
      </svg>
      <div className="space-tools">
        <button type="button" className="space-btn" aria-pressed={view !== null} onClick={() => setView(view ? null : start())}>{view ? text.still : text.rotate}</button>
        {view ? <button type="button" className="space-btn" onClick={() => setView(start())}>{text.reset}</button> : null}
      </div>
      {view ? <p className="space-hint">{text.hint}</p> : null}
    </div>
  );
}

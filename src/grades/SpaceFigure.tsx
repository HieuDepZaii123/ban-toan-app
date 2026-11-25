import type { EdgeStyle, P3, SpaceFigure as Spec } from "../content/grades/space.ts";

const W = 300;
const H = 220;
const PAD = 30;
const DEPTH = 0.45;

type P2 = [number, number];

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
  return (p: P3): P2 => {
    const q = project(p, view);
    return [offX + scale * q[0], offY - scale * q[1]];
  };
}

const CLASS: Record<EdgeStyle, string> = { solid: "sp-edge", hidden: "sp-edge sp-hidden", hl: "sp-edge sp-hl", hl2: "sp-edge sp-hl2", arrow: "sp-edge sp-vec", arrowhl: "sp-edge sp-vec sp-hl" };

function norm(v: P2): P2 {
  const l = Math.hypot(v[0], v[1]) || 1;
  return [v[0] / l, v[1] / l];
}

export function SpaceFigure({ spec, english = false }: { spec: Spec; english?: boolean }) {
  const f = fit(spec.points, spec.view);
  const pt = (n: string): P2 => f(spec.points[n]!);
  const all = Object.keys(spec.points).map(pt);
  const cx = all.reduce((s, p) => s + p[0], 0) / all.length;
  const cy = all.reduce((s, p) => s + p[1], 0) / all.length;
  const alt = english ? spec.alt.en : spec.alt.vi;
  const labelled = Object.keys(spec.points);
  return (
    <svg className="space-figure" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={alt}>
      <defs>
        <marker id="sp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" className="sp-arrowhead" /></marker>
      </defs>
      {(spec.planes ?? []).map((pl, i) => <polygon key={i} points={pl.pts.map((n) => pt(n).join(",")).join(" ")} className={pl.tone === "b" ? "sp-plane sp-plane-b" : "sp-plane"} />)}
      {spec.edges.map((e, i) => {
        const a = pt(e.a), b = pt(e.b);
        const s = e.s ?? "solid";
        const vec = s === "arrow" || s === "arrowhl";
        const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
        const d = norm([b[0] - a[0], b[1] - a[1]]);
        return (
          <g key={i}>
            <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={CLASS[s]} markerEnd={vec ? "url(#sp-arrow)" : undefined} />
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
      {(spec.dots ?? []).map((n) => <circle key={n} cx={pt(n)[0]} cy={pt(n)[1]} r={3} className="sp-dot" />)}
      {labelled.map((n) => {
        const p = pt(n);
        const d = norm([p[0] - cx, p[1] - cy]);
        return <text key={n} x={p[0] + d[0] * 12} y={p[1] + d[1] * 12 + 4} className="sp-label" textAnchor="middle">{n}</text>;
      })}
    </svg>
  );
}

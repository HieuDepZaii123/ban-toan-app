import { useRef, useState, type PointerEvent } from "react";
import { ineqInit, ineqRange } from "../content/params.ts";
import { fmt, snap } from "../lib/format.ts";
import { amGm, cauchyPair, workshopOk, workshopProfit } from "../lib/math.ts";
import { writeParams } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { Live } from "../ui/Live.tsx";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/Prefs.tsx";
import { Slider } from "../ui/Slider.tsx";
import { useCalm, useClock } from "./clock.ts";
import { dot, drawAxes, drawGrid, halo, makeMap, nearestHandle, paintBase, readColors, type Map2, type PlotColors } from "./draw.ts";
import { Graph } from "./Graph.tsx";
import { useLessonState } from "./lessonState.ts";
import { SceneBar } from "./SceneBar.tsx";

type Hit = { map: Map2; handles: { id: string; x: number; y: number }[] } | null;

const VERTICES: readonly (readonly [number, number])[] = [
  [0, 0],
  [8, 0],
  [6, 4],
  [0, 10],
];

export function IneqLab() {
  const lang = useLang();
  const calm = useCalm();
  const { values, ref, patch, play, halt, isPlaying } = useLessonState("ineq", ineqInit, ineqRange);
  const [on, setOn] = useState(false);
  const hit = useRef<Hit>(null);
  const drag = useRef<string | null>(null);
  const scene = values.scene ?? 0;
  const a = values.a ?? 4;
  const b = values.b ?? 9;
  const p = values.p ?? 1;
  const q = values.q ?? 2;
  const c = values.c ?? 3;
  const d = values.d ?? 4;
  const x = values.x ?? 6;
  const y = values.y ?? 4;
  const means = amGm(a, b);
  const pair = cauchyPair(p, q, c, d);
  const profit = workshopProfit(x, y);
  const inside = workshopOk(x, y);

  const stop = () => {
    halt();
    setOn(false);
    writeParams("ineq", ref.current);
  };

  useClock(
    on && scene === 0 && !calm,
    2800,
    false,
    (u) => {
      const target = ref.current.a ?? 4;
      patch({ b: snap(12 + (target - 12) * u, 0.5, 0, 12) }, true);
    },
    stop,
  );
  useClock(
    on && scene === 1 && !calm,
    2800,
    false,
    (u) => {
      const pp = ref.current.p ?? 1;
      const qq = ref.current.q ?? 2;
      const cc = ref.current.c ?? 3;
      const target = Math.abs(pp) < 1e-9 ? qq : (qq * cc) / pp;
      patch({ d: snap(4 + (target - 4) * u, 0.5, -6, 6) }, true);
    },
    stop,
  );
  useClock(
    on && scene === 2 && !calm,
    3600,
    false,
    (u) => {
      const path: readonly (readonly [number, number])[] = [[0, 0], [8, 0], [6, 4], [0, 10], [6, 4]];
      if (u >= 1) {
        patch({ x: 6, y: 4 }, true);
        return;
      }
      const travel = u * 4;
      const seg = Math.min(3, Math.floor(travel));
      const f = travel - seg;
      const from = path[seg] ?? path[0];
      const to = path[seg + 1] ?? path[4];
      patch({
        x: snap((from?.[0] ?? 0) + ((to?.[0] ?? 0) - (from?.[0] ?? 0)) * f, 0.5, 0, 10),
        y: snap((from?.[1] ?? 0) + ((to?.[1] ?? 0) - (from?.[1] ?? 0)) * f, 0.5, 0, 10),
      }, true);
    },
    stop,
  );

  const toggle = () => {
    if (calm) return;
    if (isPlaying()) {
      stop();
      return;
    }
    play();
    setOn(true);
    if (scene === 0) patch({ b: 12 }, true);
    if (scene === 1) patch({ d: 4 }, true);
    if (scene === 2) patch({ x: 0, y: 0 }, true);
  };

  const choose = (next: number) => {
    stop();
    patch({ scene: next });
  };

  const live = scene === 0
    ? means
      ? t(lang, `Trung bình cộng ${fmt(means.am)}, trung bình nhân ${fmt(means.gm)}.`, `Arithmetic mean ${fmt(means.am)}, geometric mean ${fmt(means.gm)}.`)
      : t(lang, "AM–GM cần hai số dương.", "AM–GM needs two positive numbers.")
    : scene === 1
      ? t(
          lang,
          `Vế trái ${fmt(pair.left)}, vế phải ${fmt(pair.right)}. ${pair.equal ? "Dấu bằng." : "Vế trái lớn hơn."}`,
          `Left side ${fmt(pair.left)}, right side ${fmt(pair.right)}. ${pair.equal ? "Equality." : "The left side is larger."}`,
        )
      : t(
          lang,
          inside
            ? `Trong miền. Lợi nhuận ${fmt(profit)} tại (${fmt(x)}; ${fmt(y)}).`
            : `Ngoài miền. (${fmt(x)}; ${fmt(y)}) không dùng được.`,
          inside
            ? `Inside the region. Profit ${fmt(profit)} at (${fmt(x)}; ${fmt(y)}).`
            : `Outside the region. (${fmt(x)}; ${fmt(y)}) is not allowed.`,
        );

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const colors = readColors();
    if (scene === 0) hit.current = drawMeans(ctx, width, height, a, b, means, colors);
    else if (scene === 1) hit.current = drawCauchy(ctx, width, height, p, q, c, d, pair, colors);
    else hit.current = drawShop(ctx, width, height, x, y, inside, profit, colors);
  };

  const point = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const apply = (pxy: { x: number; y: number }, id: string) => {
    const map = hit.current?.map;
    if (!map) return;
    if (scene === 0) {
      const next = snap(map.toY(pxy.y), 0.5, 0, 12);
      patch(id === "b" ? { b: next } : { a: next });
    } else if (scene === 1) {
      const nx = snap(map.toX(pxy.x), 0.5, -6, 6);
      const ny = snap(map.toY(pxy.y), 0.5, -6, 6);
      if (id === "v") patch({ c: nx, d: ny });
      else patch({ p: nx, q: ny });
    } else {
      patch({
        x: snap(map.toX(pxy.x), 0.5, 0, 10),
        y: snap(map.toY(pxy.y), 0.5, 0, 10),
      });
    }
  };

  const onDown = (event: PointerEvent<HTMLDivElement>) => {
    const g = hit.current;
    if (!g) return;
    const at = point(event);
    const id = nearestHandle(g.handles, at.x, at.y, scene === 2 ? 1000 : 36);
    if (!id) return;
    drag.current = id;
    event.currentTarget.setPointerCapture(event.pointerId);
    stop();
    apply(at, id);
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
          { id: 0, vi: "AM–GM", en: "AM–GM" },
          { id: 1, vi: "Cauchy", en: "Cauchy" },
          { id: 2, vi: "Xưởng", en: "Workshop" },
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
          <div><dt>a</dt><dd>{fmt(a)}</dd></div>
          <div><dt>b</dt><dd>{fmt(b)}</dd></div>
          <div><dt>{t(lang, "Cộng", "Arithmetic")}</dt><dd>{means ? fmt(means.am) : "—"}</dd></div>
          <div><dt>{t(lang, "Nhân", "Geometric")}</dt><dd>{means ? fmt(means.gm) : "—"}</dd></div>
        </dl>
      ) : null}
      {scene === 1 ? (
        <dl className="readout">
          <div><dt>{t(lang, "Vế trái", "Left")}</dt><dd>{fmt(pair.left)}</dd></div>
          <div><dt>{t(lang, "Vế phải", "Right")}</dt><dd>{fmt(pair.right)}</dd></div>
          <div className="wide"><dt>{t(lang, "Dấu", "Sign")}</dt><dd>{pair.equal ? t(lang, "Bằng", "Equal") : "≥"}</dd></div>
        </dl>
      ) : null}
      {scene === 2 ? (
        <dl className="readout">
          <div><dt>x</dt><dd>{fmt(x)}</dd></div>
          <div><dt>y</dt><dd>{fmt(y)}</dd></div>
          <div><dt>P</dt><dd>{fmt(profit)}</dd></div>
          <div><dt>{t(lang, "Miền", "Region")}</dt><dd>{inside ? t(lang, "Trong", "Inside") : t(lang, "Ngoài", "Outside")}</dd></div>
        </dl>
      ) : null}
      {scene === 0 ? (
        <>
          <Slider label="a" min={0} max={12} step={0.5} value={a} onChange={(next) => { stop(); patch({ a: next }); }} />
          <Slider label="b" min={0} max={12} step={0.5} value={b} onChange={(next) => { stop(); patch({ b: next }); }} />
        </>
      ) : null}
      {scene === 1 ? (
        <>
          <Slider label="a" min={-6} max={6} step={0.5} value={p} onChange={(next) => { stop(); patch({ p: next }); }} />
          <Slider label="b" min={-6} max={6} step={0.5} value={q} onChange={(next) => { stop(); patch({ q: next }); }} />
          <Slider label="c" min={-6} max={6} step={0.5} value={c} onChange={(next) => { stop(); patch({ c: next }); }} />
          <Slider label="d" min={-6} max={6} step={0.5} value={d} onChange={(next) => { stop(); patch({ d: next }); }} />
        </>
      ) : null}
      {scene === 2 ? (
        <>
          <Slider label={t(lang, "Số bàn", "Desks")} min={0} max={10} step={0.5} value={x} onChange={(next) => { stop(); patch({ x: next }); }} />
          <Slider label={t(lang, "Số ghế", "Chairs")} min={0} max={10} step={0.5} value={y} onChange={(next) => { stop(); patch({ y: next }); }} />
        </>
      ) : null}
      <p className="note">
        <MathText
          text={
            scene === 0
              ? t(lang, "$(4+9)/2=6{,}5\\ge6=\\sqrt{4\\cdot9}$. $a+b=10\\Rightarrow\\max ab=25$. $a\\le0$: bỏ.", "$(4+9)/2=6{,}5\\ge6=\\sqrt{4\\cdot9}$. $a+b=10\\Rightarrow\\max ab=25$. $a\\le0$: excluded.")
              : scene === 1
                ? t(lang, "$(1^2+2^2)(3^2+4^2)=125\\ge121$. $(3;6)$: $225=225$.", "$(1^2+2^2)(3^2+4^2)=125\\ge121$. $(3;6)$: $225=225$.")
                : t(lang, "$P=5x+3y$. $\\max=42$ tại $(6;4)$. $(9;2)$: $x+y=11$. $3\\cdot6+5\\cdot4=38$.", "$P=5x+3y$. $\\max=42$ at $(6;4)$. $(9;2)$: $x+y=11$. $3\\cdot6+5\\cdot4=38$.")
          }
        />
      </p>
    </div>
  );
}

function drawMeans(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  a: number,
  b: number,
  means: { am: number; gm: number } | null,
  colors: PlotColors,
): Hit {
  paintBase(ctx, width, height, colors);
  const map = makeMap(width, height, 28, -0.5, 3.5, -0.5, 13);
  drawGrid(ctx, map, -0.5, 3.5, -0.5, 13, colors);
  drawAxes(ctx, map, -0.5, 3.5, -0.5, 13, colors, "", "", width, 28);
  const slot = map.x(1) - map.x(0);
  const drawBar = (at: number, value: number, fill: string) => {
    const left = map.x(at) - slot * 0.28;
    const top = map.y(value);
    ctx.fillStyle = fill;
    ctx.globalAlpha = 0.85;
    ctx.fillRect(left, top, slot * 0.56, map.y(0) - top);
    ctx.globalAlpha = 1;
  };
  drawBar(1, a, colors.curve);
  drawBar(2, b, colors.alt);
  if (means) {
    ctx.strokeStyle = colors.ink;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(map.x(0.4), map.y(means.am));
    ctx.lineTo(map.x(2.8), map.y(means.am));
    ctx.stroke();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = colors.soft;
    ctx.beginPath();
    ctx.moveTo(map.x(0.4), map.y(means.gm));
    ctx.lineTo(map.x(2.8), map.y(means.gm));
    ctx.stroke();
    ctx.setLineDash([]);
    halo(ctx, `AM ${fmt(means.am)}`, map.x(3.1), map.y(means.am), colors.ink, colors.bg, "left");
    halo(ctx, `GM ${fmt(means.gm)}`, map.x(3.1), map.y(means.gm), colors.soft, colors.bg, "left");
  } else {
    halo(ctx, "a, b > 0", width / 2, height / 2, colors.alt, colors.bg);
  }
  dot(ctx, map.x(1), map.y(a), colors.curve, colors.bg);
  dot(ctx, map.x(2), map.y(b), colors.alt, colors.bg);
  return {
    map,
    handles: [
      { id: "a", x: map.x(1), y: map.y(a) },
      { id: "b", x: map.x(2), y: map.y(b) },
    ],
  };
}

function drawCauchy(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  p: number,
  q: number,
  c: number,
  d: number,
  pair: { left: number; right: number; equal: boolean },
  colors: PlotColors,
): Hit {
  paintBase(ctx, width, height, colors);
  const map = makeMap(width, height, 28, -7, 7, -7, 7);
  drawGrid(ctx, map, -7, 7, -7, 7, colors);
  drawAxes(ctx, map, -7, 7, -7, 7, colors, "", "", width, 28);
  strokeArrow(ctx, map.x(0), map.y(0), map.x(p), map.y(q), colors.curve);
  strokeArrow(ctx, map.x(0), map.y(0), map.x(c), map.y(d), colors.alt);
  dot(ctx, map.x(p), map.y(q), colors.curve, colors.bg);
  dot(ctx, map.x(c), map.y(d), colors.alt, colors.bg);
  halo(ctx, `${fmt(pair.left)} ≥ ${fmt(pair.right)}`, width / 2, 18, colors.ink, colors.bg);
  return {
    map,
    handles: [
      { id: "u", x: map.x(p), y: map.y(q) },
      { id: "v", x: map.x(c), y: map.y(d) },
    ],
  };
}

function drawShop(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  x: number,
  y: number,
  inside: boolean,
  profit: number,
  colors: PlotColors,
): Hit {
  paintBase(ctx, width, height, colors);
  const map = makeMap(width, height, 32, -1, 11, -1.4, 11.5);
  drawGrid(ctx, map, -1, 11, -1.4, 11.5, colors);
  drawAxes(ctx, map, -1, 11, -1.4, 11.5, colors, "x", "y", width, 32);
  ctx.beginPath();
  VERTICES.forEach(([vx, vy], index) => {
    const px = map.x(vx);
    const py = map.y(vy);
    if (index === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();
  ctx.fillStyle = colors.curve;
  ctx.globalAlpha = 0.16;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = colors.curve;
  ctx.lineWidth = 2;
  ctx.stroke();
  for (const [vx, vy] of VERTICES) {
    const mark = vx === 6 && vy === 4;
    dot(ctx, map.x(vx), map.y(vy), mark ? colors.alt : colors.curve, colors.bg, mark ? 6 : 4);
    halo(ctx, `${fmt(workshopProfit(vx, vy))}`, map.x(vx) + 8, map.y(vy) - 12, colors.soft, colors.bg, "left");
  }
  dot(ctx, map.x(x), map.y(y), inside ? colors.ink : colors.alt, colors.bg, 7);
  halo(ctx, inside ? `P = ${fmt(profit)}` : "ngoài miền", map.x(x), map.y(y) - 18, colors.ink, colors.bg);
  return { map, handles: [{ id: "p", x: map.x(x), y: map.y(y) }] };
}

function strokeArrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 9 * Math.cos(angle - 0.4), y2 - 9 * Math.sin(angle - 0.4));
  ctx.lineTo(x2 - 9 * Math.cos(angle + 0.4), y2 - 9 * Math.sin(angle + 0.4));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

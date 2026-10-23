import { useRef, type PointerEvent } from "react";
import { derivInit, derivRange } from "../content/params.ts";
import { fmt, snap } from "../lib/format.ts";
import { apex, brakeMotion, brakeTimeFromDistance, flightTime, projectile, secantSlope } from "../lib/math.ts";
import { writeParams } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { Live } from "../ui/Live.tsx";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/useLang.ts";
import { Slider } from "../ui/Slider.tsx";
import { useCalm, useClock } from "./clock.ts";
import { clipLine, dashed, dot, drawAxes, drawGrid, halo, makeMap, paintBase, readColors, strokeFn, type Map2, type PlotColors } from "./draw.ts";
import { Graph } from "./Graph.tsx";
import { useLessonState } from "./lessonState.ts";
import { SceneBar } from "./SceneBar.tsx";

type Hit =
  | { kind: "h"; hx: number; hy: number; toH: (px: number) => number }
  | { kind: "time"; hx: number; hy: number; toT: (px: number) => number; max: number }
  | { kind: "brake"; hx: number; hy: number; origin: number; scale: number };

export function DerivativeLab() {
  const lang = useLang();
  const calm = useCalm();
  const { values, ref, patch, play, halt, playing } = useLessonState("derivative", derivInit, derivRange);
  const hit = useRef<Hit | null>(null);
  const dragging = useRef(false);
  const scene = values.scene ?? 0;
  const h = values.h ?? 1;
  const v0 = values.v0 ?? 20;
  const flight = flightTime(v0);
  const time = Math.min(values.time ?? 2, flight);
  const brakeT = values.brake ?? 0;
  const top = apex(v0);
  const ball = projectile(v0, time);
  const motion = brakeMotion(brakeT);
  const slope = secantSlope(1, h);

  const stop = () => {
    halt();
    writeParams("derivative", ref.current);
  };

  useClock(
    playing && scene === 0 && !calm,
    2600,
    false,
    (u) => patch({ h: snap(1.5 + (0 - 1.5) * u, 0.05, -1.5, 1.5) }, true),
    stop,
  );
  useClock(
    playing && scene === 1 && !calm,
    2800,
    false,
    (u) => patch({ time: snap(u * flightTime(ref.current.v0 ?? 20), 0.05, 0, 10) }, true),
    stop,
  );
  useClock(
    playing && scene === 2 && !calm,
    2800,
    false,
    (u) => patch({ brake: snap(u * 5, 0.1, 0, 5) }, true),
    stop,
  );

  const toggle = () => {
    if (calm) return;
    if (playing) {
      stop();
      return;
    }
    play();
    if (scene === 0) patch({ h: 1.5 }, true);
    if (scene === 1) patch({ time: 0 }, true);
    if (scene === 2) patch({ brake: 0 }, true);
  };

  const choose = (next: number) => {
    stop();
    patch({ scene: next });
  };

  const live = scene === 0
    ? t(lang, `Cát tuyến qua x = 1 và x = ${fmt(1 + h)}, hệ số góc ${fmt(slope)}. Tiếp tuyến có hệ số góc 2.`, `Secant through x = 1 and x = ${fmt(1 + h)}, slope ${fmt(slope)}. The tangent slope is 2.`)
    : scene === 1
      ? t(lang, `t = ${fmt(time)} s, cao ${fmt(ball.h)} m, vận tốc ${fmt(ball.v)} m/s. Đỉnh ${fmt(top.h)} m lúc t = ${fmt(top.t)} s.`, `t = ${fmt(time)} s, height ${fmt(ball.h)} m, velocity ${fmt(ball.v)} m/s. Top ${fmt(top.h)} m at t = ${fmt(top.t)} s.`)
      : t(lang, `Phanh t = ${fmt(motion.t)} s, v = ${fmt(motion.v)} m/s, quãng ${fmt(motion.s)} m.`, `Braking t = ${fmt(motion.t)} s, v = ${fmt(motion.v)} m/s, distance ${fmt(motion.s)} m.`);

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const colors = readColors();
    if (scene === 0) hit.current = drawSecant(ctx, width, height, h, colors);
    else if (scene === 1) hit.current = drawThrow(ctx, width, height, v0, time, colors);
    else hit.current = drawBrake(ctx, width, height, brakeT, colors);
  };

  const point = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const apply = (px: number) => {
    const g = hit.current;
    if (!g) return;
    if (g.kind === "h") patch({ h: g.toH(px) });
    if (g.kind === "time") patch({ time: g.toT(px) });
    if (g.kind === "brake") {
      const metres = (px - g.origin) / g.scale;
      patch({ brake: snap(brakeTimeFromDistance(metres), 0.1, 0, 5) });
    }
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

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    apply(point(event).x);
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
          { id: 0, vi: "Cát tuyến", en: "Secant" },
          { id: 1, vi: "Ném bóng", en: "Throw" },
          { id: 2, vi: "Phanh", en: "Brake" },
        ]}
      />
      <div
        className="graph-wrap"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={() => { dragging.current = false; }}
        onPointerCancel={() => { dragging.current = false; }}
      >
        <Graph draw={draw} label={live} />
      </div>
      <Live text={live} />
      {scene === 0 ? (
        <dl className="readout">
          <div><dt>h</dt><dd>{fmt(h)}</dd></div>
          <div><dt>{t(lang, "Cát tuyến", "Secant")}</dt><dd>{fmt(slope)}</dd></div>
          <div><dt>{t(lang, "Rút gọn", "Simplified")}</dt><dd>2 + h</dd></div>
          <div><dt>{t(lang, "Tiếp tuyến", "Tangent")}</dt><dd>2</dd></div>
        </dl>
      ) : null}
      {scene === 1 ? (
        <dl className="readout">
          <div><dt>t</dt><dd>{fmt(time)} s</dd></div>
          <div><dt>h</dt><dd>{fmt(ball.h)} m</dd></div>
          <div><dt>v</dt><dd>{fmt(ball.v)} m/s</dd></div>
          <div><dt>{t(lang, "Đỉnh", "Top")}</dt><dd>{fmt(top.h)} m · t = {fmt(top.t)} s</dd></div>
        </dl>
      ) : null}
      {scene === 2 ? (
        <dl className="readout">
          <div><dt>t</dt><dd>{fmt(motion.t)} s</dd></div>
          <div><dt>v</dt><dd>{fmt(motion.v)} m/s</dd></div>
          <div><dt>s</dt><dd>{fmt(motion.s)} m</dd></div>
          <div><dt>{t(lang, "Khi dừng", "When it stops")}</dt><dd>50 m · 5 s</dd></div>
        </dl>
      ) : null}
      {scene === 0 ? <Slider label="h" min={-1.5} max={1.5} step={0.05} value={h} onChange={(next) => { stop(); patch({ h: next }); }} /> : null}
      {scene === 1 ? (
        <>
          <Slider label="v₀" min={8} max={30} step={1} suffix=" m/s" value={v0} onChange={(next) => { stop(); patch({ v0: next, time: Math.min(time, flightTime(next)) }); }} />
          <Slider label="t" min={0} max={flight} step={0.05} suffix=" s" value={time} onChange={(next) => { stop(); patch({ time: next }); }} />
        </>
      ) : null}
      {scene === 2 ? <Slider label="t" min={0} max={5} step={0.1} suffix=" s" value={brakeT} onChange={(next) => { stop(); patch({ brake: next }); }} /> : null}
      <p className="note">
        <MathText
          text={
            scene === 0
              ? t(lang, "$y=x^2$: cát tuyến $2+h$, tiếp tuyến $2$. $f'(2)=4$.", "$y=x^2$: secant $2+h$, tangent $2$. $f'(2)=4$.")
              : scene === 1
                ? t(lang, "$h=20t-5t^2$. Đỉnh $t=2$, $h=20$. $h(1)=15$.", "$h=20t-5t^2$. Apex $t=2$, $h=20$. $h(1)=15$.")
                : t(lang, "$v=20-4t=0$ tại $t=5$. $s(5)=50$.", "$v=20-4t=0$ at $t=5$. $s(5)=50$.")
          }
        />
      </p>
    </div>
  );
}

function drawSecant(ctx: CanvasRenderingContext2D, width: number, height: number, h: number, colors: PlotColors): Hit {
  const pad = 34;
  const x0 = -1;
  const x1 = 4;
  const y0 = -1;
  const y1 = 10;
  const map = makeMap(width, height, pad, x0, x1, y0, y1);
  paintBase(ctx, width, height, colors);
  drawGrid(ctx, map, x0, x1, y0, y1, colors);
  drawAxes(ctx, map, x0, x1, y0, y1, colors, "x", "y", width, pad);
  strokeFn(ctx, map, width, height, pad, x0, x1, (x) => x * x, colors.ink, 2);
  clipLine(ctx, map, width, height, pad, 1, 1, 2, colors.curve, 1.6);
  if (Math.abs(h) > 0.02) clipLine(ctx, map, width, height, pad, 1, 1, 2 + h, colors.alt, 2);
  const bx = 1 + h;
  const by = bx * bx;
  dot(ctx, map.x(1), map.y(1), colors.curve, colors.bg, 5);
  dot(ctx, map.x(bx), map.y(by), colors.alt, colors.bg, 7);
  halo(ctx, "A", map.x(1) - 12, map.y(1) - 12, colors.curve, colors.bg);
  halo(ctx, "B", map.x(bx) + 12, map.y(by) - 12, colors.alt, colors.bg, "left");
  halo(ctx, `2 + h = ${fmt(2 + h)}`, width / 2, pad + 16, colors.alt, colors.bg);
  return {
    kind: "h",
    hx: map.x(bx),
    hy: map.y(by),
    toH: (px) => snap(map.toX(px) - 1, 0.05, -1.5, 1.5),
  };
}

function drawThrow(ctx: CanvasRenderingContext2D, width: number, height: number, v0: number, time: number, colors: PlotColors): Hit {
  const pad = 36;
  const flight = flightTime(v0);
  const top = apex(v0);
  const y1 = Math.max(4, top.h * 1.28);
  const map = makeMap(width, height, pad, 0, Math.max(flight, 0.5), -y1 * 0.08, y1);
  paintBase(ctx, width, height, colors);
  drawGrid(ctx, map, 0, flight, 0, y1, colors);
  drawAxes(ctx, map, 0, flight, -y1 * 0.08, y1, colors, "t (s)", "h (m)", width, pad);
  strokeFn(ctx, map, width, height, pad, 0, flight, (t) => v0 * t - 5 * t * t, colors.curve, 2.4);
  dashed(ctx, map.x(top.t), map.y(0), map.x(top.t), map.y(top.h), colors.soft);
  dot(ctx, map.x(top.t), map.y(top.h), colors.bg, colors.curve, 4);
  const here = projectile(v0, time);
  const bx = map.x(time);
  const by = map.y(here.h);
  dot(ctx, bx, by, colors.alt, colors.bg, 7);
  const arrow = -here.v * (28 / Math.max(8, v0));
  ctx.strokeStyle = colors.alt;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(bx + 16, by);
  ctx.lineTo(bx + 16, by + arrow);
  ctx.stroke();
  halo(ctx, `${fmt(here.h)} m`, bx, by - 16, colors.ink, colors.bg);
  return { kind: "time", hx: bx, hy: by, max: flight, toT: (px) => snap(clampX(map, px, flight), 0.05, 0, flight) };
}

function clampX(map: Map2, px: number, max: number): number {
  return Math.min(max, Math.max(0, map.toX(px)));
}

function drawBrake(ctx: CanvasRenderingContext2D, width: number, height: number, t: number, colors: PlotColors): Hit {
  paintBase(ctx, width, height, colors);
  const pad = 36;
  const ground = height * 0.62;
  const scale = (width - pad * 2) / 60;
  const origin = pad;
  const motion = brakeMotion(t);
  const x = origin + motion.s * scale;
  ctx.strokeStyle = colors.axis;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad, ground);
  ctx.lineTo(width - pad, ground);
  ctx.stroke();
  for (const mark of [0, 50]) {
    const mx = origin + mark * scale;
    ctx.strokeStyle = colors.soft;
    ctx.beginPath();
    ctx.moveTo(mx, ground - 8);
    ctx.lineTo(mx, ground + 8);
    ctx.stroke();
    halo(ctx, mark === 0 ? "0" : "50 m", mx, ground + 22, colors.ink, colors.bg);
  }
  ctx.fillStyle = colors.alt;
  roundCar(ctx, x, ground, colors.ink);
  halo(ctx, `${fmt(motion.v)} m/s`, x, ground - 46, colors.alt, colors.bg);
  halo(ctx, `${fmt(motion.s)} m`, x, ground - 64, colors.ink, colors.bg);
  return { kind: "brake", hx: x, hy: ground - 16, origin, scale };
}

function roundCar(ctx: CanvasRenderingContext2D, x: number, ground: number, wheel: string) {
  ctx.beginPath();
  ctx.roundRect(x - 16, ground - 28, 32, 16, 4);
  ctx.fill();
  ctx.fillStyle = wheel;
  ctx.beginPath();
  ctx.arc(x - 8, ground - 10, 4, 0, Math.PI * 2);
  ctx.arc(x + 8, ground - 10, 4, 0, Math.PI * 2);
  ctx.fill();
}

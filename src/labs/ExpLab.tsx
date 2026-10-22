import { useRef, useState, type PointerEvent } from "react";
import { expInit, expRange } from "../content/params.ts";
import { fmt, snap } from "../lib/format.ts";
import { baseOk, compoundAmount, decayMass, expY, logY, simpleAmount, yearsToDouble } from "../lib/math.ts";
import { writeParams } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { Live } from "../ui/Live.tsx";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/Prefs.tsx";
import { Slider } from "../ui/Slider.tsx";
import { useCalm, useClock } from "./clock.ts";
import { dashed, dot, drawAxes, drawGrid, halo, makeMap, paintBase, readColors, strokeFn, type Map2, type PlotColors } from "./draw.ts";
import { Graph } from "./Graph.tsx";
import { useLessonState } from "./lessonState.ts";
import { SceneBar } from "./SceneBar.tsx";

type Hit = { hx: number; hy: number; hx2: number; hy2: number; to: (px: number) => number; to2: (px: number) => number };

const NONE: Hit = { hx: -999, hy: -999, hx2: -999, hy2: -999, to: () => 0, to2: () => 0 };

export function ExpLab() {
  const lang = useLang();
  const calm = useCalm();
  const { values, ref, patch, play, halt, isPlaying } = useLessonState("exp", expInit, expRange);
  const [on, setOn] = useState(false);
  const hit = useRef<Hit>(NONE);
  const which = useRef<1 | 2>(1);
  const dragging = useRef(false);
  const scene = values.scene ?? 0;
  const base = values.base ?? 2;
  const x = values.x ?? 2;
  const rate = values.rate ?? 8;
  const years = values.years ?? 5;
  const massTime = values.massTime ?? 20;
  const allowed = baseOk(base);
  const compound = compoundAmount(rate, years);
  const simple = simpleAmount(rate, years);
  const doubling = yearsToDouble(rate);
  const mass = decayMass(massTime);

  const stop = () => {
    halt();
    setOn(false);
    writeParams("exp", ref.current);
  };

  useClock(on && scene === 0 && !calm, 3200, false, (u) => patch({ x: snap(-1.5 + 4.5 * u, 0.1, -2, 3) }, true), stop);
  useClock(on && scene === 1 && !calm, 3400, false, (u) => patch({ years: snap(15 * u, 1, 0, 15) }, true), stop);
  useClock(on && scene === 2 && !calm, 3600, false, (u) => patch({ massTime: snap(40 * u, 1, 0, 40) }, true), stop);

  const toggle = () => {
    if (calm) return;
    if (isPlaying()) {
      stop();
      return;
    }
    play();
    setOn(true);
    if (scene === 0) patch({ x: -1.5 }, true);
    if (scene === 1) patch({ years: 0 }, true);
    if (scene === 2) patch({ massTime: 0 }, true);
  };

  const choose = (next: number) => {
    stop();
    patch({ scene: next });
  };

  const live = scene === 0
    ? allowed
      ? t(
          lang,
          `Cơ số ${fmt(base)}. Tại x = ${fmt(x)}, aˣ = ${fmt(expY(base, x))}. Điểm đối xứng qua y = x nằm trên logarit.`,
          `Base ${fmt(base)}. At x = ${fmt(x)}, aˣ = ${fmt(expY(base, x))}. The mirror across y = x sits on the logarithm.`,
        )
      : t(lang, "Cơ số 1 không dùng được: 1 mũ x luôn là 1, và logarit không xác định.", "Base 1 is not allowed: 1 to any power is 1, and the logarithm is undefined.")
    : scene === 1
      ? t(
          lang,
          `Lãi ${fmt(rate)}%, sau ${fmt(years)} năm: kép ${fmt(compound)} triệu, đơn ${fmt(simple)} triệu. Gấp đôi khoảng ${fmt(doubling)} năm.`,
          `Rate ${fmt(rate)}%, after ${fmt(years)} years: compound ${fmt(compound)} triệu, simple ${fmt(simple)} triệu. Doubling takes about ${fmt(doubling)} years.`,
        )
      : t(
          lang,
          `Sau ${fmt(massTime)} năm còn ${fmt(mass)} g. Trên thang log₁₀ đường này thẳng. Sau 20 năm là 20 g, không phải 40 g.`,
          `After ${fmt(massTime)} years, ${fmt(mass)} g remain. On a log₁₀ scale this is a straight line. After 20 years that is 20 g, not 40 g.`,
        );

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const colors = readColors();
    if (scene === 0) hit.current = drawBase(ctx, width, height, base, x, colors);
    else if (scene === 1) hit.current = drawInterest(ctx, width, height, rate, years, colors);
    else hit.current = drawDecay(ctx, width, height, massTime, colors);
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
    apply(p.x);
  };

  const apply = (px: number) => {
    const g = hit.current;
    const next = which.current === 2 ? g.to2(px) : g.to(px);
    if (scene === 0) patch({ x: next });
    else if (scene === 1) patch({ years: next });
    else patch({ massTime: next });
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
          { id: 0, vi: "Cơ số", en: "Base" },
          { id: 1, vi: "Lãi kép", en: "Compound" },
          { id: 2, vi: "Phân rã", en: "Decay" },
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
          <div><dt>a</dt><dd>{fmt(base)}</dd></div>
          <div><dt>x</dt><dd>{fmt(x)}</dd></div>
          <div><dt>aˣ</dt><dd>{allowed ? fmt(expY(base, x)) : "—"}</dd></div>
          <div><dt>log</dt><dd>{allowed && expY(base, x) > 0 ? fmt(x) : "—"}</dd></div>
        </dl>
      ) : null}
      {scene === 1 ? (
        <dl className="readout">
          <div><dt>{t(lang, "Kép", "Compound")}</dt><dd>{fmt(compound)} {t(lang, "triệu", "triệu")}</dd></div>
          <div><dt>{t(lang, "Đơn", "Simple")}</dt><dd>{fmt(simple)} {t(lang, "triệu", "triệu")}</dd></div>
          <div className="wide"><dt>{t(lang, "Gấp đôi", "Doubles in")}</dt><dd>{fmt(doubling)} {t(lang, "năm", "years")}</dd></div>
        </dl>
      ) : null}
      {scene === 2 ? (
        <dl className="readout">
          <div><dt>t</dt><dd>{fmt(massTime)} {t(lang, "năm", "years")}</dd></div>
          <div><dt>M</dt><dd>{fmt(mass)} g</dd></div>
          <div><dt>log₁₀ M</dt><dd>{fmt(Math.log10(mass))}</dd></div>
          <div><dt>t = 20</dt><dd>20 g</dd></div>
        </dl>
      ) : null}
      {scene === 0 ? (
        <>
          <Slider label={t(lang, "Cơ số a", "Base a")} min={0.2} max={4} step={0.1} value={base} onChange={(next) => { stop(); patch({ base: next }); }} />
          <Slider label="x" min={-2} max={3} step={0.1} value={x} onChange={(next) => { stop(); patch({ x: next }); }} />
        </>
      ) : null}
      {scene === 1 ? (
        <>
          <Slider label={t(lang, "Lãi suất", "Rate")} min={1} max={20} step={1} suffix="%" value={rate} onChange={(next) => { stop(); patch({ rate: next }); }} />
          <Slider label={t(lang, "Số năm", "Years")} min={0} max={15} step={1} value={years} onChange={(next) => { stop(); patch({ years: next }); }} />
        </>
      ) : null}
      {scene === 2 ? (
        <Slider label="t" min={0} max={40} step={1} suffix={t(lang, " năm", " years")} value={massTime} onChange={(next) => { stop(); patch({ massTime: next }); }} />
      ) : null}
      <p className="note">
        <MathText
          text={
            scene === 0
              ? t(lang, "$2^3=8$, $\\log_2 8=3$. $\\log2+\\log3=\\log6\\neq\\log5$. $a\\neq1$.", "$2^3=8$, $\\log_2 8=3$. $\\log2+\\log3=\\log6\\neq\\log5$. $a\\neq1$.")
              : scene === 1
                ? t(lang, "$10(1{,}08)^5\\approx14{,}69\\neq14$. $\\dfrac{\\ln2}{\\ln(1{,}08)}\\approx9{,}01$.", "$10(1{,}08)^5\\approx14{,}69\\neq14$. $\\dfrac{\\ln2}{\\ln(1{,}08)}\\approx9{,}01$.")
                : t(lang, "$80\\cdot(\\frac12)^2=20$. $\\log_{10}$: thẳng.", "$80\\cdot(\\frac12)^2=20$. $\\log_{10}$: a line.")
          }
        />
      </p>
    </div>
  );
}

function drawBase(ctx: CanvasRenderingContext2D, width: number, height: number, base: number, x: number, colors: PlotColors): Hit {
  const pad = 32;
  const x0 = -2;
  const x1 = 6;
  const y0 = -1.5;
  const y1 = 8;
  const map = makeMap(width, height, pad, x0, x1, y0, y1);
  paintBase(ctx, width, height, colors);
  drawGrid(ctx, map, x0, x1, y0, y1, colors);
  drawAxes(ctx, map, x0, x1, y0, y1, colors, "x", "y", width, pad);
  dashed(ctx, map.x(y0), map.y(y0), map.x(Math.min(x1, y1)), map.y(Math.min(x1, y1)), colors.soft);
  if (!baseOk(base)) {
    halo(ctx, "a = 1", width / 2, height / 2, colors.alt, colors.bg);
    const px = map.x(x);
    return { hx: px, hy: map.y(1), hx2: -999, hy2: -999, to: (clientX) => snap(map.toX(clientX), 0.1, -2, 3), to2: () => 0 };
  }
  strokeFn(ctx, map, width, height, pad, x0, x1, (value) => expY(base, value), colors.curve);
  strokeFn(ctx, map, width, height, pad, 0.05, x1, (value) => logY(base, value), colors.alt);
  const y = expY(base, x);
  const px = map.x(x);
  const py = clampY(map, y, y0, y1);
  dot(ctx, px, py, colors.curve, colors.bg, 6);
  halo(ctx, `aˣ = ${fmt(y)}`, px, Math.max(pad + 14, py - 16), colors.ink, colors.bg);
  if (y > 0.05 && y <= x1 && x >= y0 && x <= y1) dot(ctx, map.x(y), map.y(x), colors.alt, colors.bg, 5);
  return { hx: px, hy: py, hx2: -999, hy2: -999, to: (clientX) => snap(map.toX(clientX), 0.1, -2, 3), to2: () => 0 };
}

function drawInterest(ctx: CanvasRenderingContext2D, width: number, height: number, rate: number, years: number, colors: PlotColors): Hit {
  const pad = 36;
  const x0 = 0;
  const x1 = 15;
  const y0 = 0;
  const y1 = 40;
  const map = makeMap(width, height, pad, x0, x1, y0, y1);
  paintBase(ctx, width, height, colors);
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = colors.grid;
  ctx.lineWidth = 1;
  for (let year = 0; year <= 15; year += 5) {
    ctx.moveTo(map.x(year), map.y(y0));
    ctx.lineTo(map.x(year), map.y(y1));
  }
  for (let money = 0; money <= 40; money += 10) {
    ctx.moveTo(map.x(x0), map.y(money));
    ctx.lineTo(map.x(x1), map.y(money));
  }
  ctx.stroke();
  ctx.restore();
  drawAxes(ctx, map, x0, x1, y0, y1, colors, "n", "triệu", width, pad);
  dashed(ctx, map.x(0), map.y(20), map.x(15), map.y(20), colors.soft);
  halo(ctx, "gấp đôi", map.x(15) - 8, map.y(20) - 12, colors.soft, colors.bg, "right");
  strokeFn(ctx, map, width, height, pad, 0, 15, (n) => compoundAmount(rate, n), colors.curve);
  strokeFn(ctx, map, width, height, pad, 0, 15, (n) => simpleAmount(rate, n), colors.alt, 1.8);
  const y = compoundAmount(rate, years);
  const px = map.x(years);
  const py = clampY(map, y, y0, y1);
  dot(ctx, px, py, colors.curve, colors.bg, 6);
  halo(ctx, fmt(y), px, Math.max(pad + 14, py - 16), colors.ink, colors.bg);
  dot(ctx, px, clampY(map, simpleAmount(rate, years), y0, y1), colors.alt, colors.bg, 4);
  return { hx: px, hy: py, hx2: -999, hy2: -999, to: (clientX) => snap(map.toX(clientX), 1, 0, 15), to2: () => 0 };
}

function drawDecay(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, colors: PlotColors): Hit {
  const wide = width >= 560;
  const gap = 18;
  const panels = wide
    ? [
        { x: 28, y: 28, w: (width - 56 - gap) / 2, h: height - 56 },
        { x: 28 + (width - 56 - gap) / 2 + gap, y: 28, w: (width - 56 - gap) / 2, h: height - 56 },
      ]
    : [
        { x: 28, y: 16, w: width - 56, h: (height - 44) / 2 },
        { x: 28, y: 16 + (height - 44) / 2 + 12, w: width - 56, h: (height - 44) / 2 },
      ];
  paintBase(ctx, width, height, colors);
  const linear = panelMap(panels[0]!, 0, 40, 0, 100);
  const logMap = panelMap(panels[1]!, 0, 40, 0.4, 2.2);
  frame(ctx, panels[0]!, colors);
  frame(ctx, panels[1]!, colors);
  halo(ctx, "tuyến tính", panels[0]!.x + 8, panels[0]!.y + 12, colors.soft, colors.bg, "left");
  halo(ctx, "log₁₀", panels[1]!.x + 8, panels[1]!.y + 12, colors.soft, colors.bg, "left");
  const clip0 = { x: panels[0]!.x, y: panels[0]!.y, w: panels[0]!.w, h: panels[0]!.h };
  const clip1 = { x: panels[1]!.x, y: panels[1]!.y, w: panels[1]!.w, h: panels[1]!.h };
  strokeFn(ctx, linear, width, height, 0, 0, 40, (t) => decayMass(t), colors.curve, 2.4, clip0);
  strokeFn(ctx, logMap, width, height, 0, 0, 40, (t) => Math.log10(decayMass(t)), colors.alt, 2.4, clip1);
  const mass = decayMass(time);
  const px = linear.x(time);
  const py = linear.y(mass);
  const lx = logMap.x(time);
  const ly = logMap.y(Math.log10(mass));
  dot(ctx, px, py, colors.curve, colors.bg, 6);
  dot(ctx, lx, ly, colors.alt, colors.bg, 5);
  halo(ctx, `${fmt(mass)} g`, px, Math.max(panels[0]!.y + 26, py - 14), colors.ink, colors.bg);
  return {
    hx: px,
    hy: py,
    hx2: lx,
    hy2: ly,
    to: (clientX) => snap(linear.toX(clientX), 1, 0, 40),
    to2: (clientX) => snap(logMap.toX(clientX), 1, 0, 40),
  };
}

function panelMap(panel: { x: number; y: number; w: number; h: number }, x0: number, x1: number, y0: number, y1: number): Map2 {
  return {
    x: (value) => panel.x + ((value - x0) / (x1 - x0)) * panel.w,
    y: (value) => panel.y + ((y1 - value) / (y1 - y0)) * panel.h,
    toX: (px) => x0 + ((px - panel.x) / panel.w) * (x1 - x0),
    toY: (py) => y1 - ((py - panel.y) / panel.h) * (y1 - y0),
  };
}

function frame(ctx: CanvasRenderingContext2D, panel: { x: number; y: number; w: number; h: number }, colors: PlotColors) {
  ctx.save();
  ctx.strokeStyle = colors.grid;
  ctx.lineWidth = 1;
  ctx.strokeRect(panel.x, panel.y, panel.w, panel.h);
  ctx.restore();
}

function clampY(map: Map2, y: number, y0: number, y1: number): number {
  return map.y(Math.min(y1, Math.max(y0, y)));
}

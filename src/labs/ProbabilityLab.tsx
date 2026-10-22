import { useRef, type PointerEvent } from "react";
import { chanceInit, chanceRange } from "../content/params.ts";
import { fmt, snap } from "../lib/format.ts";
import { bayes, binom, binomAtLeastOne, diceCondition } from "../lib/math.ts";
import { writeParams } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { Live } from "../ui/Live.tsx";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/Prefs.tsx";
import { Slider } from "../ui/Slider.tsx";
import { useCalm, useClock } from "./clock.ts";
import { halo, paintBase, readColors, type PlotColors } from "./draw.ts";
import { Graph } from "./Graph.tsx";
import { useLessonState } from "./lessonState.ts";
import { SceneBar } from "./SceneBar.tsx";

type Hit = { hx: number; hy: number; to: (px: number, py: number) => number } | null;

export function ProbabilityLab() {
  const lang = useLang();
  const calm = useCalm();
  const { values, ref, patch, play, halt, playing } = useLessonState("probability", chanceInit, chanceRange);
  const hit = useRef<Hit>(null);
  const dragging = useRef(false);
  const scene = values.scene ?? 0;
  const face = values.face ?? 6;
  const prev = values.prev ?? 1;
  const sens = values.sens ?? 99;
  const fpr = values.fpr ?? 5;
  const n = values.n ?? 3;
  const k = Math.min(values.k ?? 2, n);
  const p = values.p ?? 0.5;
  const dice = diceCondition(face);
  const test = bayes(prev, sens, fpr);
  const exact = binom(n, k, p);
  const least = binomAtLeastOne(n, p);

  const stop = () => {
    halt();
    writeParams("probability", ref.current);
  };

  useClock(playing && scene === 0 && !calm, 3000, false, (u) => patch({ face: snap(1 + 5 * u, 1, 1, 6) }, true), stop);
  useClock(playing && scene === 1 && !calm, 3200, false, (u) => patch({ prev: snap(1 + 19 * u, 1, 1, 20) }, true), stop);
  useClock(
    playing && scene === 2 && !calm,
    2800,
    false,
    (u) => {
      const trials = ref.current.n ?? 3;
      patch({ k: snap(Math.round(trials * u), 1, 0, trials) }, true);
    },
    stop,
  );

  const toggle = () => {
    if (calm) return;
    if (playing) {
      stop();
      return;
    }
    play();
    if (scene === 0) patch({ face: 1 }, true);
    if (scene === 1) patch({ prev: 1 }, true);
    if (scene === 2) patch({ k: 0 }, true);
  };

  const choose = (next: number) => {
    stop();
    patch({ scene: next });
  };

  const posterior = famous(test) ? "1/6" : fmt(test.posterior);
  const pmf = fairCoin(n, p) ? coinFraction(n, exact) : fmt(exact);
  const leastText = fairCoin(n, p) ? coinFraction(n, least) : fmt(least);

  const live = scene === 0
    ? t(
        lang,
        `Ít nhất một mặt ${fmt(face)}: còn ${dice.remain} cặp. Cả hai mặt đó: ${dice.both}/${dice.remain}.`,
        `At least one ${fmt(face)}: ${dice.remain} pairs remain. Both that face: ${dice.both}/${dice.remain}.`,
      )
    : scene === 1
      ? t(
          lang,
          `Dương thật ${fmt(test.tp)}, dương giả ${fmt(test.fp)}. Khi đã dương: ${posterior}.`,
          `True positives ${fmt(test.tp)}, false positives ${fmt(test.fp)}. After a positive result: ${posterior}.`,
        )
      : t(
          lang,
          `n = ${fmt(n)}, đúng ${fmt(k)} lần: ${pmf}. Ít nhất một lần: ${leastText}.`,
          `n = ${fmt(n)}, exactly ${fmt(k)}: ${pmf}. At least one: ${leastText}.`,
        );

  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const colors = readColors();
    if (scene === 0) hit.current = drawDice(ctx, width, height, face, colors);
    else if (scene === 1) {
      hit.current = null;
      drawBayes(ctx, width, height, test.tp, test.fp, colors);
    } else hit.current = drawBars(ctx, width, height, n, k, p, colors);
  };

  const point = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const onDown = (event: PointerEvent<HTMLDivElement>) => {
    const g = hit.current;
    if (!g) return;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    stop();
    apply(point(event));
  };

  const apply = (pxy: { x: number; y: number }) => {
    const g = hit.current;
    if (!g) return;
    const next = g.to(pxy.x, pxy.y);
    if (scene === 0) patch({ face: next });
    if (scene === 2) patch({ k: Math.min(n, next) });
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
          { id: 0, vi: "Xúc xắc", en: "Dice" },
          { id: 1, vi: "Xét nghiệm", en: "Test" },
          { id: 2, vi: "Nhị thức", en: "Binomial" },
        ]}
      />
      <div
        className="graph-wrap"
        onPointerDown={onDown}
        onPointerMove={(event) => {
          if (!dragging.current) return;
          apply(point(event));
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
          <div><dt>{t(lang, "Mặt", "Face")}</dt><dd>{fmt(face)}</dd></div>
          <div><dt>{t(lang, "Còn lại", "Remain")}</dt><dd>{dice.remain}</dd></div>
          <div><dt>{t(lang, "Cả hai", "Both")}</dt><dd>{dice.both}</dd></div>
          <div><dt>P</dt><dd>{dice.both}/{dice.remain}</dd></div>
        </dl>
      ) : null}
      {scene === 1 ? (
        <dl className="readout">
          <div><dt>{t(lang, "Dương thật", "True positive")}</dt><dd>{fmt(test.tp)}</dd></div>
          <div><dt>{t(lang, "Dương giả", "False positive")}</dt><dd>{fmt(test.fp)}</dd></div>
          <div className="wide"><dt>{t(lang, "Khi đã dương", "After a positive")}</dt><dd>{posterior}</dd></div>
        </dl>
      ) : null}
      {scene === 2 ? (
        <dl className="readout">
          <div><dt>n</dt><dd>{fmt(n)}</dd></div>
          <div><dt>k</dt><dd>{fmt(k)}</dd></div>
          <div><dt>P(X = k)</dt><dd>{pmf}</dd></div>
          <div><dt>P(X ≥ 1)</dt><dd>{leastText}</dd></div>
        </dl>
      ) : null}
      {scene === 0 ? (
        <Slider label={t(lang, "Mặt đã biết", "Known face")} min={1} max={6} step={1} value={face} onChange={(next) => { stop(); patch({ face: next }); }} />
      ) : null}
      {scene === 1 ? (
        <>
          <Slider label={t(lang, "Tỉ lệ bệnh", "Prevalence")} min={1} max={20} step={1} suffix="%" value={prev} onChange={(next) => { stop(); patch({ prev: next }); }} />
          <Slider label={t(lang, "Độ nhạy", "Sensitivity")} min={50} max={100} step={1} suffix="%" value={sens} onChange={(next) => { stop(); patch({ sens: next }); }} />
          <Slider label={t(lang, "Dương giả", "False positive")} min={1} max={30} step={1} suffix="%" value={fpr} onChange={(next) => { stop(); patch({ fpr: next }); }} />
        </>
      ) : null}
      {scene === 2 ? (
        <>
          <Slider label="n" min={1} max={8} step={1} value={n} onChange={(next) => { stop(); patch({ n: next, k: Math.min(k, next) }); }} />
          <Slider label="k" min={0} max={n} step={1} value={k} onChange={(next) => { stop(); patch({ k: next }); }} />
          <Slider label="p" min={0.1} max={0.9} step={0.1} value={p} onChange={(next) => { stop(); patch({ p: next }); }} />
        </>
      ) : null}
      <p className="note">
        <MathText
          text={
            scene === 0
              ? t(lang, "Ít nhất một $6$: $11$ cặp, $P=\\frac1{11}$. Hai con: $\\frac13$.", "At least one $6$: $11$ pairs, $P=\\frac1{11}$. Two children: $\\frac13$.")
              : scene === 1
                ? t(lang, "$\\frac{99}{99+495}=\\frac16\\neq99\\%$.", "$\\frac{99}{99+495}=\\frac16\\neq99\\%$.")
                : t(lang, "$C(3,2)(\\frac12)^3=\\frac38$. Ít nhất một ngửa: $\\frac78$.", "$C(3,2)(\\frac12)^3=\\frac38$. At least one head: $\\frac78$.")
          }
        />
      </p>
    </div>
  );
}

function famous(test: { tp: number; fp: number; posterior: number }): boolean {
  return Math.abs(test.tp - 99) < 1e-6 && Math.abs(test.fp - 495) < 1e-6 && Math.abs(test.posterior - 1 / 6) < 1e-9;
}

function fairCoin(n: number, p: number): boolean {
  return Math.abs(p - 0.5) < 1e-9 && n <= 8;
}

function coinFraction(trials: number, value: number): string {
  const den = 2 ** Math.round(trials);
  const num = Math.round(value * den);
  if (Math.abs(value - num / den) > 1e-9) return fmt(value);
  let x = Math.abs(num);
  let y = Math.abs(den);
  while (y) {
    const next = x % y;
    x = y;
    y = next;
  }
  const gcd = x || 1;
  return `${num / gcd}/${den / gcd}`;
}

function drawDice(ctx: CanvasRenderingContext2D, width: number, height: number, face: number, colors: PlotColors): Hit {
  paintBase(ctx, width, height, colors);
  const f = Math.round(face);
  const size = Math.min(width - 56, height - 72);
  const cell = size / 6;
  const left = (width - size) / 2;
  const top = 24;
  for (let row = 1; row <= 6; row += 1) {
    for (let col = 1; col <= 6; col += 1) {
      const on = row === f || col === f;
      const both = row === f && col === f;
      ctx.fillStyle = both ? colors.alt : on ? colors.curve : colors.bg;
      ctx.globalAlpha = both ? 0.9 : on ? 0.28 : 1;
      ctx.fillRect(left + (col - 1) * cell, top + (row - 1) * cell, cell - 2, cell - 2);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = colors.grid;
      ctx.strokeRect(left + (col - 1) * cell, top + (row - 1) * cell, cell - 2, cell - 2);
    }
  }
  ctx.fillStyle = colors.soft;
  ctx.font = "12px 'Be Vietnam Pro', sans-serif";
  ctx.textAlign = "center";
  for (let i = 1; i <= 6; i += 1) {
    ctx.fillText(String(i), left + (i - 0.5) * cell, top - 8);
    ctx.fillText(String(i), left - 12, top + (i - 0.5) * cell);
  }
  const count = diceCondition(f);
  halo(ctx, `${count.remain} · ${count.both}/${count.remain}`, width / 2, top + size + 16, colors.ink, colors.bg);
  return {
    hx: left + size / 2,
    hy: top + size / 2,
    to: (px, py) => {
      const col = Math.min(6, Math.max(1, Math.floor((px - left) / cell) + 1));
      const row = Math.min(6, Math.max(1, Math.floor((py - top) / cell) + 1));
      return row === f ? col : row;
    },
  };
}

function drawBayes(ctx: CanvasRenderingContext2D, width: number, height: number, tp: number, fp: number, colors: PlotColors) {
  paintBase(ctx, width, height, colors);
  const total = Math.max(1, tp + fp);
  const pad = 28;
  const barW = width - pad * 2;
  const y = height * 0.42;
  const h = 36;
  const trueW = (tp / total) * barW;
  ctx.fillStyle = colors.curve;
  ctx.fillRect(pad, y, trueW, h);
  ctx.fillStyle = colors.alt;
  ctx.globalAlpha = 0.85;
  ctx.fillRect(pad + trueW, y, barW - trueW, h);
  ctx.globalAlpha = 1;
  halo(ctx, tBar(tp), pad + Math.max(24, trueW / 2), y + h / 2, colors.bg, colors.curve);
  halo(ctx, tBar(fp), pad + trueW + (barW - trueW) / 2, y + h / 2, colors.bg, colors.alt);
  halo(ctx, `${fmt(tp)} / ${fmt(total)}`, width / 2, y + h + 28, colors.ink, colors.bg);
}

function tBar(n: number): string {
  return n >= 10 ? fmt(n) : "";
}

function drawBars(ctx: CanvasRenderingContext2D, width: number, height: number, n: number, k: number, p: number, colors: PlotColors): Hit {
  paintBase(ctx, width, height, colors);
  const nn = Math.round(n);
  const pad = 28;
  const base = height - 32;
  const slot = (width - pad * 2) / (nn + 1);
  let peak = 0.0001;
  for (let i = 0; i <= nn; i += 1) peak = Math.max(peak, binom(nn, i, p));
  const usable = base - 36;
  for (let i = 0; i <= nn; i += 1) {
    const value = binom(nn, i, p);
    const barH = (value / peak) * usable;
    const x = pad + i * slot;
    ctx.fillStyle = i === Math.round(k) ? colors.curve : colors.alt;
    ctx.globalAlpha = i === Math.round(k) ? 0.9 : 0.45;
    ctx.fillRect(x, base - barH, Math.max(4, slot - 8), barH);
    ctx.globalAlpha = 1;
    ctx.fillStyle = colors.soft;
    ctx.font = "12px 'Be Vietnam Pro', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(String(i), x + (slot - 8) / 2, base + 16);
  }
  const kx = pad + Math.round(k) * slot + (slot - 8) / 2;
  return {
    hx: kx,
    hy: base - 20,
    to: (px) => snap((px - pad) / slot, 1, 0, nn),
  };
}

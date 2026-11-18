import { bisection, largestDelta } from "../../algo/index.ts";
import { dashed, dot, strokeFn } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { PlayButtons, useLoop, wave } from "./anim.tsx";
import { frame, label, line, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;

/* ---------- 1. Thu nhỏ ε, δ tự co theo ---------- */

const eps = (phase: number) => 10 ** (-0.3 - 1.7 * wave(phase));

export function EpsilonDeltaAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(60, 0.006);
  const f = (x: number) => x * x;
  const a = 2;
  const L = 4;
  const e = eps(phase);
  const d = largestDelta(f, a, L, e, 1);
  return (
    <Stage
      title={tt("Đưa sai số ε càng nhỏ, bao giờ cũng chỉ ra được δ", "Give any error ε, however small, and a δ can always be found")}
      story={tt(
        R`Muốn nói «$x^2$ tiến về $4$ khi $x\to 2$», ta chơi một trò hai người. Bạn đưa một sai số $\varepsilon$ (dải xanh quanh $4$). Máy phải chỉ ra một độ rộng $\delta$ (dải cam quanh $2$) sao cho mọi $x$ trong dải cam đều cho $x^2$ nằm trong dải xanh. $\varepsilon$ co lại thì $\delta$ cũng co theo, nhưng máy lúc nào cũng tìm được.`,
        R`To say «$x^2$ tends to $4$ as $x\to 2$» we play a two-player game. You give an error $\varepsilon$ (the green band around $4$). The machine must give a width $\delta$ (the orange band around $2$) so that every $x$ in the orange band puts $x^2$ inside the green band. As $\varepsilon$ shrinks so does $\delta$, but the machine can always find one.`,
      )}
      read={tt(
        `$\\varepsilon=${fmt(e, 4)}$ thì máy tìm được $\\delta=${fmt(d, 5)}$ (quét hàng trăm điểm rồi chia đôi). Tỉ số $\\frac{\\delta}{\\varepsilon}=${fmt(d / e, 4)}$, gần $\\frac{1}{4}$.`,
        `With $\\varepsilon=${fmt(e, 4)}$ the machine finds $\\delta=${fmt(d, 5)}$ (scanning hundreds of points, then bisecting). The ratio $\\frac{\\delta}{\\varepsilon}=${fmt(d / e, 4)}$ is close to $\\frac{1}{4}$.`,
      )}
      why={tt(
        R`Gần $x=2$, $|x^2-4|=|x-2|\,|x+2|$ và $|x+2|$ cỡ $4$, nên chỉ cần $|x-2|<\frac{\varepsilon}{4}$ (hơi nhỏ hơn một chút để dư chỗ) là $|x^2-4|<\varepsilon$. Cách chọn $\delta$ theo $\varepsilon$ như vậy chính là định nghĩa giới hạn: với mọi $\varepsilon>0$ tồn tại $\delta>0$.`,
        R`Near $x=2$, $|x^2-4|=|x-2|\,|x+2|$ and $|x+2|$ is about $4$, so $|x-2|<\frac{\varepsilon}{4}$ (a little smaller to leave room) gives $|x^2-4|<\varepsilon$. Choosing $\delta$ from $\varepsilon$ like this is the definition of a limit: for every $\varepsilon>0$ there exists $\delta>0$.`,
      )}
    >
      <Graph
        label={tt("Đồ thị y = x² với dải ε quanh 4 và dải δ quanh 2", "The graph y = x² with the ε band around 4 and the δ band around 2")}
        draw={(ctx, w, hh) => {
          const half = Math.max(0.12, d * 3);
          const { colors, map, pad } = frame(ctx, w, hh, a - half, a + half, L - half * 5, L + half * 5);
          strokeFn(ctx, map, w, hh, pad, a - half, a + half, f, colors.curve, 2.4);
          ctx.save();
          ctx.globalAlpha = 0.25;
          ctx.fillStyle = colors.curve;
          ctx.fillRect(map.x(a - half), map.y(L + e), map.x(a + half) - map.x(a - half), map.y(L - e) - map.y(L + e));
          ctx.fillStyle = colors.alt;
          ctx.fillRect(map.x(a - d), map.y(L + half * 5), map.x(a + d) - map.x(a - d), map.y(L - half * 5) - map.y(L + half * 5));
          ctx.restore();
          dot(ctx, map.x(a), map.y(L), colors.ink, colors.bg, 5);
          label(ctx, `ε = ${fmt(e, 3)}`, map.x(a - half) + 6, map.y(L + e) - 6, colors.curve);
          label(ctx, `δ = ${fmt(d, 4)}`, map.x(a + d) + 6, map.y(L - half * 4), colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Sai số ε co lại", "Error ε shrinking")} value={phase} min={0} max={0.999} step={0.005} onChange={(v) => { setRunning(false); setPhase(v); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 2. Chia đôi bắt nghiệm: định lí giá trị trung gian ---------- */

export function BisectionAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(90, 0.005);
  const f = (x: number) => x * x * x - 2 * x - 1.2;
  const steps = bisection(f, 0, 3, 14);
  const k = Math.min(steps.length - 1, Math.floor(phase * steps.length));
  const cur = steps[k] as { lo: number; hi: number; mid: number; fmid: number };
  return (
    <Stage
      title={tt("Chia đôi liên tiếp: hai đầu vẫn trái dấu, nghiệm bị kẹp lại", "Repeated halving: the ends keep opposite signs, so the root is trapped")}
      story={tt(
        R`Hàm $f(x)=x^3-2x-1{,}2$ âm ở $x=0$ và dương ở $x=3$, nên đồ thị phải cắt trục ở đâu đó. Máy lấy điểm giữa, xem dấu, rồi giữ lại nửa đoạn mà hai đầu vẫn trái dấu. Mỗi lần đoạn ngắn đi một nửa nhưng luôn còn kẹp nghiệm. Sau mười mấy lần, nghiệm được báo với độ chính xác bốn năm chữ số.`,
        R`The function $f(x)=x^3-2x-1.2$ is negative at $x=0$ and positive at $x=3$, so its graph must cross the axis somewhere. The machine takes the midpoint, checks the sign, and keeps the half whose ends still have opposite signs. Each time the interval halves but still traps a root. After a dozen steps the root is known to four or five digits.`,
      )}
      read={tt(
        `Lần ${k + 1}: đoạn $[${fmt(cur.lo, 5)};\\ ${fmt(cur.hi, 5)}]$, dài $${fmt(cur.hi - cur.lo, 5)}$; $f$ ở điểm giữa $${fmt(cur.mid, 5)}$ là $${fmt(cur.fmid, 4)}$.`,
        `Step ${k + 1}: interval $[${fmt(cur.lo, 5)};\\ ${fmt(cur.hi, 5)}]$, length $${fmt(cur.hi - cur.lo, 5)}$; $f$ at the midpoint $${fmt(cur.mid, 5)}$ is $${fmt(cur.fmid, 4)}$.`,
      )}
      why={tt(
        R`Hai đầu của mọi đoạn giữ lại luôn có $f$ trái dấu, và độ dài chỉ còn $\frac{3}{2^k}$. Các đoạn lồng nhau co về một điểm $c$. Vì $f$ liên tục, $f(c)$ vừa là giới hạn của các giá trị âm nên không dương, vừa là giới hạn của các giá trị dương nên không âm. Vậy $f(c)=0$.`,
        R`The ends of every kept interval have opposite signs of $f$, and the length is only $\frac{3}{2^k}$. The nested intervals shrink to a point $c$. Since $f$ is continuous, $f(c)$ is a limit of negative values so it is not positive, and a limit of positive values so it is not negative. Hence $f(c)=0$.`,
      )}
    >
      <Graph
        label={tt("Đồ thị f(x) và đoạn đang kẹp nghiệm", "The graph of f(x) and the interval trapping the root")}
        draw={(ctx, w, hh) => {
          const { colors, map, pad } = frame(ctx, w, hh, -0.3, 3.2, -4, 18);
          strokeFn(ctx, map, w, hh, pad, -0.3, 3.2, f, colors.curve, 2.4);
          ctx.save();
          ctx.globalAlpha = 0.25;
          ctx.fillStyle = colors.alt;
          ctx.fillRect(map.x(cur.lo), map.y(18), map.x(cur.hi) - map.x(cur.lo), map.y(-4) - map.y(18));
          ctx.restore();
          line(ctx, map.x(cur.lo), map.y(0), map.x(cur.lo), map.y(f(cur.lo)), colors.alt, 2);
          line(ctx, map.x(cur.hi), map.y(0), map.x(cur.hi), map.y(f(cur.hi)), colors.alt, 2);
          dashed(ctx, map.x(cur.mid), map.y(0), map.x(cur.mid), map.y(cur.fmid), colors.soft);
          dot(ctx, map.x(cur.mid), map.y(cur.fmid), colors.ink, colors.bg, 5);
          label(ctx, `[${fmt(cur.lo, 3)}; ${fmt(cur.hi, 3)}]`, map.x(0.1), map.y(16), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Lần chia đôi", "Halving step")} value={phase} min={0} max={0.999} step={0.005} onChange={(v) => { setRunning(false); setPhase(v); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 3. Kẹp sin x / x giữa cos x và 1 ---------- */

export function SineSqueezeAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(60, 0.006);
  const x = 10 ** (0.1 - 2.4 * wave(phase));
  const lo = Math.cos(x);
  const mid = Math.sin(x) / x;
  return (
    <Stage
      title={tt("Kẹp sin x / x giữa cos x và 1 khi x về 0", "Squeezing sin x / x between cos x and 1 as x goes to 0")}
      story={tt(
        R`Trên đường tròn bán kính $1$, tam thức nhỏ, hình quạt và tam thức lớn lồng nhau cho $\sin x\le x\le\tan x$, từ đó $\cos x\le\frac{\sin x}{x}\le 1$. Hãy xem ba số này khi $x$ co về $0$: $\cos x$ dâng lên $1$ từ dưới, còn $\frac{\sin x}{x}$ bị kẹp ở giữa nên cũng đành về $1$.`,
        R`On the unit circle the small triangle, the sector and the large triangle are nested and give $\sin x\le x\le\tan x$, hence $\cos x\le\frac{\sin x}{x}\le 1$. Watch the three numbers as $x$ shrinks to $0$: $\cos x$ rises to $1$ from below, and $\frac{\sin x}{x}$, squeezed in between, has no choice but to go to $1$.`,
      )}
      read={tt(
        `$x=${fmt(x, 5)}$: $\\cos x=${fmt(lo, 7)}\\le\\frac{\\sin x}{x}=${fmt(mid, 7)}\\le 1$. Khoảng cách tới $1$ là $${fmt(1 - mid, 8)}$.`,
        `$x=${fmt(x, 5)}$: $\\cos x=${fmt(lo, 7)}\\le\\frac{\\sin x}{x}=${fmt(mid, 7)}\\le 1$. The distance from $1$ is $${fmt(1 - mid, 8)}$.`,
      )}
      why={tt(
        R`Với $0<x<\frac{\pi}{2}$, diện tích tam giác nhỏ $\frac{1}{2}\sin x$, hình quạt $\frac{1}{2}x$ và tam giác lớn $\frac{1}{2}\tan x$ lồng nhau, nên $\sin x\le x\le\tan x$. Chia cho $\sin x>0$ rồi nghịch đảo: $\cos x\le\frac{\sin x}{x}\le 1$. Hai vế kẹp cùng tiến về $1$ nên $\frac{\sin x}{x}\to 1$.`,
        R`For $0<x<\frac{\pi}{2}$ the areas of the small triangle $\frac{1}{2}\sin x$, the sector $\frac{1}{2}x$ and the large triangle $\frac{1}{2}\tan x$ are nested, so $\sin x\le x\le\tan x$. Dividing by $\sin x>0$ and inverting: $\cos x\le\frac{\sin x}{x}\le 1$. The two bounds both tend to $1$, so $\frac{\sin x}{x}\to 1$.`,
      )}
    >
      <Graph
        label={tt("Ba đường cos x, sin x / x và 1 khi x co về 0", "The three curves cos x, sin x / x and 1 as x shrinks to 0")}
        draw={(ctx, w, hh) => {
          const top = Math.max(x * 1.4, 0.05);
          const { colors, map, pad } = frame(ctx, w, hh, 0, top, 1 - top * top / 1.2, 1.0005);
          strokeFn(ctx, map, w, hh, pad, 1e-6, top, (t) => Math.cos(t), colors.soft, 2);
          strokeFn(ctx, map, w, hh, pad, 1e-6, top, (t) => Math.sin(t) / t, colors.curve, 2.6);
          line(ctx, map.x(0), map.y(1), map.x(top), map.y(1), colors.ink, 1.6);
          dashed(ctx, map.x(x), map.y(lo), map.x(x), map.y(1), colors.alt);
          dot(ctx, map.x(x), map.y(mid), colors.curve, colors.bg, 6);
          dot(ctx, map.x(x), map.y(lo), colors.soft, colors.bg, 4);
          label(ctx, "1", map.x(top) - 14, map.y(1) - 6, colors.ink);
          label(ctx, "sin x / x", map.x(top) - 56, map.y(Math.sin(top) / top) - 8, colors.curve);
          label(ctx, "cos x", map.x(top) - 40, map.y(Math.cos(top)) + 16, colors.soft);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("x co lại", "x shrinking")} value={phase} min={0} max={0.999} step={0.005} onChange={(v) => { setRunning(false); setPhase(v); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

import { expSlopeRatio, logRulerPosition } from "../../algo/index.ts";
import { dashed, dot } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { PlayButtons, useLoop, wave } from "./anim.tsx";
import { frame, label, line, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;

/* ---------- 1. Nối hai hàng thừa số: số mũ cộng lại ---------- */

export function PowerRowsAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(60, 0.006);
  // m và n chạy chậm qua các giá trị nguyên: cả hai thay đổi theo pha.
  const m = 1 + Math.floor(phase * 5.999);
  const n = 1 + Math.floor(wave(phase * 2 % 1) * 4.999);
  const join = wave((phase * 6) % 1);
  return (
    <Stage
      title={tt("Nối hai hàng thừa số: số mũ cộng lại", "Joining two rows of factors: the exponents add")}
      story={tt(
        R`Viết $2^m$ là một hàng $m$ ô, mỗi ô là một thừa số $2$. Hàng $2^n$ có $n$ ô. Nhân hai lũy thừa là nối hai hàng vào nhau: hàng mới có $m+n$ ô, chính là $2^{m+n}$. Hai hàng cứ trượt lại gần rồi dính vào nhau, và số ô của hàng mới luôn là tổng của hai hàng cũ.`,
        R`Write $2^m$ as a row of $m$ cells, each cell one factor $2$. The row for $2^n$ has $n$ cells. Multiplying two powers means joining the two rows: the new row has $m+n$ cells, which is $2^{m+n}$. The two rows keep sliding together and fusing, and the new row always has as many cells as the two old rows together.`,
      )}
      read={tt(
        `$m=${m}$, $n=${n}$: $2^${m}\\cdot 2^${n}=${2 ** m}\\cdot ${2 ** n}=${2 ** (m + n)}=2^{${m + n}}$. Hàng nối có ${m + n} ô.`,
        `$m=${m}$, $n=${n}$: $2^${m}\\cdot 2^${n}=${2 ** m}\\cdot ${2 ** n}=${2 ** (m + n)}=2^{${m + n}}$. The joined row has ${m + n} cells.`,
      )}
      why={tt(
        R`Với số mũ nguyên dương, $a^m$ là $m$ thừa số $a$ nhân với nhau. $a^m\cdot a^n$ có thêm $n$ thừa số nữa, tổng $m+n$ thừa số, nên bằng $a^{m+n}$. Quy ước $a^0=1$ là «hàng rỗng», nối thêm hàng rỗng không đổi gì, và $a^{-n}=\frac{1}{a^n}$ là hàng bị gạch đi $n$ ô.`,
        R`For a positive whole exponent, $a^m$ is $m$ factors $a$ multiplied together. $a^m\cdot a^n$ has $n$ more factors, $m+n$ in all, so it equals $a^{m+n}$. The convention $a^0=1$ is the «empty row»: joining an empty row changes nothing, and $a^{-n}=\frac{1}{a^n}$ is a row with $n$ cells crossed out.`,
      )}
    >
      <Graph
        label={tt("Hai hàng ô nối lại thành một hàng", "Two rows of cells joined into one")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, 0, 14, -2, 5, "", "");
          const cell = (x: number, y: number, color: string) => {
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.55;
            ctx.fillRect(map.x(x) + 1, map.y(y + 0.8), map.x(1) - map.x(0) - 2, map.y(0) - map.y(0.8));
            ctx.globalAlpha = 1;
            ctx.strokeStyle = colors.ink;
            ctx.lineWidth = 1;
            ctx.strokeRect(map.x(x) + 1, map.y(y + 0.8), map.x(1) - map.x(0) - 2, map.y(0) - map.y(0.8));
          };
          const gap = (1 - join) * 2;
          for (let i = 0; i < m; i++) cell(i, 3, colors.curve);
          for (let i = 0; i < n; i++) cell(m + gap + i, 3, colors.alt);
          for (let i = 0; i < m; i++) cell(i, 0.5, colors.curve);
          for (let i = 0; i < n; i++) cell(m + i, 0.5, colors.alt);
          label(ctx, `2^${m}`, map.x(0.1), map.y(4.6), colors.curve);
          label(ctx, `2^${n}`, map.x(m + gap + 0.1), map.y(4.6), colors.alt);
          label(ctx, `2^${m + n} = ${2 ** (m + n)}`, map.x(0.1), map.y(-0.9), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Pha chuyển động", "Animation phase")} value={phase} min={0} max={0.999} step={0.005} onChange={(v) => { setRunning(false); setPhase(v); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 2. Thước logarit: tỉ số bằng nhau thì đoạn bằng nhau ---------- */

export function LogRulerAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(50, 0.01);
  const b = 1.5 + 6 * wave(phase);
  const c = 1.5 + 6 * wave((phase * 1.7) % 1);
  const pb = logRulerPosition(b);
  const pc = logRulerPosition(c);
  const pbc = logRulerPosition(b * c);
  return (
    <Stage
      title={tt("Thước logarit: nhân hai số là nối hai đoạn", "The logarithmic ruler: multiplying two numbers joins two segments")}
      story={tt(
        R`Trên thước logarit, số $v$ nằm ở vị trí $\log v$, nên hai phép nhân có cùng tỉ số cho cùng một đoạn đường. Đoạn từ $1$ tới $b$ dài $\log b$. Lấy đoạn từ $1$ tới $c$ dài $\log c$ đặt nối tiếp vào đầu mút $b$: nơi nó dừng đúng là $bc$. Khi $b$ và $c$ đổi giá trị, đoạn tổng luôn là tổng hai đoạn thành phần.`,
        R`On a logarithmic ruler the number $v$ sits at position $\log v$, so two multiplications with the same ratio cover the same distance. The segment from $1$ to $b$ has length $\log b$. Take the segment from $1$ to $c$, of length $\log c$, and lay it on from the end $b$: it stops exactly at $bc$. As $b$ and $c$ change, the total segment is always the sum of the two parts.`,
      )}
      read={tt(
        `$b=${fmt(b, 2)}$, $c=${fmt(c, 2)}$: $\\log b=${fmt(pb, 3)}$, $\\log c=${fmt(pc, 3)}$, tổng $${fmt(pb + pc, 3)}$; $bc=${fmt(b * c, 2)}$ có $\\log(bc)=${fmt(pbc, 3)}$.`,
        `$b=${fmt(b, 2)}$, $c=${fmt(c, 2)}$: $\\log b=${fmt(pb, 3)}$, $\\log c=${fmt(pc, 3)}$, sum $${fmt(pb + pc, 3)}$; $bc=${fmt(b * c, 2)}$ has $\\log(bc)=${fmt(pbc, 3)}$.`,
      )}
      why={tt(
        R`Đặt $\log b=m$ và $\log c=n$, tức $b=10^m$ và $c=10^n$. Khi đó $bc=10^m\cdot 10^n=10^{m+n}$ theo quy tắc cộng số mũ, nên $\log(bc)=m+n$. Thước logarit chỉ là quy tắc ấy được vẽ thành đoạn thẳng.`,
        R`Let $\log b=m$ and $\log c=n$, that is $b=10^m$ and $c=10^n$. Then $bc=10^m\cdot 10^n=10^{m+n}$ by the rule for adding exponents, so $\log(bc)=m+n$. The logarithmic ruler is just that rule drawn as segments.`,
      )}
    >
      <Graph
        label={tt("Thước logarit với hai đoạn nối tiếp", "A logarithmic ruler with two segments laid end to end")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -0.1, 2.2, -2, 4, "", "");
          for (const v of [1, 2, 3, 4, 5, 6, 8, 10, 20, 30, 40, 60, 100]) {
            const px = map.x(logRulerPosition(v));
            line(ctx, px, map.y(0), px, map.y(0.35), colors.ink, 1.2);
            label(ctx, String(v), px - 6, map.y(-0.5), colors.soft);
          }
          line(ctx, map.x(0), map.y(0), map.x(2), map.y(0), colors.ink, 1.6);
          line(ctx, map.x(0), map.y(1.2), map.x(pb), map.y(1.2), colors.curve, 6);
          line(ctx, map.x(pb), map.y(2.2), map.x(pb + pc), map.y(2.2), colors.alt, 6);
          dashed(ctx, map.x(pb), map.y(1.2), map.x(pb), map.y(2.2), colors.soft);
          dot(ctx, map.x(pb + pc), map.y(2.2), colors.alt, colors.bg, 6);
          dashed(ctx, map.x(pb + pc), map.y(2.2), map.x(pb + pc), map.y(0), colors.soft);
          label(ctx, `log b = ${fmt(pb, 2)}`, map.x(0), map.y(1.6), colors.curve);
          label(ctx, `log c = ${fmt(pc, 2)}`, map.x(pb), map.y(2.6), colors.alt);
          label(ctx, `bc = ${fmt(b * c, 1)}`, map.x(pb + pc) + 6, map.y(2.2), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Pha chuyển động", "Animation phase")} value={phase} min={0} max={0.999} step={0.005} onChange={(v) => { setRunning(false); setPhase(v); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 3. Tiếp tuyến của hàm mũ cao đúng bằng độ dốc nhân hằng số ---------- */

export function ExpTangentAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(50, 0.008);
  const a = 2;
  const x0 = -1.5 + 3.5 * phase;
  const y0 = a ** x0;
  const ratio = expSlopeRatio(a, x0);
  const slope = ratio * y0;
  return (
    <Stage
      title={tt("Độ dốc của hàm mũ luôn tỉ lệ với chính giá trị của nó", "The slope of an exponential is always proportional to its own value")}
      story={tt(
        R`Cho một điểm chạy dọc đồ thị $y=2^x$ và dựng tiếp tuyến tại đó. Máy đo độ dốc bằng hiệu hai điểm rất gần nhau, không dùng công thức đạo hàm. Điểm càng lên cao, tiếp tuyến càng dốc; nhưng thương «độ dốc chia cho độ cao» thì đứng yên ở khoảng $0{,}693$. Hằng số ấy chính là $\ln 2$.`,
        R`Let a point run along the graph $y=2^x$ and draw the tangent there. The machine measures the slope from two very close points, without using the derivative formula. The higher the point, the steeper the tangent; but the quotient «slope divided by height» stays put at about $0.693$. That constant is $\ln 2$.`,
      )}
      read={tt(
        `Tại $x=${fmt(x0, 2)}$: độ cao $${fmt(y0, 3)}$, độ dốc đo được $${fmt(slope, 3)}$, thương $\\frac{\\text{dốc}}{\\text{cao}}=${fmt(ratio, 4)}$, còn $\\ln 2=${fmt(Math.log(2), 4)}$.`,
        `At $x=${fmt(x0, 2)}$: height $${fmt(y0, 3)}$, measured slope $${fmt(slope, 3)}$, quotient $\\frac{\\text{slope}}{\\text{height}}=${fmt(ratio, 4)}$, and $\\ln 2=${fmt(Math.log(2), 4)}$.`,
      )}
      why={tt(
        R`Vì $a^{x+h}=a^x\cdot a^h$ nên $\frac{a^{x+h}-a^x}{h}=a^x\cdot\frac{a^h-1}{h}$. Thừa số $\frac{a^h-1}{h}$ không chứa $x$ và tiến về một hằng số khi $h\to 0$. Vậy độ dốc tại mọi điểm bằng giá trị $a^x$ nhân với cùng một hằng số, và hằng số đó là $\ln a$.`,
        R`Since $a^{x+h}=a^x\cdot a^h$, we have $\frac{a^{x+h}-a^x}{h}=a^x\cdot\frac{a^h-1}{h}$. The factor $\frac{a^h-1}{h}$ does not contain $x$ and tends to a constant as $h\to 0$. So the slope at every point is the value $a^x$ times the same constant, and that constant is $\ln a$.`,
      )}
    >
      <Graph
        label={tt("Đồ thị y = 2^x và tiếp tuyến tại điểm đang chạy", "The graph y = 2^x and the tangent at the moving point")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -2, 2.5, -1, 6);
          ctx.beginPath();
          ctx.strokeStyle = colors.curve;
          ctx.lineWidth = 2.4;
          for (let i = 0; i <= 200; i++) {
            const t = -2 + (4.5 * i) / 200;
            const px = map.x(t);
            const py = map.y(a ** t);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
          const xa = x0 - 1.2;
          const xb = x0 + 1.2;
          line(ctx, map.x(xa), map.y(y0 + slope * (xa - x0)), map.x(xb), map.y(y0 + slope * (xb - x0)), colors.alt, 2.2);
          dashed(ctx, map.x(x0), map.y(0), map.x(x0), map.y(y0), colors.soft);
          dot(ctx, map.x(x0), map.y(y0), colors.alt, colors.bg, 6);
          label(ctx, `dốc/cao = ${fmt(ratio, 3)}`.replace("dốc/cao", tt("dốc/cao", "slope/height")), map.x(-1.9), map.y(5.5), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Vị trí điểm", "Position of the point")} value={phase} min={0} max={0.999} step={0.005} onChange={(v) => { setRunning(false); setPhase(v); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

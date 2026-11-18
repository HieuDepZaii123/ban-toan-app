import { useState } from "react";
import { findRoots, limitEstimate, type Fn } from "../../algo/index.ts";
import { dashed, dot, strokeFn } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { at, frame, label, useTx } from "./kit.ts";
import { Buttons, Stage } from "./widgets.tsx";

const R = String.raw;

/* ---------- 1. Phóng to chỗ «lỗ hổng» ---------- */

const HOLES: { name: string; en: string; f: Fn; a: number; tex: string; exact: number; how: string; howEn: string; y0: number; y1: number }[] = [
  { name: "(x² − 1)/(x − 1) tại x = 1", en: "(x² − 1)/(x − 1) at x = 1", f: (x) => (x * x - 1) / (x - 1), a: 1, tex: "\\frac{x^2-1}{x-1}", exact: 2, how: "rút nhân tử: $\\frac{(x-1)(x+1)}{x-1}=x+1\\to 2$", howEn: "cancel the factor: $\\frac{(x-1)(x+1)}{x-1}=x+1\\to 2$", y0: 0, y1: 4 },
  { name: "sin x / x tại x = 0", en: "sin x / x at x = 0", f: (x) => Math.sin(x) / x, a: 0, tex: "\\frac{\\sin x}{x}", exact: 1, how: "giới hạn đặc biệt: kẹp giữa $\\cos x$ và $1$", howEn: "special limit: squeezed between $\\cos x$ and $1$", y0: 0, y1: 1.4 },
  { name: "(√(x+4) − 2)/x tại x = 0", en: "(√(x+4) − 2)/x at x = 0", f: (x) => (Math.sqrt(x + 4) - 2) / x, a: 0, tex: "\\frac{\\sqrt{x+4}-2}{x}", exact: 0.25, how: "nhân liên hợp: $\\frac{1}{\\sqrt{x+4}+2}\\to\\frac{1}{4}$", howEn: "multiply by the conjugate: $\\frac{1}{\\sqrt{x+4}+2}\\to\\frac{1}{4}$", y0: 0, y1: 0.5 },
  { name: "(1 − cos x)/x² tại x = 0", en: "(1 − cos x)/x² at x = 0", f: (x) => (1 - Math.cos(x)) / (x * x), a: 0, tex: "\\frac{1-\\cos x}{x^2}", exact: 0.5, how: "$1-\\cos x=2\\sin^2\\frac{x}{2}$ nên tỉ số $\\to\\frac{1}{2}$", howEn: "$1-\\cos x=2\\sin^2\\frac{x}{2}$, so the ratio $\\to\\frac{1}{2}$", y0: 0, y1: 0.8 },
];

export function ZoomLab() {
  const tt = useTx();
  const [pick, setPick] = useState(0);
  const [e, setE] = useState(0.3);
  const s = at(HOLES, pick);
  const half = 10 ** -e;
  const L = limitEstimate(s.f, s.a, "left", 6);
  const Rr = limitEstimate(s.f, s.a, "right", 6);
  const lastL = at(L, L.length - 1).value;
  const lastR = at(Rr, Rr.length - 1).value;
  return (
    <Stage
      title={tt("Phóng to chỗ «lỗ hổng»: hàm không xác định mà vẫn có giới hạn", "Zooming in on the «hole»: undefined at the point, yet it has a limit")}
      story={tt(
        R`Tại điểm cần xét, công thức thành $\frac{0}{0}$ nên hàm không có giá trị: đồ thị có một lỗ thủng. Nhưng nếu phóng to thật gần lỗ thủng, ta thấy đường cong dồn về một độ cao rõ ràng. Máy tính giá trị ở những điểm ngày càng sát từ cả hai bên, rồi ta xem hai dãy số ấy dồn về đâu. Con số đó là giới hạn, dù chính tại điểm ấy hàm chẳng có giá trị.`,
        R`At the point of interest the formula becomes $\frac{0}{0}$, so the function has no value: the graph has a hole. But zoom in very close to the hole and the curve settles at a definite height. The machine evaluates the function at points ever closer from both sides, and we watch where the two lists of numbers go. That number is the limit, even though the function itself has no value there.`,
      )}
      read={tt(
        `$${s.tex}$, $x\\to ${fmt(s.a)}$. Từ trái, bước $h=10^{-1},\\dots,10^{-6}$: ${L.map((r) => fmt(r.value, 5)).join("; ")}. Từ phải: ${Rr.map((r) => fmt(r.value, 5)).join("; ")}. Hai bên dồn về $${fmt((lastL + lastR) / 2, 4)}$. Biến đổi đại số cho $${fmt(s.exact, 4)}$: ${s.how}.`,
        `$${s.tex}$, $x\\to ${fmt(s.a)}$. From the left, steps $h=10^{-1},\\dots,10^{-6}$: ${L.map((r) => fmt(r.value, 5)).join("; ")}. From the right: ${Rr.map((r) => fmt(r.value, 5)).join("; ")}. Both sides settle near $${fmt((lastL + lastR) / 2, 4)}$. Algebra gives $${fmt(s.exact, 4)}$: ${s.howEn}.`,
      )}
      why={tt(
        R`Giới hạn chỉ quan tâm các điểm quanh $x_0$ chứ không quan tâm chính $x_0$, nên «không có giá trị tại điểm đó» không ngăn cản giới hạn tồn tại. Dạng $\frac{0}{0}$ chỉ là một nhãn báo hiệu phải biến đổi (rút nhân tử, nhân liên hợp) trước khi thay số.`,
        R`A limit only cares about the points around $x_0$, not about $x_0$ itself, so «no value at the point» does not stop the limit from existing. The form $\frac{0}{0}$ is only a label warning that you must transform the expression (cancel a factor, multiply by a conjugate) before substituting.`,
      )}
    >
      <Graph
        label={tt("Đồ thị quanh lỗ thủng", "The graph around the hole")}
        draw={(ctx, w, h) => {
          const x0 = s.a - half;
          const x1 = s.a + half;
          const lo = s.exact - Math.max(half * 1.5, 0.05) * (s.y1 - s.y0) * 0.5;
          const hi = s.exact + Math.max(half * 1.5, 0.05) * (s.y1 - s.y0) * 0.5;
          const { colors, map, pad } = frame(ctx, w, h, x0, x1, half >= 0.5 ? s.y0 : lo, half >= 0.5 ? s.y1 : hi);
          strokeFn(ctx, map, w, h, pad, x0, s.a - 1e-9, s.f, colors.curve, 2.6);
          strokeFn(ctx, map, w, h, pad, s.a + 1e-9, x1, s.f, colors.curve, 2.6);
          dashed(ctx, map.x(x0), map.y(s.exact), map.x(x1), map.y(s.exact), colors.alt);
          ctx.beginPath();
          ctx.strokeStyle = colors.ink;
          ctx.fillStyle = colors.bg;
          ctx.lineWidth = 2;
          ctx.arc(map.x(s.a), map.y(s.exact), 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          label(ctx, tt("lỗ thủng: hàm không xác định", "hole: function undefined"), map.x(s.a) + 10, map.y(s.exact) - 10, colors.ink);
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">{tt("Hàm", "Function")}
          <select value={pick} onChange={(ev) => setPick(Number(ev.target.value))}>{HOLES.map((q, i) => <option key={q.name} value={i}>{tt(q.name, q.en)}</option>)}</select>
        </label>
        <Slider label={tt("Phóng to (cửa sổ = 10 mũ −)", "Zoom (window = 10 to the power −)")} value={e} min={0} max={4} step={0.1} onChange={setE} />
      </div>
    </Stage>
  );
}

/* ---------- 2. Dạng 0/0: cùng nhãn, đáp số khác nhau ---------- */

const RATIOS: { name: string; en: string; num: Fn; den: Fn; tex: string; limit: string }[] = [
  { name: "x / x", en: "x / x", num: (x) => x, den: (x) => x, tex: "\\frac{x}{x}", limit: "1" },
  { name: "2x / x", en: "2x / x", num: (x) => 2 * x, den: (x) => x, tex: "\\frac{2x}{x}", limit: "2" },
  { name: "x² / x", en: "x² / x", num: (x) => x * x, den: (x) => x, tex: "\\frac{x^2}{x}", limit: "0" },
  { name: "x / x²", en: "x / x²", num: (x) => x, den: (x) => x * x, tex: "\\frac{x}{x^2}", limit: "\\text{(không có / does not exist)}" },
];

export function IndeterminateLab() {
  const tt = useTx();
  const [pick, setPick] = useState(2);
  const [e, setE] = useState(1.5);
  const s = at(RATIOS, pick);
  const x = 10 ** -e;
  return (
    <Stage
      title={tt("Dạng 0/0 là một nhãn, không phải một con số", "The form 0/0 is a label, not a number")}
      story={tt(
        R`Khi $x\to 0$, cả tử và mẫu của bốn phân thức dưới đây đều tiến về 0. Nếu $\frac{0}{0}$ là một con số thì bốn đáp số phải giống nhau. Nhưng chúng lại khác nhau: bên nào tiến về 0 nhanh hơn thì thắng. Tử co nhanh hơn mẫu thì thương về 0, mẫu co nhanh hơn tử thì thương phình ra vô cùng. Vì vậy dạng $\frac{0}{0}$ gọi là «vô định»: phải xem tốc độ co của từng bên.`,
        R`As $x\to 0$, both the numerator and the denominator of the four fractions below tend to 0. If $\frac{0}{0}$ were a number, the four answers would have to agree. They do not: whoever shrinks faster wins. If the numerator shrinks faster the quotient goes to 0; if the denominator shrinks faster the quotient blows up. That is why $\frac{0}{0}$ is called indeterminate: you must compare how fast each side shrinks.`,
      )}
      read={tt(
        `$${s.tex}$ tại $x=${fmt(x, 6)}$: tử $${fmt(s.num(x), 8)}$, mẫu $${fmt(s.den(x), 8)}$, thương $${fmt(s.num(x) / s.den(x), 5)}$. Giới hạn khi $x\\to 0$: $${s.limit}$.`,
        `$${s.tex}$ at $x=${fmt(x, 6)}$: numerator $${fmt(s.num(x), 8)}$, denominator $${fmt(s.den(x), 8)}$, quotient $${fmt(s.num(x) / s.den(x), 5)}$. Limit as $x\\to 0$: $${s.limit}$.`,
      )}
      why={tt(
        R`Thay số chỉ cho $\frac{0}{0}$ nên chưa kết luận. Phải rút gọn trước: $\frac{2x}{x}=2$, $\frac{x^2}{x}=x$, $\frac{x}{x^2}=\frac{1}{x}$, rồi mới thay $x\to 0$ vào biểu thức đã rút gọn.`,
        R`Substituting only gives $\frac{0}{0}$, which decides nothing. Simplify first: $\frac{2x}{x}=2$, $\frac{x^2}{x}=x$, $\frac{x}{x^2}=\frac{1}{x}$, and only then let $x\to 0$ in the simplified expression.`,
      )}
    >
      <Graph
        label={tt("Tử, mẫu và thương gần điểm 0", "Numerator, denominator and quotient near 0")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, 0.0005, 1, -0.2, 3);
          strokeFn(ctx, map, w, h, pad, 0.0005, 1, s.num, colors.curve, 2.2);
          strokeFn(ctx, map, w, h, pad, 0.0005, 1, s.den, colors.ink, 2.2);
          strokeFn(ctx, map, w, h, pad, 0.0005, 1, (t) => Math.min(3, Math.max(-0.2, s.num(t) / s.den(t))), colors.alt, 2.6);
          dashed(ctx, map.x(x), map.y(-0.2), map.x(x), map.y(3), colors.soft);
          label(ctx, tt("tử", "numerator"), map.x(0.85), map.y(s.num(0.85)) - 6, colors.curve);
          label(ctx, tt("mẫu", "denominator"), map.x(0.85), map.y(s.den(0.85)) + 14, colors.ink);
          label(ctx, tt("thương", "quotient"), map.x(0.45), map.y(Math.min(3, s.num(0.45) / s.den(0.45))) - 8, colors.alt);
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">{tt("Phân thức", "Fraction")}
          <select value={pick} onChange={(ev) => setPick(Number(ev.target.value))}>{RATIOS.map((q, i) => <option key={q.name} value={i}>{tt(q.name, q.en)}</option>)}</select>
        </label>
        <Slider label={tt("x nhỏ dần (10 mũ −)", "x shrinking (10 to the power −)")} value={e} min={0.3} max={3} step={0.1} onChange={setE} />
      </div>
    </Stage>
  );
}

/* ---------- 3. Tiệm cận: máy tìm chỗ hàm vọt lên và chỗ hàm ổn định ---------- */

const RATIONALS: { name: string; en: string; num: (k: number) => (x: number) => number; den: Fn; texf: (k: number) => string }[] = [
  { name: "(kx + 1)/(x − 2)", en: "(kx + 1)/(x − 2)", num: (k) => (x) => k * x + 1, den: (x) => x - 2, texf: (k) => `\\frac{${fmt(k)}x+1}{x-2}` },
  { name: "(2x² + k)/(x² − 1)", en: "(2x² + k)/(x² − 1)", num: (k) => (x) => 2 * x * x + k, den: (x) => x * x - 1, texf: (k) => `\\frac{2x^2+${fmt(k)}}{x^2-1}` },
  { name: "kx/(x² + 1)", en: "kx/(x² + 1)", num: (k) => (x) => k * x, den: (x) => x * x + 1, texf: (k) => `\\frac{${fmt(k)}x}{x^2+1}` },
];

export function AsymptoteLab() {
  const tt = useTx();
  const [pick, setPick] = useState(0);
  const [k, setK] = useState(3);
  const s = at(RATIONALS, pick);
  const f = (x: number) => s.num(k)(x) / s.den(x);
  const poles = findRoots(s.den, -12, 12, 4000);
  const hRight = f(1e7);
  const hLeft = f(-1e7);
  const near = (p: number) => ({ l: f(p - 1e-6), r: f(p + 1e-6) });
  return (
    <Stage
      title={tt("Tiệm cận: máy tìm chỗ hàm vọt lên và chỗ hàm ổn định", "Asymptotes: where the function shoots up and where it settles")}
      story={tt(
        R`Tiệm cận đứng là chỗ mẫu số bằng 0 mà tử số thì không: đi sát chỗ đó, giá trị lớn lên tùy ý. Máy tìm chúng bằng cách tìm nghiệm của mẫu số rồi nhìn giá trị hai bên. Tiệm cận ngang là độ cao mà đường cong tiến sát khi $x$ đi thật xa: máy đo bằng cách tính hàm tại $x=\pm 10^7$. Kéo $k$ để thấy tiệm cận ngang đổi chỗ.`,
        R`A vertical asymptote is where the denominator is zero but the numerator is not: close to it the values become arbitrarily large. The machine finds them by solving denominator $=0$ and looking at the values on both sides. A horizontal asymptote is the height the curve approaches when $x$ goes very far: the machine measures it by evaluating the function at $x=\pm 10^7$. Drag $k$ to move the horizontal asymptote.`,
      )}
      read={tt(
        `$y=${s.texf(k)}$. Mẫu bằng 0 tại: ${poles.map((p) => `$x=${fmt(p, 3)}$ (hai bên: $${fmt(Math.max(-9999, Math.min(9999, near(p).l)), 1)}$ và $${fmt(Math.max(-9999, Math.min(9999, near(p).r)), 1)}$)`).join("; ") || "không có (mẫu không bao giờ bằng 0)"}. Tại $x=+10^7$: $${fmt(hRight, 4)}$; tại $x=-10^7$: $${fmt(hLeft, 4)}$ nên tiệm cận ngang $y=${fmt((hRight + hLeft) / 2, 3)}$.`,
        `$y=${s.texf(k)}$. The denominator is zero at: ${poles.map((p) => `$x=${fmt(p, 3)}$ (both sides: $${fmt(Math.max(-9999, Math.min(9999, near(p).l)), 1)}$ and $${fmt(Math.max(-9999, Math.min(9999, near(p).r)), 1)}$)`).join("; ") || "none (the denominator is never zero)"}. At $x=+10^7$: $${fmt(hRight, 4)}$; at $x=-10^7$: $${fmt(hLeft, 4)}$, so the horizontal asymptote is $y=${fmt((hRight + hLeft) / 2, 3)}$.`,
      )}
      why={tt(
        R`Khi $x$ rất lớn, chia cả tử và mẫu cho lũy thừa cao nhất của $x$: các số hạng còn lại co về 0 và chỉ còn tỉ số hai hệ số bậc cao nhất. Bậc tử nhỏ hơn bậc mẫu thì giới hạn là 0; bằng nhau thì là tỉ số hệ số; lớn hơn thì không có tiệm cận ngang.`,
        R`When $x$ is very large, divide the numerator and denominator by the highest power of $x$: the other terms shrink to 0 and only the ratio of the leading coefficients remains. If the numerator has the lower degree the limit is 0; if the degrees are equal it is the ratio of coefficients; if the numerator's degree is higher there is no horizontal asymptote.`,
      )}
    >
      <Graph
        label={tt("Đồ thị phân thức và các tiệm cận", "The rational function and its asymptotes")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, -8, 8, -8, 8);
          const clip = { x: map.x(-8), y: map.y(8), w: map.x(8) - map.x(-8), h: map.y(-8) - map.y(8) };
          const pieces = [-8, ...poles.filter((p) => p > -8 && p < 8), 8];
          for (let i = 0; i + 1 < pieces.length; i++) strokeFn(ctx, map, w, h, pad, (pieces[i] as number) + 0.01, (pieces[i + 1] as number) - 0.01, f, colors.curve, 2.6, clip);
          for (const p of poles) dashed(ctx, map.x(p), map.y(-8), map.x(p), map.y(8), colors.alt);
          if (Number.isFinite(hRight)) dashed(ctx, map.x(-8), map.y(hRight), map.x(8), map.y(hRight), colors.alt);
          label(ctx, tt(`tiệm cận ngang y = ${fmt((hRight + hLeft) / 2, 2)}`, `horizontal asymptote y = ${fmt((hRight + hLeft) / 2, 2)}`), map.x(-7.8), map.y(hRight) - 8, colors.alt);
          for (const p of poles) dot(ctx, map.x(p), map.y(0), colors.ink, colors.bg, 5);
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">{tt("Phân thức", "Fraction")}
          <select value={pick} onChange={(ev) => setPick(Number(ev.target.value))}>{RATIONALS.map((q, i) => <option key={q.name} value={i}>{tt(q.name, q.en)}</option>)}</select>
        </label>
        <Slider label="k" value={k} min={-4} max={4} step={0.5} onChange={setK} />
      </div>
    </Stage>
  );
}

/* ---------- 4. Định lí kẹp ---------- */

const SQUEEZES: { name: string; en: string; f: Fn; lo: Fn; hi: Fn; x0: number; x1: number; y0: number; y1: number; tex: string; limit: number; loTex: string; hiTex: string }[] = [
  { name: "sin x / x kẹp giữa cos x và 1", en: "sin x / x squeezed between cos x and 1", f: (x) => Math.sin(x) / x, lo: Math.cos, hi: () => 1, x0: 0.001, x1: 1.5, y0: 0, y1: 1.2, tex: "\\frac{\\sin x}{x}", limit: 1, loTex: "\\cos x", hiTex: "1" },
  { name: "x²·sin(1/x) kẹp giữa −x² và x²", en: "x²·sin(1/x) squeezed between −x² and x²", f: (x) => x * x * Math.sin(1 / x), lo: (x) => -x * x, hi: (x) => x * x, x0: 0.001, x1: 0.5, y0: -0.3, y1: 0.3, tex: "x^2\\sin\\frac{1}{x}", limit: 0, loTex: "-x^2", hiTex: "x^2" },
];

export function SqueezeLab() {
  const tt = useTx();
  const [pick, setPick] = useState(0);
  const [u, setU] = useState(0.6);
  const s = at(SQUEEZES, pick);
  const x = s.x0 + (s.x1 - s.x0) * (1 - u) ** 2;
  return (
    <Stage
      title={tt("Định lí kẹp: hai bức tường ép đường cong vào một số", "The squeeze theorem: two walls press the curve onto one number")}
      story={tt(
        R`Một đường cong bị kẹp giữa hai đường khác. Nếu cả hai đường kẹp cùng tiến về một số $L$ thì đường cong ở giữa cũng buộc phải tiến về $L$, vì nó chẳng còn chỗ nào khác để đi. Cách này tính được cả những giới hạn mà đường cong rung vô hạn, như $x^2\sin\frac{1}{x}$: nó rung nhanh vô cùng nhưng bị ép giữa $-x^2$ và $x^2$ cùng co về 0.`,
        R`A curve is squeezed between two other curves. If both outer curves tend to the same number $L$, the curve in the middle is forced to tend to $L$ as well, because it has nowhere else to go. This even handles curves that oscillate infinitely often, like $x^2\sin\frac{1}{x}$: it wiggles faster and faster but is pressed between $-x^2$ and $x^2$, which both shrink to 0.`,
      )}
      read={tt(
        `Tại $x=${fmt(x, 5)}$: tường dưới $${s.loTex}=${fmt(s.lo(x), 6)}$ ≤ đường cong $${fmt(s.f(x), 6)}$ ≤ tường trên $${s.hiTex}=${fmt(s.hi(x), 6)}$. Hai tường cùng tiến về $${fmt(s.limit)}$ nên đường cong cũng tiến về $${fmt(s.limit)}$.`,
        `At $x=${fmt(x, 5)}$: lower wall $${s.loTex}=${fmt(s.lo(x), 6)}$ ≤ curve $${fmt(s.f(x), 6)}$ ≤ upper wall $${s.hiTex}=${fmt(s.hi(x), 6)}$. Both walls tend to $${fmt(s.limit)}$, so the curve tends to $${fmt(s.limit)}$ as well.`,
      )}
      why={pick === 0
        ? tt(
          R`Với góc $x$ nhỏ, so diện tích ba hình: tam giác $\frac{1}{2}\sin x$ nằm trong hình quạt $\frac{1}{2}x$ nằm trong tam giác $\frac{1}{2}\tan x$. Suy ra $\sin x\le x\le\tan x$, chia ra được $\cos x\le\frac{\sin x}{x}\le 1$. Hai vế tiến về 1.`,
          R`For a small angle $x$, compare three areas: the triangle $\frac{1}{2}\sin x$ lies inside the sector $\frac{1}{2}x$, which lies inside the triangle $\frac{1}{2}\tan x$. So $\sin x\le x\le\tan x$, and dividing gives $\cos x\le\frac{\sin x}{x}\le 1$. Both outer sides tend to 1.`,
        )
        : tt(
          R`Vì $-1\le\sin\frac{1}{x}\le 1$ với mọi $x\ne 0$, nhân với $x^2\ge 0$ được $-x^2\le x^2\sin\frac{1}{x}\le x^2$. Hai biên cùng tiến về 0.`,
          R`Since $-1\le\sin\frac{1}{x}\le 1$ for every $x\ne 0$, multiplying by $x^2\ge 0$ gives $-x^2\le x^2\sin\frac{1}{x}\le x^2$. Both bounds tend to 0.`,
        )}
    >
      <Graph
        label={tt("Đường cong bị kẹp giữa hai bức tường", "The curve squeezed between two walls")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, 0, s.x1, s.y0, s.y1);
          ctx.beginPath();
          const steps = 300;
          for (let i = 0; i <= steps; i++) { const t = s.x0 + ((s.x1 - s.x0) * i) / steps; (i === 0 ? ctx.moveTo : ctx.lineTo).call(ctx, map.x(t), map.y(s.hi(t))); }
          for (let i = steps; i >= 0; i--) { const t = s.x0 + ((s.x1 - s.x0) * i) / steps; ctx.lineTo(map.x(t), map.y(s.lo(t))); }
          ctx.closePath();
          ctx.fillStyle = colors.alt;
          ctx.globalAlpha = 0.14;
          ctx.fill();
          ctx.globalAlpha = 1;
          strokeFn(ctx, map, w, h, pad, s.x0, s.x1, s.hi, colors.alt, 1.8);
          strokeFn(ctx, map, w, h, pad, s.x0, s.x1, s.lo, colors.alt, 1.8);
          strokeFn(ctx, map, w, h, pad, s.x0, s.x1, s.f, colors.curve, 2);
          dashed(ctx, map.x(x), map.y(s.y0), map.x(x), map.y(s.y1), colors.soft);
          dot(ctx, map.x(x), map.y(s.f(x)), colors.ink, colors.bg, 6);
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">{tt("Ví dụ", "Example")}
          <select value={pick} onChange={(ev) => setPick(Number(ev.target.value))}>{SQUEEZES.map((q, i) => <option key={q.name} value={i}>{tt(q.name, q.en)}</option>)}</select>
        </label>
        <Slider label={tt("Tiến sát điểm 0 (kéo phải)", "Approach 0 (drag right)")} value={u} min={0} max={0.999} step={0.005} onChange={setU} />
      </div>
    </Stage>
  );
}

/* ---------- 5. Liên tục: tìm tham số để hai nhánh khớp nhau ---------- */

export function ContinuityLab() {
  const tt = useTx();
  const [m, setM] = useState(0);
  const left: Fn = (x) => x + 1;
  const right = (mm: number): Fn => (x) => mm * x - 1;
  const Ll = at(limitEstimate(left, 2, "left", 7), 6).value;
  const Lr = at(limitEstimate(right(m), 2, "right", 7), 6).value;
  const gap = (mm: number) => at(limitEstimate(right(mm), 2, "right", 7), 6).value - Ll;
  const solved = findRoots(gap, -6, 6, 600)[0];
  const f = (x: number) => (x < 2 ? left(x) : right(m)(x));
  const ok = Math.abs(Lr - Ll) < 1e-5;
  return (
    <Stage
      title={tt("Liên tục: tìm tham số để hai nhánh khớp nhau", "Continuity: find the parameter that makes the two branches meet")}
      story={tt(
        R`Hàm cho bằng hai công thức: $x+1$ khi $x<2$ và $mx-1$ khi $x\ge 2$. Hàm liên tục tại 2 nếu đồ thị không bị đứt: giới hạn bên trái, giới hạn bên phải và giá trị tại 2 phải cùng bằng nhau. Hãy kéo $m$ để nhánh phải trượt lên xuống cho tới khi khớp với nhánh trái. Máy cũng tự tìm $m$ bằng cách tìm nghiệm của «giới hạn phải trừ giới hạn trái».`,
        R`The function is given by two formulas: $x+1$ for $x<2$ and $mx-1$ for $x\ge 2$. It is continuous at 2 if the graph has no break: the left limit, the right limit and the value at 2 must all be equal. Drag $m$ to slide the right branch up and down until it meets the left branch. The machine can also find $m$ by solving «right limit minus left limit» $=0$.`,
      )}
      read={tt(
        `Giới hạn trái tại 2: $${fmt(Ll, 5)}$. Giới hạn phải: $${fmt(Lr, 5)}$. Giá trị $f(2)=2m-1=${fmt(2 * m - 1, 4)}$. ${ok ? "Hai bên bằng nhau: hàm liên tục tại 2." : `Lệch nhau $${fmt(Lr - Ll, 4)}$: đồ thị bị đứt (bước nhảy).`} Máy giải $\\lim_{x\\to 2^+}-\\lim_{x\\to 2^-}=0$ tìm được $m=${solved === undefined ? "?" : fmt(solved, 4)}$. Đại số: $2m-1=3$ nên $m=2$.`,
        `Left limit at 2: $${fmt(Ll, 5)}$. Right limit: $${fmt(Lr, 5)}$. Value $f(2)=2m-1=${fmt(2 * m - 1, 4)}$. ${ok ? "The two sides agree: the function is continuous at 2." : `They differ by $${fmt(Lr - Ll, 4)}$: the graph has a break (a jump).`} The machine solves $\\lim_{x\\to 2^+}-\\lim_{x\\to 2^-}=0$ and finds $m=${solved === undefined ? "?" : fmt(solved, 4)}$. By algebra: $2m-1=3$, so $m=2$.`,
      )}
      why={tt(
        R`Liên tục tại $a$ nghĩa là $\lim_{x\to a^-}f=\lim_{x\to a^+}f=f(a)$. Ba số bằng nhau cho một phương trình theo tham số: ở đây $3=2m-1$. Giải ra $m=2$. Bài «tìm tham số để hàm liên tục» luôn là cho giới hạn trái bằng giới hạn phải.`,
        R`Continuity at $a$ means $\lim_{x\to a^-}f=\lim_{x\to a^+}f=f(a)$. Setting the three numbers equal gives an equation in the parameter: here $3=2m-1$, so $m=2$. A «find the parameter for continuity» problem always means: make the left limit equal the right limit.`,
      )}
    >
      <Graph
        label={tt("Đồ thị hai nhánh quanh x = 2", "The two-branch graph around x = 2")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, -1, 5, -5, 9);
          strokeFn(ctx, map, w, h, pad, -1, 2 - 1e-9, f, colors.curve, 2.8);
          strokeFn(ctx, map, w, h, pad, 2, 5, f, colors.alt, 2.8);
          ctx.beginPath();
          ctx.strokeStyle = colors.curve;
          ctx.fillStyle = colors.bg;
          ctx.lineWidth = 2;
          ctx.arc(map.x(2), map.y(Ll), 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          dot(ctx, map.x(2), map.y(2 * m - 1), colors.alt, colors.bg, 6);
          dashed(ctx, map.x(2), map.y(-5), map.x(2), map.y(9), colors.soft);
          label(ctx, tt(`bên trái → ${fmt(Ll, 2)}`, `left → ${fmt(Ll, 2)}`), map.x(0.2), map.y(Ll) - 10, colors.curve);
          label(ctx, tt(`bên phải → ${fmt(Lr, 2)}`, `right → ${fmt(Lr, 2)}`), map.x(2.2), map.y(Lr) + 18, colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label="m" value={m} min={-3} max={5} step={0.25} onChange={setM} />
      </div>
      <Buttons><button type="button" className="text-btn" onClick={() => { if (solved !== undefined) setM(Math.round(solved * 4) / 4); }}>{tt("Để máy tìm m", "Let the machine find m")}</button></Buttons>
    </Stage>
  );
}

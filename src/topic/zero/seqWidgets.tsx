import { useState } from "react";
import { crossoverIndex, findRoots, iterate } from "../../algo/index.ts";
import { dashed, dot, strokeFn } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { at, frame, label, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;

/* ---------- 1. Tổng cấp số cộng: ghép hai hàng thành hình chữ nhật ---------- */

export function ArithSumLab() {
  const tt = useTx();
  const [u1, setU1] = useState(2);
  const [d, setD] = useState(3);
  const [n, setN] = useState(8);
  const terms = Array.from({ length: n }, (_, i) => u1 + i * d);
  const un = terms[n - 1] as number;
  const direct = terms.reduce((s, v) => s + v, 0);
  return (
    <Stage
      title={tt("Tổng cấp số cộng: ghép hai hàng thành hình chữ nhật (mẹo của Gauss)", "Sum of an arithmetic sequence: two rows make a rectangle (Gauss's trick)")}
      story={tt(
        R`Vẽ các số hạng thành các cột cao dần đều. Lấy một bản sao, lật ngược rồi ghép vào bên cạnh: cột nào cũng có tổng chiều cao $u_1+u_n$, vì cột này hơn cột trước $d$ thì cột kia kém đúng $d$. Hai hàng ghép thành hình chữ nhật $n$ cột, cao $u_1+u_n$. Hình chữ nhật chứa hai lần tổng, nên $S_n=\frac{n(u_1+u_n)}{2}$.`,
        R`Draw the terms as columns rising evenly. Take a copy, flip it upside down and join it alongside: every column has total height $u_1+u_n$, because where one column gains $d$ over the previous one the other loses exactly $d$. The two rows form a rectangle of $n$ columns and height $u_1+u_n$. The rectangle holds twice the sum, so $S_n=\frac{n(u_1+u_n)}{2}$.`,
      )}
      read={tt(
        `$u_1=${fmt(u1)}$, $d=${fmt(d)}$, $n=${n}$ nên $u_n=u_1+(n-1)d=${fmt(un)}$. Cộng trực tiếp từng số hạng: $${fmt(direct)}$. Công thức $\\frac{n(u_1+u_n)}{2}=\\frac{${n}\\cdot${fmt(u1 + un)}}{2}=${fmt((n * (u1 + un)) / 2)}$. Hình chữ nhật: $${n}\\times${fmt(u1 + un)}=${fmt(n * (u1 + un))}=2S_n$.`,
        `$u_1=${fmt(u1)}$, $d=${fmt(d)}$, $n=${n}$ so $u_n=u_1+(n-1)d=${fmt(un)}$. Adding the terms one by one: $${fmt(direct)}$. The formula $\\frac{n(u_1+u_n)}{2}=\\frac{${n}\\cdot${fmt(u1 + un)}}{2}=${fmt((n * (u1 + un)) / 2)}$. The rectangle: $${n}\\times${fmt(u1 + un)}=${fmt(n * (u1 + un))}=2S_n$.`,
      )}
      why={tt(
        R`Số hạng thứ $n$ là $u_1+(n-1)d$ vì từ số hạng đầu tới số hạng thứ $n$ có $n-1$ bước, mỗi bước cộng $d$ (n cái cọc có $n-1$ khoảng trống). Gauss thuở nhỏ tính $1+2+\dots+100$ bằng chính cách ghép cặp này: 50 cặp, mỗi cặp 101, tổng 5050.`,
        R`The $n$-th term is $u_1+(n-1)d$ because from the first term to the $n$-th there are $n-1$ steps, each adding $d$ ($n$ fence posts have $n-1$ gaps). As a child Gauss summed $1+2+\dots+100$ by exactly this pairing: 50 pairs, each 101, total 5050.`,
      )}
    >
      <Graph
        label={tt("Các cột số hạng và bản sao lật ngược", "The term columns and their flipped copy")}
        draw={(ctx, w, h) => {
          const top = u1 + un;
          const { colors, map } = frame(ctx, w, h, 0, n + 1, 0, top * 1.1);
          for (let i = 0; i < n; i++) {
            const v = terms[i] as number;
            const x0 = map.x(i + 0.55);
            const bw = map.x(i + 1.45) - x0;
            ctx.fillStyle = colors.curve; ctx.globalAlpha = 0.5;
            ctx.fillRect(x0, map.y(v), bw, map.y(0) - map.y(v));
            ctx.fillStyle = colors.alt; ctx.globalAlpha = 0.4;
            ctx.fillRect(x0, map.y(top), bw, map.y(v) - map.y(top));
            ctx.globalAlpha = 1;
            ctx.strokeStyle = colors.ink; ctx.lineWidth = 1;
            ctx.strokeRect(x0, map.y(top), bw, map.y(0) - map.y(top));
          }
          label(ctx, tt(`mỗi cột cao ${fmt(top)} = u₁ + uₙ`, `every column ${fmt(top)} tall = u₁ + uₙ`), map.x(0.6), map.y(top) - 8, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label="u₁" value={u1} min={-4} max={10} step={1} onChange={setU1} />
        <Slider label={tt("Công sai d", "Common difference d")} value={d} min={-3} max={6} step={1} onChange={setD} />
        <Slider label="n" value={n} min={2} max={16} step={1} onChange={setN} />
      </div>
    </Stage>
  );
}

/* ---------- 2. Cộng đều và nhân đều: ai thắng cuộc đua ---------- */

export function ArithGeoLab() {
  const tt = useTx();
  const [d, setD] = useState(10);
  const [q, setQ] = useState(1.3);
  const [log, setLog] = useState(false);
  const N = 30;
  const arith = (n: number) => 1 + (n - 1) * d;
  const geo = (n: number) => q ** (n - 1);
  const cross = crossoverIndex(arith, geo, N);
  const y = (v: number) => (log ? Math.log10(Math.max(v, 1e-9)) : v);
  const top = Math.max(...Array.from({ length: N }, (_, i) => Math.max(y(arith(i + 1)), y(geo(i + 1)))));
  return (
    <Stage
      title={tt("Cộng đều hay nhân đều: cuộc đua của hai dãy", "Adding steadily or multiplying steadily: a race between two sequences")}
      story={tt(
        R`Dãy cộng đều (cấp số cộng) mỗi bước thêm cùng một lượng $d$; dãy nhân đều (cấp số nhân) mỗi bước nhân cùng một hệ số $q$. Lúc đầu dãy cộng có thể dẫn trước, nhưng chỉ cần $q>1$ thì sớm muộn dãy nhân sẽ vượt lên và bỏ xa. Máy tự tìm chỗ vượt. Bật thang logarit: dãy nhân biến thành đường thẳng vì $\log(q^{n-1})=(n-1)\log q$ là hàm bậc nhất của $n$.`,
        R`The arithmetic sequence adds the same amount $d$ at each step; the geometric sequence multiplies by the same factor $q$. At first the arithmetic one may lead, but as soon as $q>1$ the geometric one sooner or later overtakes and runs away. The machine finds the crossing. Switch on the logarithmic scale: the geometric sequence becomes a straight line because $\log(q^{n-1})=(n-1)\log q$ is a linear function of $n$.`,
      )}
      read={tt(
        `Dãy cộng $u_n=1+(n-1)\\cdot${fmt(d)}$, dãy nhân $v_n=${fmt(q, 2)}^{n-1}$. ${cross === null ? `Trong ${N} số hạng đầu dãy nhân chưa vượt hẳn.` : `Từ số hạng thứ $${cross}$ trở đi dãy nhân luôn lớn hơn: $u_{${cross}}=${fmt(arith(cross))}$, $v_{${cross}}=${fmt(geo(cross), 2)}$.`} Số hạng thứ ${N}: $u=${fmt(arith(N))}$, $v=${fmt(geo(N), 1)}$. ${log ? "Thang logarit: dãy nhân là đường thẳng." : ""}`,
        `Arithmetic $u_n=1+(n-1)\\cdot${fmt(d)}$, geometric $v_n=${fmt(q, 2)}^{n-1}$. ${cross === null ? `Within the first ${N} terms the geometric one has not clearly overtaken.` : `From term number $${cross}$ on the geometric sequence is always larger: $u_{${cross}}=${fmt(arith(cross))}$, $v_{${cross}}=${fmt(geo(cross), 2)}$.`} Term ${N}: $u=${fmt(arith(N))}$, $v=${fmt(geo(N), 1)}$. ${log ? "Logarithmic scale: the geometric sequence is a straight line." : ""}`,
      )}
      why={tt(
        R`Tăng tuyến tính là cộng thêm một lượng cố định, còn tăng theo hàm mũ là cộng thêm một tỉ lệ cố định của chính nó. Nên một khoản gửi lãi kép (nhân) sớm hay muộn vượt xa một khoản tiết kiệm đều đặn (cộng), và cũng vì vậy dịch bệnh lây theo hàm mũ khó kiểm soát hơn nhiều so với dự đoán tuyến tính.`,
        R`Linear growth adds a fixed amount; exponential growth adds a fixed share of itself. So a compound-interest deposit (multiplying) sooner or later far outruns steady saving (adding), and for the same reason an epidemic spreading exponentially is much harder to control than a linear forecast suggests.`,
      )}
    >
      <Graph
        label={tt("Hai dãy số theo chỉ số n", "Two sequences against the index n")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, 0, N + 1, log ? -0.5 : 0, top * 1.08, "n", log ? "log₁₀" : "");
          for (let i = 1; i <= N; i++) {
            dot(ctx, map.x(i), map.y(y(arith(i))), colors.curve, colors.bg, 4);
            dot(ctx, map.x(i), map.y(y(geo(i))), colors.alt, colors.bg, 4);
          }
          if (cross !== null) dashed(ctx, map.x(cross), map.y(0), map.x(cross), map.y(top), colors.ink);
          label(ctx, tt("cộng đều", "arithmetic"), map.x(N - 6), map.y(y(arith(N - 6))) - 10, colors.curve);
          label(ctx, tt("nhân đều", "geometric"), map.x(N - 7), map.y(y(geo(N - 7))) - 10, colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Công sai d", "Common difference d")} value={d} min={0} max={50} step={1} onChange={setD} />
        <Slider label={tt("Công bội q", "Common ratio q")} value={q} min={1} max={1.6} step={0.01} onChange={setQ} />
        <label className="fz-pick"><span>{tt("Thang logarit", "Logarithmic scale")}</span>
          <input type="checkbox" checked={log} onChange={(e) => setLog(e.target.checked)} />
        </label>
      </div>
    </Stage>
  );
}

/* ---------- 3. Dãy truy hồi: mạng nhện ---------- */

const MAPS = [
  { vi: "u ← (u + 2/u)/2  (Newton cho √2)", en: "u ← (u + 2/u)/2  (Newton for √2)", f: (_r: number) => (u: number) => (u + 2 / u) / 2, x0: 3, lo: 0.4, hi: 3.2, usesR: false, dom: 0.3 },
  { vi: "u ← cos u", en: "u ← cos u", f: (_r: number) => (u: number) => Math.cos(u), x0: 0.2, lo: 0, hi: 1.2, usesR: false, dom: 0 },
  { vi: "u ← 1 + 1/u  (tỉ số vàng)", en: "u ← 1 + 1/u  (the golden ratio)", f: (_r: number) => (u: number) => 1 + 1 / u, x0: 1, lo: 0.6, hi: 2.2, usesR: false, dom: 0.5 },
  { vi: "u ← r·u·(1 − u)  (dãy logistic)", en: "u ← r·u·(1 − u)  (the logistic sequence)", f: (r: number) => (u: number) => r * u * (1 - u), x0: 0.2, lo: 0, hi: 1, usesR: true, dom: 0 },
];

export function CobwebLab() {
  const tt = useTx();
  const [pick, setPick] = useState(0);
  const [r, setR] = useState(2.8);
  const [x0, setX0] = useState(0.2);
  const [steps, setSteps] = useState(8);
  const s = at(MAPS, pick);
  const f = s.f(r);
  const start = s.usesR ? x0 : s.x0;
  const seq = iterate(f, start, steps);
  const fixed = findRoots((x) => f(x) - x, Math.max(s.lo, s.dom + 0.001), s.hi, 6000).filter((v) => Number.isFinite(f(v)));
  const L = fixed.length ? (fixed[fixed.length - 1] as number) : NaN;
  const slope = Number.isFinite(L) ? (f(L + 1e-6) - f(L - 1e-6)) / 2e-6 : NaN;
  return (
    <Stage
      title={tt("Dãy truy hồi: mạng nhện và điểm bất động", "Recurrence sequences: the cobweb and the fixed point")}
      story={tt(
        R`Dãy truy hồi $u_{n+1}=f(u_n)$ lấy kết quả bước trước làm đầu vào của bước sau. Trên đồ thị: từ $u_n$ đi thẳng lên tới đường cong $y=f(x)$, rồi đi ngang sang đường chéo $y=x$ để «chuyển» giá trị $f(u_n)$ thành hoành độ mới, và cứ thế. Đường đi trông như mạng nhện. Nếu mạng xoắn vào một điểm thì dãy hội tụ về giao điểm của đường cong với đường chéo: nghiệm của $L=f(L)$. Với dãy logistic, tăng $r$ để thấy mạng nhện không còn xoắn vào đâu.`,
        R`A recurrence $u_{n+1}=f(u_n)$ feeds the previous result into the next step. On the graph: from $u_n$ go straight up to the curve $y=f(x)$, then sideways to the diagonal $y=x$ to «transfer» the value $f(u_n)$ into the new horizontal position, and repeat. The path looks like a cobweb. If the web spirals into a point, the sequence converges to the intersection of the curve with the diagonal: a solution of $L=f(L)$. For the logistic sequence, raise $r$ and the web no longer spirals anywhere.`,
      )}
      read={tt(
        `Các số hạng: ${seq.slice(0, 8).map((v) => fmt(v, 5)).join("; ")}… Giao điểm với đường chéo (nghiệm $L=f(L)$ máy tìm): ${fixed.map((v) => fmt(v, 5)).join("; ") || "không có"}. Tại $L$ độ dốc $f'(L)=${fmt(slope, 4)}$: ${Math.abs(slope) < 1 ? "$|f'(L)|<1$ nên mạng nhện co vào, dãy hội tụ" : "$|f'(L)|\\ge 1$ nên mạng nhện văng ra, dãy không hội tụ về $L$"}. Số hạng thứ ${steps}: $${fmt(seq[steps] as number, 6)}$.`,
        `The terms: ${seq.slice(0, 8).map((v) => fmt(v, 5)).join("; ")}… Intersections with the diagonal (solutions of $L=f(L)$ found by the machine): ${fixed.map((v) => fmt(v, 5)).join("; ") || "none"}. At $L$ the slope $f'(L)=${fmt(slope, 4)}$: ${Math.abs(slope) < 1 ? "$|f'(L)|<1$ so the web contracts, the sequence converges" : "$|f'(L)|\\ge 1$ so the web flies outwards, the sequence does not converge to $L$"}. Term ${steps}: $${fmt(seq[steps] as number, 6)}$.`,
      )}
      why={tt(
        R`Khi $u_n$ rất gần $L$, $f(u_n)-L\approx f'(L)(u_n-L)$: sai số được nhân với $f'(L)$ sau mỗi bước. Nhân với số có độ lớn dưới 1 thì sai số co lại (hội tụ), trên 1 thì phình ra. Với phương pháp Newton, $f'(L)=0$ nên sai số co nhanh phi thường, vì thế số chữ số đúng gần như gấp đôi mỗi bước.`,
        R`When $u_n$ is very near $L$, $f(u_n)-L\approx f'(L)(u_n-L)$: the error is multiplied by $f'(L)$ at each step. Multiplying by a number of size below 1 shrinks the error (convergence), above 1 inflates it. For Newton's method $f'(L)=0$ so the error shrinks extraordinarily fast, which is why the number of correct digits roughly doubles each step.`,
      )}
    >
      <Graph
        label={tt("Mạng nhện của dãy truy hồi", "The cobweb of the recurrence")}
        draw={(ctx, w, h) => {
          const lo = s.lo;
          const hi = s.hi;
          const { colors, map, pad } = frame(ctx, w, h, lo, hi, lo, hi, "u", "f(u)", true);
          strokeFn(ctx, map, w, h, pad, Math.max(lo, s.dom + 0.002), hi, f, colors.curve, 2.6);
          dashed(ctx, map.x(lo), map.y(lo), map.x(hi), map.y(hi), colors.soft);
          let px = seq[0] as number;
          ctx.beginPath();
          ctx.moveTo(map.x(px), map.y(lo));
          for (let i = 0; i < steps; i++) {
            const fx = f(px);
            ctx.lineTo(map.x(px), map.y(fx));
            ctx.lineTo(map.x(fx), map.y(fx));
            px = fx;
          }
          ctx.strokeStyle = colors.alt; ctx.lineWidth = 1.6; ctx.stroke();
          if (Number.isFinite(L)) dot(ctx, map.x(L), map.y(L), colors.ink, colors.bg, 6);
          label(ctx, "y = x", map.x(hi) - 40, map.y(hi) + 14, colors.soft);
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">{tt("Quy luật truy hồi", "Recurrence rule")}
          <select value={pick} onChange={(e) => { setPick(Number(e.target.value)); setX0(0.2); setR(2.8); }}>{MAPS.map((q, i) => <option key={q.vi} value={i}>{tt(q.vi, q.en)}</option>)}</select>
        </label>
        {s.usesR ? <Slider label="r" value={r} min={1.5} max={3.95} step={0.05} onChange={setR} /> : null}
        {s.usesR ? <Slider label={tt("Số hạng đầu", "First term")} value={x0} min={0.05} max={0.95} step={0.05} onChange={setX0} /> : null}
        <Slider label={tt("Số bước", "Number of steps")} value={steps} min={1} max={60} step={1} onChange={setSteps} />
      </div>
    </Stage>
  );
}

/* ---------- 4. Quy nạp: các góc chữ L ghép thành hình vuông ---------- */

export function InductionLab() {
  const tt = useTx();
  const [n, setN] = useState(6);
  const [bound, setBound] = useState(3);
  const [k, setK] = useState(5);
  const N = Math.round(10 ** bound);
  let allOk = true;
  let acc = 0;
  for (let i = 1; i <= N; i++) { acc += 2 * i - 1; if (acc !== i * i) { allOk = false; break; } }
  return (
    <Stage
      title={tt("Quy nạp: 1 + 3 + 5 + … + (2n − 1) = n²", "Induction: 1 + 3 + 5 + … + (2n − 1) = n²")}
      story={tt(
        R`Hình vuông cạnh $n$ có $n^2$ ô. Ta bắt đầu bằng 1 ô. Muốn có hình vuông cạnh $2$, thêm một góc chữ L gồm $3$ ô. Muốn có cạnh $3$, thêm góc chữ L gồm $5$ ô. Mỗi lần thêm một góc chữ L mới, số ô trong góc là số lẻ kế tiếp. Vậy tổng các số lẻ liên tiếp chính là số ô của hình vuông. Quy nạp là hiệu ứng domino: nếu hình vuông cạnh $k$ đúng thì thêm góc chữ L $2k+1$ ô thành hình vuông cạnh $k+1$.`,
        R`A square of side $n$ has $n^2$ cells. Start with 1 cell. To get side $2$, add an L-shaped corner of $3$ cells. For side $3$, add an L of $5$ cells. Each new L-shaped corner holds the next odd number of cells. So the sum of consecutive odd numbers is exactly the number of cells of the square. Induction is the domino effect: if the square of side $k$ works, adding an L of $2k+1$ cells makes the square of side $k+1$.`,
      )}
      read={tt(
        `$n=${n}$: ${Array.from({ length: n }, (_, i) => 2 * i + 1).join(" + ")} $=${n * n}=${n}^2$. Máy kiểm thử ${N} giá trị đầu: ${allOk ? "công thức đúng cả" : "có chỗ sai"} (nhưng thử mãi vẫn chỉ là thử, không phải chứng minh). Bước quy nạp với $k=${k}$: $k^2+(2k+1)=${k * k}+${2 * k + 1}=${k * k + 2 * k + 1}=(k+1)^2=${(k + 1) ** 2}$, đúng với mọi $k$ vì $k^2+2k+1=(k+1)^2$.`,
        `$n=${n}$: ${Array.from({ length: n }, (_, i) => 2 * i + 1).join(" + ")} $=${n * n}=${n}^2$. The machine tests the first ${N} values: ${allOk ? "the formula holds for all of them" : "it fails somewhere"} (but testing forever is still only testing, not a proof). The induction step with $k=${k}$: $k^2+(2k+1)=${k * k}+${2 * k + 1}=${k * k + 2 * k + 1}=(k+1)^2=${(k + 1) ** 2}$, true for every $k$ because $k^2+2k+1=(k+1)^2$.`,
      )}
      why={tt(
        R`Hai bước đủ để chứng minh cho mọi $n$: (1) bước cơ sở, đúng với $n=1$; (2) bước quy nạp, nếu đúng với $k$ thì đúng với $k+1$. Như hàng domino: quân đầu đổ, và quân nào đổ cũng kéo đổ quân kế tiếp. Máy chỉ thử được hữu hạn trường hợp, còn bước quy nạp là một lập luận đúng cho vô hạn trường hợp cùng lúc.`,
        R`Two steps suffice to prove it for all $n$: (1) the base case, true for $n=1$; (2) the induction step, if it holds for $k$ then it holds for $k+1$. Like a row of dominoes: the first falls, and every fallen domino topples the next. The machine can only test finitely many cases; the induction step is one argument valid for infinitely many cases at once.`,
      )}
    >
      <Graph
        label={tt("Hình vuông được ghép từ các góc chữ L", "A square built from L-shaped corners")}
        draw={(ctx, w, h) => {
          const { colors } = frame(ctx, w, h, 0, 1, 0, 1);
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = colors.bg;
          ctx.fillRect(0, 0, w, h);
          const c = Math.min((w - 40) / n, (h - 40) / n, 40);
          const ox = (w - n * c) / 2;
          const oy = (h - n * c) / 2;
          for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
            const layer = Math.max(i, j);
            ctx.fillStyle = layer % 2 === 0 ? colors.curve : colors.alt;
            ctx.globalAlpha = 0.18 + 0.5 * ((layer + 1) / n);
            ctx.fillRect(ox + i * c, oy + (n - 1 - j) * c, c - 1, c - 1);
          }
          ctx.globalAlpha = 1;
          ctx.fillStyle = colors.ink;
          ctx.font = "12px system-ui";
          for (let l = 0; l < n; l++) ctx.fillText(String(2 * l + 1), ox + l * c + c * 0.25, oy + (n - 1 - l) * c + c * 0.6);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Cạnh hình vuông n", "Side of the square n")} value={n} min={1} max={12} step={1} onChange={setN} />
        <Slider label={tt("Số giá trị máy thử (10 mũ)", "Number of values the machine tests (power of 10)")} value={bound} min={1} max={6} step={1} onChange={setBound} />
        <Slider label={tt("Bước quy nạp: k", "Induction step: k")} value={k} min={1} max={30} step={1} onChange={setK} />
      </div>
    </Stage>
  );
}


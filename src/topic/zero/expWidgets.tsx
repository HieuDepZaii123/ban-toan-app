import { useMemo, useState } from "react";
import { bisection, findRoots, simulateDecay } from "../../algo/index.ts";
import { dashed, dot, strokeFn } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { freshSeed, mulberry32 } from "../../lib/prng.ts";
import { Slider } from "../../ui/Slider.tsx";
import { at, frame, label, line, useTx } from "./kit.ts";
import { Buttons, Stage } from "./widgets.tsx";

const R = String.raw;

/* ---------- 1. Quy tắc lũy thừa: đếm thừa số ---------- */

export function ExpLawsLab() {
  const tt = useTx();
  const [a, setA] = useState(2);
  const [m, setM] = useState(3);
  const [n, setN] = useState(2);
  const prod = a ** m * a ** n;
  const quo = a ** m / a ** n;
  const pow = (a ** m) ** n;
  return (
    <Stage
      title={tt("Quy tắc lũy thừa: đếm xem có bao nhiêu thừa số", "The laws of exponents: just count the factors")}
      story={tt(
        R`Lũy thừa $a^m$ là $m$ thừa số $a$ nhân với nhau. Vậy $a^m\cdot a^n$ là $m$ thừa số rồi thêm $n$ thừa số nữa: tổng cộng $m+n$ thừa số, tức $a^{m+n}$. Còn $(a^m)^n$ là $n$ nhóm, mỗi nhóm $m$ thừa số: $m\cdot n$ thừa số. Mỗi ô dưới đây là một thừa số $a$; hãy đếm.`,
        R`The power $a^m$ is $m$ factors of $a$ multiplied together. So $a^m\cdot a^n$ is $m$ factors followed by $n$ more: $m+n$ factors in all, i.e. $a^{m+n}$. And $(a^m)^n$ is $n$ groups of $m$ factors each: $m\cdot n$ factors. Each box below is one factor $a$; count them.`,
      )}
      read={tt(
        `$a=${fmt(a)}$, $m=${m}$, $n=${n}$. Hàng trên có ${m} + ${n} = ${m + n} ô: $a^m\\cdot a^n=${fmt(prod, 6)}=a^{${m + n}}=${fmt(a ** (m + n), 6)}$. Thương: $\\frac{a^m}{a^n}=${fmt(quo, 6)}=a^{${m - n}}=${fmt(a ** (m - n), 6)}$ (gạch bớt ${Math.min(m, n)} thừa số chung). Lưới ${n} nhóm × ${m} ô = ${m * n} ô: $(a^m)^n=${fmt(pow, 6)}=a^{${m * n}}=${fmt(a ** (m * n), 6)}$.`,
        `$a=${fmt(a)}$, $m=${m}$, $n=${n}$. The top row has ${m} + ${n} = ${m + n} boxes: $a^m\\cdot a^n=${fmt(prod, 6)}=a^{${m + n}}=${fmt(a ** (m + n), 6)}$. Quotient: $\\frac{a^m}{a^n}=${fmt(quo, 6)}=a^{${m - n}}=${fmt(a ** (m - n), 6)}$ (cancel ${Math.min(m, n)} common factors). The grid of ${n} groups × ${m} boxes = ${m * n} boxes: $(a^m)^n=${fmt(pow, 6)}=a^{${m * n}}=${fmt(a ** (m * n), 6)}$.`,
      )}
      why={tt(
        R`Số mũ chỉ là số thừa số, nên các quy tắc cộng, trừ, nhân số mũ chỉ là phép đếm. Quy ước $a^0=1$ và $a^{-n}=\frac{1}{a^n}$ được chọn đúng để các quy tắc này vẫn đúng khi số mũ bằng 0 hoặc âm: chẳng hạn $a^m\cdot a^0=a^{m+0}$ buộc $a^0=1$.`,
        R`An exponent is just a count of factors, so the rules for adding, subtracting and multiplying exponents are counting. The conventions $a^0=1$ and $a^{-n}=\frac{1}{a^n}$ are chosen exactly so the rules still hold for exponent 0 or negative: for example $a^m\cdot a^0=a^{m+0}$ forces $a^0=1$.`,
      )}
    >
      <Graph
        label={tt("Các ô thừa số của hai quy tắc", "The factor boxes behind the two rules")}
        draw={(ctx, w, h) => {
          const { colors } = frame(ctx, w, h, 0, 1, 0, 1);
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = colors.bg;
          ctx.fillRect(0, 0, w, h);
          const box = Math.min(34, (w - 40) / Math.max(m + n, m), (h - 90) / (n + 2));
          const draw = (col: number, row: number, c: string, text: string) => { ctx.fillStyle = c; ctx.globalAlpha = 0.35; ctx.fillRect(20 + col * (box + 3), 28 + row * (box + 3), box, box); ctx.globalAlpha = 1; ctx.strokeStyle = colors.ink; ctx.lineWidth = 1; ctx.strokeRect(20 + col * (box + 3), 28 + row * (box + 3), box, box); ctx.fillStyle = colors.ink; ctx.font = `${Math.max(9, box * 0.45)}px system-ui`; ctx.fillText(text, 20 + col * (box + 3) + box * 0.3, 28 + row * (box + 3) + box * 0.65); };
          for (let i = 0; i < m; i++) draw(i, 0, colors.curve, fmt(a));
          for (let i = 0; i < n; i++) draw(m + i, 0, colors.alt, fmt(a));
          label(ctx, tt(`a^${m} · a^${n}: ${m} + ${n} = ${m + n} thừa số`, `a^${m} · a^${n}: ${m} + ${n} = ${m + n} factors`), 20, 20, colors.ink);
          for (let g = 0; g < n; g++) for (let i = 0; i < m; i++) draw(i, 2 + g, g % 2 === 0 ? colors.curve : colors.alt, fmt(a));
          label(ctx, tt(`(a^${m})^${n}: ${n} nhóm × ${m} = ${m * n} thừa số`, `(a^${m})^${n}: ${n} groups × ${m} = ${m * n} factors`), 20, 28 + 2 * (box + 3) - 6, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Cơ số a", "Base a")} value={a} min={2} max={5} step={1} onChange={setA} />
        <Slider label="m" value={m} min={1} max={8} step={1} onChange={setM} />
        <Slider label="n" value={n} min={1} max={8} step={1} onChange={setN} />
      </div>
    </Stage>
  );
}

/* ---------- 2. Thước logarit: nhân thành cộng ---------- */

export function SlideRuleLab() {
  const tt = useTx();
  const [b, setB] = useState(2.5);
  const [x, setX] = useState(3);
  const product = b * x;
  const posFixed = (v: number, L: number) => 20 + (Math.log10(v) / 2) * L;
  return (
    <Stage
      title={tt("Thước logarit: logarit biến phép nhân thành phép cộng", "The slide rule: logarithms turn multiplication into addition")}
      story={tt(
        R`Thước tính cổ chỉ có hai thang chia khoảng cách theo logarit: số $v$ nằm cách mốc 1 một đoạn $\log_{10}v$. Muốn nhân $b\cdot x$: trượt thang dưới sao cho mốc 1 của nó nằm ngay dưới $b$ trên thang trên, rồi nhìn: số $x$ trên thang dưới nằm ngay dưới tích $b\cdot x$ trên thang trên. Ta chỉ cộng hai đoạn thẳng: $\log b+\log x=\log(bx)$.`,
        R`An old slide rule has just two scales whose distances are logarithmic: the number $v$ sits at distance $\log_{10}v$ from the mark 1. To multiply $b\cdot x$: slide the lower scale so its mark 1 sits right under $b$ on the upper scale; then the number $x$ on the lower scale sits right under the product $b\cdot x$ on the upper scale. We only add two lengths: $\log b+\log x=\log(bx)$.`,
      )}
      read={tt(
        `Đoạn của $b=${fmt(b, 2)}$: $\\log_{10}b=${fmt(Math.log10(b), 4)}$. Đoạn của $x=${fmt(x, 2)}$: $\\log_{10}x=${fmt(Math.log10(x), 4)}$. Cộng hai đoạn $=${fmt(Math.log10(b) + Math.log10(x), 4)}$. Đọc trên thang trên: số có $\\log_{10}$ bằng đó là $${fmt(10 ** (Math.log10(b) + Math.log10(x)), 4)}$, đúng bằng $b\\cdot x=${fmt(product, 4)}$.`,
        `Length of $b=${fmt(b, 2)}$: $\\log_{10}b=${fmt(Math.log10(b), 4)}$. Length of $x=${fmt(x, 2)}$: $\\log_{10}x=${fmt(Math.log10(x), 4)}$. The two lengths add to $${fmt(Math.log10(b) + Math.log10(x), 4)}$. Reading the upper scale: the number whose $\\log_{10}$ is that is $${fmt(10 ** (Math.log10(b) + Math.log10(x)), 4)}$, exactly $b\\cdot x=${fmt(product, 4)}$.`,
      )}
      why={tt(
        R`Vì $10^{u}\cdot 10^{v}=10^{u+v}$, số mũ cộng lại khi nhân. Logarit chính là số mũ, nên $\log(bx)=\log b+\log x$. Đây là lý do logarit từng là công cụ tính toán của mọi kĩ sư trước khi có máy tính, và vẫn là lý do ta dùng thang logarit để vẽ những đại lượng trải rất rộng như độ to âm thanh hay động đất.`,
        R`Since $10^{u}\cdot 10^{v}=10^{u+v}$, exponents add when we multiply. A logarithm is an exponent, so $\log(bx)=\log b+\log x$. That is why logarithms were every engineer's calculating tool before computers, and why we still use logarithmic scales for quantities spanning huge ranges, like loudness or earthquakes.`,
      )}
    >
      <Graph
        label={tt("Hai thang logarit trượt lên nhau", "Two logarithmic scales sliding on each other")}
        draw={(ctx, w, h) => {
          const { colors } = frame(ctx, w, h, 0, 1, 0, 1);
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = colors.bg;
          ctx.fillRect(0, 0, w, h);
          const L = w - 40;
          const yTop = h * 0.32;
          const yBot = h * 0.62;
          ctx.fillStyle = colors.ink;
          ctx.font = "11px system-ui";
          const scale = (y: number, shift: number, decades: number, col: string) => {
            line(ctx, 20 + shift, y, 20 + shift + (decades / 2) * L, y, col, 2);
            for (let dcd = 0; dcd < decades; dcd++) for (let v = 1; v <= 10; v++) {
              const val = v * 10 ** dcd;
              if (v === 10 && dcd < decades - 1) continue;
              const px = 20 + shift + (Math.log10(val) / 2) * L;
              line(ctx, px, y - 8, px, y + 8, col, 1.4);
              ctx.fillText(String(val), px - 6, y - 12);
            }
          };
          scale(yTop, 0, 2, colors.ink);
          const sh = (Math.log10(b) / 2) * L;
          scale(yBot, sh, 1, colors.alt);
          line(ctx, posFixed(b, L), yTop, posFixed(b, L), yBot, colors.curve, 2);
          const px = posFixed(Math.max(1, Math.min(100, product)), L);
          dashed(ctx, px, yTop, px, yBot, colors.alt);
          dot(ctx, px, yTop, colors.alt, colors.bg, 6);
          label(ctx, tt(`b = ${fmt(b, 2)}`, `b = ${fmt(b, 2)}`), posFixed(b, L) - 14, yTop - 30, colors.curve);
          label(ctx, `b·x = ${fmt(product, 2)}`, px - 24, yTop - 30, colors.alt);
          label(ctx, `x = ${fmt(x, 2)}`, 20 + sh + (Math.log10(x) / 2) * L - 14, yBot + 30, colors.alt);
          label(ctx, tt("thang cố định (1 → 100)", "fixed scale (1 → 100)"), 20, h * 0.12, colors.ink);
          label(ctx, tt("thang trượt (1 → 10)", "sliding scale (1 → 10)"), 20, h * 0.85, colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Thừa số b", "Factor b")} value={b} min={1} max={10} step={0.25} onChange={setB} />
        <Slider label={tt("Thừa số x", "Factor x")} value={x} min={1} max={10} step={0.25} onChange={setX} />
      </div>
    </Stage>
  );
}

/* ---------- 3. Hàm ngược: gương qua y = x ---------- */

export function InverseGraphLab() {
  const tt = useTx();
  const [a, setA] = useState(2);
  const [t, setT] = useState(1.2);
  const f = (x: number) => a ** x;
  const g = (y: number) => Math.log(y) / Math.log(a);
  const c = f(t);
  const steps = bisection((x) => f(x) - c, -6, 8, 60);
  const found = steps.length ? (steps[steps.length - 1] as { mid: number }).mid : NaN;
  return (
    <Stage
      title={tt("Logarit là hàm ngược của hàm mũ: hai đồ thị soi gương qua y = x", "The logarithm is the inverse of the exponential: mirror images across y = x")}
      story={tt(
        R`Điểm $(t;\ a^t)$ nằm trên đồ thị hàm mũ nghĩa là $a^t$ là kết quả của việc nâng $a$ lên mũ $t$. Đổi chỗ hai toạ độ được điểm $(a^t;\ t)$: đây là điểm trên đồ thị logarit, vì logarit hỏi ngược lại «mũ mấy thì ra $a^t$». Đổi chỗ hai toạ độ là lấy đối xứng qua đường $y=x$, nên hai đồ thị là ảnh của nhau trong gương. Máy tìm số mũ bằng cách chia đôi để giải $a^x=c$, rồi so với $\ln c/\ln a$.`,
        R`The point $(t;\ a^t)$ lies on the exponential graph: $a^t$ is the result of raising $a$ to the power $t$. Swapping the two coordinates gives $(a^t;\ t)$, a point on the logarithm graph, since the logarithm asks the reverse: «which power gives $a^t$?». Swapping coordinates is reflection across the line $y=x$, so the two graphs are mirror images. The machine finds the exponent by bisection, solving $a^x=c$, and compares with $\ln c/\ln a$.`,
      )}
      read={tt(
        `Cơ số $a=${fmt(a)}$. Điểm trên đồ thị mũ $(${fmt(t, 2)};\\ ${fmt(c, 4)})$, ảnh gương $(${fmt(c, 4)};\\ ${fmt(t, 2)})$. Máy chia đôi giải $a^x=${fmt(c, 4)}$ ra $x=${fmt(found, 6)}$; công thức $\\log_a ${fmt(c, 4)}=\\frac{\\ln ${fmt(c, 4)}}{\\ln ${fmt(a)}}=${fmt(g(c), 6)}$. Cả hai trả về số mũ $t$.`,
        `Base $a=${fmt(a)}$. Point on the exponential graph $(${fmt(t, 2)};\\ ${fmt(c, 4)})$, its mirror image $(${fmt(c, 4)};\\ ${fmt(t, 2)})$. Bisection solving $a^x=${fmt(c, 4)}$ gives $x=${fmt(found, 6)}$; the formula $\\log_a ${fmt(c, 4)}=\\frac{\\ln ${fmt(c, 4)}}{\\ln ${fmt(a)}}=${fmt(g(c), 6)}$. Both return the exponent $t$.`,
      )}
      why={tt(
        R`Hai hàm ngược nhau khi cái này làm xong thì cái kia hoàn tác: $\log_a(a^t)=t$ và $a^{\log_a c}=c$. Hệ quả: miền xác định của logarit $(0;+\infty)$ chính là tập giá trị của hàm mũ, và tiệm cận ngang $y=0$ của hàm mũ thành tiệm cận đứng $x=0$ của logarit.`,
        R`Two functions are inverse when one undoes the other: $\log_a(a^t)=t$ and $a^{\log_a c}=c$. Consequences: the domain $(0;+\infty)$ of the logarithm is the range of the exponential, and the horizontal asymptote $y=0$ of the exponential becomes the vertical asymptote $x=0$ of the logarithm.`,
      )}
    >
      <Graph
        label={tt("Đồ thị hàm mũ, logarit và đường y = x", "The exponential, the logarithm and the line y = x")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, -3, 8, -3, 6, "x", "y", true);
          strokeFn(ctx, map, w, h, pad, -3, 8, f, colors.curve, 2.6);
          strokeFn(ctx, map, w, h, pad, 0.02, 8, g, colors.alt, 2.6);
          dashed(ctx, map.x(-3), map.y(-3), map.x(8), map.y(8), colors.soft);
          dashed(ctx, map.x(t), map.y(c), map.x(c), map.y(t), colors.ink);
          dot(ctx, map.x(t), map.y(c), colors.curve, colors.bg, 6);
          dot(ctx, map.x(c), map.y(t), colors.alt, colors.bg, 6);
          label(ctx, "y = aˣ", map.x(-2.8), map.y(f(-2.8)) - 10, colors.curve);
          label(ctx, "y = log_a x", map.x(5), map.y(g(5)) + 16, colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Cơ số a", "Base a")} value={a} min={1.2} max={4} step={0.1} onChange={setA} />
        <Slider label={tt("Số mũ t", "Exponent t")} value={t} min={-2} max={3} step={0.1} onChange={setT} />
      </div>
    </Stage>
  );
}

/* ---------- 4. Phân rã: ngẫu nhiên từng nguyên tử, đều đặn cả khối ---------- */

export function DecayLab() {
  const tt = useTx();
  const [n0, setN0] = useState(1500);
  const [p, setP] = useState(0.12);
  const [seed, setSeed] = useState(17);
  const steps = 40;
  const sim = useMemo(() => simulateDecay(n0, p, steps, mulberry32(seed)), [n0, p, seed]);
  const half = sim.findIndex((v) => v <= n0 / 2);
  const T = Math.log(2) / -Math.log(1 - p);
  return (
    <Stage
      title={tt("Phân rã phóng xạ: từng nguyên tử ngẫu nhiên, cả khối thì đều đặn", "Radioactive decay: each atom is random, the whole sample is regular")}
      story={tt(
        R`Không ai đoán được một nguyên tử cụ thể bao giờ phân rã: mỗi bước thời gian nó chỉ có một xác suất $p$ bị phân rã. Máy mô phỏng từng nguyên tử một bằng cách tung xúc xắc. Vậy mà số nguyên tử còn lại gần như bám sát một đường cong trơn, vì mỗi bước còn lại khoảng $(1-p)$ lần số trước đó: tăng trưởng mũ với cơ số $1-p<1$. Chấm là mô phỏng, đường là công thức $N_0(1-p)^t$.`,
        R`No one can predict when one particular atom will decay: at each time step it only has a probability $p$ of decaying. The machine simulates atoms one by one by rolling dice. Yet the number of atoms left follows a smooth curve very closely, because each step leaves about $(1-p)$ times the previous number: exponential change with base $1-p<1$. The dots are the simulation, the curve is the formula $N_0(1-p)^t$.`,
      )}
      read={tt(
        `Sau ${steps} bước còn ${sim[steps]} nguyên tử; công thức $N_0(1-p)^{${steps}}=${fmt(n0 * (1 - p) ** steps, 1)}$. Chu kì bán rã đo được: ${half < 0 ? "chưa tới" : `$${half}$ bước`}; công thức $T=\\frac{\\ln 2}{-\\ln(1-p)}=${fmt(T, 3)}$ bước. Dùng logarit: $(1-p)^T=\\frac{1}{2}$ nên $T=\\log_{1-p}\\frac{1}{2}$.`,
        `After ${steps} steps ${sim[steps]} atoms remain; the formula $N_0(1-p)^{${steps}}=${fmt(n0 * (1 - p) ** steps, 1)}$. Measured half-life: ${half < 0 ? "not reached" : `$${half}$ steps`}; the formula $T=\\frac{\\ln 2}{-\\ln(1-p)}=${fmt(T, 3)}$ steps. Using logarithms: $(1-p)^T=\\frac{1}{2}$ so $T=\\log_{1-p}\\frac{1}{2}$.`,
      )}
      why={tt(
        R`Khi có rất nhiều nguyên tử, sai khác ngẫu nhiên triệt tiêu lẫn nhau và quy luật trung bình hiện ra (luật số lớn). Thời gian bán rã không phụ thuộc lúc bắt đầu: sau mỗi $T$ bước lượng còn lại giảm một nửa, dù đang có nhiều hay ít. Đó chính là tính chất của hàm mũ.`,
        R`With very many atoms the random deviations cancel and the average law appears (the law of large numbers). The half-life does not depend on when you start: after every $T$ steps the amount left halves, whether there is a lot or a little. That is exactly the property of the exponential function.`,
      )}
    >
      <Graph
        label={tt("Số nguyên tử còn lại: mô phỏng và công thức", "Atoms remaining: simulation and formula")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, 0, steps, 0, n0 * 1.05, tt("bước", "step"), "N");
          strokeFn(ctx, map, w, h, pad, 0, steps, (x) => n0 * (1 - p) ** x, colors.alt, 2.4);
          sim.forEach((v, i) => dot(ctx, map.x(i), map.y(v), colors.curve, colors.bg, 3.5));
          dashed(ctx, map.x(0), map.y(n0 / 2), map.x(steps), map.y(n0 / 2), colors.soft);
          if (half >= 0) dot(ctx, map.x(half), map.y(sim[half] as number), colors.ink, colors.bg, 6);
          label(ctx, "N₀/2", map.x(steps) - 34, map.y(n0 / 2) - 6, colors.soft);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số nguyên tử ban đầu N₀", "Initial atoms N₀")} value={n0} min={100} max={3000} step={100} onChange={setN0} />
        <Slider label={tt("Xác suất phân rã mỗi bước p", "Decay probability per step p")} value={p} min={0.02} max={0.3} step={0.01} onChange={setP} />
      </div>
      <Buttons><button type="button" className="text-btn" onClick={() => setSeed(freshSeed() % 100000)}>{tt("Mô phỏng lại", "Simulate again")}</button></Buttons>
    </Stage>
  );
}

/* ---------- 5. Phương trình mũ và logarit ---------- */

const EQS = [
  { vi: "2^x = 7  (lấy logarit hai vế)", en: "2^x = 7  (take logarithms)", f: (x: number) => 2 ** x - 7, lo: -2, hi: 5, exact: Math.log(7) / Math.log(2), stepVi: "Hai vế không cùng cơ số: lấy $\\log_2$ cả hai vế được $x=\\log_2 7$.", stepEn: "The sides do not share a base: take $\\log_2$ of both sides to get $x=\\log_2 7$.", dom: -Infinity },
  { vi: "4^x − 3·2^x − 4 = 0  (đặt t = 2^x)", en: "4^x − 3·2^x − 4 = 0  (put t = 2^x)", f: (x: number) => 4 ** x - 3 * 2 ** x - 4, lo: -3, hi: 4, exact: 2, stepVi: "Đặt $t=2^x>0$: $t^2-3t-4=0$ cho $t=4$ hoặc $t=-1$. Loại $t=-1$ vì $2^x$ luôn dương, còn $2^x=4$ cho $x=2$.", stepEn: "Put $t=2^x>0$: $t^2-3t-4=0$ gives $t=4$ or $t=-1$. Reject $t=-1$ because $2^x$ is always positive; $2^x=4$ gives $x=2$.", dom: -Infinity },
  { vi: "log₂x + log₂(x − 2) = 3  (điều kiện x > 2)", en: "log₂x + log₂(x − 2) = 3  (condition x > 2)", f: (x: number) => (x > 2 ? Math.log2(x) + Math.log2(x - 2) - 3 : NaN), lo: 2.001, hi: 9, exact: 4, stepVi: "Điều kiện $x>2$. Gộp: $\\log_2[x(x-2)]=3$ nên $x(x-2)=8$, tức $x^2-2x-8=0$, cho $x=4$ hoặc $x=-2$. Loại $x=-2$ vì vi phạm điều kiện.", stepEn: "Condition $x>2$. Combine: $\\log_2[x(x-2)]=3$ so $x(x-2)=8$, i.e. $x^2-2x-8=0$, giving $x=4$ or $x=-2$. Reject $x=-2$: it breaks the condition.", dom: 2 },
];

export function ExpEquationLab() {
  const tt = useTx();
  const [pick, setPick] = useState(1);
  const s = at(EQS, pick);
  const roots = findRoots(s.f, s.lo, s.hi, 6000);
  return (
    <Stage
      title={tt("Giải phương trình mũ và logarit: máy tìm nghiệm, đại số giải thích vì sao", "Solving exponential and logarithmic equations: the machine finds roots, algebra explains why")}
      story={tt(
        R`Nghiệm của phương trình là chỗ đồ thị của vế trái trừ vế phải cắt trục hoành. Máy quét và chia đôi để tìm các chỗ cắt, không cần biết cách giải. Cách giải đại số thì chọn phép biến đổi phù hợp: lấy logarit, đặt ẩn phụ, hoặc gộp logarit. Hai cách phải ra cùng nghiệm, và đại số còn giải thích vì sao một nghiệm «giả» bị loại.`,
        R`A solution of an equation is where the graph of left side minus right side meets the horizontal axis. The machine scans and bisects to find the crossings without knowing how to solve. The algebraic method picks the right transformation: take logarithms, substitute, or combine logarithms. The two must give the same roots, and algebra also explains why a «fake» root gets rejected.`,
      )}
      read={tt(
        `Máy tìm được ${roots.length} nghiệm trong $[${fmt(s.lo, 2)};\\ ${fmt(s.hi, 2)}]$: ${roots.map((r) => `$x=${fmt(r, 5)}$`).join("; ") || "không có"}. Đáp số đại số: $x=${fmt(s.exact, 5)}$. ${s.stepVi}`,
        `The machine finds ${roots.length} solutions in $[${fmt(s.lo, 2)};\\ ${fmt(s.hi, 2)}]$: ${roots.map((r) => `$x=${fmt(r, 5)}$`).join("; ") || "none"}. Algebraic answer: $x=${fmt(s.exact, 5)}$. ${s.stepEn}`,
      )}
      why={tt(
        R`Điều kiện xác định không phải thủ tục: với logarit, đối số phải dương; với ẩn phụ $t=a^x$, phải có $t>0$. Bỏ qua điều kiện là nguồn lỗi nhiều nhất, và trên đồ thị nó hiện ra rõ: nghiệm «giả» nằm ngoài chỗ đồ thị tồn tại.`,
        R`The domain conditions are not red tape: for logarithms the argument must be positive; with the substitution $t=a^x$ we need $t>0$. Ignoring conditions is the commonest source of errors, and the graph shows it clearly: the «fake» root lies where the graph does not exist.`,
      )}
    >
      <Graph
        label={tt("Đồ thị vế trái trừ vế phải và các nghiệm", "Graph of left minus right and the solutions")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, s.lo - 0.5, s.hi + 0.5, -8, 12);
          strokeFn(ctx, map, w, h, pad, Math.max(s.lo, s.dom + 0.001), s.hi, s.f, colors.curve, 2.6);
          if (s.dom > -Infinity) dashed(ctx, map.x(s.dom), map.y(-8), map.x(s.dom), map.y(12), colors.alt);
          for (const r of roots) dot(ctx, map.x(r), map.y(0), colors.alt, colors.bg, 7);
        }}
      />
      <div className="fz-controls">
        <label className="fz-pick">{tt("Phương trình", "Equation")}
          <select value={pick} onChange={(e) => setPick(Number(e.target.value))}>{EQS.map((q, i) => <option key={q.vi} value={i}>{tt(q.vi, q.en)}</option>)}</select>
        </label>
      </div>
    </Stage>
  );
}

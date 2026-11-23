import { diceSumHistogram, intervalCoverage, normalCdf, runningDiceMeans } from "../../algo/index.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { mulberry32 } from "../../lib/prng.ts";
import { Slider } from "../../ui/Slider.tsx";
import { PlayButtons, useLoop } from "./anim.tsx";
import { frame, label, line, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;
const SIGMA = Math.sqrt(35 / 12);
const MEANS = runningDiceMeans(3000, mulberry32(7));

/* ---------- 1. Luật số lớn: trung bình xúc xắc hội tụ, dải sai số co lại ---------- */

export function LawOfLargeNumbersAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(60, 0.004);
  const n = Math.max(2, Math.round(3000 ** phase));
  const cur = MEANS[n - 1]!;
  const band = (2 * SIGMA) / Math.sqrt(n);
  const xs = (k: number) => Math.log(k);
  return (
    <Stage
      title={tt("Tung xúc xắc nhiều lần: trung bình dần dừng ở 3,5 và dải sai số co lại", "Roll a die many times: the average settles at 3.5 and the error band shrinks")}
      story={tt(
        R`Đường cam là trung bình của $n$ lần tung đầu tiên (một dãy tung có hạt giống cố định). Ở vài lần đầu nó nhảy rất mạnh, rồi dần ổn định gần $3{,}5$. Hai đường chấm là dải $\mu\pm\frac{2\sigma}{\sqrt n}$ với $\sigma^2=\frac{35}{12}$: dải này co lại theo $\frac{1}{\sqrt n}$ và trung bình hầu như luôn nằm trong dải.`,
        R`The orange line is the average of the first $n$ rolls (one fixed-seed sequence). In the first few rolls it jumps wildly, then settles near $3.5$. The two dotted lines are the band $\mu\pm\frac{2\sigma}{\sqrt n}$ with $\sigma^2=\frac{35}{12}$: it shrinks like $\frac{1}{\sqrt n}$ and the average almost always stays inside it.`,
      )}
      read={tt(
        `Sau $n=${n}$ lần tung: trung bình $${fmt(cur, 4)}$, lệch khỏi $3{,}5$ là $${fmt(Math.abs(cur - 3.5), 4)}$, nửa dải $\\frac{2\\sigma}{\\sqrt n}=${fmt(band, 4)}$. ${Math.abs(cur - 3.5) <= band ? "Trung bình nằm trong dải." : "Lần này trung bình ra ngoài dải: chuyện hiếm nhưng có thể xảy ra."}`,
        `After $n=${n}$ rolls: average $${fmt(cur, 4)}$, off from $3.5$ by $${fmt(Math.abs(cur - 3.5), 4)}$, half-band $\\frac{2\\sigma}{\\sqrt n}=${fmt(band, 4)}$. ${Math.abs(cur - 3.5) <= band ? "The average is inside the band." : "This time the average is outside the band: rare, but possible."}`,
      )}
      why={tt(
        R`Trung bình $\bar X_n$ có kì vọng $\mu$ và phương sai $\frac{\sigma^2}{n}$, vì phương sai của tổng $n$ biến độc lập là $n\sigma^2$ rồi chia $n^2$. Bất đẳng thức Chebyshev cho $P(|\bar X_n-\mu|\ge\varepsilon)\le\frac{\sigma^2}{n\varepsilon^2}$, tiến về $0$ khi $n$ tăng: đó là luật số lớn.`,
        R`The average $\bar X_n$ has expectation $\mu$ and variance $\frac{\sigma^2}{n}$, because the variance of a sum of $n$ independent variables is $n\sigma^2$, then divided by $n^2$. Chebyshev's inequality gives $P(|\bar X_n-\mu|\ge\varepsilon)\le\frac{\sigma^2}{n\varepsilon^2}$, which tends to $0$ as $n$ grows: that is the law of large numbers.`,
      )}
    >
      <Graph
        label={tt("Trung bình của n lần tung xúc xắc và dải sai số", "The average of n dice rolls and the error band")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, 0, xs(3000), 1, 6, "log n", "TB");
          ctx.beginPath();
          ctx.strokeStyle = colors.alt;
          ctx.lineWidth = 2;
          for (let k = 1; k <= n; k++) {
            const px = map.x(xs(k));
            const py = map.y(MEANS[k - 1]!);
            if (k === 1) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.stroke();
          for (const sign of [1, -1]) {
            ctx.beginPath();
            ctx.setLineDash([4, 4]);
            ctx.strokeStyle = colors.soft;
            ctx.lineWidth = 1.4;
            for (let k = 1; k <= 3000; k += 4) {
              const px = map.x(xs(k));
              const py = map.y(3.5 + (sign * 2 * SIGMA) / Math.sqrt(k));
              if (k === 1) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.stroke();
            ctx.setLineDash([]);
          }
          line(ctx, map.x(0), map.y(3.5), map.x(xs(3000)), map.y(3.5), colors.ink, 1.2);
          label(ctx, `n = ${n}`, map.x(0.2), map.y(5.6), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số lần tung (thang log)", "Number of rolls (log scale)")} value={phase} min={0.05} max={0.999} step={0.005} onChange={(x) => { setRunning(false); setPhase(x); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 2. Giới hạn trung tâm: tổng k xúc xắc thành hình chuông ---------- */

export function CentralLimitAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(450, 0.09);
  const k = 1 + Math.floor(phase * 12);
  const rolls = 6000;
  const hist = diceSumHistogram(k, rolls, mulberry32(21 + k));
  const mu = 3.5 * k;
  const sd = SIGMA * Math.sqrt(k);
  const peak = Math.max(...hist) / rolls;
  const within = hist.reduce((s, c, v) => (Math.abs(v - mu) <= sd ? s + c : s), 0) / rolls;
  return (
    <Stage
      title={tt("Cộng thêm xúc xắc: biểu đồ dần thành hình chuông", "Adding more dice: the histogram turns into a bell")}
      story={tt(
        R`Với $k=1$ xúc xắc, các mặt xuất hiện đều nhau nên biểu đồ phẳng. Cộng hai xúc xắc được hình tam giác. Cộng nhiều hơn, biểu đồ của tổng dần tròn lại thành chuông, và đường cong chuẩn $N(3{,}5k;\,\frac{35}{12}k)$ (nét cam) khớp ngày càng sát, dù xúc xắc ban đầu không hề có hình chuông.`,
        R`With $k=1$ die all faces are equally likely, so the histogram is flat. Two dice give a triangle. With more dice the histogram of the sum rounds off into a bell, and the normal curve $N(3.5k;\,\frac{35}{12}k)$ (orange) fits ever closer, although a single die is nothing like a bell.`,
      )}
      read={tt(
        `Tổng của $k=${k}$ xúc xắc, ${rolls} lần tung: kì vọng $${fmt(mu, 1)}$, độ lệch chuẩn $${fmt(sd, 3)}$. Có $${fmt(within * 100, 1)}\\%$ số lần nằm trong khoảng $\\mu\\pm\\sigma$ (chuẩn: khoảng $68{,}3\\%$).`,
        `Sum of $k=${k}$ dice, ${rolls} rolls: expectation $${fmt(mu, 1)}$, standard deviation $${fmt(sd, 3)}$. $${fmt(within * 100, 1)}\\%$ of the rolls fall within $\\mu\\pm\\sigma$ (normal: about $68.3\\%$).`,
      )}
      why={tt(
        R`Đặt $Z_k=\frac{S_k-3{,}5k}{\sigma\sqrt k}$. Định lí giới hạn trung tâm nói $Z_k$ tiến về phân phối chuẩn tắc khi $k\to\infty$. Lí do trong chứng minh: hàm sinh moment của $Z_k$ là $\left(1+\frac{t^2}{2k}+\cdots\right)^k\to e^{t^2/2}$, đúng là hàm sinh moment của chuẩn tắc.`,
        R`Let $Z_k=\frac{S_k-3.5k}{\sigma\sqrt k}$. The central limit theorem says $Z_k$ tends to the standard normal distribution as $k\to\infty$. The reason in the proof: the moment generating function of $Z_k$ is $\left(1+\frac{t^2}{2k}+\cdots\right)^k\to e^{t^2/2}$, exactly that of the standard normal.`,
      )}
    >
      <Graph
        label={tt("Biểu đồ tần suất của tổng k xúc xắc và đường cong chuẩn", "Frequency histogram of the sum of k dice and the normal curve")}
        draw={(ctx, w, hh) => {
          const top = Math.max(peak, 1 / (sd * Math.sqrt(2 * Math.PI))) * 1.15;
          const { colors, map } = frame(ctx, w, hh, k - 0.5, 6 * k + 0.5, 0, top, "tổng", "tần suất");
          hist.forEach((c, v) => {
            if (v < k || c === 0) return;
            ctx.fillStyle = colors.curve;
            ctx.globalAlpha = 0.55;
            ctx.fillRect(map.x(v - 0.45), map.y(c / rolls), map.x(v + 0.45) - map.x(v - 0.45), map.y(0) - map.y(c / rolls));
            ctx.globalAlpha = 1;
          });
          ctx.beginPath();
          ctx.strokeStyle = colors.alt;
          ctx.lineWidth = 2.2;
          for (let i = 0; i <= 160; i++) {
            const x = k + ((6 * k - k) * i) / 160;
            const y = normalCdf((x + 0.5 - mu) / sd) - normalCdf((x - 0.5 - mu) / sd);
            if (i === 0) ctx.moveTo(map.x(x), map.y(y)); else ctx.lineTo(map.x(x), map.y(y));
          }
          ctx.stroke();
          label(ctx, `k = ${k}`, map.x(k), map.y(top * 0.95), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số xúc xắc k", "Number of dice k")} value={k} min={1} max={12} step={1} onChange={(v) => { setRunning(false); setPhase((v - 1) / 12 + 0.01); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 3. Khoảng tin cậy: đa số phủ trung bình thật ---------- */

const COVER = intervalCoverage(60, 30, 1.96, mulberry32(5));

export function ConfidenceIntervalAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(250, 0.03);
  const shown = Math.max(1, Math.floor(phase * 60));
  const seen = COVER.intervals.slice(0, shown);
  const covered = seen.filter((v) => v.covers).length;
  return (
    <Stage
      title={tt("Nhiều mẫu, nhiều khoảng tin cậy: khoảng 95% trong số đó phủ trung bình thật", "Many samples, many confidence intervals: about 95% of them cover the true mean")}
      story={tt(
        R`Lấy lần lượt các mẫu $30$ số ngẫu nhiên trong $[0;1]$, trung bình thật là $0{,}5$. Mỗi mẫu cho một khoảng $\bar x\pm1{,}96\frac{\sigma}{\sqrt{30}}$ với $\sigma=\sqrt{\frac1{12}}$. Khoảng nào chứa $0{,}5$ được vẽ màu xanh; khoảng trượt mất $0{,}5$ được vẽ màu cam. Số khoảng cam rất ít, khoảng $1$ trong $20$.`,
        R`Take samples of $30$ random numbers in $[0;1]$ one after another; the true mean is $0.5$. Each sample gives an interval $\bar x\pm1.96\frac{\sigma}{\sqrt{30}}$ with $\sigma=\sqrt{\frac1{12}}$. An interval containing $0.5$ is drawn in teal; one that misses $0.5$ is drawn in orange. Orange intervals are rare, about $1$ in $20$.`,
      )}
      read={tt(
        `Đã vẽ ${shown} khoảng: ${covered} khoảng phủ $0{,}5$, tức $${fmt((covered / shown) * 100, 0)}\\%$. Kì vọng của tỉ lệ này là $95\\%$; với ít mẫu nó dao động quanh mức đó.`,
        `${shown} intervals drawn: ${covered} cover $0.5$, that is $${fmt((covered / shown) * 100, 0)}\\%$. The expected rate is $95\\%$; with few samples it wobbles around that level.`,
      )}
      why={tt(
        R`Theo định lí giới hạn trung tâm, $\frac{\bar X-\mu}{\sigma/\sqrt n}$ xấp xỉ chuẩn tắc, và $P(|Z|\le1{,}96)\approx0{,}95$. Biến đổi bất đẳng thức thành $\bar X-1{,}96\frac{\sigma}{\sqrt n}\le\mu\le\bar X+1{,}96\frac{\sigma}{\sqrt n}$. Mức $95\%$ là về quy trình: khoảng đã vẽ xong thì hoặc phủ $\mu$ hoặc không.`,
        R`By the central limit theorem, $\frac{\bar X-\mu}{\sigma/\sqrt n}$ is approximately standard normal, and $P(|Z|\le1.96)\approx0.95$. Rearranging the inequality gives $\bar X-1.96\frac{\sigma}{\sqrt n}\le\mu\le\bar X+1.96\frac{\sigma}{\sqrt n}$. The $95\%$ is about the procedure: once an interval is drawn it either covers $\mu$ or it does not.`,
      )}
    >
      <Graph
        label={tt("Các khoảng tin cậy 95% từ các mẫu liên tiếp, đường dọc là trung bình thật 0,5", "95% confidence intervals from successive samples; the vertical line is the true mean 0.5")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, 0.3, 0.7, 0, 61, "x̄", "mẫu");
          line(ctx, map.x(0.5), map.y(0), map.x(0.5), map.y(61), colors.ink, 1.6);
          seen.forEach((v, i) => {
            line(ctx, map.x(v.lo), map.y(i + 1), map.x(v.hi), map.y(i + 1), v.covers ? colors.curve : colors.alt, 2.2);
          });
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số mẫu đã lấy", "Samples drawn")} value={shown} min={1} max={60} step={1} onChange={(v) => { setRunning(false); setPhase(v / 60); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

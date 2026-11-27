import { useMemo, useState } from "react";
import { bayes, binomialPmf, birthdayExact, birthdaySim, diceSumHistogram, runningProportion, simpson } from "../../algo/index.ts";
import { dashed, dot, strokeFn } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { freshSeed, mulberry32 } from "../../lib/prng.ts";
import { Slider } from "../../ui/Slider.tsx";
import { frame, label, line, useTx } from "./kit.ts";
import { Buttons, Stage } from "./widgets.tsx";

const R = String.raw;

/* ---------- 1. Bayes bằng diện tích ---------- */

export function BayesLab() {
  const tt = useTx();
  const [pB, setPB] = useState(0.1);
  const [se, setSe] = useState(0.95);
  const [fp, setFp] = useState(0.08);
  const r = bayes(pB, se, fp);
  const sim = useMemo(() => {
    const rng = mulberry32(Math.round(pB * 1000 + se * 100 + fp * 10));
    let a = 0; let ba = 0;
    for (let i = 0; i < 100000; i++) { const b = rng() < pB; const pos = rng() < (b ? se : fp); if (pos) { a++; if (b) ba++; } }
    return a === 0 ? 0 : ba / a;
  }, [pB, se, fp]);
  return (
    <Stage
      title={tt("Công thức Bayes bằng diện tích: dương tính thì có thật sự bệnh không?", "Bayes' formula as areas: a positive test, but is the person really ill?")}
      story={tt(
        R`Hình vuông đơn vị là toàn bộ dân số. Chia dọc theo tỉ lệ người bệnh $P(B)$: cột trái là người bệnh, cột phải là người khỏe. Trong mỗi cột, phần trên cùng là người cho kết quả dương tính: trong cột bệnh chiếm $P(A\mid B)$ (độ nhạy), trong cột khỏe chiếm $P(A\mid\overline{B})$ (dương tính giả). Tổng hai phần màu là tất cả những người dương tính. Hỏi «dương tính thì bao nhiêu phần là bệnh thật» là hỏi phần màu cam chiếm bao nhiêu trong tổng hai phần màu.`,
        R`The unit square is the whole population. Split it vertically by the share of ill people $P(B)$: the left column is the ill, the right column the healthy. In each column the top part is the people who test positive: in the ill column it takes $P(A\mid B)$ (sensitivity), in the healthy column $P(A\mid\overline{B})$ (false positives). The two shaded parts together are everyone who tests positive. Asking «of those who test positive, how many are really ill» asks what fraction of the two shaded parts is the orange one.`,
      )}
      read={tt(
        `$P(B)=${fmt(pB, 3)}$, $P(A\\mid B)=${fmt(se, 3)}$, $P(A\\mid\\overline{B})=${fmt(fp, 3)}$. Xác suất dương tính (xác suất toàn phần) $P(A)=${fmt(pB, 3)}\\cdot${fmt(se, 3)}+${fmt(1 - pB, 3)}\\cdot${fmt(fp, 3)}=${fmt(r.pA, 5)}$. Bayes: $P(B\\mid A)=\\frac{${fmt(pB * se, 5)}}{${fmt(r.pA, 5)}}=${fmt(r.pBgA, 4)}$. Mô phỏng 100000 người: $${fmt(sim, 4)}$. Dù độ nhạy ${fmt(se * 100, 0)}%, chỉ khoảng ${fmt(r.pBgA * 100, 1)}% người dương tính thật sự bệnh.`,
        `$P(B)=${fmt(pB, 3)}$, $P(A\\mid B)=${fmt(se, 3)}$, $P(A\\mid\\overline{B})=${fmt(fp, 3)}$. Probability of a positive test (total probability) $P(A)=${fmt(pB, 3)}\\cdot${fmt(se, 3)}+${fmt(1 - pB, 3)}\\cdot${fmt(fp, 3)}=${fmt(r.pA, 5)}$. Bayes: $P(B\\mid A)=\\frac{${fmt(pB * se, 5)}}{${fmt(r.pA, 5)}}=${fmt(r.pBgA, 4)}$. Simulating 100000 people: $${fmt(sim, 4)}$. Even with sensitivity ${fmt(se * 100, 0)}%, only about ${fmt(r.pBgA * 100, 1)}% of those who test positive are really ill.`,
      )}
      why={tt(
        R`Khi bệnh hiếm, số người khỏe lớn gấp nhiều lần số người bệnh, nên dù tỉ lệ dương tính giả nhỏ, tổng số người khỏe bị dương tính vẫn có thể lớn hơn số người bệnh dương tính. Vì thế kết quả dương tính chưa đủ để kết luận. Công thức Bayes $P(B\mid A)=\frac{P(B)P(A\mid B)}{P(A)}$ chỉ là tỉ số hai diện tích trong hình, với mẫu số là xác suất toàn phần.`,
        R`When the illness is rare, the healthy are many times more numerous than the ill, so even a small false-positive rate can produce more healthy positives than ill positives. That is why a positive test alone is not conclusive. Bayes' formula $P(B\mid A)=\frac{P(B)P(A\mid B)}{P(A)}$ is just the ratio of two areas in the picture, with the total probability in the denominator.`,
      )}
    >
      <Graph
        label={tt("Hình vuông dân số chia theo bệnh và kết quả xét nghiệm", "The population square split by illness and test result")}
        draw={(ctx, w, h) => {
          const { colors } = frame(ctx, w, h, 0, 1, 0, 1);
          ctx.clearRect(0, 0, w, h); ctx.fillStyle = colors.bg; ctx.fillRect(0, 0, w, h);
          const s = Math.min(w - 40, h - 36); const ox = (w - s) / 2; const oy = (h - s) / 2 + 8;
          const xb = ox + s * pB;
          ctx.strokeStyle = colors.ink; ctx.lineWidth = 2; ctx.strokeRect(ox, oy, s, s);
          const topL = s * se; const topR = s * fp;
          ctx.fillStyle = colors.alt; ctx.globalAlpha = 0.5; ctx.fillRect(ox, oy + s - topL, xb - ox, topL);
          ctx.fillStyle = colors.curve; ctx.globalAlpha = 0.45; ctx.fillRect(xb, oy + s - topR, ox + s - xb, topR); ctx.globalAlpha = 1;
          line(ctx, xb, oy, xb, oy + s, colors.ink, 2);
          line(ctx, ox, oy + s - topL, xb, oy + s - topL, colors.ink, 1.4);
          line(ctx, xb, oy + s - topR, ox + s, oy + s - topR, colors.ink, 1.4);
          const lblIll = tt("bệnh, dương tính", "ill, positive");
          ctx.font = "12px system-ui, sans-serif";
          label(ctx, lblIll, ox - ctx.measureText(lblIll).width - 8, oy + s - topL / 2, colors.alt);
          line(ctx, ox - 6, oy + s - topL / 2 - 4, ox + 2, oy + s - topL / 2 - 4, colors.alt, 1.4);
          label(ctx, tt("khỏe, dương tính giả", "healthy, false positive"), xb + 6, oy + s - topR - 6, colors.curve);
          label(ctx, `P(B) = ${fmt(pB, 3)}`, ox, oy - 8, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Tỉ lệ người bệnh P(B)", "Share of ill people P(B)")} value={pB} min={0.005} max={0.5} step={0.005} onChange={setPB} />
        <Slider label={tt("Độ nhạy P(A | B)", "Sensitivity P(A | B)")} value={se} min={0.5} max={1} step={0.01} onChange={setSe} />
        <Slider label={tt("Dương tính giả P(A | không B)", "False positives P(A | not B)")} value={fp} min={0} max={0.3} step={0.01} onChange={setFp} />
      </div>
    </Stage>
  );
}

/* ---------- 2. Phân phối nhị thức ---------- */

export function BinomialLab() {
  const tt = useTx();
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.3);
  const [seed, setSeed] = useState(5);
  const pmf = binomialPmf(n, p);
  const trials = 20000;
  const sim = useMemo(() => {
    const rng = mulberry32(seed + n * 7);
    const c = Array<number>(n + 1).fill(0);
    for (let t = 0; t < trials; t++) { let x = 0; for (let i = 0; i < n; i++) if (rng() < p) x++; c[x] = (c[x] as number) + 1; }
    return c.map((v) => v / trials);
  }, [n, p, seed]);
  const top = Math.max(...pmf, ...sim) * 1.15;
  const meanVal = pmf.reduce((s, v, k) => s + k * v, 0);
  return (
    <Stage
      title={tt("Phân phối nhị thức: đếm các dãy thành công rồi nhân xác suất", "The binomial distribution: count the success patterns, then multiply the probabilities")}
      story={tt(
        R`Làm $n$ lần một phép thử, mỗi lần thành công với xác suất $p$. Xác suất có đúng $k$ lần thành công là $C_n^k\,p^k(1-p)^{n-k}$: mỗi dãy cụ thể có xác suất $p^k(1-p)^{n-k}$ và có $C_n^k$ dãy như vậy. Cột viền là công thức, cột đặc là $20000$ lần làm thật. Hai bên khớp nhau, và đỉnh nằm quanh $np$.`,
        R`Repeat an experiment $n$ times, each time succeeding with probability $p$. The probability of exactly $k$ successes is $C_n^k\,p^k(1-p)^{n-k}$: each particular sequence has probability $p^k(1-p)^{n-k}$ and there are $C_n^k$ such sequences. The outlined bars are the formula, the solid bars are $20000$ real runs. The two agree, and the peak sits around $np$.`,
      )}
      read={tt(
        `$n=${n}$, $p=${fmt(p, 2)}$. Trung bình $\\sum kP(k)=${fmt(meanVal, 4)}=np=${fmt(n * p, 4)}$. Xác suất đúng ${Math.round(n * p)} lần: công thức $${fmt(pmf[Math.round(n * p)] as number, 4)}$, mô phỏng $${fmt(sim[Math.round(n * p)] as number, 4)}$. Ít nhất một lần: $1-(1-p)^n=${fmt(1 - (1 - p) ** n, 4)}$ (từ công thức: $1-P(0)=${fmt(1 - (pmf[0] as number), 4)}$).`,
        `$n=${n}$, $p=${fmt(p, 2)}$. Mean $\\sum kP(k)=${fmt(meanVal, 4)}=np=${fmt(n * p, 4)}$. Probability of exactly ${Math.round(n * p)} successes: formula $${fmt(pmf[Math.round(n * p)] as number, 4)}$, simulation $${fmt(sim[Math.round(n * p)] as number, 4)}$. At least one success: $1-(1-p)^n=${fmt(1 - (1 - p) ** n, 4)}$ (from the formula: $1-P(0)=${fmt(1 - (pmf[0] as number), 4)}$).`,
      )}
      why={tt(
        R`Các lần thử độc lập nên xác suất của một dãy là tích các xác suất. Mọi dãy có $k$ thành công đều có cùng xác suất và xung khắc nhau, nên cộng $C_n^k$ lần xác suất đó. Tổng mọi cột bằng $(p+(1-p))^n=1$ theo nhị thức Newton: chính nhị thức Newton làm xác suất cộng đúng bằng 1.`,
        R`The trials are independent so the probability of a sequence is the product of the probabilities. Every sequence with $k$ successes has the same probability and they are mutually exclusive, so we add that probability $C_n^k$ times. All the bars add up to $(p+(1-p))^n=1$ by the binomial theorem: the binomial theorem is what makes the probabilities total exactly 1.`,
      )}
    >
      <Graph
        label={tt("Cột công thức và cột mô phỏng của phân phối nhị thức", "Formula bars and simulation bars of the binomial distribution")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -0.8, n + 0.8, 0, top, "k", "P");
          for (let k = 0; k <= n; k++) {
            const x0 = map.x(k - 0.4); const bw = map.x(k + 0.4) - x0;
            ctx.fillStyle = colors.curve; ctx.globalAlpha = 0.5; ctx.fillRect(x0, map.y(sim[k] as number), bw, map.y(0) - map.y(sim[k] as number)); ctx.globalAlpha = 1;
            ctx.strokeStyle = colors.alt; ctx.lineWidth = 2; ctx.strokeRect(x0, map.y(pmf[k] as number), bw, map.y(0) - map.y(pmf[k] as number));
          }
          dashed(ctx, map.x(n * p), map.y(0), map.x(n * p), map.y(top), colors.soft);
        }}
      />
      <div className="fz-controls">
        <Slider label="n" value={n} min={1} max={40} step={1} onChange={setN} />
        <Slider label="p" value={p} min={0.05} max={0.95} step={0.05} onChange={setP} />
      </div>
      <Buttons><button type="button" className="text-btn" onClick={() => setSeed(freshSeed() % 100000)}>{tt("Làm thật lại", "Run the experiment again")}</button></Buttons>
    </Stage>
  );
}

/* ---------- 3. Nghịch lí ngày sinh ---------- */

export function BirthdayLab() {
  const tt = useTx();
  const [n, setN] = useState(23);
  const exact = birthdayExact(n);
  const sim = useMemo(() => birthdaySim(n, 20000, mulberry32(n * 13 + 1)), [n]);
  let half = 0;
  for (let i = 1; i <= 100; i++) if (birthdayExact(i) >= 0.5) { half = i; break; }
  return (
    <Stage
      title={tt("Nghịch lí ngày sinh: 23 người đã đủ hơn một nửa cơ hội trùng ngày", "The birthday paradox: 23 people already give better than even odds of a shared birthday")}
      story={tt(
        R`Trong một lớp 23 người, xác suất có hai người trùng ngày sinh là bao nhiêu? Trực giác nói «rất nhỏ» vì có 365 ngày. Nhưng 23 người tạo ra tới $\frac{23\cdot 22}{2}=253$ cặp, và mỗi cặp là một cơ hội trùng. Tính bằng biến cố đối: xác suất không ai trùng là $\frac{365}{365}\cdot\frac{364}{365}\cdots\frac{365-n+1}{365}$, rồi lấy $1$ trừ đi. Máy cũng mô phỏng 20000 lớp học để kiểm.`,
        R`In a class of 23 people, what is the probability that two share a birthday? Intuition says «very small» because there are 365 days. But 23 people form $\frac{23\cdot 22}{2}=253$ pairs, and each pair is a chance of a match. Compute it through the complement: the probability that nobody matches is $\frac{365}{365}\cdot\frac{364}{365}\cdots\frac{365-n+1}{365}$, then subtract from $1$. The machine also simulates 20000 classes to check.`,
      )}
      read={tt(
        `$n=${n}$ người: ${n} người tạo ${(n * (n - 1)) / 2} cặp. Xác suất không ai trùng $=${fmt(1 - exact, 5)}$, nên xác suất có người trùng $=${fmt(exact, 4)}$ (${fmt(exact * 100, 1)}%). Mô phỏng 20000 lớp: $${fmt(sim, 4)}$. Máy tìm được số người nhỏ nhất để xác suất vượt $\\frac{1}{2}$: $${half}$ người.`,
        `$n=${n}$ people: ${n} people form ${(n * (n - 1)) / 2} pairs. The probability that nobody matches is $${fmt(1 - exact, 5)}$, so the probability that someone matches is $${fmt(exact, 4)}$ (${fmt(exact * 100, 1)}%). Simulating 20000 classes: $${fmt(sim, 4)}$. The machine finds the smallest group size for which the probability passes $\\frac{1}{2}$: $${half}$ people.`,
      )}
      why={tt(
        R`Biến cố «ít nhất một cặp trùng» khó đếm trực tiếp nhưng biến cố đối «mọi người khác ngày» thì là tích các xác suất có điều kiện: người thứ hai khác người thứ nhất với xác suất $\frac{364}{365}$, người thứ ba khác cả hai với xác suất $\frac{363}{365}$, và cứ thế. Tích này giảm rất nhanh. Bài học: khi đếm số cặp, số cơ hội tăng như bình phương số người.`,
        R`The event «at least one matching pair» is hard to count directly but its complement «everyone differs» is a product of conditional probabilities: the second person differs from the first with probability $\frac{364}{365}$, the third differs from both with probability $\frac{363}{365}$, and so on. This product falls very fast. The lesson: when counting pairs, the number of chances grows like the square of the number of people.`,
      )}
    >
      <Graph
        label={tt("Xác suất có hai người trùng ngày sinh theo số người", "Probability of a shared birthday against the number of people")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, 0, 70, 0, 1.05, "n", "P");
          strokeFn(ctx, map, w, h, pad, 1, 70, (x) => birthdayExact(Math.round(x)), colors.curve, 2.6);
          dashed(ctx, map.x(0), map.y(0.5), map.x(70), map.y(0.5), colors.soft);
          dashed(ctx, map.x(half), map.y(0), map.x(half), map.y(0.5), colors.alt);
          dot(ctx, map.x(n), map.y(exact), colors.ink, colors.bg, 7);
          dot(ctx, map.x(n), map.y(sim), colors.alt, colors.bg, 5);
          label(ctx, tt(`${half} người: vượt 50%`, `${half} people: past 50%`), map.x(half) + 6, map.y(0.45), colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số người n", "Number of people n")} value={n} min={2} max={70} step={1} onChange={setN} />
      </div>
    </Stage>
  );
}

/* ---------- 4. Luật số lớn ---------- */

export function LawLargeNumbersLab() {
  const tt = useTx();
  const [seed, setSeed] = useState(3);
  const [N, setN] = useState(2000);
  const run = useMemo(() => runningProportion(5000, mulberry32(seed)), [seed]);
  const cur = run[N - 1] as number;
  return (
    <Stage
      title={tt("Luật số lớn: tỉ lệ ngửa dồn về một nửa", "The law of large numbers: the share of heads settles at one half")}
      story={tt(
        R`Tung đồng xu liên tiếp và ghi lại tỉ lệ ngửa tính đến lần thứ $n$. Lúc đầu tỉ lệ nhảy lung tung (một lần ngửa là 100%), nhưng càng tung nhiều càng dồn về $\frac{1}{2}$. Dải xám là khoảng $\frac{1}{2}\pm\frac{1}{\sqrt{n}}$: sai lệch điển hình co lại như $\frac{1}{\sqrt{n}}$. Đây là một giới hạn của dãy ngẫu nhiên: xác suất là giới hạn của tần suất.`,
        R`Toss a coin repeatedly and record the share of heads up to toss number $n$. At first the share jumps around (one head is 100%), but the more tosses the closer it settles to $\frac{1}{2}$. The grey band is $\frac{1}{2}\pm\frac{1}{\sqrt{n}}$: the typical deviation shrinks like $\frac{1}{\sqrt{n}}$. This is a limit of a random sequence: probability is the limit of frequency.`,
      )}
      read={tt(
        `Sau ${N} lần tung: tỉ lệ ngửa $${fmt(cur, 4)}$, lệch khỏi $\\frac{1}{2}$ là $${fmt(Math.abs(cur - 0.5), 4)}$; dải $\\frac{1}{\\sqrt{n}}=${fmt(1 / Math.sqrt(N), 4)}$. Sau 10 lần: $${fmt(run[9] as number, 3)}$; sau 100 lần: $${fmt(run[99] as number, 3)}$; sau 5000 lần: $${fmt(run[4999] as number, 4)}$.`,
        `After ${N} tosses: share of heads $${fmt(cur, 4)}$, off from $\\frac{1}{2}$ by $${fmt(Math.abs(cur - 0.5), 4)}$; the band $\\frac{1}{\\sqrt{n}}=${fmt(1 / Math.sqrt(N), 4)}$. After 10 tosses: $${fmt(run[9] as number, 3)}$; after 100: $${fmt(run[99] as number, 3)}$; after 5000: $${fmt(run[4999] as number, 4)}$.`,
      )}
      why={tt(
        R`Mỗi lần tung độc lập nên các sai lệch ngẫu nhiên có lúc dương có lúc âm và triệt tiêu lẫn nhau; tổng của $n$ sai lệch chỉ lớn cỡ $\sqrt{n}$ chứ không phải $n$, nên sau khi chia cho $n$ còn $\frac{1}{\sqrt{n}}$. Luật số lớn là lý do bảo hiểm và sòng bạc có thể tính trước lợi nhuận dù từng ván là ngẫu nhiên.`,
        R`Each toss is independent so the random deviations are sometimes positive and sometimes negative and cancel each other; the sum of $n$ deviations is only of size about $\sqrt{n}$, not $n$, so after dividing by $n$ we are left with $\frac{1}{\sqrt{n}}$. The law of large numbers is why insurers and casinos can predict their profit even though each single game is random.`,
      )}
    >
      <Graph
        label={tt("Tỉ lệ ngửa chạy theo số lần tung và dải sai lệch", "Running share of heads against tosses, with the deviation band")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, 0, 5000, 0, 1, "n", "");
          ctx.fillStyle = colors.soft; ctx.globalAlpha = 0.18;
          ctx.beginPath();
          for (let i = 1; i <= 5000; i += 20) ctx.lineTo(map.x(i), map.y(Math.min(1, 0.5 + 1 / Math.sqrt(i))));
          for (let i = 5000; i >= 1; i -= 20) ctx.lineTo(map.x(i), map.y(Math.max(0, 0.5 - 1 / Math.sqrt(i))));
          ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
          dashed(ctx, map.x(0), map.y(0.5), map.x(5000), map.y(0.5), colors.alt);
          ctx.beginPath();
          for (let i = 0; i < 5000; i += 5) { const px = map.x(i + 1); const py = map.y(run[i] as number); if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py); }
          ctx.strokeStyle = colors.curve; ctx.lineWidth = 2; ctx.stroke();
          dashed(ctx, map.x(N), map.y(0), map.x(N), map.y(1), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Xem tới lần tung thứ", "Look up to toss number")} value={N} min={10} max={5000} step={10} onChange={setN} />
      </div>
      <Buttons><button type="button" className="text-btn" onClick={() => setSeed(freshSeed() % 100000)}>{tt("Tung lại từ đầu", "Toss again from the start")}</button></Buttons>
    </Stage>
  );
}

/* ---------- 5. Định lí giới hạn trung tâm: tổng nhiều xúc xắc ra hình chuông ---------- */

export function CLTLab() {
  const tt = useTx();
  const [k, setK] = useState(4);
  const rolls = 30000;
  const hist = useMemo(() => diceSumHistogram(k, rolls, mulberry32(k * 101 + 7)), [k]);
  const mu = 3.5 * k;
  const sd = Math.sqrt((35 / 12) * k);
  const pdf = (x: number) => Math.exp(-((x - mu) ** 2) / (2 * sd * sd)) / (sd * Math.sqrt(2 * Math.PI));
  const within = hist.reduce((s, c, v) => (Math.abs(v - mu) <= sd ? s + c : s), 0) / rolls;
  const area = simpson(pdf, mu - sd, mu + sd, 400);
  const top = Math.max(...hist.map((c) => c / rolls), pdf(mu)) * 1.2;
  return (
    <Stage
      title={tt("Cộng nhiều xúc xắc: hình chuông tự hiện ra", "Adding many dice: the bell shape appears by itself")}
      story={tt(
        R`Một xúc xắc cho sáu kết quả đều nhau, dáng phẳng. Tổng của hai xúc xắc đã có đỉnh ở giữa. Cộng càng nhiều xúc xắc thì đồ thị càng tròn trịa và dần trùng với một đường cong duy nhất: đường chuông (phân phối chuẩn) với trung bình $3{,}5k$ và độ lệch chuẩn $\sqrt{\frac{35}{12}k}$. Điều này đúng cho tổng của rất nhiều biến ngẫu nhiên bất kì, không riêng xúc xắc: đó là định lí giới hạn trung tâm. Diện tích dưới đường chuông trong khoảng $\pm\sigma$ là một tích phân.`,
        R`One die gives six equal outcomes, a flat shape. The sum of two dice already has a peak in the middle. Add more dice and the graph gets rounder and approaches a single curve: the bell curve (normal distribution) with mean $3.5k$ and standard deviation $\sqrt{\frac{35}{12}k}$. This holds for sums of very many random quantities of almost any kind, not just dice: it is the central limit theorem. The area under the bell curve within $\pm\sigma$ is an integral.`,
      )}
      read={tt(
        `Tổng của ${k} xúc xắc, tung ${rolls} lần: trung bình lý thuyết $\\mu=${fmt(mu, 2)}$, độ lệch chuẩn $\\sigma=${fmt(sd, 3)}$. Tỉ lệ kết quả nằm trong $\\mu\\pm\\sigma$: mô phỏng $${fmt(within, 4)}$; diện tích dưới đường chuông $\\int_{\\mu-\\sigma}^{\\mu+\\sigma}f=${fmt(area, 4)}$ (≈ 0,683 khi $k$ lớn).`,
        `Sum of ${k} dice, rolled ${rolls} times: theoretical mean $\\mu=${fmt(mu, 2)}$, standard deviation $\\sigma=${fmt(sd, 3)}$. Share of outcomes within $\\mu\\pm\\sigma$: simulation $${fmt(within, 4)}$; area under the bell curve $\\int_{\\mu-\\sigma}^{\\mu+\\sigma}f=${fmt(area, 4)}$ (≈ 0.683 when $k$ is large).`,
      )}
      why={tt(
        R`Phương sai của tổng các biến độc lập bằng tổng các phương sai, nên $k$ xúc xắc có phương sai $k\cdot\frac{35}{12}$. Còn hình chuông là do vô số cách tổ hợp: các tổng ở giữa có nhiều cách tạo ra hơn các tổng ở hai đầu, giống như hệ số nhị thức lớn nhất ở giữa. Đây là chỗ xác suất, tổ hợp và tích phân gặp nhau.`,
        R`The variance of a sum of independent variables is the sum of the variances, so $k$ dice have variance $k\cdot\frac{35}{12}$. The bell shape comes from the sheer number of combinations: sums in the middle can be made in more ways than sums at the ends, like the binomial coefficients being largest in the middle. This is where probability, counting and integrals meet.`,
      )}
    >
      <Graph
        label={tt("Histogram tổng các xúc xắc và đường chuông", "Histogram of the sum of dice and the bell curve")}
        draw={(ctx, w, h) => {
          const { colors, map, pad } = frame(ctx, w, h, k - 0.5, 6 * k + 0.5, 0, top, tt("tổng", "sum"), "P");
          hist.forEach((c, v) => { if (v < k) return; const x0 = map.x(v - 0.5); const bw = map.x(v + 0.5) - x0; ctx.fillStyle = Math.abs(v - mu) <= sd ? colors.alt : colors.curve; ctx.globalAlpha = 0.45; ctx.fillRect(x0, map.y(c / rolls), bw - 1, map.y(0) - map.y(c / rolls)); ctx.globalAlpha = 1; });
          strokeFn(ctx, map, w, h, pad, k - 0.5, 6 * k + 0.5, pdf, colors.ink, 2.4);
          dashed(ctx, map.x(mu - sd), map.y(0), map.x(mu - sd), map.y(top), colors.soft);
          dashed(ctx, map.x(mu + sd), map.y(0), map.x(mu + sd), map.y(top), colors.soft);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số xúc xắc k", "Number of dice k")} value={k} min={1} max={12} step={1} onChange={setK} />
      </div>
    </Stage>
  );
}

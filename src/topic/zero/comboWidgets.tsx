import { useMemo, useState } from "react";
import { groupedMean, groupedQuartile, histogram, mean, pascalRows, polyMul, quartiles, variance } from "../../algo/index.ts";
import { dashed, dot } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { mulberry32 } from "../../lib/prng.ts";
import { Slider } from "../../ui/Slider.tsx";
import { at, frame, label, line, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;

/* ---------- 1. Số đo trung tâm và độ phân tán: một giá trị lạ làm gì ---------- */

const BASE = [4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 10];

export function StatsLab() {
  const tt = useTx();
  const [out, setOut] = useState(30);
  const [add, setAdd] = useState(0);
  const [k, setK] = useState(1);
  const data = [...BASE, out];
  const q = quartiles(data);
  const base = quartiles(BASE);
  const iqr = q.q3 - q.q1;
  const lo = q.q1 - 1.5 * iqr;
  const hi = q.q3 + 1.5 * iqr;
  const m = mean(data);
  const v = variance(data);
  const tData = data.map((x) => k * x + add);
  const mT = mean(tData);
  const vT = variance(tData);
  const isOutlier = out < lo || out > hi;
  return (
    <Stage
      title={tt("Một giá trị lạ kéo trung bình đi xa, còn trung vị đứng yên", "One odd value drags the mean away while the median stays put")}
      story={tt(
        R`Mười một số đo bình thường từ 4 đến 10, cộng thêm một số thứ mười hai mà bạn kéo được. Trung bình là điểm cân bằng của các chấm nên bị giá trị xa lôi đi; trung vị chỉ là người đứng giữa hàng nên gần như không đổi. Hộp (box plot) vẽ năm số $\min,Q_1,Q_2,Q_3,\max$, và quy tắc «ngoài $[Q_1-1{,}5\Delta_Q;\ Q_3+1{,}5\Delta_Q]$ là bất thường» đánh dấu giá trị lạ. Hai thanh trượt dưới cho thấy biến đổi dữ liệu: cộng $c$ dịch cả đàn, nhân $k$ giãn cả đàn.`,
        R`Eleven ordinary measurements from 4 to 10, plus a twelfth number that you can drag. The mean is the balance point of the dots so a far value pulls it; the median is just the person in the middle of the line, so it barely moves. The box plot draws the five numbers $\min,Q_1,Q_2,Q_3,\max$, and the rule «outside $[Q_1-1.5\Delta_Q;\ Q_3+1.5\Delta_Q]$ is unusual» flags the odd value. The two sliders below show transforming the data: adding $c$ shifts the whole herd, multiplying by $k$ stretches it.`,
      )}
      read={tt(
        `Không có số lạ: trung bình $${fmt(mean(BASE), 3)}$, trung vị $${fmt(base.q2, 2)}$. Có số $${fmt(out)}$: trung bình $${fmt(m, 3)}$, trung vị $${fmt(q.q2, 2)}$; $Q_1=${fmt(q.q1, 2)}$, $Q_3=${fmt(q.q3, 2)}$, $\\Delta_Q=${fmt(iqr, 2)}$, hàng rào $[${fmt(lo, 2)};\\ ${fmt(hi, 2)}]$: ${isOutlier ? "giá trị này BẤT THƯỜNG" : "giá trị này bình thường"}. Phương sai $${fmt(v, 3)}$, độ lệch chuẩn $${fmt(Math.sqrt(v), 3)}$. Sau biến đổi $x\\mapsto ${fmt(k, 2)}x+${fmt(add, 2)}$: trung bình $${fmt(mT, 3)}=${fmt(k, 2)}\\cdot${fmt(m, 3)}+${fmt(add, 2)}$, phương sai $${fmt(vT, 3)}=${fmt(k, 2)}^2\\cdot${fmt(v, 3)}=${fmt(k * k * v, 3)}$.`,
        `Without the odd value: mean $${fmt(mean(BASE), 3)}$, median $${fmt(base.q2, 2)}$. With the value $${fmt(out)}$: mean $${fmt(m, 3)}$, median $${fmt(q.q2, 2)}$; $Q_1=${fmt(q.q1, 2)}$, $Q_3=${fmt(q.q3, 2)}$, $\\Delta_Q=${fmt(iqr, 2)}$, fences $[${fmt(lo, 2)};\\ ${fmt(hi, 2)}]$: ${isOutlier ? "this value is UNUSUAL" : "this value is normal"}. Variance $${fmt(v, 3)}$, standard deviation $${fmt(Math.sqrt(v), 3)}$. After the transformation $x\\mapsto ${fmt(k, 2)}x+${fmt(add, 2)}$: mean $${fmt(mT, 3)}=${fmt(k, 2)}\\cdot${fmt(m, 3)}+${fmt(add, 2)}$, variance $${fmt(vT, 3)}=${fmt(k, 2)}^2\\cdot${fmt(v, 3)}=${fmt(k * k * v, 3)}$.`,
      )}
      why={tt(
        R`Trung bình cộng mọi giá trị nên mỗi giá trị lạ đóng góp trọn vẹn; trung vị chỉ phụ thuộc vị trí nên không quan tâm giá trị lạ lớn đến đâu. Với dữ liệu lệch như thu nhập, trung vị phản ánh «người điển hình» tốt hơn. Cộng $c$ không đổi khoảng cách giữa các giá trị nên phương sai giữ nguyên; nhân $k$ làm mọi khoảng cách nhân $k$ nên phương sai nhân $k^2$.`,
        R`The mean adds up every value so each odd value contributes fully; the median depends only on position so it does not care how large the odd value is. For skewed data such as incomes, the median describes the «typical person» better. Adding $c$ does not change the gaps between values so the variance stays; multiplying by $k$ multiplies every gap by $k$ so the variance multiplies by $k^2$.`,
      )}
    >
      <Graph
        label={tt("Biểu đồ chấm và hộp của dữ liệu", "Dot plot and box plot of the data")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, 0, 42, 0, 4, "x", "");
          const counts = new Map<number, number>();
          for (const x of data) { const c = (counts.get(x) ?? 0) + 1; counts.set(x, c); dot(ctx, map.x(x), map.y(0.35 + 0.3 * c), x === out ? colors.alt : colors.curve, colors.bg, 5); }
          const yb = 2.7;
          ctx.fillStyle = colors.curve; ctx.globalAlpha = 0.2;
          ctx.fillRect(map.x(q.q1), map.y(yb + 0.35), map.x(q.q3) - map.x(q.q1), map.y(yb - 0.35) - map.y(yb + 0.35));
          ctx.globalAlpha = 1; ctx.strokeStyle = colors.ink; ctx.lineWidth = 2;
          ctx.strokeRect(map.x(q.q1), map.y(yb + 0.35), map.x(q.q3) - map.x(q.q1), map.y(yb - 0.35) - map.y(yb + 0.35));
          line(ctx, map.x(q.q2), map.y(yb + 0.35), map.x(q.q2), map.y(yb - 0.35), colors.ink, 3);
          const whiskerLo = Math.min(...data.filter((x) => x >= lo)); const whiskerHi = Math.max(...data.filter((x) => x <= hi));
          line(ctx, map.x(whiskerLo), map.y(yb), map.x(q.q1), map.y(yb), colors.ink, 1.6);
          line(ctx, map.x(q.q3), map.y(yb), map.x(whiskerHi), map.y(yb), colors.ink, 1.6);
          if (isOutlier) dot(ctx, map.x(out), map.y(yb), colors.alt, colors.bg, 6);
          dashed(ctx, map.x(m), map.y(0), map.x(m), map.y(4), colors.alt);
          label(ctx, tt(`trung bình ${fmt(m, 1)}`, `mean ${fmt(m, 1)}`), map.x(m) + 6, map.y(3.7), colors.alt);
          label(ctx, tt(`trung vị ${fmt(q.q2, 1)}`, `median ${fmt(q.q2, 1)}`), map.x(q.q2) - 30, map.y(yb) - 28, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số thứ mười hai", "The twelfth value")} value={out} min={1} max={40} step={1} onChange={setOut} />
        <Slider label={tt("Cộng c vào mọi số", "Add c to every value")} value={add} min={-10} max={10} step={1} onChange={setAdd} />
        <Slider label={tt("Nhân k vào mọi số", "Multiply every value by k")} value={k} min={0.5} max={3} step={0.25} onChange={setK} />
      </div>
    </Stage>
  );
}

/* ---------- 2. Nhị thức Newton: nhân dần các ngoặc ---------- */

export function BinomialExpansionLab() {
  const tt = useTx();
  const [n, setN] = useState(6);
  const [kk, setKk] = useState(2);
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const k = Math.min(kk, n);
  const coef = Array.from({ length: n }, () => [1, 1]).reduce<number[]>((acc, f) => polyMul(acc, f), [1]);
  const row = at(pascalRows(n), n);
  const term = row[k] as number * a ** (n - k) * b ** k;
  const total = row.reduce((s, c, i) => s + c * a ** (n - i) * b ** i, 0);
  const max = Math.max(...row);
  return (
    <Stage
      title={tt("Nhị thức Newton: nhân dần các ngoặc và đếm", "The binomial theorem: multiply the brackets one by one and count")}
      story={tt(
        R`Khai triển $(1+x)^n$ bằng cách nhân từng ngoặc $(1+x)$ vào kết quả trước: máy nhân đa thức thật sự rồi đọc hệ số. Chúng trùng với hàng thứ $n$ của tam giác Pascal vì khi phá ngoặc, mỗi số hạng $x^k$ ứng với cách chọn $x$ từ $k$ trong $n$ ngoặc (còn lại chọn số 1): có $C_n^k$ cách. Cột cao là hệ số lớn, và hình dạng chuông hiện ra khi $n$ lớn.`,
        R`Expand $(1+x)^n$ by multiplying one bracket $(1+x)$ at a time into the previous result: the machine really multiplies polynomials and reads the coefficients. They coincide with row $n$ of Pascal's triangle because when expanding, each term $x^k$ corresponds to picking $x$ from $k$ of the $n$ brackets (and 1 from the rest): there are $C_n^k$ ways. Tall bars are big coefficients, and a bell shape appears when $n$ is large.`,
      )}
      read={tt(
        `Nhân ${n} ngoặc: hệ số ${coef.join(", ")}. Tam giác Pascal hàng ${n}: ${row.join(", ")}: ${coef.join() === row.join() ? "khớp" : "lệch"}. Tổng hệ số $=${coef.reduce((s, c) => s + c, 0)}=2^{${n}}=${2 ** n}$. Số hạng thứ $k+1=${k + 1}$ của $(${a}+${b})^{${n}}$: $T_{${k + 1}}=C_{${n}}^{${k}}\\,${a}^{${n - k}}${b}^{${k}}=${row[k]}\\cdot${a ** (n - k)}\\cdot${b ** k}=${term}$. Cộng mọi số hạng: $${total}=(${a}+${b})^{${n}}=${(a + b) ** n}$.`,
        `Multiplying ${n} brackets: coefficients ${coef.join(", ")}. Pascal's triangle row ${n}: ${row.join(", ")}: ${coef.join() === row.join() ? "they match" : "they differ"}. Sum of coefficients $=${coef.reduce((s, c) => s + c, 0)}=2^{${n}}=${2 ** n}$. The $(k+1)$-th term, $k+1=${k + 1}$, of $(${a}+${b})^{${n}}$: $T_{${k + 1}}=C_{${n}}^{${k}}\\,${a}^{${n - k}}${b}^{${k}}=${row[k]}\\cdot${a ** (n - k)}\\cdot${b ** k}=${term}$. Adding every term: $${total}=(${a}+${b})^{${n}}=${(a + b) ** n}$.`,
      )}
      why={tt(
        R`Mỗi cách chọn một trong hai chữ ở mỗi ngoặc cho một số hạng; số cách chọn đúng $k$ ngoặc lấy $b$ là $C_n^k$, nên $(a+b)^n=\sum C_n^k a^{n-k}b^k$. Thay $a=b=1$ được $2^n$: mỗi ngoặc hoặc lấy hoặc không lấy. Chỉ số bắt đầu từ $k=0$ nên số hạng thứ $k+1$ mới ứng với $C_n^k$.`,
        R`Each choice of one of the two letters from every bracket gives one term; the number of ways to pick exactly $k$ brackets giving $b$ is $C_n^k$, so $(a+b)^n=\sum C_n^k a^{n-k}b^k$. Putting $a=b=1$ gives $2^n$: each bracket either gives or does not. The index starts at $k=0$ so the $(k+1)$-th term is the one with $C_n^k$.`,
      )}
    >
      <Graph
        label={tt("Các hệ số của khai triển dưới dạng cột", "The coefficients of the expansion as bars")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -0.8, n + 0.8, 0, max * 1.15, "k", tt("hệ số", "coefficient"));
          coef.forEach((c, i) => {
            const x0 = map.x(i - 0.4); const bw = map.x(i + 0.4) - x0;
            ctx.fillStyle = i === k ? colors.alt : colors.curve; ctx.globalAlpha = i === k ? 0.8 : 0.45;
            ctx.fillRect(x0, map.y(c), bw, map.y(0) - map.y(c)); ctx.globalAlpha = 1;
            label(ctx, String(c), x0 + bw / 2 - 8, map.y(c) - 6, colors.ink);
          });
        }}
      />
      <div className="fz-controls">
        <Slider label="n" value={n} min={1} max={12} step={1} onChange={(v) => { setN(v); setKk(Math.min(kk, v)); }} />
        <Slider label={tt("Chỉ số k của số hạng", "Index k of the term")} value={k} min={0} max={n} step={1} onChange={setKk} />
        <Slider label="a" value={a} min={1} max={5} step={1} onChange={setA} />
        <Slider label="b" value={b} min={1} max={5} step={1} onChange={setB} />
      </div>
    </Stage>
  );
}

/* ---------- 3. Mẫu số liệu ghép nhóm ---------- */

function makeData(): number[] {
  const r = mulberry32(31);
  return Array.from({ length: 60 }, () => Math.round(20 + (r() + r() + r() + r() - 2) * 22 + 22));
}

export function GroupedLab() {
  const tt = useTx();
  const data = useMemo(() => makeData(), []);
  const [w, setW] = useState(10);
  const lo = 0;
  const bins = Math.ceil(70 / w);
  const counts = histogram(data, lo, w, bins);
  const gm = groupedMean(counts, lo, w);
  const gq = ([1, 2, 3] as const).map((j) => groupedQuartile(counts, lo, w, j));
  const ex = quartiles(data);
  const exactMean = mean(data);
  return (
    <Stage
      title={tt("Số liệu ghép nhóm: mất chi tiết để đổi lấy cái nhìn tổng quát", "Grouped data: trading detail for the big picture")}
      story={tt(
        R`Sáu mươi số đo được chia vào các nhóm có độ rộng cố định; ta chỉ còn biết «có bao nhiêu số rơi vào mỗi nhóm». Để tính toán, coi mọi số trong một nhóm bằng điểm giữa của nhóm. Trung bình thành trung bình có trọng số, và trung vị tìm bằng cách cộng dồn số lượng đến nhóm chứa mốc $\frac{n}{2}$, rồi nội suy trong nhóm đó. Kéo độ rộng nhóm: nhóm càng hẹp thì xấp xỉ càng sát số liệu gốc, nhóm càng rộng thì càng mất chi tiết.`,
        R`Sixty measurements are sorted into classes of a fixed width; all we know is «how many fall in each class». To compute, treat every value in a class as the midpoint of the class. The mean becomes a weighted mean, and the median is found by accumulating counts up to the class holding the position $\frac{n}{2}$, then interpolating inside that class. Drag the class width: narrower classes approximate the raw data more closely, wider classes lose more detail.`,
      )}
      read={tt(
        `Độ rộng nhóm $${w}$, ${bins} nhóm: ${counts.join(", ")}. Trung bình ghép nhóm $${fmt(gm, 3)}$ so với trung bình thật $${fmt(exactMean, 3)}$ (lệch $${fmt(Math.abs(gm - exactMean), 3)}$). Tứ phân vị ghép nhóm $Q_1=${fmt(gq[0] as number, 2)}$, trung vị $${fmt(gq[1] as number, 2)}$, $Q_3=${fmt(gq[2] as number, 2)}$; giá trị thật $${fmt(ex.q1, 2)}$, $${fmt(ex.q2, 2)}$, $${fmt(ex.q3, 2)}$.`,
        `Class width $${w}$, ${bins} classes: ${counts.join(", ")}. Grouped mean $${fmt(gm, 3)}$ against the true mean $${fmt(exactMean, 3)}$ (off by $${fmt(Math.abs(gm - exactMean), 3)}$). Grouped quartiles $Q_1=${fmt(gq[0] as number, 2)}$, median $${fmt(gq[1] as number, 2)}$, $Q_3=${fmt(gq[2] as number, 2)}$; true values $${fmt(ex.q1, 2)}$, $${fmt(ex.q2, 2)}$, $${fmt(ex.q3, 2)}$.`,
      )}
      why={tt(
        R`Trong nhóm chứa mốc, ta coi số liệu rải đều. Cần thêm $\frac{jn}{4}-C$ số trong tổng $n_m$ của nhóm, tức đi hết tỉ lệ $\frac{jn/4-C}{n_m}$ bề rộng nhóm: $Q_j=u_m+\frac{jn/4-C}{n_m}\cdot w$. Đây là phép nội suy tuyến tính, chính xác nếu số liệu thật sự rải đều trong nhóm.`,
        R`Inside the class holding the target position we treat the data as evenly spread. We need $\frac{jn}{4}-C$ more values out of the class's total $n_m$, i.e. go the fraction $\frac{jn/4-C}{n_m}$ of the class width: $Q_j=u_m+\frac{jn/4-C}{n_m}\cdot w$. This is linear interpolation, exact if the data really are spread evenly in the class.`,
      )}
    >
      <Graph
        label={tt("Biểu đồ cột của mẫu số liệu ghép nhóm", "Histogram of the grouped sample")}
        draw={(ctx, wd, h) => {
          const top = Math.max(...counts) * 1.2;
          const { colors, map } = frame(ctx, wd, h, 0, bins * w, 0, top, "x", tt("tần số", "frequency"));
          counts.forEach((c, i) => {
            const x0 = map.x(i * w); const bw = map.x((i + 1) * w) - x0;
            ctx.fillStyle = colors.curve; ctx.globalAlpha = 0.4; ctx.fillRect(x0, map.y(c), bw - 1, map.y(0) - map.y(c)); ctx.globalAlpha = 1;
            ctx.strokeStyle = colors.ink; ctx.lineWidth = 1; ctx.strokeRect(x0, map.y(c), bw - 1, map.y(0) - map.y(c));
          });
          dashed(ctx, map.x(gm), map.y(0), map.x(gm), map.y(top), colors.alt);
          dashed(ctx, map.x(exactMean), map.y(0), map.x(exactMean), map.y(top), colors.ink);
          label(ctx, tt("TB ghép nhóm", "grouped mean"), map.x(gm) + 4, map.y(top) + 14, colors.alt);
          label(ctx, tt("TB thật", "true mean"), map.x(exactMean) - 54, map.y(top) + 30, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Độ rộng nhóm", "Class width")} value={w} min={2} max={35} step={1} onChange={setW} />
      </div>
    </Stage>
  );
}

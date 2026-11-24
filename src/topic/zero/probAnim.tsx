import { binomialNext, naturalFrequencies, twoStageLeaves } from "../../algo/index.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { PlayButtons, useLoop } from "./anim.tsx";
import { frame, label, line, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;

/** Số trong công thức: dấu thập phân đặt trong ngoặc để KaTeX không chèn khoảng trắng. */
const fm = (x: number, d: number) => fmt(x, d).replace(",", "{,}");

/* ---------- 1. Một nghìn người đi xét nghiệm: Bayes bằng tần suất ---------- */

const POP = 1000;

export function NaturalFreqAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(500, 0.16);
  const rate = 0.5 + 9.5 * phase; // tỉ lệ mắc, từ 0,5% đến 10%
  const f = naturalFrequencies(POP, rate / 100, 0.95, 0.05);
  const pct = (v: number) => fm(v * 100, 1);
  return (
    <Stage
      title={tt("Một nghìn người đi xét nghiệm: xác suất bị bệnh khi dương tính là tỉ số hai nhóm", "A thousand people tested: the chance of being ill given a positive is a ratio of two groups")}
      story={tt(
        R`Hình dung $1000$ người, trong đó một phần nhỏ mắc bệnh. Xét nghiệm báo dương tính đúng ở $95\%$ người bệnh nhưng cũng báo nhầm ở $5\%$ người khỏe. Gom những người dương tính lại: nhóm xanh là người bệnh thật, nhóm cam là người khỏe bị báo nhầm. Xác suất bị bệnh khi đã dương tính chỉ là phần của nhóm xanh trong cả hai nhóm. Kéo tỉ lệ mắc để xem nhóm cam lấn át nhóm xanh khi bệnh hiếm.`,
        R`Picture $1000$ people, a small share of them ill. The test is positive for $95\%$ of the ill but also wrongly positive for $5\%$ of the healthy. Gather everyone who tested positive: the blue group is the truly ill, the orange group the healthy wrongly flagged. The chance of being ill given a positive is just the blue share of the two groups. Drag the illness rate to see the orange group swamp the blue one when the disease is rare.`,
      )}
      read={tt(
        `Tỉ lệ mắc ${fmt(rate, 1)}%: ${fmt(f.sick, 1)} người bệnh, trong đó ${fmt(f.tp, 1)} dương tính; ${fmt(f.healthy, 1)} người khỏe, trong đó ${fmt(f.fp, 1)} bị báo nhầm. Dương tính có ${fmt(f.positive, 1)} người, nên $P(\\text{bệnh}\\mid\\text{dương})=\\frac{${fm(f.tp, 1)}}{${fm(f.positive, 1)}}\\approx ${pct(f.posterior)}\\%$.`,
        `Illness rate ${fmt(rate, 1)}%: ${fmt(f.sick, 1)} ill, of whom ${fmt(f.tp, 1)} test positive; ${fmt(f.healthy, 1)} healthy, of whom ${fmt(f.fp, 1)} are wrongly flagged. ${fmt(f.positive, 1)} people test positive, so $P(\\text{ill}\\mid\\text{positive})=\\frac{${fm(f.tp, 1)}}{${fm(f.positive, 1)}}\\approx ${pct(f.posterior)}\\%$.`,
      )}
      why={tt(
        R`Đếm số người thay cho xác suất: nhóm bệnh có $1000\,P(B)$ người, trong đó $1000\,P(B)P(A\mid B)$ người dương tính; nhóm khỏe góp $1000\,P(\overline{B})P(A\mid\overline{B})$ người dương tính. Tỉ số của nhóm xanh trên tổng hai nhóm chính là $\frac{P(B)P(A\mid B)}{P(B)P(A\mid B)+P(\overline{B})P(A\mid\overline{B})}$, tức công thức Bayes với mẫu số là xác suất toàn phần.`,
        R`Count people instead of probabilities: the ill group has $1000\,P(B)$ people, of whom $1000\,P(B)P(A\mid B)$ test positive; the healthy group adds $1000\,P(\overline{B})P(A\mid\overline{B})$ positives. The blue count over the two-group total is $\frac{P(B)P(A\mid B)}{P(B)P(A\mid B)+P(\overline{B})P(A\mid\overline{B})}$, which is Bayes' formula with the total probability as its denominator.`,
      )}
    >
      <Graph
        label={tt("Hai cột: người dương tính thật và người dương tính nhầm", "Two bars: true positives and false positives")}
        draw={(ctx, w, hh) => {
          const top = Math.max(60, f.positive * 1.15);
          const { colors, map } = frame(ctx, w, hh, 0, 3, 0, top, "", tt("số người", "people"));
          ctx.fillStyle = colors.curve;
          ctx.fillRect(map.x(0.4), map.y(f.tp), map.x(1.2) - map.x(0.4), map.y(0) - map.y(f.tp));
          ctx.fillStyle = colors.alt;
          ctx.fillRect(map.x(1.8), map.y(f.fp), map.x(2.6) - map.x(1.8), map.y(0) - map.y(f.fp));
          label(ctx, tt(`bệnh thật ${fmt(f.tp, 1)}`, `truly ill ${fmt(f.tp, 1)}`), map.x(0.3), map.y(f.tp) - 6, colors.ink);
          label(ctx, tt(`báo nhầm ${fmt(f.fp, 1)}`, `false alarm ${fmt(f.fp, 1)}`), map.x(1.7), map.y(f.fp) - 6, colors.ink);
          line(ctx, map.x(0), map.y(0), map.x(3), map.y(0), colors.soft, 1);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Tỉ lệ mắc (%)", "Illness rate (%)")} value={Number(rate.toFixed(1))} min={0.5} max={10} step={0.5} onChange={(v) => { setRunning(false); setPhase((v - 0.5) / 9.5); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 2. Cây xác suất hai tầng: toàn phần ---------- */

export function TotalProbTreeAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(600, 0.16);
  const share = 0.2 + 0.6 * phase; // phần sản phẩm do máy A làm
  const pB = [share, 1 - share];
  const pD = [0.02, 0.05];
  const { leaves, total } = twoStageLeaves(pB, pD);
  const fromA = (leaves[0]?.yes ?? 0) / (total || 1);
  return (
    <Stage
      title={tt("Cây xác suất: nhân dọc nhánh, cộng các lá cùng kết quả", "A probability tree: multiply along branches, add the leaves with the same outcome")}
      story={tt(
        R`Hai máy cùng làm sản phẩm: máy $A$ làm một phần, máy $B$ làm phần còn lại; máy $A$ lỗi $2\%$, máy $B$ lỗi $5\%$. Vẽ nhánh theo từng giai đoạn: trước hết sản phẩm do máy nào làm, rồi có lỗi hay không. Mỗi lá có xác suất bằng tích các số dọc đường đi. Hai lá «có lỗi» cộng lại cho xác suất sản phẩm lỗi. Kéo phần máy $A$ làm để thấy tổng này đổi theo.`,
        R`Two machines make the products: machine $A$ makes a share, machine $B$ the rest; $A$ is faulty $2\%$ of the time, $B$ $5\%$. Draw branches stage by stage: first which machine made it, then whether it is faulty. Each leaf has the product of the numbers along its path. The two «faulty» leaves add up to the probability of a faulty product. Drag the share made by machine $A$ to see this total move.`,
      )}
      read={tt(
        `Máy $A$ làm ${fmt(share * 100, 0)}%: lá lỗi của $A$ là $${fm(share, 2)}\\cdot0{,}02=${fm(leaves[0]!.yes, 4)}$, lá lỗi của $B$ là $${fm(1 - share, 2)}\\cdot0{,}05=${fm(leaves[1]!.yes, 4)}$. Tổng: $P(\\text{lỗi})=${fm(total, 4)}$. Biết sản phẩm lỗi, xác suất nó từ máy $A$ là $${fm(fromA * 100, 1)}\\%$.`,
        `Machine $A$ makes ${fmt(share * 100, 0)}%: the faulty leaf of $A$ is $${fm(share, 2)}\\cdot0.02=${fm(leaves[0]!.yes, 4)}$, that of $B$ is $${fm(1 - share, 2)}\\cdot0.05=${fm(leaves[1]!.yes, 4)}$. Total: $P(\\text{faulty})=${fm(total, 4)}$. Given a faulty product, the chance it came from $A$ is $${fm(fromA * 100, 1)}\\%$.`,
      )}
      why={tt(
        R`Hai nhánh «máy $A$» và «máy $B$» rời nhau và phủ kín mọi sản phẩm, nên sản phẩm lỗi cũng bị chia thành hai phần rời nhau: lỗi và do $A$, lỗi và do $B$. Xác suất mỗi phần là tích dọc nhánh theo quy tắc nhân, và cộng hai phần được công thức xác suất toàn phần. Tổng bốn lá luôn bằng $1$ vì chúng chia hết mọi kết quả.`,
        R`The branches «machine $A$» and «machine $B$» are disjoint and cover every product, so the faulty products also split into two disjoint parts: faulty and from $A$, faulty and from $B$. Each part has the product along its branch by the product rule, and adding the two parts gives the total probability formula. The four leaves always add to $1$ because they split every outcome.`,
      )}
    >
      <Graph
        label={tt("Cây hai tầng: máy làm ra sản phẩm, rồi lỗi hay không", "A two-stage tree: which machine, then faulty or not")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, 0, 3, 0, 4, "", "");
          const root = { x: 0.2, y: 2 };
          const mid = [{ x: 1.4, y: 3 }, { x: 1.4, y: 1 }];
          const leafY = [3.5, 2.5, 1.5, 0.5];
          mid.forEach((m, i) => {
            line(ctx, map.x(root.x), map.y(root.y), map.x(m.x), map.y(m.y), colors.soft, 1.6 + 4 * (pB[i] as number));
            label(ctx, `${i === 0 ? "A" : "B"}: ${fmt(pB[i] as number, 2)}`, map.x(0.55), map.y((root.y + m.y) / 2 + (i === 0 ? 0.25 : -0.25)), colors.ink);
            ([true, false] as const).forEach((yes, j) => {
              const ly = leafY[i * 2 + j] as number;
              const leaf = leaves[i]!;
              const joint = yes ? leaf.yes : leaf.no;
              line(ctx, map.x(m.x), map.y(m.y), map.x(2.2), map.y(ly), yes ? colors.alt : colors.soft, 1.4 + 8 * joint);
              label(ctx, `${yes ? tt("lỗi", "faulty") : tt("tốt", "good")} ${fmt((yes ? pD[i] : 1 - (pD[i] as number)) as number, 2)}`, map.x(1.6), map.y((m.y + ly) / 2 + 0.2), colors.ink);
              label(ctx, fmt(joint, 4), map.x(2.25), map.y(ly - 0.05), yes ? colors.alt : colors.ink);
            });
          });
          label(ctx, `${tt("lỗi", "faulty")} = ${fmt(total, 4)}`, map.x(0.1), map.y(3.85), colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Phần do máy A làm (%)", "Share made by machine A (%)")} value={Math.round(share * 100)} min={20} max={80} step={5} onChange={(v) => { setRunning(false); setPhase((v / 100 - 0.2) / 0.6); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 3. Phép thử lặp: dựng hàng nhị thức theo lần thử cuối ---------- */

export function BinomialBuildAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(700, 0.14);
  const n = 1 + Math.floor(phase * 9);
  const p = 0.4;
  let row: number[] = [1];
  for (let i = 1; i <= n; i++) row = binomialNext(row, p);
  const best = row.indexOf(Math.max(...row));
  return (
    <Stage
      title={tt("Phép thử lặp: mỗi lần thử thêm vào, hàng xác suất được dựng từ hàng trước", "Repeated trials: each extra trial builds the new row of probabilities from the previous one")}
      story={tt(
        R`Tung một đồng xu lệch có xác suất ngửa $p=0{,}4$. Sau $n$ lần tung, cột $k$ là xác suất có đúng $k$ lần ngửa. Hàng mới được dựng từ hàng cũ theo lần tung cuối: nếu lần cuối ngửa thì trước đó có $k-1$ lần ngửa, nếu lần cuối sấp thì trước đó đã có $k$ lần ngửa. Mỗi cột mới là hai cột cũ trộn theo $p$ và $1-p$, giống tam giác Pascal nhưng có trọng số. Chạy thêm lần tung để thấy hình chuông dần hiện ra.`,
        R`Toss a biased coin with probability of heads $p=0.4$. After $n$ tosses, bar $k$ is the probability of exactly $k$ heads. The new row is built from the old one by the last toss: if the last toss is heads there were $k-1$ heads before, if tails there were already $k$ heads. Each new bar mixes two old bars with weights $p$ and $1-p$, like Pascal's triangle but weighted. Add more tosses to watch the bell shape appear.`,
      )}
      read={tt(
        `Sau $n=${n}$ lần tung: nhiều khả năng nhất là $k=${best}$ lần ngửa với xác suất $${fm(row[best] as number, 3)}$. Tổng các cột $=${fm(row.reduce((a, b) => a + b, 0), 3)}$. Chẳng hạn $P(k=${best})=C_{${n}}^{${best}}\\cdot0{,}4^{${best}}\\cdot0{,}6^{${n - best}}$.`,
        `After $n=${n}$ tosses: the most likely outcome is $k=${best}$ heads with probability $${fm(row[best] as number, 3)}$. The bars add to $${fm(row.reduce((a, b) => a + b, 0), 3)}$. For instance $P(k=${best})=C_{${n}}^{${best}}\\cdot0.4^{${best}}\\cdot0.6^{${n - best}}$.`,
      )}
      why={tt(
        R`Gọi $b(n,k)$ là xác suất đúng $k$ lần ngửa trong $n$ lần. Chia theo lần cuối (hai khả năng rời nhau, đủ): $b(n,k)=p\,b(n-1,k-1)+(1-p)\,b(n-1,k)$, vì các lần tung độc lập. Đây là hệ thức Pascal có thêm trọng số, nên quy nạp cho ngay $b(n,k)=C_n^k\,p^k(1-p)^{n-k}$ mà không phải đếm các dãy kết quả.`,
        R`Let $b(n,k)$ be the probability of exactly $k$ heads in $n$ tosses. Splitting by the last toss (two disjoint, exhaustive cases): $b(n,k)=p\,b(n-1,k-1)+(1-p)\,b(n-1,k)$, because tosses are independent. This is Pascal's relation with weights, so induction gives $b(n,k)=C_n^k\,p^k(1-p)^{n-k}$ without counting any sequences.`,
      )}
    >
      <Graph
        label={tt("Cột k: xác suất đúng k lần ngửa sau n lần tung", "Bar k: probability of exactly k heads after n tosses")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -0.5, 10.5, 0, 0.5, "k", "P");
          row.forEach((v, k) => {
            ctx.fillStyle = k === best ? colors.alt : colors.curve;
            ctx.globalAlpha = 0.9;
            ctx.fillRect(map.x(k - 0.35), map.y(v), map.x(k + 0.35) - map.x(k - 0.35), map.y(0) - map.y(v));
            ctx.globalAlpha = 1;
          });
          label(ctx, `n = ${n}`, map.x(8.6), map.y(0.46), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số lần tung n", "Number of tosses n")} value={n} min={1} max={10} step={1} onChange={(v) => { setRunning(false); setPhase((v - 1) / 9 + 0.01); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

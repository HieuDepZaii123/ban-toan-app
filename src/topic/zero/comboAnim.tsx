import { arrange, choose, factorial, pascalRows, treeLevelCounts } from "../../algo/index.ts";
import { Graph } from "../../labs/Graph.tsx";
import { dot } from "../../labs/draw.ts";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { PlayButtons, useLoop } from "./anim.tsx";
import { frame, label, line, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;

/* ---------- 1. Cây đếm mọc dần: quy tắc nhân ---------- */

const BRANCHES = [3, 2, 2];
const STEP_NAMES: [string, string][] = [["áo", "shirt"], ["quần", "trousers"], ["giày", "shoes"]];

export function CountingTreeAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(700, 0.18);
  const levels = 1 + Math.floor(phase * 3);
  const counts = treeLevelCounts(BRANCHES);
  const total = counts[counts.length - 1] as number;
  return (
    <Stage
      title={tt("Cây đếm mọc dần: mỗi bước nhân số nhánh lên", "A growing counting tree: each step multiplies the number of branches")}
      story={tt(
        R`Chọn một bộ đồ gồm áo, quần và giày. Có $3$ cái áo; với mỗi áo có $2$ cái quần; với mỗi cặp đó có $2$ đôi giày. Cây mọc từng tầng: tầng một có $3$ nhánh, mỗi nhánh lại chia $2$ nên tầng hai có $6$ nút, rồi chia $2$ nữa thành $12$ lá. Mỗi lá là một bộ đồ khác nhau, nên số cách là $3\cdot2\cdot2=12$.`,
        R`Choose an outfit of a shirt, trousers and shoes. There are $3$ shirts; for each shirt there are $2$ pairs of trousers; for each such pair there are $2$ pairs of shoes. The tree grows level by level: level one has $3$ branches, each splits in $2$ so level two has $6$ nodes, then each splits in $2$ again into $12$ leaves. Each leaf is a different outfit, so the number of ways is $3\cdot2\cdot2=12$.`,
      )}
      read={tt(
        `Đã mọc ${levels - 1} tầng. Số nút ở tầng cuối: $${counts[levels - 1]}$ (${counts.slice(0, levels).join(" → ")}). Khi đủ ba tầng: $3\\cdot2\\cdot2=${total}$ cách.`,
        `${levels - 1} levels grown. Nodes on the last level: $${counts[levels - 1]}$ (${counts.slice(0, levels).join(" → ")}). With all three levels: $3\\cdot2\\cdot2=${total}$ ways.`,
      )}
      why={tt(
        R`Với mỗi cách chọn ở bước một, bước hai có cùng số cách, nên các cách hoàn thành công việc bắt đầu bằng một lựa chọn cố định làm thành một nhóm cùng cỡ. Các nhóm rời nhau, và cộng $m$ nhóm cỡ $n$ được $m\cdot n$: đó là chứng minh quy tắc nhân bằng quy tắc cộng lặp lại. Cây chỉ là cách vẽ các nhóm ấy ra.`,
        R`For each choice at step one, step two has the same number of ways, so the ways to finish the job starting with one fixed choice form a group of equal size. The groups are disjoint, and adding $m$ groups of size $n$ gives $m\cdot n$: that is the proof of the product rule by repeated addition. The tree simply draws those groups.`,
      )}
    >
      <Graph
        label={tt("Cây đếm bộ đồ: áo, quần, giày", "The counting tree of outfits: shirt, trousers, shoes")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, 0, 3.4, 0, 13, "", "");
          const pos = (level: number, idx: number) => {
            const n = counts[level] as number;
            return { x: level + 0.2, y: ((idx + 0.5) * 12.4) / n + 0.3 };
          };
          for (let lv = 1; lv < levels; lv++) {
            const n = counts[lv] as number;
            const b = BRANCHES[lv - 1] as number;
            for (let i = 0; i < n; i++) {
              const a = pos(lv - 1, Math.floor(i / b));
              const c = pos(lv, i);
              line(ctx, map.x(a.x), map.y(a.y), map.x(c.x), map.y(c.y), colors.soft, 1.4);
            }
          }
          for (let lv = 0; lv < levels; lv++) {
            const n = counts[lv] as number;
            for (let i = 0; i < n; i++) {
              const p = pos(lv, i);
              dot(ctx, map.x(p.x), map.y(p.y), lv === levels - 1 ? colors.alt : colors.curve, colors.bg, lv === 0 ? 5 : 4);
            }
            if (lv > 0) label(ctx, `${tt(STEP_NAMES[lv - 1]![0], STEP_NAMES[lv - 1]![1])} ×${BRANCHES[lv - 1]}`, map.x(lv + 0.05), map.y(12.9), colors.ink);
          }
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số tầng đã mọc", "Levels grown")} value={levels - 1} min={0} max={3} step={1} onChange={(v) => { setRunning(false); setPhase(v / 3 + 0.01); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 2. Tam giác Pascal dựng từng hàng ---------- */

export function PascalBuildAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(600, 0.12);
  const n = 1 + Math.floor(phase * 8);
  const rows = pascalRows(n);
  const last = rows[n] as number[];
  const sum = last.reduce((a, b) => a + b, 0);
  return (
    <Stage
      title={tt("Tam giác Pascal: mỗi số là tổng hai số phía trên, và hàng $n$ có tổng $2^n$", "Pascal's triangle: each number is the sum of the two above, and row $n$ sums to $2^n$")}
      story={tt(
        R`Hàng thứ $n$ liệt kê số cách chọn $0,1,\dots,n$ phần tử từ $n$ phần tử. Hàng mới được dựng từ hàng trước: mỗi số bằng tổng hai số phía trên nó. Đây là hệ thức Pascal $C_n^k=C_{n-1}^{k-1}+C_{n-1}^{k}$: chọn $k$ người trong $n$ người, hoặc có một người cố định, hoặc không. Cộng cả hàng ta được $2^n$, vì mỗi người có hai khả năng, vào nhóm hoặc không.`,
        R`Row $n$ lists the numbers of ways to choose $0,1,\dots,n$ items out of $n$. Each new row is built from the previous one: every number is the sum of the two above it. This is Pascal's relation $C_n^k=C_{n-1}^{k-1}+C_{n-1}^{k}$: choosing $k$ people out of $n$, either a fixed person is in or not. Adding the whole row gives $2^n$, since each person has two possibilities, in the group or out.`,
      )}
      read={tt(
        `Hàng $${n}$: ${last.join(", ")}. Tổng $${sum}=2^{${n}}$. Ví dụ $C_{${n}}^{${Math.floor(n / 2)}}=${choose(n, Math.floor(n / 2))}$.`,
        `Row $${n}$: ${last.join(", ")}. Sum $${sum}=2^{${n}}$. For example $C_{${n}}^{${Math.floor(n / 2)}}=${choose(n, Math.floor(n / 2))}$.`,
      )}
      why={tt(
        R`Hệ thức Pascal chứng minh bằng đếm: trong $n+1$ người, nhóm $k+1$ người hoặc có một người cố định (chọn thêm $k$ người trong $n$ người còn lại: $C_n^k$ cách), hoặc không có (chọn cả $k+1$ người trong $n$ người còn lại: $C_n^{k+1}$ cách). Từ hệ thức này, quy nạp cho ra cả công thức giai thừa của $C_n^k$ lẫn khai triển nhị thức, và đặt $a=b=1$ cho tổng hàng $2^n$.`,
        R`Pascal's relation is proved by counting: among $n+1$ people, a group of $k+1$ either contains a fixed person (choose $k$ more from the other $n$: $C_n^k$ ways) or not (choose all $k+1$ from the other $n$: $C_n^{k+1}$ ways). From this relation induction gives both the factorial formula for $C_n^k$ and the binomial expansion, and setting $a=b=1$ gives the row sum $2^n$.`,
      )}
    >
      <Graph
        label={tt("Các hàng đầu của tam giác Pascal", "The first rows of Pascal's triangle")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -5.5, 5.5, -0.5, 9.5, "", "");
          rows.forEach((row, r) => {
            row.forEach((v, k) => {
              const x = (k - r / 2) * 1.0;
              const y = 9 - r;
              ctx.fillStyle = r === n ? colors.alt : colors.ink;
              ctx.font = r === n ? "bold 14px system-ui, sans-serif" : "13px system-ui, sans-serif";
              ctx.fillText(String(v), map.x(x) - 5 * String(v).length, map.y(y) + 4);
            });
          });
          label(ctx, `Σ = ${sum} = 2^${n}`, map.x(-5.3), map.y(0.2), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số hàng", "Number of rows")} value={n} min={1} max={9} step={1} onChange={(v) => { setRunning(false); setPhase((v - 1) / 8 + 0.01); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 3. Giai thừa tăng nhanh: mỗi bước nhân thêm n ---------- */

export function FactorialGrowthAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(600, 0.1);
  const n = 1 + Math.floor(phase * 10);
  const values = Array.from({ length: 10 }, (_, i) => factorial(i + 1));
  return (
    <Stage
      title={tt("Xếp $n$ người thành hàng: mỗi người thêm vào nhân số cách lên $n$ lần", "Lining up $n$ people: each extra person multiplies the number of ways by $n$")}
      story={tt(
        R`Cột cao là số cách xếp $n$ người thành hàng, vẽ theo thang logarit để nhìn được cả số nhỏ lẫn số lớn. Thêm một người nghĩa là có thêm $n$ vị trí để chen vào, nên số cách nhân với $n$: $(n-1)!\cdot n=n!$. Chỉ với $10$ người đã có hơn ba triệu cách.`,
        R`Each column is the number of ways to line up $n$ people, drawn on a logarithmic scale so both small and large values are visible. Adding one person means $n$ more positions to squeeze into, so the count is multiplied by $n$: $(n-1)!\cdot n=n!$. With just $10$ people there are over three million ways.`,
      )}
      read={tt(
        `$n=${n}$: $${n}!=${factorial(n).toLocaleString("vi-VN")}$${n > 1 ? `, gấp $${n}$ lần $${n - 1}!=${factorial(n - 1).toLocaleString("vi-VN")}$` : ""}. Chỉnh hợp: chọn $3$ người rồi xếp từ $${n}$ người có $A_{${n}}^3=${arrange(n, 3)}$ cách.`,
        `$n=${n}$: $${n}!=${factorial(n).toLocaleString("en-US")}$${n > 1 ? `, which is $${n}$ times $${n - 1}!=${factorial(n - 1).toLocaleString("en-US")}$` : ""}. Arrangements: choosing and ordering $3$ people from $${n}$ gives $A_{${n}}^3=${arrange(n, 3)}$ ways.`,
      )}
      why={tt(
        R`Cách chứng minh bằng quy nạp: xếp $n+1$ vật bằng cách chọn trước vị trí của vật thứ $n+1$ ($n+1$ vị trí), rồi xếp $n$ vật còn lại theo $n!$ cách, được $(n+1)\cdot n!=(n+1)!$. Cách này cho cùng kết quả với quy tắc nhân nhưng nhấn mạnh cấu trúc đệ quy: giai thừa là tích tích lũy.`,
        R`The proof by induction: line up $n+1$ objects by first choosing the position of the $(n+1)$th object ($n+1$ positions), then arranging the other $n$ in $n!$ ways, giving $(n+1)\cdot n!=(n+1)!$. This agrees with the product rule but stresses the recursive structure: the factorial is a running product.`,
      )}
    >
      <Graph
        label={tt("n! theo thang logarit cho n từ 1 đến 10", "n! on a logarithmic scale for n from 1 to 10")}
        draw={(ctx, w, hh) => {
          const top = Math.log10(factorial(10)) + 0.5;
          const { colors, map } = frame(ctx, w, hh, 0, 11, 0, top, "n", "lg n!");
          values.forEach((v, i) => {
            const h0 = Math.log10(v) + 0.05;
            ctx.fillStyle = i + 1 === n ? colors.alt : colors.curve;
            ctx.globalAlpha = i + 1 <= n ? 0.9 : 0.25;
            ctx.fillRect(map.x(i + 0.65), map.y(h0), map.x(i + 1.35) - map.x(i + 0.65), map.y(0) - map.y(h0));
            ctx.globalAlpha = 1;
          });
          label(ctx, `${n}! = ${fmt(factorial(n), 0)}`, map.x(0.3), map.y(top - 0.3), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số người n", "Number of people n")} value={n} min={1} max={10} step={1} onChange={(v) => { setRunning(false); setPhase((v - 1) / 10 + 0.01); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

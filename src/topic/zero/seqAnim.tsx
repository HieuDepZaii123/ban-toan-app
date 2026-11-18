import { dominoAngles, gaussPairs, geometricPartials } from "../../algo/index.ts";
import { dashed, dot } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { PlayButtons, useLoop, wave } from "./anim.tsx";
import { frame, label, line, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;

/* ---------- 1. Ghép cặp kiểu Gauss ---------- */

export function GaussPairsAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(60, 0.006);
  const n = 10;
  const u1 = 2;
  const d = 3;
  const g = gaussPairs(u1, d, n);
  const slide = wave((phase * 2) % 1);
  const col = Math.min(n - 1, Math.floor(phase * n));
  const total = g.top.reduce((a, b) => a + b, 0);
  return (
    <Stage
      title={tt("Ghép cặp kiểu Gauss: mọi cột có cùng một tổng", "Gauss pairing: every column has the same sum")}
      story={tt(
        R`Xếp các số hạng của cấp số cộng thành các cột cao dần: $2, 5, 8, \dots$ Lật ngược một bản sao rồi trượt nó vào, đặt úp lên bản gốc. Cột nào cũng được ghép một số hạng đầu với một số hạng cuối: số này tăng bao nhiêu thì số kia giảm bấy nhiêu, nên mỗi cột cao đúng $u_1+u_n$. Mười cột như vậy tạo thành một hình chữ nhật, và tổng cần tìm là nửa diện tích của nó.`,
        R`Arrange the terms of an arithmetic sequence as columns of increasing height: $2, 5, 8, \dots$ Flip a copy upside down and slide it onto the original. Every column pairs one early term with one late term: what one gains the other loses, so every column is exactly $u_1+u_n$ tall. Ten such columns form a rectangle, and the sum we want is half its area.`,
      )}
      read={tt(
        `Cột ${col + 1}: $${g.top[col]}+${g.bottom[col]}=${g.sums[col]}$. Mọi cột đều bằng $u_1+u_n=${u1}+${g.top[n - 1]}=${g.sums[0]}$. Tổng $S_{${n}}=\\frac{${n}\\cdot ${g.sums[0]}}{2}=${total}$.`,
        `Column ${col + 1}: $${g.top[col]}+${g.bottom[col]}=${g.sums[col]}$. Every column equals $u_1+u_n=${u1}+${g.top[n - 1]}=${g.sums[0]}$. The sum $S_{${n}}=\\frac{${n}\\cdot ${g.sums[0]}}{2}=${total}$.`,
      )}
      why={tt(
        R`Cột thứ $i$ có số hàng dưới là $u_1+(i-1)d$ và số hàng trên là $u_n-(i-1)d$. Phần $(i-1)d$ triệt tiêu nên mọi cột cùng bằng $u_1+u_n$. Có $n$ cột nên cả hình có diện tích $n(u_1+u_n)$, đúng bằng hai lần tổng, vậy $S_n=\frac{n(u_1+u_n)}{2}$.`,
        R`In column $i$ the lower number is $u_1+(i-1)d$ and the upper number is $u_n-(i-1)d$. The part $(i-1)d$ cancels, so every column equals $u_1+u_n$. There are $n$ columns, so the whole picture has area $n(u_1+u_n)$, exactly twice the sum, hence $S_n=\frac{n(u_1+u_n)}{2}$.`,
      )}
    >
      <Graph
        label={tt("Hai dãy cột ghép lại thành hình chữ nhật", "Two rows of columns fitting into a rectangle")}
        draw={(ctx, w, hh) => {
          const top = g.sums[0] as number;
          const { colors, map } = frame(ctx, w, hh, -0.5, n + 1, -2, top + 4, "", "");
          for (let i = 0; i < n; i++) {
            const x = i + 0.1;
            ctx.save();
            ctx.globalAlpha = 0.55;
            ctx.fillStyle = colors.curve;
            ctx.fillRect(map.x(x), map.y(g.top[i] as number), map.x(x + 0.8) - map.x(x), map.y(0) - map.y(g.top[i] as number));
            ctx.fillStyle = colors.alt;
            const lift = (1 - slide) * 2.5;
            ctx.fillRect(map.x(x), map.y(top + lift) , map.x(x + 0.8) - map.x(x), map.y(top + lift - (g.bottom[i] as number)) - map.y(top + lift));
            ctx.restore();
            if (i === col) {
              ctx.strokeStyle = colors.ink;
              ctx.lineWidth = 2;
              ctx.strokeRect(map.x(x), map.y(top), map.x(x + 0.8) - map.x(x), map.y(0) - map.y(top));
            }
          }
          line(ctx, map.x(0), map.y(top), map.x(n), map.y(top), colors.ink, 1.4);
          label(ctx, `u₁ + uₙ = ${g.sums[0]}`, map.x(0.1), map.y(top + 1.6), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Cột đang xét", "Column being checked")} value={phase} min={0} max={0.999} step={0.005} onChange={(v) => { setRunning(false); setPhase(v); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 2. Cấp số nhân lấp đầy khoảng thiếu ---------- */

export function GeometricFillAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(80, 0.008);
  const q = 0.5;
  const u1 = 1;
  const N = 12;
  const shown = 1 + Math.floor(phase * (N - 0.001));
  const partial = geometricPartials(u1, q, N);
  const s = partial[shown - 1] as number;
  const limit = u1 / (1 - q);
  return (
    <Stage
      title={tt("Cộng mãi các mảnh nhỏ dần, khoảng thiếu co về 0", "Keep adding ever smaller pieces and the gap shrinks to 0")}
      story={tt(
        R`Một đoạn dài $2$. Cắt lấy mảnh $1$, rồi mảnh $\frac{1}{2}$, rồi $\frac{1}{4}$, và cứ thế: mỗi mảnh bằng nửa mảnh trước. Các mảnh nối đuôi nhau lấp dần đoạn thẳng. Phần còn thiếu luôn bằng đúng mảnh vừa nối, còn mảnh kế tiếp chỉ lấp một nửa nó, nên khoảng thiếu co về $0$ và tổng tiến về $2$, tức $\frac{u_1}{1-q}$ với $u_1=1$ và $q=\frac{1}{2}$.`,
        R`A segment of length $2$. Cut off a piece $1$, then a piece $\frac{1}{2}$, then $\frac{1}{4}$, and so on: each piece is half the previous one. The pieces laid end to end fill the segment bit by bit. The part still missing always equals the piece just added, and the next piece fills only half of it, so the gap shrinks to $0$ and the sum tends to $2$, that is $\frac{u_1}{1-q}$ with $u_1=1$ and $q=\frac{1}{2}$.`,
      )}
      read={tt(
        `Sau ${shown} mảnh: $S_{${shown}}=${fmt(s, 5)}$, còn thiếu $${fmt(limit - s, 5)}$ để tới $\\frac{u_1}{1-q}=${fmt(limit)}$.`,
        `After ${shown} pieces: $S_{${shown}}=${fmt(s, 5)}$, still $${fmt(limit - s, 5)}$ short of $\\frac{u_1}{1-q}=${fmt(limit)}$.`,
      )}
      why={tt(
        R`$S_n=\frac{u_1}{1-q}-\frac{u_1}{1-q}q^n$, nên khoảng thiếu là $\frac{u_1}{1-q}q^n$. Khi $|q|<1$, $q^n$ nhỏ hơn mọi số dương cho trước nếu $n$ đủ lớn, nên khoảng thiếu co về $0$. Ở hình, mỗi bước khoảng thiếu giảm một nửa.`,
        R`$S_n=\frac{u_1}{1-q}-\frac{u_1}{1-q}q^n$, so the gap is $\frac{u_1}{1-q}q^n$. When $|q|<1$, $q^n$ is smaller than any given positive number once $n$ is large enough, so the gap shrinks to $0$. In the picture the gap halves at every step.`,
      )}
    >
      <Graph
        label={tt("Các mảnh nối đuôi nhau trên đoạn dài 2", "Pieces laid end to end on a segment of length 2")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -0.1, 2.3, -1, 2, "", "");
          line(ctx, map.x(0), map.y(0), map.x(limit), map.y(0), colors.soft, 3);
          let x = 0;
          for (let k = 0; k < shown; k++) {
            const len = u1 * q ** k;
            ctx.save();
            ctx.globalAlpha = 0.6;
            ctx.fillStyle = k % 2 === 0 ? colors.curve : colors.alt;
            ctx.fillRect(map.x(x), map.y(0.5), map.x(x + len) - map.x(x), map.y(0) - map.y(0.5));
            ctx.restore();
            ctx.strokeStyle = colors.ink;
            ctx.strokeRect(map.x(x), map.y(0.5), map.x(x + len) - map.x(x), map.y(0) - map.y(0.5));
            x += len;
          }
          dashed(ctx, map.x(limit), map.y(-0.4), map.x(limit), map.y(1.2), colors.ink);
          dot(ctx, map.x(s), map.y(0), colors.alt, colors.bg, 6);
          label(ctx, tt(`còn thiếu ${fmt(limit - s, 4)}`, `still missing ${fmt(limit - s, 4)}`), map.x(Math.min(s, 1.4)), map.y(1.1), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Số mảnh đã nối", "Pieces laid so far")} value={phase} min={0} max={0.999} step={0.005} onChange={(v) => { setRunning(false); setPhase(v); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 3. Hàng domino: bước cơ sở và bước quy nạp ---------- */

export function DominoAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(40, 0.004);
  const n = 8;
  const t = phase * (n * 0.6 + 1.2);
  const angles = dominoAngles(n, t);
  const fallen = angles.filter((a) => a > 1).length;
  return (
    <Stage
      title={tt("Hàng domino: quân đầu đổ, quân nào đổ cũng kéo quân kế đổ", "A row of dominoes: the first falls, and each one that falls topples the next")}
      story={tt(
        R`Mỗi quân domino ứng với một giá trị của $n$. Bước cơ sở: quân đầu tiên bị đẩy, nó đổ. Bước quy nạp: bất kì quân nào đổ cũng đẩy quân kế tiếp đổ. Hai điều đó cùng nhau làm cả hàng đổ lần lượt, dù hàng dài bao nhiêu. Nếu thiếu bước cơ sở, không ai đẩy quân đầu; nếu thiếu bước quy nạp, hàng đổ dở dang.`,
        R`Each domino stands for one value of $n$. Base case: the first domino is pushed, so it falls. Inductive step: any domino that falls pushes the next one over. Together these make the whole row fall one after another, however long it is. Without the base case nobody pushes the first domino; without the inductive step the row stops half way.`,
      )}
      read={tt(
        `Đã đổ ${fallen} trên ${n} quân.${fallen === 0 ? " Quân 1 đang bị đẩy." : fallen >= n ? " Cả hàng đã đổ." : ` Quân ${fallen + 1} đang bị quân ${fallen} đẩy.`}`,
        `${fallen} of ${n} dominoes have fallen.${fallen === 0 ? " Domino 1 is being pushed." : fallen >= n ? " The whole row has fallen." : ` Domino ${fallen + 1} is being pushed by domino ${fallen}.`}`,
      )}
      why={tt(
        R`Giả sử có quân không đổ, và lấy quân đầu tiên như thế, đánh số $m$. Quân $m$ không phải quân đầu vì quân đầu đã đổ. Quân $m-1$ đổ (vì $m$ là quân không đổ đầu tiên), mà quân đổ thì đẩy quân kế tiếp, nên quân $m$ phải đổ: mâu thuẫn. Vậy mọi quân đều đổ.`,
        R`Suppose some domino does not fall and take the first such one, numbered $m$. It is not the first domino, because that one falls. Domino $m-1$ falls (as $m$ is the first one that does not), and a falling domino pushes the next, so domino $m$ must fall: a contradiction. Hence every domino falls.`,
      )}
    >
      <Graph
        label={tt("Hàng tám quân domino đang đổ", "A row of eight falling dominoes")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -0.5, n + 1.5, -1, 4, "", "");
          line(ctx, map.x(-0.5), map.y(0), map.x(n + 1.5), map.y(0), colors.ink, 2);
          for (let i = 0; i < n; i++) {
            const x0 = i + 0.5;
            const a = angles[i] as number;
            const hgt = 2.2;
            // Quân đổ quay quanh cạnh dưới bên phải.
            const px = map.x(x0 + 0.25);
            const py = map.y(0);
            ctx.save();
            ctx.translate(px, py);
            ctx.rotate(a);
            ctx.fillStyle = a > 1 ? colors.alt : colors.curve;
            ctx.globalAlpha = 0.7;
            ctx.fillRect(map.x(0) - map.x(0.5), map.y(hgt) - map.y(0), map.x(0.5) - map.x(0), map.y(0) - map.y(hgt));
            ctx.globalAlpha = 1;
            ctx.strokeStyle = colors.ink;
            ctx.strokeRect(map.x(0) - map.x(0.5), map.y(hgt) - map.y(0), map.x(0.5) - map.x(0), map.y(0) - map.y(hgt));
            ctx.restore();
            label(ctx, String(i + 1), map.x(x0 + 0.1), map.y(-0.5), colors.soft);
          }
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Thời gian", "Time")} value={phase} min={0} max={0.999} step={0.005} onChange={(v) => { setRunning(false); setPhase(v); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

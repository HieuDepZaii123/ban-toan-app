import { cosineSide, rightTriangleAltitude, triangleKind } from "../../algo/index.ts";
import { dashed, dot } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { Slider } from "../../ui/Slider.tsx";
import { PlayButtons, useLoop, wave } from "./anim.tsx";
import { frame, label, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;

function poly(ctx: CanvasRenderingContext2D, map: { x: (v: number) => number; y: (v: number) => number }, pts: { x: number; y: number }[], stroke: string, fill: string | null, lw = 2) {
  ctx.beginPath();
  pts.forEach((p, i) => (i === 0 ? ctx.moveTo(map.x(p.x), map.y(p.y)) : ctx.lineTo(map.x(p.x), map.y(p.y))));
  ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.globalAlpha = 0.25; ctx.fill(); ctx.globalAlpha = 1; }
  ctx.strokeStyle = stroke;
  ctx.lineWidth = lw;
  ctx.stroke();
}

/* ---------- 1. Đường cao chia tam giác vuông thành hai tam giác đồng dạng ---------- */

export function AltitudeSimilarAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(50, 0.004);
  const a = 5;
  const phi = (Math.PI / 180) * (15 + 60 * wave(phase));
  const t = rightTriangleAltitude(a, phi);
  // Dựng: B = (0;0), C = (a;0), H = (BH;0), A = (BH; h).
  const B = { x: 0, y: 0 };
  const C = { x: a, y: 0 };
  const H = { x: t.bh, y: 0 };
  const A = { x: t.bh, y: t.h };
  return (
    <Stage
      title={tt("Đường cao hạ từ góc vuông chia tam giác thành hai tam giác đồng dạng với nó", "The altitude from the right angle splits the triangle into two triangles similar to it")}
      story={tt(
        R`Tam giác $ABC$ vuông tại $A$ có cạnh huyền $BC=5$ cố định, còn góc $B$ thay đổi. Đường cao $AH$ chia tam giác thành hai tam giác nhỏ, mỗi tam giác chung một góc nhọn với tam giác lớn và đều có góc vuông, nên cả ba đồng dạng. Từ đồng dạng ta có $AB^2=BH\cdot BC$ và $AC^2=CH\cdot BC$, và hai đẳng thức này cộng lại cho định lí Pythagore.`,
        R`The triangle $ABC$ is right-angled at $A$ with fixed hypotenuse $BC=5$, while the angle $B$ varies. The altitude $AH$ splits it into two smaller triangles, each sharing an acute angle with the big one and each with a right angle, so all three are similar. Similarity gives $AB^2=BH\cdot BC$ and $AC^2=CH\cdot BC$, and adding the two gives Pythagoras' theorem.`,
      )}
      read={tt(
        `Góc $B=${fmt((phi * 180) / Math.PI, 0)}^\\circ$: $AB=${fmt(t.c, 3)}$, $AC=${fmt(t.b, 3)}$, $BH=${fmt(t.bh, 3)}$, $CH=${fmt(t.ch, 3)}$. Kiểm: $AB^2=${fmt(t.c * t.c, 3)}=BH\\cdot BC=${fmt(t.bh * a, 3)}$; $AC^2=${fmt(t.b * t.b, 3)}=CH\\cdot BC=${fmt(t.ch * a, 3)}$; tổng $AB^2+AC^2=${fmt(t.b * t.b + t.c * t.c, 3)}=BC^2$.`,
        `Angle $B=${fmt((phi * 180) / Math.PI, 0)}^\\circ$: $AB=${fmt(t.c, 3)}$, $AC=${fmt(t.b, 3)}$, $BH=${fmt(t.bh, 3)}$, $CH=${fmt(t.ch, 3)}$. Check: $AB^2=${fmt(t.c * t.c, 3)}=BH\\cdot BC=${fmt(t.bh * a, 3)}$; $AC^2=${fmt(t.b * t.b, 3)}=CH\\cdot BC=${fmt(t.ch * a, 3)}$; sum $AB^2+AC^2=${fmt(t.b * t.b + t.c * t.c, 3)}=BC^2$.`,
      )}
      why={tt(
        R`Tam giác $HBA$ và tam giác $ABC$ có góc vuông và chung góc $B$, nên đồng dạng: $\frac{HB}{AB}=\frac{AB}{BC}$, tức $AB^2=BH\cdot BC$. Tam giác $HAC$ và $ABC$ chung góc $C$ nên $AC^2=CH\cdot BC$. Cộng lại: $AB^2+AC^2=BC\cdot(BH+CH)=BC^2$, vì $H$ nằm giữa $B$ và $C$. Đây là chứng minh bằng đồng dạng, khác chứng minh bằng diện tích ở hình trước.`,
        R`The triangles $HBA$ and $ABC$ have a right angle and share the angle $B$, so they are similar: $\frac{HB}{AB}=\frac{AB}{BC}$, that is $AB^2=BH\cdot BC$. The triangles $HAC$ and $ABC$ share the angle $C$, so $AC^2=CH\cdot BC$. Adding: $AB^2+AC^2=BC\cdot(BH+CH)=BC^2$, since $H$ lies between $B$ and $C$. This is the proof by similarity, different from the proof by areas in the earlier figure.`,
      )}
    >
      <Graph
        label={tt("Tam giác vuông ABC, đường cao AH và hai tam giác đồng dạng", "The right triangle ABC, the altitude AH and the two similar triangles")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -0.5, 5.5, -0.5, 3.2, "", "", true);
          poly(ctx, map, [B, H, A], colors.curve, colors.curve);
          poly(ctx, map, [H, C, A], colors.alt, colors.alt);
          poly(ctx, map, [B, C, A], colors.ink, null, 2.4);
          dashed(ctx, map.x(A.x), map.y(A.y), map.x(H.x), map.y(H.y), colors.ink);
          for (const [p, name] of [[B, "B"], [C, "C"], [A, "A"], [H, "H"]] as const) {
            dot(ctx, map.x(p.x), map.y(p.y), colors.ink, colors.bg, 3.5);
            label(ctx, name, map.x(p.x) + 6, map.y(p.y) + (name === "A" ? -8 : 16), colors.ink);
          }
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Góc B (độ)", "Angle B (degrees)")} value={(phi * 180) / Math.PI} min={15} max={75} step={1} onChange={(v) => { setRunning(false); setPhase(Math.acos(1 - 2 * ((v - 15) / 60)) / (2 * Math.PI)); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 2. Thu phóng tam giác: chu vi gấp k, diện tích gấp k² ---------- */

export function ScaleAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(50, 0.004);
  const k = 0.5 + 1.5 * wave(phase);
  const base = [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 0.8, y: 2.2 }];
  const scaled = base.map((p) => ({ x: p.x * k, y: p.y * k }));
  const perimeter = (pts: { x: number; y: number }[]) => pts.reduce((s, p, i) => s + Math.hypot(p.x - (pts[(i + 1) % 3] as { x: number; y: number }).x, p.y - (pts[(i + 1) % 3] as { x: number; y: number }).y), 0);
  const area = (pts: { x: number; y: number }[]) => Math.abs(((pts[1] as { x: number }).x - (pts[0] as { x: number }).x) * ((pts[2] as { y: number }).y - (pts[0] as { y: number }).y) - ((pts[2] as { x: number }).x - (pts[0] as { x: number }).x) * ((pts[1] as { y: number }).y - (pts[0] as { y: number }).y)) / 2;
  const p0 = perimeter(base);
  const s0 = area(base);
  return (
    <Stage
      title={tt("Phóng to tam giác $k$ lần: chu vi gấp $k$ lần, diện tích gấp $k^2$ lần", "Scale a triangle by $k$: the perimeter grows $k$ times, the area $k^2$ times")}
      story={tt(
        R`Tam giác nhỏ (nét xám) giữ nguyên hình dạng, còn tam giác cam được phóng to hay thu nhỏ $k$ lần từ cùng một đỉnh. Mọi độ dài nhân với $k$ nên chu vi nhân với $k$. Diện tích nhân với $k^2$, vì khi phóng to cả đáy lẫn chiều cao cùng nhân $k$: tam giác phóng đôi chiếm diện tích gấp bốn.`,
        R`The small triangle (grey) keeps its shape, while the orange triangle is enlarged or reduced $k$ times from the same vertex. Every length is multiplied by $k$, so the perimeter is multiplied by $k$. The area is multiplied by $k^2$, because under scaling both the base and the height are multiplied by $k$: a doubled triangle covers four times the area.`,
      )}
      read={tt(
        `$k=${fmt(k, 2)}$: chu vi $${fmt(perimeter(scaled), 3)}=${fmt(k, 2)}\\cdot${fmt(p0, 3)}$ (tỉ số $${fmt(perimeter(scaled) / p0, 3)}$); diện tích $${fmt(area(scaled), 3)}$ so với $${fmt(s0, 3)}$ (tỉ số $${fmt(area(scaled) / s0, 3)}=k^2=${fmt(k * k, 3)}$).`,
        `$k=${fmt(k, 2)}$: perimeter $${fmt(perimeter(scaled), 3)}=${fmt(k, 2)}\\cdot${fmt(p0, 3)}$ (ratio $${fmt(perimeter(scaled) / p0, 3)}$); area $${fmt(area(scaled), 3)}$ versus $${fmt(s0, 3)}$ (ratio $${fmt(area(scaled) / s0, 3)}=k^2=${fmt(k * k, 3)}$).`,
      )}
      why={tt(
        R`Diện tích bằng nửa đáy nhân chiều cao, và cả hai đều nhân với $k$, nên diện tích nhân với $k\cdot k=k^2$. Cách nhìn khác cho cùng kết luận: $S=\frac{1}{2}bc\sin A$ với hai cạnh $b$, $c$ cùng nhân $k$ còn góc $A$ không đổi. Với khối trong không gian có ba chiều nên thể tích nhân với $k^3$.`,
        R`The area is half the base times the height, and both are multiplied by $k$, so the area is multiplied by $k\cdot k=k^2$. Another way to the same conclusion: $S=\frac{1}{2}bc\sin A$ with the two sides $b$, $c$ both multiplied by $k$ while the angle $A$ is unchanged. For solids there are three dimensions, so the volume is multiplied by $k^3$.`,
      )}
    >
      <Graph
        label={tt("Tam giác gốc và tam giác phóng to k lần", "The original triangle and its k-fold enlargement")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -0.5, 6.5, -0.5, 4.8, "", "", true);
          poly(ctx, map, scaled, colors.alt, colors.alt, 2.4);
          poly(ctx, map, base, colors.soft, null, 2);
          dot(ctx, map.x(0), map.y(0), colors.ink, colors.bg, 4);
          label(ctx, `k = ${fmt(k, 2)}`, map.x(5), map.y(4.3), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Hệ số k", "Factor k")} value={k} min={0.5} max={2} step={0.01} onChange={(v) => { setRunning(false); setPhase(Math.acos(1 - 2 * ((v - 0.5) / 1.5)) / (2 * Math.PI)); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

/* ---------- 3. Định lí cosin: góc C quay qua 90° thì c² − (a² + b²) đổi dấu ---------- */

export function CosineSweepAnim() {
  const tt = useTx();
  const { phase, setPhase, running, setRunning } = useLoop(50, 0.004);
  const a = 3;
  const b = 4;
  const C = (Math.PI / 180) * (20 + 140 * wave(phase));
  const c = cosineSide(a, b, C);
  const gap = c * c - (a * a + b * b);
  const kind = triangleKind(a, b, c);
  const Cp = { x: 0, y: 0 };
  const Bp = { x: a, y: 0 };
  const Ap = { x: b * Math.cos(C), y: b * Math.sin(C) };
  return (
    <Stage
      title={tt("Định lí cosin: quay góc $C$ qua $90^\\circ$ thì $c^2-(a^2+b^2)$ đổi dấu", "The law of cosines: turn the angle $C$ through $90^\\circ$ and $c^2-(a^2+b^2)$ changes sign")}
      story={tt(
        R`Hai cạnh $a=3$ và $b=4$ cùng xuất phát từ đỉnh $C$, góc $C$ giữa chúng quay từ $20^\circ$ tới $160^\circ$. Cạnh thứ ba $c$ dài ra khi góc mở rộng. Định lí cosin cho $c^2=a^2+b^2-2ab\cos C$: số hạng cuối dương khi $C$ nhọn nên $c^2$ nhỏ hơn $a^2+b^2$, và âm khi $C$ tù nên $c^2$ lớn hơn. Đúng lúc $C=90^\circ$ số hạng ấy bằng $0$ và ta được Pythagore với $c=5$.`,
        R`Two sides $a=3$ and $b=4$ start from the vertex $C$, and the angle $C$ between them turns from $20^\circ$ to $160^\circ$. The third side $c$ gets longer as the angle opens. The law of cosines gives $c^2=a^2+b^2-2ab\cos C$: the last term is positive when $C$ is acute so $c^2$ is smaller than $a^2+b^2$, and negative when $C$ is obtuse so $c^2$ is larger. Exactly at $C=90^\circ$ that term is $0$ and we get Pythagoras with $c=5$.`,
      )}
      read={tt(
        `$C=${fmt((C * 180) / Math.PI, 0)}^\\circ$: $c=${fmt(c, 3)}$, $c^2-(a^2+b^2)=${fmt(gap, 3)}=-2ab\\cos C$. Tam giác ${kind === "vuong" ? "gần vuông" : kind === "nhon" ? "có góc $C$ nhọn (tam giác nhọn)" : "có góc $C$ tù (tam giác tù)"}.`,
        `$C=${fmt((C * 180) / Math.PI, 0)}^\\circ$: $c=${fmt(c, 3)}$, $c^2-(a^2+b^2)=${fmt(gap, 3)}=-2ab\\cos C$. The triangle ${kind === "vuong" ? "is nearly right-angled" : kind === "nhon" ? "has an acute angle $C$ (an acute triangle)" : "has an obtuse angle $C$ (an obtuse triangle)"}.`,
      )}
      why={tt(
        R`Cách vectơ: đặt $\vec{u}=\overrightarrow{CB}$ và $\vec{v}=\overrightarrow{CA}$ thì $c^2=|\vec{v}-\vec{u}|^2=a^2+b^2-2\vec{u}\cdot\vec{v}$, với $\vec{u}\cdot\vec{v}=ab\cos C$. Dấu của tích vô hướng là dấu của $\cos C$: dương khi nhọn, $0$ khi vuông, âm khi tù. Vì thế so $c^2$ với $a^2+b^2$ cho biết góc đối diện nhọn, vuông hay tù, và Pythagore chỉ là trường hợp $\cos C=0$.`,
        R`The vector way: put $\vec{u}=\overrightarrow{CB}$ and $\vec{v}=\overrightarrow{CA}$, then $c^2=|\vec{v}-\vec{u}|^2=a^2+b^2-2\vec{u}\cdot\vec{v}$, with $\vec{u}\cdot\vec{v}=ab\cos C$. The sign of the dot product is the sign of $\cos C$: positive when acute, $0$ when right, negative when obtuse. So comparing $c^2$ with $a^2+b^2$ tells whether the opposite angle is acute, right or obtuse, and Pythagoras is just the case $\cos C=0$.`,
      )}
    >
      <Graph
        label={tt("Tam giác có hai cạnh 3 và 4 hợp góc C quay", "A triangle with sides 3 and 4 enclosing the turning angle C")}
        draw={(ctx, w, hh) => {
          const { colors, map } = frame(ctx, w, hh, -4.5, 4.5, -0.5, 4.5, "", "", true);
          poly(ctx, map, [Cp, Bp, Ap], kind === "vuong" ? colors.ink : colors.alt, colors.alt, 2.4);
          for (const [p, name] of [[Cp, "C"], [Bp, "B"], [Ap, "A"]] as const) {
            dot(ctx, map.x(p.x), map.y(p.y), colors.ink, colors.bg, 3.5);
            label(ctx, name, map.x(p.x) + 6, map.y(p.y) + (name === "A" ? -8 : 16), colors.ink);
          }
          label(ctx, `c = ${fmt(c, 2)}`, map.x(-4.2), map.y(4.1), colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Góc C (độ)", "Angle C (degrees)")} value={(C * 180) / Math.PI} min={20} max={160} step={1} onChange={(v) => { setRunning(false); setPhase(Math.acos(1 - 2 * ((v - 20) / 140)) / (2 * Math.PI)); }} />
      </div>
      <PlayButtons running={running} setRunning={setRunning} tt={tt} />
    </Stage>
  );
}

import { useMemo, useState } from "react";
import { diskVolume, latticeArea, sectorAreaNumeric, tetraRatioMC, triCenters } from "../../algo/index.ts";
import { dashed, dot, fitIso, strokeFn } from "../../labs/draw.ts";
import { Graph } from "../../labs/Graph.tsx";
import { fmt } from "../../lib/format.ts";
import { mulberry32 } from "../../lib/prng.ts";
import { Slider } from "../../ui/Slider.tsx";
import { frame, label, line, useTx } from "./kit.ts";
import { Stage } from "./widgets.tsx";

const R = String.raw;
type P2 = { x: number; y: number };

/* ---------- 1. Bốn tâm của tam giác và đường thẳng Euler ---------- */

type Show = "median" | "perp" | "bisector" | "altitude" | "all";

export function TriCentersLab() {
  const tt = useTx();
  const [bx, setBx] = useState(7);
  const [cx, setCx] = useState(2);
  const [cy, setCy] = useState(5);
  const [show, setShow] = useState<Show>("all");
  const A: P2 = { x: 0, y: 0 };
  const B: P2 = { x: bx, y: 0 };
  const C: P2 = { x: cx, y: cy };
  const T = triCenters(A, B, C);
  const GO = Math.hypot(T.G.x - T.O.x, T.G.y - T.O.y);
  const GH = Math.hypot(T.G.x - T.H.x, T.G.y - T.H.y);
  const mid = (P: P2, Q: P2): P2 => ({ x: (P.x + Q.x) / 2, y: (P.y + Q.y) / 2 });
  const foot = (P: P2, Q: P2, S: P2): P2 => { const dx = S.x - Q.x; const dy = S.y - Q.y; const t = ((P.x - Q.x) * dx + (P.y - Q.y) * dy) / (dx * dx + dy * dy); return { x: Q.x + t * dx, y: Q.y + t * dy }; };
  return (
    <Stage
      title={tt("Bốn tâm của tam giác nằm ở đâu, và vì sao ba đường đồng quy", "Where the four centres of a triangle are, and why three lines meet at a point")}
      story={tt(
        R`Mỗi tam giác có bốn điểm đặc biệt, mỗi điểm là nơi ba đường gặp nhau: trung tuyến gặp ở trọng tâm $G$ (điểm cân bằng), trung trực gặp ở tâm ngoại tiếp $O$ (cách đều ba đỉnh), phân giác gặp ở tâm nội tiếp $I$ (cách đều ba cạnh), đường cao gặp ở trực tâm $H$. Kéo đỉnh $C$ để xem chúng di chuyển. Máy tính cả bốn điểm bằng toạ độ, rồi kiểm tra: ba điểm $O$, $G$, $H$ luôn thẳng hàng (đường thẳng Euler) và $G$ chia $OH$ theo tỉ lệ $1:2$.`,
        R`Every triangle has four special points, each where three lines meet: the medians meet at the centroid $G$ (the balance point), the perpendicular bisectors at the circumcentre $O$ (equidistant from the three vertices), the angle bisectors at the incentre $I$ (equidistant from the three sides), the altitudes at the orthocentre $H$. Drag vertex $C$ to see them move. The machine computes all four from coordinates, then checks: $O$, $G$, $H$ are always collinear (the Euler line) and $G$ divides $OH$ in the ratio $1:2$.`,
      )}
      read={tt(
        `$G=(${fmt(T.G.x, 3)};${fmt(T.G.y, 3)})$, $O=(${fmt(T.O.x, 3)};${fmt(T.O.y, 3)})$, $I=(${fmt(T.I.x, 3)};${fmt(T.I.y, 3)})$, $H=(${fmt(T.H.x, 3)};${fmt(T.H.y, 3)})$. Bán kính ngoại tiếp $R=${fmt(T.R, 3)}$, nội tiếp $r=\\frac{2S}{a+b+c}=${fmt(T.r, 3)}$, diện tích $S=${fmt(T.area, 3)}$. Kiểm: $GH=${fmt(GH, 4)}$, $GO=${fmt(GO, 4)}$, $\\frac{GH}{GO}=${GO < 1e-9 ? "—" : fmt(GH / GO, 4)}$ (phải bằng 2); $H=3G-2O$: sai số $${fmt(Math.hypot(T.H.x - (3 * T.G.x - 2 * T.O.x), T.H.y - (3 * T.G.y - 2 * T.O.y)), 10)}$.`,
        `$G=(${fmt(T.G.x, 3)};${fmt(T.G.y, 3)})$, $O=(${fmt(T.O.x, 3)};${fmt(T.O.y, 3)})$, $I=(${fmt(T.I.x, 3)};${fmt(T.I.y, 3)})$, $H=(${fmt(T.H.x, 3)};${fmt(T.H.y, 3)})$. Circumradius $R=${fmt(T.R, 3)}$, inradius $r=\\frac{2S}{a+b+c}=${fmt(T.r, 3)}$, area $S=${fmt(T.area, 3)}$. Check: $GH=${fmt(GH, 4)}$, $GO=${fmt(GO, 4)}$, $\\frac{GH}{GO}=${GO < 1e-9 ? "—" : fmt(GH / GO, 4)}$ (must be 2); $H=3G-2O$: error $${fmt(Math.hypot(T.H.x - (3 * T.G.x - 2 * T.O.x), T.H.y - (3 * T.G.y - 2 * T.O.y)), 10)}$.`,
      )}
      why={tt(
        R`Trung trực: điểm trên trung trực của $AB$ cách đều $A$ và $B$. Giao của hai trung trực cách đều cả ba đỉnh nên nằm trên trung trực thứ ba. Phân giác: điểm trên phân giác cách đều hai cạnh, lập luận y hệt. Trọng tâm chia mỗi trung tuyến theo tỉ lệ $2:1$ từ đỉnh. Trực tâm là tâm ngoại tiếp của tam giác lớn tạo bởi ba đường kẻ qua đỉnh song song với cạnh đối diện, nên ba đường cao đồng quy.`,
        R`Perpendicular bisectors: a point on the bisector of $AB$ is equidistant from $A$ and $B$. The intersection of two bisectors is equidistant from all three vertices, so it lies on the third bisector. Angle bisectors: a point on a bisector is equidistant from two sides, same argument. The centroid divides each median in the ratio $2:1$ from the vertex. The orthocentre is the circumcentre of the larger triangle formed by lines through each vertex parallel to the opposite side, so the three altitudes meet.`,
      )}
    >
      <Graph
        label={tt("Tam giác ABC và bốn tâm", "Triangle ABC and its four centres")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -3, 11, -3, 9, "x", "y", true);
          ctx.beginPath();
          ctx.moveTo(map.x(A.x), map.y(A.y)); ctx.lineTo(map.x(B.x), map.y(B.y)); ctx.lineTo(map.x(C.x), map.y(C.y)); ctx.closePath();
          ctx.fillStyle = colors.curve; ctx.globalAlpha = 0.1; ctx.fill(); ctx.globalAlpha = 1;
          ctx.strokeStyle = colors.ink; ctx.lineWidth = 2.4; ctx.stroke();
          const pairs: [P2, P2, P2][] = [[A, B, C], [B, C, A], [C, A, B]];
          if (show === "median" || show === "all") for (const [V, P, Q] of pairs) { const m = mid(P, Q); line(ctx, map.x(V.x), map.y(V.y), map.x(m.x), map.y(m.y), colors.curve, 1.6); }
          if (show === "altitude" || show === "all") for (const [V, P, Q] of pairs) { const f = foot(V, P, Q); dashed(ctx, map.x(V.x), map.y(V.y), map.x(f.x), map.y(f.y), colors.alt); }
          if (show === "bisector" || show === "all") for (const [V] of pairs) line(ctx, map.x(V.x), map.y(V.y), map.x(T.I.x), map.y(T.I.y), colors.soft, 1.4);
          if (show === "perp" || show === "all") {
            for (const [P, Q] of [[A, B], [B, C], [C, A]] as [P2, P2][]) { const m = mid(P, Q); line(ctx, map.x(m.x), map.y(m.y), map.x(T.O.x), map.y(T.O.y), colors.soft, 1.2); }
            ctx.beginPath(); ctx.strokeStyle = colors.soft; ctx.lineWidth = 1.2; ctx.ellipse(map.x(T.O.x), map.y(T.O.y), map.x(T.R) - map.x(0), map.y(0) - map.y(T.R), 0, 0, Math.PI * 2); ctx.stroke();
          }
          if (show === "bisector" || show === "all") { ctx.beginPath(); ctx.strokeStyle = colors.curve; ctx.lineWidth = 1.2; ctx.ellipse(map.x(T.I.x), map.y(T.I.y), map.x(T.r) - map.x(0), map.y(0) - map.y(T.r), 0, 0, Math.PI * 2); ctx.stroke(); }
          if (show === "all") dashed(ctx, map.x(T.O.x), map.y(T.O.y), map.x(T.H.x), map.y(T.H.y), colors.ink);
          for (const [nm, P, col] of [["G", T.G, colors.curve], ["O", T.O, colors.soft], ["I", T.I, colors.curve], ["H", T.H, colors.alt]] as const) { dot(ctx, map.x(P.x), map.y(P.y), col, colors.bg, 6); label(ctx, nm, map.x(P.x) + 8, map.y(P.y) - 6, colors.ink); }
          for (const [nm, P] of [["A", A], ["B", B], ["C", C]] as const) { dot(ctx, map.x(P.x), map.y(P.y), colors.ink, colors.bg, 5); label(ctx, nm, map.x(P.x) - 14, map.y(P.y) + 16, colors.ink); }
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Đỉnh B: x", "Vertex B: x")} value={bx} min={3} max={10} step={0.5} onChange={setBx} />
        <Slider label={tt("Đỉnh C: x", "Vertex C: x")} value={cx} min={-2} max={10} step={0.5} onChange={setCx} />
        <Slider label={tt("Đỉnh C: y", "Vertex C: y")} value={cy} min={1} max={8} step={0.5} onChange={setCy} />
        <label className="fz-pick">{tt("Hiện các đường", "Show the lines")}
          <select value={show} onChange={(e) => setShow(e.target.value as Show)}>
            <option value="all">{tt("tất cả", "all")}</option>
            <option value="median">{tt("trung tuyến → G", "medians → G")}</option>
            <option value="perp">{tt("trung trực → O", "perpendicular bisectors → O")}</option>
            <option value="bisector">{tt("phân giác → I", "angle bisectors → I")}</option>
            <option value="altitude">{tt("đường cao → H", "altitudes → H")}</option>
          </select>
        </label>
      </div>
    </Stage>
  );
}

/* ---------- 2. Pythagore bằng cắt ghép ---------- */

export function PythagorasLab() {
  const tt = useTx();
  const [b, setB] = useState(3);
  const [c, setC] = useState(4);
  const s = b + c;
  const a = Math.hypot(b, c);
  const inner: P2[] = [{ x: b, y: 0 }, { x: s, y: b }, { x: c, y: s }, { x: 0, y: c }];
  const shoelace = (poly: P2[]) => Math.abs(poly.reduce((acc, p, i) => { const q = poly[(i + 1) % poly.length] as P2; return acc + (p.x * q.y - q.x * p.y); }, 0)) / 2;
  const innerArea = shoelace(inner);
  return (
    <Stage
      title={tt("Định lí Pythagore: bốn tam giác bằng nhau lấp đầy một hình vuông", "The Pythagorean theorem: four equal triangles fill a square")}
      story={tt(
        R`Lấy bốn tam giác vuông giống hệt nhau, hai cạnh góc vuông $b$ và $c$. Xếp chúng vào bốn góc của một hình vuông cạnh $b+c$: phần còn trống ở giữa là một hình vuông nghiêng, cạnh bằng cạnh huyền $a$. Diện tích cả hình vuông lớn tính theo hai cách phải bằng nhau: một lần tính từ cạnh $b+c$, một lần cộng bốn tam giác với hình vuông nghiêng. Từ đó $a^2=b^2+c^2$.`,
        R`Take four identical right triangles with legs $b$ and $c$. Place them in the four corners of a square of side $b+c$: the empty region in the middle is a tilted square whose side is the hypotenuse $a$. The area of the big square computed in two ways must agree: once from the side $b+c$, once by adding the four triangles to the tilted square. This gives $a^2=b^2+c^2$.`,
      )}
      read={tt(
        `Hình vuông lớn $(b+c)^2=${fmt(s * s, 4)}$. Bốn tam giác $4\\cdot\\frac{1}{2}bc=${fmt(2 * b * c, 4)}$. Hình vuông nghiêng (diện tích đo bằng toạ độ) $${fmt(innerArea, 4)}$. Cộng: $${fmt(2 * b * c + innerArea, 4)}$ = $(b+c)^2$. Cạnh huyền $a=\\sqrt{b^2+c^2}=${fmt(a, 4)}$ và $a^2=${fmt(a * a, 4)}=${fmt(b * b, 2)}+${fmt(c * c, 2)}$.`,
        `Big square $(b+c)^2=${fmt(s * s, 4)}$. Four triangles $4\\cdot\\frac{1}{2}bc=${fmt(2 * b * c, 4)}$. Tilted square (area measured from coordinates) $${fmt(innerArea, 4)}$. Sum: $${fmt(2 * b * c + innerArea, 4)}$ = $(b+c)^2$. Hypotenuse $a=\\sqrt{b^2+c^2}=${fmt(a, 4)}$ and $a^2=${fmt(a * a, 4)}=${fmt(b * b, 2)}+${fmt(c * c, 2)}$.`,
      )}
      why={tt(
        R`$(b+c)^2=4\cdot\frac{1}{2}bc+a^2$. Khai triển vế trái: $b^2+2bc+c^2=2bc+a^2$. Bỏ $2bc$ ở hai vế còn $a^2=b^2+c^2$. Hình vuông nghiêng thật sự là hình vuông vì ở mỗi đỉnh của nó, hai góc nhọn của hai tam giác cộng lại $90^\circ$ nên góc còn lại là $90^\circ$.`,
        R`$(b+c)^2=4\cdot\frac{1}{2}bc+a^2$. Expand the left side: $b^2+2bc+c^2=2bc+a^2$. Cancel $2bc$ on both sides and $a^2=b^2+c^2$ remains. The tilted figure really is a square because at each of its corners the two acute angles of the triangles add up to $90^\circ$, leaving $90^\circ$ for the remaining angle.`,
      )}
    >
      <Graph
        label={tt("Hình vuông cạnh b + c chứa bốn tam giác và một hình vuông nghiêng", "A square of side b + c holding four triangles and a tilted square")}
        draw={(ctx, w, h) => {
          const { colors } = frame(ctx, w, h, 0, 1, 0, 1);
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = colors.bg;
          ctx.fillRect(0, 0, w, h);
          const k = Math.min(w - 60, h - 40) / s;
          const ox = (w - s * k) / 2;
          const oy = h - 20;
          const X = (p: P2) => ({ x: ox + p.x * k, y: oy - p.y * k });
          const tri = (pts: P2[], col: string, al: number) => { ctx.beginPath(); pts.forEach((p, i) => { const q = X(p); if (i === 0) ctx.moveTo(q.x, q.y); else ctx.lineTo(q.x, q.y); }); ctx.closePath(); ctx.fillStyle = col; ctx.globalAlpha = al; ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = colors.ink; ctx.lineWidth = 1.6; ctx.stroke(); };
          tri([{ x: 0, y: 0 }, { x: b, y: 0 }, { x: 0, y: c }], colors.curve, 0.3);
          tri([{ x: s, y: 0 }, { x: s, y: b }, { x: b, y: 0 }], colors.curve, 0.3);
          tri([{ x: s, y: s }, { x: c, y: s }, { x: s, y: b }], colors.curve, 0.3);
          tri([{ x: 0, y: s }, { x: 0, y: c }, { x: c, y: s }], colors.curve, 0.3);
          tri(inner, colors.alt, 0.35);
          const mp = X({ x: s / 2, y: s / 2 });
          label(ctx, `a² = ${fmt(a * a, 1)}`, mp.x - 22, mp.y + 4, colors.ink);
          const lb = X({ x: b / 2, y: 0 });
          label(ctx, `b=${fmt(b)}`, lb.x - 10, lb.y + 16, colors.ink);
          const lc = X({ x: 0, y: c / 2 });
          label(ctx, `c=${fmt(c)}`, lc.x + 4, lc.y, colors.ink);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Cạnh góc vuông b", "Leg b")} value={b} min={1} max={8} step={0.5} onChange={setB} />
        <Slider label={tt("Cạnh góc vuông c", "Leg c")} value={c} min={1} max={8} step={0.5} onChange={setC} />
      </div>
    </Stage>
  );
}

/* ---------- 3. Đồng dạng: đếm ô vuông ---------- */

const BASE_TRI: P2[] = [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 1, y: 2 }];

export function SimilarityLab() {
  const tt = useTx();
  const [k, setK] = useState(2);
  const scaled = BASE_TRI.map((p) => ({ x: p.x * k, y: p.y * k }));
  const base = BASE_TRI;
  const a0 = useMemo(() => latticeArea(BASE_TRI, 0.1, 10), []);
  const a1 = useMemo(() => latticeArea(BASE_TRI.map((p) => ({ x: p.x * k, y: p.y * k })), 0.1, 10), [k]);
  const per = (poly: P2[]) => poly.reduce((acc, p, i) => { const q = poly[(i + 1) % poly.length] as P2; return acc + Math.hypot(q.x - p.x, q.y - p.y); }, 0);
  return (
    <Stage
      title={tt("Đồng dạng: độ dài nhân k, diện tích nhân k², thể tích nhân k³", "Similarity: lengths scale by k, areas by k², volumes by k³")}
      story={tt(
        R`Phóng to một hình lên $k$ lần theo mọi hướng. Mọi độ dài nhân $k$. Nhưng diện tích là việc đếm những ô vuông: hình vừa rộng ra $k$ lần vừa cao lên $k$ lần, nên số ô nhân $k\cdot k$. Máy đếm thật số ô vuông cạnh $0{,}1$ nằm trong tam giác gốc và trong tam giác phóng to, rồi chia cho nhau. Với khối thì thêm chiều thứ ba: $k\cdot k\cdot k$.`,
        R`Enlarge a shape by a factor $k$ in every direction. All lengths are multiplied by $k$. But area is counting little squares: the shape becomes $k$ times wider and $k$ times taller, so the number of squares is multiplied by $k\cdot k$. The machine really counts the $0.1$-sized squares inside the original and the enlarged triangle, and divides. For solids there is a third direction: $k\cdot k\cdot k$.`,
      )}
      read={tt(
        `$k=${fmt(k, 2)}$. Chu vi: $${fmt(per(base), 3)}\\to ${fmt(per(scaled), 3)}$, tỉ số $${fmt(per(scaled) / per(base), 4)}$ (= $k$). Đếm ô: ${a0.cells} ô $\\to$ ${a1.cells} ô, diện tích $${fmt(a0.area, 3)}\\to ${fmt(a1.area, 3)}$, tỉ số $${fmt(a1.area / a0.area, 4)}$ (≈ $k^2=${fmt(k * k, 4)}$). Thể tích khối đồng dạng: tỉ số $k^3=${fmt(k ** 3, 4)}$.`,
        `$k=${fmt(k, 2)}$. Perimeter: $${fmt(per(base), 3)}\\to ${fmt(per(scaled), 3)}$, ratio $${fmt(per(scaled) / per(base), 4)}$ (= $k$). Square count: ${a0.cells} squares $\\to$ ${a1.cells} squares, area $${fmt(a0.area, 3)}\\to ${fmt(a1.area, 3)}$, ratio $${fmt(a1.area / a0.area, 4)}$ (≈ $k^2=${fmt(k * k, 4)}$). For similar solids the volume ratio is $k^3=${fmt(k ** 3, 4)}$.`,
      )}
      why={tt(
        R`Diện tích tam giác là nửa đáy nhân chiều cao: cả đáy lẫn chiều cao nhân $k$ nên diện tích nhân $k^2$. Một tấm ảnh in to gấp đôi mỗi chiều tốn giấy gấp bốn; quả bóng to gấp đôi chứa lượng khí gấp tám. Đó là lý do con kiến nâng được vật nặng hơn thân nó nhiều lần còn con voi thì không: trọng lượng tăng như $k^3$ nhưng sức cơ chỉ tăng như $k^2$.`,
        R`A triangle's area is half the base times the height: both are multiplied by $k$, so the area is multiplied by $k^2$. A photo printed twice as large in each direction needs four times the paper; a ball twice as big holds eight times the air. This is why an ant can lift many times its own weight and an elephant cannot: weight grows like $k^3$ but muscle strength only like $k^2$.`,
      )}
    >
      <Graph
        label={tt("Tam giác gốc và tam giác phóng to trên lưới ô vuông", "The original triangle and its enlargement on a square grid")}
        draw={(ctx, w, h) => {
          const { colors, map } = frame(ctx, w, h, -0.5, 10, -0.5, 7, "x", "y", true);
          for (const [poly, col] of [[scaled, colors.alt], [base, colors.curve]] as const) {
            ctx.beginPath();
            poly.forEach((p, i) => (i === 0 ? ctx.moveTo(map.x(p.x), map.y(p.y)) : ctx.lineTo(map.x(p.x), map.y(p.y))));
            ctx.closePath();
            ctx.fillStyle = col; ctx.globalAlpha = 0.28; ctx.fill(); ctx.globalAlpha = 1;
            ctx.strokeStyle = col; ctx.lineWidth = 2.4; ctx.stroke();
          }
          label(ctx, tt(`gốc: ${a0.cells} ô`, `original: ${a0.cells} squares`), map.x(0.6), map.y(0.3), colors.curve);
          label(ctx, tt(`phóng ×${fmt(k, 1)}: ${a1.cells} ô`, `enlarged ×${fmt(k, 1)}: ${a1.cells} squares`), map.x(2.2 * k) - 20, map.y(0.7 * k) - 40, colors.alt);
        }}
      />
      <div className="fz-controls">
        <Slider label={tt("Hệ số phóng k", "Scale factor k")} value={k} min={0.5} max={3} step={0.25} onChange={setK} />
      </div>
    </Stage>
  );
}

/* ---------- 4. Archimedes: nón + cầu = trụ ---------- */

export function ArchimedesLab() {
  const tt = useTx();
  const [r, setR] = useState(2);
  const [y, setY] = useState(1.2);
  const cyl = () => Math.PI * r * r;
  const sph = (t: number) => Math.PI * Math.max(0, r * r - t * t);
  const con = (t: number) => Math.PI * t * t;
  const Vcyl = diskVolume(() => r, -r, r, 4000);
  const Vsph = diskVolume((t) => Math.sqrt(Math.max(0, r * r - t * t)), -r, r, 4000);
  const Vcone = diskVolume((t) => Math.abs(t), -r, r, 4000);
  return (
    <Stage
      title={tt("Archimedes: quả cầu cộng hai hình nón bằng hình trụ", "Archimedes: a sphere plus two cones equals a cylinder")}
      story={tt(
        R`Một hình trụ bán kính $r$, cao $2r$ ôm khít quả cầu. Bên trong trụ, hai hình nón chung đỉnh tại tâm, mỗi nón có đáy ở một mặt của trụ. Cắt cả ba khối bằng một mặt phẳng ngang ở độ cao $y$ so với tâm: lát cắt trụ có diện tích $\pi r^2$, lát cắt cầu $\pi(r^2-y^2)$, lát cắt nón $\pi y^2$. Ở mọi độ cao, lát cầu cộng lát nón đúng bằng lát trụ. Cộng mọi lát, thể tích cũng vậy.`,
        R`A cylinder of radius $r$ and height $2r$ fits snugly around a sphere. Inside the cylinder, two cones share their apex at the centre, each with its base on one face of the cylinder. Slice all three solids with a horizontal plane at height $y$ from the centre: the cylinder slice has area $\pi r^2$, the sphere slice $\pi(r^2-y^2)$, the cone slice $\pi y^2$. At every height, sphere slice plus cone slice equals the cylinder slice. Adding up all the slices, the volumes follow.`,
      )}
      read={tt(
        `Ở độ cao $y=${fmt(y, 2)}$: trụ $${fmt(cyl(), 4)}$, cầu $${fmt(sph(y), 4)}$, nón $${fmt(con(y), 4)}$; cầu + nón $=${fmt(sph(y) + con(y), 4)}$ = trụ. Cộng các đĩa mỏng: trụ $${fmt(Vcyl, 4)}$ ($2\\pi r^3=${fmt(2 * Math.PI * r ** 3, 4)}$), cầu $${fmt(Vsph, 4)}$ ($\\frac{4}{3}\\pi r^3=${fmt((4 / 3) * Math.PI * r ** 3, 4)}$), hai nón $${fmt(Vcone, 4)}$ ($\\frac{2}{3}\\pi r^3=${fmt((2 / 3) * Math.PI * r ** 3, 4)}$). Tỉ lệ cầu : nón : trụ $=${fmt(Vsph / Vcone, 3)} : 1 : ${fmt(Vcyl / Vcone, 3)}$, tức $2:1:3$.`,
        `At height $y=${fmt(y, 2)}$: cylinder $${fmt(cyl(), 4)}$, sphere $${fmt(sph(y), 4)}$, cone $${fmt(con(y), 4)}$; sphere + cone $=${fmt(sph(y) + con(y), 4)}$ = cylinder. Adding the thin discs: cylinder $${fmt(Vcyl, 4)}$ ($2\\pi r^3=${fmt(2 * Math.PI * r ** 3, 4)}$), sphere $${fmt(Vsph, 4)}$ ($\\frac{4}{3}\\pi r^3=${fmt((4 / 3) * Math.PI * r ** 3, 4)}$), two cones $${fmt(Vcone, 4)}$ ($\\frac{2}{3}\\pi r^3=${fmt((2 / 3) * Math.PI * r ** 3, 4)}$). Ratio sphere : cones : cylinder $=${fmt(Vsph / Vcone, 3)} : 1 : ${fmt(Vcyl / Vcone, 3)}$, i.e. $2:1:3$.`,
      )}
      why={tt(
        R`Với tam giác vuông cân bên trong nón, bán kính lát nón ở độ cao $y$ bằng $y$. Còn bán kính lát cầu là $\sqrt{r^2-y^2}$ theo Pythagore. Vậy $\pi y^2+\pi(r^2-y^2)=\pi r^2$ với mọi $y$. Thể tích trụ là $2\pi r^3$, hai nón là $2\cdot\frac{1}{3}\pi r^3$, nên cầu là $2\pi r^3-\frac{2}{3}\pi r^3=\frac{4}{3}\pi r^3$. Archimedes thích kết quả này đến mức yêu cầu khắc hình cầu nội tiếp trụ lên mộ mình.`,
        R`In the right isosceles triangle inside the cone, the radius of the cone slice at height $y$ equals $y$. The sphere slice has radius $\sqrt{r^2-y^2}$ by Pythagoras. So $\pi y^2+\pi(r^2-y^2)=\pi r^2$ for every $y$. The cylinder has volume $2\pi r^3$, the two cones $2\cdot\frac{1}{3}\pi r^3$, hence the sphere is $2\pi r^3-\frac{2}{3}\pi r^3=\frac{4}{3}\pi r^3$. Archimedes liked this result so much that he asked for a sphere inscribed in a cylinder to be carved on his tomb.`,
      )}
    >
      <div className="fz-pair">
        <Graph
          label={tt("Hình cắt dọc: trụ, cầu và hai nón", "Vertical section: cylinder, sphere and two cones")}
          draw={(ctx, w, h) => {
            const { colors, map } = frame(ctx, w, h, -3, 3, -3, 3, "x", "y", true);
            ctx.strokeStyle = colors.ink; ctx.lineWidth = 2;
            ctx.strokeRect(map.x(-r), map.y(r), map.x(r) - map.x(-r), map.y(-r) - map.y(r));
            ctx.beginPath(); ctx.ellipse(map.x(0), map.y(0), map.x(r) - map.x(0), map.y(0) - map.y(r), 0, 0, Math.PI * 2); ctx.strokeStyle = colors.curve; ctx.stroke();
            ctx.beginPath(); ctx.moveTo(map.x(0), map.y(0)); ctx.lineTo(map.x(-r), map.y(r)); ctx.lineTo(map.x(r), map.y(r)); ctx.closePath();
            ctx.moveTo(map.x(0), map.y(0)); ctx.lineTo(map.x(-r), map.y(-r)); ctx.lineTo(map.x(r), map.y(-r)); ctx.closePath();
            ctx.fillStyle = colors.alt; ctx.globalAlpha = 0.22; ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = colors.alt; ctx.stroke();
            line(ctx, map.x(-r), map.y(y), map.x(r), map.y(y), colors.ink, 1.4);
            const rs = Math.sqrt(Math.max(0, r * r - y * y));
            line(ctx, map.x(-rs), map.y(y), map.x(rs), map.y(y), colors.curve, 5);
            line(ctx, map.x(-y), map.y(y), map.x(y), map.y(y), colors.alt, 3);
          }}
        />
        <Graph
          label={tt("Diện tích lát cắt theo độ cao", "Slice area against height")}
          draw={(ctx, w, h) => {
            const { colors, map, pad } = frame(ctx, w, h, -r, r, 0, Math.PI * r * r * 1.15, "y", "");
            strokeFn(ctx, map, w, h, pad, -r, r, () => cyl(), colors.ink, 2);
            strokeFn(ctx, map, w, h, pad, -r, r, sph, colors.curve, 2.4);
            strokeFn(ctx, map, w, h, pad, -r, r, con, colors.alt, 2.4);
            dashed(ctx, map.x(y), map.y(0), map.x(y), map.y(Math.PI * r * r * 1.15), colors.soft);
            label(ctx, tt("trụ", "cylinder"), map.x(-r) + 6, map.y(cyl()) - 6, colors.ink);
            label(ctx, tt("cầu", "sphere"), map.x(-r * 0.2), map.y(sph(0)) - 6, colors.curve);
            label(ctx, tt("nón", "cone"), map.x(r * 0.7), map.y(con(r * 0.7)) - 6, colors.alt);
          }}
        />
      </div>
      <div className="fz-controls">
        <Slider label={tt("Bán kính r", "Radius r")} value={r} min={1} max={2.8} step={0.1} onChange={(v) => { setR(v); setY(Math.min(y, v)); }} />
        <Slider label={tt("Độ cao lát cắt y", "Slice height y")} value={Math.min(y, r)} min={0} max={r} step={0.05} onChange={setY} />
      </div>
    </Stage>
  );
}

/* ---------- 5. Hình quạt và hình nón ---------- */

export function SectorConeLab() {
  const tt = useTx();
  const [rr, setRr] = useState(2);
  const [l, setL] = useState(4);
  const ll = Math.max(l, rr + 0.25);
  const alpha = (2 * Math.PI * rr) / ll;
  const sector = sectorAreaNumeric(ll, alpha);
  const hh = Math.sqrt(ll * ll - rr * rr);
  const Vcone = diskVolume((t) => (rr * t) / hh, 0, hh, 4000);
  return (
    <Stage
      title={tt("Trải hình nón ra: hình quạt giải thích công thức diện tích", "Unrolling a cone: a sector explains the area formula")}
      story={tt(
        R`Cắt vỏ một chiếc mũ nón dọc theo đường sinh rồi trải phẳng: được một hình quạt. Bán kính hình quạt là đường sinh $l$. Cung của hình quạt vừa vặn quanh miệng mũ nên dài bằng chu vi đáy $2\pi r$. Một hình quạt có cung dài $s$ và bán kính $l$ có diện tích $\frac{1}{2}ls$ (xếp thành rất nhiều tam giác mỏng chiều cao $l$). Vậy diện tích xung quanh là $\frac{1}{2}\cdot l\cdot 2\pi r=\pi rl$.`,
        R`Cut the surface of a conical hat along a slant line and flatten it: you get a sector. Its radius is the slant height $l$. Its arc fits exactly around the rim, so its length is the base circumference $2\pi r$. A sector with arc length $s$ and radius $l$ has area $\frac{1}{2}ls$ (think of many thin triangles of height $l$). Hence the lateral area is $\frac{1}{2}\cdot l\cdot 2\pi r=\pi rl$.`,
      )}
      read={tt(
        `Đáy $r=${fmt(rr)}$, đường sinh $l=${fmt(ll)}$: góc ở tâm hình quạt $\\alpha=\\frac{2\\pi r}{l}=${fmt(alpha, 4)}$ rad ($${fmt((alpha * 180) / Math.PI, 1)}^\\circ$). Máy cộng các tam giác mỏng được diện tích hình quạt $${fmt(sector, 4)}$; công thức $\\pi rl=${fmt(Math.PI * rr * ll, 4)}$. Chiều cao nón $h=\\sqrt{l^2-r^2}=${fmt(hh, 3)}$; xếp đĩa mỏng cho thể tích $${fmt(Vcone, 4)}$, công thức $\\frac{1}{3}\\pi r^2h=${fmt((Math.PI * rr * rr * hh) / 3, 4)}$.`,
        `Base $r=${fmt(rr)}$, slant height $l=${fmt(ll)}$: the sector's central angle is $\\alpha=\\frac{2\\pi r}{l}=${fmt(alpha, 4)}$ rad ($${fmt((alpha * 180) / Math.PI, 1)}^\\circ$). Adding thin triangles the machine gets the sector area $${fmt(sector, 4)}$; the formula $\\pi rl=${fmt(Math.PI * rr * ll, 4)}$. Cone height $h=\\sqrt{l^2-r^2}=${fmt(hh, 3)}$; stacking thin discs gives volume $${fmt(Vcone, 4)}$, the formula $\\frac{1}{3}\\pi r^2h=${fmt((Math.PI * rr * rr * hh) / 3, 4)}$.`,
      )}
      why={tt(
        R`Cung tròn bán kính $l$ góc $\alpha$ dài $l\alpha$, và hình quạt chiếm tỉ lệ $\frac{\alpha}{2\pi}$ của hình tròn nên có diện tích $\pi l^2\cdot\frac{\alpha}{2\pi}=\frac{1}{2}l^2\alpha$. Với $l\alpha=2\pi r$ thì diện tích là $\frac{1}{2}l\cdot 2\pi r=\pi rl$. Thể tích nón là tổng các đĩa có bán kính tăng đều từ 0 đến $r$, bằng một phần ba trụ cùng đáy và cao.`,
        R`An arc of radius $l$ and angle $\alpha$ has length $l\alpha$, and the sector is the fraction $\frac{\alpha}{2\pi}$ of a full disc, so its area is $\pi l^2\cdot\frac{\alpha}{2\pi}=\frac{1}{2}l^2\alpha$. With $l\alpha=2\pi r$ the area is $\frac{1}{2}l\cdot 2\pi r=\pi rl$. The volume of the cone is the sum of discs whose radius grows steadily from 0 to $r$, which is one third of the cylinder with the same base and height.`,
      )}
    >
      <div className="fz-pair">
        <Graph
          label={tt("Hình quạt khi trải vỏ nón", "The sector from the unrolled cone")}
          draw={(ctx, w, h) => {
            const { colors, map } = frame(ctx, w, h, -5, 5, -5, 5, "x", "y", true);
            ctx.beginPath();
            ctx.moveTo(map.x(0), map.y(0));
            const a0 = Math.PI / 2 - alpha / 2;
            ctx.arc(map.x(0), map.y(0), map.x(ll) - map.x(0), -(a0 + alpha), -a0);
            ctx.closePath();
            ctx.fillStyle = colors.curve; ctx.globalAlpha = 0.3; ctx.fill(); ctx.globalAlpha = 1;
            ctx.strokeStyle = colors.ink; ctx.lineWidth = 2; ctx.stroke();
            label(ctx, `l = ${fmt(ll, 2)}`, map.x(0.2), map.y(ll / 2), colors.ink);
            label(ctx, tt(`cung = 2πr = ${fmt(2 * Math.PI * rr, 2)}`, `arc = 2πr = ${fmt(2 * Math.PI * rr, 2)}`), map.x(-1.6), map.y(ll) - 10, colors.alt);
          }}
        />
        <Graph
          label={tt("Hình nón nhìn từ cạnh", "The cone seen from the side")}
          draw={(ctx, w, h) => {
            const { colors, map } = frame(ctx, w, h, -5, 5, -1, 6, "x", "y", true);
            ctx.beginPath();
            ctx.moveTo(map.x(0), map.y(hh)); ctx.lineTo(map.x(-rr), map.y(0)); ctx.lineTo(map.x(rr), map.y(0)); ctx.closePath();
            ctx.fillStyle = colors.alt; ctx.globalAlpha = 0.25; ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = colors.ink; ctx.lineWidth = 2; ctx.stroke();
            dashed(ctx, map.x(0), map.y(0), map.x(0), map.y(hh), colors.soft);
            label(ctx, `h = ${fmt(hh, 2)}`, map.x(0.15), map.y(hh / 2), colors.soft);
            label(ctx, `r = ${fmt(rr, 2)}`, map.x(rr / 2) - 10, map.y(0) + 16, colors.ink);
            label(ctx, `l = ${fmt(ll, 2)}`, map.x(rr / 2) + 8, map.y(hh / 2) - 6, colors.alt);
          }}
        />
      </div>
      <div className="fz-controls">
        <Slider label={tt("Bán kính đáy r", "Base radius r")} value={rr} min={0.5} max={3.5} step={0.25} onChange={setRr} />
        <Slider label={tt("Đường sinh l", "Slant height l")} value={l} min={1} max={4.8} step={0.1} onChange={setL} />
      </div>
    </Stage>
  );
}

/* ---------- 6. Tỉ số thể tích chóp: lấy mẫu trong khối ---------- */

export function TetraRatioLab() {
  const tt = useTx();
  const [ra, setRa] = useState(0.5);
  const [rb, setRb] = useState(0.6);
  const [rc, setRc] = useState(0.8);
  const [exp, setExp] = useState(4.5);
  const n = Math.round(10 ** exp);
  const res = useMemo(() => tetraRatioMC(ra, rb, rc, n, mulberry32(Math.round(ra * 10 + rb * 100 + rc * 1000))), [ra, rb, rc, n]);
  const S: [number, number, number] = [0, 0, 4];
  const Av: [number, number, number] = [4, 0, 0];
  const Bv: [number, number, number] = [0, 4, 0];
  const Cv: [number, number, number] = [-2.2, -2.2, 0];
  const on = (V: [number, number, number], r: number): [number, number, number] => [S[0] + r * (V[0] - S[0]), S[1] + r * (V[1] - S[1]), S[2] + r * (V[2] - S[2])];
  const A2 = on(Av, ra);
  const B2 = on(Bv, rb);
  const C2 = on(Cv, rc);
  return (
    <Stage
      title={tt("Tỉ số thể tích hai khối chóp: ném điểm vào khối rồi đếm", "Volume ratio of two pyramids: throw points into the solid and count")}
      story={tt(
        R`Cho chóp tam giác $S.ABC$ và ba điểm $A',B',C'$ trên các cạnh $SA,SB,SC$. Chóp nhỏ $S.A'B'C'$ chiếm bao nhiêu phần của chóp lớn? Máy ném hàng chục nghìn điểm ngẫu nhiên đều trong chóp lớn rồi đếm phần rơi vào chóp nhỏ. Không có công thức nào được dùng, vậy mà tỉ lệ đo được trùng với tích ba tỉ số $\frac{SA'}{SA}\cdot\frac{SB'}{SB}\cdot\frac{SC'}{SC}$.`,
        R`Take a triangular pyramid $S.ABC$ and points $A',B',C'$ on the edges $SA,SB,SC$. What fraction of the big pyramid does the small pyramid $S.A'B'C'$ occupy? The machine throws tens of thousands of random points uniformly into the big pyramid and counts the share landing in the small one. No formula is used, yet the measured share matches the product of three ratios $\frac{SA'}{SA}\cdot\frac{SB'}{SB}\cdot\frac{SC'}{SC}$.`,
      )}
      read={tt(
        `Ném ${n} điểm, ${res.inside} điểm rơi vào chóp nhỏ: tỉ lệ đo được $${fmt(res.fraction, 4)}$. Công thức $${fmt(ra)}\\times${fmt(rb)}\\times${fmt(rc)}=${fmt(ra * rb * rc, 4)}$. Lệch $${fmt(Math.abs(res.fraction - ra * rb * rc), 4)}$.`,
        `Threw ${n} points, ${res.inside} landed in the small pyramid: measured share $${fmt(res.fraction, 4)}$. The formula $${fmt(ra)}\\times${fmt(rb)}\\times${fmt(rc)}=${fmt(ra * rb * rc, 4)}$. Difference $${fmt(Math.abs(res.fraction - ra * rb * rc), 4)}$.`,
      )}
      why={tt(
        R`Hai chóp có chung đỉnh $S$ nên cùng nằm trong «góc khối» ba cạnh. Thu cạnh $SA$ xuống $r_a$ lần làm thể tích nhân $r_a$ (chóp co theo một phương), tương tự với hai cạnh kia. Ba phép co độc lập nhân lại: $r_ar_br_c$. Công thức chỉ đúng cho chóp tam giác chung đỉnh; chóp có đáy nhiều cạnh phải chia thành các chóp tam giác trước.`,
        R`Both pyramids share the apex $S$, so they lie in the same three-edged «solid angle». Shrinking the edge $SA$ by the factor $r_a$ multiplies the volume by $r_a$ (the pyramid contracts in one direction), and likewise for the other two edges. Three independent contractions multiply: $r_ar_br_c$. The rule holds for triangular pyramids with a common apex; a pyramid with a polygonal base must first be split into triangular ones.`,
      )}
    >
      <Graph
        label={tt("Chóp S.ABC và chóp con S.A'B'C'", "Pyramid S.ABC and the small pyramid S.A'B'C'")}
        draw={(ctx, w, h) => {
          const { colors } = frame(ctx, w, h, 0, 1, 0, 1);
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = colors.bg;
          ctx.fillRect(0, 0, w, h);
          const m = fitIso([S, Av, Bv, Cv], w, h, 36);
          const P = (v: [number, number, number]) => m(v[0], v[1], v[2]);
          const edges = (pts: [number, number, number][], col: string, lw: number) => {
            const [s0, a, b, c] = pts as [[number, number, number], [number, number, number], [number, number, number], [number, number, number]];
            for (const [p, q] of [[s0, a], [s0, b], [s0, c], [a, b], [b, c], [c, a]] as const) { const u = P(p); const v = P(q); line(ctx, u.x, u.y, v.x, v.y, col, lw); }
          };
          edges([S, Av, Bv, Cv], colors.ink, 1.8);
          const sa = P(A2); const sb = P(B2); const sc = P(C2); const ss = P(S);
          ctx.beginPath(); ctx.moveTo(ss.x, ss.y); ctx.lineTo(sa.x, sa.y); ctx.lineTo(sb.x, sb.y); ctx.closePath();
          ctx.moveTo(ss.x, ss.y); ctx.lineTo(sb.x, sb.y); ctx.lineTo(sc.x, sc.y); ctx.closePath();
          ctx.moveTo(ss.x, ss.y); ctx.lineTo(sc.x, sc.y); ctx.lineTo(sa.x, sa.y); ctx.closePath();
          ctx.fillStyle = colors.alt; ctx.globalAlpha = 0.2; ctx.fill(); ctx.globalAlpha = 1;
          edges([S, A2, B2, C2], colors.alt, 2.6);
          for (const [nm, v, col] of [["S", ss, colors.ink], ["A", P(Av), colors.ink], ["B", P(Bv), colors.ink], ["C", P(Cv), colors.ink], ["A'", sa, colors.alt], ["B'", sb, colors.alt], ["C'", sc, colors.alt]] as const) { dot(ctx, v.x, v.y, col, colors.bg, 4); label(ctx, nm, v.x + 7, v.y - 6, col); }
        }}
      />
      <div className="fz-controls">
        <Slider label="SA'/SA" value={ra} min={0.1} max={1} step={0.05} onChange={setRa} />
        <Slider label="SB'/SB" value={rb} min={0.1} max={1} step={0.05} onChange={setRb} />
        <Slider label="SC'/SC" value={rc} min={0.1} max={1} step={0.05} onChange={setRc} />
        <Slider label={tt("Số điểm ném (10 mũ)", "Number of points (power of 10)")} value={exp} min={2} max={5.5} step={0.5} onChange={setExp} />
      </div>
    </Stage>
  );
}


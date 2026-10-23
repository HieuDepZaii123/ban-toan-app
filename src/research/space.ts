import { mulberry32 } from "../lib/prng.ts";
import {
  bayes,
  comb,
  lineDist,
  meanOf,
  medianOf,
  tetraVolume,
  vec3Cross,
  vec3Dot,
  vec3Len,
} from "../lib/math.ts";
import { num } from "./num.ts";
import type { Study } from "./types.ts";

const R = String.raw;
const CONE_R = 6;

function faceRate(seed: number, rolls: number, face: number): number {
  const rng = mulberry32(seed >>> 0);
  const target = Math.round(face);
  let hits = 0;
  for (let i = 0; i < rolls; i += 1) {
    if (1 + Math.floor(rng() * 6) === target) hits += 1;
  }
  return hits / rolls;
}

function tetTriple(edge: number): number {
  const vy = (edge * Math.sqrt(3)) / 2;
  const wz = (edge * Math.sqrt(6)) / 3;
  return Math.abs(edge * vy * wz) / 6;
}

function crossLen(ux: number, uy: number, uz: number, vx: number, vy: number, vz: number): number {
  const x = uy * vz - uz * vy;
  const y = uz * vx - ux * vz;
  const z = ux * vy - uy * vx;
  return Math.hypot(x, y, z);
}

export const spaceStudies: Study[] = [
  {
    id: "vec-r-dot",
    topic: "vector",
    title: "Khi nào vuông góc",
    titleEn: "When two vectors are perpendicular",
    question: R`$\vec u=(2;u_y;0)$, $\vec v=(1;-1;0)$. Kéo $u_y$. Hai vectơ vuông góc khi $u_y$ bằng bao nhiêu?`,
    questionEn: R`$\vec u=(2,u_y,0)$, $\vec v=(1,-1,0)$. Drag $u_y$. For which $u_y$ are the vectors perpendicular?`,
    hint: R`Kéo $u_y$. Ghi tích vô hướng. Chỗ tích bằng $0$ là vuông góc.`,
    hintEn: R`Drag $u_y$. Record the dot product. It is perpendicular where the product is $0$.`,
    block: R`Chưa đọc được tọa độ.`,
    blockEn: R`Could not read the coordinates.`,
    preset: { scene: 0, ux: 2, uy: 0, uz: 0, vx: 1, vy: -1, vz: 0 },
    guesses: [
      { id: "two", vi: R`Vuông góc khi tích vô hướng bằng $0$, tức $u_y=2$.`, en: R`Perpendicular when the dot product is $0$, that is $u_y=2$.` },
      { id: "zero", vi: R`Vuông góc khi $u_y=0$.`, en: R`Perpendicular when $u_y=0$.` },
      { id: "len", vi: R`Vuông góc khi hai độ dài bằng nhau.`, en: R`Perpendicular when the two lengths are equal.` },
    ],
    answerId: "two",
    columns: [
      { key: "uy", vi: R`$u_y$`, en: R`$u_y$` },
      { key: "dot", vi: R`$\vec u\cdot\vec v$`, en: R`$\vec u\cdot\vec v$` },
    ],
    plotX: "uy",
    plotY: "dot",
    measure: (params) => {
      const ux = num(params, "ux", 2);
      const uy = num(params, "uy");
      const uz = num(params, "uz");
      const vx = num(params, "vx", 1);
      const vy = num(params, "vy", -1);
      const vz = num(params, "vz");
      return { uy, dot: ux * vx + uy * vy + uz * vz };
    },
    formula: (uy, params) => vec3Dot(
      [num(params, "ux", 2), uy, num(params, "uz")],
      [num(params, "vx", 1), num(params, "vy", -1), num(params, "vz")],
    ),
    tol: 1e-12,
    samples: [{ uy: -4 }, { uy: -2 }, { uy: 0 }, { uy: 2 }, { uy: 4 }],
    result: R`$\vec u\cdot\vec v=2\cdot 1+u_y\cdot(-1)=2-u_y$. Bằng $0$ khi $u_y=2$. Vuông góc là tích vô hướng bằng $0$, không phải hai độ dài bằng nhau.`,
    resultEn: R`$\vec u\cdot\vec v=2\cdot 1+u_y\cdot(-1)=2-u_y$. This is $0$ when $u_y=2$. Perpendicular means the dot product is $0$, not that the lengths match.`,
    follow: R`Nếu $\vec v=(1;0;0)$, phương trình vuông góc còn chứa $u_y$ không?`,
    followEn: R`If $\vec v=(1,0,0)$, does the perpendicular condition still involve $u_y$?`,
  },
  {
    id: "vec-r-cross",
    topic: "vector",
    title: "Độ dài tích có hướng",
    titleEn: "Length of the cross product",
    question: R`$\vec u=(3;0;0)$, kéo $v_y$ của $\vec v=(0;v_y;0)$. $|\vec u\times\vec v|$ và hệ thức với tích vô hướng là gì?`,
    questionEn: R`$\vec u=(3,0,0)$, and drag $v_y$ in $\vec v=(0,v_y,0)$. What is $|\vec u\times\vec v|$, and how does it sit with the dot product?`,
    hint: R`Kéo $v_y$, cả số âm. Ghi độ dài tích có hướng.`,
    hintEn: R`Drag $v_y$, including negative values. Record the length of the cross product.`,
    block: R`Chưa đọc được tọa độ.`,
    blockEn: R`Could not read the coordinates.`,
    preset: { scene: 0, ux: 3, uy: 0, uz: 0, vx: 0, vy: 2, vz: 0 },
    guesses: [
      { id: "abs", vi: R`$|\vec u\times\vec v|=3|v_y|$, và $|\vec u\times\vec v|^2+(\vec u\cdot\vec v)^2=|\vec u|^2|\vec v|^2$.`, en: R`$|\vec u\times\vec v|=3|v_y|$, and $|\vec u\times\vec v|^2+(\vec u\cdot\vec v)^2=|\vec u|^2|\vec v|^2$.` },
      { id: "dot", vi: R`$|\vec u\times\vec v|$ bằng tích vô hướng.`, en: R`$|\vec u\times\vec v|$ equals the dot product.` },
      { id: "sum", vi: R`$|\vec u\times\vec v|=3+v_y$.`, en: R`$|\vec u\times\vec v|=3+v_y$.` },
    ],
    answerId: "abs",
    columns: [
      { key: "vy", vi: R`$v_y$`, en: R`$v_y$` },
      { key: "area", vi: R`$|\vec u\times\vec v|$`, en: R`$|\vec u\times\vec v|$` },
      { key: "gap", vi: R`độ hở`, en: R`gap` },
    ],
    plotX: "vy",
    plotY: "area",
    measure: (params) => {
      const u: [number, number, number] = [num(params, "ux", 3), num(params, "uy"), num(params, "uz")];
      const v: [number, number, number] = [num(params, "vx"), num(params, "vy"), num(params, "vz")];
      const area = vec3Len(vec3Cross(u, v));
      const dot = vec3Dot(u, v);
      const gap = area * area + dot * dot - vec3Len(u) ** 2 * vec3Len(v) ** 2;
      return { vy: v[1], area, gap };
    },
    formula: (vy, params) => crossLen(
      num(params, "ux", 3),
      num(params, "uy"),
      num(params, "uz"),
      num(params, "vx"),
      vy,
      num(params, "vz"),
    ),
    tol: 1e-9,
    samples: [{ vy: -4 }, { vy: -2 }, { vy: -1 }, { vy: 1 }, { vy: 2 }, { vy: 4 }],
    result: R`$\vec u\times\vec v=(0;0;3v_y)$ nên $|\vec u\times\vec v|=3|v_y|$. Với mọi cặp vectơ, $|\vec u\times\vec v|^2+(\vec u\cdot\vec v)^2=|\vec u|^2|\vec v|^2$. Cột độ hở vì thế bằng $0$.`,
    resultEn: R`$\vec u\times\vec v=(0,0,3v_y)$, so $|\vec u\times\vec v|=3|v_y|$. For every pair, $|\vec u\times\vec v|^2+(\vec u\cdot\vec v)^2=|\vec u|^2|\vec v|^2$. The gap column is therefore $0$.`,
    follow: R`Khi nào $|\vec u\times\vec v|=|\vec u||\vec v|$?`,
    followEn: R`When is $|\vec u\times\vec v|=|\vec u||\vec v|$?`,
  },
  {
    id: "ana-r-dist",
    topic: "analytic",
    title: "Khoảng cách tới đường thẳng",
    titleEn: "Distance to a line",
    question: R`Đường $x+y+c=0$ và điểm $M(3;1)$. Kéo $c$. Khoảng cách từ $M$ tới đường bằng gì, và bằng $0$ khi nào?`,
    questionEn: R`The line $x+y+c=0$ and the point $M(3,1)$. Drag $c$. What is the distance from $M$ to the line, and when is it $0$?`,
    hint: R`Giữ điểm $M$. Chỉ kéo $c$. Ghi khoảng cách.`,
    hintEn: R`Leave the point $M$ fixed. Drag only $c$. Record the distance.`,
    block: R`Pháp tuyến $(a;b)$ không được là vectơ không.`,
    blockEn: R`The normal $(a,b)$ must not be the zero vector.`,
    preset: { scene: 0, a: 1, b: 1, c: -2, px: 3, py: 1 },
    guesses: [
      { id: "abs", vi: R`$d=\dfrac{|4+c|}{\sqrt{2}}$, bằng $0$ khi $c=-4$.`, en: R`$d=\dfrac{|4+c|}{\sqrt{2}}$, equal to $0$ when $c=-4$.` },
      { id: "plain", vi: R`$d=|4+c|$, không chia cho $\sqrt{2}$.`, en: R`$d=|4+c|$, with no division by $\sqrt{2}$.` },
      { id: "never", vi: R`Khoảng cách không bao giờ bằng $0$.`, en: R`The distance is never $0$.` },
    ],
    answerId: "abs",
    columns: [
      { key: "c", vi: R`$c$`, en: R`$c$` },
      { key: "dist", vi: R`$d$`, en: R`$d$` },
    ],
    plotX: "c",
    plotY: "dist",
    measure: (params) => {
      const a = num(params, "a", 1);
      const b = num(params, "b", 1);
      const c = num(params, "c");
      const x = num(params, "px", 3);
      const y = num(params, "py", 1);
      const dist = lineDist(a, b, c, x, y);
      if (!Number.isFinite(dist)) return null;
      return { c, dist };
    },
    formula: (c, params) => {
      const a = num(params, "a", 1);
      const b = num(params, "b", 1);
      const x = num(params, "px", 3);
      const y = num(params, "py", 1);
      return Math.abs(a * x + b * y + c) / Math.hypot(a, b);
    },
    tol: 1e-12,
    samples: [{ c: -6 }, { c: -4 }, { c: -2 }, { c: 0 }, { c: 2 }, { c: 4 }],
    result: R`$d=\dfrac{|ax+by+c|}{\sqrt{a^2+b^2}}$. Với $a=b=1$, $M(3;1)$ thì $d=\dfrac{|4+c|}{\sqrt{2}}$. Bằng $0$ khi $4+c=0$, tức đường đi qua $M$.`,
    resultEn: R`$d=\dfrac{|ax+by+c|}{\sqrt{a^2+b^2}}$. For $a=b=1$ and $M(3,1)$, $d=\dfrac{|4+c|}{\sqrt{2}}$. This is $0$ when $4+c=0$, so the line passes through $M$.`,
    follow: R`Nếu nhân cả phương trình đường với $2$, khoảng cách có đổi không?`,
    followEn: R`If the line equation is multiplied by $2$, does the distance change?`,
  },
  {
    id: "ana-r-power",
    topic: "analytic",
    title: "Điểm trong đường tròn",
    titleEn: "A point inside a circle",
    question: R`Đường tròn tâm $O$ bán kính $r$, điểm $A(3;4)$. Kéo $r$. $A$ nằm trong đường tròn khi nào?`,
    questionEn: R`A circle centered at $O$ with radius $r$, and the point $A(3,4)$. Drag $r$. When is $A$ inside the circle?`,
    hint: R`Giữ điểm $A(3;4)$. Chỉ kéo bán kính. Ghi $r^2$ trừ $25$.`,
    hintEn: R`Leave $A(3,4)$ fixed. Drag only the radius. Record $r^2$ subtracted from $25$.`,
    block: R`Chưa đọc được bán kính.`,
    blockEn: R`Could not read the radius.`,
    preset: { scene: 2, radius: 3, cx: 3, cy: 4 },
    guesses: [
      { id: "five", vi: R`Trong đường tròn khi $r>5$, vì $OA=5$.`, en: R`Inside when $r>5$, because $OA=5$.` },
      { id: "three", vi: R`Trong đường tròn khi $r>3$.`, en: R`Inside when $r>3$.` },
      { id: "always", vi: R`Luôn trong đường tròn.`, en: R`Always inside the circle.` },
    ],
    answerId: "five",
    columns: [
      { key: "r", vi: R`$r$`, en: R`$r$` },
      { key: "power", vi: R`$OA^2-r^2$`, en: R`$OA^2-r^2$` },
    ],
    plotX: "r",
    plotY: "power",
    measure: (params) => {
      const r = num(params, "radius");
      const cx = num(params, "cx", 3);
      const cy = num(params, "cy", 4);
      return { r, power: cx * cx + cy * cy - r * r };
    },
    formula: (r, params) => {
      const cx = num(params, "cx", 3);
      const cy = num(params, "cy", 4);
      return cx * cx + cy * cy - r * r;
    },
    tol: 1e-12,
    samples: [{ radius: 1 }, { radius: 3 }, { radius: 5 }, { radius: 6 }, { radius: 8 }],
    result: R`$OA^2=3^2+4^2=25$, nên $OA=5$. Phương tích $OA^2-r^2$ âm khi $r>5$: điểm nằm trong đường tròn. Bằng $0$ khi $A$ trên đường tròn.`,
    resultEn: R`$OA^2=3^2+4^2=25$, so $OA=5$. The power $OA^2-r^2$ is negative when $r>5$: the point is inside the circle. It is $0$ when $A$ is on the circle.`,
    follow: R`Điểm $(6;0)$ đi vào trong đường tròn từ bán kính nào?`,
    followEn: R`From which radius does the point $(6,0)$ lie inside the circle?`,
  },
  {
    id: "shp-r-cone",
    topic: "triangle",
    title: "Nón nội tiếp mặt cầu",
    titleEn: "Cone inscribed in a sphere",
    question: R`Nón nội tiếp mặt cầu bán kính $R=6$, chiều cao $h$. Kéo $h$ trên hình chóp. Thể tích nón lớn nhất tại $h$ nào?`,
    questionEn: R`A cone inscribed in a sphere of radius $R=6$, with height $h$. Drag $h$ on the pyramid figure. Which $h$ maximizes the cone's volume?`,
    hint: R`Hình đang vẽ là chóp, chỉ để kéo $h$. Số ghi là thể tích nón, $R=6$ cố định. Kéo chiều cao.`,
    hintEn: R`The drawing is a pyramid, used only to drag $h$. The recorded number is the cone's volume, with $R=6$ fixed. Drag the height.`,
    block: R`Cần $0<h<2R$.`,
    blockEn: R`Need $0<h<2R$.`,
    preset: { scene: 2, side: 6, ph: 4 },
    guesses: [
      { id: "eight", vi: R`$V=\dfrac{\pi}{3}(2Rh^2-h^3)$, lớn nhất tại $h=\dfrac{4R}{3}=8$.`, en: R`$V=\dfrac{\pi}{3}(2Rh^2-h^3)$, largest at $h=\dfrac{4R}{3}=8$.` },
      { id: "half", vi: R`Lớn nhất khi $h=R=6$.`, en: R`Largest when $h=R=6$.` },
      { id: "full", vi: R`Lớn nhất khi $h=2R=12$.`, en: R`Largest when $h=2R=12$.` },
    ],
    answerId: "eight",
    columns: [
      { key: "h", vi: R`$h$`, en: R`$h$` },
      { key: "vol", vi: R`$V$`, en: R`$V$` },
    ],
    plotX: "h",
    plotY: "vol",
    measure: (params) => {
      const h = num(params, "ph");
      if (!(h > 0) || h >= 2 * CONE_R) return null;
      const radius2 = h * (2 * CONE_R - h);
      return { h, vol: (Math.PI / 3) * radius2 * h };
    },
    formula: (h) => (Math.PI / 3) * (2 * CONE_R * h * h - h * h * h),
    tol: 1e-9,
    samples: [{ ph: 2 }, { ph: 4 }, { ph: 6 }, { ph: 8 }, { ph: 10 }],
    result: R`Bán kính đáy thỏa $r^2=h(2R-h)$. $V=\dfrac{1}{3}\pi r^2 h=\dfrac{\pi}{3}(2Rh^2-h^3)$. $V'(h)=\pi h(8-h)$ khi $R=6$. Trên $(0;12)$, cực đại tại $h=8=\dfrac{4R}{3}$.`,
    resultEn: R`The base radius satisfies $r^2=h(2R-h)$. $V=\dfrac{1}{3}\pi r^2 h=\dfrac{\pi}{3}(2Rh^2-h^3)$. $V'(h)=\pi h(8-h)$ when $R=6$. On $(0,12)$ the maximum is at $h=8=\dfrac{4R}{3}$.`,
    follow: R`Thể tích lớn nhất đó bằng bao nhiêu phần của thể tích mặt cầu $\dfrac{4}{3}\pi R^3$?`,
    followEn: R`What fraction of the sphere's volume $\dfrac{4}{3}\pi R^3$ is that maximum?`,
  },
  {
    id: "shp-r-tet",
    topic: "triangle",
    title: "Thể tích tứ diện đều",
    titleEn: "Regular tetrahedron volume",
    question: R`Tứ diện đều cạnh $a$. Thể tích là hàm bậc mấy của $a$?`,
    questionEn: R`A regular tetrahedron of edge $a$. What degree is the volume as a function of $a$?`,
    hint: R`Kéo cạnh $a$. Ghi $a$ và thể tích.`,
    hintEn: R`Drag the edge $a$. Record $a$ and the volume.`,
    block: R`Cần cạnh dương.`,
    blockEn: R`The edge has to be positive.`,
    preset: { scene: 3, edge: 6 },
    guesses: [
      { id: "cube", vi: R`$V=\dfrac{a^3\sqrt{2}}{12}$, bậc ba.`, en: R`$V=\dfrac{a^3\sqrt{2}}{12}$, degree three.` },
      { id: "sq", vi: R`$V$ tỉ lệ với $a^2$.`, en: R`$V$ is proportional to $a^2$.` },
      { id: "lin", vi: R`$V$ tỉ lệ với $a$.`, en: R`$V$ is proportional to $a$.` },
    ],
    answerId: "cube",
    columns: [
      { key: "a", vi: R`$a$`, en: R`$a$` },
      { key: "vol", vi: R`$V$`, en: R`$V$` },
    ],
    plotX: "a",
    plotY: "vol",
    measure: (params) => {
      const a = num(params, "edge");
      if (!(a > 0)) return null;
      return { a, vol: tetTriple(a) };
    },
    formula: (a) => tetraVolume(a),
    tol: 1e-9,
    samples: [{ edge: 2 }, { edge: 4 }, { edge: 6 }, { edge: 8 }, { edge: 10 }],
    result: R`Ba cạnh từ một đỉnh cho tích hỗn hợp $\dfrac{a^3\sqrt{2}}{2}$. Thể tích là trị tuyệt đối chia $6$, nên $V=\dfrac{a^3\sqrt{2}}{12}$.`,
    resultEn: R`Three edges from one vertex have scalar triple product $\dfrac{a^3\sqrt{2}}{2}$. The volume is the absolute value divided by $6$, so $V=\dfrac{a^3\sqrt{2}}{12}$.`,
    follow: R`Nếu mọi cạnh nhân $k$, thể tích nhân $k^3$ hay $k^2$?`,
    followEn: R`If every edge is multiplied by $k$, is the volume multiplied by $k^3$ or by $k^2$?`,
  },
  {
    id: "cmb-r-sym",
    topic: "combo",
    title: "Đối xứng của tổ hợp",
    titleEn: "Symmetry of combinations",
    question: R`Giữ $n=6$, kéo $k$. $C_n^k$ và $C_n^{n-k}$ khác nhau thế nào?`,
    questionEn: R`Keep $n=6$ and drag $k$. How do $C_n^k$ and $C_n^{n-k}$ differ?`,
    hint: R`Giữ $n$. Kéo $k$ từ $0$ đến $n$. Ghi $C_n^k$.`,
    hintEn: R`Leave $n$ fixed. Drag $k$ from $0$ to $n$. Record $C_n^k$.`,
    block: R`Cần $0\le k\le n$.`,
    blockEn: R`Need $0\le k\le n$.`,
    preset: { scene: 0, n: 6, k: 1 },
    guesses: [
      { id: "eq", vi: R`$C_n^k=C_n^{n-k}$, đồ thị đối xứng quanh $k=n/2$.`, en: R`$C_n^k=C_n^{n-k}$, and the graph is symmetric about $k=n/2$.` },
      { id: "twice", vi: R`$C_n^{n-k}=2C_n^k$.`, en: R`$C_n^{n-k}=2C_n^k$.` },
      { id: "grow", vi: R`$C_n^k$ tăng mãi khi $k$ tăng.`, en: R`$C_n^k$ keeps growing as $k$ grows.` },
    ],
    answerId: "eq",
    columns: [
      { key: "k", vi: R`$k$`, en: R`$k$` },
      { key: "ways", vi: R`$C_n^k$`, en: R`$C_n^k$` },
    ],
    plotX: "k",
    plotY: "ways",
    measure: (params) => {
      const n = Math.round(num(params, "n", 6));
      const k = Math.round(num(params, "k"));
      if (k < 0 || k > n) return null;
      return { k, ways: comb(n, k) };
    },
    formula: (k, params) => {
      const n = Math.round(num(params, "n", 6));
      const kk = Math.round(k);
      if (kk < 0 || kk > n) return 0;
      let ways = 1;
      for (let i = 0; i < kk; i += 1) ways = (ways * (n - i)) / (i + 1);
      return Math.round(ways);
    },
    tol: 1e-9,
    samples: [{ k: 0 }, { k: 1 }, { k: 2 }, { k: 3 }, { k: 4 }, { k: 6 }],
    result: R`Chọn $k$ phần tử cũng là bỏ $n-k$ phần tử, nên $C_n^k=C_n^{n-k}$. Với $n=6$, $C_6^0=C_6^6=1$ và $C_6^2=C_6^4=15$.`,
    resultEn: R`Choosing $k$ elements is the same as leaving out $n-k$, so $C_n^k=C_n^{n-k}$. For $n=6$, $C_6^0=C_6^6=1$ and $C_6^2=C_6^4=15$.`,
    follow: R`$A_n^k$ có bằng $A_n^{n-k}$ không?`,
    followEn: R`Is $A_n^k$ equal to $A_n^{n-k}$?`,
  },
  {
    id: "cmb-r-mean",
    topic: "combo",
    title: "Trung bình và trung vị",
    titleEn: "Mean and median",
    question: R`Bốn điểm $2,3,4,5$ đứng yên, điểm thứ năm $m$ bị kéo. Trung bình và trung vị phụ thuộc $m$ thế nào?`,
    questionEn: R`Four scores $2,3,4,5$ stay fixed, and a fifth score $m$ is dragged. How do the mean and the median depend on $m$?`,
    hint: R`Kéo điểm lệch, cả số nhỏ hơn $4$. Ghi trung bình và trung vị.`,
    hintEn: R`Drag the outlier, including values below $4$. Record the mean and the median.`,
    block: R`Chưa đọc được điểm lệch.`,
    blockEn: R`Could not read the outlier.`,
    preset: { scene: 2, outlier: 6 },
    guesses: [
      { id: "split", vi: R`Trung bình $\dfrac{14+m}{5}$. Trung vị bằng $4$ khi $m\ge 4$, và bằng $3$ khi $m\le 3$.`, en: R`The mean is $\dfrac{14+m}{5}$. The median is $4$ when $m\ge 4$, and $3$ when $m\le 3$.` },
      { id: "both", vi: R`Cả trung bình lẫn trung vị đều bằng $\dfrac{14+m}{5}$.`, en: R`Both the mean and the median equal $\dfrac{14+m}{5}$.` },
      { id: "fixed", vi: R`Trung vị luôn bằng $4$, dù $m$ nhỏ.`, en: R`The median is always $4$, even when $m$ is small.` },
    ],
    answerId: "split",
    columns: [
      { key: "m", vi: R`$m$`, en: R`$m$` },
      { key: "mean", vi: R`trung bình`, en: R`mean` },
      { key: "med", vi: R`trung vị`, en: R`median` },
    ],
    plotX: "m",
    plotY: "mean",
    measure: (params) => {
      const m = num(params, "outlier");
      const scores = [2, 3, 4, 5, m];
      return { m, mean: meanOf(scores), med: medianOf(scores) };
    },
    formula: (m) => (14 + m) / 5,
    tol: 1e-12,
    samples: [{ outlier: 0 }, { outlier: 3 }, { outlier: 4 }, { outlier: 8 }, { outlier: 20 }],
    result: R`Tổng $2+3+4+5+m=14+m$, nên trung bình là $\dfrac{14+m}{5}$. Năm số xếp tăng: nếu $m\ge 4$ thì số giữa là $4$; nếu $m\le 3$ thì số giữa là $3$.`,
    resultEn: R`The sum is $2+3+4+5+m=14+m$, so the mean is $\dfrac{14+m}{5}$. Sorted, the middle value is $4$ when $m\ge 4$, and $3$ when $m\le 3$.`,
    follow: R`Nếu thêm một điểm thứ sáu cũng bằng $m$, trung vị còn đứng yên khi $m$ lớn không?`,
    followEn: R`If a sixth score, also equal to $m$, is added, does the median stay put when $m$ is large?`,
  },
  {
    id: "prob-r-lln",
    topic: "probability",
    title: "Luật số lớn với xúc xắc",
    titleEn: "Law of large numbers",
    question: R`Mỗi lần Ghi, mô hình tung xúc xắc công bằng nhiều hơn. Tần suất của mặt đang chọn tiến về đâu?`,
    questionEn: R`Each Record runs a longer fair-dice simulation. What does the frequency of the chosen face approach?`,
    hint: R`Chọn một mặt, rồi bấm Ghi vài lần. Không cần đổi mặt: số lần tung tự tăng. Có thể đổi mặt để thấy mặt nào cũng về cùng một tần suất.`,
    hintEn: R`Pick a face, then press Record several times. The throw count grows by itself. Change the face to see that every face approaches the same frequency.`,
    block: R`Cần một mặt từ $1$ đến $6$.`,
    blockEn: R`Need a face from $1$ to $6$.`,
    preset: { scene: 0, face: 6 },
    guesses: [
      { id: "sixth", vi: R`Tần suất tiến về $\dfrac{1}{6}$.`, en: R`The frequency approaches $\dfrac{1}{6}$.` },
      { id: "half", vi: R`Tần suất tiến về $\dfrac{1}{2}$.`, en: R`The frequency approaches $\dfrac{1}{2}$.` },
      { id: "zero", vi: R`Mặt đang chọn càng tung càng hiếm, tần suất về $0$.`, en: R`The chosen face gets rarer, so the frequency goes to $0$.` },
    ],
    answerId: "sixth",
    columns: [
      { key: "n", vi: R`$n$`, en: R`$n$` },
      { key: "face", vi: R`mặt`, en: R`face` },
      { key: "freq", vi: R`tần suất`, en: R`frequency` },
    ],
    plotX: "n",
    plotY: "freq",
    measure: (params) => {
      const face = Math.round(num(params, "face", 6));
      const trial = Math.max(0, Math.round(num(params, "trial")));
      if (face < 1 || face > 6) return null;
      const rolls = 240 * (trial + 1);
      const seed = (1000 + trial * 97 + face) >>> 0;
      return { n: rolls, face, freq: faceRate(seed, rolls, face) };
    },
    formula: () => 1 / 6,
    tol: 0.03,
    samples: [
      { face: 1, trial: 0 },
      { face: 6, trial: 0 },
      { face: 3, trial: 1 },
      { face: 6, trial: 2 },
      { face: 1, trial: 3 },
      { face: 6, trial: 4 },
    ],
    result: R`Sáu mặt cùng xác suất $\dfrac{1}{6}$. Số lần ra một mặt là nhị thức, tần suất có kỳ vọng $\dfrac{1}{6}$ và độ lệch chuẩn $\sqrt{\dfrac{5}{36n}}\to 0$ khi $n\to\infty$.`,
    resultEn: R`The six faces are equally likely, each with probability $\dfrac{1}{6}$. The count of one face is binomial, so the frequency has mean $\dfrac{1}{6}$ and standard deviation $\sqrt{\dfrac{5}{36n}}\to 0$ as $n\to\infty$.`,
    follow: R`Trung bình các mặt đang hiện, không chỉ tần suất một mặt, tiến về $\dfrac{7}{2}$ không?`,
    followEn: R`Does the mean of the faces shown, not just one face's frequency, approach $\dfrac{7}{2}$?`,
  },
  {
    id: "prob-r-bayes",
    topic: "probability",
    title: "Xác suất sau khi dương tính",
    titleEn: "Probability after a positive test",
    question: R`Độ nhạy $99\%$, dương tính giả $5\%$, dân số $10000$. Kéo tỉ lệ bệnh $p\%$. Khi xét nghiệm dương, xác suất thật sự bệnh bằng gì?`,
    questionEn: R`Sensitivity $99\%$, false positive rate $5\%$, population $10000$. Drag the prevalence $p\%$. After a positive test, what is the probability the person is ill?`,
    hint: R`Kéo tỉ lệ bệnh. Giữ độ nhạy và dương tính giả. Ghi xác suất hậu nghiệm.`,
    hintEn: R`Drag the prevalence. Leave sensitivity and the false-positive rate fixed. Record the posterior probability.`,
    block: R`Chưa có ca dương tính để chia.`,
    blockEn: R`There is no positive case to divide by.`,
    preset: { scene: 1, prev: 1, sens: 99, fpr: 5 },
    guesses: [
      { id: "bayes", vi: R`Bằng $\dfrac{0{,}99p}{0{,}99p+5(1-p/100)}$, không phải $99\%$.`, en: R`It equals $\dfrac{0.99p}{0.99p+5(1-p/100)}$, not $99\%$.` },
      { id: "sens", vi: R`Bằng độ nhạy $99\%$.`, en: R`It equals the sensitivity, $99\%$.` },
      { id: "prev", vi: R`Bằng đúng tỉ lệ bệnh ban đầu.`, en: R`It equals the original prevalence.` },
    ],
    answerId: "bayes",
    columns: [
      { key: "p", vi: R`$p$ (%)`, en: R`$p$ (%)` },
      { key: "post", vi: R`hậu nghiệm`, en: R`posterior` },
    ],
    plotX: "p",
    plotY: "post",
    measure: (params) => {
      const prevalence = num(params, "prev", 1);
      const sens = num(params, "sens", 99);
      const fpr = num(params, "fpr", 5);
      const test = bayes(prevalence, sens, fpr);
      if (!(test.positive > 0)) return null;
      return { p: prevalence, post: test.posterior };
    },
    formula: (p, params) => {
      const sens = num(params, "sens", 99) / 100;
      const fpr = num(params, "fpr", 5) / 100;
      const prior = p / 100;
      const tp = prior * sens;
      const fp = (1 - prior) * fpr;
      return tp / (tp + fp);
    },
    tol: 1e-9,
    samples: [{ prev: 1 }, { prev: 2 }, { prev: 5 }, { prev: 10 }, { prev: 20 }],
    result: R`Trong $10000$ người, $100p$ người bệnh cho $99p$ ca dương thật, và $10000-100p$ người khỏe cho $5(100-p)$ ca dương giả. Hậu nghiệm là $\dfrac{99p}{99p+5(100-p)}$. Tại $p=1$ thì bằng $\dfrac{1}{6}$.`,
    resultEn: R`In $10000$ people, $100p$ ill people give $99p$ true positives, and $10000-100p$ healthy people give $5(100-p)$ false positives. The posterior is $\dfrac{99p}{99p+5(100-p)}$. At $p=1$ it equals $\dfrac{1}{6}$.`,
    follow: R`Muốn hậu nghiệm vượt $\dfrac{1}{2}$ khi độ nhạy $99\%$ và dương tính giả $5\%$, tỉ lệ bệnh phải lớn hơn bao nhiêu?`,
    followEn: R`For the posterior to exceed $\dfrac{1}{2}$ at $99\%$ sensitivity and a $5\%$ false-positive rate, how large must the prevalence be?`,
  },
];

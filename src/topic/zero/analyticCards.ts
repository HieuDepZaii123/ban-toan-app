import { lineCircle, lineRelation, signedDistance, spaceLineRelation, sphereSliceRadius } from "../../algo/index.ts";
import { fmt } from "../../lib/format.ts";
import type { DiscoverCard } from "./discover.tsx";

const R = String.raw;

const touchOptions = [0, 1, 2];
const touch: DiscoverCard = {
  id: "analytic-touch",
  title: ["Đoán trước: $x+y=4$ cắt đường tròn $x^2+y^2=8$ tại mấy điểm?", "Guess first: how many points does $x+y=4$ share with the circle $x^2+y^2=8$?"],
  question: [
    R`Đường tròn $x^2+y^2=8$ có tâm $O$ và bán kính $R=\sqrt8\approx2{,}83$. Đường thẳng $x+y=4$ đi qua $(4;0)$ và $(0;4)$. Theo bạn, chúng có bao nhiêu điểm chung?`,
    R`The circle $x^2+y^2=8$ has centre $O$ and radius $R=\sqrt8\approx2.83$. The line $x+y=4$ passes through $(4;0)$ and $(0;4)$. How many common points do you think they have?`,
  ],
  options: touchOptions.map((v) => ({
    label: [`${v} điểm`, `${v} ${v === 1 ? "point" : "points"}`] as [string, string],
    hint: [R`Hãy so khoảng cách $d$ từ tâm tới đường thẳng với bán kính $R$. Nhớ: $d=\frac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$.`, R`Compare the distance $d$ from the centre to the line with the radius $R$. Recall $d=\frac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$.`] as [string, string],
  })),
  answer: () => touchOptions.indexOf(lineCircle(1, 1, -4, 0, 0, Math.sqrt(8)).points.length),
  numbers: () => [`$d=\\frac{|0+0-4|}{\\sqrt2}=2\\sqrt2=${fmt(Math.sqrt(8), 3)}$, đúng bằng $R=\\sqrt8$. Thế $y=4-x$ vào đường tròn: $2x^2-8x+8=0$ có nghiệm kép $x=2$, tức tiếp điểm $(2;2)$.`, `$d=\\frac{|0+0-4|}{\\sqrt2}=2\\sqrt2=${fmt(Math.sqrt(8), 3)}$, exactly $R=\\sqrt8$. Substituting $y=4-x$ into the circle: $2x^2-8x+8=0$ has a double root $x=2$, the point of contact $(2;2)$.`],
  reveal: [R`Khi $d=R$ đường thẳng chỉ chạm đường tròn tại một điểm: tiếp xúc. Cùng kết luận bằng đại số: phương trình bậc hai của giao điểm có biệt thức bằng $0$.`, R`When $d=R$ the line touches the circle at one point only: tangency. The same conclusion algebraically: the quadratic for the intersection points has discriminant $0$.`],
};

const distOptions = [2.6, 13, 1.3];
const distance: DiscoverCard = {
  id: "analytic-distance",
  title: ["Đoán trước: khoảng cách từ $(2;3)$ đến đường $3x+4y-5=0$", "Guess first: the distance from $(2;3)$ to the line $3x+4y-5=0$"],
  question: [
    R`Thay $(2;3)$ vào vế trái được $3\cdot2+4\cdot3-5=13$. Theo bạn khoảng cách từ điểm tới đường thẳng bằng bao nhiêu?`,
    R`Substituting $(2;3)$ into the left side gives $3\cdot2+4\cdot3-5=13$. What do you think the distance from the point to the line is?`,
  ],
  options: distOptions.map((v) => ({
    label: [`$${fmt(v, 1)}$`, `$${fmt(v, 1)}$`] as [string, string],
    hint: [R`Số $13$ chưa phải khoảng cách: còn phải chia cho độ dài pháp tuyến $\sqrt{a^2+b^2}$.`, R`The number $13$ is not yet the distance: we must still divide by the length of the normal $\sqrt{a^2+b^2}$.`] as [string, string],
  })),
  answer: () => {
    const d = Math.abs(signedDistance([3, 4], -5, { x: 2, y: 3 }));
    return distOptions.findIndex((v) => Math.abs(v - d) < 1e-9);
  },
  numbers: () => [`$\\sqrt{3^2+4^2}=5$, nên $d=\\frac{13}{5}=${fmt(Math.abs(signedDistance([3, 4], -5, { x: 2, y: 3 })), 1)}$.`, `$\\sqrt{3^2+4^2}=5$, so $d=\\frac{13}{5}=${fmt(Math.abs(signedDistance([3, 4], -5, { x: 2, y: 3 })), 1)}$.`],
  reveal: [R`Giá trị của vế trái tại điểm chỉ tỉ lệ với khoảng cách. Chia cho độ dài pháp tuyến $\sqrt{a^2+b^2}$ mới cho khoảng cách thật, vì nhân phương trình với một số làm vế trái đổi nhưng khoảng cách không đổi.`, R`The value of the left side at the point is only proportional to the distance. Dividing by the length of the normal $\sqrt{a^2+b^2}$ gives the true distance, since multiplying the equation by a number changes the left side but not the distance.`],
};

const relOptions = ["Cắt nhau tại một điểm", "Song song", "Trùng nhau"];
const parallel: DiscoverCard = {
  id: "analytic-parallel",
  title: ["Đoán trước: $y=2x+1$ và $y=2x-3$", "Guess first: $y=2x+1$ and $y=2x-3$"],
  question: [
    R`Hai đường thẳng $y=2x+1$ và $y=2x-3$ có cùng độ dốc. Theo bạn, vị trí tương đối của chúng là gì?`,
    R`The lines $y=2x+1$ and $y=2x-3$ have the same slope. What do you think their relative position is?`,
  ],
  options: relOptions.map((v, i) => ({
    label: [v, ["Cross at one point", "Parallel", "Coincide"][i] as string] as [string, string],
    hint: [R`Viết dạng $ax+by+c=0$: $2x-y+1=0$ và $2x-y-3=0$. Tính $D=a_1b_2-a_2b_1$ rồi so các hệ số tự do.`, R`Write them as $ax+by+c=0$: $2x-y+1=0$ and $2x-y-3=0$. Compute $D=a_1b_2-a_2b_1$ and compare the constant terms.`] as [string, string],
  })),
  answer: () => {
    const r = lineRelation(2, -1, 1, 2, -1, -3);
    return r === "cat" ? 0 : r === "songsong" ? 1 : 2;
  },
  numbers: () => [`$D=2\\cdot(-1)-2\\cdot(-1)=0$, nên cùng hướng. Hệ số tự do $1\\neq-3$ nên không trùng: hai đường song song.`, `$D=2\\cdot(-1)-2\\cdot(-1)=0$, so they have the same direction. The constants $1\\neq-3$ so they do not coincide: the lines are parallel.`],
  reveal: [R`Cùng độ dốc nghĩa là $D=0$: không cắt nhau. Muốn biết trùng hay song song thì xét thêm hệ số tự do (hoặc một điểm của đường này có thuộc đường kia không).`, R`The same slope means $D=0$: they do not cross. To tell coincident from parallel we also check the constants (or whether one point of a line lies on the other).`],
};

const skewOptions = ["Cắt nhau", "Song song", "Chéo nhau"];
const skew: DiscoverCard = {
  id: "analytic-skew",
  title: ["Đoán trước: hai đường thẳng trong không gian không song song, có chắc cắt nhau không?", "Guess first: two non-parallel lines in space, are they sure to meet?"],
  question: [
    R`Đường $d_1$ đi qua gốc $O$ theo hướng $(1;0;0)$, tức trục $Ox$. Đường $d_2$ đi qua $(0;0;1)$ theo hướng $(0;1;0)$. Hai đường không song song. Theo bạn chúng ở vị trí nào?`,
    R`Line $d_1$ passes through the origin $O$ in direction $(1;0;0)$, the $Ox$ axis. Line $d_2$ passes through $(0;0;1)$ in direction $(0;1;0)$. They are not parallel. What do you think their relative position is?`,
  ],
  options: skewOptions.map((v, i) => ({
    label: [v, ["Intersect", "Parallel", "Skew"][i] as string] as [string, string],
    hint: [R`Tìm điểm chung: $d_1$ có $z=0$ luôn, còn $d_2$ có $z=1$ luôn. Có điểm nào thỏa cả hai không?`, R`Look for a common point: $d_1$ always has $z=0$, while $d_2$ always has $z=1$. Is there a point satisfying both?`] as [string, string],
  })),
  answer: () => {
    const r = spaceLineRelation([0, 0, 0], [1, 0, 0], [0, 0, 1], [0, 1, 0]);
    return r === "cat" ? 0 : r === "cheo" ? 2 : 1;
  },
  numbers: () => [`Tích có hướng $[\\vec u,\\vec v]=(0;0;1)$ và $\\overrightarrow{M_1M_2}=(0;0;1)$, tích hỗn tạp bằng $1\\neq0$: hai đường không cùng nằm trong một mặt phẳng.`, `The cross product $[\\vec u,\\vec v]=(0;0;1)$ and $\\overrightarrow{M_1M_2}=(0;0;1)$, so the triple product is $1\\neq0$: the lines do not lie in one plane.`],
  reveal: [R`Trong không gian có thêm một chiều để hai đường «lách» qua nhau: cùng hướng thì song song, khác hướng mà không có điểm chung thì chéo nhau. Trong mặt phẳng, khác hướng thì luôn cắt nhau.`, R`Space has one more dimension, so two lines can slip past each other: the same direction means parallel, different directions with no common point means skew. In the plane, lines with different directions always meet.`],
};

const sliceOptions = [2, 3, 4];
const slice: DiscoverCard = {
  id: "analytic-slice",
  title: ["Đoán trước: mặt phẳng cắt mặt cầu theo đường tròn bán kính bao nhiêu?", "Guess first: what radius is the circle where a plane cuts a sphere?"],
  question: [
    R`Mặt cầu tâm $O$ bán kính $5$ và mặt phẳng $z=3$, cách tâm $3$ đơn vị. Chúng giao nhau theo một đường tròn. Bán kính đường tròn đó là bao nhiêu?`,
    R`A sphere with centre $O$ and radius $5$ and the plane $z=3$, at distance $3$ from the centre. They meet in a circle. What is the radius of that circle?`,
  ],
  options: sliceOptions.map((v) => ({
    label: [`$${v}$`, `$${v}$`] as [string, string],
    hint: [R`Từ tâm hạ đường vuông góc xuống mặt phẳng, chân $H$ có $OH=3$. Một điểm $N$ của giao tuyến có $ON=5$. Dùng Pythagore trong tam giác $OHN$.`, R`Drop the perpendicular from the centre to the plane, with foot $H$ and $OH=3$. A point $N$ of the intersection has $ON=5$. Use Pythagoras in triangle $OHN$.`] as [string, string],
  })),
  answer: () => sliceOptions.indexOf(Math.round(sphereSliceRadius(5, 3)!)),
  numbers: () => [`$r=\\sqrt{5^2-3^2}=\\sqrt{16}=4$. Bộ ba $(3;4;5)$ là bộ ba Pythagore quen thuộc.`, `$r=\\sqrt{5^2-3^2}=\\sqrt{16}=4$. The triple $(3;4;5)$ is the familiar Pythagorean triple.`],
  reveal: [R`Bán kính đường tròn giao là $r=\sqrt{R^2-d^2}$, không phải $R-d$ hay $R$. Mặt phẳng càng gần tâm thì đường tròn càng lớn, và lớn nhất là $R$ khi $d=0$.`, R`The radius of the circle of intersection is $r=\sqrt{R^2-d^2}$, not $R-d$ or $R$. The closer the plane to the centre the larger the circle, and it is largest, equal to $R$, when $d=0$.`],
};

export const ANALYTIC_CARDS = { touch, distance, parallel, skew, slice };

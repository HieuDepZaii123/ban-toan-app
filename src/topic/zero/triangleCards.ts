import { cosineSide, heronArea, tetraVolumeScaled, triangleKind } from "../../algo/index.ts";
import { fmt } from "../../lib/format.ts";
import type { DiscoverCard } from "./discover.tsx";

const R = String.raw;

const kindLabels: [string, string][] = [["Tam giác nhọn", "An acute triangle"], ["Tam giác vuông", "A right triangle"], ["Tam giác tù", "An obtuse triangle"]];
const kindIndex = (k: "nhon" | "vuong" | "tu") => (k === "nhon" ? 0 : k === "vuong" ? 1 : 2);
const mk = (id: string, title: [string, string], question: [string, string], sides: [number, number, number], hint: [string, string], numbers: [string, string], reveal: [string, string]): DiscoverCard => ({
  id,
  title,
  question,
  options: kindLabels.map((l) => ({ label: l, hint })),
  answer: () => kindIndex(triangleKind(...sides)),
  numbers: () => numbers,
  reveal,
});

const k51213 = mk(
  "triangle-5-12-13",
  ["Đoán trước: tam giác có ba cạnh $5$, $12$, $13$", "Guess first: a triangle with sides $5$, $12$, $13$"],
  [R`Tam giác có ba cạnh $5$, $12$, $13$. Theo bạn nó là tam giác nhọn, vuông hay tù?`, R`A triangle has sides $5$, $12$, $13$. Is it acute, right or obtuse, do you think?`],
  [5, 12, 13],
  [R`So bình phương cạnh dài nhất với tổng bình phương hai cạnh còn lại: $13^2$ và $5^2+12^2$.`, R`Compare the square of the longest side with the sum of the squares of the other two: $13^2$ and $5^2+12^2$.`],
  [R`$5^2+12^2=25+144=169=13^2$: đúng bằng.`, R`$5^2+12^2=25+144=169=13^2$: exactly equal.`],
  [R`Nếu $c^2=a^2+b^2$ thì góc đối diện cạnh $c$ vuông; đây là chiều đảo của định lí Pythagore, và là trường hợp $\cos C=0$ của định lí cosin.`, R`If $c^2=a^2+b^2$ then the angle opposite $c$ is right; this is the converse of Pythagoras' theorem, and the case $\cos C=0$ of the law of cosines.`],
);

const k346 = mk(
  "triangle-3-4-6",
  ["Đoán trước: tam giác có ba cạnh $3$, $4$, $6$", "Guess first: a triangle with sides $3$, $4$, $6$"],
  [R`Tam giác có ba cạnh $3$, $4$, $6$, gần giống bộ $3-4-5$. Theo bạn nó là tam giác nhọn, vuông hay tù?`, R`A triangle has sides $3$, $4$, $6$, close to the $3-4-5$ set. Is it acute, right or obtuse, do you think?`],
  [3, 4, 6],
  [R`So $6^2$ với $3^2+4^2$. Cạnh dài hơn thì góc đối diện mở rộng hơn.`, R`Compare $6^2$ with $3^2+4^2$. A longer side means a wider opposite angle.`],
  [R`$3^2+4^2=25<36=6^2$, nên $\cos C=\frac{25-36}{2\cdot3\cdot4}<0$.`, R`$3^2+4^2=25<36=6^2$, so $\cos C=\frac{25-36}{2\cdot3\cdot4}<0$.`],
  [R`Khi $c^2>a^2+b^2$, $\cos C<0$ nên góc $C$ tù. Chỉ cần so một lần cạnh dài nhất để biết loại tam giác.`, R`When $c^2>a^2+b^2$, $\cos C<0$ so the angle $C$ is obtuse. A single comparison of the longest side tells the type of the triangle.`],
);

const sideOptions: [number, string][] = [[57, "$\\sqrt{57}$"], [113, "$\\sqrt{113}$"], [225, "$15$"]];
const cosine: DiscoverCard = {
  id: "triangle-cosine",
  title: ["Đoán trước: cạnh thứ ba khi hai cạnh $7$ và $8$ hợp góc $60^\\circ$", "Guess first: the third side when sides $7$ and $8$ enclose $60^\\circ$"],
  question: [
    R`Hai cạnh $7$ và $8$ hợp với nhau một góc $60^\circ$. Cạnh thứ ba bằng bao nhiêu?`,
    R`Two sides $7$ and $8$ enclose an angle of $60^\circ$. What is the third side?`,
  ],
  options: sideOptions.map(([, label]) => ({
    label: [label, label] as [string, string],
    hint: [R`Dùng $c^2=a^2+b^2-2ab\cos C$ với $\cos60^\circ=\frac12$. Đừng quên số hạng $-2ab\cos C$: nếu bỏ nó sẽ thành $7^2+8^2$.`, R`Use $c^2=a^2+b^2-2ab\cos C$ with $\cos60^\circ=\frac12$. Do not forget the term $-2ab\cos C$: dropping it gives $7^2+8^2$.`] as [string, string],
  })),
  answer: () => {
    const c2 = Math.round(cosineSide(7, 8, Math.PI / 3) ** 2);
    return sideOptions.findIndex(([v]) => v === c2);
  },
  numbers: () => [`$c^2=49+64-2\\cdot7\\cdot8\\cdot\\frac12=113-56=57$, nên $c=\\sqrt{57}\\approx${fmt(cosineSide(7, 8, Math.PI / 3), 3)}$. Còn $15=7+8$ là độ dài khi hai cạnh thẳng hàng cùng chiều.`, `$c^2=49+64-2\\cdot7\\cdot8\\cdot\\frac12=113-56=57$, so $c=\\sqrt{57}\\approx${fmt(cosineSide(7, 8, Math.PI / 3), 3)}$. And $15=7+8$ is the length when the two sides are collinear in the same direction.`],
  reveal: [R`Số hạng $-2ab\cos C$ chính là phần hiệu chỉnh của Pythagore khi góc khác $90^\circ$: góc nhọn thì cạnh thứ ba ngắn hơn $\sqrt{a^2+b^2}$, góc tù thì dài hơn.`, R`The term $-2ab\cos C$ is the correction to Pythagoras when the angle is not $90^\circ$: an acute angle makes the third side shorter than $\sqrt{a^2+b^2}$, an obtuse one makes it longer.`],
};

const areaOptions = [2, 4, 8];
const areaRatio: DiscoverCard = {
  id: "triangle-area-ratio",
  title: ["Đoán trước: tam giác phóng to gấp đôi thì diện tích gấp mấy lần?", "Guess first: a triangle enlarged twice, how many times the area?"],
  question: [
    R`Tam giác $3-4-5$ có diện tích $6$. Phóng to mọi cạnh lên gấp đôi được tam giác $6-8-10$. Diện tích mới gấp bao nhiêu lần diện tích cũ?`,
    R`The $3-4-5$ triangle has area $6$. Doubling every side gives the $6-8-10$ triangle. How many times larger is the new area?`,
  ],
  options: areaOptions.map((v) => ({
    label: [`Gấp ${v} lần`, `${v} times`] as [string, string],
    hint: [R`Diện tích có hai chiều: đáy và chiều cao cùng nhân đôi. Hãy tính trực tiếp diện tích tam giác $6-8-10$ rồi so với $6$.`, R`Area has two dimensions: the base and the height both double. Compute the area of the $6-8-10$ triangle directly and compare with $6$.`] as [string, string],
  })),
  answer: () => areaOptions.indexOf(Math.round(heronArea(6, 8, 10) / heronArea(3, 4, 5))),
  numbers: () => [`Tam giác $6-8-10$ có diện tích $\\frac12\\cdot6\\cdot8=${fmt(heronArea(6, 8, 10), 0)}$, gấp $\\frac{${fmt(heronArea(6, 8, 10), 0)}}{${fmt(heronArea(3, 4, 5), 0)}}=${fmt(heronArea(6, 8, 10) / heronArea(3, 4, 5), 0)}=2^2$ lần.`, `The $6-8-10$ triangle has area $\\frac12\\cdot6\\cdot8=${fmt(heronArea(6, 8, 10), 0)}$, which is $\\frac{${fmt(heronArea(6, 8, 10), 0)}}{${fmt(heronArea(3, 4, 5), 0)}}=${fmt(heronArea(6, 8, 10) / heronArea(3, 4, 5), 0)}=2^2$ times larger.`],
  reveal: [R`Tỉ số đồng dạng $k$ cho tỉ số chu vi $k$ nhưng tỉ số diện tích $k^2$. Muốn diện tích gấp đôi thì chỉ cần phóng to $\sqrt2$ lần.`, R`A similarity ratio $k$ gives a perimeter ratio $k$ but an area ratio $k^2$. To double the area you only need to enlarge by $\sqrt2$.`],
};

const volOptions = [2, 4, 8];
const volume: DiscoverCard = {
  id: "triangle-volume-ratio",
  title: ["Đoán trước: khối phóng to gấp đôi thì thể tích gấp mấy lần?", "Guess first: a solid enlarged twice, how many times the volume?"],
  question: [
    R`Một tứ diện có ba cạnh xuất phát từ một đỉnh đôi một vuông góc, mỗi cạnh dài $1$. Phóng to mọi kích thước lên gấp đôi. Thể tích mới gấp bao nhiêu lần thể tích cũ?`,
    R`A tetrahedron has three mutually perpendicular edges of length $1$ from one vertex. Enlarge every dimension twice. How many times larger is the new volume?`,
  ],
  options: volOptions.map((v) => ({
    label: [`Gấp ${v} lần`, `${v} times`] as [string, string],
    hint: [R`Khối có ba chiều: dài, rộng, cao đều nhân đôi. Thể tích tứ diện là $\frac16$ trị tuyệt đối của định thức ba cạnh.`, R`A solid has three dimensions: length, width and height all double. The volume of a tetrahedron is $\frac16$ of the absolute value of the determinant of its three edges.`] as [string, string],
  })),
  answer: () => volOptions.indexOf(Math.round(tetraVolumeScaled([1, 0, 0], [0, 1, 0], [0, 0, 1], 2) / tetraVolumeScaled([1, 0, 0], [0, 1, 0], [0, 0, 1], 1))),
  numbers: () => [`Thể tích cũ $\\frac16$, thể tích mới $\\frac{2\\cdot2\\cdot2}{6}=\\frac86\\cdot\\frac{1}{1}=${fmt(tetraVolumeScaled([1, 0, 0], [0, 1, 0], [0, 0, 1], 2), 3)}$, gấp $2^3=8$ lần.`, `The old volume is $\\frac16$, the new one $\\frac{2\\cdot2\\cdot2}{6}=${fmt(tetraVolumeScaled([1, 0, 0], [0, 1, 0], [0, 0, 1], 2), 3)}$, which is $2^3=8$ times larger.`],
  reveal: [R`Độ dài nhân $k$, diện tích nhân $k^2$, thể tích nhân $k^3$. Số mũ là số chiều.`, R`Lengths scale by $k$, areas by $k^2$, volumes by $k^3$. The exponent is the number of dimensions.`],
};

export const TRIANGLE_CARDS = { k51213, k346, cosine, areaRatio, volume };

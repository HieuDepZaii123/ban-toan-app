import { countSolutions, criticalPoints, cubicExtremaCount, isExtremum } from "../../algo/index.ts";
import { fmt } from "../../lib/format.ts";
import { mulberry32 } from "../../lib/prng.ts";
import type { DiscoverCard } from "./discover.tsx";

const R = String.raw;
const nearest = (values: number[], target: number): number => values.reduce((best, v, i) => (Math.abs(v - target) < Math.abs((values[best] as number) - target) ? i : best), 0);

const cubicX3 = (x: number) => x ** 3;
const flat: DiscoverCard = {
  id: "survey-flat",
  title: ["Đoán trước: đạo hàm bằng 0 có luôn là cực trị không?", "Guess first: is a zero derivative always an extremum?"],
  question: [
    R`Hàm $y=x^3$ có $y'=3x^2$ bằng $0$ tại $x=0$. Theo bạn, $x=0$ là gì của hàm?`,
    R`The function $y=x^3$ has $y'=3x^2$ equal to $0$ at $x=0$. What do you think $x=0$ is for the function?`,
  ],
  options: [
    { label: ["Điểm cực tiểu", "A minimum"], hint: [R`Cực tiểu nghĩa là giá trị ở hai phía đều lớn hơn $y(0)$. Thử $y(-0{,}1)$ và $y(0{,}1)$.`, R`A minimum means the values on both sides are larger than $y(0)$. Try $y(-0.1)$ and $y(0.1)$.`] },
    { label: ["Điểm cực đại", "A maximum"], hint: [R`Cực đại nghĩa là giá trị ở hai phía đều nhỏ hơn $y(0)$. Thử $y(-0{,}1)$ và $y(0{,}1)$.`, R`A maximum means the values on both sides are smaller than $y(0)$. Try $y(-0.1)$ and $y(0.1)$.`] },
    { label: ["Không phải cực trị", "Not an extremum"], hint: [R``, R``] },
    { label: ["Hàm không có đạo hàm tại đó", "The function has no derivative there"], hint: [R`$y'=3x^2$ xác định tại $0$ và bằng $0$: hàm có đạo hàm ở đó.`, R`$y'=3x^2$ is defined at $0$ and equals $0$: the function does have a derivative there.`] },
  ],
  answer: () => {
    const kind = isExtremum(cubicX3, 0);
    return kind === "min" ? 0 : kind === "max" ? 1 : 2;
  },
  numbers: () => [`$y(-0{,}1)=${fmt(cubicX3(-0.1), 4)}$, $y(0)=0$, $y(0{,}1)=${fmt(cubicX3(0.1), 4)}$: hàm vẫn tăng qua $0$.`, `$y(-0.1)=${fmt(cubicX3(-0.1), 4)}$, $y(0)=0$, $y(0.1)=${fmt(cubicX3(0.1), 4)}$: the function still increases through $0$.`],
  reveal: [R`$y'=0$ chỉ là điều kiện cần. Cực trị còn cần $y'$ đổi dấu khi đi qua điểm đó.`, R`$y'=0$ is only a necessary condition. An extremum also needs $y'$ to change sign there.`],
};

const maxLabels = [0, 1, 2, 3];
function mostExtrema(): number {
  const rng = mulberry32(11);
  let most = 0;
  for (let i = 0; i < 200; i++) most = Math.max(most, cubicExtremaCount(rng() * 4 - 2 || 1, rng() * 4 - 2, rng() * 4 - 2, rng() * 4 - 2));
  return most;
}
const maxCount: DiscoverCard = {
  id: "survey-max-extrema",
  title: ["Đoán trước: hàm bậc ba nhiều nhất mấy cực trị?", "Guess first: at most how many extrema can a cubic have?"],
  question: [
    R`Hàm bậc ba $y=ax^3+bx^2+cx+d$ ($a\neq 0$) có đạo hàm là tam thức bậc hai. Theo bạn đồ thị của nó có nhiều nhất bao nhiêu điểm cực trị?`,
    R`A cubic $y=ax^3+bx^2+cx+d$ ($a\neq 0$) has a quadratic as its derivative. What is the largest number of extremum points you think its graph can have?`,
  ],
  options: maxLabels.map((v) => ({
    label: [String(v), String(v)] as [string, string],
    hint: v < 2 ? [R`Hãy thử $y=x^3-3x$: đồ thị có đỉnh đồi và đáy rõ ràng.`, R`Try $y=x^3-3x$: the graph has a clear hilltop and bottom.`] as [string, string] : v === 3 ? [R`$y'$ là tam thức bậc hai nên chỉ có tối đa hai nghiệm.`, R`$y'$ is a quadratic so it has at most two roots.`] as [string, string] : [R``, R``] as [string, string],
  })),
  answer: () => nearest(maxLabels, mostExtrema()),
  numbers: () => [`Máy thử 200 bộ hệ số ngẫu nhiên: số cực trị lớn nhất tìm thấy là $${mostExtrema()}$.`, `The machine tried 200 random sets of coefficients: the largest number of extrema found is $${mostExtrema()}$.`],
  reveal: [R`Cực trị nằm ở nghiệm của $y'=0$, một tam thức bậc hai, nên có tối đa hai nghiệm, tức tối đa hai cực trị.`, R`Extrema sit at the roots of $y'=0$, a quadratic, which has at most two roots, so at most two extrema.`],
};

const cubicF = (x: number) => x ** 3 - 3 * x;
const lineLabels = [0, 1, 2, 3];
const line: DiscoverCard = {
  id: "survey-line",
  title: ["Đoán trước: đường ngang cắt đồ thị mấy lần?", "Guess first: how many times does a horizontal line cut the graph?"],
  question: [
    R`Đồ thị $y=x^3-3x$ có đỉnh đồi tại $y=2$ và đáy tại $y=-2$. Đường ngang $y=1$ cắt đồ thị tại mấy điểm?`,
    R`The graph $y=x^3-3x$ has a hilltop at $y=2$ and a bottom at $y=-2$. At how many points does the horizontal line $y=1$ cut the graph?`,
  ],
  options: lineLabels.map((v) => ({
    label: [`${v} điểm`, `${v} point${v === 1 ? "" : "s"}`] as [string, string],
    hint: v === 1 ? [R`Mức $1$ nằm giữa đáy $-2$ và đỉnh $2$. Hãy xem đường ngang đi qua mấy đoạn đồ thị.`, R`Level $1$ is between the bottom $-2$ and the top $2$. See how many stretches of the graph the line crosses.`] as [string, string] : v === 3 ? [R``, R``] as [string, string] : [R`Hãy thử kéo đường ngang trên hình bên dưới và đếm giao điểm ở mức $1$.`, R`Drag the horizontal line on the figure below and count the intersections at level $1$.`] as [string, string],
  })),
  answer: () => nearest(lineLabels, countSolutions(cubicF, 1, -4, 4)),
  numbers: () => [`Máy đếm được ${countSolutions(cubicF, 1, -4, 4)} nghiệm của $x^3-3x=1$ trên $[-4;4]$.`, `The machine counts ${countSolutions(cubicF, 1, -4, 4)} solutions of $x^3-3x=1$ on $[-4;4]$.`],
  reveal: [R`Ba đoạn đơn điệu của đồ thị đều có giá trị trải qua mức $1$, nên đường ngang cắt đúng ba lần: mức nằm giữa hai cực trị cho ba nghiệm.`, R`All three monotonic stretches pass through level $1$, so the line cuts exactly three times: a level between the two extreme values gives three solutions.`],
};

const quarticF = (x: number) => x ** 4 - 2 * x * x;
const quarticLabels = [1, 2, 3, 4];
const quartic: DiscoverCard = {
  id: "survey-quartic",
  title: ["Đoán trước: hàm trùng phương có mấy cực trị?", "Guess first: how many extrema does a biquadratic have?"],
  question: [
    R`Hàm $y=x^4-2x^2$ có dạng $ax^4+bx^2+c$ với $a=1$ và $b=-2$. Đồ thị hình chữ W có bao nhiêu điểm cực trị?`,
    R`The function $y=x^4-2x^2$ has the form $ax^4+bx^2+c$ with $a=1$ and $b=-2$. How many extremum points does the W-shaped graph have?`,
  ],
  options: quarticLabels.map((v) => ({
    label: [String(v), String(v)] as [string, string],
    hint: v === 4 ? [R`$y'=4x(x^2-1)$ chỉ có ba nghiệm.`, R`$y'=4x(x^2-1)$ has only three roots.`] as [string, string] : v === 3 ? [R``, R``] as [string, string] : [R`Chữ W có hai đáy và một đỉnh ở giữa. Hãy đếm lại.`, R`The W has two bottoms and one top in the middle. Count again.`] as [string, string],
  })),
  answer: () => nearest(quarticLabels, criticalPoints(quarticF, -3, 3).length),
  numbers: () => [`Máy tìm nghiệm của $y'$ trên $[-3;3]$: $x=${criticalPoints(quarticF, -3, 3).map((c) => fmt(c.x, 3)).join(";\\ ")}$.`, `The machine finds the roots of $y'$ on $[-3;3]$: $x=${criticalPoints(quarticF, -3, 3).map((c) => fmt(c.x, 3)).join(";\\ ")}$.`],
  reveal: [R`Khi $ab<0$, $y'=2x(2ax^2+b)$ có ba nghiệm phân biệt và đổi dấu ở cả ba: ba cực trị. Khi $ab\ge 0$ chỉ còn một.`, R`When $ab<0$, $y'=2x(2ax^2+b)$ has three distinct roots and changes sign at all three: three extrema. When $ab\ge 0$ only one is left.`],
};

const asyF = (x: number) => (2 * x + 1) / (x - 3);
const asyLabels = [0, 1, 2, 3];
const asymptote: DiscoverCard = {
  id: "survey-asymptote",
  title: ["Đoán trước: tiệm cận đứng nằm ở đâu?", "Guess first: where is the vertical asymptote?"],
  question: [
    R`Đồ thị $y=\frac{2x+1}{x-3}$ có một tiệm cận đứng $x=x_0$. Theo bạn $x_0$ bằng bao nhiêu?`,
    R`The graph $y=\frac{2x+1}{x-3}$ has a vertical asymptote $x=x_0$. What do you think $x_0$ is?`,
  ],
  options: asyLabels.map((v) => ({
    label: [`$x=${v}$`, `$x=${v}$`] as [string, string],
    hint: v === 3 ? [R``, R``] as [string, string] : [R`Thử tính $y$ tại $x=${v}+0{,}001$: giá trị có lớn vô cùng không?`.replace("${v}", String(v)), R`Compute $y$ at $x=${v}+0.001$: is the value huge?`.replace("${v}", String(v))] as [string, string],
  })),
  answer: () => nearest(asyLabels, asyLabels.reduce((best, c) => (Math.abs(asyF(c + 1e-6)) > Math.abs(asyF(best + 1e-6)) ? c : best), 0)),
  numbers: () => [`Gần $x=3$: $y(3{,}000001)=${fmt(asyF(3.000001), 0)}$ và $y(2{,}999999)=${fmt(asyF(2.999999), 0)}$.`, `Near $x=3$: $y(3.000001)=${fmt(asyF(3.000001), 0)}$ and $y(2.999999)=${fmt(asyF(2.999999), 0)}$.`],
  reveal: [R`Tiệm cận đứng nằm ở chỗ mẫu số bằng $0$ mà tử số khác $0$: gần đó giá trị lớn vô hạn.`, R`A vertical asymptote sits where the denominator is $0$ and the numerator is not: nearby the values blow up.`],
};

export const SURVEY_CARDS = { flat, maxCount, line, quartic, asymptote };

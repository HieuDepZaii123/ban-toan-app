import { limitAtInfinity, limitEstimate, twoSidedLimit } from "../../algo/index.ts";
import { fmt } from "../../lib/format.ts";
import type { DiscoverCard } from "./discover.tsx";

const R = String.raw;

/** Chỉ số của giá trị gần target nhất: đáp án đúng do thuật toán chọn, không gõ cứng. */
const nearest = (values: number[], target: number): number => values.reduce((best, v, i) => (Math.abs(v - target) < Math.abs((values[best] as number) - target) ? i : best), 0);

const holeF = (x: number) => (x * x - 1) / (x - 1);
const holeValues = [0, 1, 2, 4];
const hole: DiscoverCard = {
  id: "limit-hole",
  title: ["Đoán trước: hàm không có giá trị tại một điểm thì sao?", "Guess first: what if the function has no value at a point?"],
  question: [
    R`Hàm $f(x)=\frac{x^2-1}{x-1}$ không xác định tại $x=1$ (thành $\frac{0}{0}$). Khi $x$ tiến sát $1$ từ cả hai phía, theo bạn $f(x)$ tiến về đâu?`,
    R`The function $f(x)=\frac{x^2-1}{x-1}$ is undefined at $x=1$ (it becomes $\frac{0}{0}$). As $x$ gets close to $1$ from both sides, where do you think $f(x)$ goes?`,
  ],
  options: [
    { label: [R`Về $0$`, R`To $0$`], hint: [R`$0$ là kết quả của tử số, nhưng mẫu số cũng về $0$: phải xét cả thương.`, R`$0$ is what the numerator does, but the denominator also goes to $0$: we must look at the quotient.`] },
    { label: [R`Về $1$`, R`To $1$`], hint: [R`$1$ là điểm đang xét, không phải giá trị của hàm. Hãy thử $x=1{,}01$ rồi tính $f$.`, R`$1$ is the point under study, not the value of the function. Try $x=1.01$ and compute $f$.`] },
    { label: [R`Về $2$`, R`To $2$`], hint: [R``, R``] },
    { label: [R`Về $4$`, R`To $4$`], hint: [R`Thử $x=1{,}001$ và $x=0{,}999$ rồi xem hai kết quả có gần $4$ không.`, R`Try $x=1.001$ and $x=0.999$ and see whether the two results are near $4$.`] },
  ],
  answer: () => nearest(holeValues, twoSidedLimit(holeF, 1).left),
  numbers: () => {
    const t = twoSidedLimit(holeF, 1);
    return [`Máy thu hẹp $h$ tới $10^{-8}$: từ trái $${fmt(t.left, 6)}$, từ phải $${fmt(t.right, 6)}$.`, `The machine shrinks $h$ to $10^{-8}$: from the left $${fmt(t.left, 6)}$, from the right $${fmt(t.right, 6)}$.`];
  },
  reveal: [R`Giới hạn chỉ quan tâm các điểm quanh $x_0$, không phải chính $x_0$, nên «không có giá trị» không cản việc có giới hạn.`, R`A limit cares only about the points around $x_0$, not $x_0$ itself, so «no value» does not prevent a limit.`],
};

const sinF = (x: number) => Math.sin(3 * x) / x;
const sinValues = [1, 3, 0, 9];
const indeterminate: DiscoverCard = {
  id: "limit-sin3x",
  title: ["Đoán trước: tử và mẫu cùng về 0", "Guess first: numerator and denominator both go to 0"],
  question: [
    R`Khi $x\to 0$, cả $\sin 3x$ và $x$ đều về $0$. Theo bạn thương $\frac{\sin 3x}{x}$ tiến về số nào?`,
    R`As $x\to 0$ both $\sin 3x$ and $x$ go to $0$. Which number do you think the quotient $\frac{\sin 3x}{x}$ tends to?`,
  ],
  options: [
    { label: [R`$1$`, R`$1$`], hint: [R`$\frac{\sin x}{x}\to 1$ là trường hợp góc $x$. Ở đây góc là $3x$, thử $x=0{,}01$.`, R`$\frac{\sin x}{x}\to 1$ is the case of angle $x$. Here the angle is $3x$: try $x=0.01$.`] },
    { label: [R`$3$`, R`$3$`], hint: [R``, R``] },
    { label: [R`$0$`, R`$0$`], hint: [R`Tử về $0$ nhưng mẫu cũng về $0$ cùng nhịp, nên thương không tự động về $0$.`, R`The numerator goes to $0$ but so does the denominator at a similar pace, so the quotient need not go to $0$.`] },
    { label: [R`$9$`, R`$9$`], hint: [R`Hãy so $\sin 3x$ với $3x$ khi $x$ nhỏ rồi chia cho $x$.`, R`Compare $\sin 3x$ with $3x$ for small $x$, then divide by $x$.`] },
  ],
  answer: () => nearest(sinValues, twoSidedLimit(sinF, 0).left),
  numbers: () => [`Với $x=10^{-6}$: $\\frac{\\sin 3x}{x}=${fmt(sinF(1e-6), 6)}$.`, `At $x=10^{-6}$: $\\frac{\\sin 3x}{x}=${fmt(sinF(1e-6), 6)}$.`],
  reveal: [R`Khi $x$ nhỏ, $\sin 3x\approx 3x$, nên thương $\approx\frac{3x}{x}=3$: «$0$ chia $0$» có thể ra bất kì số nào.`, R`For small $x$, $\sin 3x\approx 3x$, so the quotient is $\approx\frac{3x}{x}=3$: «$0$ over $0$» can be any number.`],
};

const squeezeF = (x: number) => x * x * Math.sin(1 / x);
const squeezeValues = [0, 1, 0.5, 100];
const squeeze: DiscoverCard = {
  id: "limit-squeeze",
  title: ["Đoán trước: hàm dao động dữ dội", "Guess first: a wildly oscillating function"],
  question: [
    R`Hàm $x^2\sin\frac{1}{x}$ dao động vô hạn lần khi $x\to 0$, nhưng $\sin$ luôn nằm giữa $-1$ và $1$. Theo bạn $x^2\sin\frac{1}{x}$ tiến về đâu khi $x\to 0$?`,
    R`The function $x^2\sin\frac{1}{x}$ oscillates infinitely often as $x\to 0$, but $\sin$ always lies between $-1$ and $1$. Where do you think $x^2\sin\frac{1}{x}$ goes as $x\to 0$?`,
  ],
  options: [
    { label: [R`Về $0$`, R`To $0$`], hint: [R``, R``] },
    { label: [R`Về $1$`, R`To $1$`], hint: [R`$\sin\frac{1}{x}$ có thể bằng $1$, nhưng còn thừa số $x^2$ đứng trước: nó cỡ bao nhiêu khi $x$ nhỏ?`, R`$\sin\frac{1}{x}$ can equal $1$, but the factor $x^2$ in front: how big is it when $x$ is small?`] },
    { label: [R`Không có giới hạn vì dao động`, R`No limit because it oscillates`], hint: [R`Dao động không đủ để loại giới hạn: hãy xem biên độ dao động còn lớn bao nhiêu.`, R`Oscillation alone does not rule out a limit: look at how big the amplitude still is.`] },
    { label: [R`Về $100$`, R`To $100$`], hint: [R`Hãy tính giá trị tại $x=0{,}001$ và so với $100$.`, R`Compute the value at $x=0.001$ and compare with $100$.`] },
  ],
  answer: () => nearest(squeezeValues, twoSidedLimit(squeezeF, 0.0, 6).left),
  numbers: () => [`Tại $x=10^{-4}$ giá trị là $${fmt(squeezeF(1e-4), 8)}$, nằm trong đoạn $[-x^2;\\,x^2]=[-10^{-8};\\,10^{-8}]$.`, `At $x=10^{-4}$ the value is $${fmt(squeezeF(1e-4), 8)}$, inside $[-x^2;\\,x^2]=[-10^{-8};\\,10^{-8}]$.`],
  reveal: [R`Hàm bị kẹp giữa $-x^2$ và $x^2$, cả hai cùng về $0$, nên nó cũng về $0$ dù dao động.`, R`The function is squeezed between $-x^2$ and $x^2$, both going to $0$, so it goes to $0$ despite oscillating.`],
};

const asyF = (x: number) => (2 * x + 1) / (x - 3);
const asyValues = [0, 1, 2, 3];
const asymptote: DiscoverCard = {
  id: "limit-infinity",
  title: ["Đoán trước: đi rất xa trên trục hoành", "Guess first: going very far along the axis"],
  question: [
    R`Khi $x$ rất lớn, $f(x)=\frac{2x+1}{x-3}$ tiến về số nào? (Gợi ý: khi $x$ lớn, các số $1$ và $3$ có còn quan trọng không?)`,
    R`When $x$ is very large, which number does $f(x)=\frac{2x+1}{x-3}$ approach? (Hint: when $x$ is large, do the numbers $1$ and $3$ still matter?)`,
  ],
  options: [
    { label: [R`$0$`, R`$0$`], hint: [R`Cả tử lẫn mẫu đều lớn dần, nên chưa chắc thương bé đi. Thử $x=1000$.`, R`Both numerator and denominator grow, so the quotient need not shrink. Try $x=1000$.`] },
    { label: [R`$1$`, R`$1$`], hint: [R`Hãy tính $f(1000)$: tử gần $2000$, mẫu gần $1000$.`, R`Compute $f(1000)$: the numerator is near $2000$, the denominator near $1000$.`] },
    { label: [R`$2$`, R`$2$`], hint: [R``, R``] },
    { label: [R`$3$`, R`$3$`], hint: [R`$3$ là chỗ mẫu bằng $0$ (tiệm cận đứng), không phải giá trị ở vô cực.`, R`$3$ is where the denominator is $0$ (a vertical asymptote), not the value at infinity.`] },
  ],
  answer: () => nearest(asyValues, limitAtInfinity(asyF)),
  numbers: () => [`$f(10^7)=${fmt(limitAtInfinity(asyF), 7)}$ và $f(-10^7)=${fmt(limitAtInfinity(asyF, -1), 7)}$.`, `$f(10^7)=${fmt(limitAtInfinity(asyF), 7)}$ and $f(-10^7)=${fmt(limitAtInfinity(asyF, -1), 7)}$.`],
  reveal: [R`Khi $x$ rất lớn, $1$ và $3$ bị lấn át: $f(x)\approx\frac{2x}{x}=2$, nên đường $y=2$ là tiệm cận ngang.`, R`When $x$ is very large, $1$ and $3$ are overwhelmed: $f(x)\approx\frac{2x}{x}=2$, so the line $y=2$ is a horizontal asymptote.`],
};

const pieceLeft = (x: number) => x * x;
const contValues = [0, 1, 2, -1];
const continuity: DiscoverCard = {
  id: "limit-continuity",
  title: ["Đoán trước: ghép hai mảnh cho liền nét", "Guess first: joining two pieces without a gap"],
  question: [
    R`Cho $f(x)=x^2$ khi $x<1$ và $f(x)=a\,x$ khi $x\ge 1$. Giá trị nào của $a$ làm đồ thị liền nét tại $x=1$?`,
    R`Let $f(x)=x^2$ for $x<1$ and $f(x)=a\,x$ for $x\ge 1$. Which value of $a$ makes the graph unbroken at $x=1$?`,
  ],
  options: [
    { label: [R`$a=0$`, R`$a=0$`], hint: [R`Với $a=0$ thì $f(1)=0$, trong khi bên trái $x^2$ tiến về một số khác $0$.`, R`With $a=0$ we get $f(1)=0$, while $x^2$ on the left tends to a different number.`] },
    { label: [R`$a=1$`, R`$a=1$`], hint: [R``, R``] },
    { label: [R`$a=2$`, R`$a=2$`], hint: [R`Với $a=2$ thì $f(1)=2$, nhưng $x^2$ chỉ tiến về $1$ khi $x\to 1$ từ trái.`, R`With $a=2$ we get $f(1)=2$, but $x^2$ only tends to $1$ as $x\to 1$ from the left.`] },
    { label: [R`$a=-1$`, R`$a=-1$`], hint: [R`Với $a=-1$ thì $f(1)=-1$: bên phải nằm dưới trục còn bên trái nằm trên.`, R`With $a=-1$ we get $f(1)=-1$: the right side is below the axis while the left is above.`] },
  ],
  answer: () => nearest(contValues, (limitEstimate(pieceLeft, 1, "left", 8).at(-1) as { value: number }).value),
  numbers: () => {
    const v = (limitEstimate(pieceLeft, 1, "left", 8).at(-1) as { value: number }).value;
    return [`Bên trái, $x^2$ tiến về $${fmt(v, 5)}$; bên phải $a\\cdot 1=a$. Liền nét khi hai số bằng nhau.`, `On the left $x^2$ tends to $${fmt(v, 5)}$; on the right $a\\cdot 1=a$. The graph is unbroken when the two numbers are equal.`];
  },
  reveal: [R`Liên tục tại $x_0$ nghĩa là giới hạn trái, giới hạn phải và giá trị tại $x_0$ đều bằng nhau.`, R`Continuous at $x_0$ means the left limit, the right limit and the value at $x_0$ are all equal.`],
};

export const LIMIT_CARDS = { hole, indeterminate, squeeze, asymptote, continuity };

import { eigenvalues2, matApply, matRank, powerIteration, leastSquaresLine, type M2 } from "../../algo/index.ts";
import { fmt } from "../../lib/format.ts";
import type { DiscoverCard } from "./discover.tsx";

const R = String.raw;
const SYM: M2 = [2, 1, 1, 2];
const pair = (p: [number, number]) => `$(${p[0]};${p[1]})$`;

const stayCandidates: [number, number][] = [[1, 0], [1, 1], [1, 2]];
const stay: DiscoverCard = {
  id: "linalg-stay",
  title: ["Đoán trước: vectơ nào không bị ma trận làm lệch hướng?", "Guess first: which vector is not turned by the matrix?"],
  question: [
    R`Ma trận $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ biến $(x;y)$ thành $(2x+y;\,x+2y)$. Trong ba vectơ dưới đây, vectơ nào sau khi qua $A$ vẫn nằm trên cùng đường thẳng với chính nó?`,
    R`The matrix $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$ turns $(x;y)$ into $(2x+y;\,x+2y)$. Which of the three vectors below still lies on the same line as itself after passing through $A$?`,
  ],
  options: stayCandidates.map((p) => ({
    label: [pair(p), pair(p)] as [string, string],
    hint: [R`Tính $A\mathbf{v}$ rồi so với $\mathbf{v}$: hai vectơ cùng đường thẳng khi tỉ lệ các thành phần như nhau.`, R`Compute $A\mathbf{v}$ and compare with $\mathbf{v}$: two vectors lie on the same line when their components are in the same ratio.`] as [string, string],
  })),
  answer: () => stayCandidates.findIndex(([x, y]) => {
    const w = matApply(SYM, { x, y });
    return Math.abs(x * w.y - y * w.x) < 1e-9;
  }),
  numbers: () => [`$A(1;1)=(3;3)=3\\cdot(1;1)$, trong khi $A(1;0)=(2;1)$ và $A(1;2)=(4;5)$ đều lệch hướng.`, `$A(1;1)=(3;3)=3\\cdot(1;1)$, while $A(1;0)=(2;1)$ and $A(1;2)=(4;5)$ both change direction.`],
  reveal: [R`Vectơ $(1;1)$ chỉ bị kéo dài gấp $3$ lần: đó là vectơ riêng ứng với giá trị riêng $3$. Giá trị riêng và vectơ riêng cho thấy hướng mà ma trận chỉ kéo giãn.`, R`The vector $(1;1)$ is only stretched $3$ times: it is an eigenvector with eigenvalue $3$. Eigenvalues and eigenvectors show the directions the matrix only stretches.`],
};

const dirOptions: [number, number][] = [[1, 0], [0, 1], [1, 1]];
const power: DiscoverCard = {
  id: "linalg-power",
  title: ["Đoán trước: nhân mãi với ma trận thì hướng đi về đâu?", "Guess first: where does the direction go if we keep multiplying?"],
  question: [
    R`Bắt đầu từ vectơ $(1;0)$ và nhân liên tiếp với $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$. Sau thật nhiều lần, vectơ gần như nằm theo hướng nào?`,
    R`Start from the vector $(1;0)$ and multiply again and again by $A=\begin{pmatrix}2&1\\1&2\end{pmatrix}$. After very many times, along which direction does the vector nearly lie?`,
  ],
  options: dirOptions.map((p) => ({
    label: [pair(p), pair(p)] as [string, string],
    hint: [R`Thử nhân vài lần bằng tay: $(1;0)\to(2;1)\to(5;4)\to(14;13)$. Hãy xem tỉ số hai thành phần.`, R`Try a few multiplications by hand: $(1;0)\to(2;1)\to(5;4)\to(14;13)$. Look at the ratio of the two components.`] as [string, string],
  })),
  answer: () => {
    const last = powerIteration(SYM, { x: 1, y: 0 }, 40).pop()!;
    return dirOptions.reduce((best, p, i) => {
      const score = (q: [number, number]) => Math.abs(last.v.x * q[1] - last.v.y * q[0]) / Math.hypot(q[0], q[1]);
      return score(p) < score(dirOptions[best] as [number, number]) ? i : best;
    }, 0);
  },
  numbers: () => {
    const last = powerIteration(SYM, { x: 1, y: 0 }, 40).pop()!;
    return [`Sau $40$ lần, hướng là $(${fmt(last.v.x, 4)};${fmt(last.v.y, 4)})$ và ước lượng giá trị riêng là $${fmt(last.lambda, 4)}$.`, `After $40$ steps the direction is $(${fmt(last.v.x, 4)};${fmt(last.v.y, 4)})$ and the eigenvalue estimate is $${fmt(last.lambda, 4)}$.`];
  },
  reveal: [R`Phương kéo giãn mạnh nhất (giá trị riêng lớn nhất) thắng mọi phương khác sau nhiều lần lặp. Đây là cơ chế của PageRank và là cách tìm vectơ riêng trội.`, R`The strongest stretch (the largest eigenvalue) beats every other direction after many repetitions. This is the mechanism of PageRank and a way to find the dominant eigenvector.`],
};

const rankOptions = [1, 2, 3];
const rank: DiscoverCard = {
  id: "linalg-rank",
  title: ["Đoán trước: hạng của ma trận có hàng lặp", "Guess first: the rank of a matrix with a repeated row"],
  question: [
    R`Ma trận $\begin{pmatrix}1&2&3\\2&4&6\\1&0&1\end{pmatrix}$ có ba hàng nhưng hàng hai gấp đôi hàng một. Số hàng độc lập tuyến tính, tức hạng của nó, là bao nhiêu?`,
    R`The matrix $\begin{pmatrix}1&2&3\\2&4&6\\1&0&1\end{pmatrix}$ has three rows, but row two is twice row one. How many rows are linearly independent, that is, what is its rank?`,
  ],
  options: rankOptions.map((v) => ({
    label: [`$${v}$`, `$${v}$`] as [string, string],
    hint: [R`Hàng nào có thể viết bằng các hàng khác? Hàng nào không? Đếm số hàng còn lại sau khi bỏ hàng thừa.`, R`Which rows can be written from the others? Which cannot? Count the rows left after discarding the redundant ones.`] as [string, string],
  })),
  answer: () => rankOptions.indexOf(matRank([[1, 2, 3], [2, 4, 6], [1, 0, 1]])),
  numbers: () => [`Hạng là $${matRank([[1, 2, 3], [2, 4, 6], [1, 0, 1]])}$, nên hệ thuần nhất có $3-${matRank([[1, 2, 3], [2, 4, 6], [1, 0, 1]])}=1$ ẩn tự do.`, `The rank is $${matRank([[1, 2, 3], [2, 4, 6], [1, 0, 1]])}$, so the homogeneous system has $3-${matRank([[1, 2, 3], [2, 4, 6], [1, 0, 1]])}=1$ free unknown.`],
  reveal: [R`Hạng đếm số hướng thật sự độc lập, không đếm số hàng. Hàng hai không cho thêm gì mới, nên ma trận ba hàng chỉ có hạng hai và định thức bằng $0$.`, R`Rank counts the truly independent directions, not the number of rows. Row two adds nothing new, so the three-row matrix has rank two and determinant $0$.`],
};

const eigOptions = [2, 3, 5];
const eigen: DiscoverCard = {
  id: "linalg-eigen",
  title: ["Đoán trước: giá trị riêng lớn nhất của một ma trận", "Guess first: the largest eigenvalue of a matrix"],
  question: [
    R`Ma trận $\begin{pmatrix}4&1\\2&3\end{pmatrix}$ có vết $4+3=7$ và định thức $12-2=10$. Giá trị riêng lớn nhất của nó là số nào?`,
    R`The matrix $\begin{pmatrix}4&1\\2&3\end{pmatrix}$ has trace $4+3=7$ and determinant $12-2=10$. Which number is its largest eigenvalue?`,
  ],
  options: eigOptions.map((v) => ({
    label: [`$${v}$`, `$${v}$`] as [string, string],
    hint: [R`Hai giá trị riêng có tổng bằng vết $7$ và tích bằng định thức $10$. Tìm hai số như vậy.`, R`The two eigenvalues add up to the trace $7$ and multiply to the determinant $10$. Find two such numbers.`] as [string, string],
  })),
  answer: () => eigOptions.indexOf(Math.round(Math.max(...eigenvalues2([4, 1, 2, 3])))),
  numbers: () => {
    const e = eigenvalues2([4, 1, 2, 3]);
    return [`Hai giá trị riêng là $${fmt(e[0] as number, 0)}$ và $${fmt(e[1] as number, 0)}$: tổng $${fmt((e[0] as number) + (e[1] as number), 0)}$, tích $${fmt((e[0] as number) * (e[1] as number), 0)}$.`, `The two eigenvalues are $${fmt(e[0] as number, 0)}$ and $${fmt(e[1] as number, 0)}$: sum $${fmt((e[0] as number) + (e[1] as number), 0)}$, product $${fmt((e[0] as number) * (e[1] as number), 0)}$.`];
  },
  reveal: [R`Giá trị riêng là nghiệm của $\lambda^2-(\text{vết})\lambda+\text{định thức}=0$. Không cần khai triển dài: chỉ cần tìm hai số có tổng bằng vết và tích bằng định thức.`, R`Eigenvalues are the roots of $\lambda^2-(\text{trace})\lambda+\text{determinant}=0$. No long expansion is needed: just find two numbers whose sum is the trace and whose product is the determinant.`],
};

const slopeOptions = [1, 1.5, 2];
const regress: DiscoverCard = {
  id: "linalg-regress",
  title: ["Đoán trước: độ dốc của đường thẳng khớp nhất", "Guess first: the slope of the best-fit line"],
  question: [
    R`Ba điểm $(0;1)$, $(1;3)$, $(2;4)$ không thẳng hàng. Đường thẳng làm tổng bình phương phần dư nhỏ nhất có hệ số góc bằng bao nhiêu?`,
    R`The three points $(0;1)$, $(1;3)$, $(2;4)$ are not collinear. What is the slope of the line that makes the sum of squared residuals smallest?`,
  ],
  options: slopeOptions.map((v) => ({
    label: [`$${fmt(v, 1)}$`, `$${fmt(v, 1)}$`] as [string, string],
    hint: [R`Độ dốc từ điểm đầu tới điểm cuối là $\frac{4-1}{2}=1{,}5$ nhưng điểm giữa lệch khỏi đường đó. Thử tính tổng bình phương cho từng độ dốc, hoặc dùng công thức hồi quy.`, R`The slope from the first to the last point is $\frac{4-1}{2}=1.5$ but the middle point lies off that line. Try computing the sum of squares for each slope, or use the regression formula.`] as [string, string],
  })),
  answer: () => slopeOptions.indexOf(leastSquaresLine([{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 4 }]).b),
  numbers: () => {
    const l = leastSquaresLine([{ x: 0, y: 1 }, { x: 1, y: 3 }, { x: 2, y: 4 }]);
    return [`Đường tối ưu là $y=${fmt(l.a, 3)}+${fmt(l.b, 3)}x$, tổng bình phương phần dư là $${fmt(l.sse, 4)}$.`, `The optimal line is $y=${fmt(l.a, 3)}+${fmt(l.b, 3)}x$ with a sum of squared residuals of $${fmt(l.sse, 4)}$.`];
  },
  reveal: [R`Ở đây độ dốc tối ưu trùng độ dốc nối hai đầu, nhưng điều này chỉ do số liệu đặc biệt. Điều luôn đúng là phần dư vuông góc với các cột của ma trận dữ liệu, và đường hồi quy đi qua điểm trung bình.`, R`Here the optimal slope happens to equal the slope joining the endpoints, but only because of these special numbers. What always holds is that the residual is perpendicular to the columns of the data matrix, and the line passes through the mean point.`],
};

export const LINALG_CARDS = { stay, power, rank, eigen, regress };

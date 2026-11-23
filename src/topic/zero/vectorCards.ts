import { matDet, matMul, systemKind, type M2 } from "../../algo/index.ts";
import { fmt } from "../../lib/format.ts";
import type { DiscoverCard } from "./discover.tsx";

const R = String.raw;

const dotCandidates: [number, number][] = [[3, 4], [3, -4], [-4, -3]];
const dot: DiscoverCard = {
  id: "vector-dot",
  title: ["Đoán trước: vectơ nào vuông góc với $(4;3)$?", "Guess first: which vector is perpendicular to $(4;3)$?"],
  question: [
    R`Hai vectơ vuông góc khi chúng không «giúp nhau» chút nào. Trong ba vectơ dưới đây, vectơ nào vuông góc với $\vec{a}=(4;3)$? Hãy đoán trước khi tính.`,
    R`Two vectors are perpendicular when they do not «help each other» at all. Which of the three vectors below is perpendicular to $\vec{a}=(4;3)$? Guess before computing.`,
  ],
  options: dotCandidates.map(([x, y]) => ({
    label: [`$(${x};${y})$`, `$(${x};${y})$`] as [string, string],
    hint: [R`Thử nhân từng thành phần rồi cộng lại. Tích vô hướng của hai vectơ vuông góc là $0$.`, R`Multiply component by component and add. The dot product of perpendicular vectors is $0$.`] as [string, string],
  })),
  answer: () => dotCandidates.findIndex(([x, y]) => 4 * x + 3 * y === 0),
  numbers: () => [`$(4;3)\\cdot(3;-4)=12-12=0$, còn $(4;3)\\cdot(3;4)=${4 * 3 + 3 * 4}$ và $(4;3)\\cdot(-4;-3)=${-16 - 9}$.`, `$(4;3)\\cdot(3;-4)=12-12=0$, while $(4;3)\\cdot(3;4)=${4 * 3 + 3 * 4}$ and $(4;3)\\cdot(-4;-3)=${-16 - 9}$.`],
  reveal: [R`Tích vô hướng $a_1b_1+a_2b_2$ bằng $0$ đúng khi góc giữa hai vectơ là $90^\circ$. Muốn vuông góc, hoán đổi hai thành phần rồi đổi dấu một thành phần.`, R`The dot product $a_1b_1+a_2b_2$ is $0$ exactly when the angle between the vectors is $90^\circ$. To get a perpendicular vector, swap the components and flip the sign of one.`],
};

const A: M2 = [1, 1, 0, 1];
const B: M2 = [1, 0, 1, 1];
const order: DiscoverCard = {
  id: "vector-order",
  title: ["Đoán trước: nhân ma trận có đổi chỗ được không?", "Guess first: can matrices be multiplied in either order?"],
  question: [
    R`Cho $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ (kéo xiên theo chiều ngang) và $B=\begin{pmatrix}1&0\\1&1\end{pmatrix}$ (kéo xiên theo chiều dọc). Theo bạn, làm $A$ rồi $B$ có cho cùng kết quả với làm $B$ rồi $A$ không?`,
    R`Let $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ (a horizontal shear) and $B=\begin{pmatrix}1&0\\1&1\end{pmatrix}$ (a vertical shear). Do you think doing $A$ then $B$ gives the same result as doing $B$ then $A$?`,
  ],
  options: [
    { label: ["Có, $AB=BA$ vì đều là phép kéo xiên", "Yes, $AB=BA$ since both are shears"], hint: [R`Hãy nhân thật: lấy hàng của ma trận đầu nhân với cột của ma trận sau, và so hai kết quả.`, R`Actually multiply: take rows of the first matrix times columns of the second, and compare the two results.`] },
    { label: ["Không, $AB\\neq BA$", "No, $AB\\neq BA$"], hint: [R``, R``] },
  ],
  answer: () => {
    const x = matMul(A, B);
    const y = matMul(B, A);
    return x.every((v, i) => v === y[i]) ? 0 : 1;
  },
  numbers: () => {
    const x = matMul(A, B);
    const y = matMul(B, A);
    return [`$AB=\\begin{pmatrix}${x[0]}&${x[1]}\\\\${x[2]}&${x[3]}\\end{pmatrix}$ còn $BA=\\begin{pmatrix}${y[0]}&${y[1]}\\\\${y[2]}&${y[3]}\\end{pmatrix}$.`, `$AB=\\begin{pmatrix}${x[0]}&${x[1]}\\\\${x[2]}&${x[3]}\\end{pmatrix}$ while $BA=\\begin{pmatrix}${y[0]}&${y[1]}\\\\${y[2]}&${y[3]}\\end{pmatrix}$.`];
  },
  reveal: [R`Nhân ma trận là nối hai phép biến đổi, và thứ tự quan trọng: đi tất rồi đi giày khác với đi giày rồi đi tất. Nhưng định thức vẫn không phụ thuộc thứ tự, vì $\det(AB)=\det A\cdot\det B=\det(BA)$.`, R`Multiplying matrices chains two transformations, and the order matters: socks then shoes differs from shoes then socks. The determinant, however, does not depend on the order, since $\det(AB)=\det A\cdot\det B=\det(BA)$.`],
};

const areaOptions = [4, 5, 7];
const area: DiscoverCard = {
  id: "vector-area",
  title: ["Đoán trước: diện tích hình bình hành dựng trên hai vectơ", "Guess first: the area of the parallelogram on two vectors"],
  question: [
    R`Hình bình hành dựng trên $(3;1)$ và $(1;2)$. Theo bạn diện tích bằng bao nhiêu? Gợi ý: hình chữ nhật $3\times2=6$ có sẵn trong đầu, nhưng hình này bị xiên.`,
    R`The parallelogram on $(3;1)$ and $(1;2)$. What do you think its area is? Hint: the rectangle $3\times2=6$ comes to mind, but this shape is slanted.`,
  ],
  options: areaOptions.map((v) => ({
    label: [`$${v}$`, `$${v}$`] as [string, string],
    hint: [R`Thử tính $ad-bc$ với hai cột $(3;1)$ và $(1;2)$, rồi lấy giá trị tuyệt đối.`, R`Try $ad-bc$ with the two columns $(3;1)$ and $(1;2)$, then take the absolute value.`] as [string, string],
  })),
  answer: () => areaOptions.indexOf(Math.abs(matDet([3, 1, 1, 2]))),
  numbers: () => [`$|3\\cdot2-1\\cdot1|=${Math.abs(matDet([3, 1, 1, 2]))}$.`, `$|3\\cdot2-1\\cdot1|=${Math.abs(matDet([3, 1, 1, 2]))}$.`],
  reveal: [R`Diện tích hình bình hành là $|ad-bc|$, khác $ac+bd$ hay tích hai độ dài. Phần $bc$ trừ đi là lượng bị mất do xiên.`, R`The area of a parallelogram is $|ad-bc|$, not $ac+bd$ or the product of the two lengths. The $bc$ term subtracts the amount lost to the slant.`],
};

const system: DiscoverCard = {
  id: "vector-degenerate",
  title: ["Đoán trước: định thức bằng $0$ thì hệ có nghiệm không?", "Guess first: if the determinant is $0$, does the system have a solution?"],
  question: [
    R`Hệ $x+2y=3$ và $2x+4y=7$ có $D=1\cdot4-2\cdot2=0$. Theo bạn hệ này có bao nhiêu nghiệm?`,
    R`The system $x+2y=3$ and $2x+4y=7$ has $D=1\cdot4-2\cdot2=0$. How many solutions do you think it has?`,
  ],
  options: [
    { label: ["Đúng một nghiệm", "Exactly one solution"], hint: [R`Khi $D=0$ không còn công thức $x=\frac{D_x}{D}$. Hãy xem hai đường thẳng: chúng có cắt nhau tại một điểm không?`, R`When $D=0$ the formula $x=\frac{D_x}{D}$ is gone. Look at the two lines: do they cross at one point?`] },
    { label: ["Vô nghiệm", "No solution"], hint: [R``, R``] },
    { label: ["Vô số nghiệm", "Infinitely many solutions"], hint: [R`Vô số nghiệm chỉ khi hai phương trình thực ra là một. Thử nhân phương trình đầu với $2$ rồi so với phương trình sau.`, R`Infinitely many only when the two equations are really one. Multiply the first by $2$ and compare with the second.`] },
  ],
  answer: () => {
    const kind = systemKind(1, 2, 3, 2, 4, 7);
    return kind === "one" ? 0 : kind === "none" ? 1 : 2;
  },
  numbers: () => [`$D_x=3\\cdot4-2\\cdot7=${3 * 4 - 2 * 7}\\neq0$, còn nhân phương trình đầu với $2$ được $2x+4y=6$, mâu thuẫn với $2x+4y=7$.`, `$D_x=3\\cdot4-2\\cdot7=${3 * 4 - 2 * 7}\\neq0$, and doubling the first equation gives $2x+4y=6$, which contradicts $2x+4y=7$.`],
  reveal: [R`Khi $D=0$ hai đường thẳng song song. Nếu không trùng nhau thì không bao giờ cắt, hệ vô nghiệm; chỉ khi trùng nhau mới có vô số nghiệm.`, R`When $D=0$ the two lines are parallel. If they do not coincide they never meet and the system has no solution; only when they coincide are there infinitely many.`],
};

const centroidOptions: [number, number][] = [[3, 1.5], [2, 1], [2, 2]];
const centroid: DiscoverCard = {
  id: "vector-centroid",
  title: ["Đoán trước: trọng tâm tam giác nằm ở đâu?", "Guess first: where is the centroid of a triangle?"],
  question: [
    R`Tam giác có ba đỉnh $A(0;0)$, $B(6;0)$, $C(0;3)$. Trọng tâm $G$ có tọa độ nào?`,
    R`A triangle has vertices $A(0;0)$, $B(6;0)$, $C(0;3)$. Which coordinates does the centroid $G$ have?`,
  ],
  options: centroidOptions.map(([x, y]) => ({
    label: [`$(${fmt(x, 1)};${fmt(y, 1)})$`, `$(${fmt(x, 1)};${fmt(y, 1)})$`] as [string, string],
    hint: [R`Trọng tâm là điểm mà $\overrightarrow{GA}+\overrightarrow{GB}+\overrightarrow{GC}=\vec{0}$. Hãy thử cộng ba vectơ từ điểm đó tới ba đỉnh, hoặc lấy trung bình cộng từng tọa độ.`, R`The centroid is the point where $\overrightarrow{GA}+\overrightarrow{GB}+\overrightarrow{GC}=\vec{0}$. Try adding the three vectors from that point to the vertices, or average each coordinate.`] as [string, string],
  })),
  answer: () => {
    const gx = (0 + 6 + 0) / 3;
    const gy = (0 + 0 + 3) / 3;
    return centroidOptions.findIndex(([x, y]) => x === gx && y === gy);
  },
  numbers: () => [`$G=\\left(\\frac{0+6+0}{3};\\frac{0+0+3}{3}\\right)=(2;1)$. Kiểm: $\\overrightarrow{GA}+\\overrightarrow{GB}+\\overrightarrow{GC}=(-2;-1)+(4;-1)+(-2;2)=(0;0)$.`, `$G=\\left(\\frac{0+6+0}{3};\\frac{0+0+3}{3}\\right)=(2;1)$. Check: $\\overrightarrow{GA}+\\overrightarrow{GB}+\\overrightarrow{GC}=(-2;-1)+(4;-1)+(-2;2)=(0;0)$.`],
  reveal: [R`Trọng tâm có tọa độ là trung bình cộng tọa độ ba đỉnh, vì ba vectơ từ nó tới các đỉnh triệt tiêu nhau.`, R`The centroid's coordinates are the averages of the three vertices' coordinates, because the three vectors from it to the vertices cancel out.`],
};

export const VECTOR_CARDS = { dot, order, area, system, centroid };

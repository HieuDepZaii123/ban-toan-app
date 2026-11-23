import { classifyStationary, descend2D, hessian2D, partialSums, taylorPartial } from "../../algo/index.ts";
import { fmt } from "../../lib/format.ts";
import type { DiscoverCard } from "./discover.tsx";

const R = String.raw;

const harmonic: DiscoverCard = {
  id: "calc-harmonic",
  title: ["Đoán trước: cộng $1+\\frac12+\\frac13+\\cdots$ mãi thì sao?", "Guess first: what happens when we add $1+\\frac12+\\frac13+\\cdots$ forever?"],
  question: [
    R`Các số hạng $\frac1k$ nhỏ dần về $0$. Theo bạn, tổng $1+\frac12+\frac13+\frac14+\cdots$ khi cộng mãi sẽ thế nào?`,
    R`The terms $\frac1k$ shrink to $0$. What do you think happens to the sum $1+\frac12+\frac13+\frac14+\cdots$ when we keep adding?`,
  ],
  options: [
    { label: ["Dần tới một số hữu hạn, khoảng $2$ hay $3$", "Settles near a finite number, around $2$ or $3$"], hint: [R`Hãy so sánh các tổng riêng: nhóm $\frac13+\frac14$, rồi $\frac15+\dots+\frac18$. Mỗi nhóm cộng được ít nhất bao nhiêu?`, R`Compare the partial sums: the groups $\frac13+\frac14$, then $\frac15+\dots+\frac18$. How much does each group add at least?`] },
    { label: ["Lớn lên mãi, vượt mọi số cho trước", "Grows forever, beyond any number"], hint: [R``, R``] },
  ],
  answer: () => {
    const s = partialSums((k) => 1 / k, 1, 1 << 14);
    const doubled = s[(1 << 14) - 1]! > s[(1 << 7) - 1]! + 2;
    return doubled ? 1 : 0;
  },
  numbers: () => {
    const s = partialSums((k) => 1 / k, 1, 1 << 14);
    return [`$S_{128}=${fmt(s[127]!, 3)}$ còn $S_{16384}=${fmt(s[(1 << 14) - 1]!, 3)}$: vẫn tăng đều khoảng $0{,}69$ mỗi lần gấp đôi số số hạng. Ta có $S_{2^m}\\ge1+\\frac m2$.`, `$S_{128}=${fmt(s[127]!, 3)}$ and $S_{16384}=${fmt(s[(1 << 14) - 1]!, 3)}$: it still grows steadily by about $0.69$ each time the number of terms doubles. We have $S_{2^m}\\ge1+\\frac m2$.`];
  },
  reveal: [R`Số hạng tiến về $0$ chưa đủ để chuỗi hội tụ. Gom các số hạng thành nhóm $2^{j-1}$ số, mỗi nhóm cộng ít nhất $\frac12$, nên tổng vượt mọi giới hạn.`, R`Terms tending to $0$ are not enough for a series to converge. Grouping the terms in blocks of $2^{j-1}$, each block adds at least $\frac12$, so the sum passes every bound.`],
};

const taylorOptions = [0.0005, 0.003, 0.03];
const taylor: DiscoverCard = {
  id: "calc-taylor",
  title: ["Đoán trước: sai số khi xấp xỉ $e^{0,5}$ bằng bốn số hạng", "Guess first: the error when approximating $e^{0.5}$ with four terms"],
  question: [
    R`Xấp xỉ $e^{0{,}5}\approx1+0{,}5+\frac{0{,}5^2}{2}+\frac{0{,}5^3}{6}=1{,}6458\ldots$ Theo bạn, sai số so với giá trị thật gần bằng bao nhiêu?`,
    R`Approximate $e^{0.5}\approx1+0.5+\frac{0.5^2}{2}+\frac{0.5^3}{6}=1.6458\ldots$ How large do you think the error is compared with the true value?`,
  ],
  options: taylorOptions.map((v) => ({
    label: [`Khoảng $${fmt(v, 4)}$`, `About $${fmt(v, 4)}$`] as [string, string],
    hint: [R`Số hạng kế tiếp bị bỏ là $\frac{0{,}5^4}{24}$. Sai số cùng cỡ với số hạng đầu tiên bị bỏ.`, R`The next dropped term is $\frac{0.5^4}{24}$. The error is of the size of the first dropped term.`] as [string, string],
  })),
  answer: () => {
    const err = Math.abs(Math.exp(0.5) - taylorPartial("exp", 0.5, 3));
    return taylorOptions.reduce((best, v, i) => (Math.abs(Math.log(v / err)) < Math.abs(Math.log((taylorOptions[best] as number) / err)) ? i : best), 0);
  },
  numbers: () => {
    const err = Math.abs(Math.exp(0.5) - taylorPartial("exp", 0.5, 3));
    return [`Giá trị thật $e^{0,5}=${fmt(Math.exp(0.5), 5)}$, đa thức cho $${fmt(taylorPartial("exp", 0.5, 3), 5)}$, sai số $${fmt(err, 5)}$, nhỏ hơn chặn Lagrange $\\frac{1}{192}\\approx0{,}0052$.`, `The true value is $e^{0.5}=${fmt(Math.exp(0.5), 5)}$, the polynomial gives $${fmt(taylorPartial("exp", 0.5, 3), 5)}$, error $${fmt(err, 5)}$, below the Lagrange bound $\\frac{1}{192}\\approx0.0052$.`];
  },
  reveal: [R`Sai số của đa thức Taylor cùng cỡ với số hạng đầu tiên bị bỏ, và phần dư Lagrange cho một chặn trên chắc chắn. Chỉ bốn số hạng đã đúng tới ba chữ số thập phân.`, R`The error of a Taylor polynomial is about the size of the first dropped term, and the Lagrange remainder gives a guaranteed upper bound. Just four terms are already right to three decimal places.`],
};

const dirs: [number, number][] = [[1, 0], [0, 1], [4, 2], [-4, -6]];
const descent: DiscoverCard = {
  id: "calc-descent",
  title: ["Đoán trước: đi hướng nào để $f$ giảm nhanh nhất?", "Guess first: which direction makes $f$ decrease fastest?"],
  question: [
    R`Tại điểm $(2;1)$, hàm $f(x;y)=x^2+3y^2$ có $f_x=4$ và $f_y=6$. Trong các hướng dưới đây, đi hướng nào thì $f$ giảm nhanh nhất? (Các hướng được chuẩn hóa độ dài.)`,
    R`At the point $(2;1)$ the function $f(x;y)=x^2+3y^2$ has $f_x=4$ and $f_y=6$. Which of the directions below makes $f$ decrease fastest? (The directions are normalised in length.)`,
  ],
  options: dirs.map((p) => ({
    label: [`$(${p[0]};${p[1]})$`, `$(${p[0]};${p[1]})$`] as [string, string],
    hint: [R`Đạo hàm theo hướng $\mathbf{u}$ là $\nabla f\cdot\mathbf{u}$. Hướng giảm nhanh nhất làm tích này âm nhất.`, R`The directional derivative along $\mathbf{u}$ is $\nabla f\cdot\mathbf{u}$. The fastest decrease makes this product the most negative.`] as [string, string],
  })),
  answer: () => {
    const g = [4, 6];
    let best = 0;
    let bestVal = Infinity;
    dirs.forEach(([x, y], i) => {
      const val = (g[0]! * x + g[1]! * y) / Math.hypot(x, y);
      if (val < bestVal) { bestVal = val; best = i; }
    });
    return best;
  },
  numbers: () => {
    const path = descend2D((x, y) => [2 * x, 6 * y], { x: 2, y: 1 }, 0.1, 1);
    return [`Bước đầu tiên đi ngược gradient $(4;6)$ tới $(${fmt(path[1]!.x, 1)};${fmt(path[1]!.y, 1)})$, và $f$ giảm từ $7$ xuống $${fmt(path[1]!.x ** 2 + 3 * path[1]!.y ** 2, 2)}$.`, `The first step goes against the gradient $(4;6)$ to $(${fmt(path[1]!.x, 1)};${fmt(path[1]!.y, 1)})$, and $f$ drops from $7$ to $${fmt(path[1]!.x ** 2 + 3 * path[1]!.y ** 2, 2)}$.`];
  },
  reveal: [R`Hướng giảm nhanh nhất là $-\nabla f=(-4;-6)$, không phải hướng thẳng tới gốc $(-2;-1)$. Đạo hàm theo hướng $\nabla f\cdot\mathbf{u}=|\nabla f|\cos\theta$ nhỏ nhất khi $\theta=180^\circ$.`, R`The fastest decrease is $-\nabla f=(-4;-6)$, not the direction straight to the origin $(-2;-1)$. The directional derivative $\nabla f\cdot\mathbf{u}=|\nabla f|\cos\theta$ is smallest when $\theta=180^\circ$.`],
};

const saddle: DiscoverCard = {
  id: "calc-saddle",
  title: ["Đoán trước: gốc của $f=x^2-y^2$ là gì?", "Guess first: what is the origin for $f=x^2-y^2$?"],
  question: [
    R`Hàm $f(x;y)=x^2-y^2$ có $f_x=2x$ và $f_y=-2y$, cả hai bằng $0$ tại gốc. Theo bạn, gốc là điểm gì của $f$?`,
    R`The function $f(x;y)=x^2-y^2$ has $f_x=2x$ and $f_y=-2y$, both $0$ at the origin. What kind of point do you think the origin is?`,
  ],
  options: [
    { label: ["Cực tiểu", "A minimum"], hint: [R`Cực tiểu thì mọi hướng đều đi lên từ gốc. Thử $f(0;0{,}1)$.`, R`At a minimum every direction goes up from the origin. Try $f(0;0.1)$.`] },
    { label: ["Cực đại", "A maximum"], hint: [R`Cực đại thì mọi hướng đều đi xuống từ gốc. Thử $f(0{,}1;0)$.`, R`At a maximum every direction goes down from the origin. Try $f(0.1;0)$.`] },
    { label: ["Không phải cực trị (điểm yên)", "Not an extremum (a saddle point)"], hint: [R``, R``] },
  ],
  answer: () => {
    const h = hessian2D((x, y) => x * x - y * y, 0, 0);
    const kind = classifyStationary(h.fxx, h.fyy, h.fxy);
    return kind === "min" ? 0 : kind === "max" ? 1 : 2;
  },
  numbers: () => [`$f(0{,}1;0)=${fmt(0.01, 2)}>0$ còn $f(0;0{,}1)=${fmt(-0.01, 2)}<0$ ở hai phía của gốc. Hessian có $D=2\\cdot(-2)-0=-4<0$.`, `$f(0.1;0)=${fmt(0.01, 2)}>0$ while $f(0;0.1)=${fmt(-0.01, 2)}<0$ on two sides of the origin. The Hessian has $D=2\\cdot(-2)-0=-4<0$.`],
  reveal: [R`Gradient bằng $0$ chỉ là điều kiện cần. Muốn biết loại điểm dừng phải xem số hạng bậc hai: $D<0$ nghĩa là có hướng đi lên lẫn hướng đi xuống, tức điểm yên.`, R`A zero gradient is only a necessary condition. To know the type of a stationary point we look at the quadratic term: $D<0$ means there are both upward and downward directions, a saddle.`],
};

const lagOptions = [1, 2, 4];
const lagrange: DiscoverCard = {
  id: "calc-lagrange",
  title: ["Đoán trước: giá trị nhỏ nhất của $x^2+y^2$ trên đường $x+y=2$", "Guess first: the minimum of $x^2+y^2$ on the line $x+y=2$"],
  question: [
    R`Trên đường thẳng $x+y=2$, các điểm $(2;0)$, $(0;2)$ cho $x^2+y^2=4$. Giá trị nhỏ nhất của $x^2+y^2$ trên cả đường thẳng này là bao nhiêu?`,
    R`On the line $x+y=2$ the points $(2;0)$ and $(0;2)$ give $x^2+y^2=4$. What is the minimum of $x^2+y^2$ over the whole line?`,
  ],
  options: lagOptions.map((v) => ({
    label: [`$${v}$`, `$${v}$`] as [string, string],
    hint: [R`Điểm làm $x^2+y^2$ nhỏ nhất là điểm của đường thẳng gần gốc nhất. Hãy thử điểm nằm giữa $(2;0)$ và $(0;2)$.`, R`The point minimising $x^2+y^2$ is the point of the line nearest the origin. Try the point midway between $(2;0)$ and $(0;2)$.`] as [string, string],
  })),
  answer: () => {
    let best = Infinity;
    for (let x = -5; x <= 5; x += 0.001) best = Math.min(best, x * x + (2 - x) ** 2);
    return lagOptions.indexOf(Math.round(best));
  },
  numbers: () => [`Từ $\\nabla f=(2x;2y)=\\lambda(1;1)$ ta có $x=y$, và ràng buộc cho $x=y=1$. Giá trị là $1^2+1^2=2$, còn $(2;0)$ cho $4$.`, `From $\\nabla f=(2x;2y)=\\lambda(1;1)$ we get $x=y$, and the constraint gives $x=y=1$. The value is $1^2+1^2=2$, while $(2;0)$ gives $4$.`],
  reveal: [R`Tại điểm tối ưu, gradient $\nabla f$ song song với gradient của ràng buộc $\nabla g$: đường đồng mức của $f$ vừa chạm đường ràng buộc. Đó là điều kiện Lagrange $\nabla f=\lambda\nabla g$.`, R`At the optimum the gradient $\nabla f$ is parallel to the gradient of the constraint $\nabla g$: a level curve of $f$ just touches the constraint line. This is the Lagrange condition $\nabla f=\lambda\nabla g$.`],
};

export const CALC_CARDS = { harmonic, taylor, descent, saddle, lagrange };

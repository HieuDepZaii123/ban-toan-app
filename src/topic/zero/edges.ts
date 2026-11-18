const R = String.raw;

/** Mối nối giữa hai chuyên đề: id hai đầu, nội dung tiếng Việt và tiếng Anh. */
export type Edge = { a: string; b: string; vi: string; en: string };

export const EDGES: Edge[] = [
  { a: "quadratic", b: "derivative", vi: R`Đỉnh parabol là chỗ $y'=0$, và đạo hàm của hàm bậc hai là hàm bậc nhất $2ax+b$.`, en: R`The vertex of a parabola is where $y'=0$, and the derivative of a quadratic is the linear function $2ax+b$.` },
  { a: "quadratic", b: "ineq", vi: R`Hoàn thiện bình phương là công cụ chứng minh bất đẳng thức và tìm giá trị nhỏ nhất.`, en: R`Completing the square is the tool for proving inequalities and finding minimum values.` },
  { a: "quadratic", b: "analytic", vi: R`Parabol cắt đường thẳng giải bằng biệt thức; đường tròn là phương trình bậc hai theo hai biến.`, en: R`A parabola meeting a line is solved with the discriminant; a circle is a quadratic equation in two variables.` },
  { a: "quadratic", b: "survey", vi: R`Hàm bậc hai là trường hợp đơn giản nhất của khảo sát hàm số: đúng một cực trị.`, en: R`The quadratic is the simplest case of studying a function: exactly one extremum.` },
  { a: "quadratic", b: "sequence", vi: R`Tổng của cấp số cộng $S_n$ là một hàm bậc hai của $n$ (không có hạng tử tự do).`, en: R`The sum $S_n$ of an arithmetic sequence is a quadratic function of $n$ (with no constant term).` },
  { a: "quadratic", b: "combo", vi: R`$C_n^2=\frac{n(n-1)}{2}$ là hàm bậc hai của $n$: số cặp tăng như bình phương số người.`, en: R`$C_n^2=\frac{n(n-1)}{2}$ is quadratic in $n$: the number of pairs grows like the square of the number of people.` },
  { a: "ineq", b: "derivative", vi: R`Giá trị nhỏ nhất tìm bằng bất đẳng thức hay bằng đạo hàm đều ra cùng đáp số: hai cách soi cùng một đáy.`, en: R`A minimum found by an inequality or by a derivative gives the same answer: two ways of looking at the same bottom.` },
  { a: "ineq", b: "vector", vi: R`Bất đẳng thức Cauchy–Schwarz chính là $|\vec{u}\cdot\vec{v}|\le|\vec{u}||\vec{v}|$.`, en: R`The Cauchy–Schwarz inequality is exactly $|\vec{u}\cdot\vec{v}|\le|\vec{u}||\vec{v}|$.` },
  { a: "ineq", b: "limit", vi: R`Định lí kẹp dùng bất đẳng thức để tính giới hạn mà không cần biết giá trị từng điểm.`, en: R`The squeeze theorem uses inequalities to compute limits without knowing the value at every point.` },
  { a: "ineq", b: "triangle", vi: R`Bất đẳng thức tam giác $a<b+c$: đường thẳng là đường ngắn nhất.`, en: R`The triangle inequality $a<b+c$: a straight line is the shortest path.` },
  { a: "exp", b: "derivative", vi: R`$(e^x)'=e^x$ và $(a^x)'=a^x\ln a$: hàm mũ có tốc độ tăng tỉ lệ với chính nó.`, en: R`$(e^x)'=e^x$ and $(a^x)'=a^x\ln a$: the exponential's growth rate is proportional to itself.` },
  { a: "exp", b: "integral", vi: R`Nguyên hàm của $e^x$ là $e^x$, và $\int\frac{dx}{x}=\ln|x|$ nối logarit với tích phân.`, en: R`The antiderivative of $e^x$ is $e^x$, and $\int\frac{dx}{x}=\ln|x|$ links the logarithm to the integral.` },
  { a: "exp", b: "sequence", vi: R`Cấp số nhân $u_n=u_1q^{n-1}$ là hàm mũ theo chỉ số $n$; lãi kép là một cấp số nhân.`, en: R`A geometric sequence $u_n=u_1q^{n-1}$ is an exponential in the index $n$; compound interest is a geometric sequence.` },
  { a: "exp", b: "limit", vi: R`Số $e$ là giới hạn $\lim(1+\frac{1}{n})^n$ của lãi kép chia nhỏ vô hạn.`, en: R`The number $e$ is the limit $\lim(1+\frac{1}{n})^n$ of compound interest split infinitely finely.` },
  { a: "exp", b: "probability", vi: R`Xác suất «ít nhất một lần» là $1-(1-p)^n$; phân rã phóng xạ là hàm mũ.`, en: R`The probability of «at least once» is $1-(1-p)^n$; radioactive decay is exponential.` },
  { a: "sequence", b: "limit", vi: R`Giới hạn của dãy là khái niệm gốc; tổng vô hạn của cấp số nhân là giới hạn của tổng riêng.`, en: R`The limit of a sequence is the root concept; the infinite sum of a geometric series is the limit of its partial sums.` },
  { a: "sequence", b: "integral", vi: R`Các tổng Riemann tạo thành một dãy số, và tích phân là giới hạn của dãy ấy.`, en: R`Riemann sums form a sequence of numbers, and the integral is the limit of that sequence.` },
  { a: "sequence", b: "combo", vi: R`Dãy truy hồi như Fibonacci xuất hiện khi đếm; quy nạp là công cụ chứng minh chung cho cả hai.`, en: R`Recurrences like Fibonacci appear in counting; induction is the common proof tool for both.` },
  { a: "trig", b: "vector", vi: R`$\cos\varphi$ là tích vô hướng của hai vectơ đơn vị; quay vectơ cho công thức cộng.`, en: R`$\cos\varphi$ is the dot product of two unit vectors; rotating a vector gives the addition formulas.` },
  { a: "trig", b: "triangle", vi: R`Định lí cosin và định lí sin là lượng giác trong tam giác; diện tích $\frac{1}{2}bc\sin A$.`, en: R`The cosine and sine rules are trigonometry inside a triangle; the area is $\frac{1}{2}bc\sin A$.` },
  { a: "trig", b: "derivative", vi: R`$(\sin x)'=\cos x$ và $(\cos x)'=-\sin x$: đạo hàm của sóng là sóng lệch pha.`, en: R`$(\sin x)'=\cos x$ and $(\cos x)'=-\sin x$: the derivative of a wave is a phase-shifted wave.` },
  { a: "trig", b: "integral", vi: R`Công thức hạ bậc $\sin^2a=\frac{1-\cos 2a}{2}$ biến tích phân bình phương thành tích phân đơn giản.`, en: R`The power-reduction formula $\sin^2a=\frac{1-\cos 2a}{2}$ turns an integral of a square into a simple integral.` },
  { a: "trig", b: "analytic", vi: R`Góc giữa hai đường thẳng tính qua cosin của góc giữa hai pháp tuyến.`, en: R`The angle between two lines is computed through the cosine of the angle between their normals.` },
  { a: "limit", b: "derivative", vi: R`Đạo hàm là giới hạn của độ dốc cát tuyến khi bước nhảy co về 0.`, en: R`The derivative is the limit of the secant slope as the step shrinks to 0.` },
  { a: "limit", b: "integral", vi: R`Tích phân là giới hạn của tổng các dải mỏng khi số dải tăng vô hạn.`, en: R`The integral is the limit of a sum of thin strips as their number grows without bound.` },
  { a: "limit", b: "survey", vi: R`Tiệm cận đứng và ngang của đồ thị đều là giới hạn.`, en: R`Vertical and horizontal asymptotes of a graph are both limits.` },
  { a: "derivative", b: "survey", vi: R`Khảo sát hàm số là đọc dấu của đạo hàm để biết chỗ lên, xuống và quay đầu.`, en: R`Studying a function is reading the sign of the derivative to know where it rises, falls and turns.` },
  { a: "derivative", b: "integral", vi: R`Định lí cơ bản của giải tích: tích phân và đạo hàm là hai phép toán ngược nhau.`, en: R`The fundamental theorem of calculus: the integral and the derivative are inverse operations.` },
  { a: "survey", b: "integral", vi: R`Diện tích giữa hai đồ thị cần biết đồ thị nằm trên, nằm dưới ở đâu: đọc từ khảo sát.`, en: R`The area between two graphs needs to know where each lies above or below: read from the study of the functions.` },
  { a: "vector", b: "analytic", vi: R`Pháp tuyến, chỉ phương, tích vô hướng và tích có hướng là công cụ của hình giải tích.`, en: R`Normal, direction vector, dot product and cross product are the tools of analytic geometry.` },
  { a: "vector", b: "triangle", vi: R`Trọng tâm, trung điểm bằng vectơ; định lí cosin là $|\vec{u}-\vec{v}|^2$ khai triển bằng tích vô hướng.`, en: R`Centroid and midpoint through vectors; the cosine rule is $|\vec{u}-\vec{v}|^2$ expanded with the dot product.` },
  { a: "analytic", b: "triangle", vi: R`Toạ độ hoá hình học: bốn tâm của tam giác và khoảng cách trong không gian tính bằng toạ độ.`, en: R`Coordinatising geometry: the four centres of a triangle and distances in space computed from coordinates.` },
  { a: "combo", b: "probability", vi: R`Xác suất cổ điển là đếm: số trường hợp thuận lợi chia tổng số trường hợp.`, en: R`Classical probability is counting: favourable cases divided by all cases.` },
  { a: "integral", b: "probability", vi: R`Diện tích dưới đường chuông là xác suất; phân phối liên tục tính bằng tích phân.`, en: R`The area under the bell curve is a probability; continuous distributions are computed with integrals.` },
  { a: "integral", b: "triangle", vi: R`Thể tích khối tròn xoay là tích phân của diện tích mặt cắt; công thức hình cầu, hình nón suy ra từ đó.`, en: R`The volume of a solid of revolution is the integral of the cross-section area; the sphere and cone formulas follow from it.` },
  { a: "combo", b: "exp", vi: R`Tổng các hệ số nhị thức là $2^n$; tăng trưởng số cách chọn là hàm mũ.`, en: R`The binomial coefficients add to $2^n$; the number of selections grows exponentially.` },
];

export function edgesOf(id: string): Edge[] {
  return EDGES.filter((e) => e.a === id || e.b === id);
}

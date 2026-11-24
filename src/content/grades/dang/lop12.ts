import type { GradeDang } from "./types.ts";
import { b } from "./types.ts";

const R = String.raw;

const lop12: GradeDang[] = [
  {
    name: b(R`Xét tính đơn điệu và tìm tham số`, R`Monotonicity and finding a parameter`),
    spot: b(R`Hỏi khoảng đồng biến, nghịch biến, hoặc tìm $m$ để hàm đơn điệu trên một khoảng.`, R`Asks for intervals of increase or decrease, or for $m$ so that a function is monotonic on an interval.`),
    method: [
      b(R`Tính đạo hàm và tìm các điểm làm đạo hàm bằng $0$.`, R`Differentiate and find where the derivative is $0$.`),
      b(R`Xét dấu đạo hàm trên từng khoảng; với tham số thì đặt điều kiện cho dấu đạo hàm trên khoảng đã cho.`, R`Study the sign of the derivative on each interval; with a parameter, impose a condition on its sign on the given interval.`),
    ],
    example: {
      prompt: b(R`Tìm các khoảng đồng biến của $y=x^3-3x^2-9x+1$.`, R`Find the intervals of increase of $y=x^3-3x^2-9x+1$.`),
      steps: [
        b(R`Đạo hàm $y'=3x^2-6x-9=3(x+1)(x-3)$, bằng $0$ tại $-1$ và $3$.`, R`The derivative $y'=3x^2-6x-9=3(x+1)(x-3)$ is $0$ at $-1$ and $3$.`),
        b(R`Dấu của $y'$ dương ngoài hai nghiệm, nên hàm đồng biến trên $(-\infty;-1)$ và $(3;+\infty)$.`, R`The sign of $y'$ is positive outside the roots, so the function increases on $(-\infty,-1)$ and $(3,+\infty)$.`),
      ],
      ket: b(R`Hàm đồng biến trên $(-\infty;-1)$ và $(3;+\infty)$.`, R`The function increases on $(-\infty,-1)$ and $(3,+\infty)$.`),
      checks: [{ expr: "expand(3*(x+1)*(x-3))", expect: "3*x**2-6*x-9" }],
    },
    mistake: b(R`Kết luận theo giá trị tại vài điểm thay vì xét dấu đạo hàm.`, R`Concluding from values at a few points instead of the sign of the derivative.`),
    drill: { prompt: b(R`Hàm $y=-x^2+4x$ đồng biến trên khoảng nào?`, R`On which interval does $y=-x^2+4x$ increase?`), answer: b(R`Trên $(-\infty;2)$.`, R`On $(-\infty,2)$.`), checks: [{ expr: "diff(-x**2+4*x,x).subs(x,2)", expect: "0" }] },
  },
  {
    name: b(R`Tìm cực trị của hàm số`, R`Finding extrema of a function`),
    spot: b(R`Đề hỏi điểm cực đại, cực tiểu, giá trị cực trị, hoặc số điểm cực trị.`, R`Asks for local maxima or minima, their values, or how many there are.`),
    method: [
      b(R`Giải $f'(x)=0$ để có các điểm dừng.`, R`Solve $f'(x)=0$ for the stationary points.`),
      b(R`Xét dấu $f'$ quanh mỗi điểm: đổi từ dương sang âm là cực đại, từ âm sang dương là cực tiểu.`, R`Check the sign of $f'$ around each: positive to negative is a maximum, negative to positive a minimum.`),
    ],
    example: {
      prompt: b(R`Tìm cực trị của $y=x^3-3x^2+2$.`, R`Find the extrema of $y=x^3-3x^2+2$.`),
      steps: [
        b(R`Đạo hàm $y'=3x(x-2)$, bằng $0$ tại $x=0$ và $x=2$.`, R`The derivative $y'=3x(x-2)$ is $0$ at $x=0$ and $x=2$.`),
        b(R`Đạo hàm $y'$ đổi từ dương sang âm tại $0$ (cực đại, $y=2$) và từ âm sang dương tại $2$ (cực tiểu, $y=-2$).`, R`The derivative $y'$ goes from positive to negative at $0$ (a maximum, $y=2$) and from negative to positive at $2$ (a minimum, $y=-2$).`),
      ],
      ket: b(R`Cực đại $2$ tại $x=0$, cực tiểu $-2$ tại $x=2$.`, R`The maximum is $2$ at $x=0$ and the minimum is $-2$ at $x=2$.`),
      checks: [{ expr: "(x**3-3*x**2+2).subs(x,0)", expect: "2" }, { expr: "(x**3-3*x**2+2).subs(x,2)", expect: "-2" }],
    },
    mistake: b(R`Coi mọi nghiệm của $f'(x)=0$ là cực trị.`, R`Treating every root of $f'(x)=0$ as an extremum.`),
    drill: { prompt: b(R`Hàm $y=x^3-3x$ có cực đại bằng bao nhiêu?`, R`What is the local maximum of $y=x^3-3x$?`), answer: b(R`Bằng $2$, tại $x=-1$.`, R`It is $2$, at $x=-1$.`), checks: [{ expr: "(x**3-3*x).subs(x,-1)", expect: "2" }] },
  },
  {
    name: b(R`Giá trị lớn nhất, nhỏ nhất trên một đoạn`, R`Greatest and least values on an interval`),
    spot: b(R`Có "trên đoạn $[a;b]$", hoặc bài toán tối ưu (diện tích, chi phí lớn nhất).`, R`The phrase "on $[a,b]$", or an optimisation (largest area, lowest cost).`),
    method: [
      b(R`Tìm các điểm dừng nằm trong đoạn.`, R`Find the stationary points inside the interval.`),
      b(R`So sánh giá trị tại các điểm dừng và hai đầu mút.`, R`Compare the values at the stationary points and the two endpoints.`),
    ],
    example: {
      prompt: b(R`Tìm giá trị lớn nhất và nhỏ nhất của $y=x^3-3x+1$ trên $[0;2]$.`, R`Find the maximum and minimum of $y=x^3-3x+1$ on $[0,2]$.`),
      steps: [
        b(R`Ta có $y'=3x^2-3$ bằng $0$ tại $x=1$ (nằm trong đoạn).`, R`We have $y'=3x^2-3$ equal to $0$ at $x=1$ (inside the interval).`),
        b(R`So sánh $y(0)=1$, $y(1)=-1$, $y(2)=3$.`, R`Compare $y(0)=1$, $y(1)=-1$, $y(2)=3$.`),
      ],
      ket: b(R`Giá trị lớn nhất là $3$ và nhỏ nhất là $-1$.`, R`The maximum is $3$ and the minimum is $-1$.`),
      checks: [{ expr: "Max((x**3-3*x+1).subs(x,0),(x**3-3*x+1).subs(x,1),(x**3-3*x+1).subs(x,2))", expect: "3" }, { expr: "(x**3-3*x+1).subs(x,1)", expect: "-1" }],
    },
    mistake: b(R`Quên tính giá trị tại hai đầu mút.`, R`Forgetting the values at the endpoints.`),
    drill: { prompt: b(R`Tìm giá trị lớn nhất của $y=-x^2+4x$ trên $[0;3]$.`, R`Find the maximum of $y=-x^2+4x$ on $[0,3]$.`), answer: b(R`Bằng $4$, tại $x=2$.`, R`It is $4$, at $x=2$.`), checks: [{ expr: "(-x**2+4*x).subs(x,2)", expect: "4" }] },
  },
  {
    name: b(R`Tìm tiệm cận của đồ thị hàm số`, R`Finding asymptotes`),
    spot: b(R`Hàm phân thức hoặc hàm có căn, hỏi đường tiệm cận đứng, ngang.`, R`A rational function or a function with roots, asking for vertical or horizontal asymptotes.`),
    method: [
      b(R`Tiệm cận ngang: tính giới hạn khi $x\to\pm\infty$.`, R`Horizontal: find the limits as $x\to\pm\infty$.`),
      b(R`Tiệm cận đứng: tìm $x_0$ làm mẫu bằng $0$ và có giới hạn một bên bằng vô cực.`, R`Vertical: find $x_0$ making the denominator $0$ with an infinite one-sided limit.`),
    ],
    example: {
      prompt: b(R`Tìm các đường tiệm cận của $y=\frac{2x+1}{x-3}$.`, R`Find the asymptotes of $y=\frac{2x+1}{x-3}$.`),
      steps: [
        b(R`Khi $x\to\pm\infty$, $y\to 2$, nên $y=2$ là tiệm cận ngang.`, R`As $x\to\pm\infty$, $y\to 2$, so $y=2$ is a horizontal asymptote.`),
        b(R`Khi $x\to 3^+$, tử tiến tới $7$ và mẫu về $0^+$, nên $y\to+\infty$; vậy $x=3$ là tiệm cận đứng.`, R`As $x\to 3^+$, the numerator tends to $7$ and the denominator to $0^+$, so $y\to+\infty$; hence $x=3$ is a vertical asymptote.`),
      ],
      ket: b(R`Tiệm cận ngang $y=2$ và tiệm cận đứng $x=3$.`, R`The horizontal asymptote is $y=2$ and the vertical one is $x=3$.`),
      checks: [{ expr: "limit((2*x+1)/(x-3),x,oo)", expect: "2" }, { expr: "limit((2*x+1)/(x-3),x,3,'+')", expect: "oo" }],
    },
    mistake: b(R`Coi mọi nghiệm của mẫu là tiệm cận đứng mà không rút gọn.`, R`Treating every root of the denominator as a vertical asymptote without simplifying.`),
    drill: { prompt: b(R`Tiệm cận ngang của $y=\frac{3x+1}{x}$ khi $x\to+\infty$ là gì?`, R`What is the horizontal asymptote of $y=\frac{3x+1}{x}$ as $x\to+\infty$?`), answer: b(R`Đường $y=3$.`, R`The line $y=3$.`), checks: [{ expr: "limit((3*x+1)/x,x,oo)", expect: "3" }] },
  },
  {
    name: b(R`Tìm nguyên hàm`, R`Finding antiderivatives`),
    spot: b(R`Đề hỏi $\int f(x)\,dx$, hoặc tìm $F$ thỏa một điều kiện.`, R`Asks for $\int f(x)\,dx$, or for an $F$ meeting a condition.`),
    method: [
      b(R`Dùng bảng nguyên hàm cơ bản và tính tuyến tính; hàm hợp bậc nhất thì chia cho hệ số của $x$.`, R`Use the basic table and linearity; for a linear inner function, divide by the coefficient of $x$.`),
      b(R`Cộng hằng số $C$; có điều kiện thì thay vào để tìm $C$.`, R`Add the constant $C$; with a condition, substitute to find $C$.`),
    ],
    example: {
      prompt: b(R`Tìm nguyên hàm $F$ của $f(x)=6x^2-4x+1$ với $F(1)=3$.`, R`Find the antiderivative $F$ of $f(x)=6x^2-4x+1$ with $F(1)=3$.`),
      steps: [
        b(R`Mọi nguyên hàm có dạng $F=2x^3-2x^2+x+C$.`, R`Every antiderivative has the form $F=2x^3-2x^2+x+C$.`),
        b(R`Điều kiện $F(1)=1+C=3$ cho $C=2$.`, R`The condition $F(1)=1+C=3$ gives $C=2$.`),
      ],
      ket: b(R`Nguyên hàm cần tìm là $F=2x^3-2x^2+x+2$.`, R`The required antiderivative is $F=2x^3-2x^2+x+2$.`),
      checks: [{ expr: "diff(2*x**3-2*x**2+x+2,x)", expect: "6*x**2-4*x+1" }, { expr: "(2*x**3-2*x**2+x+2).subs(x,1)", expect: "3" }],
    },
    mistake: b(R`Quên hằng số $C$.`, R`Forgetting the constant $C$.`),
    drill: { prompt: b(R`Tìm $\int\cos(3x)\,dx$.`, R`Find $\int\cos(3x)\,dx$.`), answer: b(R`Bằng $\frac{1}{3}\sin 3x+C$.`, R`It is $\frac{1}{3}\sin 3x+C$.`), checks: [{ expr: "diff(sin(3*x)/3,x)", expect: "cos(3*x)" }] },
  },
  {
    name: b(R`Tính tích phân bằng nguyên hàm, đổi biến và từng phần`, R`Computing integrals by antiderivatives, substitution and parts`),
    spot: b(R`Tích phân xác định, có thể kèm hàm hợp hoặc tích của hai loại hàm.`, R`A definite integral, possibly with a composite function or a product of two kinds of function.`),
    method: [
      b(R`Tìm nguyên hàm $F$ rồi tính $F(b)-F(a)$.`, R`Find an antiderivative $F$ and compute $F(b)-F(a)$.`),
      b(R`Có hàm hợp thì đặt $u$ và đổi cận; có tích thì dùng từng phần $\int u\,dv=uv-\int v\,du$.`, R`For a composite, set $u$ and change limits; for a product use parts $\int u\,dv=uv-\int v\,du$.`),
    ],
    example: {
      prompt: b(R`Tính $\int_0^1 x e^{x}\,dx$.`, R`Compute $\int_0^1 x e^{x}\,dx$.`),
      steps: [
        b(R`Từng phần với $u=x$, $dv=e^x\,dx$: $[xe^x]_0^1-\int_0^1 e^x\,dx$.`, R`By parts with $u=x$, $dv=e^x\,dx$: $[xe^x]_0^1-\int_0^1 e^x\,dx$.`),
        b(R`Tính: $e-(e-1)=1$.`, R`Compute: $e-(e-1)=1$.`),
      ],
      ket: b(R`Tích phân bằng $1$.`, R`The integral equals $1$.`),
      checks: [{ expr: "integrate(x*exp(x),(x,0,1))", expect: "1" }],
    },
    mistake: b(R`Tính $F(a)-F(b)$ thay vì $F(b)-F(a)$.`, R`Computing $F(a)-F(b)$ instead of $F(b)-F(a)$.`),
    drill: { prompt: b(R`Tính $\int_0^{\pi}\sin x\,dx$.`, R`Compute $\int_0^{\pi}\sin x\,dx$.`), answer: b(R`Bằng $2$.`, R`It is $2$.`), checks: [{ expr: "integrate(sin(x),(x,0,pi))", expect: "2" }] },
  },
  {
    name: b(R`Diện tích hình phẳng`, R`Area of a plane region`),
    spot: b(R`Hình giới hạn bởi hai đồ thị, hoặc đồ thị và trục hoành.`, R`A region bounded by two graphs, or by a graph and the horizontal axis.`),
    method: [
      b(R`Giải phương trình hoành độ giao điểm để tìm hai cận.`, R`Solve for the intersection points to get the two limits.`),
      b(R`Diện tích bằng tích phân của hàm trên trừ hàm dưới; đổi dấu thì chia đoạn.`, R`The area is the integral of the upper function minus the lower one; split where they swap.`),
    ],
    example: {
      prompt: b(R`Tính diện tích hình phẳng giới hạn bởi $y=x^2$ và $y=2x$.`, R`Find the area of the region bounded by $y=x^2$ and $y=2x$.`),
      steps: [
        b(R`Giao điểm: $x^2=2x$, nên $x=0$ và $x=2$; trên $[0;2]$ đường $y=2x$ nằm trên.`, R`Intersections: $x^2=2x$, so $x=0$ and $x=2$; on $[0,2]$ the line $y=2x$ is above.`),
        b(R`Diện tích bằng $\int_0^2(2x-x^2)\,dx=4-\frac{8}{3}=\frac{4}{3}$.`, R`The area is $\int_0^2(2x-x^2)\,dx=4-\frac{8}{3}=\frac{4}{3}$.`),
      ],
      ket: b(R`Diện tích bằng $\frac{4}{3}$.`, R`The area is $\frac{4}{3}$.`),
      checks: [{ expr: "integrate(2*x-x**2,(x,0,2))", expect: "Rational(4,3)" }],
    },
    mistake: b(R`Lấy tích phân trực tiếp khi đồ thị có phần dưới trục hoành.`, R`Integrating directly when part of the graph is below the horizontal axis.`),
    drill: { prompt: b(R`Tính diện tích dưới $y=3x^2$ từ $0$ đến $1$.`, R`Find the area under $y=3x^2$ from $0$ to $1$.`), answer: b(R`Bằng $1$.`, R`It is $1$.`), checks: [{ expr: "integrate(3*x**2,(x,0,1))", expect: "1" }] },
  },
  {
    name: b(R`Thể tích khối tròn xoay`, R`Volume of a solid of revolution`),
    spot: b(R`Có "quay quanh trục $Ox$" một hình phẳng.`, R`The phrase "rotated about the $Ox$ axis" for a plane region.`),
    method: [
      b(R`Xác định hàm biên $y=f(x)$ và hai cận.`, R`Identify the boundary function $y=f(x)$ and the two limits.`),
      b(R`Tính $V=\pi\int_a^b\bigl(f(x)\bigr)^2\,dx$; nếu có hai hàm thì lấy hiệu hai bình phương.`, R`Compute $V=\pi\int_a^b\bigl(f(x)\bigr)^2\,dx$; with two functions, take the difference of squares.`),
    ],
    example: {
      prompt: b(R`Quay hình giới hạn bởi $y=\sqrt{x}$, $y=0$, $x=4$ quanh $Ox$. Tính thể tích.`, R`Rotate the region bounded by $y=\sqrt{x}$, $y=0$, $x=4$ about $Ox$. Find the volume.`),
      steps: [
        b(R`Bình phương hàm biên là $x$, và cận từ $0$ đến $4$.`, R`The squared boundary function is $x$, with limits from $0$ to $4$.`),
        b(R`Thể tích là $V=\pi\int_0^4 x\,dx=\pi\cdot 8=8\pi$.`, R`The volume is $V=\pi\int_0^4 x\,dx=\pi\cdot 8=8\pi$.`),
      ],
      ket: b(R`Thể tích bằng $8\pi$.`, R`The volume is $8\pi$.`),
      checks: [{ expr: "pi*integrate(x,(x,0,4))", expect: "8*pi" }],
    },
    mistake: b(R`Quên bình phương hàm số hoặc quên nhân với $\pi$.`, R`Forgetting to square the function or to multiply by $\pi$.`),
    drill: { prompt: b(R`Quay $y=x$ với $0\le x\le 3$ quanh $Ox$. Tính thể tích.`, R`Rotate $y=x$ for $0\le x\le 3$ about $Ox$. Find the volume.`), answer: b(R`Bằng $9\pi$.`, R`It is $9\pi$.`), checks: [{ expr: "pi*integrate(x**2,(x,0,3))", expect: "9*pi" }] },
  },
  {
    name: b(R`Phương trình mặt phẳng, đường thẳng, mặt cầu trong không gian $Oxyz$`, R`Planes, lines and spheres in $Oxyz$ space`),
    spot: b(R`Có tọa độ điểm, vectơ trong không gian, hoặc hỏi phương trình, khoảng cách, giao điểm.`, R`Coordinates of points or vectors in space, asking for equations, distances or intersections.`),
    method: [
      b(R`Mặt phẳng qua $M_0$ có pháp tuyến $(a;b;c)$: $a(x-x_0)+b(y-y_0)+c(z-z_0)=0$.`, R`A plane through $M_0$ with normal $(a,b,c)$: $a(x-x_0)+b(y-y_0)+c(z-z_0)=0$.`),
      b(R`Khoảng cách từ điểm đến mặt phẳng là $\frac{|ax_0+by_0+cz_0+d|}{\sqrt{a^2+b^2+c^2}}$.`, R`The distance from a point to a plane is $\frac{|ax_0+by_0+cz_0+d|}{\sqrt{a^2+b^2+c^2}}$.`),
    ],
    example: {
      prompt: b(R`Tính khoảng cách từ $M(1;2;3)$ đến mặt phẳng $2x-y+2z-4=0$.`, R`Find the distance from $M(1,2,3)$ to the plane $2x-y+2z-4=0$.`),
      steps: [
        b(R`Tử là $|2\cdot 1-2+2\cdot 3-4|=2$.`, R`The numerator is $|2\cdot 1-2+2\cdot 3-4|=2$.`),
        b(R`Mẫu là $\sqrt{4+1+4}=3$, nên khoảng cách là $\frac{2}{3}$.`, R`The denominator is $\sqrt{4+1+4}=3$, so the distance is $\frac{2}{3}$.`),
      ],
      ket: b(R`Khoảng cách bằng $\frac{2}{3}$.`, R`The distance is $\frac{2}{3}$.`),
      checks: [{ expr: "Abs(2*1-2+2*3-4)/sqrt(2**2+1+2**2)", expect: "Rational(2,3)" }],
    },
    mistake: b(R`Quên chia cho độ dài của pháp tuyến.`, R`Forgetting to divide by the length of the normal.`),
    drill: { prompt: b(R`Tính độ dài vectơ $(2;3;6)$.`, R`Find the length of the vector $(2,3,6)$.`), answer: b(R`Bằng $7$.`, R`It is $7$.`), checks: [{ expr: "sqrt(2**2+3**2+6**2)", expect: "7" }] },
  },
  {
    name: b(R`Xác suất có điều kiện, công thức toàn phần và Bayes`, R`Conditional probability, total probability and Bayes`),
    spot: b(R`Có "biết rằng", hai nguồn hoặc hai máy, hoặc hỏi xác suất ngược "do nguồn nào".`, R`The words "given that", two sources or machines, or a reverse question "which source".`),
    method: [
      b(R`Vẽ sơ đồ cây với xác suất mỗi nhánh.`, R`Draw a tree diagram with each branch's probability.`),
      b(R`Dùng $P(A)=\sum P(A\mid B_i)P(B_i)$, rồi $P(B\mid A)=\frac{P(A\mid B)P(B)}{P(A)}$.`, R`Use $P(A)=\sum P(A\mid B_i)P(B_i)$, then $P(B\mid A)=\frac{P(A\mid B)P(B)}{P(A)}$.`),
    ],
    example: {
      prompt: b(R`Máy I làm $60\%$ sản phẩm với $2\%$ lỗi, máy II làm $40\%$ với $5\%$ lỗi. Một sản phẩm lỗi. Xác suất nó do máy II làm là bao nhiêu?`, R`Machine I makes $60\%$ of the products with $2\%$ defective, machine II makes $40\%$ with $5\%$ defective. A product is defective. What is the probability it came from machine II?`),
      steps: [
        b(R`Xác suất lỗi toàn phần: $0{,}6\cdot 0{,}02+0{,}4\cdot 0{,}05=0{,}032$.`, R`The total defect probability: $0.6\cdot 0.02+0.4\cdot 0.05=0.032$.`),
        b(R`Theo công thức Bayes: $\frac{0{,}4\cdot 0{,}05}{0{,}032}=0{,}625$.`, R`By Bayes' formula: $\frac{0.4\cdot 0.05}{0.032}=0.625$.`),
      ],
      ket: b(R`Xác suất bằng $0{,}625$.`, R`The probability is $0.625$.`),
      checks: [{ expr: "Rational(4,10)*Rational(5,100)/(Rational(6,10)*Rational(2,100)+Rational(4,10)*Rational(5,100))", expect: "Rational(625,1000)" }],
    },
    mistake: b(R`Nhầm $P(A\mid B)$ với $P(B\mid A)$.`, R`Confusing $P(A\mid B)$ with $P(B\mid A)$.`),
    drill: { prompt: b(R`Biết $P(A\cap B)=\frac{1}{6}$ và $P(B)=\frac{1}{3}$. Tính $P(A\mid B)$.`, R`Given $P(A\cap B)=\frac{1}{6}$ and $P(B)=\frac{1}{3}$, find $P(A\mid B)$.`), answer: b(R`Bằng $\frac{1}{2}$.`, R`It is $\frac{1}{2}$.`), checks: [{ expr: "Rational(1,6)/Rational(1,3)", expect: "Rational(1,2)" }] },
  },
  {
    name: b(R`Số nghiệm của phương trình bậc ba bằng đồ thị`, R`The number of roots of a cubic equation from its graph`),
    spot: b(R`Có phương trình dạng $f(x)=m$ hoặc hỏi số giao điểm của đồ thị với một đường thẳng nằm ngang.`, R`An equation of the form $f(x)=m$, or a question about the intersections of the graph with a horizontal line.`),
    method: [
      b(R`Tìm các điểm cực trị bằng $f'(x)=0$ và tính giá trị cực đại, cực tiểu.`, R`Find the extreme points from $f'(x)=0$ and compute the maximum and minimum values.`),
      b(R`So $m$ với hai giá trị đó: nằm giữa thì ba nghiệm, bằng một giá trị thì hai nghiệm, nằm ngoài thì một nghiệm.`, R`Compare $m$ with the two values: between them gives three roots, equal to one gives two roots, outside gives one root.`),
    ],
    example: {
      prompt: b(R`Phương trình $x^3-3x=1$ có bao nhiêu nghiệm thực?`, R`How many real roots does $x^3-3x=1$ have?`),
      steps: [
        b(R`Cực đại $f(-1)=2$ và cực tiểu $f(1)=-2$.`, R`The maximum is $f(-1)=2$ and the minimum is $f(1)=-2$.`),
        b(R`Vì $-2<1<2$ nên đường thẳng $y=1$ cắt đồ thị tại ba điểm.`, R`Since $-2<1<2$, the line $y=1$ meets the graph at three points.`),
      ],
      ket: b(R`Phương trình có $3$ nghiệm.`, R`The equation has $3$ roots.`),
      checks: [{ expr: "len(Poly(x**3-3*x-1, x).real_roots())", expect: "3" }],
    },
    mistake: b(R`Quên trường hợp $m$ bằng đúng giá trị cực trị, khi đó có một nghiệm kép.`, R`Forgetting the case where $m$ equals an extreme value exactly, which gives a double root.`),
    drill: { prompt: b(R`Phương trình $x^3-3x=-3$ có bao nhiêu nghiệm thực?`, R`How many real roots does $x^3-3x=-3$ have?`), answer: b(R`Có $1$ nghiệm.`, R`It has $1$ root.`), checks: [{ expr: "len(Poly(x**3-3*x+3, x).real_roots())", expect: "1" }] },
  },
  {
    name: b(R`Tích phân có giá trị tuyệt đối và diện tích giữa hai đồ thị`, R`Integrals with an absolute value and the area between two graphs`),
    spot: b(R`Có $|f(x)|$ dưới dấu tích phân, hoặc hai đồ thị cắt nhau nhiều lần trong khoảng cần tính diện tích.`, R`An $|f(x)|$ under the integral sign, or two graphs that cross several times in the interval whose area is wanted.`),
    method: [
      b(R`Giải $f(x)=0$, chia đoạn tại các nghiệm trong đoạn lấy tích phân.`, R`Solve $f(x)=0$ and split the interval at the roots inside it.`),
      b(R`Bỏ giá trị tuyệt đối theo dấu trên từng đoạn con rồi cộng các tích phân.`, R`Remove the absolute value according to the sign on each piece and add the integrals.`),
    ],
    example: {
      prompt: b(R`Tính $\int_0^3|x-1|\,dx$.`, R`Compute $\int_0^3|x-1|\,dx$.`),
      steps: [
        b(R`Chia tại $x=1$: $\int_0^1(1-x)\,dx=\frac{1}{2}$.`, R`Split at $x=1$: $\int_0^1(1-x)\,dx=\frac{1}{2}$.`),
        b(R`Và $\int_1^3(x-1)\,dx=2$, nên tổng là $\frac{5}{2}$.`, R`And $\int_1^3(x-1)\,dx=2$, so the total is $\frac{5}{2}$.`),
      ],
      ket: b(R`Giá trị bằng $\frac{5}{2}$.`, R`The value is $\frac{5}{2}$.`),
      checks: [{ expr: "integrate(Abs(x-1), (x, 0, 3))", expect: "Rational(5,2)" }],
    },
    mistake: b(R`Tính tích phân của $f$ trên cả đoạn rồi mới lấy giá trị tuyệt đối.`, R`Integrating $f$ over the whole interval and only then taking the absolute value.`),
    drill: { prompt: b(R`Tính $\int_0^4|x-2|\,dx$.`, R`Compute $\int_0^4|x-2|\,dx$.`), answer: b(R`Bằng $4$.`, R`It is $4$.`), checks: [{ expr: "integrate(2-x, (x, 0, 2))+integrate(x-2, (x, 2, 4))", expect: "4" }] },
  },
];

export default lop12;

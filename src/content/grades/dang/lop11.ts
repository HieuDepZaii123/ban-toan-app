import type { GradeDang } from "./types.ts";
import { b } from "./types.ts";

const R = String.raw;

const lop11: GradeDang[] = [
  {
    name: b(R`Đổi độ sang rađian và tính giá trị lượng giác`, R`Converting degrees to radians and finding trigonometric values`),
    spot: b(R`Góc cho bằng rađian, hoặc góc đặc biệt ở các góc phần tư khác nhau.`, R`An angle in radians, or special angles in different quadrants.`),
    method: [
      b(R`Đổi: nhân số độ với $\frac{\pi}{180}$; ngược lại nhân với $\frac{180}{\pi}$.`, R`Convert: multiply degrees by $\frac{\pi}{180}$; the other way, by $\frac{180}{\pi}$.`),
      b(R`Đưa về góc nhọn tương ứng rồi chọn dấu theo góc phần tư.`, R`Reduce to the matching acute angle and choose the sign by quadrant.`),
    ],
    example: {
      prompt: b(R`Tính $\sin\frac{5\pi}{6}$ và $\cos\frac{5\pi}{6}$.`, R`Find $\sin\frac{5\pi}{6}$ and $\cos\frac{5\pi}{6}$.`),
      steps: [
        b(R`Góc $\frac{5\pi}{6}$ ở góc phần tư thứ hai và bù với $\frac{\pi}{6}$.`, R`The angle $\frac{5\pi}{6}$ is in the second quadrant and supplementary to $\frac{\pi}{6}$.`),
        b(R`Sin giữ nguyên: $\frac{1}{2}$; côsin đổi dấu: $-\frac{\sqrt{3}}{2}$.`, R`Sine stays: $\frac{1}{2}$; cosine changes sign: $-\frac{\sqrt{3}}{2}$.`),
      ],
      ket: b(R`Sin bằng $\frac{1}{2}$ và côsin bằng $-\frac{\sqrt{3}}{2}$.`, R`The sine is $\frac{1}{2}$ and the cosine is $-\frac{\sqrt{3}}{2}$.`),
      checks: [{ expr: "sin(5*pi/6)", expect: "Rational(1,2)" }, { expr: "cos(5*pi/6)", expect: "-sqrt(3)/2" }],
    },
    mistake: b(R`Để máy tính ở chế độ độ khi góc cho bằng rađian.`, R`Leaving the calculator in degree mode when the angle is in radians.`),
    drill: { prompt: b(R`Đổi $135^\circ$ ra rađian.`, R`Convert $135^\circ$ to radians.`), answer: b(R`Bằng $\frac{3\pi}{4}$.`, R`It is $\frac{3\pi}{4}$.`), checks: [{ expr: "135*pi/180", expect: "3*pi/4" }] },
  },
  {
    name: b(R`Dùng công thức cộng, nhân đôi và biến đổi lượng giác`, R`Using addition and double-angle formulas`),
    spot: b(R`Có tổng hai góc, góc gấp đôi, hoặc biểu thức lượng giác cần rút gọn.`, R`A sum of two angles, a doubled angle, or a trigonometric expression to simplify.`),
    method: [
      b(R`Chọn công thức cộng, nhân đôi hoặc biến đổi tích thành tổng phù hợp.`, R`Choose the addition, double-angle or product-to-sum formula that fits.`),
      b(R`Thay giá trị góc đặc biệt rồi rút gọn.`, R`Substitute special-angle values then simplify.`),
    ],
    example: {
      prompt: b(R`Biết $\sin a=\frac{3}{5}$ với $0<a<\frac{\pi}{2}$. Tính $\sin 2a$.`, R`Given $\sin a=\frac{3}{5}$ with $0<a<\frac{\pi}{2}$, find $\sin 2a$.`),
      steps: [
        b(R`Góc nhọn nên $\cos a=\sqrt{1-\frac{9}{25}}=\frac{4}{5}$.`, R`The angle is acute so $\cos a=\sqrt{1-\frac{9}{25}}=\frac{4}{5}$.`),
        b(R`Nhân đôi: $\sin 2a=2\sin a\cos a=2\cdot\frac{3}{5}\cdot\frac{4}{5}=\frac{24}{25}$.`, R`Doubling: $\sin 2a=2\sin a\cos a=2\cdot\frac{3}{5}\cdot\frac{4}{5}=\frac{24}{25}$.`),
      ],
      ket: b(R`Ta có $\sin 2a=\frac{24}{25}$.`, R`We have $\sin 2a=\frac{24}{25}$.`),
      checks: [{ expr: "2*Rational(3,5)*Rational(4,5)", expect: "Rational(24,25)" }],
    },
    mistake: b(R`Viết $\sin(a+b)=\sin a+\sin b$.`, R`Writing $\sin(a+b)=\sin a+\sin b$.`),
    drill: { prompt: b(R`Tính $\cos 2a$ biết $\cos a=\frac{1}{3}$.`, R`Find $\cos 2a$ given $\cos a=\frac{1}{3}$.`), answer: b(R`Bằng $-\frac{7}{9}$.`, R`It is $-\frac{7}{9}$.`), checks: [{ expr: "2*Rational(1,3)**2-1", expect: "Rational(-7,9)" }] },
  },
  {
    name: b(R`Giải phương trình lượng giác cơ bản`, R`Solving basic trigonometric equations`),
    spot: b(R`Có $\sin x=m$, $\cos x=m$, $\tan x=m$ và đề hỏi họ nghiệm hoặc nghiệm trong một đoạn.`, R`An equation $\sin x=m$, $\cos x=m$ or $\tan x=m$ asking for the general solution or solutions in an interval.`),
    method: [
      b(R`Tìm một góc $\alpha$ thỏa phương trình.`, R`Find one angle $\alpha$ satisfying the equation.`),
      b(R`Viết họ nghiệm: $x=\alpha+k2\pi$ hoặc $x=\pi-\alpha+k2\pi$ (sin); $x=\pm\alpha+k2\pi$ (cos); $x=\alpha+k\pi$ (tan).`, R`Write the family: $x=\alpha+k2\pi$ or $x=\pi-\alpha+k2\pi$ (sin); $x=\pm\alpha+k2\pi$ (cos); $x=\alpha+k\pi$ (tan).`),
    ],
    example: {
      prompt: b(R`Giải $2\cos x-\sqrt{3}=0$ trên $[0;2\pi)$.`, R`Solve $2\cos x-\sqrt{3}=0$ on $[0,2\pi)$.`),
      steps: [
        b(R`Phương trình thành $\cos x=\frac{\sqrt{3}}{2}$, có $\alpha=\frac{\pi}{6}$.`, R`The equation becomes $\cos x=\frac{\sqrt{3}}{2}$, with $\alpha=\frac{\pi}{6}$.`),
        b(R`Họ nghiệm $x=\pm\frac{\pi}{6}+k2\pi$; trên $[0;2\pi)$ lấy $x=\frac{\pi}{6}$ và $x=\frac{11\pi}{6}$.`, R`The family is $x=\pm\frac{\pi}{6}+k2\pi$; on $[0,2\pi)$ take $x=\frac{\pi}{6}$ and $x=\frac{11\pi}{6}$.`),
      ],
      ket: b(R`Nghiệm là $\frac{\pi}{6}$ và $\frac{11\pi}{6}$.`, R`The solutions are $\frac{\pi}{6}$ and $\frac{11\pi}{6}$.`),
      checks: [{ expr: "cos(pi/6)-sqrt(3)/2", expect: "0" }, { expr: "cos(11*pi/6)-sqrt(3)/2", expect: "0" }],
    },
    mistake: b(R`Chỉ viết một họ nghiệm của phương trình sin.`, R`Writing only one family of solutions for a sine equation.`),
    drill: { prompt: b(R`Giải $\tan x=1$.`, R`Solve $\tan x=1$.`), answer: b(R`Họ nghiệm $x=\frac{\pi}{4}+k\pi$.`, R`The family is $x=\frac{\pi}{4}+k\pi$.`), checks: [{ expr: "tan(pi/4)", expect: "1" }] },
  },
  {
    name: b(R`Cấp số cộng và cấp số nhân`, R`Arithmetic and geometric sequences`),
    spot: b(R`Dãy có hiệu hoặc thương hai số hạng liên tiếp không đổi, hoặc hỏi tổng $n$ số hạng đầu.`, R`A sequence with constant difference or ratio, or a question on the sum of the first $n$ terms.`),
    method: [
      b(R`Xác định cấp số cộng (công sai $d$) hay nhân (công bội $q$).`, R`Decide whether it is arithmetic (common difference $d$) or geometric (ratio $q$).`),
      b(R`Dùng $u_n=u_1+(n-1)d$, $S_n=\frac{n}{2}(u_1+u_n)$, hoặc $u_n=u_1q^{n-1}$, $S_n=u_1\frac{1-q^n}{1-q}$.`, R`Use $u_n=u_1+(n-1)d$, $S_n=\frac{n}{2}(u_1+u_n)$, or $u_n=u_1q^{n-1}$, $S_n=u_1\frac{1-q^n}{1-q}$.`),
    ],
    example: {
      prompt: b(R`Cấp số nhân có $u_1=2$ và $q=3$. Tính $S_5$.`, R`A geometric sequence has $u_1=2$ and $q=3$. Find $S_5$.`),
      steps: [
        b(R`Dùng $S_5=u_1\frac{q^5-1}{q-1}$.`, R`Use $S_5=u_1\frac{q^5-1}{q-1}$.`),
        b(R`Thay số: $S_5=2\cdot\frac{243-1}{2}=242$.`, R`Substituting: $S_5=2\cdot\frac{243-1}{2}=242$.`),
      ],
      ket: b(R`Tổng bằng $242$.`, R`The sum is $242$.`),
      checks: [{ expr: "2*(3**5-1)/(3-1)", expect: "242" }],
    },
    mistake: b(R`Dùng $u_n=u_1+nd$ thay vì $(n-1)d$.`, R`Using $u_n=u_1+nd$ instead of $(n-1)d$.`),
    drill: { prompt: b(R`Cấp số cộng $u_1=5$, $d=3$. Tính $u_{10}$.`, R`An arithmetic sequence with $u_1=5$, $d=3$. Find $u_{10}$.`), answer: b(R`Bằng $32$.`, R`It is $32$.`), checks: [{ expr: "5+9*3", expect: "32" }] },
  },
  {
    name: b(R`Giới hạn của dãy số và tổng cấp số nhân lùi vô hạn`, R`Limits of sequences and infinite geometric sums`),
    spot: b(R`Có $\lim\frac{an^2+\ldots}{bn^2+\ldots}$, hoặc tổng vô hạn với $|q|<1$.`, R`A limit like $\lim\frac{an^2+\ldots}{bn^2+\ldots}$, or an infinite sum with $|q|<1$.`),
    method: [
      b(R`Chia tử và mẫu cho lũy thừa cao nhất của $n$ rồi cho $n\to\infty$.`, R`Divide numerator and denominator by the highest power of $n$ and let $n\to\infty$.`),
      b(R`Tổng vô hạn $S=\frac{u_1}{1-q}$ khi $|q|<1$.`, R`The infinite sum is $S=\frac{u_1}{1-q}$ when $|q|<1$.`),
    ],
    example: {
      prompt: b(R`Tính $\lim\frac{3n^2+5n}{2n^2-1}$.`, R`Find $\lim\frac{3n^2+5n}{2n^2-1}$.`),
      steps: [
        b(R`Chia tử và mẫu cho $n^2$: $\frac{3+\frac{5}{n}}{2-\frac{1}{n^2}}$.`, R`Divide numerator and denominator by $n^2$: $\frac{3+\frac{5}{n}}{2-\frac{1}{n^2}}$.`),
        b(R`Khi $n\to\infty$ các phân số nhỏ về $0$, giới hạn bằng $\frac{3}{2}$.`, R`As $n\to\infty$ the small fractions go to $0$, so the limit is $\frac{3}{2}$.`),
      ],
      ket: b(R`Giới hạn bằng $\frac{3}{2}$.`, R`The limit is $\frac{3}{2}$.`),
      checks: [{ expr: "limit((3*n**2+5*n)/(2*n**2-1),n,oo)", expect: "Rational(3,2)" }],
    },
    mistake: b(R`Dùng tổng vô hạn khi $|q|\ge 1$.`, R`Using the infinite-sum formula when $|q|\ge 1$.`),
    drill: { prompt: b(R`Tính tổng $1+\frac{1}{3}+\frac{1}{9}+\cdots$.`, R`Find the sum $1+\frac{1}{3}+\frac{1}{9}+\cdots$.`), answer: b(R`Bằng $\frac{3}{2}$.`, R`It is $\frac{3}{2}$.`), checks: [{ expr: "1/(1-Rational(1,3))", expect: "Rational(3,2)" }] },
  },
  {
    name: b(R`Giới hạn hàm số và tính liên tục`, R`Limits of functions and continuity`),
    spot: b(R`Có $\lim_{x\to a}$ dạng $\frac{0}{0}$, giới hạn một bên, hoặc tìm tham số để hàm liên tục.`, R`A limit $\lim_{x\to a}$ of the form $\frac{0}{0}$, one-sided limits, or finding a parameter for continuity.`),
    method: [
      b(R`Thay $x=a$; nếu ra $\frac{0}{0}$ thì phân tích nhân tử rồi rút gọn.`, R`Substitute $x=a$; if it gives $\frac{0}{0}$, factorise and cancel.`),
      b(R`Hàm liên tục tại $a$ khi giới hạn bằng giá trị hàm; đặt hai giá trị bằng nhau để tìm tham số.`, R`A function is continuous at $a$ when the limit equals its value; equate the two to find the parameter.`),
    ],
    example: {
      prompt: b(R`Tìm $m$ để $f(x)=\frac{x^2-9}{x-3}$ (với $x\neq 3$) và $f(3)=m$ liên tục tại $x=3$.`, R`Find $m$ so that $f(x)=\frac{x^2-9}{x-3}$ (for $x\neq 3$) and $f(3)=m$ is continuous at $x=3$.`),
      steps: [
        b(R`Với $x\neq 3$: $f(x)=x+3$, nên giới hạn tại $3$ bằng $6$.`, R`For $x\neq 3$: $f(x)=x+3$, so the limit at $3$ is $6$.`),
        b(R`Liên tục cần $m=6$.`, R`Continuity needs $m=6$.`),
      ],
      ket: b(R`Giá trị cần tìm là $m=6$.`, R`The required value is $m=6$.`),
      checks: [{ expr: "limit((x**2-9)/(x-3),x,3)", expect: "6" }],
    },
    mistake: b(R`Thấy $\frac{0}{0}$ rồi kết luận giới hạn không tồn tại.`, R`Seeing $\frac{0}{0}$ and concluding the limit does not exist.`),
    drill: { prompt: b(R`Tính $\lim_{x\to 2}\frac{x^2-4}{x-2}$.`, R`Find $\lim_{x\to 2}\frac{x^2-4}{x-2}$.`), answer: b(R`Bằng $4$.`, R`It is $4$.`), checks: [{ expr: "limit((x**2-4)/(x-2),x,2)", expect: "4" }] },
  },
  {
    name: b(R`Biến đổi lũy thừa, logarit và so sánh`, R`Manipulating powers and logarithms`),
    spot: b(R`Có $\log_a b$, đổi cơ số, hoặc so sánh các lũy thừa.`, R`A logarithm $\log_a b$, change of base, or comparing powers.`),
    method: [
      b(R`Dùng định nghĩa $\log_a b=c\Leftrightarrow a^c=b$ và các quy tắc cộng, trừ, đổi cơ số.`, R`Use the definition $\log_a b=c\Leftrightarrow a^c=b$ and the sum, difference and change-of-base rules.`),
      b(R`Cơ số lớn hơn $1$ thì hàm đồng biến, cơ số trong khoảng $(0;1)$ thì nghịch biến.`, R`A base greater than $1$ gives an increasing function; a base in $(0,1)$ gives a decreasing one.`),
    ],
    example: {
      prompt: b(R`Tính $\log_2 40-\log_2 5+\log_3 81$.`, R`Evaluate $\log_2 40-\log_2 5+\log_3 81$.`),
      steps: [
        b(R`Hiệu hai logarit cùng cơ số: $\log_2\frac{40}{5}=\log_2 8=3$.`, R`The difference of logarithms with the same base: $\log_2\frac{40}{5}=\log_2 8=3$.`),
        b(R`Ta có $\log_3 81=4$, nên tổng là $3+4=7$.`, R`We have $\log_3 81=4$, so the total is $3+4=7$.`),
      ],
      ket: b(R`Giá trị bằng $7$.`, R`The value is $7$.`),
      checks: [{ expr: "log(40,2)-log(5,2)+log(81,3)", expect: "7" }],
    },
    mistake: b(R`Viết $\log_a(b+c)=\log_a b+\log_a c$.`, R`Writing $\log_a(b+c)=\log_a b+\log_a c$.`),
    drill: { prompt: b(R`Tính $\log_5 125$.`, R`Evaluate $\log_5 125$.`), answer: b(R`Bằng $3$.`, R`It is $3$.`), checks: [{ expr: "log(125,5)", expect: "3" }] },
  },
  {
    name: b(R`Phương trình và bất phương trình mũ, logarit`, R`Exponential and logarithmic equations and inequalities`),
    spot: b(R`Ẩn nằm ở số mũ hoặc trong dấu logarit.`, R`The unknown is in an exponent or inside a logarithm.`),
    method: [
      b(R`Đặt điều kiện cho biểu thức trong logarit.`, R`State the conditions for the expressions inside logarithms.`),
      b(R`Đưa hai vế về cùng cơ số hoặc đặt ẩn phụ; bất phương trình đổi chiều khi cơ số nhỏ hơn $1$.`, R`Bring both sides to the same base or use a substitution; reverse the inequality when the base is less than $1$.`),
    ],
    example: {
      prompt: b(R`Giải $4^x-5\cdot 2^x+4=0$.`, R`Solve $4^x-5\cdot 2^x+4=0$.`),
      steps: [
        b(R`Đặt $t=2^x>0$: $t^2-5t+4=0$, nên $t=1$ hoặc $t=4$.`, R`Let $t=2^x>0$: $t^2-5t+4=0$, so $t=1$ or $t=4$.`),
        b(R`Suy ra $x=0$ hoặc $x=2$.`, R`Hence $x=0$ or $x=2$.`),
      ],
      ket: b(R`Nghiệm là $x=0$ và $x=2$.`, R`The solutions are $x=0$ and $x=2$.`),
      checks: [{ expr: "4**0-5*2**0+4", expect: "0" }, { expr: "4**2-5*2**2+4", expect: "0" }],
    },
    mistake: b(R`Giữ nguyên chiều bất phương trình khi cơ số nhỏ hơn $1$.`, R`Keeping the direction of the inequality when the base is less than $1$.`),
    drill: { prompt: b(R`Giải $\log_2(x-1)=3$.`, R`Solve $\log_2(x-1)=3$.`), answer: b(R`Nghiệm $x=9$.`, R`The solution is $x=9$.`), checks: [{ expr: "2**3+1", expect: "9" }] },
  },
  {
    name: b(R`Tính đạo hàm và viết tiếp tuyến`, R`Differentiating and writing tangent lines`),
    spot: b(R`Đề cho hàm số và hỏi đạo hàm, hệ số góc, tiếp tuyến tại một điểm.`, R`A function with questions on the derivative, slope, or tangent at a point.`),
    method: [
      b(R`Dùng quy tắc tích, thương, hàm hợp và bảng đạo hàm cơ bản.`, R`Use the product, quotient and chain rules and the basic derivative table.`),
      b(R`Tiếp tuyến tại $x_0$: $y=f(x_0)+f'(x_0)(x-x_0)$.`, R`The tangent at $x_0$: $y=f(x_0)+f'(x_0)(x-x_0)$.`),
    ],
    example: {
      prompt: b(R`Viết tiếp tuyến của $y=x^3-2x$ tại $x=1$.`, R`Write the tangent to $y=x^3-2x$ at $x=1$.`),
      steps: [
        b(R`Ta có $y'=3x^2-2$, nên $y'(1)=1$ và $y(1)=-1$.`, R`We have $y'=3x^2-2$, so $y'(1)=1$ and $y(1)=-1$.`),
        b(R`Tiếp tuyến là $y=-1+1\cdot(x-1)=x-2$.`, R`The tangent is $y=-1+1\cdot(x-1)=x-2$.`),
      ],
      ket: b(R`Tiếp tuyến là $y=x-2$.`, R`The tangent is $y=x-2$.`),
      checks: [{ expr: "diff(x**3-2*x,x).subs(x,1)", expect: "1" }],
    },
    mistake: b(R`Để hệ số góc còn chứa $x$ thay vì thay $x_0$.`, R`Leaving the slope in terms of $x$ instead of substituting $x_0$.`),
    drill: { prompt: b(R`Tính đạo hàm của $y=(2x+1)^3$ tại $x=0$.`, R`Find the derivative of $y=(2x+1)^3$ at $x=0$.`), answer: b(R`Bằng $6$.`, R`It is $6$.`), checks: [{ expr: "diff((2*x+1)**3,x).subs(x,0)", expect: "6" }] },
  },
  {
    name: b(R`Quan hệ song song, vuông góc và khoảng cách trong không gian`, R`Parallelism, perpendicularity and distance in space`),
    spot: b(R`Hình chóp hoặc lăng trụ cần chứng minh song song, vuông góc, hay tính góc, khoảng cách.`, R`A pyramid or prism asking to prove parallel or perpendicular lines, or to find angles or distances.`),
    method: [
      b(R`Song song: tìm đường trong mặt phẳng song song với đường đã cho (thường là đường trung bình).`, R`Parallel: find a line in the plane parallel to the given line (often a midline).`),
      b(R`Vuông góc: chỉ ra đường vuông góc với hai đường cắt nhau trong mặt phẳng; góc và khoảng cách dựa vào tam giác vuông.`, R`Perpendicular: show a line perpendicular to two intersecting lines in the plane; angles and distances use right triangles.`),
    ],
    example: {
      prompt: b(R`Hình chóp $S.ABCD$ có đáy là hình vuông cạnh $a$ và $SA\perp(ABCD)$ với $SA=a$. Tính góc giữa $SC$ và đáy.`, R`A pyramid $S.ABCD$ has a square base of side $a$ and $SA\perp(ABCD)$ with $SA=a$. Find the angle between $SC$ and the base.`),
      steps: [
        b(R`Hình chiếu của $SC$ lên đáy là $AC=a\sqrt{2}$.`, R`The projection of $SC$ onto the base is $AC=a\sqrt{2}$.`),
        b(R`Tang góc là $\frac{SA}{AC}=\frac{a}{a\sqrt{2}}=\frac{\sqrt{2}}{2}$.`, R`The tangent of the angle is $\frac{SA}{AC}=\frac{a}{a\sqrt{2}}=\frac{\sqrt{2}}{2}$.`),
      ],
      ket: b(R`Góc cần tìm có tang bằng $\frac{\sqrt{2}}{2}$, khoảng $35{,}3^\circ$.`, R`The angle has tangent $\frac{\sqrt{2}}{2}$, about $35.3^\circ$.`),
      checks: [{ expr: "1/sqrt(2)", expect: "sqrt(2)/2" }],
    },
    mistake: b(R`Chỉ ra một đường vuông góc rồi kết luận đường thẳng vuông góc với mặt phẳng.`, R`Showing one perpendicular line and concluding the line is perpendicular to the plane.`),
    drill: { prompt: b(R`Hình chóp có đáy diện tích $12$ và chiều cao $5$. Tính thể tích.`, R`A pyramid has base area $12$ and height $5$. Find the volume.`), answer: b(R`Bằng $20$.`, R`It is $20$.`), checks: [{ expr: "Rational(1,3)*12*5", expect: "20" }] },
  },
  {
    name: b(R`Xác suất biến cố hợp và biến cố độc lập`, R`Probability of a union and of independent events`),
    spot: b(R`Đề hỏi xác suất ít nhất một biến cố xảy ra, hoặc cả hai biến cố cùng xảy ra.`, R`The problem asks the probability that at least one event happens, or that both happen.`),
    method: [
      b(R`Biến cố hợp: $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.`, R`Union: $P(A\cup B)=P(A)+P(B)-P(A\cap B)$.`),
      b(R`Hai biến cố độc lập thì $P(A\cap B)=P(A)\cdot P(B)$.`, R`For independent events $P(A\cap B)=P(A)\cdot P(B)$.`),
      b(R`Ít nhất một xảy ra bằng $1$ trừ xác suất không biến cố nào xảy ra.`, R`At least one happens equals $1$ minus the probability that none happens.`),
    ],
    example: {
      prompt: b(R`Hai xạ thủ bắn độc lập, xác suất trúng của họ lần lượt là $0{,}8$ và $0{,}7$. Xác suất ít nhất một người trúng là bao nhiêu?`, R`Two shooters fire independently and hit with probabilities $0.8$ and $0.7$. What is the probability that at least one hits?`),
      steps: [
        b(R`Xác suất cả hai trượt: $0{,}2\cdot0{,}3=0{,}06$.`, R`Probability both miss: $0.2\cdot0.3=0.06$.`),
        b(R`Xác suất ít nhất một người trúng: $1-0{,}06=0{,}94$.`, R`Probability at least one hits: $1-0.06=0.94$.`),
      ],
      ket: b(R`Xác suất là $0{,}94$.`, R`The probability is $0.94$.`),
      checks: [{ expr: "1-Rational(2,10)*Rational(3,10)", expect: "Rational(47,50)" }],
    },
    mistake: b(R`Cộng $0{,}8+0{,}7$ mà quên trừ phần chung nên ra hơn $1$.`, R`Adding $0.8+0.7$ without subtracting the overlap and getting more than $1$.`),
    drill: { prompt: b(R`Tung hai đồng xu cân đối độc lập. Xác suất cả hai ngửa là bao nhiêu?`, R`Toss two fair coins independently. What is the probability that both land tails?`), answer: b(R`Bằng $\frac{1}{4}$.`, R`It is $\frac{1}{4}$.`), checks: [{ expr: "Rational(1,2)*Rational(1,2)", expect: "Rational(1,4)" }] },
  },
  {
    name: b(R`Phương trình $a\sin x+b\cos x=c$`, R`The equation $a\sin x+b\cos x=c$`),
    spot: b(R`Phương trình có cả $\sin x$ và $\cos x$ bậc nhất, hoặc hỏi giá trị lớn nhất của biểu thức đó.`, R`An equation with both $\sin x$ and $\cos x$ to the first power, or a question on the maximum of such an expression.`),
    method: [
      b(R`Kiểm tra điều kiện có nghiệm $c^2\le a^2+b^2$.`, R`Check the condition for solutions, $c^2\le a^2+b^2$.`),
      b(R`Chia hai vế cho $\sqrt{a^2+b^2}$ rồi đưa về $\sin(x+\alpha)$.`, R`Divide both sides by $\sqrt{a^2+b^2}$ and reduce to $\sin(x+\alpha)$.`),
    ],
    example: {
      prompt: b(R`Phương trình $\sin x+\cos x=3$ có nghiệm không?`, R`Does $\sin x+\cos x=3$ have a solution?`),
      steps: [
        b(R`Ta có $a^2+b^2=2$ và $c^2=9$.`, R`We have $a^2+b^2=2$ and $c^2=9$.`),
        b(R`Vì $9>2$ nên phương trình vô nghiệm.`, R`Since $9>2$ the equation has no solution.`),
      ],
      ket: b(R`Phương trình vô nghiệm.`, R`The equation has no solution.`),
      checks: [{ expr: "3**2-(1**2+1**2)", expect: "7" }],
    },
    mistake: b(R`Giải phương trình mà quên kiểm tra điều kiện có nghiệm.`, R`Solving without checking the condition for solutions.`),
    drill: { prompt: b(R`Tìm giá trị lớn nhất của $y=5\sin x+12\cos x$.`, R`Find the maximum of $y=5\sin x+12\cos x$.`), answer: b(R`Bằng $13$.`, R`It is $13$.`), checks: [{ expr: "sqrt(5**2+12**2)", expect: "13" }] },
  },
];

export default lop11;

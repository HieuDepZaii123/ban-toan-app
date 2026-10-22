import type { CardId } from "./cards.ts";
import type { Think } from "./types.ts";

export type Guide = {
  soon: string;
  soonEn: string;
  think: Think;
  thinkEn: Think;
  trap: string;
  trapEn: string;
};

export const guides = {
  "quadratic": {
    "soon": "Ba hình: dạng tổng quát, dạng đỉnh, và chuồng tựa tường.",
    "soonEn": "Three figures: general form, vertex form, and a pen against a wall.",
    "think": {
      "nhin": "Dấu $a$. Dạng $ax^2+bx+c$ hay $a(x-h)^2+k$.",
      "lam": "Đỉnh $x=-\\frac{b}{2a}$. $\\Delta=b^2-4ac$: số giao Ox.",
      "ket": "Cực trị, tập giá trị, nghiệm. $\\Delta$ không tìm đỉnh."
    },
    "thinkEn": {
      "nhin": "Sign of $a$. Form $ax^2+bx+c$ or $a(x-h)^2+k$.",
      "lam": "Vertex $x=-\\frac{b}{2a}$. $\\Delta=b^2-4ac$: Ox crossings.",
      "ket": "Extremum, range, roots. $\\Delta$ does not find the vertex."
    },
    "trap": "$ax^2+bx+c$: đổi $a$ thì đỉnh chạy. $a(x-h)^2+k$: đỉnh đứng yên.",
    "trapEn": "$ax^2+bx+c$: changing $a$ moves the vertex. $a(x-h)^2+k$: the vertex stays."
  },
  "ineq": {
    "soon": "Hai cột trung bình, hai mũi tên Cauchy, và miền bàn ghế.",
    "soonEn": "Two mean bars, two Cauchy arrows, and the desk-and-chair region.",
    "think": {
      "nhin": "$a,b>0$, hai cặp, hoặc miền $P$. Dấu của $a$.",
      "lam": "AM–GM, Cauchy, $P$ tại đỉnh. Chia âm $\\Rightarrow$ đảo.",
      "ket": "$a=b$ hoặc tỉ lệ. $\\max$ ở đỉnh. $-2x\\le4\\Rightarrow x\\ge-2$."
    },
    "thinkEn": {
      "nhin": "$a,b>0$, two pairs, or the region of $P$. Sign of $a$.",
      "lam": "AM–GM, Cauchy, $P$ at a vertex. Divide by a negative $\\Rightarrow$ flip.",
      "ket": "$a=b$ or proportional. $\\max$ at a vertex. $-2x\\le4\\Rightarrow x\\ge-2$."
    },
    "trap": "Chia âm thì đảo. $a,b>0$. Điểm trong $\\neq\\max$.",
    "trapEn": "A negative divisor flips the sign. $a,b>0$. An interior point $\\neq\\max$."
  },
  "exp": {
    "soon": "Kéo cơ số qua 1, thấy đồ thị mũ và log đối xứng qua đường y = x.",
    "soonEn": "Drag the base through 1 and see the exponential and logarithm mirror across y = x.",
    "think": {
      "nhin": "$a>0$, $a\\neq1$. Mũ hay $\\log$.",
      "lam": "Cùng cơ số, hoặc $\\log$ hai vế. $\\log(ab)=\\log a+\\log b\\neq\\log(a+b)$.",
      "ket": "Nghiệm, hoặc thời gian gấp đôi."
    },
    "thinkEn": {
      "nhin": "$a>0$, $a\\neq1$. Exponent or $\\log$.",
      "lam": "Match bases, or $\\log$ both sides. $\\log(ab)=\\log a+\\log b\\neq\\log(a+b)$.",
      "ket": "A solution, or a doubling time."
    },
    "trap": "$\\log(a+b)\\neq\\log a+\\log b$. $10(1{,}08)^5\\approx14{,}69\\neq14$. $\\approx9{,}01\\neq8,\\neq12{,}5$.",
    "trapEn": "$\\log(a+b)\\neq\\log a+\\log b$. $10(1{,}08)^5\\approx14{,}69\\neq14$. $\\approx9{,}01\\neq8,\\neq12{,}5$."
  },
  "sequence": {
    "soon": "Cột uₙ, tổng Sₙ, và dãy hình học hội tụ khi |q| < 1.",
    "soonEn": "A column of terms, the sum Sₙ, and geometric convergence when |q| < 1.",
    "think": {
      "nhin": "$d$ hay $q$. $u_1$ đứng riêng.",
      "lam": "$u_n=u_1+(n-1)d$. $|q|<1\\Rightarrow S=\\frac{u_1}{1-q}$.",
      "ket": "Một số hạng, $S_n$, hoặc $\\lim$."
    },
    "thinkEn": {
      "nhin": "$d$ or $q$. $u_1$ stands apart.",
      "lam": "$u_n=u_1+(n-1)d$. $|q|<1\\Rightarrow S=\\frac{u_1}{1-q}$.",
      "ket": "One term, $S_n$, or $\\lim$."
    },
    "trap": "$u_n$ dùng $n-1$ bước. $|q|<1$: số hạng $\\to0$ nhưng $\\neq0$. $S_\\infty\\neq$ giới hạn số hạng.",
    "trapEn": "$u_n$ takes $n-1$ steps. $|q|<1$: terms $\\to0$ but $\\neq0$. $S_\\infty\\neq$ the limit of a term."
  },
  "trig": {
    "soon": "Quay góc trên đường tròn, rồi đo cây bằng tan.",
    "soonEn": "Turn an angle on the circle, then measure a tree with tan.",
    "think": {
      "nhin": "Góc phần tư. Ngang $\\cos$, đứng $\\sin$.",
      "lam": "Góc liên kết. $\\sin^2+\\cos^2=1$. $\\tan=\\sin/\\cos$.",
      "ket": "Đúng dấu, hoặc $d\\tan\\theta+1{,}5$."
    },
    "thinkEn": {
      "nhin": "The quadrant. Horizontal $\\cos$, vertical $\\sin$.",
      "lam": "A related angle. $\\sin^2+\\cos^2=1$. $\\tan=\\sin/\\cos$.",
      "ket": "The signed value, or $d\\tan\\theta+1{,}5$."
    },
    "trap": "$\\sin150^\\circ=\\sin30^\\circ$, nhưng $\\cos150^\\circ$ đổi dấu.",
    "trapEn": "$\\sin150^\\circ=\\sin30^\\circ$, but $\\cos150^\\circ$ changes sign."
  },
  "limit": {
    "soon": "Cát tuyến co lại khi h → 0, và một bước nhảy thì không có giới hạn.",
    "soonEn": "A secant shrinking as h → 0, and a jump with no limit.",
    "think": {
      "nhin": "Hai phía cùng một số? $f(a)$ để sau.",
      "lam": "Rút gọn rồi thế. Hai phía khác: không có giới hạn.",
      "ket": "Một số, hoặc không tồn tại. Liên tục khi $\\lim=f(a)$."
    },
    "thinkEn": {
      "nhin": "Do both sides share a number? $f(a)$ comes later.",
      "lam": "Simplify, then substitute. Different sides: no limit.",
      "ket": "A number, or it does not exist. Continuous when $\\lim=f(a)$."
    },
    "trap": "$f(a)$ không quyết định $\\lim$. Hai phía khác nhau: dừng.",
    "trapEn": "$f(a)$ does not decide $\\lim$. Different sides: stop."
  },
  "derivative": {
    "soon": "Ba hình: cát tuyến của x², ném bóng, và quãng đường phanh.",
    "soonEn": "Three figures: the secant of x², a vertical throw, and a braking distance.",
    "think": {
      "nhin": "Hai điểm cát tuyến. $h$ là khoảng ngang.",
      "lam": "$\\frac{f(a+h)-f(a)}{h}$, rồi $h\\to0$. $f'=0$ chỉ là điểm dừng.",
      "ket": "Cực trị khi $f'$ đổi dấu. Đoạn đóng: so cả hai đầu."
    },
    "thinkEn": {
      "nhin": "The two secant points. $h$ is the horizontal gap.",
      "lam": "$\\frac{f(a+h)-f(a)}{h}$, then $h\\to0$. $f'=0$ is only stationary.",
      "ket": "An extremum needs $f'$ to change sign. On a closed interval, compare both ends."
    },
    "trap": "$h(1)=15$, $v(1)=10$. Đỉnh $t=2$, $h=20$. $(5t^2)'=10t$.",
    "trapEn": "$h(1)=15$, $v(1)=10$. Apex $t=2$, $h=20$. $(5t^2)'=10t$."
  },
  "survey": {
    "soon": "Bậc ba y = x³ − 3x. Chạm một cột của bảng thì điểm trên đồ thị nhảy tới.",
    "soonEn": "The cubic y = x³ − 3x. Tap a column of the table and the point on the graph jumps there.",
    "think": {
      "nhin": "Dấu $y'$, rồi $y''$.",
      "lam": "$y'=0$. $y''$ đổi dấu: uốn, kể cả $y'\\neq0$.",
      "ket": "Cực trị, hoặc không nếu $y'$ không đổi dấu. Bậc ba trên $\\mathbb{R}$: không $\\max$."
    },
    "thinkEn": {
      "nhin": "Sign of $y'$, then $y''$.",
      "lam": "$y'=0$. $y''$ changes sign: inflection, even if $y'\\neq0$.",
      "ket": "Extrema, or none if $y'$ does not change sign. A cubic on $\\mathbb{R}$: no $\\max$."
    },
    "trap": "$y=x^3$: $y'(0)=0$ không phải cực trị. $x^3-3x$: nghiệm $0,\\pm\\sqrt{3}\\neq\\pm1$. Giao tiệm cận không trên đồ thị.",
    "trapEn": "$y=x^3$: $y'(0)=0$ is not an extremum. $x^3-3x$: roots $0,\\pm\\sqrt{3}\\neq\\pm1$. The asymptote crossing is not on the graph."
  },
  "integral": {
    "soon": "Hình thang cong, rồi diện tích giữa y = x² và y = x trên [0; 1] bằng 1/6.",
    "soonEn": "Trapezoid strips, then the area between y = x² and y = x on [0, 1], which is 1/6.",
    "think": {
      "nhin": "Đường nào trên. Dưới Ox: âm.",
      "lam": "Nguyên hàm, thế cận. Hai đường: lấy hiệu.",
      "ket": "Một số. Diện tích: $|\\,|$ từng miền."
    },
    "thinkEn": {
      "nhin": "Which curve is on top. Below Ox: negative.",
      "lam": "Antiderivative, then both ends. Two curves: the difference.",
      "ket": "A number. Area: $|\\,|$ on each piece."
    },
    "trap": "Tích phân âm $\\neq$ diện tích. Quay: $\\pi\\int y^2$, đừng quên bình phương.",
    "trapEn": "A negative integral $\\neq$ area. Revolution: $\\pi\\int y^2$. Do not drop the square."
  },
  "vector": {
    "soon": "Hai mũi tên trong không gian, hình bình hành của định thức, và giao của hai đường.",
    "soonEn": "Two arrows in space, the parallelogram of a determinant, and the crossing of two lines.",
    "think": {
      "nhin": "$(x;y;z)$, $\\det$, hoặc hệ.",
      "lam": "$|\\vec u|=\\sqrt{x^2+y^2+z^2}$. $\\det=ad-bc$. $\\det\\neq0\\Rightarrow$ một nghiệm.",
      "ket": "$|u|$, $\\cdot=0$, $\\det$, hoặc $(x;y)$."
    },
    "thinkEn": {
      "nhin": "$(x;y;z)$, $\\det$, or a system.",
      "lam": "$|\\vec u|=\\sqrt{x^2+y^2+z^2}$. $\\det=ad-bc$. $\\det\\neq0\\Rightarrow$ one solution.",
      "ket": "$|u|$, $\\cdot=0$, $\\det$, or $(x;y)$."
    },
    "trap": "$|(2;1;2)|=3\\neq\\sqrt{5}$. $\\cdot=0\\Rightarrow\\perp$, kể cả công.",
    "trapEn": "$|(2;1;2)|=3\\neq\\sqrt{5}$. $\\cdot=0\\Rightarrow\\perp$, including work."
  },
  "analytic": {
    "soon": "Chân đường vuông góc trên Oxy, mặt phẳng trong Oxyz, và đường tròn bán kính 5.",
    "soonEn": "The foot of a perpendicular in Oxy, a plane in Oxyz, and a circle of radius 5.",
    "think": {
      "nhin": "$\\vec n=(a;b)$ hoặc $(a;b;c)$, điểm ngoài.",
      "lam": "$d=\\frac{|ax+by+c|}{|\\vec n|}$. Chân $=P-t\\vec n$.",
      "ket": "$d$ và chân. Tròn: $x^2+y^2$ với $r^2$."
    },
    "thinkEn": {
      "nhin": "$\\vec n=(a;b)$ or $(a;b;c)$, and a point off the figure.",
      "lam": "$d=\\frac{|ax+by+c|}{|\\vec n|}$. Foot $=P-t\\vec n$.",
      "ket": "$d$ and the foot. Circle: $x^2+y^2$ against $r^2$."
    },
    "trap": "$\\vec n\\neq\\vec d$. Tử $2\\neq\\sqrt{2}$.",
    "trapEn": "$\\vec n\\neq\\vec d$. Numerator $2\\neq\\sqrt{2}$."
  },
  "triangle": {
    "soon": "Kéo đáy và chiều cao, rồi hộp, chóp và tứ diện trên cùng những số ấy.",
    "soonEn": "Drag the base and the height, then the box, the pyramid and the tetrahedron on those same numbers.",
    "think": {
      "nhin": "Đáy, cao, hoặc cạnh $a$.",
      "lam": "$S=\\frac12 bh$. $V=abc$. Chóp $\\frac13 Sh$. Tứ diện $\\frac{a^3\\sqrt{2}}{12}$.",
      "ket": "$S$ hoặc $V$. $k\\Rightarrow k^2$ cho diện tích."
    },
    "thinkEn": {
      "nhin": "A base, a height, or the edge $a$.",
      "lam": "$S=\\frac12 bh$. $V=abc$. Pyramid $\\frac13 Sh$. Tetrahedron $\\frac{a^3\\sqrt{2}}{12}$.",
      "ket": "$S$ or $V$. $k\\Rightarrow k^2$ for area."
    },
    "trap": "Chóp $48\\neq36$. Hộp $60\\neq12$. $k=2\\Rightarrow S\\times4$.",
    "trapEn": "Pyramid $48\\neq36$. Box $60\\neq12$. $k=2\\Rightarrow S\\times4$."
  },
  "combo": {
    "soon": "A cạnh C, sáu cách xếp ba ghế, và một cột điểm kéo trung bình.",
    "soonEn": "A beside C, six ways to fill three chairs, and a score bar that pulls the mean.",
    "think": {
      "nhin": "Có thứ tự? Dãy đã sắp?",
      "lam": "$A=\\frac{n!}{(n-k)!}$, $C=\\frac{A}{k!}$. Trung vị: số giữa.",
      "ket": "Số cách, hoặc $\\bar x$ với trung vị."
    },
    "thinkEn": {
      "nhin": "Does order count? Is the list sorted?",
      "lam": "$A=\\frac{n!}{(n-k)!}$, $C=\\frac{A}{k!}$. Median: the middle value.",
      "ket": "A count, or $\\bar x$ with the median."
    },
    "trap": "$A(5,2)=20$, $C(5,2)=10$. $6\\to20$: $\\bar x=6{,}8$, trung vị $4$.",
    "trapEn": "$A(5,2)=20$, $C(5,2)=10$. $6\\to20$: $\\bar x=6{,}8$, median $4$."
  },
  "probability": {
    "soon": "Xét nghiệm dương, và hai xúc xắc khi đã biết có một mặt 6: còn 11 cặp, không phải 36.",
    "soonEn": "A positive test, and two dice given that at least one face is 6: 11 outcomes remain, not 36.",
    "think": {
      "nhin": "Đã biết phần nào? Mẫu số là phần còn.",
      "lam": "Đếm phần còn, rồi lấy tỉ. $C(n,k)p^k(1-p)^{n-k}$.",
      "ket": "Một xác suất có điều kiện."
    },
    "thinkEn": {
      "nhin": "What is already known? The denominator is what remains.",
      "lam": "Count what remains, then the ratio. $C(n,k)p^k(1-p)^{n-k}$.",
      "ket": "A conditional probability."
    },
    "trap": "Dương: mẫu là số lần dương. Xúc xắc: $11$ cặp, không $12$, không $36$.",
    "trapEn": "A positive call: the sample is the positive calls. Dice: $11$ pairs, not $12$, not $36$."
  }
} satisfies Record<CardId, Guide>;

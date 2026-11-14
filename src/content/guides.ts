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
      "nhin": "Xem dấu của hệ số $a$ trước: $a>0$ thì parabol mở lên và có điểm thấp nhất, $a<0$ thì mở xuống và có điểm cao nhất. Rồi xem hàm đang viết ở dạng $ax^2+bx+c$ hay dạng đỉnh $a(x-h)^2+k$.",
      "lam": "Tìm đỉnh bằng $x=-\\dfrac{b}{2a}$, rồi thay vào để có tung độ đỉnh. Tính $\\Delta=b^2-4ac$ để biết parabol cắt trục hoành ở hai, một hay không điểm nào.",
      "ket": "Từ đỉnh đọc ra giá trị lớn nhất hoặc nhỏ nhất và tập giá trị. Từ $\\Delta$ đọc ra số nghiệm. Hai việc này dùng hai công cụ khác nhau."
    },
    "thinkEn": {
      "nhin": "Check the sign of $a$ first: $a>0$ opens upward with a lowest point, $a<0$ opens downward with a highest point. Then see whether the function is written as $ax^2+bx+c$ or in vertex form $a(x-h)^2+k$.",
      "lam": "Find the vertex with $x=-\\dfrac{b}{2a}$ and substitute for its height. Compute $\\Delta=b^2-4ac$ to know whether the parabola meets the $x$-axis twice, once or not at all.",
      "ket": "The vertex gives the maximum or minimum and the range. $\\Delta$ gives the number of roots. These are two different tools."
    },
    "trap": "Ở dạng $ax^2+bx+c$, đổi $a$ thì đỉnh di chuyển theo. Ở dạng $a(x-h)^2+k$, đổi $a$ chỉ làm parabol hẹp hay rộng ra, đỉnh $(h;k)$ đứng yên. Đừng dùng $\\Delta$ để tìm đỉnh.",
    "trapEn": "In the form $ax^2+bx+c$, changing $a$ moves the vertex. In the form $a(x-h)^2+k$, changing $a$ only narrows or widens the parabola and the vertex $(h,k)$ stays put. Do not use $\\Delta$ to find the vertex."
  },
  "ineq": {
    "soon": "Hai cột trung bình, hai mũi tên Cauchy, và miền bàn ghế.",
    "soonEn": "Two mean bars, two Cauchy arrows, and the desk-and-chair region.",
    "think": {
      "nhin": "Xem đề cho các số dương ($a,b>0$), cho hai cặp số cần nhân chéo, hay cho một miền giới hạn bởi các bất phương trình. Nếu phải nhân hoặc chia hai vế, để ý dấu của số đó.",
      "lam": "Hai số dương thì dùng AM-GM: $\\dfrac{a+b}{2}\\ge\\sqrt{ab}$. Hai cặp số thì dùng Cauchy-Schwarz. Bài trên một miền thì tính biểu thức tại các đỉnh của miền. Chia cho số âm thì đổi chiều.",
      "ket": "Nêu giá trị lớn nhất hoặc nhỏ nhất kèm điểm đạt được. Dấu bằng của AM-GM xảy ra khi $a=b$, của Cauchy-Schwarz khi hai cặp tỉ lệ."
    },
    "thinkEn": {
      "nhin": "See whether the problem gives positive numbers ($a,b>0$), two pairs to pair off, or a region bounded by inequalities. If you must multiply or divide both sides, watch that number's sign.",
      "lam": "For two positive numbers use AM-GM: $\\dfrac{a+b}{2}\\ge\\sqrt{ab}$. For two pairs use Cauchy-Schwarz. For a region, evaluate at its corners. Dividing by a negative flips the sign.",
      "ket": "State the maximum or minimum together with where it is reached. AM-GM is an equality when $a=b$, Cauchy-Schwarz when the pairs are proportional."
    },
    "trap": "Chia $-2x\\le 4$ cho $-2$ phải được $x\\ge -2$, không phải $x\\le -2$. Và một cận chỉ là giá trị nhỏ nhất khi dấu bằng thật sự xảy ra trong miền đề cho.",
    "trapEn": "Dividing $-2x\\le 4$ by $-2$ gives $x\\ge -2$, not $x\\le -2$. A bound is the minimum only if equality is actually reached inside the allowed range."
  },
  "exp": {
    "soon": "Kéo cơ số qua 1, thấy đồ thị mũ và log đối xứng qua đường y = x.",
    "soonEn": "Drag the base through 1 and see the exponential and logarithm mirror across y = x.",
    "think": {
      "nhin": "Xem cơ số lớn hơn $1$ hay nằm giữa $0$ và $1$, vì điều đó quyết định hàm tăng hay giảm. Với logarit, ghi ngay điều kiện biểu thức trong logarit dương.",
      "lam": "Đưa hai vế về cùng một cơ số, hoặc lấy logarit hai vế. Dùng các quy tắc $\\log_a(xy)=\\log_a x+\\log_a y$ và $\\log_a x^n=n\\log_a x$ khi $x,y>0$.",
      "ket": "Đối chiếu nghiệm với điều kiện ban đầu. Với bất phương trình, cơ số nằm giữa $0$ và $1$ thì phải đổi chiều."
    },
    "thinkEn": {
      "nhin": "Check whether the base is above $1$ or between $0$ and $1$: that decides whether the function rises or falls. For logarithms, write down at once that the argument must be positive.",
      "lam": "Bring both sides to the same base, or take logarithms of both sides. Use $\\log_a(xy)=\\log_a x+\\log_a y$ and $\\log_a x^n=n\\log_a x$ for $x,y>0$.",
      "ket": "Check every solution against the starting conditions. In an inequality, a base between $0$ and $1$ flips the direction."
    },
    "trap": "$\\log(a+b)$ không bằng $\\log a+\\log b$. Lãi kép $10\\cdot 1{,}08^5\\approx 14{,}69$, khác lãi đơn $10\\cdot(1+0{,}08\\cdot 5)=14$.",
    "trapEn": "$\\log(a+b)$ is not $\\log a+\\log b$. Compound interest $10\\cdot 1.08^5\\approx 14.69$ differs from simple interest $10\\cdot(1+0.08\\cdot 5)=14$."
  },
  "sequence": {
    "soon": "Cột uₙ, tổng Sₙ, và dãy hình học hội tụ khi |q| < 1.",
    "soonEn": "A column of terms, the sum Sₙ, and geometric convergence when |q| < 1.",
    "think": {
      "nhin": "So hai số hạng liên tiếp: hiệu không đổi là cấp số cộng, thương không đổi là cấp số nhân. Xem đề hỏi một số hạng, tổng hữu hạn hay tổng vô hạn.",
      "lam": "Cấp số cộng: $u_n=u_1+(n-1)d$ và $S_n=\\dfrac{n(u_1+u_n)}{2}$. Cấp số nhân: $u_n=u_1q^{n-1}$, và tổng vô hạn bằng $\\dfrac{u_1}{1-q}$ khi $|q|<1$.",
      "ket": "Kiểm tra lại bằng cách tính tay vài số hạng đầu. Tổng vô hạn chỉ tồn tại khi $|q|<1$."
    },
    "thinkEn": {
      "nhin": "Compare consecutive terms: a constant difference means arithmetic, a constant ratio means geometric. See whether a term, a finite sum or an infinite sum is asked.",
      "lam": "Arithmetic: $u_n=u_1+(n-1)d$ and $S_n=\\dfrac{n(u_1+u_n)}{2}$. Geometric: $u_n=u_1q^{n-1}$, and the infinite sum is $\\dfrac{u_1}{1-q}$ when $|q|<1$.",
      "ket": "Check by writing out the first few terms. An infinite sum exists only when $|q|<1$."
    },
    "trap": "Từ $u_1$ đến $u_n$ chỉ có $n-1$ bước nhảy, nên $u_{10}=u_1+9d$, không phải $u_1+10d$.",
    "trapEn": "From $u_1$ to $u_n$ there are only $n-1$ steps, so $u_{10}=u_1+9d$, not $u_1+10d$."
  },
  "trig": {
    "soon": "Quay góc trên đường tròn, rồi đo cây bằng tan.",
    "soonEn": "Turn an angle on the circle, then measure a tree with tan.",
    "think": {
      "nhin": "Đổi góc về độ hoặc rađian cho thống nhất, rồi xác định góc nằm ở phần tư nào để biết dấu của sin, cos, tan.",
      "lam": "Dùng góc liên kết để đưa về góc nhọn, dùng $\\sin^2x+\\cos^2x=1$ khi biết một giá trị cần tìm giá trị kia. Với phương trình, viết đủ các họ nghiệm.",
      "ket": "Ghi họ nghiệm có $k\\in\\mathbb{Z}$, hoặc chọn đúng các nghiệm trong khoảng đề yêu cầu."
    },
    "thinkEn": {
      "nhin": "Put every angle in the same unit, degrees or radians, then find the quadrant to know the signs of sine, cosine and tangent.",
      "lam": "Use related angles to reduce to an acute angle, and $\\sin^2x+\\cos^2x=1$ to get one value from another. For equations, write every family of solutions.",
      "ket": "Write the families with $k\\in\\mathbb{Z}$, or pick exactly the solutions in the requested interval."
    },
    "trap": "Phương trình $\\sin x=m$ có hai họ nghiệm: $x=\\alpha+k2\\pi$ và $x=\\pi-\\alpha+k2\\pi$. Hay quên họ thứ hai.",
    "trapEn": "$\\sin x=m$ has two families: $x=\\alpha+2k\\pi$ and $x=\\pi-\\alpha+2k\\pi$. The second one is often forgotten."
  },
  "limit": {
    "soon": "Cát tuyến co lại khi h → 0, và một bước nhảy thì không có giới hạn.",
    "soonEn": "A secant shrinking as h → 0, and a jump with no limit.",
    "think": {
      "nhin": "Thay thử giá trị $x$ vào. Nếu ra một số thì đó là giới hạn. Nếu ra dạng $\\dfrac{0}{0}$ hoặc $\\dfrac{\\infty}{\\infty}$ thì cần biến đổi tiếp.",
      "lam": "Dạng $\\dfrac{0}{0}$: phân tích nhân tử hoặc nhân liên hợp để rút gọn phần gây ra số $0$. Dạng $\\dfrac{\\infty}{\\infty}$: chia cả tử và mẫu cho lũy thừa cao nhất của $x$.",
      "ket": "Sau khi rút gọn, thay lại để có giới hạn. Nếu giới hạn trái và phải khác nhau thì giới hạn không tồn tại."
    },
    "thinkEn": {
      "nhin": "Substitute the value of $x$. A number means you are done. The form $\\dfrac{0}{0}$ or $\\dfrac{\\infty}{\\infty}$ means more work is needed.",
      "lam": "For $\\dfrac{0}{0}$, factor or multiply by the conjugate to cancel what makes the zero. For $\\dfrac{\\infty}{\\infty}$, divide top and bottom by the highest power of $x$.",
      "ket": "After simplifying, substitute again. If the left and right limits differ, the limit does not exist."
    },
    "trap": "Dạng $\\dfrac{0}{0}$ không có nghĩa là giới hạn bằng $0$ hay bằng $1$; nó chỉ báo rằng phải rút gọn trước.",
    "trapEn": "The form $\\dfrac{0}{0}$ does not mean the limit is $0$ or $1$; it only says you must simplify first."
  },
  "derivative": {
    "soon": "Ba hình: cát tuyến của x², ném bóng, và quãng đường phanh.",
    "soonEn": "Three figures: the secant of x², a vertical throw, and a braking distance.",
    "think": {
      "nhin": "Nhận ra hàm đang là tổng, tích, thương hay hàm hợp của các hàm quen thuộc. Mỗi dạng có một quy tắc riêng.",
      "lam": "Áp dụng quy tắc: $(uv)'=u'v+uv'$, $\\left(\\dfrac{u}{v}\\right)'=\\dfrac{u'v-uv'}{v^2}$, và đạo hàm hàm hợp nhân thêm đạo hàm của hàm bên trong.",
      "ket": "Thay số nếu đề hỏi đạo hàm tại một điểm. Hệ số góc tiếp tuyến tại $x_0$ chính là $f'(x_0)$."
    },
    "thinkEn": {
      "nhin": "Decide whether the function is a sum, product, quotient or composition of familiar functions. Each shape has its own rule.",
      "lam": "Apply the rule: $(uv)'=u'v+uv'$, $\\left(\\dfrac{u}{v}\\right)'=\\dfrac{u'v-uv'}{v^2}$, and for a composition multiply by the derivative of the inside.",
      "ket": "Substitute if a value at a point is asked. The slope of the tangent at $x_0$ is $f'(x_0)$."
    },
    "trap": "$(uv)'$ không bằng $u'v'$. Và đạo hàm của $\\cos x$ là $-\\sin x$, nhớ dấu trừ.",
    "trapEn": "$(uv)'$ is not $u'v'$. And the derivative of $\\cos x$ is $-\\sin x$; keep the minus sign."
  },
  "survey": {
    "soon": "Bậc ba y = x³ − 3x. Chạm một cột của bảng thì điểm trên đồ thị nhảy tới.",
    "soonEn": "The cubic y = x³ − 3x. Tap a column of the table and the point on the graph jumps there.",
    "think": {
      "nhin": "Ghi tập xác định trước tiên. Tìm các điểm làm đạo hàm bằng $0$ hoặc không xác định.",
      "lam": "Xét dấu đạo hàm trên từng khoảng giữa các điểm vừa tìm, rồi lập bảng biến thiên. Tìm thêm giới hạn ở hai đầu và các tiệm cận.",
      "ket": "Đọc từ bảng: khoảng đồng biến, nghịch biến, cực đại, cực tiểu, giá trị lớn nhất và nhỏ nhất trên đoạn."
    },
    "thinkEn": {
      "nhin": "Write the domain first. Find the points where the derivative is zero or undefined.",
      "lam": "Find the sign of the derivative on each interval between those points and build the variation table. Add the limits at both ends and any asymptotes.",
      "ket": "Read from the table: where the function rises or falls, the local maximum and minimum, and the extreme values on an interval."
    },
    "trap": "Đạo hàm bằng $0$ chưa đủ để có cực trị. Hàm $y=x^3$ có $y'(0)=0$ nhưng không có cực trị tại $0$ vì $y'$ không đổi dấu.",
    "trapEn": "A zero derivative is not enough for an extremum. $y=x^3$ has $y'(0)=0$ but no extremum at $0$, because $y'$ does not change sign."
  },
  "integral": {
    "soon": "Hình thang cong, rồi diện tích giữa y = x² và y = x trên [0; 1] bằng 1/6.",
    "soonEn": "Trapezoid strips, then the area between y = x² and y = x on [0, 1], which is 1/6.",
    "think": {
      "nhin": "Xem biểu thức dưới dấu tích phân là hàm cơ bản, có dạng hàm hợp (dùng đổi biến), hay là tích của đa thức với hàm mũ, lượng giác, logarit (dùng từng phần).",
      "lam": "Tìm một nguyên hàm $F$, rồi tính $F(b)-F(a)$. Đổi biến thì đổi luôn cận. Diện tích giữa hai đường thì lấy tích phân của hiệu, có trị tuyệt đối.",
      "ket": "Kiểm tra bằng cách đạo hàm lại $F$. Diện tích và thể tích luôn là số dương."
    },
    "thinkEn": {
      "nhin": "Decide whether the integrand is a basic function, a composition (use substitution), or a product of a polynomial with an exponential, trig or log function (use parts).",
      "lam": "Find an antiderivative $F$, then compute $F(b)-F(a)$. When substituting, change the limits too. For the area between two curves, integrate the absolute difference.",
      "ket": "Check by differentiating $F$. Areas and volumes are always positive."
    },
    "trap": "Phần đồ thị nằm dưới trục hoành cho tích phân âm. Muốn có diện tích thì phải lấy trị tuyệt đối hoặc tách thành từng đoạn.",
    "trapEn": "A part of the graph below the $x$-axis gives a negative integral. For an area, take the absolute value or split the interval."
  },
  "vector": {
    "soon": "Hai mũi tên trong không gian, hình bình hành của định thức, và giao của hai đường.",
    "soonEn": "Two arrows in space, the parallelogram of a determinant, and the crossing of two lines.",
    "think": {
      "nhin": "Chuyển các điểm và vectơ sang tọa độ nếu được. Xem đề hỏi độ dài, góc, hay quan hệ cùng phương, vuông góc.",
      "lam": "Cộng trừ theo từng tọa độ. Độ dài là căn của tổng bình phương. Tích vô hướng $x_1x_2+y_1y_2$ cho côsin của góc.",
      "ket": "Hai vectơ vuông góc khi tích vô hướng bằng $0$. Cùng phương khi tọa độ tỉ lệ."
    },
    "thinkEn": {
      "nhin": "Move points and vectors into coordinates when you can. See whether a length, an angle, or a parallel or perpendicular relation is asked.",
      "lam": "Add and subtract coordinate by coordinate. The length is the square root of the sum of squares. The dot product $x_1x_2+y_1y_2$ gives the cosine of the angle.",
      "ket": "Two vectors are perpendicular when the dot product is $0$, and parallel when the coordinates are proportional."
    },
    "trap": "Tọa độ của $\\overrightarrow{AB}$ là tọa độ $B$ trừ tọa độ $A$, không phải ngược lại. Tích vô hướng là một số, không phải một vectơ.",
    "trapEn": "$\\overrightarrow{AB}$ is $B$ minus $A$, not the other way round. The dot product is a number, not a vector."
  },
  "analytic": {
    "soon": "Chân đường vuông góc trên Oxy, mặt phẳng trong Oxyz, và đường tròn bán kính 5.",
    "soonEn": "The foot of a perpendicular in Oxy, a plane in Oxyz, and a circle of radius 5.",
    "think": {
      "nhin": "Đọc từ phương trình các yếu tố có sẵn: vectơ pháp tuyến của đường thẳng, tâm và bán kính của đường tròn.",
      "lam": "Viết phương trình đường thẳng qua một điểm và một pháp tuyến. Khoảng cách từ điểm đến đường thẳng dùng công thức có trị tuyệt đối ở tử.",
      "ket": "Thay một điểm vào phương trình vừa viết để kiểm tra. Đường thẳng tiếp xúc đường tròn khi khoảng cách từ tâm bằng bán kính."
    },
    "thinkEn": {
      "nhin": "Read what the equation already gives: the normal vector of a line, the centre and radius of a circle.",
      "lam": "Write a line through a point with a given normal. The distance from a point to a line uses the formula with an absolute value on top.",
      "ket": "Substitute a point into the new equation to check it. A line touches a circle when its distance from the centre equals the radius."
    },
    "trap": "Phương trình $(x-1)^2+(y+2)^2=9$ có tâm $(1;-2)$, không phải $(-1;2)$, và bán kính $3$, không phải $9$.",
    "trapEn": "$(x-1)^2+(y+2)^2=9$ has centre $(1,-2)$, not $(-1,2)$, and radius $3$, not $9$."
  },
  "triangle": {
    "soon": "Kéo đáy và chiều cao, rồi hộp, chóp và tứ diện trên cùng những số ấy.",
    "soonEn": "Drag the base and the height, then the box, the pyramid and the tetrahedron on those same numbers.",
    "think": {
      "nhin": "Ghi ra đề đã cho những cạnh nào, góc nào, và cạnh nào đối diện góc nào.",
      "lam": "Biết hai cạnh và góc xen giữa thì dùng định lí côsin. Biết một cạnh và hai góc thì dùng định lí sin. Diện tích dùng $\\dfrac{1}{2}ab\\sin C$.",
      "ket": "Kiểm tra cạnh lớn nhất đối diện góc lớn nhất, và tổng ba góc bằng $180^\\circ$."
    },
    "thinkEn": {
      "nhin": "List which sides and angles are given, and which side is opposite which angle.",
      "lam": "Two sides and the included angle: law of cosines. One side and two angles: law of sines. Area: $\\dfrac{1}{2}ab\\sin C$.",
      "ket": "Check that the longest side faces the largest angle and the angles add up to $180^\\circ$."
    },
    "trap": "Công thức $\\dfrac{1}{2}ab\\sin C$ cần đúng góc $C$ nằm giữa hai cạnh $a$ và $b$. Dùng góc khác là sai.",
    "trapEn": "$\\dfrac{1}{2}ab\\sin C$ needs the angle $C$ between sides $a$ and $b$. Any other angle gives a wrong area."
  },
  "combo": {
    "soon": "A cạnh C, sáu cách xếp ba ghế, và một cột điểm kéo trung bình.",
    "soonEn": "A beside C, six ways to fill three chairs, and a score bar that pulls the mean.",
    "think": {
      "nhin": "Hỏi hai câu: thứ tự có quan trọng không, và các phần tử có được lặp lại không. Với bài thống kê, xem dãy số đã sắp xếp chưa.",
      "lam": "Có thứ tự thì dùng chỉnh hợp $A_n^k=\\dfrac{n!}{(n-k)!}$. Không thứ tự thì dùng tổ hợp $C_n^k=\\dfrac{A_n^k}{k!}$. Trung vị là số đứng giữa của dãy đã xếp tăng.",
      "ket": "Kết quả đếm phải là số nguyên dương. Thử lại với số nhỏ bằng cách liệt kê."
    },
    "thinkEn": {
      "nhin": "Ask two questions: does order matter, and can elements repeat? For statistics, check whether the list is sorted.",
      "lam": "With order use $A_n^k=\\dfrac{n!}{(n-k)!}$. Without order use $C_n^k=\\dfrac{A_n^k}{k!}$. The median is the middle of the sorted list.",
      "ket": "A count must be a positive whole number. Check a small case by listing."
    },
    "trap": "Chọn $2$ trong $5$: có thứ tự là $A_5^2=20$, không thứ tự là $C_5^2=10$. Một giá trị rất lớn kéo trung bình đi xa, nhưng trung vị hầu như không đổi.",
    "trapEn": "Choosing $2$ of $5$: with order $20$, without order $10$. One very large value drags the mean, while the median barely moves."
  },
  "probability": {
    "soon": "Xét nghiệm dương, và hai xúc xắc khi đã biết có một mặt 6: còn 11 cặp, không phải 36.",
    "soonEn": "A positive test, and two dice given that at least one face is 6: 11 outcomes remain, not 36.",
    "think": {
      "nhin": "Xác định đề đã cho biết điều gì. Điều đã biết thu hẹp lại tập kết quả, và mẫu số chỉ gồm phần còn lại đó.",
      "lam": "Đếm số kết quả thuận lợi trong phần còn lại rồi lấy tỉ số. Với nhiều lần thử độc lập, dùng $C_n^kp^k(1-p)^{n-k}$.",
      "ket": "Xác suất nằm giữa $0$ và $1$. Với câu hỏi \\\"ít nhất một\\\", tính qua biến cố đối thường nhanh hơn."
    },
    "thinkEn": {
      "nhin": "Find what is already known. That knowledge shrinks the set of outcomes, and the denominator counts only what remains.",
      "lam": "Count the favourable outcomes among those that remain, then take the ratio. For repeated independent trials use $C_n^kp^k(1-p)^{n-k}$.",
      "ket": "A probability lies between $0$ and $1$. For \\\"at least one\\\", the complement is usually quicker."
    },
    "trap": "Biết hai xúc xắc có ít nhất một mặt $6$ thì chỉ còn $11$ cặp, không phải $36$. Xét nghiệm dương thì mẫu số là mọi lần cho kết quả dương, kể cả dương nhầm.",
    "trapEn": "Knowing two dice show at least one $6$ leaves $11$ pairs, not $36$. For a positive test, the denominator is every positive result, false positives included."
  }
} satisfies Record<CardId, Guide>;

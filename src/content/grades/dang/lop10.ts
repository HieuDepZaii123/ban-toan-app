import type { GradeDang } from "./types.ts";
import { b } from "./types.ts";

const R = String.raw;

const lop10: GradeDang[] = [
  {
    name: b(R`Phép toán trên tập hợp và đếm phần tử`, R`Set operations and counting elements`),
    spot: b(R`Có hai nhóm có phần chung, các phép hợp, giao, hiệu, hoặc "ít nhất một".`, R`Two groups with an overlap, union, intersection, difference, or "at least one".`),
    method: [
      b(R`Viết các tập bằng liệt kê hoặc dùng sơ đồ Ven.`, R`Write the sets by listing, or draw a Venn diagram.`),
      b(R`Dùng $n(A\cup B)=n(A)+n(B)-n(A\cap B)$ để đếm, tránh đếm trùng phần giao.`, R`Use $n(A\cup B)=n(A)+n(B)-n(A\cap B)$ to count without double counting the overlap.`),
    ],
    example: {
      prompt: b(R`Lớp có $40$ bạn, $25$ bạn thích bóng đá, $18$ bạn thích bơi và $8$ bạn thích cả hai. Có bao nhiêu bạn không thích môn nào?`, R`A class has $40$ pupils, $25$ like football, $18$ like swimming and $8$ like both. How many like neither?`),
      steps: [
        b(R`Số bạn thích ít nhất một môn là $25+18-8=35$.`, R`The number liking at least one is $25+18-8=35$.`),
        b(R`Số bạn không thích môn nào là $40-35=5$.`, R`The number liking neither is $40-35=5$.`),
      ],
      ket: b(R`Có $5$ bạn không thích môn nào.`, R`Exactly $5$ pupils like neither.`),
      checks: [{ expr: "40-(25+18-8)", expect: "5" }],
    },
    mistake: b(R`Cộng thẳng hai số lượng mà quên trừ phần giao.`, R`Adding the two counts and forgetting to subtract the overlap.`),
    drill: { prompt: b(R`Cho $n(A)=12$, $n(B)=9$ và $n(A\cap B)=4$. Tính $n(A\cup B)$.`, R`Given $n(A)=12$, $n(B)=9$ and $n(A\cap B)=4$, find $n(A\cup B)$.`), answer: b(R`Bằng $17$.`, R`It is $17$.`), checks: [{ expr: "12+9-4", expect: "17" }] },
  },
  {
    name: b(R`Miền nghiệm của bất phương trình bậc nhất hai ẩn`, R`The solution region of a linear inequality in two unknowns`),
    spot: b(R`Có bất phương trình $ax+by\le c$, hệ bất phương trình, hoặc bài toán tối ưu có điều kiện.`, R`An inequality $ax+by\le c$, a system, or an optimisation with conditions.`),
    method: [
      b(R`Vẽ đường biên $ax+by=c$ rồi thử điểm gốc để chọn nửa mặt phẳng.`, R`Draw the boundary $ax+by=c$ and test the origin to choose the half-plane.`),
      b(R`Với hệ, lấy phần chung; giá trị lớn nhất, nhỏ nhất của biểu thức bậc nhất đạt tại đỉnh.`, R`For a system, take the common part; a linear expression is largest or smallest at a vertex.`),
    ],
    example: {
      prompt: b(R`Tìm giá trị lớn nhất của $F=2x+3y$ trên miền $x\ge 0$, $y\ge 0$, $x+y\le 4$.`, R`Find the maximum of $F=2x+3y$ on the region $x\ge 0$, $y\ge 0$, $x+y\le 4$.`),
      steps: [
        b(R`Các đỉnh của miền là $(0;0)$, $(4;0)$ và $(0;4)$.`, R`The vertices of the region are $(0,0)$, $(4,0)$ and $(0,4)$.`),
        b(R`Giá trị của $F$ lần lượt là $0$, $8$ và $12$.`, R`The values of $F$ are $0$, $8$ and $12$.`),
      ],
      ket: b(R`Giá trị lớn nhất của $F$ là $12$ tại $(0;4)$.`, R`The maximum of $F$ is $12$ at $(0,4)$.`),
      checks: [{ expr: "Max(0,2*4,3*4)", expect: "12" }],
    },
    mistake: b(R`Lấy giao của hai đường biên làm đỉnh mà không kiểm tra các bất phương trình còn lại.`, R`Taking the meeting point of two boundaries as a vertex without checking the other inequalities.`),
    drill: { prompt: b(R`Điểm $(1;2)$ có thuộc miền $x+2y\le 6$ không?`, R`Does the point $(1,2)$ lie in the region $x+2y\le 6$?`), answer: b(R`Có, vì $1+4=5\le 6$.`, R`Yes, because $1+4=5\le 6$.`), checks: [{ expr: "Le(1+2*2,6)", expect: "True" }] },
  },
  {
    name: b(R`Hàm số bậc hai: đỉnh và giá trị lớn nhất, nhỏ nhất`, R`Quadratic functions: vertex and extreme values`),
    spot: b(R`Hàm $y=ax^2+bx+c$, hỏi đỉnh, trục đối xứng, giá trị lớn nhất hay nhỏ nhất.`, R`A function $y=ax^2+bx+c$ with questions on the vertex, axis, or maximum or minimum.`),
    method: [
      b(R`Hoành độ đỉnh $x=-\frac{b}{2a}$; thay vào hàm để có tung độ.`, R`The vertex is at $x=-\frac{b}{2a}$; substitute for its height.`),
      b(R`Nếu $a>0$ thì đỉnh là giá trị nhỏ nhất, nếu $a<0$ thì đỉnh là giá trị lớn nhất.`, R`If $a>0$ the vertex is the minimum; if $a<0$ it is the maximum.`),
    ],
    example: {
      prompt: b(R`Một vật bị ném lên có độ cao $h=-5t^2+20t+1$ mét. Độ cao lớn nhất là bao nhiêu?`, R`A thrown object has height $h=-5t^2+20t+1$ metres. What is the greatest height?`),
      steps: [
        b(R`Hoành độ đỉnh $t=-\frac{20}{2\cdot(-5)}=2$ giây.`, R`The vertex is at $t=-\frac{20}{2\cdot(-5)}=2$ seconds.`),
        b(R`Độ cao là $h(2)=-20+40+1=21$ mét, và đó là lớn nhất vì $a<0$.`, R`The height is $h(2)=-20+40+1=21$ metres, the maximum because $a<0$.`),
      ],
      ket: b(R`Độ cao lớn nhất là $21$ mét.`, R`The greatest height is $21$ metres.`),
      checks: [{ expr: "(-5*t**2+20*t+1).subs(t,2)", expect: "21" }],
    },
    mistake: b(R`Quên dấu trừ trong hoành độ đỉnh.`, R`Dropping the minus sign in the vertex formula.`),
    drill: { prompt: b(R`Tìm giá trị nhỏ nhất của $y=x^2-6x+5$.`, R`Find the minimum of $y=x^2-6x+5$.`), answer: b(R`Bằng $-4$, tại $x=3$.`, R`It is $-4$, at $x=3$.`), checks: [{ expr: "(x**2-6*x+5).subs(x,3)", expect: "-4" }] },
  },
  {
    name: b(R`Dấu của tam thức bậc hai và bất phương trình bậc hai`, R`Sign of a quadratic and quadratic inequalities`),
    spot: b(R`Có $ax^2+bx+c>0$ hoặc $\le 0$, hoặc tìm $m$ để bất phương trình đúng với mọi $x$.`, R`An inequality $ax^2+bx+c>0$ or $\le 0$, or finding $m$ so that it holds for all $x$.`),
    method: [
      b(R`Tìm nghiệm của tam thức (nếu có) và lập bảng xét dấu.`, R`Find the roots of the quadratic (if any) and make a sign table.`),
      b(R`Chọn các khoảng có dấu đúng chiều; bất phương trình không chặt nhận cả nghiệm.`, R`Pick the intervals with the matching sign; a non-strict inequality includes the roots.`),
    ],
    example: {
      prompt: b(R`Giải $x^2-3x-4\le 0$.`, R`Solve $x^2-3x-4\le 0$.`),
      steps: [
        b(R`Tam thức có hai nghiệm $-1$ và $4$, và $a=1>0$.`, R`The quadratic has roots $-1$ and $4$, and $a=1>0$.`),
        b(R`Tam thức không dương trong đoạn giữa hai nghiệm.`, R`The quadratic is non-positive between the two roots.`),
      ],
      ket: b(R`Tập nghiệm là $[-1;4]$.`, R`The solution set is $[-1,4]$.`),
      checks: [{ expr: "solve(x**2-3*x-4<=0,x)", expect: "(x>=-1)&(x<=4)" }],
    },
    mistake: b(R`Dùng quy tắc "trong trái, ngoài cùng" khi $\Delta\le 0$.`, R`Using the "opposite inside, same outside" rule when $\Delta\le 0$.`),
    drill: { prompt: b(R`Giải $x^2-9>0$.`, R`Solve $x^2-9>0$.`), answer: b(R`Tập nghiệm $(-\infty;-3)\cup(3;+\infty)$.`, R`The solution set is $(-\infty,-3)\cup(3,+\infty)$.`), checks: [{ expr: "solve(x**2-9>0,x)", expect: "((x<-3)&(-oo<x))|((x<oo)&(x>3))" }] },
  },
  {
    name: b(R`Phương trình chứa căn bậc hai`, R`Equations with square roots`),
    spot: b(R`Có $\sqrt{f(x)}=g(x)$ hoặc $\sqrt{f(x)}=\sqrt{g(x)}$.`, R`An equation $\sqrt{f(x)}=g(x)$ or $\sqrt{f(x)}=\sqrt{g(x)}$.`),
    method: [
      b(R`Đặt điều kiện: biểu thức trong căn không âm và vế còn lại không âm.`, R`State the conditions: the radicand non-negative and the other side non-negative.`),
      b(R`Bình phương hai vế, giải phương trình mới rồi thử lại và loại nghiệm ngoại lai.`, R`Square both sides, solve the new equation, then check and reject extraneous roots.`),
    ],
    example: {
      prompt: b(R`Giải $\sqrt{x+6}=x$.`, R`Solve $\sqrt{x+6}=x$.`),
      steps: [
        b(R`Điều kiện $x\ge 0$. Bình phương: $x+6=x^2$, tức $x^2-x-6=0$, nên $x=3$ hoặc $x=-2$.`, R`Condition $x\ge 0$. Squaring: $x+6=x^2$, that is $x^2-x-6=0$, so $x=3$ or $x=-2$.`),
        b(R`Loại $x=-2$ vì âm; thử $x=3$: $\sqrt{9}=3$ đúng.`, R`Reject $x=-2$ since it is negative; check $x=3$: $\sqrt{9}=3$ is true.`),
      ],
      ket: b(R`Nghiệm duy nhất là $x=3$.`, R`The only solution is $x=3$.`),
      checks: [{ expr: "sqrt(3+6)-3", expect: "0" }],
    },
    mistake: b(R`Bình phương rồi nhận hết các nghiệm.`, R`Squaring and keeping every solution.`),
    drill: { prompt: b(R`Giải $\sqrt{2x+3}=3$.`, R`Solve $\sqrt{2x+3}=3$.`), answer: b(R`Nghiệm $x=3$.`, R`The solution is $x=3$.`), checks: [{ expr: "solve(2*x+3-9,x)[0]", expect: "3" }] },
  },
  {
    name: b(R`Giải tam giác bằng định lí sin và côsin`, R`Solving triangles with the laws of sines and cosines`),
    spot: b(R`Tam giác không vuông cho hai cạnh một góc, hoặc ba cạnh, hoặc hai góc một cạnh.`, R`A non-right triangle given two sides and an angle, three sides, or two angles and a side.`),
    method: [
      b(R`Có hai cạnh và góc xen giữa, hoặc ba cạnh: dùng định lí côsin.`, R`Two sides with the included angle, or three sides: use the law of cosines.`),
      b(R`Có một cạnh và góc đối diện: dùng định lí sin $\frac{a}{\sin A}=\frac{b}{\sin B}=2R$.`, R`A side with its opposite angle: use the law of sines $\frac{a}{\sin A}=\frac{b}{\sin B}=2R$.`),
    ],
    example: {
      prompt: b(R`Tam giác $ABC$ có $AB=5$, $AC=8$ và góc $A=60^\circ$. Tính $BC$.`, R`Triangle $ABC$ has $AB=5$, $AC=8$ and angle $A=60^\circ$. Find $BC$.`),
      steps: [
        b(R`Theo định lí côsin: $BC^2=5^2+8^2-2\cdot 5\cdot 8\cdot\cos 60^\circ$.`, R`By the law of cosines: $BC^2=5^2+8^2-2\cdot 5\cdot 8\cdot\cos 60^\circ$.`),
        b(R`Tính: $25+64-40=49$, nên $BC=7$.`, R`Compute: $25+64-40=49$, so $BC=7$.`),
      ],
      ket: b(R`Cạnh $BC=7$.`, R`The side $BC=7$.`),
      checks: [{ expr: "sqrt(5**2+8**2-2*5*8*cos(pi/3))", expect: "7" }],
    },
    mistake: b(R`Dùng góc không xen giữa hai cạnh đã biết.`, R`Using an angle that is not between the two known sides.`),
    drill: { prompt: b(R`Tam giác có cạnh $a=10$ đối diện góc $30^\circ$. Bán kính đường tròn ngoại tiếp là bao nhiêu?`, R`A triangle has side $a=10$ opposite an angle of $30^\circ$. What is the circumradius?`), answer: b(R`Bằng $10$.`, R`It is $10$.`), checks: [{ expr: "10/(2*sin(pi/6))", expect: "10" }] },
  },
  {
    name: b(R`Vectơ trong mặt phẳng tọa độ và tích vô hướng`, R`Vectors in the coordinate plane and the dot product`),
    spot: b(R`Có tọa độ điểm, vectơ, hoặc hỏi góc, vuông góc, trung điểm.`, R`Coordinates of points or vectors, or questions on angles, perpendicularity or midpoints.`),
    method: [
      b(R`Tọa độ vectơ $\overrightarrow{AB}$ bằng tọa độ $B$ trừ tọa độ $A$.`, R`The coordinates of $\overrightarrow{AB}$ are those of $B$ minus those of $A$.`),
      b(R`Tích vô hướng $x_1x_2+y_1y_2$; bằng $0$ thì vuông góc; góc tính bằng $\cos=\frac{\vec u\cdot\vec v}{|\vec u||\vec v|}$.`, R`The dot product is $x_1x_2+y_1y_2$; $0$ means perpendicular; the angle comes from $\cos=\frac{\vec u\cdot\vec v}{|\vec u||\vec v|}$.`),
    ],
    example: {
      prompt: b(R`Cho $A(1;2)$, $B(4;6)$, $C(5;3)$. Chứng minh $AB\perp AC$ hoặc kết luận không vuông.`, R`Given $A(1,2)$, $B(4,6)$, $C(5,3)$, test whether $AB\perp AC$.`),
      steps: [
        b(R`Ta có $\overrightarrow{AB}=(3;4)$ và $\overrightarrow{AC}=(4;1)$.`, R`We have $\overrightarrow{AB}=(3,4)$ and $\overrightarrow{AC}=(4,1)$.`),
        b(R`Tích vô hướng là $3\cdot 4+4\cdot 1=16\neq 0$, nên không vuông.`, R`The dot product is $3\cdot 4+4\cdot 1=16\neq 0$, so they are not perpendicular.`),
      ],
      ket: b(R`Vậy $AB$ không vuông góc với $AC$.`, R`So $AB$ is not perpendicular to $AC$.`),
      checks: [{ expr: "3*4+4*1", expect: "16" }],
    },
    mistake: b(R`Lấy tọa độ điểm đầu trừ điểm cuối.`, R`Subtracting the end point from the starting point.`),
    drill: { prompt: b(R`Tính tích vô hướng của $(2;-1)$ và $(3;6)$.`, R`Find the dot product of $(2,-1)$ and $(3,6)$.`), answer: b(R`Bằng $0$, nên hai vectơ vuông góc.`, R`It is $0$, so the vectors are perpendicular.`), checks: [{ expr: "2*3+(-1)*6", expect: "0" }] },
  },
  {
    name: b(R`Phương trình đường thẳng và khoảng cách`, R`Equations of lines and distances`),
    spot: b(R`Có đường thẳng qua hai điểm, song song, vuông góc, hoặc khoảng cách từ điểm.`, R`A line through two points, parallel or perpendicular lines, or the distance from a point.`),
    method: [
      b(R`Tìm một vectơ pháp tuyến $(a;b)$, viết $a(x-x_0)+b(y-y_0)=0$.`, R`Find a normal vector $(a,b)$ and write $a(x-x_0)+b(y-y_0)=0$.`),
      b(R`Khoảng cách từ $M_0$ đến $ax+by+c=0$ là $\frac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$.`, R`The distance from $M_0$ to $ax+by+c=0$ is $\frac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$.`),
    ],
    example: {
      prompt: b(R`Tính khoảng cách từ $M(2;3)$ đến đường thẳng $3x+4y-5=0$.`, R`Find the distance from $M(2,3)$ to the line $3x+4y-5=0$.`),
      steps: [
        b(R`Tử là $|3\cdot 2+4\cdot 3-5|=13$.`, R`The numerator is $|3\cdot 2+4\cdot 3-5|=13$.`),
        b(R`Mẫu là $\sqrt{9+16}=5$, nên khoảng cách là $\frac{13}{5}$.`, R`The denominator is $\sqrt{9+16}=5$, so the distance is $\frac{13}{5}$.`),
      ],
      ket: b(R`Khoảng cách bằng $\frac{13}{5}$.`, R`The distance is $\frac{13}{5}$.`),
      checks: [{ expr: "Abs(3*2+4*3-5)/sqrt(3**2+4**2)", expect: "Rational(13,5)" }],
    },
    mistake: b(R`Lấy $(a;b)$ làm vectơ chỉ phương thay vì pháp tuyến.`, R`Taking $(a,b)$ as a direction vector instead of a normal.`),
    drill: { prompt: b(R`Viết đường thẳng qua $A(1;1)$ có pháp tuyến $(2;-1)$.`, R`Write the line through $A(1,1)$ with normal $(2,-1)$.`), answer: b(R`Phương trình $2x-y-1=0$.`, R`The equation is $2x-y-1=0$.`), checks: [{ expr: "expand(2*(x-1)-(y-1))", expect: "2*x-y-1" }] },
  },
  {
    name: b(R`Phương trình đường tròn`, R`Equation of a circle`),
    spot: b(R`Có tâm và bán kính, ba điểm, hoặc dạng $x^2+y^2+2ax+2by+c=0$.`, R`A centre and radius, three points, or the form $x^2+y^2+2ax+2by+c=0$.`),
    method: [
      b(R`Viết $(x-a)^2+(y-b)^2=R^2$ với tâm $(a;b)$.`, R`Write $(x-a)^2+(y-b)^2=R^2$ with centre $(a,b)$.`),
      b(R`Từ dạng khai triển, nhóm theo từng biến và hoàn thành bình phương.`, R`From the expanded form, group by variable and complete the squares.`),
    ],
    example: {
      prompt: b(R`Tìm tâm và bán kính của đường tròn $x^2+y^2-6x+4y-12=0$.`, R`Find the centre and radius of the circle $x^2+y^2-6x+4y-12=0$.`),
      steps: [
        b(R`Hoàn thành bình phương: $(x-3)^2+(y+2)^2=12+9+4=25$.`, R`Completing squares: $(x-3)^2+(y+2)^2=12+9+4=25$.`),
        b(R`Suy ra tâm $(3;-2)$ và bán kính $5$.`, R`So the centre is $(3,-2)$ and the radius is $5$.`),
      ],
      ket: b(R`Tâm $I(3;-2)$, bán kính $5$.`, R`Centre $I(3,-2)$, radius $5$.`),
      checks: [{ expr: "expand((x-3)**2+(y+2)**2-25)", expect: "x**2+y**2-6*x+4*y-12" }],
    },
    mistake: b(R`Đọc sai dấu tâm và quên lấy căn của vế phải.`, R`Misreading the signs of the centre and forgetting to take the root of the right side.`),
    drill: { prompt: b(R`Viết đường tròn tâm $O(0;0)$ bán kính $4$.`, R`Write the circle with centre $O(0,0)$ and radius $4$.`), answer: b(R`Phương trình $x^2+y^2=16$.`, R`The equation is $x^2+y^2=16$.`), checks: [{ expr: "4**2", expect: "16" }] },
  },
  {
    name: b(R`Quy tắc cộng, quy tắc nhân, hoán vị, chỉnh hợp và tổ hợp`, R`Sum and product rules, permutations, arrangements and combinations`),
    spot: b(R`Đề hỏi "có bao nhiêu cách" chọn, xếp, lập số.`, R`The problem asks "in how many ways" to choose, arrange or form numbers.`),
    method: [
      b(R`Các bước nối tiếp thì nhân, các trường hợp loại trừ nhau thì cộng.`, R`Successive steps multiply; mutually exclusive cases add.`),
      b(R`Có thứ tự thì dùng hoán vị hoặc chỉnh hợp, không thứ tự thì dùng tổ hợp $C_n^k$.`, R`If order matters use permutations or arrangements; otherwise use combinations $C_n^k$.`),
    ],
    example: {
      prompt: b(R`Chọn $3$ bạn từ $8$ bạn để lập một đội, rồi chọn một đội trưởng trong đội đó. Có bao nhiêu cách?`, R`Choose $3$ pupils out of $8$ to form a team, then pick a captain from the team. In how many ways?`),
      steps: [
        b(R`Chọn đội không kể thứ tự: $C_8^3=56$ cách.`, R`Choosing the team without order: $C_8^3=56$ ways.`),
        b(R`Chọn đội trưởng trong $3$ bạn: $3$ cách, nên nhân: $56\cdot 3=168$.`, R`Picking the captain from $3$: $3$ ways, so multiply: $56\cdot 3=168$.`),
      ],
      ket: b(R`Có $168$ cách.`, R`There are $168$ ways.`),
      checks: [{ expr: "binomial(8,3)*3", expect: "168" }],
    },
    mistake: b(R`Dùng chỉnh hợp khi thứ tự không có ý nghĩa.`, R`Using arrangements when order does not matter.`),
    drill: { prompt: b(R`Có bao nhiêu cách xếp $5$ bạn thành một hàng?`, R`In how many ways can $5$ pupils line up?`), answer: b(R`Có $120$ cách.`, R`There are $120$ ways.`), checks: [{ expr: "factorial(5)", expect: "120" }] },
  },
  {
    name: b(R`Số trung bình, trung vị và phương sai của mẫu số liệu`, R`Mean, median and variance of a data set`),
    spot: b(R`Đề cho một dãy số liệu và hỏi số trung bình, trung vị hoặc phương sai.`, R`The problem gives a list of data and asks for the mean, median or variance.`),
    method: [
      b(R`Sắp xếp số liệu từ bé đến lớn.`, R`Sort the data from smallest to largest.`),
      b(R`Trung bình là tổng chia cho số số liệu; trung vị là số ở giữa, hoặc trung bình hai số giữa.`, R`The mean is the total divided by the count; the median is the middle value, or the mean of the two middle values.`),
      b(R`Phương sai là trung bình của bình phương các độ lệch so với số trung bình.`, R`The variance is the mean of the squared deviations from the mean.`),
    ],
    example: {
      prompt: b(R`Số liệu $2$, $4$, $4$, $6$, $9$. Tìm số trung bình, trung vị và phương sai.`, R`The data are $2$, $4$, $4$, $6$, $9$. Find the mean, the median and the variance.`),
      steps: [
        b(R`Số trung bình: $\frac{2+4+4+6+9}{5}=5$.`, R`Mean: $\frac{2+4+4+6+9}{5}=5$.`),
        b(R`Trung vị là số ở giữa: $4$.`, R`The median is the middle value: $4$.`),
        b(R`Phương sai: $\frac{9+1+1+1+16}{5}=\frac{28}{5}$.`, R`Variance: $\frac{9+1+1+1+16}{5}=\frac{28}{5}$.`),
      ],
      ket: b(R`Trung bình $5$, trung vị $4$, phương sai $\frac{28}{5}$.`, R`Mean $5$, median $4$, variance $\frac{28}{5}$.`),
      checks: [{ expr: "Rational(2+4+4+6+9,5)", expect: "5" }, { expr: "Rational(9+1+1+1+16,5)", expect: "Rational(28,5)" }],
    },
    mistake: b(R`Tìm trung vị mà quên sắp xếp số liệu trước.`, R`Finding the median without sorting the data first.`),
    drill: { prompt: b(R`Tìm trung vị của $3$, $9$, $5$, $7$.`, R`Find the median of $3$, $9$, $5$, $7$.`), answer: b(R`Sắp xếp được $3$, $5$, $7$, $9$ nên trung vị là $\frac{5+7}{2}=6$.`, R`Sorted: $3$, $5$, $7$, $9$, so the median is $\frac{5+7}{2}=6$.`), checks: [{ expr: "Rational(5+7,2)", expect: "6" }] },
  },
];

export default lop10;

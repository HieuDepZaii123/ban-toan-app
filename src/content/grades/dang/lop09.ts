import type { GradeDang } from "./types.ts";
import { b } from "./types.ts";

const R = String.raw;

const lop09: GradeDang[] = [
  {
    name: b(R`Rút gọn biểu thức chứa căn bậc hai`, R`Simplifying expressions with square roots`),
    spot: b(R`Biểu thức có $\sqrt{x}$, tổng hoặc hiệu các căn, hoặc mẫu chứa căn.`, R`An expression with $\sqrt{x}$, sums or differences of roots, or a root in the denominator.`),
    method: [
      b(R`Tìm điều kiện xác định: số dưới căn không âm, mẫu khác $0$.`, R`State the domain: numbers under roots non-negative, denominators not $0$.`),
      b(R`Đưa thừa số ra ngoài căn, trục căn ở mẫu, rồi gộp các căn đồng dạng.`, R`Take factors out of roots, rationalise denominators, then combine like roots.`),
    ],
    example: {
      prompt: b(R`Rút gọn $\sqrt{75}-\sqrt{12}+\frac{6}{\sqrt{3}}$.`, R`Simplify $\sqrt{75}-\sqrt{12}+\frac{6}{\sqrt{3}}$.`),
      steps: [
        b(R`Đưa ra ngoài căn: $\sqrt{75}=5\sqrt{3}$ và $\sqrt{12}=2\sqrt{3}$.`, R`Take factors out: $\sqrt{75}=5\sqrt{3}$ and $\sqrt{12}=2\sqrt{3}$.`),
        b(R`Trục căn: $\frac{6}{\sqrt{3}}=2\sqrt{3}$, nên tổng là $(5-2+2)\sqrt{3}=5\sqrt{3}$.`, R`Rationalise: $\frac{6}{\sqrt{3}}=2\sqrt{3}$, so the total is $(5-2+2)\sqrt{3}=5\sqrt{3}$.`),
      ],
      ket: b(R`Biểu thức bằng $5\sqrt{3}$.`, R`The expression equals $5\sqrt{3}$.`),
      checks: [{ expr: "sqrt(75)-sqrt(12)+6/sqrt(3)", expect: "5*sqrt(3)" }],
    },
    mistake: b(R`Viết $\sqrt{a^2}=a$ cho mọi $a$.`, R`Writing $\sqrt{a^2}=a$ for every $a$.`),
    drill: { prompt: b(R`Rút gọn $\frac{4}{\sqrt{5}-1}$.`, R`Simplify $\frac{4}{\sqrt{5}-1}$.`), answer: b(R`Bằng $\sqrt{5}+1$.`, R`It is $\sqrt{5}+1$.`), checks: [{ expr: "radsimp(4/(sqrt(5)-1))", expect: "sqrt(5)+1" }] },
  },
  {
    name: b(R`Căn bậc ba và biến đổi căn`, R`Cube roots and manipulating roots`),
    spot: b(R`Có $\sqrt[3]{\ }$, hoặc tích, thương các căn cùng bậc.`, R`A cube root $\sqrt[3]{\ }$, or products and quotients of roots of the same order.`),
    method: [
      b(R`Tìm số có lập phương bằng số dưới căn; số âm cũng có căn bậc ba.`, R`Find the number whose cube is the number under the root; negative numbers have cube roots too.`),
      b(R`Gộp $\sqrt[3]{a}\cdot\sqrt[3]{b}=\sqrt[3]{ab}$ rồi rút gọn.`, R`Combine $\sqrt[3]{a}\cdot\sqrt[3]{b}=\sqrt[3]{ab}$ then simplify.`),
    ],
    example: {
      prompt: b(R`Tính $\sqrt[3]{16}\cdot\sqrt[3]{4}-\sqrt[3]{-27}$.`, R`Work out $\sqrt[3]{16}\cdot\sqrt[3]{4}-\sqrt[3]{-27}$.`),
      steps: [
        b(R`Gộp: $\sqrt[3]{16\cdot 4}=\sqrt[3]{64}=4$.`, R`Combine: $\sqrt[3]{16\cdot 4}=\sqrt[3]{64}=4$.`),
        b(R`Ta có $\sqrt[3]{-27}=-3$, nên kết quả là $4-(-3)=7$.`, R`We have $\sqrt[3]{-27}=-3$, so the result is $4-(-3)=7$.`),
      ],
      ket: b(R`Giá trị bằng $7$.`, R`The value is $7$.`),
      checks: [{ expr: "cbrt(64)+3", expect: "7" }],
    },
    mistake: b(R`Cho rằng số âm không có căn bậc ba.`, R`Thinking negative numbers have no cube root.`),
    drill: { prompt: b(R`Tính $\sqrt[3]{-8}+\sqrt[3]{125}$.`, R`Work out $\sqrt[3]{-8}+\sqrt[3]{125}$.`), answer: b(R`Bằng $3$.`, R`It is $3$.`), checks: [{ expr: "-2+5", expect: "3" }] },
  },
  {
    name: b(R`Giải hệ hai phương trình bậc nhất hai ẩn`, R`Solving systems of two linear equations`),
    spot: b(R`Hai phương trình bậc nhất có cùng hai ẩn $x$, $y$.`, R`Two linear equations in the same two unknowns $x$, $y$.`),
    method: [
      b(R`Nhân các phương trình để hệ số của một ẩn bằng nhau hoặc đối nhau, rồi cộng hoặc trừ.`, R`Scale the equations so one unknown has equal or opposite coefficients, then add or subtract.`),
      b(R`Tìm một ẩn, thế ngược lại tìm ẩn kia và thử vào cả hai phương trình.`, R`Find one unknown, substitute back for the other, and check in both equations.`),
    ],
    example: {
      prompt: b(R`Giải hệ $3x+2y=16$ và $x-y=2$.`, R`Solve the system $3x+2y=16$ and $x-y=2$.`),
      steps: [
        b(R`Nhân phương trình hai với $2$: $2x-2y=4$, rồi cộng với phương trình một: $5x=20$.`, R`Multiply the second equation by $2$: $2x-2y=4$, then add the first: $5x=20$.`),
        b(R`Suy ra $x=4$, và $y=x-2=2$.`, R`So $x=4$, and $y=x-2=2$.`),
      ],
      ket: b(R`Nghiệm là $(x;y)=(4;2)$.`, R`The solution is $(x,y)=(4,2)$.`),
      checks: [{ expr: "solve([3*x+2*y-16,x-y-2],[x,y])[x]", expect: "4" }],
    },
    mistake: b(R`Quên đổi dấu khi trừ hai phương trình.`, R`Forgetting to change signs when subtracting the equations.`),
    drill: { prompt: b(R`Giải hệ $x+y=7$ và $x-y=1$.`, R`Solve the system $x+y=7$ and $x-y=1$.`), answer: b(R`Nghiệm $(4;3)$.`, R`The solution is $(4,3)$.`), checks: [{ expr: "solve([x+y-7,x-y-1],[x,y])[x]", expect: "4" }] },
  },
  {
    name: b(R`Giải bài toán bằng cách lập hệ phương trình`, R`Solving word problems with systems of equations`),
    spot: b(R`Bài toán có hai đại lượng chưa biết và hai mối quan hệ.`, R`A problem with two unknown quantities and two relationships.`),
    method: [
      b(R`Đặt hai ẩn với điều kiện và đơn vị.`, R`Introduce two unknowns with conditions and units.`),
      b(R`Lập hai phương trình từ hai mối quan hệ, giải hệ, đối chiếu và trả lời.`, R`Form two equations from the two relations, solve, check and answer.`),
    ],
    example: {
      prompt: b(R`Mua $2$ bút và $3$ vở hết $41$ nghìn đồng, mua $3$ bút và $2$ vở hết $39$ nghìn đồng. Tính giá một bút và một vở.`, R`Buying $2$ pens and $3$ notebooks costs $41$ thousand dong; buying $3$ pens and $2$ notebooks costs $39$ thousand dong. Find the price of a pen and of a notebook.`),
      steps: [
        b(R`Gọi giá bút là $x$ và giá vở là $y$: $2x+3y=41$ và $3x+2y=39$.`, R`Let the pen cost $x$ and the notebook $y$: $2x+3y=41$ and $3x+2y=39$.`),
        b(R`Giải hệ được $x=7$ và $y=9$.`, R`Solving the system gives $x=7$ and $y=9$.`),
      ],
      ket: b(R`Một bút $7$ nghìn đồng, một vở $9$ nghìn đồng.`, R`A pen costs $7$ thousand dong and a notebook $9$ thousand dong.`),
      checks: [{ expr: "solve([2*x+3*y-41,3*x+2*y-39],[x,y])[x]", expect: "7" }],
    },
    mistake: b(R`Quên điều kiện và trả lời sai đại lượng đề hỏi.`, R`Forgetting the conditions and answering the wrong quantity.`),
    drill: { prompt: b(R`Hai số có tổng $40$ và hiệu $6$. Tìm hai số.`, R`Two numbers have sum $40$ and difference $6$. Find them.`), answer: b(R`Hai số là $23$ và $17$.`, R`The numbers are $23$ and $17$.`), checks: [{ expr: "solve([x+y-40,x-y-6],[x,y])[x]", expect: "23" }] },
  },
  {
    name: b(R`Phương trình bậc hai: công thức nghiệm và Vi-ét`, R`Quadratic equations: the formula and Vieta`),
    spot: b(R`Phương trình $ax^2+bx+c=0$, hoặc hỏi tổng, tích hai nghiệm.`, R`An equation $ax^2+bx+c=0$, or a question on the sum or product of its roots.`),
    method: [
      b(R`Tính $\Delta=b^2-4ac$ và xét dấu để biết số nghiệm.`, R`Compute $\Delta=b^2-4ac$ and use its sign for the number of roots.`),
      b(R`Dùng $x=\frac{-b\pm\sqrt{\Delta}}{2a}$; tổng hai nghiệm là $-\frac{b}{a}$, tích là $\frac{c}{a}$.`, R`Use $x=\frac{-b\pm\sqrt{\Delta}}{2a}$; the sum of roots is $-\frac{b}{a}$ and the product is $\frac{c}{a}$.`),
    ],
    example: {
      prompt: b(R`Giải $2x^2-7x+3=0$ và tính tổng, tích hai nghiệm.`, R`Solve $2x^2-7x+3=0$ and find the sum and product of its roots.`),
      steps: [
        b(R`Ta có $\Delta=49-24=25$, nên $x=\frac{7\pm 5}{4}$, tức $x=3$ hoặc $x=\frac{1}{2}$.`, R`We have $\Delta=49-24=25$, so $x=\frac{7\pm 5}{4}$, that is $x=3$ or $x=\frac{1}{2}$.`),
        b(R`Theo Vi-ét: tổng bằng $\frac{7}{2}$ và tích bằng $\frac{3}{2}$.`, R`By Vieta: the sum is $\frac{7}{2}$ and the product is $\frac{3}{2}$.`),
      ],
      ket: b(R`Hai nghiệm là $3$ và $\frac{1}{2}$, tổng $\frac{7}{2}$, tích $\frac{3}{2}$.`, R`The roots are $3$ and $\frac{1}{2}$, with sum $\frac{7}{2}$ and product $\frac{3}{2}$.`),
      checks: [{ expr: "solve(2*x**2-7*x+3,x)", expect: "[Rational(1,2), 3]" }, { expr: "3+Rational(1,2)", expect: "Rational(7,2)" }],
    },
    mistake: b(R`Tính $\Delta$ sai dấu khi $c$ âm.`, R`Getting the sign of $\Delta$ wrong when $c$ is negative.`),
    drill: { prompt: b(R`Giải $x^2-5x+4=0$.`, R`Solve $x^2-5x+4=0$.`), answer: b(R`Hai nghiệm $1$ và $4$.`, R`The roots are $1$ and $4$.`), checks: [{ expr: "solve(x**2-5*x+4,x)", expect: "[1, 4]" }] },
  },
  {
    name: b(R`Bất phương trình bậc nhất một ẩn`, R`Linear inequalities in one unknown`),
    spot: b(R`Có dấu $<$, $>$, $\le$, $\ge$ và $x$ ở bậc nhất.`, R`The signs $<$, $>$, $\le$, $\ge$ with $x$ to the first power.`),
    method: [
      b(R`Chuyển vế như phương trình, đổi dấu hạng tử chuyển sang.`, R`Move terms like an equation, changing the sign of the moved term.`),
      b(R`Nhân hay chia cho số âm thì đổi chiều bất đẳng thức; viết tập nghiệm bằng khoảng.`, R`Multiplying or dividing by a negative reverses the inequality; write the solution as an interval.`),
    ],
    example: {
      prompt: b(R`Giải $7-2x\le 3x-8$.`, R`Solve $7-2x\le 3x-8$.`),
      steps: [
        b(R`Chuyển vế: $15\le 5x$.`, R`Move terms: $15\le 5x$.`),
        b(R`Rồi chia cho $5>0$: $x\ge 3$.`, R`Then divide by $5>0$: $x\ge 3$.`),
      ],
      ket: b(R`Tập nghiệm là $[3;+\infty)$.`, R`The solution set is $[3,+\infty)$.`),
      checks: [{ expr: "solve(7-2*x<=3*x-8,x)", expect: "(x>=3)&(x<oo)" }],
    },
    mistake: b(R`Chia cho số âm mà không đổi chiều.`, R`Dividing by a negative without reversing the direction.`),
    drill: { prompt: b(R`Giải $-3x+4>10$.`, R`Solve $-3x+4>10$.`), answer: b(R`Tập nghiệm $x<-2$.`, R`The solution is $x<-2$.`), checks: [{ expr: "solve(-3*x+4>10,x)", expect: "(x<-2)&(-oo<x)" }] },
  },
  {
    name: b(R`Hàm số $y=ax^2$ và đồ thị parabol`, R`The function $y=ax^2$ and its parabola`),
    spot: b(R`Đồ thị đi qua một điểm, hoặc giao với một đường thẳng.`, R`A graph through a point, or meeting a line.`),
    method: [
      b(R`Thay tọa độ điểm vào $y=ax^2$ để tìm $a$.`, R`Substitute the point's coordinates into $y=ax^2$ to find $a$.`),
      b(R`Tìm giao điểm với đường thẳng bằng cách giải phương trình hoành độ giao điểm.`, R`Find the intersections with a line by solving the equation of their first coordinates.`),
    ],
    example: {
      prompt: b(R`Parabol $y=ax^2$ đi qua $(2;-6)$. Tìm $a$, rồi tìm giao điểm của nó với đường thẳng $y=x-2$.`, R`The parabola $y=ax^2$ passes through $(2,-6)$. Find $a$, then find its intersections with the line $y=x-2$.`),
      steps: [
        b(R`Thay $(2;-6)$: $-6=4a$, nên $a=-\frac{3}{2}$.`, R`Substituting $(2,-6)$: $-6=4a$, so $a=-\frac{3}{2}$.`),
        b(R`Phương trình hoành độ giao điểm: $-\frac{3}{2}x^2=x-2$, tức $3x^2+2x-4=0$.`, R`The equation of the first coordinates: $-\frac{3}{2}x^2=x-2$, that is $3x^2+2x-4=0$.`),
        b(R`Có $\Delta=4+48=52>0$ nên có hai giao điểm, với $x=\frac{-1\pm\sqrt{13}}{3}$.`, R`Since $\Delta=4+48=52>0$ there are two intersections, with $x=\frac{-1\pm\sqrt{13}}{3}$.`),
      ],
      ket: b(R`Ta có $a=-\frac{3}{2}$, và parabol cắt đường thẳng tại hai điểm có hoành độ $x=\frac{-1\pm\sqrt{13}}{3}$.`, R`We have $a=-\frac{3}{2}$, and the parabola meets the line at two points with $x=\frac{-1\pm\sqrt{13}}{3}$.`),
      checks: [{ expr: "solve(4*a+6,a)[0]", expect: "Rational(-3,2)" }, { expr: "4-4*3*(-4)", expect: "52" }],
    },
    mistake: b(R`Tính $-2x^2$ tại $x=3$ thành $(-2\cdot 3)^2$.`, R`Computing $-2x^2$ at $x=3$ as $(-2\cdot 3)^2$.`),
    drill: { prompt: b(R`Tính $y=-\frac{1}{2}x^2$ tại $x=4$.`, R`Find $y=-\frac{1}{2}x^2$ at $x=4$.`), answer: b(R`Bằng $-8$.`, R`It is $-8$.`), checks: [{ expr: "-Rational(1,2)*4**2", expect: "-8" }] },
  },
  {
    name: b(R`Tỉ số lượng giác và giải tam giác vuông`, R`Trigonometric ratios and right triangles`),
    spot: b(R`Tam giác vuông cho một cạnh và một góc nhọn, hoặc chiều cao, khoảng cách đo gián tiếp.`, R`A right triangle with one side and an acute angle, or an indirect height or distance.`),
    method: [
      b(R`Xác định cạnh đối, cạnh kề và cạnh huyền so với góc đã cho.`, R`Identify the opposite, adjacent and hypotenuse relative to the given angle.`),
      b(R`Chọn sin, cos hoặc tan sao cho chứa cạnh đã biết và cạnh cần tìm.`, R`Choose sin, cos or tan that contains the known and wanted sides.`),
    ],
    example: {
      prompt: b(R`Từ một điểm cách chân tháp $30$ m, nhìn đỉnh tháp dưới góc $60^\circ$. Tính chiều cao tháp.`, R`From a point $30$ m from the foot of a tower, the top is seen at an angle of $60^\circ$. Find the height of the tower.`),
      steps: [
        b(R`Chiều cao là cạnh đối, khoảng cách là cạnh kề, nên dùng tang.`, R`The height is the opposite side and the distance the adjacent side, so use tangent.`),
        b(R`Chiều cao bằng $30\cdot\tan 60^\circ=30\sqrt{3}$ mét.`, R`The height is $30\cdot\tan 60^\circ=30\sqrt{3}$ metres.`),
      ],
      ket: b(R`Tháp cao $30\sqrt{3}\approx 51{,}96$ mét.`, R`The tower is $30\sqrt{3}\approx 51.96$ metres tall.`),
      checks: [{ expr: "30*tan(pi/3)", expect: "30*sqrt(3)" }],
    },
    mistake: b(R`Chọn nhầm cạnh đối và cạnh kề.`, R`Mixing up the opposite and adjacent sides.`),
    drill: { prompt: b(R`Tam giác vuông có cạnh huyền $10$ và một góc nhọn $30^\circ$. Cạnh đối góc đó dài bao nhiêu?`, R`A right triangle has hypotenuse $10$ and an acute angle of $30^\circ$. How long is the side opposite it?`), answer: b(R`Dài $5$.`, R`It is $5$ long.`), checks: [{ expr: "10*sin(pi/6)", expect: "5" }] },
  },
  {
    name: b(R`Đường tròn: tiếp tuyến, góc nội tiếp, tứ giác nội tiếp`, R`Circles: tangents, inscribed angles, cyclic quadrilaterals`),
    spot: b(R`Có đường tròn với tiếp tuyến, dây cung, hoặc chứng minh bốn điểm cùng thuộc đường tròn.`, R`A circle with tangents or chords, or a proof that four points are concyclic.`),
    method: [
      b(R`Tiếp tuyến vuông góc với bán kính tại tiếp điểm.`, R`A tangent is perpendicular to the radius at the point of contact.`),
      b(R`Góc nội tiếp bằng nửa góc ở tâm cùng chắn một cung; tứ giác có tổng hai góc đối bằng $180^\circ$ thì nội tiếp.`, R`An inscribed angle is half the central angle on the same arc; a quadrilateral with opposite angles totalling $180^\circ$ is cyclic.`),
    ],
    example: {
      prompt: b(R`Từ $A$ ngoài đường tròn tâm $O$ bán kính $5$ kẻ tiếp tuyến $AB$ với $OA=13$. Tính $AB$.`, R`From a point $A$ outside a circle with centre $O$ and radius $5$, a tangent $AB$ is drawn with $OA=13$. Find $AB$.`),
      steps: [
        b(R`Tiếp tuyến vuông góc bán kính nên tam giác $OBA$ vuông tại $B$.`, R`The tangent is perpendicular to the radius, so triangle $OBA$ has a right angle at $B$.`),
        b(R`Theo định lí Pythagore: $AB=\sqrt{13^2-5^2}=12$.`, R`By Pythagoras' theorem: $AB=\sqrt{13^2-5^2}=12$.`),
      ],
      ket: b(R`Độ dài $AB=12$.`, R`The length $AB=12$.`),
      checks: [{ expr: "sqrt(13**2-5**2)", expect: "12" }],
    },
    mistake: b(R`Lấy $OA$ làm cạnh góc vuông thay vì cạnh huyền.`, R`Taking $OA$ as a leg instead of the hypotenuse.`),
    drill: { prompt: b(R`Góc ở tâm chắn một cung bằng $100^\circ$. Góc nội tiếp chắn cung đó bằng bao nhiêu?`, R`A central angle on an arc is $100^\circ$. What is the inscribed angle on that arc?`), answer: b(R`Bằng $50^\circ$.`, R`It is $50^\circ$.`), checks: [{ expr: "100/2", expect: "50" }] },
  },
  {
    name: b(R`Độ dài cung, diện tích hình quạt, hình trụ, nón, cầu`, R`Arc length, sector area, cylinder, cone and sphere`),
    spot: b(R`Có cung tròn, hình quạt, hoặc vật hình trụ, nón, cầu.`, R`An arc, a sector, or an object shaped like a cylinder, cone or sphere.`),
    method: [
      b(R`Cung $n^\circ$: độ dài $\frac{\pi Rn}{180}$, diện tích quạt $\frac{\pi R^2n}{360}$.`, R`An arc of $n^\circ$: length $\frac{\pi Rn}{180}$, sector area $\frac{\pi R^2n}{360}$.`),
      b(R`Trụ: $\pi r^2h$; nón: $\frac{1}{3}\pi r^2h$; cầu: $\frac{4}{3}\pi r^3$.`, R`Cylinder: $\pi r^2h$; cone: $\frac{1}{3}\pi r^2h$; sphere: $\frac{4}{3}\pi r^3$.`),
    ],
    example: {
      prompt: b(R`Một hình nón có bán kính đáy $3$ và chiều cao $4$. Tính thể tích.`, R`A cone has base radius $3$ and height $4$. Find its volume.`),
      steps: [
        b(R`Diện tích đáy là $\pi\cdot 3^2=9\pi$.`, R`The base area is $\pi\cdot 3^2=9\pi$.`),
        b(R`Thể tích là $\frac{1}{3}\cdot 9\pi\cdot 4=12\pi$.`, R`The volume is $\frac{1}{3}\cdot 9\pi\cdot 4=12\pi$.`),
      ],
      ket: b(R`Thể tích bằng $12\pi$.`, R`The volume is $12\pi$.`),
      checks: [{ expr: "Rational(1,3)*pi*3**2*4", expect: "12*pi" }],
    },
    mistake: b(R`Dùng đường kính thay cho bán kính.`, R`Using the diameter instead of the radius.`),
    drill: { prompt: b(R`Cung $90^\circ$ của đường tròn bán kính $8$ dài bao nhiêu?`, R`How long is a $90^\circ$ arc of a circle of radius $8$?`), answer: b(R`Dài $4\pi$.`, R`It is $4\pi$ long.`), checks: [{ expr: "pi*8*90/180", expect: "4*pi" }] },
  },
  {
    name: b(R`Không gian mẫu và xác suất bằng liệt kê`, R`Sample space and probability by listing`),
    spot: b(R`Đề tung hai đồng xu, gieo hai xúc xắc hoặc chọn hai bạn rồi hỏi xác suất.`, R`The problem tosses two coins, rolls two dice or picks two pupils and asks for a probability.`),
    method: [
      b(R`Liệt kê không gian mẫu bằng bảng hoặc sơ đồ cây, coi thứ tự là khác nhau.`, R`List the sample space with a table or tree diagram, treating order as different.`),
      b(R`Đếm các kết quả thuận lợi trong bảng.`, R`Count the favourable outcomes in the table.`),
      b(R`Chia cho số phần tử của không gian mẫu.`, R`Divide by the number of elements of the sample space.`),
    ],
    example: {
      prompt: b(R`Gieo hai xúc xắc cân đối. Xác suất tổng số chấm bằng $7$ là bao nhiêu?`, R`Roll two fair dice. What is the probability that the total number of dots is $7$?`),
      steps: [
        b(R`Không gian mẫu có $6\cdot6=36$ kết quả.`, R`The sample space has $6\cdot6=36$ outcomes.`),
        b(R`Tổng $7$ có $(1;\ 6)$, $(2;\ 5)$, $(3;\ 4)$, $(4;\ 3)$, $(5;\ 2)$, $(6;\ 1)$, tức $6$ kết quả.`, R`A total of $7$ comes from $(1,\ 6)$, $(2,\ 5)$, $(3,\ 4)$, $(4,\ 3)$, $(5,\ 2)$, $(6,\ 1)$, that is $6$ outcomes.`),
        b(R`Vậy $P=\frac{6}{36}=\frac{1}{6}$.`, R`So $P=\frac{6}{36}=\frac{1}{6}$.`),
      ],
      ket: b(R`Xác suất là $\frac{1}{6}$.`, R`The probability is $\frac{1}{6}$.`),
      checks: [{ expr: "Rational(6,6*6)", expect: "Rational(1,6)" }],
    },
    mistake: b(R`Coi $(1;\ 6)$ và $(6;\ 1)$ là một kết quả nên đếm thiếu.`, R`Treating $(1,\ 6)$ and $(6,\ 1)$ as one outcome and undercounting.`),
    drill: { prompt: b(R`Tung hai đồng xu cân đối. Xác suất được hai mặt giống nhau là bao nhiêu?`, R`Toss two fair coins. What is the probability that both faces match?`), answer: b(R`Bằng $\frac{1}{2}$.`, R`It is $\frac{1}{2}$.`), checks: [{ expr: "Rational(2,4)", expect: "Rational(1,2)" }] },
  },
];

export default lop09;

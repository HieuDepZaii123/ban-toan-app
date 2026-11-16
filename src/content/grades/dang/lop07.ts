import type { GradeDang } from "./types.ts";
import { b } from "./types.ts";

const R = String.raw;

const lop07: GradeDang[] = [
  {
    name: b(R`Tính với số hữu tỉ`, R`Calculating with rational numbers`),
    spot: b(R`Biểu thức có phân số, số thập phân và số âm cùng lúc.`, R`An expression mixing fractions, decimals and negative numbers.`),
    method: [
      b(R`Đổi tất cả về phân số (hoặc cùng thập phân).`, R`Convert everything to fractions (or all to decimals).`),
      b(R`Làm theo thứ tự phép tính, chú ý dấu của từng số.`, R`Follow the order of operations, watching the sign of each number.`),
    ],
    example: {
      prompt: b(R`Tính $\left(-\frac{3}{4}+0{,}5\right):\frac{1}{8}$.`, R`Work out $\left(-\frac{3}{4}+0.5\right):\frac{1}{8}$.`),
      steps: [
        b(R`Đổi $0{,}5=\frac{1}{2}$, trong ngoặc: $-\frac{3}{4}+\frac{2}{4}=-\frac{1}{4}$.`, R`Change $0.5=\frac{1}{2}$; in brackets: $-\frac{3}{4}+\frac{2}{4}=-\frac{1}{4}$.`),
        b(R`Rồi chia: $-\frac{1}{4}\cdot 8=-2$.`, R`Then divide: $-\frac{1}{4}\cdot 8=-2$.`),
      ],
      ket: b(R`Kết quả là $-2$.`, R`The result is $-2$.`),
      checks: [{ expr: "(Rational(-3,4)+Rational(1,2))/Rational(1,8)", expect: "-2" }],
    },
    mistake: b(R`Bỏ sót dấu âm khi quy đồng mẫu số.`, R`Dropping the minus sign when finding a common denominator.`),
    drill: { prompt: b(R`Tính $\frac{2}{3}-\left(-\frac{1}{6}\right)\cdot 2$.`, R`Work out $\frac{2}{3}-\left(-\frac{1}{6}\right)\cdot 2$.`), answer: b(R`Bằng $1$.`, R`It is $1$.`), checks: [{ expr: "Rational(2,3)-Rational(-1,6)*2", expect: "1" }] },
  },
  {
    name: b(R`Căn bậc hai và so sánh số thực`, R`Square roots and comparing real numbers`),
    spot: b(R`Có dấu căn, số chính phương, hoặc so sánh $\sqrt{a}$ với một số.`, R`A root sign, perfect squares, or comparing $\sqrt{a}$ with a number.`),
    method: [
      b(R`Tìm số không âm có bình phương bằng số dưới căn.`, R`Find the non-negative number whose square is the number under the root.`),
      b(R`So sánh $\sqrt{a}$ với $b>0$ bằng cách so $a$ với $b^2$.`, R`Compare $\sqrt{a}$ with $b>0$ by comparing $a$ with $b^2$.`),
    ],
    example: {
      prompt: b(R`So sánh $\sqrt{45}$ với $6{,}5$.`, R`Compare $\sqrt{45}$ with $6.5$.`),
      steps: [
        b(R`Bình phương $6{,}5$ được $42{,}25$.`, R`Squaring $6.5$ gives $42.25$.`),
        b(R`Vì $45>42{,}25$ nên $\sqrt{45}>6{,}5$.`, R`Since $45>42.25$, we have $\sqrt{45}>6.5$.`),
      ],
      ket: b(R`Ta có $\sqrt{45}>6{,}5$.`, R`We have $\sqrt{45}>6.5$.`),
      checks: [{ expr: "Gt(45,Rational(65,10)**2)", expect: "True" }],
    },
    mistake: b(R`Viết $\sqrt{16}=\pm 4$.`, R`Writing $\sqrt{16}=\pm 4$.`),
    drill: { prompt: b(R`Tính $\sqrt{49}+\sqrt{0{,}16}$.`, R`Work out $\sqrt{49}+\sqrt{0.16}$.`), answer: b(R`Bằng $7{,}4$.`, R`It is $7.4$.`), checks: [{ expr: "sqrt(49)+sqrt(Rational(16,100))", expect: "Rational(74,10)" }] },
  },
  {
    name: b(R`Tỉ lệ thức và dãy tỉ số bằng nhau`, R`Proportions and chains of equal ratios`),
    spot: b(R`Có $\frac{a}{b}=\frac{c}{d}$, hoặc $\frac{x}{3}=\frac{y}{5}$ kèm tổng hoặc hiệu.`, R`A proportion $\frac{a}{b}=\frac{c}{d}$, or $\frac{x}{3}=\frac{y}{5}$ with a sum or difference.`),
    method: [
      b(R`Với một tỉ lệ thức, nhân chéo để có phương trình.`, R`For a single proportion, cross-multiply to get an equation.`),
      b(R`Với dãy tỉ số, dùng tính chất $\frac{a}{b}=\frac{c}{d}=\frac{a+c}{b+d}$ rồi tìm giá trị chung.`, R`For a chain, use $\frac{a}{b}=\frac{c}{d}=\frac{a+c}{b+d}$ and find the common value.`),
    ],
    example: {
      prompt: b(R`Tìm $x$, $y$ biết $\frac{x}{2}=\frac{y}{7}$ và $y-x=15$.`, R`Find $x$, $y$ given $\frac{x}{2}=\frac{y}{7}$ and $y-x=15$.`),
      steps: [
        b(R`Ta có $\frac{x}{2}=\frac{y}{7}=\frac{y-x}{7-2}=\frac{15}{5}=3$.`, R`We have $\frac{x}{2}=\frac{y}{7}=\frac{y-x}{7-2}=\frac{15}{5}=3$.`),
        b(R`Suy ra $x=2\cdot 3=6$ và $y=7\cdot 3=21$.`, R`Hence $x=2\cdot 3=6$ and $y=7\cdot 3=21$.`),
      ],
      ket: b(R`Ta có $x=6$ và $y=21$.`, R`We have $x=6$ and $y=21$.`),
      checks: [{ expr: "solve([7*x-2*y, y-x-15],[x,y])[x]", expect: "6" }],
    },
    mistake: b(R`Cộng nhầm khi đề cho hiệu, hoặc nhân chéo sai cặp.`, R`Adding when the problem gives a difference, or cross-multiplying the wrong pair.`),
    drill: { prompt: b(R`Tìm $x$ biết $\frac{x}{9}=\frac{4}{6}$.`, R`Find $x$ given $\frac{x}{9}=\frac{4}{6}$.`), answer: b(R`Ta có $x=6$.`, R`We have $x=6$.`), checks: [{ expr: "solve(6*x-36,x)[0]", expect: "6" }] },
  },
  {
    name: b(R`Đại lượng tỉ lệ thuận và tỉ lệ nghịch`, R`Directly and inversely proportional quantities`),
    spot: b(R`Đề nói "tăng gấp đôi thì … cũng", hoặc "thêm người thì làm nhanh hơn".`, R`The problem says "doubling this doubles that", or "more workers finish faster".`),
    method: [
      b(R`Xác định loại: thương không đổi là tỉ lệ thuận, tích không đổi là tỉ lệ nghịch.`, R`Identify the kind: a constant quotient is direct, a constant product is inverse.`),
      b(R`Lập tỉ lệ thức hoặc dùng hằng số để tìm giá trị cần tìm.`, R`Set up a proportion or use the constant to find the wanted value.`),
    ],
    example: {
      prompt: b(R`Có $6$ công nhân làm xong một việc trong $10$ ngày. Nếu có $15$ công nhân thì làm trong bao nhiêu ngày?`, R`A team of $6$ workers finish a job in $10$ days. How long would $15$ workers take?`),
      steps: [
        b(R`Số công nhân và số ngày tỉ lệ nghịch nên tích không đổi: $6\cdot 10=60$.`, R`Workers and days are inversely proportional so the product is constant: $6\cdot 10=60$.`),
        b(R`Với $15$ công nhân: $60:15=4$ ngày.`, R`With $15$ workers: $60:15=4$ days.`),
      ],
      ket: b(R`Cần $4$ ngày.`, R`It takes $4$ days.`),
      checks: [{ expr: "6*10/15", expect: "4" }],
    },
    mistake: b(R`Dùng tỉ lệ thuận cho bài tỉ lệ nghịch.`, R`Using direct proportion for an inverse proportion problem.`),
    drill: { prompt: b(R`Một vòi chảy $12$ lít trong $4$ phút. Trong $10$ phút chảy được bao nhiêu lít?`, R`A tap runs $12$ litres in $4$ minutes. How many litres does it run in $10$ minutes?`), answer: b(R`Chảy được $30$ lít.`, R`It runs $30$ litres.`), checks: [{ expr: "12/4*10", expect: "30" }] },
  },
  {
    name: b(R`Thu gọn biểu thức đại số và tính giá trị`, R`Simplifying algebraic expressions and evaluating them`),
    spot: b(R`Biểu thức có nhiều đơn thức, hoặc cho giá trị của biến.`, R`An expression with several monomials, or given values of the variables.`),
    method: [
      b(R`Gộp các đơn thức đồng dạng, tức cùng biến và cùng số mũ.`, R`Combine like monomials, those with the same variable and exponent.`),
      b(R`Thay giá trị biến vào biểu thức đã thu gọn, đặt số âm trong ngoặc.`, R`Substitute the values into the simplified expression, putting negatives in brackets.`),
    ],
    example: {
      prompt: b(R`Thu gọn $3x^2-5x+2x^2+x-4$ rồi tính tại $x=-1$.`, R`Simplify $3x^2-5x+2x^2+x-4$ then evaluate at $x=-1$.`),
      steps: [
        b(R`Gộp: $(3+2)x^2+(-5+1)x-4=5x^2-4x-4$.`, R`Combine: $(3+2)x^2+(-5+1)x-4=5x^2-4x-4$.`),
        b(R`Tại $x=-1$: $5-(-4)-4=5+4-4=5$.`, R`At $x=-1$: $5-(-4)-4=5+4-4=5$.`),
      ],
      ket: b(R`Biểu thức thu gọn là $5x^2-4x-4$ và có giá trị $5$ tại $x=-1$.`, R`The simplified expression is $5x^2-4x-4$ and its value at $x=-1$ is $5$.`),
      checks: [{ expr: "expand(3*x**2-5*x+2*x**2+x-4)", expect: "5*x**2-4*x-4" }, { expr: "(5*x**2-4*x-4).subs(x,-1)", expect: "5" }],
    },
    mistake: b(R`Gộp các số hạng không đồng dạng như $x$ và $x^2$.`, R`Combining unlike terms such as $x$ and $x^2$.`),
    drill: { prompt: b(R`Tính $2x^2-3x+1$ tại $x=2$.`, R`Evaluate $2x^2-3x+1$ at $x=2$.`), answer: b(R`Bằng $3$.`, R`It is $3$.`), checks: [{ expr: "(2*x**2-3*x+1).subs(x,2)", expect: "3" }] },
  },
  {
    name: b(R`Cộng, trừ, nhân đa thức một biến`, R`Adding, subtracting and multiplying one-variable polynomials`),
    spot: b(R`Có hai đa thức trong ngoặc, hoặc tìm nghiệm của đa thức.`, R`Two polynomials in brackets, or finding a root of a polynomial.`),
    method: [
      b(R`Cộng trừ: bỏ ngoặc (đổi dấu khi có dấu trừ đứng trước) rồi gộp đơn thức đồng dạng.`, R`Add or subtract: remove brackets (change signs after a minus) then combine like terms.`),
      b(R`Nhân: nhân từng số hạng với từng số hạng rồi gộp.`, R`Multiply: multiply each term by each term then combine.`),
    ],
    example: {
      prompt: b(R`Cho $P=x^2+2x-1$ và $Q=x-3$. Tính $P\cdot Q$.`, R`Let $P=x^2+2x-1$ and $Q=x-3$. Find $P\cdot Q$.`),
      steps: [
        b(R`Nhân từng số hạng: $x^3-3x^2+2x^2-6x-x+3$.`, R`Multiply term by term: $x^3-3x^2+2x^2-6x-x+3$.`),
        b(R`Gộp: $x^3-x^2-7x+3$.`, R`Combine: $x^3-x^2-7x+3$.`),
      ],
      ket: b(R`Tích là $x^3-x^2-7x+3$.`, R`The product is $x^3-x^2-7x+3$.`),
      checks: [{ expr: "expand((x**2+2*x-1)*(x-3))", expect: "x**3-x**2-7*x+3" }],
    },
    mistake: b(R`Quên đổi dấu mọi số hạng khi trừ một đa thức.`, R`Forgetting to change every sign when subtracting a polynomial.`),
    drill: { prompt: b(R`Tính $(x+4)(x-2)$.`, R`Expand $(x+4)(x-2)$.`), answer: b(R`Bằng $x^2+2x-8$.`, R`It equals $x^2+2x-8$.`), checks: [{ expr: "expand((x+4)*(x-2))", expect: "x**2+2*x-8" }] },
  },
  {
    name: b(R`Tính góc trong tam giác`, R`Finding angles in triangles`),
    spot: b(R`Có tam giác với hai góc đã biết, tam giác cân, hoặc góc ngoài.`, R`A triangle with two known angles, an isosceles triangle, or an exterior angle.`),
    method: [
      b(R`Tổng ba góc trong một tam giác bằng $180^\circ$.`, R`The three angles of a triangle add up to $180^\circ$.`),
      b(R`Tam giác cân có hai góc đáy bằng nhau; góc ngoài bằng tổng hai góc trong không kề.`, R`An isosceles triangle has equal base angles; an exterior angle equals the sum of the two non-adjacent interior angles.`),
    ],
    example: {
      prompt: b(R`Tam giác cân $ABC$ ($AB=AC$) có góc ở đỉnh $\widehat{A}=50^\circ$. Tính góc đáy.`, R`Isosceles triangle $ABC$ ($AB=AC$) has apex angle $\widehat{A}=50^\circ$. Find a base angle.`),
      steps: [
        b(R`Hai góc đáy cộng lại bằng $180^\circ-50^\circ=130^\circ$.`, R`The two base angles together are $180^\circ-50^\circ=130^\circ$.`),
        b(R`Hai góc đáy bằng nhau nên mỗi góc là $130^\circ:2=65^\circ$.`, R`The base angles are equal, so each is $130^\circ:2=65^\circ$.`),
      ],
      ket: b(R`Mỗi góc đáy bằng $65^\circ$.`, R`Each base angle is $65^\circ$.`),
      checks: [{ expr: "(180-50)/2", expect: "65" }],
    },
    mistake: b(R`Lấy $360^\circ$ làm tổng ba góc của tam giác.`, R`Using $360^\circ$ as the sum of the three angles of a triangle.`),
    drill: { prompt: b(R`Tam giác có hai góc $48^\circ$ và $72^\circ$. Góc còn lại bằng bao nhiêu?`, R`A triangle has angles of $48^\circ$ and $72^\circ$. What is the third angle?`), answer: b(R`Bằng $60^\circ$.`, R`It is $60^\circ$.`), checks: [{ expr: "180-48-72", expect: "60" }] },
  },
  {
    name: b(R`Chứng minh hai tam giác bằng nhau`, R`Proving two triangles congruent`),
    spot: b(R`Đề yêu cầu chứng minh hai đoạn hoặc hai góc bằng nhau.`, R`The problem asks to prove two segments or angles equal.`),
    method: [
      b(R`Tìm hai tam giác chứa các đoạn hoặc góc cần so sánh.`, R`Find two triangles containing the segments or angles to compare.`),
      b(R`Chỉ ra ba cặp yếu tố đủ một trường hợp (cạnh-cạnh-cạnh, cạnh-góc-cạnh, góc-cạnh-góc), rồi suy ra các yếu tố còn lại.`, R`Show three pairs matching a case (SSS, SAS, ASA), then deduce the remaining parts.`),
    ],
    example: {
      prompt: b(R`Cho $M$ là trung điểm $BC$ và $AM\perp BC$. Chứng minh $AB=AC$.`, R`Let $M$ be the midpoint of $BC$ with $AM\perp BC$. Prove $AB=AC$.`),
      steps: [
        b(R`Hai tam giác vuông $AMB$ và $AMC$ có $MB=MC$, $\widehat{AMB}=\widehat{AMC}=90^\circ$ và cạnh chung $AM$.`, R`The right triangles $AMB$ and $AMC$ have $MB=MC$, $\widehat{AMB}=\widehat{AMC}=90^\circ$ and the common side $AM$.`),
        b(R`Theo cạnh-góc-cạnh, hai tam giác bằng nhau, nên $AB=AC$.`, R`By side-angle-side the triangles are congruent, so $AB=AC$.`),
      ],
      ket: b(R`Vậy $AB=AC$.`, R`Therefore $AB=AC$.`),
      checks: [{ expr: "sqrt(3**2+4**2)-sqrt(4**2+3**2)", expect: "0" }],
    },
    mistake: b(R`Viết sai thứ tự đỉnh tương ứng của hai tam giác.`, R`Writing the corresponding vertices of the two triangles in the wrong order.`),
    drill: { prompt: b(R`Hai tam giác có ba cặp cạnh bằng nhau. Chúng bằng nhau theo trường hợp nào?`, R`Two triangles have three pairs of equal sides. By which case are they congruent?`), answer: b(R`Theo cạnh-cạnh-cạnh.`, R`By side-side-side.`), checks: [{ expr: "3*1", expect: "3" }] },
  },
  {
    name: b(R`Đường thẳng song song và các cặp góc`, R`Parallel lines and angle pairs`),
    spot: b(R`Có hai đường thẳng song song bị cắt bởi đường thứ ba, hoặc cần chứng minh song song.`, R`Two parallel lines cut by a third line, or a proof of parallelism needed.`),
    method: [
      b(R`Xác định cặp góc so le trong, đồng vị, hoặc trong cùng phía.`, R`Identify the alternate, corresponding or co-interior pair.`),
      b(R`Song song thì so le trong và đồng vị bằng nhau, trong cùng phía bù nhau; ngược lại dùng làm dấu hiệu song song.`, R`Parallel lines give equal alternate and corresponding angles, supplementary co-interior angles; use the converse to prove parallelism.`),
    ],
    example: {
      prompt: b(R`Hai đường thẳng $a\parallel b$ bị cắt bởi $c$. Một góc so le trong bằng $2x+10^\circ$ và góc kia bằng $x+40^\circ$. Tìm $x$.`, R`Parallel lines $a\parallel b$ are cut by $c$. One alternate angle is $2x+10^\circ$ and the other is $x+40^\circ$. Find $x$.`),
      steps: [
        b(R`Hai góc so le trong bằng nhau: $2x+10=x+40$.`, R`Alternate angles are equal: $2x+10=x+40$.`),
        b(R`Giải được $x=30$, mỗi góc bằng $70^\circ$.`, R`Solving gives $x=30$, each angle is $70^\circ$.`),
      ],
      ket: b(R`Ta có $x=30$.`, R`We have $x=30$.`),
      checks: [{ expr: "solve(2*x+10-(x+40),x)[0]", expect: "30" }],
    },
    mistake: b(R`Dùng tính chất góc bằng nhau khi chưa biết hai đường song song.`, R`Using equal angles before knowing the lines are parallel.`),
    drill: { prompt: b(R`Hai góc trong cùng phía của hai đường song song, một góc $65^\circ$. Góc kia bằng bao nhiêu?`, R`Two co-interior angles of parallel lines, one is $65^\circ$. What is the other?`), answer: b(R`Bằng $115^\circ$.`, R`It is $115^\circ$.`), checks: [{ expr: "180-65", expect: "115" }] },
  },
  {
    name: b(R`Diện tích xung quanh và thể tích lăng trụ`, R`Lateral area and volume of prisms`),
    spot: b(R`Có hình hộp chữ nhật, lăng trụ đứng, hoặc hỏi sơn, thể tích chứa.`, R`A cuboid or right prism, or a problem about painting or capacity.`),
    method: [
      b(R`Diện tích xung quanh bằng chu vi đáy nhân chiều cao.`, R`Lateral area is the base perimeter times the height.`),
      b(R`Thể tích bằng diện tích đáy nhân chiều cao; toàn phần thì cộng thêm hai đáy.`, R`Volume is base area times height; for the total surface add the two bases.`),
    ],
    example: {
      prompt: b(R`Lăng trụ đứng có đáy là tam giác vuông hai cạnh góc vuông $6$ và $8$, cạnh huyền $10$, chiều cao $9$. Tính thể tích và diện tích xung quanh.`, R`A right prism has a right-triangle base with legs $6$ and $8$, hypotenuse $10$, and height $9$. Find the volume and lateral area.`),
      steps: [
        b(R`Diện tích đáy là $\frac{1}{2}\cdot 6\cdot 8=24$, nên thể tích là $24\cdot 9=216$.`, R`The base area is $\frac{1}{2}\cdot 6\cdot 8=24$, so the volume is $24\cdot 9=216$.`),
        b(R`Chu vi đáy là $6+8+10=24$, nên diện tích xung quanh là $24\cdot 9=216$.`, R`The base perimeter is $6+8+10=24$, so the lateral area is $24\cdot 9=216$.`),
      ],
      ket: b(R`Thể tích và diện tích xung quanh cùng bằng $216$.`, R`The volume and the lateral area are both $216$.`),
      checks: [{ expr: "Rational(1,2)*6*8*9", expect: "216" }, { expr: "(6+8+10)*9", expect: "216" }],
    },
    mistake: b(R`Nhầm chiều cao tam giác đáy với chiều cao lăng trụ.`, R`Mixing up the height of the base triangle with the height of the prism.`),
    drill: { prompt: b(R`Hộp chữ nhật dài $5$, rộng $3$, cao $4$. Tính thể tích.`, R`A cuboid is $5$ long, $3$ wide and $4$ high. Find the volume.`), answer: b(R`Bằng $60$.`, R`It is $60$.`), checks: [{ expr: "5*3*4", expect: "60" }] },
  },
];

export default lop07;

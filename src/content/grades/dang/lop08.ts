import type { GradeDang } from "./types.ts";
import { b } from "./types.ts";

const R = String.raw;

const lop08: GradeDang[] = [
  {
    name: b(R`Khai triển và tính nhanh bằng hằng đẳng thức`, R`Expanding and calculating fast with identities`),
    spot: b(R`Có bình phương của tổng hoặc hiệu, hiệu hai bình phương, hoặc số gần số tròn.`, R`A square of a sum or difference, a difference of squares, or a number near a round number.`),
    method: [
      b(R`Nhận ra dạng $(a\pm b)^2$, $a^2-b^2$, $(a\pm b)^3$.`, R`Recognise the form $(a\pm b)^2$, $a^2-b^2$, $(a\pm b)^3$.`),
      b(R`Thay đúng $a$, $b$ vào công thức rồi viết các số hạng, chú ý dấu.`, R`Put the right $a$ and $b$ in the formula and write the terms, watching signs.`),
    ],
    example: {
      prompt: b(R`Khai triển $(3x-2y)^2$ và tính nhanh $101\cdot 99$.`, R`Expand $(3x-2y)^2$ and calculate $101\cdot 99$ quickly.`),
      steps: [
        b(R`Với $a=3x$, $b=2y$: $(3x-2y)^2=9x^2-12xy+4y^2$.`, R`With $a=3x$, $b=2y$: $(3x-2y)^2=9x^2-12xy+4y^2$.`),
        b(R`Viết $101\cdot 99=(100+1)(100-1)=100^2-1=9999$.`, R`Write $101\cdot 99=(100+1)(100-1)=100^2-1=9999$.`),
      ],
      ket: b(R`Ta có $9x^2-12xy+4y^2$ và $9999$.`, R`We get $9x^2-12xy+4y^2$ and $9999$.`),
      checks: [{ expr: "expand((3*x-2*y)**2)", expect: "9*x**2-12*x*y+4*y**2" }, { expr: "101*99", expect: "9999" }],
    },
    mistake: b(R`Viết $(a-b)^2=a^2-b^2$, thiếu số hạng giữa.`, R`Writing $(a-b)^2=a^2-b^2$, missing the middle term.`),
    drill: { prompt: b(R`Khai triển $(x+5)^2$.`, R`Expand $(x+5)^2$.`), answer: b(R`Bằng $x^2+10x+25$.`, R`It is $x^2+10x+25$.`), checks: [{ expr: "expand((x+5)**2)", expect: "x**2+10*x+25" }] },
  },
  {
    name: b(R`Phân tích đa thức thành nhân tử`, R`Factorising polynomials`),
    spot: b(R`Đề yêu cầu phân tích, rút gọn phân thức, hoặc giải phương trình tích.`, R`The problem asks to factorise, simplify a fraction, or solve a product equation.`),
    method: [
      b(R`Đặt nhân tử chung nếu có.`, R`Take out a common factor if there is one.`),
      b(R`Dùng hằng đẳng thức hoặc nhóm các hạng tử để có nhân tử chung mới.`, R`Use an identity or group terms to get a new common factor.`),
    ],
    example: {
      prompt: b(R`Phân tích $x^3-9x$ và $x^2-5x+6$.`, R`Factorise $x^3-9x$ and $x^2-5x+6$.`),
      steps: [
        b(R`Đặt $x$: $x^3-9x=x(x^2-9)=x(x-3)(x+3)$.`, R`Take out $x$: $x^3-9x=x(x^2-9)=x(x-3)(x+3)$.`),
        b(R`Tìm hai số có tổng $-5$ và tích $6$: $x^2-5x+6=(x-2)(x-3)$.`, R`Find two numbers with sum $-5$ and product $6$: $x^2-5x+6=(x-2)(x-3)$.`),
      ],
      ket: b(R`Ta có $x(x-3)(x+3)$ và $(x-2)(x-3)$.`, R`We get $x(x-3)(x+3)$ and $(x-2)(x-3)$.`),
      checks: [{ expr: "expand(x*(x-3)*(x+3))", expect: "x**3-9*x" }, { expr: "expand((x-2)*(x-3))", expect: "x**2-5*x+6" }],
    },
    mistake: b(R`Đặt nhân tử chung mà quên số $1$ còn lại trong ngoặc.`, R`Taking out a common factor and forgetting the $1$ left in the brackets.`),
    drill: { prompt: b(R`Phân tích $4x^2-25$.`, R`Factorise $4x^2-25$.`), answer: b(R`Bằng $(2x-5)(2x+5)$.`, R`It is $(2x-5)(2x+5)$.`), checks: [{ expr: "expand((2*x-5)*(2*x+5))", expect: "4*x**2-25" }] },
  },
  {
    name: b(R`Rút gọn phân thức đại số`, R`Simplifying algebraic fractions`),
    spot: b(R`Phân thức có tử và mẫu là đa thức, thường kèm "với $x\neq\ldots$".`, R`A fraction of polynomials, often with a condition "for $x\neq\ldots$".`),
    method: [
      b(R`Tìm điều kiện: mẫu khác $0$.`, R`Find the condition: the denominator is not $0$.`),
      b(R`Phân tích tử và mẫu thành nhân tử rồi chia cho nhân tử chung.`, R`Factorise the numerator and denominator and cancel the common factor.`),
    ],
    example: {
      prompt: b(R`Rút gọn $\frac{x^2-4x+4}{x^2-4}$ với $x\neq\pm 2$.`, R`Simplify $\frac{x^2-4x+4}{x^2-4}$ for $x\neq\pm 2$.`),
      steps: [
        b(R`Tử là $(x-2)^2$ và mẫu là $(x-2)(x+2)$.`, R`The numerator is $(x-2)^2$ and the denominator is $(x-2)(x+2)$.`),
        b(R`Chia cho $x-2$, được $\frac{x-2}{x+2}$.`, R`Cancelling $x-2$ gives $\frac{x-2}{x+2}$.`),
      ],
      ket: b(R`Phân thức bằng $\frac{x-2}{x+2}$ với $x\neq\pm 2$.`, R`The fraction equals $\frac{x-2}{x+2}$ for $x\neq\pm 2$.`),
      checks: [{ expr: "simplify((x**2-4*x+4)/(x**2-4))", expect: "(x-2)/(x+2)" }],
    },
    mistake: b(R`Gạch bỏ số hạng thay vì gạch nhân tử.`, R`Crossing out terms instead of factors.`),
    drill: { prompt: b(R`Rút gọn $\frac{x^2-9}{x-3}$ với $x\neq 3$.`, R`Simplify $\frac{x^2-9}{x-3}$ for $x\neq 3$.`), answer: b(R`Bằng $x+3$.`, R`It is $x+3$.`), checks: [{ expr: "simplify((x**2-9)/(x-3))", expect: "x+3" }] },
  },
  {
    name: b(R`Cộng, trừ phân thức khác mẫu`, R`Adding and subtracting fractions with different denominators`),
    spot: b(R`Hai phân thức có mẫu khác nhau trong một phép cộng hoặc trừ.`, R`Two algebraic fractions with different denominators in a sum or difference.`),
    method: [
      b(R`Phân tích các mẫu và lấy mẫu chung gồm mọi nhân tử.`, R`Factorise the denominators and take a common denominator with every factor.`),
      b(R`Quy đồng, cộng trừ tử, rồi rút gọn kết quả.`, R`Bring to the common denominator, add or subtract the numerators, then simplify.`),
    ],
    example: {
      prompt: b(R`Tính $\frac{1}{x-1}+\frac{2}{x+1}$ với $x\neq\pm 1$.`, R`Work out $\frac{1}{x-1}+\frac{2}{x+1}$ for $x\neq\pm 1$.`),
      steps: [
        b(R`Mẫu chung là $(x-1)(x+1)$, nên $\frac{x+1+2(x-1)}{(x-1)(x+1)}$.`, R`The common denominator is $(x-1)(x+1)$, giving $\frac{x+1+2(x-1)}{(x-1)(x+1)}$.`),
        b(R`Gộp tử: $\frac{3x-1}{(x-1)(x+1)}$.`, R`Combine the numerator: $\frac{3x-1}{(x-1)(x+1)}$.`),
      ],
      ket: b(R`Kết quả là $\frac{3x-1}{x^2-1}$.`, R`The result is $\frac{3x-1}{x^2-1}$.`),
      checks: [{ expr: "simplify(1/(x-1)+2/(x+1)-(3*x-1)/(x**2-1))", expect: "0" }],
    },
    mistake: b(R`Cộng tử với tử và mẫu với mẫu.`, R`Adding numerators and denominators separately.`),
    drill: { prompt: b(R`Tính $\frac{1}{x}-\frac{1}{x+1}$ với $x\neq 0;\ -1$.`, R`Work out $\frac{1}{x}-\frac{1}{x+1}$ for $x\neq 0,-1$.`), answer: b(R`Bằng $\frac{1}{x(x+1)}$.`, R`It is $\frac{1}{x(x+1)}$.`), checks: [{ expr: "simplify(1/x-1/(x+1)-1/(x*(x+1)))", expect: "0" }] },
  },
  {
    name: b(R`Giải phương trình bậc nhất một ẩn`, R`Solving linear equations in one unknown`),
    spot: b(R`Phương trình có $x$ ở bậc nhất, có thể kèm ngoặc hoặc mẫu số.`, R`An equation with $x$ to the first power, possibly with brackets or denominators.`),
    method: [
      b(R`Khử mẫu bằng cách nhân hai vế với mẫu chung và phá ngoặc.`, R`Clear denominators by multiplying both sides by the common denominator and expand brackets.`),
      b(R`Chuyển các hạng tử chứa $x$ về một vế, rồi chia cho hệ số của $x$.`, R`Move the $x$ terms to one side, then divide by the coefficient of $x$.`),
    ],
    example: {
      prompt: b(R`Giải $\frac{2x-1}{3}-\frac{x+2}{2}=1$.`, R`Solve $\frac{2x-1}{3}-\frac{x+2}{2}=1$.`),
      steps: [
        b(R`Nhân hai vế với $6$: $2(2x-1)-3(x+2)=6$.`, R`Multiply both sides by $6$: $2(2x-1)-3(x+2)=6$.`),
        b(R`Thu gọn: $x-8=6$, nên $x=14$.`, R`Simplify: $x-8=6$, so $x=14$.`),
      ],
      ket: b(R`Nghiệm là $x=14$.`, R`The solution is $x=14$.`),
      checks: [{ expr: "solve((2*x-1)/3-(x+2)/2-1,x)[0]", expect: "14" }],
    },
    mistake: b(R`Nhân hai vế với mẫu chung nhưng quên nhân vế phải.`, R`Multiplying both sides by the common denominator but forgetting the right side.`),
    drill: { prompt: b(R`Giải $3(x-2)=2x+5$.`, R`Solve $3(x-2)=2x+5$.`), answer: b(R`Nghiệm $x=11$.`, R`The solution is $x=11$.`), checks: [{ expr: "solve(3*(x-2)-(2*x+5),x)[0]", expect: "11" }] },
  },
  {
    name: b(R`Hàm số bậc nhất và đồ thị`, R`Linear functions and their graphs`),
    spot: b(R`Đề cho đường thẳng $y=ax+b$, hai điểm thuộc đồ thị, hoặc song song, vuông góc.`, R`A line $y=ax+b$, two points on the graph, or parallel and perpendicular lines.`),
    method: [
      b(R`Thay tọa độ điểm vào $y=ax+b$ để có phương trình của $a$ và $b$.`, R`Substitute the point coordinates into $y=ax+b$ to get equations in $a$ and $b$.`),
      b(R`Hai đường thẳng song song thì cùng hệ số góc; giao điểm tìm bằng cách giải hệ.`, R`Parallel lines share the slope; find an intersection by solving the system.`),
    ],
    example: {
      prompt: b(R`Tìm hàm số $y=ax+b$ có đồ thị đi qua $A(1;5)$ và $B(3;11)$.`, R`Find the function $y=ax+b$ whose graph passes through $A(1,5)$ and $B(3,11)$.`),
      steps: [
        b(R`Ta có $a+b=5$ và $3a+b=11$.`, R`We have $a+b=5$ and $3a+b=11$.`),
        b(R`Trừ hai phương trình: $2a=6$, nên $a=3$ và $b=2$.`, R`Subtracting: $2a=6$, so $a=3$ and $b=2$.`),
      ],
      ket: b(R`Hàm số là $y=3x+2$.`, R`The function is $y=3x+2$.`),
      checks: [{ expr: "solve([a+b-5,3*a+b-11],[a,b])[a]", expect: "3" }],
    },
    mistake: b(R`Lấy $b$ làm hệ số góc.`, R`Taking $b$ as the slope.`),
    drill: { prompt: b(R`Đường thẳng $y=2x-3$ cắt trục hoành tại điểm có hoành độ bao nhiêu?`, R`Where does $y=2x-3$ meet the horizontal axis?`), answer: b(R`Hoành độ bằng $\frac{3}{2}$.`, R`The first coordinate is $\frac{3}{2}$.`), checks: [{ expr: "solve(2*x-3,x)[0]", expect: "Rational(3,2)" }] },
  },
  {
    name: b(R`Giải bài toán bằng cách lập phương trình`, R`Solving word problems with equations`),
    spot: b(R`Bài toán có lời văn: chuyển động, năng suất, tuổi, hình chữ nhật.`, R`A word problem on motion, work rate, ages or rectangles.`),
    method: [
      b(R`Chọn ẩn, đặt điều kiện, biểu diễn các đại lượng theo ẩn.`, R`Choose an unknown, state its condition, express the quantities in terms of it.`),
      b(R`Lập và giải phương trình, đối chiếu điều kiện rồi trả lời đúng câu hỏi.`, R`Form and solve the equation, check the condition and answer the question asked.`),
    ],
    example: {
      prompt: b(R`Hai người đi xe đạp ngược chiều từ hai nơi cách nhau $60$ km với vận tốc $12$ km/giờ và $18$ km/giờ. Sau bao lâu thì gặp nhau?`, R`Two cyclists ride towards each other from places $60$ km apart at $12$ km/h and $18$ km/h. When do they meet?`),
      steps: [
        b(R`Gọi thời gian gặp nhau là $t$ giờ với $t>0$; quãng đường là $12t$ và $18t$.`, R`Let the time be $t$ hours with $t>0$; the distances are $12t$ and $18t$.`),
        b(R`Phương trình: $12t+18t=60$, nên $t=2$.`, R`Equation: $12t+18t=60$, so $t=2$.`),
      ],
      ket: b(R`Hai người gặp nhau sau $2$ giờ.`, R`They meet after $2$ hours.`),
      checks: [{ expr: "solve(12*t+18*t-60,t)[0]", expect: "2" }],
    },
    mistake: b(R`Giải xong mà không đối chiếu điều kiện của ẩn.`, R`Solving without checking the condition on the unknown.`),
    drill: { prompt: b(R`Một số cộng với gấp ba của nó bằng $52$. Tìm số đó.`, R`A number plus three times itself is $52$. Find the number.`), answer: b(R`Số đó là $13$.`, R`The number is $13$.`), checks: [{ expr: "solve(x+3*x-52,x)[0]", expect: "13" }] },
  },
  {
    name: b(R`Định lí Pythagore`, R`Pythagoras' theorem`),
    spot: b(R`Tam giác vuông, thang dựa tường, đường chéo hình chữ nhật.`, R`A right triangle, a ladder against a wall, the diagonal of a rectangle.`),
    method: [
      b(R`Xác định cạnh huyền (đối diện góc vuông).`, R`Identify the hypotenuse (opposite the right angle).`),
      b(R`Viết $c^2=a^2+b^2$ rồi lấy căn không âm để tìm cạnh còn thiếu.`, R`Write $c^2=a^2+b^2$ and take the non-negative root to find the missing side.`),
    ],
    example: {
      prompt: b(R`Hình chữ nhật có hai cạnh $9$ cm và $12$ cm. Tính đường chéo.`, R`A rectangle has sides $9$ cm and $12$ cm. Find its diagonal.`),
      steps: [
        b(R`Đường chéo là cạnh huyền của tam giác vuông có hai cạnh góc vuông $9$ và $12$.`, R`The diagonal is the hypotenuse of a right triangle with legs $9$ and $12$.`),
        b(R`Bình phương: $9^2+12^2=81+144=225$, nên đường chéo là $15$ cm.`, R`Squares: $9^2+12^2=81+144=225$, so the diagonal is $15$ cm.`),
      ],
      ket: b(R`Đường chéo dài $15$ cm.`, R`The diagonal is $15$ cm long.`),
      checks: [{ expr: "sqrt(9**2+12**2)", expect: "15" }],
    },
    mistake: b(R`Cộng hai cạnh góc vuông rồi coi là cạnh huyền.`, R`Adding the two legs and calling the sum the hypotenuse.`),
    drill: { prompt: b(R`Tam giác vuông có cạnh huyền $17$ và một cạnh góc vuông $8$. Cạnh còn lại bằng bao nhiêu?`, R`A right triangle has hypotenuse $17$ and one leg $8$. What is the other leg?`), answer: b(R`Bằng $15$.`, R`It is $15$.`), checks: [{ expr: "sqrt(17**2-8**2)", expect: "15" }] },
  },
  {
    name: b(R`Định lí Thalès, đường trung bình và đường phân giác`, R`Thales' theorem, midlines and angle bisectors`),
    spot: b(R`Có đường thẳng song song với một cạnh, trung điểm hai cạnh, hoặc phân giác của một góc.`, R`A line parallel to a side, midpoints of two sides, or an angle bisector.`),
    method: [
      b(R`Đường thẳng song song một cạnh thì chia hai cạnh còn lại theo cùng tỉ số.`, R`A line parallel to one side divides the other two sides in the same ratio.`),
      b(R`Đường phân giác chia cạnh đối diện thành hai đoạn tỉ lệ với hai cạnh kề.`, R`An angle bisector divides the opposite side into parts proportional to the adjacent sides.`),
    ],
    example: {
      prompt: b(R`Tam giác $ABC$ có $AB=6$, $AC=9$. Phân giác $AD$ cắt $BC$ tại $D$ và $BC=10$. Tính $BD$.`, R`Triangle $ABC$ has $AB=6$, $AC=9$. The bisector $AD$ meets $BC$ at $D$ and $BC=10$. Find $BD$.`),
      steps: [
        b(R`Ta có $\frac{BD}{DC}=\frac{AB}{AC}=\frac{6}{9}=\frac{2}{3}$.`, R`We have $\frac{BD}{DC}=\frac{AB}{AC}=\frac{6}{9}=\frac{2}{3}$.`),
        b(R`Chia $10$ theo tỉ số $2:3$ được $BD=10\cdot\frac{2}{5}=4$.`, R`Dividing $10$ in the ratio $2:3$ gives $BD=10\cdot\frac{2}{5}=4$.`),
      ],
      ket: b(R`Độ dài $BD=4$.`, R`The length $BD=4$.`),
      checks: [{ expr: "10*Rational(2,5)", expect: "4" }],
    },
    mistake: b(R`Ghép sai cặp đoạn và cạnh tương ứng.`, R`Pairing the wrong segment with its side.`),
    drill: { prompt: b(R`Đường trung bình của tam giác song song với đáy dài $14$. Đường trung bình dài bao nhiêu?`, R`The midline of a triangle parallel to a base of length $14$. How long is the midline?`), answer: b(R`Dài $7$.`, R`It is $7$.`), checks: [{ expr: "14/2", expect: "7" }] },
  },
  {
    name: b(R`Diện tích hình bình hành, hình thoi và thể tích hình chóp đều`, R`Areas of parallelograms and rhombuses, and volume of regular pyramids`),
    spot: b(R`Có hình bình hành, hình thoi với đường chéo, hoặc hình chóp có đáy là đa giác đều.`, R`A parallelogram, a rhombus with diagonals, or a pyramid with a regular polygon base.`),
    method: [
      b(R`Hình bình hành: đáy nhân chiều cao; hình thoi: nửa tích hai đường chéo.`, R`Parallelogram: base times height; rhombus: half the product of the diagonals.`),
      b(R`Hình chóp đều: thể tích bằng một phần ba diện tích đáy nhân chiều cao.`, R`Regular pyramid: volume is one third of the base area times the height.`),
    ],
    example: {
      prompt: b(R`Hình chóp đều có đáy là hình vuông cạnh $6$ và chiều cao $5$. Tính thể tích.`, R`A regular pyramid has a square base of side $6$ and height $5$. Find its volume.`),
      steps: [
        b(R`Diện tích đáy là $6\cdot 6=36$.`, R`The base area is $6\cdot 6=36$.`),
        b(R`Thể tích là $\frac{1}{3}\cdot 36\cdot 5=60$.`, R`The volume is $\frac{1}{3}\cdot 36\cdot 5=60$.`),
      ],
      ket: b(R`Thể tích bằng $60$.`, R`The volume is $60$.`),
      checks: [{ expr: "Rational(1,3)*36*5", expect: "60" }],
    },
    mistake: b(R`Dùng cạnh bên hoặc trung đoạn làm chiều cao.`, R`Using a lateral edge or slant height as the height.`),
    drill: { prompt: b(R`Hình thoi có hai đường chéo $10$ và $24$. Tính diện tích.`, R`A rhombus has diagonals $10$ and $24$. Find its area.`), answer: b(R`Bằng $120$.`, R`It is $120$.`), checks: [{ expr: "Rational(1,2)*10*24", expect: "120" }] },
  },
  {
    name: b(R`Xác suất của biến cố khi các kết quả đồng khả năng`, R`Probability of an event with equally likely outcomes`),
    spot: b(R`Đề gieo xúc xắc, rút thẻ hoặc chọn ngẫu nhiên rồi hỏi xác suất của một biến cố.`, R`The problem rolls dice, draws cards or picks at random and asks for the probability of an event.`),
    method: [
      b(R`Đếm tổng số kết quả có thể và kiểm tra chúng có khả năng như nhau.`, R`Count all possible outcomes and check they are equally likely.`),
      b(R`Đếm số kết quả thuận lợi cho biến cố.`, R`Count the outcomes favourable to the event.`),
      b(R`Chia số kết quả thuận lợi cho tổng số kết quả có thể.`, R`Divide the favourable outcomes by all possible outcomes.`),
    ],
    example: {
      prompt: b(R`Rút ngẫu nhiên một thẻ từ $20$ thẻ đánh số từ $1$ đến $20$. Xác suất rút được số chia hết cho $5$ là bao nhiêu?`, R`Draw one card at random from $20$ cards numbered $1$ to $20$. What is the probability of a number divisible by $5$?`),
      steps: [
        b(R`Có $20$ kết quả có thể, đồng khả năng.`, R`There are $20$ possible outcomes, all equally likely.`),
        b(R`Các số chia hết cho $5$ là $5$, $10$, $15$, $20$, tức $4$ kết quả thuận lợi.`, R`The numbers divisible by $5$ are $5$, $10$, $15$, $20$, that is $4$ favourable outcomes.`),
        b(R`Vậy $P=\frac{4}{20}=\frac{1}{5}$.`, R`So $P=\frac{4}{20}=\frac{1}{5}$.`),
      ],
      ket: b(R`Xác suất là $\frac{1}{5}$.`, R`The probability is $\frac{1}{5}$.`),
      checks: [{ expr: "Rational(4,20)", expect: "Rational(1,5)" }],
    },
    mistake: b(R`Dùng công thức khi các kết quả không có khả năng như nhau.`, R`Using the formula when the outcomes are not equally likely.`),
    drill: { prompt: b(R`Gieo một xúc xắc cân đối. Xác suất ra mặt có số chấm chẵn là bao nhiêu?`, R`Roll a fair die. What is the probability of an even number of dots?`), answer: b(R`Bằng $\frac{1}{2}$.`, R`It is $\frac{1}{2}$.`), checks: [{ expr: "Rational(3,6)", expect: "Rational(1,2)" }] },
  },
];

export default lop08;

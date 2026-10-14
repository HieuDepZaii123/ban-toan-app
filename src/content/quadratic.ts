import type { Lesson, Question } from "./types.ts";

export const quadraticLesson: Lesson = {
  concept: String.raw`Hàm bậc hai viết $y = ax^2 + bx + c$ với $a \neq 0$. Đồ thị là một parabol. Hoành độ đỉnh là $x = -\dfrac{b}{2a}$, tung độ là giá trị của hàm tại đó. Dấu của $a$ chọn đáy hay đỉnh. $\Delta = b^2 - 4ac$ chỉ đếm số lần cắt trục Ox.`,
  conceptEn: String.raw`A quadratic is $y = ax^2 + bx + c$ with $a \neq 0$. The graph is a parabola. The vertex has $x = -\dfrac{b}{2a}$, and $y$ is the function value there. The sign of $a$ chooses minimum or maximum. $\Delta = b^2 - 4ac$ only counts intersections with the x-axis.`,
};

const R = String.raw;

export const quadraticQuestions: Question[] = [
  {
    id: "quad-vertex",
    prompt: R`Đỉnh của parabol $y = x^2 - 2x - 3$ là điểm nào?`,
    promptEn: R`What is the vertex of $y = x^2 - 2x - 3$?`,
    choices: [R`$(1; -4)$`, R`$(-1; -4)$`, R`$(1; 4)$`, R`$(2; -3)$`],
    choicesEn: [R`$(1, -4)$`, R`$(-1, -4)$`, R`$(1, 4)$`, R`$(2, -3)$`],
    answer: 0,
    hint: "Hoành độ đỉnh là −b/(2a). Tính xong thì thế vào hàm, đừng đổi dấu tung độ.",
    hintEn: "The vertex x-coordinate is −b/(2a). Substitute it; do not flip the sign of y.",
    steps: [
      R`$a = 1$, $b = -2$, $c = -3$. Hoành độ đỉnh $x = -\dfrac{b}{2a} = -\dfrac{-2}{2} = 1$.`,
      R`Thế lại: $y(1) = 1 - 2 - 3 = -4$.`,
      R`Đỉnh là $(1; -4)$. Vì $a > 0$, đây cũng là giá trị nhỏ nhất. Lấy $b$ làm hoành độ, hoặc quên dấu khi thế, sẽ ra các điểm còn lại.`,
    ],
    stepsEn: [
      R`$a = 1$, $b = -2$, $c = -3$. The vertex has $x = -\dfrac{b}{2a} = 1$.`,
      R`Substitute: $y(1) = 1 - 2 - 3 = -4$.`,
      R`The vertex is $(1, -4)$. Since $a > 0$, it is also the minimum. Using $b$ as the x-coordinate, or dropping the sign of $y$, produces the other points.`,
    ],
  },
  {
    id: "quad-roots",
    prompt: R`Phương trình $x^2 - 2x - 3 = 0$ có nghiệm nào?`,
    promptEn: R`What are the solutions of $x^2 - 2x - 3 = 0$?`,
    choices: [R`$x = -1$ và $x = 3$`, R`$x = 1$ và $x = -3$`, R`$x = -1$ và $x = -3$`, "Vô nghiệm"],
    choicesEn: [R`$x = -1$ and $x = 3$`, R`$x = 1$ and $x = -3$`, R`$x = -1$ and $x = -3$`, "No solution"],
    answer: 0,
    hint: "Nhẩm (x − 3)(x + 1), hoặc tính Δ = 16.",
    hintEn: "Factor as (x − 3)(x + 1), or compute Δ = 16.",
    steps: [
      R`$\Delta = (-2)^2 - 4\cdot 1\cdot (-3) = 16 > 0$, nên có hai nghiệm phân biệt.`,
      R`$(x - 3)(x + 1) = x^2 - 2x - 3$.`,
      R`Nghiệm là $x = -1$ và $x = 3$. Đỉnh $x = 1$ nằm giữa hai nghiệm đó.`,
    ],
    stepsEn: [
      R`$\Delta = (-2)^2 - 4\cdot 1\cdot (-3) = 16 > 0$, so there are two distinct roots.`,
      R`$(x - 3)(x + 1) = x^2 - 2x - 3$.`,
      R`The roots are $x = -1$ and $x = 3$. The vertex $x = 1$ sits halfway between them.`,
    ],
  },
  {
    id: "quad-range",
    prompt: R`Tập giá trị của $y = -2(x - 1)^2 + 8$ là tập nào?`,
    promptEn: R`What is the range of $y = -2(x - 1)^2 + 8$?`,
    choices: [R`$(-\infty; 8]$`, R`$[8; +\infty)$`, R`$(-\infty; 1]$`, R`$\mathbb{R}$`],
    choicesEn: [R`$(-\infty, 8]$`, R`$[8, +\infty)$`, R`$(-\infty, 1]$`, R`$\mathbb{R}$`],
    answer: 0,
    hint: "a < 0 thì đỉnh là giá trị lớn nhất. Tung độ đỉnh đọc ở hằng số cuối của dạng đỉnh.",
    hintEn: "If a < 0 the vertex is the maximum. Its y-coordinate is the constant at the end of vertex form.",
    steps: [
      R`$a = -2 < 0$, bề lõm hướng xuống, đỉnh là giá trị lớn nhất.`,
      R`Dạng đỉnh cho tung độ $k = 8$, và $h = 1$ chỉ là hoành độ. Mọi giá trị đều $\le 8$.`,
      R`Tập giá trị là $(-\infty; 8]$. Parabol không phủ cả $\mathbb{R}$.`,
    ],
    stepsEn: [
      R`$a = -2 < 0$, so the parabola opens downward and the vertex is the maximum.`,
      R`Vertex form gives the y-coordinate $k = 8$. The $1$ is only the x-coordinate. Every value is $\le 8$.`,
      R`The range is $(-\infty, 8]$. A parabola does not cover all of $\mathbb{R}$.`,
    ],
  },
  {
    id: "quad-fence",
    prompt: "Có 40 m lưới, một cạnh chuồng là tường sẵn. Diện tích lớn nhất là bao nhiêu?",
    promptEn: "A pen uses 40 m of fence, with one side along an existing wall. What is the greatest area?",
    choices: [R`$200\text{ m}^2$`, R`$400\text{ m}^2$`, R`$100\text{ m}^2$`, R`$192\text{ m}^2$`],
    choicesEn: [R`$200\text{ m}^2$`, R`$400\text{ m}^2$`, R`$100\text{ m}^2$`, R`$192\text{ m}^2$`],
    answer: 0,
    hint: "Gọi x là cạnh vuông góc với tường. Cạnh song song tường còn 40 − 2x. Cho S′ = 0.",
    hintEn: "Let x be the side perpendicular to the wall. The side along the wall is 40 − 2x. Set S′ = 0.",
    steps: [
      R`Hai cạnh vuông góc tường dài $x$ mét, cạnh song song tường dài $40 - 2x$ mét. $S = x(40 - 2x) = -2x^2 + 40x$, với $0 < x < 20$.`,
      R`$S' = 40 - 4x = 0$ tại $x = 10$. $S'' = -4 < 0$, nên đây là giá trị lớn nhất.`,
      R`Cạnh song song tường bằng $20$ m và $S(10) = 200$ m². $S(8) = 192$ chưa phải đỉnh vì $S'(8) = 8 \neq 0$. Hai mép $x \to 0$ và $x \to 20$ không phải chuồng.`,
    ],
    stepsEn: [
      R`The two sides perpendicular to the wall have length $x$ metres; the side parallel to the wall has length $40 - 2x$. $S = x(40 - 2x) = -2x^2 + 40x$, with $0 < x < 20$.`,
      R`$S' = 40 - 4x = 0$ at $x = 10$. $S'' = -4 < 0$, so this critical point is a maximum.`,
      R`The side along the wall is $20$ m and $S(10) = 200$ m². $S(8) = 192$ is not the top, because $S'(8) = 8 \neq 0$. The ends $x \to 0$ and $x \to 20$ are not pens.`,
    ],
  },
  {
    id: "quad-delta",
    prompt: R`$\Delta = 0$ nói điều gì về parabol?`,
    promptEn: R`What does $\Delta = 0$ say about a parabola?`,
    choices: [
      "Parabol tiếp xúc trục Ox tại đúng một điểm",
      "Đỉnh trượt dọc theo trục Oy",
      "Hàm không có cực trị",
      "Parabol cắt Ox tại hai điểm phân biệt",
    ],
    choicesEn: [
      "The parabola touches the x-axis at exactly one point",
      "The vertex slides along the y-axis",
      "The function has no extremum",
      "The parabola cuts the x-axis at two distinct points",
    ],
    answer: 0,
    hint: "Δ gắn với phương trình y = 0. Δ = 0 là một nghiệm kép.",
    hintEn: "Δ belongs to the equation y = 0. Δ = 0 means a double root.",
    steps: [
      R`$\Delta = b^2 - 4ac$ là biệt thức của phương trình $y = 0$.`,
      R`$\Delta = 0$ thì có một nghiệm kép: đồ thị chạm Ox tại đúng một điểm, tức là tiếp xúc.`,
      R`$\Delta$ không làm đỉnh chạy, và không nói hàm có cực trị hay không. Khi $a \neq 0$, parabol luôn có đúng một đỉnh.`,
    ],
    stepsEn: [
      R`$\Delta = b^2 - 4ac$ is the discriminant of $y = 0$.`,
      R`$\Delta = 0$ means a double root: the graph meets the x-axis at exactly one point, so it is tangent.`,
      R`$\Delta$ does not move the vertex, and it does not say whether an extremum exists. When $a \neq 0$ a parabola always has exactly one vertex.`,
    ],
  },
  {
    id: "quad-cost",
    prompt: R`Chi phí $C(x) = 2x^2 - 8x + 11$. Giá trị nhỏ nhất là bao nhiêu?`,
    promptEn: R`The cost is $C(x) = 2x^2 - 8x + 11$. What is the minimum value?`,
    choices: [R`$3$ tại $x = 2$`, R`$11$ tại $x = 0$`, R`$-5$ tại $x = 2$`, R`$3$ tại $x = 4$`],
    choicesEn: [R`$3$ at $x = 2$`, R`$11$ at $x = 0$`, R`$-5$ at $x = 2$`, R`$3$ at $x = 4$`],
    answer: 0,
    hint: "C′(x) = 4x − 8. Đừng đọc hệ số tự do, và đừng quên số 2 ở mẫu của −b/(2a).",
    hintEn: "C′(x) = 4x − 8. Do not read off the constant term, and do not drop the 2 in −b/(2a).",
    steps: [
      R`$C'(x) = 4x - 8 = 0$ tại $x = 2$. Cũng là $x = -\dfrac{b}{2a} = \dfrac{8}{4}$.`,
      R`$C'' = 4 > 0$, nên đây là giá trị nhỏ nhất.`,
      R`$C(2) = 8 - 16 + 11 = 3$. Số $11$ là $C(0)$. Lấy $x = -\dfrac{b}{a} = 4$ thì ra đúng giá trị $3$ đặt nhầm chỗ: $C(4) = 11$, không phải $3$.`,
    ],
    stepsEn: [
      R`$C'(x) = 4x - 8 = 0$ at $x = 2$. That is also $x = -\dfrac{b}{2a} = \dfrac{8}{4}$.`,
      R`$C'' = 4 > 0$, so this is a minimum.`,
      R`$C(2) = 8 - 16 + 11 = 3$. The $11$ is $C(0)$. Using $x = -\dfrac{b}{a} = 4$ puts the value $3$ in the wrong place: $C(4) = 11$, not $3$.`,
    ],
  },
];

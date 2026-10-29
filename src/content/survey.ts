import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const surveyLesson: Lesson = {
  basic: [
    { k: "mo", vi: R`Khảo sát là xem hàm đang đi lên hay đi xuống.`, en: R`Sketching means seeing whether the function is rising or falling.` },
    { k: "vd", vi: R`$y=x^3-3x$ tại $x=-1$ thì $y=2$.`, en: R`$y=x^3-3x$ at $x=-1$ gives $y=2$.` },
  ],
  exam: [
    { k: "dinh", vi: R`$y'=0$ và $y'$ đổi dấu thì đó là cực trị.`, en: R`If $y'=0$ and $y'$ changes sign, that point is an extremum.` },
    { k: "vd", vi: R`$y=x^3-3x$ có cực đại $2$ và cực tiểu $-2$.`, en: R`$y=x^3-3x$ has maximum $2$ and minimum $-2$.` },
    { k: "loi", vi: R`$y=x^3$ có $y'(0)=0$ nhưng không là cực trị.`, en: R`$y=x^3$ has $y'(0)=0$ but it is not an extremum.` },
    { k: "kiem", vi: R`$\dfrac{x^2}{x-1}$ có tiệm cận đứng $x=1$.`, en: R`$\dfrac{x^2}{x-1}$ has vertical asymptote $x=1$.` },
  ],
};

export const surveyQuestions: Question[] = [
  {
    id: "surv-max",
    prompt: R`Hàm $y = x^3 - 3x$ đạt cực đại tại đâu, và giá trị ấy bằng bao nhiêu?`,
    promptEn: R`Where does $y = x^3 - 3x$ reach a local maximum, and what is that value?`,
    choices: [R`$2$ tại $x = -1$`, R`$-2$ tại $x = -1$`, R`$0$ tại $x = 0$`, R`$2$ tại $x = 1$`],
    choicesEn: [R`$2$ at $x = -1$`, R`$-2$ at $x = -1$`, R`$0$ at $x = 0$`, R`$2$ at $x = 1$`],
    answer: 0,
    hint: "Giải y′ = 0, rồi xem y′ đổi từ dương sang âm ở đâu.",
    hintEn: "Solve y′ = 0, then see where y′ changes from positive to negative.",
    steps: [
      R`$y' = 3x^2 - 3 = 3(x-1)(x+1)$.`,
      R`Qua $x = -1$, đạo hàm đổi từ dương sang âm, nên đó là cực đại. $y(-1) = -1 + 3 = 2$.`,
      R`$-2$ là cực tiểu tại $x = 1$. $0$ là một nghiệm, không phải cực trị. $x = 1$ là chỗ cực tiểu.`,
    ],
    stepsEn: [
      R`$y' = 3x^2 - 3 = 3(x-1)(x+1)$.`,
      R`At $x = -1$ the derivative changes from positive to negative, so that is a maximum. $y(-1) = -1 + 3 = 2$.`,
      R`$-2$ is the minimum at $x = 1$. $0$ is a root, not an extremum. $x = 1$ is where the minimum sits.`,
    ],
  },
  {
    id: "surv-min",
    prompt: R`Cùng hàm $y = x^3 - 3x$. Cực tiểu bằng bao nhiêu, và tại đâu?`,
    promptEn: R`Same function $y = x^3 - 3x$. What is the local minimum, and where?`,
    choices: [R`$-2$ tại $x = 1$`, R`$2$ tại $x = 1$`, R`$-2$ tại $x = -1$`, R`$0$ tại $x = 0$`],
    choicesEn: [R`$-2$ at $x = 1$`, R`$2$ at $x = 1$`, R`$-2$ at $x = -1$`, R`$0$ at $x = 0$`],
    answer: 0,
    hint: "Cực tiểu là chỗ y′ đổi từ âm sang dương.",
    hintEn: "A minimum is where y′ changes from negative to positive.",
    steps: [
      R`Trên $(-1; 1)$, $y' < 0$. Bên phải $x = 1$, $y' > 0$.`,
      R`Đổi từ âm sang dương tại $x = 1$. $y(1) = 1 - 3 = -2$.`,
      R`$2$ là cực đại. Hoành độ $-1$ là cực đại, không phải cực tiểu. $0$ là nghiệm.`,
    ],
    stepsEn: [
      R`On $(-1; 1)$, $y' < 0$. To the right of $x = 1$, $y' > 0$.`,
      R`The sign changes from negative to positive at $x = 1$. $y(1) = 1 - 3 = -2$.`,
      R`$2$ is the maximum. The x-value $-1$ is the maximum, not the minimum. $0$ is a root.`,
    ],
  },
  {
    id: "surv-roots",
    prompt: R`Nghiệm của $y = x^3 - 3x$ là những số nào?`,
    promptEn: R`What are the roots of $y = x^3 - 3x$?`,
    choices: [R`$-\sqrt{3}$, $0$, $\sqrt{3}$`, R`$-1$, $0$, $1$`, R`$\pm 1$`, "Không có nghiệm"],
    choicesEn: [R`$-\sqrt{3}$, $0$, $\sqrt{3}$`, R`$-1$, $0$, $1$`, R`$\pm 1$`, "No roots"],
    answer: 0,
    hint: "Đặt y = 0 và phân tích x(x² − 3). Đừng lấy nghiệm của đạo hàm.",
    hintEn: "Set y = 0 and factor x(x² − 3). Do not take the roots of the derivative.",
    steps: [
      R`$x^3 - 3x = x(x^2 - 3) = x(x - \sqrt{3})(x + \sqrt{3})$.`,
      R`Ba nghiệm là $-\sqrt{3}$, $0$, $\sqrt{3}$.`,
      R`$\pm 1$ là chỗ $y' = 0$, tức hoành độ cực trị. Hàm có nghiệm vì cắt Ox ba lần.`,
    ],
    stepsEn: [
      R`$x^3 - 3x = x(x^2 - 3) = x(x - \sqrt{3})(x + \sqrt{3})$.`,
      R`The three roots are $-\sqrt{3}$, $0$, $\sqrt{3}$.`,
      R`$\pm 1$ is where $y' = 0$, the x-values of the extrema. The function does have roots: it crosses Ox three times.`,
    ],
  },
  {
    id: "surv-mono",
    prompt: R`$y = x^3 - 3x$ đồng biến trên tập nào?`,
    promptEn: R`On which set is $y = x^3 - 3x$ increasing?`,
    choices: [
      R`$(-\infty; -1]$ và $[1; +\infty)$`,
      R`$[-1; 1]$`,
      R`$\mathbb{R}$`,
      R`$(-1; 1)$`,
    ],
    choicesEn: [
      R`$(-\infty; -1]$ and $[1; +\infty)$`,
      R`$[-1; 1]$`,
      R`$\mathbb{R}$`,
      R`$(-1; 1)$`,
    ],
    answer: 0,
    hint: "Đồng biến nơi y′ không âm. Ở đây y′ dương ngoài đoạn giữa hai điểm dừng.",
    hintEn: "The function increases where y′ is non-negative. Here y′ is positive outside the interval between the two stationary points.",
    steps: [
      R`$y' = 3(x-1)(x+1)$ dương khi $x < -1$ hoặc $x > 1$.`,
      R`Kể cả hai điểm dừng, tập đồng biến là $(-\infty; -1]$ và $[1; +\infty)$.`,
      R`$[-1; 1]$ là nơi nghịch biến. Cả $\mathbb{R}$ là đồng biến của $y = x^3$, không phải hàm này. $(-1; 1)$ nằm trong miền giảm.`,
    ],
    stepsEn: [
      R`$y' = 3(x-1)(x+1)$ is positive when $x < -1$ or $x > 1$.`,
      R`Including the stationary points, the increasing set is $(-\infty; -1]$ and $[1; +\infty)$.`,
      R`$[-1; 1]$ is where it decreases. All of $\mathbb{R}$ is the increasing set of $y = x^3$, not of this function. $(-1; 1)$ sits inside the decreasing part.`,
    ],
  },
  {
    id: "surv-flat",
    prompt: R`Hàm $y = x^3$ có cực trị tại $x = 0$ không?`,
    promptEn: R`Does $y = x^3$ have an extremum at $x = 0$?`,
    choices: ["Không có cực trị", "Cực tiểu, y = 0", "Cực đại, y = 0", "Cực tiểu, y = −2"],
    choicesEn: ["No extremum", "A minimum, y = 0", "A maximum, y = 0", "A minimum, y = −2"],
    answer: 0,
    hint: "y′ = 0 chưa đủ. Phải xem y′ có đổi dấu hay không.",
    hintEn: "y′ = 0 is not enough. Check whether y′ changes sign.",
    steps: [
      R`$y' = 3x^2$. Tại $x = 0$, đạo hàm bằng $0$, và tiếp tuyến nằm ngang.`,
      R`$3x^2$ không âm ở cả hai phía, nên không đổi dấu. Hàm vẫn đồng biến. Không có cực trị.`,
      R`Gọi cực đại hay cực tiểu là đọc nhầm một điểm dừng thành cực trị. $-2$ là cực tiểu của $x^3 - 3x$, không phải của $x^3$.`,
    ],
    stepsEn: [
      R`$y' = 3x^2$. At $x = 0$ the derivative is $0$, and the tangent is horizontal.`,
      R`$3x^2$ is non-negative on both sides, so it does not change sign. The function still increases. There is no extremum.`,
      R`Calling it a maximum or a minimum reads a stationary point as an extremum. $-2$ is the minimum of $x^3 - 3x$, not of $x^3$.`,
    ],
  },
  {
    id: "surv-cross",
    prompt: R`Điểm $(1; 2)$ có thuộc đồ thị $y = \dfrac{x^2}{x-1}$ không?`,
    promptEn: R`Does the point $(1; 2)$ lie on the graph of $y = \dfrac{x^2}{x-1}$?`,
    choices: [
      "Không, vì x = 1 không thuộc tập xác định",
      "Có, vì đó là giao của hai tiệm cận",
      "Có, y(1) = 2",
      "Có, y(1) = 0",
    ],
    choicesEn: [
      "No, because x = 1 is not in the domain",
      "Yes, because the asymptotes cross there",
      "Yes, y(1) = 2",
      "Yes, y(1) = 0",
    ],
    answer: 0,
    hint: "Xem mẫu số tại x = 1 trước khi thế vào tử.",
    hintEn: "Look at the denominator at x = 1 before substituting into the numerator.",
    steps: [
      R`Mẫu $x - 1$ bằng $0$ khi $x = 1$, nên hàm không xác định tại đó.`,
      R`Tiệm cận đứng $x = 1$ và tiệm cận xiên $y = x + 1$ cắt nhau tại $(1; 2)$. Điểm cắt của hai tiệm cận không tự động nằm trên đồ thị.`,
      R`$y(1) = 2$ và $y(1) = 0$ đều giả định hàm có giá trị tại $1$.`,
    ],
    stepsEn: [
      R`The denominator $x - 1$ is $0$ at $x = 1$, so the function is undefined there.`,
      R`The vertical asymptote $x = 1$ and the oblique asymptote $y = x + 1$ meet at $(1; 2)$. The crossing of the asymptotes is not automatically on the graph.`,
      R`Both $y(1) = 2$ and $y(1) = 0$ assume the function has a value at $1$.`,
    ],
  },
];

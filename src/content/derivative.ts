import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const derivativeLesson: Lesson = {
  concept: R`Đạo hàm tại $a$ là hệ số góc của tiếp tuyến. Cát tuyến qua $a$ và $a+h$ có hệ số góc $\dfrac{f(a+h)-f(a)}{h}$. Cho $h \to 0$, cát tuyến nằm xuống thành tiếp tuyến. Với $f(x) = x^2$, tỉ số ấy bằng $2a + h$, nên $f'(a) = 2a$. $f'(a) = 0$ chỉ nói tiếp tuyến nằm ngang. Đó là cực trị khi $f'$ đổi dấu. Với $y = x^3$, $y'(0) = 0$ nhưng $y'$ không đổi dấu, nên không có cực trị.`,
  conceptEn: R`The derivative at $a$ is the slope of the tangent. The secant through $a$ and $a+h$ has slope $\dfrac{f(a+h)-f(a)}{h}$. As $h \to 0$ the secant settles onto the tangent. For $f(x) = x^2$ that ratio equals $2a + h$, so $f'(a) = 2a$. $f'(a) = 0$ only says the tangent is horizontal. It is an extremum when $f'$ changes sign. For $y = x^3$, $y'(0) = 0$ but $y'$ does not change sign, so there is no extremum.`,
};

export const derivativeQuestions: Question[] = [
  {
    id: "deriv-slope",
    prompt: R`$f(x) = x^2$. $f'(2)$ bằng bao nhiêu?`,
    promptEn: R`$f(x) = x^2$. What is $f'(2)$?`,
    choices: [R`$4$`, R`$2$`, R`$2x$`, R`$0$`],
    choicesEn: [R`$4$`, R`$2$`, R`$2x$`, R`$0$`],
    answer: 0,
    hint: "Đạo hàm của x² là 2x. Nhớ thế x = 2.",
    hintEn: "The derivative of x² is 2x. Remember to substitute x = 2.",
    steps: [
      R`$f(x) = x^2$ có $f'(x) = 2x$.`,
      R`$f'(2) = 4$. Đó là hệ số góc của tiếp tuyến tại $x = 2$.`,
      R`Số $2$ mới là hoành độ. $2x$ chưa thế. $f'(2) = 0$ chỉ đúng ở đỉnh $x = 0$, không phải tại $x = 2$.`,
    ],
    stepsEn: [
      R`$f(x) = x^2$ has $f'(x) = 2x$.`,
      R`$f'(2) = 4$. That is the slope of the tangent at $x = 2$.`,
      R`The number $2$ is only the x-coordinate. $2x$ has not been evaluated. $f'(2) = 0$ would be the vertex at $x = 0$, not at $x = 2$.`,
    ],
  },
  {
    id: "deriv-secant",
    prompt: R`Cho $y = x^2$. Hệ số góc của cát tuyến qua $x = 1$ và $x = 1+h$ $(h \neq 0)$ bằng bao nhiêu?`,
    promptEn: R`For $y = x^2$, what is the slope of the secant through $x = 1$ and $x = 1+h$ $(h \neq 0)$?`,
    choices: [R`$2 + h$`, R`$2$`, R`$h$`, R`$2h$`],
    choicesEn: [R`$2 + h$`, R`$2$`, R`$h$`, R`$2h$`],
    answer: 0,
    hint: "Khai (1+h)² − 1 rồi chia cho h. Đừng vội cho h về 0.",
    hintEn: "Expand (1+h)² − 1 and divide by h. Do not send h to 0 yet.",
    steps: [
      R`$(1+h)^2 - 1^2 = 1 + 2h + h^2 - 1 = 2h + h^2$.`,
      R`Chia cho $h \neq 0$: $\dfrac{2h + h^2}{h} = 2 + h$.`,
      R`Số $2$ là hệ số góc tiếp tuyến, tức giới hạn khi $h \to 0$. Cát tuyến vẫn còn số hạng $h$.`,
    ],
    stepsEn: [
      R`$(1+h)^2 - 1^2 = 1 + 2h + h^2 - 1 = 2h + h^2$.`,
      R`Divide by $h \neq 0$: $\dfrac{2h + h^2}{h} = 2 + h$.`,
      R`The number $2$ is the tangent slope, the limit as $h \to 0$. The secant still carries the term $h$.`,
    ],
  },
  {
    id: "deriv-time",
    prompt: R`Ném thẳng đứng, lấy $g = 10$: $h(t) = 20t - 5t^2$ (mét, $t$ giây). Bóng cao nhất lúc nào?`,
    promptEn: R`A ball is thrown straight up, with $g = 10$: $h(t) = 20t - 5t^2$ (metres, $t$ in seconds). When is it highest?`,
    choices: [R`$t = 2\text{ s}$`, R`$t = 1\text{ s}$`, R`$t = 4\text{ s}$`, R`$t = 0\text{ s}$`],
    choicesEn: [R`$t = 2\text{ s}$`, R`$t = 1\text{ s}$`, R`$t = 4\text{ s}$`, R`$t = 0\text{ s}$`],
    answer: 0,
    hint: "Cao nhất khi vận tốc bằng 0. Đạo hàm của 5t² là 10t, không phải 5t.",
    hintEn: "The top is where velocity is 0. The derivative of 5t² is 10t, not 5t.",
    steps: [
      R`$h'(t) = 20 - 10t$. Hệ số $10$ là $2 \cdot 5$, vì đạo hàm của $t^2$ mang thêm $2$.`,
      R`$h' = 0$ khi $t = 2$ s.`,
      R`Tại $t = 1$, $h(1) = 15$ nhưng $h'(1) = 10 \neq 0$: bóng vẫn đang lên. $t = 4$ là lúc chạm đất, $h(4) = 0$.`,
    ],
    stepsEn: [
      R`$h'(t) = 20 - 10t$. The $10$ is $2 \cdot 5$, because the derivative of $t^2$ brings a factor $2$.`,
      R`$h' = 0$ at $t = 2$ s.`,
      R`At $t = 1$, $h(1) = 15$ but $h'(1) = 10 \neq 0$: the ball is still rising. $t = 4$ is the landing, $h(4) = 0$.`,
    ],
  },
  {
    id: "deriv-height",
    prompt: R`Cùng bài ném $h(t) = 20t - 5t^2$. Độ cao lớn nhất là bao nhiêu?`,
    promptEn: R`Same throw, $h(t) = 20t - 5t^2$. What is the greatest height?`,
    choices: [R`$20\text{ m}$`, R`$15\text{ m}$`, R`$40\text{ m}$`, R`$10\text{ m}$`],
    choicesEn: [R`$20\text{ m}$`, R`$15\text{ m}$`, R`$40\text{ m}$`, R`$10\text{ m}$`],
    answer: 0,
    hint: "Thế đúng thời điểm vận tốc bằng 0. Đừng thế t = 1 chỉ vì ra số tròn.",
    hintEn: "Substitute the time when velocity is 0. Do not substitute t = 1 just because the number looks tidy.",
    steps: [
      R`Cao nhất khi $h'(t) = 20 - 10t = 0$, tức $t = 2$.`,
      R`$h(2) = 40 - 20 = 20$ m.`,
      R`$15$ m là $h(1)$, lúc vận tốc còn $10$ m/s. $40$ m là số $20 \cdot 2$ trước khi trừ $5t^2$.`,
    ],
    stepsEn: [
      R`The top is where $h'(t) = 20 - 10t = 0$, so $t = 2$.`,
      R`$h(2) = 40 - 20 = 20$ m.`,
      R`$15$ m is $h(1)$, when the velocity is still $10$ m/s. $40$ m is the product $20 \cdot 2$ before subtracting $5t^2$.`,
    ],
  },
  {
    id: "deriv-cubic",
    prompt: R`$f(x) = x^3 - 3x$. Phương trình $f'(x) = 0$ có nghiệm nào?`,
    promptEn: R`$f(x) = x^3 - 3x$. What are the solutions of $f'(x) = 0$?`,
    choices: [R`$x = -1$ và $x = 1$`, R`chỉ $x = 0$`, R`$x = -\sqrt{3}$ và $x = \sqrt{3}$`, "Không có nghiệm"],
    choicesEn: [R`$x = -1$ and $x = 1$`, R`only $x = 0$`, R`$x = -\sqrt{3}$ and $x = \sqrt{3}$`, "No solution"],
    answer: 0,
    hint: "Đạo hàm trước, rồi giải 3x² − 3 = 0. Đừng giải f(x) = 0.",
    hintEn: "Differentiate first, then solve 3x² − 3 = 0. Do not solve f(x) = 0.",
    steps: [
      R`$f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$.`,
      R`$f' = 0$ tại $x = -1$ và $x = 1$. $f(-1) = 2$ là cực đại, $f(1) = -2$ là cực tiểu, vì $f'$ đổi dấu tại cả hai.`,
      R`$x = \pm\sqrt{3}$ là nghiệm của $f(x) = 0$, không phải của $f'$. Với $y = x^3$, $y' = 3x^2$ chạm $0$ tại $0$ nhưng không đổi dấu, nên không có cực trị.`,
    ],
    stepsEn: [
      R`$f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$.`,
      R`$f' = 0$ at $x = -1$ and $x = 1$. $f(-1) = 2$ is a local maximum and $f(1) = -2$ is a local minimum, because $f'$ changes sign at both.`,
      R`$x = \pm\sqrt{3}$ solves $f(x) = 0$, not $f'$. For $y = x^3$, $y' = 3x^2$ touches $0$ at $0$ but does not change sign, so there is no extremum.`,
    ],
  },
  {
    id: "deriv-interval",
    prompt: R`Trên đoạn $[0;\ 3]$, giá trị lớn nhất của $y = x^2 - 2x$ là bao nhiêu?`,
    promptEn: R`On the interval $[0, 3]$, what is the maximum of $y = x^2 - 2x$?`,
    choices: [R`$3$ tại $x = 3$`, R`$-1$ tại $x = 1$`, R`$0$ tại $x = 0$`, R`$1$ tại $x = 1$`],
    choicesEn: [R`$3$ at $x = 3$`, R`$-1$ at $x = 1$`, R`$0$ at $x = 0$`, R`$1$ at $x = 1$`],
    answer: 0,
    hint: "So ba ứng viên: hai đầu mút và điểm y′ = 0. Điểm dừng ở đây là đáy, không phải đỉnh.",
    hintEn: "Compare three candidates: both endpoints and the point where y′ = 0. The stationary point here is the bottom, not the top.",
    steps: [
      R`$y' = 2x - 2 = 0$ tại $x = 1$, và $y(1) = -1$. Vì $y'' = 2 > 0$, đây là giá trị nhỏ nhất.`,
      R`Hai đầu mút: $y(0) = 0$ và $y(3) = 9 - 6 = 3$.`,
      R`Giá trị lớn nhất là $3$ tại $x = 3$, dù đạo hàm tại đầu mút không bằng $0$. Bỏ đầu mút thì mất số này.`,
    ],
    stepsEn: [
      R`$y' = 2x - 2 = 0$ at $x = 1$, and $y(1) = -1$. Since $y'' = 2 > 0$, this is the minimum.`,
      R`The endpoints: $y(0) = 0$ and $y(3) = 9 - 6 = 3$.`,
      R`The maximum is $3$ at $x = 3$, even though the derivative is not $0$ there. Drop the endpoint and that value is lost.`,
    ],
  },
  {
    id: "deriv-brake",
    prompt: R`Xe đang chạy $20$ m/s thì phanh, vận tốc $v(t) = 20 - 4t$ (m/s). Quãng đường từ lúc phanh đến khi dừng là bao nhiêu?`,
    promptEn: R`A car at $20$ m/s brakes, with speed $v(t) = 20 - 4t$ (m/s). What distance does it travel from the start of braking until it stops?`,
    choices: [R`$50\text{ m}$`, R`$100\text{ m}$`, R`$20\text{ m}$`, R`$80\text{ m}$`],
    choicesEn: [R`$50\text{ m}$`, R`$100\text{ m}$`, R`$20\text{ m}$`, R`$80\text{ m}$`],
    answer: 0,
    hint: "Tìm lúc v = 0 trước. Rồi tính s, đừng nhân 20 m/s với cả 5 giây.",
    hintEn: "Find when v = 0 first. Then compute s. Do not multiply 20 m/s by the full 5 seconds.",
    steps: [
      R`Dừng khi $v = 0$: $20 - 4t = 0$, nên $t = 5$ s.`,
      R`Nguyên hàm của vận tốc là $s(t) = 20t - 2t^2$. $s(5) = 100 - 50 = 50$ m. Cũng bằng vận tốc trung bình $\dfrac{20 + 0}{2} \cdot 5 = 50$ m.`,
      R`$100$ m là $20 \cdot 5$, quên xe đang chậm lại. $80$ m là $20 \cdot 4$, lấy nhầm gia tốc $4$ làm số giây. $20$ m là vận tốc, không phải quãng đường.`,
    ],
    stepsEn: [
      R`The car stops when $v = 0$: $20 - 4t = 0$, so $t = 5$ s.`,
      R`An antiderivative of velocity is $s(t) = 20t - 2t^2$. $s(5) = 100 - 50 = 50$ m. The same number is the average speed $\dfrac{20 + 0}{2} \cdot 5 = 50$ m.`,
      R`$100$ m is $20 \cdot 5$, forgetting that the car is slowing. $80$ m is $20 \cdot 4$, using the acceleration $4$ as if it were the number of seconds. $20$ m is a speed, not a distance.`,
    ],
  },
];

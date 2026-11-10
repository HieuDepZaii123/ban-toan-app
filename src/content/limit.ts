import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const limitLesson: Lesson = {
  basic: [
    { k: "mo", vi: R`$\lim_{x\to a}f(x)=L$ khi cả hai phía tiến tới $L$. Giá trị $f(a)$ không quyết định giới hạn.`, en: R`$\lim_{x\to a}f(x)=L$ when both sides approach $L$. The value $f(a)$ does not decide the limit.` },
    { k: "dinh", vi: R`Liên tục tại $a$ khi giới hạn tồn tại và bằng $f(a)$.`, en: R`Continuous at $a$ when the limit exists and equals $f(a)$.` },
    { k: "vd", vi: R`Với $x\neq 1$, $\dfrac{x^2-1}{x-1}=x+1$. Khi $x$ sát $1$, biểu thức sát $2$, dù có gán $f(1)=5$.`, en: R`For $x\neq 1$, $\dfrac{x^2-1}{x-1}=x+1$. When $x$ is near $1$, the expression is near $2$, even if $f(1)=5$.` },
  ],
  exam: [
    { k: "dinh", vi: R`Hai phía khác nhau thì không có giới hạn. Không lấy trung bình hai phía.`, en: R`Different one-sided limits mean there is no limit. Do not average the two sides.` },
    { k: "vd", vi: R`$T(t)=25+60e^{-t/4}$. $T(0)=85$. Khi $t\to+\infty$, $e^{-t/4}\to 0$ nên $T\to 25$.`, en: R`$T(t)=25+60e^{-t/4}$. $T(0)=85$. As $t\to+\infty$, $e^{-t/4}\to 0$ so $T\to 25$.` },
    { k: "loi", vi: R`Thế $x=1$ vào $\dfrac{x^2-1}{x-1}$ khi mẫu bằng $0$. Rút còn $x+1$, giới hạn là $2$.`, en: R`Substituting $x=1$ into $\dfrac{x^2-1}{x-1}$ while the denominator is $0$. After cancelling, it is $x+1$ and the limit is $2$.` },
    { k: "kiem", vi: R`$f(x)=-1$ khi $x<0$ và $f(x)=1$ khi $x>0$. Hai phía khác nhau: không có $\lim_{x\to 0}f(x)$.`, en: R`$f(x)=-1$ for $x<0$ and $f(x)=1$ for $x>0$. The sides differ: $\lim_{x\to 0}f(x)$ does not exist.` },
  ],
};

export const limitQuestions: Question[] = [
  {
    id: "lim-hole",
    prompt: R`$\lim_{x \to 1}\dfrac{x^2-1}{x-1}$ bằng bao nhiêu?`,
    promptEn: R`What is $\lim_{x \to 1}\dfrac{x^2-1}{x-1}$?`,
    choices: [R`$2$`, R`$0$`, "Không tồn tại", R`$1$`],
    choicesEn: [R`$2$`, R`$0$`, "Does not exist", R`$1$`],
    answer: 0,
    hint: R`Rút $x-1$ trước, rồi mới thế.`,
    hintEn: "Cancel the factor x − 1 first. Do not substitute x = 1 into the original expression.",
    steps: [
      R`$x^2 - 1 = (x-1)(x+1)$. Với $x \neq 1$, biểu thức bằng $x+1$.`,
      R`Cho $x \to 1$ thì $x+1 \to 2$.`,
      R`Thế thẳng $x = 1$ cho dạng $\dfrac{0}{0}$, chưa kết luận được gì, nên không phải số $0$. Không tồn tại khi hai phía khác nhau, hoặc khi một phía không có giới hạn (dao động, tiến ra vô cực); ở đây hai phía cùng về một số. Số $1$ là giá trị của $x+1$ tại $x = 0$, không phải tại $1$.`,
    ],
    stepsEn: [
      R`$x^2 - 1 = (x-1)(x+1)$. For $x \neq 1$ the expression equals $x+1$.`,
      R`As $x \to 1$, $x+1 \to 2$.`,
      R`Substituting $x = 1$ gives the form $\dfrac{0}{0}$, which decides nothing, so the answer is not $0$. “Does not exist” happens when the two sides differ, or when a side has no limit (oscillation, blowing up); here both sides approach the same number. The number $1$ is $x+1$ at $x = 0$, not at $1$.`,
    ],
  },
  {
    id: "lim-assign",
    prompt: R`Cùng biểu thức ấy, nhưng gán $f(1) = 5$. Giới hạn khi $x \to 1$ bằng bao nhiêu?`,
    promptEn: R`Same expression, but set $f(1) = 5$. What is the limit as $x \to 1$?`,
    choices: [R`$2$`, R`$5$`, "Không tồn tại", R`$0$`],
    choicesEn: [R`$2$`, R`$5$`, "Does not exist", R`$0$`],
    answer: 0,
    hint: "Nhìn hai phía quanh điểm đó, không lấy giá trị tại đúng điểm.",
    hintEn: "The limit looks at the points around it, not at that single point.",
    steps: [
      R`Với mọi $x \neq 1$, $f(x) = x+1$.`,
      R`Hai phía đều tiến tới $2$. Số $5$ chỉ đứng tại một điểm.`,
      R`Lấy $5$ là đọc $f(1)$. Hàm này gián đoạn tại $1$, nhưng giới hạn vẫn tồn tại.`,
    ],
    stepsEn: [
      R`For every $x \neq 1$, $f(x) = x+1$.`,
      R`Both sides approach $2$. The number $5$ sits at one point only.`,
      R`Reading $5$ is reading $f(1)$. The function is discontinuous at $1$, but the limit still exists.`,
    ],
  },
  {
    id: "lim-jump",
    prompt: R`$f(x) = -1$ khi $x < 0$, $f(x) = 1$ khi $x > 0$, và $f(0) = 0$. Giới hạn khi $x \to 0$ bằng bao nhiêu?`,
    promptEn: R`$f(x) = -1$ for $x < 0$, $f(x) = 1$ for $x > 0$, and $f(0) = 0$. What is the limit as $x \to 0$?`,
    choices: ["Không tồn tại", R`$-1$`, R`$0$`, R`$1$`],
    choicesEn: ["Does not exist", R`$-1$`, R`$0$`, R`$1$`],
    answer: 0,
    hint: "Tính riêng phía trái và phía phải, không lấy trung bình.",
    hintEn: "Compute the left side and the right side separately. Do not average them.",
    steps: [
      R`Phía trái tiến tới $-1$. Phía phải tiến tới $1$.`,
      R`Hai số khác nhau, nên không có giới hạn.`,
      R`Số $0$ là $f(0)$. Số $-1$ và số $1$ mỗi cái chỉ là một phía.`,
    ],
    stepsEn: [
      R`The left side approaches $-1$. The right side approaches $1$.`,
      R`The two numbers differ, so there is no limit.`,
      R`The number $0$ is $f(0)$. Each of $-1$ and $1$ is only one side.`,
    ],
  },
  {
    id: "lim-cont",
    prompt: R`Với $\dfrac{x^2-1}{x-1}$ và $f(1) = 2$, hàm có liên tục tại $x = 1$ không?`,
    promptEn: R`For $\dfrac{x^2-1}{x-1}$ with $f(1) = 2$, is the function continuous at $x = 1$?`,
    choices: [
      "Có, vì giới hạn bằng giá trị tại 1",
      "Không, vì mẫu bằng 0 tại x = 1",
      "Không, vì giới hạn bằng 0",
      "Chỉ liên tục khi f(1) = 0",
    ],
    choicesEn: [
      "Yes, because the limit equals the value at 1",
      "No, because the denominator is 0 at x = 1",
      "No, because the limit is 0",
      "Continuous only when f(1) = 0",
    ],
    answer: 0,
    hint: "Liên tục khi giới hạn bằng đúng số đã gán tại điểm đó.",
    hintEn: "Continuity needs the limit to exist and to equal the assigned value.",
    steps: [
      R`Giới hạn là $2$, như sau khi rút gọn.`,
      R`$f(1)$ cũng bằng $2$, nên hàm liên tục tại $1$.`,
      R`Mẫu của biểu thức cũ bằng $0$, nhưng sau khi gán $f(1) = 2$ thì hàm đã được định nghĩa. Liên tục không đòi hỏi công thức cũ còn nghĩa tại điểm đó.`,
    ],
    stepsEn: [
      R`The limit is $2$, after simplifying.`,
      R`$f(1)$ is also $2$, so the function is continuous at $1$.`,
      R`The old denominator is $0$, but once $f(1) = 2$ is assigned the function is defined. Continuity does not need the old formula to make sense at the point.`,
    ],
  },
  {
    id: "lim-tea",
    prompt: R`Nước nóng theo $T(t) = 25 + 60e^{-t/4}$, $t$ tính bằng phút. Khi $t$ tăng mãi, nhiệt độ tiến về bao nhiêu?`,
    promptEn: R`Hot water follows $T(t) = 25 + 60e^{-t/4}$, with $t$ in minutes. What temperature does it approach as $t$ grows without bound?`,
    choices: [R`$25^\circ\text{C}$`, R`$85^\circ\text{C}$`, R`$0^\circ\text{C}$`, R`$60^\circ\text{C}$`],
    choicesEn: [R`$25^\circ\text{C}$`, R`$85^\circ\text{C}$`, R`$0^\circ\text{C}$`, R`$60^\circ\text{C}$`],
    answer: 0,
    hint: R`Khi $t\to+\infty$, $e^{-t/4}\to 0$, còn lại $25$.`,
    hintEn: "A large negative exponent sends the exponential to 0. The 25 sits outside it.",
    steps: [
      R`Khi $t \to +\infty$, $-t/4 \to -\infty$ nên $e^{-t/4} \to 0$.`,
      R`$T(t) \to 25 + 0 = 25$. Đó là nhiệt độ phòng.`,
      R`$85^\circ\text{C}$ là $T(0)$, lúc mới rót. $60^\circ\text{C}$ là phần nóng hơn phòng lúc đầu. Nước không nguội về $0^\circ\text{C}$.`,
    ],
    stepsEn: [
      R`As $t \to +\infty$, $-t/4 \to -\infty$, so $e^{-t/4} \to 0$.`,
      R`$T(t) \to 25 + 0 = 25$. That is room temperature.`,
      R`$85^\circ\text{C}$ is $T(0)$, just after pouring. $60^\circ\text{C}$ is the initial excess over the room. The water does not cool to $0^\circ\text{C}$.`,
    ],
  },
  {
    id: "lim-sinc",
    prompt: R`$\lim_{x \to 0}\dfrac{\sin x}{x}$ bằng bao nhiêu? ($x$ tính bằng radian)`,
    promptEn: R`What is $\lim_{x \to 0}\dfrac{\sin x}{x}$? ($x$ in radians)`,
    choices: [R`$1$`, R`$0$`, "Không tồn tại", R`$x$`],
    choicesEn: [R`$1$`, R`$0$`, "Does not exist", R`$x$`],
    answer: 0,
    hint: "Mẫu bằng 0 tại điểm đó, nhưng hai phía cùng tiến về một số.",
    hintEn: "At x = 0 the denominator is 0, but both sides approach the same number.",
    steps: [
      R`Biểu thức không xác định tại $0$. Giới hạn không cần giá trị tại đúng điểm đó.`,
      R`Gần $0$, $\sin x \approx x$ (kẹp: $\cos x \le \dfrac{\sin x}{x} \le 1$), nên tỉ số tiến về $1$. Chỉ “cùng nhỏ” thì chưa đủ: $\dfrac{x^2}{x} \to 0$.`,
      R`Số $0$ là thay $x = 0$ một cách máy móc. Không tồn tại khi hai phía khác nhau, hoặc khi một phía không có giới hạn (dao động, tiến ra vô cực); ở đây hai phía cùng về một số.`,
    ],
    stepsEn: [
      R`The expression is undefined at $0$. The limit does not need a value at that single point.`,
      R`Near $0$, $\sin x \approx x$ (squeeze: $\cos x \le \dfrac{\sin x}{x} \le 1$), so the ratio approaches $1$. Being “both small” is not enough: $\dfrac{x^2}{x} \to 0$.`,
      R`The number $0$ comes from substituting $x = 0$ blindly. “Does not exist” happens when the two sides differ, or when a side has no limit (oscillation, blowing up); here both sides approach the same number.`,
    ],
  },
];

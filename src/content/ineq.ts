import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const ineqLesson: Lesson = {
  concept: R`$a,b>0\Rightarrow\dfrac{a+b}{2}\ge\sqrt{ab}$, bằng $\Leftrightarrow a=b$. $4,9\to 6{,}5;\ 6$. $a+b=10\Rightarrow\max ab=25$. $(1^2+2^2)(3^2+4^2)=125\ge121=(1\cdot3+2\cdot4)^2$. $(1;2)\parallel(3;6)\Rightarrow225=225$. $P=5x+3y$ trên $x,y\ge0$, $x+y\le10$, $2x+y\le16$: đỉnh $0,40,42,30$, nên $\max=42$ tại $(6;4)$. $(9;2)$: $x+y=11$. $-2x\le4\Rightarrow x\ge-2$.`,
  conceptEn: R`$a,b>0\Rightarrow\dfrac{a+b}{2}\ge\sqrt{ab}$, equality $\Leftrightarrow a=b$. $4,9\to 6{,}5;\ 6$. $a+b=10\Rightarrow\max ab=25$. $(1^2+2^2)(3^2+4^2)=125\ge121=(1\cdot3+2\cdot4)^2$. $(1;2)\parallel(3;6)\Rightarrow225=225$. $P=5x+3y$ on $x,y\ge0$, $x+y\le10$, $2x+y\le16$: vertices $0,40,42,30$, so $\max=42$ at $(6;4)$. $(9;2)$: $x+y=11$. $-2x\le4\Rightarrow x\ge-2$.`,
};

export const ineqQuestions: Question[] = [
  {
    id: "ineq-am",
    prompt: R`$a=4$, $b=9$: $\dfrac{a+b}{2}$ và $\sqrt{ab}$?`,
    promptEn: R`$a=4$, $b=9$: $\dfrac{a+b}{2}$ and $\sqrt{ab}$?`,
    choices: ["6,5 và 6", "6 và 6,5", "13 và 36", "6,5 và 36"],
    choicesEn: ["6.5 and 6", "6 and 6.5", "13 and 36", "6.5 and 36"],
    answer: 0,
    hint: R`$\dfrac{a+b}{2}$, rồi $\sqrt{ab}$. Đừng đảo, đừng lấy $a+b$ và $ab$.`,
    hintEn: R`$\dfrac{a+b}{2}$, then $\sqrt{ab}$. Do not swap, and do not report $a+b$ and $ab$.`,
    steps: [
      R`$\dfrac{4+9}{2}=6{,}5$.`,
      R`$\sqrt{4\cdot9}=\sqrt{36}=6$.`,
      R`$6$ rồi $6{,}5$: đảo. $13=4+9$, $36=4\cdot9$.`,
    ],
    stepsEn: [
      R`$\dfrac{4+9}{2}=6{,}5$.`,
      R`$\sqrt{4\cdot9}=\sqrt{36}=6$.`,
      R`$6$ then $6{,}5$: swapped. $13=4+9$, $36=4\cdot9$.`,
    ],
  },
  {
    id: "ineq-equal",
    prompt: R`$a,b>0$: $\dfrac{a+b}{2}=\sqrt{ab}$ khi nào?`,
    promptEn: R`$a,b>0$: when is $\dfrac{a+b}{2}=\sqrt{ab}$?`,
    choices: ["Khi a = b", "Khi a + b = 1", "Khi a = 2b", "Khi cả hai âm"],
    choicesEn: ["When a = b", "When a + b = 1", "When a = 2b", "When both are negative"],
    answer: 0,
    hint: R`Bằng $\Leftrightarrow a=b$. Nếu $a\le0$ thì không dùng.`,
    hintEn: R`Equality $\Leftrightarrow a=b$. If $a\le0$, it does not apply.`,
    steps: [
      R`$\dfrac{a+b}{2}\ge\sqrt{ab}$ với $a,b>0$.`,
      R`Dấu bằng $\Leftrightarrow a=b$.`,
      R`$a+b=1$, $a=2b$: không phải điều kiện. $a<0$: bỏ.`,
    ],
    stepsEn: [
      R`$\dfrac{a+b}{2}\ge\sqrt{ab}$ for $a,b>0$.`,
      R`Equality $\Leftrightarrow a=b$.`,
      R`$a+b=1$, $a=2b$: not the condition. $a<0$: excluded.`,
    ],
  },
  {
    id: "ineq-split",
    prompt: R`$a,b>0$, $a+b=10$. $\max ab=?$`,
    promptEn: R`$a,b>0$, $a+b=10$. $\max ab=?$`,
    choices: ["25", "24", "16", "9"],
    choicesEn: ["25", "24", "16", "9"],
    answer: 0,
    hint: R`$\max$ khi $a=b=\dfrac{10}{2}$.`,
    hintEn: R`$\max$ when $a=b=\dfrac{10}{2}$.`,
    steps: [
      R`$t(10-t)$, $0<t<10$.`,
      R`$t=5\Rightarrow 25$.`,
      R`$24=4\cdot6$. $16=4^2$ nhưng tổng $8$. $9=1\cdot9$.`,
    ],
    stepsEn: [
      R`$t(10-t)$, $0<t<10$.`,
      R`$t=5\Rightarrow 25$.`,
      R`$24=4\cdot6$. $16=4^2$ but the sum is $8$. $9=1\cdot9$.`,
    ],
  },
  {
    id: "ineq-cauchy",
    prompt: R`$(1;2),\ (3;4)$: $(a^2+b^2)(c^2+d^2)$ và $(ac+bd)^2$?`,
    promptEn: R`$(1;2),\ (3;4)$: $(a^2+b^2)(c^2+d^2)$ and $(ac+bd)^2$?`,
    choices: [R`$125 \ge 121$`, R`$125 \le 121$`, R`$25 \ge 11$`, R`$5 \ge 7$`],
    choicesEn: [R`$125 \ge 121$`, R`$125 \le 121$`, R`$25 \ge 11$`, R`$5 \ge 7$`],
    answer: 0,
    hint: R`Nhân hai tổng bình phương, rồi $(ac+bd)^2$. Đừng đảo $\ge$.`,
    hintEn: R`Multiply the sums of squares, then $(ac+bd)^2$. Do not flip $\ge$.`,
    steps: [
      R`$(1^2+2^2)(3^2+4^2)=5\cdot25=125$.`,
      R`$(1\cdot3+2\cdot4)^2=11^2=121$, nên $125\ge121$.`,
      R`$\le$ đảo. $25\ge11$: bỏ bình phương. $5\ge7$: lấy căn.`,
    ],
    stepsEn: [
      R`$(1^2+2^2)(3^2+4^2)=5\cdot25=125$.`,
      R`$(1\cdot3+2\cdot4)^2=11^2=121$, so $125\ge121$.`,
      R`$\le$ flips it. $25\ge11$: dropped the square. $5\ge7$: took square roots.`,
    ],
  },
  {
    id: "ineq-lp",
    prompt: R`$x,y\ge0$, $x+y\le10$, $2x+y\le16$, $P=5x+3y$. $\max P=?$`,
    promptEn: R`$x,y\ge0$, $x+y\le10$, $2x+y\le16$, $P=5x+3y$. $\max P=?$`,
    choices: ["42 tại (6; 4)", "40 tại (8; 0)", "30 tại (0; 10)", "38 tại (6; 4)"],
    choicesEn: ["42 at (6; 4)", "40 at (8; 0)", "30 at (0; 10)", "38 at (6; 4)"],
    answer: 0,
    hint: R`$P$ tại đỉnh. Điểm trong $\neq\max$.`,
    hintEn: R`$P$ at a vertex. An interior point $\neq\max$.`,
    steps: [
      R`Đỉnh: $(0;0),\ (8;0),\ (6;4),\ (0;10)$.`,
      R`$P=0,40,42,30$. $\max=42$ tại $(6;4)$.`,
      R`$40$ và $30$ là đỉnh kia. $38=3\cdot6+5\cdot4$: đảo hệ số.`,
    ],
    stepsEn: [
      R`Vertices: $(0;0),\ (8;0),\ (6;4),\ (0;10)$.`,
      R`$P=0,40,42,30$. $\max=42$ at $(6;4)$.`,
      R`$40$ and $30$ are the other vertices. $38=3\cdot6+5\cdot4$: swapped coefficients.`,
    ],
  },
  {
    id: "ineq-flip",
    prompt: R`Bất đẳng thức $-2x \le 4$ có nghiệm nào?`,
    promptEn: R`Which set solves $-2x \le 4$?`,
    choices: [R`$x \ge -2$`, R`$x \le -2$`, R`$x \ge 2$`, R`$x \le 2$`],
    choicesEn: [R`$x \ge -2$`, R`$x \le -2$`, R`$x \ge 2$`, R`$x \le 2$`],
    answer: 0,
    hint: R`Chia $-2$ $\Rightarrow$ đảo $\le$. Đừng chỉ bỏ dấu.`,
    hintEn: R`Divide by $-2$ $\Rightarrow$ flip $\le$. Do not only drop the sign.`,
    steps: [
      R`$\dfrac{-2x}{-2}\ge\dfrac{4}{-2}$.`,
      R`$x\ge-2$.`,
      R`$x\le-2$: quên đảo. $x\ge2$: bỏ dấu. $x\le2$: cả hai.`,
    ],
    stepsEn: [
      R`$\dfrac{-2x}{-2}\ge\dfrac{4}{-2}$.`,
      R`$x\ge-2$.`,
      R`$x\le-2$: no flip. $x\ge2$: sign dropped. $x\le2$: both.`,
    ],
  },
];

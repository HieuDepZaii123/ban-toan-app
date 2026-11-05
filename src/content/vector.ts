import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const vectorLesson: Lesson = {
  basic: [
    { k: "mo", vi: R`Vectơ là mũi tên có hướng. Độ dài là khoảng từ gốc tới ngọn, không phải tổng các thành phần.`, en: R`A vector is a directed arrow. Its length is the distance from tail to tip, not the sum of the components.` },
    { k: "dinh", vi: R`$|\vec u|=\sqrt{x^2+y^2+z^2}$. $\vec u\cdot\vec v=0$ thì hai vectơ vuông góc.`, en: R`$|\vec u|=\sqrt{x^2+y^2+z^2}$. $\vec u\cdot\vec v=0$ means the vectors are perpendicular.` },
    { k: "vd", vi: R`Độ dài $|(2;1;2)|=\sqrt{2^2+1^2+2^2}=\sqrt{9}=3$.`, en: R`The length $|(2;1;2)|=\sqrt{2^2+1^2+2^2}=\sqrt{9}=3$.` },
  ],
  exam: [
    { k: "dinh", vi: R`$\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc$. Khác $0$ thì hệ hai ẩn có đúng một nghiệm.`, en: R`$\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc$. If it is not $0$, the two-unknown system has one solution.` },
    { k: "vd", vi: R`$(1;2;-1)\cdot(2;-1;0)=2-2+0=0$, nên hai vectơ vuông góc.`, en: R`$(1;2;-1)\cdot(2;-1;0)=2-2+0=0$, so the vectors are perpendicular.` },
    { k: "loi", vi: R`Cộng $2+1+2=5$ không phải độ dài. Bỏ $z$ thì $|(2;1;2)|$ thành $\sqrt5$, sai.`, en: R`Adding $2+1+2=5$ is not the length. Dropping $z$ turns $|(2;1;2)|$ into $\sqrt5$, which is wrong.` },
    { k: "kiem", vi: R`$\begin{vmatrix}1&2\\3&4\end{vmatrix}=4-6=-2\neq 0$, nên hệ có một nghiệm.`, en: R`$\begin{vmatrix}1&2\\3&4\end{vmatrix}=4-6=-2\neq 0$, so the system has one solution.` },
  ],
};

export const vectorQuestions: Question[] = [
  {
    id: "vec-len",
    prompt: R`$|(2;\ 1;\ 2)|=?$`,
    promptEn: R`$|(2;\ 1;\ 2)|=?$`,
    choices: [R`$3$`, R`$5$`, R`$\sqrt{5}$`, R`$9$`],
    choicesEn: [R`$3$`, R`$5$`, R`$\sqrt{5}$`, R`$9$`],
    answer: 0,
    hint: R`$\sqrt{2^2+1^2+2^2}$. Đừng cộng, đừng bỏ $z$.`,
    hintEn: R`$\sqrt{2^2+1^2+2^2}$. Do not add, and do not drop $z$.`,
    steps: [
      R`$|u|=\sqrt{2^2+1^2+2^2}$.`,
      R`$\sqrt{9}=3$.`,
      R`$5=2+1+2$. $\sqrt{5}$: bỏ $z$. $9$: chưa căn.`,
    ],
    stepsEn: [
      R`$|u|=\sqrt{2^2+1^2+2^2}$.`,
      R`$\sqrt{9}=3$.`,
      R`$5=2+1+2$. $\sqrt{5}$: dropped $z$. $9$: no root.`,
    ],
  },
  {
    id: "vec-dot",
    prompt: R`$(1;\ 2;\ -1)\cdot(2;\ -1;\ 0)=?$`,
    promptEn: R`$(1;\ 2;\ -1)\cdot(2;\ -1;\ 0)=?$`,
    choices: [R`$0$`, R`$1$`, R`$3$`, R`$-1$`],
    choicesEn: [R`$0$`, R`$1$`, R`$3$`, R`$-1$`],
    answer: 0,
    hint: R`Nhân từng cặp rồi cộng. $0\Rightarrow\perp$.`,
    hintEn: R`Multiply matching pairs, then add. $0\Rightarrow\perp$.`,
    steps: [
      R`$1\cdot2+2\cdot(-1)+(-1)\cdot0$.`,
      R`$2-2+0=0$.`,
      R`$1$, $-1$: sót một số hạng. $3$: cộng trị tuyệt đối.`,
    ],
    stepsEn: [
      R`$1\cdot2+2\cdot(-1)+(-1)\cdot0$.`,
      R`$2-2+0=0$.`,
      R`$1$, $-1$: a term dropped. $3$: absolute values added.`,
    ],
  },
  {
    id: "vec-sum",
    prompt: R`$(1;\ 2;\ 3)+(2;\ -1;\ 1)=?$`,
    promptEn: R`$(1;\ 2;\ 3)+(2;\ -1;\ 1)=?$`,
    choices: [R`$(3;\ 1;\ 4)$`, R`$(3;\ 1;\ 2)$`, R`$(3;\ 3;\ 4)$`, R`$(1;\ -1;\ 1)$`],
    choicesEn: [R`$(3;\ 1;\ 4)$`, R`$(3;\ 1;\ 2)$`, R`$(3;\ 3;\ 4)$`, R`$(1;\ -1;\ 1)$`],
    answer: 0,
    hint: R`Cộng từng tọa độ. $2+(-1)\neq2+1$.`,
    hintEn: R`Add coordinate by coordinate. $2+(-1)\neq2+1$.`,
    steps: [
      R`$(1+2;\ 2+(-1);\ 3+1)$.`,
      R`$(3;\ 1;\ 4)$.`,
      R`$(3;\ 1;\ 2)$: sai $z$. $(3;\ 3;\ 4)$: đổi dấu. $(1;\ -1;\ 1)$: hiệu.`,
    ],
    stepsEn: [
      R`$(1+2;\ 2+(-1);\ 3+1)$.`,
      R`$(3;\ 1;\ 4)$.`,
      R`$(3;\ 1;\ 2)$: wrong $z$. $(3;\ 3;\ 4)$: sign flipped. $(1;\ -1;\ 1)$: a difference.`,
    ],
  },
  {
    id: "vec-det",
    prompt: R`$\det=ad-bc$, $a=2$, $b=1$, $c=1$, $d=-1$. $\det=?$`,
    promptEn: R`$\det=ad-bc$, $a=2$, $b=1$, $c=1$, $d=-1$. $\det=?$`,
    choices: [R`$-3$`, R`$-1$`, R`$1$`, R`$3$`],
    choicesEn: [R`$-3$`, R`$-1$`, R`$1$`, R`$3$`],
    answer: 0,
    hint: R`$ad-bc$. Đừng đảo thành $bc-ad$.`,
    hintEn: R`$ad-bc$. Do not reverse it into $bc-ad$.`,
    steps: [
      R`$2\cdot(-1)-1\cdot1$.`,
      R`$-2-1=-3$.`,
      R`$-1$: sót. $1$: đổi một dấu. $3=bc-ad$.`,
    ],
    stepsEn: [
      R`$2\cdot(-1)-1\cdot1$.`,
      R`$-2-1=-3$.`,
      R`$-1$: a term dropped. $1$: one sign flipped. $3=bc-ad$.`,
    ],
  },
  {
    id: "vec-sys",
    prompt: R`$2x+y=5$, $x-y=1$. $(x;\ y)=?$`,
    promptEn: R`$2x+y=5$, $x-y=1$. $(x;\ y)=?$`,
    choices: [R`$x = 2$, $y = 1$`, R`$x = 1$, $y = 2$`, R`$x = 3$, $y = -1$`, "Vô số nghiệm"],
    choicesEn: [R`$x = 2$, $y = 1$`, R`$x = 1$, $y = 2$`, R`$x = 3$, $y = -1$`, "Infinitely many solutions"],
    answer: 0,
    hint: R`$\det=-3\neq0$. Cộng hai phương trình.`,
    hintEn: R`$\det=-3\neq0$. Add the two equations.`,
    steps: [
      R`$3x=6\Rightarrow x=2$.`,
      R`$2-y=1\Rightarrow y=1$.`,
      R`$(1;\ 2)$: đảo. $(3;\ -1)$: $x-y\neq1$. Vô số nghiệm khi $\det=0$.`,
    ],
    stepsEn: [
      R`$3x=6\Rightarrow x=2$.`,
      R`$2-y=1\Rightarrow y=1$.`,
      R`$(1;\ 2)$: swapped. $(3;\ -1)$: $x-y\neq1$. Infinitely many only if $\det=0$.`,
    ],
  },
  {
    id: "vec-cross",
    prompt: R`$\vec i\times\vec j=?$`,
    promptEn: R`$\vec i\times\vec j=?$`,
    choices: [R`$(0;\ 0;\ 1)$`, R`$(0;\ 0;\ -1)$`, R`$(1;\ 0;\ 0)$`, R`$(0;\ 1;\ 0)$`],
    choicesEn: [R`$(0;\ 0;\ 1)$`, R`$(0;\ 0;\ -1)$`, R`$(1;\ 0;\ 0)$`, R`$(0;\ 1;\ 0)$`],
    answer: 0,
    hint: R`$\vec i,\ \vec j,\ \vec k$. Đảo thứ tự $\Rightarrow$ đổi dấu.`,
    hintEn: R`$\vec i,\ \vec j,\ \vec k$. Reverse the order $\Rightarrow$ flip the sign.`,
    steps: [
      R`$\vec i=(1;\ 0;\ 0)$, $\vec j=(0;\ 1;\ 0)$.`,
      R`$(0;\ 0;\ 1)=\vec k$.`,
      R`$(0;\ 0;\ -1)=\vec j\times\vec i$. $(1;\ 0;\ 0)=\vec i$, $(0;\ 1;\ 0)=\vec j$.`,
    ],
    stepsEn: [
      R`$\vec i=(1;\ 0;\ 0)$, $\vec j=(0;\ 1;\ 0)$.`,
      R`$(0;\ 0;\ 1)=\vec k$.`,
      R`$(0;\ 0;\ -1)=\vec j\times\vec i$. $(1;\ 0;\ 0)=\vec i$, $(0;\ 1;\ 0)=\vec j$.`,
    ],
  },
];

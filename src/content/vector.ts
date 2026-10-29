import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const vectorLesson: Lesson = {
  basic: [
    { k: "mo", vi: R`Vectơ là mũi tên có hướng. Cộng là nối đuôi mũi tên này vào đầu mũi tên kia. Độ dài là khoảng từ gốc tới ngọn.`, en: R`A vector is an arrow with direction. Addition joins the tail of one to the head of the other. Length is the distance from start to tip.` },
    { k: "vd", vi: R`$(1;2)+(2;-1)=(3;1)$. Độ dài của $(3;4)$ là $5$.`, en: R`$(1;2)+(2;-1)=(3;1)$. The length of $(3;4)$ is $5$.` },
  ],
  exam: [
    { k: "dinh", vi: R`$|u|=\sqrt{x^2+y^2+z^2}$. Tích vô hướng bằng $0$ thì hai vectơ vuông góc. $\det\neq0$ thì hệ hai ẩn có đúng một nghiệm.`, en: R`$|u|=\sqrt{x^2+y^2+z^2}$. A dot product of $0$ means the vectors are perpendicular. $\det\neq0$ means a two-unknown system has one solution.` },
    { k: "vd", vi: R`$|(2;1;2)|=3$. $(2;1;2)\cdot(1;-1;2)=5$. Hệ $2x+y=5$, $x-y=1$ cho $(2;1)$.`, en: R`$|(2;1;2)|=3$. $(2;1;2)\cdot(1;-1;2)=5$. The system $2x+y=5$, $x-y=1$ gives $(2;1)$.` },
    { k: "loi", vi: R`Cộng ba tọa độ ra $5$, không phải độ dài $3$. Tích có hướng không đổi thứ tự.`, en: R`Adding the three coordinates gives $5$, not the length $3$. The cross product changes if the order is swapped.` },
    { k: "kiem", vi: R`$(1;2;-1)\cdot(2;-1;0)=0$, nên hai vectơ vuông góc.`, en: R`$(1;2;-1)\cdot(2;-1;0)=0$, so the vectors are perpendicular.` },
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

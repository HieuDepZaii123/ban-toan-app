import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const analyticLesson: Lesson = {
  concept: R`$x+y-2=0$: $\vec n=(1;\ 1)$, $\vec d=(1;\ -1)$. $d(P)=\dfrac{|3+1-2|}{\sqrt{2}}=\sqrt{2}\neq2$. Chân $(2;\ 0)$, không phải $(1;\ 1),\ (2;\ 2)$. $x+y+z-6=0$: $d=\sqrt{3}$, chân $(2;\ 2;\ 2)$. $x^2+y^2=25$: $(3;\ 4)$ trên ($9+16=25$), $(6;\ 0)$ ngoài ($6>5$).`,
  conceptEn: R`$x+y-2=0$: $\vec n=(1;\ 1)$, $\vec d=(1;\ -1)$. $d(P)=\dfrac{|3+1-2|}{\sqrt{2}}=\sqrt{2}\neq2$. Foot $(2;\ 0)$, not $(1;\ 1)$ or $(2;\ 2)$. $x+y+z-6=0$: $d=\sqrt{3}$, foot $(2;\ 2;\ 2)$. $x^2+y^2=25$: $(3;\ 4)$ on ($9+16=25$), $(6;\ 0)$ outside ($6>5$).`,
};

export const analyticQuestions: Question[] = [
  {
    id: "ana-dist",
    prompt: R`Khoảng cách $(3;\ 1)$ tới $x+y-2=0$?`,
    promptEn: R`Distance from $(3;\ 1)$ to $x+y-2=0$?`,
    choices: [R`$\sqrt{2}$`, R`$2$`, R`$0$`, R`$1$`],
    choicesEn: [R`$\sqrt{2}$`, R`$2$`, R`$0$`, R`$1$`],
    answer: 0,
    hint: R`$\dfrac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$. Tử $\neq d$.`,
    hintEn: R`$\dfrac{|ax_0+by_0+c|}{\sqrt{a^2+b^2}}$. The numerator $\neq d$.`,
    steps: [
      R`$\dfrac{|3+1-2|}{\sqrt{1^2+1^2}}$.`,
      R`$\dfrac{2}{\sqrt{2}}=\sqrt{2}$.`,
      R`$2$: dừng ở tử. $0$: điểm trên đường. $1$: một hệ số.`,
    ],
    stepsEn: [
      R`$\dfrac{|3+1-2|}{\sqrt{1^2+1^2}}$.`,
      R`$\dfrac{2}{\sqrt{2}}=\sqrt{2}$.`,
      R`$2$: stopped at the numerator. $0$: the point is on the line. $1$: one coefficient.`,
    ],
  },
  {
    id: "ana-foot",
    prompt: R`Chân từ $(3;\ 1)$ xuống $x+y-2=0$?`,
    promptEn: R`Foot from $(3;\ 1)$ onto $x+y-2=0$?`,
    choices: [R`$(2;\ 0)$`, R`$(1;\ 1)$`, R`$(2;\ 2)$`, R`$(3;\ 1)$`],
    choicesEn: [R`$(2;\ 0)$`, R`$(1;\ 1)$`, R`$(2;\ 2)$`, R`$(3;\ 1)$`],
    answer: 0,
    hint: R`Trên đường, và $\parallel\vec n=(1;\ 1)$.`,
    hintEn: R`On the line, and $\parallel\vec n=(1;\ 1)$.`,
    steps: [
      R`$t=\dfrac{3+1-2}{1^2+1^2}=1$.`,
      R`$(3;\ 1)-t(1;\ 1)=(2;\ 0)$. $2+0-2=0$.`,
      R`$(1;\ 1),\ (2;\ 2)$ trên đường, nhưng không $\parallel(1;\ 1)$. $(3;\ 1)$ không trên đường.`,
    ],
    stepsEn: [
      R`$t=\dfrac{3+1-2}{1^2+1^2}=1$.`,
      R`$(3;\ 1)-t(1;\ 1)=(2;\ 0)$. $2+0-2=0$.`,
      R`$(1;\ 1)$ and $(2;\ 2)$ lie on the line, but not $\parallel(1;\ 1)$. $(3;\ 1)$ is not on the line.`,
    ],
  },
  {
    id: "ana-plane",
    prompt: R`Khoảng cách $(1;\ 1;\ 1)$ tới $x+y+z-6=0$?`,
    promptEn: R`Distance from $(1;\ 1;\ 1)$ to $x+y+z-6=0$?`,
    choices: [R`$\sqrt{3}$`, R`$3$`, R`$1$`, R`$2\sqrt{3}$`],
    choicesEn: [R`$\sqrt{3}$`, R`$3$`, R`$1$`, R`$2\sqrt{3}$`],
    answer: 0,
    hint: R`$\dfrac{|1+1+1-6|}{\sqrt{3}}$.`,
    hintEn: R`$\dfrac{|1+1+1-6|}{\sqrt{3}}$.`,
    steps: [
      R`$\dfrac{|1+1+1-6|}{\sqrt{1^2+1^2+1^2}}$.`,
      R`$\dfrac{3}{\sqrt{3}}=\sqrt{3}$.`,
      R`$3$: tử. $1$: một hệ số. $2\sqrt{3}$: nhân thêm $2$.`,
    ],
    stepsEn: [
      R`$\dfrac{|1+1+1-6|}{\sqrt{1^2+1^2+1^2}}$.`,
      R`$\dfrac{3}{\sqrt{3}}=\sqrt{3}$.`,
      R`$3$: the numerator. $1$: one coefficient. $2\sqrt{3}$: an extra factor $2$.`,
    ],
  },
  {
    id: "ana-dir",
    prompt: R`Chỉ phương của $x+y-2=0$?`,
    promptEn: R`A direction of $x+y-2=0$?`,
    choices: [R`$(1;\ -1)$`, R`$(1;\ 1)$`, R`$(2;\ 0)$`, R`$(0;\ 2)$`],
    choicesEn: [R`$(1;\ -1)$`, R`$(1;\ 1)$`, R`$(2;\ 0)$`, R`$(0;\ 2)$`],
    answer: 0,
    hint: R`$\vec n=(1;\ 1)$. $\vec d=(b;\ -a)\perp\vec n$.`,
    hintEn: R`$\vec n=(1;\ 1)$. $\vec d=(b;\ -a)\perp\vec n$.`,
    steps: [
      R`$ax+by+c=0\Rightarrow\vec d=(b;\ -a)$.`,
      R`$(1;\ -1)\cdot(1;\ 1)=0$.`,
      R`$(1;\ 1)=\vec n$. $(2;\ 0)\cdot(1;\ 1)=2\neq0$.`,
    ],
    stepsEn: [
      R`$ax+by+c=0\Rightarrow\vec d=(b;\ -a)$.`,
      R`$(1;\ -1)\cdot(1;\ 1)=0$.`,
      R`$(1;\ 1)=\vec n$. $(2;\ 0)\cdot(1;\ 1)=2\neq0$.`,
    ],
  },
  {
    id: "ana-circle",
    prompt: R`$(6;\ 0)$ và $x^2+y^2=25$?`,
    promptEn: R`$(6;\ 0)$ and $x^2+y^2=25$?`,
    choices: ["Nằm ngoài", "Nằm trên", "Nằm trong", "Là tâm"],
    choicesEn: ["Outside", "On the circle", "Inside", "It is the centre"],
    answer: 0,
    hint: R`$6>5\Rightarrow$ ngoài. $(3;\ 4)$ mới nằm trên.`,
    hintEn: R`$6>5\Rightarrow$ outside. $(3;\ 4)$ is the point on the circle.`,
    steps: [
      R`$|(6;\ 0)|=6$.`,
      R`$6>5\Rightarrow$ ngoài.`,
      R`Trên khi $d=5$, như $(3;\ 4)$: $3^2+4^2=25$. Trong khi $d<5$. Tâm $(0;\ 0)$.`,
    ],
    stepsEn: [
      R`$|(6;\ 0)|=6$.`,
      R`$6>5\Rightarrow$ outside.`,
      R`On the circle when $d=5$, as $(3;\ 4)$: $3^2+4^2=25$. Inside when $d<5$. Centre $(0;\ 0)$.`,
    ],
  },
  {
    id: "ana-on",
    prompt: R`$(3;\ 4)$ và $x^2+y^2=25$?`,
    promptEn: R`$(3;\ 4)$ and $x^2+y^2=25$?`,
    choices: ["Nằm trên", "Nằm ngoài", "Nằm trong", "Là tâm"],
    choicesEn: ["On the circle", "Outside", "Inside", "It is the centre"],
    answer: 0,
    hint: R`$3^2+4^2$ so với $25$. Bằng thì nằm trên.`,
    hintEn: R`Compare $3^2+4^2$ with $25$. Equal means on the circle.`,
    steps: [
      R`$9+16=25=5^2$.`,
      R`Bằng $\Rightarrow$ trên.`,
      R`Ngoài: $(6;\ 0)$, $36>25$. Trong: $<25$. Tâm $(0;\ 0)$.`,
    ],
    stepsEn: [
      R`$9+16=25=5^2$.`,
      R`Equal $\Rightarrow$ on the circle.`,
      R`Outside: $(6;\ 0)$, $36>25$. Inside: $<25$. Centre $(0;\ 0)$.`,
    ],
  },
];

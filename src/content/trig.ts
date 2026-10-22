import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const trigLesson: Lesson = {
  concept: R`$\sin^2\alpha+\cos^2\alpha=1$. $\sin150^\circ=\dfrac12$, $\cos150^\circ=-\dfrac{\sqrt3}{2}$. $\max(\sin+\cos)=\sqrt2$ tại $45^\circ\neq2$. Cây: $20\tan30^\circ+1{,}5$.`,
  conceptEn: R`$\sin^2\alpha+\cos^2\alpha=1$. $\sin150^\circ=\dfrac12$, $\cos150^\circ=-\dfrac{\sqrt3}{2}$. $\max(\sin+\cos)=\sqrt2$ at $45^\circ\neq2$. Tree: $20\tan30^\circ+1{,}5$.`,
};

export const trigQuestions: Question[] = [
  {
    id: "trig-sin",
    prompt: R`$\sin 150^\circ$ bằng bao nhiêu?`,
    promptEn: R`What is $\sin 150^\circ$?`,
    choices: [R`$\dfrac{1}{2}$`, R`$\dfrac{\sqrt{3}}{2}$`, R`$-\dfrac{1}{2}$`, R`$\dfrac{\sqrt{2}}{2}$`],
    choicesEn: [R`$\dfrac{1}{2}$`, R`$\dfrac{\sqrt{3}}{2}$`, R`$-\dfrac{1}{2}$`, R`$\dfrac{\sqrt{2}}{2}$`],
    answer: 0,
    hint: "150° = 180° − 30°. Sin của góc bù giữ nguyên.",
    hintEn: "150° = 180° − 30°. Sine of a supplementary angle stays the same.",
    steps: [
      R`$150^\circ = 180^\circ - 30^\circ$, ở góc phần tư II.`,
      R`$\sin(180^\circ - \alpha) = \sin\alpha$, nên $\sin 150^\circ = \sin 30^\circ = \dfrac{1}{2}$.`,
      R`$\dfrac{\sqrt{3}}{2}$ là $\sin 60^\circ$. $-\dfrac{1}{2}$ đã đổi dấu, trong khi sin ở góc phần tư II vẫn dương.`,
    ],
    stepsEn: [
      R`$150^\circ = 180^\circ - 30^\circ$, in quadrant II.`,
      R`$\sin(180^\circ - \alpha) = \sin\alpha$, so $\sin 150^\circ = \sin 30^\circ = \dfrac{1}{2}$.`,
      R`$\dfrac{\sqrt{3}}{2}$ is $\sin 60^\circ$. $-\dfrac{1}{2}$ has flipped the sign, but sine in quadrant II is still positive.`,
    ],
  },
  {
    id: "trig-cos",
    prompt: R`$\cos 150^\circ$ bằng bao nhiêu?`,
    promptEn: R`What is $\cos 150^\circ$?`,
    choices: [R`$-\dfrac{\sqrt{3}}{2}$`, R`$\dfrac{\sqrt{3}}{2}$`, R`$-\dfrac{1}{2}$`, R`$\dfrac{1}{2}$`],
    choicesEn: [R`$-\dfrac{\sqrt{3}}{2}$`, R`$\dfrac{\sqrt{3}}{2}$`, R`$-\dfrac{1}{2}$`, R`$\dfrac{1}{2}$`],
    answer: 0,
    hint: "Cùng góc liên kết 30°, nhưng cos đổi dấu ở góc phần tư II.",
    hintEn: "Same related angle, 30°, but cosine changes sign in quadrant II.",
    steps: [
      R`$\cos(180^\circ - \alpha) = -\cos\alpha$.`,
      R`$\cos 150^\circ = -\cos 30^\circ = -\dfrac{\sqrt{3}}{2}$.`,
      R`Sin giữ dấu, cos thì không. $-\dfrac{1}{2}$ là $\cos 120^\circ$, không phải $\cos 150^\circ$.`,
    ],
    stepsEn: [
      R`$\cos(180^\circ - \alpha) = -\cos\alpha$.`,
      R`$\cos 150^\circ = -\cos 30^\circ = -\dfrac{\sqrt{3}}{2}$.`,
      R`Sine keeps its sign; cosine does not. $-\dfrac{1}{2}$ is $\cos 120^\circ$, not $\cos 150^\circ$.`,
    ],
  },
  {
    id: "trig-max",
    prompt: R`Giá trị lớn nhất của $\sin\alpha + \cos\alpha$ là bao nhiêu?`,
    promptEn: R`What is the maximum of $\sin\alpha + \cos\alpha$?`,
    choices: [R`$\sqrt{2}$`, R`$2$`, R`$1$`, R`$\sqrt{3}$`],
    choicesEn: [R`$\sqrt{2}$`, R`$2$`, R`$1$`, R`$\sqrt{3}$`],
    answer: 0,
    hint: "Viết tổng thành √2 sin(α + 45°). Sin không vượt 1.",
    hintEn: "Rewrite the sum as √2 sin(α + 45°). Sine never exceeds 1.",
    steps: [
      R`$\sin\alpha + \cos\alpha = \sqrt{2}\,\sin(\alpha + 45^\circ)$.`,
      R`$\sin$ lớn nhất bằng $1$, nên tổng lớn nhất bằng $\sqrt{2}$, đạt tại $\alpha = 45^\circ$.`,
      R`Không phải $2$: $\sin$ và $\cos$ không đồng thời bằng $1$. Tại $45^\circ$ mỗi cái bằng $\dfrac{\sqrt{2}}{2}$, cộng lại đúng $\sqrt{2}$.`,
    ],
    stepsEn: [
      R`$\sin\alpha + \cos\alpha = \sqrt{2}\,\sin(\alpha + 45^\circ)$.`,
      R`The maximum of sine is $1$, so the maximum of the sum is $\sqrt{2}$, at $\alpha = 45^\circ$.`,
      R`It is not $2$: sine and cosine are never $1$ at the same time. At $45^\circ$ each equals $\dfrac{\sqrt{2}}{2}$, and they add to $\sqrt{2}$.`,
    ],
  },
  {
    id: "trig-tree",
    prompt: "Đứng cách gốc cây 20 m, góc ngẩng 30°, mắt cách đất 1,5 m. Cây cao bao nhiêu?",
    promptEn: "You stand 20 m from a tree, the angle of elevation is 30°, and your eye is 1.5 m above the ground. How tall is the tree?",
    choices: [
      R`$\dfrac{20\sqrt{3}}{3} + 1{,}5\text{ m}$`,
      R`$20\sqrt{3} + 1{,}5\text{ m}$`,
      R`$11{,}5\text{ m}$`,
      R`$\dfrac{20\sqrt{3}}{3}\text{ m}$`,
    ],
    choicesEn: [
      R`$\dfrac{20\sqrt{3}}{3} + 1.5\text{ m}$`,
      R`$20\sqrt{3} + 1.5\text{ m}$`,
      R`$11.5\text{ m}$`,
      R`$\dfrac{20\sqrt{3}}{3}\text{ m}$`,
    ],
    answer: 0,
    hint: "Tan = đối / kề. Cạnh kề là 20 m trên mặt đất. Nhớ cộng chiều cao mắt.",
    hintEn: "Tan = opposite / adjacent. The adjacent side is the 20 m on the ground. Add the eye height.",
    steps: [
      R`Tam giác vuông có cạnh kề $20$ m và góc $30^\circ$. Phần cây cao hơn mắt là cạnh đối.`,
      R`$\tan 30^\circ = \dfrac{\sqrt{3}}{3}$, nên phần trên mắt là $20\cdot\dfrac{\sqrt{3}}{3} = \dfrac{20\sqrt{3}}{3}$ m, khoảng $11{,}55$ m.`,
      R`Cộng mắt $1{,}5$ m. Dùng sin thì coi $20$ m là cạnh huyền và chỉ được $10 + 1{,}5 = 11{,}5$ m. Quên mắt thì thiếu $1{,}5$ m. $20\sqrt{3}$ là dùng nhầm $\tan 60^\circ$.`,
    ],
    stepsEn: [
      R`The right triangle has adjacent side $20$ m and angle $30^\circ$. The tree above eye level is the opposite side.`,
      R`$\tan 30^\circ = \dfrac{\sqrt{3}}{3}$, so the part above the eye is $20\cdot\dfrac{\sqrt{3}}{3} = \dfrac{20\sqrt{3}}{3}$ m, about $11.55$ m.`,
      R`Add the eye height $1.5$ m. Using sine treats $20$ m as the hypotenuse and gives only $10 + 1.5 = 11.5$ m. Dropping the eye misses $1.5$ m. $20\sqrt{3}$ uses $\tan 60^\circ$ by mistake.`,
    ],
  },
  {
    id: "trig-id",
    prompt: R`$\sin^2\alpha + \cos^2\alpha$ bằng bao nhiêu?`,
    promptEn: R`What is $\sin^2\alpha + \cos^2\alpha$?`,
    choices: [R`$1$`, R`$\sin 2\alpha$`, R`$0$`, R`$2$`],
    choicesEn: [R`$1$`, R`$\sin 2\alpha$`, R`$0$`, R`$2$`],
    answer: 0,
    hint: "Điểm (cos α; sin α) nằm trên đường tròn bán kính 1.",
    hintEn: "The point (cos α, sin α) lies on the circle of radius 1.",
    steps: [
      R`Điểm $(\cos\alpha;\ \sin\alpha)$ cách gốc đúng $1$.`,
      R`Theo Pythagore, $\cos^2\alpha + \sin^2\alpha = 1$ với mọi $\alpha$.`,
      R`$\sin 2\alpha = 2\sin\alpha\cos\alpha$ là một đồng nhất thức khác, không phải tổng bình phương.`,
    ],
    stepsEn: [
      R`The point $(\cos\alpha, \sin\alpha)$ is exactly $1$ from the origin.`,
      R`By Pythagoras, $\cos^2\alpha + \sin^2\alpha = 1$ for every $\alpha$.`,
      R`$\sin 2\alpha = 2\sin\alpha\cos\alpha$ is a different identity, not the sum of squares.`,
    ],
  },
  {
    id: "trig-point",
    prompt: R`Điểm ứng với $90^\circ$ trên đường tròn đơn vị là điểm nào?`,
    promptEn: R`Which point on the unit circle corresponds to $90^\circ$?`,
    choices: [R`$(0;\ 1)$`, R`$(1;\ 0)$`, R`$(0;\ -1)$`, R`$(-1;\ 0)$`],
    choicesEn: [R`$(0, 1)$`, R`$(1, 0)$`, R`$(0, -1)$`, R`$(-1, 0)$`],
    answer: 0,
    hint: "Hoành độ là cos, tung độ là sin.",
    hintEn: "The x-coordinate is cos, the y-coordinate is sin.",
    steps: [
      R`Trên đường tròn đơn vị, tọa độ là $(\cos\alpha;\ \sin\alpha)$.`,
      R`$\cos 90^\circ = 0$ và $\sin 90^\circ = 1$.`,
      R`Điểm là $(0;\ 1)$. $(1;\ 0)$ là góc $0^\circ$, $(0;\ -1)$ là $270^\circ$, $(-1;\ 0)$ là $180^\circ$.`,
    ],
    stepsEn: [
      R`On the unit circle the coordinates are $(\cos\alpha, \sin\alpha)$.`,
      R`$\cos 90^\circ = 0$ and $\sin 90^\circ = 1$.`,
      R`The point is $(0, 1)$. $(1, 0)$ is $0^\circ$, $(0, -1)$ is $270^\circ$, and $(-1, 0)$ is $180^\circ$.`,
    ],
  },
];

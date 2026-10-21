import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const vectorLesson: Lesson = {
  concept: R`Vectơ $u = (2;\ 1;\ 2)$ có độ dài $\sqrt{4+1+4} = 3$, không phải $5$ và không phải $\sqrt{5}$. Với $v = (1;\ -1;\ 2)$, tích vô hướng $u \cdot v = 5$ và tích có hướng $u \times v = (4;\ -2;\ -3)$. Hai vectơ $(1;\ 2;\ -1)$ và $(2;\ -1;\ 0)$ có tích vô hướng $0$, nên chúng vuông góc: công cũng bằng $0$ khi lực vuông góc với quãng đường. Tổng $(1;\ 2;\ 3) + (2;\ -1;\ 1) = (3;\ 1;\ 4)$. Định thức của hai cột $(2;\ 1)$ và $(1;\ -1)$ là $ad - bc = -3$. Hệ $2x + y = 5$, $x - y = 1$ có đúng một nghiệm $x = 2$, $y = 1$ vì định thức hệ số khác $0$. Và $\vec i \times \vec j = (0;\ 0;\ 1)$.`,
  conceptEn: R`The vector $u = (2;\ 1;\ 2)$ has length $\sqrt{4+1+4} = 3$, not $5$ and not $\sqrt{5}$. With $v = (1;\ -1;\ 2)$, the dot product is $u \cdot v = 5$ and the cross product is $u \times v = (4;\ -2;\ -3)$. The vectors $(1;\ 2;\ -1)$ and $(2;\ -1;\ 0)$ have dot product $0$, so they are perpendicular: work is also $0$ when the force is perpendicular to the displacement. The sum $(1;\ 2;\ 3) + (2;\ -1;\ 1) = (3;\ 1;\ 4)$. The determinant of the columns $(2;\ 1)$ and $(1;\ -1)$ is $ad - bc = -3$. The system $2x + y = 5$, $x - y = 1$ has the single solution $x = 2$, $y = 1$ because the coefficient determinant is not $0$. And $\vec i \times \vec j = (0;\ 0;\ 1)$.`,
};

export const vectorQuestions: Question[] = [
  {
    id: "vec-len",
    prompt: R`Độ dài của vectơ $(2;\ 1;\ 2)$ bằng bao nhiêu?`,
    promptEn: R`What is the length of the vector $(2;\ 1;\ 2)$?`,
    choices: [R`$3$`, R`$5$`, R`$\sqrt{5}$`, R`$9$`],
    choicesEn: [R`$3$`, R`$5$`, R`$\sqrt{5}$`, R`$9$`],
    answer: 0,
    hint: "Lấy căn của tổng bình phương cả ba tọa độ. Đừng cộng các tọa độ, và đừng bỏ tọa độ thứ ba.",
    hintEn: "Take the square root of the sum of the squares of all three coordinates. Do not add the coordinates, and do not drop the third one.",
    steps: [
      R`$|u| = \sqrt{2^2 + 1^2 + 2^2}$.`,
      R`Đó là $\sqrt{9} = 3$.`,
      R`$5$ là tổng các tọa độ. $\sqrt{5}$ quên tọa độ thứ ba. $9$ là tổng bình phương, chưa lấy căn.`,
    ],
    stepsEn: [
      R`$|u| = \sqrt{2^2 + 1^2 + 2^2}$.`,
      R`That is $\sqrt{9} = 3$.`,
      R`$5$ is the sum of the coordinates. $\sqrt{5}$ drops the third coordinate. $9$ is the sum of squares, before the square root.`,
    ],
  },
  {
    id: "vec-dot",
    prompt: R`Tích vô hướng của $(1;\ 2;\ -1)$ và $(2;\ -1;\ 0)$ bằng bao nhiêu?`,
    promptEn: R`What is the dot product of $(1;\ 2;\ -1)$ and $(2;\ -1;\ 0)$?`,
    choices: [R`$0$`, R`$1$`, R`$3$`, R`$-1$`],
    choicesEn: [R`$0$`, R`$1$`, R`$3$`, R`$-1$`],
    answer: 0,
    hint: "Nhân từng cặp tọa độ rồi cộng. Kết quả bằng 0 nghĩa là hai vectơ vuông góc, kể cả khi tính công.",
    hintEn: "Multiply matching coordinates and add. A result of 0 means the vectors are perpendicular, including when the product is work.",
    steps: [
      R`$1 \cdot 2 + 2 \cdot (-1) + (-1) \cdot 0$.`,
      R`Đó là $2 - 2 + 0 = 0$. Hai vectơ vuông góc.`,
      R`$1$ và $-1$ là từng số hạng bị bỏ sót. $3$ là cộng trị tuyệt đối.`,
    ],
    stepsEn: [
      R`$1 \cdot 2 + 2 \cdot (-1) + (-1) \cdot 0$.`,
      R`That is $2 - 2 + 0 = 0$. The vectors are perpendicular.`,
      R`$1$ and $-1$ each drop a term. $3$ adds the absolute values.`,
    ],
  },
  {
    id: "vec-sum",
    prompt: R`$(1;\ 2;\ 3) + (2;\ -1;\ 1)$ bằng vectơ nào?`,
    promptEn: R`Which vector is $(1;\ 2;\ 3) + (2;\ -1;\ 1)$?`,
    choices: [R`$(3;\ 1;\ 4)$`, R`$(3;\ 1;\ 2)$`, R`$(3;\ 3;\ 4)$`, R`$(1;\ -1;\ 1)$`],
    choicesEn: [R`$(3;\ 1;\ 4)$`, R`$(3;\ 1;\ 2)$`, R`$(3;\ 3;\ 4)$`, R`$(1;\ -1;\ 1)$`],
    answer: 0,
    hint: "Cộng từng tọa độ. Tọa độ thứ hai là 2 + (−1), không phải 2 + 1.",
    hintEn: "Add coordinate by coordinate. The second coordinate is 2 + (−1), not 2 + 1.",
    steps: [
      "Cộng lần lượt hoành độ, tung độ và cao độ.",
      R`$(1+2;\ 2+(-1);\ 3+1) = (3;\ 1;\ 4)$.`,
      R`$(3;\ 1;\ 2)$ lấy nhầm cao độ. $(3;\ 3;\ 4)$ đổi dấu ở tọa độ thứ hai. $(1;\ -1;\ 1)$ là hiệu, không phải tổng.`,
    ],
    stepsEn: [
      "Add the first, second and third coordinates in turn.",
      R`$(1+2;\ 2+(-1);\ 3+1) = (3;\ 1;\ 4)$.`,
      R`$(3;\ 1;\ 2)$ uses the wrong third coordinate. $(3;\ 3;\ 4)$ flips the sign of the second. $(1;\ -1;\ 1)$ is a difference, not the sum.`,
    ],
  },
  {
    id: "vec-det",
    prompt: R`Định thức $ad - bc$ với $a = 2$, $b = 1$, $c = 1$, $d = -1$ bằng bao nhiêu?`,
    promptEn: R`What is the determinant $ad - bc$ for $a = 2$, $b = 1$, $c = 1$, $d = -1$?`,
    choices: [R`$-3$`, R`$-1$`, R`$1$`, R`$3$`],
    choicesEn: [R`$-3$`, R`$-1$`, R`$1$`, R`$3$`],
    answer: 0,
    hint: "Lấy a nhân d, rồi trừ b nhân c. Đừng đảo thứ tự trừ.",
    hintEn: "Multiply a by d, then subtract b times c. Do not reverse the subtraction.",
    steps: [
      R`$ad - bc = 2 \cdot (-1) - 1 \cdot 1$.`,
      R`Đó là $-2 - 1 = -3$.`,
      R`$-1$ bỏ một số hạng. $1$ đổi dấu một phần. $3$ là $bc - ad$, tức đảo phép trừ.`,
    ],
    stepsEn: [
      R`$ad - bc = 2 \cdot (-1) - 1 \cdot 1$.`,
      R`That is $-2 - 1 = -3$.`,
      R`$-1$ drops a term. $1$ flips part of the sign. $3$ is $bc - ad$, the subtraction reversed.`,
    ],
  },
  {
    id: "vec-sys",
    prompt: R`Hệ $2x + y = 5$, $x - y = 1$ có nghiệm nào?`,
    promptEn: R`Which solution does the system $2x + y = 5$, $x - y = 1$ have?`,
    choices: [R`$x = 2$, $y = 1$`, R`$x = 1$, $y = 2$`, R`$x = 3$, $y = -1$`, "Vô số nghiệm"],
    choicesEn: [R`$x = 2$, $y = 1$`, R`$x = 1$, $y = 2$`, R`$x = 3$, $y = -1$`, "Infinitely many solutions"],
    answer: 0,
    hint: "Định thức hệ số khác 0, nên có đúng một nghiệm. Cộng hai phương trình để khử y.",
    hintEn: "The coefficient determinant is not 0, so there is exactly one solution. Add the equations to remove y.",
    steps: [
      R`Cộng hai phương trình: $3x = 6$, nên $x = 2$.`,
      R`Thế vào $x - y = 1$: $2 - y = 1$, nên $y = 1$.`,
      R`$x = 1$, $y = 2$ đảo hai ẩn. $x = 3$, $y = -1$ không thỏa $x - y = 1$. Vô số nghiệm chỉ khi định thức bằng 0, ở đây định thức là $-3$.`,
    ],
    stepsEn: [
      R`Add the equations: $3x = 6$, so $x = 2$.`,
      R`Substitute into $x - y = 1$: $2 - y = 1$, so $y = 1$.`,
      R`$x = 1$, $y = 2$ swaps the unknowns. $x = 3$, $y = -1$ fails $x - y = 1$. Infinitely many solutions need a zero determinant; here it is $-3$.`,
    ],
  },
  {
    id: "vec-cross",
    prompt: R`$\vec i \times \vec j$ bằng vectơ nào?`,
    promptEn: R`Which vector is $\vec i \times \vec j$?`,
    choices: [R`$(0;\ 0;\ 1)$`, R`$(0;\ 0;\ -1)$`, R`$(1;\ 0;\ 0)$`, R`$(0;\ 1;\ 0)$`],
    choicesEn: [R`$(0;\ 0;\ 1)$`, R`$(0;\ 0;\ -1)$`, R`$(1;\ 0;\ 0)$`, R`$(0;\ 1;\ 0)$`],
    answer: 0,
    hint: "Bộ ba thuận chiều: i, j, rồi k. Đảo thứ tự thì đổi dấu.",
    hintEn: "The right-handed order is i, then j, then k. Swapping the order flips the sign.",
    steps: [
      R`$\vec i = (1;\ 0;\ 0)$ và $\vec j = (0;\ 1;\ 0)$.`,
      R`Tích có hướng là $(0;\ 0;\ 1)$, tức $\vec k$.`,
      R`$(0;\ 0;\ -1)$ là $\vec j \times \vec i$. Hai vectơ còn lại chính là $\vec i$ và $\vec j$, chưa lấy tích.`,
    ],
    stepsEn: [
      R`$\vec i = (1;\ 0;\ 0)$ and $\vec j = (0;\ 1;\ 0)$.`,
      R`The cross product is $(0;\ 0;\ 1)$, which is $\vec k$.`,
      R`$(0;\ 0;\ -1)$ is $\vec j \times \vec i$. The other two vectors are $\vec i$ and $\vec j$ themselves, before the product.`,
    ],
  },
];

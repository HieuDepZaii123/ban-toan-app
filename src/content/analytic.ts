import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const analyticLesson: Lesson = {
  concept: R`Đường thẳng $x + y - 2 = 0$ có pháp tuyến $(1;\ 1)$ và một vectơ chỉ phương $(1;\ -1)$. Khoảng cách từ $P(3;\ 1)$ tới đường là $|3+1-2| / \sqrt{2} = \sqrt{2}$, không phải tử số $2$. Chân đường vuông góc là $(2;\ 0)$, không phải $(1;\ 1)$ hay $(2;\ 2)$ dù hai điểm ấy cũng nằm trên đường. Mặt phẳng $x + y + z - 6 = 0$ cách điểm $(1;\ 1;\ 1)$ một đoạn $\sqrt{3}$, và chân đường vuông góc là $(2;\ 2;\ 2)$. Đường tròn tâm $O$ bán kính $5$: điểm $(3;\ 4)$ nằm trên đường tròn vì $9 + 16 = 25$, còn $(6;\ 0)$ nằm ngoài vì khoảng cách tới tâm là $6 > 5$.`,
  conceptEn: R`The line $x + y - 2 = 0$ has normal $(1;\ 1)$ and a direction vector $(1;\ -1)$. The distance from $P(3;\ 1)$ to the line is $|3+1-2| / \sqrt{2} = \sqrt{2}$, not the numerator $2$. The foot of the perpendicular is $(2;\ 0)$, not $(1;\ 1)$ or $(2;\ 2)$, even though those two points also lie on the line. The plane $x + y + z - 6 = 0$ is $\sqrt{3}$ away from $(1;\ 1;\ 1)$, and the foot is $(2;\ 2;\ 2)$. For the circle centred at $O$ with radius $5$, the point $(3;\ 4)$ lies on the circle because $9 + 16 = 25$, while $(6;\ 0)$ lies outside because its distance from the centre is $6 > 5$.`,
};

export const analyticQuestions: Question[] = [
  {
    id: "ana-dist",
    prompt: R`Khoảng cách từ điểm $(3;\ 1)$ tới đường thẳng $x + y - 2 = 0$ bằng bao nhiêu?`,
    promptEn: R`What is the distance from $(3;\ 1)$ to the line $x + y - 2 = 0$?`,
    choices: [R`$\sqrt{2}$`, R`$2$`, R`$0$`, R`$1$`],
    choicesEn: [R`$\sqrt{2}$`, R`$2$`, R`$0$`, R`$1$`],
    answer: 0,
    hint: "Lấy trị tuyệt đối của tử, rồi chia cho độ dài pháp tuyến. Tử số chưa phải khoảng cách.",
    hintEn: "Take the absolute value of the numerator, then divide by the length of the normal. The numerator is not yet the distance.",
    steps: [
      R`Khoảng cách là $|3 + 1 - 2| / \sqrt{1^2 + 1^2}$.`,
      R`Tử bằng $2$, mẫu bằng $\sqrt{2}$, nên kết quả là $\sqrt{2}$.`,
      R`$2$ dừng ở tử số. $0$ là khoảng cách khi điểm đã nằm trên đường. $1$ là từng hệ số của pháp tuyến.`,
    ],
    stepsEn: [
      R`The distance is $|3 + 1 - 2| / \sqrt{1^2 + 1^2}$.`,
      R`The numerator is $2$, the denominator is $\sqrt{2}$, so the result is $\sqrt{2}$.`,
      R`$2$ stops at the numerator. $0$ would mean the point already lies on the line. $1$ is one coefficient of the normal.`,
    ],
  },
  {
    id: "ana-foot",
    prompt: R`Chân đường vuông góc hạ từ $(3;\ 1)$ xuống đường $x + y - 2 = 0$ là điểm nào?`,
    promptEn: R`Which point is the foot of the perpendicular from $(3;\ 1)$ to the line $x + y - 2 = 0$?`,
    choices: [R`$(2;\ 0)$`, R`$(1;\ 1)$`, R`$(2;\ 2)$`, R`$(3;\ 1)$`],
    choicesEn: [R`$(2;\ 0)$`, R`$(1;\ 1)$`, R`$(2;\ 2)$`, R`$(3;\ 1)$`],
    answer: 0,
    hint: "Chân phải nằm trên đường, và đoạn nối với điểm đã cho phải song song với pháp tuyến (1; 1).",
    hintEn: "The foot has to lie on the line, and the segment back to the given point has to be parallel to the normal (1; 1).",
    steps: [
      R`Đặt $t = (3 + 1 - 2) / (1^2 + 1^2) = 1$.`,
      R`Chân là $(3;\ 1) - t(1;\ 1) = (2;\ 0)$. Điểm này thỏa $2 + 0 - 2 = 0$.`,
      R`$(1;\ 1)$ và $(2;\ 2)$ có nằm trên đường, nhưng đoạn nối với $(3;\ 1)$ không song song với $(1;\ 1)$. $(3;\ 1)$ là điểm ban đầu, không nằm trên đường.`,
    ],
    stepsEn: [
      R`Set $t = (3 + 1 - 2) / (1^2 + 1^2) = 1$.`,
      R`The foot is $(3;\ 1) - t(1;\ 1) = (2;\ 0)$. It satisfies $2 + 0 - 2 = 0$.`,
      R`$(1;\ 1)$ and $(2;\ 2)$ do lie on the line, but the segment to $(3;\ 1)$ is not parallel to $(1;\ 1)$. $(3;\ 1)$ is the original point, and it is not on the line.`,
    ],
  },
  {
    id: "ana-plane",
    prompt: R`Khoảng cách từ $(1;\ 1;\ 1)$ tới mặt phẳng $x + y + z - 6 = 0$ bằng bao nhiêu?`,
    promptEn: R`What is the distance from $(1;\ 1;\ 1)$ to the plane $x + y + z - 6 = 0$?`,
    choices: [R`$\sqrt{3}$`, R`$3$`, R`$1$`, R`$2\sqrt{3}$`],
    choicesEn: [R`$\sqrt{3}$`, R`$3$`, R`$1$`, R`$2\sqrt{3}$`],
    answer: 0,
    hint: "Tử là |1 + 1 + 1 − 6|. Mẫu là độ dài của (1; 1; 1), tức √3.",
    hintEn: "The numerator is |1 + 1 + 1 − 6|. The denominator is the length of (1; 1; 1), which is √3.",
    steps: [
      R`Khoảng cách là $|1+1+1-6| / \sqrt{1^2+1^2+1^2}$.`,
      R`Tử bằng $3$, mẫu bằng $\sqrt{3}$, nên kết quả là $\sqrt{3}$.`,
      R`$3$ dừng ở tử số. $1$ là một hệ số. $2\sqrt{3}$ nhân thêm $2$ vào kết quả đúng.`,
    ],
    stepsEn: [
      R`The distance is $|1+1+1-6| / \sqrt{1^2+1^2+1^2}$.`,
      R`The numerator is $3$ and the denominator is $\sqrt{3}$, so the result is $\sqrt{3}$.`,
      R`$3$ stops at the numerator. $1$ is a single coefficient. $2\sqrt{3}$ multiplies the right result by $2$.`,
    ],
  },
  {
    id: "ana-dir",
    prompt: R`Một vectơ chỉ phương của đường thẳng $x + y - 2 = 0$ là vectơ nào?`,
    promptEn: R`Which vector is a direction vector of the line $x + y - 2 = 0$?`,
    choices: [R`$(1;\ -1)$`, R`$(1;\ 1)$`, R`$(2;\ 0)$`, R`$(0;\ 2)$`],
    choicesEn: [R`$(1;\ -1)$`, R`$(1;\ 1)$`, R`$(2;\ 0)$`, R`$(0;\ 2)$`],
    answer: 0,
    hint: "Pháp tuyến là (1; 1), vuông góc với đường. Chỉ phương phải vuông góc với pháp tuyến, không trùng pháp tuyến.",
    hintEn: "The normal is (1; 1), perpendicular to the line. A direction vector is perpendicular to the normal, not equal to the normal.",
    steps: [
      R`Với $ax + by + c = 0$, một chỉ phương là $(b;\ -a)$.`,
      R`Ở đây $(b;\ -a) = (1;\ -1)$. Tích với pháp tuyến $(1;\ 1)$ bằng $0$.`,
      R`$(1;\ 1)$ chính là pháp tuyến. $(2;\ 0)$ và $(0;\ 2)$ không vuông góc với pháp tuyến ấy.`,
    ],
    stepsEn: [
      R`For $ax + by + c = 0$, one direction vector is $(b;\ -a)$.`,
      R`Here $(b;\ -a) = (1;\ -1)$. Its dot product with the normal $(1;\ 1)$ is $0$.`,
      R`$(1;\ 1)$ is the normal itself. $(2;\ 0)$ and $(0;\ 2)$ are not perpendicular to that normal.`,
    ],
  },
  {
    id: "ana-circle",
    prompt: R`Điểm $(6;\ 0)$ nằm thế nào so với đường tròn tâm $O$, bán kính $5$?`,
    promptEn: R`Where does the point $(6;\ 0)$ sit relative to the circle centred at $O$ with radius $5$?`,
    choices: ["Nằm ngoài", "Nằm trên", "Nằm trong", "Là tâm"],
    choicesEn: ["Outside", "On the circle", "Inside", "It is the centre"],
    answer: 0,
    hint: "So khoảng cách tới tâm với bán kính. 6 lớn hơn 5 thì điểm ở ngoài. (3; 4) mới nằm trên đường tròn này.",
    hintEn: "Compare the distance to the centre with the radius. 6 is greater than 5, so the point is outside. (3; 4) is the point that lies on this circle.",
    steps: [
      R`Khoảng cách từ $(6;\ 0)$ tới $O$ là $6$.`,
      "6 > 5, nên điểm nằm ngoài đường tròn.",
      R`Nằm trên khi khoảng cách bằng $5$, như $(3;\ 4)$ vì $3^2 + 4^2 = 25$. Nằm trong khi nhỏ hơn $5$. Tâm là $(0;\ 0)$.`,
    ],
    stepsEn: [
      R`The distance from $(6;\ 0)$ to $O$ is $6$.`,
      "6 > 5, so the point lies outside the circle.",
      R`On the circle means the distance equals $5$, as with $(3;\ 4)$ because $3^2 + 4^2 = 25$. Inside means smaller than $5$. The centre is $(0;\ 0)$.`,
    ],
  },
  {
    id: "ana-on",
    prompt: R`Điểm $(3;\ 4)$ nằm thế nào so với đường tròn tâm $O$, bán kính $5$?`,
    promptEn: R`Where does the point $(3;\ 4)$ sit relative to the circle centred at $O$ with radius $5$?`,
    choices: ["Nằm trên", "Nằm ngoài", "Nằm trong", "Là tâm"],
    choicesEn: ["On the circle", "Outside", "Inside", "It is the centre"],
    answer: 0,
    hint: "Tính 3² + 4² rồi so với 25. Bằng nhau thì điểm nằm trên đường tròn.",
    hintEn: "Compute 3² + 4² and compare with 25. Equal means the point is on the circle.",
    steps: [
      R`$3^2 + 4^2 = 9 + 16 = 25$, và $5^2 = 25$.`,
      "Hai bên bằng nhau, nên điểm nằm trên đường tròn.",
      R`Nằm ngoài là trường hợp $(6;\ 0)$, vì $36 > 25$. Nằm trong khi tổng bình phương nhỏ hơn $25$. Tâm là $(0;\ 0)$.`,
    ],
    stepsEn: [
      R`$3^2 + 4^2 = 9 + 16 = 25$, and $5^2 = 25$.`,
      "The two sides agree, so the point lies on the circle.",
      R`Outside is the case of $(6;\ 0)$, because $36 > 25$. Inside means the sum of squares is less than $25$. The centre is $(0;\ 0)$.`,
    ],
  },
];

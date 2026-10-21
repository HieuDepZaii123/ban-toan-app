import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const triangleLesson: Lesson = {
  concept: R`Diện tích tam giác là nửa đáy nhân chiều cao. Đáy $6$, cao $4$ thì diện tích $12$, không phải $24$. Tam giác vuông cạnh $3$ và $4$ có diện tích $6$; cạnh huyền $5$ không phải diện tích. Hộp chữ nhật $3 \times 4 \times 5$ có thể tích $60$ và diện tích đáy $12$: thể tích là tích ba cạnh, không phải diện tích đáy. Chóp đáy vuông cạnh $6$, cao $4$, có đáy $36$ và thể tích $\dfrac{1}{3} \cdot 36 \cdot 4 = 48$. Tứ diện đều cạnh $a$ có cả sáu cạnh bằng $a$, thể tích $a^3\sqrt{2}/12$; với $a = 6$ thì thể tích là $18\sqrt{2}$, không phải diện tích một mặt $9\sqrt{3}$. Hai hình đồng dạng tỉ số $2$ thì tỉ số diện tích là $4$, không phải $2$ và không phải bằng nhau.`,
  conceptEn: R`A triangle’s area is half the base times the height. Base $6$ and height $4$ give area $12$, not $24$. A right triangle with legs $3$ and $4$ has area $6$; the hypotenuse $5$ is not the area. A $3 \times 4 \times 5$ box has volume $60$ and base area $12$: the volume is the product of the three edges, not the base area. A square pyramid of side $6$ and height $4$ has base $36$ and volume $\dfrac{1}{3} \cdot 36 \cdot 4 = 48$. A regular tetrahedron of edge $a$ has all six edges equal to $a$, and volume $a^3\sqrt{2}/12$; for $a = 6$ the volume is $18\sqrt{2}$, not the face area $9\sqrt{3}$. Similar figures with ratio $2$ have area ratio $4$, not $2$, and they are not congruent.`,
};

export const triangleQuestions: Question[] = [
  {
    id: "shp-tri",
    prompt: "Tam giác có đáy 6 và chiều cao 4. Diện tích bằng bao nhiêu?",
    promptEn: "A triangle has base 6 and height 4. What is its area?",
    choices: ["12", "24", "10", "8"],
    choicesEn: ["12", "24", "10", "8"],
    answer: 0,
    hint: "Lấy một nửa tích đáy với chiều cao. Đừng quên chia đôi.",
    hintEn: "Take half the product of the base and the height. Do not forget the half.",
    steps: [
      "Diện tích là (đáy × chiều cao) / 2.",
      "(6 × 4) / 2 = 12.",
      "24 là tích, chưa chia đôi. 10 là 6 + 4. 8 là 6 + 4 − 2, không phải công thức.",
    ],
    stepsEn: [
      "The area is (base × height) / 2.",
      "(6 × 4) / 2 = 12.",
      "24 is the product, before dividing by 2. 10 is 6 + 4. 8 is 6 + 4 − 2, which is not the formula.",
    ],
  },
  {
    id: "shp-right",
    prompt: "Tam giác vuông có hai cạnh góc vuông bằng 3 và 4. Diện tích bằng bao nhiêu?",
    promptEn: "A right triangle has legs 3 and 4. What is its area?",
    choices: ["6", "12", "5", "7"],
    choicesEn: ["6", "12", "5", "7"],
    answer: 0,
    hint: "Hai cạnh góc vuông là đáy và chiều cao. Diện tích vẫn là một nửa tích, không phải cạnh huyền.",
    hintEn: "The legs are a base and a height. The area is still half the product, not the hypotenuse.",
    steps: [
      "Diện tích là (3 × 4) / 2.",
      "Đó là 6.",
      "12 quên chia đôi. 5 là cạnh huyền. 7 là 3 + 4.",
    ],
    stepsEn: [
      "The area is (3 × 4) / 2.",
      "That is 6.",
      "12 forgets the half. 5 is the hypotenuse. 7 is 3 + 4.",
    ],
  },
  {
    id: "shp-box",
    prompt: "Một hộp chữ nhật có ba cạnh 3, 4 và 5. Thể tích bằng bao nhiêu?",
    promptEn: "A rectangular box has edges 3, 4 and 5. What is its volume?",
    choices: ["60", "12", "24", "15"],
    choicesEn: ["60", "12", "24", "15"],
    answer: 0,
    hint: "Nhân cả ba cạnh. Diện tích đáy 3 × 4 mới là 12, chưa phải thể tích.",
    hintEn: "Multiply all three edges. The base area 3 × 4 is 12, which is not the volume.",
    steps: [
      "Thể tích là 3 × 4 × 5.",
      "Đó là 60. Diện tích đáy là 12, chiều cao là 5.",
      "12 là diện tích đáy. 24 là 3 × 4 × 2, đổi chiều cao. 15 là 3 × 5, bỏ một cạnh.",
    ],
    stepsEn: [
      "The volume is 3 × 4 × 5.",
      "That is 60. The base area is 12 and the height is 5.",
      "12 is the base area. 24 is 3 × 4 × 2, a different height. 15 is 3 × 5, dropping one edge.",
    ],
  },
  {
    id: "shp-pyr",
    prompt: "Chóp có đáy hình vuông cạnh 6 và chiều cao 4. Thể tích bằng bao nhiêu?",
    promptEn: "A pyramid has a square base of side 6 and height 4. What is its volume?",
    choices: ["48", "36", "144", "24"],
    choicesEn: ["48", "36", "144", "24"],
    answer: 0,
    hint: "Thể tích chóp là một phần ba đáy nhân chiều cao. Đáy bằng 36, chưa phải thể tích.",
    hintEn: "A pyramid’s volume is one third of the base area times the height. The base is 36, which is not the volume.",
    steps: [
      "Diện tích đáy là 6 × 6 = 36.",
      "Thể tích là (1/3) × 36 × 4 = 48.",
      "36 chỉ là đáy. 144 quên thừa số 1/3, tức 36 × 4. 24 là 6 × 4, bỏ diện tích đáy.",
    ],
    stepsEn: [
      "The base area is 6 × 6 = 36.",
      "The volume is (1/3) × 36 × 4 = 48.",
      "36 is only the base. 144 forgets the factor 1/3, that is 36 × 4. 24 is 6 × 4, skipping the base area.",
    ],
  },
  {
    id: "shp-tet",
    prompt: R`Tứ diện đều cạnh $6$ có thể tích bằng bao nhiêu?`,
    promptEn: R`What is the volume of a regular tetrahedron of edge $6$?`,
    choices: [R`$18\sqrt{2}$`, R`$9\sqrt{3}$`, R`$216$`, R`$36$`],
    choicesEn: [R`$18\sqrt{2}$`, R`$9\sqrt{3}$`, R`$216$`, R`$36$`],
    answer: 0,
    hint: "Sáu cạnh đều bằng a. Thể tích là a³√2 / 12, không phải diện tích một mặt.",
    hintEn: "All six edges equal a. The volume is a³√2 / 12, not the area of one face.",
    steps: [
      R`Với cạnh $a = 6$, thể tích là $a^3\sqrt{2}/12$.`,
      R`$6^3 = 216$, rồi $216\sqrt{2}/12 = 18\sqrt{2}$.`,
      R`$9\sqrt{3}$ là diện tích một mặt tam giác đều. $216$ là $a^3$, chưa chia và chưa nhân $\sqrt{2}$. $36$ là $a^2$.`,
    ],
    stepsEn: [
      R`For edge $a = 6$, the volume is $a^3\sqrt{2}/12$.`,
      R`$6^3 = 216$, then $216\sqrt{2}/12 = 18\sqrt{2}$.`,
      R`$9\sqrt{3}$ is the area of one equilateral face. $216$ is $a^3$, before dividing and before multiplying by $\sqrt{2}$. $36$ is $a^2$.`,
    ],
  },
  {
    id: "shp-sim",
    prompt: "Hai hình đồng dạng có tỉ số cạnh bằng 2. Tỉ số diện tích bằng bao nhiêu?",
    promptEn: "Two similar figures have side ratio 2. What is the area ratio?",
    choices: ["4", "2", "8", "1"],
    choicesEn: ["4", "2", "8", "1"],
    answer: 0,
    hint: "Diện tích nhân với bình phương tỉ số cạnh. Tỉ số 2 chưa phải tỉ số diện tích, và đồng dạng chưa phải bằng nhau.",
    hintEn: "Area scales with the square of the side ratio. The ratio 2 is not yet the area ratio, and similarity is not congruence.",
    steps: [
      "Tỉ số diện tích bằng bình phương tỉ số cạnh.",
      "2² = 4.",
      "2 là tỉ số cạnh. 8 là tỉ số thể tích, tức 2³. 1 là trường hợp bằng nhau.",
    ],
    stepsEn: [
      "The area ratio is the square of the side ratio.",
      "2² = 4.",
      "2 is the side ratio. 8 is the volume ratio, which is 2³. 1 would mean the figures are congruent.",
    ],
  },
];

import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const ineqLesson: Lesson = {
  concept: R`Với $a, b > 0$, $(a+b)/2 \ge \sqrt{ab}$, và dấu bằng khi $a = b$. Lấy $a = 4$, $b = 9$: trung bình cộng là $6{,}5$, trung bình nhân là $6$. Hai số dương có tổng $10$, tích lớn nhất là $25$ khi mỗi số bằng $5$. Cauchy–Schwarz: $(a^2+b^2)(c^2+d^2) \ge (ac+bd)^2$. Cặp $(1;\ 2)$ và $(3;\ 4)$ cho $125 \ge 121$. Dấu bằng khi hai cặp tỉ lệ, như $(1;\ 2)$ và $(3;\ 6)$, cả hai vế bằng $225$. Xưởng làm $x$ bàn và $y$ ghế, $x \ge 0$, $y \ge 0$, $x+y \le 10$, $2x+y \le 16$, lợi nhuận $P = 5x+3y$. Bốn đỉnh cho $0$, $40$, $42$ và $30$. Lớn nhất là $42$ tại $(6;\ 4)$. Điểm $(9;\ 2)$ nằm ngoài vì $x+y = 11$. Chia cho số âm thì đảo chiều: $-2x \le 4$ cho $x \ge -2$.`,
  conceptEn: R`For $a, b > 0$, $(a+b)/2 \ge \sqrt{ab}$, with equality when $a = b$. Take $a = 4$, $b = 9$: the arithmetic mean is $6{,}5$ and the geometric mean is $6$. Two positive numbers that sum to $10$ have largest product $25$, when each number is $5$. Cauchy–Schwarz: $(a^2+b^2)(c^2+d^2) \ge (ac+bd)^2$. The pairs $(1;\ 2)$ and $(3;\ 4)$ give $125 \ge 121$. Equality holds when the pairs are proportional, as with $(1;\ 2)$ and $(3;\ 6)$, both sides $225$. A workshop makes $x$ desks and $y$ chairs, $x \ge 0$, $y \ge 0$, $x+y \le 10$, $2x+y \le 16$, profit $P = 5x+3y$. The four vertices give $0$, $40$, $42$ and $30$. The maximum is $42$ at $(6;\ 4)$. The point $(9;\ 2)$ is outside because $x+y = 11$. Dividing by a negative flips the sign: $-2x \le 4$ gives $x \ge -2$.`,
};

export const ineqQuestions: Question[] = [
  {
    id: "ineq-am",
    prompt: "Với a = 4 và b = 9, trung bình cộng và trung bình nhân lần lượt là bao nhiêu?",
    promptEn: "For a = 4 and b = 9, what are the arithmetic and geometric means?",
    choices: ["6,5 và 6", "6 và 6,5", "13 và 36", "6,5 và 36"],
    choicesEn: ["6.5 and 6", "6 and 6.5", "13 and 36", "6.5 and 36"],
    answer: 0,
    hint: "Cộng rồi chia đôi. Nhân rồi lấy căn. Đừng đảo hai số, và đừng lấy tổng với tích.",
    hintEn: "Add and halve. Multiply and take the square root. Do not swap the two, and do not report the sum and the product.",
    steps: [
      "Trung bình cộng là (4 + 9) / 2 = 6,5.",
      "Trung bình nhân là √(4 × 9) = √36 = 6.",
      "6 và 6,5 đảo hai kết quả. 13 và 36 là tổng với tích. 6,5 và 36 lấy trung bình cộng rồi lấy luôn tích.",
    ],
    stepsEn: [
      "The arithmetic mean is (4 + 9) / 2 = 6.5.",
      "The geometric mean is √(4 × 9) = √36 = 6.",
      "6 and 6.5 swaps the two results. 13 and 36 are the sum and the product. 6.5 and 36 keeps the arithmetic mean and then the product.",
    ],
  },
  {
    id: "ineq-equal",
    prompt: "AM–GM đạt dấu bằng khi nào, với hai số dương?",
    promptEn: "When does AM–GM become equality, for two positive numbers?",
    choices: ["Khi a = b", "Khi a + b = 1", "Khi a = 2b", "Khi cả hai âm"],
    choicesEn: ["When a = b", "When a + b = 1", "When a = 2b", "When both are negative"],
    answer: 0,
    hint: "Hai trung bình trùng nhau đúng lúc hai số bằng nhau. Số âm không được dùng.",
    hintEn: "The two means agree exactly when the numbers are equal. Negative numbers are not allowed.",
    steps: [
      "Với a, b > 0, (a + b) / 2 ≥ √(ab).",
      "Dấu bằng xảy ra khi và chỉ khi a = b.",
      "Tổng bằng 1, hay a = 2b, không phải điều kiện. Nếu có số âm thì bất đẳng thức không áp dụng.",
    ],
    stepsEn: [
      "For a, b > 0, (a + b) / 2 ≥ √(ab).",
      "Equality holds if and only if a = b.",
      "A sum of 1, or a = 2b, is not the condition. A negative number means the inequality does not apply.",
    ],
  },
  {
    id: "ineq-split",
    prompt: "Hai số dương có tổng bằng 10. Tích lớn nhất bằng bao nhiêu?",
    promptEn: "Two positive numbers add up to 10. What is the greatest product?",
    choices: ["25", "24", "16", "9"],
    choicesEn: ["25", "24", "16", "9"],
    answer: 0,
    hint: "Tích lớn nhất khi hai số bằng nhau, mỗi số bằng nửa tổng.",
    hintEn: "The product is largest when the two numbers are equal, each one half of the sum.",
    steps: [
      "Đặt hai số là t và 10 − t, với 0 < t < 10.",
      "Tích t(10 − t) lớn nhất khi t = 5, và giá trị đó là 25.",
      "24 có thể là 4 × 6. 16 là 4 × 4 nhưng tổng mới là 8. 9 là 1 × 9, nhỏ hơn hẳn.",
    ],
    stepsEn: [
      "Write the numbers as t and 10 − t, with 0 < t < 10.",
      "The product t(10 − t) is largest at t = 5, and that value is 25.",
      "24 could be 4 × 6. 16 is 4 × 4, but that sum is only 8. 9 is 1 × 9, much smaller.",
    ],
  },
  {
    id: "ineq-cauchy",
    prompt: R`Với hai cặp $(1;\ 2)$ và $(3;\ 4)$, vế trái và vế phải của Cauchy–Schwarz là cặp nào?`,
    promptEn: R`For the pairs $(1;\ 2)$ and $(3;\ 4)$, which pair is the left and right side of Cauchy–Schwarz?`,
    choices: [R`$125 \ge 121$`, R`$125 \le 121$`, R`$25 \ge 11$`, R`$5 \ge 7$`],
    choicesEn: [R`$125 \ge 121$`, R`$125 \le 121$`, R`$25 \ge 11$`, R`$5 \ge 7$`],
    answer: 0,
    hint: "Nhân hai tổng bình phương, rồi bình phương tổng các tích từng cặp. Đừng đảo chiều.",
    hintEn: "Multiply the two sums of squares, then square the sum of the paired products. Do not reverse the sign.",
    steps: [
      R`$(1^2+2^2)(3^2+4^2) = 5 \times 25 = 125$.`,
      R`$(1 \cdot 3 + 2 \cdot 4)^2 = 11^2 = 121$. Vậy $125 \ge 121$.`,
      R`$125 \le 121$ đảo chiều. $25 \ge 11$ quên bình phương và quên nhân. $5 \ge 7$ lấy căn của tổng bình phương rồi so với tích vô hướng.`,
    ],
    stepsEn: [
      R`$(1^2+2^2)(3^2+4^2) = 5 \times 25 = 125$.`,
      R`$(1 \cdot 3 + 2 \cdot 4)^2 = 11^2 = 121$. So $125 \ge 121$.`,
      R`$125 \le 121$ flips the sign. $25 \ge 11$ forgets the square and the product. $5 \ge 7$ compares square roots of sums of squares with the dot product.`,
    ],
  },
  {
    id: "ineq-lp",
    prompt: "Xưởng làm x bàn và y ghế, với x ≥ 0, y ≥ 0, x + y ≤ 10, 2x + y ≤ 16. Lợi nhuận P = 5x + 3y lớn nhất bằng bao nhiêu?",
    promptEn: "A workshop makes x desks and y chairs, with x ≥ 0, y ≥ 0, x + y ≤ 10, 2x + y ≤ 16. What is the greatest profit P = 5x + 3y?",
    choices: ["42 tại (6; 4)", "40 tại (8; 0)", "30 tại (0; 10)", "38 tại (6; 4)"],
    choicesEn: ["42 at (6; 4)", "40 at (8; 0)", "30 at (0; 10)", "38 at (6; 4)"],
    answer: 0,
    hint: "Tính P tại các đỉnh của miền. Điểm trong miền không phải chỗ lớn nhất.",
    hintEn: "Evaluate P at the vertices of the region. An interior point is not the maximum.",
    steps: [
      "Bốn đỉnh là (0; 0), (8; 0), (6; 4) và (0; 10).",
      "P cho lần lượt 0, 40, 42 và 30. Lớn nhất là 42 tại (6; 4).",
      "40 và 30 là hai đỉnh kia. 38 là 3 × 6 + 5 × 4, tức đảo hệ số của P.",
    ],
    stepsEn: [
      "The four vertices are (0; 0), (8; 0), (6; 4) and (0; 10).",
      "P gives 0, 40, 42 and 30. The greatest is 42 at (6; 4).",
      "40 and 30 are the other vertices. 38 is 3 × 6 + 5 × 4, which swaps the coefficients of P.",
    ],
  },
  {
    id: "ineq-flip",
    prompt: R`Bất đẳng thức $-2x \le 4$ có nghiệm nào?`,
    promptEn: R`Which set solves $-2x \le 4$?`,
    choices: [R`$x \ge -2$`, R`$x \le -2$`, R`$x \ge 2$`, R`$x \le 2$`],
    choicesEn: [R`$x \ge -2$`, R`$x \le -2$`, R`$x \ge 2$`, R`$x \le 2$`],
    answer: 0,
    hint: "Chia cho −2 thì phải đảo chiều. Đừng chỉ bỏ dấu trừ.",
    hintEn: "Dividing by −2 flips the inequality. Do not only drop the minus sign.",
    steps: [
      R`Chia hai vế cho $-2$ và đảo chiều: $x \ge 4 / (-2)$.`,
      R`Đó là $x \ge -2$.`,
      R`$x \le -2$ quên đảo chiều. $x \ge 2$ bỏ dấu âm. $x \le 2$ vừa bỏ dấu âm vừa quên đảo.`,
    ],
    stepsEn: [
      R`Divide both sides by $-2$ and flip: $x \ge 4 / (-2)$.`,
      R`That is $x \ge -2$.`,
      R`$x \le -2$ forgets the flip. $x \ge 2$ drops the minus. $x \le 2$ drops the minus and also forgets the flip.`,
    ],
  },
];

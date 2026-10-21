import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const comboLesson: Lesson = {
  concept: R`Chỉnh hợp kể thứ tự, tổ hợp thì không. $A(n, k) = n! / (n - k)!$ và $C(n, k) = A(n, k) / k!$. Vậy $A(5, 2) = 20$, $C(5, 2) = 10$ và $3! = 6$. Chọn một ban $3$ người trong $8$ người, không phân vai, là $C(8, 3) = 56$, không phải $A(8, 3) = 336$. Xếp $3$ người vào $3$ ghế khác nhau là $3! = 6$. Với các điểm $2, 3, 4, 5, 6$, trung bình và trung vị đều bằng $4$. Đổi điểm $6$ thành $20$ thì dãy sắp là $2, 3, 4, 5, 20$: trung vị vẫn là $4$, còn trung bình chạy theo điểm lệch và thành $6{,}8$.`,
  conceptEn: R`Permutations count order and combinations do not. $A(n, k) = n! / (n - k)!$ and $C(n, k) = A(n, k) / k!$. So $A(5, 2) = 20$, $C(5, 2) = 10$ and $3! = 6$. A committee of $3$ people chosen from $8$, with no roles, is $C(8, 3) = 56$, not $A(8, 3) = 336$. Seating $3$ people in $3$ distinct chairs is $3! = 6$. For the scores $2, 3, 4, 5, 6$, both the mean and the median are $4$. Changing $6$ to $20$ sorts as $2, 3, 4, 5, 20$: the median stays $4$, while the mean follows the outlier and becomes $6{,}8$.`,
};

export const comboQuestions: Question[] = [
  {
    id: "cmb-perm",
    prompt: "Số chỉnh hợp A(5, 2) bằng bao nhiêu?",
    promptEn: "What is the permutation A(5, 2)?",
    choices: ["20", "10", "25", "5"],
    choicesEn: ["20", "10", "25", "5"],
    answer: 0,
    hint: "Thứ tự có tính. Lấy 5 cách chọn chỗ thứ nhất, rồi 4 cách cho chỗ thứ hai.",
    hintEn: "Order counts. There are 5 choices for the first place, then 4 for the second.",
    steps: [
      "A(5, 2) = 5! / (5 − 2)! = 5 × 4.",
      "Đó là 20.",
      "10 là C(5, 2), đã chia cho 2!. 25 là 5 × 5, chọn có lặp. 5 chỉ là số phần tử.",
    ],
    stepsEn: [
      "A(5, 2) = 5! / (5 − 2)! = 5 × 4.",
      "That is 20.",
      "10 is C(5, 2), after dividing by 2!. 25 is 5 × 5, which allows repetition. 5 is only the number of objects.",
    ],
  },
  {
    id: "cmb-comb",
    prompt: "Số tổ hợp C(5, 2) bằng bao nhiêu?",
    promptEn: "What is the combination C(5, 2)?",
    choices: ["10", "20", "25", "32"],
    choicesEn: ["10", "20", "25", "32"],
    answer: 0,
    hint: "Không kể thứ tự. Lấy chỉnh hợp rồi chia cho 2!.",
    hintEn: "Order does not count. Take the permutation and divide by 2!.",
    steps: [
      "C(5, 2) = A(5, 2) / 2!.",
      "20 / 2 = 10.",
      "20 còn kể thứ tự. 25 là 5 × 5. 32 là 2⁵, không phải tổ hợp chập 2.",
    ],
    stepsEn: [
      "C(5, 2) = A(5, 2) / 2!.",
      "20 / 2 = 10.",
      "20 still counts order. 25 is 5 × 5. 32 is 2⁵, which is not the combination of 2.",
    ],
  },
  {
    id: "cmb-fact",
    prompt: "3! bằng bao nhiêu?",
    promptEn: "What is 3!?",
    choices: ["6", "9", "3", "8"],
    choicesEn: ["6", "9", "3", "8"],
    answer: 0,
    hint: "Giai thừa là tích các số nguyên từ 1 đến n, không phải bình phương.",
    hintEn: "A factorial is the product of the integers from 1 to n, not a square.",
    steps: [
      "3! = 3 × 2 × 1.",
      "Đó là 6.",
      "9 là 3². 3 là chính số ấy. 8 là 2³.",
    ],
    stepsEn: [
      "3! = 3 × 2 × 1.",
      "That is 6.",
      "9 is 3². 3 is the number itself. 8 is 2³.",
    ],
  },
  {
    id: "cmb-mean",
    prompt: "Các điểm 2, 3, 4, 5, 6. Đổi điểm 6 thành 20. Trung vị mới bằng bao nhiêu?",
    promptEn: "The scores are 2, 3, 4, 5, 6. Change 6 to 20. What is the new median?",
    choices: ["4", "6,8", "20", "5"],
    choicesEn: ["4", "6.8", "20", "5"],
    answer: 0,
    hint: "Sắp lại rồi lấy số ở giữa. Trung bình mới chạy theo điểm 20; trung vị thì không.",
    hintEn: "Sort, then take the middle value. The new mean follows 20; the median does not.",
    steps: [
      "Dãy sắp lại là 2, 3, 4, 5, 20.",
      "Có 5 số, số ở giữa vẫn là 4.",
      "6,8 là trung bình mới (2 + 3 + 4 + 5 + 20) / 5. 20 là điểm lệch. 5 là số đứng cạnh số giữa.",
    ],
    stepsEn: [
      "The sorted list is 2, 3, 4, 5, 20.",
      "There are 5 numbers, and the middle one is still 4.",
      "6.8 is the new mean, (2 + 3 + 4 + 5 + 20) / 5. 20 is the outlier. 5 is the neighbour of the middle value.",
    ],
  },
  {
    id: "cmb-comm",
    prompt: "Chọn 3 bạn trong 8 bạn để làm một ban, không phân vai trò. Có bao nhiêu cách?",
    promptEn: "Choose 3 people out of 8 for a committee, with no roles. How many ways?",
    choices: ["56", "336", "24", "8"],
    choicesEn: ["56", "336", "24", "8"],
    answer: 0,
    hint: "Không phân vai thì dùng tổ hợp, không dùng chỉnh hợp.",
    hintEn: "No roles means a combination, not a permutation.",
    steps: [
      "C(8, 3) = (8 × 7 × 6) / (3 × 2 × 1).",
      "336 / 6 = 56.",
      "336 là A(8, 3), đã phân vai. 24 là 8 × 3. 8 chỉ là số bạn.",
    ],
    stepsEn: [
      "C(8, 3) = (8 × 7 × 6) / (3 × 2 × 1).",
      "336 / 6 = 56.",
      "336 is A(8, 3), which assigns roles. 24 is 8 × 3. 8 is only the number of people.",
    ],
  },
  {
    id: "cmb-order",
    prompt: "Xếp 3 người vào 3 ghế khác nhau. Có bao nhiêu cách?",
    promptEn: "Seat 3 people in 3 distinct chairs. How many ways?",
    choices: ["6", "3", "9", "1"],
    choicesEn: ["6", "3", "9", "1"],
    answer: 0,
    hint: "Ghế khác nhau nên thứ tự có tính. Đó là 3!.",
    hintEn: "The chairs are distinct, so order counts. That is 3!.",
    steps: [
      "Người thứ nhất có 3 ghế, người tiếp theo còn 2, người cuối còn 1.",
      "3 × 2 × 1 = 6.",
      "3 chỉ là số người. 9 là 3². 1 là khi coi mọi cách xếp là một.",
    ],
    stepsEn: [
      "The first person has 3 chairs, the next has 2 left, and the last has 1.",
      "3 × 2 × 1 = 6.",
      "3 is only the number of people. 9 is 3². 1 would treat every seating as the same.",
    ],
  },
];

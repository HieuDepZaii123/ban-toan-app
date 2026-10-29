import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const comboLesson: Lesson = {
  basic: [
    { k: "mo", vi: R`Có thứ tự thì nhân dần; không thứ tự thì chia cho số cách xếp.`, en: R`If order counts, multiply down; if not, divide by the arrangements.` },
    { k: "vd", vi: R`Ba ghế: $3\cdot2\cdot1=6$.`, en: R`Three seats: $3\cdot2\cdot1=6$.` },
  ],
  exam: [
    { k: "dinh", vi: R`$A(n,k)=\dfrac{n!}{(n-k)!}$ và $C(n,k)=\dfrac{A(n,k)}{k!}$.`, en: R`$A(n,k)=\dfrac{n!}{(n-k)!}$ and $C(n,k)=\dfrac{A(n,k)}{k!}$.` },
    { k: "vd", vi: R`$C(8,3)=56$, còn $A(8,3)=336$.`, en: R`$C(8,3)=56$, while $A(8,3)=336$.` },
    { k: "loi", vi: R`Đề không kể thứ tự mà vẫn dùng $A$.`, en: R`Using $A$ when the problem ignores order.` },
    { k: "kiem", vi: R`$C(5,2)=10$ và $A(5,2)=20$.`, en: R`$C(5,2)=10$ and $A(5,2)=20$.` },
  ],
};

export const comboQuestions: Question[] = [
  {
    id: "cmb-perm",
    prompt: R`Chỉnh hợp $A(5,2)=?$`,
    promptEn: R`Permutation $A(5,2)=?$`,
    choices: ["20", "10", "25", "5"],
    choicesEn: ["20", "10", "25", "5"],
    answer: 0,
    hint: R`Thứ tự tính. $5\cdot4$.`,
    hintEn: R`Order counts. $5\cdot4$.`,
    steps: [
      R`$A(5,2)=\dfrac{5!}{3!}=5\cdot4$.`,
      R`$20$.`,
      R`$10=C(5,2)$. $25=5\cdot5$. $5=n$.`,
    ],
    stepsEn: [
      R`$A(5,2)=\dfrac{5!}{3!}=5\cdot4$.`,
      R`$20$.`,
      R`$10=C(5,2)$. $25=5\cdot5$. $5=n$.`,
    ],
  },
  {
    id: "cmb-comb",
    prompt: R`Tổ hợp $C(5,2)=?$`,
    promptEn: R`Combination $C(5,2)=?$`,
    choices: ["10", "20", "25", "32"],
    choicesEn: ["10", "20", "25", "32"],
    answer: 0,
    hint: R`$C=\dfrac{A}{2!}$. Không kể thứ tự.`,
    hintEn: R`$C=\dfrac{A}{2!}$. Order does not count.`,
    steps: [
      R`$C(5,2)=\dfrac{A(5,2)}{2!}$.`,
      R`$\dfrac{20}{2}=10$.`,
      R`$20=A$. $25=5^2$. $32=2^5$.`,
    ],
    stepsEn: [
      R`$C(5,2)=\dfrac{A(5,2)}{2!}$.`,
      R`$\dfrac{20}{2}=10$.`,
      R`$20=A$. $25=5^2$. $32=2^5$.`,
    ],
  },
  {
    id: "cmb-fact",
    prompt: R`Giai thừa $3!=?$`,
    promptEn: R`Factorial $3!=?$`,
    choices: ["6", "9", "3", "8"],
    choicesEn: ["6", "9", "3", "8"],
    answer: 0,
    hint: R`$n!=1\cdot2\cdots n\neq n^2$.`,
    hintEn: R`$n!=1\cdot2\cdots n\neq n^2$.`,
    steps: [
      R`$3\cdot2\cdot1$.`,
      R`$6$.`,
      R`$9=3^2$. $3=n$. $8=2^3$.`,
    ],
    stepsEn: [
      R`$3\cdot2\cdot1$.`,
      R`$6$.`,
      R`$9=3^2$. $3=n$. $8=2^3$.`,
    ],
  },
  {
    id: "cmb-mean",
    prompt: R`$2,3,4,5,6$, đổi $6\to20$. Trung vị?`,
    promptEn: R`$2,3,4,5,6$, change $6\to20$. Median?`,
    choices: ["4", "6,8", "20", "5"],
    choicesEn: ["4", "6.8", "20", "5"],
    answer: 0,
    hint: R`Sắp rồi lấy giữa. $\bar x$ chạy, trung vị không.`,
    hintEn: R`Sort, then take the middle. $\bar x$ moves, the median does not.`,
    steps: [
      R`$2,3,4,5,20$.`,
      R`Giữa $=4$.`,
      R`$6{,}8=\bar x$. $20$: lệch. $5$: kề giữa.`,
    ],
    stepsEn: [
      R`$2,3,4,5,20$.`,
      R`Middle $=4$.`,
      R`$6{,}8=\bar x$. $20$: the outlier. $5$: beside the middle.`,
    ],
  },
  {
    id: "cmb-comm",
    prompt: R`Chọn $3$ trong $8$, không vai. Số cách?`,
    promptEn: R`Choose $3$ of $8$, no roles. How many?`,
    choices: ["56", "336", "24", "8"],
    choicesEn: ["56", "336", "24", "8"],
    answer: 0,
    hint: R`Không vai $\Rightarrow C$, không $A$.`,
    hintEn: R`No roles $\Rightarrow C$, not $A$.`,
    steps: [
      R`$C(8,3)=\dfrac{8\cdot7\cdot6}{3!}$.`,
      R`$\dfrac{336}{6}=56$.`,
      R`$336=A(8,3)$. $24=8\cdot3$. $8=n$.`,
    ],
    stepsEn: [
      R`$C(8,3)=\dfrac{8\cdot7\cdot6}{3!}$.`,
      R`$\dfrac{336}{6}=56$.`,
      R`$336=A(8,3)$. $24=8\cdot3$. $8=n$.`,
    ],
  },
  {
    id: "cmb-order",
    prompt: R`$3$ người, $3$ ghế. Số cách?`,
    promptEn: R`$3$ people, $3$ chairs. How many?`,
    choices: ["6", "3", "9", "1"],
    choicesEn: ["6", "3", "9", "1"],
    answer: 0,
    hint: R`Ghế khác nhau $\Rightarrow3!$.`,
    hintEn: R`Distinct chairs $\Rightarrow3!$.`,
    steps: [
      R`$3\cdot2\cdot1$.`,
      R`$6$.`,
      R`$3=n$. $9=3^2$. $1$: coi như một.`,
    ],
    stepsEn: [
      R`$3\cdot2\cdot1$.`,
      R`$6$.`,
      R`$3=n$. $9=3^2$. $1$: every seating counted as one.`,
    ],
  },
];

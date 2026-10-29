import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const sequenceLesson: Lesson = {
  basic: [
    { k: "mo", vi: R`Cấp số cộng thêm một số cố định mỗi bước.`, en: R`An arithmetic sequence adds a fixed number each step.` },
    { k: "vd", vi: R`$3,7,11,15$ có công sai $4$.`, en: R`$3,7,11,15$ has common difference $4$.` },
  ],
  exam: [
    { k: "dinh", vi: R`$u_n=u_1+(n-1)d$ và $S_n=\dfrac{n}{2}(u_1+u_n)$.`, en: R`$u_n=u_1+(n-1)d$ and $S_n=\dfrac{n}{2}(u_1+u_n)$.` },
    { k: "vd", vi: R`Với $u_1=3$, $d=4$: $u_{10}=39$ và $S_{10}=210$.`, en: R`With $u_1=3$, $d=4$: $u_{10}=39$ and $S_{10}=210$.` },
    { k: "loi", vi: R`Lấy $10d$ thay vì $9d$ thì $u_{10}=43$.`, en: R`Using $10d$ instead of $9d$ gives $u_{10}=43$.` },
    { k: "kiem", vi: R`Tổng $1+\cdots+12=78$.`, en: R`The sum $1+\cdots+12=78$.` },
  ],
};

export const sequenceQuestions: Question[] = [
  {
    id: "seq-term",
    prompt: R`Cấp số cộng $u_1 = 3$, công sai $d = 4$. Số hạng thứ $10$ bằng bao nhiêu?`,
    promptEn: R`An arithmetic sequence has $u_1 = 3$ and common difference $d = 4$. What is the 10th term?`,
    choices: [R`$39$`, R`$43$`, R`$40$`, R`$30$`],
    choicesEn: [R`$39$`, R`$43$`, R`$40$`, R`$30$`],
    answer: 0,
    hint: "Từ số hạng đầu tới số hạng thứ 10 có 9 bước, không phải 10.",
    hintEn: "From the first term to the 10th there are 9 steps, not 10.",
    steps: [
      R`$u_n = u_1 + (n-1)d$.`,
      R`$u_{10} = 3 + 9 \times 4 = 39$.`,
      R`$43$ là $3 + 10 \times 4$, đếm nhầm $n$ bước. $40$ là $10 \times 4$. $30$ là $3 \times 10$.`,
    ],
    stepsEn: [
      R`$u_n = u_1 + (n-1)d$.`,
      R`$u_{10} = 3 + 9 \times 4 = 39$.`,
      R`$43$ is $3 + 10 \times 4$, counting $n$ steps. $40$ is $10 \times 4$. $30$ is $3 \times 10$.`,
    ],
  },
  {
    id: "seq-sum",
    prompt: R`Cùng dãy $u_1 = 3$, $d = 4$. Tổng mười số hạng đầu bằng bao nhiêu?`,
    promptEn: R`Same sequence, $u_1 = 3$, $d = 4$. What is the sum of the first ten terms?`,
    choices: [R`$210$`, R`$39$`, R`$390$`, R`$43$`],
    choicesEn: [R`$210$`, R`$39$`, R`$390$`, R`$43$`],
    answer: 0,
    hint: "Tổng là số số hạng nhân trung bình cộng của số đầu và số cuối.",
    hintEn: "The sum is the number of terms times the average of the first and the last.",
    steps: [
      R`Số cuối là $u_{10} = 39$.`,
      R`$S_{10} = \dfrac{10}{2}(3 + 39) = 210$.`,
      R`$39$ chỉ là số hạng cuối. $390$ là $10 \times 39$, quên chia đôi. $43$ là số cuối bị đếm thừa một bước.`,
    ],
    stepsEn: [
      R`The last term is $u_{10} = 39$.`,
      R`$S_{10} = \dfrac{10}{2}(3 + 39) = 210$.`,
      R`$39$ is only the last term. $390$ is $10 \times 39$, missing the half. $43$ is the last term with one extra step.`,
    ],
  },
  {
    id: "seq-geom",
    prompt: R`Cấp số nhân $u_1 = 2$, công bội $q = 3$. Số hạng thứ $5$ bằng bao nhiêu?`,
    promptEn: R`A geometric sequence has $u_1 = 2$ and common ratio $q = 3$. What is the 5th term?`,
    choices: [R`$162$`, R`$81$`, R`$14$`, R`$243$`],
    choicesEn: [R`$162$`, R`$81$`, R`$14$`, R`$243$`],
    answer: 0,
    hint: "Nhân bốn lần công bội, vì từ hạng 1 tới hạng 5 có 4 bước.",
    hintEn: "Multiply by the ratio four times: from term 1 to term 5 there are 4 steps.",
    steps: [
      R`$u_n = u_1 \cdot q^{n-1}$.`,
      R`$u_5 = 2 \times 3^4 = 2 \times 81 = 162$.`,
      R`$81$ quên nhân $u_1$. $14$ là cấp số cộng $2 + 4 \times 3$. $243$ là $3^5$.`,
    ],
    stepsEn: [
      R`$u_n = u_1 \cdot q^{n-1}$.`,
      R`$u_5 = 2 \times 3^4 = 2 \times 81 = 162$.`,
      R`$81$ forgets to multiply by $u_1$. $14$ treats it as the arithmetic term $2 + 4 \times 3$. $243$ is $3^5$.`,
    ],
  },
  {
    id: "seq-infinite",
    prompt: R`Tổng vô hạn $8 + 4 + 2 + \cdots$ bằng bao nhiêu?`,
    promptEn: R`What is the infinite sum $8 + 4 + 2 + \cdots$?`,
    choices: [R`$16$`, R`$0$`, R`$8$`, "Không có tổng"],
    choicesEn: [R`$16$`, R`$0$`, R`$8$`, "No sum"],
    answer: 0,
    hint: "Công bội là 1/2, nhỏ hơn 1. Tổng là số hạng đầu chia cho 1 trừ công bội.",
    hintEn: "The ratio is 1/2, which is less than 1. The sum is the first term divided by 1 minus the ratio.",
    steps: [
      R`$u_1 = 8$, $q = 1/2$, và $|q| < 1$.`,
      R`$S = 8 / (1 - 1/2) = 16$.`,
      R`$0$ là giới hạn của số hạng, không phải tổng. Không số hạng nào bằng $0$. $8$ chỉ là số đầu. Tổng tồn tại vì $|q| < 1$.`,
    ],
    stepsEn: [
      R`$u_1 = 8$, $q = 1/2$, and $|q| < 1$.`,
      R`$S = 8 / (1 - 1/2) = 16$.`,
      R`$0$ is the limit of the terms, not the sum. No term equals $0$. $8$ is only the first term. The sum exists because $|q| < 1$.`,
    ],
  },
  {
    id: "seq-bounce",
    prompt: "Thả bóng từ 8 m. Mỗi lần nảy lên một nửa độ cao vừa rơi. Quãng đường tổng cộng bằng bao nhiêu?",
    promptEn: "A ball is dropped from 8 m. Each bounce reaches half the height just fallen. What is the total path?",
    choices: ["24 m", "16 m", "8 m", "12 m"],
    choicesEn: ["24 m", "16 m", "8 m", "12 m"],
    answer: 0,
    hint: "Lần rơi đầu chỉ đi xuống. Mỗi lần nảy sau đó đi lên rồi lại đi xuống.",
    hintEn: "The first drop only goes down. Every later bounce goes up and then down.",
    steps: [
      R`Các đỉnh sau lần rơi đầu là $4 + 2 + 1 + \cdots = 4 / (1 - 1/2) = 8$ m.`,
      R`Mỗi đỉnh được đi lên và đi xuống, nên cộng $2 \times 8$. Thêm lần rơi $8$ m: tổng $24$ m.`,
      R`$16$ m là $8 + 4 + 2 + \cdots$, mỗi đoạn chỉ tính một lần. $8$ m chỉ là lần thả. $12$ m chỉ cộng một nhịp nảy.`,
    ],
    stepsEn: [
      R`The apexes after the first drop are $4 + 2 + 1 + \cdots = 4 / (1 - 1/2) = 8$ m.`,
      R`Each apex is travelled up and down, so add $2 \times 8$. With the $8$ m drop the total is $24$ m.`,
      R`$16$ m is $8 + 4 + 2 + \cdots$, counting each piece once. $8$ m is only the drop. $12$ m adds a single bounce.`,
    ],
  },
  {
    id: "seq-save",
    prompt: "Mỗi tháng gửi thêm một khoản tăng dần: 1 triệu, rồi 2 triệu, đến hết tháng 12. Cả năm gửi bao nhiêu?",
    promptEn: "Each month the deposit grows: 1 triệu, then 2 triệu, through month 12. How much is deposited over the year?",
    choices: ["78 triệu", "12 triệu", "144 triệu", "66 triệu"],
    choicesEn: ["78 triệu", "12 triệu", "144 triệu", "66 triệu"],
    answer: 0,
    hint: "Đây là tổng 1 + 2 + … + 12. Lấy số tháng nhân với tháng kế tiếp, rồi chia đôi.",
    hintEn: "This is the sum 1 + 2 + … + 12. Multiply the number of months by the next integer, then halve.",
    steps: [
      R`Các khoản là cấp số cộng $1, 2, \ldots, 12$.`,
      R`$S = \dfrac{12 \times 13}{2} = 78$ triệu.`,
      R`$12$ triệu chỉ là tháng cuối. $144$ triệu là $12 \times 12$. $66$ triệu là $\dfrac{12 \times 11}{2}$, thiếu một bước.`,
    ],
    stepsEn: [
      R`The deposits are the arithmetic sequence $1, 2, \ldots, 12$.`,
      R`$S = \dfrac{12 \times 13}{2} = 78$ triệu.`,
      R`$12$ triệu is only the last month. $144$ triệu is $12 \times 12$. $66$ triệu is $\dfrac{12 \times 11}{2}$, one step short.`,
    ],
  },
];

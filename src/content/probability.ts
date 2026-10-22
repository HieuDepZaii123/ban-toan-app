import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const probabilityLesson: Lesson = {
  concept: R`Đã biết một phần: mẫu số là phần còn. Xúc xắc, ít nhất một $6$: $11$ cặp, $P=\dfrac1{11}\neq\dfrac1{36}$. Hai con, ít nhất một trai: $\dfrac13\neq\dfrac12$. Bayes: $\dfrac{99}{99+495}=\dfrac16\neq99\%$. $C(3,2)(\dfrac12)^3=\dfrac38$. Ít nhất một ngửa: $\dfrac78$.`,
  conceptEn: R`Given part of the outcome, the denominator is what remains. Dice, at least one $6$: $11$ pairs, $P=\dfrac1{11}\neq\dfrac1{36}$. Two children, at least one boy: $\dfrac13\neq\dfrac12$. Bayes: $\dfrac{99}{99+495}=\dfrac16\neq99\%$. $C(3,2)(\dfrac12)^3=\dfrac38$. At least one head: $\dfrac78$.`,
};

export const probabilityQuestions: Question[] = [
  {
    id: "prob-dice",
    prompt: "Tung hai xúc xắc. Biết có ít nhất một mặt 6. Xác suất cả hai đều là 6 bằng bao nhiêu?",
    promptEn: "Two dice are rolled. Given that at least one face is 6, what is the probability that both are 6?",
    choices: [R`$\dfrac{1}{11}$`, R`$\dfrac{1}{6}$`, R`$\dfrac{1}{36}$`, R`$\dfrac{1}{2}$`],
    choicesEn: [R`$\dfrac{1}{11}$`, R`$\dfrac{1}{6}$`, R`$\dfrac{1}{36}$`, R`$\dfrac{1}{2}$`],
    answer: 0,
    hint: "Liệt kê các cặp còn lại. Đừng chia cho 6 hoặc cho 36.",
    hintEn: "List the pairs that remain. Do not divide by 6 or by 36.",
    steps: [
      R`Mẫu gốc có $36$ cặp.`,
      R`Sáu cặp có xúc xắc thứ nhất là $6$, sáu cặp có xúc xắc thứ hai là $6$. Cặp $(6; 6)$ bị đếm hai lần, nên còn $11$.`,
      R`Chỉ một cặp là cả hai mặt $6$. Xác suất $\dfrac{1}{11}$. $\dfrac{1}{6}$ là coi như đã biết đúng một viên. $\dfrac{1}{36}$ là quên điều kiện. $\dfrac{1}{2}$ là đoán.`,
    ],
    stepsEn: [
      R`The original sample has $36$ pairs.`,
      R`Six pairs have the first die equal to $6$, six have the second equal to $6$. The pair $(6, 6)$ is counted twice, so $11$ remain.`,
      R`Only one pair is double six. The probability is $\dfrac{1}{11}$. $\dfrac{1}{6}$ pretends a particular die is known. $\dfrac{1}{36}$ forgets the condition. $\dfrac{1}{2}$ is a guess.`,
    ],
  },
  {
    id: "prob-count",
    prompt: "Khi biết có ít nhất một mặt 6, còn lại bao nhiêu cặp?",
    promptEn: "Given at least one face is 6, how many pairs remain?",
    choices: [R`$11$`, R`$12$`, R`$6$`, R`$36$`],
    choicesEn: [R`$11$`, R`$12$`, R`$6$`, R`$36$`],
    answer: 0,
    hint: "Cộng hai hàng rồi trừ cặp bị đếm hai lần.",
    hintEn: "Add the two lines, then subtract the pair that was counted twice.",
    steps: [
      R`Sáu cặp có xúc xắc A là $6$, sáu cặp có xúc xắc B là $6$.`,
      R`Cặp $(6; 6)$ nằm trong cả hai nhóm.`,
      R`$12 - 1 = 11$. Số $36$ là chưa thu mẫu. Số $6$ chỉ là một hàng.`,
    ],
    stepsEn: [
      R`Six pairs have die A equal to $6$, and six have die B equal to $6$.`,
      R`The pair $(6, 6)$ sits in both groups.`,
      R`$12 - 1 = 11$. The number $36$ has not yet been reduced. The number $6$ is only one line.`,
    ],
  },
  {
    id: "prob-boys",
    prompt: "Một nhà có hai con. Biết có ít nhất một bé trai. Xác suất cả hai là trai bằng bao nhiêu?",
    promptEn: "A family has two children. Given that at least one is a boy, what is the probability that both are boys?",
    choices: [R`$\dfrac{1}{3}$`, R`$\dfrac{1}{2}$`, R`$\dfrac{1}{4}$`, R`$\dfrac{2}{3}$`],
    choicesEn: [R`$\dfrac{1}{3}$`, R`$\dfrac{1}{2}$`, R`$\dfrac{1}{4}$`, R`$\dfrac{2}{3}$`],
    answer: 0,
    hint: "Bốn khả năng BB, BG, GB, GG cùng khả năng. Bỏ GG.",
    hintEn: "The four outcomes BB, BG, GB, GG are equally likely. Drop GG.",
    steps: [
      R`Thứ tự sinh phân biệt BG và GB.`,
      R`Biết có ít nhất một trai thì bỏ GG. Còn ba trường hợp.`,
      R`Chỉ BB là cả hai trai, nên $\dfrac{1}{3}$. $\dfrac{1}{2}$ là quên mất một trong BG và GB. $\dfrac{1}{4}$ là xác suất khi chưa có điều kiện. $\dfrac{2}{3}$ là tỉ lệ có đúng một trai.`,
    ],
    stepsEn: [
      R`Birth order distinguishes BG from GB.`,
      R`Knowing there is at least one boy drops GG. Three outcomes remain.`,
      R`Only BB is two boys, so $\dfrac{1}{3}$. $\dfrac{1}{2}$ forgets one of BG and GB. $\dfrac{1}{4}$ is the probability with no condition. $\dfrac{2}{3}$ is the share with exactly one boy.`,
    ],
  },
  {
    id: "prob-bayes",
    prompt: R`Trong $10000$ người có $1\%$ bệnh. Xét nghiệm phát hiện $99\%$ người bệnh và báo dương nhầm $5\%$ người khỏe. Biết kết quả dương, xác suất người đó bệnh là bao nhiêu?`,
    promptEn: R`Of $10000$ people, $1\%$ are ill. A test detects $99\%$ of ill people and gives a false positive for $5\%$ of healthy people. Given a positive result, what is the probability the person is ill?`,
    choices: [R`$\dfrac{1}{6}$`, R`$99\%$`, R`$1\%$`, R`$95\%$`],
    choicesEn: [R`$\dfrac{1}{6}$`, R`$99\%$`, R`$1\%$`, R`$95\%$`],
    answer: 0,
    hint: "Đếm số người dương thật và số người dương giả. Mẫu số là tổng hai số đó.",
    hintEn: "Count the true positives and the false positives. The denominator is their sum.",
    steps: [
      R`$1\%$ của $10000$ là $100$ người bệnh. Dương thật: $0{,}99 \cdot 100 = 99$.`,
      R`$9900$ người khỏe, $5\%$ dương giả: $495$.`,
      R`$\dfrac{99}{99+495} = \dfrac{99}{594} = \dfrac{1}{6}$. $99\%$ là độ nhạy, chưa dùng kết quả. $1\%$ là tỉ lệ gốc, trước khi xét nghiệm. $95\%$ là độ đặc hiệu, không phải xác suất bệnh khi đã dương.`,
    ],
    stepsEn: [
      R`$1\%$ of $10000$ is $100$ ill people. True positives: $0.99 \cdot 100 = 99$.`,
      R`Of $9900$ healthy people, $5\%$ are false positives: $495$.`,
      R`$\dfrac{99}{99+495} = \dfrac{99}{594} = \dfrac{1}{6}$. $99\%$ is the sensitivity, before using the result. $1\%$ is the base rate, before the test. $95\%$ is the specificity, not the chance of illness after a positive result.`,
    ],
  },
  {
    id: "prob-binom",
    prompt: "Tung một đồng xu cân đối 3 lần. Xác suất đúng hai mặt ngửa bằng bao nhiêu?",
    promptEn: "A fair coin is tossed 3 times. What is the probability of exactly two heads?",
    choices: [R`$\dfrac{3}{8}$`, R`$\dfrac{1}{2}$`, R`$\dfrac{1}{8}$`, R`$\dfrac{2}{3}$`],
    choicesEn: [R`$\dfrac{3}{8}$`, R`$\dfrac{1}{2}$`, R`$\dfrac{1}{8}$`, R`$\dfrac{2}{3}$`],
    answer: 0,
    hint: "Có C(3, 2) dãy. Mỗi dãy có xác suất 1/8.",
    hintEn: "There are C(3, 2) sequences. Each sequence has probability 1/8.",
    steps: [
      R`Mỗi lần xác suất $\dfrac{1}{2}$, nên một dãy cụ thể có xác suất $\dfrac{1}{8}$.`,
      R`Đúng hai ngửa: NNS, NSN, SNN, tức $C(3,2) = 3$ dãy.`,
      R`$\dfrac{3}{8}$. $\dfrac{1}{8}$ là chỉ một dãy. $\dfrac{1}{2}$ là xác suất một lần tung. $\dfrac{2}{3}$ là lấy $2/3$ mà quên mẫu $8$.`,
    ],
    stepsEn: [
      R`Each toss has probability $\dfrac{1}{2}$, so one particular sequence has probability $\dfrac{1}{8}$.`,
      R`Exactly two heads: HHT, HTH, THH, that is $C(3,2) = 3$ sequences.`,
      R`$\dfrac{3}{8}$. $\dfrac{1}{8}$ is a single sequence. $\dfrac{1}{2}$ is one toss. $\dfrac{2}{3}$ takes $2/3$ and forgets the sample of $8$.`,
    ],
  },
  {
    id: "prob-least",
    prompt: "Cùng ba lần tung đồng xu cân đối. Xác suất có ít nhất một mặt ngửa bằng bao nhiêu?",
    promptEn: "The same three tosses of a fair coin. What is the probability of at least one head?",
    choices: [R`$\dfrac{7}{8}$`, R`$\dfrac{1}{2}$`, R`$\dfrac{3}{8}$`, R`$\dfrac{1}{8}$`],
    choicesEn: [R`$\dfrac{7}{8}$`, R`$\dfrac{1}{2}$`, R`$\dfrac{3}{8}$`, R`$\dfrac{1}{8}$`],
    answer: 0,
    hint: "Lấy phần bù: không có mặt ngửa nào.",
    hintEn: "Use the complement: no heads at all.",
    steps: [
      R`Không ngửa nào nghĩa là cả ba sấp, xác suất $\dfrac{1}{8}$.`,
      R`Ít nhất một ngửa: $1 - \dfrac{1}{8} = \dfrac{7}{8}$.`,
      R`$\dfrac{3}{8}$ là đúng hai ngửa. $\dfrac{1}{8}$ là không ngửa nào, hoặc đúng ba ngửa. $\dfrac{1}{2}$ là một lần tung.`,
    ],
    stepsEn: [
      R`No heads means three tails, probability $\dfrac{1}{8}$.`,
      R`At least one head: $1 - \dfrac{1}{8} = \dfrac{7}{8}$.`,
      R`$\dfrac{3}{8}$ is exactly two heads. $\dfrac{1}{8}$ is no heads, or exactly three heads. $\dfrac{1}{2}$ is a single toss.`,
    ],
  },
];

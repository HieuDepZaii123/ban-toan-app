import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const expLesson: Lesson = {
  basic: [
    { k: "mo", vi: R`$a^n$ là $a$ nhân $n$ lần, với $n$ nguyên dương. $\log_a b$ là số mũ $x$ thỏa $a^x=b$, chẳng hạn $2^3=8$ nên $\log_2 8=3$.`, en: R`$a^n$ is $a$ multiplied $n$ times, for a positive integer $n$. $\log_a b$ is the exponent $x$ with $a^x=b$; for example $2^3=8$ so $\log_2 8=3$.` },
    { k: "dinh", vi: R`$a>0$, $a\neq 1$: $\log_a(bc)=\log_a b+\log_a c$ và $\log_a(b^k)=k\log_a b$.`, en: R`$a>0$, $a\neq 1$: $\log_a(bc)=\log_a b+\log_a c$ and $\log_a(b^k)=k\log_a b$.` },
    { k: "vd", vi: R`Vốn $10$, lãi kép $8\%$ trong $5$ năm: $10(1{,}08)^5\approx 14{,}69$. Lãi đơn cùng kỳ là $14$.`, en: R`Principal $10$, compound interest $8\%$ for $5$ years: $10(1{,}08)^5\approx 14{,}69$. Simple interest over the same time is $14$.` },
  ],
  exam: [
    { k: "dinh", vi: R`Gấp đôi với lãi $r$: $(1+r)^t=2$, nên $t=\dfrac{\ln 2}{\ln(1+r)}$.`, en: R`Doubling at rate $r$: $(1+r)^t=2$, so $t=\dfrac{\ln 2}{\ln(1+r)}$.` },
    { k: "vd", vi: R`$r=0{,}08$: $t=\dfrac{\ln 2}{\ln 1{,}08}\approx 9{,}01$. Quy tắc $\dfrac{72}{8}=9$ chỉ là xấp xỉ.`, en: R`$r=0{,}08$: $t=\dfrac{\ln 2}{\ln 1{,}08}\approx 9{,}01$. The rule $\dfrac{72}{8}=9$ is only an approximation.` },
    { k: "loi", vi: R`$\log(a+b)\neq\log a+\log b$. Lãi đơn $14$ không phải lãi kép $14{,}69$.`, en: R`$\log(a+b)\neq\log a+\log b$. Simple interest $14$ is not compound interest $14{,}69$.` },
    { k: "kiem", vi: R`Bán rã $10$ năm, khối lượng $80$ g. Sau $20$ năm: $80\cdot\left(\dfrac12\right)^2=20$ g.`, en: R`Half-life $10$ years, mass $80$ g. After $20$ years: $80\cdot\left(\dfrac12\right)^2=20$ g.` },
  ],
};

export const expQuestions: Question[] = [
  {
    id: "exp-power",
    prompt: R`$2^3$ bằng bao nhiêu?`,
    promptEn: R`What is $2^3$?`,
    choices: [R`$8$`, R`$6$`, R`$9$`, R`$5$`],
    choicesEn: [R`$8$`, R`$6$`, R`$9$`, R`$5$`],
    answer: 0,
    hint: R`$a^n$: nhân $a$ đúng $n$ lần.`,
    hintEn: R`$a^n$: multiply $a$ exactly $n$ times.`,
    steps: [
      R`$2^3 = 2 \times 2 \times 2$.`,
      R`Đó là $8$.`,
      R`$6$ là $2 \times 3$. $9$ là $3^2$. $5$ là $2 + 3$.`,
    ],
    stepsEn: [
      R`$2^3 = 2 \times 2 \times 2$.`,
      R`That is $8$.`,
      R`$6$ is $2 \times 3$. $9$ is $3^2$. $5$ is $2 + 3$.`,
    ],
  },
  {
    id: "exp-log",
    prompt: R`$\log_2 8$ bằng bao nhiêu?`,
    promptEn: R`What is $\log_2 8$?`,
    choices: [R`$3$`, R`$8$`, R`$2$`, R`$4$`],
    choicesEn: [R`$3$`, R`$8$`, R`$2$`, R`$4$`],
    answer: 0,
    hint: R`Giải $2^x=8$.`,
    hintEn: R`Solve $2^x=8$.`,
    steps: [
      R`$2^3 = 8$, nên logarit cơ số $2$ của $8$ là $3$.`,
      R`Logarit trả về số mũ, không trả về chính số $8$.`,
      R`$2$ là cơ số. $4$ là $2^2$, chưa tới $8$.`,
    ],
    stepsEn: [
      R`$2^3 = 8$, so the base-$2$ logarithm of $8$ is $3$.`,
      R`A logarithm returns the exponent, not the number $8$ itself.`,
      R`$2$ is the base. $4$ is $2^2$, which has not reached $8$.`,
    ],
  },
  {
    id: "exp-sum",
    prompt: R`$\log 2 + \log 3$ bằng bao nhiêu?`,
    promptEn: R`What is $\log 2 + \log 3$?`,
    choices: [R`$\log 6$`, R`$\log 5$`, R`$\log 2 \cdot \log 3$`, R`$5$`],
    choicesEn: [R`$\log 6$`, R`$\log 5$`, R`$\log 2 \cdot \log 3$`, R`$5$`],
    answer: 0,
    hint: R`Cùng cơ số: $\log(ab)=\log a+\log b$.`,
    hintEn: R`Same base: $\log(ab)=\log a+\log b$.`,
    steps: [
      R`$\log a + \log b = \log(ab)$.`,
      R`$2 \times 3 = 6$, nên tổng bằng $\log 6$.`,
      R`$\log 5$ là nhầm sang $\log(2+3)$. Tích hai log và số $5$ không phải công thức này.`,
    ],
    stepsEn: [
      R`$\log a + \log b = \log(ab)$.`,
      R`$2 \times 3 = 6$, so the sum equals $\log 6$.`,
      R`$\log 5$ is the slip $\log(2+3)$. The product of the two logs, and the number $5$, are not this rule.`,
    ],
  },
  {
    id: "exp-compound",
    prompt: "Gửi 10 triệu, lãi kép 8% mỗi năm. Sau 5 năm có khoảng bao nhiêu?",
    promptEn: "Ten triệu is invested at 8% compound interest per year. About how much is there after 5 years?",
    choices: ["Khoảng 14,69 triệu", "14 triệu", "18 triệu", "40 triệu"],
    choicesEn: ["About 14.69 triệu", "14 triệu", "18 triệu", "40 triệu"],
    answer: 0,
    hint: R`Nhân $1{,}08$ năm lần, không cộng $0{,}8$ mỗi năm.`,
    hintEn: R`Multiply by $1{,}08$ five times, do not add $0{,}8$ each year.`,
    steps: [
      R`Lãi kép: $10 \times (1{,}08)^5$.`,
      R`$(1{,}08)^5 \approx 1{,}4693$, nên kết quả khoảng $14{,}69$ triệu.`,
      R`$14$ triệu là lãi đơn $10(1 + 0{,}08 \times 5)$. $18$ triệu là $10 + 8$. $40$ triệu là $10 \times 1{,}08 \times 5$, nhân số năm thay vì lũy thừa.`,
    ],
    stepsEn: [
      R`Compound interest: $10 \times (1{,}08)^5$.`,
      R`$(1{,}08)^5 \approx 1{,}4693$, so the result is about $14{,}69$ triệu.`,
      R`$14$ triệu is simple interest $10(1 + 0{,}08 \times 5)$. $18$ triệu is $10 + 8$. $40$ triệu is $10 \times 1{,}08 \times 5$, multiplying by the years instead of raising to a power.`,
    ],
  },
  {
    id: "exp-double",
    prompt: "Lãi kép 8% mỗi năm. Khoảng bao lâu thì một khoản gấp đôi?",
    promptEn: "Compound interest is 8% per year. About how long until an amount doubles?",
    choices: ["Khoảng 9 năm", "8 năm", "12,5 năm", "5 năm"],
    choicesEn: ["About 9 years", "8 years", "12.5 years", "5 years"],
    answer: 0,
    hint: R`$(1{,}08)^t=2$. Lấy $\ln$, không lấy $100/8$.`,
    hintEn: R`$(1{,}08)^t=2$. Take $\ln$, not $100/8$.`,
    steps: [
      R`$(1{,}08)^t = 2$, nên $t = \ln 2 / \ln(1{,}08)$.`,
      R`Giá trị đó khoảng $9{,}01$ năm, tức khoảng $9$ năm.`,
      R`$8$ năm lấy nhầm số phần trăm. $12{,}5$ là $100/8$, quy tắc nhẩm không đúng với lãi kép. $5$ năm là ví dụ $14{,}69$ triệu, chưa gấp đôi.`,
    ],
    stepsEn: [
      R`$(1{,}08)^t = 2$, so $t = \ln 2 / \ln(1{,}08)$.`,
      R`That value is about $9{,}01$ years, about $9$ years.`,
      R`$8$ years copies the percent. $12{,}5$ is $100/8$, a rough rule that is not the compound-interest time. $5$ years is the $14{,}69$ triệu example, which has not doubled.`,
    ],
  },
  {
    id: "exp-decay",
    prompt: "Một mẫu 80 g có chu kỳ bán rã 10 năm. Sau 20 năm còn bao nhiêu?",
    promptEn: "A sample of 80 g has a half-life of 10 years. How much is left after 20 years?",
    choices: ["20 g", "40 g", "0 g", "60 g"],
    choicesEn: ["20 g", "40 g", "0 g", "60 g"],
    answer: 0,
    hint: R`Hai lần bán rã: nhân $\left(\dfrac12\right)^2$.`,
    hintEn: R`Two half-lives: multiply by $\left(\dfrac12\right)^2$.`,
    steps: [
      R`Sau $10$ năm còn $40$ g. Sau thêm $10$ năm còn một nửa của $40$ g.`,
      R`Đó là $20$ g, cũng là $80 \times (1/2)^{20/10}$.`,
      R`$40$ g mới qua một chu kỳ. $0$ g là trừ hết hai nửa. $60$ g là giảm đều $10$ g mỗi chu kỳ, không phải phân rã.`,
    ],
    stepsEn: [
      R`After $10$ years, $40$ g remain. After another $10$ years, half of $40$ g remains.`,
      R`That is $20$ g, which is also $80 \times (1/2)^{20/10}$.`,
      R`$40$ g is only one half-life. $0$ g subtracts both halves away. $60$ g is a steady drop of $10$ g per period, which is not decay.`,
    ],
  },
];

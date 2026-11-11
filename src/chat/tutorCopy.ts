import { matchTopic, tutorTopics, type TutorTopic } from "../../server/chat/topics.ts";

const R = String.raw;

type Sheet = { lead: string; steps: readonly [string, string, string] };

/** One worked mini-example per desk. Steps stay numbered so the bubble can open them one by one. */
const SHEETS: Record<TutorTopic["id"], Sheet> = {
  quadratic: {
    lead: R`Ví dụ $y=x^2-2x-3$: $\Delta=16$, đỉnh $(1;-4)$.`,
    steps: [
      R`Tính $\Delta=b^2-4ac$. Với $1,-2,-3$: $\Delta=4+12=16$.`,
      R`Hoành độ đỉnh $x=-\dfrac{b}{2a}=1$.`,
      R`Thế $x=1$ được $y=-4$. Bạn kiểm $y(3)=0$.`,
    ],
  },
  ineq: {
    lead: R`Với $4$ và $9$: trung bình cộng $6{,}5$, trung bình nhân $6$.`,
    steps: [
      R`$\dfrac{4+9}{2}=6{,}5$.`,
      R`$\sqrt{4\cdot 9}=\sqrt{36}=6$.`,
      R`Vì $4\neq 9$ nên $6{,}5>6$. Bạn thử cặp $5$ và $5$.`,
    ],
  },
  exp: {
    lead: R`$2^3=8$, nên $\log_2 8=3$.`,
    steps: [
      R`Mũ hỏi $2$ nhân mấy lần ra $8$: ba lần.`,
      R`$\log_2 8$ là số mũ đó, bằng $3$.`,
      R`Đừng viết $\log_2(4+4)=\log_2 4+\log_2 4$: vế trái là $3$, vế phải là $4$.`,
    ],
  },
  sequence: {
    lead: R`Dãy $3,7,11,15$ có công sai $4$, nên $u_{10}=39$.`,
    steps: [
      R`Công sai $d=7-3=4$.`,
      R`Từ hạng $1$ tới hạng $10$ có $9$ bước.`,
      R`$u_{10}=3+9\cdot 4=39$. Bạn kiểm $u_2=7$.`,
    ],
  },
  trig: {
    lead: R`Góc $150^\circ$: $\sin=\dfrac12$, $\cos=-\dfrac{\sqrt3}{2}$.`,
    steps: [
      R`Trên đường tròn bán kính $1$, góc $0^\circ$ là $(1;0)$, góc $90^\circ$ là $(0;1)$.`,
      R`$150^\circ=180^\circ-30^\circ$, sin giữ $\dfrac12$.`,
      R`Cos đổi dấu: $-\dfrac{\sqrt3}{2}$. Bạn kiểm $\sin^2+\cos^2=1$.`,
    ],
  },
  limit: {
    lead: R`$\dfrac{x^2-1}{x-1}$ sát $1$ thì sát $2$, dù không thế $x=1$ lúc mẫu còn $0$.`,
    steps: [
      R`Với $x\neq 1$, rút $x-1$ còn $x+1$.`,
      R`Cho $x$ sát $1$: $x+1$ sát $2$.`,
      R`Gán $f(1)=5$ không đổi giới hạn. Bạn tính giá trị tại $x=1{,}01$.`,
    ],
  },
  derivative: {
    lead: R`Quy tắc: $(x^2)'=2x$. Thử tại $x=2$: $f'(2)=4$.`,
    steps: [
      R`Cát tuyến từ $2$ đến $2+h$: $\dfrac{(2+h)^2-4}{h}=4+h$.`,
      R`Cho $h\to 0$ được $f'(2)=4$.`,
      R`Tiếp tuyến: $y=4(x-2)+4$. Bạn kiểm hệ số góc tại $x=1$ là $2$.`,
    ],
  },
  survey: {
    lead: R`$y=x^3-3x$: cực đại $2$ tại $x=-1$, cực tiểu $-2$ tại $x=1$.`,
    steps: [
      R`$y'=3x^2-3=3(x-1)(x+1)$.`,
      R`$y'=0$ tại $x=\pm 1$, và $y'$ đổi dấu ở cả hai điểm.`,
      R`$y(-1)=2$, $y(1)=-2$. Bạn xét $y=x^3$: $y'(0)=0$ nhưng không đổi dấu.`,
    ],
  },
  integral: {
    lead: R`$\int_0^2(2x-x^2)\,dx=\dfrac43$.`,
    steps: [
      R`Nguyên hàm $F=x^2-\dfrac{x^3}{3}$.`,
      R`$F(2)-F(0)=4-\dfrac83=\dfrac43$.`,
      R`Dưới Ox thì tích phân âm. Bạn tính thêm $\int_0^1(x-x^2)\,dx=\dfrac16$.`,
    ],
  },
  vector: {
    lead: R`$|(2;1;2)|=\sqrt{4+1+4}=3$.`,
    steps: [
      R`Độ dài là căn tổng bình phương, không phải tổng $2+1+2$.`,
      R`$\sqrt{9}=3$.`,
      R`$(1;2;-1)\cdot(2;-1;0)=0$, nên vuông góc. Bạn kiểm lại tích từng cặp.`,
    ],
  },
  analytic: {
    lead: R`Điểm $(3;1)$ cách $x+y-2=0$ đúng $\sqrt2$.`,
    steps: [
      R`Pháp tuyến $(1;1)$ dài $\sqrt2$.`,
      R`Tử $|3+1-2|=2$.`,
      R`Chia: $\dfrac{2}{\sqrt2}=\sqrt2$. Dừng ở $2$ là chưa chia.`,
    ],
  },
  triangle: {
    lead: R`Đáy $6$, cao $4$: diện tích $\dfrac{6\cdot 4}{2}=12$.`,
    steps: [
      R`Tam giác lấy nửa đáy nhân cao.`,
      R`Bỏ $\dfrac12$ thì ra $24$, sai.`,
      R`Chóp cùng đáy vuông cạnh $6$, cao $4$: $V=\dfrac13\cdot 36\cdot 4=48$.`,
    ],
  },
  combo: {
    lead: R`$C(8,3)=56$, còn $A(8,3)=336$.`,
    steps: [
      R`Có thứ tự: $A(8,3)=8\cdot 7\cdot 6=336$.`,
      R`Không thứ tự thì chia $3!$: $\dfrac{336}{6}=56$.`,
      R`$C(8,3)=C(8,5)$. Bạn kiểm $C(5,2)=10$.`,
    ],
  },
  probability: {
    lead: R`Hai xúc xắc, biết có ít nhất một mặt $6$: xác suất cả hai đều $6$ là $\dfrac{1}{11}$.`,
    steps: [
      R`Ban đầu $36$ cặp. Không có mặt $6$: $25$ cặp.`,
      R`Còn $36-25=11$ cặp.`,
      R`Chỉ $(6;6)$ thỏa, nên $\dfrac{1}{11}$. Chia cho $36$ là sai.`,
    ],
  },
};

export const TOPIC_QUICK: Record<TutorTopic["id"], readonly [string, string, string]> = {
  quadratic: ["Đỉnh của parabol?", "Tính Δ bậc hai", "Parabol tiếp xúc Ox"],
  ineq: ["AM-GM với 4 và 9", "Bất đẳng thức Cauchy", "Chia số âm đảo chiều"],
  exp: ["logarit của 8", "mũ 1,08 sau 5 năm", "log của một tổng"],
  sequence: ["cấp số cộng u10", "công sai của dãy", "tổng cấp số"],
  trig: ["sin 150 độ", "cos trên đường tròn", "lượng giác góc bù"],
  limit: ["giới hạn dạng 0/0", "liên tục tại một điểm", "giới hạn hai phía"],
  derivative: ["đạo hàm của x mũ 2", "tiếp tuyến tại một điểm", "cát tuyến khi h về 0"],
  survey: ["khảo sát x mũ 3 trừ 3x", "cực trị đổi dấu", "tiệm cận đứng"],
  integral: ["tích phân từ 0 đến 2", "nguyên hàm của 2x", "diện tích giữa hai đồ thị"],
  vector: ["độ dài vectơ 2, 1, 2", "tích vô hướng bằng 0", "định thức hai cột"],
  analytic: ["khoảng cách tới đường thẳng", "pháp tuyến của đường", "điểm và đường tròn"],
  triangle: ["diện tích tam giác đáy 6", "thể tích của chóp", "thể tích hộp"],
  combo: ["tổ hợp C(8,3)", "chỉnh hợp khác tổ hợp", "trung vị của dãy điểm"],
  probability: ["xác suất hai xúc xắc", "Bayes khi xét nghiệm dương", "mẫu số sau điều kiện"],
};

export function topicById(id: string): TutorTopic | undefined {
  return tutorTopics.find((item) => item.id === id);
}

const EN_SHEETS: Record<TutorTopic["id"], Sheet> = {
  quadratic: {
    lead: R`Example $y=x^2-2x-3$: $\Delta=16$, vertex $(1;-4)$.`,
    steps: [
      R`Compute $\Delta=b^2-4ac$. For $1,-2,-3$: $\Delta=4+12=16$.`,
      R`Vertex $x=-\dfrac{b}{2a}=1$.`,
      R`At $x=1$, $y=-4$. Check $y(3)=0$.`,
    ],
  },
  ineq: {
    lead: R`For $4$ and $9$: arithmetic mean $6{,}5$, geometric mean $6$.`,
    steps: [
      R`$\dfrac{4+9}{2}=6{,}5$.`,
      R`$\sqrt{4\cdot 9}=6$.`,
      R`Since $4\neq 9$, the arithmetic mean is larger. Try $5$ and $5$.`,
    ],
  },
  exp: {
    lead: R`$2^3=8$, so $\log_2 8=3$.`,
    steps: [
      R`$2$ multiplied three times is $8$.`,
      R`$\log_2 8$ is that exponent, so it equals $3$.`,
      R`Do not write $\log_2(4+4)=\log_2 4+\log_2 4$: the left side is $3$, the right side is $4$.`,
    ],
  },
  sequence: {
    lead: R`The sequence $3,7,11,15$ has common difference $4$, so $u_{10}=39$.`,
    steps: [
      R`Common difference $d=7-3=4$.`,
      R`From term $1$ to term $10$ there are $9$ steps.`,
      R`$u_{10}=3+9\cdot 4=39$. Check $u_2=7$.`,
    ],
  },
  trig: {
    lead: R`At $150^\circ$: $\sin=\dfrac12$, $\cos=-\dfrac{\sqrt3}{2}$.`,
    steps: [
      R`On the unit circle, $0^\circ$ is $(1;0)$ and $90^\circ$ is $(0;1)$.`,
      R`$150^\circ=180^\circ-30^\circ$, so sine stays $\dfrac12$.`,
      R`Cosine changes sign: $-\dfrac{\sqrt3}{2}$. Check $\sin^2+\cos^2=1$.`,
    ],
  },
  limit: {
    lead: R`$\dfrac{x^2-1}{x-1}$ approaches $2$ as $x$ approaches $1$, even though the denominator is $0$ at $x=1$.`,
    steps: [
      R`For $x\neq 1$, cancel $x-1$ and keep $x+1$.`,
      R`As $x$ approaches $1$, $x+1$ approaches $2$.`,
      R`Setting $f(1)=5$ does not change the limit. Try $x=1.01$.`,
    ],
  },
  derivative: {
    lead: R`Rule: $(x^2)'=2x$. Try $x=2$: $f'(2)=4$.`,
    steps: [
      R`The secant from $2$ to $2+h$ is $\dfrac{(2+h)^2-4}{h}=4+h$.`,
      R`Let $h\to 0$ to get $f'(2)=4$.`,
      R`Tangent: $y=4(x-2)+4$. The slope at $x=1$ is $2$.`,
    ],
  },
  survey: {
    lead: R`$y=x^3-3x$: local max $2$ at $x=-1$, local min $-2$ at $x=1$.`,
    steps: [
      R`$y'=3x^2-3=3(x-1)(x+1)$.`,
      R`$y'=0$ at $x=\pm 1$, and $y'$ changes sign at both.`,
      R`$y(-1)=2$, $y(1)=-2$. For $y=x^3$, $y'(0)=0$ but the sign does not change.`,
    ],
  },
  integral: {
    lead: R`$\int_0^2(2x-x^2)\,dx=\dfrac43$.`,
    steps: [
      R`Antiderivative $F=x^2-\dfrac{x^3}{3}$.`,
      R`$F(2)-F(0)=4-\dfrac83=\dfrac43$.`,
      R`Below the axis the integral is negative. Also $\int_0^1(x-x^2)\,dx=\dfrac16$.`,
    ],
  },
  vector: {
    lead: R`$|(2;1;2)|=\sqrt{4+1+4}=3$.`,
    steps: [
      R`Length is the square root of the sum of squares, not the sum $2+1+2$.`,
      R`$\sqrt{9}=3$.`,
      R`$(1;2;-1)\cdot(2;-1;0)=0$, so the vectors are perpendicular.`,
    ],
  },
  analytic: {
    lead: R`The point $(3;1)$ is $\sqrt2$ from the line $x+y-2=0$.`,
    steps: [
      R`The normal $(1;1)$ has length $\sqrt2$.`,
      R`Numerator $|3+1-2|=2$.`,
      R`Divide: $\dfrac{2}{\sqrt2}=\sqrt2$. Stopping at $2$ skips the division.`,
    ],
  },
  triangle: {
    lead: R`Base $6$, height $4$: area $\dfrac{6\cdot 4}{2}=12$.`,
    steps: [
      R`A triangle uses half of base times height.`,
      R`Dropping $\dfrac12$ gives $24$, which is wrong.`,
      R`A pyramid with the same square base of side $6$ and height $4$: $V=\dfrac13\cdot 36\cdot 4=48$.`,
    ],
  },
  combo: {
    lead: R`$C(8,3)=56$, while $A(8,3)=336$.`,
    steps: [
      R`Order matters: $A(8,3)=8\cdot 7\cdot 6=336$.`,
      R`Without order, divide by $3!$: $\dfrac{336}{6}=56$.`,
      R`$C(8,3)=C(8,5)$. Check $C(5,2)=10$.`,
    ],
  },
  probability: {
    lead: R`Two dice, given at least one $6$: the probability both are $6$ is $\dfrac{1}{11}$.`,
    steps: [
      R`There are $36$ pairs at the start. Pairs with no $6$: $25$.`,
      R`That leaves $36-25=11$ pairs.`,
      R`Only $(6;6)$ works, so $\dfrac{1}{11}$. Dividing by $36$ is the wrong sample.`,
    ],
  },
};

const EN_TITLE: Record<TutorTopic["id"], string> = {
  quadratic: "Quadratic functions",
  ineq: "Inequalities",
  exp: "Exponents and logarithms",
  sequence: "Sequences",
  trig: "Trigonometry",
  limit: "Limits",
  derivative: "Derivatives",
  survey: "Curve sketching",
  integral: "Integrals",
  vector: "Vectors",
  analytic: "Analytic geometry",
  triangle: "Plane and solid geometry",
  combo: "Combinatorics",
  probability: "Probability",
};

function thinkingVi(title: string): string {
  return [
    `Tư duy giải: đọc đề thuộc ${title}.`,
    "Hướng tiếp cận: đi từ định nghĩa, mỗi kết luận có một dẫn chứng.",
    "Vì sao cách này, không phải thế số trước: thế số sớm dễ mất điều kiện.",
    "Lộ trình: (1) dữ kiện, (2) một phép có chứng minh, (3) kiểm lại.",
  ].join("\n");
}

function thinkingEn(title: string): string {
  return [
    `Solution thinking: read this as a question on ${title}.`,
    "Approach: start from the definition, and cite a reason for each claim.",
    "Why this and not plugging in first: an early substitution can drop a condition.",
    "Route: (1) the data, (2) one proved move, (3) a check.",
  ].join("\n");
}

export function tutorAnswer(text: string, preferId?: string, lang: "vi" | "en" = "vi"): string {
  const matched = matchTopic(text);
  const topic = matched ?? (preferId ? topicById(preferId) : undefined) ?? null;
  if (lang === "en") return answerEn(topic);
  if (!topic) {
    return [
      "Tư duy giải: đọc câu hỏi, chọn một hướng, nói vì sao không chọn hướng kia, rồi mới tính.",
      "Cùng đi từng bước: mình gợi ý, bước cuối bạn tự làm.",
      "1) Ghi giả thiết và điều cần tìm.",
      R`2) Viết một công thức trong dấu $. Ví dụ $\dfrac{4+9}{2}=6{,}5$.`,
      "3) Tính một bước, rồi thế lại.",
      "Hãy tự kiểm chứng bước cuối.",
    ].join("\n");
  }
  const sheet = SHEETS[topic.id];
  return [
    thinkingVi(topic.title),
    sheet.lead,
    `1) ${sheet.steps[0]}`,
    `2) ${sheet.steps[1]}`,
    `3) ${sheet.steps[2]}`,
    `Xem [${topic.title}](/t/${topic.id}).`,
    "Trên đây là một ví dụ mẫu. Gửi bài của bạn và chỗ đang vướng, mình gợi ý từng bước chứ không làm hộ.",
  ].join("\n");
}

function answerEn(topic: TutorTopic | null): string {
  if (!topic) {
    return [
      "Solution thinking: read the question, choose one approach, say why the other is weaker, then compute.",
      "I will hint the steps and leave the last check with you.",
      "1) Write the given data and the goal.",
      R`2) Put one formula inside dollar signs. For example $\dfrac{4+9}{2}=6.5$.`,
      "3) Do one justified step, then substitute back.",
      "Check the last step yourself.",
    ].join("\n");
  }
  const sheet = EN_SHEETS[topic.id];
  const title = EN_TITLE[topic.id];
  return [
    thinkingEn(title),
    sheet.lead,
    `1) ${sheet.steps[0]}`,
    `2) ${sheet.steps[1]}`,
    `3) ${sheet.steps[2]}`,
    `Open [${title}](/t/${topic.id}).`,
    "That was a worked example. Send your own problem and where you are stuck; I will hint the steps rather than do it for you.",
  ].join("\n");
}

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
    lead: R`$f(x)=x^2$ thì $f'(2)=4$.`,
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

export function tutorAnswer(text: string, preferId?: string): string {
  const matched = matchTopic(text);
  const topic = matched ?? (preferId ? topicById(preferId) : undefined) ?? null;
  if (!topic) {
    return [
      "Cùng đi từng bước. Mình không chốt đáp án hộ.",
      "1) Ghi giả thiết và điều cần tìm.",
      R`2) Viết một công thức trong dấu $. Ví dụ $\dfrac{4+9}{2}=6{,}5$.`,
      "3) Tính một bước, rồi thế lại.",
      "Hãy tự kiểm chứng bước cuối.",
    ].join("\n");
  }
  const sheet = SHEETS[topic.id];
  return [
    sheet.lead,
    `1) ${sheet.steps[0]}`,
    `2) ${sheet.steps[1]}`,
    `3) ${sheet.steps[2]}`,
    `Xem [${topic.title}](/t/${topic.id}).`,
    "Mình không chốt đáp án hộ. Hãy tự kiểm chứng bước cuối.",
  ].join("\n");
}

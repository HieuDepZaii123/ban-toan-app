import type { Lesson, Question } from "./types.ts";

const R = String.raw;

export const integralLesson: Lesson = {
  basic: [
    { k: "mo", vi: R`Tích phân là diện tích có dấu dưới đồ thị. Phần nằm dưới Ox bị tính âm.`, en: R`An integral is signed area under a graph. The part below Ox counts as negative.` },
    { k: "vd", vi: R`Hình chữ nhật cao $2$, rộng $1$ có diện tích $2$.`, en: R`A rectangle of height $2$ and width $1$ has area $2$.` },
  ],
  exam: [
    { k: "dinh", vi: R`$\int_a^b f=F(b)-F(a)$. Diện tích giữa hai đường là tích phân của đường trên trừ đường dưới.`, en: R`$\int_a^b f=F(b)-F(a)$. Area between two curves is the integral of the upper minus the lower.` },
    { k: "vd", vi: R`$\int_0^2(2x-x^2)\,dx=\dfrac43$. Giữa $y=x$ và $y=x^2$ trên $[0;1]$: $\dfrac16$.`, en: R`$\int_0^2(2x-x^2)\,dx=\dfrac43$. Between $y=x$ and $y=x^2$ on $[0;1]$: $\dfrac16$.` },
    { k: "loi", vi: R`Lấy diện tích mà quên trị tuyệt đối từng miền. Nón $r=3$, $h=6$: $V=18\pi$, không phải $54\pi$.`, en: R`Taking area without the absolute value on each piece. A cone $r=3$, $h=6$: $V=18\pi$, not $54\pi$.` },
    { k: "kiem", vi: R`Một hình chữ nhật trung điểm trên $[0;2]$ cho diện tích $2$, lớn hơn $\dfrac43$.`, en: R`One midpoint rectangle on $[0;2]$ has area $2$, larger than $\dfrac43$.` },
  ],
};

export const integralQuestions: Question[] = [
  {
    id: "int-area",
    prompt: R`$\int_0^2 (2x - x^2)\,dx$ bằng bao nhiêu?`,
    promptEn: R`What is $\int_0^2 (2x - x^2)\,dx$?`,
    choices: [R`$\dfrac{4}{3}$`, R`$2$`, R`$\dfrac{8}{3}$`, R`$4$`],
    choicesEn: [R`$\dfrac{4}{3}$`, R`$2$`, R`$\dfrac{8}{3}$`, R`$4$`],
    answer: 0,
    hint: "Nguyên hàm của 2x là x², của x² là x³/3. Rồi lấy F(2) − F(0).",
    hintEn: "The antiderivative of 2x is x², and of x² is x³/3. Then take F(2) − F(0).",
    steps: [
      R`$\int (2x - x^2)\,dx = x^2 - \dfrac{x^3}{3}$.`,
      R`Tại $2$: $4 - \dfrac{8}{3} = \dfrac{4}{3}$. Tại $0$ là $0$.`,
      R`Số $2$ là một hình chữ nhật trung điểm, rộng $2$ và cao $1$. Số $4$ là chỉ lấy $x^2$ tại cận $2$, quên trừ $\dfrac{x^3}{3}$. Số $\dfrac{8}{3}$ là tính $2^3$ thành $4$ thay vì $8$.`,
    ],
    stepsEn: [
      R`$\int (2x - x^2)\,dx = x^2 - \dfrac{x^3}{3}$.`,
      R`At $2$: $4 - \dfrac{8}{3} = \dfrac{4}{3}$. At $0$ it is $0$.`,
      R`The number $2$ is one midpoint rectangle, width $2$ and height $1$. The number $4$ keeps only $x^2$ at the end and drops $\dfrac{x^3}{3}$. The number $\dfrac{8}{3}$ treats $2^3$ as $4$ instead of $8$.`,
    ],
  },
  {
    id: "int-sign",
    prompt: R`$\int_0^2 (x^2 - 2x)\,dx$ bằng bao nhiêu?`,
    promptEn: R`What is $\int_0^2 (x^2 - 2x)\,dx$?`,
    choices: [R`$-\dfrac{4}{3}$`, R`$\dfrac{4}{3}$`, R`$0$`, R`$-4$`],
    choicesEn: [R`$-\dfrac{4}{3}$`, R`$\dfrac{4}{3}$`, R`$0$`, R`$-4$`],
    answer: 0,
    hint: "Đây là đúng miền vừa rồi, nhưng đường nằm dưới Ox. Tích phân giữ dấu.",
    hintEn: "This is the same region, but the curve is below the x-axis. The integral keeps the sign.",
    steps: [
      R`$x^2 - 2x = -(2x - x^2)$. Nguyên hàm là $\dfrac{x^3}{3} - x^2$.`,
      R`Tại $2$: $\dfrac{8}{3} - 4 = -\dfrac{4}{3}$.`,
      R`Số $\dfrac{4}{3}$ là diện tích hình học, đã bỏ dấu trừ. Cả miền đều nằm dưới Ox, nên không triệt tiêu về $0$. Số $-4$ là quên chia $3$.`,
    ],
    stepsEn: [
      R`$x^2 - 2x = -(2x - x^2)$. An antiderivative is $\dfrac{x^3}{3} - x^2$.`,
      R`At $2$: $\dfrac{8}{3} - 4 = -\dfrac{4}{3}$.`,
      R`The number $\dfrac{4}{3}$ is the geometric area, with the minus dropped. The whole region is below the x-axis, so it does not cancel to $0$. The number $-4$ forgets to divide by $3$.`,
    ],
  },
  {
    id: "int-gap",
    prompt: R`Diện tích hình học giữa $y = x$ và $y = x^2$ trên $[0; 1]$ bằng bao nhiêu?`,
    promptEn: R`What is the geometric area between $y = x$ and $y = x^2$ on $[0, 1]$?`,
    choices: [R`$\dfrac{1}{6}$`, R`$\dfrac{1}{2}$`, R`$\dfrac{1}{3}$`, R`$-\dfrac{1}{6}$`],
    choicesEn: [R`$\dfrac{1}{6}$`, R`$\dfrac{1}{2}$`, R`$\dfrac{1}{3}$`, R`$-\dfrac{1}{6}$`],
    answer: 0,
    hint: "Trên [0; 1], đường y = x nằm trên y = x². Lấy hiệu.",
    hintEn: "On [0, 1] the line y = x is above y = x². Subtract.",
    steps: [
      R`$\int_0^1 x\,dx = \dfrac{1}{2}$. $\int_0^1 x^2\,dx = \dfrac{1}{3}$.`,
      R`Hiệu $\dfrac{1}{2} - \dfrac{1}{3} = \dfrac{1}{6}$.`,
      R`$\dfrac{1}{2}$ và $\dfrac{1}{3}$ mỗi cái chỉ là một đường. $-\dfrac{1}{6}$ là đảo đường trên và đường dưới.`,
    ],
    stepsEn: [
      R`$\int_0^1 x\,dx = \dfrac{1}{2}$. $\int_0^1 x^2\,dx = \dfrac{1}{3}$.`,
      R`The difference $\dfrac{1}{2} - \dfrac{1}{3} = \dfrac{1}{6}$.`,
      R`Each of $\dfrac{1}{2}$ and $\dfrac{1}{3}$ is only one curve. $-\dfrac{1}{6}$ swaps which curve is on top.`,
    ],
  },
  {
    id: "int-volume",
    prompt: R`Quay miền dưới $y = 2x - x^2$, từ $0$ đến $2$, quanh Ox. Thể tích bằng bao nhiêu?`,
    promptEn: R`Revolve the region under $y = 2x - x^2$, from $0$ to $2$, about the x-axis. What is the volume?`,
    choices: [R`$\dfrac{16\pi}{15}$`, R`$\dfrac{4\pi}{3}$`, R`$\dfrac{16\pi}{3}$`, R`$\dfrac{4}{3}$`],
    choicesEn: [R`$\dfrac{16\pi}{15}$`, R`$\dfrac{4\pi}{3}$`, R`$\dfrac{16\pi}{3}$`, R`$\dfrac{4}{3}$`],
    answer: 0,
    hint: "Bán kính lát là y. Công thức đĩa là π nhân tích phân y². y² đã không âm.",
    hintEn: "The slice radius is y. The disk formula is π times the integral of y². y² is already non-negative.",
    steps: [
      R`$(2x - x^2)^2 = 4x^2 - 4x^3 + x^4$.`,
      R`Nguyên hàm $\dfrac{4x^3}{3} - x^4 + \dfrac{x^5}{5}$. Tại $2$: $\dfrac{32}{3} - 16 + \dfrac{32}{5} = \dfrac{16}{15}$.`,
      R`Nhân $\pi$ được $\dfrac{16\pi}{15}$. $\dfrac{4\pi}{3}$ là lấy $\pi$ nhân diện tích $\dfrac{4}{3}$, quên bình phương bán kính. $\dfrac{16\pi}{3}$ là chia $x^5$ cho $3$ thay vì cho $5$. $\dfrac{4}{3}$ là diện tích, chưa nhân $\pi$.`,
    ],
    stepsEn: [
      R`$(2x - x^2)^2 = 4x^2 - 4x^3 + x^4$.`,
      R`An antiderivative is $\dfrac{4x^3}{3} - x^4 + \dfrac{x^5}{5}$. At $2$: $\dfrac{32}{3} - 16 + \dfrac{32}{5} = \dfrac{16}{15}$.`,
      R`Times $\pi$ this is $\dfrac{16\pi}{15}$. $\dfrac{4\pi}{3}$ multiplies the area $\dfrac{4}{3}$ by $\pi$ and forgets to square the radius. $\dfrac{16\pi}{3}$ divides $x^5$ by $3$ instead of by $5$. $\dfrac{4}{3}$ is the area, with no factor of $\pi$.`,
    ],
  },
  {
    id: "int-riemann",
    prompt: R`Trên $[0; 2]$, một hình chữ nhật lấy cao tại trung điểm của $y = 2x - x^2$. Diện tích hình đó bằng bao nhiêu?`,
    promptEn: R`On $[0, 2]$, one rectangle uses the midpoint height of $y = 2x - x^2$. What is that rectangle’s area?`,
    choices: [R`$2$`, R`$\dfrac{4}{3}$`, R`$1$`, R`$4$`],
    choicesEn: [R`$2$`, R`$\dfrac{4}{3}$`, R`$1$`, R`$4$`],
    answer: 0,
    hint: "Trung điểm là x = 1. Cao bằng y(1). Rộng bằng cả đoạn.",
    hintEn: "The midpoint is x = 1. The height is y(1). The width is the whole interval.",
    steps: [
      R`Trung điểm của $[0; 2]$ là $x = 1$. $y(1) = 1$.`,
      R`Rộng $2$, nên diện tích xấp xỉ là $2$.`,
      R`$\dfrac{4}{3}$ là tích phân đúng, khi các dải mỏng dần. Số $1$ chỉ là chiều cao. Số $4$ là rộng nhân $2$ mà không dùng $y(1)$.`,
    ],
    stepsEn: [
      R`The midpoint of $[0, 2]$ is $x = 1$. $y(1) = 1$.`,
      R`The width is $2$, so the approximation is $2$.`,
      R`$\dfrac{4}{3}$ is the exact integral, once the strips get thin. The number $1$ is only the height. The number $4$ multiplies the width by $2$ and never uses $y(1)$.`,
    ],
  },
  {
    id: "int-cone",
    prompt: R`Một ly nón, miệng bán kính $3$ cm, cao $6$ cm, đầy nước. Thể tích nước bằng bao nhiêu?`,
    promptEn: R`A conical glass has rim radius $3$ cm and height $6$ cm, and it is full of water. What is the volume of water?`,
    choices: [R`$18\pi\text{ cm}^3$`, R`$54\pi\text{ cm}^3$`, R`$9\pi\text{ cm}^3$`, R`$6\pi\text{ cm}^3$`],
    choicesEn: [R`$18\pi\text{ cm}^3$`, R`$54\pi\text{ cm}^3$`, R`$9\pi\text{ cm}^3$`, R`$6\pi\text{ cm}^3$`],
    answer: 0,
    hint: "V = (1/3) π r² h. Quên 1/3 là lấy thể tích trụ cùng đáy và cùng cao.",
    hintEn: "V = (1/3) π r² h. Dropping the 1/3 gives the cylinder with the same base and height.",
    steps: [
      R`$r = 3$, $h = 6$. $r^2 h = 54$.`,
      R`Chia $3$ được $18$, rồi nhân $\pi$: $18\pi$. Cùng kết quả với $\pi\int_0^6 \left(\dfrac{x}{2}\right)^2 dx$, vì bán kính tại độ cao $x$ là $\dfrac{x}{2}$.`,
      R`$54\pi$ là thể tích trụ. $9\pi$ là dùng cao bằng bán kính. $6\pi$ là quên bình phương bán kính.`,
    ],
    stepsEn: [
      R`$r = 3$, $h = 6$. $r^2 h = 54$.`,
      R`Divide by $3$ to get $18$, then multiply by $\pi$: $18\pi$. The same number is $\pi\int_0^6 \left(\dfrac{x}{2}\right)^2 dx$, because the radius at height $x$ is $\dfrac{x}{2}$.`,
      R`$54\pi$ is the cylinder. $9\pi$ uses the height as if it were the radius. $6\pi$ forgets to square the radius.`,
    ],
  },
];

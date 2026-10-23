import { apex, archIntegral, archRiemann, coolingTemp, cubic, holeY, rationalOblique, rationalY, secantSlope } from "../lib/math.ts";
import { num } from "./num.ts";
import type { Study } from "./types.ts";

const R = String.raw;

function stripArea(upper: number): number {
  const strips = 480;
  const width = upper / strips;
  let sum = 0;
  for (let i = 0; i < strips; i += 1) {
    const x = (i + 0.5) * width;
    sum += (x - x * x) * width;
  }
  return sum;
}

export const calcStudies: Study[] = [
  {
    id: "lim-r-hole",
    topic: "limit",
    title: "Giá trị sát lỗ hổng",
    titleEn: "Value beside the hole",
    question: R`Hàm bằng $x+1$ khi $x\neq 1$, và $f(1)$ được gán riêng. Khi $h\to 0$, $f(1+h)$ tiến về đâu?`,
    questionEn: R`The function equals $x+1$ for $x\neq 1$, and $f(1)$ is assigned separately. As $h\to 0$, what does $f(1+h)$ approach?`,
    hint: R`Kéo $h$. Thử đổi cả $f(1)$. Ghi $h$ và giá trị tại $1+h$.`,
    hintEn: R`Drag $h$. Also try changing $f(1)$. Record $h$ and the value at $1+h$.`,
    block: R`Chưa đọc được $h$.`,
    blockEn: R`Could not read $h$.`,
    preset: { scene: 0, h: 1, assigned: 5 },
    guesses: [
      { id: "two", vi: R`Tiến về $2$, không phụ thuộc $f(1)$.`, en: R`It approaches $2$, independently of $f(1)$.` },
      { id: "assign", vi: R`Tiến về đúng số đang gán cho $f(1)$.`, en: R`It approaches whatever number is assigned to $f(1)$.` },
      { id: "none", vi: R`Không có giới hạn vì đồ thị bị thủng.`, en: R`There is no limit, because the graph has a hole.` },
    ],
    answerId: "two",
    columns: [
      { key: "h", vi: R`$h$`, en: R`$h$` },
      { key: "y", vi: R`$f(1+h)$`, en: R`$f(1+h)$` },
    ],
    plotX: "h",
    plotY: "y",
    measure: (params) => {
      const h = num(params, "h");
      const y = Math.abs(h) < 1e-9 ? 2 : holeY(1 + h);
      return { h, y };
    },
    formula: (h) => 2 + h,
    tol: 1e-12,
    samples: [{ h: -1.5 }, { h: -0.5 }, { h: 0 }, { h: 0.5 }, { h: 1.5 }],
    result: R`Với $h\neq 0$, $f(1+h)=(1+h)+1=2+h$. Khi $h\to 0$, $2+h\to 2$. Giá trị gán tại đúng $x=1$ không nằm trong các điểm $1+h$.`,
    resultEn: R`For $h\neq 0$, $f(1+h)=(1+h)+1=2+h$. As $h\to 0$, $2+h\to 2$. The value assigned exactly at $x=1$ is not one of the points $1+h$.`,
    follow: R`Nếu đổi $f(1)$ thành $2$, hàm có liên tục tại $x=1$ không?`,
    followEn: R`If $f(1)$ is changed to $2$, is the function continuous at $x=1$?`,
  },
  {
    id: "lim-r-cool",
    topic: "limit",
    title: "Trà nguội về nhiệt phòng",
    titleEn: "Tea cooling to the room",
    question: R`$T(t)=25+60e^{-t/4}$, với $T(0)=85$. Khi $t\to\infty$, nhiệt độ tiến về đâu?`,
    questionEn: R`$T(t)=25+60e^{-t/4}$, with $T(0)=85$. As $t\to\infty$, what temperature does it approach?`,
    hint: R`Kéo thời gian. Ghi $t$ và $T(t)$. Nhìn khoảng cách tới $25$.`,
    hintEn: R`Drag time. Record $t$ and $T(t)$. Watch the gap to $25$.`,
    block: R`Chưa đọc được thời gian.`,
    blockEn: R`Could not read the time.`,
    preset: { scene: 2, time: 0 },
    guesses: [
      { id: "room", vi: R`Tiến về $25$, không về $T(0)$.`, en: R`It approaches $25$, not $T(0)$.` },
      { id: "start", vi: R`Tiến về $T(0)=85$.`, en: R`It approaches $T(0)=85$.` },
      { id: "zero", vi: R`Tiến về $0$.`, en: R`It approaches $0$.` },
    ],
    answerId: "room",
    columns: [
      { key: "t", vi: R`$t$`, en: R`$t$` },
      { key: "temp", vi: R`$T$`, en: R`$T$` },
    ],
    plotX: "t",
    plotY: "temp",
    measure: (params) => {
      const t = num(params, "time");
      return { t, temp: coolingTemp(t) };
    },
    formula: (t) => 25 + 60 * Math.exp(-t / 4),
    tol: 1e-9,
    samples: [{ time: 0 }, { time: 2 }, { time: 4 }, { time: 8 }, { time: 16 }],
    result: R`$e^{-t/4}\to 0$ khi $t\to\infty$, nên $T(t)\to 25$. Hiệu $T(t)-25=60e^{-t/4}$ giảm theo cấp số nhân, nhưng $T(t)$ không bao giờ chạm $25$ với $t$ hữu hạn.`,
    resultEn: R`$e^{-t/4}\to 0$ as $t\to\infty$, so $T(t)\to 25$. The gap $T(t)-25=60e^{-t/4}$ decays exponentially, but $T(t)$ never reaches $25$ at a finite $t$.`,
    follow: R`Sau bao lâu thì hiệu nhiệt còn đúng một nửa, tức còn $30$ độ trên nhiệt phòng?`,
    followEn: R`How long until the gap is exactly half, that is $30$ degrees above the room?`,
  },
  {
    id: "deriv-r-secant",
    topic: "derivative",
    title: "Cát tuyến của $x^2$",
    titleEn: "Secant of $x^2$",
    question: R`Cát tuyến của $f(x)=x^2$ qua $x=1$ và $x=1+h$. Hệ số góc bằng gì, và giới hạn khi $h\to 0$?`,
    questionEn: R`The secant of $f(x)=x^2$ through $x=1$ and $x=1+h$. What is its slope, and what is the limit as $h\to 0$?`,
    hint: R`Kéo $h$, kể cả gần $0$. Ghi $h$ và hệ số góc.`,
    hintEn: R`Drag $h$, including values near $0$. Record $h$ and the slope.`,
    block: R`Chưa đọc được $h$.`,
    blockEn: R`Could not read $h$.`,
    preset: { scene: 0, h: 1 },
    guesses: [
      { id: "line", vi: R`Hệ số góc bằng $2+h$, nên giới hạn là $2$.`, en: R`The slope equals $2+h$, so the limit is $2$.` },
      { id: "const", vi: R`Hệ số góc luôn bằng $2$, với mọi $h$.`, en: R`The slope is $2$ for every $h$.` },
      { id: "sq", vi: R`Hệ số góc bằng $h^2$.`, en: R`The slope equals $h^2$.` },
    ],
    answerId: "line",
    columns: [
      { key: "h", vi: R`$h$`, en: R`$h$` },
      { key: "slope", vi: R`hệ số góc`, en: R`slope` },
    ],
    plotX: "h",
    plotY: "slope",
    measure: (params) => {
      const h = num(params, "h");
      return { h, slope: secantSlope(1, h) };
    },
    formula: (h) => 2 + h,
    tol: 1e-12,
    samples: [{ h: -1.5 }, { h: -0.5 }, { h: 0 }, { h: 0.5 }, { h: 1.5 }],
    result: R`$\dfrac{(1+h)^2-1^2}{h}=\dfrac{2h+h^2}{h}=2+h$ khi $h\neq 0$. Tại $h=0$ đạo hàm là $2$. Vậy cát tuyến tiến về tiếp tuyến hệ số góc $2$.`,
    resultEn: R`$\dfrac{(1+h)^2-1^2}{h}=\dfrac{2h+h^2}{h}=2+h$ when $h\neq 0$. At $h=0$ the derivative is $2$. The secant approaches the tangent of slope $2$.`,
    follow: R`Cùng cách đó với $f(x)=x^3$ tại $x=1$, hệ số góc cát tuyến là $3+3h+h^2$ không?`,
    followEn: R`The same way for $f(x)=x^3$ at $x=1$, is the secant slope $3+3h+h^2$?`,
  },
  {
    id: "deriv-r-apex",
    topic: "derivative",
    title: "Độ cao đỉnh ném",
    titleEn: "Apex of a throw",
    question: R`$h(t)=v_0 t-5t^2$. Độ cao lớn nhất phụ thuộc $v_0$ theo hàm nào?`,
    questionEn: R`$h(t)=v_0 t-5t^2$. Which function of $v_0$ gives the greatest height?`,
    hint: R`Kéo $v_0$. Ghi $v_0$ và độ cao đỉnh. Thời điểm trên thanh không đổi đỉnh.`,
    hintEn: R`Drag $v_0$. Record $v_0$ and the apex height. The time slider does not change the apex.`,
    block: R`Chưa đọc được $v_0$.`,
    blockEn: R`Could not read $v_0$.`,
    preset: { scene: 1, v0: 20, time: 1 },
    guesses: [
      { id: "sq", vi: R`$H=\dfrac{v_0^2}{20}$, đạt tại $t=\dfrac{v_0}{10}$.`, en: R`$H=\dfrac{v_0^2}{20}$, reached at $t=\dfrac{v_0}{10}$.` },
      { id: "lin", vi: R`$H=v_0$, đạt tại $t=1$.`, en: R`$H=v_0$, reached at $t=1$.` },
      { id: "half", vi: R`$H=\dfrac{v_0}{2}$.`, en: R`$H=\dfrac{v_0}{2}$.` },
    ],
    answerId: "sq",
    columns: [
      { key: "v", vi: R`$v_0$`, en: R`$v_0$` },
      { key: "peak", vi: R`$H$`, en: R`$H$` },
    ],
    plotX: "v",
    plotY: "peak",
    measure: (params) => {
      const v = num(params, "v0");
      return { v, peak: apex(v).h };
    },
    formula: (v) => (v * v) / 20,
    tol: 1e-12,
    samples: [{ v0: 8 }, { v0: 12 }, { v0: 20 }, { v0: 24 }, { v0: 30 }],
    result: R`$h'(t)=v_0-10t=0$ tại $t=\dfrac{v_0}{10}$. $h\left(\dfrac{v_0}{10}\right)=v_0\cdot\dfrac{v_0}{10}-5\dfrac{v_0^2}{100}=\dfrac{v_0^2}{20}$.`,
    resultEn: R`$h'(t)=v_0-10t=0$ at $t=\dfrac{v_0}{10}$. $h\left(\dfrac{v_0}{10}\right)=v_0\cdot\dfrac{v_0}{10}-5\dfrac{v_0^2}{100}=\dfrac{v_0^2}{20}$.`,
    follow: R`Thời điểm chạm đất là $t=\dfrac{v_0}{5}$. Quãng thời gian lên và xuống có bằng nhau không?`,
    followEn: R`Landing time is $t=\dfrac{v_0}{5}$. Are the upward and downward times equal?`,
  },
  {
    id: "surv-r-cubic",
    topic: "survey",
    title: "Cực trị của $x^3-3x$",
    titleEn: "Extrema of $x^3-3x$",
    question: R`$y=x^3-3x$. Hoành độ các điểm dừng, và giá trị cực đại, là bao nhiêu?`,
    questionEn: R`$y=x^3-3x$. What are the stationary abscissas, and what is the local maximum?`,
    hint: R`Kéo $x$ qua $-1$ và $1$. Ghi $x$ và $y$. Chỗ $y'=0$ là điểm dừng.`,
    hintEn: R`Drag $x$ through $-1$ and $1$. Record $x$ and $y$. Where $y'=0$ is a stationary point.`,
    block: R`Chưa đọc được $x$.`,
    blockEn: R`Could not read $x$.`,
    preset: { scene: 0, x: -2 },
    guesses: [
      { id: "two", vi: R`Dừng tại $x=\pm 1$. Cực đại $y(-1)=2$.`, en: R`Stationary at $x=\pm 1$. The local maximum is $y(-1)=2$.` },
      { id: "zero", vi: R`Chỉ dừng tại $x=0$, và đó là cực đại.`, en: R`It is stationary only at $x=0$, and that is a maximum.` },
      { id: "none", vi: R`Không có cực trị vì bậc ba.`, en: R`A cubic has no extremum.` },
    ],
    answerId: "two",
    columns: [
      { key: "x", vi: R`$x$`, en: R`$x$` },
      { key: "y", vi: R`$y$`, en: R`$y$` },
    ],
    plotX: "x",
    plotY: "y",
    measure: (params) => {
      const x = num(params, "x");
      return { x, y: cubic(x) };
    },
    formula: (x) => x * x * x - 3 * x,
    tol: 1e-12,
    samples: [{ x: -2 }, { x: -1 }, { x: 0 }, { x: 1 }, { x: 2 }],
    result: R`$y'=3x^2-3=3(x-1)(x+1)$. Đổi dấu tại $\pm 1$. $y(-1)=2$ là cực đại, $y(1)=-2$ là cực tiểu.`,
    resultEn: R`$y'=3x^2-3=3(x-1)(x+1)$. It changes sign at $\pm 1$. $y(-1)=2$ is the local maximum, and $y(1)=-2$ is the local minimum.`,
    follow: R`Với $y=x^3$, $y'(0)=0$ nhưng không đổi dấu. Có cực trị không?`,
    followEn: R`For $y=x^3$, $y'(0)=0$ but the derivative does not change sign. Is there an extremum?`,
  },
  {
    id: "surv-r-gap",
    topic: "survey",
    title: "Khoảng cách tới tiệm cận xiên",
    titleEn: "Gap to the oblique asymptote",
    question: R`$y=\dfrac{x^2}{x-1}$ và tiệm cận xiên $y=x+1$. Hiệu giữa đồ thị và tiệm cận bằng gì?`,
    questionEn: R`$y=\dfrac{x^2}{x-1}$ and the oblique asymptote $y=x+1$. What is the gap between the graph and the asymptote?`,
    hint: R`Kéo $x$, tránh $x=1$. Ghi hiệu $y-(x+1)$.`,
    hintEn: R`Drag $x$, avoiding $x=1$. Record the gap $y-(x+1)$.`,
    block: R`Không ghi tại tiệm cận đứng $x=1$.`,
    blockEn: R`Do not record on the vertical asymptote $x=1$.`,
    preset: { scene: 1, rx: 3 },
    guesses: [
      { id: "inv", vi: R`Hiệu bằng $\dfrac{1}{x-1}$.`, en: R`The gap equals $\dfrac{1}{x-1}$.` },
      { id: "zero", vi: R`Đồ thị cắt tiệm cận nên hiệu đổi dấu và có lúc bằng $0$.`, en: R`The graph crosses the asymptote, so the gap changes sign and is sometimes $0$.` },
      { id: "const", vi: R`Hiệu luôn bằng $1$.`, en: R`The gap is always $1$.` },
    ],
    answerId: "inv",
    columns: [
      { key: "x", vi: R`$x$`, en: R`$x$` },
      { key: "gap", vi: R`hiệu`, en: R`gap` },
    ],
    plotX: "x",
    plotY: "gap",
    measure: (params) => {
      const x = num(params, "rx");
      if (Math.abs(x - 1) < 1e-6) return null;
      const y = rationalY(x);
      if (!Number.isFinite(y)) return null;
      return { x, gap: y - rationalOblique(x) };
    },
    formula: (x) => 1 / (x - 1),
    tol: 1e-9,
    samples: [{ rx: -1 }, { rx: 0 }, { rx: 0.5 }, { rx: 2 }, { rx: 3 }, { rx: 4 }],
    result: R`$\dfrac{x^2}{x-1}=x+1+\dfrac{1}{x-1}$ với $x\neq 1$. Hiệu đúng bằng $\dfrac{1}{x-1}$, không bao giờ $0$. Tiệm cận xiên không cắt đồ thị.`,
    resultEn: R`$\dfrac{x^2}{x-1}=x+1+\dfrac{1}{x-1}$ for $x\neq 1$. The gap is exactly $\dfrac{1}{x-1}$, never $0$. The oblique asymptote does not meet the graph.`,
    follow: R`Điểm $(1;2)$ nằm trên tiệm cận xiên. Nó có thuộc đồ thị không?`,
    followEn: R`The point $(1,2)$ lies on the oblique asymptote. Does it lie on the graph?`,
  },
  {
    id: "int-r-mid",
    topic: "integral",
    title: "Sai số trung điểm",
    titleEn: "Midpoint error",
    question: R`$f(x)=2x-x^2$ trên $[0;2]$. Sai số của tổng trung điểm co về $0$ nhanh cỡ nào khi số dải $n$ tăng?`,
    questionEn: R`$f(x)=2x-x^2$ on $[0,2]$. How fast does the midpoint-rule error shrink as the number of strips $n$ grows?`,
    hint: R`Giữ cận $b=2$. Kéo số dải $n$. Ghi $n$ và sai số $M_n-\int_0^2 f$.`,
    hintEn: R`Keep the limit $b=2$. Drag the strip count $n$. Record $n$ and the error $M_n-\int_0^2 f$.`,
    block: R`Cần ít nhất một dải.`,
    blockEn: R`At least one strip is required.`,
    preset: { scene: 0, upper: 2, strips: 4 },
    guesses: [
      { id: "nsq", vi: R`Sai số bằng $\dfrac{2}{3n^2}$, tức co như $\dfrac{1}{n^2}$.`, en: R`The error equals $\dfrac{2}{3n^2}$, so it shrinks like $\dfrac{1}{n^2}$.` },
      { id: "n", vi: R`Sai số co như $\dfrac{1}{n}$.`, en: R`The error shrinks like $\dfrac{1}{n}$.` },
      { id: "const", vi: R`Sai số không đổi khi tăng $n$.`, en: R`The error does not change as $n$ grows.` },
    ],
    answerId: "nsq",
    columns: [
      { key: "n", vi: R`$n$`, en: R`$n$` },
      { key: "err", vi: R`sai số`, en: R`error` },
    ],
    plotX: "n",
    plotY: "err",
    measure: (params) => {
      const n = Math.round(num(params, "strips", 1));
      const upper = num(params, "upper", 2);
      if (n < 1) return null;
      return { n, err: archRiemann(n, upper) - archIntegral(upper) };
    },
    formula: (n, params) => {
      const count = Math.round(n);
      const upper = num(params, "upper", 2);
      return (upper * upper * upper) / (12 * count * count);
    },
    tol: 1e-8,
    samples: [{ strips: 2 }, { strips: 4 }, { strips: 6 }, { strips: 8 }, { strips: 12 }, { strips: 24 }],
    result: R`$f''(x)=-2$. Sai số tổng trung điểm trên $[0;b]$ là $\dfrac{b^3}{12n^2}$. Với $b=2$ thì sai số bằng $\dfrac{2}{3n^2}$. Nhân thêm $n^2$ được hằng số $\dfrac{2}{3}$.`,
    resultEn: R`$f''(x)=-2$. The composite midpoint error on $[0,b]$ is $\dfrac{b^3}{12n^2}$. For $b=2$ the error is $\dfrac{2}{3n^2}$. Multiplying by $n^2$ leaves the constant $\dfrac{2}{3}$.`,
    follow: R`Nếu dùng tổng bên trái thay cho trung điểm, sai số còn co như $\dfrac{1}{n^2}$ không?`,
    followEn: R`If you use left rectangles instead of midpoints, does the error still shrink like $\dfrac{1}{n^2}$?`,
  },
  {
    id: "int-r-area",
    topic: "integral",
    title: "Diện tích giữa hai đồ thị",
    titleEn: "Area between two graphs",
    question: R`Trên $[0;a]$ với $0<a\le 1$, diện tích giữa $y=x$ và $y=x^2$ là hàm gì của $a$, và lớn nhất tại đâu?`,
    questionEn: R`On $[0,a]$ with $0<a\le 1$, what function of $a$ is the area between $y=x$ and $y=x^2$, and where is it largest?`,
    hint: R`Kéo $a$. Ghi $a$ và diện tích. Trên thanh này $a\le 1$.`,
    hintEn: R`Drag $a$. Record $a$ and the area. On this slider $a\le 1$.`,
    block: R`Cần $a>0$.`,
    blockEn: R`Need $a>0$.`,
    preset: { scene: 1, gap: 0.5 },
    guesses: [
      { id: "end", vi: R`$S=\dfrac{a^2}{2}-\dfrac{a^3}{3}$, lớn nhất tại $a=1$, $S=\dfrac{1}{6}$.`, en: R`$S=\dfrac{a^2}{2}-\dfrac{a^3}{3}$, largest at $a=1$, where $S=\dfrac{1}{6}$.` },
      { id: "half", vi: R`$S=\dfrac{a}{2}$, lớn nhất tại $a=1$.`, en: R`$S=\dfrac{a}{2}$, largest at $a=1$.` },
      { id: "mid", vi: R`Lớn nhất tại $a=\dfrac{1}{2}$.`, en: R`The maximum is at $a=\dfrac{1}{2}$.` },
    ],
    answerId: "end",
    columns: [
      { key: "a", vi: R`$a$`, en: R`$a$` },
      { key: "area", vi: R`$S$`, en: R`$S$` },
    ],
    plotX: "a",
    plotY: "area",
    measure: (params) => {
      const a = num(params, "gap");
      if (!(a > 0)) return null;
      return { a, area: stripArea(a) };
    },
    formula: (a) => (a * a) / 2 - (a * a * a) / 3,
    tol: 1e-5,
    samples: [{ gap: 0.2 }, { gap: 0.4 }, { gap: 0.6 }, { gap: 0.8 }, { gap: 1 }],
    result: R`$\int_0^a(x-x^2)\,dx=\dfrac{a^2}{2}-\dfrac{a^3}{3}$. Đạo hàm $a-a^2=a(1-a)\ge 0$ trên $[0;1]$, nên $S$ tăng và lớn nhất tại $a=1$: $S=\dfrac{1}{2}-\dfrac{1}{3}=\dfrac{1}{6}$.`,
    resultEn: R`$\int_0^a(x-x^2)\,dx=\dfrac{a^2}{2}-\dfrac{a^3}{3}$. The derivative $a-a^2=a(1-a)\ge 0$ on $[0,1]$, so $S$ increases and is largest at $a=1$: $S=\dfrac{1}{2}-\dfrac{1}{3}=\dfrac{1}{6}$.`,
    follow: R`Nếu cho $a>1$, cực đại toàn cục của $S(a)$ còn nằm ở $a=1$ không?`,
    followEn: R`If $a>1$ is allowed, is the global maximum of $S(a)$ still at $a=1$?`,
  },
];

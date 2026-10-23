import { amGm, arithSum, cauchyPair, decayMass, geomPartial, quadStudy, yearsToDouble } from "../lib/math.ts";
import { num } from "./num.ts";
import type { Study } from "./types.ts";

const R = String.raw;

export const algebraStudies: Study[] = [
  {
    id: "quad-r-locus",
    topic: "quadratic",
    title: "Quỹ tích đỉnh",
    titleEn: "Vertex locus",
    question: R`Giữ $a=1$ và $c=0$, kéo $b$. Đỉnh của $y=ax^2+bx+c$ chạy trên đường nào?`,
    questionEn: R`Keep $a=1$ and $c=0$, and drag $b$. Which curve does the vertex of $y=ax^2+bx+c$ trace?`,
    hint: R`Chỉ kéo $b$. Giữ $a$ và $c$. Mỗi giá trị $b$ bấm Ghi một lần.`,
    hintEn: R`Drag only $b$. Leave $a$ and $c$ fixed. Press Record once for each $b$.`,
    block: R`Cần $a\neq 0$ thì mới có đỉnh.`,
    blockEn: R`A vertex needs $a\neq 0$.`,
    preset: { scene: 0, a: 1, b: -4, c: 0 },
    guesses: [
      { id: "line", vi: R`Một đường thẳng.`, en: R`A straight line.` },
      { id: "para", vi: R`Parabol $y=c-ax^2$, quay xuống khi $a>0$.`, en: R`The parabola $y=c-ax^2$, opening downward when $a>0$.` },
      { id: "circ", vi: R`Một đường tròn tâm $O$.`, en: R`A circle centered at the origin.` },
    ],
    answerId: "para",
    columns: [
      { key: "b", vi: R`$b$`, en: R`$b$` },
      { key: "vx", vi: R`$x_I$`, en: R`$x_V$` },
      { key: "vy", vi: R`$y_I$`, en: R`$y_V$` },
    ],
    plotX: "vx",
    plotY: "vy",
    measure: (params) => {
      const a = num(params, "a");
      const b = num(params, "b");
      const c = num(params, "c");
      if (Math.abs(a) < 1e-9) return null;
      const vx = -b / (2 * a);
      const vy = a * vx * vx + b * vx + c;
      return { b, vx, vy };
    },
    formula: (x, params) => num(params, "c") - num(params, "a", 1) * x * x,
    tol: 1e-9,
    samples: [{ b: -4 }, { b: -2 }, { b: 0 }, { b: 2 }, { b: 4 }],
    result: R`$x_I=-\dfrac{b}{2a}$ và $y_I=ax_I^2+bx_I+c=c-\dfrac{b^2}{4a}$. Thế $b=-2ax_I$ được $y_I=c-ax_I^2$. Với $a=1$, $c=0$ thì $y=-x^2$.`,
    resultEn: R`$x_V=-\dfrac{b}{2a}$ and $y_V=ax_V^2+bx_V+c=c-\dfrac{b^2}{4a}$. Substituting $b=-2ax_V$ gives $y_V=c-ax_V^2$. For $a=1$, $c=0$, this is $y=-x^2$.`,
    follow: R`Nếu giữ $b,c$ và đổi $a$, các đỉnh còn nằm trên một parabol không?`,
    followEn: R`If $b$ and $c$ stay fixed while $a$ changes, do the vertices still lie on one parabola?`,
  },
  {
    id: "quad-r-slopes",
    topic: "quadratic",
    title: "Tổng hệ số góc tiếp tuyến",
    titleEn: "Sum of tangent slopes",
    question: R`Với $a=1$, $c=0$ và $\Delta>0$, tổng hệ số góc của hai tiếp tuyến tại hai nghiệm bằng bao nhiêu?`,
    questionEn: R`For $a=1$, $c=0$ and $\Delta>0$, what is the sum of the tangent slopes at the two roots?`,
    hint: R`Kéo $b$ khác $0$ để có hai nghiệm. Ghi $b$ và tổng hai hệ số góc.`,
    hintEn: R`Drag $b$ away from $0$ so there are two roots. Record $b$ and the sum of the two slopes.`,
    block: R`Cần $\Delta>0$ thì mới có hai tiếp tuyến tại hai nghiệm.`,
    blockEn: R`Two tangent lines at two roots need $\Delta>0$.`,
    preset: { scene: 0, a: 1, b: -4, c: 0 },
    guesses: [
      { id: "zero", vi: R`Tổng luôn bằng $0$.`, en: R`The sum is always $0$.` },
      { id: "b", vi: R`Tổng bằng $b$.`, en: R`The sum equals $b$.` },
      { id: "twoa", vi: R`Tổng bằng $2a$.`, en: R`The sum equals $2a$.` },
    ],
    answerId: "zero",
    columns: [
      { key: "b", vi: R`$b$`, en: R`$b$` },
      { key: "s1", vi: R`$f'(x_1)$`, en: R`$f'(x_1)$` },
      { key: "s2", vi: R`$f'(x_2)$`, en: R`$f'(x_2)$` },
      { key: "sum", vi: R`tổng`, en: R`sum` },
    ],
    plotX: "b",
    plotY: "sum",
    measure: (params) => {
      const a = num(params, "a");
      const b = num(params, "b");
      const c = num(params, "c");
      const study = quadStudy(a, b, c);
      const x1 = study.roots[0];
      const x2 = study.roots[1];
      if (x1 === undefined || x2 === undefined) return null;
      const s1 = 2 * a * x1 + b;
      const s2 = 2 * a * x2 + b;
      return { b, s1, s2, sum: s1 + s2 };
    },
    formula: () => 0,
    tol: 1e-9,
    samples: [{ b: -6 }, { b: -4 }, { b: -2 }, { b: 2 }, { b: 4 }, { b: 6 }],
    result: R`$f'(x)=2ax+b$. Nếu $x_1+x_2=-\dfrac{b}{a}$ thì $f'(x_1)+f'(x_2)=2a(x_1+x_2)+2b=-2b+2b=0$.`,
    resultEn: R`$f'(x)=2ax+b$. With $x_1+x_2=-\dfrac{b}{a}$, $f'(x_1)+f'(x_2)=2a(x_1+x_2)+2b=-2b+2b=0$.`,
    follow: R`Tích $f'(x_1)f'(x_2)$ bằng $-\Delta$ hay bằng $\Delta$?`,
    followEn: R`Is the product $f'(x_1)f'(x_2)$ equal to $-\Delta$ or to $\Delta$?`,
  },
  {
    id: "ineq-r-amgm",
    topic: "ineq",
    title: "Dấu bằng AM–GM",
    titleEn: "AM–GM equality",
    question: R`Giữ $a=4>0$ và kéo $b>0$. Hiệu $\dfrac{a+b}{2}-\sqrt{ab}$ bằng $0$ khi nào?`,
    questionEn: R`Keep $a=4>0$ and drag $b>0$. When is $\dfrac{a+b}{2}-\sqrt{ab}$ equal to $0$?`,
    hint: R`Kéo $b$ qua lại, kể cả $b=a$. Ghi hiệu hai trung bình.`,
    hintEn: R`Drag $b$, including the case $b=a$. Record the gap between the two means.`,
    block: R`AM–GM cần $a>0$ và $b>0$.`,
    blockEn: R`AM–GM needs $a>0$ and $b>0$.`,
    preset: { scene: 0, a: 4, b: 9 },
    guesses: [
      { id: "eq", vi: R`Bằng $0$ đúng khi $a=b$.`, en: R`It is $0$ exactly when $a=b$.` },
      { id: "always", vi: R`Luôn bằng $0$.`, en: R`It is always $0$.` },
      { id: "never", vi: R`Không bao giờ bằng $0$.`, en: R`It is never $0$.` },
    ],
    answerId: "eq",
    columns: [
      { key: "b", vi: R`$b$`, en: R`$b$` },
      { key: "gap", vi: R`AM$-$GM`, en: R`AM$-$GM` },
    ],
    plotX: "b",
    plotY: "gap",
    measure: (params) => {
      const a = num(params, "a");
      const b = num(params, "b");
      const means = amGm(a, b);
      if (!means) return null;
      return { b, gap: means.am - means.gm };
    },
    formula: (b, params) => {
      const a = num(params, "a");
      if (a <= 0 || b <= 0) return Number.NaN;
      const gap = Math.sqrt(a) - Math.sqrt(b);
      return (gap * gap) / 2;
    },
    tol: 1e-9,
    samples: [{ b: 1 }, { b: 2 }, { b: 4 }, { b: 6 }, { b: 9 }, { b: 12 }],
    result: R`$\dfrac{a+b}{2}-\sqrt{ab}=\dfrac{(\sqrt{a}-\sqrt{b})^2}{2}\ge 0$. Bình phương bằng $0$ khi $\sqrt{a}=\sqrt{b}$, tức $a=b$.`,
    resultEn: R`$\dfrac{a+b}{2}-\sqrt{ab}=\dfrac{(\sqrt{a}-\sqrt{b})^2}{2}\ge 0$. The square is $0$ when $\sqrt{a}=\sqrt{b}$, so $a=b$.`,
    follow: R`Với ba số dương, dấu bằng trong AM–GM còn đòi cả ba bằng nhau không?`,
    followEn: R`For three positive numbers, does AM–GM equality still require all three to be equal?`,
  },
  {
    id: "ineq-r-cauchy",
    topic: "ineq",
    title: "Độ hở Cauchy",
    titleEn: "Cauchy gap",
    question: R`Giữ $(p;q)=(1;2)$ và $(c)=(3)$, kéo $d$. Độ hở $(p^2+q^2)(c^2+d^2)-(pc+qd)^2$ bằng gì?`,
    questionEn: R`Keep $(p,q)=(1,2)$ and $c=3$, and drag $d$. What is the gap $(p^2+q^2)(c^2+d^2)-(pc+qd)^2$?`,
    hint: R`Kéo $d$. Ghi độ hở. Chú ý chỗ độ hở chạm $0$.`,
    hintEn: R`Drag $d$. Record the gap. Notice where the gap touches $0$.`,
    block: R`Chưa tính được độ hở.`,
    blockEn: R`The gap could not be computed.`,
    preset: { scene: 1, p: 1, q: 2, c: 3, d: 1 },
    guesses: [
      { id: "sq", vi: R`Độ hở bằng $(pd-qc)^2$.`, en: R`The gap equals $(pd-qc)^2$.` },
      { id: "abs", vi: R`Độ hở bằng $|pd-qc|$.`, en: R`The gap equals $|pd-qc|$.` },
      { id: "zero", vi: R`Độ hở luôn bằng $0$.`, en: R`The gap is always $0$.` },
    ],
    answerId: "sq",
    columns: [
      { key: "d", vi: R`$d$`, en: R`$d$` },
      { key: "gap", vi: R`độ hở`, en: R`gap` },
    ],
    plotX: "d",
    plotY: "gap",
    measure: (params) => {
      const p = num(params, "p");
      const q = num(params, "q");
      const c = num(params, "c");
      const d = num(params, "d");
      const pair = cauchyPair(p, q, c, d);
      return { d, gap: pair.left - pair.right };
    },
    formula: (d, params) => {
      const p = num(params, "p", 1);
      const q = num(params, "q", 2);
      const c = num(params, "c", 3);
      const cross = p * d - q * c;
      return cross * cross;
    },
    tol: 1e-8,
    samples: [{ d: -6 }, { d: -2 }, { d: 0 }, { d: 2 }, { d: 6 }],
    result: R`$(p^2+q^2)(c^2+d^2)-(pc+qd)^2=(pd-qc)^2$. Dấu bằng khi $pd=qc$, tức hai bộ số tỉ lệ.`,
    resultEn: R`$(p^2+q^2)(c^2+d^2)-(pc+qd)^2=(pd-qc)^2$. Equality holds when $pd=qc$, so the two pairs are proportional.`,
    follow: R`Nếu $(c;d)=(2;4)$, độ hở còn phụ thuộc $(p;q)$ không?`,
    followEn: R`If $(c,d)=(2,4)$, does the gap still depend on $(p,q)$?`,
  },
  {
    id: "exp-r-log",
    topic: "exp",
    title: "Log của phân rã",
    titleEn: "Log of decay",
    question: R`$m(t)=80\cdot\left(\dfrac{1}{2}\right)^{t/10}$. Đồ thị của $\log_{10} m$ theo $t$ có dạng gì?`,
    questionEn: R`$m(t)=80\cdot\left(\dfrac{1}{2}\right)^{t/10}$. What shape is $\log_{10} m$ against $t$?`,
    hint: R`Kéo thời gian $t$. Ghi $t$ và $\log_{10} m$.`,
    hintEn: R`Drag the time $t$. Record $t$ and $\log_{10} m$.`,
    block: R`Khối lượng phải dương thì mới có logarit.`,
    blockEn: R`The mass has to be positive before it has a logarithm.`,
    preset: { scene: 2, massTime: 0 },
    guesses: [
      { id: "line", vi: R`Một đường thẳng, hệ số góc âm.`, en: R`A straight line with negative slope.` },
      { id: "exp", vi: R`Một đường mũ.`, en: R`An exponential curve.` },
      { id: "flat", vi: R`Một đường nằm ngang.`, en: R`A horizontal line.` },
    ],
    answerId: "line",
    columns: [
      { key: "t", vi: R`$t$`, en: R`$t$` },
      { key: "log", vi: R`$\log_{10} m$`, en: R`$\log_{10} m$` },
    ],
    plotX: "t",
    plotY: "log",
    measure: (params) => {
      const t = num(params, "massTime");
      const mass = decayMass(t);
      if (!(mass > 0)) return null;
      return { t, log: Math.log10(mass) };
    },
    formula: (t) => Math.log10(80) - (t / 10) * Math.log10(2),
    tol: 1e-9,
    samples: [{ massTime: 0 }, { massTime: 8 }, { massTime: 12 }, { massTime: 20 }, { massTime: 40 }],
    result: R`$\log_{10} m=\log_{10} 80-\dfrac{t}{10}\log_{10} 2$. Đây là hàm bậc nhất của $t$, hệ số góc $-\dfrac{\log_{10} 2}{10}<0$.`,
    resultEn: R`$\log_{10} m=\log_{10} 80-\dfrac{t}{10}\log_{10} 2$. This is linear in $t$, with slope $-\dfrac{\log_{10} 2}{10}<0$.`,
    follow: R`Nếu vẽ $\ln m$ thay cho $\log_{10} m$, hệ số góc đổi thế nào?`,
    followEn: R`If you plot $\ln m$ instead of $\log_{10} m$, how does the slope change?`,
  },
  {
    id: "exp-r-double",
    topic: "exp",
    title: "Thời gian gấp đôi",
    titleEn: "Doubling time",
    question: R`Vốn nhân $(1+r)$ mỗi năm, với $r$ là lãi suất dạng thập phân. Sau bao nhiêu năm thì vốn gấp đôi?`,
    questionEn: R`A principal is multiplied by $(1+r)$ each year, with $r$ the rate as a decimal. How many years until it doubles?`,
    hint: R`Kéo lãi suất phần trăm. Ghi số năm để gấp đôi. Trên hình, đường «gấp đôi» là mốc $2$ lần vốn gốc.`,
    hintEn: R`Drag the percent rate. Record the years needed to double. On the figure, the double line is twice the principal.`,
    block: R`Lãi suất cần dương.`,
    blockEn: R`The rate has to be positive.`,
    preset: { scene: 1, rate: 8, years: 5 },
    guesses: [
      { id: "ln", vi: R`$t=\dfrac{\ln 2}{\ln(1+r)}$.`, en: R`$t=\dfrac{\ln 2}{\ln(1+r)}$.` },
      { id: "rule", vi: R`$t=\dfrac{72}{100r}$ đúng cho mọi $r$.`, en: R`$t=\dfrac{72}{100r}$ for every $r$.` },
      { id: "inv", vi: R`$t=\dfrac{1}{r}$.`, en: R`$t=\dfrac{1}{r}$.` },
    ],
    answerId: "ln",
    columns: [
      { key: "r", vi: R`$r$ (%)`, en: R`$r$ (%)` },
      { key: "t", vi: R`$t$`, en: R`$t$` },
    ],
    plotX: "r",
    plotY: "t",
    measure: (params) => {
      const rate = num(params, "rate");
      const t = yearsToDouble(rate);
      if (!Number.isFinite(t)) return null;
      return { r: rate, t };
    },
    formula: (rate) => Math.log(2) / Math.log(1 + rate / 100),
    tol: 1e-9,
    samples: [{ rate: 4 }, { rate: 8 }, { rate: 10 }, { rate: 12 }, { rate: 20 }],
    result: R`$(1+r)^t=2$ nên $t\ln(1+r)=\ln 2$, với $r$ là lãi suất thập phân. Trên thanh trượt, $8$ nghĩa là $r=0{,}08$.`,
    resultEn: R`$(1+r)^t=2$ gives $t\ln(1+r)=\ln 2$, where $r$ is the decimal rate. On the slider, $8$ means $r=0.08$.`,
    follow: R`Quy tắc $72$ gần đúng $\dfrac{\ln 2}{\ln(1+r)}$ khi $r$ nhỏ. Sai số tại $8\%$ là bao nhiêu năm?`,
    followEn: R`The rule of $72$ approximates $\dfrac{\ln 2}{\ln(1+r)}$ for small $r$. How many years is the error at $8\%$?`,
  },
  {
    id: "seq-r-arith",
    topic: "sequence",
    title: "Tổng cấp số cộng",
    titleEn: "Arithmetic sum",
    question: R`$u_1=3$, $d=4$. Tổng $S_n=u_1+\cdots+u_n$ là hàm gì của $n$?`,
    questionEn: R`$u_1=3$, $d=4$. What kind of function of $n$ is $S_n=u_1+\cdots+u_n$?`,
    hint: R`Kéo $n$. Giữ $u_1$ và $d$. Ghi $n$ và $S_n$.`,
    hintEn: R`Drag $n$. Leave $u_1$ and $d$ fixed. Record $n$ and $S_n$.`,
    block: R`Cần $n\ge 1$.`,
    blockEn: R`Need $n\ge 1$.`,
    preset: { scene: 0, u1: 3, d: 4, n: 1 },
    guesses: [
      { id: "quad", vi: R`$S_n$ là hàm bậc hai của $n$.`, en: R`$S_n$ is a quadratic function of $n$.` },
      { id: "lin", vi: R`$S_n$ là hàm bậc nhất của $n$.`, en: R`$S_n$ is linear in $n$.` },
      { id: "exp", vi: R`$S_n$ là hàm mũ của $n$.`, en: R`$S_n$ is exponential in $n$.` },
    ],
    answerId: "quad",
    columns: [
      { key: "n", vi: R`$n$`, en: R`$n$` },
      { key: "sum", vi: R`$S_n$`, en: R`$S_n$` },
    ],
    plotX: "n",
    plotY: "sum",
    measure: (params) => {
      const n = Math.round(num(params, "n", 1));
      if (n < 1) return null;
      const u1 = num(params, "u1", 3);
      const d = num(params, "d", 4);
      return { n, sum: arithSum(u1, d, n) };
    },
    formula: (n, params) => {
      const count = Math.round(n);
      const u1 = num(params, "u1", 3);
      const d = num(params, "d", 4);
      return (count / 2) * (2 * u1 + (count - 1) * d);
    },
    tol: 1e-9,
    samples: [{ n: 1 }, { n: 3 }, { n: 5 }, { n: 8 }, { n: 12 }],
    result: R`$u_n=u_1+(n-1)d$, nên $S_n=\dfrac{n}{2}\bigl(2u_1+(n-1)d\bigr)=\dfrac{d}{2}n^2+\left(u_1-\dfrac{d}{2}\right)n$. Có $n^2$ nên $S_n$ bậc hai.`,
    resultEn: R`$u_n=u_1+(n-1)d$, so $S_n=\dfrac{n}{2}\bigl(2u_1+(n-1)d\bigr)=\dfrac{d}{2}n^2+\left(u_1-\dfrac{d}{2}\right)n$. The $n^2$ term makes $S_n$ quadratic.`,
    follow: R`Nếu $d=0$, $S_n$ còn bậc hai không?`,
    followEn: R`If $d=0$, is $S_n$ still quadratic?`,
  },
  {
    id: "seq-r-geom",
    topic: "sequence",
    title: "Tổng cấp số nhân",
    titleEn: "Geometric sum",
    question: R`$u_1=8$, $q=\dfrac{1}{2}$. Tổng riêng $S_n$ tiến về số nào khi $n$ tăng?`,
    questionEn: R`$u_1=8$, $q=\dfrac{1}{2}$. Which number does the partial sum $S_n$ approach as $n$ grows?`,
    hint: R`Kéo số hạng $n$. Ghi $S_n$. So với $16$.`,
    hintEn: R`Drag the term count $n$. Record $S_n$. Compare it with $16$.`,
    block: R`Cần $n\ge 1$ và $q\neq 1$.`,
    blockEn: R`Need $n\ge 1$ and $q\neq 1$.`,
    preset: { scene: 1, g1: 8, q: 0.5, gn: 1 },
    guesses: [
      { id: "16", vi: R`$S_n\to\dfrac{u_1}{1-q}=16$.`, en: R`$S_n\to\dfrac{u_1}{1-q}=16$.` },
      { id: "8", vi: R`$S_n\to u_1=8$.`, en: R`$S_n\to u_1=8$.` },
      { id: "inf", vi: R`$S_n$ tăng không giới hạn.`, en: R`$S_n$ grows without bound.` },
    ],
    answerId: "16",
    columns: [
      { key: "n", vi: R`$n$`, en: R`$n$` },
      { key: "sum", vi: R`$S_n$`, en: R`$S_n$` },
    ],
    plotX: "n",
    plotY: "sum",
    measure: (params) => {
      const n = Math.round(num(params, "gn", 1));
      const u1 = num(params, "g1", 8);
      const q = num(params, "q", 0.5);
      if (n < 1 || Math.abs(q - 1) < 1e-12) return null;
      return { n, sum: geomPartial(u1, q, n) };
    },
    formula: (n, params) => {
      const count = Math.round(n);
      const u1 = num(params, "g1", 8);
      const q = num(params, "q", 0.5);
      return (u1 * (1 - q ** count)) / (1 - q);
    },
    tol: 1e-9,
    samples: [{ gn: 1 }, { gn: 2 }, { gn: 4 }, { gn: 6 }, { gn: 8 }],
    result: R`$S_n=u_1\dfrac{1-q^n}{1-q}$. Vì $|q|<1$, $q^n\to 0$ nên $S_n\to\dfrac{u_1}{1-q}=\dfrac{8}{1/2}=16$. Phần đuôi còn lại là $u_1\dfrac{q^n}{1-q}$.`,
    resultEn: R`$S_n=u_1\dfrac{1-q^n}{1-q}$. Since $|q|<1$, $q^n\to 0$, so $S_n\to\dfrac{u_1}{1-q}=\dfrac{8}{1/2}=16$. The remaining tail is $u_1\dfrac{q^n}{1-q}$.`,
    follow: R`Nếu $q=-1/2$, tổng vô hạn còn bằng $u_1/(1-q)$ không?`,
    followEn: R`If $q=-1/2$, is the infinite sum still $u_1/(1-q)$?`,
  },
  {
    id: "trig-r-one",
    topic: "trig",
    title: "Bình phương sin và cos",
    titleEn: "Sine and cosine squares",
    question: R`Kéo góc $\alpha$. $\sin^2\alpha+\cos^2\alpha$ phụ thuộc $\alpha$ thế nào?`,
    questionEn: R`Drag the angle $\alpha$. How does $\sin^2\alpha+\cos^2\alpha$ depend on $\alpha$?`,
    hint: R`Kéo $\alpha$ khắp vòng tròn. Ghi tổng hai bình phương.`,
    hintEn: R`Drag $\alpha$ around the circle. Record the sum of the two squares.`,
    block: R`Chưa đọc được góc.`,
    blockEn: R`The angle could not be read.`,
    preset: { scene: 0, angle: 30 },
    guesses: [
      { id: "one", vi: R`Tổng luôn bằng $1$.`, en: R`The sum is always $1$.` },
      { id: "sin", vi: R`Tổng bằng $\sin 2\alpha$.`, en: R`The sum equals $\sin 2\alpha$.` },
      { id: "grow", vi: R`Tổng tăng theo $\alpha$.`, en: R`The sum increases with $\alpha$.` },
    ],
    answerId: "one",
    columns: [
      { key: "deg", vi: R`$\alpha$ (độ)`, en: R`$\alpha$ (degrees)` },
      { key: "sum", vi: R`tổng`, en: R`sum` },
    ],
    plotX: "deg",
    plotY: "sum",
    measure: (params) => {
      const deg = num(params, "angle");
      const rad = (deg * Math.PI) / 180;
      const s = Math.sin(rad);
      const c = Math.cos(rad);
      return { deg, sum: s * s + c * c };
    },
    formula: () => 1,
    tol: 1e-12,
    samples: [{ angle: 0 }, { angle: 30 }, { angle: 45 }, { angle: 150 }, { angle: 270 }, { angle: 360 }],
    result: R`Trên vòng tròn đơn vị, điểm $(\cos\alpha;\sin\alpha)$ có $x^2+y^2=1$. Đó là $\cos^2\alpha+\sin^2\alpha=1$ với mọi $\alpha$.`,
    resultEn: R`On the unit circle, the point $(\cos\alpha,\sin\alpha)$ satisfies $x^2+y^2=1$. That is $\cos^2\alpha+\sin^2\alpha=1$ for every $\alpha$.`,
    follow: R`$\sin^2\alpha-\cos^2\alpha$ có đơn giản thành $-\cos 2\alpha$ không?`,
    followEn: R`Does $\sin^2\alpha-\cos^2\alpha$ simplify to $-\cos 2\alpha$?`,
  },
  {
    id: "trig-r-double",
    topic: "trig",
    title: "Tích sin nhân cos",
    titleEn: "Sine times cosine",
    question: R`Kéo $\alpha$. Tích $\sin\alpha\cos\alpha$ lớn nhất bằng bao nhiêu, và tại góc nào trong $[0^\circ;90^\circ]$?`,
    questionEn: R`Drag $\alpha$. What is the maximum of $\sin\alpha\cos\alpha$, and at which angle in $[0^\circ,90^\circ]$?`,
    hint: R`Kéo $\alpha$ từ $0^\circ$ đến $90^\circ$. Ghi tích. Nhìn chỗ đỉnh.`,
    hintEn: R`Drag $\alpha$ from $0^\circ$ to $90^\circ$. Record the product. Look for the peak.`,
    block: R`Chưa đọc được góc.`,
    blockEn: R`The angle could not be read.`,
    preset: { scene: 0, angle: 15 },
    guesses: [
      { id: "half", vi: R`Lớn nhất $\dfrac{1}{2}$ tại $45^\circ$.`, en: R`The maximum is $\dfrac{1}{2}$ at $45^\circ$.` },
      { id: "one", vi: R`Lớn nhất $1$ tại $90^\circ$.`, en: R`The maximum is $1$ at $90^\circ$.` },
      { id: "zero", vi: R`Tích luôn bằng $0$.`, en: R`The product is always $0$.` },
    ],
    answerId: "half",
    columns: [
      { key: "deg", vi: R`$\alpha$ (độ)`, en: R`$\alpha$ (degrees)` },
      { key: "prod", vi: R`tích`, en: R`product` },
    ],
    plotX: "deg",
    plotY: "prod",
    measure: (params) => {
      const deg = num(params, "angle");
      const rad = (deg * Math.PI) / 180;
      return { deg, prod: Math.sin(rad) * Math.cos(rad) };
    },
    formula: (deg) => 0.5 * Math.sin((2 * deg * Math.PI) / 180),
    tol: 1e-12,
    samples: [{ angle: 15 }, { angle: 30 }, { angle: 45 }, { angle: 60 }, { angle: 90 }, { angle: 120 }],
    result: R`$\sin\alpha\cos\alpha=\dfrac{1}{2}\sin 2\alpha$. Trên $[0^\circ;90^\circ]$, $2\alpha$ chạy tới $180^\circ$, nên $\sin 2\alpha$ lớn nhất $1$ tại $2\alpha=90^\circ$, tức $\alpha=45^\circ$. Tích lớn nhất là $\dfrac{1}{2}$.`,
    resultEn: R`$\sin\alpha\cos\alpha=\dfrac{1}{2}\sin 2\alpha$. On $[0^\circ,90^\circ]$, $2\alpha$ reaches $180^\circ$, so $\sin 2\alpha$ peaks at $1$ when $2\alpha=90^\circ$, that is $\alpha=45^\circ$. The product peaks at $\dfrac{1}{2}$.`,
    follow: R`Tổng $\sin\alpha+\cos\alpha$ lớn nhất tại góc nào?`,
    followEn: R`At which angle is $\sin\alpha+\cos\alpha$ largest?`,
  },
];

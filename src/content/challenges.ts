import {
  amGm, apex, arithSum, arithTerm, archIntegral, archRiemann, archVolumeCoeff, arrange, bayes, betweenIntegral, binom,
  bouncePath, brakeMotion, cauchyPair, circlePlace, comb, compoundAmount, coolingTemp, cosDeg, cubicSecond, cubicSlope, decayMass,
  delta, det2, expY, geomInfinite, jumpStudy, lineDist, medianOf, meanOf, planeDist, projectile, pureCubicSlope, pyramidVolume,
  quadStudy, fence, secantSlope, sinDeg, solve2, tetraVolume, treeHeight, triArea, boxVolume, vec3Dot, workshopOk, workshopProfit, baseOk,
} from "../lib/math.ts";
import {
  analyticInit, analyticRange, chanceInit, chanceRange, comboInit, comboRange, derivInit, derivRange, expInit, expRange,
  ineqInit, ineqRange, integralInit, integralRange, limitInit, limitRange, quadInit, quadRange, seqInit, seqRange,
  shapeInit, shapeRange, surveyInit, surveyRange, trigInit, trigRange, vectorInit, vectorRange, type Range,
} from "./params.ts";

export type Values = Record<string, number>;
type Key = keyof typeof quadInit | keyof typeof ineqInit | keyof typeof expInit | keyof typeof seqInit | keyof typeof trigInit
  | keyof typeof limitInit | keyof typeof derivInit | keyof typeof surveyInit | keyof typeof integralInit | keyof typeof chanceInit
  | keyof typeof vectorInit | keyof typeof analyticInit | keyof typeof shapeInit | keyof typeof comboInit;
/** Every lab parameter as a plain number, so checks read `v.a` without undefined noise. */
export type Dense = Record<Key, number>;
/** How a check talks: `n` writes a number for the language, `s` picks the sentence. */
export type Say = { en: boolean; n: (x: number) => string; m: (x: number) => string; s: (vi: string, en: string) => string };
export type Verdict = { ok: boolean; why: string };
export type Bi = { vi: string; en: string };

export type Challenge = {
  id: string;
  vi: string;
  en: string;
  /** Presets the lab to the start of the challenge. */
  set: Values;
  /** Optional predict-first question. `answer` indexes `options`. */
  guess?: { vi: string; en: string; options: Bi[]; answer: number; why: Bi };
  /** 1 easy, 2 medium, 3 hard. Older challenges leave it out. */
  level?: 1 | 2 | 3;
  /** One nudge shown on request, without giving the answer. */
  hint?: Bi;
  /** A solution, used for the hint and by the tests. */
  sol: Values;
  check: (v: Dense, say: Say) => Verdict;
};

export type LabSpec = { init: Values; range: Range; challenges: Challenge[] };

export function makeSay(en: boolean): Say {
  const n = (x: number): string => {
    const r = Math.round(x * 100) / 100;
    const text = (Object.is(r, -0) ? 0 : r).toString().replace("-", "-");
    return en ? text : text.replace(".", "{,}");
  };
  return { en, n, m: (x) => `$${n(x)}$`, s: (vi, e) => (en ? e : vi) };
}

type Test = [boolean, string, string];
/** First failing test explains the miss; passing every test gives the reason it works. */
export function judge(say: Say, tests: Test[], good: [string, string]): Verdict {
  const bad = tests.find((test) => !test[0]);
  return bad ? { ok: false, why: say.s(bad[1], bad[2]) } : { ok: true, why: say.s(good[0], good[1]) };
}
export const near = (a: number, b: number, tol = 1e-6) => Math.abs(a - b) <= tol;

const quadratic: Challenge[] = [
  {
    id: "q-down-two",
    vi: "Chỉnh $a$, $b$, $c$ để parabol bề lõm xuống và cắt trục $Ox$ tại hai điểm phân biệt.",
    en: "Set $a$, $b$ and $c$ so the parabola opens downward and crosses the $Ox$ axis at two different points.",
    set: { scene: 0, a: 1, b: -2, c: -3 },
    guess: {
      vi: "Nếu $a<0$ thì đỉnh parabol là điểm cao nhất hay thấp nhất?",
      en: "If $a<0$, is the vertex of the parabola its highest or its lowest point?",
      options: [{ vi: "Cao nhất", en: "Highest" }, { vi: "Thấp nhất", en: "Lowest" }],
      answer: 0,
      why: { vi: "$a<0$ làm bề lõm hướng xuống nên đỉnh là điểm cao nhất.", en: "$a<0$ opens the parabola downward, so the vertex is the highest point." },
    },
    sol: { scene: 0, a: -1, b: 0, c: 4 },
    check: (v, say) => {
      const d = delta(v.a, v.b, v.c);
      return judge(
        say,
        [
          [v.a < 0, `Bề lõm đang hướng lên hoặc là đường thẳng vì $a=${say.n(v.a)}$ chưa âm.`, `The parabola does not open downward because $a=${say.n(v.a)}$ is not negative.`],
          [d > 1e-9, `$\\Delta=b^2-4ac=${say.n(d)}$ chưa dương nên chưa có hai giao điểm với $Ox$.`, `$\\Delta=b^2-4ac=${say.n(d)}$ is not positive, so there are not two intersections with $Ox$.`],
        ],
        [`$a=${say.n(v.a)}<0$ và $\\Delta=${say.n(d)}>0$: bề lõm xuống, hai giao điểm với $Ox$.`, `$a=${say.n(v.a)}<0$ and $\\Delta=${say.n(d)}>0$: it opens downward with two intersections on $Ox$.`],
      );
    },
  },
  {
    id: "q-vertex",
    vi: "Đặt đỉnh parabol tại $(2;\\ 1)$ và để bề lõm hướng xuống.",
    en: "Put the vertex of the parabola at $(2,\\ 1)$ and make it open downward.",
    set: { scene: 0, a: 1, b: -2, c: -3 },
    sol: { scene: 0, a: -1, b: 4, c: -3 },
    check: (v, say) => {
      const s = quadStudy(v.a, v.b, v.c).vertex;
      const vx = s ? s.x : Number.NaN;
      const vy = s ? s.y : Number.NaN;
      return judge(
        say,
        [
          [v.a < 0, `Bề lõm chưa hướng xuống: $a=${say.n(v.a)}$.`, `It does not open downward yet: $a=${say.n(v.a)}$.`],
          [near(vx, 2, 0.06), `Hoành độ đỉnh $-\\frac{b}{2a}=${say.n(vx)}$, cần bằng $2$.`, `The vertex abscissa $-\\frac{b}{2a}=${say.n(vx)}$ should be $2$.`],
          [near(vy, 1, 0.06), `Tung độ đỉnh bằng $${say.n(vy)}$, cần bằng $1$.`, `The vertex ordinate is $${say.n(vy)}$, it should be $1$.`],
        ],
        [`Đỉnh $(${say.n(vx)};\\ ${say.n(vy)})$ và $a<0$.`, `Vertex $(${say.n(vx)},\\ ${say.n(vy)})$ with $a<0$.`],
      );
    },
  },
  {
    id: "q-vertex-form",
    vi: "Ở dạng đỉnh, đưa đỉnh về $(-2;\\ 3)$ và chọn $a$ để parabol vẫn cắt $Ox$.",
    en: "In vertex form, move the vertex to $(-2,\\ 3)$ and choose $a$ so the parabola still crosses $Ox$.",
    set: { scene: 1, va: 1, vh: 1, vk: -4 },
    sol: { scene: 1, va: -1, vh: -2, vk: 3 },
    check: (v, say) =>
      judge(
        say,
        [
          [near(v.vh, -2, 0.06) && near(v.vk, 3, 0.06), `Đỉnh đang ở $(${say.n(v.vh)};\\ ${say.n(v.vk)})$, cần ở $(-2;\\ 3)$.`, `The vertex is at $(${say.n(v.vh)},\\ ${say.n(v.vk)})$, it should be at $(-2,\\ 3)$.`],
          [v.va < 0, `Đỉnh nằm phía trên $Ox$ nên phải có $a<0$ để đồ thị đi xuống cắt trục. Hiện $a=${say.n(v.va)}$.`, `The vertex lies above $Ox$, so $a<0$ is needed for the graph to come down and cross it. Now $a=${say.n(v.va)}$.`],
        ],
        [`Đỉnh $(-2;\\ 3)$ nằm trên $Ox$ và $a<0$, nên có hai giao điểm.`, `The vertex $(-2,\\ 3)$ is above $Ox$ and $a<0$, so there are two intersections.`],
      ),
  },
  {
    id: "q-fence",
    vi: "Tìm $x$ để diện tích chuồng $S=x(40-2x)$ lớn nhất.",
    en: "Find $x$ that makes the area $S=x(40-2x)$ of the pen as large as possible.",
    set: { scene: 2, fence: 3 },
    sol: { scene: 2, fence: 10 },
    check: (v, say) => {
      const area = fence(v.fence).area;
      return judge(
        say,
        [[area >= 200 - 1e-9, `Với $x=${say.n(v.fence)}$ diện tích mới là $${say.n(area)}$, còn có thể lớn hơn.`, `With $x=${say.n(v.fence)}$ the area is only $${say.n(area)}$, it can get bigger.`]],
        [`$x=${say.n(v.fence)}$ cho $S=${say.n(area)}$, gần giá trị lớn nhất $200$ tại $x=10$.`, `$x=${say.n(v.fence)}$ gives $S=${say.n(area)}$, close to the maximum $200$ at $x=10$.`],
      );
    },
  },
];

const ineq: Challenge[] = [
  {
    id: "i-equal",
    vi: "Chọn $a$ và $b$ dương để trung bình cộng bằng trung bình nhân.",
    en: "Choose positive $a$ and $b$ so the arithmetic mean equals the geometric mean.",
    set: { scene: 0, a: 4, b: 9 },
    guess: {
      vi: "Dấu bằng của bất đẳng thức Cô-si xảy ra khi nào?",
      en: "When does equality hold in the AM-GM inequality?",
      options: [{ vi: "Khi $a<b$", en: "When $a<b$" }, { vi: "Khi $a=b$", en: "When $a=b$" }, { vi: "Với mọi $a$, $b$", en: "For every $a$ and $b$" }],
      answer: 1,
      why: { vi: "$\\frac{a+b}{2}\\ge\\sqrt{ab}$ và dấu bằng chỉ khi $a=b$.", en: "$\\frac{a+b}{2}\\ge\\sqrt{ab}$ with equality only when $a=b$." },
    },
    sol: { scene: 0, a: 6, b: 6 },
    check: (v, say) => {
      const m = amGm(v.a, v.b);
      return judge(
        say,
        [
          [m !== null, `Cần $a>0$ và $b>0$.`, `Both $a>0$ and $b>0$ are needed.`],
          [m !== null && near(m.am, m.gm, 1e-9), `Trung bình cộng $${say.n(m?.am ?? 0)}$ còn lớn hơn trung bình nhân $${say.n(m?.gm ?? 0)}$ vì $a\\ne b$.`, `The arithmetic mean $${say.n(m?.am ?? 0)}$ is still above the geometric mean $${say.n(m?.gm ?? 0)}$ because $a\\ne b$.`],
        ],
        [`$a=b=${say.n(v.a)}$ nên hai trung bình cùng bằng $${say.n(v.a)}$.`, `$a=b=${say.n(v.a)}$, so both means equal $${say.n(v.a)}$.`],
      );
    },
  },
  {
    id: "i-sum10",
    vi: "Giữ $a+b=10$ và làm tích $ab$ lớn nhất.",
    en: "Keep $a+b=10$ and make the product $ab$ as large as possible.",
    set: { scene: 0, a: 2, b: 8 },
    sol: { scene: 0, a: 5, b: 5 },
    check: (v, say) =>
      judge(
        say,
        [
          [near(v.a + v.b, 10, 1e-9), `Tổng đang là $${say.n(v.a + v.b)}$, cần giữ bằng $10$.`, `The sum is $${say.n(v.a + v.b)}$, it must stay $10$.`],
          [v.a * v.b >= 24.999, `Tích hiện là $${say.n(v.a * v.b)}$, còn lớn hơn được.`, `The product is $${say.n(v.a * v.b)}$, it can still grow.`],
        ],
        [`$a=b=5$ cho tích lớn nhất $25$, đúng vì $ab\\le\\left(\\frac{a+b}{2}\\right)^2=25$.`, `$a=b=5$ gives the largest product $25$, since $ab\\le\\left(\\frac{a+b}{2}\\right)^2=25$.`],
      ),
  },
  {
    id: "i-cauchy",
    vi: "Chọn bốn số để bất đẳng thức Bu-nhi-a-cốp-xki xảy ra dấu bằng, với mỗi cặp không đồng thời bằng $0$.",
    en: "Choose four numbers so the Cauchy-Schwarz inequality becomes an equality, with neither pair both zero.",
    set: { scene: 1, p: 1, q: 2, c: 3, d: 4 },
    sol: { scene: 1, p: 1, q: 2, c: 2, d: 4 },
    check: (v, say) => {
      const pair = cauchyPair(v.p, v.q, v.c, v.d);
      return judge(
        say,
        [
          [v.p !== 0 || v.q !== 0, `Cặp $(a;\\ b)$ đang bằng $(0;\\ 0)$.`, `The pair $(a,\\ b)$ is $(0,\\ 0)$.`],
          [v.c !== 0 || v.d !== 0, `Cặp $(c;\\ d)$ đang bằng $(0;\\ 0)$.`, `The pair $(c,\\ d)$ is $(0,\\ 0)$.`],
          [pair.equal, `Vế trái $${say.n(pair.left)}$ lớn hơn vế phải $${say.n(pair.right)}$, vì $ad-bc=${say.n(v.p * v.d - v.q * v.c)}\\ne0$.`, `Left $${say.n(pair.left)}$ is above right $${say.n(pair.right)}$, because $ad-bc=${say.n(v.p * v.d - v.q * v.c)}\\ne0$.`],
        ],
        [`Hai vế cùng bằng $${say.n(pair.left)}$ vì $ad-bc=0$: hai cặp tỉ lệ.`, `Both sides equal $${say.n(pair.left)}$ since $ad-bc=0$: the two pairs are proportional.`],
      );
    },
  },
  {
    id: "i-workshop-max",
    vi: "Tìm $(x;\\ y)$ trong miền cho lợi nhuận $P=5x+3y$ lớn nhất.",
    en: "Find $(x,\\ y)$ inside the region that gives the largest profit $P=5x+3y$.",
    set: { scene: 2, x: 2, y: 2 },
    sol: { scene: 2, x: 6, y: 4 },
    check: (v, say) =>
      judge(
        say,
        [
          [workshopOk(v.x, v.y), `Điểm $(${say.n(v.x)};\\ ${say.n(v.y)})$ nằm ngoài miền, chưa thỏa các ràng buộc.`, `The point $(${say.n(v.x)},\\ ${say.n(v.y)})$ is outside the region and breaks a constraint.`],
          [workshopProfit(v.x, v.y) >= 42 - 1e-9, `Lợi nhuận $P=${say.n(workshopProfit(v.x, v.y))}$, còn chưa đạt cực đại.`, `Profit $P=${say.n(workshopProfit(v.x, v.y))}$ is not the maximum yet.`],
        ],
        [`$(6;\\ 4)$ là đỉnh của miền, cho $P=42$ lớn nhất.`, `$(6,\\ 4)$ is a corner of the region and gives the maximum $P=42$.`],
      ),
  },
  {
    id: "i-workshop-out",
    vi: "Tìm một điểm ngoài miền mà $P$ lớn hơn $42$; lời báo sẽ cho thấy vì sao điểm đó không dùng được.",
    en: "Find a point outside the region with $P$ above $42$; the feedback will show why it cannot be used.",
    set: { scene: 2, x: 2, y: 2 },
    sol: { scene: 2, x: 8, y: 4 },
    check: (v, say) =>
      judge(
        say,
        [
          [!workshopOk(v.x, v.y), `Điểm này còn nằm trong miền.`, `This point is still inside the region.`],
          [workshopProfit(v.x, v.y) > 42, `$P=${say.n(workshopProfit(v.x, v.y))}$ chưa vượt $42$.`, `$P=${say.n(workshopProfit(v.x, v.y))}$ does not beat $42$ yet.`],
        ],
        [`$P=${say.n(workshopProfit(v.x, v.y))}>42$ nhưng điểm vi phạm ràng buộc gỗ hoặc công, nên không dùng được.`, `$P=${say.n(workshopProfit(v.x, v.y))}>42$ but the point breaks the wood or labour limit, so it cannot be used.`],
      ),
  },
];

const exp: Challenge[] = [
  {
    id: "e-decreasing",
    vi: "Chọn cơ số $a$ hợp lệ để hàm $y=a^x$ nghịch biến.",
    en: "Choose a valid base $a$ so that $y=a^x$ is decreasing.",
    set: { scene: 0, base: 2, x: 2 },
    guess: {
      vi: "Khi $0<a<1$, hàm $a^x$ tăng hay giảm?",
      en: "When $0<a<1$, does $a^x$ rise or fall?",
      options: [{ vi: "Tăng", en: "Rise" }, { vi: "Giảm", en: "Fall" }],
      answer: 1,
      why: { vi: "Nhân liên tiếp một số nhỏ hơn $1$ làm giá trị nhỏ dần.", en: "Repeatedly multiplying by a number below $1$ makes the value shrink." },
    },
    sol: { scene: 0, base: 0.5, x: 2 },
    check: (v, say) =>
      judge(
        say,
        [
          [baseOk(v.base), `Cơ số $a=${say.n(v.base)}$ quá gần $1$: khi đó $a^x$ gần như hằng số.`, `The base $a=${say.n(v.base)}$ is too close to $1$: $a^x$ is nearly constant.`],
          [v.base < 1, `$a=${say.n(v.base)}>1$ nên hàm đồng biến.`, `$a=${say.n(v.base)}>1$ so the function is increasing.`],
        ],
        [`$0<a=${say.n(v.base)}<1$ nên hàm nghịch biến.`, `$0<a=${say.n(v.base)}<1$ so the function is decreasing.`],
      ),
  },
  {
    id: "e-eight",
    vi: "Chọn $a$ và $x$ để $a^x=8$.",
    en: "Choose $a$ and $x$ so that $a^x=8$.",
    set: { scene: 0, base: 3, x: 1 },
    sol: { scene: 0, base: 2, x: 3 },
    check: (v, say) => {
      const y = expY(v.base, v.x);
      return judge(
        say,
        [
          [baseOk(v.base), `Cơ số chưa hợp lệ.`, `The base is not valid.`],
          [near(y, 8, 1e-6), `$a^x=${say.n(y)}$, cần bằng $8$.`, `$a^x=${say.n(y)}$, it should be $8$.`],
        ],
        [`$${say.n(v.base)}^{${say.n(v.x)}}=${say.n(y)}\\approx8$.`, `$${say.n(v.base)}^{${say.n(v.x)}}=${say.n(y)}\\approx8$.`],
      );
    },
  },
  {
    id: "e-double",
    vi: "Chọn lãi suất và số năm (không quá $8$ năm) để $10$ triệu lãi kép tăng gấp đôi.",
    en: "Choose a rate and a number of years (at most $8$) so that $10$ million at compound interest doubles.",
    set: { scene: 1, rate: 5, years: 4 },
    sol: { scene: 1, rate: 10, years: 8 },
    check: (v, say) => {
      const total = compoundAmount(v.rate, v.years);
      return judge(
        say,
        [
          [v.years <= 8, `Số năm $${say.n(v.years)}$ vượt $8$.`, `The $${say.n(v.years)}$ years exceed $8$.`],
          [total >= 20, `Sau $${say.n(v.years)}$ năm chỉ được $${say.n(total)}$ triệu, chưa tới $20$.`, `After $${say.n(v.years)}$ years there is only $${say.n(total)}$ million, below $20$.`],
        ],
        [`$10\\cdot(1+${say.n(v.rate / 100)})^{${say.n(v.years)}}=${say.n(total)}\\ge20$ triệu.`, `$10\\cdot(1+${say.n(v.rate / 100)})^{${say.n(v.years)}}=${say.n(total)}\\ge20$ million.`],
      );
    },
  },
  {
    id: "e-halflife",
    vi: "Chất phóng xạ nặng $80$ g, chu kỳ bán rã $10$ năm. Tìm $t$ để còn đúng $10$ g.",
    en: "A radioactive sample weighs $80$ g with a half-life of $10$ years. Find $t$ so exactly $10$ g remain.",
    set: { scene: 2, massTime: 5 },
    sol: { scene: 2, massTime: 30 },
    check: (v, say) => {
      const mass = decayMass(v.massTime);
      return judge(
        say,
        [[near(mass, 10, 1e-6), `Sau $${say.n(v.massTime)}$ năm còn $${say.n(mass)}$ g, cần $10$ g.`, `After $${say.n(v.massTime)}$ years $${say.n(mass)}$ g remain, it should be $10$ g.`]],
        [`$80\\cdot\\left(\\frac{1}{2}\\right)^{3}=10$: ba chu kỳ bán rã, tức $30$ năm.`, `$80\\cdot\\left(\\frac{1}{2}\\right)^{3}=10$: three half-lives, that is $30$ years.`],
      );
    },
  },
];

const sequence: Challenge[] = [
  {
    id: "s-term",
    vi: "Cấp số cộng có công sai dương: chọn $u_1$, $d$, $n$ để số hạng thứ $n$ bằng $25$.",
    en: "For an arithmetic sequence with a positive common difference, choose $u_1$, $d$ and $n$ so the $n$th term equals $25$.",
    set: { scene: 0, u1: 3, d: 4, n: 3 },
    sol: { scene: 0, u1: 1, d: 4, n: 7 },
    check: (v, say) => {
      const term = arithTerm(v.u1, v.d, v.n);
      return judge(
        say,
        [
          [v.d > 0, `Công sai $d=${say.n(v.d)}$ chưa dương.`, `The common difference $d=${say.n(v.d)}$ is not positive.`],
          [near(term, 25, 1e-9), `$u_n=u_1+(n-1)d=${say.n(term)}$, cần bằng $25$.`, `$u_n=u_1+(n-1)d=${say.n(term)}$, it should be $25$.`],
        ],
        [`$u_n=${say.n(v.u1)}+(${say.n(v.n)}-1)\\cdot${say.n(v.d)}=25$.`, `$u_n=${say.n(v.u1)}+(${say.n(v.n)}-1)\\cdot${say.n(v.d)}=25$.`],
      );
    },
  },
  {
    id: "s-sum",
    vi: "Chọn $u_1$, $d$, $n$ để tổng $n$ số hạng đầu bằng $100$.",
    en: "Choose $u_1$, $d$ and $n$ so the sum of the first $n$ terms is $100$.",
    set: { scene: 0, u1: 3, d: 4, n: 10 },
    sol: { scene: 0, u1: 1, d: 2, n: 10 },
    check: (v, say) => {
      const sum = arithSum(v.u1, v.d, v.n);
      return judge(
        say,
        [[near(sum, 100, 1e-9), `$S_n=${say.n(sum)}$, cần bằng $100$.`, `$S_n=${say.n(sum)}$, it should be $100$.`]],
        [`$S_n=\\frac{n(u_1+u_n)}{2}=100$.`, `$S_n=\\frac{n(u_1+u_n)}{2}=100$.`],
      );
    },
  },
  {
    id: "s-geom",
    vi: "Cấp số nhân lùi vô hạn: chọn $u_1$ và $q$ để tổng $S=\\frac{u_1}{1-q}$ bằng $12$.",
    en: "Infinite geometric series: choose $u_1$ and $q$ so the sum $S=\\frac{u_1}{1-q}$ equals $12$.",
    set: { scene: 1, g1: 3, q: 0.5, gn: 6 },
    sol: { scene: 1, g1: 6, q: 0.5, gn: 6 },
    check: (v, say) => {
      const sum = geomInfinite(v.g1, v.q);
      return judge(
        say,
        [
          [sum !== null, `Cần $|q|<1$ để tổng vô hạn tồn tại, mà $q=${say.n(v.q)}$.`, `Need $|q|<1$ for the infinite sum to exist, but $q=${say.n(v.q)}$.`],
          [sum !== null && near(sum, 12, 1e-6), `$S=${say.n(sum ?? 0)}$, cần bằng $12$.`, `$S=${say.n(sum ?? 0)}$, it should be $12$.`],
        ],
        [`$S=\\frac{${say.n(v.g1)}}{1-${say.n(v.q)}}=12$.`, `$S=\\frac{${say.n(v.g1)}}{1-${say.n(v.q)}}=12$.`],
      );
    },
  },
  {
    id: "s-bounce",
    vi: "Quả bóng nảy lên bằng một nửa độ cao trước. Chọn độ cao thả và tỉ số để quãng đường tổng cộng đúng $24$ m.",
    en: "A ball rebounds to half its previous height. Choose the drop height and ratio so the total path is exactly $24$ m.",
    set: { scene: 2, drop: 4, ratio: 0.5, months: 12 },
    sol: { scene: 2, drop: 8, ratio: 0.5, months: 12 },
    check: (v, say) => {
      const path = bouncePath(v.drop, v.ratio);
      return judge(
        say,
        [[path !== null && near(path, 24, 1e-6), `Quãng đường là $${say.n(path ?? 0)}$ m, cần $24$ m.`, `The path is $${say.n(path ?? 0)}$ m, it should be $24$ m.`]],
        [`$${say.n(v.drop)}+2\\cdot\\frac{${say.n(v.drop * v.ratio)}}{1-${say.n(v.ratio)}}=24$ m.`, `$${say.n(v.drop)}+2\\cdot\\frac{${say.n(v.drop * v.ratio)}}{1-${say.n(v.ratio)}}=24$ m.`],
      );
    },
  },
];

const trig: Challenge[] = [
  {
    id: "t-sin-half",
    vi: "Tìm góc có $\\sin\\alpha=\\frac{1}{2}$ nằm ở góc phần tư thứ hai.",
    en: "Find the angle with $\\sin\\alpha=\\frac{1}{2}$ in the second quadrant.",
    set: { scene: 0, angle: 30 },
    sol: { scene: 0, angle: 150 },
    check: (v, say) =>
      judge(
        say,
        [
          [near(sinDeg(v.angle), 0.5, 1e-6), `$\\sin${say.n(v.angle)}^\\circ=${say.n(sinDeg(v.angle))}$, cần bằng $0{,}5$.`.replace("0{,}5", say.en ? "0.5" : "0{,}5"), `$\\sin${say.n(v.angle)}^\\circ=${say.n(sinDeg(v.angle))}$, it should be $0.5$.`],
          [cosDeg(v.angle) < 0, `$\\cos\\alpha>0$ nên góc ở góc phần tư thứ nhất, không phải thứ hai.`, `$\\cos\\alpha>0$ so the angle is in the first quadrant, not the second.`],
        ],
        [`$150^\\circ=180^\\circ-30^\\circ$: sin giữ nguyên, cos đổi dấu.`, `$150^\\circ=180^\\circ-30^\\circ$: sine is kept, cosine changes sign.`],
      ),
  },
  {
    id: "t-sin-cos",
    vi: "Tìm góc để $\\sin\\alpha=\\cos\\alpha$.",
    en: "Find an angle where $\\sin\\alpha=\\cos\\alpha$.",
    set: { scene: 0, angle: 100 },
    guess: {
      vi: "Trong $[0^\\circ;\\ 360^\\circ]$ có mấy góc thỏa $\\sin\\alpha=\\cos\\alpha$?",
      en: "How many angles in $[0^\\circ,\\ 360^\\circ]$ satisfy $\\sin\\alpha=\\cos\\alpha$?",
      options: [{ vi: "$1$ góc", en: "$1$ angle" }, { vi: "$2$ góc", en: "$2$ angles" }, { vi: "$4$ góc", en: "$4$ angles" }],
      answer: 1,
      why: { vi: "$\\tan\\alpha=1$ cho $45^\\circ$ và $225^\\circ$.", en: "$\\tan\\alpha=1$ gives $45^\\circ$ and $225^\\circ$." },
    },
    sol: { scene: 0, angle: 45 },
    check: (v, say) =>
      judge(
        say,
        [[near(sinDeg(v.angle), cosDeg(v.angle), 1e-6), `$\\sin=${say.n(sinDeg(v.angle))}$ còn $\\cos=${say.n(cosDeg(v.angle))}$, chưa bằng nhau.`, `$\\sin=${say.n(sinDeg(v.angle))}$ but $\\cos=${say.n(cosDeg(v.angle))}$, they are not equal.`]],
        [`Hai giá trị cùng bằng $${say.n(sinDeg(v.angle))}$: $\\tan\\alpha=1$.`, `Both equal $${say.n(sinDeg(v.angle))}$: $\\tan\\alpha=1$.`],
      ),
  },
  {
    id: "t-tree",
    vi: "Chọn khoảng cách và góc ngẩng để cây cao khoảng $21{,}5$ m (mắt cao $1{,}5$ m).",
    en: "Choose a distance and an angle so the tree is about $21.5$ m tall (eye height $1.5$ m).",
    set: { scene: 1, distance: 20, tilt: 30 },
    sol: { scene: 1, distance: 20, tilt: 45 },
    check: (v, say) => {
      const h = treeHeight(v.distance, v.tilt);
      return judge(
        say,
        [[near(h, 21.5, 0.3), `Chiều cao tính được $d\\tan\\alpha+1{,}5=${say.n(h)}$ m, cần gần $21{,}5$ m.`.replace("1{,}5", say.en ? "1.5" : "1{,}5").replace("21{,}5", say.en ? "21.5" : "21{,}5"), `The computed height $d\\tan\\alpha+1.5=${say.n(h)}$ m should be close to $21.5$ m.`]],
        [`$d\\tan\\alpha+1{,}5=${say.n(h)}$ m, gần $21{,}5$ m.`.replace(/1\{,\}5/g, say.en ? "1.5" : "1{,}5").replace("21{,}5", say.en ? "21.5" : "21{,}5"), `$d\\tan\\alpha+1.5=${say.n(h)}$ m, close to $21.5$ m.`],
      );
    },
  },
];

const limit: Challenge[] = [
  {
    id: "l-fill-hole",
    vi: "Chọn $f(1)$ để hàm liên tục tại $x=1$.",
    en: "Choose $f(1)$ so the function is continuous at $x=1$.",
    set: { scene: 0, h: 1, assigned: 5 },
    sol: { scene: 0, h: 1, assigned: 2 },
    check: (v, say) =>
      judge(
        say,
        [[near(v.assigned, 2, 1e-9), `$f(1)=${say.n(v.assigned)}$ nhưng giới hạn bằng $2$, nên đồ thị vẫn bị đứt.`, `$f(1)=${say.n(v.assigned)}$ but the limit is $2$, so the graph is still broken.`]],
        [`$f(1)=2=\\lim_{x\\to1}f(x)$: lấp đúng lỗ hổng.`, `$f(1)=2=\\lim_{x\\to1}f(x)$: the hole is filled exactly.`],
      ),
  },
  {
    id: "l-limit-not-cont",
    vi: "Chọn giá trị trái, phải và $f(0)$ để giới hạn tại $0$ tồn tại nhưng hàm không liên tục.",
    en: "Choose the left value, the right value and $f(0)$ so the limit at $0$ exists but the function is not continuous.",
    set: { scene: 1, left: -1, right: 1, at: 0 },
    sol: { scene: 1, left: 1, right: 1, at: 2 },
    check: (v, say) => {
      const s = jumpStudy(v.left, v.right, v.at);
      return judge(
        say,
        [
          [s.exists, `Giới hạn trái $${say.n(v.left)}$ khác giới hạn phải $${say.n(v.right)}$ nên giới hạn không tồn tại.`, `The left limit $${say.n(v.left)}$ differs from the right limit $${say.n(v.right)}$, so the limit does not exist.`],
          [!s.continuous, `$f(0)=${say.n(v.at)}$ bằng giới hạn nên hàm đang liên tục.`, `$f(0)=${say.n(v.at)}$ equals the limit, so the function is continuous.`],
        ],
        [`Giới hạn là $${say.n(v.left)}$ nhưng $f(0)=${say.n(v.at)}$: tồn tại giới hạn mà không liên tục.`, `The limit is $${say.n(v.left)}$ but $f(0)=${say.n(v.at)}$: the limit exists without continuity.`],
      );
    },
  },
  {
    id: "l-continuous",
    vi: "Chọn lại ba giá trị để hàm liên tục tại $0$.",
    en: "Choose the three values again so the function is continuous at $0$.",
    set: { scene: 1, left: 1, right: 1, at: 2 },
    sol: { scene: 1, left: 1, right: 1, at: 1 },
    check: (v, say) => {
      const s = jumpStudy(v.left, v.right, v.at);
      return judge(
        say,
        [
          [s.exists, `Hai giới hạn một phía chưa bằng nhau.`, `The two one-sided limits are not equal yet.`],
          [s.continuous, `Giới hạn là $${say.n(v.left)}$ nhưng $f(0)=${say.n(v.at)}$.`, `The limit is $${say.n(v.left)}$ but $f(0)=${say.n(v.at)}$.`],
        ],
        [`Giới hạn trái, phải và $f(0)$ cùng bằng $${say.n(v.at)}$.`, `Left limit, right limit and $f(0)$ all equal $${say.n(v.at)}$.`],
      );
    },
  },
  {
    id: "l-tea",
    vi: "Tìm $t$ để trà nguội xuống dưới $30^\\circ\\mathrm{C}$ (nhiệt độ phòng $25^\\circ\\mathrm{C}$).",
    en: "Find $t$ so the tea cools below $30^\\circ\\mathrm{C}$ (room temperature $25^\\circ\\mathrm{C}$).",
    set: { scene: 2, time: 0 },
    sol: { scene: 2, time: 12 },
    check: (v, say) => {
      const temp = coolingTemp(v.time);
      return judge(
        say,
        [[temp < 30, `Sau $${say.n(v.time)}$ phút trà còn $${say.n(temp)}^\\circ\\mathrm{C}$, chưa dưới $30$.`, `After $${say.n(v.time)}$ minutes the tea is $${say.n(temp)}^\\circ\\mathrm{C}$, not below $30$ yet.`]],
        [`$T=${say.n(temp)}^\\circ\\mathrm{C}<30$; nhiệt độ tiến về $25$ nhưng không bao giờ chạm.`, `$T=${say.n(temp)}^\\circ\\mathrm{C}<30$; it approaches $25$ but never reaches it.`],
      );
    },
  },
];

const derivative: Challenge[] = [
  {
    id: "d-secant",
    vi: "Chọn $h\\ne0$ nhỏ để hệ số góc cát tuyến lệch hệ số góc tiếp tuyến ($2$) dưới $0{,}1$.",
    en: "Choose a small $h\\ne0$ so the secant slope is within $0.1$ of the tangent slope ($2$).",
    set: { scene: 0, h: 1 },
    sol: { scene: 0, h: 0.05 },
    check: (v, say) => {
      const slope = secantSlope(1, v.h);
      return judge(
        say,
        [
          [Math.abs(v.h) > 0.001, `$h=0$ không tính được hệ số góc cát tuyến.`, `$h=0$ gives no secant slope.`],
          [Math.abs(slope - 2) < 0.1, `Cát tuyến có hệ số góc $2+h=${say.n(slope)}$, còn lệch $${say.n(Math.abs(slope - 2))}$.`, `The secant slope is $2+h=${say.n(slope)}$, still off by $${say.n(Math.abs(slope - 2))}$.`],
        ],
        [`$2+h=${say.n(slope)}$ gần $2$ khi $h$ nhỏ.`, `$2+h=${say.n(slope)}$ is near $2$ when $h$ is small.`],
      );
    },
  },
  {
    id: "d-apex",
    vi: "Ném vật lên với $v_0=20$ m/s. Chọn $t$ để vận tốc bằng $0$.",
    en: "A ball is thrown up at $v_0=20$ m/s. Choose $t$ so the velocity is $0$.",
    set: { scene: 1, v0: 20, time: 0 },
    guess: {
      vi: "Tại đỉnh của quỹ đạo, vận tốc tức thời bằng bao nhiêu?",
      en: "At the top of the flight, what is the instantaneous velocity?",
      options: [{ vi: "Bằng $0$", en: "Zero" }, { vi: "Bằng $v_0$", en: "Equal to $v_0$" }, { vi: "Lớn nhất", en: "Largest" }],
      answer: 0,
      why: { vi: "Đỉnh là cực đại của $h$ nên $h'(t)=v=0$.", en: "The top is the maximum of $h$, so $h'(t)=v=0$." },
    },
    sol: { scene: 1, v0: 20, time: 2 },
    check: (v, say) => {
      const p = projectile(v.v0, v.time);
      return judge(
        say,
        [[near(p.v, 0, 0.01), `Tại $t=${say.n(v.time)}$ s vận tốc là $${say.n(p.v)}$ m/s, chưa bằng $0$.`, `At $t=${say.n(v.time)}$ s the velocity is $${say.n(p.v)}$ m/s, not $0$ yet.`]],
        [`$v=v_0-10t=0$ tại $t=${say.n(apex(v.v0).t)}$ s, độ cao $${say.n(apex(v.v0).h)}$ m.`, `$v=v_0-10t=0$ at $t=${say.n(apex(v.v0).t)}$ s, height $${say.n(apex(v.v0).h)}$ m.`],
      );
    },
  },
  {
    id: "d-rising",
    vi: "Chọn $v_0$ và $t$ để vật cao $15$ m và vẫn đang bay lên.",
    en: "Choose $v_0$ and $t$ so the ball is $15$ m high and still rising.",
    set: { scene: 1, v0: 20, time: 0 },
    sol: { scene: 1, v0: 20, time: 1 },
    check: (v, say) => {
      const p = projectile(v.v0, v.time);
      return judge(
        say,
        [
          [near(p.h, 15, 0.2), `Độ cao là $${say.n(p.h)}$ m, cần $15$ m.`, `The height is $${say.n(p.h)}$ m, it should be $15$ m.`],
          [p.v > 0, `Vận tốc $${say.n(p.v)}$ m/s không dương: vật đang rơi xuống.`, `The velocity $${say.n(p.v)}$ m/s is not positive: the ball is falling.`],
        ],
        [`Cao $${say.n(p.h)}$ m, vận tốc $${say.n(p.v)}>0$: vẫn đang lên.`, `Height $${say.n(p.h)}$ m with velocity $${say.n(p.v)}>0$: still rising.`],
      );
    },
  },
  {
    id: "d-brake",
    vi: "Xe phanh từ $20$ m/s. Tìm $t$ để xe đã đi được khoảng $40$ m.",
    en: "A car brakes from $20$ m/s. Find $t$ so it has travelled about $40$ m.",
    set: { scene: 2, brake: 0 },
    sol: { scene: 2, brake: 2.8 },
    check: (v, say) => {
      const m = brakeMotion(v.brake);
      return judge(
        say,
        [[near(m.s, 40, 0.5), `Tại $t=${say.n(v.brake)}$ s xe đi được $${say.n(m.s)}$ m, cần gần $40$ m.`, `At $t=${say.n(v.brake)}$ s the car has gone $${say.n(m.s)}$ m, it should be near $40$ m.`]],
        [`$s=20t-2t^2=${say.n(m.s)}$ m, vận tốc lúc này $${say.n(m.v)}$ m/s.`, `$s=20t-2t^2=${say.n(m.s)}$ m, the velocity now is $${say.n(m.v)}$ m/s.`],
      );
    },
  },
];

const survey: Challenge[] = [
  {
    id: "v-max",
    vi: "Đưa $x$ tới điểm cực đại của $y=x^3-3x$.",
    en: "Move $x$ to the local maximum of $y=x^3-3x$.",
    set: { scene: 0, x: 0 },
    guess: {
      vi: "Cực đại của $y=x^3-3x$ nằm ở $x=1$ hay $x=-1$?",
      en: "Is the local maximum of $y=x^3-3x$ at $x=1$ or $x=-1$?",
      options: [{ vi: "$x=1$", en: "$x=1$" }, { vi: "$x=-1$", en: "$x=-1$" }],
      answer: 1,
      why: { vi: "$y'=3x^2-3$ đổi dấu từ $+$ sang $-$ tại $x=-1$.", en: "$y'=3x^2-3$ changes from $+$ to $-$ at $x=-1$." },
    },
    sol: { scene: 0, x: -1 },
    check: (v, say) =>
      judge(
        say,
        [
          [near(cubicSlope(v.x), 0, 0.01), `Tại $x=${say.n(v.x)}$ đạo hàm là $${say.n(cubicSlope(v.x))}$, chưa bằng $0$.`, `At $x=${say.n(v.x)}$ the derivative is $${say.n(cubicSlope(v.x))}$, not $0$ yet.`],
          [cubicSecond(v.x) < 0, `Đây là cực tiểu vì $y''=${say.n(cubicSecond(v.x))}>0$.`, `This is a local minimum since $y''=${say.n(cubicSecond(v.x))}>0$.`],
        ],
        [`$y'=0$ và $y''<0$ tại $x=-1$: cực đại, $y=2$.`, `$y'=0$ and $y''<0$ at $x=-1$: a local maximum, $y=2$.`],
      ),
  },
  {
    id: "v-inflection",
    vi: "Tìm điểm uốn của $y=x^3-3x$, nơi $y''=0$.",
    en: "Find the inflection point of $y=x^3-3x$, where $y''=0$.",
    set: { scene: 0, x: 1.5 },
    sol: { scene: 0, x: 0 },
    check: (v, say) =>
      judge(
        say,
        [[near(cubicSecond(v.x), 0, 1e-9), `$y''=6x=${say.n(cubicSecond(v.x))}$, chưa bằng $0$.`, `$y''=6x=${say.n(cubicSecond(v.x))}$, not $0$ yet.`]],
        [`$y''=6x=0$ tại $x=0$: đồ thị đổi chiều cong.`, `$y''=6x=0$ at $x=0$: the graph changes concavity.`],
      ),
  },
  {
    id: "v-not-extremum",
    vi: "Với $y=x^3$, tìm $x$ có $y'=0$ nhưng không phải cực trị.",
    en: "For $y=x^3$, find $x$ with $y'=0$ that is not an extremum.",
    set: { scene: 2, px: 1 },
    sol: { scene: 2, px: 0 },
    check: (v, say) =>
      judge(
        say,
        [[near(pureCubicSlope(v.px), 0, 1e-9), `$y'=3x^2=${say.n(pureCubicSlope(v.px))}$, chưa bằng $0$.`, `$y'=3x^2=${say.n(pureCubicSlope(v.px))}$, not $0$ yet.`]],
        [`$y'(0)=0$ nhưng $y'\\ge0$ ở cả hai phía, nên $0$ không là cực trị.`, `$y'(0)=0$ but $y'\\ge0$ on both sides, so $0$ is not an extremum.`],
      ),
  },
];

const integral: Challenge[] = [
  {
    id: "g-riemann",
    vi: "Với $b=2$, chọn số dải $n$ để tổng hình chữ nhật chỉ lệch diện tích đúng $\\frac{4}{3}$ chưa tới $0{,}02$.",
    en: "With $b=2$, choose the number of strips $n$ so the rectangle sum is within $0.02$ of the exact area $\\frac{4}{3}$.",
    set: { scene: 0, upper: 2, strips: 1 },
    sol: { scene: 0, upper: 2, strips: 12 },
    check: (v, say) => {
      const gap = Math.abs(archRiemann(v.strips, v.upper) - archIntegral(v.upper));
      return judge(
        say,
        [
          [near(v.upper, 2, 1e-9), `Giữ $b=2$.`, `Keep $b=2$.`],
          [gap < 0.02, `Với $n=${say.n(v.strips)}$ tổng còn lệch $${say.n(gap)}$, cần dưới $0{,}02$.`.replace("0{,}02", say.en ? "0.02" : "0{,}02"), `With $n=${say.n(v.strips)}$ the sum is still off by $${say.n(gap)}$, it must be below $0.02$.`],
        ],
        [`Chia nhiều dải hơn thì tổng tiến về $\\frac{4}{3}$; với $n=${say.n(v.strips)}$ chỉ lệch $${say.n(gap)}$.`, `More strips push the sum toward $\\frac{4}{3}$; with $n=${say.n(v.strips)}$ it is off by only $${say.n(gap)}$.`],
      );
    },
  },
  {
    id: "g-area-exact",
    vi: "Chọn cận $b$ để $\\int_0^b(2x-x^2)\\,dx=\\frac{9}{8}$.",
    en: "Choose the bound $b$ so that $\\int_0^b(2x-x^2)\\,dx=\\frac{9}{8}$.",
    set: { scene: 0, upper: 1 },
    sol: { scene: 0, upper: 1.5 },
    check: (v, say) => {
      const area = archIntegral(v.upper);
      return judge(
        say,
        [[near(area, 1.125, 1e-9), `Với $b=${say.n(v.upper)}$ tích phân bằng $${say.n(area)}$, cần $1{,}125$.`.replace("1{,}125", say.en ? "1.125" : "1{,}125"), `With $b=${say.n(v.upper)}$ the integral is $${say.n(area)}$, it should be $1.125$.`]],
        [`$b^2-\\frac{b^3}{3}=${say.n(area)}$ tại $b=${say.n(v.upper)}$.`, `$b^2-\\frac{b^3}{3}=${say.n(area)}$ at $b=${say.n(v.upper)}$.`],
      );
    },
  },
  {
    id: "g-between",
    vi: "Chọn $b$ để diện tích giữa $y=x$ và $y=x^2$ đạt giá trị lớn nhất (bằng $\\frac{1}{6}$).",
    en: "Choose $b$ so the area between $y=x$ and $y=x^2$ is as large as possible (the largest value is $\\frac{1}{6}$).",
    set: { scene: 1, gap: 0.5 },
    sol: { scene: 1, gap: 1 },
    check: (v, say) => {
      const area = betweenIntegral(v.gap);
      return judge(
        say,
        [[area >= 1 / 6 - 1e-9, `Với $b=${say.n(v.gap)}$ diện tích mới là $${say.n(area)}$, còn nhỏ hơn $\\frac{1}{6}$.`, `With $b=${say.n(v.gap)}$ the area is only $${say.n(area)}$, below $\\frac{1}{6}$.`]],
        [`Hai đường gặp nhau tại $x=1$ nên $b=1$ cho $\\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}$.`, `The curves meet at $x=1$, so $b=1$ gives $\\frac{1}{2}-\\frac{1}{3}=\\frac{1}{6}$.`],
      );
    },
  },
  {
    id: "g-volume",
    vi: "Chọn $b$ để tích phân $\\int_0^b y^2\\,dx$ bằng $\\frac{16}{15}$ (thể tích quay $\\frac{16\\pi}{15}$).",
    en: "Choose $b$ so that $\\int_0^b y^2\\,dx=\\frac{16}{15}$ (the solid of revolution has volume $\\frac{16\\pi}{15}$).",
    set: { scene: 2, span: 1 },
    sol: { scene: 2, span: 2 },
    check: (v, say) => {
      const c = archVolumeCoeff(v.span);
      return judge(
        say,
        [[near(c, 16 / 15, 1e-9), `Với $b=${say.n(v.span)}$ tích phân bằng $${say.n(c)}$, cần $\\frac{16}{15}\\approx1{,}07$.`.replace("1{,}07", say.en ? "1.07" : "1{,}07"), `With $b=${say.n(v.span)}$ the integral is $${say.n(c)}$, it should be $\\frac{16}{15}\\approx1.07$.`]],
        [`Cả cung từ $0$ đến $2$ quay quanh $Ox$ cho $V=\\frac{16\\pi}{15}$.`, `The whole arch from $0$ to $2$ turned about $Ox$ gives $V=\\frac{16\\pi}{15}$.`],
      );
    },
  },
];

const probability: Challenge[] = [
  {
    id: "p-bayes-up",
    vi: "Với độ nhạy $99\\%$ và dương giả $5\\%$, chọn tỉ lệ bệnh để người dương tính thật sự bệnh với xác suất trên $50\\%$.",
    en: "With sensitivity $99\\%$ and false positives $5\\%$, choose the prevalence so a positive person is actually sick with probability above $50\\%$.",
    set: { scene: 1, prev: 1, sens: 99, fpr: 5 },
    guess: {
      vi: "Xét nghiệm đúng $99\\%$ nhưng chỉ $1\\%$ dân số bệnh. Dương tính thì xác suất thật sự bệnh khoảng bao nhiêu?",
      en: "A test is $99\\%$ accurate but only $1\\%$ of people are sick. If positive, how likely is it that the person is really sick?",
      options: [{ vi: "Khoảng $99\\%$", en: "About $99\\%$" }, { vi: "Khoảng $17\\%$", en: "About $17\\%$" }, { vi: "Khoảng $50\\%$", en: "About $50\\%$" }],
      answer: 1,
      why: { vi: "Trong $10000$ người có $99$ dương thật và $495$ dương giả: $\\frac{99}{594}\\approx17\\%$.", en: "Among $10000$ people there are $99$ true and $495$ false positives: $\\frac{99}{594}\\approx17\\%$." },
    },
    sol: { scene: 1, prev: 5, sens: 99, fpr: 5 },
    check: (v, say) => {
      const b = bayes(v.prev, v.sens, v.fpr);
      return judge(
        say,
        [
          [v.sens === 99 && v.fpr === 5, `Giữ độ nhạy $99\\%$ và dương giả $5\\%$.`, `Keep sensitivity $99\\%$ and false positives $5\\%$.`],
          [b.posterior > 0.5, `Xác suất bệnh khi dương tính chỉ $${say.n(b.posterior * 100)}\\%$: dương giả vẫn nhiều hơn dương thật.`, `A positive is sick with only $${say.n(b.posterior * 100)}\\%$: false positives still outnumber true ones.`],
        ],
        [`$\\frac{${say.n(b.tp)}}{${say.n(b.positive)}}\\approx${say.n(b.posterior * 100)}\\%$: bệnh phổ biến hơn thì dương tính đáng tin hơn.`, `$\\frac{${say.n(b.tp)}}{${say.n(b.positive)}}\\approx${say.n(b.posterior * 100)}\\%$: the commoner the disease, the more a positive means.`],
      );
    },
  },
  {
    id: "p-bayes-fpr",
    vi: "Giữ tỉ lệ bệnh $1\\%$ và độ nhạy $99\\%$; hạ tỉ lệ dương giả để xác suất bệnh khi dương tính đạt ít nhất $50\\%$.",
    en: "Keep prevalence $1\\%$ and sensitivity $99\\%$; lower the false-positive rate so a positive is sick with probability at least $50\\%$.",
    set: { scene: 1, prev: 1, sens: 99, fpr: 10 },
    sol: { scene: 1, prev: 1, sens: 99, fpr: 1 },
    check: (v, say) => {
      const b = bayes(v.prev, v.sens, v.fpr);
      return judge(
        say,
        [
          [v.prev === 1 && v.sens === 99, `Giữ tỉ lệ bệnh $1\\%$ và độ nhạy $99\\%$.`, `Keep prevalence $1\\%$ and sensitivity $99\\%$.`],
          [b.posterior >= 0.5 - 1e-9, `Mới đạt $${say.n(b.posterior * 100)}\\%$.`, `Only $${say.n(b.posterior * 100)}\\%$ so far.`],
        ],
        [`Dương giả còn $${say.n(v.fpr)}\\%$ nên $${say.n(b.tp)}$ dương thật so với $${say.n(b.fp)}$ dương giả.`, `With $${say.n(v.fpr)}\\%$ false positives there are $${say.n(b.tp)}$ true against $${say.n(b.fp)}$ false positives.`],
      );
    },
  },
  {
    id: "p-binom",
    vi: "Chọn $n$, $k$, $p$ để xác suất đúng $k$ lần thành công trong $n$ lần bằng $\\frac{5}{16}$.",
    en: "Choose $n$, $k$ and $p$ so the probability of exactly $k$ successes in $n$ trials equals $\\frac{5}{16}$.",
    set: { scene: 2, n: 3, k: 2, p: 0.5 },
    sol: { scene: 2, n: 5, k: 2, p: 0.5 },
    check: (v, say) => {
      const pr = binom(v.n, v.k, v.p);
      return judge(
        say,
        [[near(pr, 0.3125, 1e-9), `$P=${say.n(pr)}$, cần bằng $0{,}3125$.`.replace("0{,}3125", say.en ? "0.3125" : "0{,}3125"), `$P=${say.n(pr)}$, it should be $0.3125$.`]],
        [`$\\binom{${say.n(v.n)}}{${say.n(v.k)}}\\cdot${say.n(v.p)}^{${say.n(v.k)}}\\cdot${say.n(1 - v.p)}^{${say.n(v.n - v.k)}}=\\frac{5}{16}$.`, `$\\binom{${say.n(v.n)}}{${say.n(v.k)}}\\cdot${say.n(v.p)}^{${say.n(v.k)}}\\cdot${say.n(1 - v.p)}^{${say.n(v.n - v.k)}}=\\frac{5}{16}$.`],
      );
    },
  },
];

const vector: Challenge[] = [
  {
    id: "w-perp",
    vi: "Chọn $\\vec u$ và $\\vec v$ khác $\\vec 0$ sao cho hai vectơ vuông góc.",
    en: "Choose nonzero $\\vec u$ and $\\vec v$ that are perpendicular.",
    set: { scene: 0, ux: 2, uy: 1, uz: 2, vx: 1, vy: -1, vz: 2 },
    guess: {
      vi: "Hai vectơ khác $\\vec 0$ vuông góc khi tích vô hướng bằng bao nhiêu?",
      en: "Two nonzero vectors are perpendicular when their dot product is what?",
      options: [{ vi: "Bằng $0$", en: "Zero" }, { vi: "Bằng $1$", en: "One" }, { vi: "Âm", en: "Negative" }],
      answer: 0,
      why: { vi: "$\\vec u\\cdot\\vec v=|\\vec u||\\vec v|\\cos\\varphi=0$ khi $\\varphi=90^\\circ$.", en: "$\\vec u\\cdot\\vec v=|\\vec u||\\vec v|\\cos\\varphi=0$ when $\\varphi=90^\\circ$." },
    },
    sol: { scene: 0, ux: 2, uy: 1, uz: 2, vx: 1, vy: 0, vz: -1 },
    check: (v, say) => {
      const u: [number, number, number] = [v.ux, v.uy, v.uz];
      const w: [number, number, number] = [v.vx, v.vy, v.vz];
      const dot = vec3Dot(u, w);
      return judge(
        say,
        [
          [u.some((x) => x !== 0) && w.some((x) => x !== 0), `Một vectơ đang là $\\vec 0$.`, `One vector is $\\vec 0$.`],
          [near(dot, 0, 1e-9), `$\\vec u\\cdot\\vec v=${say.n(dot)}$, chưa bằng $0$.`, `$\\vec u\\cdot\\vec v=${say.n(dot)}$, not $0$ yet.`],
        ],
        [`$\\vec u\\cdot\\vec v=0$ nên hai vectơ vuông góc.`, `$\\vec u\\cdot\\vec v=0$ so the vectors are perpendicular.`],
      );
    },
  },
  {
    id: "w-singular",
    vi: "Chọn ma trận $2\\times2$ khác ma trận không có định thức bằng $0$.",
    en: "Choose a nonzero $2\\times2$ matrix with determinant $0$.",
    set: { scene: 1, m11: 2, m12: 1, m21: 1, m22: -1 },
    sol: { scene: 1, m11: 2, m12: 1, m21: 2, m22: 1 },
    check: (v, say) => {
      const d = det2(v.m11, v.m12, v.m21, v.m22);
      return judge(
        say,
        [
          [[v.m11, v.m12, v.m21, v.m22].some((x) => x !== 0), `Đây là ma trận không.`, `This is the zero matrix.`],
          [near(d, 0, 1e-9), `$ad-bc=${say.n(d)}$, chưa bằng $0$.`, `$ad-bc=${say.n(d)}$, not $0$ yet.`],
        ],
        [`$ad-bc=0$: hai cột tỉ lệ, hình vuông bị ép thành một đoạn.`, `$ad-bc=0$: the columns are proportional and the square is squashed into a segment.`],
      );
    },
  },
  {
    id: "w-system",
    vi: "Chọn các hệ số để hệ phương trình có nghiệm duy nhất $(x;\\ y)=(1;\\ 2)$.",
    en: "Choose the coefficients so the system has the single solution $(x,\\ y)=(1,\\ 2)$.",
    set: { scene: 2, s11: 2, s12: 1, t1: 5, s21: 1, s22: -1, t2: 1 },
    sol: { scene: 2, s11: 2, s12: 1, t1: 4, s21: 1, s22: -1, t2: -1 },
    check: (v, say) => {
      const sol = solve2(v.s11, v.s12, v.t1, v.s21, v.s22, v.t2);
      return judge(
        say,
        [
          [sol !== null, `Định thức bằng $0$ nên hệ không có nghiệm duy nhất.`, `The determinant is $0$ so there is no single solution.`],
          [sol !== null && near(sol.x, 1, 0.01) && near(sol.y, 2, 0.01), `Nghiệm hiện tại là $(${say.n(sol?.x ?? 0)};\\ ${say.n(sol?.y ?? 0)})$.`.replace(/;\\ /, say.en ? ",\\ " : ";\\ "), `The current solution is $(${say.n(sol?.x ?? 0)},\\ ${say.n(sol?.y ?? 0)})$.`],
        ],
        [`Hai đường thẳng cắt nhau đúng tại $(1;\\ 2)$.`, `The two lines meet exactly at $(1,\\ 2)$.`],
      );
    },
  },
];

const analytic: Challenge[] = [
  {
    id: "n-on-line",
    vi: "Đặt điểm $P$ nằm trên đường thẳng $x+y-2=0$.",
    en: "Place the point $P$ on the line $x+y-2=0$.",
    set: { scene: 0, a: 1, b: 1, c: -2, px: 3, py: 1 },
    sol: { scene: 0, a: 1, b: 1, c: -2, px: 1, py: 1 },
    check: (v, say) => {
      const d = lineDist(v.a, v.b, v.c, v.px, v.py);
      return judge(
        say,
        [
          [v.a === 1 && v.b === 1 && v.c === -2, `Giữ đường thẳng $x+y-2=0$.`, `Keep the line $x+y-2=0$.`],
          [near(d, 0, 1e-9), `Khoảng cách từ $P$ tới đường thẳng là $${say.n(d)}$, chưa bằng $0$.`, `The distance from $P$ to the line is $${say.n(d)}$, not $0$ yet.`],
        ],
        [`$${say.n(v.px)}+${say.n(v.py)}-2=0$ nên $P$ thuộc đường thẳng.`, `$${say.n(v.px)}+${say.n(v.py)}-2=0$ so $P$ is on the line.`],
      );
    },
  },
  {
    id: "n-dist-sqrt2",
    vi: "Đặt $P$ để khoảng cách tới đường thẳng $x+y-2=0$ bằng $\\sqrt{2}$.",
    en: "Place $P$ so its distance to the line $x+y-2=0$ is $\\sqrt{2}$.",
    set: { scene: 0, a: 1, b: 1, c: -2, px: 1, py: 1 },
    sol: { scene: 0, a: 1, b: 1, c: -2, px: 3, py: 1 },
    check: (v, say) => {
      const d = lineDist(v.a, v.b, v.c, v.px, v.py);
      return judge(
        say,
        [
          [v.a === 1 && v.b === 1 && v.c === -2, `Giữ đường thẳng $x+y-2=0$.`, `Keep the line $x+y-2=0$.`],
          [near(d, Math.SQRT2, 1e-6), `Khoảng cách là $${say.n(d)}$, cần $\\sqrt{2}\\approx1{,}41$.`.replace("1{,}41", say.en ? "1.41" : "1{,}41"), `The distance is $${say.n(d)}$, it should be $\\sqrt{2}\\approx1.41$.`],
        ],
        [`$\\frac{|${say.n(v.px)}+${say.n(v.py)}-2|}{\\sqrt{2}}=\\sqrt{2}$.`, `$\\frac{|${say.n(v.px)}+${say.n(v.py)}-2|}{\\sqrt{2}}=\\sqrt{2}$.`],
      );
    },
  },
  {
    id: "n-plane",
    vi: "Đặt điểm $Q$ nằm trên mặt phẳng $x+y+z-6=0$.",
    en: "Place the point $Q$ on the plane $x+y+z-6=0$.",
    set: { scene: 1, pa: 1, pb: 1, pc: 1, pd: -6, qx: 1, qy: 1, qz: 1 },
    sol: { scene: 1, pa: 1, pb: 1, pc: 1, pd: -6, qx: 2, qy: 2, qz: 2 },
    check: (v, say) => {
      const d = planeDist(v.pa, v.pb, v.pc, v.pd, v.qx, v.qy, v.qz);
      return judge(
        say,
        [
          [v.pa === 1 && v.pb === 1 && v.pc === 1 && v.pd === -6, `Giữ mặt phẳng $x+y+z-6=0$.`, `Keep the plane $x+y+z-6=0$.`],
          [near(d, 0, 1e-9), `Khoảng cách từ $Q$ tới mặt phẳng là $${say.n(d)}$, chưa bằng $0$.`, `The distance from $Q$ to the plane is $${say.n(d)}$, not $0$ yet.`],
        ],
        [`$${say.n(v.qx)}+${say.n(v.qy)}+${say.n(v.qz)}-6=0$ nên $Q$ thuộc mặt phẳng.`, `$${say.n(v.qx)}+${say.n(v.qy)}+${say.n(v.qz)}-6=0$ so $Q$ is on the plane.`],
      );
    },
  },
  {
    id: "n-circle",
    vi: "Chỉnh bán kính để điểm $(6;\\ 0)$ nằm đúng trên đường tròn tâm $O$.",
    en: "Adjust the radius so the point $(6,\\ 0)$ lies exactly on the circle centred at $O$.",
    set: { scene: 2, radius: 5 },
    sol: { scene: 2, radius: 6 },
    check: (v, say) => {
      const place = circlePlace(6, 0, v.radius);
      return judge(
        say,
        [[place === "on", `Với $R=${say.n(v.radius)}$ điểm $(6;\\ 0)$ nằm ${place === "in" ? "trong" : "ngoài"} đường tròn vì $OM=6$.`.replace(";\\ ", say.en ? ",\\ " : ";\\ "), `With $R=${say.n(v.radius)}$ the point $(6,\\ 0)$ is ${place === "in" ? "inside" : "outside"} the circle because $OM=6$.`]],
        [`$OM=6=R$ nên điểm nằm trên đường tròn.`, `$OM=6=R$ so the point lies on the circle.`],
      );
    },
  },
];

const triangle: Challenge[] = [
  {
    id: "h-tri",
    vi: "Chọn đáy và chiều cao để tam giác có diện tích $24$.",
    en: "Choose the base and height so the triangle has area $24$.",
    set: { scene: 0, base: 6, tall: 4 },
    sol: { scene: 0, base: 8, tall: 6 },
    check: (v, say) => {
      const area = triArea(v.base, v.tall);
      return judge(
        say,
        [[near(area, 24, 1e-9), `$S=\\frac{1}{2}\\cdot${say.n(v.base)}\\cdot${say.n(v.tall)}=${say.n(area)}$, cần $24$.`, `$S=\\frac{1}{2}\\cdot${say.n(v.base)}\\cdot${say.n(v.tall)}=${say.n(area)}$, it should be $24$.`]],
        [`$\\frac{1}{2}\\cdot${say.n(v.base)}\\cdot${say.n(v.tall)}=24$.`, `$\\frac{1}{2}\\cdot${say.n(v.base)}\\cdot${say.n(v.tall)}=24$.`],
      );
    },
  },
  {
    id: "h-box",
    vi: "Chọn ba cạnh để hình hộp chữ nhật có thể tích $48$.",
    en: "Choose three edges so the box has volume $48$.",
    set: { scene: 1, len: 2, wid: 2, ht: 2 },
    sol: { scene: 1, len: 4, wid: 4, ht: 3 },
    check: (v, say) => {
      const vol = boxVolume(v.len, v.wid, v.ht);
      return judge(
        say,
        [[near(vol, 48, 1e-9), `$V=${say.n(v.len)}\\cdot${say.n(v.wid)}\\cdot${say.n(v.ht)}=${say.n(vol)}$, cần $48$.`, `$V=${say.n(v.len)}\\cdot${say.n(v.wid)}\\cdot${say.n(v.ht)}=${say.n(vol)}$, it should be $48$.`]],
        [`$${say.n(v.len)}\\cdot${say.n(v.wid)}\\cdot${say.n(v.ht)}=48$.`, `$${say.n(v.len)}\\cdot${say.n(v.wid)}\\cdot${say.n(v.ht)}=48$.`],
      );
    },
  },
  {
    id: "h-pyramid",
    vi: "Chọn cạnh đáy và chiều cao để khối chóp đáy vuông có thể tích $24$.",
    en: "Choose the base edge and the height so the square pyramid has volume $24$.",
    set: { scene: 2, side: 6, ph: 4 },
    guess: {
      vi: "Chóp và lăng trụ cùng đáy, cùng chiều cao thì thể tích chóp bằng bao nhiêu phần lăng trụ?",
      en: "A pyramid and a prism with the same base and height: what fraction of the prism is the pyramid?",
      options: [{ vi: "$\\frac{1}{2}$", en: "$\\frac{1}{2}$" }, { vi: "$\\frac{1}{3}$", en: "$\\frac{1}{3}$" }, { vi: "$\\frac{1}{4}$", en: "$\\frac{1}{4}$" }],
      answer: 1,
      why: { vi: "$V=\\frac{1}{3}Sh$.", en: "$V=\\frac{1}{3}Sh$." },
    },
    sol: { scene: 2, side: 6, ph: 2 },
    check: (v, say) => {
      const vol = pyramidVolume(v.side, v.ph);
      return judge(
        say,
        [[near(vol, 24, 1e-9), `$V=\\frac{1}{3}\\cdot${say.n(v.side * v.side)}\\cdot${say.n(v.ph)}=${say.n(vol)}$, cần $24$.`, `$V=\\frac{1}{3}\\cdot${say.n(v.side * v.side)}\\cdot${say.n(v.ph)}=${say.n(vol)}$, it should be $24$.`]],
        [`$\\frac{1}{3}\\cdot${say.n(v.side * v.side)}\\cdot${say.n(v.ph)}=24$.`, `$\\frac{1}{3}\\cdot${say.n(v.side * v.side)}\\cdot${say.n(v.ph)}=24$.`],
      );
    },
  },
  {
    id: "h-tetra",
    vi: "Chọn cạnh $a$ để tứ diện đều có thể tích $18\\sqrt{2}$.",
    en: "Choose the edge $a$ so the regular tetrahedron has volume $18\\sqrt{2}$.",
    set: { scene: 3, edge: 4 },
    sol: { scene: 3, edge: 6 },
    check: (v, say) => {
      const vol = tetraVolume(v.edge);
      return judge(
        say,
        [[near(vol, 18 * Math.SQRT2, 0.01), `$V=\\frac{a^3\\sqrt{2}}{12}=${say.n(vol)}$, cần $18\\sqrt{2}\\approx${say.n(18 * Math.SQRT2)}$.`, `$V=\\frac{a^3\\sqrt{2}}{12}=${say.n(vol)}$, it should be $18\\sqrt{2}\\approx${say.n(18 * Math.SQRT2)}$.`]],
        [`$\\frac{6^3\\sqrt{2}}{12}=18\\sqrt{2}$.`, `$\\frac{6^3\\sqrt{2}}{12}=18\\sqrt{2}$.`],
      );
    },
  },
];

const combo: Challenge[] = [
  {
    id: "c-ac",
    vi: "Chọn $n$ và $k$ để $C_n^k=10$ và $A_n^k=20$ cùng lúc.",
    en: "Choose $n$ and $k$ so that $C_n^k=10$ and $A_n^k=20$ at the same time.",
    set: { scene: 0, n: 4, k: 2 },
    sol: { scene: 0, n: 5, k: 2 },
    check: (v, say) => {
      const c = comb(v.n, v.k);
      const a = arrange(v.n, v.k);
      return judge(
        say,
        [
          [c === 10, `$C_{${say.n(v.n)}}^{${say.n(v.k)}}=${say.n(c)}$, cần $10$.`, `$C_{${say.n(v.n)}}^{${say.n(v.k)}}=${say.n(c)}$, it should be $10$.`],
          [a === 20, `$A_{${say.n(v.n)}}^{${say.n(v.k)}}=${say.n(a)}$, cần $20$.`, `$A_{${say.n(v.n)}}^{${say.n(v.k)}}=${say.n(a)}$, it should be $20$.`],
        ],
        [`$A_n^k=k!\\cdot C_n^k$: $20=2\\cdot10$.`, `$A_n^k=k!\\cdot C_n^k$: $20=2\\cdot10$.`],
      );
    },
  },
  {
    id: "c-middle",
    vi: "Với $n=6$, chọn $k$ để $C_6^k$ lớn nhất.",
    en: "With $n=6$, choose $k$ so that $C_6^k$ is the largest.",
    set: { scene: 0, n: 6, k: 1 },
    guess: {
      vi: "$C_6^k$ lớn nhất ở $k$ nào?",
      en: "At which $k$ is $C_6^k$ largest?",
      options: [{ vi: "$k=2$", en: "$k=2$" }, { vi: "$k=3$", en: "$k=3$" }, { vi: "$k=6$", en: "$k=6$" }],
      answer: 1,
      why: { vi: "Hàng Pascal đối xứng nên lớn nhất ở giữa: $C_6^3=20$.", en: "A Pascal row is symmetric, so the middle is largest: $C_6^3=20$." },
    },
    sol: { scene: 0, n: 6, k: 3 },
    check: (v, say) => {
      const c = comb(v.n, v.k);
      return judge(
        say,
        [
          [v.n === 6, `Giữ $n=6$.`, `Keep $n=6$.`],
          [c === 20, `$C_6^{${say.n(v.k)}}=${say.n(c)}$, còn có giá trị lớn hơn.`, `$C_6^{${say.n(v.k)}}=${say.n(c)}$, a larger value exists.`],
        ],
        [`$C_6^3=20$ là lớn nhất của hàng.`, `$C_6^3=20$ is the largest in the row.`],
      );
    },
  },
  {
    id: "c-outlier",
    vi: "Giữ trung vị bằng $4$ nhưng kéo trung bình lên ít nhất $6$ bằng điểm lệch.",
    en: "Keep the median at $4$ but pull the mean up to at least $6$ with the outlier.",
    set: { scene: 2, outlier: 6 },
    sol: { scene: 2, outlier: 20 },
    check: (v, say) => {
      const scores = [2, 3, 4, 5, v.outlier];
      const mean = meanOf(scores);
      const median = medianOf(scores);
      return judge(
        say,
        [
          [median === 4, `Trung vị đã đổi thành $${say.n(median)}$.`, `The median has changed to $${say.n(median)}$.`],
          [mean >= 6, `Trung bình mới là $${say.n(mean)}$, cần ít nhất $6$.`, `The mean is only $${say.n(mean)}$, at least $6$ is needed.`],
        ],
        [`Trung vị vẫn $4$ còn trung bình $${say.n(mean)}$: điểm lệch kéo trung bình mà không đụng trung vị.`, `The median stays $4$ while the mean is $${say.n(mean)}$: the outlier drags the mean but not the median.`],
      );
    },
  },
];

export const labSpecs: Record<string, LabSpec> = {
  quadratic: { init: quadInit, range: quadRange, challenges: quadratic },
  ineq: { init: ineqInit, range: ineqRange, challenges: ineq },
  exp: { init: expInit, range: expRange, challenges: exp },
  sequence: { init: seqInit, range: seqRange, challenges: sequence },
  trig: { init: trigInit, range: trigRange, challenges: trig },
  limit: { init: limitInit, range: limitRange, challenges: limit },
  derivative: { init: derivInit, range: derivRange, challenges: derivative },
  survey: { init: surveyInit, range: surveyRange, challenges: survey },
  integral: { init: integralInit, range: integralRange, challenges: integral },
  probability: { init: chanceInit, range: chanceRange, challenges: probability },
  vector: { init: vectorInit, range: vectorRange, challenges: vector },
  analytic: { init: analyticInit, range: analyticRange, challenges: analytic },
  triangle: { init: shapeInit, range: shapeRange, challenges: triangle },
  combo: { init: comboInit, range: comboRange, challenges: combo },
};

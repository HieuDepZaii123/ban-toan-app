import {
  amGm, arrange, bayes, binom, binomAtLeastOne, brakeMotion, cauchyPair, circlePlace, comb, compoundAmount, coolingTemp, cosDeg,
  cubicSecond, cubicSlope, delta, det2, expY, fence, geomInfinite, jumpStudy, lineDist, meanOf, medianOf, planeDist, projectile,
  pureCubicSlope, pyramidVolume, boxVolume, savingsSum, secantSlope, simpleAmount, sinDeg, treeHeight, triArea,
  vec3Cross, arithSum, archIntegral, archRiemann, archVolumeCoeff, workshopOk, workshopProfit, baseOk,
} from "../lib/math.ts";
import { judge, near, type Challenge } from "./challenges.ts";

const B = (vi: string, en: string) => ({ vi, en });

export const extra: Record<string, Challenge[]> = {
  quadratic: [
    {
      id: "q-double-root", level: 2,
      vi: "Chọn $a$, $b$, $c$ để parabol tiếp xúc trục $Ox$ (nghiệm kép).",
      en: "Choose $a$, $b$ and $c$ so the parabola touches the $Ox$ axis (a double root).",
      hint: B("Nghiệm kép khi $\\Delta=b^2-4ac=0$ và $a\\ne0$.", "A double root needs $\\Delta=b^2-4ac=0$ and $a\\ne0$."),
      set: { scene: 0, a: 1, b: -2, c: -3 }, sol: { scene: 0, a: 1, b: 2, c: 1 },
      check: (v, say) => {
        const d = delta(v.a, v.b, v.c);
        return judge(say, [
          [Math.abs(v.a) > 0.05, `$a=${say.n(v.a)}$ gần $0$ nên đây không còn là parabol.`, `$a=${say.n(v.a)}$ is near $0$, so this is no longer a parabola.`],
          [Math.abs(d) < 1e-6, `$\\Delta=${say.n(d)}\\ne0$ nên đồ thị ${d > 0 ? "cắt" : "không chạm"} trục $Ox$.`, `$\\Delta=${say.n(d)}\\ne0$ so the graph ${d > 0 ? "crosses" : "misses"} the $Ox$ axis.`],
        ], [`$\\Delta=0$: đỉnh nằm đúng trên $Ox$.`, `$\\Delta=0$: the vertex sits right on $Ox$.`]);
      },
    },
    {
      id: "q-counter", level: 2,
      vi: "Tìm phản ví dụ cho câu \"parabol bề lõm lên thì luôn cắt trục $Ox$\".",
      en: "Find a counterexample to \"a parabola opening upward always crosses the $Ox$ axis\".",
      hint: B("Đưa đỉnh lên phía trên $Ox$ khi $a>0$.", "Lift the vertex above $Ox$ while $a>0$."),
      set: { scene: 0, a: 1, b: -2, c: -3 }, sol: { scene: 0, a: 1, b: 0, c: 1 },
      check: (v, say) => {
        const d = delta(v.a, v.b, v.c);
        return judge(say, [
          [v.a > 0, `Cần $a>0$ nhưng $a=${say.n(v.a)}$.`, `Need $a>0$ but $a=${say.n(v.a)}$.`],
          [d < 0, `$\\Delta=${say.n(d)}\\ge0$ nên vẫn chạm hoặc cắt $Ox$.`, `$\\Delta=${say.n(d)}\\ge0$ so it still touches or crosses $Ox$.`],
        ], [`$a>0$ nhưng $\\Delta=${say.n(d)}<0$: câu đó sai.`, `$a>0$ but $\\Delta=${say.n(d)}<0$: the claim is false.`]);
      },
    },
    {
      id: "q-fence-150", level: 3,
      vi: "Chuồng có diện tích $S=x(40-2x)$. Tìm một $x$ cho $S=150$ rồi nhận ra còn một giá trị $x$ khác nữa.",
      en: "The pen has area $S=x(40-2x)$. Find one $x$ with $S=150$ and notice there is a second value of $x$.",
      hint: B("Parabola đối xứng quanh $x=10$, nên hai nghiệm cách đều $10$.", "The parabola is symmetric about $x=10$, so the two solutions are equally far from $10$."),
      set: { scene: 2, fence: 3 }, sol: { scene: 2, fence: 5 },
      check: (v, say) => {
        const area = fence(v.fence).area;
        return judge(say, [[near(area, 150, 1e-6), `$S=${say.n(area)}$, cần $150$.`, `$S=${say.n(area)}$, it should be $150$.`]],
          [`$S=150$ tại $x=${say.n(v.fence)}$ và cả $x=${say.n(20 - v.fence)}$, đối xứng qua $10$.`, `$S=150$ at $x=${say.n(v.fence)}$ and also $x=${say.n(20 - v.fence)}$, symmetric about $10$.`]);
      },
    },
  ],
  ineq: [
    {
      id: "i-gap", level: 2,
      vi: "Chọn $a$, $b$ dương để trung bình cộng hơn trung bình nhân hơn $3$ đơn vị.",
      en: "Choose positive $a$ and $b$ so the arithmetic mean exceeds the geometric mean by more than $3$.",
      hint: B("Hai số càng lệch nhau thì hiệu càng lớn.", "The further apart the two numbers, the bigger the gap."),
      set: { scene: 0, a: 4, b: 9 }, sol: { scene: 0, a: 0.5, b: 12 },
      check: (v, say) => {
        const m = amGm(v.a, v.b);
        const gap = m ? m.am - m.gm : 0;
        return judge(say, [[m !== null, `Cần $a>0$ và $b>0$.`, `Both $a>0$ and $b>0$ are needed.`], [gap > 3, `Hiệu mới là $${say.n(gap)}$, chưa vượt $3$.`, `The gap is only $${say.n(gap)}$, not above $3$.`]],
          [`Hiệu $${say.n(gap)}>3$: dấu bằng chỉ khi $a=b$, càng xa càng hơn.`, `Gap $${say.n(gap)}>3$: equality only at $a=b$, and it grows as they drift apart.`]);
      },
    },
    {
      id: "i-cauchy-gap", level: 3,
      vi: "Chọn bốn số để vế trái hơn vế phải ít nhất $50$ trong bất đẳng thức Bu-nhi-a-cốp-xki.",
      en: "Choose four numbers so the left side beats the right side by at least $50$ in Cauchy-Schwarz.",
      hint: B("Hiệu hai vế bằng $(ad-bc)^2$; làm $ad-bc$ lớn.", "The difference of the sides is $(ad-bc)^2$; make $ad-bc$ large."),
      set: { scene: 1, p: 1, q: 2, c: 3, d: 4 }, sol: { scene: 1, p: 6, q: 0, c: 0, d: 6 },
      check: (v, say) => {
        const pr = cauchyPair(v.p, v.q, v.c, v.d);
        const gap = pr.left - pr.right;
        return judge(say, [[gap >= 50, `Hiệu hai vế là $${say.n(gap)}=(ad-bc)^2$, chưa tới $50$.`, `The sides differ by $${say.n(gap)}=(ad-bc)^2$, below $50$.`]],
          [`Hiệu hai vế $${say.n(gap)}=(ad-bc)^2\\ge50$.`, `The sides differ by $${say.n(gap)}=(ad-bc)^2\\ge50$.`]);
      },
    },
    {
      id: "i-least-wood", level: 3,
      vi: "Tìm điểm trong miền cho $P=5x+3y=30$ mà dùng ít gỗ nhất ($x+y$ nhỏ nhất).",
      en: "Find a point in the region with $P=5x+3y=30$ that uses the least wood (smallest $x+y$).",
      hint: B("Một bàn sinh lời nhiều hơn một ghế, nên ưu tiên bàn.", "A desk earns more than a chair, so favour desks."),
      set: { scene: 2, x: 2, y: 2 }, sol: { scene: 2, x: 6, y: 0 },
      check: (v, say) => judge(say, [
        [workshopOk(v.x, v.y), `Điểm nằm ngoài miền.`, `The point is outside the region.`],
        [near(workshopProfit(v.x, v.y), 30, 1e-9), `$P=${say.n(workshopProfit(v.x, v.y))}$, cần $30$.`, `$P=${say.n(workshopProfit(v.x, v.y))}$, it should be $30$.`],
        [v.x + v.y <= 6 + 1e-9, `Dùng $${say.n(v.x + v.y)}$ gỗ, còn dùng ít hơn được.`, `It uses $${say.n(v.x + v.y)}$ wood, less is possible.`],
      ], [`Dùng $6$ gỗ cho $P=30$: chỉ làm bàn.`, `$6$ wood for $P=30$: make desks only.`]),
    },
  ],
  exp: [
    {
      id: "e-fraction", level: 1,
      vi: "Chọn $a$ và $x$ (có $x<0$) để $a^x=\\frac{1}{4}$.",
      en: "Choose $a$ and $x$ (with $x<0$) so that $a^x=\\frac{1}{4}$.",
      hint: B("$2^{-2}=\\frac{1}{4}$.", "$2^{-2}=\\frac{1}{4}$."),
      set: { scene: 0, base: 3, x: 1 }, sol: { scene: 0, base: 2, x: -2 },
      check: (v, say) => {
        const y = expY(v.base, v.x);
        return judge(say, [[baseOk(v.base), `Cơ số chưa hợp lệ.`, `The base is not valid.`], [v.x < 0, `Cần $x<0$.`, `Need $x<0$.`], [near(y, 0.25, 0.006), `$a^x=${say.n(y)}$, cần $0{,}25$.`.replace("0{,}25", say.en ? "0.25" : "0{,}25"), `$a^x=${say.n(y)}$, it should be $0.25$.`]],
          [`$${say.n(v.base)}^{${say.n(v.x)}}=\\frac{1}{${say.n(1 / y)}}$.`, `$${say.n(v.base)}^{${say.n(v.x)}}=\\frac{1}{${say.n(1 / y)}}$.`]);
      },
    },
    {
      id: "e-gap", level: 2,
      vi: "Chọn lãi suất và số năm để lãi kép hơn lãi đơn ít nhất $5$ triệu trên $10$ triệu gốc.",
      en: "Choose a rate and years so compound interest beats simple interest by at least $5$ million on a $10$ million deposit.",
      hint: B("Chênh lệch lớn dần khi cả lãi suất và thời gian tăng.", "The gap grows as both rate and time grow."),
      set: { scene: 1, rate: 5, years: 4 }, sol: { scene: 1, rate: 10, years: 10 },
      check: (v, say) => {
        const gap = compoundAmount(v.rate, v.years) - simpleAmount(v.rate, v.years);
        return judge(say, [[gap >= 5, `Chênh lệch chỉ $${say.n(gap)}$ triệu.`, `The gap is only $${say.n(gap)}$ million.`]], [`Lãi kép hơn lãi đơn $${say.n(gap)}$ triệu: lãi sinh lãi.`, `Compound beats simple by $${say.n(gap)}$ million: interest earns interest.`]);
      },
    },
    {
      id: "e-fast-double", level: 3,
      vi: "Tìm lãi suất để $10$ triệu gấp đôi trong đúng $5$ năm hoặc ít hơn.",
      en: "Find a rate that doubles $10$ million in $5$ years or fewer.",
      hint: B("Cần $(1+r)^5\\ge2$, tức $r\\ge14{,}9\\%$.", "Need $(1+r)^5\\ge2$, that is $r\\ge14.9\\%$."),
      set: { scene: 1, rate: 5, years: 4 }, sol: { scene: 1, rate: 15, years: 5 },
      check: (v, say) => {
        const total = compoundAmount(v.rate, v.years);
        return judge(say, [[v.years <= 5, `Số năm vượt $5$.`, `More than $5$ years.`], [total >= 20, `Chỉ được $${say.n(total)}$ triệu.`, `Only $${say.n(total)}$ million.`]], [`$${say.n(total)}\\ge20$ triệu.`, `$${say.n(total)}\\ge20$ million.`]);
      },
    },
  ],
  sequence: [
    {
      id: "s-sum-55", level: 1,
      vi: "Chọn $u_1$, $d$ dương và $n$ để tổng $n$ số hạng đầu bằng $55$.",
      en: "Choose $u_1$, a positive $d$ and $n$ so the sum of the first $n$ terms is $55$.",
      hint: B("Thử $1+2+\\cdots+10$.", "Try $1+2+\\cdots+10$."),
      set: { scene: 0, u1: 3, d: 4, n: 10 }, sol: { scene: 0, u1: 1, d: 1, n: 10 },
      check: (v, say) => {
        const sum = arithSum(v.u1, v.d, v.n);
        return judge(say, [[v.d > 0, `Công sai chưa dương.`, `The common difference is not positive.`], [near(sum, 55, 1e-9), `$S_n=${say.n(sum)}$, cần $55$.`, `$S_n=${say.n(sum)}$, it should be $55$.`]], [`$S_n=55$.`, `$S_n=55$.`]);
      },
    },
    {
      id: "s-negative-q", level: 2,
      vi: "Với $u_1=8$, chọn $q$ âm để tổng vô hạn bằng $\\frac{16}{3}$.",
      en: "With $u_1=8$, choose a negative $q$ so the infinite sum is $\\frac{16}{3}$.",
      hint: B("$\\frac{8}{1-q}=\\frac{16}{3}$ cho $1-q=\\frac{3}{2}$.", "$\\frac{8}{1-q}=\\frac{16}{3}$ gives $1-q=\\frac{3}{2}$."),
      set: { scene: 1, g1: 8, q: 0.5, gn: 6 }, sol: { scene: 1, g1: 8, q: -0.5, gn: 6 },
      check: (v, say) => {
        const sum = geomInfinite(v.g1, v.q);
        return judge(say, [[v.g1 === 8, `Giữ $u_1=8$.`, `Keep $u_1=8$.`], [v.q < 0, `Cần $q<0$.`, `Need $q<0$.`], [sum !== null && near(sum, 16 / 3, 1e-6), `$S=${say.n(sum ?? 0)}$, cần $\\frac{16}{3}$.`, `$S=${say.n(sum ?? 0)}$, it should be $\\frac{16}{3}$.`]],
          [`$\\frac{8}{1+0{,}5}=\\frac{16}{3}$: dấu luân phiên vẫn hội tụ.`.replace("0{,}5", say.en ? "0.5" : "0{,}5"), `$\\frac{8}{1+0.5}=\\frac{16}{3}$: alternating signs still converge.`]);
      },
    },
    {
      id: "s-savings", level: 2,
      vi: "Tháng thứ $k$ gửi $k$ nghìn. Tìm số tháng nhỏ nhất để tổng gửi đạt ít nhất $50$ nghìn.",
      en: "In month $k$ you deposit $k$ thousand. Find the smallest number of months for the total to reach at least $50$ thousand.",
      hint: B("Tổng là $\\frac{n(n+1)}{2}$.", "The total is $\\frac{n(n+1)}{2}$."),
      set: { scene: 2, months: 4 }, sol: { scene: 2, months: 10 },
      check: (v, say) => {
        const total = savingsSum(v.months);
        return judge(say, [[total >= 50, `Sau $${say.n(v.months)}$ tháng mới được $${say.n(total)}$.`, `After $${say.n(v.months)}$ months only $${say.n(total)}$.`], [savingsSum(v.months - 1) < 50, `Với ít tháng hơn đã đủ $50$ rồi.`, `Fewer months already reach $50$.`]],
          [`$\\frac{10\\cdot11}{2}=55\\ge50$ còn $9$ tháng chỉ $45$.`, `$\\frac{10\\cdot11}{2}=55\\ge50$ while $9$ months give only $45$.`]);
      },
    },
  ],
  trig: [
    {
      id: "t-quad4", level: 1,
      vi: "Tìm góc có $\\sin\\alpha<0$ và $\\cos\\alpha>0$.",
      en: "Find an angle with $\\sin\\alpha<0$ and $\\cos\\alpha>0$.",
      hint: B("Đó là góc phần tư thứ tư.", "That is the fourth quadrant."),
      set: { scene: 0, angle: 150 }, sol: { scene: 0, angle: 300 },
      check: (v, say) => judge(say, [[sinDeg(v.angle) < 0, `$\\sin=${say.n(sinDeg(v.angle))}$ chưa âm.`, `$\\sin=${say.n(sinDeg(v.angle))}$ is not negative.`], [cosDeg(v.angle) > 0, `$\\cos=${say.n(cosDeg(v.angle))}$ chưa dương.`, `$\\cos=${say.n(cosDeg(v.angle))}$ is not positive.`]],
        [`Góc phần tư thứ tư: sin âm, cos dương.`, `Fourth quadrant: sine negative, cosine positive.`]),
    },
    {
      id: "t-cos-half", level: 2,
      vi: "Tìm góc có $\\cos\\alpha=-\\frac{1}{2}$ và $\\sin\\alpha<0$.",
      en: "Find an angle with $\\cos\\alpha=-\\frac{1}{2}$ and $\\sin\\alpha<0$.",
      hint: B("Góc phần tư thứ ba, tham chiếu $60^\\circ$.", "Third quadrant, reference angle $60^\\circ$."),
      set: { scene: 0, angle: 100 }, sol: { scene: 0, angle: 240 },
      check: (v, say) => judge(say, [[near(cosDeg(v.angle), -0.5, 1e-6), `$\\cos=${say.n(cosDeg(v.angle))}$, cần $-0{,}5$.`.replace("0{,}5", say.en ? "0.5" : "0{,}5"), `$\\cos=${say.n(cosDeg(v.angle))}$, it should be $-0.5$.`], [sinDeg(v.angle) < 0, `$\\sin\\alpha>0$ nên đây là góc $120^\\circ$, không phải $240^\\circ$.`, `$\\sin\\alpha>0$, so this is $120^\\circ$, not $240^\\circ$.`]],
        [`$240^\\circ=180^\\circ+60^\\circ$.`, `$240^\\circ=180^\\circ+60^\\circ$.`]),
    },
    {
      id: "t-far-tree", level: 3,
      vi: "Đứng cách cây $40$ m, chọn góc ngẩng để cây cao khoảng $24$ m (mắt cao $1{,}5$ m).",
      en: "Standing $40$ m from the tree, choose the angle so it is about $24$ m tall (eye height $1.5$ m).",
      hint: B("$40\\tan\\alpha=22{,}5$.", "$40\\tan\\alpha=22.5$."),
      set: { scene: 1, distance: 20, tilt: 30 }, sol: { scene: 1, distance: 40, tilt: 29 },
      check: (v, say) => {
        const h = treeHeight(v.distance, v.tilt);
        return judge(say, [[v.distance === 40, `Đứng cách $40$ m.`, `Stand $40$ m away.`], [near(h, 24, 0.5), `Cao $${say.n(h)}$ m, cần gần $24$ m.`, `Height $${say.n(h)}$ m, it should be near $24$ m.`]], [`$40\\tan\\alpha+1{,}5=${say.n(h)}$ m.`.replace("1{,}5", say.en ? "1.5" : "1{,}5"), `$40\\tan\\alpha+1.5=${say.n(h)}$ m.`]);
      },
    },
  ],
  limit: [
    {
      id: "l-two-sided", level: 1,
      vi: "Chọn giá trị trái và phải để giới hạn tại $0$ không tồn tại.",
      en: "Choose the left and right values so the limit at $0$ does not exist.",
      hint: B("Hai giới hạn một phía phải khác nhau.", "The two one-sided limits must differ."),
      set: { scene: 1, left: 1, right: 1, at: 1 }, sol: { scene: 1, left: -1, right: 1, at: 0 },
      check: (v, say) => judge(say, [[!jumpStudy(v.left, v.right, v.at).exists, `Hai giới hạn cùng bằng $${say.n(v.left)}$ nên giới hạn tồn tại.`, `Both limits equal $${say.n(v.left)}$, so the limit exists.`]], [`$${say.n(v.left)}\\ne${say.n(v.right)}$: đồ thị nhảy.`, `$${say.n(v.left)}\\ne${say.n(v.right)}$: the graph jumps.`]),
    },
    {
      id: "l-continuous-two", level: 2,
      vi: "Chọn để hàm liên tục tại $0$ với giá trị chung bằng $2$.",
      en: "Choose the values so the function is continuous at $0$ with common value $2$.",
      hint: B("Trái, phải và $f(0)$ cùng bằng $2$.", "Left, right and $f(0)$ are all $2$."),
      set: { scene: 1, left: 1, right: 1, at: 2 }, sol: { scene: 1, left: 2, right: 2, at: 2 },
      check: (v, say) => {
        const s = jumpStudy(v.left, v.right, v.at);
        return judge(say, [[s.exists, `Hai giới hạn chưa bằng nhau.`, `The one-sided limits differ.`], [s.continuous, `$f(0)\\ne$ giới hạn.`.replace("\\ne$", "\\ne$"), `$f(0)\\ne$ the limit.`], [near(v.at, 2, 1e-9), `Giá trị chung là $${say.n(v.at)}$, cần $2$.`, `The common value is $${say.n(v.at)}$, it should be $2$.`]], [`Cả ba cùng bằng $2$.`, `All three equal $2$.`]);
      },
    },
    {
      id: "l-tea-close", level: 3,
      vi: "Tìm $t$ để trà chỉ còn cao hơn nhiệt độ phòng ($25^\\circ\\mathrm{C}$) dưới $1^\\circ\\mathrm{C}$.",
      en: "Find $t$ so the tea is less than $1^\\circ\\mathrm{C}$ above room temperature ($25^\\circ\\mathrm{C}$).",
      hint: B("Cần $60e^{-t/4}<1$.", "Need $60e^{-t/4}<1$."),
      set: { scene: 2, time: 0 }, sol: { scene: 2, time: 17 },
      check: (v, say) => {
        const temp = coolingTemp(v.time);
        return judge(say, [[temp - 25 < 1, `Còn cao hơn phòng $${say.n(temp - 25)}^\\circ\\mathrm{C}$.`, `Still $${say.n(temp - 25)}^\\circ\\mathrm{C}$ above room temperature.`]], [`Chỉ cao hơn $${say.n(temp - 25)}^\\circ\\mathrm{C}$ mà vẫn không chạm $25$.`, `Only $${say.n(temp - 25)}^\\circ\\mathrm{C}$ above, yet never touching $25$.`]);
      },
    },
  ],
  derivative: [
    {
      id: "d-left-secant", level: 1,
      vi: "Chọn $h<0$ nhỏ để cát tuyến bên trái vẫn có hệ số góc gần $2$ (sai lệch dưới $0{,}1$).",
      en: "Choose a small $h<0$ so the left secant still has slope near $2$ (within $0.1$).",
      hint: B("Hệ số góc là $2+h$, kể cả khi $h$ âm.", "The slope is $2+h$ even when $h$ is negative."),
      set: { scene: 0, h: 1 }, sol: { scene: 0, h: -0.05 },
      check: (v, say) => {
        const slope = secantSlope(1, v.h);
        return judge(say, [[v.h < -0.001, `Cần $h<0$.`, `Need $h<0$.`], [Math.abs(slope - 2) < 0.1, `Hệ số góc $${say.n(slope)}$ còn lệch $${say.n(Math.abs(slope - 2))}$.`, `The slope $${say.n(slope)}$ is still off by $${say.n(Math.abs(slope - 2))}$.`]], [`Hệ số góc $${say.n(slope)}$: cả hai phía cùng tiến về $2$.`, `Slope $${say.n(slope)}$: both sides head for $2$.`]);
      },
    },
    {
      id: "d-falling-high", level: 2,
      vi: "Chọn $v_0$ và $t$ để vật đang rơi xuống ($v<0$) mà vẫn cao ít nhất $10$ m.",
      en: "Choose $v_0$ and $t$ so the ball is falling ($v<0$) yet still at least $10$ m high.",
      hint: B("Chọn $t$ sau thời điểm đỉnh nhưng trước khi chạm đất.", "Pick $t$ after the top but before landing."),
      set: { scene: 1, v0: 20, time: 0 }, sol: { scene: 1, v0: 20, time: 3 },
      check: (v, say) => {
        const p = projectile(v.v0, v.time);
        return judge(say, [[p.v < 0, `Vận tốc $${say.n(p.v)}$ chưa âm.`, `Velocity $${say.n(p.v)}$ is not negative.`], [p.h >= 10, `Độ cao $${say.n(p.h)}$ m, dưới $10$ m.`, `Height $${say.n(p.h)}$ m, below $10$ m.`]], [`Cao $${say.n(p.h)}$ m, $v=${say.n(p.v)}<0$.`, `Height $${say.n(p.h)}$ m, $v=${say.n(p.v)}<0$.`]);
      },
    },
    {
      id: "d-brake-stop", level: 2,
      vi: "Tìm $t$ để xe vừa dừng hẳn.",
      en: "Find $t$ so the car has just come to a complete stop.",
      hint: B("Vận tốc $20-4t=0$.", "The velocity $20-4t=0$."),
      set: { scene: 2, brake: 0 }, sol: { scene: 2, brake: 5 },
      check: (v, say) => {
        const m = brakeMotion(v.brake);
        return judge(say, [[near(m.v, 0, 0.01), `Tại $t=${say.n(v.brake)}$ s xe còn $${say.n(m.v)}$ m/s.`, `At $t=${say.n(v.brake)}$ s the car still moves at $${say.n(m.v)}$ m/s.`]], [`$v=20-4\\cdot5=0$, đã đi $${say.n(m.s)}$ m.`, `$v=20-4\\cdot5=0$, it has gone $${say.n(m.s)}$ m.`]);
      },
    },
  ],
  survey: [
    {
      id: "v-min", level: 1,
      vi: "Đưa $x$ tới điểm cực tiểu của $y=x^3-3x$.",
      en: "Move $x$ to the local minimum of $y=x^3-3x$.",
      hint: B("Cực tiểu có $y'=0$ và $y''>0$.", "A minimum has $y'=0$ and $y''>0$."),
      set: { scene: 0, x: 0 }, sol: { scene: 0, x: 1 },
      check: (v, say) => judge(say, [[near(cubicSlope(v.x), 0, 0.01), `$y'=${say.n(cubicSlope(v.x))}$, chưa bằng $0$.`, `$y'=${say.n(cubicSlope(v.x))}$, not $0$ yet.`], [cubicSecond(v.x) > 0, `Đây là cực đại.`, `This is the maximum.`]], [`$y'=0$, $y''>0$ tại $x=1$: $y=-2$.`, `$y'=0$, $y''>0$ at $x=1$: $y=-2$.`]),
    },
    {
      id: "v-decreasing", level: 1,
      vi: "Tìm $x$ trong khoảng $(-1;\\ 1)$ để hàm đang nghịch biến.",
      en: "Find $x$ in $(-1,\\ 1)$ where the function is decreasing.",
      hint: B("Nghịch biến khi $y'=3x^2-3<0$.", "Decreasing when $y'=3x^2-3<0$."),
      set: { scene: 0, x: 2 }, sol: { scene: 0, x: 0 },
      check: (v, say) => judge(say, [[v.x > -1 && v.x < 1, `$x=${say.n(v.x)}$ nằm ngoài khoảng $(-1;\\ 1)$.`.replace(";\\ ", say.en ? ",\\ " : ";\\ "), `$x=${say.n(v.x)}$ is outside $(-1,\\ 1)$.`], [cubicSlope(v.x) < 0, `$y'=${say.n(cubicSlope(v.x))}$ chưa âm.`, `$y'=${say.n(cubicSlope(v.x))}$ is not negative.`]], [`$y'=${say.n(cubicSlope(v.x))}<0$ nên hàm giảm.`, `$y'=${say.n(cubicSlope(v.x))}<0$ so the function falls.`]),
    },
    {
      id: "v-steep", level: 2,
      vi: "Với $y=x^3$, tìm $x$ để tiếp tuyến có hệ số góc $12$.",
      en: "For $y=x^3$, find $x$ where the tangent has slope $12$.",
      hint: B("$3x^2=12$.", "$3x^2=12$."),
      set: { scene: 2, px: 0 }, sol: { scene: 2, px: 2 },
      check: (v, say) => judge(say, [[near(pureCubicSlope(v.px), 12, 0.01), `$y'=${say.n(pureCubicSlope(v.px))}$, cần $12$.`, `$y'=${say.n(pureCubicSlope(v.px))}$, it should be $12$.`]], [`$3\\cdot${say.n(v.px)}^2=12$.`, `$3\\cdot${say.n(v.px)}^2=12$.`]),
    },
  ],
  integral: [
    {
      id: "g-max-area", level: 1,
      vi: "Chọn cận $b$ để diện tích dưới parabol $y=2x-x^2$ từ $0$ đến $b$ lớn nhất.",
      en: "Choose the bound $b$ so the area under $y=2x-x^2$ from $0$ to $b$ is as large as possible.",
      hint: B("Hàm không âm trên $[0;\\ 2]$ nên càng lấy rộng càng lớn.", "The function is non-negative on $[0,\\ 2]$, so wider is bigger."),
      set: { scene: 0, upper: 1, strips: 8 }, sol: { scene: 0, upper: 2, strips: 8 },
      check: (v, say) => judge(say, [[v.upper >= 1.999, `Với $b=${say.n(v.upper)}$ diện tích mới $${say.n(archIntegral(v.upper))}$, còn tăng được.`, `With $b=${say.n(v.upper)}$ the area is $${say.n(archIntegral(v.upper))}$, it can still grow.`]], [`$b=2$ cho diện tích $\\frac{4}{3}$.`, `$b=2$ gives area $\\frac{4}{3}$.`]),
    },
    {
      id: "g-overestimate", level: 2,
      vi: "Với $b=2$, chọn $n$ để tổng hình chữ nhật lớn hơn diện tích thật nhưng lệch dưới $0{,}2$.",
      en: "With $b=2$, choose $n$ so the rectangle sum is above the true area but off by less than $0.2$.",
      hint: B("Dải rộng thì lệch nhiều, dải hẹp thì lệch ít.", "Wide strips miss a lot, narrow ones less."),
      set: { scene: 0, upper: 2, strips: 1 }, sol: { scene: 0, upper: 2, strips: 2 },
      check: (v, say) => {
        const diff = archRiemann(v.strips, v.upper) - archIntegral(v.upper);
        return judge(say, [[v.upper === 2, `Giữ $b=2$.`, `Keep $b=2$.`], [diff > 0, `Tổng đang nhỏ hơn diện tích thật.`, `The sum is below the true area.`], [diff < 0.2, `Tổng lớn hơn $${say.n(diff)}$, cần dưới $0{,}2$.`.replace("0{,}2", say.en ? "0.2" : "0{,}2"), `The sum is above by $${say.n(diff)}$, it must be under $0.2$.`]], [`Tổng hơn diện tích thật $${say.n(diff)}$.`, `The sum exceeds the true area by $${say.n(diff)}$.`]);
      },
    },
    {
      id: "g-half-volume", level: 3,
      vi: "Chọn $b$ để $\\int_0^b y^2\\,dx=\\frac{8}{15}$.",
      en: "Choose $b$ so that $\\int_0^b y^2\\,dx=\\frac{8}{15}$.",
      hint: B("Thử $b=1$.", "Try $b=1$."),
      set: { scene: 2, span: 2 }, sol: { scene: 2, span: 1 },
      check: (v, say) => judge(say, [[near(archVolumeCoeff(v.span), 8 / 15, 1e-9), `Tích phân bằng $${say.n(archVolumeCoeff(v.span))}$, cần $\\frac{8}{15}$.`, `The integral is $${say.n(archVolumeCoeff(v.span))}$, it should be $\\frac{8}{15}$.`]], [`$\\frac{4}{3}-1+\\frac{1}{5}=\\frac{8}{15}$.`, `$\\frac{4}{3}-1+\\frac{1}{5}=\\frac{8}{15}$.`]),
    },
  ],
  probability: [
    {
      id: "p-bayes-90", level: 3,
      vi: "Chọn tỉ lệ bệnh, độ nhạy và dương giả để người dương tính bệnh thật với xác suất ít nhất $90\\%$.",
      en: "Choose prevalence, sensitivity and false positives so a positive person is truly sick with probability at least $90\\%$.",
      hint: B("Tăng tỉ lệ bệnh và hạ dương giả cùng lúc.", "Raise the prevalence and lower the false positives together."),
      set: { scene: 1, prev: 1, sens: 99, fpr: 5 }, sol: { scene: 1, prev: 20, sens: 100, fpr: 1 },
      check: (v, say) => {
        const b = bayes(v.prev, v.sens, v.fpr);
        return judge(say, [[b.posterior >= 0.9, `Mới đạt $${say.n(b.posterior * 100)}\\%$.`, `Only $${say.n(b.posterior * 100)}\\%$ so far.`]], [`$\\frac{${say.n(b.tp)}}{${say.n(b.positive)}}\\approx${say.n(b.posterior * 100)}\\%$.`, `$\\frac{${say.n(b.tp)}}{${say.n(b.positive)}}\\approx${say.n(b.posterior * 100)}\\%$.`]);
      },
    },
    {
      id: "p-binom-peak", level: 2,
      vi: "Với $n=4$ và $p=0{,}5$, chọn $k$ để $P(X=k)$ lớn nhất.",
      en: "With $n=4$ and $p=0.5$, choose $k$ so $P(X=k)$ is largest.",
      hint: B("Giá trị lớn nhất nằm ở giữa.", "The largest value is in the middle."),
      set: { scene: 2, n: 4, k: 0, p: 0.5 }, sol: { scene: 2, n: 4, k: 2, p: 0.5 },
      check: (v, say) => {
        const best = Math.max(...[0, 1, 2, 3, 4].map((k) => binom(4, k, 0.5)));
        const pr = binom(v.n, v.k, v.p);
        return judge(say, [[v.n === 4 && v.p === 0.5, `Giữ $n=4$, $p=0{,}5$.`.replace("0{,}5", say.en ? "0.5" : "0{,}5"), `Keep $n=4$, $p=0.5$.`], [near(pr, best, 1e-9), `$P=${say.n(pr)}$ còn nhỏ hơn giá trị lớn nhất $${say.n(best)}$.`, `$P=${say.n(pr)}$ is below the maximum $${say.n(best)}$.`]], [`$P(X=2)=\\frac{6}{16}$ lớn nhất.`, `$P(X=2)=\\frac{6}{16}$ is the largest.`]);
      },
    },
    {
      id: "p-at-least", level: 2,
      vi: "Chọn $n$ và $p$ để xác suất có ít nhất một lần thành công vượt $90\\%$.",
      en: "Choose $n$ and $p$ so the probability of at least one success exceeds $90\\%$.",
      hint: B("$1-(1-p)^n$ tăng theo $n$.", "$1-(1-p)^n$ grows with $n$."),
      set: { scene: 2, n: 2, k: 0, p: 0.2 }, sol: { scene: 2, n: 4, k: 0, p: 0.5 },
      check: (v, say) => {
        const pr = binomAtLeastOne(v.n, v.p);
        return judge(say, [[pr > 0.9, `Xác suất mới $${say.n(pr * 100)}\\%$.`, `The probability is only $${say.n(pr * 100)}\\%$.`]], [`$1-(1-${say.n(v.p)})^{${say.n(v.n)}}=${say.n(pr * 100)}\\%$.`, `$1-(1-${say.n(v.p)})^{${say.n(v.n)}}=${say.n(pr * 100)}\\%$.`]);
      },
    },
  ],
  vector: [
    {
      id: "w-parallel", level: 1,
      vi: "Chọn $\\vec u$ và $\\vec v$ khác $\\vec 0$ để tích có hướng $\\vec u\\times\\vec v=\\vec 0$.",
      en: "Choose nonzero $\\vec u$ and $\\vec v$ with cross product $\\vec u\\times\\vec v=\\vec 0$.",
      hint: B("Hai vectơ cùng phương.", "The two vectors are parallel."),
      set: { scene: 0, ux: 2, uy: 1, uz: 2, vx: 1, vy: -1, vz: 2 }, sol: { scene: 0, ux: 2, uy: 1, uz: 2, vx: 4, vy: 2, vz: 4 },
      check: (v, say) => {
        const u: [number, number, number] = [v.ux, v.uy, v.uz];
        const w: [number, number, number] = [v.vx, v.vy, v.vz];
        const cr = vec3Cross(u, w);
        return judge(say, [[u.some((x) => x !== 0) && w.some((x) => x !== 0), `Một vectơ là $\\vec 0$.`, `One vector is $\\vec 0$.`], [cr.every((x) => near(x, 0, 1e-9)), `$\\vec u\\times\\vec v=(${cr.map((x) => say.n(x)).join(say.en ? ", " : ";\\ ")})\\ne\\vec 0$.`, `$\\vec u\\times\\vec v=(${cr.map((x) => say.n(x)).join(", ")})\\ne\\vec 0$.`]], [`Hai vectơ cùng phương nên tích có hướng bằng $\\vec 0$.`, `The vectors are parallel, so the cross product is $\\vec 0$.`]);
      },
    },
    {
      id: "w-det-neg", level: 2,
      vi: "Chọn ma trận $2\\times2$ có định thức nhỏ hơn $-5$.",
      en: "Choose a $2\\times2$ matrix with determinant below $-5$.",
      hint: B("Định thức $ad-bc$: làm $bc$ lớn.", "Determinant $ad-bc$: make $bc$ large."),
      set: { scene: 1, m11: 2, m12: 1, m21: 1, m22: -1 }, sol: { scene: 1, m11: 1, m12: 3, m21: 3, m22: 1 },
      check: (v, say) => {
        const d = det2(v.m11, v.m12, v.m21, v.m22);
        return judge(say, [[d < -5, `$ad-bc=${say.n(d)}$, chưa nhỏ hơn $-5$.`, `$ad-bc=${say.n(d)}$, not below $-5$ yet.`]], [`$ad-bc=${say.n(d)}<-5$: định thức âm là đổi chiều.`, `$ad-bc=${say.n(d)}<-5$: a negative determinant flips orientation.`]);
      },
    },
    {
      id: "w-no-solution", level: 3,
      vi: "Chọn hệ hai phương trình vô nghiệm (hai đường thẳng song song, không trùng).",
      en: "Choose a system with no solution (two parallel, distinct lines).",
      hint: B("Hai vế trái tỉ lệ nhưng hai vế phải không theo tỉ lệ đó.", "Left sides proportional, right sides not."),
      set: { scene: 2, s11: 2, s12: 1, t1: 5, s21: 1, s22: -1, t2: 1 }, sol: { scene: 2, s11: 2, s12: 1, t1: 5, s21: 2, s22: 1, t2: 1 },
      check: (v, say) => {
        const d = det2(v.s11, v.s12, v.s21, v.s22);
        const incons = v.s11 * v.t2 - v.s21 * v.t1 !== 0 || v.s12 * v.t2 - v.s22 * v.t1 !== 0;
        return judge(say, [[near(d, 0, 1e-9), `Định thức $${say.n(d)}\\ne0$ nên có nghiệm duy nhất.`, `The determinant $${say.n(d)}\\ne0$ so there is exactly one solution.`], [incons, `Hai đường thẳng trùng nhau: vô số nghiệm.`, `The two lines coincide: infinitely many solutions.`], [v.s11 !== 0 || v.s12 !== 0, `Phương trình thứ nhất suy biến.`, `The first equation is degenerate.`]], [`Định thức $0$ và vế phải không tỉ lệ: không có nghiệm.`, `Determinant $0$ and right sides not proportional: no solution.`]);
      },
    },
  ],
  analytic: [
    {
      id: "n-find-c", level: 2,
      vi: "Với $P(3;\\ 1)$ và đường thẳng $x+y+c=0$, chọn $c$ để khoảng cách bằng $2\\sqrt{2}$.",
      en: "With $P(3,\\ 1)$ and the line $x+y+c=0$, choose $c$ so the distance equals $2\\sqrt{2}$.",
      hint: B("$\\frac{|4+c|}{\\sqrt{2}}=2\\sqrt{2}$ cho $|4+c|=4$.", "$\\frac{|4+c|}{\\sqrt{2}}=2\\sqrt{2}$ gives $|4+c|=4$."),
      set: { scene: 0, a: 1, b: 1, c: -2, px: 3, py: 1 }, sol: { scene: 0, a: 1, b: 1, c: 0, px: 3, py: 1 },
      check: (v, say) => {
        const d = lineDist(v.a, v.b, v.c, v.px, v.py);
        return judge(say, [[v.a === 1 && v.b === 1 && v.px === 3 && v.py === 1, `Giữ $a=b=1$ và $P(3;\\ 1)$.`.replace(";\\ ", say.en ? ",\\ " : ";\\ "), `Keep $a=b=1$ and $P(3,\\ 1)$.`], [near(d, 2 * Math.SQRT2, 1e-6), `Khoảng cách $${say.n(d)}$, cần $2\\sqrt{2}\\approx2{,}83$.`.replace("2{,}83", say.en ? "2.83" : "2{,}83"), `The distance is $${say.n(d)}$, it should be $2\\sqrt{2}\\approx2.83$.`]], [`$\\frac{|4+${say.n(v.c)}|}{\\sqrt{2}}=2\\sqrt{2}$.`, `$\\frac{|4+${say.n(v.c)}|}{\\sqrt{2}}=2\\sqrt{2}$.`]);
      },
    },
    {
      id: "n-plane-sqrt3", level: 2,
      vi: "Đặt $Q$ cách mặt phẳng $x+y+z-6=0$ đúng $\\sqrt{3}$.",
      en: "Place $Q$ exactly $\\sqrt{3}$ from the plane $x+y+z-6=0$.",
      hint: B("$|x+y+z-6|=3$.", "$|x+y+z-6|=3$."),
      set: { scene: 1, pa: 1, pb: 1, pc: 1, pd: -6, qx: 2, qy: 2, qz: 2 }, sol: { scene: 1, pa: 1, pb: 1, pc: 1, pd: -6, qx: 1, qy: 1, qz: 1 },
      check: (v, say) => {
        const d = planeDist(v.pa, v.pb, v.pc, v.pd, v.qx, v.qy, v.qz);
        return judge(say, [[v.pa === 1 && v.pb === 1 && v.pc === 1 && v.pd === -6, `Giữ mặt phẳng $x+y+z-6=0$.`, `Keep the plane $x+y+z-6=0$.`], [near(d, Math.sqrt(3), 1e-6), `Khoảng cách $${say.n(d)}$, cần $\\sqrt{3}\\approx1{,}73$.`.replace("1{,}73", say.en ? "1.73" : "1{,}73"), `The distance is $${say.n(d)}$, it should be $\\sqrt{3}\\approx1.73$.`]], [`$\\frac{|${say.n(v.qx)}+${say.n(v.qy)}+${say.n(v.qz)}-6|}{\\sqrt{3}}=\\sqrt{3}$.`, `$\\frac{|${say.n(v.qx)}+${say.n(v.qy)}+${say.n(v.qz)}-6|}{\\sqrt{3}}=\\sqrt{3}$.`]);
      },
    },
    {
      id: "n-circle-in", level: 1,
      vi: "Chỉnh bán kính để điểm $(6;\\ 0)$ nằm trong đường tròn.",
      en: "Adjust the radius so the point $(6,\\ 0)$ lies inside the circle.",
      hint: B("Điểm nằm trong khi $OM<R$.", "A point is inside when $OM<R$."),
      set: { scene: 2, radius: 5 }, sol: { scene: 2, radius: 7 },
      check: (v, say) => judge(say, [[circlePlace(6, 0, v.radius) === "in", `$R=${say.n(v.radius)}\\le OM=6$ nên điểm chưa ở trong.`, `$R=${say.n(v.radius)}\\le OM=6$ so the point is not inside.`]], [`$OM=6<R=${say.n(v.radius)}$.`, `$OM=6<R=${say.n(v.radius)}$.`]),
    },
  ],
  triangle: [
    {
      id: "h-tri-18", level: 1,
      vi: "Chọn đáy khác chiều cao để tam giác có diện tích $18$.",
      en: "Choose a base different from the height so the triangle has area $18$.",
      hint: B("$\\text{đáy}\\cdot\\text{cao}=36$.", "$\\text{base}\\cdot\\text{height}=36$."),
      set: { scene: 0, base: 6, tall: 4 }, sol: { scene: 0, base: 9, tall: 4 },
      check: (v, say) => judge(say, [[near(triArea(v.base, v.tall), 18, 1e-9), `$S=${say.n(triArea(v.base, v.tall))}$, cần $18$.`, `$S=${say.n(triArea(v.base, v.tall))}$, it should be $18$.`], [v.base !== v.tall, `Đáy bằng chiều cao.`, `Base equals height.`]], [`Nhiều tam giác khác nhau có cùng diện tích $18$.`, `Many different triangles share area $18$.`]),
    },
    {
      id: "h-cube", level: 1,
      vi: "Chọn ba cạnh để hình hộp là hình lập phương thể tích $27$.",
      en: "Choose three edges so the box is a cube of volume $27$.",
      hint: B("Cạnh $\\sqrt[3]{27}$.", "The edge is $\\sqrt[3]{27}$."),
      set: { scene: 1, len: 2, wid: 2, ht: 2 }, sol: { scene: 1, len: 3, wid: 3, ht: 3 },
      check: (v, say) => judge(say, [[v.len === v.wid && v.wid === v.ht, `Ba cạnh chưa bằng nhau.`, `The three edges are not equal.`], [near(boxVolume(v.len, v.wid, v.ht), 27, 1e-9), `$V=${say.n(boxVolume(v.len, v.wid, v.ht))}$, cần $27$.`, `$V=${say.n(boxVolume(v.len, v.wid, v.ht))}$, it should be $27$.`]], [`$3^3=27$.`, `$3^3=27$.`]),
    },
    {
      id: "h-pyr-small-base", level: 2,
      vi: "Chọn chóp đáy vuông cạnh nhỏ hơn $6$ mà thể tích vẫn bằng $18$.",
      en: "Choose a square pyramid with base edge below $6$ and still volume $18$.",
      hint: B("Đáy nhỏ thì chiều cao phải lớn: $V=\\frac{1}{3}a^2h$.", "A smaller base needs a taller pyramid: $V=\\frac{1}{3}a^2h$."),
      set: { scene: 2, side: 6, ph: 4 }, sol: { scene: 2, side: 3, ph: 6 },
      check: (v, say) => {
        const vol = pyramidVolume(v.side, v.ph);
        return judge(say, [[v.side < 6, `Cạnh đáy $${say.n(v.side)}$ chưa nhỏ hơn $6$.`, `The base edge $${say.n(v.side)}$ is not below $6$.`], [near(vol, 18, 1e-9), `$V=${say.n(vol)}$, cần $18$.`, `$V=${say.n(vol)}$, it should be $18$.`]], [`$\\frac{1}{3}\\cdot${say.n(v.side * v.side)}\\cdot${say.n(v.ph)}=18$.`, `$\\frac{1}{3}\\cdot${say.n(v.side * v.side)}\\cdot${say.n(v.ph)}=18$.`]);
      },
    },
  ],
  combo: [
    {
      id: "c-symmetry", level: 1,
      vi: "Với $n=7$, tìm $k\\ne2$ sao cho $C_7^k=C_7^2$.",
      en: "With $n=7$, find $k\\ne2$ such that $C_7^k=C_7^2$.",
      hint: B("$C_n^k=C_n^{n-k}$.", "$C_n^k=C_n^{n-k}$."),
      set: { scene: 0, n: 7, k: 2 }, sol: { scene: 0, n: 7, k: 5 },
      check: (v, say) => judge(say, [[v.n === 7, `Giữ $n=7$.`, `Keep $n=7$.`], [v.k !== 2, `$k=2$ là chính nó.`, `$k=2$ is itself.`], [comb(7, v.k) === comb(7, 2), `$C_7^{${say.n(v.k)}}=${say.n(comb(7, v.k))}$, cần $21$.`, `$C_7^{${say.n(v.k)}}=${say.n(comb(7, v.k))}$, it should be $21$.`]], [`$C_7^5=C_7^2=21$.`, `$C_7^5=C_7^2=21$.`]),
    },
    {
      id: "c-a120", level: 2,
      vi: "Chọn $n$ và $k$ để $A_n^k=120$.",
      en: "Choose $n$ and $k$ so that $A_n^k=120$.",
      hint: B("$120=6\\cdot5\\cdot4$ hoặc $5!$.", "$120=6\\cdot5\\cdot4$ or $5!$."),
      set: { scene: 0, n: 4, k: 2 }, sol: { scene: 0, n: 6, k: 3 },
      check: (v, say) => judge(say, [[arrange(v.n, v.k) === 120, `$A_{${say.n(v.n)}}^{${say.n(v.k)}}=${say.n(arrange(v.n, v.k))}$, cần $120$.`, `$A_{${say.n(v.n)}}^{${say.n(v.k)}}=${say.n(arrange(v.n, v.k))}$, it should be $120$.`]], [`$A_{${say.n(v.n)}}^{${say.n(v.k)}}=120$.`, `$A_{${say.n(v.n)}}^{${say.n(v.k)}}=120$.`]),
    },
    {
      id: "c-low-outlier", level: 3,
      vi: "Chọn điểm lệch để trung vị bằng $3$ và trung bình nhỏ hơn $3$.",
      en: "Choose the outlier so the median is $3$ and the mean is below $3$.",
      hint: B("Điểm lệch phải nhỏ hơn $2$ hoặc bằng $2$.", "The outlier must be at most $2$."),
      set: { scene: 2, outlier: 6 }, sol: { scene: 2, outlier: 0 },
      check: (v, say) => {
        const scores = [2, 3, 4, 5, v.outlier];
        const mean = meanOf(scores);
        const median = medianOf(scores);
        return judge(say, [[median === 3, `Trung vị là $${say.n(median)}$, cần $3$.`, `The median is $${say.n(median)}$, it should be $3$.`], [mean < 3, `Trung bình $${say.n(mean)}$ chưa nhỏ hơn $3$.`, `The mean $${say.n(mean)}$ is not below $3$.`]], [`Trung vị $3$, trung bình $${say.n(mean)}$.`, `Median $3$, mean $${say.n(mean)}$.`]);
      },
    },
  ],
};

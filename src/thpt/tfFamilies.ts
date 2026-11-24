/**
 * Câu Đúng/Sai theo dạng đề thật: một dữ kiện cụ thể (hàm số, đạo hàm, tọa độ, bảng đếm, dãy số) và bốn ý
 * cần tính hoặc suy luận. Mỗi ý có hai bản, đúng và sai, cùng do máy dựng từ cùng một phép tính, nên đáp án
 * đúng theo cách dựng và mỗi lần rút đề ra số liệu khác.
 */

import { bbt } from "../grades/bbt.ts";

export type Stmt = { vi: string; en: string; truth: boolean; whyVi: string; whyEn: string };
export type FamilyQuestion = { topic: string; contextVi: string; contextEn: string; statements: [Stmt, Stmt, Stmt, Stmt] };
export type Family = { topic: string; vi: string; en: string; make: (rng: () => number) => FamilyQuestion };

type Rng = () => number;
const int = (rng: Rng, lo: number, hi: number): number => lo + Math.floor(rng() * (hi - lo + 1));
const pick = <T,>(rng: Rng, list: readonly T[]): T => list[Math.floor(rng() * list.length)] as T;

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) [x, y] = [y, x % y];
  return x || 1;
}
/** Phân số tối giản dạng TeX (và dạng chữ cho phần tiếng Anh dùng cùng ký hiệu). */
function frac(n: number, d: number): string {
  const g = gcd(n, d);
  const num = (d < 0 ? -n : n) / g;
  const den = Math.abs(d) / g;
  if (den === 1) return String(num);
  return `${num < 0 ? "-" : ""}\\frac{${Math.abs(num)}}{${den}}`;
}
const signed = (n: number, first = false): string => (n < 0 ? `-${-n}` : first ? String(n) : `+${n}`);

/** One property: the true form and a false form of the same sentence, each with its reason. */
type Prop = { yes: Omit<Stmt, "truth">; no: Omit<Stmt, "truth"> };
const prop = (yes: [string, string, string, string], no: [string, string, string, string]): Prop => ({
  yes: { vi: yes[0], en: yes[1], whyVi: yes[2], whyEn: yes[3] },
  no: { vi: no[0], en: no[1], whyVi: no[2], whyEn: no[3] },
});

/** Choose four properties and a truth pattern that has at least one true and one false statement. */
function assemble(rng: Rng, props: Prop[]): [Stmt, Stmt, Stmt, Stmt] {
  const order = props.map((p, i) => ({ p, k: rng(), i })).sort((a, b) => a.k - b.k).slice(0, 4);
  let truths: boolean[];
  do truths = order.map(() => rng() < 0.5);
  while (truths.every((t) => t) || truths.every((t) => !t));
  return order.map(({ p }, i) => ({ ...(truths[i] ? p.yes : p.no), truth: truths[i] as boolean })) as [Stmt, Stmt, Stmt, Stmt];
}

/* ---------- 1. Hàm bậc ba y = x³ − 3k²x + c ---------- */
const cubic: Family = {
  topic: "cubic",
  vi: "Khảo sát hàm bậc ba",
  en: "Cubic functions",
  make: (rng) => {
    const k = int(rng, 1, 3);
    const c = pick(rng, [-4, -2, 1, 2, 3, 5]);
    const fx = `x^3-${3 * k * k}x${signed(c)}`;
    const dy = `y'=3x^2-${3 * k * k}=3(x-${k})(x+${k})`;
    const max = 2 * k ** 3 + c;
    const min = c - 2 * k ** 3;
    return {
      topic: "cubic",
      contextVi: `Cho hàm số $y=${fx}$ có đạo hàm $${dy}$.`,
      contextEn: `Consider the function $y=${fx}$ with derivative $${dy}$.`,
      statements: assemble(rng, [
        prop(
          [`Hàm số nghịch biến trên khoảng $(-${k};\\ ${k})$.`, `The function is decreasing on $(-${k},\\ ${k})$.`, `Trên $(-${k};\\ ${k})$ thì $(x-${k})(x+${k})<0$ nên $y'<0$.`, `On $(-${k},\\ ${k})$ we have $(x-${k})(x+${k})<0$, so $y'<0$.`],
          [`Hàm số đồng biến trên khoảng $(-${k};\\ ${k})$.`, `The function is increasing on $(-${k},\\ ${k})$.`, `Trên $(-${k};\\ ${k})$ thì $y'<0$ nên hàm số nghịch biến, không đồng biến.`, `On $(-${k},\\ ${k})$ we have $y'<0$, so the function is decreasing, not increasing.`],
        ),
        prop(
          [`Hàm số đạt cực đại tại $x=-${k}$.`, `The function has a maximum at $x=-${k}$.`, `$y'$ đổi dấu từ dương sang âm khi đi qua $x=-${k}$.`, `$y'$ changes from positive to negative at $x=-${k}$.`],
          [`Hàm số đạt cực đại tại $x=${k}$.`, `The function has a maximum at $x=${k}$.`, `Tại $x=${k}$ thì $y'$ đổi dấu từ âm sang dương nên đó là cực tiểu.`, `At $x=${k}$ the derivative changes from negative to positive, so it is a minimum.`],
        ),
        prop(
          [`Giá trị cực tiểu của hàm số bằng $${min}$.`, `The minimum value of the function is $${min}$.`, `Giá trị cực tiểu là $y(${k})=${k ** 3}-${3 * k ** 3}${signed(c)}=${min}$.`, `The minimum value is $y(${k})=${k ** 3}-${3 * k ** 3}${signed(c)}=${min}$.`],
          [`Giá trị cực tiểu của hàm số bằng $${max}$.`, `The minimum value of the function is $${max}$.`, `Giá trị $${max}$ là giá trị cực đại $y(-${k})$; giá trị cực tiểu là $${min}$.`, `$${max}$ is the maximum value $y(-${k})$; the minimum value is $${min}$.`],
        ),
        prop(
          [`Đồ thị cắt trục tung tại điểm có tung độ $${c}$.`, `The graph meets the vertical axis at height $${c}$.`, `Tại $x=0$ ta có $y=${c}$.`, `At $x=0$ we get $y=${c}$.`],
          [`Đồ thị cắt trục tung tại điểm có tung độ $${-c}$.`, `The graph meets the vertical axis at height $${-c}$.`, `Tại $x=0$ ta có $y=${c}$, không phải $${-c}$.`, `At $x=0$ we get $y=${c}$, not $${-c}$.`],
        ),
        prop(
          [`Hàm số đồng biến trên khoảng $(${k};\\ +\\infty)$.`, `The function is increasing on $(${k},\\ +\\infty)$.`, `Với $x>${k}$ thì $y'>0$.`, `For $x>${k}$ we have $y'>0$.`],
          [`Hàm số nghịch biến trên khoảng $(${k};\\ +\\infty)$.`, `The function is decreasing on $(${k},\\ +\\infty)$.`, `Với $x>${k}$ thì $y'>0$ nên hàm số đồng biến.`, `For $x>${k}$ we have $y'>0$, so the function is increasing.`],
        ),
        prop(
          [`Phương trình $y=${c}$ có ba nghiệm phân biệt.`, `The equation $y=${c}$ has three distinct roots.`, `Phương trình $x^3-${3 * k * k}x=0$ có ba nghiệm $0$, $\\pm${3 * k * k === 3 ? "\\sqrt{3}" : `\\sqrt{${3 * k * k}}`}$.`, `The equation $x^3-${3 * k * k}x=0$ has three roots $0$ and $\\pm\\sqrt{${3 * k * k}}$.`],
          [`Phương trình $y=${c}$ có đúng một nghiệm.`, `The equation $y=${c}$ has exactly one root.`, `Phương trình $x^3-${3 * k * k}x=0$ có ba nghiệm phân biệt nên không chỉ có một nghiệm.`, `The equation $x^3-${3 * k * k}x=0$ has three distinct roots, not just one.`],
        ),
      ]),
    };
  },
};

/* ---------- 2. Hàm phân thức y = (ax+b)/(x+d) ---------- */
const rational: Family = {
  topic: "rational",
  vi: "Hàm phân thức bậc nhất",
  en: "Rational functions",
  make: (rng) => {
    const a = pick(rng, [1, 2, 3, -1, -2]);
    const d = pick(rng, [1, 2, 3, -1, -2]);
    let b = pick(rng, [-3, -1, 1, 2, 4]);
    if (a * d - b === 0) b += 1;
    const D = a * d - b;
    const f = `\\frac{${a === 1 ? "" : a === -1 ? "-" : a}x${signed(b)}}{x${signed(d)}}`;
    const up = D > 0;
    const ax = a === 1 ? "x" : a === -1 ? "-x" : `${a}x`;
    return {
      topic: "rational",
      contextVi: `Cho hàm số $y=${f}$ có đạo hàm $y'=\\frac{${D}}{(x${signed(d)})^2}$.`,
      contextEn: `Consider the function $y=${f}$ with derivative $y'=\\frac{${D}}{(x${signed(d)})^2}$.`,
      statements: assemble(rng, [
        prop(
          [`Đồ thị có tiệm cận đứng $x=${-d}$.`, `The graph has the vertical asymptote $x=${-d}$.`, `Mẫu $x${signed(d)}=0$ tại $x=${-d}$ còn tử khác $0$ ở đó.`, `The denominator $x${signed(d)}$ is $0$ at $x=${-d}$ while the numerator is not.`],
          [`Đồ thị có tiệm cận đứng $x=${d}$.`, `The graph has the vertical asymptote $x=${d}$.`, `Mẫu $x${signed(d)}$ bằng $0$ tại $x=${-d}$, không phải $x=${d}$.`, `The denominator $x${signed(d)}$ is $0$ at $x=${-d}$, not at $x=${d}$.`],
        ),
        prop(
          [`Đồ thị có tiệm cận ngang $y=${a}$.`, `The graph has the horizontal asymptote $y=${a}$.`, `Khi $x\\to\\pm\\infty$ thì $y\\to ${a}$, tỉ số hai hệ số của $x$.`, `As $x\\to\\pm\\infty$ we get $y\\to ${a}$, the ratio of the coefficients of $x$.`],
          [`Đồ thị có tiệm cận ngang $y=${b}$.`, `The graph has the horizontal asymptote $y=${b}$.`, `Tiệm cận ngang là $y=${a}$, tỉ số hai hệ số của $x$, không phải $y=${b}$.`, `The horizontal asymptote is $y=${a}$, the ratio of the coefficients of $x$, not $y=${b}$.`],
        ),
        prop(
          [`Hàm số ${up ? "đồng biến" : "nghịch biến"} trên từng khoảng xác định.`, `The function is ${up ? "increasing" : "decreasing"} on each interval of its domain.`, `Vì $y'=\\frac{${D}}{(x${signed(d)})^2}${up ? ">" : "<"}0$ với mọi $x\\ne ${-d}$.`, `Because $y'=\\frac{${D}}{(x${signed(d)})^2}${up ? ">" : "<"}0$ for all $x\\ne ${-d}$.`],
          [`Hàm số ${up ? "nghịch biến" : "đồng biến"} trên từng khoảng xác định.`, `The function is ${up ? "decreasing" : "increasing"} on each interval of its domain.`, `Vì $y'${up ? ">" : "<"}0$ với mọi $x\\ne ${-d}$ nên hàm số ${up ? "đồng biến" : "nghịch biến"}.`, `Because $y'${up ? ">" : "<"}0$ for all $x\\ne ${-d}$, the function is ${up ? "increasing" : "decreasing"}.`],
        ),
        prop(
          [`Hàm số không có cực trị.`, `The function has no extrema.`, `Đạo hàm $y'$ không bao giờ bằng $0$ vì tử là hằng số $${D}\\ne 0$.`, `The derivative is never $0$ because its numerator is the constant $${D}\\ne 0$.`],
          [`Hàm số có đúng một điểm cực trị.`, `The function has exactly one extremum.`, `Đạo hàm $y'$ không bao giờ bằng $0$ nên hàm số không có cực trị.`, `The derivative is never $0$, so the function has no extremum.`],
        ),
        prop(
          [`Đồ thị cắt trục hoành tại điểm có hoành độ $${frac(-b, a)}$.`, `The graph meets the horizontal axis at $x=${frac(-b, a)}$.`, `$y=0$ khi $${ax}${signed(b)}=0$, tức $x=${frac(-b, a)}$.`, `$y=0$ when $${ax}${signed(b)}=0$, that is $x=${frac(-b, a)}$.`],
          [`Đồ thị cắt trục hoành tại điểm có hoành độ $${frac(b, a)}$.`, `The graph meets the horizontal axis at $x=${frac(b, a)}$.`, `$y=0$ khi $x=${frac(-b, a)}$, không phải $${frac(b, a)}$.`, `$y=0$ when $x=${frac(-b, a)}$, not $${frac(b, a)}$.`],
        ),
      ]),
    };
  },
};

/* ---------- 3. Nguyên hàm và tích phân của f(x) = px + q ---------- */
const integral: Family = {
  topic: "integral",
  vi: "Nguyên hàm và tích phân",
  en: "Antiderivatives and integrals",
  make: (rng) => {
    const p = int(rng, 1, 4);
    const q = int(rng, 1, 5);
    const m = int(rng, 1, 3) * 2;
    const val = (p * m * m) / 2 + q * m;
    const half = frac(p, 2);
    const hc = half === "1" ? "" : half;
    const qx = q === 1 ? "x" : `${q}x`;
    const px = p === 1 ? "x" : `${p}x`;
    const px2 = p === 1 ? "x^2" : `${p}x^2`;
    return {
      topic: "integral",
      contextVi: `Cho hàm số $f(x)=${p === 1 ? "" : p}x+${q}$ và gọi $F(x)$ là nguyên hàm của $f(x)$ thỏa $F(0)=0$.`,
      contextEn: `Let $f(x)=${p === 1 ? "" : p}x+${q}$ and let $F(x)$ be the antiderivative of $f(x)$ with $F(0)=0$.`,
      statements: assemble(rng, [
        prop(
          [`$F(x)=${half === "1" ? "" : half}x^2+${qx}$.`, `$F(x)=${half === "1" ? "" : half}x^2+${qx}$.`, `Nguyên hàm của $f$ là $${hc}x^2+${qx}+C$ và $F(0)=0$ cho $C=0$.`, `An antiderivative of $f$ is $${hc}x^2+${qx}+C$, and $F(0)=0$ gives $C=0$.`],
          [`$F(x)=${px2}+${qx}$.`, `$F(x)=${px2}+${qx}$.`, `Nguyên hàm của $${px}$ là $${hc}x^2$, không phải $${px2}$.`, `An antiderivative of $${px}$ is $${hc}x^2$, not $${px2}$.`],
        ),
        prop(
          [`$\\int_0^{${m}} f(x)\\,dx=${val}$.`, `$\\int_0^{${m}} f(x)\\,dx=${val}$.`, `$F(${m})-F(0)=${frac(p * m * m, 2)}+${q * m}=${val}$.`, `$F(${m})-F(0)=${frac(p * m * m, 2)}+${q * m}=${val}$.`],
          [`$\\int_0^{${m}} f(x)\\,dx=${val + q}$.`, `$\\int_0^{${m}} f(x)\\,dx=${val + q}$.`, `$F(${m})-F(0)=${val}$, không phải $${val + q}$.`, `$F(${m})-F(0)=${val}$, not $${val + q}$.`],
        ),
        prop(
          [`Hàm số $F(x)$ đồng biến trên $(0;\\ +\\infty)$.`, `$F(x)$ is increasing on $(0,\\ +\\infty)$.`, `$F'(x)=f(x)=${p === 1 ? "" : p}x+${q}>0$ khi $x>0$.`, `$F'(x)=f(x)=${p === 1 ? "" : p}x+${q}>0$ for $x>0$.`],
          [`Hàm số $F(x)$ nghịch biến trên $(0;\\ +\\infty)$.`, `$F(x)$ is decreasing on $(0,\\ +\\infty)$.`, `$F'(x)=f(x)>0$ khi $x>0$ nên $F$ đồng biến.`, `$F'(x)=f(x)>0$ for $x>0$, so $F$ is increasing.`],
        ),
        prop(
          [`Diện tích hình phẳng giới hạn bởi $y=f(x)$, trục $Ox$ và hai đường $x=0$, $x=${m}$ bằng $${val}$.`, `The area bounded by $y=f(x)$, the $Ox$ axis and the lines $x=0$, $x=${m}$ is $${val}$.`, `Vì $f(x)>0$ trên $[0;\\ ${m}]$ nên diện tích bằng $\\int_0^{${m}} f(x)\\,dx=${val}$.`, `Since $f(x)>0$ on $[0,\\ ${m}]$, the area is $\\int_0^{${m}} f(x)\\,dx=${val}$.`],
          [`Diện tích hình phẳng giới hạn bởi $y=f(x)$, trục $Ox$ và hai đường $x=0$, $x=${m}$ bằng $${val + m}$.`, `The area bounded by $y=f(x)$, the $Ox$ axis and the lines $x=0$, $x=${m}$ is $${val + m}$.`, `Diện tích bằng $\\int_0^{${m}} f(x)\\,dx=${val}$, không phải $${val + m}$.`, `The area is $\\int_0^{${m}} f(x)\\,dx=${val}$, not $${val + m}$.`],
        ),
        prop(
          [`$F(x)$ là hàm số bậc hai.`, `$F(x)$ is a quadratic function.`, `Nguyên hàm của hàm bậc nhất là hàm bậc hai.`, `An antiderivative of a linear function is quadratic.`],
          [`$F(x)$ là hàm số bậc nhất.`, `$F(x)$ is a linear function.`, `Nguyên hàm của hàm bậc nhất là hàm bậc hai, không phải bậc nhất.`, `An antiderivative of a linear function is quadratic, not linear.`],
        ),
      ]),
    };
  },
};

/* ---------- 4. Hình học tọa độ Oxyz ---------- */
const space: Family = {
  topic: "space",
  vi: "Tọa độ trong không gian",
  en: "Coordinates in space",
  make: (rng) => {
    const [u, v, w, len] = pick(rng, [[1, 2, 2, 3], [2, 3, 6, 7], [2, 6, 9, 11], [4, 4, 7, 9]] as const);
    const sx = pick(rng, [1, -1]);
    const sy = pick(rng, [1, -1]);
    const A = [int(rng, -3, 3), int(rng, -3, 3), int(rng, -3, 3)] as const;
    const d = [sx * u, sy * v, w] as const;
    const B = [A[0] + d[0], A[1] + d[1], A[2] + d[2]] as const;
    const M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2, (A[2] + B[2]) / 2];
    const mid = (x: number): string => (Number.isInteger(x) ? String(x) : frac(Math.round(x * 2), 2));
    const pt = (name: string, t: readonly number[]): string => `${name}(${t.join(";\\ ")})`;
    const ptEn = (name: string, t: readonly number[]): string => `${name}(${t.join(",\\ ")})`;
    const vec = (t: readonly number[]): string => `(${t.join(";\\ ")})`;
    const vecEn = (t: readonly number[]): string => `(${t.join(",\\ ")})`;
    const wrongD = [d[0], d[1], d[2] + 1] as const;
    const wrongM = [Math.floor(M[0] as number) + 1, M[1] as number, M[2] as number];
    return {
      topic: "space",
      contextVi: `Trong không gian $Oxyz$, cho hai điểm $${pt("A", A)}$ và $${pt("B", B)}$, và gọi $M$ là trung điểm của $AB$.`,
      contextEn: `In space $Oxyz$, let $${ptEn("A", A)}$ and $${ptEn("B", B)}$ be two points, and let $M$ be the midpoint of $AB$.`,
      statements: assemble(rng, [
        prop(
          [`$\\overrightarrow{AB}=${vec(d)}$.`, `$\\overrightarrow{AB}=${vecEn(d)}$.`, `Lấy tọa độ $B$ trừ tọa độ $A$ được $${vec(d)}$.`, `Subtracting the coordinates of $A$ from those of $B$ gives $${vecEn(d)}$.`],
          [`$\\overrightarrow{AB}=${vec(wrongD)}$.`, `$\\overrightarrow{AB}=${vecEn(wrongD)}$.`, `Lấy $B$ trừ $A$ được $${vec(d)}$, không phải $${vec(wrongD)}$.`, `$B$ minus $A$ gives $${vecEn(d)}$, not $${vecEn(wrongD)}$.`],
        ),
        prop(
          [`Độ dài đoạn $AB$ bằng $${len}$.`, `The length of $AB$ is $${len}$.`, `$AB=\\sqrt{${u * u}+${v * v}+${w * w}}=\\sqrt{${len * len}}=${len}$.`, `$AB=\\sqrt{${u * u}+${v * v}+${w * w}}=\\sqrt{${len * len}}=${len}$.`],
          [`Độ dài đoạn $AB$ bằng $${len + 1}$.`, `The length of $AB$ is $${len + 1}$.`, `$AB=\\sqrt{${u * u}+${v * v}+${w * w}}=${len}$, không phải $${len + 1}$.`, `$AB=\\sqrt{${u * u}+${v * v}+${w * w}}=${len}$, not $${len + 1}$.`],
        ),
        prop(
          [`Điểm $M$ có tọa độ $${vec(M)}$.`.replace(/\(([^)]*)\)/, (_m, g: string) => `(${g.split(";\\ ").map((x) => mid(Number(x))).join(";\\ ")})`), `The point $M$ has coordinates $${vecEn(M)}$.`.replace(/\(([^)]*)\)/, (_m, g: string) => `(${g.split(",\\ ").map((x) => mid(Number(x))).join(",\\ ")})`), `Tọa độ trung điểm là trung bình cộng tọa độ hai đầu mút.`, `The midpoint's coordinates are the averages of the endpoints' coordinates.`],
          [`Điểm $M$ có tọa độ $${vec(wrongM)}$.`.replace(/\(([^)]*)\)/, (_m, g: string) => `(${g.split(";\\ ").map((x) => mid(Number(x))).join(";\\ ")})`), `The point $M$ has coordinates $${vecEn(wrongM)}$.`.replace(/\(([^)]*)\)/, (_m, g: string) => `(${g.split(",\\ ").map((x) => mid(Number(x))).join(",\\ ")})`), `Trung điểm có hoành độ $${mid(M[0] as number)}$, không phải $${mid(wrongM[0] as number)}$.`, `The midpoint has $x$-coordinate $${mid(M[0] as number)}$, not $${mid(wrongM[0] as number)}$.`],
        ),
        prop(
          [`Mặt cầu tâm $A$ bán kính $${len}$ đi qua $B$.`, `The sphere with centre $A$ and radius $${len}$ passes through $B$.`, `Khoảng cách $AB=${len}$ bằng bán kính.`, `The distance $AB=${len}$ equals the radius.`],
          [`Mặt cầu tâm $A$ bán kính $${len - 1}$ đi qua $B$.`, `The sphere with centre $A$ and radius $${len - 1}$ passes through $B$.`, `$AB=${len}$ khác bán kính $${len - 1}$ nên $B$ không thuộc mặt cầu.`, `$AB=${len}$ differs from the radius $${len - 1}$, so $B$ is not on the sphere.`],
        ),
        prop(
          [`Mặt phẳng đi qua $A$ và vuông góc với $AB$ nhận $\\overrightarrow{AB}$ làm vectơ pháp tuyến.`, `The plane through $A$ perpendicular to $AB$ has $\\overrightarrow{AB}$ as a normal vector.`, `Mặt phẳng vuông góc với một đường thẳng nhận vectơ chỉ phương của đường thẳng làm vectơ pháp tuyến.`, `A plane perpendicular to a line has the line's direction vector as a normal vector.`],
          [`Mặt phẳng đi qua $A$ và vuông góc với $AB$ song song với $\\overrightarrow{AB}$.`, `The plane through $A$ perpendicular to $AB$ is parallel to $\\overrightarrow{AB}$.`, `Mặt phẳng vuông góc với $AB$ nhận $\\overrightarrow{AB}$ làm vectơ pháp tuyến, nên không song song với $\\overrightarrow{AB}$.`, `A plane perpendicular to $AB$ has $\\overrightarrow{AB}$ as normal vector, so it is not parallel to $\\overrightarrow{AB}$.`],
        ),
      ]),
    };
  },
};

/* ---------- 5. Xác suất có điều kiện từ bảng đếm ---------- */
const conditional: Family = {
  topic: "conditional",
  vi: "Xác suất có điều kiện",
  en: "Conditional probability",
  make: (rng) => {
    const a = int(rng, 3, 8);
    const b = int(rng, 2, 8);
    const c = int(rng, 2, 8);
    const dd = int(rng, 3, 8);
    const N = a + b + c + dd;
    const ab = a + b;
    const ac = a + c;
    const independent = a * N === ab * ac;
    return {
      topic: "conditional",
      contextVi: `Khảo sát $${N}$ học sinh: $${a}$ em học cả hai môn Toán và Tin, $${b}$ em chỉ học Toán, $${c}$ em chỉ học Tin, $${dd}$ em không học môn nào. Chọn ngẫu nhiên một học sinh. Gọi $A$ là biến cố "học Toán", $B$ là biến cố "học Tin", và kí hiệu $P$ là xác suất.`,
      contextEn: `A survey of $${N}$ pupils: $${a}$ study both Maths and Computing, $${b}$ only Maths, $${c}$ only Computing, $${dd}$ study neither. One pupil is chosen at random. Let $A$ be "studies Maths" and $B$ be "studies Computing", and let $P$ denote probability.`,
      statements: assemble(rng, [
        prop(
          [`$P(A)=${frac(ab, N)}$.`, `$P(A)=${frac(ab, N)}$.`, `Có $${a}+${b}=${ab}$ em học Toán trên $${N}$ em.`, `There are $${a}+${b}=${ab}$ pupils studying Maths out of $${N}$.`],
          [`$P(A)=${frac(a, N)}$.`, `$P(A)=${frac(a, N)}$.`, `Em học Toán gồm cả $${b}$ em chỉ học Toán: $P(A)=${frac(ab, N)}$, không phải $${frac(a, N)}$.`, `Pupils studying Maths include the $${b}$ studying only Maths: $P(A)=${frac(ab, N)}$, not $${frac(a, N)}$.`],
        ),
        prop(
          [`$P(B\\mid A)=${frac(a, ab)}$.`, `$P(B\\mid A)=${frac(a, ab)}$.`, `Trong $${ab}$ em học Toán có $${a}$ em học Tin.`, `Among the $${ab}$ pupils studying Maths, $${a}$ study Computing.`],
          [`$P(B\\mid A)=${frac(a, N)}$.`, `$P(B\\mid A)=${frac(a, N)}$.`, `$P(B\\mid A)$ chia cho số em học Toán $${ab}$, không phải cho $${N}$: bằng $${frac(a, ab)}$.`, `$P(B\\mid A)$ divides by the $${ab}$ studying Maths, not by $${N}$: it is $${frac(a, ab)}$.`],
        ),
        prop(
          [`$P(A\\mid B)=${frac(a, ac)}$.`, `$P(A\\mid B)=${frac(a, ac)}$.`, `Trong $${ac}$ em học Tin có $${a}$ em học Toán.`, `Among the $${ac}$ pupils studying Computing, $${a}$ study Maths.`],
          [`$P(A\\mid B)=${frac(a, ab)}$.`, `$P(A\\mid B)=${frac(a, ab)}$.`, `Phải chia cho số em học Tin $${ac}$: $P(A\\mid B)=${frac(a, ac)}$.`, `We must divide by the $${ac}$ studying Computing: $P(A\\mid B)=${frac(a, ac)}$.`],
        ),
        independent
          ? prop(
              [`Hai biến cố $A$ và $B$ độc lập.`, `The events $A$ and $B$ are independent.`, `$P(A\\cap B)=${frac(a, N)}=P(A)P(B)$.`, `$P(A\\cap B)=${frac(a, N)}=P(A)P(B)$.`],
              [`Hai biến cố $A$ và $B$ không độc lập.`, `The events $A$ and $B$ are not independent.`, `$P(A\\cap B)=P(A)P(B)$ nên chúng độc lập.`, `$P(A\\cap B)=P(A)P(B)$, so they are independent.`],
            )
          : prop(
              [`Hai biến cố $A$ và $B$ không độc lập.`, `The events $A$ and $B$ are not independent.`, `$P(A\\cap B)=${frac(a, N)}$ còn $P(A)P(B)=${frac(ab * ac, N * N)}$, hai số khác nhau.`, `$P(A\\cap B)=${frac(a, N)}$ while $P(A)P(B)=${frac(ab * ac, N * N)}$; the two differ.`],
              [`Hai biến cố $A$ và $B$ độc lập.`, `The events $A$ and $B$ are independent.`, `$P(A\\cap B)=${frac(a, N)}$ khác $P(A)P(B)=${frac(ab * ac, N * N)}$ nên không độc lập.`, `$P(A\\cap B)=${frac(a, N)}$ differs from $P(A)P(B)=${frac(ab * ac, N * N)}$, so they are not independent.`],
            ),
        prop(
          [`$P(A\\cup B)=${frac(N - dd, N)}$.`, `$P(A\\cup B)=${frac(N - dd, N)}$.`, `Có $${N}-${dd}=${N - dd}$ em học ít nhất một môn.`, `There are $${N}-${dd}=${N - dd}$ pupils studying at least one subject.`],
          [`$P(A\\cup B)=${frac(ab + ac, N)}$.`, `$P(A\\cup B)=${frac(ab + ac, N)}$.`, `Cộng $P(A)+P(B)$ đếm hai lần $${a}$ em học cả hai môn; kết quả đúng là $${frac(N - dd, N)}$.`, `Adding $P(A)+P(B)$ counts the $${a}$ pupils studying both twice; the correct value is $${frac(N - dd, N)}$.`],
        ),
      ]),
    };
  },
};

/* ---------- 6. Cấp số cộng ---------- */
const arithmetic: Family = {
  topic: "arithmetic",
  vi: "Cấp số cộng",
  en: "Arithmetic sequences",
  make: (rng) => {
    const u1 = int(rng, -5, 8);
    const d = pick(rng, [2, 3, 4, -2, -3]);
    const n = int(rng, 6, 12);
    const un = u1 + (n - 1) * d;
    const S = (n * (u1 + un)) / 2;
    return {
      topic: "arithmetic",
      contextVi: `Cho cấp số cộng $(u_n)$ có $u_1=${u1}$ và công sai $d=${d}$.`,
      contextEn: `Let $(u_n)$ be an arithmetic sequence with $u_1=${u1}$ and common difference $d=${d}$.`,
      statements: assemble(rng, [
        prop(
          [`$u_{${n}}=${un}$.`, `$u_{${n}}=${un}$.`, `$u_{${n}}=u_1+${n - 1}d=${u1}${signed((n - 1) * d)}=${un}$.`, `$u_{${n}}=u_1+${n - 1}d=${u1}${signed((n - 1) * d)}=${un}$.`],
          [`$u_{${n}}=${un + d}$.`, `$u_{${n}}=${un + d}$.`, `$u_{${n}}=u_1+${n - 1}d=${un}$, vì phải cộng $${n - 1}$ lần công sai chứ không phải $${n}$ lần.`, `$u_{${n}}=u_1+${n - 1}d=${un}$, since we add the common difference $${n - 1}$ times, not $${n}$ times.`],
        ),
        prop(
          [`Tổng $${n}$ số hạng đầu bằng $${S}$.`, `The sum of the first $${n}$ terms is $${S}$.`, `$S_{${n}}=\\frac{${n}(${u1}${signed(un)})}{2}=${S}$.`, `$S_{${n}}=\\frac{${n}(${u1}${signed(un)})}{2}=${S}$.`],
          [`Tổng $${n}$ số hạng đầu bằng $${S + n}$.`, `The sum of the first $${n}$ terms is $${S + n}$.`, `$S_{${n}}=\\frac{${n}(u_1+u_{${n}})}{2}=${S}$, không phải $${S + n}$.`, `$S_{${n}}=\\frac{${n}(u_1+u_{${n}})}{2}=${S}$, not $${S + n}$.`],
        ),
        prop(
          [`Dãy số $(u_n)$ ${d > 0 ? "tăng" : "giảm"}.`, `The sequence $(u_n)$ is ${d > 0 ? "increasing" : "decreasing"}.`, `$u_{n+1}-u_n=${d}${d > 0 ? ">" : "<"}0$ với mọi $n$.`, `$u_{n+1}-u_n=${d}${d > 0 ? ">" : "<"}0$ for every $n$.`],
          [`Dãy số $(u_n)$ ${d > 0 ? "giảm" : "tăng"}.`, `The sequence $(u_n)$ is ${d > 0 ? "decreasing" : "increasing"}.`, `$u_{n+1}-u_n=${d}$ nên dãy ${d > 0 ? "tăng" : "giảm"}.`, `$u_{n+1}-u_n=${d}$, so the sequence is ${d > 0 ? "increasing" : "decreasing"}.`],
        ),
        prop(
          [`$u_3=${u1 + 2 * d}$.`, `$u_3=${u1 + 2 * d}$.`, `$u_3=u_1+2d=${u1}${signed(2 * d)}=${u1 + 2 * d}$.`, `$u_3=u_1+2d=${u1}${signed(2 * d)}=${u1 + 2 * d}$.`],
          [`$u_3=${u1 + 3 * d}$.`, `$u_3=${u1 + 3 * d}$.`, `$u_3=u_1+2d=${u1 + 2 * d}$, không phải $${u1 + 3 * d}$.`, `$u_3=u_1+2d=${u1 + 2 * d}$, not $${u1 + 3 * d}$.`],
        ),
        prop(
          [`$u_2+u_4=2u_3$.`, `$u_2+u_4=2u_3$.`, `Trong cấp số cộng, mỗi số hạng là trung bình cộng của hai số hạng kề nó.`, `In an arithmetic sequence each term is the average of its two neighbours.`],
          [`$u_2\\cdot u_4=u_3^2$.`, `$u_2\\cdot u_4=u_3^2$.`, `Hệ thức $u_2\\cdot u_4=u_3^2$ chỉ đúng với cấp số nhân; cấp số cộng có $u_2+u_4=2u_3$.`, `The relation $u_2\\cdot u_4=u_3^2$ holds for geometric sequences; an arithmetic one has $u_2+u_4=2u_3$.`],
        ),
      ]),
    };
  },
};

/* ---------- 7. Hàm mũ y = a^x ---------- */
const exponential: Family = {
  topic: "exponential",
  vi: "Hàm số mũ và logarit",
  en: "Exponential and logarithmic functions",
  make: (rng) => {
    const grow = rng() < 0.5;
    const base = grow ? pick(rng, [2, 3]) : pick(rng, [2, 3]);
    const baseTex = grow ? String(base) : `\\frac{1}{${base}}`;
    const y3 = grow ? base ** 3 : `\\frac{1}{${base ** 3}}`;
    return {
      topic: "exponential",
      contextVi: `Cho hàm số $y=\\left(${baseTex}\\right)^x$.`,
      contextEn: `Consider the function $y=\\left(${baseTex}\\right)^x$.`,
      statements: assemble(rng, [
        prop(
          [`Hàm số ${grow ? "đồng biến" : "nghịch biến"} trên $\\mathbb{R}$.`, `The function is ${grow ? "increasing" : "decreasing"} on $\\mathbb{R}$.`, `Cơ số $${baseTex}$ ${grow ? "lớn hơn" : "nhỏ hơn"} $1$.`, `The base $${baseTex}$ is ${grow ? "greater" : "less"} than $1$.`],
          [`Hàm số ${grow ? "nghịch biến" : "đồng biến"} trên $\\mathbb{R}$.`, `The function is ${grow ? "decreasing" : "increasing"} on $\\mathbb{R}$.`, `Cơ số $${baseTex}$ ${grow ? "lớn hơn" : "nhỏ hơn"} $1$ nên hàm số ${grow ? "đồng biến" : "nghịch biến"}.`, `The base $${baseTex}$ is ${grow ? "greater" : "less"} than $1$, so the function is ${grow ? "increasing" : "decreasing"}.`],
        ),
        prop(
          [`Đồ thị đi qua điểm $(0;\\ 1)$.`, `The graph passes through $(0,\\ 1)$.`, `Với $x=0$ ta có $y=1$.`, `For $x=0$ we get $y=1$.`],
          [`Đồ thị đi qua điểm $(0;\\ 0)$.`, `The graph passes through $(0,\\ 0)$.`, `Với $x=0$ ta có $y=1$, không phải $0$.`, `For $x=0$ we get $y=1$, not $0$.`],
        ),
        prop(
          [`Giá trị của hàm số tại $x=3$ bằng $${y3}$.`, `The value of the function at $x=3$ is $${y3}$.`, `$\\left(${baseTex}\\right)^3=${y3}$.`, `$\\left(${baseTex}\\right)^3=${y3}$.`],
          [`Giá trị của hàm số tại $x=3$ bằng $${grow ? 3 * base : `\\frac{3}{${base}}`}$.`, `The value of the function at $x=3$ is $${grow ? 3 * base : `\\frac{3}{${base}}`}$.`, `Lũy thừa bậc ba của cơ số bằng $${y3}$, không phải tích của $3$ với cơ số.`, `The cube of the base is $${y3}$, not $3$ times the base.`],
        ),
        prop(
          [`Đồ thị nằm hoàn toàn phía trên trục hoành.`, `The graph lies entirely above the horizontal axis.`, `Lũy thừa của số dương luôn dương.`, `A power of a positive number is always positive.`],
          [`Đồ thị cắt trục hoành tại một điểm.`, `The graph meets the horizontal axis at one point.`, `Giá trị $y>0$ với mọi $x$ nên đồ thị không cắt trục hoành.`, `Since $y>0$ for every $x$, the graph never meets the horizontal axis.`],
        ),
        prop(
          [`Trục hoành là tiệm cận ngang của đồ thị.`, `The horizontal axis is a horizontal asymptote of the graph.`, `${grow ? "Khi $x\\to-\\infty$" : "Khi $x\\to+\\infty$"} thì $y\\to 0$.`, `${grow ? "As $x\\to-\\infty$" : "As $x\\to+\\infty$"} we have $y\\to 0$.`],
          [`Đường $y=1$ là tiệm cận ngang của đồ thị.`, `The line $y=1$ is a horizontal asymptote of the graph.`, `Tiệm cận ngang là trục hoành $y=0$, không phải $y=1$.`, `The horizontal asymptote is the axis $y=0$, not $y=1$.`],
        ),
      ]),
    };
  },
};

/* ---------- 8. Đọc dấu đạo hàm f'(x) = (x − p)(x − q)² ---------- */
const derivativeSign: Family = {
  topic: "derivative-sign",
  vi: "Đọc dấu đạo hàm",
  en: "Reading the sign of the derivative",
  make: (rng) => {
    const p = int(rng, -3, 0);
    const q = p + int(rng, 2, 4);
    const fp = (n: number): string => (n === 0 ? "x" : `(x${signed(-n)})`);
    return {
      topic: "derivative-sign",
      contextVi: `Hàm số $y=f(x)$ xác định trên $\\mathbb{R}$ và có đạo hàm $f'(x)=${fp(p)}(x${signed(-q)})^2$.`,
      contextEn: `The function $y=f(x)$ is defined on $\\mathbb{R}$ with derivative $f'(x)=${fp(p)}(x${signed(-q)})^2$.`,
      statements: assemble(rng, [
        prop(
          [`Hàm số đồng biến trên khoảng $(${p};\\ +\\infty)$.`, `The function is increasing on $(${p},\\ +\\infty)$.`, `Với $x>${p}$ thì $f'(x)\\ge 0$ và chỉ bằng $0$ tại $x=${q}$.`, `For $x>${p}$ we have $f'(x)\\ge 0$, with equality only at $x=${q}$.`],
          [`Hàm số đồng biến trên khoảng $(-\\infty;\\ ${p})$.`, `The function is increasing on $(-\\infty,\\ ${p})$.`, `Với $x<${p}$ thì $f'(x)<0$ nên hàm số nghịch biến.`, `For $x<${p}$ we have $f'(x)<0$, so the function is decreasing.`],
        ),
        prop(
          [`Hàm số đạt cực tiểu tại $x=${p}$.`, `The function has a minimum at $x=${p}$.`, `$f'$ đổi dấu từ âm sang dương khi đi qua $x=${p}$.`, `$f'$ changes from negative to positive at $x=${p}$.`],
          [`Hàm số đạt cực đại tại $x=${p}$.`, `The function has a maximum at $x=${p}$.`, `$f'$ đổi dấu từ âm sang dương tại $x=${p}$ nên đó là cực tiểu.`, `$f'$ changes from negative to positive at $x=${p}$, so it is a minimum.`],
        ),
        prop(
          [`Điểm $x=${q}$ không phải là điểm cực trị của hàm số.`, `The point $x=${q}$ is not an extremum of the function.`, `Thừa số $(x${signed(-q)})^2$ không đổi dấu nên $f'$ không đổi dấu tại $x=${q}$.`, `The factor $(x${signed(-q)})^2$ does not change sign, so $f'$ does not change sign at $x=${q}$.`],
          [`Điểm $x=${q}$ là điểm cực trị của hàm số.`, `The point $x=${q}$ is an extremum of the function.`, `Nghiệm $x=${q}$ có bội chẵn, $f'$ không đổi dấu nên đó không phải cực trị.`, `The root $x=${q}$ has even multiplicity, so $f'$ keeps its sign and it is not an extremum.`],
        ),
        prop(
          [`Hàm số có đúng một điểm cực trị.`, `The function has exactly one extremum.`, `Chỉ nghiệm bội lẻ $x=${p}$ làm $f'$ đổi dấu.`, `Only the odd-multiplicity root $x=${p}$ makes $f'$ change sign.`],
          [`Hàm số có hai điểm cực trị.`, `The function has two extrema.`, `Chỉ có $x=${p}$ làm $f'$ đổi dấu, nên có một điểm cực trị chứ không phải hai.`, `Only $x=${p}$ makes $f'$ change sign, so there is one extremum, not two.`],
        ),
        prop(
          [`Hàm số nghịch biến trên khoảng $(-\\infty;\\ ${p})$.`, `The function is decreasing on $(-\\infty,\\ ${p})$.`, `Với $x<${p}$ thì $${p === 0 ? "x" : `x${signed(-p)}`}<0$ và $(x${signed(-q)})^2>0$ nên $f'(x)<0$.`, `For $x<${p}$ the factor ${p === 0 ? "$x$" : `$x${signed(-p)}$`} is negative and $(x${signed(-q)})^2>0$, so $f'(x)<0$.`],
          [`Hàm số nghịch biến trên khoảng $(${p};\\ +\\infty)$.`, `The function is decreasing on $(${p},\\ +\\infty)$.`, `Với $x>${p}$ thì $f'(x)\\ge 0$ nên hàm số không nghịch biến.`, `For $x>${p}$ we have $f'(x)\\ge 0$, so the function is not decreasing.`],
        ),
      ]),
    };
  },
};

/* ---------- 9. Đọc bảng biến thiên ---------- */
const variationBase = (graph: boolean): Family => ({
  topic: graph ? "graph-reading" : "variation-table",
  vi: graph ? "Đọc đồ thị hàm số" : "Đọc bảng biến thiên",
  en: graph ? "Reading a graph" : "Reading a variation table",
  make: (rng) => {
    const up = graph ? { vi: "đồ thị đi lên", en: "the graph goes up" } : { vi: "${up.vi}", en: "${up.en}" };
    const down = graph ? { vi: "đồ thị đi xuống", en: "the graph goes down" } : { vi: "${down.vi}", en: "${down.en}" };
    const a = int(rng, -3, 1);
    const t = bbt(a, a + 2 * int(rng, 1, 2), pick(rng, [-4, -2, 0, 1, 3, 5]));
    const k = t.m + 1;
    const high = t.M + 1;
    return {
      topic: graph ? "graph-reading" : "variation-table",
      contextVi: graph ? `Hàm số bậc ba $y=f(x)$ có đồ thị như hình vẽ: ${t.plot}` : `Hàm số $y=f(x)$ xác định trên $\\mathbb{R}$ và có bảng biến thiên: $${t.table}$.`,
      contextEn: graph ? `The cubic function $y=f(x)$ has the graph shown: ${t.plot}` : `The function $y=f(x)$ is defined on $\\mathbb{R}$ and has the variation table: $${t.table}$.`,
      statements: assemble(rng, [
        prop(
          [`Hàm số đồng biến trên khoảng $(-\\infty;\\ ${t.a})$.`, `The function is increasing on $(-\\infty,\\ ${t.a})$.`, `Trên khoảng này $f'(x)>0$, ${up.vi}.`, `On this interval $f'(x)>0$ and ${up.en}.`],
          [`Hàm số nghịch biến trên khoảng $(-\\infty;\\ ${t.a})$.`, `The function is decreasing on $(-\\infty,\\ ${t.a})$.`, `Trên khoảng này $f'(x)>0$, ${up.vi}, nên hàm số đồng biến.`, `On this interval $f'(x)>0$ and ${up.en}, so the function is increasing.`],
        ),
        prop(
          [`Hàm số đạt cực đại tại $x=${t.a}$.`, `The function has a maximum at $x=${t.a}$.`, `$f'(x)$ đổi dấu từ dương sang âm khi đi qua $x=${t.a}$.`, `$f'(x)$ changes from positive to negative at $x=${t.a}$.`],
          [`Hàm số đạt cực đại tại $x=${t.b}$.`, `The function has a maximum at $x=${t.b}$.`, `Tại $x=${t.b}$ thì $f'(x)$ đổi dấu từ âm sang dương nên đó là cực tiểu.`, `At $x=${t.b}$ the derivative changes from negative to positive, so it is a minimum.`],
        ),
        prop(
          [`Giá trị cực tiểu của hàm số bằng $${t.m}$.`, `The minimum value of the function is $${t.m}$.`, `Giá trị tại điểm cực tiểu $x=${t.b}$ là $${t.m}$.`, `The value at the minimum point is $${t.m}$ at the minimum point $x=${t.b}$.`],
          [`Giá trị cực tiểu của hàm số bằng $${t.M}$.`, `The minimum value of the function is $${t.M}$.`, `Giá trị $${t.M}$ là giá trị cực đại; giá trị cực tiểu là $${t.m}$.`, `The value $${t.M}$ is the maximum; the minimum value is $${t.m}$.`],
        ),
        prop(
          [`Phương trình $f(x)=${k}$ có ba nghiệm phân biệt.`, `The equation $f(x)=${k}$ has three distinct roots.`, `Vì $${t.m}<${k}<${t.M}$ nên đường thẳng $y=${k}$ cắt đồ thị tại ba điểm.`, `Since $${t.m}<${k}<${t.M}$, the line $y=${k}$ meets the graph at three points.`],
          [`Phương trình $f(x)=${high}$ có ba nghiệm phân biệt.`, `The equation $f(x)=${high}$ has three distinct roots.`, `Vì $${high}>${t.M}$ nên đường thẳng $y=${high}$ chỉ cắt đồ thị tại một điểm.`, `Since $${high}>${t.M}$, the line $y=${high}$ meets the graph at only one point.`],
        ),
        prop(
          [`Hàm số nghịch biến trên khoảng $(${t.a};\\ ${t.b})$.`, `The function is decreasing on $(${t.a},\\ ${t.b})$.`, `Trên khoảng này $f'(x)<0$, ${down.vi}.`, `On this interval $f'(x)<0$ and ${down.en}.`],
          [`Hàm số nghịch biến trên khoảng $(${t.b};\\ +\\infty)$.`, `The function is decreasing on $(${t.b},\\ +\\infty)$.`, `Trên khoảng này $f'(x)>0$, ${up.vi}, nên hàm số đồng biến.`, `On this interval $f'(x)>0$ and ${up.en}, so the function is increasing.`],
        ),
        prop(
          [`$f(${t.a})>f(${t.b})$.`, `$f(${t.a})>f(${t.b})$.`, `$f(${t.a})=${t.M}$ lớn hơn $f(${t.b})=${t.m}$.`, `$f(${t.a})=${t.M}$ is greater than $f(${t.b})=${t.m}$.`],
          [`$f(${t.a})<f(${t.b})$.`, `$f(${t.a})<f(${t.b})$.`, `$f(${t.a})=${t.M}$ không nhỏ hơn $f(${t.b})=${t.m}$.`, `$f(${t.a})=${t.M}$ is not less than $f(${t.b})=${t.m}$.`],
        ),
      ]),
    };
  },
});
const variationTable: Family = variationBase(false);
const graphReading: Family = variationBase(true);

export const TF_FAMILIES: readonly Family[] = [cubic, rational, integral, space, conditional, arithmetic, exponential, derivativeSign, variationTable, graphReading];

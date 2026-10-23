import type { Question } from "../types.ts";
import { pick } from "../../lib/prng.ts";
import { atX, generalQuad, made, metres2, point, quadPoly, questionById, read, texInt, vertexForm } from "./stem.ts";
import { parametric, fixedVary, type Vary } from "./types.ts";

export function quadraticVary(questions: readonly Question[]): Vary[] {
  const q = (id: string) => questionById(questions, id);
  return [
    parametric(q("quad-vertex"), (rng) => ({
      h: pick(rng, [1, 2, 3, 4]),
      k: pick(rng, [-4, -3, -5, -1, -8, 5, -6, 4, 6, -2]),
    }), (params) => vertexStem(q("quad-vertex"), params)),
    parametric(q("quad-roots"), (rng) => pick(rng, [
      { r: -1, s: 3 }, { r: -2, s: 4 }, { r: -3, s: 2 }, { r: -1, s: 2 },
      { r: -4, s: 1 }, { r: -2, s: 3 }, { r: -3, s: 5 }, { r: -5, s: 2 },
      { r: -1, s: 4 }, { r: -4, s: 3 }, { r: -2, s: 5 }, { r: -5, s: 3 },
      { r: -3, s: 4 }, { r: -1, s: 5 }, { r: -4, s: 5 }, { r: -2, s: 1 },
    ]), (params) => rootsStem(q("quad-roots"), params)),
    parametric(q("quad-range"), (rng) => ({
      a: pick(rng, [-2, -1, -3]),
      h: pick(rng, [1, 2, 3]),
      k: pick(rng, [8, 4, 5, 6, 9]),
    }), (params) => rangeStem(q("quad-range"), params)),
    parametric(q("quad-fence"), (rng) => ({
      p: pick(rng, [40, 20, 24, 28, 32, 36, 44, 48]),
    }), (params) => fenceStem(q("quad-fence"), params)),
    fixedVary(q("quad-delta")),
    parametric(q("quad-cost"), (rng) => pick(rng, [
      { a: 2, h: 2, m: 3 }, { a: 2, h: 1, m: 3 }, { a: 2, h: 3, m: 3 }, { a: 2, h: 4, m: 3 },
      { a: 1, h: 2, m: 3 }, { a: 1, h: 1, m: 5 }, { a: 1, h: 3, m: 1 }, { a: 2, h: 2, m: 1 },
      { a: 2, h: 3, m: 5 }, { a: 1, h: 4, m: 2 }, { a: 2, h: 1, m: 5 }, { a: 1, h: 2, m: 1 },
    ]), (params) => costStem(q("quad-cost"), params)),
  ];
}

function vertexStem(question: Question, params: Record<string, number>) {
  const h = read(params, "h");
  const k = read(params, "k");
  const b = -2 * h;
  const c = h * h + k;
  const poly = quadPoly(b, c);
  const wrong = [[-h, k], [h, -k], [2 * h, c]] as const;
  const spot = (index: 0 | 1 | 2, lang: "vi" | "en") => point(wrong[index][0], wrong[index][1], lang);
  return made(
    question,
    `Đỉnh của parabol $y = ${poly}$ là điểm nào?`,
    `What is the vertex of $y = ${poly}$?`,
    [point(h, k, "vi"), spot(0, "vi"), spot(1, "vi"), spot(2, "vi")],
    [point(h, k, "en"), spot(0, "en"), spot(1, "en"), spot(2, "en")],
    [
      `$a = 1$, $b = ${b}$, $c = ${c}$. Hoành độ đỉnh $x = -\\dfrac{b}{2a} = ${h}$.`,
      `Thế lại: $y(${h}) = ${k}$.`,
      `Đỉnh là ${point(h, k, "vi")}. Đổi dấu hoành độ, đổi dấu tung độ, hoặc lấy ${texInt(2 * h)} làm hoành độ, ra các điểm còn lại.`,
    ],
    [
      `$a = 1$, $b = ${b}$, $c = ${c}$. The vertex has $x = -\\dfrac{b}{2a} = ${h}$.`,
      `Substitute: $y(${h}) = ${k}$.`,
      `The vertex is ${point(h, k, "en")}. Flipping the sign of $x$, flipping the sign of $y$, or using ${texInt(2 * h)} as $x$, produces the other points.`,
    ],
  );
}

function rootsStem(question: Question, params: Record<string, number>) {
  const r = read(params, "r");
  const s = read(params, "s");
  const poly = quadPoly(-(r + s), r * s);
  const delta = (s - r) * (s - r);
  const pair = (p: number, t: number, lang: "vi" | "en") =>
    lang === "vi" ? `$x = ${p}$ và $x = ${t}$` : `$x = ${p}$ and $x = ${t}$`;
  return made(
    question,
    `Phương trình $${poly} = 0$ có nghiệm nào?`,
    `What are the solutions of $${poly} = 0$?`,
    [pair(r, s, "vi"), pair(-r, -s, "vi"), pair(r, -s, "vi"), "Vô nghiệm"],
    [pair(r, s, "en"), pair(-r, -s, "en"), pair(r, -s, "en"), "No solution"],
    [
      `$\\Delta = ${delta} > 0$, nên có hai nghiệm phân biệt.`,
      `$(x - ${s})(x - (${r})) = ${poly}$.`,
      `Nghiệm là ${pair(r, s, "vi")}. Đổi cả hai dấu, hoặc đổi dấu một nghiệm, ra các cặp còn lại.`,
    ],
    [
      `$\\Delta = ${delta} > 0$, so there are two distinct roots.`,
      `$(x - ${s})(x - (${r})) = ${poly}$.`,
      `The roots are ${pair(r, s, "en")}. Flipping both signs, or flipping one root, produces the other pairs.`,
    ],
    `Nhẩm $(x - ${s})(x + ${-r})$, hoặc tính $\\Delta = ${delta}$.`,
    `Factor as $(x - ${s})(x + ${-r})$, or compute $\\Delta = ${delta}$.`,
  );
}

function rangeStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const h = read(params, "h");
  const k = read(params, "k");
  const form = vertexForm(a, h, k);
  const down = (bound: number, lang: "vi" | "en") =>
    lang === "vi" ? `$(-\\infty; ${bound}]$` : `$(-\\infty, ${bound}]$`;
  const up = (bound: number, lang: "vi" | "en") =>
    lang === "vi" ? `$[${bound}; +\\infty)$` : `$[${bound}, +\\infty)$`;
  return made(
    question,
    `Tập giá trị của $y = ${form}$ là tập nào?`,
    `What is the range of $y = ${form}$?`,
    [down(k, "vi"), up(k, "vi"), down(h, "vi"), `$\\mathbb{R}$`],
    [down(k, "en"), up(k, "en"), down(h, "en"), `$\\mathbb{R}$`],
    [
      `$a = ${a} < 0$, bề lõm hướng xuống, đỉnh là giá trị lớn nhất.`,
      `Tung độ đỉnh $k = ${k}$. Số ${h} chỉ là hoành độ. Mọi giá trị đều $\\le ${k}$.`,
      `Tập giá trị là ${down(k, "vi")}. Parabol không phủ cả $\\mathbb{R}$.`,
    ],
    [
      `$a = ${a} < 0$, so the parabola opens downward and the vertex is the maximum.`,
      `The vertex y-coordinate is $k = ${k}$. The ${h} is only the x-coordinate. Every value is $\\le ${k}$.`,
      `The range is ${down(k, "en")}. A parabola does not cover all of $\\mathbb{R}$.`,
    ],
  );
}

function fenceStem(question: Question, params: Record<string, number>) {
  const p = read(params, "p");
  const x = p / 4;
  const best = (p * p) / 8;
  const square = (p * p) / 4;
  const quarter = (p * p) / 16;
  const near = (x - 2) * (p - 2 * (x - 2));
  return made(
    question,
    `Có ${p} m lưới, một cạnh chuồng là tường sẵn. Diện tích lớn nhất là bao nhiêu?`,
    `A pen uses ${p} m of fence, with one side along an existing wall. What is the greatest area?`,
    [metres2(best), metres2(square), metres2(quarter), metres2(near)],
    [metres2(best), metres2(square), metres2(quarter), metres2(near)],
    [
      `Hai cạnh vuông góc tường dài $x$ mét, cạnh song song tường dài $${p} - 2x$. $S = x(${p} - 2x)$, với $0 < x < ${p / 2}$.`,
      `$S' = ${p} - 4x = 0$ tại $x = ${x}$. $S'' = -4 < 0$, nên đây là giá trị lớn nhất.`,
      `$S(${x}) = ${best}$ m². $${square}$ quên mất một nửa. $${quarter}$ chia thừa. $${near}$ là $S(${x - 2})$, chưa phải đỉnh.`,
    ],
    [
      `The two sides perpendicular to the wall have length $x$; the side along the wall is $${p} - 2x$. $S = x(${p} - 2x)$, with $0 < x < ${p / 2}$.`,
      `$S' = ${p} - 4x = 0$ at $x = ${x}$. $S'' = -4 < 0$, so this is a maximum.`,
      `$S(${x}) = ${best}$ m². $${square}$ drops the half. $${quarter}$ divides once too often. $${near}$ is $S(${x - 2})$, not the top.`,
    ],
    `Gọi x là cạnh vuông góc với tường. Cạnh song song tường còn ${p} − 2x. Cho S′ = 0.`,
    `Let x be the side perpendicular to the wall. The side along the wall is ${p} − 2x. Set S′ = 0.`,
  );
}

function costStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const h = read(params, "h");
  const m = read(params, "m");
  const b = -2 * a * h;
  const c = a * h * h + m;
  const poly = generalQuad(a, b, c);
  const forgot = m - a * h * h;
  const slope = 2 * a;
  const intercept = 2 * a * h;
  return made(
    question,
    `Chi phí $C(x) = ${poly}$. Giá trị nhỏ nhất là bao nhiêu?`,
    `The cost is $C(x) = ${poly}$. What is the minimum value?`,
    [atX(m, h, "vi"), atX(c, 0, "vi"), atX(forgot, h, "vi"), atX(m, 2 * h, "vi")],
    [atX(m, h, "en"), atX(c, 0, "en"), atX(forgot, h, "en"), atX(m, 2 * h, "en")],
    [
      `$C'(x) = ${slope}x - ${intercept} = 0$ tại $x = ${h}$. Cũng là $x = -\\dfrac{b}{2a}$.`,
      `$C'' = ${slope} > 0$, nên đây là giá trị nhỏ nhất.`,
      `$C(${h}) = ${m}$. Số ${c} là $C(0)$. Quên hạng $x^2$ thì ra ${forgot}. Lấy $x = -\\dfrac{b}{a} = ${2 * h}$ thì đặt ${m} nhầm chỗ.`,
    ],
    [
      `$C'(x) = ${slope}x - ${intercept} = 0$ at $x = ${h}$. That is also $x = -\\dfrac{b}{2a}$.`,
      `$C'' = ${slope} > 0$, so this is a minimum.`,
      `$C(${h}) = ${m}$. The ${c} is $C(0)$. Dropping the $x^2$ term gives ${forgot}. Using $x = -\\dfrac{b}{a} = ${2 * h}$ puts ${m} in the wrong place.`,
    ],
    `C′(x) = ${slope}x − ${intercept}. Đừng đọc hệ số tự do, và đừng quên số 2 ở mẫu của −b/(2a).`,
    `C′(x) = ${slope}x − ${intercept}. Do not read off the constant term, and do not drop the 2 in −b/(2a).`,
  );
}

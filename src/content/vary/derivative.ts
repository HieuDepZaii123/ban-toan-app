import type { Question } from "../types.ts";
import { pick } from "../../lib/prng.ts";
import { atX, made, metres, questionById, radFrac, read, seconds, texInt } from "./stem.ts";
import { parametric, type Vary } from "./types.ts";

const BRAKES = [
  { v: 20, a: 4 }, { v: 30, a: 5 }, { v: 24, a: 6 }, { v: 20, a: 5 }, { v: 30, a: 6 },
  { v: 40, a: 5 }, { v: 40, a: 8 }, { v: 20, a: 2 }, { v: 30, a: 10 }, { v: 40, a: 4 },
  { v: 24, a: 4 }, { v: 24, a: 8 }, { v: 18, a: 6 }, { v: 12, a: 4 },
] as const;

export function derivativeVary(questions: readonly Question[]): Vary[] {
  const q = (id: string) => questionById(questions, id);
  return [
    parametric(q("deriv-slope"), (rng) => ({ p: pick(rng, [2, 1, 3, 4, 5, 6]) }), (params) => slopeStem(q("deriv-slope"), params)),
    parametric(q("deriv-secant"), (rng) => ({ a: pick(rng, [1, 2, 3, 4, 5]) }), (params) => secantStem(q("deriv-secant"), params)),
    parametric(q("deriv-time"), (rng) => ({ v: pick(rng, [20, 40, 60, 80, 100]) }), (params) => timeStem(q("deriv-time"), params)),
    parametric(q("deriv-height"), (rng) => ({ v: pick(rng, [20, 40, 60, 80, 100]) }), (params) => heightStem(q("deriv-height"), params)),
    parametric(q("deriv-cubic"), (rng) => ({ p: pick(rng, [1, 4, 9, 16, 25]) }), (params) => cubicStem(q("deriv-cubic"), params)),
    parametric(q("deriv-interval"), (rng) => pick(rng, [
      { h: 1, m: 3 }, { h: 1, m: 4 }, { h: 1, m: 5 }, { h: 1, m: 6 },
      { h: 2, m: 5 }, { h: 2, m: 6 }, { h: 2, m: 7 }, { h: 2, m: 8 },
      { h: 3, m: 7 }, { h: 3, m: 8 },
    ]), (params) => intervalStem(q("deriv-interval"), params)),
    parametric(q("deriv-brake"), (rng) => pick(rng, BRAKES), (params) => brakeStem(q("deriv-brake"), params)),
  ];
}

function slopeStem(question: Question, params: Record<string, number>) {
  const p = read(params, "p");
  return made(
    question,
    `$f(x) = x^2$. $f'(${p})$ bằng bao nhiêu?`,
    `$f(x) = x^2$. What is $f'(${p})$?`,
    [texInt(2 * p), texInt(p), `$2x$`, texInt(0)],
    [texInt(2 * p), texInt(p), `$2x$`, texInt(0)],
    [
      `Đạo hàm của $x^2$ là $2x$.`,
      `Thế $x = ${p}$: $f'(${p}) = ${2 * p}$.`,
      `${p} quên hệ số 2. $2x$ chưa thế. $0$ là đạo hàm của hằng số.`,
    ],
    [
      `The derivative of $x^2$ is $2x$.`,
      `Substitute $x = ${p}$: $f'(${p}) = ${2 * p}$.`,
      `${p} drops the factor 2. $2x$ has not been evaluated. $0$ is the derivative of a constant.`,
    ],
    `Đạo hàm của x² là 2x. Nhớ thế x = ${p}.`,
    `The derivative of x² is 2x. Remember to substitute x = ${p}.`,
  );
}

function secantStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const slope = 2 * a;
  const correct = a === 1 ? `$2 + h$` : `$${slope} + h$`;
  const frozen = texInt(slope);
  const doubled = a === 1 ? `$2h$` : `$${slope}h$`;
  return made(
    question,
    `Cho $y = x^2$. Hệ số góc của cát tuyến qua $x = ${a}$ và $x = ${a}+h$ $(h \\neq 0)$ bằng bao nhiêu?`,
    `For $y = x^2$, what is the slope of the secant through $x = ${a}$ and $x = ${a}+h$ $(h \\neq 0)$?`,
    [correct, frozen, `$h$`, doubled],
    [correct, frozen, `$h$`, doubled],
    [
      `Khai $(${a}+h)^2 - ${a * a}$, rồi chia cho $h$.`,
      `Còn lại $${slope} + h$.`,
      `${frozen} cho $h$ về 0 quá sớm. $h$ bỏ hệ số góc. ${doubled} nhân nhầm với $h$.`,
    ],
    [
      `Expand $(${a}+h)^2 - ${a * a}$, then divide by $h$.`,
      `The result is $${slope} + h$.`,
      `${frozen} sends $h$ to 0 too soon. $h$ drops the slope. ${doubled} multiplies by $h$ by mistake.`,
    ],
    `Khai (${a}+h)² − ${a * a} rồi chia cho h. Đừng vội cho h về 0.`,
    `Expand (${a}+h)² − ${a * a} and divide by h. Do not send h to 0 yet.`,
  );
}

function timeStem(question: Question, params: Record<string, number>) {
  const v = read(params, "v");
  const apex = v / 10;
  return made(
    question,
    `Ném thẳng đứng, lấy $g = 10$: $h(t) = ${v}t - 5t^2$ (mét, $t$ giây). Bóng cao nhất lúc nào?`,
    `A ball is thrown straight up, with $g = 10$: $h(t) = ${v}t - 5t^2$ (metres, $t$ seconds). When is it highest?`,
    [seconds(apex), seconds(apex / 2), seconds(2 * apex), seconds(0)],
    [seconds(apex), seconds(apex / 2), seconds(2 * apex), seconds(0)],
    [
      `Cao nhất khi vận tốc bằng 0. $h'(t) = ${v} - 10t$.`,
      `$t = ${apex}$ giây.`,
      `${apex / 2} s là nửa thời gian lên. ${2 * apex} s là lúc chạm đất. $0$ s là lúc ném.`,
    ],
    [
      `It is highest when the velocity is 0. $h'(t) = ${v} - 10t$.`,
      `$t = ${apex}$ seconds.`,
      `${apex / 2} s is half the time upward. ${2 * apex} s is the landing. $0$ s is the throw.`,
    ],
  );
}

function heightStem(question: Question, params: Record<string, number>) {
  const v = read(params, "v");
  const top = (v * v) / 20;
  const early = v - 5;
  const twice = (v * v) / 10;
  const half = v / 2;
  return made(
    question,
    `Cùng bài ném $h(t) = ${v}t - 5t^2$. Độ cao lớn nhất là bao nhiêu?`,
    `Same throw $h(t) = ${v}t - 5t^2$. What is the greatest height?`,
    [metres(top), metres(early), metres(twice), metres(half)],
    [metres(top), metres(early), metres(twice), metres(half)],
    [
      `Vận tốc bằng 0 tại $t = ${v / 10}$.`,
      `$h(${v / 10}) = ${top}$ m.`,
      `${early} m là $h(1)$. ${twice} m quên một nửa. ${half} m là nửa vận tốc ban đầu.`,
    ],
    [
      `The velocity is 0 at $t = ${v / 10}$.`,
      `$h(${v / 10}) = ${top}$ m.`,
      `${early} m is $h(1)$. ${twice} m drops the half. ${half} m is half the initial speed.`,
    ],
  );
}

function cubicStem(question: Question, params: Record<string, number>) {
  const p = read(params, "p");
  const s = Math.round(Math.sqrt(p));
  const pair = (value: number) => `$x = ${-value}$ và $x = ${value}$`;
  const pairEn = (value: number) => `$x = ${-value}$ and $x = ${value}$`;
  const root = radFrac(s, 3, 1);
  const rootNeg = radFrac(-s, 3, 1);
  return made(
    question,
    `$f(x) = x^3 - ${3 * p === 3 ? "3" : 3 * p}x$. Phương trình $f'(x) = 0$ có nghiệm nào?`,
    `$f(x) = x^3 - ${3 * p === 3 ? "3" : 3 * p}x$. Which numbers solve $f'(x) = 0$?`,
    [pair(s), "chỉ $x = 0$", `${rootNeg} và ${root}`, "Không có nghiệm"],
    [pairEn(s), "only $x = 0$", `${rootNeg} and ${root}`, "No solution"],
    [
      `$f'(x) = 3x^2 - ${3 * p} = 3(x^2 - ${p})$.`,
      `$x^2 = ${p}$, nên $x = ${-s}$ hoặc $x = ${s}$.`,
      `$x = 0$ là nơi $f$ đổi từ âm, không phải nghiệm của đạo hàm. ${rootNeg} và ${root} là nghiệm của $f(x) = 0$.`,
    ],
    [
      `$f'(x) = 3x^2 - ${3 * p} = 3(x^2 - ${p})$.`,
      `$x^2 = ${p}$, so $x = ${-s}$ or $x = ${s}$.`,
      `$x = 0$ is where $f$ changes sign, not a root of the derivative. ${rootNeg} and ${root} solve $f(x) = 0$.`,
    ],
    `Đạo hàm trước, rồi giải $3x^2 - ${3 * p} = 0$. Đừng giải $f(x) = 0$.`,
    `Differentiate first, then solve $3x^2 - ${3 * p} = 0$. Do not solve $f(x) = 0$.`,
  );
}

function intervalStem(question: Question, params: Record<string, number>) {
  const h = read(params, "h");
  const m = read(params, "m");
  const top = m * (m - 2 * h);
  const floor = -(h * h);
  const poly = h === 1 ? "x^2 - 2x" : `x^2 - ${2 * h}x`;
  return made(
    question,
    `Trên đoạn $[0;\\ ${m}]$, giá trị lớn nhất của $y = ${poly}$ là bao nhiêu?`,
    `On the interval $[0,\\ ${m}]$, what is the greatest value of $y = ${poly}$?`,
    [atX(top, m, "vi"), atX(floor, h, "vi"), atX(0, 0, "vi"), atX(-floor, h, "vi")],
    [atX(top, m, "en"), atX(floor, h, "en"), atX(0, 0, "en"), atX(-floor, h, "en")],
    [
      `Hai đầu mút $x = 0$, $x = ${m}$, và điểm dừng $y' = 0$ tại $x = ${h}$.`,
      `$y(0) = 0$, $y(${h}) = ${floor}$, $y(${m}) = ${top}$. Lớn nhất là ${top} tại $x = ${m}$.`,
      `${floor} là đáy, không phải đỉnh. ${-floor} đổi dấu giá trị tại điểm dừng.`,
    ],
    [
      `The endpoints $x = 0$, $x = ${m}$, and the stationary point $y' = 0$ at $x = ${h}$.`,
      `$y(0) = 0$, $y(${h}) = ${floor}$, $y(${m}) = ${top}$. The greatest is ${top} at $x = ${m}$.`,
      `${floor} is the bottom, not the top. ${-floor} flips the value at the stationary point.`,
    ],
  );
}

function brakeStem(question: Question, params: Record<string, number>) {
  const v = read(params, "v");
  const a = read(params, "a");
  const t = v / a;
  const distance = (v * v) / (2 * a);
  const coast = (v * v) / a;
  const push = v * a;
  return made(
    question,
    `Xe đang chạy $${v}$ m/s thì phanh, vận tốc $v(t) = ${v} - ${a}t$ (m/s). Quãng đường từ lúc phanh đến khi dừng là bao nhiêu?`,
    `A car at $${v}$ m/s brakes, with velocity $v(t) = ${v} - ${a}t$ (m/s). How far does it travel until it stops?`,
    [metres(distance), metres(coast), metres(v), metres(push)],
    [metres(distance), metres(coast), metres(v), metres(push)],
    [
      `$v(t) = 0$ tại $t = ${t}$ giây.`,
      `$s(${t}) = ${v}\\cdot${t} - \\dfrac{${a}}{2}${t}^2 = ${distance}$ m.`,
      `${coast} m nhân vận tốc với cả thời gian, không phanh. ${v} m là vận tốc. ${push} m nhân vận tốc với gia tốc.`,
    ],
    [
      `$v(t) = 0$ at $t = ${t}$ seconds.`,
      `$s(${t}) = ${v}\\cdot${t} - \\dfrac{${a}}{2}${t}^2 = ${distance}$ m.`,
      `${coast} m multiplies the speed by the whole time, with no braking. ${v} m is the speed. ${push} m multiplies speed by acceleration.`,
    ],
    `Tìm lúc v = 0 trước. Rồi tính s, đừng nhân ${v} m/s với cả ${t} giây.`,
    `Find when v = 0 first. Then compute s. Do not multiply ${v} m/s by all ${t} seconds.`,
  );
}

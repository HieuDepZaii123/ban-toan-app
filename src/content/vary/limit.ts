import type { Question } from "../types.ts";
import { pick } from "../../lib/prng.ts";
import { celsius, made, questionById, read, texInt } from "./stem.ts";
import { fixedVary, parametric, type Vary } from "./types.ts";

const NONE_VI = "Không tồn tại";
const NONE_EN = "Does not exist";

export function limitVary(questions: readonly Question[]): Vary[] {
  const q = (id: string) => questionById(questions, id);
  return [
    parametric(q("lim-hole"), (rng) => ({ a: pick(rng, [1, 2, 3, 4, 5, 6]) }), (params) => holeStem(q("lim-hole"), params)),
    parametric(q("lim-assign"), (rng) => pick(rng, [
      { a: 1, b: 5 }, { a: 1, b: 4 }, { a: 2, b: 5 }, { a: 2, b: 1 }, { a: 2, b: 7 },
      { a: 3, b: 5 }, { a: 3, b: 4 }, { a: 3, b: 8 }, { a: 4, b: 5 }, { a: 4, b: 1 },
      { a: 5, b: 8 }, { a: 5, b: 3 }, { a: 1, b: 8 }, { a: 4, b: 9 }, { a: 6, b: 5 },
    ]), (params) => assignStem(q("lim-assign"), params)),
    parametric(q("lim-jump"), (rng) => ({ k: pick(rng, [1, 2, 3, 4, 5]) }), (params) => jumpStem(q("lim-jump"), params)),
    parametric(q("lim-cont"), (rng) => ({ a: pick(rng, [1, 2, 3, 4, 5, 6]) }), (params) => contStem(q("lim-cont"), params)),
    parametric(q("lim-tea"), (rng) => pick(rng, [
      { room: 25, extra: 60 }, { room: 20, extra: 40 }, { room: 20, extra: 50 }, { room: 20, extra: 60 },
      { room: 25, extra: 40 }, { room: 25, extra: 50 }, { room: 25, extra: 80 }, { room: 30, extra: 40 },
      { room: 30, extra: 50 }, { room: 30, extra: 60 }, { room: 30, extra: 80 }, { room: 20, extra: 80 },
    ]), (params) => teaStem(q("lim-tea"), params)),
    fixedVary(q("lim-sinc")),
  ];
}

function holeStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const limit = 2 * a;
  return made(
    question,
    `$\\lim_{x \\to ${a}}\\dfrac{x^2-${a * a}}{x-${a}}$ bằng bao nhiêu?`,
    `What is $\\lim_{x \\to ${a}}\\dfrac{x^2-${a * a}}{x-${a}}$?`,
    [texInt(limit), texInt(0), NONE_VI, texInt(a)],
    [texInt(limit), texInt(0), NONE_EN, texInt(a)],
    [
      `Rút nhân tử $x - ${a}$ trước. $x^2-${a * a} = (x-${a})(x+${a})$.`,
      `Với $x \\neq ${a}$, biểu thức bằng $x+${a}$. Giới hạn là ${limit}.`,
      `${a} là giá trị tại $0$ của biểu thức đã rút, hoặc chỉ là số trong mẫu. ${NONE_VI} là thế ${a} vào mẫu cũ.`,
    ],
    [
      `Cancel $x - ${a}$ first. $x^2-${a * a} = (x-${a})(x+${a})$.`,
      `For $x \\neq ${a}$ the expression equals $x+${a}$. The limit is ${limit}.`,
      `${a} is the simplified expression at $0$, or just the number in the denominator. ${NONE_EN} substitutes ${a} into the old denominator.`,
    ],
    `Rút nhân tử $x - ${a}$ trước. Đừng thế $x = ${a}$ vào biểu thức chưa rút.`,
    `Cancel $x - ${a}$ first. Do not substitute $x = ${a}$ into the unsimplified expression.`,
  );
}

function assignStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const b = read(params, "b");
  const limit = 2 * a;
  return made(
    question,
    `Cùng biểu thức $\\dfrac{x^2-${a * a}}{x-${a}}$, nhưng gán $f(${a}) = ${b}$. Giới hạn khi $x \\to ${a}$ bằng bao nhiêu?`,
    `For $\\dfrac{x^2-${a * a}}{x-${a}}$ with $f(${a}) = ${b}$, what is the limit as $x \\to ${a}$?`,
    [texInt(limit), texInt(b), NONE_VI, texInt(0)],
    [texInt(limit), texInt(b), NONE_EN, texInt(0)],
    [
      `Giới hạn nhìn các điểm xung quanh ${a}, không nhìn đúng một điểm.`,
      `Sau khi rút gọn, giới hạn vẫn là ${limit}.`,
      `${b} là số vừa gán. Gán một giá trị không làm mất giới hạn, và cũng không đổi nó.`,
    ],
    [
      `The limit looks at the points around ${a}, not at that one point.`,
      `After simplifying, the limit is still ${limit}.`,
      `${b} is the assigned value. Assigning a value does not erase the limit, and it does not change it.`,
    ],
  );
}

function jumpStem(question: Question, params: Record<string, number>) {
  const k = read(params, "k");
  return made(
    question,
    `$f(x) = ${-k}$ khi $x < 0$, $f(x) = ${k}$ khi $x > 0$, và $f(0) = 0$. Giới hạn khi $x \\to 0$ bằng bao nhiêu?`,
    `$f(x) = ${-k}$ when $x < 0$, $f(x) = ${k}$ when $x > 0$, and $f(0) = 0$. What is the limit as $x \\to 0$?`,
    [NONE_VI, texInt(-k), texInt(0), texInt(k)],
    [NONE_EN, texInt(-k), texInt(0), texInt(k)],
    [
      `Phía trái tiến về ${-k}, phía phải tiến về ${k}.`,
      `Hai phía khác nhau, nên giới hạn không tồn tại.`,
      `$${-k}$ và $${k}$ mỗi bên một phía. $0$ là $f(0)$, không phải giới hạn.`,
    ],
    [
      `The left side approaches ${-k}, the right side approaches ${k}.`,
      `The two sides differ, so the limit does not exist.`,
      `$${-k}$ and $${k}$ are one side each. $0$ is $f(0)$, not the limit.`,
    ],
  );
}

function contStem(question: Question, params: Record<string, number>) {
  const a = read(params, "a");
  const value = 2 * a;
  return made(
    question,
    `Với $\\dfrac{x^2-${a * a}}{x-${a}}$ và $f(${a}) = ${value}$, hàm có liên tục tại $x = ${a}$ không?`,
    `For $\\dfrac{x^2-${a * a}}{x-${a}}$ with $f(${a}) = ${value}$, is the function continuous at $x = ${a}$?`,
    [
      `Có, vì giới hạn bằng giá trị tại ${a}`,
      `Không, vì mẫu bằng 0 tại x = ${a}`,
      "Không, vì giới hạn bằng 0",
      `Chỉ liên tục khi f(${a}) = 0`,
    ],
    [
      `Yes, because the limit equals the value at ${a}`,
      `No, because the denominator is 0 at x = ${a}`,
      "No, because the limit is 0",
      `Continuous only when f(${a}) = 0`,
    ],
    [
      `Giới hạn là ${value}, như sau khi rút gọn.`,
      `$f(${a})$ cũng bằng ${value}, nên hàm liên tục tại ${a}.`,
      `Mẫu của biểu thức cũ bằng 0, nhưng sau khi gán thì hàm đã được định nghĩa. Liên tục không đòi hỏi công thức cũ còn nghĩa tại điểm đó.`,
    ],
    [
      `The limit is ${value}, after simplifying.`,
      `$f(${a})$ is also ${value}, so the function is continuous at ${a}.`,
      `The old denominator is 0, but once the value is assigned the function is defined. Continuity does not need the old formula to make sense at the point.`,
    ],
  );
}

function teaStem(question: Question, params: Record<string, number>) {
  const room = read(params, "room");
  const extra = read(params, "extra");
  const start = room + extra;
  return made(
    question,
    `Nước nóng theo $T(t) = ${room} + ${extra}e^{-t/4}$, $t$ tính bằng phút. Khi $t$ tăng mãi, nhiệt độ tiến về bao nhiêu?`,
    `Hot water follows $T(t) = ${room} + ${extra}e^{-t/4}$, with $t$ in minutes. What temperature does it approach as $t$ grows without bound?`,
    [celsius(room), celsius(start), celsius(0), celsius(extra)],
    [celsius(room), celsius(start), celsius(0), celsius(extra)],
    [
      `Khi $t \\to +\\infty$, $e^{-t/4} \\to 0$.`,
      `$T(t) \\to ${room}$. Đó là nhiệt độ phòng.`,
      `${start}°C là $T(0)$. ${extra}°C là phần nóng hơn phòng lúc đầu. Nước không nguội về $0^\\circ\\text{C}$.`,
    ],
    [
      `As $t \\to +\\infty$, $e^{-t/4} \\to 0$.`,
      `$T(t) \\to ${room}$. That is room temperature.`,
      `${start}°C is $T(0)$. ${extra}°C is the initial excess over the room. The water does not cool to $0^\\circ\\text{C}$.`,
    ],
    `Số mũ âm rất lớn thì e mũ tiến về 0. Số ${room} đứng ngoài.`,
    `A large negative exponent sends the exponential to 0. The ${room} sits outside it.`,
  );
}

import type { Question } from "../types.ts";
import { pick } from "../../lib/prng.ts";
import { made, questionById, read, texInt } from "./stem.ts";
import { parametric, type Vary } from "./types.ts";

const ARITH = [
  { u: 3, d: 4, n: 10 }, { u: 2, d: 3, n: 8 }, { u: 5, d: 2, n: 6 }, { u: 4, d: 3, n: 7 },
  { u: 1, d: 4, n: 5 }, { u: 3, d: 2, n: 9 }, { u: 6, d: 3, n: 5 }, { u: 2, d: 5, n: 6 },
  { u: 4, d: 2, n: 10 }, { u: 5, d: 3, n: 8 }, { u: 7, d: 2, n: 6 }, { u: 3, d: 5, n: 7 },
  { u: 8, d: 3, n: 4 }, { u: 2, d: 4, n: 9 }, { u: 5, d: 4, n: 6 }, { u: 1, d: 3, n: 10 },
  { u: 4, d: 5, n: 5 }, { u: 6, d: 2, n: 8 }, { u: 9, d: 2, n: 5 }, { u: 3, d: 6, n: 4 },
] as const;

const GEOMS = [
  { u: 2, q: 3, n: 5 }, { u: 2, q: 3, n: 4 }, { u: 2, q: 4, n: 4 }, { u: 3, q: 2, n: 5 },
  { u: 2, q: 3, n: 6 }, { u: 4, q: 2, n: 4 }, { u: 2, q: 5, n: 3 }, { u: 3, q: 2, n: 6 },
  { u: 5, q: 2, n: 4 }, { u: 2, q: 3, n: 3 }, { u: 4, q: 3, n: 3 }, { u: 3, q: 4, n: 3 },
  { u: 2, q: 4, n: 3 }, { u: 5, q: 2, n: 5 },
] as const;

export function sequenceVary(questions: readonly Question[]): Vary[] {
  const q = (id: string) => questionById(questions, id);
  return [
    parametric(q("seq-term"), (rng) => pick(rng, ARITH), (params) => termStem(q("seq-term"), params)),
    parametric(q("seq-sum"), (rng) => pick(rng, ARITH), (params) => sumStem(q("seq-sum"), params)),
    parametric(q("seq-geom"), (rng) => pick(rng, GEOMS), (params) => geomStem(q("seq-geom"), params)),
    parametric(q("seq-infinite"), (rng) => ({ u: pick(rng, [8, 4, 12, 16, 20, 24]) }), (params) => infiniteStem(q("seq-infinite"), params)),
    parametric(q("seq-bounce"), (rng) => ({ h: pick(rng, [8, 4, 6, 10, 12, 14, 16, 20]) }), (params) => bounceStem(q("seq-bounce"), params)),
    parametric(q("seq-save"), (rng) => ({ n: pick(rng, [12, 8, 9, 10, 11, 13, 14, 15]) }), (params) => saveStem(q("seq-save"), params)),
  ];
}

function termStem(question: Question, params: Record<string, number>) {
  const u = read(params, "u");
  const d = read(params, "d");
  const n = read(params, "n");
  const value = u + (n - 1) * d;
  const steps = n - 1;
  return made(
    question,
    `Cấp số cộng $u_1 = ${u}$, công sai $d = ${d}$. Số hạng thứ $${n}$ bằng bao nhiêu?`,
    `Arithmetic sequence $u_1 = ${u}$, common difference $d = ${d}$. What is term $${n}$?`,
    [texInt(value), texInt(u + n * d), texInt(n * d), texInt(u * n)],
    [texInt(value), texInt(u + n * d), texInt(n * d), texInt(u * n)],
    [
      `Từ hạng 1 tới hạng ${n} có ${steps} bước, không phải ${n}.`,
      `$u_{${n}} = ${u} + ${steps}\\cdot${d} = ${value}$.`,
      `${u + n * d} đếm thừa một bước. ${n * d} bỏ số đầu. ${u * n} nhân thay vì cộng.`,
    ],
    [
      `From term 1 to term ${n} there are ${steps} steps, not ${n}.`,
      `$u_{${n}} = ${u} + ${steps}\\cdot${d} = ${value}$.`,
      `${u + n * d} counts one extra step. ${n * d} drops the first term. ${u * n} multiplies instead of adding.`,
    ],
    `Từ số hạng đầu tới số hạng thứ ${n} có ${steps} bước, không phải ${n}.`,
    `From the first term to term ${n} there are ${steps} steps, not ${n}.`,
  );
}

function sumStem(question: Question, params: Record<string, number>) {
  const u = read(params, "u");
  const d = read(params, "d");
  const n = read(params, "n");
  const last = u + (n - 1) * d;
  const total = (n / 2) * (u + last);
  const over = u + n * d;
  return made(
    question,
    `Cùng dãy $u_1 = ${u}$, $d = ${d}$. Tổng ${n} số hạng đầu bằng bao nhiêu?`,
    `Same sequence $u_1 = ${u}$, $d = ${d}$. What is the sum of the first ${n} terms?`,
    [texInt(total), texInt(last), texInt(n * last), texInt(over)],
    [texInt(total), texInt(last), texInt(n * last), texInt(over)],
    [
      `Số cuối $u_{${n}} = ${last}$.`,
      `$S = \\dfrac{${n}}{2}(${u} + ${last}) = ${total}$.`,
      `${last} chỉ là số cuối. ${n * last} quên chia đôi. ${over} đếm thừa một bước rồi dừng.`,
    ],
    [
      `The last term is $u_{${n}} = ${last}$.`,
      `$S = \\dfrac{${n}}{2}(${u} + ${last}) = ${total}$.`,
      `${last} is only the last term. ${n * last} forgets to halve. ${over} counts one extra step and stops.`,
    ],
  );
}

function geomStem(question: Question, params: Record<string, number>) {
  const u = read(params, "u");
  const q = read(params, "q");
  const n = read(params, "n");
  const steps = n - 1;
  const value = u * q ** steps;
  return made(
    question,
    `Cấp số nhân $u_1 = ${u}$, công bội $q = ${q}$. Số hạng thứ $${n}$ bằng bao nhiêu?`,
    `Geometric sequence $u_1 = ${u}$, common ratio $q = ${q}$. What is term $${n}$?`,
    [texInt(value), texInt(q ** steps), texInt(u + steps * q), texInt(q ** n)],
    [texInt(value), texInt(q ** steps), texInt(u + steps * q), texInt(q ** n)],
    [
      `Từ hạng 1 tới hạng ${n} có ${steps} lần nhân.`,
      `$u_{${n}} = ${u}\\cdot ${q}^{${steps}} = ${value}$.`,
      `${q ** steps} bỏ số đầu. ${u + steps * q} cộng thay vì nhân. ${q ** n} nhân thừa một lần.`,
    ],
    [
      `From term 1 to term ${n} there are ${steps} multiplications.`,
      `$u_{${n}} = ${u}\\cdot ${q}^{${steps}} = ${value}$.`,
      `${q ** steps} drops the first term. ${u + steps * q} adds instead of multiplying. ${q ** n} multiplies once too often.`,
    ],
    `Nhân ${steps} lần công bội, vì từ hạng 1 tới hạng ${n} có ${steps} bước.`,
    `Multiply by the ratio ${steps} times: from term 1 to term ${n} there are ${steps} steps.`,
  );
}

function infiniteStem(question: Question, params: Record<string, number>) {
  const u = read(params, "u");
  const sum = 2 * u;
  return made(
    question,
    `Tổng vô hạn $${u} + ${u / 2} + ${u / 4} + \\cdots$ bằng bao nhiêu?`,
    `What is the infinite sum $${u} + ${u / 2} + ${u / 4} + \\cdots$?`,
    [texInt(sum), texInt(0), texInt(u), "Không có tổng"],
    [texInt(sum), texInt(0), texInt(u), "No sum"],
    [
      `$u_1 = ${u}$, $q = 1/2$, và $|q| < 1$.`,
      `$S = ${u} / (1 - 1/2) = ${sum}$.`,
      `$0$ là giới hạn của số hạng, không phải tổng. ${u} chỉ là số đầu. Tổng tồn tại vì $|q| < 1$.`,
    ],
    [
      `$u_1 = ${u}$, $q = 1/2$, and $|q| < 1$.`,
      `$S = ${u} / (1 - 1/2) = ${sum}$.`,
      `$0$ is the limit of the terms, not the sum. ${u} is only the first term. The sum exists because $|q| < 1$.`,
    ],
  );
}

function bounceStem(question: Question, params: Record<string, number>) {
  const h = read(params, "h");
  const total = 3 * h;
  const metre = (n: number) => `${n} m`;
  return made(
    question,
    `Thả bóng từ ${h} m. Mỗi lần nảy lên một nửa độ cao vừa rơi. Quãng đường tổng cộng bằng bao nhiêu?`,
    `A ball is dropped from ${h} m. Each bounce reaches half the height just fallen. What is the total path?`,
    [metre(total), metre(2 * h), metre(h), metre((3 * h) / 2)],
    [metre(total), metre(2 * h), metre(h), metre((3 * h) / 2)],
    [
      `Các đỉnh sau lần rơi đầu cộng lại bằng ${h} m.`,
      `Mỗi đỉnh đi lên và đi xuống, nên cộng $2 \\times ${h}$. Thêm lần rơi ${h} m: tổng ${total} m.`,
      `${2 * h} m đếm mỗi đoạn một lần. ${h} m chỉ là lần thả. ${(3 * h) / 2} m chỉ cộng một nhịp nảy.`,
    ],
    [
      `The apexes after the first drop add up to ${h} m.`,
      `Each apex is travelled up and down, so add $2 \\times ${h}$. With the ${h} m drop the total is ${total} m.`,
      `${2 * h} m counts each piece once. ${h} m is only the drop. ${(3 * h) / 2} m adds a single bounce.`,
    ],
  );
}

function saveStem(question: Question, params: Record<string, number>) {
  const n = read(params, "n");
  const total = (n * (n + 1)) / 2;
  const short = (n * (n - 1)) / 2;
  const million = (value: number) => `${value} triệu`;
  return made(
    question,
    `Mỗi tháng gửi thêm một khoản tăng dần: 1 triệu, rồi 2 triệu, đến hết tháng ${n}. Tổng cộng gửi bao nhiêu?`,
    `Each month the deposit grows: 1 triệu, then 2 triệu, through month ${n}. How much is deposited in all?`,
    [million(total), million(n), million(n * n), million(short)],
    [million(total), million(n), million(n * n), million(short)],
    [
      `Các khoản là cấp số cộng $1, 2, \\ldots, ${n}$.`,
      `$S = \\dfrac{${n} \\times ${n + 1}}{2} = ${total}$ triệu.`,
      `${n} triệu chỉ là tháng cuối. ${n * n} triệu là $${n} \\times ${n}$. ${short} triệu thiếu một bước.`,
    ],
    [
      `The deposits are the arithmetic sequence $1, 2, \\ldots, ${n}$.`,
      `$S = \\dfrac{${n} \\times ${n + 1}}{2} = ${total}$ triệu.`,
      `${n} triệu is only the last month. ${n * n} triệu is $${n} \\times ${n}$. ${short} triệu is one step short.`,
    ],
    `Đây là tổng 1 + 2 + … + ${n}. Lấy số tháng nhân với tháng kế tiếp, rồi chia đôi.`,
    `This is the sum 1 + 2 + … + ${n}. Multiply the number of months by the next integer, then halve.`,
  );
}

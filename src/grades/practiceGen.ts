/**
 * Thêm 100 câu luyện cho mỗi lớp 1–12, sinh từ mẫu với hạt giống cố định.
 * Cùng mã nguồn thì luôn ra cùng câu, cùng id, cùng thứ tự lựa chọn.
 * Đáp số tính bằng TypeScript; `check` là biểu thức sympy tính lại độc lập.
 */
import type { GradeQuestion } from "./practiceBank.ts";

export const PER_TEMPLATE = 10;

type Steps = [string, string, string];
type Made = { prompt: string; right: string; wrong: string[]; steps: Steps; check: string; expect: string };
type Rand = {
  int: (lo: number, hi: number) => number;
  nz: (lo: number, hi: number) => number;
  pick: <T>(items: readonly T[]) => T;
};
type Template = { key: string; make: (r: Rand) => Made };

function rng(seed: number): Rand {
  let state = seed >>> 0;
  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (lo: number, hi: number) => lo + Math.floor(next() * (hi - lo + 1));
  return {
    int,
    nz: (lo, hi) => {
      let value = 0;
      while (value === 0) value = int(lo, hi);
      return value;
    },
    pick: <T>(items: readonly T[]) => items[int(0, items.length - 1)] as T,
  };
}

/* ---------- số và định dạng ---------- */

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b;

class Frac {
  readonly n: number;
  readonly d: number;
  constructor(n: number, d = 1) {
    if (d === 0) throw new Error("mẫu bằng 0");
    const sign = d < 0 ? -1 : 1;
    const g = gcd(n, d) || 1;
    this.n = (sign * n) / g;
    this.d = Math.abs(d) / g;
  }
  add(o: Frac) { return new Frac(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o: Frac) { return new Frac(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o: Frac) { return new Frac(this.n * o.n, this.d * o.d); }
  div(o: Frac) { return new Frac(this.n * o.d, this.d * o.n); }
  tex(): string {
    if (this.d === 1) return String(this.n);
    return `${this.n < 0 ? "-" : ""}\\dfrac{${Math.abs(this.n)}}{${this.d}}`;
  }
  sym(): string { return this.d === 1 ? String(this.n) : `Rational(${this.n},${this.d})`; }
}
const F = (n: number, d = 1) => new Frac(n, d);
/** Hệ số phân số trước một đơn thức: 1 và -1 không viết ra. */
function coefTex(c: Frac, mono: string): string {
  if (c.n === c.d) return mono;
  if (c.n === -c.d) return `-${mono}`;
  return `${c.tex()}${mono}`;
}

/** Số thập phân kiểu Việt: value = n / 10^scale, dấu phẩy, bỏ số 0 thừa. */
function dec(n: number, scale: number): string {
  const digits = String(Math.abs(n)).padStart(scale + 1, "0");
  const whole = digits.slice(0, digits.length - scale);
  const part = digits.slice(digits.length - scale).replace(/0+$/, "");
  return `${n < 0 ? "-" : ""}${part ? `${whole}{,}${part}` : whole}`;
}

const m = (value: string | number) => `$${value}$`;
const unit = (u: string) => (value: string | number) => `$${value}$ ${u}`;
const par = (n: number) => (n < 0 ? `(${n})` : String(n));
const sgn = (n: number) => (n < 0 ? `-${-n}` : `+${n}`);

/** Đa thức một biến, hệ số từ bậc cao xuống. */
function poly(coeffs: number[], v = "x"): string {
  const deg = coeffs.length - 1;
  let out = "";
  coeffs.forEach((c, i) => {
    if (c === 0) return;
    const p = deg - i;
    const mono = p === 0 ? "" : p === 1 ? v : `${v}^${p}`;
    const abs = Math.abs(c);
    const body = p === 0 ? String(abs) : abs === 1 ? mono : `${abs}${mono}`;
    out += out === "" ? (c < 0 ? `-${body}` : body) : c < 0 ? `-${body}` : `+${body}`;
  });
  return out || "0";
}
function polySym(coeffs: number[]): string {
  const deg = coeffs.length - 1;
  return `(${coeffs.map((c, i) => `(${c})*x**${deg - i}`).join("+")})`;
}
function polyAt(coeffs: number[], at: number): number {
  return coeffs.reduce((acc, c) => acc * at + c, 0);
}
/** Các số hạng tuyến tính có hệ số: [[2,"x"],[-3,"y"],[5,""]] → 2x-3y+5. */
function lin(terms: [number, string][]): string {
  let out = "";
  for (const [c, v] of terms) {
    if (c === 0) continue;
    const abs = Math.abs(c);
    const body = v === "" ? String(abs) : abs === 1 ? v : `${abs}${v}`;
    out += out === "" ? (c < 0 ? `-${body}` : body) : c < 0 ? `-${body}` : `+${body}`;
  }
  return out || "0";
}

/* ---------- lựa chọn ---------- */

function nums(right: number, cands: number[], wrap: (v: number) => string = m, min = -Infinity): { right: string; wrong: string[] } {
  const extra = [right + 1, right - 1, right + 2, right + 10, right - 2, right + 3];
  const wrong = [...cands, ...extra].filter((v) => Number.isFinite(v) && Number.isInteger(v) && v >= min && v !== right).map(wrap);
  return { right: wrap(right), wrong };
}
function fracs(right: Frac, cands: Frac[], wrap: (v: string) => string = m): { right: string; wrong: string[] } {
  const extra = [right.add(F(1)), right.sub(F(1)), right.mul(F(2)), right.add(F(1, 2))];
  return { right: wrap(right.tex()), wrong: [...cands, ...extra].map((v) => wrap(v.tex())) };
}
function decs(right: number, cands: number[], scale: number, wrap: (v: string) => string = m): { right: string; wrong: string[] } {
  const step = 10 ** scale;
  const extra = [right + step, right - step, right + 1, right * 10];
  return { right: wrap(dec(right, scale)), wrong: [...cands, ...extra].filter((v) => v > 0 && v !== right).map((v) => wrap(dec(v, scale))) };
}

function made(prompt: string, set: { right: string; wrong: string[] }, steps: Steps, check: string, expect: string): Made {
  return { prompt, right: set.right, wrong: set.wrong, steps, check, expect };
}

/** Tử số trong [lo; hi] tối giản với mẫu `d`. */
function coprime(r: Rand, lo: number, hi: number, d: number): number {
  const pool = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i).filter((v) => gcd(v, d) === 1);
  return pool.length ? r.pick(pool) : lo;
}
/** "a/d = kết quả" khi phân số còn rút gọn được, ngược lại chỉ "kết quả". */
function reduceTex(n: number, d: number, res: Frac): string {
  const raw = `${n < 0 ? "-" : ""}\\dfrac{${Math.abs(n)}}{${d}}`;
  return raw === res.tex() ? raw : `${raw}=${res.tex()}`;
}

const word: Record<number, string> = { 2: "hai", 3: "ba", 4: "tư", 5: "năm", 6: "sáu", 7: "bảy", 8: "tám", 9: "chín", 10: "mười" };

/* ---------- lớp 1 ---------- */

const grade1: Template[] = [
  { key: "cong10", make: (r) => {
    const a = r.int(1, 8), b = r.int(1, 10 - a), s = a + b;
    return made(`Tính $${a}+${b}$.`, nums(s, [s - 1, s + 1, Math.abs(a - b)], m, 0),
      [`Bắt đầu từ $${a}$ rồi đếm thêm $${b}$ bước.`, `Đếm tới bước cuối được $${s}$.`, `Thử lại: $${s}-${b}=${a}$, nên tổng là $${s}$.`], `${a}+${b}`, String(s));
  } },
  { key: "tru10", make: (r) => {
    const a = r.int(3, 10), b = r.int(1, a - 1), d = a - b;
    return made(`Tính $${a}-${b}$.`, nums(d, [a + b, d + 1, d - 1], m, 0),
      [`Từ $${a}$ bớt đi $${b}$.`, `Đếm lùi $${b}$ bước từ $${a}$ được $${d}$.`, `Thử lại: $${d}+${b}=${a}$, nên hiệu là $${d}$.`], `${a}-${b}`, String(d));
  } },
  { key: "them", make: (r) => {
    const thing = r.pick(["quả táo", "cái bút", "bông hoa", "viên bi", "cái kẹo"]);
    const who = r.pick(["Lan", "Minh", "An", "Hoa"]);
    const a = r.int(2, 8), b = r.int(1, 10 - a), s = a + b;
    return made(`${who} có $${a}$ ${thing}, được cho thêm $${b}$ ${thing}. Hỏi ${who} có tất cả bao nhiêu ${thing}?`,
      nums(s, [a - b, s + 1, s - 1], unit(thing), 0),
      ["Được cho thêm thì làm phép cộng.", `Tính $${a}+${b}=${s}$.`, `${who} có tất cả $${s}$ ${thing}.`], `${a}+${b}`, String(s));
  } },
  { key: "bot", make: (r) => {
    const [thing, gone] = r.pick([["con chim", "bay đi"], ["quả bóng", "bị vỡ"], ["cái bánh", "đã được ăn"], ["con vịt", "xuống ao"]] as const);
    const a = r.int(4, 10), b = r.int(1, a - 1), d = a - b;
    return made(`Có $${a}$ ${thing}, $${b}$ ${thing} ${gone}. Hỏi còn lại bao nhiêu ${thing}?`,
      nums(d, [a + b, d + 1, d - 1], unit(thing), 0),
      ["Bớt đi thì làm phép trừ.", `Tính $${a}-${b}=${d}$.`, `Còn lại $${d}$ ${thing}.`], `${a}-${b}`, String(d));
  } },
  { key: "solon", make: (r) => {
    const a = r.int(10, 99);
    let b = r.int(0, 1) ? 10 * Math.floor(a / 10) + r.int(0, 9) : r.int(10, 99);
    if (b === a) b = a === 99 ? 98 : a + 1;
    const big = Math.max(a, b), small = Math.min(a, b);
    const sameTens = Math.floor(a / 10) === Math.floor(b / 10);
    return made(`Số nào lớn hơn: $${a}$ hay $${b}$?`,
      { right: `Số $${big}$`, wrong: [`Số $${small}$`, "Hai số bằng nhau", "Không so sánh được"] },
      [sameTens ? `Hai số có cùng $${Math.floor(a / 10)}$ chục.` : `So hàng chục trước: $${Math.floor(big / 10)}$ chục nhiều hơn $${Math.floor(small / 10)}$ chục.`,
        sameTens ? `So hàng đơn vị: $${big % 10}$ lớn hơn $${small % 10}$.` : "Số có nhiều chục hơn thì lớn hơn.",
        `Vậy $${big}>${small}$, số $${big}$ lớn hơn.`], `Max(${a},${b})`, String(big));
  } },
  { key: "cong2", make: (r) => {
    const t = r.int(1, 9), u = r.int(0, 8), b = r.int(1, 9 - u), a = 10 * t + u, s = a + b;
    return made(`Tính $${a}+${b}$.`, nums(s, [s + 10, s - 1, a + 10 * b], m, 0),
      [`Cộng hàng đơn vị: $${u}+${b}=${u + b}$.`, `Hàng chục giữ nguyên $${t}$ chục.`, `Tổng là $${s}$.`], `${a}+${b}`, String(s));
  } },
  { key: "tru2", make: (r) => {
    const t = r.int(2, 9), u = r.int(1, 9), t2 = r.int(1, t - 1), u2 = r.int(0, u), a = 10 * t + u, b = 10 * t2 + u2, d = a - b;
    return made(`Tính $${a}-${b}$.`, nums(d, [a + b, d + 10, d - 10, d + 1], m, 0),
      [`Trừ hàng đơn vị: $${u}-${u2}=${u - u2}$.`, `Trừ hàng chục: $${t}-${t2}=${t - t2}$.`, `Hiệu là $${d}$.`], `${a}-${b}`, String(d));
  } },
  { key: "lien", make: (r) => {
    const n = r.int(11, 98), after = r.int(0, 1) === 1, v = after ? n + 1 : n - 1;
    return made(`Số liền ${after ? "sau" : "trước"} của $${n}$ là số nào?`, nums(v, [after ? n - 1 : n + 1, n + (after ? 10 : -10), n], m, 0),
      [`Số liền ${after ? "sau" : "trước"} thì ${after ? "lớn hơn" : "bé hơn"} đúng $1$ đơn vị.`, `Tính $${n}${after ? "+" : "-"}1=${v}$.`, `Số cần tìm là $${v}$.`], `${n}${after ? "+" : "-"}1`, String(v));
  } },
  { key: "chuc", make: (r) => {
    const t = r.int(1, 9), u = r.int(1, 9), v = 10 * t + u;
    return made(`Số gồm $${t}$ chục và $${u}$ đơn vị là số nào?`, nums(v, [10 * u + t, t + u, v + 10], m, 0),
      [`$${t}$ chục là $${10 * t}$.`, `Thêm $${u}$ đơn vị: $${10 * t}+${u}=${v}$.`, `Chữ số chục đứng trước, nên số đó là $${v}$.`], `10*${t}+${u}`, String(v));
  } },
  { key: "chan", make: (r) => {
    const a = r.int(1, 8), b = r.int(1, 9 - a), s = 10 * (a + b);
    return made(`Tính $${10 * a}+${10 * b}$.`, nums(s, [a + b, s + 10, s - 10], m, 0),
      [`$${10 * a}$ là $${a}$ chục, $${10 * b}$ là $${b}$ chục.`, `$${a}$ chục cộng $${b}$ chục được $${a + b}$ chục.`, `$${a + b}$ chục là $${s}$.`], `${10 * a}+${10 * b}`, String(s));
  } },
];

/* ---------- lớp 2 ---------- */

const grade2: Template[] = [
  { key: "congnho", make: (r) => {
    const u1 = r.int(2, 9), u2 = r.int(10 - u1, 9), t1 = r.int(1, 7), t2 = r.int(1, 8 - t1);
    const a = 10 * t1 + u1, b = 10 * t2 + u2, s = a + b;
    return made(`Tính $${a}+${b}$.`, nums(s, [s - 10, s + 10, s - 1], m, 0),
      [`Đơn vị: $${u1}+${u2}=${u1 + u2}$, viết $${(u1 + u2) % 10}$ nhớ $1$.`, `Chục: $${t1}+${t2}+1=${t1 + t2 + 1}$.`, `Tổng là $${s}$. Quên nhớ thì ra $${s - 10}$, sai.`], `${a}+${b}`, String(s));
  } },
  { key: "trunho", make: (r) => {
    const u1 = r.int(0, 8), u2 = r.int(u1 + 1, 9), t1 = r.int(3, 9), t2 = r.int(1, t1 - 1);
    const a = 10 * t1 + u1, b = 10 * t2 + u2, d = a - b;
    const naive = 10 * (t1 - t2) + (u2 - u1);
    return made(`Tính $${a}-${b}$.`, nums(d, [naive, d + 10, d - 1], m, 0),
      [`Đơn vị $${u1}$ không trừ được $${u2}$, mượn $1$ chục: $${10 + u1}-${u2}=${10 + u1 - u2}$.`, `Chục: $${t1}-1-${t2}=${t1 - 1 - t2}$.`, `Hiệu là $${d}$. Thử lại: $${d}+${b}=${a}$.`], `${a}-${b}`, String(d));
  } },
  { key: "bang", make: (r) => {
    const k = r.pick([2, 5]), n = r.int(2, 10), p = k * n;
    return made(`Tính $${k}\\times ${n}$.`, nums(p, [k + n, p + k, p - k], m, 0),
      [`$${k}\\times ${n}$ là $${k}$ được lấy $${n}$ lần.`, `Đọc bảng nhân $${k}$: $${k}\\times ${n}=${p}$.`, `Tích bằng $${p}$.`], `${k}*${n}`, String(p));
  } },
  { key: "chia", make: (r) => {
    const k = r.pick([2, 5]), q = r.int(2, 10), a = k * q;
    return made(`Tính $${a}\\div ${k}$.`, nums(q, [a - k, q + 1, q - 1], m, 1),
      [`Tìm số nhân với $${k}$ được $${a}$.`, `Bảng nhân $${k}$: $${k}\\times ${q}=${a}$.`, `Vậy $${a}\\div ${k}=${q}$.`], `${a}/${k}`, String(q));
  } },
  { key: "nhom", make: (r) => {
    const [box, thing] = r.pick([["hộp", "cái bút"], ["đĩa", "quả cam"], ["bó", "bông hoa"], ["túi", "viên bi"], ["hàng", "bạn"]] as const);
    const k = r.pick([2, 5]), g = r.int(2, 9), p = k * g;
    return made(`Có $${g}$ ${box}, mỗi ${box} có $${k}$ ${thing}. Hỏi có tất cả bao nhiêu ${thing}?`, nums(p, [g + k, p + k, p - k], unit(thing), 0),
      [`Mỗi ${box} $${k}$ ${thing}, có $${g}$ ${box}.`, `Lấy $${k}$ cộng $${g}$ lần, tức là $${k}\\times ${g}$.`, `$${k}\\times ${g}=${p}$, có $${p}$ ${thing}.`], `${k}*${g}`, String(p));
  } },
  { key: "doi", make: (r) => {
    const [big, small, f] = r.pick([["dm", "cm", 10], ["m", "dm", 10], ["m", "cm", 100]] as const);
    const n = r.int(2, 9), v = n * f;
    return made(`$${n}$ ${big} bằng bao nhiêu ${small}?`, nums(v, [n, n * f * 10, n + f], unit(small), 0),
      [`$1$ ${big} $=${f}$ ${small}.`, `$${n}$ ${big} $=${n}\\times ${f}$ ${small}.`, `Vậy $${n}$ ${big} $=${v}$ ${small}.`], `${n}*${f}`, String(v));
  } },
  { key: "tram", make: (r) => {
    const h = r.int(1, 9), t = r.int(0, 9), u = r.int(1, 9), v = 100 * h + 10 * t + u;
    return made(`Số gồm $${h}$ trăm, $${t}$ chục và $${u}$ đơn vị là`, nums(v, [100 * u + 10 * t + h, 100 * h + u, h + t + u], m, 0),
      [`$${h}$ trăm là $${100 * h}$, $${t}$ chục là $${10 * t}$.`, `$${100 * h}+${10 * t}+${u}=${v}$.`, `Viết lần lượt trăm, chục, đơn vị được $${v}$.`], `100*${h}+10*${t}+${u}`, String(v));
  } },
  { key: "gapkhuc", make: (r) => {
    const a = r.int(2, 15), b = r.int(2, 15), c = r.int(2, 15), s = a + b + c;
    return made(`Đường gấp khúc gồm ba đoạn dài $${a}$ cm, $${b}$ cm và $${c}$ cm. Độ dài đường gấp khúc là`, nums(s, [a + b, s + a, s - 1], unit("cm"), 1),
      ["Độ dài đường gấp khúc là tổng độ dài các đoạn.", `$${a}+${b}=${a + b}$, thêm $${c}$ được $${s}$.`, `Đường gấp khúc dài $${s}$ cm.`], `${a}+${b}+${c}`, String(s));
  } },
  { key: "cong3", make: (r) => {
    const h1 = r.int(1, 7), h2 = r.int(1, 8 - h1), t1 = r.int(0, 9), t2 = r.int(0, 9 - t1), u1 = r.int(0, 9), u2 = r.int(0, 9 - u1);
    const a = 100 * h1 + 10 * t1 + u1, b = 100 * h2 + 10 * t2 + u2, s = a + b;
    return made(`Tính $${a}+${b}$.`, nums(s, [s + 100, s - 10, s + 1], m, 0),
      [`Đơn vị: $${u1}+${u2}=${u1 + u2}$; chục: $${t1}+${t2}=${t1 + t2}$.`, `Trăm: $${h1}+${h2}=${h1 + h2}$.`, `Tổng là $${s}$.`], `${a}+${b}`, String(s));
  } },
  { key: "oTrong", make: (r) => {
    const a = r.int(11, 49), b = r.int(a + 5, 99), v = b - a;
    return made(`Số thích hợp điền vào ô trống: $\\square+${a}=${b}$.`, nums(v, [a + b, v + 10, v - 1], m, 0),
      [`Số cần tìm cộng với $${a}$ được $${b}$.`, `Lấy tổng trừ đi số đã biết: $${b}-${a}=${v}$.`, `Thử lại: $${v}+${a}=${b}$.`], `${b}-${a}`, String(v));
  } },
];

/* ---------- lớp 3 ---------- */

const grade3: Template[] = [
  { key: "nhan", make: (r) => {
    const a = r.int(12, 312), b = r.int(2, 9), p = a * b;
    const tens = a - (a % 10);
    return made(`Tính $${a}\\times ${b}$.`, nums(p, [p + b, p - b, p + 10], m, 0),
      [`$${tens}\\times ${b}=${tens * b}$.`, `$${a % 10}\\times ${b}=${(a % 10) * b}$.`, `Cộng lại: $${tens * b}+${(a % 10) * b}=${p}$.`], `${a}*${b}`, String(p));
  } },
  { key: "chia", make: (r) => {
    const d = r.int(2, 9), q = r.int(11, 199), a = d * q;
    return made(`Tính $${a}\\div ${d}$.`, nums(q, [q + 1, q - 1, q + 10], m, 1),
      [`Tìm số nhân với $${d}$ được $${a}$.`, `Thử $${d}\\times ${q}=${a}$, đúng.`, `Thương là $${q}$.`], `${a}/${d}`, String(q));
  } },
  { key: "du", make: (r) => {
    const d = r.int(3, 9), q = r.int(3, 20), rem = r.int(1, d - 1), a = d * q + rem;
    return made(`Phép chia $${a}\\div ${d}$ có số dư là`, nums(rem, [q, d - rem, rem + 1 < d ? rem + 1 : rem - 1], m, 0),
      [`$${d}\\times ${q}=${d * q}$ là số lớn nhất không vượt quá $${a}$.`, `$${a}-${d * q}=${rem}$.`, `Số dư là $${rem}$, bé hơn số chia $${d}$.`], `Mod(${a},${d})`, String(rem));
  } },
  { key: "cvcn", make: (r) => {
    const a = r.int(3, 20), b = r.int(2, a - 1), p = 2 * (a + b);
    return made(`Hình chữ nhật dài $${a}$ cm, rộng $${b}$ cm. Chu vi bằng`, nums(p, [a + b, a * b, 2 * a + b], unit("cm"), 1),
      ["Chu vi hình chữ nhật bằng hai lần tổng dài và rộng.", `$${a}+${b}=${a + b}$, rồi $2\\times ${a + b}=${p}$.`, `Chu vi bằng $${p}$ cm.`], `2*(${a}+${b})`, String(p));
  } },
  { key: "dtcn", make: (r) => {
    const a = r.int(3, 20), b = r.int(2, a - 1), s = a * b;
    return made(`Hình chữ nhật dài $${a}$ cm, rộng $${b}$ cm. Diện tích bằng`, nums(s, [2 * (a + b), a + b, s + a], unit("cm²"), 1),
      ["Diện tích hình chữ nhật bằng dài nhân rộng.", `$${a}\\times ${b}=${s}$.`, `Diện tích bằng $${s}$ cm².`], `${a}*${b}`, String(s));
  } },
  { key: "vuong", make: (r) => {
    const a = r.int(2, 15), area = r.int(0, 1) === 1, v = area ? a * a : 4 * a;
    return made(`Hình vuông cạnh $${a}$ cm. ${area ? "Diện tích" : "Chu vi"} bằng`, nums(v, area ? [4 * a, 2 * a, a * a + a] : [a * a, 2 * a, 3 * a], unit(area ? "cm²" : "cm"), 1),
      [area ? "Diện tích hình vuông bằng cạnh nhân cạnh." : "Hình vuông có bốn cạnh bằng nhau.", area ? `$${a}\\times ${a}=${v}$.` : `$${a}\\times 4=${v}$.`, `${area ? "Diện tích" : "Chu vi"} bằng $${v}$ ${area ? "cm²" : "cm"}.`], area ? `${a}**2` : `4*${a}`, String(v));
  } },
  { key: "motphan", make: (r) => {
    const n = r.int(2, 9), q = r.int(2, 12), total = n * q;
    const thing = r.pick(["quả cam", "cái kẹo", "quyển vở", "viên bi"]);
    return made(`Một phần ${word[n]} của $${total}$ ${thing} là bao nhiêu ${thing}?`, nums(q, [total * n, total - n, q + 1], unit(thing), 1),
      [`Một phần ${word[n]} là chia đều thành $${n}$ phần, lấy một phần.`, `$${total}\\div ${n}=${q}$.`, `Một phần ${word[n]} là $${q}$ ${thing}.`], `${total}/${n}`, String(q));
  } },
  { key: "gap", make: (r) => {
    const a = r.int(3, 30), k = r.int(2, 9), v = a * k;
    return made(`Gấp $${a}$ lên $${k}$ lần được`, nums(v, [a + k, v - a, v + k], m, 0),
      ["Gấp một số lên nhiều lần thì lấy số đó nhân với số lần.", `$${a}\\times ${k}=${v}$.`, `Kết quả là $${v}$, không phải $${a}+${k}=${a + k}$.`], `${a}*${k}`, String(v));
  } },
  { key: "giam", make: (r) => {
    const k = r.int(2, 9), q = r.int(3, 30), a = k * q;
    return made(`Giảm $${a}$ đi $${k}$ lần được`, nums(q, [a - k, a * k, q + 1], m, 1),
      ["Giảm một số đi nhiều lần thì lấy số đó chia cho số lần.", `$${a}\\div ${k}=${q}$.`, `Kết quả là $${q}$, không phải $${a}-${k}=${a - k}$.`], `${a}/${k}`, String(q));
  } },
  { key: "thutu", make: (r) => {
    const a = r.int(2, 40), b = r.int(2, 9), c = r.int(2, 9), v = a + b * c;
    return made(`Tính $${a}+${b}\\times ${c}$.`, nums(v, [(a + b) * c, a * b + c, v + 1], m, 0),
      ["Nhân chia trước, cộng trừ sau.", `$${b}\\times ${c}=${b * c}$.`, `$${a}+${b * c}=${v}$. Làm từ trái sang phải thì ra $${(a + b) * c}$, sai.`], `${a}+${b}*${c}`, String(v));
  } },
];

/* ---------- lớp 4 ---------- */

const grade4: Template[] = [
  { key: "tbc", make: (r) => {
    const mean = r.int(20, 90), d1 = r.int(1, 15), d2 = r.int(1, 15);
    const vals = [mean - d1, mean + d2, mean + d1 - d2];
    const sum = 3 * mean;
    return made(`Trung bình cộng của ba số $${vals[0]}$, $${vals[1]}$ và $${vals[2]}$ là`, nums(mean, [sum, mean + 1, Math.round(sum / 2)], m, 0),
      [`Tổng ba số: $${vals[0]}+${vals[1]}+${vals[2]}=${sum}$.`, `Chia tổng cho số các số hạng: $${sum}\\div 3=${mean}$.`, `Trung bình cộng là $${mean}$.`], `(${vals[0]}+${vals[1]}+${vals[2]})/3`, String(mean));
  } },
  { key: "tonghieu", make: (r) => {
    const small = r.int(10, 200), d = r.int(2, 80), big = small + d, s = big + small;
    return made(`Hai số có tổng $${s}$ và hiệu $${d}$. Số lớn là`, nums(big, [small, s - d, big + d], m, 0),
      ["Số lớn bằng tổng cộng hiệu rồi chia đôi.", `$(${s}+${d})\\div 2=${2 * big}\\div 2=${big}$.`, `Số bé là $${small}$; thử lại $${big}-${small}=${d}$.`], `(${s}+${d})/2`, String(big));
  } },
  { key: "nhan2", make: (r) => {
    const a = r.int(12, 99), b = r.int(12, 99), p = a * b;
    const t = b - (b % 10);
    return made(`Tính $${a}\\times ${b}$.`, nums(p, [p - a, p + 10 * a, a * t + (b % 10)], m, 0),
      [`$${a}\\times ${t}=${a * t}$.`, `$${a}\\times ${b % 10}=${a * (b % 10)}$.`, `Cộng lại: $${a * t}+${a * (b % 10)}=${p}$.`], `${a}*${b}`, String(p));
  } },
  { key: "chia2", make: (r) => {
    const d = r.int(12, 45), q = r.int(12, 99), a = d * q;
    return made(`Tính $${a}\\div ${d}$.`, nums(q, [q + 1, q - 1, q + 10], m, 1),
      [`Ước lượng: $${a}\\div ${d}$ khoảng $${q}$.`, `Thử $${d}\\times ${q}=${a}$, vừa đúng.`, `Thương là $${q}$.`], `${a}/${d}`, String(q));
  } },
  { key: "pscong", make: (r) => {
    const d1 = r.int(2, 6), k = r.int(2, 3), d2 = d1 * k, a = coprime(r, 1, d1 - 1, d1), b = coprime(r, 1, d2 - 1, d2);
    const res = F(a, d1).add(F(b, d2));
    return made(`Tính $\\dfrac{${a}}{${d1}}+\\dfrac{${b}}{${d2}}$.`, fracs(res, [F(a + b, d1 + d2), F(a + b, d2), res.add(F(1, d2))]),
      [`Quy đồng mẫu $${d2}$: $\\dfrac{${a}}{${d1}}=\\dfrac{${a * k}}{${d2}}$.`, `$\\dfrac{${a * k}}{${d2}}+\\dfrac{${b}}{${d2}}=\\dfrac{${a * k + b}}{${d2}}$.`, `Rút gọn được $${res.tex()}$.`], `Rational(${a},${d1})+Rational(${b},${d2})`, res.sym());
  } },
  { key: "pstru", make: (r) => {
    const d1 = r.int(2, 6), k = r.int(2, 3), d2 = d1 * k;
    const a = coprime(r, 1, d1 - 1, d1), b = coprime(r, 1, a * k - 1, d2);
    const res = F(a, d1).sub(F(b, d2));
    return made(`Tính $\\dfrac{${a}}{${d1}}-\\dfrac{${b}}{${d2}}$.`, fracs(res, [F(Math.abs(a - b) || 1, Math.abs(d2 - d1)), F(a * k + b, d2), res.add(F(1, d2))]),
      [`Quy đồng mẫu $${d2}$: $\\dfrac{${a}}{${d1}}=\\dfrac{${a * k}}{${d2}}$.`, `$\\dfrac{${a * k}}{${d2}}-\\dfrac{${b}}{${d2}}=\\dfrac{${a * k - b}}{${d2}}$.`, `Rút gọn được $${res.tex()}$.`], `Rational(${a},${d1})-Rational(${b},${d2})`, res.sym());
  } },
  { key: "psnhan", make: (r) => {
    const b = r.int(2, 9), a = coprime(r, 1, b - 1, b), d = r.int(2, 9), c = coprime(r, 1, d - 1, d);
    const res = F(a, b).mul(F(c, d));
    return made(`Tính $\\dfrac{${a}}{${b}}\\times\\dfrac{${c}}{${d}}$.`, fracs(res, [F(a + c, b + d), F(a * d, b * c), F(a * c, b + d)]),
      ["Nhân tử với tử, mẫu với mẫu.", `$\\dfrac{${a}\\times ${c}}{${b}\\times ${d}}=\\dfrac{${a * c}}{${b * d}}$.`, `Rút gọn được $${res.tex()}$.`], `Rational(${a},${b})*Rational(${c},${d})`, res.sym());
  } },
  { key: "phancua", make: (r) => {
    const b = r.int(2, 9), a = coprime(r, 1, b - 1, b), k = r.int(2, 15), n = b * k, v = a * k;
    return made(`$\\dfrac{${a}}{${b}}$ của $${n}$ bằng`, nums(v, [n * a, k, n - v], m, 0),
      [`Chia $${n}$ thành $${b}$ phần bằng nhau, mỗi phần $${k}$.`, `Lấy $${a}$ phần: $${a}\\times ${k}=${v}$.`, `Kết quả là $${v}$.`], `Rational(${a},${b})*${n}`, String(v));
  } },
  { key: "donvi", make: (r) => {
    const [big, small, f] = r.pick([["tạ", "kg", 100], ["yến", "kg", 10], ["tấn", "kg", 1000], ["m²", "dm²", 100], ["thế kỉ", "năm", 100], ["phút", "giây", 60]] as const);
    const n = r.int(2, 9), v = n * f;
    return made(`$${n}$ ${big} bằng bao nhiêu ${small}?`, nums(v, [v / 10, v * 10, n + f], unit(small), 1),
      [`$1$ ${big} $=${f}$ ${small}.`, `$${n}\\times ${f}=${v}$.`, `$${n}$ ${big} $=${v}$ ${small}.`], `${n}*${f}`, String(v));
  } },
  { key: "lamtron", make: (r) => {
    let n = r.int(10000, 99999);
    if (Math.floor(n / 100) % 10 === 5) n += 100;
    const down = Math.floor(n / 1000) * 1000, v = n % 1000 >= 500 ? down + 1000 : down;
    const other = v === down ? down + 1000 : down;
    return made(`Làm tròn số $${n}$ đến hàng nghìn được`, nums(v, [other, Math.round(n / 100) * 100, v + 10000], m, 0),
      [`Chữ số hàng trăm là $${Math.floor(n / 100) % 10}$.`, Math.floor(n / 100) % 10 >= 5 ? "Chữ số đó từ $5$ trở lên nên làm tròn lên." : "Chữ số đó bé hơn $5$ nên làm tròn xuống.", `Kết quả là $${v}$.`], `floor(Rational(${n},1000)+Rational(1,2))*1000`, String(v));
  } },
];

/* ---------- lớp 5 ---------- */

const grade5: Template[] = [
  { key: "tpcong", make: (r) => {
    let x = r.int(11, 99);
    if (x % 10 === 0) x += 1;
    const y = r.int(101, 999), sum = 10 * x + y;
    return made(`Tính $${dec(x, 1)}+${dec(y, 2)}$.`, decs(sum, [x + y, sum + 10, sum - 10], 2),
      [`Viết $${dec(x, 1)}$ thành $${Math.floor(x / 10)}{,}${x % 10}0$ để hai số cùng có hai chữ số thập phân.`, "Đặt tính sao cho các dấu phẩy thẳng cột rồi cộng như số tự nhiên.", `Tổng là $${dec(sum, 2)}$.`], `Rational(${x},10)+Rational(${y},100)`, `Rational(${sum},100)`);
  } },
  { key: "tpnhan", make: (r) => {
    let x = r.int(11, 99);
    if (x % 10 === 0) x += 1;
    const k = r.int(2, 9), p = x * k;
    return made(`Tính $${dec(x, 1)}\\times ${k}$.`, decs(p, [p * 10, x + 10 * k, p + 10], 1),
      [`Bỏ dấu phẩy: $${x}\\times ${k}=${p}$.`, "Thừa số có một chữ số thập phân nên tích cũng có một chữ số thập phân.", `Tích là $${dec(p, 1)}$.`], `Rational(${x},10)*${k}`, `Rational(${p},10)`);
  } },
  { key: "ptcua", make: (r) => {
    const p = r.pick([10, 15, 20, 25, 30, 40, 50, 60, 75]), base = 100 / gcd(p, 100), n = base * r.int(1, 20), v = (n * p) / 100;
    return made(`$${p}\\%$ của $${n}$ bằng`, nums(v, [n - v, (n * p) / 10, p], m, 0),
      [`$${p}\\%$ của $${n}$ là $${n}\\times ${p}\\div 100$.`, `$${n}\\times ${p}=${n * p}$, chia $100$ được $${v}$.`, `Kết quả là $${v}$.`], `Rational(${p},100)*${n}`, String(v));
  } },
  { key: "ptla", make: (r) => {
    const b = r.pick([20, 25, 40, 50, 80, 200, 400]), p = r.pick([5, 10, 20, 25, 40, 50, 60, 75, 80].filter((v) => (b * v) % 100 === 0)), a = (b * p) / 100;
    return made(`$${a}$ là bao nhiêu phần trăm của $${b}$?`, nums(p, [100 - p, a, p + 10], (v) => `$${v}\\%$`, 1),
      [`Tỉ số phần trăm là $${a}\\div ${b}\\times 100$.`, `$${a}\\div ${b}=${dec(p, 2)}$.`, `Nhân $100$ được $${p}\\%$.`], `Rational(${a},${b})*100`, String(p));
  } },
  { key: "tamgiac", make: (r) => {
    const b = r.int(3, 20), h = r.int(2, 15), v = b * h * 5;
    return made(`Tam giác có đáy $${b}$ cm, chiều cao $${h}$ cm. Diện tích bằng`, decs(v, [b * h * 10, (b + h) * 10, v + 10], 1, unit("cm²")),
      ["Diện tích tam giác bằng đáy nhân chiều cao rồi chia $2$.", `$${b}\\times ${h}=${b * h}$.`, `$${b * h}\\div 2=${dec(v, 1)}$, diện tích bằng $${dec(v, 1)}$ cm².`], `Rational(${b}*${h},2)`, `Rational(${v},10)`);
  } },
  { key: "thang", make: (r) => {
    const a = r.int(5, 20), b = r.int(2, a - 1), h = r.int(2, 12), v = (a + b) * h * 5;
    return made(`Hình thang có hai đáy $${a}$ cm và $${b}$ cm, chiều cao $${h}$ cm. Diện tích bằng`, decs(v, [(a + b) * h * 10, a * b * h * 5, v + 10], 1, unit("cm²")),
      ["Diện tích hình thang bằng tổng hai đáy nhân chiều cao rồi chia $2$.", `$(${a}+${b})\\times ${h}=${(a + b) * h}$.`, `$${(a + b) * h}\\div 2=${dec(v, 1)}$, diện tích bằng $${dec(v, 1)}$ cm².`], `Rational((${a}+${b})*${h},2)`, `Rational(${v},10)`);
  } },
  { key: "hop", make: (r) => {
    const a = r.int(3, 12), b = r.int(2, 10), c = r.int(2, 9), v = a * b * c;
    return made(`Hình hộp chữ nhật dài $${a}$ cm, rộng $${b}$ cm, cao $${c}$ cm. Thể tích bằng`, nums(v, [a * b, a + b + c, 2 * (a * b + b * c + c * a)], unit("cm³"), 1),
      ["Thể tích hình hộp chữ nhật bằng dài nhân rộng nhân cao.", `$${a}\\times ${b}=${a * b}$, rồi nhân $${c}$.`, `Thể tích bằng $${v}$ cm³.`], `${a}*${b}*${c}`, String(v));
  } },
  { key: "lapphuong", make: (r) => {
    const a = r.int(2, 12), v = a ** 3;
    return made(`Hình lập phương cạnh $${a}$ cm. Thể tích bằng`, nums(v, [a * a, 6 * a * a, 3 * a], unit("cm³"), 1),
      ["Thể tích hình lập phương bằng cạnh nhân cạnh nhân cạnh.", `$${a}\\times ${a}=${a * a}$, rồi nhân $${a}$.`, `Thể tích bằng $${v}$ cm³.`], `${a}**3`, String(v));
  } },
  { key: "vantoc", make: (r) => {
    const v = r.int(8, 60), t = r.pick([5, 10, 15, 20, 25, 30, 40]), s = v * t;
    return made(`Một xe đi với vận tốc $${v}$ km/giờ trong $${dec(t, 1)}$ giờ. Quãng đường xe đi được là`, decs(s, [v * 10 + t, s + 10 * v, s * 10], 1, unit("km")),
      ["Quãng đường bằng vận tốc nhân thời gian.", `$${v}\\times ${dec(t, 1)}=${dec(s, 1)}$.`, `Xe đi được $${dec(s, 1)}$ km.`], `${v}*Rational(${t},10)`, `Rational(${s},10)`);
  } },
  { key: "tron", make: (r) => {
    const d = 2 * r.int(1, 10), c = d * 314;
    return made(`Hình tròn có đường kính $${d}$ cm. Chu vi bằng (lấy $\\pi\\approx 3{,}14$)`, decs(c, [c / 2, (d / 2) * (d / 2) * 314, c + 314], 2, unit("cm")),
      ["Chu vi hình tròn bằng đường kính nhân $3{,}14$.", `$${d}\\times 3{,}14=${dec(c, 2)}$.`, `Chu vi bằng $${dec(c, 2)}$ cm.`], `${d}*Rational(314,100)`, `Rational(${c},100)`);
  } },
];

/* ---------- lớp 6 ---------- */

const grade6: Template[] = [
  { key: "cong", make: (r) => {
    const a = -r.int(1, 30), b = r.int(1, 40), swap = r.int(0, 1) === 1, s = a + b;
    const expr = swap ? `${b}+(${a})` : `${a}+${b}`;
    return made(`Tính $${expr}$.`, nums(s, [-s, Math.abs(a) + b, -(Math.abs(a) + b)]),
      [`Hai số trái dấu: lấy $${Math.max(-a, b)}-${Math.min(-a, b)}=${Math.abs(s)}$.`, `Đặt dấu của số có giá trị tuyệt đối lớn hơn${s < 0 ? ", tức dấu trừ" : ""}.`, `Kết quả là $${s}$.`], expr, String(s));
  } },
  { key: "tru", make: (r) => {
    const a = r.int(-20, 20), b = r.int(1, 25), s = a + b;
    return made(`Tính $${a}-(-${b})$.`, nums(s, [a - b, -a - b, -s]),
      ["Trừ một số là cộng với số đối của nó.", `$${a}-(-${b})=${a}+${b}$.`, `Kết quả là $${s}$.`], `${a}-(-${b})`, String(s));
  } },
  { key: "nhan", make: (r) => {
    const a = r.nz(-12, 12), b = r.nz(-12, 12), p = a * b;
    return made(`Tính $${par(a)}\\cdot ${par(b)}$.`, nums(p, [-p, a + b, Math.abs(a) + Math.abs(b)]),
      [`$${Math.abs(a)}\\cdot ${Math.abs(b)}=${Math.abs(p)}$.`, (a < 0) === (b < 0) ? "Hai số cùng dấu nên tích dương." : "Hai số khác dấu nên tích âm.", `Kết quả là $${p}$.`], `(${a})*(${b})`, String(p));
  } },
  { key: "ucln", make: (r) => {
    const g = r.int(2, 15), pair = r.pick([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [2, 7], [3, 7], [4, 7], [5, 7], [5, 8], [7, 8]] as const);
    const A = g * pair[0], B = g * pair[1];
    return made(`ƯCLN$(${A}, ${B})$ bằng`, nums(g, [g * pair[0] * pair[1], A, B - A === g ? g + 1 : B - A], m, 1),
      [`$${A}=${g}\\cdot ${pair[0]}$ và $${B}=${g}\\cdot ${pair[1]}$.`, `$${pair[0]}$ và $${pair[1]}$ không còn ước chung nào lớn hơn $1$.`, `Ước chung lớn nhất là $${g}$.`], `gcd(${A},${B})`, String(g));
  } },
  { key: "bcnn", make: (r) => {
    const A = r.int(4, 20), B = r.int(4, 24);
    const L = lcm(A, B);
    return made(`BCNN$(${A}, ${B})$ bằng`, nums(L, [A * B, gcd(A, B), L * 2], m, 1),
      [`ƯCLN của $${A}$ và $${B}$ là $${gcd(A, B)}$.`, `BCNN bằng tích chia ƯCLN: $${A * B}\\div ${gcd(A, B)}=${L}$.`, `Kết quả là $${L}$.`], `lcm(${A},${B})`, String(L));
  } },
  { key: "luythua", make: (r) => {
    const a = r.int(2, 9), n = a <= 4 ? r.int(2, 5) : r.int(2, 3), v = a ** n;
    return made(`Tính $${a}^${n}$.`, nums(v, [a * n, n ** a, a ** (n - 1)], m, 0),
      [`$${a}^${n}$ là tích của $${n}$ thừa số $${a}$.`, `$${Array(n).fill(a).join("\\cdot ")}=${v}$.`, `Không nhầm thành $${a}\\cdot ${n}=${a * n}$.`], `${a}**${n}`, String(v));
  } },
  { key: "ps", make: (r) => {
    const d1 = r.int(2, 9);
    let d2 = r.int(2, 12);
    if (d2 === d1 || d2 % d1 === 0 || d1 % d2 === 0) d2 = d1 + 1;
    const a = coprime(r, 1, d1 - 1, d1), b = coprime(r, 1, d2 - 1, d2), res = F(a, d1).add(F(b, d2)), L = lcm(d1, d2);
    return made(`Tính $\\dfrac{${a}}{${d1}}+\\dfrac{${b}}{${d2}}$.`, fracs(res, [F(a + b, d1 + d2), F(a + b, L), res.add(F(1, L))]),
      [`Mẫu chung nhỏ nhất là $${L}$.`, `$\\dfrac{${(a * L) / d1}}{${L}}+\\dfrac{${(b * L) / d2}}{${L}}=\\dfrac{${(a * L) / d1 + (b * L) / d2}}{${L}}$.`, `Rút gọn được $${res.tex()}$.`], `Rational(${a},${d1})+Rational(${b},${d2})`, res.sym());
  } },
  { key: "timso", make: (r) => {
    const b = r.int(2, 9), a = coprime(r, 1, b - 1, b), k = r.int(2, 12), whole = b * k, part = a * k;
    return made(`$\\dfrac{${a}}{${b}}$ của một số bằng $${part}$. Số đó là`, nums(whole, [part * a, part - a, k], m, 1),
      [`Muốn tìm một số khi biết $\\dfrac{${a}}{${b}}$ của nó, lấy $${part}$ chia cho $\\dfrac{${a}}{${b}}$.`, `$${part}\\cdot\\dfrac{${b}}{${a}}=${whole}$.`, `Thử lại: $\\dfrac{${a}}{${b}}\\cdot ${whole}=${part}$.`], `${part}/Rational(${a},${b})`, String(whole));
  } },
  { key: "timx", make: (r) => {
    const a = r.nz(-20, 20), x = r.nz(-20, 20), b = x + a;
    return made(`Tìm số nguyên $x$, biết $x${sgn(a)}=${b}$.`, nums(x, [b + a, -x, a - b]),
      [`Chuyển $${sgn(a)}$ sang vế phải và đổi dấu.`, `$x=${b}${sgn(-a)}=${x}$.`, `Thử lại: $${par(x)}${sgn(a)}=${b}$.`], `solve(x+(${a})-(${b}), x)[0]`, String(x));
  } },
  { key: "thoi", make: (r) => {
    const d1 = 2 * r.int(2, 10), d2 = r.int(3, 18), v = (d1 * d2) / 2;
    return made(`Hình thoi có hai đường chéo $${d1}$ cm và $${d2}$ cm. Diện tích bằng`, nums(v, [d1 * d2, d1 + d2, 2 * (d1 + d2)], unit("cm²"), 1),
      ["Diện tích hình thoi bằng nửa tích hai đường chéo.", `$${d1}\\cdot ${d2}=${d1 * d2}$.`, `Chia $2$ được $${v}$ cm².`], `Rational(${d1}*${d2},2)`, String(v));
  } },
];

/* ---------- lớp 7 ---------- */

const grade7: Template[] = [
  { key: "pt", make: (r) => {
    const a = r.int(2, 9), x0 = r.nz(-9, 9), b = r.nz(-20, 20), c = a * x0 + b;
    return made(`Tìm $x$, biết $${a}x${sgn(b)}=${c}$.`, nums(x0, [-x0, (c + b) / a, x0 + 1]),
      [`Chuyển vế: $${a}x=${c}${sgn(-b)}=${c - b}$.`, `Chia hai vế cho $${a}$: $x=${x0}$.`, `Thử lại: $${a}\\cdot ${par(x0)}${sgn(b)}=${c}$.`], `solve(${a}*x+(${b})-(${c}), x)[0]`, String(x0));
  } },
  { key: "nhanq", make: (r) => {
    const b = r.int(2, 9), a = coprime(r, 1, 9, b), d = r.int(2, 9), c = coprime(r, 1, 9, d), s = r.pick([-1, 1]);
    const A = F(-a, b), B = F(s * c, d), res = A.mul(B);
    return made(`Tính $${A.tex()}\\cdot${B.n < 0 ? `\\left(${B.tex()}\\right)` : B.tex()}$.`, fracs(res, [res.mul(F(-1)), F(-(a + c), b + d), A.add(B)]),
      [`Nhân tử với tử, mẫu với mẫu: $\\dfrac{${a}\\cdot ${c}}{${b}\\cdot ${d}}=\\dfrac{${a * c}}{${b * d}}$ (chưa xét dấu).`, s < 0 ? "Hai thừa số cùng âm nên tích dương." : "Một thừa số âm nên tích âm.", `Rút gọn được $${res.tex()}$.`], `(${A.sym()})*(${B.sym()})`, res.sym());
  } },
  { key: "tile", make: (r) => {
    const c = r.int(2, 9), k = r.int(1, 9), b = r.int(1, 12), a = c * k, x0 = (a * b) / c;
    return made(`Tìm $x$, biết $\\dfrac{x}{${a}}=\\dfrac{${b}}{${c}}$.`, nums(x0, [a + b - c, (a * c) / b, b * c], m, 0),
      ["Nhân chéo: $x\\cdot " + c + `=${a}\\cdot ${b}$.`, `$x=\\dfrac{${a * b}}{${c}}=${x0}$.`, `Thử lại: $\\dfrac{${x0}}{${a}}=\\dfrac{${b}}{${c}}$.`], `solve(x/${a}-Rational(${b},${c}), x)[0]`, String(x0));
  } },
  { key: "chiatile", make: (r) => {
    const [p, q] = r.pick([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 7], [3, 7], [1, 4], [4, 9]] as const), k = r.int(2, 15), S = k * (p + q);
    return made(`Hai số $x$ và $y$ tỉ lệ với $${p}$ và $${q}$, biết $x+y=${S}$. Giá trị của $x$ là`, nums(k * p, [k * q, k, S - p], m, 0),
      [`Đặt $\\dfrac{x}{${p}}=\\dfrac{y}{${q}}=\\dfrac{x+y}{${p + q}}$.`, `$\\dfrac{${S}}{${p + q}}=${k}$.`, `$x=${p}\\cdot ${k}=${k * p}$, còn $y=${k * q}$.`], `Rational(${S},${p}+${q})*${p}`, String(k * p));
  } },
  { key: "goc", make: (r) => {
    const A = r.int(25, 100), B = r.int(20, 150 - A), C = 180 - A - B;
    return made(`Tam giác $ABC$ có $\\hat A=${A}^\\circ$, $\\hat B=${B}^\\circ$. Góc $\\hat C$ bằng`, nums(C, [A + B, 180 - A, 90 - (A + B - 90)], (v) => `$${v}^\\circ$`, 1),
      ["Tổng ba góc của một tam giác bằng $180^\\circ$.", `$\\hat C=180^\\circ-${A}^\\circ-${B}^\\circ$.`, `$\\hat C=${C}^\\circ$.`], `180-${A}-${B}`, String(C));
  } },
  { key: "gocngoai", make: (r) => {
    const A = r.int(25, 90), B = r.int(20, 150 - A), v = A + B;
    return made(`Tam giác $ABC$ có $\\hat A=${A}^\\circ$, $\\hat B=${B}^\\circ$. Góc ngoài tại đỉnh $C$ bằng`, nums(v, [180 - v, 180 - A, Math.abs(A - B)], (x) => `$${x}^\\circ$`, 1),
      ["Góc ngoài tại một đỉnh bằng tổng hai góc trong không kề với nó.", `$${A}^\\circ+${B}^\\circ=${v}^\\circ$.`, `Kiểm tra: góc trong tại $C$ là $${180 - v}^\\circ$, cộng góc ngoài được $180^\\circ$.`], `180-(180-${A}-${B})`, String(v));
  } },
  { key: "giatri", make: (r) => {
    const co = [r.nz(-3, 3), r.nz(-6, 6), r.int(-9, 9)], k = r.nz(-3, 3), v = polyAt(co, k);
    return made(`Giá trị của biểu thức $${poly(co)}$ tại $x=${k}$ là`, nums(v, [polyAt([co[0]!, -co[1]!, co[2]!], k), polyAt([-co[0]!, co[1]!, co[2]!], k), v + co[2]! === v ? v + 5 : v + 2 * co[2]!]),
      [`Thay $x=${k}$ vào biểu thức.`, `$${co[0]}\\cdot ${par(k)}^2${sgn(co[1]!)}\\cdot ${par(k)}${sgn(co[2]!)}$.`, `Tính lần lượt được $${v}$.`], `${polySym(co)}.subs(x, ${k})`, String(v));
  } },
  { key: "thugon", make: (r) => {
    const a = r.int(2, 9), b = r.int(2, 9), c = r.int(1, a + b - 2), res = a + b - c;
    const fmt = (n: number) => (n === 1 ? "x" : n === -1 ? "-x" : `${n}x`);
    return made(`Thu gọn $${a}x+${b}x-${c}x$.`, { right: m(fmt(res)), wrong: [m(fmt(a + b + c)), m(fmt(a - b - c)), m(fmt(res + 1)), m(`${res}x^3`)] },
      ["Các hạng tử đều chứa $x$ nên là đơn thức đồng dạng.", `Cộng trừ hệ số: $${a}+${b}-${c}=${res}$.`, `Kết quả là $${fmt(res)}$.`], `expand(${a}*x+${b}*x-${c}*x)`, `${res}*x`);
  } },
  { key: "xucxac", make: (r) => {
    const events: [string, number, string][] = [
      ["số chấm chẵn", 3, "$2, 4, 6$"], ["số chấm lẻ", 3, "$1, 3, 5$"], ["số chấm chia hết cho $3$", 2, "$3, 6$"], ["số chấm là số nguyên tố", 3, "$2, 3, 5$"],
      ...[1, 2, 3, 4, 5].map((k): [string, number, string] => [`số chấm lớn hơn $${k}$`, 6 - k, `$${Array.from({ length: 6 - k }, (_, i) => k + 1 + i).join(", ")}$`]),
      ...[2, 3, 4, 5, 6].map((k): [string, number, string] => [`số chấm nhỏ hơn $${k}$`, k - 1, `$${Array.from({ length: k - 1 }, (_, i) => i + 1).join(", ")}$`]),
    ];
    const [what, count, list] = r.pick(events), res = F(count, 6);
    return made(`Gieo một con xúc xắc cân đối. Xác suất xuất hiện mặt có ${what} là`, fracs(res, [F(6 - count, 6), F(1, 6), F(count, 5)]),
      ["Có $6$ kết quả đồng khả năng.", `Kết quả thuận lợi: ${list}, gồm $${count}$ kết quả.`, `Xác suất bằng $${reduceTex(count, 6, res)}$.`], `Rational(${count},6)`, res.sym());
  } },
  { key: "tilenghich", make: (r) => {
    const work = r.pick([12, 18, 24, 30, 36, 48, 60]), divs = Array.from({ length: work }, (_, i) => i + 1).filter((v) => work % v === 0 && v >= 2 && v <= work / 2);
    const a = r.pick(divs);
    let c = r.pick(divs);
    if (c === a) c = divs[(divs.indexOf(a) + 1) % divs.length]!;
    const b = work / a, v = work / c;
    return made(`$${a}$ người làm xong một công việc trong $${b}$ ngày. Với cùng năng suất, $${c}$ người làm xong trong bao nhiêu ngày?`, nums(v, [(b * c) / a, b, v + 1], unit("ngày"), 1),
      ["Số người và số ngày là hai đại lượng tỉ lệ nghịch.", `Tích không đổi: $${a}\\cdot ${b}=${work}$.`, `Số ngày là $${work}\\div ${c}=${v}$.`], `${a}*${b}/${c}`, String(v));
  } },
];

/* ---------- lớp 8 ---------- */

const grade8: Template[] = [
  { key: "binhphuong", make: (r) => {
    const a = r.int(1, 4), k = 10 * r.int(2, 10) - a, v = (k + a) ** 2;
    return made(`Giá trị của $x^2+${2 * a}x+${a * a}$ tại $x=${k}$ là`, nums(v, [k * k + a * a, (k + a) * (k - a), v + 2 * a * k], m, 0),
      [`$x^2+${2 * a}x+${a * a}=(x+${a})^2$.`, `Tại $x=${k}$: $(${k}+${a})^2=${k + a}^2$.`, `Kết quả là $${v}$.`], `(${k})**2+${2 * a}*${k}+${a * a}`, String(v));
  } },
  { key: "hieubp", make: (r) => {
    const base = r.pick([50, 100, 30, 40, 60]), d = r.int(1, 9), M = base + d, N = base - d, v = M * M - N * N;
    return made(`Tính nhanh $${M}^2-${N}^2$.`, nums(v, [(M - N) ** 2, M - N, v + 100], m, 0),
      [`Dùng hằng đẳng thức $a^2-b^2=(a-b)(a+b)$.`, `$(${M}-${N})(${M}+${N})=${M - N}\\cdot ${M + N}$.`, `Kết quả là $${v}$.`], `${M}**2-${N}**2`, String(v));
  } },
  { key: "phantich", make: (r) => {
    const k = r.int(2, 9), type = r.int(0, 2);
    const forms = [`(x-${k})(x+${k})`, `(x-${k})^2`, `(x+${k})^2`, `(x-${2 * k})(x+${2 * k})`];
    const syms = [`(x-${k})*(x+${k})`, `(x-${k})**2`, `(x+${k})**2`];
    const given = [`x^2-${k * k}`, `x^2-${2 * k}x+${k * k}`, `x^2+${2 * k}x+${k * k}`][type]!;
    const givenSym = [`x**2-${k * k}`, `x**2-${2 * k}*x+${k * k}`, `x**2+${2 * k}*x+${k * k}`][type]!;
    const rule = ["$a^2-b^2=(a-b)(a+b)$", "$a^2-2ab+b^2=(a-b)^2$", "$a^2+2ab+b^2=(a+b)^2$"][type]!;
    return made(`Phân tích $${given}$ thành nhân tử.`, { right: m(forms[type]!), wrong: forms.filter((_, i) => i !== type).map(m) },
      [`Viết $${k * k}=${k}^2$${type ? ` và $${2 * k}x=2\\cdot x\\cdot ${k}$` : ""}.`, `Áp dụng ${rule}.`, `Kết quả là $${forms[type]}$. Nhân lại để kiểm tra.`], `expand(${syms[type]})`, givenSym);
  } },
  { key: "huyen", make: (r) => {
    const [a, b, c] = r.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15], [20, 21, 29], [9, 40, 41], [12, 16, 20], [15, 20, 25], [12, 35, 37], [10, 24, 26]] as const);
    return made(`Tam giác vuông có hai cạnh góc vuông $${a}$ cm và $${b}$ cm. Cạnh huyền dài`, nums(c, [a + b, c + 1, c - 1], unit("cm"), 1),
      [`Định lí Pythagore: $c^2=${a}^2+${b}^2=${a * a}+${b * b}=${c * c}$.`, `$c=\\sqrt{${c * c}}=${c}$ vì độ dài dương.`, `Cạnh huyền dài $${c}$ cm.`], `sqrt(${a}**2+${b}**2)`, String(c));
  } },
  { key: "canhgv", make: (r) => {
    const [a, b, c] = r.pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15], [20, 21, 29], [9, 40, 41], [12, 16, 20], [15, 20, 25], [12, 35, 37], [10, 24, 26]] as const);
    const flip = r.int(0, 1) === 1, known = flip ? b : a, want = flip ? a : b;
    return made(`Tam giác vuông có cạnh huyền $${c}$ cm và một cạnh góc vuông $${known}$ cm. Cạnh góc vuông còn lại dài`, nums(want, [c - known, c + known, want + 1], unit("cm"), 1),
      [`Định lí Pythagore: $${c}^2=${known}^2+b^2$.`, `$b^2=${c * c}-${known * known}=${want * want}$.`, `$b=${want}$ cm.`], `sqrt(${c}**2-${known}**2)`, String(want));
  } },
  { key: "hambac1", make: (r) => {
    const a = r.nz(-5, 5), b = r.int(-9, 9), k = r.nz(-6, 6), v = a * k + b;
    return made(`Cho hàm số $y=${lin([[a, "x"], [b, ""]])}$. Khi $x=${k}$ thì $y$ bằng`, nums(v, [a * k - b, a + k + b, -v]),
      [`Thay $x=${k}$: $y=${a}\\cdot ${par(k)}${b ? sgn(b) : ""}$.`, `$${a}\\cdot ${par(k)}=${a * k}$.`, `$y=${v}$.`], `(${a})*(${k})+(${b})`, String(v));
  } },
  { key: "ptngoac", make: (r) => {
    const a = r.int(2, 7), b = r.nz(-9, 9), x0 = r.nz(-9, 12), c = a * (x0 - b);
    return made(`Giải phương trình $${a}(x${sgn(-b)})=${c}$.`, nums(x0, [x0 - b, -x0, x0 - 2 * b]),
      [`Chia hai vế cho $${a}$: $x${sgn(-b)}=${c / a}$.`, `$x=${c / a}${sgn(b)}=${x0}$.`, `Thử lại: $${a}(${x0}${sgn(-b)})=${c}$.`], `solve(${a}*(x-(${b}))-(${c}), x)[0]`, String(x0));
  } },
  { key: "tugiac", make: (r) => {
    const A = r.int(60, 120), B = r.int(60, 120), C = r.int(50, 110), D = 360 - A - B - C;
    if (D <= 20 || D >= 180) return grade8[7]!.make(r);
    return made(`Tứ giác $ABCD$ có $\\hat A=${A}^\\circ$, $\\hat B=${B}^\\circ$, $\\hat C=${C}^\\circ$. Góc $\\hat D$ bằng`, nums(D, [180 - (A + B + C - 180), 180 - C, D + 10], (v) => `$${v}^\\circ$`, 1),
      ["Tổng bốn góc của một tứ giác bằng $360^\\circ$.", `$\\hat D=360^\\circ-${A}^\\circ-${B}^\\circ-${C}^\\circ$.`, `$\\hat D=${D}^\\circ$.`], `360-${A}-${B}-${C}`, String(D));
  } },
  { key: "trungbinh", make: (r) => {
    if (r.int(0, 1) === 0) {
      const a = 2 * r.int(3, 20), v = a / 2;
      return made(`Đường trung bình của tam giác song song với cạnh dài $${a}$ cm. Đường trung bình đó dài`, nums(v, [a, 2 * a, v + 1], unit("cm"), 1),
        ["Đường trung bình của tam giác song song với cạnh thứ ba.", "Nó dài bằng nửa cạnh đó.", `$${a}\\div 2=${v}$ cm.`], `Rational(${a},2)`, String(v));
    }
    const b = r.int(2, 15), a = b + 2 * r.int(1, 8), v = (a + b) / 2;
    return made(`Hình thang có hai đáy $${a}$ cm và $${b}$ cm. Đường trung bình dài`, nums(v, [a + b, a - b, (a - b) / 2], unit("cm"), 1),
      ["Đường trung bình của hình thang bằng nửa tổng hai đáy.", `$(${a}+${b})\\div 2$.`, `Đường trung bình dài $${v}$ cm.`], `Rational(${a}+${b},2)`, String(v));
  } },
  { key: "phanthuc", make: (r) => {
    const a = r.int(2, 9);
    let k = r.nz(-9, 15);
    if (k === a) k += 1;
    const v = k + a;
    return made(`Rút gọn rồi tính giá trị của $\\dfrac{x^2-${a * a}}{x-${a}}$ tại $x=${k}$.`, nums(v, [k - a, k * k - a * a, k * a]),
      [`$x^2-${a * a}=(x-${a})(x+${a})$.`, `Với $x\\ne ${a}$, phân thức bằng $x+${a}$.`, `Tại $x=${k}$: $${k}+${a}=${v}$.`], `((${k})**2-${a * a})/((${k})-${a})`, String(v));
  } },
];

/* ---------- lớp 9 ---------- */

function rootsPoly(p: number, q: number, a = 1): number[] {
  return [a, -a * (p + q), a * p * q];
}

const grade9: Template[] = [
  { key: "vietetong", make: (r) => {
    const p = r.nz(-9, 9);
    let q = r.nz(-9, 9);
    while (q === p) q = r.nz(-9, 9);
    const co = rootsPoly(p, q);
    return made(`Tổng hai nghiệm của phương trình $${poly(co)}=0$ là`, nums(p + q, [-(p + q), p * q, -(p * q)]),
      [`Phương trình có $a=1$, $b=${co[1]}$, $c=${co[2]}$ và có hai nghiệm phân biệt.`, "Theo Viète, tổng hai nghiệm bằng $-\\dfrac{b}{a}$.", `Tổng bằng $${p + q}$.`], `sum(solve(${polySym(co)}, x))`, String(p + q));
  } },
  { key: "vietetich", make: (r) => {
    const p = r.nz(-9, 9);
    let q = r.nz(-9, 9);
    while (q === p) q = r.nz(-9, 9);
    const co = rootsPoly(p, q);
    return made(`Tích hai nghiệm của phương trình $${poly(co)}=0$ là`, nums(p * q, [-(p * q), p + q, -(p + q)]),
      [`Phương trình có $a=1$, $c=${co[2]}$ và có hai nghiệm phân biệt.`, "Theo Viète, tích hai nghiệm bằng $\\dfrac{c}{a}$.", `Tích bằng $${p * q}$.`], `prod(solve(${polySym(co)}, x))`, String(p * q));
  } },
  { key: "he", make: (r) => {
    const x0 = r.int(-6, 6), y0 = r.int(-6, 6), a1 = r.nz(1, 3), b1 = r.nz(-3, 3), a2 = r.nz(-3, 3), b2 = r.nz(-3, 3);
    if (a1 * b2 - a2 * b1 === 0) return grade9[2]!.make(r);
    const c1 = a1 * x0 + b1 * y0, c2 = a2 * x0 + b2 * y0;
    return made(`Hệ $\\begin{cases}${lin([[a1, "x"], [b1, "y"]])}=${c1}\\\\${lin([[a2, "x"], [b2, "y"]])}=${c2}\\end{cases}$ có nghiệm $(x;y)$. Giá trị của $x$ là`,
      nums(x0, [y0, -x0, x0 + 1]),
      ["Khử một ẩn bằng cách nhân hệ số thích hợp rồi cộng hoặc trừ hai phương trình.", `Tìm được $x=${x0}$, thế vào được $y=${y0}$.`, `Thử lại: $${a1}\\cdot ${par(x0)}+${par(b1)}\\cdot ${par(y0)}=${c1}$ và $${a2}\\cdot ${par(x0)}+${par(b2)}\\cdot ${par(y0)}=${c2}$.`], `solve([${a1}*x+(${b1})*y-(${c1}), ${a2}*x+(${b2})*y-(${c2})], [x, y])[x]`, String(x0));
  } },
  { key: "can", make: (r) => {
    const a = r.int(2, 9), b = r.pick([2, 3, 5, 6, 7, 10]), N = a * a * b;
    return made(`Rút gọn $\\sqrt{${N}}$.`, { right: m(`${a}\\sqrt{${b}}`), wrong: [m(`${b}\\sqrt{${a}}`), m(`${a * a}\\sqrt{${b}}`), m(`${a + 1}\\sqrt{${b}}`), m(`${a}\\sqrt{${b + 1}}`)] },
      [`Tách $${N}=${a * a}\\cdot ${b}=${a}^2\\cdot ${b}$.`, `$\\sqrt{${a}^2\\cdot ${b}}=${a}\\sqrt{${b}}$.`, `Kết quả là $${a}\\sqrt{${b}}$.`], `sqrt(${N})`, `${a}*sqrt(${b})`);
  } },
  { key: "delta", make: (r) => {
    const a = r.nz(-3, 3), b = r.nz(-9, 9), c = r.nz(-9, 9), D = b * b - 4 * a * c;
    return made(`Biệt thức $\\Delta$ của phương trình $${poly([a, b, c])}=0$ bằng`, nums(D, [b * b + 4 * a * c, b * b - a * c, -D]),
      [`$a=${a}$, $b=${b}$, $c=${c}$.`, `$\\Delta=b^2-4ac=${b * b}-4\\cdot ${par(a)}\\cdot ${par(c)}$.`, `$\\Delta=${D}$.`], `(${b})**2-4*(${a})*(${c})`, String(D));
  } },
  { key: "nghiemlon", make: (r) => {
    const p = r.int(-8, 9);
    let q = r.int(-8, 9);
    if (q === p) q = p - 3;
    const a = r.pick([1, 1, 2]), co = rootsPoly(p, q, a), big = Math.max(p, q), small = Math.min(p, q);
    return made(`Nghiệm lớn hơn của phương trình $${poly(co)}=0$ là`, nums(big, [small, -big, p + q]),
      [`$\\Delta=${co[1]! * co[1]! - 4 * co[0]! * co[2]!}$, $\\sqrt\\Delta=${a * Math.abs(p - q)}$.`, `Hai nghiệm là $${big}$ và $${small}$.`, `Nghiệm lớn hơn là $${big}$.`], `Max(*solve(${polySym(co)}, x))`, String(big));
  } },
  { key: "goc30", make: (r) => {
    const c = 2 * r.int(2, 20), half = c / 2;
    return made(`Tam giác vuông có cạnh huyền $${c}$ cm và một góc nhọn $30^\\circ$. Cạnh đối diện góc $30^\\circ$ dài`, { right: `$${half}$ cm`, wrong: [`$${c}$ cm`, `$${half}\\sqrt{3}$ cm`, `$${2 * c}$ cm`] },
      ["Cạnh đối diện bằng cạnh huyền nhân $\\sin 30^\\circ$.", `$\\sin 30^\\circ=\\dfrac{1}{2}$, nên cạnh đó bằng $${c}\\cdot\\dfrac{1}{2}$.`, `Cạnh đối diện góc $30^\\circ$ dài $${half}$ cm.`], `${c}*sin(pi/6)`, String(half));
  } },
  { key: "tron", make: (r) => {
    const rad = r.int(2, 15), area = r.int(0, 1) === 1;
    const right = area ? `${rad * rad}\\pi` : `${2 * rad}\\pi`;
    const wrong = area ? [`${2 * rad}\\pi`, `${rad}\\pi`, `${4 * rad * rad}\\pi`, `${rad * rad + rad}\\pi`] : [`${rad * rad}\\pi`, `${rad}\\pi`, `${4 * rad}\\pi`, `${2 * rad + 1}\\pi`];
    return made(`Hình tròn bán kính $${rad}$ cm có ${area ? "diện tích" : "chu vi"} bằng`, { right: `$${right}$ ${area ? "cm²" : "cm"}`, wrong: wrong.map((w) => `$${w}$ ${area ? "cm²" : "cm"}`) },
      [area ? "Diện tích hình tròn $S=\\pi R^2$." : "Chu vi hình tròn $C=2\\pi R$.", area ? `$S=\\pi\\cdot ${rad}^2$.` : `$C=2\\pi\\cdot ${rad}$.`, `Kết quả là $${right}$ ${area ? "cm²" : "cm"}.`], area ? `pi*${rad}**2` : `2*pi*${rad}`, area ? `${rad * rad}*pi` : `${2 * rad}*pi`);
  } },
  { key: "noitiep", make: (r) => {
    const a = r.int(15, 85), central = 2 * a;
    return made(`Góc ở tâm chắn cung $AB$ bằng $${central}^\\circ$. Góc nội tiếp chắn cung $AB$ đó bằng`, nums(a, [central, 2 * central, 180 - central], (v) => `$${v}^\\circ$`, 1),
      ["Góc nội tiếp bằng nửa góc ở tâm cùng chắn một cung.", `$${central}^\\circ\\div 2=${a}^\\circ$.`, `Góc nội tiếp bằng $${a}^\\circ$.`], `Rational(${central},2)`, String(a));
  } },
  { key: "parabol", make: (r) => {
    const a = r.nz(-3, 3), k = r.nz(-5, 5), v = a * k * k;
    return made(`Cho hàm số $y=${poly([a, 0, 0])}$. Khi $x=${k}$ thì $y$ bằng`, nums(v, [-v, 2 * a * k, (a * k) ** 2 === v ? v + a : (a * k) ** 2]),
      [`Thay $x=${k}$: $y=${a}\\cdot ${par(k)}^2$.`, `$${par(k)}^2=${k * k}$ luôn không âm.`, `$y=${a}\\cdot ${k * k}=${v}$.`], `${a}*(${k})**2`, String(v));
  } },
];

/* ---------- lớp 10 ---------- */

const cos60: [number, number, number][] = [[3, 8, 7], [5, 8, 7], [7, 15, 13], [8, 15, 13], [5, 21, 19], [16, 21, 19], [7, 40, 37], [33, 40, 37], [11, 35, 31], [24, 35, 31]];
const triples: [number, number, number][] = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [20, 21, 29]];

function factorial(n: number): number { return n <= 1 ? 1 : n * factorial(n - 1); }
function choose(n: number, k: number): number { return factorial(n) / (factorial(k) * factorial(n - k)); }

const grade10: Template[] = [
  { key: "dinh", make: (r) => {
    const a = r.pick([1, 2, -1, -2, 3]), h = r.nz(-5, 5), b = -2 * a * h, c = r.int(-9, 9);
    return made(`Hoành độ đỉnh của parabol $y=${poly([a, b, c])}$ là`, nums(h, [-h, b, 2 * h]),
      ["Hoành độ đỉnh là $x=-\\dfrac{b}{2a}$.", `$x=-\\dfrac{${b}}{2\\cdot ${par(a)}}$.`, `$x=${h}$.`], `solve(diff(${polySym([a, b, c])}, x), x)[0]`, String(h));
  } },
  { key: "gtnn", make: (r) => {
    const h = r.nz(-6, 6), b = -2 * h, c = r.int(-10, 15), v = c - h * h;
    return made(`Giá trị nhỏ nhất của hàm số $y=${poly([1, b, c])}$ là`, nums(v, [c, c + h * h, h]),
      [`Viết $y=(x${sgn(-h)})^2${sgn(v)}$.`, `$(x${sgn(-h)})^2\\ge 0$, bằng $0$ khi $x=${h}$.`, `Giá trị nhỏ nhất là $${v}$.`], `${polySym([1, b, c])}.subs(x, ${h})`, String(v));
  } },
  { key: "cosin", make: (r) => {
    const [p, q, a] = r.pick(cos60), [b, c] = r.int(0, 1) ? [p, q] : [q, p];
    return made(`Tam giác $ABC$ có $AB=${c}$, $AC=${b}$, $\\hat A=60^\\circ$. Độ dài $BC$ bằng`, nums(a, [a + 1, a - 1, b + c - a], m, 1),
      ["Định lí côsin: $BC^2=AB^2+AC^2-2\\cdot AB\\cdot AC\\cos A$.", `$BC^2=${c * c}+${b * b}-2\\cdot ${c}\\cdot ${b}\\cdot\\dfrac{1}{2}=${a * a}$.`, `$BC=${a}$.`], `sqrt(${b}**2+${c}**2-2*${b}*${c}*cos(pi/3))`, String(a));
  } },
  { key: "dodai", make: (r) => {
    const [p, q, l] = r.pick(triples), sx = r.pick([1, -1]), sy = r.pick([1, -1]), [u1, u2] = r.int(0, 1) ? [sx * p, sy * q] : [sx * q, sy * p];
    return made(`Cho $\\vec u=(${u1};${u2})$. Độ dài $|\\vec u|$ bằng`, nums(l, [Math.abs(u1) + Math.abs(u2), l * l, Math.abs(u1 + u2)], m, 1),
      ["$|\\vec u|=\\sqrt{x^2+y^2}$.", `$\\sqrt{${u1 * u1}+${u2 * u2}}=\\sqrt{${l * l}}$.`, `$|\\vec u|=${l}$.`], `sqrt((${u1})**2+(${u2})**2)`, String(l));
  } },
  { key: "khoangcach", make: (r) => {
    const [p, q, l] = r.pick(triples), x1 = r.int(-5, 5), y1 = r.int(-5, 5), dx = r.pick([1, -1]) * p, dy = r.pick([1, -1]) * q;
    const x2 = x1 + dx, y2 = y1 + dy;
    return made(`Trong mặt phẳng $Oxy$, cho $A(${x1};${y1})$ và $B(${x2};${y2})$. Độ dài $AB$ bằng`, nums(l, [p + q, l * l, l + 1], m, 1),
      [`$\\overrightarrow{AB}=(${dx};${dy})$.`, `$AB=\\sqrt{${dx * dx}+${dy * dy}}=\\sqrt{${l * l}}$.`, `$AB=${l}$.`], `sqrt((${x2}-(${x1}))**2+(${y2}-(${y1}))**2)`, String(l));
  } },
  { key: "chinhhop", make: (r) => {
    const n = r.int(4, 10), k = r.int(2, 3), v = factorial(n) / factorial(n - k);
    return made(`Có bao nhiêu cách chọn $${k}$ bạn từ $${n}$ bạn rồi xếp vào $${k}$ vị trí khác nhau?`, nums(v, [choose(n, k), n ** k, n * k], m, 1),
      ["Chọn có thứ tự nên dùng chỉnh hợp.", `$A_{${n}}^{${k}}=\\dfrac{${n}!}{${n - k}!}$.`, `$A_{${n}}^{${k}}=${v}$.`], `factorial(${n})/factorial(${n - k})`, String(v));
  } },
  { key: "tohop", make: (r) => {
    const n = r.int(5, 12), k = r.int(2, 4), v = choose(n, k);
    return made(`Có bao nhiêu cách chọn $${k}$ học sinh từ một nhóm $${n}$ học sinh?`, nums(v, [factorial(n) / factorial(n - k), n * k, v + n], m, 1),
      ["Chỉ chọn, không xếp thứ tự, nên dùng tổ hợp.", `$C_{${n}}^{${k}}=\\dfrac{${n}!}{${k}!\\,${n - k}!}$.`, `$C_{${n}}^{${k}}=${v}$.`], `binomial(${n},${k})`, String(v));
  } },
  { key: "bankinh", make: (r) => {
    const a = r.int(-5, 5), b = r.int(-5, 5), R = r.int(2, 9), c = a * a + b * b - R * R;
    if (a === 0 && b === 0) return grade10[7]!.make(r);
    return made(`Đường tròn $x^2+y^2${lin([[-2 * a, "x"], [-2 * b, "y"], [c, ""]]).replace(/^(?=[^-])/, "+")}=0$ có bán kính bằng`, nums(R, [R * R, Math.abs(a) + Math.abs(b), R + 1], m, 1),
      [`Tâm $I(${a};${b})$ vì hệ số của $x$ và $y$ là $-2a$ và $-2b$.`, `$R^2=a^2+b^2-c=${a * a}+${b * b}-${par(c)}=${R * R}$.`, `$R=${R}$.`], `sqrt((${a})**2+(${b})**2-(${c}))`, String(R));
  } },
  { key: "vohuong", make: (r) => {
    const a = r.nz(-6, 6), b = r.nz(-6, 6), c = r.nz(-6, 6), d = r.nz(-6, 6), v = a * c + b * d;
    return made(`Cho $\\vec u=(${a};${b})$ và $\\vec v=(${c};${d})$. Tích vô hướng $\\vec u\\cdot\\vec v$ bằng`, nums(v, [a * c - b * d, a * d + b * c, a + b + c + d]),
      ["$\\vec u\\cdot\\vec v=x_1x_2+y_1y_2$.", `$${par(a)}\\cdot ${par(c)}+${par(b)}\\cdot ${par(d)}=${a * c}${sgn(b * d)}$.`, `Tích vô hướng bằng $${v}$.`], `(${a})*(${c})+(${b})*(${d})`, String(v));
  } },
  { key: "trungbinh", make: (r) => {
    const mean = r.int(4, 20), offs = [r.int(-4, 4), r.int(-4, 4), r.int(-4, 4), r.int(-4, 4)];
    const data = [...offs.map((o) => mean + o), mean - offs.reduce((s, o) => s + o, 0)];
    if (data.some((v) => v <= 0)) return grade10[9]!.make(r);
    const sorted = [...data].sort((p, q) => p - q), sum = data.reduce((s, v) => s + v, 0);
    return made(`Số trung bình của mẫu số liệu $${data.join(";\\ ")}$ là`, nums(mean, [sorted[2]!, Math.round(sum / 4), mean + 1], m, 0),
      [`Tổng các giá trị: $${sum}$.`, "Mẫu có $5$ giá trị.", `Số trung bình $\\bar x=\\dfrac{${sum}}{5}=${mean}$.`], `(${data.join("+")})/5`, String(mean));
  } },
];

/* ---------- lớp 11 ---------- */

const grade11: Template[] = [
  { key: "cscun", make: (r) => {
    const u1 = r.int(-10, 15), d = r.nz(-5, 6), n = r.int(5, 30), v = u1 + (n - 1) * d;
    return made(`Cấp số cộng có $u_1=${u1}$ và công sai $d=${d}$. Số hạng $u_{${n}}$ bằng`, nums(v, [u1 + n * d, u1 + (n - 2) * d, n * d]),
      ["$u_n=u_1+(n-1)d$.", `$u_{${n}}=${u1}+${n - 1}\\cdot ${par(d)}$.`, `$u_{${n}}=${v}$.`], `${u1}+(${n}-1)*(${d})`, String(v));
  } },
  { key: "cscsn", make: (r) => {
    const u1 = r.int(-5, 10), d = r.nz(-3, 5), n = r.int(5, 20), un = u1 + (n - 1) * d, v = (n * (u1 + un)) / 2;
    return made(`Tổng $${n}$ số hạng đầu của cấp số cộng có $u_1=${u1}$, $d=${d}$ là`, nums(v, [n * un, n * u1 + n * n * d, v + un]),
      [`$u_{${n}}=${u1}+${n - 1}\\cdot ${par(d)}=${un}$.`, `$S_{${n}}=\\dfrac{${n}(u_1+u_{${n}})}{2}=\\dfrac{${n}\\cdot ${par(u1 + un)}}{2}$.`, `$S_{${n}}=${v}$.`], Array.from({ length: n }, (_, k) => `(${u1 + k * d})`).join("+"), String(v));
  } },
  { key: "csnun", make: (r) => {
    const u1 = r.nz(-5, 5), q = r.pick([2, 3, -2, -3]), n = r.int(3, q === 3 || q === -3 ? 6 : 8), v = u1 * q ** (n - 1);
    return made(`Cấp số nhân có $u_1=${u1}$ và công bội $q=${q}$. Số hạng $u_{${n}}$ bằng`, nums(v, [u1 * q ** n, -v, u1 * q * (n - 1)]),
      ["$u_n=u_1\\cdot q^{n-1}$.", `$u_{${n}}=${u1}\\cdot ${par(q)}^{${n - 1}}=${u1}\\cdot ${par(q ** (n - 1))}$.`, `$u_{${n}}=${v}$.`], `${u1}*(${q})**(${n}-1)`, String(v));
  } },
  { key: "log", make: (r) => {
    const a = r.pick([2, 3, 5, 10]), k = r.int(a === 2 ? 2 : 1, a === 2 ? 8 : a === 3 ? 5 : 4), N = a ** k;
    return made(`Giá trị của $\\log_{${a}} ${N}$ là`, nums(k, [N / a, k + 1, a * k], m, 0),
      [`Viết $${N}=${a}^{${k}}$.`, `$\\log_{${a}} ${a}^{${k}}=${k}$ vì $\\log_a a^k=k$.`, `Kết quả là $${k}$.`], `log(${N}, ${a})`, String(k));
  } },
  { key: "mu", make: (r) => {
    const a = r.pick([2, 3, 5]), mm = r.int(2, 7), n = r.int(2, 7), p = r.int(1, mm + n - 1), e = mm + n - p;
    return made(`Rút gọn $${a}^{${mm}}\\cdot ${a}^{${n}}:${a}^{${p}}$.`, { right: m(`${a}^{${e}}`), wrong: [m(`${a}^{${mm * n - p}}`), m(`${a}^{${mm + n + p}}`), m(`${a * a}^{${e}}`), m(`${a}^{${e + 1}}`)] },
      ["Nhân hai lũy thừa cùng cơ số thì cộng số mũ, chia thì trừ số mũ.", `Số mũ: $${mm}+${n}-${p}=${e}$.`, `Kết quả là $${a}^{${e}}$.`], `${a}**${mm}*${a}**${n}/${a}**${p}`, `${a}**${e}`);
  } },
  { key: "daoham", make: (r) => {
    const co = [r.nz(-3, 3), r.int(-5, 5), r.int(-6, 6), r.int(-9, 9)], k = r.int(-3, 3);
    const v = 3 * co[0]! * k * k + 2 * co[1]! * k + co[2]!;
    return made(`Cho $f(x)=${poly(co)}$. Giá trị $f'(${k})$ là`, nums(v, [polyAt(co, k), 3 * co[0]! * k * k + co[1]! * k + co[2]!, v + co[3]! === v ? v + 3 : v + co[3]!]),
      [`$f'(x)=${poly([3 * co[0]!, 2 * co[1]!, co[2]!])}$.`, `Thay $x=${k}$ vào $f'(x)$.`, `$f'(${k})=${v}$.`], `diff(${polySym(co)}, x).subs(x, ${k})`, String(v));
  } },
  { key: "limvc", make: (r) => {
    const a = r.nz(-6, 6), b = r.int(-5, 5), c = r.nz(-9, 9), d = r.nz(1, 5), e = r.int(-5, 5), f = r.nz(-9, 9);
    const res = F(a, d), num = poly([a, b, c]), den = poly([d, e, f]);
    return made(`Tính $\\lim\\limits_{x\\to+\\infty}\\dfrac{${num}}{${den}}$.`, fracs(res, [F(c, f), F(0), res.mul(F(-1))].filter((v) => v.n !== res.n || v.d !== res.d)),
      ["Chia cả tử và mẫu cho $x^2$, bậc cao nhất của mẫu.", "Các hạng tử còn chứa $\\dfrac{1}{x}$ hoặc $\\dfrac{1}{x^2}$ dần về $0$.", `Giới hạn bằng tỉ số hai hệ số của $x^2$: $${reduceTex(a, d, res)}$.`], `limit(${polySym([a, b, c])}/${polySym([d, e, f])}, x, oo)`, res.sym());
  } },
  { key: "lim00", make: (r) => {
    const a = r.nz(-6, 6);
    let b = r.nz(-6, 6);
    while (b === a) b = r.nz(-6, 6);
    const co = [1, -(a + b), a * b], v = a - b;
    return made(`Tính $\\lim\\limits_{x\\to ${a}}\\dfrac{${poly(co)}}{x${sgn(-a)}}$.`, nums(v, [0, a + b, b - a]),
      ["Thay $x=" + a + "$ thì cả tử và mẫu bằng $0$, cần rút gọn.", `$${poly(co)}=(x${sgn(-a)})(x${sgn(-b)})$, nên biểu thức bằng $x${sgn(-b)}$.`, `Giới hạn bằng $${a}${sgn(-b)}=${v}$.`], `limit(${polySym(co)}/(x-(${a})), x, ${a})`, String(v));
  } },
  { key: "xsdoclap", make: (r) => {
    const p1 = r.int(1, 9), p2 = r.int(1, 9), A = F(p1, 10), B = F(p2, 10), union = r.int(0, 1) === 1;
    const res = union ? A.add(B).sub(A.mul(B)) : A.mul(B);
    const ask = union ? "$P(A\\cup B)$" : "$P(A\\cap B)$";
    return made(`Hai biến cố $A$, $B$ độc lập với $P(A)=${dec(p1, 1)}$ và $P(B)=${dec(p2, 1)}$. Xác suất ${ask} bằng`, fracs(res, union ? [A.add(B), A.mul(B), F(1).sub(A.mul(B))] : [A.add(B), A.add(B).sub(A.mul(B)), F(1).sub(A).mul(F(1).sub(B))]),
      ["$A$, $B$ độc lập nên $P(A\\cap B)=P(A)\\cdot P(B)$.", union ? `$P(A\\cup B)=P(A)+P(B)-P(A)P(B)=${dec(p1, 1)}+${dec(p2, 1)}-${dec(p1 * p2, 2)}$.` : `$P(A\\cap B)=${dec(p1, 1)}\\cdot ${dec(p2, 1)}=${dec(p1 * p2, 2)}$.`, `Kết quả là $${res.tex()}$.`],
      union ? `Rational(${p1},10)+Rational(${p2},10)-Rational(${p1},10)*Rational(${p2},10)` : `Rational(${p1},10)*Rational(${p2},10)`, res.sym());
  } },
  { key: "luivc", make: (r) => {
    const u1 = r.nz(-9, 12), k = r.int(2, 6), q = F(r.pick([1, -1]), k), res = F(u1).div(F(1).sub(q));
    return made(`Tổng của cấp số nhân lùi vô hạn có $u_1=${u1}$ và $q=${q.tex()}$ là`, fracs(res, [F(u1).div(F(1).add(q)), F(u1).mul(F(1).sub(q)), F(u1)]),
      ["Công bội có $|q|<1$ nên tổng $S=\\dfrac{u_1}{1-q}$.", `$1-q=${F(1).sub(q).tex()}$.`, `$S=\\dfrac{${u1}}{${F(1).sub(q).tex()}}=${res.tex()}$.`], `${u1}/(1-(${q.sym()}))`, res.sym());
  } },
];

/* ---------- lớp 12 ---------- */

const quads: [number, number, number, number][] = [[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [4, 4, 7, 9], [2, 6, 9, 11], [6, 6, 7, 11], [3, 4, 12, 13], [2, 10, 11, 15], [1, 12, 12, 17], [8, 9, 12, 17]];

function signedQuad(r: Rand): [number, number, number, number] {
  const [p, q, s, l] = r.pick(quads);
  const order = r.pick([[p, q, s], [q, s, p], [s, p, q], [p, s, q], [q, p, s], [s, q, p]] as const);
  return [order[0] * r.pick([1, -1]), order[1] * r.pick([1, -1]), order[2] * r.pick([1, -1]), l];
}

const grade12: Template[] = [
  { key: "cucdai", make: (r) => {
    const k = r.int(1, 5), c = r.int(-9, 9), max = r.int(0, 1) === 1, co = [1, 0, -3 * k * k, c], v = max ? -k : k;
    return made(`Hàm số $y=${poly(co)}$ đạt cực ${max ? "đại" : "tiểu"} tại $x$ bằng`, nums(v, [-v, 0, 3 * k * k]),
      [`$y'=3x^2-${3 * k * k}=3(x-${k})(x+${k})$.`, `$y'$ đổi dấu từ dương sang âm tại $x=-${k}$ và từ âm sang dương tại $x=${k}$.`, `Cực ${max ? "đại" : "tiểu"} tại $x=${v}$.`], `${max ? "Min" : "Max"}(*solve(diff(${polySym(co)}, x), x))`, String(v));
  } },
  { key: "tcngang", make: (r) => {
    const a = r.nz(-6, 6), b = r.int(-9, 9), c = r.nz(-4, 4);
    let d = r.int(-9, 9);
    if (a * d - b * c === 0) d += 1;
    const res = F(a, c);
    return made(`Tiệm cận ngang của đồ thị $y=\\dfrac{${lin([[a, "x"], [b, ""]])}}{${lin([[c, "x"], [d, ""]])}}$ là $y$ bằng`, fracs(res, [F(-d, c), F(b, d === 0 ? 1 : d), F(c, a)].filter((v) => v.n !== res.n || v.d !== res.d)),
      ["Khi $x\\to\\pm\\infty$, tử và mẫu cùng bậc một.", `Giới hạn bằng tỉ số hệ số của $x$: $\\dfrac{${a}}{${c}}$.`, `Tiệm cận ngang $y=${res.tex()}$.`], `limit((${a}*x+(${b}))/(${c}*x+(${d})), x, oo)`, res.sym());
  } },
  { key: "tcdung", make: (r) => {
    const a = r.nz(-6, 6), b = r.int(-9, 9), c = r.nz(-4, 4);
    let d = r.nz(-9, 9);
    if (a * d - b * c === 0) d = d === 9 ? 8 : d + 1;
    if (d === 0) d = 1;
    const res = F(-d, c);
    return made(`Tiệm cận đứng của đồ thị $y=\\dfrac{${lin([[a, "x"], [b, ""]])}}{${lin([[c, "x"], [d, ""]])}}$ là $x$ bằng`, fracs(res, [F(d, c), F(a, c), F(-b, a)].filter((v) => v.n !== res.n || v.d !== res.d)),
      ["Tiệm cận đứng tại nghiệm của mẫu mà tử khác $0$.", `$${lin([[c, "x"], [d, ""]])}=0\\iff x=${res.tex()}$.`, `Tiệm cận đứng $x=${res.tex()}$.`], `solve(${c}*x+(${d}), x)[0]`, res.sym());
  } },
  { key: "tp1", make: (r) => {
    const a = r.nz(-6, 6), b = r.int(-6, 6), k = r.int(1, 5), res = F(a * k * k, 2).add(F(b * k));
    return made(`Tính $\\displaystyle\\int_0^{${k}}(${lin([[a, "x"], [b, ""]])})\\,dx$.`, fracs(res, [F(a * k * k + b * k), F(a * k + b), F(a * k * k, 2)].filter((v) => v.n !== res.n || v.d !== res.d)),
      [`Nguyên hàm là $${coefTex(F(a, 2), "x^2")}${b ? sgn(b) + "x" : ""}$.`, `Thay cận: giá trị tại $${k}$ trừ giá trị tại $0$.`, `Kết quả là $${res.tex()}$.`], `integrate(${a}*x+(${b}), (x, 0, ${k}))`, res.sym());
  } },
  { key: "tp2", make: (r) => {
    const c = r.int(-4, 4), k = r.int(2, 4), v = k ** 3 - 1 + c * (k * k - 1);
    return made(`Tính $\\displaystyle\\int_1^{${k}}(${lin([[3, "x^2"], [2 * c, "x"]])})\\,dx$.`, nums(v, [k ** 3 + c * k * k, 3 * (k ** 3 - 1) + 2 * c * (k * k - 1), v + 1]),
      [`Nguyên hàm là $${lin([[1, "x^3"], [c, "x^2"]])}$.`, `Tại $${k}$: $${k ** 3 + c * k * k}$; tại $1$: $${1 + c}$.`, `Kết quả là $${k ** 3 + c * k * k}-${par(1 + c)}=${v}$.`], `integrate(3*x**2+2*(${c})*x, (x, 1, ${k}))`, String(v));
  } },
  { key: "dientich", make: (r) => {
    if (r.int(0, 1) === 1) {
      const k = r.int(1, 6), res = F(4 * k ** 3, 3);
      return made(`Diện tích hình phẳng giới hạn bởi $y=x^2$ và $y=${k * k}$ bằng`, fracs(res, [F(2 * k ** 3, 3), F(2 * k ** 3), F(k ** 3, 3)].filter((v) => v.n !== res.n || v.d !== res.d)),
        [`Hoành độ giao điểm: $x^2=${k * k}\\iff x=\\pm ${k}$.`, `Trên $[-${k};${k}]$ có $${k * k}\\ge x^2$, nên $S=\\displaystyle\\int_{-${k}}^{${k}}(${k * k}-x^2)\\,dx$.`, `$S=2\\left(${k ** 3}-\\dfrac{${k ** 3}}{3}\\right)=${res.tex()}$.`], `integrate(${k * k}-x**2, (x, -${k}, ${k}))`, res.sym());
    }
    const k = r.int(1, 9), res = F(k ** 3, 6);
    return made(`Diện tích hình phẳng giới hạn bởi $y=x^2$ và $y=${k === 1 ? "" : k}x$ bằng`, fracs(res, [F(k ** 3, 3), F(k * k, 2), F(k ** 3, 2)].filter((v) => v.n !== res.n || v.d !== res.d)),
      [`Hoành độ giao điểm: $x^2=${k === 1 ? "" : k}x\\iff x=0$ hoặc $x=${k}$.`, `Trên $[0;${k}]$ có $${k === 1 ? "" : k}x\\ge x^2$, nên $S=\\displaystyle\\int_0^{${k}}(${k === 1 ? "" : k}x-x^2)\\,dx$.`, `$S=\\dfrac{${k ** 3}}{2}-\\dfrac{${k ** 3}}{3}=${res.tex()}$.`], `integrate(${k}*x-x**2, (x, 0, ${k}))`, res.sym());
  } },
  { key: "kc3d", make: (r) => {
    const [dx, dy, dz, l] = signedQuad(r), A = [r.int(-4, 4), r.int(-4, 4), r.int(-4, 4)] as const, B = [A[0] + dx, A[1] + dy, A[2] + dz];
    return made(`Trong không gian $Oxyz$, cho $A(${A.join(";")})$ và $B(${B.join(";")})$. Độ dài $AB$ bằng`, nums(l, [l * l, Math.abs(dx) + Math.abs(dy) + Math.abs(dz), l + 1], m, 1),
      [`$\\overrightarrow{AB}=(${dx};${dy};${dz})$.`, `$AB=\\sqrt{${dx * dx}+${dy * dy}+${dz * dz}}=\\sqrt{${l * l}}$.`, `$AB=${l}$.`], `sqrt((${dx})**2+(${dy})**2+(${dz})**2)`, String(l));
  } },
  { key: "kcmp", make: (r) => {
    const [a, b, c, l] = signedQuad(r), d = r.int(-12, 12), M = [r.int(-4, 4), r.int(-4, 4), r.int(-4, 4)] as const;
    const top = a * M[0] + b * M[1] + c * M[2] + d;
    if (top === 0) return grade12[7]!.make(r);
    const res = F(Math.abs(top), l);
    return made(`Khoảng cách từ $M(${M.join(";")})$ đến mặt phẳng $(P): ${lin([[a, "x"], [b, "y"], [c, "z"], [d, ""]])}=0$ bằng`, fracs(res, [F(Math.abs(top), l * l), F(Math.abs(top)), F(Math.abs(top - d) || 1, l)].filter((v) => v.n !== res.n || v.d !== res.d)),
      ["$d=\\dfrac{|ax_0+by_0+cz_0+d|}{\\sqrt{a^2+b^2+c^2}}$.", `Tử: $|${top}|=${Math.abs(top)}$; mẫu: $\\sqrt{${a * a}+${b * b}+${c * c}}=${l}$.`, `Khoảng cách bằng $${res.tex()}$.`], `Abs(${a}*(${M[0]})+(${b})*(${M[1]})+(${c})*(${M[2]})+(${d}))/sqrt(${a * a}+${b * b}+${c * c})`, res.sym());
  } },
  { key: "matcau", make: (r) => {
    const a = r.int(-4, 4), b = r.int(-4, 4), c = r.int(-4, 4), R = r.int(2, 8), d = a * a + b * b + c * c - R * R;
    if (a === 0 && b === 0 && c === 0) return grade12[8]!.make(r);
    return made(`Mặt cầu $x^2+y^2+z^2${lin([[-2 * a, "x"], [-2 * b, "y"], [-2 * c, "z"], [d, ""]]).replace(/^(?=[^-])/, "+")}=0$ có bán kính bằng`, nums(R, [R * R, Math.abs(a) + Math.abs(b) + Math.abs(c), R + 1], m, 1),
      [`Tâm $I(${a};${b};${c})$.`, `$R^2=${a * a}+${b * b}+${c * c}-${par(d)}=${R * R}$.`, `$R=${R}$.`], `sqrt((${a})**2+(${b})**2+(${c})**2-(${d}))`, String(R));
  } },
  { key: "dieukien", make: (r) => {
    const pb = r.int(2, 9), pab = r.int(1, pb - 1), res = F(pab, pb);
    return made(`Cho $P(B)=${dec(pb, 1)}$ và $P(A\\cap B)=${dec(pab, 1)}$. Xác suất $P(A\\mid B)$ bằng`, fracs(res, [F(pab, 10), F(pab * pb, 100), F(pb - pab, pb)].filter((v) => v.n !== res.n || v.d !== res.d)),
      ["$P(A\\mid B)=\\dfrac{P(A\\cap B)}{P(B)}$.", `$\\dfrac{${dec(pab, 1)}}{${dec(pb, 1)}}=\\dfrac{${pab}}{${pb}}$.`, `Kết quả là $${res.tex()}$.`], `Rational(${pab},10)/Rational(${pb},10)`, res.sym());
  } },
];

/* ---------- THPT: phủ thêm chương trình lớp 10–12 ---------- */

const xPow = (k: number) => (k === 1 ? "x" : `x^${k}`);

const trigTable: Record<string, Record<number, [string, string]>> = {
  sin: { 30: ["\\dfrac{1}{2}", "Rational(1,2)"], 45: ["\\dfrac{\\sqrt{2}}{2}", "sqrt(2)/2"], 60: ["\\dfrac{\\sqrt{3}}{2}", "sqrt(3)/2"], 120: ["\\dfrac{\\sqrt{3}}{2}", "sqrt(3)/2"], 135: ["\\dfrac{\\sqrt{2}}{2}", "sqrt(2)/2"], 150: ["\\dfrac{1}{2}", "Rational(1,2)"] },
  cos: { 30: ["\\dfrac{\\sqrt{3}}{2}", "sqrt(3)/2"], 45: ["\\dfrac{\\sqrt{2}}{2}", "sqrt(2)/2"], 60: ["\\dfrac{1}{2}", "Rational(1,2)"], 120: ["-\\dfrac{1}{2}", "-Rational(1,2)"], 135: ["-\\dfrac{\\sqrt{2}}{2}", "-sqrt(2)/2"], 150: ["-\\dfrac{\\sqrt{3}}{2}", "-sqrt(3)/2"] },
  tan: { 30: ["\\dfrac{\\sqrt{3}}{3}", "sqrt(3)/3"], 45: ["1", "1"], 60: ["\\sqrt{3}", "sqrt(3)"], 120: ["-\\sqrt{3}", "-sqrt(3)"], 135: ["-1", "-1"], 150: ["-\\dfrac{\\sqrt{3}}{3}", "-sqrt(3)/3"] },
};
const trigValues = ["\\dfrac{1}{2}", "-\\dfrac{1}{2}", "\\dfrac{\\sqrt{2}}{2}", "-\\dfrac{\\sqrt{2}}{2}", "\\dfrac{\\sqrt{3}}{2}", "-\\dfrac{\\sqrt{3}}{2}", "\\dfrac{\\sqrt{3}}{3}", "-\\dfrac{\\sqrt{3}}{3}", "\\sqrt{3}", "-\\sqrt{3}", "1", "-1"];
const flipSign = (tex: string) => (tex.startsWith("-") ? tex.slice(1) : `-${tex}`);

const grade10More: Template[] = [
  { key: "taphop", make: (r) => {
    const both = r.int(2, 12), a = r.int(3, 20) + both, b = r.int(3, 20) + both, v = a + b - both;
    const [s1, s2] = r.pick([["môn Toán", "môn Văn"], ["bóng đá", "cầu lông"], ["vẽ", "hát"], ["tiếng Anh", "tin học"]] as const);
    return made(`Lớp có $${a}$ bạn thích ${s1}, $${b}$ bạn thích ${s2}, trong đó $${both}$ bạn thích cả hai. Mỗi bạn thích ít nhất một trong hai. Lớp có bao nhiêu bạn?`,
      nums(v, [a + b, v - both, a + b + both], m, 1),
      [`Gọi $A$, $B$ là tập các bạn thích ${s1} và ${s2}; cả lớp là $A\\cup B$.`, `$|A\\cup B|=|A|+|B|-|A\\cap B|=${a}+${b}-${both}$.`, `Lớp có $${v}$ bạn. Cộng thẳng $${a}+${b}$ thì đếm trùng $${both}$ bạn.`], `${a}+${b}-${both}`, String(v));
  } },
  { key: "bpt", make: (r) => {
    const a = r.nz(-4, 4), b = r.nz(-4, 4), c = r.int(-8, 8);
    const value = (p: [number, number]) => a * p[0] + b * p[1];
    let good: [number, number] | null = null;
    const bad: [number, number][] = [];
    for (let guard = 0; guard < 200 && (!good || bad.length < 3); guard += 1) {
      const p: [number, number] = [r.int(-4, 4), r.int(-4, 4)];
      if (value(p) < c) { if (!good) good = p; } else if (!bad.some((q) => q[0] === p[0] && q[1] === p[1])) bad.push(p);
    }
    if (!good || bad.length < 3) return grade10More[1]!.make(r);
    const pt = (p: [number, number]) => `$(${p[0]};${p[1]})$`;
    return made(`Điểm nào sau đây thuộc miền nghiệm của bất phương trình bậc nhất hai ẩn $${lin([[a, "x"], [b, "y"]])}<${c}$?`, { right: pt(good), wrong: bad.slice(0, 3).map(pt) },
      ["Thay tọa độ từng điểm vào vế trái rồi so sánh với vế phải.", `Tại $(${good[0]};${good[1]})$: $${a}\\cdot ${par(good[0])}+${par(b)}\\cdot ${par(good[1])}=${value(good)}<${c}$, thỏa mãn.`, `Ba điểm còn lại cho vế trái không nhỏ hơn $${c}$ nên không thuộc miền nghiệm.`],
      `(1 if ${a}*(${good[0]})+(${b})*(${good[1]}) < ${c} else 0)`, "1");
  } },
  { key: "luonggiac", make: (r) => {
    const fn = r.pick(["sin", "cos", "tan"] as const), deg = r.pick([30, 45, 60, 120, 135, 150]);
    const [val, sym] = trigTable[fn]![deg]!;
    const others = trigValues.filter((v) => v !== val && v !== flipSign(val));
    const wrong = [flipSign(val)];
    while (wrong.length < 4) {
      const pick = r.pick(others);
      if (!wrong.includes(pick)) wrong.push(pick);
    }
    const name = fn === "sin" ? "sin" : fn === "cos" ? "côsin" : "tang";
    return made(`Giá trị của $\\${fn} ${deg}^\\circ$ là`, { right: m(val), wrong: wrong.map(m) },
      [deg > 90 ? `Dùng góc bù: $${deg}^\\circ=180^\\circ-${180 - deg}^\\circ$.` : `$${deg}^\\circ$ là góc đặc biệt.`,
        deg > 90 ? (fn === "sin" ? "Hai góc bù nhau có sin bằng nhau." : `Hai góc bù nhau có ${name} đối nhau.`) : "Dùng bảng giá trị lượng giác của các góc đặc biệt.",
        `$\\${fn} ${deg}^\\circ=${val}$.`], `${fn}(pi*${deg}/180)`, sym);
  } },
  { key: "phuongsai", make: (r) => {
    const mean = r.int(5, 20), a = r.int(1, 4), b = r.int(0, 4);
    const base = [mean - a, mean + a, mean - b, mean + b, mean], shift = r.int(0, 4);
    const data = [...base.slice(shift), ...base.slice(0, shift)];
    const ss = 2 * a * a + 2 * b * b, res = F(ss, 5);
    return made(`Phương sai của mẫu số liệu $${data.join(";\\ ")}$ là`, fracs(res, [F(ss, 4), F(ss), F(2 * a + 2 * b, 5)]),
      [`Số trung bình $\\bar x=\\dfrac{${data.reduce((s, v) => s + v, 0)}}{5}=${mean}$.`, `Tổng bình phương độ lệch: $${data.map((v) => `${par(v - mean)}^2`).join("+")}=${ss}$.`, `Phương sai $s^2=\\dfrac{${ss}}{5}${res.d === 5 ? "" : `=${res.tex()}`}$.`],
      `(${data.map((v) => `(${v}-Rational(${data.reduce((s, x) => s + x, 0)},5))**2`).join("+")})/5`, res.sym());
  } },
  { key: "nhithuc", make: (r) => {
    const n = r.int(4, 6), a = r.pick([1, 2, 3, -1, -2]), k = r.int(1, n - 1), c = choose(n, k), v = c * a ** (n - k);
    return made(`Hệ số của $${xPow(k)}$ trong khai triển $(x${sgn(a)})^${n}$ là`, nums(v, [c, -v, c * a ** k]),
      [`Theo nhị thức Newton, số hạng chứa $x^i$ là $C_{${n}}^{i}x^{i}\\cdot ${par(a)}^{${n}-i}$.`, `Lấy $i=${k}$: $C_{${n}}^{${k}}\\cdot ${par(a)}^{${n - k}}=${c}\\cdot ${par(a ** (n - k))}$.`, `Hệ số bằng $${v}$.`],
      `expand((x+(${a}))**${n}).coeff(x, ${k})`, String(v));
  } },
];

const grade11More: Template[] = [
  { key: "ptlg", make: (r) => {
    const n = r.int(1, 8);
    const [eq, gen, sym, count] = r.pick([
      ["\\sin x=0", "x=k\\pi", "sin(x)", n + 1],
      ["\\cos x=0", "x=\\dfrac{\\pi}{2}+k\\pi", "cos(x)", n],
      ["\\cos x=1", "x=k2\\pi", "cos(x)-1", Math.floor(n / 2) + 1],
      ["\\sin x=1", "x=\\dfrac{\\pi}{2}+k2\\pi", "sin(x)-1", Math.floor((2 * n - 1) / 4) + 1],
    ] as const);
    const ks = count === 1 ? "k=0" : `k\\in\\{0;1;\\dots;${count - 1}\\}`;
    return made(`Số nghiệm của phương trình $${eq}$ trên đoạn $[0;${n === 1 ? "" : n}\\pi]$ là`, nums(count, [count + 1, count - 1, 2 * count], m, 0),
      [`Nghiệm tổng quát: $${gen}$, $k\\in\\mathbb Z$.`, `Điều kiện nằm trong đoạn $[0;${n === 1 ? "" : n}\\pi]$ cho $${ks}$.`, `Phương trình có $${count}$ nghiệm trên đoạn đó.`],
      `len(solveset(${sym}, x, Interval(0, ${n}*pi)))`, String(count));
  } },
  { key: "lientuc", make: (r) => {
    const a = r.nz(-6, 6), c = r.int(-5, 5), v = 2 * a - c;
    return made(`Tìm $m$ để hàm số $f(x)=\\begin{cases}\\dfrac{x^2-${a * a}}{x${sgn(-a)}} & \\text{khi } x\\ne ${a}\\\\ m${c ? sgn(c) : ""} & \\text{khi } x=${a}\\end{cases}$ liên tục tại $x=${a}$.`,
      nums(v, [2 * a, 2 * a + c, -v]),
      [`$\\lim\\limits_{x\\to ${a}}\\dfrac{x^2-${a * a}}{x${sgn(-a)}}=\\lim\\limits_{x\\to ${a}}(x${sgn(a)})=${2 * a}$.`, `Liên tục khi $f(${a})$ bằng giới hạn: $m${c ? sgn(c) : ""}=${2 * a}$.`, `$m=${v}$.`],
      `limit((x**2-${a * a})/(x-(${a})), x, ${a})-(${c})`, String(v));
  } },
  { key: "xscodien", make: (r) => {
    const red = r.int(3, 7), blue = r.int(2, 6), total = red + blue, mixed = r.int(0, 1) === 1;
    const all = choose(total, 2), res = mixed ? F(red * blue, all) : F(choose(red, 2), all);
    const other = mixed ? F(choose(red, 2), all) : F(red * blue, all);
    return made(`Hộp có $${red}$ bi đỏ và $${blue}$ bi xanh. Lấy ngẫu nhiên $2$ bi. Xác suất để ${mixed ? "được một bi đỏ và một bi xanh" : "được hai bi đỏ"} là`,
      fracs(res, [other, F(red, total), F(red * red, total * total)]),
      [`Số cách lấy $2$ bi: $C_{${total}}^{2}=${all}$.`, mixed ? `Số cách lấy một đỏ, một xanh: $${red}\\cdot ${blue}=${red * blue}$.` : `Số cách lấy hai bi đỏ: $C_{${red}}^{2}=${choose(red, 2)}$.`, `Xác suất bằng $${reduceTex(mixed ? red * blue : choose(red, 2), all, res)}$.`],
      mixed ? `${red}*${blue}/binomial(${total},2)` : `binomial(${red},2)/binomial(${total},2)`, res.sym());
  } },
  { key: "loghieu", make: (r) => {
    if (r.int(0, 1) === 0) {
      const a = r.pick([2, 3, 5]), k = r.int(1, a === 2 ? 4 : 2), mm = r.pick([3, 5, 6, 7, 10, 11, 12].filter((v) => v % a !== 0)), big = mm * a ** k;
      return made(`Tính $\\log_{${a}} ${big}-\\log_{${a}} ${mm}$.`, nums(k, [a ** k, k + 1, big - mm], m, 0),
        [`Hiệu hai logarit cùng cơ số: $\\log_a b-\\log_a c=\\log_a\\dfrac{b}{c}$.`, `$\\dfrac{${big}}{${mm}}=${a ** k}=${a}^{${k}}$.`, `$\\log_{${a}} ${a}^{${k}}=${k}$.`],
        `expand_log(log(${big}, ${a})-log(${mm}, ${a}), force=True)`, String(k));
    }
    const [a, b, c, k] = r.pick([[6, 2, 3, 1], [6, 4, 9, 2], [10, 2, 5, 1], [10, 4, 25, 2], [10, 20, 5, 2], [10, 8, 125, 3], [12, 3, 4, 1], [12, 9, 16, 2], [15, 3, 5, 1], [15, 9, 25, 2], [6, 12, 3, 2], [10, 50, 2, 2]] as const);
    return made(`Tính $\\log_{${a}} ${b}+\\log_{${a}} ${c}$.`, nums(k, [b + c, k + 1, b * c], m, 0),
      [`Tổng hai logarit cùng cơ số: $\\log_a b+\\log_a c=\\log_a(bc)$.`, `$${b}\\cdot ${c}=${b * c}=${a}^{${k}}$.`, `$\\log_{${a}} ${a}^{${k}}=${k}$.`],
      `expand_log(log(${b}, ${a})+log(${c}, ${a}), force=True)`, String(k));
  } },
  { key: "daohamhop", make: (r) => {
    const a = r.nz(-3, 3), b = r.int(-4, 4), n = r.int(2, 4), k = r.int(-2, 2), inner = a * k + b, v = n * a * inner ** (n - 1);
    return made(`Cho $f(x)=(${lin([[a, "x"], [b, ""]])})^${n}$. Giá trị $f'(${k})$ là`, nums(v, [n * inner ** (n - 1), a * inner ** n, n * a * inner ** n]),
      [`Đạo hàm hàm hợp: $f'(x)=${n}(${lin([[a, "x"], [b, ""]])})^{${n - 1}}\\cdot ${par(a)}$.`, `Tại $x=${k}$: $${a}\\cdot ${par(k)}${b ? sgn(b) : ""}=${inner}$.`, `$f'(${k})=${n}\\cdot ${par(inner)}^{${n - 1}}\\cdot ${par(a)}=${v}$.`],
      `diff((${a}*x+(${b}))**${n}, x).subs(x, ${k})`, String(v));
  } },
];

const grade12More: Template[] = [
  { key: "dongbien", make: (r) => {
    const k = r.int(1, 6), c = r.int(-9, 9), down = r.int(0, 1) === 1, co = [1, 0, -3 * k * k, c];
    const inside = `(-${k};${k})`, right = `(${k};+\\infty)`, left = `(-\\infty;-${k})`, all = "(-\\infty;+\\infty)";
    const set = down ? { right: m(inside), wrong: [right, left, all].map(m) } : { right: m(r.int(0, 1) ? right : left), wrong: [inside, all, `(-${2 * k};0)`].map(m) };
    return made(`Hàm số $y=${poly(co)}$ ${down ? "nghịch" : "đồng"} biến trên khoảng nào sau đây?`, set,
      [`$y'=3x^2-${3 * k * k}=3(x-${k})(x+${k})$.`, `$y'<0$ khi $-${k}<x<${k}$; $y'>0$ khi $x<-${k}$ hoặc $x>${k}$.`, down ? `Hàm số nghịch biến trên $${inside}$.` : `Hàm số đồng biến trên $${left}$ và trên $${right}$.`],
      `Max(*solve(diff(${polySym(co)}, x), x))`, String(k));
  } },
  { key: "gtln", make: (r) => {
    const h = r.int(-4, 4), c = r.int(-8, 8), p = r.int(1, 4), q = r.int(1, 4), co = [-1, 2 * h, c], v = h * h + c;
    return made(`Giá trị lớn nhất của hàm số $y=${poly(co)}$ trên đoạn $[${h - p};${h + q}]$ là`, nums(v, [h * h - p * p + c, h * h - q * q + c, c, h]),
      [`$y'=${poly([-2, 2 * h])}=0\\iff x=${h}$, thuộc đoạn đã cho.`, `$y(${h - p})=${polyAt(co, h - p)}$, $y(${h})=${v}$, $y(${h + q})=${polyAt(co, h + q)}$.`, `Giá trị lớn nhất là $${v}$, đạt tại $x=${h}$.`],
      `maximum(${polySym(co)}, x, Interval(${h - p}, ${h + q}))`, String(v));
  } },
  { key: "nguyenham", make: (r) => {
    if (r.int(0, 1) === 0) {
      const a = r.nz(-6, 6), n = r.int(1, 4);
      const tex = (c: Frac, p: number) => `${coefTex(c, p === 0 ? "" : p === 1 ? "x" : `x^{${p}}`) || "1"}+C`;
      return made(`Họ nguyên hàm của $f(x)=${coefTex(F(a), xPow(n))}$ là`, { right: m(tex(F(a, n + 1), n + 1)), wrong: [m(tex(F(a * n), n - 1)), m(tex(F(a, n), n + 1)), m(tex(F(a), n + 1)), m(tex(F(a, n + 1), n))] },
        ["$\\displaystyle\\int x^n\\,dx=\\dfrac{x^{n+1}}{n+1}+C$ với $n\\ne -1$.", `Tăng số mũ lên $${n + 1}$ rồi chia cho $${n + 1}$.`, `Kết quả là $${tex(F(a, n + 1), n + 1)}$. Lấy đạo hàm lại được $f(x)$.`],
        `integrate(${a}*x**${n}, x)`, `Rational(${a},${n + 1})*x**${n + 1}`);
    }
    const a = r.nz(-6, 6), k = r.int(1, 5), useCos = r.int(0, 1) === 1;
    const arg = k === 1 ? "x" : `${k}x`, f = useCos ? "\\cos" : "\\sin", g = useCos ? "\\sin" : "\\cos";
    const res = useCos ? F(a, k) : F(-a, k);
    const tex = (c: Frac, fn: string) => `${coefTex(c, `${fn} ${arg}`)}+C`;
    return made(`Họ nguyên hàm của $f(x)=${coefTex(F(a), `${f} ${arg}`)}$ là`, { right: m(tex(res, g)), wrong: [m(tex(res.mul(F(-1)), g)), m(tex(F(useCos ? a * k : -a * k), g)), m(tex(res, f))] },
      [useCos ? "$\\displaystyle\\int\\cos kx\\,dx=\\dfrac{1}{k}\\sin kx+C$." : "$\\displaystyle\\int\\sin kx\\,dx=-\\dfrac{1}{k}\\cos kx+C$.", `Ở đây $k=${k}$, nhân thêm hệ số $${a}$.`, `Kết quả là $${tex(res, g)}$.`],
      `integrate(${a}*${useCos ? "cos" : "sin"}(${k}*x), x)`, `${res.sym()}*${useCos ? "sin" : "cos"}(${k}*x)`);
  } },
  { key: "vuonggoc", make: (r) => {
    const a = r.nz(-4, 4), b = r.int(-4, 4), c = r.nz(-4, 4), d = r.int(-4, 4), e = r.pick([1, -1, 2, -2]);
    const top = -(a * c + b * d);
    if (top % e !== 0) return grade12More[3]!.make(r);
    const v = top / e;
    return made(`Trong không gian $Oxyz$, tìm $m$ để $\\vec u=(${a};${b};m)$ vuông góc với $\\vec v=(${c};${d};${e})$.`, nums(v, [-v, a * c + b * d, v + e]),
      ["Hai vectơ vuông góc khi tích vô hướng bằng $0$.", `$${par(a)}\\cdot ${par(c)}+${par(b)}\\cdot ${par(d)}+m\\cdot ${par(e)}=0$, tức $${lin([[a * c + b * d, ""], [e, "m"]])}=0$.`, `$m=${v}$.`],
      `solve(${a}*(${c})+(${b})*(${d})+x*(${e}), x)[0]`, String(v));
  } },
  { key: "ptmp", make: (r) => {
    const [a, b, c] = [r.nz(-4, 4), r.int(-4, 4), r.nz(-4, 4)], M = [r.int(-5, 5), r.int(-5, 5), r.int(-5, 5)] as const;
    const d = -(a * M[0] + b * M[1] + c * M[2]);
    return made(`Mặt phẳng đi qua $M(${M.join(";")})$ và có vectơ pháp tuyến $\\vec n=(${a};${b};${c})$ có phương trình $${lin([[a, "x"], [b, "y"], [c, "z"]])}+d=0$. Giá trị của $d$ là`,
      nums(d, [-d, M[0] + M[1] + M[2], d + a]),
      ["Phương trình mặt phẳng: $a(x-x_0)+b(y-y_0)+c(z-z_0)=0$.", `Thay $M$ vào: $${a}\\cdot ${par(M[0])}+${par(b)}\\cdot ${par(M[1])}+${par(c)}\\cdot ${par(M[2])}+d=0$.`, `$d=${d}$.`],
      `solve(${a}*(${M[0]})+(${b})*(${M[1]})+(${c})*(${M[2]})+x, x)[0]`, String(d));
  } },
];

/** Chủ đề THPT theo chương; mỗi mẫu lớp 10–12 thuộc đúng một chủ đề. */
export const thptTopics: { id: string; grade: number; vi: string; en: string; keys: string[] }[] = [
  { id: "g10-tap-hop", grade: 10, vi: "Mệnh đề và tập hợp", en: "Sets", keys: ["taphop"] },
  { id: "g10-bpt", grade: 10, vi: "Bất phương trình bậc nhất hai ẩn", en: "Linear inequalities in two variables", keys: ["bpt"] },
  { id: "g10-bac-hai", grade: 10, vi: "Hàm số bậc hai", en: "Quadratic functions", keys: ["dinh", "gtnn"] },
  { id: "g10-tam-giac", grade: 10, vi: "Hệ thức lượng trong tam giác", en: "Triangle trigonometry", keys: ["cosin", "luonggiac"] },
  { id: "g10-vecto", grade: 10, vi: "Vectơ", en: "Vectors", keys: ["dodai", "vohuong"] },
  { id: "g10-toa-do", grade: 10, vi: "Tọa độ trong mặt phẳng", en: "Plane coordinates", keys: ["khoangcach", "bankinh"] },
  { id: "g10-to-hop", grade: 10, vi: "Đại số tổ hợp", en: "Combinatorics", keys: ["chinhhop", "tohop", "nhithuc"] },
  { id: "g10-thong-ke", grade: 10, vi: "Thống kê", en: "Statistics", keys: ["trungbinh", "phuongsai"] },
  { id: "g11-luong-giac", grade: 11, vi: "Phương trình lượng giác", en: "Trigonometric equations", keys: ["ptlg"] },
  { id: "g11-cap-so", grade: 11, vi: "Dãy số và cấp số", en: "Sequences", keys: ["cscun", "cscsn", "csnun"] },
  { id: "g11-gioi-han", grade: 11, vi: "Giới hạn và liên tục", en: "Limits and continuity", keys: ["limvc", "lim00", "luivc", "lientuc"] },
  { id: "g11-mu-log", grade: 11, vi: "Mũ và logarit", en: "Exponents and logarithms", keys: ["log", "mu", "loghieu"] },
  { id: "g11-dao-ham", grade: 11, vi: "Đạo hàm", en: "Derivatives", keys: ["daoham", "daohamhop"] },
  { id: "g11-xac-suat", grade: 11, vi: "Xác suất", en: "Probability", keys: ["xsdoclap", "xscodien"] },
  { id: "g12-ung-dung", grade: 12, vi: "Ứng dụng đạo hàm", en: "Applications of derivatives", keys: ["cucdai", "dongbien", "gtln"] },
  { id: "g12-tiem-can", grade: 12, vi: "Tiệm cận", en: "Asymptotes", keys: ["tcngang", "tcdung"] },
  { id: "g12-tich-phan", grade: 12, vi: "Nguyên hàm và tích phân", en: "Antiderivatives and integrals", keys: ["nguyenham", "tp1", "tp2", "dientich"] },
  { id: "g12-khong-gian", grade: 12, vi: "Tọa độ trong không gian", en: "Space coordinates", keys: ["kc3d", "kcmp", "matcau", "vuonggoc", "ptmp"] },
  { id: "g12-xac-suat", grade: 12, vi: "Xác suất có điều kiện", en: "Conditional probability", keys: ["dieukien"] },
];

/* ---------- lắp ráp ---------- */

export const gradeTemplates: Record<number, Template[]> = {
  1: grade1, 2: grade2, 3: grade3, 4: grade4, 5: grade5, 6: grade6,
  7: grade7, 8: grade8, 9: grade9,
  10: [...grade10, ...grade10More], 11: [...grade11, ...grade11More], 12: [...grade12, ...grade12More],
};

function build(grade: number, taken: Set<string>): GradeQuestion[] {
  const out: GradeQuestion[] = [];
  gradeTemplates[grade]!.forEach((template, at) => {
    const r = rng(grade * 7919 + at * 104729 + 17);
    const seen = new Set<string>();
    let tries = 0;
    while (seen.size < PER_TEMPLATE) {
      tries += 1;
      if (tries > 2000) throw new Error(`lớp ${grade} mẫu ${template.key}: không đủ câu khác nhau`);
      const item = template.make(r);
      if (seen.has(item.prompt) || taken.has(item.prompt)) continue;
      const wrong: string[] = [];
      for (const option of item.wrong) {
        if (option !== item.right && !wrong.includes(option)) wrong.push(option);
        if (wrong.length === 3) break;
      }
      if (wrong.length < 3) throw new Error(`lớp ${grade} mẫu ${template.key}: thiếu phương án nhiễu`);
      seen.add(item.prompt);
      taken.add(item.prompt);
      const answer = r.int(0, 3) as 0 | 1 | 2 | 3;
      const choices = [...wrong];
      choices.splice(answer, 0, item.right);
      out.push({
        id: `l${grade}-${template.key}-${seen.size}`,
        grade,
        prompt: item.prompt,
        choices: choices as [string, string, string, string],
        answer,
        steps: item.steps,
        check: item.check,
        expect: item.expect,
      });
    }
  });
  return out;
}

/** Câu sinh cho các lớp `grades`; bỏ qua đề trùng với câu viết tay `existing` cùng lớp.
 * Lớp 1–9 có 10 mẫu (100 câu), lớp 10–12 có 15 mẫu (150 câu). */
export function generatePractice(existing: readonly GradeQuestion[], grades: readonly number[]): GradeQuestion[] {
  return grades.flatMap((grade) => build(grade, new Set(existing.filter((item) => item.grade === grade).map((item) => item.prompt))));
}

/** Mẫu sinh ra câu `id`, ví dụ `l10-dinh-3` → `dinh`. */
export function templateKeyOf(id: string): string {
  return /^l\d+-(.+)-\d+$/.exec(id)?.[1] ?? "";
}

/**
 * Quy ước trình bày toán bằng KaTeX của Bàn Toán. Một nơi duy nhất, dùng cho bộ kiểm thử
 * (scripts/mathstyle.test.ts) và cho công cụ sửa tự động (npm run fix:math).
 *
 *  - Chia viết bằng dấu hai chấm, không dùng \div.
 *  - Số thập phân viết 3{,}14, không dùng dấu chấm.
 *  - Liệt kê nhiều số, tọa độ, khoảng thì ngăn bằng chấm phẩy: 2;\ 3;\ 5, (1;2), [0;1].
 *  - Chỉnh hợp và tổ hợp viết A_n^k, C_n^k, không viết A(n,k), C(n,k).
 *  - Chuỗi tiếng Anh giữ cách viết Anh (dấu chấm thập phân, dấu phẩy trong tọa độ, dấu ×).
 *  - Phân số viết \frac hoặc \dfrac, không viết a/b (trừ trong số mũ và trong đơn vị).
 *  - Dấu nhân: \times ở tiểu học, \cdot từ lớp 6. \times còn được dùng cho kích thước (2\times 2).
 *  - Không dùng ký tự Unicode hay kiểu gõ ASCII (*, <=, >=) thay cho lệnh KaTeX.
 *  - Tên hàm (sin, cos, log, lim…) phải có gạch chéo ngược.
 *  - Biểu thức có phép tính phải nằm trong $...$, không viết thành chữ thường.
 */

export type Level = "primary" | "upper";
export type Issue = { rule: string; text: string };

export const MATH = /\$[^$]+\$/g;

/** Bỏ những chỗ dấu / và dấu , là hợp lệ: số mũ, chỉ số, chữ, đơn vị. */
function core(tex: string): string {
  return tex
    .replace(/\\(?:text|mathrm|operatorname)\s*\{[^{}]*\}/g, " ")
    .replace(/[\^_]\{[^{}]*\}/g, " ")
    .replace(/\{,\}/g, "DEC");
}

/**
 * Dấu phẩy ngăn cách (không phải {,}) theo cách viết của sách giáo khoa Việt Nam:
 *  - trong ngoặc là tọa độ hoặc khoảng nên dùng ";" như (1;2), [0;1]; riêng góc giữa hai vectơ giữ dấu phẩy;
 *  - ngoài ngoặc, dãy có số thì ngăn bằng ";\ " để không lẫn với số thập phân; dãy toàn chữ (a, b > 0) giữ dấu phẩy.
 */
export function separators(tex: string): string {
  const commas: { at: number; end: number; depth: number; vector: boolean }[] = [];
  const stack: number[] = [];
  for (let i = 0; i < tex.length; i += 1) {
    const ch = tex[i];
    if (ch === "(" || ch === "[") stack.push(i);
    else if (ch === ")" || ch === "]") stack.pop();
    else if (ch === "," && tex[i - 1] !== "{" && tex[i - 1] !== "\\") {
      let end = i + 1;
      for (;;) {
        const gap = /^(\\[ ,;!]|\s)/.exec(tex.slice(end));
        if (!gap) break;
        end += gap[0].length;
      }
      const open = stack[stack.length - 1];
      const close = open === undefined ? -1 : tex.indexOf(tex[open] === "(" ? ")" : "]", i);
      const inside = open === undefined ? "" : tex.slice(open, close < 0 ? tex.length : close);
      commas.push({ at: i, end, depth: stack.length, vector: /\\vec|\\overrightarrow|\\widehat/.test(inside) });
    }
  }
  if (!commas.length) return tex;
  const numeric = commas.some((c) => c.depth === 0 && (/\d\s*$/.test(tex.slice(0, c.at)) || /^-?\d/.test(tex.slice(c.end))));
  let out = "";
  let from = 0;
  for (const c of commas) {
    const inParen = c.depth > 0;
    if (inParen ? c.vector : !numeric) continue;
    out += tex.slice(from, c.at) + (inParen ? ";" : ";\\ ");
    from = c.end;
  }
  return out + tex.slice(from);
}

const COMBO = /\b([AC])\(\s*([\w+-]+)\s*,\s*([\w+-]+)\s*\)/g;

export function mathIssues(tex: string, level: Level, allowTimes = false, english = false, combo = false): Issue[] {
  const out: Issue[] = [];
  const say = (rule: string) => out.push({ rule, text: tex });
  const bare = core(tex);
  if (!english) {
    if (/\\div(?![a-zA-Z])/.test(tex)) say("chia viết bằng dấu hai chấm, không dùng \\div");
    if (/\d\.\d/.test(bare)) say("số thập phân dùng {,}, không dùng dấu chấm");
    if (combo && COMBO.test(tex)) say("chỉnh hợp, tổ hợp viết A_n^k và C_n^k");
    else if (separators(tex) !== tex) say("liệt kê số, tọa độ, khoảng ngăn bằng chấm phẩy; số thập phân viết {,}");
  }
  if (!english && /[\w)}]\s*\/\s*[\w({\\]/.test(bare)) say("phân số viết \\frac, không viết a/b");
  if (/\*/.test(tex)) say("dấu nhân viết \\cdot hoặc \\times, không dùng *");
  if (/<=|>=|=<|=>|!=(?!\s*[\d?(\\a-zA-Z])/.test(tex)) say("dùng \\le, \\ge, \\neq, \\Rightarrow");
  if (/[×÷·≤≥≠√²³−±∞π]/.test(tex)) say("dùng lệnh KaTeX thay ký tự Unicode");
  if (/(?<![\\a-zA-Z])(sin|cos|tan|cot|log|ln|lim|max|min)(?![a-zA-Z])/.test(bare)) say("tên hàm cần gạch chéo ngược");
  if (!allowTimes && !english) {
    // \times vẫn đúng khi chỉ kích thước: bảng 2\times 10, định thức 2\times 2.
    const sized = /^\$?\s*\d+\s*\\times\s*\d+\s*\$?$/.test(tex);
    if (level === "upper" && !sized && /\\times/.test(tex)) say("từ lớp 6 dấu nhân viết \\cdot");
    if (level === "primary" && /\\cdot(?!s)/.test(tex)) say("tiểu học dấu nhân viết \\times");
  }
  return out;
}

/** Toán viết ngoài $...$: có phép tính giữa hai số, hoặc ký tự toán Unicode. Số đo như cm² được phép. */
export function proseIssues(text: string): Issue[] {
  const outside = text.replace(MATH, " ").replace(/`[^`]*`/g, " ").replace(/\b(mm|cm|dm|km|m)[²³]/g, " ");
  const out: Issue[] = [];
  if (/\d\s*[+×÷·=<>≤≥≈]\s*[\d(a-zA-Z]|[a-zA-Z)]\s*[=+×·≤≥]\s*\d|\d\s*[−]\s*\d|[²³√≤≥≠±≡∞]|\^\s*[\d{(]|\\(?:frac|dfrac|sqrt|cdot|times)\b/.test(outside)) {
    out.push({ rule: "biểu thức toán phải nằm trong $...$", text });
  }
  return out;
}

/** Sửa những gì sửa được một cách máy móc. Trả về chuỗi mới (có thể giống chuỗi cũ). */
export function fixMath(tex: string, level: Level, allowTimes = false, combo = false): string {
  let s = tex;
  s = s.replace(/\s*\\div(?![a-zA-Z])\s*/g, ":");
  s = s.replace(/(\d)\.(\d)/g, "$1{,}$2");
  if (combo) s = s.replace(COMBO, (_m, f: string, n: string, k: string) => `${f}_${n.length > 1 ? `{${n}}` : n}^${k.length > 1 ? `{${k}}` : k}`);
  s = separators(s);
  // phân số gạch chéo đơn giản, không nằm trong số mũ hay chỉ số
  const frac = level === "primary" ? "\\frac" : "\\dfrac";
  const num = String.raw`\d+(?:\{,\}\d+)?`;
  s = s.replace(new RegExp(String.raw`(?<![\^_{/\w}])(${num}|[a-zA-Z])\s*/\s*(${num}|[a-zA-Z])(?![\w/{^])`, "g"), (whole, a: string, b: string, at: number) => {
    const before = s.slice(0, at);
    const open = (before.match(/[\^_]\{[^{}]*$/) ?? []).length;
    return open ? whole : `${frac}{${a}}{${b}}`;
  });
  if (!allowTimes && level === "upper") s = s.replace(/\s*\\times\s*/g, (m, at: number) => (/\d$/.test(s.slice(0, at)) && /^\s*\\times\s*\d\s*(?:$|\\text)/.test(s.slice(at)) ? m : "\\cdot "));
  return s;
}

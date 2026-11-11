/**
 * Đổi một dòng có công thức `$...$` thành lời đọc được cho giọng đọc của trình duyệt.
 * Chỉ xử lý các mẫu hay gặp ở bài tiểu học và THCS; mẫu lạ được bỏ ký hiệu LaTeX, giữ chữ và số.
 */
type Words = Record<"plus" | "minus" | "times" | "divide" | "equals" | "le" | "ge" | "lt" | "gt" | "ne" | "over" | "squared" | "cubed" | "power" | "sqrt" | "percent" | "degree", string>;

const VI: Words = { plus: " cộng ", minus: " trừ ", times: " nhân ", divide: " chia ", equals: " bằng ", le: " nhỏ hơn hoặc bằng ", ge: " lớn hơn hoặc bằng ", lt: " nhỏ hơn ", gt: " lớn hơn ", ne: " khác ", over: " phần ", squared: " bình phương", cubed: " lập phương", power: " mũ ", sqrt: " căn bậc hai của ", percent: " phần trăm", degree: " độ" };
const EN: Words = { plus: " plus ", minus: " minus ", times: " times ", divide: " divided by ", equals: " equals ", le: " is at most ", ge: " is at least ", lt: " is less than ", gt: " is greater than ", ne: " is not equal to ", over: " over ", squared: " squared", cubed: " cubed", power: " to the power ", sqrt: " the square root of ", percent: " percent", degree: " degrees" };

const GREEK: Record<string, string> = { alpha: "an pha", beta: "bê ta", gamma: "gam ma", Delta: "đen ta", delta: "đen ta", pi: "pi", theta: "tê ta", lambda: "lam đa", Omega: "ô mê ga", omega: "ô mê ga", infty: "vô cùng" };

function math(tex: string, w: Words, vi: boolean): string {
  // Dấu trừ giữa hai số hạng là phép trừ; dấu trừ đứng đầu (sau ngoặc mở, dấu bằng…) là số âm.
  let s = tex
    .replace(/(\d)\\,(?=\d{3})/g, "$1")
    .replace(/([A-Za-z0-9)}])\s*[-−]\s*/g, "$1 ⊖ ")
    .replace(/[-−]/g, " ⊝ ");
  for (let pass = 0; pass < 4; pass += 1) {
    s = s.replace(/\\d?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, (_all, top: string, bottom: string) => ` ${top}${w.over}${bottom} `);
    s = s.replace(/\\sqrt\s*\{([^{}]*)\}/g, (_all, inner: string) => `${w.sqrt}${inner} `);
  }
  s = s
    .replace(/\\(left|right|bigl|bigr|Bigl|Bigr|displaystyle|,|;|!|quad|qquad)/g, " ")
    .replace(/\\text\s*\{([^{}]*)\}/g, " $1 ")
    .replace(/\\pm(?![a-zA-Z])/g, vi ? " cộng trừ " : " plus or minus ")
    .replace(/\\(cdot|times)/g, w.times)
    .replace(/\\div/g, w.divide)
    .replace(/\\(le|leq)(?![a-zA-Z])/g, w.le)
    .replace(/\\(ge|geq)(?![a-zA-Z])/g, w.ge)
    .replace(/\\(ne|neq)(?![a-zA-Z])/g, w.ne)
    .replace(/\\%/g, w.percent)
    .replace(/\^\s*\\circ|\^\s*\{\s*\\circ\s*\}/g, w.degree)
    .replace(/\^\s*\{?2\}?(?!\d)/g, w.squared)
    .replace(/\^\s*\{?3\}?(?!\d)/g, w.cubed)
    .replace(/\^\s*\{([^{}]*)\}/g, (_all, power: string) => `${w.power}${power} `)
    .replace(/\^\s*(\w)/g, (_all, power: string) => `${w.power}${power} `)
    .replace(/_\s*\{([^{}]*)\}|_\s*(\w)/g, (_all, a?: string, b?: string) => ` ${a ?? b ?? ""} `)
    .replace(/\\([A-Za-z]+)/g, (_all, name: string) => ` ${vi ? GREEK[name] ?? name : name} `)
    .replace(/<=/g, w.le)
    .replace(/>=/g, w.ge)
    .replace(/</g, w.lt)
    .replace(/>/g, w.gt)
    .replace(/=/g, w.equals)
    .replace(/\+/g, w.plus)
    .replace(/⊖/g, w.minus)
    .replace(/⊝/g, vi ? " âm " : " minus ")
    .replace(/:/g, w.divide)
    .replace(/%/g, w.percent)
    .replace(/[{}\\$]/g, " ");
  return s;
}

export function speakable(text: string, lang: "vi" | "en" = "vi"): string {
  const w = lang === "en" ? EN : VI;
  const parts = text.split(/(\$[^$]*\$)/g);
  return parts
    .map((part) => (part.startsWith("$") && part.endsWith("$") && part.length >= 2 ? math(part.slice(1, -1), w, lang === "vi") : part))
    .join("")
    .replace(/(\d),(\d)/g, lang === "vi" ? "$1 phẩy $2" : "$1.$2")
    .replace(/\s+/g, " ")
    .trim();
}

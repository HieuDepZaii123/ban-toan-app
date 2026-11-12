/**
 * Tên bài có thể chứa công thức ($y=ax^2$). Thẻ <title>, aria-label và những chỗ chỉ nhận chữ
 * cần bản chữ thường, đọc được, không còn dấu $ hay lệnh TeX.
 */
const SUPER: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", n: "ⁿ" };

function texToPlain(tex: string): string {
  return tex
    .replace(/\\d?frac\{([^{}]*)\}\{([^{}]*)\}/g, "$1/$2")
    .replace(/\\sqrt\{([^{}]*)\}/g, "√($1)")
    .replace(/\^\\circ/g, "°")
    .replace(/\^\{?([0-9n])\}?/g, (_m, d: string) => SUPER[d] ?? `^${d}`)
    .replace(/\{,\}/g, ",")
    .replace(/\\(?:cdot|times)\s*/g, "·")
    .replace(/\\le\b/g, "≤").replace(/\\ge\b/g, "≥").replace(/\\neq\b/g, "≠")
    .replace(/\\pi\b/g, "π").replace(/\\Delta\b/g, "Δ")
    .replace(/\\[,;! ]/g, " ")
    .replace(/\\(?:left|right|mathrm|text|vec|overrightarrow)\b/g, "")
    .replace(/\\([a-zA-Z]+)/g, "$1")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function plainMath(text: string): string {
  return text.replace(/\$([^$]+)\$/g, (_m, tex: string) => texToPlain(tex));
}

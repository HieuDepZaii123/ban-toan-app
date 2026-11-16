/** Turns the plain readout strings of the labs ("x = 1,5", "(2; 3)", "50 m", "2√3") into mixed `$…$` text for MathText. */

const UNITS = new Set(["m", "s", "g", "cm", "kg", "min", "m/s", "m²", "m³", "°C", "%"]);
const FUNCTIONS = new Set(["log", "ln", "sin", "cos", "tan", "cot", "lim", "max", "min"]);
const SUP: Record<string, string> = { "²": "2", "³": "3", "ˣ": "x", "ⁿ": "n" };
const SUB: Record<string, string> = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9" };
const SYMBOL: Record<string, string> = {
  "≥": "\\ge", "≤": "\\le", "≠": "\\ne", "≈": "\\approx", "·": "\\cdot", "×": "\\times", "∞": "\\infty",
  "π": "\\pi", "Δ": "\\Delta", "∫": "\\int", "√": "\\sqrt", "→": "\\to", "∈": "\\in", "−": "-",
};

function unit(token: string): string {
  if (token === "°C") return "{}^\\circ\\mathrm{C}";
  if (token === "%") return "\\%";
  if (token === "m²") return "\\mathrm{m}^2";
  if (token === "m³") return "\\mathrm{m}^3";
  return `\\mathrm{${token}}`;
}

/** Math side of one token, or null when the token is a word. */
function mathToken(token: string): string | null {
  if (FUNCTIONS.has(token)) return `\\${token}`;
  const letters = token.match(/[A-Za-z\u00C0-\u024F\u1E00-\u1EFF]{2,}/g);
  if (letters && !letters.every((w) => FUNCTIONS.has(w))) return null;
  if (/[\u00C0-\u024F\u1E00-\u1EFF]/.test(token.replace(/[π∫√Δ]/g, ""))) return null;
  if (!/^[\dA-Za-z(),;.=<>+\-−≥≤≠≈·×∞π∆Δ∫√→∈²³ˣⁿ₀-₉!|/%°:^]+$/.test(token)) return null;
  let out = token;
  out = out.replace(/(\d+)\/(\d+)/g, "\\frac{$1}{$2}");
  out = out.replace(/√(\d+)/g, "\\sqrt{$1}").replace(/√\(([^)]*)\)/g, "\\sqrt{$1}");
  out = out.replace(/([a-zA-Z\d)])([²³ˣⁿ])/g, (_m, base: string, sup: string) => `${base}^${SUP[sup]}`);
  out = out.replace(/([a-zA-Z])((?:[₀-₉])+)/g, (_m, base: string, sub: string) => `${base}_{${[...sub].map((c) => SUB[c]).join("")}}`);
  out = out.replace(/(^|[^\\a-z])(log|ln|sin|cos|tan|cot|lim|max|min)(?![a-z])/g, "$1\\$2");
  out = out.replace(/(\d),(\d)/g, "$1{,}$2");
  out = out.replace(/−/g, "-");
  out = out.replace(/m\/s/g, "\\mathrm{m/s}").replace(/°C/g, "{}^\\circ\\mathrm{C}").replace(/%/g, "\\%");
  out = out.replace(/[≥≤≠≈·×∞πΔ∫→∈]/g, (c) => `${SYMBOL[c]} `);
  out = out.replace(/\\(ge|le|ne|approx|cdot|times|infty|pi|Delta|int|to|in) ?/g, "\\$1 ");
  out = out.replace(/;\s*/g, ";\\ ");
  return out.trim();
}

export function toTex(text: string): string {
  const tokens = text.split(/\s+/).filter(Boolean);
  const parts: { math: boolean; text: string }[] = [];
  let prevNumber = false;
  for (const token of tokens) {
    const isUnit = prevNumber && UNITS.has(token);
    const math = isUnit ? unit(token) : mathToken(token);
    prevNumber = /\d$/.test(token);
    if (math === null) {
      parts.push({ math: false, text: token });
      prevNumber = false;
    } else if (isUnit) {
      const last = parts[parts.length - 1];
      if (last?.math) last.text += `\\ ${math}`;
      else parts.push({ math: true, text: math });
    } else {
      const last = parts[parts.length - 1];
      if (last?.math) last.text += ` ${math}`;
      else parts.push({ math: true, text: math });
    }
  }
  return parts.map((p) => (p.math ? `$${p.text}$` : p.text)).join(" ");
}

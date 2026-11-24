/**
 * Đổi chuỗi số liệu của lab ("x = 1,5", "(−∞; 2]", "−√3/2", "50 m · 5 s") thành văn bản có $…$ cho MathText.
 * Bộ phân tích từ vựng đọc từng thành phần (khoảng, số, chữ cái, ký hiệu, từ) rồi gộp các thành phần toán liền nhau
 * thành một khối, thay cho việc đoán theo từng cụm cách nhau bởi dấu cách.
 */

type Kind = "math" | "text" | "space" | "punct" | "unit";
type Atom = { kind: Kind; tex: string };

const UNITS = new Set(["m", "s", "g", "h", "l", "cm", "kg", "mm", "km", "min", "m/s", "km/h", "m/phút"]);
const FUNCTIONS = new Set(["log", "ln", "sin", "cos", "tan", "cot", "lim", "max", "min"]);
const MATH_WORDS = new Set(["Ox", "Oy", "Oz", "Oxy", "Oxyz"]);
const SUP: Record<string, string> = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁺": "+", "⁻": "-", "ˣ": "x", "ⁿ": "n" };
const SUP_CLASS = "\\u2070\\u00B9\\u00B2\\u00B3\\u2074-\\u207B\\u02E3\\u207F";
const VULGAR: Record<string, string> = { "½": "\\frac{1}{2}", "¼": "\\frac{1}{4}", "¾": "\\frac{3}{4}", "⅓": "\\frac{1}{3}", "⅔": "\\frac{2}{3}" };
const SUB: Record<string, string> = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9", "ₙ": "n" };
const SYMBOL: Record<string, string> = {
  "≥": "\\ge ", "≤": "\\le ", "≠": "\\ne ", "≈": "\\approx ", "·": "\\cdot ", "×": "\\times ", "÷": ":", "∞": "\\infty ",
  "π": "\\pi ", "Δ": "\\Delta ", "∆": "\\Delta ", "∫": "\\int ", "→": "\\to ", "∈": "\\in ", "±": "\\pm ", "−": "-",
};

/** Chữ cái có dấu và chữ Latin mở rộng, nhưng không phải dấu × và ÷ của khối Latin-1. */
const LETTER = "A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u024F\\u1E00-\\u1EFF";

const RULES: { kind: Kind; re: RegExp }[] = [
  { kind: "space", re: /^\s+/ },
  // khoảng và toạ độ: (−∞; 2], [−1; 3), (2; 3; 4)
  { kind: "math", re: /^[(\[][^()[\]$]*;[^()[\]$]*[)\]]/ },
  // một căn, một số mũ hay một phân số có ngoặc đi liền nhau phải nằm trong cùng một thành phần để đổi được sang TeX
  { kind: "math", re: /^√\([^()]*\)/ },
  { kind: "math", re: /^\^\([^()]*\)/ },
  { kind: "math", re: /^\([^()]*\)\/(?:\([^()]*\)|\d+|[A-Za-z])/ },
  { kind: "math", re: /^(?:m\/s|km\/h)(?![A-Za-z])/ },
  { kind: "math", re: /^\d+(?:[.,]\d+)?/ },
  { kind: "text", re: new RegExp(`^[${LETTER}]{2,}`) },
  { kind: "math", re: new RegExp(`^[A-Za-z](?![${LETTER}])`) },
  { kind: "math", re: new RegExp(`^[${SUP_CLASS}₀-₉ₙ′″°%½¼¾⅓⅔]`) },
  { kind: "punct", re: /^[.,;:]/ },
  { kind: "math", re: /^[=<>+\-−±≥≤≠≈·×÷∞π∆Δ∫√∛→∈|!/^_()[\]{}]/ },
];

/** Một đoạn toán thuần (không có từ) sang TeX. */
function convertMath(source: string): string {
  let out = source;
  out = out.replace(/√(\d+)/g, "\\sqrt{$1}").replace(/√\(([^)]*)\)/g, "\\sqrt{$1}").replace(/√([A-Za-z])/g, "\\sqrt{$1}");
  out = out.replace(/√\(([^()]*)\)/g, "\\sqrt{$1}");
  out = out.replace(/\^\(([^()]*)\)/g, "^{$1}");
  out = out.replace(/∫([₀-₉ₙ])([¹²³ˣⁿ])?/g, (_m, sub: string, sup: string | undefined) => `\\int_{${SUB[sub] ?? sub}}${sup ? `^{${SUP[sup] ?? sup}}` : ""} `);
  out = out.replace(new RegExp(`([A-Za-z\\d)}])([${SUP_CLASS}]+)`, "g"), (_m, base: string, sup: string) => {
    const mapped = [...sup].map((c) => SUP[c] ?? c).join("");
    return `${base}^${mapped.length === 1 ? mapped : `{${mapped}}`}`;
  });
  out = out.replace(/[½¼¾⅓⅔]/g, (c) => VULGAR[c] ?? c);
  out = out.replace(/∛(\d+|[A-Za-z])/g, "\\sqrt[3]{$1}").replace(/√([ΔΔ∆π])/g, (_m, c: string) => `\\sqrt{${c === "π" ? "\\pi" : "\\Delta"}}`);
  out = out.replace(/([A-Za-z\\]+)_([A-Za-z\d]+)/g, "$1_{$2}");
  out = out.replace(/([A-Za-z])((?:[₀-₉ₙ])+)/g, (_m, base: string, sub: string) => `${base}_{${[...sub].map((c) => SUB[c] ?? c).join("")}}`);
  out = out.replace(/″/g, "''").replace(/′/g, "'");
  out = out.replace(/\^\s*[-−]\s*(\d+)/g, "^{-$1}").replace(/\^(\d{2,})/g, "^{$1}");
  out = out.replace(/(^|[^\\A-Za-z])(log|ln|sin|cos|tan|cot|lim|max|min)(?![A-Za-z])/g, "$1\\$2");
  out = out.replace(/(\d)[,.](\d)/g, "$1{,}$2");
  out = out.replace(/°C/g, "{}^\\circ\\mathrm{C}").replace(/°/g, "^\\circ").replace(/%/g, "\\%");
  out = out.replace(/[≥≤≠≈·×÷∞πΔ∆∫→∈±−]/g, (c) => SYMBOL[c] ?? c);
  out = out.replace(/\\(ge|le|ne|approx|cdot|times|infty|pi|Delta|int|to|in|pm) ?/g, "\\$1 ");
  // phân số a/b, kể cả tử và mẫu là căn hoặc π
  // phân số có tử là luỹ thừa hay biểu thức trong ngoặc: x²/2, (x+1)/(x−1)
  out = out.replace(/\(([^()]+)\)\s*\/\s*\(([^()]+)\)/g, "\\frac{$1}{$2}");
  out = out.replace(/\(([^()]+)\)\s*\/\s*(\d+|[A-Za-z])(?![A-Za-z\d])/g, "\\frac{$1}{$2}");
  out = out.replace(/([A-Za-z\d]\^(?:\{[^}]*\}|\d))\s*\/\s*(\d+|[A-Za-z])(?![A-Za-z\d])/g, "\\frac{$1}{$2}");
  const NUM = "(?:\\d+(?:\\{,\\}\\d+)?)?(?:\\\\pi ?|\\\\sqrt\\{\\d+\\})?";
  const DEN = "\\d+(?:\\{,\\}\\d+)?|\\\\sqrt\\{\\d+\\}|\\d*\\\\pi";
  out = out.replace(new RegExp(`(${NUM})\\s*\\/\\s*(${DEN})`, "g"), (m, num: string, den: string) => (num.trim() ? `\\frac{${num.trim()}}{${den.trim()}}` : m));
  out = out.replace(/(?<![\\\w])(d[a-z])\/(d[a-z])(?![\w])/g, "\\frac{$1}{$2}");
  // a/b và 1/x giữa hai ký hiệu đơn; m/s và km/h giữ nguyên là đơn vị
  out = out.replace(/(?<![\\\w{])([A-Za-z]|\d+)\/([A-Za-z]|\d+)(?![\w])/g, (m, a: string, b: string) => (a === "m" && b === "s" ? m : `\\frac{${a}}{${b}}`));
  if (out.includes("\\int")) out = out.replace(/\s+d([a-z])(?![A-Za-z])/g, "\\,d$1");
  out = out.replace(/\\lim\s+([a-z])\s*\\to ?\s*(-?(?:[\w.{},]+|\\infty ?))/g, (_m, v: string, to: string) => `\\lim_{${v}\\to ${to.trim()}}`);
  return out.replace(/\s{2,}/g, " ").trim();
}

function lex(text: string): Atom[] {
  const atoms: Atom[] = [];
  let rest = text;
  while (rest.length > 0) {
    let kind: Kind = "text";
    let value = rest[0] ?? "";
    for (const rule of RULES) {
      const m = rule.re.exec(rest);
      if (m && m[0].length > 0) {
        kind = rule.kind;
        value = m[0];
        break;
      }
    }
    rest = rest.slice(value.length);
    atoms.push({ kind, tex: value });
  }
  return atoms;
}

const unitTex = (unit: string): string => {
  if (unit === "m/s" || unit === "km/h") return `\\ \\mathrm{${unit}}`;
  return `\\ \\mathrm{${unit.replace(/[²³]/g, "")}}${/²/.test(unit) ? "^2" : /³/.test(unit) ? "^3" : ""}`;
};

export function toTex(input: string): string {
  const atoms = lex(input);
  const prevSolid = (i: number): Atom | undefined => {
    for (let k = i - 1; k >= 0; k -= 1) if (atoms[k]!.kind !== "space") return atoms[k];
    return undefined;
  };
  // Từ: hàm số và tên trục là toán; "dx" sau dấu tích phân cũng vậy.
  for (let i = 0; i < atoms.length; i += 1) {
    const a = atoms[i]!;
    if (a.kind === "text" && (FUNCTIONS.has(a.tex) || MATH_WORDS.has(a.tex) || /^[A-Z]{2,3}$/.test(a.tex))) a.kind = "math";
    else if (a.kind === "text" && /^d[a-z]$/.test(a.tex) && atoms.slice(0, i).some((p) => p.tex.includes("∫"))) a.kind = "math";
    else if (a.kind === "text" && /^[a-z]{2,3}$/.test(a.tex) && !UNITS.has(a.tex) && !FUNCTIONS.has(a.tex)) {
      // Chữ viết liền sau một số, một chữ cái hay dấu gạch chéo là tích các biến: 4ac, 2xy, dy/dx.
      const before = atoms[i - 1];
      const after = atoms[i + 1];
      const glued = before?.kind === "math" && /[\d)a-z]$/.test(before.tex);
      if (glued || after?.tex === "/" || before?.tex === "/") a.kind = "math";
    }
  }
  // Đơn vị đi sau một số: 5 s, 50 m, 20 m/s, 4 m².
  for (let i = 0; i < atoms.length; i += 1) {
    const a = atoms[i]!;
    const prev = prevSolid(i);
    if ((a.kind === "math" || a.kind === "text") && UNITS.has(a.tex) && prev && /\d$/.test(prev.tex) && prev.kind === "math") {
      let unit = a.tex;
      const next = atoms[i + 1];
      if (next && (next.tex === "²" || next.tex === "³")) {
        unit += next.tex;
        next.tex = "";
      }
      a.kind = "unit";
      a.tex = unit;
    }
  }

  // Dấu câu nằm giữa hai thành phần toán thì thuộc khối toán, còn ở cuối câu hoặc trước chữ thì là chữ.
  const solid = atoms.filter((a) => a.tex !== "");
  const mathLike = (a: Atom | undefined): boolean => a?.kind === "math" || a?.kind === "unit";
  const inRun = new Set<Atom>();
  for (let i = 0; i < solid.length; i += 1) {
    const a = solid[i]!;
    if (a.kind !== "punct") continue;
    let before: Atom | undefined;
    for (let k = i - 1; k >= 0; k -= 1) if (solid[k]!.kind !== "space") { before = solid[k]; break; }
    let after: Atom | undefined;
    for (let k = i + 1; k < solid.length; k += 1) if (solid[k]!.kind !== "space") { after = solid[k]; break; }
    if ((a.tex === "," || a.tex === ";" || a.tex === ":") && mathLike(before) && mathLike(after)) inRun.add(a);
  }
  const isMath = (a: Atom | undefined): boolean => mathLike(a) || (!!a && inRun.has(a));

  type Run = { math: boolean; parts: string[] };
  const runs: Run[] = [];
  const add = (math: boolean, part: string) => {
    const last = runs[runs.length - 1];
    if (last && last.math === math) last.parts.push(part);
    else runs.push({ math, parts: [part] });
  };
  for (let i = 0; i < solid.length; i += 1) {
    const a = solid[i]!;
    if (a.kind === "space") {
      let before: Atom | undefined;
      for (let k = i - 1; k >= 0; k -= 1) if (solid[k]!.kind !== "space") { before = solid[k]; break; }
      let after: Atom | undefined;
      for (let k = i + 1; k < solid.length; k += 1) if (solid[k]!.kind !== "space") { after = solid[k]; break; }
      if (isMath(before) && isMath(after)) add(true, " ");
      else add(false, " ");
    } else if (a.kind === "unit") add(true, `\u0001${unitTex(a.tex)}\u0002`);
    else if (a.kind === "math" && (a.tex.startsWith("(") || a.tex.startsWith("["))) {
      add(true, `\u0001${convertMath(a.tex.replace(/\s*;\s*/g, ";\\ "))}\u0002`);
    } else if (inRun.has(a)) add(true, a.tex === ";" ? ";\\ " : a.tex === "," ? ",\\ " : a.tex);
    else if (a.kind === "math") add(true, a.tex);
    else add(false, a.tex);
  }
  const rendered = runs.map((run) => {
    const joined = run.parts.join("");
    if (!run.math) return joined;
    const tex = joined
      .split(/(\u0001[^\u0002]*\u0002)/)
      .map((piece) => (piece.startsWith("\u0001") ? piece.slice(1, -1) : convertMath(piece)))
      .join("")
      .replace(/\s+/g, " ")
      .trim();
    return tex ? `$${tex}$` : joined;
  });
  return rendered.join("").replace(/\$ \$/g, " ").replace(/\s+/g, " ").trim();
}

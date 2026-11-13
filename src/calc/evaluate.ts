export type CalcMode = "deg" | "rad";

export type CalcCode = "syntax" | "div0" | "sqrt" | "log" | "tan" | "overflow" | "ans" | "domain" | "args" | "var";

export type CalcOutcome = { ok: true; value: number } | { ok: false; code: CalcCode };

/** Biến người dùng gán được. Không có e vì e là hằng số Euler. */
export const CALC_VARS = ["a", "b", "c", "d", "m", "x", "y", "z"] as const;
export type CalcVars = Partial<Record<(typeof CALC_VARS)[number], number>>;

/** Tên hàm và số đối số cho phép: [ít nhất, nhiều nhất]. */
const FUNCS: Record<string, [number, number]> = {
  sin: [1, 1], cos: [1, 1], tan: [1, 1], cot: [1, 1],
  asin: [1, 1], acos: [1, 1], atan: [1, 1], arcsin: [1, 1], arccos: [1, 1], arctan: [1, 1],
  sinh: [1, 1], cosh: [1, 1], tanh: [1, 1],
  sqrt: [1, 1], cbrt: [1, 1], root: [2, 2], abs: [1, 1], exp: [1, 1],
  ln: [1, 1], log: [1, 2],
  floor: [1, 1], ceil: [1, 1], round: [1, 2], fact: [1, 1],
  ncr: [2, 2], npr: [2, 2], gcd: [2, 8], lcm: [2, 8], mod: [2, 2], min: [1, 8], max: [1, 8],
};

class CalcFail extends Error {
  code: CalcCode;
  constructor(code: CalcCode) {
    super(code);
    this.code = code;
  }
}

type Tok =
  | { k: "num"; v: number }
  | { k: "id"; name: string }
  | { k: "op"; op: string }
  | { k: "eof" };

type Node =
  | { t: "num"; v: number }
  | { t: "name"; name: string }
  | { t: "neg"; arg: Node }
  | { t: "post"; op: "!" | "%"; arg: Node }
  | { t: "bin"; op: "+" | "-" | "*" | "/" | "^"; left: Node; right: Node }
  | { t: "call"; name: string; args: Node[] };

function isDigit(ch: string | undefined): boolean {
  return ch !== undefined && ch >= "0" && ch <= "9";
}

function isLetter(ch: string | undefined): boolean {
  return ch !== undefined && ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z"));
}

/**
 * Chữ số thập phân nhận cả dấu chấm lẫn dấu phẩy (3.5 và 3,5), nên các đối số của hàm
 * ngăn nhau bằng dấu chấm phẩy: log(2; 8), nCr(5; 2).
 */
function tokenize(source: string): Tok[] {
  const tokens: Tok[] = [];
  let i = 0;
  while (i < source.length) {
    const ch = source[i] ?? "";
    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r" || ch === " ") {
      i += 1;
      continue;
    }
    if (isDigit(ch) || ((ch === "." || ch === ",") && isDigit(source[i + 1]))) {
      const start = i;
      while (isDigit(source[i])) i += 1;
      if ((source[i] === "." || source[i] === ",") && isDigit(source[i + 1])) {
        i += 1;
        while (isDigit(source[i])) i += 1;
      } else if (source[i] === ".") {
        i += 1;
      }
      const exp = source[i];
      if ((exp === "e" || exp === "E") && (isDigit(source[i + 1]) || ((source[i + 1] === "+" || source[i + 1] === "-") && isDigit(source[i + 2])))) {
        i += 1;
        if (source[i] === "+" || source[i] === "-") i += 1;
        while (isDigit(source[i])) i += 1;
      }
      const value = Number(source.slice(start, i).replace(",", "."));
      if (!Number.isFinite(value)) throw new CalcFail("overflow");
      tokens.push({ k: "num", v: value });
      continue;
    }
    if (ch === "π") { tokens.push({ k: "id", name: "pi" }); i += 1; continue; }
    if (isLetter(ch)) {
      const start = i;
      i += 1;
      while (isLetter(source[i])) i += 1;
      tokens.push({ k: "id", name: source.slice(start, i).toLowerCase() });
      continue;
    }
    if (ch === "×" || ch === "·") { tokens.push({ k: "op", op: "*" }); i += 1; continue; }
    if (ch === "÷" || ch === ":") { tokens.push({ k: "op", op: "/" }); i += 1; continue; }
    if (ch === "−") { tokens.push({ k: "op", op: "-" }); i += 1; continue; }
    if (ch === "²" || ch === "³") {
      tokens.push({ k: "op", op: "^" }, { k: "num", v: ch === "²" ? 2 : 3 });
      i += 1;
      continue;
    }
    if ("+-*/^()!%;√".includes(ch)) { tokens.push({ k: "op", op: ch }); i += 1; continue; }
    throw new CalcFail("syntax");
  }
  tokens.push({ k: "eof" });
  return tokens;
}

function parse(tokens: Tok[]): Node {
  let at = 0;
  const peek = (): Tok => tokens[at] ?? { k: "eof" };
  const take = (): Tok => {
    const token = peek();
    at += 1;
    return token;
  };
  const opIs = (op: string): boolean => {
    const token = peek();
    return token.k === "op" && token.op === op;
  };
  function eatOp(op: string): boolean {
    if (!opIs(op)) return false;
    at += 1;
    return true;
  }
  /** Phép nhân ngầm: 2π, 3(4+1), 2sin(30), (a+b)(a−b). */
  const startsFactor = (): boolean => {
    const token = peek();
    return token.k === "num" || token.k === "id" || (token.k === "op" && (token.op === "(" || token.op === "√"));
  };

  function parseExpr(): Node {
    let node = parseTerm();
    while (opIs("+") || opIs("-")) {
      const op = (take() as { op: "+" | "-" }).op;
      node = { t: "bin", op, left: node, right: parseTerm() };
    }
    return node;
  }

  function parseTerm(): Node {
    let node = parseUnary();
    for (;;) {
      if (opIs("*") || opIs("/")) {
        const op = (take() as { op: "*" | "/" }).op;
        node = { t: "bin", op, left: node, right: parseUnary() };
      } else if (startsFactor()) {
        node = { t: "bin", op: "*", left: node, right: parsePower() };
      } else {
        return node;
      }
    }
  }

  function parseUnary(): Node {
    if (eatOp("+")) return parseUnary();
    if (eatOp("-")) return { t: "neg", arg: parseUnary() };
    return parsePower();
  }

  function parsePower(): Node {
    const base = parsePostfix();
    if (!eatOp("^")) return base;
    return { t: "bin", op: "^", left: base, right: parseUnary() };
  }

  function parsePostfix(): Node {
    let node = parsePrimary();
    for (;;) {
      if (eatOp("!")) node = { t: "post", op: "!", arg: node };
      else if (eatOp("%")) node = { t: "post", op: "%", arg: node };
      else return node;
    }
  }

  function parsePrimary(): Node {
    const token = peek();
    if (token.k === "num") {
      take();
      return { t: "num", v: token.v };
    }
    if (token.k === "id") {
      take();
      const arity = FUNCS[token.name];
      if (arity) {
        if (!eatOp("(")) throw new CalcFail("syntax");
        const args = [parseExpr()];
        while (eatOp(";")) args.push(parseExpr());
        if (!eatOp(")")) throw new CalcFail("syntax");
        if (args.length < arity[0] || args.length > arity[1]) throw new CalcFail("args");
        return { t: "call", name: token.name, args };
      }
      if (token.name === "pi" || token.name === "e" || token.name === "ans" || (CALC_VARS as readonly string[]).includes(token.name)) {
        return { t: "name", name: token.name };
      }
      throw new CalcFail("syntax");
    }
    if (eatOp("√")) return { t: "call", name: "sqrt", args: [parsePower()] };
    if (eatOp("(")) {
      const inner = parseExpr();
      if (!eatOp(")")) throw new CalcFail("syntax");
      return inner;
    }
    throw new CalcFail("syntax");
  }

  const tree = parseExpr();
  if (peek().k !== "eof") throw new CalcFail("syntax");
  return tree;
}

function singularTan(radians: number): boolean {
  const steps = radians / (Math.PI / 2);
  const nearest = Math.round(steps);
  return Math.abs(steps - nearest) < 1e-9 && Math.abs(nearest) % 2 === 1;
}

function wholeNumber(value: number): boolean {
  return Number.isFinite(value) && Math.abs(value - Math.round(value)) < 1e-9;
}

export function factorial(n: number): number {
  let out = 1;
  for (let k = 2; k <= n; k += 1) out *= k;
  return out;
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) [x, y] = [y, x % y];
  return x;
}

export function choose(n: number, k: number): number {
  const small = Math.min(k, n - k);
  let out = 1;
  for (let i = 1; i <= small; i += 1) out = (out * (n - small + i)) / i;
  return Math.round(out);
}

function callFunction(name: string, args: number[], mode: CalcMode): number {
  const x = args[0] ?? 0;
  const toRad = (value: number) => (mode === "deg" ? (value * Math.PI) / 180 : value);
  const fromRad = (value: number) => (mode === "deg" ? (value * 180) / Math.PI : value);
  switch (name) {
    case "sin": return Math.sin(toRad(x));
    case "cos": return Math.cos(toRad(x));
    case "tan":
      if (singularTan(toRad(x))) throw new CalcFail("tan");
      return Math.tan(toRad(x));
    case "cot": {
      const s = Math.sin(toRad(x));
      if (Math.abs(s) < 1e-12) throw new CalcFail("tan");
      return Math.cos(toRad(x)) / s;
    }
    case "asin": case "arcsin":
      if (x < -1 || x > 1) throw new CalcFail("domain");
      return fromRad(Math.asin(x));
    case "acos": case "arccos":
      if (x < -1 || x > 1) throw new CalcFail("domain");
      return fromRad(Math.acos(x));
    case "atan": case "arctan": return fromRad(Math.atan(x));
    case "sinh": return Math.sinh(x);
    case "cosh": return Math.cosh(x);
    case "tanh": return Math.tanh(x);
    case "sqrt":
      if (x < 0) throw new CalcFail("sqrt");
      return Math.sqrt(x);
    case "cbrt": return Math.cbrt(x);
    case "root": {
      const value = args[1] ?? 0;
      if (!wholeNumber(x) || x < 2) throw new CalcFail("domain");
      const n = Math.round(x);
      if (value < 0 && n % 2 === 0) throw new CalcFail("sqrt");
      return value < 0 ? -((-value) ** (1 / n)) : value ** (1 / n);
    }
    case "abs": return Math.abs(x);
    case "exp": return Math.exp(x);
    case "ln":
      if (x <= 0) throw new CalcFail("log");
      return Math.log(x);
    case "log": {
      if (args.length === 1) {
        if (x <= 0) throw new CalcFail("log");
        return Math.log10(x);
      }
      const value = args[1] ?? 0;
      if (x <= 0 || x === 1 || value <= 0) throw new CalcFail("log");
      return Math.log(value) / Math.log(x);
    }
    case "floor": return Math.floor(x);
    case "ceil": return Math.ceil(x);
    case "round": {
      const places = args[1] ?? 0;
      if (!wholeNumber(places) || places < 0 || places > 12) throw new CalcFail("domain");
      const scale = 10 ** Math.round(places);
      return Math.round(x * scale) / scale;
    }
    case "fact":
      if (!wholeNumber(x) || x < 0 || x > 170) throw new CalcFail("domain");
      return factorial(Math.round(x));
    case "ncr": case "npr": {
      const k = args[1] ?? 0;
      if (!wholeNumber(x) || !wholeNumber(k) || k < 0 || x < k || x > 170) throw new CalcFail("domain");
      const n = Math.round(x);
      const r = Math.round(k);
      return name === "ncr" ? choose(n, r) : Math.round(factorial(n) / factorial(n - r));
    }
    case "gcd": case "lcm": {
      if (!args.every(wholeNumber)) throw new CalcFail("domain");
      let acc = Math.abs(Math.round(x));
      for (const item of args.slice(1)) {
        const next = Math.abs(Math.round(item));
        if (name === "gcd") acc = gcd(acc, next);
        else acc = acc === 0 || next === 0 ? 0 : (acc / gcd(acc, next)) * next;
      }
      return acc;
    }
    case "mod": {
      const divisor = args[1] ?? 0;
      if (divisor === 0) throw new CalcFail("div0");
      return x - divisor * Math.floor(x / divisor);
    }
    case "min": return Math.min(...args);
    case "max": return Math.max(...args);
    default: throw new CalcFail("syntax");
  }
}

function evalNode(node: Node, mode: CalcMode, ans: number | null, vars: CalcVars): number {
  if (node.t === "num") return node.v;
  if (node.t === "name") {
    if (node.name === "pi") return Math.PI;
    if (node.name === "e") return Math.E;
    if (node.name === "ans") {
      if (ans === null || !Number.isFinite(ans)) throw new CalcFail("ans");
      return ans;
    }
    const stored = vars[node.name as keyof CalcVars];
    if (stored === undefined || !Number.isFinite(stored)) throw new CalcFail("var");
    return stored;
  }
  if (node.t === "neg") return -evalNode(node.arg, mode, ans, vars);
  if (node.t === "post") {
    const value = evalNode(node.arg, mode, ans, vars);
    if (node.op === "%") return value / 100;
    if (!wholeNumber(value) || value < 0 || value > 170) throw new CalcFail("domain");
    return factorial(Math.round(value));
  }
  if (node.t === "bin") {
    const left = evalNode(node.left, mode, ans, vars);
    const right = evalNode(node.right, mode, ans, vars);
    if (node.op === "+") return left + right;
    if (node.op === "-") return left - right;
    if (node.op === "*") return left * right;
    if (node.op === "/") {
      if (right === 0) throw new CalcFail("div0");
      return left / right;
    }
    if (left < 0 && !wholeNumber(right)) throw new CalcFail("domain");
    if (left === 0 && right < 0) throw new CalcFail("div0");
    return left ** right;
  }
  return callFunction(node.name, node.args.map((arg) => evalNode(arg, mode, ans, vars)), mode);
}

function run(tree: Node, mode: CalcMode, ans: number | null, vars: CalcVars): CalcOutcome {
  try {
    const value = evalNode(tree, mode, ans, vars);
    if (!Number.isFinite(value)) return { ok: false, code: "overflow" };
    return { ok: true, value };
  } catch (error) {
    if (error instanceof CalcFail) return { ok: false, code: error.code };
    return { ok: false, code: "syntax" };
  }
}

/** Số học phổ thông. Không gọi eval và không chạy chữ lạ. */
export function evaluate(source: string, mode: CalcMode, ans: number | null, vars: CalcVars = {}): CalcOutcome {
  try {
    return run(parse(tokenize(source.trim())), mode, ans, vars);
  } catch (error) {
    if (error instanceof CalcFail) return { ok: false, code: error.code };
    return { ok: false, code: "syntax" };
  }
}

export type CalcFunction = { ok: true; at: (x: number) => number | null } | { ok: false; code: CalcCode };

/** Biên dịch một lần biểu thức theo x để lập bảng, vẽ đồ thị, lấy đạo hàm và tích phân số. */
export function compile(source: string, mode: CalcMode, vars: CalcVars = {}): CalcFunction {
  let tree: Node;
  try {
    tree = parse(tokenize(source.trim()));
  } catch (error) {
    return { ok: false, code: error instanceof CalcFail ? error.code : "syntax" };
  }
  return {
    ok: true,
    at: (x: number) => {
      const outcome = run(tree, mode, null, { ...vars, x });
      return outcome.ok ? outcome.value : null;
    },
  };
}

/** Làm tròn để 0.1+0.2 hiện 0.3, không hiện đuôi nhị phân. */
export function formatCalc(value: number): string {
  if (!Number.isFinite(value)) return "";
  const text = Number(value.toPrecision(12)).toString();
  return text === "-0" ? "0" : text;
}

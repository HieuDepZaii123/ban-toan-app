export type CalcMode = "deg" | "rad";

export type CalcCode = "syntax" | "div0" | "sqrt" | "log" | "tan" | "overflow" | "ans";

export type CalcOutcome = { ok: true; value: number } | { ok: false; code: CalcCode };

const FUNCS = new Set(["sin", "cos", "tan", "sqrt", "abs", "ln", "log"]);

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
  | { t: "name"; name: "pi" | "e" | "ans" }
  | { t: "neg"; arg: Node }
  | { t: "bin"; op: "+" | "-" | "*" | "/" | "^"; left: Node; right: Node }
  | { t: "call"; name: string; arg: Node };

function isDigit(ch: string | undefined): boolean {
  return ch !== undefined && ch >= "0" && ch <= "9";
}

function tokenize(source: string): Tok[] {
  const tokens: Tok[] = [];
  let i = 0;
  while (i < source.length) {
    const ch = source[i] ?? "";
    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
      i += 1;
      continue;
    }
    if (isDigit(ch) || (ch === "." && isDigit(source[i + 1]))) {
      const start = i;
      while (isDigit(source[i])) i += 1;
      if (source[i] === ".") {
        i += 1;
        while (isDigit(source[i])) i += 1;
      }
      const exp = source[i];
      if ((exp === "e" || exp === "E") && (isDigit(source[i + 1]) || ((source[i + 1] === "+" || source[i + 1] === "-") && isDigit(source[i + 2])))) {
        i += 1;
        if (source[i] === "+" || source[i] === "-") i += 1;
        while (isDigit(source[i])) i += 1;
      }
      const value = Number(source.slice(start, i));
      if (!Number.isFinite(value)) throw new CalcFail("overflow");
      tokens.push({ k: "num", v: value });
      continue;
    }
    if ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z") || ch === "π") {
      if (ch === "π") {
        tokens.push({ k: "id", name: "pi" });
        i += 1;
        continue;
      }
      const start = i;
      i += 1;
      while ((source[i] ?? "") >= "A" && (source[i] ?? "") <= "Z" || (source[i] ?? "") >= "a" && (source[i] ?? "") <= "z") i += 1;
      tokens.push({ k: "id", name: (source.slice(start, i)).toLowerCase() });
      continue;
    }
    if (ch === "×") { tokens.push({ k: "op", op: "*" }); i += 1; continue; }
    if (ch === "÷") { tokens.push({ k: "op", op: "/" }); i += 1; continue; }
    if ("+-*/^()".includes(ch)) { tokens.push({ k: "op", op: ch }); i += 1; continue; }
    throw new CalcFail("syntax");
  }
  tokens.push({ k: "eof" });
  return tokens;
}

function parse(tokens: Tok[]): Node {
  let at = 0;
  const peek = () => tokens[at] ?? { k: "eof" as const };
  const take = () => {
    const token = peek();
    at += 1;
    return token;
  };
  const opIs = (op: string) => peek().k === "op" && peek().k === "op" && (peek() as { op: string }).op === op;

  function eatOp(op: string): boolean {
    if (!opIs(op)) return false;
    at += 1;
    return true;
  }

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
    while (opIs("*") || opIs("/")) {
      const op = (take() as { op: "*" | "/" }).op;
      node = { t: "bin", op, left: node, right: parseUnary() };
    }
    return node;
  }

  function parseUnary(): Node {
    if (eatOp("+")) return parseUnary();
    if (eatOp("-")) return { t: "neg", arg: parseUnary() };
    return parsePower();
  }

  function parsePower(): Node {
    const base = parsePrimary();
    if (!eatOp("^")) return base;
    return { t: "bin", op: "^", left: base, right: parseUnary() };
  }

  function parsePrimary(): Node {
    const token = peek();
    if (token.k === "num") {
      take();
      return { t: "num", v: token.v };
    }
    if (token.k === "id") {
      take();
      if (FUNCS.has(token.name)) {
        if (!eatOp("(")) throw new CalcFail("syntax");
        const arg = parseExpr();
        if (!eatOp(")")) throw new CalcFail("syntax");
        return { t: "call", name: token.name, arg };
      }
      if (token.name === "pi" || token.name === "e" || token.name === "ans") return { t: "name", name: token.name };
      throw new CalcFail("syntax");
    }
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

function evalNode(node: Node, mode: CalcMode, ans: number | null): number {
  if (node.t === "num") return node.v;
  if (node.t === "name") {
    if (node.name === "pi") return Math.PI;
    if (node.name === "e") return Math.E;
    if (ans === null || !Number.isFinite(ans)) throw new CalcFail("ans");
    return ans;
  }
  if (node.t === "neg") return -evalNode(node.arg, mode, ans);
  if (node.t === "bin") {
    const left = evalNode(node.left, mode, ans);
    const right = evalNode(node.right, mode, ans);
    if (node.op === "+") return left + right;
    if (node.op === "-") return left - right;
    if (node.op === "*") return left * right;
    if (node.op === "/") {
      if (right === 0) throw new CalcFail("div0");
      return left / right;
    }
    return left ** right;
  }
  const arg = evalNode(node.arg, mode, ans);
  if (node.name === "sqrt") {
    if (arg < 0) throw new CalcFail("sqrt");
    return Math.sqrt(arg);
  }
  if (node.name === "abs") return Math.abs(arg);
  if (node.name === "ln" || node.name === "log") {
    if (arg <= 0) throw new CalcFail("log");
    return node.name === "ln" ? Math.log(arg) : Math.log10(arg);
  }
  const radians = mode === "deg" ? (arg * Math.PI) / 180 : arg;
  if (node.name === "tan" && singularTan(radians)) throw new CalcFail("tan");
  if (node.name === "sin") return Math.sin(radians);
  if (node.name === "cos") return Math.cos(radians);
  return Math.tan(radians);
}

/** Số học phổ thông. Không gọi eval và không chạy chữ lạ. */
export function evaluate(source: string, mode: CalcMode, ans: number | null): CalcOutcome {
  try {
    const value = evalNode(parse(tokenize(source.trim())), mode, ans);
    if (!Number.isFinite(value)) return { ok: false, code: "overflow" };
    return { ok: true, value };
  } catch (error) {
    if (error instanceof CalcFail) return { ok: false, code: error.code };
    return { ok: false, code: "syntax" };
  }
}

/** Làm tròn để 0.1+0.2 hiện 0.3, không hiện đuôi nhị phân. */
export function formatCalc(value: number): string {
  if (!Number.isFinite(value)) return "";
  const text = Number(value.toPrecision(12)).toString();
  return text === "-0" ? "0" : text;
}

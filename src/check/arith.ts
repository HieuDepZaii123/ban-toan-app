/**
 * A small, safe checker for lines of working, used when the AI marker is offline (demo mode) and in tests.
 * It checks two things only:
 * - arithmetic: every side of `3·4 + 2 = 14` must have the same value;
 * - identities: a line that starts with `=` continues the line above, and a line with 3+ sides
 *   (`(x+1)^2 = x^2 + 2x + 1 = ...`) must hold for every value of the letters.
 * An equation such as `2x + 6 = 0` is a claim about x, not an identity, so it is left unchecked.
 */

type Node =
  | { k: "num"; v: number }
  | { k: "var"; name: string }
  | { k: "neg"; a: Node }
  | { k: "bin"; op: "+" | "-" | "*" | "/" | "^"; a: Node; b: Node };

type Tok = { t: "num"; v: number } | { t: "var"; name: string } | { t: "op"; v: string };

const SUPERS: Record<string, string> = { "²": "^2", "³": "^3" };

function tokenize(src: string): Tok[] | null {
  const text = src
    .replace(/[²³]/g, (ch) => SUPERS[ch] ?? ch)
    .replace(/[×·∙]/g, "*")
    .replace(/[÷:]/g, "/")
    .replace(/[−–]/g, "-")
    .replace(/\$/g, "")
    .replace(/\\cdot|\\times/g, "*")
    .replace(/(\d),(\d)/g, "$1.$2");
  const out: Tok[] = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i] as string;
    if (/\s/.test(ch)) {
      i += 1;
      continue;
    }
    const num = /^\d+(?:\.\d+)?/.exec(text.slice(i));
    if (num) {
      out.push({ t: "num", v: Number(num[0]) });
      i += num[0].length;
      continue;
    }
    if (/[a-zA-Z]/.test(ch)) {
      // Only single letters: a word (sin, log, sqrt) is beyond this checker.
      if (/[a-zA-Z]/.test(text[i + 1] ?? "")) return null;
      out.push({ t: "var", name: ch });
      i += 1;
      continue;
    }
    if ("+-*/^()".includes(ch)) {
      out.push({ t: "op", v: ch });
      i += 1;
      continue;
    }
    return null;
  }
  return out;
}

/** Recursive descent with implicit multiplication (2x, 2(x+1), (a)(b)). */
function parse(tokens: Tok[]): Node | null {
  let pos = 0;
  const peek = () => tokens[pos];
  const isOp = (v: string) => {
    const tok = peek();
    return tok?.t === "op" && tok.v === v;
  };
  function primary(): Node | null {
    const tok = peek();
    if (!tok) return null;
    if (tok.t === "num") {
      pos += 1;
      return { k: "num", v: tok.v };
    }
    if (tok.t === "var") {
      pos += 1;
      return { k: "var", name: tok.name };
    }
    if (tok.v === "(") {
      pos += 1;
      const inner = sum();
      if (!inner || !isOp(")")) return null;
      pos += 1;
      return inner;
    }
    return null;
  }
  function power(): Node | null {
    const base = primary();
    if (!base) return null;
    if (isOp("^")) {
      pos += 1;
      const exp = unary();
      if (!exp) return null;
      return { k: "bin", op: "^", a: base, b: exp };
    }
    return base;
  }
  function unary(): Node | null {
    if (isOp("-")) {
      pos += 1;
      const a = unary();
      return a ? { k: "neg", a } : null;
    }
    if (isOp("+")) {
      pos += 1;
      return unary();
    }
    return power();
  }
  function product(): Node | null {
    let left = unary();
    if (!left) return null;
    for (;;) {
      if (isOp("*") || isOp("/")) {
        const op = (peek() as { v: "*" | "/" }).v;
        pos += 1;
        const right = unary();
        if (!right) return null;
        left = { k: "bin", op, a: left, b: right };
        continue;
      }
      const tok = peek();
      if (tok && (tok.t === "num" || tok.t === "var" || (tok.t === "op" && tok.v === "("))) {
        const right = power();
        if (!right) return null;
        left = { k: "bin", op: "*", a: left, b: right };
        continue;
      }
      return left;
    }
  }
  function sum(): Node | null {
    let left = product();
    if (!left) return null;
    while (isOp("+") || isOp("-")) {
      const op = (peek() as { v: "+" | "-" }).v;
      pos += 1;
      const right = product();
      if (!right) return null;
      left = { k: "bin", op, a: left, b: right };
    }
    return left;
  }
  const tree = sum();
  return tree && pos === tokens.length ? tree : null;
}

function evaluate(node: Node, vars: Record<string, number>): number {
  switch (node.k) {
    case "num":
      return node.v;
    case "var":
      return vars[node.name] ?? Number.NaN;
    case "neg":
      return -evaluate(node.a, vars);
    case "bin": {
      const a = evaluate(node.a, vars);
      const b = evaluate(node.b, vars);
      if (node.op === "+") return a + b;
      if (node.op === "-") return a - b;
      if (node.op === "*") return a * b;
      if (node.op === "/") return a / b;
      return a ** b;
    }
  }
}

function letters(node: Node, into = new Set<string>()): Set<string> {
  if (node.k === "var") into.add(node.name);
  else if (node.k === "neg") letters(node.a, into);
  else if (node.k === "bin") {
    letters(node.a, into);
    letters(node.b, into);
  }
  return into;
}

export function parseExpr(src: string): Node | null {
  const tokens = tokenize(src);
  return tokens && tokens.length > 0 ? parse(tokens) : null;
}

function same(a: number, b: number): boolean {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
  return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));
}

const SAMPLES = [0.37, 1.91, -2.43, 3.14];

function show(value: number): string {
  return String(Number(value.toPrecision(8)));
}

/** Do two expressions agree? Numbers are compared directly, letters at several sample points. */
function agree(a: Node, b: Node): { same: boolean; left: string; right: string } {
  const names = [...letters(a), ...letters(b)];
  if (names.length === 0) {
    const left = evaluate(a, {});
    const right = evaluate(b, {});
    return { same: same(left, right), left: show(left), right: show(right) };
  }
  for (const seed of SAMPLES) {
    const vars: Record<string, number> = {};
    names.forEach((name, index) => {
      vars[name] = seed + index * 0.71;
    });
    const left = evaluate(a, vars);
    const right = evaluate(b, vars);
    // A division by zero at one sample point says nothing; try the next.
    if (!Number.isFinite(left) || !Number.isFinite(right)) continue;
    if (!same(left, right)) {
      const at = names.map((name) => `${name}=${show(vars[name] as number)}`).join(", ");
      return { same: false, left: `${show(left)} (${at})`, right: show(right) };
    }
  }
  return { same: true, left: "", right: "" };
}

export type StepCheck =
  | { kind: "ok" }
  | { kind: "wrong"; step: number; left: string; right: string }
  | { kind: "unknown" };

const LEAD = /^\s*(?:⇒|⇔|=>|->|→|\\Rightarrow|\\iff)\s*/;

export function firstWrongStep(steps: string[]): StepCheck {
  let previous: Node | null = null;
  let checkedAll = steps.length > 0;
  for (let index = 0; index < steps.length; index += 1) {
    const raw = (steps[index] ?? "").replace(LEAD, "").trim();
    const continues = raw.startsWith("=");
    const sides = raw.replace(/^=/, "").split("=").map((side) => side.trim());
    const nodes = sides.map((side) => parseExpr(side));
    if (nodes.some((node) => node === null)) {
      checkedAll = false;
      previous = null;
      continue;
    }
    const chain = (continues && previous ? [previous, ...nodes] : nodes) as Node[];
    // A bare expression with no `=` is where a chain starts: it claims nothing yet.
    if (!continues && chain.length === 1) {
      previous = chain[0] ?? null;
      continue;
    }
    const hasLetters = chain.some((node) => letters(node).size > 0);
    // `2x + 6 = 0` is an equation, not an identity: only chains and continuations are claims of equality.
    const claim = chain.length >= 2 && (!hasLetters || continues || chain.length >= 3);
    if (!claim) {
      checkedAll = false;
      previous = chain.at(-1) ?? null;
      continue;
    }
    for (let at = 1; at < chain.length; at += 1) {
      const result = agree(chain[at - 1] as Node, chain[at] as Node);
      if (!result.same) return { kind: "wrong", step: index + 1, left: result.left, right: result.right };
    }
    previous = chain.at(-1) ?? null;
  }
  return checkedAll ? { kind: "ok" } : { kind: "unknown" };
}

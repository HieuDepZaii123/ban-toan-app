/** Tiny arithmetic for Đúng / Sai / Chưa đủ. The test evaluates these, not the verdict label. */

export type Params = Record<string, number>;
export type World = Record<string, number>;

export type E =
  | { t: "n"; v: number }
  | { t: "p"; n: string }
  | { t: "w"; n: string }
  | { t: "neg" | "ln" | "exp"; a: E }
  | { t: "add" | "sub" | "mul" | "div"; a: E; b: E };

export type Pred = { c: "lt" | "le" | "gt" | "ge" | "eq" | "ne"; l: E; r: E };
export type Claim = Pred | { all: Pred[] };

export const num = (v: number): E => ({ t: "n", v });
export const par = (n: string): E => ({ t: "p", n });
export const wr = (n: string): E => ({ t: "w", n });
export const neg = (a: E): E => ({ t: "neg", a });
export const ln = (a: E): E => ({ t: "ln", a });
export const exp = (a: E): E => ({ t: "exp", a });
export const add = (a: E, b: E): E => ({ t: "add", a, b });
export const sub = (a: E, b: E): E => ({ t: "sub", a, b });
export const mul = (a: E, b: E): E => ({ t: "mul", a, b });
export const div = (a: E, b: E): E => ({ t: "div", a, b });
export const sq = (a: E): E => mul(a, a);

export const lt = (l: E, r: E): Pred => ({ c: "lt", l, r });
export const le = (l: E, r: E): Pred => ({ c: "le", l, r });
export const gt = (l: E, r: E): Pred => ({ c: "gt", l, r });
export const ge = (l: E, r: E): Pred => ({ c: "ge", l, r });
export const eq = (l: E, r: E): Pred => ({ c: "eq", l, r });
export const ne = (l: E, r: E): Pred => ({ c: "ne", l, r });

const TRUE: Pred = eq(num(1), num(1));
const FALSE: Pred = eq(num(0), num(1));

export const always = TRUE;
export const never = FALSE;
export const all = (preds: Pred[]): Claim => ({ all: preds });

const EPS = 1e-8;

export function evalE(expr: E, params: Params, world: World): number {
  if (expr.t === "n") return expr.v;
  if (expr.t === "p") {
    const value = params[expr.n];
    return typeof value === "number" ? value : Number.NaN;
  }
  if (expr.t === "w") {
    const value = world[expr.n];
    return typeof value === "number" ? value : Number.NaN;
  }
  if (expr.t === "neg") return -evalE(expr.a, params, world);
  if (expr.t === "ln") {
    const value = evalE(expr.a, params, world);
    return value > 0 ? Math.log(value) : Number.NaN;
  }
  if (expr.t === "exp") return Math.exp(evalE(expr.a, params, world));
  if (expr.t !== "add" && expr.t !== "sub" && expr.t !== "mul" && expr.t !== "div") return Number.NaN;
  const left = evalE(expr.a, params, world);
  const right = evalE(expr.b, params, world);
  if (expr.t === "add") return left + right;
  if (expr.t === "sub") return left - right;
  if (expr.t === "mul") return left * right;
  return right === 0 ? Number.NaN : left / right;
}

export function predsOf(claim: Claim): Pred[] {
  return "all" in claim ? claim.all : [claim];
}

export function holds(claim: Claim, params: Params, world: World): boolean {
  return predsOf(claim).every((pred) => holdsPred(pred, params, world));
}

function holdsPred(pred: Pred, params: Params, world: World): boolean {
  const left = evalE(pred.l, params, world);
  const right = evalE(pred.r, params, world);
  if (!Number.isFinite(left) || !Number.isFinite(right)) return false;
  if (pred.c === "lt") return left < right - EPS;
  if (pred.c === "le") return left <= right + EPS;
  if (pred.c === "gt") return left > right + EPS;
  if (pred.c === "ge") return left >= right - EPS;
  if (pred.c === "eq") return Math.abs(left - right) <= EPS;
  return Math.abs(left - right) > EPS;
}

export function worldFits(preds: readonly Pred[], params: Params, world: World): boolean {
  return preds.every((pred) => holdsPred(pred, params, world));
}

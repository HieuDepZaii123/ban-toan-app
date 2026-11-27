import { add, always, div, eq, exp, gt, ln, mul, never, num, sub, type Claim } from "./expr.ts";

/**
 * "Không liên quan": statements that use none of the problem's data, so the problem cannot be what
 * makes them true or false. Some are true on their own and some are false; either way the answer is
 * Không liên quan, which is the skill: telling what the given data bears on from what it does not.
 *
 * `claim` uses numbers only (no `par`/`wr`), which scripts/dss.test.ts checks: that is what makes
 * "uses none of the problem's data" machine-checkable. `avoid` lists the item-id prefixes of topics the
 * statement belongs to (or sits too close to), so a draw never offers one from the question's own area.
 */
export type Unrelated = {
  id: string;
  avoid: readonly string[];
  vi: string;
  en: string;
  /** What the statement says on its own, before "it uses none of the data". */
  ownVi: string;
  ownEn: string;
  claim: Claim;
};

const CALCULUS = ["deriv", "surv", "int", "lim"];

export const UNRELATED: readonly Unrelated[] = [
  {
    id: "u-log8", avoid: ["exp"],
    vi: "$\\log_2 8 = 3$.", en: "$\\log_2 8 = 3$.",
    ownVi: "Tự nó đúng vì $2^3 = 8$", ownEn: "On its own it is true, since $2^3 = 8$",
    claim: eq(div(ln(num(8)), ln(num(2))), num(3)),
  },
  {
    id: "u-log8-bad", avoid: ["exp"],
    vi: "$\\log_2 8 = 4$.", en: "$\\log_2 8 = 4$.",
    ownVi: "Tự nó sai vì $\\log_2 8 = 3$", ownEn: "On its own it is false, since $\\log_2 8 = 3$",
    claim: eq(div(ln(num(8)), ln(num(2))), num(4)),
  },
  {
    id: "u-e0", avoid: ["exp"],
    vi: "$e^0 = 1$.", en: "$e^0 = 1$.",
    ownVi: "Tự nó đúng vì mọi số khác $0$ mũ $0$ đều bằng $1$", ownEn: "On its own it is true: any non-zero number to the power $0$ is $1$",
    claim: eq(exp(num(0)), num(1)),
  },
  {
    id: "u-cos60", avoid: ["trig", "lim"],
    vi: "$\\cos 60^\\circ = \\dfrac{1}{2}$.", en: "$\\cos 60^\\circ = \\dfrac{1}{2}$.",
    ownVi: "Tự nó đúng, đây là giá trị lượng giác quen thuộc", ownEn: "On its own it is true; it is a standard value",
    claim: always,
  },
  {
    id: "u-sin90-bad", avoid: ["trig", "lim"],
    vi: "$\\sin 90^\\circ = 0$.", en: "$\\sin 90^\\circ = 0$.",
    ownVi: "Tự nó sai vì $\\sin 90^\\circ = 1$", ownEn: "On its own it is false, since $\\sin 90^\\circ = 1$",
    claim: never,
  },
  {
    id: "u-c52", avoid: ["cmb", "prob"],
    vi: "$C_5^2 = 10$.", en: "$C_5^2 = 10$.",
    ownVi: "Tự nó đúng vì $C_5^2 = \\dfrac{5 \\cdot 4}{2} = 10$", ownEn: "On its own it is true, since $C_5^2 = \\dfrac{5 \\cdot 4}{2} = 10$",
    claim: eq(div(mul(num(5), num(4)), num(2)), num(10)),
  },
  {
    id: "u-fact4-bad", avoid: ["cmb", "prob"],
    vi: "$4! = 12$.", en: "$4! = 12$.",
    ownVi: "Tự nó sai vì $4! = 24$", ownEn: "On its own it is false, since $4! = 24$",
    claim: eq(mul(mul(num(4), num(3)), mul(num(2), num(1))), num(12)),
  },
  {
    id: "u-coin", avoid: ["prob", "cmb"],
    vi: "Gieo một đồng xu cân đối, xác suất ra mặt sấp là $\\dfrac{1}{2}$.", en: "A fair coin lands tails with probability $\\dfrac{1}{2}$.",
    ownVi: "Tự nó đúng vì hai mặt có khả năng như nhau", ownEn: "On its own it is true: both faces are equally likely",
    claim: eq(div(num(1), num(2)), num(0.5)),
  },
  {
    id: "u-sum10", avoid: ["seq"],
    vi: "$1 + 2 + \\dots + 10 = 55$.", en: "$1 + 2 + \\dots + 10 = 55$.",
    ownVi: "Tự nó đúng vì tổng bằng $\\dfrac{10 \\cdot 11}{2} = 55$", ownEn: "On its own it is true, since the sum is $\\dfrac{10 \\cdot 11}{2} = 55$",
    claim: eq(div(mul(num(10), num(11)), num(2)), num(55)),
  },
  {
    id: "u-odd-bad", avoid: ["seq"],
    vi: "Cấp số cộng $1, 4, 7, \\dots$ có công sai $2$.", en: "The arithmetic sequence $1, 4, 7, \\dots$ has common difference $2$.",
    ownVi: "Tự nó sai vì công sai là $4 - 1 = 3$", ownEn: "On its own it is false, since the difference is $4 - 1 = 3$",
    claim: eq(sub(num(4), num(1)), num(2)),
  },
  {
    id: "u-angles", avoid: ["shp", "vec", "ana"],
    vi: "Tổng ba góc của một tam giác bằng $180^\\circ$.", en: "The three angles of a triangle add up to $180^\\circ$.",
    ownVi: "Tự nó đúng với mọi tam giác", ownEn: "On its own it is true for every triangle",
    claim: always,
  },
  {
    id: "u-cube-bad", avoid: ["shp"],
    vi: "Hình lập phương có $8$ cạnh.", en: "A cube has $8$ edges.",
    ownVi: "Tự nó sai: hình lập phương có $8$ đỉnh nhưng $12$ cạnh", ownEn: "On its own it is false: a cube has $8$ vertices but $12$ edges",
    claim: eq(num(12), num(8)),
  },
  {
    id: "u-perp", avoid: ["vec", "ana", "shp"],
    vi: "Hai vectơ $(1; 2)$ và $(2; -1)$ vuông góc với nhau.", en: "The vectors $(1; 2)$ and $(2; -1)$ are perpendicular.",
    ownVi: "Tự nó đúng vì tích vô hướng $1 \\cdot 2 + 2 \\cdot (-1) = 0$", ownEn: "On its own it is true, since the dot product $1 \\cdot 2 + 2 \\cdot (-1) = 0$",
    claim: eq(add(mul(num(1), num(2)), mul(num(2), num(-1))), num(0)),
  },
  {
    id: "u-const", avoid: CALCULUS,
    vi: "Hàm hằng có đạo hàm bằng $0$ tại mọi điểm.", en: "A constant function has derivative $0$ everywhere.",
    ownVi: "Tự nó đúng vì hàm hằng không thay đổi", ownEn: "On its own it is true: a constant function never changes",
    claim: always,
  },
  {
    id: "u-area-bad", avoid: CALCULUS,
    vi: "Tích phân của hằng số $3$ trên đoạn $[0; 2]$ bằng $5$.", en: "The integral of the constant $3$ over $[0; 2]$ is $5$.",
    ownVi: "Tự nó sai vì tích phân bằng $3 \\cdot 2 = 6$", ownEn: "On its own it is false, since the integral is $3 \\cdot 2 = 6$",
    claim: eq(mul(num(3), num(2)), num(5)),
  },
  {
    id: "u-am", avoid: ["ineq"],
    vi: "Với hai số $2$ và $8$, trung bình cộng $5$ lớn hơn trung bình nhân $4$.", en: "For $2$ and $8$, the arithmetic mean $5$ exceeds the geometric mean $4$.",
    ownVi: "Tự nó đúng vì $5 > 4$", ownEn: "On its own it is true, since $5 > 4$",
    claim: gt(div(add(num(2), num(8)), num(2)), num(4)),
  },
  {
    id: "u-root4", avoid: ["quad", "ineq"],
    vi: "Phương trình $u^2 = 4$ có đúng một nghiệm.", en: "The equation $u^2 = 4$ has exactly one solution.",
    ownVi: "Tự nó sai vì phương trình có hai nghiệm $u = \\pm 2$", ownEn: "On its own it is false: the solutions are $u = \\pm 2$",
    claim: never,
  },
];

/** The topic prefix of a DSS item id, e.g. "quad" for "quad-d-hk". */
export function areaOf(itemId: string): string {
  return itemId.split("-")[0] ?? itemId;
}

/** Unrelated statements allowed for this item: none from its own or a neighbouring topic. */
export function unrelatedFor(itemId: string): Unrelated[] {
  const area = areaOf(itemId);
  return UNRELATED.filter((item) => !item.avoid.includes(area));
}

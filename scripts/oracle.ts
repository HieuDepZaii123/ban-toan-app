/**
 * Correct choice for one draw, computed without the generators.
 * Formatters come from stem.ts. The arithmetic comes from math.ts or a second formula.
 */
import {
  aboutMoney,
  atX,
  celsius,
  cm3,
  dec1,
  frac,
  joinAnd,
  mathDec,
  metres,
  metres2,
  piFrac,
  point,
  point3,
  pointSemi,
  radFrac,
  seconds,
  texInt,
} from "../src/content/vary/stem.ts";
import {
  amGm,
  apex,
  arrange,
  arithSum,
  arithTerm,
  bayes,
  bouncePath,
  cauchyPair,
  comb,
  compoundAmount,
  decayMass,
  det2,
  geomInfinite,
  geomTerm,
  lineDist,
  lineFoot2,
  medianOf,
  planeDist,
  pyramidVolume,
  savingsSum,
  secantSlope,
  solve2,
  tetraVolume,
  triArea,
  vec3Dot,
  vec3Len,
  yearsToDouble,
} from "../src/lib/math.ts";

export type Choice = { vi: string; en: string };

const FIXED: Record<string, Choice> = {
  "quad-delta": {
    vi: "Parabol tiếp xúc trục Ox tại đúng một điểm",
    en: "The parabola touches the x-axis at exactly one point",
  },
  "ineq-equal": { vi: "Khi a = b", en: "When a = b" },
  "trig-max": { vi: String.raw`$\sqrt{2}$`, en: String.raw`$\sqrt{2}$` },
  "trig-id": { vi: String.raw`$1$`, en: String.raw`$1$` },
  "lim-sinc": { vi: String.raw`$1$`, en: String.raw`$1$` },
  "surv-flat": { vi: "Không có cực trị", en: "No extremum" },
  "vec-cross": { vi: String.raw`$(0;\ 0;\ 1)$`, en: String.raw`$(0;\ 0;\ 1)$` },
};

type Exact = { coef: number; rad: number | null; den: number };

const EXACT: Record<number, { sin: Exact; cos: Exact }> = {
  30: { sin: { coef: 1, rad: null, den: 2 }, cos: { coef: 1, rad: 3, den: 2 } },
  60: { sin: { coef: 1, rad: 3, den: 2 }, cos: { coef: 1, rad: null, den: 2 } },
  120: { sin: { coef: 1, rad: 3, den: 2 }, cos: { coef: -1, rad: null, den: 2 } },
  150: { sin: { coef: 1, rad: null, den: 2 }, cos: { coef: -1, rad: 3, den: 2 } },
  210: { sin: { coef: -1, rad: null, den: 2 }, cos: { coef: -1, rad: 3, den: 2 } },
  240: { sin: { coef: -1, rad: 3, den: 2 }, cos: { coef: -1, rad: null, den: 2 } },
  300: { sin: { coef: -1, rad: 3, den: 2 }, cos: { coef: 1, rad: null, den: 2 } },
  330: { sin: { coef: -1, rad: null, den: 2 }, cos: { coef: 1, rad: 3, den: 2 } },
};

const CIRCLE_VI = ["Nằm ngoài", "Nằm trên", "Nằm trong", "Là tâm"];
const CIRCLE_EN = ["Outside", "On the circle", "Inside", "It is the centre"];

function both(text: string): Choice {
  return { vi: text, en: text };
}

function num(id: string, params: Record<string, number>, key: string): number {
  const value = params[key];
  if (value === undefined || !Number.isFinite(value)) throw new Error(`${id}:${key}`);
  return value;
}

function root2(multiple: number): string {
  return multiple === 1 ? radFrac(1, 2, 1) : radFrac(multiple, 2, 1);
}

function root3(multiple: number): string {
  return multiple === 1 ? radFrac(1, 3, 1) : radFrac(multiple, 3, 1);
}

function showExact(value: Exact): string {
  return radFrac(value.coef, value.rad, value.den);
}

function power(base: number, exp: number): number {
  let value = 1;
  for (let i = 0; i < exp; i += 1) value *= base;
  return value;
}

/** Correct Vietnamese and English choice for this parameter draw. */
export function expectCorrect(id: string, params: Record<string, number>): Choice {
  const fixed = FIXED[id];
  if (fixed) return fixed;
  const n = (key: string) => num(id, params, key);
  switch (id) {
    case "quad-vertex": {
      const h = n("h");
      const k = n("k");
      const b = -2 * h;
      const c = h * h + k;
      const x = -b / 2;
      const y = x * x + b * x + c;
      return { vi: point(x, y, "vi"), en: point(x, y, "en") };
    }
    case "quad-roots": {
      const r = n("r");
      const s = n("s");
      const sum = r + s;
      const disc = (s - r) * (s - r);
      const span = Math.sqrt(disc);
      const lo = Math.round((sum - span) / 2);
      const hi = Math.round((sum + span) / 2);
      return { vi: `$x = ${lo}$ và $x = ${hi}$`, en: `$x = ${lo}$ and $x = ${hi}$` };
    }
    case "quad-range": {
      const k = n("k");
      return { vi: `$(-\\infty; ${k}]$`, en: `$(-\\infty, ${k}]$` };
    }
    case "quad-fence": {
      const p = n("p");
      const x = p / 4;
      return both(metres2(x * (p - 2 * x)));
    }
    case "quad-cost": {
      const a = n("a");
      const h = n("h");
      const m = n("m");
      const b = -2 * a * h;
      const c = a * h * h + m;
      const value = a * h * h + b * h + c;
      return { vi: atX(value, h, "vi"), en: atX(value, h, "en") };
    }
    case "ineq-am": {
      const pair = amGm(n("a"), n("b"));
      if (!pair) throw new Error(id);
      const gm = Math.round(pair.gm);
      return {
        vi: joinAnd(dec1(pair.am, "vi"), dec1(gm, "vi"), "vi"),
        en: joinAnd(dec1(pair.am, "en"), dec1(gm, "en"), "en"),
      };
    }
    case "ineq-split": {
      const s = n("s");
      let best = 0;
      for (let t = 1; t < s; t += 1) best = Math.max(best, t * (s - t));
      return both(String(best));
    }
    case "ineq-cauchy": {
      const got = cauchyPair(n("a"), n("b"), n("c"), n("d"));
      return both(`$${got.left} \\ge ${got.right}$`);
    }
    case "ineq-lp": {
      const p = n("p");
      const q = n("q");
      const verts: [number, number][] = [[0, 0], [8, 0], [6, 4], [0, 10]];
      let best = -1;
      let bx = 0;
      let by = 0;
      for (const vert of verts) {
        const x = vert[0];
        const y = vert[1];
        const value = p * x + q * y;
        if (value > best) {
          best = value;
          bx = x;
          by = y;
        }
      }
      return { vi: `${best} tại (${bx}; ${by})`, en: `${best} at (${bx}; ${by})` };
    }
    case "ineq-flip":
      return both(`$x \\ge ${-n("k")}$`);
    case "exp-power":
      return both(texInt(power(n("a"), n("b"))));
    case "exp-log": {
      const base = n("a");
      const target = power(base, n("k"));
      let arg = 1;
      let exp = 0;
      while (arg < target) {
        arg *= base;
        exp += 1;
      }
      return both(texInt(exp));
    }
    case "exp-sum":
      return both(`$\\log ${n("m") * n("n")}$`);
    case "exp-compound": {
      const grown = compoundAmount(n("r"), n("t"), n("p"));
      return { vi: aboutMoney(grown, "vi"), en: aboutMoney(grown, "en") };
    }
    case "exp-double": {
      const years = Math.round(yearsToDouble(n("r")));
      return { vi: `Khoảng ${years} năm`, en: `About ${years} years` };
    }
    case "exp-decay": {
      const left = Math.round(decayMass(n("k") * n("h"), n("m"), n("h")));
      return both(`${left} g`);
    }
    case "seq-term":
      return both(texInt(arithTerm(n("u"), n("d"), n("n"))));
    case "seq-sum":
      return both(texInt(arithSum(n("u"), n("d"), n("n"))));
    case "seq-geom":
      return both(texInt(geomTerm(n("u"), n("q"), n("n"))));
    case "seq-infinite": {
      const sum = geomInfinite(n("u"), 1 / 2);
      if (sum === null) throw new Error(id);
      return both(texInt(sum));
    }
    case "seq-bounce": {
      const total = bouncePath(n("h"), 1 / 2);
      if (total === null) throw new Error(id);
      return both(`${total} m`);
    }
    case "seq-save":
      return both(`${savingsSum(n("n"))} triệu`);
    case "trig-sin": {
      const row = EXACT[n("deg")];
      if (!row) throw new Error(id);
      return both(showExact(row.sin));
    }
    case "trig-cos": {
      const row = EXACT[n("deg")];
      if (!row) throw new Error(id);
      return both(showExact(row.cos));
    }
    case "trig-tree": {
      const d = n("d");
      const eye = n("eye");
      const body = (lang: "vi" | "en") => `$\\dfrac{${d}\\sqrt{3}}{3} + ${mathDec(eye, lang)}\\text{ m}$`;
      return { vi: body("vi"), en: body("en") };
    }
    case "trig-point": {
      const turn = ((n("deg") % 360) + 360) % 360;
      const x = turn === 0 ? 1 : turn === 180 ? -1 : 0;
      const y = turn === 90 ? 1 : turn === 270 ? -1 : 0;
      return { vi: String.raw`$(${x};\ ${y})$`, en: `$(${x}, ${y})$` };
    }
    case "lim-hole":
    case "lim-assign":
      return both(texInt(2 * n("a")));
    case "lim-jump":
      return { vi: "Không tồn tại", en: "Does not exist" };
    case "lim-cont": {
      const a = n("a");
      return {
        vi: `Có, vì giới hạn bằng giá trị tại ${a}`,
        en: `Yes, because the limit equals the value at ${a}`,
      };
    }
    case "lim-tea":
      return both(celsius(n("room")));
    case "deriv-slope": {
      const p = n("p");
      const slope = Math.round(((p + 1e-4) ** 2 - p ** 2) / 1e-4);
      return both(texInt(slope));
    }
    case "deriv-secant": {
      const a = n("a");
      const coef = secantSlope(a, 1) - 1;
      return both(`$${coef} + h$`);
    }
    case "deriv-time":
      return both(seconds(apex(n("v")).t));
    case "deriv-height":
      return both(metres(apex(n("v")).h));
    case "deriv-cubic": {
      const s = Math.round(Math.sqrt(n("p")));
      return { vi: `$x = ${-s}$ và $x = ${s}$`, en: `$x = ${-s}$ and $x = ${s}$` };
    }
    case "deriv-interval": {
      const h = n("h");
      const m = n("m");
      const y = (x: number) => x * x - 2 * h * x;
      let bestX = 0;
      let bestY = -Infinity;
      for (const x of [0, h, m]) {
        const value = y(x);
        if (value > bestY) {
          bestY = value;
          bestX = x;
        }
      }
      return { vi: atX(bestY, bestX, "vi"), en: atX(bestY, bestX, "en") };
    }
    case "deriv-brake": {
      const v = n("v");
      const a = n("a");
      const t = v / a;
      return both(metres(v * t - (a * t * t) / 2));
    }
    case "surv-max": {
      const p = n("p");
      const s = Math.round(Math.sqrt(p));
      const value = (-s) ** 3 - 3 * p * -s;
      return { vi: atX(value, -s, "vi"), en: atX(value, -s, "en") };
    }
    case "surv-min": {
      const p = n("p");
      const s = Math.round(Math.sqrt(p));
      const value = s ** 3 - 3 * p * s;
      return { vi: atX(value, s, "vi"), en: atX(value, s, "en") };
    }
    case "surv-roots": {
      const s = Math.round(Math.sqrt(n("p")));
      const list = `${radFrac(-s, 3, 1)}, $0$, ${radFrac(s, 3, 1)}`;
      return both(list);
    }
    case "surv-mono": {
      const s = n("p") === 0 ? 0 : Math.round(Math.sqrt(n("p")));
      return {
        vi: `$(-\\infty; -${s}]$ và $[${s}; +\\infty)$`,
        en: `$(-\\infty; -${s}]$ and $[${s}; +\\infty)$`,
      };
    }
    case "surv-cross": {
      const a = n("a");
      return {
        vi: `Không, vì x = ${a} không thuộc tập xác định`,
        en: `No, because x = ${a} is not in the domain`,
      };
    }
    case "int-area":
      return both(frac(6 * n("a") - 8, 3));
    case "int-sign":
      return both(frac(-(6 * n("a") - 8), 3));
    case "int-gap": {
      const degree = n("n");
      return both(frac(degree + 1 - 2, 2 * (degree + 1)));
    }
    case "int-volume":
      return both(piFrac(n("b") ** 5, 30));
    case "int-riemann": {
      const b = n("b");
      const mid = b / 2;
      const height = b * mid - mid * mid;
      return both(frac(Math.round(b * height * 4), 4));
    }
    case "int-cone": {
      const body = piFrac(n("r") ** 2 * n("h"), 3).slice(1, -1);
      return both(cm3(body));
    }
    case "prob-dice": {
      const faces = n("n");
      let remain = 0;
      for (let i = 1; i <= faces; i += 1) {
        for (let j = 1; j <= faces; j += 1) {
          if (i === faces || j === faces) remain += 1;
        }
      }
      return both(frac(1, remain));
    }
    case "prob-count": {
      const faces = n("n");
      let remain = 0;
      for (let i = 1; i <= faces; i += 1) {
        for (let j = 1; j <= faces; j += 1) {
          if (i === faces || j === faces) remain += 1;
        }
      }
      return both(texInt(remain));
    }
    case "prob-boys":
      return both(frac(1, 2 ** n("n") - 1));
    case "prob-bayes": {
      const got = bayes(n("prev"), n("sens"), n("fp"), n("pop"));
      const tp = Math.round(got.tp);
      const fp = Math.round(got.fp);
      return both(frac(tp, tp + fp));
    }
    case "prob-binom":
      return both(frac(comb(n("n"), n("k")), 2 ** n("n")));
    case "prob-least":
      return both(frac(2 ** n("n") - 1, 2 ** n("n")));
    case "vec-len":
      return both(texInt(Math.round(vec3Len([n("x"), n("y"), n("z")]))));
    case "vec-dot":
      return both(texInt(vec3Dot([n("x1"), n("y1"), n("z1")], [n("x2"), n("y2"), n("z2")])));
    case "vec-sum":
      return both(point3(n("x1") + n("x2"), n("y1") + n("y2"), n("z1") + n("z2")));
    case "vec-det":
      return both(texInt(det2(n("a"), n("b"), n("c"), n("d"))));
    case "vec-sys": {
      const x = n("x");
      const y = n("y");
      const solved = solve2(2, 1, 2 * x + y, 1, -1, x - y);
      if (!solved) throw new Error(id);
      return both(`$x = ${solved.x}$, $y = ${solved.y}$`);
    }
    case "ana-dist": {
      const multiple = Math.round(lineDist(1, 1, -n("s"), n("p"), n("q")) / Math.SQRT2);
      return both(root2(multiple));
    }
    case "ana-foot": {
      const foot = lineFoot2(1, 1, -n("s"), n("p"), n("q"));
      return both(pointSemi(Math.round(foot.x), Math.round(foot.y)));
    }
    case "ana-plane": {
      const multiple = Math.round(planeDist(1, 1, 1, -n("s"), n("x"), n("y"), n("z")) / Math.sqrt(3));
      return both(root3(multiple));
    }
    case "ana-dir":
      return both(pointSemi(n("b"), -n("a")));
    case "ana-circle":
    case "ana-on": {
      const x = n("x");
      const y = n("y");
      const radius = n("r");
      const kind = x === 0 && y === 0 ? 3 : x * x + y * y === radius * radius ? 1 : x * x + y * y > radius * radius ? 0 : 2;
      return { vi: CIRCLE_VI[kind] ?? "", en: CIRCLE_EN[kind] ?? "" };
    }
    case "shp-tri":
      return both(String(triArea(n("b"), n("h"))));
    case "shp-right":
      return both(String(triArea(n("a"), n("b"))));
    case "shp-box":
      return both(String(n("l") * n("w") * n("h")));
    case "shp-pyr":
      return both(String(pyramidVolume(n("s"), n("h"))));
    case "shp-tet": {
      const coef = Math.round(tetraVolume(n("a")) / Math.SQRT2);
      return both(radFrac(coef, 2, 1));
    }
    case "shp-sim":
      return both(String(n("k") * n("k")));
    case "cmb-perm":
      return both(String(arrange(n("n"), 2)));
    case "cmb-comb":
      return both(String(comb(n("n"), 2)));
    case "cmb-fact":
      return both(String(arrange(n("n"), n("n"))));
    case "cmb-mean":
      return both(String(medianOf([n("a"), n("a") + n("d"), n("a") + 2 * n("d"), n("a") + 3 * n("d"), n("m")])));
    case "cmb-comm":
      return both(String(comb(n("n"), 3)));
    case "cmb-order":
      return both(String(arrange(n("n"), n("n"))));
    default:
      throw new Error(id);
  }
}

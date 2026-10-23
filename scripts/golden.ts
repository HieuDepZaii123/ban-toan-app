/**
 * Hand-computed numbers. The expected value is written out, not taken from a second helper.
 *   tsx scripts/golden.ts
 */
import { amGm, archIntegral, arrange, bayes, binom, boxVolume, cauchyPair, comb, det2, diceCondition, fence, lineDist, lineFoot2, meanOf, medianOf, pyramidVolume, secantSlope, solve2, tetraVolume, triArea, vec3Cross, vec3Dot, vec3Len, workshopProfit } from "../src/lib/math.ts";

const fails: string[] = [];

function assert(cond: boolean, message: string): void {
  if (!cond) fails.push(message);
}

function near(actual: number, expected: number, message: string): void {
  if (!Number.isFinite(actual) || Math.abs(actual - expected) > 1e-9) fails.push(`${message}: got ${actual}, want ${expected}`);
}

const means = amGm(4, 9);
near(means?.am ?? NaN, (4 + 9) / 2, "AM of 4 and 9");
near(means?.gm ?? NaN, 6, "GM of 4 and 9 is √36");
assert(amGm(0, 9) === null, "AM–GM refuses 0");

near(fence(10).area, 10 * (40 - 20), "fence area at x = 10");
near(secantSlope(1, 0.5), 2.5, "secant of x² through 1 and 1.5");
near(archIntegral(2), 4 / 3, "∫₀² (2x − x²) dx");

near(vec3Len([2, 1, 2]), 3, "|(2,1,2)|");
near(vec3Dot([1, 2, -1], [2, -1, 0]), 0, "perpendicular dot");
const cross = vec3Cross([2, 1, 2], [1, -1, 2]);
assert(cross[0] === 4 && cross[1] === -2 && cross[2] === -3, "cross (4,−2,−3)");

near(det2(2, 1, 1, -1), -3, "det");
const solved = solve2(2, 1, 5, 1, -1, 1);
near(solved?.x ?? NaN, 2, "system x");
near(solved?.y ?? NaN, 1, "system y");

near(lineDist(1, 1, -2, 3, 1), Math.SQRT2, "line distance");
const foot = lineFoot2(1, 1, -2, 3, 1);
near(foot.x, 2, "foot x");
near(foot.y, 0, "foot y");

near(triArea(6, 4), 12, "triangle area");
near(boxVolume(3, 4, 5), 60, "box volume");
near(pyramidVolume(6, 4), 48, "pyramid volume");
near(tetraVolume(6), (216 * Math.SQRT2) / 12, "tetra volume 18√2");

assert(arrange(5, 2) === 20, "A(5,2)");
assert(comb(5, 2) === 10, "C(5,2)");
assert(comb(8, 3) === 56, "C(8,3)");
near(meanOf([2, 3, 4, 5, 20]), 34 / 5, "mean after the outlier");
assert(medianOf([2, 3, 4, 5, 20]) === 4, "median stays 4");

const cauchy = cauchyPair(1, 2, 3, 4);
near(cauchy.left, 125, "cauchy left");
near(cauchy.right, 121, "cauchy right");
near(workshopProfit(6, 4), 42, "workshop profit");

const dice = diceCondition(6);
assert(dice.remain === 11 && dice.both === 1, "dice condition");
const town = bayes(1, 99, 5);
near(town.tp, 99, "true positives");
near(town.fp, 495, "false positives");
near(town.posterior, 99 / 594, "posterior 1/6");
near(binom(3, 2, 0.5), 3 / 8, "two heads");

if (fails.length > 0) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log("golden ok");

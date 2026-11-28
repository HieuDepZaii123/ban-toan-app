/**
 * Đúng / Sai / Chưa đủ: the grid, not the label, decides each verdict.
 * Sai needs a fitting counterexample. Chưa đủ needs two fitting worlds that disagree.
 * Không liên quan statements (./unrelated.ts) must use none of the problem's data: their claims hold no
 * parameter or unknown, so no value the problem could give can change them.
 * Run with: tsx scripts/dss.test.ts
 */
import { analyticDssItems } from "../src/content/vary/dss/analytic.ts";
import { comboDssItems } from "../src/content/vary/dss/combo.ts";
import { derivativeDssItems } from "../src/content/vary/dss/derivative.ts";
import { expDssItems } from "../src/content/vary/dss/exp.ts";
import { holds, worldFits } from "../src/content/vary/dss/expr.ts";
import { ineqDssItems } from "../src/content/vary/dss/ineq.ts";
import { integralDssItems } from "../src/content/vary/dss/integral.ts";
import { classify, drawFacts, grid, type DssItem } from "../src/content/vary/dss/item.ts";
import { limitDssItems } from "../src/content/vary/dss/limit.ts";
import { probabilityDssItems } from "../src/content/vary/dss/probability.ts";
import { quadraticDssItems } from "../src/content/vary/dss/quadratic.ts";
import { sequenceDssItems } from "../src/content/vary/dss/sequence.ts";
import { surveyDssItems } from "../src/content/vary/dss/survey.ts";
import { triangleDssItems } from "../src/content/vary/dss/triangle.ts";
import { trigDssItems } from "../src/content/vary/dss/trig.ts";
import { vectorDssItems } from "../src/content/vary/dss/vector.ts";
import { areaOf, UNRELATED } from "../src/content/vary/dss/unrelated.ts";
import type { Claim, E } from "../src/content/vary/dss/expr.ts";
import { mulberry32 } from "../src/lib/prng.ts";
import { BARE, MARK, mathProblems } from "./testkit.ts";

const SEEDS = 200;
const fails: string[] = [];

function assert(cond: boolean, message: string): void {
  if (!cond && fails.length < 40) fails.push(message);
}

function checkTex(label: string, text: string): void {
  for (const problem of mathProblems(label, text)) assert(false, problem);
}

const banks: readonly (readonly DssItem[])[] = [
  quadraticDssItems,
  ineqDssItems,
  expDssItems,
  sequenceDssItems,
  trigDssItems,
  limitDssItems,
  derivativeDssItems,
  surveyDssItems,
  integralDssItems,
  vectorDssItems,
  analyticDssItems,
  triangleDssItems,
  comboDssItems,
  probabilityDssItems,
];

/** True when the expression reads a parameter or an unknown of the problem. */
function readsData(expr: E): boolean {
  if (expr.t === "p" || expr.t === "w") return true;
  if (expr.t === "n") return false;
  if (expr.t === "neg" || expr.t === "ln" || expr.t === "exp") return readsData(expr.a);
  if (expr.t === "add" || expr.t === "sub" || expr.t === "mul" || expr.t === "div") return readsData(expr.a) || readsData(expr.b);
  return true;
}
function claimReadsData(claim: Claim): boolean {
  const preds = "all" in claim ? claim.all : [claim];
  return preds.some((pred) => readsData(pred.l) || readsData(pred.r));
}

const areas = new Set(banks.flatMap((bank) => bank.map((item) => areaOf(item.id))));
assert(new Set(UNRELATED.map((item) => item.id)).size === UNRELATED.length, "duplicate unrelated ids");
assert(new Set(UNRELATED.map((item) => item.vi)).size === UNRELATED.length, "duplicate unrelated statements");
for (const item of UNRELATED) {
  assert(!claimReadsData(item.claim), `${item.id} reads the problem's data, so it is not unrelated`);
  assert(item.avoid.length > 0 && item.avoid.every((area) => areas.has(area)), `${item.id} avoids an unknown topic`);
  const vi = `${item.vi} ${item.ownVi}`;
  assert(MARK.test(vi), `${item.id} Vietnamese copy has no diacritics`);
  assert(!BARE.test(vi), `${item.id} has an undiacritised Vietnamese word`);
  for (const blob of [item.vi, item.en, item.ownVi, item.ownEn]) checkTex(item.id, blob);
}
for (const area of areas) {
  assert(UNRELATED.filter((item) => !item.avoid.includes(area)).length >= 8, `${area} has fewer than 8 unrelated statements to draw from`);
}

let items = 0;
for (const bank of banks) {
  assert(bank.length === 3, `topic pool ${bank[0]?.id ?? "?"} is not 3 items`);
  for (const item of bank) {
    items += 1;
    const counts = { dung: 0, sai: 0, thieu: 0, khong: 0 };
    for (const fact of item.facts) counts[fact.verdict] += 1;
    assert(counts.khong === 0, `${item.id} labels its own statement Không liên quan; those come from unrelated.ts`);
    assert(item.facts.length >= 8, `${item.id} pool ${item.facts.length}`);
    assert(counts.dung > 0 && counts.sai > 0 && counts.thieu > 0, `${item.id} missing a verdict`);
    assert(new Set(item.facts.map((fact) => fact.vi)).size === item.facts.length, `${item.id} duplicate Vietnamese statements`);
    assert(new Set(item.facts.map((fact) => fact.en)).size === item.facts.length, `${item.id} duplicate English statements`);
    for (const params of item.rows) {
      const worlds = grid(item, params);
      assert(worlds.length > 0, `${item.id} empty grid ${JSON.stringify(params)}`);
      const blobs = [item.context(params), item.contextEn(params), item.hint, item.hintEn];
      for (const fact of item.facts) blobs.push(fact.vi, fact.en, fact.reasonVi(params), fact.reasonEn(params));
      const vi = blobs.filter((_, index) => index % 2 === 0).join(" ");
      assert(MARK.test(vi), `${item.id} Vietnamese copy has no diacritics`);
      assert(!BARE.test(vi), `${item.id} has an undiacritised Vietnamese word`);
      for (const blob of blobs) checkTex(item.id, blob);
      for (const fact of item.facts) {
        const got = classify(fact.claim, params, worlds);
        assert(got === fact.verdict, `${fact.id} grid says ${got}, label ${fact.verdict} at ${JSON.stringify(params)}`);
        if (fact.verdict === "sai") {
          const counter = fact.counter?.(params);
          assert(counter !== undefined, `${fact.id} has no counterexample`);
          if (!counter) continue;
          assert(worldFits(item.fits(params), params, counter), `${fact.id} counterexample leaves the given data`);
          assert(!holds(fact.claim, params, counter), `${fact.id} counterexample still satisfies the statement`);
        }
        if (fact.verdict === "thieu") {
          const yes = fact.yes?.(params);
          const no = fact.no?.(params);
          assert(yes !== undefined && no !== undefined, `${fact.id} is missing a disagreeing pair`);
          if (!yes || !no) continue;
          assert(worldFits(item.fits(params), params, yes), `${fact.id} yes-case leaves the given data`);
          assert(worldFits(item.fits(params), params, no), `${fact.id} no-case leaves the given data`);
          assert(holds(fact.claim, params, yes), `${fact.id} yes-case does not make the statement true`);
          assert(!holds(fact.claim, params, no), `${fact.id} no-case still makes the statement true`);
        }
      }
    }
    let thin = 0;
    let withUnrelated = 0;
    const joins = new Set<string>();
    for (let seed = 1; seed <= SEEDS; seed += 1) {
      const drawn = drawFacts(item, mulberry32(seed));
      joins.add(drawn.facts.map((fact) => fact.id).join("|"));
      if (!drawn.facts.some((fact) => fact.verdict === "thieu")) thin += 1;
      const extra = drawn.facts.filter((fact) => fact.verdict === "khong");
      assert(extra.length <= 1, `${item.id}#${seed} drew ${extra.length} Không liên quan statements`);
      if (extra.length > 0) withUnrelated += 1;
      for (const fact of extra) {
        const source = UNRELATED.find((entry) => entry.id === fact.id);
        assert(source !== undefined && !source.avoid.includes(areaOf(item.id)), `${item.id}#${seed} drew ${fact.id} from its own topic`);
        checkTex(fact.id, fact.reasonVi(drawn.params));
        checkTex(fact.id, fact.reasonEn(drawn.params));
      }
      assert(new Set(drawn.facts.map((fact) => fact.vi)).size === 4, `${item.id}#${seed} statements repeat`);
    }
    assert(thin === 0, `${item.id} drew ${thin} sets with no Chưa đủ`);
    // Sometimes, not always: about 40% of draws, so a student cannot count on one being there.
    assert(withUnrelated > SEEDS * 0.25 && withUnrelated < SEEDS * 0.55, `${item.id} drew Không liên quan in ${withUnrelated}/${SEEDS} sets`);
    assert(joins.size > 1, `${item.id} never changed its four statements`);
    const canonical = drawFacts(item, () => 0);
    assert(canonical.facts.some((fact) => fact.verdict === "thieu"), `${item.id} canonical draw has no Chưa đủ`);
    assert(!canonical.facts.some((fact) => fact.verdict === "khong"), `${item.id} canonical draw changed: it has a Không liên quan`);
  }
}

assert(items === 42, `expected 42 items, saw ${items}`);
assert(banks.length === 14, `expected 14 topics, saw ${banks.length}`);

if (fails.length > 0) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log(`dss ok (${items} items, ${SEEDS} seeds, ${UNRELATED.length} unrelated statements)`);

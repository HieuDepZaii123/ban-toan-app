/**
 * Đúng / Sai / Chưa đủ: the grid, not the label, decides each verdict.
 * Sai needs a fitting counterexample. Chưa đủ needs two fitting worlds that disagree.
 * Run with: tsx scripts/dss.test.ts
 */
import katex from "katex";
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
import { mulberry32 } from "../src/lib/prng.ts";

const MARK = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const BARE = /\b(khong|duoc|dinh|nghiem|phuong trinh|ham so)\b/i;
const SEEDS = 200;
const fails: string[] = [];

function assert(cond: boolean, message: string): void {
  if (!cond && fails.length < 40) fails.push(message);
}

function checkTex(label: string, text: string): void {
  const re = /\$([^$]+)\$/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    const tex = match[1] ?? "";
    try {
      katex.renderToString(tex, { throwOnError: true });
    } catch (error) {
      assert(false, `${label} KaTeX: ${tex} (${error instanceof Error ? error.message : "fail"})`);
    }
    assert(!MARK.test(tex), `${label} unicode in math: ${tex.slice(0, 160)}`);
  }
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

let items = 0;
for (const bank of banks) {
  assert(bank.length === 3, `topic pool ${bank[0]?.id ?? "?"} is not 3 items`);
  for (const item of bank) {
    items += 1;
    const counts = { dung: 0, sai: 0, thieu: 0 };
    for (const fact of item.facts) counts[fact.verdict] += 1;
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
    const joins = new Set<string>();
    for (let seed = 1; seed <= SEEDS; seed += 1) {
      const drawn = drawFacts(item, mulberry32(seed));
      joins.add(drawn.facts.map((fact) => fact.id).join("|"));
      if (!drawn.facts.some((fact) => fact.verdict === "thieu")) thin += 1;
      assert(new Set(drawn.facts.map((fact) => fact.vi)).size === 4, `${item.id}#${seed} statements repeat`);
    }
    assert(thin === 0, `${item.id} drew ${thin} sets with no Chưa đủ`);
    assert(joins.size > 1, `${item.id} never changed its four statements`);
    const canonical = drawFacts(item, () => 0);
    assert(canonical.facts.some((fact) => fact.verdict === "thieu"), `${item.id} canonical draw has no Chưa đủ`);
  }
}

assert(items === 42, `expected 42 items, saw ${items}`);
assert(banks.length === 14, `expected 14 topics, saw ${banks.length}`);

if (fails.length > 0) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log(`dss ok (${items} items, ${SEEDS} seeds)`);

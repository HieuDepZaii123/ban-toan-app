/**
 * Every concept pool: each combination has one true statement, distinct choices, and KaTeX.
 * Truth values come from scripts/concept_sympy.py, not from the ok flag alone.
 * Run with: tsx scripts/concept.test.ts
 */
import { execFileSync } from "node:child_process";
import katex from "katex";
import { analyticPools } from "../src/content/vary/concept/analytic.ts";
import { comboPools } from "../src/content/vary/concept/combo.ts";
import { derivativePools } from "../src/content/vary/concept/derivative.ts";
import { expPools } from "../src/content/vary/concept/exp.ts";
import { ineqPools } from "../src/content/vary/concept/ineq.ts";
import { integralPools } from "../src/content/vary/concept/integral.ts";
import { limitPools } from "../src/content/vary/concept/limit.ts";
import { probabilityPools } from "../src/content/vary/concept/probability.ts";
import { quadraticPools } from "../src/content/vary/concept/quadratic.ts";
import { sequencePools } from "../src/content/vary/concept/sequence.ts";
import { surveyPools } from "../src/content/vary/concept/survey.ts";
import { trianglePools } from "../src/content/vary/concept/triangle.ts";
import { trigPools } from "../src/content/vary/concept/trig.ts";
import { vectorPools } from "../src/content/vary/concept/vector.ts";
import { combinations, drawPool, type Pool } from "../src/content/vary/pool.ts";

const MARK = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const BARE = /\b(khong|duoc|dinh|nghiem|phuong trinh|ham so)\b/i;
const pools: Pool[] = [
  ...quadraticPools,
  ...ineqPools,
  ...expPools,
  ...sequencePools,
  ...trigPools,
  ...limitPools,
  ...derivativePools,
  ...surveyPools,
  ...integralPools,
  ...vectorPools,
  ...analyticPools,
  ...trianglePools,
  ...comboPools,
  ...probabilityPools,
];

const fails: string[] = [];

function assert(cond: boolean, message: string): void {
  if (!cond && fails.length < 40) fails.push(message);
}

function texOf(text: string): string[] {
  const out: string[] = [];
  const re = /\$([^$]+)\$/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) out.push(match[1] ?? "");
  return out;
}

function checkTex(label: string, text: string): void {
  for (const tex of texOf(text)) {
    try {
      katex.renderToString(tex, { throwOnError: true, strict: "ignore" });
    } catch (error) {
      assert(false, `${label} KaTeX: ${tex} (${error instanceof Error ? error.message : "fail"})`);
    }
    if (MARK.test(tex)) assert(false, `${label} unicode in math: ${tex}`);
  }
}

const proved = JSON.parse(execFileSync("python3", ["scripts/concept_sympy.py"], { encoding: "utf8" })) as Record<string, boolean>;
const claimIds = pools.flatMap((pool) => pool.claims.map((item) => item.id));

assert(pools.length === 56, `pool count ${pools.length}`);
assert(new Set(pools.map((pool) => pool.id)).size === 56, "duplicate pool ids");
assert(new Set(claimIds).size === claimIds.length, "duplicate claim ids");
for (const id of claimIds) assert(typeof proved[id] === "boolean", `sympy missed ${id}`);
for (const id of Object.keys(proved)) assert(claimIds.includes(id), `sympy extra ${id}`);

for (const pool of pools) {
  const trues = pool.claims.filter((item) => item.ok);
  const falses = pool.claims.filter((item) => !item.ok);
  assert(pool.claims.length >= 6, `${pool.id} has ${pool.claims.length} claims`);
  assert(trues.length >= 2 && falses.length === 4, `${pool.id} shape`);
  for (const item of pool.claims) {
    assert(proved[item.id] === item.ok, `${item.id} ok=${item.ok} proved=${proved[item.id]}`);
    for (const blob of [item.vi, item.en, item.noteVi, item.noteEn]) checkTex(item.id, blob);
  }
  const viCopy = [pool.prompt, pool.hint, pool.lookVi, ...pool.claims.flatMap((item) => [item.vi, item.noteVi])].join(" ");
  assert(MARK.test(viCopy), `${pool.id} Vietnamese copy has no diacritics`);
  assert(!BARE.test(viCopy), `${pool.id} has an undiacritised Vietnamese word`);
  for (const blob of [pool.prompt, pool.promptEn, pool.hint, pool.hintEn, pool.lookVi, pool.lookEn]) checkTex(pool.id, blob);

  const combos = combinations(pool);
  assert(combos.length === trues.length * falses.length, `${pool.id} combination count`);
  for (const combo of combos) {
    const four = [combo.correct, ...combo.wrong];
    const trueCount = four.filter((item) => proved[item.id] === true).length;
    assert(trueCount === 1, `${pool.id} combination has ${trueCount} true statements`);
    assert(proved[combo.correct.id] === true, `${pool.id} marked a false statement correct`);
    const vi = four.map((item) => item.vi);
    const en = four.map((item) => item.en);
    assert(new Set(vi).size === 4 && new Set(en).size === 4, `${pool.id} combination repeats a choice`);
  }

  for (let ti = 0; ti < trues.length; ti += 1) {
    for (let skip = 0; skip < falses.length; skip += 1) {
      const draw = drawPool(pool, scripted([ti / trues.length, skip / falses.length]));
      const correct = trues[ti];
      assert(draw.stem.choices[0] === correct?.vi, `${pool.id} draw ${ti},${skip} wrong true statement`);
      assert(draw.stem.kind === "concept", `${pool.id} draw lost kind`);
      const shown = falses.filter((_, index) => index !== skip).map((item) => item.vi);
      assert(draw.stem.choices.slice(1).join("\n") === shown.join("\n"), `${pool.id} draw ${ti},${skip} wrong false set`);
      for (const blob of [...draw.stem.steps, ...draw.stem.stepsEn]) checkTex(`${pool.id} steps`, blob);
    }
  }
}

function scripted(values: number[]): () => number {
  let index = 0;
  return () => {
    const value = values[index] ?? 0;
    index += 1;
    return value;
  };
}

if (fails.length > 0) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log(`concept ok (${pools.length} pools, ${claimIds.length} statements)`);

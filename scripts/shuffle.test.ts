/**
 * Choice order is a permutation, and the remapped index still names the
 * original correct text. Run with: tsx scripts/shuffle.test.ts
 */
import { remapAnswer, shuffleOrder } from "../src/topic/shuffle.ts";

const fails: string[] = [];

function assert(cond: boolean, message: string): void {
  if (!cond) fails.push(message);
}

const choices = ["6,5 và 6", "7 và 7", "5 và 8", "4 và 9"] as const;
const answer = 0;

function isPermutation(order: readonly number[], length: number): boolean {
  if (order.length !== length) return false;
  const seen = new Set(order);
  if (seen.size !== length) return false;
  for (const index of order) {
    if (!Number.isInteger(index) || index < 0 || index >= length) return false;
  }
  return true;
}

const biased = shuffleOrder(4, () => 0);
assert(isPermutation(biased, 4), "a constant random still returns a permutation");
assert(biased.join(",") !== "0,1,2,3", "Fisher–Yates with random 0 is not the identity");

const fixed = [2, 0, 3, 1];
const fixedAt = remapAnswer(fixed, 3);
const fixedChoice = fixed[fixedAt];
assert(fixedAt === 2 && fixedChoice === 3, "remapAnswer returns the shuffled slot of the original index");

const seen = new Set<number>();
for (let run = 0; run < 400; run += 1) {
  const order = shuffleOrder(choices.length);
  assert(isPermutation(order, choices.length), "shuffle is a permutation");
  const slot = remapAnswer(order, answer);
  const original = order[slot];
  assert(original !== undefined && choices[original] === choices[answer], "remapped answer still points at the correct choice text");
  seen.add(slot);
}

assert([0, 1, 2, 3].every((slot) => seen.has(slot)), "the correct position is spread across all positions");

if (fails.length > 0) {
  console.error(fails.join("\n"));
  process.exit(1);
}
console.log("shuffle ok");

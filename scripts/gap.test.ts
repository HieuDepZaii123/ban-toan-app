import assert from "node:assert/strict";
import { isSharedCorrect, sharedDrill } from "../src/content/sharedDrill.ts";
import { withPick, withoutMiss, type MissRow } from "../src/lib/missBook.ts";
import { sciences } from "../src/science/catalog.ts";
import { scienceLessons } from "../src/science/lessons.ts";
import { foot, midpoint } from "../src/workshop/plane.ts";

assert.equal(sharedDrill.length, 14);
assert.equal(sharedDrill[0]?.answer, 2);
assert.equal(isSharedCorrect(0, 2), true);
assert.equal(isSharedCorrect(0, 0), false);
assert.equal(new Set(sharedDrill.map((item) => item.id)).size, 14);

const wrong = withPick([], sharedDrill[0]!, 0);
assert.equal(wrong.length, 1);
assert.equal(wrong[0]?.chosen, "81 m²");
assert.equal(withPick(wrong, sharedDrill[0]!, 2).length, 0);
assert.equal(withoutMiss(wrong, "rao").length, 0);
const kept: MissRow[] = wrong;
assert.equal(withoutMiss(kept, "khac").length, 1);

const mid = midpoint({ x: 0, y: 0 }, { x: 4, y: 2 });
assert.equal(mid.x, 2);
assert.equal(mid.y, 1);
const hit = foot({ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 2, y: 3 });
assert.equal(hit.x, 2);
assert.equal(hit.y, 0);

for (const area of sciences) {
  const lesson = scienceLessons[area.id];
  for (const layer of [lesson.basic, lesson.exam, lesson.adv]) {
    assert.ok(layer.bits.length >= 1, area.id);
    assert.ok(layer.drill.steps.length >= 1, area.id);
    assert.ok(layer.drill.answer.length > 0, area.id);
  }
}
assert.equal(scienceLessons.python.basic.drill.answer, "55");
assert.equal(scienceLessons["vat-ly"].basic.drill.answer, "5");
assert.equal(scienceLessons.hoa.adv.drill.answer, "2");
assert.equal(scienceLessons.chuyen.adv.drill.answer, "9");

console.log("gap ok");

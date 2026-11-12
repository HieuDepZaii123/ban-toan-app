import assert from "node:assert/strict";
import katex from "katex";
import { isSharedCorrect, sharedDrill } from "../src/content/sharedDrill.ts";
import { withPick, withoutMiss, type MissRow } from "../src/lib/missBook.ts";
import { sciences } from "../src/science/catalog.ts";
import { scienceLessons } from "../src/science/lessons.ts";
import { scienceMore } from "../src/science/more.ts";
import { foot, midpoint } from "../src/workshop/plane.ts";

assert.equal(sharedDrill.length, 36);
assert.equal(sharedDrill[0]?.answer, 2);
assert.equal(isSharedCorrect(0, 2), true);
assert.equal(isSharedCorrect(0, 0), false);
assert.equal(new Set(sharedDrill.map((item) => item.id)).size, sharedDrill.length);
for (const item of sharedDrill) {
  assert.ok(item.steps.length >= 2, item.id);
  for (const tex of [item.prompt, ...item.choices, ...item.steps].join(" ").match(/\$[^$]+\$/g) ?? []) {
    katex.renderToString(tex.slice(1, -1), { throwOnError: true });
  }
}

const wrong = withPick([], sharedDrill[0]!, 0);
assert.equal(wrong.length, 1);
assert.equal(wrong[0]?.chosen, "$81$ m²");
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
for (const area of sciences) {
  for (const key of ["basic", "exam", "adv"] as const) {
    const more = scienceMore[area.id][key];
    assert.ok(more.bits.length >= 3, `${area.id}/${key} cần thêm ít nhất ba ý`);
    assert.ok(more.drills.length >= 2, `${area.id}/${key} cần thêm ít nhất hai bài luyện`);
    for (const drill of more.drills) {
      assert.ok(drill.steps.length >= 2 && drill.answer.length > 0, `${area.id}/${key}: ${drill.q}`);
      assert.equal(drill.calc === undefined, drill.num === undefined, `${area.id}/${key}: num và calc phải đi cùng nhau`);
      if (drill.calc && drill.num !== undefined) {
        assert.ok(Math.abs(drill.calc() - drill.num) < 1e-9, `${area.id}/${key} tính lại ra ${drill.calc()}, khác ${drill.num}: ${drill.q}`);
        assert.ok(drill.answer.includes(String(drill.num).replace(".", ",")), `${area.id}/${key} đáp số không chứa ${drill.num}: ${drill.q}`);
      }
    }
  }
}
assert.equal(scienceLessons.python.basic.drill.answer, "55");
assert.equal(scienceLessons["vat-ly"].basic.drill.answer, "5");
assert.equal(scienceLessons.hoa.adv.drill.answer, "2");
assert.equal(scienceLessons.chuyen.adv.drill.answer, "9");

console.log("gap ok");

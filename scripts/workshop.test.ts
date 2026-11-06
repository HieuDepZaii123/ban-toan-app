/**
 * Khối trong xưởng: thể tích khớp hình, xóa chỉ một thành phần.
 * Run with: tsx scripts/workshop.test.ts
 */
import assert from "node:assert/strict";
import katex from "katex";
import { gradeGeo, GEO_QUIZ } from "../src/workshop/geoQuiz.ts";
import { solidFormula, solidVolume, tetraEdgeLengths } from "../src/workshop/solids.ts";
import { withoutPoint, withoutSeg } from "../src/workshop/select.ts";

const chop = solidVolume("chop", { a: 6, b: 4, h: 1 });
assert.equal(chop, 48);
assert.notEqual(chop, 36);

const prism = solidVolume("lang", { a: 3, b: 4, h: 6 });
assert.equal(prism, 36);

const cylinderShort = solidVolume("tru", { a: 2, b: 3, h: 1 });
const cylinderTall = solidVolume("tru", { a: 2, b: 5, h: 1 });
assert.ok(Math.abs(cylinderShort - 12 * Math.PI) < 1e-9);
assert.ok(cylinderTall > cylinderShort);

const cone = solidVolume("non", { a: 2, b: 3, h: 1 });
assert.ok(Math.abs(cone - 4 * Math.PI) < 1e-9);

const sphere = solidVolume("cau", { a: 3, b: 9, h: 9 });
assert.ok(Math.abs(sphere - 36 * Math.PI) < 1e-6);
assert.equal(solidVolume("cau", { a: 3, b: 1, h: 1 }), sphere);

const edges = tetraEdgeLengths(6);
assert.ok(edges.every((length) => Math.abs(length - 6) < 1e-9));

const segs = [{ a: 0, b: 1 }, { a: 1, b: 2 }, { a: 0, b: 2 }];
assert.deepEqual(withoutSeg(segs, 1), [{ a: 0, b: 1 }, { a: 0, b: 2 }]);
assert.deepEqual(withoutPoint(segs, 1), [{ a: 0, b: 1 }]);

assert.equal(solidVolume("lap", { a: 3, b: 9, h: 9 }), 27);
assert.equal(GEO_QUIZ.length, 15);
assert.equal(gradeGeo(GEO_QUIZ[0]!, { value: 4 }), true);
assert.equal(gradeGeo(GEO_QUIZ[0]!, { value: 36 }), false);
assert.equal(gradeGeo(GEO_QUIZ[3]!, { choice: 1 }), true);

for (const kind of ["tru", "non", "cau", "lang", "chop", "tu", "hop", "lap"] as const) {
  const text = solidFormula(kind, { a: 3, b: 4, h: 5 });
  for (const tex of text.match(/\$[^$]+\$/g) ?? []) {
    katex.renderToString(tex.slice(1, -1), { throwOnError: true });
  }
}
for (const item of GEO_QUIZ) {
  for (const tex of [item.prompt, ...(item.choices ?? []), ...item.steps].join(" ").match(/\$[^$]+\$/g) ?? []) {
    katex.renderToString(tex.slice(1, -1), { throwOnError: true });
  }
}

console.log("workshop ok");

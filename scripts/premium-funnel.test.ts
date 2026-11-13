/**
 * Gói năm tiết kiệm bao nhiêu, và đơn hết hạn không đẩy tạo đơn mới.
 * Run with: tsx scripts/premium-funnel.test.ts
 */
import assert from "node:assert/strict";
import { expiredOrderNote } from "../src/premium/orderNote.ts";
import { yearSavings } from "../src/premium/savings.ts";

const year = yearSavings(49_000, 399_000);
assert.ok(year, "year plan saves money at the default prices");
assert.equal(year.saved, 189_000);
assert.equal(year.percent, 32);
assert.equal(yearSavings(10_000, 100_000)?.saved, 20_000);
assert.equal(yearSavings(10_000, 100_000)?.percent, 17);
assert.equal(yearSavings(49_000, 49_000 * 12), null);
assert.equal(yearSavings(49_000, 700_000), null);
assert.equal(yearSavings(49_000.5, 399_000), null);

for (const method of ["wallet", "qr", "bank"] as const) {
  const note = expiredOrderNote(method);
  assert.equal(note.lateStillCredits, true, method);
  assert.equal(note.text.includes("Tạo đơn khác"), false, method);
  assert.match(note.text, /đừng tạo đơn mới/);
  assert.match(note.text, /vẫn được ghi nhận/);
}

const crypto = expiredOrderNote("crypto");
assert.equal(crypto.lateStillCredits, false);
assert.equal(crypto.text.includes("Tạo đơn khác"), false);
assert.equal(crypto.text.includes("vẫn được ghi nhận"), false);
assert.match(crypto.text, /không còn đối soát/);

console.log("premium funnel ok");

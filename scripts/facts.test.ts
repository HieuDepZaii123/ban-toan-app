/**
 * Server-verified numbers for the tutor: equation detection, exact Δ / Δ' / roots, and the
 * note reaching the model's instructions.
 * Run with: tsx scripts/facts.test.ts
 */
import assert from "node:assert/strict";
import { equationFacts, findEquation, verifiedNote } from "../server/chat/facts.ts";
import { handleChat, type ChatEnv } from "../server/chat/handlers.ts";
import { createQuota } from "../server/chat/limit.ts";

function facts(text: string): string {
  const eq = findEquation(text);
  assert.ok(eq, `equation in: ${text}`);
  return equationFacts(eq);
}

// The live mistake: Δ for x² − 5x + 6 = 0 is 1, not 9.
const base = facts("Giải phương trình x^2 - 5x + 6 = 0");
assert.match(base, /\\Delta = b\^2 - 4ac = 1\$/);
assert.match(base, /x_1 = 2\$, \$x_2 = 3\$/);
assert.match(base, /x_1 \+ x_2 = 5\$, \$x_1 x_2 = 6\$/);
assert.ok(!base.includes("b' ="), "b odd: no Δ'");

// Notation variants students type.
for (const text of ["x² − 5x + 6 = 0", "$x^{2}-5x+6=0$", "Giải: X^2 -5x +6 = 0 nhé", "x^2 + 6 = 5x"]) {
  assert.match(facts(text), /= 1\$\./, text);
}

assert.match(facts("x^2 - 4x + 4 = 0"), /nghiệm kép \$x = 2\$/);
assert.match(facts("x^2 + x + 1 = 0"), /vô nghiệm/);
assert.ok(!facts("x^2 + x + 1 = 0").includes("Vi-ét"), "no Vieta without real roots");
assert.match(facts("x^2 - 6x + 4 = 0"), /\\Delta' = b'\^2 - ac = 5\$/, "b even: Δ'");
assert.match(facts("x^2 - 2x - 1 = 0"), /x = 1 \\pm \\sqrt\{2\}\$/);
assert.match(facts("2x^2 + 3x - 1 = 0"), /x = \\frac\{-3 \\pm \\sqrt\{17\}\}\{4\}\$/);
assert.match(facts("2x^2 - 3x + 1 = 0"), /x_1 = \\frac\{1\}\{2\}\$, \$x_2 = 1\$/);
assert.match(facts("0,5x^2 - x - 4 = 0"), /x_1 = -2\$, \$x_2 = 4\$/, "decimal comma");
assert.match(facts("3x - 6 = 0"), /bậc nhất: \$x = 2\$/);
assert.match(facts("2x + 1 = x - 3"), /x = -4\$/);

for (const text of ["Đạo hàm của sin x là gì?", "1 + 1 = 2", "x^3 - 1 = 0", "y = 2x + 1 vẽ thế nào", "f(x) = x^2"]) {
  assert.equal(findEquation(text) === null || text.startsWith("y ="), true, text);
}
assert.equal(findEquation("x^3 - 1 = 0"), null, "cubic is out of scope");
assert.equal(verifiedNote("Chào bạn"), "");

// Every integer quadratic in a small box: the stated roots really solve it.
for (let a = -3; a <= 3; a += 1) {
  if (a === 0) continue;
  for (let b = -6; b <= 6; b += 1) {
    for (let c = -6; c <= 6; c += 1) {
      const out = equationFacts({ a: { n: a, d: 1 }, b: { n: b, d: 1 }, c: { n: c, d: 1 } });
      assert.ok(out.includes(`= ${b * b - 4 * a * c}$.`), `Δ for ${a},${b},${c}`);
      const rootsText = out.split("\n").filter((line) => !line.startsWith("Vi-ét")).join("\n");
      for (const m of rootsText.matchAll(/x(?:_[12])? = (-?)(?:\\frac\{(\d+)\}\{(\d+)\}|(\d+))\$/g)) {
        const value = (m[1] ? -1 : 1) * (m[4] ? Number(m[4]) : Number(m[2]) / Number(m[3]));
        assert.ok(Math.abs(a * value * value + b * value + c) < 1e-9, `root ${value} of ${a},${b},${c}`);
      }
      const irr = /x = (?:\\frac\{)?(-?\d*) \\pm (\d*)\\sqrt\{(\d+)\}(?:\}\{(\d+)\})?\$/.exec(rootsText);
      if (irr) {
        const [p, q, m, r] = [Number(irr[1] || 0), Number(irr[2] || 1), Number(irr[3]), Number(irr[4] || 1)];
        for (const s of [1, -1]) {
          const x = (p + s * q * Math.sqrt(m)) / r;
          assert.ok(Math.abs(a * x * x + b * x + c) < 1e-9, `irrational root of ${a},${b},${c}`);
        }
      }
    }
  }
}

// The note reaches the model's instructions.
let seen = "";
const env: ChatEnv = {
  now: () => 1_700_000_000_000,
  mode: "live",
  complete: async (instructions) => {
    seen = instructions;
    return "ok";
  },
  premium: async () => false,
  quota: createQuota(),
  freeDaily: 8,
  premiumDaily: 40,
  windowLimit: 10,
  windowMs: 600_000,
};
await handleChat(new Request("http://x/api/chat", {
  method: "POST",
  headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.7" },
  body: JSON.stringify({ messages: [{ role: "user", content: "Giải phương trình x^2 - 5x + 6 = 0" }] }),
}), env);
assert.ok(seen.includes("Verified numbers") && seen.includes("= 1$."), "verified Δ in the instructions");

console.log("facts ok");

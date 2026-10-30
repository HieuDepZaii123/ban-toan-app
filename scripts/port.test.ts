import assert from "node:assert/strict";
import katex from "katex";
import { gradeNumber } from "../src/content/assessBank.ts";
import { searchFormulas } from "../src/content/formulaBook.ts";
import { mockTutor } from "../src/chat/mock.ts";
import { effectiveTheme } from "../src/ui/themeMode.ts";
import { advanced } from "../src/topic/levels.ts";
import { cards } from "../src/content/cards.ts";

assert.equal(effectiveTheme("day", 22), "paper");
assert.equal(effectiveTheme("night", 10), "night");
assert.equal(effectiveTheme("auto", 20), "paper");
assert.equal(effectiveTheme("auto", 21), "night");
assert.equal(effectiveTheme("auto", 4), "night");
assert.equal(effectiveTheme("auto", 5), "paper");

assert.equal(gradeNumber(119.1, 119.1, 0.01), true);
assert.equal(gradeNumber(9, 9), true);
assert.equal(gradeNumber(48, 50), false);

const hit = searchFormulas("viete");
assert.equal(hit.some((group) => group.items.some((item) => item.name === "Viète")), true);
assert.equal(searchFormulas("khong-co-cong-thuc").length, 0);
const tex = hit[0]?.items[0]?.tex ?? "";
const html = katex.renderToString(tex || "x", { throwOnError: false, displayMode: true });
assert.equal(html.includes("katex"), true);
assert.equal(html.includes("\\Delta"), false);

assert.equal(mockTutor("thời tiết hôm nay").includes("toán THPT"), true);
assert.equal(/1\)/.test(mockTutor("đạo hàm của x^2")), true);

for (const card of cards) assert.ok(advanced[card.id], card.id);

console.log("port ok");

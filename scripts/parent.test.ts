/**
 * Thời gian học, khóa phụ huynh và phiếu kết quả: các hàm thuần, không cần trình duyệt.
 * Run with: tsx scripts/parent.test.ts
 */
import assert from "node:assert/strict";
import { hashPin, limitReached, parseParent, validPin } from "../src/lib/parent.ts";
import { decodeReport, encodeReport, reportCsv, weekMinutes, type Report } from "../src/lib/reportCode.ts";
import { dayKey, lastDays, parseTime, streak } from "../src/lib/studyTime.ts";

const now = new Date(2026, 10, 11, 20, 0, 0);
assert.equal(dayKey(now), "2026-11-11");
const book = parseTime(JSON.stringify({ "2026-11-11": 900, "2026-11-10": 1800, "2026-11-09": 59, "2026-11-08": 600, "junk": 5, "2026-11-07": -3 }));
assert.deepEqual(Object.keys(book).sort(), ["2026-11-08", "2026-11-09", "2026-11-10", "2026-11-11"]);
const week = lastDays(7, book, now);
assert.equal(week.length, 7);
assert.equal(week[6]?.day, "2026-11-11");
assert.equal(week[0]?.day, "2026-11-05");
assert.equal(week[0]?.seconds, 0);
assert.equal(streak(book, now), 2, "a day under one minute breaks the streak");
assert.equal(streak({ "2026-11-10": 600 }, now), 1, "yesterday still counts before today's study");
assert.equal(streak({}, now), 0);
assert.deepEqual(parseTime("not json"), {});

assert.equal(validPin("1234"), true);
assert.equal(validPin("12a4"), false);
assert.equal(validPin("123"), false);
const hashed = await hashPin("1234", "salt");
assert.equal(hashed, await hashPin("1234", "salt"));
assert.notEqual(hashed, await hashPin("1235", "salt"));
assert.notEqual(hashed, await hashPin("1234", "other"));
assert.equal(hashed.includes("1234"), false);
const locked = parseParent(JSON.stringify({ pinHash: hashed, salt: "salt", limitMin: 30, tutorOff: true }));
assert.equal(locked.tutorOff, true);
assert.equal(limitReached(29 * 60, locked, now), false);
assert.equal(limitReached(30 * 60, locked, now), true);
assert.equal(limitReached(10_000, parseParent(JSON.stringify({ limitMin: 30 })), now), false, "no PIN means no lock");
assert.equal(parseParent("{").limitMin, 0);
assert.equal(parseParent(JSON.stringify({ limitMin: 99999 })).limitMin, 0);

const report: Report = {
  name: "Bông lớp 3",
  grade: "3",
  made: "2026-11-11",
  days: week.map((item) => ({ day: item.day, minutes: Math.round(item.seconds / 60) })),
  streak: 2,
  lessons: { "3": 4 },
  topics: { quadratic: 5 },
  exams: [{ at: 1_700_000_000_000, total: 7.25 }],
  misses: 3,
};
const code = encodeReport(report);
assert.match(code, /^BT1\.[A-Za-z0-9_-]+$/);
assert.deepEqual(decodeReport(code), report);
assert.equal(decodeReport(` ${code}\n`)?.name, "Bông lớp 3");
assert.equal(weekMinutes(report), 15 + 30 + 1 + 10);
assert.equal(decodeReport("BT1.@@@"), null);
assert.equal(decodeReport("hello"), null);
assert.equal(decodeReport(`BT1.${"A".repeat(7000)}`), null);
const hostile = encodeReport({ ...report, name: "x".repeat(500), grade: "<script>", lessons: { "<img>": 1, "3": 1e9 }, topics: { "DROP TABLE": 1 } } as Report);
const cleaned = decodeReport(hostile);
assert.equal(cleaned?.name.length, 24);
assert.equal(cleaned?.grade, "");
assert.deepEqual(cleaned?.lessons, { "3": 200 });
assert.deepEqual(cleaned?.topics, {});
const csv = reportCsv([report]);
assert.equal(csv.charCodeAt(0), 0xfeff);
assert.match(csv, /"Bông lớp 3","3","2026-11-11","56","2","4","5","7,25","3"/);

console.log("parent ok");

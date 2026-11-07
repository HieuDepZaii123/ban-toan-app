/**
 * Đề luyện chung và luyện nhanh lớp 1–9: id ổn định, đáp số sympy.
 * Run with: tsx scripts/practice.test.ts
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { sharedDrill } from "../src/content/sharedDrill.ts";
import { gradePractice, handPractice, questionsForGrade } from "../src/grades/practiceBank.ts";
import { answerGrade, emptyGradeBag, gradeIndex, gradePickKey, parseGradeBag, rememberGrade } from "../src/grades/practiceStore.ts";
import { resolveDrillIndex } from "../src/lib/drillPlace.ts";
import { checkMarked, checkShape, sympyRows } from "./questionCheck.ts";

const OLD = ["rao", "bayes", "cuc-tri", "sin3", "cheo", "tiep", "tich", "csc", "lai", "log", "chop", "kc", "nu", "cos", "tich0", "doan", "c52", "sinpi", "cau36", "bp1", "tb99", "lne", "hop3", "tru20", "tan45", "bac1"];
const ADDED = ["hs-gtln", "hs-tong", "lg-hai-mu", "lg-max", "tp-dien-tich", "tp-tung-phan", "hh-cau-v", "hh-duong", "xs-tong7", "tk-trung-vi"];

assert.deepEqual(sharedDrill.slice(0, 26).map((item) => item.id), OLD);
assert.deepEqual(sharedDrill.slice(26).map((item) => item.id), ADDED);
assert.equal(sharedDrill.length, 36);
for (const item of sharedDrill.slice(26)) {
  assert.ok(item.steps.length >= 3, item.id);
  assert.equal(new Set(item.choices).size, 4, item.id);
}

const HAND = ["l1-cong", "l1-tru", "l1-qua", "l1-lon"];
assert.deepEqual(handPractice.slice(0, 4).map((item) => item.id), HAND);
assert.equal(handPractice.length, 36);
assert.deepEqual(gradePractice.slice(0, 36), handPractice);
assert.equal(gradePractice.length, 36 + 9 * 100);
for (let grade = 1; grade <= 9; grade += 1) {
  const rows = questionsForGrade(grade);
  assert.equal(handPractice.filter((item) => item.grade === grade).length, 4, `lớp ${grade} câu viết tay`);
  assert.equal(rows.length, 104, `lớp ${grade} cần 4 câu viết tay và 100 câu sinh`);
  assert.ok(rows.every((item) => item.grade === grade), `lớp ${grade} lẫn lớp khác`);
  checkShape(rows, `lớp ${grade}`);
}
for (const grade of [10, 11, 12]) assert.equal(questionsForGrade(grade).length, 0, `lớp ${grade} thuộc luyện THPT riêng`);
assert.equal(new Set(gradePractice.map((item) => item.id)).size, gradePractice.length);
assert.ok(checkMarked(gradePractice.slice(handPractice.length)) >= 800, "so được quá ít đáp án");

const ids = sharedDrill.map((item) => item.id);
assert.equal(resolveDrillIndex(ids, "5", null), 5);
assert.equal(resolveDrillIndex(ids, "0", "bac1"), ids.indexOf("bac1"));
assert.equal(resolveDrillIndex(ids, "99", "khong-co"), 0);
assert.equal(resolveDrillIndex([...ids, "sau-nay"], "26", "hs-gtln"), ids.indexOf("hs-gtln"));

const bag = answerGrade(rememberGrade(emptyGradeBag(), 1, "l1-cong"), 1, "l1-cong", 0);
assert.equal(bag.picks[gradePickKey(1, "l1-cong")], 0);
assert.equal(gradeIndex(["l1-tru", "l1-cong"], bag, 1), 1);
const restored = parseGradeBag(JSON.stringify(bag));
assert.equal(restored.at["1"], "l1-cong");
assert.equal(restored.picks[gradePickKey(1, "l1-cong")], 0);

const thpt = [
  { where: "hs-gtln", lhs: "Max((-x**2+4*x).subs(x,0), (-x**2+4*x).subs(x,2), (-x**2+4*x).subs(x,3))", rhs: "4" },
  { where: "hs-tong", lhs: "sum(solve(x**2-5*x+6, x))", rhs: "5" },
  { where: "lg-hai-mu", lhs: "cos(pi/6)", rhs: "sqrt(3)/2" },
  { where: "lg-max", lhs: "sqrt(3**2+4**2)", rhs: "5" },
  { where: "tp-dien-tich", lhs: "integrate(x-x**2,(x,0,1))", rhs: "Rational(1,6)" },
  { where: "tp-tung-phan", lhs: "integrate(x*exp(x),(x,0,1))", rhs: "1" },
  { where: "hh-cau-v", lhs: "Rational(4,3)*pi*8", rhs: "32*pi/3" },
  { where: "hh-duong", lhs: "Abs(-10)/sqrt(9+16)", rhs: "2" },
  { where: "xs-tong7", lhs: "Rational(6,36)", rhs: "Rational(1,6)" },
  { where: "tk-trung-vi", lhs: "(5+7)/2", rhs: "6" },
];
const rows = [
  ...thpt,
  ...sympyRows(gradePractice),
];
execFileSync("python3", ["scripts/practice_sympy.py"], { input: JSON.stringify(rows), stdio: ["pipe", "inherit", "inherit"] });
console.log("practice bank ok");

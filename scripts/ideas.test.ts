/**
 * Research briefs stay concrete, and the right menu only links to real routes.
 * Run with: tsx scripts/ideas.test.ts
 */
import assert from "node:assert/strict";
import katex from "katex";
import { studyBriefs } from "../src/research/briefs.ts";
import { researchIdeas } from "../src/research/ideas.ts";
import { MENU_LINKS } from "../src/ui/navLinks.ts";

const MARK = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const BARE = /\b(khong|duoc|dinh|nghiem|phuong trinh|ham so)\b/i;
const ROUTES = new Set([
  "/",
  "/kien-thuc",
  "/soan-tai-lieu",
  "/xuong-hinh",
  "/luyen",
  "/luyen-lop",
  "/luyen-thpt",
  "/phuong-phap",
  "/so-loi",
  "/danh-gia",
  "/so-cong-thuc",
  "/may-tinh",
  "/nghien-cuu",
  "/khoa-hoc",
  "/gioi-thieu",
  "/nang-cap",
]);
const STUDY_IDS = new Set<string>(studyBriefs.map((item) => item.id));

assert.ok(researchIdeas.filter((item) => item.kind === "y-tuong").length >= 4);
assert.ok(researchIdeas.filter((item) => item.kind === "chu-de").length >= 4);
assert.equal(new Set(researchIdeas.map((item) => item.id)).size, researchIdeas.length);

for (const idea of researchIdeas) {
  assert.ok(idea.steps.length >= 3 && idea.steps.length <= 4, idea.id);
  const blob = [idea.title, idea.question, idea.method, ...idea.steps].join(" ");
  assert.match(blob, MARK, idea.id);
  assert.equal(BARE.test(blob), false, idea.id);
  for (const tex of blob.match(/\$[^$]+\$/g) ?? []) {
    katex.renderToString(tex.slice(1, -1), { throwOnError: true });
  }
  if (!idea.href) continue;
  const url = new URL(idea.href, "https://ban-toan.local");
  const topic = url.pathname.match(/^\/t\/([^/]+)$/);
  assert.ok(topic || ROUTES.has(url.pathname), idea.href);
  const study = url.searchParams.get("n");
  if (study) assert.ok(STUDY_IDS.has(study), study);
}

for (const link of MENU_LINKS) assert.ok(ROUTES.has(link.href), link.href);
assert.match(MENU_LINKS.map((link) => link.label).join(" "), MARK);

console.log(`ideas ok (${researchIdeas.length} briefs, ${MENU_LINKS.length} menu links)`);

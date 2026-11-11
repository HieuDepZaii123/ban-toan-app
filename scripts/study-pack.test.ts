/**
 * Tài liệu ôn tập Premium: mỗi tờ ghép được một bản đủ sáu mục, mọi công thức KaTeX đọc được,
 * đáp án trong tài liệu khớp với ngân hàng câu hỏi, cả tiếng Việt lẫn tiếng Anh.
 * Run with: tsx scripts/study-pack.test.ts
 */
import assert from "node:assert/strict";
import katex from "katex";
import { topics } from "../src/content/catalog.ts";
import { loadTopic } from "../src/content/loadTopic.ts";
import { parseDoc, type Block, type Inline } from "../src/docs/model.ts";
import { docToDocx } from "../src/docs/docx.ts";
import { docToPlain } from "../src/docs/plain.ts";
import { renderDoc } from "../src/docs/render.ts";
import { buildStudyPack, PACK_EXAMPLES, packContents, packTeaser, type Lang } from "../src/premium/studyPack.ts";

const inlinesOf = (block: Block): Inline[] => (block.kind === "h" ? block.inlines : block.kind === "p" ? block.lines.flat() : block.items.flat());
const textOf = (inlines: readonly Inline[]) => inlines.map((part) => (part.kind === "math" ? `$${part.tex}$` : part.text)).join("");

const ready = topics.filter((topic) => topic.status === "ready");
assert.ok(ready.length >= 14, "every open sheet has a pack");

let formulas = 0;
for (const meta of ready) {
  const pack = await loadTopic(meta.id);
  const source = { meta, lesson: pack.lesson, questions: pack.questions };
  const contents = packContents(source);
  assert.equal(contents.examples, PACK_EXAMPLES, `${meta.id} examples`);
  assert.ok(contents.selfTest >= 6, `${meta.id} self-test has ${contents.selfTest}`);
  assert.ok(contents.notes >= 6, `${meta.id} notes`);

  for (const lang of ["vi", "en"] as Lang[]) {
    const where = `${meta.id}/${lang}`;
    const text = buildStudyPack(source, lang);
    assert.ok(text.startsWith(packTeaser(source, lang)), `${where}: the free teaser is the start of the pack`);
    assert.ok(!packTeaser(source, lang).includes("## 2."), `${where}: teaser stops before the lecture notes`);

    const blocks = parseDoc(text);
    const h1 = blocks.filter((block) => block.kind === "h" && block.level === 1);
    const h2 = blocks.filter((block) => block.kind === "h" && block.level === 2).map((block) => textOf(inlinesOf(block)));
    assert.equal(h1.length, 1, `${where}: one title`);
    assert.deepEqual(h2.map((title) => title.slice(0, 2)), ["1.", "2.", "3.", "4.", "5.", "6."], `${where}: six sections`);
    assert.ok(textOf(inlinesOf(h1[0]!)).includes(lang === "en" ? meta.titleEn : meta.title), `${where}: title names the sheet`);

    const all = blocks.flatMap(inlinesOf);
    assert.ok(!all.some((part) => part.kind === "italic"), `${where}: no stray * turned text italic`);
    assert.ok(!all.some((part) => part.kind !== "math" && /@@|\$/.test(part.text)), `${where}: no unparsed math marker`);
    for (const part of all) {
      if (part.kind !== "math") continue;
      formulas += 1;
      assert.ok(part.tex.length > 0, `${where}: empty formula`);
      katex.renderToString(part.tex, { throwOnError: true, displayMode: part.display });
    }

    // Worked examples: three steps and the right answer each.
    const plain = pack.questions.filter((question) => !question.kind);
    const lists = blocks.filter((block) => block.kind === "ol");
    assert.equal(lists.length, PACK_EXAMPLES + 1, `${where}: one step list per example plus the answer key`);
    plain.slice(0, PACK_EXAMPLES).forEach((question, index) => {
      const steps = lists[index]!;
      assert.equal(steps.kind === "ol" && steps.items.length, 3, `${where}: example ${index + 1} has three steps`);
      const answer = (lang === "en" ? question.choicesEn : question.choices)[question.answer];
      assert.ok(text.includes(`:** ${answer.replace(/\s*\n\s*/g, " ").trim()}`), `${where}: example ${index + 1} answer`);
    });

    // Self-test: four choices per question, and the key gives the letter of the bank's answer.
    const selfTest = [...plain.slice(PACK_EXAMPLES), ...pack.questions.filter((question) => question.kind === "concept")];
    const choiceLists = blocks.filter((block) => block.kind === "ul" && block.items.length === 4);
    assert.equal(choiceLists.length, selfTest.length, `${where}: one choice list per self-test question`);
    const key = lists.at(-1)!;
    assert.equal(key.kind === "ol" && key.items.length, selfTest.length, `${where}: answer key length`);
    if (key.kind === "ol") {
      selfTest.forEach((question, index) => {
        const first = key.items[index]![0]!;
        assert.equal(first.kind === "bold" && first.text, `${"ABCD"[question.answer]}.`, `${where}: key ${index + 1}`);
      });
    }
    assert.ok(!text.split("## 5.")[1]!.split("## 6.")[0]!.includes(lang === "en" ? "Answer" : "Đáp án"), `${where}: self-test section does not show answers`);

    // The pack goes through every exporter the page offers.
    assert.ok(renderDoc(text).includes("<h1>"), `${where}: preview`);
    assert.ok(docToPlain(text).length > 400, `${where}: plain text`);
    const docx = docToDocx(text);
    assert.equal(String.fromCharCode(docx[0]!, docx[1]!), "PK", `${where}: DOCX is a zip`);
  }
}

console.log(`study pack ok (${ready.length} sheets × 2 languages, ${formulas} formulas)`);

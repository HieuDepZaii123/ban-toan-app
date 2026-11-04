/**
 * Dạng bài 14 chủ đề: cấu trúc, văn phong, và số liệu qua sympy.
 * Chạy: tsx scripts/dang.test.ts
 */
import { execFileSync } from "node:child_process";
import { cards } from "../src/content/cards.ts";
import { allDang, collectChecks } from "../src/content/dang/index.ts";
import type { TopicDang } from "../src/content/dang/types.ts";

const fails: string[] = [];
function assert(cond: boolean, message: string): void {
  if (!cond) fails.push(message);
}

const MARK = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const BAD = /dễ thấy|hiển nhiên|\bem\b|\\dfrac/i;

function sentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/).map((part) => part.trim()).filter(Boolean);
}

function checkProse(where: string, text: string): void {
  assert(MARK.test(text), `${where} thiếu dấu tiếng Việt`);
  assert(!BAD.test(text), `${where} còn từ cấm hoặc \\dfrac`);
  for (const sentence of sentences(text)) {
    assert(!sentence.startsWith("$"), `${where} mở câu bằng ký hiệu: ${sentence.slice(0, 40)}`);
  }
}

function walk(topic: TopicDang): void {
  assert(topic.dang.length >= 1, `${topic.id} thiếu dạng`);
  const real = topic.sangTao.filter((item) => item.kind === "thuc-te");
  const own = topic.sangTao.filter((item) => item.kind === "tu-ra-de");
  assert(real.length >= 4, `${topic.id} cần ít nhất 4 câu thực tế`);
  assert(own.length === 1, `${topic.id} cần đúng một câu tự ra đề`);
  for (const dang of topic.dang) {
    checkProse(`${topic.id} ${dang.name} nhận dạng`, dang.nhanDang);
    checkProse(`${topic.id} ${dang.name} phương pháp`, dang.phuongPhap);
    checkProse(`${topic.id} ${dang.name} ví dụ`, dang.viDu.prompt);
    checkProse(`${topic.id} ${dang.name} kết`, dang.viDu.ket);
    checkProse(`${topic.id} ${dang.name} lỗi`, dang.loi);
    assert(dang.viDu.steps.length >= 2, `${topic.id} ví dụ thiếu bước`);
    for (const step of dang.viDu.steps) {
      checkProse(`${topic.id} bước`, step.claim);
      checkProse(`${topic.id} lý do`, step.why);
      assert(step.why.length > 8, `${topic.id} lý do quá ngắn`);
    }
    assert(dang.luyen.think.length > 8, `${topic.id} thiếu nghĩ thế nào`);
    checkProse(`${topic.id} nghĩ`, dang.luyen.think);
  }
  for (const item of topic.sangTao) {
    assert(item.think.length > 8, `${topic.id} sáng tạo thiếu nghĩ thế nào`);
    checkProse(`${topic.id} sáng tạo`, item.prompt);
    checkProse(`${topic.id} nghĩ sáng tạo`, item.think);
    assert(item.steps.length >= 2, `${topic.id} sáng tạo thiếu bước`);
  }
}

assert(allDang.length === 14, "đủ 14 chủ đề");
const ids = new Set(allDang.map((topic) => topic.id));
for (const card of cards) assert(ids.has(card.id), `thiếu ${card.id}`);

const checks: { where: string; expr: string; expect: string }[] = [];
for (const topic of allDang) {
  walk(topic);
  collectChecks(topic).forEach((check, index) => {
    checks.push({ where: `${topic.id}#${index}`, expr: check.expr, expect: check.expect });
  });
}

if (fails.length) {
  console.error(fails.join("\n"));
  process.exit(1);
}

execFileSync("python3", ["scripts/dang_sympy.py"], {
  input: JSON.stringify(checks),
  stdio: ["pipe", "inherit", "inherit"],
});
console.log(`dang ok: 14 chủ đề, ${checks.length} phép kiểm`);

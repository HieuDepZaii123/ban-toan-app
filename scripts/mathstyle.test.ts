/**
 * Quy ước trình bày toán bằng KaTeX trên toàn bộ nội dung.
 * Chạy: tsx scripts/mathstyle.test.ts   (thêm --list để in hết lỗi)
 */
import { MATH, mathIssues, proseIssues } from "./mathStyle.ts";
import { loadSources } from "./mathSources.ts";

const sources = await loadSources(process.cwd());
const byRule = new Map<string, string[]>();
let maths = 0;
for (const source of sources) {
  for (const text of source.strings) {
    for (const tex of text.match(MATH) ?? []) {
      maths += 1;
      for (const issue of mathIssues(tex, source.level, source.allowTimes, false, source.combo)) {
        byRule.set(issue.rule, [...(byRule.get(issue.rule) ?? []), `${source.file}: ${tex}`]);
      }
    }
    if (source.prose) {
      for (const issue of proseIssues(text)) byRule.set(issue.rule, [...(byRule.get(issue.rule) ?? []), `${source.file}: ${text.slice(0, 120)}`]);
    }
  }
  for (const text of source.english) {
    for (const tex of text.match(MATH) ?? []) {
      maths += 1;
      for (const issue of mathIssues(tex, source.level, source.allowTimes, true, source.combo)) {
        byRule.set(issue.rule, [...(byRule.get(issue.rule) ?? []), `${source.file} (EN): ${tex}`]);
      }
    }
  }
}

if (byRule.size) {
  const all = process.argv.includes("--list");
  for (const [rule, rows] of byRule) {
    console.error(`\n${rows.length} chỗ: ${rule}`);
    for (const row of all ? rows : rows.slice(0, 8)) console.error(`   ${row}`);
  }
  console.error("\nSửa tự động phần sửa được: npm run fix:math");
  process.exit(1);
}
console.log(`mathstyle ok: ${maths} công thức trong ${sources.length} nguồn`);

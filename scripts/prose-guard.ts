/**
 * Công cụ tạm khi chỉnh lời văn: so sánh một tệp với bản ở một commit và báo mọi đoạn công thức `$…$`
 * hoặc số nằm trong chuỗi đã bị thêm, bớt hay đổi. Dùng: tsx scripts/prose-guard.ts <rev> <tệp>...
 * Phần được thêm có chủ ý (ví dụ cách chứng minh khác) sẽ hiện ở mục «thêm»; việc cần làm là đọc cả hai danh sách.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

function tokens(text: string): Map<string, number> {
  const out = new Map<string, number>();
  const bump = (key: string) => out.set(key, (out.get(key) ?? 0) + 1);
  for (const m of text.matchAll(/\$([^$\n]+)\$/g)) bump(`$${(m[1] ?? "").replace(/\s+/g, "")}$`);
  // Số nằm ngoài công thức, trong chữ thường: giữ nguyên số liệu.
  const outside = text.replace(/\$[^$\n]+\$/g, " ");
  for (const m of outside.matchAll(/(?<![\w.])\d+(?:[.,]\d+)?(?![\w])/g)) bump(`#${m[0]}`);
  return out;
}

const [rev, ...files] = process.argv.slice(2);
if (!rev || files.length === 0) {
  console.error("dùng: tsx scripts/prose-guard.ts <rev> <tệp>...");
  process.exit(2);
}
let lost = 0;
for (const file of files) {
  const before = tokens(execFileSync("git", ["show", `${rev}:${file}`], { encoding: "utf8", maxBuffer: 1 << 26 }));
  const after = tokens(readFileSync(file, "utf8"));
  const gone: string[] = [];
  const added: string[] = [];
  for (const [key, n] of before) if ((after.get(key) ?? 0) < n) gone.push(`${key} ×${n - (after.get(key) ?? 0)}`);
  for (const [key, n] of after) if ((before.get(key) ?? 0) < n) added.push(`${key} ×${n - (before.get(key) ?? 0)}`);
  console.log(`${file}: mất ${gone.length}, thêm ${added.length}`);
  if (gone.length) console.log("  MẤT:", gone.slice(0, 40).join(" | "));
  if (added.length) console.log("  thêm:", added.slice(0, 12).join(" | "), added.length > 12 ? "…" : "");
  lost += gone.length;
}
process.exit(lost > 0 ? 1 : 0);

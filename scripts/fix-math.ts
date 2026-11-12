/**
 * Sửa tự động các lỗi trình bày toán mà máy sửa được (xem scripts/mathStyle.ts).
 * Chạy: npm run fix:math   rồi npm run test:math để xem phần còn phải sửa tay.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { MATH, fixMath } from "./mathStyle.ts";
import { loadSources } from "./mathSources.ts";

/** Vị trí này có nằm trong một chuỗi String.raw (R`...`) hay không. */
function isRawLiteral(code: string, at: number): boolean {
  const lineStart = code.lastIndexOf("\n", at) + 1;
  const before = code.slice(lineStart, at);
  const tick = before.lastIndexOf("`");
  const quote = Math.max(before.lastIndexOf('"'), before.lastIndexOf("'"));
  if (tick < 0 || quote > tick) return false;
  return /(?:\bR|String\.raw)$/.test(before.slice(0, tick));
}

const sources = await loadSources(process.cwd());
let changed = 0;
const missed: string[] = [];
for (const source of sources) {
  if (source.file.includes(" (")) continue;
  let code = readFileSync(source.file, "utf8");
  const before = code;
  for (const text of source.strings) {
    const fixed = text.replace(MATH, (tex) => fixMath(tex, source.level, source.allowTimes, source.combo));
    if (fixed === text) continue;
    const escaped = text.replace(/\\/g, "\\\\");
    const from = code.includes(escaped) ? escaped : code.includes(text) ? text : null;
    if (from === null) { missed.push(`${source.file}: ${text.slice(0, 100)}`); continue; }
    // Chuỗi String.raw giữ nguyên gạch chéo ngược; chuỗi thường phải viết gấp đôi.
    let next = "";
    let at = 0;
    for (;;) {
      const hit = code.indexOf(from, at);
      if (hit < 0) break;
      const raw = isRawLiteral(code, hit);
      next += code.slice(at, hit) + (raw ? fixed : fixed.replace(/\\/g, "\\\\"));
      at = hit + from.length;
    }
    code = next + code.slice(at);
    changed += 1;
  }
  if (code !== before) writeFileSync(source.file, code);
}
console.log(`đã sửa ${changed} chuỗi`);
if (missed.length) {
  console.log(`${missed.length} chuỗi không tìm thấy nguyên văn trong mã nguồn (chuỗi ghép hoặc sinh tự động), cần sửa tay:`);
  for (const row of missed.slice(0, 30)) console.log(`   ${row}`);
}

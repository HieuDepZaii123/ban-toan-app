/**
 * Cổng chất lượng sư phạm cho bài tư duy: những điều người đánh giá hay chê mà máy kiểm được.
 *  - mỗi loại bài giữ đúng hợp đồng của loại đó (ước lượng có làm tròn, tự ra đề có ví dụ mẫu, nhiều cách có hai cách...);
 *  - gợi ý không lộ đáp số hay nguyên bước đầu của lời giải;
 *  - đề tìm lỗi và phản ví dụ không tự chỉ ra cách làm;
 *  - không hai bài nào gần như trùng đề.
 * Khoản nợ đã biết nằm trong scripts/quality.debt.ts và chỉ được giảm.
 * Chạy: tsx scripts/quality.test.ts
 */
import { thinkByGrade, thinkByTopic, type Think } from "../src/content/think/index.ts";
import { QUALITY_DEBT } from "./quality.debt.ts";

const fails: string[] = [];
const seenDebt = new Set<string>();
const fail = (key: string, what: string): void => {
  if (QUALITY_DEBT.has(key)) {
    seenDebt.add(key);
    return;
  }
  fails.push(`${key}: ${what}`);
};

const maths = (text: string): string[] => (text.match(/\$[^$]+\$/g) ?? []).map((m) => m.replace(/\{,\}/g, ".").replace(/;/g, ",").replace(/\s|\\ /g, ""));
const prose = (text: string): string => text.replace(/\$[^$]+\$/g, " ").replace(/\s+/g, " ").trim();

function check(id: string, t: Think): void {
  for (const lang of ["vi", "en"] as const) {
    const steps = t.steps.map((s) => s[lang]).join(" ");
    const answer = t.answer[lang];
    const hint = t.hint[lang];
    const promptText = t.prompt[lang];
    if (t.kind === "estimate" && !/khoảng|gần|làm tròn|ước|\\approx|about|close|near|round|estimate|roughly|around/i.test(`${steps} ${answer}`)) {
      fail(`estimate:${id}:${lang}`, "bài ước lượng mà lời giải không nói tới làm tròn hay gần đúng");
    }
    if (t.kind === "design" && !/ví dụ mẫu|model example|the model/i.test(promptText)) {
      fail(`design:${id}:${lang}`, "bài tự ra đề phải nói rõ đâu là ví dụ mẫu");
    }
    if (t.kind === "multi" && !(/(Cách|Way) 1/.test(steps) && /(Cách|Way) 2/.test(steps))) {
      fail(`multi:${id}:${lang}`, "bài nhiều cách mà lời giải không đánh dấu Cách 1 và Cách 2");
    }
    if (t.kind === "counter" && !/không|sai|chỉ|nhưng|khác|false|not|differ|only|yet|but|\\ne\b|\\neq/i.test(`${answer} ${steps}`)) {
      fail(`counter:${id}:${lang}`, "phản ví dụ mà kết luận không nói câu gốc sai ở đâu");
    }
    const answerMath = new Set(maths(answer));
    const leaked = maths(hint).filter((m) => answerMath.has(m) && !/^\$?\d{1,2}\$?$/.test(m));
    if (leaked.length) fail(`hint-answer:${id}:${lang}`, `gợi ý lộ đáp số ${leaked[0]}`);
    const first = new Set(maths(t.steps[0]?.[lang] ?? ""));
    const hm = maths(hint).filter((m) => m.replace(/\$/g, "").length > 4);
    if (hm.length > 0 && hm.every((m) => first.has(m))) fail(`hint-step:${id}:${lang}`, "gợi ý chép nguyên công thức của bước đầu");
    if ((t.kind === "error" || t.kind === "counter") && /(^|\.\s)(Thử|Dùng|Try|Use)\s/.test(promptText)) {
      fail(`prompt-method:${id}:${lang}`, "đề tìm lỗi hoặc phản ví dụ tự chỉ ra cách làm");
    }
  }
}

const all: { id: string; think: Think }[] = [];
for (const [topic, list] of Object.entries(thinkByTopic)) list.forEach((t, i) => all.push({ id: `topic:${topic}:${i}`, think: t }));
for (const [grade, list] of Object.entries(thinkByGrade)) list.forEach((t, i) => all.push({ id: `grade:${grade}:${i}`, think: t }));
for (const { id, think } of all) check(id, think);

// Trùng đề: hai bài cùng phần chữ gần như giống nhau (tập từ trùng quá 80%).
const words = (t: Think): Set<string> => new Set(prose(t.prompt.vi).toLowerCase().split(/\s+/).filter((w) => w.length > 2));
for (let i = 0; i < all.length; i += 1) {
  for (let j = i + 1; j < all.length; j += 1) {
    const a = words(all[i]!.think);
    const b = words(all[j]!.think);
    if (a.size < 6 || b.size < 6) continue;
    let both = 0;
    for (const w of a) if (b.has(w)) both += 1;
    if (both / (a.size + b.size - both) > 0.8) fail(`dup:${all[i]!.id}:${all[j]!.id}`, "đề gần như trùng nhau");
  }
}

const paid = [...QUALITY_DEBT].filter((key) => !seenDebt.has(key));
if (paid.length) fails.push(`nợ đã trả, hãy xóa khỏi scripts/quality.debt.ts:\n    ${paid.join("\n    ")}`);
if (fails.length) {
  console.error(fails.slice(0, 80).join("\n"));
  console.error(`quality: ${fails.length} lỗi`);
  process.exit(1);
}
console.log(`quality ok: ${all.length} bài tư duy, còn ${seenDebt.size} khoản nợ đã khai`);

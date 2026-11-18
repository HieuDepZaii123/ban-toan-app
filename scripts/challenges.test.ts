/**
 * Thử thách của các lab (src/content/challenges.ts): nghiệm mẫu phải đạt, đề chưa giải thì không đạt,
 * lời giải thích hai ngôn ngữ đúng văn phong toán.
 * Chạy: tsx scripts/challenges.test.ts
 */
import { makeSay, type Dense, type Challenge, type LabSpec } from "../src/content/challenges.ts";
import { allLabSpecs as labSpecs } from "../src/content/labSpecs.ts";
import { mathIssues, MATH } from "./mathStyle.ts";

const fails: string[] = [];
const fail = (where: string, what: string): void => {
  fails.push(`${where}: ${what}`);
};
const VI = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
const TOPICS = ["quadratic", "ineq", "exp", "sequence", "trig", "limit", "derivative", "survey", "integral", "probability", "vector", "analytic", "triangle", "combo"];

function style(where: string, text: string, english: boolean, strict = false): void {
  const times = where.startsWith("vector/");
  if (!text.trim()) return fail(where, "trống");
  if (strict && /^\$/.test(text.trim())) fail(where, `câu mở đầu bằng ký hiệu: ${text}`);
  const rest = text.replace(MATH, "");
  if (english ? VI.test(rest) : strict && /[A-Za-z]{3}/.test(rest) && !VI.test(rest)) fail(where, `sai ngôn ngữ: ${text}`);
  if (english && /\{,\}/.test(text)) fail(where, `bản Anh còn dấu phẩy thập phân: ${text}`);
  for (const m of text.match(MATH) ?? []) {
    for (const issue of mathIssues(m.slice(1, -1), "upper", times, english)) fail(where, `${issue.rule}: ${m}`);
  }
}

function withinRange(where: string, spec: LabSpec, values: Record<string, number>): void {
  for (const [key, value] of Object.entries(values)) {
    const range = spec.range[key];
    if (!(key in spec.init)) fail(where, `tham số lạ ${key}`);
    else if (range && (value < range[0] - 1e-9 || value > range[1] + 1e-9)) fail(where, `${key}=${value} ngoài khoảng`);
  }
}

let total = 0;
for (const id of TOPICS) {
  const spec = labSpecs[id];
  if (!spec) {
    fail(id, "chưa có thử thách");
    continue;
  }
  if (spec.challenges.length < 6) fail(id, `chỉ có ${spec.challenges.length} thử thách, cần ít nhất 6`);
  const ids = new Set<string>();
  spec.challenges.forEach((c: Challenge) => {
    total += 1;
    const at = `${id}/${c.id}`;
    if (ids.has(c.id)) fail(at, "trùng mã");
    ids.add(c.id);
    style(`${at} đề vi`, c.vi, false, true);
    style(`${at} đề en`, c.en, true, true);
    withinRange(`${at} set`, spec, c.set);
    withinRange(`${at} sol`, spec, c.sol);
    const start = { ...spec.init, ...c.set };
    const answer = { ...spec.init, ...c.sol };
    for (const en of [false, true]) {
      const say = makeSay(en);
      const good = c.check(answer as Dense, say);
      const bad = c.check(start as Dense, say);
      const tag = en ? "en" : "vi";
      if (!good.ok) fail(at, `nghiệm mẫu không đạt (${tag}): ${good.why}`);
      if (bad.ok) fail(at, `đề chưa giải đã đạt (${tag})`);
      style(`${at} đúng ${tag}`, good.why, en);
      style(`${at} sai ${tag}`, bad.why, en);
    }
    if (c.sol.scene !== c.set.scene) fail(at, "nghiệm và đề khác cảnh");
    if (c.hint) {
      style(`${at} gợi ý vi`, c.hint.vi, false);
      style(`${at} gợi ý en`, c.hint.en, true);
    }
    if (![1, 2, 3].includes(c.level ?? 0)) fail(at, "thiếu mức độ Dễ/Vừa/Khó");
    // Hợp đồng độ chính xác: đổi một bước thanh trượt khỏi đáp án mẫu thì đề đóng phải trượt; đề mở phải thật sự có nhiều lời giải.
    const base = { ...spec.init, ...c.sol } as Record<string, number>;
    const accepted: string[] = [];
    for (const key of Object.keys(c.sol)) {
      const range = spec.range[key];
      if (key === "scene" || c.sol[key] === c.set[key] || !range) continue;
      for (const dir of [-1, 1]) {
        const value = Math.round(((base[key] ?? 0) + dir * range[2]) * 1e6) / 1e6;
        if (value < range[0] - 1e-9 || value > range[1] + 1e-9) continue;
        if (c.check({ ...base, [key]: value } as Dense, makeSay(false)).ok) accepted.push(`${key}${dir > 0 ? "+" : "-"}`);
      }
    }
    if (!c.open && accepted.length) fail(at, `đề đóng mà đổi một bước vẫn đạt (${accepted.join(" ")}): siết điều kiện hoặc khai open: true`);
    if (c.open && accepted.length === 0) fail(at, "khai open: true nhưng không có lời giải lân cận: bỏ cờ open");
    if (c.guess) {
      style(`${at} đoán vi`, c.guess.vi, false);
      style(`${at} đoán en`, c.guess.en, true);
      if (c.guess.options.length < 2 || c.guess.answer < 0 || c.guess.answer >= c.guess.options.length) fail(at, "đáp án đoán sai chỉ số");
      style(`${at} giải thích đoán vi`, c.guess.why.vi, false);
      style(`${at} giải thích đoán en`, c.guess.why.en, true);
      for (const o of c.guess.options) {
        style(`${at} lựa chọn vi`, o.vi, false);
        style(`${at} lựa chọn en`, o.en, true);
      }
    }
  });
}

if (fails.length) {
  console.error(`challenges: ${fails.length} lỗi\n${fails.map((line) => `  - ${line}`).join("\n")}`);
  process.exit(1);
}
console.log(`challenges ok: ${total} thử thách / ${TOPICS.length} lab`);

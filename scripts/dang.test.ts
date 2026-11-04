/**
 * Dạng bài 14 chủ đề: cấu trúc, văn phong, và số liệu qua sympy.
 * Chạy: tsx scripts/dang.test.ts
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
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

const RICH = new Set([
  "derivative", "survey", "integral", "exp", "analytic", "probability", "trig", "sequence", "limit",
  "vector", "triangle", "quadratic", "combo", "ineq",
]);
const RICH_KINDS = ["thuc-te", "tu-ra-de", "mo", "phan-bien", "doc", "uoc-luong"] as const;

function packOf(item: { check?: { expr: string; expect: string }; checks?: { expr: string; expect: string }[] }) {
  return [...(item.check ? [item.check] : []), ...(item.checks ?? [])];
}

function auditRich(topic: TopicDang): void {
  if (!RICH.has(topic.id)) return;
  const kinds = new Set(topic.sangTao.map((item) => item.kind));
  for (const kind of RICH_KINDS) assert(kinds.has(kind), `${topic.id} thiếu loại ${kind}`);
  const own = topic.sangTao.find((item) => item.kind === "tu-ra-de");
  assert(!!own && /đổi giả thiết/i.test(own.prompt) && /dự đoán/i.test(own.prompt), `${topic.id} tự ra đề chưa đòi đổi giả thiết rồi dự đoán`);
  for (const item of topic.sangTao) {
    if (item.kind === "thuc-te") {
      assert(/số liệu giả định/i.test(item.prompt), `${topic.id} thực tế thiếu số liệu giả định`);
      assert(/mét|đồng|độ|dm|sản phẩm|vé|mg|giây|phút|lít|gam|cá thể|người|lần|bóng|ghế|vòng|đơn vị/.test(item.answer), `${topic.id} thực tế thiếu đơn vị`);
      assert(item.sao !== undefined && item.sao >= 1 && item.sao <= 5, `${topic.id} sáng tạo thiếu mức sao`);
    }
    assert(item.answer.trim().endsWith("."), `${topic.id} đáp sáng tạo thiếu chấm`);
    checkProse(`${topic.id} đáp sáng tạo`, item.answer);
    for (const step of item.steps) {
      checkProse(`${topic.id} bước sáng tạo`, step.claim);
      checkProse(`${topic.id} lý do sáng tạo`, step.why);
      assert(step.why.trim().length >= 24 && /[.!?]$/.test(step.why.trim()), `${topic.id} lý do cụt: ${step.why}`);
    }
    const pack = packOf(item);
    assert(pack.length >= 1, `${topic.id} sáng tạo thiếu check`);
    for (const check of pack) {
      assert(check.expr.replace(/\s/g, "") !== check.expect.replace(/\s/g, ""), `${topic.id} check không kiểm đáp số`);
    }
  }
  for (const dang of topic.dang) {
    assert(dang.viDu.ket.trim().endsWith("."), `${topic.id} kết thiếu chấm`);
    assert(dang.luyen.answer.trim().endsWith("."), `${topic.id} đáp luyện thiếu chấm`);
    checkProse(`${topic.id} luyện`, dang.luyen.prompt);
    checkProse(`${topic.id} đáp luyện`, dang.luyen.answer);
    for (const block of [dang.viDu, dang.luyen]) {
      const pack = packOf(block);
      assert(pack.length >= 1, `${topic.id} ${dang.name} thiếu check`);
      for (const check of pack) {
        assert(check.expr.replace(/\s/g, "") !== check.expect.replace(/\s/g, ""), `${topic.id} check không kiểm đáp số`);
      }
      for (const step of block.steps) {
        checkProse(`${topic.id} bước`, step.claim);
        checkProse(`${topic.id} lý do`, step.why);
        assert(step.why.trim().length >= 24 && /[.!?]$/.test(step.why.trim()), `${topic.id} lý do cụt: ${step.why}`);
      }
    }
  }
  const blob = JSON.stringify(topic);
  assert(!blob.includes("e^{-t/"), `${topic.id} còn mũ e^{-t/4}`);
  assert(!blob.includes("Quy đồng."), `${topic.id} còn câu cụt`);
  if (topic.id === "derivative") {
    const tangent = topic.dang.find((dang) => dang.name.startsWith("Tiếp tuyến tại"));
    assert(!!tangent && tangent.luyen.answer.includes("24x-16"), "bài luyện tiếp tuyến phải là y=24x-16");
    const signed = collectChecks(topic).some((check) => check.expect.replace(/\s/g, "") === "-15");
    assert(signed, "phải có check T'(0)=-15");
  }
  if (topic.id === "survey") {
    const tank = topic.sangTao.find((item) => item.answer.includes("128"));
    assert(!!tank && /lớn nhất/i.test(tank.prompt) && tank.answer.includes("x=2"), "bài thùng phải là tối ưu Vmax=128 tại x=2");
    const own = topic.sangTao.find((item) => item.kind === "tu-ra-de");
    assert(!!own && own.think.includes("x^3-3mx") && own.think.includes("\\sqrt{m}"), "tự ra đề phải dùng họ x^3-3mx");
    assert(!!own && !own.think.includes("x^3-mx"), "không dùng công thức lệch của họ x^3-mx");
    assert(blob.includes("năm trường hợp") || blob.includes("Năm trường hợp"), "phải đủ năm trường hợp nghiệm");
    assert(blob.includes("g(x)=x^3-3x-1"), "phải định nghĩa g");
  }
  if (topic.id === "derivative") {
    assert(!blob.includes("Lagrange"), "không dùng định lí Lagrange");
    assert(!blob.includes("không phải loại nghiệm"), "bỏ cụm không phải loại nghiệm");
    assert(blob.includes("bất kì khoảng nào chứa cả hai điểm"), "thiếu cụm khoảng chứa cả hai điểm");
    const mono = topic.dang.find((dang) => dang.name.startsWith("Tính đơn điệu"));
    assert(!!mono && mono.luyen.prompt.includes("khoảng đơn điệu"), "bài luyện đơn điệu phải hỏi các khoảng");
    assert(!!mono && mono.luyen.answer.includes("(-\\infty;-1)") && mono.luyen.answer.includes("(-1;1)"), "khoảng đơn điệu chưa đúng");
  }
  if (topic.id === "trig") {
    assert(blob.includes("góc phần tư"), "thiếu góc phần tư");
    assert(!blob.includes("quý"), "còn chữ quý");
    assert(blob.includes("5\\\\sin"), "thiếu dạng 5 sin(x+phi)");
  }
  if (topic.id === "sequence") {
    assert(!blob.includes("chuỗi"), "còn chữ chuỗi");
    assert(blob.includes("bị chặn"), "thiếu dãy bị chặn");
  }
  if (topic.id === "limit") {
    assert(!blob.includes("sin 3") && !blob.includes("sin3"), "còn giới hạn sin 3x/x");
    const used = collectChecks(topic).filter((check) => check.expr.includes("limit("));
    assert(used.length >= 8, "chưa đủ phép kiểm bằng sympy limit");
  }
  if (topic.id === "vector") {
    assert(!blob.includes("(2;1;2)"), "còn vectơ không gian");
    assert(!blob.includes("hợp lực"), "bài thuyền còn lẫn lực");
    assert(blob.includes("trọng tâm"), "thiếu trọng tâm");
    assert(blob.includes("Phân tích"), "thiếu phân tích vectơ");
  }
  if (topic.id === "triangle") {
    assert(blob.includes("côsin"), "thiếu định lí côsin");
    assert(blob.includes("Định lí sin"), "thiếu định lí sin");
    assert(blob.includes("thể tích"), "thiếu thể tích khối");
  }
  if (topic.id === "quadratic") {
    assert(!blob.includes("đạo hàm"), "bậc hai còn đạo hàm");
    assert(blob.includes("a=0"), "thiếu trường hợp a=0");
    assert(blob.includes("loại"), "phương trình căn phải có bước loại");
  }
  if (topic.id === "combo") {
    const median = topic.dang.find((dang) => dang.name.startsWith("Trung bình"));
    assert(!!median && !median.luyen.prompt.includes("x^2"), "nhị thức còn nằm ở dạng trung bình");
    assert(topic.dang.some((dang) => dang.name.startsWith("Nhị thức")), "thiếu dạng nhị thức");
    assert(blob.includes("phương sai"), "thiếu phương sai");
    assert(blob.includes("Tứ phân vị"), "thiếu tứ phân vị");
  }
  if (topic.id === "ineq") {
    assert(!blob.includes("đạo hàm"), "bất đẳng thức còn đạo hàm");
    assert(!blob.includes("điện trở"), "còn bài điện trở song song");
    assert(blob.includes("Nâng cao"), "AM-GM phải ghi Nâng cao");
    assert(blob.includes("quy hoạch"), "thiếu quy hoạch tuyến tính");
    assert(!blob.includes("cần và đủ để khẳng định giá trị nhỏ nhất"), "còn câu sai về dấu bằng");
  }
}

function filesUnder(dir: string, out: string[]): void {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) filesUnder(path, out);
    else if (name.endsWith(".ts")) out.push(path);
  }
}

const contentFiles: string[] = [];
filesUnder("src/content", contentFiles);
const doubled = /\\{2}(ln|frac|sqrt|pi|pm|log)/;
for (const file of contentFiles) {
  const source = readFileSync(file, "utf8");
  const raws = source.match(/R`(?:\\`|[^`])*`/g) ?? [];
  for (const raw of raws) {
    assert(!doubled.test(raw), `${file} còn hai gạch chéo trước lệnh LaTeX`);
  }
}

function hasControl(text: string): boolean {
  for (let i = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i);
    if (code <= 8 || code === 11 || code === 12 || (code >= 14 && code <= 31)) return true;
  }
  return false;
}

function controlChars(value: unknown, where: string): void {
  if (typeof value === "string") {
    assert(!hasControl(value), `${where} còn ký tự điều khiển`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => controlChars(item, `${where}[${index}]`));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) controlChars(child, `${where}.${key}`);
  }
}

assert(hasControl(String.fromCharCode(11)), "bộ dò ký tự điều khiển");
assert(!hasControl("ok"), "bộ dò ký tự điều khiển");
assert(allDang.length === 14, "đủ 14 chủ đề");
const ids = new Set(allDang.map((topic) => topic.id));
for (const card of cards) assert(ids.has(card.id), `thiếu ${card.id}`);

const checks: { where: string; expr: string; expect: string }[] = [];
for (const topic of allDang) {
  controlChars(topic, topic.id);
  walk(topic);
  auditRich(topic);
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

/**
 * Công cụ lab: lịch sử hoàn tác, mã hóa liên kết chia sẻ, và mọi lab đều có khoảng tham số để giải mã.
 * Chạy: tsx scripts/labtools.test.ts
 */
import { allLabSpecs } from "../src/content/labSpecs.ts";
import { History, sig } from "../src/labs/history.ts";
import { toTex } from "../src/lib/tex.ts";
import { decodeParams, encodeParams, sanitizeParams, shareAdjusted } from "../src/labs/shared.ts";

const fails: string[] = [];
const expect = (cond: boolean, what: string): void => {
  if (!cond) fails.push(what);
};

const h = new History({ a: 1 });
expect(!h.record({ a: 1 }), "ghi lại trạng thái trùng phải bị bỏ qua");
expect(h.record({ a: 2 }) && h.record({ a: 3 }), "ghi trạng thái mới");
expect(h.undo()?.a === 2, "hoàn tác về 2");
expect(h.undo()?.a === 1, "hoàn tác về 1");
expect(h.undo() === null, "hết lịch sử thì không hoàn tác được");
expect(h.redo()?.a === 2 && h.redo()?.a === 3, "làm lại 2 rồi 3");
expect(h.redo() === null, "hết làm lại");
h.undo();
h.record({ a: 9 });
expect(h.future.length === 0, "ghi mới phải xóa nhánh làm lại");
const cap = new History({ n: 0 }, 5);
for (let i = 1; i <= 20; i += 1) cap.record({ n: i });
expect(cap.past.length === 5, "lịch sử bị chặn ở giới hạn");
expect(sig({ b: 1, a: 2 }) === sig({ a: 2, b: 1 }), "chữ ký không phụ thuộc thứ tự khóa");

const tex: [string, string][] = [
  ["−√3/2", "$-\\frac{\\sqrt{3}}{2}$"],
  ["√2/2", "$\\frac{\\sqrt{2}}{2}$"],
  ["1/√2", "$\\frac{1}{\\sqrt{2}}$"],
  ["2π/3", "$\\frac{2\\pi}{3}$"],
  ["1 / 6", "$\\frac{1}{6}$"],
  ["2^10", "$2^{10}$"],
  ["10^−3", "$10^{-3}$"],
  ["2.5 s", "$2{,}5\\ \\mathrm{s}$"],
  ["20 m/s", "$20\\ \\mathrm{m/s}$"],
  ["4 m²", "$4\\ \\mathrm{m}^2$"],
  ["uₙ", "$u_{n}$"],
  ["S′", "$S'$"],
  ["y″", "$y''$"],
  ["tan 45°", "$\\tan 45^\\circ$"],
  ["(−∞; 2]", "$(-\\infty ;\\ 2]$"],
  ["[−1; 3)", "$[-1;\\ 3)$"],
  ["(2; 3)", "$(2;\\ 3)$"],
  ["x = 1,5", "$x = 1{,}5$"],
  ["x = 1,5.", "$x = 1{,}5$."],
  ["Đỉnh (1; −4).", "Đỉnh $(1;\\ -4)$."],
  ["50 m · 5 s", "$50\\ \\mathrm{m}\\cdot 5\\ \\mathrm{s}$"],
  ["|u × v|", "$|u \\times v|$"],
  ["3 × 4 × 5", "$3 \\times 4 \\times 5$"],
  ["∫ 2x dx", "$\\int 2x\\,dx$"],
  ["log₁₀ M", "$\\log_{10} M$"],
  ["Bằng", "Bằng"],
  ["Khi dừng", "Khi dừng"],
  ["1,5 phút", "$1{,}5$ phút"],
  ["x³/3", "$\\frac{x^3}{3}$"],
  ["F(x) = x²/2 + C", "$F(x) = \\frac{x^2}{2} + C$"],
  ["(x+1)/(x−1)", "$\\frac{x+1}{x-1}$"],
  ["2^(-3)", "$2^{-3}$"],
  ["e^(2x)", "$e^{2x}$"],
  ["√(x+1)", "$\\sqrt{x+1}$"],
  ["lim x→2 f(x) = 4", "$\\lim_{x\\to 2} f(x) = 4$"],
  ["1/x", "$\\frac{1}{x}$"],
];
for (const [input, want] of tex) expect(toTex(input) === want, `toTex(${input}) = ${toTex(input)}, cần ${want}`);

{
  const spec = allLabSpecs.ineq!;
  expect(sanitizeParams(null, spec.init, spec.range) === null, "sanitizeParams: null phải bị từ chối");
  expect(sanitizeParams([1, 2], spec.init, spec.range) === null, "sanitizeParams: mảng phải bị từ chối");
  expect(sanitizeParams({ a: "x", zzz: 5 }, spec.init, spec.range) === null, "sanitizeParams: giá trị không phải số, khóa lạ");
  const wild = sanitizeParams({ scene: 99, a: Number.NaN, b: 1e9, zzz: 5 }, spec.init, spec.range);
  expect(wild !== null && (wild.scene ?? 0) <= 2 && wild.a === spec.init.a && !("zzz" in wild), "sanitizeParams: kẹp khoảng, bỏ NaN và khóa lạ");
  expect(shareAdjusted("scene:99", spec.init, spec.range), "shareAdjusted: giá trị ngoài khoảng phải được báo");
  expect(shareAdjusted("zzz:1", spec.init, spec.range), "shareAdjusted: khóa lạ phải được báo");
  expect(!shareAdjusted(encodeParams(spec.init), spec.init, spec.range), "shareAdjusted: liên kết hợp lệ không bị báo");
}

for (const [id, spec] of Object.entries(allLabSpecs)) {
  const code = encodeParams(spec.init);
  const back = decodeParams(code, spec.init, spec.range);
  expect(back !== null && sig(back) === sig(spec.init), `${id}: mã hóa rồi giải mã phải trả lại cấu hình gốc`);
  for (const c of spec.challenges) {
    const full = { ...spec.init, ...c.sol };
    const round = decodeParams(encodeParams(full), spec.init, spec.range);
    expect(round !== null && sig(round) === sig(full), `${id}/${c.id}: đáp án mẫu không qua được liên kết chia sẻ`);
  }
  const key = Object.keys(spec.init)[1] ?? "scene";
  const range = spec.range[key];
  const wild = decodeParams(`${key}:99999,evil:1,__proto__:2,x`, spec.init, spec.range);
  expect(wild !== null && range !== undefined && (wild[key] ?? 0) <= range[1], `${id}: giá trị quá lớn phải bị kẹp vào khoảng`);
  expect(wild !== null && !("evil" in wild), `${id}: khóa lạ phải bị bỏ`);
  expect(decodeParams("rac:roi,,;;", spec.init, spec.range) === null, `${id}: chuỗi rác phải bị từ chối`);
}

if (fails.length) {
  console.error(`labtools: ${fails.length} lỗi\n${fails.map((line) => `  - ${line}`).join("\n")}`);
  process.exit(1);
}
console.log(`labtools ok: lịch sử, chia sẻ, ${Object.keys(allLabSpecs).length} lab`);

/**
 * Công cụ lab: lịch sử hoàn tác, mã hóa liên kết chia sẻ, và mọi lab đều có khoảng tham số để giải mã.
 * Chạy: tsx scripts/labtools.test.ts
 */
import { allLabSpecs } from "../src/content/labSpecs.ts";
import { History, sig } from "../src/labs/history.ts";
import { decodeParams, encodeParams } from "../src/labs/shared.ts";

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

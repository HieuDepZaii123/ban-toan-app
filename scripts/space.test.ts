/**
 * Hình vẽ không gian lớp 11 (src/content/grades/space.ts): mọi điểm được dùng đều có tọa độ, mỗi góc vuông được đánh dấu
 * thật sự vuông về tọa độ, các điểm phụ (chân đường vuông góc, trung điểm, điểm chia) đúng vị trí, có lời tả hai ngôn ngữ,
 * và khóa trỏ tới một bài có thật. Chạy: tsx scripts/space.test.ts
 */
import assert from "node:assert/strict";
import { gradeBooks as books } from "../src/content/grades/index.ts";
import { spaceFigures, type P3 } from "../src/content/grades/space.ts";

const sub = (a: P3, b: P3): P3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a: P3, b: P3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const len = (a: P3) => Math.sqrt(dot(a, a));
const near = (x: number, y: number) => Math.abs(x - y) < 1e-9;

const lessons = new Set(books.flatMap((book) => book.chapters.flatMap((chapter) => chapter.lessons.map((lesson) => `${book.grade}/${lesson.id}`))));

for (const [key, fig] of Object.entries(spaceFigures)) {
  assert.ok(lessons.has(key), `${key}: không có bài này`);
  assert.ok(fig.alt.vi.length > 30 && fig.alt.en.length > 30, `${key}: thiếu lời tả`);
  const names = new Set(Object.keys(fig.points));
  const all = [...fig.edges.flatMap((e) => [e.a, e.b]), ...(fig.planes ?? []).flatMap((p) => p.pts), ...(fig.right ?? []).flatMap((r) => [r.at, r.p, r.q]), ...(fig.angles ?? []).flatMap((g) => [g.at, g.p, g.q]), ...(fig.dots ?? [])];
  for (const n of all) assert.ok(names.has(n), `${key}: điểm ${n} chưa có tọa độ`);
  for (const r of fig.right ?? []) {
    const at = fig.points[r.at]!;
    assert.ok(near(dot(sub(fig.points[r.p]!, at), sub(fig.points[r.q]!, at)), 0), `${key}: góc vuông tại ${r.at} giữa ${r.p} và ${r.q} không vuông`);
  }
  for (const e of fig.edges) assert.ok(len(sub(fig.points[e.a]!, fig.points[e.b]!)) > 0, `${key}: cạnh ${e.a}${e.b} dài bằng 0`);
}

// Các hệ thức của từng hình được nêu trong bài.
const on = (key: string, n: string) => spaceFigures[key]!.points[n]!;
{
  const k = "11/kc-diem-duong";
  const H = on(k, "H"), S = on(k, "S"), A = on(k, "A"), B = on(k, "B");
  assert.ok(near(len(sub(H, A)), 12 / 5), "AH phải dài 12/5 với SA=3, AB=4");
  assert.ok(near(dot(sub(H, A), sub(B, S)), 0), "AH vuông góc SB");
}
{
  const k = "11/kc-song-song-kg";
  const H = on(k, "H"), S = on(k, "S"), A = on(k, "A"), D = on(k, "D");
  assert.ok(near(dot(sub(H, A), sub(D, S)), 0), "AH vuông góc SD");
}
{
  const k = "11/kc-cheo-nhau";
  const H = on(k, "H"), A = on(k, "A"), B = on(k, "B"), D = on(k, "D");
  assert.ok(near(dot(sub(H, A), sub(D, B)), 0), "AH vuông góc BD");
  assert.ok(near(len(sub(H, A)), 12 / 5), "AH dài 12/5 với đáy 3 và 4");
}
{
  const k = "11/kc-the-tich";
  const H = on(k, "H"), A = on(k, "A"), B = on(k, "B"), C = on(k, "C");
  assert.ok(near(dot(H, sub(B, A)), 0) && near(dot(H, sub(C, A)), 0), "OH vuông góc mặt phẳng ABC (O là gốc)");
  assert.ok(near(len(H), Math.sqrt(3)), "OH dài căn ba với ba cạnh bằng 3");
}
{
  const k = "11/thales-kg";
  const S = on(k, "S"), A = on(k, "A"), B = on(k, "B"), M = on(k, "M"), N = on(k, "N");
  assert.ok(near(len(sub(M, S)) / len(sub(A, S)), 1 / 3) && near(len(sub(N, S)) / len(sub(B, S)), 1 / 3), "SM = SA/3");
  assert.ok(near(len(sub(M, N)) / len(sub(A, B)), 1 / 3), "MN song song AB và bằng AB/3");
}
{
  const k = "11/thiet-dien-ss";
  const S = on(k, "S"), A = on(k, "A"), M = on(k, "M"), N = on(k, "N"), B = on(k, "B");
  assert.ok(near(len(sub(M, S)) / len(sub(A, S)), 1 / 3), "SM = SA/3");
  assert.ok(near(len(sub(M, N)), len(sub(A, B)) / 3), "MN = AB/3");
  assert.ok(near(M[2], N[2]), "thiết diện song song đáy");
}
{
  const k = "11/goc-hai-dt-cheo";
  const A = on(k, "A"), C = on(k, "C"), Ap = on(k, "A'"), D = on(k, "D");
  const u = sub(C, A), v = sub(D, Ap);
  assert.ok(near(Math.abs(dot(u, v)) / (len(u) * len(v)), 0.5), "góc AC và A'D bằng 60 độ");
}
{
  const k = "11/tich-vo-huong-hinh";
  const A = on(k, "A"), B = on(k, "B"), C = on(k, "C");
  assert.ok(near(dot(sub(B, A), sub(C, A)) / (len(sub(B, A)) * len(sub(C, A))), Math.SQRT1_2), "góc BAC bằng 45 độ");
}
console.log(`space ok: ${Object.keys(spaceFigures).length} hình`);

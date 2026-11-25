/**
 * Hình vẽ không gian lớp 11 (src/content/grades/space.ts): mọi điểm được dùng đều có tọa độ, mỗi góc vuông được đánh dấu
 * thật sự vuông về tọa độ, các điểm phụ (chân đường vuông góc, trung điểm, điểm chia) đúng vị trí, có lời tả hai ngôn ngữ,
 * và khóa trỏ tới một bài có thật. Chạy: tsx scripts/space.test.ts
 */
import assert from "node:assert/strict";
import { gradeBooks as books } from "../src/content/grades/index.ts";
import type { P3 } from "../src/content/grades/space.ts";
import { allSpaceFigures as spaceFigures } from "../src/content/grades/spaceAll.ts";

const sub = (a: P3, b: P3): P3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a: P3, b: P3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const len = (a: P3) => Math.sqrt(dot(a, a));
const cross = (a: P3, b: P3): P3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
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

// Phần hai: các bài cũ lớp 11 và Oxyz lớp 12.
const sum = (p: P3) => p[0] + p[1] + p[2];
{
  const k = "11/song-song";
  const S = on(k, "S"), A = on(k, "A"), B = on(k, "B"), M = on(k, "M"), N = on(k, "N");
  assert.ok(near(len(sub(M, S)), len(sub(A, S)) / 2) && near(len(sub(N, S)), len(sub(B, S)) / 2), "M, N là trung điểm");
  assert.ok(near(len(sub(M, N)), len(sub(A, B)) / 2), "MN bằng nửa AB");
}
{
  const k = "11/goc-kc";
  const S = on(k, "S"), O = on(k, "O"), M = on(k, "M");
  assert.ok(near(dot(sub(S, O), sub(M, O)), 0) && near(len(sub(S, O)), 2) && near(len(sub(M, O)), 2), "SO = OM = 2 và SO vuông OM");
}
{
  const k = "11/the-tich-goc";
  const S = on(k, "S"), A = on(k, "A"), C = on(k, "C");
  assert.ok(near(len(sub(S, A)) / len(sub(C, A)), Math.sqrt(3)), "tan 60° = SA / AC");
}
{
  const k = "11/kc-diem-mp";
  const S = on(k, "S"), A = on(k, "A"), B = on(k, "B"), H = on(k, "H");
  assert.ok(near(dot(sub(H, A), sub(B, S)), 0), "AH vuông góc SB");
  assert.ok(near(len(sub(H, A)), (3 * Math.sqrt(2)) / 2), "AH = 3√2/2 với SA = AB = 3");
}
{
  const k = "11/phep-chieu-ss";
  const M = on(k, "M"), N = on(k, "N"), P = on(k, "P"), Mp = on(k, "M'"), Np = on(k, "N'"), Pp = on(k, "P'");
  assert.ok(near(len(sub(N, M)) * 2, len(sub(P, N))), "MN:NP = 1:2");
  assert.ok(near(len(sub(Np, Mp)) * 2, len(sub(Pp, Np))), "M'N':N'P' = 1:2");
  assert.ok(near(len(cross(sub(Np, Mp), sub(Pp, Mp))), 0), "hình chiếu vẫn thẳng hàng");
  assert.ok(near(Mp[2] + Np[2] + Pp[2], 0), "hình chiếu nằm trong mặt phẳng z = 0");
}
{
  const k = "12/mat-phang";
  for (const n of ["A", "B", "C"]) assert.ok(near(sum(on(k, n)), 1), `${n} thuộc x + y + z = 1`);
}
{
  const k = "12/vtt-d-mp";
  const I = on(k, "I"), D1 = on(k, "D1"), D2 = on(k, "D2");
  assert.ok(near(sum(I), 3), "I thuộc mặt phẳng x + y + z = 3");
  assert.ok(sum(D1) < 3 && sum(D2) > 3, "hai đầu đường thẳng nằm hai phía của mặt phẳng");
  assert.ok(near(len(cross(sub(I, D1), sub(D2, D1))), 0), "I thuộc đường thẳng d");
  for (const n of ["R1", "R2", "R3", "R4"]) assert.ok(near(sum(on(k, n)), 3), `${n} thuộc mặt phẳng`);
}
{
  const k = "12/mat-cau-tx";
  const I = on(k, "I"), T = on(k, "T");
  assert.ok(near(len(sub(T, I)), Math.sqrt(3)) && near(sum(T), 6), "IT bằng bán kính và T thuộc mặt phẳng");
  assert.ok(near(len(cross(sub(T, I), [1, 1, 1])), 0), "IT cùng phương pháp tuyến");
}
{
  const k = "12/hinh-chieu-dx";
  const M = on(k, "M"), H = on(k, "H"), Mp = on(k, "M'");
  assert.ok(near(sum(H), 9), "H thuộc mặt phẳng x + y + z = 9");
  assert.ok(near(len(cross(sub(M, H), [1, 1, 1])), 0), "MH cùng phương pháp tuyến");
  assert.ok(near(H[0] * 2, M[0] + Mp[0]) && near(H[1] * 2, M[1] + Mp[1]) && near(H[2] * 2, M[2] + Mp[2]), "H là trung điểm MM'");
}
{
  const k = "12/tinh-tich-co-huong";
  const A = on(k, "A"), B = on(k, "B"), N = on(k, "N");
  const c = cross(A, B);
  assert.ok(near(c[0], N[0]) && near(c[1], N[1]) && near(c[2], N[2]), "N bằng tích có hướng của a và b");
}
{
  const k = "12/song-song-vuong-goc-mp";
  for (const n of ["P1", "P2", "P3", "P4"]) assert.ok(near(on(k, n)[0] + 2 * on(k, n)[1] - on(k, n)[2] + 1, 0), `${n} thuộc mặt (P)`);
  for (const n of ["Q1", "Q2", "Q3", "Q4"]) assert.ok(near(2 * on(k, n)[0] + 4 * on(k, n)[1] - 2 * on(k, n)[2] + 5, 0), `${n} thuộc mặt (Q)`);
}
{
  const k = "12/duong-mat-quan-he";
  for (const n of ["P1", "P2", "P3", "P4"]) assert.ok(near(on(k, n)[0] - 2 * on(k, n)[1] + on(k, n)[2] - 3, 0), `${n} thuộc mặt phẳng`);
  const M = on(k, "M");
  assert.ok(!near(M[0] - 2 * M[1] + M[2] - 3, 0), "M không thuộc mặt phẳng");
  assert.ok(near(dot(sub(on(k, "D2"), on(k, "D1")), [1, -2, 1]), 0), "chỉ phương vuông góc pháp tuyến");
}
console.log(`space ok: ${Object.keys(spaceFigures).length} hình`);

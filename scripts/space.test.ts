/**
 * Hình vẽ không gian lớp 11 (src/content/grades/space.ts): mọi điểm được dùng đều có tọa độ, mỗi góc vuông được đánh dấu
 * thật sự vuông về tọa độ, các điểm phụ (chân đường vuông góc, trung điểm, điểm chia) đúng vị trí, có lời tả hai ngôn ngữ,
 * và khóa trỏ tới một bài có thật. Chạy: tsx scripts/space.test.ts
 */
import assert from "node:assert/strict";
import { gradeBooks as books } from "../src/content/grades/index.ts";
import { rotate, startViewFor } from "../src/lib/rotate3d.ts";
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
  const k = "12/tich-vo-huong-hinh";
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

// Hình của chương phương trình trong Oxyz.
{
  const k = "12/pt-dt-oxyz";
  const A = on(k, "A"), M = on(k, "M"), D1 = on(k, "D1"), D2 = on(k, "D2");
  assert.ok(near(len(cross(sub(M, A), [2, -1, 4])), 0), "M thuộc đường thẳng qua A chỉ phương (2; -1; 4)");
  assert.ok(near(len(cross(sub(D2, D1), [2, -1, 4])), 0) && near(len(cross(sub(D1, A), [2, -1, 4])), 0), "hai đầu mút vẽ nằm trên đường thẳng");
}
{
  const k = "12/doan-thang-oxyz";
  const A = on(k, "A"), B = on(k, "B"), I = on(k, "I"), N = on(k, "N");
  const at = (t: number): number[] => [0, 1, 2].map((i) => A[i]! + t * (B[i]! - A[i]!));
  assert.ok(near(len(sub(I, at(0.5) as [number, number, number])), 0), "I là trung điểm");
  assert.ok(near(len(sub(N, at(0.75) as [number, number, number])), 0), "N ứng với t = 3/4");
}
{
  const k = "12/pt-mp-dang";
  for (const n of ["M", "P1", "P2", "P3", "P4"]) assert.ok(near(on(k, n)[0] + 2 * on(k, n)[1] - on(k, n)[2] - 2, 0), `${n} thuộc mặt phẳng x + 2y - z - 2 = 0`);
  assert.ok(near(len(cross(sub(on(k, "N"), on(k, "G")), [1, 2, -1])), 0), "n cùng phương pháp tuyến (1; 2; -1)");
}
{
  const k = "12/lap-dt-mp";
  for (const n of ["H", "P1", "P2", "P3", "P4"]) assert.ok(near(on(k, n)[0] - 2 * on(k, n)[1] + on(k, n)[2] + 1, 0), `${n} thuộc mặt phẳng (P)`);
  assert.ok(near(len(cross(sub(on(k, "H"), on(k, "A")), [1, -2, 1])), 0), "AH vuông góc với (P)");
}

{
  const k = "12/vtt-hai-dt";
  const A = on(k, "A"), C = on(k, "C"), D1 = on(k, "D1"), D2 = on(k, "D2"), E1 = on(k, "E1"), E2 = on(k, "E2");
  assert.ok(near(len(cross(sub(D2, D1), [2, -1, 1])), 0) && near(len(cross(sub(A, D1), [2, -1, 1])), 0), "d1 qua A chỉ phương (2; -1; 1)");
  assert.ok(near(len(cross(sub(E2, E1), [1, 2, 0])), 0) && near(len(cross(sub(C, E1), [1, 2, 0])), 0), "d3 qua C chỉ phương (1; 2; 0)");
  assert.ok(!near(dot(cross([2, -1, 1], [1, 2, 0]), sub(C, A)), 0), "hai đường chéo nhau");
}
{
  const k = "12/giao-hai-dt";
  const M = on(k, "M");
  assert.ok(near(len(cross(sub(on(k, "D2"), on(k, "D1")), [1, -1, 2])), 0) && near(len(cross(sub(M, on(k, "D1")), [1, -1, 2])), 0), "M thuộc d");
  assert.ok(near(len(cross(sub(on(k, "E2"), on(k, "E1")), [1, 1, -1])), 0) && near(len(cross(sub(M, on(k, "E1")), [1, 1, -1])), 0), "M thuộc d'");
}
{
  const k = "12/duong-cat-hai-dt";
  const P = on(k, "P"), Q = on(k, "Q"), A = on(k, "A");
  assert.ok(near(len(cross(sub(P, A), sub(Q, A))), 0), "A, P, Q thẳng hàng");
  assert.ok(near(P[1], 0) && near(P[2], 0), "P thuộc d1");
  assert.ok(near(Q[0], 0) && near(Q[2], 1), "Q thuộc d2");
  assert.ok(near(len(cross(sub(on(k, "F"), A), [4, 1, 2])), 0), "đầu mút vẽ nằm trên đường thẳng");
}
{
  const k = "12/dt-trong-mp";
  for (const n of ["M", "P1", "P2", "P3", "P4", "F1", "F2"]) assert.ok(near(on(k, n)[0] + on(k, n)[1] + on(k, n)[2] - 6, 0), `${n} thuộc mặt phẳng (P)`);
  const M = on(k, "M");
  assert.ok(near(len(cross(sub(on(k, "F2"), on(k, "F1")), [-2, 1, 1])), 0) && near(len(cross(sub(M, on(k, "F1")), [-2, 1, 1])), 0), "Δ qua M chỉ phương (-2; 1; 1)");
  assert.ok(near(dot(sub(on(k, "B2"), on(k, "B1")), [-2, 1, 1]), 0), "Δ vuông góc d");
  assert.ok(near(len(cross(sub(on(k, "B2"), on(k, "B1")), [1, 2, 0])), 0) && near(len(cross(sub(M, on(k, "B1")), [1, 2, 0])), 0), "d qua M chỉ phương (1; 2; 0)");
}

// Hình ba đường conic lớp 10.
{
  const k = "10/elip-tieu-diem";
  const M = on(k, "M"), F1 = on(k, "F1"), F2 = on(k, "F2");
  assert.ok(near(M[0] ** 2 / 25 + M[2] ** 2 / 9, 1), "M thuộc elip");
  assert.ok(near(len(sub(M, F1)) + len(sub(M, F2)), 10), "MF1 + MF2 = 2a = 10");
  assert.ok(near(F2[0] ** 2, 16), "tiêu điểm cách tâm c = 4");
  for (const n of Object.keys(spaceFigures[k]!.points).filter((x) => /^E\d+$/.test(x))) assert.ok(near(on(k, n)[0] ** 2 / 25 + on(k, n)[2] ** 2 / 9, 1), `${n} thuộc elip`);
}
{
  const k = "10/hypebol-tieu-diem";
  for (const n of Object.keys(spaceFigures[k]!.points).filter((x) => /^[LR]\d+$/.test(x))) assert.ok(near(on(k, n)[0] ** 2 / 9 - on(k, n)[2] ** 2 / 16, 1), `${n} thuộc hypebol`);
  assert.ok(near(on(k, "F2")[0] ** 2, 25), "tiêu điểm cách tâm c = 5");
  assert.ok(near(on(k, "T2")[2] * 3, on(k, "T2")[0] * 4), "tiệm cận y = 4x/3");
}
{
  const k = "10/parabol-chuan";
  for (const n of Object.keys(spaceFigures[k]!.points).filter((x) => /^P\d+$/.test(x))) assert.ok(near(on(k, n)[2] ** 2, 12 * on(k, n)[0]), `${n} thuộc parabol`);
  const M = on(k, "M"), F = on(k, "F"), H = on(k, "H");
  assert.ok(near(M[2] ** 2, 12 * M[0]), "M thuộc parabol");
  assert.ok(near(len(sub(M, F)), len(sub(M, H))), "MF bằng khoảng cách đến đường chuẩn");
  assert.ok(near(H[0], -3) && near(F[0], 3), "đường chuẩn x = -3, tiêu điểm (3; 0)");
}

{
  const k = "12/mp-cuc-tri-oxyz";
  const A = on(k, "A"), B = on(k, "B"), A2 = on(k, "A2"), M = on(k, "M");
  assert.ok(near(A2[0], A[0]) && near(A2[1], A[1]) && near(A2[2], -A[2]), "A2 đối xứng A qua mặt phẳng z = 0");
  assert.ok(near(M[2], 0) && near(len(cross(sub(M, A2), sub(B, A2))), 0), "M thuộc A2B và mặt phẳng z = 0");
  assert.ok(near(len(sub(B, A2)), Math.sqrt(24)), "A2B bằng 2 căn 6");
}
{
  const k = "12/tong-hop-oxyz";
  const H = on(k, "H");
  assert.ok(near(6 * H[0] + 3 * H[1] + 2 * H[2] - 6, 0), "H thuộc mặt phẳng ABC");
  assert.ok(near(len(cross(H, [6, 3, 2])), 0), "OH cùng phương pháp tuyến");
  assert.ok(near(len(H), 6 / 7), "OH bằng 6/7");
}
{
  const k = "12/kc-diem-oxyz";
  const M = on(k, "M"), H = on(k, "H");
  for (const n of ["H", "P1", "P2", "P3", "P4"]) assert.ok(near(2 * on(k, n)[0] - on(k, n)[1] + 2 * on(k, n)[2] - 4, 0), `${n} thuộc mặt phẳng 2x - y + 2z - 4 = 0`);
  assert.ok(near(len(cross(sub(M, H), [2, -1, 2])), 0), "MH vuông góc mặt phẳng");
  assert.ok(near(len(sub(M, H)), 2 / 3), "MH bằng 2/3");
}
{
  const k = "12/cuc-tri-hieu-oxyz";
  const A = on(k, "A"), B = on(k, "B"), M = on(k, "M");
  assert.ok(near(M[2], 0) && near(len(cross(sub(B, A), sub(M, A))), 0), "M thuộc đường AB và mặt phẳng z = 0");
  assert.ok(near(Math.abs(len(sub(M, A)) - len(sub(M, B))), len(sub(B, A))), "|MA - MB| bằng AB");
}
{
  const k = "12/chung-minh-vecto-kg";
  const A = on(k, "A"), B = on(k, "B"), C2 = on(k, "C'"), D2 = on(k, "D'");
  const ac = sub(C2, A), ab = sub(B, A), ad = sub(D2, A);
  assert.ok(near(len(sub(ad, sub(ac, ab))), 0), "AD' = AC' - AB nên bốn điểm A, B, C', D' đồng phẳng");
}
{
  const k = "12/tinh-goc-do-dai-vecto";
  const A = on(k, "A"), B = on(k, "B"), C2 = on(k, "C'"), D2 = on(k, "D'"), O = on(k, "O");
  const u = sub(C2, A), v = sub(D2, B);
  assert.ok(near(Math.abs(dot(u, v)) / (len(u) * len(v)), 1 / 3), "cô-sin góc giữa hai đường chéo bằng 1/3");
  assert.ok(near(O[0] * 2, A[0] + C2[0]) && near(O[2] * 2, A[2] + C2[2]) && near(O[1] * 2, B[1] + D2[1]), "O là trung điểm của cả hai đường chéo");
}
{
  const k = "12/toa-do-hoa-hinh";
  const A = on(k, "A"), B = on(k, "B"), D = on(k, "D"), S = on(k, "S"), C = on(k, "C");
  assert.ok(near(dot(sub(B, A), sub(D, A)), 0) && near(dot(sub(B, A), sub(S, A)), 0) && near(dot(sub(D, A), sub(S, A)), 0), "AB, AD, AS đôi một vuông góc");
  assert.ok(near(len(sub(S, A)), 2) && near(len(sub(B, A)), 2), "SA = AB = 2");
  assert.ok(near(dot(sub(C, S), sub(D, B)), 0), "SC vuông góc BD");
}
// Hình đường tròn lớp 10.
{
  const k = "10/vtt-dt-tron";
  const I = on(k, "I"), F = on(k, "F"), A = on(k, "A"), B = on(k, "B");
  assert.ok(near(len(sub(A, I)), 5) && near(len(sub(B, I)), 5), "A, B thuộc đường tròn bán kính 5");
  assert.ok(near(dot(sub(F, I), sub(B, A)), 0) && near(len(sub(F, I)), 3), "IF vuông góc AB và bằng 3");
  assert.ok(near(len(sub(B, A)), 8), "dây cung dài 8");
}
{
  const k = "10/tiep-tuyen-tron";
  const O = on(k, "O"), A = on(k, "A");
  for (const n of ["T1", "T2"]) {
    const T = on(k, n);
    assert.ok(near(len(sub(T, O)), 3), `${n} thuộc đường tròn`);
    assert.ok(near(dot(sub(T, O), sub(A, T)), 0), `OT vuông góc AT tại ${n}`);
  }
}
{
  const k = "10/hai-duong-tron";
  const O = on(k, "O"), K = on(k, "K"), P = on(k, "P"), Q = on(k, "Q");
  assert.ok(near(len(sub(P, O)), 5) && near(len(sub(P, K)), 5) && near(len(sub(Q, O)), 5) && near(len(sub(Q, K)), 5), "P, Q thuộc cả hai đường tròn");
  assert.ok(near(len(sub(P, Q)), 6) && near(len(sub(K, O)), 8), "dây chung 6 và khoảng cách tâm 8");
}
// Hình mặt cầu và vận dụng cao lớp 12.
{
  const k = "12/cau-cat-mp-dt";
  for (const n of Object.keys(spaceFigures[k]!.points).filter((x) => /^R\d+$/.test(x))) assert.ok(near(len(on(k, n)), 5) && near(on(k, n)[2], 3), `${n} thuộc mặt cầu và mặt phẳng z = 3`);
  assert.ok(near(len(sub(on(k, "R0"), on(k, "K"))), 4), "bán kính đường tròn bằng 4");
}
{
  const k = "12/mp-chua-dt-cuc-tri";
  const A = on(k, "A"), H = on(k, "H"), D1 = on(k, "D1"), D2 = on(k, "D2");
  assert.ok(near(len(cross(sub(D2, D1), [1, 1, 2])), 0) && near(len(cross(sub(H, D1), [1, 1, 2])), 0), "H thuộc d");
  assert.ok(near(dot(sub(A, H), [1, 1, 2]), 0) && near(len(sub(A, H)), Math.sqrt(2)), "AH vuông góc d và bằng căn 2");
  for (const n of ["H", "D1", "D2", "P1", "P2", "P3", "P4"]) assert.ok(near(on(k, n)[0] - on(k, n)[1] + 1, 0), `${n} thuộc mặt phẳng x - y + 1 = 0`);
}
{
  const k = "12/cuc-tri-mat-cau";
  const A = on(k, "A"), N = on(k, "N"), F = on(k, "F");
  assert.ok(near(len(N), 2) && near(len(F), 2), "N và F thuộc mặt cầu");
  assert.ok(near(len(sub(A, N)), 3) && near(len(sub(A, F)), 7), "NA = 3 và FA = 7");
}

{
  const k = "11/ty-so-the-tich";
  const S = on(k, "S"), A = on(k, "A"), B = on(k, "B"), C = on(k, "C"), M = on(k, "M"), N = on(k, "N"), P = on(k, "P");
  assert.ok(near(len(sub(M, S)) / len(sub(A, S)), 1 / 2) && near(len(sub(N, S)) / len(sub(B, S)), 2 / 3) && near(len(sub(P, S)) / len(sub(C, S)), 3 / 4), "tỉ số SM/SA, SN/SB, SP/SC");
  const vol = (a: number[], b: number[], c: number[]) => Math.abs(dot(cross(a as [number, number, number], b as [number, number, number]), c as [number, number, number])) / 6;
  assert.ok(near(vol(sub(M, S), sub(N, S), sub(P, S)) / vol(sub(A, S), sub(B, S), sub(C, S)), 1 / 4), "tỉ số thể tích bằng 1/4");
}
// Hình của chương đại cương lớp 11.
{
  const k = "11/giao-tuyen";
  const S = on(k, "S"), A = on(k, "A"), B = on(k, "B"), C = on(k, "C"), D = on(k, "D"), E = on(k, "E"), F = on(k, "F"), O = on(k, "O");
  assert.ok(near(len(cross(sub(B, A), sub(C, D))), 0), "ABCD là hình bình hành: AB song song CD");
  assert.ok(near(len(cross(sub(F, E), sub(B, A))), 0) && near(len(cross(sub(F, E), sub(S, E))), 0), "giao tuyến đi qua S và song song AB");
  assert.ok(near(O[0] * 2, A[0] + C[0]) && near(O[0] * 2, B[0] + D[0]) && near(O[1] * 2, A[1] + C[1]) && near(O[1] * 2, B[1] + D[1]), "O là trung điểm của hai đường chéo");
}
{
  const k = "11/thiet-dien";
  const pts = ["M1", "M2", "M3", "M4", "M5", "M6"].map((n) => on(k, n));
  for (const p of pts) assert.ok(near(p[0] - p[1] + p[2], 1), "sáu trung điểm cùng thuộc mặt phẳng x - y + z = 1");
  for (let i = 0; i < 6; i += 1) assert.ok(near(len(sub(pts[i]!, pts[(i + 1) % 6]!)), Math.SQRT2), "cạnh lục giác dài căn hai");
}
{
  const k = "11/hinh-chop-deu";
  const S = on(k, "S"), O = on(k, "O"), A = on(k, "A");
  assert.ok(near(len(sub(S, A)), Math.sqrt(len(sub(S, O)) ** 2 + len(sub(O, A)) ** 2)), "SA là cạnh huyền của tam giác SOA");
  for (const n of ["A", "B", "C", "D"]) assert.ok(near(len(sub(on(k, n), S)), len(sub(A, S))), "các cạnh bên bằng nhau");
}

// Phép quay của chế độ xoay: giữ độ dài và tích vô hướng, và góc nhìn ban đầu không nhìn mặt phẳng nào đúng cạnh.
{
  const a: P3 = [1, 2, 3], b: P3 = [-2, 0.5, 4];
  for (const [yaw, pitch] of [[0, 0], [0.7, -0.3], [-2.1, 1.2], [3, 0.9]] as const) {
    const ra = rotate(a, yaw, pitch), rb = rotate(b, yaw, pitch);
    assert.ok(near(len(ra), len(a)) && near(dot(ra, rb), dot(a, b)), "phép quay giữ độ dài và tích vô hướng");
  }
  assert.deepEqual(rotate(a, 0, 0).map((x) => Math.round(x * 1e9) / 1e9), a, "quay góc 0 là phép đồng nhất");
  for (const [key, fig] of Object.entries(spaceFigures)) {
    const normals = (fig.planes ?? []).map((pl) => cross(sub(fig.points[pl.pts[1]!]!, fig.points[pl.pts[0]!]!), sub(fig.points[pl.pts[2]!]!, fig.points[pl.pts[0]!]!)));
    const view = startViewFor(normals);
    for (const n of normals) {
      const turned = rotate(n, view.yaw, view.pitch);
      assert.ok(Math.abs(turned[1]) / len(n) > 0.2, `${key}: mặt phẳng bị nhìn gần đúng cạnh ở góc nhìn ban đầu (${(Math.abs(turned[1]) / len(n)).toFixed(2)})`);
    }
  }
}
console.log(`space ok: ${Object.keys(spaceFigures).length} hình`);

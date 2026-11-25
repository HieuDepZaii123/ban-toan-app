/**
 * Hình vẽ không gian cho các bài lớp 11 (vectơ, góc, khoảng cách, Ta-lét).
 * Mỗi hình mô tả bằng tọa độ ba chiều thật; bộ vẽ chiếu xiên (trục y lùi vào trong, nửa độ dài) nên các hệ thức như
 * vuông góc hay trung điểm được kiểm lại bằng tính toán trong scripts/space.test.ts. Khóa là "<lớp>/<mã bài>".
 */
export type P3 = [number, number, number];
export type EdgeStyle = "solid" | "hidden" | "hl" | "hl2" | "arrow" | "arrowhl";

export type SpaceFigure = {
  points: Record<string, P3>;
  edges: { a: string; b: string; s?: EdgeStyle; label?: string }[];
  planes?: { pts: string[]; tone?: "a" | "b" }[];
  /** Góc vuông tại `at` giữa hai cạnh hướng tới `p` và `q`. */
  right?: { at: string; p: string; q: string }[];
  /** Cung góc tại `at` giữa hai hướng tới `p` và `q`, kèm nhãn. */
  angles?: { at: string; p: string; q: string; label?: string }[];
  /** Điểm phụ vẽ chấm tròn (chân đường vuông góc, trung điểm). */
  dots?: string[];
  /** Hệ số lùi của trục y theo chiều ngang và chiều dọc; mặc định 0,45 cho cả hai. */
  view?: { dx: number; dz: number };
  alt: { vi: string; en: string };
};

const box = (w: number, d: number, h: number): Record<string, P3> => ({
  A: [0, 0, 0], B: [w, 0, 0], C: [w, d, 0], D: [0, d, 0],
  "A'": [0, 0, h], "B'": [w, 0, h], "C'": [w, d, h], "D'": [0, d, h],
});
const boxEdges: SpaceFigure["edges"] = [
  { a: "A", b: "B" }, { a: "B", b: "C" }, { a: "C", b: "D", s: "hidden" }, { a: "D", b: "A", s: "hidden" },
  { a: "A'", b: "B'" }, { a: "B'", b: "C'" }, { a: "C'", b: "D'" }, { a: "D'", b: "A'" },
  { a: "A", b: "A'" }, { a: "B", b: "B'" }, { a: "C", b: "C'" }, { a: "D", b: "D'", s: "hidden" },
];
const withStyle = (edges: SpaceFigure["edges"], over: Record<string, { s?: EdgeStyle; label?: string }>): SpaceFigure["edges"] =>
  edges.map((e) => ({ ...e, ...(over[`${e.a}${e.b}`] ?? over[`${e.b}${e.a}`] ?? {}) }));

const pyr = (apex: P3, base: Record<string, P3>, hiddenBase: string[] = []): { points: Record<string, P3>; edges: SpaceFigure["edges"] } => {
  const names = Object.keys(base);
  const edges: SpaceFigure["edges"] = [];
  names.forEach((n, i) => edges.push({ a: n, b: names[(i + 1) % names.length]!, s: hiddenBase.includes(`${n}${names[(i + 1) % names.length]}`) ? "hidden" : "solid" }));
  names.forEach((n) => edges.push({ a: "S", b: n }));
  return { points: { S: apex, ...base }, edges };
};
const lerp = (a: P3, b: P3, t: number): P3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

// Hình chóp S.ABCD có SA vuông góc đáy, đáy là hình chữ nhật.
const sabcd = pyr([0, 0, 3], { A: [0, 0, 0], B: [3, 0, 0], C: [3, 3, 0], D: [0, 3, 0] }, ["CD", "DA"]);
sabcd.edges = sabcd.edges.map((e) => ((e.a === "S" && e.b === "D") || (e.a === "S" && e.b === "C") ? e : e));
const sabc = pyr([0, 0, 3], { A: [0, 0, 0], B: [4, 0, 0], C: [0.5, 2.4, 0] }, ["CA"]);

export const spaceFigures: Record<string, SpaceFigure> = {
  "11/quy-tac-vecto-kg": {
    points: box(3, 2, 2),
    edges: withStyle(boxEdges, { AB: { s: "arrow", label: "AB" }, AD: { s: "arrow", label: "AD" }, "AA'": { s: "arrow", label: "AA'" } }).concat([{ a: "A", b: "C'", s: "arrowhl", label: "AC'" }]),
    alt: { vi: "Hình hộp ABCD.A'B'C'D' với ba vectơ AB, AD, AA' xuất phát từ A và đường chéo AC' là tổng của chúng.", en: "A box ABCD.A'B'C'D' with the three vectors AB, AD, AA' from A and the diagonal AC' as their sum." },
  },
  "11/phan-tich-vecto": {
    points: box(3, 2, 2),
    edges: withStyle(boxEdges, { AB: { s: "arrow", label: "a" }, AD: { s: "arrow", label: "b" }, "AA'": { s: "arrow", label: "c" } }).concat([{ a: "B", b: "D'", s: "arrowhl", label: "BD'" }]),
    alt: { vi: "Hình hộp với ba cạnh a, b, c xuất phát từ A và vectơ BD' đi từ B đến D' (cần biểu diễn theo a, b, c).", en: "A box with the three edges a, b, c from A and the vector BD' from B to D' to be expressed in terms of a, b, c." },
  },
  "11/tich-vo-huong-hinh": {
    points: box(2, 2, 2),
    edges: withStyle(boxEdges, { AB: { s: "arrow", label: "AB" } }).concat([{ a: "A", b: "C", s: "arrowhl", label: "AC" }]),
    angles: [{ at: "A", p: "B", q: "C", label: "45°" }],
    alt: { vi: "Hình lập phương với hai vectơ AB và AC xuất phát từ A, góc giữa chúng bằng 45 độ.", en: "A cube with the two vectors AB and AC from A, the angle between them being 45 degrees." },
  },
  "11/dong-phang-3-vecto": {
    points: box(3, 2, 2),
    edges: withStyle(boxEdges, { AB: { s: "arrow" }, AD: { s: "arrow" }, "AA'": { s: "arrowhl" } }),
    planes: [{ pts: ["A", "B", "C", "D"], tone: "a" }],
    alt: { vi: "Hai vectơ AB và AD nằm trong mặt đáy (tô màu), vectơ AA' nằm ngoài mặt đáy nên ba vectơ không đồng phẳng.", en: "The vectors AB and AD lie in the base plane (shaded) while AA' lies outside it, so the three vectors are not coplanar." },
  },
  "11/goc-hai-dt-cheo": {
    points: box(2, 2, 2),
    edges: withStyle(boxEdges, {}).concat([{ a: "A", b: "C", s: "hl" }, { a: "A'", b: "D", s: "hl2" }]),
    alt: { vi: "Hình lập phương ABCD.A'B'C'D' với hai đường chéo nhau AC và A'D được tô màu khác nhau.", en: "A cube ABCD.A'B'C'D' with the two skew lines AC and A'D drawn in different colours." },
  },
  "11/goc-duong-mat-11": {
    points: { ...sabc.points },
    edges: sabc.edges.map((e) => (e.a === "S" && e.b === "B" ? { ...e, s: "hl" as const } : e.a === "A" && e.b === "B" ? { ...e, s: "hl2" as const } : e)),
    planes: [{ pts: ["A", "B", "C"], tone: "a" }],
    right: [{ at: "A", p: "S", q: "B" }],
    angles: [{ at: "B", p: "S", q: "A", label: "φ" }],
    alt: { vi: "Hình chóp S.ABC có SA vuông góc mặt đáy ABC. Góc giữa SB và mặt đáy là góc SBA, giữa SB và hình chiếu AB.", en: "The pyramid S.ABC with SA perpendicular to the base ABC. The angle between SB and the base is the angle SBA, between SB and its projection AB." },
  },
  "11/goc-nhi-dien-11": {
    points: { ...sabcd.points },
    edges: sabcd.edges.map((e) => (e.a === "B" && e.b === "C" ? { ...e, s: "hl" as const } : e)),
    planes: [{ pts: ["S", "B", "C"], tone: "b" }, { pts: ["A", "B", "C", "D"], tone: "a" }],
    right: [{ at: "A", p: "S", q: "B" }, { at: "B", p: "A", q: "C" }],
    angles: [{ at: "B", p: "S", q: "A", label: "φ" }],
    alt: { vi: "Hình chóp S.ABCD có SA vuông góc đáy. Hai mặt phẳng (SBC) và (ABCD) cắt nhau theo BC; góc nhị diện là góc SBA.", en: "The pyramid S.ABCD with SA perpendicular to the base. The planes (SBC) and (ABCD) meet along BC, and the dihedral angle is the angle SBA." },
  },
  "11/kc-diem-duong": {
    points: { S: [0, 0, 3], A: [0, 0, 0], B: [4, 0, 0], H: lerp([0, 0, 3], [4, 0, 0], 9 / 25) },
    edges: [{ a: "S", b: "A" }, { a: "A", b: "B" }, { a: "S", b: "B" }, { a: "A", b: "H", s: "hl" }],
    right: [{ at: "A", p: "S", q: "B" }, { at: "H", p: "A", q: "S" }],
    dots: ["H"],
    alt: { vi: "Tam giác SAB vuông tại A. Đường cao AH hạ từ A xuống SB (tô màu) là khoảng cách từ A đến đường thẳng SB.", en: "The triangle SAB is right at A. The altitude AH from A to SB (highlighted) is the distance from A to the line SB." },
  },
  "11/kc-song-song-kg": {
    points: { ...sabcd.points, H: lerp([0, 0, 3], [0, 3, 0], 0.5) },
    edges: sabcd.edges.map((e) => (e.a === "A" && e.b === "B" ? { ...e, s: "hl2" as const } : e)).concat([{ a: "A", b: "H", s: "hl" }]),
    planes: [{ pts: ["S", "C", "D"], tone: "b" }],
    right: [{ at: "H", p: "A", q: "S" }],
    dots: ["H"],
    alt: { vi: "Hình chóp S.ABCD có SA vuông góc đáy. AB song song với mặt phẳng (SCD) tô màu, và AH vuông góc SD là khoảng cách cần tính.", en: "The pyramid S.ABCD with SA perpendicular to the base. AB is parallel to the shaded plane (SCD), and AH perpendicular to SD is the distance to compute." },
  },
  "11/kc-cheo-nhau": {
    points: { ...box(3, 4, 3), H: lerp([3, 0, 0], [0, 4, 0], 9 / 25) },
    edges: withStyle(boxEdges, { "AA'": { s: "hl2" } }).concat([{ a: "B", b: "D", s: "hl" }, { a: "A", b: "H", s: "hl" }]),
    right: [{ at: "H", p: "A", q: "B" }],
    dots: ["H"],
    alt: { vi: "Hình hộp chữ nhật với hai đường chéo nhau AA' và BD. Khoảng cách giữa chúng bằng AH, đường cao hạ từ A xuống BD trong mặt đáy.", en: "A rectangular box with the skew lines AA' and BD. The distance between them is AH, the altitude from A to BD in the base." },
  },
  "11/kc-the-tich": {
    points: { O: [0, 0, 0], A: [3, 0, 0], B: [0, 3, 0], C: [0, 0, 3], H: [1, 1, 1] },
    edges: [{ a: "O", b: "A" }, { a: "O", b: "B", s: "hidden" }, { a: "O", b: "C" }, { a: "A", b: "B" }, { a: "B", b: "C" }, { a: "A", b: "C" }, { a: "O", b: "H", s: "hl" }],
    planes: [{ pts: ["A", "B", "C"], tone: "a" }],
    dots: ["H"],
    view: { dx: 0.75, dz: 0.5 },
    alt: { vi: "Tứ diện OABC có OA, OB, OC đôi một vuông góc. OH là khoảng cách từ O đến mặt phẳng (ABC) tô màu.", en: "The tetrahedron OABC with OA, OB, OC pairwise perpendicular. OH is the distance from O to the shaded plane (ABC)." },
  },
  "11/thales-kg": {
    points: { S: [1.5, 0, 3], A: [0, 0, 0], B: [3, 0, 0], M: lerp([1.5, 0, 3], [0, 0, 0], 1 / 3), N: lerp([1.5, 0, 3], [3, 0, 0], 1 / 3) },
    edges: [{ a: "S", b: "A" }, { a: "S", b: "B" }, { a: "A", b: "B", s: "hl2" }, { a: "M", b: "N", s: "hl" }],
    dots: ["M", "N"],
    alt: { vi: "Tam giác SAB với M trên SA, N trên SB sao cho MN song song AB và SM bằng một phần ba SA.", en: "The triangle SAB with M on SA and N on SB such that MN is parallel to AB and SM is one third of SA." },
  },
  "11/thiet-dien-ss": {
    points: (() => {
      const S: P3 = [1.5, 1.5, 3];
      const base: Record<string, P3> = { A: [0, 0, 0], B: [3, 0, 0], C: [3, 3, 0], D: [0, 3, 0] };
      const sec: Record<string, P3> = {};
      (["A", "B", "C", "D"] as const).forEach((n, i) => { sec["MNPQ"[i]!] = lerp(S, base[n]!, 1 / 3); });
      return { S, ...base, ...sec };
    })(),
    edges: [
      { a: "A", b: "B" }, { a: "B", b: "C" }, { a: "C", b: "D", s: "hidden" }, { a: "D", b: "A", s: "hidden" },
      { a: "S", b: "A" }, { a: "S", b: "B" }, { a: "S", b: "C" }, { a: "S", b: "D", s: "hidden" },
      { a: "M", b: "N", s: "hl" }, { a: "N", b: "P", s: "hl" }, { a: "P", b: "Q", s: "hl" }, { a: "Q", b: "M", s: "hl" },
    ],
    planes: [{ pts: ["M", "N", "P", "Q"], tone: "b" }],
    alt: { vi: "Hình chóp S.ABCD bị cắt bởi mặt phẳng song song với đáy theo thiết diện MNPQ (tô màu), với SM bằng một phần ba SA.", en: "The pyramid S.ABCD cut by a plane parallel to the base in the section MNPQ (shaded), with SM equal to one third of SA." },
  },
};

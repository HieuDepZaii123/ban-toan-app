/** Hình vẽ không gian, phần hai: các bài hình học không gian cũ của lớp 11 và các bài Oxyz của lớp 12. */
import { box, boxEdges, lerp, pyr, sabcd, withStyle, type P3, type SpaceFigure } from "./space.ts";

const add = (a: P3, b: P3): P3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a: P3, k: number): P3 => [a[0] * k, a[1] * k, a[2] * k];
const cross = (a: P3, b: P3): P3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

/** Hình bình hành nằm trong mặt phẳng, xuất phát từ p0 với hai vectơ u, v. */
const quad = (p0: P3, u: P3, v: P3): Record<string, P3> => ({ P1: p0, P2: add(p0, u), P3: add(add(p0, u), v), P4: add(p0, v) });
const quadEdges = (names: [string, string, string, string]): SpaceFigure["edges"] => [
  { a: names[0], b: names[1] }, { a: names[1], b: names[2] }, { a: names[2], b: names[3] }, { a: names[3], b: names[0] },
];

// --- Lớp 11 ---
const pyrDeu = pyr([2, 2, 2], { A: [0, 0, 0], B: [4, 0, 0], C: [4, 4, 0], D: [0, 4, 0] }, ["CD", "DA"]);

const prism: Record<string, P3> = { A: [0, 0, 0], B: [3, 0, 0], C: [0, 4, 0], "A'": [0, 0, 6], "B'": [3, 0, 6], "C'": [0, 4, 6] };

// Phép chiếu song song theo phương (0,5; 0; -1) lên mặt phẳng z = 0.
const line = (s: number): P3 => [0.5 + s * 0.6, 0.3 + s * 1.2, 2.6 - s * 0.5];
const shadow = (q: P3): P3 => [q[0] + 0.5 * q[2], q[1], 0];

// --- Lớp 12 ---
const n1: P3 = [1, 2, -1];
const pa = quad([-1, 0, 0], [2, 0, 2], [0, 1, 2]);
const qShift = mul(n1, -0.25);
const pb: Record<string, P3> = {};
Object.entries(pa).forEach(([k, v]) => { pb[`Q${k.slice(1)}`] = add(v, qShift); });

const nPlane: P3 = [1, -2, 1];
const planeP = quad([-2, -3, -1], [4, 2, 0], [2, 2, 2]);

export const spaceFigures2: Record<string, SpaceFigure> = {
  "11/song-song": {
    points: { S: [1.5, 0, 3], A: [0, 0, 0], B: [3, 0, 0], M: lerp([1.5, 0, 3], [0, 0, 0], 0.5), N: lerp([1.5, 0, 3], [3, 0, 0], 0.5) },
    edges: [{ a: "S", b: "A" }, { a: "S", b: "B" }, { a: "A", b: "B", s: "hl2" }, { a: "M", b: "N", s: "hl" }],
    dots: ["M", "N"],
    alt: { vi: "Tam giác SAB với M, N là trung điểm của SA, SB: MN là đường trung bình, song song với AB và bằng một nửa AB.", en: "The triangle SAB with M, N the midpoints of SA, SB: MN is a midline, parallel to AB and half as long." },
  },
  "11/vuong-goc": {
    points: { H: [0, 0, 0], B: [4, 0, 0], A: [0, 0, 3], D: [4, 2.5, 0], ...{ P1: [-1.2, -1.2, 0], P2: [5.2, -1.2, 0], P3: [5.2, 3.6, 0], P4: [-1.2, 3.6, 0] } },
    edges: [{ a: "A", b: "H" }, { a: "H", b: "B" }, { a: "A", b: "B", s: "hl2" }, { a: "B", b: "D", s: "hl" }, ...quadEdges(["P1", "P2", "P3", "P4"]).map((e) => ({ ...e, s: "hidden" as const }))],
    planes: [{ pts: ["P1", "P2", "P3", "P4"], tone: "a" }],
    right: [{ at: "H", p: "A", q: "B" }, { at: "B", p: "H", q: "D" }],
    hide: ["P1", "P2", "P3", "P4"],
    alt: { vi: "Đường AH vuông góc với mặt phẳng tại H; HB nằm trong mặt phẳng; đường BD trong mặt phẳng vuông góc với HB nên cũng vuông góc với AB.", en: "The line AH is perpendicular to the plane at H; HB lies in the plane; the line BD in the plane is perpendicular to HB and hence also to AB." },
  },
  "11/goc-kc": {
    points: { ...pyrDeu.points, O: [2, 2, 0], M: [2, 0, 0] },
    edges: [...pyrDeu.edges.map((e) => (e.a === "S" && e.b === "D" ? { ...e, s: "hidden" as const } : e)), { a: "S", b: "O", s: "hl2" }, { a: "O", b: "M", s: "hl2" }, { a: "S", b: "M", s: "hl" }],
    right: [{ at: "O", p: "S", q: "M" }],
    angles: [{ at: "M", p: "O", q: "S", label: "φ" }],
    dots: ["O", "M"],
    alt: { vi: "Hình chóp đều S.ABCD có chân đường cao O là tâm đáy; M là trung điểm cạnh AB; góc SMO là góc phẳng của nhị diện giữa mặt bên và mặt đáy.", en: "A regular pyramid S.ABCD whose foot of altitude O is the centre of the base; M is the midpoint of AB; the angle SMO is the plane angle of the dihedral angle between a lateral face and the base." },
  },
  "11/the-tich-11": {
    points: prism,
    edges: [
      { a: "A", b: "B" }, { a: "B", b: "C" }, { a: "C", b: "A", s: "hidden" },
      { a: "A'", b: "B'" }, { a: "B'", b: "C'" }, { a: "C'", b: "A'" },
      { a: "A", b: "A'" }, { a: "B", b: "B'" }, { a: "C", b: "C'", s: "hidden" },
      { a: "A'", b: "C", s: "hl" }, { a: "A'", b: "B", s: "hl" },
    ],
    planes: [{ pts: ["A", "B", "C"], tone: "a" }],
    right: [{ at: "A", p: "B", q: "C" }, { at: "A", p: "A'", q: "B" }],
    view: { dx: 0.25, dz: 0.3 },
    alt: { vi: "Lăng trụ đứng ABC.A'B'C' có đáy là tam giác vuông tại A, và hình chóp A'.ABC cùng đáy, cùng chiều cao với lăng trụ (cạnh A'B, A'C tô màu).", en: "A right prism ABC.A'B'C' with a base right-angled at A, and the pyramid A'.ABC with the same base and height (edges A'B and A'C highlighted)." },
  },
  "11/goc-dt-mp": {
    points: { ...sabcd.points },
    edges: sabcd.edges.map((e) => (e.a === "S" && e.b === "B" ? { ...e, s: "hl" as const } : e.a === "A" && e.b === "B" ? { ...e, s: "hl2" as const } : e)).concat([{ a: "A", b: "C", s: "hl2" }]),
    planes: [{ pts: ["A", "B", "C", "D"], tone: "a" }],
    right: [{ at: "A", p: "S", q: "B" }],
    angles: [{ at: "B", p: "S", q: "A", label: "45°" }],
    alt: { vi: "Hình chóp S.ABCD có SA vuông góc với đáy hình vuông. Hình chiếu của SB là AB nên góc giữa SB và đáy là góc SBA; hình chiếu của SC là AC.", en: "A pyramid S.ABCD with SA perpendicular to the square base. The projection of SB is AB so the angle between SB and the base is the angle SBA; the projection of SC is AC." },
  },
  "11/the-tich-goc": {
    points: { S: [0, 0, 5 * Math.sqrt(3)], A: [0, 0, 0], B: [3, 0, 0], C: [3, 4, 0] },
    edges: [{ a: "S", b: "A" }, { a: "S", b: "B" }, { a: "S", b: "C", s: "hl" }, { a: "A", b: "B" }, { a: "B", b: "C" }, { a: "A", b: "C", s: "hl2" }],
    planes: [{ pts: ["A", "B", "C"], tone: "a" }],
    right: [{ at: "A", p: "S", q: "B" }, { at: "B", p: "A", q: "C" }],
    angles: [{ at: "C", p: "S", q: "A", label: "60°" }],
    alt: { vi: "Hình chóp S.ABC có SA vuông góc với đáy ABC vuông tại B; SC tạo với đáy góc 60 độ nên chiều cao SA bằng AC nhân tang 60 độ.", en: "A pyramid S.ABC with SA perpendicular to the base ABC, right-angled at B; SC makes a 60 degree angle with the base so the height SA equals AC times tan 60 degrees." },
  },
  "11/kc-diem-mp": {
    points: { ...sabcd.points, H: lerp([0, 0, 3], [3, 0, 0], 0.5) },
    edges: sabcd.edges.concat([{ a: "A", b: "H", s: "hl" }]),
    planes: [{ pts: ["S", "B", "C"], tone: "b" }],
    right: [{ at: "H", p: "A", q: "S" }, { at: "B", p: "A", q: "C" }],
    dots: ["H"],
    alt: { vi: "Hình chóp S.ABCD có SA vuông góc với đáy. AH vuông góc với SB tại H, và AH cũng vuông góc với mặt phẳng (SBC) tô màu nên AH là khoảng cách từ A đến (SBC).", en: "A pyramid S.ABCD with SA perpendicular to the base. AH is perpendicular to SB at H and also to the shaded plane (SBC), so AH is the distance from A to (SBC)." },
  },
  "11/phep-chieu-ss": {
    points: { M: line(0), N: line(1), P: line(3), "M'": shadow(line(0)), "N'": shadow(line(1)), "P'": shadow(line(3)), ...{ Q1: [-0.4, -0.4, 0], Q2: [5.6, -0.4, 0], Q3: [5.6, 5.2, 0], Q4: [-0.4, 5.2, 0] } },
    edges: [{ a: "M", b: "P", s: "hl" }, { a: "M'", b: "P'", s: "hl2" }, { a: "M", b: "M'", s: "hidden" }, { a: "N", b: "N'", s: "hidden" }, { a: "P", b: "P'", s: "hidden" }, ...quadEdges(["Q1", "Q2", "Q3", "Q4"]).map((e) => ({ ...e, s: "hidden" as const }))],
    planes: [{ pts: ["Q1", "Q2", "Q3", "Q4"], tone: "a" }],
    dots: ["M", "N", "P", "M'", "N'", "P'"],
    hide: ["Q1", "Q2", "Q3", "Q4"],
    alt: { vi: "Ba điểm thẳng hàng M, N, P, trong đó MN bằng một nửa NP, được chiếu song song lên mặt phẳng thành M phẩy, N phẩy, P phẩy vẫn thẳng hàng và giữ nguyên tỉ số đó.", en: "Three collinear points M, N, P, where MN is half of NP, are projected in parallel onto a plane to M prime, N prime, P prime, which stay collinear and keep that ratio." },
  },
  "11/hinh-hop-11": {
    points: box(3, 2.5, 3.5),
    edges: withStyle(boxEdges, { AB: { label: "a" }, AD: { label: "b" }, "AA'": { label: "c" } }).concat([{ a: "A", b: "C'", s: "hl" }]),
    alt: { vi: "Hình hộp chữ nhật ABCD.A'B'C'D' có ba kích thước a, b, c và đường chéo AC' (tô màu) dài căn bậc hai của a bình phương cộng b bình phương cộng c bình phương.", en: "A rectangular box ABCD.A'B'C'D' with dimensions a, b, c and the diagonal AC' (highlighted) of length the square root of a squared plus b squared plus c squared." },
  },

  "11/vi-tri-tuong-doi-kg": {
    points: box(3, 2.5, 2.5),
    edges: withStyle(boxEdges, { "AA'": { s: "hl" }, "CC'": { s: "hl" }, BC: { s: "hl2" } }),
    alt: { vi: "Hình hộp với hai cạnh bên AA' và CC' song song với nhau (cùng màu), và cạnh BC khác màu chéo với AA'.", en: "A box with the two lateral edges AA' and CC' parallel to each other (same colour), and the edge BC in another colour skew to AA'." },
  },
  "11/giao-tuyen": {
    points: { S: [2, 1, 3], A: [0, 0, 0], B: [4, 0, 0], C: [5, 3, 0], D: [1, 3, 0], E: [-1, 1, 3], F: [5, 1, 3], O: [2.5, 1.5, 0] },
    edges: [
      { a: "A", b: "B" }, { a: "B", b: "C" }, { a: "C", b: "D", s: "hidden" }, { a: "D", b: "A", s: "hidden" },
      { a: "S", b: "A" }, { a: "S", b: "B" }, { a: "S", b: "C" }, { a: "S", b: "D", s: "hidden" },
      { a: "E", b: "F", s: "hl" }, { a: "A", b: "C", s: "hidden" }, { a: "B", b: "D", s: "hidden" },
    ],
    planes: [{ pts: ["S", "A", "B"], tone: "a" }, { pts: ["S", "C", "D"], tone: "b" }],
    dots: ["O"],
    hide: ["E", "F"],
    alt: { vi: "Hình chóp S.ABCD có đáy là hình bình hành; hai mặt phẳng (SAB) và (SCD) tô hai màu cắt nhau theo đường thẳng qua S song song với AB, và hai đường chéo của đáy cắt nhau tại O.", en: "A pyramid S.ABCD with a parallelogram base; the two planes (SAB) and (SCD), shaded in two colours, meet along a line through S parallel to AB, and the two diagonals of the base meet at O." },
  },
  "11/thiet-dien": {
    points: { ...box(2, 2, 2), M1: [1, 0, 0], M2: [2, 1, 0], M3: [2, 2, 1], M4: [1, 2, 2], M5: [0, 1, 2], M6: [0, 0, 1] },
    edges: withStyle(boxEdges, {}).concat([
      { a: "M1", b: "M2", s: "hl" }, { a: "M2", b: "M3", s: "hl" }, { a: "M3", b: "M4", s: "hl" }, { a: "M4", b: "M5", s: "hl" }, { a: "M5", b: "M6", s: "hl" }, { a: "M6", b: "M1", s: "hl" },
    ]),
    planes: [{ pts: ["M1", "M2", "M3", "M4", "M5", "M6"], tone: "b" }],
    dots: ["M1", "M2", "M3", "M4", "M5", "M6"],
    hide: ["M1", "M2", "M3", "M4", "M5", "M6"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Hình lập phương bị cắt bởi mặt phẳng qua trung điểm của sáu cạnh, thiết diện là một lục giác đều (tô màu).", en: "A cube cut by the plane through the midpoints of six edges, the cross-section being a regular hexagon (shaded)." },
  },
  "11/hinh-chop-deu": {
    points: { ...pyrDeu.points, O: [2, 2, 0] },
    edges: pyrDeu.edges.map((e) => (e.a === "S" && e.b === "D" ? { ...e, s: "hidden" as const } : e.a === "S" && e.b === "A" ? { ...e, s: "hl" as const } : e)).concat([{ a: "S", b: "O", s: "hl2" }, { a: "O", b: "A", s: "hl2" }]),
    right: [{ at: "O", p: "S", q: "A" }],
    dots: ["O"],
    alt: { vi: "Hình chóp tứ giác đều S.ABCD với chân đường cao O là tâm của đáy; tam giác vuông SOA có cạnh bên SA là cạnh huyền, SO là chiều cao và OA là nửa đường chéo đáy.", en: "A regular quadrilateral pyramid S.ABCD whose foot of altitude O is the centre of the base; the right triangle SOA has the lateral edge SA as hypotenuse, SO as the height and OA as half the base diagonal." },
  },

  // --- Lớp 12: Oxyz ---
  "12/vecto-kg": {
    points: { O: [0, 0, 0], U: [1, 2, 2], V: [2, -1, 0] },
    edges: [{ a: "O", b: "U", s: "arrowhl", label: "a" }, { a: "O", b: "V", s: "arrow", label: "b" }],
    axes: [3, 3, 3],
    right: [{ at: "O", p: "U", q: "V" }],
    alt: { vi: "Hai vectơ a = (1; 2; 2) và b = (2; -1; 0) xuất phát từ gốc O trong hệ trục Oxyz; tích vô hướng bằng 0 nên chúng vuông góc.", en: "Two vectors a = (1, 2, 2) and b = (2, -1, 0) from the origin O in the Oxyz axes; their dot product is 0 so they are perpendicular." },
  },
  "12/mat-phang": {
    points: { A: [1, 0, 0], B: [0, 1, 0], C: [0, 0, 1], G: [1 / 3, 1 / 3, 1 / 3], N: [1 / 3 + 0.6, 1 / 3 + 0.6, 1 / 3 + 0.6] },
    edges: [{ a: "A", b: "B" }, { a: "B", b: "C" }, { a: "C", b: "A" }, { a: "G", b: "N", s: "arrowhl", label: "n" }],
    planes: [{ pts: ["A", "B", "C"], tone: "a" }],
    axes: [1.6, 1.6, 1.6],
    dots: ["G"],
    hide: ["G", "N"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Mặt phẳng cắt ba trục tọa độ tại ba điểm A, B, C cùng cách gốc một đơn vị; vectơ pháp tuyến n vuông góc với mặt phẳng.", en: "A plane meets the three coordinate axes at three points A, B, C, each one unit from the origin; the normal vector n is perpendicular to the plane." },
  },
  "12/duong-cau": {
    points: { O: [0, 0, 0], M: [1, 2, 3], T: [3, 2, 3] },
    edges: [{ a: "M", b: "T", s: "arrowhl" }],
    spheres: [{ c: "O", r: 3 }],
    axes: [4, 4, 4],
    dots: ["M", "T"],
    alt: { vi: "Đường thẳng qua điểm M song song với trục Ox, điểm T ứng với tham số bằng hai, cùng mặt cầu tâm O bán kính ba.", en: "The line through the point M parallel to the Ox axis, the point T for parameter two, together with the sphere with centre O and radius three." },
  },
  "12/goc-kc-12": {
    points: { O: [0, 0, 0], P: [0, 0, 5], U: [2, 0, 0], W: [2, 2, 0], ...{ Q1: [-3, -3, 0], Q2: [3, -3, 0], Q3: [3, 3, 0], Q4: [-3, 3, 0] } },
    edges: [{ a: "P", b: "O", s: "hl" }, { a: "O", b: "U", s: "arrow" }, { a: "O", b: "W", s: "arrow" }, ...quadEdges(["Q1", "Q2", "Q3", "Q4"]).map((e) => ({ ...e, s: "hidden" as const }))],
    planes: [{ pts: ["Q1", "Q2", "Q3", "Q4"], tone: "a" }],
    right: [{ at: "O", p: "P", q: "U" }],
    angles: [{ at: "O", p: "U", q: "W", label: "45°" }],
    hide: ["Q1", "Q2", "Q3", "Q4"],
    alt: { vi: "Điểm P nằm trên trục Oz cách mặt phẳng Oxy một khoảng năm (đoạn PO), và hai vectơ trong mặt phẳng này tạo với nhau góc bốn mươi lăm độ.", en: "The point P on the Oz axis is at distance five from the Oxy plane (the segment PO), and two vectors in this plane make a forty-five degree angle." },
  },
  "12/vtt-d-mp": {
    points: { I: [1, 2, 0], D1: [0, 3, -1], D2: [2, 1, 1], ...{ R1: [3, 1, -1], R2: [0, 4, -1], R3: [-1, 3, 1], R4: [2, 0, 1] } },
    edges: [{ a: "D1", b: "D2", s: "arrowhl", label: "d" }, ...quadEdges(["R1", "R2", "R3", "R4"]).map((e) => ({ ...e, s: "hidden" as const }))],
    planes: [{ pts: ["R1", "R2", "R3", "R4"], tone: "a" }],
    dots: ["I"],
    hide: ["R1", "R2", "R3", "R4", "D1", "D2"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Đường thẳng d cắt mặt phẳng tại đúng một điểm I; hai đầu của d nằm ở hai phía của mặt phẳng.", en: "The line d meets the plane at exactly one point I; the two ends of d lie on opposite sides of the plane." },
  },
  "12/kc-hai-dt": {
    points: { O: [0, 0, 0], B: [0, 0, 3], E1: [-1, 0, 0], E2: [3, 0, 0], F1: [0, -1, 3], F2: [0, 3, 3] },
    edges: [{ a: "E1", b: "E2", s: "arrowhl", label: "Δ1" }, { a: "F1", b: "F2", s: "arrow", label: "Δ2" }, { a: "O", b: "B", s: "hl2" }],
    right: [{ at: "O", p: "B", q: "E2" }, { at: "B", p: "O", q: "F2" }],
    axes: [3.4, 3.4, 3.6],
    dots: ["O", "B"],
    hide: ["E1", "E2", "F1", "F2"],
    alt: { vi: "Hai đường thẳng chéo nhau Δ1 (trục Ox) và Δ2 (đi qua B(0; 0; 3) cùng phương Oy); đoạn vuông góc chung OB dài 3 là khoảng cách giữa chúng.", en: "Two skew lines Δ1 (the Ox axis) and Δ2 (through B(0, 0, 3) parallel to Oy); the common perpendicular OB of length 3 is the distance between them." },
  },
  "12/mat-cau-tx": {
    points: { I: [1, 1, 1], T: [2, 2, 2], A: [6, 0, 0], B: [0, 6, 0], C: [0, 0, 6] },
    edges: [{ a: "I", b: "T", s: "hl" }, { a: "A", b: "B", s: "hidden" }, { a: "B", b: "C", s: "hidden" }, { a: "C", b: "A", s: "hidden" }],
    spheres: [{ c: "I", r: Math.sqrt(3) }],
    planes: [{ pts: ["A", "B", "C"], tone: "b" }],
    dots: ["I", "T"],
    hide: ["A", "B", "C"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Mặt cầu tâm I tiếp xúc với mặt phẳng tại điểm T; đoạn IT bằng bán kính và vuông góc với mặt phẳng.", en: "The sphere with centre I is tangent to the plane at the point T; the segment IT equals the radius and is perpendicular to the plane." },
  },
  "12/hinh-chieu-dx": {
    points: { M: [1, 2, 3], H: [2, 3, 4], "M'": [3, 4, 5], ...{ R1: [4, 1, 4], R2: [0, 5, 4], R3: [0, 1, 8], R4: [4, -3, 8] } },
    edges: [{ a: "M", b: "M'", s: "hl" }, ...quadEdges(["R1", "R2", "R3", "R4"]).map((e) => ({ ...e, s: "hidden" as const }))],
    planes: [{ pts: ["R1", "R2", "R3", "R4"], tone: "b" }],
    dots: ["M", "H", "M'"],
    hide: ["R1", "R2", "R3", "R4"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Điểm M, hình chiếu H của M lên mặt phẳng và điểm đối xứng M phẩy của M qua mặt phẳng; H là trung điểm của đoạn MM phẩy.", en: "The point M, its projection H onto the plane and its reflection M prime in the plane; H is the midpoint of the segment M M prime." },
  },
  "12/tinh-tich-co-huong": {
    points: { O: [0, 0, 0], A: [1, 2, 3], B: [2, -1, 0], N: [3, 6, -5] },
    edges: [{ a: "O", b: "A", s: "arrow", label: "a" }, { a: "O", b: "B", s: "arrow", label: "b" }, { a: "O", b: "N", s: "arrowhl", label: "a×b" }],
    right: [{ at: "O", p: "A", q: "N" }, { at: "O", p: "B", q: "N" }],
    axes: [4, 7, 6],
    alt: { vi: "Hai vectơ a = (1; 2; 3), b = (2; -1; 0) và tích có hướng của chúng (3; 6; -5), vuông góc với cả a và b.", en: "Two vectors a = (1, 2, 3), b = (2, -1, 0) and their cross product (3, 6, -5), which is perpendicular to both a and b." },
  },
  "12/dien-tich-tam-giac": {
    points: { A: [1, 0, 0], B: [0, 2, 0], C: [0, 0, 2] },
    edges: [{ a: "A", b: "B", s: "arrow", label: "AB" }, { a: "A", b: "C", s: "arrow", label: "AC" }, { a: "B", b: "C" }],
    planes: [{ pts: ["A", "B", "C"], tone: "a" }],
    axes: [1.6, 2.5, 2.5],
    alt: { vi: "Tam giác ABC với A(1; 0; 0), B(0; 2; 0), C(0; 0; 2); diện tích bằng một nửa độ dài tích có hướng của AB và AC.", en: "The triangle ABC with A(1, 0, 0), B(0, 2, 0), C(0, 0, 2); its area is half the length of the cross product of AB and AC." },
  },
  "12/the-tich-hon-tap": {
    points: box(1.6, 2.6, 3),
    edges: withStyle(boxEdges, { AB: { s: "arrow", label: "a" }, AD: { s: "arrow", label: "b" }, "AA'": { s: "arrow", label: "c" } }),
    alt: { vi: "Hình hộp dựng trên ba vectơ a, b, c xuất phát từ một đỉnh; thể tích hình hộp bằng giá trị tuyệt đối của tích hỗn tạp, thể tích tứ diện bằng một phần sáu giá trị đó.", en: "A box built on three vectors a, b, c from one vertex; its volume is the absolute value of the triple product and the tetrahedron has one sixth of that volume." },
  },
  "12/mp-qua-ba-diem": {
    points: { A: [1, 0, 0], B: [0, 1, 0], C: [0, 0, 1], N: [1.6, 0.6, 0.6] },
    edges: [{ a: "A", b: "B", s: "arrow", label: "AB" }, { a: "A", b: "C", s: "arrow", label: "AC" }, { a: "B", b: "C" }, { a: "A", b: "N", s: "arrowhl", label: "n" }],
    planes: [{ pts: ["A", "B", "C"], tone: "a" }],
    axes: [1.8, 1.8, 1.8],
    hide: ["N"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Mặt phẳng đi qua A(1; 0; 0), B(0; 1; 0), C(0; 0; 1); vectơ pháp tuyến n là tích có hướng của AB và AC.", en: "The plane through A(1, 0, 0), B(0, 1, 0), C(0, 0, 1); the normal vector n is the cross product of AB and AC." },
  },
  "12/tich-vo-huong-kg": {
    points: { O: [0, 0, 0], U: [1, 1, 0], V: [0, 1, 1] },
    edges: [{ a: "O", b: "U", s: "arrowhl", label: "a" }, { a: "O", b: "V", s: "arrow", label: "b" }],
    angles: [{ at: "O", p: "U", q: "V", label: "60°" }],
    axes: [1.8, 1.8, 1.8],
    alt: { vi: "Hai vectơ a = (1; 1; 0) và b = (0; 1; 1) xuất phát từ O tạo với nhau góc 60 độ.", en: "Two vectors a = (1, 1, 0) and b = (0, 1, 1) from O make a 60 degree angle." },
  },
  "12/goc-hai-dt-kg": {
    points: { O: [0, 0, 0], U: [1, 1, 0], V: [1, 0, 1], X: [-0.8, -0.8, 0], Y: [-0.8, 0, -0.8] },
    edges: [{ a: "X", b: "U", s: "hl" }, { a: "Y", b: "V", s: "hl2" }],
    angles: [{ at: "O", p: "U", q: "V", label: "60°" }],
    axes: [1.8, 1.8, 1.8],
    hide: ["U", "V", "X", "Y"],
    alt: { vi: "Hai đường thẳng đi qua O có chỉ phương (1; 1; 0) và (1; 0; 1); góc giữa chúng bằng 60 độ.", en: "Two lines through O with direction vectors (1, 1, 0) and (1, 0, 1); the angle between them is 60 degrees." },
  },
  "12/song-song-vuong-goc-mp": {
    points: { ...pa, ...pb, G: add(pa.P1!, mul(add(pa.P2!, pa.P4!), 0.5)), N: add(add(pa.P1!, mul(add(pa.P2!, pa.P4!), 0.5)), mul(n1, 0.9)) },
    edges: [...quadEdges(["P1", "P2", "P3", "P4"]), ...quadEdges(["Q1", "Q2", "Q3", "Q4"]), { a: "G", b: "N", s: "arrowhl", label: "n" }],
    planes: [{ pts: ["P1", "P2", "P3", "P4"], tone: "a" }, { pts: ["Q1", "Q2", "Q3", "Q4"], tone: "b" }],
    hide: ["P1", "P2", "P3", "P4", "Q1", "Q2", "Q3", "Q4", "G", "N"],
    alt: { vi: "Hai mặt phẳng song song có các vectơ pháp tuyến cùng phương với vectơ n.", en: "Two parallel planes have normal vectors parallel to the vector n." },
  },
  "12/duong-mat-quan-he": {
    points: { M: [0, 0, 1], D1: [-0.8, -0.8, 0.2], D2: [0.8, 0.8, 1.8], ...planeP, G: [0, -1, 0.5], N: add([0, -1, 0.5], mul(nPlane, 0.5)) },
    edges: [{ a: "D1", b: "D2", s: "arrowhl", label: "d" }, ...quadEdges(["P1", "P2", "P3", "P4"]), { a: "G", b: "N", s: "arrow", label: "n" }],
    planes: [{ pts: ["P1", "P2", "P3", "P4"], tone: "a" }],
    dots: ["M"],
    hide: ["P1", "P2", "P3", "P4", "D1", "D2", "G", "N"],
    alt: { vi: "Đường thẳng d qua điểm M song song với mặt phẳng vì chỉ phương của d vuông góc với vectơ pháp tuyến n và M không nằm trên mặt phẳng.", en: "The line d through the point M is parallel to the plane because its direction is perpendicular to the normal vector n and M is not on the plane." },
  },
  "12/pt-dt-oxyz": {
    points: { A: [1, 2, 3], M: [3, 1, 7], D1: [4, 0.5, 9], D2: [-2, 3.5, -3] },
    edges: [{ a: "D1", b: "D2" }, { a: "A", b: "M", s: "arrowhl", label: "u" }],
    axes: [4, 4, 4],
    dots: ["A", "M"],
    hide: ["D1", "D2"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Đường thẳng đi qua điểm A(1; 2; 3) có vectơ chỉ phương u = (2; -1; 4); điểm M(3; 1; 7) nằm trên đường thẳng, ứng với tham số bằng một.", en: "A line through the point A(1, 2, 3) with direction vector u = (2, -1, 4); the point M(3, 1, 7) lies on the line, for parameter value one." },
  },
  "12/doan-thang-oxyz": {
    points: { A: [1, 2, 3], B: [5, 6, 7], I: [3, 4, 5], N: [4, 5, 6] },
    edges: [{ a: "A", b: "B", s: "hl" }],
    axes: [6, 7, 8],
    dots: ["A", "B", "I", "N"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Đoạn thẳng AB với A(1; 2; 3), B(5; 6; 7); điểm I là trung điểm, ứng với tham số bằng một nửa, và điểm N ứng với tham số bằng ba phần tư.", en: "The segment AB with A(1, 2, 3), B(5, 6, 7); the point I is the midpoint, for parameter one half, and the point N is for parameter three quarters." },
  },
  "12/pt-mp-dang": {
    points: { M: [1, 2, 3], ...quad([0, 1, 0], [2, 0, 2], [0, 2, 4]), G: [1, 2, 3], N: [1.6, 3.2, 2.4] },
    edges: [...quadEdges(["P1", "P2", "P3", "P4"]), { a: "G", b: "N", s: "arrowhl", label: "n" }],
    planes: [{ pts: ["P1", "P2", "P3", "P4"], tone: "a" }],
    axes: [3, 4, 6],
    dots: ["M"],
    hide: ["P1", "P2", "P3", "P4", "G", "N"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Mặt phẳng đi qua điểm M(1; 2; 3) có hai vectơ chỉ phương u = (1; 0; 1) và v = (0; 1; 2); vectơ pháp tuyến n vuông góc với mặt phẳng.", en: "A plane through the point M(1, 2, 3) with two direction vectors u = (1, 0, 1) and v = (0, 1, 2); the normal vector n is perpendicular to the plane." },
  },
  "12/lap-dt-mp": {
    points: { A: [1, 2, 3], H: [5 / 6, 7 / 3, 17 / 6], ...quad([-5 / 3, 4 / 3, 10 / 3], [4, 2, 0], [1, 0, -1]) },
    edges: [{ a: "A", b: "H", s: "hl" }, ...quadEdges(["P1", "P2", "P3", "P4"])],
    planes: [{ pts: ["P1", "P2", "P3", "P4"], tone: "a" }],
    dots: ["A", "H"],
    hide: ["P1", "P2", "P3", "P4"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Đường thẳng qua điểm A(1; 2; 3) vuông góc với mặt phẳng (P) cắt (P) tại H, hình chiếu của A lên (P).", en: "The line through the point A(1, 2, 3) perpendicular to the plane (P) meets (P) at H, the projection of A onto (P)." },
  },
  "12/vtt-hai-dt": {
    points: { A: [1, 2, 3], C: [1, 0, -1], D1: [-1, 3, 2], D2: [4, 0.5, 4.5], E1: [0.5, -1, -1], E2: [2.5, 3, -1] },
    edges: [{ a: "D1", b: "D2", s: "hl", label: "d1" }, { a: "E1", b: "E2", label: "d3" }],
    dots: ["A", "C"],
    hide: ["D1", "D2", "E1", "E2"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Hai đường thẳng chéo nhau d1 qua điểm A và d3 qua điểm C: chúng không song song và không có điểm chung.", en: "Two skew lines d1 through the point A and d3 through the point C: they are not parallel and have no common point." },
  },
  "12/giao-hai-dt": {
    points: { M: [2, 1, 5], D1: [0.5, 2.5, 2], D2: [3, 0, 7], E1: [0.5, -0.5, 6.5], E2: [3.5, 2.5, 3.5] },
    edges: [{ a: "D1", b: "D2", s: "hl", label: "d" }, { a: "E1", b: "E2", label: "d'" }],
    dots: ["M"],
    hide: ["D1", "D2", "E1", "E2"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Hai đường thẳng d và d' cắt nhau tại điểm M có tọa độ (2; 1; 5).", en: "Two lines d and d' meet at the point M with coordinates (2, 1, 5)." },
  },
  "12/duong-cat-hai-dt": {
    points: { P: [-2, 0, 0], Q: [0, 0.5, 1], A: [2, 1, 2], X1: [-3, 0, 0], X2: [3, 0, 0], Y1: [0, -1, 1], Y2: [0, 2, 1], F: [4, 1.5, 3] },
    edges: [{ a: "X1", b: "X2", label: "d1" }, { a: "Y1", b: "Y2", label: "d2" }, { a: "P", b: "F", s: "hl" }],
    dots: ["P", "Q", "A"],
    hide: ["X1", "X2", "Y1", "Y2", "F"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Đường thẳng đi qua điểm A cắt đường thẳng d1 tại P và cắt đường thẳng d2 tại Q; ba điểm A, P, Q thẳng hàng.", en: "A line through the point A meets the line d1 at P and the line d2 at Q; the three points A, P, Q are collinear." },
  },
  "12/dt-trong-mp": {
    points: { M: [1, 2, 3], ...quad([2.5, 2, 1.5], [-6, 3, 3], [3, -3, 0]), B1: [0, 0, 3], B2: [2, 4, 3], F1: [2.6, 1.2, 2.2], F2: [-0.6, 2.8, 3.8] },
    edges: [...quadEdges(["P1", "P2", "P3", "P4"]), { a: "B1", b: "B2", label: "d" }, { a: "F1", b: "F2", s: "hl", label: "Δ" }],
    planes: [{ pts: ["P1", "P2", "P3", "P4"], tone: "a" }],
    dots: ["M"],
    hide: ["P1", "P2", "P3", "P4", "B1", "B2", "F1", "F2"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Đường thẳng d cắt mặt phẳng (P) tại M; đường thẳng Δ nằm trong (P), đi qua M và vuông góc với d.", en: "The line d meets the plane (P) at M; the line Δ lies in (P), passes through M and is perpendicular to d." },
  },
  "12/mp-cuc-tri-oxyz": {
    points: { A: [1, 2, 3], B: [3, 0, 1], A2: [1, 2, -3], M: [2.5, 0.5, 0], ...quad([-1, -1, 0], [6, 0, 0], [0, 5, 0]) },
    edges: [...quadEdges(["P1", "P2", "P3", "P4"]), { a: "A", b: "M", s: "hl" }, { a: "M", b: "B", s: "hl" }, { a: "A2", b: "M", s: "hidden" }, { a: "A", b: "A2", s: "hidden" }],
    planes: [{ pts: ["P1", "P2", "P3", "P4"], tone: "a" }],
    dots: ["M"],
    hide: ["P1", "P2", "P3", "P4"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Mặt phẳng nằm ngang với hai điểm A và B ở cùng một phía; điểm A2 là điểm đối xứng của A qua mặt phẳng, và M là giao điểm của đoạn A2B với mặt phẳng, cho tổng MA và MB nhỏ nhất.", en: "A horizontal plane with two points A and B on the same side; the point A2 is the reflection of A in the plane, and M is where the segment A2B meets the plane, giving the smallest sum of MA and MB." },
  },
  "12/tong-hop-oxyz": {
    points: { O: [0, 0, 0], A: [1, 0, 0], B: [0, 2, 0], C: [0, 0, 3], H: [36 / 49, 18 / 49, 12 / 49] },
    edges: [{ a: "A", b: "B" }, { a: "B", b: "C" }, { a: "C", b: "A" }, { a: "O", b: "A", s: "hidden" }, { a: "O", b: "B", s: "hidden" }, { a: "O", b: "C", s: "hidden" }, { a: "O", b: "H", s: "hl" }],
    planes: [{ pts: ["A", "B", "C"], tone: "a" }],
    dots: ["H"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Tứ diện OABC có ba cạnh OA, OB, OC đôi một vuông góc; H là hình chiếu của gốc O lên mặt phẳng ABC và đoạn OH là khoảng cách từ O đến mặt phẳng.", en: "The tetrahedron OABC with three mutually perpendicular edges OA, OB, OC; H is the projection of the origin O onto the plane ABC and the segment OH is the distance from O to the plane." },
  },
  "12/kc-diem-oxyz": {
    points: { M: [1, 2, 3], H: [5 / 9, 20 / 9, 23 / 9], ...quad([-13 / 9, 2 / 9, 32 / 9], [2, 4, 0], [2, 0, -2]) },
    edges: [...quadEdges(["P1", "P2", "P3", "P4"]), { a: "M", b: "H", s: "hl" }],
    planes: [{ pts: ["P1", "P2", "P3", "P4"], tone: "a" }],
    right: [{ at: "H", p: "M", q: "P2" }],
    dots: ["H"],
    hide: ["P1", "P2", "P3", "P4"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Điểm M ngoài mặt phẳng (P) và chân H của đường vuông góc hạ từ M xuống (P); độ dài đoạn MH là khoảng cách từ M đến mặt phẳng.", en: "A point M off the plane (P) and the foot H of the perpendicular from M to (P); the length of the segment MH is the distance from M to the plane." },
  },
  "12/cuc-tri-hieu-oxyz": {
    points: { A: [1, 2, 3], B: [3, 0, 1], M: [4, -1, 0], ...quad([-1, -3, 0], [7, 0, 0], [0, 5, 0]) },
    edges: [...quadEdges(["P1", "P2", "P3", "P4"]), { a: "A", b: "B", s: "hl" }, { a: "B", b: "M", s: "hl" }],
    planes: [{ pts: ["P1", "P2", "P3", "P4"], tone: "a" }],
    dots: ["M"],
    hide: ["P1", "P2", "P3", "P4"],
    view: { dx: 0.3, dz: 0.25 },
    alt: { vi: "Mặt phẳng nằm ngang với hai điểm A và B cùng một phía; đường thẳng AB cắt mặt phẳng tại M ngoài đoạn AB, và tại M hiệu hai khoảng cách MA và MB đạt giá trị lớn nhất bằng AB.", en: "A horizontal plane with two points A and B on the same side; the line AB meets the plane at M outside the segment AB, and at M the difference of the distances MA and MB reaches its maximum, equal to AB." },
  },
  "12/chung-minh-vecto-kg": {
    points: box(3, 2, 2),
    edges: [...boxEdges, { a: "A", b: "C'", s: "hl" }, { a: "A", b: "D'", s: "hl2" }],
    planes: [{ pts: ["A", "B", "C'", "D'"], tone: "a" }],
    alt: { vi: "Hình hộp ABCD.A'B'C'D' với mặt phẳng đi qua bốn điểm A, B, C', D' được tô màu; hai đường chéo AC' và AD' nằm trong mặt phẳng này nên bốn điểm đồng phẳng.", en: "A parallelepiped ABCD.A'B'C'D' with the plane through the four points A, B, C', D' shaded; the diagonals AC' and AD' lie in this plane so the four points are coplanar." },
  },
  "12/tinh-goc-do-dai-vecto": {
    points: { ...box(2, 2, 2), O: [1, 1, 1] },
    edges: [...boxEdges, { a: "A", b: "C'", s: "hl" }, { a: "B", b: "D'", s: "hl2" }],
    dots: ["O"],
    alt: { vi: "Hình lập phương ABCD.A'B'C'D' với hai đường chéo AC' và BD' cắt nhau tại tâm O; góc giữa hai đường chéo có cô-sin bằng một phần ba.", en: "A cube ABCD.A'B'C'D' with the two diagonals AC' and BD' meeting at the centre O; the angle between the diagonals has cosine one third." },
  },
  "12/toa-do-hoa-hinh": {
    ...(() => { const f = pyr([0, 0, 2], { A: [0, 0, 0], B: [2, 0, 0], C: [2, 2, 0], D: [0, 2, 0] }, ["CD", "DA"]); return { points: f.points, edges: [...f.edges, { a: "B", b: "D", s: "hidden" as const }] }; })(),
    planes: [{ pts: ["S", "B", "D"], tone: "a" }],
    right: [{ at: "A", p: "B", q: "D" }, { at: "A", p: "B", q: "S" }, { at: "A", p: "D", q: "S" }],
    alt: { vi: "Hình chóp S.ABCD có đáy là hình vuông cạnh hai và SA vuông góc với đáy; ba cạnh AB, AD, AS đôi một vuông góc nên được đặt dọc ba trục tọa độ, và mặt phẳng SBD được tô màu.", en: "A pyramid S.ABCD whose base is a square of side two and with SA perpendicular to the base; the three edges AB, AD, AS are pairwise perpendicular so they are placed along the three coordinate axes, and the plane SBD is shaded." },
  },
};
export { cross };

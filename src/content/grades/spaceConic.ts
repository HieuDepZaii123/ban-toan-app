/** Hình vẽ phẳng của ba đường conic lớp 10, đặt trong mặt phẳng y = 0 để vẽ chính xác khi nhìn thẳng. */
import type { P3, SpaceFigure } from "./space.ts";

type Edge = SpaceFigure["edges"][number];

/** Đường cong nối các điểm đã chia nhỏ, thêm điểm ẩn tên theo tiền tố. */
function curve(prefix: string, pts: [number, number][]): { points: Record<string, P3>; edges: Edge[]; hide: string[] } {
  const points: Record<string, P3> = {};
  const edges: Edge[] = [];
  pts.forEach(([x, z], i) => { points[`${prefix}${i}`] = [x, 0, z]; if (i > 0) edges.push({ a: `${prefix}${i - 1}`, b: `${prefix}${i}` }); });
  return { points, edges, hide: Object.keys(points) };
}

const steps = (n: number, from: number, to: number): number[] => Array.from({ length: n + 1 }, (_, i) => from + ((to - from) * i) / n);

const FLAT = { dx: 0, dz: 0 };

function cross(prefix: string, xmax: number, zmax: number): { points: Record<string, P3>; edges: Edge[]; hide: string[] } {
  return {
    points: { [`${prefix}X1`]: [-xmax, 0, 0], [`${prefix}X2`]: [xmax, 0, 0], [`${prefix}Z1`]: [0, 0, -zmax], [`${prefix}Z2`]: [0, 0, zmax] },
    edges: [{ a: `${prefix}X1`, b: `${prefix}X2`, s: "arrow" }, { a: `${prefix}Z1`, b: `${prefix}Z2`, s: "arrow" }],
    hide: [`${prefix}X1`, `${prefix}X2`, `${prefix}Z1`, `${prefix}Z2`],
  };
}

const ell = curve("E", steps(48, 0, 2 * Math.PI).map((t) => [5 * Math.cos(t), 3 * Math.sin(t)] as [number, number]));
const ellAxes = cross("A", 6.4, 4.2);
const hypL = curve("L", steps(24, -1.3, 1.3).map((u) => [-3 * Math.cosh(u), 4 * Math.sinh(u)] as [number, number]));
const hypR = curve("R", steps(24, -1.3, 1.3).map((u) => [3 * Math.cosh(u), 4 * Math.sinh(u)] as [number, number]));
const hypAxes = cross("A", 6.2, 7.2);
const par = curve("P", steps(36, -6.5, 6.5).map((z) => [(z * z) / 12, z] as [number, number]));
const parAxes = cross("A", 4.2, 7.2);

const circle = (prefix: string, cx: number, cz: number, r: number) =>
  curve(prefix, steps(60, 0, 2 * Math.PI).map((t) => [cx + r * Math.cos(t), cz + r * Math.sin(t)] as [number, number]));
const cA = circle("C", 1, -2, 5);
const cT = circle("T", 0, 0, 3);
const cO = circle("U", 0, 0, 5);
const cO2 = circle("V", 8, 0, 5);
const axesA = cross("A", 7.5, 7.5);
const axesT = cross("A", 4.2, 4.2);

export const spaceConic: Record<string, SpaceFigure> = {
  "10/vtt-dt-tron": {
    points: { ...cA.points, ...axesA.points, I: [1, 0, -2], F: [2.8, 0, 0.4], A: [-0.4, 0, 2.8], B: [6, 0, -2] },
    edges: [...cA.edges, ...axesA.edges, { a: "A", b: "B", s: "hl" }, { a: "I", b: "F", s: "hl2" }],
    right: [{ at: "F", p: "I", q: "B" }],
    dots: ["I", "F", "A", "B"],
    hide: [...cA.hide, ...axesA.hide],
    view: FLAT,
    alt: { vi: "Đường tròn tâm I bán kính 5 bị đường thẳng cắt tại hai điểm A và B; đoạn IF vuông góc với dây cung AB tại chân F và có độ dài 3, nên dây cung dài 8.", en: "A circle with centre I and radius 5 cut by a line at two points A and B; the segment IF is perpendicular to the chord AB at the foot F and has length 3, so the chord has length 8." },
  },
  "10/tiep-tuyen-tron": {
    points: { ...cT.points, ...axesT.points, O: [0, 0, 0], A: [5, 0, 0], T1: [1.8, 0, 2.4], T2: [1.8, 0, -2.4] },
    edges: [...cT.edges, ...axesT.edges, { a: "A", b: "T1", s: "hl" }, { a: "A", b: "T2", s: "hl" }, { a: "O", b: "T1", s: "hidden" }, { a: "O", b: "T2", s: "hidden" }],
    right: [{ at: "T1", p: "O", q: "A" }, { at: "T2", p: "O", q: "A" }],
    dots: ["O", "A", "T1", "T2"],
    hide: [...cT.hide, ...axesT.hide],
    view: FLAT,
    alt: { vi: "Đường tròn tâm O bán kính 3 và điểm A ngoài đường tròn; hai tiếp tuyến từ A chạm đường tròn tại T1 và T2, và mỗi bán kính tới tiếp điểm vuông góc với tiếp tuyến.", en: "A circle with centre O and radius 3 and a point A outside it; the two tangents from A touch the circle at T1 and T2, and each radius to a point of contact is perpendicular to its tangent." },
  },
  "10/hai-duong-tron": {
    points: { ...cO.points, ...cO2.points, O: [0, 0, 0], K: [8, 0, 0], P: [4, 0, 3], Q: [4, 0, -3] },
    edges: [...cO.edges, ...cO2.edges, { a: "P", b: "Q", s: "hl" }, { a: "O", b: "K", s: "hidden" }],
    dots: ["O", "K", "P", "Q"],
    hide: [...cO.hide, ...cO2.hide],
    view: FLAT,
    alt: { vi: "Hai đường tròn cùng bán kính 5 có tâm O và K cách nhau 8, cắt nhau tại hai điểm P và Q; dây chung PQ dài 6 vuông góc với đường nối hai tâm.", en: "Two circles of the same radius 5 with centres O and K at distance 8 apart, meeting at two points P and Q; the common chord PQ has length 6 and is perpendicular to the line of centres." },
  },
  "10/elip-tieu-diem": {
    points: { ...ell.points, ...ellAxes.points, O: [0, 0, 0], F1: [-4, 0, 0], F2: [4, 0, 0], M: [2.5, 0, 3 * Math.sin(Math.PI / 3)] },
    edges: [...ell.edges, ...ellAxes.edges, { a: "F1", b: "M", s: "hl" }, { a: "F2", b: "M", s: "hl2" }],
    dots: ["F1", "F2", "M"],
    hide: [...ell.hide, ...ellAxes.hide],
    view: FLAT,
    alt: { vi: "Elip có bán trục lớn 5 và bán trục nhỏ 3 với hai tiêu điểm F1 và F2 trên trục hoành; điểm M của elip có tổng hai khoảng cách MF1 và MF2 bằng 10.", en: "An ellipse with semi-major axis 5 and semi-minor axis 3 and foci F1 and F2 on the horizontal axis; a point M of the ellipse has MF1 and MF2 adding up to 10." },
  },
  "10/hypebol-tieu-diem": {
    points: { ...hypL.points, ...hypR.points, ...hypAxes.points, O: [0, 0, 0], F1: [-5, 0, 0], F2: [5, 0, 0], T1: [-4.5, 0, -6], T2: [4.5, 0, 6], U1: [-4.5, 0, 6], U2: [4.5, 0, -6] },
    edges: [...hypL.edges, ...hypR.edges, ...hypAxes.edges, { a: "T1", b: "T2", s: "hidden" }, { a: "U1", b: "U2", s: "hidden" }],
    dots: ["F1", "F2"],
    hide: [...hypL.hide, ...hypR.hide, ...hypAxes.hide, "T1", "T2", "U1", "U2"],
    view: FLAT,
    alt: { vi: "Hypebol có hai nhánh, hai tiêu điểm F1 và F2 trên trục hoành và hai đường tiệm cận vẽ nét đứt mà các nhánh tiến sát khi đi ra xa.", en: "A hyperbola with two branches, foci F1 and F2 on the horizontal axis and two dashed asymptotes that the branches approach far from the centre." },
  },
  "10/parabol-chuan": {
    points: { ...par.points, ...parAxes.points, O: [0, 0, 0], F: [3, 0, 0], M: [3, 0, 6], H: [-3, 0, 6], D1: [-3, 0, -7], D2: [-3, 0, 7] },
    edges: [...par.edges, ...parAxes.edges, { a: "D1", b: "D2", s: "hidden", label: "Δ" }, { a: "M", b: "F", s: "hl" }, { a: "M", b: "H", s: "hl2" }],
    dots: ["F", "M", "H"],
    hide: [...par.hide, ...parAxes.hide, "D1", "D2"],
    view: FLAT,
    alt: { vi: "Parabol có đỉnh ở gốc O, tiêu điểm F trên trục hoành và đường chuẩn là đường thẳng đứng nét đứt; điểm M của parabol có khoảng cách MF bằng khoảng cách MH đến đường chuẩn.", en: "A parabola with vertex at the origin O, focus F on the horizontal axis and a dashed vertical directrix; a point M of the parabola has distance MF equal to the distance MH to the directrix." },
  },
};

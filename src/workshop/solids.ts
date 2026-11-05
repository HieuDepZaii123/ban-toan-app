/** Số liệu khối trong xưởng. Slider nào hiện thì phải vào công thức và hình. */

export type SolidKind = "tru" | "non" | "cau" | "lang" | "chop" | "tu" | "hop" | "lap";

export type SolidParams = { a: number; b: number; h: number };

export const SOLID_LABEL: Record<SolidKind, string> = {
  tru: "Trụ",
  non: "Nón",
  cau: "Cầu",
  lang: "Lăng trụ",
  chop: "Chóp",
  tu: "Tứ diện",
  hop: "Hộp",
  lap: "Lập phương",
};

export function solidVolume(kind: SolidKind, p: SolidParams): number {
  if (kind === "tru") return Math.PI * p.a * p.a * p.b;
  if (kind === "non") return (Math.PI * p.a * p.a * p.b) / 3;
  if (kind === "cau") return (4 / 3) * Math.PI * p.a * p.a * p.a;
  if (kind === "lang") return (p.a * p.b * p.h) / 2;
  if (kind === "chop") return (p.a * p.a * p.b) / 3;
  if (kind === "tu") return (p.a ** 3 * Math.SQRT2) / 12;
  if (kind === "lap") return p.a * p.a * p.a;
  return p.a * p.b * p.h;
}

export function solidBase(kind: SolidKind, p: SolidParams): number | null {
  if (kind === "tru" || kind === "non") return Math.PI * p.a * p.a;
  if (kind === "lang") return (p.a * p.b) / 2;
  if (kind === "chop") return p.a * p.a;
  if (kind === "hop") return p.a * p.b;
  if (kind === "lap") return p.a * p.a;
  return null;
}

/** Công thức đang dùng, số lấy từ thanh trượt. */
function tex(body: string): string {
  return `$${body}$`;
}

export function solidFormula(kind: SolidKind, p: SolidParams): string {
  const a = trim(p.a);
  const b = trim(p.b);
  const h = trim(p.h);
  const v = trim(solidVolume(kind, p));
  if (kind === "tru") return `Trụ: ${tex(`V=\\pi\\cdot ${a}^{2}\\cdot ${b}\\approx ${v}`)}. Thanh $b$ là chiều cao.`;
  if (kind === "non") return `Nón: ${tex(`V=\\dfrac{1}{3}\\pi\\cdot ${a}^{2}\\cdot ${b}\\approx ${v}`)}. Không lấy diện tích đáy.`;
  if (kind === "cau") return `Cầu: ${tex(`V=\\dfrac{4}{3}\\pi\\cdot ${a}^{3}\\approx ${v}`)}. Chỉ có bán kính $a$.`;
  if (kind === "lang") return `Lăng trụ tam giác: đáy ${tex(`\\dfrac{1}{2}\\cdot ${a}\\cdot ${b}`)}, cao ${tex(h)}. Thể tích ${tex(`V=${v}`)}.`;
  if (kind === "chop") return `Chóp: diện tích đáy ${tex(`S=${trim(p.a * p.a)}`)}, thể tích ${tex(`V=${v}`)}. Không lấy $S$ làm $V$.`;
  if (kind === "tu") return `Tứ diện đều: sáu cạnh cùng ${tex(`a=${a}`)}. ${tex(`V=\\dfrac{a^{3}\\sqrt{2}}{12}\\approx ${v}`)}.`;
  if (kind === "lap") return `Lập phương: ${tex(`V=${a}^{3}=${v}`)}. Đường chéo không gian ${tex(`d=${a}\\sqrt{3}`)}.`;
  return `Hộp: ${tex(`V=${a}\\cdot ${b}\\cdot ${h}=${v}`)}.`;
}

export function usesB(kind: SolidKind): boolean {
  return kind !== "cau" && kind !== "tu" && kind !== "lap";
}

export function usesH(kind: SolidKind): boolean {
  return kind === "lang" || kind === "hop";
}

function trim(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  return String(rounded).replace(".", "{,}");
}

export type Pt3 = readonly [number, number, number];

export function solidMesh(kind: SolidKind, p: SolidParams): { verts: Pt3[]; edges: [number, number][] } {
  if (kind === "tru" || kind === "non") return roundMesh(kind, p.a, p.b);
  if (kind === "cau") return sphereMesh(p.a);
  if (kind === "tu") return tetraMesh(p.a);
  if (kind === "chop") return pyramidMesh(p.a, p.b);
  if (kind === "lang") return prismMesh(p.a, p.b, p.h);
  if (kind === "lap") return boxMesh(p.a, p.a, p.a);
  return boxMesh(p.a, p.b, p.h);
}

function roundMesh(kind: "tru" | "non", radius: number, height: number): { verts: Pt3[]; edges: [number, number][] } {
  const n = 16;
  const verts: Pt3[] = [];
  for (let i = 0; i < n; i += 1) {
    const t = (i / n) * Math.PI * 2;
    verts.push([radius * Math.cos(t), 0, radius * Math.sin(t)]);
  }
  if (kind === "tru") {
    for (let i = 0; i < n; i += 1) {
      const t = (i / n) * Math.PI * 2;
      verts.push([radius * Math.cos(t), height, radius * Math.sin(t)]);
    }
  } else {
    verts.push([0, height, 0]);
  }
  const edges: [number, number][] = [];
  for (let i = 0; i < n; i += 1) {
    edges.push([i, (i + 1) % n]);
    if (kind === "tru") {
      edges.push([n + i, n + ((i + 1) % n)]);
      edges.push([i, n + i]);
    } else if (i % 2 === 0) edges.push([i, n]);
  }
  return { verts, edges };
}

function sphereMesh(radius: number): { verts: Pt3[]; edges: [number, number][] } {
  const rings = 8;
  const verts: Pt3[] = [];
  const edges: [number, number][] = [];
  for (let ring = 0; ring < 3; ring += 1) {
    const start = verts.length;
    for (let i = 0; i < rings; i += 1) {
      const t = (i / rings) * Math.PI * 2;
      const c = Math.cos(t) * radius;
      const s = Math.sin(t) * radius;
      if (ring === 0) verts.push([c, 0, s]);
      else if (ring === 1) verts.push([c, s, 0]);
      else verts.push([0, c, s]);
      edges.push([start + i, start + ((i + 1) % rings)]);
    }
  }
  return { verts, edges };
}

function tetraMesh(edge: number): { verts: Pt3[]; edges: [number, number][] } {
  const a = edge;
  const verts: Pt3[] = [
    [0, 0, 0],
    [a, 0, 0],
    [a / 2, 0, (a * Math.sqrt(3)) / 2],
    [a / 2, (a * Math.sqrt(6)) / 3, (a * Math.sqrt(3)) / 6],
  ];
  return { verts, edges: [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]] };
}

export function tetraEdgeLengths(edge: number): number[] {
  const { verts, edges } = tetraMesh(edge);
  return edges.map(([i, j]) => {
    const p = verts[i] ?? [0, 0, 0];
    const q = verts[j] ?? [0, 0, 0];
    return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
  });
}

function pyramidMesh(side: number, height: number): { verts: Pt3[]; edges: [number, number][] } {
  const verts: Pt3[] = [
    [0, 0, 0], [side, 0, 0], [side, 0, side], [0, 0, side],
    [side / 2, height, side / 2],
  ];
  return { verts, edges: [[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 4], [2, 4], [3, 4]] };
}

function prismMesh(a: number, b: number, height: number): { verts: Pt3[]; edges: [number, number][] } {
  const verts: Pt3[] = [
    [0, 0, 0], [a, 0, 0], [0, 0, b],
    [0, height, 0], [a, height, 0], [0, height, b],
  ];
  return {
    verts,
    edges: [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 3], [0, 3], [1, 4], [2, 5]],
  };
}

function boxMesh(a: number, b: number, height: number): { verts: Pt3[]; edges: [number, number][] } {
  const verts: Pt3[] = [
    [0, 0, 0], [a, 0, 0], [a, 0, b], [0, 0, b],
    [0, height, 0], [a, height, 0], [a, height, b], [0, height, b],
  ];
  return {
    verts,
    edges: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]],
  };
}

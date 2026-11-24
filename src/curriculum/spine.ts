/**
 * Trục chương trình: mọi nội dung học (bài, dạng bài, phương pháp, bài tư duy, thử thách) gắn vào
 * một chương của một lớp trong sách lớp 1–12 (src/content/grades), theo ba mạch của chương trình 2018.
 * Đây là nguồn duy nhất cho câu hỏi "nội dung này thuộc lớp nào, mạch nào, được dùng phép gì".
 */
import { gradeBooks } from "../content/grades/index.ts";

export type Strand = "so" | "hinh" | "tk";

export const STRAND_NAME: Record<Strand, { vi: string; en: string }> = {
  so: { vi: "Số và đại số", en: "Number and algebra" },
  hinh: { vi: "Hình học và đo lường", en: "Geometry and measurement" },
  tk: { vi: "Thống kê và xác suất", en: "Statistics and probability" },
};

const S = "so" as const;
const H = "hinh" as const;
const T = "tk" as const;

/** Mạch của từng chương, theo mã chương trong sách của lớp đó. */
const STRAND: Record<number, Record<string, Strand>> = {
  1: { "so-10": S, "cong-tru": S, "so-100": S, "do-xem": H, "bai-toan-1": S },
  2: { "cong-tru": S, nhan: S, "den-1000": S, "do-dai": H, "do-luong-2": H, "hinh-so-lieu-2": T, "bai-toan-2": S },
  3: { "so-100000": S, "nhan-chia": S, "mot-phan": S, do: H, "hinh-3": H, "kha-nang": T, "dien-tich-khoi-luong-3": H, "bai-toan-3": S },
  4: { "lop-trieu": S, "phan-so": S, "goc-duong": H, "thong-ke-4": T, "bon-phep-tinh": S, "do-luong-4": H, "hinh-binh-hanh-4": H },
  5: { "thap-phan": S, "phan-tram": S, "dien-tich": H, "the-tich": H, "ti-so": S, "thoi-gian": H, "bieu-do-5": T, "giai-toan-5": S, "bai-toan-5": S },
  6: { "so-tu-nhien": S, "chia-het": S, "so-nguyen": S, "phan-so": S, "thap-phan": S, "ti-so-pt": S, hinh: H, "tk-xs-6": T, "bai-toan-6": S },
  7: { "huu-ti": S, "ti-le": S, "dai-so": S, "tam-giac": H, thong: T, "thong-ke": T, "goc-song-song": H, "hinh-khoi-7": H, "bai-toan-7": S },
  8: { "dang-thuc": S, "pt-ham": S, "tam-giac": H, "tu-giac": H, thales: H, "xac-suat-8": T, "pt-tich-mau-8": S },
  9: { can: S, "ham-b2": S, "he-pt": S, "pt-b2": S, bpt: S, "lg-vuong": H, tron: H, khoi: H, "tan-so": T, "thuc-te-9": S, "on-vao-10": S },
  10: { "menh-de": S, "bpt-hai-an": S, "ham-bac-hai": S, "ung-dung-b2": S, "luong-giac": H, vecto: H, "toa-do": H, "to-hop": S, "thong-ke": T, xs: T },
  11: { "luong-giac": S, "day-so": S, "gioi-han": S, "mu-log": S, "dao-ham": S, "khong-gian": H, "goc-kc-11": H, "tk-11": T, "xs-11": T },
  12: { "khao-sat": S, "ung-dung-dh": S, "tich-phan": S, "ky-thuat-tp": S, "do-thi-ham": S, "tp-nang-cao": S, oxyz: H, "oxyz-nang-cao": H, "tk-12": T, "tk-nang-cao": T, "xs-12": T, "xs-nang-cao": T },
};

export type Node = { id: string; grade: number; chapter: string; title: string; strand: Strand };

export const nodeId = (grade: number, chapter: string): string => `${grade}:${chapter}`;

export const nodes: Node[] = gradeBooks.flatMap((book) =>
  book.chapters.map((chapter) => ({
    id: nodeId(book.grade, chapter.id),
    grade: book.grade,
    chapter: chapter.id,
    title: chapter.title,
    strand: STRAND[book.grade]?.[chapter.id] ?? S,
  })),
);

export const nodeById = new Map(nodes.map((node) => [node.id, node]));

export function nodesOfGrade(grade: number): Node[] {
  return nodes.filter((node) => node.grade === grade);
}

/** Chương nào của sách đã có bài nối sang chuyên đề (tờ có lab) này. */
export function nodesOfTopic(topicId: string): Node[] {
  const out: Node[] = [];
  for (const book of gradeBooks) {
    for (const chapter of book.chapters) {
      if (chapter.lessons.some((lesson) => lesson.topicId === topicId)) out.push(nodeById.get(nodeId(book.grade, chapter.id))!);
    }
  }
  return out;
}

/** Phép và ký hiệu được dùng từ lớp nào (chương trình 2018). Dưới mức này là lệch lớp. */
export const OPS_FROM = {
  times: 2,
  divide: 2,
  frac: 3,
  decimal: 5,
  percent: 5,
  negative: 6,
  power: 6,
  sqrt: 7,
  trig: 9,
  pi: 9,
  delta: 9,
  vector: 10,
  log: 11,
  lim: 11,
  integral: 12,
} as const;

export type Op = keyof typeof OPS_FROM;

/** Các phép và ký hiệu xuất hiện trong một công thức TeX. */
export function opsIn(tex: string): Set<Op> {
  const out = new Set<Op>();
  if (/\\times|\\cdot/.test(tex)) out.add("times");
  if (/\d\s*:\s*\d|\)\s*:\s*\(/.test(tex)) out.add("divide");
  if (/\\frac/.test(tex)) out.add("frac");
  if (/\{,\}|\d\.\d/.test(tex)) out.add("decimal");
  if (/\\%/.test(tex)) out.add("percent");
  if (/(?<![\w})\]%])-\s*(\d|\\frac|\\sqrt)/.test(tex)) out.add("negative");
  if (/\^/.test(tex.replace(/\^\{?\\circ\}?/g, "")) && !/^\s*\^\{?\d\}?\s*$/.test(tex)) out.add("power");
  if (/\\sqrt/.test(tex)) out.add("sqrt");
  if (/\\(sin|cos|tan|cot)\b/.test(tex)) out.add("trig");
  if (/\\pi\b/.test(tex)) out.add("pi");
  if (/\\Delta/.test(tex)) out.add("delta");
  if (/\\vec|\\overrightarrow/.test(tex)) out.add("vector");
  if (/\\(log|ln)\b/.test(tex)) out.add("log");
  if (/\\lim/.test(tex)) out.add("lim");
  if (/\\int/.test(tex)) out.add("integral");
  return out;
}

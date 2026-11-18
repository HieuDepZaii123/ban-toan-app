/** Mọi nội dung học theo lớp, trong một danh sách thống nhất, gắn với trục chương trình. */
import { dangByGrade } from "../content/grades/dang/index.ts";
import { thinkByGrade } from "../content/think/index.ts";
import { methodsData } from "../methods/catalog.ts";
import { DANG_CHAPTER, METHOD_NODE, THINK_CHAPTER } from "./links.ts";
import { nodeById, nodeId, type Strand } from "./spine.ts";

export type Kind = "dang" | "think" | "method";
export type Text = { vi: string; en: string };

export type Item = {
  id: string;
  kind: Kind;
  grade: number;
  node: string;
  strand: Strand;
  title: Text;
  /** Mọi chuỗi hiển thị của mục, để kiểm phép dùng và độ dài câu. */
  texts: Text[];
  href: string;
};

const strandOf = (node: string, fallback: Strand = "so"): Strand => nodeById.get(node)?.strand ?? fallback;

export function buildItems(): Item[] {
  const out: Item[] = [];
  for (const [g, list] of Object.entries(dangByGrade)) {
    const grade = Number(g);
    list.forEach((d, i) => {
      const chapter = DANG_CHAPTER[grade]?.[i] ?? "";
      const node = nodeId(grade, chapter);
      out.push({
        id: `dang:${grade}:${i}`, kind: "dang", grade, node, strand: strandOf(node), title: d.name,
        texts: [d.name, d.spot, ...d.method, d.example.prompt, ...d.example.steps, d.example.ket, d.mistake, d.drill.prompt, d.drill.answer],
        href: `/kien-thuc/${grade}/dang`,
      });
    });
  }
  for (const [g, list] of Object.entries(thinkByGrade)) {
    const grade = Number(g);
    list.forEach((t, i) => {
      const chapter = THINK_CHAPTER[grade]?.[i] ?? "";
      const node = nodeId(grade, chapter);
      out.push({
        id: `think:${grade}:${i}`, kind: "think", grade, node, strand: strandOf(node), title: t.title,
        texts: [t.title, t.prompt, t.hint, ...t.steps, t.answer],
        href: `/kien-thuc/${grade}/tu-duy`,
      });
    });
  }
  for (const m of methodsData.methods) {
    const at = METHOD_NODE[m.id];
    const grade = at?.grade ?? 0;
    const node = at ? nodeId(at.grade, at.chapter) : "";
    const vi = (text: string): Text => ({ vi: text, en: "" });
    out.push({
      id: `method:${m.id}`, kind: "method", grade, node, strand: at?.strand ?? strandOf(node), title: { vi: m.title, en: m.titleEn },
      texts: [
        vi(m.title), vi(m.blurb), ...m.spot.map(vi), ...m.thinking.map(vi), ...m.care.map(vi), ...m.formulas.map(vi),
        ...m.examples.flatMap((e) => [vi(e.prompt), ...e.steps.map(vi), vi(e.result)]),
        ...m.mistakes.map(vi),
        ...m.practice.flatMap((p) => [vi(p.prompt), ...p.steps.map(vi), vi(p.answer)]),
      ],
      href: `/phuong-phap/${m.id}`,
    });
  }
  return out;
}

export const items = buildItems();

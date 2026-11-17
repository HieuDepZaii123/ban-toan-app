import { thinkThcs } from "./thcs.ts";
import { thinkThpt } from "./thpt.ts";
import { thinkTieuHoc } from "./tieuHoc.ts";
import { thinkByTopic } from "./topics.ts";
import type { Think } from "./types.ts";

export { thinkByTopic };
export const thinkByGrade: Record<number, Think[]> = { ...thinkTieuHoc, ...thinkThcs, ...thinkThpt };
export { KIND_LABEL, type Bi, type Think, type ThinkKind } from "./types.ts";

export function collectThinkChecks(): { where: string; expr: string; expect: string }[] {
  const rows: { where: string; expr: string; expect: string }[] = [];
  const push = (where: string, list: Think[]) =>
    list.forEach((item, i) => item.checks.forEach((c, k) => rows.push({ where: `${where}/${i}#${k}`, expr: c.expr, expect: c.expect })));
  for (const [id, list] of Object.entries(thinkByTopic)) push(`T:${id}`, list);
  for (const [g, list] of Object.entries(thinkByGrade)) push(`G${g}`, list);
  return rows;
}

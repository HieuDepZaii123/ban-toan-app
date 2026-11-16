import type { GradeCheck } from "../types.ts";
import type { GradeDang } from "./types.ts";
import lop01 from "./lop01.ts";
import lop02 from "./lop02.ts";
import lop03 from "./lop03.ts";
import lop04 from "./lop04.ts";
import lop05 from "./lop05.ts";
import lop06 from "./lop06.ts";
import lop07 from "./lop07.ts";
import lop08 from "./lop08.ts";
import lop09 from "./lop09.ts";
import lop10 from "./lop10.ts";
import lop11 from "./lop11.ts";
import lop12 from "./lop12.ts";

export const dangByGrade: Record<number, GradeDang[]> = {
  1: lop01,
  2: lop02,
  3: lop03,
  4: lop04,
  5: lop05,
  6: lop06,
  7: lop07,
  8: lop08,
  9: lop09,
  10: lop10,
  11: lop11,
  12: lop12,
};

export function collectDangChecks(): { where: string; expr: string; expect: string }[] {
  const rows: { where: string; expr: string; expect: string }[] = [];
  const push = (where: string, checks: GradeCheck[]) => checks.forEach((c, i) => rows.push({ where: `${where}#${i}`, expr: c.expr, expect: c.expect }));
  for (const [g, list] of Object.entries(dangByGrade)) {
    list.forEach((d, i) => {
      push(`D${g}/${i}/vd`, d.example.checks);
      push(`D${g}/${i}/lt`, d.drill.checks);
    });
  }
  return rows;
}

import type { GradeLesson } from "../types.ts";
import type { LessonEn } from "./types.ts";
import { g1En } from "./g1.ts";
import { g2En } from "./g2.ts";
import { g3En } from "./g3.ts";
import { g4En } from "./g4.ts";
import { g5En } from "./g5.ts";
import { g6En } from "./g6.ts";
import { g7En } from "./g7.ts";
import { g8En } from "./g8.ts";
import { g9En } from "./g9.ts";
import { g10En } from "./g10.ts";
import { g11En } from "./g11.ts";
import { g12En } from "./g12.ts";
import { g12ExtraEn } from "./g12extra.ts";
import { g12Extra2En } from "./g12extra2.ts";
import { g12Extra3En } from "./g12extra3.ts";
import { g12Extra4En } from "./g12extra4.ts";
import { g12Extra5En } from "./g12extra5.ts";
import { g10Extra2En, g11Extra2En } from "./g1011extra.ts";
import { g10Extra3En, g11Extra3En } from "./g1011extra2.ts";
import { g10ExtraEn, g11ExtraEn, g9ExtraEn } from "./gExtra.ts";
import { g1ExtraEn, g2ExtraEn, g3ExtraEn, g4ExtraEn, g5ExtraEn, g6ExtraEn, g7ExtraEn, g8ExtraEn } from "./gLower.ts";

/** Bản dịch theo khóa "<lớp>/<mã bài>". */
const byGrade: [number, Record<string, LessonEn>][] = [[1, { ...g1En, ...g1ExtraEn }], [2, { ...g2En, ...g2ExtraEn }], [3, { ...g3En, ...g3ExtraEn }], [4, { ...g4En, ...g4ExtraEn }], [5, { ...g5En, ...g5ExtraEn }], [6, { ...g6En, ...g6ExtraEn }], [7, { ...g7En, ...g7ExtraEn }], [8, { ...g8En, ...g8ExtraEn }], [9, { ...g9En, ...g9ExtraEn }], [10, { ...g10En, ...g10ExtraEn, ...g10Extra2En, ...g10Extra3En }], [11, { ...g11En, ...g11ExtraEn, ...g11Extra2En, ...g11Extra3En }], [12, { ...g12En, ...g12ExtraEn, ...g12Extra2En, ...g12Extra3En, ...g12Extra4En, ...g12Extra5En }]];

export const lessonsEn: Record<string, LessonEn> = Object.fromEntries(
  byGrade.flatMap(([grade, lessons]) => Object.entries(lessons).map(([id, item]) => [`${grade}/${id}`, item])),
);

/** Bài học bằng tiếng Anh, giữ nguyên phép kiểm và đáp số; undefined nếu bài chưa được dịch. */
export function lessonInEnglish(grade: number, lesson: GradeLesson): GradeLesson | undefined {
  const en = lessonsEn[`${grade}/${lesson.id}`];
  if (!en) return undefined;
  return {
    ...lesson,
    summary: en.s,
    whyTrue: en.w,
    pitfalls: en.p,
    dataNote: lesson.dataNote ? "Assumed data." : undefined,
    examples: lesson.examples.map((example, i) => {
      const [prompt, steps, ket] = en.ex[i]!;
      return { ...example, prompt, ket, steps: steps.map(([claim, why]) => ({ claim, why })) };
    }),
    drills: lesson.drills.map((drill, i) => {
      const [prompt, answer, why, hints, options] = en.dr[i]!;
      const ask = drill.ask?.kind === "choice" && options ? { ...drill.ask, options } : drill.ask;
      return { ...drill, prompt, answer, why, hints, ask };
    }),
  };
}

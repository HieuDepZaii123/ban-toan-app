import type { GradeLesson } from "../types.ts";
import type { LessonEn } from "./types.ts";
import { g6En } from "./g6.ts";
import { g7En } from "./g7.ts";
import { g8En } from "./g8.ts";
import { g10En } from "./g10.ts";
import { g11En } from "./g11.ts";
import { g12En } from "./g12.ts";

/** Bản dịch theo khóa "<lớp>/<mã bài>". */
const byGrade: [number, Record<string, LessonEn>][] = [[6, g6En], [7, g7En], [8, g8En], [10, g10En], [11, g11En], [12, g12En]];

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

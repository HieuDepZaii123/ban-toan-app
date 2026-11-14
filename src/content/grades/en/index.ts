import type { GradeLesson } from "../types.ts";
import type { LessonEn } from "./types.ts";
import { g10En } from "./g10.ts";

/** Bản dịch theo khóa "<lớp>/<mã bài>". */
export const lessonsEn: Record<string, LessonEn> = {
  ...Object.fromEntries(Object.entries(g10En).map(([id, item]) => [`10/${id}`, item])),
};

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

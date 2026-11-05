import { lop01 } from "./lop01.ts";
import { lop02 } from "./lop02.ts";
import { lop03 } from "./lop03.ts";
import { lop04 } from "./lop04.ts";
import { lop05 } from "./lop05.ts";
import { lop06 } from "./lop06.ts";
import { lop07 } from "./lop07.ts";
import { lop08 } from "./lop08.ts";
import { lop09 } from "./lop09.ts";
import { lop10 } from "./lop10.ts";
import { lop11 } from "./lop11.ts";
import { lop12 } from "./lop12.ts";
import { deepen } from "./depth.ts";
import type { GradeBook, GradeCheck, GradeLesson } from "./types.ts";

export const gradeBooks: GradeBook[] = [
  lop01, lop02, lop03, lop04, lop05,
  lop06, lop07, lop08, lop09,
  lop10, lop11, lop12,
].map(deepen);

export function bookByGrade(grade: number): GradeBook | undefined {
  return gradeBooks.find((book) => book.grade === grade);
}

export function lessonsOf(book: GradeBook): { chapterTitle: string; lesson: GradeLesson }[] {
  return book.chapters.flatMap((chapter) => chapter.lessons.map((lesson) => ({ chapterTitle: chapter.title, lesson })));
}

export function lessonAt(grade: number, lessonId: string): { chapter: GradeBook["chapters"][number]; lesson: GradeLesson } | undefined {
  const book = bookByGrade(grade);
  if (!book) return undefined;
  for (const chapter of book.chapters) {
    const lesson = chapter.lessons.find((item) => item.id === lessonId);
    if (lesson) return { chapter, lesson };
  }
  return undefined;
}

export function collectGradeChecks(): { where: string; expr: string; expect: string }[] {
  const rows: { where: string; expr: string; expect: string }[] = [];
  const push = (where: string, checks: GradeCheck[]) => {
    checks.forEach((check, index) => rows.push({ where: `${where}#${index}`, expr: check.expr, expect: check.expect }));
  };
  for (const book of gradeBooks) {
    for (const chapter of book.chapters) {
      for (const lesson of chapter.lessons) {
        lesson.examples.forEach((example, index) => push(`L${book.grade}/${lesson.id}/vd${index}`, example.checks));
        lesson.drills.forEach((drill, index) => push(`L${book.grade}/${lesson.id}/lt${index}`, drill.checks));
      }
    }
  }
  return rows;
}

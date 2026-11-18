import type { GradeBook, GradeLesson } from "./types.ts";

/** Every lesson of a book in reading order, with the title of its chapter. */
export function lessonsOf(book: GradeBook): { chapterTitle: string; lesson: GradeLesson }[] {
  return book.chapters.flatMap((chapter) => chapter.lessons.map((lesson) => ({ chapterTitle: chapter.title, lesson })));
}

/** One lesson of a book and the chapter it sits in, or undefined if the id is not there. */
export function findLesson(book: GradeBook, lessonId: string): { chapter: GradeBook["chapters"][number]; lesson: GradeLesson } | undefined {
  for (const chapter of book.chapters) {
    const lesson = chapter.lessons.find((item) => item.id === lessonId);
    if (lesson) return { chapter, lesson };
  }
  return undefined;
}

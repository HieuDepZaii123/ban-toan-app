import { thcsNotes } from "./thcs.ts";
import { thptNotes } from "./thpt.ts";
import { tieuHocNotes } from "./tieuHoc.ts";
import type { LessonNote, NoteBook } from "./types.ts";

const ALL: NoteBook = { ...tieuHocNotes, ...thcsNotes, ...thptNotes };

export function noteFor(grade: number, lessonId: string): LessonNote | undefined {
  return ALL[`${grade}/${lessonId}`];
}

export function noteKeys(): string[] {
  return Object.keys(ALL);
}

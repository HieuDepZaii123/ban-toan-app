import { thcsNotes } from "./thcs.ts";
import { thptNotes } from "./thpt.ts";
import { tieuHocExtraNotes } from "./extra-tieuHoc.ts";
import { lowerExtraNotes } from "./lowerExtra.ts";
import { mathExtraNotes } from "./mathExtra.ts";
import { thptExtraNotes } from "./thptExtra.ts";
import { tieuHocNotes } from "./tieuHoc.ts";
import type { LessonNote, NoteBook } from "./types.ts";

const ALL: NoteBook = { ...tieuHocNotes, ...thcsNotes, ...thptNotes, ...thptExtraNotes, ...mathExtraNotes, ...lowerExtraNotes, ...tieuHocExtraNotes };

export function noteFor(grade: number, lessonId: string): LessonNote | undefined {
  return ALL[`${grade}/${lessonId}`];
}

export function noteKeys(): string[] {
  return Object.keys(ALL);
}

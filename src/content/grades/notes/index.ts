import { thcsNotes } from "./thcs.ts";
import { thptNotes } from "./thpt.ts";
import { tieuHocExtraNotes } from "./extra-tieuHoc.ts";
import { lowerExtraNotes } from "./lowerExtra.ts";
import { mathExtraNotes } from "./mathExtra.ts";
import { thptExtraNotes } from "./thptExtra.ts";
import { thptExtra2Notes } from "./thptExtra2.ts";
import { thpt1011Notes } from "./thpt1011.ts";
import { tieuHocNotes } from "./tieuHoc.ts";
import type { LessonNote, NoteBook } from "./types.ts";

const ALL: NoteBook = { ...tieuHocNotes, ...thcsNotes, ...thptNotes, ...thptExtraNotes, ...thptExtra2Notes, ...thpt1011Notes, ...mathExtraNotes, ...lowerExtraNotes, ...tieuHocExtraNotes };

export function noteFor(grade: number, lessonId: string): LessonNote | undefined {
  return ALL[`${grade}/${lessonId}`];
}

export function noteKeys(): string[] {
  return Object.keys(ALL);
}

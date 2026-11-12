/** Lời giải thích viết tay cho từng bài: vì sao quy tắc đúng, và lỗi học sinh hay mắc. */
export type LessonNote = { why: string; pit: string };

/** Khóa là "<lớp>/<mã bài>". */
export type NoteBook = Record<string, LessonNote>;

export function note(why: string, pit: string): LessonNote {
  return { why, pit };
}

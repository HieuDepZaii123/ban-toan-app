/**
 * Dạng bài và phương pháp giải của từng lớp 1–12: mỗi lớp 10 dạng. Mỗi dạng có cách nhận ra,
 * các bước giải, một ví dụ giải đủ bước, lỗi hay gặp và một bài luyện. Chữ song ngữ {vi, en};
 * công thức giống nhau ở hai bản (scripts/gradeDang.test.ts kiểm), đáp số qua sympy.
 */
import type { GradeCheck } from "../types.ts";

export type Bi = { vi: string; en: string };

export type GradeDang = {
  name: Bi;
  /** Dấu hiệu để nhận ra dạng bài. */
  spot: Bi;
  /** Các bước giải, theo thứ tự làm. */
  method: Bi[];
  example: { prompt: Bi; steps: Bi[]; ket: Bi; checks: GradeCheck[] };
  mistake: Bi;
  drill: { prompt: Bi; answer: Bi; checks: GradeCheck[] };
};

export const b = (vi: string, en: string): Bi => ({ vi, en });

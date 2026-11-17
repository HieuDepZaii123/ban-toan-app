/**
 * Bài tập tư duy và sáng tạo: đố mẹo, tìm lỗi sai, phản ví dụ, tự ra đề, nhiều cách giải, ước lượng.
 * Chữ song ngữ {vi, en}; công thức giống nhau ở hai bản; số liệu qua sympy (scripts/think.test.ts).
 */
import type { GradeCheck } from "../grades/types.ts";

export type Bi = { vi: string; en: string };

export type ThinkKind = "puzzle" | "error" | "counter" | "design" | "multi" | "estimate";

export const KIND_LABEL: Record<ThinkKind, Bi> = {
  puzzle: { vi: "Đố mẹo", en: "Puzzle" },
  error: { vi: "Tìm lỗi sai", en: "Spot the error" },
  counter: { vi: "Phản ví dụ", en: "Counterexample" },
  design: { vi: "Tự ra đề", en: "Design a problem" },
  multi: { vi: "Nhiều cách giải", en: "Two ways" },
  estimate: { vi: "Ước lượng", en: "Estimate" },
};

export type Think = {
  kind: ThinkKind;
  title: Bi;
  prompt: Bi;
  /** Gợi ý nhẹ, không lộ đáp số. */
  hint: Bi;
  /** 2–4 bước, mỗi bước một ý. */
  steps: Bi[];
  answer: Bi;
  /** Đẳng thức sympy; để trống khi câu trả lời là lập luận. */
  checks: GradeCheck[];
};

export const b = (vi: string, en: string): Bi => ({ vi, en });

export function think(
  kind: ThinkKind,
  title: Bi,
  prompt: Bi,
  hint: Bi,
  steps: Bi[],
  answer: Bi,
  checks: [string, string][] = [],
): Think {
  return { kind, title, prompt, hint, steps, answer, checks: checks.map(([expr, expect]) => ({ expr, expect })) };
}

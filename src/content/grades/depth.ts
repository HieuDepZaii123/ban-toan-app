import type { GradeBook, GradeDrill, GradeLesson, GradeWidget } from "./types.ts";
import { noteFor } from "./notes/index.ts";
import { kidSummaries } from "./notes/kidVoice.ts";
import { secondExamples } from "./notes/secondExamples.ts";

const WIDGET: Record<string, GradeWidget> = {
  "phan-nho": "fraction",
  "phan-lon": "fraction",
  "phan-bang": "fraction",
  "so-sanh-phan-4": "fraction",
  "cong-tru-nguyen": "line",
  "tri-tuyet-doi": "line",
  "huu-ti-bai": "line",
  "phan-am": "line",
  "thap-phan-am": "line",
  "ham-bac-nhat": "linear",
  "y-ax2": "quadratic",
  "do-thi": "quadratic",
};

function numberOf(text: string): number | null {
  if (/^-?\d+$/.test(text)) return Number(text);
  const slash = text.match(/^(-?\d+)\/(-?\d+)$/);
  if (slash) return Number(slash[1]) / Number(slash[2]);
  const rat = text.match(/^Rational\((-?\d+),(-?\d+)\)$/);
  if (rat) return Number(rat[1]) / Number(rat[2]);
  return null;
}

/** Chỉ bài thống kê và xác suất mới dùng số liệu đặt ra; xét theo chính bài, không theo tên chương. */
const DATA_LESSON = /thống kê|xác suất|tần số|biểu đồ|số trung bình|trung vị|phương sai|mẫu ghép|bảng số liệu|dữ liệu|biến cố|khả năng/;

function assumed(lesson: GradeLesson): string | undefined {
  const blob = `${lesson.title} ${lesson.summary}`.toLowerCase();
  if (DATA_LESSON.test(blob) || /trung bình cộng/i.test(lesson.title)) return "Số liệu giả định.";
  return lesson.dataNote;
}

/** How a number may appear in Vietnamese answer text: 15, -2, 0,25, 1/4. */
function spellings(value: number, expect: string): string[] {
  const out = new Set<string>([expect.replace(/^Rational\((-?\d+),(-?\d+)\)$/, "$1/$2")]);
  if (Number.isFinite(value)) {
    out.add(String(value));
    out.add(String(Math.round(value * 1000) / 1000).replace(".", ","));
  }
  return [...out];
}

const YES_NO = /^kiểm tra|có thuộc|có phải|có là|đúng không|hay không|có\s.*\skhông\s*\?|có cắt|có song song|có vuông góc/i;
const SEVERAL = /\bhoặc\b|;|\bvà\s*\$?x\s*=|x_1|x_2/i;

/**
 * Only offer a number box when the drill's stated answer really is that single number.
 * checks[0].expect is a verification value; it is not always what the question asks for
 * (a factor's constant, one of two roots, or a yes/no question).
 */
function numberAsk(drill: GradeDrill): number | null {
  const expect = drill.checks[0]?.expect.trim() ?? "";
  const value = numberOf(expect);
  if (value === null) return null;
  if (YES_NO.test(drill.prompt) || SEVERAL.test(drill.answer)) return null;
  const answer = drill.answer.replace(/\\,|\s/g, "");
  const said = spellings(value, expect).some((text) => {
    const at = answer.indexOf(text);
    if (at < 0) return false;
    const before = answer[at - 1] ?? "";
    const after = answer[at + text.length] ?? "";
    return !/[\d,]/.test(before) && !/\d/.test(after) && !(after === "," && /\d/.test(answer[at + text.length + 1] ?? ""));
  });
  return said ? value : null;
}

export function deepen(book: GradeBook): GradeBook {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map((lesson) => {
        const drills = lesson.drills.map((drill, index, all) => {
          const starred = index === all.length - 1 && (drill.stars ?? 0) < 2 ? { ...drill, stars: 2 } : drill;
          if (starred.ask) return starred;
          const value = numberAsk(starred);
          if (value === null) return starred;
          return { ...starred, ask: { kind: "number" as const, value, tolerance: 0.001 } };
        });
        const written = noteFor(book.grade, lesson.id);
        return {
          ...lesson,
          summary: kidSummaries[`${book.grade}/${lesson.id}`] ?? lesson.summary,
          examples: lesson.examples.length < 2 && secondExamples[`${book.grade}/${lesson.id}`]
            ? [...lesson.examples, secondExamples[`${book.grade}/${lesson.id}`]!]
            : lesson.examples,
          whyTrue: lesson.whyTrue ?? written?.why,
          pitfalls: lesson.pitfalls ?? written?.pit,
          dataNote: assumed(lesson),
          widget: lesson.widget ?? WIDGET[lesson.id],
          drills,
        };
      }),
    })),
  };
}

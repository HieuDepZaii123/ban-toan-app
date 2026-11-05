import type { GradeBook, GradeDrill, GradeLesson, GradeWidget } from "./types.ts";

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

function pitfall(lesson: GradeLesson): string {
  const blob = `${lesson.title} ${lesson.summary}`.toLowerCase();
  if (blob.includes("giới hạn") || blob.includes("tiệm cận")) {
    return "Rút gọn trước khi thế số. Nếu hai phía khác nhau thì dừng.";
  }
  if (blob.includes("đạo hàm") || blob.includes("cực trị") || blob.includes("khảo sát")) {
    return "Đạo hàm đúng số mũ, rồi xét dấu hai bên điểm đạo hàm bằng không.";
  }
  if (blob.includes("xác suất") || blob.includes("biến cố")) {
    return "Liệt kê lại không gian mẫu trước khi cộng hai xác suất.";
  }
  if (blob.includes("phân số") || blob.includes("một phần")) {
    return "Đưa về cùng một cách chia, rồi mới cộng hoặc so sánh.";
  }
  if (blob.includes("trừ")) {
    return "Trừ từng hàng. Hàng không đủ thì mượn, rồi kiểm bằng phép cộng.";
  }
  if (blob.includes("cộng") || blob.includes("nhân") || blob.includes("chia")) {
    return "Tính từng hàng, rồi kiểm lại bằng phép ngược.";
  }
  return "Giữ đủ điều kiện của bài, rồi kiểm bằng phép tính ngược.";
}

function whyTrue(lesson: GradeLesson): string {
  const reason = lesson.examples[0]?.steps.map((step) => step.why).sort((a, b) => b.length - a.length)[0]
    ?? "Quy tắc trong tóm tắt khớp dữ kiện của bài.";
  return reason.startsWith("$") ? `Vì ${reason}` : reason;
}

function assumed(chapterTitle: string, lesson: GradeLesson): string | undefined {
  const blob = `${chapterTitle} ${lesson.title} ${lesson.summary}`.toLowerCase();
  if (/thống kê|xác suất|tần số|biểu đồ|trung bình|mẫu/.test(blob)) return "Số liệu giả định.";
  return lesson.dataNote;
}

function harder(lesson: GradeLesson): GradeDrill | null {
  const base = lesson.drills[0];
  const check = base?.checks[0];
  if (!base || !check) return null;
  const value = numberOf(check.expect.trim());
  if (value === null || !Number.isFinite(value)) {
    return {
      prompt: "Chọn kết luận khớp với ví dụ của bài.",
      answer: lesson.examples[0]?.ket ?? base.answer,
      why: "Đáp án là kết luận của ví dụ. Hai câu kia đổi phép hoặc đổi dấu.",
      checks: [check],
      stars: 2,
      hints: [
        "Đọc kết luận ở cuối ví dụ.",
        "Bỏ câu đổi dấu hoặc đổi phép tính.",
      ],
      ask: {
        kind: "choice",
        correct: 0,
        options: [
          lesson.examples[0]?.ket ?? base.answer,
          "Kết quả đổi dấu so với đáp án đúng.",
          "Kết quả lớn hơn đáp án đúng vì đã nhân thêm một thừa số.",
        ],
      },
    };
  }
  const next = value + 1;
  const shown = Number.isInteger(next) ? String(next) : String(Math.round(next * 1000) / 1000);
  return {
    prompt: "Làm đúng bài gốc, rồi cộng thêm 1. Kết quả mới bằng bao nhiêu?",
    answer: `Kết quả mới bằng ${shown.replace(".", ",")}.`,
    why: "Bài gốc cho một số. Bài nâng cao giữ nguyên số đó rồi cộng thêm đúng một đơn vị.",
    checks: [{ expr: `(${check.expr})+1`, expect: `(${check.expect})+1` }],
    stars: 3,
    hints: [
      "Tính xong bài gốc trước, chưa cộng thêm.",
      "Cộng thêm đúng một đơn vị, không nhân đôi đáp số.",
    ],
    ask: { kind: "number", value: next, tolerance: 0.001 },
  };
}

export function deepen(book: GradeBook): GradeBook {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map((lesson) => {
        const extra = lesson.drills.some((drill) => (drill.stars ?? 0) >= 2) ? null : harder(lesson);
        const drills = (extra ? [...lesson.drills, extra] : lesson.drills).map((drill, index, all) => {
          const starred = index === all.length - 1 && (drill.stars ?? 0) < 2 ? { ...drill, stars: 2 } : drill;
          if (starred.ask) return starred;
          const value = numberOf(starred.checks[0]?.expect.trim() ?? "");
          if (value === null) return starred;
          return { ...starred, ask: { kind: "number" as const, value, tolerance: 0.001 } };
        });
        return {
          ...lesson,
          whyTrue: lesson.whyTrue ?? whyTrue(lesson),
          pitfalls: lesson.pitfalls ?? pitfall(lesson),
          dataNote: assumed(chapter.title, lesson),
          widget: lesson.widget ?? WIDGET[lesson.id],
          drills,
        };
      }),
    })),
  };
}

/** Kiến thức lớp 1–12 theo chương trình GDPT 2018. */

export type FigureKind = "count" | "segment" | "angle" | "triangle" | "rect" | "circle" | "bar";

export type GradeCheck = { expr: string; expect: string };

export type GradeStep = { claim: string; why: string };

export type GradeExample = {
  prompt: string;
  steps: GradeStep[];
  ket: string;
  checks: GradeCheck[];
};

export type AskNumber = { kind: "number"; value: number; tolerance?: number };
export type AskChoice = { kind: "choice"; options: string[]; correct: number };
export type GradeAsk = AskNumber | AskChoice;

export type GradeWidget = "fraction" | "line" | "linear" | "quadratic";

export type GradeDrill = {
  prompt: string;
  answer: string;
  /** Một câu lý do của đáp án luyện tập. */
  why?: string;
  checks: GradeCheck[];
  /** 1 dễ, 2 vừa, 3 nâng cao. */
  stars?: number;
  hints?: string[];
  ask?: GradeAsk;
};

export type GradeLesson = {
  id: string;
  title: string;
  summary: string;
  /** Vì sao quy tắc trong bài đúng. */
  whyTrue?: string;
  /** Một lỗi học sinh hay mắc. */
  pitfalls?: string;
  /** Ghi khi số liệu trong bài là giả định. */
  dataNote?: string;
  figure?: FigureKind;
  widget?: GradeWidget;
  examples: GradeExample[];
  drills: GradeDrill[];
  /** Chuyên đề THPT đã có, nếu bài này nối sang đó. */
  topicId?: string;
};

export type GradeChapter = { id: string; title: string; lessons: GradeLesson[] };

export type GradeBand = "tieu-hoc" | "thcs" | "thpt";

export type GradeBook = {
  grade: number;
  band: GradeBand;
  title: string;
  chapters: GradeChapter[];
};

export function buoc(claim: string, why: string): GradeStep {
  return { claim, why };
}

export function vd(prompt: string, steps: GradeStep[], ket: string, checks: GradeCheck[]): GradeExample {
  return { prompt, steps, ket, checks };
}

export function luyen(prompt: string, answer: string, checks: GradeCheck[], why?: string): GradeDrill {
  return { prompt, answer, checks, why };
}

export function bai(
  id: string,
  title: string,
  summary: string,
  examples: GradeExample[],
  drills: GradeDrill[],
  extra?: { figure?: FigureKind; topicId?: string; whyTrue?: string; pitfalls?: string; dataNote?: string; widget?: GradeWidget },
): GradeLesson {
  return {
    id, title, summary, examples, drills,
    figure: extra?.figure, topicId: extra?.topicId, whyTrue: extra?.whyTrue,
    pitfalls: extra?.pitfalls, dataNote: extra?.dataNote, widget: extra?.widget,
  };
}

export function chuong(id: string, title: string, lessons: GradeLesson[]): GradeChapter {
  return { id, title, lessons };
}

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

export type GradeDrill = {
  prompt: string;
  answer: string;
  checks: GradeCheck[];
};

export type GradeLesson = {
  id: string;
  title: string;
  summary: string;
  figure?: FigureKind;
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

export function luyen(prompt: string, answer: string, checks: GradeCheck[]): GradeDrill {
  return { prompt, answer, checks };
}

export function bai(
  id: string,
  title: string,
  summary: string,
  examples: GradeExample[],
  drills: GradeDrill[],
  extra?: { figure?: FigureKind; topicId?: string },
): GradeLesson {
  return { id, title, summary, examples, drills, figure: extra?.figure, topicId: extra?.topicId };
}

export function chuong(id: string, title: string, lessons: GradeLesson[]): GradeChapter {
  return { id, title, lessons };
}

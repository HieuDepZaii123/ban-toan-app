export type StreamId = "algebra" | "analysis" | "geometry" | "chance";

export type Think = { nhin: string; lam: string; ket: string };

export type TopicMeta = {
  id: string;
  n: string;
  stream: StreamId;
  grade: "10" | "11" | "12";
  status: "ready" | "stub";
  title: string;
  titleEn: string;
  blurb: string;
  blurbEn: string;
  soon: string;
  soonEn: string;
  think: Think;
  thinkEn: Think;
  trap: string;
  trapEn: string;
  questions: number;
};

export type Verdict = "dung" | "sai" | "thieu";

export type Question = {
  id: string;
  /** concept: pick the true statement. dss: Đúng / Sai / Chưa đủ on four statements. */
  kind?: "concept" | "dss";
  prompt: string;
  promptEn: string;
  choices: [string, string, string, string];
  choicesEn: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  hint: string;
  hintEn: string;
  steps: [string, string, string];
  stepsEn: [string, string, string];
  /** Verdict of each shown statement, same order as choices. */
  verdicts?: [Verdict, Verdict, Verdict, Verdict];
  reasons?: [string, string, string, string];
  reasonsEn?: [string, string, string, string];
};

export type Lesson = {
  concept: string;
  conceptEn: string;
};

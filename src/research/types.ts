export type StudyGuess = { id: string; vi: string; en: string };

export type StudyColumn = { key: string; vi: string; en: string };

/** One guided investigation. `formula` is the closed form the plot and the tests check. */
export type Study = {
  id: string;
  topic: string;
  title: string;
  titleEn: string;
  question: string;
  questionEn: string;
  hint: string;
  hintEn: string;
  block: string;
  blockEn: string;
  preset: Record<string, number>;
  guesses: readonly [StudyGuess, StudyGuess, StudyGuess];
  answerId: string;
  columns: readonly StudyColumn[];
  plotX: string;
  plotY: string;
  measure: (params: Record<string, number>) => Record<string, number> | null;
  formula: (x: number, params: Record<string, number>) => number;
  tol: number;
  samples: readonly Record<string, number>[];
  result: string;
  resultEn: string;
  follow: string;
  followEn: string;
};

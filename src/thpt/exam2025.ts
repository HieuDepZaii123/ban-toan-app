/**
 * Đề thi thử theo cấu trúc THPT 2025 (môn Toán):
 *   Phần I   12 câu trắc nghiệm 4 lựa chọn, 0,25 điểm mỗi câu        = 3 điểm
 *   Phần II  4 câu Đúng/Sai, mỗi câu 4 ý; đúng 1/2/3/4 ý được
 *            0,1 / 0,25 / 0,5 / 1 điểm                                = 4 điểm
 *   Phần III 6 câu trả lời ngắn, 0,5 điểm mỗi câu                     = 3 điểm
 * 90 phút. Mỗi đề rút từ một hạt giống, nên cùng hạt giống cho cùng đề.
 */
import { mulberry32 } from "../lib/prng.ts";
import { HARD_KEYS, templateKeyOf } from "../grades/practiceGen.ts";
import type { DssItem } from "../content/vary/dss/item.ts";
import { analyticDssItems } from "../content/vary/dss/analytic.ts";
import { comboDssItems } from "../content/vary/dss/combo.ts";
import { derivativeDssItems } from "../content/vary/dss/derivative.ts";
import { expDssItems } from "../content/vary/dss/exp.ts";
import { ineqDssItems } from "../content/vary/dss/ineq.ts";
import { integralDssItems } from "../content/vary/dss/integral.ts";
import { limitDssItems } from "../content/vary/dss/limit.ts";
import { probabilityDssItems } from "../content/vary/dss/probability.ts";
import { quadraticDssItems } from "../content/vary/dss/quadratic.ts";
import { sequenceDssItems } from "../content/vary/dss/sequence.ts";
import { surveyDssItems } from "../content/vary/dss/survey.ts";
import { triangleDssItems } from "../content/vary/dss/triangle.ts";
import { trigDssItems } from "../content/vary/dss/trig.ts";
import { vectorDssItems } from "../content/vary/dss/vector.ts";
import { thptBank, thptById, type ThptQuestion } from "./bank.ts";
import { TF_FAMILIES } from "./tfFamilies.ts";

export const EXAM_MINUTES_2025 = 90;
export const PART_POINTS = { mcq: 3, tf: 4, short: 3 } as const;

/** Grade mix of the real paper: mostly grade 12, some grade 11, a little grade 10. */
type Slot = { grade: number; hard?: true; graph?: true };

/** Mẫu câu hỏi đọc đồ thị hoặc bảng biến thiên; đề thật có nhiều câu loại này nên mỗi đề dành sẵn các ô cho chúng. */
const GRAPH_KEYS = new Set(["dothicucdai", "dothinghiem", "dothidongbien", "dothipttcd", "dothipttcn", "dothiptdbien", "dothib4cuctieu", "dothib4nghiem", "dothigiao", "dothigiaohd", "bbtcucdai", "bbtnghiem"]);
const MCQ_SLOTS: readonly Slot[] = [
  { grade: 12 }, { grade: 12 }, { grade: 12 }, { grade: 12, graph: true }, { grade: 12, graph: true },
  { grade: 11 }, { grade: 11 }, { grade: 10 },
  // The last four are the "application" questions: parameters, optimisation, solids, two-step problems.
  { grade: 12, hard: true, graph: true }, { grade: 12, hard: true }, { grade: 12, hard: true }, { grade: 12, hard: true },
];
const SHORT_SLOTS: readonly Slot[] = [{ grade: 12, graph: true }, { grade: 12 }, { grade: 11 }, { grade: 11 }, { grade: 12, hard: true }, { grade: 12, hard: true }];

/** Topic sheets that carry the true/false statements, with a readable topic name. */
export const TF_SOURCES: { topic: string; vi: string; en: string; items: readonly DssItem[] }[] = [
  { topic: "survey", vi: "Khảo sát hàm số", en: "Function analysis", items: surveyDssItems },
  { topic: "derivative", vi: "Đạo hàm", en: "Derivatives", items: derivativeDssItems },
  { topic: "integral", vi: "Tích phân", en: "Integrals", items: integralDssItems },
  { topic: "exp", vi: "Mũ và logarit", en: "Exponentials and logarithms", items: expDssItems },
  { topic: "probability", vi: "Xác suất", en: "Probability", items: probabilityDssItems },
  { topic: "vector", vi: "Vectơ, tọa độ", en: "Vectors and coordinates", items: vectorDssItems },
  { topic: "analytic", vi: "Hình giải tích", en: "Analytic geometry", items: analyticDssItems },
  { topic: "sequence", vi: "Dãy số", en: "Sequences", items: sequenceDssItems },
  { topic: "trig", vi: "Lượng giác", en: "Trigonometry", items: trigDssItems },
  { topic: "limit", vi: "Giới hạn", en: "Limits", items: limitDssItems },
  { topic: "combo", vi: "Tổ hợp, thống kê", en: "Combinatorics and statistics", items: comboDssItems },
  { topic: "triangle", vi: "Hình học", en: "Geometry", items: triangleDssItems },
  { topic: "quadratic", vi: "Hàm số bậc hai", en: "Quadratic functions", items: quadraticDssItems },
  { topic: "ineq", vi: "Bất đẳng thức", en: "Inequalities", items: ineqDssItems },
];

export type TfStatement = { vi: string; en: string; truth: boolean; whyVi: string; whyEn: string };
export type TfQuestion = {
  id: string;
  topic: string;
  topicVi: string;
  topicEn: string;
  contextVi: string;
  contextEn: string;
  statements: [TfStatement, TfStatement, TfStatement, TfStatement];
};

export type Paper = {
  seed: number;
  mcq: string[];
  tf: TfQuestion[];
  short: string[];
};

export type Answers = {
  /** Part I: question id → chosen index 0–3. */
  mcq: Record<string, number>;
  /** Part II: `${questionIndex}:${statementIndex}` → true (Đúng) / false (Sai). */
  tf: Record<string, boolean>;
  /** Part III: question id → what the learner typed. */
  short: Record<string, string>;
};

export function emptyAnswers(): Answers {
  return { mcq: {}, tf: {}, short: {} };
}

function shuffle<T>(list: readonly T[], rng: () => number): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j] as T, out[i] as T];
  }
  return out;
}

/** A short answer must be a plain number of at most four characters besides sign and comma, as on the answer sheet. */
export function shortValue(question: ThptQuestion): number | null {
  const text = question.choices[question.answer].trim();
  const match = text.match(/^\$?(-?\d+(?:\{?,\}?\d+)?)\$?$/);
  if (!match?.[1]) return null;
  const plain = match[1].replace(/\{,\}/g, ",");
  if (plain.replace(/[-,]/g, "").length > 4) return null;
  return Number(plain.replace(",", "."));
}

const SHORT_POOL = thptBank.filter((question) => shortValue(question) !== null);

/** Read what the learner typed: "-1,5", "-1.5", "2" are all accepted. */
export function parseShort(text: string): number | null {
  const clean = text.trim().replace(/\s/g, "").replace(",", ".");
  if (!/^-?\d+(\.\d+)?$/.test(clean)) return null;
  return Number(clean);
}

export function shortRight(question: ThptQuestion, typed: string | undefined): boolean {
  const expected = shortValue(question);
  const got = parseShort(typed ?? "");
  return expected !== null && got !== null && Math.abs(got - expected) < 1e-9;
}

function pickByGrade(pool: readonly ThptQuestion[], slots: readonly Slot[], rng: () => number, used: Set<string>, kinds: Set<string>): string[] {
  const out: string[] = [];
  const topics = new Set<string>();
  for (const { grade, hard, graph } of slots) {
    // One paper never carries two questions of the same kind (two "length of AB", two "cos x = 0").
    const options = shuffle(pool.filter((item) => item.grade === grade && !used.has(item.id) && !kinds.has(templateKeyOf(item.id)) && (graph ? GRAPH_KEYS.has(templateKeyOf(item.id)) : !GRAPH_KEYS.has(templateKeyOf(item.id))) && (hard ? HARD_KEYS.has(templateKeyOf(item.id)) : !HARD_KEYS.has(templateKeyOf(item.id)))), rng);
    // Prefer a topic not used yet, so one paper covers the chapters instead of repeating one.
    const pick = options.find((item) => !topics.has(item.topic)) ?? options[0];
    if (!pick) continue;
    used.add(pick.id);
    kinds.add(templateKeyOf(pick.id));
    topics.add(pick.topic);
    out.push(pick.id);
  }
  return out;
}

/** One-letter names used inside the formulas of a text. */
export function mathLetters(text: string): Set<string> {
  const out = new Set<string>();
  for (const m of text.matchAll(/\$([^$]*)\$/g)) {
    const body = (m[1] ?? "").replace(/\\[A-Za-z]+/g, " ");
    for (const t of body.matchAll(/(^|[^A-Za-z])([A-Za-z])(?![A-Za-z])/g)) out.add(t[2] as string);
  }
  return out;
}

/** Names every reader knows without a definition: the variable, a function, e, i, the set R. */
const STANDARD_NAMES = new Set(["x", "y", "f", "g", "h", "e", "i", "R", "d"]);

/** A statement may only use names the question defines; otherwise the learner cannot judge it. */
export function declared(context: string, statement: string): boolean {
  const known = mathLetters(context);
  return [...mathLetters(statement)].every((name) => STANDARD_NAMES.has(name) || known.has(name));
}

export function buildPaper(seed: number): Paper {
  const rng = mulberry32(seed >>> 0);
  const used = new Set<string>();
  const kinds = new Set<string>();
  const mcq = pickByGrade(thptBank, MCQ_SLOTS, rng, used, kinds);
  const short = pickByGrade(SHORT_POOL, SHORT_SLOTS, rng, used, kinds);
  // Part II is built from data-reading families (a function and its derivative, coordinates, a counting table, a sequence),
  // so each statement needs a short calculation, instead of the bare statements of the in-app true/false sheets.
  const tf: TfQuestion[] = (() => { const all = shuffle(TF_FAMILIES, rng); const graphFamily = all.find((family) => family.topic === "graph-reading"); return shuffle([graphFamily!, ...all.filter((family) => family !== graphFamily)].slice(0, 4), rng); })().map((family, index) => {
    const made = family.make(rng);
    return {
      id: `${family.topic}#${index}`,
      topic: family.topic,
      topicVi: family.vi,
      topicEn: family.en,
      contextVi: `${made.contextVi} Mỗi ý sau đúng hay sai?`,
      contextEn: `${made.contextEn} Is each statement true or false?`,
      statements: made.statements,
    };
  });
  return { seed: seed >>> 0, mcq, tf, short };
}

/** Official partial credit for one true/false question. */
export function tfPoints(correct: number): number {
  return correct >= 4 ? 1 : correct === 3 ? 0.5 : correct === 2 ? 0.25 : correct === 1 ? 0.1 : 0;
}

export type TopicLoss = { topic: string; vi: string; en: string; lost: number };
export type PaperScore = {
  mcq: number;
  tf: number;
  short: number;
  total: number;
  mcqRight: number;
  tfStatementsRight: number;
  shortRight: number;
  /** Points lost per topic, largest first. */
  losses: TopicLoss[];
};

const round2 = (value: number) => Math.round(value * 100) / 100;

export function scorePaper(paper: Paper, answers: Answers, topicName: (id: string) => { vi: string; en: string }): PaperScore {
  const lost = new Map<string, number>();
  const lose = (topic: string, points: number) => lost.set(topic, (lost.get(topic) ?? 0) + points);
  let mcqRight = 0;
  for (const id of paper.mcq) {
    const question = thptById.get(id);
    if (!question) continue;
    if (answers.mcq[id] === question.answer) mcqRight += 1;
    else lose(question.topic, 0.25);
  }
  let tf = 0;
  let tfStatementsRight = 0;
  paper.tf.forEach((question, qi) => {
    const right = question.statements.filter((statement, si) => answers.tf[`${qi}:${si}`] === statement.truth).length;
    tfStatementsRight += right;
    tf += tfPoints(right);
    lose(question.topic, 1 - tfPoints(right));
  });
  let shortCount = 0;
  for (const id of paper.short) {
    const question = thptById.get(id);
    if (!question) continue;
    if (shortRight(question, answers.short[id])) shortCount += 1;
    else lose(question.topic, 0.5);
  }
  const mcq = round2(mcqRight * 0.25);
  const short = round2(shortCount * 0.5);
  tf = round2(tf);
  const losses = [...lost.entries()]
    .filter(([, points]) => points > 0)
    .map(([topic, points]) => ({ topic, ...topicName(topic), lost: round2(points) }))
    .sort((a, b) => b.lost - a.lost);
  return { mcq, tf, short, total: round2(mcq + tf + short), mcqRight, tfStatementsRight, shortRight: shortCount, losses };
}

export const TF_TOPIC_NAMES = new Map([...TF_SOURCES.map((source) => [source.topic, { vi: source.vi, en: source.en }] as const), ...TF_FAMILIES.map((family) => [family.topic, { vi: family.vi, en: family.en }] as const)]);

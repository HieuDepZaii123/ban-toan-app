/**
 * Đề thi thử theo cấu trúc THPT 2025 (môn Toán):
 *   Phần I   12 câu trắc nghiệm 4 lựa chọn, 0,25 điểm mỗi câu        = 3 điểm
 *   Phần II  4 câu Đúng/Sai, mỗi câu 4 ý; đúng 1/2/3/4 ý được
 *            0,1 / 0,25 / 0,5 / 1 điểm                                = 4 điểm
 *   Phần III 6 câu trả lời ngắn, 0,5 điểm mỗi câu                     = 3 điểm
 * 90 phút. Mỗi đề rút từ một hạt giống, nên cùng hạt giống cho cùng đề.
 */
import { mulberry32 } from "../lib/prng.ts";
import { templateKeyOf } from "../grades/practiceGen.ts";
import { joinMath } from "../content/vary/stem.ts";
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

export const EXAM_MINUTES_2025 = 90;
export const PART_POINTS = { mcq: 3, tf: 4, short: 3 } as const;

/** Grade mix of the real paper: mostly grade 12, some grade 11, a little grade 10. */
const MCQ_GRADES = [12, 12, 12, 12, 12, 12, 12, 12, 12, 11, 11, 10] as const;
const SHORT_GRADES = [12, 12, 12, 12, 11, 11] as const;

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

function pickByGrade(pool: readonly ThptQuestion[], grades: readonly number[], rng: () => number, used: Set<string>, kinds: Set<string>): string[] {
  const out: string[] = [];
  const topics = new Set<string>();
  for (const grade of grades) {
    // One paper never carries two questions of the same kind (two "length of AB", two "cos x = 0").
    const options = shuffle(pool.filter((item) => item.grade === grade && !used.has(item.id) && !kinds.has(templateKeyOf(item.id))), rng);
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

const INSTRUCTION_VI = /[,.]?\s*mỗi mệnh đề (?:là )?Đúng, Sai,? hay Chưa đủ\??\s*$/i;
const INSTRUCTION_EN = /[,.]?\s*mark each statement true, false,? or not enough\.?\s*$/i;

const UNKNOWN = /chưa biết|chưa được xác định|chưa xác định|unknown|not fixed|not determined|is not given/i;

/** Does any statement use this one-letter variable inside its formulas? */
function uses(name: string, texts: readonly string[]): boolean {
  const token = new RegExp(`(^|[^A-Za-z\\\\])${name}($|[^A-Za-z])`);
  return texts.some((text) => [...text.matchAll(/\$([^$]*)\$/g)].some((m) => token.test(m[1] ?? "")));
}

/**
 * The in-app items declare an unknown (k, t, m…) for their "not enough" statements. The exam keeps
 * only decided statements, so a sentence that only introduces an unknown nobody uses is dropped.
 */
function dropUnusedUnknowns(context: string, free: readonly string[], statements: readonly string[]): string {
  const sentences = context.split(/(?<=[.?])\s+/);
  return sentences
    .filter((sentence) => {
      if (!UNKNOWN.test(sentence)) return true;
      const named = free.filter((name) => new RegExp(`\\$[^$]*\\b${name}\\b[^$]*\\$`).test(sentence));
      if (named.length === 0) return true;
      // Keep it if it carries other given data besides the unknown, or a statement uses the unknown.
      const standalone = /^(?:[^.,;]*?)(?:chưa biết|chưa được xác định|chưa xác định|is unknown|is not fixed|not determined)/i.test(sentence) && !/,|với|with/i.test(sentence.replace(/\$[^$]*\$/g, ""));
      return !standalone || named.some((name) => uses(name, statements));
    })
    .join(" ");
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

/** The decided statements of an item that only use names its context defines. */
function usableFacts(item: DssItem, params: Record<string, number>): DssItem["facts"][number][] {
  const context = item.context(params);
  return item.facts.filter((fact) => fact.verdict !== "thieu" && declared(context, fact.vi));
}

function tfQuestion(source: (typeof TF_SOURCES)[number], rng: () => number, index: number): TfQuestion {
  const usable = source.items.filter((candidate) => candidate.rows.every((row) => usableFacts(candidate, row).length >= 4));
  const item = usable[Math.floor(rng() * usable.length)];
  if (!item) throw new Error(`${source.topic} has no true/false items`);
  const params = item.rows[Math.floor(rng() * item.rows.length)] ?? item.rows[0];
  if (!params) throw new Error(`${item.id} has no rows`);
  // Only statements that are definitely true or false and use defined names; "not enough" belongs to the in-app format, not the exam.
  const decided = shuffle(usableFacts(item, params), rng).slice(0, 4);
  const statements = decided.map((fact) => ({
    vi: joinMath(fact.vi),
    en: joinMath(fact.en),
    truth: fact.verdict === "dung",
    whyVi: joinMath(fact.reasonVi(params)),
    whyEn: joinMath(fact.reasonEn(params)),
  })) as TfQuestion["statements"];
  const free = item.free.map((axis) => axis.name);
  return {
    id: `${item.id}#${index}`,
    topic: source.topic,
    topicVi: source.vi,
    topicEn: source.en,
    contextVi: `${dropUnusedUnknowns(joinMath(item.context(params)).replace(INSTRUCTION_VI, ".").replace(/\.\.$/, "."), free, statements.map((s) => s.vi))} Mỗi ý sau đúng hay sai?`,
    contextEn: `${dropUnusedUnknowns(joinMath(item.contextEn(params)).replace(INSTRUCTION_EN, ".").replace(/\.\.$/, "."), free, statements.map((s) => s.en))} Is each statement true or false?`,
    statements,
  };
}

const hasUsable = (source: (typeof TF_SOURCES)[number]): boolean =>
  source.items.some((item) => item.rows.every((row) => usableFacts(item, row).length >= 4));

export function buildPaper(seed: number): Paper {
  const rng = mulberry32(seed >>> 0);
  const used = new Set<string>();
  const kinds = new Set<string>();
  const mcq = pickByGrade(thptBank, MCQ_GRADES, rng, used, kinds);
  const short = pickByGrade(SHORT_POOL, SHORT_GRADES, rng, used, kinds);
  const tf = shuffle(TF_SOURCES.filter(hasUsable), rng).slice(0, 4).map((source, index) => tfQuestion(source, rng, index));
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

export const TF_TOPIC_NAMES = new Map(TF_SOURCES.map((source) => [source.topic, { vi: source.vi, en: source.en }]));

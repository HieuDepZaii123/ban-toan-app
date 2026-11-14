/**
 * Kế hoạch ôn lỗi sai (Premium): câu sai trong đề thi thử quay lại theo lịch giãn cách.
 * Mỗi câu nằm trong một hộp; trả lời đúng thì sang hộp sau và hẹn xa hơn (1, 3, 7, 14 ngày),
 * sai thì về hộp đầu, hẹn ngày mai. Đúng ở hộp cuối là thuộc bài, câu rời kế hoạch.
 * Chỉ là hàm thuần và localStorage, để test được không cần trình duyệt.
 */
import { thptById } from "./bank.ts";
import { shortRight, type Answers, type Paper } from "./exam2025.ts";

export const REVIEW_KEY = "ban-toan-review-v1";
export const DAY_MS = 86_400_000;
/** Days until the next review after a right answer in box 0, 1, 2, 3. */
export const INTERVAL_DAYS = [1, 3, 7, 14] as const;
const MAX_CARDS = 200;

export type ReviewKind = "mcq" | "short";
export type ReviewCard = {
  id: string;
  kind: ReviewKind;
  topic: string;
  box: number;
  due: number;
  added: number;
  /** Times answered wrong during review. */
  lapses: number;
};
export type ReviewState = {
  cards: ReviewCard[];
  /** Questions that left the plan after a right answer in the last box. */
  mastered: number;
  /** Points lost per topic over all scored papers, for the weak-topic list. */
  lost: Record<string, number>;
  papers: number;
};

export function emptyReview(): ReviewState {
  return { cards: [], mastered: 0, lost: {}, papers: 0 };
}

const isObj = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);
const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

/** Read saved state, dropping anything malformed or pointing at a question no longer in the bank. */
export function readReview(raw: unknown): ReviewState {
  if (!isObj(raw)) return emptyReview();
  const cards: ReviewCard[] = [];
  const seen = new Set<string>();
  if (Array.isArray(raw.cards)) {
    for (const item of raw.cards) {
      if (!isObj(item) || typeof item.id !== "string" || seen.has(item.id) || !thptById.has(item.id)) continue;
      if (item.kind !== "mcq" && item.kind !== "short") continue;
      if (!finite(item.box) || !finite(item.due) || !finite(item.added)) continue;
      seen.add(item.id);
      cards.push({
        id: item.id,
        kind: item.kind,
        topic: typeof item.topic === "string" ? item.topic : thptById.get(item.id)?.topic ?? "",
        box: Math.min(INTERVAL_DAYS.length - 1, Math.max(0, Math.floor(item.box))),
        due: item.due,
        added: item.added,
        lapses: finite(item.lapses) ? Math.max(0, Math.floor(item.lapses)) : 0,
      });
    }
  }
  const lost: Record<string, number> = {};
  if (isObj(raw.lost)) for (const [topic, points] of Object.entries(raw.lost)) if (finite(points) && points > 0) lost[topic] = points;
  return {
    cards: cards.slice(0, MAX_CARDS),
    mastered: finite(raw.mastered) ? Math.max(0, Math.floor(raw.mastered)) : 0,
    lost,
    papers: finite(raw.papers) ? Math.max(0, Math.floor(raw.papers)) : 0,
  };
}

export function loadReview(storage: Pick<Storage, "getItem"> = localStorage): ReviewState {
  try {
    return readReview(JSON.parse(storage.getItem(REVIEW_KEY) || "null"));
  } catch {
    return emptyReview();
  }
}

export function saveReview(state: ReviewState, storage: Pick<Storage, "setItem"> = localStorage): void {
  try {
    storage.setItem(REVIEW_KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked: the plan simply is not kept */
  }
}

/** Wrong or blank multiple-choice and short-answer questions of a scored paper. */
export function missedQuestions(paper: Paper, answers: Answers): { id: string; kind: ReviewKind; topic: string }[] {
  const out: { id: string; kind: ReviewKind; topic: string }[] = [];
  for (const id of paper.mcq) {
    const question = thptById.get(id);
    if (question && answers.mcq[id] !== question.answer) out.push({ id, kind: "mcq", topic: question.topic });
  }
  for (const id of paper.short) {
    const question = thptById.get(id);
    if (question && !shortRight(question, answers.short[id])) out.push({ id, kind: "short", topic: question.topic });
  }
  return out;
}

/**
 * Add a scored paper to the plan: its missed questions become due now (a question already in the
 * plan goes back to the first box), and the points lost per topic are added to the running totals.
 */
export function addPaper(state: ReviewState, paper: Paper, answers: Answers, losses: readonly { topic: string; lost: number }[], now: number): ReviewState {
  const missed = missedQuestions(paper, answers);
  const ids = new Set(missed.map((item) => item.id));
  const kept = state.cards.filter((card) => !ids.has(card.id));
  const again = new Map(state.cards.filter((card) => ids.has(card.id)).map((card) => [card.id, card]));
  const fresh: ReviewCard[] = missed.map((item) => {
    const old = again.get(item.id);
    return { ...item, box: 0, due: now, added: old?.added ?? now, lapses: old ? old.lapses + 1 : 0 };
  });
  const lost = { ...state.lost };
  for (const loss of losses) if (loss.lost > 0) lost[loss.topic] = Math.round(((lost[loss.topic] ?? 0) + loss.lost) * 100) / 100;
  // Newest misses first; when over the cap, the oldest cards drop out.
  return { cards: [...fresh, ...kept].slice(0, MAX_CARDS), mastered: state.mastered, lost, papers: state.papers + 1 };
}

/** Record one review answer. */
export function answerCard(state: ReviewState, id: string, right: boolean, now: number): ReviewState {
  const card = state.cards.find((item) => item.id === id);
  if (!card) return state;
  if (!right) {
    const back: ReviewCard = { ...card, box: 0, due: now + DAY_MS, lapses: card.lapses + 1 };
    return { ...state, cards: state.cards.map((item) => (item.id === id ? back : item)) };
  }
  if (card.box >= INTERVAL_DAYS.length - 1) {
    return { ...state, cards: state.cards.filter((item) => item.id !== id), mastered: state.mastered + 1 };
  }
  const days = INTERVAL_DAYS[card.box] ?? 1;
  const next: ReviewCard = { ...card, box: card.box + 1, due: now + days * DAY_MS };
  return { ...state, cards: state.cards.map((item) => (item.id === id ? next : item)) };
}

/** Cards to review now, most overdue first. */
export function dueCards(state: ReviewState, now: number): ReviewCard[] {
  return state.cards.filter((card) => card.due <= now).sort((a, b) => a.due - b.due || a.added - b.added);
}

function startOfDay(at: number): number {
  const day = new Date(at);
  day.setHours(0, 0, 0, 0);
  return day.getTime();
}

export type ReviewSchedule = { today: number; tomorrow: number; week: number; later: number; total: number };

/** How many cards fall due today (including overdue), tomorrow, in the rest of the next 7 days, and later. */
export function schedule(state: ReviewState, now: number): ReviewSchedule {
  const day0 = startOfDay(now);
  const out: ReviewSchedule = { today: 0, tomorrow: 0, week: 0, later: 0, total: state.cards.length };
  for (const card of state.cards) {
    if (card.due <= now || card.due < day0 + DAY_MS) out.today += 1;
    else if (card.due < day0 + 2 * DAY_MS) out.tomorrow += 1;
    else if (card.due < day0 + 7 * DAY_MS) out.week += 1;
    else out.later += 1;
  }
  return out;
}

/** Topics that cost the most points over all papers, largest first. */
export function weakTopics(state: ReviewState, limit = 3): { topic: string; lost: number; waiting: number }[] {
  return Object.entries(state.lost)
    .map(([topic, lost]) => ({ topic, lost, waiting: state.cards.filter((card) => card.topic === topic).length }))
    .sort((a, b) => b.lost - a.lost || b.waiting - a.waiting)
    .slice(0, limit);
}

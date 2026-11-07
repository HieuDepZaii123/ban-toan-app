/**
 * Ngân hàng luyện THPT lớp 10–12, độc lập với luyện nhanh lớp 1–9.
 * 15 mẫu mỗi lớp × 10 câu = 150 câu mỗi lớp, mỗi câu thuộc một chủ đề theo chương.
 */
import type { GradeQuestion } from "../grades/practiceBank.ts";
import { generatePractice, templateKeyOf, thptTopics } from "../grades/practiceGen.ts";

export const THPT_GRADES = [10, 11, 12] as const;

export type ThptQuestion = GradeQuestion & { topic: string };
export type ThptTopic = (typeof thptTopics)[number];

export { thptTopics };

function topicFor(grade: number, id: string): string {
  const key = templateKeyOf(id);
  const topic = thptTopics.find((item) => item.grade === grade && item.keys.includes(key));
  if (!topic) throw new Error(`câu ${id} chưa có chủ đề`);
  return topic.id;
}

export const thptBank: ThptQuestion[] = generatePractice([], THPT_GRADES).map((item) => ({ ...item, topic: topicFor(item.grade, item.id) }));

export const thptById = new Map(thptBank.map((item) => [item.id, item]));

export function topicById(id: string): ThptTopic | undefined {
  return thptTopics.find((item) => item.id === id);
}

/** Câu trong phạm vi: các lớp đã chọn, và các chủ đề đã chọn (rỗng là mọi chủ đề). */
export function inScope(grades: readonly number[], topics: readonly string[]): ThptQuestion[] {
  const topicSet = new Set(topics);
  return thptBank.filter((item) => grades.includes(item.grade) && (topicSet.size === 0 || topicSet.has(item.topic)));
}

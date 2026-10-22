import type { TopicMeta } from "./types.ts";
import { cards, QUESTION_TOTAL, streamName, streams } from "./cards.ts";
import { guides } from "./guides.ts";

export { QUESTION_TOTAL, streamName, streams };

export const topics: TopicMeta[] = cards.map((card) => {
  const guide = guides[card.id];
  if (!guide) throw new Error(card.id);
  return { ...card, ...guide };
});

export function topicById(id: string): TopicMeta | undefined {
  return topics.find((topic) => topic.id === id);
}

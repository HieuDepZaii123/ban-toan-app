import { demoReply } from "../../server/chat/policy.ts";

export function mockTutor(question: string, topicId?: string): string {
  return demoReply(question, topicId);
}

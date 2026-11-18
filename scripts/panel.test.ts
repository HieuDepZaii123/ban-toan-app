/**
 * Lịch sử điểm của bộ người đánh giá (reviews/): đúng định dạng, đúng vai, và điểm các vai trùng không tụt âm thầm.
 * Chạy: tsx scripts/panel.test.ts
 */
import { readFileSync } from "node:fs";
import { buildPrompt, ROLES } from "../reviews/roles.ts";

type Round = { id: string; note: string; regressionNote?: string; scores: Record<string, number> };
const rounds = JSON.parse(readFileSync(new URL("../reviews/history.json", import.meta.url), "utf8")) as Round[];

const fails: string[] = [];
const ids = new Set(ROLES.map((r) => r.id));
if (ids.size !== ROLES.length) fails.push("mã vai trùng nhau");
for (const role of ROLES) {
  const prompt = buildPrompt(role, "http://127.0.0.1:4173");
  if (!prompt.includes("SCORE: n") || !prompt.includes(role.focus)) fails.push(`lời nhắc của ${role.id} thiếu định dạng hoặc mối quan tâm`);
  if (role.focus.length < 40) fails.push(`${role.id}: mối quan tâm quá ngắn`);
}

const mean = (xs: number[]): number => xs.reduce((a, b) => a + b, 0) / Math.max(xs.length, 1);
const median = (xs: number[]): number => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? (s[m] ?? 0) : ((s[m - 1] ?? 0) + (s[m] ?? 0)) / 2;
};

rounds.forEach((round, i) => {
  if (!round.id || !round.note) fails.push(`vòng ${i + 1} thiếu id hoặc ghi chú`);
  for (const [role, score] of Object.entries(round.scores)) {
    if (!ids.has(role)) fails.push(`${round.id}: vai lạ ${role}`);
    if (!Number.isInteger(score) || score < 1 || score > 10) fails.push(`${round.id}: điểm ${role} = ${score} ngoài 1–10`);
  }
  const prev = rounds[i - 1];
  if (!prev) return;
  const shared = Object.keys(round.scores).filter((r) => r in prev.scores);
  if (shared.length < 5) return;
  const now = mean(shared.map((r) => round.scores[r] ?? 0));
  const before = mean(shared.map((r) => prev.scores[r] ?? 0));
  if (now < before - 0.3 && !round.regressionNote) fails.push(`${round.id}: điểm các vai trùng tụt ${(before - now).toFixed(2)} so với ${prev.id} mà không có regressionNote`);
});

if (fails.length) {
  console.error(fails.map((f) => `  - ${f}`).join("\n"));
  console.error(`panel: ${fails.length} lỗi`);
  process.exit(1);
}
const last = rounds[rounds.length - 1];
const all = Object.values(last?.scores ?? {});
console.log(`panel ok: ${ROLES.length} vai, ${rounds.length} vòng; vòng cuối trung bình ${mean(all).toFixed(2)}, trung vị ${median(all)}, thấp nhất ${Math.min(...all)}, cao nhất ${Math.max(...all)}`);

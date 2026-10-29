/** Titles the tutor may link. Kept in step with the fourteen desks. */
export const tutorTopics = [
  { id: "quadratic", title: "Hàm số bậc hai", keys: ["bậc hai", "parabol", "delta", "đỉnh"] },
  { id: "ineq", title: "Bất đẳng thức", keys: ["bất đẳng", "am-gm", "am–gm", "cauchy"] },
  { id: "exp", title: "Mũ và logarit", keys: ["logarit", "log ", "mũ", "lũy thừa"] },
  { id: "sequence", title: "Dãy số", keys: ["cấp số", "dãy số", "công sai", "công bội"] },
  { id: "trig", title: "Lượng giác", keys: ["lượng giác", "sin", "cos", "tan"] },
  { id: "limit", title: "Giới hạn", keys: ["giới hạn", "liên tục"] },
  { id: "derivative", title: "Đạo hàm", keys: ["đạo hàm", "tiếp tuyến", "cát tuyến"] },
  { id: "survey", title: "Khảo sát hàm số", keys: ["khảo sát", "tiệm cận", "cực trị"] },
  { id: "integral", title: "Tích phân", keys: ["tích phân", "nguyên hàm"] },
  { id: "vector", title: "Vectơ và ma trận", keys: ["vectơ", "vector", "ma trận", "định thức"] },
  { id: "analytic", title: "Hình giải tích", keys: ["đường thẳng", "mặt phẳng", "đường tròn", "pháp tuyến"] },
  { id: "triangle", title: "Hình phẳng và không gian", keys: ["tam giác", "thể tích", "chóp", "hộp"] },
  { id: "combo", title: "Tổ hợp và thống kê", keys: ["tổ hợp", "chỉnh hợp", "giai thừa", "trung vị", "trung bình"] },
  { id: "probability", title: "Xác suất", keys: ["xác suất", "bayes", "xúc xắc"] },
] as const;

export type TutorTopic = (typeof tutorTopics)[number];

export function matchTopic(text: string): TutorTopic | null {
  const hay = text.toLowerCase();
  let best: TutorTopic | null = null;
  let score = 0;
  for (const topic of tutorTopics) {
    const hits = topic.keys.reduce((sum, key) => sum + (hay.includes(key) ? key.length : 0), 0);
    if (hits > score) {
      best = topic;
      score = hits;
    }
  }
  return best;
}

export function topicMenu(): string {
  return tutorTopics.map((topic) => `- ${topic.title}: /t/${topic.id}`).join("\n");
}

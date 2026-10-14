export const SCENES = [
  { id: "morning", vi: "Sáng", en: "Morning" },
  { id: "noon", vi: "Trưa", en: "Noon" },
  { id: "afternoon", vi: "Chiều", en: "Afternoon" },
  { id: "evening", vi: "Đêm", en: "Night" },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];
export type SceneMode = "auto" | SceneId;

export const ZONES = [
  { id: "Asia/Ho_Chi_Minh", vi: "Hà Nội", en: "Hanoi" },
  { id: "Asia/Tokyo", vi: "Tokyo", en: "Tokyo" },
  { id: "Europe/London", vi: "London", en: "London" },
  { id: "America/New_York", vi: "New York", en: "New York" },
] as const;

/** Local hour bands: sáng 5–10, trưa 11–13, chiều 14–17, đêm otherwise. */
export function sceneFromHour(hour: number): SceneId {
  const h = ((Math.floor(hour) % 24) + 24) % 24;
  if (h >= 5 && h < 11) return "morning";
  if (h >= 11 && h < 14) return "noon";
  if (h >= 14 && h < 18) return "afternoon";
  return "evening";
}

export function isSceneMode(value: unknown): value is SceneMode {
  return value === "auto" || SCENES.some((scene) => scene.id === value);
}

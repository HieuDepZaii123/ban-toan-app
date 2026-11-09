const KEY = "ban-toan-grade-done";

export function readDone(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function markDone(grade: number, lessonId: string): string[] {
  const id = `${grade}/${lessonId}`;
  const next = Array.from(new Set([...readDone(), id]));
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* Storage full or blocked: the lesson still counts for this visit. */
  }
  window.dispatchEvent(new Event("grade-progress"));
  return next;
}

export function doneCount(grade: number, lessonIds: string[], done: string[]): number {
  return lessonIds.filter((id) => done.includes(`${grade}/${id}`)).length;
}

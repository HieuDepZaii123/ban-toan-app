/** Chỉ khóa này. Xóa bản soạn không đụng nhạc, luyện tập, hay dữ liệu khác. */
export const DOC_DRAFT_KEY = "ban-toan-soan-v1";

export type DraftStore = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

export function readDocDraft(store: DraftStore): string {
  try {
    const parsed: unknown = JSON.parse(store.getItem(DOC_DRAFT_KEY) || "null");
    if (!parsed || typeof parsed !== "object") return "";
    const text = (parsed as { text?: unknown }).text;
    return typeof text === "string" ? text : "";
  } catch {
    return "";
  }
}

export function writeDocDraft(text: string, store: DraftStore): boolean {
  try {
    store.setItem(DOC_DRAFT_KEY, JSON.stringify({ text }));
    return true;
  } catch {
    return false;
  }
}

export function clearDocDraft(store: DraftStore): void {
  try {
    store.removeItem(DOC_DRAFT_KEY);
  } catch {
    /* Khóa có thể đã trống. */
  }
}

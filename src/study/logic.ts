import { categoryById, trackIn, type StudyCategory, type StudyTrack } from "./catalog.ts";

export type RepeatMode = "off" | "all" | "one";

export type StudyPrefs = {
  categoryId: string;
  trackId: string;
  volume: number;
  shuffle: boolean;
  repeat: RepeatMode;
};

export const STUDY_PREFS_KEY = "bt-study-player";
export const STUDY_HIDDEN_KEY = "bt-study-hidden";

export type HiddenBook = { ids: string[]; undo: { categoryId: string; trackId: string } | null };

export function visibleTracks(category: StudyCategory, hidden: readonly string[]): StudyTrack[] {
  const blocked = new Set(hidden);
  return category.tracks.filter((track) => !blocked.has(track.id));
}

export function hideTrack(book: HiddenBook, categoryId: string, trackId: string): HiddenBook {
  if (book.ids.includes(trackId)) return { ...book, undo: { categoryId, trackId } };
  return { ids: [...book.ids, trackId], undo: { categoryId, trackId } };
}

export function undoHide(book: HiddenBook): HiddenBook {
  if (!book.undo) return book;
  return { ids: book.ids.filter((id) => id !== book.undo?.trackId), undo: null };
}

export function restoreCategory(book: HiddenBook, category: StudyCategory): HiddenBook {
  const own = new Set(category.tracks.map((track) => track.id));
  return {
    ids: book.ids.filter((id) => !own.has(id)),
    undo: book.undo && own.has(book.undo.trackId) ? null : book.undo,
  };
}

/** Bài đang phát bị xóa thì sang bài kế, hoặc bài trước nếu đó là bài cuối. Hết danh sách thì dừng. */
export function afterDelete(visibleIds: readonly string[], activeId: string, removedId: string): { nextId: string; stop: boolean } {
  if (activeId !== removedId) return { nextId: activeId, stop: false };
  const remain = visibleIds.filter((id) => id !== removedId);
  if (remain.length === 0) return { nextId: "", stop: true };
  const at = Math.max(0, visibleIds.indexOf(removedId));
  return { nextId: remain[Math.min(at, remain.length - 1)] ?? remain[0] ?? "", stop: false };
}

export function emptyHidden(): HiddenBook {
  return { ids: [], undo: null };
}

export function readHidden(): HiddenBook {
  try {
    const raw = localStorage.getItem(STUDY_HIDDEN_KEY);
    if (!raw) return emptyHidden();
    const data = JSON.parse(raw) as Partial<HiddenBook>;
    const ids = Array.isArray(data.ids) ? data.ids.filter((id): id is string => typeof id === "string") : [];
    const undo = data.undo && typeof data.undo.categoryId === "string" && typeof data.undo.trackId === "string"
      ? { categoryId: data.undo.categoryId, trackId: data.undo.trackId }
      : null;
    return { ids, undo };
  } catch {
    return emptyHidden();
  }
}

export function writeHidden(book: HiddenBook): void {
  try {
    localStorage.setItem(STUDY_HIDDEN_KEY, JSON.stringify(book));
  } catch {
    /* Bộ nhớ trình duyệt có thể bị chặn. */
  }
}

export function clampVolume(value: number): number {
  if (!Number.isFinite(value)) return 40;
  return Math.min(100, Math.max(0, Math.round(value)));
}

export function trackIndex(category: StudyCategory, trackId: string): number {
  const index = category.tracks.findIndex((track) => track.id === trackId);
  return index >= 0 ? index : 0;
}

/** Bước khi bài kết thúc. Lặp một bài thì giữ nguyên để phát lại. Hết danh sách mà không lặp thì dừng. */
export function stepIndex(length: number, index: number, delta: 1 | -1, repeat: RepeatMode): { index: number; stop: boolean } {
  if (length <= 0) return { index: 0, stop: true };
  if (repeat === "one") return { index, stop: false };
  const next = index + delta;
  if (next >= 0 && next < length) return { index: next, stop: false };
  if (repeat === "all" || delta < 0) {
    return { index: (next + length) % length, stop: false };
  }
  return { index, stop: true };
}

/** Nút trước/sau luôn đổi bài. Lặp một bài chỉ có tác dụng khi bài tự kết thúc. */
export function buttonIndex(length: number, index: number, delta: 1 | -1, repeat: RepeatMode): { index: number; stop: boolean } {
  return stepIndex(length, index, delta, repeat === "one" ? "off" : repeat);
}

export function shuffledIndex(length: number, index: number, rng: () => number): number {
  if (length <= 1) return 0;
  let pick = index;
  for (let guard = 0; guard < 8 && pick === index; guard += 1) {
    pick = Math.floor(rng() * length);
  }
  return pick === index ? (index + 1) % length : pick;
}

export type NextPick = { id: string; stop: boolean; restart: boolean };

/**
 * Chọn bài kế tiếp cho nút trước/sau (auto = false) hoặc khi bài tự kết thúc (auto = true).
 * restart = true khi bài được chọn trùng bài đang phát (danh sách một bài, lặp một bài),
 * vì đổi sang cùng một id sẽ không tải lại video.
 */
export function pickNext(
  ids: readonly string[],
  currentId: string,
  delta: 1 | -1,
  opts: { shuffle: boolean; repeat: RepeatMode; auto: boolean; rng?: () => number },
): NextPick {
  if (ids.length === 0) return { id: "", stop: true, restart: false };
  const found = ids.indexOf(currentId);
  const at = found >= 0 ? found : 0;
  if (opts.auto && opts.repeat === "one") return { id: ids[at] ?? "", stop: false, restart: true };
  let index: number;
  if (delta > 0 && opts.shuffle) {
    index = shuffledIndex(ids.length, at, opts.rng ?? Math.random);
  } else {
    const moved = opts.auto ? stepIndex(ids.length, at, delta, opts.repeat) : buttonIndex(ids.length, at, delta, opts.repeat);
    if (moved.stop) return { id: ids[at] ?? "", stop: true, restart: false };
    index = moved.index;
  }
  const id = ids[index] ?? ids[0] ?? "";
  return { id, stop: false, restart: found >= 0 && id === currentId };
}

export function nextRepeat(mode: RepeatMode): RepeatMode {
  if (mode === "off") return "all";
  if (mode === "all") return "one";
  return "off";
}

function defaultPrefs(): StudyPrefs {
  const category = categoryById("");
  return {
    categoryId: category.id,
    trackId: trackIn(category, "").id,
    volume: 40,
    shuffle: false,
    repeat: "off",
  };
}

export function readPrefs(): StudyPrefs {
  const fallback = defaultPrefs();
  try {
    const raw = localStorage.getItem(STUDY_PREFS_KEY);
    if (!raw) return fallback;
    const data = JSON.parse(raw) as Partial<StudyPrefs>;
    const category = categoryById(typeof data.categoryId === "string" ? data.categoryId : fallback.categoryId);
    const trackId = trackIn(category, typeof data.trackId === "string" ? data.trackId : "").id;
    const repeat = data.repeat === "all" || data.repeat === "one" || data.repeat === "off" ? data.repeat : "off";
    return {
      categoryId: category.id,
      trackId,
      volume: clampVolume(Number(data.volume)),
      shuffle: data.shuffle === true,
      repeat,
    };
  } catch {
    return fallback;
  }
}

export function writePrefs(prefs: StudyPrefs): void {
  try {
    localStorage.setItem(STUDY_PREFS_KEY, JSON.stringify(prefs));
  } catch {
    /* Bộ nhớ trình duyệt có thể bị chặn. Máy nghe vẫn chạy trong phiên này. */
  }
}

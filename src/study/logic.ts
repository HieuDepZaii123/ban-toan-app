import { categoryById, trackIn, type StudyCategory } from "./catalog.ts";

export type RepeatMode = "off" | "all" | "one";

export type StudyPrefs = {
  categoryId: string;
  trackId: string;
  volume: number;
  shuffle: boolean;
  repeat: RepeatMode;
};

export const STUDY_PREFS_KEY = "bt-study-player";

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

export type ThemeMode = "day" | "night" | "auto";

const KEY = "bt-theme";

export function readThemeMode(saved?: "paper" | "night"): ThemeMode {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === "day" || raw === "night" || raw === "auto") return raw;
  } catch {
    /* keep the saved desk theme */
  }
  return saved === "night" ? "night" : "day";
}

export function writeThemeMode(mode: ThemeMode): void {
  try {
    localStorage.setItem(KEY, mode);
  } catch {
    /* the choice still applies for this visit */
  }
}

/** Đêm ấm khi chọn đêm, hoặc tự động từ 21h đến trước 5h. */
export function effectiveTheme(mode: ThemeMode, hour = new Date().getHours()): "paper" | "night" {
  if (mode === "night") return "night";
  if (mode === "day") return "paper";
  const h = ((Math.floor(hour) % 24) + 24) % 24;
  return h >= 21 || h < 5 ? "night" : "paper";
}

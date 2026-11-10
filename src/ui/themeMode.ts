export type ThemeMode = "day" | "night" | "auto" | "system";

const KEY = "bt-theme";

function isMode(raw: string | null): raw is ThemeMode {
  return raw === "day" || raw === "night" || raw === "auto" || raw === "system";
}

/** Chế độ đã lưu. Chưa từng chọn: ai đang để đêm thì giữ đêm, còn lại đi theo giao diện của máy. */
export function readThemeMode(saved?: "paper" | "night"): ThemeMode {
  try {
    const raw = localStorage.getItem(KEY);
    if (isMode(raw)) return raw;
  } catch {
    /* keep the saved desk theme */
  }
  return saved === "night" ? "night" : "system";
}

export function hasThemeMode(): boolean {
  try {
    return isMode(localStorage.getItem(KEY));
  } catch {
    return false;
  }
}

export function writeThemeMode(mode: ThemeMode): void {
  try {
    localStorage.setItem(KEY, mode);
  } catch {
    /* the choice still applies for this visit */
  }
}

export function prefersDark(): boolean {
  try {
    return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

/** Đêm ấm khi chọn đêm, khi máy đang ở giao diện tối (chế độ theo máy), hoặc tự động từ 21h đến trước 5h. */
export function effectiveTheme(mode: ThemeMode, hour = new Date().getHours(), dark = prefersDark()): "paper" | "night" {
  if (mode === "night") return "night";
  if (mode === "day") return "paper";
  if (mode === "system") return dark ? "night" : "paper";
  const h = ((Math.floor(hour) % 24) + 24) % 24;
  return h >= 21 || h < 5 ? "night" : "paper";
}

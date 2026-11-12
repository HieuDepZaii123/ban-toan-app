/**
 * Sao lưu ẩn danh của trang Luyện chung lên máy chủ cơ sở dữ liệu (Supabase). Mặc định TẮT:
 * không có gì rời máy cho tới khi người học bật ở trang Dữ liệu. Thư viện Supabase chỉ tải khi đã bật.
 */
const KEY = "bt-drill-sync";

export function drillSyncOn(): boolean {
  try {
    return localStorage.getItem(KEY) === "on";
  } catch {
    return false;
  }
}

export function setDrillSync(on: boolean): void {
  try {
    if (on) localStorage.setItem(KEY, "on");
    else localStorage.removeItem(KEY);
  } catch {
    /* giữ tắt */
  }
}

export function mirrorDrill(picks: Record<string, number>, index: number): void {
  if (!drillSyncOn()) return;
  void import("./supabase.ts").then((mod) => mod.mirrorDrill(picks, index)).catch(() => undefined);
}

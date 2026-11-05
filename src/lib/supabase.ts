import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL || "https://npohzccvejgonxvoaibc.supabase.co";
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wb2h6Y2N2ZWpnb254dm9haWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4ODY0ODksImV4cCI6MjEwOTQ2MjQ4OX0.66JH_ZJJsg5ZXsUmzSp0ucHZ_XsIL4tpypjnE9s3vKE";

/** Client công khai. Chỉ khóa anon; khóa quản trị không được vào bundle này. */
export const supabase = createClient(url, anonKey);

const DEVICE = "ban-toan-device";

function deviceId(): string {
  try {
    const saved = localStorage.getItem(DEVICE);
    if (saved) return saved;
    const next = crypto.randomUUID();
    localStorage.setItem(DEVICE, next);
    return next;
  } catch {
    return "local";
  }
}

/** Ghi tiến độ luyện nếu bảng anon cho phép. Lỗi mạng không chặn bài. */
export function mirrorDrill(picks: Record<string, number>, index: number): void {
  void supabase.from("ban_toan_drill").upsert({
    device_id: deviceId(),
    picks,
    at: index,
    updated_at: new Date().toISOString(),
  }).then(() => undefined, () => undefined);
}

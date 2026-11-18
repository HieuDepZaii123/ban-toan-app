import type { SupabaseClient } from "@supabase/supabase-js";
import { deviceId } from "./device.ts";

const url = import.meta.env.VITE_SUPABASE_URL || "https://npohzccvejgonxvoaibc.supabase.co";
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wb2h6Y2N2ZWpnb254dm9haWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4ODY0ODksImV4cCI6MjEwOTQ2MjQ4OX0.66JH_ZJJsg5ZXsUmzSp0ucHZ_XsIL4tpypjnE9s3vKE";

/**
 * Client công khai, chỉ khóa anon; khóa quản trị không được vào bundle này.
 * SDK (~210 KB) chỉ tải ở lần ghi đầu tiên, nên mở trang Đề luyện không phải chờ nó.
 */
let client: Promise<SupabaseClient> | null = null;
function supabase(): Promise<SupabaseClient> {
  client ??= import("@supabase/supabase-js").then(({ createClient }) => createClient(url, anonKey));
  return client;
}

/** Ghi tiến độ luyện nếu bảng anon cho phép. Lỗi mạng hay lỗi tải SDK không chặn bài. */
export function mirrorDrill(picks: Record<string, number>, index: number): void {
  supabase()
    .then((db) => db.from("ban_toan_drill").upsert({
      device_id: deviceId() || "local",
      picks,
      at: index,
      updated_at: new Date().toISOString(),
    }))
    .then(() => undefined, () => undefined);
}

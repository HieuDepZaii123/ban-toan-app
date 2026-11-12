/**
 * Phiếu kết quả của một hồ sơ: người học tự tạo và tự gửi cho phụ huynh hoặc thầy cô (dán vào Zalo, email…).
 * Không có máy chủ ở giữa. Mã là JSON gọn mã hóa base64url, bắt đầu bằng "BT1.".
 */
export type Report = {
  /** Tên hoặc biệt danh của hồ sơ; có thể rỗng. */
  name: string;
  /** Lớp đã chọn ("1"–"12", "adult" hoặc ""). */
  grade: string;
  /** Ngày tạo phiếu, "YYYY-MM-DD". */
  made: string;
  /** Bảy ngày gần nhất, cũ trước mới sau. */
  days: { day: string; minutes: number }[];
  streak: number;
  /** Lớp → số bài học đã xong. */
  lessons: Record<string, number>;
  /** Mã chuyên đề → số câu đã làm đúng. */
  topics: Record<string, number>;
  /** Các đề thi thử gần nhất: thời điểm và điểm trên thang 10. */
  exams: { at: number; total: number }[];
  /** Số câu còn nằm trong Sổ lỗi. */
  misses: number;
};

const PREFIX = "BT1.";

function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(code: string): string {
  const padded = code.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (code.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return new TextDecoder().decode(bytes);
}

export function encodeReport(report: Report): string {
  return PREFIX + toBase64Url(JSON.stringify(report));
}

function count(value: unknown, max: number): number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? Math.min(Math.round(value), max) : 0;
}

function countMap(value: unknown, keyRule: RegExp, max: number): Record<string, number> {
  const out: Record<string, number> = {};
  if (!value || typeof value !== "object" || Array.isArray(value)) return out;
  for (const [key, item] of Object.entries(value).slice(0, 40)) {
    if (keyRule.test(key)) out[key] = count(item, max);
  }
  return out;
}

/** Đọc một mã phiếu. Mã lạ, hỏng hoặc quá dài đều bị từ chối; mọi trường được kiểm lại từng cái. */
export function decodeReport(raw: string): Report | null {
  const code = raw.trim();
  if (!code.startsWith(PREFIX) || code.length > 6000) return null;
  try {
    const parsed: unknown = JSON.parse(fromBase64Url(code.slice(PREFIX.length)));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const row = parsed as Record<string, unknown>;
    if (typeof row.made !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(row.made)) return null;
    const days = Array.isArray(row.days)
      ? row.days.slice(0, 7).flatMap((item) => {
          if (!item || typeof item !== "object") return [];
          const day = (item as { day?: unknown }).day;
          if (typeof day !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(day)) return [];
          return [{ day, minutes: count((item as { minutes?: unknown }).minutes, 1440) }];
        })
      : [];
    const exams = Array.isArray(row.exams)
      ? row.exams.slice(0, 5).flatMap((item) => {
          if (!item || typeof item !== "object") return [];
          const at = (item as { at?: unknown }).at;
          const total = (item as { total?: unknown }).total;
          if (typeof at !== "number" || typeof total !== "number" || !Number.isFinite(at) || !Number.isFinite(total)) return [];
          return [{ at, total: Math.max(0, Math.min(10, Math.round(total * 100) / 100)) }];
        })
      : [];
    return {
      name: typeof row.name === "string" ? row.name.slice(0, 24) : "",
      grade: typeof row.grade === "string" && /^(\d{1,2}|adult)?$/.test(row.grade) ? row.grade : "",
      made: row.made,
      days,
      streak: count(row.streak, 366),
      lessons: countMap(row.lessons, /^\d{1,2}$/, 200),
      topics: countMap(row.topics, /^[a-z]{2,16}$/, 200),
      exams,
      misses: count(row.misses, 9999),
    };
  } catch {
    return null;
  }
}

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

export function weekMinutes(report: Report): number {
  return sum(report.days.map((item) => item.minutes));
}

/** Bảng CSV cho thầy cô hoặc phụ huynh mở bằng bảng tính. Có BOM để Excel đọc đúng tiếng Việt. */
export function reportCsv(rows: Report[]): string {
  const cell = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
  const head = ["Tên", "Lớp", "Ngày lập phiếu", "Phút học 7 ngày", "Chuỗi ngày học", "Bài học đã xong", "Câu chuyên đề đã đúng", "Điểm đề thi thử gần nhất", "Câu trong Sổ lỗi"];
  const lines = rows.map((row) => [
    row.name || "(chưa đặt tên)",
    row.grade === "adult" ? "người lớn" : row.grade,
    row.made,
    weekMinutes(row),
    row.streak,
    sum(Object.values(row.lessons)),
    sum(Object.values(row.topics)),
    row.exams[0] ? String(row.exams[0].total).replace(".", ",") : "",
    row.misses,
  ].map(cell).join(","));
  return `﻿${[head.map(cell).join(","), ...lines].join("\r\n")}\r\n`;
}

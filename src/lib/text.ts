import type { Lang } from "./math.ts";

export function t(lang: Lang, vi: string, en: string): string {
  return lang === "en" ? en : vi;
}

/** Search ignores diacritics, so "dao ham" finds "Đạo hàm". */
export function fold(input: string): string {
  return input
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

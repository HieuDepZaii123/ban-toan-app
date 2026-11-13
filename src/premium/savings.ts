/** Tiết kiệm của gói năm so với 12 lần mua tháng, tính từ giá đã cấu hình. */
export function yearSavings(monthAmount: number, yearAmount: number): { saved: number; percent: number } | null {
  if (!Number.isInteger(monthAmount) || !Number.isInteger(yearAmount)) return null;
  if (monthAmount < 1000 || yearAmount < 1000) return null;
  const full = monthAmount * 12;
  const saved = full - yearAmount;
  if (saved <= 0) return null;
  return { saved, percent: Math.round((saved / full) * 100) };
}

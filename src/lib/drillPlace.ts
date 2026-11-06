/** Chỗ đang làm của đề luyện. Id câu thắng chỉ số cũ khi ngân hàng dài thêm. */

export const DRILL_AT = "ban-toan-drill-at";
export const DRILL_ID = "ban-toan-drill-id";

export function resolveDrillIndex(ids: readonly string[], savedIndex: unknown, savedId: unknown): number {
  if (typeof savedId === "string") {
    const at = ids.indexOf(savedId);
    if (at >= 0) return at;
  }
  const index = typeof savedIndex === "number" ? savedIndex : Number(savedIndex);
  if (Number.isInteger(index) && index >= 0 && index < ids.length) return index;
  return 0;
}

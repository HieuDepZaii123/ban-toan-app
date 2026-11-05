export type SegRef = { a: number; b: number };

/** Xóa một điểm và mọi đoạn dính vào điểm đó. Chỉ số còn lại được dồn. */
export function withoutPoint(segs: readonly SegRef[], index: number): SegRef[] {
  return segs.flatMap((seg) => {
    if (seg.a === index || seg.b === index) return [];
    return [{
      a: seg.a > index ? seg.a - 1 : seg.a,
      b: seg.b > index ? seg.b - 1 : seg.b,
    }];
  });
}

export function withoutSeg(segs: readonly SegRef[], index: number): SegRef[] {
  return segs.filter((_, place) => place !== index);
}

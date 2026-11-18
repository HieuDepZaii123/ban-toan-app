import { deepen } from "./depth.ts";
import type { GradeBook } from "./types.ts";

/**
 * Sách của một lớp, tải khi cần. index.ts giữ bản gom đủ mười hai lớp cho test;
 * trang một lớp chỉ tải đúng lớp đó thay vì cả mười hai sách (~230 KB).
 */
const loaders: Record<number, () => Promise<GradeBook>> = {
  1: () => import("./lop01.ts").then((mod) => mod.lop01),
  2: () => import("./lop02.ts").then((mod) => mod.lop02),
  3: () => import("./lop03.ts").then((mod) => mod.lop03),
  4: () => import("./lop04.ts").then((mod) => mod.lop04),
  5: () => import("./lop05.ts").then((mod) => mod.lop05),
  6: () => import("./lop06.ts").then((mod) => mod.lop06),
  7: () => import("./lop07.ts").then((mod) => mod.lop07),
  8: () => import("./lop08.ts").then((mod) => mod.lop08),
  9: () => import("./lop09.ts").then((mod) => mod.lop09),
  10: () => import("./lop10.ts").then((mod) => mod.lop10),
  11: () => import("./lop11.ts").then((mod) => mod.lop11),
  12: () => import("./lop12.ts").then((mod) => mod.lop12),
};

export const GRADES: readonly number[] = Object.keys(loaders).map(Number);

export function hasGrade(grade: number): boolean {
  return Object.prototype.hasOwnProperty.call(loaders, grade);
}

/** One promise per grade, so `deepen` runs once and every caller gets the same book object. */
const cache = new Map<number, Promise<GradeBook>>();

export function loadGradeBook(grade: number): Promise<GradeBook | null> {
  if (!hasGrade(grade)) return Promise.resolve(null);
  let book = cache.get(grade);
  if (!book) {
    book = loaders[grade]!().then(deepen);
    book.catch(() => cache.delete(grade)); // a failed chunk load can be retried on the next visit
    cache.set(grade, book);
  }
  return book;
}

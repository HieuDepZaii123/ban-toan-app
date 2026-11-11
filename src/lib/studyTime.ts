/**
 * Thời gian học theo ngày, tính trên máy này: mỗi 15 giây trang đang mở và người học vừa thao tác
 * thì cộng 15 giây vào ngày hôm nay. Dùng cho báo cáo tuần, chuỗi ngày học, nhắc nghỉ và giới hạn của phụ huynh.
 */
const KEY = "bt-time";
const KEEP_DAYS = 60;

/** "YYYY-MM-DD" theo giờ của máy → số giây đã học trong ngày đó. */
export type TimeBook = Record<string, number>;

export function dayKey(date: Date = new Date()): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function back(now: Date, days: number): Date {
  const out = new Date(now);
  out.setDate(out.getDate() - days);
  return out;
}

export function parseTime(raw: string | null): TimeBook {
  try {
    const parsed: unknown = JSON.parse(raw || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const out: TimeBook = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(key) && typeof value === "number" && Number.isFinite(value) && value > 0) out[key] = Math.min(Math.round(value), 86_400);
    }
    return out;
  } catch {
    return {};
  }
}

export function readTime(): TimeBook {
  try {
    return parseTime(localStorage.getItem(KEY));
  } catch {
    return {};
  }
}

/** Cộng thời gian vào hôm nay và bỏ các ngày cũ hơn 60 ngày. */
export function addTime(seconds: number, now: Date = new Date()): TimeBook {
  const book = readTime();
  const today = dayKey(now);
  book[today] = Math.min((book[today] ?? 0) + seconds, 86_400);
  const oldest = dayKey(back(now, KEEP_DAYS));
  for (const key of Object.keys(book)) if (key < oldest) delete book[key];
  try {
    localStorage.setItem(KEY, JSON.stringify(book));
  } catch {
    /* không lưu được thì chỉ mất số liệu của lần này */
  }
  return book;
}

export function todaySeconds(book: TimeBook = readTime(), now: Date = new Date()): number {
  return book[dayKey(now)] ?? 0;
}

/** `count` ngày gần nhất, cũ trước mới sau, ngày không học là 0. */
export function lastDays(count: number, book: TimeBook = readTime(), now: Date = new Date()): { day: string; seconds: number }[] {
  const out: { day: string; seconds: number }[] = [];
  for (let offset = count - 1; offset >= 0; offset -= 1) {
    const day = dayKey(back(now, offset));
    out.push({ day, seconds: book[day] ?? 0 });
  }
  return out;
}

/** Số ngày liên tiếp có học ít nhất một phút, tính tới hôm nay (hoặc tới hôm qua nếu hôm nay chưa học). */
export function streak(book: TimeBook = readTime(), now: Date = new Date()): number {
  const studied = (offset: number) => (book[dayKey(back(now, offset))] ?? 0) >= 60;
  let offset = studied(0) ? 0 : 1;
  let count = 0;
  while (offset <= KEEP_DAYS && studied(offset)) {
    count += 1;
    offset += 1;
  }
  return count;
}

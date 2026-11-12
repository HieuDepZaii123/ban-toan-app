import { flushSave, load, resetStore } from "./store.ts";

/**
 * Dữ liệu của người học trên máy này: sao lưu ra tệp, khôi phục, xóa, và nhiều hồ sơ trên một máy dùng chung.
 * Bàn Toán không có tài khoản, nên mọi thứ ở đây chỉ đọc và ghi localStorage của trình duyệt.
 */

/** Việc học của một người: tiến độ, sổ lỗi, đề đang làm, ghi chú, bản soạn, lớp đã chọn, thời gian học. */
const LEARNING_KEYS = [
  "ban-toan",
  "ban-toan-grade-done",
  "ban-toan-lop-practice-v1",
  "ban-toan-thpt-v1",
  "ban-toan-thi2025-v1",
  "ban-toan-misses",
  "ban-toan-shared-drill",
  "ban-toan-drill-at",
  "ban-toan-geo-quiz",
  "ban-toan-soan-v1",
  "bt-notes-pad",
  "bt-curve",
  "bt-grade",
  "bt-time",
] as const;

/** Đi theo từng hồ sơ trên cùng một máy, nhưng không nằm trong tệp sao lưu. */
const PROFILE_KEYS = [...LEARNING_KEYS, "ban-toan-chat", "bt-chat-ok"] as const;

const MAIN = "ban-toan";
const BOOK = "bt-profiles";
const SLOT = "bt-profile:";
const KIND = "ban-toan-backup";
const MAX_VALUE = 2_000_000;

export type Backup = { kind: typeof KIND; version: 1; savedAt: string; name: string; data: Record<string, string> };
export type Profile = { id: string; name: string };
export type ProfileBook = { active: string; list: Profile[] };

function snapshot(keys: readonly string[]): Record<string, string> {
  flushSave();
  const out: Record<string, string> = {};
  for (const key of keys) {
    const value = localStorage.getItem(key);
    if (value !== null) out[key] = value;
  }
  return out;
}

/** Ghi đúng các khóa đã cho: khóa nào không có trong `data` thì xóa. Kho tiến độ trong bộ nhớ được nạp lại theo. */
function restore(keys: readonly string[], data: Record<string, string>): void {
  flushSave();
  for (const key of keys) {
    const value = data[key];
    if (typeof value === "string") localStorage.setItem(key, key === MAIN ? JSON.stringify(load(value)) : value);
    else localStorage.removeItem(key);
  }
  resetStore(load(localStorage.getItem(MAIN)));
}

export function makeBackup(name: string): Backup {
  return { kind: KIND, version: 1, savedAt: new Date().toISOString(), name, data: snapshot(LEARNING_KEYS) };
}

/** Đọc một tệp sao lưu. Chỉ nhận đúng định dạng của Bàn Toán và chỉ giữ các khóa đã biết. */
export function readBackup(text: string): Backup | null {
  try {
    const raw: unknown = JSON.parse(text);
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
    const file = raw as Record<string, unknown>;
    if (file.kind !== KIND || file.version !== 1 || !file.data || typeof file.data !== "object" || Array.isArray(file.data)) return null;
    const data: Record<string, string> = {};
    for (const key of LEARNING_KEYS) {
      const value = (file.data as Record<string, unknown>)[key];
      if (typeof value === "string" && value.length <= MAX_VALUE) data[key] = value;
    }
    if (Object.keys(data).length === 0) return null;
    return {
      kind: KIND,
      version: 1,
      savedAt: typeof file.savedAt === "string" ? file.savedAt.slice(0, 40) : "",
      name: typeof file.name === "string" ? file.name.slice(0, 40) : "",
      data,
    };
  } catch {
    return null;
  }
}

/** Thay việc học của hồ sơ đang mở bằng nội dung tệp sao lưu. Gọi xong thì tải lại trang. */
export function applyBackup(backup: Backup): void {
  restore(LEARNING_KEYS, backup.data);
}

export function clearChat(): void {
  localStorage.removeItem("ban-toan-chat");
  sessionStorage.removeItem("ban-toan-chat");
  sessionStorage.removeItem("ban-toan-chat-session");
}

/** Xóa mọi thứ Bàn Toán đã lưu trên trình duyệt này (mọi hồ sơ). Có thể giữ lại mã Premium. */
export function wipeDevice(keepLicense: boolean): void {
  flushSave();
  const keep = keepLicense ? new Set(["ban-toan-license", "ban-toan-premium-cache"]) : new Set<string>();
  for (const store of [localStorage, sessionStorage]) {
    const names: string[] = [];
    for (let index = 0; index < store.length; index += 1) {
      const name = store.key(index);
      if (name && (name.startsWith("ban-toan") || name.startsWith("bt-")) && !keep.has(name)) names.push(name);
    }
    for (const name of names) store.removeItem(name);
  }
  resetStore(load(null));
}

function newId(): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return `p${[...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}

export function readProfiles(): ProfileBook {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(BOOK) || "null");
    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
      const book = raw as { active?: unknown; list?: unknown };
      const list = Array.isArray(book.list)
        ? book.list.flatMap((item) => {
            if (!item || typeof item !== "object") return [];
            const row = item as { id?: unknown; name?: unknown };
            if (typeof row.id !== "string" || !/^p[0-9a-f]{12}$/.test(row.id)) return [];
            return [{ id: row.id, name: typeof row.name === "string" ? row.name.slice(0, 24) : "" }];
          })
        : [];
      const active = typeof book.active === "string" && list.some((item) => item.id === book.active) ? book.active : list[0]?.id;
      if (active) return { active, list };
    }
  } catch {
    /* sổ hồ sơ hỏng: coi như chỉ có một hồ sơ */
  }
  const id = newId();
  return { active: id, list: [{ id, name: "" }] };
}

function writeProfiles(book: ProfileBook): void {
  localStorage.setItem(BOOK, JSON.stringify(book));
}

/** Cất việc học của hồ sơ đang mở vào ngăn riêng, rồi mở hồ sơ kia. Gọi xong thì tải lại trang. */
export function switchProfile(id: string): void {
  const book = readProfiles();
  if (id === book.active || !book.list.some((item) => item.id === id)) return;
  localStorage.setItem(SLOT + book.active, JSON.stringify(snapshot(PROFILE_KEYS)));
  let next: Record<string, string> = {};
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(SLOT + id) || "{}");
    if (raw && typeof raw === "object" && !Array.isArray(raw)) {
      for (const key of PROFILE_KEYS) {
        const value = (raw as Record<string, unknown>)[key];
        if (typeof value === "string") next[key] = value;
      }
    }
  } catch {
    next = {};
  }
  restore(PROFILE_KEYS, next);
  localStorage.removeItem(SLOT + id);
  sessionStorage.removeItem("ban-toan-chat");
  sessionStorage.removeItem("ban-toan-chat-session");
  writeProfiles({ ...book, active: id });
}

/** Thêm một hồ sơ trống và mở nó. Hồ sơ đang mở được cất lại nguyên vẹn. */
export function addProfile(name: string): void {
  const book = readProfiles();
  const id = newId();
  writeProfiles({ active: book.active, list: [...book.list, { id, name: name.trim().slice(0, 24) }] });
  switchProfile(id);
}

export function renameProfile(id: string, name: string): void {
  const book = readProfiles();
  writeProfiles({ ...book, list: book.list.map((item) => (item.id === id ? { ...item, name: name.trim().slice(0, 24) } : item)) });
}

/** Xóa một hồ sơ không đang mở, cùng toàn bộ việc học đã cất của nó. */
export function removeProfile(id: string): void {
  const book = readProfiles();
  if (id === book.active) return;
  localStorage.removeItem(SLOT + id);
  writeProfiles({ ...book, list: book.list.filter((item) => item.id !== id) });
}

/** Tên hồ sơ đang mở, hoặc "" khi máy chỉ có một hồ sơ chưa đặt tên. */
export function activeProfileName(): string {
  try {
    if (localStorage.getItem(BOOK) === null) return "";
    const book = readProfiles();
    return book.list.find((item) => item.id === book.active)?.name ?? "";
  } catch {
    return "";
  }
}

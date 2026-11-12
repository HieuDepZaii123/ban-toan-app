/** Sự kiện cửa sổ giữa các phần chung của trang. */

/** Mở Mục lục bên phải (nút Mục lục phát, RightMenu nghe). */
export const OPEN_MENU_EVENT = "bt-open-menu";

/** Mở danh sách nhạc học (Mục lục và Tùy chọn phát, StudyPlayer nghe). */
export const OPEN_MUSIC_EVENT = "bt-open-music";

/** Mở trợ lý toán (nút Hỏi toán ở đầu trang, thanh đáy và trong bài luyện phát, ChatEntry nghe). */
export const OPEN_CHAT_EVENT = "bt-open-chat";

export function openMenu(): void {
  window.dispatchEvent(new Event(OPEN_MENU_EVENT));
}

export function openMusic(): void {
  window.dispatchEvent(new Event(OPEN_MUSIC_EVENT));
}

export function openChat(): void {
  window.dispatchEvent(new Event(OPEN_CHAT_EVENT));
}

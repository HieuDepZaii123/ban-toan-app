import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { readParent } from "../lib/parent.ts";
import { t } from "../lib/text.ts";
import { OPEN_CHAT_EVENT } from "../ui/events.ts";
import { useLang } from "../ui/useLang.ts";

const ChatPanel = lazy(() => import("./ChatPanel.tsx").then((mod) => ({ default: mod.ChatPanel })));

/**
 * Trợ lý không còn nút nổi che nội dung: nó mở từ nút Hỏi toán ở đầu trang, ở thanh đáy trên điện thoại,
 * hoặc ngay trong bài luyện. Đóng thì tiêu điểm quay về nút đã mở.
 */
export function ChatEntry() {
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const show = () => {
      opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setOpen(true);
    };
    window.addEventListener(OPEN_CHAT_EVENT, show);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, show);
  }, []);

  if (!open) return null;
  const close = () => {
    setOpen(false);
    opener.current?.focus();
  };
  if (readParent().tutorOff) {
    return (
      <section className="chat-panel" role="dialog" aria-label={t(lang, "Trợ lý toán", "Math tutor")}>
        <header className="chat-head">
          <b>{t(lang, "Hỏi toán", "Ask maths")}</b>
          <button type="button" className="text-btn" autoFocus onClick={close}>{t(lang, "Đóng", "Close")}</button>
        </header>
        <p className="chat-note">{t(lang, "Trợ lý AI đã được phụ huynh tắt trên máy này, nên không câu hỏi nào được gửi đi. Bài học, gợi ý và lời giải vẫn dùng được.", "A parent has turned the AI tutor off on this device, so no question is sent anywhere. Lessons, hints and solutions still work.")}</p>
      </section>
    );
  }
  return (
    <Suspense fallback={<p className="chat-typing chat-panel">{t(lang, "Đang mở trợ lý…", "Opening the tutor…")}</p>}>
      <ChatPanel onClose={close} />
    </Suspense>
  );
}

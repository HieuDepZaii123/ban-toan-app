import { lazy, Suspense, useEffect, useRef, useState } from "react";
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
  return (
    <Suspense fallback={<p className="chat-typing chat-panel">{t(lang, "Đang mở trợ lý…", "Opening the tutor…")}</p>}>
      <ChatPanel
        onClose={() => {
          setOpen(false);
          opener.current?.focus();
        }}
      />
    </Suspense>
  );
}

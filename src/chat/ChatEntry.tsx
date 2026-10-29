import { lazy, Suspense, useState } from "react";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";

const ChatPanel = lazy(() => import("./ChatPanel.tsx").then((mod) => ({ default: mod.ChatPanel })));

export function ChatEntry() {
  const lang = useLang();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="chat-fab"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {t(lang, "Hỏi toán", "Ask math")}
      </button>
      {open ? (
        <Suspense fallback={<p className="chat-typing chat-panel">{t(lang, "Đang mở trợ lý…", "Opening the tutor…")}</p>}>
          <ChatPanel onClose={() => setOpen(false)} />
        </Suspense>
      ) : null}
    </>
  );
}

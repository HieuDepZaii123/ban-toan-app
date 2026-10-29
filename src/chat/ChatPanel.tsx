import { useEffect, useRef, useState } from "react";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";
import { ChatText } from "./ChatText.tsx";

type Turn = { role: "user" | "assistant"; content: string };
type ChatState = {
  reply?: string;
  mode?: "live" | "demo";
  remaining?: number;
  limit?: number;
  premium?: boolean;
  error?: string;
  message?: string;
};

const HISTORY = "ban-toan-chat";
const SESSION = "ban-toan-chat-session";
const LICENSE = "ban-toan-license";

function sessionId(): string {
  const saved = sessionStorage.getItem(SESSION);
  if (saved) return saved;
  const next = crypto.randomUUID();
  sessionStorage.setItem(SESSION, next);
  return next;
}

function loadHistory(): Turn[] {
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(HISTORY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const row = item as { role?: string; content?: string };
      if ((row.role !== "user" && row.role !== "assistant") || typeof row.content !== "string") return [];
      const role: Turn["role"] = row.role === "assistant" ? "assistant" : "user";
      return [{ role, content: row.content }];
    }).slice(-8);
  } catch {
    return [];
  }
}

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const lang = useLang();
  const [turns, setTurns] = useState<Turn[]>(loadHistory);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [meta, setMeta] = useState<ChatState>({});
  const box = useRef<HTMLTextAreaElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    box.current?.focus();
  }, []);

  useEffect(() => {
    sessionStorage.setItem(HISTORY, JSON.stringify(turns));
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [turns, busy]);

  async function send(): Promise<void> {
    const content = draft.trim();
    if (!content || busy) return;
    const next = [...turns, { role: "user" as const, content }].slice(-8);
    setTurns(next);
    setDraft("");
    setBusy(true);
    setNote("");
    try {
      const license = localStorage.getItem(LICENSE) ?? "";
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json", "x-ban-toan-session": sessionId() },
        body: JSON.stringify({ messages: next, license }),
      });
      const body = await res.json() as ChatState;
      setMeta(body);
      if (body.reply) {
        const answer: Turn = { role: "assistant", content: body.reply };
        setTurns((current) => [...current, answer].slice(-8));
      }
      else setNote(body.message || t(lang, "Trợ lý chưa trả lời được.", "The tutor did not answer."));
    } catch {
      setNote(t(lang, "Không nối được trợ lý. Thử lại.", "The tutor did not connect. Try again."));
    } finally {
      setBusy(false);
    }
  }

  const quota = typeof meta.remaining === "number" && typeof meta.limit === "number"
    ? t(
      lang,
      meta.premium ? `Premium: còn ${meta.remaining}/${meta.limit} tin hôm nay.` : `Miễn phí: còn ${meta.remaining}/${meta.limit} tin hôm nay.`,
      meta.premium ? `Premium: ${meta.remaining}/${meta.limit} messages left today.` : `Free: ${meta.remaining}/${meta.limit} messages left today.`,
    )
    : t(lang, "Miễn phí 8 tin mỗi ngày. Premium được 40.", "8 free messages a day. Premium gets 40.");

  return (
    <section className="chat-panel" aria-label={t(lang, "Trợ lý toán", "Math tutor")}>
      <header className="chat-head">
        <b>{t(lang, "Trợ lý toán", "Math tutor")}</b>
        <button type="button" className="text-btn" onClick={onClose}>{t(lang, "Đóng", "Close")}</button>
      </header>
      <p className="chat-quota">
        {quota}{" "}
        {meta.premium ? null : <A href="/nang-cap">{t(lang, "Nâng cấp", "Upgrade")}</A>}
        {meta.mode === "demo" ? <span> {t(lang, "Đang ở chế độ mẫu.", "Demo mode.")}</span> : null}
      </p>
      <div className="chat-log" ref={scroller} aria-live="polite">
        {turns.length === 0 ? (
          <p className="chat-note">{t(lang, "Hỏi một khái niệm hoặc một bài. Mình gợi ý từng bước, không chốt hộ đáp án.", "Ask a concept or a problem. I suggest steps and do not finish the answer for you.")}</p>
        ) : null}
        {turns.map((turn, index) => (
          <article key={`${turn.role}-${index}`} className={`chat-turn is-${turn.role}`}>
            <b>{turn.role === "user" ? t(lang, "Bạn", "You") : t(lang, "Trợ lý", "Tutor")}</b>
            <ChatText text={turn.content} />
          </article>
        ))}
        {busy ? <p className="chat-typing">{t(lang, "Đang soạn…", "Typing…")}</p> : null}
        {note ? <p className="chat-note" role="status">{note}</p> : null}
      </div>
      <form
        className="chat-form"
        onSubmit={(event) => {
          event.preventDefault();
          void send();
        }}
      >
        <label className="sr" htmlFor="chat-q">{t(lang, "Câu hỏi toán", "Math question")}</label>
        <textarea
          id="chat-q"
          ref={box}
          rows={2}
          value={draft}
          maxLength={1500}
          placeholder={t(lang, "Ví dụ: đỉnh của parabol…", "For example: the vertex of a parabola…")}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void send();
            }
          }}
        />
        <button className="pay-btn" type="submit" disabled={busy || draft.trim() === ""}>
          {t(lang, "Gửi", "Send")}
        </button>
      </form>
    </section>
  );
}

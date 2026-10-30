import { useEffect, useRef, useState } from "react";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/useLang.ts";
import { ChatText } from "./ChatText.tsx";
import { mockTutor } from "./mock.ts";

type Turn = { role: "user" | "assistant"; content: string };
type ChatState = {
  reply?: string;
  text?: string;
  message?: string;
  mode?: "live" | "demo";
  remaining?: number;
  limit?: number;
  premium?: boolean;
  error?: string;
};

const HISTORY = "ban-toan-chat";
const SESSION = "ban-toan-chat-session";
const LICENSE = "ban-toan-license";
const URL_KEY = "bt-ask-url";
const MOCK_KEY = "bt-ask-mock";
const LOCAL_LIMIT = 8;

const QUICK = ["Đạo hàm là gì?", "Gợi ý phương trình bậc hai", "Giới hạn dạng 0/0"];

function sessionId(): string {
  const saved = sessionStorage.getItem(SESSION);
  if (saved) return saved;
  const next = crypto.randomUUID();
  sessionStorage.setItem(SESSION, next);
  return next;
}

function dayKey(): string {
  const now = new Date();
  return `bt-ask-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

function usedToday(): number {
  try { return Number(localStorage.getItem(dayKey())) || 0; } catch { return 0; }
}

function bumpToday(): void {
  try { localStorage.setItem(dayKey(), String(usedToday() + 1)); } catch { /* ignore */ }
}

function loadHistory(): Turn[] {
  try {
    const raw = localStorage.getItem(HISTORY) || sessionStorage.getItem(HISTORY) || "[]";
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const row = item as { role?: string; content?: string };
      if ((row.role !== "user" && row.role !== "assistant") || typeof row.content !== "string") return [];
      const role: Turn["role"] = row.role === "assistant" ? "assistant" : "user";
      return [{ role, content: row.content }];
    }).slice(-12);
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
  const [url, setUrl] = useState(() => {
    try { return localStorage.getItem(URL_KEY) || ""; } catch { return ""; }
  });
  const [mock, setMock] = useState(() => {
    try { return localStorage.getItem(MOCK_KEY) === "1"; } catch { return false; }
  });
  const [localLeft, setLocalLeft] = useState(() => Math.max(0, LOCAL_LIMIT - usedToday()));
  const box = useRef<HTMLTextAreaElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    box.current?.focus();
  }, []);

  useEffect(() => {
    try { localStorage.setItem(HISTORY, JSON.stringify(turns)); } catch { /* ignore */ }
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [turns, busy]);

  async function send(text?: string): Promise<void> {
    const content = (text ?? draft).trim();
    if (!content || busy) return;
    const localMode = mock || url.trim() !== "";
    if (localMode && usedToday() >= LOCAL_LIMIT) {
      setNote(t(lang, `Hết ${LOCAL_LIMIT} tin mẫu hôm nay. Mai tiếp, hoặc bỏ chế độ mẫu để dùng máy chủ.`, `The ${LOCAL_LIMIT} sample messages for today are used.`));
      return;
    }
    const next = [...turns, { role: "user" as const, content }].slice(-12);
    setTurns(next);
    setDraft("");
    setBusy(true);
    setNote("");
    try {
      let reply = "";
      if (mock) {
        bumpToday();
        reply = mockTutor(content);
        setMeta({ mode: "demo" });
      } else if (url.trim()) {
        bumpToday();
        const res = await fetch(url.trim(), {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: next }),
        });
        const body = await res.json() as ChatState;
        reply = body.reply || body.text || body.message || "";
        setMeta({ mode: "live" });
      } else {
        const license = localStorage.getItem(LICENSE) ?? "";
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json", "x-ban-toan-session": sessionId() },
          body: JSON.stringify({ messages: next, license }),
        });
        const body = await res.json() as ChatState;
        setMeta(body);
        reply = body.reply || "";
        if (!reply) setNote(body.message || t(lang, "Trợ lý chưa trả lời được.", "The tutor did not answer."));
      }
      if (reply) {
        const answer: Turn = { role: "assistant", content: reply };
        setTurns((current) => [...current, answer].slice(-12));
      }
    } catch {
      setNote(t(lang, "Không nối được trợ lý. Thử lại.", "The tutor did not connect. Try again."));
    } finally {
      setLocalLeft(Math.max(0, LOCAL_LIMIT - usedToday()));
      setBusy(false);
    }
  }

  const quota = typeof meta.remaining === "number" && typeof meta.limit === "number"
    ? t(lang, meta.premium ? `Premium: còn ${meta.remaining}/${meta.limit} tin hôm nay.` : `Máy chủ: còn ${meta.remaining}/${meta.limit} tin hôm nay.`, `Server: ${meta.remaining}/${meta.limit} left today.`)
    : t(lang, "Máy chủ: 8 tin miễn phí mỗi ngày, Premium 40.", "Server: 8 free messages a day, Premium 40.");

  return (
    <section className="chat-panel" role="dialog" aria-label={t(lang, "Trợ lý toán", "Math tutor")}>
      <header className="chat-head">
        <b>{t(lang, "Hỏi toán", "Ask maths")}</b>
        <button type="button" className="text-btn" onClick={onClose}>{t(lang, "Đóng", "Close")}</button>
      </header>
      <p className="chat-quota">
        {quota}{" "}
        {mock || url.trim() ? <span>{t(lang, `Mẫu trên máy: còn ${localLeft}/${LOCAL_LIMIT}.`, `On this device: ${localLeft}/${LOCAL_LIMIT} left.`)} </span> : null}
        {meta.premium ? null : <A href="/nang-cap">{t(lang, "Nâng cấp", "Upgrade")}</A>}
      </p>
      <div className="chat-log" ref={scroller} aria-live="polite">
        {turns.length === 0 ? (
          <p className="chat-note">{t(lang, "Gửi một bài. Mình gợi ý từng bước, bạn làm bước cuối.", "Send a problem. I suggest the steps; you finish the last one.")}</p>
        ) : null}
        {turns.map((turn, index) => (
          <article key={`${turn.role}-${index}`} className={`chat-turn is-${turn.role}`}>
            <b>{turn.role === "user" ? t(lang, "Bạn", "You") : t(lang, "Trợ lý", "Tutor")}</b>
            <Bubble role={turn.role} content={turn.content} />
          </article>
        ))}
        {busy ? <p className="chat-typing">{t(lang, "Đang soạn…", "Typing…")}</p> : null}
        {note ? <p className="chat-note" role="status">{note}</p> : null}
      </div>
      <div className="quick-row">
        {QUICK.map((item) => (
          <button key={item} type="button" className="text-btn" disabled={busy} onClick={() => void send(item)}>{item}</button>
        ))}
      </div>
      <form className="chat-form" onSubmit={(event) => { event.preventDefault(); void send(); }}>
        <label className="sr" htmlFor="chat-q">{t(lang, "Câu hỏi toán", "Math question")}</label>
        <textarea
          id="chat-q"
          ref={box}
          rows={2}
          value={draft}
          maxLength={1500}
          placeholder={t(lang, "Viết công thức trong $...$ nếu cần", "Put a formula inside $...$ if you need one")}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void send();
            }
          }}
        />
        <button className="pay-btn" type="submit" disabled={busy || draft.trim() === ""}>{t(lang, "Gửi", "Send")}</button>
      </form>
      {draft.includes("$") ? (
        <p className="chat-preview" aria-label={t(lang, "Xem công thức", "Formula preview")}><MathText text={draft} /></p>
      ) : null}
      <details className="chat-config">
        <summary>{t(lang, "Kết nối máy chủ", "Server connection")}</summary>
        <label className="chat-check">
          <input
            type="checkbox"
            checked={mock}
            onChange={(event) => {
              setMock(event.target.checked);
              try { localStorage.setItem(MOCK_KEY, event.target.checked ? "1" : "0"); } catch { /* ignore */ }
            }}
          />
          {t(lang, "Chế độ mẫu trên máy", "Sample mode on this device")}
        </label>
        <label>
          {t(lang, "URL API (POST JSON, không khóa)", "API URL (POST JSON, no key)")}
          <input
            type="url"
            value={url}
            placeholder="https://…/api/chat"
            onChange={(event) => {
              setUrl(event.target.value);
              try { localStorage.setItem(URL_KEY, event.target.value.trim()); } catch { /* ignore */ }
            }}
          />
        </label>
        <p className="lecture-note">{t(lang, "Khóa API để ở máy chủ. Ô này chỉ nhận địa chỉ.", "The API key stays on the server. This field is only an address.")}</p>
      </details>
    </section>
  );
}

function Bubble({ role, content }: { role: Turn["role"]; content: string }) {
  if (role === "user") return <ChatText text={content} />;
  const lines = content.split("\n").filter((line) => line.trim().length > 0);
  const steps = lines.filter((line) => /^\d+[.)]/.test(line.trim()));
  if (steps.length < 2) return <ChatText text={content} />;
  const intro = lines.filter((line) => !/^\d+[.)]/.test(line.trim())).join("\n");
  return (
    <>
      {intro ? <ChatText text={intro} /> : null}
      <details className="chat-steps">
        <summary>Các bước ({steps.length})</summary>
        <ChatText text={steps.join("\n")} />
      </details>
    </>
  );
}

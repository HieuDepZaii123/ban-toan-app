import { useEffect, useRef, useState } from "react";
import { A } from "../lib/route.tsx";
import { useRoute } from "../lib/useRoute.ts";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { useLang } from "../ui/useLang.ts";
import { ChatText } from "./ChatText.tsx";
import { mockTutor } from "./mock.ts";
import { TOPIC_QUICK, topicById } from "./tutorCopy.ts";

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

const QUICK = ["Đạo hàm của x mũ 2", "Đỉnh của parabol?", "giới hạn dạng 0/0"];
const QUICK_EN = ["Derivative of x squared", "Vertex of a parabola?", "A 0/0 limit"];

function sheetId(path: string): string {
  if (!path.startsWith("/t/")) return "";
  try {
    return decodeURIComponent(path.slice(3).split("/")[0] ?? "");
  } catch {
    return "";
  }
}

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
  const { path } = useRoute();
  const studying = topicById(sheetId(path));
  const quick = studying ? TOPIC_QUICK[studying.id] : (lang === "en" ? QUICK_EN : QUICK);
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
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

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
        reply = mockTutor(content, studying?.id);
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
          body: JSON.stringify({ messages: next, license, topic: studying?.id ?? "" }),
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
      {studying ? <p className="chat-context">{t(lang, `Đang học: ${studying.title}`, `Studying: ${studying.title}`)}</p> : null}
      <div className="chat-log" ref={scroller} aria-live="polite">
        {turns.length === 0 ? (
          <p className="chat-note">{t(lang, "Cứ nói chuyện. Gặp bài thì mình nêu tư duy giải, rồi gợi ý từng bước.", "Talk freely. On a problem I show the solution thinking, then hint the steps.")}</p>
        ) : null}
        {turns.map((turn, index) => (
          <article key={`${turn.role}-${index}`} className={`chat-turn is-${turn.role}`}>
            <b>{turn.role === "user" ? t(lang, "Bạn", "You") : t(lang, "Trợ lý", "Tutor")}</b>
            <Bubble role={turn.role} content={turn.content} />
            {turn.role === "assistant" ? (
              <FollowUps content={turn.content} fallbackId={studying?.id} busy={busy} onAsk={(item) => void send(item)} />
            ) : null}
          </article>
        ))}
        {busy ? <p className="chat-typing">{t(lang, "Đang soạn…", "Typing…")}</p> : null}
        {note ? <p className="chat-note" role="status">{note}</p> : null}
      </div>
      <div className="quick-row">
        {quick.map((item) => (
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
  const lang = useLang();
  const lines = content.split("\n").filter((line) => line.trim().length > 0);
  const steps = lines.filter((line) => /^\d+[.)]/.test(line.trim()));
  const [open, setOpen] = useState<boolean[]>(() => steps.map(() => false));
  const [copied, setCopied] = useState(false);
  if (role === "user") return <ChatText text={content} />;
  const intro = lines.filter((line) => !/^\d+[.)]/.test(line.trim())).join("\n");
  const allOpen = open.length > 0 && open.every(Boolean);

  async function copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <>
      {intro ? <ChatText text={intro} /> : null}
      {steps.map((step, index) => (
        <details
          key={step}
          className="chat-step"
          open={open[index]}
          onToggle={(event) => {
            const next = event.currentTarget.open;
            setOpen((current) => current[index] === next ? current : current.map((value, place) => (place === index ? next : value)));
          }}
        >
          <summary>{t(lang, `Bước ${index + 1}`, `Step ${index + 1}`)}</summary>
          <ChatText text={step.replace(/^\d+[.)]\s*/, "")} />
        </details>
      ))}
      <div className="chat-tools">
        <button type="button" className="text-btn" onClick={() => void copy()}>{copied ? t(lang, "Đã chép", "Copied") : t(lang, "Chép", "Copy")}</button>
        {steps.length > 1 ? (
          <button type="button" className="text-btn" onClick={() => setOpen(steps.map(() => !allOpen))}>
            {allOpen ? t(lang, "Gộp hết", "Collapse") : t(lang, "Mở hết", "Expand")}
          </button>
        ) : null}
      </div>
    </>
  );
}

function FollowUps({ content, fallbackId, busy, onAsk }: { content: string; fallbackId?: string; busy: boolean; onAsk: (text: string) => void }) {
  const lang = useLang();
  const found = /\/t\/([a-z0-9-]+)/.exec(content);
  const topic = topicById(found?.[1] ?? fallbackId ?? "");
  return (
    <div className="quick-row">
      <button type="button" className="text-btn" disabled={busy} onClick={() => onAsk(t(lang, "Thử lại với số 5", "Try the number 5"))}>{t(lang, "Thử số 5", "Try 5")}</button>
      {topic ? <A className="text-btn" href={`/t/${topic.id}`}>{t(lang, "Mở tờ", "Open sheet")}</A> : null}
      <button type="button" className="text-btn" disabled={busy} onClick={() => onAsk(t(lang, "Giải thích bước 2 bằng một số cụ thể", "Explain step 2 with one number"))}>{t(lang, "Giải thích bước 2", "Explain step 2")}</button>
    </div>
  );
}

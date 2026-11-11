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
/** The server-connection panel (sample mode, custom API URL) is a developer tool, not for students. */
const DEV_TOOLS = import.meta.env.DEV;
const LOCAL_LIMIT = 8;
/** Người học đã đọc và đồng ý với thông báo dữ liệu của trợ lý trên máy này. */
const CONSENT = "bt-chat-ok";
/** Ký hiệu chèn nhanh, để hỏi toán trên điện thoại mà không cần biết LaTeX. */
const SYMBOLS = ["²", "^", "√", "/", "π", "≤", "≥", "≠", "∫"] as const;

function timeoutSignal(ms: number): AbortSignal | undefined {
  if (typeof AbortController === "undefined") return undefined;
  const control = new AbortController();
  window.setTimeout(() => control.abort(), ms);
  return control.signal;
}

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

/** Stable per-browser id so the free allowance is per learner, not per shared school network. */
function deviceId(): string {
  try {
    const saved = localStorage.getItem("ban-toan-device");
    if (saved && /^[A-Za-z0-9-]{8,64}$/.test(saved)) return saved;
    const next = crypto.randomUUID();
    localStorage.setItem("ban-toan-device", next);
    return next;
  } catch {
    return "";
  }
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
    if (!DEV_TOOLS) return "";
    try { return localStorage.getItem(URL_KEY) || ""; } catch { return ""; }
  });
  const [mock, setMock] = useState(() => {
    if (!DEV_TOOLS) return false;
    try { return localStorage.getItem(MOCK_KEY) === "1"; } catch { return false; }
  });
  const [localLeft, setLocalLeft] = useState(() => Math.max(0, LOCAL_LIMIT - usedToday()));
  const box = useRef<HTMLTextAreaElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [agreed, setAgreed] = useState(() => {
    try { return localStorage.getItem(CONSENT) === "1"; } catch { return false; }
  });

  function clear(): void {
    setTurns([]);
    setMeta({});
    setNote("");
    try {
      localStorage.removeItem(HISTORY);
      sessionStorage.removeItem(HISTORY);
    } catch {
      /* ignore */
    }
  }

  function insert(piece: string): void {
    const el = box.current;
    const start = el?.selectionStart ?? draft.length;
    const end = el?.selectionEnd ?? draft.length;
    const next = (draft.slice(0, start) + piece + draft.slice(end)).slice(0, 1500);
    setDraft(next);
    window.setTimeout(() => {
      const at = Math.min(start + piece.length, next.length);
      el?.focus();
      el?.setSelectionRange(at, at);
    }, 0);
  }

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
          body: JSON.stringify({ messages: next, license, topic: studying?.id ?? "", device: deviceId() }),
          signal: timeoutSignal(40_000),
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
      // Trả câu hỏi về ô nhập để người học bấm Gửi lại, không phải gõ lại.
      setTurns(turns);
      setDraft(content);
      setNote(typeof navigator !== "undefined" && navigator.onLine === false
        ? t(lang, "Bạn đang ngoại tuyến. Trợ lý cần mạng; bài học và bài luyện đã mở vẫn dùng được. Câu hỏi còn trong ô bên dưới.", "You are offline. The tutor needs a connection; lessons and practice you have opened still work. Your question is still in the box below.")
        : t(lang, "Chưa nối được trợ lý. Câu hỏi còn trong ô bên dưới, bấm Gửi để thử lại.", "The tutor did not connect. Your question is still in the box below; press Send to try again."));
    } finally {
      setLocalLeft(Math.max(0, LOCAL_LIMIT - usedToday()));
      setBusy(false);
    }
  }

  const known = typeof meta.remaining === "number" && typeof meta.limit === "number";
  const outOfQuestions = known && meta.remaining === 0 && !meta.premium;
  const quota = known
    ? meta.premium
      ? t(lang, `Premium: còn ${meta.remaining} câu hỏi hôm nay.`, `Premium: ${meta.remaining} questions left today.`)
      : outOfQuestions
        ? t(lang, "Hết 8 câu hỏi miễn phí hôm nay. Mai hỏi tiếp, hoặc Premium được 40 câu mỗi ngày.", "Your 8 free questions for today are used. Come back tomorrow, or Premium gives 40 a day.")
        : t(lang, `Còn ${meta.remaining} câu hỏi miễn phí hôm nay.`, `${meta.remaining} free questions left today.`)
    : t(lang, "8 câu hỏi miễn phí mỗi ngày, Premium 40.", "8 free questions a day, Premium 40.");

  return (
    <section className="chat-panel" role="dialog" aria-label={t(lang, "Trợ lý toán", "Math tutor")}>
      <header className="chat-head">
        <b>{t(lang, "Hỏi toán", "Ask maths")}</b>
        <span className="chat-head-tools">
          {turns.length > 0 ? <button type="button" className="text-btn" onClick={clear}>{t(lang, "Xóa lịch sử", "Clear history")}</button> : null}
          <button type="button" className="text-btn" onClick={onClose}>{t(lang, "Đóng", "Close")}</button>
        </span>
      </header>
      <p className="chat-quota">
        {quota}{" "}
        {mock || url.trim() ? <span>{t(lang, `Mẫu trên máy: còn ${localLeft}/${LOCAL_LIMIT}.`, `On this device: ${localLeft}/${LOCAL_LIMIT} left.`)} </span> : null}
        {meta.premium ? null : <A href="/nang-cap" className={outOfQuestions ? "pay-btn" : undefined}>{outOfQuestions ? t(lang, "Xem Premium", "See Premium") : t(lang, "Nâng cấp", "Upgrade")}</A>}
      </p>
      {meta.mode === "demo" ? (
        <p className="chat-note chat-demo" role="note">
          {t(lang, "Máy chủ này chưa nối AI: bên dưới là bài mẫu soạn sẵn theo chủ đề, không phải câu trả lời riêng cho bài của bạn.", "This server is not connected to an AI model: the replies below are prepared samples by topic, not answers to your own problem.")}
        </p>
      ) : null}
      {studying ? <p className="chat-context">{t(lang, `Đang học: ${studying.title}`, `Studying: ${studying.title}`)}</p> : null}
      {!agreed ? (
        <ChatConsent
          onAgree={() => {
            try { localStorage.setItem(CONSENT, "1"); } catch { /* đồng ý cho lần mở này */ }
            setAgreed(true);
            window.setTimeout(() => box.current?.focus(), 0);
          }}
          onClose={onClose}
        />
      ) : (
        <>
      <div className="chat-log" ref={scroller} aria-live="polite">
        {turns.length === 0 ? (
          <p className="chat-note">{t(lang, "Gửi bài toán hoặc chỗ bạn đang vướng. Mình nêu hướng nghĩ rồi gợi ý từng bước. Nhớ đừng ghi tên, địa chỉ hay số điện thoại. ", "Send a maths problem or the step where you are stuck. I will set out the thinking, then hint the steps. Do not include names, addresses or phone numbers. ")}<A href="/chinh-sach">{t(lang, "Chính sách", "Policy")}</A></p>
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
      <div className="chat-keys" role="group" aria-label={t(lang, "Chèn ký hiệu toán", "Insert a maths symbol")}>
        {SYMBOLS.map((symbol) => (
          <button key={symbol} type="button" className="text-btn" disabled={busy} onClick={() => insert(symbol)}>{symbol}</button>
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
          placeholder={t(lang, "Gõ như viết tay, ví dụ: x^2 - 3x + 2 = 0", "Type it as you would write it, e.g. x^2 - 3x + 2 = 0")}
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
        </>
      )}
      {DEV_TOOLS ? <details className="chat-config">
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
      </details> : null}
    </section>
  );
}

/** Thông báo dữ liệu, hiện một lần trước câu hỏi đầu tiên trên máy này. */
function ChatConsent({ onAgree, onClose }: { onAgree: () => void; onClose: () => void }) {
  const lang = useLang();
  return (
    <div className="chat-consent">
      <b>{t(lang, "Trước khi hỏi", "Before you ask")}</b>
      <ul>
        <li>{t(lang, "Câu hỏi của bạn được gửi tới máy chủ Bàn Toán, rồi tới một nhà cung cấp AI bên ngoài để soạn câu trả lời.", "Your question goes to the Bàn Toán server and then to an outside AI provider that writes the reply.")}</li>
        <li>{t(lang, "Gói miễn phí của các nhà cung cấp này có thể dùng nội dung để cải thiện mô hình của họ.", "The free tiers of these providers may use the content to improve their models.")}</li>
        <li>{t(lang, "Vì vậy đừng ghi họ tên, địa chỉ, số điện thoại, tên trường hay chuyện riêng.", "So do not write names, addresses, phone numbers, your school or anything private.")}</li>
        <li>{t(lang, "Nếu bạn dưới 16 tuổi, hãy hỏi cha mẹ hoặc người giám hộ trước khi dùng.", "If you are under 16, ask a parent or guardian before using it.")}</li>
        <li>{t(lang, "Trợ lý có thể sai. Nó gợi ý từng bước chứ không làm hộ bài.", "The tutor can be wrong. It hints the steps rather than doing the work for you.")}</li>
      </ul>
      <p className="chat-tools">
        <button type="button" className="pay-btn" onClick={onAgree}>{t(lang, "Tôi hiểu, bắt đầu hỏi", "I understand, start asking")}</button>
        <button type="button" className="text-btn" onClick={onClose}>{t(lang, "Để sau", "Not now")}</button>
        <A href="/chinh-sach">{t(lang, "Chính sách dữ liệu", "Data policy")}</A>
      </p>
    </div>
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

import { useEffect, useRef, useState } from "react";
import { docSamples } from "../docs/samples.ts";
import { renderDoc } from "../docs/render.ts";
import { t } from "../lib/text.ts";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

const KEY = "ban-toan-soan-v1";

function readDraft(): string {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) || "null");
    if (!parsed || typeof parsed !== "object") return "";
    const text = (parsed as { text?: unknown }).text;
    return typeof text === "string" ? text : "";
  } catch {
    return "";
  }
}

export function DocPage() {
  const lang = useLang();
  const area = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState(readDraft);
  const [sampleId, setSampleId] = useState("");

  useEffect(() => {
    document.title = "Soạn tài liệu · Bàn Toán";
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify({ text })); } catch { /* máy đầy */ }
  }, [text]);

  function wrap(before: string, after: string) {
    const el = area.current;
    if (!el) {
      setText((current) => current + before + after);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const picked = text.slice(start, end);
    const next = text.slice(0, start) + before + picked + after + text.slice(end);
    setText(next);
    const cursor = start + before.length + picked.length;
    window.requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(cursor, cursor);
    });
  }

  const preview = renderDoc(text);

  return (
    <PageFrame
      kicker={t(lang, "Soạn tài liệu", "Documents")}
      title={t(lang, "Soạn tài liệu", "Write a document")}
      lead={t(lang, "Viết tự do, xuống dòng thoải mái. Công thức đặt trong $...$ hoặc $$...$$. Bản nháp lưu trên máy này.", "Write freely, including line breaks. Put formulas in $...$ or $$...$$. The draft stays on this device.")}
    >
      <div className="doc-tools">
        <label>
          {t(lang, "Mẫu", "Sample")}
          <select
            aria-label={t(lang, "Chọn tài liệu mẫu", "Choose a sample document")}
            value={sampleId}
            onChange={(event) => {
              const id = event.target.value;
              setSampleId(id);
              const sample = docSamples.find((item) => item.id === id);
              if (sample) setText(sample.body);
            }}
          >
            <option value="">{t(lang, "Trang trống", "Blank page")}</option>
            {docSamples.map((item) => (
              <option key={item.id} value={item.id}>{item.grade} · {item.title}</option>
            ))}
          </select>
        </label>
        <button type="button" className="text-btn" onClick={() => wrap("\n# ", "\n")}>{t(lang, "Tiêu đề", "Heading")}</button>
        <button type="button" className="text-btn" onClick={() => wrap("**", "**")}>{t(lang, "Đậm", "Bold")}</button>
        <button type="button" className="text-btn" onClick={() => wrap("*", "*")}>{t(lang, "Nghiêng", "Italic")}</button>
        <button type="button" className="text-btn" onClick={() => window.print()}>{t(lang, "In / Xuất PDF", "Print / Export PDF")}</button>
      </div>
      <p className="lecture-note">{t(lang, "Chọn mẫu thì chữ mẫu vào ô soạn. Sửa tiếp tùy ý. Mẫu không gắn với bài học.", "Choosing a sample fills the editor. Edit it freely. Samples are not tied to a lesson.")}</p>
      <div className="doc-split">
        <label className="doc-source">
          {t(lang, "Bản soạn", "Draft")}
          <textarea
            ref={area}
            value={text}
            rows={16}
            aria-label={t(lang, "Nội dung tài liệu", "Document text")}
            placeholder={"# Tiêu đề\nViết một câu.\nCông thức $a^2+b^2=c^2$."}
            onChange={(event) => setText(event.target.value)}
          />
        </label>
        <article className="doc-preview tool-card" aria-label={t(lang, "Bản xem", "Preview")}>
          <b>{t(lang, "Bản xem", "Preview")}</b>
          {text.trim() === "" ? <p className="lecture-note">{t(lang, "Chưa có chữ. Gõ ở ô bên, hoặc chọn một mẫu.", "Nothing yet. Type on the left, or choose a sample.")}</p> : (
            <div className="doc-sheet" dangerouslySetInnerHTML={{ __html: preview }} />
          )}
        </article>
      </div>
    </PageFrame>
  );
}

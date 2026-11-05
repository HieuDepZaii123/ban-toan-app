import { useEffect, useRef, useState } from "react";
import { docSamples } from "../docs/samples.ts";
import { renderDoc } from "../docs/render.ts";
import { PageFrame } from "../ui/PageFrame.tsx";

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
      kicker="Soạn tài liệu"
      title="Soạn tài liệu"
      lead="Viết tự do, xuống dòng thoải mái. Công thức đặt trong $...$ hoặc $$...$$. Bản nháp lưu trên máy này."
    >
      <div className="doc-tools">
        <label>
          Mẫu
          <select
            aria-label="Chọn tài liệu mẫu"
            value={sampleId}
            onChange={(event) => {
              const id = event.target.value;
              setSampleId(id);
              const sample = docSamples.find((item) => item.id === id);
              if (sample) setText(sample.body);
            }}
          >
            <option value="">Trang trống</option>
            {docSamples.map((item) => (
              <option key={item.id} value={item.id}>{item.grade} · {item.title}</option>
            ))}
          </select>
        </label>
        <button type="button" className="text-btn" onClick={() => wrap("\n# ", "\n")}>Tiêu đề</button>
        <button type="button" className="text-btn" onClick={() => wrap("**", "**")}>Đậm</button>
        <button type="button" className="text-btn" onClick={() => wrap("*", "*")}>Nghiêng</button>
        <button type="button" className="text-btn" onClick={() => window.print()}>In / Xuất PDF</button>
      </div>
      <p className="lecture-note">Chọn mẫu thì chữ mẫu vào ô soạn. Sửa tiếp tùy ý. Mẫu không gắn với bài học.</p>
      <div className="doc-split">
        <label className="doc-source">
          Bản soạn
          <textarea
            ref={area}
            value={text}
            rows={16}
            aria-label="Nội dung tài liệu"
            placeholder={"# Tiêu đề\nViết một câu.\nCông thức $a^2+b^2=c^2$."}
            onChange={(event) => setText(event.target.value)}
          />
        </label>
        <article className="doc-preview tool-card" aria-label="Bản xem">
          <b>Bản xem</b>
          {text.trim() === "" ? <p className="lecture-note">Chưa có chữ. Gõ ở ô bên, hoặc chọn một mẫu.</p> : (
            <div className="doc-sheet" dangerouslySetInnerHTML={{ __html: preview }} />
          )}
        </article>
      </div>
    </PageFrame>
  );
}

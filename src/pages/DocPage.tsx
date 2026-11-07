import { useEffect, useRef, useState } from "react";
import "katex/dist/katex.min.css";
import regularUrl from "../docs/fonts/Sans-Regular.ttf";
import boldUrl from "../docs/fonts/Sans-Bold.ttf";
import italicUrl from "../docs/fonts/Sans-Italic.ttf";
import { downloadBytes } from "../docs/download.ts";
import { clearDocDraft, readDocDraft, writeDocDraft } from "../docs/draft.ts";
import { docSamples } from "../docs/samples.ts";
import { renderDoc } from "../docs/render.ts";
import { t } from "../lib/text.ts";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

function prefixLines(text: string, start: number, end: number, mark: (line: string, index: number) => string): { next: string; cursor: number } {
  const lineStart = text.lastIndexOf("\n", Math.max(0, start - 1)) + 1;
  const lineEnd = text.indexOf("\n", end);
  const until = lineEnd === -1 ? text.length : lineEnd;
  const nextBlock = text.slice(lineStart, until).split("\n").map(mark).join("\n");
  return { next: text.slice(0, lineStart) + nextBlock + text.slice(until), cursor: lineStart + nextBlock.length };
}

export function DocPage() {
  const lang = useLang();
  const area = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState(() => readDocDraft(localStorage));
  const [sampleId, setSampleId] = useState("");
  const [note, setNote] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    document.title = t(lang, "Soạn tài liệu · Bàn Toán", "Documents · Bàn Toán");
  }, [lang]);

  useEffect(() => {
    writeDocDraft(text, localStorage);
  }, [text]);

  function apply(next: string, cursor: number) {
    const el = area.current;
    setText(next);
    window.requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(cursor, cursor);
    });
  }

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
    apply(next, start + before.length + picked.length);
  }

  function markLines(mark: (line: string, index: number) => string) {
    const el = area.current;
    if (!el) return;
    const changed = prefixLines(text, el.selectionStart, el.selectionEnd, mark);
    apply(changed.next, changed.cursor);
  }

  async function fontBytes(url: string): Promise<Uint8Array> {
    const response = await fetch(url);
    if (!response.ok) throw new Error("font");
    return new Uint8Array(await response.arrayBuffer());
  }

  async function exportFile(kind: "pdf" | "txt" | "docx") {
    const filename = kind === "pdf" ? "ban-toan.pdf" : kind === "txt" ? "ban-toan.txt" : "ban-toan.docx";
    try {
      if (kind === "txt") {
        const { docToTxt } = await import("../docs/plain.ts");
        downloadBytes(docToTxt(text), filename, "text/plain;charset=utf-8");
      } else if (kind === "docx") {
        const { docToDocx } = await import("../docs/docx.ts");
        downloadBytes(docToDocx(text), filename, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
      } else {
        const { buildPdf } = await import("../docs/pdf.ts");
        const [regular, bold, italic] = await Promise.all([fontBytes(regularUrl), fontBytes(boldUrl), fontBytes(italicUrl)]);
        const bytes = await buildPdf(text, { regular, bold, italic });
        downloadBytes(bytes, filename, "application/pdf");
      }
      setNote(t(lang, `Đã tải ${filename}. Đây là tệp tải thẳng, không phải hộp thoại in.`, `Downloaded ${filename}. This is a file download, not the print dialog.`));
    } catch {
      setNote(t(lang, "Không tạo được tệp.", "Could not make the file."));
    }
  }

  function save() {
    const ok = writeDocDraft(text, localStorage);
    setNote(ok
      ? t(lang, "Đã lưu trên máy này. Đổi trang hoặc tải lại vẫn còn chữ.", "Saved on this device. The text stays when you change pages or reload.")
      : t(lang, "Máy không lưu được.", "This device could not save."));
  }

  function clearDraft() {
    clearDocDraft(localStorage);
    setText("");
    setSampleId("");
    setConfirmClear(false);
    setNote(t(lang, "Đã xóa bản soạn. Bài học, luyện tập và nhạc không bị xóa.", "Draft cleared. Lessons, practice, and music were not deleted."));
  }

  const preview = renderDoc(text);

  return (
    <PageFrame
      kicker={t(lang, "Soạn tài liệu", "Documents")}
      title={t(lang, "Soạn tài liệu", "Write a document")}
      lead={t(lang, "Gõ tiếng Việt thoải mái. Đậm, nghiêng, tiêu đề và danh sách nằm trên thanh. Công thức đặt trong $...$ hoặc $$...$$. Lưu giữ chữ khi đổi trang. Xuất PDF, TXT hoặc Word đúng bản đang soạn, kể cả mẫu đang mở.", "Type in Vietnamese. Bold, italic, headings, and lists are on the toolbar. Put formulas in $...$ or $$...$$. Save keeps the text across pages. Export PDF, TXT, or Word for the draft you are writing, including an open sample.")}
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
        <button type="button" className="text-btn" onClick={() => markLines((line) => line.startsWith("# ") ? line : `# ${line}`)}>{t(lang, "Tiêu đề", "Heading")}</button>
        <button type="button" className="text-btn" onClick={() => markLines((line) => line.startsWith("## ") ? line : `## ${line}`)}>{t(lang, "Tiêu đề nhỏ", "Small heading")}</button>
        <button type="button" className="text-btn" onClick={() => wrap("**", "**")}>{t(lang, "Đậm", "Bold")}</button>
        <button type="button" className="text-btn" onClick={() => wrap("*", "*")}>{t(lang, "Nghiêng", "Italic")}</button>
        <button type="button" className="text-btn" onClick={() => markLines((line) => /^[-•] /.test(line) ? line : `- ${line}`)}>{t(lang, "Danh sách", "Bullet list")}</button>
        <button type="button" className="text-btn" onClick={() => markLines((line, index) => /^\d+\. /.test(line) ? line : `${index + 1}. ${line}`)}>{t(lang, "Danh sách số", "Numbered list")}</button>
        <button type="button" className="text-btn" id="soan-luu" onClick={save}>{t(lang, "Lưu", "Save")}</button>
        {confirmClear ? (
          <span className="doc-confirm" role="group" aria-label={t(lang, "Xác nhận xóa bản soạn", "Confirm clearing the draft")}>
            <button type="button" className="text-btn" id="soan-xoa-han" onClick={clearDraft}>{t(lang, "Xóa hẳn", "Clear it")}</button>
            <button type="button" className="text-btn" onClick={() => setConfirmClear(false)}>{t(lang, "Giữ lại", "Keep")}</button>
          </span>
        ) : (
          <button type="button" className="text-btn" id="soan-xoa" onClick={() => setConfirmClear(true)}>{t(lang, "Xóa bản soạn", "Clear draft")}</button>
        )}
        <details className="doc-export" open>
          <summary>{t(lang, "Xuất tệp", "Export")}</summary>
          <button type="button" className="text-btn" id="soan-pdf" onClick={() => void exportFile("pdf")}>PDF</button>
          <button type="button" className="text-btn" id="soan-txt" onClick={() => void exportFile("txt")}>TXT</button>
          <button type="button" className="text-btn" id="soan-docx" onClick={() => void exportFile("docx")}>DOCX</button>
        </details>
      </div>
      <p className="lecture-note" role="status">{note || t(lang, "PDF, TXT và DOCX tải thẳng trong trình duyệt. Xóa bản soạn chỉ xóa ô này.", "PDF, TXT, and DOCX download directly in the browser. Clear draft removes only this box.")}</p>
      <p className="lecture-note">{t(lang, "Chọn mẫu thì chữ mẫu vào ô soạn. Sửa tiếp tùy ý. Mẫu không gắn với bài học.", "Choosing a sample fills the editor. Edit it freely. Samples are not tied to a lesson.")}</p>
      <div className="doc-split">
        <label className="doc-source">
          {t(lang, "Bản soạn", "Draft")}
          <textarea
            ref={area}
            value={text}
            rows={16}
            aria-label={t(lang, "Nội dung tài liệu", "Document text")}
            placeholder={"# Tiêu đề\nViết một câu tiếng Việt.\nCông thức $a^2+b^2=c^2$."}
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

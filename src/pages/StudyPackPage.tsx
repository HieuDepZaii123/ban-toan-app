import { useEffect, useMemo, useState } from "react";
import "katex/dist/katex.min.css";
import { streamName, topicById, topics } from "../content/catalog.ts";
import { loadTopic, type TopicPack } from "../content/loadTopic.ts";
import { renderDoc } from "../docs/render.ts";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { usePremium } from "../premium/license.ts";
import { buildStudyPack, packContents, packTeaser } from "../premium/studyPack.ts";
import { LectureVideos } from "../topic/LectureVideos.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

function packId(path: string): string {
  try {
    return decodeURIComponent(path.replace(/^\/tai-lieu\/?/, "").split("/")[0] ?? "");
  } catch {
    return "";
  }
}

export function StudyPackPage({ path }: { path: string }) {
  const id = packId(path);
  return id ? <PackView key={id} id={id} /> : <PackIndex />;
}

function PackIndex() {
  const lang = useLang();
  const ready = topics.filter((topic) => topic.status === "ready");
  useEffect(() => {
    document.title = t(lang, "Tài liệu ôn tập · Bàn Toán", "Study notes · Bàn Toán");
  }, [lang]);
  return (
    <PageFrame
      kicker={t(lang, "Premium · Tài liệu", "Premium · Materials")}
      title={t(lang, "Tài liệu ôn tập", "Study notes")}
      lead={t(
        lang,
        `${ready.length} bộ, mỗi tờ một bộ: bài giảng viết, lỗi hay gặp, ví dụ có lời giải và đề tự luyện kèm đáp án. Đọc trên trang hoặc tải PDF, Word để in.`,
        `${ready.length} packs, one per sheet: written lecture notes, common mistakes, worked examples and a self-test with answers. Read here or download a PDF or Word file to print.`,
      )}
    >
      <ul className="pack-list">
        {ready.map((topic) => (
          <li key={topic.id}>
            <A href={`/tai-lieu/${topic.id}`}>
              <b>{lang === "en" ? topic.titleEn : topic.title}</b>
              <span>{t(lang, `Lớp ${topic.grade}`, `Grade ${topic.grade}`)} · {streamName(topic.stream, lang)}</span>
            </A>
          </li>
        ))}
      </ul>
      <p className="lecture-note">{t(lang, "Phần «Ý chính» của mỗi bộ đọc miễn phí. Toàn bộ tài liệu và tệp tải về là tính năng Premium.", "The “Key ideas” part of every pack is free. The full notes and the downloads are a Premium feature.")}</p>
    </PageFrame>
  );
}

function PackView({ id }: { id: string }) {
  const lang = useLang();
  const premium = usePremium();
  const meta = topicById(id);
  const [pack, setPack] = useState<TopicPack | null>(null);
  const [failed, setFailed] = useState(false);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const ready = meta?.status === "ready";

  useEffect(() => {
    if (!ready) return;
    let live = true;
    loadTopic(id).then((loaded) => { if (live) setPack(loaded); }, () => { if (live) setFailed(true); });
    return () => { live = false; };
  }, [id, ready]);

  useEffect(() => {
    if (meta) document.title = t(lang, `${meta.title}: tài liệu ôn tập · Bàn Toán`, `${meta.titleEn}: study notes · Bàn Toán`);
  }, [lang, meta]);

  const isPremium = premium.kind === "active";
  const source = useMemo(() => (meta && pack ? { meta, lesson: pack.lesson, questions: pack.questions } : null), [meta, pack]);
  const text = useMemo(() => (source ? (isPremium ? buildStudyPack(source, lang) : packTeaser(source, lang)) : ""), [source, isPremium, lang]);
  const html = useMemo(() => (text ? renderDoc(text) : ""), [text]);
  const contents = source ? packContents(source) : null;

  if (!meta || !ready) {
    return (
      <PageFrame kicker={t(lang, "Tài liệu ôn tập", "Study notes")} title={t(lang, "Chưa có tài liệu này", "No notes for this yet")}>
        <p><A href="/tai-lieu">{t(lang, "Xem các bộ tài liệu", "See all study notes")}</A></p>
      </PageFrame>
    );
  }

  async function download(kind: "pdf" | "docx") {
    if (!text || busy) return;
    setBusy(true);
    setNote("");
    try {
      const { exportDoc } = await import("../docs/exportFile.ts");
      const filename = await exportDoc(kind, text, `ban-toan-${id}${lang === "en" ? "-en" : ""}`);
      setNote(t(lang, `Đã tải ${filename}.`, `Downloaded ${filename}.`));
    } catch {
      setNote(t(lang, "Không tạo được tệp. Thử lại.", "Could not make the file. Try again."));
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageFrame
      kicker={t(lang, "Premium · Tài liệu ôn tập", "Premium · Study notes")}
      title={lang === "en" ? meta.titleEn : meta.title}
      lead={contents
        ? t(lang, `${contents.notes} mục bài giảng, ${contents.examples} ví dụ có lời giải, ${contents.selfTest} câu tự luyện kèm đáp án.`, `${contents.notes} lecture notes, ${contents.examples} worked examples, ${contents.selfTest} self-test questions with answers.`)
        : undefined}
    >
      <p className="pack-tools doc-tools">
        <A href="/tai-lieu">{t(lang, "Mọi bộ tài liệu", "All study notes")}</A>
        <A href={`/t/${id}`}>{t(lang, "Mở tờ này", "Open this sheet")}</A>
        {isPremium ? (
          <>
            <button type="button" className="text-btn" disabled={busy || !text} onClick={() => void download("pdf")}>{t(lang, "Tải PDF", "Download PDF")}</button>
            <button type="button" className="text-btn" disabled={busy || !text} onClick={() => void download("docx")}>{t(lang, "Tải Word", "Download Word")}</button>
          </>
        ) : null}
      </p>
      {note ? <p className="lecture-note" role="status">{note}</p> : null}
      {failed ? <p className="pay-card" role="alert">{t(lang, "Không tải được nội dung. Kiểm tra mạng rồi mở lại trang.", "The content did not load. Check your connection and reopen the page.")}</p> : null}
      {!pack && !failed ? <p className="lecture-note">{t(lang, "Đang soạn tài liệu…", "Preparing the notes…")}</p> : null}
      {html ? (
        <article className="doc-preview tool-card pack-sheet" aria-label={t(lang, "Tài liệu", "Notes")}>
          <div className="doc-sheet" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      ) : null}
      {pack && !isPremium ? (
        <p className="pay-card">
          <b>{t(lang, "Phần còn lại là Premium.", "The rest is Premium.")}</b>
          <span>
            {premium.kind === "checking"
              ? t(lang, " Đang kiểm mã Premium…", " Checking your Premium key…")
              : contents
                ? t(lang, ` Bài giảng viết ${contents.notes} mục, ${contents.examples} ví dụ giải từng bước, ${contents.selfTest} câu tự luyện có đáp án và gợi ý, tải về PDF hoặc Word.`, ` ${contents.notes} written lecture notes, ${contents.examples} examples solved step by step, ${contents.selfTest} self-test questions with answers and hints, as a PDF or Word download.`)
                : ""}
          </span>{" "}
          <A href="/nang-cap">{t(lang, "Xem Premium", "See Premium")}</A>
        </p>
      ) : null}
      <LectureVideos topicId={id} />
    </PageFrame>
  );
}

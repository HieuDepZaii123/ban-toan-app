import { useState } from "react";
import { methodById, methodsData, type PracticeItem } from "../methods/catalog.ts";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

export function MethodsPage({ path }: { path: string }) {
  const lang = useLang();
  const id = path === "/phuong-phap" ? "" : decodeURIComponent(path.slice("/phuong-phap/".length).split("/")[0] ?? "");
  const method = id ? methodById(id) : undefined;
  if (id && !method) {
    return (
      <PageFrame
        kicker={t(lang, "Phương pháp giải", "Solving methods")}
        title={t(lang, "Không thấy cách này", "This method is missing")}
        lead={t(lang, "Các phương pháp đang có nằm ở trang chọn.", "The available methods are on the chooser.")}
      >
        <A href="/phuong-phap">{t(lang, "Về trang chọn cách", "Back to the chooser")}</A>
      </PageFrame>
    );
  }
  if (!method) return <Chooser />;
  return <MethodView method={method} />;
}

function Chooser() {
  const lang = useLang();
  return (
    <PageFrame
      kicker={t(lang, "Phương pháp giải", "Solving methods")}
      title={t(lang, methodsData.title, methodsData.titleEn)}
      lead={t(lang, methodsData.lead, methodsData.leadEn)}
    >
      <section className="tool-card">
        <h2>{t(lang, "Chọn cách", "Choose a method")}</h2>
        <ul className="method-guide">
          {methodsData.guide.map((row) => {
            const target = methodById(row.methodId);
            return (
              <li key={row.methodId}>
                <MathText text={row.when} />
                <span>
                  {target ? <A href={`/phuong-phap/${target.id}`}>{t(lang, target.title, target.titleEn)}</A> : null}
                  {" · "}
                  <A href={row.topicHref}>{row.topicLabel}</A>
                </span>
              </li>
            );
          })}
        </ul>
      </section>
      <section className="tool-card">
        <h2>{t(lang, "Dạng bài theo lớp", "Problem types by grade")}</h2>
        <p className="lecture-note">{t(lang, "Mỗi lớp có từ mười dạng bài, mỗi dạng kèm cách nhận ra, các bước giải và ví dụ.", "Each grade has ten problem types, each with how to spot it, the steps and a worked example.")}</p>
        <p>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
            <span key={grade}><A href={`/kien-thuc/${grade}/dang`}>{t(lang, `Lớp ${grade}`, `Grade ${grade}`)}</A>{grade < 12 ? " · " : ""}</span>
          ))}
        </p>
        <h2>{t(lang, "Tư duy và sáng tạo theo lớp", "Thinking and creating by grade")}</h2>
        <p className="lecture-note">{t(lang, "Mỗi lớp có năm bài để nghĩ kỹ: đố mẹo, tìm lỗi sai, phản ví dụ, tự ra đề.", "Each grade has five problems to think hard about: puzzles, spotting errors, counterexamples, posing your own.")}</p>
        <p>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
            <span key={grade}><A href={`/kien-thuc/${grade}/tu-duy`}>{t(lang, `Lớp ${grade}`, `Grade ${grade}`)}</A>{grade < 12 ? " · " : ""}</span>
          ))}
        </p>
      </section>
      <h2>{t(lang, "Phương pháp theo lớp 1–8", "Methods for grades 1 to 8")}</h2>
      <div className="study-list">
        {methodsData.methods.filter((item) => item.grade !== undefined).sort((a, b) => (a.grade ?? 0) - (b.grade ?? 0)).map((item) => (
          <A key={item.id} className="tool-card" href={`/phuong-phap/${item.id}`}>
            <strong>{t(lang, `Lớp ${item.grade}. ${item.title}`, `Grade ${item.grade}. ${item.titleEn}`)}</strong>
            <span>{t(lang, item.blurb, item.titleEn)}</span>
          </A>
        ))}
      </div>
      <h2>{t(lang, "Phương pháp nâng cao (lớp 10–12)", "Advanced methods (grades 10 to 12)")}</h2>
      <div className="study-list">
        {methodsData.methods.filter((item) => item.grade === undefined).map((item) => (
          <A key={item.id} className="tool-card" href={`/phuong-phap/${item.id}`}>
            <strong>{t(lang, item.title, item.titleEn)}</strong>
            <span>{t(lang, item.blurb, item.titleEn)}</span>
          </A>
        ))}
      </div>
    </PageFrame>
  );
}

function MethodView({ method }: { method: NonNullable<ReturnType<typeof methodById>> }) {
  const lang = useLang();
  return (
    <PageFrame
      kicker={method.grade ? t(lang, `Phương pháp giải · Lớp ${method.grade}`, `Solving methods · Grade ${method.grade}`) : t(lang, "Phương pháp giải", "Solving methods")}
      title={t(lang, method.title, method.titleEn)}
      lead={t(lang, method.blurb, method.titleEn)}
    >
      <p><A href="/phuong-phap">{t(lang, "Về trang chọn cách", "Back to the chooser")}</A></p>
      <Block title={t(lang, "Khi nào dùng", "When to use")} lines={method.spot} />
      <Block title={t(lang, "Tư duy giải", "Solution thinking")} lines={method.thinking} />
      <Block title={t(lang, "Miền và điều kiện", "Domain and care")} lines={method.care} />
      <section className="tool-card">
        <h2>{t(lang, "Công thức", "Formulas")}</h2>
        {method.formulas.map((line) => <p key={line}><MathText text={line} /></p>)}
      </section>
      {method.examples.map((example, index) => (
        <article key={example.id} className="tool-card">
          <h2>{t(lang, `Ví dụ ${index + 1}. ${example.title}`, `Example ${index + 1}. ${example.title}`)}</h2>
          <p><MathText text={example.prompt} /></p>
          <ol className="method-steps">
            {example.steps.map((step) => <li key={step}><MathText text={step} /></li>)}
          </ol>
          <p><b>{t(lang, "Kết quả.", "Result.")}</b> <MathText text={example.result} /></p>
        </article>
      ))}
      <Block title={t(lang, "Lỗi hay gặp", "Common mistakes")} lines={method.mistakes} />
      <section className="tool-card">
        <h2>{t(lang, "Luyện ngắn", "Short practice")}</h2>
        {method.practice.map((item) => <PracticeView key={item.id} item={item} />)}
      </section>
      <p className="lecture-note">
        {method.links.map((link, index) => (
          <span key={link.href}>
            {index > 0 ? " · " : ""}
            <A href={link.href}>{link.label}</A>
          </span>
        ))}
      </p>
    </PageFrame>
  );
}

function Block({ title, lines }: { title: string; lines: string[] }) {
  return (
    <section className="tool-card">
      <h2>{title}</h2>
      <ul className="method-guide">
        {lines.map((line) => <li key={line}><MathText text={line} /></li>)}
      </ul>
    </section>
  );
}

function PracticeView({ item }: { item: PracticeItem }) {
  const lang = useLang();
  const [open, setOpen] = useState(false);
  return (
    <article>
      <p><MathText text={item.prompt} /></p>
      <button type="button" className="text-btn" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? t(lang, "Ẩn lời giải", "Hide the solution") : t(lang, "Hiện lời giải", "Show the solution")}
      </button>
      {open ? (
        <>
          <p><b>{t(lang, "Đáp số.", "Result.")}</b> <MathText text={item.answer} /></p>
          <ol className="method-steps">
            {item.steps.map((step) => <li key={step}><MathText text={step} /></li>)}
          </ol>
        </>
      ) : null}
    </article>
  );
}

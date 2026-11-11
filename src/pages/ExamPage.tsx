import { useEffect, useMemo, useState } from "react";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { usePremium, useSelling } from "../premium/license.ts";
import { thptById, topicById } from "../thpt/bank.ts";
import {
  buildPaper,
  emptyAnswers,
  EXAM_MINUTES_2025,
  scorePaper,
  shortRight,
  shortValue,
  TF_TOPIC_NAMES,
  type Answers,
  type Paper,
  type PaperScore,
} from "../thpt/exam2025.ts";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

const KEY = "ban-toan-thi2025-v1";
const HISTORY = 30;
const LIMIT_MS = EXAM_MINUTES_2025 * 60_000;

type Sitting = { seed: number; startedAt: number; answers: Answers };
type Finished = Sitting & { finishedAt: number };
type HistoryRow = { at: number; total: number; mcq: number; tf: number; short: number };
type Saved = { active: Sitting | null; last: Finished | null; history: HistoryRow[] };

const isObj = (value: unknown): value is { [key: string]: unknown } => !!value && typeof value === "object" && !Array.isArray(value);

function readAnswers(value: unknown): Answers {
  const out = emptyAnswers();
  if (!isObj(value)) return out;
  if (isObj(value.mcq)) for (const [k, v] of Object.entries(value.mcq)) if (typeof v === "number" && v >= 0 && v <= 3) out.mcq[k] = v;
  if (isObj(value.tf)) for (const [k, v] of Object.entries(value.tf)) if (typeof v === "boolean") out.tf[k] = v;
  if (isObj(value.short)) for (const [k, v] of Object.entries(value.short)) if (typeof v === "string") out.short[k] = v.slice(0, 8);
  return out;
}

function readSitting(value: unknown): Sitting | null {
  if (!isObj(value) || typeof value.seed !== "number" || typeof value.startedAt !== "number") return null;
  return { seed: value.seed >>> 0, startedAt: value.startedAt, answers: readAnswers(value.answers) };
}

function load(): Saved {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(KEY) || "null");
    if (!isObj(raw)) return { active: null, last: null, history: [] };
    const last = readSitting(raw.last);
    const finishedAt = isObj(raw.last) && typeof raw.last.finishedAt === "number" ? raw.last.finishedAt : null;
    const history = Array.isArray(raw.history)
      ? raw.history.filter((row): row is HistoryRow => isObj(row) && typeof row.at === "number" && typeof row.total === "number" && typeof row.mcq === "number" && typeof row.tf === "number" && typeof row.short === "number")
      : [];
    return { active: readSitting(raw.active), last: last && finishedAt ? { ...last, finishedAt } : null, history: history.slice(0, HISTORY) };
  } catch {
    return { active: null, last: null, history: [] };
  }
}

function save(next: Saved): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage full or blocked: the paper still works for this visit */
  }
}

function topicName(id: string): { vi: string; en: string } {
  const topic = topicById(id);
  return topic ? { vi: topic.vi, en: topic.en } : TF_TOPIC_NAMES.get(id) ?? { vi: id, en: id };
}

function clock(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h > 0 ? `${h}:` : ""}${String(m).padStart(h > 0 ? 2 : 1, "0")}:${String(s).padStart(2, "0")}`;
}

const fmt = (value: number, lang: "vi" | "en") => (lang === "vi" ? String(value).replace(".", ",") : String(value));

export function ExamPage() {
  const lang = useLang();
  const premium = usePremium();
  const [saved, setSaved] = useState<Saved>(load);
  const update = (next: Saved) => {
    setSaved(next);
    save(next);
  };
  useEffect(() => {
    document.title = t(lang, "Đề thi thử THPT · Bàn Toán", "THPT mock exam · Bàn Toán");
  }, [lang]);

  const freeLeft = saved.history.length === 0 && saved.last === null;
  const selling = useSelling();
  // Chưa mở bán Premium thì không có gì để khóa: đề thi thử dùng tự do.
  const canStart = premium.kind === "active" || freeLeft || selling === false;

  function start() {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    update({ ...saved, active: { seed: buf[0] ?? Date.now(), startedAt: Date.now(), answers: emptyAnswers() } });
    window.scrollTo(0, 0);
  }

  function finish(sitting: Sitting) {
    const paper = buildPaper(sitting.seed);
    const score = scorePaper(paper, sitting.answers, topicName);
    const finishedAt = Math.min(Date.now(), sitting.startedAt + LIMIT_MS);
    update({
      active: null,
      last: { ...sitting, finishedAt },
      history: [{ at: finishedAt, total: score.total, mcq: score.mcq, tf: score.tf, short: score.short }, ...saved.history].slice(0, HISTORY),
    });
    window.scrollTo(0, 0);
  }

  if (saved.active) {
    return <SittingView sitting={saved.active} onChange={(answers) => saved.active && update({ ...saved, active: { ...saved.active, answers } })} onFinish={finish} />;
  }

  return (
    <PageFrame
      kicker={t(lang, "Premium · Luyện THPT", "Premium · THPT practice")}
      title={t(lang, "Đề thi thử THPT", "THPT mock exam")}
      lead={t(
        lang,
        "Cấu trúc như đề thi tốt nghiệp THPT môn Toán: 12 câu trắc nghiệm, 4 câu Đúng/Sai, 6 câu trả lời ngắn, 90 phút, chấm trên thang 10. Mỗi lần bắt đầu là một đề mới.",
        "Built like the THPT graduation maths paper: 12 multiple choice, 4 true/false, 6 short answer, 90 minutes, scored out of 10. Every start draws a new paper.",
      )}
    >
      <p className="lecture-note exam-source">
        {t(
          lang,
          "Căn cứ: cấu trúc định dạng đề thi tốt nghiệp THPT áp dụng từ kỳ thi năm 2025 (Quyết định 764/QĐ-BGDĐT ngày 8/3/2024 của Bộ Giáo dục và Đào tạo). Đây là đề luyện do Bàn Toán soạn và rút ngẫu nhiên từ ngân hàng câu của Bàn Toán, không phải đề của Bộ; điểm ở đây chỉ để tự ước lượng.",
          "Basis: the THPT graduation exam format in force since the 2025 exam (Decision 764/QĐ-BGDĐT of 8 March 2024, Ministry of Education and Training). These are practice papers written by Bàn Toán and drawn at random from its own question bank, not Ministry papers; the score is only an estimate for yourself.",
        )}
      </p>
      {saved.last ? <Result finished={saved.last} /> : null}
      <section className="exam-intro" aria-labelledby="exam-how">
        <h2 id="exam-how">{t(lang, "Cách chấm", "Scoring")}</h2>
        <ul>
          <li>{t(lang, "Phần I: 12 câu × 0,25 điểm = 3 điểm.", "Part I: 12 questions × 0.25 = 3 points.")}</li>
          <li>{t(lang, "Phần II: 4 câu, mỗi câu 4 ý. Đúng 1 ý được 0,1; 2 ý 0,25; 3 ý 0,5; cả 4 ý 1 điểm. Tối đa 4 điểm.", "Part II: 4 questions of 4 statements. 1 right earns 0.1, 2 earn 0.25, 3 earn 0.5, all 4 earn 1 point. 4 points in all.")}</li>
          <li>{t(lang, "Phần III: 6 câu × 0,5 điểm = 3 điểm. Ghi một số, dấu phẩy thập phân, tối đa 4 chữ số. Trên phiếu thi thật, mỗi đáp án tô tối đa 4 ký tự, tính cả dấu trừ và dấu phẩy.", "Part III: 6 questions × 0.5 = 3 points. Write one number, at most 4 digits. On the real answer sheet each answer takes at most 4 characters, counting the minus sign and the decimal comma.")}</li>
        </ul>
        {canStart ? (
          <p>
            <button type="button" className="pay-btn" onClick={start}>
              {saved.last ? t(lang, "Làm đề mới", "Start a new paper") : t(lang, "Bắt đầu làm bài (90 phút)", "Start the paper (90 minutes)")}
            </button>
            {premium.kind !== "active" ? <small className="exam-free"> {t(lang, "Đề đầu tiên miễn phí.", "Your first paper is free.")}</small> : null}
          </p>
        ) : (
          <p className="pay-card">
            <b>{t(lang, "Bạn đã dùng đề miễn phí.", "You have used your free paper.")}</b>
            <span>{premium.kind === "checking" ? t(lang, " Đang kiểm mã Premium…", " Checking your Premium key…") : t(lang, " Premium mở đề không giới hạn, kèm bảng điểm theo chủ đề.", " Premium unlocks unlimited papers with topic breakdowns.")}</span>
            {" "}
            <A href="/nang-cap">{t(lang, "Xem Premium", "See Premium")}</A>
          </p>
        )}
      </section>
      {saved.history.length > 0 ? (
        <section className="exam-history" aria-labelledby="exam-hist">
          <h2 id="exam-hist">{t(lang, "Các lần làm", "Past papers")}</h2>
          <table>
            <thead>
              <tr>
                <th>{t(lang, "Ngày", "Date")}</th>
                <th>{t(lang, "Điểm", "Score")}</th>
                <th>I</th>
                <th>II</th>
                <th>III</th>
              </tr>
            </thead>
            <tbody>
              {saved.history.map((row) => (
                <tr key={row.at}>
                  <td>{new Date(row.at).toLocaleDateString(lang === "vi" ? "vi-VN" : "en-GB")}</td>
                  <td><b>{fmt(row.total, lang)}</b></td>
                  <td>{fmt(row.mcq, lang)}</td>
                  <td>{fmt(row.tf, lang)}</td>
                  <td>{fmt(row.short, lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}
    </PageFrame>
  );
}

function SittingView({ sitting, onChange, onFinish }: { sitting: Sitting; onChange: (answers: Answers) => void; onFinish: (sitting: Sitting) => void }) {
  const lang = useLang();
  const paper = useMemo(() => buildPaper(sitting.seed), [sitting.seed]);
  const [now, setNow] = useState(() => Date.now());
  const left = sitting.startedAt + LIMIT_MS - now;
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (left <= 0) onFinish(sitting);
  }, [left, onFinish, sitting]);

  const { answers } = sitting;
  const done = Object.keys(answers.mcq).length + paper.tf.reduce((n, _, qi) => n + [0, 1, 2, 3].filter((si) => `${qi}:${si}` in answers.tf).length, 0) + paper.short.filter((id) => (answers.short[id] ?? "").trim() !== "").length;
  const total = paper.mcq.length + paper.tf.length * 4 + paper.short.length;

  function submit() {
    if (done < total && !window.confirm(t(lang, `Còn ${total - done} ý chưa làm. Nộp bài?`, `${total - done} items are unanswered. Submit anyway?`))) return;
    onFinish(sitting);
  }

  return (
    <PageFrame kicker={t(lang, "Đề thi thử THPT", "THPT mock exam")} title={t(lang, "Đang làm bài", "Paper in progress")}>
      <div className="exam-bar" role="timer" aria-live="off">
        <span>{t(lang, "Còn", "Left")} <b>{clock(left)}</b></span>
        <span>{t(lang, `Đã làm ${done}/${total}`, `Answered ${done}/${total}`)}</span>
        <button type="button" className="pay-btn" onClick={submit}>{t(lang, "Nộp bài", "Submit")}</button>
      </div>

      <section className="exam-part" aria-labelledby="part1">
        <h2 id="part1">{t(lang, "Phần I. Trắc nghiệm nhiều lựa chọn", "Part I. Multiple choice")}</h2>
        {paper.mcq.map((id, index) => {
          const question = thptById.get(id);
          if (!question) return null;
          return (
            <article key={id} className="exam-q">
              <h3><span className="exam-no">{t(lang, `Câu ${index + 1}.`, `Q${index + 1}.`)}</span> <MathText text={question.prompt} /></h3>
              <div className="choices" role="group" aria-label={t(lang, `Câu ${index + 1}`, `Question ${index + 1}`)}>
                {question.choices.map((choice, at) => (
                  <button key={at} type="button" className="choice" aria-pressed={answers.mcq[id] === at} onClick={() => onChange({ ...answers, mcq: { ...answers.mcq, [id]: at } })}>
                    <span className="key">{String.fromCharCode(65 + at)}</span>
                    <span className="choice-body"><MathText text={choice} /></span>
                  </button>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <section className="exam-part" aria-labelledby="part2">
        <h2 id="part2">{t(lang, "Phần II. Đúng/Sai", "Part II. True/false")}</h2>
        {paper.tf.map((question, qi) => (
          <article key={question.id} className="exam-q">
            <h3><span className="exam-no">{t(lang, `Câu ${qi + 1}.`, `Q${qi + 1}.`)}</span> <MathText text={lang === "en" ? question.contextEn : question.contextVi} /></h3>
            <ol className="exam-tf" type="a">
              {question.statements.map((statement, si) => {
                const key = `${qi}:${si}`;
                return (
                  <li key={si}>
                    <span className="exam-tf-text"><MathText text={lang === "en" ? statement.en : statement.vi} /></span>
                    <span className="exam-tf-pick" role="group" aria-label={t(lang, `Ý ${"abcd"[si]}`, `Statement ${"abcd"[si]}`)}>
                      <button type="button" className="text-btn" aria-pressed={answers.tf[key] === true} onClick={() => onChange({ ...answers, tf: { ...answers.tf, [key]: true } })}>{t(lang, "Đúng", "True")}</button>
                      <button type="button" className="text-btn" aria-pressed={answers.tf[key] === false} onClick={() => onChange({ ...answers, tf: { ...answers.tf, [key]: false } })}>{t(lang, "Sai", "False")}</button>
                    </span>
                  </li>
                );
              })}
            </ol>
          </article>
        ))}
      </section>

      <section className="exam-part" aria-labelledby="part3">
        <h2 id="part3">{t(lang, "Phần III. Trả lời ngắn", "Part III. Short answer")}</h2>
        {paper.short.map((id, index) => {
          const question = thptById.get(id);
          if (!question) return null;
          return (
            <article key={id} className="exam-q">
              <h3><span className="exam-no">{t(lang, `Câu ${index + 1}.`, `Q${index + 1}.`)}</span> <MathText text={question.prompt} /></h3>
              <label className="exam-short">
                <span>{t(lang, "Đáp số", "Answer")}</span>
                <input
                  inputMode="decimal"
                  maxLength={7}
                  value={answers.short[id] ?? ""}
                  onChange={(event) => onChange({ ...answers, short: { ...answers.short, [id]: event.target.value } })}
                  aria-label={t(lang, `Đáp số câu ${index + 1}`, `Answer to question ${index + 1}`)}
                />
              </label>
            </article>
          );
        })}
      </section>
      <p><button type="button" className="pay-btn" onClick={submit}>{t(lang, "Nộp bài", "Submit")}</button></p>
    </PageFrame>
  );
}

function Result({ finished }: { finished: Finished }) {
  const lang = useLang();
  const paper: Paper = useMemo(() => buildPaper(finished.seed), [finished.seed]);
  const score: PaperScore = useMemo(() => scorePaper(paper, finished.answers, topicName), [paper, finished.answers]);
  const { answers } = finished;
  const minutes = Math.round((finished.finishedAt - finished.startedAt) / 60000);
  return (
    <section className="exam-result" aria-labelledby="exam-score">
      <h2 id="exam-score">{t(lang, `Điểm lần gần nhất: ${fmt(score.total, lang)}/10`, `Last score: ${fmt(score.total, lang)}/10`)}</h2>
      <p>
        {t(lang,
          `Phần I ${fmt(score.mcq, lang)}/3 (${score.mcqRight}/12 câu) · Phần II ${fmt(score.tf, lang)}/4 (${score.tfStatementsRight}/16 ý) · Phần III ${fmt(score.short, lang)}/3 (${score.shortRight}/6 câu) · ${minutes} phút`,
          `Part I ${score.mcq}/3 (${score.mcqRight}/12) · Part II ${score.tf}/4 (${score.tfStatementsRight}/16 statements) · Part III ${score.short}/3 (${score.shortRight}/6) · ${minutes} min`)}
      </p>
      {score.losses.length > 0 ? (
        <>
          <h3>{t(lang, "Mất điểm nhiều nhất ở", "Most points lost in")}</h3>
          <ul className="exam-losses">
            {score.losses.slice(0, 5).map((loss) => (
              <li key={loss.topic}>{lang === "en" ? loss.en : loss.vi}: −{fmt(loss.lost, lang)}</li>
            ))}
          </ul>
        </>
      ) : null}
      <details className="exam-review">
        <summary>{t(lang, "Xem lại từng câu kèm lời giải", "Review every question with solutions")}</summary>
        <h3>{t(lang, "Phần I", "Part I")}</h3>
        {paper.mcq.map((id, index) => {
          const question = thptById.get(id);
          if (!question) return null;
          const picked = answers.mcq[id];
          const right = picked === question.answer;
          return (
            <article key={id} className={`exam-q ${right ? "is-right" : "is-wrong"}`}>
              <h4>{right ? "✓" : "✗"} {t(lang, `Câu ${index + 1}.`, `Q${index + 1}.`)} <MathText text={question.prompt} /></h4>
              <p>
                {t(lang, "Đáp án: ", "Answer: ")}<b>{String.fromCharCode(65 + question.answer)}</b> <MathText text={question.choices[question.answer]} />
                {picked !== undefined && !right ? <> · {t(lang, "Bạn chọn ", "You chose ")}{String.fromCharCode(65 + picked)}</> : null}
                {picked === undefined ? <> · {t(lang, "Bỏ trống", "Left blank")}</> : null}
              </p>
              <ol>{question.steps.map((step) => <li key={step}><MathText text={step} /></li>)}</ol>
            </article>
          );
        })}
        <h3>{t(lang, "Phần II", "Part II")}</h3>
        {paper.tf.map((question, qi) => (
          <article key={question.id} className="exam-q">
            <h4>{t(lang, `Câu ${qi + 1}.`, `Q${qi + 1}.`)} <MathText text={lang === "en" ? question.contextEn : question.contextVi} /></h4>
            <ol type="a">
              {question.statements.map((statement, si) => {
                const mine = answers.tf[`${qi}:${si}`];
                const ok = mine === statement.truth;
                return (
                  <li key={si}>
                    {ok ? "✓" : "✗"} <MathText text={lang === "en" ? statement.en : statement.vi} /> — <b>{statement.truth ? t(lang, "Đúng", "True") : t(lang, "Sai", "False")}</b>
                    {mine === undefined ? <> ({t(lang, "bỏ trống", "blank")})</> : null}
                    <br /><small><MathText text={lang === "en" ? statement.whyEn : statement.whyVi} /></small>
                  </li>
                );
              })}
            </ol>
          </article>
        ))}
        <h3>{t(lang, "Phần III", "Part III")}</h3>
        {paper.short.map((id, index) => {
          const question = thptById.get(id);
          if (!question) return null;
          const typed = answers.short[id] ?? "";
          const right = shortRight(question, typed);
          return (
            <article key={id} className={`exam-q ${right ? "is-right" : "is-wrong"}`}>
              <h4>{right ? "✓" : "✗"} {t(lang, `Câu ${index + 1}.`, `Q${index + 1}.`)} <MathText text={question.prompt} /></h4>
              <p>
                {t(lang, "Đáp số: ", "Answer: ")}<b>{fmt(shortValue(question) ?? 0, lang)}</b>
                {" · "}{typed.trim() ? t(lang, `Bạn ghi ${typed.trim()}`, `You wrote ${typed.trim()}`) : t(lang, "Bỏ trống", "Left blank")}
              </p>
              <ol>{question.steps.map((step) => <li key={step}><MathText text={step} /></li>)}</ol>
            </article>
          );
        })}
      </details>
    </section>
  );
}

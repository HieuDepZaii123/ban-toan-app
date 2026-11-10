import { useEffect, useMemo, useState, type ReactNode } from "react";
import { freshSeed } from "../lib/prng.ts";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import type { Lang } from "../lib/math.ts";
import { THPT_GRADES, inScope, thptBank, thptById, thptTopics, topicById, type ThptQuestion } from "../thpt/bank.ts";
import {
  EXAM_MINUTES,
  EXAM_SIZES,
  THPT_KEY,
  answerExam,
  answerPractice,
  cancelExam,
  finishExam,
  freshIds,
  parseThptBag,
  pickExam,
  resetProgress,
  scoreOf10,
  secondsLeft,
  setScope,
  startExam,
  tally,
  tallyBy,
  wrongIds,
  type Tally,
  type ThptBag,
} from "../thpt/store.ts";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { CardNav, PracticeBar } from "../ui/PracticeBar.tsx";
import { useLang } from "../ui/useLang.ts";

type View = { kind: "home" } | { kind: "practice"; ids: string[]; title: string } | { kind: "exam" } | { kind: "result" };

function loadBag(): ThptBag {
  try { return parseThptBag(localStorage.getItem(THPT_KEY)); } catch { return parseThptBag(null); }
}

function saveBag(bag: ThptBag) {
  try { localStorage.setItem(THPT_KEY, JSON.stringify(bag)); } catch { /* ignore */ }
}

const topicName = (lang: Lang, id: string) => {
  const topic = topicById(id);
  return topic ? (lang === "en" ? topic.en : topic.vi) : id;
};
const percent = (item: Tally) => (item.done ? `${Math.round((item.right / item.done) * 100)}%` : "–");
const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
const score10 = (lang: Lang, right: number, total: number) => {
  const value = scoreOf10(right, total);
  return lang === "en" ? String(value) : String(value).replace(".", ",");
};

export function ThptPracticePage() {
  const lang = useLang();
  const [bag, setBag] = useState(loadBag);
  const [view, setView] = useState<View>(() => (loadBag().active ? { kind: "exam" } : { kind: "home" }));
  const update = (next: ThptBag) => {
    setBag(next);
    saveBag(next);
  };

  const body =
    view.kind === "practice" ? <PracticeRun bag={bag} update={update} ids={view.ids} title={view.title} onExit={() => setView({ kind: "home" })} />
    : view.kind === "exam" && bag.active ? <ExamRun bag={bag} update={update} onDone={() => setView({ kind: "result" })} onExit={() => setView({ kind: "home" })} />
    : view.kind === "result" && bag.last ? <ExamResult bag={bag} onExit={() => setView({ kind: "home" })} />
    : <Home bag={bag} update={update} setView={setView} />;

  return (
    <PageFrame
      kicker={t(lang, "THPT lớp 10–12", "Upper secondary, grades 10–12")}
      title={t(lang, "Luyện THPT", "Upper-secondary practice")}
      lead={t(lang, `${thptBank.length} câu có lời giải, theo lớp và chủ đề. Luyện, ôn câu sai, hoặc thi thử có giờ.`, `${thptBank.length} worked questions by grade and topic. Practise, review misses, or sit a timed mock exam.`)}
    >
      {body}
    </PageFrame>
  );
}

/* ---------- bảng điều khiển ---------- */

function Home({ bag, update, setView }: { bag: ThptBag; update: (bag: ThptBag) => void; setView: (view: View) => void }) {
  const lang = useLang();
  const [size, setSize] = useState<number>(20);
  const [minutes, setMinutes] = useState<number>(30);
  const gradeTopics = thptTopics.filter((topic) => bag.grades.includes(topic.grade));
  const chosen = bag.topics.length ? bag.topics.filter((id) => gradeTopics.some((topic) => topic.id === id)) : gradeTopics.map((topic) => topic.id);
  const scope = inScope(bag.grades, bag.topics.length ? chosen : []);
  const misses = wrongIds(scope, bag.picks);
  const fresh = freshIds(scope, bag.picks);
  const overall = tally(thptBank, bag.picks);
  const byTopic = tallyBy(thptBank, bag.picks, (item) => (item as ThptQuestion).topic);
  const byGrade = tallyBy(thptBank, bag.picks, (item) => (item as ThptQuestion).grade);

  const toggleGrade = (grade: number) => {
    const next = bag.grades.includes(grade) ? bag.grades.filter((item) => item !== grade) : [...bag.grades, grade].sort((a, b) => a - b);
    if (next.length) update(setScope(bag, next, bag.topics.filter((id) => next.includes(topicById(id)?.grade ?? 0))));
  };
  const toggleTopic = (id: string) => {
    const next = chosen.includes(id) ? chosen.filter((item) => item !== id) : [...chosen, id];
    if (next.length === 0) return;
    update(setScope(bag, bag.grades, next.length === gradeTopics.length ? [] : next));
  };
  const practise = (ids: string[], title: string) => {
    if (ids.length) setView({ kind: "practice", ids, title });
  };
  const begin = () => {
    const ids = pickExam(scope, size, freshSeed());
    if (!ids.length) return;
    update(startExam(bag, ids, minutes, bag.grades, Date.now()));
    setView({ kind: "exam" });
  };

  return (
    <>
      <PracticeBar total={overall.total} right={overall.right} wrong={overall.done - overall.right} />

      {bag.active ? (
        <section className="stream tool-card">
          <h2>{t(lang, "Bài thi đang làm dở", "Exam in progress")}</h2>
          <p>{t(lang, `Đã trả lời ${Object.keys(bag.active.answers).length}/${bag.active.ids.length} câu.`, `Answered ${Object.keys(bag.active.answers).length}/${bag.active.ids.length}.`)}</p>
          <div className="read-switch">
            <button type="button" onClick={() => setView({ kind: "exam" })}>{t(lang, "Làm tiếp", "Resume")}</button>
            <button type="button" onClick={() => update(cancelExam(bag))}>{t(lang, "Hủy bài thi", "Discard exam")}</button>
          </div>
        </section>
      ) : null}

      <section className="stream">
        <h2>{t(lang, "Phạm vi", "Scope")}</h2>
        <div className="chips" role="group" aria-label={t(lang, "Lớp", "Grades")}>
          {THPT_GRADES.map((grade) => (
            <button key={grade} type="button" aria-pressed={bag.grades.includes(grade)} onClick={() => toggleGrade(grade)}>{t(lang, `Lớp ${grade}`, `Grade ${grade}`)}</button>
          ))}
        </div>
        <details className="fold" open={bag.topics.length > 0}>
          <summary>
            {bag.topics.length > 0
              ? t(lang, `Chủ đề: ${chosen.length}/${gradeTopics.length} đang chọn`, `Topics: ${chosen.length}/${gradeTopics.length} chosen`)
              : t(lang, `Chủ đề: tất cả ${gradeTopics.length}`, `Topics: all ${gradeTopics.length}`)}
          </summary>
          {bag.grades.map((grade) => (
            <div key={grade} className="thpt-topics">
              <p className="lecture-note">{t(lang, `Chủ đề lớp ${grade}`, `Grade ${grade} topics`)}</p>
              <div className="chips" role="group" aria-label={t(lang, `Chủ đề lớp ${grade}`, `Grade ${grade} topics`)}>
                {gradeTopics.filter((topic) => topic.grade === grade).map((topic) => (
                  <button key={topic.id} type="button" aria-pressed={chosen.includes(topic.id)} onClick={() => toggleTopic(topic.id)}>{lang === "en" ? topic.en : topic.vi}</button>
                ))}
              </div>
            </div>
          ))}
          <div className="read-switch">
            <button type="button" disabled={bag.topics.length === 0} onClick={() => update(setScope(bag, bag.grades, []))}>{t(lang, "Chọn mọi chủ đề", "All topics")}</button>
          </div>
        </details>
        <p className="lecture-note">{t(lang, `Trong phạm vi: ${scope.length} câu · Chưa làm ${fresh.length} · Đang sai ${misses.length}`, `In scope: ${scope.length} · Not done ${fresh.length} · Wrong ${misses.length}`)}</p>
      </section>

      <section className="stream">
        <h2>{t(lang, "Luyện tập", "Practice")}</h2>
        <p>{t(lang, "Chọn đáp án là thấy ngay đúng sai và lời giải từng bước.", "Pick an answer to see right or wrong and the worked steps at once.")}</p>
        <div className="read-switch">
          <button type="button" disabled={!scope.length} onClick={() => practise(scope.map((item) => item.id), t(lang, "Toàn bộ phạm vi", "Whole scope"))}>{t(lang, `Lần lượt (${scope.length})`, `In order (${scope.length})`)}</button>
          <button type="button" disabled={!fresh.length} onClick={() => practise(fresh, t(lang, "Câu chưa làm", "Not done yet"))}>{t(lang, `Câu chưa làm (${fresh.length})`, `Not done (${fresh.length})`)}</button>
          <button type="button" disabled={!misses.length} onClick={() => practise(misses, t(lang, "Ôn câu sai", "Review misses"))}>{t(lang, `Ôn câu sai (${misses.length})`, `Review misses (${misses.length})`)}</button>
        </div>
      </section>

      <section className="stream">
        <h2>{t(lang, "Thi thử", "Mock exam")}</h2>
        <p className="exam-2025">
          <A href="/thi-thu">{t(lang, "Đề chuẩn 2025", "2025-format paper")}</A>
          <span>{t(lang, "12 trắc nghiệm, 4 Đúng/Sai, 6 trả lời ngắn, 90 phút, chấm như đề thật.", "12 multiple choice, 4 true/false, 6 short answer, 90 minutes, scored like the real paper.")}</span>
        </p>
        <p>{t(lang, "Đề lấy ngẫu nhiên trong phạm vi, rải đều các chủ đề. Chỉ chấm khi nộp bài.", "Questions are drawn at random from the scope, spread across topics. Marked only when you submit.")}</p>
        <p className="lecture-note">{t(lang, "Số câu", "Questions")}</p>
        <div className="chips" role="group" aria-label={t(lang, "Số câu", "Questions")}>
          {EXAM_SIZES.map((value) => <button key={value} type="button" aria-pressed={size === value} onClick={() => setSize(value)}>{value}</button>)}
        </div>
        <p className="lecture-note">{t(lang, "Thời gian", "Time limit")}</p>
        <div className="chips" role="group" aria-label={t(lang, "Thời gian", "Time limit")}>
          {EXAM_MINUTES.map((value) => (
            <button key={value} type="button" aria-pressed={minutes === value} onClick={() => setMinutes(value)}>{value ? t(lang, `${value} phút`, `${value} min`) : t(lang, "Không giới hạn", "No limit")}</button>
          ))}
        </div>
        <div className="read-switch">
          <button type="button" disabled={!scope.length || !!bag.active} onClick={begin}>
            {t(lang, `Bắt đầu thi ${Math.min(size, scope.length)} câu`, `Start ${Math.min(size, scope.length)}-question exam`)}
          </button>
        </div>
      </section>

      <section className="stream">
        <details className="fold">
          <summary>{t(lang, "Tiến độ theo chủ đề", "Progress by topic")}</summary>
        <div className="thpt-scroll">
          <table className="thpt-table">
            <thead>
              <tr>
                <th scope="col">{t(lang, "Chủ đề", "Topic")}</th>
                <th scope="col">{t(lang, "Đã làm", "Done")}</th>
                <th scope="col">{t(lang, "Đúng", "Right")}</th>
                <th scope="col">{t(lang, "Tỉ lệ", "Rate")}</th>
                <th scope="col"><span className="sr-only">{t(lang, "Luyện", "Practise")}</span></th>
              </tr>
            </thead>
            {THPT_GRADES.map((grade) => {
              const row = byGrade.get(grade) ?? { total: 0, done: 0, right: 0 };
              return (
                <tbody key={grade}>
                  <tr className="thpt-grade">
                    <th scope="rowgroup">{t(lang, `Lớp ${grade}`, `Grade ${grade}`)}</th>
                    <td>{row.done}/{row.total}</td>
                    <td>{row.right}</td>
                    <td>{percent(row)}</td>
                    <td />
                  </tr>
                  {thptTopics.filter((topic) => topic.grade === grade).map((topic) => {
                    const item = byTopic.get(topic.id) ?? { total: 0, done: 0, right: 0 };
                    const ids = thptBank.filter((question) => question.topic === topic.id).map((question) => question.id);
                    return (
                      <tr key={topic.id}>
                        <th scope="row">{lang === "en" ? topic.en : topic.vi}</th>
                        <td>{item.done}/{item.total}</td>
                        <td>{item.right}</td>
                        <td>{percent(item)}</td>
                        <td><button type="button" className="thpt-link" onClick={() => practise(ids, lang === "en" ? topic.en : topic.vi)}>{t(lang, "Luyện", "Practise")}</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              );
            })}
          </table>
        </div>
        </details>
      </section>

      <section className="stream">
        <h2>{t(lang, "Lịch sử thi thử", "Exam history")}</h2>
        {bag.exams.length === 0 ? <p>{t(lang, "Chưa có bài thi nào.", "No exams yet.")}</p> : (
          <div className="thpt-scroll">
            <table className="thpt-table">
              <thead>
                <tr>
                  <th scope="col">{t(lang, "Lúc", "When")}</th>
                  <th scope="col">{t(lang, "Lớp", "Grades")}</th>
                  <th scope="col">{t(lang, "Đúng", "Right")}</th>
                  <th scope="col">{t(lang, "Điểm", "Score")}</th>
                  <th scope="col">{t(lang, "Thời gian", "Time")}</th>
                </tr>
              </thead>
              <tbody>
                {bag.exams.map((exam) => (
                  <tr key={exam.at}>
                    <th scope="row">{new Date(exam.at).toLocaleString(lang === "en" ? "en-GB" : "vi-VN", { dateStyle: "short", timeStyle: "short" })}</th>
                    <td>{exam.grades.join(", ")}</td>
                    <td>{exam.right}/{exam.total}</td>
                    <td>{score10(lang, exam.right, exam.total)}</td>
                    <td>{clock(exam.seconds)}{exam.limit ? ` / ${exam.limit}′` : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="read-switch">
          {bag.last ? <button type="button" onClick={() => setView({ kind: "result" })}>{t(lang, "Xem lại bài thi gần nhất", "Review the last exam")}</button> : null}
          <button
            type="button"
            disabled={overall.done === 0 && bag.exams.length === 0}
            onClick={() => { if (window.confirm(t(lang, "Xóa toàn bộ kết quả luyện THPT và lịch sử thi?", "Clear all upper-secondary results and exam history?"))) update(resetProgress(bag)); }}
          >
            {t(lang, "Xóa tiến độ", "Clear progress")}
          </button>
        </div>
      </section>
    </>
  );
}

/* ---------- luyện tập ---------- */

function PracticeRun({ bag, update, ids, title, onExit }: { bag: ThptBag; update: (bag: ThptBag) => void; ids: string[]; title: string; onExit: () => void }) {
  const lang = useLang();
  const items = useMemo(() => ids.map((id) => thptById.get(id)).filter((item): item is ThptQuestion => !!item), [ids]);
  const [index, setIndex] = useState(() => Math.max(0, bag.at ? ids.indexOf(bag.at) : 0));
  const question = items[index] ?? items[0];
  if (!question) return <p>{t(lang, "Không còn câu nào trong mục này.", "Nothing left here.")}</p>;
  const picked = bag.picks[question.id];
  const run = tally(items, bag.picks);
  const move = (delta: number) => setIndex((index + delta + items.length) % items.length);
  const retry = () => {
    const picks = { ...bag.picks };
    delete picks[question.id];
    update({ ...bag, picks });
  };

  return (
    <>
      <p><button type="button" className="thpt-link" onClick={onExit}>{t(lang, "← Về bảng luyện", "← Back to the board")}</button></p>
      <h2>{title}</h2>
      <PracticeBar total={items.length} right={run.right} wrong={run.done - run.right} index={index} />
      <QuestionCard
        question={question}
        picked={picked}
        reveal={picked !== undefined}
        onChoose={(choice) => { if (picked === undefined) update(answerPractice(bag, question.id, choice)); }}
        footer={<CardNav onMove={move} extra={picked !== undefined ? <button type="button" onClick={retry}>{t(lang, "Làm lại câu này", "Try again")}</button> : null} />}
      />
    </>
  );
}

/* ---------- thi thử ---------- */

function ExamRun({ bag, update, onDone, onExit }: { bag: ThptBag; update: (bag: ThptBag) => void; onDone: () => void; onExit: () => void }) {
  const lang = useLang();
  const active = bag.active!;
  const [index, setIndex] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const left = secondsLeft(active, now);
  const submit = () => {
    update(finishExam(bag, (id) => thptById.get(id)?.answer, Date.now()));
    onDone();
  };
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  useEffect(() => {
    if (left === 0) submit();
  }, [left]);

  const question = thptById.get(active.ids[index] ?? "");
  const answered = Object.keys(active.answers).length;
  const elapsed = Math.max(0, Math.round((now - active.startedAt) / 1000));
  const confirmSubmit = () => {
    const missing = active.ids.length - answered;
    if (missing === 0 || window.confirm(t(lang, `Còn ${missing} câu chưa trả lời. Vẫn nộp bài?`, `${missing} questions are unanswered. Submit anyway?`))) submit();
  };

  return (
    <>
      <p><button type="button" className="thpt-link" onClick={onExit}>{t(lang, "← Về bảng luyện (bài thi vẫn được giữ)", "← Back to the board (the exam is kept)")}</button></p>
      <div className="thpt-exambar" role="status">
        <b>{t(lang, `Câu ${index + 1}/${active.ids.length}`, `Question ${index + 1}/${active.ids.length}`)}</b>
        <span>{t(lang, `Đã trả lời ${answered}`, `Answered ${answered}`)}</span>
        <span>{left === null ? t(lang, `Đã làm ${clock(elapsed)}`, `Elapsed ${clock(elapsed)}`) : t(lang, `Còn ${clock(left)}`, `${clock(left)} left`)}</span>
      </div>
      <div className="thpt-palette" role="group" aria-label={t(lang, "Danh sách câu", "Question list")}>
        {active.ids.map((id, at) => (
          <button key={id} type="button" aria-current={at === index ? "true" : undefined} className={active.answers[id] !== undefined ? "is-done" : ""} onClick={() => setIndex(at)}>{at + 1}</button>
        ))}
      </div>
      {question ? (
        <QuestionCard question={question} picked={active.answers[question.id]} reveal={false} onChoose={(choice) => update(answerExam(bag, question.id, choice))} />
      ) : null}
      <div className="read-switch">
        <button type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}>{t(lang, "Câu trước", "Previous")}</button>
        <button type="button" disabled={index === active.ids.length - 1} onClick={() => setIndex(index + 1)}>{t(lang, "Câu sau", "Next")}</button>
        <button type="button" onClick={confirmSubmit}>{t(lang, "Nộp bài", "Submit")}</button>
      </div>
    </>
  );
}

function ExamResult({ bag, onExit }: { bag: ThptBag; onExit: () => void }) {
  const lang = useLang();
  const last = bag.last!;
  const items = last.ids.map((id) => thptById.get(id)).filter((item): item is ThptQuestion => !!item);
  const byTopic = tallyBy(items, last.answers, (item) => (item as ThptQuestion).topic);
  const { record } = last;

  return (
    <>
      <p><button type="button" className="thpt-link" onClick={onExit}>{t(lang, "← Về bảng luyện", "← Back to the board")}</button></p>
      <section className="tool-card">
        <h2>{t(lang, `Điểm ${score10(lang, record.right, record.total)}/10`, `Score ${score10(lang, record.right, record.total)}/10`)}</h2>
        <p>{t(lang, `Đúng ${record.right}/${record.total} câu · Thời gian ${clock(record.seconds)}${record.limit ? ` trên ${record.limit} phút` : ""}`, `${record.right}/${record.total} right · Time ${clock(record.seconds)}${record.limit ? ` of ${record.limit} min` : ""}`)}</p>
      </section>
      <section className="stream">
        <h2>{t(lang, "Theo chủ đề", "By topic")}</h2>
        <div className="thpt-scroll">
          <table className="thpt-table">
            <thead><tr><th scope="col">{t(lang, "Chủ đề", "Topic")}</th><th scope="col">{t(lang, "Đúng", "Right")}</th></tr></thead>
            <tbody>
              {[...byTopic].map(([topic, item]) => (
                <tr key={String(topic)}><th scope="row">{topicName(lang, String(topic))}</th><td>{item.right}/{item.total}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="stream">
        <h2>{t(lang, "Xem lại từng câu", "Review each question")}</h2>
        {items.map((item, at) => {
          const pick = last.answers[item.id];
          const state = pick === undefined ? t(lang, "bỏ trống", "blank") : pick === item.answer ? t(lang, "đúng", "right") : t(lang, "sai", "wrong");
          return (
            <details key={item.id} className="thpt-review">
              <summary>{t(lang, `Câu ${at + 1}`, `Question ${at + 1}`)} · {topicName(lang, item.topic)} · <b>{state}</b></summary>
              <QuestionCard question={item} picked={pick} reveal onChoose={() => undefined} />
            </details>
          );
        })}
      </section>
    </>
  );
}

/* ---------- câu hỏi ---------- */

function QuestionCard({ question, picked, reveal, onChoose, footer }: { question: ThptQuestion; picked: number | undefined; reveal: boolean; onChoose: (choice: number) => void; footer?: ReactNode }) {
  const lang = useLang();
  return (
    <article className="tool-card">
      <p className="lecture-note">{t(lang, `Lớp ${question.grade}`, `Grade ${question.grade}`)} · {topicName(lang, question.topic)}</p>
      <h3><MathText text={question.prompt} /></h3>
      <div className="choices" role="group" aria-label={t(lang, "Các lựa chọn", "Choices")}>
        {question.choices.map((choice, at) => {
          const state = !reveal ? "" : at === question.answer ? " is-right" : picked === at ? " is-wrong" : "";
          return (
            <button key={choice} type="button" className={`choice${state}`} aria-pressed={!reveal ? picked === at : undefined} disabled={reveal} onClick={() => onChoose(at)}>
              <span className="key">{String.fromCharCode(65 + at)}</span>
              <span className="choice-body"><MathText text={choice} /></span>
            </button>
          );
        })}
      </div>
      {reveal ? (
        <div className="solution">
          <p><b>{picked === undefined ? t(lang, "Chưa trả lời.", "Not answered.") : picked === question.answer ? t(lang, "Đúng.", "Right.") : t(lang, "Chưa đúng.", "Not yet.")}</b></p>
          <ol className="method-steps">{question.steps.map((step) => <li key={step}><MathText text={step} /></li>)}</ol>
        </div>
      ) : null}
      {footer}
    </article>
  );
}

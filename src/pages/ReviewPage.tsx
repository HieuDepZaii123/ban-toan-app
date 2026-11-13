import { useEffect, useState } from "react";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { usePremium } from "../premium/license.ts";
import { thptById, topicById } from "../thpt/bank.ts";
import { shortRight, TF_TOPIC_NAMES } from "../thpt/exam2025.ts";
import { answerCard, DAY_MS, dueCards, INTERVAL_DAYS, loadReview, saveReview, schedule, weakTopics, type ReviewKind, type ReviewState } from "../thpt/review.ts";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

/** The card on screen after it was answered: it is no longer due, but its solution stays up until "Next". */
type Shown = { id: string; kind: ReviewKind; right: boolean; picked?: number; typed?: string; days: number | null };

function topicName(id: string, lang: "vi" | "en"): string {
  const topic = topicById(id) ?? TF_TOPIC_NAMES.get(id);
  return topic ? (lang === "en" ? topic.en : topic.vi) : id;
}

/** Wall clock for event handlers (answers and "Next"), kept out of render. */
const clockNow = (): number => Date.now();

const fmt = (value: number, lang: "vi" | "en") => (lang === "vi" ? String(value).replace(".", ",") : String(value));

export function ReviewPage() {
  const lang = useLang();
  const premium = usePremium();
  const [state, setState] = useState<ReviewState>(loadReview);
  const [now, setNow] = useState(() => Date.now());
  const [shown, setShown] = useState<Shown | null>(null);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    document.title = t(lang, "Kế hoạch ôn lỗi sai · Bàn Toán", "Mistake review plan · Bàn Toán");
  }, [lang]);

  const plan = schedule(state, now);
  const due = dueCards(state, now);
  const weak = weakTopics(state);
  const isPremium = premium.kind === "active";
  const activeId = shown?.id ?? due[0]?.id;
  const card = state.cards.find((item) => item.id === activeId);
  const question = activeId ? thptById.get(activeId) : undefined;
  const kind: ReviewKind = shown?.kind ?? card?.kind ?? "mcq";
  const nextDue = state.cards.length ? Math.min(...state.cards.map((item) => item.due)) : null;

  function answer(id: string, kind: ReviewKind, right: boolean, extra: { picked?: number; typed?: string }) {
    const at = clockNow();
    const next = answerCard(state, id, right, at);
    const after = next.cards.find((item) => item.id === id);
    setState(next);
    saveReview(next);
    setShown({ id, kind, right, ...extra, days: after ? Math.round((after.due - at) / DAY_MS) : null });
  }

  function advance() {
    setShown(null);
    setTyped("");
    setNow(clockNow());
    window.scrollTo(0, 0);
  }

  return (
    <PageFrame
      kicker={t(lang, "Premium · Luyện THPT", "Premium · THPT practice")}
      title={t(lang, "Kế hoạch ôn lỗi sai", "Mistake review plan")}
      lead={t(
        lang,
        "Câu sai trong đề thi thử tự vào đây và quay lại sau 1, 3, 7 rồi 14 ngày. Làm đúng đủ bốn lần cách nhau thì câu đó coi như đã thuộc.",
        "Questions you miss in mock exams land here and come back after 1, 3, 7 and then 14 days. Four right answers spaced apart and the question counts as learned.",
      )}
    >
      {state.papers === 0 ? (
        <p className="pay-card">
          <b>{t(lang, "Chưa có đề nào được chấm.", "No scored paper yet.")}</b>
          <span>{t(lang, " Làm một đề thi thử, câu sai sẽ tự vào kế hoạch.", " Sit a mock exam and your missed questions are added to the plan.")}</span>{" "}
          <A href="/thi-thu">{t(lang, "Làm đề thi thử 2025", "Take a 2025 mock exam")}</A>
        </p>
      ) : (
        <>
          <ul className="review-plan" aria-label={t(lang, "Lịch ôn", "Review schedule")}>
            <li><b>{plan.today}</b><span>{t(lang, "hôm nay", "today")}</span></li>
            <li><b>{plan.tomorrow}</b><span>{t(lang, "ngày mai", "tomorrow")}</span></li>
            <li><b>{plan.week + plan.later}</b><span>{t(lang, "sau đó", "later")}</span></li>
            <li><b>{state.mastered}</b><span>{t(lang, "đã thuộc", "learned")}</span></li>
          </ul>

          {!isPremium ? (
            <p className="pay-card" id="review-upgrade">
              <b>{t(lang, `${plan.total} câu sai đang chờ ôn.`, `${plan.total} missed questions are waiting.`)}</b>
              <span>
                {premium.kind === "checking"
                  ? t(lang, " Đang kiểm mã Premium…", " Checking your Premium key…")
                  : t(lang, " Kế hoạch ôn lỗi sai là tính năng Premium: ôn đúng câu mình sai, đúng ngày cần ôn.", " The review plan is a Premium feature: the questions you missed, on the day you need them.")}
              </span>{" "}
              <A href="/nang-cap">{t(lang, "Xem Premium", "See Premium")}</A>
            </p>
          ) : question && activeId ? (
            <section className="review-card" aria-labelledby="review-q">
              <p className="lecture-note">
                {topicName(question.topic, lang)}
                {" · "}
                {shown
                  ? t(lang, `còn ${due.length} câu hôm nay`, `${due.length} left today`)
                  : t(lang, `còn ${due.length} câu hôm nay · lần ôn ${(card?.box ?? 0) + 1}/${INTERVAL_DAYS.length}`, `${due.length} left today · review ${(card?.box ?? 0) + 1} of ${INTERVAL_DAYS.length}`)}
              </p>
              <h2 id="review-q" className="review-prompt"><MathText text={question.prompt} /></h2>
              {kind === "mcq" ? (
                <div className="choices" role="group" aria-label={t(lang, "Lựa chọn", "Choices")}>
                  {question.choices.map((choice, at) => {
                    const mark = !shown ? "" : at === question.answer ? " is-right" : at === shown.picked ? " is-wrong" : "";
                    return (
                      <button key={at} type="button" className={`choice${mark}`} disabled={!!shown} onClick={() => answer(activeId, "mcq", at === question.answer, { picked: at })}>
                        <span className="key">{String.fromCharCode(65 + at)}</span>
                        <span className="choice-body"><MathText text={choice} /></span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <form className="exam-short" onSubmit={(event) => { event.preventDefault(); if (!shown && typed.trim()) answer(activeId, "short", shortRight(question, typed), { typed }); }}>
                  <label htmlFor="review-short">{t(lang, "Đáp số", "Answer")}</label>
                  <input id="review-short" inputMode="decimal" maxLength={7} value={shown?.typed ?? typed} disabled={!!shown} onChange={(event) => setTyped(event.target.value)} />
                  {shown ? null : <button type="submit" className="pay-btn" disabled={!typed.trim()}>{t(lang, "Kiểm tra", "Check")}</button>}
                </form>
              )}
              {shown ? (
                <div className={`review-verdict ${shown.right ? "is-right" : "is-wrong"}`} role="status">
                  <p>
                    <b>{shown.right ? t(lang, "Đúng.", "Right.") : t(lang, "Chưa đúng.", "Not yet.")}</b>{" "}
                    {shown.days === null
                      ? t(lang, "Bạn đã thuộc câu này, nó rời kế hoạch.", "You have learned this one; it leaves the plan.")
                      : shown.right
                        ? t(lang, `Câu này quay lại sau ${shown.days} ngày.`, `It comes back in ${shown.days} days.`)
                        : t(lang, "Câu này quay lại vào ngày mai, tính lại từ đầu.", "It comes back tomorrow and starts over.")}
                  </p>
                  <p>{t(lang, "Đáp án: ", "Answer: ")}<b><MathText text={question.choices[question.answer]} /></b></p>
                  <ol className="steps">{question.steps.map((step) => <li key={step}><MathText text={step} /></li>)}</ol>
                  <p><button type="button" className="pay-btn" onClick={advance}>{due.length > 0 ? t(lang, "Câu tiếp", "Next question") : t(lang, "Xong hôm nay", "Done for today")}</button></p>
                </div>
              ) : null}
            </section>
          ) : (
            <p className="pay-card is-on" role="status">
              <b>{plan.total === 0 ? t(lang, "Không còn câu sai nào chờ ôn.", "No missed questions are waiting.") : t(lang, "Hôm nay ôn xong rồi.", "Today's review is done.")}</b>
              <span>
                {nextDue !== null
                  ? t(lang, ` Câu tiếp theo quay lại ngày ${new Date(nextDue).toLocaleDateString("vi-VN")}.`, ` The next question returns on ${new Date(nextDue).toLocaleDateString("en-GB")}.`)
                  : t(lang, " Làm thêm một đề để tìm chỗ còn yếu.", " Sit another paper to find what is still weak.")}
              </span>{" "}
              <A href="/thi-thu">{t(lang, "Làm đề mới", "Start a new paper")}</A>
            </p>
          )}

          {weak.length > 0 ? (
            <section aria-labelledby="review-weak">
              <h2 id="review-weak">{t(lang, "Chủ đề mất điểm nhiều nhất", "Topics that cost the most points")}</h2>
              <p className="lecture-note">{t(lang, `Cộng dồn qua ${state.papers} đề đã chấm.`, `Added up over ${state.papers} scored papers.`)}</p>
              <ul className="exam-losses">
                {weak.map((item) => (
                  <li key={item.topic}>
                    {topicName(item.topic, lang)}: −{fmt(item.lost, lang)} {t(lang, "điểm", "points")}
                    {item.waiting > 0 ? t(lang, `, ${item.waiting} câu đang chờ ôn`, `, ${item.waiting} waiting for review`) : ""}
                  </li>
                ))}
              </ul>
              <p><A href="/luyen-thpt">{t(lang, "Luyện thêm theo chủ đề ở THPT 10–12", "Practise by topic in Grades 10–12")}</A></p>
            </section>
          ) : null}
        </>
      )}
    </PageFrame>
  );
}

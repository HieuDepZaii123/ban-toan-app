import { lazy, Suspense, useEffect } from "react";
import { lessonFor, questionsFor } from "../content/banks.ts";
import { streamName, topicById } from "../content/catalog.ts";
import type { TopicMeta } from "../content/types.ts";
import { A, useRoute } from "../lib/route.tsx";
import { setLast, toggleThink, useSlice, EMPTY_THINK } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { Prefs, useLang } from "../ui/Prefs.tsx";
import { Notebook } from "./Notebook.tsx";
import { Practice } from "./Practice.tsx";

const QuadraticLab = lazy(() => import("../labs/QuadraticLab.tsx").then((mod) => ({ default: mod.QuadraticLab })));
const ExpLab = lazy(() => import("../labs/ExpLab.tsx").then((mod) => ({ default: mod.ExpLab })));
const SequenceLab = lazy(() => import("../labs/SequenceLab.tsx").then((mod) => ({ default: mod.SequenceLab })));
const TrigLab = lazy(() => import("../labs/TrigLab.tsx").then((mod) => ({ default: mod.TrigLab })));
const LimitLab = lazy(() => import("../labs/LimitLab.tsx").then((mod) => ({ default: mod.LimitLab })));
const DerivativeLab = lazy(() => import("../labs/DerivativeLab.tsx").then((mod) => ({ default: mod.DerivativeLab })));
const SurveyLab = lazy(() => import("../labs/SurveyLab.tsx").then((mod) => ({ default: mod.SurveyLab })));
const IntegralLab = lazy(() => import("../labs/IntegralLab.tsx").then((mod) => ({ default: mod.IntegralLab })));
const ProbabilityLab = lazy(() => import("../labs/ProbabilityLab.tsx").then((mod) => ({ default: mod.ProbabilityLab })));

const labs = {
  quadratic: QuadraticLab,
  exp: ExpLab,
  sequence: SequenceLab,
  trig: TrigLab,
  limit: LimitLab,
  derivative: DerivativeLab,
  survey: SurveyLab,
  integral: IntegralLab,
  probability: ProbabilityLab,
} as const;

export function TopicDesk({ id }: { id: string }) {
  const topic = topicById(id);
  const lang = useLang();
  const { search, go } = useRoute();
  const tabParam = new URLSearchParams(search).get("tab");
  const tab = tabParam === "lam" || tabParam === "so" ? tabParam : "hoc";

  useEffect(() => {
    if (topic) setLast(topic.id);
  }, [topic]);

  useEffect(() => {
    if (!topic) {
      document.title = "Bàn Toán";
      return;
    }
    document.title = `${lang === "en" ? topic.titleEn : topic.title} · Bàn Toán`;
  }, [topic, lang]);

  if (!topic) {
    return (
      <div className="desk">
        <main id="content">
          <h1>{t(lang, "Không có tờ này.", "This sheet is not on the desk.")}</h1>
          <A href="/">{t(lang, "Về bàn", "Back to the desk")}</A>
        </main>
      </div>
    );
  }

  const lesson = lessonFor(topic.id);
  const questions = questionsFor(topic.id);
  const Lab = topic.id in labs ? labs[topic.id as keyof typeof labs] : null;

  return (
    <div className="desk">
      <a className="skip" href="#content">{t(lang, "Vào nội dung", "Skip to content")}</a>
      <header className="bar">
        <div className="bar-row">
          <A className="back" href="/">{t(lang, "Bàn", "Desk")}</A>
          <div className="bar-title">
            <strong>{lang === "en" ? topic.titleEn : topic.title}</strong>
            <span>{streamName(topic.stream, lang)} · {t(lang, "Lớp", "Grade")} {topic.grade}</span>
          </div>
          <Prefs />
        </div>
        <div className="tabs" role="tablist" aria-label={t(lang, "Việc trên tờ", "Work on this sheet")}>
          {(["hoc", "lam", "so"] as const).map((item) => (
            <a
              key={item}
              role="tab"
              aria-selected={tab === item}
              className="tab"
              href={`/t/${topic.id}?tab=${item}`}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                go(`/t/${topic.id}?tab=${item}`);
              }}
            >
              {item === "hoc" ? t(lang, "Học", "Study") : item === "lam" ? t(lang, "Làm", "Practice") : t(lang, "Sổ", "Notebook")}
            </a>
          ))}
        </div>
      </header>
      <main id="content">
        {tab === "hoc" ? (
          <div className="hoc">
            <div className="concept">
              {lesson ? (
                <MathText text={lang === "en" ? lesson.conceptEn : lesson.concept} />
              ) : (
                <>
                  <p>{lang === "en" ? topic.blurbEn : topic.blurb}</p>
                  <p>{lang === "en" ? topic.soonEn : topic.soon}</p>
                </>
              )}
            </div>
            {Lab ? (
              <Suspense fallback={<div className="graph-wrap skeleton" aria-hidden="true" />}>
                <Lab />
              </Suspense>
            ) : (
              <div className="stub-stage" role="note">
                <b>{t(lang, "Chưa có hình kéo", "No interactive figure yet")}</b>
                <p>{lang === "en" ? topic.soonEn : topic.soon}</p>
              </div>
            )}
            <Guide topic={topic} />
          </div>
        ) : null}
        {tab === "lam" ? (
          questions.length > 0 ? (
            <Practice topicId={topic.id} questions={questions} />
          ) : (
            <div className="stub-stage" role="note">
              <b>{t(lang, "Đề đang soạn", "Questions still being written")}</b>
              <p>{t(lang, "Chín tờ đã có câu: hàm bậc hai, mũ và logarit, dãy số, lượng giác, giới hạn, đạo hàm, khảo sát hàm số, tích phân, xác suất.", "Nine sheets already have questions: quadratics, exponents and logarithms, sequences, trigonometry, limits, the derivative, curve sketching, integrals, and probability.")}</p>
            </div>
          )
        ) : null}
        {tab === "so" ? <Notebook topicId={topic.id} questions={questions} /> : null}
      </main>
    </div>
  );
}

function Guide({ topic }: { topic: TopicMeta }) {
  const lang = useLang();
  const flags = useSlice((data) => data.think[topic.id] ?? EMPTY_THINK);
  const think = lang === "en" ? topic.thinkEn : topic.think;
  const steps = [
    ["nhin", t(lang, "Nhìn", "See"), think.nhin],
    ["lam", t(lang, "Làm", "Do"), think.lam],
    ["ket", t(lang, "Kết", "Conclude"), think.ket],
  ] as const;
  return (
    <div className="guide">
      <div className="think">
        {steps.map(([flag, label, text]) => (
          <button key={flag} type="button" className="think-step" aria-pressed={flags[flag]} onClick={() => toggleThink(topic.id, flag)}>
            <b>{label}</b>
            <span>{text}</span>
          </button>
        ))}
      </div>
      <p className="trap">{lang === "en" ? topic.trapEn : topic.trap}</p>
    </div>
  );
}

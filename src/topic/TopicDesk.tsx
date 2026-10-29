import { lazy, Suspense, useEffect, useState, type ComponentType } from "react";
import type { CardId } from "../content/cards.ts";
import { streamName, topicById } from "../content/catalog.ts";
import { loadTopic } from "../content/loadTopic.ts";
import type { Lesson, Question, TopicMeta } from "../content/types.ts";
import type { Vary } from "../content/vary/types.ts";
import { A } from "../lib/route.tsx";
import { useRoute } from "../lib/useRoute.ts";
import { setLast, toggleThink, useSlice, EMPTY_THINK } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { Prefs } from "../ui/Prefs.tsx";
import { useLang } from "../ui/useLang.ts";
import { captionFor } from "../motion/captions.ts";
import { Motion } from "../motion/Motion.tsx";
import { Notebook } from "./Notebook.tsx";
import { Practice } from "./Practice.tsx";
import { LectureVideos } from "./LectureVideos.tsx";

const Research = lazy(() => import("./Research.tsx").then((mod) => ({ default: mod.Research })));

const QuadraticLab = lazy(() => import("../labs/QuadraticLab.tsx").then((mod) => ({ default: mod.QuadraticLab })));
const ExpLab = lazy(() => import("../labs/ExpLab.tsx").then((mod) => ({ default: mod.ExpLab })));
const SequenceLab = lazy(() => import("../labs/SequenceLab.tsx").then((mod) => ({ default: mod.SequenceLab })));
const TrigLab = lazy(() => import("../labs/TrigLab.tsx").then((mod) => ({ default: mod.TrigLab })));
const LimitLab = lazy(() => import("../labs/LimitLab.tsx").then((mod) => ({ default: mod.LimitLab })));
const DerivativeLab = lazy(() => import("../labs/DerivativeLab.tsx").then((mod) => ({ default: mod.DerivativeLab })));
const SurveyLab = lazy(() => import("../labs/SurveyLab.tsx").then((mod) => ({ default: mod.SurveyLab })));
const IntegralLab = lazy(() => import("../labs/IntegralLab.tsx").then((mod) => ({ default: mod.IntegralLab })));
const ProbabilityLab = lazy(() => import("../labs/ProbabilityLab.tsx").then((mod) => ({ default: mod.ProbabilityLab })));
const IneqLab = lazy(() => import("../labs/IneqLab.tsx").then((mod) => ({ default: mod.IneqLab })));
const VectorLab = lazy(() => import("../labs/VectorLab.tsx").then((mod) => ({ default: mod.VectorLab })));
const AnalyticLab = lazy(() => import("../labs/AnalyticLab.tsx").then((mod) => ({ default: mod.AnalyticLab })));
const ShapeLab = lazy(() => import("../labs/ShapeLab.tsx").then((mod) => ({ default: mod.ShapeLab })));
const ComboLab = lazy(() => import("../labs/ComboLab.tsx").then((mod) => ({ default: mod.ComboLab })));

type Loaded = { id: string; lesson: Lesson | null; questions: Question[]; vary: Vary[]; failed: boolean };

const labs = {
  quadratic: QuadraticLab,
  ineq: IneqLab,
  exp: ExpLab,
  sequence: SequenceLab,
  trig: TrigLab,
  limit: LimitLab,
  derivative: DerivativeLab,
  survey: SurveyLab,
  integral: IntegralLab,
  vector: VectorLab,
  analytic: AnalyticLab,
  triangle: ShapeLab,
  combo: ComboLab,
  probability: ProbabilityLab,
} satisfies Record<CardId, ComponentType>;

function isCardId(id: string): id is CardId {
  return Object.prototype.hasOwnProperty.call(labs, id);
}

export function TopicDesk({ id }: { id: string }) {
  const topic = topicById(id);
  const lang = useLang();
  const { search, go } = useRoute();
  const tabParam = new URLSearchParams(search).get("tab");
  const tab = tabParam === "lam" || tabParam === "so" || tabParam === "nc" ? tabParam : "hoc";
  const [pack, setPack] = useState<Loaded | null>(null);

  useEffect(() => {
    if (topic) setLast(topic.id);
  }, [topic]);

  useEffect(() => {
    if (!topic) return;
    let live = true;
    const topicId = topic.id;
    void loadTopic(topicId).then(
      (next) => {
        if (live) setPack({ id: topicId, lesson: next.lesson, questions: next.questions, vary: next.vary, failed: false });
      },
      () => {
        if (live) setPack({ id: topicId, lesson: null, questions: [], vary: [], failed: true });
      },
    );
    return () => {
      live = false;
    };
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

  const ready = pack?.id === topic.id ? pack : null;
  const lesson = ready?.lesson ?? null;
  const questions = ready?.questions ?? [];
  const vary = ready?.vary ?? [];
  const Lab = isCardId(topic.id) ? labs[topic.id] : null;

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
        <nav className="tabs" aria-label={t(lang, "Việc trên tờ", "Work on this sheet")}>
          {(["hoc", "lam", "so", "nc"] as const).map((item) => (
            <a
              key={item}
              aria-current={tab === item ? "page" : undefined}
              className="tab"
              href={`/t/${topic.id}?tab=${item}`}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                go(`/t/${topic.id}?tab=${item}`);
              }}
            >
              {item === "hoc"
                ? t(lang, "Học", "Study")
                : item === "lam"
                  ? t(lang, "Làm", "Practice")
                  : item === "so"
                    ? t(lang, "Sổ", "Notebook")
                    : t(lang, "Nghiên cứu", "Research")}
            </a>
          ))}
        </nav>
      </header>
      <main id="content">
        {tab === "hoc" ? (
          <div className="hoc">
            <Motion id={topic.id} variant="stage" label={captionFor(topic.id, lang === "en")} />
            <div className="concept">
              {!ready ? (
                <p className="loading">{t(lang, "Đang mở tờ…", "Opening this sheet…")}</p>
              ) : lesson ? (
                <MathText text={lang === "en" ? lesson.conceptEn : lesson.concept} />
              ) : (
                <>
                  <p>{lang === "en" ? topic.blurbEn : topic.blurb}</p>
                  <p>{lang === "en" ? topic.soonEn : topic.soon}</p>
                </>
              )}
              <LectureVideos topicId={topic.id} />
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
          !ready ? (
            <p className="loading">{t(lang, "Đang mở tờ…", "Opening this sheet…")}</p>
          ) : ready.failed ? (
            <p className="empty">{t(lang, "Không mở được nội dung tờ này.", "This sheet's contents did not open.")}</p>
          ) : questions.length > 0 ? (
            <Practice key={topic.id} topicId={topic.id} questions={questions} vary={vary} />
          ) : (
            <div className="stub-stage" role="note">
              <b>{t(lang, "Đề đang soạn", "Questions still being written")}</b>
              <p>{t(lang, `Tờ này sẽ có ${topic.questions} câu, với gợi ý và ba bước giải.`, `This sheet will have ${topic.questions} questions, each with a hint and three steps.`)}</p>
            </div>
          )
        ) : null}
        {tab === "nc" ? (
          <Suspense fallback={<p className="loading">{t(lang, "Đang mở nghiên cứu…", "Opening research…")}</p>}>
            <Research topicId={topic.id} Lab={Lab} />
          </Suspense>
        ) : null}
        {tab === "so" ? (
          !ready ? (
            <p className="loading">{t(lang, "Đang mở tờ…", "Opening this sheet…")}</p>
          ) : (
            <Notebook key={topic.id} topicId={topic.id} questions={questions} vary={vary} />
          )
        ) : null}
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
            <MathText text={text} />
          </button>
        ))}
      </div>
      <p className="trap"><MathText text={lang === "en" ? topic.trapEn : topic.trap} /></p>
    </div>
  );
}

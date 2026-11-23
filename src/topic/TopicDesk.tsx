import { lazy, Suspense, useEffect, useRef, useState, type ComponentType } from "react";
import type { CardId } from "../content/cards.ts";
import { streamName, topicById } from "../content/catalog.ts";
import { loadTopic } from "../content/loadTopic.ts";
import type { Lesson, LessonKind, Question, TopicMeta } from "../content/types.ts";
import type { Vary } from "../content/vary/types.ts";
import { A } from "../lib/route.tsx";
import { useRoute } from "../lib/useRoute.ts";
import { setLast, toggleThink, useSlice, EMPTY_THINK } from "../lib/store.ts";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { SiteHeader } from "../ui/SiteHeader.tsx";
import { SiteFooter } from "../ui/SiteFooter.tsx";
import { useLang } from "../ui/useLang.ts";
import { captionFor } from "../motion/captions.ts";
import { Motion } from "../motion/Motion.tsx";
import { Notebook } from "./Notebook.tsx";
import { Practice } from "./Practice.tsx";
import { DangHoc } from "./DangHoc.tsx";
import { FocusBar } from "./FocusBar.tsx";
import { LectureVideos } from "./LectureVideos.tsx";
import { writeParams } from "../lib/store.ts";
import { SangTao } from "./SangTao.tsx";

const LabChallenges = lazy(() => import("../labs/LabChallenges.tsx").then((mod) => ({ default: mod.LabChallenges })));
const LabTools = lazy(() => import("../labs/LabTools.tsx").then((mod) => ({ default: mod.LabTools })));
const ThinkSet = lazy(() => import("./ThinkSet.tsx").then((mod) => ({ default: mod.ThinkSet })));
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
  const tab = tabParam === "lam" || tabParam === "so" || tabParam === "nc" || tabParam === "tn" ? tabParam : "hoc";
  const [pack, setPack] = useState<Loaded | null>(null);
  const [focus, setFocus] = useState(false);
  const [labRun, setLabRun] = useState(0);
  const [shareBad, setShareBad] = useState<false | "bad" | "adjusted">(false);

  useEffect(() => {
    if (topic) setLast(topic.id);
  }, [topic]);

  useEffect(() => {
    document.querySelector(".topic-bar .tab[aria-current=page]")?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [tab, topic?.id]);

  const shared = new URLSearchParams(search).get("p");
  const appliedShare = useRef("");
  useEffect(() => {
    if (!topic || !shared) return;
    const key = `${topic.id}|${shared}`;
    if (appliedShare.current === key) return;
    appliedShare.current = key;
    void import("../content/labSpecs.ts").then(async ({ allLabSpecs }) => {
      const spec = allLabSpecs[topic.id];
      if (!spec) return;
      const { decodeParams, shareAdjusted } = await import("../labs/shared.ts");
      const params = decodeParams(shared, spec.init, spec.range);
      if (params) {
        writeParams(topic.id, params);
        setLabRun((n) => n + 1);
        setShareBad(shareAdjusted(shared, spec.init, spec.range) ? "adjusted" : false);
      } else {
        setShareBad("bad");
      }
      // The link has been read once, good or bad: take it off the address bar so a refresh does not reapply it.
      const here = new URL(window.location.href);
      here.searchParams.delete("p");
      window.history.replaceState(window.history.state, "", here.toString());
    });
  }, [topic, shared]);

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
  const tabs = (Lab ? ["hoc", "tn", "lam", "nc", "so"] : ["hoc", "lam", "nc", "so"]) as readonly ("hoc" | "tn" | "lam" | "nc" | "so")[];

  return (
    <div className={`desk${focus ? " is-focus" : ""}`}>
      <a className="skip" href="#content">{t(lang, "Vào nội dung", "Skip to content")}</a>
      {focus ? <FocusBar onExit={() => setFocus(false)} /> : null}
      <SiteHeader
        sub={
          <div className="topic-bar">
            <div className="topic-title">
              <h1>{lang === "en" ? topic.titleEn : topic.title}</h1>
              <span>{streamName(topic.stream, lang)} · {t(lang, "Lớp", "Grade")} {topic.grade}</span>
            </div>
            <nav className="tabs" aria-label={t(lang, "Việc trên tờ", "Work on this sheet")}>
              {tabs.map((item) => (
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
                    : item === "tn"
                      ? t(lang, "Thí nghiệm", "Lab")
                      : item === "lam"
                      ? t(lang, "Luyện tập", "Practice")
                      : item === "so"
                        ? t(lang, "Sổ tay", "Notebook")
                        : t(lang, "Nghiên cứu", "Research")}
                </a>
              ))}
            </nav>
            <button type="button" className="text-btn topic-focus" onClick={() => { setFocus(true); go(`/t/${topic.id}?tab=hoc`); }}>
              {t(lang, "Tập trung", "Focus")}
            </button>
          </div>
        }
      />
      <main id="content">
        {tab === "hoc" ? (
          <div className="hoc">
            <Motion id={topic.id} variant="stage" label={captionFor(topic.id, lang === "en")} />
            <div className="concept">
              {!ready ? (
                <p className="loading">{t(lang, "Đang mở tờ…", "Opening this sheet…")}</p>
              ) : lesson ? (
                <LessonRead key={topic.id} lesson={lesson} />
              ) : (
                <>
                  <p>{lang === "en" ? topic.blurbEn : topic.blurb}</p>
                  <p>{lang === "en" ? topic.soonEn : topic.soon}</p>
                </>
              )}
              <DangHoc topicId={topic.id} />
              <LectureVideos topicId={topic.id} />
              <SangTao topicId={topic.id} />
            </div>
            {Lab ? (
              <p className="lab-link">
                <A href={`/t/${topic.id}?tab=tn`}>{t(lang, "Mở tab Thí nghiệm để kéo hình và làm thử thách", "Open the Lab tab to drag the figure and try the challenges")}</A>
              </p>
            ) : (
              <div className="stub-stage" role="note">
                <b>{t(lang, "Chưa có hình kéo", "No interactive figure yet")}</b>
                <p>{lang === "en" ? topic.soonEn : topic.soon}</p>
              </div>
            )}
            <Guide topic={topic} />
          </div>
        ) : null}
        {tab === "tn" ? (
          Lab ? (
            <div className="lab-desk">
              <div className="lab-col">
                {shareBad ? (
                  <p className="note" role="status">
                    {shareBad === "adjusted"
                      ? t(lang, "Liên kết có giá trị ngoài khoảng cho phép hoặc khóa lạ nên đã được chỉnh về giá trị gần nhất hợp lệ.", "The link had values outside the allowed range or unknown keys, so they were adjusted to the nearest valid values.")
                      : t(lang, "Liên kết chia sẻ không dùng được nên lab mở ở cấu hình đã lưu hoặc mặc định.", "The shared link could not be used, so the lab opened with your saved or default setup.")}
                  </p>
                ) : null}
                <div className="lab-main">
                  <Suspense fallback={<div className="graph-wrap skeleton" aria-hidden="true" />}>
                    <Lab key={`${topic.id}:${labRun}`} />
                  </Suspense>
                </div>
                <Suspense fallback={null}>
                  <LabTools key={topic.id} id={topic.id} onPreset={() => setLabRun((n) => n + 1)} />
                </Suspense>
              </div>
              <Suspense fallback={null}>
                <LabChallenges key={topic.id} id={topic.id} onPreset={() => setLabRun((n) => n + 1)} />
              </Suspense>
            </div>
          ) : (
            <div className="stub-stage" role="note">
              <b>{t(lang, "Chưa có hình kéo", "No interactive figure yet")}</b>
              <p>{lang === "en" ? topic.soonEn : topic.soon}</p>
            </div>
          )
        ) : null}
        {tab === "lam" ? (
          !ready ? (
            <p className="loading">{t(lang, "Đang mở tờ…", "Opening this sheet…")}</p>
          ) : ready.failed ? (
            <p className="empty">{t(lang, "Không mở được nội dung tờ này.", "This sheet's contents did not open.")}</p>
          ) : questions.length > 0 ? (
            <>
              <Practice key={topic.id} topicId={topic.id} questions={questions} vary={vary} />
              <Suspense fallback={null}>
                <ThinkSet topicId={topic.id} />
              </Suspense>
            </>
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
      <SiteFooter />
    </div>
  );
}

const BIT_LABEL: Record<LessonKind, [string, string]> = {
  mo: ["Bằng lời", "In words"],
  vd: ["Ví dụ", "Example"],
  dinh: ["Định nghĩa", "Definition"],
  loi: ["Lỗi hay gặp", "Common mistake"],
  kiem: ["Kiểm nhanh", "Quick check"],
};

function LessonRead({ lesson }: { lesson: Lesson }) {
  const lang = useLang();
  const [layer, setLayer] = useState<"basic" | "exam">("basic");
  const bits = layer === "basic" ? lesson.basic : lesson.exam;
  return (
    <div className="read">
      <div className="read-switch" role="tablist" aria-label={t(lang, "Mức bài học", "Lesson level")}>
        <button type="button" role="tab" aria-selected={layer === "basic"} onClick={() => setLayer("basic")}>
          {t(lang, "Cơ bản", "Basics")}
        </button>
        <button type="button" role="tab" aria-selected={layer === "exam"} onClick={() => setLayer("exam")}>
          {t(lang, "Chuẩn thi", "Exam")}
        </button>
      </div>
      {bits.map((bit) => (
        <p key={bit.k} className={`read-bit read-${bit.k}`}>
          <b>{t(lang, BIT_LABEL[bit.k][0], BIT_LABEL[bit.k][1])}</b>
          <MathText text={lang === "en" ? bit.en : bit.vi} />
        </p>
      ))}
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

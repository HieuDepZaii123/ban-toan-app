import { lazy, Suspense } from "react";
import { courseById, courses } from "../content/university/courses.ts";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";
import { KnowledgeRead } from "../topic/KnowledgeRead.tsx";

const SECTIONS: Record<string, React.LazyExoticComponent<() => React.JSX.Element>> = {
  linalg: lazy(() => import("../topic/zero/sections/uni-linalg.tsx")),
};

/** Toán đại học: danh sách môn và trang từng môn (kiến thức, hình, thẻ đoán trước). */
export function UniversityPage({ path }: { path: string }) {
  const lang = useLang();
  const id = path === "/dai-hoc" ? "" : decodeURIComponent(path.slice("/dai-hoc/".length).split("/")[0] ?? "");
  const course = id ? courseById(id) : undefined;
  if (!id) {
    return (
      <PageFrame
        kicker={t(lang, "Đại học", "University")}
        title={t(lang, "Toán đại học", "University mathematics")}
        lead={t(lang, "Nối tiếp chương trình THPT: đại số tuyến tính, giải tích, xác suất thống kê và ứng dụng. Mỗi môn có kiến thức, chứng minh từng bước, hình hoạt hình và thẻ đoán trước.", "A continuation of the upper-secondary course: linear algebra, calculus, probability and statistics, with applications. Each course has knowledge, step-by-step proofs, animated figures and guess-first cards.")}
      >
        <ul className="grade-grid">
          {courses.map((c) => (
            <li key={c.id}>
              {c.ready ? (
                <A className="study-card" href={`/dai-hoc/${c.id}`}>
                  <b>{t(lang, c.title, c.titleEn)}</b>
                  <span>{t(lang, c.blurb, c.blurbEn)}</span>
                </A>
              ) : (
                <div className="study-card" aria-disabled="true">
                  <b>{t(lang, c.title, c.titleEn)}</b>
                  <span>{t(lang, c.blurb, c.blurbEn)}</span>
                  <em>{t(lang, "Sắp có", "Coming soon")}</em>
                </div>
              )}
            </li>
          ))}
        </ul>
      </PageFrame>
    );
  }
  if (!course?.ready) {
    return (
      <PageFrame kicker={t(lang, "Đại học", "University")} title={t(lang, "Môn này chưa mở", "This course is not open yet")}>
        <A href="/dai-hoc">{t(lang, "Về danh sách môn", "Back to the courses")}</A>
      </PageFrame>
    );
  }
  const Figures = SECTIONS[course.id];
  return (
    <PageFrame kicker={t(lang, "Đại học", "University")} title={t(lang, course.title, course.titleEn)} lead={t(lang, course.blurb, course.blurbEn)}>
      <p><A href="/dai-hoc">{t(lang, "Tất cả các môn", "All courses")}</A></p>
      {Figures ? (
        <Suspense fallback={<p className="lecture-note">{t(lang, "Đang mở các hình…", "Opening the figures…")}</p>}>
          <Figures />
        </Suspense>
      ) : null}
      <KnowledgeRead topicId={course.id} />
    </PageFrame>
  );
}

import { gradeTitle } from "../content/grades/titlesEn.ts";
import type { GradeBook } from "../content/grades/types.ts";
import { items, type Kind } from "../curriculum/registry.ts";
import { nodeId, nodesOfGrade, STRAND_NAME, type Strand } from "../curriculum/spine.ts";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

const KIND_NAME: Record<Kind, { vi: string; en: string }> = {
  dang: { vi: "Dạng bài", en: "Problem type" },
  method: { vi: "Phương pháp", en: "Method" },
  think: { vi: "Tư duy", en: "Thinking" },
};

/** Lộ trình một lớp: mỗi chương gom bài học, thí nghiệm, dạng bài, phương pháp và bài tư duy của nó, theo ba mạch chương trình. */
export function PathView({ book }: { book: GradeBook }) {
  const lang = useLang();
  const en = lang === "en";
  const here = nodesOfGrade(book.grade);
  const strands: Strand[] = ["so", "hinh", "tk"];
  return (
    <PageFrame
      kicker={t(lang, `Lớp ${book.grade}`, `Grade ${book.grade}`)}
      title={t(lang, "Lộ trình học", "Learning path")}
      lead={t(lang, "Mỗi chương gom mọi thứ để học và luyện nó: bài học, thí nghiệm kéo thả, dạng bài, phương pháp giải và bài tư duy.", "Each chapter gathers everything to learn and practise it: lessons, drag-and-see labs, problem types, solving methods and thinking problems.")}
    >
      <p><A href={`/kien-thuc/${book.grade}`}>{t(lang, `Về các bài lớp ${book.grade}`, `Back to grade ${book.grade} lessons`)}</A></p>
      {strands.map((strand) => {
        const chapters = here.filter((node) => node.strand === strand);
        if (chapters.length === 0) return null;
        return (
          <section key={strand} className="stream">
            <h2>{en ? STRAND_NAME[strand].en : STRAND_NAME[strand].vi}</h2>
            {chapters.map((node) => {
              const chapter = book.chapters.find((c) => nodeId(book.grade, c.id) === node.id);
              const attached = items.filter((item) => item.node === node.id);
              return (
                <article key={node.id} className="tool-card path-chapter">
                  <h3><MathText text={gradeTitle(lang, `${book.grade}/c/${node.chapter}`, node.title)} /></h3>
                  <ul className="path-lessons">
                    {chapter?.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <A href={`/kien-thuc/${book.grade}/${lesson.id}`}><MathText text={gradeTitle(lang, `${book.grade}/${lesson.id}`, lesson.title)} /></A>
                        {lesson.topicId ? <> <A className="path-lab" href={`/t/${lesson.topicId}?tab=tn`}>{t(lang, "Thí nghiệm", "Lab")}</A></> : null}
                      </li>
                    ))}
                  </ul>
                  {attached.length > 0 ? (
                    <ul className="path-items" aria-label={t(lang, "Luyện tập cho chương này", "Practice for this chapter")}>
                      {attached.map((item) => (
                        <li key={item.id}>
                          <span className={`think-kind path-kind-${item.kind}`}>{en ? KIND_NAME[item.kind].en : KIND_NAME[item.kind].vi}</span>{" "}
                          <A href={item.href}><MathText text={en ? item.title.en || item.title.vi : item.title.vi} /></A>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              );
            })}
          </section>
        );
      })}
    </PageFrame>
  );
}

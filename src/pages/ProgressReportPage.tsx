import { useMemo } from "react";
import { cards, streamName, streams } from "../content/cards.ts";
import { topicById } from "../content/catalog.ts";
import { A } from "../lib/route.tsx";
import { countRight, getData, useSlice } from "../lib/store.ts";
import { exportDoc } from "../docs/exportFile.ts";
import { downloadBytes } from "../docs/download.ts";
import { t } from "../lib/text.ts";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

export function ProgressReportPage() {
  const lang = useLang();
  const data = useSlice((d) => d);
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const totalQuestions = cards.reduce((sum, c) => sum + c.questions, 0);
  const done = countRight(data.right);
  const wrongKeys = Object.keys(data.wrong);
  const bookmarks = Object.keys(data.bookmarks);

  const byTopic = useMemo(
    () =>
      cards.map((topic) => {
        const right = countRight(data.right, topic.id);
        const wrong = wrongKeys.filter((k) => k.startsWith(`${topic.id}:`)).length;
        return { ...topic, right, wrong };
      }),
    [data.right, wrongKeys],
  );

  const source = [
    `# ${t(lang, "Báo cáo học tập · Bàn Toán", "Study report · Bàn Toán")}`,
    "",
    `- ${t(lang, "Ngày", "Date")}: ${today}`,
    `- ${t(lang, "Học liên tiếp", "Streak")}: ${data.streaks} ${t(lang, "ngày", "days")}`,
    `- ${t(lang, "Lần học gần nhất", "Last studied")}: ${data.lastStudied ?? t(lang, "chưa có", "none")}`,
    `- ${t(lang, "Câu đúng", "Correct")}: ${done}/${totalQuestions}`,
    `- ${t(lang, "Câu còn sai", "Still wrong")}: ${wrongKeys.length}`,
    `- ${t(lang, "Chuyên đề đã lưu", "Bookmarked topics")}: ${bookmarks.length}`,
    "",
    `## ${t(lang, "Theo chuyên đề", "By topic")}`,
    "",
    ...byTopic.map((topic) => {
      const doneTopic = Math.min(topic.right, topic.questions);
      return `- ${lang === "en" ? topic.titleEn : topic.title} (${topic.n}) — ${doneTopic}/${topic.questions} ${t(lang, "câu đúng", "correct")}, ${topic.wrong} ${t(lang, "còn sai", "wrong")}`;
    }),
    "",
    `## ${t(lang, "Các câu còn sai", "Still wrong")}`,
    "",
    ...wrongKeys.map((key) => {
      const [topicId, questionId] = key.split(":");
      const topic = topicById(topicId);
      const name = topic ? (lang === "en" ? topic.titleEn : topic.title) : topicId;
      return `- ${name}: ${questionId} (${t(lang, "chọn sai", "wrong choice")} ${data.wrong[key]})`;
    }),
    "",
  ].join("\n");

  const csvHeader = "topic,topic_title,grade,stream,correct,total_questions,wrong";
  const csvRows = byTopic.map((t) => {
    const stream = streams.find((s) => s.id === t.stream);
    return `${t.id},"${(lang === "en" ? t.titleEn : t.title).replace(/"/g, '""')}",${t.grade},${stream ? (lang === "en" ? stream.en : stream.vi) : ""},${t.right},${t.questions},${t.wrong}`;
  });
  const csv = [csvHeader, ...csvRows].join("\n");

  async function download(kind: "pdf" | "csv" | "docx"): Promise<void> {
    if (kind === "csv") {
      downloadBytes(new TextEncoder().encode(csv), `bao-cao-${today}.csv`, "text/csv");
      return;
    }
    const filename = await exportDoc(kind, source, `bao-cao-${today}`);
    void filename;
  }

  useEffect(() => {
    document.title = t(lang, "Báo cáo học tập · Bàn Toán", "Study report · Bàn Toán");
  }, [lang]);

  return (
    <PageFrame
      kicker={t(lang, "Báo cáo", "Report")}
      title={t(lang, "Báo cáo học tập của bạn", "Your study report")}
      lead={t(lang, "Xuất báo cáo dưới dạng PDF, Word hoặc CSV từ dữ liệu lưu trên máy này.", "Export your report as PDF, Word, or CSV from data saved on this device.")}
    >
      <section className="report-stats">
        <div>
          <dt>{t(lang, "Học liên tiếp", "Streak")}</dt>
          <dd>{data.streaks} ${t(lang, "ngày", "days")}</dd>
        </div>
        <div>
          <dt>{t(lang, "Câu đúng", "Correct")}</dt>
          <dd>{done}/${totalQuestions}</dd>
        </div>
        <div>
          <dt>{t(lang, "Còn sai", "Still wrong")}</dt>
          <dd>{wrongKeys.length}</dd>
        </div>
        <div>
          <dt>{t(lang, "Lần học gần nhất", "Last studied")}</dt>
          <dd>{data.lastStudied ?? t(lang, "chưa có", "none")}</dd>
        </div>
      </section>

      <div className="doc-tools">
        <button type="button" className="text-btn" onClick={() => void download("pdf")}>
          {t(lang, "Tải PDF", "Download PDF")}
        </button>
        <button type="button" className="text-btn" onClick={() => void download("docx")}>
          {t(lang, "Tải Word", "Download Word")}
        </button>
        <button type="button" className="text-btn" onClick={() => void download("csv")}>
          {t(lang, "Tải CSV", "Download CSV")}
        </button>
      </div>

      <section className="report">
        <h2>{t(lang, "Theo chuyên đề", "By topic")}</h2>
        <ul>
          {byTopic.map((topic) => {
            const doneTopic = Math.min(topic.right, topic.questions);
            const pct = topic.questions ? Math.round((doneTopic / topic.questions) * 100) : 0;
            return (
              <li key={topic.id} className="report-topic">
                <div>
                  <strong>{lang === "en" ? topic.titleEn : topic.title}</strong>
                  <span className="lecture-note">
                    {t(lang, "Lớp", "Grade")} {topic.grade} · {streamName(topic.stream, lang)}
                  </span>
                </div>
                <div className="report-progress">
                  <div className="report-meter">
                    <span style={{ width: `${pct}%` }} className={doneTopic === topic.questions ? "is-right" : undefined} />
                  </div>
                  <span className="report-count">{doneTopic}/${topic.questions}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {wrongKeys.length > 0 ? (
        <section className="report">
          <h2>{t(lang, "Các câu còn sai", "Still wrong")}</h2>
          <ul>
            {wrongKeys.map((key) => {
              const [topicId, questionId] = key.split(":");
              const topic = topicById(topicId);
              const name = topic ? (lang === "en" ? topic.titleEn : topic.title) : topicId;
              return (
                <li key={key}>
                  <strong>{name}</strong> — {questionId} ({t(lang, "chọn sai", "wrong choice")} ${data.wrong[key]})
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </PageFrame>
  );
}

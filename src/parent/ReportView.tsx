import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";
import type { Report } from "./report.ts";

const fmt = (value: number, lang: "vi" | "en") => (lang === "vi" ? String(value).replace(".", ",") : String(value));

export function ReportView({ report }: { report: Report }) {
  const lang = useLang();
  const day = (at: number) => new Date(at).toLocaleDateString(lang === "vi" ? "vi-VN" : "en-GB");
  const first = report.papers[0];
  const last = report.papers.at(-1);
  const change = first && last && report.papers.length > 1 ? Math.round((last.total - first.total) * 100) / 100 : null;
  return (
    <div className="report">
      <p>{t(lang, `Từ ${day(report.from)} đến ${day(report.to)}`, `${day(report.from)} to ${day(report.to)}`)}</p>
      <dl className="report-stats">
        <div><dt>{t(lang, "Đề thi thử đã làm", "Mock papers done")}</dt><dd>{report.papers.length}</dd></div>
        <div>
          <dt>{t(lang, "Điểm thay đổi", "Score change")}</dt>
          <dd>{change === null ? "—" : `${change > 0 ? "+" : ""}${fmt(change, lang)}`}</dd>
        </div>
        <div><dt>{t(lang, "Lượt chấm bài làm", "Markings of own working")}</dt><dd>{report.checks}</dd></div>
        <div><dt>{t(lang, "Bước sai tìm ra", "Wrong steps found")}</dt><dd>{report.wrong}</dd></div>
        <div><dt>{t(lang, "Bài đã tự sửa đúng", "Problems fixed after a mistake")}</dt><dd>{report.fixed}</dd></div>
        <div>
          <dt>{t(lang, "Chế độ phụ huynh", "Parent mode")}</dt>
          <dd>{report.parent ? t(lang, "bật suốt tuần", "on all week") : t(lang, "không bật suốt tuần", "not on all week")}</dd>
        </div>
      </dl>
      {report.papers.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>{t(lang, "Ngày", "Date")}</th>
              <th>{t(lang, "Điểm /10", "Score /10")}</th>
            </tr>
          </thead>
          <tbody>
            {report.papers.map((row) => (
              <tr key={row.at}>
                <td>{day(row.at)}</td>
                <td><b>{fmt(row.total, lang)}</b></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="empty">{t(lang, "Tuần này chưa làm đề thi thử nào.", "No mock papers this week.")}</p>
      )}
    </div>
  );
}

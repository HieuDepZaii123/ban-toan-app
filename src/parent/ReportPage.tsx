import { useEffect, useState } from "react";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";
import { decodeReport, type Report } from "./report.ts";
import { ReportView } from "./ReportView.tsx";

function fromHash(): Report | null {
  const code = new URLSearchParams(window.location.hash.slice(1)).get("r") ?? "";
  return code ? decodeReport(code) : null;
}

/** Where a parent lands from the link their child sent. The report is read from the #fragment only. */
export function ReportPage() {
  const lang = useLang();
  const [report, setReport] = useState<Report | null>(fromHash);
  useEffect(() => {
    document.title = t(lang, "Báo cáo học tập · Bàn Toán", "Study report · Bàn Toán");
    const sync = () => setReport(fromHash());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [lang]);
  return (
    <PageFrame
      kicker={t(lang, "Dành cho phụ huynh", "For parents")}
      title={t(lang, "Báo cáo học tuần này", "This week's study report")}
      lead={t(
        lang,
        "Con gửi báo cáo này từ máy của con. Nó được tạo từ đề thi thử và các lượt chấm bài làm trên Bàn Toán; Bàn Toán không lưu bản nào.",
        "Your child sent this report from their device. It is built from their mock exams and markings on Bàn Toán; Bàn Toán keeps no copy.",
      )}
    >
      {report ? (
        <section className="tool-card"><ReportView report={report} /></section>
      ) : (
        <p className="empty">{t(lang, "Đường link này không có báo cáo hợp lệ. Nhờ con gửi lại.", "This link has no valid report. Ask your child to send it again.")}</p>
      )}
      <p className="pay-note">
        <A href="/phu-huynh">{t(lang, "Chế độ phụ huynh là gì?", "What is parent mode?")}</A>
        {" · "}
        <A href="/nang-cap">Premium</A>
      </p>
    </PageFrame>
  );
}

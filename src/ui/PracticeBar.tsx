import type { ReactNode } from "react";
import { t } from "../lib/text.ts";
import { useLang } from "./useLang.ts";

/**
 * Thanh tiến độ chung của các trang luyện: một vạch (xanh là đúng, đỏ là sai) và một dòng
 * "Câu 3/36 · Đúng 2 · Sai 1 · Còn 33", các nút của trang nằm cùng hàng bên phải.
 * Không truyền `index` thì dòng chữ chỉ nói tổng (bảng điều khiển, không có câu đang mở).
 */
export function PracticeBar({ total, right, wrong, index, actions }: { total: number; right: number; wrong: number; index?: number; actions?: ReactNode }) {
  const lang = useLang();
  const left = Math.max(0, total - right - wrong);
  const share = (count: number) => (total > 0 ? `${(count / total) * 100}%` : "0%");
  return (
    <div className="practice-bar">
      <div
        className="practice-meter"
        role="progressbar"
        aria-label={t(lang, "Tiến độ", "Progress")}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={right + wrong}
        aria-valuetext={t(lang, `Đã làm ${right + wrong}/${total}, đúng ${right}`, `${right + wrong}/${total} done, ${right} right`)}
      >
        <span className="is-right" style={{ width: share(right) }} />
        <span className="is-wrong" style={{ width: share(wrong) }} />
      </div>
      <div className="practice-row">
        <p className="practice-count">
          {index !== undefined ? <b>{t(lang, `Câu ${index + 1}/${total}`, `Question ${index + 1}/${total}`)}</b> : null}
          <span>{t(lang, `Đúng ${right} · Sai ${wrong} · Còn ${left}`, `Right ${right} · Wrong ${wrong} · Left ${left}`)}</span>
        </p>
        {actions ? <div className="practice-actions">{actions}</div> : null}
      </div>
    </div>
  );
}

/** Hai nút Câu trước / Câu sau ở chân thẻ câu hỏi, cùng chỗ trên mọi trang luyện. */
export function CardNav({ onMove, extra }: { onMove: (delta: 1 | -1) => void; extra?: ReactNode }) {
  const lang = useLang();
  return (
    <div className="card-nav">
      <button type="button" onClick={() => onMove(-1)}>{t(lang, "‹ Câu trước", "‹ Previous")}</button>
      {extra}
      <button type="button" className="is-next" onClick={() => onMove(1)}>{t(lang, "Câu sau ›", "Next ›")}</button>
    </div>
  );
}

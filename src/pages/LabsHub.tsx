import { cards, streamName } from "../content/cards.ts";
import { allLabSpecs } from "../content/labSpecs.ts";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { MathText } from "../ui/MathText.tsx";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

/** Cửa vào mọi lab: kéo thanh trượt, xem hình đổi, rồi làm thử thách có kiểm tra. */
export function LabsHub() {
  const lang = useLang();
  const en = lang === "en";
  const labs = cards.filter((card) => allLabSpecs[card.id]);
  const grades = ["10", "11", "12", "10–11", "10–12"] as const;
  return (
    <PageFrame
      kicker={t(lang, "Khám phá", "Explore")}
      title={t(lang, "Thí nghiệm", "Labs")}
      lead={t(lang, "Mười bốn hình kéo thả. Kéo một thanh trượt, xem hình và số đổi theo, rồi làm các thử thách: bàn tự kiểm bằng phép tính và nói rõ vì sao đúng hay sai.", "Fourteen drag-and-see figures. Drag a slider, watch the picture and the numbers change, then take the challenges: the desk checks your setup by computation and says why it is right or wrong.")}
    >
      <p className="lecture-note">{t(lang, "Mỗi lab có công cụ hoàn tác, chia sẻ liên kết, lưu cấu hình, phím tắt và so sánh hai cấu hình.", "Each lab has undo, a share link, saved setups, keyboard shortcuts and a side-by-side comparison.")}</p>
      {grades.map((grade) => {
        const group = labs.filter((card) => card.grade === grade);
        if (group.length === 0) return null;
        return (
          <section key={grade} className="stream">
            <h2>{t(lang, `Lớp ${grade}`, `Grade ${grade}`)}</h2>
            <div className="study-list">
              {group.map((card) => {
                const spec = allLabSpecs[card.id];
                return (
                  <A key={card.id} className="study-card" href={`/t/${card.id}?tab=tn`}>
                    <span>
                      <strong><MathText text={en ? card.titleEn : card.title} /></strong>
                      <small className="lecture-note">
                        {streamName(card.stream, lang)} · {t(lang, `${spec?.challenges.length ?? 0} thử thách`, `${spec?.challenges.length ?? 0} challenges`)}
                      </small>
                    </span>
                    <span aria-hidden="true">→</span>
                  </A>
                );
              })}
            </div>
          </section>
        );
      })}
    </PageFrame>
  );
}

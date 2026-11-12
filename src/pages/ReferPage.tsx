import { useEffect, useState } from "react";
import { ownerSecret, rememberCode } from "../lib/referral.ts";
import { t } from "../lib/text.ts";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";

type Stats = {
  code: string;
  rateBps: number;
  visits: number;
  ordersPending: number;
  ordersPaid: number;
  commissionAccrued: number;
  commissionApproved: number;
};

/** Người dùng đã khai mình từ 18 tuổi trên máy này. Học sinh không tham gia chương trình giới thiệu. */
const ADULT_KEY = "bt-refer-adult";

function vnd(amount: number): string {
  return `${new Intl.NumberFormat("vi-VN").format(amount)} đ`;
}

export function ReferPage() {
  const lang = useLang();
  const [adult, setAdult] = useState(() => {
    try { return localStorage.getItem(ADULT_KEY) === "1"; } catch { return false; }
  });
  const [ticked, setTicked] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = t(lang, "Giới thiệu · Bàn Toán", "Refer · Bàn Toán");
  }, [lang]);

  useEffect(() => {
    if (!adult) return;
    let live = true;
    void fetch("/api/premium/affiliate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "stats", adult: true, ownerSecret: ownerSecret() }),
    }).then(async (res) => {
      const body = await res.json() as Stats & { error?: string };
      if (!live) return;
      if (!res.ok || !body.code) {
        setError("load");
        return;
      }
      rememberCode(body.code);
      setStats(body);
    }).catch(() => {
      if (live) setError("offline");
    });
    return () => {
      live = false;
    };
  }, [adult]);

  const link = stats ? `${window.location.origin}/?ref=${stats.code}` : "";
  const rate = stats ? stats.rateBps / 100 : 0;

  return (
    <PageFrame
      kicker={t(lang, "Giới thiệu", "Refer")}
      title={t(lang, "Giới thiệu Bàn Toán", "Refer Bàn Toán")}
      lead={t(lang, "Dành cho phụ huynh, thầy cô và người lớn tự học. Hoa hồng được ghi khi người bạn giới thiệu mua Premium, và chỉ chi sau khi được duyệt.", "For parents, teachers and adult learners. A commission is recorded when someone you referred buys Premium, and it is paid only after approval.")}
    >
      {!adult ? (
        <section className="tool-card" aria-labelledby="refer-gate">
          <h2 id="refer-gate">{t(lang, "Chỉ dành cho người từ 18 tuổi", "For adults aged 18 or older only")}</h2>
          <p>{t(lang, "Học sinh không tham gia chương trình này và không nhận hoa hồng. Nếu em là học sinh, em vẫn có thể gửi địa chỉ Bàn Toán cho bạn bè mà không cần mã nào.", "Students do not take part in this programme and do not earn commission. If you are a student, you can still share Bàn Toán with friends without any code.")}</p>
          <label className="pay-consent">
            <input type="checkbox" checked={ticked} onChange={(event) => setTicked(event.target.checked)} />
            <span>{t(lang, "Tôi từ 18 tuổi trở lên.", "I am 18 or older.")}</span>
          </label>
          <button
            type="button"
            className="pay-btn"
            disabled={!ticked}
            onClick={() => {
              try { localStorage.setItem(ADULT_KEY, "1"); } catch { /* cho lần mở này */ }
              setAdult(true);
            }}
          >
            {t(lang, "Mở link giới thiệu", "Open my referral link")}
          </button>
        </section>
      ) : null}
      {adult && error ? (
        <p className="empty">
          {error === "offline"
            ? t(lang, "Chưa nối được máy chủ. Thử lại khi có mạng.", "The server did not answer. Try again when you are online.")
            : t(lang, "Chưa lấy được mã giới thiệu. Thử lại sau.", "The referral code did not load. Try again later.")}
        </p>
      ) : null}
      {adult && !stats && !error ? <p className="loading">{t(lang, "Đang mở mã…", "Opening your code…")}</p> : null}
      {adult && stats ? (
        <>
          <section className="tool-card">
            <b>{t(lang, "Link của bạn", "Your link")}</b>
            <p className="pay-note">{link}</p>
            <button
              type="button"
              className="pay-btn"
              onClick={() => {
                void navigator.clipboard.writeText(link).then(() => setCopied(true)).catch(() => setCopied(false));
              }}
            >
              {copied ? t(lang, "Đã chép", "Copied") : t(lang, "Chép link", "Copy the link")}
            </button>
            <p className="lecture-note">
              {t(lang, `Mã ${stats.code}. Hoa hồng ${rate}% trên mỗi đơn đã thanh toán. Tự mở link của mình không được tính. Đơn bị hoàn tiền thì hoa hồng của đơn đó bị hủy.`, `Code ${stats.code}. Commission is ${rate}% of each paid order. Opening your own link does not count. A refunded order voids its commission.`)}
            </p>
          </section>
          <div className="tier-row">
            <article><b>{stats.visits}</b><span>{t(lang, "Lượt khách", "Visits")}</span></article>
            <article><b>{stats.ordersPending}</b><span>{t(lang, "Đơn đang chờ", "Pending orders")}</span></article>
            <article><b>{stats.ordersPaid}</b><span>{t(lang, "Đơn đã trả", "Paid orders")}</span></article>
            <article><b>{vnd(stats.commissionAccrued)}</b><span>{t(lang, "Hoa hồng tạm tính", "Commission accrued")}</span></article>
            <article><b>{vnd(stats.commissionApproved)}</b><span>{t(lang, "Đã duyệt chi", "Approved for payout")}</span></article>
          </div>
        </>
      ) : null}
    </PageFrame>
  );
}

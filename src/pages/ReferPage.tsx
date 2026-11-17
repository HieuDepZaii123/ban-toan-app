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

function vnd(amount: number): string {
  return `${new Intl.NumberFormat("vi-VN").format(amount)}đ`;
}

export function ReferPage() {
  const lang = useLang();
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<"" | "code" | "network">("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = t(lang, "Giới thiệu bạn bè · Bàn Toán", "Refer a friend · Bàn Toán");
  }, [lang]);

  useEffect(() => {
    const secret = ownerSecret();
    void fetch("/api/premium/affiliate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "stats", ownerSecret: secret }),
    }).then(async (res) => {
      const body = await res.json() as Stats & { error?: string };
      if (!res.ok || !body.code) {
        setError("code");
        return;
      }
      rememberCode(body.code);
      setStats(body);
    }).catch(() => setError("network"));
  }, []);

  const link = stats ? `${window.location.origin}/?ref=${stats.code}` : "";
  const rate = stats ? stats.rateBps / 100 : 0;
  const errorText = error === "code"
    ? t(lang, "Chưa lấy được mã giới thiệu. Thử lại sau.", "Couldn't get your referral code. Try again later.")
    : error === "network"
      ? t(lang, "Không nối được máy chủ.", "Couldn't reach the server.")
      : "";

  return (
    <PageFrame
      kicker={t(lang, "Giới thiệu", "Refer")}
      title={t(lang, "Giới thiệu bạn bè", "Refer a friend")}
      lead={t(
        lang,
        "Link của bạn. Hoa hồng ghi khi bạn bè trả Premium. Admin duyệt rồi mới chi.",
        "Your link. Commission is recorded when a friend pays for Premium. It is paid out once an admin approves it.",
      )}
    >
      {errorText ? <p className="empty">{errorText}</p> : null}
      {!stats && !error ? <p className="loading">{t(lang, "Đang mở mã…", "Loading your code…")}</p> : null}
      {stats ? (
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
              {copied ? t(lang, "Đã chép", "Copied") : t(lang, "Chép link", "Copy link")}
            </button>
            <p className="lecture-note">
              {t(
                lang,
                `Mã ${stats.code}. Hoa hồng ${rate}% trên mỗi đơn đã thanh toán. Tự mở link của mình không được tính.`,
                `Code ${stats.code}. ${rate}% commission on each paid order. Opening your own link doesn't count.`,
              )}
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

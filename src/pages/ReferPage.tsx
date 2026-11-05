import { useEffect, useState } from "react";
import { ownerSecret, rememberCode } from "../lib/referral.ts";
import { PageFrame } from "../ui/PageFrame.tsx";

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
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const secret = ownerSecret();
    void fetch("/api/premium/affiliate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "stats", ownerSecret: secret }),
    }).then(async (res) => {
      const body = await res.json() as Stats & { error?: string };
      if (!res.ok || !body.code) {
        setError("Chưa lấy được mã giới thiệu. Thử lại sau.");
        return;
      }
      rememberCode(body.code);
      setStats(body);
    }).catch(() => setError("Không nối được máy chủ."));
  }, []);

  const link = stats ? `${window.location.origin}/?ref=${stats.code}` : "";
  const rate = stats ? stats.rateBps / 100 : 0;

  return (
    <PageFrame
      kicker="Giới thiệu"
      title="Giới thiệu bạn bè"
      lead="Link của bạn. Hoa hồng ghi khi bạn bè trả Premium. Admin duyệt rồi mới chi."
    >
      {error ? <p className="empty">{error}</p> : null}
      {!stats && !error ? <p className="loading">Đang mở mã…</p> : null}
      {stats ? (
        <>
          <section className="tool-card">
            <b>Link của bạn</b>
            <p className="pay-note">{link}</p>
            <button
              type="button"
              className="pay-btn"
              onClick={() => {
                void navigator.clipboard.writeText(link).then(() => setCopied(true)).catch(() => setCopied(false));
              }}
            >
              {copied ? "Đã chép" : "Chép link"}
            </button>
            <p className="lecture-note">Mã {stats.code}. Hoa hồng {rate}% trên mỗi đơn đã thanh toán. Tự mở link của mình không được tính.</p>
          </section>
          <div className="tier-row">
            <article><b>{stats.visits}</b><span>Lượt khách</span></article>
            <article><b>{stats.ordersPending}</b><span>Đơn đang chờ</span></article>
            <article><b>{stats.ordersPaid}</b><span>Đơn đã trả</span></article>
            <article><b>{vnd(stats.commissionAccrued)}</b><span>Hoa hồng tạm tính</span></article>
            <article><b>{vnd(stats.commissionApproved)}</b><span>Đã duyệt chi</span></article>
          </div>
        </>
      ) : null}
    </PageFrame>
  );
}

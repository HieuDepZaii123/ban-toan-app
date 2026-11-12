import { useEffect, useState } from "react";
import { chainChoices, type CryptoChainId } from "./cryptoChoices.ts";
import { ChainPicker, CryptoPay, type CryptoCheck, type CryptoView } from "./CryptoPay.tsx";
import { checkoutRef } from "../lib/referral.ts";
import { A } from "../lib/route.tsx";
import { useRoute } from "../lib/useRoute.ts";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";
import { activateLicense, LICENSE_KEY, usePremium } from "./license.ts";
import { REFUND_DAYS, SUPPORT_EMAIL } from "./terms.ts";

type PlanId = "month" | "year";
type PayMethod = "wallet" | "qr" | "bank" | "crypto";

type Plans = {
  sample: boolean;
  /** Máy chủ có kênh nhận tiền thật. Chưa có thì trang không bán gì. */
  selling?: boolean;
  /** Chế độ thử của nhà phát triển: xem luồng thanh toán với tài khoản mẫu. */
  demo?: boolean;
  lockContent: boolean;
  plans: { id: PlanId; amount: number; days: number }[];
  crypto?: { chains: { id: string; sample: boolean }[] };
};

type BankView = {
  sample: boolean;
  bin: string;
  bankName: string;
  accountNo: string;
  accountName: string;
  amount: number;
  content: string;
  vietqr: string;
  qrDataUrl: string;
};

type OrderView = {
  orderId: string;
  plan: PlanId;
  method: PayMethod;
  amount: number;
  status: "pending" | "paid" | "expired";
  transferCode: string;
  expiresAt: number;
  licenseKey: string | null;
  premiumUntil: number | null;
  payUrl?: string;
  deeplink?: string;
  qrCodeUrl?: string;
  momoQrDataUrl?: string;
  momoError?: string;
  bank?: BankView;
  crypto?: CryptoView;
  cryptoCheck?: CryptoCheck;
  error?: string;
};


function vnd(amount: number): string {
  return `${amount.toLocaleString("vi-VN")} đ`;
}

function left(expiresAt: number): string {
  const ms = expiresAt - Date.now();
  if (ms <= 0) return "0:00";
  const total = Math.ceil(ms / 1000);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function Upgrade() {
  const lang = useLang();
  const { search, go } = useRoute();
  const orderId = new URLSearchParams(search).get("orderId") ?? "";
  const [plans, setPlans] = useState<Plans | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [buyer, setBuyer] = useState<"" | "adult" | "teen" | "child">("");
  const [plan, setPlan] = useState<PlanId>("month");
  const [method, setMethod] = useState<PayMethod>("wallet");
  const [chain, setChain] = useState<CryptoChainId>("tron-usdt");
  const [order, setOrder] = useState<OrderView | null>(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");
  const [copied, setCopied] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    document.title = lang === "en" ? "Upgrade · Bàn Toán" : "Nâng cấp · Bàn Toán";
  }, [lang]);

  useEffect(() => {
    let live = true;
    void fetch("/api/premium/plans").then(async (res) => {
      if (!live) return;
      if (!res.ok) {
        setLoadError(true);
        return;
      }
      setPlans(await res.json() as Plans);
    }).catch(() => {
      if (live) setLoadError(true);
    });
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    if (!orderId) return;
    let live = true;
    const pull = () => {
      void fetch(`/api/premium/status?orderId=${encodeURIComponent(orderId)}`).then(async (res) => {
        if (!live || !res.ok) return;
        const next = await res.json() as OrderView;
        setOrder(next);
        if (next.licenseKey) {
          localStorage.setItem(LICENSE_KEY, next.licenseKey);
          window.dispatchEvent(new Event("ban-toan-premium"));
        }
      }).catch(() => undefined);
    };
    pull();
    const timer = window.setInterval(pull, 3000);
    return () => {
      live = false;
      window.clearInterval(timer);
    };
  }, [orderId]);

  useEffect(() => {
    if (!order || order.status !== "pending") return;
    const timer = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [order]);

  async function submit(): Promise<void> {
    setFormError("");
    setBusy(true);
    try {
      const res = await fetch("/api/premium/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ buyer, email, plan, method, chain: method === "crypto" ? chain : undefined, ...checkoutRef() }),
      });
      const body = await res.json() as OrderView & { message?: string };
      if (!res.ok || !body.orderId) {
        setFormError(body.message || t(lang, "Chưa tạo được đơn.", "The order was not created."));
        return;
      }
      setOrder(body);
      go(`/nang-cap?orderId=${encodeURIComponent(body.orderId)}`);
    } catch {
      setFormError(t(lang, "Không nối được máy chủ thanh toán.", "The payment server did not answer."));
    } finally {
      setBusy(false);
    }
  }

  async function copy(label: string, value: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
    } catch {
      setCopied("");
    }
  }

  const month = plans?.plans.find((item) => item.id === "month");
  const year = plans?.plans.find((item) => item.id === "year");
  const waiting = order?.status === "pending";
  const closed = !orderId && plans !== null && !plans.selling && !plans.demo;

  return (
    <div className="desk">
      <a className="skip" href="#content">{t(lang, "Vào nội dung", "Skip to content")}</a>
      <header className="bar">
        <A className="brand" href="/">Bàn Toán</A>
        <A className="back" href="/">{t(lang, "Về bàn", "Back to the desk")}</A>
      </header>
      <main id="content" className="pay">
        <p className="kicker">Premium</p>
        <h1>{t(lang, "Nâng cấp Premium", "Upgrade to Premium")}</h1>
        {closed ? <Closed /> : null}
        <PremiumBenefits />
        <p className="pay-note">
          {t(
            lang,
            `${vnd(month?.amount ?? 49000)} cho 30 ngày, ${vnd(year?.amount ?? 399000)} cho 365 ngày (khoảng ${vnd(Math.round((year?.amount ?? 399000) / 12000) * 1000)} mỗi tháng). Mua một lần, không tự gia hạn. Mọi bài học, bài luyện và trợ lý 8 câu mỗi ngày vẫn miễn phí.`,
            `${vnd(month?.amount ?? 49000)} for 30 days, ${vnd(year?.amount ?? 399000)} for 365 days (about ${vnd(Math.round((year?.amount ?? 399000) / 12000) * 1000)} a month). Bought once, never renews automatically. All lessons, practice and 8 tutor questions a day stay free.`,
          )}
          {" "}
          <A href="/chinh-sach">{t(lang, `Hoàn tiền trong ${REFUND_DAYS} ngày`, `Refund within ${REFUND_DAYS} days`)}</A>
          {" · "}
          <A href="/gioi-thieu">{t(lang, "Giới thiệu bạn bè", "Refer a friend")}</A>
        </p>
        <LicenseBox />
        <RecoverBox />
        {SUPPORT_EMAIL ? (
          <p className="pay-note">
            {t(lang, "Hỗ trợ, hoàn tiền, xem hoặc xóa dữ liệu đơn hàng: ", "Support, refunds, seeing or deleting order data: ")}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </p>
        ) : null}
        {loadError ? <p className="empty">{t(lang, "Không tải được bảng giá.", "The price list did not load.")}</p> : null}
        {!orderId ? (closed ? null : (
          <form
            className="pay"
            onSubmit={(event) => {
              event.preventDefault();
              void submit();
            }}
          >
            {plans?.demo ? (
              <p className="pay-warn" role="note">
                {t(lang, "Chế độ thử của nhà phát triển: tài khoản nhận tiền là tài khoản mẫu, không có giao dịch thật.", "Developer demo mode: the receiving accounts are samples and no real payment is taken.")}
              </p>
            ) : null}
            <div className="pay-grid two" role="radiogroup" aria-label={t(lang, "Gói", "Plan")}>
              <PlanCard id="month" title={t(lang, "Một tháng", "One month")} days={month?.days ?? 30} amount={month?.amount ?? 49000} on={plan === "month"} onPick={() => setPlan("month")} />
              <PlanCard id="year" title={t(lang, "Một năm", "One year")} days={year?.days ?? 365} amount={year?.amount ?? 399000} on={plan === "year"} onPick={() => setPlan("year")} />
            </div>
            <label className="pay-row">
              <span>{t(lang, "Email", "Email")}</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-label={t(lang, "Email nhận quyền Premium", "Email for the Premium license")}
              />
            </label>
            <p className="pay-note">{t(lang, "Email chỉ dùng để tra cứu đơn và khôi phục mã Premium.", "The email is only used to look up the order and recover the Premium key.")}</p>
            <fieldset className="pay-buyer">
              <legend>{t(lang, "Ai đang mua?", "Who is buying?")}</legend>
              <label>
                <input type="radio" name="buyer" required checked={buyer === "adult"} onChange={() => setBuyer("adult")} />
                <span>{t(lang, "Tôi từ 18 tuổi trở lên (mua cho mình hoặc cho con)", "I am 18 or older (buying for myself or for my child)")}</span>
              </label>
              <label>
                <input type="radio" name="buyer" checked={buyer === "teen"} onChange={() => { setBuyer("teen"); if (method === "crypto") setMethod("wallet"); }} />
                <span>{t(lang, "Tôi từ 16 đến dưới 18 tuổi, cha mẹ hoặc người giám hộ đã đồng ý", "I am 16 or 17 and a parent or guardian has agreed")}</span>
              </label>
              <label>
                <input type="radio" name="buyer" checked={buyer === "child"} onChange={() => { setBuyer("child"); if (method === "crypto") setMethod("wallet"); }} />
                <span>{t(lang, "Tôi dưới 16 tuổi", "I am under 16")}</span>
              </label>
              {buyer === "child" ? (
                <p className="pay-warn" role="status">
                  {t(lang, "Bạn chưa tự mua được. Hãy đưa máy cho cha mẹ hoặc người giám hộ để họ mua giúp, hoặc gửi họ địa chỉ trang này. Mọi bài học và bài luyện vẫn miễn phí.", "You cannot buy this yourself yet. Hand the device to a parent or guardian so they can buy it, or send them this page. All lessons and practice stay free.")}
                </p>
              ) : null}
            </fieldset>
            <label className="pay-consent">
              <input type="checkbox" required checked={agreed} onChange={(event) => setAgreed(event.target.checked)} />
              <span>
                {t(lang, "Tôi đã đọc ", "I have read the ")}
                <A href="/chinh-sach">{t(lang, "chính sách và điều kiện hoàn tiền", "policy and refund terms")}</A>
                .
              </span>
            </label>
            <div className="pay-grid methods" role="radiogroup" aria-label={t(lang, "Cách thanh toán", "Payment method")}>
              <MethodCard
                id="wallet"
                on={method === "wallet"}
                title={t(lang, "Ví MoMo", "MoMo wallet")}
                body={t(lang, "Mở app MoMo hoặc trang thanh toán. Quyền Premium bật tự động khi MoMo xác nhận.", "Open the MoMo app or the payment page. Premium turns on when MoMo confirms.")}
                onPick={() => setMethod("wallet")}
              />
              <MethodCard
                id="qr"
                on={method === "qr"}
                title={t(lang, "Quét QR", "Scan a QR")}
                body={t(lang, "Quét mã QR MoMo bằng app MoMo, hoặc mã VietQR bằng app ngân hàng.", "Scan the MoMo QR with the MoMo app, or the VietQR with a banking app.")}
                onPick={() => setMethod("qr")}
              />
              <MethodCard
                id="bank"
                on={method === "bank"}
                title={t(lang, "Chuyển khoản ngân hàng", "Bank transfer")}
                body={t(lang, "Số tài khoản, số tiền và nội dung chuyển khoản riêng của đơn. Đơn chờ 15 phút.", "Account number, amount, and a transfer note unique to this order. The order waits 15 minutes.")}
                onPick={() => setMethod("bank")}
              />
              {plans?.crypto && buyer === "adult" ? (
                <MethodCard
                  id="crypto"
                  on={method === "crypto"}
                  title={t(lang, "Tiền mã hóa (từ 18 tuổi, ngoài Việt Nam)", "Crypto (18+, outside Vietnam)")}
                  body={t(lang, "Dành cho người mua từ 18 tuổi ở nước ngoài: USDT hoặc USDC chuyển thẳng vào ví của đơn vị vận hành. Ở Việt Nam hãy dùng MoMo hoặc chuyển khoản. Gửi nhầm mạng hoặc sai số tiền thì không lấy lại được. Đơn chờ 15 phút.", "For buyers aged 18 or older outside Vietnam: USDT or USDC sent straight to the operator's wallet. In Vietnam, use MoMo or a bank transfer. A transfer on the wrong network or for the wrong amount cannot be recovered. The order waits 15 minutes.")}
                  onPick={() => setMethod("crypto")}
                />
              ) : null}
            </div>
            {method === "crypto" ? (
              <>
                <ChainPicker
                  name="crypto-chain"
                  value={chain}
                  choices={chainChoices(lang, plans?.crypto?.chains.map((item) => item.id) ?? ["tron-usdt", "bsc-usdt", "bsc-usdc", "sol-usdc"])}
                  onPick={(id) => setChain(id as CryptoChainId)}
                />
                {plans?.crypto?.chains.find((item) => item.id === chain)?.sample ? (
                  <p className="pay-warn">{t(lang, "Ví nhận của mạng này đang là địa chỉ MẪU.", "The receiving wallet for this network is still a SAMPLE address.")}</p>
                ) : null}
              </>
            ) : null}
            {formError ? <p className="pay-warn" role="alert">{formError}</p> : null}
            <button className="pay-btn" type="submit" disabled={busy || !plans || !agreed || (buyer !== "adult" && buyer !== "teen")}>
              {busy ? t(lang, "Đang tạo đơn…", "Creating the order…") : t(lang, "Tạo đơn thanh toán", "Create the payment")}
            </button>
          </form>
        )) : (
          order ? (
            <OrderPanel order={order} waiting={waiting} copied={copied} remain={left(order.expiresAt)} beat={tick} onCopy={copy} onReplace={setOrder} />
          ) : (
            <p className="loading">{t(lang, "Đang mở đơn…", "Opening the order…")}</p>
          )
        )}
      </main>
    </div>
  );
}

function PlanCard({ id, title, days, amount, on, onPick }: { id: PlanId; title: string; days: number; amount: number | undefined; on: boolean; onPick: () => void }) {
  const lang = useLang();
  return (
    <label className={`pay-card${on ? " is-on" : ""}`}>
      <span className="pay-row">
        <input type="radio" name="plan" value={id} checked={on} onChange={onPick} />
        <b>{title}</b>
      </span>
      <span className="pay-price">{amount === undefined ? "…" : vnd(amount)}</span>
      <small>{t(lang, `${days} ngày · mua một lần`, `${days} days · one-off purchase`)}</small>
    </label>
  );
}

function MethodCard({ id, title, body, on, onPick }: { id: PayMethod; title: string; body: string; on: boolean; onPick: () => void }) {
  return (
    <label className={`pay-card${on ? " is-on" : ""}`}>
      <span className="pay-row">
        <input type="radio" name="method" value={id} checked={on} onChange={onPick} />
        <b>{title}</b>
      </span>
      <small>{body}</small>
    </label>
  );
}

function OrderPanel({
  order,
  waiting,
  remain,
  beat,
  copied,
  onCopy,
  onReplace,
}: {
  order: OrderView;
  waiting: boolean;
  remain: string;
  beat: number;
  copied: string;
  onCopy: (label: string, value: string) => Promise<void>;
  onReplace: (order: OrderView) => void;
}) {
  const lang = useLang();
  return (
    <section className="pay" aria-live="polite">
      <p className="status" role="status" data-beat={beat}>
        {order.status === "paid"
          ? t(lang, "Đã thanh toán. Quyền Premium đã bật.", "Paid. Premium is on.")
          : order.status === "expired"
            ? t(lang, "Đơn đã hết hạn sau 15 phút.", "The order expired after 15 minutes.")
            : t(lang, `Đang chờ thanh toán · còn ${remain}`, `Waiting for payment · ${remain} left`)}
      </p>
      <p className="pay-note">{t(lang, `Số tiền: ${vnd(order.amount)}. Mã đơn: ${order.orderId}. Hãy giữ mã đơn và email đã nhập: sau này cần hai thứ đó để khôi phục mã Premium.`, `Amount: ${vnd(order.amount)}. Order: ${order.orderId}. Keep the order id and the email you entered: both are needed later to recover the Premium key.`)}</p>
      {order.licenseKey ? (
        <p className="pay-card">
          <b>{t(lang, "Mã kích hoạt", "License key")}</b>
          <code>{order.licenseKey}</code>
          <small>{t(lang, "Chép mã này lại. Trên máy khác, nhập mã ở ô «Đã có mã Premium?» trên trang này.", "Copy this key. On another device, enter it in the “Already have a key?” box on this page.")}</small>
        </p>
      ) : null}
      {order.method === "wallet" ? <WalletBlock order={order} /> : null}
      {order.method === "crypto" && order.crypto ? (
        <CryptoPay
          orderId={order.orderId}
          status={order.status}
          crypto={order.crypto}
          check={order.cryptoCheck}
          remain={remain}
          copied={copied}
          onCopy={onCopy}
          onUpdated={(next) => onReplace(next as OrderView)}
        />
      ) : null}
      {order.method === "qr" || order.method === "bank" ? <QrBlock order={order} /> : null}
      {order.bank && (order.method === "bank" || order.method === "qr") ? (
        <BankBlock order={order} bank={order.bank} copied={copied} onCopy={onCopy} />
      ) : null}
      {waiting ? <p className="pay-note">{t(lang, "Trang tự cập nhật khi đơn được xác nhận.", "This page updates itself when the order is confirmed.")}</p> : null}
      <A href="/nang-cap">{t(lang, "Tạo đơn khác", "Create another order")}</A>
    </section>
  );
}

function WalletBlock({ order }: { order: OrderView }) {
  const lang = useLang();
  return (
    <section className="pay-card" aria-label={t(lang, "Ví MoMo", "MoMo wallet")}>
      <b>{t(lang, "Ví MoMo", "MoMo wallet")}</b>
      {order.momoError ? <p className="pay-warn">{order.momoError}</p> : null}
      {order.payUrl ? <a className="pay-btn" href={order.payUrl} rel="noreferrer">{t(lang, "Mở trang MoMo", "Open MoMo")}</a> : null}
      {order.deeplink ? <a href={order.deeplink}>{t(lang, "Mở app MoMo", "Open the MoMo app")}</a> : null}
      {!order.payUrl && !order.momoError ? <p className="pay-note">{t(lang, "Đang chờ liên kết ví.", "Waiting for the wallet link.")}</p> : null}
    </section>
  );
}

function QrBlock({ order }: { order: OrderView }) {
  const lang = useLang();
  return (
    <section className="pay-card" aria-label={t(lang, "Quét QR", "Scan a QR")}>
      <b>{t(lang, "Quét QR", "Scan a QR")}</b>
      {order.momoError ? <p className="pay-warn">{t(lang, `MoMo chưa trả mã: ${order.momoError}`, `MoMo did not return a code: ${order.momoError}`)}</p> : null}
      {order.momoQrDataUrl ? (
        <p>
          <img className="pay-qr" src={order.momoQrDataUrl} alt={t(lang, "Mã QR MoMo", "MoMo QR code")} />
          <small>{t(lang, "Quét bằng app MoMo. Quyền Premium bật khi MoMo xác nhận.", "Scan with the MoMo app. Premium turns on when MoMo confirms.")}</small>
        </p>
      ) : null}
      {order.bank?.qrDataUrl ? (
        <p>
          <img className="pay-qr" src={order.bank.qrDataUrl} alt={t(lang, "Mã VietQR chuyển khoản", "VietQR transfer code")} />
          <small>{t(lang, "Quét bằng app ngân hàng để chuyển khoản đúng số tiền và nội dung của đơn.", "Scan with a banking app to transfer the exact amount with this order's note.")}</small>
        </p>
      ) : null}
    </section>
  );
}

function BankBlock({
  order,
  bank,
  copied,
  onCopy,
}: {
  order: OrderView;
  bank: BankView;
  copied: string;
  onCopy: (label: string, value: string) => Promise<void>;
}) {
  const lang = useLang();
  const rows = [
    [t(lang, "Ngân hàng", "Bank"), bank.bankName],
    [t(lang, "Số tài khoản", "Account"), bank.accountNo],
    [t(lang, "Tên", "Name"), bank.accountName],
    [t(lang, "Số tiền", "Amount"), String(order.amount)],
    [t(lang, "Nội dung", "Note"), bank.content],
  ] as const;
  return (
    <section className="pay-card" aria-label={t(lang, "Chuyển khoản", "Bank transfer")}>
      <b>{t(lang, "Chuyển khoản ngân hàng", "Bank transfer")}</b>
      {bank.sample ? <p className="pay-warn">{t(lang, "Số tài khoản đang là giá trị MẪU, chưa phải tài khoản nhận tiền thật.", "The account number is a SAMPLE. It is not a live account.")}</p> : null}
      {order.method === "bank" && order.payUrl ? <a className="pay-btn" href={order.payUrl} rel="noreferrer">{t(lang, "Hoặc mở ATM MoMo", "Or open MoMo ATM")}</a> : null}
      {rows.map(([label, value]) => (
        <div className="pay-kv" key={label}>
          <span>{label}</span>
          <code>{value}</code>
          <button type="button" className="text-btn" onClick={() => void onCopy(label, value)}>
            {copied === label ? t(lang, "Đã chép", "Copied") : t(lang, "Chép", "Copy")}
          </button>
        </div>
      ))}
      <small>{t(lang, "Nội dung chuyển khoản phải đúng từng ký tự. Quyền Premium bật sau khi hệ thống đối chiếu được khoản tiền; nếu sau 24 giờ chưa thấy, hãy liên hệ kèm mã đơn.", "The transfer note must match exactly. Premium turns on once the transfer is matched; if nothing happens within 24 hours, contact us with the order id.")}</small>
    </section>
  );
}

function PremiumBenefits() {
  const lang = useLang();
  return (
    <section className="pay-benefits" aria-labelledby="benefits-title">
      <h2 id="benefits-title">{t(lang, "Premium gồm", "Premium includes")}</h2>
      <ul>
        <li>
          <b>{t(lang, "Đề thi thử theo cấu trúc thi tốt nghiệp THPT hiện hành", "Mock exams in the current THPT exam format")}</b>
          {t(lang,
            " (áp dụng từ kỳ thi 2025): ba phần gồm 12 câu trắc nghiệm, 4 câu Đúng/Sai và 6 câu trả lời ngắn, 90 phút, chấm trên thang 10, xem lại từng câu kèm lời giải. Mỗi đề rút mới từ ngân hàng câu của Bàn Toán, làm bao nhiêu đề cũng được. Đây là đề luyện, không phải đề của Bộ.",
            " (in force since the 2025 exam): three parts with 12 multiple choice, 4 true/false and 6 short answer questions, 90 minutes, scored out of 10, with every question reviewable with its solution. Each paper is drawn fresh from Bàn Toán's own bank, as many as you like. These are practice papers, not Ministry papers.")}
        </li>
        <li>
          <b>{t(lang, "Bảng điểm theo phần và chủ đề", "Scores by part and topic")}</b>
          {t(lang, ": sau mỗi đề biết mình mất điểm ở phần nào, chủ đề nào, và ôn ngay câu sai.", ": after each paper, see which part and topic cost points, then redo the missed questions.")}
        </li>
        <li>
          <b>{t(lang, "Tài liệu ôn tập 14 chuyên đề", "Study notes for 14 topics")}</b>
          {t(lang, ": bài giảng viết, lỗi hay gặp, ví dụ giải từng bước và đề tự luyện có đáp án, đọc trên trang hoặc tải PDF, Word để in.", ": written lecture notes, common mistakes, examples solved step by step and a self-test with answers, to read here or download as PDF or Word.")}
          {" "}<A href="/tai-lieu">{t(lang, "Xem tài liệu", "See the notes")}</A>
        </li>
        <li>
          <b>{t(lang, "Kế hoạch ôn lỗi sai", "Mistake review plan")}</b>
          {t(lang, ": câu sai trong đề thi thử tự quay lại sau 1, 3, 7 và 14 ngày, kèm danh sách chủ đề mất điểm nhiều nhất.", ": questions you miss in mock exams come back after 1, 3, 7 and 14 days, with the topics that cost you the most points.")}
          {" "}<A href="/on-loi-sai">{t(lang, "Mở kế hoạch", "Open the plan")}</A>
        </li>
        <li>
          <b>{t(lang, "Lời giải đầy đủ", "Full worked solutions")}</b>
          {t(lang, ": sau khi tự thử, xin trợ lý giải trọn từng bước, có đáp số và bước thử lại. Bản miễn phí chỉ gợi ý.", ": after trying, ask the tutor for every step with the final answer and a check. The free tutor gives hints only.")}
        </li>
        <li>
          <b>{t(lang, "Kiểm tra bài làm", "Check my work")}</b>
          {t(lang, ": dán bài giải của bạn, trợ lý chỉ ra đúng bước sai đầu tiên, vì sao sai và cách sửa.", ": paste your solution and the tutor points to the first wrong step, why it is wrong and how to fix it.")}
        </li>
        <li>
          <b>{t(lang, "Chụp ảnh đề bài", "Photo of a problem")}</b>
          {t(lang, ": chụp đề trong sách hay đề thi, trợ lý đọc ảnh rồi giúp bạn giải.", ": photograph a problem from a book or paper and the tutor reads it and helps.")}
        </li>
        <li>
          <b>{t(lang, "Trợ lý toán 40 câu mỗi ngày", "40 tutor questions a day")}</b>
          {t(lang, " thay vì 8, tính riêng cho mã của bạn.", " instead of 8, counted for your key alone.")}
        </li>
        <li>
          <b>{t(lang, "Dùng trên mọi máy", "Use it on any device")}</b>
          {t(lang, ": nhập mã Premium ở trang này trên máy khác.", ": enter the Premium key on this page on another device.")}
        </li>
      </ul>
    </section>
  );
}

/** Khi máy chủ chưa có kênh nhận tiền thật, trang không bày một quầy thanh toán giả. */
function Closed() {
  const lang = useLang();
  return (
    <section className="pay-card pay-closed" role="note" aria-label={t(lang, "Premium chưa mở bán", "Premium is not on sale yet")}>
      <b>{t(lang, "Premium chưa mở bán", "Premium is not on sale yet")}</b>
      <span>
        {t(lang, "Bàn Toán chưa nhận thanh toán. Hiện giờ mọi bài học, bài luyện, đề thi thử và trợ lý (8 câu mỗi ngày) đều dùng miễn phí. Khi mở bán, giá và cách trả tiền sẽ hiện ở trang này.", "Bàn Toán is not taking payments yet. For now every lesson, practice set, mock exam and the tutor (8 questions a day) is free. When sales open, the price and the ways to pay will appear on this page.")}
      </span>
      <A href="/thi-thu">{t(lang, "Làm đề thi thử THPT", "Take a THPT mock exam")}</A>
    </section>
  );
}

/** Quên mã Premium: khôi phục bằng mã đơn và email đã mua. */
function RecoverBox() {
  const lang = useLang();
  const premium = usePremium();
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [key, setKey] = useState("");
  const [busy, setBusy] = useState(false);
  if (premium.kind === "active") return null;
  return (
    <details className="pay-recover">
      <summary>{t(lang, "Quên mã Premium?", "Lost your Premium key?")}</summary>
      <form
        className="pay-row license-box"
        onSubmit={(event) => {
          event.preventDefault();
          setBusy(true);
          setNote("");
          void fetch("/api/premium/recover", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ orderId: orderId.trim(), email: email.trim() }),
          }).then(async (res) => {
            const body = await res.json() as { licenseKey?: string };
            if (!res.ok || !body.licenseKey) {
              setNote(t(lang, "Không thấy đơn đã thanh toán nào khớp cả mã đơn lẫn email này.", "No paid order matches both this order id and this email."));
              return;
            }
            setKey(body.licenseKey);
            await activateLicense(body.licenseKey);
          }).catch(() => {
            setNote(t(lang, "Chưa nối được máy chủ. Thử lại khi có mạng.", "The server did not answer. Try again when you are online."));
          }).finally(() => setBusy(false));
        }}
      >
        <label>
          <span>{t(lang, "Mã đơn (bắt đầu bằng BT)", "Order id (starts with BT)")}</span>
          <input value={orderId} onChange={(event) => setOrderId(event.target.value)} autoComplete="off" spellCheck={false} required />
        </label>
        <label>
          <span>{t(lang, "Email đã nhập khi mua", "Email used for the purchase")}</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
        </label>
        <button type="submit" className="text-btn" disabled={busy}>{t(lang, "Khôi phục mã", "Recover the key")}</button>
        {note ? <p className="chat-note" role="status">{note}</p> : null}
        {key ? <p className="chat-note" role="status">{t(lang, "Mã của bạn: ", "Your key: ")}<code>{key}</code></p> : null}
      </form>
    </details>
  );
}

function LicenseBox() {
  const lang = useLang();
  const premium = usePremium();
  const [draft, setDraft] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  if (premium.kind === "active") {
    return (
      <p className="pay-card" role="status">
        <b>{t(lang, "Premium đang bật trên máy này", "Premium is on for this device")}</b>
        <span>{t(lang, `đến ${new Date(premium.until).toLocaleDateString("vi-VN")}.`, `until ${new Date(premium.until).toLocaleDateString("en-GB")}.`)}</span>
        {" "}
        <A href="/thi-thu">{t(lang, "Làm đề thi thử THPT", "Take a THPT mock exam")}</A>
      </p>
    );
  }
  return (
    <form
      className="pay-row license-box"
      onSubmit={(event) => {
        event.preventDefault();
        setBusy(true);
        setNote("");
        void activateLicense(draft).then((result) => {
          setBusy(false);
          if (result === "offline") setNote(t(lang, "Chưa kiểm được mã vì mất mạng. Thử lại khi có mạng.", "Could not check the key while offline. Try again online."));
          else if (result === null) setNote(t(lang, "Mã không đúng, đã hết hạn hoặc đã hoàn tiền.", "The key is wrong, expired or refunded."));
          else setDraft("");
        });
      }}
    >
      <label>
        <span>{t(lang, "Đã có mã Premium?", "Already have a key?")}</span>
        <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="bt_…" autoComplete="off" spellCheck={false} />
      </label>
      <button type="submit" className="text-btn" disabled={busy || draft.trim() === ""}>{t(lang, "Kích hoạt", "Activate")}</button>
      {note ? <p className="chat-note" role="status">{note}</p> : null}
    </form>
  );
}

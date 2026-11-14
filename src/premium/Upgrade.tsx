import { useEffect, useState } from "react";
import { chainChoices, type CryptoChainId } from "./cryptoChoices.ts";
import { ChainPicker, CryptoPay, type CryptoCheck, type CryptoView } from "./CryptoPay.tsx";
import { checkoutRef } from "../lib/referral.ts";
import { A } from "../lib/route.tsx";
import { useRoute } from "../lib/useRoute.ts";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";
import { activateLicense, LICENSE_KEY, usePremium } from "./license.ts";
import { expiredOrderNote } from "./orderNote.ts";
import { yearSavings } from "./savings.ts";
import { REFUND_DAYS } from "./terms.ts";

type PlanId = "month" | "year";
type PayMethod = "wallet" | "qr" | "bank" | "crypto";

type Plans = {
  sample: boolean;
  lockContent: boolean;
  plans: { id: PlanId; amount: number; days: number }[];
  bank?: { sample: boolean };
  crypto?: { chains: { id: string; sample: boolean }[] };
  /** Methods and networks that can take real money; older servers send nothing, meaning all open. */
  open?: { wallet: boolean; qr: boolean; bank: boolean; crypto: Record<string, boolean> };
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
      const loaded = await res.json() as Plans;
      setPlans(loaded);
      if (loaded.open) {
        const first = (["wallet", "qr", "bank", "crypto"] as const).find((id) => id === "crypto"
          ? Object.values(loaded.open?.crypto ?? {}).some(Boolean)
          : loaded.open?.[id]);
        if (first) setMethod(first);
        const chainOpen = Object.entries(loaded.open.crypto).find(([, ok]) => ok)?.[0];
        if (chainOpen) setChain(chainOpen as CryptoChainId);
      }
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
        body: JSON.stringify({ email, plan, method, chain: method === "crypto" ? chain : undefined, ...checkoutRef() }),
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

  const open = plans?.open;
  const methodOpen = (id: PayMethod): boolean => !open || (id === "crypto" ? Object.values(open.crypto).some(Boolean) : open[id]);
  const chainOpen = (id: string): boolean => !open || open.crypto[id] === true;
  const nothingOpen = !!open && !(["wallet", "qr", "bank", "crypto"] as const).some(methodOpen);
  const canPay = methodOpen(method) && (method !== "crypto" || chainOpen(chain));
  const month = plans?.plans.find((item) => item.id === "month");
  const year = plans?.plans.find((item) => item.id === "year");
  const waiting = order?.status === "pending";

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
        <ComparePlans />
        <PremiumBenefits />
        <p className="pay-note">
          {month && year
            ? t(
              lang,
              `${vnd(month.amount)} cho ${month.days} ngày, ${vnd(year.amount)} cho ${year.days} ngày. `,
              `${vnd(month.amount)} for ${month.days} days, ${vnd(year.amount)} for ${year.days} days. `,
            )
            : null}
          {t(
            lang,
            "Không tự gia hạn. Trả bằng MoMo, VietQR, chuyển khoản hoặc USDT/USDC. Mọi bài học, luyện tập và trợ lý 8 câu mỗi ngày vẫn miễn phí.",
            "Never renews automatically. Pay with MoMo, VietQR, bank transfer or USDT/USDC. All lessons, practice and 8 tutor questions a day stay free.",
          )}
          {" "}
          <A href="/chinh-sach">{t(lang, `Hoàn tiền trong ${REFUND_DAYS} ngày`, `Refund within ${REFUND_DAYS} days`)}</A>
          {" · "}
          <A href="/gioi-thieu">{t(lang, "Giới thiệu bạn bè", "Refer a friend")}</A>
        </p>
        <LicenseBox />
        {loadError ? <p className="empty">{t(lang, "Không tải được bảng giá.", "The price list did not load.")}</p> : null}
        {!orderId ? (
          <form
            className="pay"
            onSubmit={(event) => {
              event.preventDefault();
              void submit();
            }}
          >
            <div className="pay-grid two" role="radiogroup" aria-label={t(lang, "Gói", "Plan")}>
              <PlanCard id="month" title={t(lang, "Một tháng", "One month")} days={month?.days ?? 30} amount={month?.amount} sample={plans?.sample === true} on={plan === "month"} onPick={() => setPlan("month")} />
              <PlanCard id="year" title={t(lang, "Một năm", "One year")} days={year?.days ?? 365} amount={year?.amount} sample={plans?.sample === true} savings={month && year ? yearSavings(month.amount, year.amount) : null} on={plan === "year"} onPick={() => setPlan("year")} />
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
            <label className="pay-consent">
              <input type="checkbox" required checked={agreed} onChange={(event) => setAgreed(event.target.checked)} />
              <span>
                {t(lang, "Tôi đã đọc ", "I have read the ")}
                <A href="/chinh-sach">{t(lang, "chính sách và điều kiện hoàn tiền", "policy and refund terms")}</A>
                {t(lang, ". Nếu tôi dưới 16 tuổi, cha mẹ hoặc người giám hộ đã đồng ý.", ". If I am under 16, a parent or guardian has agreed.")}
              </span>
            </label>
            <div className="pay-grid methods" role="radiogroup" aria-label={t(lang, "Cách thanh toán", "Payment method")}>
              <MethodCard
                id="wallet"
                on={method === "wallet"}
                closed={!methodOpen("wallet")}
                title={t(lang, "Ví MoMo", "MoMo wallet")}
                body={t(lang, "Mở app MoMo hoặc trang thanh toán. Xác nhận tự động khi MoMo báo IPN.", "Open the MoMo app or the payment page. Access turns on when MoMo sends the IPN.")}
                onPick={() => setMethod("wallet")}
              />
              <MethodCard
                id="qr"
                on={method === "qr"}
                closed={!methodOpen("qr")}
                title={t(lang, "Quét QR", "Scan a QR")}
                body={plans?.bank?.sample
                  ? t(lang, "Mã QR MoMo ngay trên trang, kèm VietQR chuyển khoản vào tài khoản mẫu.", "A MoMo QR on this page, plus a VietQR for the sample bank account.")
                  : t(lang, "Mã QR MoMo ngay trên trang, kèm VietQR chuyển khoản.", "A MoMo QR on this page, plus a VietQR transfer.")}
                onPick={() => setMethod("qr")}
              />
              <MethodCard
                id="bank"
                on={method === "bank"}
                closed={!methodOpen("bank")}
                title={t(lang, "Chuyển khoản ngân hàng", "Bank transfer")}
                body={t(lang, "Số tài khoản, số tiền và nội dung chuyển khoản riêng của đơn. Đơn chờ 15 phút.", "Account number, amount, and a transfer note unique to this order. The order waits 15 minutes.")}
                onPick={() => setMethod("bank")}
              />
              <MethodCard
                id="crypto"
                on={method === "crypto"}
                closed={!methodOpen("crypto")}
                title={t(lang, "Tiền mã hóa (ngoài Việt Nam)", "Crypto (outside Vietnam)")}
                body={t(lang, "Dành cho người mua ở nước ngoài: USDT hoặc USDC chuyển thẳng vào ví của Bàn Toán. Ở Việt Nam hãy dùng MoMo hoặc chuyển khoản. Đơn chờ 15 phút.", "For buyers outside Vietnam: USDT or USDC sent straight to the Bàn Toán wallet. In Vietnam, use MoMo or a bank transfer. The order waits 15 minutes.")}
                onPick={() => setMethod("crypto")}
              />
            </div>
            {method === "crypto" ? (
              <>
                <ChainPicker
                  name="crypto-chain"
                  value={chain}
                  choices={chainChoices(lang, (plans?.crypto?.chains.map((item) => item.id) ?? ["tron-usdt", "bsc-usdt", "bsc-usdc", "sol-usdc"]).filter(chainOpen))}
                  onPick={(id) => setChain(id as CryptoChainId)}
                />
                {!chainOpen(chain) ? (
                  <p className="pay-warn">{t(lang, "Mạng này chưa nhận thanh toán. Chọn mạng khác.", "This network is not taking payments yet. Pick another one.")}</p>
                ) : plans?.crypto?.chains.find((item) => item.id === chain)?.sample ? (
                  <p className="pay-warn">{t(lang, "Ví nhận của mạng này đang là địa chỉ MẪU.", "The receiving wallet for this network is still a SAMPLE address.")}</p>
                ) : null}
              </>
            ) : null}
            {nothingOpen ? (
              <p className="pay-warn" role="status">{t(lang, "Thanh toán đang được thiết lập và chưa nhận đơn. Bạn vẫn dùng miễn phí mọi bài học, luyện tập và trợ lý 8 câu mỗi ngày.", "Payments are being set up and are not taking orders yet. All lessons, practice and 8 tutor questions a day stay free.")}</p>
            ) : null}
            {formError ? <p className="pay-warn" role="alert">{formError}</p> : null}
            <button className="pay-btn" type="submit" disabled={busy || !plans || !agreed || !canPay}>
              {busy ? t(lang, "Đang tạo đơn…", "Creating the order…") : t(lang, "Tạo đơn thanh toán", "Create the payment")}
            </button>
          </form>
        ) : (
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

function PlanCard({ id, title, days, amount, sample, savings, on, onPick }: {
  id: PlanId;
  title: string;
  days: number;
  amount: number | undefined;
  sample: boolean;
  savings?: { saved: number; percent: number } | null;
  on: boolean;
  onPick: () => void;
}) {
  const lang = useLang();
  return (
    <label className={`pay-card${on ? " is-on" : ""}`}>
      <span className="pay-row">
        <input type="radio" name="plan" value={id} checked={on} onChange={onPick} />
        <b>{title}</b>
      </span>
      <span className="pay-price">{amount === undefined ? "…" : vnd(amount)}</span>
      <small>{sample ? t(lang, `${days} ngày · giá mẫu`, `${days} days · sample price`) : t(lang, `${days} ngày`, `${days} days`)}</small>
      {savings ? <small>{t(lang, `Tiết kiệm ${vnd(savings.saved)} so với 12 tháng lẻ (${savings.percent}%).`, `Save ${vnd(savings.saved)} against 12 separate months (${savings.percent}%).`)}</small> : null}
    </label>
  );
}

function MethodCard({ id, title, body, on, closed = false, onPick }: { id: PayMethod; title: string; body: string; on: boolean; closed?: boolean; onPick: () => void }) {
  const lang = useLang();
  return (
    <label className={`pay-card${on && !closed ? " is-on" : ""}${closed ? " is-closed" : ""}`}>
      <span className="pay-row">
        <input type="radio" name="method" value={id} checked={on && !closed} disabled={closed} onChange={onPick} />
        <b>{title}</b>
      </span>
      <small>{closed ? t(lang, "Chưa mở: đang thiết lập tài khoản nhận tiền.", "Not open yet: the receiving account is being set up.") : body}</small>
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
      <p className="pay-note">{t(lang, `Số tiền ${vnd(order.amount)} do server tính. Mã đơn ${order.orderId}.`, `Amount ${vnd(order.amount)} was set by the server. Order ${order.orderId}.`)}</p>
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
      {order.status === "expired" ? (
        <p className="pay-note">{expiredOrderNote(order.method).text}</p>
      ) : (
        <A href="/nang-cap">{t(lang, "Tạo đơn khác", "Create another order")}</A>
      )}
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
          <small>{t(lang, "Quét bằng app MoMo. MoMo xác nhận qua IPN.", "Scan with the MoMo app. MoMo confirms through the IPN.")}</small>
        </p>
      ) : null}
      {order.bank?.qrDataUrl ? (
        <p>
          <img className="pay-qr" src={order.bank.qrDataUrl} alt={t(lang, "Mã VietQR chuyển khoản", "VietQR transfer code")} />
          <small>{order.bank.sample
            ? t(lang, "VietQR mẫu, quét bằng app ngân hàng. Tiền vào tài khoản cấu hình trên server.", "Sample VietQR, scanned with a banking app. Money goes to the account configured on the server.")
            : t(lang, "Quét bằng app ngân hàng. Tiền vào tài khoản đã cấu hình.", "Scan with a banking app. Money goes to the configured account.")}</small>
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
      <small>{t(lang, "Nội dung chuyển khoản phải đúng từng ký tự. Webhook đối soát hoặc admin mới kích hoạt đơn.", "The transfer note must match exactly. A reconciliation webhook or an admin activates the order.")}</small>
    </section>
  );
}

function ComparePlans() {
  const lang = useLang();
  const rows = [
    [t(lang, "Bài học, luyện tập, máy tính", "Lessons, practice, calculator"), t(lang, "Mở", "Open"), t(lang, "Mở", "Open")],
    [t(lang, "Trợ lý", "Tutor"), t(lang, "Gợi ý, 8 câu mỗi ngày", "Hints, 8 questions a day"), t(lang, "Lời giải đầy đủ, kiểm tra bài làm, ảnh đề, 40 câu mỗi ngày", "Full solutions, checking work, photos, 40 questions a day")],
    [t(lang, "Thi thử THPT 2025", "2025 mock exam"), t(lang, "Đề đầu, đủ 90 phút. Bảng điểm từng phần, chủ đề mất điểm và lời giải xem được ngay", "The first paper, full 90 minutes. The score table, topics and solutions stay visible"), t(lang, "Làm thêm đề, không giới hạn. Bảng điểm mỗi đề vẫn xem như đề miễn phí", "Further papers, without a cap. Each paper's score table stays visible, as on the free paper")],
    [t(lang, "Ôn lỗi sai", "Mistake review"), t(lang, "Câu sai được ghi lại. Lịch ôn thì khóa", "Missed questions are recorded. The review schedule is locked"), t(lang, "Ôn theo lịch 1, 3, 7 và 14 ngày", "Review on days 1, 3, 7 and 14")],
    [t(lang, "Tài liệu ôn tập", "Study notes"), t(lang, "Phần «Ý chính»", "The “Main idea” section"), t(lang, "Đủ bộ, tải PDF và Word", "The full set, PDF and Word downloads")],
  ] as const;
  return (
    <section className="pay-compare" aria-labelledby="compare-title">
      <h2 id="compare-title">{t(lang, "Miễn phí và Premium", "Free and Premium")}</h2>
      <table>
        <thead>
          <tr>
            <th>{t(lang, "Việc", "What")}</th>
            <th>{t(lang, "Miễn phí", "Free")}</th>
            <th>Premium</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([what, free, paid]) => (
            <tr key={what}>
              <th scope="row">{what}</th>
              <td>{free}</td>
              <td>{paid}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
          <b>{t(lang, "Đề thi thử chuẩn THPT 2025", "2025 THPT mock exams")}</b>
          {t(lang,
            ": ba phần như đề thật (12 câu trắc nghiệm, 4 câu Đúng/Sai, 6 câu trả lời ngắn), 90 phút, chấm theo thang điểm của Bộ, xem lại từng câu kèm lời giải. Mỗi đề rút mới từ ngân hàng, làm bao nhiêu đề cũng được.",
            ": the three parts of the real paper (12 multiple choice, 4 true/false, 6 short answer), 90 minutes, scored on the Ministry's scale, with every question reviewable with its solution. Each paper is drawn fresh from the bank, as many as you like.")}
        </li>
        <li>
          <b>{t(lang, "Bảng điểm của đề đã làm", "Scores for papers you sat")}</b>
          {t(lang, ": đề miễn phí cũng xem điểm từng phần và chủ đề mất điểm. Premium là làm thêm đề, rồi ôn câu sai theo lịch.", ": the free paper also shows the score of each part and the topics that cost points. Premium is further papers, then reviewing missed questions on a schedule.")}
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
          <b>{t(lang, "Kiểm tra bài làm, 40 lượt chấm mỗi ngày", "Check my work, 40 markings a day")}</b>
          {t(lang,
            ": ghi các bước tự làm, Bàn Toán chỉ ra bước sai đầu tiên, vì sao sai và cách sửa. Bản miễn phí có 3 lượt chấm mỗi tuần để thử trước.",
            ": write your own steps and Bàn Toán points to the first wrong one, why it is wrong and how to fix it. The free version has 3 markings a week to try first.")}
          {" "}<A href="/cham-bai">{t(lang, "Thử chấm", "Try it")}</A>
        </li>
        <li>
          <b>{t(lang, "Chụp ảnh đề bài", "Photo of a problem")}</b>
          {t(lang, ": chụp đề trong sách hay đề thi, trợ lý đọc ảnh rồi giúp bạn giải.", ": photograph a problem from a book or paper and the tutor reads it and helps.")}
        </li>
        <li>
          <b>{t(lang, "Chế độ phụ huynh và báo cáo tuần", "Parent mode and a weekly report")}</b>
          {t(lang,
            ": khóa lời giải đến khi con tự làm, và báo cáo điểm thi thử con gửi cho bố mẹ bằng link. Miễn phí cho mọi người.",
            ": solutions stay locked until your child has tried, and a mock-score report your child sends by link. Free for everyone.")}
          {" "}<A href="/phu-huynh">{t(lang, "Dành cho phụ huynh", "For parents")}</A>
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
        <A href="/thi-thu">{t(lang, "Làm đề thi thử 2025", "Take a 2025 mock exam")}</A>
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

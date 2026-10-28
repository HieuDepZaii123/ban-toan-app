import { useEffect, useState } from "react";
import { chainChoices, type CryptoChainId } from "./cryptoChoices.ts";
import { ChainPicker, CryptoPay, type CryptoCheck, type CryptoView } from "./CryptoPay.tsx";
import { A } from "../lib/route.tsx";
import { useRoute } from "../lib/useRoute.ts";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";

type PlanId = "month" | "year";
type PayMethod = "wallet" | "qr" | "bank" | "crypto";

type Plans = {
  sample: boolean;
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

const LICENSE_KEY = "ban-toan-license";

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
        if (next.licenseKey) localStorage.setItem(LICENSE_KEY, next.licenseKey);
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
        body: JSON.stringify({ email, plan, method, chain: method === "crypto" ? chain : undefined }),
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
        <p className="pay-note">
          {t(
            lang,
            "Giá dưới đây là giá mẫu, sửa trong cấu hình server. Nội dung các tờ hiện có vẫn mở.",
            "The prices below are samples, edited in the server config. The sheets you already have stay open.",
          )}
          {plans?.lockContent
            ? t(lang, " Cờ khóa nội dung đang bật.", " The content lock is on.")
            : t(lang, " Cờ khóa nội dung đang tắt.", " The content lock is off.")}
        </p>
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
              <PlanCard id="month" title={t(lang, "Một tháng", "One month")} days={month?.days ?? 30} amount={month?.amount} on={plan === "month"} onPick={() => setPlan("month")} />
              <PlanCard id="year" title={t(lang, "Một năm", "One year")} days={year?.days ?? 365} amount={year?.amount} on={plan === "year"} onPick={() => setPlan("year")} />
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
            <div className="pay-grid methods" role="radiogroup" aria-label={t(lang, "Cách thanh toán", "Payment method")}>
              <MethodCard
                id="wallet"
                on={method === "wallet"}
                title={t(lang, "Ví MoMo", "MoMo wallet")}
                body={t(lang, "Mở app MoMo hoặc trang thanh toán. Xác nhận tự động khi MoMo báo IPN.", "Open the MoMo app or the payment page. Access turns on when MoMo sends the IPN.")}
                onPick={() => setMethod("wallet")}
              />
              <MethodCard
                id="qr"
                on={method === "qr"}
                title={t(lang, "Quét QR", "Scan a QR")}
                body={t(lang, "Mã QR MoMo ngay trên trang, kèm VietQR chuyển khoản vào tài khoản mẫu.", "A MoMo QR on this page, plus a VietQR for the sample bank account.")}
                onPick={() => setMethod("qr")}
              />
              <MethodCard
                id="bank"
                on={method === "bank"}
                title={t(lang, "Chuyển khoản ngân hàng", "Bank transfer")}
                body={t(lang, "Số tài khoản, số tiền và nội dung chuyển khoản riêng của đơn. Đơn chờ 15 phút.", "Account number, amount, and a transfer note unique to this order. The order waits 15 minutes.")}
                onPick={() => setMethod("bank")}
              />
              <MethodCard
                id="crypto"
                on={method === "crypto"}
                title={t(lang, "Tiền mã hóa", "Crypto")}
                body={t(lang, "USDT hoặc USDC chuyển thẳng vào ví chủ app. Không qua bên giữ tiền. Đơn chờ 15 phút.", "USDT or USDC sent straight to the app owner's wallet. No custodian. The order waits 15 minutes.")}
                onPick={() => setMethod("crypto")}
              />
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
            <button className="pay-btn" type="submit" disabled={busy || !plans}>
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

function PlanCard({ id, title, days, amount, on, onPick }: { id: PlanId; title: string; days: number; amount: number | undefined; on: boolean; onPick: () => void }) {
  const lang = useLang();
  return (
    <label className={`pay-card${on ? " is-on" : ""}`}>
      <span className="pay-row">
        <input type="radio" name="plan" value={id} checked={on} onChange={onPick} />
        <b>{title}</b>
      </span>
      <span className="pay-price">{amount === undefined ? "…" : vnd(amount)}</span>
      <small>{t(lang, `${days} ngày · giá mẫu`, `${days} days · sample price`)}</small>
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
      <p className="pay-note">{t(lang, `Số tiền ${vnd(order.amount)} do server tính. Mã đơn ${order.orderId}.`, `Amount ${vnd(order.amount)} was set by the server. Order ${order.orderId}.`)}</p>
      {order.licenseKey ? (
        <p className="pay-card">
          <b>{t(lang, "Mã kích hoạt", "License key")}</b>
          <code>{order.licenseKey}</code>
          <small>{t(lang, "Giữ mã này trên máy. Email chỉ để ghi nhận đơn.", "Keep this key on this device. The email only labels the order.")}</small>
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
          <small>{t(lang, "Quét bằng app MoMo. MoMo xác nhận qua IPN.", "Scan with the MoMo app. MoMo confirms through the IPN.")}</small>
        </p>
      ) : null}
      {order.bank?.qrDataUrl ? (
        <p>
          <img className="pay-qr" src={order.bank.qrDataUrl} alt={t(lang, "Mã VietQR chuyển khoản", "VietQR transfer code")} />
          <small>{t(lang, "VietQR mẫu, quét bằng app ngân hàng. Tiền vào tài khoản cấu hình trên server.", "Sample VietQR, scanned with a banking app. Money goes to the account configured on the server.")}</small>
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

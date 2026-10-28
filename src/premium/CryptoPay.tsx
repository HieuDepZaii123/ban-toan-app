import { useEffect, useRef, useState } from "react";
import { t } from "../lib/text.ts";
import { useLang } from "../ui/useLang.ts";
import { CRYPTO_CHOICES, chainChoices, type CryptoChainId } from "./cryptoChoices.ts";

export type { CryptoChainId };

export type CryptoView = {
  chain: CryptoChainId;
  asset: string;
  network: string;
  standard: string;
  display: string;
  address: string;
  contract: string;
  uri: string;
  qrDataUrl: string;
  sample: boolean;
  rate: number;
  rateSource: "live" | "config";
  suffix: number;
  minConfirmations: number;
  finalized: boolean;
  txHash: string;
};

export type CryptoCheck = {
  applied?: boolean;
  error?: string;
  field?: string;
  have?: number;
  need?: number;
};

export function ChainPicker({
  name,
  value,
  choices,
  onPick,
  disabled,
}: {
  name: string;
  value: string;
  choices: { id: string; title: string; note: string }[];
  onPick: (id: string) => void;
  disabled?: boolean;
}) {
  const lang = useLang();
  return (
    <fieldset className="pay-set" disabled={disabled}>
      <legend>{t(lang, "Mạng và token", "Network and token")}</legend>
      <div className="pay-grid chains" role="radiogroup" aria-label={t(lang, "Mạng và token", "Network and token")}>
        {choices.map((choice) => (
          <label key={choice.id} className={`pay-card${value === choice.id ? " is-on" : ""}`}>
            <span className="pay-row">
              <input type="radio" name={name} value={choice.id} checked={value === choice.id} onChange={() => onPick(choice.id)} />
              <b>{choice.title}</b>
            </span>
            <small>{choice.note}</small>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function checkText(lang: "vi" | "en", check: CryptoCheck | undefined): string {
  if (!check?.error || check.error === "confirmations") {
    if (check?.error === "confirmations") {
      return t(
        lang,
        `Đã thấy giao dịch, chưa đủ số xác nhận (${check.have ?? 0}/${check.need ?? "…"}).`,
        `The transaction is visible, but it does not have enough confirmations yet (${check.have ?? 0}/${check.need ?? "…"}).`,
      );
    }
    return "";
  }
  if (check.error === "mismatch" && check.field === "contract") {
    return t(lang, "Giao dịch không phải đúng hợp đồng token của mạng này.", "The transaction is not the token contract for this network.");
  }
  if (check.error === "mismatch" && check.field === "to") {
    return t(lang, "Ví nhận trong giao dịch không khớp địa chỉ của đơn.", "The receiving wallet in the transaction does not match this order.");
  }
  if (check.error === "mismatch" && check.field === "amount") {
    return t(lang, "Số token không khớp số chính xác của đơn, kể cả hậu tố riêng.", "The token amount does not match this order, including its unique suffix.");
  }
  if (check.error === "mismatch") {
    return t(lang, "Giao dịch không khớp token, ví nhận hoặc số tiền.", "The transaction does not match the token, wallet, or amount.");
  }
  if (check.error === "reuse") return t(lang, "Mã giao dịch này đã dùng cho đơn khác.", "This transaction hash was already used for another order.");
  if (check.error === "not_found") return t(lang, "Chưa thấy giao dịch trên mạng này.", "The transaction is not on this network yet.");
  if (check.error === "expired") return t(lang, "Đơn đã hết hạn sau 15 phút.", "The order expired after 15 minutes.");
  if (check.error === "failed") return t(lang, "Giao dịch trên mạng đã thất bại.", "The transaction failed on the network.");
  if (check.error === "rpc") return t(lang, "Chưa hỏi được mạng. Hãy thử lại.", "The network did not answer. Try again.");
  if (check.error === "tx") return t(lang, "Mã giao dịch không đúng dạng.", "That transaction hash does not look valid.");
  return t(lang, "Chưa xác nhận được giao dịch.", "The transaction was not confirmed.");
}

export function CryptoPay({
  orderId,
  status,
  crypto,
  check,
  remain,
  copied,
  onCopy,
  onUpdated,
}: {
  orderId: string;
  status: "pending" | "paid" | "expired";
  crypto: CryptoView;
  check?: CryptoCheck;
  remain: string;
  copied: string;
  onCopy: (label: string, value: string) => Promise<void>;
  onUpdated: (order: { orderId: string }) => void;
}) {
  const lang = useLang();
  const [draft, setDraft] = useState(crypto.txHash);
  const [draftFor, setDraftFor] = useState(crypto.txHash);
  const [busy, setBusy] = useState(false);
  const [localCheck, setLocalCheck] = useState<CryptoCheck | undefined>();
  const [localFor, setLocalFor] = useState("");
  const onUpdatedRef = useRef(onUpdated);
  const tx = draftFor === crypto.txHash ? draft : crypto.txHash;
  const shownCheck = localFor === `${orderId}:${crypto.txHash}` ? localCheck : check;
  const locked = status !== "pending" || crypto.txHash !== "";

  useEffect(() => {
    onUpdatedRef.current = onUpdated;
  });

  useEffect(() => {
    if (status !== "pending" || !crypto.txHash) return;
    let live = true;
    const pull = () => {
      void fetch("/api/premium/crypto", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ orderId, txHash: crypto.txHash }),
      }).then(async (res) => {
        if (!live) return;
        const body = await res.json() as { orderId?: string; error?: string; field?: string; have?: number; need?: number; cryptoCheck?: CryptoCheck };
        if (body.orderId) onUpdatedRef.current({ ...body, orderId: body.orderId });
        const next = !res.ok
          ? { error: body.error, field: body.field, have: body.have, need: body.need }
          : body.cryptoCheck;
        setLocalFor(`${orderId}:${crypto.txHash}`);
        setLocalCheck(next);
      }).catch(() => {
        if (!live) return;
        setLocalFor(`${orderId}:${crypto.txHash}`);
        setLocalCheck({ error: "rpc" });
      });
    };
    pull();
    const timer = window.setInterval(pull, 5000);
    return () => {
      live = false;
      window.clearInterval(timer);
    };
  }, [crypto.txHash, orderId, status]);

  async function pick(id: string): Promise<void> {
    setBusy(true);
    try {
      const res = await fetch("/api/premium/crypto", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ orderId, chain: id }),
      });
      const body = await res.json() as { orderId?: string; error?: string };
      if (res.ok && body.orderId) onUpdated({ ...body, orderId: body.orderId });
      else {
        setLocalFor(`${orderId}:${crypto.txHash}`);
        setLocalCheck({ error: body.error });
      }
    } catch {
      setLocalFor(`${orderId}:${crypto.txHash}`);
      setLocalCheck({ error: "rpc" });
    } finally {
      setBusy(false);
    }
  }

  async function submitTx(): Promise<void> {
    setBusy(true);
    try {
      const res = await fetch("/api/premium/crypto", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ orderId, txHash: tx.trim() }),
      });
      const body = await res.json() as { orderId?: string; error?: string; field?: string; have?: number; need?: number; cryptoCheck?: CryptoCheck };
      if (body.orderId) onUpdated({ ...body, orderId: body.orderId });
      setLocalFor(`${orderId}:${crypto.txHash}`);
      setLocalCheck(!res.ok ? { error: body.error, field: body.field, have: body.have, need: body.need } : body.cryptoCheck);
    } catch {
      setLocalFor(`${orderId}:${crypto.txHash}`);
      setLocalCheck({ error: "rpc" });
    } finally {
      setBusy(false);
    }
  }

  const choices = chainChoices(lang, CRYPTO_CHOICES.map((choice) => choice.id));
  const message = checkText(lang, shownCheck);
  const rateName = crypto.rateSource === "live"
    ? t(lang, "tỷ giá công khai", "the public rate")
    : t(lang, "tỷ giá cấu hình (dự phòng)", "the configured fallback rate");
  const rows = [
    [t(lang, "Ví nhận", "Receiving wallet"), crypto.address],
    [t(lang, "Số token", "Token amount"), crypto.display],
    [t(lang, "Hợp đồng token", "Token contract"), crypto.contract],
  ] as const;

  return (
    <section className="pay-card" aria-label={t(lang, "Thanh toán crypto", "Crypto payment")}>
      <b>{t(lang, "Tiền mã hóa", "Crypto")}</b>
      <p className="pay-clock">
        {status === "pending"
          ? t(lang, `Hết hạn sau ${remain}. Đơn chờ 15 phút.`, `Expires in ${remain}. The order waits 15 minutes.`)
          : t(lang, "Đơn không còn chờ.", "The order is no longer waiting.")}
      </p>
      <p className="pay-warn">
        {t(
          lang,
          `Chỉ gửi ${crypto.asset} trên mạng ${crypto.network} (${crypto.standard}). Gửi sai mạng hoặc sai loại token sẽ không được xác nhận và có thể mất số tiền đó.`,
          `Send only ${crypto.asset} on ${crypto.network} (${crypto.standard}). The wrong network or token is not confirmed and the funds can be lost.`,
        )}
      </p>
      {crypto.sample ? (
        <p className="pay-warn">{t(lang, "Địa chỉ ví đang là giá trị MẪU, chưa phải ví nhận tiền thật. Đừng gửi tài sản thật.", "The wallet address is a SAMPLE. It is not a live wallet. Do not send real assets.")}</p>
      ) : null}
      <p className="pay-note">
        {t(
          lang,
          `Tỷ giá ${crypto.rate.toLocaleString("vi-VN")} đồng cho 1 USD, theo ${rateName}. Hậu tố ${crypto.suffix} là số lẻ riêng của đơn để đối soát. Không nhập cụm từ bí mật hay khóa riêng.`,
          `Rate ${crypto.rate.toLocaleString("vi-VN")} dong per 1 USD, from ${rateName}. Suffix ${crypto.suffix} is unique to this order. Never enter a seed phrase or private key.`,
        )}
      </p>
      <ChainPicker name={`crypto-${orderId}`} value={crypto.chain} choices={choices} disabled={locked || busy} onPick={(id) => void pick(id)} />
      {locked && status === "pending" ? (
        <small>{t(lang, "Đã lưu mã giao dịch. Muốn đổi mạng thì tạo đơn khác.", "A transaction hash is saved. Create another order to switch networks.")}</small>
      ) : null}
      {crypto.qrDataUrl ? <img className="pay-qr" src={crypto.qrDataUrl} alt={t(lang, `Mã QR chuyển ${crypto.display} ${crypto.asset} trên ${crypto.network}`, `QR for ${crypto.display} ${crypto.asset} on ${crypto.network}`)} /> : null}
      <small>
        {crypto.chain.startsWith("bsc")
          ? t(lang, "Mã QR theo EIP-681 để ví EVM điền sẵn hợp đồng, ví nhận và số token.", "The QR is an EIP-681 link so an EVM wallet can fill the contract, recipient, and amount.")
          : crypto.chain === "sol-usdc"
            ? t(lang, "Mã QR là Solana Pay, gồm ví nhận, số USDC và mint.", "The QR is a Solana Pay link with the recipient, USDC amount, and mint.")
            : t(lang, "Mã QR của TRON gồm địa chỉ ví và số USDT. Một số ví chỉ đọc địa chỉ, khi đó hãy chép đúng số token.", "The TRON QR contains the wallet and the USDT amount. Some wallets only read the address, so copy the exact amount.")}
      </small>
      {rows.map(([label, value]) => (
        <div className="pay-kv" key={label}>
          <span>{label}</span>
          <code>{value}</code>
          <button type="button" className="text-btn" onClick={() => void onCopy(label, value)}>
            {copied === label ? t(lang, "Đã chép", "Copied") : t(lang, "Chép", "Copy")}
          </button>
        </div>
      ))}
      <small>
        {crypto.finalized
          ? t(lang, "Máy chủ chỉ nhận giao dịch Solana đã finalized.", "The server accepts a Solana transaction only after it is finalized.")
          : t(lang, `Cần ít nhất ${crypto.minConfirmations} khối xác nhận.`, `At least ${crypto.minConfirmations} confirmations are required.`)}
      </small>
      {status === "pending" ? (
        <div className="pay-tx">
          <label className="pay-row">
            <span>{t(lang, "Mã giao dịch", "Transaction hash")}</span>
            <input
              value={tx}
              spellCheck={false}
              autoComplete="off"
              onChange={(event) => {
                setDraftFor(crypto.txHash);
                setDraft(event.target.value);
              }}
              aria-label={t(lang, "Dán mã giao dịch", "Paste the transaction hash")}
            />
          </label>
          <button className="pay-btn" type="button" disabled={busy || tx.trim() === ""} onClick={() => void submitTx()}>
            {busy ? t(lang, "Đang kiểm tra…", "Checking…") : t(lang, "Kiểm tra giao dịch", "Check the transaction")}
          </button>
        </div>
      ) : null}
      {message ? <p className="pay-warn" role="status">{message}</p> : null}
      <small>{t(lang, "Tiền vào thẳng ví chủ app. Không có bên thứ ba giữ hộ. Nếu mạng chưa kịp báo, admin có thể duyệt tay.", "Funds go straight to the app owner's wallet. No custodian holds them. An admin can confirm the order by hand if the network is late.")}</small>
    </section>
  );
}

const OWNER = "ban-toan-aff-owner";
const REF = "ban-toan-ref";
const CODE = "ban-toan-aff-code";
const VISITOR = "ban-toan-visitor";

function randomId(): string {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function ownerSecret(): string {
  const saved = localStorage.getItem(OWNER);
  if (saved && /^[A-Za-z0-9_-]{16,128}$/.test(saved)) return saved;
  const next = randomId();
  localStorage.setItem(OWNER, next);
  return next;
}

export function ownCode(): string {
  return localStorage.getItem(CODE) || "";
}

export function rememberCode(code: string): void {
  localStorage.setItem(CODE, code);
  if (localStorage.getItem(REF) === code) localStorage.removeItem(REF);
}

export function storedRef(): string {
  const ref = (localStorage.getItem(REF) || "").toUpperCase();
  if (!/^[A-Z0-9]{6,12}$/.test(ref) || ref === ownCode()) return "";
  return ref;
}

export function checkoutRef(): { ref?: string; ownerSecret: string } {
  const secret = ownerSecret();
  const ref = storedRef();
  return ref ? { ref, ownerSecret: secret } : { ownerSecret: secret };
}

/** Ghi ?ref= khi khách mở link, và đếm một lượt cho mã đó. */
export function captureReferral(): void {
  const ref = new URLSearchParams(window.location.search).get("ref")?.trim().toUpperCase() ?? "";
  if (!/^[A-Z0-9]{6,12}$/.test(ref) || ref === ownCode()) return;
  localStorage.setItem(REF, ref);
  if (sessionStorage.getItem("ban-toan-ref-visit") === ref) return;
  sessionStorage.setItem("ban-toan-ref-visit", ref);
  let visitor = localStorage.getItem(VISITOR) || "";
  if (!/^[A-Za-z0-9_-]{16,128}$/.test(visitor)) {
    visitor = randomId();
    localStorage.setItem(VISITOR, visitor);
  }
  const owner = localStorage.getItem(OWNER) || "";
  void fetch("/api/premium/affiliate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action: "visit", code: ref, visitorId: visitor, ownerSecret: owner }),
  }).catch(() => undefined);
}

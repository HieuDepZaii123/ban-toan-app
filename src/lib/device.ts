/** Stable per-browser id so free allowances are per learner, not per shared school network. */
export function deviceId(): string {
  try {
    const saved = localStorage.getItem("ban-toan-device");
    if (saved && /^[A-Za-z0-9-]{8,64}$/.test(saved)) return saved;
    const next = crypto.randomUUID();
    localStorage.setItem("ban-toan-device", next);
    return next;
  } catch {
    return "";
  }
}

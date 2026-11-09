/** Where buyers and parents can reach the owner. Set VITE_SUPPORT_EMAIL at build time. */
export const SUPPORT_EMAIL = (import.meta.env.VITE_SUPPORT_EMAIL as string | undefined)?.trim() ?? "";

/** Days after payment in which a refund can be requested. The policy page and Upgrade page read this. */
export const REFUND_DAYS = 7;

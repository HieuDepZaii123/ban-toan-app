/** Where buyers and parents can reach the owner. Set VITE_SUPPORT_EMAIL at build time. */
export const SUPPORT_EMAIL = (import.meta.env.VITE_SUPPORT_EMAIL as string | undefined)?.trim() ?? "";

/** Days after payment in which a refund can be requested for any reason. The policy page and Upgrade page read this. */
export const REFUND_DAYS = 7;

/** Days in which a parent can get a full refund when a child under 16 bought Premium without them knowing. */
export const PARENT_REFUND_DAYS = 30;

/** Working days to answer a refund or data request, and to send the money back once agreed. */
export const REPLY_WORKING_DAYS = 2;
export const PAYBACK_WORKING_DAYS = 7;

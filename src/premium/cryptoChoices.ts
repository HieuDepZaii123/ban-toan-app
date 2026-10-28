export type CryptoChainId = "tron-usdt" | "bsc-usdt" | "bsc-usdc" | "sol-usdc";

export const CRYPTO_CHOICES: { id: CryptoChainId; titleVi: string; titleEn: string; noteVi: string; noteEn: string }[] = [
  { id: "tron-usdt", titleVi: "USDT trên TRON", titleEn: "USDT on TRON", noteVi: "Chuẩn TRC20. Phí mạng trả bằng TRX, không trừ vào số USDT.", noteEn: "TRC20. The network fee is paid in TRX, not taken from the USDT." },
  { id: "bsc-usdt", titleVi: "USDT trên BSC", titleEn: "USDT on BSC", noteVi: "Chuẩn BEP20. Phí mạng trả bằng BNB.", noteEn: "BEP20. The network fee is paid in BNB." },
  { id: "bsc-usdc", titleVi: "USDC trên BSC", titleEn: "USDC on BSC", noteVi: "Chuẩn BEP20. Đừng gửi USDT vào đơn USDC.", noteEn: "BEP20. Do not send USDT to a USDC order." },
  { id: "sol-usdc", titleVi: "USDC trên Solana", titleEn: "USDC on Solana", noteVi: "Token SPL. Phí mạng trả bằng SOL.", noteEn: "SPL token. The network fee is paid in SOL." },
];

export function chainChoices(lang: "vi" | "en", ids: readonly string[]) {
  return CRYPTO_CHOICES.filter((choice) => ids.includes(choice.id)).map((choice) => ({
    id: choice.id,
    title: lang === "en" ? choice.titleEn : choice.titleVi,
    note: lang === "en" ? choice.noteEn : choice.noteVi,
  }));
}

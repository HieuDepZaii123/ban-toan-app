import { toTex } from "../lib/tex.ts";
import { MathText } from "./MathText.tsx";

/** Nhãn ngắn của lab (nút, chip, tên cảnh) có ký hiệu toán: đi qua cùng bộ đổi toTex với số đọc và thanh trượt. */
export function MathLabel({ text }: { text: string }) {
  return <MathText text={toTex(text)} />;
}

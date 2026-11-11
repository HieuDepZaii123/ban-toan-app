export type CheckoutMethod = "wallet" | "qr" | "bank" | "crypto";

/**
 * Đơn hết 15 phút. Chuyển khoản, QR và MoMo vẫn ghi nhận tiền đến muộn vào đúng đơn.
 * Tiền mã hóa hết hạn thì không đối soát nữa. Không đẩy «Tạo đơn khác» ở cả hai trường hợp.
 */
export function expiredOrderNote(method: CheckoutMethod): { lateStillCredits: boolean; text: string } {
  if (method === "crypto") {
    return {
      lateStillCredits: false,
      text: "Đơn tiền mã hóa đã hết 15 phút nên không còn đối soát. Nếu bạn chưa chuyển, liên hệ kèm mã đơn trước khi làm đơn mới. Nếu đã chuyển, đừng chuyển thêm.",
    };
  }
  return {
    lateStillCredits: true,
    text: "Nếu bạn đã chuyển tiền vào đơn này, đừng tạo đơn mới — tiền đến sau vẫn được ghi nhận cho đúng đơn. Liên hệ kèm mã đơn nếu sau 24 giờ chưa thấy quyền.",
  };
}

type CheckoutMethod = "wallet" | "qr" | "bank" | "crypto";

/**
 * Đơn hết 15 phút. Chuyển khoản, QR và MoMo vẫn ghi nhận tiền đến muộn vào đúng đơn.
 * Tiền mã hóa hết hạn thì không đối soát nữa, trừ khi mã giao dịch đã gửi trước hạn (server còn kiểm 24 giờ).
 * Không đẩy «Tạo đơn khác» ở mọi trường hợp.
 */
export function expiredOrderNote(method: CheckoutMethod, txSent = false): { lateStillCredits: boolean; text: string } {
  if (method === "crypto" && txSent) {
    return {
      lateStillCredits: true,
      text: "Mã giao dịch đã gửi trước khi đơn hết hạn, nên vẫn được đối soát khi đủ xác nhận. Đừng chuyển thêm. Liên hệ kèm mã đơn nếu sau 24 giờ chưa thấy quyền.",
    };
  }
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

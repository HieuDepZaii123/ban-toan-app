/**
 * Khoản nợ nội dung đã biết, khai báo thay vì giấu. Mỗi khoản là một khóa mà scripts/spine.test.ts sẽ báo lỗi.
 * Quy tắc: chỉ được XÓA khoản khi đã trả (test sẽ nhắc), không được THÊM khoản mới để qua test.
 * cover-think: mạch đó của lớp đó chưa có bài tư duy hay phương pháp giải riêng.
 */
export const DEBT = new Set<string>([
  "cover-think:1:hinh",
  "cover-think:2:hinh",
  "cover-think:2:tk",
  "cover-think:4:hinh",
  "cover-think:5:hinh",
  "cover-think:6:hinh",
  "cover-think:8:hinh",
  "cover-think:9:tk",
  "cover-think:10:tk",
  "cover-think:11:hinh",
]);

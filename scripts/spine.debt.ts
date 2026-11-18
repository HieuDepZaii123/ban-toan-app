/**
 * Khoản nợ nội dung đã biết, khai báo thay vì giấu. Mỗi khoản là một khóa mà scripts/spine.test.ts sẽ báo lỗi.
 * Quy tắc: chỉ được XÓA khoản khi đã trả (test sẽ nhắc), không được THÊM khoản mới để qua test.
 */
export const DEBT = new Set<string>([]);

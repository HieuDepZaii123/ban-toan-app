# Chính sách bảo mật

## Báo lỗ hổng

Đừng mở issue công khai cho lỗ hổng bảo mật. Hãy dùng mục **Security → Report a vulnerability** của kho mã trên GitHub (báo riêng tư), hoặc địa chỉ liên hệ ghi ở trang Chính sách của bản đang chạy. Nêu bước tái hiện, phạm vi ảnh hưởng và phiên bản (mã commit).

Chúng tôi cố gắng xác nhận đã nhận trong 7 ngày và báo lại hướng xử lý. Xin cho thời gian sửa trước khi công bố.

## Phạm vi đáng quan tâm

- Thanh toán: chữ ký MoMo IPN, webhook ngân hàng, cấp và thu hồi mã Premium, hoa hồng giới thiệu (`server/pay/`).
- Trợ lý: vượt giới hạn lượt hỏi, chèn chỉ dẫn, nội dung không an toàn cho trẻ (`server/chat/`).
- Trình duyệt: XSS qua công thức, sơ đồ SVG hay nội dung trợ lý trả về (`src/chat/diagram.ts`, `src/ui/MathText.tsx`).
- Dữ liệu trẻ em: bất kỳ đường nào làm dữ liệu rời máy ngoài những gì trang Chính sách đã nêu.

## Đã có sẵn

- CSP không cho script nội tuyến hay `eval`, cùng các header trong `server/http/headers.ts` (chép sang `vercel.json`, có test giữ hai nơi khớp nhau).
- Lỗi máy chủ trả JSON 500 không kèm chi tiết; chi tiết chỉ vào log cùng `x-request-id`.
- Bí mật mẫu trong `.env.example` bị từ chối khi chạy production.
- Mã Premium chỉ trả theo mã đơn trong một giờ sau khi thanh toán; về sau cần cả mã đơn lẫn email.
- `GET /api/health` cho biết trạng thái mà không lộ khóa hay tài khoản.

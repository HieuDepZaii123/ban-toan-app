# Trợ lý toán và video bài giảng

Trợ lý nằm nút **Hỏi toán**. Nó chỉ nói Toán THPT và cách học trên Bàn Toán, gợi ý từng bước, và gắn link `/t/…` khi hợp chủ đề. Công thức trong câu trả lời viết bằng `$...$`.

Khóa chỉ để trên server. Trình duyệt không thấy khóa.

## Cấu hình

Trong `.env` (không commit):

```bash
# Cách ưu tiên: một khóa cho AI Gateway của Vercel.
AI_GATEWAY_API_KEY=
# Chỉ khi không có khóa gateway. Model khi đó là phần sau dấu gạch của AI_MODEL.
OPENAI_API_KEY=
AI_MODEL=openai/gpt-5.4-mini
```

Thiếu cả hai khóa thì `/api/chat` trả lời **chế độ mẫu**: vẫn từ chối câu ngoài Toán, vẫn gợi ý bước, không gọi model.

Lượt: 10 tin mỗi 10 phút theo IP, 8 tin miễn phí mỗi ngày, 40 tin nếu mã Premium trong `localStorage` (`ban-toan-license`) còn hạn. Đếm trong bộ nhớ của instance. Trên serverless, mỗi instance đếm riêng.

## Video bài giảng

Mỗi chủ đề có hai chỗ video trong `src/content/lectures.ts`: `basic` (Cơ bản) và `exam` (Chuẩn thi). `youtubeId` đang là chuỗi mẫu dài hơn 11 ký tự, nên trang không nhúng iframe.

Khi có video thật, thay bằng id YouTube đúng 11 ký tự, ví dụ `dQw4w9WgXcQ`. Không commit file mp4. Iframe chỉ tải sau khi bấm **Xem video**, không tự phát.

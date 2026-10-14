# Bàn Toán

Bàn làm việc cho toán THPT. Học sinh kéo tham số, nhìn đồ thị đổi, rồi làm câu có gợi ý và lời giải. Không phải trò chơi.

Chín tờ đã mở: **Hàm số bậc hai**, **Mũ và logarit**, **Dãy số**, **Lượng giác**, **Giới hạn**, **Đạo hàm**, **Khảo sát hàm số**, **Tích phân**, **Xác suất**. Năm tờ kia có chỗ trên bàn (ý chính và bẫy hay gặp) nhưng hình kéo và đề vẫn đang soạn.

Giao diện tiếng Việt, có thể chuyển EN. Giấy / đêm. Tiến độ, ghi chú và tham số nằm trong `localStorage` trên máy (khóa `ban-toan`).

## Chạy

```bash
npm install
npm run dev
```

Mở http://127.0.0.1:43123

```bash
npm test          # đối chiếu số trong lời giải với hàm tính
npm run lint
npm run build
npm run preview   # http://127.0.0.1:43991
```

Cần Node 22. `npm test` dùng type-stripping của Node, không cần bộ biên dịch riêng.

## Triển khai

`npm run build` ra thư mục `dist/`. Đây là một trang tĩnh: mọi đường `/t/...` phải trả về `index.html`. Bản build đã copy `dist/404.html` từ `index.html` để GitHub Pages không trả 404 khi vào thẳng một tờ.

Ví dụ GitHub Pages: đẩy nội dung `dist/` lên nhánh `gh-pages` (base path đang là `/`, nên trang nên nằm ở domain gốc hoặc một miền riêng, không phải `user.github.io/repo` trừ khi sửa `base` trong `vite.config.ts`).

Service worker đăng ký sau khi trang đã hiện, chỉ ở bản production. Lần mở đầu cần mạng. Những lần sau bàn vẫn mở được khi mất mạng.

## Thêm một tờ

1. Thêm một mục trong `src/content/catalog.ts` (dòng, lớp, đoạn giới thiệu, ba bước Nhìn / Làm / Kết, bẫy).
2. Khi đã có nội dung: viết `src/content/<id>.ts` xuất `lesson` và `questions`, rồi nối vào `src/content/banks.ts`. Đặt `status: "ready"` và `questions` bằng số câu.
3. Hình kéo là một component trong `src/labs/`, vẽ bằng canvas, và được `lazy()` trong `src/topic/TopicDesk.tsx`. Số liệu dùng chung nằm ở `src/lib/math.ts` để phần Làm và phần hình không lệch nhau.
4. Câu hỏi dùng `$...$` cho KaTeX. Chữ thường tiếng Việt có dấu. Mỗi câu bốn lựa chọn, một đáp án, một gợi ý, ba bước. Số sai phải là nhầm lẫn thật (đổi dấu, quên cộng mắt, lấy t = 1 thay vì đỉnh).
5. `npm test` phải vẫn xanh. Hàm mới trong `src/lib/math.ts` thì thêm một khẳng định vào `scripts/check-math.ts`.

## Gói

React, TypeScript, Vite. KaTeX chỉ tải khi mở một tờ. Đồ thị là canvas, không có thư viện biểu đồ. Không Tailwind. Font Be Vietnam Pro tự host, chỉ hai độ đậm.

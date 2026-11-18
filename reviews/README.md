# Vòng người đánh giá

Cách chạy một vòng:

1. Bật bản xem thử: `npm run build && npx vite preview --port 4173`.
2. Với mỗi vai trong `roles.ts`, dựng lời nhắc bằng `buildPrompt(role, "http://127.0.0.1:4173")` và giao cho một tác tử con.
   Tối đa 20 tác tử cùng lúc; hạn mức 5 giờ cạn nhanh nếu chạy cả 20, nên chạy 10 vai trùng với vòng trước khi cần so sánh.
3. Ghi điểm mỗi vai vào `history.json` thành một vòng mới (`id`, `note`, `scores`).
4. `npm run test:content` chạy `scripts/panel.test.ts`: kiểm định dạng và không cho điểm trung bình của các vai trùng
   tụt quá 0,3 so với vòng trước mà không có `regressionNote` giải thích.

So sánh luôn theo các vai trùng nhau giữa hai vòng, không so trung bình của hai nhóm vai khác nhau.

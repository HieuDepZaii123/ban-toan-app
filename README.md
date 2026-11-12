# Bàn Toán

Bàn làm việc cho toán THPT. Học sinh kéo tham số, nhìn đồ thị đổi, rồi làm câu có gợi ý và lời giải. Không phải trò chơi.

Mười bốn tờ đã mở: **Hàm số bậc hai**, **Bất đẳng thức**, **Mũ và logarit**, **Dãy số**, **Lượng giác**, **Giới hạn**, **Đạo hàm**, **Khảo sát hàm số**, **Tích phân**, **Vectơ và ma trận**, **Hình giải tích**, **Hình phẳng và không gian**, **Tổ hợp và thống kê**, **Xác suất**. Mỗi tờ có hình kéo, một ví dụ số, ba bước Nhìn / Làm / Kết, và câu luyện có gợi ý cùng lời giải. Số câu ghi trên từng thẻ (đạo hàm có mười bốn câu, các tờ còn lại mười ba). Mỗi tờ có bốn câu phân biệt lý thuyết: mỗi lần làm rút một mệnh đề đúng và ba mệnh đề sai từ kho của câu đó. Mỗi tờ cũng có ba câu Đúng/Sai/Chưa đủ: mỗi lần làm rút bốn mệnh đề từ kho, mỗi mệnh đề một điểm, điểm x/4 được lưu trong tiến độ.

Giao diện tiếng Việt, có thể chuyển EN. Giấy / đêm. Trang chủ hỏi lớp của người học rồi mở bài của lớp đó; trong Góc bàn có đèn bàn, đồng hồ Hà Nội cùng Tokyo, London và New York, và cửa sổ đổi Sáng / Trưa / Chiều / Đêm theo giờ trên máy (chọn tay được). Cảnh ngoài cửa là SVG, tải khi cảnh đó được mở. Tiến độ, ghi chú và tham số nằm trong `localStorage` (khóa `ban-toan`); đèn và cảnh cửa sổ nằm ở `ban-toan-room`. Mỗi lần mở tab Làm, thứ tự câu trong tờ được xáo. Câu luyện rút số mới từ một hạt giống; câu lý thuyết rút một bộ mệnh đề mới; câu Đúng/Sai/Chưa đủ rút bốn mệnh đề, trong đó có một mệnh đề Chưa đủ. Hạt giống và vị trí đáp án đúng được giữ trong `ban-toan` cho đến khi trả lời hoặc bấm Đề mới, và vị trí đúng không trùng lần trước.

Mỗi tờ có tab thứ tư, **Nghiên cứu**: hai bài dẫn dắt. Học sinh nêu giả thuyết, kéo hình của tờ, bấm Ghi đủ năm dòng, xem đồ thị số liệu, rồi viết kết luận và đối chiếu với chứng minh. Giả thuyết, bảng số và kết luận nằm trong `ban-toan`, cùng cách gộp khi hai tab cùng sửa.

Mỗi tờ có một ảnh động ngắn ngay trên thẻ và ở đầu tab Học: đỉnh parabol trượt, tia nghiệm đổi chiều, mũ với log, dãy co về 0, đường tròn đơn vị, lỗ hổng của giới hạn, cát tuyến thành tiếp tuyến, bậc ba với dấu đạo hàm, hình chữ nhật Riemann, cộng vectơ, khoảng cách tới đường thẳng, tam giác đồng dạng, sáu cách xếp ba vật, và histogram hai xúc xắc. Ảnh vẽ bằng canvas, mỗi tờ một tệp riêng, chỉ tải khi thẻ hoặc trang Học đi vào khung nhìn, và dừng khi ra khỏi màn hình. Trên máy có chuột, thẻ chạy khi rê vào; trên cảm ứng thì chạy khi hiện. Nếu máy xin giảm chuyển động, ảnh giữ một khung đứng.

## Chạy

```bash
npm install
npm run dev
```

Mở http://127.0.0.1:43123

```bash
npm test               # cả hai bộ dưới đây
npm run test:server    # API trên SQLite và Postgres (PGlite): thanh toán, trợ lý, cầu nối HTTP; không cần Python
npm run test:content   # đối chiếu số trong lời giải với hàm tính và sympy
npm run typecheck
npm run lint
npm run build
npm run preview        # http://127.0.0.1:43991, có cả API
npm run check          # lint + test + build, giống CI
```

Cần Node 22.13 trở lên (xem `.nvmrc`): kho đơn hàng dùng `node:sqlite`, Node 20 không có. `npm test` chạy bằng `tsx`. `test:content` gọi Python 3 với sympy: `pip install -r scripts/requirements.txt`.

## Máy chủ (API)

`/api/premium/*` (thanh toán, xem `docs/THANH-TOAN.md`) và `/api/chat` (trợ lý, xem `docs/TRO-LY.md`) viết theo kiểu Fetch (`Request` → `Response`) trong `server/`. Trên Vercel mỗi tệp trong `api/` là một hàm Node; khi chạy `npm run dev` hoặc `npm run preview`, plugin Vite gắn cùng các handler đó lên cổng của trang. Cả hai đường đi qua `server/http/bridge.ts`, nên ở mọi nơi:

- Biến trong `.env` được nạp cho server khi chạy dev và preview. Biến đặt trong shell thắng `.env`.
- Dữ liệu: có `DATABASE_URL` thì đơn hàng, giới thiệu và bộ đếm trợ lý nằm ở Postgres (`npm run db:migrate`, `db:status`, `db:copy-sqlite`); không có thì đơn hàng nằm trong SQLite local. Chi tiết ở `docs/THANH-TOAN.md`.
- Thân request quá lớn bị trả 413 (chat 64 KB, thanh toán 256 KB).
- Lỗi bất ngờ trả JSON 500 không kèm chi tiết; chi tiết chỉ ghi vào log máy chủ.
- Mỗi phản hồi có header `x-request-id` (giữ mã proxy gửi tới, hoặc tự sinh), và dòng log lỗi có cùng mã để dò.

CI (`.github/workflows/ci.yml`) chạy trên mỗi pull request và mỗi lần đẩy lên `main`: một job chạy `test:server` (SQLite và PGlite), một job chạy các bộ test thanh toán trên máy chủ `postgres:16`, một job chạy lint, `test:content` và build.

## Triển khai

Bàn Toán gồm một trang tĩnh (`dist/`) và các hàm trong `api/` (`/api/chat`, `/api/premium/*`). Nơi triển khai được dự tính là **Vercel**. Gói Hobby chỉ nhận tối đa 12 hàm serverless, nên `GET /api/health` và `POST /api/premium/recover` không có tệp riêng: `vercel.json` rewrite chúng vào `/api/chat` và `/api/premium/status` (vẫn giữ đúng đường công khai). `vercel.json` cũng đặt lệnh build, đưa mọi đường không phải `/api/` về `index.html`, gửi header bảo mật (CSP, `nosniff`, `frame-ancestors`…) và cache dài cho tệp có mã băm trong `/assets/`.

- Đặt biến môi trường theo `.env.example`. Thiếu khóa AI thì trợ lý trả lời bằng bài mẫu và giao diện ghi rõ điều đó. Thiếu tài khoản nhận tiền thật thì trang Nâng cấp ghi "Premium chưa mở bán".
- Production nên có `DATABASE_URL` (Postgres): không có thì đơn hàng nằm trong SQLite của từng instance và bộ đếm lượt hỏi không dùng chung. `GET /api/health` báo cảnh báo này.
- `VITE_SUPPORT_EMAIL` là địa chỉ liên hệ hiện ở trang Chính sách và trang Nâng cấp. Hãy đặt trước khi mở cho người dùng.

Máy chủ tĩnh thuần (ví dụ GitHub Pages) chỉ chạy được phần học và luyện: trợ lý, thanh toán và `/api/health` cần các hàm trong `api/`. Bản build có `dist/404.html` chép từ `index.html` để vào thẳng một đường con không bị 404; base path là `/`.

Service worker đăng ký sau khi trang đã hiện, chỉ ở bản production. Lần mở đầu cần mạng. Những lần sau các trang đã mở vẫn dùng được khi mất mạng; trợ lý, thanh toán và các thư viện nặng chỉ tải khi cần (sơ đồ, xuất PDF) thì cần mạng ở lần dùng đầu.

## Đóng góp, bảo mật, giấy phép

- Cách chạy, quy ước và sơ đồ thư mục: `CONTRIBUTING.md`.
- Báo lỗ hổng: `SECURITY.md`.
- Các vòng đánh giá bằng 100 vai mô phỏng: `docs/danh-gia/`.
- Kho mã chưa có tệp `LICENSE`, nghĩa là chưa cấp quyền dùng lại mã nguồn; tác giả giữ mọi quyền cho đến khi thêm giấy phép.

## In English

Bàn Toán is a maths study desk for Vietnamese grades 1–12: lessons with draggable figures, step-by-step examples, practice with hints and worked solutions, a formula book with conditions, mock exams in the current THPT format, and an optional AI tutor. The interface is Vietnamese with an English switch; the 14 topic sheets are bilingual, while grade lessons and method notes are in Vietnamese. There are no accounts: progress stays in the browser, and the "My data" page handles backup, per-person profiles and deletion. Run it with `npm install && npm run dev`; `npm run check` runs lint, all tests and the build. See `CONTRIBUTING.md` (Vietnamese) for the layout and conventions.

## Thêm một tờ

1. Thêm thẻ trong `src/content/cards.ts` và phần Nhìn / Làm / Kết trong `src/content/guides.ts`. `catalog.ts` ghép hai tệp đó cho tờ đang mở.
2. Khi đã có nội dung: viết `src/content/<id>.ts` xuất `lesson` và `questions`, rồi nối vào `src/content/loadTopic.ts`. `scripts/banks.ts` chỉ để `npm test` đối chiếu toàn bộ tờ; trang không import tệp đó. Đặt `status: "ready"` và `questions` bằng số câu.
3. Hình kéo là một component trong `src/labs/`, vẽ bằng canvas, và được `lazy()` trong `src/topic/TopicDesk.tsx`. Số liệu dùng chung nằm ở `src/lib/math.ts` để phần Làm và phần hình không lệch nhau.
4. Câu hỏi dùng `$...$` cho KaTeX. Chữ thường tiếng Việt có dấu. Mỗi câu bốn lựa chọn, một đáp án, một gợi ý, ba bước. Số sai phải là nhầm lẫn thật (đổi dấu, quên cộng mắt, lấy t = 1 thay vì đỉnh).
5. `npm test` phải vẫn xanh. Hàm mới trong `src/lib/math.ts` thì thêm một khẳng định vào `scripts/check-math.ts`.
6. Ảnh động nằm ở `src/motion/clips/<id>.ts` và được `loadClip` gọi khi cần. Số trong hình lấy từ `src/motion/facts.ts`, và `npm test` phải khớp với `src/lib/math.ts`.

## Gói

React, TypeScript, Vite. KaTeX chỉ tải khi mở một tờ. Đồ thị là canvas, không có thư viện biểu đồ. Không Tailwind. Font Be Vietnam Pro tự host, chỉ hai độ đậm.

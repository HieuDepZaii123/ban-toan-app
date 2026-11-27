# Bàn Toán

**Không học thuộc công thức toán học, hãy hiểu nó.**

Bàn Toán là bàn làm việc cho toán từ lớp 1 đến lớp 12. Học sinh kéo tham số, nhìn đồ thị đổi, rồi làm câu có gợi ý và lời giải.

Giao diện tiếng Việt, có thể chuyển EN. Có hai giao diện Giấy và Đêm. Trên trang chủ có đèn bàn, đồng hồ Hà Nội cùng Tokyo, London và New York, và cửa sổ đổi cảnh Sáng / Trưa / Chiều / Đêm theo giờ trên máy (chọn tay được). App chạy được khi mất mạng sau lần mở đầu (PWA).

## Có gì trong app

Menu chia năm nhóm, đúng như `src/ui/navLinks.ts`.

**Học**
- **Chuyên đề** (`/`, `/t/<id>`): mười bốn tờ THPT. Xem [Mười bốn tờ chuyên đề](#mười-bốn-tờ-chuyên-đề).
- **Lớp 1–12** (`/kien-thuc`, `/kien-thuc/<lớp>`): bài học theo từng lớp, mỗi bài có ví dụ giải từng bước và câu luyện.
- **Công thức** (`/so-cong-thuc`): sổ công thức theo nhóm.
- **Phương pháp giải** (`/phuong-phap`): cách giải theo dạng, có phép kiểm SymPy.
- **Tài liệu ôn tập** (`/tai-lieu`): gói ôn theo chủ đề, xuất ra PDF hoặc Word.
- **Khoa học** (`/khoa-hoc`): lập trình toán, ứng dụng dữ liệu, đề trường chuyên, vật lý toán.
- **Nghiên cứu** (`/nghien-cuu`): các bài dẫn dắt nêu giả thuyết, đo, rồi kết luận.

**Luyện tập**
- **Đề luyện** (`/luyen`): đề trộn nhiều tờ.
- **Lớp 1–9** (`/luyen-lop/<lớp>`): luyện theo lớp, nhớ vị trí câu và lọc riêng câu sai.
- **THPT 10–12** (`/luyen-thpt`): luyện theo lớp và chủ đề, có thi có giờ.
- **Thi thử 2025** (`/thi-thu`): đề theo cấu trúc THPT 2025 (trắc nghiệm, Đúng/Sai, trả lời ngắn), chấm điểm từng phần và chỉ ra chủ đề mất điểm.
- **Ôn lỗi sai** (`/on-loi-sai`): câu sai được hẹn ôn lại sau 1, 3, 7 và 14 ngày.
- **Chấm bài** (`/cham-bai`): dán lời giải, app tìm bước tính sai đầu tiên.
- **Sổ lỗi** (`/so-loi`) và **Đánh giá** (`/danh-gia`).

**Công cụ**
- **Soạn tài liệu** (`/soan-tai-lieu`): soạn đề hoặc phiếu học, xuất PDF/Word.
- **Xưởng hình** (`/xuong-hinh`): dựng hình phẳng, xoay khối không gian, luyện đề hình.
- **Máy tính** (`/may-tinh`).
- **Nhạc học bài**: thanh nhạc nền tự host. Tệp nằm ở `public/study-media/`, danh sách ở `src/study/catalog.ts`.
- **Trợ lý**: chỉ trả lời câu hỏi toán, có giới hạn lượt mỗi ngày. Xem `docs/TRO-LY.md`.

**Premium** (`/nang-cap`): thêm đề thi thử, ôn lỗi sai theo lịch, tài liệu ôn tập và nhiều lượt trợ lý hơn. Thanh toán bằng MoMo, VietQR/chuyển khoản, hoặc USDT/USDC cho người mua ở ngoài Việt Nam. Xem `docs/THANH-TOAN.md`.

**Khác**: Giới thiệu bạn bè (`/gioi-thieu`), Phụ huynh và báo cáo tiến độ (`/phu-huynh`, `/bao-cao`), Chính sách bảo mật, điều khoản và hoàn tiền (`/chinh-sach`).

## Mười bốn tờ chuyên đề

**Hàm số bậc hai**, **Bất đẳng thức**, **Mũ và logarit**, **Dãy số**, **Lượng giác**, **Giới hạn**, **Đạo hàm**, **Khảo sát hàm số**, **Tích phân**, **Vectơ và ma trận**, **Hình giải tích**, **Hình phẳng và không gian**, **Tổ hợp và thống kê**, **Xác suất**.

Mỗi tờ có:
- **Hình kéo và ảnh động.** Hình kéo đi kèm một ví dụ số. Ảnh động ngắn vẽ bằng canvas, chỉ tải khi vào khung nhìn và dừng khi ra khỏi màn hình. Nếu máy xin giảm chuyển động, ảnh giữ một khung đứng.
- **Bốn tab Học / Làm / Kết / Nghiên cứu.** Tab Học có bài giảng ngắn, phần kiến thức tổng quát và chi tiết, và các dạng bài.
- **Câu luyện** có gợi ý và lời giải ba bước. Mỗi lần làm rút số mới từ một hạt giống, và vị trí đáp án đúng không trùng lần trước.
- **Câu lý thuyết:** mỗi lần rút một mệnh đề đúng và ba mệnh đề sai từ kho.
- **Câu Đúng/Sai/Chưa đủ:** mỗi lần rút bốn mệnh đề, trong đó có một mệnh đề Chưa đủ. Điểm x/4 được lưu.
- **Tab Nghiên cứu:** hai bài dẫn dắt. Học sinh nêu giả thuyết, kéo hình, ghi năm dòng số liệu, xem đồ thị, rồi viết kết luận và đối chiếu với chứng minh.

## Dữ liệu trên máy

Tiến độ, ghi chú, tham số, hạt giống câu hỏi và bài nghiên cứu nằm trong `localStorage`, khóa `ban-toan`. Khi hai tab cùng sửa, dữ liệu được gộp lại. Đèn và cảnh cửa sổ nằm ở `ban-toan-room`. Các trang luyện, thi thử, ôn lỗi sai và Premium có khóa riêng (tiền tố `ban-toan-…`). Nếu trình duyệt chặn bộ nhớ, `index.html` thay bằng bộ nhớ tạm để trang vẫn chạy.

## Chạy

```bash
npm install
npm run dev
```

Mở http://127.0.0.1:43123

```bash
npm test               # cả ba bộ dưới đây
npm run test:server    # API trên SQLite và Postgres (PGlite): thanh toán, trợ lý, cầu nối HTTP; không cần Python
npm run test:content   # đối chiếu số trong lời giải với hàm tính và SymPy, kiểm KaTeX và văn phong
npm run test:ui        # component React (Vitest + Testing Library)
npm run typecheck
npm run lint
npm run build
npm run preview        # http://127.0.0.1:43991, có cả API
npm run check          # lint + test + build, giống CI
```

Cần Node 22.13 trở lên (xem `.nvmrc`), vì kho đơn hàng dùng `node:sqlite`. `test:content` gọi Python 3 với SymPy: `pip install -r scripts/requirements.txt`.

## Cấu hình

Chép `.env.example` thành `.env` rồi điền. Mọi biến đều có ghi chú trong tệp đó. Bỏ trống thì app vẫn chạy: thanh toán dùng sandbox hoặc tắt, trợ lý chạy chế độ mẫu, không gọi model.

- **Thanh toán:** MoMo, ngân hàng nhận tiền, webhook Casso/SePay, ví crypto, `ADMIN_TOKEN`, hoa hồng giới thiệu. Xem `docs/THANH-TOAN.md`.
- **Trợ lý:** AI Gateway hoặc OpenAI, các nhà cung cấp LLM miễn phí kèm thứ tự dự phòng, giới hạn lượt mỗi ngày. Xem `docs/TRO-LY.md`.
- **Phía trình duyệt** (`VITE_*`, lộ ra trong bundle nên không để bí mật ở đây): `VITE_SUPPORT_EMAIL` (email hiện trên trang chính sách), `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.

## Máy chủ (API)

`/api/premium/*` (thanh toán) và `/api/chat` (trợ lý) viết theo kiểu Fetch (`Request` → `Response`) trong `server/`. Trên Vercel, mỗi tệp trong `api/` là một hàm Node. Khi chạy `npm run dev` hoặc `npm run preview`, plugin Vite gắn cùng các handler đó lên cổng của trang. Cả hai đường đều đi qua `server/http/bridge.ts`, nên ở mọi nơi:

- Biến trong `.env` được nạp cho server khi chạy dev và preview. Biến đặt trong shell thắng `.env`.
- Có `DATABASE_URL` thì đơn hàng, giới thiệu và bộ đếm trợ lý nằm ở Postgres (`npm run db:migrate`, `db:status`, `db:copy-sqlite`). Không có thì đơn hàng nằm trong SQLite local.
- Thân request quá lớn bị trả 413 (chat 64 KB, thanh toán 256 KB).
- Lỗi bất ngờ trả JSON 500 không kèm chi tiết. Chi tiết chỉ ghi vào log máy chủ.
- Mỗi phản hồi có header `x-request-id` (giữ mã proxy gửi tới, hoặc tự sinh), và dòng log lỗi có cùng mã để dò.

CI (`.github/workflows/ci.yml`) chạy trên mỗi pull request và mỗi lần đẩy lên `main`, gồm ba job:
- `test:server` trên SQLite và PGlite;
- các bộ test thanh toán trên máy chủ `postgres:16`;
- lint, `test:content`, `test:ui` và build.

## Triển khai

Bản chính chạy trên **Vercel**. `vercel.json` build bằng `npm run build`, phục vụ thư mục `dist/`, và đưa mọi đường không phải `/api/` về `index.html`. Các hàm trong `api/` chạy cùng dự án. Khi deploy cần `DATABASE_URL`, vì SQLite không giữ được dữ liệu trên serverless.

Chỉ cần phần trang, không cần API? `dist/` là một trang tĩnh: mọi đường phải trả về `index.html`. Bản build đã copy `dist/404.html` từ `index.html` để GitHub Pages không trả 404 khi vào thẳng một trang. Base path đang là `/`, nên trang nên nằm ở domain gốc, trừ khi sửa `base` trong `vite.config.ts`.

Service worker đăng ký sau khi trang đã hiện, chỉ ở bản production.

## Cấu trúc thư mục

| Thư mục | Nội dung |
|---|---|
| `src/content/` | Nội dung các tờ: thẻ, bài giảng, câu hỏi, biến thể (`vary/`), kiến thức (`knowledge/`), dạng bài (`dang/`), bài theo lớp (`grades/`) |
| `src/labs/`, `src/motion/` | Hình kéo (canvas) và ảnh động của từng tờ |
| `src/topic/`, `src/home/`, `src/pages/` | Trang tờ, trang chủ, các trang còn lại |
| `src/thpt/`, `src/grades/` | Ngân hàng câu THPT, đề thi thử 2025, ôn lỗi sai, luyện theo lớp |
| `src/premium/`, `src/chat/`, `src/docs/` | Premium và giấy phép, trợ lý, xuất PDF/Word |
| `src/workshop/`, `src/science/`, `src/research/`, `src/study/` | Xưởng hình, Khoa học, Nghiên cứu, nhạc học bài |
| `src/lib/` | Kho dữ liệu, PRNG, định dạng số, toán dùng chung (`math.ts`) |
| `server/` | API: `pay/` (thanh toán), `chat/` (trợ lý), `db/` (SQLite/Postgres), `http/` (cầu nối) |
| `api/` | Hàm Vercel, mỗi tệp gọi một handler trong `server/` |
| `scripts/` | Bộ test, oracle SymPy (`*_sympy.py`), công cụ cơ sở dữ liệu. Các helper test dùng chung nằm ở `testkit.ts` |

## Thêm một tờ

1. Thêm thẻ trong `src/content/cards.ts` và phần Nhìn / Làm / Kết trong `src/content/guides.ts`. `catalog.ts` ghép hai tệp đó cho tờ đang mở.
2. Viết `src/content/<id>.ts` xuất `lesson` và `questions`, rồi nối vào `src/content/loadTopic.ts`. `scripts/banks.ts` chỉ để `npm test` đối chiếu toàn bộ tờ, trang không import tệp đó. Đặt `status: "ready"` và `questions` bằng số câu.
3. Hình kéo là một component trong `src/labs/`, vẽ bằng canvas, và được `lazy()` trong `src/topic/TopicDesk.tsx`. Số liệu dùng chung nằm ở `src/lib/math.ts` để phần Làm và phần hình không lệch nhau.
4. Câu hỏi dùng `$...$` cho KaTeX. Chữ thường tiếng Việt có dấu, và chữ có dấu không nằm trong `$...$`. Mỗi câu có bốn lựa chọn, một đáp án, một gợi ý, ba bước. Số sai phải là nhầm lẫn thật (đổi dấu, quên cộng mắt, lấy t = 1 thay vì đỉnh).
5. Ảnh động nằm ở `src/motion/clips/<id>.ts` và được `loadClip` gọi khi cần. Số trong hình lấy từ `src/motion/facts.ts`, và phải khớp với `src/lib/math.ts`.
6. Kiến thức tổng quát và chi tiết nằm ở `src/content/knowledge/<id>.ts` (xuất `<id>Knowledge`, nối vào `src/content/knowledge/index.ts`) và hiện trong tab Học. Mỗi bộ gồm:
   - phần tổng quát;
   - 5–8 phần chi tiết (định nghĩa, định lí, công thức, cách làm, lưu ý, ví dụ);
   - mục «cần nhớ»;
   - liên kết sang tờ khác;
   - các phép kiểm SymPy cho mọi số trong ví dụ.

   Tiêu đề không có công thức. Khi đang soạn dở, chạy riêng `npx tsx scripts/knowledge.test.ts <id>`.
7. `npm test` phải vẫn xanh. Nếu thêm hàm mới vào `src/lib/math.ts` thì thêm một khẳng định vào `scripts/check-math.ts`.

## Gói

React 19, TypeScript, Vite. Lần mở trang chủ tải khoảng 105 KB (gzip). Thư viện nặng chỉ tải ở trang cần chúng: KaTeX ở trang có công thức, Mermaid khi trợ lý vẽ sơ đồ, pdf-lib khi xuất PDF, SDK Supabase khi đề luyện ghi tiến độ lần đầu. Nội dung cũng tải theo phần đang mở: trang một tờ chỉ tải bài, dạng bài và kiến thức của tờ đó, trang một lớp chỉ tải sách của lớp đó. Đồ thị là canvas, không có thư viện biểu đồ. Không Tailwind. Font Be Vietnam Pro tự host, chỉ hai độ đậm.

# Bàn Toán: hướng dẫn cho agent lập trình

Ứng dụng học toán THPT (React 19, Vite, TypeScript, API kiểu Fetch). Tài liệu này dùng được cho mọi agent và mọi người; chỉ có lệnh shell và đường dẫn tính từ gốc repo.

## Chạy

```bash
npm ci
npm run dev        # http://127.0.0.1:43123 (cổng cố định); API /api/chat, /api/premium/* gắn cùng cổng
npm run preview    # http://127.0.0.1:43991 sau npm run build
```

Dừng server: `lsof -ti:43123 -sTCP:LISTEN | xargs -r kill`. Đừng dùng `pkill -f` rộng.

## Kiểm tra (chạy trước khi commit)

```bash
npx tsc -b && npx oxlint
npm run test:server    # API, SQLite và PGlite, không cần dịch vụ ngoài
npm run test:content   # nội dung, công thức (sympy), thuật toán
npm run test:ui        # vitest (jsdom)
npm run build
```

`oxlint` có nhiều cảnh báo cũ; chỉ xét lỗi và các tệp bạn sửa.

## Điều khiển giao diện không cần mở cửa sổ

Cần Playwright và Chromium (`npm i -D playwright && npx playwright install chromium`, hoặc dùng bản có sẵn). Khi dev server đang chạy:

```bash
npm run drive -- trig vi          # <chuyên đề> <vi|en> [thư mục ảnh]
```

Lệnh mở `/t/<chuyên đề>?tab=hoc`, chờ các hình «Suy từ số 0» tải, kéo thanh trượt đầu tiên, chụp ảnh vào `/tmp/ban-toan-shots`, in JSON `{heading, cards, mapNodes, canvasChanged, errors}` và thoát mã 1 nếu có lỗi hoặc không có hình. Mã chuyên đề: quadratic ineq exp sequence trig limit derivative survey integral vector analytic triangle combo probability. Nhớ mở ảnh ra xem: canvas trống là lỗi.

API chấm bài (chế độ ngoại tuyến, không cần khóa; mỗi thiết bị miễn phí 3 lượt mỗi tuần nên đổi `device`):

```bash
curl -s -XPOST 'http://127.0.0.1:43123/api/chat?do=check' -H 'content-type: application/json' \
  -d '{"problem":"Giải 2x + 6 = 0","steps":["2 + 2 = 5"],"device":"device-smoke-0001"}'
```

## Sửa nội dung bài học

- Kiến thức: `src/content/knowledge/<id>.ts` (chỉ tiếng Việt). Hình tương tác: `src/topic/zero/*Widgets.tsx`, song ngữ qua `tt(vi, en)`. Lời bài học: `src/content/<id>.ts` (mỗi dòng `vi` và `en`).
- Công thức nằm trong `$…$` trên một dòng; dùng `String.raw` (`R`…``). Thuộc tính JSX không xử lý `\\`.
- Bản Anh không được lẫn chữ Việt (`src/topic/zero/FromZero.test.tsx` kiểm).
- Mỗi định lí/công thức có `suy` (cách chứng minh thứ nhất) và có thể có `suyKhac` (cách khác thật sự khác hướng, 2–7 bước). Chuyên đề đã làm xong thì thêm id vào `MULTI_PROOF` trong `scripts/knowledge.test.ts`; test khi đó đòi mọi `dinh-ly` có ít nhất một cách khác và cả chuyên đề có ít nhất ba.
- Công thức trong chứng minh mới nên có thêm phép kiểm sympy ở mảng `checks` của chuyên đề.
- Sau khi chỉnh lời văn, so với bản cũ để chắc không mất công thức hay số: `npm run check:prose -- <commit> <tệp>...` (báo «MẤT» khi một đoạn `$…$` hoặc số biến mất; phần «thêm» là bình thường khi bạn viết thêm).
- Sửa bằng chỉnh từng cụm câu duy nhất, đừng thay hàng loạt bằng script: chuỗi song ngữ dễ bị đổi nhầm nửa Việt/Anh.

## Điểm dễ vấp

- Cổng dev là 43123, không phải 5173.
- Ngôn ngữ và tùy chọn nằm trong một khóa localStorage `ban-toan` (JSON `{"v":1,"lang":"en","at":{"lang":<ms>}}`), không có khóa `lang`.
- Thanh trượt: dùng thao tác nhập của trình duyệt (`fill`); gán `el.value` rồi bắn sự kiện `input` không tới được React.
- Hình tải lười theo chuyên đề: chờ `.fz-card` rồi chờ thêm một chút trước khi đếm.
- Không viết `2>&1` hay `&` trong lệnh lồng qua nhiều lớp shell; chạy server nền bằng `nohup … > log 2>&1 &` ở một dòng riêng.
- Chấm bài ngoại tuyến chỉ kiểm phép tính và hằng đẳng thức, còn lại trả «chưa rõ».

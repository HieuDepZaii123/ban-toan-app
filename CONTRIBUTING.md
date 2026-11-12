# Đóng góp cho Bàn Toán

Cảm ơn bạn muốn giúp. Trang này nói cách chạy, cách kiểm và cách gửi thay đổi.

## Chạy và kiểm

```bash
npm install
pip install -r scripts/requirements.txt   # sympy, cho npm run test:content
npm run dev                                # http://127.0.0.1:43123
npm run check                              # lint + mọi bộ test + build, giống CI
```

Cần Node 22.13 trở lên. `npm run check` phải sạch trước khi mở pull request.

## Thư mục

| Thư mục | Nội dung |
|---|---|
| `src/content/` | Bài học, câu hỏi và lời giải của 14 chuyên đề; `grades/` là bài lớp 1–12; `dang/` là phần Dạng bài. |
| `src/labs/`, `src/motion/` | Hình kéo và ảnh động vẽ bằng canvas. |
| `src/topic/`, `src/pages/`, `src/home/`, `src/grades/` | Các trang. |
| `src/ui/` | Đầu trang, thanh đáy, Tùy chọn, Mục lục và các phần dùng chung. |
| `src/lib/` | Kho tiến độ (`store.ts`), dữ liệu người học (`userData.ts`), định tuyến, các hàm toán dùng chung. |
| `src/chat/`, `server/chat/` | Khung trợ lý và API `/api/chat`. |
| `src/premium/`, `server/pay/` | Trang Nâng cấp và API `/api/premium/*`. |
| `server/http/` | Cầu nối Node ↔ Fetch, header bảo mật, `/api/health`. |
| `api/` | Hàm Vercel: mỗi tệp là một hàm. Gói Hobby chỉ cho tối đa 12 hàm, nên đường mới gắn vào hàm có sẵn bằng rewrite trong `vercel.json` (`?route=`), không thêm tệp. |
| `scripts/` | Các bộ test (`*.test.ts`) và công cụ; `*_sympy.py` đối chiếu đáp số bằng sympy. |
| `docs/` | Tài liệu thanh toán, trợ lý, và các vòng đánh giá. |

## Quy ước

- Nội dung toán: mỗi con số trong lời giải phải có một dòng `checks` để máy kiểm lại. Công thức nào có điều kiện dùng thì ghi điều kiện. Số sai trong đáp án nhiễu phải là nhầm lẫn thật của học sinh.
- Chữ trên giao diện: viết qua `t(lang, "tiếng Việt", "English")`. Tiếng Việt có dấu, lời thường, không dùng thuật ngữ kỹ thuật với học sinh.
- Không hứa trên giao diện điều chưa có thật (video, tính năng, số liệu).
- Không thêm thành phần nổi che nội dung. Chữ nhỏ nhất là 0,83rem.
- Dữ liệu người học ở lại trên máy. Thay đổi nào làm dữ liệu rời máy phải mặc định tắt, có ghi ở trang Chính sách và trang Dữ liệu của tôi.
- Bí mật (khóa AI, token quản trị, tài khoản nhận tiền) chỉ nằm trong biến môi trường, không vào kho mã.

## Gửi thay đổi

1. Tạo nhánh từ `main`.
2. Giữ mỗi pull request quanh một việc, có test cho hành vi mới.
3. Chạy `npm run check`.
4. Mô tả theo mẫu trong `.github/pull_request_template.md`.

Báo lỗi bảo mật: xem `SECURITY.md`, đừng mở issue công khai.

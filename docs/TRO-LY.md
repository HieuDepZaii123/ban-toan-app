# Trợ lý toán và video bài giảng

Trợ lý nằm nút **Hỏi toán**. Nó chỉ nói Toán THPT và cách học trên Bàn Toán, gợi ý từng bước, và gắn link `/t/…` khi hợp chủ đề. Công thức trong câu trả lời viết bằng `$...$`.

Khóa chỉ để trên server. Trình duyệt không thấy khóa.

## Cấu hình

Trong `.env` (không commit). `npm run dev` và `npm run preview` nạp tệp này cho `/api/chat`; trên Vercel đặt cùng các biến trong phần Environment Variables.

```bash
# Cách ưu tiên: một khóa cho AI Gateway của Vercel.
AI_GATEWAY_API_KEY=
# Chỉ khi không có khóa gateway. Model khi đó là phần sau dấu gạch của AI_MODEL.
OPENAI_API_KEY=
AI_MODEL=openai/gpt-5.4-mini
```

### Nhà cung cấp miễn phí

Danh sách lấy từ [mnfst/awesome-free-llm-apis](https://github.com/mnfst/awesome-free-llm-apis) (CC0), chép nguyên `data.json` vào `vendor/awesome-free-llm-apis/`. Trợ lý chỉ dùng những nhà có gói miễn phí lâu dài, cần khóa thật và nói API kiểu OpenAI:

| id | Biến khóa | Model mặc định | Lấy khóa |
| --- | --- | --- | --- |
| `groq` | `GROQ_API_KEY` | `openai/gpt-oss-120b` | console.groq.com |
| `gemini` | `GEMINI_API_KEY` | `gemini-3.6-flash` | aistudio.google.com |
| `openrouter` | `OPENROUTER_API_KEY` | `google/gemma-4-31b-it:free` | openrouter.ai |
| `mistral` | `MISTRAL_API_KEY` | `mistral-small-2603` | console.mistral.ai |
| `nvidia` | `NVIDIA_API_KEY` | `nvidia/nemotron-3-ultra-550b-a55b` | build.nvidia.com |
| `zai` | `ZAI_API_KEY` | `glm-4.7-flash` | z.ai (cổng quốc tế) |

```bash
GROQ_API_KEY=
GEMINI_API_KEY=
FREE_LLM_ORDER=groq,gemini,openrouter,mistral,nvidia,zai
GROQ_MODEL=          # để trống thì dùng model mặc định
```

Thứ tự gọi: khóa trả phí (gateway / OpenAI) nếu có, rồi từng nhà miễn phí có khóa theo `FREE_LLM_ORDER`. Nhà nào lỗi, hết lượt hoặc trả rỗng thì chuyển nhà kế tiếp. Mỗi lượt chờ tối đa 20 giây, cả chuỗi tối đa 25 giây.

Lưu ý: gói miễn phí có giới hạn thấp (OpenRouter 50 lượt/ngày, Groq 1.000 lượt/ngày) và nhiều nhà có thể dùng câu hỏi để huấn luyện model. Điều khoản Gemini yêu cầu dùng gói trả phí khi phục vụ người dùng ở EEA, Thụy Sĩ hoặc Anh. Đọc ghi chú trong `vendor/awesome-free-llm-apis/data.json` trước khi bật cho học sinh.

Cập nhật danh sách: thay `vendor/awesome-free-llm-apis/data.json` bằng bản mới, chạy `npm run free-llm:sync` để sinh lại `server/chat/freeCatalog.ts`, rồi `npm test`. Test báo lỗi nếu model mặc định không còn trong danh sách.

Thiếu mọi khóa thì `/api/chat` trả lời **chế độ mẫu**: câu ngoài Toán được kéo nhẹ về bài học, vẫn gợi ý bước, không gọi model.

Lượt: 10 tin mỗi 10 phút theo IP, 8 tin miễn phí mỗi ngày, 40 tin nếu mã Premium trong `localStorage` (`ban-toan-license`) còn hạn. Có `DATABASE_URL` thì đếm trong bảng `chat_hits` của Postgres, mọi instance thấy cùng số lượt. Không có thì đếm trong bộ nhớ, và trên serverless mỗi instance đếm riêng.

## Video bài giảng

Mỗi chủ đề có hai chỗ video trong `src/content/lectures.ts`: `basic` (Cơ bản) và `exam` (Chuẩn thi). `youtubeId` đang là chuỗi mẫu dài hơn 11 ký tự, nên trang không nhúng iframe.

Khi có video thật, thay bằng id YouTube đúng 11 ký tự, ví dụ `dQw4w9WgXcQ`. Không commit file mp4. Iframe chỉ tải sau khi bấm **Xem video**, không tự phát.

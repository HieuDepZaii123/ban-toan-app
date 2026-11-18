/**
 * Bộ người đánh giá tự động: mỗi vai một mối quan tâm, cùng một đề bài và cùng một định dạng trả lời,
 * để điểm giữa các vòng so sánh được. Chạy một vòng: dựng lời nhắc bằng buildPrompt, gửi mỗi vai cho một tác tử con
 * (tối đa 20 tác tử cùng lúc), ghi điểm vào reviews/history.json. Xem reviews/README.md.
 */
export type Role = { id: string; name: string; focus: string };

export const ROLES: Role[] = [
  { id: "gv12", name: "giáo viên lớp 1–2", focus: "trang /kien-thuc/1, /kien-thuc/2 (cùng /dang, /tu-duy, /lo-trinh), phương pháp tach-so-lop-1 và dat-tinh-co-nho; xét cho trẻ 6–8 tuổi: đúng toán, hợp lứa tuổi, câu chữ dễ hiểu." },
  { id: "parent5", name: "phụ huynh lớp 5", focus: "/kien-thuc/5 và các trang con, phương pháp phan-tram-tong-phan; phụ huynh không giỏi toán có hiểu để kèm con không." },
  { id: "thcs", name: "giáo viên THCS", focus: "src/content/think/thcs.ts, dạng bài lớp 6–9, các phương pháp lớp 3–8 trong src/methods/methods.json: tìm lỗi toán, lập luận hổng, ví dụ mâu thuẫn." },
  { id: "hs6", name: "học sinh lớp 6 dễ nản", focus: "/kien-thuc/6/tu-duy, /kien-thuc/6/dang, /phuong-phap/uoc-boi-ung-dung: chỗ nào khó hiểu, thuật ngữ chưa giải thích, bước nhảy cóc." },
  { id: "hs10", name: "học sinh lớp 10 giỏi", focus: "tab Thí nghiệm của quadratic, ineq, exp: làm thử thách, đọc lời báo đúng sai, có thử thách nào sai hoặc chấp nhận đáp án sai không." },
  { id: "hs12", name: "học sinh ôn thi lớp 12", focus: "derivative, integral, probability, vector, analytic (tab tn), bài tư duy và dạng bài lớp 12, trang /thi-thu: đúng trọng tâm thi, đủ khó." },
  { id: "lecturer", name: "giảng viên toán đại học", focus: "tính đúng đắn của src/content/think/topics.ts và các check() trong src/content/challenges.ts, labExtra.ts, kể cả dung sai; có thể thử check() trên lưới thanh trượt." },
  { id: "a11y", name: "chuyên gia truy cập (WCAG)", focus: "tab Thí nghiệm, LabTools, LabChallenges, ThinkCard: nhãn, ARIA, aria-live, tương phản, vùng chạm, thứ tự focus." },
  { id: "keyboard", name: "người dùng chỉ bàn phím", focus: "/t/trig?tab=tn và /t/combo?tab=tn chỉ bằng phím: Tab, Dấu cách, phím 1–4, mũi tên, Ctrl+Z/Y; mất focus, bẫy focus, xung đột phím." },
  { id: "mobile", name: "người thử điện thoại", focus: "viewport 390x844: /t/derivative?tab=tn, /t/vector?tab=tn, /kien-thuc/9/tu-duy, /phuong-phap; chữ cắt, cuộn ngang, nút nhỏ; xác minh bằng cuộn thật trước khi kết luận thanh cố định đè." },
  { id: "english", name: "giáo viên bản ngữ tiếng Anh", focus: "các trường en trong src/content/think, challenges.ts, labExtra.ts, nhãn tiếng Anh của lab: câu gượng, sai thuật ngữ, sót tiếng Việt, dấu thập phân." },
  { id: "katex", name: "biên tập ký hiệu toán", focus: "src/lib/tex.ts (toTex): viết script thử với chuỗi thật của các lab, tìm kết quả sai; mở trig, exp, derivative xem ký hiệu hiển thị." },
  { id: "pedagogy", name: "chuyên gia sư phạm toán", focus: "thiết kế học tập của thử thách có dự đoán trước, sáu loại bài tư duy, phương pháp lớp 1–8: thúc đẩy suy nghĩ hay làm theo mẫu, phản hồi sai có dạy được không, lộ đáp án sớm không." },
  { id: "game", name: "nhà thiết kế trò chơi giáo dục", focus: "chơi tab Thí nghiệm của sequence, limit: tiến độ, mức Dễ/Vừa/Khó, gợi ý, chuyển thử thách; ma sát, chỗ chán, thiếu thưởng." },
  { id: "qa", name: "kỹ sư QA lab", focus: "ineq, integral: hoàn tác ngay sau kéo, đổi cảnh, chia sẻ liên kết (cả liên kết hỏng), lưu cấu hình hỏng, ảnh chụp, đổi tốc độ, xem đáp án mẫu rồi tìm cách ăn gian tiến độ." },
  { id: "perf", name: "kỹ sư hiệu năng web", focus: "dist/assets, import tĩnh làm phình gói chính, MutationObserver trong LabTools, số lần render khi kéo thanh trượt; đo thời gian tải /t/quadratic?tab=tn." },
  { id: "security", name: "kỹ sư bảo mật", focus: "tham số ?p=, localStorage, dangerouslySetInnerHTML trong LabTools và MathText, tên cấu hình do người dùng nhập, clipboard; XSS, prototype pollution, tràn dữ liệu." },
  { id: "curriculum", name: "chuyên gia chương trình GDPT 2018", focus: "độ phủ và mức độ của bài tư duy, dạng bài, phương pháp lớp 1–12 so với chương trình 2018; lệch lớp, thuật ngữ, phần bỏ sót." },
  { id: "creative", name: "nhà giáo dục tư duy sáng tạo", focus: "toàn bộ bài trong src/content/think và cách trình bày ở /kien-thuc/7/tu-duy, /t/quadratic?tab=lam: có thật sự đòi hỏi tư duy không, tự ra đề có thật sự mở không, có lặp khuôn không." },
  { id: "pm", name: "quản lý sản phẩm giáo dục", focus: "đi một vòng như người mới: trang chủ, /thi-nghiem, /tu-duy, /kien-thuc/6/lo-trinh, /t/quadratic, /phuong-phap; điều hướng, tính năng bị chôn, trùng lặp các tầng luyện tập." },
];

/** Lời nhắc đầy đủ cho một vai; giữ nguyên giữa các vòng. */
export function buildPrompt(role: Role, baseUrl: string): string {
  return [
    `Bạn là người đánh giá độc lập cho app học toán tiếng Việt "Bàn Toán" (repo /home/user/ban-toan-app, đang chạy tại ${baseUrl}). CHỈ ĐỌC, không sửa tệp trong repo, không commit.`,
    "",
    `Vai của bạn: ${role.name}. Hãy xem: ${role.focus}`,
    "Có thể dùng Playwright (require('playwright')); mỗi lần mở vài trang rồi đóng trình duyệt.",
    "",
    "Chấm 1–10. Chấm nghiêm, đừng cho điểm cao chỉ vì lịch sự.",
    'Định dạng trả lời: dòng đầu "SCORE: n" (n nguyên 1–10), rồi tối đa 150 từ gồm 1 điểm mạnh và đúng 3 lỗi hoặc điểm yếu cụ thể (kèm tệp hoặc URL).',
  ].join("\n");
}

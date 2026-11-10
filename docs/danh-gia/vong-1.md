# Đánh giá vòng 1: 100 người đóng vai các thành phần xã hội

| Chỉ số | Giá trị |
|---|---|
| Số bài hợp lệ | 100/100 |
| **Điểm trung bình** | **5,25** |
| **Điểm trung vị** | **5,5** |
| **Điểm cao nhất** | **7,0** (vai số 15, 51) |
| **Điểm thấp nhất** | **3,0** (vai số 30, 32) |
| Độ lệch chuẩn | 0,9 |
| Số người chấm từ 9 trở lên | 0 |
| Số người chấm từ 8 trở lên | 0 |
| Số người chấm từ 7 trở lên | 2 |
| Số người chấm dưới 5 | 29 |

## Phân bố điểm

| Khoảng điểm | Số người |
|---|---|
| 3–4 | 8 |
| 4–5 | 21 |
| 5–6 | 44 |
| 6–7 | 25 |
| 7–8 | 2 |

## Điểm trung bình theo nhóm vai

| Nhóm | Trung bình |
|---|---|
| Học sinh, sinh viên, người học (1-20) | 5,51 |
| Giáo viên, nhà giáo dục, quản lý (21-40) | 4,85 |
| Phụ huynh, gia đình (41-50) | 4,9 |
| Kỹ sư, kỹ thuật (51-60) | 5,9 |
| Thiết kế, ngôn ngữ (61-70) | 5,75 |
| Kinh doanh, pháp lý, thanh toán (71-80) | 5,1 |
| Báo chí, xã hội, học thuật (81-90) | 5,35 |
| Người dùng đặc thù (91-100) | 4,75 |

## Cách làm

- 100 subagent AI, mỗi subagent đóng một vai (học sinh các lớp và hoàn cảnh, giáo viên, phụ huynh, kỹ sư, nhà thiết kế, luật sư, nhà đầu tư, nhà báo, người khuyết tật…). Đây là mô phỏng bằng AI, không phải khảo sát người thật.
- Mọi người nhận cùng một bản hướng dẫn và cùng một thang điểm: 5 = tầm thường, 7 = tốt, 8 = rất tốt, 9 = xuất sắc chỉ còn lỗi nhỏ, 10 = gần như không thể chê. Yêu cầu: chê khắt khe, mỗi lời chê phải có bằng chứng (ảnh chụp, chữ trên trang hoặc `tệp:dòng`).
- Tư liệu: 132 ảnh chụp bản build production (máy tính và iPhone 13, tiếng Việt, tiếng Anh, giao diện đêm, các trạng thái làm bài và trợ lý), 57 tệp chữ của các trang, kết quả lint/test/build, kích thước bản build, toàn bộ mã nguồn, và bản build đang chạy để gọi thử.
- Người đánh giá chạy trên một mô hình AI cỡ nhỏ để vừa hạn mức sử dụng. 41 bài đầu làm trước khi thêm chỉ dẫn "gọi công cụ song song cho ít lượt"; tư liệu và thang điểm không đổi.
- Người đánh giá chỉ được đọc. Sau mỗi đợt, kho mã được kiểm tra là không bị sửa.

## Các nhóm lời chê chính

Số trong ngoặc là số người (trên 100) nêu vấn đề đó, đếm theo từ khóa nên chỉ là ước lượng.

1. **Thanh nhạc và nút "Hỏi toán" nổi che nội dung** trên điện thoại, cả đáp án và lời giải (khoảng 60). Phần đầu trang dính cũng chiếm gần nửa màn hình 390 px; hàng tab bị cắt mà không có dấu hiệu cuộn.
2. **Không có tài khoản, không đồng bộ, không sao lưu** (khoảng 55): tiến độ chỉ nằm trong `localStorage`, không chuyển được sang máy khác, không có hồ sơ riêng cho từng con trên máy dùng chung, không có nút xóa dữ liệu trong app, mã Premium không khôi phục được.
3. **Thanh toán và lòng tin** (khoảng 50): trang Nâng cấp hiện "giá mẫu", "tài khoản mẫu"; không có tên đơn vị vận hành hay liên hệ công khai; không có hóa đơn; hoàn tiền chưa khớp giữa chính sách và mã.
4. **Trang chủ mở thẳng vào hàm số bậc hai lớp 10** (khoảng 40) dù app nói dành cho lớp 1–12: không hỏi lớp, không có lối vào cho tiểu học, THCS, người mất gốc hay phụ huynh.
5. **Tiền mã hóa (USDT/USDC) trong app cho trẻ em** (khoảng 35), trong khi chính trang Chính sách ghi đây không phải phương tiện thanh toán hợp pháp ở Việt Nam.
6. **Dữ liệu của trẻ gửi cho nhà cung cấp AI có thể dùng để huấn luyện** (khoảng 35); cảnh báo không nằm ngay trong khung chat; không có cách tắt trợ lý.
7. **Cổng tuổi dưới 16 chỉ là một ô tự tích** (khoảng 30); học sinh vẫn tự mua và tự nhận hoa hồng giới thiệu được.
8. **Nhãn "Thi thử 2025" trông đã cũ** (khoảng 30): không ghi căn cứ cấu trúc đề, không ghi rõ đây không phải đề của Bộ.
9. **Trợ lý** (khoảng 30): bản đang chạy là câu soạn sẵn nhưng không ghi là mẫu; câu mẫu về đạo hàm đưa f'(2) = 4 trước khi nêu quy tắc 2x; không có lưới an toàn cho câu có ý tự hại; bắt gõ LaTeX.
10. **Bản tiếng Anh dịch thiếu** (khoảng 27): phần Dạng bài, các trang lớp và Khoa học vẫn là tiếng Việt.
11. **Nội dung tiểu học khô** (khoảng 25): toàn chữ, ít hình, không có đọc to, chữ nhỏ.
12. **Lệch lớp và thiếu đối chiếu chương trình** (khoảng 25): cùng một chuyên đề ghi lớp khác nhau giữa trang chủ và trang lớp; không dẫn chương trình 2018 hay sách giáo khoa.
13. **Tiếp cận** (khoảng 20): mất tiêu điểm sau khi trả lời, đồ thị canvas không có mô tả bằng chữ, phím 1–4 bắt ở mọi nơi, không chỉnh được cỡ chữ.
14. **Hứa "mỗi mảng có video" nhưng không có video nào** (khoảng 10, đều chấm nặng).
15. **Lỗi nội dung toán cụ thể** do giảng viên và nhà toán học nêu: điều kiện cực trị trên đoạn, khả vi và tiếp tuyến đứng, thiếu điều kiện trong Sổ công thức, nhãn Bayes, C% thiếu ×100%.
16. **Kỹ thuật**: mã Premium lấy được chỉ bằng mã đơn, thiếu CSP và header bảo mật, bộ đếm lượt trợ lý không nguyên tử, không có `/api/health`, không có kiểm thử giao diện, thiếu tài liệu đóng góp, hướng dẫn triển khai lệch thực tế.
17. **Thiếu công cụ cho giáo viên và phụ huynh** (khoảng 20): không có bảng tiến độ lớp, báo cáo cho phụ huynh, giới hạn thời gian hay nhắc nghỉ mắt.
18. **Thiếu động lực học và ôn cách quãng** (khoảng 10): không có lịch ôn, chuỗi ngày, mức thành thạo.

Một số yêu cầu nằm ngoài khả năng sửa bằng mã: video bài giảng thật có phụ đề, tên pháp nhân và liên hệ của đơn vị vận hành, tài khoản thanh toán thật, hóa đơn VAT, người biên soạn có bằng cấp ký duyệt, số liệu người dùng thật, thử nghiệm độc lập về hiệu quả học tập.

## Điểm của từng người

| Số | Vai | Điểm | Nhận định |
|---|---|---|---|
| 1 | Học sinh lớp 10 ở Hà Nội, học lực khá, dùng iPhone, mới vào THPT | 6,8 | Nội dung Toán đúng và có phản hồi tốt cho câu sai, nhưng trên iPhone các nút nổi che nội dung, và chữ dành cho nhà phát triển lộ ra cho học sinh lớp 10. |
| 2 | Học sinh lớp 12 ở TP.HCM đang ôn thi tốt nghiệp THPT, mục tiêu 8+ điểm Toán | 5,5 | Có lời giải chi tiết và cách chấm đề khớp cấu trúc, nhưng phạm vi lớp 12 còn hở, đề ghi nhãn 2025 khi hôm nay là 2026, và đề đầy đủ bị khóa sau một lần miễn phí. |
| 3 | Học sinh lớp 11 mất gốc Toán ở Nghệ An, sợ môn Toán, dùng điện thoại Android rẻ | 5,5 | Nội dung có cấu trúc và không ép đáp án, nhưng app giả định người học đã nắm nền lớp 9–10, trợ lý trả lời lan man, ô nhập bắt buộc viết LaTeX, và màn hình điện thoại bị chrome cùng thanh nổi chiếm chỗ. |
| 4 | Học sinh lớp 12 chuyên Toán trường chuyên, luyện thi HSG quốc gia | 4,0 | Đáp án của 8 câu Đội tuyển HSG đều đúng khi tự kiểm, nhưng cả bộ chỉ là bài đáp số ngắn, lớp 12 thiếu hai chương chương trình, và không có gì ở mức HSG quốc gia. |
| 5 | Học sinh lớp 9 ở Đà Nẵng ôn thi vào lớp 10 | 5,5 | Lớp 9 có đủ bài và luyện miễn phí, nhưng app không có nội dung nào cho kỳ thi vào lớp 10, thứ tôi cần nhất, và đề thi thử hiển thị là đề THPT 2025 của năm đã qua. |
| 6 | Học sinh lớp 6 mới lên cấp hai, bố mẹ cài cho | 5,0 | Nội dung lớp 6 có lời giải từng bước tốt, nhưng app mở ra như một công cụ ôn THPT, không dành cho đứa trẻ 11 tuổi, và phần riêng tư, mua hàng cho trẻ em còn sơ sài. |
| 7 | Học sinh lớp 3 tiểu học (8 tuổi), đọc chậm, thích hình và màu | 3,5 | Trang Lớp 3 là danh sách chữ 14 bài và 104 câu trắc nghiệm chữ thuần, không có tranh, không có màu, không đọc to; trang chủ mở bằng hàm số bậc hai. Một em 8 tuổi đọc chậm sẽ bỏ cuộc sau vài phút. |
| 8 | Học sinh lớp 12 vùng cao Hà Giang, mạng 3G chập chờn, điện thoại màn hình nhỏ | 6,5 | Nội dung và chế độ ngoại tuyến được nghĩ kỹ, nhưng trên điện thoại nhỏ phần khung cố định chiếm quá nhiều màn hình, và lần mở đầu trên 3G nặng hơn mức một học sinh vùng cao chịu nổi. |
| 9 | Học sinh lớp 11 ở Cần Thơ, nghiện TikTok, dễ chán, thích game hóa | 5,5 | Nội dung và phản hồi từng câu ổn, nhưng app gần như không có yếu tố game nào, chữ dày đặc ở màn đầu, và thanh nghe nhạc đè lên đáp án trên điện thoại, nên một đứa dễ chán sẽ thoát sau vài phút. |
| 10 | Học sinh lớp 10 trường quốc tế, quen dùng tiếng Anh hơn tiếng Việt | 4,5 | Chế độ English chỉ dịch phần khung giao diện; nội dung bài học, danh mục lớp và phần Dạng bài vẫn là tiếng Việt, và người dùng gần như không tìm được công tắc ngôn ngữ. |
| 11 | Sinh viên năm nhất Bách khoa cần ôn lại giải tích THPT | 6,5 | Phần Đạo hàm giải thích tốt từng bước và có lời giải sai/đúng rõ, nhưng giao diện nổi che lời giải, trợ lý trả lời theo khuôn mẫu, và không có gì vượt THPT cho người sắp vào đại học. |
| 12 | Sinh viên sư phạm Toán năm ba, đang tập soạn giáo án | 5,5 | Trang Soạn tài liệu xuất được PDF, DOCX và có bản xem trực tiếp, nhưng hai mẫu giáo án chỉ là ghi chú ngắn, công thức trong DOCX bị làm phẳng, và chỉ có một bản soạn duy nhất để đè lên. |
| 13 | Thí sinh tự do 20 tuổi thi lại đại học, tự học ở nhà | 6,0 | Có nền sư phạm tốt (lời giải từng bước, gợi ý, bài thi thử đúng cách chấm), nhưng với người tự học một mình thì thiếu phạm vi hình không gian trong ngân hàng luyện, tiến độ chỉ nằm trên một máy, không có lộ trình, và phần thi thử thật bị khóa sau một đề. |
| 14 | Học sinh lớp 12 khiếm thị dùng trình đọc màn hình (VoiceOver/TalkBack) | 6,0 | Nền ngữ nghĩa khá (skip link, lang, KaTeX có MathML, vùng live cho kết quả đáp án), nhưng video bài giảng chưa có bài nào, không có bản chữ cho video, việc trả lời làm mất tiêu điểm bàn phím, và chuyển câu không thông báo gì. Đánh giá này dựa trên mã nguồn và chữ trên trang, chưa chạy thử bằng trình đọc màn hình thật (nghi ngờ ở các chỗ ghi chú). |
| 15 | Học sinh lớp 10 mù màu đỏ-lục | 7,0 | Phản hồi đúng/sai có chữ và có dạng viền nên dùng được, nhưng đồ thị và giao diện đêm phân biệt các đường chủ yếu bằng sắc đỏ-lục, và ký hiệu ✓/✗ quá nhỏ. |
| 16 | Học sinh lớp 11 có ADHD, khó tập trung quá 10 phút | 5,5 | Có vài công cụ đúng hướng (phím 1–4, đồng hồ Tập trung, tiếng ồn nâu), nhưng nhịp học vẫn là một trang dài, đồng hồ 25 phút không có nghỉ và kết thúc im lặng, nên người không giữ được sự chú ý 10 phút sẽ dễ bỏ ngang. |
| 17 | Học sinh lớp 8 mắc chứng khó đọc (dyslexia) | 5,5 | Chữ sans 17px, giãn dòng 1.65 là nền tốt, nhưng app không có công cụ nào cho người đọc khó: không đổi font, cỡ chữ, khoảng cách, không đọc to, và trên điện thoại công thức bị vỡ dòng còn thanh phát nhạc đè lên bài. |
| 18 | Học sinh lớp 12 khiếm thính, không nghe được video bài giảng | 6,0 | Nội dung chính là chữ và hình nên dùng được không cần nghe, nhưng trang hứa có video ở chỗ không có video nào, và chưa có cơ chế phụ đề hay bản chép lời để video thật tiếp cận được với người khiếm thính. |
| 19 | Học sinh lớp 12 bị khuyết tật vận động tay, chỉ dùng bàn phím | 5,0 | Nền tảng bàn phím cho câu hỏi trắc nghiệm, Đúng/Sai và menu khá tốt, nhưng tờ lab chính và phần chỉ dẫn trang chủ vẫn chỉ dùng được bằng chuột hoặc cảm ứng, nên em không học được phần cốt lõi của chuyên đề. |
| 20 | Học sinh lớp 7 là con em người dân tộc Khmer ở Sóc Trăng, tiếng Việt là ngôn ngữ thứ hai | 5,0 | Nội dung lớp 7 làm đúng và gợi ý theo bước là điểm tốt, nhưng app không có tiếng Khmer, lớp 7 bị chôn sau trang chủ toàn lớp 10–12, và phần trợ lý gửi câu hỏi ra ngoài cho trẻ dưới 16 tuổi chưa được giải thích đủ rõ. |
| 21 | Giáo viên Toán THPT 20 năm kinh nghiệm ở Hà Nội, khó tính về tính chính xác | 6,0 | Nội dung Toán phần lớn đúng và lời giải có lý do từng bước, nhưng có vài đẳng thức sai hiện ngay trên trang đầu, một bài phản biện dựa trên phép tính không khớp đề, và sổ công thức hứa điều kiện dùng nhưng thiếu gần hết. |
| 22 | Giáo viên Toán trẻ ở trường tư TP.HCM, thích công nghệ, muốn dùng trong lớp | 5,5 | Học sinh tự học thì đáng dùng, nhưng với giáo viên đưa vào lớp thì app chỉ là công cụ soạn cá nhân: không có lớp học, xuất công thức sai và đề mẫu lẫn đáp án. |
| 23 | Giáo viên Toán THCS ở nông thôn Thanh Hóa, ít rành công nghệ | 5,5 | Có nội dung Lớp 6–9 và mẫu giáo án dùng được, nhưng trang đầu hướng về THPT, thuật ngữ không giải thích, và không có chỗ nào để giáo viên theo dõi học sinh. |
| 24 | Giáo viên tiểu học dạy lớp 2 | 4,5 | Lớp 2 có đủ 8 bài và 24 câu luyện kiểm bằng máy, nhưng tiêu đề hứa bảng nhân và bảng chia mà nội dung chỉ có bảng nhân 2 và 5; app không có gì để một giáo viên dạy cả lớp dùng, và trợ lý nhận câu hỏi của trẻ 8 tuổi mà không có cổng tuổi. |
| 25 | Tổ trưởng chuyên môn Toán, chịu trách nhiệm chọn tài liệu cho tổ | 5,5 | Tốt để tự học và tham khảo bài giảng, nhưng chưa dùng được để tổ chọn làm tài liệu chung: không có chỗ cho cả tổ, không đối chiếu sách giáo khoa, không rõ nội dung đi đâu, và có nhãn năm/lớp lỗi thời. |
| 26 | Giáo viên luyện thi đại học nổi tiếng, có lò luyện riêng | 5,5 | Nội dung mẫu đúng và phần giải thích lỗi sai có ích, nhưng sản phẩm lỗi thời ở nhãn năm 2025, chỉ luyện trắc nghiệm miễn phí, không nêu người biên soạn chịu trách nhiệm, và chưa phục vụ được lớp học của một trung tâm. |
| 27 | Gia sư Toán sinh viên, dạy kèm 1-1 | 6,0 | Nội dung bài học tốt để dạy, nhưng công cụ chưa giúp một gia sư quản lý nhiều học sinh, soạn giáo án, hay luyện đề bám kỳ thi hiện tại. |
| 28 | Giáo viên dạy Toán bằng tiếng Anh (chương trình song ngữ/Cambridge) | 3,5 | Khung giao diện đã có bản tiếng Anh, nhưng nội dung bài học, trang lớp và phần khoa học vẫn chủ yếu là tiếng Việt, không có gì cho chương trình Cambridge, và không có tính năng nào dành cho giáo viên quản lý lớp. |
| 29 | Giảng viên đại học khoa Toán, chuyên giải tích | 6,0 | Số liệu và đáp án bài Đạo hàm đúng, nhưng phát biểu định lý còn sai hoặc thiếu chặt chẽ, không có ví dụ hàm không khả vi, và sổ công thức thiếu quy tắc đạo hàm hợp và thương. |
| 30 | Giáo viên Vật lý THPT muốn kiểm tra phần "Vật lý toán" | 3,0 | Phần Vật lý toán chỉ có ba bài tập rải rác, không có video và không có công thức vật lý; trang hứa nhiều hơn những gì app thực sự cung cấp. |
| 31 | Giáo viên Hóa THPT xem phần "Hóa tính toán" | 4,0 | Ba công thức tôi kiểm được đều đúng, nhưng mảng Hóa chỉ là vài dòng nhắc, thiếu nội dung hóa học cốt lõi, và trang hứa video mà không có video nào hiển thị. |
| 32 | Giáo viên Tin học THPT xem phần "Lập trình toán" | 3,0 | Phần Lập trình toán chỉ là vài dòng chữ và một đoạn code tĩnh: không chạy được code, không có bài tập viết code, và hai lời hứa (video, vẽ đồ thị) không có nội dung thật, nên tôi không dám giao cho học sinh làm bài tập tin học. |
| 33 | Hiệu trưởng trường THPT công lập, cân nhắc triển khai toàn trường | 4,0 | Nội dung và kỹ thuật có nền tốt, nhưng app chỉ được thiết kế cho từng học sinh mua lẻ trên từng máy; không có đường nào để nhà trường cấp, theo dõi hay đối soát cho cả lớp, nên chưa thể triển khai toàn trường. |
| 34 | Chuyên viên Sở Giáo dục phụ trách chương trình GDPT 2018 | 4,5 | Cấu trúc 1–12 theo đúng ba cấp đúng hướng, nhưng bản đồ chuyên đề mâu thuẫn với chính trang kiến thức của nó về lớp học của nhiều mảng, không ghi căn cứ đối chiếu yêu cầu cần đạt, và trang Thi thử/Nâng cấp dùng khung đề 2025 khi hôm nay là cuối 2026. |
| 35 | Người biên soạn sách giáo khoa Toán (bộ Kết nối tri thức) | 5,0 | Các ví dụ tôi kiểm tay đúng, nhưng app không đối chiếu với bộ sách KNTT ở bất kỳ đâu: không có số bài, số trang, thuật ngữ đối chiếu hay phân bố chuyên đề theo SGK, và trang Chính sách không nói gì về nguồn và quyền tác giả của đề bài. |
| 36 | Chuyên gia ra đề thi tốt nghiệp THPT, soi cấu trúc đề 2025 | 5,0 | Cấu trúc 12/4/6, 90 phút và cách tính điểm từng phần đúng như đề thật, nhưng câu hỏi là biến thể sinh tự động chứ không phải đề được biên soạn theo ma trận, và nhãn '2025' cùng vài chi tiết nhập liệu đã lỗi thời hoặc sai quy định. |
| 37 | Giáo viên giáo dục đặc biệt, dạy trẻ khuyết tật học tập | 5,5 | Có vài nền tảng tốt cho người khiếm thị hay nhạy chuyển động, nhưng thiếu gần như mọi công cụ mà giáo viên giáo dục đặc biệt cần để điều chỉnh cho từng học sinh: cỡ chữ, phông dễ đọc, đọc to, và theo dõi tiến độ của lớp. |
| 38 | Cán bộ thư viện trường, quản lý phòng máy cũ (Windows 7 / Chrome cũ) | 5,0 | Không cần đăng nhập, nội dung tiếng Việt tốt và chính sách riêng tư rõ, nhưng app được thiết kế cho một học sinh một máy: trên phòng máy dùng chung, tiến độ, mã Premium và hạn mức hỏi trợ lý bị trộn lẫn, không có cách xóa trong app, và trên Chrome 109 nhiều nền bị mất. |
| 39 | Nhà nghiên cứu giáo dục học (PhD), chuyên về khoa học học tập và đánh giá | 4,5 | Nội dung Toán đúng ở những mẫu tôi kiểm tra, nhưng phần 'đánh giá năng lực' không có bằng chứng đo lường nào và đáp án nằm sẵn trong mã nguồn gửi về trình duyệt, nên không dùng được làm công cụ nghiên cứu. |
| 40 | Nhà tâm lý học đường | 5,5 | Minh bạch dữ liệu và cách dạy tốt, nhưng thiếu lớp bảo vệ tâm lý và kiểm soát tuổi cho học sinh, và cơ chế giới thiệu bạn bè đang đẩy trẻ vào việc rủ rê. |
| 41 | Mẹ của học sinh lớp 10, nhân viên văn phòng, lo con nghiện điện thoại | 4,5 | App học toán khá nghiêm túc và không đòi tài khoản, nhưng không có công cụ nào giúp mẹ kiểm soát thời gian con dùng máy; trong khi đó trang bán Premium, chương trình giới thiệu có hoa hồng và thanh toán bằng tiền mã hóa đều mở cho học sinh dưới 16 tuổi chỉ bằng một ô tự khai. |
| 42 | Bố của học sinh lớp 12, kỹ sư, sẵn sàng trả tiền nếu đáng | 5,5 | Nội dung và cách trình bày đề thi đáng tin, nhưng với người chi tiền cho con vị thành niên thì phần thanh toán, dữ liệu gửi đi và cách liên hệ còn thiếu minh bạch, nên chưa đủ để mình mua ngay. |
| 43 | Phụ huynh công nhân khu công nghiệp Bình Dương, thu nhập thấp, 49.000đ là đáng kể | 5,0 | Phần miễn phí rõ ràng và không bắt tài khoản, nhưng phần trả tiền có rủi ro mất tiền và mất quyền truy cập mà một phụ huynh thu nhập thấp khó lường trước: mã Premium chỉ nằm trong trình duyệt, có cả thanh toán bằng tiền mã hóa, và đề thi ghi 'chuẩn THPT 2025' trong khi hôm nay là 2026. |
| 44 | Bà nội 65 tuổi trông cháu lớp 4, mắt kém, ít dùng smartphone | 4,5 | Bố cục đọc được, nhưng chữ nhỏ, thanh điều khiển che nội dung trên điện thoại, không có cỡ chữ, và phần thanh toán có chi tiết dễ làm người lớn tuổi bị lừa; chưa dùng được thoải mái cho người mắt kém. |
| 45 | Phụ huynh nông dân ở Đắk Lắk, không rành công nghệ | 4,5 | Con em học được Toán lớp 3 đến 12 có mục lục rõ, nhưng tôi không dám bỏ tiền mua vì không có số điện thoại để hỏi, mã Premium chỉ nằm trong trình duyệt, lại có cả tiền mã hóa và gửi câu hỏi của con cho AI bên ngoài. |
| 46 | Phụ huynh là bác sĩ, quan tâm sức khỏe mắt và thời gian màn hình của con | 4,0 | App không có tính năng nào cho phụ huynh quản lý thời gian màn hình hay nghỉ mắt; chỉ có một bộ hẹn giờ 25 phút không nhắc nghỉ, và phần dữ liệu học nằm trên máy con mà cha mẹ không xem được. |
| 47 | Phụ huynh Việt kiều ở Mỹ muốn con học Toán kiểu Việt Nam | 5,5 | Nội dung đúng chương trình GDPT 2018 và giọng trợ lý ổn, nhưng app được làm cho người ở Việt Nam: thanh toán bằng MoMo/VietQR, chính sách bằng tiếng Việt, dữ liệu trẻ em gửi cho các nhà cung cấp AI không nói rõ cho phụ huynh Mỹ, và bài Lớp 3 bằng tiếng Việt trong giao diện tiếng Anh. |
| 48 | Mẹ đơn thân có ba con học ba cấp khác nhau, dùng chung một máy tính bảng | 4,5 | Nội dung đủ sâu cho lớp 10 và có luyện lớp 3, nhưng app không biết có ba đứa trẻ trên một máy: tiến độ, lịch sử chat và quyền Premium gộp chung, câu hỏi của con đi tới nhà cung cấp AI bên ngoài mà không có cơ chế phụ huynh. |
| 49 | Phụ huynh rất lo về quyền riêng tư dữ liệu trẻ em | 5,5 | Chính sách viết khá thẳng và không có quảng cáo hay analytics, nhưng trang chính sách bỏ sót một bên nhận dữ liệu (Supabase), trẻ em chat với trợ lý AI bên ngoài mà không có cổng đồng ý, và phụ huynh không có cách xóa hay liên hệ nếu không có biên lai. |
| 50 | Phụ huynh hay so sánh với VioEdu, Hocmai, Khan Academy, OLM | 5,5 | Giao diện sạch và minh bạch về dữ liệu, nhưng với cha mẹ thì app không cho theo dõi con, trang chủ chỉ có chuyên đề lớp 10–12, và có thanh toán tiền mã hóa cho học sinh chưa đủ 16 tuổi. |
| 51 | Kỹ sư frontend senior (React/TypeScript), soi kiến trúc và chất lượng code | 7,0 | Nền mã sạch (không có any, không có @ts-ignore, typecheck và lint đều qua, storage có try/catch, effect fetch có cờ hủy), nhưng thiếu hẳn kiểm thử giao diện, router và store tự viết đang phình ra, và có vài chỗ polling/lint yếu để lọt lỗi. |
| 52 | Kỹ sư backend senior, soi API thanh toán và cơ sở dữ liệu | 6,5 | Lõi thanh toán làm đúng phần khó (chữ ký, số tiền từ server, khóa giao dịch, idempotent), nhưng khóa Premium lưu thô trong DB trong khi tài liệu nói là băm, orderId là bearer token trả về khóa và email, và không có đường xóa dữ liệu cá nhân như chính sách hứa. |
| 53 | Chuyên gia bảo mật ứng dụng (AppSec/pentester) | 6,0 | Lõi thanh toán làm đúng (ký HMAC, giá do server tính, đối chiếu số tiền), nhưng khóa Premium lộ qua orderId trên URL, quota chat tin vào giá trị client gửi lên, và thiếu lớp phòng thủ trình duyệt (CSP, header bảo mật). |
| 54 | Kỹ sư hiệu năng web (Core Web Vitals, bundle size) | 6,0 | Cách chia gói và PWA được nghĩ kỹ, nhưng không có số liệu Core Web Vitals nào, và cấu hình cache/nén của máy chủ đang làm mất phần lợi về kích thước. |
| 55 | Chuyên gia accessibility (WCAG 2.2 AA) | 6,0 | Nền tảng a11y khá (skip link, lang vi, focus ring, giảm chuyển động, slider có nhãn, contrast token đạt), nhưng thanh nhạc cố định che nội dung và tiêu điểm, phím 1-4 là phím tắt ký tự đơn không tắt được, viền điều khiển quá nhạt, và một số mẫu ARIA dùng sai. |
| 56 | Kỹ sư QA/tester thủ công, săn lỗi | 6,0 | Nền kỹ thuật ổn (không lỗi console, lint/typecheck/test/build đều PASS), nhưng bản tiếng Anh còn lộ tiếng Việt ở nội dung bài, lớp trình phát nổi che nội dung trên cả hai cỡ màn hình, và nhãn đề thi ghi 2025 trong khi hôm nay là 2026. |
| 57 | Kỹ sư DevOps/SRE, soi triển khai, CI, giám sát | 5,5 | CI test/lint/build và phần thanh toán được gia cố khá tốt, nhưng app thiếu gần như hoàn toàn quan sát được (không health check, không theo dõi lỗi, không cảnh báo), còn bộ đếm lượt trợ lý có lỗi tính sai và có thể rơi về bộ nhớ theo từng instance trên serverless. |
| 58 | Kỹ sư mobile, đánh giá trải nghiệm PWA/offline | 6,0 | Nền PWA có đủ thành phần (manifest standalone, service worker autoUpdate, precache có font KaTeX, license cache offline), nhưng biểu tượng cài đặt sai nhận diện, thanh điều khiển cố định đè nội dung trên điện thoại, và người dùng không được báo trạng thái ngoại tuyến. |
| 59 | Kỹ sư AI/LLM, soi phần trợ lý toán và an toàn prompt | 4,5 | Khung trợ lý có ý đồ sư phạm đúng, nhưng bản đang chạy trả lời bằng văn bản soạn sẵn mà không báo cho người dùng, không có phản ứng an toàn khi học sinh nói về tự hại, và vẫn đưa đáp án cuối cho chính câu được gợi ý. |
| 60 | Người duy trì mã nguồn mở, soi README, tài liệu, độ dễ đóng góp | 5,5 | README có phần thêm một tờ khá cụ thể và CI rõ, nhưng repo chưa có giấy phép, hướng dẫn đóng góp, chính sách bảo mật; README chỉ tiếng Việt, phần triển khai mâu thuẫn với cấu hình Vercel và API, và 40 tệp test trong scripts/ không được giới thiệu. |
| 61 | Nhà thiết kế UX senior | 6,5 | Hệ thống thị giác nhất quán và có chủ đích, nhưng trên điện thoại đang tự che nội dung bằng chính khung điều hướng, trình phát âm thanh và hộp hỏi đáp; cấu trúc điều hướng lặp lại và nhiều nhãn ẩn dụ khiến người học mới phải đoán. |
| 62 | Nhà thiết kế UI/visual, khắt khe về typography và hệ thống thiết kế | 6,5 | Bảng màu giấy ấm, accent teal và Be Vietnam Pro tạo được một nhận diện rõ, nhưng thang cỡ chữ và nhịp dọc không có quy tắc, công thức toán bị vỡ dòng trên điện thoại, và vài lớp phủ đè lên chữ. |
| 63 | UX writer / biên tập nội dung tiếng Việt | 6,0 | Câu chữ trang chủ và bài học khá rõ, nhưng trang thanh toán còn chữ giữ chỗ, gợi ý phím hiện trên điện thoại, chính sách dùng thuật ngữ kỹ thuật, và tên gọi không thống nhất giữa các màn hình. |
| 64 | Nhà thiết kế tương tác chuyên về chuyển động (motion) | 5,5 | Lớp chuyển động được kỹ thuật tốt (tôn trọng giảm chuyển động, dừng khi ẩn, dùng chung một vòng lặp), nhưng gần như không có chuyển động tương tác: mọi trạng thái mở, đóng, chọn đáp án đều bật tắt tức thì, và vài chỗ nền sinh động không cập nhật đúng theo cài đặt của người dùng. |
| 65 | Nhà nghiên cứu người dùng (UX researcher) chuyên học sinh tuổi teen | 6,5 | Học và luyện tập rõ ràng, có giải thích sai ở từng đáp án, nhưng luồng mua Premium và chính sách với học sinh dưới 16 tuổi chưa bảo vệ được các em, và giao diện di động còn che nội dung bằng lớp nổi. |
| 66 | Nhà thiết kế game giáo dục (learning game designer) | 5,5 | Vòng học có phản hồi đúng/sai và sổ lỗi tốt, nhưng gần như không có vòng thưởng và tiến bộ nhìn thấy được, nên app đọc như một bộ đề chứ không như một trải nghiệm học giữ chân người học. |
| 67 | Chuyên gia thiết kế thông tin / trực quan hóa toán học | 5,5 | Hệ thống màu và bố cục ổn, nhưng đồ thị, thứ quan trọng nhất của một app Toán, còn nhiều lỗi thể hiện: đường cong bị cắt cụt, nhãn đè lên điểm dữ liệu, đường thẳng chỉ phân biệt bằng màu và trục đối xứng không có nhãn. |
| 68 | Nhà thiết kế sản phẩm cho thị trường nông thôn, thiết bị cấu hình thấp | 5,5 | Bàn Toán có nền tảng đúng cho người dùng nông thôn (dùng được khi mất mạng sau lần mở đầu, thanh toán MoMo và VietQR, tiến độ lưu trên máy), nhưng giao diện di động còn che nội dung, không có công tắc tiết kiệm pin và dữ liệu, và luồng nâng cấp đòi email và thời hạn 15 phút không phù hợp với người ít dùng máy tính. |
| 69 | Chuyên gia bản địa hóa / dịch giả Anh-Việt | 3,5 | Khung giao diện tiếng Anh gọn và nhất quán, nhưng chế độ EN chưa thật sự là bản tiếng Anh: phần lớn nội dung bài học, khối lớp 3, và năm mục khoa học trên trang chủ vẫn là tiếng Việt, còn định dạng giá và một số thuật ngữ mâu thuẫn nhau. |
| 70 | Nhà ngôn ngữ học, soi chính tả và thuật ngữ toán tiếng Việt | 6,5 | Tiếng Việt có dấu và chính tả gần như sạch, các ví dụ số đều đúng, nhưng sổ công thức gắn nhãn sai công thức Bayes, một nhãn bài còn lộ ký hiệu LaTeX thô, và thuật ngữ không thống nhất giữa các trang. |
| 71 | Nhà đầu tư mạo hiểm mảng edtech Đông Nam Á | 5,5 | Nội dung và giao diện đã gọn, nhưng nhìn như một bản thử nghiệm không có dữ liệu, không có tài khoản và không có đường tăng trưởng rõ; phần thanh toán bằng tiền mã hóa vào ví cá nhân là cờ đỏ về tuân thủ. |
| 72 | Giám đốc sản phẩm (CPO) của một công ty edtech đối thủ | 6,0 | Sản phẩm học tốt và trung thực về nội dung, nhưng lớp kinh doanh và phân phối mỏng: không tài khoản, Premium mua một lần không gia hạn, không có kênh trường học hay phụ huynh. |
| 73 | Chuyên gia marketing tăng trưởng (growth), soi onboarding và chuyển đổi | 5,5 | Nội dung và phản hồi bài làm tốt, nhưng trang thanh toán còn nhãn mẫu, gói năm không được đẩy lên, và trang chủ thiếu một hành động đầu tiên rõ ràng cho người mới. |
| 74 | Chuyên gia định giá và mô hình doanh thu | 5,5 | Trang Nâng cấp rõ ràng về gói và hoàn tiền, nhưng mô hình doanh thu có lỗ hổng lớn: key Premium chia sẻ không giới hạn thiết bị, nhãn 'giá mẫu' trên thẻ giá, không có kênh liên hệ công khai, không có khôi phục key và không đo được chuyển đổi. |
| 75 | Luật sư về bảo vệ dữ liệu cá nhân (Nghị định 13/2023) và thương mại điện tử | 4,5 | Trang Chính sách nói rõ dữ liệu nào ở lại máy, nhưng thiếu gần hết nội dung pháp lý bắt buộc: không nêu bên kiểm soát dữ liệu, chuyển dữ liệu ra nước ngoài cho các nhà cung cấp AI không được công bố như một việc chuyển dữ liệu, không có quyền của chủ thể, và sự đồng ý được gộp vào một ô tích. |
| 76 | Chuyên viên bảo vệ quyền lợi người tiêu dùng | 5,5 | Trang Premium có công bố giá, không tự gia hạn và có mục hoàn tiền rõ ràng, nhưng cam kết hoàn tiền, xác nhận tuổi và khôi phục mã đều chỉ tồn tại trên chữ, còn phần thực thi trong mã nguồn thiếu hoặc chỉ là nút thủ công của quản trị viên. |
| 77 | Kế toán/kiểm toán: soi minh bạch thanh toán, hóa đơn, hoàn tiền | 4,5 | Luồng tạo đơn và xác thực IPN có kiểm tra chữ ký và số tiền, nhưng trang thanh toán còn chữ "giá mẫu" và "tài khoản mẫu", không có hóa đơn hay thuế, hoàn tiền và hoa hồng ghi sổ chưa đủ để đối soát. |
| 78 | Chuyên gia thanh toán fintech (MoMo/VietQR), soi luồng thanh toán | 5,5 | Phần mã hóa chữ ký và xác minh giao dịch làm khá kỹ, nhưng luồng hoàn tiền không thu hồi quyền Premium, tiền crypto trả muộn bị kẹt không có lối xử lý, và trang mua hàng vẫn đầy trạng thái MẪU cùng phương thức crypto dành cho học sinh. |
| 79 | Người hoài nghi tiền mã hóa, soi phương thức USDT/USDC trong app cho trẻ em | 4,5 | Phương thức USDT/USDC được đặt ngang hàng MoMo cho học sinh dưới 16 tuổi, trong bản build này ví nhận là địa chỉ MẪU, điều khoản hoàn tiền không có cơ chế thực thi, và cảnh báo pháp lý chỉ nằm ở trang Chính sách. |
| 80 | Chủ trung tâm luyện thi nhỏ muốn mua Premium cho 200 học viên | 4,0 | Trang mua chỉ phục vụ một cá nhân mua một mã; không có đường mua sỉ, quản lý ghế, theo dõi tiến độ lớp hay hóa đơn doanh nghiệp, nên không dùng được cho trung tâm mà không tự chế quy trình. |
| 81 | Nhà báo mảng giáo dục của một tờ báo lớn | 5,5 | Nội dung Toán kiểm được là đúng, nhưng trang thu tiền chưa cho biết ai đứng sau app, dùng chữ 'mẫu' ngay trên nút thanh toán, và trẻ em được đưa vào chatbot có dữ liệu chạy sang nhiều nhà cung cấp AI mà không có cổng tuổi riêng. |
| 82 | Blogger công nghệ/YouTuber review app, thích chê thẳng | 6,0 | Giao diện và cách làm bài có nét, nhưng thanh nhạc nổi và nút Hỏi toán đè lên nội dung, form thanh toán còn mặc định của trình duyệt, và trang Premium quảng bá thanh toán bằng tiền mã hóa trong khi chính sách của app nói loại tiền này không hợp pháp ở Việt Nam. |
| 83 | Nhà hoạt động vì quyền trẻ em trên môi trường mạng | 5,0 | Trang chính sách nói thẳng chuyện dữ liệu hơn mức thường thấy, nhưng app vẫn gửi tiến độ luyện tập của học sinh sang một dịch vụ bên thứ ba mà chính sách không nêu tên, và cơ chế bảo vệ trẻ dưới 16 tuổi chỉ là một ô tự khai. |
| 84 | Đại diện tổ chức phi chính phủ về giáo dục vùng khó khăn | 5,0 | Nội dung miễn phí và tiếng Việt dùng được, nhưng mô hình thu phí, hoa hồng giới thiệu và cách xử lý dữ liệu học sinh dưới 16 tuổi không phù hợp với gia đình và học sinh vùng khó khăn. |
| 85 | Nhà đạo đức học AI, lo ngại AI làm hộ bài cho học sinh | 4,0 | Thiết kế có ý thức chống làm hộ, nhưng bản đang chạy đưa đáp số cuối cho đúng loại yêu cầu mà app tự cấm, và đáp án trắc nghiệm lộ ngay sau một cú bấm. |
| 86 | Nhà toán học chuyên nghiệp (Viện Toán), soi độ chặt chẽ toán học | 6,5 | Bài đạo hàm và bài lượng giác hóa có cấu trúc chặt chẽ, nhưng Sổ công thức bỏ hầu hết điều kiện, một chứng minh đơn điệu bị hổng, và trợ lý trả lời lệch câu hỏi. |
| 87 | Nhà thống kê: soi phần xác suất thống kê và cách báo cáo điểm | 6,5 | Nội dung xác suất và số liệu trong bài đúng khi kiểm lại, nhưng cách báo cáo điểm dùng nhiều thang khác nhau, xếp lớp các chương Xác suất và Thống kê không thống nhất, và phần Đánh giá năng lực đặt tên như phép đo mà không có cơ sở đo. |
| 88 | Nhà khoa học nhận thức, chuyên về tải nhận thức và ghi nhớ (spaced repetition) | 5,0 | Thiết kế luyện tập có vài ý đúng (phản hồi tức thì, gợi ý theo bậc, đề mới đổi số), nhưng ứng dụng không có cơ chế ôn cách quãng nào, câu sai bị xóa sau một lần đoán trúng, và bài giảng cùng lớp nổi làm tăng tải nhận thức. |
| 89 | Chuyên gia đo lường đánh giá giáo dục (psychometrics) | 4,5 | Bài giải toán và công thức đúng, nhưng phần đo lường năng lực gọi tên 'năng lực' mà không có độ tin cậy, sai số, chuẩn hay tham số độ khó; đề thi và bộ tự chấm chưa đủ điều kiện để so điểm giữa các lần làm. |
| 90 | Người làm chính sách chuyển đổi số giáo dục ở Bộ | 5,5 | Thiết kế lưu dữ liệu trên máy là điểm cộng, nhưng trang chính sách vẫn thiếu các yếu tố một Bộ yêu cầu (bên kiểm soát dữ liệu, cam kết với nhà cung cấp AI, bảo vệ trẻ vị thành niên), và mô hình hoa hồng, thanh toán tiền mã hóa cùng cách nói về 'đề chuẩn Bộ' đều là rủi ro chính sách. |
| 91 | Người đi làm 30 tuổi muốn học lại Toán để thi cao học | 3,5 | Giao diện và cách dạy từng bước tốt, nhưng toàn bộ nội dung dừng ở THPT, nên với người cần ôn Toán cao học thì gần như không có gì để học. |
| 92 | Người lớn 45 tuổi học lại Toán để kèm con | 5,5 | Có nội dung và lời giải từng bước đáng tin, nhưng app mở ra như một kho luyện thi THPT, không có lối vào cho người lớn đang quên toán và cần kèm con đúng lớp. |
| 93 | Tài xế công nghệ tự học bổ túc THPT buổi tối trên điện thoại | 6,0 | Thiết kế bài giải và luyện tập tốt, nhưng trên điện thoại buổi tối vẫn bị vướng ở trợ lý trả lời lan man, tiến độ chỉ nằm trên một máy, thanh công cụ che nội dung và ô nhập toán bắt buộc viết LaTeX. |
| 94 | Người nước ngoài học tiếng Việt, tò mò về Toán Việt Nam (dùng bản EN) | 4,5 | Bản EN chỉ dịch khung giao diện; phần bài học và nhiều nhãn quan trọng vẫn là tiếng Việt, còn thanh toán chỉ dành cho người có MoMo hoặc chuyển khoản ngân hàng Việt Nam. |
| 95 | Du học sinh chuẩn bị SAT/A-level so sánh với chương trình Việt Nam | 3,5 | Nội dung Toán GDPT 2018 trình bày rõ và có tương tác, nhưng app không có chỗ nào đối chiếu với SAT hay A-level, đề thi thử chỉ theo cấu trúc THPT, và thanh toán chỉ dành cho người có ngân hàng hoặc ví Việt Nam. |
| 96 | Người dùng khó tính về quyền riêng tư, chặn tracker, tắt JavaScript bên thứ ba | 5,5 | Phần giao diện gần như sạch (không script bên thứ ba, không cookie, font cục bộ), nhưng đồng bộ tiến độ luyện sang Supabase chạy ngầm, không tắt được, và chính sách không nêu đúng bên nhận dữ liệu nên người này sẽ không tin trang. |
| 97 | Người dùng máy tính bảng cũ (iPad 2017, iPadOS tối đa 15.x, Safari cũ) | 5,5 | Giao diện phone ở 390px khá gọn, nhưng với máy của tôi thì nền thanh đầu dùng color-mix() không có phương án dự phòng nên trên Safari 15 sẽ trong suốt, thanh học nổi che nội dung, và không có ảnh nào ở bề rộng 768 hay 1024 của iPad. |
| 98 | Người dùng chỉ thích chế độ tối, dùng ban đêm, nhạy cảm ánh sáng | 4,5 | Có sẵn bảng Đêm ấm dịu, nhưng mặc định là Ngày, không có chế độ luôn tối, và chế độ đêm vẫn bật hiệu ứng chuyển động (mưa, sao băng, đèn thở) mà không có nút tắt trong ứng dụng. |
| 99 | Học sinh lười, chỉ muốn đáp án nhanh, sẽ tìm cách gian lận hệ thống | 3,5 | App dạy Toán tốt trên giấy nhưng gian lận rất dễ: đề thi miễn phí và lượt hỏi trợ lý đều reset khi xóa dữ liệu trình duyệt, đáp án thi nằm trong bundle phía client, và câu trắc nghiệm lộ đáp án sau một lần bấm. |
| 100 | Người hoài nghi edtech nói chung: "lại một app học toán nữa", cực kỳ khó thuyết phục | 5,5 | Giao diện gọn và miễn phí phần lớn nội dung, nhưng không có bằng chứng nào rằng học sinh học tốt hơn, nội dung không có người viết có tên, và phần thanh toán/dữ liệu đưa ra nhiều dấu hiệu khiến phụ huynh phải dè chừng. |

Toàn văn 100 bài (điểm mạnh, từng lời chê kèm bằng chứng và đề xuất sửa, điều kiện để đạt 9) nằm ở `vong-1.json` cùng thư mục.

import { useEffect } from "react";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";
import { REFUND_DAYS, SUPPORT_EMAIL } from "../premium/terms.ts";

/** AI providers the tutor may forward a question to (server/chat/free.ts). */
const AI_PROVIDERS = "Groq, Google Gemini, OpenRouter, Mistral AI, NVIDIA, Z.ai";

export function PolicyPage() {
  const lang = useLang();
  useEffect(() => {
    document.title = t(lang, "Chính sách · Bàn Toán", "Policy · Bàn Toán");
  }, [lang]);
  const contact = SUPPORT_EMAIL
    ? <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
    : <>{t(lang, "địa chỉ liên hệ ghi trong biên lai thanh toán", "the contact address on your payment receipt")}</>;

  return (
    <PageFrame
      kicker={t(lang, "Quyền riêng tư · Điều khoản · Hoàn tiền", "Privacy · Terms · Refunds")}
      title={t(lang, "Chính sách", "Policy")}
      lead={t(
        lang,
        "Bàn Toán dành cho học sinh lớp 1–12. Trang này nói rõ dữ liệu nào ở lại trên máy, dữ liệu nào rời máy, và cách mua, hoàn tiền Premium.",
        "Bàn Toán is for students in grades 1–12. This page says which data stays on your device, which leaves it, and how buying and refunding Premium works.",
      )}
    >
      <section className="policy" aria-labelledby="p-data">
        <h2 id="p-data">{t(lang, "1. Dữ liệu ở lại trên máy", "1. Data that stays on your device")}</h2>
        <p>{t(lang,
          "Tiến độ, câu đã làm, ghi chú, lịch sử trò chuyện với trợ lý và mã Premium được lưu trong bộ nhớ trình duyệt (localStorage) của máy này. Bàn Toán không có tài khoản và không dùng công cụ phân tích hay quảng cáo. Trang Dữ liệu của tôi (/du-lieu) có nút tải tệp sao lưu để chuyển máy, tách hồ sơ cho từng người học chung một máy, xóa lịch sử trò chuyện và xóa toàn bộ dữ liệu trên máy. Xóa ở đó, hoặc xóa dữ liệu trang web trong trình duyệt, là xóa những gì nằm trên máy này; dữ liệu đã rời máy theo mục 2 thì xử lý theo mục đó.",
          "Progress, answers, notes, tutor chat history and the Premium key are kept in this browser's storage (localStorage). Bàn Toán has no accounts and uses no analytics or advertising tools. The My data page (/du-lieu) lets you download a backup file to move devices, keep separate profiles for people sharing one device, delete chat history and delete everything on the device. Deleting there, or clearing this site's data in the browser, removes what is on this device; data that already left the device under section 2 is handled as that section says.")}</p>
        <p>{t(lang,
          "Trên máy dùng chung, hãy xóa dữ liệu trang khi dùng xong nếu không muốn người khác thấy ghi chú hay mã Premium.",
          "On a shared device, clear the site data when you finish if you do not want others to see your notes or Premium key.")}</p>
      </section>

      <section className="policy" aria-labelledby="p-out">
        <h2 id="p-out">{t(lang, "2. Dữ liệu rời khỏi máy", "2. Data that leaves your device")}</h2>
        <ul>
          <li>{t(lang,
            `Trợ lý toán: câu hỏi và vài lượt trò chuyện gần nhất được gửi tới máy chủ Bàn Toán rồi chuyển cho một nhà cung cấp AI (${AI_PROVIDERS}). Gói miễn phí của các nhà cung cấp này có thể dùng nội dung để cải thiện mô hình. Đừng gửi họ tên, địa chỉ, số điện thoại hay ảnh có thông tin cá nhân. Khung trợ lý hiện thông báo này trước câu hỏi đầu tiên và chỉ gửi đi sau khi bạn bấm đồng ý; lịch sử trò chuyện xóa được bằng nút Xóa lịch sử. Tin nhắn có dấu hiệu nguy hiểm cho trẻ (tự hại, bị xâm hại, bị bắt nạt) được máy chủ Bàn Toán trả lời ngay bằng một lời nhắn cố định có Tổng đài 111, và không chuyển cho nhà cung cấp AI.`,
            `Maths tutor: your question and the last few turns go to the Bàn Toán server and then to one AI provider (${AI_PROVIDERS}). These providers' free tiers may use content to improve their models. Do not send names, addresses, phone numbers or photos with personal details. The tutor panel shows this notice before your first question and sends nothing until you agree; chat history can be removed with the Clear history button. A message that signals danger to a child (self-harm, abuse, bullying) is answered at once by the Bàn Toán server with a fixed message that names the 111 child helpline, and is not passed to an AI provider.`)}</li>
          <li>{t(lang,
            "Giới hạn lượt hỏi: máy chủ đếm lượt theo một mã ngẫu nhiên của trình duyệt (hoặc mã Premium đã băm) và địa chỉ mạng, giữ tối đa hai ngày rồi xóa.",
            "Question limits: the server counts questions by a random browser id (or a hashed Premium key) and network address, kept for at most two days and then deleted.")}</li>
          <li>{t(lang,
            "Luyện chung (/luyen): mặc định không gửi gì. Nếu bạn bật Sao lưu ẩn danh ở trang Dữ liệu của tôi, các đáp án bạn chọn được ghi lên dịch vụ cơ sở dữ liệu Supabase (bên xử lý dữ liệu thay cho Bàn Toán) kèm một mã thiết bị ngẫu nhiên, không kèm tên hay email. Tắt đi thì máy thôi gửi; muốn xóa bản đã gửi, hãy liên hệ kèm mã thiết bị.",
            "Shared drill (/luyen): nothing is sent by default. If you turn on Anonymous backup on the My data page, the answers you pick are written to the Supabase database service (a processor acting for Bàn Toán) with a random device id, with no name or email. Turn it off and the device stops sending; to delete what was already sent, contact us with the device id.")}</li>
          <li>{t(lang,
            "Mua Premium: email, gói, số tiền, mã đơn và mã giao dịch được lưu để cấp và tra cứu quyền. Thanh toán do MoMo, ngân hàng của bạn hoặc mạng blockchain xử lý theo điều khoản của họ.",
            "Buying Premium: email, plan, amount, order id and transaction id are stored to issue and look up the licence. Payments are processed by MoMo, your bank or the blockchain network under their own terms.")}</li>
          <li>{t(lang,
            "Nhạc học: chỉ phát tệp được lưu trên chính máy chủ Bàn Toán, không tải dịch vụ video bên ngoài.",
            "Study music: only files hosted on the Bàn Toán server are played; no outside video service is loaded.")}</li>
        </ul>
      </section>

      <section className="policy" aria-labelledby="p-kids">
        <h2 id="p-kids">{t(lang, "3. Học sinh dưới 16 tuổi", "3. Students under 16")}</h2>
        <p>{t(lang,
          "Học sinh dưới 16 tuổi không tự mua Premium được: trang Nâng cấp hỏi ai đang mua và máy chủ từ chối đơn của người dưới 16 tuổi, nên cha mẹ hoặc người giám hộ mua giúp. Từ 16 đến dưới 18 tuổi cần cha mẹ hoặc người giám hộ đồng ý. Chương trình giới thiệu chỉ dành cho người từ 18 tuổi. Trước khi dùng trợ lý, học sinh dưới 16 tuổi nên hỏi cha mẹ. Cha mẹ có thể yêu cầu xem hoặc xóa dữ liệu đơn hàng qua địa chỉ liên hệ bên dưới.",
          "Students under 16 cannot buy Premium themselves: the Upgrade page asks who is buying and the server refuses orders from buyers under 16, so a parent or guardian buys for them. Buyers aged 16 or 17 need a parent or guardian's consent. The referral programme is for adults aged 18 or older only. Students under 16 should ask a parent before using the tutor. Parents can ask to see or delete order data through the contact below.")}</p>
      </section>

      <section className="policy" aria-labelledby="p-buy">
        <h2 id="p-buy">{t(lang, "4. Premium và hoàn tiền", "4. Premium and refunds")}</h2>
        <ul>
          <li>{t(lang,
            "Premium mua một lần theo kỳ 30 hoặc 365 ngày, không tự gia hạn. Quyền gắn với mã Premium, nhập được trên máy khác ở trang Nâng cấp. Mã hiện ngay sau khi thanh toán; về sau khôi phục bằng mã đơn cùng email đã mua, cũng ở trang Nâng cấp. Khi Bàn Toán chưa mở bán, trang Nâng cấp ghi rõ điều đó và không khóa nội dung nào.",
            "Premium is bought once for 30 or 365 days and never renews automatically. It is tied to the Premium key, which can be entered on another device on the Upgrade page. The key shows right after payment; later it is recovered with the order id and the purchase email, also on the Upgrade page. While Bàn Toán is not on sale, the Upgrade page says so and no content is locked.")}</li>
          <li>{t(lang,
            `Trong ${REFUND_DAYS} ngày kể từ khi thanh toán, bạn có thể xin hoàn tiền vì bất kỳ lý do gì. Hoàn qua đúng phương thức đã trả, trong khoảng 7 ngày làm việc; mã Premium sẽ bị vô hiệu.`,
            `Within ${REFUND_DAYS} days of payment you can ask for a refund for any reason. It is paid back by the same method within about 7 working days, and the Premium key is disabled.`)}</li>
          <li>{t(lang,
            "Tiền mã hóa mặc định không được nhận. Nếu đơn vị vận hành bật phương thức này, nó chỉ dành cho người mua từ 18 tuổi. Khi đó tiền mã hóa (USDT/USDC) được hoàn bằng cùng loại token về ví đã gửi, trừ phí mạng. Gửi sai mạng hoặc sai số tiền có thể không lấy lại được; khi đó Bàn Toán không chịu trách nhiệm. Ở Việt Nam, tiền mã hóa không phải phương tiện thanh toán hợp pháp; hãy cân nhắc trước khi chọn.",
            "Crypto is not accepted by default. If the operator turns this method on, it is for buyers aged 18 or older only. In that case crypto (USDT/USDC) is refunded in the same token to the sending wallet, minus network fees. Sending on the wrong network or the wrong amount may be unrecoverable, and Bàn Toán cannot take responsibility for that. In Vietnam crypto is not a lawful means of payment; consider this before choosing it.")}</li>
          <li>{t(lang,
            "Chuyển khoản đến sau khi đơn hết hạn vẫn được cấp quyền khi hệ thống nhận được tiền. Nếu sau 24 giờ chưa thấy, hãy liên hệ kèm mã đơn.",
            "A transfer that arrives after the order expires is still honoured once the money is received. If nothing arrives within 24 hours, contact us with the order id.")}</li>
        </ul>
      </section>

      <section className="policy" aria-labelledby="p-use">
        <h2 id="p-use">{t(lang, "5. Điều khoản dùng", "5. Terms of use")}</h2>
        <ul>
          <li>{t(lang,
            "Nội dung và lời giải được kiểm bằng máy nhưng vẫn có thể sai. Nếu thấy sai, hãy báo để sửa. Bàn Toán là công cụ học, không thay thế thầy cô hay đề chính thức. Đề thi thử là đề luyện do Bàn Toán soạn theo cấu trúc đề thi tốt nghiệp THPT hiện hành, không phải đề của Bộ Giáo dục và Đào tạo.",
            "Content and solutions are machine-checked but can still contain mistakes. Please report any you find. Bàn Toán is a study tool, not a substitute for teachers or official exams. Mock exams are practice papers written by Bàn Toán in the current THPT graduation format, not papers from the Ministry of Education and Training.")}</li>
          <li>{t(lang,
            "Trợ lý AI có thể nhầm. Hãy tự kiểm bước cuối, và đừng dùng nó để làm hộ bài kiểm tra.",
            "The AI tutor can be wrong. Check the last step yourself, and do not use it to do graded work for you.")}</li>
          <li>{t(lang,
            "Không dùng app để gửi nội dung xấu, quấy rối, hay cố vượt giới hạn lượt hỏi.",
            "Do not use the app to send harmful content, harass others, or work around the question limits.")}</li>
        </ul>
      </section>

      <section className="policy" aria-labelledby="p-contact">
        <h2 id="p-contact">{t(lang, "6. Liên hệ", "6. Contact")}</h2>
        <p>{t(lang, "Hỏi đáp, hoàn tiền, xem hoặc xóa dữ liệu: ", "Questions, refunds, seeing or deleting data: ")}{contact}.</p>
        <p><A href="/nang-cap">{t(lang, "Về trang Nâng cấp", "Back to Upgrade")}</A></p>
      </section>
    </PageFrame>
  );
}

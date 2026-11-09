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
          "Tiến độ, câu đã làm, ghi chú, lịch sử trò chuyện với trợ lý và mã Premium được lưu trong bộ nhớ trình duyệt (localStorage) của máy này. Bàn Toán không có tài khoản và không dùng công cụ phân tích hay quảng cáo. Xóa dữ liệu trang web trong trình duyệt là xóa hết những thứ này.",
          "Progress, answers, notes, tutor chat history and the Premium key are kept in this browser's storage (localStorage). Bàn Toán has no accounts and uses no analytics or advertising tools. Clearing this site's data in the browser removes all of it.")}</p>
        <p>{t(lang,
          "Trên máy dùng chung, hãy xóa dữ liệu trang khi dùng xong nếu không muốn người khác thấy ghi chú hay mã Premium.",
          "On a shared device, clear the site data when you finish if you do not want others to see your notes or Premium key.")}</p>
      </section>

      <section className="policy" aria-labelledby="p-out">
        <h2 id="p-out">{t(lang, "2. Dữ liệu rời khỏi máy", "2. Data that leaves your device")}</h2>
        <ul>
          <li>{t(lang,
            `Trợ lý toán: câu hỏi và vài lượt trò chuyện gần nhất được gửi tới máy chủ Bàn Toán rồi chuyển cho một nhà cung cấp AI (${AI_PROVIDERS}). Gói miễn phí của các nhà cung cấp này có thể dùng nội dung để cải thiện mô hình. Đừng gửi họ tên, địa chỉ, số điện thoại hay ảnh có thông tin cá nhân.`,
            `Maths tutor: your question and the last few turns go to the Bàn Toán server and then to one AI provider (${AI_PROVIDERS}). These providers' free tiers may use content to improve their models. Do not send names, addresses, phone numbers or photos with personal details.`)}</li>
          <li>{t(lang,
            "Giới hạn lượt hỏi: máy chủ đếm lượt theo một mã ngẫu nhiên của trình duyệt (hoặc mã Premium đã băm) và địa chỉ mạng, giữ tối đa hai ngày rồi xóa.",
            "Question limits: the server counts questions by a random browser id (or a hashed Premium key) and network address, kept for at most two days and then deleted.")}</li>
          <li>{t(lang,
            "Luyện chung (/luyen): lựa chọn đáp án được sao lưu kèm một mã thiết bị ngẫu nhiên, không kèm tên hay email.",
            "Shared drill (/luyen): your answer choices are backed up with a random device id, with no name or email.")}</li>
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
          "Học sinh dưới 16 tuổi cần cha mẹ hoặc người giám hộ đồng ý trước khi mua Premium hoặc tham gia chương trình giới thiệu. Cha mẹ có thể yêu cầu xem hoặc xóa dữ liệu đơn hàng qua địa chỉ liên hệ bên dưới.",
          "Students under 16 need a parent or guardian's consent before buying Premium or joining the referral programme. Parents can ask to see or delete order data through the contact below.")}</p>
      </section>

      <section className="policy" aria-labelledby="p-buy">
        <h2 id="p-buy">{t(lang, "4. Premium và hoàn tiền", "4. Premium and refunds")}</h2>
        <ul>
          <li>{t(lang,
            "Premium mua một lần theo kỳ 30 hoặc 365 ngày, không tự gia hạn. Quyền gắn với mã Premium, nhập được trên máy khác ở trang Nâng cấp.",
            "Premium is bought once for 30 or 365 days and never renews automatically. It is tied to the Premium key, which can be entered on another device on the Upgrade page.")}</li>
          <li>{t(lang,
            `Trong ${REFUND_DAYS} ngày kể từ khi thanh toán, bạn có thể xin hoàn tiền vì bất kỳ lý do gì. Hoàn qua đúng phương thức đã trả, trong khoảng 7 ngày làm việc; mã Premium sẽ bị vô hiệu.`,
            `Within ${REFUND_DAYS} days of payment you can ask for a refund for any reason. It is paid back by the same method within about 7 working days, and the Premium key is disabled.`)}</li>
          <li>{t(lang,
            "Tiền mã hóa (USDT/USDC) được hoàn bằng cùng loại token về ví đã gửi, trừ phí mạng. Gửi sai mạng hoặc sai số tiền có thể không lấy lại được; khi đó Bàn Toán không chịu trách nhiệm. Ở Việt Nam, tiền mã hóa không phải phương tiện thanh toán hợp pháp; hãy cân nhắc trước khi chọn.",
            "Crypto (USDT/USDC) is refunded in the same token to the sending wallet, minus network fees. Sending on the wrong network or the wrong amount may be unrecoverable, and Bàn Toán cannot take responsibility for that. In Vietnam crypto is not a lawful means of payment; consider this before choosing it.")}</li>
          <li>{t(lang,
            "Chuyển khoản đến sau khi đơn hết hạn vẫn được cấp quyền khi hệ thống nhận được tiền. Nếu sau 24 giờ chưa thấy, hãy liên hệ kèm mã đơn.",
            "A transfer that arrives after the order expires is still honoured once the money is received. If nothing arrives within 24 hours, contact us with the order id.")}</li>
        </ul>
      </section>

      <section className="policy" aria-labelledby="p-use">
        <h2 id="p-use">{t(lang, "5. Điều khoản dùng", "5. Terms of use")}</h2>
        <ul>
          <li>{t(lang,
            "Nội dung và lời giải được kiểm bằng máy nhưng vẫn có thể sai. Nếu thấy sai, hãy báo để sửa. Bàn Toán là công cụ học, không thay thế thầy cô hay đề chính thức.",
            "Content and solutions are machine-checked but can still contain mistakes. Please report any you find. Bàn Toán is a study tool, not a substitute for teachers or official exams.")}</li>
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

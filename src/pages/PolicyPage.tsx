import { useEffect } from "react";
import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";
import { PARENT_REFUND_DAYS, PAYBACK_WORKING_DAYS, REFUND_DAYS, REPLY_WORKING_DAYS, SUPPORT_EMAIL } from "../premium/terms.ts";

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
            `Trợ lý toán: câu hỏi, ảnh đề bài nếu bạn gửi, và vài lượt trò chuyện gần nhất được gửi tới máy chủ Bàn Toán rồi chuyển cho một nhà cung cấp AI (${AI_PROVIDERS}). Gói miễn phí của các nhà cung cấp này có thể dùng nội dung để cải thiện mô hình. Đừng gửi họ tên, địa chỉ, số điện thoại hay ảnh có thông tin cá nhân.`,
            `Maths tutor: your question, a photo of the problem if you send one, and the last few turns go to the Bàn Toán server and then to one AI provider (${AI_PROVIDERS}). These providers' free tiers may use content to improve their models. Do not send names, addresses, phone numbers or photos with personal details.`)}</li>
          <li>{t(lang,
            "Chấm bài làm (/cham-bai): đề và các bước con ghi được gửi tới máy chủ Bàn Toán rồi tới một nhà cung cấp AI như trên. Kết quả chấm chỉ lưu trên máy này.",
            "Marking (/cham-bai): the problem and the steps you write go to the Bàn Toán server and then to one AI provider, as above. The marking result is stored only on this device.")}</li>
          <li>{t(lang,
            "Giới hạn lượt hỏi và lượt chấm: máy chủ đếm lượt theo một mã ngẫu nhiên của trình duyệt (hoặc mã Premium đã băm) và địa chỉ mạng, giữ tối đa tám ngày rồi xóa.",
            "Question and marking limits: the server counts uses by a random browser id (or a hashed Premium key) and network address, kept for at most eight days and then deleted.")}</li>
          <li>{t(lang,
            "Báo cáo tuần cho phụ huynh: báo cáo nằm trong phần sau dấu # của đường link, trình duyệt không gửi phần này lên máy chủ. Ai có link đều đọc được.",
            "Weekly parent report: the report sits in the part of the link after #, which browsers never send to the server. Anyone with the link can read it.")}</li>
          <li>{t(lang,
            "Luyện chung (/luyen): lựa chọn đáp án được sao lưu kèm một mã thiết bị ngẫu nhiên, không kèm tên hay email.",
            "Shared drill (/luyen): your answer choices are backed up with a random device id, with no name or email.")}</li>
          <li>{t(lang,
            "Mua Premium: email, gói, số tiền, mã đơn và mã giao dịch được lưu để cấp và tra cứu quyền. Thanh toán do MoMo, ngân hàng của bạn, hoặc mạng blockchain (USDT/USDC, cho người mua ngoài Việt Nam) xử lý theo điều khoản của họ.",
            "Buying Premium: email, plan, amount, order id and transaction id are stored to issue and look up the licence. Payments are processed by MoMo, your bank, or the blockchain network (USDT/USDC, for buyers outside Vietnam) under their own terms.")}</li>
          <li>{t(lang,
            "Nhạc học: chỉ phát tệp được lưu trên chính máy chủ Bàn Toán, không tải dịch vụ video bên ngoài.",
            "Study music: only files hosted on the Bàn Toán server are played; no outside video service is loaded.")}</li>
        </ul>
      </section>

      <section className="policy" aria-labelledby="p-kids">
        <h2 id="p-kids">{t(lang, "3. Học sinh dưới 16 tuổi", "3. Students under 16")}</h2>
        <p>{t(lang,
          "Học sinh dưới 16 tuổi cần cha mẹ hoặc người giám hộ đồng ý trước khi mua Premium hoặc tham gia chương trình giới thiệu.",
          "Students under 16 need a parent or guardian's consent before buying Premium or joining the referral programme.")}</p>
        <p>{t(lang,
          `Nếu trẻ đã mua mà cha mẹ không biết, cha mẹ được hoàn đủ 100% trong ${PARENT_REFUND_DAYS} ngày kể từ lúc thanh toán, không tính vào giới hạn một lần ở mục 4.`,
          `If a child bought Premium without a parent knowing, the parent gets a full refund within ${PARENT_REFUND_DAYS} days of payment, separate from the one-refund limit in section 4.`)}</p>
        <p>{t(lang,
          `Cha mẹ có thể yêu cầu xem hoặc xóa bản ghi đơn của con, kèm mã đơn hoặc email đã dùng khi mua. Bàn Toán trả lời trong ${REPLY_WORKING_DAYS} ngày làm việc và xóa trong 7 ngày, trừ phần luật kế toán buộc phải lưu.`,
          `Parents can ask to see or delete their child's order record, giving the order id or the email used at checkout. We reply within ${REPLY_WORKING_DAYS} working days and delete within 7 days, except records accounting law requires us to keep.`)}</p>
      </section>

      <section className="policy" aria-labelledby="p-buy">
        <h2 id="p-buy">{t(lang, "4. Premium và hoàn tiền", "4. Premium and refunds")}</h2>
        <p>{t(lang,
          "Premium mua một lần theo kỳ 30 hoặc 365 ngày, không tự gia hạn. Quyền gắn với mã Premium, nhập được trên máy khác ở trang Nâng cấp.",
          "Premium is bought once for 30 or 365 days and never renews automatically. It is tied to the Premium key, which can be entered on another device on the Upgrade page.")}</p>

        <h3>{t(lang, "Khi nào được hoàn", "When you can get a refund")}</h3>
        <ul>
          <li>{t(lang,
            `Trong ${REFUND_DAYS} ngày kể từ lúc thanh toán: hoàn đủ 100% vì bất kỳ lý do gì, không cần giải thích. Mỗi email được hoàn theo cách này một lần.`,
            `Within ${REFUND_DAYS} days of payment: a full refund for any reason, no questions asked. Once per email address.`)}</li>
          <li>{t(lang,
            `Gói 365 ngày, sau ${REFUND_DAYS} ngày đầu: hoàn phần tháng chưa dùng, tính theo số tháng tròn còn lại nhân 1/12 giá gói. Ví dụ: mua 399.000đ, xin hoàn khi còn 8 tháng tròn → hoàn 266.000đ.`,
            `365-day plan after the first ${REFUND_DAYS} days: a refund for the unused whole months, at 1/12 of the price per month. Example: 399,000 VND with 8 whole months left returns 266,000 VND.`)}</li>
          <li>{t(lang,
            "Tiền đến sau khi đơn hết hạn 15 phút: nếu hệ thống đã nhận tiền, bạn vẫn được cấp Premium. Nếu sau 24 giờ vẫn chưa thấy, hãy liên hệ kèm mã đơn và chọn nhận Premium hoặc hoàn tiền.",
            "Payment that arrived after the 15-minute order window: Premium is still issued once the money is received. If nothing appears within 24 hours, contact us with the order id and choose Premium or a refund.")}</li>
          <li>{t(lang,
            "Bị trừ tiền hai lần cho cùng một đơn: lần thừa được hoàn đủ, không tính vào giới hạn một lần.",
            "Charged twice for one order: the extra payment is refunded in full and does not count as your one refund.")}</li>
          <li>{t(lang,
            "Lỗi từ phía Bàn Toán (trừ tiền mà không cấp quyền, Premium không hoạt động): luôn hoàn đủ, không phụ thuộc thời hạn.",
            "Any fault on our side (charged without Premium, Premium not working): always a full refund, with no time limit.")}</li>
        </ul>

        <h3>{t(lang, "Cách xin hoàn", "How to ask")}</h3>
        <p>{t(lang,
          `Gửi email từ địa chỉ đã dùng khi mua, kèm mã đơn (bắt đầu bằng BT) và cách bạn đã trả. Bàn Toán trả lời trong ${REPLY_WORKING_DAYS} ngày làm việc và chuyển tiền lại trong tối đa ${PAYBACK_WORKING_DAYS} ngày làm việc. Thời hạn tính theo ngày bạn gửi thư.`,
          `Email us from the address used at checkout, with the order id (starts with BT) and how you paid. We reply within ${REPLY_WORKING_DAYS} working days and send the money within ${PAYBACK_WORKING_DAYS} working days. Deadlines count from the day you write.`)}</p>

        <h3>{t(lang, "Tiền về đâu", "How the money comes back")}</h3>
        <table className="policy-table">
          <thead>
            <tr>
              <th>{t(lang, "Đã trả bằng", "Paid with")}</th>
              <th>{t(lang, "Hoàn về", "Refunded to")}</th>
              <th>{t(lang, "Phí", "Fees")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t(lang, "Ví MoMo, QR MoMo", "MoMo wallet or MoMo QR")}</td>
              <td>{t(lang, "Đúng ví MoMo đã trả", "The same MoMo wallet")}</td>
              <td>{t(lang, "Bàn Toán chịu", "Paid by Bàn Toán")}</td>
            </tr>
            <tr>
              <td>{t(lang, "Chuyển khoản, VietQR", "Bank transfer or VietQR")}</td>
              <td>{t(lang, "Đúng tài khoản đã chuyển; sang tài khoản khác chỉ khi chủ tài khoản gốc xác nhận bằng email mua hàng", "The same bank account; another account only if the original account holder confirms from the checkout email")}</td>
              <td>{t(lang, "Bàn Toán chịu", "Paid by Bàn Toán")}</td>
            </tr>
            <tr>
              <td>{t(lang, "USDT, USDC", "USDT or USDC")}</td>
              <td>{t(lang, "Ví đã gửi, cùng mạng và cùng loại token, đúng số token đã nhận", "The sending wallet, same network and token, the same number of tokens received")}</td>
              <td>{t(lang, "Người mua chịu phí mạng", "Network fee paid by the buyer")}</td>
            </tr>
          </tbody>
        </table>
        <p>{t(lang,
          "USDT/USDC dành cho người mua ở ngoài Việt Nam, nơi không dùng được MoMo hay ngân hàng Việt Nam. Người mua ở Việt Nam hãy trả bằng MoMo, VietQR hoặc chuyển khoản. Tiền mã hóa được hoàn bằng đúng số token đã nhận, không quy đổi lại theo tỷ giá mới.",
          "USDT/USDC is for buyers outside Vietnam, who cannot use MoMo or a Vietnamese bank. Buyers in Vietnam should pay with MoMo, VietQR or bank transfer. Crypto is refunded as the same number of tokens received, not re-converted at a new rate.")}</p>

        <h3>{t(lang, "Không hoàn hoặc hoàn một phần", "No refund or a partial one")}</h3>
        <ul>
          <li>{t(lang, `Gói 30 ngày đã quá ${REFUND_DAYS} ngày kể từ lúc thanh toán.`, `A 30-day plan more than ${REFUND_DAYS} days after payment.`)}</li>
          <li>{t(lang, "Email đã được hoàn tiền “mọi lý do” một lần trước đó.", "A second “any reason” refund for the same email.")}</li>
          <li>{t(lang,
            "Tiền mã hóa gửi sai mạng, sai loại token, sai địa chỉ ví hay sai số lượng: khoản đó có thể không lấy lại được, và Bàn Toán không chịu trách nhiệm. Phần đã về ví Bàn Toán được hoàn trừ phí mạng.",
            "Crypto sent on the wrong network, token, address or amount may be unrecoverable, and Bàn Toán cannot take responsibility for it. Anything that reaches our wallet is returned minus network fees.")}</li>
          <li>{t(lang, "Giao dịch bị ngân hàng hoặc MoMo đánh dấu gian lận, hoặc mã Premium bị chia sẻ công khai.", "Payments flagged as fraud by the bank or MoMo, or a Premium key shared publicly.")}</li>
        </ul>

        <h3>{t(lang, "Sau khi hoàn tiền", "After a refund")}</h3>
        <p>{t(lang,
          "Mã Premium ngừng hoạt động trên mọi máy. Tiến độ, điểm các đề đã làm và ghi chú vẫn nằm trên máy của bạn. Hoa hồng giới thiệu chưa chi của đơn bị hủy. Bản ghi đơn được giữ để đối soát kế toán; bạn có thể yêu cầu xóa, trừ phần luật buộc phải lưu. Bạn có thể mua lại Premium bất cứ lúc nào.",
          "The Premium key stops working on every device. Progress, scores and notes stay on your device. An unpaid referral commission for the order is cancelled. The order record is kept for accounting; you can ask us to delete it except where the law requires us to keep it. You can buy Premium again at any time.")}</p>
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

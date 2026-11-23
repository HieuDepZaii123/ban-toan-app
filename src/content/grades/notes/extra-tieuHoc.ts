import type { NoteBook } from "./types.ts";
import { note } from "./types.ts";

const R = String.raw;

/** Lời giải thích cho các bài bổ sung lớp 1–8 (lopExtra2.ts). */
export const tieuHocExtraNotes: NoteBook = {
  "1/toan-them": note(
    R`Thêm vào là gộp hai nhóm thành một nhóm lớn hơn, và gộp nhóm chính là phép cộng. Vì thế đề nói thêm, tặng thêm hay mua thêm thì mình cộng.`,
    R`Thấy hai số trong đề là vội trừ. Phải đọc xem đồ vật nhiều lên hay ít đi: nhiều lên thì cộng, ít đi mới trừ.`,
  ),
  "1/toan-bot": note(
    R`Bớt đi là lấy một phần ra khỏi nhóm, và lấy ra thì phần còn lại ít hơn ban đầu. Phép trừ cho đúng số đồ vật còn lại, và cộng lại phần đã bớt thì được số ban đầu.`,
    R`Cộng hai số trong đề thay vì trừ. Hãy hỏi xem đồ vật bị lấy đi hay thêm vào, rồi mới chọn phép tính.`,
  ),
  "2/nhieu-hon": note(
    R`Hai nhóm xếp thành từng đôi thì phần thừa ra của nhóm lớn chính là hiệu hai số. Vì vậy hỏi nhiều hơn bao nhiêu thì lấy số lớn trừ số bé.`,
    R`Thấy từ ít hơn là trừ ngay. Khi đề cho số bé và hỏi số lớn thì phải cộng, vì số lớn bằng số bé cộng phần chênh lệch.`,
  ),
  "2/chia-deu": note(
    R`Chia đều là lấy từng phần bằng nhau cho đến hết nhóm, nên số phần nhân với số đồ vật trong mỗi phần bằng cả nhóm. Phép chia là phép làm ngược lại phép nhân đó.`,
    R`Lấy số bé chia cho số lớn, hoặc chia xong quên kiểm tra. Số bị chia là tổng số đồ vật, và có thể thử lại bằng phép nhân.`,
  ),
  "3/rut-ve-don-vi": note(
    R`Các đơn vị giống nhau thì có giá trị bằng nhau, nên chia tổng cho số đơn vị cho giá trị của một đơn vị. Nhiều đơn vị hơn thì giá trị gấp lên cùng số lần đó, nên nhân lên.`,
    R`Chỉ làm một phép tính rồi dừng. Cần chia để biết giá trị của một đơn vị trước, rồi mới nhân với số đơn vị mới.`,
  ),
  "3/hai-buoc": note(
    R`Một bài có hai bước thì kết quả của phép tính đầu là đầu vào của phép tính sau. Nếu bỏ qua bước đầu thì không đủ dữ kiện để làm bước sau.`,
    R`Lấy luôn kết quả của phép tính đầu làm đáp số. Phải đọc lại câu hỏi để xem đã trả lời đúng điều đề hỏi chưa.`,
  ),
  "5/lai-lo": note(
    R`Phần trăm so sánh một số với giá vốn, nên giá vốn là $100\%$. Lãi $25\%$ nghĩa là giá bán bằng $125\%$ giá vốn.`,
    R`So sánh tiền lãi với giá bán thay vì giá vốn. Đề nói lãi so với giá vốn thì phải chia cho giá vốn.`,
  ),
  "4/hinh-binh-hanh-4": note(
    R`Cắt một tam giác ở một bên hình bình hành rồi ghép sang bên kia thì được hình chữ nhật có cùng đáy và chiều cao. Diện tích hình chữ nhật là đáy nhân chiều cao, nên diện tích hình bình hành cũng vậy.`,
    R`Nhân đáy với cạnh bên thay vì với chiều cao. Chiều cao là đoạn vuông góc với đáy, thường ngắn hơn cạnh bên.`,
  ),
  "4/hinh-thoi-4": note(
    R`Hai đường chéo của hình thoi vuông góc và cắt nhau tại trung điểm, chia hình thoi thành bốn tam giác vuông bằng nhau. Ghép lại thì hình thoi bằng nửa hình chữ nhật có hai cạnh là hai đường chéo.`,
    R`Quên chia cho $2$ nên diện tích gấp đôi. Công thức là tích hai đường chéo chia $2$.`,
  ),
  "5/chuyen-dong-2": note(
    R`Hai vật đi ngược chiều thì mỗi giờ khoảng cách giữa chúng giảm đi tổng hai vận tốc. Đi cùng chiều thì khoảng cách giảm đi hiệu hai vận tốc, nên thời gian gặp nhau là khoảng cách chia cho tổng hoặc hiệu đó.`,
    R`Dùng tổng hai vận tốc cho hai xe cùng chiều, hoặc hiệu cho hai xe ngược chiều. Hãy vẽ sơ đồ để xem hai xe đang lại gần hay đuổi nhau.`,
  ),
};

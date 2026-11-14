/**
 * Ví dụ mẫu thứ hai cho các bài lớp 1 đến lớp 5. Tách riêng khỏi secondExamples.ts vì tiểu học
 * dùng dấu nhân $\times$ và viết đơn vị bằng chữ. Khóa là "<lớp>/<mã bài>".
 */
import type { GradeExample } from "../types.ts";
import { buoc, vd } from "../types.ts";

const R = String.raw;

export const secondKids: Record<string, GradeExample> = {
  // Lớp 1
  "1/dem-10": vd(
    R`Đếm ngược từ $10$ về $6$. Viết các số đếm được.`,
    [
      buoc(R`Bắt đầu từ $10$, mỗi lần bớt đi một: $10$, $9$, $8$, $7$, $6$.`, R`Đếm ngược là đi lùi từng bước một trên dãy số.`),
      buoc(R`Đếm được tất cả $5$ số.`, R`Chỉ tay vào từng số và đếm một, hai, ba, bốn, năm.`),
    ],
    R`Các số là $10$, $9$, $8$, $7$, $6$, tất cả có $5$ số.`,
    [{ expr: "10-6+1", expect: "5" }],
  ),
  "1/so-sanh": vd(
    R`Lan có $6$ cái kẹo, Hoa có $9$ cái kẹo. Bạn nào có nhiều kẹo hơn?`,
    [
      buoc(R`So sánh hai số: $6<9$.`, R`Khi đếm, số $9$ đến sau số $6$ nên $9$ lớn hơn.`),
      buoc(R`Vậy Hoa có nhiều kẹo hơn Lan.`, R`Số lớn hơn ứng với nhiều đồ vật hơn.`),
    ],
    R`Hoa có nhiều kẹo hơn.`,
    [{ expr: "9-6", expect: "3" }],
  ),
  "1/so-0": vd(
    R`Tính $5-5$ và $0+4$.`,
    [
      buoc(R`Có $5$ bớt đi cả $5$ thì không còn gì: $5-5=0$.`, R`Một số trừ đi chính nó thì bằng không.`),
      buoc(R`Thêm $4$ vào chỗ trống: $0+4=4$.`, R`Cộng với không thì số đó giữ nguyên.`),
    ],
    R`Ta có $5-5=0$ và $0+4=4$.`,
    [{ expr: "5-5", expect: "0" }, { expr: "0+4", expect: "4" }],
  ),
  "1/tach-gop": vd(
    R`Tách số $8$ thành hai số. Nêu ba cách tách khác nhau.`,
    [
      buoc(R`Ba cách là $8=1+7$, $8=3+5$ và $8=4+4$.`, R`Lấy đi một phần của tám, phần còn lại là số thứ hai.`),
      buoc(R`Thử lại bằng cách gộp: $1+7$, $3+5$, $4+4$ đều bằng $8$.`, R`Gộp hai phần đã tách thì được lại số ban đầu.`),
    ],
    R`Có thể tách $8=1+7$, $8=3+5$ hoặc $8=4+4$.`,
    [{ expr: "3+5", expect: "8" }],
  ),
  "1/cong-10": vd(
    R`Trong lồng có $4$ con gà trống và $5$ con gà mái. Có tất cả bao nhiêu con gà?`,
    [
      buoc(R`Gộp hai nhóm gà lại nên làm phép cộng: $4+5$.`, R`Hỏi tất cả là gộp các nhóm thành một.`),
      buoc(R`Đếm tiếp từ $5$ thêm bốn bước: $6$, $7$, $8$, $9$.`, R`Đếm tiếp từ số lớn hơn thì nhanh hơn.`),
    ],
    R`Có tất cả $9$ con gà.`,
    [{ expr: "4+5", expect: "9" }],
  ),
  "1/tru-10": vd(
    R`Một cành có $9$ con chim. Bay đi $4$ con. Trên cành còn mấy con chim?`,
    [
      buoc(R`Bay đi là bớt đi, nên làm phép trừ: $9-4$.`, R`Hỏi còn lại là lấy số ban đầu bớt đi số mất đi.`),
      buoc(R`Đếm lùi từ $9$ bốn bước: $8$, $7$, $6$, $5$.`, R`Mỗi bước lùi ứng với một con chim bay đi.`),
    ],
    R`Trên cành còn $5$ con chim.`,
    [{ expr: "9-4", expect: "5" }],
  ),
  "1/chuc": vd(
    R`Viết số gồm $7$ chục và $0$ đơn vị, rồi số gồm $5$ chục và $8$ đơn vị.`,
    [
      buoc(R`Bảy chục và không đơn vị là $70$.`, R`Chữ số hàng chục viết trước, chữ số hàng đơn vị viết sau.`),
      buoc(R`Năm chục và tám đơn vị là $58$.`, R`Năm bó que mười cộng thêm tám que lẻ.`),
    ],
    R`Hai số là $70$ và $58$.`,
    [{ expr: "7*10+0", expect: "70" }, { expr: "5*10+8", expect: "58" }],
  ),
  "1/so-sanh-chuc": vd(
    R`Sắp xếp các số $52$, $25$, $57$ theo thứ tự từ bé đến lớn.`,
    [
      buoc(R`So hàng chục trước: $25$ có $2$ chục nên bé nhất.`, R`Số có ít chục hơn thì bé hơn, không cần xét hàng đơn vị.`),
      buoc(R`Hai số $52$ và $57$ cùng $5$ chục, so hàng đơn vị: $2<7$, nên $52<57$.`, R`Khi hàng chục bằng nhau thì mới so đến hàng đơn vị.`),
    ],
    R`Thứ tự từ bé đến lớn là $25$, $52$, $57$.`,
    [{ expr: "57-52", expect: "5" }],
  ),
  "1/cong-khong-nho": vd(
    R`Lớp Một A có $23$ bạn, lớp Một B có $25$ bạn. Hai lớp có tất cả bao nhiêu bạn?`,
    [
      buoc(R`Cộng hàng đơn vị: $3+5=8$.`, R`Tổng hàng đơn vị nhỏ hơn mười nên không phải nhớ.`),
      buoc(R`Cộng hàng chục: $2+2=4$. Vậy $23+25=48$.`, R`Bốn chục và tám đơn vị là bốn mươi tám.`),
    ],
    R`Hai lớp có tất cả $48$ bạn.`,
    [{ expr: "23+25", expect: "48" }],
  ),
  "1/tru-khong-nho": vd(
    R`Mẹ mua $68$ quả trứng, đã dùng $35$ quả. Còn lại bao nhiêu quả trứng?`,
    [
      buoc(R`Trừ hàng đơn vị: $8-5=3$.`, R`Tám lớn hơn năm nên trừ được ngay, không cần mượn.`),
      buoc(R`Trừ hàng chục: $6-3=3$. Vậy $68-35=33$.`, R`Thử lại: $33+35=68$ đúng bằng số trứng ban đầu.`),
    ],
    R`Còn lại $33$ quả trứng.`,
    [{ expr: "68-35", expect: "33" }],
  ),
  "1/hinh-quen": vd(
    R`Một hình vuông và một hình tam giác có tất cả bao nhiêu cạnh và bao nhiêu đỉnh?`,
    [
      buoc(R`Hình vuông có $4$ cạnh, hình tam giác có $3$ cạnh, tất cả $4+3=7$ cạnh.`, R`Đếm từng cạnh của mỗi hình rồi cộng lại.`),
      buoc(R`Số đỉnh bằng số cạnh ở mỗi hình, nên cũng có $7$ đỉnh.`, R`Mỗi đỉnh là chỗ hai cạnh gặp nhau, đi một vòng quanh hình sẽ thấy số đỉnh bằng số cạnh.`),
    ],
    R`Có tất cả $7$ cạnh và $7$ đỉnh.`,
    [{ expr: "4+3", expect: "7" }],
  ),
  "1/do-cm": vd(
    R`Một sợi dây dài $15$ xentimét. Cắt đi $4$ xentimét. Sợi dây còn dài bao nhiêu xentimét?`,
    [
      buoc(R`Cắt đi là bớt, nên tính $15-4$.`, R`Hai số đo cùng đơn vị xentimét nên trừ trực tiếp được.`),
      buoc(R`Ta có $15-4=11$.`, R`Hàng đơn vị $5-4=1$, hàng chục giữ nguyên $1$.`),
    ],
    R`Sợi dây còn dài $11$ xentimét.`,
    [{ expr: "15-4", expect: "11" }],
  ),
  "1/xem-gio": vd(
    R`Bạn Nam đi học lúc $7$ giờ và về nhà lúc $11$ giờ. Nam ở trường bao nhiêu giờ?`,
    [
      buoc(R`Đếm từ $7$ giờ đến $11$ giờ: $8$, $9$, $10$, $11$.`, R`Mỗi lần kim giờ chuyển sang số kế tiếp là thêm một giờ.`),
      buoc(R`Đếm được $4$ bước, tức là $11-7=4$ giờ.`, R`Khoảng thời gian bằng giờ sau trừ giờ trước.`),
    ],
    R`Nam ở trường $4$ giờ.`,
    [{ expr: "11-7", expect: "4" }],
  ),
  "1/xem-lich": vd(
    R`Hôm nay là thứ Hai. Sau $3$ ngày nữa là thứ mấy?`,
    [
      buoc(R`Đếm tiếp từng ngày: thứ Ba, thứ Tư, thứ Năm.`, R`Các ngày trong tuần nối tiếp nhau theo thứ tự trên tờ lịch.`),
      buoc(R`Ngày thứ ba đếm được là thứ Năm.`, R`Đếm đủ ba ngày thì dừng lại ở ngày cuối cùng.`),
    ],
    R`Sau $3$ ngày nữa là thứ Năm.`,
    [{ expr: "2+3", expect: "5" }],
  ),

  // Lớp 2
  "2/cong-nho": vd(
    R`Thùng thứ nhất có $38$ quả bưởi, thùng thứ hai có $46$ quả. Cả hai thùng có bao nhiêu quả?`,
    [
      buoc(R`Hàng đơn vị: $8+6=14$, viết $4$ và nhớ $1$.`, R`Mười bốn đơn vị là một chục và bốn đơn vị, nên chục đó được đưa sang hàng chục.`),
      buoc(R`Hàng chục: $3+4+1=8$. Vậy $38+46=84$.`, R`Đừng quên cộng thêm chữ số nhớ vào hàng chục.`),
    ],
    R`Cả hai thùng có $84$ quả bưởi.`,
    [{ expr: "38+46", expect: "84" }],
  ),
  "2/tru-nho": vd(
    R`Cửa hàng có $73$ quả dưa, đã bán $28$ quả. Còn lại bao nhiêu quả?`,
    [
      buoc(R`Hàng đơn vị: $3$ không trừ được $8$, mượn $1$ chục thành $13-8=5$.`, R`Một chục bằng mười đơn vị, mượn sang thì có mười ba đơn vị.`),
      buoc(R`Hàng chục còn $7-1=6$, rồi $6-2=4$. Vậy $73-28=45$.`, R`Thử lại: $45+28=73$, đúng bằng số dưa ban đầu.`),
    ],
    R`Cửa hàng còn $45$ quả dưa.`,
    [{ expr: "73-28", expect: "45" }],
  ),
  "2/bang-nhan": vd(
    R`Mỗi con gà có $2$ chân. Hỏi $8$ con gà có bao nhiêu chân?`,
    [
      buoc(R`Tám lần số $2$ nên làm phép nhân $2\times 8$.`, R`Mỗi con có số chân như nhau, gộp các nhóm bằng nhau thì dùng phép nhân.`),
      buoc(R`Theo bảng nhân $2$: $2\times 8=16$.`, R`Đếm thêm hai: hai, bốn, sáu, tám, mười, mười hai, mười bốn, mười sáu.`),
    ],
    R`Tám con gà có $16$ chân.`,
    [{ expr: "2*8", expect: "16" }],
  ),
  "2/bang-chia": vd(
    R`Có $18$ bông hoa cắm đều vào các lọ, mỗi lọ $2$ bông. Cần bao nhiêu lọ?`,
    [
      buoc(R`Chia $18$ bông thành các nhóm $2$ bông, nên tính $18:2$.`, R`Biết số trong mỗi nhóm, hỏi số nhóm thì dùng phép chia.`),
      buoc(R`Vì $2\times 9=18$ nên $18:2=9$.`, R`Dùng bảng nhân $2$ để tìm thương của phép chia.`),
    ],
    R`Cần $9$ lọ hoa.`,
    [{ expr: "18/2", expect: "9" }],
  ),
  "2/chia-2-5": vd(
    R`Có $45$ viên bi chia đều cho $5$ bạn. Mỗi bạn được mấy viên? Nếu chia cho $2$ bạn có chia đều được không?`,
    [
      buoc(R`Ta có $45:5=9$, vì $5\times 9=45$.`, R`Bảng nhân $5$ giúp tìm ra thương của phép chia cho $5$.`),
      buoc(R`Số $45$ có chữ số tận cùng là $5$, là số lẻ, nên không chia đều cho $2$ bạn được.`, R`Chỉ những số chẵn mới chia đều thành hai phần bằng nhau.`),
    ],
    R`Mỗi bạn được $9$ viên; chia cho $2$ bạn thì không đều được.`,
    [{ expr: "45/5", expect: "9" }],
  ),
  "2/tram": vd(
    R`Số $507$ gồm mấy trăm, mấy chục và mấy đơn vị? Viết số đó thành tổng.`,
    [
      buoc(R`Số $507$ gồm $5$ trăm, $0$ chục và $7$ đơn vị.`, R`Chữ số $0$ ở giữa cho biết không có chục nào, nhưng vẫn phải viết để giữ đúng hàng.`),
      buoc(R`Viết thành tổng: $507=500+7$.`, R`Hàng chục bằng không nên không cần ghi vào tổng.`),
    ],
    R`Ta có $507=500+7$, gồm $5$ trăm và $7$ đơn vị.`,
    [{ expr: "500+7", expect: "507" }],
  ),
  "2/so-sanh-tram": vd(
    R`Sắp xếp $640$, $604$, $460$ theo thứ tự từ lớn đến bé.`,
    [
      buoc(R`So hàng trăm: $460$ có $4$ trăm nên bé nhất.`, R`Số có ít trăm hơn thì bé hơn, không cần xem các hàng sau.`),
      buoc(R`Hai số $640$ và $604$ cùng $6$ trăm, so hàng chục: $4>0$, nên $640>604$.`, R`Hàng trăm bằng nhau thì mới so sang hàng chục.`),
    ],
    R`Thứ tự từ lớn đến bé là $640$, $604$, $460$.`,
    [{ expr: "640-604", expect: "36" }],
  ),
  "2/cong-tru-1000": vd(
    R`Một trường có $625$ học sinh, trong đó có $348$ bạn nữ. Trường có bao nhiêu bạn nam?`,
    [
      buoc(R`Số bạn nam là $625-348$.`, R`Lấy tổng số học sinh bớt đi số bạn nữ thì còn lại số bạn nam.`),
      buoc(R`Trừ có nhớ: hàng đơn vị $15-8=7$, hàng chục $11-4-1=6$, hàng trăm $6-3-1=2$, được $277$.`, R`Mỗi lần mượn ở hàng trên thì hàng trên bớt đi một.`),
    ],
    R`Trường có $277$ bạn nam.`,
    [{ expr: "625-348", expect: "277" }],
  ),
  "2/gap-khuc": vd(
    R`Một con kiến bò theo đường gấp khúc gồm $4$ đoạn, mỗi đoạn dài $3$ xentimét. Con kiến bò được bao nhiêu xentimét?`,
    [
      buoc(R`Bốn đoạn dài bằng nhau nên độ dài là $3\times 4$.`, R`Cộng bốn số bằng nhau thì có thể thay bằng phép nhân.`),
      buoc(R`Ta có $3\times 4=12$.`, R`Kiểm tra lại bằng phép cộng: $3+3+3+3=12$.`),
    ],
    R`Con kiến bò được $12$ xentimét.`,
    [{ expr: "3*4", expect: "12" }],
  ),
  "2/met-cm": vd(
    R`Tấm vải xanh dài $2$ mét, tấm vải đỏ dài $150$ xentimét. Tấm nào dài hơn và dài hơn bao nhiêu xentimét?`,
    [
      buoc(R`Đổi về cùng đơn vị: $2$ mét bằng $200$ xentimét.`, R`Muốn so hai số đo thì phải viết chúng cùng một đơn vị.`),
      buoc(R`So sánh: $200-150=50$ xentimét.`, R`Tấm vải xanh có số đo lớn hơn nên dài hơn.`),
    ],
    R`Tấm vải xanh dài hơn tấm vải đỏ $50$ xentimét.`,
    [{ expr: "200-150", expect: "50" }],
  ),
  "2/kg-lit": vd(
    R`Một can có $10$ lít nước. Rót sang $3$ chai, mỗi chai $2$ lít. Trong can còn bao nhiêu lít?`,
    [
      buoc(R`Ba chai chứa $2\times 3=6$ lít.`, R`Mỗi chai chứa như nhau nên tính bằng phép nhân.`),
      buoc(R`Trong can còn $10-6=4$ lít.`, R`Lượng nước rót đi được trừ khỏi lượng ban đầu.`),
    ],
    R`Trong can còn $4$ lít nước.`,
    [{ expr: "10-2*3", expect: "4" }],
  ),
  "2/gio-phut": vd(
    R`Bộ phim bắt đầu lúc $7$ giờ tối và kéo dài $1$ giờ $30$ phút. Phim kết thúc lúc mấy giờ?`,
    [
      buoc(R`Thêm $1$ giờ: $7$ giờ thành $8$ giờ.`, R`Cộng phần giờ trước cho dễ, rồi mới cộng phần phút.`),
      buoc(R`Thêm $30$ phút: $8$ giờ thành $8$ giờ $30$ phút.`, R`Ba mươi phút là nửa giờ, kim phút chỉ số sáu.`),
    ],
    R`Phim kết thúc lúc $8$ giờ $30$ phút tối.`,
    [{ expr: "7*60+90", expect: "510" }],
  ),
  "2/hinh-khoi": vd(
    R`Trong các đồ vật: quả bóng, lon nước, hộp bút, viên bi. Đồ vật nào có dạng khối cầu, đồ vật nào có dạng khối trụ?`,
    [
      buoc(R`Quả bóng và viên bi tròn đều mọi phía nên có dạng khối cầu.`, R`Khối cầu lăn được theo mọi hướng và không có mặt phẳng nào.`),
      buoc(R`Lon nước có hai mặt đáy tròn bằng nhau nên có dạng khối trụ.`, R`Khối trụ đứng được trên mặt đáy và lăn được khi đặt nằm.`),
    ],
    R`Quả bóng và viên bi là khối cầu, lon nước là khối trụ, còn hộp bút không thuộc hai loại này.`,
    [{ expr: "2+1", expect: "3" }],
  ),
  "2/bieu-do-tranh": vd(
    R`Biểu đồ tranh, mỗi hình quyển sách ứng với $2$ quyển. Hàng của Minh có $4$ hình, hàng của An có $3$ hình. Hai bạn đọc tất cả bao nhiêu quyển?`,
    [
      buoc(R`Minh đọc $2\times 4=8$ quyển, An đọc $2\times 3=6$ quyển.`, R`Mỗi hình không phải một quyển mà là hai quyển, nên phải nhân với hai.`),
      buoc(R`Tất cả là $8+6=14$ quyển.`, R`Cộng số sách của hai bạn lại với nhau.`),
    ],
    R`Hai bạn đọc tất cả $14$ quyển sách.`,
    [{ expr: "2*4+2*3", expect: "14" }],
  ),

  // Lớp 3
  "3/doc-100000": vd(
    R`Đọc số $70\,508$ và cho biết chữ số $5$ thuộc hàng nào.`,
    [
      buoc(R`Số $70\,508$ đọc là bảy mươi nghìn năm trăm linh tám.`, R`Đọc từng lớp: lớp nghìn trước rồi đến lớp đơn vị, chữ số không ở hàng chục đọc là "linh".`),
      buoc(R`Tách hàng: $7$ chục nghìn, $0$ nghìn, $5$ trăm, $0$ chục, $8$ đơn vị. Vậy chữ số $5$ ở hàng trăm.`, R`Đếm từ phải sang trái: đơn vị, chục, trăm, nghìn, chục nghìn.`),
    ],
    R`Chữ số $5$ thuộc hàng trăm, có giá trị $500$.`,
    [{ expr: "70000+500+8", expect: "70508" }],
  ),
  "3/lam-tron-3": vd(
    R`Một quyển truyện giá $38\,500$ đồng. Làm tròn giá đó đến hàng nghìn.`,
    [
      buoc(R`Chữ số hàng trăm là $5$.`, R`Muốn làm tròn đến hàng nghìn thì xét chữ số ngay bên phải, tức hàng trăm.`),
      buoc(R`Vì $5$ không bé hơn $5$ nên làm tròn lên: $39\,000$ đồng.`, R`Chữ số từ năm trở lên thì cộng thêm một vào hàng nghìn, các hàng sau thành không.`),
    ],
    R`Làm tròn đến hàng nghìn được $39\,000$ đồng.`,
    [{ expr: "floor(Rational(38500,1000)+Rational(1,2))*1000", expect: "39000" }],
  ),
  "3/so-la-ma": vd(
    R`Viết các số $9$, $14$ và $20$ bằng chữ số La Mã.`,
    [
      buoc(R`Số $9$ là $IX$, vì $I$ đứng trước $X$ nghĩa là $10$ bớt $1$.`, R`Chữ nhỏ đứng bên trái chữ lớn thì trừ, đứng bên phải thì cộng.`),
      buoc(R`Số $14$ là $XIV$, tức $10+4$; số $20$ là $XX$, tức $10+10$.`, R`Ghép các phần lại theo thứ tự từ lớn đến nhỏ.`),
    ],
    R`Ba số viết là $IX$, $XIV$ và $XX$.`,
    [{ expr: "10+(5-1)", expect: "14" }],
  ),
  "3/nhan-hai-chu": vd(
    R`Mỗi hộp có $24$ cái bút chì. Hỏi $3$ hộp có bao nhiêu cái?`,
    [
      buoc(R`Tính $24\times 3$: hàng đơn vị $4\times 3=12$, viết $2$ nhớ $1$.`, R`Mười hai đơn vị là một chục và hai đơn vị, chục đó được nhớ sang hàng chục.`),
      buoc(R`Hàng chục: $2\times 3=6$, thêm $1$ là $7$. Vậy $24\times 3=72$.`, R`Nhân xong hàng chục rồi mới cộng chữ số nhớ.`),
    ],
    R`Ba hộp có $72$ cái bút chì.`,
    [{ expr: "24*3", expect: "72" }],
  ),
  "3/chia-du": vd(
    R`Có $30$ học sinh, mỗi bàn ngồi $4$ bạn. Cần ít nhất bao nhiêu bàn để ai cũng có chỗ?`,
    [
      buoc(R`Tính $30:4=7$, dư $2$, vì $4\times 7=28$.`, R`Số dư bao giờ cũng phải bé hơn số chia.`),
      buoc(R`Bảy bàn ngồi được $28$ bạn, còn $2$ bạn cần thêm $1$ bàn nữa, tất cả $8$ bàn.`, R`Số dư là những bạn chưa có chỗ, nên phải thêm một bàn cho họ.`),
    ],
    R`Cần ít nhất $8$ bàn.`,
    [{ expr: "30//4+1", expect: "8" }],
  ),
  "3/bang-nhan-3-9": vd(
    R`Một tuần có $7$ ngày. Hỏi $4$ tuần có bao nhiêu ngày? Còn $9$ tuần thì sao?`,
    [
      buoc(R`Bốn tuần có $7\times 4=28$ ngày.`, R`Mỗi tuần có số ngày như nhau, nên nhân số ngày với số tuần.`),
      buoc(R`Chín tuần có $7\times 9=63$ ngày.`, R`Bảng nhân $7$: bảy nhân chín bằng sáu mươi ba.`),
    ],
    R`Bốn tuần có $28$ ngày, chín tuần có $63$ ngày.`,
    [{ expr: "7*4", expect: "28" }, { expr: "7*9", expect: "63" }],
  ),
  "3/chia-ba-chu": vd(
    R`Người ta xếp $845$ quả trứng vào các khay, mỗi khay $5$ quả. Được bao nhiêu khay?`,
    [
      buoc(R`Chia từ hàng trăm: $8:5=1$ dư $3$; hạ $4$ được $34:5=6$ dư $4$.`, R`Chia lần lượt từ trái sang phải, số dư ghép với chữ số tiếp theo.`),
      buoc(R`Hạ $5$ được $45:5=9$. Vậy $845:5=169$.`, R`Thử lại: $169\times 5=845$, không còn dư.`),
    ],
    R`Xếp được $169$ khay trứng.`,
    [{ expr: "845/5", expect: "169" }],
  ),
  "3/phan-nho": vd(
    R`Một sợi dây dài $24$ mét. Dùng một phần ba sợi dây để buộc hàng. Đã dùng bao nhiêu mét, còn lại bao nhiêu mét?`,
    [
      buoc(R`Một phần ba của $24$ mét là $24:3=8$ mét.`, R`Tìm một phần ba là chia số đó thành ba phần bằng nhau rồi lấy một phần.`),
      buoc(R`Còn lại $24-8=16$ mét.`, R`Phần còn lại là hai phần ba sợi dây.`),
    ],
    R`Đã dùng $8$ mét, còn lại $16$ mét.`,
    [{ expr: "24-24/3", expect: "16" }],
  ),
  "3/phan-lon": vd(
    R`Lớp có $35$ bạn, một phần bảy số bạn đeo kính. Có bao nhiêu bạn đeo kính?`,
    [
      buoc(R`Một phần bảy của $35$ là $35:7$.`, R`Chia số bạn thành bảy phần bằng nhau, mỗi phần là một phần bảy.`),
      buoc(R`Ta có $35:7=5$, vì $7\times 5=35$.`, R`Dùng bảng nhân bảy để tìm thương.`),
    ],
    R`Có $5$ bạn đeo kính.`,
    [{ expr: "35/7", expect: "5" }],
  ),
  "3/don-vi-do": vd(
    R`Quãng đường từ nhà đến trường dài $1$ kilômét $200$ mét. Quãng đường đó dài bao nhiêu mét?`,
    [
      buoc(R`Đổi $1$ kilômét thành $1000$ mét.`, R`Mỗi kilômét bằng một nghìn mét.`),
      buoc(R`Cộng thêm phần lẻ: $1000+200=1200$ mét.`, R`Hai phần đã cùng đơn vị mét nên cộng được.`),
    ],
    R`Quãng đường dài $1200$ mét.`,
    [{ expr: "1000+200", expect: "1200" }],
  ),
  "3/chu-vi-3": vd(
    R`Một mảnh vườn hình vuông có cạnh $9$ mét. Người ta rào quanh vườn. Hàng rào dài bao nhiêu mét?`,
    [
      buoc(R`Độ dài hàng rào là chu vi hình vuông.`, R`Rào quanh vườn là đi hết một vòng theo các cạnh của mảnh vườn.`),
      buoc(R`Chu vi bằng $9\times 4=36$ mét.`, R`Hình vuông có bốn cạnh dài bằng nhau.`),
    ],
    R`Hàng rào dài $36$ mét.`,
    [{ expr: "9*4", expect: "36" }],
  ),
  "3/trung-diem": vd(
    R`Điểm $M$ là trung điểm của đoạn $AB$, và $AM=6$ xentimét. Đoạn $AB$ dài bao nhiêu xentimét?`,
    [
      buoc(R`Trung điểm chia đoạn thẳng thành hai phần dài bằng nhau, nên $MB=AM=6$ xentimét.`, R`Điểm $M$ nằm giữa và cách đều hai đầu $A$, $B$.`),
      buoc(R`Đoạn $AB$ dài $6+6=12$ xentimét.`, R`Cả đoạn bằng tổng hai nửa ghép lại.`),
    ],
    R`Đoạn $AB$ dài $12$ xentimét.`,
    [{ expr: "6*2", expect: "12" }],
  ),
  "3/hinh-tron-3": vd(
    R`Một chiếc đĩa hình tròn có đường kính $18$ xentimét. Bán kính của đĩa dài bao nhiêu?`,
    [
      buoc(R`Đường kính gồm hai bán kính nối liền qua tâm.`, R`Đường kính đi từ mép này qua tâm sang mép kia.`),
      buoc(R`Bán kính bằng $18:2=9$ xentimét.`, R`Muốn tìm một bán kính thì chia đường kính làm hai.`),
    ],
    R`Bán kính dài $9$ xentimét.`,
    [{ expr: "18/2", expect: "9" }],
  ),
  "3/bang-so-lieu": vd(
    R`Số liệu giả định. Bảng ghi số cây trồng được: tổ Một $12$ cây, tổ Hai $15$ cây, tổ Ba $9$ cây. Tổ trồng nhiều nhất hơn tổ trồng ít nhất bao nhiêu cây?`,
    [
      buoc(R`Tổ Hai nhiều nhất với $15$ cây, tổ Ba ít nhất với $9$ cây.`, R`Đọc từng dòng của bảng rồi so sánh các số.`),
      buoc(R`Hơn nhau $15-9=6$ cây.`, R`Muốn biết hơn bao nhiêu thì lấy số lớn trừ số bé.`),
    ],
    R`Tổ Hai trồng nhiều hơn tổ Ba $6$ cây.`,
    [{ expr: "15-9", expect: "6" }],
  ),
  "3/chan-chan": vd(
    R`Gieo một con xúc xắc có sáu mặt ghi từ $1$ đến $6$ chấm. Việc được mặt $7$ chấm, việc được mặt dưới $7$ chấm, việc được mặt $6$ chấm thuộc loại nào?`,
    [
      buoc(R`Không có mặt $7$ chấm nên việc đó không thể xảy ra; mọi mặt đều dưới $7$ chấm nên việc đó chắc chắn xảy ra.`, R`Nhìn vào tất cả các mặt có thể xuất hiện để xếp loại.`),
      buoc(R`Mặt $6$ chấm có thể ra hoặc không, nên việc đó có thể xảy ra.`, R`Có mặt sáu chấm nhưng cũng có năm mặt khác.`),
    ],
    R`Lần lượt là không thể, chắc chắn và có thể.`,
    [{ expr: "6-1", expect: "5" }],
  ),
  "3/so-kha-nang": vd(
    R`Hộp thứ nhất có $3$ bi đỏ và $3$ bi xanh. Hộp thứ hai có $5$ bi đỏ và $1$ bi xanh. Muốn dễ lấy được bi đỏ thì nên lấy ở hộp nào?`,
    [
      buoc(R`Hộp thứ nhất có số bi đỏ bằng số bi xanh, nên khả năng như nhau.`, R`Hai màu nhiều bằng nhau thì không màu nào dễ ra hơn.`),
      buoc(R`Hộp thứ hai có bi đỏ nhiều hơn hẳn bi xanh, nên dễ lấy được bi đỏ hơn.`, R`Màu nào có nhiều viên hơn thì khả năng lấy được cao hơn.`),
    ],
    R`Nên lấy ở hộp thứ hai.`,
    [{ expr: "5-1", expect: "4" }],
  ),
  "3/dien-tich-3": vd(
    R`Một viên gạch hình vuông cạnh $4$ đềximét. Tính diện tích viên gạch, và cho biết $5$ viên gạch như vậy lát được bao nhiêu đềximét vuông.`,
    [
      buoc(R`Diện tích một viên là $4\times 4=16$ đềximét vuông.`, R`Diện tích hình vuông bằng cạnh nhân với chính nó.`),
      buoc(R`Năm viên lát được $16\times 5=80$ đềximét vuông.`, R`Các viên gạch không chồng lên nhau nên diện tích được cộng dồn.`),
    ],
    R`Một viên có diện tích $16$ đềximét vuông, năm viên lát được $80$ đềximét vuông.`,
    [{ expr: "4*4*5", expect: "80" }],
  ),
  "3/gam-ml": vd(
    R`Một chai nước chứa $1$ lít. Rót ra $3$ cốc, mỗi cốc $250$ mililít. Trong chai còn bao nhiêu mililít?`,
    [
      buoc(R`Đổi $1$ lít thành $1000$ mililít, ba cốc là $250\times 3=750$ mililít.`, R`Đổi về cùng đơn vị mililít trước khi trừ.`),
      buoc(R`Trong chai còn $1000-750=250$ mililít.`, R`Lấy lượng nước ban đầu trừ đi lượng đã rót.`),
    ],
    R`Trong chai còn $250$ mililít.`,
    [{ expr: "1000-250*3", expect: "250" }],
  ),

  // Lớp 4
  "4/doc-trieu": vd(
    R`Đọc số $12\,056\,300$ và cho biết số đó gồm mấy lớp.`,
    [
      buoc(R`Tách từ phải sang trái thành từng nhóm ba chữ số: $12$, $056$, $300$.`, R`Mỗi lớp gồm ba hàng, tách từ phải sang để không nhầm.`),
      buoc(R`Đọc là mười hai triệu không trăm năm mươi sáu nghìn ba trăm. Số có ba lớp: triệu, nghìn và đơn vị.`, R`Đọc từng lớp kèm tên lớp, chữ số không ở hàng trăm vẫn phải đọc.`),
    ],
    R`Số $12\,056\,300$ có ba lớp: triệu, nghìn và đơn vị.`,
    [{ expr: "12*10**6+56*1000+300", expect: "12056300" }],
  ),
  "4/so-sanh-trieu": vd(
    R`Số liệu giả định. Dân số tỉnh A là $1\,250\,400$ người, tỉnh B là $1\,205\,900$ người. Tỉnh nào đông dân hơn?`,
    [
      buoc(R`Hai số cùng có bảy chữ số, cùng chữ số hàng triệu là $1$.`, R`Số chữ số bằng nhau thì so từng hàng từ trái sang phải.`),
      buoc(R`Hàng trăm nghìn bằng nhau là $2$; hàng chục nghìn: $5>0$, nên $1\,250\,400>1\,205\,900$.`, R`Dừng lại ở hàng đầu tiên có hai chữ số khác nhau.`),
    ],
    R`Tỉnh A đông dân hơn tỉnh B.`,
    [{ expr: "1250400-1205900", expect: "44500" }],
  ),
  "4/phan-bang": vd(
    R`Tìm số thích hợp: $\frac{3}{5}=\frac{\square}{20}$ và $\frac{12}{18}=\frac{2}{\square}$.`,
    [
      buoc(R`Mẫu $5$ nhân $4$ thành $20$, nên tử cũng nhân $4$: $\frac{3}{5}=\frac{12}{20}$.`, R`Nhân cả tử và mẫu với cùng một số thì được phân số bằng nó.`),
      buoc(R`Tử $12$ chia $6$ thành $2$, nên mẫu cũng chia $6$: $\frac{12}{18}=\frac{2}{3}$.`, R`Chia cả tử và mẫu cho cùng một số khác không thì phân số không đổi.`),
    ],
    R`Hai số cần điền là $12$ và $3$.`,
    [{ expr: "Rational(3,5)-Rational(12,20)", expect: "0" }, { expr: "Rational(12,18)", expect: "Rational(2,3)" }],
  ),
  "4/so-sanh-phan-4": vd(
    R`So sánh $\frac{2}{3}$ và $\frac{3}{4}$.`,
    [
      buoc(R`Quy đồng mẫu số $12$: $\frac{2}{3}=\frac{8}{12}$ và $\frac{3}{4}=\frac{9}{12}$.`, R`Hai phân số khác mẫu thì đưa về cùng mẫu rồi mới so.`),
      buoc(R`Cùng mẫu, so tử: $8<9$, nên $\frac{2}{3}<\frac{3}{4}$.`, R`Cùng chia thành mười hai phần, lấy ít phần hơn thì bé hơn.`),
    ],
    R`Ta có $\frac{2}{3}<\frac{3}{4}$.`,
    [{ expr: "Rational(3,4)-Rational(2,3)", expect: "Rational(1,12)" }],
  ),
  "4/quy-dong": vd(
    R`Rút gọn $\frac{18}{24}$, rồi quy đồng mẫu số hai phân số $\frac{3}{4}$ và $\frac{5}{6}$.`,
    [
      buoc(R`Chia cả tử và mẫu cho $6$: $\frac{18}{24}=\frac{3}{4}$.`, R`Số $6$ là số lớn nhất chia hết cả $18$ và $24$, nên rút gọn một lần là xong.`),
      buoc(R`Mẫu chung nhỏ nhất là $12$: $\frac{3}{4}=\frac{9}{12}$ và $\frac{5}{6}=\frac{10}{12}$.`, R`Số $12$ chia hết cho cả $4$ và $6$, nên chọn làm mẫu chung.`),
    ],
    R`Ta có $\frac{18}{24}=\frac{3}{4}$, và hai phân số sau khi quy đồng là $\frac{9}{12}$, $\frac{10}{12}$.`,
    [{ expr: "Rational(18,24)", expect: "Rational(3,4)" }],
  ),
  "4/cong-tru-phan-so": vd(
    R`Một tấm bìa, bạn Mai tô màu $\frac{2}{5}$ tấm, bạn Lan tô thêm $\frac{1}{3}$ tấm. Hai bạn đã tô bao nhiêu phần tấm bìa, và còn bao nhiêu phần chưa tô?`,
    [
      buoc(R`Hai bạn tô được $\frac{2}{5}+\frac{1}{3}=\frac{6}{15}+\frac{5}{15}=\frac{11}{15}$ tấm bìa.`, R`Quy đồng mẫu số $15$ rồi cộng hai tử số.`),
      buoc(R`Còn lại $1-\frac{11}{15}=\frac{4}{15}$ tấm bìa chưa tô.`, R`Cả tấm bìa bằng $\frac{15}{15}$.`),
    ],
    R`Đã tô $\frac{11}{15}$ tấm bìa, còn $\frac{4}{15}$ tấm chưa tô.`,
    [{ expr: "1-Rational(2,5)-Rational(1,3)", expect: "Rational(4,15)" }],
  ),
  "4/goc-4": vd(
    R`Kim giờ và kim phút lúc $3$ giờ đúng tạo thành góc gì? Lúc $6$ giờ đúng thì sao?`,
    [
      buoc(R`Lúc $3$ giờ, kim phút chỉ số $12$, kim giờ chỉ số $3$, tạo thành góc vuông.`, R`Một phần tư vòng đồng hồ ứng với góc $90^\circ$.`),
      buoc(R`Lúc $6$ giờ, hai kim nằm thẳng hàng về hai phía, tạo thành góc bẹt.`, R`Nửa vòng đồng hồ ứng với góc $180^\circ$.`),
    ],
    R`Lúc $3$ giờ là góc vuông, lúc $6$ giờ là góc bẹt.`,
    [{ expr: "360/4", expect: "90" }],
  ),
  "4/vuong-song": vd(
    R`Hình chữ nhật $ABCD$ có cạnh $AB$ dài $8$ xentimét và cạnh $BC$ dài $5$ xentimét. Nêu các cặp cạnh song song, các cặp cạnh vuông góc, và tính chu vi.`,
    [
      buoc(R`Cạnh $AB$ song song với $CD$, cạnh $AD$ song song với $BC$; hai cạnh chung một đỉnh thì vuông góc, ví dụ $AB$ vuông góc với $BC$.`, R`Hình chữ nhật có bốn góc vuông và các cạnh đối diện song song với nhau.`),
      buoc(R`Chu vi bằng $(8+5)\times 2=26$ xentimét.`, R`Các cạnh đối diện dài bằng nhau nên lấy tổng chiều dài và chiều rộng rồi nhân hai.`),
    ],
    R`Chu vi hình chữ nhật bằng $26$ xentimét.`,
    [{ expr: "(8+5)*2", expect: "26" }],
  ),
  "4/trung-binh-4": vd(
    R`Ba ngày đầu tuần cửa hàng bán được $35$, $42$ và $28$ chiếc bánh. Trung bình mỗi ngày bán được bao nhiêu chiếc?`,
    [
      buoc(R`Tổng số bánh là $35+42+28=105$ chiếc.`, R`Trung bình cộng bắt đầu bằng việc cộng tất cả các số lại.`),
      buoc(R`Chia cho số ngày: $105:3=35$ chiếc.`, R`Chia đều tổng cho ba ngày, như thể ngày nào cũng bán bằng nhau.`),
    ],
    R`Trung bình mỗi ngày bán được $35$ chiếc bánh.`,
    [{ expr: "(35+42+28)/3", expect: "35" }],
  ),
  "4/bieu-do-cot-4": vd(
    R`Số liệu giả định. Biểu đồ cột cho số học sinh bốn lớp đi tham quan: $28$, $32$, $25$, $35$. Trung bình mỗi lớp có bao nhiêu bạn đi?`,
    [
      buoc(R`Đọc chiều cao bốn cột rồi cộng: $28+32+25+35=120$.`, R`Mỗi cột ứng với số bạn của một lớp.`),
      buoc(R`Chia cho số lớp: $120:4=30$ bạn.`, R`Có bốn cột nên chia tổng cho bốn.`),
    ],
    R`Trung bình mỗi lớp có $30$ bạn đi tham quan.`,
    [{ expr: "(28+32+25+35)/4", expect: "30" }],
  ),
  "4/nhan-hai-chu-so": vd(
    R`Một hội trường có $28$ hàng ghế, mỗi hàng $45$ ghế. Hội trường có bao nhiêu ghế?`,
    [
      buoc(R`Tính hai tích riêng: $45\times 8=360$ và $45\times 2=90$, tích riêng thứ hai viết lùi sang trái một hàng.`, R`Chữ số $2$ ở hàng chục, nên tích riêng thứ hai thật ra là $900$.`),
      buoc(R`Cộng hai tích riêng: $360+900=1260$.`, R`Tích bằng tổng các tích riêng theo đúng hàng.`),
    ],
    R`Hội trường có $1260$ ghế.`,
    [{ expr: "28*45", expect: "1260" }],
  ),
  "4/chia-hai-chu-so": vd(
    R`Người ta xếp $1035$ quyển sách vào các thùng, mỗi thùng $45$ quyển. Cần bao nhiêu thùng?`,
    [
      buoc(R`Lấy $103$ chia $45$ được $2$, vì $45\times 2=90$, dư $13$.`, R`Ước lượng thương bằng cách làm tròn $45$ thành $50$ rồi thử lại.`),
      buoc(R`Hạ $5$ được $135$, chia $45$ được $3$. Vậy $1035:45=23$.`, R`Thử lại: $45\times 23=1035$, không còn dư.`),
    ],
    R`Cần $23$ thùng.`,
    [{ expr: "1035/45", expect: "23" }],
  ),
  "4/tinh-chat": vd(
    R`Tính nhanh $47\times 36+47\times 64$.`,
    [
      buoc(R`Hai tích có chung thừa số $47$, nên viết thành $47\times(36+64)$.`, R`Tính chất phân phối cho phép gom thừa số chung ra ngoài.`),
      buoc(R`Ta có $36+64=100$, nên kết quả bằng $47\times 100=4700$.`, R`Nhân với một trăm chỉ cần viết thêm hai chữ số không.`),
    ],
    R`Kết quả bằng $4700$.`,
    [{ expr: "47*36+47*64", expect: "4700" }],
  ),
  "4/tong-hieu": vd(
    R`Hai thùng có tất cả $96$ lít dầu. Thùng thứ nhất nhiều hơn thùng thứ hai $14$ lít. Mỗi thùng có bao nhiêu lít?`,
    [
      buoc(R`Số bé bằng tổng trừ hiệu rồi chia hai: $(96-14):2=41$ lít.`, R`Bớt phần hơn ở thùng lớn thì hai thùng bằng nhau.`),
      buoc(R`Số lớn bằng $41+14=55$ lít.`, R`Thử lại: $55+41=96$ và $55-41=14$.`),
    ],
    R`Thùng thứ nhất có $55$ lít, thùng thứ hai có $41$ lít.`,
    [{ expr: "(96-14)/2", expect: "41" }, { expr: "(96+14)/2", expect: "55" }],
  ),
  "4/yen-ta-tan": vd(
    R`Một xe tải chở được $4$ tấn hàng. Đã chở $25$ bao gạo, mỗi bao $1$ tạ. Xe còn chở thêm được bao nhiêu kilôgam?`,
    [
      buoc(R`Đổi về kilôgam: $4$ tấn là $4000$ kilôgam, $25$ bao là $25\times 100=2500$ kilôgam.`, R`Một tấn bằng một nghìn kilôgam, một tạ bằng một trăm kilôgam.`),
      buoc(R`Còn chở thêm được $4000-2500=1500$ kilôgam.`, R`Hai số đã cùng đơn vị nên trừ được.`),
    ],
    R`Xe còn chở thêm được $1500$ kilôgam.`,
    [{ expr: "4000-25*100", expect: "1500" }],
  ),
  "4/giay-the-ki": vd(
    R`Năm $2025$ thuộc thế kỉ nào? Năm $1945$ thuộc thế kỉ nào?`,
    [
      buoc(R`Thế kỉ hai mươi mốt gồm các năm từ $2001$ đến $2100$, nên năm $2025$ thuộc thế kỉ $XXI$.`, R`Mỗi thế kỉ dài một trăm năm, bắt đầu từ năm có đuôi là một.`),
      buoc(R`Thế kỉ hai mươi gồm các năm từ $1901$ đến $2000$, nên năm $1945$ thuộc thế kỉ $XX$.`, R`Lấy hai chữ số đầu cộng thêm một khi năm không tròn trăm.`),
    ],
    R`Năm $2025$ thuộc thế kỉ $XXI$, năm $1945$ thuộc thế kỉ $XX$.`,
    [{ expr: "2025//100+1", expect: "21" }],
  ),
  "4/dien-tich-4": vd(
    R`Một căn phòng hình chữ nhật dài $5$ mét, rộng $4$ mét được lát bằng gạch vuông cạnh $5$ đềximét. Cần bao nhiêu viên gạch?`,
    [
      buoc(R`Diện tích phòng là $5\times 4=20$ mét vuông, tức $2000$ đềximét vuông.`, R`Một mét vuông bằng một trăm đềximét vuông.`),
      buoc(R`Mỗi viên có diện tích $5\times 5=25$ đềximét vuông, nên cần $2000:25=80$ viên.`, R`Chia diện tích phòng cho diện tích một viên, cùng đơn vị đềximét vuông.`),
    ],
    R`Cần $80$ viên gạch.`,
    [{ expr: "5*4*100/(5*5)", expect: "80" }],
  ),

  // Lớp 5
  "5/nhan-thap-phan": vd(
    R`Mỗi mét vải giá $45{,}5$ nghìn đồng. Mua $3{,}2$ mét hết bao nhiêu nghìn đồng?`,
    [
      buoc(R`Nhân như số tự nhiên: $455\times 32=14\,560$.`, R`Tạm bỏ dấu phẩy để nhân cho dễ, nhớ tổng số chữ số ở phần thập phân.`),
      buoc(R`Hai thừa số có tổng cộng hai chữ số thập phân, nên tích là $145{,}60=145{,}6$.`, R`Đếm từ phải sang trái hai chữ số rồi đặt dấu phẩy.`),
    ],
    R`Mua $3{,}2$ mét vải hết $145{,}6$ nghìn đồng.`,
    [{ expr: "Rational(455,10)*Rational(32,10)", expect: "Rational(1456,10)" }],
  ),
  "5/lam-tron": vd(
    R`Chiều cao của ba bạn là $1{,}356$ mét, $1{,}482$ mét và $1{,}405$ mét. Làm tròn mỗi số đến hàng phần trăm.`,
    [
      buoc(R`Xét chữ số hàng phần nghìn: $6\ge 5$ thì làm tròn lên, $2<5$ thì giữ nguyên.`, R`Muốn làm tròn đến hàng phần trăm thì nhìn chữ số ngay sau nó.`),
      buoc(R`Ba số làm tròn thành $1{,}36$, $1{,}48$ và $1{,}41$ mét.`, R`Chữ số $5$ ở số thứ ba cũng làm tròn lên.`),
    ],
    R`Ba số làm tròn lần lượt là $1{,}36$, $1{,}48$ và $1{,}41$ mét.`,
    [{ expr: "Rational(1356,1000)-Rational(136,100)", expect: "Rational(-4,1000)" }],
  ),
  "5/cong-tru-thap-phan": vd(
    R`Một bao gạo nặng $50$ kilôgam. Lần đầu lấy ra $12{,}5$ kilôgam, lần sau lấy ra $8{,}75$ kilôgam. Trong bao còn bao nhiêu kilôgam?`,
    [
      buoc(R`Hai lần lấy ra tổng cộng $12{,}5+8{,}75=21{,}25$ kilôgam.`, R`Đặt các chữ số cùng hàng thẳng cột, dấu phẩy thẳng dấu phẩy.`),
      buoc(R`Còn lại $50-21{,}25=28{,}75$ kilôgam.`, R`Viết $50$ thành $50{,}00$ để trừ cho đủ hàng.`),
    ],
    R`Trong bao còn $28{,}75$ kilôgam gạo.`,
    [{ expr: "50-Rational(1250,100)-Rational(875,100)", expect: "Rational(2875,100)" }],
  ),
  "5/chia-thap-phan": vd(
    R`Một ô tô đi $157{,}5$ kilômét hết $12{,}6$ lít xăng. Mỗi lít xăng đi được bao nhiêu kilômét?`,
    [
      buoc(R`Dời dấu phẩy ở cả hai số sang phải một chữ số: $1575:126$.`, R`Nhân cả số bị chia và số chia với cùng một số thì thương không đổi.`),
      buoc(R`Ta có $1575:126=12{,}5$.`, R`Thử lại: $12{,}6\times 12{,}5=157{,}5$.`),
    ],
    R`Mỗi lít xăng đi được $12{,}5$ kilômét.`,
    [{ expr: "Rational(1575,10)/Rational(126,10)", expect: "Rational(25,2)" }],
  ),
  "5/mot-phan-tram": vd(
    R`Một chiếc xe đạp giá $2\,400\,000$ đồng, được giảm giá $15\%$. Giá sau khi giảm là bao nhiêu?`,
    [
      buoc(R`Số tiền giảm là $2\,400\,000\times 15:100=360\,000$ đồng.`, R`Tìm phần trăm của một số thì nhân với số phần trăm rồi chia một trăm.`),
      buoc(R`Giá sau khi giảm là $2\,400\,000-360\,000=2\,040\,000$ đồng.`, R`Lấy giá ban đầu trừ đi số tiền được giảm.`),
    ],
    R`Giá sau khi giảm là $2\,040\,000$ đồng.`,
    [{ expr: "2400000*(100-15)/100", expect: "2040000" }],
  ),
  "5/doi-phan-tram": vd(
    R`Một lớp có $40$ bạn, trong đó $18$ bạn là nữ. Số bạn nữ chiếm bao nhiêu phần trăm số bạn trong lớp?`,
    [
      buoc(R`Tỉ số của số bạn nữ và cả lớp là $18:40=0{,}45$.`, R`Lấy số phần chia cho số toàn bộ.`),
      buoc(R`Đổi ra phần trăm: $0{,}45=45\%$.`, R`Nhân với một trăm rồi viết thêm kí hiệu phần trăm.`),
    ],
    R`Số bạn nữ chiếm $45\%$ cả lớp.`,
    [{ expr: "Rational(18,40)*100", expect: "45" }],
  ),
  "5/tam-giac-thang": vd(
    R`Một thửa ruộng hình thang có đáy lớn $26$ mét, đáy bé $18$ mét và chiều cao $15$ mét. Tính diện tích thửa ruộng.`,
    [
      buoc(R`Tổng hai đáy là $26+18=44$ mét.`, R`Hình thang có hai đáy song song, công thức cần tổng của chúng.`),
      buoc(R`Diện tích bằng $44\times 15:2=330$ mét vuông.`, R`Diện tích hình thang bằng tổng hai đáy nhân chiều cao rồi chia hai.`),
    ],
    R`Thửa ruộng có diện tích $330$ mét vuông.`,
    [{ expr: "(26+18)*15/2", expect: "330" }],
  ),
  "5/hinh-tron-5": vd(
    R`Một bánh xe đạp có đường kính $0{,}6$ mét. Bánh xe lăn $100$ vòng thì đi được bao nhiêu mét? Lấy $3{,}14$.`,
    [
      buoc(R`Mỗi vòng xe đi được đúng một chu vi bánh: $0{,}6\times 3{,}14=1{,}884$ mét.`, R`Chu vi hình tròn bằng đường kính nhân với $3{,}14$.`),
      buoc(R`Một trăm vòng: $1{,}884\times 100=188{,}4$ mét.`, R`Nhân với một trăm thì dời dấu phẩy sang phải hai chữ số.`),
    ],
    R`Bánh xe đi được $188{,}4$ mét.`,
    [{ expr: "Rational(6,10)*Rational(314,100)*100", expect: "Rational(1884,10)" }],
  ),
  "5/hop": vd(
    R`Một bể nước hình hộp chữ nhật dài $2$ mét, rộng $1{,}5$ mét, cao $1$ mét. Bể chứa được bao nhiêu lít nước?`,
    [
      buoc(R`Thể tích bể là $2\times 1{,}5\times 1=3$ mét khối.`, R`Thể tích hình hộp chữ nhật bằng dài nhân rộng nhân cao.`),
      buoc(R`Một mét khối bằng $1000$ lít, nên bể chứa $3000$ lít.`, R`Một đềximét khối chứa đúng một lít nước, và một mét khối có một nghìn đềximét khối.`),
    ],
    R`Bể chứa được $3000$ lít nước.`,
    [{ expr: "2*Rational(3,2)*1*1000", expect: "3000" }],
  ),
  "5/lap-phuong": vd(
    R`Một hộp quà hình lập phương cạnh $2{,}5$ đềximét. Cần bao nhiêu đềximét vuông giấy để dán kín hộp?`,
    [
      buoc(R`Mỗi mặt có diện tích $2{,}5\times 2{,}5=6{,}25$ đềximét vuông.`, R`Các mặt của hình lập phương đều là hình vuông bằng nhau.`),
      buoc(R`Sáu mặt: $6{,}25\times 6=37{,}5$ đềximét vuông.`, R`Dán kín nghĩa là phủ toàn phần, gồm cả mặt đáy và mặt nắp.`),
    ],
    R`Cần $37{,}5$ đềximét vuông giấy.`,
    [{ expr: "Rational(5,2)**2*6", expect: "Rational(75,2)" }],
  ),
  "5/ti-so-5": vd(
    R`Một lớp có $15$ bạn nam và $20$ bạn nữ. Viết tỉ số của số bạn nam và số bạn nữ, rồi rút gọn.`,
    [
      buoc(R`Tỉ số là $15:20$, hay $\frac{15}{20}$.`, R`Số nhắc đến trước đứng trước, nên số bạn nam ở trên.`),
      buoc(R`Chia cả hai số cho $5$: $\frac{15}{20}=\frac{3}{4}$.`, R`Rút gọn tỉ số như rút gọn phân số.`),
    ],
    R`Tỉ số số bạn nam và số bạn nữ là $\frac{3}{4}$.`,
    [{ expr: "Rational(15,20)", expect: "Rational(3,4)" }],
  ),
  "5/ban-do": vd(
    R`Quãng đường thật dài $15$ kilômét. Trên bản đồ tỉ lệ $1:500\,000$, quãng đường đó dài bao nhiêu xentimét?`,
    [
      buoc(R`Đổi $15$ kilômét thành $1\,500\,000$ xentimét.`, R`Đổi về cùng đơn vị với độ dài trên bản đồ trước khi chia.`),
      buoc(R`Độ dài trên bản đồ là $1\,500\,000:500\,000=3$ xentimét.`, R`Tỉ lệ cho biết độ dài thật gấp năm trăm nghìn lần độ dài trên bản đồ.`),
    ],
    R`Trên bản đồ, quãng đường dài $3$ xentimét.`,
    [{ expr: "1500000/500000", expect: "3" }],
  ),
  "5/chuyen-dong": vd(
    R`Hai xe xuất phát cùng lúc từ hai đầu quãng đường dài $180$ kilômét, đi ngược chiều nhau. Xe thứ nhất đi $50$ kilômét mỗi giờ, xe thứ hai đi $40$ kilômét mỗi giờ. Sau bao lâu hai xe gặp nhau?`,
    [
      buoc(R`Mỗi giờ hai xe gần nhau thêm $50+40=90$ kilômét.`, R`Đi ngược chiều thì khoảng cách giảm bằng tổng hai vận tốc.`),
      buoc(R`Thời gian gặp nhau là $180:90=2$ giờ.`, R`Thời gian bằng quãng đường chia cho vận tốc rút ngắn khoảng cách.`),
    ],
    R`Sau $2$ giờ hai xe gặp nhau.`,
    [{ expr: "180/(50+40)", expect: "2" }],
  ),
  "5/doi-gio": vd(
    R`Đổi $3{,}5$ giờ ra giờ và phút, và đổi $150$ giây ra phút.`,
    [
      buoc(R`Phần lẻ $0{,}5$ giờ bằng $0{,}5\times 60=30$ phút, nên $3{,}5$ giờ là $3$ giờ $30$ phút.`, R`Một giờ có sáu mươi phút, không phải một trăm phút.`),
      buoc(R`Ta có $150:60=2{,}5$, nên $150$ giây bằng $2{,}5$ phút, tức $2$ phút $30$ giây.`, R`Một phút có sáu mươi giây.`),
    ],
    R`Ta có $3{,}5$ giờ là $3$ giờ $30$ phút, và $150$ giây là $2{,}5$ phút.`,
    [{ expr: "Rational(5,10)*60", expect: "30" }, { expr: "Rational(150,60)", expect: "Rational(5,2)" }],
  ),
  "5/khoang-gio": vd(
    R`Một chuyến tàu khởi hành lúc $21$ giờ $45$ phút và đến nơi lúc $5$ giờ $15$ phút sáng hôm sau. Tàu chạy hết bao lâu?`,
    [
      buoc(R`Từ $21$ giờ $45$ phút đến $24$ giờ là $2$ giờ $15$ phút.`, R`Khi thời gian vượt qua nửa đêm thì chia thành hai đoạn, trước và sau mốc $24$ giờ.`),
      buoc(R`Từ $0$ giờ đến $5$ giờ $15$ phút là $5$ giờ $15$ phút, cộng lại được $7$ giờ $30$ phút.`, R`Cộng phút với phút, giờ với giờ.`),
    ],
    R`Tàu chạy hết $7$ giờ $30$ phút.`,
    [{ expr: "(24*60-(21*60+45))+(5*60+15)", expect: "450" }],
  ),
  "5/quat-5": vd(
    R`Số liệu giả định. Một nhóm gồm $40\%$ bạn thích bóng đá, $35\%$ thích cầu lông, còn lại thích bơi. Tính phần trăm bạn thích bơi và số đo góc của phần đó trên biểu đồ quạt.`,
    [
      buoc(R`Phần thích bơi là $100\%-40\%-35\%=25\%$.`, R`Cả hình tròn ứng với một trăm phần trăm.`),
      buoc(R`Góc của phần đó là $360^\circ\times 25:100=90^\circ$.`, R`Cả vòng tròn là $360^\circ$, chia theo đúng tỉ lệ phần trăm.`),
    ],
    R`Có $25\%$ bạn thích bơi, ứng với góc $90^\circ$.`,
    [{ expr: "360*(100-40-35)/100", expect: "90" }],
  ),
  "5/doc-quat": vd(
    R`Số liệu giả định. Biểu đồ quạt cho biết $30\%$ trong $200$ cây của vườn là cây cam. Vườn có bao nhiêu cây cam?`,
    [
      buoc(R`Số cây cam là $30\%$ của $200$, tức $200\times 30:100$.`, R`Đọc phần trăm trên quạt rồi tìm phần trăm của tổng số.`),
      buoc(R`Tính được $60$ cây.`, R`Mười phần trăm của hai trăm là hai mươi, ba lần như vậy là sáu mươi.`),
    ],
    R`Vườn có $60$ cây cam.`,
    [{ expr: "200*30/100", expect: "60" }],
  ),
  "5/tong-ti": vd(
    R`Tổng số tuổi của hai mẹ con là $45$, tuổi con bằng $\frac{2}{7}$ tuổi mẹ. Tính tuổi mỗi người.`,
    [
      buoc(R`Coi tuổi con là $2$ phần thì tuổi mẹ là $7$ phần, tổng cộng $9$ phần.`, R`Tỉ số $\frac{2}{7}$ cho biết cách chia tổng thành các phần bằng nhau.`),
      buoc(R`Mỗi phần là $45:9=5$ tuổi, nên con $2\times 5=10$ tuổi, mẹ $7\times 5=35$ tuổi.`, R`Thử lại: $10+35=45$, đúng bằng tổng số tuổi.`),
    ],
    R`Con $10$ tuổi, mẹ $35$ tuổi.`,
    [{ expr: "45/9*2", expect: "10" }, { expr: "45/9*7", expect: "35" }],
  ),
  "5/hieu-ti": vd(
    R`Thùng thứ nhất có nhiều hơn thùng thứ hai $30$ quả cam. Số cam thùng thứ hai bằng $\frac{2}{5}$ thùng thứ nhất. Mỗi thùng có bao nhiêu quả?`,
    [
      buoc(R`Coi thùng thứ hai là $2$ phần thì thùng thứ nhất là $5$ phần, hơn nhau $3$ phần.`, R`Hiệu số phần ứng với số cam hơn nhau.`),
      buoc(R`Mỗi phần là $30:3=10$ quả, nên thùng thứ hai có $20$ quả, thùng thứ nhất có $50$ quả.`, R`Thử lại: $50-20=30$, đúng bằng số cam hơn nhau.`),
    ],
    R`Thùng thứ nhất có $50$ quả, thùng thứ hai có $20$ quả.`,
    [{ expr: "30/3*5", expect: "50" }],
  ),
};

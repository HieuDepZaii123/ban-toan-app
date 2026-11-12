import type { NoteBook } from "./types.ts";
import { note } from "./types.ts";

const R = String.raw;

export const tieuHocNotes: NoteBook = {
  // Lớp 1
  "1/dem-10": note(
    R`Mỗi lần đếm thêm một là thêm đúng một đồ vật, nên số sau luôn nhiều hơn số trước một.`,
    R`Đếm sót hoặc đếm một vật hai lần. Hãy chạm tay vào từng vật, mỗi vật chỉ một lần.`,
  ),
  "1/so-sanh": note(
    R`Ghép từng vật của hai nhóm thành đôi. Nhóm nào còn thừa vật thì nhóm đó nhiều hơn, nên số của nhóm đó lớn hơn.`,
    R`Viết ngược dấu. Đầu nhọn của dấu luôn chỉ về số bé, miệng mở quay về số lớn.`,
  ),
  "1/cong-10": note(
    R`Gộp hai nhóm rồi đếm lại từ đầu vẫn ra cùng kết quả với đếm tiếp từ nhóm thứ nhất. Vì thế $3+2$ và $2+3$ đều bằng $5$.`,
    R`Khi đếm tiếp lại đếm luôn cả số đang có. Với $3+2$, bắt đầu đếm từ $4$, không phải từ $3$.`,
  ),
  "1/tru-10": note(
    R`Bớt đi rồi thêm lại đúng số đã bớt thì trở về số ban đầu. Từ $7$ bớt $3$ còn $4$, vì $4$ thêm $3$ lại được $7$.`,
    R`Lấy số bé trừ số lớn theo thói quen. Số đứng trước dấu trừ là số có lúc đầu, số đứng sau là số bớt đi.`,
  ),
  "1/chuc": note(
    R`Mười que tính bó lại thành một bó chục. Đếm số bó được chữ số hàng chục, đếm số que lẻ được chữ số hàng đơn vị.`,
    R`Đọc $34$ thành $3$ và $4$ rồi cộng lại được $7$. Chữ số $3$ ở đây là $3$ chục, tức $30$.`,
  ),
  "1/so-sanh-chuc": note(
    R`Một chục đã nhiều hơn mọi số đơn vị từ $0$ đến $9$. Vì vậy số nào nhiều chục hơn thì lớn hơn, dù hàng đơn vị của nó nhỏ.`,
    R`Chỉ nhìn hàng đơn vị. Số $38$ có chữ số $8$ lớn nhưng vẫn bé hơn $46$, vì $3$ chục ít hơn $4$ chục.`,
  ),
  "1/cong-khong-nho": note(
    R`Chục cộng với chục, đơn vị cộng với đơn vị, giống như gộp các bó que với nhau và gộp các que lẻ với nhau.`,
    R`Đặt tính lệch cột. Chữ số hàng đơn vị phải thẳng với hàng đơn vị, hàng chục thẳng với hàng chục.`,
  ),
  "1/tru-khong-nho": note(
    R`Bớt que lẻ ở chỗ que lẻ, bớt bó chục ở chỗ bó chục. Khi số que lẻ đủ để bớt thì không cần tháo bó nào.`,
    R`Trừ hàng chục xong rồi quên hàng đơn vị. Luôn trừ hàng đơn vị trước, sau đó mới đến hàng chục.`,
  ),
  "1/hinh-quen": note(
    R`Tên của hình đi theo số cạnh. Đếm đủ một vòng quanh hình: ba cạnh là hình tam giác, bốn cạnh bằng nhau và bốn góc vuông là hình vuông.`,
    R`Thấy hình tam giác quay ngược thì không nhận ra. Xoay hình đi, số cạnh không đổi nên tên hình không đổi.`,
  ),
  "1/do-cm": note(
    R`Thước chia thành các khoảng bằng nhau, mỗi khoảng dài một xentimét. Số khoảng nằm dọc theo vật chính là độ dài của vật.`,
    R`Đặt đầu vật ở vạch $1$ thay vì vạch $0$. Khi đó số đọc được bị thừa ra một xentimét.`,
  ),
  "1/xem-gio": note(
    R`Kim phút quay đủ một vòng thì kim giờ nhích sang số kế tiếp. Lúc kim phút về số $12$ là vừa tròn một giờ.`,
    R`Nhầm kim ngắn với kim dài. Kim ngắn chỉ giờ, kim dài chỉ phút.`,
  ),
  "1/xem-lich": note(
    R`Các ngày trong tháng được đánh số liên tiếp từ $1$. Số ngày đã qua và số ngày còn lại gộp lại đúng bằng số ngày của cả tháng.`,
    R`Cho rằng tháng nào cũng có $30$ ngày. Có tháng $31$ ngày, có tháng $30$ ngày, riêng tháng $2$ có $28$ hoặc $29$ ngày.`,
  ),

  // Lớp 2
  "2/cong-nho": note(
    R`Mười đơn vị bó lại thành một chục. Khi hàng đơn vị được từ $10$ trở lên, bó mười đơn vị ấy chuyển sang hàng chục, đó chính là số nhớ.`,
    R`Quên cộng số nhớ vào hàng chục. Viết số nhớ nhỏ phía trên hàng chục ngay khi vừa nhớ.`,
  ),
  "2/tru-nho": note(
    R`Tháo một bó chục ra thành mười que lẻ thì tổng số que không đổi. Lúc đó hàng đơn vị đủ que để bớt.`,
    R`Mượn rồi nhưng không bớt hàng chục. Sau khi mượn, hàng chục của số bị trừ phải giảm $1$.`,
  ),
  "2/bang-nhan": note(
    R`Phép nhân đếm các nhóm bằng nhau. Bốn túi, mỗi túi $5$ viên là $5+5+5+5$, nên $5\times 4=20$.`,
    R`Học thuộc mà không hiểu nên quên là bí. Nếu quên $5\times 6$, lấy $5\times 5=25$ rồi thêm một lần $5$.`,
  ),
  "2/bang-chia": note(
    R`Chia là tìm số còn thiếu trong phép nhân. Hỏi $20:4$ cũng là hỏi $4$ nhân mấy thì bằng $20$.`,
    R`Nhầm số bị chia với số chia. Số đứng trước dấu chia là tổng số đồ vật, số đứng sau là số phần chia ra.`,
  ),
  "2/tram": note(
    R`Mười chục bó lại thành một trăm, giống như mười đơn vị bó thành một chục. Mỗi hàng gấp mười lần hàng đứng bên phải nó.`,
    R`Viết thiếu chữ số $0$ giữ chỗ. Số gồm $3$ trăm và $5$ đơn vị là $305$, không phải $35$.`,
  ),
  "2/so-sanh-tram": note(
    R`Một trăm lớn hơn mọi số có hai chữ số. Vì vậy hàng trăm quyết định trước, chỉ khi bằng nhau mới cần xét đến hàng chục.`,
    R`So sánh từ hàng đơn vị lên. Với $305$ và $350$, hàng trăm bằng nhau nên so hàng chục: $0$ chục ít hơn $5$ chục.`,
  ),
  "2/gap-khuc": note(
    R`Đi hết đường gấp khúc là đi lần lượt hết từng đoạn. Quãng đường đã đi bằng độ dài các đoạn cộng lại.`,
    R`Cộng các đoạn có đơn vị khác nhau. Phải đổi tất cả về cùng xentimét hoặc cùng mét rồi mới cộng.`,
  ),
  "2/met-cm": note(
    R`Thước một mét chia thành $100$ khoảng một xentimét. Vì thế mỗi mét đổi được đúng $100$ xentimét.`,
    R`Đổi ngược phép tính. Từ mét ra xentimét thì số lớn lên nên nhân với $100$, từ xentimét về mét thì số nhỏ đi nên chia cho $100$.`,
  ),

  // Lớp 3
  "3/doc-100000": note(
    R`Mỗi hàng gấp mười lần hàng bên phải: mười nghìn là một chục nghìn, mười chục nghìn là một trăm nghìn.`,
    R`Bỏ sót hàng không có đơn vị nào. Số gồm $4$ chục nghìn, $5$ nghìn, $3$ chục và $2$ đơn vị là $45\,032$, hàng trăm phải viết $0$.`,
  ),
  "3/lam-tron-3": note(
    R`Số $46$ nằm giữa $40$ và $50$ nhưng gần $50$ hơn, còn $23$ gần $20$ hơn. Làm tròn là chọn số tròn gần nhất, và số đứng chính giữa được quy ước làm tròn lên.`,
    R`Nhìn nhầm chữ số. Làm tròn đến hàng chục thì nhìn hàng đơn vị, làm tròn đến hàng trăm thì nhìn hàng chục.`,
  ),
  "3/so-la-ma": note(
    R`Chữ số La Mã ghi số bằng cách cộng các kí hiệu. Để khỏi viết bốn chữ giống nhau liền nhau, người ta đặt chữ nhỏ trước chữ lớn để báo phép trừ, như $IV$ là $5-1$.`,
    R`Đọc $IV$ thành $6$ và $VI$ thành $4$. Chữ $I$ đứng trước thì trừ, đứng sau thì cộng.`,
  ),
  "3/nhan-hai-chu": note(
    R`Số $23$ là $20$ và $3$. Nhân từng phần với $4$ rồi cộng lại: $20\times 4=80$ và $3\times 4=12$, tổng là $92$.`,
    R`Quên cộng số nhớ vào tích hàng chục. Với $23\times 4$, nhân hàng chục được $8$ rồi phải thêm $1$ đã nhớ.`,
  ),
  "3/chia-du": note(
    R`Chia $17$ cái kẹo cho $5$ bạn, mỗi bạn $3$ cái thì hết $15$ cái và còn $2$. Nếu còn từ $5$ cái trở lên thì chia thêm được một vòng nữa, nên số dư luôn nhỏ hơn số chia.`,
    R`Để số dư lớn hơn hoặc bằng số chia. Khi đó thương còn thiếu, phải tăng thương lên.`,
  ),
  "3/phan-nho": note(
    R`Chia một nhóm thành $2$ phần bằng nhau thì mỗi phần là một phần hai. Vì các phần bằng nhau nên tìm một phần chính là làm phép chia.`,
    R`Chia thành các phần không bằng nhau vẫn gọi là một phần hai. Chỉ khi hai phần bằng nhau, mỗi phần mới là một phần hai.`,
  ),
  "3/phan-lon": note(
    R`Chia thành càng nhiều phần bằng nhau thì mỗi phần càng nhỏ. Một phần chín của cái bánh nhỏ hơn một phần năm của chính cái bánh đó.`,
    R`Nghĩ rằng một phần chín lớn hơn một phần năm vì $9$ lớn hơn $5$. Số phần càng nhiều thì mỗi phần càng bé.`,
  ),
  "3/don-vi-do": note(
    R`Mỗi đơn vị đo độ dài gấp $10$ lần đơn vị bé hơn liền sau nó. Đi qua hai bậc, từ mét xuống xentimét, là gấp $10$ rồi gấp $10$ lần nữa, tức $100$ lần.`,
    R`Đổi ra đơn vị nhỏ mà lại chia. Đơn vị càng nhỏ thì cần càng nhiều đơn vị để đo cùng một đoạn, nên số phải lớn lên.`,
  ),
  "3/chu-vi-3": note(
    R`Đi một vòng quanh hình chữ nhật là đi hai chiều dài và hai chiều rộng. Gộp một chiều dài với một chiều rộng rồi lấy hai lần là đủ một vòng.`,
    R`Chỉ cộng một chiều dài với một chiều rộng. Như thế mới đi được nửa vòng.`,
  ),
  "3/trung-diem": note(
    R`Trung điểm nằm chính giữa, cách đều hai đầu. Hai đoạn nhỏ bằng nhau và ghép lại thành cả đoạn, nên mỗi đoạn bằng một nửa.`,
    R`Gọi một điểm bất kỳ nằm giữa hai đầu là trung điểm. Điểm đó phải cách đều hai đầu mới là trung điểm.`,
  ),
  "3/hinh-tron-3": note(
    R`Đường kính gồm hai bán kính nối thẳng hàng qua tâm. Vì mọi bán kính của một hình tròn dài bằng nhau, đường kính dài gấp đôi bán kính.`,
    R`Lấy một đoạn nối hai điểm trên đường tròn nhưng không đi qua tâm làm đường kính. Đường kính bắt buộc phải đi qua tâm.`,
  ),
  "3/bang-so-lieu": note(
    R`Bảng xếp mỗi số liệu vào đúng một ô, nên dóng theo hàng và cột là tìm được ngay. Cộng hết các ô là gộp tất cả các nhóm lại.`,
    R`Đọc nhầm hàng hoặc nhầm cột. Dùng thước hoặc ngón tay dóng theo hàng trước khi đọc số.`,
  ),
  "3/chan-chan": note(
    R`Xếp loại một việc bằng cách xem hết các kết quả có thể ra. Túi chỉ có bi đỏ thì lần rút nào cũng ra bi đỏ, và không lần nào ra được bi xanh.`,
    R`Gọi việc rất dễ xảy ra là chắc chắn. Chỉ cần còn một kết quả không thuận thì việc đó mới là có thể, chưa phải chắc chắn.`,
  ),
  "3/so-kha-nang": note(
    R`Mỗi viên bi có cơ hội được rút như nhau. Màu nào có nhiều viên hơn thì có nhiều cơ hội hơn.`,
    R`Cho rằng dễ xảy ra hơn nghĩa là sẽ xảy ra. Túi có $4$ bi đỏ và $1$ bi xanh vẫn có lúc rút ra bi xanh.`,
  ),

  // Lớp 4
  "4/doc-trieu": note(
    R`Cứ ba hàng liền nhau làm thành một lớp: lớp đơn vị, lớp nghìn, lớp triệu. Một triệu là một nghìn nghìn, nên lớp triệu đứng ngay bên trái lớp nghìn.`,
    R`Viết thiếu chữ số $0$ trong một lớp. Mỗi lớp sau lớp đầu tiên phải đủ ba chữ số, ví dụ hai triệu không trăm linh năm nghìn là $2\,005\,000$.`,
  ),
  "4/so-sanh-trieu": note(
    R`Một đơn vị ở hàng bên trái lớn hơn mọi số viết được bằng các hàng bên phải. Vì vậy chỗ khác nhau đầu tiên tính từ trái sang đã đủ để kết luận.`,
    R`Thấy các chữ số phía sau lớn thì cho là số lớn. Số $2\,399\,000$ có hai chữ số $9$ nhưng vẫn bé hơn $2\,450\,000$, vì $3$ trăm nghìn ít hơn $4$ trăm nghìn.`,
  ),
  "4/phan-bang": note(
    R`Cắt mỗi phần của cái bánh thành hai miếng nhỏ thì số miếng lấy và tổng số miếng cùng gấp đôi, còn lượng bánh không đổi. Vì thế $\frac{1}{2}$ và $\frac{2}{4}$ chỉ cùng một lượng.`,
    R`Cộng cùng một số vào tử và mẫu. Chỉ nhân hoặc chia cả tử và mẫu cho cùng một số khác $0$ mới giữ nguyên giá trị.`,
  ),
  "4/so-sanh-phan-4": note(
    R`Cùng mẫu nghĩa là các phần to bằng nhau, nên lấy nhiều phần hơn thì được nhiều hơn. Còn chia cho $\frac{1}{2}$ là hỏi có bao nhiêu nửa trong số đó, nên kết quả gấp đôi.`,
    R`Chia tử cho tử, mẫu cho mẫu rồi bỏ dở khi không chia hết. Cách chắc chắn là giữ phân số thứ nhất và nhân với phân số thứ hai đảo ngược.`,
  ),
  "4/goc-4": note(
    R`Số đo góc cho biết hai cạnh mở rộng đến đâu. Góc vuông là mốc $90^\circ$: mở hẹp hơn là góc nhọn, mở rộng hơn là góc tù, mở thành đường thẳng là góc bẹt.`,
    R`Đọc nhầm vòng số trên thước đo góc. Thước có hai vòng số ngược chiều nhau, phải đọc vòng bắt đầu bằng $0$ ở cạnh đặt thước.`,
  ),
  "4/vuong-song": note(
    R`Hai đường thẳng song song luôn cách nhau một khoảng không đổi nên không bao giờ gặp nhau. Trong hình bình hành, hai cạnh đối bằng nhau nên chu vi là hai lần tổng hai cạnh kề.`,
    R`Thấy hai đoạn thẳng chưa cắt nhau trong hình vẽ thì cho là song song. Phải kéo dài ra, nếu chúng gặp nhau thì không song song.`,
  ),
  "4/trung-binh-4": note(
    R`Trung bình cộng là san đều: gom tất cả lại rồi chia đều cho từng phần. Sau khi san, phần nào cũng bằng nhau và tổng không đổi.`,
    R`Chia cho sai số các số hạng. Có bốn số thì chia cho $4$, kể cả khi có số lặp lại hoặc có số bằng $0$.`,
  ),
  "4/bieu-do-cot-4": note(
    R`Mọi cột dùng chung một thang đo trên trục đứng. Cột cao hơn bao nhiêu vạch thì số liệu lớn hơn bấy nhiêu.`,
    R`Đọc chiều cao cột mà không nhìn thang đo. Mỗi vạch có thể ứng với $2$, $5$ hoặc $10$ đơn vị chứ không phải lúc nào cũng là $1$.`,
  ),

  // Lớp 5
  "5/nhan-thap-phan": note(
    R`Viết $2{,}5$ là $\frac{25}{10}$ và $1{,}2$ là $\frac{12}{10}$. Nhân hai phân số được $\frac{300}{100}$: mẫu $100$ có hai chữ số $0$, ứng với hai chữ số sau dấu phẩy của tích.`,
    R`Đặt dấu phẩy thẳng cột như phép cộng. Trong phép nhân, đếm tổng số chữ số sau dấu phẩy của hai thừa số rồi mới đặt dấu phẩy vào tích.`,
  ),
  "5/lam-tron": note(
    R`Số $3{,}26$ nằm giữa $3{,}2$ và $3{,}3$, và gần $3{,}3$ hơn. Làm tròn là lấy mốc gần nhất, còn số nằm chính giữa được quy ước làm tròn lên.`,
    R`Làm tròn hai lần liên tiếp. Với $3{,}249$ làm tròn đến hàng phần mười, chỉ nhìn chữ số phần trăm là $4$ nên kết quả là $3{,}2$.`,
  ),
  "5/mot-phan-tram": note(
    R`Phần trăm là phân số có mẫu $100$. Lấy $25\%$ của $80$ là chia $80$ thành $100$ phần bằng nhau rồi lấy $25$ phần.`,
    R`Nhầm hai dạng bài. Biết cả số, tìm phần trăm của nó thì nhân. Biết giá trị của phần trăm, tìm cả số thì chia.`,
  ),
  "5/doi-phan-tram": note(
    R`Hai phân số bằng nhau chỉ cùng một lượng. Đưa mẫu về $100$ không làm đổi giá trị, và tử số lúc đó chính là số phần trăm.`,
    R`Viết $\frac{1}{4}$ thành $4\%$ hoặc $14\%$. Phải nhân cả tử và mẫu với $25$ để được $\frac{25}{100}$, tức $25\%$.`,
  ),
  "5/tam-giac-thang": note(
    R`Ghép hai tam giác bằng nhau được một hình bình hành có cùng đáy và chiều cao, nên mỗi tam giác bằng một nửa đáy nhân chiều cao. Ghép hai hình thang bằng nhau cũng được hình bình hành có đáy là tổng hai đáy.`,
    R`Lấy cạnh bên thay cho chiều cao. Chiều cao phải vuông góc với đáy.`,
  ),
  "5/hinh-tron-5": note(
    R`Đo nhiều hình tròn to nhỏ khác nhau, chu vi luôn gấp đường kính cùng một số lần, khoảng $3{,}14$. Cắt hình tròn thành nhiều múi rồi xếp so le sẽ gần thành hình chữ nhật có chiều dài bằng nửa chu vi và chiều rộng bằng bán kính.`,
    R`Dùng đường kính vào chỗ của bán kính. Đề cho đường kính thì chia đôi trước khi tính diện tích.`,
  ),
  "5/hop": note(
    R`Xếp các khối lập phương nhỏ cạnh $1$ xentimét vào hộp. Một lớp có $a\times b$ khối và có $c$ lớp như thế, nên cả hộp chứa $a\times b\times c$ khối.`,
    R`Ghi đơn vị thể tích là xentimét vuông. Diện tích dùng đơn vị vuông, thể tích dùng đơn vị khối.`,
  ),
  "5/lap-phuong": note(
    R`Hình lập phương là hình hộp chữ nhật có ba kích thước bằng nhau, nên thể tích là cạnh nhân cạnh nhân cạnh. Sáu mặt là sáu hình vuông bằng nhau nên diện tích toàn phần gấp sáu lần một mặt.`,
    R`Nhầm diện tích xung quanh với diện tích toàn phần. Xung quanh chỉ có bốn mặt bên, toàn phần có đủ sáu mặt.`,
  ),
  "5/ti-so-5": note(
    R`Tỉ số $a:b$ cho biết $a$ gấp mấy lần $b$, và có cùng giá trị với phân số $\frac{a}{b}$. Hai phân số bằng nhau khi tích chéo bằng nhau.`,
    R`Đảo thứ tự hai số. Tỉ số của $2$ và $3$ là $2:3$, khác với tỉ số của $3$ và $2$.`,
  ),
  "5/ban-do": note(
    R`Bản đồ thu nhỏ mọi khoảng cách theo cùng một số lần. Tỉ lệ $1:100\,000$ nghĩa là thực tế dài gấp $100\,000$ lần hình vẽ.`,
    R`Quên đổi đơn vị sau khi nhân. Kết quả nhân ra là xentimét, phải đổi sang mét hoặc kilômét cho phù hợp.`,
  ),
  "5/chuyen-dong": note(
    R`Vận tốc cho biết mỗi giờ đi được bao nhiêu kilômét. Đi đều trong mấy giờ thì quãng đường gấp bấy nhiêu lần.`,
    R`Để lệch đơn vị. Vận tốc tính theo kilômét trên giờ thì thời gian phải đổi ra giờ, ví dụ $30$ phút là $0{,}5$ giờ.`,
  ),
  "5/doi-gio": note(
    R`Đồng hồ chia một giờ thành $60$ phút và một phút thành $60$ giây. Số đo thời gian vì vậy đổi theo bậc $60$, không theo bậc $10$.`,
    R`Viết $2$ giờ $15$ phút thành $2{,}15$ giờ. Mười lăm phút là một phần tư giờ, nên đó là $2{,}25$ giờ.`,
  ),
  "5/khoang-gio": note(
    R`Thời gian trôi đều nên khoảng cách giữa hai mốc là hiệu của chúng. Đổi cả hai mốc ra phút để phép trừ không phải mượn theo bậc $60$.`,
    R`Mượn $1$ giờ nhưng đổi thành $100$ phút. Một giờ mượn sang chỉ là $60$ phút.`,
  ),
  "5/quat-5": note(
    R`Cả hình tròn ứng với $100\%$ và cũng là $360^\circ$. Mỗi phần chiếm bao nhiêu của cả nhóm thì góc quạt chiếm bấy nhiêu của $360^\circ$.`,
    R`Lấy số phần trăm làm số độ. Phần $25\%$ có góc quạt $90^\circ$, không phải $25^\circ$.`,
  ),
  "5/doc-quat": note(
    R`Góc quạt chia cho $360$ cho biết quạt đó chiếm mấy phần của cả nhóm. Nhân phần ấy với cả nhóm là ra số phần tử.`,
    R`Chia cho $100$ thay vì $360$ khi đề cho số đo góc. Số độ phải so với cả vòng tròn $360^\circ$.`,
  ),
};

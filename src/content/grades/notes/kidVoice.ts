/**
 * Tóm tắt bài lớp 1–3 viết cho trẻ nhỏ: câu ngắn, ví dụ bằng đồ vật quen thuộc, nói rõ vì sao.
 * Thay cho tóm tắt gọn của sách khi hiển thị và khi đọc to. Khóa là "<lớp>/<mã bài>".
 */
const R = String.raw;

export const kidSummaries: Record<string, string> = {
  // Lớp 1
  "1/dem-10": R`Đếm là chỉ vào từng đồ vật và đọc một số, mỗi vật đọc đúng một lần. Các số $1$, $2$, $3$ cho tới $10$ đi liền nhau. Số đứng sau luôn nhiều hơn số đứng trước đúng $1$, giống như thêm một viên bi vào túi.`,
  "1/so-0": R`Số $0$ dùng khi không có gì cả. Đĩa có $3$ quả táo, ăn hết cả $3$ quả thì trên đĩa còn $0$ quả. Thêm $0$ hay bớt $0$ thì số không thay đổi.`,
  "1/tach-gop": R`Một nhóm đồ vật có thể chia thành hai phần. Có $5$ cái kẹo, tay trái cầm $2$ cái thì tay phải cầm $3$ cái. Gộp hai phần lại thì được đúng nhóm ban đầu.`,
  "1/so-sanh": R`Muốn biết nhóm nào nhiều hơn, xếp từng đồ vật của hai nhóm thành từng đôi. Nhóm còn thừa ra là nhóm nhiều hơn. Dấu $>$ đọc là lớn hơn, dấu $<$ đọc là bé hơn, và đầu nhọn luôn chỉ vào số bé.`,
  "1/cong-10": R`Phép cộng là gộp hai nhóm lại. Có $3$ quả cam, mẹ cho thêm $2$ quả thì có $3+2=5$ quả. Có thể đếm tiếp từ số lớn: bắt đầu ở $3$, đếm thêm hai bước là $4$, $5$.`,
  "1/tru-10": R`Phép trừ là bớt đi một phần. Có $7$ viên bi, cho bạn $3$ viên thì còn $7-3=4$ viên. Muốn kiểm tra, cộng phần còn lại với phần đã bớt: $4+3=7$.`,
  "1/chuc": R`Mười que tính bó lại thành một bó, gọi là một chục. Số $34$ gồm $3$ bó chục và $4$ que lẻ. Chữ số bên trái chỉ số chục, chữ số bên phải chỉ số que lẻ.`,
  "1/so-sanh-chuc": R`So hai số có hai chữ số, nhìn số chục trước. Số $46$ có $4$ chục, số $38$ có $3$ chục, nên $46$ lớn hơn, dù $8$ lớn hơn $6$. Khi số chục bằng nhau mới so tiếp số lẻ.`,
  "1/cong-khong-nho": R`Đặt hai số thẳng cột: chục dưới chục, lẻ dưới lẻ. Cộng hàng lẻ trước, rồi cộng hàng chục. Ví dụ $42+35$: hàng lẻ $2+5=7$, hàng chục $4+3=7$, được $77$.`,
  "1/tru-khong-nho": R`Đặt hai số thẳng cột rồi trừ hàng lẻ trước, hàng chục sau. Ví dụ $57-24$: hàng lẻ $7-4=3$, hàng chục $5-2=3$, được $33$. Bài này chỉ có những phép trừ không cần mượn.`,
  "1/hinh-quen": R`Đếm số cạnh để gọi tên hình. Hình tam giác có $3$ cạnh. Hình vuông có $4$ cạnh dài bằng nhau. Hình chữ nhật có $4$ cạnh, hai cạnh dài và hai cạnh ngắn. Hình tròn không có cạnh thẳng nào.`,
  "1/do-cm": R`Xentimét, viết tắt là cm, là đơn vị đo độ dài. Đặt đầu vật thẳng với vạch $0$ của thước, rồi đọc số ở đầu kia. Bút chì dài $12$ cm thì dài hơn cục tẩy dài $3$ cm là $12-3=9$ cm.`,
  "1/xem-gio": R`Đồng hồ có kim ngắn chỉ giờ và kim dài chỉ phút. Khi kim dài chỉ đúng số $12$ là giờ đúng, và kim ngắn chỉ số nào thì là mấy giờ. Từ $3$ giờ đến $6$ giờ là $3$ giờ.`,
  "1/xem-lich": R`Một tuần có $7$ ngày, từ thứ Hai đến Chủ nhật. Lịch ghi ngày và tháng. Tháng có $31$ ngày, đã qua $10$ ngày thì còn $31-10=21$ ngày.`,

  // Lớp 2
  "2/cong-nho": R`Khi cộng hàng đơn vị mà được từ $10$ trở lên, mười đơn vị đổi thành một chục. Viết chữ số đơn vị xuống, rồi nhớ $1$ sang hàng chục. Ví dụ $27+15$: hàng đơn vị $7+5=12$, viết $2$ nhớ $1$; hàng chục $2+1+1=4$; được $42$.`,
  "2/tru-nho": R`Khi hàng đơn vị không đủ để trừ, mượn $1$ chục, tức là thêm $10$ đơn vị. Ví dụ $42-15$: $2$ không trừ được $5$, mượn thành $12-5=7$; hàng chục còn $3-1=2$; được $27$. Nhớ bớt chục đã cho mượn.`,
  "2/bang-nhan": R`Phép nhân là cộng nhiều lần cùng một số. Có $4$ túi, mỗi túi $5$ viên bi thì có $5+5+5+5=20$ viên, viết gọn là $5\times 4=20$. Bảng nhân $2$ và bảng nhân $5$ giúp tính nhanh mà không phải cộng từng lần.`,
  "2/bang-chia": R`Phép chia là chia đều. Có $20$ cái kẹo chia đều cho $4$ bạn thì mỗi bạn được $20:4=5$ cái, vì $4\times 5=20$. Biết phép nhân thì tìm được phép chia.`,
  "2/chia-2-5": R`Bảng chia $2$ đọc ngược từ bảng nhân $2$, bảng chia $5$ đọc ngược từ bảng nhân $5$. Vì $5\times 7=35$ nên $35:5=7$. Muốn chia, hỏi xem số chia nhân với mấy thì bằng số bị chia.`,
  "2/tram": R`Mười chục gộp lại thành một trăm. Số $246$ gồm $2$ trăm, $4$ chục và $6$ đơn vị. Mỗi chữ số đứng ở một hàng, và hàng bên trái gấp mười lần hàng bên phải.`,
  "2/so-sanh-tram": R`So hai số có ba chữ số, nhìn hàng trăm trước. Hàng trăm bằng nhau thì so hàng chục, rồi mới đến hàng đơn vị. Ví dụ $305$ và $350$: hàng trăm đều là $3$, hàng chục $0<5$, nên $305<350$.`,
  "2/cong-tru-1000": R`Đặt tính thẳng cột: trăm dưới trăm, chục dưới chục, đơn vị dưới đơn vị. Tính từ phải sang trái, có nhớ thì nhớ sang hàng bên trái. Ví dụ $358+127=485$.`,
  "2/gap-khuc": R`Đường gấp khúc gồm nhiều đoạn thẳng nối tiếp nhau. Độ dài của nó bằng tổng độ dài các đoạn. Ba đoạn dài $4$ cm, $5$ cm và $6$ cm thì cả đường dài $4+5+6=15$ cm.`,
  "2/met-cm": R`Một mét bằng $100$ xentimét. Đổi mét sang xentimét thì nhân với $100$: $3$ m là $300$ cm. Đổi xentimét sang mét thì chia cho $100$: $200$ cm là $2$ m.`,
  "2/kg-lit": R`Kilôgam, viết tắt là kg, dùng để cân xem vật nặng bao nhiêu. Lít, viết tắt là l, dùng để đo lượng nước trong bình. Chỉ cộng hoặc trừ các số đo có cùng đơn vị.`,
  "2/gio-phut": R`Một giờ có $60$ phút, một ngày có $24$ giờ. Khi kim dài chỉ số $6$ là đã qua $30$ phút, gọi là giờ rưỡi. Mỗi số trên mặt đồng hồ cách nhau $5$ phút.`,
  "2/hinh-khoi": R`Hộp sữa có dạng khối trụ, với hai mặt đáy hình tròn. Quả bóng có dạng khối cầu, tròn đều mọi phía. Hình tứ giác là hình có $4$ cạnh thẳng và $4$ đỉnh, dù méo cũng vẫn là tứ giác.`,
  "2/bieu-do-tranh": R`Biểu đồ tranh vẽ mỗi đồ vật bằng một hình nhỏ. Hàng nào có nhiều hình hơn thì nhiều đồ vật hơn. Đếm số hình trong từng hàng để so sánh và tính tổng.`,

  // Lớp 3
  "3/doc-100000": R`Số lớn được chia thành các hàng: chục nghìn, nghìn, trăm, chục, đơn vị. Số $45\,032$ gồm $4$ chục nghìn, $5$ nghìn, $0$ trăm, $3$ chục và $2$ đơn vị. Hàng nào không có thì viết chữ số $0$ để giữ chỗ.`,
  "3/lam-tron-3": R`Làm tròn là tìm số tròn gần nhất. Số $46$ gần $50$ hơn $40$, nên làm tròn đến hàng chục được $50$. Quy tắc: nhìn chữ số ngay bên phải, từ $5$ trở lên thì làm tròn lên, nhỏ hơn $5$ thì làm tròn xuống.`,
  "3/so-la-ma": R`Người La Mã viết số bằng chữ cái: $I$ là $1$, $V$ là $5$, $X$ là $10$. Chữ nhỏ đứng sau chữ lớn thì cộng, như $VI=6$. Chữ nhỏ đứng trước chữ lớn thì trừ, như $IV=4$.`,
  "3/nhan-hai-chu": R`Nhân số có hai chữ số với số có một chữ số: nhân hàng đơn vị trước, rồi hàng chục. Ví dụ $23\times 4$: $3\times 4=12$, viết $2$ nhớ $1$; $2\times 4=8$, thêm $1$ là $9$; được $92$.`,
  "3/chia-du": R`Không phải phép chia nào cũng chia hết. Chia $17$ cái kẹo cho $5$ bạn, mỗi bạn $3$ cái thì hết $15$ cái, còn thừa $2$ cái. Ta viết $17:5=3$ dư $2$. Số dư luôn nhỏ hơn số chia.`,
  "3/bang-nhan-3-9": R`Mỗi bảng nhân là một dãy đếm thêm đều. Bảng nhân $6$ là $6$, $12$, $18$, $24$ và cứ thêm $6$. Đổi chỗ hai số nhân thì kết quả không đổi, nên $7\times 8$ và $8\times 7$ đều bằng $56$.`,
  "3/chia-ba-chu": R`Chia lần lượt từ hàng trăm, đến hàng chục, rồi hàng đơn vị. Phần còn thừa ở một hàng thì đổi sang hàng bên phải để chia tiếp. Ví dụ $936:4=234$.`,
  "3/phan-nho": R`Chia một nhóm thành các phần bằng nhau. Một phần hai là chia làm hai phần bằng nhau rồi lấy một phần: một phần hai của $8$ quả táo là $8:2=4$ quả. Các phần phải bằng nhau thì mới gọi là một phần hai.`,
  "3/phan-lon": R`Một phần năm là chia làm $5$ phần bằng nhau rồi lấy một phần. Chia càng nhiều phần thì mỗi phần càng nhỏ, nên một phần chín của cái bánh nhỏ hơn một phần năm của cái bánh đó.`,
  "3/don-vi-do": R`Các đơn vị đo độ dài từ lớn đến nhỏ: mét, đềximét, xentimét. Mỗi đơn vị gấp $10$ lần đơn vị bé hơn liền sau. Đổi sang đơn vị nhỏ hơn thì số lớn lên: $3$ m là $300$ cm.`,
  "3/chu-vi-3": R`Chu vi là độ dài đường đi hết một vòng quanh hình. Hình chữ nhật dài $5$ cm và rộng $3$ cm có chu vi $(5+3)\times 2=16$ cm, vì phải đi qua hai chiều dài và hai chiều rộng.`,
  "3/trung-diem": R`Trung điểm là điểm nằm chính giữa đoạn thẳng, cách đều hai đầu. Đoạn dài $8$ cm thì trung điểm cách mỗi đầu $8:2=4$ cm.`,
  "3/hinh-tron-3": R`Hình tròn có một điểm ở chính giữa gọi là tâm. Bán kính là đoạn từ tâm đến đường tròn. Đường kính đi qua tâm, nối hai điểm trên đường tròn, và dài gấp đôi bán kính.`,
  "3/bang-so-lieu": R`Bảng số liệu xếp các số vào hàng và cột để dễ đọc. Dóng theo hàng và cột để tìm một số. Cộng các số trong bảng để biết tổng, và tìm ô lớn nhất để biết nhóm nhiều nhất.`,
  "3/chan-chan": R`Một việc chắc chắn xảy ra khi lần nào cũng xảy ra. Một việc không thể xảy ra khi không lần nào xảy ra. Còn lại là việc có thể xảy ra. Túi chỉ có bi đỏ thì chắc chắn rút được bi đỏ và không thể rút được bi xanh.`,
  "3/so-kha-nang": R`Khi rút ngẫu nhiên một viên bi, màu nào có nhiều viên hơn thì dễ được rút hơn. Túi có $4$ bi đỏ và $1$ bi xanh thì rút được bi đỏ dễ hơn, nhưng vẫn có lúc rút được bi xanh.`,
  "3/dien-tich-3": R`Diện tích là phần mặt phẳng bên trong hình. Đếm xem hình phủ được bao nhiêu ô vuông cạnh $1$ cm: hình chữ nhật dài $5$ cm, rộng $3$ cm có $5\times 3=15$ ô, tức diện tích $15$ cm vuông.`,
  "3/gam-ml": R`Gam dùng cho vật nhẹ, $1000$ gam bằng $1$ kilôgam. Mililít dùng cho lượng nước nhỏ, $1000$ mililít bằng $1$ lít. Một gói đường $500$ gam, hai gói là $1000$ gam, tức $1$ kilôgam.`,
};

/** Chương bổ sung cho lớp 1–5: bài toán có lời văn, chuyển động, hình bình hành và hình thoi. */
import type { GradeChapter, GradeLesson } from "./types.ts";
import { bai, buoc, chuong, luyen, vd } from "./types.ts";

const R = String.raw;

export const lop1BaiToan: GradeChapter = chuong("bai-toan-1", "Bài toán có lời văn", [
  bai("toan-them", "Bài toán thêm",
    R`Khi có thêm đồ vật thì làm phép cộng. Đọc kỹ đề, tìm lúc đầu có mấy, thêm mấy, rồi viết phép tính và câu trả lời.`,
    [
      vd(R`Lan có $5$ quả bóng, mẹ mua thêm $3$ quả. Lan có tất cả mấy quả bóng?`,
        [
          buoc(R`Lúc đầu có $5$ quả, thêm $3$ quả nên làm phép cộng.`, R`Thêm vào thì số lượng nhiều lên, nên dùng phép cộng.`),
          buoc(R`Phép tính là $5+3=8$.`, R`Đếm tiếp từ $5$ thêm ba bước là $6$, $7$, $8$.`),
        ],
        R`Lan có tất cả $8$ quả bóng.`,
        [{ expr: "5+3", expect: "8" }]),
      vd(R`Nam có $4$ cái kẹo, bạn cho thêm $6$ cái. Nam có tất cả mấy cái kẹo?`,
        [
          buoc(R`Có $4$ cái và thêm $6$ cái nên làm phép cộng.`, R`Bạn cho thêm là thêm vào, nên dùng phép cộng.`),
          buoc(R`Phép tính là $4+6=10$.`, R`Bốn và sáu ghép lại được đúng mười.`),
        ],
        R`Nam có tất cả $10$ cái kẹo.`,
        [{ expr: "4+6", expect: "10" }]),
    ],
    [
      luyen(R`Có $7$ chiếc xe, thêm $2$ chiếc nữa. Có tất cả mấy chiếc xe?`, R`Có $9$ chiếc xe.`, [{ expr: "7+2", expect: "9" }], R`Thêm vào thì làm phép cộng: $7+2=9$.`),
      luyen(R`Hoa có $6$ bông hoa, bạn tặng thêm $4$ bông. Hoa có tất cả mấy bông?`, R`Có $10$ bông hoa.`, [{ expr: "6+4", expect: "10" }], R`Thêm vào thì làm phép cộng: $6+4=10$.`),
      luyen(R`Bình có $3$ viên bi xanh và $5$ viên bi đỏ, rồi thêm $2$ viên bi vàng. Bình có tất cả mấy viên bi?`, R`Có $10$ viên bi.`, [{ expr: "3+5+2", expect: "10" }], R`Gộp cả ba nhóm lại: $3+5+2=10$.`),
    ]),
  bai("toan-bot", "Bài toán bớt",
    R`Khi đồ vật bị ăn mất, cho đi hay mang đi thì làm phép trừ. Muốn kiểm tra, cộng số còn lại với số đã bớt.`,
    [
      vd(R`Mai có $9$ cái bánh, Mai ăn $4$ cái. Mai còn mấy cái bánh?`,
        [
          buoc(R`Có $9$ cái, ăn $4$ cái nên làm phép trừ.`, R`Ăn đi là bớt đi, nên dùng phép trừ.`),
          buoc(R`Phép tính là $9-4=5$.`, R`Kiểm tra: $5+4=9$ nên kết quả đúng.`),
        ],
        R`Mai còn $5$ cái bánh.`,
        [{ expr: "9-4", expect: "5" }]),
      vd(R`Trong lớp có $10$ bạn, $6$ bạn ra sân chơi. Trong lớp còn mấy bạn?`,
        [
          buoc(R`Có $10$ bạn, $6$ bạn ra ngoài nên làm phép trừ.`, R`Ra khỏi lớp là bớt đi, nên dùng phép trừ.`),
          buoc(R`Phép tính là $10-6=4$.`, R`Kiểm tra: $4+6=10$ nên kết quả đúng.`),
        ],
        R`Trong lớp còn $4$ bạn.`,
        [{ expr: "10-6", expect: "4" }]),
    ],
    [
      luyen(R`Có $8$ quả trứng, dùng hết $3$ quả. Còn mấy quả trứng?`, R`Còn $5$ quả trứng.`, [{ expr: "8-3", expect: "5" }], R`Dùng hết là bớt đi, nên $8-3=5$.`),
      luyen(R`Tú có $7$ cái bút, cho bạn $2$ cái. Tú còn mấy cái bút?`, R`Còn $5$ cái bút.`, [{ expr: "7-2", expect: "5" }], R`Cho đi là bớt đi, nên $7-2=5$.`),
      luyen(R`Có $10$ con chim đậu trên cây, $3$ con bay đi rồi $2$ con bay đến. Trên cây còn mấy con chim?`, R`Còn $9$ con chim.`, [{ expr: "10-3+2", expect: "9" }], R`Bớt $3$ con rồi thêm $2$ con: $10-3+2=9$.`),
    ]),
]);

export const lop2BaiToan: GradeChapter = chuong("bai-toan-2", "Bài toán nhiều hơn, ít hơn và chia đều", [
  bai("nhieu-hon", "Nhiều hơn và ít hơn",
    R`Muốn biết nhóm này nhiều hơn nhóm kia bao nhiêu thì lấy số lớn trừ số bé. Biết số bé và hiệu thì tìm số lớn bằng phép cộng.`,
    [
      vd(R`Lan có $15$ quyển vở, Mai có $9$ quyển vở. Lan nhiều hơn Mai mấy quyển?`,
        [
          buoc(R`Hỏi nhiều hơn mấy quyển thì lấy số lớn trừ số bé.`, R`Hiệu của hai số cho biết nhóm lớn hơn nhóm bé bao nhiêu.`),
          buoc(R`Phép tính là $15-9=6$.`, R`Kiểm tra: $9+6=15$ nên kết quả đúng.`),
        ],
        R`Lan nhiều hơn Mai $6$ quyển vở.`,
        [{ expr: "15-9", expect: "6" }]),
      vd(R`Bình có $12$ viên bi, ít hơn An $5$ viên. An có bao nhiêu viên bi?`,
        [
          buoc(R`An nhiều hơn Bình $5$ viên nên lấy số của Bình cộng thêm $5$.`, R`Biết số bé và hiệu thì tìm số lớn bằng phép cộng.`),
          buoc(R`Phép tính là $12+5=17$.`, R`Kiểm tra: $17-12=5$ nên kết quả đúng.`),
        ],
        R`An có $17$ viên bi.`,
        [{ expr: "12+5", expect: "17" }]),
    ],
    [
      luyen(R`Có $18$ quả cam và $11$ quả táo. Cam nhiều hơn táo mấy quả?`, R`Cam nhiều hơn táo $7$ quả.`, [{ expr: "18-11", expect: "7" }], R`Lấy số lớn trừ số bé: $18-11=7$.`),
      luyen(R`Nga có $20$ cái kẹo, ít hơn Hà $8$ cái. Hà có bao nhiêu cái kẹo?`, R`Hà có $28$ cái kẹo.`, [{ expr: "20+8", expect: "28" }], R`Hà nhiều hơn Nga $8$ cái nên $20+8=28$.`),
      luyen(R`Sáng bán được $34$ cái bánh, chiều bán ít hơn sáng $9$ cái. Cả ngày bán được bao nhiêu cái bánh?`, R`Cả ngày bán được $59$ cái bánh.`, [{ expr: "34+(34-9)", expect: "59" }], R`Buổi chiều bán $34-9=25$ cái, cả ngày bán $34+25=59$ cái.`),
    ]),
  bai("chia-deu", "Chia đều thành các phần",
    R`Chia đều là chia thành các phần bằng nhau. Biết có bao nhiêu đồ vật và chia thành mấy phần thì mỗi phần có số vật tìm được bằng phép chia.`,
    [
      vd(R`Có $10$ cái kẹo chia đều cho $2$ bạn. Mỗi bạn được mấy cái kẹo?`,
        [
          buoc(R`Chia đều $10$ cái cho $2$ bạn nên làm phép chia.`, R`Chia thành các phần bằng nhau thì dùng phép chia.`),
          buoc(R`Phép tính là $10:2=5$.`, R`Kiểm tra: $2\times5=10$ nên kết quả đúng.`),
        ],
        R`Mỗi bạn được $5$ cái kẹo.`,
        [{ expr: "10/2", expect: "5" }]),
      vd(R`Có $15$ quả cam xếp đều vào $5$ đĩa. Mỗi đĩa có mấy quả cam?`,
        [
          buoc(R`Xếp đều $15$ quả vào $5$ đĩa nên làm phép chia.`, R`Mỗi đĩa có số quả bằng nhau, nên dùng phép chia.`),
          buoc(R`Phép tính là $15:5=3$.`, R`Kiểm tra: $5\times3=15$ nên kết quả đúng.`),
        ],
        R`Mỗi đĩa có $3$ quả cam.`,
        [{ expr: "15/5", expect: "3" }]),
    ],
    [
      luyen(R`Có $20$ cái bút chia đều cho $5$ bạn. Mỗi bạn được mấy cái bút?`, R`Mỗi bạn được $4$ cái bút.`, [{ expr: "20/5", expect: "4" }], R`Chia đều thì làm phép chia: $20:5=4$.`),
      luyen(R`Có $18$ chiếc bánh xếp đều vào $2$ hộp. Mỗi hộp có mấy chiếc bánh?`, R`Mỗi hộp có $9$ chiếc bánh.`, [{ expr: "18/2", expect: "9" }], R`Chia đều thì làm phép chia: $18:2=9$.`),
      luyen(R`Có $24$ chiếc kẹo chia đều cho $4$ bạn, rồi mỗi bạn được cô cho thêm $3$ chiếc. Mỗi bạn có tất cả mấy chiếc kẹo?`, R`Mỗi bạn có $9$ chiếc kẹo.`, [{ expr: "24/4+3", expect: "9" }], R`Mỗi bạn được $24:4=6$ chiếc, thêm $3$ chiếc thành $9$ chiếc.`),
    ]),
]);

export const lop3BaiToan: GradeChapter = chuong("bai-toan-3", "Bài toán rút về đơn vị và hai bước", [
  bai("rut-ve-don-vi", "Bài toán rút về đơn vị",
    R`Biết giá trị của nhiều đơn vị thì chia để tìm giá trị của một đơn vị, rồi nhân để tìm giá trị của số đơn vị mới.`,
    [
      vd(R`Mua $4$ quyển vở hết $24$ nghìn đồng. Mua $7$ quyển vở như thế hết bao nhiêu nghìn đồng?`,
        [
          buoc(R`Giá một quyển vở là $24:4=6$ nghìn đồng.`, R`Chia tổng tiền cho số quyển để tìm giá của một quyển.`),
          buoc(R`Giá $7$ quyển là $6\times7=42$ nghìn đồng.`, R`Nhân giá một quyển với số quyển cần mua.`),
        ],
        R`Mua $7$ quyển vở hết $42$ nghìn đồng.`,
        [{ expr: "24/4*7", expect: "42" }]),
      vd(R`Một xe chở $5$ chuyến được $40$ tấn gạo. Xe chở $8$ chuyến như thế được bao nhiêu tấn gạo?`,
        [
          buoc(R`Mỗi chuyến chở $40:5=8$ tấn gạo.`, R`Chia tổng số tấn cho số chuyến để tìm một chuyến.`),
          buoc(R`Tám chuyến chở $8\times8=64$ tấn gạo.`, R`Nhân số tấn của một chuyến với $8$ chuyến.`),
        ],
        R`Xe chở được $64$ tấn gạo.`,
        [{ expr: "40/5*8", expect: "64" }]),
    ],
    [
      luyen(R`Có $3$ hộp bút xếp được $18$ cái. Hỏi $5$ hộp như thế có bao nhiêu cái bút?`, R`Có $30$ cái bút.`, [{ expr: "18/3*5", expect: "30" }], R`Một hộp có $18:3=6$ cái, $5$ hộp có $6\times5=30$ cái.`),
      luyen(R`Đi $4$ giờ được $200$ km. Đi $6$ giờ với cùng cách đi thì được bao nhiêu ki-lô-mét?`, R`Đi được $300$ km.`, [{ expr: "200/4*6", expect: "300" }], R`Mỗi giờ đi $200:4=50$ km, $6$ giờ đi $50\times6=300$ km.`),
      luyen(R`Một người làm $6$ ngày được $480$ nghìn đồng. Làm $9$ ngày như thế được bao nhiêu nghìn đồng?`, R`Được $720$ nghìn đồng.`, [{ expr: "480/6*9", expect: "720" }], R`Mỗi ngày được $480:6=80$ nghìn đồng, $9$ ngày được $80\times9=720$ nghìn đồng.`),
    ]),
  bai("hai-buoc", "Bài toán giải bằng hai phép tính",
    R`Có bài toán phải làm hai phép tính. Phép tính thứ nhất tìm số chưa biết cần cho phép tính thứ hai, rồi viết một câu trả lời cuối cùng.`,
    [
      vd(R`Cửa hàng có $45$ kg gạo, buổi sáng bán $18$ kg, buổi chiều bán $15$ kg. Cửa hàng còn bao nhiêu ki-lô-gam gạo?`,
        [
          buoc(R`Cả ngày bán được $18+15=33$ kg.`, R`Gộp hai buổi bán lại để biết số gạo đã bán.`),
          buoc(R`Còn lại $45-33=12$ kg.`, R`Lấy số gạo ban đầu trừ số gạo đã bán.`),
        ],
        R`Cửa hàng còn $12$ kg gạo.`,
        [{ expr: "45-(18+15)", expect: "12" }]),
      vd(R`Mỗi hộp có $6$ cái bánh. Mẹ mua $4$ hộp rồi cho bạn $9$ cái. Mẹ còn bao nhiêu cái bánh?`,
        [
          buoc(R`Mẹ mua $6\times4=24$ cái bánh.`, R`Mỗi hộp có $6$ cái, mua $4$ hộp thì làm phép nhân.`),
          buoc(R`Mẹ còn $24-9=15$ cái bánh.`, R`Cho bạn là bớt đi nên làm phép trừ.`),
        ],
        R`Mẹ còn $15$ cái bánh.`,
        [{ expr: "6*4-9", expect: "15" }]),
    ],
    [
      luyen(R`Lớp có $32$ học sinh, trong đó $14$ bạn nữ. Mỗi bạn nam trồng $2$ cây. Các bạn nam trồng được bao nhiêu cây?`, R`Các bạn nam trồng được $36$ cây.`, [{ expr: "(32-14)*2", expect: "36" }], R`Có $32-14=18$ bạn nam, trồng $18\times2=36$ cây.`),
      luyen(R`Một sợi dây dài $50$ m, cắt lấy $2$ đoạn, mỗi đoạn dài $12$ m. Phần còn lại dài bao nhiêu mét?`, R`Phần còn lại dài $26$ m.`, [{ expr: "50-2*12", expect: "26" }], R`Hai đoạn dài $2\times12=24$ m, còn lại $50-24=26$ m.`),
      luyen(R`Cửa hàng bán $3$ túi gạo, mỗi túi $5$ kg, và $4$ túi đường, mỗi túi $2$ kg. Cả gạo và đường nặng bao nhiêu ki-lô-gam?`, R`Nặng $23$ kg.`, [{ expr: "3*5+4*2", expect: "23" }], R`Gạo nặng $3\times5=15$ kg, đường nặng $4\times2=8$ kg, tổng là $15+8=23$ kg.`),
    ]),
]);

export const lop4HinhBinhHanh: GradeChapter = chuong("hinh-binh-hanh-4", "Hình bình hành và hình thoi", [
  bai("hinh-binh-hanh-4", "Hình bình hành",
    R`Hình bình hành có hai cặp cạnh đối song song và bằng nhau. Diện tích bằng độ dài đáy nhân với chiều cao tương ứng.`,
    [
      vd(R`Hình bình hành có đáy $8$ cm và chiều cao $5$ cm. Tính diện tích.`,
        [
          buoc(R`Diện tích bằng đáy nhân với chiều cao.`, R`Cắt một phần tam giác bên cạnh ghép sang bên kia thì được hình chữ nhật cùng đáy và cùng chiều cao.`),
          buoc(R`Ta có $S=8\times5=40$ xăng-ti-mét vuông.`, R`Phép nhân $8\times5$ cho số ô vuông một xăng-ti-mét phủ kín hình.`),
        ],
        R`Diện tích là $40$ xăng-ti-mét vuông.`,
        [{ expr: "8*5", expect: "40" }]),
      vd(R`Hình bình hành có diện tích $72$ cm vuông và đáy $9$ cm. Tính chiều cao.`,
        [
          buoc(R`Chiều cao bằng diện tích chia cho đáy.`, R`Phép chia là phép làm ngược lại phép nhân đáy với chiều cao.`),
          buoc(R`Ta có $72:9=8$ cm.`, R`Kiểm tra: $9\times8=72$ nên kết quả đúng.`),
        ],
        R`Chiều cao là $8$ cm.`,
        [{ expr: "72/9", expect: "8" }]),
    ],
    [
      luyen(R`Hình bình hành có đáy $12$ cm và chiều cao $7$ cm. Diện tích là bao nhiêu?`, R`Diện tích là $84$ xăng-ti-mét vuông.`, [{ expr: "12*7", expect: "84" }], R`Diện tích bằng đáy nhân chiều cao: $12\times7=84$.`),
      luyen(R`Hình bình hành có diện tích $60$ cm vuông và chiều cao $5$ cm. Đáy dài bao nhiêu?`, R`Đáy dài $12$ cm.`, [{ expr: "60/5", expect: "12" }], R`Đáy bằng diện tích chia chiều cao: $60:5=12$.`),
      luyen(R`Hình bình hành có hai cạnh liền kề dài $10$ cm và $6$ cm. Chu vi là bao nhiêu?`, R`Chu vi là $32$ cm.`, [{ expr: "2*(10+6)", expect: "32" }], R`Hai cặp cạnh đối bằng nhau nên chu vi là $(10+6)\times2=32$.`),
    ]),
  bai("hinh-thoi-4", "Hình thoi",
    R`Hình thoi có bốn cạnh bằng nhau và hai đường chéo vuông góc với nhau. Diện tích bằng tích hai đường chéo chia $2$.`,
    [
      vd(R`Hình thoi có hai đường chéo dài $6$ cm và $8$ cm. Tính diện tích.`,
        [
          buoc(R`Diện tích bằng tích hai đường chéo chia $2$.`, R`Hình thoi bằng nửa hình chữ nhật có hai cạnh là hai đường chéo.`),
          buoc(R`Ta có $S=6\times8:2=24$ xăng-ti-mét vuông.`, R`Nhân hai đường chéo rồi chia cho $2$.`),
        ],
        R`Diện tích là $24$ xăng-ti-mét vuông.`,
        [{ expr: "6*8/2", expect: "24" }]),
      vd(R`Hình thoi có cạnh dài $5$ cm. Tính chu vi.`,
        [
          buoc(R`Bốn cạnh bằng nhau nên chu vi bằng cạnh nhân $4$.`, R`Hình thoi có bốn cạnh dài bằng nhau.`),
          buoc(R`Ta có $5\times4=20$ cm.`, R`Phép nhân $5\times4$ cho tổng độ dài bốn cạnh.`),
        ],
        R`Chu vi là $20$ cm.`,
        [{ expr: "5*4", expect: "20" }]),
    ],
    [
      luyen(R`Hình thoi có hai đường chéo dài $10$ cm và $12$ cm. Diện tích là bao nhiêu?`, R`Diện tích là $60$ xăng-ti-mét vuông.`, [{ expr: "10*12/2", expect: "60" }], R`Diện tích là $10\times12:2=60$.`),
      luyen(R`Hình thoi có chu vi $36$ cm. Mỗi cạnh dài bao nhiêu?`, R`Mỗi cạnh dài $9$ cm.`, [{ expr: "36/4", expect: "9" }], R`Bốn cạnh bằng nhau nên mỗi cạnh dài $36:4=9$.`),
      luyen(R`Hình thoi có diện tích $48$ cm vuông và một đường chéo dài $8$ cm. Đường chéo kia dài bao nhiêu?`, R`Đường chéo kia dài $12$ cm.`, [{ expr: "48*2/8", expect: "12" }], R`Từ $S=d_1\times d_2:2$ suy ra $d_2=2S:d_1=96:8=12$.`),
    ]),
]);

export const chuyenDong2: GradeLesson = bai("chuyen-dong-2", "Chuyển động ngược chiều và cùng chiều",
  R`Hai vật đi ngược chiều lại gần nhau với tốc độ bằng tổng hai vận tốc. Hai vật đi cùng chiều, vật sau đuổi vật trước, thì lại gần nhau với tốc độ bằng hiệu hai vận tốc.`,
  [
    vd(R`Hai xe cùng xuất phát từ hai tỉnh cách nhau $180$ km và đi ngược chiều nhau, vận tốc $40$ km/giờ và $50$ km/giờ. Sau mấy giờ hai xe gặp nhau?`,
      [
        buoc(R`Mỗi giờ hai xe lại gần nhau $40+50=90$ km.`, R`Đi ngược chiều thì khoảng cách giảm bằng tổng hai vận tốc.`),
        buoc(R`Thời gian gặp nhau là $180:90=2$ giờ.`, R`Chia khoảng cách ban đầu cho quãng đường mà hai xe cùng lại gần trong một giờ.`),
      ],
      R`Sau $2$ giờ hai xe gặp nhau.`,
      [{ expr: "180/(40+50)", expect: "2" }]),
    vd(R`Xe thứ nhất chạy $30$ km/giờ. Cùng lúc, xe thứ hai ở phía sau cách $60$ km chạy cùng chiều với vận tốc $50$ km/giờ. Sau mấy giờ xe thứ hai đuổi kịp xe thứ nhất?`,
      [
        buoc(R`Mỗi giờ xe thứ hai lại gần xe thứ nhất $50-30=20$ km.`, R`Đi cùng chiều thì khoảng cách giảm bằng hiệu hai vận tốc.`),
        buoc(R`Thời gian đuổi kịp là $60:20=3$ giờ.`, R`Chia khoảng cách ban đầu cho quãng đường lại gần trong một giờ.`),
      ],
      R`Sau $3$ giờ xe thứ hai đuổi kịp xe thứ nhất.`,
      [{ expr: "60/(50-30)", expect: "3" }]),
  ],
  [
    luyen(R`Hai xe đi ngược chiều từ hai nơi cách nhau $240$ km, vận tốc $50$ km/giờ và $70$ km/giờ. Sau mấy giờ hai xe gặp nhau?`, R`Sau $2$ giờ hai xe gặp nhau.`, [{ expr: "240/(50+70)", expect: "2" }], R`Mỗi giờ hai xe lại gần nhau $50+70=120$ km, nên thời gian là $240:120=2$ giờ.`),
    luyen(R`Xe máy chạy $45$ km/giờ và ô tô chạy $60$ km/giờ cùng chiều, ô tô ở sau xe máy $90$ km. Sau mấy giờ ô tô đuổi kịp xe máy?`, R`Sau $6$ giờ ô tô đuổi kịp xe máy.`, [{ expr: "90/(60-45)", expect: "6" }], R`Mỗi giờ ô tô lại gần xe máy $60-45=15$ km, nên thời gian là $90:15=6$ giờ.`),
    luyen(R`Hai xe cách nhau $200$ km, đi ngược chiều với vận tốc $40$ km/giờ và $60$ km/giờ. Chỗ hai xe gặp nhau cách nơi xuất phát của xe chậm bao nhiêu ki-lô-mét?`, R`Cách $80$ km.`, [{ expr: "200/(40+60)*40", expect: "80" }], R`Hai xe gặp nhau sau $200:100=2$ giờ, xe chậm đi được $40\times2=80$ km.`),
  ]);

export const lop5BaiToan: GradeChapter = chuong("bai-toan-5", "Chuyển động đều và bài toán lãi lỗ", [
  chuyenDong2,
  bai("lai-lo", "Bài toán về lãi và lỗ",
    R`Lãi bằng giá bán trừ giá vốn khi giá bán lớn hơn giá vốn. Tỉ số phần trăm lãi so với giá vốn bằng tiền lãi chia giá vốn rồi nhân $100$.`,
    [
      vd(R`Một cửa hàng mua áo giá $200$ nghìn đồng và bán giá $250$ nghìn đồng. Lãi bao nhiêu phần trăm so với giá vốn?`,
        [
          buoc(R`Tiền lãi là $250-200=50$ nghìn đồng.`, R`Lãi bằng giá bán trừ giá vốn.`),
          buoc(R`Tỉ số phần trăm lãi là $\frac{50}{200}\times100=25$.`, R`So sánh tiền lãi với giá vốn, rồi nhân $100$ để ra phần trăm.`),
        ],
        R`Cửa hàng lãi $25\%$ so với giá vốn.`,
        [{ expr: "Rational(50,200)*100", expect: "25" }]),
      vd(R`Một người bán hàng lãi $20\%$ so với giá vốn, giá vốn là $150$ nghìn đồng. Giá bán là bao nhiêu nghìn đồng?`,
        [
          buoc(R`Tiền lãi là $150\times20:100=30$ nghìn đồng.`, R`Tiền lãi bằng $20\%$ của giá vốn.`),
          buoc(R`Giá bán là $150+30=180$ nghìn đồng.`, R`Giá bán bằng giá vốn cộng tiền lãi.`),
        ],
        R`Giá bán là $180$ nghìn đồng.`,
        [{ expr: "150*20/100+150", expect: "180" }]),
    ],
    [
      luyen(R`Mua giá $80$ nghìn đồng, bán giá $100$ nghìn đồng. Lãi bao nhiêu phần trăm so với giá vốn?`, R`Lãi $25\%$.`, [{ expr: "(100-80)*100/80", expect: "25" }], R`Tiền lãi là $20$ nghìn đồng, và $\frac{20}{80}=0{,}25$, tức $25\%$.`),
      luyen(R`Giá vốn là $50$ nghìn đồng, bán lãi $30\%$. Giá bán là bao nhiêu nghìn đồng?`, R`Giá bán là $65$ nghìn đồng.`, [{ expr: "50*130/100", expect: "65" }], R`Giá bán bằng $130\%$ giá vốn: $50\times1{,}3=65$.`),
      luyen(R`Một món hàng bán với giá $90$ nghìn đồng thì lỗ $10\%$ so với giá vốn. Giá vốn là bao nhiêu nghìn đồng?`, R`Giá vốn là $100$ nghìn đồng.`, [{ expr: "90/Rational(9,10)", expect: "100" }], R`Giá bán bằng $90\%$ giá vốn nên giá vốn là $90:0{,}9=100$.`),
    ]),
]);

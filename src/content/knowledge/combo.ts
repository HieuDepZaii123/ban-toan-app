import type { TopicKnowledge } from "./types.ts";

const R = String.raw;

export const comboKnowledge: TopicKnowledge = {
  id: "combo",
  tongQuat: {
    la: R`Tổ hợp là nghệ thuật đếm mà không liệt kê: đếm số cách chọn, số cách xếp, số cách làm một việc theo nhiều bước. Thống kê là cách tóm tắt một bộ số liệu bằng vài con số: số đo trung tâm cho biết dữ liệu «quanh đâu», số đo phân tán cho biết dữ liệu «trải rộng thế nào».`,
    dungDe: R`Đếm số mật khẩu, số cách chia nhóm, số cách xếp lịch, và đọc hiểu số liệu của một khảo sát hay một bảng điểm. Trong bài thi, chuyên đề cho bài đếm có điều kiện, bài chọn có hoặc không có thứ tự, nhị thức Newton, và bài tính trung bình, trung vị, tứ phân vị, phương sai.`,
    lienHe: R`Số cách thuận lợi chia cho tổng số cách là xác suất cổ điển ở chuyên đề Xác suất, nên đếm giỏi là điều kiện để làm xác suất tốt. Nhị thức Newton liên hệ với khai triển đa thức, còn thống kê dùng chung ý tưởng trung bình với Bất đẳng thức và Dãy số.`,
  },
  tuDau: [
    R`Bạn có $3$ chiếc áo và $2$ chiếc quần. Hôm nay mặc bộ nào? Cách chắc chắn nhất là viết ra hết: áo $1$ với quần $1$, áo $1$ với quần $2$, áo $2$ với quần $1$, và cứ thế được $6$ bộ. Đếm bằng cách viết ra là cách đúng nhất, nhưng chậm, nên toán học tìm ra những lối tắt để đếm mà không cần viết.`,
    R`Lối tắt đầu tiên là nhận ra cấu trúc: chọn áo xong thì với mỗi áo có $2$ cách chọn quần, nên có $3\cdot 2$ bộ. Từ ý này sinh ra mọi công thức đếm. Xếp $n$ bạn thành hàng: chỗ đầu có $n$ cách, chỗ thứ hai còn $n-1$ cách, và cứ thế. Công thức chỉ là cách ghi gọn của các phép nhân ấy.`,
    R`Phần thống kê cũng khởi đầu từ một nhu cầu đời thường: có một bảng điểm cả lớp, làm sao nói được «lớp học thế nào» chỉ bằng một hai con số? Trung bình cho biết mức chung, độ lệch cho biết cả lớp đồng đều hay chênh lệch nhiều. Mọi công thức ở đây chỉ làm hai việc: gom về một chỗ, hoặc đo độ xa rời chỗ đó.`,
    R`Bạn sẽ thấy hai thuật toán chạy ngay trong trang: một máy liệt kê mọi hoán vị và tổ hợp rồi so với công thức, và tam giác Pascal được sinh ra bằng quy hoạch động chỉ với phép cộng. Hãy dùng chúng để tự kiểm mọi công thức.`,
  ],
  kyHieu: [
    { kh: R`$n!$`, doc: R`Đọc là «n giai thừa»: tích $n\cdot(n-1)\cdots 2\cdot 1$. Chẳng hạn $4!=24$.` },
    { kh: R`$C_n^k$`, doc: R`Số cách chọn $k$ phần tử trong $n$ phần tử mà không kể thứ tự.` },
    { kh: R`$A_n^k$`, doc: R`Số cách chọn $k$ phần tử trong $n$ phần tử rồi xếp thứ tự.` },
    { kh: R`$\sum$`, doc: R`Dấu cộng liên tiếp: viết gọn cho «cộng tất cả các số hạng có dạng này».` },
    { kh: R`$\bar{x}$`, doc: R`Đọc là «x gạch»: số trung bình của dữ liệu.` },
    { kh: R`$s^2$`, doc: R`Phương sai: trung bình của bình phương độ lệch so với số trung bình.` },
    { kh: R`$Q_1,\ Q_2,\ Q_3$`, doc: R`Ba tứ phân vị: chia dữ liệu đã xếp thứ tự thành bốn phần có số phần tử bằng nhau.` },
  ],
  canBiet: [
    R`Phép nhân, phép cộng và cách đọc điều kiện trong một đề toán chữ.`,
    R`Khai triển bình phương và lập phương của một tổng.`,
    R`Sắp xếp một dãy số theo thứ tự tăng dần.`,
  ],
  sections: [
    {
      title: "Quy tắc cộng và quy tắc nhân",
      items: [
        {
          kind: "dinh-ly", title: "Quy tắc cộng",
          text: R`Nếu một công việc làm được theo phương án thứ nhất bằng $m$ cách hoặc theo phương án thứ hai bằng $n$ cách, và hai phương án không có cách nào chung, thì có $m+n$ cách. Dấu hiệu là từ «hoặc».`,
          suy: [
            R`Nếu hai phương án không có cách nào chung thì danh sách các cách gồm hai đoạn rời nhau: đoạn đầu có $m$ cách, đoạn sau có $n$ cách.`,
            R`Đếm toàn bộ danh sách thì lấy độ dài hai đoạn cộng lại: $m+n$. Điều kiện «không có cách chung» là để không đếm một cách hai lần.`,
          ],
        },
        {
          kind: "dinh-ly", title: "Quy tắc nhân",
          text: R`Nếu một công việc gồm hai bước liên tiếp, bước một có $m$ cách và với mỗi cách đó bước hai có $n$ cách, thì có $m\cdot n$ cách. Dấu hiệu là các từ «rồi», «và», «lần lượt».`,
          suy: [
            R`Viết bước một là các hàng, bước hai là các cột của một bảng. Mỗi cách chọn ở bước một ứng với một hàng, và hàng đó có đúng $n$ ô, mỗi ô là một cách chọn ở bước hai.`,
            R`Bảng có $m$ hàng, mỗi hàng $n$ ô, nên có $m\cdot n$ ô. Mỗi ô là một cách hoàn thành công việc, và hai ô khác nhau cho hai cách khác nhau.`,
          ],
        },
        { kind: "cach-lam", title: "Nhận ra cộng hay nhân", text: R`Hỏi: các lựa chọn là phương án thay thế nhau, hay là các bước nối tiếp nhau? Thay thế nhau thì cộng, nối tiếp nhau thì nhân. Một bài thường dùng cả hai: cộng các trường hợp, mỗi trường hợp tính bằng nhân.` },
        { kind: "cach-lam", title: "Đếm có điều kiện", text: R`Chọn trước những vị trí bị ràng buộc, rồi mới đến vị trí còn lại. Với số chẵn, chọn chữ số cuối trước vì nó bị hạn chế. Với số không bắt đầu bằng $0$, chọn chữ số đầu trước.` },
        { kind: "cach-lam", title: "Đếm phần bù", text: R`Khi điều kiện «ít nhất một» khó đếm trực tiếp, lấy tổng số cách trừ đi số cách không thỏa. Ít nhất một nữ nghĩa là tất cả trừ đi trường hợp toàn nam.` },
        { kind: "luu-y", text: R`Quy tắc cộng chỉ đúng khi hai phương án không giao nhau. Nếu có cách thuộc cả hai phương án thì phải trừ phần chung, nếu không sẽ đếm trùng.` },
        { kind: "vi-du", text: R`Từ $A$ đến $B$ có $3$ đường bộ hoặc $2$ đường thủy nên có $3+2=5$ cách đi. Lập số có ba chữ số khác nhau từ $\{1,2,3,4,5\}$ có $5\cdot 4\cdot 3=60$ số. Trong đó số chẵn có chữ số cuối là $2$ hoặc $4$ nên có $2\cdot 4\cdot 3=24$ số.` },
      ],
    },
    {
      title: "Hoán vị, chỉnh hợp và tổ hợp",
      items: [
        {
          kind: "dinh-nghia", title: "Giai thừa",
          text: R`Với số nguyên dương $n$, $n!=n(n-1)\cdots 2\cdot 1$, và quy ước $0!=1$. Giai thừa tăng rất nhanh: $5!=120$ nhưng $10!=3\,628\,800$.`,
          de: R`Giai thừa đếm số cách xếp $n$ vật khác nhau thành một hàng. Tích cứ nhân dần: $n$ chỗ cho vật đầu, rồi $n-1$ chỗ cho vật kế, rồi ít dần đến $1$. Quy ước $0!=1$ vì xếp không vật nào thành hàng có đúng một cách: không làm gì cả.`,
        },
        {
          kind: "cong-thuc", title: "Hoán vị",
          text: R`Số cách xếp $n$ phần tử khác nhau thành một hàng là $P_n=n!$. Vị trí đầu có $n$ cách chọn, vị trí thứ hai còn $n-1$ cách, và cứ thế, theo quy tắc nhân.`,
          suy: [
            R`Chỗ đầu tiên có $n$ cách chọn vật. Chọn xong, chỗ thứ hai còn $n-1$ vật nên có $n-1$ cách, rồi chỗ thứ ba có $n-2$ cách, và cứ thế đến chỗ cuối chỉ còn $1$ cách.`,
            R`Đây là các bước nối tiếp nhau nên theo quy tắc nhân, tổng số cách là $n(n-1)(n-2)\cdots 1=n!$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Chỉnh hợp",
          text: R`Số cách chọn $k$ phần tử từ $n$ phần tử rồi xếp thứ tự là $A_n^k=\frac{n!}{(n-k)!}$. Đây là $n(n-1)\cdots(n-k+1)$, tích của $k$ thừa số.`,
          suy: [
            R`Xếp $k$ chỗ từ $n$ vật: chỗ đầu có $n$ cách, chỗ thứ hai $n-1$ cách, và dừng lại sau $k$ chỗ, chỗ cuối có $n-k+1$ cách.`,
            R`Nhân $k$ thừa số lại được $n(n-1)\cdots(n-k+1)$. Nhân và chia cho $(n-k)!$ để bù phần còn thiếu: tử thành $n!$, nên $A_n^k=\frac{n!}{(n-k)!}$.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Tổ hợp",
          text: R`Số cách chọn $k$ phần tử từ $n$ phần tử mà không kể thứ tự là $C_n^k=\frac{n!}{k!\,(n-k)!}$. Liên hệ với chỉnh hợp: $A_n^k=k!\cdot C_n^k$, vì mỗi nhóm $k$ phần tử xếp được $k!$ thứ tự.`,
          suy: [
            R`Chọn $k$ người có xếp thứ tự thì có $A_n^k$ cách. Nhưng ta chỉ cần nhóm người, không cần thứ tự.`,
            R`Mỗi nhóm $k$ người cố định xếp thành hàng được $k!$ cách, nên trong $A_n^k$ mỗi nhóm bị đếm đúng $k!$ lần. Đếm số nhóm thì chia cho $k!$: $C_n^k=\frac{A_n^k}{k!}=\frac{n!}{k!\,(n-k)!}$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Tính chất của tổ hợp",
          text: R`$C_n^k=C_n^{n-k}$, và $C_n^0=C_n^n=1$. Hệ thức Pascal: $C_n^k+C_n^{k+1}=C_{n+1}^{k+1}$. Chọn $k$ người vào nhóm cũng là chọn $n-k$ người ở ngoài nhóm.`,
          suy: [
            R`Đối xứng: chọn $k$ người vào nhóm đồng nghĩa với chọn $n-k$ người ở ngoài nhóm. Mỗi cách chọn nhóm ứng đúng một cách chọn người ở ngoài, nên $C_n^k=C_n^{n-k}$.`,
            R`Hệ thức Pascal: xét một người cụ thể trong $n+1$ người, khi chọn $k+1$ người thì hoặc có người ấy hoặc không. Có người ấy thì chọn thêm $k$ người trong $n$ người còn lại: $C_n^k$ cách. Không có người ấy thì chọn cả $k+1$ người trong $n$ người còn lại: $C_n^{k+1}$ cách.`,
            R`Cộng hai trường hợp được $C_{n+1}^{k+1}=C_n^k+C_n^{k+1}$. Đó là luật sinh ra tam giác Pascal: mỗi số là tổng hai số phía trên.`,
          ],
        },
        { kind: "cach-lam", title: "Chỉnh hợp hay tổ hợp", text: R`Hỏi một câu: đổi thứ tự các phần tử đã chọn có cho kết quả khác không? Có thì dùng chỉnh hợp, không thì dùng tổ hợp. Chọn một nhóm là tổ hợp, chọn rồi giao các chức vụ khác nhau là chỉnh hợp.` },
        { kind: "luu-y", text: R`Xếp $n$ người quanh một bàn tròn có $(n-1)!$ cách, không phải $n!$, vì các cách xoay vòng được coi là một. Nhớ kiểm đề bài có nói «quanh bàn tròn» hay không.` },
        { kind: "vi-du", text: R`Có $5!=120$ cách xếp $5$ người thành hàng. Từ $5$ người, chọn ban ba người không phân chức có $C_5^3=10$ cách, còn chọn chủ tịch, phó chủ tịch, thư kí có $A_5^3=60$ cách, và đúng $60=3!\cdot 10$.` },
      ],
    },
    {
      title: "Nhị thức Newton",
      items: [
        {
          kind: "cong-thuc", title: "Khai triển",
          text: R`$(a+b)^n=\sum_{k=0}^{n}C_n^k\,a^{n-k}b^k$. Khai triển có $n+1$ số hạng, số mũ của $a$ giảm từ $n$ xuống $0$ còn số mũ của $b$ tăng từ $0$ lên $n$.`,
          suy: [
            R`Viết $(a+b)^n=(a+b)(a+b)\cdots(a+b)$ với $n$ ngoặc. Phá ngoặc là chọn trong mỗi ngoặc một trong hai chữ $a$ hoặc $b$ rồi nhân lại.`,
            R`Mỗi cách chọn cho một số hạng dạng $a^{n-k}b^k$, trong đó $k$ là số ngoặc đã chọn $b$. Số cách chọn đúng $k$ ngoặc trong $n$ ngoặc để lấy $b$ là $C_n^k$.`,
            R`Gom các số hạng giống nhau lại: số hạng $a^{n-k}b^k$ xuất hiện $C_n^k$ lần, nên hệ số của nó là $C_n^k$. Cộng theo $k$ từ $0$ đến $n$ được công thức.`,
          ],
        },
        {
          kind: "cong-thuc", title: "Số hạng tổng quát",
          text: R`Số hạng thứ $k+1$ là $T_{k+1}=C_n^k\,a^{n-k}b^k$. Chỉ số $k$ bắt đầu từ $0$, nên số hạng đầu tiên ứng với $k=0$.`,
          suy: [
            R`Theo khai triển, số hạng ứng với $k$ ngoặc đã chọn $b$ là $C_n^k\,a^{n-k}b^k$.`,
            R`Khi $k$ chạy từ $0$ thì số hạng đầu tiên ứng với $k=0$. Vì vậy số hạng đứng thứ $k+1$ mới ứng với chỉ số $k$, và $T_{k+1}=C_n^k\,a^{n-k}b^k$.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Tổng hệ số",
          text: R`Thay $a=b=1$ được $\sum_{k=0}^{n}C_n^k=2^n$, tức tổng các hệ số của $(1+x)^n$ là $2^n$. Thay $a=1$, $b=-1$ thì tổng đan dấu bằng $0$.`,
          suy: [
            R`Công thức $(a+b)^n=\sum C_n^k\,a^{n-k}b^k$ đúng với mọi $a$ và $b$. Thay $a=b=1$ thì mọi lũy thừa $a^{n-k}b^k$ đều bằng $1$.`,
            R`Vế trái là $2^n$, vế phải là tổng các hệ số $\sum C_n^k$. Vậy tổng các hệ số bằng $2^n$.`,
            R`Thay $a=1$ và $b=-1$ thì vế trái là $0^n=0$, còn vế phải là tổng đan dấu của các hệ số, nên tổng đan dấu bằng $0$.`,
          ],
        },
        { kind: "cach-lam", title: "Tam giác Pascal", text: R`Hệ số của $(a+b)^n$ là hàng thứ $n$ của tam giác Pascal, mỗi số là tổng hai số phía trên. Hàng $3$ là $1,3,3,1$ và hàng $4$ là $1,4,6,4,1$.` },
        { kind: "cach-lam", title: "Tìm hệ số của một lũy thừa", text: R`Viết số hạng tổng quát, cho số mũ của $x$ bằng số cần tìm rồi giải ra $k$, sau đó tính hệ số. Phải kiểm $k$ là số nguyên trong $[0;n]$, nếu không thì hệ số bằng $0$.` },
        { kind: "luu-y", text: R`Khi nhị thức có dấu trừ, như $(a-b)^n$, các số hạng đan dấu và phải viết $b$ là $-b$ khi thay vào công thức. Quên dấu là lỗi hay gặp.` },
        { kind: "vi-du", text: R`Trong $(x+2)^4$, hệ số của $x^2$ là $C_4^2\cdot 2^2=24$. Tổng các hệ số của $(1+x)^5$ là $2^5=32$. Khai triển $(2x-1)^3=8x^3-12x^2+6x-1$.` },
      ],
    },
    {
      title: "Số đo trung tâm của dữ liệu",
      items: [
        {
          kind: "cong-thuc", title: "Số trung bình",
          text: R`Với dữ liệu $x_1,\dots,x_n$ thì $\bar{x}=\frac{x_1+x_2+\dots+x_n}{n}$. Nếu giá trị $x_i$ xuất hiện $n_i$ lần thì $\bar{x}=\frac{\sum n_ix_i}{n}$ với $n$ là tổng số lần.`,
          suy: [
            R`Chia đều: gom mọi giá trị lại rồi chia cho đều $n$ người, mỗi người nhận $\frac{x_1+\dots+x_n}{n}$. Số đó là mức chung nếu mọi người cùng nhận như nhau.`,
            R`Khi giá trị $x_i$ xuất hiện $n_i$ lần, cộng $x_i$ lại $n_i$ lần cho $n_ix_i$. Tổng cả lớp là $\sum n_ix_i$, chia cho tổng số lần $n$ được $\bar{x}=\frac{\sum n_ix_i}{n}$.`,
          ],
        },
        {
          kind: "dinh-nghia", title: "Trung vị và mốt",
          text: R`Trung vị là giá trị ở giữa sau khi sắp xếp dữ liệu tăng dần: với $n$ lẻ là số hạng chính giữa, với $n$ chẵn là trung bình của hai số hạng chính giữa. Mốt là giá trị xuất hiện nhiều nhất.`,
          de: R`Trung vị là người đứng giữa khi cả lớp xếp hàng theo điểm từ thấp đến cao: một nửa lớp điểm thấp hơn, nửa còn lại cao hơn. Mốt là điểm xuất hiện nhiều nhất, tức điểm «đông khách» nhất. Trung bình có thể không trùng với điểm của ai; trung vị và mốt thì luôn là giá trị có thật.`,
        },
        {
          kind: "tinh-chat", title: "Giá trị ngoại lai",
          text: R`Số trung bình bị kéo mạnh bởi một giá trị rất lớn hoặc rất nhỏ, còn trung vị gần như không đổi. Vì vậy với dữ liệu lệch, như thu nhập, trung vị phản ánh «người điển hình» tốt hơn.`,
          suy: [
            R`Trung bình cộng mọi giá trị, nên một giá trị rất lớn làm tổng vọt lên. Dữ liệu $1,2,3,4,100$ có trung bình $\frac{110}{5}=22$, xa mọi giá trị trừ giá trị lớn nhất.`,
            R`Trung vị chỉ phụ thuộc vị trí đứng giữa. Dữ liệu trên có trung vị $3$; thay $100$ thành $1000$ thì trung vị vẫn bằng $3$, vì người đứng giữa vẫn là người đó.`,
          ],
        },
        { kind: "luu-y", text: R`Phải sắp xếp dữ liệu trước khi lấy trung vị. Lấy phần tử giữa của dãy chưa sắp xếp là lỗi hay gặp.` },
        { kind: "vi-du", text: R`Dãy $6,7,7,8$ có trung bình $\frac{28}{4}=7$, trung vị $\frac{7+7}{2}=7$ và mốt $7$. Thêm một giá trị $40$ vào dãy, trung bình thành $\frac{68}{5}=13{,}6$ nhưng trung vị vẫn là $7$.` },
        { kind: "vi-du", text: R`Điểm $5$, $7$, $9$ với số học sinh lần lượt là $2$, $3$, $5$ có điểm trung bình $\frac{2\cdot 5+3\cdot 7+5\cdot 9}{10}=7{,}6$. Mốt là điểm $9$ vì có nhiều học sinh nhất.` },
      ],
    },
    {
      title: "Số đo độ phân tán",
      items: [
        {
          kind: "dinh-nghia", title: "Khoảng biến thiên và tứ phân vị",
          text: R`Khoảng biến thiên là $R=x_{\max}-x_{\min}$. Ba tứ phân vị $Q_1,Q_2,Q_3$ chia dữ liệu đã sắp xếp thành bốn phần có số phần tử bằng nhau, và $Q_2$ chính là trung vị. Khoảng tứ phân vị là $\Delta_Q=Q_3-Q_1$.`,
          de: R`Khoảng biến thiên là độ rộng toàn bộ dữ liệu, từ người thấp nhất tới người cao nhất. Tứ phân vị cắt hàng người đã xếp thành bốn đoạn có số người bằng nhau. Khoảng tứ phân vị là độ rộng của nửa giữa, nên không bị hai đầu mút bất thường làm lệch.`,
        },
        { kind: "cach-lam", title: "Cách tìm tứ phân vị", text: R`Tìm $Q_2$ là trung vị của cả dãy. Tìm $Q_1$ là trung vị của nửa dưới và $Q_3$ là trung vị của nửa trên, và khi $n$ lẻ thì không đưa $Q_2$ vào hai nửa.` },
        {
          kind: "cong-thuc", title: "Phương sai và độ lệch chuẩn",
          text: R`Phương sai là $s^2=\frac{1}{n}\sum(x_i-\bar{x})^2=\overline{x^2}-\bar{x}^2$ và độ lệch chuẩn là $s=\sqrt{s^2}$. Hai số này càng lớn thì dữ liệu càng phân tán quanh trung bình.`,
          suy: [
            R`Muốn đo mức dàn trải ta đo mỗi giá trị lệch bao xa khỏi trung bình: $x_i-\bar{x}$. Cộng thẳng các độ lệch thì số dương và số âm triệt tiêu và luôn ra $0$, nên phải bình phương trước khi lấy trung bình.`,
            R`Khai triển: $\frac{1}{n}\sum(x_i-\bar{x})^2=\frac{1}{n}\sum x_i^2-2\bar{x}\cdot\frac{1}{n}\sum x_i+\bar{x}^2$. Vì $\frac{1}{n}\sum x_i=\bar{x}$ nên còn $\overline{x^2}-2\bar{x}^2+\bar{x}^2=\overline{x^2}-\bar{x}^2$.`,
            R`Phương sai tính theo bình phương nên đơn vị cũng bị bình phương; lấy căn để trở về đơn vị gốc, đó là độ lệch chuẩn.`,
          ],
        },
        {
          kind: "tinh-chat", title: "Khi biến đổi dữ liệu",
          text: R`Cộng cùng một số $c$ vào mọi giá trị thì trung bình tăng $c$ còn phương sai không đổi. Nhân mọi giá trị với $k$ thì trung bình nhân $k$ còn phương sai nhân $k^2$.`,
          suy: [
            R`Cộng $c$ vào mọi giá trị: trung bình mới là $\bar{x}+c$, nên mỗi độ lệch $(x_i+c)-(\bar{x}+c)=x_i-\bar{x}$ không đổi. Vậy phương sai không đổi: dời cả đàn đi cùng một đoạn không làm đàn dàn ra hay co lại.`,
            R`Nhân mọi giá trị với $k$: trung bình thành $k\bar{x}$ và mỗi độ lệch thành $k(x_i-\bar{x})$. Bình phương độ lệch thì thừa số $k^2$ ra ngoài, nên phương sai nhân $k^2$.`,
          ],
        },
        { kind: "cach-lam", title: "Nhận ra giá trị bất thường", text: R`Một giá trị là bất thường nếu nằm ngoài khoảng $\left[Q_1-1{,}5\Delta_Q;\ Q_3+1{,}5\Delta_Q\right]$. Quy ước này không phụ thuộc vào số trung bình nên ổn định hơn.` },
        { kind: "luu-y", text: R`Phương sai có đơn vị là bình phương đơn vị của dữ liệu, còn độ lệch chuẩn có cùng đơn vị với dữ liệu. Khi so với dữ liệu gốc, dùng độ lệch chuẩn.` },
        { kind: "vi-du", text: R`Dãy $2,4,4,4,5,5,7,9$ có trung bình $5$ và $s^2=\frac{9+3+0+4+16}{8}=4$, nên $s=2$. Dãy $1,2,\dots,8$ có $Q_2=4{,}5$, $Q_1=\frac{2+3}{2}=2{,}5$, $Q_3=\frac{6+7}{2}=6{,}5$ và $\Delta_Q=4$.` },
      ],
    },
  ],
  canNho: [
    R`Quy tắc cộng cho các phương án thay thế nhau, quy tắc nhân cho các bước nối tiếp nhau.`,
    R`Hoán vị $n!$; chỉnh hợp $A_n^k=\frac{n!}{(n-k)!}$ có kể thứ tự; tổ hợp $C_n^k=\frac{n!}{k!(n-k)!}$ không kể thứ tự.`,
    R`Liên hệ $A_n^k=k!\,C_n^k$ và $C_n^k=C_n^{n-k}$.`,
    R`Nhị thức Newton: $T_{k+1}=C_n^k\,a^{n-k}b^k$ với $k$ chạy từ $0$ đến $n$; tổng hệ số của $(1+x)^n$ là $2^n$.`,
    R`Điều kiện «ít nhất một»: lấy tổng trừ phần bù.`,
    R`Số trung bình bị giá trị ngoại lai kéo, trung vị thì bền hơn; phải sắp xếp trước khi lấy trung vị.`,
    R`Tứ phân vị: $Q_2$ là trung vị, $Q_1$ và $Q_3$ là trung vị của hai nửa; $\Delta_Q=Q_3-Q_1$.`,
    R`Phương sai $s^2=\frac{1}{n}\sum(x_i-\bar{x})^2$ và độ lệch chuẩn $s=\sqrt{s^2}$.`,
  ],
  lienQuan: [
    { id: "probability", vi: R`Xác suất cổ điển là số cách thuận lợi chia cho tổng số cách, và cả hai số đều đếm bằng tổ hợp.` },
    { id: "ineq", vi: R`Trung bình cộng và các loại trung bình khác được so sánh bằng bất đẳng thức Cauchy.` },
    { id: "sequence", vi: R`Số trung bình của cấp số cộng chính là trung bình cộng của số hạng đầu và số hạng cuối.` },
  ],
  checks: [
    { expr: "5*4*3", expect: "60" },
    { expr: "2*4*3", expect: "24" },
    { expr: "factorial(5)", expect: "120" },
    { expr: "factorial(10)", expect: "3628800" },
    { expr: "binomial(5,3)", expect: "10" },
    { expr: "factorial(5)/factorial(2)", expect: "60" },
    { expr: "factorial(3)*binomial(5,3)", expect: "60" },
    { expr: "binomial(5,2)+binomial(5,3)", expect: "binomial(6,3)" },
    { expr: "binomial(7,2)", expect: "binomial(7,5)" },
    { expr: "expand((x+y)**4)", expect: "x**4+4*x**3*y+6*x**2*y**2+4*x*y**3+y**4" },
    { expr: "expand((x+2)**4).coeff(x,2)", expect: "24" },
    { expr: "binomial(4,2)*2**2", expect: "24" },
    { expr: "(1+1)**5", expect: "32" },
    { expr: "expand((2*x-1)**3)", expect: "8*x**3-12*x**2+6*x-1" },
    { expr: "binomial(10,3)-binomial(6,3)", expect: "100" },
    { expr: "factorial(4)*2", expect: "48" },
    { expr: "factorial(5)-48", expect: "72" },
    { expr: "Rational(6+7+7+8,4)", expect: "7" },
    { expr: "Rational(7+7,2)", expect: "7" },
    { expr: "Rational(6+7+7+8+40,5)", expect: "Rational(68,5)" },
    { expr: "Rational(2*5+3*7+5*9,10)", expect: "Rational(38,5)" },
    { expr: "Rational((2-5)**2+3*(4-5)**2+2*(5-5)**2+(7-5)**2+(9-5)**2,8)", expect: "4" },
    { expr: "sqrt(4)", expect: "2" },
    { expr: "Rational(4+5,2)", expect: "Rational(9,2)" },
    { expr: "Rational(2+3,2)", expect: "Rational(5,2)" },
    { expr: "Rational(6+7,2)", expect: "Rational(13,2)" },
    { expr: "Rational(13,2)-Rational(5,2)", expect: "4" },
  ],
};

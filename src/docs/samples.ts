export type DocBand = "tieu-hoc" | "thcs" | "thpt";

export type DocSample = {
  id: string;
  band: DocBand;
  grade: string;
  title: string;
  body: string;
};

const R = String.raw;

/** Mẫu tĩnh. Chọn mẫu thì đổ vào ô soạn; không lấy từ dữ liệu bài học. */
export const docSamples: readonly DocSample[] = [
  {
    id: "phieu-cong-lop1",
    band: "tieu-hoc",
    grade: "Lớp 1",
    title: "Phiếu cộng trong phạm vi 10",
    body: R`# Phiếu cộng trong phạm vi 10

## Việc hôm nay
Cộng hai số, mỗi số không quá $10$, tổng cũng không quá $10$.

Ví dụ: $3+4=7$. Đếm thêm $4$ từ $3$: $4,5,6,7$.

## Luyện
1. $2+5=$
2. $6+3=$
3. $9-4=$

Đáp số để tự kiểm: $7$, $9$ và $5$.`,
  },
  {
    id: "phieu-nhan-lop2",
    band: "tieu-hoc",
    grade: "Lớp 2",
    title: "Phiếu bảng nhân 8",
    body: R`# Phiếu bảng nhân 8

$8$ là $4$ nhóm đôi, hoặc $8$ nhóm $1$.

$$8\times 7=56$$

Cách đếm: $8,16,24,32,40,48,56$. Bảy lần.

## Luyện
$8\times 4=32$. $8\times 9=72$.`,
  },
  {
    id: "phieu-nhan-lop3",
    band: "tieu-hoc",
    grade: "Lớp 3",
    title: "Phiếu nhân số có hai chữ số",
    body: R`# Phiếu nhân số có hai chữ số

Tính $23\times 4$.

Hàng đơn vị: $3\times 4=12$, viết $2$ nhớ $1$.
Hàng chục: $2\times 4+1=9$.

$$23\times 4=92$$

## Luyện
$15\times 3=45$. Nhớ ở hàng đơn vị là $1$, hàng chục là $3+1=4$.`,
  },
  {
    id: "phieu-phan-so-lop4",
    band: "tieu-hoc",
    grade: "Lớp 4",
    title: "Phiếu cộng phân số cùng mẫu và khác mẫu",
    body: R`# Phiếu cộng phân số

Cùng mẫu thì cộng tử:

$$\frac{1}{4}+\frac{2}{4}=\frac{3}{4}$$

Khác mẫu: đưa về mẫu $4$.

$$\frac{1}{2}+\frac{1}{4}=\frac{2}{4}+\frac{1}{4}=\frac{3}{4}$$

## Luyện
$\frac{1}{3}+\frac{1}{6}=\frac{1}{2}$.`,
  },
  {
    id: "de-thap-phan-lop5",
    band: "tieu-hoc",
    grade: "Lớp 5",
    title: "Đề 15 phút số thập phân và phần trăm",
    body: R`# Đề 15 phút — số thập phân

1. $2{,}5\times 4=10$.
2. $20\%$ của $80$ là $16$, vì $80\times 0{,}2=16$.
3. $3{,}5+1{,}25=4{,}75$.

## Đáp án ngắn
$10$; $16$; $4{,}75$.`,
  },
  {
    id: "giao-an-so-tu-nhien-lop6",
    band: "thcs",
    grade: "Lớp 6",
    title: "Giáo án Số tự nhiên lớp 6",
    body: R`# Giáo án: Số tự nhiên

## Mục tiêu
Biết ước chung lớn nhất của hai số và nhận ra số nguyên tố nhỏ.

## Ví dụ
Ước của $12$: $1,2,3,4,6,12$.
Ước của $18$: $1,2,3,6,9,18$.

Ước chung lớn nhất là $6$.

Số nguyên tố không quá $10$: $2,3,5,7$. Số $1$ không phải số nguyên tố. Số $9=3\times 3$ cũng không phải.

## Luyện
ƯCLN$(8,12)=4$.`,
  },
  {
    id: "phieu-ti-le-thuc-lop7",
    band: "thcs",
    grade: "Lớp 7",
    title: "Phiếu tỉ lệ thức",
    body: R`# Phiếu tỉ lệ thức

Bốn số $a,b,c,d$ lập thành tỉ lệ thức khi

$$\frac{a}{b}=\frac{c}{d}\quad (b\neq 0,\ d\neq 0)$$

khi và chỉ khi $ad=bc$.

Ví dụ: $\frac{2}{3}=\frac{4}{6}$ vì $2\times 6=12$ và $3\times 4=12$.

## Luyện
$\frac{3}{5}=\frac{x}{20}$ thì $5x=60$, nên $x=12$.`,
  },
  {
    id: "giao-an-hang-dang-thuc-lop8",
    band: "thcs",
    grade: "Lớp 8",
    title: "Giáo án hằng đẳng thức",
    body: R`# Giáo án: Bình phương của tổng

$$(a+b)^2=a^2+2ab+b^2$$

Ví dụ $a=10$, $b=3$:

$$(10+3)^2=100+60+9=169$$

và $13^2=169$.

Hiệu: $(10-3)^2=100-60+9=49$.

## Luyện
$(8-3)^2=25$.`,
  },
  {
    id: "de-can-lop9",
    band: "thcs",
    grade: "Lớp 9",
    title: "Đề 15 phút căn bậc hai",
    body: R`# Đề 15 phút — căn bậc hai

1. $\sqrt{49}=7$, vì $7^2=49$.
2. $\sqrt{12}=\sqrt{4\times 3}=2\sqrt{3}$.
3. $\sqrt{2{,}25}=1{,}5$, vì $1{,}5^2=2{,}25$.

## Không nhầm
$\sqrt{9+16}=\sqrt{25}=5$, không bằng $\sqrt{9}+\sqrt{16}=7$.`,
  },
  {
    id: "de-ham-bac-hai",
    band: "thpt",
    grade: "THPT",
    title: "Đề 15 phút hàm bậc hai",
    body: R`# Đề 15 phút — hàm số bậc hai

Cho $y=x^2-5x+6$.

1. $\Delta=25-24=1$.
2. Nghiệm $x=\dfrac{5\pm 1}{2}$, tức $x=2$ và $x=3$.
3. Đỉnh $x=-\dfrac{b}{2a}=\dfrac{5}{2}$, tung độ $y=\dfrac{25}{4}- \dfrac{25}{2}+6=-\dfrac{1}{4}$.

## Kiểm
$y(2)=0$ và $y(3)=0$.`,
  },
  {
    id: "phieu-dao-ham",
    band: "thpt",
    grade: "THPT",
    title: "Phiếu đạo hàm của $x^2$",
    body: R`# Phiếu đạo hàm

$(x^2)'=2x$.

Tại $x=3$: $f'(3)=6$. Đó là hệ số góc của tiếp tuyến.

Cát tuyến từ $2$ đến $2+h$:

$$\frac{(2+h)^2-4}{h}=4+h$$

Cho $h\to 0$ thì hệ số góc về $4$, đúng bằng $f'(2)$.`,
  },
  {
    id: "phieu-xac-suat",
    band: "thpt",
    grade: "THPT",
    title: "Phiếu xác suất có điều kiện",
    body: R`# Phiếu xác suất có điều kiện

Hai xúc xắc phân biệt. Biết có ít nhất một mặt $6$.

Không có mặt $6$: $5\times 5=25$ cặp.
Còn lại: $36-25=11$ cặp.
Chỉ một cặp là $(6;6)$.

$$P=\frac{1}{11}$$

Chia cho $36$ là dùng mẫu lúc chưa biết điều kiện.`,
  },
];

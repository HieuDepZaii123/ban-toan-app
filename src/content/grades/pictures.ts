/**
 * Hình minh họa riêng cho từng bài lớp 1–3, vẽ đúng số liệu trong ví dụ của bài.
 * `alt` là lời tả cho trình đọc màn hình. Khóa là "<lớp>/<mã bài>".
 */
export type Tone = "red" | "orange" | "green" | "blue" | "purple";

export type Picture =
  | { k: "groups"; items: { n: number; tone: Tone; gone?: number }[]; op?: "+" | "-"; alt: string }
  | { k: "rows"; rows: { n: number; tone: Tone; name: string }[]; alt: string }
  | { k: "place"; numbers: number[]; alt: string }
  | { k: "clock"; h: number; m: number; alt: string }
  | { k: "ruler"; marks: { cm: number; tone: Tone; name: string }[]; max: number; alt: string }
  | { k: "bars"; values: number[]; labels: string[]; unit?: string; alt: string }
  | { k: "array"; rows: number; cols: number; alt: string }
  | { k: "share"; total: number; groups: number; alt: string }
  | { k: "grid"; w: number; h: number; unit: string; outline?: boolean; alt: string }
  | { k: "path"; lengths: number[]; unit: string; alt: string }
  | { k: "circle"; r: number; unit: string; alt: string }
  | { k: "shapes"; alt: string }
  | { k: "solids"; alt: string }
  | { k: "parts"; parts: number[]; alt: string }
  | { k: "line"; from: number; to: number; step: number; marks: { at: number; name: string }[]; alt: string }
  | { k: "calendar"; days: number; past: number; alt: string }
  | { k: "tiles"; items: { top: string; bottom: string }[]; alt: string };

export const pictures: Record<string, Picture> = {
  // Lớp 1
  "1/dem-10": { k: "groups", items: [{ n: 4, tone: "orange" }, { n: 1, tone: "green" }], op: "+", alt: "Bốn ngôi sao cam và một ngôi sao xanh: đếm được năm." },
  "1/so-0": { k: "groups", items: [{ n: 3, tone: "red", gone: 3 }], op: "-", alt: "Ba quả táo đều bị gạch đi: còn không quả nào." },
  "1/tach-gop": { k: "groups", items: [{ n: 2, tone: "purple" }, { n: 3, tone: "blue" }], alt: "Năm cái kẹo tách thành hai cái và ba cái." },
  "1/so-sanh": { k: "rows", rows: [{ n: 8, tone: "orange", name: "8" }, { n: 5, tone: "blue", name: "5" }], alt: "Hàng trên tám chấm, hàng dưới năm chấm; hàng trên thừa ba chấm nên tám lớn hơn năm." },
  "1/cong-10": { k: "groups", items: [{ n: 3, tone: "orange" }, { n: 2, tone: "orange" }], op: "+", alt: "Ba quả cam thêm hai quả cam được năm quả." },
  "1/tru-10": { k: "groups", items: [{ n: 7, tone: "blue", gone: 3 }], op: "-", alt: "Bảy viên bi, gạch đi ba viên, còn bốn viên." },
  "1/chuc": { k: "place", numbers: [34], alt: "Số ba mươi tư: ba bó chục và bốn que lẻ." },
  "1/so-sanh-chuc": { k: "place", numbers: [46, 38], alt: "Bốn mươi sáu có bốn bó chục, ba mươi tám có ba bó chục." },
  "1/cong-khong-nho": { k: "place", numbers: [42, 35], alt: "Bốn mươi hai và ba mươi lăm biểu diễn bằng bó chục và que lẻ." },
  "1/tru-khong-nho": { k: "place", numbers: [57, 24], alt: "Năm mươi bảy và hai mươi tư biểu diễn bằng bó chục và que lẻ." },
  "1/hinh-quen": { k: "shapes", alt: "Một hình tròn, một hình tam giác, một hình vuông và một hình chữ nhật." },
  "1/do-cm": { k: "ruler", max: 15, marks: [{ cm: 12, tone: "orange", name: "bút chì" }, { cm: 3, tone: "purple", name: "cục tẩy" }], alt: "Thước kẻ: bút chì dài mười hai xentimét, cục tẩy dài ba xentimét." },
  "1/xem-gio": { k: "clock", h: 3, m: 0, alt: "Đồng hồ chỉ ba giờ đúng: kim ngắn chỉ số ba, kim dài chỉ số mười hai." },
  "1/xem-lich": { k: "calendar", days: 31, past: 10, alt: "Tờ lịch tháng có ba mươi mốt ngày, mười ngày đầu đã qua được tô màu." },

  // Lớp 2
  "2/cong-nho": { k: "place", numbers: [27, 15], alt: "Hai mươi bảy và mười lăm; bảy cộng năm que lẻ được mười hai, đủ một bó chục mới." },
  "2/tru-nho": { k: "place", numbers: [42, 15], alt: "Bốn mươi hai và mười lăm; hàng đơn vị không đủ nên tháo một bó chục." },
  "2/bang-nhan": { k: "array", rows: 4, cols: 5, alt: "Bốn hàng, mỗi hàng năm chấm: năm nhân bốn bằng hai mươi." },
  "2/bang-chia": { k: "share", total: 20, groups: 4, alt: "Hai mươi cái kẹo chia đều vào bốn nhóm, mỗi nhóm năm cái." },
  "2/chia-2-5": { k: "share", total: 35, groups: 5, alt: "Ba mươi lăm quyển vở xếp đều vào năm ngăn, mỗi ngăn bảy quyển." },
  "2/tram": { k: "place", numbers: [246], alt: "Số hai trăm bốn mươi sáu: hai tấm trăm, bốn bó chục và sáu que lẻ." },
  "2/so-sanh-tram": { k: "place", numbers: [305, 350], alt: "Ba trăm linh năm và ba trăm năm mươi; hàng trăm bằng nhau, hàng chục khác nhau." },
  "2/cong-tru-1000": { k: "place", numbers: [358, 127], alt: "Ba trăm năm mươi tám và một trăm hai mươi bảy biểu diễn theo hàng." },
  "2/gap-khuc": { k: "path", lengths: [4, 5, 6], unit: "cm", alt: "Đường gấp khúc gồm ba đoạn dài bốn, năm và sáu xentimét." },
  "2/met-cm": { k: "ruler", max: 100, marks: [{ cm: 100, tone: "green", name: "1 m" }], alt: "Thước một mét chia thành một trăm xentimét." },
  "2/kg-lit": { k: "bars", values: [5, 2], labels: ["Gạo", "Đường"], unit: "kg", alt: "Túi gạo năm kilôgam và túi đường hai kilôgam." },
  "2/gio-phut": { k: "clock", h: 8, m: 30, alt: "Đồng hồ chỉ tám giờ rưỡi: kim dài chỉ số sáu." },
  "2/hinh-khoi": { k: "solids", alt: "Một khối trụ như hộp sữa, một khối cầu như quả bóng, và một hình tứ giác." },
  "2/bieu-do-tranh": { k: "rows", rows: [{ n: 6, tone: "red", name: "Táo" }, { n: 4, tone: "orange", name: "Cam" }], alt: "Biểu đồ tranh: sáu quả táo và bốn quả cam." },

  // Lớp 3
  "3/doc-100000": { k: "tiles", items: [{ top: "Chục nghìn", bottom: "4" }, { top: "Nghìn", bottom: "5" }, { top: "Trăm", bottom: "0" }, { top: "Chục", bottom: "3" }, { top: "Đơn vị", bottom: "2" }], alt: "Bảng hàng của số bốn mươi lăm nghìn không trăm ba mươi hai." },
  "3/lam-tron-3": { k: "line", from: 40, to: 50, step: 1, marks: [{ at: 46, name: "46" }], alt: "Trục số từ bốn mươi đến năm mươi; bốn mươi sáu nằm gần năm mươi hơn." },
  "3/so-la-ma": { k: "tiles", items: [{ top: "I", bottom: "1" }, { top: "V", bottom: "5" }, { top: "X", bottom: "10" }, { top: "IV", bottom: "4" }, { top: "XII", bottom: "12" }], alt: "Các chữ số La Mã I, V, X và hai ví dụ IV bằng bốn, XII bằng mười hai." },
  "3/nhan-hai-chu": { k: "array", rows: 4, cols: 23, alt: "Bốn hàng, mỗi hàng hai mươi ba chấm: hai mươi ba nhân bốn." },
  "3/chia-du": { k: "share", total: 17, groups: 5, alt: "Mười bảy cái kẹo chia cho năm bạn, mỗi bạn ba cái, còn thừa hai cái." },
  "3/bang-nhan-3-9": { k: "array", rows: 7, cols: 6, alt: "Bảy hàng, mỗi hàng sáu chấm: sáu nhân bảy bằng bốn mươi hai." },
  "3/chia-ba-chu": { k: "tiles", items: [{ top: "Trăm", bottom: "9" }, { top: "Chục", bottom: "3" }, { top: "Đơn vị", bottom: "6" }], alt: "Số chín trăm ba mươi sáu chia theo từng hàng." },
  "3/phan-nho": { k: "parts", parts: [2, 3, 4], alt: "Ba hình tròn chia thành hai, ba và bốn phần bằng nhau, mỗi hình tô một phần." },
  "3/phan-lon": { k: "parts", parts: [5, 9], alt: "Hai hình tròn chia thành năm và chín phần bằng nhau; một phần chín nhỏ hơn một phần năm." },
  "3/don-vi-do": { k: "tiles", items: [{ top: "1 m", bottom: "10 dm" }, { top: "1 dm", bottom: "10 cm" }, { top: "1 m", bottom: "100 cm" }], alt: "Một mét bằng mười đềximét, một đềximét bằng mười xentimét, một mét bằng một trăm xentimét." },
  "3/chu-vi-3": { k: "grid", w: 5, h: 3, unit: "cm", outline: true, alt: "Hình chữ nhật dài năm, rộng ba xentimét; đường viền quanh hình là chu vi." },
  "3/trung-diem": { k: "line", from: 0, to: 8, step: 1, marks: [{ at: 0, name: "A" }, { at: 4, name: "M" }, { at: 8, name: "B" }], alt: "Đoạn thẳng AB dài tám xentimét, trung điểm M cách mỗi đầu bốn xentimét." },
  "3/hinh-tron-3": { k: "circle", r: 5, unit: "cm", alt: "Hình tròn tâm O, bán kính năm xentimét, đường kính mười xentimét." },
  "3/bang-so-lieu": { k: "bars", values: [20, 25, 30], labels: ["Lớp A", "Lớp B", "Lớp C"], unit: "bạn", alt: "Ba lớp có hai mươi, hai mươi lăm và ba mươi bạn." },
  "3/chan-chan": { k: "groups", items: [{ n: 5, tone: "red" }], alt: "Túi có năm viên bi, viên nào cũng màu đỏ." },
  "3/so-kha-nang": { k: "groups", items: [{ n: 4, tone: "red" }, { n: 1, tone: "blue" }], alt: "Túi có bốn bi đỏ và một bi xanh." },
  "3/dien-tich-3": { k: "grid", w: 5, h: 3, unit: "cm", alt: "Hình chữ nhật năm nhân ba ô vuông, mỗi ô một xentimét vuông." },
  "3/gam-ml": { k: "bars", values: [500, 500], labels: ["Gói 1", "Gói 2"], unit: "g", alt: "Hai gói đường, mỗi gói năm trăm gam, cộng lại một kilôgam." },
};

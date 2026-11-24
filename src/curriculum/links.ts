/**
 * Gắn nội dung vào trục chương trình (spine.ts). Mỗi mục là mã chương trong sách lớp đó.
 * Thêm nội dung mới thì phải thêm dòng ở đây; scripts/spine.test.ts báo thiếu, lệch lớp và thiếu độ phủ.
 */
import { nodeId, type Strand } from "./spine.ts";

/** Chương của từng dạng bài, theo thứ tự trong src/content/grades/dang/lopNN.ts (10 đến 12 dạng mỗi lớp). */
export const DANG_CHAPTER: Record<number, string[]> = {
  1: ["so-10", "so-10", "cong-tru", "cong-tru", "cong-tru", "cong-tru", "so-100", "so-100", "so-100", "do-xem"],
  2: ["cong-tru", "cong-tru", "nhan", "nhan", "den-1000", "den-1000", "do-dai", "do-dai", "do-luong-2", "hinh-so-lieu-2"],
  3: ["nhan-chia", "nhan-chia", "nhan-chia", "so-100000", "mot-phan", "do", "dien-tich-khoi-luong-3", "do", "nhan-chia", "kha-nang"],
  4: ["lop-trieu", "phan-so", "phan-so", "phan-so", "thong-ke-4", "bon-phep-tinh", "bon-phep-tinh", "bon-phep-tinh", "goc-duong", "thong-ke-4"],
  5: ["thap-phan", "thap-phan", "phan-tram", "phan-tram", "dien-tich", "dien-tich", "the-tich", "ti-so", "giai-toan-5", "giai-toan-5", "bieu-do-5"],
  6: ["so-tu-nhien", "so-tu-nhien", "chia-het", "chia-het", "so-nguyen", "phan-so", "ti-so-pt", "thap-phan", "hinh", "tk-xs-6"],
  7: ["huu-ti", "huu-ti", "ti-le", "ti-le", "dai-so", "dai-so", "tam-giac", "tam-giac", "goc-song-song", "hinh-khoi-7", "thong-ke"],
  8: ["dang-thuc", "dang-thuc", "dang-thuc", "dang-thuc", "pt-ham", "pt-ham", "pt-ham", "tam-giac", "thales", "tu-giac", "xac-suat-8"],
  9: ["can", "can", "he-pt", "he-pt", "pt-b2", "bpt", "ham-b2", "lg-vuong", "tron", "khoi", "tan-so"],
  10: ["menh-de", "bpt-hai-an", "ham-bac-hai", "ham-bac-hai", "ham-bac-hai", "luong-giac", "vecto", "toa-do", "toa-do", "to-hop", "thong-ke", "ham-so-10"],
  11: ["luong-giac", "luong-giac", "luong-giac", "day-so", "gioi-han", "gioi-han", "mu-log", "mu-log", "dao-ham", "khong-gian", "xs-11", "luong-giac-nc"],
  12: ["khao-sat", "khao-sat", "khao-sat", "khao-sat", "tich-phan", "tich-phan", "tich-phan", "tich-phan", "oxyz", "xs-12", "do-thi-ham", "tp-nang-cao", "oxyz-nang-cao", "tp-nang-cao"],
};

/** Chương của từng bài tư duy theo lớp, theo thứ tự trong src/content/think/*.ts (5 bài mỗi lớp). */
export const THINK_CHAPTER: Record<number, string[]> = {
  1: ["cong-tru", "cong-tru", "cong-tru", "cong-tru", "cong-tru", "do-xem"],
  2: ["cong-tru", "cong-tru", "cong-tru", "cong-tru", "nhan", "do-dai", "hinh-so-lieu-2"],
  3: ["nhan-chia", "nhan-chia", "nhan-chia", "do", "nhan-chia"],
  4: ["bon-phep-tinh", "phan-so", "thong-ke-4", "bon-phep-tinh", "bon-phep-tinh", "goc-duong"],
  5: ["phan-tram", "phan-tram", "ti-so", "thap-phan", "thap-phan", "dien-tich"],
  6: ["chia-het", "so-nguyen", "so-nguyen", "phan-so", "chia-het", "hinh"],
  7: ["ti-le", "huu-ti", "ti-le", "tam-giac", "tam-giac", "goc-song-song"],
  8: ["dang-thuc", "dang-thuc", "pt-ham", "dang-thuc", "tam-giac"],
  9: ["pt-b2", "can", "can", "lg-vuong", "he-pt", "tan-so", "can"],
  10: ["menh-de", "menh-de", "ham-bac-hai", "vecto", "ham-bac-hai", "thong-ke", "ham-so-10", "vt-toa-do-10"],
  11: ["gioi-han", "dao-ham", "gioi-han", "xs-11", "xs-11", "khong-gian", "luong-giac-nc", "mu-log-nc"],
  12: ["khao-sat", "tich-phan", "tich-phan", "xs-12", "oxyz", "do-thi-ham", "tp-nang-cao", "tp-nang-cao", "oxyz-nang-cao", "tk-nang-cao", "xs-nang-cao", "xs-nang-cao"],
};

/** Nút của từng phương pháp: [lớp, chương] và mạch nếu khác mạch của chương. */
export const METHOD_NODE: Record<string, { grade: number; chapter: string; strand?: Strand }> = {
  "tach-so-lop-1": { grade: 1, chapter: "cong-tru" },
  "dat-tinh-co-nho": { grade: 2, chapter: "cong-tru" },
  "gap-giam-so-lan": { grade: 3, chapter: "nhan-chia" },
  "doc-bang-so-lieu": { grade: 3, chapter: "hinh-3", strand: "tk" },
  "quy-dong-phan-so": { grade: 4, chapter: "phan-so" },
  "trung-binh-cong": { grade: 4, chapter: "thong-ke-4" },
  "phan-tram-tong-phan": { grade: 5, chapter: "phan-tram" },
  "bieu-do-hinh-quat": { grade: 5, chapter: "bieu-do-5" },
  "uoc-boi-ung-dung": { grade: 6, chapter: "chia-het" },
  "xac-suat-thuc-nghiem": { grade: 6, chapter: "tk-xs-6" },
  "ti-le-thuan-nghich": { grade: 7, chapter: "ti-le" },
  "tan-so-tuong-doi": { grade: 7, chapter: "thong-ke" },
  "tam-giac-bang-nhau": { grade: 7, chapter: "tam-giac" },
  "nhan-tu-hang-dang-thuc": { grade: 8, chapter: "dang-thuc" },
  "xac-suat-bien-co": { grade: 8, chapter: "xac-suat-8" },
  "luong-giac": { grade: 12, chapter: "tich-phan" },
  "an-phu": { grade: 12, chapter: "tich-phan" },
  "doi-bien": { grade: 12, chapter: "ky-thuat-tp" },
  "tung-phan": { grade: 12, chapter: "ky-thuat-tp" },
  "xet-dau": { grade: 12, chapter: "khao-sat" },
  "co-lap-tham-so": { grade: 12, chapter: "khao-sat" },
  "ham-dac-trung": { grade: 12, chapter: "khao-sat" },
  "diem-roi": { grade: 10, chapter: "bpt-hai-an" },
  "lien-hop": { grade: 11, chapter: "gioi-han" },
  "vi-et": { grade: 10, chapter: "ham-bac-hai" },
  "toa-do-hoa": { grade: 12, chapter: "oxyz" },
  "phan-bu": { grade: 11, chapter: "xs-11" },
  "quy-nap": { grade: 11, chapter: "day-so" },
  "tao-binh-phuong": { grade: 10, chapter: "ham-bac-hai" },
  "bpt-bac-hai-dau": { grade: 10, chapter: "ham-bac-hai" },
  "truc-can-thuc": { grade: 9, chapter: "can" },
  "he-pt-cong-the": { grade: 9, chapter: "he-pt" },
  "ti-so-luong-giac-vuong": { grade: 9, chapter: "lg-vuong" },
  "chop-goc-the-tich": { grade: 11, chapter: "khong-gian" },
  "tham-so-don-dieu": { grade: 12, chapter: "ung-dung-dh" },
  "boi-nghiem-cuc-tri": { grade: 12, chapter: "ung-dung-dh" },
  "toi-uu-thuc-te": { grade: 12, chapter: "ung-dung-dh" },
  "xac-suat-bayes": { grade: 12, chapter: "xs-12" },
  "giao-diem-oxyz": { grade: 12, chapter: "oxyz" },
  "tap-xac-dinh-ham": { grade: 10, chapter: "ham-so-10" },
  "vt-cung-phuong": { grade: 10, chapter: "vt-toa-do-10" },
  "pt-lg-bac-nhat": { grade: 11, chapter: "luong-giac-nc" },
  "pt-mu-dat-an": { grade: 11, chapter: "mu-log-nc" },
  "tuong-giao-do-thi": { grade: 12, chapter: "do-thi-ham" },
  "tp-tach-doan": { grade: 12, chapter: "tp-nang-cao" },
  "khoang-cach-oxyz": { grade: 12, chapter: "oxyz-nang-cao" },
  "cay-khong-hoan-lai": { grade: 12, chapter: "xs-nang-cao" },
  "so-sanh-phan-tan": { grade: 12, chapter: "tk-nang-cao" },
};

export const methodNodeId = (id: string): string | undefined => {
  const m = METHOD_NODE[id];
  return m ? nodeId(m.grade, m.chapter) : undefined;
};

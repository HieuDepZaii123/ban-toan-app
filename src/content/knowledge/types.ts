import type { Check } from "../dang/types.ts";

/** Loại mục kiến thức, để học sinh phân biệt điều phải thuộc với điều chỉ để hiểu. */
export type KnowKind = "dinh-nghia" | "dinh-ly" | "cong-thuc" | "tinh-chat" | "cach-lam" | "luu-y" | "vi-du";

type KnowItem = {
  kind: KnowKind;
  /** Tên ngắn của mục, ví dụ «Hệ thức Viète». */
  title?: string;
  /** Một mục là một ý, viết trong một đoạn. Công thức nằm trong $...$ trên cùng một dòng. */
  text: string;
  /** Nói dễ hiểu: cùng ý đó bằng lời đời thường, cho người chưa học gì về toán. Bắt buộc với định nghĩa. */
  de?: string;
  /**
   * Vì sao đúng: các bước suy luận đi từ điều đã biết tới kết luận của mục, mỗi bước một ý.
   * Bắt buộc với định lí, công thức và tính chất, để người đọc tự suy ra được chứ không phải thuộc lòng.
   */
  suy?: string[];
  /**
   * Những cách chứng minh khác, đi theo hướng khác hẳn `suy` (đại số và hình học, trực tiếp và phản chứng...).
   * `cach` là tên hướng, ví dụ «Bằng hình học»; `buoc` là các bước, mỗi bước một ý, như `suy`.
   */
  suyKhac?: { cach: string; buoc: string[] }[];
};

type KnowSection = {
  title: string;
  items: KnowItem[];
};

/** Kiến thức tổng quát và chi tiết của một chuyên đề. */
export type TopicKnowledge = {
  id: string;
  /** Tổng quát: là gì, dùng để làm gì, nối với chuyên đề nào. */
  tongQuat: { la: string; dungDe: string; lienHe: string };
  /** Bắt đầu từ con số không: vài đoạn đi từ chuyện đời thường tới khái niệm chính của chuyên đề. */
  tuDau: string[];
  /** Cách đọc ký hiệu: ký hiệu (trong $...$) và nghĩa của nó bằng lời. */
  kyHieu: { kh: string; doc: string }[];
  /** Cần biết trước khi học. */
  canBiet: string[];
  sections: KnowSection[];
  /** Những điều phải thuộc, mỗi điều một dòng. */
  canNho: string[];
  /** Chuyên đề liên quan: id của tờ và lý do nối. */
  lienQuan: { id: string; vi: string }[];
  /** Mọi số liệu trong mục «vi-du» và công thức có số, kiểm bằng SymPy. */
  checks: Check[];
};

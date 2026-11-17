import type { Check } from "../dang/types.ts";

/** Loại mục kiến thức, để học sinh phân biệt điều phải thuộc với điều chỉ để hiểu. */
export type KnowKind = "dinh-nghia" | "dinh-ly" | "cong-thuc" | "tinh-chat" | "cach-lam" | "luu-y" | "vi-du";

type KnowItem = {
  kind: KnowKind;
  /** Tên ngắn của mục, ví dụ «Hệ thức Viète». */
  title?: string;
  /** Một mục là một ý, viết trong một đoạn. Công thức nằm trong $...$ trên cùng một dòng. */
  text: string;
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

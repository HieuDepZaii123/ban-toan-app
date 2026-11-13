/**
 * Một nguồn cho điều hướng: thanh trên cùng hiện các nhóm, hàng dưới hiện các trang trong nhóm đang mở,
 * và Mục lục bên phải liệt kê đủ mọi trang theo nhóm.
 */
export type NavPage = {
  href: string;
  id: string;
  label: string;
  en: string;
  /** Các đường con (ví dụ /kien-thuc/10) cũng thuộc trang này. */
  nested?: boolean;
  /** Đường khác cũng tính là trang này (ví dụ tờ chuyên đề /t/... thuộc trang Chuyên đề). */
  also?: string[];
};

export type NavGroup = {
  id: "learn" | "practice" | "tools" | "more";
  label: string;
  en: string;
  /** Nhóm có tab trên thanh đầu trang; nhóm "Khác" chỉ nằm trong Mục lục. */
  top: boolean;
  pages: NavPage[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "learn",
    label: "Học",
    en: "Learn",
    top: true,
    pages: [
      { href: "/", id: "home", label: "Trang chủ", en: "Home", also: ["/t/"] },
      { href: "/kien-thuc", id: "grades", label: "Bài học lớp 1–12", en: "Lessons, grades 1–12", nested: true },
      { href: "/phuong-phap", id: "methods", label: "Phương pháp giải", en: "Methods", nested: true },
      { href: "/so-cong-thuc", id: "formula", label: "Sổ công thức", en: "Formulas" },
      { href: "/tai-lieu", id: "packs", label: "Tài liệu ôn tập", en: "Study notes", nested: true },
      { href: "/khoa-hoc", id: "science", label: "Khoa học", en: "Science", nested: true },
      { href: "/nghien-cuu", id: "research", label: "Nghiên cứu", en: "Research" },
    ],
  },
  {
    id: "practice",
    label: "Luyện tập",
    en: "Practice",
    top: true,
    pages: [
      { href: "/luyen-lop", id: "lop", label: "Luyện lớp 1–9", en: "Practice, grades 1–9", nested: true },
      { href: "/luyen-thpt", id: "thpt", label: "Luyện lớp 10–12", en: "Practice, grades 10–12" },
      { href: "/luyen", id: "drill", label: "Đề tổng hợp", en: "Mixed drill" },
      { href: "/thi-thu", id: "exam2025", label: "Thi thử THPT", en: "THPT mock exam" },
      { href: "/danh-gia", id: "assess", label: "Đánh giá năng lực", en: "Assessment" },
      { href: "/so-loi", id: "miss", label: "Sổ câu sai", en: "Missed questions" },
      { href: "/on-loi-sai", id: "review", label: "Lịch ôn câu sai", en: "Review plan" },
    ],
  },
  {
    id: "tools",
    label: "Công cụ",
    en: "Tools",
    top: true,
    pages: [
      { href: "/soan-tai-lieu", id: "soan", label: "Soạn tài liệu", en: "Documents" },
      { href: "/xuong-hinh", id: "workshop", label: "Xưởng hình", en: "Workshop" },
      { href: "/may-tinh", id: "calc", label: "Máy tính", en: "Calculator" },
    ],
  },
  {
    id: "more",
    label: "Khác",
    en: "More",
    top: false,
    pages: [
      { href: "/gioi-thieu", id: "refer", label: "Giới thiệu", en: "Refer" },
      { href: "/nang-cap", id: "premium", label: "Premium", en: "Premium" },
      { href: "/phu-huynh", id: "parents", label: "Phụ huynh và thầy cô", en: "Parents and teachers" },
      { href: "/du-lieu", id: "data", label: "Dữ liệu của tôi", en: "My data" },
      { href: "/chinh-sach", id: "policy", label: "Chính sách", en: "Policy" },
    ],
  },
];

/** Mọi trang có đường riêng, theo thứ tự nhóm. Mục lục và test đọc danh sách này. */
export const MENU_LINKS: NavPage[] = NAV_GROUPS.flatMap((group) => group.pages);

function matches(page: NavPage, path: string): boolean {
  if (path === page.href) return true;
  if (page.nested && path.startsWith(`${page.href}/`)) return true;
  return (page.also ?? []).some((prefix) => path.startsWith(prefix));
}

/** Trang và nhóm chứa `path`, hoặc null nếu đường không thuộc trang nào. */
export function locate(path: string): { group: NavGroup; page: NavPage } | null {
  for (const group of NAV_GROUPS) {
    const page = group.pages.find((item) => matches(item, path));
    if (page) return { group, page };
  }
  return null;
}

/** Mã trang đang mở ("" nếu không có). */
export function menuArea(path: string): string {
  return locate(path)?.page.id ?? "";
}

/**
 * Nơi "Luyện tập" đưa tới, theo lớp người học đã chọn: lớp 1–9 vào bài luyện của lớp mình,
 * lớp 10–12 và người lớn vào luyện THPT, chưa chọn lớp thì vào trang chọn lớp để luyện.
 */
export function practiceHome(grade: number | "adult" | null): string {
  if (grade === null) return "/luyen-lop";
  if (typeof grade === "number" && grade <= 9) return `/luyen-lop/${grade}`;
  return "/luyen-thpt";
}

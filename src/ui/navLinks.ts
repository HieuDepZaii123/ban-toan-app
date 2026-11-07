/** Main sections that already have a route. The right menu reads this list. */
export const MENU_LINKS = [
  { href: "/", id: "home", label: "Bàn", en: "Desk" },
  { href: "/kien-thuc", id: "grades", label: "Lớp 1–12", en: "Grades 1–12" },
  { href: "/soan-tai-lieu", id: "soan", label: "Soạn tài liệu", en: "Documents" },
  { href: "/xuong-hinh", id: "workshop", label: "Xưởng hình", en: "Workshop" },
  { href: "/luyen", id: "drill", label: "Luyện", en: "Practice" },
  { href: "/luyen-lop", id: "lop", label: "Luyện lớp 1–9", en: "Grades 1–9 practice" },
  { href: "/luyen-thpt", id: "thpt", label: "Luyện THPT", en: "Grades 10–12 practice" },
  { href: "/phuong-phap", id: "methods", label: "Phương pháp giải", en: "Methods" },
  { href: "/so-loi", id: "miss", label: "Sổ lỗi", en: "Miss book" },
  { href: "/danh-gia", id: "assess", label: "Đánh giá", en: "Assess" },
  { href: "/so-cong-thuc", id: "formula", label: "Công thức", en: "Formulas" },
  { href: "/nghien-cuu", id: "research", label: "Nghiên cứu", en: "Research" },
  { href: "/khoa-hoc", id: "science", label: "Khoa học", en: "Science" },
  { href: "/gioi-thieu", id: "refer", label: "Giới thiệu", en: "Refer" },
  { href: "/nang-cap", id: "premium", label: "Premium", en: "Premium" },
] as const;

export type MenuLinkId = (typeof MENU_LINKS)[number]["id"];

export function menuArea(path: string): MenuLinkId | "music" | "" {
  if (path === "/kien-thuc" || path.startsWith("/kien-thuc/")) return "grades";
  if (path === "/soan-tai-lieu") return "soan";
  if (path === "/khoa-hoc" || path.startsWith("/khoa-hoc/")) return "science";
  if (path === "/xuong-hinh") return "workshop";
  if (path === "/luyen") return "drill";
  if (path === "/luyen-lop" || path.startsWith("/luyen-lop/")) return "lop";
  if (path === "/luyen-thpt") return "thpt";
  if (path === "/phuong-phap" || path.startsWith("/phuong-phap/")) return "methods";
  if (path === "/so-loi") return "miss";
  if (path === "/so-cong-thuc") return "formula";
  if (path === "/danh-gia") return "assess";
  if (path === "/gioi-thieu") return "refer";
  if (path === "/nang-cap") return "premium";
  if (path === "/nghien-cuu") return "research";
  if (path === "/" || path.startsWith("/t/")) return "home";
  return "";
}

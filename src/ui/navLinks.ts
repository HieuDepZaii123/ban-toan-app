/** Main sections that already have a route. The right menu reads this list. */
export const MENU_LINKS = [
  { href: "/", id: "home", label: "Bàn" },
  { href: "/kien-thuc", id: "grades", label: "Lớp 1–12" },
  { href: "/xuong-hinh", id: "workshop", label: "Xưởng hình" },
  { href: "/luyen", id: "drill", label: "Luyện" },
  { href: "/so-loi", id: "miss", label: "Sổ lỗi" },
  { href: "/danh-gia", id: "assess", label: "Đánh giá" },
  { href: "/so-cong-thuc", id: "formula", label: "Công thức" },
  { href: "/nghien-cuu", id: "research", label: "Nghiên cứu" },
  { href: "/khoa-hoc", id: "science", label: "Khoa học" },
  { href: "/gioi-thieu", id: "refer", label: "Giới thiệu" },
  { href: "/nang-cap", id: "premium", label: "Premium" },
] as const;

export type MenuLinkId = (typeof MENU_LINKS)[number]["id"];

export function menuArea(path: string): MenuLinkId | "music" | "" {
  if (path === "/kien-thuc" || path.startsWith("/kien-thuc/")) return "grades";
  if (path === "/khoa-hoc" || path.startsWith("/khoa-hoc/")) return "science";
  if (path === "/xuong-hinh") return "workshop";
  if (path === "/luyen") return "drill";
  if (path === "/so-loi") return "miss";
  if (path === "/so-cong-thuc") return "formula";
  if (path === "/danh-gia") return "assess";
  if (path === "/gioi-thieu") return "refer";
  if (path === "/nang-cap") return "premium";
  if (path === "/nghien-cuu") return "research";
  if (path === "/" || path.startsWith("/t/")) return "home";
  return "";
}

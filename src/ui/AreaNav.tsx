import { A } from "../lib/route.tsx";
import { useRoute } from "../lib/useRoute.ts";

const LINKS = [
  { href: "/", id: "math", label: "Toán" },
  { href: "/kien-thuc", id: "grades", label: "Lớp 1–12" },
  { href: "/soan-tai-lieu", id: "soan", label: "Soạn tài liệu" },
  { href: "/khoa-hoc", id: "science", label: "Khoa học" },
  { href: "/xuong-hinh", id: "workshop", label: "Xưởng" },
  { href: "/luyen", id: "drill", label: "Luyện" },
  { href: "/so-loi", id: "miss", label: "Sổ lỗi" },
  { href: "/so-cong-thuc", id: "formula", label: "Công thức" },
  { href: "/danh-gia", id: "assess", label: "Đánh giá" },
  { href: "/gioi-thieu", id: "refer", label: "Giới thiệu" },
] as const;

function currentArea(path: string): string {
  if (path === "/kien-thuc" || path.startsWith("/kien-thuc/")) return "grades";
  if (path === "/soan-tai-lieu") return "soan";
  if (path === "/khoa-hoc" || path.startsWith("/khoa-hoc/")) return "science";
  if (path === "/xuong-hinh") return "workshop";
  if (path === "/luyen") return "drill";
  if (path === "/so-loi") return "miss";
  if (path === "/so-cong-thuc") return "formula";
  if (path === "/danh-gia") return "assess";
  if (path === "/gioi-thieu") return "refer";
  if (path === "/nang-cap" || path === "/nghien-cuu") return "";
  return "math";
}

export function AreaNav() {
  const { path } = useRoute();
  const current = currentArea(path);
  return (
    <nav className="area-nav" aria-label="Khu vực">
      {LINKS.map((item) => (
        <A key={item.id} href={item.href} aria-current={current === item.id ? "page" : undefined}>{item.label}</A>
      ))}
    </nav>
  );
}

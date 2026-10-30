import { A } from "../lib/route.tsx";
import { useRoute } from "../lib/useRoute.ts";

const LINKS = [
  { href: "/", id: "math", label: "Toán" },
  { href: "/khoa-hoc", id: "science", label: "Khoa học" },
  { href: "/xuong-hinh", id: "workshop", label: "Xưởng" },
  { href: "/luyen", id: "drill", label: "Luyện" },
  { href: "/so-loi", id: "miss", label: "Sổ lỗi" },
  { href: "/so-cong-thuc", id: "formula", label: "Công thức" },
  { href: "/danh-gia", id: "assess", label: "Đánh giá" },
] as const;

function currentArea(path: string): string {
  if (path === "/khoa-hoc" || path.startsWith("/khoa-hoc/")) return "science";
  if (path === "/xuong-hinh") return "workshop";
  if (path === "/luyen") return "drill";
  if (path === "/so-loi") return "miss";
  if (path === "/so-cong-thuc") return "formula";
  if (path === "/danh-gia") return "assess";
  if (path === "/nang-cap") return "";
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

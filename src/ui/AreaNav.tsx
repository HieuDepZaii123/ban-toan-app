import { A } from "../lib/route.tsx";
import { useRoute } from "../lib/useRoute.ts";

const LINKS = [
  { href: "/", id: "math", label: "Toán" },
  { href: "/khoa-hoc", id: "science", label: "Khoa học" },
  { href: "/so-cong-thuc", id: "formula", label: "Công thức" },
  { href: "/danh-gia", id: "assess", label: "Đánh giá" },
] as const;

export function AreaNav() {
  const { path } = useRoute();
  const current = path === "/khoa-hoc" || path.startsWith("/khoa-hoc/")
    ? "science"
    : path === "/so-cong-thuc"
      ? "formula"
      : path === "/danh-gia"
        ? "assess"
        : path === "/nang-cap"
          ? ""
          : "math";
  return (
    <nav className="area-nav" aria-label="Khu vực">
      {LINKS.map((item) => (
        <A key={item.id} href={item.href} aria-current={current === item.id ? "page" : undefined}>{item.label}</A>
      ))}
    </nav>
  );
}

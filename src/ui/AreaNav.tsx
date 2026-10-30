import { A } from "../lib/route.tsx";
import { useRoute } from "../lib/useRoute.ts";

export function AreaNav() {
  const { path } = useRoute();
  const science = path === "/khoa-hoc" || path.startsWith("/khoa-hoc/");
  return (
    <nav className="area-nav" aria-label="Khu vực">
      <A href="/" aria-current={!science && path !== "/nang-cap" ? "page" : undefined}>Toán</A>
      <A href="/khoa-hoc" aria-current={science ? "page" : undefined}>Khoa học</A>
    </nav>
  );
}

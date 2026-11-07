import { A } from "../lib/route.tsx";
import { t } from "../lib/text.ts";
import { useRoute } from "../lib/useRoute.ts";
import { LangSwitch } from "./LangSwitch.tsx";
import { useLang } from "./useLang.ts";

const LINKS = [
  { href: "/", id: "math", vi: "Toán", en: "Maths" },
  { href: "/kien-thuc", id: "grades", vi: "Lớp 1–12", en: "Grades 1–12" },
  { href: "/soan-tai-lieu", id: "soan", vi: "Soạn tài liệu", en: "Documents" },
  { href: "/khoa-hoc", id: "science", vi: "Khoa học", en: "Science" },
  { href: "/xuong-hinh", id: "workshop", vi: "Xưởng", en: "Workshop" },
  { href: "/luyen", id: "drill", vi: "Luyện", en: "Practice" },
  { href: "/luyen-lop", id: "lop", vi: "Luyện 1–12", en: "Grades 1–12" },
  { href: "/phuong-phap", id: "methods", vi: "Cách giải", en: "Methods" },
  { href: "/so-loi", id: "miss", vi: "Sổ lỗi", en: "Miss book" },
  { href: "/so-cong-thuc", id: "formula", vi: "Công thức", en: "Formulas" },
  { href: "/danh-gia", id: "assess", vi: "Đánh giá", en: "Assess" },
  { href: "/gioi-thieu", id: "refer", vi: "Giới thiệu", en: "Refer" },
] as const;

function currentArea(path: string): string {
  if (path === "/kien-thuc" || path.startsWith("/kien-thuc/")) return "grades";
  if (path === "/soan-tai-lieu") return "soan";
  if (path === "/khoa-hoc" || path.startsWith("/khoa-hoc/")) return "science";
  if (path === "/xuong-hinh") return "workshop";
  if (path === "/luyen") return "drill";
  if (path === "/luyen-lop" || path.startsWith("/luyen-lop/")) return "lop";
  if (path === "/phuong-phap" || path.startsWith("/phuong-phap/")) return "methods";
  if (path === "/so-loi") return "miss";
  if (path === "/so-cong-thuc") return "formula";
  if (path === "/danh-gia") return "assess";
  if (path === "/gioi-thieu") return "refer";
  if (path === "/nang-cap" || path === "/nghien-cuu") return "";
  return "math";
}

export function AreaNav() {
  const { path } = useRoute();
  const lang = useLang();
  const current = currentArea(path);
  return (
    <nav className="area-nav" aria-label={t(lang, "Khu vực", "Sections")}>
      {LINKS.map((item) => (
        <A key={item.id} href={item.href} aria-current={current === item.id ? "page" : undefined}>{t(lang, item.vi, item.en)}</A>
      ))}
      <LangSwitch />
    </nav>
  );
}

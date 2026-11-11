import type { ReactNode } from "react";
import { A } from "../lib/route.tsx";
import { AreaNav } from "./AreaNav.tsx";
import { Logo } from "./Logo.tsx";
import { Prefs } from "./Prefs.tsx";

/**
 * Đầu trang chung cho mọi trang: logo | nhóm | Tùy chọn, Mục lục; hàng thứ hai mặc định là các trang
 * trong nhóm đang mở. Trang nào cần hàng riêng (tờ chuyên đề) thì truyền `sub`.
 */
export function SiteHeader({ sub }: { sub?: ReactNode }) {
  return (
    <header className="bar">
      <A className="brand" href="/"><Logo /> Bàn Toán</A>
      <AreaNav sub={sub} />
      <Prefs />
    </header>
  );
}

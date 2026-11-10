import { useEffect, useRef, type ReactNode } from "react";
import { A } from "../lib/route.tsx";
import { AreaNav } from "./AreaNav.tsx";
import { Logo } from "./Logo.tsx";
import { Prefs } from "./Prefs.tsx";

/**
 * Đầu trang chung cho mọi trang: logo | nhóm | công cụ; hàng thứ hai mặc định là các trang
 * trong nhóm đang mở. Trang nào cần hàng riêng (tờ chuyên đề) thì truyền `sub`.
 *
 * Trên điện thoại chỉ hàng cuối (các trang con hoặc các tab của tờ) dính lại khi cuộn:
 * phần còn lại trôi đi để nội dung có chỗ. Độ lệch được đo từ chính hàng đó.
 */
export function SiteHeader({ sub }: { sub?: ReactNode }) {
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el || typeof window.matchMedia !== "function") return;
    const narrow = window.matchMedia("(max-width: 640px)");
    const apply = () => {
      const row = el.querySelector<HTMLElement>(".sub-nav, .topic-bar .tabs");
      el.style.top = narrow.matches && row ? `${-row.offsetTop}px` : "";
    };
    apply();
    const watch = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(apply);
    watch?.observe(el);
    narrow.addEventListener?.("change", apply);
    return () => {
      watch?.disconnect();
      narrow.removeEventListener?.("change", apply);
    };
  }, []);

  return (
    <header className="bar" ref={bar}>
      <A className="brand" href="/"><Logo /> Bàn Toán</A>
      <AreaNav sub={sub} />
      <Prefs />
    </header>
  );
}

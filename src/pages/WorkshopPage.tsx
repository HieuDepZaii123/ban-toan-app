import { useState } from "react";
import { t } from "../lib/text.ts";
import { PageFrame } from "../ui/PageFrame.tsx";
import { useLang } from "../ui/useLang.ts";
import { PlaneShop } from "../workshop/PlaneShop.tsx";
import { SolidBench } from "../workshop/SolidBench.tsx";

export function WorkshopPage() {
  const lang = useLang();
  const [tab, setTab] = useState<"phang" | "khoi">("phang");
  return (
    <PageFrame
      kicker={t(lang, "Xưởng hình", "Workshop")}
      title={t(lang, "Dựng hình và khối", "Draw plane figures and solids")}
      lead={t(lang, "Mặt phẳng: chọn một điểm hoặc đoạn, xóa chỉ phần đó. Khối: trụ, nón, cầu, lăng trụ, chóp, tứ diện, hộp — kéo để xoay, số trên công thức theo thanh trượt.", "Plane: select one point or segment and delete only that. Solids: cylinder, cone, sphere, prism, pyramid, tetrahedron, box — drag to rotate; the formula follows the sliders.")}
    >
      <div className="read-switch" role="tablist" aria-label={t(lang, "Mặt phẳng hoặc khối", "Plane or solid")}>
        <button type="button" role="tab" aria-selected={tab === "phang"} onClick={() => setTab("phang")}>{t(lang, "Mặt phẳng", "Plane")}</button>
        <button type="button" role="tab" aria-selected={tab === "khoi"} onClick={() => setTab("khoi")}>{t(lang, "Khối", "Solids")}</button>
      </div>
      {tab === "phang" ? <PlaneShop /> : <SolidBench />}
    </PageFrame>
  );
}

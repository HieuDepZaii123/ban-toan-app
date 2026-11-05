import { PageFrame } from "../ui/PageFrame.tsx";
import { PlaneShop } from "../workshop/PlaneShop.tsx";

export function WorkshopPage() {
  return (
    <PageFrame
      kicker="Xưởng hình"
      title="Dựng hình phẳng"
      lead="Đặt điểm, nối đoạn, trung điểm, vuông góc. Kéo điểm thì số đổi. Khối 3D ở chuyên đề Hình."
    >
      <PlaneShop />
    </PageFrame>
  );
}

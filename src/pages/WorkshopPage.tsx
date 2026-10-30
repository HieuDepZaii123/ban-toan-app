import { PageFrame } from "../ui/PageFrame.tsx";
import { PlaneShop } from "../workshop/PlaneShop.tsx";

export function WorkshopPage() {
  return (
    <PageFrame
      kicker="Xưởng hình"
      title="Dựng hình phẳng"
      lead="Đặt điểm, nối đoạn, lấy trung điểm hoặc hạ vuông góc. Kéo điểm để hình đổi theo. Khối 3D vẫn mở trong chuyên đề Hình."
    >
      <PlaneShop />
    </PageFrame>
  );
}

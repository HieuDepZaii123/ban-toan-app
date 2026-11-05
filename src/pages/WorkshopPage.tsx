import { PageFrame } from "../ui/PageFrame.tsx";
import { PlaneShop } from "../workshop/PlaneShop.tsx";

export function WorkshopPage() {
  return (
    <PageFrame
      kicker="Xưởng hình"
      title="Dựng hình phẳng"
      lead="Đặt điểm, nối đoạn, lấy trung điểm hoặc hạ vuông góc. Kéo điểm thì số đo đổi theo. Khối nằm ở chuyên đề Hình."
    >
      <PlaneShop />
    </PageFrame>
  );
}

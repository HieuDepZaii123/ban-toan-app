import { CubicTypesLab, QuarticLab, SolutionsLab, VariationTableLab } from "../surveyWidgets.tsx";
import { HorizontalSweepAnim, TangentRunAnim, VanishingExtremaAnim } from "../surveyAnim.tsx";
import { AsymptoteDiscover, FlatDiscover, LineDiscover, MaxExtremaDiscover, QuarticDiscover } from "../surveyDiscover.tsx";
import { BallValley, NetFit } from "../widgets.tsx";
import { CUBIC, NET_WHY } from "../netShared.ts";

/** Hình của chuyên đề «survey», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <FlatDiscover />
      <TangentRunAnim />
      <VariationTableLab />
      <CubicTypesLab />
      <MaxExtremaDiscover />
      <VanishingExtremaAnim />
      <QuarticDiscover />
      <QuarticLab />
      <SolutionsLab />
      <LineDiscover />
      <HorizontalSweepAnim />
      <AsymptoteDiscover />
      <BallValley kind="w" />
      <NetFit target={CUBIC} story={["Đồ thị bậc ba có một đỉnh đồi và một đáy. Nhìn xem mạng có tự uốn ra đúng hai chỗ quay đầu không.", "A cubic graph has one hilltop and one bottom. See whether the network bends out exactly two turning points by itself."]} why={NET_WHY} />
    </>
  );
}

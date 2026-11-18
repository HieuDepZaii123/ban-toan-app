import { AsymptoteLab, ContinuityLab, IndeterminateLab, SqueezeLab, ZoomLab } from "../limitWidgets.tsx";
import { BisectLab, EpsilonGame } from "../widgets.tsx";

/** Hình của chuyên đề «limit», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <EpsilonGame />
      <ZoomLab />
      <IndeterminateLab />
      <SqueezeLab />
      <AsymptoteLab />
      <ContinuityLab />
      <BisectLab />
    </>
  );
}

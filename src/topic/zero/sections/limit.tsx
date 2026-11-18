import { AsymptoteLab, ContinuityLab, IndeterminateLab, SqueezeLab, ZoomLab } from "../limitWidgets.tsx";
import { AsymptoteDiscover, ContinuityDiscover, HoleDiscover, IndeterminateDiscover, SqueezeDiscover } from "../limitDiscover.tsx";
import { BisectionAnim, EpsilonDeltaAnim, SineSqueezeAnim } from "../limitAnim.tsx";
import { BisectLab, EpsilonGame } from "../widgets.tsx";

/** Hình của chuyên đề «limit», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <EpsilonGame />
      <EpsilonDeltaAnim />
      <HoleDiscover />
      <ZoomLab />
      <IndeterminateDiscover />
      <IndeterminateLab />
      <SqueezeDiscover />
      <SqueezeLab />
      <SineSqueezeAnim />
      <AsymptoteDiscover />
      <AsymptoteLab />
      <ContinuityDiscover />
      <ContinuityLab />
      <BisectLab />
      <BisectionAnim />
    </>
  );
}

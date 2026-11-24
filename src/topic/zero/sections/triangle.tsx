import { ArchimedesLab, PythagorasLab, SectorConeLab, SimilarityLab, TetraRatioLab, TriCentersLab } from "../triangleWidgets.tsx";
import { AltitudeSimilarAnim, CosineSweepAnim, ScaleAnim } from "../triangleAnim.tsx";
import { AreaRatioDiscover, CosineDiscover, ObtuseDiscover, RightDiscover, VolumeRatioDiscover } from "../triangleDiscover.tsx";
import { DartLab } from "../widgets.tsx";

/** Hình của chuyên đề «triangle», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <TriCentersLab />
      <RightDiscover />
      <PythagorasLab />
      <AltitudeSimilarAnim />
      <ObtuseDiscover />
      <CosineSweepAnim />
      <CosineDiscover />
      <SimilarityLab />
      <AreaRatioDiscover />
      <ScaleAnim />
      <ArchimedesLab />
      <SectorConeLab />
      <VolumeRatioDiscover />
      <TetraRatioLab />
      <DartLab mode="pi" />
      <DartLab mode="ball" />
    </>
  );
}

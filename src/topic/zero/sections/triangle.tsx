import { ArchimedesLab, PythagorasLab, SectorConeLab, SimilarityLab, TetraRatioLab, TriCentersLab } from "../triangleWidgets.tsx";
import { DartLab } from "../widgets.tsx";

/** Hình của chuyên đề «triangle», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <TriCentersLab />
      <PythagorasLab />
      <SimilarityLab />
      <ArchimedesLab />
      <SectorConeLab />
      <TetraRatioLab />
      <DartLab mode="pi" />
      <DartLab mode="ball" />
    </>
  );
}

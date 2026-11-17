import { LayerLab, MatrixLab, VectorCentroidLab } from "../vectorWidgets.tsx";
import { CramerLab, DotNeuron } from "../widgets.tsx";

/** Hình của chuyên đề «vector», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <VectorCentroidLab />
      <DotNeuron />
      <MatrixLab />
      <CramerLab />
      <LayerLab />
    </>
  );
}

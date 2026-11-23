import { LayerLab, MatrixLab, VectorCentroidLab } from "../vectorWidgets.tsx";
import { CramerLab, DotNeuron } from "../widgets.tsx";
import { AddVectorsAnim, CramerRotateAnim, SquareFlattenAnim } from "../vectorAnim.tsx";
import { AreaDiscover, CentroidDiscover, DegenerateDiscover, DotDiscover, OrderDiscover } from "../vectorDiscover.tsx";

/** Hình của chuyên đề «vector», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <AddVectorsAnim />
      <CentroidDiscover />
      <VectorCentroidLab />
      <DotDiscover />
      <DotNeuron />
      <OrderDiscover />
      <MatrixLab />
      <AreaDiscover />
      <SquareFlattenAnim />
      <CramerLab />
      <DegenerateDiscover />
      <CramerRotateAnim />
      <LayerLab />
    </>
  );
}

import { ArithGeoLab, ArithSumLab, CobwebLab, InductionLab } from "../seqWidgets.tsx";
import { DominoAnim, GaussPairsAnim, GeometricFillAnim } from "../seqAnim.tsx";
import { EpsilonGame, PartialSums } from "../widgets.tsx";

/** Hình của chuyên đề «sequence», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <ArithSumLab />
      <GaussPairsAnim />
      <PartialSums />
      <GeometricFillAnim />
      <ArithGeoLab />
      <EpsilonGame />
      <CobwebLab />
      <InductionLab />
      <DominoAnim />
    </>
  );
}

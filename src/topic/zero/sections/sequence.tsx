import { ArithGeoLab, ArithSumLab, CobwebLab, InductionLab } from "../seqWidgets.tsx";
import { EpsilonGame, PartialSums } from "../widgets.tsx";

/** Hình của chuyên đề «sequence», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <ArithSumLab />
      <PartialSums />
      <ArithGeoLab />
      <EpsilonGame />
      <CobwebLab />
      <InductionLab />
    </>
  );
}

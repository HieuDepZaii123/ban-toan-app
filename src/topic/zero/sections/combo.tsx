import { BinomialExpansionLab, GroupedLab, StatsLab } from "../comboWidgets.tsx";
import { CountingTreeAnim, FactorialGrowthAnim, PascalBuildAnim } from "../comboAnim.tsx";
import { CoefficientDiscover, LineDiscover, PickDiscover, RowSumDiscover, SymmetryDiscover } from "../comboDiscover.tsx";
import { EnumLab } from "../widgets.tsx";

/** Hình của chuyên đề «combo», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <CountingTreeAnim />
      <LineDiscover />
      <FactorialGrowthAnim />
      <EnumLab />
      <PickDiscover />
      <SymmetryDiscover />
      <PascalBuildAnim />
      <RowSumDiscover />
      <CoefficientDiscover />
      <BinomialExpansionLab />
      <StatsLab />
      <GroupedLab />
    </>
  );
}

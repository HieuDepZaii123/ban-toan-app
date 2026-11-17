import { BinomialExpansionLab, GroupedLab, StatsLab } from "../comboWidgets.tsx";
import { EnumLab } from "../widgets.tsx";

/** Hình của chuyên đề «combo», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <EnumLab />
      <BinomialExpansionLab />
      <StatsLab />
      <GroupedLab />
    </>
  );
}

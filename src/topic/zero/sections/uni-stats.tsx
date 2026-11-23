import { CentralLimitAnim, ConfidenceIntervalAnim, LawOfLargeNumbersAnim } from "../statsAnim.tsx";
import { AbTestDiscover, BiasDiscover, CoverageDiscover, DiceVarDiscover, StandardErrorDiscover } from "../statsDiscover.tsx";

/** Hình và thẻ đoán trước của môn Xác suất thống kê (đại học). */
export default function Parts() {
  return (
    <>
      <DiceVarDiscover />
      <StandardErrorDiscover />
      <LawOfLargeNumbersAnim />
      <CentralLimitAnim />
      <BiasDiscover />
      <CoverageDiscover />
      <ConfidenceIntervalAnim />
      <AbTestDiscover />
    </>
  );
}

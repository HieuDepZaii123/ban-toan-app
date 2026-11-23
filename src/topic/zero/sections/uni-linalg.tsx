import { EigenSweepAnim, PowerIterationAnim, RegressionSweepAnim } from "../linalgAnim.tsx";
import { EigenDiscover, PowerDiscover, RankDiscover, RegressDiscover, StayDiscover } from "../linalgDiscover.tsx";

/** Hình và thẻ đoán trước của môn Đại số tuyến tính (đại học). */
export default function Parts() {
  return (
    <>
      <RankDiscover />
      <StayDiscover />
      <EigenSweepAnim />
      <EigenDiscover />
      <PowerDiscover />
      <PowerIterationAnim />
      <RegressDiscover />
      <RegressionSweepAnim />
    </>
  );
}

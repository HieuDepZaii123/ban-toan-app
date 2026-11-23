import { GradientDescentAnim, SaddleSweepAnim, TaylorGrowAnim } from "../calcAnim.tsx";
import { DescentDiscover, HarmonicDiscover, LagrangeDiscover, SaddleDiscover, TaylorDiscover } from "../calcDiscover.tsx";

/** Hình và thẻ đoán trước của môn Giải tích (đại học). */
export default function Parts() {
  return (
    <>
      <HarmonicDiscover />
      <TaylorDiscover />
      <TaylorGrowAnim />
      <DescentDiscover />
      <GradientDescentAnim />
      <SaddleDiscover />
      <SaddleSweepAnim />
      <LagrangeDiscover />
    </>
  );
}

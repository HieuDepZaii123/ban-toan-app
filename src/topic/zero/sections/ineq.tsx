import { CounterexampleLab, DiffHeatLab, CauchyVecLab, MeansLab, RectangleLab, TriIneqLab } from "../ineqWidgets.tsx";
import { ArrowsTriangleAnim, CauchyQuadraticAnim, FourMeansAnim, SquaresRectsAnim, SweepSemicircleAnim } from "../ineqAnim.tsx";
import { HillClimbLab } from "../widgets.tsx";

/** Hình của chuyên đề «ineq», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <DiffHeatLab />
      <SquaresRectsAnim />
      <MeansLab />
      <SweepSemicircleAnim />
      <FourMeansAnim />
      <RectangleLab />
      <CauchyVecLab />
      <CauchyQuadraticAnim />
      <TriIneqLab />
      <ArrowsTriangleAnim />
      <HillClimbLab />
      <CounterexampleLab />
    </>
  );
}

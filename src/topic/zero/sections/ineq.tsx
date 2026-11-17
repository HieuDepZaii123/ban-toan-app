import { CounterexampleLab, DiffHeatLab, CauchyVecLab, MeansLab, RectangleLab, TriIneqLab } from "../ineqWidgets.tsx";
import { HillClimbLab } from "../widgets.tsx";

/** Hình của chuyên đề «ineq», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <DiffHeatLab />
      <MeansLab />
      <RectangleLab />
      <CauchyVecLab />
      <TriIneqLab />
      <HillClimbLab />
      <CounterexampleLab />
    </>
  );
}

import { AlphaLab, CompleteSquareLab, FitLab, IntervalLab, LineIntersectLab, RootsLab, ShapeLab, SignLab, TranslateLab } from "../quadWidgets.tsx";
import { BallValley, NetFit } from "../widgets.tsx";
import { PARABOLA, NET_WHY } from "../netShared.ts";

/** Hình của chuyên đề «quadratic», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <ShapeLab />
      <CompleteSquareLab />
      <TranslateLab />
      <BallValley kind="quad" />
      <RootsLab />
      <SignLab />
      <LineIntersectLab />
      <AlphaLab />
      <IntervalLab />
      <FitLab />
      <NetFit target={PARABOLA} story={["Cho mạng xem 41 chấm nằm trên một parabol, không cho biết công thức. Mạng bắt đầu với các số ngẫu nhiên nên đường cong ban đầu vô nghĩa. Bấm học và quan sát nó uốn dần về các chấm.", "Show the network 41 dots lying on a parabola without telling it the formula. The network starts with random numbers, so the initial curve means nothing. Press train and watch it bend towards the dots."]} why={NET_WHY} />
    </>
  );
}

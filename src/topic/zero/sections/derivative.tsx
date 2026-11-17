import { BackpropLab, BoxLab, DerivCurveLab, ExtremaLab, KinkLab, MotionLab, RuleLab, TangentLab } from "../derivWidgets.tsx";
import { BallValley, SecantLab } from "../widgets.tsx";

/** Hình của chuyên đề «derivative», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <SecantLab />
      <DerivCurveLab />
      <KinkLab />
      <RuleLab />
      <BackpropLab />
      <MotionLab />
      <TangentLab />
      <ExtremaLab />
      <BoxLab />
      <BallValley kind="w" />
    </>
  );
}

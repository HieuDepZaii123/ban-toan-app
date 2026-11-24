import { CircleLineLab, LineFormsLab, PlaneLab, SphereSectionLab, TwoLinesLab } from "../analyticWidgets.tsx";
import { LineSlideAnim, RotatingLineAnim, SphereSliceAnim } from "../analyticAnim.tsx";
import { DistanceDiscover, ParallelDiscover, SkewDiscover, SliceDiscover, TouchDiscover } from "../analyticDiscover.tsx";
import { PerceptronLab } from "../widgets.tsx";

/** Hình của chuyên đề «analytic», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <DistanceDiscover />
      <LineFormsLab />
      <ParallelDiscover />
      <TwoLinesLab />
      <RotatingLineAnim />
      <TouchDiscover />
      <CircleLineLab />
      <LineSlideAnim />
      <PerceptronLab />
      <SkewDiscover />
      <PlaneLab />
      <SliceDiscover />
      <SphereSectionLab />
      <SphereSliceAnim />
    </>
  );
}

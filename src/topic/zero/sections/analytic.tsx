import { CircleLineLab, LineFormsLab, PlaneLab, SphereSectionLab, TwoLinesLab } from "../analyticWidgets.tsx";
import { PerceptronLab } from "../widgets.tsx";

/** Hình của chuyên đề «analytic», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <LineFormsLab />
      <TwoLinesLab />
      <CircleLineLab />
      <PerceptronLab />
      <PlaneLab />
      <SphereSectionLab />
    </>
  );
}

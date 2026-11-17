import { AntiderivLab, AreaBetweenLab, AreaFunctionLab, DisplacementLab, MonteCarloAreaLab, PartsLab, SubstitutionLab, VolumeLab } from "../integralWidgets.tsx";
import { RiemannLab } from "../widgets.tsx";

/** Hình của chuyên đề «integral», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <RiemannLab />
      <AntiderivLab />
      <AreaFunctionLab />
      <DisplacementLab />
      <AreaBetweenLab />
      <SubstitutionLab />
      <PartsLab />
      <VolumeLab />
      <MonteCarloAreaLab />
    </>
  );
}

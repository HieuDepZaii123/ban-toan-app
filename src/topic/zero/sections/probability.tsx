import { BayesLab, BinomialLab, BirthdayLab, CLTLab, LawLargeNumbersLab } from "../probWidgets.tsx";
import { BinomialBuildAnim, NaturalFreqAnim, TotalProbTreeAnim } from "../probAnim.tsx";
import { AtLeastDiscover, BirthdayDiscover, ExactlyDiscover, IndependenceDiscover, PositiveDiscover } from "../probDiscover.tsx";
import { DiceLab } from "../widgets.tsx";

/** Hình của chuyên đề «probability», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <DiceLab />
      <IndependenceDiscover />
      <TotalProbTreeAnim />
      <PositiveDiscover />
      <NaturalFreqAnim />
      <BayesLab />
      <ExactlyDiscover />
      <BinomialBuildAnim />
      <BinomialLab />
      <AtLeastDiscover />
      <BirthdayDiscover />
      <BirthdayLab />
      <LawLargeNumbersLab />
      <CLTLab />
    </>
  );
}

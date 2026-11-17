import { BayesLab, BinomialLab, BirthdayLab, CLTLab, LawLargeNumbersLab } from "../probWidgets.tsx";
import { DiceLab } from "../widgets.tsx";

/** Hình của chuyên đề «probability», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <DiceLab />
      <BayesLab />
      <BinomialLab />
      <BirthdayLab />
      <LawLargeNumbersLab />
      <CLTLab />
    </>
  );
}

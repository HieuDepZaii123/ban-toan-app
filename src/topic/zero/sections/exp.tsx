import { DecayLab, ExpEquationLab, ExpLawsLab, InverseGraphLab, SlideRuleLab } from "../expWidgets.tsx";
import { CompoundLab, NetFit } from "../widgets.tsx";
import { EXP, NET_WHY } from "../netShared.ts";

/** Hình của chuyên đề «exp», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <ExpLawsLab />
      <CompoundLab />
      <SlideRuleLab />
      <InverseGraphLab />
      <ExpEquationLab />
      <DecayLab />
      <NetFit target={EXP} story={["Cho mạng xem các chấm của 2^x. Hàm này tăng ngày càng nhanh, nên mạng phải uốn đường cong mỗi lúc một gắt. Thử ít nơ-ron (2–3) và nhiều nơ-ron (12–16) để thấy sự khác nhau.", "Show the network the dots of 2^x. This function grows faster and faster, so the network must bend the curve more and more sharply. Try few neurons (2–3) and many (12–16) to see the difference."]} why={NET_WHY} />
    </>
  );
}

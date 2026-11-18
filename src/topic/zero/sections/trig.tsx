import { AdditionLab, BeatLab, ReflectLab, SolveLab, TriangleLab, WaveLab } from "../trigWidgets.tsx";
import { CircleWalk, NetFit } from "../widgets.tsx";
import { SINE, NET_WHY } from "../netShared.ts";

/** Hình của chuyên đề «trig», tải khi người học mở chuyên đề. */
export default function Parts() {
  return (
    <>
      <CircleWalk />
      <ReflectLab />
      <AdditionLab />
      <WaveLab />
      <SolveLab />
      <TriangleLab />
      <BeatLab />
      <NetFit target={SINE} story={["Cho mạng xem một chu kì của sin x. Một sóng cần ít nhất vài nơ-ron: mỗi nơ-ron tạo một chữ S, ghép chữ S lên xuống thành sóng.", "Show the network one period of sin x. A wave needs at least a few neurons: each neuron makes one S, and the S-shapes combine up and down into a wave."]} why={NET_WHY} />
    </>
  );
}

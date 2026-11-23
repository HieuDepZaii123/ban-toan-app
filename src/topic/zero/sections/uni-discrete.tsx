import { EulerLogisticAnim, HandshakeAnim, SirAnim } from "../discreteAnim.tsx";
import { DoublingDiscover, FermatDiscover, HandshakeDiscover, LogisticDiscover, RsaDiscover } from "../discreteDiscover.tsx";

/** Hình và thẻ đoán trước của môn Phương trình vi phân và toán rời rạc (đại học). */
export default function Parts() {
  return (
    <>
      <DoublingDiscover />
      <LogisticDiscover />
      <EulerLogisticAnim />
      <SirAnim />
      <HandshakeDiscover />
      <HandshakeAnim />
      <FermatDiscover />
      <RsaDiscover />
    </>
  );
}

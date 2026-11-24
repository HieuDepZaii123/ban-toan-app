import { Discover } from "./discover.tsx";
import { COMBO_CARDS } from "./comboCards.ts";

export const LineDiscover = () => <Discover card={COMBO_CARDS.line5} />;
export const PickDiscover = () => <Discover card={COMBO_CARDS.pick3} />;
export const SymmetryDiscover = () => <Discover card={COMBO_CARDS.symmetry} />;
export const RowSumDiscover = () => <Discover card={COMBO_CARDS.rowSum} />;
export const CoefficientDiscover = () => <Discover card={COMBO_CARDS.coefficient} />;

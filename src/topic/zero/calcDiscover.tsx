import { Discover } from "./discover.tsx";
import { CALC_CARDS } from "./calcCards.ts";

export const HarmonicDiscover = () => <Discover card={CALC_CARDS.harmonic} />;
export const TaylorDiscover = () => <Discover card={CALC_CARDS.taylor} />;
export const DescentDiscover = () => <Discover card={CALC_CARDS.descent} />;
export const SaddleDiscover = () => <Discover card={CALC_CARDS.saddle} />;
export const LagrangeDiscover = () => <Discover card={CALC_CARDS.lagrange} />;

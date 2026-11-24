import { Discover } from "./discover.tsx";
import { ANALYTIC_CARDS } from "./analyticCards.ts";

export const TouchDiscover = () => <Discover card={ANALYTIC_CARDS.touch} />;
export const DistanceDiscover = () => <Discover card={ANALYTIC_CARDS.distance} />;
export const ParallelDiscover = () => <Discover card={ANALYTIC_CARDS.parallel} />;
export const SkewDiscover = () => <Discover card={ANALYTIC_CARDS.skew} />;
export const SliceDiscover = () => <Discover card={ANALYTIC_CARDS.slice} />;

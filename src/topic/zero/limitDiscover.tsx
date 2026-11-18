import { Discover } from "./discover.tsx";
import { LIMIT_CARDS } from "./limitCards.ts";

export const HoleDiscover = () => <Discover card={LIMIT_CARDS.hole} />;
export const IndeterminateDiscover = () => <Discover card={LIMIT_CARDS.indeterminate} />;
export const SqueezeDiscover = () => <Discover card={LIMIT_CARDS.squeeze} />;
export const AsymptoteDiscover = () => <Discover card={LIMIT_CARDS.asymptote} />;
export const ContinuityDiscover = () => <Discover card={LIMIT_CARDS.continuity} />;

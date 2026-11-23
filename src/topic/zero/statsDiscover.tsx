import { Discover } from "./discover.tsx";
import { STATS_CARDS } from "./statsCards.ts";

export const StandardErrorDiscover = () => <Discover card={STATS_CARDS.standardError} />;
export const DiceVarDiscover = () => <Discover card={STATS_CARDS.diceVar} />;
export const CoverageDiscover = () => <Discover card={STATS_CARDS.coverage} />;
export const BiasDiscover = () => <Discover card={STATS_CARDS.bias} />;
export const AbTestDiscover = () => <Discover card={STATS_CARDS.abTest} />;

import { Discover } from "./discover.tsx";
import { LINALG_CARDS } from "./linalgCards.ts";

export const StayDiscover = () => <Discover card={LINALG_CARDS.stay} />;
export const PowerDiscover = () => <Discover card={LINALG_CARDS.power} />;
export const RankDiscover = () => <Discover card={LINALG_CARDS.rank} />;
export const EigenDiscover = () => <Discover card={LINALG_CARDS.eigen} />;
export const RegressDiscover = () => <Discover card={LINALG_CARDS.regress} />;

import { Discover } from "./discover.tsx";
import { PROB_CARDS } from "./probCards.ts";

export const PositiveDiscover = () => <Discover card={PROB_CARDS.positive} />;
export const BirthdayDiscover = () => <Discover card={PROB_CARDS.birthday} />;
export const AtLeastDiscover = () => <Discover card={PROB_CARDS.atLeast} />;
export const IndependenceDiscover = () => <Discover card={PROB_CARDS.independence} />;
export const ExactlyDiscover = () => <Discover card={PROB_CARDS.exactly} />;

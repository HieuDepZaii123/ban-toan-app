import { Discover } from "./discover.tsx";
import { DISCRETE_CARDS } from "./discreteCards.ts";

export const DoublingDiscover = () => <Discover card={DISCRETE_CARDS.doubling} />;
export const LogisticDiscover = () => <Discover card={DISCRETE_CARDS.logistic} />;
export const FermatDiscover = () => <Discover card={DISCRETE_CARDS.fermat} />;
export const HandshakeDiscover = () => <Discover card={DISCRETE_CARDS.handshake} />;
export const RsaDiscover = () => <Discover card={DISCRETE_CARDS.rsa} />;

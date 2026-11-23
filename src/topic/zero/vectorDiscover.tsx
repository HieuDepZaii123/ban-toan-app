import { Discover } from "./discover.tsx";
import { VECTOR_CARDS } from "./vectorCards.ts";

export const DotDiscover = () => <Discover card={VECTOR_CARDS.dot} />;
export const OrderDiscover = () => <Discover card={VECTOR_CARDS.order} />;
export const AreaDiscover = () => <Discover card={VECTOR_CARDS.area} />;
export const DegenerateDiscover = () => <Discover card={VECTOR_CARDS.system} />;
export const CentroidDiscover = () => <Discover card={VECTOR_CARDS.centroid} />;

import { Discover } from "./discover.tsx";
import { SURVEY_CARDS } from "./surveyCards.ts";

export const FlatDiscover = () => <Discover card={SURVEY_CARDS.flat} />;
export const MaxExtremaDiscover = () => <Discover card={SURVEY_CARDS.maxCount} />;
export const LineDiscover = () => <Discover card={SURVEY_CARDS.line} />;
export const QuarticDiscover = () => <Discover card={SURVEY_CARDS.quartic} />;
export const AsymptoteDiscover = () => <Discover card={SURVEY_CARDS.asymptote} />;

import { Typography } from "@/components/typography";
import { PopulatedTrade } from "@/utils/factories/populate-trade-with-cards-data";

type TradePageCardTitleProps = {
  trade: PopulatedTrade;
};

export const TradePageCardTitle = ({ trade }: TradePageCardTitleProps) => {
  const { mainCard, offeredCards } = trade;

  if (!mainCard && offeredCards.length >= 0) {
    return <Typography variant="h2" text="looking to get a good offer for these cards" />;
  }

  if (mainCard && offeredCards.length <= 0) {
    return <Typography variant="h2" text="accepting any offers" />;
  }

  return <Typography variant="h2" text="to get any offers" />;
};

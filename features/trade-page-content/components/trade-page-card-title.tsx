import { Typography } from "@/components/typography";
import { PopulatedTrade } from "@/utils/factories/populate-trade-with-cards-data";

type TradePageCardTitleProps = {
  trade: PopulatedTrade;
};

export const TradePageCardTitle = ({ trade }: TradePageCardTitleProps) => {
  const { mainCard, offeredCards } = trade;

  if (!mainCard && offeredCards.length <= 0) {
    return <Typography variant="h2" text="Looking to get a good card for these cards" />;
  }

  if (mainCard && offeredCards.length <= 0) {
    return <Typography variant="h2" text="Looking to trade this card, accepting any offers" />;
  }

  return <Typography variant="h2" text="Trade" />;
};

import { Typography } from "@/components/typography";
import { PopulatedTrade } from "@/utils/factories/populate-trade-with-cards-data";
import { useMemo } from "react";

type TradePageHeadingProps = {
  trade: PopulatedTrade;
};

export const TradePageHeading = ({ trade }: TradePageHeadingProps) => {
  const { mainCard, offeredCards } = trade;
  const title = useMemo(() => {
    if (mainCard) {
      return `Searching for ${mainCard.cardName} card`;
    }

    if (offeredCards.length > 0) {
      return `Offering ${offeredCards.map((card) => card.cardName).join(", ")} cards for a trade`;
    }

    return `${trade.author.username} wants to trade`;
  }, [mainCard, offeredCards, trade.author.username]);

  const subtitle = useMemo(() => {
    if (mainCard) {
      return "To trade for the offered cards";
    }
  }, [mainCard]);

  return (
    <div className="flex flex-col gap-4 py-10 items-center text-center">
      <Typography variant="h1" text={title} />
      <Typography variant="p" text="Select one of the cards the user is offering" />
    </div>
  );
};

import { Typography } from "@/components/typography";
import { PopulatedTrade } from "@/utils/factories/populate-trade-with-cards-data";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const TradePageOwnerActions = dynamic(
  () =>
    import("@/features/trade-page-content/components/trade-page-owner-actions").then(
      (mod) => mod.TradePageOwnerActions
    ),
  { ssr: true }
);

type TradePageHeadingProps = {
  trade: PopulatedTrade;
};

export const TradePageHeading = ({ trade }: TradePageHeadingProps) => {
  const { mainCard, offeredCards } = trade;
  const title = useMemo(() => {
    if (mainCard) {
      return `Wants to trade ${mainCard.cardName}`;
    }

    if (offeredCards.length > 0) {
      return `Offering ${
        offeredCards.length === 1 ? "1 card" : `${offeredCards.length} cards`
      } for a trade`;
    }

    return `${trade.author.username} wants to trade`;
  }, [mainCard, offeredCards, trade.author.username]);

  return (
    <div className="w-full flex flex-1 flex-col gap-4">
      <div className="w-full flex flex-col gap-4 py-4 items-center text-center">
        <Typography variant="h1" text={title} />
      </div>
      {trade.accepts_offers && <TradePageOwnerActions authorId={trade.author.id} />}
    </div>
  );
};

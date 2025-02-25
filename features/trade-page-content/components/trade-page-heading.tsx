import { Typography } from "@/components/typography";
import { PopulatedTrade } from "@/utils/factories/populate-trade-with-cards-data";
import { getTradeDetailsDescription, getTradeDetailsTitle } from "@/utils/get-trade-details-text";
import { getTradeType } from "@/utils/get-trade-type";
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
  const tradeType = getTradeType(mainCard, offeredCards);
  const title = useMemo(
    () => getTradeDetailsTitle(mainCard, offeredCards, tradeType),
    [mainCard, offeredCards, tradeType]
  );

  const descriptionText = useMemo(
    () => getTradeDetailsDescription(mainCard, offeredCards, tradeType, trade.author.username),
    [mainCard, offeredCards, tradeType, trade.author.username]
  );

  return (
    <div className="w-full flex flex-1 flex-col gap-4">
      <div className="w-full flex flex-col gap-4 py-4 items-center text-center">
        <Typography variant="h1" text={title} />
        <Typography variant="p" text={descriptionText} />
      </div>
      {trade.accepts_offers && <TradePageOwnerActions authorId={trade.author.id} />}
    </div>
  );
};

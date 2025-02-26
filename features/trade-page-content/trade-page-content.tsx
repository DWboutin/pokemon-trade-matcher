import { CardInfoHeading } from "@/components/sections/card-info-heading";
import { TradeOffersSection } from "@/components/sections/trade-offers-section";
import { TradePageCardTitle } from "@/features/trade-page-content/components/trade-page-card-title";
import { TradePageHeading } from "@/features/trade-page-content/components/trade-page-heading";
import { TradePageMainImage } from "@/features/trade-page-content/components/trade-page-main-image";
import { PopulatedOffer } from "@/utils/factories/populate-offer-with-card-data";
import { PopulatedTrade } from "@/utils/factories/populate-trade-with-cards-data";
import { TradePageAuthor } from "@/features/trade-page-content/components/trade-page-author";
import { TradeConnectionModal } from "@/features/trade-page-content/components/trade-connection-modal";

type TradePageContentProps = {
  trade: PopulatedTrade;
  initialOffers: PopulatedOffer[];
};

export const TradePageContent = ({ trade, initialOffers }: TradePageContentProps) => {
  const primaryCard =
    !trade.mainCard && trade.offeredCards.length === 1 ? trade.offeredCards[0] : trade.mainCard;
  const acceptedOffer =
    initialOffers[0]?.status === "accepted"
      ? initialOffers[0]
      : initialOffers.find((offer) => offer.status === "accepted");

  return (
    <>
      <div className="w-full">
        <div className="flex flex-1 flex-col gap-4 py-10 items-center max-md:px-4">
          <TradePageHeading trade={trade} />
          {trade.author && <TradePageAuthor author={trade.author} createdAt={trade.created_at} />}

          <div className="flex flex-col w-full max-w-[640px] items-center gap-8">
            {primaryCard && <CardInfoHeading card={primaryCard} />}
            <TradePageMainImage mainCard={primaryCard} />
            <div className="flex flex-col gap-10 text-center">
              <TradePageCardTitle trade={trade} />
            </div>
          </div>
        </div>
        <TradeOffersSection
          tradeId={trade.id}
          acceptsOffers={trade.accepts_offers}
          tradeOwnerId={trade.author.id}
          mainCard={trade.mainCard}
          offeredCards={trade.offeredCards}
          initialOffers={initialOffers}
        />
      </div>
      {acceptedOffer && <TradeConnectionModal acceptedOffer={acceptedOffer} trade={trade} />}
    </>
  );
};

import { CardInfoHeading } from "@/components/sections/card-info-heading";
import { TradeOffersSection } from "@/components/sections/trade-offers-section";
import { TradePageCardTitle } from "@/features/trade-page-content/components/trade-page-card-title";
import { TradePageHeading } from "@/features/trade-page-content/components/trade-page-heading";
import { TradePageMainImage } from "@/features/trade-page-content/components/trade-page-main-image";
import { PopulatedOffer } from "@/utils/factories/populate-offer-with-card-data";
import { PopulatedTrade } from "@/utils/factories/populate-trade-with-cards-data";

type TradePageContentProps = {
  trade: PopulatedTrade;
  initialOffers: PopulatedOffer[];
};

export const TradePageContent = ({ trade, initialOffers }: TradePageContentProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 py-10 items-center max-md:px-4">
        <TradePageHeading trade={trade} />
        <div className="flex flex-col w-full max-w-[640px] items-center gap-4">
          {trade.mainCard && <CardInfoHeading card={trade.mainCard} />}
          <TradePageMainImage mainCard={trade.mainCard} />
          <div className="flex flex-col gap-10 text-center">
            <TradePageCardTitle trade={trade} />
          </div>
        </div>
      </div>
      <TradeOffersSection
        tradeId={trade.id}
        mainCard={trade.mainCard}
        initialOffers={initialOffers}
      />
    </div>
  );
};

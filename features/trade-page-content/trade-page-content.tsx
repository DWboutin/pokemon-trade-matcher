import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { TradePageCardTitle } from "@/features/trade-page-content/components/trade-page-card-title";
import { TradePageHeading } from "@/features/trade-page-content/components/trade-page-heading";
import { TradePageMainImage } from "@/features/trade-page-content/components/trade-page-main-image";
import { PopulatedTrade } from "@/utils/factories/populate-trade-with-cards-data";

type TradePageContentProps = {
  trade: PopulatedTrade;
};

export const TradePageContent = ({ trade }: TradePageContentProps) => {
  return (
    <div className="flex flex-col gap-4 py-10 items-center">
      <TradePageHeading trade={trade} />
      <Card className="w-full cursor-pointer hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-row max-md:flex-col max-md:items-center gap-4">
          <div className="py-6 pl-6 max-md:pb-0">
            <TradePageMainImage mainCard={trade.mainCard} />
          </div>
          <CardHeader>
            <CardTitle>
              <TradePageCardTitle trade={trade} />
            </CardTitle>
          </CardHeader>
        </div>
      </Card>
    </div>
  );
};

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MakeTradeOffer } from "@/features/make-trade-offer/make-trade-offer";
import { CardData } from "@/types/app";

type TradeOffersSectionProps = {
  mainCard: CardData | null;
};

export const TradeOffersSection = ({ mainCard }: TradeOffersSectionProps) => {
  return (
    <Tabs defaultValue="offers" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="offers">Offers</TabsTrigger>
        <TabsTrigger value="create-offer">Create an offer</TabsTrigger>
      </TabsList>
      <TabsContent value="offers">
        <div className="py-6"></div>
      </TabsContent>
      <TabsContent value="create-offer">
        <div className="py-6">
          <MakeTradeOffer mainCard={mainCard} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

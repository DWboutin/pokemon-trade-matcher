"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MakeTradeOffer } from "@/features/make-trade-offer/make-trade-offer";
import { OffersListing } from "@/features/offers-listing/offers-listing";
import { CardData } from "@/types/app";
import { PopulatedOffer } from "@/utils/factories/populate-offer-with-card-data";
import { useState } from "react";

type TradeOffersSectionProps = {
  tradeId: string;
  mainCard: CardData | null;
  initialOffers: PopulatedOffer[];
  offeredCards: CardData[];
  tradeOwnerId: string;
  acceptsOffers: boolean;
};

export const TradeOffersSection = ({
  tradeId,
  mainCard,
  initialOffers,
  offeredCards,
  tradeOwnerId,
  acceptsOffers,
}: TradeOffersSectionProps) => {
  const [activeTab, setActiveTab] = useState<"offers" | "create-offer">("offers");

  const handleChangeTabToOffers = () => {
    setActiveTab("offers");
  };

  return (
    <Tabs
      defaultValue="offers"
      className="w-full"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as "offers" | "create-offer")}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="offers">Offers</TabsTrigger>
        <TabsTrigger value="create-offer">Create an offer</TabsTrigger>
      </TabsList>
      <TabsContent value="offers">
        <div className="py-6">
          <OffersListing
            tradeId={tradeId}
            ownerCard={mainCard}
            initialData={initialOffers}
            tradeOwnerId={tradeOwnerId}
            acceptsOffers={acceptsOffers}
          />
        </div>
      </TabsContent>
      <TabsContent value="create-offer">
        <div className="py-6">
          <MakeTradeOffer
            tradeId={tradeId}
            mainCard={mainCard}
            offeredCards={offeredCards}
            handleChangeTabToOffers={handleChangeTabToOffers}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

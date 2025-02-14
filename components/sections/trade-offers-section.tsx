"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OffersListing } from "@/features/offers-listing/offers-listing";
import { cn } from "@/lib/utils";
import { CardData } from "@/types/app";
import { PopulatedOffer } from "@/utils/factories/populate-offer-with-card-data";
import dynamic from "next/dynamic";
import { useState } from "react";

const MakeTradeOffer = dynamic(
  () => import("@/features/make-trade-offer/make-trade-offer").then((mod) => mod.MakeTradeOffer),
  {
    loading: () => <div>Loading...</div>,
  }
);

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
      className="w-full px-4"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as "offers" | "create-offer")}
    >
      <TabsList className={cn("grid w-full grid-cols-2", !acceptsOffers && "grid-cols-1")}>
        <TabsTrigger value="offers" className="text-lg font-semibold">
          Offers
        </TabsTrigger>
        {acceptsOffers && (
          <TabsTrigger value="create-offer" className="text-lg font-semibold">
            Create an offer
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="offers">
        <div className="py-6">
          <OffersListing
            tradeId={tradeId}
            initialData={initialOffers}
            tradeOwnerId={tradeOwnerId}
            acceptsOffers={acceptsOffers}
            handleChangeTabToOffers={handleChangeTabToOffers}
          />
        </div>
      </TabsContent>
      {acceptsOffers && (
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
      )}
    </Tabs>
  );
};

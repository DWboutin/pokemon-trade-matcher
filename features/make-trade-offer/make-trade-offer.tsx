"use client";

import { createOffer } from "@/actions/create-offer";
import { Typography } from "@/components/typography";
import { CardsSearch } from "@/features/cards-search/cards-search";
import { MakeTradeOfferModal } from "@/features/make-trade-offer/components/make-trade-offer-modal";
import { useMakeTradeOffer } from "@/features/make-trade-offer/hooks/use-make-trade-offer";
import { queryClient } from "@/providers/providers";
import { useCardsSearchStore } from "@/stores/cards-search-store";
import { CardData } from "@/types/app";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";

type MakeTradeOfferProps = {
  tradeId: string;
  mainCard: CardData;
  handleChangeTabToOffers: () => void;
};

export const MakeTradeOffer = ({
  tradeId,
  mainCard,
  handleChangeTabToOffers,
}: MakeTradeOfferProps) => {
  const {
    selectors: { isModalOpen, isLoading },
    actions: { handleCardClick, handleCreateOffer, setIsModalOpen },
  } = useMakeTradeOffer({
    tradeId,
    handleChangeTabToOffers,
  });

  return (
    <div className="flex flex-col px-4 gap-4">
      <div className="text-center">
        <Typography variant="h3" text="Search the card you want to offer" />
      </div>
      <CardsSearch handleCardClick={handleCardClick} />
      <MakeTradeOfferModal
        isOpen={isModalOpen}
        isLoading={isLoading}
        onOpenChange={setIsModalOpen}
        mainCard={mainCard}
        handleCreateOffer={handleCreateOffer}
      />
    </div>
  );
};

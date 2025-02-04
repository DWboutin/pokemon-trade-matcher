"use client";

import { Typography } from "@/components/typography";
import { CardsSearch } from "@/features/cards-search/cards-search";
import { MakeTradeOfferModal } from "@/features/make-trade-offer/components/make-trade-offer-modal";
import { useCardsSearchStore } from "@/stores/cards-search-store";
import { CardData } from "@/types/app";
import { MouseEvent, useState } from "react";

type MakeTradeOfferProps = {
  mainCard: CardData;
};

export const MakeTradeOffer = ({ mainCard }: MakeTradeOfferProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setSelectedCardId = useCardsSearchStore((state) => state.setSelectedCardId);
  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    const cardId = e.currentTarget.dataset.cardId;

    if (cardId) {
      setSelectedCardId(cardId);
      setIsModalOpen(true);
    }
  };

  const handleCreateOffer = () => {
    setSelectedCardId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col px-4 gap-4">
      <div className="text-center">
        <Typography variant="h3" text="Search the card you want to offer" />
      </div>
      <CardsSearch handleCardClick={handleCardClick} />
      <MakeTradeOfferModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} mainCard={mainCard} />
    </div>
  );
};

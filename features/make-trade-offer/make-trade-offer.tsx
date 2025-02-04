"use client";

import { Typography } from "@/components/typography";
import { CardsSearch } from "@/features/cards-search/cards-search";
import { MakeTradeOfferModal } from "@/features/make-trade-offer/components/make-trade-offer-modal";
import { useMakeTradeOffer } from "@/features/make-trade-offer/hooks/use-make-trade-offer";
import { CardData } from "@/types/app";

type MakeTradeOfferProps = {
  tradeId: string;
  mainCard: CardData | null;
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

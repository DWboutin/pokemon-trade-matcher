"use client";

import { CardsListing } from "@/components/cards-listing";
import { Typography } from "@/components/typography";
import { CardsSearchListing } from "@/features/cards-search-listing/cards-search-listing";
import { CardsSearch } from "@/features/cards-search/cards-search";
import { MakeTradeAuthorOffers } from "@/features/make-trade-offer/components/make-trade-author-offers";
import { MakeTradeOfferModal } from "@/features/make-trade-offer/components/make-trade-offer-modal";
import { useMakeTradeOffer } from "@/features/make-trade-offer/hooks/use-make-trade-offer";
import { CardData } from "@/types/app";
import { getTradeType } from "@/utils/get-trade-type";
import { useMemo } from "react";

type MakeTradeOfferProps = {
  tradeId: string;
  mainCard: CardData | null;
  offeredCards: CardData[];
  handleChangeTabToOffers: () => void;
};

export const MakeTradeOffer = ({
  tradeId,
  mainCard,
  offeredCards,
  handleChangeTabToOffers,
}: MakeTradeOfferProps) => {
  const {
    selectors: {
      isModalOpen,
      isLoading,
      wantedCardId,
      wantedCard,
      selectedCardId,
      selectedCard,
      isLoadingSearchCards,
    },
    actions: {
      handleCardClick,
      handleCreateOffer,
      setIsModalOpen,
      handleWantedCardClick,
      handleSearchSubmit,
    },
  } = useMakeTradeOffer({
    tradeId,
    offeredCards,
    mainCardId: mainCard?.cardNumber,
    handleChangeTabToOffers,
  });
  const tradeType = useMemo(() => {
    return getTradeType(mainCard, offeredCards);
  }, [mainCard, offeredCards]);

  return (
    <div className="flex flex-col px-4 gap-4">
      {(tradeType === "offer" || tradeType === "trade") && (
        <CardsListing
          cards={offeredCards}
          selectedCardId={tradeType === "offer" ? wantedCardId : selectedCardId}
          handleCardClick={tradeType === "offer" ? handleWantedCardClick : handleCardClick}
        >
          <Typography variant="h3" text="No cards offered" />
        </CardsListing>
      )}
      {(tradeType === "want" || tradeType === "offer") && (
        <>
          <div className="text-center">
            <Typography variant="h3" text="Search the card you want to offer" />
          </div>
          <CardsSearch handleSearchSubmit={handleSearchSubmit} isLoading={isLoadingSearchCards} />
          <CardsSearchListing handleCardClick={handleCardClick} />
        </>
      )}
      <MakeTradeOfferModal
        isOpen={isModalOpen}
        isLoading={isLoading}
        onOpenChange={setIsModalOpen}
        mainCard={mainCard || wantedCard}
        selectedCard={selectedCard}
        handleCreateOffer={handleCreateOffer}
      />
    </div>
  );
};

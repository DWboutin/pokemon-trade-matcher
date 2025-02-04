import { Typography } from "@/components/typography";
import { CardData } from "@/types/app";
import { CardsListing } from "@/components/cards-listing";
import { MouseEvent } from "react";

type MakeTradeAuthorOffersProps = {
  offeredCards: CardData[];
  wantedCardId: string | null;
  handleWantedCardClick: (e: MouseEvent<HTMLDivElement>) => void;
};

export const MakeTradeAuthorOffers = ({
  offeredCards,
  wantedCardId,
  handleWantedCardClick,
}: MakeTradeAuthorOffersProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center px-4">
        <Typography variant="h3" text="Pick the card you want" />
      </div>
      <div className="flex flex-col gap-4">
        <CardsListing
          cards={offeredCards}
          selectedCardId={wantedCardId}
          handleCardClick={handleWantedCardClick}
        >
          <Typography variant="h3" text="No cards offered" />
        </CardsListing>
      </div>
    </div>
  );
};

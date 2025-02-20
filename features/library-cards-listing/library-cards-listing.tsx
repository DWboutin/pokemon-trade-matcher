import cardsDataJson from "@/scripts/data/cards.json";
import { CardsData } from "@/types/app";
import { FC } from "react";
import { CardImage } from "@/components/card-image";
import React from "react";
import { VirtualizedGrid } from "@/components/virtualized-grid";

const cardsData = cardsDataJson as CardsData;

export const LibraryCardsListing: FC = () => {
  return (
    <VirtualizedGrid>
      {cardsData.cards.map((card) => (
        <CardImage card={card} notSelectable key={card.cardNumber} />
      ))}
    </VirtualizedGrid>
  );
};

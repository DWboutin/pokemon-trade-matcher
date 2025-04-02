import { FC } from "react";
import { CardImage } from "@/components/card-image";
import React from "react";
import { VirtualizedGrid } from "@/components/virtualized-grid";
import { LibraryCardsSearch } from "@/features/library-cards-listing/components/library-cards-search";
import { CardsData } from "@/types/app";
import { z } from "zod";
import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import Link from "next/link";
import { slugifyCard } from "@/utils/slugifyCard";

type LibraryCardsListingProps = {
  cards: CardsData["cards"];
  defaultValues?: z.infer<typeof cardsSearchSchema>;
};

export const LibraryCardsListing: FC<LibraryCardsListingProps> = ({ cards, defaultValues }) => {
  return (
    <div className="flex flex-col gap-4">
      <LibraryCardsSearch defaultValues={defaultValues} />
      <VirtualizedGrid>
        {cards.map((card) => (
          <Link
            href={`/library/${slugifyCard(card)}`}
            key={card.cardNumber}
            className="group block p-2 min-w-[48px] min-h-[48px]"
          >
            <CardImage
              card={card}
              notSelectable
              className="flex flex-col items-center justify-center group-hover:scale-110 transition-all duration-300"
            />
          </Link>
        ))}
      </VirtualizedGrid>
    </div>
  );
};

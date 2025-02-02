"use client";

import { CardsSearchForm } from "@/features/cards-search/components/cards-search-form";
import { CardsSearchResults } from "@/features/cards-search/components/cards-search-results";
import { useCardsSearch } from "@/features/cards-search/hooks/use-cards-search";

type CardsSearchProps = {
  handleCardClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const CardsSearch = ({ handleCardClick }: CardsSearchProps) => {
  const {
    selectors: { form, cards, isLoading, selectedCardId },
    actions: { handleSubmit },
  } = useCardsSearch();

  return (
    <div className="flex flex-col gap-4">
      <CardsSearchForm form={form} handleSubmit={handleSubmit} isLoading={isLoading} />
      <div id="cards-search-results">
        <CardsSearchResults
          cards={cards}
          selectedCardId={selectedCardId}
          handleCardClick={handleCardClick}
        />
      </div>
    </div>
  );
};

"use client";

import { CardsSearchForm } from "@/features/cards-search/components/cards-search-form";
import { CardsSearchResults } from "@/features/cards-search/components/cards-search-results";
import { useCardsSearch } from "@/features/cards-search/hooks/use-cards-search";
import dynamic from "next/dynamic";

const CardsSearchTags = dynamic(
  () =>
    import("@/features/cards-search/components/cards-search-tags").then(
      (mod) => mod.CardsSearchTags
    ),
  { ssr: false }
);

type CardsSearchProps = {
  handleCardClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const CardsSearch = ({ handleCardClick }: CardsSearchProps) => {
  const {
    selectors: { form, cards, isLoading, selectedCardId, isSameValues, tagValues },
    actions: { handleSubmit, handleRemoveTag },
  } = useCardsSearch();

  return (
    <div className="flex flex-col gap-4">
      <CardsSearchForm
        form={form}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isDisabled={isSameValues}
      />
      {form.formState.isDirty && form.formState.isSubmitted && (
        <CardsSearchTags
          tagValues={tagValues}
          handleRemoveTag={handleRemoveTag}
          dirtyFields={form.formState.dirtyFields}
        />
      )}
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

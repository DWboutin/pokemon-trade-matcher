"use client";

import { Typography } from "@/components/typography";
import { CardsSearchForm } from "@/features/cards-search/components/cards-search-form";
import { CardsListing } from "@/components/cards-listing";
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
        <CardsListing
          cards={cards}
          selectedCardId={selectedCardId}
          handleCardClick={handleCardClick}
        >
          <Typography
            variant="h3"
            text="Refine your search for cards to show here"
            className="text-muted-foreground"
          />
        </CardsListing>
      </div>
    </div>
  );
};

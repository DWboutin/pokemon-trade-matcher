"use client";

import { Typography } from "@/components/typography";
import { CardsSearchForm } from "@/features/cards-search/components/cards-search-form";
import { CardsListing } from "@/components/cards-listing";
import { useCardsSearch } from "@/features/cards-search/hooks/use-cards-search";
import dynamic from "next/dynamic";
import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import { z } from "zod";

const CardsSearchTags = dynamic(
  () =>
    import("@/features/cards-search/components/cards-search-tags").then(
      (mod) => mod.CardsSearchTags
    ),
  { ssr: false }
);

type CardsSearchProps = {
  isLoading: boolean;
  handleSearchSubmit: (values: z.infer<typeof cardsSearchSchema>) => Promise<void> | void;
};

export const CardsSearch = ({ isLoading, handleSearchSubmit }: CardsSearchProps) => {
  const {
    selectors: { form, isSameValues, tagValues },
    actions: { handleSubmit, handleRemoveTag },
  } = useCardsSearch({ handleSearchSubmit });

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
    </div>
  );
};

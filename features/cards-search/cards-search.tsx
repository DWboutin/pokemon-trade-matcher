"use client";

import { CardsSearchForm } from "@/features/cards-search/components/cards-search-form";
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
  defaultValues?: z.infer<typeof cardsSearchSchema>;
};

export const CardsSearch = ({ isLoading, handleSearchSubmit, defaultValues }: CardsSearchProps) => {
  const {
    selectors: { form, isSameValues, tagValues },
    actions: { handleSubmit, handleRemoveTag },
  } = useCardsSearch({ handleSearchSubmit, defaultValues });

  return (
    <div className="flex flex-col gap-4">
      <CardsSearchForm
        form={form}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        isDisabled={isSameValues}
      />
      {form.formState.isDirty && (form.formState.isSubmitted || defaultValues) && (
        <CardsSearchTags
          tagValues={tagValues}
          handleRemoveTag={handleRemoveTag}
          dirtyFields={form.formState.dirtyFields}
        />
      )}
    </div>
  );
};

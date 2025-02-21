"use client";

import { CardsSearch } from "@/features/cards-search/cards-search";
import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import { useRouter } from "next/navigation";
import { z } from "zod";

export const LibraryCardsSearch = ({
  defaultValues,
}: {
  defaultValues?: z.infer<typeof cardsSearchSchema>;
}) => {
  const { push } = useRouter();

  const handleSearchSubmit = async (values: z.infer<typeof cardsSearchSchema>) => {
    const searchParams = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value.toString());
      }
    });
    push(`?${searchParams.toString()}`);
  };

  return (
    <CardsSearch
      isLoading={false}
      handleSearchSubmit={handleSearchSubmit}
      defaultValues={defaultValues}
    />
  );
};

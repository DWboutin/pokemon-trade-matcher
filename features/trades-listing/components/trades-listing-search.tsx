"use client";

import { CardsSearch } from "@/features/cards-search/cards-search";
import { useTradesListingStore } from "@/stores/trades-listing-store";

export const TradesListingSearch = () => {
  const setFilters = useTradesListingStore((state) => state.setFilters);

  return <CardsSearch isLoading={false} handleSearchSubmit={(values) => setFilters(values)} />;
};

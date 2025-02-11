import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import { z } from "zod";
import { create } from "zustand";

type TradesListingStore = {
  filters: z.infer<typeof cardsSearchSchema>;
  setFilters: (filters: z.infer<typeof cardsSearchSchema>) => void;
};

export const useTradesListingStore = create<TradesListingStore>((set) => ({
  filters: cardsSearchSchema.parse({}),
  setFilters: (filters: z.infer<typeof cardsSearchSchema>) => set({ filters }),
}));

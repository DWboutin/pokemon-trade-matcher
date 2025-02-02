import { searchCardsData } from "@/actions/search-cards-data";
import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import { CardData } from "@/types/app";
import { z } from "zod";
import { create } from "zustand";

type CardsSearchStore = {
  cards: CardData[];
  isLoading: boolean;
  selectedCardId: string | null;
  searchCards: (values: z.infer<typeof cardsSearchSchema>) => Promise<CardData[]>;
  setSelectedCardId: (cardId: string) => void;
};

export const useCardsSearchStore = create<CardsSearchStore>((set) => ({
  cards: [],
  isLoading: false,
  selectedCardId: null,
  searchCards: async (values: z.infer<typeof cardsSearchSchema>) => {
    set({ isLoading: true });
    const response = await searchCardsData(values);
    const cards = JSON.parse(response);
    set({ cards, isLoading: false });
    return cards;
  },
  setSelectedCardId: (cardId: string) => {
    set({ selectedCardId: cardId });
  },
}));

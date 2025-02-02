import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import { useMemo } from "react";
import { CardData } from "@/types/app";
import { useCardsSearchStore } from "@/stores/cards-search-store";

type UseCardsSearchSelectors = {
  form: UseFormReturn<z.infer<typeof cardsSearchSchema>>;
  cards: CardData[];
  isLoading: boolean;
  selectedCardId: string | null;
  selectedCard: CardData | null;
};

type UseCardsSearchActions = {
  handleSubmit: (values: z.infer<typeof cardsSearchSchema>) => Promise<void>;
};

type UseCardsSearch = {
  selectors: UseCardsSearchSelectors;
  actions: UseCardsSearchActions;
};

export const useCardsSearch = (): UseCardsSearch => {
  const cards = useCardsSearchStore((state) => state.cards);
  const searchCards = useCardsSearchStore((state) => state.searchCards);
  const isLoading = useCardsSearchStore((state) => state.isLoading);
  const selectedCardId = useCardsSearchStore((state) => state.selectedCardId);
  const selectedCard = useMemo(
    () => cards.find((card) => card.cardNumber === selectedCardId) || null,
    [cards, selectedCardId]
  );
  const form = useForm<z.infer<typeof cardsSearchSchema>>({
    resolver: zodResolver(cardsSearchSchema),
    defaultValues: {
      cardName: "",
      rarity: "",
      exclusivePackName: "",
      exclusivePackSeries: "",
      type: "",
      hp: 0,
      stage: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof cardsSearchSchema>) => {
    await searchCards(values);
    window.scrollTo({
      top: document.querySelector("#cards-search-results")?.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };

  return {
    selectors: { form, cards, isLoading, selectedCardId, selectedCard },
    actions: { handleSubmit },
  };
};

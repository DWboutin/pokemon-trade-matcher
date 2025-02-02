import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import { searchCardsData } from "@/actions/search-cards-data";
import { useState } from "react";
import { CardData } from "@/types/app";

type UseCardsSearchSelectors = {
  form: UseFormReturn<z.infer<typeof cardsSearchSchema>>;
  cards: CardData[];
  isLoading: boolean;
  selectedCardId: string | null;
};

type UseCardsSearchActions = {
  handleSubmit: (values: z.infer<typeof cardsSearchSchema>) => Promise<void>;
  handleCardClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

type UseCardsSearch = {
  selectors: UseCardsSearchSelectors;
  actions: UseCardsSearchActions;
};

export const useCardsSearch = (): UseCardsSearch => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    const response = await searchCardsData(values);
    setIsLoading(true);
    const cards = JSON.parse(response);

    setCards(cards);
    setIsLoading(false);
    setSelectedCardId(null);
    window.scrollTo({
      top: document.querySelector("#cards-search-results")?.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const cardId = e.currentTarget.dataset.cardId;

    if (cardId) {
      setSelectedCardId(cardId);
    }
  };

  return {
    selectors: { form, cards, isLoading, selectedCardId },
    actions: { handleSubmit, handleCardClick },
  };
};

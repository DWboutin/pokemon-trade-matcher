import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import { useMemo, useRef } from "react";
import { CardData } from "@/types/app";
import { useCardsSearchStore } from "@/stores/cards-search-store";

type UseCardsSearchSelectors = {
  tagValues: z.infer<typeof cardsSearchSchema>;
  form: UseFormReturn<z.infer<typeof cardsSearchSchema>>;
  cards: CardData[];
  isLoading: boolean;
  selectedCardId: string | null;
  selectedCard: CardData | null;
  isSameValues: boolean;
};

type UseCardsSearchActions = {
  handleSubmit: (values: z.infer<typeof cardsSearchSchema>) => Promise<void>;
  handleRemoveTag: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

type UseCardsSearch = {
  selectors: UseCardsSearchSelectors;
  actions: UseCardsSearchActions;
};

const formDefaultValues: z.infer<typeof cardsSearchSchema> = {
  cardName: "",
  rarity: "",
  exclusivePackName: "",
  exclusivePackSeries: "",
  type: "",
  hp: undefined,
  stage: "",
};

export const useCardsSearch = (): UseCardsSearch => {
  const lastSubmittedValues = useRef<z.infer<typeof cardsSearchSchema>>({});
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
    defaultValues: formDefaultValues,
  });
  const values = form.watch();
  const isSameValues = useMemo(() => {
    return JSON.stringify(lastSubmittedValues.current) === JSON.stringify(values);
  }, [values]);

  const handleSubmit = async (values: z.infer<typeof cardsSearchSchema>) => {
    if (isSameValues) {
      return;
    }

    await searchCards(values);
    lastSubmittedValues.current = values;
    window.scrollTo({
      top: document.querySelector("#cards-search-results")?.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };

  const handleRemoveTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tagKey = e.currentTarget.dataset.tagKey;

    if (tagKey) {
      form.resetField(tagKey as keyof z.infer<typeof cardsSearchSchema>);
    }
  };

  return {
    selectors: {
      tagValues: lastSubmittedValues.current,
      form,
      cards,
      isLoading,
      selectedCardId,
      selectedCard,
      isSameValues,
    },
    actions: { handleSubmit, handleRemoveTag },
  };
};

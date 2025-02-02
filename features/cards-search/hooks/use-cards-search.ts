import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";

type UseCardsSearchSelectors = {
  form: UseFormReturn<z.infer<typeof cardsSearchSchema>>;
};

type UseCardsSearchActions = {};

type UseCardsSearch = {
  selectors: UseCardsSearchSelectors;
  actions: UseCardsSearchActions;
};

export const useCardsSearch = (): UseCardsSearch => {
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

  return {
    selectors: { form },
    actions: {},
  };
};

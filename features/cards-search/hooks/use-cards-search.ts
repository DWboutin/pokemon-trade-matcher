import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import { useMemo, useRef } from "react";

type UseCardsSearchSelectors = {
  tagValues: z.infer<typeof cardsSearchSchema>;
  form: UseFormReturn<z.infer<typeof cardsSearchSchema>>;
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

type UseCardsSearchArgs = {
  handleSearchSubmit: (values: z.infer<typeof cardsSearchSchema>) => Promise<void> | void;
};

export const useCardsSearch = ({ handleSearchSubmit }: UseCardsSearchArgs): UseCardsSearch => {
  const lastSubmittedValues = useRef<z.infer<typeof cardsSearchSchema>>({});
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

    await handleSearchSubmit(values);
    lastSubmittedValues.current = values;
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
      isSameValues,
    },
    actions: { handleSubmit, handleRemoveTag },
  };
};

import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import { useEffect, useMemo, useRef } from "react";

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
  skill: "",
  hp: undefined,
  stage: "",
};

type UseCardsSearchArgs = {
  handleSearchSubmit: (values: z.infer<typeof cardsSearchSchema>) => Promise<void> | void;
  defaultValues?: z.infer<typeof cardsSearchSchema>;
};

export const useCardsSearch = ({
  handleSearchSubmit,
  defaultValues = {},
}: UseCardsSearchArgs): UseCardsSearch => {
  const mergedDefaultValues = { ...formDefaultValues, ...defaultValues };
  const lastSubmittedValues = useRef<z.infer<typeof cardsSearchSchema>>(mergedDefaultValues);
  const form = useForm<z.infer<typeof cardsSearchSchema>>({
    resolver: zodResolver(cardsSearchSchema),
    defaultValues: formDefaultValues,
  });
  const values = form.watch();
  const isSameValues = useMemo(() => {
    return JSON.stringify(lastSubmittedValues.current) === JSON.stringify(values);
  }, [values]);

  const handleSubmit = async (values: z.infer<typeof cardsSearchSchema>, force = false) => {
    if (isSameValues && !force) {
      return;
    }

    await handleSearchSubmit(values);
    lastSubmittedValues.current = values;
  };

  const handleRemoveTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    const tagKey = e.currentTarget.dataset.tagKey;

    if (tagKey) {
      form.resetField(tagKey as keyof z.infer<typeof cardsSearchSchema>);
      form.setValue(tagKey as keyof z.infer<typeof cardsSearchSchema>, "", {
        shouldDirty: true,
      });
      handleSubmit(form.getValues(), true);
    }
  };

  useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).forEach(([key, value]) => {
        form.setValue(key as keyof z.infer<typeof cardsSearchSchema>, value, {
          shouldDirty: true,
          shouldValidate: true,
        });
      });
    }
  }, [defaultValues]);

  return {
    selectors: {
      tagValues: lastSubmittedValues.current,
      form,
      isSameValues,
    },
    actions: { handleSubmit, handleRemoveTag },
  };
};

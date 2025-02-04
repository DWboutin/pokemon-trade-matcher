"use client";

import cardsDataJson from "@/scripts/data/cards.json";
import { CardsData, CardType } from "@/types/app";
import { ControllerRenderProps } from "react-hook-form";
import { SelectDropdown } from "@/components/select-dropdown";
import { CardTypeWithImage } from "@/components/card-type-with-image";

const cardsData: CardsData = cardsDataJson;
const typesData = cardsData.cards
  .reduce<string[]>(
    (acc, card) => {
      if (!acc.find((type) => type === card.type)) {
        acc.push(card.type);
      }
      return acc;
    },
    ["All"]
  )
  .sort((a, b) => {
    const specialTypes = ["Item", "Pokemon Tool", "Supporter"];
    const aIsSpecial = specialTypes.includes(a);
    const bIsSpecial = specialTypes.includes(b);

    if (aIsSpecial && !bIsSpecial) return 1;
    if (!aIsSpecial && bIsSpecial) return -1;
    return a.localeCompare(b);
  });

export const CardsTypeDropdown: React.FC<ControllerRenderProps<{ type: string | undefined }>> = (
  props
) => {
  return (
    <SelectDropdown
      {...props}
      options={typesData}
      placeholder="Select your type"
      valueRenderer={(value) => <CardTypeWithImage type={value as CardType} />}
    />
  );
};

"use client";

import cardsDataJson from "@/scripts/data/cards.json";
import { CardsData } from "@/types/app";
import { CardsRarityOptionContent } from "@/features/cards-search/components/cards-rarity-option-content";
import { ControllerRenderProps } from "react-hook-form";
import { SelectDropdown } from "@/components/select-dropdown";

const cardsData: CardsData = cardsDataJson;
const raritiesData = cardsData.cards.reduce<string[]>(
  (acc, card) => {
    if (!acc.find((rarity) => rarity === card.rarity)) {
      acc.push(card.rarity);
    }
    return acc;
  },
  ["All"]
);

export const CardsRarityDropdown: React.FC<
  ControllerRenderProps<{ rarity: string | undefined }>
> = (props) => {
  return (
    <SelectDropdown
      {...props}
      options={raritiesData}
      placeholder="Select your rarity"
      valueRenderer={(value) => <CardsRarityOptionContent rarity={value} />}
    />
  );
};

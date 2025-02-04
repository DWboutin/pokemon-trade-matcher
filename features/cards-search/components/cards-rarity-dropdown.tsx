"use client";

import cardsDataJson from "@/scripts/data/cards.json";
import { CardsData } from "@/types/app";
import { ControllerRenderProps } from "react-hook-form";
import { SelectDropdown } from "@/components/select-dropdown";
import { CardRarityWithImages } from "@/components/card-rarity-with-images";

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
      valueRenderer={(value) => <CardRarityWithImages rarity={value} />}
    />
  );
};

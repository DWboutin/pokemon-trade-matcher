"use client";

import cardsDataJson from "@/scripts/data/cards.json";
import { CardsData } from "@/types/app";
import { ControllerRenderProps } from "react-hook-form";
import { SelectDropdown } from "@/components/select-dropdown";

const cardsData = cardsDataJson as CardsData;
const packNamesData = cardsData.cards
  .reduce<string[]>(
    (acc, card) => {
      if (!acc.find((packName) => packName === card.exclusivePack.name)) {
        acc.push(card.exclusivePack.name);
      }
      return acc;
    },
    ["All"]
  )
  .sort((a, b) => a.localeCompare(b));

export const CardsPackNameDropdown: React.FC<
  ControllerRenderProps<{ exclusivePackName: string | undefined }>
> = (props) => {
  return <SelectDropdown {...props} options={packNamesData} placeholder="Select your pack name" />;
};

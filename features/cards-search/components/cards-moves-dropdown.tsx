"use client";

import cardsDataJson from "@/scripts/data/cards.json";
import { CardsData } from "@/types/app";
import { ControllerRenderProps } from "react-hook-form";
import { SelectDropdown } from "@/components/select-dropdown";

const cardsData = cardsDataJson as CardsData;
const movesData = cardsData.cards
  .reduce<string[]>(
    (acc, card) => {
      card.effects.forEach((effect) => {
        if (!acc.includes(effect.name)) {
          acc.push(effect.name);
        }
      });
      return acc;
    },
    ["All"]
  )
  .sort((a, b) => a.localeCompare(b));

export const CardsMovesDropdown: React.FC<ControllerRenderProps<{ move: string | undefined }>> = (
  props
) => {
  return <SelectDropdown {...props} options={movesData} placeholder="Select a move" />;
};

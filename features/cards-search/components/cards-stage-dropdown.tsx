"use client";

import cardsDataJson from "@/scripts/data/cards.json";
import { CardsData } from "@/types/app";
import { ControllerRenderProps } from "react-hook-form";
import { SelectDropdown } from "@/components/select-dropdown";

const cardsData: CardsData = cardsDataJson;
const stagesData = cardsData.cards
  .filter(
    (card) => card.type !== "Item" && card.type !== "Supporter" && card.type !== "Pokemon Tool"
  )
  .reduce<string[]>(
    (acc, card) => {
      if (!acc.find((stage) => stage === card.stage)) {
        console.log({ card });
        acc.push(card.stage);
      }
      return acc;
    },
    ["All"]
  )
  .sort((a, b) => a.localeCompare(b));

export const CardsStageDropdown: React.FC<ControllerRenderProps<{ stage: string }>> = (props) => {
  return <SelectDropdown {...props} options={stagesData} placeholder="Select your stage" />;
};

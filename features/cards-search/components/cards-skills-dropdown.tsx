"use client";

import cardsDataJson from "@/scripts/data/cards.json";
import { CardsData } from "@/types/app";
import { ControllerRenderProps } from "react-hook-form";
import { SelectDropdown } from "@/components/select-dropdown";

const cardsData = cardsDataJson as CardsData;
const skillsData = cardsData.cards
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

export const CardsSkillsDropdown: React.FC<
  ControllerRenderProps<{ exclusivePackName: string | undefined }>
> = (props) => {
  return <SelectDropdown {...props} options={skillsData} placeholder="Select a skill" />;
};

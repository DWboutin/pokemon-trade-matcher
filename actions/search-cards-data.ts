"use server";

import { z } from "zod";
import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import cardsDataJson from "@/scripts/data/cards.json";
import { CardsData } from "@/types/app";

const cardsData: CardsData = cardsDataJson;

export const searchCardsData = async (values: z.infer<typeof cardsSearchSchema>) => {
  const { cardName, rarity, exclusivePackName, exclusivePackSeries, type, hp, stage } = values;

  const filteredCards = cardsData.cards.filter((card) => {
    if (cardName && !card.cardName.toLowerCase().includes(cardName.toLowerCase())) {
      return false;
    }

    if (rarity && card.rarity !== rarity) {
      return false;
    }

    if (exclusivePackName && card.exclusivePack.name !== exclusivePackName) {
      return false;
    }

    if (exclusivePackSeries && card.exclusivePack.series !== exclusivePackSeries) {
      return false;
    }

    if (type && card.type !== type) {
      return false;
    }

    if (hp && card.hp < hp) {
      return false;
    }

    if (stage && card.stage !== stage) {
      return false;
    }

    return true;
  });

  return JSON.stringify(filteredCards);
};

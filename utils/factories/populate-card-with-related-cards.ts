import { CardData, PopulatedCardData } from "@/types/app";
import { searchCardsData } from "@/actions/search-cards-data";

export const populateCardWithRelatedCards = async (card: CardData): Promise<PopulatedCardData> => {
  const evolvedFromCards = card.evolvedFrom
    ? await searchCardsData({ cardName: card.evolvedFrom }).then((result) => JSON.parse(result))
    : null;
  const evolvesToCards = card.evolvesTo
    ? await Promise.all(
        card.evolvesTo.map(async (evolveTo) => {
          const searchResult = await searchCardsData({ cardName: evolveTo });
          return JSON.parse(searchResult);
        })
      )
    : null;
  const variations = await searchCardsData({ cardName: card.cardName }).then((result) =>
    JSON.parse(result).filter((c: CardData) => c.cardNumber !== card.cardNumber)
  );
  const variationsSameCard = variations.filter((c: CardData) => c.cardName === card.cardName);
  const variationsEx = variations.filter((c: CardData) => c.cardName !== card.cardName);

  return {
    ...card,
    evolvedFromCards,
    evolvesToCards: evolvesToCards ? evolvesToCards[0] : null,
    variations: variationsSameCard.length > 0 ? variationsSameCard : null,
    variationsEx: variationsEx.length > 0 ? variationsEx : null,
  };
};

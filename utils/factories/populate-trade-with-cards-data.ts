import { CardData, CardsData, Trade } from "@/types/app";
import cardsDataJson from "@/scripts/data/cards.json";

export type PopulatedTrade = Trade & {
  mainCard: CardData | null;
  offeredCards: CardData[];
  author: {
    id: string;
    username: string;
    icon: string;
    friend_id: string;
  };
};

const populateTradeWithCardsData = (trade: Trade): PopulatedTrade => {
  const cardsData = cardsDataJson as CardsData;

  const mainCard = cardsData.cards.find((card) => card.cardNumber === trade.main_card) ?? null;
  const offeredCards = cardsData.cards.filter((card) =>
    trade.offered_cards.includes(card.cardNumber)
  );

  return {
    ...trade,
    mainCard,
    offeredCards,
  } as PopulatedTrade;
};

export default populateTradeWithCardsData;

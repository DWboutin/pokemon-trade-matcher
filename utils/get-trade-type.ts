import { CardData, TradeType } from "@/types/app";

export const getTradeType = (mainCard: CardData | null, offeredCards: CardData[]): TradeType => {
  if (!mainCard && offeredCards.length > 0) {
    return "offer";
  }

  if (mainCard && offeredCards.length === 0) {
    return "want";
  }

  return "trade";
};

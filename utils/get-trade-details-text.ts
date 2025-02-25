import { CardData, TradeType } from "@/types/app";

export const getTradeDetailsTitle = (
  mainCard: CardData | null,
  offeredCards: CardData[],
  tradeType: TradeType
) => {
  if (!mainCard && offeredCards.length === 0) {
    return `Wants to get or offer any cards for a trade.`;
  }

  if (tradeType === "want" && offeredCards.length === 0) {
    return `Wants to get ${mainCard?.cardName} ${mainCard?.exclusivePack.name} ${mainCard?.exclusivePack.series}.`;
  }

  if (tradeType === "want" && offeredCards.length !== 0) {
    return `Wants to get ${mainCard?.cardName} ${mainCard?.exclusivePack.name} ${mainCard?.exclusivePack.series}.`;
  }

  if (tradeType === "offer" && offeredCards.length === 1) {
    return `Offers to trade ${offeredCards[0].cardName} ${offeredCards[0].exclusivePack.name} ${offeredCards[0].exclusivePack.series}.`;
  }

  if (tradeType === "offer") {
    return `Offers to trade theses ${offeredCards.length} cards for any trade offers.`;
  }

  return `Wants to get ${mainCard?.cardName} ${mainCard?.exclusivePack.name} ${mainCard?.exclusivePack.series}.`;
};

export const getTradeDetailsDescription = (
  mainCard: CardData | null,
  offeredCards: CardData[],
  tradeType: TradeType,
  username: string
) => {
  if (!mainCard && offeredCards.length === 0) {
    return `Wants to get or offer any cards for a trade.`;
  }

  if (tradeType === "want") {
    return `${username} searches for any trade offers to get ${mainCard?.cardName} ${mainCard?.exclusivePack.name} ${mainCard?.exclusivePack.series}.`;
  }

  if (tradeType === "offer" && !mainCard) {
    const cardCounts = offeredCards.reduce((acc, card) => {
      const key = `${card.cardName} ${card.exclusivePack.name} ${card.exclusivePack.series}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const cardCountsString = Object.entries(cardCounts)
      .map(([card, count]) => `${count} ${card}`)
      .join(" and ");

    return `${username} offers ${cardCountsString} to get any trade offers.`;
  }

  return `${username} offers theses cards below to get ${mainCard?.cardName} ${mainCard?.exclusivePack.name} ${mainCard?.exclusivePack.series} to get any trade offers.`;
};

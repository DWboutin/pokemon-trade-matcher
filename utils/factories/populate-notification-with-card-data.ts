import { CardData, CardsData, NotificationWithOffer } from "@/types/app";
import cardsDataJson from "@/scripts/data/cards.json";

const cardsData = cardsDataJson as CardsData;

export type PopulatedNotification = NotificationWithOffer & {
  offeredCard: CardData | null;
  wantedCard: CardData | null;
};

const populateNotificationWithCardData = (
  notification: NotificationWithOffer
): PopulatedNotification => {
  const offeredCard = notification.offer
    ? cardsData.cards.find((card) => card.cardNumber === notification.offer.offered_card)
    : null;
  const wantedCard = notification.offer
    ? cardsData.cards.find((card) => card.cardNumber === notification.offer.wanted_card)
    : null;

  const results = {
    ...notification,
    offeredCard: offeredCard || null,
    wantedCard: wantedCard || null,
  };

  return results as PopulatedNotification;
};

export default populateNotificationWithCardData;

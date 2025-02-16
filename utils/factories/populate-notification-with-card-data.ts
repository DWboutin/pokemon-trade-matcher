import { CardData, CardsData, NotificationWithOffer } from "@/types/app";
import cardsDataJson from "@/scripts/data/cards.json";

export type PopulatedNotification = NotificationWithOffer & {
  offeredCard: CardData;
  wantedCard: CardData;
};

const populateNotificationWithCardData = (
  notification: NotificationWithOffer
): PopulatedNotification => {
  const cardsData = cardsDataJson as CardsData;

  const offeredCard = cardsData.cards.find(
    (card) => card.cardNumber === notification.offer.offered_card
  );
  const wantedCard = cardsData.cards.find(
    (card) => card.cardNumber === notification.offer.wanted_card
  );

  return {
    ...notification,
    offeredCard,
    wantedCard,
  } as PopulatedNotification;
};

export default populateNotificationWithCardData;

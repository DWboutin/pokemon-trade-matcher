import { CardData, CardsData, Offer } from "@/types/app";
import cardsDataJson from "@/scripts/data/cards.json";

export type PopulatedOffer = Offer & {
  offeredCard: CardData;
  wantedCard: CardData;
  author: {
    id: string;
    username: string;
    icon: string;
    friend_id: string;
  };
};

const populateOfferWithCardData = (offer: Offer): PopulatedOffer => {
  const cardsData = cardsDataJson as CardsData;

  const offeredCard = cardsData.cards.find((card) => card.cardNumber === offer.offered_card);
  const wantedCard = cardsData.cards.find((card) => card.cardNumber === offer.wanted_card);

  return {
    ...offer,
    offeredCard,
    wantedCard,
  } as PopulatedOffer;
};

export default populateOfferWithCardData;

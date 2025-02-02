import { useCardsSearchStore } from "@/stores/cards-search-store";
import { CardData } from "@/types/app";
import { MouseEvent, useState } from "react";

type UseTradeCreatorSelectors = {
  selectedCardId: string | null;
  isModalOpen: boolean;
  searchedCard: CardData | null;
  offeredCards: CardData[];
};

type UseTradeCreatorActions = {
  handleCardClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleModalOpenChange: (open: boolean) => void;
  handleSearchedCardChange: () => void;
  handleOfferedCardsChange: () => void;
  handleTradeReset: () => void;
};

type UseTradeCreator = {
  selectors: UseTradeCreatorSelectors;
  actions: UseTradeCreatorActions;
};

export const useTradeCreator = (): UseTradeCreator => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedCardId = useCardsSearchStore((state) => state.selectedCardId);
  const selectedCard = useCardsSearchStore(
    (state) => state.cards.find((card) => card.cardNumber === selectedCardId) || null
  );
  const setSelectedCardId = useCardsSearchStore((state) => state.setSelectedCardId);
  const [searchedCard, setSearchedCard] = useState<CardData | null>(null);
  const [offeredCards, setOfferedCards] = useState<CardData[]>([]);

  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    const cardId = e.currentTarget.dataset.cardId;

    if (cardId) {
      setSelectedCardId(cardId);
      setIsModalOpen(true);
    }
  };

  const handleModalOpenChange = (open: boolean) => {
    setIsModalOpen(open);
  };

  const handleSearchedCardChange = () => {
    if (selectedCard) {
      setSearchedCard(selectedCard);
      setIsModalOpen(false);
    }
  };

  const handleOfferedCardsChange = () => {
    if (selectedCard && offeredCards.length < 10) {
      setOfferedCards([...offeredCards, selectedCard]);
      setIsModalOpen(false);
    }
  };

  const handleTradeReset = () => {
    setSearchedCard(null);
    setOfferedCards([]);
    setIsModalOpen(false);
  };

  return {
    selectors: { selectedCardId, isModalOpen, searchedCard, offeredCards },
    actions: {
      handleCardClick,
      handleModalOpenChange,
      handleSearchedCardChange,
      handleOfferedCardsChange,
      handleTradeReset,
    },
  };
};

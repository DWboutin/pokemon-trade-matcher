import { createTrade } from "@/actions/create-trade";
import { cardsSearchSchema } from "@/features/cards-search/utils/cards-search-schema";
import { useCardsSearchStore } from "@/stores/cards-search-store";
import { CardData } from "@/types/app";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

type UseTradeCreatorSelectors = {
  selectedCardId: string | null;
  isModalOpen: boolean;
  searchedCard: CardData | null;
  offeredCards: CardData[];
  tradeIsValid: boolean;
  isLoading: boolean;
};

type UseTradeCreatorActions = {
  handleCardClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleModalOpenChange: (open: boolean) => void;
  handleSearchedCardChange: () => void;
  handleOfferedCardsChange: () => void;
  handleTradeReset: () => void;
  handleTradeCreation: () => void;
  handleSearchSubmit: (values: z.infer<typeof cardsSearchSchema>) => Promise<void>;
};

type UseTradeCreator = {
  selectors: UseTradeCreatorSelectors;
  actions: UseTradeCreatorActions;
};

export const useTradeCreator = (): UseTradeCreator => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedCardId = useCardsSearchStore((state) => state.selectedCardId);
  const isLoading = useCardsSearchStore((state) => state.isLoading);
  const selectedCard = useCardsSearchStore(
    (state) => state.cards.find((card) => card.cardNumber === selectedCardId) || null
  );
  const setSelectedCardId = useCardsSearchStore((state) => state.setSelectedCardId);
  const searchCards = useCardsSearchStore((state) => state.searchCards);
  const [searchedCard, setSearchedCard] = useState<CardData | null>(null);
  const [offeredCards, setOfferedCards] = useState<CardData[]>([]);
  const tradeIsValid = !!searchedCard || offeredCards.length > 0;

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
    setSelectedCardId(null);
    setOfferedCards([]);
    setIsModalOpen(false);
  };

  const handleTradeCreation = async () => {
    if (!searchedCard && offeredCards.length === 0) {
      toast.error("Please select a card to trade");
      return;
    }

    const trade = {
      main_card: searchedCard?.cardNumber ?? null,
      offered_cards: offeredCards.map((card) => card.cardNumber),
    };

    const { data, error } = await createTrade(trade);

    if (error) {
      console.error(error);
      toast.error("Error creating trade");
      return;
    }

    await queryClient.invalidateQueries({ queryKey: ["trades"] });

    toast.success("Trade created successfully");
    handleTradeReset();

    router.push(`/trades/${data.id}`);
  };

  const handleSearchSubmit = async (values: z.infer<typeof cardsSearchSchema>) => {
    await searchCards(values);

    window.scrollTo({
      top: document.querySelector("#cards-search-results")?.getBoundingClientRect().top,
      behavior: "smooth",
    });
  };

  return {
    selectors: { selectedCardId, isModalOpen, searchedCard, offeredCards, tradeIsValid, isLoading },
    actions: {
      handleCardClick,
      handleModalOpenChange,
      handleSearchedCardChange,
      handleOfferedCardsChange,
      handleTradeReset,
      handleTradeCreation,
      handleSearchSubmit,
    },
  };
};

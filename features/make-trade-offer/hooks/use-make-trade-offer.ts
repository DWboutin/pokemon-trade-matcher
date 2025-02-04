import { createOffer } from "@/actions/create-offer";
import { queryClient } from "@/providers/providers";
import { useCardsSearchStore } from "@/stores/cards-search-store";
import { CardData } from "@/types/app";
import { MouseEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type UseMakeTradeOfferSelectors = {
  isModalOpen: boolean;
  isLoading: boolean;
  wantedCardId: string | null;
  wantedCard: CardData | undefined;
  selectedCardId: string | null;
  selectedCard: CardData | undefined;
};

type UseMakeTradeOfferActions = {
  handleCardClick: (e: MouseEvent<HTMLDivElement>) => void;
  handleCreateOffer: (selectedCardName: string) => Promise<void>;
  setIsModalOpen: (isModalOpen: boolean) => void;
  handleWantedCardClick: (e: MouseEvent<HTMLDivElement>) => void;
};

type UseMakeTradeOffer = {
  selectors: UseMakeTradeOfferSelectors;
  actions: UseMakeTradeOfferActions;
};

type UseMakeTradeOfferParams = {
  tradeId: string;
  mainCardId: string | undefined;
  offeredCards: CardData[];
  handleChangeTabToOffers: () => void;
};

export const useMakeTradeOffer = ({
  tradeId,
  mainCardId,
  offeredCards,
  handleChangeTabToOffers,
}: UseMakeTradeOfferParams): UseMakeTradeOffer => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wantedCardId, setWantedCardId] = useState<string | null>(null);
  const selectedCardId = useCardsSearchStore((state) => state.selectedCardId);
  const selectedSearchCard = useCardsSearchStore((state) =>
    state.cards.find((card) => card.cardNumber === selectedCardId)
  );
  const setSelectedCardId = useCardsSearchStore((state) => state.setSelectedCardId);
  const wantedCard = useMemo(
    () => offeredCards.find((card) => card.cardNumber === wantedCardId),
    [offeredCards, wantedCardId]
  );
  const selectedOfferedCard = useMemo(
    () => offeredCards.find((card) => card.cardNumber === selectedCardId),
    [offeredCards, selectedCardId]
  );

  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    const cardId = e.currentTarget.dataset.cardId;

    if (cardId) {
      setSelectedCardId(cardId);
    }
  };
  const handleWantedCardClick = (e: MouseEvent<HTMLDivElement>) => {
    const cardId = e.currentTarget.dataset.cardId;

    if (cardId) {
      setWantedCardId(cardId);
    }
  };

  const handleCreateOffer = async (selectedCardName: string) => {
    setIsLoading(true);
    const { error } = await createOffer({
      offered_card: selectedCardName,
      trade_id: tradeId,
      wanted_card: wantedCardId,
    });
    setIsModalOpen(false);
    setIsLoading(false);

    if (error) {
      console.error(error);
      toast.error("Error creating trade offer");
      return;
    }

    toast.success("Trade offer created successfully");
    await queryClient.invalidateQueries({ queryKey: ["offers", tradeId] });

    setSelectedCardId(null);
    handleChangeTabToOffers();
  };

  useEffect(() => {
    if (
      (!!mainCardId && !!selectedCardId && !wantedCardId) ||
      (!!selectedCardId && !!wantedCardId && !mainCardId)
    ) {
      setIsModalOpen(true);
    }
  }, [mainCardId, selectedCardId, wantedCardId]);

  useEffect(() => {
    return () => {
      setSelectedCardId(null);
    };
  }, []);

  return {
    selectors: {
      isModalOpen,
      isLoading,
      wantedCardId,
      wantedCard,
      selectedCardId,
      selectedCard: selectedSearchCard || selectedOfferedCard,
    },
    actions: {
      handleCardClick,
      handleCreateOffer,
      setIsModalOpen,
      handleWantedCardClick,
    },
  };
};

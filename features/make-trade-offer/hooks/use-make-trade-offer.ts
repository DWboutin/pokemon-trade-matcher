import { createOffer } from "@/actions/create-offer";
import { queryClient } from "@/providers/providers";
import { useCardsSearchStore } from "@/stores/cards-search-store";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";

type UseMakeTradeOfferSelectors = {
  isModalOpen: boolean;
  isLoading: boolean;
};

type UseMakeTradeOfferActions = {
  handleCardClick: (e: MouseEvent<HTMLDivElement>) => void;
  handleCreateOffer: (selectedCardName: string) => Promise<void>;
  setIsModalOpen: (isModalOpen: boolean) => void;
};

type UseMakeTradeOffer = {
  selectors: UseMakeTradeOfferSelectors;
  actions: UseMakeTradeOfferActions;
};

type UseMakeTradeOfferParams = {
  tradeId: string;
  handleChangeTabToOffers: () => void;
};

export const useMakeTradeOffer = ({
  tradeId,
  handleChangeTabToOffers,
}: UseMakeTradeOfferParams): UseMakeTradeOffer => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setSelectedCardId = useCardsSearchStore((state) => state.setSelectedCardId);
  const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
    const cardId = e.currentTarget.dataset.cardId;

    if (cardId) {
      setSelectedCardId(cardId);
      setIsModalOpen(true);
    }
  };

  const handleCreateOffer = async (selectedCardName: string) => {
    setIsLoading(true);
    const { error } = await createOffer({
      offered_card: selectedCardName,
      trade_id: tradeId,
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

  return {
    selectors: {
      isModalOpen,
      isLoading,
    },
    actions: {
      handleCardClick,
      handleCreateOffer,
      setIsModalOpen,
    },
  };
};

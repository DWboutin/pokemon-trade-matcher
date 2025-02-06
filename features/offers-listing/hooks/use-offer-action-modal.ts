import { updateOfferStatus } from "@/actions/update-offer-status";
import { useConnectedUserStore } from "@/stores/connected-user-store";
import { OfferStatus } from "@/types/app";
import { PopulatedOffer } from "@/utils/factories/populate-offer-with-card-data";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export interface useOfferActionModalSelectors {
  isModalOpen: boolean;
  isStatusUpdating: Omit<OfferStatus, "pending"> | null;
  offerData: PopulatedOffer | null;
  isOwner: boolean;
}

export interface useOfferActionModalActions {
  setIsModalOpen: (isOpen: boolean) => void;
  handleOfferCardClick: (offer: PopulatedOffer) => void;
  handleOfferStatusUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface useOfferActionModalHook {
  selectors: useOfferActionModalSelectors;
  actions: useOfferActionModalActions;
}

export function useOfferActionModal({
  tradeId,
  tradeOwnerId,
}: {
  tradeId: string;
  tradeOwnerId: string;
}): useOfferActionModalHook {
  const queryClient = useQueryClient();
  const user = useConnectedUserStore((state) => state.user);
  const [offerData, setOfferData] = useState<PopulatedOffer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState<Omit<OfferStatus, "pending"> | null>(
    null
  );
  const isOwner = user?.id === tradeOwnerId;

  const handleOfferCardClick = (offer: PopulatedOffer) => {
    setOfferData(offer);
    setIsModalOpen(true);
  };

  const handleOfferStatusUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!offerData) {
      return;
    }

    const status = e.currentTarget.dataset.offerStatus as Omit<OfferStatus, "pending">;

    setIsStatusUpdating(status);
    await updateOfferStatus({ tradeId, offerId: offerData.id, status });
    setIsStatusUpdating(null);
    setIsModalOpen(false);
    setOfferData(null);

    await queryClient.invalidateQueries({ queryKey: ["offers", tradeId] });

    if (status === "accepted") {
      toast.success(
        "The offer has been accepted! Connect with the other user in the application to complete the trade."
      );
    } else {
      toast.success("The offer has been rejected.");
    }
  };

  return {
    selectors: {
      isModalOpen,
      isStatusUpdating,
      offerData,
      isOwner,
    },
    actions: {
      setIsModalOpen,
      handleOfferCardClick,
      handleOfferStatusUpdate,
    },
  };
}

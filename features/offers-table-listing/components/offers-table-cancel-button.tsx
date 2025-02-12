"use client";

import { deleteOffer } from "@/actions/delete-offer";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/button-loading";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";

type OffersTableCancelButtonProps = {
  offerId: string;
  tradeId: string;
  disabled?: boolean;
};

export const OffersTableCancelButton = ({
  offerId,
  tradeId,
  disabled,
}: OffersTableCancelButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDeleteOffer = async (e: MouseEvent<HTMLButtonElement>) => {
    const offerId = e.currentTarget.dataset.offerId;
    const tradeId = e.currentTarget.dataset.tradeId;

    if (!offerId || !tradeId) {
      return;
    }

    setIsLoading(true);

    const response = await deleteOffer(offerId, tradeId);

    if (response.error) {
      toast.error(response.error);
      setIsLoading(false);
      return;
    }

    toast.success(response.success);
    setIsLoading(false);
  };

  return (
    <Button
      variant="destructive"
      disabled={disabled}
      data-offer-id={offerId}
      data-trade-id={tradeId}
      onClick={handleDeleteOffer}
    >
      {isLoading && <ButtonLoading>Cancelling...</ButtonLoading>}
      {!isLoading && "Cancel"}
    </Button>
  );
};

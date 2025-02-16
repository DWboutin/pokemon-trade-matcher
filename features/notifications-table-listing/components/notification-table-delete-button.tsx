"use client";

import { deleteOffer } from "@/actions/delete-offer";
import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/button-loading";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { deleteNotification } from "@/actions/delete-notification";

type NotificationTableDeleteButtonProps = {
  notificationId: string;
  disabled?: boolean;
};

export const NotificationTableDeleteButton = ({
  notificationId,
  disabled,
}: NotificationTableDeleteButtonProps) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const handleDeleteOffer = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const notificationId = e.currentTarget.dataset.notificationId;

    if (!notificationId) {
      return;
    }

    setIsLoading(true);

    const response = await deleteNotification(notificationId);

    if (response.error) {
      toast.error(response.error);
      setIsLoading(false);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: ["user-notifications"] });
    await queryClient.invalidateQueries({ queryKey: ["user-notifications-count"] });

    toast.success(response.success);
    setIsLoading(false);
  };

  return (
    <Button
      variant="destructive"
      disabled={disabled}
      data-notification-id={notificationId}
      onClick={handleDeleteOffer}
    >
      {isLoading && <ButtonLoading>Deleting...</ButtonLoading>}
      {!isLoading && "Delete"}
    </Button>
  );
};

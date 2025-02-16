"use client";

import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/button-loading";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { updateNotificationSeen } from "@/actions/update-notification-seen";

type NotificationTableMarkAsSeenButtonProps = {
  notificationId: string;
  disabled?: boolean;
};

export const NotificationTableMarkAsSeenButton = ({
  notificationId,
  disabled,
}: NotificationTableMarkAsSeenButtonProps) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const handleMarkAsSeen = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const notificationId = e.currentTarget.dataset.notificationId;

    if (!notificationId) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await updateNotificationSeen(notificationId);

      await queryClient.invalidateQueries({ queryKey: ["user-notifications"] });
      await queryClient.invalidateQueries({ queryKey: ["user-notifications-count"] });

      toast.success(response.success);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="default"
      disabled={disabled}
      data-notification-id={notificationId}
      onClick={handleMarkAsSeen}
    >
      {isLoading && <ButtonLoading>Marking as seen...</ButtonLoading>}
      {!isLoading && "Mark as seen"}
    </Button>
  );
};

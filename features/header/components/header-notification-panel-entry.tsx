import { FC } from "react";
import { Notification } from "@/types/app";
import { timeAgo } from "@/utils/contants";

type HeaderNotificationPanelEntryProps = {
  notification: Notification;
};

export const HeaderNotificationPanelEntry: FC<HeaderNotificationPanelEntryProps> = ({
  notification,
}) => {
  return (
    <div className={`p-3 rounded-lg text-sm ${notification.seen ? "bg-muted/40" : "bg-muted"}`}>
      <p>Notification message</p>
      <p className="text-xs text-muted-foreground mt-1">
        {timeAgo.format(new Date(notification.created_at))}
      </p>
    </div>
  );
};

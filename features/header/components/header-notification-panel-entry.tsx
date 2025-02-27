import { FC } from "react";
import { NotificationTableEntryMessage } from "@/features/notifications-table-listing/components/notification-table-entry-message";
import { PopulatedNotification } from "@/utils/factories/populate-notification-with-card-data";
import { TimeAgoDate } from "@/components/time-ago-date";

type HeaderNotificationPanelEntryProps = {
  notification: PopulatedNotification;
  handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const HeaderNotificationPanelEntry: FC<HeaderNotificationPanelEntryProps> = ({
  notification,
  handleClick,
}) => {
  return (
    <div
      className={`p-3 rounded-lg text-sm cursor-pointer ${
        notification.seen ? "bg-muted/40" : "bg-muted"
      }`}
      data-notification-id={notification.id}
      data-notification-seen={notification.seen}
      data-trade-id={notification.trade}
      data-offer-id={notification.offer?.id}
      onClick={handleClick}
    >
      <div className="flex w-full flex-col items-start gap-1">
        <div className="flex w-full flex-row gap-2 relative">
          {!notification.seen && (
            <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#F01616] flex-shrink-0" />
          )}
          <NotificationTableEntryMessage notification={notification} />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          <TimeAgoDate date={notification.created_at} />
        </p>
      </div>
    </div>
  );
};
